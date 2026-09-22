#!/usr/bin/env node
/* 构建 Android APK —— 全链路只用 build-tools 自带的命令行工具，不经 Gradle / AGP。
 *
 * 为什么不走 Gradle（2026-09-22 的决定，与 APK 审查报告给的 Capacitor 方案不同）：
 *   ① 本项目的构建全是 `node tools/*.mjs`，一行工具链依赖都没有。引 Gradle 等于在仓库里
 *      放第二套构建系统 + 一个 150MB 的 Gradle 发行版 + AGP 的版本矩阵；
 *   ② 这个壳的 Java 源码只有四个文件、零第三方依赖，Gradle 在这里能提供的
 *      （依赖解析、变体、R 类生成）一个都用不上；
 *   ③ 手写这条链子能保证「谁在动了什么」全都看得见，出问题不用去猜 AGP 在看不见的那层做了什么。
 *   代价是以后想加 androidx 依赖会很麻烦 —— 那正是我们不想要的（APK 从 1MB 级涨到 3MB 级）。
 *
 * ★ 为什么一切都在 ASCII 暂存目录里跑（本仓库路径含中文，2026-09-22 踩到）：
 *   aapt2 / zipalign 是 Windows 原生程序，Node 按 UTF-16 传参、Windows 给非 Unicode 程序
 *   降级成 ANSI 码页、它们又按 UTF-8 解 —— `D:\四级词阅\...` 被解成乱码，报的却是
 *   「failed to open directory: 系统找不到指定的文件」，而目录明明在那儿。
 *   所以：源码先拷进 <ANDROID_HOME>\work\（纯 ASCII），所有原生工具只在那儿跑；
 *   最后一步用 Node（Unicode 安全）把 APK 拷回仓库。
 *
 * 用法：
 *   node tools/build-apk.mjs              构建 release（生产签名）
 *   node tools/build-apk.mjs --debug      构建 debug（debug 签名、可调试）
 *   node tools/build-apk.mjs --skip-www   跳过 mobile/www 重新生成（只改了 Java 时快一点）
 *
 * 前置：node tools/setup-android-toolchain.mjs
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const libMobile = require("./lib-mobile.cjs");
const libZip = require("./lib-zip.cjs");

const ROOT = path.resolve(import.meta.dirname, "..");
const ANDROID = path.join(ROOT, "mobile", "android");
const WWW = path.join(ROOT, "mobile", "www");
const OUTDIR = path.join(ROOT, "outputs", "apk");

const HOME = process.env.WORDLENS_ANDROID_HOME || path.join(path.parse(ROOT).root, "wl-android");
const WORK = path.join(HOME, "work");
const PROJ = path.join(WORK, "proj");
const STAGE = path.join(WORK, "stage");

const only = (dir, what) => {
  if (!fs.existsSync(dir)) throw new Error(`找不到 ${what}：${dir}\n先跑 node tools/setup-android-toolchain.mjs`);
  const items = fs.readdirSync(dir).filter(n => !n.startsWith("."));
  if (!items.length) throw new Error(`${dir} 是空的`);
  return path.join(dir, items[0]);
};
const exe = (d, n) => path.join(d, process.platform === "win32" ? n + ".exe" : n);
const JDK = only(path.join(HOME, "jdk"), "JDK");
const BT = only(path.join(HOME, "sdk", "build-tools"), "build-tools");
const PLATFORM = only(path.join(HOME, "sdk", "platforms"), "platforms");
const ANDROID_JAR = path.join(PLATFORM, "android.jar");
const JAVA = exe(path.join(JDK, "bin"), "java");
const JAVAC = exe(path.join(JDK, "bin"), "javac");
const JAR = exe(path.join(JDK, "bin"), "jar");
const KEYTOOL = exe(path.join(JDK, "bin"), "keytool");
const AAPT2 = exe(BT, "aapt2");
const AAPT1 = exe(BT, "aapt");
const ZIPALIGN = exe(BT, "zipalign");
const D8_JAR = path.join(BT, "lib", "d8.jar");
/* ★ core-lambda-stubs.jar 不能省：android.jar 里**没有** java.lang.invoke.LambdaMetafactory
   （Android 的 lambda 是构建期由 d8 脱糖的，运行时根本没有这个方法），
   所以编译期 javac 找不到它 —— 只要源码里有一个 lambda 或方法引用就编不过。
   AGP 内部也是这么补的，这里只是显式写出来。 */
const LAMBDA_STUBS = path.join(BT, "core-lambda-stubs.jar");
const SIGNER_JAR = path.join(BT, "lib", "apksigner.jar");

const MIN_SDK = 26;      // Android 8.0：自适应图标、java.time、现代 WebView 都从这一档起
const TARGET_SDK = 35;

const argv = process.argv.slice(2);
const DEBUG = argv.includes("--debug");
const SKIP_WWW = argv.includes("--skip-www");
const log = (...a) => console.log(...a);
const step = t => log(`\n▸ ${t}`);

/* ---------- 0. 前置检查 ---------- */
for (const [p, what] of [[ANDROID_JAR, "android.jar"], [AAPT2, "aapt2"], [AAPT1, "aapt"], [ZIPALIGN, "zipalign"],
[D8_JAR, "d8.jar"], [SIGNER_JAR, "apksigner.jar"], [LAMBDA_STUBS, "core-lambda-stubs.jar"], [JAVA, "java"], [JAVAC, "javac"], [JAR, "jar"], [KEYTOOL, "keytool"]]) {
  if (!fs.existsSync(p)) throw new Error(`工具链缺件：${what} → ${p}\n先跑 node tools/setup-android-toolchain.mjs`);
}
/* 这条不能省：路径带非 ASCII 时，原生工具报的是「找不到文件」这种完全误导人的错。
   与其让人去查一个小时，不如在这里一句话说清。 */
for (const [p, what] of [[HOME, "工具链目录"], [WORK, "构建暂存目录"]]) {
  if (!/^[\x20-\x7E]+$/.test(p)) {
    throw new Error(`${what}必须是纯 ASCII 路径（当前 ${p}）。\n`
      + "Android 的原生工具在非 ASCII 路径下会把路径解成乱码。\n"
      + "用 WORDLENS_ANDROID_HOME 指到全英文目录，例如 D:\\wl-android");
  }
}

/* ★ XML 注释里不能出现连续两个连字符 —— 这条踩过两次（2026-09-22）：
     colors.xml 里写「背景变量 --bg」、AndroidManifest 里写「--min-sdk-version」，都让构建在
     aapt2 阶段炸掉，而报的是 `not well-formed (invalid token)`（只给行号、不说原因）。
     写注释时脑子里想的是 markdown 的 `--`，XML 想的是「注释里不可能有连字符」。
     自己扫一遍，零依赖，报错直接说清是哪一行的注释。 */
function scanXmlComments(dir) {
  const bad = [];
  const visit = d => {
    for (const n of fs.readdirSync(d)) {
      const p = path.join(d, n);
      if (fs.statSync(p).isDirectory()) { visit(p); continue; }
      if (!n.toLowerCase().endsWith(".xml")) continue;
      const src = fs.readFileSync(p, "utf8");
      const re = /<!--([\s\S]*?)-->/g;
      let m;
      while ((m = re.exec(src))) {
        const at = m[1].indexOf("--");
        if (at >= 0) {
          /* 行号按注释起点算；再给出行内片段，一眼能定位。 */
          const line = src.slice(0, m.index).split("\n").length;
          const snippet = m[1].slice(Math.max(0, at - 24), at + 12).replace(/\s+/g, " ").trim();
          bad.push(`${path.relative(ROOT, p)}:${line}  注释内含连续连字符 → …${snippet}…`);
        }
      }
    }
  };
  visit(dir);
  return bad;
}
/* 递归扫整个 mobile/android（已含 res/）——分两次扫 res 会让同一处报两遍。 */
const xmlBad = scanXmlComments(ANDROID);
if (xmlBad.length) {
  throw new Error("XML 注释里有连续两个连字符（XML 规范禁止，aapt2 只会说 invalid token）：\n  "
    + xmlBad.join("\n  "));
}

const version = JSON.parse(fs.readFileSync(path.join(ROOT, "mobile", "version.json"), "utf8"));
const vc = Number(version.versionCode) || 1;
const vn = String(version.versionName || "1.0.0");
const run = (cmd, args, opts) => String(execFileSync(cmd, args,
  { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], ...(opts || {}) }) || "");

/* ★ 不用 fs.cpSync（2026-09-22 实测）：本机 node 22.22.2 上，它一旦碰到问题不是抛异常，
   而是**把整个进程弄死** —— 没有栈、没有 stderr，退出码 127，连 try/catch 都拦不住。
   表现是构建日志停在「拷进暂存区」然后什么都没有，极具误导性。
   手写遍历慢一点，但它出错时会老老实实抛。 */
function copyTree(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const name of fs.readdirSync(from)) {
    const a = path.join(from, name);
    const b = path.join(to, name);
    if (fs.statSync(a).isDirectory()) copyTree(a, b);
    else fs.copyFileSync(a, b);
  }
}

/* ---------- 1. 生成 www（白名单） ---------- */
if (!SKIP_WWW) {
  step("生成 mobile/www（白名单拷贝 + 注入壳胶水）");
  const r = libMobile.runBuild();
  log(`  ✓ ${r.files.length} 个文件 / ${(r.bytes / 1048576).toFixed(1)} MB`);
} else if (!fs.existsSync(path.join(WWW, "index.html"))) {
  throw new Error("--skip-www 但 mobile/www 不存在");
}
const shellHtml = fs.readFileSync(path.join(WWW, "index.html"), "utf8");
if (!shellHtml.includes("__wlNativePause")) throw new Error("www/index.html 里没有壳胶水，先去掉 --skip-www");
const assetV = (fs.readFileSync(path.join(ROOT, "assets", "data-config.js"), "utf8")
  .match(/assetVersion[\"']?\s*[:=]\s*[\"']?(\d+)/) || [])[1] || "?";
log(`  内容版本：v${assetV} · 壳版本：${vn} (${vc})`);

if (!fs.existsSync(path.join(ANDROID, "res", "mipmap-anydpi-v26", "ic_launcher.xml"))) {
  throw new Error("启动图标还没生成：python tools/build-icons.py");
}

/* ---------- 2. 拷进 ASCII 暂存区 ---------- */
step(`拷进暂存区（${WORK}）`);
try {
  fs.rmSync(WORK, { recursive: true, force: true });
} catch (e) {
  /* ★ 这里最常见的原因不是「没权限」，而是**暂存目录被占用**：Windows 不允许删除
     某个进程的当前工作目录。本机踩过一次 —— 为了在浏览器里验证 mobile/www，
     用 python -m http.server 起的临时站点目录恰好放在 WORK 里，于是整个构建卡在这一行，
     而原生工具给出的只有 "Some operations were aborted"，看不出任何根因。
     顺带一提：起临时站点别放在 work/ 下面（放别处就不会碰到这件事）。 */
  throw new Error(`清不掉暂存目录 ${WORK}\n  原因：${e.message}\n`
    + "  最常见的原因是有进程的工作目录还在里面（例如曾在 work/ 下起过 http server），\n"
    + "  或者编辑器 / 杀毒软件正占用其中文件。关掉它们再重试。");
}
fs.mkdirSync(PROJ, { recursive: true });
copyTree(path.join(ANDROID, "res"), path.join(PROJ, "res"));
copyTree(path.join(ANDROID, "src"), path.join(PROJ, "src"));
fs.copyFileSync(path.join(ANDROID, "AndroidManifest.xml"), path.join(PROJ, "AndroidManifest.xml"));

/* ★ versionCode / versionName 必须在**清单**里注入，不能只靠 aapt2 link 的
   --version-code / --version-name —— 那两个参数会被忽略（与 --min-sdk-version 是
   同一条规律：命令行只管资源筛选，产物清单以清单文件为准）。
   2026-09-22 实测：version.json 已 bump 到 2 / 1.0.1，产物 badging 读出来仍是
   "versionCode='1' versionName='1.0.0'"，而 APK 文件名用的却是 version.json 的值 ——
   名实不符。后果不是「装不上」而是更难查的东西：覆盖安装的版本判定、应用商店的
   更新比较，全都按清单里那个错的数字走。
   注入的是**暂存副本**：源清单保留兜底值，所以不带 version.json 直接跑也不至于崩。 */
{
  const src = fs.readFileSync(path.join(ANDROID, "AndroidManifest.xml"), "utf8");
  /* 判据是「清单里有没有这两个属性」，不是「替换后字符串有没有变」——
     后者在两处值恰好相同时会误判成「注入失效」而把构建拦下来。 */
  const vcRe = /android:versionCode="\d+"/;
  const vnRe = /android:versionName="[^"]*"/;
  if (!vcRe.test(src) || !vnRe.test(src)) {
    throw new Error("清单里找不到 android:versionCode / versionName 属性，注入失效"
      + "（不许静默跳过：那会让 APK 文件名与包内版本各说各话）");
  }
  fs.writeFileSync(path.join(PROJ, "AndroidManifest.xml"),
    src.replace(vcRe, `android:versionCode="${vc}"`).replace(vnRe, `android:versionName="${vn}"`));
}

copyTree(WWW, STAGE);
fs.mkdirSync(path.join(WORK, "gen"), { recursive: true });
log("  ✓ proj/ + stage/（www）");

/* ---------- 3. 编资源 ---------- */
step("aapt2 compile（res/ → 扁平化资源包）");
run(AAPT2, ["compile", "--dir", path.join(PROJ, "res"), "-o", path.join(WORK, "res.zip")]);
log("  ✓ res.zip");

/* ---------- 4. 链资源 + 打包 assets ---------- */
step("aapt2 link（生成 base.apk：清单 + 资源 + assets）");
const linkArgs = [
  "link", "-o", path.join(WORK, "base.apk"),
  "-I", ANDROID_JAR,
  "--manifest", path.join(PROJ, "AndroidManifest.xml"),
  "-R", path.join(WORK, "res.zip"),
  /* -A 把 stage（就是 www）的**内容**放进 APK 的 assets/ 根下 ——
     所以 AssetServer 里是 getAssets().open("assets/app.js") 而不是 "www/assets/app.js"。
     这条是猜不得的，下面第 10 步会拆包核对。 */
  "-A", STAGE,
  "--java", path.join(WORK, "gen"),
  /* ★ 这里**刻意不传** --version-code / --version-name：实测 aapt2 会忽略它们，
     产物里的值来自清单。而「传了却无效」比「不传」更危险 —— 它让人以为版本号
     已经跟着 version.json 走了（2026-09-22 就是这么被骗过一次）。
     真正的注入在第 2 步：改的是暂存副本的 AndroidManifest.xml。 */
  "--min-sdk-version", String(MIN_SDK),
  /* target 这个是**真的会被写进产物**的（自检里读得到 min 26 → target 35）；
     min 那个不写进产物，靠清单里的 <uses-sdk> 兜底。两者缺一不可。 */
  "--target-sdk-version", String(TARGET_SDK),
  "--auto-add-overlay",
];
if (DEBUG) linkArgs.push("--debug-mode");
run(AAPT2, linkArgs);
log(`  ✓ base.apk  ${(fs.statSync(path.join(WORK, "base.apk")).size / 1048576).toFixed(1)} MB`);

/* ---------- 5. 编 Java ---------- */
step("javac（四个类，零第三方依赖）");
const srcs = [];
for (const base of [path.join(PROJ, "src"), path.join(WORK, "gen")]) {
  const walk = d => {
    for (const n of fs.readdirSync(d)) {
      const p = path.join(d, n);
      if (fs.statSync(p).isDirectory()) walk(p);
      else if (n.endsWith(".java")) srcs.push(p);
    }
  };
  walk(base);
}
fs.mkdirSync(path.join(WORK, "classes"), { recursive: true });
/* -source/-target 8 + -bootclasspath android.jar：不用 --release 时唯一正确的组合 ——
   --release 会改用 JDK 自己的 ct.sym，那样 android.* 反而看不见了。
   （android.jar 里同时含 android.* 与 java.* 的桩，所以它当 bootclasspath 是完整的。） */
run(JAVAC, [
  "-encoding", "UTF-8", "-nowarn",
  "-source", "8", "-target", "8",
  "-bootclasspath", [ANDROID_JAR, LAMBDA_STUBS].join(path.delimiter),
  "-classpath", [ANDROID_JAR, LAMBDA_STUBS].join(path.delimiter),
  "-d", path.join(WORK, "classes"),
  ...srcs,
]);
log(`  ✓ ${srcs.length} 个源文件 → classes/`);

/* ---------- 6. dex ---------- */
step("d8（→ classes.dex）");
const classesJar = path.join(WORK, "classes.jar");
run(JAR, ["cf", classesJar, "-C", path.join(WORK, "classes"), "."]);
/* ★ d8 不会自建 `--output` 目录：目录不存在时报的是
     "Invalid output: <dir>  Output must be a .zip or .jar archive or an existing directory"
   看着像「路径类型给错了」，其实只是「目录没建」。它甚至不会把 .dex 写到别处去。 */
fs.mkdirSync(path.join(WORK, "dex"), { recursive: true });
run(JAVA, [
  "-cp", D8_JAR, "com.android.tools.r8.D8",
  "--lib", ANDROID_JAR,
  "--min-api", String(MIN_SDK),
  "--output", path.join(WORK, "dex"),
  ...(DEBUG ? [] : ["--release"]),
  classesJar,
]);
log(`  ✓ classes.dex  ${(fs.statSync(path.join(WORK, "dex", "classes.dex")).size / 1024).toFixed(0)} KB`);

/* ---------- 7. 合并 dex 进 apk ---------- */
step("并入 classes.dex");
fs.copyFileSync(path.join(WORK, "base.apk"), path.join(WORK, "unsigned.apk"));
/* 用 aapt（v1 的 add）而不是自己写 zip 容器：它保留既有条目的压缩方式与顺序，
   只把新条目塞进去。★ resources.arsc 必须保持 STORED 且 4 字节对齐（Android 11+ 的硬要求），
   自己重写 zip 很容易把它一起重压了 —— 那种 APK 装得上去、一启动就崩。 */
execFileSync(AAPT1, ["add", path.join(WORK, "unsigned.apk"), "classes.dex"],
  { cwd: path.join(WORK, "dex"), stdio: ["ignore", "pipe", "pipe"] });
log("  ✓ unsigned.apk");

/* ---------- 8. 对齐 ---------- */
step("zipalign -p 4（★ 必须在签名之前，签名会破坏对齐）");
const aligned = path.join(WORK, "aligned.apk");
run(ZIPALIGN, ["-f", "-p", "4", path.join(WORK, "unsigned.apk"), aligned]);
log("  ✓ aligned.apk");

/* ---------- 8b. 条目名分隔符必须是 /（★ 2026-09-22 真机白屏的根因） ----------
 * aapt2 在 Windows 上走 `-A <dir>` 时，会拿文件系统的相对路径去拼条目名 —— 而那个
 * 相对路径用的是**反斜杠**。实测产物原始字节：
 *     assets/assets\app.js
 *     assets/assets\covers\fb-...jpg
 * 注意只有 aapt2 自己加上去的那层 `assets/` 是正斜杠，往下一律 `\`。
 *
 * 后果是**整壳白屏**，而且一点线索都不给：Android 的 AssetManager 按条目名精确查找
 * （`getAssets().open("assets/app.js")` 找的就是这个名字本身，不会替你换算分隔符），
 * 所以 98 个资源里 96 个取不到；唯独顶层无分隔符的 `assets/index.html` 能取到
 * —— 页面因此「加载成功」，而源 index.html 的 body 本来是空的、界面全由 app.js 建出，
 * 于是屏幕上只剩主题背景色。没有报错、没有红字，用户能提供的只有「白屏」两个字。
 *
 * ★ 为什么在这里改、而且只改名字字节：
 *   ① 位置：zipalign **之后**、签名**之前**。改名若在 zipalign 之前，对齐是按旧布局算的；
 *      若在签名之后，v2/v3 签名覆盖中央目录，改一个字节签名就废。
 *   ② 手段：`\` 与 `/` 都是 1 字节 → 原地等长替换 → 不动任何偏移，于是
 *      resources.arsc 的 STORED + 4 字节对齐原样保留、中央目录里的 local header 偏移
 *      不用重算。重写一遍 zip 容器则三条全丢（那种 APK 装得上、一启动就崩）。
 *   ③ 只改名字区间内的字节，绝不全文替换 —— 压缩数据里完全可能合法地出现 0x5C。
 *
 * ★ 为什么不能指望「自检会拦住」：那条自检原来走 python 的 zipfile，而它在 Windows 上
 *   会把条目名里的 `\` **静默换成** `/`（ZipInfo 源码原话：ensure paths always use
 *   forward slashes）。于是期望值与实际值都被美化成正斜杠、两边相等 ——
 *   **自卫兵把缺陷改写成正常再报平安**。现在整条自检改走 lib-zip.cjs（自己解析中央目录，
 *   一个字节都不改写），并且「条目名含反斜杠」本身就是一条硬断言。
 */
step("修 ZIP 条目名分隔符（Windows aapt2 给子目录写的是反斜杠）");
{
  const buf = fs.readFileSync(aligned);
  const before = fs.statSync(aligned).size;
  const norm = libZip.normalizeEntryNames(buf);
  fs.writeFileSync(aligned, buf);
  /* 长度必须逐字节不变 —— 这是「等长替换」这个前提的自检。真变了说明有人把这里
     改成了别的手段，那时候偏移已经不对了，必须当场拦下而不是继续签名。 */
  if (fs.statSync(aligned).size !== before) {
    throw new Error(`改名后文件长度变了（${before} → ${fs.statSync(aligned).size}）：`
      + "等长替换的前提被破坏，中央目录偏移已经不可信，别再往下签名");
  }
  log(`  ✓ 改写 ${norm.fixed} 处反斜杠 / ${norm.names.length} 个条目（文件长度不变）`);
}

/* ---------- 9. 签名 ---------- */
step(DEBUG ? "apksigner（debug 签名）" : "apksigner（生产签名）");
const keyDir = path.join(HOME, "keystore");
const store = path.join(keyDir, DEBUG ? "debug.jks" : "wordlens.jks");
const alias = DEBUG ? "androiddebugkey" : "wordlens";
const passFile = path.join(keyDir, DEBUG ? "debug-pass.txt" : "pass.txt");
fs.mkdirSync(keyDir, { recursive: true });
let pass;
if (fs.existsSync(store) && fs.existsSync(passFile)) {
  pass = fs.readFileSync(passFile, "utf8").trim();
} else {
  /* 随机密码 + 落盘：比硬编码一个 "android" 强得多，而且换机器时
     「keystore + pass.txt」这一对拷过去就能继续覆盖升级。 */
  pass = run(process.execPath, ["-e",
    "process.stdout.write(require('crypto').randomBytes(18).toString('base64url'))"]);
  fs.writeFileSync(passFile, pass + "\n");
  log(`  生成新密钥：${path.basename(store)}（密码见 ${path.join(path.basename(keyDir), path.basename(passFile))}）`);
  run(KEYTOOL, [
    "-genkeypair", "-v",
    "-keystore", store, "-alias", alias,
    "-keyalg", "RSA", "-keysize", "4096", "-validity", "10000",
    "-storepass", pass, "-keypass", pass,
    "-dname", DEBUG ? "CN=Android Debug,O=Android,C=US" : "CN=WordLens,OU=WordLens,O=WordLens,C=CN",
  ]);
  /* 用 keytool 生成时它会把整个流程打到 stderr，run() 只收 stdout —— 这里确认一下产物真的存在，
     别让「密码文件写好了、keystore 却没生成」这种半成品混过去。 */
  if (!fs.existsSync(store)) throw new Error("keytool 没有生成 keystore，检查上面的输出");
}
const outName = `wordlens-${vn}-${DEBUG ? "debug" : "release"}-vc${vc}.apk`;
const signed = path.join(WORK, outName);
run(JAVA, [
  "-cp", SIGNER_JAR, "com.android.apksigner.ApkSignerTool", "sign",
  "--ks", store, "--ks-key-alias", alias,
  "--ks-pass", "pass:" + pass, "--key-pass", "pass:" + pass,
  /* ★ v1（JAR signing）**刻意关掉**（2026-09-22 实测，交付前独立复核时才发现）：
     在 Windows 上，apksigner 生成的 `META-INF/MANIFEST.MF` 条目名用的是**反斜杠** ——
     实测 `Name: assets/assets\app.js`，而 JAR 规范要求用 `/`。于是这份 v1 签名
     `verify` 报 `Verified using v1 scheme: false`：**文件在、但校验不过**。
     「存在但无效的签名」比「没有签名」更糟 —— 严格的安装器 / 审计工具看到它会直接拒绝。
     而 minSdk=26（Android 8.0）**只用 v2/v3**（v2 覆盖 Android 7.0+，v3 覆盖 9.0+ 的密钥轮换），
     v1 是给 API < 24 的老设备用的，这里根本不需要 ——
     apksigner 自己的默认行为（minSdk ≥ 24 → 不生成 v1）本来就是对的，之前写 `true` 是我多此一举。
     实测（开启时）：v1 false / v2 true / v3 true；关掉后应当只剩 v2/v3。
     ★ 教训：`--v1-signing-enabled true` 会**安静地产出一个无效签名**，不报错、不警告。 */
  "--v1-signing-enabled", "false", "--v2-signing-enabled", "true", "--v3-signing-enabled", "true",
  "--out", signed, aligned,
]);
log(`  ✓ ${outName}`);

/* ---------- 10. 自检（全部在 ASCII 路径上做） ---------- */
step("自检");
const verify = run(JAVA, ["-cp", SIGNER_JAR, "com.android.apksigner.ApkSignerTool", "verify", "--print-certs", signed]);
const cert = (verify.match(/Signer #1 certificate DN:\s*(.+)/) || [])[1] || "?";
const badging = run(AAPT2, ["dump", "badging", signed]);
const grab = re => (badging.match(re) || [])[1] || "?";
/* ★ minSdk 这一条有两个独立的坑，都踩过（2026-09-22）：
   ① 清单里漏掉 <uses-sdk>：产物就没有 minSdkVersion 字段，系统按 minSdk=1 对待 ——
      不是「装不上」（那还算好的），而是低版本设备装得上、一启动就崩。
      而 targetSdkVersion 恰好会被 aapt2 注入，于是只缺 min 一项，日志上只显示「min ? → target 35」，
      很容易被当成显示问题滑过去。现在它会让构建真的失败。
   ② 正则写错：badging 打出来的是 `minSdkVersion:'26'`，S 是**大写**，
      所以 /sdkVersion:/ 永远匹配不到，恒为 "?" —— 症状和 ① 一模一样。
      ★ 守卫报红时先确认守卫自己是对的：假警报和假绿一样费时间。 */
const minSdkSeen = grab(/minSdkVersion:'([^']+)'/);

/* 拆包核对「白名单里的每个文件都真的在 APK 里」——
   「aapt2 -A 把内容放哪一层」这种事只有拆开看才知道，不能靠猜。
 *
 * ★ 这一节原来走 python 的 zipfile，2026-09-22 证明它是**假守卫**，两个洞：
 *   ① 没有 python 就 `catch { entries = null }` 整条跳过 —— 而在 Windows 上 Node 起的
 *      `python` 未必在 PATH 上（本机就是：Git Bash 里能跑，Node 里不一定）。跳过等于
 *      白名单守卫当场失效，而构建照样产出正式 APK、照样 11MB、照样有签名。
 *   ② 更隐蔽：**python 在 Windows 上会把条目名里的 `\` 静默换成 `/`**
 *      （ZipInfo 源码原话：ensure paths always use forward slashes）。于是「期望值」
 *      （来自 planFiles()，一串正斜杠）与「实际值」（被美化过的）永远相等 ——
 *      它把缺陷改写成正常再报平安。真机上 96 个资源取不到、整壳白屏的那一版，
 *      这条自检是**全绿**的。
 *   现在改走 lib-zip.cjs：自己解析中央目录，读出来是什么就报什么，不依赖任何解释器。
 */
const apkBuf = fs.readFileSync(signed);
const wanted = libMobile.planFiles();
let entries = null;
const problems = [];
try {
  /* ★ APK 里的路径口径是 `assets/` + 白名单相对路径：
       `aapt2 link -A <stage>` 把 stage 目录的**内容**整体挂在 APK 的 `assets/` 下，
       而 stage 里本身就带着一个 `assets/` 子目录 —— 于是 www 根的 index.html 变成
       `assets/index.html`，www 里的 `assets/app.js` 变成 `assets/assets/app.js`。
       这个层级对运行时是对的：AssetServer 收到 `/assets/app.js` 后调
       `getAssets().open("assets/app.js")`，getAssets() 的根正好是 APK 的 `assets/`。
       所以 auditApk 内部比的是 `"assets/" + f`（正斜杠，与 planFiles 的口径一致）。 */
  const a = libZip.auditApk(apkBuf, { want: wanted });
  entries = a.entries;
  problems.push(...a.problems);
} catch (e) {
  /* 拆包失败**必须**让构建失败：读不出产物就没法证明白名单对了，
     「读不出来 → 当没事」正是上面 ① 的老毛病。 */
  problems.push(`拆包对账失败：${(e && e.message) || e}`);
}

/* ---------- 10b. 自检结论 ---------- */
/* ★ 自检不通过就不许拷回仓库（2026-09-22 修）：
   原来是「先拷回、再设 exitCode」—— 产物已经落在 outputs/apk 里了，退出码只是事后的一句遗言。
   而一个缺了 app.js 的 APK 照样 11MB、照样有签名、照样装得上，只是打开就是白屏。
   CI 或者人只要看「文件在不在」，就会把它当成好的发出去。
   现在：自检有任何一条不过 → 产物留在暂存区，outputs/ 里上一个好 APK 一个字节都不动。
   （顺带：这条也让上面那些 `?` 之类的静默失效变成了「构建根本不产出」。） */
if (minSdkSeen === "?") problems.push("产物里没有 minSdkVersion（清单缺 <uses-sdk>）：系统按 minSdk=1 对待，低版本设备装上就崩");
else if (minSdkSeen !== String(MIN_SDK)) problems.push(`minSdk 不一致：清单 ${minSdkSeen} vs 脚本 MIN_SDK ${MIN_SDK}`);

/* ★ 包内版本必须与 version.json 一致。文件名取的是 version.json，包内取的是清单 ——
   两边一旦漂移，名字与内容就各说各话，而屏幕上不会有任何东西变红
   （2026-09-22 漏过一次：文件叫 1.0.1-vc2，包里却是 1 / 1.0.0）。
   覆盖升级与应用商店的更新比较，读的都是包内版本。
   ★ 必须放进 problems：拷回**之后**再设 exitCode 是拦不住坏产物的
   （「自检不过就不拷回」这条保护只对 problems 生效）。 */
const vcSeen = grab(/versionCode='([^']+)'/);
const vnSeen = grab(/versionName='([^']+)'/);
if (vcSeen !== String(vc) || vnSeen !== vn) {
  problems.push(`包内版本与 version.json 不一致：包内 ${vcSeen} / ${vnSeen}，期望 ${vc} / ${vn}`);
}

/* ★ 产物级端到端：APK 里那份 index.html 到底有没有带上壳胶水。
   2026-09-22 白屏事故的教训 —— 当时的核对只到「98 个文件都在、大小对」，
   从来没有一条断言检查过「里面那层壳胶水真的注入了」。**文件在 ≠ 内容对**，
   而白屏恰恰是后者：页面加载成功、脚本却没跑起来。
   现在连读文件也走 lib-zip：不再有「本机没有 python → 读不出来 → 断言跳过」这条路。
   （原来那版走 python 的 print()，在 Windows 上 stdout 默认 cp936、HTML 里全是中文注释
   → UnicodeEncodeError → 断言在**正常构建时也报红**，是恒红型假守卫；换成 lib-zip 顺带解决。） */
let glueLack = null;
if (entries) {
  let html = "";
  let why = "";
  try {
    const data = libZip.readEntryByName(apkBuf, "assets/index.html");
    if (!data) throw new Error("产物里没有 assets/index.html");
    html = data.toString("utf8");
  } catch (e) {
    /* 不许静默吞：读不到就说清为什么。历史上这里有过一次 ReferenceError 被 `catch {}`
       吞掉、伪装成「读不出产物」的，白查了一轮。 */
    why = String((e && e.message) || e).split("\n")[0];
  }
  const need = [["window.WORDLENS_NATIVE", "壳旗标"], ["__wlInsets", "安全区入口"],
    ["checkRendered", "故障自检"], ["__wlNativeBack", "返回键"]];
  if (!html) {
    problems.push("读不出产物里的 assets/index.html，无法核对壳胶水是否注入"
      + (why ? `（${why}）` : ""));
  } else {
    const lack = need.filter(([k]) => !html.includes(k)).map(([, n]) => n);
    /* glueLack 只在**真缺**时才非 null。否则打印那行会输出「⚠ 缺 」（后面空白），
       看着像在报警而其实没事 —— 比不打印更容易误导人。 */
    if (lack.length) {
      glueLack = lack;
      problems.push(`产物内 index.html 缺少：${lack.join("、")}（壳胶水没注入或注入不全）`);
    }
  }
}

/* ---------- 11. 拷回仓库（仅自检通过时） ---------- */
if (problems.length) {
  log("");
  for (const p of problems) log(`  ✗ ${p}`);
  log("");
  log(`  ！构建产物留在 ${signed}`);
  log("    没有拷回 outputs/apk —— 不让一个坏产物盖掉上一个好产物。");
  process.exit(2);
}
fs.mkdirSync(OUTDIR, { recursive: true });
const outApk = path.join(OUTDIR, outName);
fs.copyFileSync(signed, outApk);
const size = fs.statSync(outApk).size;

log("");
log(`  APK        ${path.relative(ROOT, outApk)}  ${(size / 1048576).toFixed(2)} MB`);
log(`  包名       ${grab(/package: name='([^']+)'/)}`);
log(`  版本       ${vcSeen} / ${vnSeen}`);
log(`  SDK        min ${minSdkSeen} → target ${grab(/targetSdkVersion:'([^']+)'/)}`);
log(`  签名       ${DEBUG ? "debug" : "生产"}  ${cert}`);
/* 这一行原来是无条件写「（壳胶水已注入）」—— 那是**陈述**，不是**核验**：
   它跟产物里到底有没有没关系。现在打的是上面真拆包读出来的结果。 */
log(`  内容       v${assetV} · 壳胶水 ${glueLack === null
  ? "✓ 产物内已核（旗标 / 安全区 / 自检 / 返回键）" : "⚠ 缺 " + glueLack.join("、")}`);
/* entries 永远不会是 null 走到这里 —— 拆包失败已经进了 problems 并 exit 2。
   所以这一行打的是**真核过的**数字，不再有「跳过」这个档。 */
{
  const nAssets = entries.filter(x => x.name.startsWith("assets/")).length;
  const nBs = entries.filter(x => x.name.includes("\\")).length;
  log(`  assets     APK 内 ${entries.length} 个条目（assets/ 下 ${nAssets}）· 白名单 ${wanted.length} 项`
    + ` ✓ 一个不缺一个不多 · 条目名反斜杠 ${nBs} 个`);
}
log("");
log("装到手机：把 APK 拷过去点「安装」即可（首次需允许「安装未知应用」）。");
if (!DEBUG) {
  log(`★ 签名密钥与密码在 ${path.join(HOME, "keystore")} —— 丢了就再也无法覆盖升级（只能卸载重装、数据清零），务必另存一份。`);
}

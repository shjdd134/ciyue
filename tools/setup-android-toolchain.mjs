#!/usr/bin/env node
/* 一次性安装 Android 构建工具链（JDK + platform + build-tools）。
 *
 * ★ 为什么工具链不能放在仓库目录里（2026-09-22 踩到）：
 *   本仓库的绝对路径是 `D:\四级词阅` —— 含中文。而 aapt2 / zipalign / d8 这些是
 *   Windows 原生程序：Node 按 UTF-16 传参，Windows 给非 Unicode 程序降级成 ANSI 码页，
 *   这些程序又按 UTF-8 解 —— 于是 `D:\四级词阅\mobile\android\res` 被解成乱码，
 *   报的是「failed to open directory: 系统找不到指定的文件」，而目录明明在那儿。
 *   （实测：同一条命令换成纯 ASCII 路径立刻能跑。）
 *   所以工具链与构建暂存目录一律放在纯 ASCII 路径下，tools/build-apk.mjs 会核对这一点。
 *
 * 默认装到 <仓库所在盘的根>\wl-android（本机即 D:\wl-android）。
 * 可用环境变量 WORDLENS_ANDROID_HOME 覆盖。
 *
 * 用法：node tools/setup-android-toolchain.mjs
 *       node tools/setup-android-toolchain.mjs --check     只核对，不下载
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..");
const HOME = process.env.WORDLENS_ANDROID_HOME || path.join(path.parse(ROOT).root, "wl-android");

const PARTS = [
  {
    name: "jdk",
    dir: "jdk",
    url: "https://api.adoptium.net/v3/binary/latest/17/ga/windows/x64/jdk/hotspot/normal/eclipse",
    note: "Temurin JDK 17（javac / jar / keytool / java）",
    need: ["bin/javac.exe", "bin/java.exe", "bin/keytool.exe"],
  },
  {
    name: "platform-35",
    dir: "sdk/platforms",
    url: "https://dl.google.com/android/repository/platform-35_r02.zip",
    note: "Android 35 平台（只要里面的 android.jar 给 javac 当 bootclasspath）",
    need: ["android-35/android.jar"],
  },
  {
    name: "build-tools-35",
    dir: "sdk/build-tools",
    url: "https://dl.google.com/android/repository/build-tools_r35_windows.zip",
    note: "build-tools 35（aapt2 / d8 / zipalign / apksigner；解出来的目录名是 android-15，正常）",
    need: ["android-15/aapt2.exe", "android-15/zipalign.exe", "android-15/lib/d8.jar", "android-15/lib/apksigner.jar"],
  },
];

const checkOnly = process.argv.includes("--check");

if (!/^[\x20-\x7E]+$/.test(HOME)) {
  console.error(`✗ 工具链目录必须是纯 ASCII 路径，当前是：${HOME}`);
  console.error("  用 WORDLENS_ANDROID_HOME 指到一个全英文的目录，例如 D:\\wl-android");
  process.exit(1);
}

const have = part => part.need.every(f => fs.existsSync(path.join(HOME, part.dir, f)));

if (checkOnly) {
  let bad = 0;
  for (const p of PARTS) {
    const ok = have(p);
    if (!ok) bad++;
    console.log(`  ${ok ? "✓" : "✗"} ${p.name.padEnd(16)} ${p.note}`);
  }
  console.log(bad ? `\n缺 ${bad} 项 —— 跑 node tools/setup-android-toolchain.mjs 补上` : `\n工具链就绪：${HOME}`);
  process.exit(bad ? 1 : 0);
}

fs.mkdirSync(HOME, { recursive: true });
console.log(`工具链目录：${HOME}`);

for (const p of PARTS) {
  if (have(p)) {
    console.log(`\n▸ ${p.name}：已就位，跳过`);
    continue;
  }
  console.log(`\n▸ ${p.name}：${p.note}`);
  const dl = path.join(HOME, "dl");
  fs.mkdirSync(dl, { recursive: true });
  const zip = path.join(dl, p.name + ".zip");
  if (!fs.existsSync(zip)) {
    console.log(`  下载 ${p.url}`);
    /* 用 node 自带的 fetch 而不是 curl：少了「这台机器有没有 curl」这个变量。
       流式写盘，避免把 300MB 整个读进内存。 */
    execFileSync(process.execPath, ["--input-type=module", "-e", `
      import fs from "node:fs";
      const res = await fetch(${JSON.stringify(p.url)}, { redirect: "follow" });
      if (!res.ok) { console.error("HTTP " + res.status); process.exit(1); }
      const out = fs.createWriteStream(${JSON.stringify(zip)});
      for await (const chunk of res.body) out.write(chunk);
      await new Promise(r => out.end(r));
    `], { stdio: ["ignore", "inherit", "inherit"] });
  }
  const mb = (fs.statSync(zip).size / 1048576).toFixed(0);
  console.log(`  解压（${mb} MB）→ ${p.dir}/`);
  const dest = path.join(HOME, p.dir);
  fs.mkdirSync(dest, { recursive: true });
  /* 走 PowerShell 的 Expand-Archive：Windows 上一定有，不用赌这台机器有没有 unzip/tar
     （Git Bash 里的 tar 是 GNU tar，读不了 zip）。 */
  execFileSync("powershell", ["-NoProfile", "-NonInteractive", "-Command",
    `Expand-Archive -LiteralPath '${zip}' -DestinationPath '${dest}' -Force`],
    { stdio: ["ignore", "inherit", "inherit"] });
  if (!have(p)) {
    console.error(`  ✗ 解压后仍找不到：${p.need.join(", ")}`);
    process.exit(1);
  }
  fs.rmSync(zip);
  console.log("  ✓");
}

fs.rmSync(path.join(HOME, "dl"), { recursive: true, force: true });
console.log(`\n工具链就绪：${HOME}`);
console.log("接下来：node tools/build-apk.mjs");

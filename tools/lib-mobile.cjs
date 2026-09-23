/* 生成 Android 壳用的 www/ —— **白名单拷贝，不把整个仓库打进安装包**。
 *
 * 为什么要这个脚本（2026-09-22，APK 审查报告第⑥条）：仓库里有 tools/（含抓取缓存）、
 * outputs/（报告与截图）、HANDOFF.md、计划稿、.bak/ —— 全是开发素材，一条都不该进
 * 安装包：白占体积不说，抓取缓存与原刊 HTML 还会把「内容再分发」的风险一并带进去。
 *
 * 白名单怎么来（可被守卫检查，见 tools/audit.js 的 [T] 节）：
 *   ① index.html 里 src/href 引用的 assets/* 全部
 *   ② assets/fonts/ 整目录（fonts.css 用相对 url 引，不在 index.html 里）
 *   ③ assets/covers/ 整目录（由 data-covers.js / paras[].img 动态引用）
 *   ④ assets/icons/ 整目录（manifest 引用；缺了不影响运行，但装上桌面会没图标）
 *   ⑤ app.js 里**运行期用 JS 拼路径**引用的本地资源（见 dynamicRefs()）
 *
 * ★★ 第 ⑤ 条是 2026-09-23 补的，漏它的代价已经付过一次：
 *   白名单原先只有 ①~④，而 ① 的正则扫的是**静态** src/href —— 运行期拼出来的
 *   `assets/data-tapdict.js` / `assets/data-examples.js` 永远抽不到，于是两个文件都没进
 *   1.0.3(vc4) 的包：壳里进阅读页点词报 404、顶部弹「壳自检」红条，而当时**所有守卫全绿**
 *   （那条守卫的左右两侧共用同一个抽取器，恒真）。完整复盘见 REFERENCE-mechanics.md §14.13。
 *
 * 注入：拷过去的那份 index.html 里加 `window.WORDLENS_NATIVE = true`，
 * 让 app.js 跳过 Service Worker 注册（壳里页面版本由安装包控制，见 app.js 注释）。
 *
 * 写在 .cjs 里是刻意的：audit.js 是 CJS，require 得到才能对这几个判据做端到端断言
 * （「函数写对了但没接线」是 2026-09-22 v73 踩过的假守卫形态）。
 *
 * 用法（CLI 见 tools/build-mobile.mjs）：
 *   node tools/build-mobile.mjs            # 生成 mobile/www
 *   node tools/build-mobile.mjs --check    # 只对账，不写盘
 */
"use strict";
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "mobile", "www");

/* 不打进安装包的东西。白名单本身已不含它们，这里留一份用于**断言**（白名单被改坏时红）。 */
const NEVER_SHIP = ["tools/", "outputs/", ".bak/", ".tmp/", ".workbuddy/", ".android-toolchain/", "mobile/"];

/* 整目录规则（②③④）。提成常量是因为 dynamicRefs() 要拿它判断「模板拼出来的那个目录
   是不是已经被整批带走了」—— 两处各写一份名单就是下一处会漂移的重复。 */
const DIR_RULES = ["assets/fonts", "assets/covers", "assets/icons"];

/** 运行期按需加载的本地资源（白名单规则 ⑤）。返回仓库相对路径数组，排序稳定。
 *
 *  口径：剥掉注释后，取 assets/app.js 里所有「字符串字面量形态的 assets/… 本地路径」。
 *    · 带 `?v=` 的（`` `assets/data-tapdict.js?v=${…}` ``）→ 去掉 query；
 *    · 含 `${…}` 的（`` `assets/covers/${key}.jpg` ``）→ 只取到目录，交由整目录规则带走，
 *      且**该目录必须在 DIR_RULES 里** —— 否则抛错（否则它会被静默漏掉，正是本函数的由来）；
 *    · 注释里的路径**不算**：app.js 的注释里出现过 `assets/data-words-mid.js`（≥2 处），
 *      不剥注释就会把它们一并收进白名单，判据被噪声顶宽。
 *
 *  不做存在性过滤：抽到不存在的路径就让它一路走到 runBuild 的 copyFileSync 上 ENOENT
 *  —— **宁可构建当场炸，也不要静默少带一个文件**（这正是 §14.13 那个缺陷的形状）。
 *  audit.js 另有一条断言在更早的位置把它变红，见那里的注释。 */
function dynamicRefs(root = ROOT) {
  const out = new Set();
  const src = fs.readFileSync(path.join(root, "assets", "app.js"), "utf8")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^[ \t]*\/\/.*$/gm, "");
  for (const m of src.matchAll(/["'`](assets\/[^"'`\s]+)["'`]/g)) {
    const raw = m[1];
    const p = raw.split("?")[0];
    if (p.includes("${")) {
      const dir = p.slice(0, p.lastIndexOf("/"));
      if (!DIR_RULES.includes(dir)) {
        throw new Error(`app.js 里有一段模板拼出来的资源路径 ${raw}，`
          + `但它的目录 ${dir} 不在整目录规则里（${DIR_RULES.join(" / ")}）—— `
          + `这条路径会被静默漏掉，别放过它`);
      }
      continue;
    }
    out.add(p);
  }
  return [...out].sort();
}

/** 白名单：仓库相对路径数组（排序后稳定，便于对账） */
function planFiles(root = ROOT) {
  const files = new Set(["index.html", "manifest.webmanifest"]);
  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  for (const m of html.matchAll(/(?:src|href)="(assets\/[^"?]+)(?:\?[^"]*)?"/g)) files.add(m[1]);
  for (const dir of DIR_RULES) {
    const abs = path.join(root, dir);
    if (!fs.existsSync(abs)) continue;
    for (const f of fs.readdirSync(abs)) files.add(`${dir}/${f}`);
  }
  /* ⑤ 运行期用 JS 拼路径加载的（data-tapdict.js / data-examples.js …）。
     ★ 这一条是 1.0.3(vc4) 缺文件的根因所在 —— 别删，见 dynamicRefs() 与 REF §14.13。 */
  for (const f of dynamicRefs(root)) files.add(f);
  return [...files].sort();
}

/** 把壳胶水内联进 head 最前面；找不到 <head> 必须抛错，不许静默跳过。
 *  （defer 脚本在解析后按顺序执行，内联脚本放 head 里一定先于 app.js 运行。）
 *  胶水正文在 mobile/shell-glue.js —— 单独成文件，才能被 node --check 与 audit 沙箱直接跑。 */
function injectShellGlue(html) {
  if (html.includes("window.WORDLENS_NATIVE")) return html;   // 幂等
  const i = html.indexOf("<head>");
  if (i < 0) throw new Error("index.html 里找不到 <head>，注入点失效 —— 别静默跳过");
  const glue = fs.readFileSync(path.join(ROOT, "mobile", "shell-glue.js"), "utf8");
  /* 内联进 <script> 的文本里出现 `</script` 会把标签当场截断 —— 整份壳白屏。
     胶水是源码、随时可能被人写进一句含这个序列的字符串，所以构建期直接拦死。 */
  if (/<\/script/i.test(glue)) throw new Error("shell-glue.js 里含 </script，内联进 <script> 会截断标签");
  const tag = `\n<script>\n${glue}\n</script>`;
  return html.slice(0, i + "<head>".length) + tag + html.slice(i + "<head>".length);
}

/** 真拷文件。out 可指定（守卫里拷到临时目录做端到端断言）。返回拷了几个文件。 */
function runBuild({ root = ROOT, out = OUT } = {}) {
  const files = planFiles(root);
  const leaked = files.filter(f => NEVER_SHIP.some(p => f.startsWith(p)));
  if (leaked.length) throw new Error(`白名单里混进了不该进包的东西：${leaked.join(", ")}`);
  fs.rmSync(out, { recursive: true, force: true });
  fs.mkdirSync(out, { recursive: true });
  let bytes = 0;
  for (const f of files) {
    const src = path.join(root, f);
    const dst = path.join(out, f);
    fs.mkdirSync(path.dirname(dst), { recursive: true });
    if (f === "index.html") {
      const html = injectShellGlue(fs.readFileSync(src, "utf8"));
      fs.writeFileSync(dst, html);
      bytes += Buffer.byteLength(html);
    } else {
      fs.copyFileSync(src, dst);
      bytes += fs.statSync(dst).size;
    }
  }
  return { files, bytes, out };
}

module.exports = { ROOT, OUT, NEVER_SHIP, DIR_RULES, dynamicRefs, planFiles, injectShellGlue, runBuild };

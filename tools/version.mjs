#!/usr/bin/env node
/* 词阅 WordLens —— 资源版本号：单一来源 + 自增 + 校验
 *
 * 【五处，不是一处】
 * 「资源版本号」在这个仓库里写在 **五处**，任何一处漏改都会出事：
 *   ① index.html              所有静态资源的 `?v=N`（实测 13 处：manifest / 3 个 css /
 *                             每个 data-*.js / app.js）
 *                             漏改 → 浏览器继续吃旧文件，用户看不到新内容
 *   ② sw.js  `const CACHE`     `wordlens-cache-vN`
 *   ③ sw.js  头部注释           `缓存策略（vN，…）`
 *   ④ assets/app.js            `caches.open("wordlens-cache-vN")`
 *                              + 第 11 行 `ASSET_VERSION` 的回退默认值
 *   ⑤ assets/data-config.js    `assetVersion: "N"`   ← **本脚本认定的唯一真源**
 *                              （app.js:11 本来就回退读它，这里只是把契约钉死）
 *
 * 【已有的校验为什么不够】
 *   tools/cache-version-test.mjs   —— 已进 daily.mjs 第 5 步回归，比较 ① ② ④ ⑤
 *   tools/publish.mjs:94-105       —— 发布前闸门，不一致直接 fail
 *   两处都只**报错**，全仓库没有任何地方能**改**。于是每次发版要手工改 16 个数字，
 *   实测就出过这种事：sw.js 头注释写着 `（v51，阅读界面改版）`，而 `CACHE` 早已是 v52
 *   —— 改的人只改了代码、忘了改注释，而上面两个校验脚本都不看注释（③ 是盲区）。
 *   本脚本补的是「改」这一半，并把 ③ 也纳入校验。
 *
 * 【用法】
 *   node tools/version.mjs           显示五处版本 + 一致性
 *   node tools/version.mjs --check   不一致 exit 1，并指出是哪一处
 *   node tools/version.mjs --bump    真源 +1，写回全部五处（发版前跑）
 *   node tools/version.mjs --sync    数字不变，把其余四处对齐到真源（修手滑）
 *
 * 改完版本号要重跑回归 —— cache-version-test.mjs 会独立复核一次（两把尺子）。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/* 唯一真源。改它的**值**只能走 --bump / --sync，不要手改。 */
export const SOURCE_FILE = "assets/data-config.js";

const filesOf = root => ({
  "index.html": path.join(root, "index.html"),
  "sw.js": path.join(root, "sw.js"),
  "assets/app.js": path.join(root, "assets", "app.js"),
  [SOURCE_FILE]: path.join(root, SOURCE_FILE),
});

export function readVersion(root = ROOT) {
  const m = fs.readFileSync(filesOf(root)[SOURCE_FILE], "utf8").match(/assetVersion:\s*["'](\d+)["']/);
  if (!m) throw new Error(`真源缺失：${SOURCE_FILE} 里找不到 assetVersion —— 它是版本号唯一真源，不能缺`);
  return m[1];
}

/* 采集五处实际写着的版本号。每项 {label, file, value, hits?}。
 * value 为空字符串 = 正则没匹配到 —— 那本身就是故障（说明某处被删了或改了写法）。 */
export function scan(root = ROOT) {
  const f = filesOf(root);
  const text = {};
  for (const [k, p] of Object.entries(f)) text[k] = fs.readFileSync(p, "utf8");
  const one = (file, re) => (text[file].match(re) || [])[1] || "";
  const htmlVs = [...text["index.html"].matchAll(/[?&]v=(\d+)/g)].map(m => m[1]);
  return [
    { label: "index.html 静态资源 ?v=", file: "index.html", value: htmlVs.length ? [...new Set(htmlVs)].join("/") : "", hits: htmlVs.length },
    { label: "sw.js  CACHE 常量", file: "sw.js", value: one("sw.js", /const CACHE = "wordlens-cache-v(\d+)"/) },
    { label: "sw.js  头注释", file: "sw.js", value: one("sw.js", /缓存策略（v(\d+)/) },
    { label: "app.js caches.open", file: "assets/app.js", value: one("assets/app.js", /caches\.open\("wordlens-cache-v(\d+)"\)/) },
    { label: "app.js 回退默认值", file: "assets/app.js", value: one("assets/app.js", /assetVersion \|\| "(\d+)"/) },
    { label: `真源 ${SOURCE_FILE}`, file: SOURCE_FILE, value: one(SOURCE_FILE, /assetVersion:\s*["'](\d+)["']/) },
  ];
}

export function check(root = ROOT) {
  const truth = readVersion(root);
  const rows = scan(root);
  const bad = rows.filter(r => r.value !== truth);
  return { truth, rows, bad, ok: bad.length === 0 };
}

/* 把五处统一写成 version。返回 [{label, file, hits}]，hits=0 表示那处没被改到（要么已是该值，要么正则失配）。 */
export function applyVersion(version, root = ROOT) {
  const v = String(version);
  if (!/^\d+$/.test(v)) throw new Error(`版本号必须是纯数字：${version}`);
  const plans = [
    { file: "index.html", label: "index.html 静态资源 ?v=", re: /([?&]v=)\d+/g, rep: m => m[1] + v },
    { file: "sw.js", label: "sw.js  CACHE 常量", re: /(wordlens-cache-v)\d+/g, rep: m => m[1] + v },
    { file: "sw.js", label: "sw.js  头注释", re: /(缓存策略（v)\d+/g, rep: m => m[1] + v },
    { file: "assets/app.js", label: "app.js caches.open", re: /(caches\.open\("wordlens-cache-v)\d+("\))/g, rep: m => m[1] + v + m[2] },
    { file: "assets/app.js", label: "app.js 回退默认值", re: /(assetVersion \|\| ")\d+(")/g, rep: m => m[1] + v + m[2] },
    { file: SOURCE_FILE, label: "真源 assetVersion", re: /(assetVersion:\s*["'])\d+(["'])/g, rep: m => m[1] + v + m[2] },
  ];
  const paths = filesOf(root);
  const buf = {};
  const readBuf = file => (buf[file] ??= fs.readFileSync(paths[file], "utf8"));
  const out = [];
  for (const p of plans) {
    const before = readBuf(p.file);
    let hits = 0;
    const after = before.replace(p.re, (...args) => { hits++; return p.rep(args); });
    buf[p.file] = after;
    out.push({ label: p.label, file: p.file, hits });
  }
  for (const [file, text] of Object.entries(buf)) fs.writeFileSync(paths[file], text, "utf8");
  return out;
}

/* ---------------- CLI ---------------- */
const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));
if (isMain) {
  const args = process.argv.slice(2);
  const has = f => args.includes(f);

  const report = (truth, rows) => {
    console.log(`资源版本号 —— 真源 ${SOURCE_FILE} = ${truth}\n`);
    for (const r of rows) {
      const mark = r.value === truth ? "✓" : r.value ? "✗" : "✗";
      const tail = r.value ? (r.hits ? `  (${r.hits} 处)` : "") : "  ← 正则失配，该处写法被改过了";
      console.log(`  ${mark} ${r.label.padEnd(24)} ${r.value || "(空)"}${r.value === truth ? "" : tail}`);
    }
  };

  try {
    if (has("--bump") || has("--sync")) {
      const before = check();
      report(before.truth, before.rows);
      if (!before.ok) console.log(`\n  ⚠ 改之前本来就有 ${before.bad.length} 处与真源不一致（已一并统一）`);
      const target = has("--sync") ? before.truth : String(Number(before.truth) + 1);
      if (has("--bump")) console.log("");
      const applied = applyVersion(target);
      const verb = has("--sync") ? "对齐" : "自增";
      console.log(`\n已${verb}到 v${target}：`);
      for (const a of applied) console.log(`  · ${a.label.padEnd(24)} 改写 ${a.hits} 处`);
      const after = check();
      if (!after.ok) {
        console.error(`\n✗ ${verb}后仍不一致，有 ${after.bad.length} 处没改到（正则失配）—— 请手工检查这几处：`);
        for (const b of after.bad) console.error(`    ${b.label}（${b.file}）= ${b.value || "(空)"}`);
        process.exit(1);
      }
      console.log(`\n✓ 五处已统一为 v${target}`);
      console.log(`  下一步：node tools/cache-version-test.mjs   # 用另一把尺子独立复核一遍`);
      process.exit(0);
    }

    const res = check();
    report(res.truth, res.rows);
    if (res.ok) {
      console.log(`\n✓ 五处一致（v${res.truth}）`);
      process.exit(0);
    }
    /* 默认（--show）只展示不判死；--check 才用退出码表达失败，方便被回归脚本调用。 */
    console.error(`\n✗ ${res.bad.length} 处与真源不一致：`);
    for (const b of res.bad) console.error(`    ${b.label}（${b.file}）= ${b.value || "(空)"}`);
    console.error(`\n  修法：node tools/version.mjs --sync   # 数字不变，把其余四处对齐到真源`);
    process.exit(has("--check") ? 1 : 0);
  } catch (e) {
    console.error(`✗ ${e.message}`);
    process.exit(1);
  }
}

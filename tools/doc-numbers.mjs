#!/usr/bin/env node
/* 词阅 WordLens —— 文档数字校验器
 *
 * 【为什么需要它】
 * 用户的原话：「我是不是忘了 rebuild metrics？」「README 现在写几篇来着？」
 * 根因不是缺脚本，是**文档里的数字没有任何东西在管**。实测 2026-09-18：
 *   · README 第 172 行还写着「19 篇」
 *   · HANDOFF §0.1 写着「9 篇 = 成长 6 + 人物 3」、基线 `f1f601e`
 *   而数据层实际是 **6 篇 = 成长 1 + 人物 1 + 足球 4**、基线 `46648a22`。
 *   两处都过期至少一轮，而且没有任何机制会在过期时出声。
 *
 * 【为什么只校验、不自动改写】
 * README / HANDOFF 是**叙述性文档** —— 同一个数字在不同上下文里含义不同：
 * 「成长 6 篇保留但成长 RSS 暂停」是**策略**描述；「文章 9 篇」是**现状**统述。
 * 自动改写会把策略句改成现状句，制造比数字过期更难发现的错误。
 * 所以本脚本分两级：
 *   ① 硬校验 —— HANDOFF §0.1 那张表（唯一「权威现状」入口，格式固定）不一致 → exit 1
 *   ② 提示   —— 叙述性文档里所有「N 篇 / N 句 / N 词 / ?v=N」列出来，给你人工核对，不判死
 *
 * 【锚点失配也是失败】
 * 如果 §0.1 的表格格式被改动导致正则匹配不到，报「锚点失配」并 exit 1 ——
 * 静态数据要区分「值不对」和「读不到」，否则改个格式守卫就静默失效了。
 *
 * 用法：
 *   node tools/doc-numbers.mjs          校验 + 报告
 *   node tools/doc-numbers.mjs --json   只输出实测值（JSON），供其它脚本消费
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { readVersion } from "./version.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ASSETS = path.join(ROOT, "assets");
const JSON_OUT = process.argv.includes("--json");

/* ---------------- 实测值：从数据文件算，不读任何文档 ---------------- */
const ctx = vm.createContext({ console, window: {} });
vm.runInContext("var window=globalThis;", ctx);
for (const f of ["data.js", "data-words-bulk-a.js", "data-words-full.js", "data-words-mid.js",
  "data-articles-extra.js", "data-ecdict.js", "data-wordfreq.js", "data-tapdict.js"]) {
  vm.runInContext(fs.readFileSync(path.join(ASSETS, f), "utf8"), ctx, { filename: f });
}
const g = vm.runInContext("({ articles: ARTICLES, keywords: KEYWORDS })", ctx);

/* 段落有**两种形状**：多句段 {sentences:[{en,cn}…]} 与单句段直接 {en,cn}。
 * 只遍历 p.sentences 会静默漏检（2026-09-17 守卫踩坑记录：重复组数从 8 涨到 20）。 */
const sentencesOf = p => Array.isArray(p?.sentences) ? p.sentences.filter(Boolean)
  : (p && (p.en || p.cn) ? [p] : []);
const TOKEN = /[A-Za-z]+(?:['’][A-Za-z]+)?/g;

let sentences = 0, words = 0;
for (const a of g.articles) {
  for (const p of a.paras || []) {
    for (const s of sentencesOf(p)) {
      sentences++;
      const m = String(s.en || "").match(TOKEN);
      if (m) words += m.length;
    }
  }
}

/* 栏目分类：文章 id 前缀就是栏目契约（gr- 成长 / people- 人物 / fb- 足球）。
 * 数据里没有 category 字段，所以用前缀 —— 前缀变了这里要跟着改（锚点失配会报出来）。 */
const CATS = [
  { key: "成长", re: /^gr-/ },
  { key: "人物", re: /^people-/ },
  { key: "足球", re: /^fb-/ },
];
const byCat = {};
const unknownIds = [];
for (const a of g.articles) {
  const hit = CATS.find(c => c.re.test(a.id));
  if (hit) byCat[hit.key] = (byCat[hit.key] || 0) + 1;
  else unknownIds.push(a.id);
}

const measured = {
  articles: g.articles.length,
  byCat,
  unknownIds,
  sentences,
  words,
  keywords: g.keywords.length,
  version: readVersion(ROOT),
  baseline: (() => {
    try { return JSON.parse(fs.readFileSync(path.join(ROOT, ".bak", "published.json"), "utf8")).commit || ""; }
    catch { return ""; }
  })(),
  articlesPerCat: CATS.map(c => byCat[c.key] || 0).join(" + "),
};

if (JSON_OUT) {
  console.log(JSON.stringify(measured, null, 1));
  process.exit(0);
}

/* ---------------- ① 硬校验：HANDOFF §0.1 结构化锚点 ---------------- */
const handoff = fs.readFileSync(path.join(ROOT, "HANDOFF.md"), "utf8");
const comma = n => n.toLocaleString("en-US");

const SPOTS = [
  {
    label: "文章篇数",
    re: /\|\s*文章\s*\|\s*\*\*(\d+)\s*篇/,
    want: String(measured.articles),
    hint: `表里应写 **${measured.articles} 篇 = 成长 ${byCat["成长"] || 0} + 人物 ${byCat["人物"] || 0} + 足球 ${byCat["足球"] || 0}**`,
  },
  {
    label: "句子 / 词数",
    re: /\|\s*句子\s*\/\s*词数\s*\|\s*\*\*([\d,]+)\s*句\s*\/\s*([\d,]+)\s*词/,
    want: [comma(measured.sentences), comma(measured.words)],
    got: m => [m[1], m[2]],
    hint: `表里应写 **${comma(measured.sentences)} 句 / ${comma(measured.words)} 词**`,
  },
  {
    label: "资源版本",
    re: /\|\s*资源版本\s*\|[^|]*\?v=(\d+)/,
    want: String(measured.version),
    hint: `表里应写 \`?v=${measured.version}\` · SW 缓存名 \`wordlens-cache-v${measured.version}\``,
  },
  {
    label: "词库规模",
    re: /\|\s*词库\s*\|\s*\*\*([\d,]+)\s*词/,
    want: comma(measured.keywords),
    hint: `表里应写 **${comma(measured.keywords)} 词**`,
  },
  {
    label: "发布基线 commit",
    re: /\|\s*发布基线\s*\|[^|]*\*\*`?([0-9a-f]{7,40})`?\*\*/,
    want: measured.baseline.slice(0, 7),
    hint: `表里应写 \`${measured.baseline.slice(0, 7)}\`（来自 .bak/published.json）`,
  },
];

console.log("实测值（来自数据文件与 .bak/published.json，不读任何文档）");
console.log(`  文章   ${measured.articles} 篇 = 成长 ${byCat["成长"] || 0} + 人物 ${byCat["人物"] || 0} + 足球 ${byCat["足球"] || 0}`);
console.log(`  句/词  ${comma(measured.sentences)} 句 / ${comma(measured.words)} 词`);
console.log(`  词库   ${comma(measured.keywords)} 词`);
console.log(`  版本   v${measured.version}`);
console.log(`  基线   ${measured.baseline ? measured.baseline.slice(0, 7) : "(读不到 .bak/published.json)"}`);
if (unknownIds.length) console.log(`  ⚠ ${unknownIds.length} 篇 id 前缀不在栏目契约内：${unknownIds.join(", ")}`);

console.log("\n① 硬校验 —— HANDOFF §0.1 权威现状表");
let hardFail = 0;
for (const s of SPOTS) {
  const m = handoff.match(s.re);
  if (!m) {
    hardFail++;
    console.log(`  ✗ ${s.label.padEnd(14)} 锚点失配（§0.1 表格格式被改过了？）`);
    console.log(`      ${s.hint}`);
    continue;
  }
  const got = s.got ? s.got(m) : m[1];
  const want = Array.isArray(s.want) ? s.want : [s.want];
  const gotArr = Array.isArray(got) ? got : [got];
  const same = want.length === gotArr.length && want.every((w, i) => w === gotArr[i]);
  if (same) {
    console.log(`  ✓ ${s.label.padEnd(14)} ${gotArr.join(" / ")}`);
  } else {
    hardFail++;
    console.log(`  ✗ ${s.label.padEnd(14)} 文档写 ${gotArr.join(" / ")}，实测 ${want.join(" / ")}`);
    console.log(`      ${s.hint}`);
  }
}

/* ---------------- ② 提示：叙述性文档里的数字（不判死） ---------------- */
const NARRATIVE = ["README.md"];
console.log("\n② 提示 —— 叙述性文档里的数字（人工核对，不判死）");
for (const f of NARRATIVE) {
  const text = fs.readFileSync(path.join(ROOT, f), "utf8");
  const hits = [];
  const push = (line, what) => hits.push(`      L${line}  ${what}`);
  text.split("\n").forEach((ln, i) => {
    for (const m of ln.matchAll(/(\d[\d,]*)\s*篇/g)) push(i + 1, `${m[1]} 篇`);
    for (const m of ln.matchAll(/(\d[\d,]*)\s*句\s*\/\s*([\d,]+)\s*词/g)) push(i + 1, `${m[1]} 句 / ${m[2]} 词`);
    for (const m of ln.matchAll(/\?v=(\d+)/g)) push(i + 1, `?v=${m[1]}`);
    for (const m of ln.matchAll(/wordlens-cache-v(\d+)/g)) push(i + 1, `cache v${m[1]}`);
  });
  if (hits.length) {
    console.log(`  ${f}（${hits.length} 处，当前实测 篇数=${measured.articles} 句=${comma(measured.sentences)} 词=${comma(measured.words)} v=${measured.version}）`);
    for (const h of hits) console.log(h);
  } else {
    console.log(`  ${f}  无数字表述`);
  }
}

/* ---------------- 结论 ---------------- */
if (hardFail) {
  console.error(`\n✗ HANDOFF §0.1 有 ${hardFail} 处与实测不符 —— 它是「权威现状」入口，必须改。`);
  console.error(`  注意：只动 §0.1；§0.2 是历史溯源，里面的旧数字是**故意**保留的，不要改。`);
  process.exit(1);
}
console.log("\n✓ HANDOFF §0.1 与实测一致");
process.exit(0);

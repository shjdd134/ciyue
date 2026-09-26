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

/* 栏目分类：文章 id 前缀就是栏目契约（gr- 成长 / people- 人物 / fb- 足球 / ob- AI / so- 社会 / tech- 科技 / hist- 历史）。
 * 数据里没有 category 字段，所以用前缀 —— 前缀变了这里要跟着改（锚点失配会报出来）。
 * ob- = Offbook Press 双语长文（tools/offbook.mjs），id 形态是 `ob-<slug>-c<章号>`。 */
const CATS = [
  { key: "成长", re: /^gr-/ },
  { key: "人物", re: /^people-/ },
  { key: "足球", re: /^fb-/ },
  { key: "AI", re: /^ob-/ },
  { key: "社会", re: /^so-/ },
  { key: "科技", re: /^tech-/ },
  { key: "历史", re: /^hist-/ },
];
const byCat = {};
const unknownIds = [];
for (const a of g.articles) {
  const hit = CATS.find(c => c.re.test(a.id));
  if (hit) byCat[hit.key] = (byCat[hit.key] || 0) + 1;
  else unknownIds.push(a.id);
}
/* 栏目拆解串（「成长 4 + 人物 6 + …」）。按 CATS 的声明顺序拼，**只列非空栏目** ——
 * 寓言当前为空，写进 §0.1 的注脚只会让人以为它有文章。
 * 抽成一处是因为它同时出现在「实测值」打印和「表里应写」的 hint 里，
 * 两处各写一遍必然漏改（2026-09-20 加 AI 栏目时正是漏了这两处）。 */
const breakdown = CATS.map(c => [c.key, byCat[c.key] || 0]).filter(([, n]) => n)
  .map(([k, n]) => `${k} ${n}`).join(" + ");

/* 已发布基线：.bak/published.json 的 `articles[]` 是**线上篇数**的代理。
 * 推送时记录，且纯 `--files` 路线不覆盖它（见 lib-release.mjs 的 updatePublished），
 * 所以它读到的就是「上一次发布出去的那批文章」。用来区分「文档写错」和「本地领先远端」。
 * 路径可被环境变量覆盖 —— 专给负向测试用（tools/doc-numbers-test.mjs），
 * 否则测「基线变动」就得改真实的 .bak/published.json，那是本项目的红线（别手改）。 */
const PUBLISHED_PATH = process.env.WORDLENS_PUBLISHED || path.join(ROOT, ".bak", "published.json");
const published = (() => {
  try { return JSON.parse(fs.readFileSync(PUBLISHED_PATH, "utf8")); }
  catch { return null; }
})();

const measured = {
  articles: g.articles.length,
  byCat,
  unknownIds,
  sentences,
  words,
  keywords: g.keywords.length,
  version: readVersion(ROOT),
  baseline: published?.commit || "",
  publishedArticles: Array.isArray(published?.articles) ? published.articles.length : null,
  articlesPerCat: CATS.map(c => byCat[c.key] || 0).join(" + "),
};

/* 「线上口径」的精确值：用基线的文章 id 从工作树里筛出「线上那批」，算出它们的篇/句/词。
 * 实测（2026-09-18）：基线 6 个 id 筛出 6 篇 → 1,751 句 / 22,125 词，与 §0.1 文档**一字不差**。
 * 有了精确值，「文档写的是不是线上值」才能严格判定 —— 只验不等式（如「小于工作树」）
 * 抓不住「写成一个明显偏小的错数」这类错误。
 * 基线 articles 与线上文章表同源：走 manifest 推送时两者一起更新，走纯 --files 时两者都不动。 */
const publishedIds = new Set((published?.articles || []).map(a => typeof a === "string" ? a : a?.id).filter(Boolean));
let pubSentences = 0, pubWords = 0, pubMatched = 0;
for (const a of g.articles) {
  if (!publishedIds.has(a.id)) continue;
  pubMatched++;
  for (const p of a.paras || []) {
    for (const s of sentencesOf(p)) {
      pubSentences++;
      const m = String(s.en || "").match(TOKEN);
      if (m) pubWords += m.length;
    }
  }
}
/* 基线里有 id 在工作树里找不到（文章被下架 / 基线过时）→ 线上口径不可信，别拿它当判据，
 * 此时 remoteCheck 一律返回 false 走硬失败 —— 宁可报「无法确认」，也不放过。 */
const publishedUsable = publishedIds.size > 0 && pubMatched === publishedIds.size;

/* 本地工作树是否领先已发布基线 —— 即「有未发布批次」。
 * 判断依据：工作树篇数 > 线上篇数。两者相等时下面的硬校验照旧全部生效。 */
const unpublishedAhead = publishedUsable && measured.articles > publishedIds.size;

if (JSON_OUT) {
  console.log(JSON.stringify(measured, null, 1));
  process.exit(0);
}

/* ---------------- ① 硬校验：HANDOFF §0.1 结构化锚点 ---------------- */
/* 路径同样可被覆盖 —— 负向测试要注入「写错数字的文档」，不能拿真的 HANDOFF.md 冒险。 */
const HANDOFF_PATH = process.env.WORDLENS_HANDOFF || path.join(ROOT, "HANDOFF.md");
const handoff = fs.readFileSync(HANDOFF_PATH, "utf8");
const comma = n => n.toLocaleString("en-US");

const SPOTS = [
  {
    label: "文章篇数",
    re: /\|\s*文章\s*\|\s*\*\*(\d+)\s*篇/,
    want: String(measured.articles),
    /* §0.1 的表头是「权威现状」= **线上**现状，所以本地领先基线时正确值不是工作树篇数，
     * 而是线上篇数（= 基线 articles 数）。判据见下方的 remoteCheck 分支。 */
    remoteCheck: got => publishedUsable && got[0] === String(publishedIds.size),
    hint: `表里应写 **${measured.articles} 篇 = ${breakdown}**`,
  },
  {
    label: "句子 / 词数",
    re: /\|\s*句子\s*\/\s*词数\s*\|\s*\*\*([\d,]+)\s*句\s*\/\s*([\d,]+)\s*词/,
    want: [comma(measured.sentences), comma(measured.words)],
    got: m => [m[1], m[2]],
    /* 用「线上那批」精确复算出的句词数做判据 —— 不验不等式，只认精确值。 */
    remoteCheck: got => publishedUsable && got[0] === comma(pubSentences) && got[1] === comma(pubWords),
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
    /* soft：**故意不判死**。commit 是「最近一次成功推送」的产物 —— _api-push 每次推送都会
     * 改写 .bak/published.json 的 commit，而推送清单**从不包含 HANDOFF.md**（文档要人工跟）。
     * 也就是「推送成功」这个动作本身就让文档 commit 立刻失配，硬校验必然红、且红得毫无意义
     * （2026-09-18 实测：推完 2e3a5f3 之后本校验立刻报「文档写 46648a2」）。
     * §0.1 仍保留 commit 值作为参考点，但只提示、不阻塞发布。 */
    soft: true,
    re: /\|\s*发布基线\s*\|[^|]*\*\*`?([0-9a-f]{7,40})`?\*\*/,
    want: measured.baseline.slice(0, 7),
    hint: `表里应写 \`${measured.baseline.slice(0, 7)}\`（来自 .bak/published.json）`,
  },
];

console.log("实测值（来自数据文件与 .bak/published.json，不读任何文档）");
console.log(`  文章   ${measured.articles} 篇 = ${breakdown}`);
console.log(`  句/词  ${comma(measured.sentences)} 句 / ${comma(measured.words)} 词`);
console.log(`  词库   ${comma(measured.keywords)} 词`);
console.log(`  版本   v${measured.version}`);
console.log(`  基线   ${measured.baseline ? measured.baseline.slice(0, 7) : "(读不到 .bak/published.json)"}`);
if (unpublishedAhead) {
  console.log(`  ⚠ 本地领先线上 ${measured.articles - publishedIds.size} 篇（工作树 ${measured.articles} > 线上 ${publishedIds.size}）—— 篇数/句词数按「线上口径」校验`);
  console.log(`     线上口径（基线 ${publishedIds.size} 篇 id 复算）= ${comma(pubSentences)} 句 / ${comma(pubWords)} 词`);
}
if (unknownIds.length) console.log(`  ⚠ ${unknownIds.length} 篇 id 前缀不在栏目契约内：${unknownIds.join(", ")}`);

console.log("\n① 硬校验 —— HANDOFF §0.1 权威现状表");
let hardFail = 0;
const remoteNoted = [];
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
  } else if (s.soft) {
    console.log(`  · ${s.label.padEnd(14)} 文档写 ${gotArr.join(" / ")}，实测 ${want.join(" / ")}（提示 · 每次推送都会变，文档要人工跟）`);
  } else if (s.remoteCheck && unpublishedAhead) {
    /* §0.1 记的是**线上**现状（表头原话：要看现状只读这一节），而实测值来自本地工作树。
     * 本地有未发布批次时这两个参照系本该分叉 —— 所以这时只要求文档符合「线上口径」，
     * 不再要求等于工作树。反向保证：两者相等时（unpublishedAhead 为假）照旧走下面的硬失败。 */
    if (s.remoteCheck(gotArr)) {
      remoteNoted.push(s.label);
      console.log(`  · ${s.label.padEnd(14)} 文档写 ${gotArr.join(" / ")}（提示 · 本地工作树 ${want.join(" / ")}，领先线上 ${measured.articles - publishedIds.size} 篇 —— §0.1 记的是**线上**值）`);
    } else {
      hardFail++;
      console.log(`  ✗ ${s.label.padEnd(14)} 文档写 ${gotArr.join(" / ")}，本地工作树 ${want.join(" / ")}`);
      console.log(`      本地有未发布批次（工作树 ${measured.articles} 篇 > 线上 ${publishedIds.size} 篇）时该值只能取「线上」口径 —— 这里既不是线上口径、也不是工作树口径。`);
      console.log(`      ${s.hint}`);
    }
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
if (remoteNoted.length) {
  console.log(`\n✓ HANDOFF §0.1 与「线上」一致 —— ${remoteNoted.length} 项（${remoteNoted.join(" / ")}）因本地有未发布批次而按线上口径校验。`);
  console.log(`  → 这批改动发布之后，回来把 §0.1 的这几项改成上面的「本地工作树」值。`);
  process.exit(0);
}
console.log("\n✓ HANDOFF §0.1 与实测一致");
process.exit(0);

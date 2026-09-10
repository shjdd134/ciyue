/* 从真实文章里抽例句 —— 不 AI 造句。
 *
 * 背景：4455 个词里只有 126 个（2.8%）带例句，词卡背面 97% 是空的。
 * 手工写 4000 条例句不现实，机器生成例句又违反本项目「英文一律是真实报道原文」的底线。
 *
 * 于是换个思路：文章库本身就有 1628 段真实英文 + 逐句译文。
 * 逐句翻译的副产品是——第 N 个英文句子恰好对得上第 N 个中文句子（实测 95.7% 段落句数完全对齐）。
 * 那么「英文原句 + 它在同一篇文章里的译文」就是现成的、真实的、成对的例句，零生成成本。
 *
 * 产出 assets/data-examples.js：WORD_EXAMPLES = { word: { en, cn, src, aid } }
 * 由 app.js 在启动时并回 WORDS（只补空缺，不覆盖人工撰写的例句）。
 *
 * 用法：node tools/build-examples.mjs [--dry]
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const ROOT = path.resolve(import.meta.dirname, "..");
const DRY = process.argv.includes("--dry");

/* ---------------- 载入数据（与浏览器同样的求值顺序） ---------------- */
const ctx = { console, window: null };
ctx.window = ctx;
vm.createContext(ctx);
for (const f of ["data.js", "data-words-bulk-a.js", "data-words-full.js",
                 "data-articles-extra.js", "data-articles-archive.js"]) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, "assets", f), "utf8"), ctx, { filename: f });
}
/* 注意：data.js 里的 ARTICLES 是 const，属于全局词法作用域、不挂到 globalThis 上，
   所以只能再跑一次表达式去取；WORDS 是 var，两种取法都行，这里统一走 runInContext。 */
const get = name => vm.runInContext(name, ctx);
const WORDS = get("WORDS");
const ARTICLES = get("ARTICLES");
console.log(`词库 ${WORDS.length} 词 · 文章 ${ARTICLES.length} 篇`);

/* ---------------- 词形：词库存原形，正文里常是变形 ----------------
 * 必须与 assets/app.js 的 wordForms 完全一致：抽例句时用什么形态去匹配，
 * 页面上就得能用什么形态去标色，否则会挑出「根本不含这个词的句子」
 * （第一版这里多猜了 -er/-est，于是 should 选中了含 shoulder 的句子、
 * late 选中了含 latest 的句子，而 app.js 标不出这两个「变形」——句子里压根没那个词）。
 * 保守优于激进：宁可少收几个例句，也不让词卡出现标不出目标词的句子。 */
function wordForms(word) {
  const w = String(word == null ? "" : word).toLowerCase().trim();
  if (!/^[a-z][a-z'-]*$/.test(w)) return [];        // 词组 / 非英文不猜形态
  const set = new Set([w]);
  if (w.length > 2) {
    set.add(w + "s");
    if (/[^aeiou]y$/.test(w)) set.add(w.slice(0, -1) + "ies");
    else if (/(s|x|z|ch|sh)$/.test(w)) set.add(w + "es");
    if (/e$/.test(w)) { set.add(w + "d"); set.add(w.slice(0, -1) + "ing"); }
    else {
      set.add(w + "ed"); set.add(w + "ing");
      if (/[^aeiou][aeiou][^aeiouwxy]$/.test(w)) { set.add(w + w.slice(-1) + "ed"); set.add(w + w.slice(-1) + "ing"); }
    }
  }
  return [...set].sort((a, b) => b.length - a.length);
}

/* ---------------- 断句 ---------------- */
const ABBR = /\b(Mr|Mrs|Ms|Dr|Prof|St|No|vs|etc|Jr|Sr|Co|Inc|Ltd|U\.S|U\.K|a\.m|p\.m|e\.g|i\.e|Capt|Sgt|Lt|Col|Gen|Sen|Rep|Gov|Rev)\./g;
const splitEn = t => String(t).replace(ABBR, m => m.replace(/\./g, "\u0001"))
  .split(/(?<=[.!?…])\s+/).map(s => s.replace(/\u0001/g, ".").trim()).filter(s => s.length > 20);
const splitCn = t => String(t).split(/(?<=[。！？…])/).map(s => s.trim()).filter(s => s.length > 4);

/* 先把所有段落切成「英文句 / 中文句」对齐好的候选池 */
const pool = [];
for (const a of ARTICLES) {
  for (const p of a.paras || []) {
    if (!p.en || !p.cn) continue;
    const en = splitEn(p.en), cn = splitCn(p.cn);
    if (!en.length || en.length !== cn.length) continue;   // 对不齐的整段放弃，宁缺勿错
    en.forEach((s, i) => pool.push({ en: s, cn: cn[i], a, low: s.toLowerCase() }));
  }
}
console.log(`候选句 ${pool.length} 条（来自句数对齐的段落）`);

/* ---------------- 每个词挑一句 ----------------
 * 挑选标准（按优先级）：
 *   1. 长度 60~150 字符最合适（一句半到两句，卡片放得下又有上下文）；
 *   2. 同一个句子最多被 2 个词引用，避免翻来覆去看到同一句；
 *   3. 靠前的文章优先（日期倒序，等于优先用新文章）。 */
function score(s) {
  const L = s.en.length;
  if (L < 45) return 0;
  if (L <= 150) return 100 - Math.abs(L - 105) / 2;
  if (L <= 200) return 60 - (L - 150) / 5;
  return 20;
}
/* 功能词不配例句：给 "a" / "the" 发一张词卡没有意义，而它们几乎出现在每一句里，
   不拦住的话会霸占候选池、把真词的例句挤掉。 */
const STOP = new Set("a an the and but or nor for yet so if as at by in of on to up out off per via".split(" "));

/* 商业/运营噪音：版权、返利声明、订阅引导这些句子里也含大量常见词，
   抽出来当例句等于把广告塞进词卡。 */
const JUNK = /affiliate|commission|we may earn|sign up|newsletter|subscribe|cookie|advertisement|all rights reserved|follow us|share this|read more|terms of (service|use)|privacy polic|©|getty|image credit|photo(?:graph)?:|credit:|https?:\/\//i;

const used = new Map();          // 句子 → 已被引用的次数
const out = {};
let hit = 0, skipped = 0;
for (const w of WORDS) {
  if (w.example) continue;                       // 已有例句（含人工撰写的）不动
  if (String(w.word || "").length < 3 || STOP.has(String(w.word || "").toLowerCase())) { skipped++; continue; }
  const forms = wordForms(w.word);
  if (!forms.length) continue;
  const res = forms.map(f => new RegExp(`\\b${f.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`));
  let best = null, bestScore = -1;
  for (const s of pool) {
    if (!res.some(re => re.test(s.low))) continue;
    if ((used.get(s.en) || 0) >= 2) continue;
    if (JUNK.test(s.en)) continue;
    /* 句子开头是小写/数字多半是被断句切坏的半截，不要 */
    if (!/^["“'(A-Z]/.test(s.en)) continue;
    const sc = score(s) + (s.a.date ? 0 : -5);
    if (sc > bestScore) { bestScore = sc; best = s; }
  }
  if (!best || bestScore <= 0) continue;
  used.set(best.en, (used.get(best.en) || 0) + 1);
  /* 来源里常常已经带了日期（"ELLE · 2026-09-09"），别再拼一次 */
  const srcName = best.a.source || "原刊";
  const src = (best.a.date && !srcName.includes(best.a.date)) ? `${srcName} · ${best.a.date}` : srcName;
  out[w.word] = { en: best.en, cn: best.cn, src };
  hit++;
}

const haveBefore = WORDS.filter(w => w.example).length;
console.log(`新增例句 ${hit} 条；例句覆盖率 ${haveBefore}/${WORDS.length} → ${haveBefore + hit}/${WORDS.length}（${((haveBefore + hit) / WORDS.length * 100).toFixed(1)}%）`);

/* ---------------- 写盘 ---------------- */
const body = `/* 词阅 WordLens —— 真实例句（自动生成，请勿手改；运行 node tools/build-examples.mjs 重新生成）
 *
 * 来源：文章库里 1628 段真实报道原文 + 逐句译文。逐句翻译的副产品是第 N 个英文句子
 * 对得上第 N 个中文句子（实测 95.7% 段落完全对齐，对不齐的整段放弃），于是
 * 「英文原句 + 它在同一篇文章里的译文」就是成对的真实例句——没有一句是机器造的。
 *
 * 共 ${hit} 条，只用来填补没有例句的词；人工撰写的例句永远优先，不会被覆盖。
 */
const WORD_EXAMPLES = ${JSON.stringify(out, null, 2)};

if (typeof WORDS !== "undefined") {
  let n = 0;
  for (const w of WORDS) {
    if (w.example) continue;                 // 已有例句不动
    const ex = WORD_EXAMPLES[w.word];
    if (!ex) continue;
    w.example = ex.en;
    w.exampleCn = ex.cn;
    if (!w.source) w.source = ex.src;
    n++;
  }
  if (typeof window !== "undefined") window.__ADDED_EXAMPLES__ = n;
}
`;
const file = path.join(ROOT, "assets", "data-examples.js");
if (DRY) {
  const demo = Object.entries(out).slice(0, 6);
  console.log("\n[试运行] 样本：");
  for (const [k, v] of demo) console.log(`  ${k}\n    EN ${v.en}\n    CN ${v.cn}\n    —— ${v.src}`);
} else {
  fs.writeFileSync(file, body);
  console.log(`已写入 assets/data-examples.js（${(body.length / 1024).toFixed(0)}KB）`);
}

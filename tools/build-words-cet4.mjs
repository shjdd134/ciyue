/* 词阅 WordLens —— CET-4 完整大纲词表生成器
 *
 * 为什么需要这一层：
 *   data-words-full.js 里的「四级核心」是 2013 词，它是从 4454 词的大纲里
 *   按「语料高频 ∪ 真题高频 ∪ 手工精编」筛出来的**子集** —— 适合当默认高亮，
 *   但它回答不了「这个词到底是不是四级大纲词」。用户想调高亮范围时，
 *   「全部四级」这一档在数据层就缺一份完整大纲。
 *
 * 本层口径：
 *   cet4.jsonl 的全部词条，小写去重。**不做任何筛选**（不剔功能词、不按词频排序），
 *   保持它作为「大纲」的原始语义 —— 筛掉哪些词是**运行时**按高亮档位决定的，
 *   不该在数据层提前替用户做掉。
 *
 * 数据源：
 *   tools/.examples-cache/cet4.jsonl（7.4MB，7508 条 / 4544 个去重词）
 *   每条 { word, us, uk, translations[], phrases[], sentences[] }
 *   它就是 tools/build-core-vocab.mjs 注释里那个「4454 词完整考纲」的源，
 *   与核心词库同源，口径对得上。
 *
 * 产物：assets/data-words-cet4.js → window.WORDS_CET4 = ["abandon", ...]
 *   加载链排在 data-words-mid.js 之后、app.js 之前（见 index.html）。
 *   ⚠️ 只存词表，不存释义：这些词的查询走 WORDS 完整卡或 TAPDICT 轻量卡，
 *   再存一份释义等于把同一件事做两遍（实测 1551 个「仅大纲独有」的词里
 *   1516 个 TAPDICT 已可查）。
 *
 * 用法：node tools/build-words-cet4.mjs [--dry]
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "tools", ".examples-cache", "cet4.jsonl");
const DST = path.join(ROOT, "assets", "data-words-cet4.js");
const DRY = process.argv.includes("--dry");

/* ---------------- 1. 读大纲源 ---------------- */
if (!fs.existsSync(SRC)) {
  console.error(`缺少数据源：${SRC}`);
  console.error("（该文件随仓库走；丢失时需重新拉取四级词库）");
  process.exit(1);
}
const raw = fs.readFileSync(SRC, "utf8").trim().split("\n");
const words = [];
const seen = new Set();
let bad = 0;
for (const line of raw) {
  let o;
  try { o = JSON.parse(line); } catch { bad++; continue; }
  const w = String(o && o.word || "").trim().toLowerCase();
  /* 只收纯英文单词（允许连字符与撇号），撇开短语与带空格的条目 —— 高亮是按
     token 匹配的，含空格的条目永远匹配不上，留在表里只会虚增字数。 */
  if (!/^[a-z][a-z'-]*$/.test(w)) { if (w) bad++; continue; }
  if (seen.has(w)) continue;
  seen.add(w);
  words.push(w);
}
words.sort();

/* ---------------- 2. 与现有学习词表对账 ---------------- */
const ctx = { console, window: null }; ctx.window = ctx;
vm.createContext(ctx);
for (const f of ["data.js", "data-words-bulk-a.js", "data-words-full.js", "data-words-mid.js"]) {
  const p = path.join(ROOT, "assets", f);
  if (fs.existsSync(p)) vm.runInContext(fs.readFileSync(p, "utf8"), ctx, { filename: f });
}
const WORDS = vm.runInContext("WORDS", ctx);
const study = new Set(WORDS.map(w => w.word.toLowerCase()));
const inter = words.filter(w => study.has(w)).length;
const only = words.length - inter;
console.log(`大纲词 ${words.length} · 已在学习词表 ${inter} · 仅大纲独有 ${only} · 丢弃条目 ${bad}`);
console.log("仅大纲独有样本：", words.filter(w => !study.has(w)).slice(0, 10).join(", "));

/* ---------------- 3. 输出 ---------------- */
const banner = `/* 词阅 WordLens —— CET-4 完整大纲词表（自动生成，请勿手改；node tools/build-words-cet4.mjs 重新生成）
 *
 * ${words.length} 个词，来自 tools/.examples-cache/cet4.jsonl（四级词库全量），小写去重、未做筛选。
 * 用途：阅读页「词汇高亮范围」的「全部四级」档 —— 它比核心层宽，
 * 其中 ${inter} 个词已在学习词表里（有完整词条），另有 ${only} 个是「仅大纲独有」。
 * 只存词表不存释义：查询走 WORDS 完整卡或 TAPDICT 轻量卡（实测仅大纲独有的 ${only} 词里
 * 有 ${only - 35} 个 TAPDICT 已可查，其余由文章级补充词典兜底）。
 *
 * ⚠️ 高亮与查词是两个系统：本表**只**决定「标不标色」，不决定「能不能点」。
 * 点词的覆盖面由 WORDS + TAPDICT + ARTICLE_WORDS 决定。 */

window.WORDS_CET4 = [
`;
/* 每行 12 个词，便于人读与 diff */
const lines = [];
for (let i = 0; i < words.length; i += 12) {
  lines.push("  " + words.slice(i, i + 12).map(w => JSON.stringify(w)).join(", ") + ",");
}
const tail = "];\n";
if (lines.length) lines[lines.length - 1] = lines[lines.length - 1].replace(/,$/, "");
const out = banner + lines.join("\n") + "\n" + tail;

if (DRY) {
  console.log(`--dry：将写入 ${(Buffer.byteLength(out) / 1024).toFixed(1)}KB，未落盘`);
} else {
  fs.writeFileSync(DST, out);
  console.log(`已写入 ${path.relative(ROOT, DST)}（${(Buffer.byteLength(out) / 1024).toFixed(1)}KB）`);
}

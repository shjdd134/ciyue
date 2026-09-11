/* 词阅 WordLens · 四级核心词库重建（一次性）
 *
 * 目标：把 4454 词的「CET4 完整考纲」缩成 ~2000 词的四级核心词库。
 *
 * 口径（四条并集）：
 *   ① 语料高频 —— ECDICT 当代语料词频 f ≤ 2500（5 万词级语料统计，可靠代理「常用度」）
 *   ② 真题高频 —— liut969/CET《英语四级真题高频词汇》1250 词
 *                 （近 5 年 30 套四级真题逐词统计，用 ECDICT 的词形表还原成原形）
 *   ③ 手工精编 —— data.js WORDS_CORE 的 30 个精选词（带词根词缀/同根词/助记，产品的招牌内容）
 *   ④ 通用高频向缺口词 —— cet4-gaps-general.json（2026-09-11 用户拍板「通用高频向」，
 *                 冲刺池反查：f≤2500 但词表漏掉的词）
 * 再剔除纯功能词（the / of / to …），背单词不该背这些。
 *
 * 另用真题表反查词库缺口：真题里高频、但我们词库没有的词（people / part / pay 这类），
 * 从分级词典库补进核心词库 —— 实测原版词库确实缺这些常用词。
 *
 * 用法：node tools/build-core-vocab.mjs [--dry]
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const ROOT = path.resolve(import.meta.dirname, "..");
const CACHE = path.join(ROOT, "tools", ".examples-cache");
const DRY = process.argv.includes("--dry");

/* ---------------- 1. 载入现有词库 ---------------- */
/* 先单独吃 data.js，把 WORDS_CORE 拎出来 —— 它留在原文件里不动，重建时不能重复写进别的文件 */
const cctx = { console, window: null }; cctx.window = cctx; vm.createContext(cctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, "assets", "data.js"), "utf8"), cctx, { filename: "data.js" });
const CORE_WORDS = vm.runInContext("WORDS", cctx).map(w => w.word.toLowerCase());

const ctx = { console, window: null }; ctx.window = ctx; vm.createContext(ctx);
for (const f of ["data.js", "data-words-bulk-a.js", "data-words-full.js", "data-ecdict.js"]) {
  const p = path.join(ROOT, "assets", f);
  if (fs.existsSync(p)) vm.runInContext(fs.readFileSync(p, "utf8"), ctx, { filename: f });
}
const WORDS = vm.runInContext("WORDS", ctx);
const EC = vm.runInContext("WORD_META", ctx);
const byWord = new Map(WORDS.map(w => [w.word.toLowerCase(), w]));
/* bulk-a 的词在合并时被剥掉了 list 字段，用它判定来源 */
const BULK_SET = new Set(WORDS.filter(w => w.list === undefined).map(w => w.word.toLowerCase()));
console.log(`现有词库 ${WORDS.length} 词 · WORDS_CORE ${CORE_WORDS.length} · bulk-a ${BULK_SET.size}`);

/* ---------------- 2. 真题高频表 ---------------- */
const hf = JSON.parse(fs.readFileSync(path.join(CACHE, "cet4-hf.json"), "utf8"));

/* 面形 → 原形：走 ECDICT 的词形变化表，与 app.js / build-examples 同一套逻辑 */
const surf2lemma = new Map();
for (const w of WORDS) {
  const lemma = w.word.toLowerCase();
  if (!surf2lemma.has(lemma)) surf2lemma.set(lemma, lemma);
  for (const part of String(EC[lemma]?.x || "").split("/")) {
    if (!part.includes(":")) continue;
    for (const v of part.split(":")[1].split(",")) {
      const s = v.trim().toLowerCase();
      if (s && !surf2lemma.has(s)) surf2lemma.set(s, lemma);
    }
  }
}
const hfLemma = new Map();
const hfUnmapped = [];
for (const [w, n] of Object.entries(hf)) {
  const lem = surf2lemma.get(w.toLowerCase());
  if (lem) hfLemma.set(lem, Math.max(hfLemma.get(lem) || 0, n));
  else hfUnmapped.push([w.toLowerCase(), n]);
}
console.log(`真题表 ${Object.keys(hf).length} 个面形 → ${hfLemma.size} 个原形；${hfUnmapped.length} 个词库没有`);

/* ---------------- 3. 功能词表 ---------------- */
const STOP = new Set(`a an the and or but if while because so that this these those there here then than
as at by for from in into of on to with about above after against along among around before behind
below beneath beside between beyond during except inside like near off onto out outside over past
since through throughout till toward under until up upon within without
i me my mine you your yours he him his she her hers it its we us our ours they them their theirs
who whom whose which what when where why how
am is are was were be been being do does did done doing have has had having will would shall should
can could may might must
not no nor none nothing any some all both each every few many much more most other another such
very too also just only even still yet again once ever never always often sometimes
s t d ll re ve m n`.split(/\s+/).filter(Boolean));

/* ---------------- 4. 三级核心词 ---------------- */
const F = w => { const e = EC[String(w).toLowerCase()]; return (e && e.f) || Infinity; };
const CORPUS_HI = 2500;

const corpusSet = WORDS.filter(w => F(w.word) <= CORPUS_HI).map(w => w.word.toLowerCase());
const curated = WORDS.filter(w => /^List /.test(w.list || "")).map(w => w.word.toLowerCase());
const hfSet = [...hfLemma.keys()];
const union = new Set([...corpusSet, ...hfSet, ...curated]);
const core = new Set([...union].filter(w => !STOP.has(w) && w.length > 2));

console.log(`\n① 语料高频 f≤${CORPUS_HI}   ${corpusSet.length}`);
console.log(`② 真题高频（还原原形）  ${hfSet.length}`);
console.log(`③ 手工精编             ${curated.length}`);
console.log(`   并集 ${union.size} → 剔功能词后 ${core.size}`);

/* ---------------- 5. 分级词典库（补缺 + 补例句的底料） ---------------- */
const LEVELS = [
  ["四级词库", "cet4.jsonl"], ["高中词库", "lv-gaozhong.jsonl"], ["初中词库", "lv-chuzhong.jsonl"],
  ["六级词库", "lv-liuji.jsonl"], ["考研词库", "lv-kaoyan.jsonl"], ["托福词库", "lv-tuofu.jsonl"],
];
const DICT = new Map();
for (const [lv, file] of LEVELS) {
  const p = path.join(CACHE, file);
  if (!fs.existsSync(p)) { console.error(`缺少源数据 ${p}`); process.exit(1); }
  for (const line of fs.readFileSync(p, "utf8").split("\n")) {
    if (!line.trim()) continue;
    let o; try { o = JSON.parse(line); } catch { continue; }
    const k = String(o.word || "").toLowerCase();
    if (k && !DICT.has(k)) DICT.set(k, { entry: o, level: lv });
  }
}
console.log(`分级词典库合计 ${DICT.size} 词`);

/* 真题表暴露的词库缺口 */
const DROP = new Set(`san california venice unesco york harvard francisco uk bj ai italy jill thomas
pas wo non per cannot thousands fewer were are an unfinished emotionally carefully
america american british chinese english french german japanese spanish soviet russian indian asian african european
harvard oxford cambridge`.split(/\s+/).filter(Boolean));

const deflate = s => {
  const out = [];
  if (s.length > 4 && s.endsWith("ies")) out.push(s.slice(0, -3) + "y");
  if (s.length > 4 && /(ches|shes|sses|xes|zes)$/.test(s)) out.push(s.slice(0, -2));
  if (s.length > 3 && s.endsWith("es")) out.push(s.slice(0, -2));
  if (s.length > 3 && s.endsWith("s") && !s.endsWith("ss")) out.push(s.slice(0, -1));
  if (s.length > 4 && s.endsWith("ed")) { out.push(s.slice(0, -2)); out.push(s.slice(0, -1)); }
  if (s.length > 5 && s.endsWith("ing")) { out.push(s.slice(0, -3)); out.push(s.slice(0, -3) + "e"); }
  if (s.length > 5 && s.endsWith("ally")) out.push(s.slice(0, -4) + "al");
  else if (s.length > 5 && s.endsWith("ly")) out.push(s.slice(0, -2));
  return out;
};
const gaps = new Map();
for (const [surf, n] of hfUnmapped) {
  if (DROP.has(surf)) continue;
  let hit = null;
  for (const c of [surf, ...deflate(surf)]) {
    if (byWord.has(c) || core.has(c) || STOP.has(c) || c.length <= 2) continue;
    if (DICT.has(c)) { hit = c; break; }
  }
  if (hit) gaps.set(hit, { n: Math.max(gaps.get(hit)?.n || 0, n), lv: DICT.get(hit).level });
}
console.log(`真题表暴露的词库缺口 ${gaps.size} 个 → 从分级词典库补进来`);

/* ---------------- 5b. 通用高频向缺口词（第④源） ----------------
 * 2026-09-11 多源交叉校验后用户拍板「通用高频向」：只补通用语料本身高频
 * （ECDICT f ≤ 2500，与①同阈值）但词表漏掉的词（perspective / revenue / context …）；
 * 「真题高频但通用语料中低频」的考试向词不收。列表由 .tmp/_gap-general.mjs
 * 从冲刺池反查算出后固化在 cet4-gaps-general.json（随仓库，重建可复现）。 */
const gapGeneralPath = path.join(CACHE, "cet4-gaps-general.json");
let gapGeneral = new Set();
if (fs.existsSync(gapGeneralPath)) {
  gapGeneral = new Set(
    Object.keys(JSON.parse(fs.readFileSync(gapGeneralPath, "utf8")).words)
      .filter(w => !byWord.has(w) && DICT.has(w) && !STOP.has(w))
  );
  console.log(`④ 通用高频向缺口词            ${gapGeneral.size}`);
}

const FINAL = [...new Set([...core, ...gaps.keys(), ...gapGeneral])].sort();
console.log(`\n★ 新词库共 ${FINAL.length} 词（核心 ${core.size} + 真题补缺 ${gaps.size} + 通用高频补缺 ${gapGeneral.size}）`);
if (DRY) {
  console.log("首 30 按字母序:", FINAL.slice(0, 30).join(", "));
  process.exit(0);
}

/* ---------------- 6. 生成词条 ---------------- */
/* 词卡背面需要的完整字段结构（与 data-words-full.js 现有格式一致） */
const blank = w => ({
  word: w, list: "四级核心", phonetic: "", pos: "", def: "",
  prefix: null, suffix: null, root: { m: "", t: "" },
  literal: "", cognates: "", collocation: "", mnemonic: "",
  example: "", exampleCn: "", source: "",
});
/* 补缺词：释义/音标/词性从分级词典库取，例句留给 build-examples.mjs 统一填 */
function fromDict(word) {
  const { entry } = DICT.get(word);
  const pos = [...new Set((entry.translations || []).map(t => String(t.type || "").trim()).filter(Boolean))].join("/");
  const def = (entry.translations || []).map(t => String(t.translation || "").trim()).filter(Boolean).join("；");
  const ph = String(entry.uk || entry.us || "").trim();
  return { ...blank(word), phonetic: ph ? "/" + ph.replace(/^\/+|\/+$/g, "") + "/" : "", pos, def };
}

const FULL = [], BULK = [];
for (const word of FINAL) {
  const old = byWord.get(word);
  if (old) {
    /* 已有词条：原样保留全部字段（含人工精编的词根词缀 / 真题例句）。
       bulk-a 那批的 source 是早期写错的「CET4 高频」标签，统一改成中性描述。 */
    const keep = { ...old };
    if (/CET4 高频/.test(keep.source || "")) keep.source = keep.example ? "项目自编例句" : "";
    if (CORE_WORDS.includes(word)) continue;          // 留在 data.js 里，不重复写
    if (BULK_SET.has(word)) { keep.list = "四级核心"; BULK.push(keep); continue; }
    keep.list = "四级核心";
    FULL.push(keep);
  } else {
    FULL.push(fromDict(word));                        // 真题表补进来的缺口词
  }
}
console.log(`写出：data.js WORDS_CORE ${CORE_WORDS.filter(w => FINAL.includes(w)).length} · bulk-a ${BULK.length} · 完整库 ${FULL.length}`);

/* ---------------- 7. 写盘 ---------------- */
const HEAD = `/* 词阅 WordLens —— 四级核心词库（自动生成，请勿手改；node tools/build-core-vocab.mjs 重新生成）
 *
 * 从 4454 词的「CET4 完整考纲」筛出约 2000 个四级核心词，口径为三条并集：
 *   ① 语料高频  ECDICT 当代语料词频 f ≤ ${CORPUS_HI}  （5 万词级语料统计）
 *   ② 真题高频  liut969/CET《英语四级真题高频词汇》1250 词
 *               （近 5 年 30 套四级真题逐词统计，github.com/liut969/CET）
 *   ③ 手工精编  项目早期精编的 30 个词（词根词缀 / 同根词 / 助记）
 * 已剔除纯功能词（the / of / to …）。
 *
 * 字段：word/list/phonetic/pos/def + 词根词缀三件套 + 例句（空缺的由 build-examples.mjs 从分级词典库补）
 * 本文件 ${FULL.length} 词。 */
`;

const bodyBulk = `${HEAD.replace(/本文件 \d+ 词。/, `本文件 ${BULK.length} 词（原四级扩展词库 A，重建后仅保留核心词）。`)}
window.WORDS_BULK_A = [
${BULK.map(w => "  " + JSON.stringify(w)).join(",\n")}
];

if (typeof WORDS !== "undefined" && window.WORDS_BULK_A) {
  const existing = new Set(WORDS.map(w => w.word.toLowerCase()));
  const added = window.WORDS_BULK_A.filter(w => !existing.has(w.word.toLowerCase()))
    .map(w => ({
      word: w.word, phonetic: w.phonetic, pos: w.pos, def: w.def,
      prefix: null, suffix: null, root: { m: "", t: "" },
      literal: "扩展词库 · 词根拆解待补充",
      cognates: "—",
      collocation: w.example,
      mnemonic: "扩展词：先读例句语境，再回看释义记忆。",
      example: w.example, exampleCn: w.exampleCn, source: w.source
    }));
  WORDS = WORDS.concat(added);
  KEYWORDS = WORDS.map(w => w.word.toLowerCase());
  if (typeof window !== "undefined") window.__ADDED_WORDS__ = added.length;
}
`;

const bodyFull = `${HEAD.replace(/本文件 \d+ 词。/, `本文件 ${FULL.length} 词（不含 data.js WORDS_CORE 与 data-words-bulk-a.js 中已有的词）。`)}
window.WORDS_FULL = [
${FULL.map(w => "  " + JSON.stringify(w)).join(",\n")}
];

if (typeof WORDS !== "undefined" && window.WORDS_FULL) {
  const existing = new Set(WORDS.map(w => w.word.toLowerCase()));
  const added = window.WORDS_FULL.filter(w => !existing.has(w.word.toLowerCase()));
  WORDS = WORDS.concat(added);
  KEYWORDS = WORDS.map(w => w.word.toLowerCase());
  if (typeof window !== "undefined") window.__ADDED_WORDS_FULL__ = added.length;
}
`;

fs.writeFileSync(path.join(ROOT, "assets", "data-words-bulk-a.js"), bodyBulk);
fs.writeFileSync(path.join(ROOT, "assets", "data-words-full.js"), bodyFull);
console.log(`已写入 data-words-bulk-a.js ${(bodyBulk.length / 1024).toFixed(0)}KB · data-words-full.js ${(bodyFull.length / 1024).toFixed(0)}KB`);

/* 覆盖情况自检 */
const stat = { 补缺: 0, 无音标: 0, 无释义: 0 };
for (const w of FULL) { if (!w.phonetic) stat.无音标++; if (!w.def) stat.无释义++; }
for (const w of BULK) { if (!w.phonetic) stat.无音标++; if (!w.def) stat.无释义++; }
stat.补缺 = gaps.size;
console.log(`新词库自检：补缺词 ${stat.补缺} · 无音标 ${stat.无音标} · 无释义 ${stat.无释义}`);

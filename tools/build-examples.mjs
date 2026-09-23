/* 词阅 WordLens —— 单词例句库（词典级）
 *
 * 背景：老版本例句是从文章段落里"抽"出来的——句子是足球/时尚的报道长句，
 * 中文是逐句机翻的副产品，错得离谱（punch 配过"拐角进来了，管家把拳头打得很清楚"）。
 * 覆盖率也只有 32%。改成三级来源，按优先级取第一条命中的：
 *
 *   ① 分级词典词库  github.com/KyleBing/english-vocabulary（★1960）
 *      四级 → 六级 → 高中 → 考研 → 托福 → 初中，每词带音标、释义、词组、
 *      多条例句 + 准确中文，属于词典例句（短、典型用法）。
 *   ② Tatoeba 双语语料  tatoeba.org（CC-BY 2.0，英中人工句对，经 manythings.org 打包）
 *   ③ 原刊文章抽句（历史遗留兜底，来自本项目文章库，本身是真实报道原文）
 *
 * 只填补没有例句的词：词库自带 / 人工撰写的例句永远优先，不会被覆盖。
 * 每个词只放 1 条（卡片背面一屏放得下）。
 *
 * 源数据缓存在 tools/.examples-cache/（44MB，不入库），需要时按下面命令重新拉：
 *   BASE=https://raw.githubusercontent.com/KyleBing/english-vocabulary/HEAD/full_line_jsonl/sentence/%E6%AD%A3%E5%BA%8F
 *   curl -sL "$BASE/%E5%9B%9B%E7%BA%A7.jsonl" -o cet4.jsonl        # 四级
 *   curl -sL "$BASE/%E5%85%AD%E7%BA%A7.jsonl" -o lv-liuji.jsonl   # 六级
 *   curl -sL "$BASE/%E9%AB%98%E4%B8%AD.jsonl" -o lv-gaozhong.jsonl
 *   curl -sL "$BASE/%E8%80%83%E7%A0%94.jsonl" -o lv-kaoyan.jsonl
 *   curl -sL "$BASE/%E6%89%98%E7%A6%8F.jsonl" -o lv-tuofu.jsonl
 *   curl -sL "$BASE/%E5%88%9D%E4%B8%AD.jsonl" -o lv-chuzhong.jsonl
 *   curl -sL http://www.manythings.org/anki/cmn-eng.zip -o cmn-eng.zip && unzip -o cmn-eng.zip cmn.txt
 *
 * 用法：node tools/build-examples.mjs [--dry]
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
const _req = createRequire(import.meta.url);
/* 义项相关性判据走 lib-senses.cjs（与 build-core-vocab 同源，一个判据只许一处） */
const { senseRelates } = _req("./lib-senses.cjs");

const ROOT = path.resolve(import.meta.dirname, "..");
const CACHE = path.join(ROOT, "tools", ".examples-cache");
const DRY = process.argv.includes("--dry");

/* ---------------- 载入词库 ---------------- */
const ctx = { console, window: null };
ctx.window = ctx;
vm.createContext(ctx);
for (const f of ["data.js", "data-words-bulk-a.js", "data-words-full.js", "data-words-mid.js"]) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, "assets", f), "utf8"), ctx, { filename: f });
}
vm.runInContext(fs.readFileSync(path.join(ROOT, "assets", "data-ecdict.js"), "utf8"), ctx, { filename: "data-ecdict.js" });
const EC = vm.runInContext("WORD_META", ctx);
const WORDS = vm.runInContext("WORDS", ctx);
console.log(`词库 ${WORDS.length} 词 · ECDICT 词形表 ${EC ? Object.keys(EC).length : 0} 条`);

/* 历史兜底：老版本从文章抽的句子（缓存缺该文件时优雅降级——Actions runner 上没有） */
const lg = { console, window: null };
lg.window = lg;
vm.createContext(lg);
let LEGACY = {};
const legacyPath = path.join(CACHE, "legacy-data-examples.js");
if (fs.existsSync(legacyPath)) {
  vm.runInContext(fs.readFileSync(legacyPath, "utf8"), lg, { filename: "legacy" });
  LEGACY = vm.runInContext("WORD_EXAMPLES", lg);
} else {
  console.log("  （无 legacy 例句缓存，跳过历史兜底）");
}

/* ---------------- ① 分级词典词库 ---------------- */
const LEVELS = [
  ["四级词库", "cet4.jsonl"],
  ["六级词库", "lv-liuji.jsonl"],
  ["高中词库", "lv-gaozhong.jsonl"],
  ["考研词库", "lv-kaoyan.jsonl"],
  ["托福词库", "lv-tuofu.jsonl"],
  ["初中词库", "lv-chuzhong.jsonl"],
];
const libs = {};
for (const [name, file] of LEVELS) {
  const p = path.join(CACHE, file);
  if (!fs.existsSync(p)) { console.log(`  （缺 ${file}，跳过「${name}」——Actions runner 上无本地缓存，例句由其他来源兜底）`); libs[name] = new Map(); continue; }
  const m = new Map();
  for (const line of fs.readFileSync(p, "utf8").split("\n")) {
    if (!line.trim()) continue;
    try { const o = JSON.parse(line); m.set(String(o.word).toLowerCase(), o); } catch (e) { }
  }
  libs[name] = m;
}
console.log("分级词库：" + LEVELS.map(([n]) => `${n.replace("词库", "")} ${libs[n].size}`).join(" · "));

/* 词典例句的清洗规则：只要完整、干净、长度合适的一句话 */
const okCn = cn => {
  if (!cn) return false;
  if (/[\u53F0\u6E2F]/.test(cn)) return false;                                  // 港台用词
  if (/[個們說時會來對為國學實現發樣麼東車見長門開關體與萬馬鳥龍書當還裡從價錢買賣聽舊風飛頭點話題號際離斷續總經過應該認識語讀寫練習麗衛豐產團歲藝蘭樓灣燈隻幾張條纔麼]/.test(cn)) return false;
  return true;
};
const okEn = en => {
  if (!en || en.length < 22 || en.length > 200) return false;
  if (/^[（(=＝]/.test(en)) return false;                                        // 词典括注 / 交叉引用
  if (/\(=|=\)\s*$/.test(en)) return false;
  if (/^see\s|^cf\.|^syn\.|^SYN|^ant\./i.test(en)) return false;
  if (/<[^>]+>|https?:\/\//.test(en)) return false;
  if (!/^["“'(A-Z]/.test(en)) return false;                                     // 被切坏的半截句
  if (/[{}]|\[\s*\w+\s*\]/.test(en)) return false;                              // 编辑标记
  return true;
};
/* 90 字符左右最理想；带 Tom/Mary 这类语料人名的降权 */
function score(en) {
  let s = -Math.abs(en.length - 90);
  if (/\b(Tom|Mary|John|Jane|Peter|Alice)\b/.test(en)) s -= 45;
  if (/\b(Mr|Mrs|Dr|Prof)\./.test(en)) s -= 10;
  return s;
}
/* 义项对齐选句（2026-09-23 阶段 2）：老逻辑「第一个有句子的级别里按长度挑第一条」
 * 会把义项配错——match 的 def 只有火柴义时配上比赛句就是错的（1a 补义后矛盾缓解，
 * 但同词多句仍可能选中与 def 无关的那条）。新逻辑：
 *   · 跨全部级别汇池（级别优先级只做并列tiebreak，不再一票定终身）；
 *   · 义项相关（senseRelates：例句译文与 def 的二元组命中）+80 分，强优先；
 *   · 没有任何相关候选时仍取长度最优（词典例句本身是典型用法，宁滥的只有这一档：
 *     1a 后 def 已是多义，真冲突已罕见；硬闸会把「译文改写得太活」的好句误杀）。 */
const LEVEL_BONUS = Object.fromEntries(LEVELS.map(([n], i) => [n, -i * 0.5]));
function pickDict(key, def) {
  let best = null;
  for (const [name] of LEVELS) {
    const o = libs[name].get(key);
    if (!o || !o.sentences) continue;
    for (const x of o.sentences) {
      const en = String(x.sentence || "").trim(), cn = String(x.translation || "").trim();
      if (!okEn(en) || !okCn(cn) || !canHighlight(en, key)) continue;
      const sense = !!def && senseRelates(cn, def);
      const s = score(en) + (sense ? 80 : 0) + LEVEL_BONUS[name];
      if (!best || s > best.s) best = { en, cn, src: name, s, sense };
    }
  }
  return best;
}

/* ---------------- ② Tatoeba 双语语料（缓存缺失时优雅跳过） ---------------- */
const rows = [];
const cmnPath = path.join(CACHE, "cmn.txt");
if (fs.existsSync(cmnPath)) {
  for (const line of fs.readFileSync(cmnPath, "utf8").split("\n")) {
    const [en, cn] = line.split("\t");
    if (!en || !cn) continue;
    const E = en.trim(), C = cn.trim();
    if (!okEn(E) || !okCn(C)) continue;
    const low = " " + E.toLowerCase().replace(/[^a-z0-9' ]/g, " ").replace(/\s+/g, " ") + " ";
    rows.push({ en: E, cn: C, low, w: [...new Set(low.trim().split(" "))] });
  }
}
console.log(`Tatoeba 合格句对 ${rows.length}`);
const tIndex = new Map();
for (const r of rows) for (const t of r.w) { if (!tIndex.has(t)) tIndex.set(t, []); tIndex.get(t).push(r); }

/* 词形变化必须与 assets/app.js 完全一致（同样优先查 ECDICT 的 exchange 表），
   否则会挑出「页面上标不出目标词」的句子——audit 的 [I] 段专门守这条。
   反例：have 配到 "We've been spending too much money."，缩写里根本没有 have。 */
function wordForms(word) {
  const w = String(word == null ? "" : word).toLowerCase().trim();
  if (!/^[a-z][a-z'-]*$/.test(w)) return [];
  const e = EC && EC[w];
  if (e && e.x) {
    const set = new Set([w]);
    for (const seg of e.x.split("/")) { const v = seg.slice(2); if (v) set.add(v.toLowerCase()); }
    return [...set].sort((a, b) => b.length - a.length);
  }
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
/* 与 app.js 的 hlWord 同款正则：句子里必须真的能标出目标词，否则这条例句作废 */
const escRe = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const canHighlight = (sentence, word) => {
  const forms = wordForms(word);
  if (!forms.length) return false;
  return new RegExp("\\b(?:" + forms.map(escRe).join("|") + ")\\b", "i").test(String(sentence));
};
function pickTatoeba(word, def) {
  const seen = new Set();
  const c = [];
  for (const f of wordForms(word)) {
    const re = new RegExp(`\\b${f.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`);
    for (const r of (tIndex.get(f) || [])) {
      if (seen.has(r.en)) continue;
      if (!re.test(r.low)) continue;
      seen.add(r.en); c.push(r);
    }
  }
  if (!c.length) return null;
  /* 义项相关强优先：Tatoeba 是语料句，同一词形常有多义用法，按 def 挑 */
  c.sort((a, b) =>
    (score(b.en) + (def && senseRelates(b.cn, def) ? 80 : 0)) -
    (score(a.en) + (def && senseRelates(a.cn, def) ? 80 : 0)));
  const top = c[0];
  return { en: top.en, cn: top.cn, src: "Tatoeba 语料", sense: def && senseRelates(top.cn, def) };
}

/* ---------------- ③ 主循环 ---------------- */
const out = {};
const stat = { 词典: 0, Tatoeba: 0, 原刊: 0 };
let senseHit = 0, senseKnown = 0;
const miss = [];
for (const w of WORDS) {
  if (w.example) continue;                                     // 已有例句不动
  const key = String(w.word || "").toLowerCase();
  if (key.length < 3) { miss.push(w.word); continue; }
  const hit = pickDict(key, w.def) || pickTatoeba(w.word, w.def);
  let chosen = (hit && canHighlight(hit.en, w.word)) ? hit : null;   // 最后一道闸：页面上必须标得出目标词
  if (!chosen) {
    const old = LEGACY[w.word];
    /* 原刊兜底加义项闸（宁缺毋滥）：文章抽句的义项是文章给的，不是词条挑的，
     * 与 def 零相关就宁可不配（legacy 例句整体就是这么来的错配重灾区） */
    if (old && old.en && canHighlight(old.en, w.word) && w.def && senseRelates(old.cn || "", w.def))
      chosen = { en: old.en, cn: old.cn, src: old.src, sense: true };
  }
  if (!chosen) { miss.push(w.word); continue; }
  if (chosen.sense) { senseHit++; if (w.def) senseKnown++; }
  out[w.word] = chosen;
  if (chosen.src === "Tatoeba 语料") stat.Tatoeba++;
  else if (LEVELS.some(([n]) => n === chosen.src)) stat.词典++;
  else stat.原刊++;
}

const have = WORDS.filter(w => w.example).length;
const total = have + Object.keys(out).length;
console.log(`\n新增例句 ${Object.keys(out).length} 条 —— 词典 ${stat.词典} · Tatoeba ${stat.Tatoeba} · 原刊兜底 ${stat.原刊}`);
console.log(`其中义项相关（例句译文命中 def）${senseHit} 条`);
console.log(`覆盖率 ${have}/${WORDS.length} → ${total}/${WORDS.length}（${(total / WORDS.length * 100).toFixed(1)}%）`);
console.log(`仍无例句 ${miss.length} 词（${(miss.length / WORDS.length * 100).toFixed(1)}%）`);

if (DRY) {
  console.log("\n[试运行] 样本：");
  for (const [k, v] of Object.entries(out).slice(0, 10)) console.log(`  ${k}  [${v.src}]\n    ${v.en}\n    ${v.cn}`);
  process.exit(0);
}

/* ---------------- 写盘 ---------------- */
const body = `/* 词阅 WordLens —— 单词例句库（自动生成，请勿手改；node tools/build-examples.mjs 重新生成）
 *
 * 三级来源，按优先级取第一条命中的：
 *   ① 分级词典词库  github.com/KyleBing/english-vocabulary —— 词典级例句 + 准确中文
 *   ② Tatoeba 双语语料  tatoeba.org（CC-BY 2.0）—— 英中人工句对
 *   ③ 原刊文章抽句 —— 本项目文章库的历史兜底（真实报道原文）
 *
 * 本文件共 ${Object.keys(out).length} 条（词典 ${stat.词典} / Tatoeba ${stat.Tatoeba} / 原刊 ${stat.原刊}），
 * 只填补没有例句的词；词库自带 / 人工撰写的例句永远优先，不会被覆盖。
 */
const WORD_EXAMPLES = {
${Object.entries(out).map(([k, v]) => `${JSON.stringify(k)}: ${JSON.stringify(v)}`).join(",\n")}
};

if (typeof WORDS !== "undefined") {
  let n = 0;
  for (const w of WORDS) {
    if (w.example) continue;
    const ex = WORD_EXAMPLES[w.word];
    if (!ex) continue;
    w.example = ex.en;
    w.exampleCn = ex.cn;
    /* chip 要标例句出处（四级词库 / Tatoeba 语料 / 原刊），而不是词库自带的分类标签
       ——后者是「这个词属于哪份词表」，贴在例句框里语义是错位的 */
    w.source = ex.src;
    n++;
  }
  if (typeof window !== "undefined") window.__ADDED_EXAMPLES__ = n;
}
`;
const file = path.join(ROOT, "assets", "data-examples.js");
fs.writeFileSync(file, body);
console.log(`已写入 assets/data-examples.js（${(body.length / 1024).toFixed(0)}KB）`);

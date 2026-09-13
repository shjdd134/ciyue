/* 词阅 WordLens —— 基础层（中学词表）生成器
 *
 * 为什么需要这一层：
 *   四级核心库（1997 词）是按「语料词频 + 真题高频」从四级大纲筛出来的，它对
 *   「四级新增词」很准，但它默认你已经吃下了中学大纲 —— 实测核心库里有 1676 词
 *   本来就是中学词，却挤在同一份列表里按语料词频混排，用户根本分不清
 *   「这词我没学会」和「这是新东西」。
 *   更糟的是它**缺了 2068 个中学词**（lecture / period / party / pattern /
 *   translate / campus / vocabulary / outline / budget 这一族）。原因是口径偏差：
 *   校园与考试场景词在通用新闻语料里天然低频，被「f ≤ 2500」这道筛子整片滤掉了。
 *
 * 本层口径：
 *   基础层 = (初中词库 ∪ 高中词库) − 四级核心库 − 纯功能词
 *   即「中学要求掌握、但核心库没收」的词。按 stage 标记来源（初中 / 高中）。
 *
 *   其中落在冲刺池（真题表 ≥10 次 ∪ CETVocabulary 试卷词频 ≥40）里的词打 hf 标记
 *   —— 这批正是「真题反复考、我们却漏掉」的，是基础层里最该优先过的部分。
 *
 * 数据源：
 *   tools/.examples-cache/lv-chuzhong.jsonl / lv-gaozhong.jsonl
 *     github.com/KyleBing/english-vocabulary（分级词库，释义/音标/例句）
 *     重新拉取命令见 build-examples.mjs 顶部注释
 *   tools/.examples-cache/cet4-sprint.json（随仓库走）
 *     冲刺池 = liut969/CET《四级真题高频词汇》 ∪ exam-data/CETVocabulary 词频排序表
 *     CETVocabulary 授权：数据 CC BY-NC-SA 4.0 / 代码 MIT（非商用）
 *
 * 用法：node tools/build-words-mid.mjs [--dry]
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const ROOT = path.resolve(import.meta.dirname, "..");
const CACHE = path.join(ROOT, "tools", ".examples-cache");
const DRY = process.argv.includes("--dry");

/* ---------------- 1. 现有词库（核心层） ---------------- */
const ctx = { console, window: null }; ctx.window = ctx; vm.createContext(ctx);
for (const f of ["data.js", "data-words-bulk-a.js", "data-words-full.js"]) {
  const p = path.join(ROOT, "assets", f);
  if (fs.existsSync(p)) vm.runInContext(fs.readFileSync(p, "utf8"), ctx, { filename: f });
}
const CORE = new Set(vm.runInContext("WORDS", ctx).map(w => w.word.toLowerCase()));
console.log(`核心层 ${CORE.size} 词`);

/* ---------------- 2. 功能词表（与 build-core-vocab.mjs 同一份） ---------------- */
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

/* ---------------- 3. 中学词表 ---------------- */
const LEVELS = [
  ["初中", "lv-chuzhong.jsonl"],
  ["高中", "lv-gaozhong.jsonl"],
];
const dict = new Map();     // word -> { entry, stage }
for (const [stage, file] of LEVELS) {
  const p = path.join(CACHE, file);
  if (!fs.existsSync(p)) { console.error(`缺少源数据 ${p}\n见 tools/build-examples.mjs 顶部注释里的重新拉取命令`); process.exit(1); }
  for (const line of fs.readFileSync(p, "utf8").split("\n")) {
    if (!line.trim()) continue;
    let o; try { o = JSON.parse(line); } catch { continue; }
    const k = String(o.word || "").toLowerCase().trim();
    if (!k || dict.has(k)) continue;          // 初中先入，初中已有的不再标成高中
    dict.set(k, { entry: o, stage });
  }
}
const czN = [...dict.values()].filter(x => x.stage === "初中").length;
console.log(`中学词表：初中 ${czN} · 高中 ${dict.size - czN} · 合计 ${dict.size}（去重后）`);

/* ---------------- 4. 冲刺池（真题高频标记） ---------------- */
const sprintPath = path.join(CACHE, "cet4-sprint.json");
const SPRINT = fs.existsSync(sprintPath)
  ? JSON.parse(fs.readFileSync(sprintPath, "utf8")).words
  : {};
console.log(`冲刺池 ${Object.keys(SPRINT).length} 词`);

/* ---------------- 5. 取基础层 ---------------- */
/* 源词典的坏条目：非英文拼写 / 条目残缺。判别方法是跑一次 tools/_build-ecdict.mjs，
   「未命中」那一行会列出 ECDICT 完全不认识的词 —— 那基本就是坏数据。发现新的往这里加。
   （2026-09-11 全量核对：2068 词里只有 rusia 一条，ECDICT 无记录、无音标、释义是「鲁西亚（地名）」。）
   国家名 / 首都名（china / japan / tokyo …）**不排除** —— 它们本来就在中学教材词表里，
   词库保留教材词，供阅读中的点词查义使用。 */
const JUNK = new Set(["rusia"]);

const isNoise = w => JUNK.has(w) || STOP.has(w) || w.length <= 2 || !/^[a-z][a-z'-]*$/.test(w);
const picked = [], dropped = { 核心已有: 0, 功能词: 0, 坏条目: 0 };
for (const [w, { stage }] of dict) {
  if (CORE.has(w)) { dropped.核心已有++; continue; }
  if (JUNK.has(w)) { dropped.坏条目++; continue; }
  if (isNoise(w)) { dropped.功能词++; continue; }
  picked.push([w, stage]);
}
console.log(`\n剔除：核心层已有 ${dropped.核心已有} · 功能词/短词/非字母 ${dropped.功能词} · 坏条目 ${dropped.坏条目}`);
console.log(`★ 基础层 ${picked.length} 词`);

/* 释义截断：词典给的义项常有三四条，卡片背面放不下，取前 3 条、总长 ≤ 60 字 */
function brief(entry) {
  const tr = (entry.translations || [])
    .map(t => ({ type: String(t.type || "").trim(), s: String(t.translation || "").trim() }))
    .filter(t => t.s);
  const pos = [...new Set(tr.map(t => t.type).filter(Boolean))].join("/");
  const defs = [];
  let len = 0;
  for (const t of tr) {
    if (defs.length >= 3) break;
    if (len && len + t.s.length > 60) break;
    defs.push(t.s); len += t.s.length + 1;
  }
  return { pos, def: defs.join("；") };
}

/* ---------------- 5b. 搭配兜底 ----------------
 * 分级词库里大量条目给的不是完整句，而是短语：an abrupt change of plan / a tube of
 * toothpaste / a computer keyboard。这类会被 build-examples 的「例句必须是大写开头的
 * 完整句」规则挡掉（规则本身是对的，短语不该冒充例句），但直接丢掉很浪费 ——
 * 实测基础层有 230 个词拿不到例句，其中 171 个属于这种情况。
 * 于是把它们填进 collocation（卡片背面单列一行「搭配」），既不污染例句语义，
 * 又让这批词有东西可看。只对「源词典没有像样完整句」的词填，避免无谓地撑大文件。 */
const TRAD = /[個們說時會來對為國學實現發樣麼東車見長門開關體與萬馬鳥龍書當還裡從價錢買賣聽舊風飛頭點話題號際離斷續總經過應該認識語讀寫練習麗衛豐產團歲藝蘭樓灣燈隻幾張條纔麼]/;
const cnOk = cn => !!cn && !TRAD.test(cn) && !/[\u53F0\u6E2F]/.test(cn);
/* 完整句的近似判据（与 build-examples.mjs 的 okEn 对齐，只用于决定要不要搭配兜底） */
const hasRealSentence = entry => (entry.sentences || []).some(s => {
  const en = String(s.sentence || "").trim();
  return en.length >= 22 && en.length <= 200 && /^["“'(A-Z]/.test(en) && cnOk(String(s.translation || "").trim());
});
function collocationOf(w, entry) {
  if (hasRealSentence(entry)) return null;
  const re = new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(s|es|ed|d|ing)?\\b`, "i");
  const cands = [
    ...(entry.phrases || []).map(p => [p.phrase, p.translation]),
    ...(entry.sentences || []).map(s => [s.sentence, s.translation]),
  ];
  for (let [e, t] of cands) {
    e = String(e || "").trim(); t = String(t || "").trim();
    if (!e || !t) continue;
    if (e.length < 6 || e.length > 44) continue;
    const words = e.split(/[\s-]+/).filter(Boolean);
    if (words.length < 2 || words.length > 5) continue;
    if (new Set(words.map(x => x.toLowerCase())).size < 2) continue;   // bye bye bye
    if (!/^[a-z]/i.test(e)) continue;
    if (!re.test(e)) continue;                                        // 必须真的含目标词
    if (!cnOk(t)) continue;
    if (t.length > 22) continue;
    if (/[nva]\.\s|^[nva]\.|（|\(/.test(t)) continue;                   // 词性标记/括注泄漏
    if (/[[【][^\]】]{1,4}[\]】]/.test(t)) continue;                     // 学科标记泄漏：[化] [医]
    if (/[；;/]/.test(t)) continue;                                    // 多义项 → 多为术语用法
    if (/\d/.test(t)) continue;
    if (/\b(from|to|of|in|on|at|for|with|by|and|or|but|as|than|into)$/i.test(e)) continue;  // 断在半截
    return [e, t];
  }
  return null;
}

const rows = [];
for (const [w, stage] of picked) {
  const { entry } = dict.get(w);
  const { pos, def } = brief(entry);
  const ph = String(entry.uk || entry.us || "").trim();
  const sp = SPRINT[w];
  const row = { word: w, list: "中学基础", src: stage };
  if (sp) {                                    // 真题高频标记：只写非零的那一侧
    if (sp[0]) row.hf = sp[0];                 // 真题表出现次数
    if (sp[1]) row.cv = sp[1];                 // CETVocabulary 试卷词频
  }
  row.phonetic = ph ? "/" + ph.replace(/^\/+|\/+$/g, "") + "/" : "";
  row.pos = pos;
  row.def = def;
  row.example = "";
  row.exampleCn = "";
  row.source = "";
  const [ce, cc] = collocationOf(w, entry) || [];
  if (ce) { row.collocation = ce; row.collocationCn = cc; }
  rows.push(row);
}
rows.sort((a, b) => a.word.localeCompare(b.word));

const hfN = rows.filter(r => r.hf || r.cv).length;
const noDef = rows.filter(r => !r.def).length;
const noPh = rows.filter(r => !r.phonetic).length;
const colloc = rows.filter(r => r.collocation).length;
console.log(`真题高频标记 ${hfN} · 无释义 ${noDef} · 无音标 ${noPh} · 带搭配兜底 ${colloc}`);
console.log("基础层里的真题高频词（前 40）:", rows.filter(r => r.hf || r.cv).slice(0, 40).map(r => r.word).join(" "));

if (DRY) {
  console.log("\n[试运行] 样例：");
  for (const r of rows.slice(0, 8)) console.log(" ", JSON.stringify(r));
  process.exit(0);
}

/* ---------------- 6. 写盘 ---------------- */
const HEAD = `/* 词阅 WordLens —— 中学基础层词库（自动生成，请勿手改；node tools/build-words-mid.mjs 重新生成）
 *
 * 这一层解决的是「四级核心库默认你已经会中学词」这个前提 —— 实测核心库缺 ${rows.length} 个中学词，
 * 且缺得很集中：lecture / campus / vocabulary / outline 这类校园与考试场景词，在通用新闻
 * 语料里天然低频，被核心库的「语料词频 f ≤ 2500」口径整片滤掉了。
 *
 * 口径：基础层 = (初中词库 ∪ 高中词库) − 四级核心库 − 纯功能词
 *   · src          词表来源：初中 / 高中
 *   · hf/cv        该词在冲刺池里的真题表出现次数 / 试卷词频（有值 = 真题高频，优先过）
 *   · collocation  搭配兜底（见脚本里的 5b 段）：源词典只给了短语、凑不出完整句的词，
 *                  把短语放这里，卡片背面单列一行「搭配」
 *   · 冲刺池 = liut969/CET 真题高频表 ∪ exam-data/CETVocabulary 试卷词频表（CC BY-NC-SA 4.0，非商用）
 * 释义与音标来自 github.com/KyleBing/english-vocabulary 分级词库；
 * 例句留空，由 tools/build-examples.mjs 统一从分级词库 / Tatoeba 语料补齐。
 *
 * 本文件 ${rows.length} 词（初中 ${rows.filter(r => r.src === "初中").length} / 高中 ${rows.filter(r => r.src === "高中").length}，
 * 其中真题高频 ${hfN} 个、带搭配兜底 ${colloc} 个）。 */

window.WORDS_MID = [
${rows.map(r => "  " + JSON.stringify(r)).join(",\n")}
];

if (typeof WORDS !== "undefined" && window.WORDS_MID) {
  const existing = new Set(WORDS.map(w => w.word.toLowerCase()));
  const added = window.WORDS_MID.filter(w => !existing.has(w.word.toLowerCase()));
  WORDS = WORDS.concat(added);
  KEYWORDS = WORDS.map(w => w.word.toLowerCase());
  if (typeof window !== "undefined") window.__ADDED_WORDS_MID__ = added.length;
}
`;

const file = path.join(ROOT, "assets", "data-words-mid.js");
fs.writeFileSync(file, HEAD);
console.log(`\n已写入 assets/data-words-mid.js（${(fs.statSync(file).size / 1024).toFixed(0)}KB）`);

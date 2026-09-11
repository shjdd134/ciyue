/* 点词翻译层生成器：全量 ECDICT → 阅读页「任意单词点击查义」数据
 * 产出 assets/data-tapdict.js：
 *   window.TAPDICT      = { word: {p:英式音标, d:中文释义} }   —— 词频 f≤50000 的单词，
 *                             已排除当前 4082 学习词（它们走 WORDS 完整查词卡）
 *   window.TAP_REVERSE  = { 变形: 原形 }                       —— 不规则/规则猜不出的词形还原表，
 *                             原形允许指向学习词（如 gone→go，弹完整卡）
 * 前置：tools/.ecdict-blob.json（88MB，与 _build-ecdict.mjs 同源）。
 * ⚠️ 排除表 = 当前词库：核心词库换代后必须重跑本脚本，否则旧学习词在点词层缺失。
 * 运行：node tools/build-tapdict.mjs */
import fs from "node:fs";
import vm from "node:vm";

const FRQ_MAX = 50000;      // 口径（2026-09-11 定）：当代语料词频 ≤ 5 万，约 4.2 万词
const D_MAX_LINES = 4;      // 释义最多保留几个义项
const D_MAX_CHARS = 160;    // 释义总长截断

/* 1. 取当前学习词表（排除表 + 反向表合法目标） */
const ctx = vm.createContext({ console, window: { addEventListener() {} } });
vm.runInContext("var window=globalThis;", ctx);
for (const f of ["data.js", "data-words-bulk-a.js", "data-words-full.js", "data-words-mid.js"])
  vm.runInContext(fs.readFileSync("assets/" + f, "utf8"), ctx, { filename: f });
const WORDS = vm.runInContext("WORDS", ctx);
const study = new Set(WORDS.map(w => w.word.toLowerCase()));
console.log("学习词（排除表）:", study.size);

/* 2. 解码 blob */
const blob = JSON.parse(fs.readFileSync("tools/.ecdict-blob.json", "utf8"));
const csv = Buffer.from(blob.content, "base64").toString("utf8");
console.log("CSV 解码:", (csv.length / 1048576).toFixed(1), "MB");

/* 3. 流式 CSV 解析（与 _build-ecdict.mjs 相同实现） */
function parseCSV(text, onRow) {
  let row = [], field = "", inQ = false, i = 0;
  const n = text.length;
  while (i < n) {
    const ch = text[i];
    if (inQ) {
      if (ch === '"') { if (text[i + 1] === '"') { field += '"'; i += 2; continue; } inQ = false; i++; continue; }
      field += ch; i++; continue;
    }
    if (ch === '"') { inQ = true; i++; continue; }
    if (ch === ",") { row.push(field); field = ""; i++; continue; }
    if (ch === "\n") { row.push(field.replace(/\r$/, "")); onRow(row); row = []; field = ""; i++; continue; }
    field += ch; i++;
  }
  if (field || row.length) { row.push(field); onRow(row); }
}

/* 词形还原候选：⚠️ 与 assets/app.js 的 lemmaCands() 逐字对应——
 * 构建期用它判断「运行时规则能猜回原形」从而跳过存储，两处不同步会漏词或白存 */
function lemmaCands(t) {
  const out = new Set();
  const add = x => { if (x && x.length > 1) out.add(x); };
  const dd = x => { const y = x.replace(/(.)\1$/, "$1"); add(y); return y; };
  if (t.endsWith("'s")) add(t.slice(0, -2));
  if (/ies$/.test(t) && t.length > 4) add(t.slice(0, -3) + "y");
  if (/(ch|sh|x|z|s)es$/.test(t) && t.length > 5) add(t.slice(0, -2));
  if (/ied$/.test(t) && t.length > 5) add(t.slice(0, -3) + "y");
  if (/ed$/.test(t) && t.length > 4) { add(t.slice(0, -1)); add(t.slice(0, -2)); dd(t.slice(0, -2)); dd(t.slice(0, -1)); }
  if (/ing$/.test(t) && t.length > 5) { add(t.slice(0, -3)); add(t.slice(0, -3) + "e"); dd(t.slice(0, -3)); }
  if (/s$/.test(t) && t.length > 3) add(t.slice(0, -1));
  out.delete(t);
  return [...out];
}

/* 4. 第一遍流：收集导出词（非学习词、f 1..50000、有中文释义的单词） */
const TAP = {};                 // word -> {p?, d}
const lemmaFrq = new Map();     // 词元 -> frq（导出词 ∪ 学习词，反向表冲突时小 frq 优先）
const exchOf = new Map();       // 词元 -> "p:xxx/d:xxx" 原始 exchange
const tokenOk = w => /^[a-z][a-z'-]*$/.test(w);
let header = null, idx = null, exportN = 0;

function normDef(tr) {
  const lines = tr.replace(/\r/g, "").split("\\n").map(s => s.trim()).filter(Boolean).slice(0, D_MAX_LINES);
  let d = lines.join("\\n");
  if (d.length > D_MAX_CHARS) d = d.slice(0, D_MAX_CHARS).replace(/\\n[^\\n]*$/, "");
  return d;
}

parseCSV(csv, row => {
  if (!header) { header = row; idx = Object.fromEntries(header.map((h, i) => [h.trim(), i])); return; }
  const raw = row[idx.word] || "";
  const frq = parseInt(row[idx.frq]) || 0;
  if (!raw || !frq) return;
  const w = raw.toLowerCase();
  if (!tokenOk(w)) return;
  const inStudy = study.has(w);
  if (!inStudy) {
    if (frq > FRQ_MAX) return;
    const tr = (row[idx.translation] || "").trim();
    if (!tr) return;
    const ph = (row[idx.phonetic] || "").trim();
    const e = {};
    if (ph) e.p = ph;
    e.d = normDef(tr);
    TAP[w] = e; exportN++;
  }
  lemmaFrq.set(w, frq);
  const exch = (row[idx.exchange] || "").split("/").filter(s => s && !/^[01]:/.test(s)).join("/");
  if (exch) exchOf.set(w, exch);
});
console.log(`导出点词条目: ${exportN}（学习词已排除）`);

/* 5. 第二遍流（复用 csv 字符串）：构建反向词形表
 *    存储条件（与运行时三段解析严格互补）：变形本身不是导出词（直接命中已覆盖）、
 *    不是学习词（Trie 直接命中已覆盖）、且运行时后缀规则还原不到任何有效词元。
 *    最后一条必须对「任意」有效词成立而非仅本词元——否则 ach 的 exchange(s:aches)
 *    会把 aches 抢注到感叹词 ach 上，而规则本可把它还原到 ache */
const REV = {};
let revSkipped = 0;
for (const [lemma, exch] of exchOf) {
  for (const seg of exch.split("/")) {
    const form = seg.slice(2).toLowerCase();
    if (!form || form === lemma || !tokenOk(form)) continue;
    if (TAP[form] || study.has(form)) { revSkipped++; continue; }
    if (lemmaCands(form).some(c => TAP[c] || study.has(c))) { revSkipped++; continue; }
    const prev = REV[form];
    if (prev === undefined || (lemmaFrq.get(lemma) || Infinity) < (lemmaFrq.get(prev) || Infinity)) REV[form] = lemma;
  }
}

/* 6. 写出 */
const out = `/* 词阅 WordLens —— 点词翻译层（自动生成，请勿手改）
 * 来源：github.com/skywind3000/ECDICT（MIT）全量词库，词频 f≤${FRQ_MAX} 的单词（已排除当前学习词）
 * TAPDICT: word -> {p:英式音标, d:中文释义(≤${D_MAX_LINES}个义项)}
 * TAP_REVERSE: 变形 -> 原形（仅存运行时后缀规则猜不回的，原形可为学习词）
 * 重新生成：node tools/build-tapdict.mjs（需 tools/.ecdict-blob.json；词库换代后必须重跑） */
window.TAPDICT = ${JSON.stringify(TAP)};
window.TAP_REVERSE = ${JSON.stringify(REV)};
`;
fs.writeFileSync("assets/data-tapdict.js", out);
const samples = Object.entries(REV).slice(0, 8).map(([k, v]) => `${k}→${v}`).join(" ");
console.log("反向词形表:", Object.keys(REV).length, "条（规则可猜回而跳过", revSkipped, "条）");
console.log("反向表样例:", samples);
console.log("写出 assets/data-tapdict.js:", (out.length / 1048576).toFixed(2), "MB");

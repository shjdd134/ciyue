/* ECDICT 接入生成器（一次性）：全量 CSV → 当前词库的精简元数据
 * 产出 assets/data-ecdict.js：window.WORD_META = { word: {f:当代词频, b:BNC词频, c:柯林斯星级, o:牛津3000, x:词形变化, t:考纲标签} }
 * 前置：先跑 tools/build-core-vocab.mjs 重写词库；再跑本脚本刷新元数据（词库换代后必须重跑，否则新词没有词频/音标）。
 * 用后即删。 */
import fs from "node:fs";
import vm from "node:vm";

/* 1. 取词库词表 */
const ctx = vm.createContext({ console, window: { addEventListener() {} } });
vm.runInContext("var window=globalThis;", ctx);
for (const f of ["data.js", "data-words-bulk-a.js", "data-words-full.js"])
  vm.runInContext(fs.readFileSync("assets/" + f, "utf8"), ctx, { filename: f });
const WORDS = vm.runInContext("WORDS", ctx);
const want = new Set(WORDS.map(w => w.word.toLowerCase()));
console.log("目标词:", want.size);

/* 2. 解码 blob */
const blob = JSON.parse(fs.readFileSync("tools/.ecdict-blob.json", "utf8"));
const csv = Buffer.from(blob.content, "base64").toString("utf8");
console.log("CSV 解码:", (csv.length / 1048576).toFixed(1), "MB");

/* 3. 流式 CSV 解析（处理引号内逗号/换行） */
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

/* 4. 过滤提取 */
const META = {};
let found = 0, cet4 = 0, missing = [];
let header = null, idx = null;
parseCSV(csv, row => {
  if (!header) {
    header = row;
    idx = Object.fromEntries(header.map((h, i) => [h.trim(), i]));
    console.log("表头:", header.join(","));
    return;
  }
  const w = row[idx.word];
  if (!w || !want.has(w.toLowerCase())) return;
  found++;
  const tag = (row[idx.tag] || "").trim();
  const frq = parseInt(row[idx.frq]) || 0;
  const bnc = parseInt(row[idx.bnc]) || 0;
  const collins = parseInt(row[idx.collins]) || 0;
  const oxford = row[idx.oxford] === "1" ? 1 : 0;
  const exch = (row[idx.exchange] || "").split("/").filter(s => s && !/^[01]:/.test(s)).join("/");
  const ph = (row[idx.phonetic] || "").trim();   // 英式 IPA
  if (/\bcet4\b/.test(tag)) cet4++;
  const e = {};
  if (frq) e.f = frq;
  if (bnc) e.b = bnc;
  if (collins) e.c = collins;
  if (oxford) e.o = 1;
  if (exch) e.x = exch;
  if (ph) e.p = ph;
  if (tag && !/\bcet4\b/.test(tag)) e.t = tag;   // 意外标签才存（四级词都应有 cet4）
  META[w.toLowerCase()] = e;
});
for (const w of want) if (!META[w]) missing.push(w);
console.log(`命中: ${found}/${want.size} | 带 cet4 标注: ${cet4} | 未命中: ${missing.length}`);
if (missing.length) console.log("未命中样例:", missing.slice(0, 20).join(", "));

/* 5. 写出精简数据 */
const json = JSON.stringify(META);
const out = `/* 词阅 WordLens —— ECDICT 词元数据（自动生成，请勿手改）
 * 来源：github.com/skywind3000/ECDICT（MIT）全量词库按当前核心词库过滤
 * 字段：f=当代语料库词频序(小=常用) b=BNC词频序 c=柯林斯星级 o=牛津3000 x=词形变化(p过去/d过去分词/i现在分词/3三单/r比较/t最高/s复数) t=额外考纲标签 p=英式音标IPA
 * 重新生成：node tools/_build-ecdict.mjs（需 tools/.ecdict-blob.json） */
window.WORD_META = ${json};
`;
fs.writeFileSync("assets/data-ecdict.js", out);
console.log("写出 assets/data-ecdict.js:", (out.length / 1024).toFixed(0), "KB");

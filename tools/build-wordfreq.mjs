#!/usr/bin/env node
/* 词阅 WordLens —— 常见词表生成器
 *
 * 产出 assets/data-wordfreq.js：
 *   window.COMMON_WORDS = { 词: 1 }  —— ECDICT 当代语料词频 frq ≤ 2500 的单词，
 *                                      已剔除当前 4082 个学习词（它们走词库自身逻辑）
 *
 * 为什么需要它：判断「词库外的词读者认不认识」原本无据可依 ——
 *   · data-ecdict.js 只覆盖 4082 个学习词，查不到的词一律 Infinity；
 *   · data-tapdict.js 收录的是 frq ≤ 50000 的词（约 3.8 万），门槛太松，
 *     ostensibly / perfunctory 这类词都在里面，等于没筛。
 * 结果就是正文里 53.7% 的 token（词库外的常见词）被判成「陌生」，生词率虚高到 88%。
 * 2500 这条线不是新拍的：核心词库的第一条口径就是「语料 f ≤ 2500 属高频」，
 * 这里直接沿用同一条线，两个口径互相对得上。
 *
 * 前置：tools/.ecdict-blob.json（88MB，与 _build-ecdict.mjs / build-tapdict.mjs 同源）
 * 词库换代后必须重跑（排除表 = 当前词库）。
 * 运行：node tools/build-wordfreq.mjs
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const FRQ_MAX = 2500;      // 与核心词库口径一致：语料词频 ≤ 2500 即「高频常见」
const ROOT = path.resolve(import.meta.dirname, "..");

/* 1. 当前学习词表（排除表） */
const ctx = vm.createContext({ console, window: { addEventListener() { } } });
vm.runInContext("var window=globalThis;", ctx);
for (const f of ["data.js", "data-words-bulk-a.js", "data-words-full.js", "data-words-mid.js"]) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, "assets", f), "utf8"), ctx, { filename: f });
}
const study = new Set(vm.runInContext("WORDS", ctx).map(w => w.word.toLowerCase()));
console.log("学习词（排除表）：", study.size);

/* 2. 解码 blob */
const blob = JSON.parse(fs.readFileSync(path.join(ROOT, "tools", ".ecdict-blob.json"), "utf8"));
const csv = Buffer.from(blob.content, "base64").toString("utf8");
console.log("CSV 解码：", (csv.length / 1048576).toFixed(1), "MB");

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

/* 4. 收集：frq 1..2500、非学习词、纯小写字母（含连字符与撇号） */
const words = [];
const tokenOk = w => /^[a-z][a-z'-]*$/.test(w);
let header = null, idx = null, seen = 0;
parseCSV(csv, row => {
  if (!header) { header = row; idx = Object.fromEntries(header.map((h, i) => [h.trim(), i])); return; }
  const raw = (row[idx.word] || "").trim();
  if (!raw) return;
  seen++;
  const frq = parseInt(row[idx.frq]) || 0;
  if (!frq || frq > FRQ_MAX) return;
  const w = raw.toLowerCase();
  if (w !== raw && raw.includes(" ")) return;
  if (!tokenOk(w) || study.has(w)) return;
  words.push(w);
});
words.sort();
console.log(`扫描 ${seen} 行 → 常见词 ${words.length} 个（frq ≤ ${FRQ_MAX}，已排除学习词）`);

/* 5. 输出：空格连接的单字符串，比字符串数组省一大截体积 */
const payload = words.join(" ");
const body = `/* 词阅 WordLens —— 常见词表（自动生成，请勿手改；运行 node tools/build-wordfreq.mjs 重新生成）
 *
 * COMMON_WORDS：ECDICT 当代语料词频 frq ≤ ${FRQ_MAX} 的单词，已剔除 ${study.size} 个学习词。
 * 用途：判断「不在学习词表里的词」对四级读者算不算常见词 —— 命中即视为大概率认识，
 * 不命中即视为超出四级范围的陌生词。见 assets/app.js 的 computeArticleMetrics()。
 * 词库换代后必须重跑，否则排除表过期。
 * 共 ${words.length} 词。
 */
window.COMMON_WORDS = (() => {
  const set = Object.create(null);
  for (const w of "${payload}".split(" ")) set[w] = 1;
  return set;
})();
`;
fs.writeFileSync(path.join(ROOT, "assets", "data-wordfreq.js"), body);
const kb = (Buffer.byteLength(body) / 1024).toFixed(0);
console.log(`已写出 assets/data-wordfreq.js（${kb} KB）`);

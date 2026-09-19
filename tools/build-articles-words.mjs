/* 词阅 WordLens —— 文章级补充词典生成器
 *
 * 为什么需要这一层：
 *   ECDICT 对**纯功能词与缩写**常常没有当代语料词频（frq = 0）——
 *   are / an / don't / you're / i'm / were 全是这一类。build-tapdict.mjs 的口径是
 *   「非学习词 + frq 1..50000」，`if (!frq) return` 把它们整片丢掉了。
 *   而它们恰恰是正文里出现次数最多的一批词：实测全部文章里
 *   点不动的 token 前 25 名里，有 6 个是 frq=0 的功能词（合计 1,183 次）。
 *
 * 本层口径（**文章语料驱动**，不做全库兜底）：
 *   扫全部文章正文的 token → 用**真 app.js 的 resolveToken()** 判定能否查到 →
 *   收下「查不到 + 不是专有名词 + ECDICT 有中文释义」的词 → 定向提取释义。
 *   这样补进去的每一个词都是文章里真的出现过、用户真的会点到的词；
 *   换新文章后重跑一次即可，不会像「放宽全库口径」那样白白背几万个冷僻词。
 *
 * 判据只有一把尺子：判定「能不能查到」直接跑 assets/app.js 里的 resolveToken，
 * 不在本脚本里复刻一份 —— 复刻出来的第二把尺子迟早和第一把走散。
 *
 * 产物：assets/data-articles-words.js → window.ARTICLE_WORDS = { word: {p, d} }
 *   结构与 TAPDICT 条目一致（p=音标, d=释义），app.js 的同名兜底层直接复用渲染。
 *   加载链排在 data-wordfreq.js 之后、app.js 之前（随首屏，几十 KB，不进懒加载队列）。
 *
 * 前置：tools/.ecdict-blob.json（88MB，与 build-tapdict.mjs 同源）。
 * 用法：node tools/build-articles-words.mjs [--dry]
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const ROOT = path.resolve(import.meta.dirname, "..");
const BLOB = path.join(ROOT, "tools", ".ecdict-blob.json");
const DST = path.join(ROOT, "assets", "data-articles-words.js");
const DRY = process.argv.includes("--dry");
const noop = () => { };

/* ---------------- 1. 沙箱（与 tools/audit.js 同构） ----------------
 * 只搭「能把 app.js 跑起来」的最小 DOM，不承载任何判据 ——
 * 判据全部来自 app.js 自己。脚手架重复是可接受的，判据重复不是。 */
const handlers = {};
const screenEl = { innerHTML: "", style: {}, className: "", appendChild: noop };
const phoneEl = { appendChild: noop, style: {}, insertAdjacentHTML: noop };
const grow = () => ({
  dataset: {}, classList: { add: noop, remove: noop, toggle: noop, contains: () => false },
  closest: () => null, scrollTop: 0, getBoundingClientRect: () => ({ top: 0 }),
  addEventListener: noop, clientHeight: 600, scrollHeight: 2000, style: {}, innerHTML: "",
});
const sandbox = {
  console,
  history: { stack: [{}], pushState() { this.stack.push({}); }, back: noop, go: noop, replaceState: noop },
  location: { protocol: "http:", search: "", reload: noop, href: "http://localhost/" },
  window: { addEventListener: (t, f) => { handlers[t] = f; }, removeEventListener: noop, matchMedia: () => ({ matches: false, addEventListener: noop }) },
  navigator: { serviceWorker: { addEventListener: noop, register: () => ({ catch: noop }) }, userAgent: "node" },
  sessionStorage: { _d: {}, getItem(k) { return this._d[k] || null; }, setItem(k, v) { this._d[k] = v; } },
  document: {
    hidden: false,
    documentElement: { setAttribute: noop },
    addEventListener: noop, removeEventListener: noop,
    querySelector: s => (s === "#screen" ? screenEl : s === ".phone" ? phoneEl : null),
    querySelectorAll: () => [],
    createElement: () => grow(),
    head: { appendChild: noop },
    body: { appendChild: noop },
  },
  localStorage: { _d: {}, getItem(k) { return this._d[k] || null; }, setItem(k, v) { this._d[k] = v; }, removeItem(k) { delete this._d[k]; } },
  SpeechSynthesisUtterance: function () { },
  speechSynthesis: { cancel: noop, speak: noop, getVoices: () => [] },
  setTimeout, clearTimeout, setInterval: () => 0, clearInterval: noop,
  requestAnimationFrame: f => f(),
  fetch: () => Promise.reject(new Error("no network in build sandbox")),
};
sandbox.window.window = sandbox.window;
vm.createContext(sandbox);

const DATA_FILES = [
  "data.js", "data-config.js", "data-words-bulk-a.js", "data-words-full.js", "data-words-mid.js",
  "data-words-cet4.js", "data-articles-extra.js", "data-articles-archive.js", "data-covers.js",
  "data-article-metrics.js", "data-ecdict.js", "data-tapdict.js", "data-wordfreq.js",
];
for (const f of DATA_FILES) {
  const p = path.join(ROOT, "assets", f);
  if (fs.existsSync(p)) vm.runInContext(fs.readFileSync(p, "utf8"), sandbox, { filename: f });
}
/* data-ecdict.js / data-tapdict.js / data-wordfreq.js / data-words-cet4.js 都把值挂在
 * window 上，而沙箱的 window 只是替身对象，必须显式提升到全局 */
vm.runInContext("var WORD_META = window.WORD_META;", sandbox);
vm.runInContext("var TAPDICT = window.TAPDICT, TAP_REVERSE = window.TAP_REVERSE;", sandbox);
vm.runInContext("var COMMON_WORDS = window.COMMON_WORDS;", sandbox);
vm.runInContext("var WORDS_CET4 = window.WORDS_CET4;", sandbox);
vm.runInContext(fs.readFileSync(path.join(ROOT, "assets", "app.js"), "utf8"), sandbox, { filename: "app.js" });
const ctx = e => vm.runInContext(e, sandbox);

/* ---------------- 2. 扫文章，找点不动的词 ---------------- */
/* 小写化之后就没法判断原文是不是大写，所以扫描时同时统计两种形态：
 *   ① 句中（非句首）大写的 token —— isProperNoun 当场剔除
 *   ② **全篇只以大写过** 的词 —— 这是更强的一道：Anne / Audrey / Barcelona 这类
 *      人名地名常常整篇都出现在句首，isProperNoun 对句首大写无能为力，
 *      但「一次小写都没出现过」足以判定它不是普通词。真词几乎不可能如此：
 *      功能词（are / an / don't）总会在句子中间出现。 */
const miss = ctx(`(() => {
  const RE = /[A-Za-z]+(?:['\\u2018\\u2019][A-Za-z]+)?/g;
  const all = Object.create(null);
  for (const a of ARTICLES) {
    for (const p of (a.paras || [])) {
      for (const s of sentencesOf(p)) {
        const text = s && s.en;
        if (!text) continue;
        let m; RE.lastIndex = 0;
        while ((m = RE.exec(text))) {
          const raw = m[0];
          const low = normApos(raw).toLowerCase();
          const e = all[low] || (all[low] = { n: 0, up: 0, proper: 0 });
          e.n++;
          if (/^[A-Z]/.test(raw)) e.up++;
          if (isProperNoun(text, m.index, raw)) e.proper++;
        }
      }
    }
  }
  const keep = Object.create(null);
  for (const [w, e] of Object.entries(all)) {
    if (resolveToken(w)) continue;                        // 已经能查到，不用补
    if (!/^[a-z][a-z'-]{1,23}$/.test(w)) continue;        // 单词、不过短过长
    if (e.up === e.n) continue;                           // 只以大写过 → 专有名词
    if (e.proper === e.n) continue;                       // 每次出现都是句中大写 → 专有名词
    keep[w] = e.n;
  }
  return JSON.stringify(keep);
})()`);
const missMap = JSON.parse(miss);
const missWords = Object.keys(missMap).sort();
console.log(`文章里点不动的词：${missWords.length} 个（去专有名词后）`);
console.log("  高频样本：", missWords.sort((a, b) => missMap[b] - missMap[a]).slice(0, 12)
  .map(w => `${w}(${missMap[w]})`).join(", "));

/* ---------------- 3. 从 ECDICT 定向取释义 ---------------- */
if (!fs.existsSync(BLOB)) {
  console.error(`缺少 ${BLOB}，无法取释义（该文件不随仓库走）`);
  process.exit(1);
}
const blob = JSON.parse(fs.readFileSync(BLOB, "utf8"));
const csv = Buffer.from(blob.content, "base64").toString("utf8");
const want = new Set(missWords);
const found = Object.create(null);

/* 流式 CSV 解析（与 build-tapdict.mjs 同一实现：字段可含换行与逗号，不能按行 split） */
let field = "", inQ = false, row = [], header = null, idx = null, i = 0;
const D_MAX_LINES = 4, D_MAX_CHARS = 160;
const normDef = tr => {
  const lines = String(tr).replace(/\r/g, "").split("\n").map(s => s.trim()).filter(Boolean).slice(0, D_MAX_LINES);
  let d = lines.join("\n");
  if (d.length > D_MAX_CHARS) d = d.slice(0, D_MAX_CHARS).replace(/\n[^\n]*$/, "");
  return d;
};
const onRow = cells => {
  if (!header) { header = cells; idx = Object.fromEntries(header.map((h, i) => [h.trim(), i])); return; }
  const w = String(cells[idx.word] || "").trim().toLowerCase();
  if (!want.has(w) || found[w]) return;
  const tr = String(cells[idx.translation] || "").trim();
  if (!tr) return;
  /* 词典自己标了人名 / 地名的一律跳过：语料里也有躲过大写判据的（比如带引号
     出现在句中的人名），用释义反向兜一道。只看明确的标记词，不做宽泛模式匹配 ——
     宽泛模式会误杀真词（n. 策略（…）这种正常释义也带括号）。 */
  if (/人名|女子名|男子名|姓氏|地名/.test(tr)) return;
  const ph = String(cells[idx.phonetic] || "").trim();
  const e = {};
  if (ph) e.p = ph;
  e.d = normDef(tr);
  found[w] = e;
};
const n = csv.length;
while (i < n) {
  const ch = csv[i];
  if (inQ) {
    if (ch === '"') { if (csv[i + 1] === '"') { field += '"'; i += 2; continue; } inQ = false; i++; continue; }
    field += ch; i++; continue;
  }
  if (ch === '"') { inQ = true; i++; continue; }
  if (ch === ",") { row.push(field); field = ""; i++; continue; }
  if (ch === "\n") { row.push(field.replace(/\r$/, "")); onRow(row); row = []; field = ""; i++; continue; }
  field += ch; i++;
}
if (field || row.length) { row.push(field); onRow(row); }

const words = Object.keys(found).sort();
const noDef = missWords.filter(w => !found[w]);
console.log(`ECDICT 命中释义：${words.length} 个 · 仍无释义（跳过）：${noDef.length}${noDef.length ? "（" + noDef.slice(0, 8).join(", ") + "）" : ""}`);

/* ---------------- 4. 输出 ---------------- */
/* 每行一个词条，值走 JSON.stringify —— 不按分隔符切割（释义里完全可能含 `},`，
 * 照样例里的 `n. 禁忌` 就常和括号纠缠）。 */
const body = Object.keys(found).sort()
  .map(w => `  ${JSON.stringify(w)}: ${JSON.stringify(found[w])}`).join(",\n");
const banner = `/* 词阅 WordLens —— 文章级补充词典（自动生成，请勿手改；node tools/build-articles-words.mjs 重新生成）
 *
 * ${words.length} 个词：当前 ${ctx("ARTICLES.length")} 篇文章里**点不动**、
 * 又确实不是专有名词的词，从 ECDICT 定向取回释义（结构同 TAPDICT 条目：{ p: 音标, d: 释义 }）。
 *
 * 存在的理由：ECDICT 对纯功能词与缩写常常没有语料词频（frq=0），而 build-tapdict.mjs
 * 的口径要求 frq 落在 1..50000 —— are / an / don't / you're / i'm 这批正文里最高频的词
 * 被整片丢掉，出现「最常见的词反而点不动」。本层按**文章语料**定向补齐，不放宽全库口径：
 * 补进去的每个词都是文章里真的出现过、用户真的会点到的词。
 *
 * ⚠️ 新增文章后重跑本脚本，否则新文章里的漏网词仍然点不动。 */

window.ARTICLE_WORDS = {
`;
const out = banner + body + "\n};\n";

if (DRY) {
  console.log(`--dry：将写入 ${(Buffer.byteLength(out) / 1024).toFixed(1)}KB，未落盘`);
} else {
  fs.writeFileSync(DST, out);
  console.log(`已写入 ${path.relative(ROOT, DST)}（${(Buffer.byteLength(out) / 1024).toFixed(1)}KB）`);
}

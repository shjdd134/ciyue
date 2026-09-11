// 一次性集成验证：加载整个脚本链并打印关键统计
const vm = require('vm');
const fs = require('fs');
const path = require('path');
const noop = () => {};

const screenEl = { innerHTML: '', style: {}, appendChild: noop };

// data.js 用 const 声明的 WORDS_CORE/ARTICLES 不会挂到 globalThis，
// 但我们能读到 var 声明的 WORDS/KEYWORDS/CATEGORIES
const sandbox = {
  console,
  window: { addEventListener: noop, removeEventListener: noop },
  document: {
    documentElement: { setAttribute: noop },
    addEventListener: noop, removeEventListener: noop,
    querySelector: (s) => (s === '#screen' ? screenEl : null),
    querySelectorAll: () => [],
    createElement: () => ({ className: '', textContent: '', style: {}, appendChild: noop, remove: noop }),
  },
  localStorage: { _d: {}, getItem(k) { return this._d[k] || null; }, setItem(k, v) { this._d[k] = v; } },
  SpeechSynthesisUtterance: function () { },
  speechSynthesis: { cancel: noop, speak: noop },
  setTimeout, clearTimeout,
  requestAnimationFrame: (f) => f(),
};
sandbox.window.window = sandbox.window;
vm.createContext(sandbox);

const base = path.resolve(__dirname, '..');
vm.runInContext(fs.readFileSync(path.join(base, 'assets/data.js'), 'utf8'), sandbox);
vm.runInContext(fs.readFileSync(path.join(base, 'assets/data-words-bulk-a.js'), 'utf8'), sandbox);
vm.runInContext(fs.readFileSync(path.join(base, 'assets/data-words-full.js'), 'utf8'), sandbox);
vm.runInContext(fs.readFileSync(path.join(base, 'assets/data-words-mid.js'), 'utf8'), sandbox);

// 抓取文章（可选）：存在就加载，验证合并逻辑
const extraFile = path.join(base, 'assets/data-articles-extra.js');
const hasExtra = fs.existsSync(extraFile);
if (hasExtra) vm.runInContext(fs.readFileSync(extraFile, 'utf8'), sandbox);

for (const f of ['assets/data-articles-archive.js', 'assets/data-examples.js']) {
  const fp = path.join(base, f);
  if (fs.existsSync(fp)) vm.runInContext(fs.readFileSync(fp, 'utf8'), sandbox);
}
/* 点词翻译层（可选）：存在就加载，验证与词库/文章链共存；按加载链须在 app.js 之前 */
const tapFile = path.join(base, 'assets/data-tapdict.js');
let TAPDICT = {}, TAP_REVERSE = {};
if (fs.existsSync(tapFile)) {
  vm.runInContext(fs.readFileSync(tapFile, 'utf8'), sandbox);
  vm.runInContext('var TAPDICT = window.TAPDICT, TAP_REVERSE = window.TAP_REVERSE;', sandbox);
  TAPDICT = vm.runInContext('TAPDICT', sandbox);
  TAP_REVERSE = vm.runInContext('TAP_REVERSE', sandbox);
}
vm.runInContext(fs.readFileSync(path.join(base, 'assets/app.js'), 'utf8'), sandbox);

// data.js 里 const 声明在同一个 context 的顶层词法作用域中，可被后续脚本读到
const ARTICLES = vm.runInContext('ARTICLES', sandbox);
const ARTICLES_EXTRA = hasExtra ? vm.runInContext('ARTICLES_EXTRA', sandbox) : [];

const stats = {
  WORDS_total: sandbox.WORDS.length,
  WORDS_BULK_A_total: sandbox.window.WORDS_BULK_A.length,
  WORDS_FULL_total: sandbox.window.WORDS_FULL ? sandbox.window.WORDS_FULL.length : 0,
  added_unique: sandbox.window.__ADDED_WORDS__,
  added_unique_full: sandbox.window.__ADDED_WORDS_FULL__,
  dedupe_removed: sandbox.window.WORDS_BULK_A.length - sandbox.window.__ADDED_WORDS__,
  ARTICLES_total: ARTICLES.length,
  ARTICLES_builtin: ARTICLES.length - ARTICLES_EXTRA.length,
  ARTICLES_fetched: ARTICLES_EXTRA.length,
  CATEGORIES: sandbox.CATEGORIES,
  articlesByCat: {},
  missingFields: [],
  KEYWORDS_count: sandbox.KEYWORDS.length,
  TAPDICT_size: Object.keys(TAPDICT).length,
  TAP_REVERSE_size: Object.keys(TAP_REVERSE).length,
  /* 内容新鲜度与配图覆盖 */
  datedOldest: '',
  datedNewest: '',
  undated: 0,
  cover_img: 0,        // 文章自带 coverImg
  cover_mapped: 0,     // 由 COVER_MAP 回填
  cover_none: 0,       // 只有渐变兜底
  inline_imgs: 0,      // 正文内嵌图总数
  missingAssets: [],   // 引用了但磁盘上不存在的图片
};

/* 封面映射表（--backfill 生成），不存在时用空表兜底 */
let COVER_MAP = {};
const coverFile = path.join(base, 'assets/data-covers.js');
if (fs.existsSync(coverFile)) {
  vm.runInContext(fs.readFileSync(coverFile, 'utf8'), sandbox);
  COVER_MAP = vm.runInContext('COVER_MAP', sandbox);
}

const dates = ARTICLES.map(a => a.date).filter(Boolean).sort();
stats.datedOldest = dates[0] || '';
stats.datedNewest = dates[dates.length - 1] || '';
stats.undated = ARTICLES.filter(a => !a.date).length;

const seenAsset = new Set();
ARTICLES.forEach(a => {
  const img = a.coverImg || COVER_MAP[a.id] || '';
  if (a.coverImg) stats.cover_img++;
  else if (COVER_MAP[a.id]) stats.cover_mapped++;
  else stats.cover_none++;
  if (img) seenAsset.add(img);
  (a.paras || []).forEach(p => {
    if (!p.img) return;
    stats.inline_imgs++;
    seenAsset.add(p.img);
  });
});
seenAsset.forEach(rel => {
  if (!fs.existsSync(path.join(base, rel))) stats.missingAssets.push(rel);
});

ARTICLES.forEach(a => {
  stats.articlesByCat[a.cat] = (stats.articlesByCat[a.cat] || 0) + 1;
  const miss = [];
  ['id', 'cat', 'title', 'titleZh', 'source', 'url', 'cover', 'gradient', 'paras'].forEach(k => { if (!a[k]) miss.push(k); });
  /* 正文支持两种块：文本句（en+cn）与内嵌图（img） */
  if (a.paras) a.paras.forEach((p, i) => {
    if (p.img) return;
    if (!p.en || !p.cn) miss.push('paras[' + i + ']');
  });
  if (miss.length) stats.missingFields.push({ id: a.id, miss });
});
console.log(JSON.stringify(stats, null, 2));
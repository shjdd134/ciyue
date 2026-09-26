/* 阅读模式回归：迁移、实际点击、持久化、词汇偏好不变与句子锚点。
 * node tools/reading-intent-test.js */
const vm = require('vm');
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const base = path.resolve(__dirname, '..');
const noop = () => {};

function boot(initial) {
  const handlers = {};
  const listen = (t, f) => (handlers[t] || (handlers[t] = [])).push(f);
  const screen = { innerHTML: '', className: '', style: {}, appendChild: noop };
  const phone = { insertAdjacentHTML: noop, appendChild: noop, style: {} };
  const dom = {};
  const store = {};
  const sandbox = {
    console,
    window: { addEventListener: listen, removeEventListener: noop },
    document: {
      documentElement: { setAttribute: noop }, addEventListener: listen, removeEventListener: noop,
      querySelector: s => s === '#screen' ? screen : s === '.phone' ? phone : dom[s] || null,
      querySelectorAll: () => [], createElement: () => ({ style: {}, addEventListener: noop, appendChild: noop }),
    },
    localStorage: { getItem: k => store[k] || (initial ? JSON.stringify(initial) : null), setItem: (k, v) => { store[k] = v; } },
    SpeechSynthesisUtterance: function () {}, speechSynthesis: { cancel: noop, speak: noop },
    setTimeout: () => 0, clearTimeout: noop, setInterval: () => 0, clearInterval: noop,
    requestAnimationFrame: f => f(),
  };
  vm.createContext(sandbox);
  for (const file of [
    'data.js', 'data-words-bulk-a.js', 'data-words-full.js', 'data-words-mid.js', 'data-words-cet4.js',
    'data-articles-extra.js', 'data-articles-archive.js', 'data-covers.js', 'data-examples.js',
    'data-ecdict.js', 'data-tapdict.js', 'data-wordfreq.js',
  ]) {
    const p = path.join(base, 'assets', file);
    if (fs.existsSync(p)) vm.runInContext(fs.readFileSync(p, 'utf8'), sandbox, { filename: file });
  }
  const ctx = s => vm.runInContext(s, sandbox);
  ctx('var WORD_META = window.WORD_META; var TAPDICT = window.TAPDICT, TAP_REVERSE = window.TAP_REVERSE; var COMMON_WORDS = window.COMMON_WORDS;');
  vm.runInContext(fs.readFileSync(path.join(base, 'assets/app.js'), 'utf8'), sandbox, { filename: 'app.js' });
  const click = dataset => (handlers.click || []).forEach(f => f({
    target: { closest: () => ({ dataset, classList: { contains: () => false }, closest: () => null }) }, stopPropagation: noop,
  }));
  return { ctx, click, screen, dom, saved: () => JSON.parse(store[ctx('STORE')]) };
}

let count = 0;
function check(name, fn) { fn(); count++; console.log('✓ ' + name); }
const app = boot();
check('新用户默认随心阅读，首页有两个模式按钮', () => {
  assert.equal(app.ctx('S.readingIntent'), 'casual');
  assert.match(app.screen.className, /reading-casual/);
  assert.match(app.screen.innerHTML, /data-intent="casual" aria-pressed="true"/);
  assert.match(app.screen.innerHTML, /data-intent="study"/);
});
check('老用户与旧备份维持原来的辅助学习显示', () => {
  assert.equal(app.ctx('normalizeState({cnMode:"all",hlSets:{core:false,cet4:true}}).readingIntent'), 'study');
  assert.equal(app.ctx('normalizeState({highlightMode:"off"}).readingIntent'), 'study');
});
check('显式模式记忆及无效启动值回退', () => {
  assert.equal(app.ctx('normalizeState({readingIntent:"casual"}).readingIntent'), 'casual');
  assert.equal(app.ctx('normalizeState({readingIntent:"broken"}).readingIntent'), 'study');
});
check('备份验证拒绝错误模式，允许两种模式与旧版无字段备份', () => {
  app.ctx('validateBackupState({notebook:[],readingIntent:"casual"}); validateBackupState({notebook:[],readingIntent:"study"}); validateBackupState({notebook:[]})');
  assert.throws(() => app.ctx('validateBackupState({notebook:[],readingIntent:"broken"})'));
});
app.ctx('S.hlSets = {core:false,cet4:true,mid:true,custom:true}; S.customVocab = ["neuroscience"]; S.known=["world"]; S.notebook=[{word:"learn", addedAt:1, articleId:"", articleTitle:"", context:{en:"I learn every day.",cn:"我每天都学习。"}}]; S.cnMode="all"; rebuildCustomSet();');
const prefs = app.ctx('JSON.stringify([S.hlSets,S.customVocab,S.known,S.notebook,S.cnMode])');
const vocabulary = app.ctx('highlightEn("I learn about the world and neuroscience.")');
check('点击切换后立即落盘且切换辅助学习显示', () => {
  app.click({ act: 'set-reading-intent', intent: 'study' });
  assert.equal(app.saved().readingIntent, 'study');
  assert.match(app.screen.className, /reading-study/);
});
check('来回切换不改高亮词源、生词、认识词、导入词库和中文偏好', () => {
  app.click({ act: 'set-reading-intent', intent: 'casual' });
  assert.equal(app.ctx('JSON.stringify([S.hlSets,S.customVocab,S.known,S.notebook,S.cnMode])'), prefs);
  assert.equal(app.ctx('highlightEn("I learn about the world and neuroscience.")'), vocabulary);
  assert.match(vocabulary, /data-act="lookup"/);
  assert.match(vocabulary, /class="word wb"/);
});
check('重新启动后模式和词汇偏好保持', () => {
  const restored = boot(app.saved());
  assert.equal(restored.ctx('S.readingIntent'), 'casual');
  assert.equal(restored.ctx('JSON.stringify([S.hlSets,S.customVocab,S.known,S.notebook,S.cnMode])'), prefs);
});
check('无效按钮值不污染运行状态', () => {
  app.click({ act: 'set-reading-intent', intent: 'broken' });
  assert.equal(app.ctx('S.readingIntent'), 'casual');
});
check('阅读设置提供模式入口，学习指标有显示开关', () => {
  assert.match(app.ctx('renderReadSettingsSheet()'), /data-intent="study"/);
  assert.match(app.ctx('renderHome()'), /class="study-only"/);
  app.ctx('activeArticle = ARTICLES[0]');
  const html = app.ctx('renderRead()');
  assert.match(html, /class="study-only">需学/);
  assert.match(html, /class="st-chip study-only"/);
});

/* 用模式切换前后的真实位置差模拟字号/指标引起的排版变化，捕捉丢锚点回归。
   同一个句子对象保留 sel / peek，不能通过重绘正文“恢复”一个看似相同的新对象。 */
const cont = {
  scrollTop: 400, clientHeight: 600, dataset: { art: app.ctx('activeArticle.id') },
  classList: { toggle: noop }, getBoundingClientRect: () => ({ top: 0 }),
};
const sentence = {
  dataset: { pi: '3', si: '2', rs: '1' }, selected: true, peek: true,
  getBoundingClientRect: () => { const top = (app.screen.className.includes('reading-study') ? 640 : 520) - cont.scrollTop; return { top, bottom: top + 40 }; },
};
cont.querySelectorAll = () => [sentence];
cont.querySelector = () => sentence;
app.dom['#read-scroll'] = cont;
const before = sentence.getBoundingClientRect().top;
check('阅读中切换补偿原句位置并保留选句、展开译文及正文', () => {
  const oldMarkup = app.screen.innerHTML;
  app.click({ act: 'set-reading-intent', intent: 'study' });
  assert.equal(sentence.getBoundingClientRect().top, before);
  assert.equal(cont.scrollTop, 520);
  assert.ok(sentence.selected && sentence.peek);
  assert.equal(app.screen.innerHTML, oldMarkup);
});
check('其他阅读设置不会把模式类清掉', () => {
  app.click({ act: 'set-fs', fs: '1' });
  assert.match(app.screen.className, /reading-study/);
  app.click({ act: 'set-reading-intent', intent: 'casual' });
  assert.equal(sentence.getBoundingClientRect().top, before);
  assert.equal(cont.scrollTop, 400);
});
console.log(`\n${count} 项阅读模式回归通过`);

/* 导航回归测试：验证「阅读页返回」回到进来时的那张列表，而不是无条件回首页。
 * 用 vm 起一个最小 DOM 沙箱，捕获 app.js 注册的 click 监听，模拟真实点击。
 * 运行：node tools/nav-test.js */
const vm = require('vm');
const fs = require('fs');
const path = require('path');
const noop = () => { };

const base = path.resolve(__dirname, '..');
const handlers = {};
const screenEl = { innerHTML: '', style: {}, className: '', appendChild: noop };
const phoneEl = { appendChild: noop, insertAdjacentHTML: noop, style: {} };

const grow = (ds, extra) => Object.assign({
  dataset: ds,
  classList: { add: noop, remove: noop, toggle: noop, contains: () => false },
  closest: () => null,
  scrollTop: 0,
  getBoundingClientRect: () => ({ top: 0 }),
  addEventListener: noop,
  clientHeight: 600,
  scrollHeight: 2000,
}, extra || {});

const sandbox = {
  console,
  window: { addEventListener: (t, f) => { handlers[t] = f; }, removeEventListener: noop },
  document: {
    documentElement: { setAttribute: noop },
    addEventListener: (t, f) => { handlers[t] = f; },
    removeEventListener: noop,
    querySelector: s => (s === '#screen' ? screenEl : s === '.phone' ? phoneEl : null),
    querySelectorAll: () => [],
    createElement: () => grow({}),
  },
  localStorage: { _d: {}, getItem(k) { return this._d[k] || null; }, setItem(k, v) { this._d[k] = v; } },
  SpeechSynthesisUtterance: function () { },
  speechSynthesis: { cancel: noop, speak: noop },
  setTimeout, clearTimeout, setInterval: () => 0, clearInterval: noop,
  requestAnimationFrame: f => f(),
};
sandbox.window.window = sandbox.window;
vm.createContext(sandbox);

for (const f of [
  'assets/data.js', 'assets/data-words-bulk-a.js', 'assets/data-words-full.js', 'assets/data-words-mid.js',
  'assets/data-articles-extra.js', 'assets/data-articles-archive.js', 'assets/data-covers.js',
  'assets/data-examples.js', 'assets/data-ecdict.js'
]) {
  const p = path.join(base, f);
  if (fs.existsSync(p)) vm.runInContext(fs.readFileSync(p, 'utf8'), sandbox, { filename: f });
}
/* 沙箱的 window 是替身对象，词形表要显式提升到全局才能被 app.js 取到 */
vm.runInContext('var WORD_META = window.WORD_META;', sandbox);
vm.runInContext(fs.readFileSync(path.join(base, 'assets/app.js'), 'utf8'), sandbox, { filename: 'assets/app.js' });

const ctx = expr => vm.runInContext(expr, sandbox);
const click = ds => handlers.click({ target: { closest: () => grow(ds) }, stopPropagation: noop });
const at = () => ({ view: ctx('view.name'), cat: ctx('catFilter'), depth: ctx('navStack.length') });

let pass = 0, fail = 0;
const ok = (name, cond) => { (cond ? pass++ : fail++); console.log(`  ${cond ? '✓' : '✗'} ${name}`); };
const eq = (name, a, b) => ok(`${name}（${JSON.stringify(a)}）`, JSON.stringify(a) === JSON.stringify(b));

console.log('\n[1] 发现页 · 足球分类 → 打开文章 → 返回');
click({ tab: 'discover' });
click({ cat: '足球' });
eq('已切到发现页', at().view, 'discover');
eq('筛选为足球', at().cat, '足球');
const fashion = ctx('ARTICLES.filter(a=>a.cat==="足球").map(a=>a.id)');
ok(`足球分类有 ${fashion.length} 篇`, fashion.length > 1);

click({ article: fashion[0] });
eq('进入阅读页', at().view, 'read');
eq('来路压栈一层', at().depth, 1);
ok('读完卡片有去处按钮', /finish-nav/.test(screenEl.innerHTML) && /返回足球/.test(screenEl.innerHTML));

click({ act: 'go-back' });
eq('返回回到发现页（而不是首页）', at().view, 'discover');
eq('分类筛选被保留', at().cat, '足球');
eq('栈已清空', at().depth, 0);

console.log('\n[2] 首页 · 今日推荐 → 打开文章 → 返回');
click({ tab: 'home' });
click({ article: ctx('ARTICLES[3].id') });
eq('进入阅读页', at().view, 'read');
click({ act: 'go-back' });
eq('返回回到首页', at().view, 'home');

console.log('\n[3] 分类内「下一篇」');
click({ tab: 'discover' });
click({ cat: '足球' });
const ids = ctx('ARTICLES.filter(a=>a.cat==="足球").map(a=>a.id)');
click({ article: ids[0] });
click({ act: 'next-article' });
eq('下一篇 = 同分类第 2 篇', ctx('activeArticle.id'), ids[1]);
click({ act: 'next-article' });
eq('再下一篇 = 同分类第 3 篇', ctx('activeArticle.id'), ids[2]);
click({ act: 'go-back' });
eq('连读几篇后返回仍回到分类页', [at().view, at().cat], ['discover', '足球']);

console.log('\n[4] 分类最后一篇点「下一篇」');
click({ article: ids[ids.length - 1] });
const lastId = ctx('activeArticle.id');
click({ act: 'next-article' });
eq('不越界、留在原篇', ctx('activeArticle.id'), lastId);
click({ act: 'go-back' });
eq('仍能正常返回', at().view, 'discover');

console.log('\n[5] 生词本（根级跳转）不残留来路');
click({ tab: 'discover' });
click({ article: ids[0] });
click({ act: 'book' });
eq('跳到「我的」', at().view, 'me');
eq('栈已重置', at().depth, 0);
click({ act: 'go-back' });
eq('无来路时兜底回首页且不报错', at().view, 'home');

console.log(`\n结果：${pass} 通过 / ${fail} 失败\n`);
process.exit(fail ? 1 : 0);

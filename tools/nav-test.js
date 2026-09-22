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
  'assets/data-examples.js', 'assets/data-ecdict.js', 'assets/data-tapdict.js', 'assets/data-wordfreq.js'
]) {
  const p = path.join(base, f);
  if (fs.existsSync(p)) vm.runInContext(fs.readFileSync(p, 'utf8'), sandbox, { filename: f });
}
/* 沙箱的 window 是替身对象，词形表要显式提升到全局才能被 app.js 取到 */
vm.runInContext('var WORD_META = window.WORD_META;', sandbox);
vm.runInContext('var TAPDICT = window.TAPDICT, TAP_REVERSE = window.TAP_REVERSE;', sandbox);
vm.runInContext('var COMMON_WORDS = window.COMMON_WORDS;', sandbox);
vm.runInContext(fs.readFileSync(path.join(base, 'assets/app.js'), 'utf8'), sandbox, { filename: 'assets/app.js' });

const ctx = expr => vm.runInContext(expr, sandbox);
const click = ds => handlers.click({ target: { closest: () => grow(ds) }, stopPropagation: noop });
const at = () => ({ view: ctx('view.name'), cat: ctx('catFilter'), depth: ctx('navStack.length') });

let pass = 0, fail = 0;
const ok = (name, cond) => { (cond ? pass++ : fail++); console.log(`  ${cond ? '✓' : '✗'} ${name}`); };
const eq = (name, a, b) => ok(`${name}（${JSON.stringify(a)}）`, JSON.stringify(a) === JSON.stringify(b));

const sequenceCat = ctx('CATEGORIES.find(c => c !== "全部" && ARTICLES.filter(a => a.cat === c).length >= 2)') || '全部';
const sequenceIds = sequenceCat === '全部'
  ? ctx('ARTICLES.map(a=>a.id)')
  : ctx(`ARTICLES.filter(a=>a.cat===${JSON.stringify(sequenceCat)}).map(a=>a.id)`);
console.log(`\n[1] 发现页 · ${sequenceCat}分类 → 打开文章 → 返回`);
click({ tab: 'discover' });
click({ cat: sequenceCat });
eq('已切到发现页', at().view, 'discover');
eq(`筛选为${sequenceCat}`, at().cat, sequenceCat);
ok(`${sequenceCat}分类有 ${sequenceIds.length} 篇`, sequenceIds.length > 1);

click({ article: sequenceIds[0] });
eq('进入阅读页', at().view, 'read');
eq('来路压栈一层', at().depth, 1);
ok('读完卡片有去处按钮', /finish-nav/.test(screenEl.innerHTML) && screenEl.innerHTML.includes(`返回${sequenceCat === '全部' ? '发现' : sequenceCat}`));

click({ act: 'go-back' });
eq('返回回到发现页（而不是首页）', at().view, 'discover');
eq('分类筛选被保留', at().cat, sequenceCat);
eq('栈已清空', at().depth, 0);

console.log('\n[2] 首页 · 今日推荐 → 打开文章 → 返回');
click({ tab: 'home' });
click({ article: ctx('ARTICLES[1].id') });
eq('进入阅读页', at().view, 'read');
click({ act: 'go-back' });
eq('返回回到首页', at().view, 'home');

console.log('\n[2b] 首页分类入口 → 发现页');
click({ tab: 'home' });
click({ cat: sequenceCat, go: '1' });
eq('首页分类入口进入发现页', at().view, 'discover');
eq('首页分类入口保留分类筛选', at().cat, sequenceCat);
click({ act: 'go-back' });
eq('分类入口可返回首页', at().view, 'home');

console.log('\n[3] 分类内「下一篇」');
click({ tab: 'discover' });
click({ cat: sequenceCat });
const ids = sequenceIds;
click({ article: ids[0] });
click({ act: 'next-article' });
eq('下一篇 = 同分类第 2 篇', ctx('activeArticle.id'), ids[1]);
if (ids.length > 2) {
  click({ act: 'next-article' });
  eq('再下一篇 = 同分类第 3 篇', ctx('activeArticle.id'), ids[2]);
}
click({ act: 'go-back' });
eq('连读几篇后返回仍回到分类页', [at().view, at().cat], ['discover', sequenceCat]);

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
click({ act: 'article-notebook' });
eq('生词本 sheet 在阅读页上打开', at().view, 'read');
click({ act: 'close-sheet' });
click({ tab: 'home' });
eq('回首页不报错', at().view, 'home');

console.log('\n[6] 阅读记录入口');
click({ tab: 'me' });
click({ act: 'read-history' });
eq('阅读记录进入独立页面', at().view, 'history');
ok('阅读记录页面包含已打开的文章', screenEl.innerHTML.includes('history-row'));
click({ act: 'go-back' });
eq('阅读记录可返回来路', at().view, 'me');

console.log('\n[7] 人物专题与原刊入口');
click({tab:'discover'});
click({cat:'人物'});
ok('人物栏目专属介绍已删除',!screenEl.innerHTML.includes('people-intro') && !screenEl.innerHTML.includes('人物，和他们的世界。'));
const peopleId=ctx('ARTICLES.find(a=>a.cat==="人物")?.id');
ok('人物专题存在',!!peopleId);
click({article:peopleId});
ok('明确原文范围',screenEl.innerHTML.includes('原刊正文') || screenEl.innerHTML.includes('本站导读 · 原刊全文入口'));
ok('原刊入口可见',screenEl.innerHTML.includes('查看 Vogue 原刊页面') || screenEl.innerHTML.includes('查看 AnOther Magazine 原刊页面') || screenEl.innerHTML.includes('完整原文 ↗'));
ok('图片带摄影署名',screenEl.innerHTML.includes('photo-credit'));
click({act:'go-back'});
eq('返回人物分类',[at().view,at().cat],['discover','人物']);

console.log('\n[8] 我的词汇：真实按钮切换与即时更新');
/* 从实际页面标记读取全部 data-*，防止手工省掉 data-tab 掩盖事件分发冲突。 */
const clickRenderedButton = (html, act, tab) => {
  const button = (html.match(/<button\b[^>]*>/g) || []).find(tag =>
    tag.includes(`data-act="${act}"`) && (tab === undefined || tag.includes(`data-tab="${tab}"`)));
  if (!button) throw new Error(`找不到按钮 ${act}/${tab || ''}`);
  const dataset = Object.fromEntries([...button.matchAll(/data-([a-z-]+)="([^"]*)"/g)].map(([, k, v]) =>
    [k.replace(/-([a-z])/g, (_, c) => c.toUpperCase()), v]));
  click(dataset);
};
const notebookWord = ctx('WORDS[0].word');
ctx(`S.notebook = [{ word: ${JSON.stringify(notebookWord)}, addedAt: 1, context: null }]; S.known = [];`);
click({ tab: 'me' });
clickRenderedButton(screenEl.innerHTML, 'open-notebook');
clickRenderedButton(screenEl.innerHTML, 'vocab-tab', 'known');
eq('点击已认识标签真的切换', ctx('vocabTab'), 'known');
ok('已认识标签初始显示空状态', screenEl.innerHTML.includes('还没有标为已认识的词'));
clickRenderedButton(screenEl.innerHTML, 'vocab-tab', 'new');
eq('点击生词标签可以切回', ctx('vocabTab'), 'new');
clickRenderedButton(ctx(`renderSheet(${JSON.stringify(notebookWord)})`), 'mark-known');
ok('标认识后生词列表立即移走该词', !screenEl.innerHTML.includes('class="nb-row"'));
ok('标认识后两个标签的数量立即更新', /data-tab="new"[^>]*>生词 <b>0<\/b>/.test(screenEl.innerHTML)
  && /data-tab="known"[^>]*>已认识 <b>1<\/b>/.test(screenEl.innerHTML));
clickRenderedButton(screenEl.innerHTML, 'vocab-tab', 'known');
ok('已认识列表中能看到原收藏', screenEl.innerHTML.includes(`data-word="${notebookWord}"`));
clickRenderedButton(ctx(`renderSheet(${JSON.stringify(notebookWord)})`), 'mark-known');
ok('取消认识后已认识列表即时清空', !screenEl.innerHTML.includes('class="nb-row"'));
ok('取消认识仍保留生词与收藏记录', ctx(`S.notebook.length === 1 && !S.known.includes(${JSON.stringify(notebookWord)})`)
  && /data-tab="new"[^>]*>生词 <b>1<\/b>/.test(screenEl.innerHTML));
click({ tab: 'home' });
eq('页内标签修复不影响主导航', at().view, 'home');

console.log(`\n结果：${pass} 通过 / ${fail} 失败\n`);
process.exit(fail ? 1 : 0);

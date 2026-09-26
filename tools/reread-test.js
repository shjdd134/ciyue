/* 重读回归：旧记录与收藏保留，当前位置可从头开始。
 * 用 vm 起一个最小 DOM 沙箱，捕获 app.js 注册的 click 监听，模拟真实点击。
 * 运行：node tools/reread-test.js */
const vm = require('vm');
const fs = require('fs');
const path = require('path');
const noop = () => { };

const base = path.resolve(__dirname, '..');
/* ★ 事件名 → 监听函数**数组**（2026-09-22 修）。
   原来每个事件只有一个槽（`handlers[t] = f`），于是「同一类型注册第二个监听」会把
   第一个**静默顶掉** —— 而真实浏览器里两个都会跑。
   app.js v79 给 document 加了一个 capture 的 click 监听（刷新活跃时间戳，为原生壳的
   切后台落盘服务），它后注册、把导航委托从槽里挤掉了 →
   nav-test 从 [1] 起全线报红、`activeArticle` 恒为 null，
   **看起来像「导航功能被改坏了」，其实是桩坏了**（工具与源文件走散时先怀疑工具）。
   ★ 通用判据：**只要被测代码可能给同一事件注册多个监听，桩就必须是「多槽」的。** */
const handlers = {};
const listen = (t, f) => { (handlers[t] || (handlers[t] = [])).push(f); };
const fire = (t, ev) => (handlers[t] || []).forEach(f => f(ev));
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
  window: { addEventListener: listen, removeEventListener: noop },
  document: {
    documentElement: { setAttribute: noop },
    addEventListener: listen,
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
const click = ds => fire('click', { target: { closest: () => grow(ds) }, stopPropagation: noop });
const at = () => ({ view: ctx('view.name'), cat: ctx('catFilter'), depth: ctx('navStack.length') });

let pass = 0, fail = 0;
const ok = (name, cond) => { (cond ? pass++ : fail++); console.log(`  ${cond ? '✓' : '✗'} ${name}`); };
const eq = (name, a, b) => ok(`${name}（${JSON.stringify(a)}）`, JSON.stringify(a) === JSON.stringify(b));


const id = ctx('ARTICLES[0].id');
const key = JSON.stringify(id);
ctx(`S = normalizeState({read:[${key}],finished:[${key}],readCount:{[${key}]:2},known:['hello'],notebook:[{word:'world',context:{en:'Hello world.',cn:'你好，世界。'}}],articleFeedback:{[${key}]:{rate:'up',at:1}},readHistory:{[${key}]:{firstAt:1,lastAt:10,visits:3,finished:true}},readPos:{[${key}]:{pi:3,si:0,rs:0,off:80,y:780,pct:55,at:10}}});`);
click({tab:'home'});
click({act:'open-shelf',filter:'finished'});
ok('读过文章同时提供续读和重读按钮', screenEl.innerHTML.includes('data-act="resume-article"') && screenEl.innerHTML.includes('data-act="restart-article"'));
click({act:'resume-article',id});
eq('续读使用上次位置', ctx('resumeY'),780);
eq('续读沿用句子锚点', ctx('resumeAnchor.pi'),3);
click({act:'go-back'});
click({act:'restart-article',id});
eq('从头重读请求回到零位置',ctx('[resumeY,resumeAnchor,resumeFromStart]'),[0,null,true]);
eq('重读不清除以前的已读次数和状态',ctx(`[S.readCount[${key}],S.finished.includes(${key}),S.read.includes(${key})]`),[2,true,true]);
eq('生词、认识、喜欢原样保留',ctx(`[S.notebook[0].word,S.known[0],S.articleFeedback[${key}].rate]`),['world','hello','up']);
ok('重读中的文章仍能从首页继续',ctx(`shelfArticles('reading').some(a=>a.id===${key})`));
ok('重读中的文章仍保留在读过列表',ctx(`shelfArticles('finished').some(a=>a.id===${key})`));
ok('重读页可标记本遍完成',screenEl.innerHTML.includes('这遍读完了'));
const depth=ctx('navStack.length');
click({act:'restart-article',id});
eq('阅读页再次从头不会多压一层导航',ctx('navStack.length'),depth);
eq('历史最早阅读日期保留',ctx(`S.readHistory[${key}].firstAt`),1);
ctx(`S = normalizeState(JSON.parse(JSON.stringify(S)));validateBackupState(S);`);
ok('备份往返后仍识别正在重读',ctx(`isReadingAgain(${key})`));
click({act:'punch-in'});
eq('重读完成只增加次数，不增加重复文章',ctx(`[S.readCount[${key}],S.finished.length,S.read.length]`),[3,1,1]);
ok('完成后取消重读中的状态',!ctx(`isReadingAgain(${key})`));
click({act:'punch-in'});
eq('重复完成事件不会重复计数',ctx(`S.readCount[${key}]`),3);
click({act:'go-back'});
eq('返回读过书架',ctx('[view.name,shelfFilter]'),['shelf','finished']);
ctx(`openReadingArticle(${key},{anchor:{pi:4,si:1,rs:2,off:80}});`);
eq('收藏原句可指定定位锚点',ctx('resumeAnchor'),{pi:4,si:1,rs:2,off:80});
const old=ctx('JSON.stringify(S)');
ok('不存在的原文不会打开',ctx('openReadingArticle("missing")')===false);
ok('不存在的原文不会改变记录',ctx('JSON.stringify(S)')===old);

console.log('\n[2] 从主题书架连读已读文章');
const nextId=ctx('ARTICLES[1].id'), nextKey=JSON.stringify(nextId);
ctx(`S=normalizeState({collections:[{id:'reread-list',name:'重读书架',articleIds:[${key},${nextKey}],createdAt:1}],read:[${nextKey}],finished:[${nextKey}],readCount:{[${nextKey}]:2},readHistory:{[${nextKey}]:{firstAt:7,lastAt:8,visits:4,finished:true}},readPos:{[${nextKey}]:{pi:4,si:0,off:80,y:720,pct:55,at:8}}});`);
click({tab:'me'});
click({act:'open-collections'});
click({act:'open-collection',id:'reread-list'});
click({article:id});
const listDepth=ctx('navStack.length');
click({act:'next-article'});
eq('下一篇在书架内从头打开已读文章',ctx('[activeArticle.id,resumeY,resumeAnchor,resumeFromStart]'),[nextId,0,null,true]);
eq('下一篇没有多压导航层',ctx('navStack.length'),listDepth);
ok('已读下一篇进入可续读的重读状态',ctx(`isReadingAgain(${nextKey}) && shelfArticles('reading').some(a=>a.id===${nextKey})`));
eq('原来的读过次数与日期保留',ctx(`[S.readCount[${nextKey}],S.readHistory[${nextKey}].firstAt]`),[2,7]);
click({act:'go-back'});
eq('连读重读后返回同一个主题书架',ctx('[view.name,collectionId]'),['collections','reread-list']);
click({tab:'home'});
ok('首页继续阅读指向本次重读',screenEl.innerHTML.includes(`data-article="${nextId}"`) && ctx(`shelfArticles('reading')[0].id===${nextKey}`));
console.log(`\n结果：${pass} 通过 / ${fail} 失败`);
process.exit(fail?1:0);

/* 导航回归测试：验证「阅读页返回」回到进来时的那张列表，而不是无条件回首页。
 * 用 vm 起一个最小 DOM 沙箱，捕获 app.js 注册的 click 监听，模拟真实点击。
 * 运行：node tools/nav-test.js */
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


console.log('\n[9] 私人书架：队列、置顶、喜欢与返回');
ctx('S = normalizeState({});');
click({tab:'home'});
const [shelfA, shelfB] = ctx('ARTICLES.slice(0, 2).map(a => a.id)');
click({act:'shelf-want', id:shelfA});
eq('加入想读不打开文章', at().view, 'home');
click({act:'shelf-want', id:shelfB});
click({act:'shelf-pin', id:shelfA});
eq('自己置顶的文章先显示', ctx('shelfArticles("want").map(a => a.id)'), [shelfA, shelfB]);
click({act:'shelf-like', id:shelfA});
ok('喜欢与想读独立共存', ctx(`S.wantRead.includes(${JSON.stringify(shelfA)}) && likesArticle(${JSON.stringify(shelfA)})`));
click({act:'open-shelf', filter:'want'});
eq('进入想读书架', at().view, 'shelf');
click({article:shelfA});
ok('开始阅读移出待读及置顶，保留喜欢', ctx(`!S.wantRead.includes(${JSON.stringify(shelfA)}) && !S.pinnedReads.includes(${JSON.stringify(shelfA)}) && likesArticle(${JSON.stringify(shelfA)})`));
eq('下一篇跟随自己挑选的清单', ctx('nextArticle(activeArticle).id'), shelfB);
ok('返回文案指向书架', screenEl.innerHTML.includes('返回书架'));
click({act:'go-back'});
eq('返回书架并保留筛选', [at().view, ctx('shelfFilter')], ['shelf','want']);
click({act:'shelf-filter', filter:'reading'});
ok('在读列表能找到刚打开的文章', screenEl.innerHTML.includes(`data-article="${shelfA}"`));
click({article:shelfA});
click({act:'punch-in'});
click({act:'go-back'});
click({act:'shelf-filter', filter:'finished'});
ok('读过列表能找到读完的文章', screenEl.innerHTML.includes(`data-article="${shelfA}"`));
click({act:'shelf-filter', filter:'liked'});
ok('已读文章仍出现在喜欢列表', screenEl.innerHTML.includes(`data-article="${shelfA}"`));
click({act:'shelf-like', id:shelfA});
ok('取消喜欢后立即移出列表，但已读记录不变', !screenEl.innerHTML.includes(`data-article="${shelfA}"`) && ctx(`S.finished.includes(${JSON.stringify(shelfA)})`));
click({act:'shelf-want', id:shelfB});
eq('可取消剩余待读', ctx('S.wantRead.length'), 0);
click({act:'go-back'});
eq('书架返回原来的首页', at().view, 'home');

console.log('\n[10] 旧反馈、备份及推荐边界');
ctx(`S = normalizeState({articleFeedback:{[ARTICLES[0].id]:{rate:'up',diff:'hard',at:10}}, wantRead:[ARTICLES[1].id], pinnedReads:[ARTICLES[1].id]});`);
eq('旧版喜欢反馈直接进入书架', ctx('shelfArticles("liked").map(a => a.id)'), [shelfA]);
click({act:'shelf-like', id:shelfA});
eq('取消喜欢不丢难度反馈', ctx(`S.articleFeedback[${JSON.stringify(shelfA)}].diff`), 'hard');
ctx('validateBackupState(S); S = normalizeState(JSON.parse(JSON.stringify(S)));');
eq('备份往返保留想读和置顶', ctx('[S.wantRead, S.pinnedReads]'), [[shelfB],[shelfB]]);
ok('非法书架备份会拒绝', ctx(`(() => { try { validateBackupState({wantRead: 'oops'}); return false; } catch { return true; } })()`));
eq('旧备份自动补空书架', ctx('normalizeState({read:[]}).wantRead'), []);
eq('清洗重复、非法及悬空置顶', ctx('(() => { const n=normalizeState({wantRead:["a","a",null,2],pinnedReads:["a","b"]}); return [n.wantRead,n.pinnedReads]; })()'), [['a'],['a']]);
ok('收藏未上线文章时不产生假记录', (() => {const before=ctx('JSON.stringify(S)');click({act:'shelf-want',id:'missing'});return before===ctx('JSON.stringify(S)');})());
ctx('S = normalizeState({});');
/* 2026-09-26 书架批次新增「社会/科技/历史」各 1 篇 —— ARTICLES[0] 一旦落进这种单篇栏目
 * （app.js 启动后会重排），同栏 peer 就不存在了。显式挑一个同栏 ≥2 篇的栏目来测。 */
const peer = ctx('(() => { const base = ARTICLES.find(a => ARTICLES.filter(y => y.cat === a.cat).length >= 2); return ARTICLES.find(a => a.id !== base.id && a.cat === base.cat).id; })()');
const peerBaseId = ctx('(() => { const base = ARTICLES.find(a => ARTICLES.filter(y => y.cat === a.cat).length >= 2); return base.id; })()');
const peerScore = ctx(`clientScore(ARTICLES.find(a => a.id === ${JSON.stringify(peer)}))`);
ctx(`S.articleFeedback[${JSON.stringify(peerBaseId)}] = {rate:"down",diff:"hard"};`);
eq('不喜欢一篇不会降低同栏目其他文章的分数', ctx(`clientScore(ARTICLES.find(a => a.id === ${JSON.stringify(peer)}))`), peerScore);
ctx(`S = normalizeState({lastRead:{id:${JSON.stringify(shelfA)},y:120,pct:10,at:10}});`);
ok('只有旧 lastRead 记录也能继续读', ctx('renderHome()').includes('class="rc-pct">读到 10%'));
ctx('S.lastRead = null; S.readHistory = {}; S.readPos = {}; S.read = []; S.finished = [];');
ok('真正无阅读记录时显示开始阅读', ctx('renderHome()').includes('从今天的一篇文章开始'));
const homeHtml=ctx('renderHome()');
ok('首页次序：续读、想读、最近发布、喜欢、封面', (() => {
  const positions=['class="home-resume"','data-shelf-section="want"','data-shelf-section="recent"','data-shelf-section="liked"','class="editorial-feature'].map(x=>homeHtml.indexOf(x));
  return positions.every((n,i)=>n>=0 && (!i || n>positions[i-1]));
})());

console.log('\n[11] 续读数据不会被覆盖');
ctx(`S = normalizeState({readHistory:{[ARTICLES[0].id]:{title:"Saved title",firstAt:1,visits:3}}, readPos:{[ARTICLES[0].id]:{y:321,pct:12,at:1}}});`);
ctx(`rememberReadPos({scrollTop:321}, ARTICLES[0].id);`);
eq('保存位置保留历史标题', ctx('S.readHistory[ARTICLES[0].id].title'), 'Saved title');
eq('保存位置保留访问次数', ctx('S.readHistory[ARTICLES[0].id].visits'), 3);
ctx(`S.readPos[ARTICLES[0].id] = {y:321,pct:12,at:1}; S.lastRead={id:ARTICLES[1].id,y:45,pct:2,at:2};`);
click({article:shelfA});
eq('非最近一篇也有滚动位置兜底', ctx('resumeY'), 321);
click({act:'go-back'});
click({act:'nb-open-art',id:shelfA});
eq('从生词本回原文也恢复每篇位置', ctx('resumeY'), 321);
click({act:'go-back'});

console.log(`\n结果：${pass} 通过 / ${fail} 失败\n`);
process.exit(fail ? 1 : 0);

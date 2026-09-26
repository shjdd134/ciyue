/* 自建书架与首页封面：通过真实委托事件验证独立数据、导航与备份。
 * 用 vm 起一个最小 DOM 沙箱，捕获 app.js 注册的 click 监听，模拟真实点击。
 * 运行：node tools/collections-test.js */
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
let sheetHTML = '';
const nameInput = { value: '', focus: noop };
const scrollEl = { scrollTop: 0 };
const phoneEl = { appendChild: noop, insertAdjacentHTML: (where, html) => { sheetHTML = html; }, style: {} };
let historyBacks = 0;

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
    querySelector: s => (s === '#screen' ? screenEl : s === '.phone' ? phoneEl : s === '#collection-name' ? nameInput : s === '#screen .view' ? scrollEl : null),
    querySelectorAll: () => [],
    createElement: () => grow({}),
  },
  localStorage: { _d: {}, getItem(k) { return this._d[k] || null; }, setItem(k, v) { this._d[k] = v; } },
  history: { state: {}, pushState: noop, replaceState: noop, back: () => { historyBacks++; }, go: noop },
  location: { protocol: 'https:', href: 'https://test.invalid/ciyue/' },
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

const renderedClick = (html, act, id) => {
  const tag = (html.match(/<button\b[^>]*>/g) || []).find(s => s.includes(`data-act="${act}"`) && (!id || s.includes(`data-id="${id}"`)));
  if (!tag) throw new Error(`Missing actual button ${act}`);
  click(Object.fromEntries([...tag.matchAll(/data-([a-z-]+)="([^"]*)"/g)].map(([, k,v]) => [k.replace(/-([a-z])/g, (_, c) => c.toUpperCase()), v])));
};
const submitName = name => {
  const tag = sheetHTML.match(/<form\b[^>]*>/)?.[0];
  if (!tag) throw new Error('Missing collection form');
  nameInput.value = name;
  const data = Object.fromEntries([...tag.matchAll(/data-([a-z-]+)="([^"]*)"/g)].map(([,k,v]) => [k,v]));
  fire('submit', { target: { id: 'collection-form', dataset: data }, preventDefault: noop });
};
const id = ctx('ARTICLES[0].id'), id2 = ctx('ARTICLES[1].id'), id3 = ctx('ARTICLES[2].id');
ctx(`S = normalizeState({wantRead:[${JSON.stringify(id)}], pinnedReads:[${JSON.stringify(id)}], finished:[${JSON.stringify(id)}], articleFeedback:{[${JSON.stringify(id)}]:{rate:'up',at:1}}, readPos:{[${JSON.stringify(id)}]:{y:444,pct:40,at:1}}});render();`);

console.log('\n[1] 从页面入口创建、重命名与表单边界');
renderedClick(screenEl.innerHTML, 'open-collections');
eq('首页可以进入书架总览',ctx('view.name'),'collections');
renderedClick(screenEl.innerHTML, 'collection-create');
ok('名称使用应用内表单',sheetHTML.includes('id="collection-form"') && sheetHTML.includes('maxlength="30"'));
submitName('   ');
eq('拒绝空白名称',ctx('S.collections.length'),0);
submitName('睡前读');
eq('提交表单新建书架',ctx('S.collections[0].name'),'睡前读');
const shelf1 = ctx('S.collections[0].id');
renderedClick(screenEl.innerHTML, 'collection-create');
submitName('睡前读');
eq('拒绝重复名称',ctx('S.collections.length'),1);
submitName('x'.repeat(31));
eq('拒绝超长名称',ctx('S.collections.length'),1);
submitName('人物 <script>');
eq('接受普通符号并转义展示',ctx('S.collections.length'),2);
ok('名称转义安全', screenEl.innerHTML.includes('人物 &lt;script&gt;') && !screenEl.innerHTML.includes('人物 <script>'));
const shelf2 = ctx('S.collections[0].id');
renderedClick(screenEl.innerHTML, 'open-collection',shelf1);
renderedClick(screenEl.innerHTML, 'collection-rename');
submitName('让我想做点什么');
eq('重命名保持书架身份',ctx(`collectionById(${JSON.stringify(shelf1)}).name`),'让我想做点什么');

console.log('\n[2] 多个书架与阅读状态独立');
click({tab:'home'});
renderedClick(screenEl.innerHTML,'article-collections',id);
renderedClick(sheetHTML,'collection-toggle',shelf1);
renderedClick(sheetHTML,'collection-toggle',shelf2);
ok('同一文章可以属于多个书架',ctx(`S.collections.every(c=>c.articleIds.includes(${JSON.stringify(id)}))`));
ok('加入书架不改想读、置顶、读过、喜欢与进度',ctx(`S.wantRead.includes(${JSON.stringify(id)}) && S.pinnedReads.includes(${JSON.stringify(id)}) && S.finished.includes(${JSON.stringify(id)}) && likesArticle(${JSON.stringify(id)}) && S.readPos[${JSON.stringify(id)}].y===444`));
renderedClick(sheetHTML,'collection-toggle',shelf1);
ok('移出一个书架不影响另一个',ctx(`!collectionById(${JSON.stringify(shelf1)}).articleIds.includes(${JSON.stringify(id)}) && collectionById(${JSON.stringify(shelf2)}).articleIds.includes(${JSON.stringify(id)})`));
renderedClick(sheetHTML,'collection-create');
submitName('灵感');
ok('从文章新建书架会同时收好文章',ctx(`S.collections[0].name==='灵感' && S.collections[0].articleIds.includes(${JSON.stringify(id)})`));

console.log('\n[3] 书架内连读与原路返回');
ctx(`collectionById(${JSON.stringify(shelf1)}).articleIds=${JSON.stringify([id3,id2,id])};`);
click({tab:'me'});
renderedClick(screenEl.innerHTML,'open-collections');
renderedClick(screenEl.innerHTML,'open-collection',shelf1);
scrollEl.scrollTop=210;
click({article:id3});
eq('进入正文仍按该书架的自选顺序',Array.from(ctx('listContext().map(a=>a.id)')),[id3,id2,id]);
click({act:'next-article'});
eq('下一篇跟随书架顺序',ctx('activeArticle.id'),id2);
click({act:'go-back'});
eq('返回原书架',ctx('collectionId'),shelf1);
eq('恢复书架滚动位置',scrollEl.scrollTop,210);
eq('恢复书架视图',ctx('view.name'),'collections');
click({act:'go-back'});
eq('再返回书架总览',ctx('collectionId'),'');
click({act:'go-back'});
eq('最终回到原来的我的页',ctx('view.name'),'me');

console.log('\n[4] 删除确认只移除分组');
click({act:'open-collections'});
click({act:'open-collection',id:shelf2});
renderedClick(screenEl.innerHTML,'collection-delete');
ok('删除前显示明确确认',sheetHTML.includes('collection-delete-confirm') && sheetHTML.includes('阅读进度、生词和喜欢标记都会保留'));
ok('打开确认未删除',ctx(`!!collectionById(${JSON.stringify(shelf2)})`));
const beforeDeleteDepth=ctx('navStack.length'), beforeDeleteBacks=historyBacks;
renderedClick(sheetHTML,'collection-delete-confirm',shelf2);
ok('确认后仅删除选中书架',ctx(`!collectionById(${JSON.stringify(shelf2)}) && !!collectionById(${JSON.stringify(shelf1)})`));
ok('删除后阅读状态仍保留',ctx(`S.finished.includes(${JSON.stringify(id)}) && likesArticle(${JSON.stringify(id)}) && S.readPos[${JSON.stringify(id)}].y===444`));
eq('删除当前书架消费详情导航层',ctx('navStack.length'),beforeDeleteDepth-1);
eq('删除当前书架同步浏览器后退',historyBacks,beforeDeleteBacks+1);
click({act:'go-back'});
eq('删除后总览只需返回一次就回到我的',ctx('view.name'),'me');

console.log('\n[5] 固定摄影、重启恢复、随机展示');
click({tab:'home'});
const photo=ctx('pickEditorialLead()');
renderedClick(screenEl.innerHTML,'cover-fixed');
eq('固定当前精确摄影键',ctx('S.leadPhotoKey'),photo.key);
ctx('leadPhotoPinned=null;');
eq('新会话仍显示固定照片',ctx('pickEditorialLead().img'),photo.img);
eq('标题跳转仍是这张摄影所属文章',ctx('pickEditorialLead().a.id'),photo.a.id);
eq('摄影署名保留',ctx('pickEditorialLead().credit'),photo.credit);
renderedClick(screenEl.innerHTML,'cover-random');
eq('随机模式清除固定设置',ctx('S.leadPhotoKey'),'');
ok('主动换成池内另一张',ctx('pickEditorialLead().key')!==photo.key);
const randomKey=ctx('pickEditorialLead().key');
ctx('render();render();');
eq('普通重绘不改变随机照片',ctx('pickEditorialLead().key'),randomKey);
renderedClick(screenEl.innerHTML,'cover-next');
ok('换一张立即生效',ctx('pickEditorialLead().key')!==randomKey);

console.log('\n[6] 新旧备份与损坏数据');
ctx('validateBackupState(S); var copy=normalizeState(JSON.parse(JSON.stringify(S)));');
eq('备份往返保留书架数据',JSON.stringify(ctx('copy.collections')),JSON.stringify(ctx('S.collections')));
ok('旧备份能补齐空书架与随机封面',ctx('normalizeState({read:[]}).collections.length===0 && normalizeState({read:[]}).leadPhotoKey===""'));
ctx('validateBackupState({read:[]});');
for (const bad of [{collections:{}},{collections:[{id:'ok',name:' ',articleIds:[]}]},{collections:[{id:'ok',name:'a',articleIds:'bad'}]},{collections:[{id:'bad/id',name:'a',articleIds:[]}]},{leadPhotoKey:'../x'}]) {
  let rejected=false;
  try { ctx(`validateBackupState(${JSON.stringify({read:[],...bad})})`); } catch { rejected=true; }
  ok('拒绝损坏书架/封面备份',rejected);
}
ctx(`var cleaned=normalizeState({collections:[{id:'ok',name:' A ',articleIds:['one','one',3,null,'']},{id:'ok',name:'dup',articleIds:[]},{id:'different',name:'a',articleIds:[]}],read:['old'],finished:['old']});`);
eq('存储清洗去重且保留旧阅读状态',JSON.stringify(ctx('[cleaned.collections,cleaned.read,cleaned.finished]')),JSON.stringify([[{id:'ok',name:'A',articleIds:['one'],createdAt:0}],['old'],['old']]));
ctx('S.leadPhotoKey="removed-photo";leadPhotoPinned=null;');
ok('已下架固定照片有有效随机回退',!!ctx('pickEditorialLead()'));

console.log('\n[7] 存储失败保留书架、输入和原生镜像');
ctx(`S=normalizeState({collections:[{id:'safe',name:'保留的书架',articleIds:[${JSON.stringify(id)}],createdAt:1}]});leadPhotoPinned=null;save();`);
click({tab:'home'});
let nativeSaved = null;
sandbox.window.WORDLENS_NATIVE = true;
sandbox.window.UserState = { loadState: () => '', saveState: json => { nativeSaved = JSON.parse(json); } };
const nativeCollectionsOK = () => JSON.stringify(nativeSaved.collections) === ctx('JSON.stringify(S.collections)');
const write = sandbox.localStorage.setItem;
sandbox.localStorage.setItem = () => { throw new Error('QuotaExceededError'); };
renderedClick(screenEl.innerHTML,'open-collections');
renderedClick(screenEl.innerHTML,'collection-create');
submitName('未保存的新书架');
eq('失败的新建没有留在内存',ctx('S.collections.length'),1);
eq('失败的新建保留名称输入',nameInput.value,'未保存的新书架');
ok('失败的新建恢复原生镜像',nativeCollectionsOK());
click({act:'collection-rename',id:'safe'});
submitName('未保存的新名字');
eq('失败的改名恢复旧名字',ctx('S.collections[0].name'),'保留的书架');
eq('失败的改名保留输入',nameInput.value,'未保存的新名字');
ok('失败的改名恢复原生镜像',nativeCollectionsOK());
click({act:'article-collections',id});
renderedClick(sheetHTML,'collection-toggle','safe');
ok('失败的移出保留原有归属',ctx(`S.collections[0].articleIds.includes(${JSON.stringify(id)})`));
click({act:'article-collections',id:id2});
renderedClick(sheetHTML,'collection-toggle','safe');
ok('失败的加入不产生假归属',!ctx(`S.collections[0].articleIds.includes(${JSON.stringify(id2)})`));
ok('失败的归属变更恢复原生镜像',nativeCollectionsOK());
click({act:'open-collection',id:'safe'});
renderedClick(screenEl.innerHTML,'collection-delete');
const failedDeleteDepth=ctx('navStack.length');
renderedClick(sheetHTML,'collection-delete-confirm','safe');
ok('失败的删除保留书架和确认层',ctx('S.collections.length===1') && sheetHTML.includes('collection-delete-confirm'));
eq('失败的删除不改变导航',ctx('navStack.length'),failedDeleteDepth);
ok('失败的删除恢复原生镜像',nativeCollectionsOK());
click({tab:'home'});
const beforeFailedPhoto=ctx('pickEditorialLead().key');
renderedClick(screenEl.innerHTML,'cover-fixed');
eq('失败的固定不改变偏好',ctx('S.leadPhotoKey'),'');
eq('失败的固定恢复原生偏好',nativeSaved.leadPhotoKey,'');
ctx('S.leadPhotoKey=pickEditorialLead().key;');
renderedClick(screenEl.innerHTML,'cover-random');
eq('失败的随机切换保持固定偏好',ctx('S.leadPhotoKey'),beforeFailedPhoto);
eq('失败的随机切换保持当前摄影',ctx('pickEditorialLead().key'),beforeFailedPhoto);
eq('失败的随机切换恢复原生偏好',nativeSaved.leadPhotoKey,beforeFailedPhoto);
sandbox.localStorage.setItem = write;
sandbox.window.WORDLENS_NATIVE = false;
ctx('validateBackupState(S);');
console.log(`\n结果：${pass} 通过 / ${fail} 失败`);
process.exit(fail ? 1 : 0);

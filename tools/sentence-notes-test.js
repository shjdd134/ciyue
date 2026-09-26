/* 句子收藏回归：真实 app.js + 事件委托，覆盖双语快照、坐标、持久化、编辑与返回原文。 */
const vm = require('vm');
const fs = require('fs');
const path = require('path');
const assert = require('assert/strict');
const base = path.resolve(__dirname, '..');
const noop = () => {};
const handlers = {};
const listen = (t, fn) => (handlers[t] ||= []).push(fn);
const screen = { innerHTML: '', className: '', style: {} };
let sheetHTML = '', thoughtInput = null, currentRead = null;
const phone = { style: {}, appendChild: noop, insertAdjacentHTML: (_, html) => { sheetHTML = html; } };
const sandbox = {
  console, window: { addEventListener: listen, removeEventListener: noop },
  document: {
    documentElement: { setAttribute: noop }, addEventListener: listen, removeEventListener: noop,
    querySelector: s => s === '#screen' ? screen : s === '.phone' ? phone : s === '#quote-thought' ? thoughtInput : s === '#read-scroll' ? currentRead : null,
    querySelectorAll: () => [],
    createElement: () => ({ classList: { add: noop, remove: noop }, style: {}, remove: noop, appendChild: noop })
  },
  localStorage: { _d: {}, getItem(k) { return this._d[k] || null; }, setItem(k, v) { this._d[k] = v; } },
  SpeechSynthesisUtterance: function() {}, speechSynthesis: { cancel: noop, speak: noop },
  setTimeout: () => 0, clearTimeout: noop, setInterval: () => 0, clearInterval: noop,
  requestAnimationFrame: fn => fn()
};
sandbox.window.window = sandbox.window;
vm.createContext(sandbox);
for (const f of ['data', 'data-words-bulk-a', 'data-words-full', 'data-words-mid', 'data-articles-extra', 'data-articles-archive', 'data-covers', 'data-examples', 'data-ecdict', 'data-tapdict', 'data-wordfreq']) {
  const file = path.join(base, 'assets', f + '.js');
  if (fs.existsSync(file)) vm.runInContext(fs.readFileSync(file, 'utf8'), sandbox);
}
vm.runInContext('var WORD_META = window.WORD_META, TAPDICT = window.TAPDICT, TAP_REVERSE = window.TAP_REVERSE, COMMON_WORDS = window.COMMON_WORDS;', sandbox);
vm.runInContext(fs.readFileSync(path.join(base, 'assets/app.js'), 'utf8'), sandbox);
const run = code => vm.runInContext(code, sandbox);
const json = code => JSON.parse(run(`JSON.stringify(${code})`));
const click = dataset => (handlers.click || []).forEach(fn => fn({
  target: { closest: () => ({ dataset, classList: { contains: () => false, add: noop, remove: noop } }) }, stopPropagation: noop
}));
let passed = 0;
function test(name, fn) { fn(); passed++; console.log('✓ ' + name); }
run(`
  var quoteFixture = { id: 'notes-fixture', title: 'A <personal> article', paras: [
    { en: 'This is an old format sentence.', cn: '旧格式对应的译文。' },
    { sentences: [{ en: 'First ordinary sentence.', cn: '第一句。' }, { en: 'This sentence has several words. Another sentence has several words.', cn: '这是同一个元素的完整译文。' }] },
    { en: 'A legacy paragraph first sentence. The legacy paragraph second sentence.', cn: '退化段完整译文。' },
    { img: 'cover.jpg', cap: 'Photo caption' }
  ] };
  ARTICLES.push(quoteFixture);
`);
test('旧备份迁移补空收藏，不改变已有生词', () => {
  assert.deepEqual(json('normalizeState({notebook:["apple"]}).sentenceNotes'), []);
  assert.equal(run('normalizeState({notebook:["apple"]}).notebook[0].word'), 'apple');
});
test('旧格式保存英文、译文及文章标题', () => {
  run('var oldNote = makeSentenceNote(quoteFixture, 0, 0, 0)');
  assert.equal(run('oldNote.en'), 'This is an old format sentence.');
  assert.equal(run('oldNote.cn'), '旧格式对应的译文。');
  assert.equal(run('oldNote.articleTitle'), 'A <personal> article');
});
test('普通段内被拆分元素按 si 与 rs 精确收藏', () => {
  run('var splitNote = makeSentenceNote(quoteFixture, 1, 1, 1)');
  assert.deepEqual(json('[splitNote.pi,splitNote.si,splitNote.rs,splitNote.en,splitNote.cn]'), [1, 1, 1, 'Another sentence has several words.', '这是同一个元素的完整译文。']);
});
test('旧段落渲染切句只保存选中的一句，不吞整段', () => {
  assert.equal(run('makeSentenceNote(quoteFixture,2,0,1).en'), 'The legacy paragraph second sentence.');
  assert.equal(run('makeSentenceNote(quoteFixture,2,0,1).cn'), '退化段完整译文。');
});
test('无效坐标及图片不误收藏邻句', () => {
  assert.equal(run('makeSentenceNote(quoteFixture,1,99,0)'), null);
  assert.equal(run('makeSentenceNote(quoteFixture,3,0,0)'), null);
  assert.equal(run('makeSentenceNote(quoteFixture,1,-1,0)'), null);
});
test('正文提供仅选中时显示的收藏动作', () => {
  run('activeArticle=ARTICLES[0]');
  assert.match(run('renderRead()'), /class="para-note"[^>]*data-act="quote-capture"/);
  const css = fs.readFileSync(path.join(base, 'assets/styles.css'), 'utf8');
  assert.match(css, /\.para-note\s*\{[^}]*display:\s*none/s);
  assert.match(css, /\.sentence\.sel\s*>\s*\.para-note\s*\{\s*display:\s*inline-flex/);
});
test('点收藏只打开带可选感想的编辑器，取消不产生记录', () => {
  run('view={name:"read"};activeArticle=quoteFixture');
  click({ act: 'quote-capture', pi: '1', si: '1', rs: '1' });
  assert.match(sheetHTML, /textarea[^>]*id="quote-thought"/);
  assert.equal(run('S.sentenceNotes.length'), 0);
  click({ act: 'quote-cancel' });
  assert.equal(run('sentenceNoteDraft'), null);
  assert.equal(run('S.sentenceNotes.length'), 0);
});
test('空感想可保存，重新收藏去重并保持 ID', () => {
  thoughtInput = { value: '' };
  click({ act: 'quote-capture', pi: '1', si: '1', rs: '1' });
  click({ act: 'quote-save' });
  const id = run('S.sentenceNotes[0].id');
  click({ act: 'quote-capture', pi: '1', si: '1', rs: '1' });
  click({ act: 'quote-save' });
  assert.equal(run('S.sentenceNotes.length'), 1);
  assert.equal(run('S.sentenceNotes[0].id'), id);
  assert.equal(JSON.parse(sandbox.localStorage._d['wordlens.v1']).sentenceNotes[0].id, id);
});
test('编辑感想保持快照，取消不覆盖原感想', () => {
  const id = run('S.sentenceNotes[0].id');
  click({ act: 'quote-edit', id });
  thoughtInput.value = '想到自己的项目。\n明天再读一次。';
  click({ act: 'quote-save' });
  assert.equal(run('S.sentenceNotes[0].thought'), thoughtInput.value);
  assert.equal(run('S.sentenceNotes[0].en'), 'Another sentence has several words.');
  click({ act: 'quote-edit', id });
  thoughtInput.value = '不应保存的草稿';
  click({ act: 'quote-cancel' });
  assert.equal(run('S.sentenceNotes[0].thought'), '想到自己的项目。\n明天再读一次。');
});
test('感想和双语快照输出经过 HTML 转义', () => {
  run('var unsafeQuote={...oldNote,en:"<img src=x onerror=alert(1)>",cn:"<script>bad</script>",thought:"</textarea><script>bad</script>"};S.sentenceNotes=[unsafeQuote]');
  const html = run('renderSentenceNotes()');
  assert.ok(html.includes('&lt;img'));
  assert.ok(!html.includes('<script>'));
  assert.ok(run('renderSentenceNoteEditor(unsafeQuote,true)').includes('&lt;/textarea&gt;'));
});
test('我的页面到收藏列表并返回，底部导航保持我的', () => {
  click({ tab: 'me' });
  assert.match(screen.innerHTML, /打开句子与感想/);
  click({ act: 'open-sentence-notes' });
  assert.equal(run('view.name'), 'notes');
  assert.match(screen.innerHTML, /data-tab="me" class="on"/);
  click({ act: 'go-back' });
  assert.equal(run('view.name'), 'me');
});
test('归档文章收藏仍可读，返回按钮禁用', () => {
  run('S.sentenceNotes=[{...oldNote,articleId:"no-longer-available"}]');
  const html = run('renderSentenceNotes()');
  assert.ok(html.includes('This is an old format sentence.'));
  assert.match(html, /data-act="quote-open"[^>]*disabled/);
  assert.ok(html.includes('原文暂不可用'));
  assert.equal(run('openSavedSentenceNote(S.sentenceNotes[0])'), false);
});
test('备份往返完整保留双语、感想、ID、锚点及归档句子', () => {
  run('S.sentenceNotes=[{...splitNote,thought:"Keep this thought"},{...oldNote,articleId:"archived"}];validateBackupState(S);var roundtrip=normalizeState(JSON.parse(JSON.stringify(S)))');
  assert.deepEqual(json('roundtrip.sentenceNotes'), json('S.sentenceNotes'));
});
test('备份拒绝异常类型与负数锚点，迁移丢弃坏项并去重', () => {
  assert.throws(() => run('validateBackupState({sentenceNotes:[{...oldNote,thought:{html:"bad"}}]})'));
  assert.throws(() => run('validateBackupState({sentenceNotes:[{...oldNote,pi:-1}]})'));
  assert.throws(() => run('validateBackupState({sentenceNotes:[oldNote,oldNote]})'));
  assert.equal(run('normalizeState({sentenceNotes:[null,oldNote,{...oldNote,id:"another-id"}]}).sentenceNotes.length'), 1);
});
test('文章段落移动时用快照重新定位，原句删除则不误跳', () => {
  assert.deepEqual(json('sentenceNoteAnchor(oldNote,{paras:[{en:"An inserted sentence."},...quoteFixture.paras]})'), { pi: 1, si: 0, rs: 0, off: 80 });
  assert.equal(run('sentenceNoteAnchor(oldNote,{paras:[{en:"Different sentence."}]})'), null);
});
test('返回原文交给统一打开逻辑，并先展开译文再定位', () => {
  const classes = new Set();
  const selected = { classList: { add: cls => classes.add(cls), remove: cls => classes.delete(cls) }, getBoundingClientRect: () => ({ top: 280 }) };
  currentRead = { querySelector: sel => sel.includes('data-pi="1"') ? selected : null, getBoundingClientRect: () => ({ top: 0 }), scrollTop: 0, dataset: { art: 'notes-fixture' }, scrollHeight: 0, clientHeight: 600 };
  run('var openRecorded;openReadingArticle=function(id,options){openRecorded={id,options};activeArticle=quoteFixture};S.cnMode="tap"');
  assert.equal(run('openSavedSentenceNote(splitNote)'), true);
  assert.deepEqual(json('openRecorded'), { id: 'notes-fixture', options: { anchor: { pi: 1, si: 1, rs: 1, off: 80 } } });
  assert.ok(classes.has('sel') && classes.has('peek'));
  assert.equal(currentRead.scrollTop, 200);
  classes.clear(); run('S.cnMode="off";openSavedSentenceNote(splitNote)');
  assert.ok(classes.has('sel') && !classes.has('peek'));
  currentRead = null;
});
test('未拆分句没有 data-rs 时仍能恢复选中', () => {
  const marker = {};
  sandbox.testCont = { querySelector: s => s.endsWith(':not([data-rs])') ? marker : null };
  assert.equal(run('findSentenceElement(testCont,{pi:0,si:0,rs:0})'), marker);
  assert.equal(run('findSentenceElement(testCont,{pi:0,si:0,rs:1})'), null);
});
test('删除先确认，取消保留，确认才持久化', () => {
  run('S.sentenceNotes=[oldNote];view={name:"notes"}');
  const id = run('oldNote.id');
  click({ act: 'quote-delete', id });
  assert.match(sheetHTML, /删除这条收藏？/);
  assert.equal(run('S.sentenceNotes.length'), 1);
  click({ act: 'close-sheet' });
  assert.equal(run('S.sentenceNotes.length'), 1);
  click({ act: 'quote-delete', id }); click({ act: 'quote-delete-confirm', id });
  assert.equal(run('S.sentenceNotes.length'), 0);
  assert.deepEqual(JSON.parse(sandbox.localStorage._d['wordlens.v1']).sentenceNotes, []);
});
test('写入失败保留编辑框与草稿，不能提示成功并关闭', () => {
  run('S.sentenceNotes=[];view={name:"read"};activeArticle=quoteFixture');
  click({ act: 'quote-capture', pi: '0', si: '0', rs: '0' });
  thoughtInput.value = '还在这里';
  const original = sandbox.localStorage.setItem;
  const mirrored = [];
  sandbox.window.WORDLENS_NATIVE = true;
  sandbox.window.UserState = { saveState: data => mirrored.push(JSON.parse(data)), loadState: () => '' };
  sandbox.localStorage.setItem = () => { throw new Error('QuotaExceeded'); };
  click({ act: 'quote-save' });
  assert.notEqual(run('sentenceNoteDraft'), null);
  assert.equal(thoughtInput.value, '还在这里');
  assert.equal(run('S.sentenceNotes.length'), 0);
  assert.deepEqual(mirrored.at(-1).sentenceNotes, [], '保存失败后原生镜像也回滚，不能复活未提交收藏');
  sandbox.localStorage.setItem = original;
  click({ act: 'quote-save' });
  assert.equal(run('S.sentenceNotes[0].thought'), '还在这里');
  assert.equal(mirrored.at(-1).sentenceNotes[0].thought, '还在这里');
  sandbox.window.WORDLENS_NATIVE = false; delete sandbox.window.UserState;
});

test('删除失败同时恢复内存与原生镜像的旧收藏', () => {
  run('S.sentenceNotes=[oldNote];view={name:"notes"}');
  const original = sandbox.localStorage.setItem;
  const mirrored = [];
  sandbox.window.WORDLENS_NATIVE = true;
  sandbox.window.UserState = { saveState: data => mirrored.push(JSON.parse(data)), loadState: () => '' };
  sandbox.localStorage.setItem = () => { throw new Error('QuotaExceeded'); };
  click({ act: 'quote-delete-confirm', id: run('oldNote.id') });
  assert.deepEqual(json('S.sentenceNotes'), json('[oldNote]'));
  assert.deepEqual(mirrored.at(-1).sentenceNotes, json('[oldNote]'));
  sandbox.localStorage.setItem = original;
  sandbox.window.WORDLENS_NATIVE = false; delete sandbox.window.UserState;
});

/* 真正走 ensureTapdict 的 script.onload → Promise.then 路径。
 * 只替换 DOM 与网络加载，保留 ensureTapdict/render/缓存刷新本身，避免测试复制守卫实现。 */
(async () => {
  const originalQuery = sandbox.document.querySelector;
  const originalQueryAll = sandbox.document.querySelectorAll;
  const originalCreate = sandbox.document.createElement;
  let collectionNameInput = null, pendingScript = null, removedEditors = 0;
  sandbox.document.head = { appendChild: script => { pendingScript = script; } };
  sandbox.document.createElement = tag => tag === 'script' ? { dataset: {}, remove: noop } : originalCreate(tag);
  sandbox.document.querySelector = selector => selector === '#collection-name' ? collectionNameInput : originalQuery(selector);
  sandbox.document.querySelectorAll = selector => selector.includes('.sheet') && (thoughtInput || collectionNameInput)
    ? [{ remove: () => { removedEditors++; thoughtInput = null; collectionNameInput = null; sheetHTML = ''; } }]
    : originalQueryAll(selector);

  const beginLoading = () => {
    thoughtInput = null; collectionNameInput = null; pendingScript = null; removedEditors = 0;
    currentRead = null;
    run('view={name:"read"};activeArticle=quoteFixture;TAP=null;TAPR=null;tapLoadStarted=false;tapLoadPromise=null;render()');
    assert.ok(pendingScript && typeof pendingScript.onload === 'function', '实际渲染应发起词典 script 加载');
    run('STATS_CACHE.set("async-editor-probe", { temporary:true })');
  };
  const finishLoading = async () => {
    const promise = run('tapLoadPromise');
    pendingScript.onload();
    assert.equal(await promise, true);
    assert.equal(run('STATS_CACHE.has("async-editor-probe")'), false, '保留编辑框时也必须刷新词典相关缓存');
  };

  beginLoading();
  click({ act: 'quote-capture', pi: '0', si: '0', rs: '0' });
  thoughtInput = { value: '正在写，还没有保存的感想。' };
  const originalThoughtInput = thoughtInput;
  const quoteSheet = sheetHTML;
  await finishLoading();
  test('词典异步到达保留句子感想编辑框及未保存文字', () => {
    assert.equal(removedEditors, 0);
    assert.equal(thoughtInput, originalThoughtInput);
    assert.equal(thoughtInput.value, '正在写，还没有保存的感想。');
    assert.equal(sheetHTML, quoteSheet);
    click({ act: 'quote-save' });
    assert.equal(run('S.sentenceNotes.find(n=>n.id===oldNote.id).thought'), '正在写，还没有保存的感想。');
  });

  beginLoading();
  click({ act: 'collection-create', item: run('quoteFixture.id') });
  collectionNameInput = { value: '正在起名字的书架' };
  const originalNameInput = collectionNameInput;
  const collectionSheet = sheetHTML;
  await finishLoading();
  test('词典异步到达也保留新书架名称输入', () => {
    assert.equal(removedEditors, 0);
    assert.equal(collectionNameInput, originalNameInput);
    assert.equal(collectionNameInput.value, '正在起名字的书架');
    assert.equal(sheetHTML, collectionSheet);
    assert.match(sheetHTML, /id="collection-name"/);
  });

  beginLoading();
  screen.innerHTML = 'loading-sentinel';
  await finishLoading();
  test('没有编辑表单时词典异步到达仍重绘正文', () => {
    assert.notEqual(screen.innerHTML, 'loading-sentinel');
    assert.ok(screen.innerHTML.includes('id="read-body"'));
    assert.equal(run('view.name'), 'read');
  });

  sandbox.document.querySelector = originalQuery;
  sandbox.document.querySelectorAll = originalQueryAll;
  sandbox.document.createElement = originalCreate;
  delete sandbox.document.head;
  console.log(`\n${passed} sentence note checks passed.`);
})().catch(error => { console.error(error); process.exitCode = 1; });

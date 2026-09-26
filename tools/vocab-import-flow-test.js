/* 文档词库导入的 UI / 异步生命周期回归。
 * 使用真实 app.js、事件委托、草稿解析和落盘；仅替换文档 reader，
 * 真实 DOCX / PDF / OCR 解析另由对应 importer 测试覆盖。
 * 运行：node tools/vocab-import-flow-test.js */
const vm = require('vm');
const fs = require('fs');
const path = require('path');
const assert = require('assert/strict');
const base = path.resolve(__dirname, '..');
const noop = () => {};

function deferred() {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}
function node(extra = {}) {
  const handlers = {};
  return Object.assign({
    dataset: {}, style: {}, value: '', textContent: '', innerHTML: '', checked: false,
    classList: { add: noop, remove: noop, toggle: noop, contains: () => false },
    closest: () => null, appendChild: noop, insertAdjacentHTML: noop,
    focus: noop, setSelectionRange: noop, remove: noop,
    addEventListener: (type, fn) => (handlers[type] ||= []).push(fn),
    fire(type) { (handlers[type] || []).forEach(fn => fn({ target: this })); },
  }, extra);
}
const decode = value => value.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');

function boot() {
  const handlers = {}, swHandlers = {}, store = {}, session = {}, reads = [];
  const timers = new Map();
  let timerClock = 0, timerId = 0, reloads = 0;
  const listen = (type, fn) => (handlers[type] ||= []).push(fn);
  const fileInput = node({ files: [], click() { this.clicks = (this.clicks || 0) + 1; } });
  const phone = node();
  let markup = '', writes = 0, nodes = {};
  const screen = node();
  Object.defineProperty(screen, 'innerHTML', {
    get: () => markup,
    set(value) {
      markup = value; writes++; nodes = {};
      // 重渲染确实重建节点，避免旧 listener 累积掩盖真实行为。
      for (const id of ['cv-ta', 'cv-ocr', 'cv-import-status', 'cv-stats', 'cv-q']) {
        const opening = value.match(new RegExp('<[a-z]+[^>]*\\bid="' + id + '"[^>]*>'));
        if (!opening) continue;
        nodes['#' + id] = node({ disabled: /\bdisabled\b/.test(opening[0]), checked: /\bchecked\b/.test(opening[0]) });
      }
      const ta = value.match(/<textarea\b[^>]*id="cv-ta"[^>]*>([\s\S]*?)<\/textarea>/);
      if (ta) nodes['#cv-ta'].value = decode(ta[1]);
      const status = value.match(/<div\b[^>]*id="cv-import-status"[^>]*>([\s\S]*?)<\/div>/);
      if (status) nodes['#cv-import-status'].textContent = decode(status[1]);
      const append = value.match(/<button\b[^>]*data-act="cv-append"[^>]*>([^<]*)<\/button>/);
      if (append) nodes['[data-act="cv-append"]'] = node({ disabled: /\bdisabled\b/.test(append[0]), textContent: append[1] });
    },
  });
  const reader = {
    readVocabFile(file, options) {
      const result = deferred(); reads.push({ file, options, ...result }); return result.promise;
    },
  };
  const sandbox = {
    console, AbortController,
    window: { addEventListener: listen, removeEventListener: noop },
    navigator: {
      userAgent: 'test browser',
      serviceWorker: { addEventListener: (type, fn) => (swHandlers[type] ||= []).push(fn), register: () => Promise.resolve({}) },
    },
    location: { protocol: 'https:', origin: 'https://local.invalid', pathname: '/ciyue/', href: 'https://local.invalid/ciyue/', search: '', reload: () => { reloads++; } },
    document: {
      documentElement: { setAttribute: noop }, addEventListener: listen, removeEventListener: noop,
      querySelector: selector => selector === '#screen' ? screen : selector === '.phone' ? phone : selector === '#cv-file-in' ? fileInput : nodes[selector] || null,
      querySelectorAll: () => [], createElement: () => node(),
    },
    localStorage: { getItem: key => store[key] || null, setItem: (key, value) => { store[key] = value; } },
    sessionStorage: { getItem: key => session[key] || null, setItem: (key, value) => { session[key] = value; } },
    SpeechSynthesisUtterance: function() {}, speechSynthesis: { cancel: noop, speak: noop },
    setTimeout: (fn, delay = 0) => { const id = ++timerId; timers.set(id, { fn, at: timerClock + delay }); return id; },
    clearTimeout: id => timers.delete(id), setInterval: () => 0, clearInterval: noop,
    requestAnimationFrame: fn => fn(), __getReader: () => Promise.resolve(reader),
  };
  sandbox.window.window = sandbox.window;
  vm.createContext(sandbox);
  const run = expression => vm.runInContext(expression, sandbox);
  for (const name of ['data', 'data-words-bulk-a', 'data-words-full', 'data-words-mid', 'data-words-cet4', 'data-articles-extra', 'data-articles-archive', 'data-covers', 'data-ecdict', 'data-tapdict', 'data-wordfreq']) {
    const file = path.join(base, 'assets', name + '.js');
    if (fs.existsSync(file)) vm.runInContext(fs.readFileSync(file, 'utf8'), sandbox, { filename: file });
  }
  run('var WORD_META=window.WORD_META,TAPDICT=window.TAPDICT,TAP_REVERSE=window.TAP_REVERSE,COMMON_WORDS=window.COMMON_WORDS;');
  vm.runInContext(fs.readFileSync(path.join(base, 'assets/app.js'), 'utf8'), sandbox, { filename: 'app.js' });
  run('loadVocabReader=()=>__getReader();');
  function click(dataset) {
    const target = node({ dataset });
    (handlers.click || []).forEach(fn => fn({ target: { closest: () => target }, detail: 0, stopPropagation: noop }));
  }
  function reset(draft = 'old-draft') {
    timers.clear(); timerClock = 0; reloads = 0;
    for (const key of Object.keys(session)) delete session[key];
    run(`cancelVocabImport('');pendingUpdate=false;S=normalizeState({customVocab:['apple','zebra'],known:['hello'],notebook:[{word:'world'}]});rebuildCustomSet();cvDraft=${JSON.stringify(draft)};cvImportOpen=true;cvArmedOver=false;cvImportWarnings=[];cvUseOcr=true;view={name:'customvocab'};render();`);
    sandbox.__getReader = () => Promise.resolve(reader);
  }
  function start(name = 'words.docx') {
    sandbox.__file = { name, size: 500, type: name.endsWith('.pdf') ? 'application/pdf' : '' };
    return run('importVocabFile(__file)');
  }
  function advance(ms) {
    const end = timerClock + ms;
    while (true) {
      const next = [...timers].filter(([, timer]) => timer.at <= end).sort((a, b) => a[1].at - b[1].at || a[0] - b[0])[0];
      if (!next) break;
      timers.delete(next[0]); timerClock = next[1].at; next[1].fn();
    }
    timerClock = end;
  }
  return { run, reset, start, reads, reader, sandbox, fileInput,
    action: act => click({ act }), tab: tab => click({ tab }), article: id => click({ article: id }), html: () => markup, writes: () => writes,
    swMessage: (data = { type: 'content-updated' }) => (swHandlers.message || []).forEach(fn => fn({ data })),
    swListeners: () => (swHandlers.message || []).length, advance, reloads: () => reloads,
    node: selector => nodes[selector], saved: () => JSON.parse(store['wordlens.v1'] || '{}'),
    vocab: () => JSON.parse(run('JSON.stringify(S.customVocab)')) };
}

const tick = async () => { await Promise.resolve(); await Promise.resolve(); await Promise.resolve(); };
const result = (text, extra = {}) => ({ text, kind: 'docx', isDocument: true, warnings: [], pages: 1, ...extra });
let passed = 0;
async function test(name, fn) { await fn(); passed++; console.log('✓ ' + name); }

(async () => {
  const app = boot();
  await test('Word 识别只填入可编辑草稿，确认前不改词库、已认识或生词本', async () => {
    app.reset();
    const old = app.run('JSON.stringify(S)');
    const done = app.start(); await tick();
    assert.equal(app.run('cvDraft'), 'old-draft');
    app.reads.at(-1).resolve(result('apple\nBANANA\nbanana\ncan\'t\n中文\n42'));
    await done;
    assert.equal(app.run('JSON.stringify(S)'), old);
    assert.equal(app.run('cvDraft'), "apple\nBANANA\nbanana\ncan't\n中文\n42");
    assert.equal(app.node('#cv-ta').value, app.run('cvDraft'));
    assert.match(app.node('#cv-import-status').textContent, /已读取「words.docx」.*1 页.*核对/);
    assert.equal(app.run('cvImportBusy'), false);
  });
  await test('追加遵循原去重、词形过滤、排序规则并实际落盘', () => {
    app.action('cv-append');
    assert.deepEqual(app.vocab(), ['apple', 'banana', "can't", 'zebra']);
    assert.deepEqual(app.saved().customVocab, app.vocab());
    assert.deepEqual(app.saved().known, ['hello']);
    assert.equal(app.saved().notebook[0].word, 'world');
    assert.equal(app.run('cvDraft'), '');
    assert.equal(app.run('cvImportOpen'), false);
  });
  await test('PDF 草稿可手动校对，输入仅局部刷新统计与追加按钮', async () => {
    app.reset(); const done = app.start('words.pdf'); await tick();
    app.reads.at(-1).resolve(result('wrong', { kind: 'pdf' })); await done;
    const writes = app.writes(), textarea = app.node('#cv-ta');
    textarea.value = 'orange orange apple 123 中文'; textarea.fire('input');
    assert.equal(app.run('cvDraft'), textarea.value);
    assert.equal(app.writes(), writes);
    assert.match(app.node('#cv-stats').innerHTML, /有效 <b>1<\/b>/);
    assert.equal(app.node('[data-act="cv-append"]').textContent, '追加导入（+1）');
  });
  await test('覆盖须真实点击两次，第一击保留原词库，第二击按同一规则写入', () => {
    app.action('cv-overwrite');
    assert.deepEqual(app.vocab(), ['apple', 'zebra']);
    assert.equal(app.run('cvArmedOver'), true);
    assert.match(app.html(), /再点一次：清空现有 2 词，写入 2 词/);
    app.action('cv-overwrite');
    assert.deepEqual(app.vocab(), ['apple', 'orange']);
    assert.deepEqual(app.saved().customVocab, ['apple', 'orange']);
  });
  await test('空或无效草稿不会覆盖现有词库', () => {
    app.reset('中文 123 ! a'); app.action('cv-overwrite'); app.action('cv-overwrite');
    assert.deepEqual(app.vocab(), ['apple', 'zebra']);
    assert.equal(app.run('cvArmedOver'), false);
  });
  await test('读取中禁用草稿、OCR、追加、覆盖，陈旧点击与输入也不能写库', async () => {
    app.reset('banana'); const done = app.start(); await tick();
    const request = app.reads.at(-1);
    assert.equal(app.node('#cv-ta').disabled, true);
    assert.equal(app.node('#cv-ocr').disabled, true);
    assert.match(app.html(), /data-act="cv-append"[^>]* disabled/);
    assert.match(app.html(), /data-act="cv-overwrite"[^>]* disabled/);
    app.node('#cv-ta').value = 'corruption'; app.node('#cv-ta').fire('input');
    app.action('cv-append'); app.action('cv-overwrite'); app.action('cv-overwrite');
    assert.equal(app.run('cvDraft'), 'banana');
    assert.equal(app.run('cvArmedOver'), false);
    assert.deepEqual(app.vocab(), ['apple', 'zebra']);
    app.action('cv-cancel-import'); request.resolve(result('late')); await done;
  });
  await test('PDF / OCR 进度原地更新，不整页重绘或丢掉草稿', async () => {
    app.reset('banana'); const done = app.start('words.pdf'); await tick();
    const request = app.reads.at(-1), writes = app.writes(), textarea = app.node('#cv-ta');
    request.options.onProgress({ stage: 'pdf', pageNumber: 2, totalPages: 5 });
    assert.equal(app.node('#cv-import-status').textContent, '正在读取 PDF · 第 2 / 5 页');
    request.options.onProgress({ stage: 'ocr', pageNumber: 3, totalPages: 5, status: 'recognizing text', progress: 0.427 });
    assert.match(app.node('#cv-import-status').textContent, /第 3 \/ 5 页 · 43%/);
    assert.equal(app.writes(), writes);
    assert.equal(app.node('#cv-ta'), textarea);
    assert.equal(app.run('cvDraft'), 'banana');
    request.resolve(result('new')); await done;
  });
  await test('OCR 选项的真实 change 决定 reader 参数，读取中无法改选项', async () => {
    app.reset(); app.node('#cv-ocr').checked = false; app.node('#cv-ocr').fire('change');
    const done = app.start('scan.pdf'); await tick(); const request = app.reads.at(-1);
    assert.equal(request.options.ocr, false);
    app.node('#cv-ocr').checked = true; app.node('#cv-ocr').fire('change');
    assert.equal(app.run('cvUseOcr'), false);
    request.resolve(result('apple', { kind: 'pdf' })); await done;
    app.node('#cv-ocr').checked = true; app.node('#cv-ocr').fire('change');
    const next = app.start('scan.pdf'); await tick();
    assert.equal(app.reads.at(-1).options.ocr, true);
    app.reads.at(-1).resolve(result('banana')); await next;
  });
  await test('取消会 abort；迟到进度与结果不能覆盖旧草稿或刷新页面', async () => {
    app.reset(); const done = app.start(); await tick(); const request = app.reads.at(-1);
    app.action('cv-cancel-import'); const writes = app.writes(), message = app.node('#cv-import-status').textContent;
    assert.equal(request.options.signal.aborted, true);
    assert.equal(app.run('cvImportBusy'), false);
    assert.match(message, /已取消识别/);
    request.options.onProgress({ stage: 'ocr', progress: 1 }); request.resolve(result('late'));
    await done;
    assert.equal(app.run('cvDraft'), 'old-draft');
    assert.deepEqual(app.vocab(), ['apple', 'zebra']);
    assert.equal(app.node('#cv-import-status').textContent, message);
    assert.equal(app.writes(), writes);
  });
  await test('离开词库页面立即 abort，迟到结果不跳回页面或污染草稿', async () => {
    app.reset(); const done = app.start(); await tick(); const request = app.reads.at(-1);
    app.tab('me'); const writes = app.writes();
    assert.equal(request.options.signal.aborted, true);
    request.resolve(result('late')); await done;
    assert.equal(app.run('view.name'), 'me');
    assert.equal(app.run('cvDraft'), 'old-draft');
    assert.equal(app.writes(), writes);
  });
  await test('连续选文件取消前一份，先后结果交错只保留新文件', async () => {
    app.reset(); const first = app.start('first.docx'); await tick(); const old = app.reads.at(-1);
    const second = app.start('second.pdf'); await tick(); const current = app.reads.at(-1);
    assert.equal(old.options.signal.aborted, true);
    assert.notEqual(old.options.signal, current.options.signal);
    old.options.onProgress({ stage: 'docx' });
    assert.match(app.run('cvImportMessage'), /second.pdf/);
    current.resolve(result('current', { kind: 'pdf' })); await second;
    const writes = app.writes(); old.resolve(result('outdated', { warnings: ['old warning'] })); await first;
    assert.equal(app.run('cvDraft'), 'current');
    assert.equal(app.run('cvImportWarnings.length'), 0);
    assert.match(app.run('cvImportMessage'), /second.pdf/);
    assert.equal(app.writes(), writes);
  });
  await test('组件仍在加载时取消，不启动后续文件解析', async () => {
    app.reset(); const loading = deferred(), count = app.reads.length;
    app.sandbox.__getReader = () => loading.promise;
    const done = app.start(); app.action('cv-cancel-import');
    loading.resolve(app.reader); await done;
    assert.equal(app.reads.length, count);
    assert.equal(app.run('cvDraft'), 'old-draft');
  });
  await test('收起导入也取消正在读取的文件，保持草稿可稍后继续', async () => {
    app.reset(); const done = app.start(); await tick(); const request = app.reads.at(-1);
    app.action('cv-toggle-import');
    assert.equal(request.options.signal.aborted, true);
    assert.equal(app.run('cvImportOpen'), false);
    request.resolve(result('late')); await done;
    app.action('cv-toggle-import');
    assert.equal(app.node('#cv-ta').value, 'old-draft');
  });
  for (const [name, message, expected] of [
    ['旧版 .doc', '旧版 .doc 暂不支持，请另存为 .docx。', /旧版 \.doc/],
    ['损坏 Word', 'Word 文件损坏，无法读取。', /Word 文件损坏/],
    ['加密 PDF', 'PDF 需要密码，请先解密后重试。', /PDF 需要密码/],
    ['未知解析错误', 'Unexpected EOF', /文件读取失败.*损坏或加密/],
  ]) {
    await test(name + '显示可读错误，保留旧草稿和现有词库', async () => {
      app.reset(); const done = app.start('broken' + (name.includes('PDF') ? '.pdf' : '.doc')); await tick();
      app.reads.at(-1).reject(new Error(message)); await done;
      assert.equal(app.run('cvDraft'), 'old-draft');
      assert.deepEqual(app.vocab(), ['apple', 'zebra']);
      assert.equal(app.run('cvImportBusy'), false);
      assert.equal(app.node('#cv-ta').disabled, false);
      assert.match(app.node('#cv-import-status').textContent, expected);
    });
  }
  await test('组件加载失败也保留草稿，恢复可再次选文件', async () => {
    app.reset(); app.sandbox.__getReader = () => Promise.reject(new Error('文档识别组件加载失败，请联网后重试。'));
    await app.start();
    assert.equal(app.run('cvDraft'), 'old-draft');
    assert.equal(app.run('cvImportBusy'), false);
    assert.match(app.node('#cv-import-status').textContent, /组件加载失败/);
  });
  await test('reader 主动中止也给出取消状态，保留用户草稿', async () => {
    app.reset(); const done = app.start(); await tick();
    const error = new Error('aborted'); error.name = 'AbortError';
    app.reads.at(-1).reject(error); await done;
    assert.match(app.node('#cv-import-status').textContent, /已取消识别/);
    assert.equal(app.run('cvDraft'), 'old-draft');
  });
  await test('文档警告与文件名安全显示，仍需用户确认后才入库', async () => {
    app.reset(); const done = app.start('<img src=x>.pdf'); await tick();
    app.reads.at(-1).resolve(result('apple', { warnings: ['<img src=x onerror=alert(1)> 扫描识别需核对'] })); await done;
    assert.match(app.html(), /&lt;img src=x onerror=alert\(1\)&gt; 扫描识别需核对/);
    assert.doesNotMatch(app.html(), /<img src=x/);
    assert.deepEqual(app.vocab(), ['apple', 'zebra']);
  });
  await test('词库 JSON 文件仍走旧规范化，不把包装字段当单词', async () => {
    app.reset(); const done = app.start('words.json'); await tick();
    app.reads.at(-1).resolve(result('{"words":["APPLE","banana",123]}', { isDocument: false, kind: 'text', pages: 0 })); await done;
    assert.equal(app.run('cvDraft'), 'APPLE\nbanana');
    app.action('cv-append'); assert.deepEqual(app.vocab(), ['apple', 'banana', 'zebra']);
  });
  await test('隐藏 input 每次 change 立即清空 value，同一文件能再次选择', async () => {
    app.reset(); const count = app.reads.length;
    app.action('cv-select-file'); assert.equal(app.fileInput.clicks, 1);
    for (let i = 0; i < 2; i++) {
      app.fileInput.files = [{ name: 'same.docx', size: 200 }]; app.fileInput.value = 'C:\\fakepath\\same.docx';
      app.fileInput.fire('change'); assert.equal(app.fileInput.value, ''); await tick();
      app.reads.at(-1).resolve(result('same')); await tick();
    }
    assert.equal(app.reads.length, count + 2);
    assert.equal(app.run('cvDraft'), 'same');
  });
  await test('文件选择器取消没有副作用，草稿和读取次数不变', async () => {
    const count = app.reads.length, draft = app.run('cvDraft');
    app.fileInput.files = []; app.fileInput.value = ''; app.fileInput.fire('change'); await tick();
    assert.equal(app.reads.length, count);
    assert.equal(app.run('cvDraft'), draft);
  });
  await test('识别中收到真实 SW 更新消息不刷新，结果确认入库后才应用更新', async () => {
    app.reset(''); assert.equal(app.swListeners(), 1);
    const done = app.start('pending.pdf'); await tick();
    const request = app.reads.at(-1);
    app.swMessage(); app.advance(1000);
    assert.equal(app.run('pendingUpdate'), true);
    assert.equal(app.reloads(), 0);
    assert.equal(request.options.signal.aborted, false);
    request.resolve(result('banana')); await done; app.advance(1000);
    assert.equal(app.run('cvDraft'), 'banana');
    assert.equal(app.reloads(), 0);
    app.action('cv-append');
    assert.deepEqual(app.saved().customVocab, ['apple', 'banana', 'zebra']);
    app.advance(299); assert.equal(app.reloads(), 0);
    app.advance(1); assert.equal(app.reloads(), 1);
  });
  await test('已有草稿收到 SW 更新后，离开词库页面也不丢草稿或自动刷新', () => {
    app.reset('banana'); app.swMessage(); app.advance(1000);
    assert.equal(app.run('pendingUpdate'), true);
    assert.equal(app.reloads(), 0);
    app.tab('me'); app.advance(1000);
    assert.equal(app.run('view.name'), 'me');
    assert.equal(app.run('cvDraft'), 'banana');
    assert.equal(app.reloads(), 0);
    app.action('open-customvocab');
    assert.equal(app.node('#cv-ta').value, 'banana');
    app.action('cv-append'); app.advance(300);
    assert.equal(app.reloads(), 1);
    assert.deepEqual(app.saved().customVocab, ['apple', 'banana', 'zebra']);
  });
  await test('SW 通知的 800ms 延时内开始导入，执行刷新前会重新检查忙状态', async () => {
    app.reset(''); app.tab('home'); app.swMessage();
    app.advance(400);
    const done = app.start('race.docx'); await tick();
    app.advance(400);
    assert.equal(app.reloads(), 0);
    assert.equal(app.run('pendingUpdate'), true);
    assert.equal(app.run('cvImportBusy'), true);
    app.reads.at(-1).resolve(result('banana')); await done; app.advance(1000);
    assert.equal(app.run('cvDraft'), 'banana');
    assert.equal(app.reloads(), 0);
  });
  await test('SW 通知后才输入草稿，同样可在 800ms 刷新前获得保护', () => {
    app.reset(''); app.swMessage(); app.advance(400);
    const textarea = app.node('#cv-ta'); textarea.value = 'banana'; textarea.fire('input');
    app.advance(400);
    assert.equal(app.reloads(), 0);
    assert.equal(app.run('pendingUpdate'), true);
    assert.equal(app.run('cvDraft'), 'banana');
    assert.equal(app.node('#cv-ta'), textarea);
  });
  await test('SW 通知后才进入阅读，800ms 延时不会打断阅读，退出后再刷新', () => {
    app.reset(''); app.tab('home'); app.swMessage(); app.advance(400);
    app.article(app.run('ARTICLES[0].id')); app.advance(400);
    assert.equal(app.run('view.name'), 'read');
    assert.equal(app.reloads(), 0);
    assert.equal(app.run('pendingUpdate'), true);
    app.action('go-back'); app.advance(300);
    assert.equal(app.reloads(), 1);
  });
  await test('草稿确认后的 300ms 待更新延时也重新检查新开始的导入', async () => {
    app.reset('banana'); app.swMessage(); app.action('cv-append');
    const done = app.start('another.docx'); await tick(); app.advance(300);
    assert.equal(app.reloads(), 0);
    assert.equal(app.run('pendingUpdate'), true);
    app.reads.at(-1).resolve(result('orange')); await done;
    assert.equal(app.run('cvDraft'), 'orange');
    app.advance(1000); assert.equal(app.reloads(), 0);
    app.action('cv-append'); app.advance(300);
    assert.equal(app.reloads(), 1);
    assert.deepEqual(app.saved().customVocab, ['apple', 'banana', 'orange', 'zebra']);
  });
  await test('普通首页仍在收到 SW 更新 800ms 后刷新，无关消息不触发刷新', () => {
    app.reset(''); app.tab('home');
    app.swMessage({ type: 'unrelated' }); app.advance(1000);
    assert.equal(app.reloads(), 0);
    app.swMessage(); app.advance(799); assert.equal(app.reloads(), 0);
    app.advance(1); assert.equal(app.reloads(), 1);
    app.swMessage(); app.advance(1000); assert.equal(app.reloads(), 1);
  });
  await test('只有空白的草稿不会长期阻止 SW 更新', () => {
    app.reset(' \n\t '); app.swMessage(); app.advance(800);
    assert.equal(app.reloads(), 1);
  });
  for (const [name, action, expected] of [
    ['追加', 'cv-append', ['apple', 'banana', 'zebra']],
    ['覆盖', 'cv-overwrite', ['banana']],
  ]) {
    await test(name + '两档存储写入均失败时回滚词库与镜像、保留草稿和待更新，恢复后可重试', () => {
      app.reset('banana banana');
      // 只开启自定义高亮，能够直接验证派生并集也回滚，不被其他词库成员掩盖。
      app.run('S.hlSets={core:false,cet4:false,mid:false,custom:true};rebuildCustomSet();save();');
      const oldState = app.run('JSON.stringify(S)'), write = app.sandbox.localStorage.setItem;
      const attempts = [], mirrors = [];
      app.sandbox.window.WORDLENS_NATIVE = true;
      app.sandbox.window.UserState = { loadState: () => '', saveState: json => mirrors.push(JSON.parse(json)) };
      app.sandbox.localStorage.setItem = (key, value) => {
        attempts.push({ key, state: JSON.parse(value) });
        throw new Error('QuotaExceededError');
      };
      try {
        app.swMessage();
        app.action(action);
        if (action === 'cv-overwrite') app.action(action);
        assert.equal(attempts.length, 2, '实际触发 save 的原始写入与裁剪重试，两档均失败');
        assert.deepEqual(attempts.map(item => item.key), ['wordlens.v1', 'wordlens.v1']);
        for (const attempt of attempts) assert.deepEqual(attempt.state.customVocab, expected);
        assert.equal(app.run('storageState'), 'failed');
        assert.equal(app.run('JSON.stringify(S)'), oldState);
        assert.deepEqual(app.saved().customVocab, ['apple', 'zebra']);
        assert.deepEqual(JSON.parse(app.run('JSON.stringify([...CUSTOM_SET].sort())')), ['apple', 'zebra']);
        assert.deepEqual(JSON.parse(app.run('JSON.stringify([...HL_UNION].sort())')), ['apple', 'zebra']);
        assert.equal(app.run("buildVocabPreview(cvDraft,S.customVocab,true).valid.join(',')"), 'banana');
        assert.equal(app.run('cvDraft'), 'banana banana');
        assert.equal(app.node('#cv-ta').value, 'banana banana');
        assert.equal(app.run('cvImportOpen'), true);
        assert.equal(app.run('cvArmedOver'), false);
        assert.match(app.node('#cv-import-status').textContent, /词库未能保存.*原词库和识别草稿已保留/);
        assert.equal(mirrors.length, 2, '失败 save 的镜像随后被回滚镜像纠正');
        assert.deepEqual(mirrors[0].customVocab, expected);
        assert.deepEqual(mirrors.at(-1).customVocab, ['apple', 'zebra']);
        assert.equal(app.run('pendingUpdate'), true);
        app.advance(1000); assert.equal(app.reloads(), 0);

        app.sandbox.localStorage.setItem = write;
        app.action(action);
        if (action === 'cv-overwrite') {
          assert.deepEqual(app.vocab(), ['apple', 'zebra'], '失败后覆盖必须重新二次确认');
          app.action(action);
        }
        assert.equal(app.run('storageState'), 'ok');
        assert.deepEqual(app.vocab(), expected);
        assert.deepEqual(app.saved().customVocab, expected);
        assert.deepEqual(mirrors.at(-1).customVocab, expected);
        assert.equal(app.run('cvDraft'), '');
        assert.equal(app.run('cvImportOpen'), false);
        app.advance(300); assert.equal(app.reloads(), 1);
      } finally {
        app.sandbox.localStorage.setItem = write;
        delete app.sandbox.window.WORDLENS_NATIVE;
        delete app.sandbox.window.UserState;
      }
    });
  }
  console.log(`\n结果：${passed} 通过 / 0 失败`);
})().catch(error => { console.error(error); process.exitCode = 1; });

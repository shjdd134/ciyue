/* 单层查词回归：真实 click 委托与真实例句脚本，DOM 桩只记录插入/回填。
 * 不预加载 data-examples.js；用 script.onload/onerror 驱动异步请求生命周期。
 * 运行：node tools/lookup-card-test.js */
const vm = require('vm');
const fs = require('fs');
const path = require('path');
const assert = require('assert/strict');
const base = path.resolve(__dirname, '..');
const noop = () => {};
const longSentence = 'After several difficult months of careful preparation and discussion the company finally adopted a completely different strategy to attract younger customers who were increasingly moving to competing platforms around the world.';
const longTranslation = '经过数月的准备和讨论，公司最终采用了新策略，吸引不断转向其他平台的年轻顾客。';

function classList(initial = '') {
  const values = new Set(initial.split(/\s+/).filter(Boolean));
  return {
    contains: v => values.has(v),
    add: (...vs) => vs.forEach(v => values.add(v)),
    remove: (...vs) => vs.forEach(v => values.delete(v)),
    toggle(v, on) { if (on === undefined) on = !values.has(v); on ? values.add(v) : values.delete(v); return on; },
  };
}

function boot(options = {}) {
  const handlers = {}, scripts = [], words = [], store = {};
  const listen = (type, fn) => (handlers[type] ||= []).push(fn);
  let screenMarkup = '', screenWrites = 0, sheetHTML = '', holder = null, inserted = 0;
  const screen = {
    className: '', style: {}, appendChild: noop,
    get innerHTML() { return screenMarkup; },
    set innerHTML(value) { screenMarkup = value; screenWrites++; },
  };
  const read = { scrollTop: 527, clientHeight: 600, scrollHeight: 2400, dataset: { art: 'lookup-fixture' } };
  function removeSheet() { sheetHTML = ''; holder = null; }
  const sheet = { remove: removeSheet };
  const phone = {
    style: {}, appendChild: noop,
    insertAdjacentHTML(_, html) {
      inserted++;
      sheetHTML = html;
      const match = html.match(/<div class="example-box loading" data-example-word="([^"]+)">([\s\S]*?)<\/div>/);
      holder = null;
      if (!match) return;
      let outer = match[0], inner = match[2];
      const h = {
        word: match[1],
        get innerHTML() { return inner; },
        set innerHTML(value) {
          const next = outer.replace(inner, value);
          sheetHTML = sheetHTML.replace(outer, next); outer = next; inner = value;
        },
        get outerHTML() { return outer; },
        set outerHTML(value) {
          sheetHTML = sheetHTML.replace(outer, value); outer = value;
          if (holder === h) holder = null;
        },
        remove() { sheetHTML = sheetHTML.replace(outer, ''); if (holder === h) holder = null; },
      };
      holder = h;
    },
  };
  const sandbox = {
    console, window: { addEventListener: listen, removeEventListener: noop },
    document: {
      documentElement: { setAttribute: noop }, addEventListener: listen, removeEventListener: noop,
      head: { appendChild: script => scripts.push(script) },
      currentScript: { src: 'https://local.invalid/assets/app.js?v=test-lookup' },
      querySelector(selector) {
        if (selector === '#screen') return screen;
        if (selector === '.phone') return phone;
        if (selector === '#read-scroll') return options.lazyTap ? null : read;
        if (selector === '.word-sheet') return /class="sheet word-sheet"/.test(sheetHTML) ? sheet : null;
        const m = selector.match(/^\.example-box\[data-example-word="([^"]+)"\]$/);
        return m && holder && holder.word === m[1] ? holder : null;
      },
      querySelectorAll(selector) {
        if (selector === '.sheet, .sheet-mask' || selector === '.phone > .sheet, .phone > .sheet-mask') return sheetHTML ? [sheet] : [];
        const m = selector.match(/^\.word\[data-word="([^"]+)"\]$/);
        return m ? words.filter(w => w.dataset.word === m[1]) : [];
      },
      createElement(tag) {
        return { tagName: tag, dataset: {}, style: {}, classList: classList(), addEventListener: noop, appendChild: noop,
          remove() { this.removed = true; } };
      },
    },
    localStorage: { getItem: key => store[key] || null, setItem: (key, value) => { store[key] = value; } },
    SpeechSynthesisUtterance: function() {}, speechSynthesis: { cancel: noop, speak: noop },
    setTimeout: () => 0, clearTimeout: noop, setInterval: () => 0, clearInterval: noop,
    requestAnimationFrame: fn => fn(),
  };
  sandbox.window.window = sandbox.window;
  vm.createContext(sandbox);
  const run = code => vm.runInContext(code, sandbox);
  for (const name of ['data', 'data-words-bulk-a', 'data-words-full', 'data-words-mid', 'data-words-cet4', 'data-articles-extra', 'data-articles-archive', 'data-covers', 'data-ecdict', 'data-tapdict', 'data-wordfreq']) {
    if (name === 'data-tapdict' && options.lazyTap) continue;
    const file = path.join(base, 'assets', name + '.js');
    if (fs.existsSync(file)) vm.runInContext(fs.readFileSync(file, 'utf8'), sandbox, { filename: file });
  }
  run('var WORD_META = window.WORD_META, TAPDICT = window.TAPDICT, TAP_REVERSE = window.TAP_REVERSE, COMMON_WORDS = window.COMMON_WORDS;');
  // 固定冷启动场景，不依赖将来人工词库是否给这两个词补上自带例句。
  run('for (const key of ["adopt","little"]) { const w = WORDS.find(w=>w.word===key); delete w.example; delete w.exampleCn; }');
  vm.runInContext(fs.readFileSync(path.join(base, 'assets/app.js'), 'utf8'), sandbox, { filename: 'app.js' });
  run(`activeArticle={id:'lookup-fixture',title:'Lookup fixture',paras:[
    {sentences:[{en:${JSON.stringify(longSentence)},cn:${JSON.stringify(longTranslation)}}]},
    {sentences:[{en:'The first part has several words. The little child has several toys.',cn:'两句对应的译文。'}]}
  ]};view={name:'read'};`);
  const click = target => (handlers.click || []).forEach(fn => fn({ target: { closest: () => target }, detail: 0, stopPropagation: noop }));
  const action = (act, word) => click({ dataset: { act, word }, classList: classList(), closest: () => null });
  function lookup(word, form = word, coordinates = { pi: '0', si: '0' }) {
    const sentence = coordinates ? { dataset: coordinates } : null;
    const el = { dataset: { act: 'lookup', word, form }, classList: classList('word kw'),
      closest: selector => selector === '.sentence' ? sentence : null };
    words.push(el); click(el); return el;
  }
  async function load(index = scripts.length - 1) {
    vm.runInContext(fs.readFileSync(path.join(base, 'assets/data-examples.js'), 'utf8'), sandbox, { filename: 'data-examples.js' });
    scripts[index].onload(); await Promise.resolve(); await Promise.resolve();
  }
  async function fail(index = scripts.length - 1) { scripts[index].onerror(); await Promise.resolve(); await Promise.resolve(); }
  async function loadTap(index) {
    vm.runInContext(fs.readFileSync(path.join(base, 'assets/data-tapdict.js'), 'utf8'), sandbox, { filename: 'data-tapdict.js' });
    scripts[index].onload(); await Promise.resolve(); await Promise.resolve();
  }
  return { run, action, lookup, load, fail, loadTap, scripts, screen, read, saved: () => JSON.parse(store['wordlens.v1']),
    html: () => sheetHTML, screenWrites: () => screenWrites, inserted: () => inserted };
}

let passed = 0;
async function test(name, fn) { await fn(); passed++; console.log('✓ ' + name); }
const plain = html => html.replace(/<[^>]*>/g, '');

(async () => {
  const app = boot();
  const writesBefore = app.screenWrites();
  const word = app.lookup('adopt', 'adopted');
  await test('第一次点击就有完整原句、译文、原文词形和释义', () => {
    assert.match(app.html(), /<div class="w">adopted<\/div>/);
    assert.match(app.html(), /原形 adopt/);
    assert.match(app.html(), /本文原句/);
    assert.ok(plain(app.html()).includes(longSentence));
    assert.ok(app.html().includes(longTranslation));
    assert.ok(plain(app.html()).includes(app.run('WORDS.find(w=>w.word==="adopt").def')));
    assert.match(app.html(), /<mark class="w-hl">adopted<\/mark>/);
  });
  await test('第一次点击直接提供已认识与收藏，没有更多或第二层入口', () => {
    assert.match(app.html(), /data-act="mark-known"[^>]*>已认识<\/button>/);
    assert.match(app.html(), /data-act="add-note"/);
    assert.doesNotMatch(app.html(), />更多<|data-act="(?:word-more|lookup-more)"/);
    assert.match(app.html(), /word-sheet-body/);
  });
  await test('例句请求在首次 lookup 时立即开始，版本跟随主资源', () => {
    assert.equal(app.scripts.length, 1);
    assert.equal(app.scripts[0].src, 'assets/data-examples.js?v=test-lookup');
    assert.match(app.html(), /data-example-word="adopt"/);
    assert.match(app.html(), /例句按需加载中/);
    assert.equal(app.screenWrites(), writesBefore);
    assert.equal(app.read.scrollTop, 527);
    assert.ok(word.classList.contains('tapped'));
  });
  await app.load();
  await test('真实例句脚本 onload 自动补到同一卡片并高亮目标变形', () => {
    assert.match(app.html(), /Sally was <mark class="w-hl">adopted<\/mark> when she was four/);
    assert.match(app.html(), /莎莉四岁时被人收养/);
    assert.match(app.html(), /四级词库/);
    assert.doesNotMatch(app.html(), /data-example-word=|例句按需加载中/);
    assert.equal(app.inserted(), 1);
    assert.equal(app.screenWrites(), writesBefore);
    assert.ok(plain(app.html()).includes(longSentence));
  });
  await test('收藏时仍保存短语境，不把卡片的完整长句塞进生词本', () => {
    app.action('add-note', 'adopt');
    const saved = app.saved().notebook.find(w => w.word === 'adopt');
    assert.equal(saved.context.en, app.run(`clipContext(${JSON.stringify(longSentence)},'adopt')`));
    assert.notEqual(saved.context.en, longSentence);
    assert.ok(saved.context.en.includes('adopted'));
    assert.equal(saved.context.cn, longTranslation);
    assert.equal(saved.articleId, 'lookup-fixture');
    assert.equal(app.html(), '');
    assert.equal(app.screenWrites(), writesBefore);
  });
  await test('已认识真实点击持久化，保留生词记录，正文不重绘并清掉 tapped', () => {
    const before = JSON.stringify(app.saved().notebook);
    const tapped = app.lookup('adopt', 'adopted');
    app.action('mark-known', 'adopt');
    assert.ok(app.saved().known.includes('adopt'));
    assert.equal(JSON.stringify(app.saved().notebook), before);
    assert.ok(tapped.classList.contains('known'));
    assert.ok(!tapped.classList.contains('kw') && !tapped.classList.contains('wb'));
    assert.ok(!tapped.classList.contains('tapped'));
    assert.equal(app.run('tappedWordEl'), null);
    assert.equal(app.html(), '');
    assert.equal(app.screenWrites(), writesBefore);
    assert.equal(app.read.scrollTop, 527);
  });
  await test('再次打开已认识词可撤销，保留原有生词条目', () => {
    app.lookup('adopt', 'adopted');
    assert.match(app.html(), /aria-pressed="true">取消已认识<\/button>/);
    app.action('mark-known', 'adopt');
    assert.ok(!app.saved().known.includes('adopt'));
    assert.ok(app.saved().notebook.some(w => w.word === 'adopt'));
  });

  const retry = boot(); retry.lookup('adopt'); await retry.fail();
  await test('网络失败在当前卡片显示重试，原句和已认识仍可使用', () => {
    assert.match(retry.html(), /例句没能加载/);
    assert.match(retry.html(), /data-act="retry-examples"/);
    assert.match(retry.html(), /data-act="mark-known"/);
    assert.ok(plain(retry.html()).includes(longSentence));
    assert.ok(retry.scripts[0].removed);
  });
  retry.action('retry-examples', 'adopt');
  await test('点击重试直接启动新请求，不重开卡片', () => {
    assert.equal(retry.scripts.length, 2);
    assert.equal(retry.inserted(), 1);
    assert.match(retry.html(), /例句按需加载中/);
  });
  await retry.load();
  await test('重试成功原地呈现双语例句', () => {
    assert.match(retry.html(), /<mark class="w-hl">adopted<\/mark>/);
    assert.match(retry.html(), /莎莉四岁时被人收养/);
    assert.doesNotMatch(retry.html(), /重试|例句按需加载中/);
  });

  const changed = boot(); const oldWord = changed.lookup('adopt');
  const newWord = changed.lookup('little', 'little', { pi: '1', si: '0', rs: '1' });
  await test('加载期间换词共用一个请求，词定位与显示句切到新词', () => {
    assert.equal(changed.scripts.length, 1);
    assert.ok(!oldWord.classList.contains('tapped') && newWord.classList.contains('tapped'));
    assert.match(changed.html(), /data-example-word="little"/);
    assert.ok(plain(changed.html()).includes('The little child has several toys.'));
    assert.ok(!plain(changed.html()).includes('The first part has several words.'));
    assert.match(changed.html(), /两句对应的译文/);
  });
  await changed.load();
  await test('旧词迟到回调不能把例句填进新词卡片', () => {
    assert.match(changed.html(), /She was cutting the meat up into <mark class="w-hl">little<\/mark> bits/);
    assert.doesNotMatch(changed.html(), /Sally was|adopted/);
    assert.equal(changed.inserted(), 2);
  });

  const closed = boot(); const closedWord = closed.lookup('adopt'); closed.action('close-sheet');
  await closed.load();
  await test('关闭卡片后迟到成功不会重新弹卡，定位底色已移除', () => {
    assert.equal(closed.html(), '');
    assert.equal(closed.inserted(), 1);
    assert.ok(!closedWord.classList.contains('tapped'));
  });
  const lateFail = boot(); lateFail.lookup('adopt'); lateFail.action('close-sheet'); await lateFail.fail();
  await test('关闭后迟到失败不会插入重试按钮或重新弹卡', () => {
    assert.equal(lateFail.html(), '');
    assert.equal(lateFail.inserted(), 1);
  });

  const existing = boot();
  existing.run('Object.assign(WORDS.find(w=>w.word==="adopt"),{example:"We adopt this approach.",exampleCn:"我们采用这个方法。",source:"已有例句"})');
  existing.lookup('adopt');
  await test('已有例句首次点击直接显示，无额外请求或空占位', () => {
    assert.equal(existing.scripts.length, 0);
    assert.match(existing.html(), /We <mark class="w-hl">adopt<\/mark> this approach/);
    assert.match(existing.html(), /我们采用这个方法/);
    assert.doesNotMatch(existing.html(), /data-example-word=/);
  });
  const external = boot();
  const outWord = external.run('Object.keys(TAP).find(word=>!WORDS.some(w=>w.word===word) && /^[a-z]+$/.test(word))');
  assert.ok(outWord, '真实 TAPDICT 里必须存在词库外词');
  external.lookup(outWord, outWord, null);
  await test('词库外词保持查询卡，不请求例句库', () => {
    assert.equal(external.scripts.length, 0);
    assert.match(external.html(), /词库外单词 · 仅供查询/);
    assert.doesNotMatch(external.html(), /data-example-word=|本文原句/);
  });
  const tapLoading = boot({ lazyTap: true });
  tapLoading.run('activeArticle=ARTICLES[0];render()');
  const tapIndex = tapLoading.scripts.findIndex(script => /data-tapdict\.js/.test(script.src));
  assert.ok(tapIndex >= 0, '进入阅读页应实际启动点词大表请求');
  const tapWord = tapLoading.lookup('adopt', 'adopted', null);
  const htmlBeforeTap = tapLoading.html(), writesBeforeTap = tapLoading.screenWrites();
  await tapLoading.loadTap(tapIndex);
  await test('点词大表迟到 onload 不重绘阅读页或关闭已打开的单层词卡', () => {
    assert.equal(tapLoading.run('Boolean(TAP && TAPR)'), true);
    assert.equal(tapLoading.html(), htmlBeforeTap);
    assert.equal(tapLoading.screenWrites(), writesBeforeTap);
    assert.ok(tapWord.classList.contains('tapped'));
  });
  console.log(`\n${passed} 项单层查词回归通过`);
})().catch(error => { console.error(error); process.exitCode = 1; });

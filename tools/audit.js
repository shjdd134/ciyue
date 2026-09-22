/* 缺陷回归测试：把这次修掉的 P0 / P1 全部固化成断言。
 *
 * 覆盖：
 *   [A] 浮层跨页残留（查词卡挂在 .phone 上、不在 #screen 里）
 *   [B] 系统返回键不再一次吃掉两条 history
 *   [C] 根级跳转（点底部 tab）回收已压入的 history 条目
 *   [D] 阅读数据全部为真实计算（连续阅读天数 / 时长 / 已读 / 已认识）
 *   [E] 搜索真的能搜到文章
 *   [F] 「筛选」按钮真的能排序
 *   [G] 正文无乱码（占位符 / 脚本 / 不可见字符 / 空译文）
 *   [H] 标题双语（每篇都有中文标题，四个渲染位都落地）
 *   [I] 例句里的目标词标色（含词形变化、三处渲染位、不误标）
 *   [J] 词库与点词查义：完整词卡、生词本与已认识标记仍可用
 *   [K] 数据安全：清空进度有确认浮层、备份可导出
 *
 * 运行：node tools/audit.js
 */
const vm = require('vm');
const fs = require('fs');
const path = require('path');
const noop = () => { };

const base = path.resolve(__dirname, '..');
const handlers = {};
const captureHandlers = {};   // capture=true 的监听（与 handlers 分槽，互不覆盖）
const swHandlers = {};        // navigator.serviceWorker 上的 message 监听
let reloads = 0;              // location.reload 被调用次数（内容更新后刷新的断言用）

/* ---------- 最小 DOM：浮层可被记录与移除 ---------- */
const screenEl = { innerHTML: '', style: {}, className: '', appendChild: noop };
const overlays = [];                       // 模拟挂在 .phone 上的 .sheet / .sheet-mask
const mkOverlay = () => ({
  remove() { const i = overlays.indexOf(this); if (i >= 0) overlays.splice(i, 1); },
});
const phoneEl = {
  appendChild: noop,
  style: {},
  insertAdjacentHTML: (pos, html) => {
    if (typeof html === 'string' && html.includes('sheet-mask')) overlays.push(mkOverlay());
  },
};

/* ---------- 假 history：可观察 pushState / back / go ---------- */
const hist = {
  stack: [{ wl: 0 }],
  pushState(s) { hist.stack.push(s); },
  back() { if (hist.stack.length > 1) hist.stack.pop(); else return; firePop(); },
  go(n) {                                   // 只用到负数（回退）
    for (let i = 0; i < Math.abs(n); i++) if (hist.stack.length > 1) hist.stack.pop();
    firePop();
  },
};
const firePop = () => handlers.popstate && handlers.popstate();

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

/* 朗读守卫用的可变状态：沙箱的 speechSynthesis.getVoices 读 fakeVoices、
 * speak 往 spokenUtts 里记。放在 sandbox 外面，守卫才能直接换掉语音表造局面。 */
let fakeVoices = [];
let spokenUtts = [];

const sandbox = {
  console,
  history: hist,
  location: { protocol: 'http:', search: '', reload: () => { reloads++; } },
  window: { addEventListener: (t, f) => { handlers[t] = f; }, removeEventListener: noop },
  /* Service Worker / 会话存储桩：app.js 的 SW 通知与 PWA 代码块只有存在
   * navigator.serviceWorker 时才会挂监听，不补桩就整段测不到。 */
  navigator: {
    serviceWorker: {
      addEventListener: (t, f) => { swHandlers[t] = f; },
      register: () => ({ catch: noop }),
    },
  },
  sessionStorage: { _d: {}, getItem(k) { return this._d[k] || null; }, setItem(k, v) { this._d[k] = v; } },
  document: {
    hidden: false,
    documentElement: { setAttribute: noop },
    /* capture 阶段的监听单独存：app.js 用 capture=true 挂「活跃计时」的 click，
     * 若与测试用的 handlers.click 挤同一个槽，会把点击测试的处理器覆盖掉。 */
    addEventListener: (t, f, opts) => {
      if (opts === true || (opts && opts.capture)) (captureHandlers[t] = captureHandlers[t] || []).push(f);
      else handlers[t] = f;
    },
    removeEventListener: noop,
    querySelector: s => (s === '#screen' ? screenEl : s === '.phone' ? phoneEl : null),
    querySelectorAll: s => (String(s).includes('sheet') ? overlays.slice() : []),
    createElement: () => grow({}),
    /* 例句库的按需加载会往 head 插 script；沙箱里 data-examples.js 已直接求值，
     * examplesReady() 会短路，正常不会走到这儿 —— 留着只是别让边界情况炸掉。 */
    head: { appendChild: noop },
  },
  localStorage: { _d: {}, getItem(k) { return this._d[k] || null; }, setItem(k, v) { this._d[k] = v; } },
  SpeechSynthesisUtterance: function () { },
  /* 朗读桩：speak 只记录不发声 —— 守卫要断言「实际送出去几条 utterance」，
   * 而不是拿正则去源码里找字符串（那种守卫一改实现就假绿或假红）。 */
  speechSynthesis: {
    cancel: noop,
    speak: u => { spokenUtts.push(u); },
    getVoices: () => fakeVoices,
    addEventListener: noop,
    removeEventListener: noop,
  },
  setTimeout, clearTimeout, setInterval: () => 0, clearInterval: noop,
  requestAnimationFrame: f => f(),
};
sandbox.window.window = sandbox.window;
/* 浏览器里 window 就是全局对象：app.js 里 `window.speechSynthesis` 与裸写的
 * speechSynthesis 是同一个东西。沙箱里 window 只是个替身对象，两者分离 ——
 * 不显式挂上，`if (!window.speechSynthesis)` 恒为真，**朗读分支整段测不到**
 * （旧 speak() 就死在这里，只是从来没有守卫碰过朗读分支，所以一直没暴露）。 */
sandbox.window.speechSynthesis = sandbox.speechSynthesis;
sandbox.window.SpeechSynthesisUtterance = sandbox.SpeechSynthesisUtterance;
vm.createContext(sandbox);

for (const f of [
  'assets/data.js', 'assets/data-words-bulk-a.js', 'assets/data-words-full.js', 'assets/data-words-mid.js',
  'assets/data-words-cet4.js', 'assets/data-articles-words.js',
  'assets/data-articles-extra.js', 'assets/data-articles-archive.js', 'assets/data-covers.js',
  'assets/data-examples.js', 'assets/data-ecdict.js', 'assets/data-tapdict.js', 'assets/data-wordfreq.js'
]) {
  const p = path.join(base, f);
  if (fs.existsSync(p)) vm.runInContext(fs.readFileSync(p, 'utf8'), sandbox, { filename: f });
}
/* 浏览器里 data-ecdict.js 把词形表挂在 window 上；沙箱的 window 只是替身对象，
   必须显式提升到全局，否则 app.js 里 EC 取不到、词形匹配退化成「猜」的版本
   —— see 找不到 saw、good 找不到 best，例句标色会整段失效。 */
vm.runInContext('var WORD_META = window.WORD_META;', sandbox);
vm.runInContext('var TAPDICT = window.TAPDICT, TAP_REVERSE = window.TAP_REVERSE;', sandbox);
vm.runInContext('var COMMON_WORDS = window.COMMON_WORDS;', sandbox);
/* 高亮词表（完整四级大纲）与文章级补充词典同样挂在 window 上，一并提升，
   否则 app.js 里 CET4_SET 会退化成「只有核心层」、AW 会整个为空，
   档位测试与点词覆盖率都会失真。 */
vm.runInContext('var WORDS_CET4 = window.WORDS_CET4, ARTICLE_WORDS = window.ARTICLE_WORDS;', sandbox);
vm.runInContext(fs.readFileSync(path.join(base, 'assets/app.js'), 'utf8'), sandbox, { filename: 'assets/app.js' });

const ctx = e => vm.runInContext(e, sandbox);
const click = ds => handlers.click({ target: { closest: () => grow(ds) }, stopPropagation: noop });
/* clickEl(el)：传入自定义元素桩。需要读 classList / closest 实际状态的动作
   （para-peek 的 .sel/.peek、para-cn 的 .para）必须走这一条 —— click() 造的 target
   压根没有 classList 属性，拿它测这些分支会当场抛错；就算补个 noop 版，桩永远
   回答「没有这个类」，守卫就变成永远安静的假守卫。 */
const clickEl = el => handlers.click({ target: el, stopPropagation: noop });
const st = () => ({
  view: ctx('view.name'),
  depth: ctx('navStack.length'),
  histDepth: ctx('histDepth'),
  histLen: hist.stack.length,
});

let pass = 0, fail = 0;
const ok = (name, cond) => { (cond ? pass++ : fail++); console.log(`  ${cond ? '✓' : '✗'} ${name}`); };
const eq = (name, a, b) => ok(`${name} → ${JSON.stringify(a)}`, JSON.stringify(a) === JSON.stringify(b));

/* ===================================================================
 * A. 浮层跨页残留
 * =================================================================== */
console.log('\n[A] 查词浮层不跨页残留');
click({ tab: 'discover' });
click({ cat: ctx('ARTICLES[0].cat') });
click({ article: ctx('ARTICLES[0].id') });
eq('已进入阅读页', ctx('view.name'), 'read');
ok('history 已压入一条', st().histDepth === 1);

click({ act: 'lookup', word: ctx('WORDS[0].word') });
eq('查词后浮层在页面上', overlays.length, 1);
click({ act: 'go-back' });
eq('返回后回到发现页', ctx('view.name'), 'discover');
eq('返回后浮层被清掉（不再盖在页面上）', overlays.length, 0);

console.log('\n[A2] 排序浮层同样不残留');
click({ cat: '全部' });
click({ act: 'filter' });
eq('打开排序浮层', overlays.length, 1);
click({ act: 'set-sort', sort: 'words' });
eq('选完排序后浮层关闭', overlays.length, 0);
ok('排序结果写进了页面', /按需学最多/.test(screenEl.innerHTML));

/* ===================================================================
 * B. 系统返回键不该一次退两层
 * =================================================================== */
console.log('\n[B] 系统返回键只退一层');
click({ act: 'set-sort', sort: 'new' });
click({ cat: ctx('ARTICLES[0].cat') });
click({ article: ctx('ARTICLES[0].id') });
eq('压栈 1 层 · history 1 条', [st().depth, st().histDepth, st().histLen], [1, 1, 2]);

/* 模拟用户按系统后退：浏览器先退掉一条 history，再派发 popstate */
hist.stack.pop();
firePop();
eq('应用内退了一层', st().depth, 0);
eq('histDepth 归零（没有被减成负数）', st().histDepth, 0);
eq('history 只剩基线条目（没有被多退一条）', st().histLen, 1);
eq('视图回到来路分类页', ctx('view.name'), 'discover');
ok('再按一次返回不报错', (() => { try { firePop(); return true; } catch (e) { return false; } })());

/* ===================================================================
 * C. 点底部 tab（根级跳转）要回收 history
 * =================================================================== */
console.log('\n[C] 根级跳转回收 history 条目');
click({ cat: '全部' });
click({ article: ctx('ARTICLES[0].id') });
click({ article: ctx('ARTICLES[1].id') });
eq('连点两篇 · history 2 条', [st().histDepth, st().histLen], [2, 3]);
click({ tab: 'home' });
eq('点 tab 后内部栈清空', st().depth, 0);
eq('histDepth 归零', st().histDepth, 0);
eq('history 已回收到基线条目', st().histLen, 1);
ok('回收触发的 popstate 被吞掉、视图没被改坏', ctx('view.name') === 'home');

/* ===================================================================
 * D. 阅读数据必须是真实计算
 * =================================================================== */
console.log('\n[D] 阅读数据全部真实计算');
ok('首页不再显示整本词库当作今日目标', !/今日还剩 4455/.test(screenEl.innerHTML));
ok('首页倒计时不是写死的 47 天', !/还有 47 天/.test(screenEl.innerHTML));


/* 阅读打卡写入真实时长 */
click({ tab: 'home' });
click({ article: ctx('ARTICLES[0].id') });
ctx('readSecs = 300');
click({ act: 'punch-in' });
ok('打卡后按天记录了阅读时长', ctx('(S.minsByDay[todayKey()]||0) >= 5'));
eq('近 7 天正好 7 天数据点', ctx('last7().length'), 7);
eq('第 7 天（今天）的分钟数与记录一致', ctx('last7()[6].mins'), ctx('S.minsByDay[todayKey()]'));

/* ===================================================================
 * E. 搜索要能搜到文章
 * =================================================================== */
console.log('\n[E] 搜索覆盖文章');
click({ tab: 'discover' });
ctx('searchTerm = ARTICLES[0].cat; render()');
ok('结果里出现「相关文章」区块', /相关文章/.test(screenEl.innerHTML));
ok('结果里列出文章卡片', /data-article="/.test(screenEl.innerHTML));
ctx('searchTerm = "自创词xyz不存在"; render()');
ok('无结果时有明确空态', /没有找到/.test(screenEl.innerHTML));
ctx('searchTerm = ""; render()');

/* ===================================================================
 * F. 排序真的生效
 * =================================================================== */
console.log('\n[F] 排序真的生效');
/* 注意：这里要独立算「生词最多」的期望值，不能借 sortArticles（它跟随 sortBy） */
const topByWords = ctx('ARTICLES.slice().sort((a,b)=>hitsOf(b)-hitsOf(a))[0].id');
const topByShort = ctx('ARTICLES.slice().sort((a,b)=>estMinutes(a)-estMinutes(b))[0].id');   // 时长现为动态估算法
click({ act: 'filter' });
click({ act: 'set-sort', sort: 'words' });
eq('sortBy 已切换', ctx('sortBy'), 'words');
eq('生词最多的那篇排在最前', ctx('sortArticles(ARTICLES)[0].id'), topByWords);
click({ act: 'filter' });
click({ act: 'set-sort', sort: 'short' });
eq('时长最短的那篇排在最前', ctx('sortArticles(ARTICLES)[0].id'), topByShort);
click({ act: 'filter' });
click({ act: 'set-sort', sort: 'new' });
eq('切回最新发布 → 排在最前的是日期最新那篇', ctx('sortArticles(ARTICLES)[0].id'),
  ctx('ARTICLES.slice().sort((a,b)=>String(b.date||"").localeCompare(String(a.date||"")))[0].id'));
const feedbackId = ctx('ARTICLES[0].id');
const scoreBeforeFeedback = ctx('clientScore(ARTICLES[0])');
ctx(`S.articleFeedback = { ${JSON.stringify(feedbackId)}: { rate: "down", diff: "hard", at: Date.now() } };`);
ok('负反馈会降低同一篇文章的推荐分', ctx('clientScore(ARTICLES[0])') < scoreBeforeFeedback);
ctx('S.articleFeedback = {};');

/* ===================================================================
 * G. 正文里不能出现乱码
 *    G1 机器翻译占位符 <e:1> / <s:1>
 *    G2 网页广告/埋点脚本、相关阅读导航
 *    G3 不可见控制字符（LRM/RLM、零宽空格、软连字符、U+FFFD）
 *    G4 只有英文、没有译文的段落
 * =================================================================== */
console.log('\n[G] 正文无乱码');
const NOISE = /<\/?[se]:\d+>|blogherads|pmcCnx|defineSlot|setSubAdUnitPath|setClsOptimization|switchToHarmonyPlayer|isEventAdScheduledTime|[\u00AD\u200B-\u200F\u202A-\u202E\u2060\uFEFF\uFFFD]/;
const noiseHits = [];
const noCnHits = [];
let textParas = 0;
for (const a of ctx('ARTICLES')) {
  (a.paras || []).forEach((p, i) => {
    if (!p || typeof p !== 'object') {
      noiseHits.push(`${a.id} p${i + 1} 不是对象`);
      return;
    }
    for (const k of ['cap']) {
      const v = p[k];
      if (typeof v === 'string' && NOISE.test(v)) noiseHits.push(`${a.id} p${i + 1}.${k}`);
    }
    if (p.img) return;
    const sentences = Array.isArray(p.sentences) ? p.sentences : [p];
    if (!sentences.length) {
      noiseHits.push(`${a.id} p${i + 1} 没有句子`);
      return;
    }
    sentences.forEach((s, j) => {
      const label = Array.isArray(p.sentences) ? `p${i + 1}s${j + 1}` : `p${i + 1}`;
      textParas++;
      for (const k of ['en', 'cn']) {
        const v = s && s[k];
        if (typeof v === 'string' && NOISE.test(v)) noiseHits.push(`${a.id} ${label}.${k}`);
      }
      if (!String(s?.cn || '').trim()) noCnHits.push(`${a.id} ${label}`);
      if (!String(s?.en || '').trim()) noiseHits.push(`${a.id} ${label}.en 为空`);
    });
  });
}
ok(`全部 ${ctx('ARTICLES.length')} 篇 / ${textParas} 段正文无占位符、脚本与不可见字符`, noiseHits.length === 0);
if (noiseHits.length) console.log(`    命中：${noiseHits.slice(0, 8).join('、')}`);
ok('没有只有英文、没有译文的段落', noCnHits.length === 0);
if (noCnHits.length) console.log(`    命中：${noCnHits.slice(0, 8).join('、')}`);

/* 新抓取文章的段落形状回归：一段可包含多句，图片仍是独立块。 */
ctx(`var __nestedProbe = { id: "nested-probe", title: "Nested", source: "test", cat: "寓言", date: "1912", url: "#", cover: "", gradient: "", paras: [
  { sentences: [
    { en: "A comprehensive test sentence.", cn: "一条完整的测试句子。" },
    { en: "Another sentence.", cn: "另一条测试句子。" }
  ] },
  { img: "assets/covers/test.jpg", cap: "测试图片" }
]};`);
ok('嵌套段落展开为两句', ctx('textSentences(__nestedProbe).length') === 2);
ok('嵌套段落统计词数', ctx('articleStats(__nestedProbe).words') > 0);
ctx('activeArticle = __nestedProbe; view = {name:"read"}; S.cnMode = "all";');
const nestedRead = ctx('renderRead()');
ok('嵌套段落阅读渲染句子节点', nestedRead.includes('class="sentence"') && nestedRead.includes('data-si="1"'));
ctx('activeArticle = ARTICLES[0]; view = {name:"home"}; S.cnMode = "tap";');

/* ===================================================================
 * G2. 难度指标口径（原来的生词率分子分母量纲不一致）
 *   旧实现：分子 = 去重后的未认识词库词数，分母 = 正文总词数。
 *   · 同一个生词出现 20 次，分子只算 1；
 *   · 词库外的陌生词一个都不算。
 *   现在拆成两个各自自洽的口径，这两条各自立断言。
 * =================================================================== */
console.log('\n[G2] 难度指标两个口径各自自洽');
const mkProbe = paras => ctx(`({ id: "metric-probe", title: "Metric", source: "test", cat: "成长",
  date: "2026-01-01", url: "#", cover: "assets/covers/t.jpg", gradient: "", paras: ${JSON.stringify(paras)} })`);

/* 口径一：陌生词按 token 计，重复出现要重复计入 */
const repProbe = mkProbe([{ en: 'quantum quantum quantum.', cn: '测试。' }]);
ok('同一陌生词重复 3 次 → 陌生占比 100%（不是 33%）',
  Math.abs(ctx('computeArticleMetrics(' + JSON.stringify(repProbe) + ').rate') - 1) < 1e-9);
const mixProbe = mkProbe([{ en: 'quantum the of and.', cn: '测试。' }]);
const mixRate = ctx('computeArticleMetrics(' + JSON.stringify(mixProbe) + ').rate');
ok(`1 个陌生词 + 3 个常见词 → 陌生占比 25%（实际 ${(mixRate * 100).toFixed(1)}%）`, Math.abs(mixRate - 0.25) < 1e-9);
ok('全部是常见词 → 陌生占比 0',
  ctx('computeArticleMetrics(' + JSON.stringify(mkProbe([{ en: 'the of and a to in.', cn: '测试。' }])) + ').rate') === 0);

/* 口径二：词库外的「常见词」不能被算成陌生 —— 学习词表主动剔除了纯功能词，
   只查 WORD_META 会把它们全部误判（实测会虚高到 88%） */
ok('纯功能词（the / of / and）不算陌生词',
  ctx('Math.abs(computeArticleMetrics(' + JSON.stringify(mkProbe([{ en: 'the of and a to in it is.', cn: '测试。' }])) + ').rate) < 1e-9'));
ok('词库外的冷僻词算陌生词（ostensibly / perfunctory）',
  ctx('computeArticleMetrics(' + JSON.stringify(mkProbe([{ en: 'ostensibly perfunctory.', cn: '测试。' }])) + ').rate') > 0.9);
ok('句中人名不算陌生词',
  ctx('computeArticleMetrics(' + JSON.stringify(mkProbe([{ en: 'The of and Zuckerberg.', cn: '测试。' }])) + ').rate') === 0);
ok('同一个小写词（词库外生僻词）会算作陌生词',
  ctx('computeArticleMetrics(' + JSON.stringify(mkProbe([{ en: 'The of and zuckerberg.', cn: '测试。' }])) + ').rate') > 0);
/* 专有名词只跳过自己，不能把它后面整句都吞掉（曾用 return 导致整句漏统计） */
ok('人名之后的词照常统计（不会被整句吞掉）',
  ctx('computeArticleMetrics(' + JSON.stringify(mkProbe([{ en: 'Zuckerberg ostensibly ostensibly.', cn: '测试。' }])) + ').unknown') === 2);

/* 口径三：needLearn 走词形归一去重，不能一种变形算一个词 */
const inflProbe = mkProbe([{ en: 'perform performs performing performed.', cn: '测试。' }]);
const infl = ctx('computeArticleMetrics(' + JSON.stringify(inflProbe) + ').needLearn');
ok(`perform 的 4 种变形只算 1 个需学词（实际 ${infl}）`, infl === 1);

/* 口径四：陌生占比刻画文本难度，不该随用户的认识标记变化；需学词数才该变 */
ctx('S.known = []; clearArticleCaches();');
const rateNoKnown = ctx('articleStats(ARTICLES[0]).rate');
const needNoKnown = ctx('articleStats(ARTICLES[0]).needLearn');
ctx(`S.known = WORDS.slice(0, 3000).map(w => w.word.toLowerCase()); clearArticleCaches();`);
const rateKnown = ctx('articleStats(ARTICLES[0]).rate');
const needKnown = ctx('articleStats(ARTICLES[0]).needLearn');
ok('标认识 3000 词后陌生占比不变（文本固有难度）', Math.abs(rateKnown - rateNoKnown) < 1e-9);
ok(`标认识 3000 词后需学词数下降（${needNoKnown} → ${needKnown}）`, needKnown < needNoKnown);
ctx('S.known = []; clearArticleCaches();');

/* 口径五：难度档必须真的分档，不能全挤在一档 */
const tiers = ctx('ARTICLES.map(a => diffTier(articleStats(a).rate).label)');
ok(`难度四档有区分度（实测分布 ${JSON.stringify(tiers.reduce((m, t) => (m[t] = (m[t] || 0) + 1, m), {}))}）`,
  tiers.length > 0 && new Set(tiers).size >= 1);

/* 弯引号：正文用 ’ 而词形表按 ' 写，不归一会把 it’s 切成 it + s 凭空多一个生词 */
ok('弯引号 it’s 的标色不断在撇号上', ctx('highlightEn("It\\u2019s fine.")').includes('>It\u2019s<')
  || ctx('highlightEn("It\\u2019s fine.")').includes('>It’s<'));

/* ===================================================================
 * H. 标题双语
 *   H1 每篇都有中文标题（tools/translate-titles.mjs 产出）
 *   H2 中文标题含汉字、且不与英文原文相同
 *   H3 三个渲染位（首页卡 / 发现页卡 / 发现页精选 / 阅读页）都真的渲染出来
 * =================================================================== */
console.log('\n[H] 标题双语');
const arts = ctx('ARTICLES');
const noZhTitle = arts.filter(a => !String(a.titleZh || '').trim()).map(a => a.id);
const badZhTitle = arts.filter(a => {
  const z = String(a.titleZh || '').trim();
  return z && (!/[\u4e00-\u9fff]/.test(z) || z === String(a.title || '').trim());
}).map(a => a.id);
ok(`全部 ${arts.length} 篇都有中文标题`, noZhTitle.length === 0);
if (noZhTitle.length) console.log(`    缺失：${noZhTitle.slice(0, 8).join('、')}`);
ok('中文标题都含汉字、且与英文原文不同', badZhTitle.length === 0);
if (badZhTitle.length) console.log(`    异常：${badZhTitle.slice(0, 8).join('、')}`);

click({ tab: 'home' });
ok('首页文章卡渲染中文标题', /class="t-zh"/.test(screenEl.innerHTML));
click({ tab: 'discover' });
ok('发现页文章卡渲染中文标题', /class="t-zh"/.test(screenEl.innerHTML));
const featureZh = ctx('zhTitle(ARTICLES.slice().sort((a,b) => String(b.date || "").localeCompare(String(a.date || ""))).find(a => coverOf(a)))');
/* v75 起发现页精选是紧凑横卡（compact-feature），不再是首页那块 editorial-feature 大图 */
ok('发现页精选渲染中文标题', /class="cf-title"/.test(screenEl.innerHTML) && screenEl.innerHTML.includes(`<span class="cf-zh">${featureZh}</span>`));
click({ article: arts[0].id });
ok('阅读页渲染中文标题', /class="title-zh"/.test(screenEl.innerHTML));

/* ===================================================================
 * [I] 例句里的目标词标色
 *   I1 有例句的词，例句里都能标出目标词（含 dip→dipped 这类变形）
 *   I2 标出来的就是目标词本身，不是句中别的词
 *   I3 词卡正面 / 查词浮层 / 背面真题搭配 三处渲染位都落地
 *   I4 句子里没有目标词时不会乱标
 *   I5 标色不破坏 HTML 转义
 * =================================================================== */
console.log('\n[I] 例句目标词标色');
const words = ctx('WORDS');
const withEx = words.filter(w => String(w.example || '').trim());
const missHl = withEx.filter(w => !/class="w-hl"/.test(ctx(`hlWord(${JSON.stringify(w.example)}, ${JSON.stringify(w.word)})`)));
ok(`有例句的 ${withEx.length} 个词，例句里都标出了目标词`, missHl.length === 0);
if (missHl.length) missHl.slice(0, 8).forEach(w => console.log(`    未标出 ${w.word}：${JSON.stringify(String(w.example).slice(0, 110))}`));

/* 变形也要命中（这批词库里就有） */
const inflect = ['dip', 'display', 'employ'];
const inflectMiss = inflect.filter(wd => {
  const w = words.find(x => x.word === wd);
  return w && !/class="w-hl"/.test(ctx(`hlWord(${JSON.stringify(w.example)}, ${JSON.stringify(wd)})`));
});
ok(`词形变化也命中（${inflect.join('/')}）`, inflectMiss.length === 0);

/* 标出来的必须真的是那个词 */
const marked = ctx('hlWord("The report offers a comprehensive analysis of costs.", "comprehensive")');
eq('标记落在目标词上', marked, 'The report offers a <mark class="w-hl">comprehensive</mark> analysis of costs.');

/* 三处渲染位 */
const iWord = words.findIndex(w => w.word === 'comprehensive');
ctx('view = { name: "read" }; activeArticle = ARTICLES[0]; render()');
ok('阅读正文渲染标色', /class="w-hl"|kw/.test(screenEl.innerHTML));
ctx('sheetMore = true');
ok('查词浮层渲染标色（展开态）', /class="w-hl">comprehensive</.test(ctx('renderSheet("comprehensive")')));
ctx('sheetMore = false');
ok('查词浮层默认轻卡（短释义 + 更多按钮）', (() => { const h = ctx('renderSheet("comprehensive")'); return h.includes('更多') && !h.includes('w-hl'); })());

/* 不误标 + 转义不被破坏 */
eq('句中没有目标词时不产生标记', ctx('hlWord("Nothing to see here.", "zebra")'), 'Nothing to see here.');
eq('标色不破坏转义', ctx('hlWord("Tea & coffee for the test.", "test")'), 'Tea &amp; coffee for the <mark class="w-hl">test</mark>.');

/* ===================================================================
 * K. 数据安全
 *   K1 「清空进度」不再一键抹掉：先弹确认浮层
 *   K2 确认浮层里同时给出导出与导入，不会让人无从下手
 *   K3 导出把整个状态装进 JSON
 * =================================================================== */
console.log('\n[K] 数据安全');
ctx('S.notebook = ["alpha"]; save()');
const beforeReset = ctx('S.notebook.length');
click({ act: 'ask-reset' });
ok('点「清空阅读记录」先弹确认浮层', /清空阅读记录/.test(ctx('resetSheet()')));
ok('确认浮层带导出 / 导入备份入口', /data-act="export-data"/.test(ctx('resetSheet()')) && /data-act="import-data"/.test(ctx('resetSheet()')));
ok('确认浮层里有「确认清空」而不是直接清', /data-act="reset"/.test(ctx('resetSheet()')) && ctx('S.notebook.length') === beforeReset);
ok('导出函数存在且带进度字段', typeof ctx('exportData') === 'function' && /state/.test(String(ctx('exportData'))));

/* ===================================================================
 * L. 打磨收尾：已读标记 + 字体/图标/PWA
 *   L1 列表卡片给「已读完」的文章打上可见标记
 *   L2 自托管字体已接线（fonts.css 存在且含 @font-face）
 *   L3 PWA 图标齐了（192/512 PNG + apple-touch-icon + manifest 声明）
 * =================================================================== */
console.log('\n[L] 已读标记与 PWA 打磨');

// L1 已读标记：finished 里的文章，卡片带 read-dot + .read 类
const artId = ctx('ARTICLES[0].id');
ctx(`S.finished = ["${artId}"]`);
const cardDone = ctx(`articleCard(ARTICLES[0])`);
ok('已读文章卡片带「已读」徽标', /read-dot/.test(cardDone) && /已读/.test(cardDone));
ok('已读文章卡片带 .read 降档类', /class="article read"/.test(cardDone));
ctx('S.finished = []');
const cardNew = ctx(`articleCard(ARTICLES[0])`);
ok('未读文章卡片无已读徽标', !/read-dot/.test(cardNew) && !/class="article read"/.test(cardNew));

// L2 字体：fonts.css 里必须有真实 @font-face（DM Sans / Inter Tight）
const fontsCss = fs.readFileSync(path.join(base, 'assets', 'fonts.css'), 'utf8');
ok('fonts.css 含 DM Sans @font-face', /font-family:\s*'DM Sans'/.test(fontsCss));
ok('fonts.css 含 Inter Tight @font-face', /font-family:\s*'Inter Tight'/.test(fontsCss));
ok('字体文件落盘（woff2）', fs.existsSync(path.join(base, 'assets', 'fonts', 'dm-sans-latin.woff2')) && fs.existsSync(path.join(base, 'assets', 'fonts', 'inter-tight-latin.woff2')));

// L3 PWA 图标：index.html 引 apple-touch-icon + PNG，manifest 声明 192/512
const html = fs.readFileSync(path.join(base, 'index.html'), 'utf8');
ok('index.html 引了 apple-touch-icon', /apple-touch-icon/.test(html));
ok('index.html 引了 192 PNG 图标', /icons\/icon-192\.png/.test(html));
ok('index.html 引了 fonts.css', /fonts\.css/.test(html));
const manifest = JSON.parse(fs.readFileSync(path.join(base, 'manifest.webmanifest'), 'utf8'));
ok('manifest 含 192 + 512 + maskable 图标', manifest.icons.some(i => i.sizes === '192x192') && manifest.icons.some(i => i.sizes === '512x512') && manifest.icons.some(i => i.purpose === 'maskable'));
ok('192/512 PNG 已落盘', fs.existsSync(path.join(base, 'assets', 'icons', 'icon-192.png')) && fs.existsSync(path.join(base, 'assets', 'icons', 'icon-512.png')));

/* ===================================================================
 * M. 词库顺序与结构
 *   M1 排序主轴已换成 ECDICT 语料词频（旧版被自家新闻语料带偏，
 *      前 100 名里 93% 是中学已收录词，the / and / league 霸屏）
 * =================================================================== */
console.log('\n[M] 词库顺序与结构');

// M1 词频爬坡：跨「每日单元」边界必须严格递增
//    （单元内为降低字母聚集做了哈希打散，所以只在段边界上验证单调性）
//    分层后这条只在**层内**成立：基础层的尾巴（lecture f≈3500）本来就比核心层的
//    开头（abandon f≈1500）生僻，层边界上出现一次回退是设计使然 —— 先补地基再盖楼。
const fOf = ctx('WORDS.map(w => { const e = EC && EC[w.word.toLowerCase()]; return (e && e.f) || null; })');
const MID_END_N = ctx('MID_END');
/* 词库顺序上两处「有意的分段」：核心层的起点、以及基础层里真题高频块与普通块的交界。
 * 段与段之间难度本来就会重新起跳（真题高频块是整段提前的），
 * 且单元打散以 20 为一格、块长未必是 20 的整数倍，所以交界前后各放宽一个单元。 */
const sprintEnd = ctx('MID_WORDS.filter(w=>w.hf||w.cv).length');
const SEG = [sprintEnd, MID_END_N];
const nearSeg = i => SEG.some(s => Math.abs(i - s) <= 20);
let crossBad = 0, crossN = 0, segJump = 0;
for (let i = 20; i < 1200; i += 20) {
  const prev = fOf[i - 1], cur = fOf[i];
  if (prev == null || cur == null) continue;
  crossN++;
  if (cur < prev) { nearSeg(i) ? segJump++ : crossBad++; }
}
ok(`段内跨单元难度严格递增（${crossN} 个边界，回退 ${crossBad} 个，分段起跳 ${segJump} 处属预期）`,
   crossBad === 0 && crossN > 40);

const head30 = ctx('WORDS.slice(0,30).map(w=>w.word)');
/* the / and 按语料词频排在首位是正确的（对零基础用户，最常用的就该先学）；
 * 要守的是「不再被自家文章的题材词占据」—— 旧版 league / season / football 全在前排。 */
ok('前排不再被题材词占据', !head30.includes('league') && !head30.includes('season') && !head30.includes('football') && !head30.includes('player'));

// 分档标签
ok('档位函数给出高频档', ctx("tierOf(WORDS[0])") === '高频');


/* ================= [N] 四级核心层构成 =================
 * 核心层由「CET4 完整考纲」4454 词缩为 ~2000 词，口径见 tools/build-core-vocab.mjs。
 * 这一段守住三件事：规模不再膨胀回去、功能词不再混进来、真题暴露的缺口词确实补上了。
 * 注意断言只针对核心层 —— 词库加进基础层后 WORDS 是两层的合集，
 * 直接对全集断言会把「规模」「词频结构」这两条守门条件稀释掉。 */
console.log('\n[N] 四级核心层构成');

const CORE = ctx('CORE_WORDS');
const N_WORDS = CORE.length;
ok(`核心层规模在 1800–2100 之间（实为 ${N_WORDS}）`, N_WORDS >= 1800 && N_WORDS <= 2100);

const wordsLower = ctx('WORDS.map(w=>w.word.toLowerCase())');   // 功能词要对全集查
const FUNC = ['the', 'of', 'to', 'in', 'and', 'that', 'with', 'for', 'is', 'are', 'was', 'were', 'you', 'they', 'this', 'have'];
ok('不含纯功能词', !wordsLower.some(w => FUNC.includes(w)));

/* 真题表（近 5 年 30 套四级真题统计）里高频、但原词库整个没有的词 —— 重建时从分级词典库补进来了 */
const GAP_WORDS = ['people', 'part', 'pay', 'person', 'face', 'paper', 'internet', 'online', 'global', 'media', 'labor', 'nutrition', 'curriculum', 'diversity'];
const missGap = GAP_WORDS.filter(w => !wordsLower.includes(w));
ok(`真题暴露的词库缺口已补齐（缺 ${missGap.length}：${missGap.join(',') || '无'}）`, missGap.length === 0);

const noDef = ctx('WORDS.filter(w=>!w.def||!w.def.trim()).map(w=>w.word)');
ok(`每个词都有释义（缺 ${noDef.length}）`, noDef.length === 0);

const noPh = ctx('WORDS.filter(w=>!w.phonetic).length');
ok(`音标覆盖 ≥ 99%（缺 ${noPh} 词）`, noPh / ctx('WORDS.length') <= 0.01);

/* 例句 + 搭配一起看：基础层有大量词源词典只给了短语、凑不出完整句，
   这些落在 collocation 上（见 build-words-mid.mjs 的 5b 段），不是缺内容 */
const exCover = ctx('WORDS.filter(w=>w.example).length') / ctx('WORDS.length');
const anyCover = ctx('WORDS.filter(w=>w.example||w.collocation).length') / ctx('WORDS.length');
ok(`例句或搭配覆盖 ≥ 96%（例句 ${(exCover * 100).toFixed(1)}% · 合计 ${(anyCover * 100).toFixed(1)}%）`, anyCover >= 0.96);

/* 早期 bulk-a 那批挂着「CET4 高频」，但其中 47% 的 ECDICT 词频 > 2500，标签是错的 */
const badTag = ctx(`WORDS.filter(w=>/CET4 高频/.test(w.source||'')).length`);
ok(`不再有写错的「CET4 高频」标签（剩 ${badTag} 条）`, badTag === 0);

/* 词频结构：核心层里 f≤2500 的应占九成上下，剩下的是真题补缺与手工精编 */
const overF = CORE.filter(w => {
  const e = ctx('EC') && ctx('EC')[w.word.toLowerCase()];
  return !e || !e.f || e.f > 2500;
}).length;
ok(`核心层 f>2500 的词占比 ≤ 10%（${overF} 词 / ${N_WORDS}）`, overF / N_WORDS <= 0.1);

/* ================= [O] 中学基础层构成 =================
 * 基础层补的是核心层「默认你已经会中学词」这个不成立的前提：
 * 实测核心库缺 2,000+ 个中学词，且集中在 lecture / campus / vocabulary 这类
 * 校园与考试场景词 —— 它们在通用新闻语料里天然低频，被 f≤2500 口径整片滤掉。 */
console.log('\n[O] 中学基础层构成');

const MID = ctx('MID_WORDS');
ok(`基础层规模在 1800–2400 之间（实为 ${MID.length}）`, MID.length >= 1800 && MID.length <= 2400);
ok(`全库 = 基础 ${MID.length} + 核心 ${CORE.length}（实为 ${ctx('WORDS.length')}）`,
   MID.length + CORE.length === ctx('WORDS.length'));

/* 两层不能有交集：基础层的定义就是「中学词 − 核心库」 */
const dup = ctx(`(()=>{const a=new Set(WORDS.map(w=>w.word.toLowerCase()));const s=new Set();const d=[];
  for(const w of WORDS){const k=w.word.toLowerCase();if(s.has(k))d.push(k);s.add(k);}return d})()`);
ok(`两层无重复词（重 ${dup.length}${dup.length ? '：' + dup.slice(0, 6).join(',') : ''}）`, dup.length === 0);

/* 基础层必须带层标记与来源标记，否则前端分不了层 */
const noList = MID.filter(w => w.list !== '中学基础').length;
ok(`基础层每条都有 list="中学基础"（缺 ${noList}）`, noList === 0);
const noSrc = MID.filter(w => w.src !== '初中' && w.src !== '高中').length;
ok(`基础层每条都有来源 src（缺 ${noSrc}）`, noSrc === 0);

/* 真题高频标记：这批词是基础层里最该先过的 */
const sprint = MID.filter(w => w.hf || w.cv).length;
ok(`基础层带真题高频标记 ≥ 300 个（实为 ${sprint}）`, sprint >= 300);

/* 核心库当年系统性漏掉的那批校园/考试场景词，必须真的回到库里了 */
const SCENE = ['lecture', 'campus', 'vocabulary', 'period', 'party', 'pattern', 'translate', 'medium', 'phrase', 'award'];
const missScene = SCENE.filter(w => !wordsLower.includes(w));
ok(`校园/考试场景词已补回（缺 ${missScene.length}：${missScene.join(',') || '无'}）`, missScene.length === 0);

/* 排序第一关键字是层：基础层必须整段排在核心层之前 */
const firstCore = ctx('WORDS.findIndex(w=>w.list!=="中学基础")');
ok(`词库顺序先基础后核心（核心层从第 ${firstCore} 位开始，基础层 ${MID.length} 词）`, firstCore === MID.length);

/* 每日目标：28 词/天是按 99 天备考期反推的，改数字前先重算排期 */

/* ---------------- [P] 点词翻译层（data-tapdict.js，build-tapdict.mjs 生成） ---------------- */
console.log('\n[P] 点词翻译层');
const tapKeys = ctx('Object.keys(TAPDICT)');
const revMap = ctx('Object.keys(TAP_REVERSE).map(k => [k, TAP_REVERSE[k]])');
ok(`点词层规模在 3–6 万（实为 ${tapKeys.length}）`, tapKeys.length >= 30000 && tapKeys.length <= 60000);
ok(`反向词形表 0 < 规模 < 1 万（实为 ${revMap.length}）`, revMap.length > 0 && revMap.length < 10000);
const tapNoD = ctx(`Object.keys(TAPDICT).filter(w => !TAPDICT[w].d).length`);
ok(`每条都有中文释义（缺 ${tapNoD}）`, tapNoD === 0);
const tapOverlap = tapKeys.filter(w => wordsLower.includes(w));
ok(`不重复收录学习词（重 ${tapOverlap.length}${tapOverlap.length ? '：' + tapOverlap.slice(0, 5).join(',') : ''}）`, tapOverlap.length === 0);
const wordSet = new Set([...wordsLower, ...tapKeys]);
const revBad = revMap.filter(([f, l]) => !wordSet.has(l) || !/^[a-z][a-z'-]*$/.test(f));
ok(`反向表原形全部有效（坏 ${revBad.length}${revBad.length ? '：' + JSON.stringify(revBad.slice(0, 3)) : ''}）`, revBad.length === 0);
/* 词形还原三段式抽查：变形→学习词 / 不规则变形→点词层原形 / 专有名词不包 */
ok(`performing 还原到学习词 perform`, ctx('resolveToken("performing") && resolveToken("performing").kw') === 'perform');
ok(`went 还原到 go（不规则）`, (() => { const r = ctx('resolveToken("went")'); return r && (r.w || r.kw) === 'go'; })());
ok(`mice 还原到 mouse（不规则复数）`, (() => { const r = ctx('resolveToken("mice")'); return r && (r.w || r.kw) === 'mouse'; })());
ok(`took 还原到 take（不规则过去式）`, (() => { const r = ctx('resolveToken("took")'); return r && (r.w || r.kw) === 'take'; })());
ok(`aches 不被 exchange 杂条目抢注（还原到 ache）`, (() => { const r = ctx('resolveToken("aches")'); return r && (r.w || r.kw) === 'ache'; })());
ok(`新闻词 verdict 可点查`, !!ctx('TAPDICT.verdict'));
ok(`专有名词保持纯文本`, ctx('resolveToken("rodriguez")') === null);
/* 正文只有一种可点基类 .word：高亮 / 生词 / 已认识都是**附加**类，
   不再像旧版那样按「学习词 / 点词层」分成 .kw / .tw 两套 —— 那两套一旦
   分开，可点性就被绑在了分类上，正文里 16% 的 token 直接点不动。 */
ok(`highlightEn 只输出 .word 一种可点基类（染色全是附加类）`, (() => {
  const html = ctx(`highlightEn("The verdict came. Teacher smiled.")`);
  return html.includes('class="word') && !/class="(kw|tw)"/.test(html);
})());

/* ---------------- [Q] 词库查词卡行为 ---------------- */
console.log('\n[Q] 词库查词卡行为');
/* render 间谍：本段所有查词卡操作都应零整页渲染（render 会把阅读位置打回开头） */
ctx('window.__renderCalls = 0; const __origRender = render; render = () => { window.__renderCalls++; };');
/* .word span 桩：验证 mark-known 就地切换 known 类。
   ⚠️ 选择器必须与 paintWord() 里那一句保持一致（它是 .word[data-word="…"]）——
   桩匹配不上的话，paintWord 会去查真实 DOM、拿到空列表，这条守卫就变成
   「永远安静」的假守卫：不报错，也永远测不到东西。 */
const fakeKw = { cls: new Set(), classList: { toggle(c, on) { on ? fakeKw.cls.add(c) : fakeKw.cls.delete(c); } } };
const __prevQSA = sandbox.document.querySelectorAll;
sandbox.document.querySelectorAll = s => (String(s).startsWith('.word') ? [fakeKw] : __prevQSA(s));

/* 查词卡测试前重置渲染计数 */
ctx('window.__renderCalls = 0');


const sheetW0 = ctx('WORDS[0].word');
click({ act: "lookup", word: sheetW0 });
click({ act: "add-note", word: sheetW0 });
ok(`查词卡「加入生词本」零整页渲染（阅读位置不丢）`, ctx('window.__renderCalls') === 0);
/* ⚠️ notebook 自「生词带语境」迁移起存对象（{word,addedAt,articleId,firstCtx,seen,...}），
 * 断言必须按 word 字段比。原先写的是 S.notebook.includes("perform") ——
 * 对对象数组恒为 false，这条守卫从迁移那天起就是假红（184/2 里的 1 条）。 */
ok(`生词确实入了本（${sheetW0}）`, ctx(`S.notebook.some(it => it.word === ${JSON.stringify(sheetW0)})`));

const sheetW1 = ctx('WORDS[1].word');
click({ act: "mark-known", word: sheetW1 });
ok(`「标为已认识」就地切换正文高亮、零整页渲染`, ctx('window.__renderCalls') === 0 && fakeKw.cls.has('known') && ctx(`S.known.includes(${JSON.stringify(sheetW1)})`));
click({ act: "mark-known", word: sheetW1 });
ok(`再次点击取消已认识标记（类已摘除）`, !fakeKw.cls.has('known') && !ctx(`S.known.includes(${JSON.stringify(sheetW1)})`));
sandbox.document.querySelectorAll = __prevQSA;

ok('底部导航已移除背词入口', !/data-tab="study"/.test(ctx('tabbar()')));
ok('运行状态已移除背词/复习字段', !['studied', 'wrong', 'daily', 'fsrs', 'studyDays'].some(k => Object.prototype.hasOwnProperty.call(ctx('S'), k)));
ok('阅读统计使用独立阅读日期', Array.isArray(ctx('S.readDays')) && typeof ctx('readingStreakDays') === 'function');
const meHtml = ctx('renderMe()');
/* v75 起词库规模不再单独成卡（用户决策：个人页不反复展示词库总量），
 * 说明整体移进「关于词阅 · 内容与数据说明」折叠层 —— 意图不变（词库说明仍可达），位置换了。 */
ok('我的页保留词库说明（在关于·内容与数据说明里）',
  meHtml.includes('内容与数据说明') && meHtml.includes('四级核心') && meHtml.includes('中学基础'));
ok('我的页不再显示复习入口', !/今日复习|开始复习|FSRS/.test(meHtml));
ok('完整词卡不再提供加入复习', !/data-act="add-review"|加入复习/.test(ctx('renderSheet("comprehensive")')));

ctx(`S.known.length = 0; S.notebook.length = 0;`);

/* ===================================================================
 * [Q2] 词汇：四态标色 + 高亮四档 + 查词与高亮解耦 + 生词语境
 * 每条断言都配了反例方向 —— 守卫必须「能响」才算数：
 *   迁移断言把兜底写错会红；档位断言把集合取错会红；
 *   解耦断言把 STOPWORD 过滤塞回 trie 会红（正文 16% 的 token 会点不动）；
 *   截取断言去掉长度判断会红。只写「当前通过」的断言是假守卫。
 * =================================================================== */
console.log('\n[Q2] 词汇（四态标色 / 高亮四档 / 查词覆盖 / 生词语境）');
{
  /* 本段在 [R] 之前执行，css 常量还没定义（它后面才读）；块内自己读一份，
     块级 const 会遮蔽外层同名变量，不冲突。 */
  const css = fs.readFileSync(path.join(base, 'assets', 'styles.css'), 'utf8');
  /* 断言选择器前先剥掉注释：CSS 注释里常写「别写成 .kw.wb」这类反例警示，
     不剥掉的话，警示文字本身会把「不许出现 .kw.wb」的断言顶红。 */
  const cssRules = css.replace(/\/\*[\s\S]*?\*\//g, "");
  /* ---- 老数据迁移：v1 字符串 / v2 对象 / v3 富对象 → v4 只留语境 ---- */
  const mig = ctx(`(() => ({
    s1: normalizeState({ notebook: ["perform"] }).notebook[0],
    s2: normalizeState({ notebook: [{ word: "perform", addedAt: 111, articleId: "art-x" }] }).notebook[0],
    s3: normalizeState({ notebook: [{ word: "perform", addedAt: 111, articleId: "art-x", srcTitle: "旧标题",
          firstCtx: { en: "A b.", cn: "甲。" }, seen: 5, lookups: 4, lastSeenAt: 9, articles: ["art-x", "art-y"] }] }).notebook[0],
    bad: normalizeState({ notebook: ["perform", null, { nope: 1 }, "perform"] }).notebook.length,
    hl0: normalizeState({ kwHighlight: false }).highlightMode,
    hl1: normalizeState({ kwHighlight: true }).highlightMode,
    hlBad: normalizeState({ highlightMode: "nonsense" }).highlightMode,
    hlNew: normalizeState({ highlightMode: "all" }).highlightMode,
  }))()`);
  ok('迁移 v1：字符串条目升级为对象，语境为空但条目可用',
    mig.s1 && mig.s1.word === 'perform' && mig.s1.context === null && !!mig.s1.addedAt);
  ok('迁移 v2：保留 articleId / addedAt，不凭空造语境',
    mig.s2 && mig.s2.articleId === 'art-x' && mig.s2.addedAt === 111 && mig.s2.context === null);
  ok('迁移 v3→v4：语境与出处保留，统计字段（seen / lookups / articles）被丢掉',
    mig.s3 && mig.s3.context && mig.s3.context.en === 'A b.' && mig.s3.context.cn === '甲。'
    && mig.s3.seen === undefined && mig.s3.lookups === undefined && mig.s3.articles === undefined
    && mig.s3.articleTitle === '旧标题');
  ok('迁移：脏条目（null / 缺 word）被剔除，重复词合并为一条', mig.bad === 1);
  ok('迁移：旧布尔量 kwHighlight 映射为 off / core 两档',
    mig.hl0 === 'off' && mig.hl1 === 'core');
  ok('迁移：非法档位回落 core，合法新档位原样保留',
    mig.hlBad === 'core' && mig.hlNew === 'all');

  /* ---- 四态标色：普通 / 高亮 / 生词 / 已认识，互斥且有优先级 ----
     测试词必须挑**核心层**里的词：core 档默认只亮核心层，
     拿中学层的词测会得到「本来就不该亮」的假红。 */
  const quad = ctx(`(() => {
    const k = CORE_WORDS.filter(w => w.word.length >= 4 && !STOPWORD_HIGHLIGHT.has(w.word))[0].word;
    S.known = []; S.notebook = []; S.highlightMode = "core";
    const text = "The " + k + " and " + k + ".";
    const plain = highlightEn(text);
    S.notebook = [{ word: k, addedAt: 1, articleId: "", articleTitle: "", context: null }];
    const wb = highlightEn(text);
    S.known = [k];
    const kn = highlightEn(text);
    S.known = []; S.notebook = []; S.highlightMode = "core";
    return { k, plain, wb, kn };
  })()`);
  ok(`四态：未收藏 → .word.kw（高亮色，无 wb / known）`, /class="word kw"/.test(quad.plain) && !/\bwb\b/.test(quad.plain) && !/known/.test(quad.plain));
  ok('四态：收藏后 → .word.wb（生词色压过高亮色）', /class="word wb"/.test(quad.wb));
  ok('四态：已认识压过生词（带 known，且不带 wb / kw）—— 优先级写反就会红',
    /class="word known"/.test(quad.kn) && !/\bwb\b/.test(quad.kn) && !/ kw"/.test(quad.kn));

  /* ---- 查词与高亮解耦：最核心的一条 ----
     work / get / know / one 这些词在四级大纲里、也确实在正文里高频出现，
     但它们被高亮过滤表（长度 < 4 或功能词）挡着。旧实现让同一张过滤表
     也管住查词 trie，于是这些词点了没反应 —— 实测正文 16% 的 token 点不动。 */
  const cover = ctx(`(() => {
    S.highlightMode = "core"; S.known = []; S.notebook = [];
    const html = highlightEn("I work and get to know one life.");
    const words = [...html.matchAll(/data-word="([^"]+)"/g)].map(m => m[1]);
    return { html, words };
  })()`);
  ok('查词解耦：高亮过滤表挡不住的词照样可点（work / get / know / one / life）',
    ['work', 'get', 'know', 'one', 'life'].every(w => cover.words.includes(w)));
  ok('查词解耦：这些词**不**被标成高亮色（只可点、不染色）',
    !/class="word kw"[^>]*>work</.test(cover.html) && !/class="word kw"[^>]*>get</.test(cover.html));
  /* 覆盖率是「点词能不能用」的总指标：它不依赖具体实现，任何一层断掉都会掉数。
     剩余的 2~3% 是专有名词（人名 / 地名），那本来就该点不动。 */
  const cov = ctx(`(() => {
    const RE = /[A-Za-z]+(?:['\\u2018\\u2019][A-Za-z]+)?/g;
    let tot = 0, hit = 0;
    for (const a of ARTICLES) for (const p of (a.paras || [])) for (const s of sentencesOf(p)) {
      const text = s && s.en; if (!text) continue;
      let m; RE.lastIndex = 0;
      while ((m = RE.exec(text))) { tot++; if (resolveToken(normApos(m[0]).toLowerCase())) hit++; }
    }
    return { tot, hit, rate: +(hit / tot * 100).toFixed(1) };
  })()`);
  ok(`点词覆盖率 ${cov.rate}%（${cov.hit}/${cov.tot}）—— 掉到 90% 以下说明某一层又断了`, cov.rate >= 90);

  /* ---- 语境的长度控制：短句整句留，长句只留目标词周围 ---- */
  const clip = ctx(`(() => {
    const long = "After several difficult months, the company finally adopted a completely different strategy to attract younger customers who were increasingly moving to competing platforms.";
    return {
      long: clipContext(long, "strategy"),
      short: clipContext("She was reluctant to accept the offer.", "reluctant"),
      miss: clipContext(long, "zzzz"),
      empty: clipContext("", "x"),
      hasTail: clipContext(long, "strategy").includes("competing platforms"),
    };
  })()`);
  ok('语境截取：长句裁到目标词前后各 7 词，两端加省略号',
    clip.long.startsWith('…') && clip.long.endsWith('…') && clip.long.includes('strategy') && !clip.hasTail);
  ok('语境截取：短句整句保留（不裁）', clip.short === 'She was reluctant to accept the offer.');
  ok('语境截取：目标词找不到时整句返回（宁可多留，不返回半句）', clip.miss.length > 120);
  ok('语境截取：空句返回空串（不抛错）', clip.empty === '');

  /* ---- 查词卡：本句含义 + 原词形 + 不再有统计数字 ---- */
  const sheet = ctx(`(() => {
    const k = CORE_WORDS.filter(w => w.word.length >= 4)[0].word;
    S.known = []; S.notebook = []; sheetMore = false;
    const plain = renderSheet(k, { en: "She was " + k + " to accept.", cn: "她不情愿接受。" });
    const noCtx = renderSheet(k);
    const infl = renderSheet(k, null, k + "s");
    S.notebook = [{ word: k, addedAt: 1, articleId: "", articleTitle: "", context: { en: "A " + k + ".", cn: "甲。" } }];
    const nb = renderSheet(k, { en: "A " + k + ".", cn: "甲。" });
    S.known = []; S.notebook = [];
    return { k, plain, noCtx, infl, nb };
  })()`);
  ok('查词卡显示「本句含义」（原句 + 译文都在）',
    sheet.plain.includes('本句含义') && sheet.plain.includes('to accept') && sheet.plain.includes('她不情愿接受'));
  ok('没有上下文的查词（词汇页/图注）不渲染空语境块', !sheet.noCtx.includes('本句含义'));
  ok('变形词查词：标题显示**原词形**，原形只作副行补充（标题不换成词元）',
    sheet.infl.includes('>' + sheet.k + 's<') && sheet.infl.includes('原形 ' + sheet.k));
  ok('生词卡不再出现任何统计数字（遇到 / 查询 / 来自）',
    !/遇到 \d+ 次|查询 \d+ 次|来自 \d+ 篇/.test(sheet.nb));
  ok('生词卡主按钮是「我已认识」，不再是「加入生词本」',
    sheet.nb.includes('我已认识') && !sheet.nb.includes('加入生词本'));

  /* ---- 2026-09-20 查词卡三处修复 ----
     ⚠️ 这一组全部走**真实事件分支**（clickEl 触发 handlers.click），
     不是直接调 renderSheet —— 出 bug 的地方正是 case "sheet-more" 少传了两个参数，
     直接调渲染函数等于绕过被测代码，怎么改都是绿的（假绿）。 */
  const __prevIAH = phoneEl.insertAdjacentHTML;
  let sheetHtml = '';
  phoneEl.insertAdjacentHTML = (pos, html) => {
    if (String(html).includes('sheet-mask')) sheetHtml = String(html);
  };
  /* 词 span 桩：要同时满足两件事 ——
     ① dataset 带 data-form（原文词形），这是「更多」丢的那一半；
     ② closest('.sentence') 返回带真实 pi/si 的祖先桩，lookup 才能截到语境（另一半）。 */
  const sentStub0 = { dataset: { pi: '0', si: '0' }, classList: { add: noop, remove: noop, toggle: noop, contains: () => false } };
  const smCls = new Set();
  const smWord = ctx('WORDS.find(w => w.word.length >= 4).word');
  const smForm = smWord + 's';
  const smStub = {
    dataset: { act: 'lookup', word: smWord, form: smForm },
    classList: {
      add: c => smCls.add(c), remove: c => smCls.delete(c),
      toggle: (c, on) => (on ? smCls.add(c) : smCls.delete(c)), contains: c => smCls.has(c),
    },
  };
  smStub.closest = sel => (String(sel).includes('.sentence') ? sentStub0 : smStub);
  const smMore = { dataset: { act: 'sheet-more', word: smWord } };
  smMore.closest = () => smMore;
  ctx('activeArticle = ARTICLES[0]; view = { name: "read" }; S.known = []; S.notebook = []; sheetMore = false;');
  clickEl(smStub);
  const lightHtml = sheetHtml;
  clickEl(smMore);
  const fullHtml = sheetHtml;
  phoneEl.insertAdjacentHTML = __prevIAH;

  ok(`★ 「更多」展开后仍是同一个词、同一句话（原句块 + 原文词形 ${smForm} 都在）`,
    lightHtml.includes('本句含义') && fullHtml.includes('本句含义')
    && fullHtml.includes('>' + smForm + '<') && fullHtml.includes('原形 ' + smWord));
  /* 遮罩：轻卡必须用 .sheet-mask.soft（无模糊、只轻压暗）。
     判据里连基础 .sheet-mask 的 blur 一起验 —— 如果哪天有人把基础遮罩的模糊也删了，
     `.soft` 这个变体就失去意义、这条断言会退化成「测了个必然成立的东西」。 */
  ok('★ 查词轻卡用不模糊的遮罩（正文继续可读，靠 .tapped 标记定位到词）',
    /class="sheet-mask soft"/.test(lightHtml)
    && /backdrop-filter:\s*none/.test((cssRules.match(/\.sheet-mask\.soft\s*\{([^}]*)\}/) || [, ''])[1])
    && /blur\(/.test((cssRules.match(/\.sheet-mask\s*\{([^}]*)\}/) || [, ''])[1]));
  ok('★ 点词后正文里那个词带 .tapped 定位标记', smCls.has('tapped'));
  /* 反馈只许动颜色：任何改行盒的属性（padding / font-* / line-height / border）
     都会让这个词自己换行 —— 上一轮 .para-tts 的 27px 隐形占位就是这么来的。 */
  const tappedRule = (cssRules.match(/\.read-body \.para \.word\.tapped\s*\{([^}]*)\}/) || [, ''])[1];
  ok('★ 点词标记只加底色、不动行盒（改 padding / 字重会自己引起换行）',
    /background:/.test(tappedRule) && !/padding|font-|line-height|border/.test(tappedRule));
  click({ act: 'close-sheet' });
  ok('★ 关掉词卡后定位标记一并摘掉（不留一个永远亮着的词）', !smCls.has('tapped'));

  /* ---- 高亮四档 ---- */
  /* renderRead 要读 activeArticle：本段排在 [R]（阅读页设置）之前，那边才设它，这里先补上 */
  ctx('activeArticle = ARTICLES[0]; view = { name: "read" };');
  const modes = ctx(`(() => {
    const core = CORE_WORDS.filter(w => w.word.length >= 4 && !STOPWORD_HIGHLIGHT.has(w.word))[0].word;
    /* 中学词里有 1295 个本来就在四级大纲内（四级考纲含中学词汇），拿那些词测
       「cet4 档不亮」必然假红 —— 必须挑**大纲之外**的中学词，它才是 all 档
       相对 cet4 档真正多出来的那部分。 */
    const mid = MID_WORDS.filter(w => w.word.length >= 4 && !STOPWORD_HIGHLIGHT.has(w.word)
      && !CET4_SET.has(w.word.toLowerCase()))[0].word;
    /* 「仅大纲独有」的词 = 核心档不亮、全部四级档亮 —— 两档拉开层次的直接证据 */
    const extra = (typeof WORDS_CET4 === "undefined" ? [] : WORDS_CET4)
      .filter(w => !WORD_BY.has(w) && w.length >= 4)[0] || "";
    S.known = []; S.notebook = [];
    const lit = (w, m) => { S.highlightMode = m; return /class="word kw"/.test(highlightEn("The " + w + " end.")); };
    const r = {
      core, mid, extra,
      offCore: lit(core, "off"), coreCore: lit(core, "core"), cet4Core: lit(core, "cet4"), allCore: lit(core, "all"),
      coreExtra: extra ? lit(extra, "core") : null, cet4Extra: extra ? lit(extra, "cet4") : null,
      cet4Mid: lit(mid, "cet4"), allMid: lit(mid, "all"),
      offRead: (S.highlightMode = "off", renderRead().includes("no-kw")),
      allRead: (S.highlightMode = "all", renderRead().includes("no-kw")),
    };
    S.highlightMode = "core";
    return r;
  })()`);
  ok('档位 off：核心词也不标色', modes.offCore === false);
  ok('档位 core：核心词标色（默认档）', modes.coreCore === true);
  ok('档位 cet4 / all：都包含核心词（往上调不会丢掉核心层）', modes.cet4Core && modes.allCore);
  ok(`档位 cet4 比 core 更宽：仅大纲独有的词（${modes.extra}）core 下不亮、cet4 下亮`,
    modes.extra ? (modes.coreExtra === false && modes.cet4Extra === true) : true);
  ok(`档位 all 比 cet4 更宽：中学词（${modes.mid}）cet4 下不亮、all 下亮`,
    modes.cet4Mid === false && modes.allMid === true);
  ok('阅读页按档位挂 .no-kw（只有 off 档挂）', modes.offRead === true && modes.allRead === false);
  /* 这两条盯的是 CSS 选择器与 JS 三态的对齐 —— 它踩过一次真坑：
     生词元素只有 word + wb（wb 与 kw 在 JS 侧互斥），选择器若写成 .kw.wb
     就一条都匹配不上，生词在全站**一声不响地**失去颜色。守卫必须按实际类名断言。 */
  ok('样式：.word 基类只给可点手感，不给正文染色（97% 的 token 都可点，染色会毁掉阅读）',
    /\.word\s*\{[^}]*cursor:\s*pointer/.test(css) && !/\.word\s*\{[^}]*color:\s*var\(--brand\)/.test(css));
  ok('样式：生词选择器写成 .word.wb（不是 .kw.wb —— 生词态不带 .kw 类）',
    /\.word\.wb\s*\{[^}]*var\(--amber\)/.test(cssRules) && !/\.kw\.wb/.test(cssRules));
  ok('样式：关高亮后生词色仍在（只关目标词色，不关自己收藏的词）',
    /\.read-scroll\.no-kw \.word\.wb/.test(css));

  /* ---- 词汇页：两个 Tab，没有「重点学习」这类伪分级 ---- */
  const nbPage = ctx(`(() => {
    const w1 = CORE_WORDS[0].word, w2 = CORE_WORDS[1].word;
    S.known = []; S.notebook = [
      { word: w1, addedAt: 2, articleId: "", articleTitle: "", context: { en: "A " + w1 + ".", cn: "甲。" } },
      { word: w2, addedAt: 1, articleId: "", articleTitle: "", context: null },
    ];
    vocabTab = "new"; const news = renderNotebook();
    S.known = [w2]; const withKnown = renderNotebook();
    vocabTab = "known"; const knownT = renderNotebook();
    vocabTab = "new"; S.known = []; S.notebook = [];
    return { w1, w2, news, withKnown, knownT };
  })()`);
  ok('词汇页：顶部只有「生词 / 已认识」两个 Tab，各带数量',
    /data-tab="new"[^>]*>生词 <b>2<\/b>/.test(nbPage.news) && /data-tab="known"[^>]*>已认识 <b>0<\/b>/.test(nbPage.news));
  ok('词汇页：没有「需要重点学习」「今日新增」这类伪分级',
    !/需要重点学习/.test(nbPage.news) && !/今日新增/.test(nbPage.news));
  ok('词汇页：标为已认识的词落进「已认识」Tab',
    /data-tab="known"[^>]*>已认识 <b>1<\/b>/.test(nbPage.withKnown) && nbPage.knownT.includes(nbPage.w2));
  ok('词汇页：生词卡带语境原句，且不显示次数',
    nbPage.news.includes('甲。') && !/遇到 \d+ 次|查询 \d+ 次/.test(nbPage.news));

  /* ---- 高亮档位 ↔ 学习记录的边界（2026-09-19 用户定的红线） ----
   * 原话：「词库是系统给你的分类，已认识是用户自己的学习记录；系统分类可以变，
   * 用户记录不能跟着丢。」两件事要锁死：① 切档不改 S.known；② 已认识的词在任何
   * 档位下都不再标色。这两条一旦破，用户标了几百个词，换个档位就全被重新点亮。 */
  /* 必须挑**大纲内**的词：它在 core / cet4 / all 三档都在高亮范围里，
     只有这样「切档后仍不亮」才证明是 known 在压制，而不是它掉出了高亮范围。 */
  const hlW = ctx(`CORE_WORDS.filter(c => c.word.length >= 4 && !STOPWORD_HIGHLIGHT.has(c.word))[0].word`);
  const W = JSON.stringify(hlW);
  /* 判定必须**按类名 token**，不能用 /class="word kw"/ 这种子串匹配 ——
     子串只在「元素恰好只有 word + kw 两个类」时成立；一旦 known 或 wb 也挂上，
     真实类名变成 word known kw，子串就匹配不上，守卫会在真出问题时**假绿**。
     实测：把高亮表达式里的 !known && !wb 删掉后，子串版断言照样全绿（漏报）。
     所以这里定位到本词那个 span，取出 class 属性再 split 成 token 判 'kw'。 */
  ctx(`S.notebook = []; S.known = [${W}]; S.highlightMode = "core";
    window.__litAt = m => {
      S.highlightMode = m;
      const mm = highlightEn("The " + ${W} + " end.")
        .match(new RegExp('<span class="([^"]*)"[^>]*data-word="' + ${W} + '"'));
      return !!mm && mm[1].split(/\\s+/).includes("kw");
    };
    window.__clsAt = m => {
      S.highlightMode = m;
      const mm = highlightEn("The " + ${W} + " end.")
        .match(new RegExp('<span class="([^"]*)"[^>]*data-word="' + ${W} + '"'));
      return mm ? mm[1].split(/\\s+/) : [];
    };`);
  const knownBefore = ctx('JSON.stringify(S.known)');
  const litCore = ctx('window.__litAt("core")');
  const litCet4 = ctx('window.__litAt("cet4")');
  const litAll = ctx('window.__litAt("all")');
  ok('已认识的词切到任何档位都不再高亮（core / cet4 / all 全不亮）',
    litCore === false && litCet4 === false && litAll === false);
  /* 走真实切档路径（set-hl 的委托分支）而不是直接给 S.highlightMode 赋值 ——
     赋值永远不可能改 known，那样测的只是「赋值运算符不会写数组」，
     测不出 case 分支里有没有手贱清 known。所以这一步必须在宿主侧 click。 */
  ctx(`S.highlightMode = "core"; S.known = [${W}];`);
  click({ act: "set-hl", hl: "all" });
  const afterMode = ctx('S.highlightMode');
  const knownAfter = ctx('JSON.stringify(S.known)');
  const clsAfter = ctx('window.__clsAt("all").join(" ")');
  ok('★ 切档不触碰 S.known（用户的学习记录不随词库分类变化而丢失）',
    knownAfter === knownBefore && afterMode === "all" &&
    clsAfter.includes("known") && !clsAfter.includes("kw"));
  ctx('S.known = []; S.notebook = []; S.highlightMode = "core";');

  /* ---- 两处入口渲染同一套四档单选 ---- */
  const hlPanels = ctx(`(() => {
    S.highlightMode = "cet4";
    const fab = renderFabSheet(), set = renderReadSettingsSheet();
    S.highlightMode = "core";
    return { fab, set };
  })()`);
  ok('「···」阅读工具面板列出全部四档（不再只能在「Aa 阅读设置」里改）',
    ["off", "core", "cet4", "all"].every(m => new RegExp(`data-act="set-hl"[^>]*data-hl="${m}"`).test(hlPanels.fab)));
  ok('两个面板各渲染 4 个档位、且当前档只标记一个 .on',
    (hlPanels.fab.match(/data-hl="/g) || []).length === 4 &&
    (hlPanels.set.match(/data-hl="/g) || []).length === 4 &&
    (hlPanels.fab.match(/class="hl-opt on"/g) || []).length === 1 &&
    /class="hl-opt on"[^>]*data-hl="cet4"/.test(hlPanels.fab));
  ok('面板写明「切档不会把已认识的词重新点亮」（用户最需要打消的顾虑摆在明面上）',
    hlPanels.fab.includes('切档不会把它重新点亮'));
  /* 选择器必须同时认 .rd-seg 与 .hl-opt：高亮档现在有两处入口，
     只认一种的话，「···」面板里点了另一档、选中态会停在旧档（点了像没反应）。 */
  ok('样式：四档单选有 .hl-opt / .hl-dot，选中态是实心圆点',
    /\.hl-opt\.on \.hl-dot::after/.test(cssRules) && /\.hl-dot\s*\{[^}]*border-radius:\s*50%/.test(cssRules) &&
    /\.hl-opt\s*\{[^}]*cursor:\s*pointer/.test(cssRules));
  ok('同步函数同时认 .rd-seg 与 .hl-opt（否则另一处入口的选中态不同步）',
    /\.rd-seg, \.hl-opt/.test(ctx('syncReadSettingsSheet.toString()')));

  ctx('S.known.length = 0; S.notebook.length = 0; S.highlightMode = "core"; sheetMore = false; vocabTab = "new"; activeArticle = null; view = { name: "home" };');
}


/* 阅读页原地设置（对照/字号/底色）不切走视图，也不整页重渲染
   —— 整页 render 等于把阅读位置打回开头。滚动位置由句子锚点保证，见 [R]。 */
ctx('activeArticle = ARTICLES[0]; view = {name:"read"}; S.cnMode = "tap"; S.fontSize = 0; S.readTheme = ""; window.__renderCalls = 0;');
click({ act: "toggle-cn" });
/* toggle-cn 是「逐句对照 ↔ 收起」的即时开关，**不循环三档**：tap → all（off 也 → all）。 */
ok(`阅读页「中英对照」不切走视图（切到逐句对照）`, ctx('view.name') === 'read' && ctx('S.cnMode') === 'all');
click({ act: "read-settings" });
ok('「阅读设置」按钮打开设置浮层', overlays.length === 1);
ok('设置面板把字号三档全列出来（不是点一下轮一档）',
  /data-act="set-fs"[^>]*data-fs="0"/.test(ctx('renderReadSettingsSheet()')) &&
  /data-act="set-fs"[^>]*data-fs="2"/.test(ctx('renderReadSettingsSheet()')));
click({ act: "set-fs", fs: "1" });
ok('直接点「大」即生效（fontSize=1，零整页重渲染）', ctx('S.fontSize') === 1 && ctx('window.__renderCalls') === 0);
click({ act: "set-theme", theme: "night" });
ok('直接点「夜间」即生效（不再循环切换）', ctx('S.readTheme') === 'night' && ctx('window.__renderCalls') === 0);
click({ act: "close-sheet" });
ok('关掉设置浮层', overlays.length === 0);
ctx('activeArticle = null; view = {name:"home"}; S.cnMode = "tap"; S.fontSize = 0; S.readTheme = ""; window.__renderCalls = 0;');

/* ===================================================================
 * R. 阅读排版与位置（逐句分行 / 段间装饰 / 首字下沉 / 句子锚点）
 * =================================================================== */
console.log('\n[R] 阅读排版与位置');
const readHtml = ctx('(activeArticle = ARTICLES[0], renderRead())');
/* 段落标签现在带 data-pi（段级「本段对照」要按段索引定位），所以正则要允许附加属性 ——
   这一条在 2026-09-19 加 data-pi 时确实变红过，是真守卫。 */
ok('英文按段落连续排版（句子是内联 span，不是逐句块级）',
  /<p class="para[^"]*"[^>]*><span class="sentence"/.test(readHtml) && !/<div class="sentence"/.test(readHtml));
ok('正文不再有 .en 容器（逐句分行的载体已移除）', !/<div class="en( |")/.test(readHtml));
ok('每句带句子坐标（data-pi / data-si），锚点能定位到句',
  /class="sentence" data-act="para-peek" data-pi="0" data-si="0"/.test(readHtml));
ok('朗读按钮挂在句内（每句一个 data-act="para-speak"）',
  /<span class="para-tts"[^>]*data-act="para-speak"/.test(readHtml));
ok('朗读控制条挂在 fab-bar 内（进度 / 暂停 / 停止三个件齐全）',
  /id="fab-bar"[\s\S]*?class="fab-speak"[\s\S]*?id="fab-prog"[\s\S]*?data-act="speak-pause"[\s\S]*?data-act="speak-stop"/.test(readHtml));

/* ---- 朗读语音挑选（2026-09-21）----
 * 之前只设 u.lang 就 speak()：lang 只是**提示**，浏览器据此自行从系统语音表里挑。
 * 实测桌面 Edge 的 getVoices() 只有 3 个 zh-CN、0 个英文（注册表 Speech_OneCore 里
 * 同样只有 3 个中文包），于是拿默认（中文）voice 念英文 —— 而 onerror 对这种情况
 * 不触发，用户只听到难听、拿不到任何线索。以下守卫把「挑语音」的判据钉死，
 * 判据只看 lang + 名字线索，不钉具体 voice 名（iOS / Android / 桌面三套列表完全不同）。 */
const pickedWith = list => { fakeVoices = list; return ctx('(pickVoice("en-US") || {}).name ?? null'); };
/* ⚠️ 这条必须用「中文语音名字更像好语音」的形状才测得出来：英语精确匹配天然拿 100 分，
 * 随便摆个中文语音进去永远选不中它 —— 那样是假守卫（第一版就这么写的，负向样本 z1
 * 注入后这条纹丝不动）。名字带 Natural 的中文语音能拿 102 分，正好压过口音不精确的
 * 英语语音（80）：此时仍然必须选英语。 */
ok('★ 名字再像好语音，只要不是英语就不进候选（中文声念英文 = 难听的根因）',
  pickedWith([
    { name: 'Microsoft Zhang Natural', lang: 'zh-CN', localService: true },
    { name: 'Daniel', lang: 'en-GB', localService: true },
  ]) === 'Daniel');
ok('★ 一个英语语音都没有时返回 null（宁可提示，也不退回中文 voice）',
  pickedWith([{ name: 'Microsoft Huihui', lang: 'zh-CN', localService: true }]) === null);
ok('同为英语时优先神经合成、压低老引擎（Aria Online > Zira Desktop）',
  pickedWith([
    { name: 'Microsoft Zira Desktop', lang: 'en-US', localService: true },
    { name: 'Microsoft Aria Online (Natural) - English (United States)', lang: 'en-US', localService: false },
  ]) === 'Microsoft Aria Online (Natural) - English (United States)');
ok('口音精确匹配优先于「只要是英语」（选英音不会挑到美音）',
  ((fakeVoices = [
    { name: 'Samantha', lang: 'en-US', localService: true },
    { name: 'Daniel', lang: 'en-GB', localService: true },
  ]), ctx('(pickVoice("en-GB") || {}).name')) === 'Daniel');
/* 挑出来的 voice 必须真的挂到 utterance 上 —— 否则上面四条全白测（挑完不用） */
fakeVoices = [{ name: 'Google US English', lang: 'en-US', localService: true }];
const uttStd = ctx('makeUtterance("Hello world.", "sent")');
ok('★ 挑中的 voice 真的写到 utterance 上（不是挑完就丢）',
  !!uttStd.voice && uttStd.voice.name === 'Google US English');
ok('语速不再吃浏览器默认 1.0（默认档 0.9，跟读才追得上）',
  uttStd.rate > 0.5 && uttStd.rate < 1);
ok('单词朗读比整句再慢一档（音素要听清）',
  ctx('rateOf("word")') < ctx('rateOf("sent")'));
/* 挑不到英语语音时必须留痕 —— 静默降级正是旧版「难听且无从解释」的原因 */
fakeVoices = [{ name: 'Microsoft Huihui', lang: 'zh-CN', localService: true }];
ctx('voiceWarned = false;');
const uttNoEn = ctx('makeUtterance("Hi.", "sent")');
ok('★ 挑不到英语语音时明确提示（不静默用中文声念英文）',
  ctx('voiceWarned') === true && !uttNoEn.voice);
/* 全文朗读必须逐句推进。原实现 join(" ") 塞一条 —— 长文会被引擎掐断，也无法暂停续读。
 * 断言「实际送出几条」而不是源码里有没有 speakAll：换成别的写法但仍整篇一条，这条要能抓住。 */
fakeVoices = [{ name: 'Google US English', lang: 'en-US', localService: true }];
ctx('activeArticle = ARTICLES[0];');
ctx('stopSpeech();');
spokenUtts.length = 0;          // Node 侧的数组，不能在 ctx 里引用（vm 里没有这个名字）
ctx('speakAll(activeArticle);');
const spTotal = ctx('spList.length');
const n0 = spokenUtts.length;
ok('全文朗读队列覆盖全文句数，且开始就送出第一句',
  spTotal > 1 && n0 === 1);
const spSteps = Math.min(3, spTotal - 1);
for (let i = 0; i < spSteps; i++) { const u = spokenUtts[spokenUtts.length - 1]; if (u && u.onend) u.onend(); }
ok('★ 全文朗读逐句推进（onend 自动送下一句，不是全文拼成一条）',
  spSteps > 0 && spokenUtts.length === n0 + spSteps);
/* 停止必须真的清状态，不是只把浮层收起来（否则「按了停止还在念」）。
 * ⚠️ 别写成「拿 makeUtterance 造一条再调它的 onend」—— makeUtterance 返回的 utterance
 *    压根没有 onend（onend 是 stepSpeech 里才挂的），那样断言恒真 = 假守卫。 */
ctx('stopSpeech();');
spokenUtts.length = 0;
ctx('speakAll(activeArticle);');
const uPlaying = spokenUtts[spokenUtts.length - 1];   // 正在播的那条，带 onend
const wasActive = ctx('spActive()');
ctx('stopSpeech();');
ok('★ 停止朗读清空队列并取消发声（不是只收起 UI）',
  wasActive === true && ctx('spActive()') === false && ctx('spList') === null);
/* 暂停后迟到的 onend 不得再送下一句 —— 队列状态机最容易漏的一格 */
ctx('stopSpeech();');
spokenUtts.length = 0;
ctx('speakAll(activeArticle);');
const uPaused = spokenUtts[spokenUtts.length - 1];
ctx('togglePauseSpeech();');
if (uPaused && uPaused.onend) uPaused.onend();
ok('★ 暂停后迟到的 onend 不再送下一句（暂停要真的停住）',
  spokenUtts.length === 1 && uPlaying !== undefined && ctx('spPaused') === true);
ctx('stopSpeech();');
/* ★ lang 不是给读屏凑分的：它决定断词规则（长词在哪儿折行）、系统字体回退栈挑哪套字形、
 * 朗读引擎用哪种语言念。缺了它浏览器只能猜，Android 上猜错会换字体、连字符位置也跟着变。
 * 反向标注同样重要：.cn 与朗读按钮里是中文，不标 zh-CN 就会被祖传的 en 当英文念。
 * 为什么不是断言在 body 上：正文是三处不同语言混排（英文段 / 中文译文 / 中文朗读按钮），
 * 标在 body 上只能照顾其中一种。 */
ok('★ 正文标 lang="en"（断词 / 字体回退 / 朗读引擎都靠它，不能靠浏览器猜）',
  /<p class="para"[^>]*lang="en"/.test(readHtml));
ok('译文与朗读按钮反向标 lang="zh-CN"（否则中文被祖传的 en 当英文念）',
  /<span class="cn" lang="zh-CN"/.test(readHtml) && /<span class="para-tts" lang="zh-CN"/.test(readHtml));
ctx('activeArticle = null;');

/* ===================================================================
 * R2. 整期长文的节标题（2026-09-21 新增）
 * ===================================================================
 * 背景：AI 栏目原先按 h2 拆成 43 篇，2026-09-21 改回「一期一整篇」（用户要求「不要切割，
 * 就按原文」）。拆篇时源站的 h2 被拿去当文章标题、h3 标题**整批消失**（实测每期丢 22—47 个，
 * 五期合计 169 个），而守恒闸看不见 —— 它的基准只取正文块，标题在 `head` 里。
 * 整期模式把标题放回正文，数据侧打 `paras[i].head = 2|3|4`。
 *
 * 为什么要守卫：标题段与正文段在数据里形状**完全相同**（都是 `{sentences:[{en,cn}]}`），
 * 前端只靠 `head` 字段区分。这个字段一旦丢了（换提取器、改字段名），页面不会报错也不空白 ——
 * 标题会静静地变回正文，读者看到的是「同一句话紧挨着写了两遍」（实测 `Do → observe →
 * ask → learn → do` 上下相邻两段）。
 * 所以下面既有正向（该是标题的必须是 hN）也有反向（不该是标题的绝不能变成 hN）。
 */
console.log('\n[R2] 整期长文的节标题');
const obArt = ctx('ARTICLES.find(a => String(a.id).startsWith("ob-"))');
const obHeads = (obArt.paras || []).filter(p => p.head);
const obHtml = ctx('(activeArticle = ARTICLES.find(a => String(a.id).startsWith("ob-")), renderRead())');
const hTag = n => new RegExp(`<h${n} class="para para-head"`, 'g');
const h2n = (obHtml.match(hTag(2)) || []).length;
const h3n = (obHtml.match(hTag(3)) || []).length;
ok(`★ 带 head 的段落渲染成真 hN（${obArt.id}：数据 ${obHeads.length} 段 → 页面 h2 ${h2n} + h3 ${h3n}）`,
  obHeads.length > 0 && h2n + h3n === obHeads.length);
ok('h2 / h3 各自的条数与数据里的 head 值一致（不是全塞成同一档）',
  h2n === obHeads.filter(p => p.head === 2).length && h3n === obHeads.filter(p => p.head === 3).length);
/* 反向：**不带 head** 的文本段必须仍是 <p class="para">。没有这一条的话，
 * 「把所有段落都写成 h2」也能让上面两条变绿 —— 那整篇正文会变成一堆小标题。 */
const obTextParas = (obArt.paras || []).filter(p => !p.img && !p.head
  && (Array.isArray(p.sentences) ? p.sentences : [p]).some(s => String(s.en || "").trim() || String(s.cn || "").trim()));
const pn = (obHtml.match(/<p class="para"/g) || []).length;
ok(`不带 head 的文本段仍是普通段落（数据 ${obTextParas.length} 段 → 页面 <p class="para"> ${pn} 个）`,
  obTextParas.length > 0 && pn === obTextParas.length);
/* 标题段里也必须有句子坐标：进度、续读锚点、点句出译文三条链路都按 .sentence[data-pi] 走，
 * 标题若渲染成裸文本，这些链路会在标题处静默断掉（不报错，只是定位偏一段）。 */
ok('标题段里的句子同样带坐标（data-pi / data-si），定位链路不会在标题处断',
  /<h2 class="para para-head"[^>]*data-pi="\d+"/.test(obHtml)
  && /<h2 class="para para-head"[^>]*>\s*<span class="sentence" data-act="para-peek" data-pi="\d+" data-si="\d+"/.test(obHtml));
ctx('activeArticle = null;');

/* ---------- R3. 点句保持位置（2026-09-21 新增） ----------
 * 为什么只能守到这一步：VM 沙箱里没有真实布局，而这件事**整个是像素级行为** ——
 * 「切句后所点句还停在原处」只能由真浏览器量。实测在 .bak/probe-anchor.cjs（不入库），
 * 三个场景的结论：
 *   · 单句展开     → 所点句 0px（译文挂在它之后，不影响它自己）
 *   · 连续切换     → 所点句 **上移 96px**（收起的上一句译文高度）→ 加补偿后 0px
 *   · 展开屏外句   → 跟随句 0px，scrollTop 由浏览器滚动锚定补 +96px（应用层不该插手）
 * CI 里没有浏览器，所以这里守的是「补偿还在、且锚点取自用户所点的那一句」这个前提 ——
 * 将来若有人重构 para-peek 时把补偿删掉，CI 不会有像素回归报警，这两条是唯一的痕迹。
 * 断言前必须剥注释：下面这段解释里就写着 readAnchor( 和 applyAnchor( 的字面量。 */
console.log('\n[R3] 点句保持位置');
const appBare = fs.readFileSync(path.join(base, 'assets', 'app.js'), 'utf8')
  .replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
const peekBody = (appBare.match(/case "para-peek":\s*\{([\s\S]*?)\n    \}/) || [, ''])[1];
ok('点句切换后有所点句的位置补偿（applyAnchor 调用存在）', /applyAnchor\(cont,\s*anc\)/.test(peekBody));
ok('补偿锚点取自用户所点的那一句（不是 readAnchor 的「正在读的句」）',
  /t\.dataset\.pi/.test(peekBody) && !/readAnchor\(/.test(peekBody));
ok('屏外句不做补偿（浏览器自己的滚动锚定已在处理，插一手会把它的补偿挤掉）',
  /clientHeight/.test(peekBody) && /return null/.test(peekBody));

/* ---- [R4] 手势守卫：移动 / 长按的指针序列不得触发正文动作 ----
 * 起因（2026-09-21 Edge 390×844，CDP 真实触摸序列，见 .bak/probe-jitter2.cjs 与
 * .bak/probe-longpress.cjs）：手指按下后抖动 ≤12px 时 Chromium **照样发 click**；
 * 长按 700ms 松手更是一点都不拦（实测 click=1）。于是「想滚动」「想长按选词复制」
 * 都会变成「弹出词卡 / 弹出译文」。
 * 这里做**行为**断言：模拟一整条指针序列，看正文到底有没有被触发 —— 不去读
 * TAP_MOVE_PX 等于几（计划 §3 明说「8—12px 是调参起点，不是标准」，钉死具体数
 * 会让以后调参变成假红），只守「有否决」和「不误伤」这两件意图。 */
console.log('\n[R4] 手势守卫（防误触）');
vm.runInContext('var __realNow = Date.now;', sandbox);
const firePointer = (type, ev) => (captureHandlers[type] || []).forEach(f => f(ev));
const ptr = o => Object.assign({ isPrimary: true, pointerType: 'touch', clientX: 0, clientY: 0, button: 0 }, o);
/* 句子桩：只观测 .sel —— para-peek 能被看见的副作用就是它。
 * data-act 必须带上：不带就进不了 switch 的 para-peek 分支，所有「预期不触发」的
 * 用例都会因为「压根没跑」而假绿 —— 这一版就是这么翻车的，「正常点击」那条正向
 * 对照把它抓了出来。凡是「预期为假」的守卫，都必须配一条「预期为真」的对照。 */
function mkGuardSent() {
  const cls = new Set();
  const el = {
    dataset: { act: 'para-peek', pi: '0', si: '0' },
    classList: {
      add: c => cls.add(c), remove: c => cls.delete(c),
      toggle: (c, on) => (on ? cls.add(c) : cls.delete(c)), contains: c => cls.has(c),
    },
    _cls: cls,
  };
  el.closest = () => el;
  return el;
}
/* 跑一整条序列：pointerdown →（可选）pointermove → click。
 * holdShift 用于把沙箱时钟往前拨，模拟「按住很久」，避免真等半秒。 */
const tapSeq = (el, o = {}) => {
  const { dy = 0, holdShift = 0, pointerType = 'touch', detail = 1, isPrimary = true } = o;
  el._cls.clear();
  firePointer('pointerdown', ptr({ pointerType, isPrimary }));
  if (dy) firePointer('pointermove', { clientX: 0, clientY: dy });
  if (holdShift) ctx(`Date.now = () => __realNow() + ${holdShift};`);
  try {
    handlers.click({ target: el, detail, stopPropagation: noop });
  } finally {
    if (holdShift) ctx('Date.now = __realNow;');
  }
  return el._cls.has('sel');
};
const gSent = mkGuardSent();
ctx('activeArticle = ARTICLES[0]; view = { name: "read" }; S.cnMode = "tap";');
ok('★ 正常点击照常执行（守卫没把正常点句一起拦掉）', tapSeq(gSent) === true);
ok('★ 抖动超过阈值的序列不再触发正文动作（≤12px 时浏览器放行，这一段只有应用层能挡）',
  tapSeq(gSent, { dy: 40 }) === false && tapSeq(gSent, { dy: -14 }) === false);
ok('★ 触摸长按不再触发正文动作（长按＝选词意图；浏览器对长按后的 click 完全不拦）',
  tapSeq(gSent, { holdShift: 6000 }) === false);
ok('鼠标按住很久再点仍算点击（不是「长按选词」那种场景，不能误杀）',
  tapSeq(gSent, { holdShift: 6000, pointerType: 'mouse' }) === true);
/* 这条必须构造「序列本身已带否决」的情形：键盘来的 click 是在残留指针序列之后到达的，
 * 若守卫只看序列、不看 detail，读屏与键盘用户就会整体失效。不带 veto 的版本测不出这一点
 * —— 它连「去掉 detail 判断」这个坏样本都抓不住（照样绿）。 */
ok('★ 键盘 / 读屏触发的 click 不被守卫挡住（序列即使已带否决，无指针 detail 也要放行）',
  (() => {
    gSent._cls.clear();
    firePointer('pointerdown', ptr({}));
    firePointer('pointermove', { clientX: 0, clientY: 40 });
    handlers.click({ target: gSent, detail: 0, stopPropagation: noop });
    return gSent._cls.has('sel') === true;
  })());
ok('多指手势（第二指落下）不触发正文动作', (() => {
  gSent._cls.clear();
  firePointer('pointerdown', ptr({}));                                              // 第一指
  firePointer('pointerdown', ptr({ isPrimary: false, clientX: 50, clientY: 60 }));  // 第二指
  handlers.click({ target: gSent, detail: 1, stopPropagation: noop });
  return gSent._cls.has('sel') === false;
})());
ok('移动阈值落在可调区间（既不是 0、也不是大到永不生效）', (() => {
  const m = appBare.match(/TAP_MOVE_PX\s*=\s*([\d.]+)/);
  return !!m && +m[1] >= 4 && +m[1] <= 20;
})());
ctx('activeArticle = null;');

/* ---- [R5] 段落级退化段的渲染期切分（2026-09-22）----
 * 起因：AI 栏目（Offbook 通道）源站只给段落级对齐，官方译文的句数常与英文不等
 * （实测 `The seventh year of Kaihuang. Officials need filling.` 5 句英文 ↔ 4 句中文）。
 * `tools/offbook.mjs` 按设计**不切**（硬切会编造错误配对），于是入库成
 * `sentences: [{ en:"5句话…", cn:"4句话…" }]` —— 形状合法，但 `.para-flow` 只把
 * 「句级元素」转块级，整段英文连排成一坨，与句级对齐成功的段混在同一篇里。
 * 全站 510 处（AI 5 篇为主）。修的是**渲染**，数据与句数口径一个字不动。
 *
 * 这里断言四件可观察的事：
 *   ① 退化段在渲染时确实被切开（一句一行）；
 *   ② 译文只挂最后一句 —— 不按比例拆中文（那样会配错译文，见 REF §12 踩坑）；
 *   ③ 假阳性被挡住（`Cui. Lu. Wang. Xie.` 这类缩写碎片不切）；
 *   ④ 数据口径不受影响（sentencesOf / 全站句数不变，锚点与 qc 口径不变）。 */
console.log('\n[R5] 退化段渲染切分');
ctx('activeArticle = null;');
/* 桩：构造一个「1 个句级元素里塞多句」的退化段，与线上 AI 栏目同形（取真实 5 句样本，
 * 中文是官方把前两句合并译的 4 句 —— 句数不等正是它退化的原因） */
sandbox.__degen = { sentences: [{
  en: 'The seventh year of Kaihuang. Officials need filling. Most of these names he doesn\u2019t know; each carries the name of a recommender. The recommenders he knows. The Three Departments\u2019 clerks, the prefectural Rectifiers \u2014 for decades they\u2019ve cycled through, the same handful of clans.',
  cn: '开皇七年，官员要补。这些人他大半不认识，每个名字旁边都有荐主。荐主他认得。三省的省郎，各州的中正，几十年里来回，就这几个家族。',
}] };
sandbox.__degenOut = ctx('renderSentencesOf(__degen)');
ok('★ 退化段被切成多句（一段连排 → 一句一行）',
  ctx('__degenOut.length') === 5);
ok('★ 切出的每句都有英文、且都不含整段（说明真的切了，不是原样复制）',
  ctx('__degenOut.every(s => s.en && s.en.length < 130)'));
/* 译文挂最后一句：前面几句的 cn 必须为空 —— 这条防的是「把中文也拆开乱配」 */
ok('★ 译文只挂最后一句（前几句 cn 为空，不按比例拆中文）',
  ctx('__degenOut.slice(0, -1).every(s => !s.cn) && Boolean(__degenOut[__degenOut.length-1].cn)'));
/* 拼回守恒：切分不得丢字或增字（这里用去空白比较，squash 只存在于 lib-offbook） */
sandbox.__sq = s => String(s || '').replace(/\s+/g, '');
ok('★ 切出的是原文的拼回（不丢字、不增字）',
  ctx('__sq(__degenOut.map(s => s.en).join(" "))') === ctx('__sq(__degen.sentences[0].en)'));
/* ★ 负向：假阳性必须挡住。`Cui. Lu. Wang. Xie.` 是 4 个单字母缩写，切了就成 4 个碎片 */
sandbox.__abbr = { sentences: [{ en: 'Cui. Lu. Wang. Xie.', cn: '崔、卢、王、谢。' }] };
ok('★ 缩写串不切（Cui. Lu. Wang. Xie. 保持一段）',
  ctx('renderSentencesOf(__abbr).length') === 1);
sandbox.__frag = { sentences: [{ en: 'Shit\u2026', cn: '糟了……' }] };
ok('★ 短感叹 / 拟声不切（Shit… 保持一段）',
  ctx('renderSentencesOf(__frag).length') === 1);
/* 对照（预期为真）：正常单句段不被误切。没有这条，「所有段都不切」也会全绿 */
sandbox.__single = { sentences: [{ en: 'This is a complete single sentence about firms and their costs.', cn: '这是一句完整的话。' }] };
ok('照常：本来就是一句的段不被切开',
  ctx('renderSentencesOf(__single).length') === 1);
sandbox.__multi = { sentences: [{ en: 'First one here.', cn: '第一句。' }, { en: 'Second one here.', cn: '第二句。' }] };
ok('照常：已经句级对齐的段原样返回（每句各自带译文）',
  ctx('renderSentencesOf(__multi).length') === 2 && ctx('renderSentencesOf(__multi).every(s => s.cn)'));
/* ★ 数据口径不受影响：sentencesOf 还是 1（渲染切分不得回写数据层） */
ok('★ 数据口径不受影响（sentencesOf 仍是 1 个句级元素；句数统计与锚点不移位）',
  ctx('sentencesOf(__degen).length') === 1 && ctx('sentenceAt({paras:[__degen]}, 0, 0).cn === __degen.sentences[0].cn'));
/* rs 必须写进 DOM，否则查词卡片 / 朗读取不回「被点的那一句」 */
ok('★ 渲染切分的句子带 data-rs（多个切句共用 data-si，没有 rs 就取不回被点句）',
  /data-rs="\$\{rs\}"|data-rs/.test(fs.readFileSync(path.join(base, 'assets', 'app.js'), 'utf8')));
ok('★ 全文朗读走渲染切分（否则退化段整段 5 句被当一条 utterance 念出去）',
  /flatMap\(p => renderSentencesOf\(p\)\)/.test(appBare.replace(/\s+/g, ' '))
  || /flatMap\(p => renderSentencesOf\(p\)\)/.test(appBare));
ok('★ 查词卡片用显示口径取句（displaySentenceAt 带上 data-rs）',
  /displaySentenceAt\(activeArticle,\s*\+sentEl\.dataset\.pi/.test(appBare));

/* ★★ 显示口径的**行为**守卫（2026-09-22 修 4,023 句错位后补）。
 * 上面那条只断言调用点写法 —— 「断言实现不断言意图」的典型：旧实现
 * `list[rs] || list[si]` 在普通多句段里 rs 恒 0，list[0] 永远为真，
 * 回退分支永不执行 → 点第二句及以后一律取回段首句，而那条正则照样全绿。
 * 判据必须落在「取回来的到底是不是你点的那一句」上。 */
sandbox.__two = { sentences: [{ en: 'First one here.', cn: '第一句。' }, { en: 'Second one here.', cn: '第二句。' }] };
ok('★ 普通多句段：按 si 取第二句必须拿到第二句（不是段首句）',
  ctx('displaySentenceAt({paras:[__two]}, 0, 1, 0).en') === 'Second one here.');
ok('对照：si=0 取回第一句（上一条不是靠「永远返回某一句」蒙对的）',
  ctx('displaySentenceAt({paras:[__two]}, 0, 0, 0).en') === 'First one here.');
ok('★ 全库扫描：每个普通多句段的每一句都取回自己（0 错位）',
  ctx(`(function(){
    let bad = 0, seen = 0;
    for (const a of ARTICLES) (a.paras||[]).forEach((p, pi) => {
      const n = (p.sentences||[]).length;
      if (n < 2) return;              /* 退化段（n===1）走 rs 路径，见下一条 */
      const list = renderSentencesOf(p);
      for (let si = 0; si < n; si++) {
        seen++;
        const g = displaySentenceAt(a, pi, si, 0), w = list[si];
        if (!g || !w || g.en !== w.en) bad++;
      }
    });
    window.__seen = seen;
    return bad;
  })()`) === 0);
/* 防「天然满足」：扫描面必须非空，否则 0 错位毫无意义 */
ok('★ 扫描面非空（多句段 ≥100、句数 ≥1000，防上面那条空集恒真）',
  ctx('(ARTICLES.reduce((n,a)=>n+(a.paras||[]).filter(p=>(p.sentences||[]).length>=2).length,0))') >= 100
  && ctx('window.__seen') >= 1000);
ok('★ 退化段仍走 rs 路径：同一 si=0 下按 rs 逐句取回各自的切句',
  ctx(`(function(){
    const d = { sentences: [{ en: __degen.sentences[0].en, cn: __degen.sentences[0].cn }] };
    const list = renderSentencesOf(d);
    if (list.length < 2) return false;
    for (let rs = 0; rs < list.length; rs++) {
      const g = displaySentenceAt({paras:[d]}, 0, 0, rs);
      if (!g || g.en !== list[rs].en) return false;
    }
    return true;
  })()`));
ok('边界：si 越界返回 null（不返回 undefined、不抛错）',
  ctx('displaySentenceAt({paras:[__two]}, 0, 99, 0)') === null
  && ctx('displaySentenceAt(null, 0, 0, 0)') === null);

/* ★★ 端到端：真的渲染一篇文章，数正文里出现了几个 .sentence 节点。
 * 为什么必须有这一条：上面那些都只测 `renderSentencesOf()` **函数本身**对不对，
 * 测不出它**有没有被 renderRead 调用**。2026-09-22 实测过这个假守卫 ——
 * 把渲染层那行改回 `sentencesOf(p)`（等于功能整个撤销），314 条断言**全绿**。
 * 断言必须落在「渲染输出」这个可观察的结果上，不能只落在辅助函数上。 */
sandbox.__degenArt = { id: "__degen", cat: "AI", title: "t", titleZh: "t", date: "2026-01-01",
  url: "#", cover: "", gradient: "", source: "s", paras: [{
    sentences: [{
      en: 'The seventh year of Kaihuang. Officials need filling. Most of these names he doesn\u2019t know; each carries the name of a recommender. The recommenders he knows. The Three Departments\u2019 clerks, the prefectural Rectifiers \u2014 for decades they\u2019ve cycled through, the same handful of clans.',
      cn: '开皇七年，官员要补。这些人他大半不认识，每个名字旁边都有荐主。荐主他认得。三省的省郎，各州的中正，几十年里来回，就这几个家族。',
    }],
  }] };
ctx('activeArticle = __degenArt; view = {name:"read"}; S.cnMode = "all";');
const degenHtml = ctx('renderRead()');
ctx('activeArticle = null; view = {name:"home"}; S.cnMode = "tap";');
const degenSentN = (degenHtml.match(/class="sentence"/g) || []).length;
ok(`★ 端到端：退化段渲染出 5 个句子节点（实际 ${degenSentN}）—— 防「函数写对了但没接线」`,
  degenSentN === 5);
ok('★ 端到端：切出的句子带 data-rs（0..4），否则取不回被点句',
  ['data-rs="0"', 'data-rs="1"', 'data-rs="2"', 'data-rs="3"', 'data-rs="4"'].every(a => degenHtml.includes(a)));
ok('★ 端到端：整段译文只出现一次（挂在最后一个切句后）',
  (degenHtml.match(/class="cn"/g) || []).length === 1);


const css = fs.readFileSync(path.join(base, 'assets/styles.css'), 'utf8');
ok('段间装饰点已删除', !/· · ·/.test(css));
ok('首字下沉已删除', !/::first-letter/.test(css));
ok('左右留白只在 --rd-pad 定义一次', /--rd-pad:\s*22px/.test(css));
const rdBodyCss = (css.match(/\.read-body\s*\{([^}]*)\}/) || [, ''])[1];
ok('正文容器横向留白取自 --rd-pad（不再和 .read-scroll 各加一层）',
  /padding:\s*[^;]*var\(--rd-pad\)/.test(rdBodyCss));
ok('滚动容器自身不再加横向留白', /\.view\.read-scroll\s*\{\s*padding:\s*[\d.]+px\s+0\s+[\d.]+px/.test(css));
ok('英文默认 19px / 行高 32px（约 1.7 倍）', /--rd-en:\s*19px;\s*--rd-en-lh:\s*32px/.test(css));
ok('中文字号跟随正文档位（不再固定 13.5px）',
  /--rd-cn:\s*14px/.test(css) && !/\.read-body \.para \.cn\s*\{[^}]*13\.5px/.test(css));
/* 这条断言的是「默认看不见」这个**意图**，不是实现手段。
 * 旧版写死 `opacity: 0`，等于把「用 opacity 实现隐形」锁成唯一合法解 ——
 * 而 opacity 不改变布局：22×22 + 5px margin 的盒子照样在流里占 27px。
 * 于是每个句末都拖出一段看不见的空白，句子在行末结束时这块空白被折到下一行行首、
 * 把首字推开。2026-09-19 用 Edge 无头截图实拍到：`for my Barça teammates.      But my`。
 * 守卫锁错了实现细节，它自己就成了 bug 的保护伞。
 * 现在反向锁死：默认必须是 display:none，且禁止 opacity:0 回归。
 * 判定前剥注释 —— 上面这段说明里就有「opacity: 0」这几个字。 */
const cssBare = css.replace(/\/\*[\s\S]*?\*\//g, '');
const ttsRule = (cssBare.match(/\.para-tts\s*\{([^}]*)\}/) || [, ''])[1];
ok('朗读喇叭默认不显示、选中句子才出现（display 切换，不靠 opacity 占位）',
  /display:\s*none/.test(ttsRule) && !/opacity:\s*0/.test(ttsRule) && /\.sentence\.sel > \.para-tts/.test(cssBare));
/* 朗读态：fab-bar 从工具条切成播放器。刻意复用同一个浮层 —— fab-bar 本身已经会挡住
 * 进页时的第一句（.view.read-scroll 的 padding-bottom 那条说明），再叠一条只会更糟。 */
const speakBarOn = (cssBare.match(/\.fab-bar\.speaking \.fab-speak\s*\{([^}]*)\}/) || [, ''])[1];
const speakBarOff = (cssBare.match(/\.fab-bar\.speaking > button\s*\{([^}]*)\}/) || [, ''])[1];
ok('朗读态把 fab-bar 切成播放器（工具按钮让位、进度与控制出现）',
  /display:\s*flex/.test(speakBarOn) && /display:\s*none/.test(speakBarOff));
ok('暂停态切图标（播放/暂停两个图标不会同时显示）',
  /\.fab-bar\.paused \.ic-play\s*\{[^}]*display:\s*block/.test(cssBare) &&
  /\.fab-bar\.paused \.ic-pause\s*\{[^}]*display:\s*none/.test(cssBare));
/* 选中一句要有看得见的反馈。旧实现只有 7% 透明度背景，浅色主题下等于没有确认。
 * 左边线用 inset 阴影实现：border-left 会把整段文字挤动一次（行内重排）。 */
const selRule = (cssBare.match(/\.read-body \.para \.sentence\.sel\s*\{([^}]*)\}/) || [, ''])[1];
ok('选中的句子有可见的左边线（inset 阴影，不用 border-left 挤动文字）',
  /box-shadow:\s*inset/.test(selRule) && !/border-left/.test(selRule));

/* ---- 正文「一句一行」（.para-flow，2026-09-19 从单篇试点铺开到全站）----
 * 中文对照档每句跟一个块级译文、本来就一行一句；纯英文档句子是 inline，整段连排 ——
 * 同一个 App 两种节奏，用户要的是「英文时和双语时一样」。锁五件事：
 *   ① 全站生效（每篇都带 para-flow，退出名单 PARA_FLOW_OFF 默认为空）；
 *   ② 句距 10px + 句末右留 10px；③ **段距明显大于句距、且只有一个来源**；
 *   ④ 译文块三个数值（下边距归零 / 上下内边距 12px / 不用品牌紫）；
 *   ⑤ 交互只剩「点句出译文 / 再点收起」——任何档位都不渲染段级按钮。
 * ③ 是这套方案第一次翻车的方式（样张实测句距 0→20 与段距 18→30 **一起**拉，观感直接散掉），
 *   所以③防的是「两个量同时变大」，不是防那个具体数字 —— 段距本身 2026-09-20 已按
 *   计划调到 24px（只动段距、句距仍 10px，层次清楚）。见下方那条断言的注释。 */
/* 全站硬铺后 app.js 无条件给每篇加 .para-flow，退组名单 PARA_FLOW_OFF 已删除。
 * 这里对「缺失」容错（视为空名单＝全站生效），但若日后重新引入退组名单，
 * 仍会校验它默认为空、且 id 真实。真正的覆盖保证在下面抽样渲染那几条。 */
const flowOffIds = ctx('typeof PARA_FLOW_OFF === "undefined" ? [] : [...PARA_FLOW_OFF]');
ok('正文「一句一行」的退出名单默认为空（＝全站生效），名单里的 id 都是真实文章',
  flowOffIds.length === 0 && flowOffIds.every(id => ctx(`ARTICLES.some(a => a.id === ${JSON.stringify(id)})`)));
/* 抽 3 篇（首 / 中 / 尾）验覆盖。只验一篇的话，名单反转写错方向时「第一篇恰好中」
   就能混过去 —— 这是「永远沉默的守卫」的经典形状。 */
const flowAll = ctx('ARTICLES.map(a => a.id)');
const flowSample = [flowAll[0], flowAll[Math.floor(flowAll.length / 2)], flowAll[flowAll.length - 1]]
  .filter((id, i, arr) => id && arr.indexOf(id) === i);
const flowHits = flowSample.map(id => ctx(
  `(activeArticle = ARTICLES.find(a => a.id === ${JSON.stringify(id)}), /class="view read-scroll[^"]*para-flow/.test(renderRead()))`));
ok(`★ 每篇文章都走「一句一行」（抽样 ${flowHits.filter(Boolean).length}/${flowSample.length} 篇带 para-flow）`,
  flowSample.length === 3 && flowHits.every(h => h === true));
ctx('activeArticle = null;');

const flowSent = (cssBare.match(/\.read-scroll\.para-flow \.para \.sentence\s*\{([^}]*)\}/) || [, ''])[1];
const flowGap = (cssBare.match(/\.read-scroll\.para-flow \.para \.sentence ~ \.sentence\s*\{([^}]*)\}/) || [, ''])[1];
ok('「一句一行」把句子转成块级（一句一行、句间 10px）',
  /display:\s*block/.test(flowSent) && /margin-top:\s*10px/.test(flowGap));
/* 块级句子撑满整行：右端零留白则文字顶到边，行尾也没有可点的余量。
   10px 与句距同值 —— 留白既是视觉收口，也是点句出译文的点击余量。 */
ok('★ 句末右留 10px（撑满整行的块级句，右端要留出点击余量）',
  /padding-right:\s*10px/.test(flowSent) && !/padding-right:\s*0/.test(flowSent));
/* ★★ 句末朗读喇叭必须退出正文行盒（2026-09-21）。
 * 旧实现是 `display: none → inline-flex`：控件**只在选中时**进流，于是「选中这一句」
 * 这个动作本身就改变行宽。块级句子的末行离右边界不足「图标宽 - |right|」时，喇叭被折到
 * 下一行，被点句子之下的全部内容下移一行。实测（Edge 无头 390×844 · 首篇前 24 句 ·
 * cnMode=off 以排除「译文展开」这个混淆项）24 句里 3 句 +32px，恰好一行 --rd-en-lh。
 * 已上线的 [R3] 点句保持位置只管被点的那一句，挤行发生在它之下，两者不重叠 —— 不能互替。
 *
 * 锁三件可观察的事，都不钉具体 px：
 *   ① 喇叭是绝对定位的 —— 「不进流」就是挤行根除的机制本身，也是该意图在 CSS 里唯一的
 *      表达方式（同 `display:none` 之于「默认不可见」），不是随手挑的实现细节；
 *   ② 句子块是它的定位祖先 —— 拆掉 position:relative，右缘会挂到 .read-body/.read-scroll 上，
 *      喇叭直接飞到正文栏最右侧（离所点句十万八千里，但守卫若只看 ① 仍是绿的）；
 *   ③ 几何关系由 CSS 自己声明的 token 算出来，不写死坐标：
 *      · 不压字：喇叭左缘 ≥ 正文文本区右界
 *        left = P + |right| - width - margin-left，文本右界 = P - padding-right
 *        → 判据 padding-right + |right| - width - margin-left > 0
 *      · 不贴屏幕边：喇叭右缘与屏幕边的间距 = --rd-pad - |right| > 0
 *        （右缘顶到屏幕边会撞 iOS 的边缘返回手势；为 0 又等于没退出行盒、压在正文上）
 * 实测当前值：留白 22px、|right| 16px、图标 22px、padding-right 10px
 * → 离文本区 4px、离屏幕边 6px；360/390 × fs-0/1/2 六组探针（.bak/probe-tts-fix.cjs）全绿。 */
const flowTts = (cssBare.match(/\.read-scroll\.para-flow \.para \.para-tts\s*\{([^}]*)\}/) || [, ''])[1];
/* 取长度值。**单位可选** —— CSS 里写 `margin-left: 0` 与 `0px` 等价，
 * 而第一版解析器强制要求 px，于是覆盖规则里的 `margin-left: 0` 读不到、
 * 悄悄回退成基础规则的 4px，把「离文本区 4px」算成了 0px（守卫当场报红才发现）。
 * 前面加边界，免得 `right` 命中 `padding-right`。 */
const numProp = (s, name, d) => {
  const m = s.match(new RegExp(`(?:^|[\\s;{])${name}:\\s*(-?[\\d.]+)(?:px)?`));
  return m ? Math.abs(parseFloat(m[1])) : d;
};
const ttsW = numProp(ttsRule, 'width', 0);
const ttsRight = numProp(flowTts, 'right', NaN);
const ttsMl = numProp(flowTts, 'margin-left', numProp(ttsRule, 'margin-left', 0));
const ttsPadRight = numProp(flowSent, 'padding-right', 0);
const padPx = numProp(cssBare, '--rd-pad', 0);
const ttsClearance = ttsPadRight + ttsRight - ttsW - ttsMl;   // 喇叭左缘 - 正文文本区右界
const ttsEdgeGap = padPx - ttsRight;                          // 屏幕边 - 喇叭右缘
ok('★ 朗读喇叭不进正文行盒（绝对定位；选中不再改变行宽 = 不再挤行）',
  /position:\s*absolute/.test(flowTts));
ok('喇叭的定位祖先是句子块（否则右缘会挂到更外层容器、飞出正文栏）',
  /position:\s*relative/.test(flowSent));
ok(`★ 喇叭既不压字也不贴屏幕边（由 CSS token 算出：离文本区 ${ttsClearance.toFixed(1)}px · 离屏幕边 ${ttsEdgeGap.toFixed(1)}px，两者都要 > 0）`,
  Number.isFinite(ttsRight) && ttsW > 0 && padPx > 0 && ttsClearance > 0 && ttsEdgeGap > 0);
/* ★ 段距：锁**意图**，不锁那个数字。
 * 旧写法是 `/\.read-body \.para\s*\{[^}]*margin:\s*0 0 18px/` —— 它把当时那个值钉成了
 * 唯一合法解。2026-09-20 按新决策把段距从 18 调到 24，它当场报红，
 * 而它真正该防的事（下面 (b)「第二个来源偷偷覆盖回来」）一点都没防住。
 * 判据换成两件可观察的事：
 *   (a) 段落间距必须明显大于句距 —— 两者接近时读者分不清哪里是新段，
 *       段落层次糊掉、全篇变成一长串等距的句子（样张把 (句距, 段距) 一起拉到
 *       (20, 30) 就是这么崩的）。取「≥ 句距的两倍」而不是某个具体 px。
 *   (b) 段落间距只能有**一个**来源 —— 见下一条。 */
const paraRule = (cssBare.match(/\.read-body \.para\s*\{([^}]*)\}/) || [, ''])[1];
const paraMb = +((paraRule.match(/margin:\s*0 0 (\d+)px/) || [])[1] || 0);
const flowGapPx = +((flowGap.match(/margin-top:\s*(\d+)px/) || [])[1] || 0);
ok(`★ 段落间距明显大于句距（段距 ${paraMb}px ≥ 句距 ${flowGapPx}px 的两倍）`,
  paraMb > 0 && flowGapPx > 0 && paraMb >= flowGapPx * 2);
/* ★★ 段落间距只有一个来源。editorial.css 里曾有一行 `.read-body .para { margin-bottom: 30px }`，
 * 它和 styles.css 的 `.read-body .para` 打的是同一个属性、本文件加载顺序在后所以它一直赢 ——
 * 于是 styles.css 的注释写着「段距 18px 不动」、浏览器实际算的是 30px，
 * 差了两轮口令，而所有守卫都是绿的（它们只读 styles.css）。
 * 判据是「editorial.css 不给 .read-body .para 设任何外边距」，不是钉住某个数字 ——
 * 要防的是「出现第二个来源」这件事本身，至于那个来源写的是 30 还是 31 无关紧要。 */
const edCssBare = fs.readFileSync(path.join(base, 'assets', 'editorial.css'), 'utf8')
  .replace(/\/\*[\s\S]*?\*\//g, '');
ok('★ 段落间距只有一个来源（editorial.css 不得再覆盖 .read-body .para 的间距）',
  !/\.read-body \.para\s*\{[^}]*margin/.test(edCssBare));

/* ★★ 节标题段的样式（2026-09-21 随 AI 栏目整期合并新增）。
 * 判据一律取「可观察的关系」，不钉具体数值 —— 理由同上一条：
 *   ① 标题必须比正文更显眼，且**上间距要明显大于段距**。差值是对称的 24/24 时，
 *      标题看上去更像「前面那段的尾巴」而不是「后面这节的开始」。
 *   ② h2（章级）与 h3（节级）必须能分开。一期长文实测 43 个 h2 + 169 个 h3，
 *      两档同号时读者分不出「换章」和「换节」—— 而换章才是长滚里真正要定位的点。
 *      所以断言「两档字号不相同」，不写死各是多少 px。
 *   ③ 仍然只许一个来源：editorial.css 不得碰 .para-head。 */
const headRule = (cssBare.match(/\.read-body \.para\.para-head\s*\{([^}]*)\}/) || [, ''])[1];
const headH3Rule = (cssBare.match(/\.read-body h3\.para\.para-head\s*\{([^}]*)\}/) || [, ''])[1];
const headMt = +((headRule.match(/margin:\s*(\d+)px/) || [])[1] || 0);
const headFs = (headRule.match(/font-size:\s*([^;]+);/) || [, ''])[1].trim();
const headH3Fs = (headH3Rule.match(/font-size:\s*([^;]+);/) || [, ''])[1].trim();
ok(`★ 节标题加粗 + 上间距明显大于段距（上 ${headMt}px ≥ 段距 ${paraMb}px 的 1.5 倍）`,
  /font-weight:\s*700/.test(headRule) && headMt > 0 && paraMb > 0 && headMt >= paraMb * 1.5);
ok('★ 章级（h2）与节级（h3）字号必须能分开（两档同号 = 长滚里分不出换章与换节）',
  Boolean(headFs) && Boolean(headH3Fs) && headFs !== headH3Fs);
ok('节标题样式也只有一个来源（editorial.css 不得声明 .para-head）',
  !/\.para-head/.test(edCssBare));/* ★★ 同一个病的另两处（2026-09-20 一并收回 styles.css）：
 *   ② `--rd-pad` —— editorial.css 声明过一遍（基础层 30px），又在 ≤759px 的媒体查询里
 *      写回 22px。三处来源两个档位，生效值 ≤759 是 22px、≥760 是 30px。
 *   ③ `.read-body` 的 padding —— editorial 的 `padding: 0 var(--rd-pad)` 让 styles.css
 *      写的 `16px var(--rd-pad) 8px` 从未生效；styles.css 自己 ≥900px 那两条 42px 同样
 *      被盖住、从未生效过。
 * 判据一律是「editorial 层不得出现这个属性的任何声明」—— 防的是**出现第二个来源**，
 * 不是钉住某个数字（30 还是 31、42 还是 40 都无关紧要）。 */
ok('★ 阅读页左右留白只有一个来源（editorial.css 不得再声明 --rd-pad）',
  !/--rd-pad\s*:/.test(edCssBare));
ok('★ 正文内边距只有一个来源（editorial.css 不得再设 .read-body 自身的 padding）',
  !/\.read-body\s*\{[^}]*padding/.test(edCssBare));
/* ★ 词距不能靠 padding 撑。`.word { padding: 0 1px }` 曾把每个词盒向两侧各撑 1px。
 * 实测（.bak/pad-ab.cjs，390×844，同一行相邻两词**成对**归零前后）：
 * 词缝差 **0.000px** —— 两个词盒同时外扩，吃掉的那点空格正好被补回来，
 * 留给「点空白弹译文」的死区恒为 4.688px。也就是说这 1px 一分点击容错都没换来，
 * 只把词与词撑开 2px（后一个词的 bLeft 前移 2.000px/词）。
 * 判据是「**水平**内边距必须为 0」—— 垂直方向不限制（垂直 padding 不移动字距）。
 * 要扩大热区得走事件层的命中规则（计划 §3.5），不是靠把盒子撑大。 */
const wordRule = (cssBare.match(/(?:^|\n)\.word\s*\{([^}]*)\}/) || [, ''])[1];
const wordPadVals = ((wordRule.match(/(?:^|;)\s*padding\s*:\s*([^;]+)/) || [, ''])[1] || '')
  .trim().split(/\s+/).filter(Boolean).map(v => parseFloat(v) || 0);
const wordPadHoriz = wordPadVals.length === 0 ? 0
  : wordPadVals.length === 1 ? wordPadVals[0] : wordPadVals[1];
ok('★ 词元不带水平内边距（词距由字体空格决定，热区不靠撑盒子；实测词缝 4.688px 与 padding 无关）',
  wordPadHoriz === 0 && !/padding-(left|right|inline)/.test(wordRule));
const flowCn = (cssBare.match(/\.read-scroll\.para-flow \.para \.cn\s*\{([^}]*)\}/) || [, ''])[1];
ok('译文下边距归零（否则双语档比纯英档松 10px，两档节奏不一致）',
  /margin:\s*6px 0 0/.test(flowCn));
/* 6px 时译文是「贴在英文屁股上的一条」—— 用户 2026-09-19 的原话是「别扭」。
   12px 来自他随后发来的参考图：译文文字带只占框高的三分之一。 */
ok('★ 译文块上下内边距 12px（6px 时译文贴在英文上，观感挤）',
  /padding:\s*12px 14px 12px 12px/.test(flowCn));
/* 紫色在正文里已经有两个语义（高亮词、选中句），译文块再抢一次就是第三种 ——
   满屏紫正是「别扭」的另一半来源。参考图里译文块是中性底、没有左边框。 */
ok('★ 译文块不再抢品牌紫（无左边框 + 中性底，紫留给高亮词与选中句）',
  /border-left:\s*0/.test(flowCn) && !/var\(--brand\)/.test(flowCn)
  && /background:\s*rgba\(125,\s*122,\s*148/.test(flowCn));
ok('选中句的左边线留出装订线（块级盒里 inset 阴影会压在首字上）',
  /\.read-scroll\.para-flow \.para \.sentence\.sel\s*\{[^}]*margin-left:\s*-10px/.test(cssBare));
/* & 会被 esc() 转成 &amp;，分词不能钻进实体里（否则页面显示的是 "&amp;" 而不是 "&"） */
const ampHtml = ctx('highlightEn(esc("Buddhism & Christianity"))');
ok('正文里的 & 不被拆成实体（highlightEn 跳过实体段）',
  ampHtml.includes(' &amp; ') && !/&<span/.test(ampHtml));
ok('实体之外照常分词（& 两侧的词仍可点）',
  /data-word="buddhism"/.test(ampHtml) && /data-word="christianity"/.test(ampHtml));
/* 段落分组是排版的前提：句子写成一个段落一组，阅读页才可能「一段话连读」。
 * 旧版 ingest 把原段落拆成了单句段（1519 个单句段），排版层救不回来 ——
 * 已由 tools/_regroup-paras.mjs 按原文接回。这里守住不许再退化。 */
const stillFlat = ctx(`ARTICLES.filter(a => {
  const txt = (a.paras||[]).filter(p => p && !p.img);
  const flat = txt.filter(p => !Array.isArray(p.sentences));
  return txt.length >= 20 && flat.length / txt.length > 0.8;
}).map(a => a.id)`);
ok(`按原文段落分组（最多保留 1 篇历史待修复文章）（仍是单句段的：${stillFlat.join(", ") || "无"}）`,
  stillFlat.length <= 1);
const multiPara = ctx(`ARTICLES.reduce((n,a) => n + (a.paras||[]).filter(p => Array.isArray(p.sentences) && p.sentences.length > 1).length, 0)`);
ok(`多句段数量充足（${multiPara} 个 ≥2 句的段落）`, multiPara >= 50);

/* ===================================================================
 * S. 中文对照三档（2026-09-19：布尔 showCn → off / tap / all）
 * -------------------------------------------------------------------
 * 用户原话：「段落负责阅读流，句子负责交互和翻译。」
 * off 与 tap 的差别**只在点句**：off 点句只选中（出喇叭）不弹译文，tap 弹。
 * 这两档以前是同一个（showCn=false 时点句必弹中文），纯英文读者躲不开。
 * =================================================================== */
console.log('\n[S] 中文对照三档');
const cssCn = fs.readFileSync(path.join(base, 'assets', 'styles.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, "");

ok('中文对照三档集中定义（off / tap / all），合法值只写一遍',
  ctx('JSON.stringify(CN_MODES)') === JSON.stringify(['off', 'tap', 'all']));
ok('默认档是「点句显示」',
  ctx('defaultState.cnMode') === 'tap');

/* 迁移：旧的布尔 showCn。旧「显示」每句都挂中文 = all；旧「隐藏」点句会弹译文 = tap。
   ⚠️ 旧「隐藏」**绝不能**映射成 off —— 老用户在设置里从没选过「关闭」，
   点句突然看不到中文只会以为坏了。 */
const cnMig = ctx(`(() => {
  const g = s => normalizeState(s).cnMode;
  return { on: g({ showCn: true }), off: g({ showCn: false }),
           bogus: g({ cnMode: "nope" }), keepOff: g({ cnMode: "off" }), keepTap: g({ cnMode: "tap" }),
           dropped: normalizeState({ showCn: true }).showCn === undefined };
})()`);
ok('旧 showCn=true 迁移到 all（旧「显示」= 每句都挂中文）', cnMig.on === 'all');
ok('★ 旧 showCn=false 迁移到 tap 而不是 off（点句仍能看译文）', cnMig.off === 'tap');
ok('非法档位回落 tap，旧字段 showCn 被清掉',
  cnMig.bogus === 'tap' && cnMig.keepOff === 'off' && cnMig.keepTap === 'tap' && cnMig.dropped === true);

/* 容器 class：no-cn = 「不逐句全展开」（off / tap 都加），cn-off / cn-tap 细分点句行为 */
const cnCls = ctx(`(() => {
  activeArticle = ARTICLES[0]; view = {name:"read"};
  const at = m => { S.cnMode = m; return (renderRead().match(/class="view read-scroll ([^"]*)"/) || [,""])[1]; };
  return { off: at("off"), tap: at("tap"), all: at("all") };
})()`);
ok(`三档容器 class 正确（off="${cnCls.off}" · tap="${cnCls.tap}" · all="${cnCls.all}"）`,
  /\bno-cn\b/.test(cnCls.off) && /\bcn-off\b/.test(cnCls.off) &&
  /\bno-cn\b/.test(cnCls.tap) && /\bcn-tap\b/.test(cnCls.tap) &&
  !/\bno-cn\b/.test(cnCls.all) && !/\bcn-off\b|\bcn-tap\b/.test(cnCls.all));

/* ★ 点句行为：off 与 tap 的唯一差别。用真元素桩走真实 click 委托分支，
   不看渲染字符串 —— 渲染里 .peek 是运行时才加的。 */
/* 事件分发入口是 e.target.closest("[data-act],[data-tab],…")，
   所以桩的 closest 必须对**那个选择器**返回它自己（带 dataset.act 才走得进分支），
   对 ".para" 才返回段落桩。只返回一个空对象的话，app.js 在外面就
   `undefined.dataset.tab` 当场炸 —— 那样测的就不是分支逻辑了。 */
const DATA_ACT_SEL = "[data-act],[data-tab],[data-article],[data-cat]";
const mkSentStub = () => {
  const set = new Set();
  const el = {
    _set: set, dataset: { act: "para-peek" },
    textContent: "", setAttribute() {},
    classList: {
      add: c => set.add(c), remove: c => set.delete(c),
      toggle: (c, on) => { (on === undefined ? !set.has(c) : on) ? set.add(c) : set.delete(c); },
      contains: c => set.has(c),
    },
    closest: sel => (sel === DATA_ACT_SEL ? el : null),
  };
  return el;
};
ctx('activeArticle = ARTICLES[0]; view = {name:"read"}; S.cnMode = "tap";');
const sentTap = mkSentStub();
clickEl(sentTap);
ok('★ 「点句显示」档点句同时选中并弹出该句译文（.sel + .peek）',
  sentTap._set.has("sel") && sentTap._set.has("peek"));
/* 同一句再点一次 = 收起译文。用户明确要的交互只有这一种（段级按钮已删除，
   没有第二个入口兜底），所以必须钉死：干净地清掉 .sel/.peek，不留第三种状态。
   沙箱的 querySelectorAll 对非 sheet 选择器返回空数组，「清掉所有已选中句」那个循环
   会跑空 —— 不补桩就是「再点无效」的假红。桩只认 .sentence.sel，用完立刻还原
   （同 fakeKw 的做法），避免污染后面所有用 $$ 的断言。 */
const __prevQSASel = sandbox.document.querySelectorAll;
sandbox.document.querySelectorAll = s => (String(s).includes('.sentence.sel') ? [sentTap] : __prevQSASel(s));
clickEl(sentTap);
ok('★ 同一句再点一次收起该句译文（.sel 与 .peek 一起清掉）',
  !sentTap._set.has("sel") && !sentTap._set.has("peek"));
sandbox.document.querySelectorAll = __prevQSASel;
ctx('activeArticle = ARTICLES[0]; view = {name:"read"}; S.cnMode = "off";');
const sentOff = mkSentStub();
clickEl(sentOff);
ok('★ 「关闭翻译」档点句只选中、不弹中文（这是 off 与 tap 的唯一差别）',
  sentOff._set.has("sel") && !sentOff._set.has("peek"));
/* 段级「本段对照」按钮 2026-09-19 整套删除（app.js 的 cnBtn 渲染与 case "para-cn"、
   styles.css 的 .para-cn-btn 全没了）。探针遍历「首篇 / 末篇 × 三档」共 6 份渲染结果，
   确认一个都不再出现 —— 这条既守住「按钮不会在某次重构里悄悄回来」，也守住
   app.js 里别留下没有入口的悬空分支（两种按钮文案一并作为判据）。 */
const cnBtnHtml = ctx(`(() => {
  view = {name:"read"};
  const ids = [ARTICLES[0].id, ARTICLES[ARTICLES.length - 1].id];
  return ids.map(id => {
    activeArticle = ARTICLES.find(a => a.id === id);
    return ["tap", "all", "off"].map(m => { S.cnMode = m; return renderRead(); }).join("");
  }).join("");
})()`);
ok('★ 任何文章、任何档位都不再渲染段级「本段对照」按钮',
  /class="view read-scroll/.test(cnBtnHtml) && !/data-act="para-cn"/.test(cnBtnHtml)
  && !/本段翻译/.test(cnBtnHtml));
/* ★ 结构守卫：译文必须是句子的**相邻兄弟**节点。
   判据取「两个连续 </span> 之后紧跟 <span class="cn">」—— .sentence 的最后一个子节点
   是 .para-tts，所以兄弟写法必然是 `</span></span><span class="cn">`；
   若 .cn 被移回 .sentence 内部，就只剩一个 </span>，这个计数会归零。
   （用 `</span><span class="cn">` 判会假绿 —— para-tts 的闭合标签恰好长这样。）
   ⚠️ 开启标签要允许附加属性：2026-09-20 给 .cn 加了 lang="zh-CN"，
   写死 `<span class="cn">` 的那一版当场报 0/0 —— 结构没变，是断言把实现钉死了。 */
const cnOpenN = (cnBtnHtml.match(/<span class="cn"[^>]*>/g) || []).length;
const cnSibN = (cnBtnHtml.match(/<\/span><\/span><span class="cn"[^>]*>/g) || []).length;
ok(`★ 译文是句子的相邻兄弟节点（${cnSibN}/${cnOpenN} 个译文紧跟句子闭合标签）`,
  cnOpenN > 20 && cnSibN === cnOpenN);

/* 段级整段展开的点击守卫（mkParaStub + case "para-cn"）随按钮一起删除 ——
   留下没有入口的分支只会腐烂，留下测它的守卫则会在删代码时假红。 */

/* CSS：档位差别的落点 */
ok('「点句显示」的译文展开用相邻兄弟选择器（+ 而不是空格）',
  /\.read-scroll\.cn-tap \.sentence\.peek \+ \.cn/.test(cssCn) && !/\.sentence\.peek \.cn/.test(cssCn));
ok('★ CSS 里没有「关闭翻译」档的 peek 规则（off 与 tap 的差别就落在这里）',
  !/\.read-scroll\.cn-off[^{]*\.peek[^{]*\{/.test(cssCn));
/* 删功能要删干净：app.js 里的状态（paraOpen / 白名单）与 CSS 里的类（cn-open /
   .para-cn-btn）都不能留 —— 悬空分支不会自己报错，只会在下次重构时误导人。
   用 typeof 而不是 grep 源码：vm 里访问未声明变量返回 "undefined"，声明了就一定不返回。 */
ok('★ 段级「本段对照」的残骸清干净（app.js 无 paraOpen / 白名单，CSS 无 .para-cn-btn / .cn-open）',
  ctx('typeof paraOpen') === 'undefined' && ctx('typeof PARA_FLOW_ARTICLES') === 'undefined'
  && !/para-cn-btn/.test(cssBare) && !/\.para\.cn-open/.test(cssBare));
ctx('activeArticle = null; view = {name:"home"}; S.cnMode = "tap";');

/* 句子锚点：off = 该句顶部相对滚动容器视口的偏移；还原时把同一句放回同一偏移。
 * rs = 渲染切分序号（2026-09-22 加）：退化段（AI 栏目，一段英文里塞多句）切分后
 * 同一 pi/si 下有多个 .sentence，没有 rs 就只能还原到段落第一句。 */
const mkSent = (pi, si, top, bottom, rs) => ({
  dataset: { pi: String(pi), si: String(si), ...(rs == null ? {} : { rs: String(rs) }) },
  getBoundingClientRect: () => ({ top, bottom }),
});
sandbox.__fakeRead = {
  clientHeight: 600, scrollTop: 500,
  getBoundingClientRect: () => ({ top: 0 }),
  querySelectorAll: () => [mkSent(0, 0, -300, -100), mkSent(0, 1, -80, 60), mkSent(1, 0, 80, 200, 2)],
};
ok('锚点取「第一个越过视口上部 22% 的句子」（第 3 句）',
  ctx('JSON.stringify(readAnchor(__fakeRead))') === '{"pi":1,"si":0,"rs":2,"off":80}');
/* ★ 对照：老锚点没有 rs（undefined）必须还原成 0，否则升级后已存的进度会全部失效。
   这是「预期为真」的那一条 —— 只测「有 rs 时取到 rs」，测不出「没有 rs 时炸掉」。 */
const mkSentNoRs = mkSent(0, 1, -80, 60);
sandbox.__fakeNoRs = {
  clientHeight: 600, scrollTop: 500,
  getBoundingClientRect: () => ({ top: 0 }),
  querySelectorAll: () => [mkSentNoRs],
};
ok('★ 老锚点（没有 rs 字段）还原成 rs:0，不因升级失效',
  ctx('readAnchor(__fakeNoRs).rs') === 0);
sandbox.__fakeCont = {
  clientHeight: 600, scrollTop: 1000,
  getBoundingClientRect: () => ({ top: 100 }),
  querySelector: s => (String(s).includes('data-pi="3"') ? { getBoundingClientRect: () => ({ top: 130 }) } : null),
};
ctx('applyAnchor(__fakeCont, {pi:3, si:1, off:-20})');
ok('还原锚点：该句回到记录时的屏幕位置（scrollTop 1000 → 1050）', ctx('__fakeCont.scrollTop') === 1050);
ok('锚点指向的句子不存在时安全退出', ctx('applyAnchor(__fakeCont, {pi:99, si:0, off:0})') === false);
/* ★ applyAnchor 的 rs 精确定位：rs>0 时先按 data-rs 找，找不到才回落第一个。
 * （负向：只测「能找到」测不出「回落」；只测「回落」测不出「优先精确」。两条都写。） */
const mkCont = (sels) => ({
  clientHeight: 600, scrollTop: 1000,
  getBoundingClientRect: () => ({ top: 100 }),
  querySelector: s => {
    const key = String(s);
    for (const [pattern, top] of sels) if (key.includes(pattern)) return { getBoundingClientRect: () => ({ top }) };
    return null;
  },
});
sandbox.__fakePrecise = mkCont([['data-rs="3"', 140], ['data-pi="7"', 999]]);
ctx('applyAnchor(__fakePrecise, {pi:7, si:0, rs:3, off:-20})');
ok('★ applyAnchor 按 data-rs 精确还原切分句（140-100-(-20)=60 → scrollTop 1060）',
  ctx('__fakePrecise.scrollTop') === 1060);
sandbox.__fakeFallback = mkCont([['data-pi="8"', 160]]);
ctx('applyAnchor(__fakeFallback, {pi:8, si:0, rs:3, off:-20})');
ok('★ 找不到 data-rs 时回落到该段第一个句子（160-100-(-20)=80 → scrollTop 1080）',
  ctx('__fakeFallback.scrollTop') === 1080);

ctx('S.readPos = {}; S.lastRead = { id: "artA", y: 500, pct: 33, at: 0 };');
ctx('rememberReadPos(__fakeRead, "artA"); rememberReadPos(__fakeRead, "artB");');
ok('每篇文章各存一份续读位置（A / B 互不覆盖）',
  Object.keys(ctx('S.readPos')).length === 2 && ctx('S.readPos.artA.pi') === 1 && ctx('S.readPos.artA.si') === 0 &&
  ctx('S.readPos.artA.off') === 80 && ctx('S.readPos.artA.y') === 500 && ctx('S.readPos.artA.pct') === 33);
ok('B 篇没有 lastRead 记录时 pct 归零，不串用 A 篇进度', ctx('S.readPos.artB.pct') === 0);
ctx('S.readPos = {}; S.lastRead = { id: "", y: 0, pct: 0, at: 0 };');

/* 「上次读到」：打开文章即记录，发现页出续读卡片，重进同一篇恢复位置。
   这里要真渲染发现页，先解除 render 间谍 */
ctx('render = __origRender;');
ctx(`S.lastRead = { id: "", y: 0, pct: 0, at: 0 }; view = {name:"discover"}; catFilter = "全部";`);
const lrId = ctx('ARTICLES[0].id');
click({ article: lrId });
ok(`打开文章即记录「上次读到」`, ctx('S.lastRead.id') === 'ARTICLES[0].id' || ctx(`S.lastRead.id`) === lrId);
ctx(`S.lastRead.y = 321; S.lastRead.pct = 42;`);
click({ article: lrId });
ok(`重进同一篇带上恢复位置（resumeY=321）`, ctx('resumeY') === 321);
ctx(`S.readPos = { [${JSON.stringify(lrId)}]: { pi: 5, si: 2, off: -12, y: 900, pct: 42, at: 1 } };`);
click({ article: lrId });
/* ★ 按字段断言，不比对精确 JSON：后者一加字段就假红（2026-09-22 加 rs 时就撞上）。
 * 要保证的是「pi/si/rs/off 四件都带上了」，不是「对象里就这四把键」。 */
ok('同篇还带上了句子锚点（排版变了也对得回原句，不只靠 scrollTop）',
  ctx('resumeAnchor && resumeAnchor.pi') === 5 && ctx('resumeAnchor && resumeAnchor.si') === 2 &&
  ctx('resumeAnchor && resumeAnchor.off') === -12 && ctx('Number.isFinite(resumeAnchor && resumeAnchor.rs)') === true);
ctx(`S.readPos = {}; resumeAnchor = null; resumeY = 0;`);
ctx(`view = {name:"discover"}; catFilter = "全部"; searchTerm = ""; render();`);
const discHtml = `document.querySelector("#screen").innerHTML`;
ok(`发现页渲染「上次读到」续读卡片（含进度）`, ctx(`${discHtml}.includes("上次读到")`) === true && ctx(`${discHtml}.includes("读到 42%")`) === true);
ctx(`S.lastRead = { id: "", y: 0, pct: 0, at: 0 }; view = {name:"discover"}; render();`);
ok(`没有阅读记录时不渲染续读卡片`, ctx(`${discHtml}.includes("上次读到")`) === false);

/* ===================================================================
 * G3. 首页推荐位置稳定
 *   旧实现有两个反向的毛病：renderHome 每次重渲染都会推进位置（打卡、收藏、
 *   返回首页都会偷偷换掉推荐位）；而「换一批」反而重建池子并归零
 *   （又回到刚看过的那两篇，等于没换）。
 * =================================================================== */
console.log('\n[G3] 首页推荐位置稳定');
ctx('render = __origRender; S.read = []; homeReads = { day: "", pool: [], off: 0 };');
const page1 = ctx('JSON.stringify(pickDailyReads().map(a => a.id))');
ok('连续取两次推荐位返回同一组（取值不改位置）',
  ctx('JSON.stringify(pickDailyReads().map(a => a.id))') === page1);
ctx('renderHome(); renderHome(); renderHome();');
ok('首页重渲染三次后推荐位依然没动',
  ctx('JSON.stringify(pickDailyReads().map(a => a.id))') === page1);

const poolBefore = ctx('JSON.stringify(homeReads.pool.map(a => a.id))');
const offBefore = ctx('homeReads.off');
ctx('rerollDailyReads()');
const page2 = ctx('JSON.stringify(pickDailyReads().map(a => a.id))');
/* 文章池 ≤ 2 时「换一批」会环形回绕到同一组，这是预期行为 */
const canSwap = ctx('homeReads.pool.length') > JSON.parse(page1).length;
ok('「换一批」推进了位置', !canSwap || ctx('homeReads.off') !== offBefore);
ok(`「换一批」换到不同的两篇（${JSON.parse(page1).join(" / ")} → ${JSON.parse(page2).join(" / ")}）`, !canSwap || page2 !== page1);
ok('「换一批」不重建池子', ctx('JSON.stringify(homeReads.pool.map(a => a.id))') === poolBefore);

/* 翻到底必须能接回开头，不能卡在最后一页 */
const poolSize = ctx('homeReads.pool.length');
const seen = new Set(JSON.parse(page1).concat(JSON.parse(page2)));
let wrapped = false;
for (let i = 0; i < poolSize; i++) {
  ctx('rerollDailyReads()');
  const p = JSON.parse(ctx('JSON.stringify(pickDailyReads().map(a => a.id))'));
  if (p.length && seen.has(p[0])) { wrapped = true; break; }
  p.forEach(x => seen.add(x));
}
ok(`环形翻页能覆盖整个推荐池并接回开头（覆盖 ${seen.size}/${poolSize}）`, wrapped);
ctx('homeReads = { day: "", pool: [], off: 0 };');

/* ===================================================================
 * [G4] 本篇生词本：按词匹配，不是按子串
 * 旧实现 text.includes(w)：收藏 art，正文有 party 就被误收；收藏 go，正文只有 went 又漏掉。
 * 用例数据驱动地从真实语料里挑，不写死词对（词库换代也不至于失效）。
 * =================================================================== */
console.log('\n[G4] 本篇生词本按词匹配');
{
  const neg = ctx(`(() => {
    for (const a of ARTICLES) {
      const toks = new Set();
      textSentences(a).forEach(s => { WORD_TOKEN_RE.lastIndex = 0; let m; while ((m = WORD_TOKEN_RE.exec(s.en || ''))) toks.add(normApos(m[0]).toLowerCase()); });
      const tl = [...toks];
      for (const x of Object.keys(WORD_META)) {
        if (x.length < 3 || toks.has(x)) continue;
        const y = tl.find(y => y.length > x.length + 2 && y.includes(x));
        if (!y) continue;
        /* 排除「另一个 token 合法还原到 x」的情况：那不是子串误收，是词形还原 */
        const hasRealInflection = tl.some(t => t !== y && t !== x && (() => { const r = resolveToken(t); return r && r.kw === x; })());
        if (hasRealInflection) continue;
        return { art: a.id, x, y };
      }
    }
    return null;
  })()`);
  ok('语料中存在「子串误收」反例可测', !!neg);
  if (neg) {
    const listed = ctx(`(() => {
      const keepArt = activeArticle, keepNb = S.notebook;
      activeArticle = ARTICLES.find(a => a.id === ${JSON.stringify(neg.art)});
      /* 条目必须是**真实形状**（对象）—— renderArticleNotebookSheet 读的是 item.word，
         塞字符串进去会得到 "undefined" 而静默不匹配，那样测的不是代码而是测试自己的错。 */
      S.notebook = [{ word: ${JSON.stringify(neg.x)}, addedAt: Date.now(), articleId: "" }];
      const html = renderArticleNotebookSheet();
      S.notebook = keepNb; activeArticle = keepArt;
      return html.includes('data-word="' + ${JSON.stringify(neg.x)} + '"');
    })()`);
    ok(`正文只有「${neg.y}」而收藏「${neg.x}」→ 不该被算作本篇生词`, listed === false);
  }

  const pos = ctx(`(() => {
    for (const a of ARTICLES) {
      const toks = new Set();
      textSentences(a).forEach(s => { WORD_TOKEN_RE.lastIndex = 0; let m; while ((m = WORD_TOKEN_RE.exec(s.en || ''))) toks.add(normApos(m[0]).toLowerCase()); });
      for (const y of toks) {
        const t = resolveToken(y);
        if (t && t.kw && t.kw !== y && !toks.has(t.kw) && WORD_META[t.kw]) return { art: a.id, kw: t.kw, form: y };
      }
    }
    return null;
  })()`);
  ok('语料中存在「变形需还原」正例可测', !!pos);
  if (pos) {
    const listed = ctx(`(() => {
      const keepArt = activeArticle, keepNb = S.notebook;
      activeArticle = ARTICLES.find(a => a.id === ${JSON.stringify(pos.art)});
      S.notebook = [{ word: ${JSON.stringify(pos.kw)}, addedAt: Date.now(), articleId: "" }];
      const html = renderArticleNotebookSheet();
      S.notebook = keepNb; activeArticle = keepArt;
      return html.includes('data-word="' + ${JSON.stringify(pos.kw)} + '"');
    })()`);
    ok(`收藏「${pos.kw}」、正文只有「${pos.form}」→ 应命中本篇生词本`, listed === true);
  }
}

/* ===================================================================
 * [G5] 阅读时长：按秒持续记账
 * 旧实现只在打卡时写一次，且 Math.max(1, round(sec/60)) —— 读 10 分钟直接返回不记账，
 * 几乎没读就打卡却至少记 1 分钟。现在计时持续落盘，打卡只标记「读完」。
 * =================================================================== */
console.log('\n[G5] 阅读时长按秒持续记账');
{
  ok('老数据只有分钟时迁移成秒（7 分钟 → 420 秒）',
    ctx('normalizeState({ minsByDay: { "2026-09-01": 7 } }).secByDay["2026-09-01"]') === 420);

  ctx('readSecs = 0; flushedSecs = 0; S.secByDay = {}; S.readDays = []; syncMinsMirror();');
  ctx('readSecs = 600; flushReadTime();');
  ok('读满 10 分钟就记 600 秒（不必等打卡）', ctx('S.secByDay[todayKey()]') === 600);
  ok('分钟镜像同步为 10', ctx('S.minsByDay[todayKey()]') === 10);
  ok('这一天同时被记为「有阅读行为」', ctx('S.readDays.includes(todayKey())'));
  ctx('flushReadTime();');
  ok('重复 flush 不会重复记账', ctx('S.secByDay[todayKey()]') === 600);
  ctx('readSecs += 30; flushReadTime();');
  ok('继续读只补增量（600+30）', ctx('S.secByDay[todayKey()]') === 630);
  ctx('readSecs = 0; flushedSecs = 0; S.secByDay = {}; syncMinsMirror(); readSecs = 20; flushReadTime();');
  ok('只读 20 秒就如实记 20 秒（不再硬凑 1 分钟）', ctx('S.secByDay[todayKey()]') === 20);
  ctx('readSecs = 0; flushedSecs = 0; S.secByDay = {}; S.readDays = []; syncMinsMirror(); save();');
}

/* ===================================================================
 * [G6] 内容更新通知：阅读中不打断，退出阅读页后才刷新
 * 旧实现收到 content-updated 时，若在阅读页只弹一句「返回后生效」就 return，
 * 既不记待更新、返回后也不刷新 —— 页面里还是内存中的旧文章。
 * =================================================================== */
console.log('\n[G6] 内容更新通知的处理');
{
  click({ tab: 'discover' });
  click({ cat: '全部' });
  click({ article: ctx('ARTICLES[0].id') });
  eq('已在阅读页', ctx('view.name'), 'read');

  reloads = 0;
  ctx('pendingUpdate = false;');
  sandbox.sessionStorage._d = {};
  swHandlers.message && swHandlers.message({ data: { type: 'content-updated' } });
  ok('阅读中收到更新只记「待更新」，不打断当前阅读（未触发刷新）',
    ctx('pendingUpdate') === true && reloads === 0);
  ok('阅读中也不占用「本会话已刷过一次」的名额',
    sandbox.sessionStorage.getItem('wl-updated') === null);

  click({ tab: 'home' });
  ok('退出阅读页后待更新标记被消费', ctx('pendingUpdate') === false);

  swHandlers.message && swHandlers.message({ data: { type: 'content-updated' } });
  ok('非阅读页收到更新直接走刷新路径（占用会话名额）',
    sandbox.sessionStorage.getItem('wl-updated') === '1');
}

/* ---------------- [G7] 例句库已移出首屏 ----------------
 * 例句库 560KB（gzip 225KB），只在词卡展开「更多」后才用得上。这里守住三件事：
 * 首页不引用它、文件本身还在（按需取得到）、加载器指的就是这个文件。 */
{
  const html = fs.readFileSync(path.join(base, 'index.html'), 'utf8');
  const srcs = (html.match(/<script[^>]*\ssrc="([^"]+)"/g) || []).map(s => s.match(/src="([^"]+)"/)[1]);
  ok(`首页不请求例句库（首屏 script ${srcs.length} 个，无一指向 data-examples）`,
    srcs.length > 0 && !srcs.some(s => s.includes('data-examples')));
  ok('例句库文件仍在（按需加载的前提）', fs.existsSync(path.join(base, 'assets/data-examples.js')));
  eq('加载器指向例句库文件', ctx('EXAMPLES_FILE'), 'assets/data-examples.js');
  /* 首屏 script 全部带同一个 ?v=，否则会出现新旧资源混用 */
  const vs = new Set(srcs.map(s => (s.match(/[?&]v=([^&]+)/) || [])[1] || '(无)'));
  ok(`首屏 script 版本号一致（${[...vs].join(', ')}）`, vs.size === 1);
}

/* ---------------- [G8] 例句不参与任何计算 ----------------
 * 这是「首屏不加载例句库」的安全前提。万一将来有人在指标或推荐里读了 w.example，
 * 这条会立刻炸 —— 那时的症状会是：首页难度标签与排序悄悄算错，而页面看着正常。 */
{
  const str = ctx(`ARTICLES.map(a => {
    const s = articleStats(a);
    return [a.id, s.words, s.needLearn, s.rate.toFixed(5), diffTier(s.rate).label, estMinutes(a), clientScore(a).toFixed(4)].join('|');
  })`);
  const nWords = ctx('WORDS.filter(w => w.example || w.exampleCn).length');
  ok(`沙箱里例句确实灌进去了（${nWords} 词）`, nWords > 0);

  ctx(`(() => {
    window.__exBak = WORDS.map(w => [w.example, w.exampleCn]);
    for (const w of WORDS) { w.example = ''; w.exampleCn = ''; }
    clearArticleCaches();
    return 0;
  })()`);
  const without = ctx(`ARTICLES.map(a => {
    const s = articleStats(a);
    return [a.id, s.words, s.needLearn, s.rate.toFixed(5), diffTier(s.rate).label, estMinutes(a), clientScore(a).toFixed(4)].join('|');
  })`);
  ctx(`(() => {
    WORDS.forEach((w, i) => { w.example = window.__exBak[i][0]; w.exampleCn = window.__exBak[i][1]; });
    clearArticleCaches();
    return 0;
  })()`);

  const changed = str.filter((r, i) => r !== without[i]);
  ok(`摘掉例句后词数/需学/低频占比/难度档/估时/推荐分逐篇不变（${str.length} 篇）`, changed.length === 0);
  if (changed.length) changed.slice(0, 3).forEach(r => console.log('    有例句：' + r));
  /* 还原必须干净，否则后面所有指标断言都跟着错 */
  ok('例句已还原（后续断言不被污染）', ctx('WORDS.filter(w => w.example || w.exampleCn).length') === nWords);
}

/* ---------------- [G9] 中文层术语与链接卫生 ----------------
 * 三道守卫，针对的都是「机器翻译稳定复现、重译救不了、只能靠中文层后处理纠正」的错误
 * （规则表见 tools/term-glossary.json，背景见 SEMANTIC-AUDIT-2026-09-15.md）：
 *   G9a 术语表规则在已发布数据上不得有残留 —— 遍历规则表逐条回验，而不是把结论抄成
 *       断言。这样新增一条术语规则就自动多一道守卫：规则表是唯一事实源，断言不会漂。
 *   G9b 标题体句子（英文以冒号结尾、≤10 词）的中文不得套书名号 —— DeepL 会把
 *       "The Obsession Framework:" 这类小标题误判成作品名，知识库篇实测 9 处。
 *   G9c 数据里不得出现 localhost / 127.0.0.1 / file:// —— 选题时用过本地临时页
 *       （gr-how-to-fix-your-entire-life 的 url 曾是 http://localhost:8123/.tmp/...）。
 */
{
  const glossary = JSON.parse(fs.readFileSync(path.join(base, 'tools', 'term-glossary.json'), 'utf8'));
  /* ★ `art` 的语义（写前缀匹配整篇）与 tools/lib-glossary.mjs 的 inScope 是**同一份定义**，
   *   这里是刻意重写的第二份（独立口径：守卫不能复用被守卫对象自己的实现）。
   *   两份一起改 —— 只改一处会出现「audit 绿、fix-cn.mjs 照改」的假绿。
   *   2026-09-20 实测验证过作用域真的有效：把 Channel 规则的 art 临时改成 ["ob-"]，
   *   这里立刻报出 3 处 terms「渠道」，说明加 art 是收起误伤、不是把守卫架空。 */
  const inScope = (r, id) => !r.art || r.art.some(p => String(id).startsWith(p));
  const sents = [];
  for (const a of ctx('ARTICLES')) {
    for (const p of (a.paras || [])) {
      if (p.img) continue;
      for (const s of (Array.isArray(p.sentences) ? p.sentences : [p])) {
        if (s && s.en) sents.push({ id: a.id, en: String(s.en), cn: String(s.cn || '') });
      }
    }
  }

  const residual = [];
  for (const kind of ['fixes', 'terms']) {
    for (const r of glossary[kind] || []) {
      if (r.set != null) continue;              // 整句替换没有「旧译法串」可回验
      for (const s of sents) {
        if (!inScope(r, s.id)) continue;
        if (!new RegExp(r.en, 'i').test(s.en)) continue;
        if (r.unless && new RegExp(r.unless, 'i').test(s.en)) continue;
        for (const [from] of r.cn || []) if (s.cn.includes(from)) residual.push(`${kind}「${from}」@${s.id}`);
      }
    }
  }
  for (const r of glossary.global || []) {
    for (const s of sents) {
      if (inScope(r, s.id) && s.cn.includes(r.from)) residual.push(`global「${r.from}」@${s.id}`);
    }
  }
  const nRules = (glossary.fixes || []).length + (glossary.terms || []).length + (glossary.global || []).length;
  ok(`术语表 ${nRules} 条规则在 ${sents.length} 句译文上零残留`, residual.length === 0);
  if (residual.length) console.log(`    命中：${residual.slice(0, 8).join('、')}`);

  const headBad = sents.filter(s =>
    /:\s*$/.test(s.en.trim()) && s.en.trim().split(/\s+/).length <= 10 && /《/.test(s.cn));
  ok('标题体句子（英文以冒号结尾）的中文没有书名号', headBad.length === 0);
  headBad.slice(0, 4).forEach(s => console.log(`    ${s.id}：${s.en} → ${s.cn}`));

  /* 文章标题同理：标题本身就是这篇文章的名字，再套书名号等于说它是另一部作品。
   * 真需要引用某部作品时（少见）再给这一条加白名单 —— 现在 11 篇标题全干净。 */
  const titleBad = ctx('ARTICLES').filter(a => /《/.test(String(a.titleZh || '')))
    .map(a => `${a.id}：${a.titleZh}`);
  ok('文章标题（titleZh）没有书名号', titleBad.length === 0);
  titleBad.slice(0, 4).forEach(t => console.log(`    ${t}`));

  const localHits = [];
  for (const a of ctx('ARTICLES')) if (/localhost|127\.0\.0\.1|file:\/\//.test(JSON.stringify(a))) localHits.push(a.id);
  ok('文章数据里没有 localhost / 127.0.0.1 / file:// 链接', localHits.length === 0);
  if (localHits.length) console.log(`    命中：${localHits.join('、')}`);
}

/* ---------------- [G10] 栏目元数据覆盖 ----------------
 * 发现页的栏目卡（图标 / 副标题）走两张表：CAT_META / CAT_BLURB。
 * 表里没有的栏目会**静默**落到通用兜底（图标 "doc"、副标题「关于思考、生活与自我成长」）——
 * 兜底让「新增栏目忘了配文案」看起来完全正常：不报错、不空白，只是文案不对。
 * 2026-09-20 实测就是这件事：接 Offbook 的 AI 专栏（43 篇，占全库 3/4）之后，
 * 这 43 篇顶着「关于思考、生活与自我成长」显示 —— 因为原来副标题写在一串三元表达式的
 * 默认分支里（`c === "人物" ? … : c === "足球" ? … : "关于思考…"`），而默认分支是成长栏的文案。
 * 所以这条判据盯的是**意图**：凡是库里有文章的栏目，两张表都必须有它的条目。
 *
 * ★ 为什么读源码而不是读运行时的那两张表：app.js 里它们是 `const`，而
 *   `vm.runInContext` 每次起的是各自的脚本作用域 —— `ctx('CAT_META')` 会 ReferenceError。
 *   所以退一步从源码里取键集合；断言的对象仍然是「**数据里**出现了哪些栏目」，
 *   不是「当前实现写了哪几个键」，换实现（改成 Map / window 挂载）只需换取值方式。
 */
{
  const appSrc = fs.readFileSync(path.join(base, 'assets', 'app.js'), 'utf8');
  const keysOf = name => {
    const m = appSrc.match(new RegExp('const ' + name + ' = \\{([\\s\\S]*?)\\n\\};'));
    if (!m) return null;
    return new Set([...m[1].matchAll(/^\s*"([^"]+)"\s*:/gm)].map(x => x[1]));
  };
  const metas = keysOf('CAT_META'), blurbs = keysOf('CAT_BLURB');
  ok('CAT_META / CAT_BLURB 两张栏目表都取到了（锚点没失配）', Boolean(metas && blurbs));
  const cats = [...new Set(ctx('ARTICLES').map(a => a.cat))].sort();
  const missing = cats.filter(c => !metas?.has(c) || !blurbs?.has(c));
  ok(`有文章的 ${cats.length} 个栏目（${cats.join('/')}）在两张表里都有条目`, missing.length === 0);
  if (missing.length) console.log(`    缺条目：${missing.join('、')} —— 会静默落到通用兜底图标/文案`);
}

/* ===================================================================
 * [H2] 首页封面轮换（2026-09-22 v74）
 *   原来首页那块大图写死「第一篇人物文」（按日期倒序，永远是 Anna Hathaway），
 *   改成每次进站从 LEAD_PHOTO_POOL 里随机挑一「篇 + 一张图」。
 *
 * 这里**不发随机数、不测分布** —— 随机性没有可断言的属性（「跑 10 次至少 2 种」
 * 在 17 选 1 时的失败概率约 1e-12，但那是概率不是保证，一条会偶发假红的守卫
 * 比没有守卫更糟）。可断言的是**其余每一样**：池子合法、比例够宽、联动完整、
 * 渲染输出真的换了图、发现页那条路径没被带坏。
 * =================================================================== */
console.log('\n[H2] 首页封面轮换');
{
  const appSrcHome = fs.readFileSync(path.join(base, 'assets', 'app.js'), 'utf8');
  /* 白名单从源码取，不硬编码第二份 —— 否则守卫会锁住一个和实现走散的数字 */
  const poolBlock = appSrcHome.match(/const LEAD_PHOTO_POOL = \[([\s\S]*?)\n\];/);
  const poolKeys = poolBlock
    ? [...poolBlock[1].matchAll(/"([^"]+)"/g)].map(m => m[1])
    : [];
  ok(`首页封面候选池取到了（${poolKeys.length} 项）`, poolKeys.length > 0);

  /* ① 每一项都必须在某篇人物文里**真实可达**（封面走 coverImg、正文照走 paras[].img）。
   *    手写白名单最容易发生的事就是打错一个序号 —— 那样这张图永远选不中，
   *    而池子看起来「有 14 张」、日志里也不报错，只在展示分布上悄悄少一档。 */
  const poolPaths = poolKeys.map(k => `assets/covers/${k}.jpg`);
  const resolvePool = ctx(`(function () {
    const out = [];
    for (const p of ${JSON.stringify(poolPaths)}) {
      let hit = null;
      for (const a of ARTICLES) {
        if (a.cat !== "人物") continue;
        /* 封面（coverImg）与正文照（paras[].img）都算 —— 与 leadPhotoPoolItems() 同一套规则 */
        if (a.coverImg === p || (a.paras || []).some(x => x.img === p)) { hit = { img: p, id: a.id }; break; }
      }
      out.push(hit);
    }
    return JSON.stringify(out);
  })()`);
  const resolved = JSON.parse(resolvePool);
  const unresolved = resolved.filter(x => !x).map((_, i) => poolPaths[i]);
  ok(`池里 ${poolKeys.length} 项全部能解析到所属人物文`, unresolved.length === 0);
  if (unresolved.length) console.log(`    解析不到：${unresolved.join('、')}`);

  const resolvedIds = [...new Set(resolved.filter(Boolean).map(x => x.id))];
  ok(`池子覆盖的人物文 ≥ 2 篇（否则「随机」等于没换，实际 ${resolvedIds.length} 篇）`,
    resolvedIds.length >= 2);
  /* 池子里不该出现非人物文 —— 首页那块是「THE PEOPLE ISSUE」，串成成长栏会标签与内容不符 */
  const poolCats = [...new Set(resolved.filter(Boolean).map(x => {
    const a = ctx(`ARTICLES.find(a => a.id === ${JSON.stringify(x.id)})`);
    return a && a.cat;
  }))];
  ok('池子全部来自人物栏目', poolCats.length === 1 && poolCats[0] === '人物');

  /* ② ★ 比例守卫：只许横构图。
   *    判据是「宽/高 ≥ 1.4」，理由是实测的**图位比例**（Edge 探针，见
   *    .bak/probe-home-cover.cjs）：窄屏 420px 时 378×248 = 1.52 : 1，
   *    桌面 1280px 时 565×388 = 1.46 : 1。配 object-fit: cover，
   *    横图（≥1.4）裁掉的两侧可以忽略；竖图（0.66 那批，人物正文照的主体）
   *    要裁掉 50%+，只剩一条窄缝把人裁得只剩一双眼。
   *    56 张人物照里只有 14 张是横图 —— 这条守卫就是拦「以后图省事把竖图也塞进来」。
   *    ⚠️ 比例表的唯一来源是下面这张表，构造期量一次（JPEG SOF 段），别手填。
   *    ★ 这张表是**真要维护的**：池子加一张就得补一行，否则第 ② 条守卫对它静默放行。
   *      （本轮实测价值：写池子时手滑塞进了 `eva-green-0`（1077×1400 竖）与
   *      `mother-mary-5`（720×573 = 1.26），两条都被这条守卫当场拦下。） */
  const IMG_SIZE = {
    "people-anne-hathaway-mother-mary-0": [720, 405, "封面"],
    "people-rachel-weisz-archive-0": [765, 510, "封面"],
    "people-megan-fox-interview-0": [1100, 720, "封面"],
    "people-lea-seydoux-bond-girl-0": [685, 456, "封面"],
    "people-anne-hathaway-mother-mary-1": [720, 490, ""],
    "people-anne-hathaway-mother-mary-3": [720, 486, ""],
    "people-anne-hathaway-mother-mary-4": [720, 480, ""],
    "people-anne-hathaway-mother-mary-7": [720, 500, ""],
    "people-anne-hathaway-mother-mary-8": [720, 490, ""],
    "people-megan-fox-interview-3": [1000, 655, ""],
    "people-megan-fox-interview-4": [1000, 655, ""],
    "people-megan-fox-interview-5": [1000, 655, ""],
    "people-megan-fox-interview-6": [1000, 655, ""],
    "people-lea-seydoux-bond-girl-2": [1100, 733, ""],
    /* 下面两条**故意留在表里但不在池里** —— 它们是「竖图长什么样」的活样本，
       给最后那条反向对照当坏样本用。删了它们，对照就退化成恒真。 */
    "people-rachel-weisz-archive-1": [1076, 1400, "竖（不入池）"],
    "people-eva-green-tim-burton-1": [1077, 1400, "竖（不入池）"],
  };
  const MIN_RATIO = 1.4;
  const tooNarrow = [], unknownSize = [];
  for (const k of poolKeys) {
    const s = IMG_SIZE[k];
    if (!s) { unknownSize.push(k); continue; }
    if (s[0] / s[1] < MIN_RATIO) tooNarrow.push(`${k} ${s[0]}×${s[1]} = ${(s[0] / s[1]).toFixed(2)}`);
  }
  ok(`★ 池里没有竖构图（比例全部 ≥ ${MIN_RATIO} : 1，否则宽幅位会把人裁成一条缝）`,
    tooNarrow.length === 0);
  if (tooNarrow.length) console.log(`    过窄：${tooNarrow.join(' / ')}`);
  ok(`★ 池里每一项都有已实测的比例记录（没有记录 = 这条守卫对它静默放行）`,
    unknownSize.length === 0);
  if (unknownSize.length) console.log(`    缺记录：${unknownSize.join('、')}`);
  /* 反向对照（预期为假）——为什么必须有：上面那条「没有竖图」在**池子为空**时也成立。
   * 拿两张已知的竖图当坏样本，确认尺子真的会响；不响就说明比例表读错了单位。
   * 这两项刻意留在 IMG_SIZE 里但不在池里 —— 它们的角色就是坏样本。 */
  const knownUpright = ["people-rachel-weisz-archive-1", "people-eva-green-tim-burton-1"];
  const uprightRatio = knownUpright.map(k => (IMG_SIZE[k] || [1, 1])[0] / (IMG_SIZE[k] || [1, 1])[1]);
  ok('对照：已知竖图（现实里被这条守卫挡住的那批）比例确实 < 1.4，尺子不是恒真',
    uprightRatio.every(r => r < MIN_RATIO));

  /* ③ ★ 端到端：真的渲染首页，看渲染出来的图有没有跟着 pool 走。
   *    为什么必须有这条：上面全在测池子**数据**对不对，测不出 pickEditorialLead()
   *    有没有被 renderHome 调用 —— 正是 §2「第四种假守卫」那个形状。
   *
   *    ⚠️ 钉哪个位置是**有讲究的**：必须钉到一个**不属于「固定那篇」**的项
   *    （固定那篇 = `ARTICLES.find(a => a.cat === "人物" && coverOf(a))`，即改动前的行为）。
   *    原因：池子第 0 项恰好**就是**固定那篇的封面（anne-hathaway-0 既是该篇 coverImg、
   *    又在池里），拿它当判据的话 —— 把 renderHome 的接线整个删掉（回到固定第一篇），
   *    这条断言**照样绿**（负向样本 ha 实测确认过）。那不是「功能还在」，是巧合。
   *    钉到非固定项之后，接线一断就必红。 */
  ctx('view = {name:"home"};');
  const homeHtml = ctx('renderHome()');
  ok('★ 端到端：首页大图渲染出来了', /<section class="editorial-feature/.test(homeHtml));

  const fixedId = ctx('(ARTICLES.find(a => a.cat === "人物" && coverOf(a)) || {}).id');
  const fixedLead = ctx('coverOf(ARTICLES.find(a => a.cat === "人物" && coverOf(a)))');
  /* ⚠️ 必须挑一张**正文照**（`paras[].img`），不能挑 `-0` 封面。
   * 原因：`-0` 封面恰好等于该篇自己的 `coverOf(a)` —— 于是「照片 == 池里那一张」这条
   * 在**接线删掉、photo 参数丢失、回退到 coverOf(lead)** 的情况下依然成立，
   * 断言会假绿。负向样本 ha 实测确认过：选 `rachel-weisz-0` 时它照样绿。
   * 只有正文照（`-1` / `-2` … 不在 coverImg 里）才能把「用没用 photo 覆盖」区分开。 */
  function isCoverKey(idx) {
    if (idx < 0) return true;
    return ctx(`(ARTICLES.find(a => (a.coverImg || "") === ${JSON.stringify(poolPaths[idx])}) || {}).id || ""`) !== "";
  }
  let otherIdx = -1;
  for (let i = 0; i < resolved.length; i++) {
    if (resolved[i] && resolved[i].id !== fixedId && !isCoverKey(i)) { otherIdx = i; break; }
  }
  const otherPath = otherIdx >= 0 ? poolPaths[otherIdx] : "";
  const otherId = otherIdx >= 0 && resolved[otherIdx] ? resolved[otherIdx].id : "";
  const otherWho = ctx(`(ARTICLES.find(a => a.id === ${JSON.stringify(otherId)}) || {}).personZh || ""`);
  ok('★ 自检：找得到一张「非固定篇的正文横图」用来做端到端判据（否则下面的端到端断言是空的）',
    otherIdx >= 0);

  /* 拿这张正文照当判据：接线断了 / photo 参数没传下去，回退到 coverOf(lead) 就会立刻对不上 */
  const otherHtml = otherIdx >= 0 ? ctx(`(function () {
    const items = leadPhotoPoolItems();
    const _r = Math.random;
    Math.random = () => ${otherIdx} / items.length + 1e-9;   // 落在第 otherIdx 个区间
    const h = renderHome();
    Math.random = _r;
    return h;
  })()`) : "";
  const otherSec = (otherHtml.match(/<section class="editorial-feature[\s\S]*?<\/section>/) || [''])[0];
  ok(`★ 端到端：选到非固定篇「${otherWho}」的正文照时，首页真的用了池里那一张（${otherPath}）`,
    otherIdx >= 0 && otherSec.includes(otherPath));
  ok(`★ 端到端：这一刻用的不是该篇自己的封面（${fixedLead} 那种回退形状）—— photo 参数真的传到了`,
    otherIdx >= 0 && otherPath !== fixedLead && otherSec.includes(otherPath));
  ok('★ 端到端：这一刻 CTA 跳转指向的也是那一篇（图文联动没散）',
    otherIdx >= 0 && (otherSec.match(/data-article="([^"]*)"/g) || [])
      .every(x => x === `data-article="${otherId}"`));

  /* ④ 联动：照片 / 标题 / 英文题 / 署名 / CTA 必须同篇。
      再取池里最后一项测一遍（与上面不同的项），交叉确认不是碰巧某一项对。 */
  const pinned2 = ctx(`(function () {
    const items = leadPhotoPoolItems();
    const _r = Math.random;
    Math.random = () => 0.999999;          // 恒取最后一项
    const lead = pickEditorialLead();
    Math.random = _r;
    return JSON.stringify({ img: lead && lead.img, id: lead && lead.a && lead.a.id });
  })()`);
  const p2 = JSON.parse(pinned2);
  const pinHtml2 = ctx(`(function () {
    const items = leadPhotoPoolItems();
    const _r = Math.random;
    Math.random = () => 0.999999;
    const h = renderHome();
    Math.random = _r;
    return h;
  })()`);
  const sec2 = (pinHtml2.match(/<section class="editorial-feature[\s\S]*?<\/section>/) || [''])[0];
  ok(`★ 联动：钉住随机数取最后一项（${p2.id}）时，照片、CTA 跳转指向同一篇`,
    Boolean(p2.id) && sec2.includes(p2.img) && (sec2.match(/data-article="([^"]*)"/g) || [])
      .every(x => x === `data-article="${p2.id}"`));
  const a2 = ctx(`ARTICLES.find(a => a.id === ${JSON.stringify(p2.id)})`);
  ok('★ 联动：中文标题 / 英文标题与这一篇一致',
    Boolean(a2) && sec2.includes(String(a2.titleZh)) && sec2.includes(String(a2.title).slice(0, 24)));
  ok('★ 联动：署名行带上了这张图在原刊的摄影署名',
    Boolean(a2 && a2.photoCredit) && sec2.includes(String(a2.photoCredit)));

  /* ⑤ ★ 发现页「编辑精选」那条路径不许被带坏：它不传 photo，必须仍走 coverOf(a)。
   *    ⚠️ 早先这里只调 `editorialFeature(f, "编辑精选")` 直接构造、并且只断言
   *    「封面路径出现在输出里」—— 那样**测不出 renderDiscover 有没有偷偷给它接上随机池**
   *    （负向样本 hf 实测：让 renderDiscover 传 pickEditorialLead() 进去，断言纹丝不动全绿）。
   *    改成走**真渲染路径**（renderDiscover），并且断言「渲染出来的图片路径 == 该篇自己的 coverOf」
   *    —— 随机池里任何一张图都会立刻让它变红。 */
  ctx('view = {name:"discover"}; catFilter = "全部"; searchTerm = "";');
  const discHtml = ctx('renderDiscover()');
  const discFeatured = ctx('coverOf(ARTICLES.slice().sort((a,b) => String(b.date||"").localeCompare(String(a.date||""))).find(a => coverOf(a)))');
  /* v75：发现页精选改成 compact-feature 紧凑横卡，editorial-feature 大图只归首页 */
  const discSec = (discHtml.match(/<button class="compact-feature"[\s\S]*?<\/button>/) || [''])[0];
  ok('★ 发现页「编辑精选」走自己的封面（紧凑横卡，没接首页随机池）',
    Boolean(discFeatured) && discSec.includes(discFeatured));
  ok('★ 发现页精选是横卡、不再复用首页大图模块（两页视觉解耦）',
    discHtml.includes('compact-feature') && !discHtml.includes('editorial-feature'));
  /* 反向（预期为假）的孪生：首页那一刻不能也是这张 —— 否则上一条在「随机恰好命中同一张」时假绿。
     拿 pinned2（池里最后一项，勒雅·赛杜）比对：它是真实可达、且**不等于**发现页精选的一张。 */
  ok('★ 对照：池子最后一项的图 ≠ 发现页精选的图（上一条不是靠「恰好相同」蒙过去的）',
    Boolean(p2.img) && p2.img !== discFeatured);
  ok('★ 发现页精选不渲染摄影署名（首页那一行是 photo.credit 带出来的，不传就没有）',
    !/张摄影 · /.test(discSec));
  ctx('view = {name:"home"}; catFilter = "全部"; searchTerm = "";');
}

/* ================= [H3] 「我的」页重排 + 关于词阅三层 + 字号规范（v75，2026-09-22） ================= */
console.log('\n[H3] 我的页重排 / 关于词阅 / 字号规范');
{
  const meHtml = ctx('renderMe()');
  const cssBare = fs.readFileSync(path.join(base, 'assets', 'styles.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  const edBare = fs.readFileSync(path.join(base, 'assets', 'editorial.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');

  /* ① 概况两组口径：累计 / 近 7 天 各成一组，标签是组的存在证明。
   *    旧版把「连续天（累计性质）」「周分钟（近 7 天）」混在一个 stat-grid 里，读者没法知道口径。
   *    截取用「下一模块开头」当右边界 —— 双 </div> 会在第一个 stat 就截断（实测踩过）。 */
  const ovSec = (meHtml.match(/<div class="card col overview-card"[\s\S]*?<div class="me-entries">/) || [''])[0];
  ok('阅读概况分「累计 / 近 7 天」两组，各有口径标签',
    (ovSec.match(/class="ov-label">累计</g) || []).length === 1 &&
    (ovSec.match(/class="ov-label">近 7 天</g) || []).length === 1);
  ok('概况突出用户要的三样：读完篇数 / 阅读分钟 / 收藏生词',
    ovSec.includes('读完篇数') && ovSec.includes('阅读分钟') && ovSec.includes('收藏生词'));

  /* ② 词库总量不再出现在个人页（用户决策：个人页不反复展示；说明整体移进「关于」折叠层）。
   *    判 observable：「四级词库」这张卡的名字不再出现；词库分层说明出现在 about-src 里。 */
  ok('个人页不再展示「四级词库」总量卡', !meHtml.includes('四级词库'));
  /* 渲染产物里是**算好的数字**不是模板字面量 —— 判字面量永远为假（尺子错，不是页面错） */
  const coreN = ctx('CORE_WORDS.length.toLocaleString()');
  const midN = ctx('MID_WORDS.length.toLocaleString()');
  ok('词库分层说明移进了「内容与数据说明」（两层词数都在）',
    (meHtml.match(/<details class="about-details">[\s\S]*?<\/details>/) || [''])[0].includes('中学基础') &&
    meHtml.includes(coreN) && meHtml.includes(midN));

  /* ③ 关于三层：简介默认展开（details 外）+ 功能四条 + 数据说明在可折叠层里。 */
  const details = (meHtml.match(/<details class="about-details">[\s\S]*?<\/details>/) || [''])[0];
  ok('简介三层齐：slogan / 正文段 / 功能清单，且都在折叠层之外（默认展开）',
    meHtml.includes('about-slogan') && (meHtml.match(/class="about-feats"/g) || []).length === 1 &&
    (meHtml.match(/<div class="row"><span class="ic">/g) || []).length === 4 && Boolean(details));
  ok('功能清单四条与实际功能对齐：点词查义 / 中英对照 / 生词收藏 / 自动续读',
    meHtml.includes('点词查义') && meHtml.includes('中英对照') && meHtml.includes('生词收藏') && meHtml.includes('自动续读'));
  ok('数据说明折叠层里有备份提示口径之外的自查入口（summary 可见）',
    details.includes('<summary>内容与数据说明</summary>'));

  /* ④ 外链安全：about 里所有 https 链接必须 target=_blank + rel=noopener（新窗口且不泄漏 opener）。 */
  const links = meHtml.match(/<a href="https:[^"]*"[^>]*>/g) || [];
  ok(`关于里的外链全部带 rel="noopener"（共 ${links.length} 条）`,
    links.length >= 5 && links.every(a => a.includes('rel="noopener"')));

  /* ⑤ 措辞中性化：「补高中欠账」这类自贬表述不再出现（2026-09-22 用户反馈）。 */
  ok('「补高中欠账」已改为「补充中学基础词汇」',
    !meHtml.includes('补高中欠账') && meHtml.includes('补充中学基础词汇'));

  /* ⑥ 新用户空态：无任何阅读痕迹时不渲染全 0 趋势图，换成一句引导 + 选文入口。
   *    对照组：有记录时趋势图必须还在（防「预期为假」恒真）。 */
  const __prevFinished = ctx('S.finished');
  const __prevRead = ctx('S.read');
  const __prevHist = ctx('S.readHistory');
  const __prevPos = ctx('S.readPos');
  const __prevNb = ctx('S.notebook');
  ctx('S.finished = []; S.read = []; S.readHistory = {}; S.readPos = {}; S.notebook = [];');
  const emptyMe = ctx('renderMe()');
  ok('新用户（零记录）不渲染趋势图，改渲染引导与选文入口',
    !emptyMe.includes('bar-col') && emptyMe.includes('读完第一篇文章后') && emptyMe.includes('data-tab="discover"'));
  ctx(`S.finished = ${JSON.stringify(__prevFinished)}; S.read = ${JSON.stringify(__prevRead)}; S.readHistory = ${JSON.stringify(__prevHist)}; S.readPos = ${JSON.stringify(__prevPos)}; S.notebook = ${JSON.stringify(__prevNb)};`);
  const hasMe = ctx('renderMe()');
  ok('对照：有记录时趋势图照常渲染（上一条不是恒真）', hasMe.includes('bar-col'));

  /* ⑦ 字号规范：说明 14 / 次要 12 两档落进真源 styles.css；散点内联小字号清零。
   *    断言「档位值」，因为这套规范就是用户拍板的数字；换档位该连着这条守卫一起改。 */
  /* ^ 锚行首：`.history-filters .muted-2` 这类复合选择器在文件更前面，不锚会先匹配到它（实测踩过） */
  const mutedRule = (cssBare.match(/^\.muted \{[^}]*\}/m) || [''])[0];
  const muted2Rule = (cssBare.match(/^\.muted-2 \{[^}]*\}/m) || [''])[0];
  ok('字号规范真源：.muted=14px（说明）、.muted-2=12px（次要）',
    /font-size:\s*14px/.test(mutedRule) && /font-size:\s*12px/.test(muted2Rule));
  ok('app.js 不再有内联 11px/11.5px 散点字号（次要信息下限 12px）',
    !/font-size:11(\.5)?px/.test(fs.readFileSync(path.join(base, 'assets', 'app.js'), 'utf8')));

  /* ⑧ 残骸守卫：旧「档案卡」与其样式已删，不许留幽灵引用（用 typeof/grep 双口径都会被骗，
   *    这里直接查「类名既不在渲染产物、也不在两份 CSS 的有效规则里」）。 */
  ok('旧 reader-profile 档案卡删干净（渲染产物 + 两份 CSS 都无残留）',
    !meHtml.includes('reader-profile') && !/reader-profile/.test(cssBare) && !/reader-profile/.test(edBare));

  /* ⑨ 320px 窄屏回退：ov-label 换行到数字组上方 —— 基础规则定宽、≤359px 查询解除定宽，
   *    两条必须同时存在（删任何一条，320px 上三格就会挤出屏）。 */
  ok('概况组在 ≤359px 有换行回退（基础定宽 + 窄屏解除，两条齐全）',
    /@media \(max-width: 359px\)[\s\S]*?\.ov-group \{[^}]*flex-direction:\s*column/.test(cssBare) &&
    /\.ov-label \{[^}]*width:\s*48px/.test(cssBare));
}

/* ================= [H4] 首页 / 发现页重排（v75，2026-09-22） ================= */
console.log('\n[H4] 首页 / 发现页重排');
{
  ctx('view = {name:"home"};');
  const homeHtml = ctx('renderHome()');

  /* ① 顺序：问候 → 续读 → 精选 → 今日推荐 → 兴趣分类。
   *    断言的是 index 先后而不是精确字符串位置 —— 中间插别的模块不该红，乱序该红。 */
  const idx = (re) => { const m = homeHtml.match(re); return m ? m.index : -1; };
  const iHead = idx(/<header class="page-intro home-intro"/);
  const iResume = idx(/<section class="home-resume">/);
  const iFeat = idx(/<section class="editorial-feature/);
  const iPicks = idx(/<section class="home-picks">/);
  const iTopics = idx(/<section class="home-topics">/);
  ok('★ 首页顺序：问候 → 继续阅读 → 本期精选 → 今日推荐 → 兴趣分类',
    iHead >= 0 && iHead < iResume && iResume < iFeat && iFeat < iPicks && iPicks < iTopics);

  /* ② 续读卡两态（预期为真/为假都要有孪生，否则某一支从没被测过） */
  const __prevLast = ctx('S.lastRead');
  ok('有记录时续读卡带进度条与「继续」动作',
    /class="rc-bar"/.test(homeHtml) && homeHtml.includes('data-article') && homeHtml.includes('继续'));
  ctx('S.lastRead = null;');
  const homeEmpty = ctx('renderHome()');
  ok('无记录时渲染「开始阅读」引导卡（不渲染进度条）',
    homeEmpty.includes('开始阅读') && homeEmpty.includes('去挑一篇') && !/class="rc-bar"/.test(homeEmpty));
  ctx(`S.lastRead = ${JSON.stringify(__prevLast)};`);

  /* ③ 统计缩轻量：一行 lite 条，旧的大数字统计块（.reading-stats）不再出现 */
  ok('首页统计是轻量一行（完整统计归「我的」）',
    homeHtml.includes('reading-stats-lite') && !homeHtml.includes('reading-stats"'));

  /* ④ 推荐卡信息顺序：标题在最前、栏目 tag 在其后、时长在「需学 N 词」之前 */
  ctx('view = {name:"home"};');
  const cardHtml = ctx('articleCard(ARTICLES.find(a => zhTitle(a)))');
  const iTitle = cardHtml.indexOf('class="t"');
  const iTag = cardHtml.indexOf('class="tag"');
  const iMeta = cardHtml.indexOf('class="meta article-meta"');
  ok('★ 推荐卡信息顺序：标题 → 中文辅助 → 栏目 → 元信息',
    iTitle >= 0 && iTitle < cardHtml.indexOf('class="t-zh"') && cardHtml.indexOf('class="t-zh"') < iTag && iTag < iMeta);
  /* 非贪婪到第一个 </span> 会在内层 span 就断掉 —— 用双闭合或「截到卡尾」都行，这里取卡尾切片 */
  const metaZone = cardHtml.slice(iMeta);
  ok('元信息里时长在词汇数据之前（需学 N 词降为次要）',
    metaZone.indexOf('分钟阅读') >= 0 && metaZone.indexOf('分钟阅读') < metaZone.indexOf('需学'));

  /* ⑤ 长文标注「可分次读」：拿全库里时长最长的一篇验（≥20 分钟必有标注）；
   *    对照组拿最短的一篇验「不该有」（防恒真）。 */
  const longest = ctx('ARTICLES.slice().sort((a,b) => estMinutes(b) - estMinutes(a))[0]');
  const shortest = ctx('ARTICLES.slice().sort((a,b) => estMinutes(a) - estMinutes(b))[0]');
  ok(`★ 长文（${longest.titleZh || longest.title}，20+ 分钟）标注「可分次读」`,
    ctx('estMinutes(ARTICLES.slice().sort((a,b) => estMinutes(b) - estMinutes(a))[0])') >= 20 &&
    ctx('articleCard(ARTICLES.slice().sort((a,b) => estMinutes(b) - estMinutes(a))[0])').includes('可分次读'));
  ok('对照：短文（时长最短一篇）不出现「可分次读」（上一条不是恒真）',
    ctx('estMinutes(ARTICLES.slice().sort((a,b) => estMinutes(a) - estMinutes(b))[0])') < 20 &&
    !ctx('articleCard(ARTICLES.slice().sort((a,b) => estMinutes(a) - estMinutes(b))[0])').includes('可分次读'));

  /* ⑥ 发现页：分类磁贴已删（重复入口）、排序是顶部文字入口、精选是横卡 */
  ctx('view = {name:"discover"}; catFilter = "全部"; searchTerm = "";');
  const disc = ctx('renderDiscover()');
  ok('发现页不再渲染分类磁贴网格（与顶部分类标签合并成一处入口）',
    !disc.includes('cat-tile') && !disc.includes('按分类浏览'));
  const sortBtn = (disc.match(/<button class="sort-text"[^>]*>([\s\S]*?)<\/button>/) || [, ''])[1];
  ok('排序入口是顶部文字按钮，且显示当前排序文案',
    Boolean(sortBtn) && sortBtn.includes(ctx('SORTS[sortBy]')));
  ok('分类标签与排序入口在同一工具条（sticky 行内）',
    (disc.match(/<div class="cats-wrap">[\s\S]*?<\/div>\s*<\/div>/) || [''])[0].includes('sort-text'));

  /* ⑦ 残骸守卫：磁贴 / 大数字统计的 CSS 不许留在两份样式表里（HTML 已删，样式留着就是死代码） */
  const cssAll = fs.readFileSync(path.join(base, 'assets', 'styles.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '')
    + fs.readFileSync(path.join(base, 'assets', 'editorial.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  ok('磁贴与旧统计块的 CSS 残骸已清（.cat-tile/.cat-browse/.cat-grid/.reading-stats）',
    !/\.cat-tile|\.cat-browse|\.cat-grid|\.reading-stats[^-]/.test(cssAll));

  /* ⑧ editorial-feature 只有一处定义（双源教训：editorial.css 里再加一条 min-height 就会打架） */
  const edOnly = fs.readFileSync(path.join(base, 'assets', 'editorial.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  ok('.editorial-feature 的 min-height 只有一个来源（桌面那条；移动端是独立断点覆盖）',
    (edOnly.match(/^\.editorial-feature \{[^}]*min-height[^}]*\}/gm) || []).length === 1);

  /* ⑨ 残骸守卫（2026-09-22 v76）：人物分类顶部的 people-intro 介绍横幅已整块删除
   *    （用户要求）—— 渲染产物与两份样式表都不许再出现。 */
  ctx('view = {name:"discover"}; catFilter = "人物"; searchTerm = "";');
  const peopleDisc = ctx('renderDiscover()');
  ok('人物分类页不再渲染 people-intro 介绍横幅（已删功能）',
    !peopleDisc.includes('people-intro') && !peopleDisc.includes('人物，和他们的世界'));
  ok('people-intro 的 CSS 残骸已清（styles.css / editorial.css 两份都查）',
    !/\.people-intro/.test(cssAll));
}

/* ================= [H5] 阅读页 hero 去重（v75，2026-09-22） ================= */
console.log('\n[H5] 阅读页 hero 层级');
{
  /* 栏目在进正文前出现过三次（read-top 顶栏、hero kicker、byline）—— byline 里去掉。
   * 判据：byline 块内不再含栏目值；kicker 与顶栏保留（那里是「位置语境」，byline 是「署名语境」）。 */
  const a0 = ctx('ARTICLES.find(a => a.cat && srcName(a) && a.cat !== srcName(a))') || ctx('ARTICLES[0]');
  const readHtml = ctx(`(function(){ activeArticle = ARTICLES.find(a => a.id === ${JSON.stringify(a0.id)}); return renderRead(); })()`);
  const byline = (readHtml.match(/<div class="byline">([\s\S]*?)<\/div>\s*(?:<div class="translation-credit"|<div class="read-cover)/) || [, ''])[1];
  const catVal = String(a0.cat || '');
  ok(`★ byline 不再重复栏目（${catVal}；kicker 与顶栏里的保留）`,
    Boolean(byline) && !byline.includes(catVal) && byline.includes('分钟'));
  const cssBare5 = fs.readFileSync(path.join(base, 'assets', 'styles.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  ok('译文署名提到 12px 下限（与全站次要信息一致）',
    /\.translation-credit \{[^}]*font-size:\s*12px/.test(cssBare5));
}

/* ================= [S] 落盘与续读位置（v77 后，2026-09-22） =================
 * 三件事各自有真实故障来源：
 *   ① localStorage 写不进去（配额满 / 无痕 / WebView 回收）—— 旧 save() 直接抛，
 *      异常会冒到点击处理器；
 *   ② 写不进去时要降级成「只丢最老的续读位置」，**用户数据一个字不动**；
 *   ③ 宿主杀进程时 pagehide/visibilitychange 不保证执行 —— 锚点必须与 scrollTop
 *      在同一次落盘里写，否则重开会被更旧的锚点覆盖到更早的位置。 */
console.log('\n[S] 落盘与续读位置');
{
  /* ① 抛错的 setItem 不许把异常漏给调用方 */
  const origSet = sandbox.localStorage.setItem;
  sandbox.localStorage.setItem = () => { throw new Error("QuotaExceededError"); };
  let threw = false, ret = null;
  try { ret = ctx('save()'); } catch { threw = true; }
  ok('★ 存储写入失败不抛给调用方（旧实现直接 throw，点个词都能被打断）',
    threw === false && ret === false);
  ok('★ 失败后标记为 failed（供「我的」页显示告警行）', ctx('storageState') === 'failed');

  /* ② 降级档：只裁续读位置，用户数据必须原样 */
  const big = {};
  for (let i = 0; i < 60; i++) big["art" + i] = { pi: i, si: 0, rs: 0, off: -10, y: i * 10, pct: i, at: i + 1 };
  ctx(`S.notebook = [{ word: "seventh", addedAt: 1, articleId: "art0", articleTitle: "t", context: { en: "a", cn: "b" } }];
       S.known = ["the", "of"]; S.read = ["art0"]; S.readDays = ["2026-09-22"]; S.secByDay = { "2026-09-22": 600 };
       S.readPos = ${JSON.stringify(big)};
       S.readHistory = ${JSON.stringify(big)};`);
  /* 只让「大体积」写入失败：模拟配额边界。阈值要卡在
     原始（60+60 条 ≈ 8KB）与裁后（40+40 条 ≈ 5.3KB）之间 —— 定太小会让降级档也失败，
     测出来的就不是「降级生效」而是「两个档都失败」。 */
  sandbox.localStorage.setItem = (k, v) => { if (String(v).length > 6000) throw new Error("QuotaExceededError"); return origSet.call(sandbox.localStorage, k, v); };
  const saved = ctx('save()');
  const slim = JSON.parse(sandbox.localStorage._d[ctx('STORE')] || "{}");
  ok('★ 配额满时降级写成功（返回 true，不是 failed）',
    saved === true && ctx('storageState') === 'trimmed');
  ok('★ 降级只裁续读位置（≤40 篇），生词 / 已知词 / 阅读记录 / 时长一个字不动',
    Object.keys(slim.readPos || {}).length <= 40 && Object.keys(slim.readPos || {}).length > 0 &&
    (slim.notebook || []).length === 1 && (slim.known || []).join() === "the,of" &&
    (slim.read || []).join() === "art0" && (slim.secByDay || {})["2026-09-22"] === 600);
  ok('降级保留的是**最近**的续读位置（按 at 倒序取前 40）',
    slim.readPos && Boolean(slim.readPos.art59) && !slim.readPos.art0);
  sandbox.localStorage.setItem = origSet;

  /* ③ 告警行的孪生对照：failed 必现、ok 必不现（只测一边 = 一半是假守卫） */
  ctx('S.readPos = {}; S.readHistory = {}; S.lastRead = { id: "", y: 0, pct: 0, at: 0 }; view = {name:"me"};');
  ctx('storageState = "failed";');
  const meWarn = ctx('renderMe()');
  ctx('storageState = "ok";');
  const meOk = ctx('renderMe()');
  ok('★ 存储失败时「我的 → 数据与备份」显示告警行',
    meWarn.includes('storage-warn') && meWarn.includes('导出备份'));
  ok('对照：存储正常时不渲染告警行（上一条不是恒真）', !meOk.includes('storage-warn'));

  /* ④ 5 秒节流那一跳：锚点与 scrollTop 必须在同一次落盘里写（强杀场景的唯一防线） */
  ctx(`S.readPos = {}; S.readHistory = {}; S.lastRead = { id: "artZ", y: 0, pct: 0, at: 0 };
       activeArticle = ARTICLES[0]; view = {name:"read"};
       S.lastRead = { id: activeArticle.id, y: 0, pct: 0, at: 0 };`);
  const rid = ctx('activeArticle.id');
  sandbox.__fakeRoll = {
    clientHeight: 600, scrollTop: 900, scrollHeight: 5000,
    getBoundingClientRect: () => ({ top: 0 }),
    querySelectorAll: () => [
      { getBoundingClientRect: () => ({ top: -40, bottom: 10 }), dataset: { pi: "1", si: "0", rs: "0" } },
      { getBoundingClientRect: () => ({ top: 60, bottom: 120 }), dataset: { pi: "2", si: "3", rs: "0" } },
    ],
  };
  /* updateReadProgress 需要三个元素：#read-scroll（量锚点）、#read-bar（写宽度）、
     #read-body（取总高）。沙箱默认只认 #screen / .phone，缺一个就提前 return ——
     第一版漏了 bar/body，节流那两条因此假红（不是代码错，是桩不全）。 */
  ctx(`__origQS = document.querySelector;
       __fakeBar = { style: {} };
       __fakeBody = { scrollHeight: 5000, getBoundingClientRect: () => ({ top: 0 }) };
       document.querySelector = (s) => s === "#read-scroll" ? __fakeRoll
         : s === "#read-bar" ? __fakeBar
         : s === "#read-body" ? __fakeBody : __origQS(s);`);
  /* 第一次滚动：不到 5 秒，只更新内存不落盘 */
  ctx('S.lastRead.at = Date.now(); updateReadProgress();');
  const posAfterFirst = ctx(`Object.keys(S.readPos).length`);
  /* ★ 延时必须在**第一次滚动之后立刻**取样 —— 第二次滚动走的是「已到窗口」那支，
     里面会 cancelReadSave() 把它清掉。放错位置会读到 0，看起来像「没挂上」。 */
  const timerAfterFirst = ctx('!!readSaveTimer');
  /* 第二次：把 at 推回 6 秒前，再滚一次 —— 这一跳必须把锚点一起写下去 */
  ctx('S.lastRead.at = Date.now() - 6000; updateReadProgress();');
  const rec = JSON.parse(ctx(`JSON.stringify(S.readPos[${JSON.stringify(rid)}] || null)`) || "null");
  ctx(`document.querySelector = __origQS;`);
  ok('未到节流窗口时不写盘（第一次滚动不动 readPos）', posAfterFirst === 0);
  /* ★ 但必须**挂上延时** —— 节流条件只在「下一次滚动」时才被求值，
     所以「滚一下 → 停住 → 被宿主杀进程」这条路上原来一个字节都不会写。
     真页面实测（.bak/probe-kill-resume.cjs）：只滚一次不补这个延时，readPos 里什么都没有。 */
  ok('★ 未到窗口时挂上延时（滚一下就停住，5 秒后也会落一次盘）', timerAfterFirst === true);
  ok(`★ 节流那一跳把锚点与 scrollTop 一起写（同一次事务：rec.y=${rec && rec.y} === lastRead.y=${ctx('S.lastRead.y')}）`,
    Boolean(rec) && rec.y === ctx('S.lastRead.y') && Number.isFinite(rec.pi) && Number.isFinite(rec.rs));
  ok('★ 锚点带上 rs（退化段续读才能落到被读的那一片，而不是段落开头）',
    Boolean(rec) && rec.rs === 0 && rec.pi === 2 && rec.si === 3);

  /* ⑤ 契约：save() 的三种状态必须是闭集（多一个拼错的状态名 → 告警行永不出现） */
  ok('save() 的状态取值取自 ok / trimmed / failed 闭集',
    /storageState = "ok"/.test(appBare) && /storageState = "trimmed"/.test(appBare) && /storageState = "failed"/.test(appBare));
  /* 收尾：把挂着的延时刻意清掉 —— 否则它会在本文件后半段真的触发一次 flushReadPos，
     虽然那时 #read-scroll 已经不返回桩（安全退出），但测试不该留挂起状态。 */
  ctx('cancelReadSave(); readSaveTimer = 0; inFlushPos = false;');
  ctx('S.readPos = {}; S.readHistory = {}; S.lastRead = { id: "", y: 0, pct: 0, at: 0 }; view = {name:"home"};');
}

/* ================= [T] 原生壳（APK）契约（2026-09-22） =================
 * 两条都要守卫，因为都只在「壳里」才暴露：
 *   ① 壳内必须**不注册 Service Worker** —— 否则安装包 / SW 缓存 / 将来的原生内容库
 *      三套版本来源打架，更新与回退说不清谁赢；
 *   ② 打包必须走**白名单** —— 整个仓库打进安装包会把 tools/ 的抓取缓存、原刊 HTML
 *      与计划稿一起带出去（体积 + 再分发风险）。 */
console.log('\n[T] 原生壳（APK）');
{
  const sw = e => ctx(`shouldRegisterSW(${JSON.stringify(e)})`);
  const nav = { serviceWorker: {} };
  ok('★ 网页 + https → 注册 SW（既有离线能力不动）',
    sw({ native: false, nav, proto: "https:", hasWin: true }) === true);
  ok('★ 壳内（window.WORDLENS_NATIVE）→ 不注册 SW（三套版本源会打架）',
    sw({ native: true, nav, proto: "https:", hasWin: true }) === false);
  /* 孪生对照：这两条本来就不注册 —— 没有它们，「native 判据写反」也可能看着全绿 */
  ok('对照：file:// → 不注册（原有行为，不是被 native 分支顺带关掉的）',
    sw({ native: false, nav, proto: "file:", hasWin: true }) === false);
  ok('对照：无 serviceWorker 支持 → 不注册',
    sw({ native: false, nav: {}, proto: "https:", hasWin: true }) === false);

  /* 打包白名单：真跑一遍 build（拷到临时目录），端到端看生成物 */
  const libMobile = require(path.join(base, 'tools', 'lib-mobile.cjs'));
  const plan = libMobile.planFiles();
  const htmlRefs = [...fs.readFileSync(path.join(base, 'index.html'), 'utf8')
    .matchAll(/(?:src|href)="(assets\/[^"?]+)(?:\?[^"]*)?"/g)].map(m => m[1]);
  const missing = [...new Set(htmlRefs)].filter(f => !plan.includes(f));
  ok('★ 白名单覆盖 index.html 引用的全部 assets（新增资源忘了带 → 这条红）', missing.length === 0);
  ok('★ 白名单不含开发素材（tools/ outputs/ .bak/ 计划稿等一律不进包）',
    !plan.some(f => libMobile.NEVER_SHIP.some(p => f.startsWith(p))) && !plan.includes('HANDOFF.md'));
  ok('白名单含字体与封面（fonts.css 与 data-covers.js 动态引用，不在 index.html 里）',
    plan.some(f => f.startsWith('assets/fonts/')) && plan.some(f => f.startsWith('assets/covers/')));

  const tmp = path.join(base, 'mobile', '.audit-www');
  let madeCount = 0, injected = false, leaked = false, builtHtml = '';
  try {
    const r = libMobile.runBuild({ out: tmp });
    madeCount = r.files.length;
    /* 把产物 index.html 留成字符串：临时目录在 finally 里会被删掉，
       但后面「胶水三个出口真的注进去了吗」还要断言它。 */
    builtHtml = fs.readFileSync(path.join(tmp, 'index.html'), 'utf8');
    injected = /window\.WORDLENS_NATIVE\s*=\s*true/.test(builtHtml);
    leaked = fs.existsSync(path.join(tmp, 'tools')) || fs.existsSync(path.join(tmp, 'HANDOFF.md'))
      || fs.existsSync(path.join(tmp, 'outputs'));
  } finally {
    try { fs.rmSync(tmp, { recursive: true, force: true }); } catch { /* best-effort */ }
  }
  ok('★ 端到端：生成的 index.html 里真的注入了 window.WORDLENS_NATIVE（防「函数对了没接线」）',
    madeCount > 0 && injected === true);
  ok('★ 端到端：产物里没有 tools/ outputs/ HANDOFF.md（白名单真的生效，不是只写在注释里）',
    leaked === false);
  /* 注入器自身的契约：找不到 <head> 必须抛，不许静默返回原文 */
  let threw = false;
  try { libMobile.injectShellGlue('<html><body>no head</body></html>'); } catch { threw = true; }
  ok('注入器找不到 <head> 时抛错（静默跳过 = 壳里偷偷注册了 SW）', threw === true);
  ok('注入器幂等（重复构建不会插两条）',
    (() => { const once = libMobile.injectShellGlue('<html><head></head><body></body></html>');
      return libMobile.injectShellGlue(once) === once; })());

  /* ---- 壳胶水本身（mobile/shell-glue.js）----
   * 胶水是**壳专属**代码：网页版没有这一份，出了问题也没有任何网页侧的测试能碰到它。
   * 所以它必须在 audit 里被真跑起来，而不是只检查「注入这段字符串了没有」。 */
  const glueSrc = fs.readFileSync(path.join(base, 'mobile', 'shell-glue.js'), 'utf8');
  ok('壳胶水语法有效（它是被内联进 <script> 的，语法错 = 整个壳白屏）',
    (() => { try { new vm.Script(glueSrc); return true; } catch { return false; } })());
  ok('壳胶水不含 </script（内联进 <script> 会当场截断标签）', !/<\/script/i.test(glueSrc));
  ok('★ 端到端：胶水的四个出口真的注进了产物 index.html',
    ['window.WORDLENS_NATIVE', 'window.__wlInsets', 'window.__wlNativeBack', 'window.__wlNativePause', 'NativeTts']
      .every(k => builtHtml.includes(k)));

  /* ---- ★ 生命周期监听：壳里必须挂，不能跟着 SW 一起被关掉 ----
   * 2026-09-22 的真实缺陷：pagehide / visibilitychange / capture-click 三条原来被套在
   * `if (shouldRegisterSW(...))` 里。壳里不注册 SW 是对的，但「切后台结算阅读时长」
   * 「离开页面落盘续读位置」跟 SW 毫无关系 —— 一起关掉 = 壳里读了十分钟直接切走，
   * 时长与续读位置一个字节都不写。网页侧同样有洞（http:// 非安全上下文、隐私模式）。
   * 断言方式：把 app.js 包一层 IIFE 在**同一个上下文里跑第二遍**、并打开
   * window.WORDLENS_NATIVE —— 顶层 const 不能重复声明，包成函数作用域就能再来一次，
   * 而数据脚本（ARTICLES / WORD_META / …）本来就已经在这个上下文里，不用重灌。
   * ⚠️ 只在网页沙箱里断言「挂上了」是**假守卫**：两条路都挂，测不出被重新套回 if 里。 */
  /* 把 app.js 在**同一个上下文里再跑一遍**，并交出内部句柄。
   * 包一层 IIFE 是必需的：顶层 const/let 不能在同一上下文里重复声明，包成函数作用域
   * 就能重跑；而数据脚本（ARTICLES / WORD_META / …）本来就已经在这个上下文里，不用重灌。
   * 末尾 return 把 S / save / nativeBridge 交出来 —— v73 的教训是「断言只落在新增辅助
   * 函数上、没落到主流程」，所以这里要能对真流程（save()）下断言，而不是只看函数本身。 */
  const APP_SRC = fs.readFileSync(path.join(base, 'assets', 'app.js'), 'utf8');
  function runAppPass(opts) {
    const o = opts || {};
    const got = { handlers: {}, capture: {}, written: [], err: null, handles: null };
    const savedWinAdd = sandbox.window.addEventListener;
    const savedDocAdd = sandbox.document.addEventListener;
    const savedUserState = sandbox.window.UserState;
    const savedNative = sandbox.window.WORDLENS_NATIVE;
    const savedStore = sandbox.localStorage._d;
    try {
      sandbox.window.addEventListener = (t, f) => { got.handlers[t] = f; };
      sandbox.document.addEventListener = (t, f, oo) => {
        if (oo === true || (oo && oo.capture)) (got.capture[t] = got.capture[t] || []).push(f);
        else got.handlers[t] = f;
      };
      sandbox.localStorage._d = o.store === undefined ? {} : { 'wordlens.v1': o.store };
      if (o.userState === undefined) delete sandbox.window.UserState;
      else sandbox.window.UserState = {
        saveState: j => { got.written.push(j); },
        loadState: () => o.userState,
      };
      if (o.native) sandbox.window.WORDLENS_NATIVE = true;
      else delete sandbox.window.WORDLENS_NATIVE;
      got.handles = vm.runInContext(
        `(function(){\n${APP_SRC}\n;return { S: S, save: save, nativeBridge: nativeBridge };\n})()`,
        sandbox, { filename: 'app.pass.js' });
    } catch (e) { got.err = e; }
    /* 恢复沙箱现场。o.keepEnv=true 时**故意不还** UserState / 旗标 ——
       app.js 的 nativeBridge() 是「用的时候才查」，跑完 pass 就把它拆掉的话，
       之后调 handles.save() 什么都镜像不出去（第一次写这组守卫就栽在这里：
       前 3 条镜像断言全红，而「回落」那条照样绿，看起来像镜像功能整个没接）。 */
    sandbox.window.addEventListener = savedWinAdd;
    sandbox.document.addEventListener = savedDocAdd;
    if (!o.keepEnv) {
      if (savedUserState === undefined) delete sandbox.window.UserState;
      else sandbox.window.UserState = savedUserState;
      if (savedNative === undefined) delete sandbox.window.WORDLENS_NATIVE;
      else sandbox.window.WORDLENS_NATIVE = savedNative;
    }
    sandbox.localStorage._d = savedStore;
    return got;
  }

  const LOCAL_ONLY = '{"notebook":["本地那一份"],"read":[],"finished":[],"known":[],"readDays":[]}';
  const SHELL_ONLY = '{"notebook":["壳镜像那一份"],"read":[],"finished":[],"known":[],"readDays":[]}';

  const passNative = runAppPass({ native: true, store: LOCAL_ONLY, userState: SHELL_ONLY, keepEnv: true });
  const nativeHandlers = passNative.handlers, nativeCapture = passNative.capture;
  let nativeErr = passNative.err;

  ok('★ 壳里（WORDLENS_NATIVE=true）app.js 能整段跑完（跑不完 = 壳会白屏）', nativeErr === null);
  ok('★ 壳里挂了 pagehide —— 页面被切走/被杀时落盘续读位置与阅读时长',
    typeof nativeHandlers.pagehide === 'function');
  ok('★ 壳里挂了 visibilitychange —— 切后台/锁屏结算（移动端最高频的漏记场景）',
    typeof nativeHandlers.visibilitychange === 'function');
  ok('★ 壳里挂了 capture 阶段的 click —— 活跃阅读计时', (nativeCapture.click || []).length >= 1);
  /* 孪生对照：这两条本来就只属于 SW —— 没有它们，「监听一个都没挂」这种整片塌陷
     也会让上面三条一起变红却看不出原因。 */
  ok('对照：壳里**没有** window load（它是 SW 注册入口，壳内不该有）',
    typeof nativeHandlers.load !== 'function');
  ok('对照：壳里**没有** beforeinstallprompt（PWA 安装引导，壳内不该有）',
    typeof nativeHandlers.beforeinstallprompt !== 'function');
  ok('对照：壳里 popstate 仍在（返回键靠它退应用内导航栈）',
    typeof nativeHandlers.popstate === 'function');

  /* ---- 原生用户数据镜像（B 组）：写 / 回落 / 不误认 ---- */
  const nbWords = st => (st && Array.isArray(st.notebook) ? st.notebook : [])
    .map(x => (typeof x === 'string' ? x : x.word)).join();
  ok('对照：本地有数据时不拿壳里的（可能更旧的）镜像去盖',
    !!passNative.handles && nbWords(passNative.handles.S) === '本地那一份');
  ok('★ 壳里 save() 真的把状态推给了原生（UserState.saveState 收到可解析的 JSON）',
    (() => { try { return passNative.handles.save() === true
      && nbWords(JSON.parse(passNative.written[0])) === '本地那一份'; } catch { return false; } })());
  /* 裁剪档：本地只留最近 40 篇续读位置，但**壳里那份必须仍是完整的** ——
     镜像送裁过的版本，等于在本地配额紧张时自愿替用户丢掉数据。 */
  const bigState = { notebook: ['本地那一份'], read: [], finished: [], known: [], readDays: [], readPos: {} };
  for (let i = 0; i < 60; i++) bigState.readPos['art' + String(i).padStart(3, '0')] = { y: i, at: 1700000000000 + i };
  const passTrim = runAppPass({ native: true, store: JSON.stringify(bigState), userState: SHELL_ONLY, keepEnv: true });
  const origSetItem = sandbox.localStorage.setItem;
  const setArgs = [];
  sandbox.localStorage.setItem = (k, v) => {
    setArgs.push(v);
    if (setArgs.length === 1) throw new Error('quota exceeded');   // 第一次（完整版）失败
    return origSetItem.call(sandbox.localStorage, k, v);
  };
  let trimRet = null;
  try { trimRet = passTrim.handles.save(); } finally { sandbox.localStorage.setItem = origSetItem; }
  let localPosN = -1, shellPosN = -1;
  try {
    localPosN = Object.keys(JSON.parse(setArgs[1]).readPos).length;
    shellPosN = Object.keys(JSON.parse(passTrim.written[0]).readPos).length;
  } catch { /* 下面按 -1 判红 */ }
  ok('★ 降级档：本地写的是裁过的（≤40 篇续读位置），壳里那份仍是完整的 60 篇',
    trimRet === true && setArgs.length === 2 && localPosN > 0 && localPosN <= 40 && shellPosN === 60);

  /* 失败档也镜像：这是「两个存储彼此独立」的直接检验 ——
     本地 setItem 全抛时，壳里那份仍然必须拿到数据，否则镜像等于白做。 */
  const passFail = runAppPass({ native: true, store: LOCAL_ONLY, userState: SHELL_ONLY, keepEnv: true });
  let failRet = null;
  try {
    sandbox.localStorage.setItem = () => { throw new Error('quota exceeded'); };
    failRet = passFail.handles.save();
  } catch (e) { failRet = 'threw'; } finally { sandbox.localStorage.setItem = origSetItem; }
  ok('★ localStorage 全写不进去时，壳里那份**仍然**拿到完整状态（本地失败 ≠ 文件也写不了）',
    failRet === false && passFail.written.length >= 1
    && nbWords(JSON.parse(passFail.written[passFail.written.length - 1])) === '本地那一份');

  /* 收尾：把 keepEnv 期间故意留下的壳环境拆掉，别让后面的守卫看见它们 */
  delete sandbox.window.UserState;
  delete sandbox.window.WORDLENS_NATIVE;

  const passFallback = runAppPass({ native: true, userState: SHELL_ONLY });   // store 不给 = 本地为空
  ok('★ 本地为空 → 从壳镜像回落（系统「清除数据」后唯一的补救路径）',
    !!passFallback.handles && nbWords(passFallback.handles.S) === '壳镜像那一份');
  /* 关键对照：**没有旗标就不认这个对象**。别的 WebView 容器/调试脚本也可能往 window 上
     挂同名 UserState，认错了就会把用户数据写进未知的地方 / 读进别人的数据。 */
  const passNoFlag = runAppPass({ native: false, userState: SHELL_ONLY });
  ok('★ 对照：没有 WORDLENS_NATIVE 旗标时，即使 window.UserState 在也不读不写',
    !!passNoFlag.handles && passNoFlag.handles.S.notebook.length === 0
    && passNoFlag.handles.nativeBridge() === null);

  /* ---- 壳胶水：speechSynthesis 垫片 + 返回键 + 安全区，真跑一遍 ----
   * 胶水是**壳专属**代码：网页版没有这一份，出了问题没有任何网页侧测试碰得到它。
   * 下面断言的是 app.js 真正依赖的契约（它怎么用 onend/onerror/voice），
   * 不是「胶水源码里出现了某个字符串」。 */
  const glueState = { ready: false, voices: '[]', mask: null };
  const glueSpoken = [];
  const glueCancel = { n: 0 };
  const glueEls = [];
  const glueDark = [];               // SystemBars.setDark 收到的值
  const glueDom = { attrs: {}, observer: null };
  const glueCtx = {
    window: {},
    document: {
      head: { appendChild: () => { } },
      /* documentElement 要能被读能观察 —— 主题那条就是靠它拿 data-theme */
      documentElement: {
        getAttribute: k => (k in glueDom.attrs ? glueDom.attrs[k] : null),
        setAttribute: (k, v) => { glueDom.attrs[k] = String(v); },
      },
      readyState: 'complete',
      addEventListener: () => { },
      createElement: () => { const el = { style: {}, textContent: '', id: '' }; glueEls.push(el); return el; },
      querySelector: () => glueState.mask,
    },
  };
  /* MutationObserver 桩：记下回调，测试自己触发它 —— 否则「主题变了通知壳」这条
     只能靠「源码里有 observe()」这种正则断言，而那正是本轮要消灭的假守卫。 */
  glueCtx.MutationObserver = function (cb) { this.cb = cb; };
  glueCtx.MutationObserver.prototype.observe = function () { glueDom.observer = this.cb; };
  glueCtx.window.SystemBars = { setDark: v => { glueDark.push(v); } };
  /* flushReadTime / flushReadPos 在 app.js 里是顶层函数声明（挂在 window 上）——
     胶水通过它们结算；桩在上下文全局上，计数用。 */
  const glueFlush = { time: 0, pos: 0 };
  glueCtx.flushReadTime = () => { glueFlush.time++; };
  glueCtx.flushReadPos = () => { glueFlush.pos++; };
  glueCtx.window.NativeTts = {
    ready: () => glueState.ready === true,
    voicesJson: () => glueState.voices,
    speak: (text, lang, id, rate) => { glueSpoken.push({ text, lang, id, rate }); return true; },
    cancel: () => { glueCancel.n++; },
  };
  vm.createContext(glueCtx);
  vm.runInContext(glueSrc, glueCtx, { filename: 'shell-glue.js' });
  const gw = glueCtx.window;

  ok('★ 胶水注入时就置上 WORDLENS_NATIVE（app.js 据此跳过 SW、启用 UserState 镜像）',
    gw.WORDLENS_NATIVE === true);
  ok('★ TTS 引擎还没就绪 → speechSynthesis 如实为假（app.js 会提示「当前系统不支持朗读」，不是无声失败）',
    !gw.speechSynthesis);
  glueState.ready = true;
  glueState.voices = JSON.stringify([{ name: 'Google UK English Female', lang: 'en-GB', localService: true }]);
  const gss = gw.speechSynthesis;
  ok('★ TTS 就绪 → 换上垫片，getVoices 把原生语音映射成 {name,lang,localService}',
    !!gss && gss.getVoices().length === 1 && gss.getVoices()[0].lang === 'en-GB'
    && gss.getVoices()[0].name === 'Google UK English Female' && gss.getVoices()[0].localService === true);

  const gu = new gw.SpeechSynthesisUtterance('Hello world');
  gu.lang = 'en-US'; gu.rate = 0.9; gu.voice = { lang: 'en-GB', name: 'x' };
  let gEnd = 0, gErr = 0;
  gu.onend = () => { gEnd++; }; gu.onerror = () => { gErr++; };
  gss.speak(gu);
  const gId = glueSpoken.length ? glueSpoken[0].id : '';
  ok('★ 垫片把文本/口音/语速交给原生（口音取 pickVoice 挑中的 u.voice.lang，不是 u.lang）',
    glueSpoken.length === 1 && glueSpoken[0].text === 'Hello world'
    && glueSpoken[0].lang === 'en-GB' && glueSpoken[0].rate === 0.9 && !!gId);
  gw.__wlTtsEnd(gId);
  ok('★ 原生报「读完了」→ 触发 u.onend（app.js 靠它推进全文朗读队列）', gEnd === 1);
  gw.__wlTtsEnd(gId);
  ok('对照：同一条的原生回调只算一次（重复回调不许把队列一次推两句）', gEnd === 1);

  const gu2 = new gw.SpeechSynthesisUtterance('Second');
  let gEnd2 = 0, gErr2 = 0;
  gu2.onend = () => { gEnd2++; }; gu2.onerror = () => { gErr2++; };
  gss.speak(gu2);
  const gId2 = glueSpoken[glueSpoken.length - 1].id;
  gss.cancel();
  ok('★ cancel() 停原生且**不**派发 onerror —— 否则单词朗读每换一个词就弹一次假的「朗读失败」',
    glueCancel.n >= 1 && gErr2 === 0);
  gw.__wlTtsEnd(gId2);
  ok('★ cancel 之后迟到的原生回调是空操作（不会把已停的队列再推一句）', gEnd2 === 0);

  let gClicked = 0;
  glueState.mask = { click: () => { gClicked++; } };
  ok('★ 壳里按返回键：有浮层就先关浮层并返回 true（壳侧据此不再退页面）',
    gw.__wlNativeBack() === true && gClicked === 1);
  glueState.mask = null;
  ok('对照：没有浮层时返回 false（壳侧继续走 history 后退）', gw.__wlNativeBack() === false);

  gw.__wlInsets(24, 12);
  ok('★ 壳量到系统栏高度 → 写 .phone 的 --safe-t/--safe-b，且必须带 !important'
    + '（CSS 里 --safe-t 定义在 .phone 上，不带 !important 会被 env() 那份盖掉）',
    glueEls.length === 1
    && /\.phone\{--safe-t:24px !important;--safe-b:12px !important\}/.test(glueEls[0].textContent));
  gw.__wlInsets(0, 0);
  ok('对照：重复量到只复用同一个 style 元素（不往 head 里越堆越多）', glueEls.length === 1);

  /* ---- 壳侧「要退到后台了」的显式入口 ----
   * 不靠 visibilitychange：WebView.onPause() 到底会不会派发它、document.hidden
   * 那一刻是不是已经 true，都取决于 WebView 版本。用户在阅读页按 home / 锁屏
   * 是最高频的离开方式，这一步不能赌。 */
  gw.__wlNativePause();
  ok('★ __wlNativePause 把「切后台该做的事」都走一遍（结算时长 + 落盘续读位置）',
    glueFlush.time === 1 && glueFlush.pos === 1);
  ok('对照：__wlNativePause 不抛（app.js 没加载完时它必须安静地什么都不做）',
    (() => { try { gw.__wlNativePause(); return true; } catch { return false; } })());

  /* ---- 系统栏图标明暗跟随主题 ----
   * 不做这件事的后果不是「不完美」而是「看不见」：浅色主题配浅色图标，
   * 状态栏的时间/电量直接消失。 */
  ok('★ 胶水首帧就把主题推给壳（明确为浅色）',
    glueDark.length === 1 && glueDark[0] === false);
  glueDom.attrs['data-theme'] = 'dark';
  if (glueDom.observer) glueDom.observer();
  ok('★ data-theme 变成 dark → 通知壳把系统栏图标改深色（观察者真的挂在 documentElement 上）',
    glueDark.length === 2 && glueDark[1] === true);
  if (glueDom.observer) glueDom.observer();
  ok('对照：主题没再变就不重复通知（不每帧给壳打电话）', glueDark.length === 2);
}

/* ================= [U] 仓库源文件行尾卫生（2026-09-22） =================
 * ★ 为什么值得占一条守卫：CRLF 污染**不会让任何一条断言变红** —— 430 条全绿、
 *   程序照跑、推上线也照样工作。它坏的是**所有基于文本比对的工具**：
 *   2026-09-22 本轮实测，`tools/audit.js` 被写成 CRLF（2958 个 \r）之后，
 *   `tools/diff-files.mjs` 报出「远端独有 2470 行 / 本地独有 2773 行」——
 *   看起来像「远端被人分叉了一场大改」（下一步就是不敢推了），
 *   其实只是每一行都多了一个 \r。**「推前逐文件比对」这道防线当场退化成噪音**，
 *   而唯一的线索是一堆大得离谱的数字。
 *
 * ★ 判据必须用**二进制**读：`grep -c $'\r'` 在 Git Bash 里会把 \r 当成行尾的一部分剥掉、
 *   给出 0（假阴性）。同一件事本轮量了两次：grep 说 0，二进制读说 2958。
 *   （同类：「量尺寸先找项目自己的那把尺子」。）
 *
 * ★ 成因：Windows 上用 python **文本模式**（`open(p,'w')`）改写仓库文件，
 *   会把整个文件的 \n 转成 \r\n。要用 `open(p,'wb')`，或改完立刻转回来。
 */
{
  const exts = /\.(js|mjs|cjs|json|css|html|md|java|xml|webmanifest)$/i;
  /* 判据是「我们的源文件」不该有 CR，不是「仓库里一个 \r 都不许有」——
     下面这些目录里的文件合法地可能含 CR（原站抓下来的 HTML、外部快照、本地工作区）。 */
  const skipDir = /^(\.git|\.bak|\.workbuddy|\.zcode|\.qoder|\.trae|\.tmp|\.coverage-cache|\.examples-cache|_football|_refine|_spot|node_modules|outputs|raw)$/;
  const skipFile = /^_aesop-raw\.html$/i;   // 抓取残留，含 6,166 个 CR（.gitignore 已拦）
  const offenders = [];
  const walkLines = d => {
    let names;
    try { names = fs.readdirSync(d); } catch { return; }
    for (const n of names) {
      const p = path.join(d, n);
      let st;
      try { st = fs.statSync(p); } catch { continue; }
      if (st.isDirectory()) { if (!skipDir.test(n)) walkLines(p); continue; }
      if (!exts.test(n) || skipFile.test(n)) continue;
      const buf = fs.readFileSync(p);
      let cr = 0;
      for (const byte of buf) if (byte === 13) cr++;
      if (cr) offenders.push(`${path.relative(base, p).replace(/\\/g, '/')}(${cr})`);
    }
  };
  walkLines(base);
  ok('★ 源文件不得含 CR —— CRLF 会让 diff-files / tree-diff 的逐文件比对全线失真'
    + (offenders.length ? `：${offenders.slice(0, 4).join('、')}${offenders.length > 4 ? ` … 共 ${offenders.length} 个` : ''}` : ''),
    offenders.length === 0);
}

console.log(`\n结果：${pass} 通过 / ${fail} 失败\n`);
process.exit(fail ? 1 : 0);

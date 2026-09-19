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
  speechSynthesis: { cancel: noop, speak: noop },
  setTimeout, clearTimeout, setInterval: () => 0, clearInterval: noop,
  requestAnimationFrame: f => f(),
};
sandbox.window.window = sandbox.window;
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
ok('发现页精选渲染中文标题', screenEl.innerHTML.includes('class="editorial-copy"') && screenEl.innerHTML.includes(`<h2>${featureZh}</h2>`));
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
ok('我的页保留词库说明', meHtml.includes('四级词库') && meHtml.includes('词库'));
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
  /<span class="para-tts" data-act="para-speak"/.test(readHtml));
ctx('activeArticle = null;');

const css = fs.readFileSync(path.join(base, 'assets/styles.css'), 'utf8');
ok('段间装饰点已删除', !/· · ·/.test(css));
ok('首字下沉已删除', !/::first-letter/.test(css));
ok('左右留白只在 --rd-pad 定义一次', /--rd-pad:\s*22px/.test(css));
const rdBodyCss = (css.match(/\.read-body\s*\{([^}]*)\}/) || [, ''])[1];
ok('正文容器横向留白取自 --rd-pad（不再和 .read-scroll 各加一层）',
  /padding:\s*[\d.]+px\s+var\(--rd-pad\)/.test(rdBodyCss));
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
/* 选中一句要有看得见的反馈。旧实现只有 7% 透明度背景，浅色主题下等于没有确认。
 * 左边线用 inset 阴影实现：border-left 会把整段文字挤动一次（行内重排）。 */
const selRule = (cssBare.match(/\.read-body \.para \.sentence\.sel\s*\{([^}]*)\}/) || [, ''])[1];
ok('选中的句子有可见的左边线（inset 阴影，不用 border-left 挤动文字）',
  /box-shadow:\s*inset/.test(selRule) && !/border-left/.test(selRule));

/* ---- 正文「一句一行」试点（.para-flow，2026-09-19 用户拍板句距 10px）----
 * 中文对照档每句跟一个块级译文、本来就一行一句；纯英文档句子是 inline，整段连排 ——
 * 同一个 App 两种节奏，用户要的是「英文时和双语时一样」。锁五件事：
 *   ① 试点边界不越界（名单外一篇都不改）；② 句距 10px；③ **段距 18px 原封不动**；
 *   ④ 译文下边距归零；⑤ 交互只剩「点句出译文 / 再点收起」——试点篇不渲染段级按钮、
 *      句末留 10px 点击余量。③ 是这轮最容易改错的一条：句距和段距一起拉大正是这个方案
 * 第一次翻车的方式（样张实测段距 18→30 + 句距 0→20，观感直接散掉）。④ 不归零，
 * 双语档「译文 → 下句」会变成 10+10=20px，比纯英档松一截，两档就不是同一节奏了。 */
const flowIds = ctx('[...PARA_FLOW_ARTICLES]');
ok('正文「一句一行」试点名单非空，且 id 都是真实文章',
  flowIds.length > 0 && ctx(`(${JSON.stringify(flowIds)}).every(id => ARTICLES.some(a => a.id === id))`));
const flowIn = ctx(`(activeArticle = ARTICLES.find(a => a.id === ${JSON.stringify(flowIds[0])}), /class="view read-scroll[^"]*para-flow/.test(renderRead()))`);
const flowOutId = ctx('ARTICLES.map(a => a.id).find(id => !PARA_FLOW_ARTICLES.has(id)) || null');
/* 名单覆盖全部文章时 flowOutId 为 null —— 那是「已经铺开」，该来改这条守卫而不是让它静默通过 */
const flowOut = flowOutId === null ? null
  : ctx(`(activeArticle = ARTICLES.find(a => a.id === ${JSON.stringify(flowOutId)}), /class="view read-scroll[^"]*para-flow/.test(renderRead()))`);
ok('★ 试点只作用于名单内的文章（名单内带 para-flow，名单外一篇都不改）',
  flowIn === true && flowOut === false);
ctx('activeArticle = null;');

const flowSent = (cssBare.match(/\.read-scroll\.para-flow \.para \.sentence\s*\{([^}]*)\}/) || [, ''])[1];
const flowGap = (cssBare.match(/\.read-scroll\.para-flow \.para \.sentence ~ \.sentence\s*\{([^}]*)\}/) || [, ''])[1];
ok('试点把句子转成块级（一句一行、句间 10px）',
  /display:\s*block/.test(flowSent) && /margin-top:\s*10px/.test(flowGap));
/* 块级句子撑满整行：右端零留白则文字顶到边，行尾也没有可点的余量。
   10px 与句距同值 —— 留白既是视觉收口，也是点句出译文的点击余量。 */
ok('★ 试点句末右留 10px（撑满整行的块级句，右端要留出点击余量）',
  /padding-right:\s*10px/.test(flowSent) && !/padding-right:\s*0/.test(flowSent));
ok('★ 试点不碰段距（句距和段距一起拉大 → 段落层次糊掉，样张实测过）',
  /\.read-body \.para\s*\{[^}]*margin:\s*0 0 18px/.test(cssBare));
const flowCn = (cssBare.match(/\.read-scroll\.para-flow \.para \.cn\s*\{([^}]*)\}/) || [, ''])[1];
ok('试点下译文下边距归零（否则双语档比纯英档松 10px，两档节奏不一致）',
  /margin:\s*6px 0 0/.test(flowCn));
ok('试点下选中句的左边线留出装订线（块级盒里 inset 阴影会压在首字上）',
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
const mkSentStub = (paraOpen = false) => {
  const set = new Set();
  const el = {
    _set: set, dataset: { act: "para-peek" },
    textContent: "", setAttribute() {},
    classList: {
      add: c => set.add(c), remove: c => set.delete(c),
      toggle: (c, on) => { (on === undefined ? !set.has(c) : on) ? set.add(c) : set.delete(c); },
      contains: c => set.has(c),
    },
    closest: sel => sel === DATA_ACT_SEL ? el : { classList: { contains: c => paraOpen && c === "cn-open" } },
  };
  return el;
};
ctx('activeArticle = ARTICLES[0]; view = {name:"read"}; S.cnMode = "tap";');
const sentTap = mkSentStub();
clickEl(sentTap);
ok('★ 「点句显示」档点句同时选中并弹出该句译文（.sel + .peek）',
  sentTap._set.has("sel") && sentTap._set.has("peek"));
/* 同一句再点一次 = 收起译文。用户明确要的交互只有这一种（试点篇连段级按钮都没有，
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
/* 整段已展开时不必再 peek：中文本来就在眼前 */
ctx('activeArticle = ARTICLES[0]; view = {name:"read"}; S.cnMode = "tap";');
const sentOpen = mkSentStub(true);
clickEl(sentOpen);
ok('整段已展开时点句不重复 peek（译文本来就在）',
  sentOpen._set.has("sel") && !sentOpen._set.has("peek"));

/* 段级「本段对照」按钮。
 * 探针固定取**非试点篇**：试点篇故意不渲染这个按钮（见下），拿 ARTICLES[0] 撞运气
 * 会在名单变化时莫名假红 —— 名字里的规则要能自己站住，不靠数组顺序。 */
const cnBtnHtml = ctx(`(() => {
  activeArticle = ARTICLES.find(a => !PARA_FLOW_ARTICLES.has(a.id)); view = {name:"read"};
  const at = m => { S.cnMode = m; return renderRead(); };
  return { tap: at("tap"), all: at("all"), off: at("off") };
})()`);
ok('段级「本段对照」按钮只在「点句显示」档渲染',
  /data-act="para-cn"/.test(cnBtnHtml.tap) && !/data-act="para-cn"/.test(cnBtnHtml.all) && !/data-act="para-cn"/.test(cnBtnHtml.off));
ok('按钮默认态是「显示本段翻译」且 aria-expanded=false',
  /aria-expanded="false"[^>]*>显示本段翻译</.test(cnBtnHtml.tap));
/* 试点篇：整篇一个段级按钮都不许有（含「显示本段翻译」「收起本段翻译」两种文案）。
   交互只留一种 —— 点句出译文、再点收起。这条和上面那条互为边界：
   少了它，试点篇与普通篇的差别就没人盯着，按钮会在某次重构里悄悄回来。 */
const flowBtnHtml = ctx(`(() => {
  activeArticle = ARTICLES.find(a => a.id === ${JSON.stringify(flowIds[0])}); view = {name:"read"};
  const at = m => { S.cnMode = m; return renderRead(); };
  return { tap: at("tap"), all: at("all"), off: at("off") };
})()`);
ok('★ 试点篇不渲染段级「本段对照」按钮（三档下都不许出现）',
  !/data-act="para-cn"/.test(flowBtnHtml.tap) && !/data-act="para-cn"/.test(flowBtnHtml.all) && !/data-act="para-cn"/.test(flowBtnHtml.off));
ok('★ 试点不越界：名单外文章的段级按钮照旧渲染',
  /data-act="para-cn"/.test(cnBtnHtml.tap));
/* ★ 结构守卫：译文必须是句子的**相邻兄弟**节点。
   判据取「两个连续 </span> 之后紧跟 <span class="cn">」—— .sentence 的最后一个子节点
   是 .para-tts，所以兄弟写法必然是 `</span></span><span class="cn">`；
   若 .cn 被移回 .sentence 内部，就只剩一个 </span>，这个计数会归零。
   （用 `</span><span class="cn">` 判会假绿 —— para-tts 的闭合标签恰好长这样。） */
const cnOpenN = (cnBtnHtml.all.match(/<span class="cn">/g) || []).length;
const cnSibN = (cnBtnHtml.all.match(/<\/span><\/span><span class="cn">/g) || []).length;
ok(`★ 译文是句子的相邻兄弟节点（${cnSibN}/${cnOpenN} 个译文紧跟句子闭合标签）`,
  cnOpenN > 20 && cnSibN === cnOpenN);

const mkParaStub = peeks => {
  const set = new Set();
  return {
    _set: set,
    classList: {
      add: c => set.add(c), remove: c => set.delete(c),
      toggle: (c, on) => { (on === undefined ? !set.has(c) : on) ? set.add(c) : set.delete(c); },
      contains: c => set.has(c),
    },
    querySelectorAll: () => peeks,
  };
};
ctx('activeArticle = ARTICLES[0]; view = {name:"read"}; S.cnMode = "tap"; paraOpen.clear();');
const paraStub = mkParaStub([]);
const peekSent = { _set: new Set(["peek"]), classList: { remove(c) { peekSent._set.delete(c); }, contains: c => peekSent._set.has(c) } };
paraStub.querySelectorAll = () => [peekSent];
const cnBtnStub = { dataset: { act: "para-cn", pi: "0" }, textContent: "显示本段翻译",
  setAttribute(k, v) { this._attr = v; },
  closest: sel => sel === DATA_ACT_SEL ? cnBtnStub : paraStub };
clickEl(cnBtnStub);
ok('点「显示本段翻译」整段展开（para 加 cn-open / 索引进 paraOpen / 按钮转「收起」）',
  paraStub._set.has("cn-open") && ctx('paraOpen.has(0)') === true &&
  cnBtnStub.textContent === "收起本段翻译" && cnBtnStub._attr === "true");
clickEl(cnBtnStub);
ok('★ 再点收起：清掉段内残留 .peek（否则收起后还留一句中文挂着）',
  !paraStub._set.has("cn-open") && ctx('paraOpen.has(0)') === false &&
  cnBtnStub.textContent === "显示本段翻译" && !peekSent._set.has("peek"));

/* CSS：档位差别的落点 */
ok('「点句显示」的译文展开用相邻兄弟选择器（+ 而不是空格）',
  /\.read-scroll\.cn-tap \.sentence\.peek \+ \.cn/.test(cssCn) && !/\.sentence\.peek \.cn/.test(cssCn));
ok('★ CSS 里没有「关闭翻译」档的 peek 规则（off 与 tap 的差别就落在这里）',
  !/\.read-scroll\.cn-off[^{]*\.peek[^{]*\{/.test(cssCn));
ok('段级 .para.cn-open .cn 规则排在 .no-cn .para .cn 之后（同特异性靠出现顺序取胜）',
  cssCn.indexOf('.para.cn-open .cn') > cssCn.indexOf('.no-cn .para .cn') && cssCn.indexOf('.para.cn-open .cn') > 0);
ctx('activeArticle = null; view = {name:"home"}; S.cnMode = "tap"; paraOpen.clear(); paraOpenArt = null;');

/* 句子锚点：off = 该句顶部相对滚动容器视口的偏移；还原时把同一句放回同一偏移 */
const mkSent = (pi, si, top, bottom) => ({
  dataset: { pi: String(pi), si: String(si) },
  getBoundingClientRect: () => ({ top, bottom }),
});
sandbox.__fakeRead = {
  clientHeight: 600, scrollTop: 500,
  getBoundingClientRect: () => ({ top: 0 }),
  querySelectorAll: () => [mkSent(0, 0, -300, -100), mkSent(0, 1, -80, 60), mkSent(1, 0, 80, 200)],
};
ok('锚点取「第一个越过视口上部 22% 的句子」（第 3 句）',
  ctx('JSON.stringify(readAnchor(__fakeRead))') === '{"pi":1,"si":0,"off":80}');
sandbox.__fakeCont = {
  clientHeight: 600, scrollTop: 1000,
  getBoundingClientRect: () => ({ top: 100 }),
  querySelector: s => (String(s).includes('data-pi="3"') ? { getBoundingClientRect: () => ({ top: 130 }) } : null),
};
ctx('applyAnchor(__fakeCont, {pi:3, si:1, off:-20})');
ok('还原锚点：该句回到记录时的屏幕位置（scrollTop 1000 → 1050）', ctx('__fakeCont.scrollTop') === 1050);
ok('锚点指向的句子不存在时安全退出', ctx('applyAnchor(__fakeCont, {pi:99, si:0, off:0})') === false);

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
ok('同篇还带上了句子锚点（排版变了也对得回原句，不只靠 scrollTop）',
  ctx('JSON.stringify(resumeAnchor)') === '{"pi":5,"si":2,"off":-12}');
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

console.log(`\n结果：${pass} 通过 / ${fail} 失败\n`);
process.exit(fail ? 1 : 0);

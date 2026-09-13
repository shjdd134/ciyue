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
  location: { protocol: 'http:', search: '' },
  window: { addEventListener: (t, f) => { handlers[t] = f; }, removeEventListener: noop },
  document: {
    documentElement: { setAttribute: noop },
    addEventListener: (t, f) => { handlers[t] = f; },
    removeEventListener: noop,
    querySelector: s => (s === '#screen' ? screenEl : s === '.phone' ? phoneEl : null),
    querySelectorAll: s => (String(s).includes('sheet') ? overlays.slice() : []),
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
  'assets/data-examples.js', 'assets/data-ecdict.js', 'assets/data-tapdict.js'
]) {
  const p = path.join(base, f);
  if (fs.existsSync(p)) vm.runInContext(fs.readFileSync(p, 'utf8'), sandbox, { filename: f });
}
/* 浏览器里 data-ecdict.js 把词形表挂在 window 上；沙箱的 window 只是替身对象，
   必须显式提升到全局，否则 app.js 里 EC 取不到、词形匹配退化成「猜」的版本
   —— see 找不到 saw、good 找不到 best，例句标色会整段失效。 */
vm.runInContext('var WORD_META = window.WORD_META;', sandbox);
vm.runInContext('var TAPDICT = window.TAPDICT, TAP_REVERSE = window.TAP_REVERSE;', sandbox);
vm.runInContext(fs.readFileSync(path.join(base, 'assets/app.js'), 'utf8'), sandbox, { filename: 'assets/app.js' });

const ctx = e => vm.runInContext(e, sandbox);
const click = ds => handlers.click({ target: { closest: () => grow(ds) }, stopPropagation: noop });
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
click({ cat: '足球' });
click({ article: ctx('ARTICLES.filter(a=>a.cat==="足球")[0].id') });
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
ok('排序结果写进了页面', /按生词最多/.test(screenEl.innerHTML));

/* ===================================================================
 * B. 系统返回键不该一次退两层
 * =================================================================== */
console.log('\n[B] 系统返回键只退一层');
click({ act: 'set-sort', sort: 'new' });
click({ cat: '足球' });
click({ article: ctx('ARTICLES.filter(a=>a.cat==="足球")[0].id') });
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
ctx('searchTerm = "足球"; render()');
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
ctx('activeArticle = __nestedProbe; view = {name:"read"}; S.showCn = true;');
const nestedRead = ctx('renderRead()');
ok('嵌套段落阅读渲染句子节点', nestedRead.includes('class="sentence"') && nestedRead.includes('data-si="1"'));
ctx('activeArticle = ARTICLES[0]; view = {name:"home"}; S.showCn = false;');

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
ok('发现页精选渲染中文标题', /class="feat-title-zh"/.test(screenEl.innerHTML));
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
ok(`highlightEn 输出两类 span`, (() => {
  const html = ctx(`highlightEn("The verdict came. Teacher smiled.")`);
  return html.includes('class="tw"') && html.includes('class="kw"');
})());

/* ---------------- [Q] 词库查词卡行为 ---------------- */
console.log('\n[Q] 词库查词卡行为');
/* render 间谍：本段所有查词卡操作都应零整页渲染（render 会把阅读位置打回开头） */
ctx('window.__renderCalls = 0; const __origRender = render; render = () => { window.__renderCalls++; };');
/* .kw span 桩：验证 mark-known 就地切换 known 类 */
const fakeKw = { cls: new Set(), classList: { toggle(c, on) { on ? fakeKw.cls.add(c) : fakeKw.cls.delete(c); } } };
const __prevQSA = sandbox.document.querySelectorAll;
sandbox.document.querySelectorAll = s => (String(s).startsWith('.kw') ? [fakeKw] : __prevQSA(s));

/* 查词卡测试前重置渲染计数 */
ctx('window.__renderCalls = 0');


const sheetW0 = ctx('WORDS[0].word');
click({ act: "lookup", word: sheetW0 });
click({ act: "add-note", word: sheetW0 });
ok(`查词卡「加入生词本」零整页渲染（阅读位置不丢）`, ctx('window.__renderCalls') === 0);
ok(`生词确实入了本（${sheetW0}）`, ctx(`S.notebook.includes(${JSON.stringify(sheetW0)})`));

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

/* 阅读页原地设置（对照/字号/护眼）不切走视图；滚动位置保留由浏览器实测覆盖 */
ctx('activeArticle = ARTICLES[0]; view = {name:"read"}; S.showCn = false; S.fontSize = 0;');
click({ act: "toggle-cn" });
ok(`阅读页「中英对照」不切走视图（状态翻转）`, ctx('view.name') === 'read' && ctx('S.showCn') === true);
click({ act: "font" });
ok(`阅读页「字号」不切走视图（档位推进）`, ctx('view.name') === 'read' && ctx('S.fontSize') === 1);
ctx('activeArticle = null; view = {name:"home"}; S.showCn = false; S.fontSize = 0;');

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
ctx(`view = {name:"discover"}; catFilter = "全部"; searchTerm = ""; render();`);
const discHtml = `document.querySelector("#screen").innerHTML`;
ok(`发现页渲染「上次读到」续读卡片（含进度）`, ctx(`${discHtml}.includes("上次读到")`) === true && ctx(`${discHtml}.includes("读到 42%")`) === true);
ctx(`S.lastRead = { id: "", y: 0, pct: 0, at: 0 }; view = {name:"discover"}; render();`);
ok(`没有阅读记录时不渲染续读卡片`, ctx(`${discHtml}.includes("上次读到")`) === false);

console.log(`\n结果：${pass} 通过 / ${fail} 失败\n`);
process.exit(fail ? 1 : 0);

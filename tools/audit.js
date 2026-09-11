/* 缺陷回归测试：把这次修掉的 P0 / P1 全部固化成断言。
 *
 * 覆盖：
 *   [A] 浮层跨页残留（查词卡挂在 .phone 上、不在 #screen 里）
 *   [B] 系统返回键不再一次吃掉两条 history
 *   [C] 根级跳转（点底部 tab）回收已压入的 history 条目
 *   [D] 学习数据全部为真实计算（每日目标 / 连续天数 / 时长 / 掌握率 / 已认识）
 *   [E] 搜索真的能搜到文章
 *   [F] 「筛选」按钮真的能排序
 *   [G] 正文无乱码（占位符 / 脚本 / 不可见字符 / 空译文）
 *   [H] 标题双语（每篇都有中文标题，四个渲染位都落地）
 *   [I] 例句里的目标词标色（含词形变化、三处渲染位、不误标）
 *   [J] 复习队列：错词复习真的换队列、艾宾浩斯按结果推后、队列走完自动收尾
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
  'assets/data.js', 'assets/data-words-bulk-a.js', 'assets/data-words-full.js',
  'assets/data-articles-extra.js', 'assets/data-articles-archive.js', 'assets/data-covers.js',
  'assets/data-examples.js', 'assets/app.js'
]) {
  const p = path.join(base, f);
  if (fs.existsSync(p)) vm.runInContext(fs.readFileSync(p, 'utf8'), sandbox, { filename: f });
}

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
 * D. 学习数据必须是真实计算
 * =================================================================== */
console.log('\n[D] 学习数据全部真实计算');
eq('每日目标独立于词库总量', ctx('DAILY_GOAL'), 20);
eq('初始今日已学为 0', ctx('doneToday()'), 0);
eq('初始连续天数为 0', ctx('streakDays()'), 0);
eq('初始掌握率为 0', ctx('masteredRate()'), 0);
ok('首页不再显示整本词库当作今日目标', !/今日还剩 4455/.test(screenEl.innerHTML));
ok('首页倒计时不是写死的 47 天', !/还有 47 天/.test(screenEl.innerHTML));

const w0 = ctx('WORDS[0].word');
click({ tab: 'study' });
click({ act: 'answer', v: 'yes' });
eq('答「认识」→ 今日已学 +1', ctx('doneToday()'), 1);
eq('答「认识」→ 计入已掌握', ctx('S.studied.length'), 1);
ok('答「认识」→ 词进入 known（文章不再高亮）', ctx(`S.known.includes(${JSON.stringify(w0)})`));
eq('连续天数变为 1', ctx('streakDays()'), 1);
eq('掌握率 100%', ctx('masteredRate()'), 100);

click({ act: 'answer', v: 'no' });
eq('答「不认识」→ 今日已学 +1', ctx('doneToday()'), 2);
eq('答「不认识」→ 错词本 +1', ctx('S.wrong.length'), 1);
ok('答「不认识」→ 撤销 known 标记', !ctx(`S.known.includes(${JSON.stringify(ctx('WORDS[1].word'))})`));
eq('掌握率回落为 50%', ctx('masteredRate()'), 50);

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
const topByShort = ctx('ARTICLES.slice().sort((a,b)=>(a.minutes||0)-(b.minutes||0))[0].id');
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
    for (const k of ['en', 'cn', 'cap']) {
      const v = p[k];
      if (typeof v === 'string' && NOISE.test(v)) noiseHits.push(`${a.id} p${i + 1}.${k}`);
    }
    if (p.img) return;
    textParas++;
    if (!String(p.cn || '').trim()) noCnHits.push(`${a.id} p${i + 1}`);
    if (!String(p.en || '').trim()) noiseHits.push(`${a.id} p${i + 1}.en 为空`);
  });
}
ok(`全部 ${ctx('ARTICLES.length')} 篇 / ${textParas} 段正文无占位符、脚本与不可见字符`, noiseHits.length === 0);
if (noiseHits.length) console.log(`    命中：${noiseHits.slice(0, 8).join('、')}`);
ok('没有只有英文、没有译文的段落', noCnHits.length === 0);
if (noCnHits.length) console.log(`    命中：${noCnHits.slice(0, 8).join('、')}`);

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
ctx(`qPos = ${iWord}; queue = null; flipped = false; view = { name: "study" }; render()`);
ok('词卡正面渲染标色', /class="w-hl">comprehensive</.test(screenEl.innerHTML));
ctx('flipped = true; render()');
ok('词卡背面「真题搭配」渲染标色', /class="w-hl">comprehensive</.test(screenEl.innerHTML));
ok('查词浮层渲染标色', /class="w-hl">comprehensive</.test(ctx('renderSheet("comprehensive")')));

/* 不误标 + 转义不被破坏 */
eq('句中没有目标词时不产生标记', ctx('hlWord("Nothing to see here.", "zebra")'), 'Nothing to see here.');
eq('标色不破坏转义', ctx('hlWord("Tea & coffee for the test.", "test")'), 'Tea &amp; coffee for the <mark class="w-hl">test</mark>.');

/* ===================================================================
 * J. 复习队列与艾宾浩斯
 *   J1 「开始复习」真的把队列换成错词（以前只是弹个 toast 然后走默认顺序）
 *   J2 答对 → 到期日推后；答错 → 今天就到期
 *   J3 队列走完自动退出并回到「我的」
 *   J4 生词本也能拿来练
 * =================================================================== */
console.log('\n[J] 复习队列与艾宾浩斯');
const W1 = words[0].word, W2 = words[1].word;
ctx(`S.wrong = ["${W1}", "${W2}"]; S.review = {}; save()`);
ctx('setQueue(reviewQueue(), "测试队列")');
ok('复习队列 = 错词（去重后）', ctx('queue && queue.map(w=>w.word).join(",")') === `${W1},${W2}`);
click({ act: 'review' });
ok('点「开始复习」进入学习页且用的是复习队列', ctx('view.name') === 'study' && ctx('queue !== null'));
ok('学习页显示队列名与退出入口', /data-act="quit-queue"/.test(screenEl.innerHTML));
ok('进度条按队列长度算，不是全量 4455', /\b1\/2\b/.test(screenEl.innerHTML));

/* 答对第一张：应升一级、到期日推后、并移出错词本 */
ctx(`qPos = 0; render()`);
click({ act: 'answer', v: 'yes' });
const rev1 = ctx(`S.review["${W1}"]`);
ok('答对写入艾宾浩斯调度（stage 前进）', rev1 && rev1.stage === 1);
ok('答对后到期日推到明天之后', rev1 && rev1.due > ctx('todayKey()'));
ok('答对后从错词本移除', !ctx(`S.wrong.includes("${W1}")`));

/* 答错第二张（队列已推进到 W2）：应归零、当天到期、留在错词本 */
ok('答完一张后队列推进到第二张', ctx('curWord().word') === W2);
click({ act: 'answer', v: 'no' });
const rev2 = ctx(`S.review["${W2}"]`);
ok('答错后 stage 归零、当天就到期', rev2 && rev2.stage === 0 && rev2.due === ctx('todayKey()'));
ok('答错后仍在错词本', ctx(`S.wrong.includes("${W2}")`));
/* 新交互：答错不直接走人——先翻面看答案，作答行换成「继续」，点它才收尾 */
ok('答错后翻到背面看答案，不直接跳下一个', ctx('view.name') === 'study' && ctx('flipped') === true && ctx('answered') === 'no');
ok('作答行换成「继续 · 下一个」', /data-act="next"/.test(screenEl.innerHTML) && !/data-act="answer"/.test(screenEl.innerHTML));
click({ act: 'next' });
ok('点「继续」后队列走完自动收尾，回到「我的」', ctx('view.name') === 'me' && ctx('queue') === null);
ok('收尾后作答状态已复位', ctx('answered') === null && ctx('flipped') === false);

/* 生词本练习 */
ctx(`S.notebook = ["${W1}"]; setQueue(wordsOf(S.notebook), "生词本")`);
ok('生词本可以拿来练习', ctx('queue.length') === 1 && ctx('curWord().word') === W1);
ctx('setQueue(null, "")');

/* ===================================================================
 * K. 数据安全
 *   K1 「清空进度」不再一键抹掉：先弹确认浮层
 *   K2 确认浮层里同时给出导出与导入，不会让人无从下手
 *   K3 导出把整个状态装进 JSON
 * =================================================================== */
console.log('\n[K] 数据安全');
ctx('S.studied = ["alpha"]; save()');
const beforeReset = ctx('S.studied.length');
click({ act: 'ask-reset' });
ok('点「清空全部进度」先弹确认浮层', /清空全部学习进度/.test(ctx('resetSheet()')));
ok('确认浮层带导出 / 导入备份入口', /data-act="export-data"/.test(ctx('resetSheet()')) && /data-act="import-data"/.test(ctx('resetSheet()')));
ok('确认浮层里有「确认清空」而不是直接清', /data-act="reset"/.test(ctx('resetSheet()')) && ctx('S.studied.length') === beforeReset);
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

console.log(`\n结果：${pass} 通过 / ${fail} 失败\n`);
process.exit(fail ? 1 : 0);

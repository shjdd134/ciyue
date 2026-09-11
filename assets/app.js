/* 词阅 WordLens —— 交互层 */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* 数据层已经清洗过一遍，这里是最后一道闸：万一个别条目仍带机器翻译令牌
   （有道批量接口的 <e:1> / <s:1>）或不可见控制符，也不让它出现在正文里 */
const NOISE = /<\/?[se]:\d+>|[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u00AD\u200B-\u200F\u202A-\u202E\u2060\uFEFF\uFFFD]/g;
const clean = s => String(s == null ? "" : s).replace(NOISE, "");

/* 中文标题：机器翻译结果（tools/translate-titles.mjs 生成）。
   英文标题是阅读对象，中文标题是辅助理解的第二行小字，抓不到译文时整行不渲染。 */
const zhTitle = a => clean(a.titleZh || "");
/* 例句出处只显示媒体名："Smithsonian Magazine · 2026-09-08" 在词卡的 chip 里放不下，
   而且卡片上也没有跳转原文的入口，完整出处留到阅读页去看。 */
const srcLabel = w => String(w.source || "").split(" · ")[0];

/* ---------------- 目标词在句子里标色 ----------------
   例句的价值在于「这个词在真实句子里长什么样」，所以句子里的目标词要标出来，
   和阅读页生词用同一套语言（brand 色 + 加粗），页面里只有一种「被标出来的词」。
   只标色，不加下划线、不做 hover —— 这里不可点，别让它看起来像按钮。 */
const escRe = s => String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/* 词库给的是原形，句子里往往是变形（dip→dipped、display→displays）。
   按常见构词规律列形态，长的先匹配，避免只吃到词干。 */
function wordForms(word) {
  const w = String(word == null ? "" : word).toLowerCase().trim();
  if (!/^[a-z][a-z'-]*$/.test(w)) return [];          // 词组/非英文条目不猜形态
  /* ECDICT exchange 表是权威词形，命中就不猜 */
  const e = EC && EC[w];
  if (e && e.x) {
    const set = new Set([w]);
    for (const seg of e.x.split("/")) { const v = seg.slice(2); if (v) set.add(v.toLowerCase()); }
    return [...set].sort((a, b) => b.length - a.length);
  }
  const set = new Set([w]);
  if (w.length > 2) {
    set.add(w + "s");
    if (/[^aeiou]y$/.test(w)) set.add(w.slice(0, -1) + "ies");
    else if (/(s|x|z|ch|sh)$/.test(w)) set.add(w + "es");
    if (/e$/.test(w)) { set.add(w + "d"); set.add(w.slice(0, -1) + "ing"); }
    else {
      set.add(w + "ed"); set.add(w + "ing");
      if (/[^aeiou][aeiou][^aeiouwxy]$/.test(w)) { set.add(w + w.slice(-1) + "ed"); set.add(w + w.slice(-1) + "ing"); }
    }
  }
  return [...set].sort((a, b) => b.length - a.length);
}

/** 把句子里的目标词（含变形）包成 <mark class="w-hl">；找不到就原样返回 */
function hlWord(sentence, word) {
  const text = esc(sentence == null ? "" : sentence);
  const forms = wordForms(word);
  if (!forms.length) return text;
  const re = new RegExp("\\b(?:" + forms.map(escRe).join("|") + ")\\b", "gi");
  return text.replace(re, m => `<mark class="w-hl">${m}</mark>`);
}

/* ---------------- 状态 ---------------- */
const STORE = "wordlens.v1";
const defaultState = {
  theme: "light",
  studied: [],      // 已学过的单词（累计，用于掌握率）
  wrong: [],        // 错词本
  notebook: [],     // 生词本（阅读加入）
  showCn: false,
  fontSize: 0,
  readTheme: "",     // 阅读页护眼主题："" | "paper" | "night"
  read: [],         // 累计读过（含重复）
  finished: [],     // 已打卡的去重列表
  known: [],        // 标记「认识」的词：文章里不再高亮
  daily: { date: "", count: 0 },   // 今日已学新词（跨天自动归零）
  studyDays: [],    // 有学习行为的日期 YYYY-MM-DD，用于算连续天数
  minsByDay: {},    // { YYYY-MM-DD: 分钟 }，阅读时长按天累计
  fsrs: {},         // FSRS 间隔重复调度：{ word: { st,d,s,e,sd,r,l,due,lr } }（vendor-fsrs.js）
  probe: null       // 摸底自测：{ done, at, known:[词], startIdx }，决定新词从哪个位置学起
};
let S = Object.assign({}, defaultState, JSON.parse(localStorage.getItem(STORE) || "{}"));
/* 早期版本留下的写死字段（streak / minutes / tab）：就地丢弃，避免旧数据继续冒充真实统计 */
delete S.streak; delete S.minutes; delete S.tab;
/* 数组/对象要断开与 defaultState 的引用共享，否则「清空进度」后一写入就污染默认值 */
S.studyDays = Array.isArray(S.studyDays) ? S.studyDays.slice() : [];
S.minsByDay = (S.minsByDay && typeof S.minsByDay === "object") ? Object.assign({}, S.minsByDay) : {};
if (!S.daily || typeof S.daily !== "object") S.daily = { date: "", count: 0 };
if (!S.fsrs || typeof S.fsrs !== "object") S.fsrs = {};
const save = () => localStorage.setItem(STORE, JSON.stringify(S));

/* ---------------- 真实学习统计 ----------------
 * 页面上所有数字都从下面这几个函数算出来，没有任何写死的「基准值」。 */
const DAILY_GOAL = 20;                 // 每日目标新词数
const EXAM_DATE = "2026-12-19";        // 下一次四级笔试（12 月第三个周六）
const ymd = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const todayKey = () => ymd(new Date());

/* 跨天自动把「今日已学」归零 */
function rollDay() {
  const k = todayKey();
  if (!S.daily || S.daily.date !== k) { S.daily = { date: k, count: 0 }; return true; }
  return false;
}
rollDay();

/* ---------------- FSRS 间隔重复调度 ----------------
 * 内核是开源 FSRS 算法（assets/vendor-fsrs.js，MIT，Anki 官方现用调度器的同源实现）。
 * 三个动作映射：认识 → Good，模糊 → Hard，不认识 → Again；
 * 算法按每词的记忆稳定性（s）与难度（d）算下次复习时间，取代旧版固定阶梯。
 * due 存 ISO 时间串，跨天自然到期，不需要定时器，也不需要后台任务。 */
const REVIEW_STEPS = [1, 2, 4, 7, 15, 30, 60];   // 兜底阶梯（vendor-fsrs.js 加载失败时才用）
const F_SCHED = window.FSRS
  ? FSRS.fsrs(FSRS.generatorParameters({ enable_fuzz: true, enable_short_term: false }))
  : null;
/* 旧版阶梯调度（S.review）一次性迁移成 FSRS 卡片：stage 近似为记忆稳定性 */
for (const [w, r] of Object.entries(S.review || {})) {
  if (S.fsrs[w] || !window.FSRS) continue;
  const days = REVIEW_STEPS[Math.min(r.stage || 0, REVIEW_STEPS.length - 1)] || 1;
  S.fsrs[w] = { st: 2, d: 5, s: Math.max(1, days), e: days, sd: days, r: 1, l: 0,
                due: new Date((r.due || todayKey()) + "T05:00:00").toISOString(), lr: null };
}
function cardOf(word) {
  const c = S.fsrs[word];
  if (!c) return FSRS.createEmptyCard(new Date());
  return {
    due: new Date(c.due), stability: c.s, difficulty: c.d,
    elapsed_days: c.e, scheduled_days: c.sd, reps: c.r, lapses: c.l,
    learning_steps: c.ls || 0,
    state: c.st, last_review: c.lr ? new Date(c.lr) : undefined
  };
}
function scheduleReview(word, v) {
  if (!window.FSRS) {                        // 兜底：vendor 脚本加载失败时退回固定阶梯
    const prev = S.fsrs[word];
    let stage = prev ? Math.max(0, Math.min(REVIEW_STEPS.length - 1, Math.round(prev.s) || 0)) : 0;
    stage = v === "yes" ? Math.min(REVIEW_STEPS.length - 1, stage + 1)
          : v === "fuzzy" ? Math.max(0, stage - 1) : 0;
    const d = new Date(); d.setDate(d.getDate() + (v === "no" ? 0 : REVIEW_STEPS[stage]));
    S.fsrs[word] = { st: 2, d: 5, s: stage, e: 0, sd: REVIEW_STEPS[stage], r: 1,
                     l: v === "no" ? 1 : 0, due: d.toISOString(), lr: null };
    return;
  }
  const rating = v === "yes" ? FSRS.Rating.Good : v === "fuzzy" ? FSRS.Rating.Hard : FSRS.Rating.Again;
  const { card } = F_SCHED.next(cardOf(word), new Date(), rating);
  S.fsrs[word] = {
    st: card.state, d: +card.difficulty.toFixed(3), s: +card.stability.toFixed(3),
    e: card.elapsed_days, sd: card.scheduled_days, r: card.reps, l: card.lapses,
    ls: card.learning_steps || 0,
    due: card.due.toISOString(), lr: card.last_review ? card.last_review.toISOString() : null
  };
}
/* 今天该复习的词：调度表上到期的（含答错当天重练的） */
function dueWords() {
  const now = new Date().toISOString();
  return WORDS.filter(w => { const r = S.fsrs[w.word]; return r && r.due && r.due <= now; });
}
/* 复习队列 = 错词 ∪ 到期词，去重。错词在前——用户点「开始复习」先看错词。 */
function reviewQueue() {
  const seen = new Set();
  const out = [];
  for (const w of [...wordsOf(S.wrong), ...dueWords()]) {
    if (seen.has(w.word)) continue;
    seen.add(w.word);
    out.push(w);
  }
  return out;
}
const dueCount = () => reviewQueue().length;

/* 记录今天有学习行为（背词作答 / 读完打卡） */
function markStudyDay() {
  const k = todayKey();
  if (!S.studyDays.includes(k)) S.studyDays.push(k);
  if (S.studyDays.length > 400) S.studyDays = S.studyDays.slice(-400);
}

/* 连续学习天数：从今天（今天还没学则从昨天）往前数连续有记录的天数 */
function streakDays() {
  const set = new Set(S.studyDays || []);
  const d = new Date();
  if (!set.has(ymd(d))) d.setDate(d.getDate() - 1);
  let n = 0;
  while (set.has(ymd(d))) { n++; d.setDate(d.getDate() - 1); }
  return n;
}

const daysToExam = () => Math.max(0, Math.ceil((Date.parse(`${EXAM_DATE}T00:00:00`) - Date.now()) / 86400000));

/* 近 7 天（含今天）每天的学习分钟数，没有记录的当天补 0 */
function last7() {
  const out = [];
  const d = new Date();
  for (let i = 6; i >= 0; i--) {
    const x = new Date(d); x.setDate(d.getDate() - i);
    const k = ymd(x);
    out.push({ key: k, label: "日一二三四五六"[x.getDay()], today: i === 0, mins: (S.minsByDay || {})[k] || 0 });
  }
  return out;
}

/* ---------------- 关键词 Trie（用于文章高亮） ----------------
 * 把 KEYWORDS 装进前缀树；匹配时只在单词边界、完整词才算命中。
 * 这样既快（O(字母数)），又避免 startsWith 把 'rod' 当成 'Rodriguez'。
 * 同时把太短的虚词/功能词从高亮词表里剔除，避免正文中每个 'a'/'with'/'that'
 * 都变紫（这些词虽然在 CET4 考纲里，但不该在阅读时逐处高亮）。
 *
 * 策略：
 *   - 长度 < 4 的词不进 trie（a/an/in/on...）
 *   - 常见英文功能词（with/that/this/from...）显式剔除
 *   - 匹配采用「完整 token 等于一个 KEYWORDS 条目才算命中」，最严格 */
const STOPWORD_HIGHLIGHT = new Set([
  // 1-3 字母
  "a","an","as","at","be","by","do","go","he","hi","if","in","is","it","me","my","no","of","oh","on","or","so","to","up","us","we","i","am",
  // 常用功能词 4+
  "the","and","but","for","nor","yet","all","any","can","her","him","his","how","its","may","new","old","our","own","say","she","too","two","use","was","who","boy","did","get","got","has","had","let","man","not","now","one","out","put","run","see","set","ten","way","why","yes","big","end","far","few","job","lot","low","pay","red","sad","try","win","won","cut","ask","eye","kid","sit","bad","bed","box","car","cup","dog","eat","fun","hot","key","leg","map","mix","net","oil","pan","pen","tea","top","war","wet","yet","zoo",
  "with","that","this","they","their","them","then","than","thus","from","into","over","such","very","much","many","most","more","less","also","just","only","even","still","back","down","when","here","your","yours","were","been","have","will","would","could","should","shall","might","must","what","whom","whose","where","while","these","those","been","being","does","done","make","made","like","time","year","days","said","come","came","take","took","give","gave","find","found","know","knew","feel","felt","keep","kept","show","seem","seems","help","helps","need","needs","want","wants","look","looks","call","calls","long","part","last","next","good","well","real","sure","full","high","open","true","same","left","hand","head","face","side","area","kind","type","form","line","term","word","case","fact","idea","life","home","work","team","week","days","data","sort","step","feel","cost","rule","test","grow","help","play","live","feel","miss","fall","rise","gone","seen","felt","told","held","sold","sent","paid","laid","said","kept","met","led","won","run","cut","hit","bit","sat","let","got","put","set","try","die","due","ran","fit","lay","lie","eat","act","age","ago","air","arm","art","bad","bag","bat","bit","bow","box","boy","bus","cap","car","cat","cup","cut","day","die","dog","dry","due","ear","egg","end","era","eye","fan","far","fat","few","fig","fix","fly","fog","for","fox","fun","gap","gas","get","god","gun","gut","guy","had","hat","hit","hot","how","ice","ill","ink","inn","ion","its","jam","jet","job","joy","key","kid","kit","lab","lag","lap","law","lay","led","leg","let","lie","lip","log","lot","low","mad","man","map","mat","may","mix","mob","mom","mud","net","new","nor","not","now","nut","oak","odd","off","oil","old","one","our","out","owe","own","pad","pan","pay","pen","pet","pie","pin","pit","pop","pot","pub","put","ran","raw","red","ref","rid","rip","rob","rod","rot","row","rub","run","sad","sat","saw","say","sea","set","sex","she","shy","sin","sir","sit","six","ski","sky","sly","sob","son","sow","spy","sum","sun","tab","tan","tap","toe","ton","too","top","tow","toy","try","tub","tug","two","use","van","vat","vet","via","war","was","wax","way","web","wet","who","why","wig","win","wit","woe","won","woo","wow","yet","you","zap","zen","zip","zoo"
]);
function buildTrie(words) {
  const root = {};
  for (const w of words) {
    if (!w || w.length < 4 || STOPWORD_HIGHLIGHT.has(w)) continue;
    let node = root;
    for (let i = 0; i < w.length; i++) {
      const c = w[i];
      node = node[c] || (node[c] = {});
    }
    node.$ = w;   // 词尾标记：只有走到这里才算"完整词"
  }
  return root;
}
const KW_TRIE = buildTrie(KEYWORDS);

/* 在英文段落里把命中关键词的 token 包成 <span class="kw" data-word="...">
 * 严格"完整词"匹配：必须整段 token 完全等于一个 KEYWORDS 条目才算命中。
 * 这样避免 'rod' 被误命中 'Rodriguez'、'a' 命中 'April' / 'an' 等。 */
function highlightEn(text) {
  return text.replace(/[A-Za-z]+/g, m => {
    const low = m.toLowerCase();
    let node = KW_TRIE;
    for (let i = 0; i < low.length; i++) {
      node = node[low[i]];
      if (!node) return m;
    }
    if (!node.$) return m;
    const k = node.$;
    return `<span class="kw${S.known.includes(k) ? ' known' : ''}" data-act="lookup" data-word="${k}">${m}</span>`;
  });
}

/* 统计文章命中关键词个数（去重）。正文里可能夹带图片项，只对文本段生效 */
function countHits(a) {
  const hit = new Set();
  a.paras.forEach(p => {
    if (!p.en) return;
    p.en.replace(/[A-Za-z]+/g, m => {
      const low = m.toLowerCase();
      let node = KW_TRIE;
      for (let i = 0; i < low.length; i++) {
        node = node[low[i]];
        if (!node) return;
      }
      if (node && node.$) hit.add(node.$);
    });
  });
  return hit.size;
}

/* 文章的纯文本句数（不含内嵌图） */
const sentCount = a => a.paras.filter(p => p.en).length;

/* ---------------- 学习顺序：词频爬坡 ----------------
 * 旧版主轴是「这个词在我们自己的 83 篇文章里出现过几次」。而文章库主力是足球
 * 报道和时尚资讯，结果 the / and / league / season / team / football 这些功能词
 * 与题材词霸占前排 —— 实测前 100 名里 93% 是中学已收录的词，对有基础的用户
 * 纯粹是消耗耐心；同时「例句 / 词根词缀丰富度」这一档也早已失效（例句覆盖
 * 92%、词根词缀 100%，人人满分，不再起任何区分作用）。
 *
 * 现在主轴换成 ECDICT 的当代语料词频 f（5 万词级统计，见 data-ecdict.js）：
 * f 越小越常用，它同时代表「重要程度」和「难度」，升序排列就是一条由常用到
 * 生僻的平滑梯度。这对应新东方《四级词汇·乱序版》「按考查频次分档」的思路，
 * 但依据是语料库统计而非单一考试的出现次数。
 * 语料相关度彻底退出主轴：实测把它当主轴会让难度反复回退（单调性 100% → 51%）。 */
const EC = typeof WORD_META === "undefined" ? null : WORD_META;
const EC_F = w => { const e = EC && EC[w.word.toLowerCase()]; return (e && e.f) || Infinity; };

/* 档位标签：只用于展示与快筛，不参与排序 —— 排序始终是连续的词频爬坡，
 * 硬切档会让学习曲线出现台阶，用户在第 1500 词处会突然变难。 */
const TIER_HI = 1500, TIER_MID = 4500;
const tierOf = w => { const f = EC_F(w); return f <= TIER_HI ? "高频" : f <= TIER_MID ? "中频" : "低频"; };

/* 「中学已学词」判定：词频 + 牛津3000 + 柯林斯星级 三者交叉。
 * 刻意不用 ECDICT 的考纲标签（t 字段）—— 它是「覆盖关系」而非「学历关系」，
 * compensate(f=5037) / compulsory(f=12735) 都挂着 gk 标签，显然不是高中词汇。
 * 命中 1254 词（28%），边界落在 familiar / appropriate / supply / search 一带，
 * 与「高中毕业应掌握 3500 词」的量级吻合。 */
const isBasic = w => {
  const e = EC && EC[w.word.toLowerCase()];
  if (!e || !e.f) return false;
  return e.f <= TIER_HI && (e.o === 1 || (e.c || 0) >= 4);
};

WORDS.sort((a, b) => EC_F(a) - EC_F(b));

/* 同档内确定性打散：词频相邻的词常常同源同族（american / british / african /
 * european 全挤在一起），连着背容易串味，一屏 20 词里也会扎堆好几个同首字母。
 * 用 FNV-1a 哈希对单词本身做组内重排 —— 确定性算法，每次加载顺序完全一致，
 * 不会让学习进度对不上。 */
const fnv = s => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };
const UNIT = 20;                    // 与每日目标对齐：一个单元正好是一天的量
for (let i = 0; i < WORDS.length; i += UNIT) {
  const seg = WORDS.slice(i, i + UNIT).sort((a, b) => fnv(a.word) - fnv(b.word));
  for (let j = 0; j < seg.length; j++) WORDS[i + j] = seg[j];
}

/* 中学已学词另存一份，供「快速筛掉已会词」队列使用 */
const BASIC_WORDS = WORDS.filter(isBasic);

/* 单词索引：错词本 / 生词本里存的是字符串，取词对象别再 O(n) 地 find */
const WORD_BY = new Map(WORDS.map(w => [w.word, w]));
const wordsOf = list => list.map(x => WORD_BY.get(x)).filter(Boolean);

/* 音标兜底：词库自带音标只有 126 词，其余从 ECDICT（英式 IPA，见 data-ecdict.js 的 p 字段）补齐，
 * 统一包成 /…/ 与自带格式一致 */
if (EC) for (const w of WORDS) {
  if (!w.phonetic) {
    const m = EC[w.word.toLowerCase()];
    if (m && m.p) w.phonetic = "/" + String(m.p).replace(/^\/+|\/+$/g, "") + "/";
  }
}

/* 文章统一按发布日期倒序：最新的一篇自动成为发现页「今日精选」 */
ARTICLES.sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));

let view = { name: "home" };      // home | study | probe | discover | me | read
let flipped = false;
/* 本卡的作答状态：null = 还没答；"no"/"fuzzy" = 已答错、正在看背面答案。
 * 答错的卡不直接跳下一个——先翻面让你把答案看完，再点「继续」走人，
 * 否则错词只是被记进本子，眼睛从来没在答案上停留过。 */
let answered = null;

/* ---------------- 学习队列 ----------------
 * 以前学习页只认一个全局下标 studyIdx，取词写死为 WORDS[studyIdx % len]——
 * 「开始复习错词」因此是个空头承诺：进了学习页还是顺序里的下一个词。
 * 现在学习页只认队列：queue 为 null 时才是默认顺序，否则按队列走。
 * 复习（错词 / 生词本 / 到期词）都是「换一个队列」，不再往渲染里塞 if。 */
let queue = null;      // 当前队列（单词对象数组）；null = 默认新词顺序
let qPos = 0;          // 队列内位置
let qLabel = "";       // 队列名，显示在进度条旁，如「复习 · 错词」
let qNoCount = false;  // 快筛队列：点「认识」不计入每日新词额度

/* 默认新词顺序从「摸底自测」定出的起点开始 —— 起点之前的词默认视为已掌握。
 * 对有一些基础的用户，这直接省掉前 1000 多个中学已收录词的重复劳动。
 * slice 结果缓存在 _pool 里：curList() 每帧都会被调用，不能每次都复制 4454 个元素。 */
const startIdx = () => {
  const n = (S.probe && S.probe.startIdx) | 0;
  return Math.max(0, Math.min(n, Math.max(0, WORDS.length - 1)));
};
let _pool = null, _poolAt = -1;
function newWords() {
  const s = startIdx();
  if (_poolAt !== s || !_pool) { _pool = WORDS.slice(s); _poolAt = s; }
  return _pool;
}
const curList = () => queue || newWords();
const curWord = () => curList()[qPos % curList().length];
function setQueue(words, label, noCount) {
  queue = words && words.length ? words : null;
  qPos = 0;
  qLabel = queue ? label : "";
  qNoCount = !!noCount;
  flipped = false;
  answered = null;
}
/* 走到下一张卡；队列走完自动收尾回「我的」。返回 false 表示队列已结束（此时已 toast）。
 * 默认全量队列是循环的，永远走不到头。 */
function advanceQueue() {
  if (queue && qPos + 1 >= queue.length) {
    const n = queue.length;
    setQueue(null, "");
    view = { name: "me" };
    render();
    toast(`复习完成 · 过了一遍 ${n} 个词`);
    return false;
  }
  qPos++;
  render();
  return true;
}
let activeArticle = null;
let catFilter = "全部";
let searchTerm = "";
/* 阅读页状态：计时器 + 本篇查询过的生词数 */
let readSecs = 0, readTimer = null;
const LOOKED = {};  // { [articleId]: 次 }

/* ---------------- 视图栈：从哪儿进来，就退回哪儿 ----------------
 * 阅读页是「压栈」式页面：进入前先把当前列表的现场存快照（视图 / 分类 / 搜索词 /
 * 滚动位置），点返回时原样还原，而不是无条件甩回首页。
 * 快照栈同时与浏览器 history 对齐，系统返回手势 / 浏览器后退键也能退一层。 */
let navStack = [];
let histDepth = 0;      // 已成功压入的 history 条数
let histSyncing = 0;    // 由应用内返回触发的 popstate，需忽略
let histRewind = 0;     // 根级跳转回收 history 时，需忽略的那一次 popstate
const histOk = (() => {
  try {
    return typeof history !== "undefined" && typeof history.pushState === "function"
      && typeof location !== "undefined" && location.protocol !== "file:";
  } catch (e) { return false; }
})();

const scroller = () => $("#screen .view");
const snapView = extra => Object.assign({
  name: view.name,
  cat: catFilter,
  q: searchTerm,
  y: (scroller() || { scrollTop: 0 }).scrollTop || 0
}, extra || {});

/* 进入下一层：压栈 + 记一条 history */
function pushNav(extra) {
  navStack.push(snapView(extra));
  if (histOk) {
    try { history.pushState({ wl: navStack.length }, ""); histDepth++; } catch (e) { /* 沙箱 iframe 等环境忽略 */ }
  }
}

/* 根级切换（点底部 tab / 回首页 / 去生词本）：栈清空，避免返回键退到无关页面。
 * 同时把之前压进去的 history 条目一起回收 —— 否则内部栈已经归零、history 还停在
 * 第 N 条，用户按后退键时 popstate 进来却发现栈是空的，表现为「按了没反应」。 */
function resetNav() {
  navStack = [];
  if (!histOk || histDepth <= 0) return;
  const n = histDepth;
  histDepth = 0;
  histRewind = 1;                     // history.go 触发的 popstate 只应被吞掉一次
  try { history.go(-n); } catch (e) { histRewind = 0; }
  /* 兜底：某些环境不派发 popstate，别让这个标志一直挡着后续返回 */
  setTimeout(() => { histRewind = 0; }, 800);
}

/* 返回上一层：还原现场；栈已空则返回 false（由调用方决定兜底）
 * fromPop = true 表示这次返回由系统/浏览器后退触发，history 条目浏览器已经替我们退了，
 * 不能再调用一次 history.back()（原来两条路径都各减一次 histDepth，一次返回退两层）。 */
function navBack(fromPop) {
  if (!navStack.length) return false;
  const snap = navStack.pop();
  catFilter = snap.cat || "全部";
  searchTerm = snap.q || "";
  view = { name: snap.name };
  render();
  const el = scroller();
  if (el) el.scrollTop = snap.y || 0;
  if (snap.src) flashArticle(snap.src);
  if (!fromPop && histOk && histDepth > 0) {
    histDepth--;
    histSyncing++;
    try { history.back(); } catch (e) { histSyncing--; histDepth++; }
    /* 兜底：万一 popstate 没来，别把下一次系统返回吞掉 */
    setTimeout(() => { if (histSyncing > 0) histSyncing--; }, 700);
  }
  return true;
}

/* 回到列表时把刚读过的那篇闪一下，长列表里好定位 */
function flashArticle(id) {
  requestAnimationFrame(() => {
    const el = document.querySelector(`.article[data-article="${id}"], .discover-feat[data-article="${id}"]`);
    if (!el) return;
    el.classList.add("flash");
    setTimeout(() => el.classList.remove("flash"), 1300);
  });
}

/* 阅读顺序：跟随来路列表（分类页进来就在该分类里往下走），无来路则用全站列表 */
function listContext() {
  const top = navStack[navStack.length - 1];
  const cat = top && top.name === "discover" && !top.q && top.cat && top.cat !== "全部" ? top.cat : "";
  return cat ? ARTICLES.filter(a => a.cat === cat) : ARTICLES;
}
function nextArticle(a) {
  const list = listContext();
  const i = list.indexOf(a);
  return i >= 0 && i + 1 < list.length ? list[i + 1] : null;
}

if (typeof window !== "undefined" && window.addEventListener) {
  window.addEventListener("popstate", () => {
    if (histRewind > 0) { histRewind = 0; return; }  // 根级跳转回收 history，忽略这次
    if (histSyncing > 0) { histSyncing--; return; }   // 应用内返回已退过，这次只是同步 history
    if (histDepth > 0) histDepth--;
    /* 浏览器已经替我们退掉一条 history，navBack 不能再退一次 */
    navBack(true);
  });
}

/* ---------------- 图标 ---------------- */
const ICON = {
  home: '<path d="M3 10.6 12 3.2l9 7.4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M5.6 9.4V20h12.8V9.4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M10 20v-5.2h4V20" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/>',
  cards: '<rect x="3.5" y="5.5" width="13" height="13" rx="3" stroke="currentColor" stroke-width="2" fill="none"/><path d="M7.5 3.5h10a3 3 0 0 1 3 3v10" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M7 9.5h6M7 13h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  compass: '<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" fill="none"/><path d="M15.5 8.5 13.7 13.7 8.5 15.5l1.8-5.2 5.2-1.8Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/>',
  user: '<circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2" fill="none"/><path d="M4.5 20.5c.8-3.6 3.8-5.5 7.5-5.5s6.7 1.9 7.5 5.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>',
  close: '<path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" fill="none"/>',
  back: '<path d="M15 5l-7 7 7 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
  bookmark: '<path d="M6.5 3.5h11v17l-5.5-3.8-5.5 3.8v-17Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/>',
  bookmarkOn: '<path d="M6.5 3.5h11v17l-5.5-3.8-5.5 3.8v-17Z" fill="currentColor"/>',
  speaker: '<path d="M4 9.5v5h3.2l4.3 3.4V6.1L7.2 9.5H4Z" fill="currentColor"/><path d="M15.6 9a4.2 4.2 0 0 1 0 6M18 6.5a8 8 0 0 1 0 11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" fill="none"/>',
  globe: '<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M3 12h18" stroke="currentColor" stroke-width="1.8"/><path d="M12 3c2.6 2.8 3.9 5.8 3.9 9S14.6 18.2 12 21c-2.6-2.8-3.9-5.8-3.9-9S9.4 5.8 12 3Z" stroke="currentColor" stroke-width="1.8" fill="none"/>',
  search: '<circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2" fill="none"/><path d="M16.5 16.5 21 21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  filter: '<path d="M4 7h16M7 12h10M10 17h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>',
  font: '<path d="M4 18 9.5 6l5.5 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M6.2 14h6.6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M17 18v-6M14.5 12h5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  play: '<path d="M8 5.5v13l11-6.5L8 5.5Z" fill="currentColor"/>',
  check: '<path d="M5.5 12.5l4.2 4.2L18.5 8" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
  cross: '<path d="M7 7l10 10M17 7L7 17" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" fill="none"/>',
  question: '<circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="2.2" fill="none"/><path d="M12 8v4.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
  fire: '<path d="M13.5 2c.6 3.3-1.4 4.6-2.7 6C9 9.7 8 11.3 8 14a6 6 0 0 0 12 .3c0-1.6-.7-3-1.6-4.2.3 1.4-.2 2.6-1.2 3.1.6-3.6-1.4-7.6-3.7-11.2Z" fill="currentColor"/><path d="M9.6 13.6c.2 2.5 1.9 4.2 4.3 4.4-1.9-.8-2.8-2.4-2.6-4.4.1-1-.6-1.9-1.7-2 .3 1.4-.1 1.9 0 2Z" fill="currentColor"/>',
  flip: '<path d="M8 7 4 12l4 5M16 7l4 5-4 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
  settings: '<circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 3v2.2M12 18.8V21M4.2 7.5l1.9 1.1M17.9 15.4l1.9 1.1M4.2 16.5l1.9-1.1M17.9 8.6l1.9-1.1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  book: '<path d="M5 4h6a3 3 0 0 1 3 3v13a2.5 2.5 0 0 0-2.5-2.5H5V4Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/><path d="M19 4h-5v13h5V4Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/>',
  moon: '<path d="M20.2 14.8A8.6 8.6 0 0 1 9.2 3.8 8.6 8.6 0 1 0 20.2 14.8Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/>',
  sun: '<circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4 17 7M7 17l-1.6 1.6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  tap: '<path d="M10 11V5.6a1.6 1.6 0 0 1 3.2 0V10m0-1.6a1.6 1.6 0 0 1 3.2 0v3.8c0 3.8-2.6 6.4-6.4 6.4-2.9 0-4.5-1.5-6-4.6l-1.1-2.3c-.4-.9.7-1.8 1.6-1.2L10 12.6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
  ball: '<polygon points="12,3.6 19.6,9 16.8,18 7.2,18 4.4,9" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linejoin="round"/><path d="M12 3.6 7.2 18M12 3.6 16.8 18M4.4 9h15.2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
  doc: '<rect x="5.5" y="3" width="13" height="18" rx="2" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M9 8h6M9 12h6M9 16h4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
  pillar: '<path d="M4 6h16M6 6v14M18 6v14M9 6v14M15 6v14M3 20h18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  sparkle: '<path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4z" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linejoin="round"/><path d="M19 16l.8 2.4L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.6z" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linejoin="round"/>',
  star: '<path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1.1 5.8L12 16.9l-5.3 2.7 1.1-5.8-4.3-4.1 5.9-.8z" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linejoin="round"/>',
  hanger: '<path d="M12 4.2a2 2 0 1 1 2.1 2c-.7.3-1.1.9-1.1 1.6v.9M12 8.7 3.6 14.9c-.7.5-.3 1.6.5 1.6h15.8c.8 0 1.2-1.1.5-1.6L12 8.7Z" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  film: '<rect x="3" y="5" width="18" height="14" rx="2.2" stroke="currentColor" stroke-width="1.7" fill="none"/><path d="M7.6 5v14M16.4 5v14M3 9.6h4.6M3 14.4h4.6M16.4 9.6H21M16.4 14.4H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
  arrow: '<path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
  trash: '<path d="M4 7h16M9 7V4.8A.8.8 0 0 1 9.8 4h4.4a.8.8 0 0 1 .8.8V7M6.5 7l.8 12.2a.8.8 0 0 0 .8.8h7.8a.8.8 0 0 0 .8-.8L17.5 7M10 11v6M14 11v6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
  download: '<path d="M12 3v11M8 10.5l4 3.5 4-3.5M4.5 19h15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
  upload: '<path d="M12 16V5M8 8.5l4-3.5 4 3.5M4.5 19h15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
  refresh: '<path d="M20 11a8 8 0 1 0-.6 4M20 5v6h-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
  chart: '<path d="M4 20V9M10 20V4M16 20v-7M22 20H2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'
};
const svg = (n, size = 18) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">${ICON[n] || ""}</svg>`;

/* ---------------- 工具 ---------------- */
const doneToday = () => { rollDay(); return S.daily.count; };
const pct = () => Math.min(100, Math.round(doneToday() / DAILY_GOAL * 100));
/* 已掌握 = 学过且不在错词本里的词；掌握率 = 已掌握 / 已学 */
const masteredCount = () => S.studied.filter(w => !S.wrong.includes(w)).length;
const masteredRate = () => S.studied.length ? Math.round(masteredCount() / S.studied.length * 100) : 0;
const ring = (p, size = 78, sw = 10) => {
  const r = (size - sw) / 2, c = 2 * Math.PI * r;
  return `<div class="ring-wrap" style="width:${size}px;height:${size}px">
    <svg width="${size}" height="${size}">
      <circle cx="${size / 2}" cy="${size / 2}" r="${r}" stroke="var(--brand-soft)" stroke-width="${sw}" fill="none"/>
      <circle cx="${size / 2}" cy="${size / 2}" r="${r}" stroke="var(--brand)" stroke-width="${sw}" fill="none"
        stroke-linecap="round" stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${(c * (1 - p / 100)).toFixed(1)}"/>
    </svg>
    <div class="ring-txt">${p}%</div>
  </div>`;
};
const statusbar = () => `
  <div class="statusbar" aria-hidden="true"></div>`;
const speak = t => { try { const u = new SpeechSynthesisUtterance(t); u.lang = "en-US"; speechSynthesis.cancel(); speechSynthesis.speak(u); } catch (e) { } };
const toast = msg => {
  const el = document.createElement("div");
  el.className = "toast"; el.textContent = msg;
  $(".phone").appendChild(el);
  setTimeout(() => el.remove(), 1600);
};
const CAT_META = {
  "足球":   { icon: "ball",    bg: "linear-gradient(135deg,#10B981,#047857)" },
  "历史":   { icon: "pillar",  bg: "linear-gradient(135deg,#D97706,#92400E)" },
  "AI":     { icon: "sparkle", bg: "linear-gradient(135deg,#A78BFA,#4F46E5)" },
  "寓言":   { icon: "book",    bg: "linear-gradient(135deg,#2DD4BF,#0F766E)" },
  "明星":   { icon: "star",    bg: "linear-gradient(135deg,#F472B6,#DB2777)" }
};

/* 生词数按文章缓存：排序时要反复比较，避免每次重扫全文 */
const HITS_CACHE = new Map();
const hitsOf = a => {
  if (!HITS_CACHE.has(a.id)) HITS_CACHE.set(a.id, countHits(a));
  return HITS_CACHE.get(a.id);
};

/* 文章排序：发现页「筛选」按钮切换，不是摆设 */
const SORTS = { new: "最新发布", words: "生词最多", short: "时长最短" };
let sortBy = "new";
function sortArticles(list) {
  const arr = list.slice();
  if (sortBy === "words") arr.sort((a, b) => hitsOf(b) - hitsOf(a));
  else if (sortBy === "short") arr.sort((a, b) => (a.minutes || 0) - (b.minutes || 0));
  else arr.sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
  return arr;
}

/* 配图解析：优先文章自带 coverImg，其次回填表 COVER_MAP，两者都没有则回退渐变封面 */
const coverOf = a => a.coverImg || ((typeof COVER_MAP !== "undefined" && COVER_MAP[a.id]) || "") || "";
const srcName = a => String(a.source || "").split(" · ")[0];

/* 相对时间：今天 / 昨天 / N 天前 / N 周前 */
function fmtWhen(date) {
  if (!date) return "";
  const t = Date.parse(`${date}T12:00:00`);
  if (isNaN(t)) return date;
  const days = Math.floor((Date.now() - t) / 86400000);
  if (days <= 0) return "今天";
  if (days === 1) return "昨天";
  if (days < 7) return `${days} 天前`;
  if (days < 35) return `${Math.floor(days / 7)} 周前`;
  return date;
}

/* 缩略图：用 <img loading="lazy"> 而不是 CSS background-image。
   一次排序最多会渲染 60+ 张卡，背景图无法懒加载，浏览器必须把 60 张（约 4MB）一次性拉回来；
   换成 img 之后，视口外的图不进请求队列。width/height 写死是为了不让图片到位时把列表顶开。
   没有封面时退回渐变块（原来的行为），保证列表不会缺一块。 */
const thumbHtml = (a, img) => img
  ? `<div class="thumb has-img"><img src="${esc(img)}" alt="" width="76" height="76"
       loading="lazy" decoding="async"></div>`
  : `<div class="thumb" style="background:${esc(a.gradient)}"></div>`;

const articleCard = a => {
  const hits = hitsOf(a);
  const hitsLbl = hits > 200 ? "200+" : hits;
  const img = coverOf(a);
  const when = fmtWhen(a.date);
  const tzh = zhTitle(a);
  const done = S.finished.includes(a.id);   // 已读标记：finished 是「已打卡」的去重列表
  return `
  <div class="article${done ? " read" : ""}" data-article="${a.id}" role="button" tabindex="0" aria-label="阅读文章：${esc(clean(a.title))}${tzh ? `，${esc(tzh)}` : ""}${done ? "，已读" : ""}">
    ${thumbHtml(a, img)}
    <div class="col grow" style="gap:6px">
      <span class="tag">${esc(clean(a.cat))}${when ? ` · ${when}` : " · 四级难度"}</span>
      <div class="t">${esc(clean(a.title))}${done ? ` <span class="read-dot" title="已读完">已读</span>` : ""}</div>
      ${tzh ? `<div class="t-zh">${esc(tzh)}</div>` : ""}
      <span class="meta">${esc(srcName(a))} · ${a.minutes} 分钟 · 生词 ${hitsLbl}</span>
    </div>
  </div>`;
};

/* ---------------- 页面：首页 ---------------- */
function renderHome() {
  const done = doneToday();
  const rest = Math.max(0, DAILY_GOAL - done);
  const streak = streakDays();
  const hr = new Date().getHours();
  const greet = hr < 6 ? "夜深了" : hr < 12 ? "早上好" : hr < 18 ? "下午好" : "晚上好";
  const pv = S.probe && S.probe.done ? S.probe : null;
  const si = startIdx();
  const firstNew = (newWords()[0] || {}).word || "—";
  return `
    ${statusbar()}
    <div class="view">
      <div class="row between">
        <div class="col" style="gap:4px">
          <div class="h1">${greet}</div>
          <div class="muted">距四级考试还有 ${daysToExam()} 天 · 已掌握 ${masteredCount().toLocaleString()} 词 / 共 ${WORDS.length.toLocaleString()}</div>
        </div>
        <div class="icon-btn" style="background:var(--brand-soft);border:0;color:var(--brand)" aria-hidden="true">${svg("user", 18)}</div>
      </div>

      <div class="card col" style="gap:16px">
        <div class="row between">
          <span class="h2">今日学习</span>
          <span class="chip amber">${svg("fire", 13)}&nbsp;${streak > 0 ? `连续 ${streak} 天` : "今天还没开始"}</span>
        </div>
        <div class="row" style="gap:18px">
          ${ring(pct())}
          <div class="col grow" style="gap:5px">
            <div style="font-family:var(--font-num);font-weight:700;font-size:26px">${done} / ${DAILY_GOAL}</div>
            <div class="muted">四级核心词 · 今日目标</div>
            <div class="muted-2">${rest > 0 ? `今日还剩 ${rest} 个新词` : "今日任务已完成 🎉"}</div>
          </div>
        </div>
        <div class="stat-grid">
          <div class="stat"><div class="n">${done}</div><div class="l">今日新学</div></div>
          <div class="stat"><div class="n">${rest}</div><div class="l">今日剩余</div></div>
          <div class="stat good"><div class="n">${masteredRate()}%</div><div class="l">掌握率</div></div>
        </div>
        <button class="btn-primary" data-act="start-study">${svg("play", 18)} 开始今日背词</button>
      </div>

      ${pv ? `
      <div class="card col" style="gap:12px">
        <div class="row between">
          <span class="h3">学习起点</span>
          <span class="row" style="gap:10px;align-items:center">
            <span class="chip">${(WORDS.length - si).toLocaleString()} 词待学</span>
            <span class="link" data-act="probe-again" role="button" tabindex="0">重测</span>
          </span>
        </div>
        <div class="muted-2">已跳过前 ${si.toLocaleString()} 个已会词，从「${esc(firstNew)}」开始学。</div>
        <button class="go-btn" data-act="quick-sieve" style="width:100%">快筛中学已会词 · ${BASIC_WORDS.length}</button>
      </div>` : `
      <div class="card row between" style="gap:12px">
        <div class="col" style="gap:3px">
          <span class="h3">还没定位起点</span>
          <span class="muted-2">12 个词，测出你该从哪儿开始</span>
        </div>
        <button class="go-btn" data-act="probe-again" style="flex:none">开始定位</button>
      </div>`}

      <div class="row between">
        <span class="h3">今日推荐</span>
        <span class="link" data-act="go-discover" role="button" tabindex="0">换一批</span>
      </div>
      ${ARTICLES.slice(0, 2).map(articleCard).join("")}
      <div style="height:6px"></div>
    </div>`;
}

/* ---------------- 页面：摸底自测（定位起点） ----------------
 * 借鉴扇贝单词的「词汇量测评定位起点」：给一屏 12 个词，用户点出认识的即可，
 * 据此判断他该从词库的哪个位置学起。有基础的人不必从 the / and 一路熬过来。
 * 探测词从全库按词频分 12 段、每段取中位，梯度均匀；且只取长度 ≥4 的实词 ——
 * 功能词测不出水平，谁都会 the / and。同时把「中学已学词」整批排除：探测点要问
 * 的是「你会到哪儿」，拿 human / winter 这种全民都会的词去问，纯属浪费位置。
 * 起点规则：取「认识的最深那个探测词」之后的位置；但只认识 1~2 个就直接从头开始 ——
 * 偶然认识一个难词不足以判定整体水平，不能让用户一拍脑门跳过整个词库。 */
const PROBE_K = 12;
let PROBE_WORDS = null;
function probeWords() {
  if (PROBE_WORDS) return PROBE_WORDS;
  const pool = WORDS.filter(w => w.word.length >= 4 && /^[a-z]+$/.test(w.word)
    && !STOPWORD_HIGHLIGHT.has(w.word) && !isBasic(w));
  const seg = Math.floor(pool.length / PROBE_K);
  PROBE_WORDS = [];
  for (let i = 0; i < PROBE_K; i++) PROBE_WORDS.push(pool[Math.min(pool.length - 1, i * seg + (seg >> 1))]);
  return PROBE_WORDS;
}
function probeStartOf(picked) {
  const list = probeWords();
  let deepest = -1;
  list.forEach((w, i) => { if (picked.has(w.word)) deepest = i; });
  if (deepest < 2) return 0;
  return Math.max(0, WORDS.indexOf(list[deepest]) + 1);
}
let probePicked = new Set();

function renderProbe() {
  const list = probeWords();
  const n = list.filter(w => probePicked.has(w.word)).length;
  return `
    ${statusbar()}
    <div class="view">
      <div class="row" style="gap:12px">
        <span class="icon-btn" data-act="go-home" role="button" tabindex="0" aria-label="返回首页">${svg("close", 16)}</span>
        <span class="h3 grow">先定位一下你的起点</span>
      </div>
      <div class="muted">下面 12 个词大致按由易到难排列。勾出你已经认识的 —— 前面这些你本来就会的词，就不用再花时间了。</div>
      <div class="probe-grid">
        ${list.map(w => `<button class="probe-chip${probePicked.has(w.word) ? " on" : ""}" data-act="probe-pick" data-word="${w.word}" aria-pressed="${probePicked.has(w.word) ? "true" : "false"}">${esc(w.word)}</button>`).join("")}
      </div>
      <div class="row between">
        <span class="muted-2">已勾选 ${n} / ${PROBE_K}</span>
        ${n ? `<span class="link" data-act="probe-reset" role="button" tabindex="0">全部清空</span>` : ""}
      </div>
      <div style="height:4px"></div>
      <button class="btn-primary" data-act="probe-done">${svg("check", 18)} 完成 · 开始背词</button>
      <div class="row" style="justify-content:center">
        <span class="link" data-act="probe-skip" role="button" tabindex="0">跳过 · 从最常用的词开始</span>
      </div>
    </div>`;
}

/* ---------------- 页面：背单词 ---------------- */
/* ---------------- 背词页：翻卡 ----------------
 * 以前翻卡走的是「改状态 → 整页 render()」：screen.innerHTML 被整体重建，
 * 新建的 #flip 一出生就带着 .flipped，rotateY(180deg) 在元素首次样式计算时就已经生效。
 * CSS transition 不会在元素「首次渲染」时触发，所以卡片其实是「啪一下换脸」，
 * 压根没有播放过翻转过程 —— 手机上尤其明显：手指点下去内容瞬间跳变，空间连续性断掉。
 * 现在翻卡只切类名（DOM 不重建），过渡自然跑起来；只有文案做局部更新。 */
function backChipText() {
  const isRich = /^List/i.test(curWord().list || "");
  return answered === "no" ? "不认识 · 再看一遍"
       : answered === "fuzzy" ? "有点模糊 · 再巩固一下"
       : (isRich ? "词根词缀拆解" : "答案 · 加深理解");
}
const hintText = () => answered ? "答案看完了吗 · 点下面继续" : "点卡片翻面 · 左右滑动换词";

function toggleFlip() {
  const flip = $("#flip");
  if (!flip || flip.dataset.busy === "1") return;   // 动画进行中忽略重复点击
  flipped = !flipped;
  flip.dataset.busy = "1";
  flip.classList.toggle("flipped", flipped);
  syncFlipLabels();
  if (flipped) {
    const back = $(".face.back", flip);
    if (back) back.scrollTop = 0;                   // 每次翻到背面都从头看
  }
  setTimeout(() => { delete flip.dataset.busy; }, 340);   // 与 CSS 过渡时长对齐
  /* 轻震一下：手机上「点到了」这件事需要非视觉反馈 */
  if (navigator.vibrate) navigator.vibrate(6);
}

/* 翻面只影响两处文案（背面 chip / 底部提示），局部改掉即可，不必重建整页 */
function syncFlipLabels() {
  const chip = $("#flip .face.back .chip");
  if (chip) chip.textContent = backChipText();
  const hint = $(".hint-row");
  if (hint) hint.innerHTML = svg("flip", 13) + " " + hintText();
}

/* 上一个词：队列模式到顶就停住，默认全量顺序则循环 */
function prevWord() {
  if (queue) { if (qPos === 0) return; qPos--; }
  else qPos = (qPos - 1 + curList().length) % curList().length;
  flipped = false; answered = null;
  render();
}

function renderStudy() {
  const w = curWord();
  const list = curList();
  const at = qPos % list.length;
  const p = Math.round(at / list.length * 100);
  const marked = S.notebook.includes(w.word);
  const tier = tierOf(w);        // 高频 / 中频 / 低频（ECDICT 语料词频分档，见文件上方）

  /* ---------------- 卡片正反面重新分工 ----------------
   * 旧版正面就摊开「释义 + 例句」，背面又重复一遍，翻不翻几乎一样——翻转失去意义。
   * 现在回归闪卡范式：正面 = 问题（词 + 音标，让用户先回忆），背面 = 答案（全部深化内容）。
   * 正面只给词性做「回忆线索」，不剧透释义；例句/搭配/助记/词根词缀全部只在背面出现。 */

  const morphes = [["p", w.prefix], ["r", w.root], ["s", w.suffix]].filter(x => x[1] && x[1].m);

  const backChip = backChipText();

  /* 背面：按「答案 → 为什么 → 怎么用」三层组织，缺哪层就不渲染哪层 */
  const back = `
    <div class="face back">
      <div class="row" style="justify-content:center"><span class="chip${answered ? " amber" : ""}">${backChip}</span></div>
      <div class="word back-word">${w.word}</div>
      <div class="row" style="justify-content:center;gap:10px">
        ${w.phonetic ? `<span class="phonetic">${w.phonetic}</span>` : `<span class="muted-2">暂无音标</span>`}
        <span class="icon-btn solid" data-act="speak" data-word="${w.word}" style="width:30px;height:30px;color:#fff">${svg("speaker", 15)}</span>
      </div>
      <div class="divider"></div>

      <div class="back-answer">
        <span class="muted-2">释义</span>
        <div class="def">${w.pos} ${esc(w.def)}</div>
      </div>

      ${morphes.length ? `
        <div class="morphemes">
          ${morphes.map(([k, m]) => `<div class="morph ${k}"><div class="m">${esc(m.m)}</div><div class="t">${esc(m.t)}</div></div>`).join("")}
        </div>
        ${w.literal ? `<div style="color:var(--brand);font-size:13px;font-weight:500">${esc(w.literal)}</div>` : ""}
      ` : ""}

      ${w.example ? `<div class="example-box">
        <div class="row" style="gap:6px">
          ${svg("book", 12)}
          <span class="chip" style="padding:2px 8px;font-size:10px">${esc(srcLabel(w))}</span>
        </div>
        <div class="en">${hlWord(w.example, w.word)}</div>
        ${w.exampleCn ? `<div class="cn">${esc(w.exampleCn)}</div>` : ""}
      </div>` : ""}
      ${w.mnemonic ? `<div class="row" style="gap:10px;background:var(--brand-deep);border-radius:12px;padding:12px">
        <div style="width:3px;background:var(--brand);border-radius:2px;align-self:stretch"></div>
        <div style="font-size:12px;line-height:19px;color:var(--text-2)">${esc(w.mnemonic)}</div>
      </div>` : ""}
      ${(!w.example && !w.mnemonic) ? `<div class="row" style="justify-content:center"><span class="muted-2">基础词库 · 暂未提供例句</span></div>` : ""}
    </div>`;

  /* 正面：只给词 + 音标 + 词性（回忆线索），不剧透释义与例句 */
  const frontChip = `四级考纲 · ${tier}词`;

  return `
    ${statusbar()}
    <div class="view study-view">
      <div class="row" style="gap:12px">
        <span class="icon-btn" data-act="go-home">${svg("close", 16)}</span>
        <div class="row grow" style="gap:10px">
          <div style="flex:1;height:6px;border-radius:3px;background:var(--brand-soft);overflow:hidden">
            <div style="width:${Math.max(4, p)}%;height:100%;background:var(--brand);border-radius:3px"></div>
          </div>
          <span style="font-family:var(--font-num);font-weight:600;font-size:13px;color:var(--text-2)">${at + 1}/${list.length}</span>
        </div>
        <span class="icon-btn ${marked ? "active" : ""}" data-act="mark">${svg(marked ? "bookmarkOn" : "bookmark", 16)}</span>
      </div>
      ${queue ? `<div class="qbar">
        <span class="chip">${esc(qLabel)}</span>
        <span class="muted-2" style="font-size:11.5px">${qNoCount ? "快筛模式 · 不计入今日新词额度" : "答对自动按 FSRS 记忆算法安排下次复习"}</span>
        <span class="link" data-act="quit-queue" role="button" tabindex="0">退出</span>
      </div>` : ""}

      <div class="flip ${flipped ? "flipped" : ""}" id="flip" data-act="flip">
        <div class="flip-inner">
          <div class="face front">
            <span class="chip">${frontChip}</span>
            <div class="word">${w.word}</div>
            <div class="row" style="gap:10px">
              ${w.phonetic ? `<span class="phonetic">${w.phonetic}</span>` : `<span class="muted-2" style="font-size:13px">暂无音标</span>`}
              <span class="icon-btn solid" data-act="speak" data-word="${w.word}" style="width:30px;height:30px;color:#fff">${svg("speaker", 15)}</span>
            </div>
            <div class="divider"></div>
            <div class="col" style="gap:10px;width:100%;align-items:center">
              <span class="muted-2">${w.pos ? esc(w.pos) : ""} · 想一想它的意思</span>
              <span class="front-hint">${svg("flip", 13)} 点击翻转查看释义</span>
            </div>
          </div>
          ${back}
        </div>
      </div>

      <div class="hint-row">${svg("flip", 13)} ${hintText()}</div>
      <div class="answer-row">
        ${answered
          ? `<button class="answer-btn yes" data-act="next" style="flex:1">${svg("arrow", 15)} 继续 · 下一个</button>`
          : `<button class="answer-btn no" data-act="answer" data-v="no">${svg("cross", 15)} 不认识</button>
        <button class="answer-btn fuzzy" data-act="answer" data-v="fuzzy">${svg("question", 15)} 模糊</button>
        <button class="answer-btn yes" data-act="answer" data-v="yes">${svg("check", 15)} 认识</button>`}
      </div>
      <div style="height:6px"></div>
    </div>`;
}

/* ---------------- 页面：发现 ----------------
 * 列表分页：切到非默认排序时，以前会把 60+ 篇文章一次性铺出来（实测 67 张卡 / 62 张封面）。
 * 现在每页 20 篇，其余点「显示更多」再补。配合封面懒加载，首屏不再背上 4MB 图片。 */
const PAGE = 20;
let shown = PAGE;
const clipList = items => items.slice(0, shown);
const moreRow = (items, act) => items.length > shown
  ? `<button class="more-row" data-act="${act}" role="button" tabindex="0">显示更多 · 还有 ${items.length - shown} 篇</button>`
  : "";

function renderDiscover() {
  const q = searchTerm.trim().toLowerCase();
  /* 分类入口直接跟随 CATEGORIES 的声明顺序，新增分类自动出现在发现页 */
  const catList = CATEGORIES.filter(c => c !== "全部");
  const results = searchTerm ? WORDS.filter(w => w.word.toLowerCase().includes(q)).slice(0, 5) : [];
  /* 文章搜索：标题 / 来源 / 分类，命中即列出
     （占位文案一直写着「搜索单词、短语或文章」，但实现只搜词库，这条补上） */
  const artHits = searchTerm ? sortArticles(ARTICLES.filter(a =>
    (a.title || "").toLowerCase().includes(q) ||
    (a.titleZh || "").toLowerCase().includes(q) ||
    (a.source || "").toLowerCase().includes(q) ||
    (a.cat || "").toLowerCase().includes(q)
  )).slice(0, 8) : [];

  /* 「全部」视图 = 分类入口网格 + 今日精选 + 最新更新
     单一分类视图 = 该分类全量列表（切换入口常驻顶部，不用下滑找） */
  const isAll = catFilter === "全部" && !searchTerm;

  /* 精选 = 日期最新的一篇；若它没有配图，优先挑最新一篇「有图」的，
     保证首屏大图不放空。全部无图时才退回最新的一篇。 */
  const byDate = ARTICLES.slice().sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
  const featured = isAll ? (byDate.find(a => coverOf(a)) || byDate[0]) : null;

  /* 分类入口网格：两列紧凑铺开，六个分类一屏内全部可选 —— 取代原先
     纵向堆叠、要看历史/娱乐必须一路下滑的「大栏」 */
  const catGridHtml = isAll ? `<section class="cat-browse">
    <div class="sec-head">
      <span class="sec-t">按分类浏览</span>
      <span class="sec-s">共 ${ARTICLES.length} 篇 · 一屏可选</span>
    </div>
    <div class="cat-grid">
      ${catList.map(cat => {
        const meta = CAT_META[cat] || { icon: "doc", bg: "var(--brand)" };
        const items = ARTICLES.filter(a => a.cat === cat);
        const lead = items.find(a => coverOf(a));
        return `<button class="cat-tile${lead ? " has-img" : ""}" data-cat="${cat}">
          <span class="ct-bg" style="${lead ? `background-image:url('${esc(coverOf(lead))}')` : `background:${esc(meta.bg)}`}"></span>
          <span class="ct-ic">${svg(meta.icon, 13)}</span>
          <span class="ct-txt"><b>${cat}</b><i>${items.length} 篇</i></span>
        </button>`;
      }).join("")}
    </div>
  </section>` : "";

  /* 最新更新 / 排序结果：全部视图下的混合流（精选已单独置顶，这里不重复）
     默认给「最新 5 篇」；切了排序就换成完整的排序结果，让「筛选」按钮真的起作用 */
  const latestHtml = isAll ? (() => {
    const pool = sortArticles(byDate.filter(a => !featured || a.id !== featured.id));
    const rest = sortBy === "new" ? pool.slice(0, 5) : pool;
    if (!rest.length) return "";
    const title = sortBy === "new" ? "最新更新" : `按${SORTS[sortBy]} · 全部文章`;
    const ic = sortBy === "new" ? svg("fire", 15) : svg("filter", 15);
    const page = clipList(rest);
    return `<section class="cat-section">
      <div class="cat-head">
        <div class="left"><span class="ic" style="background:var(--brand)">${ic}</span>${title}</div>
        <span class="meta">${sortBy === "new" ? rest.length : `${page.length}/${rest.length}`} 篇</span>
      </div>
      ${page.map(articleCard).join("")}
      ${moreRow(rest, "more")}
    </section>`;
  })() : "";

  /* 单一分类视图：该分类全量列表（跟随排序设置） */
  const catListHtml = !isAll && !searchTerm ? (() => {
    const items = sortArticles(ARTICLES.filter(a => a.cat === catFilter));
    const meta = CAT_META[catFilter] || { icon: "doc", bg: "var(--brand)" };
    return `<section class="cat-section">
      <div class="cat-head">
        <div class="left">
          <span class="ic" style="background:${meta.bg}">${svg(meta.icon, 15)}</span>
          ${catFilter}<span class="meta">${items.length} 篇</span>
        </div>
        <span class="more" data-act="cat-more" data-cat="全部" role="button" tabindex="0">全部文章 ${svg("arrow", 12)}</span>
      </div>
      ${items.length ? clipList(items).map(articleCard).join("") : `<div class="muted" style="text-align:center;padding:30px 0">该分类暂无文章</div>`}
      ${moreRow(items, "more")}
    </section>`;
  })() : "";

  const wordsHtml = results.length ? `<div class="card col" style="gap:10px">
    <span class="muted-2">匹配到 ${results.length} 个四级词</span>
    ${results.map(w => `<div class="row" data-act="lookup" data-word="${w.word}" role="button" tabindex="0" aria-label="查看单词 ${esc(w.word)}" style="padding:8px 0;border-bottom:1px solid var(--line)">
      <div class="col"><span style="font-family:var(--font-en);font-weight:600;font-size:14px">${w.word}</span><span class="phonetic" style="font-size:11px">${w.phonetic}</span></div>
      <div class="grow" style="text-align:right;font-size:12px;color:var(--text-2)">${esc(w.def)}</div>
    </div>`).join("")}
  </div>` : "";

  const artHitsHtml = artHits.length ? `<section class="cat-section">
    <div class="cat-head">
      <div class="left"><span class="ic" style="background:var(--brand)">${svg("search", 15)}</span>相关文章<span class="meta">${artHits.length} 篇</span></div>
    </div>
    ${artHits.map(articleCard).join("")}
  </section>` : "";

  const emptyHtml = searchTerm && !results.length && !artHits.length
    ? `<div class="card" style="text-align:center;padding:28px 0;color:var(--text-3);font-size:13px">没有找到「${esc(searchTerm)}」相关的单词或文章</div>`
    : "";

  const featImg = featured ? coverOf(featured) : "";
  const featZh = featured ? zhTitle(featured) : "";
  const featuredHtml = featured ? `<div class="discover-feat" data-article="${featured.id}" role="button" tabindex="0" aria-label="今日精选：${esc(clean(featured.title))}${featZh ? `，${esc(featZh)}` : ""}">
    <div class="feat-cover${featImg ? " has-img" : ""}" style="${featImg ? `background-image:url('${esc(featImg)}')` : `background:${esc(featured.gradient)}`}">
      <span class="feat-mark">${esc(srcName(featured))} · 今日精选</span>
      ${featured.date ? `<span class="feat-when">${esc(fmtWhen(featured.date))}</span>` : ""}
      <div class="feat-titles">
        <div class="feat-title">${esc(clean(featured.title))}</div>
        ${featZh ? `<div class="feat-title-zh">${esc(featZh)}</div>` : ""}
      </div>
    </div>
    <div class="feat-body">
      <div class="row" style="gap:6px;flex-wrap:wrap">
        <span class="chip">${esc(featured.cat)}</span>
        <span class="chip green">四级难度</span>
        <span class="chip">${featured.minutes} 分钟</span>
        <span class="chip">${hitsOf(featured)} 个生词</span>
      </div>
      <button class="feat-cta" data-article="${featured.id}">开始阅读 ${svg("arrow", 14)}</button>
    </div>
  </div>` : "";

  return `
    ${statusbar()}
    <div class="view view-flow">
      <div class="row between">
        <span class="h1">发现</span>
        <div class="row" style="gap:8px">
          <span class="icon-btn" data-act="theme" title="切换深浅色" role="button" tabindex="0" aria-label="切换深浅色">${svg(S.theme === "dark" ? "sun" : "moon", 16)}</span>
          <span class="icon-btn${sortBy === "new" ? "" : " active"}" data-act="filter" title="排序：${SORTS[sortBy]}" role="button" tabindex="0" aria-label="切换文章排序，当前为${SORTS[sortBy]}">${svg("filter", 16)}</span>
        </div>
      </div>
      <div class="search">${svg("search", 16)}
        <input id="q" placeholder="搜索单词、短语或文章" value="${esc(searchTerm)}" aria-label="搜索单词、短语或文章" />
      </div>
      <div class="cats-wrap">
        <div class="cats" role="tablist" aria-label="文章分类">
          ${CATEGORIES.map(c => {
            const col = c === "全部" ? "var(--brand)" : ((CAT_META[c] || {}).bg || "var(--brand)");
            return `<button class="cat ${c === catFilter ? "on" : ""}" data-cat="${c}" style="--cat:${col}" role="tab" aria-selected="${c === catFilter}">${c}</button>`;
          }).join("")}
        </div>
      </div>

      ${wordsHtml}
      ${artHitsHtml}
      ${emptyHtml}
      ${catGridHtml}
      ${featuredHtml}
      ${isAll ? `<div class="lib">
        <div class="ic">${svg("cards", 20)}</div>
        <div class="col grow" style="gap:4px">
          <div class="t">四级核心词库</div>
          <div class="s">${WORDS.length.toLocaleString()} 词 · 真题高频 · FSRS 科学复习</div>
        </div>
        <div class="col">
          <div class="p">${masteredRate()}%</div>
          <div class="pl">已掌握</div>
        </div>
      </div>` : ""}
      ${latestHtml}
      ${catListHtml}
      <div style="height:6px"></div>
    </div>`;
}

/* ---------------- 页面：我的 ---------------- */
function renderMe() {
  const week = last7();
  const max = Math.max(1, ...week.map(d => d.mins));
  const weekMins = week.reduce((a, d) => a + d.mins, 0);
  const wrongWords = wordsOf(S.wrong);
  const due = dueCount();
  const avg = Math.round(weekMins / 7);
  return `
    ${statusbar()}
    <div class="view">
      <div class="row between">
        <span class="h1">我的</span>
        <span class="icon-btn" data-act="theme" role="button" tabindex="0" aria-label="切换深浅色" title="切换深浅色">${svg(S.theme === "dark" ? "sun" : "moon", 16)}</span>
      </div>

      <div class="card row" style="gap:14px;padding:16px">
        <div style="width:50px;height:50px;border-radius:25px;background:var(--brand-soft);color:var(--brand);display:flex;align-items:center;justify-content:center" aria-hidden="true">${svg("user", 22)}</div>
        <div class="col grow" style="gap:4px">
          <div class="h2">同学</div>
          <div class="muted">已读完 ${S.finished.length} 篇 · 累计学过 ${S.studied.length.toLocaleString()} 词</div>
        </div>
      </div>

      <div class="card col" style="gap:12px">
        <div class="row between"><span class="h2">学习总览</span><span class="muted-2">近 7 天</span></div>
        <div class="stat-grid">
          <div class="stat"><div class="n">${streakDays()}</div><div class="l">连续天</div></div>
          <div class="stat"><div class="n">${weekMins}</div><div class="l">分钟</div></div>
          <div class="stat good"><div class="n">${masteredCount().toLocaleString()}</div><div class="l">掌握词</div></div>
          <div class="stat bad"><div class="n">${S.wrong.length}</div><div class="l">错词</div></div>
        </div>
      </div>

      <div class="card col" style="gap:12px">
        <div class="row between"><span class="h2">近 7 天学习</span><span class="muted-2">日均 ${avg} 分钟</span></div>
        <div class="bars">
          ${week.map(d => `<div class="bar-col">
            <div class="bar ${d.today ? "today" : ""}" style="height:${Math.round(d.mins / max * 62)}px"></div>
            <span class="${d.today ? "today" : ""}">${d.label}</span>
          </div>`).join("")}
        </div>
      </div>

      <div class="card row between review-card" style="padding:14px 16px">
        <div class="col" style="gap:3px">
          <div class="row" style="gap:6px">
            ${svg("refresh", 14)}
            <span class="h2">今日复习</span>
            <span class="chip" style="padding:2px 8px;font-size:10px">FSRS</span>
          </div>
          <span class="muted-2" style="font-size:11.5px">${due ? `错词 ${S.wrong.length} · 到期 ${due} 词，答对自动推后` : "暂时没有到期的词，明天再来"}</span>
        </div>
        <button class="go-btn${due ? "" : " off"}" data-act="review" ${due ? "" : "disabled"}>${due ? "开始复习" : "无需复习"}</button>
      </div>

      <div class="row between">
        <span class="h3">错词本</span>
        <span class="link" data-act="review" role="button" tabindex="0">${S.wrong.length} 词 · 开始复习</span>
      </div>
      ${wrongWords.length ? wrongWords.slice(0, 5).map(w => `
        <div class="wrong" data-act="lookup" data-word="${w.word}">
          <div class="col" style="width:118px">
            <span class="w">${w.word}</span>
            <span class="p">${w.phonetic}</span>
          </div>
          <div class="grow d">${w.pos} ${esc(w.def)}</div>
        </div>`).join("")
      : `<div class="card" style="text-align:center;padding:26px 0;color:var(--text-3);font-size:12px">还没有错词，去背词页标记「不认识」试试</div>`}

      ${S.notebook.length ? `<div class="row between" style="margin-top:4px">
        <span class="h3">生词本（阅读收集）</span><span class="link" data-act="practice-note" role="button" tabindex="0">${S.notebook.length} 词 · 开始练习</span>
      </div>
      ${WORDS.filter(w => S.notebook.includes(w.word)).slice(0, 4).map(w => `
        <div class="wrong" data-act="lookup" data-word="${w.word}">
          <div class="col" style="width:118px"><span class="w">${w.word}</span><span class="p">${w.phonetic}</span></div>
          <div class="grow d">${w.pos} ${esc(w.def)}</div>
        </div>`).join("")}` : ""}

      <div class="row between" style="margin-top:4px">
        <span class="h3">数据</span>
        <span class="row" style="gap:14px">
          <span class="link" data-act="export-data" role="button" tabindex="0">导出备份</span>
          <span class="link" data-act="import-data" role="button" tabindex="0">导入备份</span>
        </span>
      </div>
      <div class="muted-2" style="font-size:11.5px;line-height:18px">
        进度只存在这台设备的浏览器里。换设备或清缓存前先导出，之后可以导回来。
      </div>
      <div class="row between" style="margin-top:6px">
        <span class="h3">危险操作</span>
        <span class="link danger" data-act="ask-reset" role="button" tabindex="0">清空全部进度</span>
      </div>

      <div class="row between" style="margin-top:10px">
        <span class="h3">关于</span>
      </div>
      <div class="muted-2" style="font-size:11.5px;line-height:18px">
        个人学习项目，仅供学习交流，不作商业用途。<br>
        单词例句：KyleBing/english-vocabulary · Tatoeba（CC-BY 2.0）· 原刊文章；词库与音标：ECDICT（MIT）。<br>
        阅读文章均为外刊公开内容摘要，版权归原媒体所有，正文可一键跳转原文。
      </div>
      <div style="height:6px"></div>
    </div>`;
}

/* ---------------- 页面：阅读（杂志感沉浸） ---------------- */
function renderRead() {
  const a = activeArticle;
  const sizeClass = ["", "large", "xlarge"][S.fontSize] || "";
  const cover = coverOf(a);
  const total = sentCount(a);
  const dur = a.minutes || Math.max(2, Math.round(total * 1.2));
  const aZh = zhTitle(a);
  const hits = countHits(a);
  const hitsLbl = hits > 999 ? "999+" : hits;
  const looked = LOOKED[a.id] || 0;
  const minsNow = Math.max(1, Math.round(readSecs / 60));
  const readTimes = S.read.filter(x => x === a.id).length;
  const nx = nextArticle(a);   // 同一来路列表里的下一篇
  /* 返回按钮写成具体去处，心里有数：返回时尚 / 返回发现 / 返回首页 */
  const fromLabel = (() => {
    const top = navStack[navStack.length - 1];
    if (!top) return "首页";
    if (top.name !== "discover") return "首页";
    return top.cat && top.cat !== "全部" && !top.q ? top.cat : "发现";
  })();

  let firstText = true;
  const paras = a.paras.map((p, i) => {
    /* 内嵌配图：整段插图 + 图注，不参与点读/显译 */
    if (p.img) {
      return `<figure class="para-img">
        <img src="${esc(p.img)}" alt="" loading="lazy" />
        ${p.cap ? `<figcaption>${esc(clean(p.cap))}</figcaption>` : ""}
      </figure>`;
    }
    const enText = clean(p.en);
    const cnText = clean(p.cn);
    if (!enText && !cnText) return "";          // 两端都空的段落不占位置（索引保持不变）
    const en = highlightEn(esc(enText));
    const isFirst = firstText; firstText = false;
    return `<div class="para${isFirst ? " first" : ""}" data-act="para-peek" data-pi="${i}">
      <div class="en ${sizeClass}">${en}<span class="para-tts" data-act="para-speak" data-pi="${i}" title="读这一句">${svg("speaker", 13)}</span></div>
      ${cnText ? `<div class="cn">${esc(cnText)}</div>` : ""}
    </div>`;
  }).join("");

  return `
    ${statusbar()}
    <div class="read-top">
      <span class="icon-btn" data-act="go-back" role="button" tabindex="0" aria-label="返回上一页">${svg("back", 18)}</span>
      <div class="center">
        <span>双语阅读</span>
        <span class="src">${esc(clean(a.cat))} · ${esc(clean(a.source))}</span>
      </div>
      <span class="icon-btn" data-act="toggle-cn" role="button" tabindex="0" style="color:${S.showCn ? 'var(--brand)' : 'var(--text-2)'}" title="译" aria-label="${S.showCn ? "隐藏中文对照" : "显示中文对照"}" aria-pressed="${S.showCn}">${svg("globe", 18)}</span>
    </div>
    <div class="read-progress"><div class="bar" id="read-bar"></div></div>

    <div class="view read-scroll ${S.showCn ? "" : "no-cn"}${S.readTheme === "night" ? " rt-night" : S.readTheme === "paper" ? " rt-paper" : ""}" id="read-scroll">
      <div class="read-hero">
        <div class="pills">
          <span class="chip">${esc(clean(a.cat))}</span>
          <span class="chip green">四级难度</span>
          <span class="chip">${dur} 分钟</span>
        </div>
        <h1 class="title">${esc(clean(a.title))}</h1>
        ${aZh ? `<div class="title-zh">${esc(aZh)}</div>` : ""}
        <div class="byline">
          <span>${esc(srcName(a))}</span>
          ${a.date ? `<span class="dot"></span><span>${esc(fmtWhen(a.date))}</span>` : ""}
          <span class="dot"></span><span>${total} 句 · ${hitsLbl} 个生词</span>
        </div>
        ${a.url ? `<a class="read-source-link" href="${esc(a.url)}" target="_blank" rel="noopener">查看原文 →</a>` : ""}
        <div class="read-cover${cover ? " has-img" : ""}" style="${cover ? `background-image:url('${esc(cover)}')` : `background:${esc(a.gradient)}`}">
          <span class="mark">${esc(srcName(a))}</span>
          <div class="play" data-act="read-all">${svg("speaker", 18)}</div>
        </div>
        ${S.showCn ? "" : `<div class="peek-hint">${svg("tap", 14)} 轻触英文看译文 · 点生词查释义</div>`}
      </div>

      <div class="read-body" id="read-body">${paras}</div>

      <div class="read-finish">
        <div class="ico">${svg("check", 22)}</div>
        ${S.read.includes(a.id)
          ? `<h3>已读完 · 累计第 ${readTimes} 次</h3>`
          : `<h3>读完了？打个卡</h3>`}
        <div class="stat-chips">
          <span class="st-chip"><b>${dur}</b><i>分钟难度</i></span>
          <span class="st-chip"><b>${hitsLbl}</b><i>个生词</i></span>
          <span class="st-chip"><b>${looked}</b><i>次查询</i></span>
          <span class="st-chip"><b>${minsNow}</b><i>分钟读过</i></span>
        </div>
        ${S.read.includes(a.id)
          ? `<p>这篇加入了你的阅读历史，可以在「我的」里再次回顾。</p>`
          : `<p>标记为已读后会加入你的阅读日历，连续打卡有积分加成。</p>
          <button class="btn" data-act="punch-in">${svg("check", 16)} 打卡 · 今日读毕</button>`}
        <div class="finish-nav">
          <button data-act="go-back">${svg("back", 15)} 返回${fromLabel}</button>
          ${nx ? `<button data-act="next-article">下一篇 ${svg("arrow", 14)}</button>`
               : `<button disabled>本分类已读完</button>`}
        </div>
      </div>
    </div>

    <div class="read-hud" id="read-hud">0% · 剩余约 ${dur} 分钟</div>

    <div class="fab-bar">
      <button data-act="font" class="${S.fontSize > 0 ? 'active' : ''}" title="字号" aria-label="切换字号（当前${["标准", "大", "特大"][S.fontSize] || "标准"}）" aria-pressed="${S.fontSize > 0}">${svg("font", 18)}</button>
      <button data-act="toggle-cn" class="${S.showCn ? 'active' : ''}" title="译" aria-label="${S.showCn ? "隐藏中文对照" : "显示中文对照"}" aria-pressed="${S.showCn}">${svg("globe", 18)}</button>
      <button data-act="read-theme" class="${S.readTheme ? 'active' : ''}" title="护眼" aria-label="切换护眼/夜间阅读底色">${svg(S.readTheme === "night" ? "moon" : "sun", 18)}</button>
      <button data-act="book" title="生词本" aria-label="打开生词本">${svg("bookmark", 18)}</button>
      <button data-act="read-all" title="朗读" aria-label="朗读全文">${svg("speaker", 18)}</button>
    </div>
  `;
}

/* 阅读进度条 + HUD：基于 #read-scroll 容器的滚动位置 */
function updateReadProgress() {
  const cont = $("#read-scroll");
  const bar = $("#read-bar");
  const body = $("#read-body");
  if (!cont || !bar || !body) return;
  const cRect = cont.getBoundingClientRect();
  const bRect = body.getBoundingClientRect();
  const total = body.scrollHeight;
  const line = cRect.top + cont.clientHeight * 0.6;
  const passed = line - bRect.top;
  const pct = total > 0 ? Math.min(Math.max(passed, 0), total) / total * 100 : 0;
  bar.style.width = pct + "%";

  const hud = $("#read-hud");
  const a = activeArticle;
  if (hud && a) {
    const dur = a.minutes || Math.max(2, Math.round(a.paras.length * 1.2));
    const remain = Math.max(0, Math.ceil(dur * (1 - pct / 100)));
    hud.textContent = `${Math.round(pct)}% · 剩余约 ${remain} 分钟`;
  }
}

/* ---------------- 数据备份：导出 / 导入 ----------------
 * 进度只活在 localStorage 里，清缓存或换设备就没了。一个每天投入 20 分钟的产品
 * 必须给得出退路，所以这里提供 JSON 导出与导入还原。 */
function exportData() {
  const payload = { app: "wordlens", version: 1, at: new Date().toISOString(), state: S };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `wordlens-进度备份-${todayKey()}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast("已导出进度备份");
}
function importData(file) {
  const r = new FileReader();
  r.onload = () => {
    try {
      const j = JSON.parse(String(r.result));
      const st = j && j.state ? j.state : j;
      if (!st || typeof st !== "object") throw new Error("格式不对");
      S = Object.assign({}, defaultState, st);
      delete S.streak; delete S.minutes; delete S.tab;
      S.studyDays = Array.isArray(S.studyDays) ? S.studyDays.slice() : [];
      S.minsByDay = (S.minsByDay && typeof S.minsByDay === "object") ? Object.assign({}, S.minsByDay) : {};
      if (!S.daily || typeof S.daily !== "object") S.daily = { date: "", count: 0 };
      if (!S.review || typeof S.review !== "object") S.review = {};
      save(); setQueue(null, ""); render();
      toast(`已恢复备份 · 学过 ${S.studied.length} 词`);
    } catch (e) {
      toast("这个文件读不出来，请确认是导出的备份");
    }
  };
  r.readAsText(file);
}

/* ---------------- 清空进度确认浮层 ----------------
 * 「清空进度」一键不可逆，之前全项目一处确认都没有。这里顺手把导出也放进确认层：
 * 让用户先备份再决定，比事后补救有用。 */
function resetSheet() {
  return `
    <div class="sheet-mask" data-act="close-sheet"></div>
    <div class="sheet">
      <div class="grip"></div>
      <div class="row" style="gap:10px">
        <span style="width:34px;height:34px;border-radius:17px;background:var(--red-bg);color:var(--red);display:flex;align-items:center;justify-content:center;flex:none">${svg("trash", 17)}</span>
        <div class="col" style="gap:2px">
          <div class="h2">清空全部学习进度？</div>
          <span class="muted-2" style="font-size:11.5px">已学 ${S.studied.length} 词 · 错词 ${S.wrong.length} · 读完 ${S.finished.length} 篇</span>
        </div>
      </div>
      <div class="muted" style="font-size:12.5px;line-height:20px">
        这会抹掉已学词、错词本、生词本、阅读打卡与 FSRS 复习计划，且无法撤销。主题设置会保留。
      </div>
      <div class="sheet-btns">
        <button class="answer-btn no" data-act="export-data" style="flex:1">${svg("download", 15)} 先导出备份</button>
        <button class="answer-btn yes" data-act="import-data" style="flex:1">${svg("upload", 15)} 导入备份</button>
      </div>
      <div class="sheet-btns">
        <button class="ghost-btn" data-act="close-sheet" style="flex:1">取消</button>
        <button class="danger-btn" data-act="reset" style="flex:1">确认清空</button>
      </div>
    </div>`;
}

/* ---------------- 查词浮层 ---------------- */
function renderSheet(word) {
  const w = WORDS.find(x => x.word === word);
  if (!w) return "";
  return `
    <div class="sheet-mask" data-act="close-sheet"></div>
    <div class="sheet">
      <div class="grip"></div>
      <div class="row between">
        <div class="col" style="gap:3px">
          <div class="w">${w.word}</div>
          <span class="ph">${w.phonetic}</span>
        </div>
        <span class="icon-btn solid" data-act="speak" data-word="${w.word}" style="width:36px;height:36px;color:#fff">${svg("speaker", 17)}</span>
      </div>
      <div class="df">${w.pos} ${esc(w.def)}</div>
      ${w.literal ? `<div class="rt">${esc(w.literal)}</div>` : ""}
      ${(w.example || w.exampleCn) ? `<div class="example-box">
        <span class="chip" style="align-self:flex-start">${esc(w.source || '')}</span>
        ${w.example ? `<div class="en">${hlWord(w.example, w.word)}</div>` : ''}
        ${w.exampleCn ? `<div class="cn">${esc(w.exampleCn)}</div>` : ''}
      </div>` : ""}
      <div class="sheet-btns">
        <button class="a" data-act="add-note" data-word="${w.word}">${S.notebook.includes(w.word) ? "已在生词本" : "加入生词本"}</button>
        <button class="b" data-act="add-review" data-word="${w.word}">加入复习</button>
        <button class="c" data-act="mark-known" data-word="${w.word}" aria-pressed="${S.known.includes(w.word)}">${S.known.includes(w.word) ? "已认识 ✓" : "标为已认识"}</button>
      </div>
    </div>`;
}

/* 排序浮层：发现页「筛选」按钮的真实去处（之前只弹一句 toast） */
function renderSortSheet() {
  return `
    <div class="sheet-mask" data-act="close-sheet"></div>
    <div class="sheet" role="dialog" aria-label="文章排序">
      <div class="grip"></div>
      <div class="row between">
        <div class="col" style="gap:3px">
          <div class="w" style="font-family:var(--font-cn);font-size:17px">文章排序</div>
          <span class="ph">影响分类列表与「全部文章」的顺序</span>
        </div>
        <span class="icon-btn" data-act="close-sheet" role="button" tabindex="0" aria-label="关闭排序设置">${svg("close", 16)}</span>
      </div>
      <div class="col" style="gap:8px">
        ${Object.keys(SORTS).map(k => `<button class="sort-opt${sortBy === k ? " on" : ""}" data-act="set-sort" data-sort="${k}" aria-pressed="${sortBy === k}">
          <span>${SORTS[k]}</span>${sortBy === k ? svg("check", 16) : ""}
        </button>`).join("")}
      </div>
    </div>`;
}

/* ---------------- 底部导航 ---------------- */
const TABS = [["home", "首页", "home"], ["study", "背词", "cards"], ["discover", "发现", "compass"], ["me", "我的", "user"]];
const tabbar = () => {
  const cur = ["home", "study", "discover", "me"].includes(view.name) ? view.name
    : (view.name === "read" ? "home" : "home");
  return `<div class="tabbar"><div class="pill">
    ${TABS.map(([k, label, ic]) => `<button data-tab="${k}" class="${k === cur ? "on" : ""}">${svg(ic, 18)}<span>${label}</span></button>`).join("")}
  </div></div>`;
};

/* ---------------- 主渲染 ---------------- */
function render() {
  document.documentElement.setAttribute("data-theme", S.theme);
  /* 浮层（查词卡 / 排序面板）挂在 .phone 上、不在 #screen 里，
     只重写 #screen.innerHTML 是清不掉它们的 —— 必须在每次主渲染开头统一收掉。
     否则在阅读页查完词再点返回：页面已经回到列表，单词卡还盖在底部。 */
  $$(".phone > .sheet, .phone > .sheet-mask").forEach(n => n.remove());
  const screen = $("#screen");
  let body = "";
  if (view.name === "home") body = renderHome();
  else if (view.name === "study") body = renderStudy();
  else if (view.name === "probe") body = renderProbe();
  else if (view.name === "discover") body = renderDiscover();
  else if (view.name === "me") body = renderMe();
  else if (view.name === "read") body = renderRead();
  screen.innerHTML = body + (view.name === "read" ? "" : tabbar());

  /* 阅读主题只染阅读页：通过 .screen 上的 rt-* 类控制 */
  const themeCls = view.name === "read"
    ? `rt-${S.readTheme || "default"}`
    : "";
  screen.className = "screen " + themeCls;

  if (view.name === "study") fixFlipHeight();
  if (view.name === "read") {
    if (!readTimer) readTimer = setInterval(() => { readSecs++; }, 1000);
    const cont = $("#read-scroll");
    if (cont) {
      cont.addEventListener("scroll", updateReadProgress, { passive: true });
      requestAnimationFrame(updateReadProgress);
    }
  } else {
    if (readTimer) { clearInterval(readTimer); readTimer = null; }
    window.removeEventListener("scroll", updateReadProgress);
  }

  if (view.name === "discover") {
    const q = $("#q");
    if (q) {
      q.addEventListener("input", e => {
        searchTerm = e.target.value; shown = PAGE; render();
        const n = $("#q"); if (n) { n.focus(); n.setSelectionRange(n.value.length, n.value.length); }
      });
    }
  }
}

function fixFlipHeight() {
  const flip = $("#flip");
  if (!flip) return;
  /* 背词页 = 固定卡片框布局：高度全部交给 flex 撑满中间区域，
     翻转后卡片被卡在框内，背面内容在卡内滚动（.face.back 自带 overflow） */
  flip.style.height = "";
  const face = flipped ? $(".face.back", flip) : $(".face:not(.back)", flip);
  if (face) face.scrollTop = 0;
}

/* ---------------- 事件 ---------------- */
document.addEventListener("click", e => {
  const t = e.target.closest("[data-act],[data-tab],[data-article],[data-cat]");
  if (!t) return;

  if (t.dataset.tab) {
    view = { name: t.dataset.tab };
    resetNav();                 // 点底部 tab = 根级跳转
    if (t.dataset.tab === "study") { flipped = false; answered = null; }
    render(); return;
  }

  if (t.dataset.article) {
    pushNav({ src: t.dataset.article });   // 记住来路：返回时回到同一张列表、同一位置
    activeArticle = ARTICLES.find(a => a.id === t.dataset.article);
    readSecs = 0;             // 进入新文章，计时清零
    LOOKED[activeArticle.id] = 0;  // 本篇查询清零
    view = { name: "read" };
    render(); return;
  }

  if (t.dataset.cat) { catFilter = t.dataset.cat; shown = PAGE; render(); return; }

  switch (t.dataset.act) {
    case "start-study":
      resetNav();
      /* 不知道用户水平就让他从 the / and 背起，是最浪费的开场 —— 首次先走摸底 */
      if (!S.probe || !S.probe.done) { probePicked = new Set(); view = { name: "probe" }; render(); break; }
      view = { name: "study" }; flipped = false; answered = null; render(); break;
    case "probe-pick": {
      const w = t.dataset.word;
      if (probePicked.has(w)) probePicked.delete(w); else probePicked.add(w);
      render(); break;
    }
    case "probe-reset":
      probePicked = new Set(); render(); break;
    case "probe-skip":
      S.probe = { done: true, at: todayKey(), known: [], startIdx: 0, skipped: true };
      save(); resetNav();
      view = { name: "study" }; flipped = false; answered = null; render();
      toast("已从最常用的词开始"); break;
    case "probe-done": {
      const picked = [...probePicked];
      /* 勾出来的词直接进熟词表：文章里也不再高亮，一举两得 */
      for (const w of picked) if (!S.known.includes(w)) S.known.push(w);
      const si = probeStartOf(probePicked);
      S.probe = { done: true, at: todayKey(), known: picked, startIdx: si, skipped: false };
      save(); resetNav();
      view = { name: "study" }; flipped = false; answered = null; render();
      toast(si > 0 ? `起点已定位 · 前面 ${si} 个已会词跳过` : "起点已定位 · 从最常用的词开始");
      break;
    }
    case "probe-again":
      probePicked = new Set((S.probe && S.probe.known) || []);
      resetNav(); view = { name: "probe" }; render(); break;
    case "quick-sieve":
      /* 中学已学词快筛：一条独立队列，点「认识」直接过，不计入今日新词额度 */
      resetNav();
      setQueue(BASIC_WORDS, "基础词快筛", true);
      view = { name: "study" }; render();
      toast(`筛掉 ${BASIC_WORDS.length} 个中学已会词`); break;
    case "go-home":
      resetNav(); view = { name: "home" }; render(); break;
    case "go-discover":
      pushNav(); view = { name: "discover" }; render(); break;
    case "go-back":
      /* 回到进来时的那一页（发现页分类视图 / 首页推荐），栈空才回首页 */
      if (!navBack()) { resetNav(); view = { name: "home" }; render(); }
      break;
    case "next-article": {
      const nx = activeArticle && nextArticle(activeArticle);
      if (!nx) { toast("已经是这个分类的最后一篇了"); break; }
      activeArticle = nx; readSecs = 0; LOOKED[nx.id] = 0;
      view = { name: "read" }; render();
      toast(`下一篇 · ${nx.cat}｜${(nx.titleZh || nx.title).slice(0, 14)}…`);
      break;
    }
    case "theme":
      S.theme = S.theme === "dark" ? "light" : "dark"; save(); render();
      toast(S.theme === "dark" ? "已切换到深色模式" : "已切换到浅色模式"); break;
    case "filter":
      /* 打开真实的排序面板（原来只弹一句「点击上方胶囊切换」的 toast） */
      $(".phone").insertAdjacentHTML("beforeend", renderSortSheet());
      break;
    case "set-sort": {
      sortBy = SORTS[t.dataset.sort] ? t.dataset.sort : "new";
      shown = PAGE;                        // 换了排序就回到第一页
      $$(".sheet, .sheet-mask").forEach(n => n.remove());
      render();
      const sv = $("#screen .view"); if (sv) sv.scrollTop = 0;
      toast(`已按「${SORTS[sortBy]}」排序`);
      break;
    }
    case "speak":
      e.stopPropagation(); speak(t.dataset.word); break;
    case "flip":
      if (e.target.closest("[data-act='speak']")) break;
      toggleFlip(); break;
    case "mark": {
      const w = curWord().word;
      const i = S.notebook.indexOf(w);
      if (i >= 0) { S.notebook.splice(i, 1); toast("已移出生词本"); }
      else { S.notebook.push(w); toast("已加入生词本"); }
      save(); render(); break;
    }
    case "answer": {
      if (answered) break;                // 已答过的卡不再重复计数
      rollDay();
      const w = curWord().word;
      const v = t.dataset.v;
      if (!S.studied.includes(w)) { S.studied.push(w); if (!qNoCount) S.daily.count++; }
      /* 「认识」= 记入已掌握，文章里不再高亮；答错/模糊则撤销这个标记 */
      const ki = S.known.indexOf(w);
      if (v === "yes") {
        if (ki < 0) S.known.push(w);
        const i = S.wrong.indexOf(w);
        if (i >= 0) S.wrong.splice(i, 1);
      } else {
        if (ki >= 0) S.known.splice(ki, 1);
        if (!S.wrong.includes(w)) S.wrong.push(w);
      }
      /* 艾宾浩斯：新词只在学习时调度；复习队列里的词按本次结果重排下次时间 */
      scheduleReview(w, v);
      markStudyDay();
      save();
      if (v === "yes") {
        /* 认识：直接走下一个，不必翻面 */
        flipped = false; answered = null;
        if (advanceQueue()) toast("已标记掌握，文中不再高亮");
      } else {
        /* 不认识 / 模糊：先翻面看答案（释义 + 例句 + 拆解），读完再「继续」 */
        answered = v;
        flipped = true;
        render();
        /* render 重建的 DOM 不会播放 transition：先把类名摘掉，下一帧再挂回去，
           这样翻面动画照样能跑（状态立刻是 flipped=true，逻辑与断言不受影响） */
        const flip = $("#flip");
        if (flip) {
          flip.classList.remove("flipped");
          requestAnimationFrame(() => {
            flip.classList.add("flipped");
            const back = $(".face.back", flip);
            if (back) back.scrollTop = 0;
          });
        }
        toast(v === "no" ? "已加入错词本 · 看完答案再继续" : "有点模糊 · 看完答案再继续");
      }
      break;
    }
    case "next":
      /* 错卡的「继续」：答案看完了，走下一个 */
      flipped = false; answered = null;
      advanceQueue();
      break;
    case "toggle-cn":
      S.showCn = !S.showCn; save(); render(); toast(S.showCn ? "显示中文对照" : "隐藏中文对照"); break;
    case "font":
      S.fontSize = (S.fontSize + 1) % 3; save(); render(); toast(["标准字号", "大字号", "特大字号"][S.fontSize]); break;
    case "read-theme": {
      S.readTheme = S.readTheme === "" ? "paper" : S.readTheme === "paper" ? "night" : "";
      save(); render();
      toast(S.readTheme === "paper" ? "纸张护眼底色" : S.readTheme === "night" ? "夜间阅读模式" : "默认亮色");
      break;
    }
    case "para-peek": {
      /* 单句点读：只在隐藏模式下生效（点英文看该句译文） */
      if (!S.showCn) t.classList.toggle("peek");
      break;
    }
    case "para-speak": {
      e.stopPropagation();
      const a2 = activeArticle; const i = +t.dataset.pi;
      const sent = a2 && a2.paras[i] && a2.paras[i].en;
      if (sent) {
        speak(sent);
        t.closest(".para")?.classList.add("playing");
        setTimeout(() => t.closest(".para")?.classList.remove("playing"), 1200);
        const n = a2.paras.slice(0, i + 1).filter(x => x.en).length;
        toast(`朗读第 ${n}/${sentCount(a2)} 句`);
      }
      break;
    }
    case "cat-more": {
      catFilter = t.dataset.cat; shown = PAGE; render();
      const v = $("#screen .view"); if (v) v.scrollTop = 0;
      break;
    }
    case "more":
      shown += PAGE; render(); break;
    case "read-all":
      speak(activeArticle.paras.filter(p => p.en).map(p => p.en).join(" ")); toast("开始朗读全文"); break;
    case "book":
      resetNav(); view = { name: "me" }; render(); break;
    case "punch-in": {
      const id = activeArticle && activeArticle.id;
      if (id) {
        rollDay();
        /* 真实阅读时长：按天累计，供「我的 · 近 7 天」使用（不再是写死的数组） */
        const mins = Math.max(1, Math.round(readSecs / 60));
        S.read.push(id);
        if (!S.finished.includes(id)) S.finished.push(id);
        const k = todayKey();
        S.minsByDay[k] = (S.minsByDay[k] || 0) + mins;
        markStudyDay();
        save(); render();
        toast(`打卡成功 · 本次阅读 ${mins} 分钟`);
      }
      break;
    }
    case "mark-known": {
      const w = t.dataset.word;
      const i = S.known.indexOf(w);
      if (i >= 0) { S.known.splice(i, 1); toast(`已取消「${w}」的已认识标记`); }
      else { S.known.push(w); toast(`「${w}」已标记为认识，文中不再高亮`); }
      save(); render();
      break;
    }
    case "lookup": {
      const word = t.dataset.word;
      if (activeArticle && view.name === "read") {
        LOOKED[activeArticle.id] = (LOOKED[activeArticle.id] || 0) + 1;
        /* 同步更新顶部的「已查次数」chip，不触发整页重渲染（避免滚动丢失） */
        const sc = $(".read-finish .stat-chips .st-chip:nth-child(3) b");
        if (sc) sc.textContent = LOOKED[activeArticle.id];
      }
      $(".phone").insertAdjacentHTML("beforeend", renderSheet(word));
      break;
    }
    case "close-sheet":
      $$(".sheet, .sheet-mask").forEach(n => n.remove()); break;
    case "add-note": {
      const w = t.dataset.word;
      if (!S.notebook.includes(w)) { S.notebook.push(w); toast(`「${w}」已加入生词本`); }
      else toast("已经在生词本里了");
      save(); $$(".sheet, .sheet-mask").forEach(n => n.remove()); render(); break;
    }
    case "add-review": {
      const w = t.dataset.word;
      if (!S.wrong.includes(w)) S.wrong.push(w);
      save(); $$(".sheet, .sheet-mask").forEach(n => n.remove());
      toast(`「${w}」已加入复习队列`); render(); break;
    }
    /* 复习：错词 ∪ 今天到期的词。以前这里只是弹个 toast 然后进学习页，
       而学习页压根不看 S.wrong——现在队列是真的换了。 */
    case "review": {
      const q = reviewQueue();
      if (!q.length) { toast("今天没有待复习的词"); break; }
      setQueue(q, `复习 · ${S.wrong.length ? "错词 " + S.wrong.length + " · " : ""}到期 ${q.length} 词`);
      resetNav();
      view = { name: "study" };
      render();
      break;
    }
    case "practice-note": {
      const q = wordsOf(S.notebook);
      if (!q.length) { toast("生词本还是空的"); break; }
      setQueue(q, `生词本练习 · ${q.length} 词`);
      resetNav();
      view = { name: "study" };
      render();
      break;
    }
    case "quit-queue":
      setQueue(null, "");
      render();
      toast("已退出复习队列");
      break;
    case "ask-reset":
      $(".phone").insertAdjacentHTML("beforeend", resetSheet());
      break;
    case "export-data":
      exportData(); break;
    case "import-data":
      $("#file-in").click(); break;
    case "reset": {
      resetNav();
      /* 深拷贝重置：浅拷贝会让新状态继续和 defaultState 共享 daily / studyDays 等引用 */
      const keepTheme = S.theme;
      S = JSON.parse(JSON.stringify(defaultState));
      S.theme = keepTheme || "light";      // 主题是外观偏好，不算学习进度，别一起清掉
      save(); setQueue(null, ""); render(); toast("进度已重置");
      break;
    }
  }
});

/* 导入备份：隐藏的 file input 选中文件后读回来 */
{
  const fi = $("#file-in");
  if (fi) fi.addEventListener("change", () => {
    const f = fi.files && fi.files[0];
    if (f) importData(f);
    fi.value = "";                     // 同一个文件再选一次也要能触发 change
  });
}

/* 无障碍：用 <span> 承载的控件加了 role="button" + tabindex，需要补上键盘触发
   （原生 <button> 自己会处理 Enter/Space，这里跳过，避免重复触发） */
document.addEventListener("keydown", e => {
  if (e.key !== "Enter" && e.key !== " ") return;
  const el = e.target;
  if (!el || !el.matches || el.tagName === "BUTTON") return;
  if (!el.matches('[role="button"]')) return;
  e.preventDefault();
  el.click();
});

/* 键盘：空格翻卡（答错看答案时，空格 = 继续），1/2/3 作答 */
document.addEventListener("keydown", e => {
  if (view.name !== "study") return;
  if (e.code === "Space") {
    e.preventDefault();
    if (answered) document.querySelector('[data-act="next"]')?.click();
    else toggleFlip();
  }
  if (["Digit1", "Digit2", "Digit3"].includes(e.code)) {
    if (answered) return;               // 已作答的卡只剩「继续」，数字键不再触发
    const map = { Digit1: "no", Digit2: "fuzzy", Digit3: "yes" };
    document.querySelector(`[data-act="answer"][data-v="${map[e.code]}"]`)?.click();
  }
});

/* 手机上左右滑动换词：拇指滑一下比找按钮自然得多，也顺手把「点击」从唯一操作里解放出来。
 * 判定门槛 44px，且横向位移必须明显大于纵向 —— 否则会和背面内容的纵向滚动抢手势。 */
let sx = 0, sy = 0, st = 0;
document.addEventListener("touchstart", e => {
  if (view.name !== "study" || e.touches.length !== 1) return;
  sx = e.touches[0].clientX; sy = e.touches[0].clientY; st = Date.now();
}, { passive: true });
document.addEventListener("touchend", e => {
  if (view.name !== "study") return;
  const t = e.changedTouches && e.changedTouches[0];
  if (!t) return;
  const dx = t.clientX - sx, dy = t.clientY - sy;
  if (Date.now() - st > 700) return;                  // 慢速拖拽不算滑动
  if (Math.abs(dx) < 44 || Math.abs(dx) < Math.abs(dy) * 1.4) return;
  if (dx < 0) advanceQueue(); else prevWord();
}, { passive: true });

/* URL 参数：方便预览/截图直接定位到指定页面 + 阅读主题
   ?v=discover|read&a=0&cat=足球&theme=paper|night|default&end=1（阅读页直接到底部） */
(function bootFromQuery(){
  if (typeof location === "undefined" || typeof URLSearchParams === "undefined") return;
  try {
    const p = new URLSearchParams(location.search);
    const v = p.get("v");
    if (v === "discover") view = { name: "discover" };
    else if (v === "read") {
      const idx = +(p.get("a") || 0);
      activeArticle = ARTICLES[idx] || ARTICLES[0];
      view = { name: "read" };
    } else if (v === "me") view = { name: "me" };
    else if (v === "study") view = { name: "study" };
    /* ?v=probe：直达摸底自测页（预览/截图用） */
    else if (v === "probe") { probePicked = new Set(); view = { name: "probe" }; }
    /* ?v=study&w=<word>：跳到指定单词，用来验证字段最全的卡片（释义+词根+例句+助记）排版。
     * 注意 qPos 是「队列内下标」而新词队列从 startIdx 起，要减掉起点偏移才对得上。 */
    const wt = p.get("w");
    if (v === "study" && wt) {
      const i = WORDS.findIndex(x => String(x.word).toLowerCase() === wt.toLowerCase());
      if (i >= 0) qPos = Math.max(0, i - startIdx());
    }
    /* 背词页直接以翻面状态打开（预览/截图验证背面布局用） */
    if (v === "study" && p.get("flip")) requestAnimationFrame(() => { flipped = true; render(); });
    const c = p.get("cat");
    if (c && CATEGORIES.includes(c)) catFilter = c;
    const t = p.get("theme");
    if (t === "paper" || t === "night") S.readTheme = t;
    else if (t === "default") S.readTheme = "";
    /* 深浅色也允许从链接带入（分享/预览暗色界面不用先点一下切换） */
    if (t === "dark" || t === "light") S.theme = t;
    if (p.get("end")) requestAnimationFrame(() => {
      const el = $("#screen .view");
      if (el) el.scrollTop = el.scrollHeight;
    });
  } catch (e) { /* 非浏览器环境忽略 */ }
})();

render();

/* 离线可用 / 可安装：manifest 声明了 standalone，之前却没有 Service Worker，
   离线打开会白屏。file:// 与沙箱环境自动跳过，不影响本地直接打开。 */
if (typeof navigator !== "undefined" && navigator.serviceWorker
  && typeof location !== "undefined" && /^https?:$/.test(location.protocol)
  && typeof window !== "undefined" && window.addEventListener) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => { });
  });
}

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
  studied: [],      // 旧版背词数据：保留以兼容历史备份，不再参与运行逻辑
  wrong: [],        // 旧版错词数据：保留以兼容历史备份，不再参与运行逻辑
  notebook: [],     // 生词本（阅读加入）
  showCn: false,
  fontSize: 0,
  readTheme: "",     // 阅读页护眼主题："" | "paper" | "night"
  read: [],         // 累计读过（含重复）
  finished: [],     // 已打卡的去重列表
  known: [],        // 标记「认识」的词：文章里不再高亮
  daily: { date: "", count: 0 },   // 旧版背词统计：保留以兼容历史备份
  studyDays: [],    // 有学习行为的日期 YYYY-MM-DD，用于算连续天数
  minsByDay: {},    // { YYYY-MM-DD: 分钟 }，阅读时长按天累计
  fsrs: {},         // 旧版 FSRS 数据：保留以兼容历史备份，不再参与运行逻辑
  lastRead: { id: "", y: 0, pct: 0, at: 0 },  // 「上次读到」：文章 id + 滚动位置，发现页可直达续读
  articleFeedback: {},  // 完成页反馈：{ [文章id]: { diff: easy|ok|hard, rate: up|mid|down, at } }
  hintSeen: false,  // 阅读页操作提示只出现一次
  backupHintAt: 0,  // 上次「记得备份」提示时间（7 天节流）
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

/* ---------------- 阅读统计 ----------------
 * 阅读时长、读完篇数和连续阅读天数都从本地记录计算。 */
const EXAM_DATE = "2026-12-19";        // 下一次四级笔试（12 月第三个周六）
const ymd = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
/* 时区：四级是国内考试，「今天」属于哪个日期、问候语的小时、考试倒计时，
 * 一律按北京时间（Asia/Shanghai）取，不随宿主时区漂移——否则海外/跨时区设备
 * 会在错的日子里归零进度、问错好、差一天倒计时。 */
const TZ = "Asia/Shanghai";
const ymdTZ = d => new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" }).format(d);
const todayKey = () => ymdTZ(new Date());
const shanghaiHour = () => +new Intl.DateTimeFormat("en-CA", { timeZone: TZ, hour: "numeric", hour12: false }).format(new Date());

/* 记录今天有阅读行为（读完打卡） */
function markStudyDay() {
  const k = todayKey();
  if (!S.studyDays.includes(k)) S.studyDays.push(k);
  if (S.studyDays.length > 400) S.studyDays = S.studyDays.slice(-400);
  /* 备份提醒：阅读第 2 天起提示一次，7 天不重复——
     进度只存在本地浏览器，这是唯一的数据安全网（不做账号/云同步） */
  if (S.studyDays.length >= 2 &&
      Date.now() - (S.backupHintAt || 0) > 7 * 86400000) {
    S.backupHintAt = Date.now(); save();
    setTimeout(() => toast("进度只存在这台浏览器 · 记得在「我的」里备份"), 1200);
  }
}

/* 连续学习天数：从今天（今天还没学则从昨天）往前数连续有记录的天数（按北京日期） */
function streakDays() {
  const set = new Set(S.studyDays || []);
  const d = new Date();
  if (!set.has(ymdTZ(d))) d.setDate(d.getDate() - 1);
  let n = 0;
  while (set.has(ymdTZ(d))) { n++; d.setDate(d.getDate() - 1); }
  return n;
}

/* 考试日锚定北京时间当天零点（+08:00），对「真实的现在」求差——与宿主时区无关 */
const daysToExam = () => Math.max(0, Math.ceil((Date.parse(`${EXAM_DATE}T00:00:00+08:00`) - Date.now()) / 86400000));

/* 近 7 天（含今天）每天的学习分钟数，没有记录的当天补 0 */
function last7() {
  const out = [];
  const d = new Date();
  for (let i = 6; i >= 0; i--) {
    const x = new Date(d); x.setDate(d.getDate() - i);
    const k = ymdTZ(x);
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

/* 点词翻译层（data-tapdict.js，构建产物）：全库高频词的释义 + 猜不回的词形还原表。
 * 学习词不在 TAPDICT 里（走 WORDS 完整查词卡），但 TAP_REVERSE 的原形可以指向学习词。 */
const TAP = typeof TAPDICT === "undefined" ? null : TAPDICT;
const TAPR = typeof TAP_REVERSE === "undefined" ? null : TAP_REVERSE;

/* 词形还原候选（剥后缀）。⚠️ 与 tools/build-tapdict.mjs 的 lemmaCands() 逐字对应：
 * 构建期按「规则还原得到」跳过反向表条目，两处不同步会漏词或错配 */
function lemmaCands(t) {
  const out = new Set();
  const add = x => { if (x && x.length > 1) out.add(x); };
  const dd = x => { const y = x.replace(/(.)\1$/, "$1"); add(y); return y; };
  if (t.endsWith("'s")) add(t.slice(0, -2));
  if (/ies$/.test(t) && t.length > 4) add(t.slice(0, -3) + "y");
  if (/(ch|sh|x|z|s)es$/.test(t) && t.length > 5) add(t.slice(0, -2));
  if (/ied$/.test(t) && t.length > 5) add(t.slice(0, -3) + "y");
  if (/ed$/.test(t) && t.length > 4) { add(t.slice(0, -1)); add(t.slice(0, -2)); dd(t.slice(0, -2)); dd(t.slice(0, -1)); }
  if (/ing$/.test(t) && t.length > 5) { add(t.slice(0, -3)); add(t.slice(0, -3) + "e"); dd(t.slice(0, -3)); }
  if (/s$/.test(t) && t.length > 3) add(t.slice(0, -1));
  out.delete(t);
  return [...out];
}

const kwOf = w => {           // 词在 KEYWORDS（学习词）里则返回词本身，否则 null
  let node = KW_TRIE;
  for (let i = 0; i < w.length; i++) { node = node[w[i]]; if (!node) return null; }
  return node.$ || null;
};

/* 任意 token → 查词目标：三段式 {学习词 kw} / {点词层 w} / null（专有名词等不包）。
 * 顺序固定：学习词 Trie → 反向词形表 → 后缀规则还原出的学习词 → 点词层直接命中 → 规则还原的点词层词。
 * 还原出的学习词必须先于点词层直接命中：performing 在 ECDICT 有独立词条（n.表演），
 * 但用户点它要回到的是学习词 perform 的完整卡。 */
function resolveToken(low) {
  const k = kwOf(low);
  if (k) return { kw: k };
  if (TAPR && TAPR[low]) {
    const l = TAPR[low];
    return kwOf(l) ? { kw: l } : { w: l };
  }
  const cands = lemmaCands(low);
  for (const c of cands) { if (kwOf(c)) return { kw: c }; }
  if (TAP && TAP[low]) return { w: low };
  for (const c of cands) { if (TAP && TAP[c]) return { w: c }; }
  return null;
}

/* 在英文段落里把可查词的 token 包成 span（data-act="lookup"）：
 * - 词库词（含变形，如 performing→perform）：紫色 .kw，点开完整查词卡（可入生词本）
 * - 点词层普通词：.tw 无持久标色，点开轻量释义卡
 * - 专有名词 / 词库未收录：保持纯文本
 * 匹配含所有格（Japan's 整体归到 japan），避免 's 断在 span 外。 */
function highlightEn(text) {
  return text.replace(/[A-Za-z]+(?:'[A-Za-z]+)?/g, m => {
    const r = resolveToken(m.toLowerCase());
    if (!r) return m;
    if (r.kw) {
      const k = r.kw;
      return `<span class="kw${S.known.includes(k) ? ' known' : ''}" data-act="lookup" data-word="${k}">${m}</span>`;
    }
    return `<span class="tw" data-act="lookup" data-word="${r.w}">${m}</span>`;
  });
}

/* 文章正文兼容两种格式：
 *   旧格式：{ en, cn }（现有文章保持不迁移）
 *   新格式：{ sentences: [{ en, cn }, ...] }（新抓取文章按真实段落分组）
 * 图片块 { img, cap } 不进入句子流。所有统计、朗读和阅读渲染都经过这里，
 * 避免某个入口只支持其中一种数据形状。 */
const sentencesOf = p => {
  if (p && Array.isArray(p.sentences)) return p.sentences.filter(Boolean);
  if (p && (p.en || p.cn)) return [p];
  return [];
};
const textSentences = a => (a && Array.isArray(a.paras) ? a.paras : []).flatMap(sentencesOf);
const sentenceAt = (a, pi, si = 0) => {
  const p = a && a.paras && a.paras[pi];
  return sentencesOf(p)[si] || null;
};

/* 统计文章命中关键词个数（去重）。正文里可能夹带图片项，只对文本句生效 */
function countHits(a) {
  const hit = new Set();
  textSentences(a).forEach(s => {
    if (!s.en) return;
    s.en.replace(/[A-Za-z]+/g, m => {
      const low = m.toLowerCase();
      let node = KW_TRIE;
      for (let i = 0; i < low.length; i++) {
        node = node[low[i]];
        if (!node) return;
      }
      /* 「生词」必须排除已标认识的词，否则数字虚高 */
      if (node && node.$ && !S.known.includes(node.$)) hit.add(node.$);
    });
  });
  return hit.size;
}

/* 文章的纯文本句数（不含内嵌图） */
const sentCount = a => textSentences(a).filter(s => s.en).length;

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

/* 档位标签：只用于展示，不参与排序 —— 排序始终是连续的词频爬坡，
 * 硬切档会让学习曲线出现台阶。
 * 阈值贴着核心词库的结构定：词库 = 语料高频(f≤2500) ∪ 真题高频 ∪ 手工精编，
 * 所以「高频 / 中频」正好是语料高频那一层的两半，「低频」就是靠真题与精编补进来的那批。 */
const TIER_HI = 1500, TIER_MID = 2500;
const tierOf = w => { const f = EC_F(w); return f <= TIER_HI ? "高频" : f <= TIER_MID ? "中频" : "低频"; };

/* ---------------- 词表分层 ----------------
 * 原来只有一层「四级核心」：核心库 1,997 词里 84% 其实是中学词，它默认你已经掌握了
 * 高中词汇 —— 对高考 70 分起步的人这个前提不成立。更麻烦的是，核心库按「语料词频
 * f ≤ 2500」筛，lecture / campus / vocabulary / outline 这类校园与考试场景词天然
 * 低频，被整片滤掉（实测缺 2,067 个中学词，其中 332 个是真题高频）。
 * 于是补一层「中学基础」放在核心层之前：先补地基，再盖楼。
 *   · layer 0 基础层 = (初中 ∪ 高中) − 核心库，见 assets/data-words-mid.js
 *   · layer 1 核心层 = 原四级核心库
 * 排序第一关键字是层而不是词频 —— 否则两层会被词频搅在一起，学习路径就不再是梯道。
 * hf / cv 是真题高频标记（真题表出现次数 / 试卷词频），基础层内凭它提前。 */
const LAYER_MID = "中学基础";
const layerOf = w => (w.list === LAYER_MID ? 0 : 1);
const isSprint = w => !!(w.hf || w.cv);

/* 分层排序：先层、后词频；基础层内「真题高频」提前 —— 这些词考试真的会考到，
 * 哪怕它们在日常语料里不显眼（lecture / campus / budget / agriculture 都是）。 */
const cmpNum = (a, b) => a < b ? -1 : a > b ? 1 : 0;
const sortWords = (arr, mid) => arr.sort((x, y) => {
  if (mid) {                                   // 基础层：真题高频优先，再按语料词频爬坡
    const s = cmpNum(isSprint(y) ? 1 : 0, isSprint(x) ? 1 : 0);
    if (s) return s;
  }
  return cmpNum(EC_F(x), EC_F(y));
});
const MID_WORDS = sortWords(WORDS.filter(w => layerOf(w) === 0), true);
const CORE_WORDS = sortWords(WORDS.filter(w => layerOf(w) === 1), false);

/* 同档内确定性打散：词频相邻的词常常同源同族（american / british / african /
 * european 全挤在一起），连着背容易串味，一屏 20 词里也会扎堆好几个同首字母。
 * 用 FNV-1a 哈希对单词本身做组内重排 —— 确定性算法，每次加载顺序完全一致，
 * 不会让学习进度对不上。
 * 分层后必须「层内打散」：跨层打散会把核心层的词甩进基础段，梯度就断了。 */
const fnv = s => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };
const UNIT = 20;                    // 与每日目标对齐：一个单元正好是一天的量
function shuffleUnits(arr) {
  for (let i = 0; i < arr.length; i += UNIT) {
    const seg = arr.slice(i, i + UNIT).sort((a, b) => fnv(a.word) - fnv(b.word));
    for (let j = 0; j < seg.length; j++) arr[i + j] = seg[j];
  }
  return arr;
}
shuffleUnits(MID_WORDS);
shuffleUnits(CORE_WORDS);
WORDS.length = 0;
for (const w of MID_WORDS) WORDS.push(w);
for (const w of CORE_WORDS) WORDS.push(w);
const MID_END = MID_WORDS.length;          // 基础层的结束位置（学习路径上的分界点）

/* 单词索引：生词本里存的是字符串，取词对象别再 O(n) 地 find */
const WORD_BY = new Map(WORDS.map(w => [w.word, w]));
const wordsOf = list => list.map(x => WORD_BY.get(x)).filter(Boolean);

/* 音标兜底：词库自带音标的只有百来个（人工精编 + 补缺词），其余从 ECDICT
 * （英式 IPA，见 data-ecdict.js 的 p 字段）补齐，统一包成 /…/ 与自带格式一致 */
if (EC) for (const w of WORDS) {
  if (!w.phonetic) {
    const m = EC[w.word.toLowerCase()];
    if (m && m.p) w.phonetic = "/" + String(m.p).replace(/^\/+|\/+$/g, "") + "/";
  }
}

/* 文章统一按发布日期倒序：最新的一篇自动成为发现页「今日精选」 */
ARTICLES.sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));

let view = { name: "home" };      // home | discover | me | read
let activeArticle = null;
let catFilter = "全部";
let searchTerm = "";
/* 阅读页状态：计时器 + 本篇查询过的生词数 */
let readSecs = 0, readTimer = null;
let LAST_Y = 0;   // 当前阅读滚动位置（updateReadProgress 实时更新，节流落盘）
let resumeY = 0;  // 打开文章那一刻要恢复的位置（消费一次即清零）
let sheetMore = false;  // 查词卡是否处于「更多」展开态（关卡即复位）
let lastActiveAt = Date.now();  // 最近一次交互（滚动/点击），活跃阅读计时用
let lastFabY = 0;     // 上次滚动位置（FAB 淡入淡出判方向用）
let installEvt = null;  // PWA 安装提示事件（Android 捕获后「我的」页出安装按钮）
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
  if (i < 0 || i + 1 >= list.length) return null;
  const rest = list.slice(i + 1);
  /* 没有用户反馈时保持原来的顺序；有反馈后只在「下一篇」这个局部候选里
     重排，避免把用户当前的分类/搜索来路改成全站推荐。 */
  return Object.keys(S.articleFeedback || {}).length
    ? rest.slice().sort((x, y) => clientScore(y) - clientScore(x))[0]
    : rest[0];
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
/* TTS：iOS 静音键/首次授权/无英文语音都可能「哑火」——失败必须给提示，不能无声 */
const speak = t => {
  try {
    if (!window.speechSynthesis) { toast("当前系统不支持朗读"); return false; }
    const u = new SpeechSynthesisUtterance(t);
    u.lang = "en-US";
    u.onerror = () => toast("朗读失败 · 系统可能不支持英文语音");
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
    return true;
  } catch (e) { toast("当前系统不支持朗读"); return false; }
};
const toast = msg => {
  const el = document.createElement("div");
  el.className = "toast"; el.textContent = msg;
  $(".phone").appendChild(el);
  setTimeout(() => el.remove(), 1600);
};
const CAT_META = {
  "足球":   { icon: "ball",    bg: "linear-gradient(135deg,#10B981,#047857)" },
  "AI":     { icon: "sparkle", bg: "linear-gradient(135deg,#A78BFA,#4F46E5)" },
  "寓言":   { icon: "book",    bg: "linear-gradient(135deg,#2DD4BF,#0F766E)" },
  "成长":   { icon: "sun",     bg: "linear-gradient(135deg,#34D399,#059669)" },
  "明星":   { icon: "star",    bg: "linear-gradient(135deg,#F472B6,#DB2777)" }
};

/* 生词数按文章缓存：排序时要反复比较，避免每次重扫全文 */
const HITS_CACHE = new Map();
const hitsOf = a => {
  if (!HITS_CACHE.has(a.id)) HITS_CACHE.set(a.id, countHits(a));
  return HITS_CACHE.get(a.id);
};

/* 文章词数 / 预计生词率 / 估时：按篇缓存；known 变化时由 clearArticleCaches() 失效 */
const STATS_CACHE = new Map();
function articleStats(a) {
  if (!STATS_CACHE.has(a.id)) {
    let words = 0;
    textSentences(a).forEach(s => { if (s.en) words += String(s.en).trim().split(/\s+/).filter(Boolean).length; });
    const unknown = hitsOf(a);
    const rate = words ? unknown / words : 0;
    STATS_CACHE.set(a.id, { words, unknown, rate });
  }
  return STATS_CACHE.get(a.id);
}
/* 个人难度四档：阈值即已知词覆盖率 98/95/92 的补数（预计生词率 ≤2% 轻松…） */
function diffTier(rate) {
  if (rate <= 0.02) return { label: "轻松", wpm: 160 };
  if (rate <= 0.05) return { label: "合适", wpm: 130 };
  if (rate <= 0.08) return { label: "稍难", wpm: 100 };
  return { label: "困难", wpm: 80 };
}
const estMinutes = a => {
  const st = articleStats(a);
  return Math.max(1, Math.round(st.words / diffTier(st.rate).wpm));
};
const clearArticleCaches = () => { HITS_CACHE.clear(); STATS_CACHE.clear(); };

/* 文章推荐 ClientScore v1：规则透明、只读本地行为。
 * 未读优先；词数/生词率落在可读区间时加分；完成页的反馈只影响相同栏目和来源，
 * 避免一次对某篇文章的偏好把全站推荐拉偏。负反馈强降权，正反馈适度加权。 */
function clientScore(a) {
  const st = articleStats(a);
  let score = S.read.includes(a.id) ? -6 : 8;
  /* 新抓文章带服务端初始分；旧文章没有该字段时保持原有排序口径。 */
  const server = Number(a.serverScore);
  if (Number.isFinite(server)) score += (server - 50) / 10;
  if (st.rate >= 0.02 && st.rate <= 0.08) score += 3;
  if (st.words > 0 && estMinutes(a) >= 3 && estMinutes(a) <= 6) score += 2;

  const own = (S.articleFeedback || {})[a.id];
  if (own) {
    score += own.rate === "up" ? 5 : own.rate === "down" ? -12 : 0;
    score += own.diff === "easy" ? 2 : own.diff === "hard" ? -3 : 0;
  }
  const source = srcName(a);
  for (const [id, rec] of Object.entries(S.articleFeedback || {})) {
    if (id === a.id || !rec) continue;
    const other = ARTICLES.find(x => x.id === id);
    if (!other) continue;
    const affinity = (rec.rate === "up" ? 3 : rec.rate === "down" ? -5 : 0)
      + (rec.diff === "easy" ? 1 : rec.diff === "hard" ? -1 : 0);
    if (other.cat === a.cat) score += affinity;
    if (srcName(other) === source) score += affinity * 0.6;
  }
  return score;
}

/* 文章排序：发现页「筛选」按钮切换，不是摆设 */
const SORTS = { new: "最新发布", words: "生词最多", short: "时长最短" };
let sortBy = "new";
function sortArticles(list) {
  const arr = list.slice();
  if (sortBy === "words") arr.sort((a, b) => hitsOf(b) - hitsOf(a));
  else if (sortBy === "short") arr.sort((a, b) => estMinutes(a) - estMinutes(b));
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
      <span class="tag">${esc(clean(a.cat))}${when ? ` · ${when}` : ""}</span>
      <div class="t">${esc(clean(a.title))}${done ? ` <span class="read-dot" title="已读完">已读</span>` : ""}</div>
      ${tzh ? `<div class="t-zh">${esc(tzh)}</div>` : ""}
      <span class="meta">${esc(srcName(a))} · ${estMinutes(a)} 分钟 · 生词 ${hitsLbl} · ${(articleStats(a).rate * 100).toFixed(1)}%</span>
    </div>
  </div>`;
};

/* ---------------- 页面：首页 ---------------- */
/* 今日推荐：未读优先 → 生词数 20–50 → 时长 3–6 分钟 → 相邻分类轮换；不足时放宽。
   池子按天缓存，「换一批」在池内向后翻页，翻完回到开头。 */
let homeReads = { day: "", pool: [], off: 0 };

function diversifyCats(pool) {
  const out = [], rest = pool.slice();
  while (rest.length) {
    const i = rest.findIndex(a => !out.length || a.cat !== out[out.length - 1].cat);
    out.push(rest.splice(i < 0 ? 0 : i, 1)[0]);
  }
  return out;
}

function pickDailyReads(reroll) {
  const day = todayKey();
  if (homeReads.day !== day) homeReads = { day, pool: [], off: 0 };
  if (reroll || !homeReads.pool.length) {
    const unread = ARTICLES.filter(a => !S.read.includes(a.id));
    const base = unread.length >= 2 ? unread : ARTICLES.slice();
    const scored = base.map(a => {
      const hits = countHits(a);
      const m = estMinutes(a);
      const s = clientScore(a) + (hits >= 20 && hits <= 50 ? 2 : 0);
      return { a, s };
    });
    scored.sort((x, y) => y.s - x.s);
    homeReads.pool = diversifyCats(scored.map(x => x.a));
    homeReads.off = 0;
  }
  let picks = homeReads.pool.slice(homeReads.off, homeReads.off + 2);
  if (picks.length < 2) { homeReads.off = 0; picks = homeReads.pool.slice(0, 2); }
  else homeReads.off += 2;
  return picks;
}

function renderHome() {
  const hr = shanghaiHour();
  const greet = hr < 6 ? "夜深了" : hr < 12 ? "早上好" : hr < 18 ? "下午好" : "晚上好";
  const last = S.lastRead && S.lastRead.id ? ARTICLES.find(a => a.id === S.lastRead.id) : null;
  const reads = pickDailyReads();
  const done = S.finished.length;
  const mins = Object.values(S.minsByDay || {}).reduce((a, b) => a + b, 0);
  /* 阅读主页：上次读到 → 今日推荐 → 分类入口 → 轻量阅读统计 */
  return `
    ${statusbar()}
    <div class="view">
      <div class="row between">
        <div class="col" style="gap:4px">
          <div class="h1">${greet}</div>
          <div class="muted">距四级考试还有 ${daysToExam()} 天 · 已读完 ${done} 篇 · 累计 ${mins} 分钟</div>
        </div>
        <div class="icon-btn" style="background:var(--brand-soft);border:0;color:var(--brand)" aria-hidden="true">${svg("user", 18)}</div>
      </div>

      ${last ? `<button class="card resume-card" data-article="${last.id}" role="button" tabindex="0" aria-label="继续阅读：${esc(clean(last.title))}">
        <span class="rc-chip">${svg("book", 12)} 上次读到${S.lastRead.at ? " · " + esc(fmtWhen(new Date(S.lastRead.at).toISOString().slice(0, 10))) : ""}</span>
        <span class="rc-title">${esc(clean(last.title))}</span>
        ${zhTitle(last) ? `<span class="rc-zh">${esc(zhTitle(last))}</span>` : ""}
        <span class="rc-meta">
          <span class="chip">${esc(last.cat)}</span>
          <span class="rc-bar"><span style="width:${Math.max(2, S.lastRead.pct || 2)}%"></span></span>
          <span class="rc-pct">${S.lastRead.pct ? "读到 " + S.lastRead.pct + "%" : "刚开始"}</span>
          <span class="rc-go">继续 ${svg("arrow", 12)}</span>
        </span>
      </button>` : `<button class="card resume-card" data-act="go-discover" role="button" tabindex="0" aria-label="去发现页挑一篇文章">
        <span class="rc-chip">${svg("book", 12)} 开始阅读</span>
        <span class="rc-title">从今天的一篇文章开始</span>
        <span class="rc-meta"><span class="chip">${ARTICLES.length} 篇可选</span><span class="rc-go">去挑一篇 ${svg("arrow", 12)}</span></span>
      </button>`}

      <div class="row between">
        <span class="h3">今日推荐</span>
        <span class="link" data-act="home-reroll" role="button" tabindex="0">换一批</span>
      </div>
      ${reads.map(articleCard).join("")}

      <div class="card col" style="gap:10px">
        <div class="row between">
          <span class="h3">分类</span>
          <span class="link" data-act="go-discover" role="button" tabindex="0">全部文章</span>
        </div>
        <div class="cats" role="tablist" aria-label="文章分类">
          ${CATEGORIES.filter(c => c === "全部" || ARTICLES.some(a => a.cat === c)).map(c => {
            const n = c === "全部" ? ARTICLES.length : ARTICLES.filter(a => a.cat === c).length;
            return `<button class="cat" data-cat="${c}" data-go="1" role="tab">${c} <span style="font-family:var(--font-num);font-size:11px">${n}</span></button>`;
          }).join("")}
        </div>
      </div>
      <div style="height:6px"></div>
    </div>`;
}
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
        if (!items.length) return "";   // 空分类不占磁贴（有内容自动回来）
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

  /* 「上次读到」：发现页顶部的续读直达入口（只在全部视图展示，点卡片回原文并恢复位置） */
  const last = S.lastRead && S.lastRead.id ? ARTICLES.find(a => a.id === S.lastRead.id) : null;
  const lastHtml = isAll && last ? (() => {
    const pct = S.lastRead.pct || 0;
    const ago = S.lastRead.at ? fmtWhen(new Date(S.lastRead.at).toISOString().slice(0, 10)) : "";
    return `<button class="card resume-card" data-article="${last.id}" role="button" tabindex="0" aria-label="继续阅读上次读到的文章：${esc(clean(last.title))}">
      <span class="rc-chip">${svg("book", 12)} 上次读到${ago ? " · " + esc(ago) : ""}</span>
      <span class="rc-title">${esc(clean(last.title))}</span>
      ${zhTitle(last) ? `<span class="rc-zh">${esc(zhTitle(last))}</span>` : ""}
      <span class="rc-meta">
        <span class="chip">${esc(last.cat)}</span>
        <span class="rc-bar"><span style="width:${Math.max(2, pct)}%"></span></span>
        <span class="rc-pct">${pct ? "读到 " + pct + "%" : "刚开始"}</span>
        <span class="rc-go">继续 ${svg("arrow", 12)}</span>
      </span>
    </button>`;
  })() : "";

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
        <span class="chip green">${diffTier(articleStats(featured).rate).label}</span>
        <span class="chip">${estMinutes(featured)} 分钟</span>
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
          ${CATEGORIES.filter(c => c === "全部" || ARTICLES.some(a => a.cat === c)).map(c => {
            const col = c === "全部" ? "var(--brand)" : ((CAT_META[c] || {}).bg || "var(--brand)");
            return `<button class="cat ${c === catFilter ? "on" : ""}" data-cat="${c}" style="--cat:${col}" role="tab" aria-selected="${c === catFilter}">${c}</button>`;
          }).join("")}
        </div>
      </div>

      ${wordsHtml}
      ${artHitsHtml}
      ${emptyHtml}
      ${lastHtml}
      ${catGridHtml}
      ${featuredHtml}
      ${isAll ? `<div class="lib">
        <div class="ic">${svg("cards", 20)}</div>
        <div class="col grow" style="gap:4px">
          <div class="t">四级词库</div>
          <div class="s">${WORDS.length.toLocaleString()} 词 · 阅读中可点击查义</div>
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
  const avg = Math.round(weekMins / 7);
  const notebookWords = wordsOf(S.notebook || []);
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
          <div class="muted">已读完 ${S.finished.length} 篇 · 词库 ${WORDS.length.toLocaleString()} 词</div>
        </div>
      </div>

      ${installEvt ? `<button class="btn-primary" data-act="pwa-install" style="width:100%">${svg("check", 16)} 添加到主屏幕</button>` : ""}
      ${(typeof navigator !== "undefined" && /iP(hone|ad|od)/.test(navigator.userAgent) && !window.navigator.standalone) ? `<div class="muted-2" style="font-size:12px">iPhone/iPad：用 Safari 的分享菜单 → 「添加到主屏幕」，即可全屏离线使用</div>` : ""}

      <div class="card col" style="gap:12px">
        <div class="row between"><span class="h2">阅读总览</span><span class="muted-2">近 7 天</span></div>
        <div class="stat-grid">
          <div class="stat"><div class="n">${streakDays()}</div><div class="l">连续天</div></div>
          <div class="stat"><div class="n">${weekMins}</div><div class="l">分钟</div></div>
          <div class="stat good"><div class="n">${S.finished.length}</div><div class="l">读完篇</div></div>
          <div class="stat"><div class="n">${notebookWords.length}</div><div class="l">生词本</div></div>
        </div>
      </div>

      <div class="card col" style="gap:12px">
        <div class="row between"><span class="h2">近 7 天阅读</span><span class="muted-2">日均 ${avg} 分钟</span></div>
        <div class="bars">
          ${week.map(d => `<div class="bar-col">
            <div class="bar ${d.today ? "today" : ""}" style="height:${Math.round(d.mins / max * 62)}px"></div>
            <span class="${d.today ? "today" : ""}">${d.label}</span>
          </div>`).join("")}
        </div>
      </div>

      <div class="card row" style="gap:12px;padding:14px 16px">
        <div class="ic">${svg("cards", 20)}</div>
        <div class="col grow" style="gap:4px">
          <div class="t">四级词库</div>
          <div class="s">${WORDS.length.toLocaleString()} 词 · 阅读中点击单词即可查义</div>
        </div>
      </div>

      ${notebookWords.length ? `<div class="row between" style="margin-top:4px">
        <span class="h3">生词本（阅读收集）</span><span class="muted-2">${notebookWords.length} 词 · 点击查义</span>
      </div>
      ${notebookWords.slice(0, 4).map(w => `
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
        <span class="link danger" data-act="ask-reset" role="button" tabindex="0">清空阅读记录</span>
      </div>

      <div class="row between" style="margin-top:10px">
        <span class="h3">关于</span>
      </div>
      <div class="muted-2" style="font-size:11.5px;line-height:18px">
        个人学习项目，仅供学习交流，不作商业用途。<br>
        词库分两层：中学基础 ${MID_WORDS.length.toLocaleString()} 词（初中 + 高中，补高中欠账）→ 四级核心 ${CORE_WORDS.length.toLocaleString()} 词。<br>
        四级核心：按「语料词频 + 历年真题高频」从四级大纲筛出的约 2000 词；词频与音标来自 ECDICT（MIT）。<br>
        中学基础：KyleBing/english-vocabulary 分级词库；其中 ${MID_WORDS.filter(isSprint).length} 词带真题高频标记。<br>
        真题词频：liut969/CET《英语四级真题高频词汇》（近 5 年 30 套真题统计）· exam-data/CETVocabulary（约 200 套试卷词频，CC BY-NC-SA 4.0）。<br>
        单词例句：KyleBing/english-vocabulary · Tatoeba（CC-BY 2.0）· 原刊文章。<br>
        阅读文章均为外刊公开内容摘要，版权归原媒体所有，正文可一键跳转原文。
      </div>
      <div style="height:6px"></div>
    </div>`;
}

/* ---------------- 页面：阅读（杂志感沉浸） ---------------- */
/* 完成页反馈按钮的公共片段 */
const fbSeg = (act, v, label, on) =>
  `<button class="fb-seg${on ? " on" : ""}" data-act="${act}" data-v="${v}" aria-pressed="${on}">${label}</button>`;

function renderRead() {
  const a = activeArticle;
  const sizeClass = ["", "large", "xlarge"][S.fontSize] || "";
  const cover = coverOf(a);
  const total = sentCount(a);
  const st = articleStats(a);
  const tier = diffTier(st.rate);
  const ratePct = (st.rate * 100).toFixed(1);
  const dur = estMinutes(a);
  const aZh = zhTitle(a);
  const hits = hitsOf(a);
  const hitsLbl = hits > 999 ? "999+" : hits;
  const looked = LOOKED[a.id] || 0;
  const minsNow = Math.max(1, Math.round(readSecs / 60));
  const readTimes = S.read.filter(x => x === a.id).length;
  const fb = (S.articleFeedback || {})[a.id] || {};
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
    const rendered = sentencesOf(p).map((s, si) => {
      const enText = clean(s.en);
      const cnText = clean(s.cn);
      if (!enText && !cnText) return "";        // 两端都空的句子不占位置
      const en = highlightEn(esc(enText));
      return `<div class="sentence" data-act="para-peek" data-pi="${i}" data-si="${si}">
        <div class="en ${sizeClass}">${en}<span class="para-tts" data-act="para-speak" data-pi="${i}" data-si="${si}" title="读这一句">${svg("speaker", 13)}</span></div>
        ${cnText ? `<div class="cn">${esc(cnText)}</div>` : ""}
      </div>`;
    }).join("");
    if (!rendered) return "";
    const isFirst = firstText; firstText = false;
    return `<div class="para${isFirst ? " first" : ""}">${rendered}</div>`;
  }).join("");

  return `
    ${statusbar()}
    <div class="read-top">
      <span class="icon-btn" data-act="go-back" role="button" tabindex="0" aria-label="返回上一页">${svg("back", 18)}</span>
      <div class="center">
        <span>双语阅读</span>
        <span class="src">${esc(clean(a.cat))} · ${esc(clean(a.source))}</span>
        <span class="read-hud" id="read-hud">0% · 剩余约 ${dur} 分钟</span>
      </div>
      <span class="icon-btn" data-act="toggle-cn" role="button" tabindex="0" style="color:${S.showCn ? 'var(--brand)' : 'var(--text-2)'}" title="译" aria-label="${S.showCn ? "隐藏中文对照" : "显示中文对照"}" aria-pressed="${S.showCn}">${svg("globe", 18)}</span>
    </div>
    <div class="read-progress"><div class="bar" id="read-bar"></div></div>

    <div class="view read-scroll ${S.showCn ? "" : "no-cn"}${S.readTheme === "night" ? " rt-night" : S.readTheme === "paper" ? " rt-paper" : ""}" id="read-scroll" data-art="${esc(a.id)}">
      <div class="read-hero">
        <h1 class="title">${esc(clean(a.title))}</h1>
        ${aZh ? `<div class="title-zh">${esc(aZh)}</div>` : ""}
        <div class="byline">
          <span>${esc(clean(a.cat))}</span><span class="dot"></span><span>${esc(srcName(a))}</span>
          <span class="dot"></span><span>${dur} 分钟 · ${tier.label}</span>
          <span class="dot"></span><span>生词 ${hitsLbl} · ${ratePct}%</span>
        </div>
        <div class="read-cover${cover ? " has-img" : ""}" style="${cover ? `background-image:url('${esc(cover)}')` : `background:${esc(a.gradient)}`}">
          <span class="mark">${esc(srcName(a))}</span>
          <div class="play" data-act="read-all">${svg("speaker", 18)}</div>
        </div>
        ${!S.hintSeen && !S.showCn ? `<div class="peek-hint">${svg("tap", 14)} 轻触英文看译文 · 点任意单词查释义</div>` : ""}
      </div>

      <div class="read-body" id="read-body">${paras}</div>

      <div class="read-finish">
        <div class="ico">${svg("check", 22)}</div>
        ${S.read.includes(a.id)
          ? `<h3>已读完 · 累计第 ${readTimes} 次</h3>`
          : `<h3>读完了？打个卡</h3>`}
        <div class="stat-chips">
          <span class="st-chip"><b>${dur}</b><i>分钟</i></span>
          <span class="st-chip"><b>${hitsLbl}</b><i>个生词</i></span>
          <span class="st-chip"><b>${looked}</b><i>次查询</i></span>
          <span class="st-chip"><b>${minsNow}</b><i>分钟读过</i></span>
        </div>
        <div class="fb-block">
          <div class="fb-row"><span class="fb-l">理解体验</span>
            <div class="fb-segs">
              ${fbSeg("fb-diff", "easy", "很轻松", fb.diff === "easy")}
              ${fbSeg("fb-diff", "ok", "正合适", fb.diff === "ok")}
              ${fbSeg("fb-diff", "hard", "有点难", fb.diff === "hard")}
            </div>
          </div>
          <div class="fb-row"><span class="fb-l">这篇文章</span>
            <div class="fb-segs">
              ${fbSeg("fb-rate", "up", "👍 喜欢", fb.rate === "up")}
              ${fbSeg("fb-rate", "mid", "😐 一般", fb.rate === "mid")}
              ${fbSeg("fb-rate", "down", "👎 不喜欢", fb.rate === "down")}
            </div>
          </div>
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
        ${a.url ? `<a class="read-source-link" href="${esc(a.url)}" target="_blank" rel="noopener">查看原文 →</a>` : ""}
      </div>
    </div>


    <div class="fab-bar" id="fab-bar">
      <button data-act="toggle-cn" class="${S.showCn ? 'active' : ''}" title="译" aria-label="${S.showCn ? "隐藏中文对照" : "显示中文对照"}" aria-pressed="${S.showCn}">${svg("globe", 18)}</button>
      <button data-act="font" class="${S.fontSize > 0 ? 'active' : ''}" title="字号" aria-label="切换字号（当前${["标准", "大", "特大"][S.fontSize] || "标准"}）" aria-pressed="${S.fontSize > 0}">${svg("font", 18)}</button>
      <button data-act="fab-more" title="更多工具" aria-label="更多工具"><span style="font-family:var(--font-num);font-weight:700;letter-spacing:1px">···</span></button>
    </div>
  `;
}

/* 「···」更多工具面板：低频功能收进来，阅读页保持安静 */
function renderFabSheet() {
  const a = activeArticle;
  return `
    <div class="sheet-mask" data-act="close-sheet"></div>
    <div class="sheet" role="dialog" aria-label="阅读工具">
      <div class="grip"></div>
      <div class="col" style="gap:8px">
        <button class="sheet-item" data-act="read-theme">${svg(S.readTheme === "night" ? "moon" : "sun", 16)} 护眼底色：${S.readTheme === "" ? "关" : S.readTheme === "paper" ? "纸张" : "夜间"}</button>
        <button class="sheet-item" data-act="read-all">${svg("speaker", 16)} 朗读全文</button>
        <button class="sheet-item" data-act="article-notebook">${svg("bookmark", 16)} 本篇生词本</button>
        ${a.url ? `<a class="sheet-item" href="${esc(a.url)}" target="_blank" rel="noopener">${svg("arrow", 16)} 查看原文</a>` : ""}
      </div>
    </div>`;
}

/* 阅读中查看本篇已收藏的生词：bottom sheet，不离开文章 */
function renderArticleNotebookSheet() {
  const a = activeArticle;
  const text = " " + textSentences(a).map(s => s.en || "").join(" ").toLowerCase() + " ";
  const words = (S.notebook || []).filter(w => text.includes(w.toLowerCase()));
  const rows = words.map(w => `
    <div class="row" data-act="lookup" data-word="${esc(w)}" role="button" tabindex="0" style="padding:8px 0;border-bottom:1px solid var(--line)">
      <span style="font-family:var(--font-en);font-weight:600;font-size:14px">${esc(w)}</span>
    </div>`).join("");
  return `
    <div class="sheet-mask" data-act="close-sheet"></div>
    <div class="sheet" role="dialog" aria-label="本篇生词本">
      <div class="grip"></div>
      <div class="row between"><span class="h2">本篇生词</span><span class="muted-2">${words.length} 个</span></div>
      ${words.length ? `<div class="col" style="max-height:40vh;overflow-y:auto">${rows}</div>`
      : `<div class="muted" style="text-align:center;padding:16px 0">这篇还没收藏生词 · 点正文里的词可加入</div>`}
    </div>`;
}

/* 阅读进度条 + HUD：基于 #read-scroll 容器的滚动位置 */
function updateReadProgress() {
  const cont = $("#read-scroll");
  const bar = $("#read-bar");
  const body = $("#read-body");
  if (!cont || !bar || !body) return;
  lastActiveAt = Date.now();   // 滚动即活跃
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
    const dur = estMinutes(a);
    const remain = Math.max(0, Math.ceil(dur * (1 - pct / 100)));
    hud.textContent = `${Math.round(pct)}% · 剩余约 ${remain} 分钟`;
  }
  /* 「上次读到」：滚动时记下位置，5 秒节流落盘（滚动事件高频，不能每次都写 localStorage） */
  if (a && S.lastRead && S.lastRead.id === a.id) {
    LAST_Y = cont.scrollTop;
    if (Date.now() - (S.lastRead.at || 0) > 5000) {
      S.lastRead.y = LAST_Y; S.lastRead.pct = Math.round(pct); S.lastRead.at = Date.now();
      save();
    }
  }
  /* FAB 随滚动方向淡入淡出：下滚让位正文，上滚/回顶部出现 */
  const fab = $("#fab-bar");
  if (fab) {
    const y = cont.scrollTop;
    if (y > lastFabY + 6 && y > 160) fab.classList.add("hide");
    else if (y < lastFabY - 6 || y < 160) fab.classList.remove("hide");
    lastFabY = y;
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
      save(); render();
      toast(`已恢复备份 · 阅读 ${S.finished.length} 篇 · 生词本 ${S.notebook.length} 词`);
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
          <div class="h2">清空阅读记录？</div>
          <span class="muted-2" style="font-size:11.5px">生词本 ${S.notebook.length} 词 · 读完 ${S.finished.length} 篇</span>
        </div>
      </div>
      <div class="muted" style="font-size:12.5px;line-height:20px">
        这会抹掉阅读记录与生词本，且无法撤销。主题设置会保留；内置词库不会被删除。
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

/* ---------------- 查词浮层 ----------------
 * 两级结构：第一层只回答「这个词在这里是什么意思」（词/音标/短释义/收藏），
 * 点「更多」才展开词根、例句等完整卡——3 秒理解后回到正文。 */
function renderSheet(word) {
  const w = WORDS.find(x => x.word === word);
  if (!w) return renderTapSheet(word);   // 词库外单词走轻量卡
  const shortDef = String(w.def || "").split("\n")[0] || w.def;
  if (!sheetMore) {
    return `
      <div class="sheet-mask" data-act="close-sheet"></div>
      <div class="sheet slim" role="dialog" aria-label="查词 ${esc(word)}">
        <div class="grip"></div>
        <div class="row between">
          <div class="col" style="gap:3px">
            <div class="w">${esc(w.word)}</div>
            <span class="ph">${esc(w.phonetic || "")}</span>
          </div>
          <span class="icon-btn solid" data-act="speak" data-word="${esc(w.word)}" style="width:36px;height:36px;color:#fff">${svg("speaker", 17)}</span>
        </div>
        <div class="df">${esc(w.pos || "")} ${esc(shortDef)}</div>
        <div class="sheet-btns">
          <button class="a" data-act="add-note" data-word="${esc(w.word)}">${S.notebook.includes(w.word) ? "已在生词本" : "加入生词本"}</button>
          <button class="b" data-act="sheet-more" data-word="${esc(w.word)}">更多</button>
        </div>
      </div>`;
  }
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
        <button class="c" data-act="mark-known" data-word="${w.word}" aria-pressed="${S.known.includes(w.word)}">${S.known.includes(w.word) ? "已认识 ✓" : "标为已认识"}</button>
      </div>
    </div>`;
}

/* 词库外单词的轻量查词卡：只有释义与发音，不加入词库学习记录。 */
function renderTapSheet(word) {
  const t = TAP && TAP[word];
  if (!t) return "";
  return `
    <div class="sheet-mask" data-act="close-sheet"></div>
    <div class="sheet" role="dialog" aria-label="查词 ${esc(word)}">
      <div class="grip"></div>
      <div class="row between">
        <div class="col" style="gap:3px">
          <div class="w">${esc(word)}</div>
          ${t.p ? `<span class="ph">${esc(t.p)}</span>` : ""}
        </div>
        <span class="icon-btn solid" data-act="speak" data-word="${esc(word)}" style="width:36px;height:36px;color:#fff">${svg("speaker", 17)}</span>
      </div>
      <div class="df pre">${esc(t.d)}</div>
      <div class="rt">词库外单词 · 仅供查询</div>
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
const TABS = [["home", "首页", "home"], ["discover", "发现", "compass"], ["me", "我的", "user"]];
const tabbar = () => {
  const cur = ["home", "discover", "me"].includes(view.name) ? view.name : "home";
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
  /* 阅读页重渲染保留滚动位置：字号 / 中英对照 / 护眼主题 / 打卡这类原地设置，
     不该把读者甩回文章开头。data-art 相同（同一篇文章）才恢复；
     打开新文章 / 下一篇时 art 变化，保持回顶。 */
  /* 旧 DOM 里有 .read-scroll 就捕获：同篇重渲染用于恢复位置；离开阅读页用于落盘「上次读到」 */
  const prevRead = document.querySelector("#screen .read-scroll");
  const prevArt = prevRead ? prevRead.dataset.art : null;
  const prevScroll = prevRead ? prevRead.scrollTop : 0;
  /* 离开阅读页：把最后位置落盘（换文场景 openArticle 已重置 lastRead，id 对不上不会覆盖） */
  if (prevRead && view.name !== "read" && S.lastRead && S.lastRead.id === prevRead.dataset.art) {
    S.lastRead.y = LAST_Y; S.lastRead.at = Date.now(); save();
  }
  const screen = $("#screen");
  let body = "";
  if (view.name === "home") body = renderHome();
  else if (view.name === "discover") body = renderDiscover();
  else if (view.name === "me") body = renderMe();
  else if (view.name === "read") body = renderRead();
  screen.innerHTML = body + (view.name === "read" ? "" : tabbar());

  /* 阅读主题只染阅读页：通过 .screen 上的 rt-* 类控制 */
  const themeCls = view.name === "read"
    ? `rt-${S.readTheme || "default"}`
    : "";
  screen.className = "screen " + themeCls;

  if (view.name === "read") {
    if (!readTimer) readTimer = setInterval(() => {
      /* 活跃阅读计时：页面隐藏或 60 秒无交互不累计 */
      if (document.hidden || Date.now() - lastActiveAt > 60000) return;
      readSecs++;
    }, 1000);
    const cont = $("#read-scroll");
    if (cont) {
      cont.addEventListener("scroll", updateReadProgress, { passive: true });
      /* 同一篇文章的重渲染：恢复滚动位置并同步进度条（rAF 那次会读到恢复后的位置） */
      if (prevArt && cont.dataset.art === prevArt && prevScroll) {
        cont.scrollTop = prevScroll;
        updateReadProgress();
      }
      /* 「上次读到」：打开文章那一刻消费一次 resumeY（重进同一篇直达上次位置） */
      if (resumeY && cont.dataset.art === activeArticle.id) { cont.scrollTop = resumeY; LAST_Y = resumeY; }
      resumeY = 0;
      if (!S.hintSeen) { S.hintSeen = true; save(); }   // 操作提示只在首次使用出现
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

/* ---------------- 事件 ---------------- */
document.addEventListener("click", e => {
  const t = e.target.closest("[data-act],[data-tab],[data-article],[data-cat]");
  if (!t) return;

  if (t.dataset.tab) {
    if (!["home", "discover", "me"].includes(t.dataset.tab)) return;
    view = { name: t.dataset.tab };
    resetNav();                 // 点底部 tab = 根级跳转
    render(); return;
  }

  if (t.dataset.article) {
    pushNav({ src: t.dataset.article });   // 记住来路：返回时回到同一张列表、同一位置
    activeArticle = ARTICLES.find(a => a.id === t.dataset.article);
    readSecs = 0;             // 进入新文章，计时清零
    LOOKED[activeArticle.id] = 0;  // 本篇查询清零
    /* 「上次读到」：换文重置进度；重进同一篇则保留位置（resumeY 在渲染后恢复一次） */
    resumeY = (S.lastRead && S.lastRead.id === activeArticle.id) ? (S.lastRead.y || 0) : 0;
    S.lastRead = { id: activeArticle.id, y: resumeY, pct: resumeY ? (S.lastRead.pct || 0) : 0, at: Date.now() };
    save();
    view = { name: "read" };
    render(); return;
  }

  if (t.dataset.cat) { catFilter = t.dataset.cat; shown = PAGE; render(); return; }

  switch (t.dataset.act) {
    case "home-reroll":
      pickDailyReads(true); render(); break;
    case "fb-diff":
    case "fb-rate": {
      if (!activeArticle) break;
      const fbv = t.dataset.v;
      S.articleFeedback = S.articleFeedback || {};
      const rec = S.articleFeedback[activeArticle.id] = S.articleFeedback[activeArticle.id] || { at: 0 };
      if (t.dataset.act === "fb-diff") rec.diff = fbv; else rec.rate = fbv;
      rec.at = Date.now();
      homeReads.pool = [];          // 下一次回首页时重新计算 ClientScore
      save(); render(); break;
    }
    case "fab-more":
      $$(".sheet, .sheet-mask").forEach(n => n.remove());
      $(".phone").insertAdjacentHTML("beforeend", renderFabSheet()); break;
    case "article-notebook":
      $$(".sheet, .sheet-mask").forEach(n => n.remove());
      $(".phone").insertAdjacentHTML("beforeend", renderArticleNotebookSheet()); break;
    case "pwa-install":
      if (installEvt) { installEvt.prompt(); installEvt = null; render(); }
      break;
    case "sheet-more": {
      sheetMore = true;
      const w = t.dataset.word;
      $$(".sheet, .sheet-mask").forEach(n => n.remove());
      $(".phone").insertAdjacentHTML("beforeend", renderSheet(w));
      break;
    }
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
      /* 「上次读到」跟着换文：旧篇位置已在离开时落盘，这里重置到新篇开头 */
      S.lastRead = { id: nx.id, y: 0, pct: 0, at: Date.now() }; save();
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
      const a2 = activeArticle; const pi = +t.dataset.pi; const si = +t.dataset.si || 0;
      const sent = sentenceAt(a2, pi, si);
      if (sent && sent.en) {
        speak(sent.en);
        t.closest(".para")?.classList.add("playing");
        setTimeout(() => t.closest(".para")?.classList.remove("playing"), 1200);
        let n = 0;
        for (let i = 0; i <= pi; i++) n += i === pi ? si + 1 : sentencesOf(a2.paras[i]).length;
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
      speak(textSentences(activeArticle).filter(s => s.en).map(s => s.en).join(" ")); toast("开始朗读全文"); break;
    case "punch-in": {
      const id = activeArticle && activeArticle.id;
      if (id) {
        /* 真实阅读时长：按天累计，供「我的 · 近 7 天」使用（不再是写死的数组） */
        const mins = Math.max(1, Math.round(readSecs / 60));
        S.read.push(id);
        if (!S.finished.includes(id)) S.finished.push(id);
        homeReads.pool = [];        // 已读状态变化，未读优先池需要失效
        /* 备份提醒：读完第 2 篇起提示一次，7 天不重复——进度只存在本地浏览器 */
        if (S.finished.length >= 2 && Date.now() - (S.backupHintAt || 0) > 7 * 86400000) {
          S.backupHintAt = Date.now(); save();
          setTimeout(() => toast("进度只存在这台浏览器 · 记得在「我的」里备份"), 1200);
        }
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
      const known = i < 0;
      if (known) S.known.push(w); else S.known.splice(i, 1);
      /* 就地切换正文高亮，不整页 render——render 会把阅读滚动位置打回开头
         （与下方 lookup case 同理）；known 变化同时失效生词/难度统计缓存 */
      clearArticleCaches();
      $$(`.kw[data-word="${w}"]`).forEach(n => n.classList.toggle("known", known));
      toast(known ? `「${w}」已标记为认识，文中不再高亮` : `已取消「${w}」的已认识标记`);
      save(); $$(".sheet, .sheet-mask").forEach(n => n.remove()); break;
    }
    case "lookup": {
      const word = t.dataset.word;
      sheetMore = false;   // 每次新查词都从轻卡开始
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
      sheetMore = false;
      $$(".sheet, .sheet-mask").forEach(n => n.remove()); break;
    case "add-note": {
      const w = t.dataset.word;
      if (!S.notebook.includes(w)) { S.notebook.push(w); toast(`「${w}」已加入生词本`); }
      else toast("已经在生词本里了");
      /* 不 render：整页重渲染会把阅读位置打回开头，词已入本，浮层关掉即可 */
      save(); $$(".sheet, .sheet-mask").forEach(n => n.remove()); break;
    }
    case "ask-reset":
      $(".phone").insertAdjacentHTML("beforeend", resetSheet());
      break;
    case "export-data":
      exportData(); break;
    case "import-data":
      $("#file-in").click(); break;
    case "reset": {
      resetNav();
      /* 深拷贝重置：浅拷贝会让新状态继续和 defaultState 共享 studyDays 等引用 */
      const keepTheme = S.theme;
      S = JSON.parse(JSON.stringify(defaultState));
      S.theme = keepTheme || "light";      // 主题是外观偏好，不算学习进度，别一起清掉
      save(); render(); toast("阅读记录已重置");
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
  /* 「上次读到」兜底：页面被切走/关闭时，把滚动位置立即落盘（正常路径有 5 秒节流） */
  window.addEventListener("pagehide", () => {
    if (S.lastRead && S.lastRead.id && LAST_Y) { S.lastRead.y = LAST_Y; save(); }
  });
  /* 活跃阅读计时：任何点击都刷新活跃时间戳 */
  document.addEventListener("click", () => { lastActiveAt = Date.now(); }, true);
  /* PWA 安装：Android Chrome 捕获安装事件，「我的」页出安装按钮；iOS 走分享指引 */
  window.addEventListener("beforeinstallprompt", e => {
    e.preventDefault(); installEvt = e;
    if (view.name === "me") render();
  });
  /* SW 后台刷新到新内容：阅读中不打断，改用提示 */
  navigator.serviceWorker.addEventListener("message", e => {
    if (!e.data || e.data.type !== "content-updated") return;
    if (view.name === "read") { toast("内容已更新，返回后生效"); return; }
    if (sessionStorage.getItem("wl-updated")) return;   // 每次会话只自动刷一次，防循环
    sessionStorage.setItem("wl-updated", "1");
    toast("内容已更新，正在刷新…");
    setTimeout(() => location.reload(), 800);
  });
}

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
  notebook: [],     // 生词本（阅读加入）
  showCn: false,
  fontSize: 0,
  readTheme: "",     // 阅读页护眼主题："" | "paper" | "night"
  read: [],         // 累计读过（含重复）
  finished: [],     // 已打卡的去重列表
  known: [],        // 标记「认识」的词：文章里不再高亮
  readDays: [],     // 有阅读行为的日期 YYYY-MM-DD，用于算连续阅读天数
  secByDay: {},     // { YYYY-MM-DD: 秒 }，阅读时长按天累计（真实口径，持续写入）
  minsByDay: {},    // { YYYY-MM-DD: 分钟 }，由 secByDay 派生，仅供展示与旧版兼容
  lastRead: { id: "", y: 0, pct: 0, at: 0 },  // 「上次读到」：文章 id + 滚动位置，发现页可直达续读
  readPos: {},      // { [文章id]: { pi, si, off, y, pct, at } } 每篇各自的续读位置（句子锚点 + 屏内偏移）
  readHistory: {},  // { [文章id]: { firstAt, lastAt, visits, finished, title, ... } } 阅读记录索引
  articleFeedback: {},  // 完成页反馈：{ [文章id]: { diff: easy|ok|hard, rate: up|mid|down, at } }
  hintSeen: false,  // 阅读页操作提示只出现一次
  backupHintAt: 0,  // 上次「记得备份」提示时间（7 天节流）
};
/* 历史备份仍可导入，但旧版背词/复习字段只读不写回，不再进入运行状态。 */
function normalizeState(raw) {
  const src = raw && typeof raw === "object" ? raw : {};
  const next = Object.assign({}, defaultState, src);
  if (!Array.isArray(src.readDays) && Array.isArray(src.studyDays)) next.readDays = src.studyDays.slice();
  delete next.streak; delete next.minutes; delete next.tab;
  delete next.studied; delete next.wrong; delete next.daily; delete next.fsrs; delete next.studyDays;
  next.readDays = Array.isArray(next.readDays) ? next.readDays.slice() : [];
  next.minsByDay = (next.minsByDay && typeof next.minsByDay === "object") ? Object.assign({}, next.minsByDay) : {};
  next.secByDay = (next.secByDay && typeof next.secByDay === "object") ? Object.assign({}, next.secByDay) : {};
  /* 老版本只存了「分钟」，且只在打卡时写一次。这里换算成秒，历史记录不至于凭空消失。 */
  if (!src.secByDay) {
    for (const [k, m] of Object.entries(next.minsByDay)) {
      if (!next.secByDay[k]) next.secByDay[k] = Math.round((+m || 0) * 60);
    }
  }
  next.notebook = Array.isArray(next.notebook) ? next.notebook.slice() : [];
  next.known = Array.isArray(next.known) ? next.known.slice() : [];
  next.read = Array.isArray(next.read) ? next.read.slice() : [];
  next.finished = Array.isArray(next.finished) ? next.finished.slice() : [];
  /* 每篇的续读位置：老版本没有这个字段，缺了就补空表（旧数据仍靠 lastRead.y 兜底） */
  next.readPos = (next.readPos && typeof next.readPos === "object") ? Object.assign({}, next.readPos) : {};
  next.readHistory = (next.readHistory && typeof next.readHistory === "object") ? Object.assign({}, next.readHistory) : {};
  return next;
}
let storedState = {};
try { storedState = JSON.parse(localStorage.getItem(STORE) || "{}"); } catch { storedState = {}; }
let S = normalizeState(storedState);
/* minsByDay 是 secByDay 的派生镜像：展示层（近 7 天柱状图、累计时长）继续读分钟，
 * 但记账只认秒，避免「每次打卡四舍五入一次」把零头越积越偏。 */
function syncMinsMirror() {
  const out = {};
  for (const [k, sec] of Object.entries(S.secByDay || {})) out[k] = Math.round(sec / 60);
  S.minsByDay = out;
}
syncMinsMirror();
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
function markReadDay() {
  const k = todayKey();
  if (!S.readDays.includes(k)) S.readDays.push(k);
  if (S.readDays.length > 400) S.readDays = S.readDays.slice(-400);
  /* 备份提醒：阅读第 2 天起提示一次，7 天不重复——
     进度只存在本地浏览器，这是唯一的数据安全网（不做账号/云同步） */
  if (S.readDays.length >= 2 &&
      Date.now() - (S.backupHintAt || 0) > 7 * 86400000) {
    S.backupHintAt = Date.now(); save();
    setTimeout(() => toast("进度只存在这台浏览器 · 记得在「我的」里备份"), 1200);
  }
}

/* 把本次未落盘的阅读秒数结算进当日记录。
 * 记账时机是「持续」的：离开阅读页、换文章、页面隐藏/卸载、以及每累计 60 秒，
 * 而不是只在打卡那一下 —— 读了十分钟直接返回、关页、换文章原来统统不记账，
 * 重开还清零；反过来几乎没读就打卡，又被 Math.max(1,…) 硬记成一分钟。
 * 打卡从此只负责标记「读完了」。返回本次真正写入的秒数。 */
function flushReadTime() {
  const sec = readSecs - flushedSecs;
  if (sec <= 0) return 0;
  flushedSecs = readSecs;
  const k = todayKey();
  S.secByDay[k] = (S.secByDay[k] || 0) + sec;
  syncMinsMirror();
  markReadDay();      // 真的读了，就该算今天的阅读行为（连续天数不再只认打卡）
  save();
  return sec;
}

/* 阅读位置落盘：页面被切走/关闭时调一次，供下次打开直接回到原句。
 * 不放滚动节流里 —— 锚点要逐句量 getBoundingClientRect，长文（1500+ 句）每 5 秒量一遍
 * 会把滚动拖成幻灯片；细粒度位置丢失的风险由 5 秒一次的 scrollTop 兜着。 */
function flushReadPos() {
  const cont = $("#read-scroll");
  if (!cont || !cont.dataset || !S.lastRead || !S.lastRead.id) return 0;
  if (cont.dataset.art !== S.lastRead.id) return 0;
  updateReadProgress();
  S.lastRead.y = cont.scrollTop;
  S.lastRead.at = Date.now();
  rememberReadPos(cont, S.lastRead.id);
  save();
  return 1;
}

/* 连续阅读天数：从今天（今天还没读则从昨天）往前数连续有记录的天数（按北京日期） */
function readingStreakDays() {
  const set = new Set(S.readDays || []);
  const d = new Date();
  if (!set.has(ymdTZ(d))) d.setDate(d.getDate() - 1);
  let n = 0;
  while (set.has(ymdTZ(d))) { n++; d.setDate(d.getDate() - 1); }
  return n;
}

/* 考试日锚定北京时间当天零点（+08:00），对「真实的现在」求差——与宿主时区无关 */
const daysToExam = () => Math.max(0, Math.ceil((Date.parse(`${EXAM_DATE}T00:00:00+08:00`) - Date.now()) / 86400000));

/* 近 7 天（含今天）每天的阅读分钟数，没有记录的当天补 0 */
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

/* 常见词表（data-wordfreq.js，构建产物）：语料词频 f ≤ 2500 但**不在**学习词表里的词。
 * 必须单独存：学习词表主动剔除了 the / of / and 这类纯功能词，而它们恰恰占正文
 * 最多的 token。只有把 WORD_META（学习词的 f）和这张表合起来，才是完整的
 * 「f ≤ 2500」集合 —— 缺任何一半都会把一大片常见词误判成陌生。
 * 实测数据：只用学习词表，正文里有 53.7% 的 token 无处归类。 */
const COMMON_SET = typeof COMMON_WORDS === "undefined" ? null : COMMON_WORDS;
const COMMON_F = 2500;   // 与核心词库「语料高频」口径同一条线，两个数字互相对得上

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
  /* esc() 先把 & < > " 转成实体（&amp; / &lt; / &gt; / &quot;），分词时不能把它们
   * 当成普通文本：正则会把 &amp; 里的 amp 当成单词包上 span，
   * 变成 &<span>amp</span>; —— 浏览器认不出实体，页面上就原样显示 "&amp;"。
   * 实测于 Dan Koe 那篇的 "Buddhism & Christianity"。实体段整体跳过，其余照旧分词。 */
  return String(text).split(/(&(?:amp|lt|gt|quot);)/).map(seg =>
    /^&(?:amp|lt|gt|quot);$/.test(seg) ? seg
      : seg.replace(/[A-Za-z]+(?:['\u2018\u2019][A-Za-z]+)?/g, m => {
        const r = resolveToken(normApos(m).toLowerCase());
        if (!r) return m;
        if (r.kw) {
          const k = r.kw;
          return `<span class="kw${S.known.includes(k) ? ' known' : ''}" data-act="lookup" data-word="${k}">${m}</span>`;
        }
        return `<span class="tw" data-act="lookup" data-word="${r.w}">${m}</span>`;
      })
  ).join("");
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

/* ---------------- 文章难度指标 ----------------
 * 旧实现用「去重后的未认识词库词数 ÷ 正文总词数」当生词率 —— 分子分母量纲不同：
 * 同一个生词出现 20 次，分子只算 1；词库外的陌生词一个都不算。它既不能回答
 * 「这篇要背多少词」，也不能回答「读起来卡不卡」，却被同时拿去当难度标签和估时依据。
 * 现在拆成两个各自自洽的口径，各自回答一个问题：
 *
 *   needLearn   需要学习的词数：词库内、未标认识的词，按词形归一去重。
 *               偏向用户状态 —— 回答「这篇有多少个词要进生词本」。
 *   unknownRate 低频词出现的比例：分子分母都是 token，量纲一致。
 *               刻画文本**固有**难度 —— 回答「读起来卡不卡」，驱动难度标签与预计时长。
 *               刻意不掺 S.known：认识标记要用户手动打，新用户一个都没标，
 *               掺进去会让每篇都判成「困难」，标签失去区分度。
 *               ⚠️ 也正因为不掺 S.known，它**不是**「你还有多少词不认识」——
 *               你把全文的词都标了认识，这个百分比也不会降。所以对外只叫
 *               「低频词占比」，不叫「陌生词比例」，名实要对得上。
 *               想表达个人阅读难度，得再叠一层 S.known（那是 needLearn 的地盘）。
 *
 * 两个指标都必须走 resolveToken 归一：直接匹配原文会让 performing / performs 各算
 * 一个，也会漏掉 kids → kid 这类变形。
 *
 * 「低频」的判据是语料词频：词元 f ≤ 2500 视为四级读者大概率认识，更冷僻的才算低频。
 * 2500 不是新拍的线，就是核心词库自己「语料高频」那条线，两个口径互相对得上。
 * 词频来自两处，缺一不可：学习词的 f 在 WORD_META，词库外的常见词在 COMMON_SET
 * （学习词表主动剔除了 the / of / and 这类纯功能词，而它们恰是正文里占比最大的一批）。
 * 句中的大写词（人名、机构、品牌）一律不计 —— 那不是「生词」，计进去只会虚高。 */
const WORD_TOKEN_RE = /[A-Za-z]+(?:['\u2018\u2019][A-Za-z]+)?/g;

/* 正文用的是排版弯引号 ’，词形还原表却按直引号 ' 写的 —— 不归一，it’s 会被切成
 * it + s，凭空多出一个查不到的词，标色也会断在撇号上。
 * 只用于查表，不改动展示文本（英文正文禁改写）。 */
const normApos = t => t.replace(/[\u2018\u2019]/g, "'");

/* 词元是否属于「四级读者大概率认识」的常见词。
 * 两张表必须合起来查：学习词有 f 字段，词库外的常见词在 COMMON_SET 里，
 * 只用其中一张，正文里都会有一大片词无处归类。 */
const isCommonLemma = w => {
  const e = EC && EC[w];
  if (e && e.f) return e.f <= COMMON_F;
  return !!(COMMON_SET && COMMON_SET[w]);
};

/* 句中大写词（非句首、非标点后）视为专有名词 */
function isProperNoun(text, index, token) {
  if (!/^[A-Z]/.test(token)) return false;
  const before = text.slice(0, index).replace(/\s+$/, "");
  if (!before) return false;                          // 句首大写
  return !/[.!?]["'\u2019)\]]?$/.test(before);        // 标点后的大写仍按普通词计
}

function computeArticleMetrics(a) {
  const knownSet = new Set(S.known || []);
  const need = new Set();
  let tokens = 0, unknown = 0;
  textSentences(a).forEach(s => {
    const text = s && s.en;
    if (!text) return;
    WORD_TOKEN_RE.lastIndex = 0;
    let m;
    while ((m = WORD_TOKEN_RE.exec(text))) {
      tokens++;
      /* 专有名词只跳过这一个 token。这里必须用 continue 而不是 return ——
       * return 会直接结束整句的处理，句中出现人名后该句剩下的词统统漏统计。 */
      if (isProperNoun(text, m.index, m[0])) continue;
      const low = normApos(m[0]).toLowerCase();
      const r = resolveToken(low);
      /* 句首大写没法靠位置判断（The / This 也是句首大写），改用词典兜底：
       * 大写开头、且任何词典都查不到 → 判定为人名/机构名，不计入陌生词。 */
      if (!r && /^[A-Z]/.test(m[0])) continue;
      if (r && r.kw) {
        if (!knownSet.has(r.kw)) need.add(r.kw);        // 需学词数：词库内未标认识的词，去重
        if (!isCommonLemma(r.kw)) unknown++;            // 陌生占比：文本固有，与 known 无关
      } else if (!isCommonLemma(r && r.w ? r.w : low)) {
        unknown++;
      }
    }
  });
  return { words: tokens, needLearn: need.size, unknown, rate: tokens ? unknown / tokens : 0 };
}

/* 文章的纯文本句数（不含内嵌图） */
const sentCount = a => textSentences(a).filter(s => s.en).length;

/* ---------------- 词库顺序：词频爬坡 ----------------
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
 * 排序第一关键字是层而不是词频 —— 确保词库展示先基础后核心。
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
const MID_END = MID_WORDS.length;          // 基础层的结束位置（词库层级的分界点）

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

let view = { name: "home" };      // home | discover | me | history | read
let prevViewName = view.name;     // 上一次渲染的视图：判断「是否刚离开阅读页」（不依赖 DOM）
let activeArticle = null;
let catFilter = "全部";
let searchTerm = "";
let historyFilter = "all";
let historyQuery = "";
/* 阅读页状态：计时器 + 本篇查询过的生词数 */
let readSecs = 0, readTimer = null;
let flushedSecs = 0;  // readSecs 里已经写进 secByDay 的部分（避免重复记账）
/* 阅读中收到 SW 的「内容已更新」时置位；退出阅读页后据此真正刷新一次。
 * 原来只弹个 toast 就完事，返回首页仍是内存里的旧文章。 */
let pendingUpdate = false;
let LAST_Y = 0;   // 当前阅读滚动位置（updateReadProgress 实时更新，节流落盘）
let resumeY = 0;  // 打开文章那一刻要恢复的位置（消费一次即清零）
/* 打开文章时优先用它还原：本篇存过的句子锚点（{pi,si,off}）。
 * resumeY 是旧的「纯 scrollTop」口径，只作兜底 —— 两篇之间来回切时，
 * 字号不同/对照开关不同都会让 scrollTop 指错句子。 */
let resumeAnchor = null;
let sheetMore = false;  // 查词卡是否处于「更多」展开态（关卡即复位）
/* 例句库（data-examples.js，560KB）按需加载状态：
 * idle 还没取 | loading 正在取 | ready 词已灌进 WORDS | failed 取到了但没数据 */
let exState = "idle";
let exPromise = null;   // 复用的加载 Promise：连续查词只插一次 script
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
  "成长":   { icon: "sun",     bg: "linear-gradient(135deg,#34D399,#059669)" }
};

/* 文章指标按篇缓存：排序与渲染要反复取，避免每次重扫全文。
 * known / 生词本变化时由 clearArticleCaches() 整表失效。 */
const STATS_CACHE = new Map();
function articleStats(a) {
  if (!STATS_CACHE.has(a.id)) STATS_CACHE.set(a.id, computeArticleMetrics(a));
  return STATS_CACHE.get(a.id);
}
/* 需要学习的词数：去重口径，回答「要过几遍生词表」 */
const hitsOf = a => articleStats(a).needLearn;
/* 低频词出现占比：token 口径，回答「读起来卡不卡」（不掺用户认识状态） */
const unknownRateOf = a => articleStats(a).rate;

/* 难度四档：阈值贴着「低频词占全部 token 的比例」定 ——
 * 口径是「出现次数占比」而不是「不同词占比」：同一个生词在文中出现 5 次就按 5 次
 * 计入，因为它确实把阅读打断过 5 次。wpm 随之递减，用作预计时长的除数。
 * 阈值依据当前语料实测分布标定（19 篇：12.9% ~ 30.7%，中位 15.6%），四档分布
 * 4 / 8 / 5 / 2 篇。语料结构变化（比如新闻类占比升高）后需要重新标定。 */
const DIFF_TIERS = [
  { max: 0.12, label: "轻松", wpm: 150 },
  { max: 0.17, label: "合适", wpm: 120 },
  { max: 0.24, label: "稍难", wpm: 95 },
  { max: Infinity, label: "困难", wpm: 75 },
];
const diffTier = rate => DIFF_TIERS.find(t => rate <= t.max) || DIFF_TIERS[DIFF_TIERS.length - 1];
const estMinutes = a => {
  const st = articleStats(a);
  return Math.max(1, Math.round(st.words / diffTier(st.rate).wpm));
};
const clearArticleCaches = () => { STATS_CACHE.clear(); };

/* 文章推荐 ClientScore v1：规则透明、只读本地行为。
 * 未读优先；篇幅与难度落在可读区间时加分；完成页的反馈只影响相同栏目和来源，
 * 避免一次对某篇文章的偏好把全站推荐拉偏。负反馈强降权，正反馈适度加权。 */
function clientScore(a) {
  const st = articleStats(a);
  let score = S.read.includes(a.id) ? -6 : 8;
  /* 新抓文章带服务端初始分；旧文章没有该字段时保持原有排序口径。 */
  const server = Number(a.serverScore);
  if (Number.isFinite(server)) score += (server - 50) / 10;
  /* 低频词占比落在「合适」档最理想；「轻松」档对备考收益低，只给一点点 */
  if (st.rate <= DIFF_TIERS[1].max) score += st.rate > DIFF_TIERS[0].max ? 3 : 1;
  /* 3–12 分钟是一口气能读完、又不至于太浅的区间 */
  const mins = estMinutes(a);
  if (st.words > 0 && mins >= 3 && mins <= 12) score += 2;

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
const SORTS = { new: "最新发布", words: "需学最多", short: "时长最短" };
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
  const need = hitsOf(a);
  const needLbl = need > 200 ? "200+" : need;
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
      <span class="meta">${esc(srcName(a))} · ${estMinutes(a)} 分钟 · 需学 ${needLbl} 词 · 低频词 ${(unknownRateOf(a) * 100).toFixed(0)}%</span>
    </div>
  </div>`;
};

/* ---------------- 页面：首页 ---------------- */
/* 今日推荐：未读优先 + 需学词数落在可读区间 + 相邻分类轮换。
 *
 * 池子按天缓存。「换一批」只把位置在池内向后推一页，绝不重建池子 ——
 * 旧实现有两个反向的毛病：渲染函数每次调用都会推进位置（于是打卡、收藏、
 * 返回首页都会偷偷把推荐位换掉），而「换一批」反而重建池子并归零
 * （于是又回到刚看过的那两篇，等于没换）。现在渲染只读，翻页是独立动作。 */
const HOME_PAGE = 2;
let homeReads = { day: "", pool: [], off: 0 };

function diversifyCats(pool) {
  const out = [], rest = pool.slice();
  while (rest.length) {
    const i = rest.findIndex(a => !out.length || a.cat !== out[out.length - 1].cat);
    out.push(rest.splice(i < 0 ? 0 : i, 1)[0]);
  }
  return out;
}

function buildHomePool() {
  const unread = ARTICLES.filter(a => !S.read.includes(a.id));
  const base = unread.length >= 2 ? unread : ARTICLES.slice();
  const scored = base.map(a => {
    const m = articleStats(a);
    /* 两个口径各自加分：要学的词数落在「一天能消化」的区间，且低频词占比没到劝退档。
     * 需学词数与篇幅强相关，实测 45 ~ 745、中位 114，所以区间取 40–200 覆盖中段，
     * 把「一屏几百个生词」的长文让给发现页，别占今日推荐位。 */
    const s = clientScore(a)
      + (m.needLearn >= 40 && m.needLearn <= 200 ? 2 : 0)
      + (m.rate <= DIFF_TIERS[1].max ? 1 : 0);
    return { a, s };
  });
  scored.sort((x, y) => y.s - x.s);
  homeReads.pool = diversifyCats(scored.map(x => x.a));
  homeReads.off = 0;
}

function ensureHomePool() {
  const day = todayKey();
  if (homeReads.day !== day || !homeReads.pool.length) {
    homeReads.day = day;
    buildHomePool();
  }
}

/* 只读：返回当前这一页，不推进位置。环形取页，池子末尾自动接回开头 */
function pickDailyReads() {
  ensureHomePool();
  const pool = homeReads.pool;
  if (!pool.length) return [];
  const size = Math.min(HOME_PAGE, pool.length);
  return Array.from({ length: size }, (_, i) => pool[(homeReads.off + i) % pool.length]);
}

/* 「换一批」：只推进位置，不重建池子，下一页确实是没看过的那两篇 */
function rerollDailyReads() {
  ensureHomePool();
  const n = homeReads.pool.length;
  if (n) homeReads.off = (homeReads.off + HOME_PAGE) % n;
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
        <span class="chip">需学 ${hitsOf(featured)} 词</span>
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
function touchReadHistory(id) {
  if (!id) return;
  S.readHistory = S.readHistory || {};
  const now = Date.now();
  const prev = S.readHistory[id] || {};
  const article = ARTICLES.find(a => a.id === id);
  S.readHistory[id] = {
    firstAt: Number(prev.firstAt) || now,
    lastAt: now,
    visits: (Number(prev.visits) || 0) + 1,
    finished: S.finished.includes(id),
    title: article ? article.title : (prev.title || ""),
    titleZh: article ? article.titleZh : (prev.titleZh || ""),
    cat: article ? article.cat : (prev.cat || ""),
    source: article ? article.source : (prev.source || ""),
    coverImg: article ? article.coverImg : (prev.coverImg || ""),
    gradient: article ? article.gradient : (prev.gradient || "linear-gradient(135deg,#d9d2ff 0%,#6c5ce7 100%)"),
  };
}

function historyItems() {
  const ids = new Set([
    ...Object.keys(S.readHistory || {}),
    ...Object.keys(S.readPos || {}),
    ...(S.read || []),
    ...(S.finished || []),
  ]);
  return [...ids].map(id => {
    const meta = (S.readHistory || {})[id] || {};
    const live = ARTICLES.find(x => x.id === id);
    const a = live || (meta.title ? {
      id,
      title: meta.title,
      titleZh: meta.titleZh || "",
      cat: meta.cat || "",
      source: meta.source || "",
      coverImg: meta.coverImg || "",
      gradient: meta.gradient || "linear-gradient(135deg,#d9d2ff 0%,#6c5ce7 100%)",
    } : null);
    if (!a) return null;
    const pos = (S.readPos || {})[id] || {};
    const last = S.lastRead && S.lastRead.id === id ? S.lastRead : {};
    return {
      a,
      pos: Object.assign({}, pos, last),
      firstAt: Number(meta.firstAt) || Number(pos.at) || Number(last.at) || 0,
      lastAt: Number(meta.lastAt) || Number(pos.at) || Number(last.at) || 0,
      visits: Number(meta.visits) || 1,
      finished: S.finished.includes(id) || meta.finished === true,
      archived: !live,
    };
  }).filter(Boolean).sort((x, y) => y.lastAt - x.lastAt);
}

function historyWhen(ts) {
  return ts ? fmtWhen(new Date(ts).toISOString().slice(0, 10)) : "时间未知";
}

function renderReadHistory() {
  const q = historyQuery.trim().toLowerCase();
  const all = historyItems();
  const filtered = all.filter(x => {
    if (historyFilter === "unfinished" && x.finished) return false;
    if (historyFilter === "finished" && !x.finished) return false;
    if (!q) return true;
    return [x.a.title, x.a.titleZh, x.a.cat, x.a.source].some(v => String(v || "").toLowerCase().includes(q));
  });
  const seg = (value, label) => `<button class="history-filter${historyFilter === value ? " on" : ""}" data-act="history-filter" data-filter="${value}" aria-pressed="${historyFilter === value}">${label}</button>`;
  const rows = filtered.map(x => {
    const pct = Math.max(0, Math.min(100, Number(x.pos.pct) || 0));
    const status = x.archived ? "文章已下线" : (x.finished ? "已读完" : (pct ? `读到 ${pct}%` : "刚开始"));
    const action = x.archived ? "" : ` data-article="${esc(x.a.id)}"`;
    return `<button class="history-row${x.archived ? " archived" : ""}"${action} aria-label="${x.archived ? "已下线：" : "继续阅读："}${esc(clean(x.a.title))}"${x.archived ? " disabled" : ""}>
      ${thumbHtml(x.a, coverOf(x.a))}
      <span class="history-main">
        <span class="history-title">${esc(clean(x.a.title))}</span>
        ${zhTitle(x.a) ? `<span class="history-zh">${esc(zhTitle(x.a))}</span>` : ""}
        <span class="history-meta">${esc(x.a.cat)} · ${esc(historyWhen(x.lastAt))} · ${x.visits} 次阅读</span>
        <span class="history-progress"><span style="width:${x.finished ? 100 : Math.max(2, pct)}%"></span></span>
        <span class="history-status">${status}${x.archived ? "" : `<b>继续阅读 ${svg("arrow", 12)}</b>`}</span>
      </span>
    </button>`;
  }).join("");
  return `${statusbar()}
    <div class="view view-flow history-view">
      <div class="row between">
        <span class="h1">阅读记录</span>
        <span class="icon-btn" data-act="go-back" role="button" tabindex="0" aria-label="返回">${svg("back", 16)}</span>
      </div>
      <div class="search history-search">${svg("search", 16)}<input id="history-q" placeholder="搜索读过的文章" value="${esc(historyQuery)}" aria-label="搜索读过的文章" /></div>
      <div class="history-filters">${seg("all", "全部")} ${seg("unfinished", "未读完")} ${seg("finished", "已读完")}<span class="muted-2">共 ${all.length} 篇</span></div>
      ${rows || `<div class="card history-empty">${all.length ? "没有符合条件的记录" : "还没有阅读记录，先去发现页读一篇吧"}</div>`}
    </div>`;
}

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

      <button class="card row history-entry" data-act="read-history" aria-label="打开阅读记录">
        <span class="ic">${svg("book", 20)}</span>
        <span class="col grow" style="gap:3px"><span class="h3">阅读记录</span><span class="muted">${historyItems().length} 篇读过的文章 · 查看每篇进度并继续阅读</span></span>
        ${svg("arrow", 16)}
      </button>

      ${installEvt ? `<button class="btn-primary" data-act="pwa-install" style="width:100%">${svg("check", 16)} 添加到主屏幕</button>` : ""}
      ${(typeof navigator !== "undefined" && /iP(hone|ad|od)/.test(navigator.userAgent) && !window.navigator.standalone) ? `<div class="muted-2" style="font-size:12px">iPhone/iPad：用 Safari 的分享菜单 → 「添加到主屏幕」，即可全屏离线使用</div>` : ""}

      <div class="card col" style="gap:12px">
        <div class="row between"><span class="h2">阅读总览</span><span class="muted-2">近 7 天</span></div>
        <div class="stat-grid">
           <div class="stat"><div class="n">${readingStreakDays()}</div><div class="l">连续阅读天</div></div>
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
        <div class="notebook-row" data-act="lookup" data-word="${w.word}">
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
        当前收录成长主题英文文章，版权归原媒体和作者所有，可一键打开原文核对。
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
  const fsCls = ["fs-0", "fs-1", "fs-2"][S.fontSize] || "fs-0";
  const cover = coverOf(a);
  const total = sentCount(a);
  const st = articleStats(a);
  const tier = diffTier(st.rate);
  const ratePct = (st.rate * 100).toFixed(0);
  const dur = estMinutes(a);
  const aZh = zhTitle(a);
  const hits = hitsOf(a);
  const hitsLbl = hits > 999 ? "999+" : hits;
  const looked = LOOKED[a.id] || 0;
  /* 本次会话读了多久（不是「今日累计」）；不足一分钟就如实显示，不再硬凑成 1 */
  const minsNow = Math.floor(readSecs / 60);
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

  const paras = a.paras.map((p, i) => {
    /* 内嵌配图：图注也走点词层，读者可以直接查人物、年代和动作词。 */
    if (p.img) {
      const cap = clean(p.cap || "");
      const capCn = clean(p.capCn || "");
      return `<figure class="para-img">
        <img src="${esc(p.img)}" alt="" loading="lazy" />
        ${cap ? `<figcaption aria-label="图片说明">${highlightEn(esc(cap))}${capCn ? `<span class="caption-cn">${esc(capCn)}</span>` : ""}</figcaption>` : ""}
      </figure>`;
    }
    /* 一段话 = 一个文本流：句子是内联 span，句间只有一个空格。
     * 旧写法每句一个块级 div，段落被拆成竖排清单（句间 10px 空隙 + 2px 间距），
     * 英文再长也只在句末换行，视觉上「一句一行」。 */
    const parts = sentencesOf(p).map((s, si) => {
      const enText = clean(s.en);
      const cnText = clean(s.cn);
      if (!enText && !cnText) return "";        // 两端都空的句子不占位置
      const en = highlightEn(esc(enText));
      return `<span class="sentence" data-act="para-peek" data-pi="${i}" data-si="${si}" role="button" tabindex="0" aria-label="选择这一句（可听朗读）">${en}<span class="para-tts" data-act="para-speak" data-pi="${i}" data-si="${si}" role="button" tabindex="0" title="读这一句" aria-label="读这一句">${svg("speaker", 13)}</span>${cnText ? `<span class="cn">${esc(cnText)}</span>` : ""}</span>`;
    }).filter(Boolean);
    if (!parts.length) return "";
    return `<p class="para">${parts.join(" ")}</p>`;
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

    <div class="view read-scroll ${fsCls}${S.showCn ? "" : " no-cn"}" id="read-scroll" data-art="${esc(a.id)}">
      <div class="read-hero">
        <h1 class="title">${esc(clean(a.title))}</h1>
        ${aZh ? `<div class="title-zh">${esc(aZh)}</div>` : ""}
        <div class="byline">
          <span>${esc(clean(a.cat))}</span><span class="dot"></span><span>${esc(srcName(a))}</span>
          <span class="dot"></span><span>${dur} 分钟 · ${tier.label}</span>
          <span class="dot"></span><span>需学 ${hitsLbl} 词 · 低频词 ${ratePct}%</span>
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
          <span class="st-chip"><b>${hitsLbl}</b><i>个需学词</i></span>
          <span class="st-chip"><b>${looked}</b><i>次查询</i></span>
          <span class="st-chip"><b>${minsNow >= 1 ? minsNow : "<1"}</b><i>分钟读过</i></span>
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
      <button data-act="read-settings" class="${S.fontSize > 0 || S.readTheme ? 'active' : ''}" title="阅读设置" aria-label="阅读设置（字号 / 对照 / 底色）"><span class="fab-aa">Aa</span></button>
      <button data-act="fab-more" title="更多工具" aria-label="更多工具"><span style="font-family:var(--font-num);font-weight:700;letter-spacing:1px">···</span></button>
    </div>
  `;
}

/* 阅读设置浮层：字号 / 中文对照 / 底色 三组「直接点选」。
 * 旧版只有一个字号按钮，点一下循环切一档、还弹 toast 报当前档位 —— 想回到上一档
 * 得再点两下，也不知道后面还有几档。这里把三档摊开，选之前就看到全部选项。
 * 面板打开期间改动即时作用于正文，不重渲染、不丢阅读位置。 */
function renderReadSettingsSheet() {
  const seg = (act, key, val, label, on) =>
    `<button class="rd-seg${on ? " on" : ""}" data-act="${act}" data-${key}="${esc(val)}" aria-pressed="${on}">${esc(label)}</button>`;
  return `
    <div class="sheet-mask soft" data-act="close-sheet"></div>
    <div class="sheet" role="dialog" aria-label="阅读设置">
      <div class="grip"></div>
      <div class="row between">
        <span class="h2">阅读设置</span>
        <span class="muted-2">改动即时生效并记住</span>
      </div>
      <div class="rd-set">
        <div class="rd-row"><span class="rd-lab">字号</span>
          <div class="rd-segs">
            ${seg("set-fs", "fs", 0, "标准", S.fontSize === 0)}
            ${seg("set-fs", "fs", 1, "大", S.fontSize === 1)}
            ${seg("set-fs", "fs", 2, "特大", S.fontSize === 2)}
          </div>
        </div>
        <div class="rd-row"><span class="rd-lab">中文对照</span>
          <div class="rd-segs">
            ${seg("set-cn", "cn", 1, "逐句显示", S.showCn)}
            ${seg("set-cn", "cn", 0, "隐藏", !S.showCn)}
          </div>
        </div>
        <div class="rd-row"><span class="rd-lab">底色</span>
          <div class="rd-segs">
            ${seg("set-theme", "theme", "default", "亮色", S.readTheme === "")}
            ${seg("set-theme", "theme", "paper", "纸张", S.readTheme === "paper")}
            ${seg("set-theme", "theme", "night", "夜间", S.readTheme === "night")}
          </div>
        </div>
      </div>
    </div>`;
}

/* 「···」更多工具面板：低频功能收进来，阅读页保持安静 */
function renderFabSheet() {
  const a = activeArticle;
  return `
    <div class="sheet-mask" data-act="close-sheet"></div>
    <div class="sheet" role="dialog" aria-label="阅读工具">
      <div class="grip"></div>
      <div class="col" style="gap:8px">
        <button class="sheet-item" data-act="read-all">${svg("speaker", 16)} 朗读全文</button>
        <button class="sheet-item" data-act="article-notebook">${svg("bookmark", 16)} 本篇生词本</button>
        ${a.url ? `<a class="sheet-item" href="${esc(a.url)}" target="_blank" rel="noopener">${svg("arrow", 16)} 查看原文</a>` : ""}
      </div>
    </div>`;
}

/* 阅读中查看本篇已收藏的生词：bottom sheet，不离开文章 */
function renderArticleNotebookSheet() {
  const a = activeArticle;
  /* 按「词」匹配，不是按子串。原先用 text.includes(w)：收藏了 art，正文里的 party
   * 会把 art 误收进来；收藏了 go，正文只出现 went 又漏掉。
   * 这里复用查词那套分词 + 词形还原：正文每个 token 的词元与词库词都进集合，
   * 生词本里的词（原形或变形）只要在集合里就算本篇命中。 */
  const present = new Set();
  textSentences(a).forEach(s => {
    const text = s && s.en;
    if (!text) return;
    WORD_TOKEN_RE.lastIndex = 0;
    let m;
    while ((m = WORD_TOKEN_RE.exec(text))) {
      const low = normApos(m[0]).toLowerCase();
      present.add(low);
      const r = resolveToken(low);
      if (r && r.kw) present.add(r.kw);
      if (r && r.w) present.add(r.w);
    }
  });
  const words = (S.notebook || []).filter(w => {
    const low = normApos(String(w)).toLowerCase();
    if (present.has(low)) return true;
    const r = resolveToken(low);
    return !!(r && ((r.kw && present.has(r.kw)) || (r.w && present.has(r.w))));
  });
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

/* ---------------- 阅读位置：句子锚点 ----------------
 * 只存 scrollTop 是不够的。字号从 19px 调到 24px、或把中文对照展开，正文高度立刻变，
 * 同一个 scrollTop 就落到别的句子上 —— 这就是「调完字号/展开译文要找半天原句」的根因。
 * 所以这里记的是「哪一句 + 它当时在屏幕上的位置」：
 *   pi/si  句子在文章里的坐标（paras[pi] 的第 si 句）
 *   off    该句顶部相对滚动容器视口的偏移（负数 = 在视口上方）
 * 排版变化后按这两个数把同一句放回原来的屏幕位置，与字号、对照开关无关。
 *
 * 锚线取视口上部约 1/4：那里是「正在读的那句」的位置，
 * 比顶部 0 更稳（顶部常落在上一段末句或段间空白上）。 */

/* 当前句 = 第一个底边越过锚线的句子（它正在被读）。 */
function readAnchor(cont) {
  if (!cont || !cont.querySelectorAll || !cont.getBoundingClientRect) return null;
  const sents = cont.querySelectorAll(".sentence[data-pi]");
  if (!sents || !sents.length) return null;
  const cTop = cont.getBoundingClientRect().top;
  const line = cTop + Math.min(140, Math.max(48, (cont.clientHeight || 600) * 0.22));
  let cur = sents[sents.length - 1];
  for (const el of sents) {
    const r = el.getBoundingClientRect();
    if (r.bottom > line) { cur = el; break; }
  }
  const r = cur.getBoundingClientRect();
  return { pi: +cur.dataset.pi || 0, si: +cur.dataset.si || 0, off: r.top - cTop };
}

/* 把锚点里的那一句放回记录时的屏幕位置（scrollTop += 需要的位移）。 */
function applyAnchor(cont, a) {
  if (!cont || !a || !cont.querySelector || !cont.getBoundingClientRect) return false;
  const el = cont.querySelector(`.sentence[data-pi="${a.pi}"][data-si="${a.si}"]`);
  if (!el) return false;
  const delta = (el.getBoundingClientRect().top - cont.getBoundingClientRect().top) - a.off;
  if (delta) cont.scrollTop += delta;
  return true;
}

/* 每篇文章各存一份：A 篇读到第 30 段、B 篇读到第 5 段，互不覆盖。
 * 顺带把 scrollTop/pct 也写进去，续读卡片（首页/发现页）继续读老字段。 */
function rememberReadPos(cont, artId) {
  const id = artId || (activeArticle && activeArticle.id);
  if (!id || !cont) return null;
  const anc = readAnchor(cont);
  const prev = (S.readPos && S.readPos[id]) || {};
  const rec = {
    pi: anc ? anc.pi : (prev.pi || 0),
    si: anc ? anc.si : (prev.si || 0),
    off: anc ? anc.off : (prev.off || 0),
    y: cont.scrollTop || 0,
    pct: S.lastRead && S.lastRead.id === id ? (S.lastRead.pct || 0) : (prev.pct || 0),
    at: Date.now(),
  };
  S.readPos = S.readPos || {};
  S.readPos[id] = rec;
  S.readHistory = S.readHistory || {};
  const meta = S.readHistory[id] || {};
  S.readHistory[id] = {
    firstAt: Number(meta.firstAt) || rec.at,
    lastAt: rec.at,
    visits: Number(meta.visits) || 1,
    finished: S.finished.includes(id),
  };
  return rec;
}

/* ---------------- 阅读设置：改完把原句放回原位 ----------------
 * 字号 / 对照 / 底色都是即时生效（不重渲染整页），所以滚动位置不会被打回顶部。
 * 但字号与对照会改变正文高度，光「不动 scrollTop」依旧会漂 —— 改前先抓锚点，
 * 改后把同一句按原偏移放回去。 */
function applyReadClasses(cont) {
  if (cont && cont.classList) {
    cont.classList.toggle("no-cn", !S.showCn);
    [0, 1, 2].forEach(n => cont.classList.toggle(`fs-${n}`, S.fontSize === n));
  }
  const screen = $("#screen");
  if (screen) screen.className = "screen rt-" + (S.readTheme || "default");
}

function changeReadSetting(mut) {
  const cont = $("#read-scroll");
  if (!cont) { mut(); save(); return; }
  const anchor = readAnchor(cont);
  mut();
  applyReadClasses(cont);
  save();
  if (anchor) requestAnimationFrame(() => { applyAnchor(cont, anchor); updateReadProgress(); });
  else updateReadProgress();
}

/* 设置面板开着的时候，把选中态同步到面板上（面板不关，方便连着比几档）。 */
function syncReadSettingsSheet(kind, val) {
  const root = $(".phone > .sheet");
  if (!root || !root.querySelectorAll) return;
  const attr = kind === "theme" ? "data-theme" : `data-${kind}`;
  [...root.querySelectorAll(".rd-seg")].forEach(b => {
    if (!b.hasAttribute || !b.hasAttribute(attr)) return;
    const on = b.getAttribute(attr) === String(val);
    b.classList.toggle("on", on);
    b.setAttribute("aria-pressed", String(on));
  });
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
    S.lastRead.y = LAST_Y;
    S.lastRead.pct = Math.round(pct);
    if (Date.now() - (S.lastRead.at || 0) > 5000) {
      S.lastRead.at = Date.now();
      const meta = (S.readHistory || {})[a.id];
      if (meta) meta.lastAt = S.lastRead.at;
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
      const wrapped = j && typeof j === "object" && Object.prototype.hasOwnProperty.call(j, "state");
      if (wrapped && j.app !== "wordlens") throw new Error("不是词阅备份");
      const st = wrapped ? j.state : j;
      if (!st || typeof st !== "object" || Array.isArray(st)) throw new Error("格式不对");
      const knownKeys = ["theme", "notebook", "showCn", "fontSize", "readTheme", "read", "finished", "known", "readDays", "secByDay", "minsByDay", "lastRead", "readPos", "readHistory", "articleFeedback"];
      if (!knownKeys.some(k => Object.prototype.hasOwnProperty.call(st, k))) throw new Error("不是有效进度");
      S = normalizeState(st);
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

/* ---------------- 例句按需加载 ----------------
 * 例句库 data-examples.js 有 560KB，此前是首屏 script —— 但它只在词卡「更多」
 * 展开后才可能被看到（轻卡只有词/音标/短释义）。实测它不参与任何计算：
 * example / exampleCn 无人读，被覆盖的 w.source 也只有词卡 chip 读，
 * 摘掉后 19 篇的需学词数、低频词占比、难度档、估时逐篇不变（audit 的 [G8] 钉住）。
 *
 * 加载策略：
 *   · 同一个 Promise 复用——连续查几个词只插一个 script，不会重复请求；
 *   · 网络失败（script 未执行）清空缓存，允许重试；
 *   · script 进来了但数据没灌上（执行期出错）判为 failed 且不再重插——
 *     重复插入会撞上它顶层的 const WORD_EXAMPLES 重复声明，只会刷一屏 SyntaxError。
 */
const EXAMPLES_FILE = "assets/data-examples.js";
/* 词是否已经灌进 WORDS：data-examples.js 收尾会写 __ADDED_EXAMPLES__。
 * 以它为准而不是只看 exState —— 脚本可能已由别的途径执行过（旧页面缓存、
 * 测试沙箱直接求值），这时再插一次 tag 只会撞 const 重复声明。 */
const examplesReady = () => exState === "ready" || typeof window.__ADDED_EXAMPLES__ === "number";

function ensureExamples() {
  if (examplesReady()) return Promise.resolve(true);
  if (exState === "failed") return Promise.resolve(false);
  if (exPromise) return exPromise;
  exState = "loading";
  exPromise = new Promise(resolve => {
    const s = document.createElement("script");
    /* 版本号跟着主脚本走（app.js 自己是 assets/app.js?v=44），省得换 ?v= 时要改两处，
       也避免例句库与其余资源版本脱钩。取值失败就不带 query，靠 SWR + ETag 协商。 */
    const m = document.currentScript && String(document.currentScript.src).match(/[?&]v=([^&]+)/);
    s.src = EXAMPLES_FILE + (m ? "?v=" + m[1] : "");
    s.onload = () => {
      exState = typeof window.__ADDED_EXAMPLES__ === "number" ? "ready" : "failed";
      resolve(exState === "ready");
    };
    s.onerror = () => {
      s.remove();
      exState = "idle"; exPromise = null;      // 清掉，下次查词可重试
      resolve(false);
    };
    document.head.appendChild(s);
  });
  return exPromise;
}

/* 例句框：词卡渲染与加载回填共用这一段 —— 两处各写一份必然会走形 */
const exampleBoxHTML = w => `<div class="example-box">
        <span class="chip" style="align-self:flex-start">${esc(w.source || '')}</span>
        ${w.example ? `<div class="en">${hlWord(w.example, w.word)}</div>` : ''}
        ${w.exampleCn ? `<div class="cn">${esc(w.exampleCn)}</div>` : ''}
      </div>`;

const exFailedHTML = word =>
  `<span class="ex-hint">例句没能加载</span><button class="mini-btn" data-act="retry-examples" data-word="${esc(word)}">重试</button>`;

/* 词卡里的例句槽：已有例句（词库自带 / 上次已灌入）直接渲染，否则给占位等回填。
 * 占位带 data-example-word —— fillSheetExample 靠它定位，也是竞态隔离的关键。 */
const exSlotHTML = w => (w.example || w.exampleCn)
  ? exampleBoxHTML(w)
  : `<div class="example-box loading" data-example-word="${esc(w.word)}">` +
  (exState === "failed" ? exFailedHTML(w.word) : `<span class="ex-hint">例句按需加载中…</span>`) +
  `</div>`;

/* 把例句就地上到当前词卡上：只替换那一个占位元素，不重渲整张卡
 * （重渲会让用户正盯着的按钮闪一下）。用 data-example-word 找元素，
 * 卡已关 / 已换词时自然找不到 —— 这就是竞态隔离：加载期间换了词，
 * 旧词的回填找不到自己的槽位，不会插到新词的卡上。 */
function fillSheetExample(word) {
  const holder = $(`.example-box[data-example-word="${word}"]`);
  if (!holder) return;
  const w = WORDS.find(x => x.word === word);
  if (!w || !(w.example || w.exampleCn)) { holder.remove(); return; }   // 这词本来就没例句
  holder.outerHTML = exampleBoxHTML(w);
}

function attachExample(word) {
  if (examplesReady()) { fillSheetExample(word); return; }   // 已就绪：同步补上
  ensureExamples().then(ok => {
    if (ok) { fillSheetExample(word); return; }
    const h = $(`.example-box[data-example-word="${word}"]`);
    if (h) h.innerHTML = exFailedHTML(word);   // 失败：占位换成可重试，查词本身照常可用
  });
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
      ${exSlotHTML(w)}
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
  const cur = view.name === "history" ? "me" : (["home", "discover", "me"].includes(view.name) ? view.name : "home");
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
  /* 同篇重渲染要按「句子锚点」还原：字号/对照一变正文高度就变，纯 scrollTop 会漂到别的句子 */
  const prevAnchor = prevRead ? readAnchor(prevRead) : null;
  /* 离开阅读页：把最后位置落盘（换文场景 openArticle 已重置 lastRead，id 对不上不会覆盖）。
   * 每篇各存一份锚点：A 篇读一半跑去读 B 篇，再回 A 篇还是接着原句。 */
  if (prevRead && view.name !== "read" && S.lastRead && S.lastRead.id === prevRead.dataset.art) {
    S.lastRead.y = LAST_Y; S.lastRead.at = Date.now();
    rememberReadPos(prevRead, S.lastRead.id);
    save();
  }
  /* 「是否刚离开阅读页」用上一次渲染的视图判断，不依赖 DOM 探针：
   * #screen .read-scroll 可能因为任何原因不在（重渲染时序、兜底渲染），
   * 而「刚才在读、现在不在读」这个事实在视图层是确定的。 */
  const leftRead = prevViewName === "read" && view.name !== "read";
  prevViewName = view.name;
  if (leftRead) {
    flushReadTime();      // 结算阅读时长：读了十分钟直接返回也要记账
    /* 阅读期间收到过内容更新 → 这一该刻才真正刷新。
     * 先 return 不渲染：免得先绘一屏旧内容再被 reload 掉，闪一下。 */
    if (pendingUpdate) {
      pendingUpdate = false;
      toast("内容已更新，正在刷新…");
      setTimeout(() => location.reload(), 300);
      return;
    }
  }
  const screen = $("#screen");
  let body = "";
  if (view.name === "home") body = renderHome();
  else if (view.name === "discover") body = renderDiscover();
  else if (view.name === "me") body = renderMe();
  else if (view.name === "history") body = renderReadHistory();
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
      /* 每累计 60 秒落一次盘：崩溃/被杀最多丢 1 分钟，不用等用户打卡 */
      if (readSecs - flushedSecs >= 60) flushReadTime();
    }, 1000);
    const cont = $("#read-scroll");
    if (cont) {
      cont.addEventListener("scroll", updateReadProgress, { passive: true });
      /* 同一篇文章的重渲染：优先按句子锚点还原（排版变了也对得回原句），
         锚点拿不到才退回旧口径 scrollTop */
      if (prevArt && cont.dataset.art === prevArt && (prevAnchor || prevScroll)) {
        if (!(prevAnchor && applyAnchor(cont, prevAnchor))) cont.scrollTop = prevScroll;
        LAST_Y = cont.scrollTop;
        updateReadProgress();
      }
      /* 续读：打开文章那一刻消费一次。优先用本篇存的句子锚点，
         没有锚点（老数据）才用 resumeY 这个 scrollTop 兜底。 */
      if (cont.dataset.art === activeArticle.id && resumeAnchor) {
        if (!applyAnchor(cont, resumeAnchor)) cont.scrollTop = resumeY;
        LAST_Y = cont.scrollTop;
      } else if (resumeY && cont.dataset.art === activeArticle.id) {
        cont.scrollTop = resumeY; LAST_Y = resumeY;
      }
      resumeY = 0; resumeAnchor = null;
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
  if (view.name === "history") {
    const q = $("#history-q");
    if (q) {
      q.addEventListener("input", e => {
        historyQuery = e.target.value; render();
        const n = $("#history-q"); if (n) { n.focus(); n.setSelectionRange(n.value.length, n.value.length); }
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
    if (!activeArticle) return;
    touchReadHistory(activeArticle.id);
    readSecs = 0; flushedSecs = 0;   // 进入新文章，计时清零（上一篇的秒数已由 render 结算）
    LOOKED[activeArticle.id] = 0;  // 本篇查询清零
    /* 「上次读到」：换文重置进度；重进同一篇则保留位置（resumeAnchor/resumeY 在渲染后恢复一次）。
     * 锚点按文章 id 各存各的 —— 在 A、B 两篇之间来回切，都回到各自读到的那一句。 */
    resumeY = (S.lastRead && S.lastRead.id === activeArticle.id) ? (S.lastRead.y || 0) : 0;
    const savedPos = (S.readPos || {})[activeArticle.id];
    resumeAnchor = (savedPos && Number.isFinite(savedPos.pi)) ? { pi: savedPos.pi, si: savedPos.si || 0, off: savedPos.off || 0 } : null;
    const savedPct = savedPos && Number.isFinite(Number(savedPos.pct)) ? Number(savedPos.pct) : 0;
    S.lastRead = { id: activeArticle.id, y: resumeY, pct: savedPct, at: Date.now() };
    save();
    view = { name: "read" };
    render(); return;
  }

  if (t.dataset.cat) {
    catFilter = t.dataset.cat; shown = PAGE;
    if (view.name === "home" || t.dataset.go === "1") { pushNav(); view = { name: "discover" }; }
    render(); return;
  }

  switch (t.dataset.act) {
    case "home-reroll":
      rerollDailyReads(); render(); break;
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
      attachExample(w);   // 完整卡才可能出现例句框，到这一步才去取例句库
      break;
    }
    case "retry-examples": {
      /* 例句没取回来：原地重试，不动整张卡（查词本身一直可用，重试只是补例句） */
      const w = t.dataset.word;
      exState = "idle"; exPromise = null;
      const h = $(`.example-box[data-example-word="${w}"]`);
      if (h) h.innerHTML = `<span class="ex-hint">例句按需加载中…</span>`;
      attachExample(w);
      break;
    }
    case "go-home":
      resetNav(); view = { name: "home" }; render(); break;
    case "go-discover":
      pushNav(); view = { name: "discover" }; render(); break;
    case "read-history":
      pushNav(); view = { name: "history" }; render(); break;
    case "history-filter":
      historyFilter = ["all", "unfinished", "finished"].includes(t.dataset.filter) ? t.dataset.filter : "all";
      render(); break;
    case "go-back":
      /* 回到进来时的那一页（发现页分类视图 / 首页推荐），栈空才回首页 */
      if (!navBack()) { resetNav(); view = { name: "home" }; render(); }
      break;
    case "next-article": {
      const nx = activeArticle && nextArticle(activeArticle);
      if (!nx) { toast("已经是这个分类的最后一篇了"); break; }
      /* 换文章前先把上一篇的位置和阅读秒数结算掉，否则这段时长跟着 readSecs 一起被清零 */
      flushReadPos();
      flushReadTime();
      activeArticle = nx; readSecs = 0; flushedSecs = 0; LOOKED[nx.id] = 0;
      touchReadHistory(nx.id);
      /* 「上次读到」跟着换文：旧篇位置已在离开时落盘，这里重置到新篇开头 */
      S.lastRead = { id: nx.id, y: 0, pct: 0, at: Date.now() }; save();
      resumeAnchor = null;   // 新篇从开头读：不能把上一篇的句子锚点套到这篇的正文上
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
      changeReadSetting(() => { S.showCn = !S.showCn; });
      syncReadSettingsSheet("cn", S.showCn ? 1 : 0);
      toast(S.showCn ? "显示中文对照" : "隐藏中文对照"); break;
    /* 阅读设置面板：把字号/对照/底色摊开成三组直接点选。
     * 旧版「字号」按钮是循环切换 —— 点一下换一档、想回上一档要再点两下，
     * 也看不到一共有几档。 */
    case "read-settings":
      $$(".sheet, .sheet-mask").forEach(n => n.remove());
      $(".phone").insertAdjacentHTML("beforeend", renderReadSettingsSheet());
      break;
    case "set-fs": {
      const v = Math.max(0, Math.min(2, +t.dataset.fs || 0));
      if (S.fontSize !== v) changeReadSetting(() => { S.fontSize = v; });
      syncReadSettingsSheet("fs", v);
      break;
    }
    case "set-cn": {
      const on = t.dataset.cn === "1";
      if (S.showCn !== on) changeReadSetting(() => { S.showCn = on; });
      syncReadSettingsSheet("cn", on ? 1 : 0);
      break;
    }
    case "set-theme": {
      const v = t.dataset.theme;
      const next = (v === "paper" || v === "night") ? v : "";
      if (S.readTheme !== next) changeReadSetting(() => { S.readTheme = next; });
      syncReadSettingsSheet("theme", v);
      break;
    }
    case "para-peek": {
      /* 点一句 = 选中它：喇叭只在选中的句子上出现，长文里不再满屏小图标。
       * 一次只留一个选中句；隐藏中文时，选中同时把这句译文点出来。 */
      const on = !t.classList.contains("sel");
      $$(".sentence.sel").forEach(n => { n.classList.remove("sel"); n.classList.remove("peek"); });
      if (on) {
        t.classList.add("sel");
        if (!S.showCn) t.classList.add("peek");
      }
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
        /* 打卡只负责标记「读完」。时长早就按秒持续落盘了（flushReadTime），
         * 这里只把还没结算的零头补上 —— 不再 Math.max(1,…) 硬凑一分钟，
         * 也不再把「读了十分钟没打卡」的时长丢掉。 */
        const sec = flushReadTime();
        S.read.push(id);
        if (!S.finished.includes(id)) S.finished.push(id);
        S.readHistory = S.readHistory || {};
        if (S.readHistory[id]) S.readHistory[id].finished = true;
        homeReads.pool = [];        // 已读状态变化，未读优先池需要失效
        /* 备份提醒：读完第 2 篇起提示一次，7 天不重复——进度只存在本地浏览器 */
        if (S.finished.length >= 2 && Date.now() - (S.backupHintAt || 0) > 7 * 86400000) {
          S.backupHintAt = Date.now(); save();
          setTimeout(() => toast("进度只存在这台浏览器 · 记得在「我的」里备份"), 1200);
        }
        markReadDay();
        save(); render();
        const mins = Math.floor((S.secByDay[todayKey()] || 0) / 60);
        toast(mins >= 1 ? `打卡成功 · 今日已读 ${mins} 分钟` : "打卡成功 · 继续读一会儿吧");
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
      /* 深拷贝重置：浅拷贝会让新状态继续和 defaultState 共享阅读统计引用 */
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
  const warmAppCache = async () => {
    if (!window.caches) return;
    const urls = new Set(["index.html", "assets/styles.css", "assets/app.js", "assets/data.js", "assets/data-articles-extra.js", "assets/data-covers.js"]);
    /* GitHub Pages 部署在 /ciyue/ 这类子路径时，根导航 URL 与 index.html 是两个缓存键；
       同时预热当前路径，离线刷新首页才能命中。 */
    urls.add(location.pathname);
    if (location.pathname.endsWith("/")) urls.add(location.pathname + "index.html");
    document.querySelectorAll("script[src],link[rel='stylesheet'][href]").forEach(el => {
      const raw = el.getAttribute("src") || el.getAttribute("href");
      if (!raw) return;
      try { urls.add(new URL(raw, location.href).href); } catch { /* 忽略无效资源地址 */ }
    });
    try {
      const cache = await caches.open("wordlens-cache-v43");
      await Promise.allSettled([...urls].map(u => cache.add(new URL(u, location.href).href)));
    } catch { /* 缓存权限或私密模式限制不影响在线阅读 */ }
  };
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").then(warmAppCache).catch(() => { });
  });
  /* 「上次读到」兜底：页面被切走/关闭时，把滚动位置与句子锚点立即落盘（正常路径在离开阅读页时落） */
  window.addEventListener("pagehide", () => {
    if (S.lastRead && S.lastRead.id) flushReadPos();
    flushReadTime();   // 关页/切走也要结算，别把这段时长丢了
  });
  /* 切到后台 / 锁屏：立刻结算一次。移动端 pagehide 不一定触发，
   * 而用户「读了十分钟直接切走」是最高频的漏记场景。 */
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) { flushReadTime(); flushReadPos(); }
    else lastActiveAt = Date.now();   // 回到前台重新算活跃
  });
  /* 活跃阅读计时：任何点击都刷新活跃时间戳 */
  document.addEventListener("click", () => { lastActiveAt = Date.now(); }, true);
  /* PWA 安装：Android Chrome 捕获安装事件，「我的」页出安装按钮；iOS 走分享指引 */
  window.addEventListener("beforeinstallprompt", e => {
    e.preventDefault(); installEvt = e;
    if (view.name === "me") render();
  });
  /* SW 后台刷新到新内容：阅读中不打断，改用提示 + 记下待更新；
   * 退出阅读页那一刻（render 里）才真正刷新 —— 原来只弹提示，
   * 返回首页看到的还是内存里的旧文章。 */
  navigator.serviceWorker.addEventListener("message", e => {
    if (!e.data || e.data.type !== "content-updated") return;
    if (view.name === "read") {
      pendingUpdate = true;
      toast("内容已更新，退出阅读后自动刷新");
      return;
    }
    if (sessionStorage.getItem("wl-updated")) return;   // 每次会话只自动刷一次，防循环
    sessionStorage.setItem("wl-updated", "1");
    toast("内容已更新，正在刷新…");
    setTimeout(() => location.reload(), 800);
  });
}

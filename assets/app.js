/* 词阅 WordLens —— 交互层 */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* 数据层已经清洗过一遍，这里是最后一道闸：万一个别条目仍带机器翻译令牌
   （有道批量接口的 <e:1> / <s:1>）或不可见控制符，也不让它出现在正文里 */
const NOISE = /<\/?[se]:\d+>|[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u00AD\u200B-\u200F\u202A-\u202E\u2060\uFEFF\uFFFD]/g;
const clean = s => String(s == null ? "" : s).replace(NOISE, "");
const ASSET_VERSION = String(typeof window !== "undefined" && window.WORDLENS_CONFIG?.assetVersion || "86");

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
/* 词汇高亮的四个档位。集中定义一次，设置面板渲染、状态校验、集合取用都读它 ——
 * 「合法档位有哪几个」这件事写两遍，两边就会走散。 */
const HL_SOURCES = ["core", "cet4", "mid", "custom"];
/* 中文对照的三个档位。合法值同样只写一遍，迁移 / 校验 / 面板渲染共读。
 * off 与 tap 的差别**只在点句**：off 档点句只选中（出喇叭、可朗读）不弹译文，
 * tap 档点句弹出该句译文。这两档以前是同一个（布尔 showCn=false 时点句必弹中文），
 * 结果是「只想纯读英文」的读者每次点句都被中文打断，躲不开。 */
const CN_MODES = ["off", "tap", "all"];

/* ---------------- 我的导入词库：清洗与合并（纯函数，normalizeState 与导入面板共用） ----------------
 * 判据只写一遍 —— normalizeState 的兜底清洗和导入面板的预览统计各调一份，
 * 两处各写一套正则迟早走散（同族教训见 audit 守卫「同一概念只能有一把尺子」）。
 * 词形口径：小写英文字母，允许内部撇号（don't）与连词号（mother-in-law）；
 * 拒绝单字母（导入 "a" 会把正文里每个 a 都染色，必然不是本意）、拒绝 40 字符以上、
 * 拒绝数字 / 标点 / CJK。弯引号统一折成直引号后再判。
 * ★ 2000 词的旧手机实测（Edge, 2026-09-23）：万级以下解析 + 去重都是毫秒级，
 *   不需要流式 / 分块。 */
function isVocabWord(w) {
  if (typeof w !== "string") return false;
  const s = w.replace(/[\u2018\u2019]/g, "'");
  return s.length >= 2 && s.length <= 40 && /^[a-z]+(?:['-][a-z]+)*$/.test(s);
}
/* 粘贴文本 / TXT / CSV 共用这一个分词：空白、中英文逗号分号、顿号都是分隔符
 *（"apple banana" 与 "apple,banana" 与逐行一个词必须是同一结果）；
 * CSV 可能带引号字段（"apple",1），剥掉首尾引号再判；频率列之类非词 token
 * 由 isVocabWord 判为无效，不算错误 —— CSV 本来就常带数字列。 */
function parseVocabText(raw) {
  return String(raw || "")
    .replace(/^\uFEFF/, "")
    .split(/[\s,;，；、]+/)
    .map(t => t.replace(/^["']+|["']+$/g, "").trim().toLowerCase())
    .filter(Boolean);
}
/* 导入预览统计：total = 分词总数；valid = 将真正入库的词（追加时不含已有词，
 * 覆盖时含 —— 覆盖语义是「整个换成这份」）；dup = 批内重复 + 追加时与现有词库重复；
 * invalid = 不过词形判据的 token。四项满足 total = valid.length + dup + invalid，
 * audit 有守卫锁这条守恒式。 */
function buildVocabPreview(raw, existing, append) {
  const tokens = parseVocabText(raw);
  const seen = new Set();
  const cur = append ? new Set(existing || []) : null;
  const valid = [];
  let dup = 0, invalid = 0;
  for (const t of tokens) {
    if (!isVocabWord(t)) { invalid++; continue; }
    if (seen.has(t) || (cur && cur.has(t))) { dup++; continue; }
    seen.add(t);
    valid.push(t);
  }
  return { total: tokens.length, valid, dup, invalid };
}
/* 入库合并：两个模式都是小写去重有序数组（存储口径恒定，diff 与检索都省心）。 */
function mergeVocab(existing, words, overwrite) {
  return overwrite ? [...new Set(words)].sort() : [...new Set([...(existing || []), ...words])].sort();
}
/* 正文「一句一行」—— 2026-09-19 在皮克一篇上看完效果，用户拍板全站铺开。
 * 中文对照档每句后面跟一个块级译文，句子自然就一行一句；纯英文档句子原来是 inline，
 * 整段连排成一坨 —— 同一个 App 里两种排版节奏不一样，用户要的是「英文时和双语时一样」。
 * 所有文章都走 .para-flow（styles.css）：句子转块级、句间 10px、句末右留 10px、
 * **段距 24px**（2026-09-20 由 18 上调，只动段距这一个数；句距和段距**一起**拉才会让
 * 段落层次糊掉，样张实测过）。段距的唯一取值点在 styles.css，这里只是复述、不是来源。
 *
 * 交互只有一种：**点句出译文 / 再点收起**。段级「显示本段翻译」按钮已按用户要求删除 ——
 * 一句一行之后每段尾巴再挂一行小字，是把段落重新切碎，而且和点句是重复入口。 */
const defaultState = {
  theme: "light",
  notebook: [],     // 生词本（阅读加入）
  /* 中文对照：off 关闭（纯英文）| tap 点句显示 | all 逐句对照。默认 tap ——
     中文永久显示会让人条件反射直接读中文，tap 才是「先读英文、卡住再借中文」。 */
  cnMode: "tap",
  fontSize: 0,
  readTheme: "",     // 阅读页护眼主题："" | "paper" | "night"
  /* 词汇高亮词库开关（2026-09-23 由单选档 highlightMode 升级为**独立开关**）：
     四个词源各一个布尔，高亮词集 = 打开的词源并集。默认只开核心词 —— 与旧默认档
     "core" 完全等价。custom 默认关：没导入过词库时打开开关只会让人疑惑「为什么没反应」。
     全关 = 旧「关闭高亮」，走 hlAllOff() / .no-kw。关掉任何词源只影响标色，点词查义照常。 */
  hlSets: { core: true, cet4: false, mid: false, custom: false },
  /* 我的导入词库：用户在阅读前就知道自己不会的词（与生词本「阅读中遇到才收藏」
     是两个数据概念，永不互写）。小写、去重、排序；由 normalizeState 清洗兜底。 */
  customVocab: [],
  accent: "en-US",   // 朗读口音：en-US 美音 | en-GB 英音（en-GB 不是所有系统都装了语音）
  rate: "std",       // 朗读语速：slow 0.72 | std 0.9 | fast 1.05（原实现用浏览器默认 1.0，精读偏快）
  read: [],         // 累计读过（去重）
  readCount: {},    // { articleId: number } 每篇打卡次数
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
  /* 高亮词库迁移（2026-09-23）：旧版是单选档 highlightMode（off/core/cet4/all），
     语义上正好是四个词源开关的组合 —— 按档位逐一映射，保证老用户升级后看到的
     高亮范围一个词都不变：
       off  → 全关            core → 只开核心
       cet4 → 核心 + 全部四级   all  → 核心 + 全部四级 + 中学基础（旧 all = CET4 ∪ MID）
     custom 恒 false —— 旧版没有这个概念，导入词库必须由用户自己打开。
     完全没有该字段的历史状态保留默认档（= 旧 core）。 */
  if (src.hlSets === undefined && src.highlightMode !== undefined) {
    const m = src.highlightMode;
    next.hlSets = {
      core: m === "core" || m === "cet4" || m === "all",
      cet4: m === "cet4" || m === "all",
      mid: m === "all",
      custom: false,
    };
  }
  if (src.hlSets === undefined && src.highlightMode === undefined && src.kwHighlight !== undefined) {
    next.hlSets = { core: src.kwHighlight === true, cet4: false, mid: false, custom: false };
  }
  delete next.highlightMode;
  delete next.kwHighlight;
  {
    const h = next.hlSets && typeof next.hlSets === "object" ? next.hlSets : {};
    next.hlSets = {
      core: h.core === true,
      cet4: h.cet4 === true,
      mid: h.mid === true,
      custom: h.custom === true,
    };
  }
  /* 我的导入词库：缺失初始化为空数组（老备份没有这个字段）；有值则清洗 ——
     小写、去重、只留合法英文词形。清洗规则与导入面板共用 isVocabWord()，
     两处各写一份迟早走散（见下方定义处注释）。 */
  {
    const cv = Array.isArray(next.customVocab) ? next.customVocab : [];
    next.customVocab = [...new Set(cv.filter(w => typeof w === "string" && isVocabWord(w.trim().toLowerCase())))].sort();
  }
  /* 中文对照迁移：旧版是布尔量 showCn。旧的「显示」档每句都挂中文，等于 all；
     旧的「隐藏」档点句会弹译文，语义上等于 tap。**不能把旧的「隐藏」映射成 off** ——
     那会让老用户点句时突然看不到中文，以为功能坏了（off 是新引入的档位，
     只有用户自己去设置里选才该生效）。非法值回落 tap（默认档）。 */
  if (src.cnMode === undefined && src.showCn !== undefined) {
    next.cnMode = src.showCn ? "all" : "tap";
  }
  delete next.showCn;
  if (!CN_MODES.includes(next.cnMode)) next.cnMode = "tap";
  next.readDays = Array.isArray(next.readDays) ? next.readDays.slice() : [];
  next.minsByDay = (next.minsByDay && typeof next.minsByDay === "object") ? Object.assign({}, next.minsByDay) : {};
  next.secByDay = (next.secByDay && typeof next.secByDay === "object") ? Object.assign({}, next.secByDay) : {};
  /* 老版本只存了「分钟」，且只在打卡时写一次。这里换算成秒，历史记录不至于凭空消失。 */
  if (!src.secByDay) {
    for (const [k, m] of Object.entries(next.minsByDay)) {
      if (!next.secByDay[k]) next.secByDay[k] = Math.round((+m || 0) * 60);
    }
  }
  /* 生词条目迁移。四个历史版本逐级降级到 v4：
     v1 字符串 → v2 { word, addedAt, articleId } → v3 带 firstCtx 与遇词统计 →
     v4（2026-09-19 收紧）只留「词 / 语境 / 出处」。
     v3 的 seen / lookups / lastSeenAt / articles 一并丢弃：那批数字回答不了
     「这个词是什么」和「我当时在哪个语境不会」，留着只让状态越来越重 ——
     阅读型词汇工具的核心只有三个动作（看词 → 点词查义 → 不会就收藏），
     不是给用户记流水账。老用户的收藏与语境全部保留，一个都不丢。 */
  const rawNb = Array.isArray(next.notebook) ? next.notebook : [];
  next.notebook = rawNb.map(item => {
    if (typeof item === "string") item = { word: item };
    if (!item || typeof item !== "object" || !item.word) return null;
    const c = item.context || item.firstCtx || null;
    return {
      word: String(item.word),
      addedAt: item.addedAt || Date.now(),
      articleId: item.articleId || "",
      articleTitle: item.articleTitle || item.srcTitle || "",
      context: c && c.en ? { en: String(c.en), cn: String(c.cn || "") } : null,
    };
  }).filter(Boolean);
  /* 同一个词只留一条。词表在语义上是集合，重复条目会让「移出生词本」删不干净 ——
     nbItem() 只取第一条，删掉之后第二条又从列表里冒出来，看起来像没删掉。
     保留最先出现的那条：notebook 是按加入顺序堆的，先出现的收藏更早、语境更原始。 */
  const seenWord = new Set();
  next.notebook = next.notebook.filter(it => (seenWord.has(it.word) ? false : (seenWord.add(it.word), true)));
  next.known = Array.isArray(next.known) ? next.known.slice() : [];
  next.read = Array.isArray(next.read) ? next.read.slice() : [];
  next.readCount = (next.readCount && typeof next.readCount === "object") ? Object.assign({}, next.readCount) : {};
  /* 迁移：旧版 S.read 含重复，去重并把计数写入 readCount */
  {
    const counts = {};
    for (const id of next.read) counts[id] = (counts[id] || 0) + 1;
    const deduped = [...new Set(next.read)];
    if (deduped.length < next.read.length) {
      next.read = deduped;
      for (const [id, c] of Object.entries(counts)) {
        next.readCount[id] = Math.max(next.readCount[id] || 0, c);
      }
    }
  }
  next.finished = Array.isArray(next.finished) ? next.finished.slice() : [];
  /* 每篇的续读位置：老版本没有这个字段，缺了就补空表（旧数据仍靠 lastRead.y 兜底） */
  next.readPos = (next.readPos && typeof next.readPos === "object") ? Object.assign({}, next.readPos) : {};
  next.readHistory = (next.readHistory && typeof next.readHistory === "object") ? Object.assign({}, next.readHistory) : {};
  return next;
}
/* ---------------- 原生壳（Android APK）的用户数据镜像 ----------------
 * 为什么需要：正文与词库都在安装包里，安装包不会坏 —— 唯一会丢的是**用户数据**，
 * 而它只活在 WebView 的 localStorage 里：系统「清除数据」/WebView 存储被回收时
 * 那一整块是无前兆消失的。壳里因此再存一份镜像到应用私有目录。
 * 接口（@JavascriptInterface，见 mobile/android/.../UserState.java）：
 *   UserState.saveState(json) → 原子写 filesDir/user-state.json（先写 .tmp 再改名）
 *   UserState.loadState()     → 读回同一份 JSON；文件不存在返回空串
 * 网页环境没有 window.WORDLENS_NATIVE，下面两处天然不执行，行为与改动前一致。
 * 只认显式旗标 + 方法齐全，绝不靠「window.UserState 存在」猜 —— 别的宿主
 * （某些 WebView 容器、调试注入脚本）也可能挂同名对象，误用会把数据写进未知的地方。 */
function nativeBridge() {
  if (typeof window === "undefined" || window.WORDLENS_NATIVE !== true) return null;
  const b = window.UserState;
  return b && typeof b.saveState === "function" && typeof b.loadState === "function" ? b : null;
}
/* 镜像只在**有内容**时做。壳侧自己会兜住异常，这里再包一层是为了
 * 「壳写失败绝不影响网页行为」—— 壳是个可选增强，不许成为新的失败点。 */
function mirrorNative(json) {
  const b = nativeBridge();
  if (!b || !json) return false;
  try { b.saveState(json); return true; } catch { return false; }
}

let storedState = {};
let rawState = null;
try { rawState = localStorage.getItem(STORE); } catch { rawState = null; }
/* 本地为空就回落到壳里的镜像 —— 这是「系统清了 WebView 存储」唯一的补救路径。
   本地有东西时一律以本地为准（本地更新），不拿可能更旧的镜像去盖。 */
if (!rawState) {
  const b = nativeBridge();
  if (b) { try { rawState = b.loadState() || null; } catch { rawState = null; } }
}
try { storedState = JSON.parse(rawState || "{}"); } catch { storedState = {}; }
let S = normalizeState(storedState);
/* minsByDay 是 secByDay 的派生镜像：展示层（近 7 天柱状图、累计时长）继续读分钟，
 * 但记账只认秒，避免「每次打卡四舍五入一次」把零头越积越偏。 */
function syncMinsMirror() {
  const out = {};
  for (const [k, sec] of Object.entries(S.secByDay || {})) out[k] = Math.round(sec / 60);
  S.minsByDay = out;
}
syncMinsMirror();

/* ---------------- 落盘（2026-09-22 收口） ----------------
 * localStorage 写不进去有三种真实原因：配额满、无痕/隐私模式、宿主 WebView 回收。
 * 旧实现是 `const save = () => localStorage.setItem(...)` —— **直接抛**，异常一路冒到
 * 点击处理器：存储一满，连点个词都能把交互打断（实测：往沙箱注入会抛的 setItem，
 * save() 当场 throw，调用方没有任何兜底）。
 * 现在统一收口在这一个函数里，三档：
 *   ① 原样写 → ok
 *   ② 失败：只裁**最老的续读位置**（readPos/readHistory 保留最近 40 篇）再写一次
 *      —— 那两块是「便利数据」，正文、生词本、已知词、时长一个字不动；
 *   ③ 再失败：标记 failed + 提示一次，内存里的 S 照常可用（本次会话不丢），
 *      并在「我的 → 数据与备份」显示告警行，引导先导出备份。
 * ⚠️ 状态只存内存：写不进去时它本来也存不下来，刷新后归 ok —— 这是可接受的，
 *    因为告警的意义是「当场告诉用户现在别关」，不是跨会话记账。
 * ★ 原生壳（2026-09-22）：每档都调 mirrorNative() 推一份给壳的文件系统（含失败档，
 *   见下面的注释）。localStorage 与壳镜像**不是等价的两个备份**：
 *     本地 = 随时可读、但系统「清除数据」会整块清掉、且受 5MB 配额限制；
 *     镜像 = 只在本地为空时才读、不受配额限制、但网页环境根本不存在。
 *   所以两边各按自己的口径写（裁剪档给本地、完整版给壳），不是同一份 JSON 抄两遍。 */
let storageState = "ok";            // ok | trimmed | failed（供「我的」页渲染告警行）
let storageHinted = 0;              // 每种状态每会话只提示一次
function recentArticleIds(n) {
  const rows = [];
  for (const id of Object.keys(S.readPos || {})) {
    const r = S.readPos[id] || {};
    rows.push({ id, at: Number(r.at) || 0 });
  }
  for (const id of Object.keys(S.readHistory || {})) {
    if (rows.some(r => r.id === id)) continue;
    const h = S.readHistory[id] || {};
    rows.push({ id, at: Number(h.lastAt) || 0 });
  }
  rows.sort((a, b) => b.at - a.at);
  return rows.slice(0, n).map(r => r.id);
}
function notifyStorage(kind) {
  if (storageHinted & (kind === "failed" ? 2 : 1)) return;
  storageHinted |= kind === "failed" ? 2 : 1;
  setTimeout(() => toast(kind === "failed"
    ? "浏览器存储写入失败 · 进度可能保存不上，建议先去「我的」导出备份"
    : "存储空间紧张 · 已只保留最近的续读位置，生词与记录未动"), 900);
}
function save() {
  /* 三档**都要**镜像，包括失败档（2026-09-22 自审改）：本地写不进去恰恰是镜像最该
   * 顶上的一刻 —— 两个存储彼此独立，localStorage 满/被 WebView 回收不代表文件也写不了。
   * 而镜像是「本地为空才读」，所以多写一份永远不会回头污染一份健康的本地数据。
   * 镜像一律送**完整**的 S：裁剪只对 localStorage 的 5MB 配额有意义，
   * 壳里那份是个文件、没有这个上限 —— 把裁过的版本镜像过去等于自愿丢数据。 */
  let mirror = "";
  try {
    mirror = JSON.stringify(S);
    localStorage.setItem(STORE, mirror);
    storageState = "ok";
    mirrorNative(mirror);
    return true;
  } catch { /* 落到降级档 */ }
  try {
    const keep = recentArticleIds(40);
    const py = {}, ph = {};
    for (const id of keep) {
      if (S.readPos && S.readPos[id]) py[id] = S.readPos[id];
      if (S.readHistory && S.readHistory[id]) ph[id] = S.readHistory[id];
    }
    localStorage.setItem(STORE, JSON.stringify({ ...S, readPos: py, readHistory: ph }));
    if (storageState !== "failed") notifyStorage("trimmed");
    storageState = "trimmed";
    mirrorNative(mirror);
    return true;
  } catch {
    storageState = "failed";
    notifyStorage("failed");
    mirrorNative(mirror);
    return false;
  }
}

/* ---------------- 阅读统计 ----------------
 * 阅读时长、读完篇数和连续阅读天数都从本地记录计算。 */
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
 * 2026-09-22 起它不再是唯一的落盘时机 —— 滚动节流（updateReadProgress 的 5 秒档）
 * 也会把锚点和 scrollTop 一起写，因为宿主杀进程时这里的事件可能根本不执行。
 * 本函数保留为「离开时的精确收尾」：多量一次锚点，保证出口那几个场景最准。 */
function flushReadPos() {
  const cont = $("#read-scroll");
  if (!cont || !cont.dataset || !S.lastRead || !S.lastRead.id) return 0;
  if (cont.dataset.art !== S.lastRead.id) return 0;
  /* inFlushPos 只是防止 updateReadProgress 在里面又挂一个新的延时（否则空闲时
     每 5 秒自触发一次，白写盘） */
  inFlushPos = true;
  try { updateReadProgress(); } finally { inFlushPos = false; }
  cancelReadSave();
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

/* 考试日锚定北京时间当天零点（+08:00），对「真实的现在」求差——与宿主时区无关。
 * 日期移到 data-config.js，支持一次配置多场；全部过期时明确提示待更新，不显示误导性的 0 天。 */
const EXAM_DATES = (typeof WORDLENS_CONFIG !== "undefined" && Array.isArray(WORDLENS_CONFIG.examDates))
  ? WORDLENS_CONFIG.examDates.filter(x => /^\d{4}-\d{2}-\d{2}$/.test(String(x))).sort() : [];
const nextExamDate = () => EXAM_DATES.find(x => Date.parse(`${x}T23:59:59+08:00`) >= Date.now()) || null;
const daysToExam = () => {
  const date = nextExamDate();
  return date ? Math.max(0, Math.ceil((Date.parse(`${date}T00:00:00+08:00`) - Date.now()) / 86400000)) : null;
};
const examCountdownLabel = () => {
  const days = daysToExam();
  return days == null ? "考试日待更新" : `距四级考试还有 ${days} 天`;
};

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

/* ---------------- 关键词 Trie（用于**查词**） ----------------
 * 把学习词表装进前缀树；匹配时只在单词边界、完整词才算命中。
 * 这样既快（O(字母数)），又避免 startsWith 把 'rod' 当成 'Rodriguez'。
 *
 * ⚠️ 这个 trie 只回答「这个词能不能点、点开查什么」，**不回答「标不标色」**。
 * 2026-09-19 之前它还顺带承担高亮过滤（长度 < 4 的词与功能词整片剔除），
 * 副作用是 work / get / know / one 这些词既进不了 trie（被高亮规则挡掉）、
 * 又被点词层排除（它们是学习词），于是点了没反应 —— 实测正文 16% 的 token
 * 点不动。高亮范围现在由 highlightSet() + isHighlightable() 单独决定。 */
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
    if (!w) continue;
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
let TAP = typeof TAPDICT === "undefined" ? null : TAPDICT;
let TAPR = typeof TAP_REVERSE === "undefined" ? null : TAP_REVERSE;
let tapLoadStarted = Boolean(TAP && TAPR);
let tapLoadPromise = null;

/* 文章级补充词典（data-articles-words.js，构建产物）：ECDICT 里当代语料词频为 0 的
 * 那批词（are / an / don't / you're / i'm / were…）。build-tapdict.mjs 对 frq=0 的
 * 条目整个跳过，而这批恰恰是正文里出现次数最多的一类 —— 「最常见的词反而点不动」
 * 就是这么来的。它随首屏加载（几十 KB），不进 TAPDICT 的懒加载队列。 */
let AW = typeof ARTICLE_WORDS === "undefined" ? null : ARTICLE_WORDS;

/* 点词大表不阻塞首页：进入阅读页后才加载。失败时仍保留四级词库查词，
 * 不能因为点词层离线而让正文或核心查词不可用。 */
function ensureTapdict() {
  if (TAP && TAPR) return Promise.resolve(true);
  if (tapLoadPromise) return tapLoadPromise;
  if (typeof document === "undefined" || !document.head) return Promise.resolve(false);
  tapLoadStarted = true;
  tapLoadPromise = new Promise(resolve => {
    const s = document.createElement("script");
    s.async = true;
    s.src = `assets/data-tapdict.js?v=${encodeURIComponent(ASSET_VERSION)}`;
    s.dataset.wlTapdict = "1";
    s.onload = () => {
      TAP = typeof window !== "undefined" && window.TAPDICT ? window.TAPDICT : null;
      TAPR = typeof window !== "undefined" && window.TAP_REVERSE ? window.TAP_REVERSE : null;
      resolve(Boolean(TAP && TAPR));
    };
    s.onerror = () => {
      s.remove();
      /* 失败必须把 promise 撤掉，否则它以 false 永久缓存在这里，同页面
         再进阅读页也不会重试（2026-09-23 审查发现）。撤掉后下一次
         ensureTapdict() 会重新插一次 script —— 复试频率天然等于用户动作频率，
         不需要定时器。 */
      tapLoadPromise = null;
      tapLoadStarted = false;
      resolve(false);
    };
    document.head.appendChild(s);
  });
  return tapLoadPromise;
}

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

/* 词形还原例外表：这些词在点词层有自己的独立词条，且**不是**还原目标学习词的变形 ——
 * 「还原命中学习词」的优先级会把它们的正确释义压掉。
 * 实测碰撞扫描（2026-09-23，全 TAPDICT 约 1766 个「非学习词但可还原到学习词」的 token，
 * 只看剥 s 且释义与学习词无公共词的）：33 个候选里绝大多数是规则复数（basics→basic、
 * remains→remain，还原后释义仍然对）或 -ics 学科词（economics→economic，失真可接受）；
 * 语义真正分叉且 CET-4 文章里高频的只有 sometimes —— 它是独立副词，不是 sometime
 * 的复数，还原后卡片显示「在某一时候；从前」而正确释义「有时」就在点词层里取不到。
 * ⚠️ 别把 nuts / seconds 这类词加进来：对本文读者它们九成是复数本义，还原才是对的。 */
const LEMMA_SELF_WINS = new Set(["sometimes"]);

const kwOf = w => {           // 词在 KEYWORDS（学习词）里则返回词本身，否则 null
  let node = KW_TRIE;
  for (let i = 0; i < w.length; i++) { node = node[w[i]]; if (!node) return null; }
  return node.$ || null;
};

/* 任意 token → 查词目标：三段式 {学习词 kw} / {点词层 w} / null（专有名词等不包）。
 * 顺序固定：学习词 Trie → 反向词形表 → 后缀规则还原出的学习词 → 点词层直接命中 →
 * 规则还原的点词层词 → 文章级补充词典（直/还原）。最后这层是兜底，只收 TAPDICT
 * 明确没有的词，命中必然是「点词层因 frq=0 丢弃」的功能词，不存在覆盖质量问题。
 * 还原出的学习词必须先于点词层直接命中：performing 在 ECDICT 有独立词条（n.表演），
 * 但用户点它要回到的是学习词 perform 的完整卡。 */
function resolveToken(low) {
  const k = kwOf(low);
  if (k) return { kw: k };
  /* 例外词：原词自身在点词层有条目就直接用，不做还原（有时 ≠ 在某一时候）。
   * 放在 TAPR 之前 —— TAPR 里有映射时更会把原词条整个跳过。 */
  if (TAP && TAP[low] && LEMMA_SELF_WINS.has(low)) return { w: low };
  if (TAPR && TAPR[low]) {
    const l = TAPR[low];
    return kwOf(l) ? { kw: l } : { w: l };
  }
  const cands = lemmaCands(low);
  for (const c of cands) { if (kwOf(c)) return { kw: c }; }
  if (TAP && TAP[low]) return { w: low };
  for (const c of cands) { if (TAP && TAP[c]) return { w: c }; }
  if (AW && AW[low]) return { w: low };
  for (const c of cands) { if (AW && AW[c]) return { w: c }; }
  return null;
}

/* 在英文段落里把 token 包成可点 span（data-act="lookup"）：
 * - **凡是 resolveToken 能解析的 token 都可点**，不再要求它先被高亮 ——
 *   「能查的词」与「该高亮的词」是两个集合，绑在一起就会出现
 *   「看得见颜色才点得动」的怪现象（旧版正文里 16% 的 token 点了没反应）。
 * - 基础类 .word 只标记「可点」，视觉上与正文完全一致（只有光标变化），
 *   不让整篇文章看起来像一页超链接。
 * - 高亮态另加 .kw（当前档位的目标词），生词 .wb，已认识 .known —— 三者互斥。
 * - 专有名词 / 任何词典都查不到的词：保持纯文本。
 * 匹配含所有格（Japan's 整体归到 japan），避免 's 断在 span 外。 */
function highlightEn(text) {
  /* esc() 先把 & < > " 转成实体（&amp; / &lt; / &gt; / &quot;），分词时不能把它们
   * 当成普通文本：正则会把 &amp; 里的 amp 当成单词包上 span，
   * 变成 &<span>amp</span>; —— 浏览器认不出实体，页面上就原样显示 "&amp;"。
   * 实测于 Dan Koe 那篇的 "Buddhism & Christianity"。实体段整体跳过，其余照旧分词。 */
  return String(text).split(/(&(?:amp|lt|gt|quot);)/).map(seg =>
    /^&(?:amp|lt|gt|quot);$/.test(seg) ? seg
      : seg.replace(/[A-Za-z]+(?:['\u2018\u2019][A-Za-z]+)?/g, m => {
        const low = normApos(m).toLowerCase();
        /* 自定义词先于 resolveToken 判：导入的词可能任何词典都没有（这正是「我的词库」
           的常态 —— 四级大纲外的专业词 / 名词），resolveToken 返回 null 也要包 span，
           否则既不高亮也点不开（下面的 renderSheet 有自定义词兜底卡）。 */
        const rawCustom = customHit(low, m);
        const r = resolveToken(low);
        if (!r && !rawCustom) return m;
        const k = r ? (r.kw || r.w) : low;
        /* 四态互斥，优先级：已认识 > 生词 > 高亮词 > 普通可点词。
         * 已认识的词不再有任何标色 —— 用户明确说过认识了，就不该再拦眼睛；
         * 生词（自己收藏过的）走琥珀色块，与「高亮词」的紫色字拉开层次：
         * 正文里的紫色是「考试会考」，琥珀块才是「这个我不会」。
         *
         * ★ 为什么「已认识」要压过「生词」：一个词可以同时在生词本和已认识列表里
         *   （点「我已认识」只写 S.known，生词条目连带语境原句一起保留，用户以后
         *   还能回看「我以前在哪个句子里不会这个词」）。既然记录保留，显示就必须
         *   听已认识的 —— 否则「标了已认识却还是琥珀色」会让人以为没生效。
         * ★ 本条与档位无关：切档只改 highlightSet()，known / wb 两项不参与，
         *   所以已认识的词在任何档位下都保持普通颜色，不会被重新点亮。
         *
         * 这里对生词本做 O(n) 的 find()：一篇长文里这一行执行数百次、生词本
         * 数百条，实测毫秒级；换成缓存 Set 要在四处增删点手动失效，漏一处
         * 就是错标色，这点开销不值得换那个风险。 */
        const known = S.known.includes(k);
        const wb = !known && inNotebook(k);
        /* 高亮 = 词库开关判定。customHit 走「用户显式导入」语义：**绕过**长度 / 功能词闸
           （isHighlightable 是给系统词库防花布用的；用户一个一个导进来的词是明确意图，
           导入 work 就该看到 work —— 哪怕它是高频词）。已认识 > 生词 > 高亮的优先级
           对自定义词同样成立：标了认识的导入词不再标色（需求 §6）。 */
        const hl = !known && !wb &&
          ((S.hlSets.custom && rawCustom) || (isHighlightable(k) && highlightSet().has(k)));
        const cls = "word" + (known ? " known" : "") + (wb ? " wb" : "") + (hl ? " kw" : "");
        /* data-form 存**原文词形**（如 adopted），data-word 存词元（adopt）：
         * 查词卡要把「你点的那个词」显示出来，直接显示词元会让人以为点错了。 */
        return `<span class="${cls}" data-act="lookup" data-word="${esc(k)}" data-form="${esc(m)}">${m}</span>`;
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

/* 段落级退化段的**渲染期**再切分（2026-09-22）。
 *
 * 起因：AI 栏目（Offbook 通道）源站给的是**段落级**对齐，官方译文的句数常与英文不等
 * （实测 `The seventh year of Kaihuang. Officials need filling.` 5 句英文 ↔ 4 句中文，
 * 官方把前两句合并译了）。`tools/offbook.mjs` 的 `blockToPara()` 此时按设计**不切** ——
 * 硬切会编造错误配对（REF §12 记着「组织才」+「能作为一个整体运转。」那种词中间截断）。
 * 于是入库成 `sentences: [{ en:"5句话…", cn:"4句话…" }]` —— 数据形状合法，
 * 但 `.para-flow` 只把「句级元素」转块级，它眼里这是 1 句，**整段英文连排成一坨**，
 * 与句级对齐成功的段（一句一行）在同一篇里混着出现，看着像排版坏了。
 *
 * 全站实测 510 处（AI 5 篇为主：rebuilding-learning 135 / breakdown-of-firms 126 /
 * on-cognitive-decoupling 117 / teaching-and-training-disqualified 89 / mirage-of-form 36）。
 *
 * ★ 修的是**渲染**，不是数据。三条理由：
 *   ① `sentencesOf()` 被 9 处消费（句数统计 / needLearn / 朗读队列 / 续读锚点 / qc），
 *      改它等于把「全站 7,094 句」这个已发布数字和所有人的阅读进度锚点一起打翻；
 *   ② 切分只服务「英文一行一句」这一个视觉目标，与统计口径无关 —— 一个概念一把尺子，
 *      但**两件事不该共用一把尺子**；
 *   ③ 数据层若切，`cn` 配不上去（1 份译文 vs 5 句英文），守恒闸与 qc 漏译判据都会动。
 *
 * ★ 译文挂法：**整段中文挂在每一个显示句后面**（挂法 2026-09-23 修，拆译文的禁令不变）。
 *   不按比例拆中文 —— 那正是 REF §12 的踩坑，`Officials need filling.` 会配到半截中文，
 *   而这份材料是拿来背词的，配错的译文等于教错。旧版把整段中文只挂在最后一句后面，
 *   而「点句显示」档只展开被点句的紧邻译文，结果切分段**前几句点了没有任何反应**
 *   （全库 447 个切分段、1,188 个显示句无译文可弹）—— 与下面许诺的「行为统一」直接矛盾。
 *   现在每句后面都挂整段译文，点谁弹谁；「逐句对照」档非末句的副本带 .cn-dup 收起，
 *   视觉上仍然一段只见一份译文。
 *
 * ★ 假阳性必须挡掉（实测样本）：
 *   · `Cui. Lu. Wang. Xie.` —— 4 个单字母缩写，句子切分会切成 4 个碎片；
 *   · `Bzzzzzz……` / `Shit…` / `RW: That's right, …` —— 拟声、短感叹、访谈前缀，
 *     本就是单句，切了只会把一段拆成没意义的碎行。
 *   判据取「可观察的文本性质」，不钉具体词表：切出的段必须**每段都像句子**（含小写字母、
 *   至少 3 个词、长度有下限），否则整段不切、退回连排。
 */
const ABBR_GUARD = /(?:^|[\s(“"‘])[A-Za-z]{1,3}\.(?=\s|$)/g;
/* v83 新增：闭引号前的**单字母**缩写（`He cited "Dr. J." Smith…`）。
 * 只挡单字母、不挡 1-3 字母 —— 引号边界的歧义画像和裸边界不同：
 * `end." / day." / way."` 是再正常不过的句尾（全库引号连排的主力），
 * 若沿用 {1,3} 会把这一大批真边界全部挡死；而 1-3 字母的**真**句尾
 * （`"No." She left.`）里单字母几乎只有首字母缩写一种歧义，
 * 挡单字母的误杀面最小。判据仍是「宁可连排，不要错切」。
 * 两个守卫的前缀类都要含左引号（“"‘）：`"Dr. J." Smith` 里 `Dr.` 前面是
 * 左引号不是空白 —— 负向测试抓过（切成 `He cited "Dr.` + 碎片，首段
 * 表面像句子，逐段判据拦不住），前缀少了左引号守卫就是假守卫。 */
const ABBR_QUOTE = /(?:^|[\s(“"‘])[A-Za-z]\.(?=["'’””])/g;
const RENDER_SPLIT_MIN = 3;          // 切出少于 3 个词的不算句子
const RENDER_SPLIT_MIN_LEN = 12;     // 少于 12 字符的不算句子
/** 一段英文能不能安全地按句末标点切开用于**显示**。切不开就返回 null（调用方保持原样）。 */
const renderSplitEn = en => {
  const t = String(en || "").trim();
  if (!t) return null;
  /* 缩写保护：`Cui. Lu. Wang. Xie.` / `V. Vertical…` 会在这里被挡下 ——
     把缩写点的 `.` 换成占位符再切，切完还回来。与 lib-offbook 的 ABBR_ROMAN 同思路，
     但**不共用实现**：那边服务入库（决定数据形状），这边只服务渲染（决定怎么显示），
     两边判据不同（那边保罗马编号，这边还要挡单字母缩写）。 */
  const guarded = t.replace(ABBR_GUARD, m => m.replace(/\./g, "\u0001"))
    .replace(ABBR_QUOTE, m => m.replace(/\./g, "\u0001"));
  /* v83：lookbehind 允许句末标点后带闭引号。旧式 `(?<=[.!?…])\s+` 要求标点**紧贴**空白，
   * `…"AI makes people lazy." It's that…` 这种「标点+闭引号+空白」的真边界切不开 ——
   * 全站审计实测这是引号连排的最大单一成因（B1 档 101 处几乎全部 qbound=true）。
   * JS 变长 lookbehind 为 ES2018；本文件此前已用定长 lookbehind，支持面不变。 */
  const raw = guarded.split(/(?<=[.!?…]["'’””]*)\s+/).map(s => s.trim()).filter(Boolean);
  if (raw.length < 2) return null;
  const parts = raw.map(s => s.replace(/\u0001/g, "."));
  /* 每一段都得像句子 —— 只要有一段不像，整段不切（宁可连排，不要碎行） */
  for (const s of parts) {
    if (s.length < RENDER_SPLIT_MIN_LEN) return null;
    if (!/[a-z]/.test(s)) return null;
    if ((s.match(/[A-Za-z'’\-]+/g) || []).length < RENDER_SPLIT_MIN) return null;
  }
  return parts;
};

/* 渲染用的段落句子列表：在 sentencesOf 之上做「渲染期再切」。
 * 返回 [{ en, cn, rs, si0, np }] ——
 *   rs  渲染切分序号（0 起，未切分的元素恒为 0），配合 displaySentenceAt 取「屏幕上被点的那一句」；
 *   si0 **数据口径**的元素序号：= 它在 base 里的下标。渲染层把它写进 data-si，
 *       锚点 / 朗读计数用数据口径，只有「怎么显示」变了。
 *   np  源元素切出的份数（未切分 = 1）。renderRead 靠它决定「这个元素切了没有」：
 *       写不写 data-rs、非末句译文挂不挂 .cn-dup，判据都是 np > 1。
 *
 * v83 把「再切」从退化段推广到**任何**句级元素。旧版只处理 base.length===1（段落级
 * 退化段），但全站审计（SENTENCE-FLOW-AUDIT-2026-09-23.md）实测 8,282 个显示句里还有
 * 182 处连排：①101 处是退化段里含「标点+闭引号」边界，切分正则切不开；②67 处在
 * **普通段**里 —— 某个句级元素本身含 2+ 句（入库切句时没切开，多半也是引语边界），
 * 渲染层对普通段元素不碰，读者照样看到两三句挤一行。修法与退化段同一把尺子：
 * 对每个有译文的元素跑 renderSplitEn，切开的份数挂同一份元素译文（v73 定下的
 * 「整段译文挂每一句」挂法不变，只是「整段」从段缩到元素）。
 * 无译文（!cn）的元素照旧不切 —— 没有可挂的译文，切了只会改变锚点口径。 */
const renderSentencesOf = p => {
  const base = sentencesOf(p);
  const out = [];
  base.forEach((s, i) => {
    const parts = s.cn ? renderSplitEn(s.en) : null;
    if (!parts) { out.push({ ...s, rs: 0, si0: i, np: 1 }); return; }
    /* 整段译文挂**每一个**显示句（2026-09-23 修的挂法，v83 只把「整段」的粒度从段缩到元素）：
     * 「逐句对照」档只显示最后一份（非末句副本带 .cn-dup 收起），「点句显示」档点谁弹谁。 */
    parts.forEach((en, k) => out.push({ en, cn: s.cn, rs: k, si0: i, np: parts.length }));
  });
  return out;
};

/* 取「屏幕上被点的那一句」的原文与译文。与 sentenceAt() 的分工：
 *   sentenceAt()        —— 数据口径，按 data-si 取（统计 / 朗读 / qc 用）
 *   displaySentenceAt() —— 显示口径，按 data-si + data-rs 取（查词卡片 / 点句弹译文用）
 *
 * v83：定位键从「位置互斥」改成 (si0, rs) **精确对**。旧前提「普通段 rs 恒 0、
 * 退化段 si 恒 0」被推广切分打破 —— 普通段里被切开的元素 si 和 rs 都非零。
 * 好在 data-si / data-rs 写的都是被点元素自己的 (si0, rs)，精确对查得到：
 *   未切分元素：find(si0===si && rs===0) —— 与旧 list[si] 等价（v77 修的 4,023 句
 *     取错问题在这个分支上行为不变）；
 *   切分元素（含退化段）：find(si0===si && rs===rs) —— 与旧 list[rs] 等价。
 * 回退只服务老锚点：v81 之前退化段的 data-si 写的是显示序号，老锚点 si=2 在
 * si0 口径里不存在 → 回退按 rs 取（rs 是退化段真正的定位键）；再不行按 si0 取
 * 第一个（rs=0 的老锚点落段首，与旧行为一致）。 */
const displaySentenceAt = (a, pi, si = 0, rs = 0) => {
  const p = a && a.paras && a.paras[pi];
  if (!p) return null;
  const list = renderSentencesOf(p);
  return list.find(s => (s.si0 || 0) === si && (s.rs || 0) === rs)
    || list.find(s => rs > 0 && (s.rs || 0) === rs)
    || list.find(s => (s.si0 || 0) === si)
    || null;
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
  const base = typeof window !== "undefined" && window.ARTICLE_METRICS
    ? window.ARTICLE_METRICS[a.id] : null;
  /* 新用户首页直接读预计算值，避免为每张卡扫描全文；已标记认识后只重算 needLearn，
     words/低频词占比仍沿用同一份基准数据，展示口径不会因懒加载点词表而漂移。 */
  if (base && !(S.known || []).length) return { ...base };
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
  if (base) return { words: base.words, needLearn: need.size, unknown: base.unknown, rate: base.rate };
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

/* 单词索引：生词本里存的是 { word, addedAt, articleId }，取词对象别再 O(n) 地 find */
const WORD_BY = new Map(WORDS.map(w => [w.word, w]));
const wordsOf = list => list.map(x => WORD_BY.get(typeof x === "string" ? x : x.word)).filter(Boolean);
/* 记词本条目索引。查词卡 / 正文高亮 / 词汇页都要按词取条目，每次都 O(n) 地
 * some()/find() 在几千词量级上会拖慢整页渲染（正文每个 token 都要过一次）。
 * 刻意不缓存成 Map：S.notebook 随时被增删改，缓存失效点比它省下的开销还多。 */
const nbItem = word => S.notebook.find(item => item.word === word) || null;
const inNotebook = word => !!nbItem(word);

/* ---------------- 生词语境截取 ----------------
 * 生词本里存整句，常带着一堆与目标词无关的从句 —— 复习时真正帮上忙的只有
 * 目标词周围那几个词。规则：
 *   句子 ≤ CLIP_KEEP 个词 → 整句留存（短句本身就是完整语境，截了反而看不懂）
 *   更长的句子           → 截目标词前后各 CLIP_AROUND 个词，两端加省略号
 * 实测样本（25 词长句，目标词 strategy）：
 *   After several difficult months, the company finally adopted a completely
 *   different strategy to attract younger customers who were increasingly
 *   moving to competing platforms.
 *   → adopted a completely different strategy to attract younger customers
 * 目标词找不到时整句返回 —— 宁可多留，也不留半个断句。
 *
 * ⚠️ 中文译文**不跟着截**：机器翻译是按句产出的，没有词级对齐信息，
 * 凭空截一半中文只会得到半句看不懂的话。少给一点英文、给一整句中文，
 * 比两边都残缺对用户更有用。 */
const CLIP_KEEP = 22, CLIP_AROUND = 7;
function clipContext(sentence, word) {
  const text = clean(sentence || "").trim();
  if (!text) return "";
  const words = text.split(/\s+/);
  if (words.length <= CLIP_KEEP) return text;
  const forms = new Set(wordForms(word).map(f => f.toLowerCase()));
  const idx = words.findIndex(w => forms.has(w.replace(/^[^A-Za-z]+|[^A-Za-z]+$/g, "").toLowerCase()));
  if (idx < 0) return text;
  const from = Math.max(0, idx - CLIP_AROUND);
  const to = Math.min(words.length, idx + CLIP_AROUND + 1);
  return (from > 0 ? "… " : "") + words.slice(from, to).join(" ") + (to < words.length ? " …" : "");
}

/* 当前查词卡对应的语境（{ en, cn } | null），由 lookup 动作写入、add-note 读取。
 * 收藏按钮在卡片里、不在句子节点内，closest('.sentence') 拿不到语境，
 * 所以必须在打开卡片那一刻把语境截下来存住。 */
let sheetCtx = null;

/* 当前查词卡的「原文词形」（data-form，如正文里的 adopted 对应词元 adopt）。
 * 2026-09-20 补存：点「更多」的旧实现只调 renderSheet(w)，ctx 与 form 双双丢掉 ——
 * 展开后原句块整块消失、标题从 adopted 退回词元 adopt，
 * 用户看到的是一个自己没点过的词。展开只是把二级信息铺开，
 * 「同一个词、同一句话」这条不能变，所以词形必须和语境一起存住。 */
let sheetForm = null;

/* 正文里刚被点开的那个词 span（下一次整页渲染后即失效）。
 * 用途：轻卡取消模糊遮罩之后正文依然清晰可读，「查的到底是哪一个词」就必须
 * 在正文里指出来，否则一个长句里十几个词、卡片上只有一个孤立的词形。
 * 只加底色，**不动 padding / 字重 / 字号** —— 任何改变行盒的反馈都会自己引起换行，
 * 而换行正是这次要修的那类问题（参见 .para-tts 用 display 而不是 opacity 的历史）。 */
let tappedWordEl = null;
function markTappedWord(el) {
  if (!el || !el.classList) return;   // 事件桩可能没有 classList（tools/audit.js 用 clickEl 时才有）
  if (tappedWordEl && tappedWordEl !== el && tappedWordEl.classList) tappedWordEl.classList.remove("tapped");
  tappedWordEl = el;
  tappedWordEl.classList.add("tapped");
}
function clearTappedWord() {
  if (tappedWordEl && tappedWordEl.classList) tappedWordEl.classList.remove("tapped");
  tappedWordEl = null;
}

/* ---------------- 词汇高亮：三档词集 ----------------
 * 高亮与查词是**两个方向相反**的系统，必须分开：
 *   查词范围要尽可能大（点谁都该有反应），高亮范围要非常克制（染一片就毁阅读）。
 * 旧实现让两者共用一个 KW_TRIE，STOPWORD_HIGHLIGHT 同时管住两边 ——
 * 结果 work / get / know / one 这类词既被 trie 挡在高亮外、又因为是学习词被点词层
 * 排除，两头落空：正文里 16% 的 token 点了没反应（实测 54,088 个 token，8,663 个点不动）。
 * 现在拆开：本节这些集合**只管标色**，查词走下面的 KW_TRIE。 */
const CORE_SET = new Set(WORDS.filter(w => /^List /.test(w.list || "") || w.list === "四级核心" || w.list === undefined).map(w => w.word.toLowerCase()));
const MID_SET = new Set(WORDS.filter(w => w.list === "中学基础").map(w => w.word.toLowerCase()));
/* 完整大纲（data-words-cet4.js，4544 词）保持**独立词表**，不并进 WORDS ——
 * 它比核心层多出 1551 词，但那批词的释义 TAPDICT 里已经能查到；复制进 WORDS
 * 只会让词库页排序、难度统计、例句覆盖三处跟着漂，收益为零。 */
const CET4_SET = new Set([...CORE_SET, ...(typeof WORDS_CET4 === "undefined" ? [] : WORDS_CET4).map(w => String(w).toLowerCase())]);
const ALL_SET = new Set([...CET4_SET, ...MID_SET]);
const EMPTY_SET = new Set();
/* ---------------- 我的导入词库（customVocab）→ 高亮集合 ----------------
 * CUSTOM_SET 与 HL_UNION 都是从 S 派生的缓存：S.customVocab / S.hlSets 任何一处
 * 变动都必须调 rebuildCustomSet()（它连带重建并集），漏调 = 高亮与设置说谎。
 * 变动入口只有四个：导入（追加/覆盖）、删单词、清空、切词源开关 —— 全部收口到
 * 对应的事件分支里调用，audit 有守卫断言这条链。
 * 为什么不用 highlightSet() 里现拼 Set：这个函数在 highlightEn 里**每个 token 调一次**，
 * 一篇长文几千次，现拼 4,544 词的 Set 是纯浪费 —— 与上面 CORE_SET 等常量同一条纪律。 */
let CUSTOM_SET = new Set();
let HL_UNION = CORE_SET;                       // 占位：模块加载完 rebuildAllSets() 后才是真值
const hlAllOff = () => !S.hlSets.core && !S.hlSets.cet4 && !S.hlSets.mid && !S.hlSets.custom;
function rebuildHlUnion() {
  const s = new Set();
  if (S.hlSets.core) for (const w of CORE_SET) s.add(w);
  if (S.hlSets.cet4) for (const w of CET4_SET) s.add(w);   // ⊇ CORE_SET，重复 add 无害
  if (S.hlSets.mid) for (const w of MID_SET) s.add(w);
  if (S.hlSets.custom) for (const w of CUSTOM_SET) s.add(w);
  HL_UNION = s;
}
function rebuildCustomSet() {
  CUSTOM_SET = new Set(S.customVocab || []);
  rebuildHlUnion();
}
rebuildCustomSet();   // S 在本节之前已初始化（第 219 行 normalizeState），这里建初始缓存

/* 自定义词命中只判断成员身份，不看开关状态。关闭高亮时仍包成可点击 span，
 * 之后打开无需重渲染，也不影响查词。**词元 + 原文词形**双向判：导入 work →
 * working 经 resolveToken 还原到 work 命中；导入 working → 原文 data-form 直接命中。
 * 两个方向都是完整单词匹配，不能用 contains()，否则 work 会染上 homework。 */
const customHit = (low, form) =>
  !!low && (CUSTOM_SET.has(low) ||
    (form != null && CUSTOM_SET.has(String(form).replace(/[\u2018\u2019]/g, "'").toLowerCase())));

/* 取当前档位的集合。集合本身是常量（档位没变就不重建），直接返回预建的那个 ——
 * 一篇长文要对它做数千次 has()，每次现拷贝一份 Set 是纯浪费。 */
const highlightSet = () => HL_UNION;

/* 高亮的第二道闸：太短的词与高频功能词不标色 —— with / that / this 全在四级大纲里，
 * 但逐处染色只会把正文变成花布。注意这道闸**只作用于高亮**，绝不作用于查词：
 * 这些词照样能点开、照样能查。 */
const isHighlightable = w => w.length >= 4 && !STOPWORD_HIGHLIGHT.has(w);

/* 就地刷新正文里某个词的标色，不做整页 render —— 重渲染会把阅读滚动位置打回开头。
 * 规则必须与 highlightEn 完全一致（已认识 > 生词 > 高亮词），否则会出现
 * 「卡片关了但正文颜色没跟上」的割裂感。 */
function paintWord(k) {
  /* 规则必须与 highlightEn 逐字对齐 —— 包括自定义词的双向判定：highlightEn 手里有
     原文 token（low），这里没有，但每个 span 的 data-form 存着原文词形（导入 working、
     正文 working 的场景），用同一把 customHit 判才不会出现「卡片关了颜色不变」的割裂。 */
  $$(`.word[data-word="${k}"]`).forEach(n => {
    const known = S.known.includes(k);
    const wb = !known && inNotebook(k);
    const hl = !known && !wb &&
      ((S.hlSets.custom && customHit(k, n.dataset ? n.dataset.form : null)) ||
        (isHighlightable(k) && highlightSet().has(k)));
    n.classList.toggle("known", known);
    n.classList.toggle("wb", wb);
    n.classList.toggle("kw", hl);
  });
}

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

/* 可复制的阅读链接：文章 id 比数组下标稳定，刷新/新会话仍能打开同一篇。 */
function readUrlFor(id) {
  if (typeof location === "undefined") return "";
  try {
    const u = new URL(location.href);
    u.searchParams.set("v", "read");
    u.searchParams.delete("a");
    u.searchParams.set("id", id);
    return `${u.pathname}${u.search}${u.hash}`;
  } catch { return ""; }
}
function syncReadUrl(id) {
  if (!histOk || !id) return;
  const url = readUrlFor(id);
  if (!url) return;
  try { history.replaceState({ ...(history.state || {}), articleId: id }, "", url); } catch { /* 沙箱环境忽略 */ }
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
  /* 存储告警用（2026-09-22）：三角感叹号，只在「我的 → 数据与备份」的告警行出现 */
  alert: '<path d="M12 4.2 20.6 19H3.4L12 4.2Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" fill="none"/><path d="M12 10v4.3M12 16.7v.2" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>',
  download: '<path d="M12 3v11M8 10.5l4 3.5 4-3.5M4.5 19h15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
  upload: '<path d="M12 16V5M8 8.5l4-3.5 4 3.5M4.5 19h15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
  refresh: '<path d="M20 11a8 8 0 1 0-.6 4M20 5v6h-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
  chart: '<path d="M4 20V9M10 20V4M16 20v-7M22 20H2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
  pause: '<path d="M9.2 5v14M14.8 5v14" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>',
  play: '<path d="M8.6 5.4v13.2L19 12z" fill="currentColor"/>',
  stop: '<rect x="7" y="7" width="10" height="10" rx="1.8" fill="currentColor"/>'
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
/* ---------------- 朗读 ----------------
 * ★ 为什么必须自己挑 voice（2026-09-21 之前只设 u.lang 就 speak）：
 *  u.lang 只是给浏览器的**提示**，不是命令 —— 它拿到提示后自行从系统语音表里挑。
 *  实测（桌面 Edge，见 .bak/probe-voices.cjs / probe-fallback.json）：
 *    本机 getVoices() 只返回 3 个，全是 zh-CN（Huihui/Kangkang/Yaoyao），英文 0 个；
 *    注册表 Speech_OneCore\Voices\Tokens 同样只有 3 个中文（Language=804/zh-CN），
 *    英文 Zira 只注册在老的 Speech\Voices\Tokens（SAPI5）里，而 Chromium 不读那一套。
 *  → 请求 en-US 却挑不到任何英语语音，浏览器拿默认 voice 去念英文，音质极差；
 *    更糟的是 onerror 对「用错语言的 voice 念」**不触发**，用户听不出原因，只觉难听。
 *  手机同理：中文系统下默认 voice 跟系统语言走，一样会拿中文声念英文。
 *
 *  打分只看 lang + 名字线索，**不钉死具体 voice 名**：iOS 侧是 Samantha/Daniel、
 *  Android 侧是 Google US English、桌面 Edge 是 Aria Online (Natural) —— 三套列表
 *  完全不同，写死名字换台设备就失效（这个仓库已经踩过「按桌面行为推断手机」的坑）。 */
const VOICE_PRIORITY = [
  [/natural|neural|online|premium|enhanced|siri/i, 40],   // 神经合成：明显更像真人
  [/google|samantha|alex|daniel|karen|moira|tessa|serena|aria|jenny|guy|ava|allison|emma/i, 18],
  [/desktop|espeak|compact|eloquence|pico/i, -70],        // 老引擎：有别的可挑就不选它
];
/* 速率三档。默认 1.0 对精读偏快 —— 跟读时句子已经念完，学习者只能干瞪眼。
 * 单词再慢一档：单词语境为零，音素听不清就等于没读。 */
const RATE_MAP = { slow: 0.72, std: 0.9, fast: 1.05 };
const rateOf = kind => {
  const base = RATE_MAP[S.rate] || RATE_MAP.std;
  return kind === "word" ? Math.max(0.5, base - 0.08) : base;
};

/* 返回最合适的英语 voice；一个英语语音都没有时返回 null（**绝不退回中文 voice**）。
 * 上层据此提示用户，而不是静默降级成「中文声念英文」。 */
function pickVoice(lang) {
  const ss = window.speechSynthesis;
  if (!ss || typeof ss.getVoices !== "function") return null;
  const want = String(lang || "en-US").replace("_", "-").toLowerCase();
  const vs = ss.getVoices() || [];
  let best = null, top = -Infinity;
  for (const v of vs) {
    const vl = String(v.lang || "").replace("_", "-").toLowerCase();
    /* 非英语语音一律跳过 —— 宁可挑不到（上层会提示），也不能拿中文声念英文。
     * 这一条就是「朗读难听」的根因所在，改动它等于把问题放回去。 */
    if (!vl.startsWith("en")) continue;
    let s = vl === want ? 100 : 60;                       // 口音精确匹配 > 只要是英语
    for (const [re, w] of VOICE_PRIORITY) if (re.test(v.name || "")) s += w;
    if (v.localService) s += 2;                           // 同档优先本地（断网也读得出）
    if (s > top) { top = s; best = v; }
  }
  return best;
}

let voiceWarned = false;         // 「语音表为空」的软提示只给一次（可能是未加载，别每句都弹）
let voiceBlockedWarned = false;  // 「确实没有英语语音」的拦截提示单独计数 —— 两个态会先后出现
                                 // （语音表异步加载：第一次点击表还空着，第二次就有中文没英语），
                                 // 共用一个标志会让第二种更有用的提示被第一种吃掉（2026-09-25 实测）。
const makeUtterance = (text, kind) => {
  const u = new SpeechSynthesisUtterance(text);
  u.lang = S.accent || "en-US";
  u.rate = rateOf(kind);
  const v = pickVoice(u.lang);
  if (v) { u.voice = v; return u; }
  /* 挑不到英语语音分两种情况，处置相反（2026-09-25，阶段 0 设备基线实测）：
   * ① 语音表**非空**但无英语 —— 提交播放只会「用错误语言念」或干脆无声（手机端
   *    「点了没反应」正是这个形状）：不再提交，给一句可执行的说明。
   * ② 语音表**为空** —— 多半是尚未加载（iOS 首次 speak 前 getVoices() 恒空，
   *    Chrome 要等 voiceschanged）：照常提交，speak 用默认音色反而能出声；
   *    把「尚未加载」当「确实没有」会误杀 iOS。真缺语音时 onerror 会再提示。 */
  const vs = (window.speechSynthesis && window.speechSynthesis.getVoices) ? (window.speechSynthesis.getVoices() || []) : [];
  if (vs.length) {
    if (!voiceBlockedWarned) { voiceBlockedWarned = true; toast("此设备没有英文语音包 · 无法朗读英文"); }
    return null;
  }
  if (!voiceWarned) {
    voiceWarned = true;
    toast("未找到英文语音包 · 朗读可能失真");
  }
  return u;
};

/* ---- 全文朗读：一句一条、onend 推进 ----
 * 为什么不再把全文 join(" ") 塞进一条 utterance（2026-09-21 改）：
 *   ① Chromium/Safari 对超长文本有中途停止的已知问题，本库长文正文可达两万字符级，必踩；
 *   ② 一条到底就无从知道读到哪、也无法暂停续读或高亮当前句。
 * 暂停用「记住序号 + cancel + 续读时重播该句」，不用 speechSynthesis.pause()：
 * iOS Safari 的 pause/resume 历史行为不可靠，自管队列才是跨平台一致的做法。 */
let spList = null;    // 字符串数组 = 正在朗读 / 已暂停；null = 空闲
let spAt = 0;         // 当前该读第几句（暂停后续读就从这里重播）
let spPaused = false;
let spSeq = 0;        // 会话编号：speakAll 每开一个新队列 +1。旧会话迟到的 onend/onerror
                      // 凭 seq 失配被丢弃 —— 只靠 spList === null 认不出「新队列已顶上」
                      // （stopSpeech → speakAll 连着调用时旧回调到达，spList 已非 null）。
let spKeepAlive = null; // 最近一条 utterance 的引用：Chromium 会回收「无人引用」的
                        // utterance，引擎随即报错或中途停声，必须留着不让 GC 碰它。
const spActive = () => spList !== null;

/* fab-bar 在朗读时从「工具条」切成「播放器」—— 复用同一个浮层，不新增浮层，
 * 免得再往正文上压一层（2026-09-21 刚把朗读喇叭移出正文行盒）。 */
function syncSpeechBar() {
  const bar = $("#fab-bar");
  if (!bar || !bar.classList) return;
  const on = spActive();
  bar.classList.toggle("speaking", on);
  bar.classList.toggle("paused", on && spPaused);
  const prog = $("#fab-prog");
  if (prog && prog.textContent !== undefined) {
    prog.textContent = on ? `${Math.min(spAt + 1, spList.length)}/${spList.length}` : "";
  }
  const play = $("#fab-play");
  if (play && play.setAttribute) {
    play.setAttribute("aria-label", spPaused ? "继续朗读" : "暂停朗读");
  }
}

/* 主动结束（用户按停止 / 离开阅读页 / 重开一段朗读）都走这里。
 * 先把 spList 置空再 cancel：cancel() 会让当前 utterance 走到 onerror，
 * 回调里靠 spList === null 认出「这是自己主动打断的」，不弹错误提示、也不推进队列。 */
function stopSpeech() {
  spList = null; spAt = 0; spPaused = false;
  if (window.speechSynthesis) { try { speechSynthesis.cancel(); } catch (e) {} }
  syncSpeechBar();
}

function stepSpeech() {
  if (spList === null || spPaused) return;
  if (spAt >= spList.length) { stopSpeech(); return; }
  const u = makeUtterance(spList[spAt], "sent");
  if (!u) { stopSpeech(); return; }     // 播到一半查无英语语音：停下，绝不退回错误语言
  const seq = spSeq;                     // 本句所属会话；旧会话的迟到回调凭 seq 失配丢弃
  u.onend = () => {
    if (seq !== spSeq || spList === null || spPaused) return;   // 停止/换会话/已暂停都不推进
    spAt++; syncSpeechBar(); stepSpeech();
  };
  u.onerror = ev => {
    if (seq !== spSeq || spList === null) return;   // 主动 cancel 引起的，不算错
    const err = ev && ev.error;
    if (err === "interrupted" || err === "canceled") return;   // 同上，换个浏览器叫法不同
    stopSpeech();
    toast("朗读中断 · 系统语音出错");
  };
  spKeepAlive = u;
  speechSynthesis.speak(u);
  syncSpeechBar();
}

function speakAll(a) {
  /* ★ 必须走 renderSentencesOf，不能走 textSentences（2026-09-22）：
   *   退化段在数据里是「1 个句级元素里塞 5 句英文」（AI 栏目 510 处），
   *   textSentences 会把整段 5 句当**一条** utterance 念出去 —— 正是 v72 修掉的那个病
   *   （全文 209 句 join(" ") 塞一条 utterance，长文被引擎中途掐断）。
   *   走渲染切分后，队列里就是屏幕上看到的一行一句。 */
  const list = (a && Array.isArray(a.paras) ? a.paras : [])
    .flatMap(p => renderSentencesOf(p)).filter(s => s.en).map(s => s.en);
  if (!list.length) return;
  if (!window.speechSynthesis) { toast("当前系统不支持朗读"); return; }
  try { speechSynthesis.cancel(); } catch (e) {}
  spList = list; spAt = 0; spPaused = false;
  spSeq++;                               // 新会话：旧队列一切迟到回调就地失效
  syncSpeechBar();
  stepSpeech();
}

function togglePauseSpeech() {
  if (spList === null) return;
  if (spPaused) {
    spPaused = false;
    stepSpeech();                          // 从 spAt 重播当前这句
  } else {
    spPaused = true;
    try { speechSynthesis.cancel(); } catch (e) {}
    syncSpeechBar();
  }
}

/* 单条朗读（单词 / 单句）。打断正在进行的全文朗读是预期行为 —— 用户点了别的就听别的。
 * ⚠️ onerror 的提示必须保留：不是每个系统都装了对应口音的语音包，选英音却听不到声音时
 *    多半是系统缺语音库而不是代码坏了，得让用户看到原因，不能无声失败。 */
const speak = (t, kind) => {
  try {
    if (!window.speechSynthesis) { toast("当前系统不支持朗读"); return false; }
    stopSpeech();
    const u = makeUtterance(t, kind || "sent");
    if (!u) return false;                // 设备有语音表但无英语：makeUtterance 已提示，这里不播
    spKeepAlive = u;                     // 留引用防 GC（回收 utterance 会引擎报错/停声）
    u.onerror = ev => {
      /* interrupted/canceled = 「又点了新的」主动打断——此刻新句子正在正常出声，
       * 旧回调弹「朗读失败」是假失败（2026-09-25 复现探针
       * .bak/probe-tts-cancel-race.cjs：每次 cancel 都发 error=interrupted）。 */
      const err = ev && ev.error;
      if (err === "interrupted" || err === "canceled") return;
      toast("朗读失败 · 系统可能没有这个口音的语音包");
    };
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
  "人物":   { icon: "sparkle", bg: "linear-gradient(135deg,#d4b89c,#855349)" },
  "足球":   { icon: "ball",    bg: "linear-gradient(135deg,#10B981,#047857)" },
  "AI":     { icon: "sparkle", bg: "linear-gradient(135deg,#A78BFA,#4F46E5)" },
  "寓言":   { icon: "book",    bg: "linear-gradient(135deg,#2DD4BF,#0F766E)" },
  "成长":   { icon: "sun",     bg: "linear-gradient(135deg,#34D399,#059669)" }
};
/* 发现页栏目副标题。★ 独立成表的原因：原来写在模板里是一串三元表达式（`c === "人物" ? … : c === "足球" ? … : "关于思考、生活与自我成长"`），
 * 默认分支是「成长」的文案。2026-09-20 接 Offbook 的 AI 专栏（43 篇，占全库 3/4）后，
 * 这 43 篇会顶着「关于思考、生活与自我成长」显示 —— 加栏目时没人会记得去改那串三元。
 * 表里没有的栏目才落默认值。 */
const CAT_BLURB = {
  "人物": "人物访谈与镜头里的故事",
  "足球": "走进绿茵场内外",
  "AI": "AI 时代的工作、学习与组织",
  "成长": "关于思考、生活与自我成长"
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

/* ---------------- 首页封面轮换池（2026-09-22 v74） ----------------
 * 首页那块大图原来写死「第一篇人物文」（Anna Hathaway 永远霸屏），改成每次进站
 * 从人物栏目里随机挑一张照片 + 连标题/署名/跳转一起换。
 *
 * 【为什么是硬编码白名单，不是运行时量宽高比】
 * 浏览器里拿不到图片的宽高（要等加载完成、或另起 Image 去 decode），而这块图必须在
 * 首屏渲染时就位。图片比例是**构建期事实**，所以量一次、写死在这儿。
 * 比例由 tools/audit.js 的 [H2] 守卫反查 img-size 表核对 —— 手写错一个数字会被拦。
 *
 * 【为什么只挑横构图（宽/高 ≥ 1.4）】
 * `.editorial-photo` 是宽幅位，实测（Edge 探针 `.bak/probe-home-cover.cjs`）：
 * 窄屏 420px 时 378×248 = **1.52 : 1**，桌面 1280px 时 565×388 = **1.46 : 1**。
 * 配 `object-fit: cover`：横图裁掉的两侧可以忽略，竖图却要裁掉 **50% 以上**，
 * 只剩一条窄缝 —— 人物上半身以下的构图全没了。人物 48 张照片里只有 **9 张**是横构图，
 * 硬上全部等于让 80% 的展示都在切主体。
 * 所以宁少勿滥：**只上横图**。每一项的真实宽高都记在 `tools/audit.js` 的 `IMG_SIZE` 里，
 * 手滑塞进一张竖图会被 [H2] 守卫当场拦下（这次就是这么抓到 `eva-green-0` 是 1077×1400 的）。
 * 代价说清楚：池子只覆盖 **3 篇**（安妮·海瑟薇 / 蕾雅·赛杜 / 蕾切尔·薇兹），
 * 佐伊·多伊奇与伊娃·格林两篇全是竖图，一次都不会出现。**这是刻意的**，不是漏配。
 *
 * ★ 2026-09-24 梅根·福克斯篇整篇下架（用户决定），池子从 14 项 / 4 篇变 **9 项 / 3 篇** ——
 *   她那一篇原本贡献 5 张横图。**删文章必须同步删池子**：留着的话 `pickEditorialLead()`
 *   会抽到一张已不存在的封面，首页大图直接空掉（而 [H2] 的第一条断言正好会拦住它）。 */
const LEAD_PHOTO_POOL = [
  /* 篇封面（`coverImg` 字段，不在 paras[].img 里），3 篇有横封面的全收 */
  "people-anne-hathaway-mother-mary-0",   // 720x405  = 1.78
  "people-rachel-weisz-archive-0",        // 765x510  = 1.50
  "people-lea-seydoux-bond-girl-0",       // 685x456  = 1.50
  /* 正文横构图照片（`paras[].img`） */
  "people-anne-hathaway-mother-mary-1",   // 720x490  = 1.47
  "people-anne-hathaway-mother-mary-3",   // 720x486  = 1.48
  "people-anne-hathaway-mother-mary-4",   // 720x480  = 1.50
  "people-anne-hathaway-mother-mary-7",   // 720x500  = 1.44
  "people-anne-hathaway-mother-mary-8",   // 720x490  = 1.47
  "people-lea-seydoux-bond-girl-2",       // 1100x733 = 1.50
];

/* 从白名单里随机挑一张，并解析出它属于哪一篇。
 *
 * 【为什么改成「每次加载随机一次」，而不是 v74 的「每次 renderHome() 重挑」】
 * v74 刻意不缓存，注释里写的理由是「真随机、每次打开就换」。实测站不住：
 * 主渲染是 `screen.innerHTML = body + tabbar()` —— 整页 DOM 重建（见下方 render()）。
 * 于是首页**任何**一次重绘（点返回 / 切主题 / 打卡回来 / 点 tab）都会把那一屏
 * 413×440 的大图**删掉再新建**（一次 style/layout/paint），而且每次都挑到
 * **不同的**一张 —— 用户看到的是「点一下，大图突然换成另一个人」。
 * 视觉新鲜感的收益，远小于「可感知的重排 + 界面不稳定」的代价。
 *
 * 现在：**页面加载时随机一次 → 本次会话固定**；刷新 / 下次打开才重新随机。
 * 池子还是 14 张、还是随机，只是随机性每次加载只消耗一次。
 *  ⚠️ 不许改回「每次渲染重挑」，也不要在渲染路径里新加 Math.random()。
 *     想要「每天固定一张」就按日期取种（拿 `ymdTZ(new Date())` 当种子），
 *     别退回渲染时随机 —— 那是这一版专门废掉的设计。
 * 与上面 homeReads 那套「渲染只读、翻页才动位置」的纪律**方向一致**了：
 * 渲染只读，状态只在明确时机（加载 / 翻页）变。
 *
 * 解析规则有**两条路**（一开始只写了第二条，[H2] 守卫当场抓到 6 个封面全解析不到）：
 *   ① 该篇 `coverImg` === `assets/covers/<key>.jpg` → 封面（`-0` 那批走这条）
 *   ② 该篇 `paras[].img` 里有 === 该路径的段 → 正文照（能顺带取到 alt / credit）
 * 命中不了（图被删 / 改了文件名）就返回 null，调用处回退到原来的固定第一篇。 */
const LEAD_PHOTO_IDX = new Map();
function leadPhotoPoolItems() {
  if (LEAD_PHOTO_IDX.size) return [...LEAD_PHOTO_IDX.values()];
  if (typeof ARTICLES === "undefined" || !Array.isArray(ARTICLES)) return [];
  for (const key of LEAD_PHOTO_POOL) {
    const path = `assets/covers/${key}.jpg`;
    for (const a of ARTICLES) {
      if (a.cat !== "人物") continue;
      /* ① 封面：alt 用人物名，credit 退回该篇统一的 photoCredit */
      if (a.coverImg === path) {
        LEAD_PHOTO_IDX.set(key, { a, img: path, alt: a.personZh || a.person || "", credit: a.photoCredit || "" });
        break;
      }
      /* ② 正文照：段自带 alt / credit */
      const p = (a.paras || []).find(x => x.img === path);
      if (p) {
        LEAD_PHOTO_IDX.set(key, { a, img: path, alt: p.alt || a.personZh || "", credit: p.credit || a.photoCredit || "" });
        break;
      }
    }
  }
  return [...LEAD_PHOTO_IDX.values()];
}

/* 首页封面这一屏：随机取一「篇 + 一张图」。
 * 同一篇的 `-0` 封面和正文照都可能在池子里，命中哪个就用哪个 —— 不必两两配对，
 * 因为 `.editorial-photo` 的 img 是 cover 裁切，同一篇换一张照就是换一个视角。
 *
 * 「随机一次」的粒度是**每次页面加载**（理由见上面 LEAD_PHOTO_POOL 那段注释）。
 * `leadPhotoPinned` 就是本次会话钉住的那一张。用 `let` 而不是模块内闭包变量 ——
 * audit 的 [H2] 要把它重置回 null 才能测「重新随机后能不能换」，
 * 见 tools/audit.js 的 `ctx('leadPhotoPinned = null;')`
 * （vm 顶层 let 跨 runInContext 可读可写，本机实测确认过）。 */
let leadPhotoPinned = null;
function pickEditorialLead() {
  if (leadPhotoPinned) return leadPhotoPinned;
  const items = leadPhotoPoolItems();
  /* ⚠️ 池子为空（数据层还没就绪）时**不写缓存** —— 写了就把 null 钉死，
   * 这一整次会话都不再有封面。留空让它下次渲染重试。 */
  if (!items.length) return null;
  leadPhotoPinned = items[Math.floor(Math.random() * items.length)];
  return leadPhotoPinned;
}

/* 相对时间：今天 / 昨天 / N 天前 / N 周前 */
function fmtWhen(date) {
  if (!date) return "";
  const todayBj = ymdTZ(new Date());
  if (date === todayBj) return "今天";
  const t = Date.parse(`${date}T12:00:00+08:00`);
  if (isNaN(t)) return date;
  const bjNow = new Date();
  const bjHour = +new Intl.DateTimeFormat("en-CA", { timeZone: TZ, hour: "numeric", hour12: false }).format(bjNow);
  const refMs = Date.parse(`${todayBj}T${String(bjHour).padStart(2, "0")}:00:00+08:00`);
  const days = Math.max(1, Math.round((refMs - t) / 86400000));
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
  const mins = estMinutes(a);
  /* 长文给「可分次读」预期：20 分钟以上按一次读不完设计（2026-09-22 v75 用户要求） */
  const long = mins >= 20;
  /* 信息顺序（v75）：标题 → 中文辅助 → 人物名 → 栏目/来源 → 时长；「需学 N 词」降为次要位。
     旧版把栏目 tag 放在最前，扫一列卡片时先看到的全是「人物/人物」而非标题本身。 */
  return `
  <div class="article${a.cat === "人物" ? " people-card" : ""}${done ? " read" : ""}" data-article="${a.id}" role="button" tabindex="0" aria-label="阅读文章：${esc(clean(a.title))}${tzh ? `，${esc(tzh)}` : ""}${done ? "，已读" : ""}">
    ${thumbHtml(a, img)}
    <div class="col grow article-copy" style="gap:6px">
      <div class="t">${esc(clean(a.title))}${done ? ` <span class="read-dot" title="已读完">已读</span>` : ""}</div>
      ${tzh ? `<div class="t-zh">${esc(tzh)}</div>` : ""}
      ${a.personZh ? `<span class="people-name">${esc(a.personZh)}</span>` : ""}
      <span class="tag">${esc(clean(a.cat))}<span class="tag-separator">/</span>${esc(srcName(a))}${a.cat === "人物" ? ` · ${Number(a.photoCount) || 0} 张摄影` : ""}</span>
      <span class="meta article-meta"><span>${mins} 分钟阅读${long ? " · 可分次读" : ""}</span><span>需学 ${needLbl} 词${when ? ` · ${esc(when)}` : ` · ${diffTier(articleStats(a).rate).label}`}</span></span>
    </div>
  </div>`;
};

/* 共用杂志封面：正文与摄影分栏，长标题不压在照片上。
 *
 * `photo` 是**首页专用的覆盖参数**：`{img, alt, credit}` —— 只换照片本身。
 * 标题 / 署名 / CTA 全部照旧走 `a` 的字段，因为那三样是「文章」的属性，
 * 换成同一篇的**另一张正文照**时它们一个字都不该变。
 * 不给 photo（发现页「编辑精选」那条路径）时行为与改动前完全一致。
 *
 * 为什么不塞进 `a.coverImg`：那是**数据对象自身的字段**，改了会污染
 * `coverOf(a)` 的所有其它调用点（发现页精选 / 分类磁贴 / 首页卡缩略图
 * 全都读它），换一次首页封面会把整站的缩略图一起改掉。 */
const editorialFeature = (a, label = "本期精选", photo = null) => {
  if (!a) return "";
  const cover = photo && photo.img ? photo.img : coverOf(a);
  const coverAlt = photo && photo.alt ? photo.alt : (a.personZh || a.person || a.cat);
  /* 这张图在原刊的摄影署名。首页那屏不单列一行 credit（版面已经很满），
     折进「9 张摄影」那串里显示成「9 张摄影 · Annie Leibovitz / Vogue」。 */
  const credit = photo && photo.credit ? photo.credit : (a.photoCredit || "");
  return `<section class="editorial-feature${a.cat === "人物" ? " is-portrait" : ""}">
    <div class="editorial-copy">
      <div class="eyebrow"><span class="edition-dot"></span>${label}<span class="eyebrow-divider">/</span>${esc(a.cat)}</div>
      <h2>${esc(zhTitle(a) || clean(a.title))}</h2>
      <p class="editorial-en" lang="en">${esc(clean(a.title))}</p>
      <div class="editorial-credit">${esc(srcName(a))}<span>·</span>${estMinutes(a)} 分钟阅读${a.photoCount ? `<span>·</span>${a.photoCount} 张摄影${credit ? ` · ${esc(credit)}` : ""}` : ""}</div>
      <button class="editorial-cta" data-article="${esc(a.id)}">读这篇文章 ${svg("arrow", 16)}</button>
    </div>
    <button class="editorial-photo" data-article="${esc(a.id)}" aria-label="阅读精选：${esc(clean(a.title))}">
      ${cover ? `<img src="${esc(cover)}" alt="${esc(coverAlt)}" fetchpriority="high" decoding="async">` : `<span class="cover-monogram" aria-hidden="true">W.</span>`}
      <span class="photo-label">${a.cat === "人物" ? "THE PEOPLE ISSUE" : "THE READING EDIT"}</span>
      <span class="photo-arrow" aria-hidden="true">↗</span>
    </button>
  </section>`;
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
  /* 首页大图 = 人物栏目随机一「篇 + 图」（见 pickEditorialLead），没有池子就退回
     原来那篇固定人物文。`leadPhoto` 为 null 时 editorialFeature 自己回退 coverOf。 */
  const leadPhoto = pickEditorialLead();
  const lead = (leadPhoto && leadPhoto.a) || ARTICLES.find(a => a.cat === "人物" && coverOf(a)) || reads[0];
  const categories = CATEGORIES.filter(c => c !== "全部" && ARTICLES.some(a => a.cat === c));
  /* 阅读主页 v75 顺序：问候 → 继续阅读（紧凑卡）→ 本期精选 → 今日推荐 → 兴趣分类。
     旧版续读卡藏在右侧栏（推荐之后），手机上几乎不可达；统计大数字缩成轻量一行，
     完整统计归「我的」。 */
  return `
    ${statusbar()}
    <div class="view home-view">
      <header class="page-intro home-intro">
        <div><div class="eyebrow">A LITTLE READING, EVERY DAY</div><h1>读英文，也读世界<span class="title-period">。</span></h1><p>${greet}，从一篇好文章开始，让英语走进日常。</p></div>
        <div class="reading-date"><span>YOUR DAILY PAGES</span><b>${new Date().toLocaleDateString("zh-CN", { timeZone: "Asia/Shanghai", month: "long", day: "numeric" })}</b><small>${examCountdownLabel()}</small></div>
      </header>

      <section class="home-resume">${last ? `
        <button class="card resume-card" data-article="${last.id}" role="button" tabindex="0" aria-label="继续阅读：${esc(clean(last.title))}">
          <span class="rc-chip">${svg("book", 12)} 继续阅读${S.lastRead.at ? " · " + esc(fmtWhen(new Date(S.lastRead.at).toISOString().slice(0, 10))) : ""}</span>
          <span class="rc-title">${esc(clean(last.title))}</span>
          ${zhTitle(last) ? `<span class="rc-zh">${esc(zhTitle(last))}</span>` : ""}
          <span class="rc-meta">
            <span class="chip">${esc(last.cat)}</span>
            <span class="rc-bar"><span style="width:${Math.max(2, S.lastRead.pct || 2)}%"></span></span>
            <span class="rc-pct">${S.lastRead.pct ? "读到 " + S.lastRead.pct + "%" : "刚开始"}</span>
            <span class="rc-go">继续 ${svg("arrow", 12)}</span>
          </span>
        </button>` : `
        <button class="card resume-card" data-act="go-discover" role="button" tabindex="0" aria-label="去发现页挑一篇文章">
          <span class="rc-chip">${svg("book", 12)} 开始阅读</span>
          <span class="rc-title">从今天的一篇文章开始</span>
          <span class="rc-meta"><span class="chip">${ARTICLES.length} 篇可选</span><span class="rc-go">去挑一篇 ${svg("arrow", 12)}</span></span>
        </button>`}
      </section>

      ${editorialFeature(lead, "本期精选", leadPhoto)}

      <div class="home-reading-layout">
      <section class="home-picks">
        <div class="section-heading"><div><span class="eyebrow">PICKED FOR YOU</span><h2>今日推荐</h2></div><button class="text-action" data-act="home-reroll">${svg("refresh", 14)} 换一批</button></div>
        <div class="article-grid">${reads.map(articleCard).join("")}</div>
      </section>
      <aside class="reading-sidebar">
      <div class="section-heading"><div><span class="eyebrow">YOUR READING SPACE</span><h2>留一点时间给阅读</h2></div></div>
      <div class="reading-stats-lite">已读完 <b>${done}</b> 篇 · 累计阅读 <b>${mins}</b> 分钟 · 完整统计在「我的」</div>

      <div class="reading-note"><span class="note-icon">${svg("book", 24)}</span><p>不急着读完，<br>让每一次阅读都有收获。</p><span>点词查义 · 中英对照 · 自动续读</span></div>
      </aside>
      </div>
      <section class="home-topics">
        <div class="section-heading"><div><span class="eyebrow">FOLLOW YOUR CURIOSITY</span><h2>从兴趣出发</h2></div><button class="text-action" data-act="go-discover">全部文章 ${svg("arrow", 14)}</button></div>
        <div class="topic-grid">${categories.map(c => `<button class="topic-link" data-cat="${c}" data-go="1"><span class="topic-icon">${svg((CAT_META[c] || {}).icon || "book", 24)}</span><span class="grow"><b>${esc(c)}</b><small>${CAT_BLURB[c] || "关于思考、生活与自我成长"}</small></span><span class="topic-count">${ARTICLES.filter(a => a.cat === c).length} 篇 ${svg("arrow", 14)}</span></button>`).join("")}</div>
      </section>
      <footer class="editorial-footer"><span>WordLens / 词阅</span><span>One good read at a time.</span></footer>
    </div>`;
}
const PAGE = 20;
let shown = PAGE;
const clipList = items => items.slice(0, shown);
const moreRow = (items, act) => items.length > shown
  ? `<button class="more-row" data-act="${act}" role="button" tabindex="0">显示更多 · 还有 ${items.length - shown} 篇</button>`
  : "";

/* 发现页「编辑精选」紧凑横卡（v75）：旧版复用首页的 editorialFeature 大块，
 * 与首页视觉完全重复、还把文章列表推到第二屏开外。横卡一行放得下：
 * 图（方裁）+ 标题 + 中文 + 栏目·时长，点击整卡进文章。 */
const compactFeature = a => {
  const img = coverOf(a);
  const tzh = zhTitle(a);
  const mins = estMinutes(a);
  return `<button class="compact-feature" data-article="${a.id}" role="button" tabindex="0" aria-label="阅读编辑精选：${esc(clean(a.title))}">
    ${img
      ? `<img class="cf-img" src="${esc(img)}" alt="" loading="lazy" decoding="async">`
      : `<span class="cf-img cf-fallback" style="background:${esc(a.gradient || "var(--brand-soft)")}" aria-hidden="true">W.</span>`}
    <span class="cf-copy">
      <span class="eyebrow">编辑精选<span class="eyebrow-divider">/</span>${esc(a.cat)}</span>
      <span class="cf-title">${esc(clean(a.title))}</span>
      ${tzh ? `<span class="cf-zh">${esc(tzh)}</span>` : ""}
      <span class="cf-meta">${esc(srcName(a))} · ${mins} 分钟阅读${mins >= 20 ? " · 可分次读" : ""}</span>
    </span>
    <span class="cf-go" aria-hidden="true">${svg("arrow", 14)}</span>
  </button>`;
};

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

  /* 「全部」视图 = 编辑精选（紧凑横卡）+ 最新更新。
     v75 删掉了「按分类浏览」磁贴网格：分类入口与顶部分类标签是**重复的两套**，
     磁贴又把文章列表推到第二屏开外 —— 现在分类入口只有顶部标签一处。
     （原 catGridHtml 生成段已删；磁贴样式 .cat-browse/.cat-grid 留在 CSS 里给
     `残骸守卫`盯 —— 见 audit [H4]。） */
  const catGridHtml = "";

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
      <div class="col"><span style="font-family:var(--font-en);font-weight:600;font-size:14px">${w.word}</span><span class="phonetic">${w.phonetic}</span></div>
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

  return `
    ${statusbar()}
    <div class="view view-flow discover-view">
      <header class="page-intro">
        <div><div class="eyebrow">THE READING COLLECTION</div><h1>发现好文章<span class="title-period">。</span></h1><p>循着好奇心，找到下一篇想读的故事。</p></div>
        <div class="row" style="gap:8px">
          <span class="icon-btn" data-act="theme" title="切换深浅色" role="button" tabindex="0" aria-label="切换深浅色">${svg(S.theme === "dark" ? "sun" : "moon", 16)}</span>
        </div>
      </header>
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
        <button class="sort-text" data-act="filter" title="切换排序" role="button" tabindex="0" aria-label="切换排序，当前为${SORTS[sortBy]}">${svg("filter", 13)} ${SORTS[sortBy]}</button>
      </div>

      ${wordsHtml}
      ${artHitsHtml}
      ${emptyHtml}
      ${lastHtml}
      ${featured ? compactFeature(featured) : ""}
      ${catGridHtml}
      ${isAll ? `<div class="lib">
        <div class="ic">${svg("cards", 20)}</div>
        <div class="col grow" style="gap:4px">
          <div class="t">四级词库</div>
          <div class="s">${WORDS.length.toLocaleString()} 词 · 阅读中可点击查义</div>
        </div>
      </div>` : ""}
      ${latestHtml}
      ${catListHtml}
      <footer class="editorial-footer"><span>WordLens / 词阅</span><span>Stay curious. Keep reading.</span></footer>
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
      <header class="page-intro">
        <div><div class="eyebrow">PAGES YOU HAVE VISITED</div><h1>阅读记录<span class="title-period">。</span></h1><p>上次读到的地方，随时可以接着读。</p></div>
        <span class="icon-btn" data-act="go-back" role="button" tabindex="0" aria-label="返回">${svg("back", 16)}</span>
      </header>
      <div class="search history-search">${svg("search", 16)}<input id="history-q" placeholder="搜索读过的文章" value="${esc(historyQuery)}" aria-label="搜索读过的文章" /></div>
      <div class="history-filters">${seg("all", "全部")} ${seg("unfinished", "未读完")} ${seg("finished", "已读完")}<span class="muted-2">共 ${all.length} 篇</span></div>
      ${rows || `<div class="card history-empty">${all.length ? "没有符合条件的记录" : "还没有阅读记录，先去发现页读一篇吧"}</div>`}
    </div>`;
}

/* ---------------- 词汇页（原「记词本」） ----------------
 * 不做成普通单词列表：每条生词都带着「在哪里遇到的、那句话怎么说」。
 * 复习时回忆的应该是「哦，这是我在那篇 C 罗的文章里见过的词」，
 * 而不是「strategy = 策略」这种无锚点的机械重复 —— 前者记忆强度高得多。
 * 分组也不是装饰：需要重点学习 = 反复遇到却还在查的词，那是真正卡住人的那几个。 */
/* 生词行。只有四件事值得占地方：词、释义、**你遇见它的那半句话**、出处。
 * 语境是整条记录的价值所在 —— 复习时回忆的是「我在那篇文章里见过它」，
 * 而不是孤零零一个中文释义。数字（遇到几次 / 查过几次）刻意不显示：
 * 它们是行为的副产品，不构成任何可靠判断，摆在卡片上只会让人以为自己该焦虑。 */
function nbRowHTML(it, known) {
  const w = WORD_BY.get(it.word);
  if (!w) return "";
  const shortDef = String(w.def || "").split("\n")[0] || w.def;
  const artId = it.articleId && ARTICLES.some(a => a.id === it.articleId) ? it.articleId : "";
  const artTitle = it.articleTitle || (artId ? clean(ARTICLES.find(a => a.id === artId).title || "") : "");
  const c = it.context;
  const ctx = c && c.en
    ? `<div class="nb-ctx">
        <div class="nb-ctx-en">${hlWord(c.en, it.word)}</div>
        ${c.cn ? `<div class="nb-ctx-cn">${esc(c.cn)}</div>` : ""}
      </div>`
    : "";
  return `<div class="nb-row" data-word="${esc(w.word)}">
    <div class="nb-main" data-act="lookup" data-word="${esc(w.word)}">
      <div class="nb-word-row">
        <span class="nb-word">${esc(w.word)}</span>
        <span class="nb-phonetic">${esc(w.phonetic || "")}</span>
        ${known ? `<span class="nb-known-tag">已认识</span>` : ""}
      </div>
      <div class="nb-def">${esc(w.pos || "")} ${esc(shortDef)}</div>
      ${ctx}
      ${artTitle && artId ? `<div class="nb-from"><button class="nb-source" data-act="nb-open-art" data-id="${esc(artId)}" title="${esc(artTitle)}">${esc(artTitle)}</button></div>` : ""}
    </div>
    <button class="nb-del" data-act="remove-note" data-word="${esc(w.word)}" aria-label="移除 ${esc(w.word)}">${svg("close", 14)}</button>
  </div>`;
}

/* 词汇页只回答两个问题：「这个生词是什么」（生词 Tab）、「哪些我已经认识了」
 * （已认识 Tab）。刻意不做「需要重点学习」这类分级 —— 遇到过几次、查过几次
 * 都是行为的副产品，不构成任何可靠的掌握度证据，硬造一个榜单只会误导。
 * vocabTab 是页内状态（不落盘）：进来默认看生词，切 Tab 不该被记成偏好。 */
let vocabTab = "new";
/* ---------------- 我的词库管理页（页内状态，不落盘） ----------------
 * cvImportOpen 导入面板展开态；cvDraft 是 textarea 草稿（re-render 会重建 DOM，
 * 值必须活在状态里，否则追加确认后的二次渲染把用户粘的词全弄丢）；
 * cvArmedClear / cvArmedOver 是两个破坏性动作的两段式确认（第一击只进入待确认态）；
 * cvQuery 搜索过滤。 */
let cvImportOpen = false, cvDraft = "", cvArmedClear = false, cvArmedOver = false, cvQuery = "";
/* 列表渲染上限：几千词的 DOM 一次全画会卡；搜索 + 截断够用，
 * 真要浏览全量词表的人是极少数，导出 JSON 再看更现实。 */
const CV_RENDER_CAP = 300;

function renderCustomVocab() {
  const words = S.customVocab || [];
  const q = cvQuery.trim().toLowerCase();
  const shown = (q ? words.filter(w => w.includes(q)) : words).slice(0, CV_RENDER_CAP);
  const pv = buildVocabPreview(cvDraft, words, true);   // 面板统计按追加口径；覆盖语义写在按钮上
  const draftSet = new Set(parseVocabText(cvDraft));
  const stats = `
    <div class="cv-stats" id="cv-stats">
      <span>检测到 <b>${pv.total}</b></span><span>有效 <b>${pv.valid.length}</b></span>
      <span>重复 <b>${pv.dup}</b></span><span>无效 <b>${pv.invalid}</b></span>
      <span class="muted-2">已在词库 ${words.filter(w => draftSet.has(w)).length} 个（追加时跳过）</span>
    </div>`;
  return `
    ${statusbar()}
    <div class="view view-flow cv-view">
      <header class="page-intro">
        <div><div class="eyebrow">MY OWN VOCABULARY</div><h1>我的词库<span class="title-period">。</span></h1>
        <p>导入你自己不会的词，阅读时在「词汇高亮」里打开「我的导入词库」就会标色。</p></div>
        <span class="icon-btn" data-act="go-back" role="button" tabindex="0" aria-label="返回">${svg("back", 16)}</span>
      </header>

      <div class="card col" style="gap:10px">
        <div class="row between"><span class="h2">词库 <b>${words.length}</b> 词</span>
          <span class="muted-2">与生词本 / 已认识互相独立</span></div>
        <div class="rd-segs">
          <button class="rd-seg${cvImportOpen ? "" : " on"}" data-act="cv-toggle-import" aria-pressed="${!cvImportOpen}">${cvImportOpen ? "收起导入" : "导入单词"}</button>
          <button class="rd-seg${words.length ? "" : " off"}" data-act="cv-export"${words.length ? "" : " disabled"}>导出词库</button>
          <button class="rd-seg${cvArmedClear ? " on" : ""}" data-act="cv-clear" aria-pressed="${cvArmedClear}">${cvArmedClear ? "再点一次确认清空" : "清空词库"}</button>
        </div>
      </div>

      ${cvImportOpen ? `
      <div class="card col cv-import" style="gap:10px">
        <textarea id="cv-ta" rows="6" placeholder="每行一个词；也支持逗号、空格、分号分隔，或直接选 TXT / CSV 文件。&#10;apple&#10;banana, orange&#10;grape banana">${esc(cvDraft)}</textarea>
        <div class="row between" style="gap:8px">
          <label class="rd-seg" for="cv-file-in" style="flex:0 0 auto">选择 TXT / CSV 文件</label>
          <span class="muted-2">支持 .txt / .csv / 导出的词库 JSON</span>
        </div>
        ${cvDraft ? stats : `<div class="cv-stats" id="cv-stats"><span class="muted-2">粘贴或选文件后，这里会显示导入统计。</span></div>`}
        <div class="rd-segs">
          <button class="rd-seg${pv.valid.length ? "" : " off"}" data-act="cv-append"${pv.valid.length ? "" : " disabled"}>追加导入${pv.valid.length ? `（+${pv.valid.length}）` : ""}</button>
          <button class="rd-seg${cvArmedOver ? " on" : ""}" data-act="cv-overwrite">${cvArmedOver
            ? `再点一次：清空现有 ${words.length} 词，写入 ${buildVocabPreview(cvDraft, words, false).valid.length} 词`
            : "覆盖现有词库"}</button>
        </div>
      </div>` : ""}

      <div class="card col" style="gap:8px">
        <input id="cv-q" placeholder="搜索单词" value="${esc(cvQuery)}" aria-label="搜索我的词库"${words.length ? "" : " disabled"} />
        ${words.length
          ? `<div class="nb-list">${shown.map(w => `
              <div class="row" style="padding:8px 0;border-bottom:1px solid var(--line)">
                <span class="col grow" style="gap:2px">
                  <span class="nb-word">${esc(w)}</span>
                </span>
                <button class="icon-btn" data-act="cv-del-word" data-word="${esc(w)}" role="button" tabindex="0" aria-label="删除 ${esc(w)}">${svg("close", 14)}</button>
              </div>`).join("")}</div>
            ${shown.length < (q ? words.filter(w => w.includes(q)).length : words.length)
              ? `<div class="muted-2">只显示前 ${CV_RENDER_CAP} 个${q ? "条匹配结果" : "词，可用搜索缩小范围"}</div>` : ""}`
          : `<div class="nb-empty">词库是空的 · 点上面的「导入单词」开始<br><span class="muted-2">导入的词只影响高亮，不会进生词本</span></div>`}
      </div>
    </div>`;
}

/* 词库文件读入：TXT / CSV 直接当草稿；导出的 JSON（{words:[...]} 或纯数组）抽 words
 * 拼回逐行文本 —— 复用同一套解析与统计，不为 JSON 单开一条导入通道。 */
function normalizeVocabDraft(text) {
  const t = String(text || "").trim();
  if (t.startsWith("{") || t.startsWith("[")) {
    try {
      const j = JSON.parse(t);
      const words = Array.isArray(j) ? j : (j && Array.isArray(j.words) ? j.words : null);
      if (words) return words.filter(x => typeof x === "string").join("\n");
    } catch { /* 不是合法 JSON 就按纯文本走 */ }
  }
  return String(text || "");
}
function renderNotebook() {
  const items = [...S.notebook].sort((a, b) => (b.addedAt || 0) - (a.addedAt || 0));
  const knownSet = new Set(S.known || []);
  const usable = items.filter(it => WORD_BY.has(it.word));
  const learning = usable.filter(it => !knownSet.has(it.word));
  const known = usable.filter(it => knownSet.has(it.word));
  /*「已认识」只算**收藏过**的词：S.known 里还有一批在正文里直接标认识、
     从没进过生词本的词，那是阅读行为，不属于词汇本。 */
  const list = vocabTab === "known" ? known : learning;
  const empty = vocabTab === "known"
    ? `<div class="card nb-empty">还没有标为已认识的词<br><span class="muted-2">在生词卡里点「我已认识」，它就会移到这里</span></div>`
    : `<div class="card nb-empty">还没有生词 · 阅读时点单词，卡片里就能收藏<br><span class="muted-2">收藏时会把那句话一起存下来</span></div>`;

  return `${statusbar()}
    <div class="view view-flow notebook-view">
      <header class="page-intro">
        <div><div class="eyebrow">WORDS YOU COLLECTED</div><h1>我的词汇<span class="title-period">。</span></h1><p>阅读时收藏的词，连同遇见它的那句话。</p></div>
        <span class="icon-btn" data-act="go-back" role="button" tabindex="0" aria-label="返回">${svg("back", 16)}</span>
      </header>
      <div class="vocab-tabs">
        <button class="vt${vocabTab === "new" ? " on" : ""}" data-act="vocab-tab" data-tab="new">生词 <b>${learning.length}</b></button>
        <button class="vt${vocabTab === "known" ? " on" : ""}" data-act="vocab-tab" data-tab="known">已认识 <b>${known.length}</b></button>
      </div>
      <!-- 我的导入词库入口：数据上与生词本 / 已认识完全独立（阅读前就知道不会的词 vs
           阅读中收藏的词），但导航上放在词汇页里最顺 —— 用户找「我的词」只会来这里。 -->
      <button class="card row cv-entry" data-act="open-customvocab" aria-label="打开我的词库">
        <span class="ic">${svg("book", 18)}</span>
        <span class="col grow" style="gap:2px"><span class="h3">我的导入词库</span><span class="muted">${(S.customVocab || []).length} 个词 · 导入 / 搜索 / 删除 / 导出</span></span>
        ${svg("arrow", 16)}
      </button>
      ${list.length ? `<div class="nb-list">${list.map(it => nbRowHTML(it, vocabTab === "known")).join("")}</div>` : empty}
    </div>`;
}

/* 「我的」页 2026-09-22 v75 重排。旧顺序是 档案卡 → 记录 → 概况 → 图表 → 词库卡 →
 * 词汇 → 备份 → 关于，统计分散在三处（档案卡「已读完 N 篇」、概况卡、图表卡日均）、
 * 口径互相混淆，词库总量（4,082）出现在个人页里却不是个人成果。
 * 新顺序：阅读概况（累计 / 近 7 天 两组口径）→ 阅读记录 + 我的词汇（最常去的两个入口）
 * → 近 7 天趋势 → 数据与备份 → 关于词阅（三层：简介 / 功能 / 数据说明）。
 * 四级词库规模移进「关于 · 内容与数据说明」，个人页不再重复展示。 */
function renderMe() {
  const week = last7();
  const max = Math.max(1, ...week.map(d => d.mins));
  const weekMins = week.reduce((a, d) => a + d.mins, 0);
  const avg = Math.round(weekMins / 7);
  const notebookWords = wordsOf(S.notebook || []);
  const readSet = new Set([...Object.keys(S.readHistory || {}), ...Object.keys(S.readPos || {}), ...(S.read || []), ...(S.finished || [])]);
  /* 新用户空态：没有任何阅读痕迹时，趋势图画一排 0 没有信息量，用一句引导替代 */
  const hasAny = readSet.size > 0 || notebookWords.length > 0;
  return `
    ${statusbar()}
    <div class="view me-view">
      <header class="page-intro">
        <div><div class="eyebrow">MY READING JOURNAL</div><h1>我的阅读手记<span class="title-period">。</span></h1><p>每读一点，都会留下自己的足迹。</p></div>
        <span class="icon-btn" data-act="theme" role="button" tabindex="0" aria-label="切换深浅色" title="切换深浅色">${svg(S.theme === "dark" ? "sun" : "moon", 16)}</span>
      </header>

      <div class="card col overview-card" style="gap:14px">
        <div class="row between"><span class="h2">阅读概况</span>${hasAny ? "" : `<span class="muted-2">还没有记录，从一篇开始</span>`}</div>
        <div class="ov-group">
          <span class="ov-label">累计</span>
          <div class="stat-grid">
            <div class="stat good"><div class="n">${S.finished.length}</div><div class="l">读完篇数</div></div>
            <div class="stat"><div class="n">${readingStreakDays()}</div><div class="l">连续天数</div></div>
            <div class="stat"><div class="n">${notebookWords.length}</div><div class="l">收藏生词</div></div>
          </div>
        </div>
        <div class="ov-group">
          <span class="ov-label">近 7 天</span>
          <div class="stat-grid">
            <div class="stat"><div class="n">${weekMins}</div><div class="l">阅读分钟</div></div>
            <div class="stat"><div class="n">${avg}</div><div class="l">日均分钟</div></div>
          </div>
        </div>
      </div>

      <div class="me-entries">
        <button class="card row history-entry" data-act="read-history" aria-label="打开阅读记录">
          <span class="ic">${svg("book", 20)}</span>
          <span class="col grow" style="gap:3px"><span class="h3">阅读记录</span><span class="muted">${readSet.size} 篇读过的文章 · 查看进度并继续阅读</span></span>
          ${svg("arrow", 16)}
        </button>
        <button class="card row history-entry" data-act="open-notebook" aria-label="打开我的词汇">
          <span class="ic">${svg("bookmark", 20)}</span>
          <span class="col grow" style="gap:3px"><span class="h3">我的词汇</span><span class="muted">${notebookWords.length} 个生词 · 带原句与遇词次数</span></span>
          ${svg("arrow", 16)}
        </button>
        <button class="card row history-entry" data-act="open-customvocab" aria-label="打开我的词库">
          <span class="ic">${svg("book", 20)}</span>
          <span class="col grow" style="gap:3px"><span class="h3">我的词库</span><span class="muted">${(S.customVocab || []).length} 个导入词 · 用于阅读高亮</span></span>
          ${svg("arrow", 16)}
        </button>
        ${installEvt ? `<button class="btn-primary" data-act="pwa-install" style="width:100%">${svg("check", 16)} 添加到主屏幕</button>` : ""}
        ${(typeof navigator !== "undefined" && /iP(hone|ad|od)/.test(navigator.userAgent) && !window.navigator.standalone) ? `<div class="muted-2">iPhone/iPad：用 Safari 的分享菜单 → 「添加到主屏幕」，即可全屏离线使用</div>` : ""}
      </div>

      ${hasAny ? `
      <div class="card col chart-card" style="gap:12px">
        <div class="row between"><span class="h2">近 7 天阅读</span><span class="muted-2">日均 ${avg} 分钟</span></div>
        <div class="bars">
          ${week.map(d => `<div class="bar-col">
            <div class="bar ${d.today ? "today" : ""}" style="height:${Math.round(d.mins / max * 62)}px"></div>
            <span class="${d.today ? "today" : ""}">${d.label}</span>
          </div>`).join("")}
        </div>
      </div>` : `
      <div class="card col chart-card" style="gap:10px">
        <span class="h2">阅读趋势</span>
        <span class="muted">读完第一篇文章后，这里会画出你最近 7 天的阅读曲线。</span>
        <button class="btn-primary" data-tab="discover" style="align-self:flex-start">去发现页挑一篇 ${svg("arrow", 16)}</button>
      </div>`}

      <section class="journal-settings">
      <div class="row between">
        <span class="h3">数据与备份</span>
        <span class="row" style="gap:14px">
          <span class="link" data-act="export-data" role="button" tabindex="0">导出备份</span>
          <span class="link" data-act="import-data" role="button" tabindex="0">导入备份</span>
        </span>
      </div>
      <div class="muted-2">
        阅读记录与生词保存在当前浏览器中，换设备或清理数据前，请先导出备份，之后可以导回来。
      </div>
      ${storageState === "ok" ? "" : `<div class="storage-warn" role="status">
        ${svg("alert", 14)}<span>${storageState === "failed"
          ? "存储写入失败，进度可能保存不上。请先导出备份，再清理浏览器空间。"
          : "存储空间紧张，已只保留最近的续读位置；生词与阅读记录未受影响。"}</span>
      </div>`}
      <div class="row between">
        <span class="h3">清空记录</span>
        <span class="link danger" data-act="ask-reset" role="button" tabindex="0">清空阅读记录</span>
      </div>
      </section>

      <section class="journal-about">
      <div class="row between"><span class="h2">关于词阅</span></div>
      <div class="about-body">
        <p class="about-slogan">从感兴趣的文章开始，让英语阅读成为日常。</p>
        <p>词阅是一个面向英语学习者的阅读工具，尤其关注四级学习阶段的阅读需求。你可以从人物、成长、足球和 AI 等主题中选择文章，在完整语境中阅读和积累词汇。</p>
        <p>遇到不认识的词，可以点词查义；需要理解句意时，可以查看中文对照。想记住的词可以收进生词本，没读完的文章也能下次接着读。</p>
        <p>这是一个持续完善的个人学习项目，希望让阅读更容易开始，也更容易坚持。</p>
      </div>
      <div class="about-feats">
        <div class="row"><span class="ic">${svg("tap", 16)}</span><span><b>点词查义</b> —— 阅读中点击任意单词，即时查看释义与音标</span></div>
        <div class="row"><span class="ic">${svg("globe", 16)}</span><span><b>中英对照</b> —— 逐句查看中文对照，理解长难句</span></div>
        <div class="row"><span class="ic">${svg("bookmark", 16)}</span><span><b>生词收藏</b> —— 查过的词一键收进生词本，带原句回顾</span></div>
        <div class="row"><span class="ic">${svg("book", 16)}</span><span><b>自动续读</b> —— 没读完的文章记住位置，下次接着读</span></div>
      </div>
      <details class="about-details">
        <summary>内容与数据说明</summary>
        <div class="about-src">
          <p>词库分两层：中学基础 ${MID_WORDS.length.toLocaleString()} 词（初中 + 高中，补充中学基础词汇）→ 四级核心 ${CORE_WORDS.length.toLocaleString()} 词。</p>
          <p>四级核心按「语料词频 + 历年真题高频」从四级大纲筛出；词频与音标来自 <a href="https://github.com/skywind3000/ECDICT" target="_blank" rel="noopener">ECDICT</a>（MIT）。</p>
          <p>中学基础词库来自 <a href="https://github.com/KyleBing/english-vocabulary" target="_blank" rel="noopener">KyleBing/english-vocabulary</a>，其中 ${MID_WORDS.filter(isSprint).length} 词带真题高频标记。</p>
          <p>真题词频：<a href="https://github.com/liut969/CET" target="_blank" rel="noopener">liut969/CET</a>（近 5 年 30 套真题统计）· <a href="https://github.com/exam-data/CETVocabulary" target="_blank" rel="noopener">exam-data/CETVocabulary</a>（约 200 套试卷词频，CC BY-NC-SA 4.0）。</p>
          <p>单词例句：KyleBing/english-vocabulary · <a href="https://tatoeba.org" target="_blank" rel="noopener">Tatoeba</a>（CC-BY 2.0）· 原刊文章。</p>
          <p>内容与配图：人物等栏目正文按公开页面抓取并过滤广告与导航，图片保留来源与摄影署名，原文变化时需重新复核。</p>
          <p>个人学习项目，仅供学习交流，不作商业用途。</p>
        </div>
      </details>
      </section>
      <footer class="editorial-footer"><span>WordLens / 词阅</span><span>A journal of your curiosity.</span></footer>
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
  const readTimes = S.readCount[a.id] || 0;
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
        <img src="${esc(p.img)}" alt="${esc(p.alt || "")}" loading="lazy" decoding="async" />
        ${cap ? `<figcaption lang="en" aria-label="图片说明">${highlightEn(esc(cap))}${capCn ? `<span class="caption-cn" lang="zh-CN">${esc(capCn)}</span>` : ""}</figcaption>` : ""}
        ${p.credit ? `<figcaption class="photo-credit">${esc(p.credit)}</figcaption>` : ""}
      </figure>`;
    }
    /* 一段话 = 一个文本流：句子是内联 span，句间只有一个空格。
     * 旧写法每句一个块级 div，段落被拆成竖排清单（句间 10px 空隙 + 2px 间距），
     * 英文再长也只在句末换行，视觉上「一句一行」。
     * ★ 用 renderSentencesOf 而不是 sentencesOf：段落级退化段（AI 栏目）与 v83 起的
     *   普通段内多句元素，都在这里被再切成显示用的一行一句。data-si 写的是 s.si0
     *   （**数据口径**元素序号）—— 2026-09-23 之前写的是 map 的显示序号，与注释宣称的
     *   「切分前序号」不一致，单句朗读的「第 n/total 句」提示会数出 381/380 这种超总数。 */
    const rsList = renderSentencesOf(p);
    const parts = rsList.map(s => {
      const enText = clean(s.en);
      const cnText = clean(s.cn);
      if (!enText && !cnText) return "";        // 两端都空的句子不占位置
      const en = highlightEn(esc(enText));
      /* v83：切分判据从「段落级」（rsList.length > 1，只有退化段可能）改为**元素级**
       * （s.np > 1，见 renderSentencesOf）—— 普通段里被切开的元素同样要写 data-rs、
       * 同样要给非末句挂 .cn-dup，否则「逐句对照」档一个元素弹多份译文、
       * 「点句显示」档首句点了没反应（v73 在退化段上踩过同一坑，别再踩一遍）。 */
      const multi = (s.np || 1) > 1;
      /* 译文是句子的**相邻兄弟**节点，不是子节点。旧写法把 .cn 塞进 .sentence 里，
         三个后果：① <span> 内套块级元素，HTML 内容模型违规（浏览器容错成「一句一行」，
         段落感全丢）；② 句子按钮的 aria-label 把整段中文也算进可访问名称，读屏中英混读；
         ③ 点中文块会误触发「选句」。拆开后「点句展开译文」用相邻兄弟选择器实现。
         切分元素的非末句副本带 .cn-dup：「逐句对照」档收起（不重复可见），
         「点句显示」档 peek 规则（5 个类）特异性压过 .cn-dup（4 个类），点谁弹谁。 */
      const cn = cnText ? `<span class="cn${multi && (s.rs || 0) < s.np - 1 ? " cn-dup" : ""}" lang="zh-CN">${esc(cnText)}</span>` : "";
      /* data-rs = 渲染切分序号（0 起）。**凡是「这个元素被切分过」就必须写上**，
       * 包括 rs=0 那一句 —— 这不是可有可无的优化：rs=0 时不写属性，DOM 里首句就没有
       * data-rs，`applyAnchor` 的 `querySelector(sel[data-rs="0"])` 找不到它，
       * 续读会落到「第一个匹配 pi+si 的句子」上。退化段里那**恰好就是它**，
       * 看似无害；但一旦切分顺序或段内结构变化，这个隐式回落就会静默错位。
       * 所以判据是「这个元素切了没有」（s.np > 1），不是「序号是不是 0」。 */
      const rs = s.rs || 0;
      const rsAttr = multi ? ` data-rs="${rs}"` : "";
      return `<span class="sentence" data-act="para-peek" data-pi="${i}" data-si="${s.si0 || 0}"${rsAttr} role="button" tabindex="0" aria-label="选择这一句（可听朗读）">${en}<span class="para-tts" lang="zh-CN" data-act="para-speak" data-pi="${i}" data-si="${s.si0 || 0}"${rsAttr} role="button" tabindex="0" title="读这一句" aria-label="读这一句">${svg("speaker", 13)}</span></span>${cn}`;
    }).filter(Boolean);
    if (!parts.length) return "";
    /* 段落里不再挂任何按钮：段级「显示本段翻译」在 2026-09-19 被用户要求删除。
       一句一行之后，每段尾巴那行小字既把段落重新切碎，又和「点句出译文」重复。 */
      /* lang="en" 不是给读屏凑分的，它决定三件实事：断词规则（长词在哪儿折行）、
         系统字体回退栈挑哪套字形、朗读引擎用哪种语言念。缺了它浏览器只能猜 ——
         Android 上猜错会换字体，连字符位置也跟着变。译文与朗读按钮反向标 zh-CN：
         这两个节点里是中文（朗读按钮的 title / aria-label 也是中文），
         不反向标注就会被祖传的 en 当英文念出来。
         代价：.sentence 自己的 aria-label 是中文、内容却是英文，标注只能二选一，
         现取「内容」这一侧；等 §7 把句级 button 语义拆开时一并处理。 */
      /* 节标题段（p.head = 2/3/4）：整期长文里源站的 h2/h3 回到了正文 —— 见
         tools/offbook.mjs 头部「粒度」。它们与正文段在数据里同一形状，只能靠这个字段
         决定渲染成标题还是段落；缺了它，标题会以正文的样子出现，而标题常常与紧邻的正文
         重申同一句（实测 `Do → observe → ask → learn → do` 上下相邻两段、`Time is
         necessary, not sufficient` 同篇两处），读起来像重复的正文。
         用真的 hN 而不是 <p class="para para-head">：语义正确（文章小节就该是 h2/h3，
         读屏可跳转）。风险已核：audit.js 里唯一的 <h2> 断言在发现页（.editorial-copy），
         与阅读页无关；UA 默认字号/外边距都被 `.read-body .para` 这条更高特异性的规则盖掉。 */
      if (p.head) {
        const h = Math.min(4, Math.max(2, Number(p.head) || 2));
        return `<h${h} class="para para-head" lang="en" data-pi="${i}">${parts.join(" ")}</h${h}>`;
      }
      return `<p class="para" lang="en" data-pi="${i}">${parts.join(" ")}</p>`;
  }).join("");

  return `
    ${statusbar()}
    <div class="read-top">
      <span class="icon-btn" data-act="go-back" role="button" tabindex="0" aria-label="返回上一页">${svg("back", 18)}</span>
      <div class="center">
        <span>${a.cat === "人物" ? (a.readingMode === "full" ? "人物摄影 · 原刊全文" : "人物摄影 · 中英导读") : "双语阅读"}</span>
        <span class="src">${esc(clean(a.cat))} · ${esc(clean(a.source))}</span>
        <span class="read-hud" id="read-hud">0% · 剩余约 ${dur} 分钟</span>
      </div>
      <span class="icon-btn" data-act="toggle-cn" role="button" tabindex="0" style="color:${S.cnMode !== "off" ? 'var(--brand)' : 'var(--text-2)'}" title="译" aria-label="${S.cnMode === "all" ? "收起中文对照" : "展开中文对照"}" aria-pressed="${S.cnMode === "all"}">${svg("globe", 18)}</span>
    </div>
    <div class="read-progress"><div class="bar" id="read-bar"></div></div>

    <div class="view read-scroll ${fsCls} para-flow${S.cnMode === "all" ? "" : (S.cnMode === "off" ? " no-cn cn-off" : " no-cn cn-tap")}${hlAllOff() ? " no-kw" : ""}" id="read-scroll" data-art="${esc(a.id)}">
      <div class="read-hero">
        <div class="eyebrow read-kicker">${esc(a.cat)}<span class="eyebrow-divider">/</span>WORDLENS JOURNAL</div>
        <h1 class="title">${esc(clean(a.title))}</h1>
        ${aZh ? `<div class="title-zh">${esc(aZh)}</div>` : ""}
        <div class="byline">
          <span>${esc(srcName(a))}</span><span class="dot"></span><span>${dur} 分钟 · ${tier.label}</span>
          <span class="dot"></span><span>需学 ${hitsLbl} 词 · 低频词 ${ratePct}%</span>
        </div>
        ${a.translationCredit ? `<div class="translation-credit">${esc(a.translationCredit)}</div>` : ""}
        ${a.cat === "人物" ? `<div class="people-reading-note"><b>${a.readingMode === "full" ? "原刊正文 · 广告已过滤" : "本站导读 · 原刊全文入口"}</b><p>${a.readingMode === "full" ? `正文按公开原刊页面抓取，保留原文段落与图片；广告、导航和推广块已排除。原刊：${esc(srcName(a))}。` : "以下为词阅编辑导读与摄影预览。完整人物访谈请到原刊阅读；本站进度记录的是导读与图片浏览位置。"}</p><a href="${esc(a.url)}" target="_blank" rel="noopener noreferrer">查看 ${esc(srcName(a))} 原刊页面 ↗</a></div>` : ""}
        <div class="read-cover${cover ? " has-img" : ""}${a.cat === "人物" ? " people-cover" : ""}" style="${cover && a.cat !== "人物" ? `background-image:url('${esc(cover)}')` : `background:${esc(a.gradient)}`}">
          ${cover && a.cat === "人物" ? `<img src="${esc(cover)}" alt="${esc(a.person || a.title)}" decoding="async" />` : ""}
          <span class="mark">${esc(srcName(a))}</span>
          <div class="play" data-act="read-all">${svg("speaker", 18)}</div>
        </div>
        ${!S.hintSeen && S.cnMode === "tap" ? `<div class="peek-hint">${svg("tap", 14)} 轻触英文看译文 · 点任意单词查释义</div>` : ""}
      </div>

      <div class="read-body" id="read-body">${paras}</div>

      <div class="read-finish">
        <div class="ico">${svg("check", 22)}</div>
        ${S.read.includes(a.id)
          ? `<h3>已读完 · 累计第 ${readTimes} 次</h3>`
          : `<h3>${a.readingMode === "guide" ? "导读与摄影看完了？" : "读完了？打个卡"}</h3>`}
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
          <button class="btn" data-act="punch-in">${svg("check", 16)} ${a.readingMode === "guide" ? "标记导读已读" : "打卡 · 今日读毕"}</button>`}
        <div class="finish-nav">
          <button data-act="go-back">${svg("back", 15)} 返回${fromLabel}</button>
          ${nx ? `<button data-act="next-article">下一篇 ${svg("arrow", 14)}</button>`
               : `<button disabled>本分类已读完</button>`}
        </div>
        ${a.url ? `<a class="read-source-link" href="${esc(a.url)}" target="_blank" rel="noopener">查看原文 →</a>` : ""}
      </div>
    </div>


    <div class="fab-bar" id="fab-bar">
      <button data-act="toggle-cn" class="${S.cnMode === "all" ? 'active' : ''}" title="译" aria-label="${S.cnMode === "all" ? "收起中文对照" : "展开中文对照"}" aria-pressed="${S.cnMode === "all"}">${svg("globe", 18)}</button>
      <button data-act="read-settings" class="${S.fontSize > 0 || S.readTheme ? 'active' : ''}" title="阅读设置" aria-label="阅读设置（字号 / 对照 / 底色）"><span class="fab-aa">Aa</span></button>
      <button data-act="fab-more" title="更多工具" aria-label="更多工具"><span style="font-family:var(--font-num);font-weight:700;letter-spacing:1px">···</span></button>
      <!-- 朗读态：全文朗读时顶掉上面三个按钮，变身播放器（进度 / 暂停 / 停止）。
           刻意不做 aria-live 播报进度 —— TTS 正在念英文，读屏再念一遍「3/42」
           会把人声打断，进度只做视觉反馈。 -->
      <div class="fab-speak">
        <span class="fab-prog" id="fab-prog"></span>
        <button data-act="speak-pause" id="fab-play" title="暂停朗读" aria-label="暂停朗读"><span class="ic-pause">${svg("pause", 18)}</span><span class="ic-play">${svg("play", 18)}</span></button>
        <button data-act="speak-stop" title="停止朗读" aria-label="停止朗读">${svg("stop", 18)}</button>
      </div>
    </div>
  `;
}

/* ---------------- 词汇高亮词库：独立开关（2026-09-23 由单选档升级） ----------------
 * 为什么从单选档改成开关：词库之间不是互斥关系 —— 用户完全可能「核心词 + 自己导入的
 * 薄弱词」同时要，旧的 highlightMode 单选做不到（需求 §5 明文：不要互斥单选）。
 * 四个词源各一个勾选行，点一下切换、其余不动；全不勾 = 旧「关闭高亮」档。
 * 复用 .hl-opt 的行样式与 .hl-dot 指示点（方块变体 .hl-dot 用在勾选语义上，
 * CSS 侧只加一条 border-radius 覆盖），两处入口（阅读设置 / 「···」工具面板）照旧共用。
 * 交互边界与旧档位相同：切换只改 S.hlSets（纯显示参数），**绝不触碰 S.known**。 */
const HL_SOURCES_INFO = {
  core: ["四级核心词", "约 2000 个高频真题重点词（默认开）"],
  cet4: ["四级全部词", "完整 CET-4 大纲 4500+ 词 · 适合考前扫漏词"],
  mid: ["中学基础词", "初高中基础词 · 最激进的一档"],
  custom: ["我的导入词库", "自己导入的薄弱词 · 在「我的词汇 → 我的词库」导入"],
};
function hlSetList() {
  return `<div class="hl-list" role="group" aria-label="高亮词库">
    ${HL_SOURCES.map(src => {
      const on = S.hlSets[src] === true;
      return `<button class="hl-opt${on ? " on" : ""}${src === "custom" ? " hl-custom" : ""}" data-act="set-hls" data-src="${src}"
        role="checkbox" aria-checked="${on}" aria-pressed="${on}">
        <span class="hl-dot" aria-hidden="true"></span>
        <span class="hl-txt"><b>${esc(HL_SOURCES_INFO[src][0])}</b><i>${esc(HL_SOURCES_INFO[src][1])}</i></span>
      </button>`;
    }).join("")}
  </div>`;
}
/* 设置面板里高亮开关的选中态同步：与 syncReadSettingsSheet 分开 —— 开关是「每行各自
 * 反映自己的布尔」，不是「一行持有当前值」，同一个函数硬套两种语义必错一个。 */
function syncHlToggles() {
  $$(".phone > .sheet .hl-opt[data-src]").forEach(b => {
    const on = S.hlSets[b.dataset.src] === true;
    b.classList.toggle("on", on);
    b.setAttribute("aria-checked", String(on));
    b.setAttribute("aria-pressed", String(on));
  });
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
        <!-- 中文对照三档。off 与 tap 的差别**只在点句**（是否弹出该句译文），
             所以两个标签必须写清楚「关闭」和「点句显示」的区别 —— 都叫「隐藏」
             的话用户会以为两档一样，然后抱怨点句时中文乱蹦。 -->
        <div class="rd-row"><span class="rd-lab">中文对照</span>
          <div class="rd-segs three">
            ${seg("set-cn", "cn", "off", "关闭", S.cnMode === "off")}
            ${seg("set-cn", "cn", "tap", "点句显示", S.cnMode === "tap")}
            ${seg("set-cn", "cn", "all", "逐句对照", S.cnMode === "all")}
          </div>
        </div>
        <div class="rd-hint">关闭 = 纯英文，点句只朗读　·　点句显示 = 只展开你点的那句中文（默认）　·　逐句对照 = 每句下面都跟中文</div>
        <div class="rd-row"><span class="rd-lab">底色</span>
          <div class="rd-segs">
            ${seg("set-theme", "theme", "default", "亮色", S.readTheme === "")}
            ${seg("set-theme", "theme", "paper", "纸张", S.readTheme === "paper")}
            ${seg("set-theme", "theme", "night", "夜间", S.readTheme === "night")}
          </div>
        </div>
        <!-- 高亮是四个词源开关而不是互斥档（2026-09-23）：核心词 + 自己导入的薄弱词
             可以同时开。默认只开核心（= 旧默认档 core）；关掉某个词源只是不标它 ——
             **点词查义在任何组合下都一样**。切开关只改 S.hlSets，
             **绝不触碰 S.known**（见 renderFabSheet 的说明）。 -->
        <div class="rd-row"><span class="rd-lab">词汇高亮</span>${hlSetList()}</div>
        <div class="rd-row"><span class="rd-lab">朗读口音</span>
          <div class="rd-segs">
            ${seg("set-accent", "accent", "en-US", "美音", S.accent !== "en-GB")}
            ${seg("set-accent", "accent", "en-GB", "英音", S.accent === "en-GB")}
          </div>
        </div>
        <!-- 语速：精读跟读的刚需。浏览器默认 rate=1.0 对学习者偏快（跟读时句子已经念完），
             原先没有这个开关，只能忍着。 -->
        <div class="rd-row"><span class="rd-lab">朗读语速</span>
          <div class="rd-segs">
            ${seg("set-rate", "rate", "slow", "慢", S.rate === "slow")}
            ${seg("set-rate", "rate", "std", "标准", (S.rate || "std") === "std")}
            ${seg("set-rate", "rate", "fast", "快", S.rate === "fast")}
          </div>
        </div>
      </div>
    </div>`;
}

/* 「···」更多工具面板：低频功能收进来，阅读页保持安静 */
function renderFabSheet() {
  const a = activeArticle;
  /* 词汇高亮开关放在这里，而不是只在「Aa 阅读设置」里 —— 阅读时想临时调范围是
   * 「随手改一下」的动作，不该逼用户先想到「这是阅读设置」再点进去翻。
   *
   * ★ 一条硬边界：切开关只改 S.hlSets（纯显示参数），**绝不触碰 S.known**。
   *   S.known 是用户的学习记录（我认了这个词），S.hlSets 是系统的词源开关。
   *   「词库是系统给你的分类，已认识是用户自己的学习记录；系统分类可以变，
   *     用户记录不能跟着丢。」—— 所以把某个词源打开、范围变大，已标认识的词
   *   必须保持普通颜色，不能被重新点亮（自定义词同样受这条管，需求 §6）。
   *   audit.js 有守卫锁死这一条（切开关前后 S.known 必须逐字节相同）。 */
  return `
    <div class="sheet-mask" data-act="close-sheet"></div>
    <div class="sheet" role="dialog" aria-label="阅读工具">
      <div class="grip"></div>
      <div class="col" style="gap:8px">
        <button class="sheet-item" data-act="read-all">${svg("speaker", 16)} 朗读全文</button>
        <button class="sheet-item" data-act="article-notebook">${svg("bookmark", 16)} 本篇生词本</button>
        ${a.url ? `<a class="sheet-item" href="${esc(a.url)}" target="_blank" rel="noopener">${svg("arrow", 16)} 查看原文</a>` : ""}
      </div>
      <div class="sheet-sec">词汇高亮</div>
      ${hlSetList()}
      <div class="hl-note">标为「已认识」的词在任何词源下都不再标色 —— 切开关不会把它重新点亮。</div>
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
  const words = (S.notebook || []).filter(item => {
    const low = normApos(String(item.word)).toLowerCase();
    if (present.has(low)) return true;
    const r = resolveToken(low);
    return !!(r && ((r.kw && present.has(r.kw)) || (r.w && present.has(r.w))));
  });
  const rows = words.map(item => `
    <div class="row" data-act="lookup" data-word="${esc(item.word)}" role="button" tabindex="0" style="padding:8px 0;border-bottom:1px solid var(--line)">
      <span style="font-family:var(--font-en);font-weight:600;font-size:14px">${esc(item.word)}</span>
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
  return { pi: +cur.dataset.pi || 0, si: +cur.dataset.si || 0, rs: +cur.dataset.rs || 0, off: r.top - cTop };
}

/* 把锚点里的那一句放回记录时的屏幕位置（scrollTop += 需要的位移）。 */
function applyAnchor(cont, a) {
  if (!cont || !a || !cont.querySelector || !cont.getBoundingClientRect) return false;
  /* 先按 rs 精确定位。退化段切分后同一 data-si 下有多个 .sentence（rs 0..n-1），
     querySelector 只给第一个 —— 续读会落在段落开头而不是你上次读到的那一句。
     老锚点没有 rs（undefined → 0），退化成「按 pi+si 取第一个」，与改动前行为一致，
     所以已存的 progress 不会失效、也不会跳错地方。 */
  const rs = Number.isFinite(a.rs) ? a.rs : 0;
  const sel = `.sentence[data-pi="${a.pi}"][data-si="${a.si}"]`;
  /* 第三级回退（2026-09-23）：v81 之前退化段渲染写进 data-si 的是**显示序号**
     （0..n-1），老锚点里存的就是它；v81 起 data-si 改为数据口径（退化段恒 0），
     老锚点 si=2 在新 DOM 里查不到 → 退回「该段里 data-rs=rs 的那一句」。
     rs 是退化段真正的定位键，这个回退对老锚点恰好是精确的；rs=0 的老锚点
     落到段首（与旧行为一致）。 */
  const el = (rs > 0 ? cont.querySelector(`${sel}[data-rs="${rs}"]`) : null)
    || cont.querySelector(sel)
    || (rs > 0 ? cont.querySelector(`.sentence[data-pi="${a.pi}"][data-rs="${rs}"]`) : null)
    || cont.querySelector(`.sentence[data-pi="${a.pi}"]`);
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
    /* rs 是退化段的渲染切分序号（普通段恒 0）。readAnchor 早就量到了它，
     * 但旧版没往盘上写 —— 于是退化段续读只能落回段落开头那一句。
     * applyAnchor 已经支持按 rs 精确落位，这里只是把量到的值带上。 */
    rs: anc ? (anc.rs || 0) : (prev.rs || 0),
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
    /* no-cn 的语义是「不逐句全展开」：off 与 tap 两档都加，两档的差别交给
       cn-off / cn-tap 细分（点句是否弹译文）。 */
    cont.classList.toggle("no-cn", S.cnMode !== "all");
    cont.classList.toggle("cn-off", S.cnMode === "off");
    cont.classList.toggle("cn-tap", S.cnMode === "tap");
    /* 高亮词源全关（= 旧「关闭高亮」档）：正文的目标词色全部退回普通文本（.no-kw 只改颜色，
       词仍然可点可查 —— 关的是「标色」，不是「查词能力」；自己收藏的生词色
       也照旧保留，那是读者自己的标记）。 */
    cont.classList.toggle("no-kw", hlAllOff());
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
  /* 高亮档位有两处入口（本面板 与 「···」阅读工具面板），两处都渲染 .hl-opt，
     所以选择器必须同时认两种 —— 只认 .rd-seg 会让另一处的选中态停在旧档（点了没反应）。 */
  [...root.querySelectorAll(".rd-seg, .hl-opt")].forEach(b => {
    if (!b.hasAttribute || !b.hasAttribute(attr)) return;
    const on = b.getAttribute(attr) === String(val);
    b.classList.toggle("on", on);
    b.setAttribute("aria-pressed", String(on));
    b.setAttribute("aria-checked", String(on));
  });
}

/* 阅读进度条 + HUD：基于 #read-scroll 容器的滚动位置 */
/* 落盘节奏：滚动时按 5 秒节流写一次；**停下来也要写** —— 节流条件只在「下一次滚动」
 * 时才被求值，所以「滚一下停住 → 宿主杀进程」这条路上原来一个字节都没写。
 * 用一个一次性的延时兜住：滚动后 5 秒内没有新滚动，就把位置与锚点落一次盘。
 * 真页面实测（.bak/probe-kill-resume.cjs）：只滚一次不补这个定时器，readPos 里什么都没有。 */
let readSaveTimer = 0;
let inFlushPos = false;
function scheduleReadSave() {
  if (readSaveTimer || inFlushPos) return;
  readSaveTimer = setTimeout(() => { readSaveTimer = 0; flushReadPos(); }, 5000);
}
function cancelReadSave() { if (readSaveTimer) { clearTimeout(readSaveTimer); readSaveTimer = 0; } }

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
      cancelReadSave();          // 刚刚写过，挂着的延时不用再来一次
      /* ★★ 锚点必须与 scrollTop **同一次落盘**（2026-09-22 修强杀丢位置）：
       * 原来锚点只在离开阅读页 / pagehide / visibilitychange 三个出口记 —— 网页里够用，
       * 但宿主（Android WebView）直接杀进程时这些事件**不保证执行**。而恢复时
       * applyAnchor 优先用锚点、且只要元素还在就一定能成功，于是一个**更旧的锚点**
       * 会覆盖掉 5 秒节流刚存下的**更新的 scrollTop**，表现为「重开回到更早的地方」。
       * 开销已实测：最长一篇 1,165 句的全量扫描中位 0.4–1.0ms、最大 1.7ms
       * （.bak/probe-anchor-cost.cjs），放在 5 秒节奏里可忽略 ——
       * flushReadPos 旧注释担心的「每 5 秒量一遍会拖成幻灯片」**不成立**（那是估计，没量过）。 */
      rememberReadPos(cont, a.id);
      save();
    } else {
      /* 还没到窗口：挂一个延时，保证「滚一下 → 停住 → 被杀」也留得下位置 */
      scheduleReadSave();
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
  const text = JSON.stringify(payload, null, 2);
  const name = `wordlens-进度备份-${todayKey()}.json`;
  /* ★ 壳里必须走原生「另存为」（2026-09-22 用户报「点导入/导出备份没反应」）：
     WebView 不处理 blob: 下载 —— 没设 DownloadListener 时它不下载、不报错、连日志都没有，
     而 a.click() 也不会抛。所以下面那条 `已导出进度备份` 在壳里是一句**假成功**：
     提示说导出了，下载目录里一个文件都没有。假成功比没反应坏得多 —— 用户不会来报修，
     直到某天要恢复进度才发现手里的备份是空的。
     壳里改调 window.WLSaveFile.save(名字, 文本)，由壳拉起系统「另存为」；
     结果异步回到页面的 window.__wlSaveDone（见 mobile/shell-glue.js）。
     判据与 nativeBridge() 同款：只认显式旗标 + 方法齐全，不靠「对象存在」猜宿主。 */
  const save = window.WLSaveFile;
  if (window.WORDLENS_NATIVE === true && save && typeof save.save === "function") {
    try { save.save(name, text); return; }
    catch { /* 原生这条路没走通，落到下面走浏览器那条 —— 两条都试，总好过什么都不做 */ }
  }
  const blob = new Blob([text], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast("已导出进度备份");
}
/* 导入与启动迁移分开：迁移可以补缺省值，用户选中的损坏备份不能因此变成空进度。 */
function validateBackupState(st) {
  const has = (o, k) => Object.prototype.hasOwnProperty.call(o, k);
  const record = v => v !== null && typeof v === "object" && !Array.isArray(v);
  const finite = v => typeof v === "number" && Number.isFinite(v);
  const check = valid => { if (!valid) throw new Error("备份字段格式不对"); };
  check(record(st));
  const arrays = ["read", "finished", "known", "readDays", "studyDays"];
  const counts = ["readCount", "secByDay", "minsByDay"];
  const maps = ["readPos", "readHistory", "articleFeedback"];
  check(["notebook", "lastRead", ...arrays, ...counts, ...maps].some(k => has(st, k)));
  for (const k of arrays) if (has(st, k)) {
    check(Array.isArray(st[k]) && st[k].every(v => typeof v === "string" && v.trim().length > 0));
  }
  const checkContext = c => {
    check(c === null || (record(c) && typeof c.en === "string" && (!has(c, "cn") || typeof c.cn === "string")));
  };
  if (has(st, "notebook")) {
    check(Array.isArray(st.notebook));
    for (const item of st.notebook) {
      if (typeof item === "string") { check(item.trim().length > 0); continue; }
      check(record(item) && typeof item.word === "string" && item.word.trim().length > 0);
      for (const k of ["context", "firstCtx"]) if (has(item, k)) checkContext(item[k]);
      for (const k of ["articleId", "articleTitle", "srcTitle"]) if (has(item, k)) check(typeof item[k] === "string");
      if (has(item, "addedAt")) check(finite(item.addedAt) && item.addedAt >= 0);
    }
  }
  for (const k of counts) if (has(st, k)) {
    check(record(st[k]) && Object.values(st[k]).every(v => finite(v) && v >= 0));
  }
  const checkEntry = entry => {
    check(record(entry));
    for (const k of ["pi", "si", "off", "y", "pct", "at", "firstAt", "lastAt", "visits"]) {
      if (has(entry, k)) check(finite(entry[k]));
    }
    for (const k of ["id", "title", "titleZh", "cat", "source"]) if (has(entry, k)) check(typeof entry[k] === "string");
    if (has(entry, "finished")) check(typeof entry.finished === "boolean");
  };
  if (has(st, "lastRead")) checkEntry(st.lastRead);
  for (const k of maps) if (has(st, k)) {
    check(record(st[k]));
    Object.values(st[k]).forEach(checkEntry);
  }
  const enums = { theme: ["light", "dark"], readTheme: ["", "paper", "night"], cnMode: CN_MODES, accent: ["en-US", "en-GB"], rate: ["slow", "std", "fast"] };
  for (const [k, values] of Object.entries(enums)) if (has(st, k)) check(values.includes(st[k]));
  /* highlightMode 是旧版字段（2026-09-23 起由 hlSets 取代）：旧备份仍带着它，
     按旧的四个档位值放行 —— 真正的语义转换在 normalizeState 里做。 */
  if (has(st, "highlightMode")) check(["off", "core", "cet4", "all"].includes(st.highlightMode));
  if (has(st, "hlSets")) {
    check(record(st.hlSets));
    for (const k of ["core", "cet4", "mid", "custom"]) if (has(st.hlSets, k)) check(typeof st.hlSets[k] === "boolean");
  }
  if (has(st, "customVocab")) {
    check(Array.isArray(st.customVocab) && st.customVocab.every(v => typeof v === "string" && isVocabWord(v)));
  }
  for (const k of ["showCn", "kwHighlight", "hintSeen"]) if (has(st, k)) check(typeof st[k] === "boolean");
  if (has(st, "fontSize")) check(Number.isInteger(st.fontSize) && st.fontSize >= 0 && st.fontSize <= 2);
  if (has(st, "backupHintAt")) check(finite(st.backupHintAt) && st.backupHintAt >= 0);
}
function importData(file) {
  const r = new FileReader();
  r.onload = () => {
    let next;
    try {
      const j = JSON.parse(String(r.result));
      const wrapped = j && typeof j === "object" && Object.prototype.hasOwnProperty.call(j, "state");
      if (wrapped && j.app !== "wordlens") throw new Error("不是词阅备份");
      if (wrapped && j.version !== undefined && j.version !== 1) throw new Error("不支持的备份版本");
      const st = wrapped ? j.state : j;
      validateBackupState(st);
      next = normalizeState(st);
    } catch (e) {
      toast("这个文件读不出来，请确认是导出的备份");
      return;
    }
    try { localStorage.setItem(STORE, JSON.stringify(next)); }
    catch (e) { toast("无法保存备份，现有进度未更改，请检查浏览器存储空间后重试"); return; }
    /* 导入也是落盘，壳里那份必须跟着换掉 —— 否则本地再次被清时空，
       回落读回来的还是**导入之前**的旧进度，用户会以为恢复没生效。 */
    mirrorNative(JSON.stringify(next));
    S = next;
    clearArticleCaches();
    homeReads.pool = [];
    render();
    toast(`已恢复备份 · 阅读 ${S.finished.length} 篇 · 生词本 ${S.notebook.length} 词`);
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
          <span class="muted-2">生词本 ${S.notebook.length} 词 · 读完 ${S.finished.length} 篇</span>
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
    /* 版本号跟着主脚本走（当前资源版本由 data-config.js 统一声明），省得换 ?v= 时要改两处，
       也避免例句库与其余资源版本脱钩。取值失败就不带 query，靠 SWR + ETag 协商。 */
    const m = document.currentScript && String(document.currentScript.src).match(/[?&]v=([^&]+)/);
    s.src = EXAMPLES_FILE + "?v=" + encodeURIComponent(m ? m[1] : ASSET_VERSION);
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

/* 查词卡里的「本句含义」块：在词典义之外，再说明这个词**在这句话里**是什么意思。
 * 只给词典释义时，一个词挂五六个中文义项，读者仍然不知道该取哪一个 ——
 * 语境才是让释义落到实处的东西，所以两块都要给（词典义在上，语境义在下）。
 * 句中目标词用 hlWord() 标色，和例句库共用同一套语言。
 * 语境文案由 clipContext() 在点击那一刻裁好（长句只留目标词前后各 7 词）。 */
function ctxBlockHTML(word, ctx) {
  if (!ctx || !ctx.en) return "";
  return `<div class="ctx">
      <div class="ctx-lab">本句含义</div>
      <div class="ctx-en">${hlWord(ctx.en, word)}</div>
      ${ctx.cn ? `<div class="ctx-cn">${esc(ctx.cn)}</div>` : ""}
    </div>`;
}

/* ---------------- 查词浮层 ----------------
 * 两级结构：第一层只回答「这个词在这里是什么意思」（词/音标/短释义/本句含义/收藏），
 * 点「更多」才展开词根、例句等完整卡——3 秒理解后回到正文。
 * ctx 是点中那个词所在的句子（来自 lookup 动作），词库外的点词、图注里的词没有它。 */
function renderSheet(word, ctx, form) {
  const w = WORDS.find(x => x.word === word);
  /* 分派优先级：① 全量词典词 → 全卡（释义最全，末尾按需补「移出词库」）；
   * ② 非词典词：是我的自定义词 → 自定义卡（兜底卡在 2026-09-23 起会带上 TAP/AW
   *    里查得到的释义，不再是「只有管理没释义」）；不是 → tap 轻卡，再兜底自定义卡。
   *    旧写法恒 tap || custom —— 自定义词若在 TAP 有条目，管理入口（移出词库）
   *    就永远弹不出来（需求 §7 的缺口）。 */
  if (!w) return S.customVocab.includes(word)
    ? renderCustomSheet(word, ctx, form)
    : renderTapSheet(word, ctx, form) || renderCustomSheet(word, ctx, form);
  const disp = form || word;                        // 卡片标题显示**你点的那个词**
  const ph = w.phonetic || "";
  const shortDef = String(w.def || "").split("\n")[0] || w.def;
  const nb = nbItem(word);
  /* 词形与词元不同（点了 adopted，词典条目是 adopt）时把原形标在音标那一行。
     标题绝不换成原形 —— 那会让用户以为自己点的不是这个词。 */
  const head = `
        <div class="col" style="gap:3px">
          <div class="w">${esc(disp)}</div>
          <span class="ph">${disp === word ? esc(ph) : `原形 ${esc(word)}${ph ? " · " + esc(ph) : ""}`}</span>
        </div>`;
  if (!sheetMore) {
    return `
      <div class="sheet-mask soft" data-act="close-sheet"></div>
      <div class="sheet slim" role="dialog" aria-label="查词 ${esc(disp)}">
        <div class="grip"></div>
        <div class="row between">
          ${head}
          <span class="icon-btn solid" data-act="speak" data-word="${esc(word)}" style="width:36px;height:36px;color:#fff">${svg("speaker", 17)}</span>
        </div>
        <div class="df">${esc(w.pos || "")} ${esc(shortDef)}</div>
        ${ctxBlockHTML(word, ctx)}
        <div class="sheet-btns">
          ${nb
            ? `<button class="a" data-act="mark-known" data-word="${esc(word)}">我已认识 ✓</button>
               <button class="b" data-act="sheet-more" data-word="${esc(word)}">更多</button>`
            : `<button class="a" data-act="add-note" data-word="${esc(word)}">加入生词本</button>
               <button class="b" data-act="sheet-more" data-word="${esc(word)}">更多</button>`}
          ${S.customVocab.includes(word) ? `<button class="c" data-act="cv-del-word" data-word="${esc(word)}">移出词库</button>` : ""}
        </div>
      </div>`;
  }
  return `
    <div class="sheet-mask" data-act="close-sheet"></div>
    <div class="sheet">
      <div class="grip"></div>
      <div class="row between">
        ${head}
        <span class="icon-btn solid" data-act="speak" data-word="${esc(word)}" style="width:36px;height:36px;color:#fff">${svg("speaker", 17)}</span>
      </div>
      <div class="df">${esc(w.pos || "")} ${esc(w.def)}</div>
      ${w.literal ? `<div class="rt">${esc(w.literal)}</div>` : ""}
      ${ctxBlockHTML(word, ctx)}
      ${exSlotHTML(w)}
      <div class="sheet-btns">
        ${nb
          ? `<button class="a" data-act="mark-known" data-word="${word}">我已认识 ✓</button>
             <button class="c" data-act="remove-note" data-word="${word}">移出生词本</button>`
          : `<button class="a" data-act="add-note" data-word="${word}">加入生词本</button>
             <button class="c" data-act="mark-known" data-word="${word}" aria-pressed="${S.known.includes(word)}">${S.known.includes(word) ? "已认识 ✓" : "标为已认识"}</button>`}
        ${S.customVocab.includes(word) ? `<button class="c" data-act="cv-del-word" data-word="${word}">移出词库</button>` : ""}
      </div>
    </div>`;
}

/* 词库外单词的轻量查词卡：只有释义与发音，不加入词库学习记录。
 * 释义优先取 TAPDICT，再兜底文章级补充词典 —— 后者收的是 TAPDICT 因 frq=0
 * 丢掉的纯功能词（are / an / don't / you're…），它们恰恰在正文里最常见。 */
/* 自定义词兜底卡：导入的词任何词典（WORDS / TAPDICT / AW）都查不到时，renderTapSheet
 * 返回空串 —— 原来这里就是「点了没反应」（空 sheet）。但这个词在「我的词库」里，
 * 用户点它 90% 是想管理它：给一张最小卡 —— 标出「在我的词库」，可加入生词本 /
 * 标已认识 / 移出词库。没有释义就老实说没有（离线包里确实没有这个词的词典数据），
 * 不伪造一句「暂无释义」下面的空架子。
 * ★ 只对自定义词渲染：词库外的普通词保持原来的「点了没反应」（专有名词太多了，
 *   全部弹卡反而是骚扰 —— 这个行为是有意保留的，别「顺手统一」）。 */
function renderCustomSheet(word, ctx, form) {
  if (!S.customVocab.includes(word)) return "";
  const nb = nbItem(word);
  const known = S.known.includes(word);
  /* 释义尽力而为：TAPDICT / 文章级补充词典查得到就给（词形还原交给调用方传入的
     form 已在卡头展示），查不到就明说没有 —— 与 tap 轻卡同一把 TAP/AW 尺子。 */
  const t = (TAP && TAP[word]) || (AW && AW[word]);
  const disp = form || word;
  return `
    <div class="sheet-mask soft" data-act="close-sheet"></div>
    <div class="sheet slim" role="dialog" aria-label="我的词库 ${esc(disp)}">
      <div class="grip"></div>
      <div class="row between">
        <div class="col" style="gap:3px">
          <div class="w">${esc(disp)}</div>
          <span class="ph">${disp === word ? "在我的词库里" : `原形 ${esc(word)} · 在我的词库里`}</span>
        </div>
        <span class="icon-btn solid" data-act="speak" data-word="${esc(word)}" style="width:36px;height:36px;color:#fff">${svg("speaker", 17)}</span>
      </div>
      ${t ? `<div class="df">${esc(t.p || "")}</div><div class="df pre">${esc(t.d)}</div>` : `<div class="df muted-2">离线词典里暂无这个词的释义</div>`}
      ${ctxBlockHTML(word, ctx)}
      <div class="sheet-btns">
        ${nb
          ? `<button class="a" data-act="mark-known" data-word="${esc(word)}">我已认识 ✓</button>`
          : `<button class="a" data-act="add-note" data-word="${esc(word)}">加入生词本</button>${known ? `<button class="a" data-act="mark-known" data-word="${esc(word)}">取消已认识</button>` : ""}`}
        <button class="b" data-act="cv-del-word" data-word="${esc(word)}">移出词库</button>
      </div>
    </div>`;
}

function renderTapSheet(word, ctx, form) {
  const t = (TAP && TAP[word]) || (AW && AW[word]);
  if (!t) return "";
  const disp = form || word;
  return `
    <div class="sheet-mask soft" data-act="close-sheet"></div>
    <div class="sheet" role="dialog" aria-label="查词 ${esc(disp)}">
      <div class="grip"></div>
      <div class="row between">
        <div class="col" style="gap:3px">
          <div class="w">${esc(disp)}</div>
          <span class="ph">${disp === word
            ? (t.p ? esc(t.p) : "词库外单词")
            : `原形 ${esc(word)}${t.p ? " · " + esc(t.p) : ""}`}</span>
        </div>
        <span class="icon-btn solid" data-act="speak" data-word="${esc(word)}" style="width:36px;height:36px;color:#fff">${svg("speaker", 17)}</span>
      </div>
      <div class="df pre">${esc(t.d)}</div>
      ${ctxBlockHTML(word, ctx)}
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
  const cur = (view.name === "history" || view.name === "notebook") ? "me" : (["home", "discover", "me"].includes(view.name) ? view.name : "home");
  return `<nav class="tabbar" aria-label="主导航"><div class="nav-inner">
    <button class="nav-brand" data-tab="home" aria-label="词阅 WordLens 首页"><span class="brand-icon">${svg("book", 23)}</span><span>词阅 <b>WordLens</b></span></button>
    <div class="pill">${TABS.map(([k, label, ic]) => `<button data-tab="${k}" class="${k === cur ? "on" : ""}" ${k === cur ? 'aria-current="page"' : ""}>${svg(ic, 18)}<span>${label}</span></button>`).join("")}</div>
    <div class="nav-end"><span>ENGLISH, WITH CURIOSITY</span><button class="icon-btn" data-act="theme" aria-label="切换深浅色">${svg(S.theme === "dark" ? "sun" : "moon", 18)}</button></div>
  </div></nav>`;
};

/* ---------------- 主渲染 ---------------- */
function render() {
  document.documentElement.setAttribute("data-theme", S.theme);
  /* 浮层（查词卡 / 排序面板）挂在 .phone 上、不在 #screen 里，
     只重写 #screen.innerHTML 是清不掉它们的 —— 必须在每次主渲染开头统一收掉。
     否则在阅读页查完词再点返回：页面已经回到列表，单词卡还盖在底部。 */
  $$(".phone > .sheet, .phone > .sheet-mask").forEach(n => n.remove());
  /* 离开阅读页时掐掉朗读：fab-bar（唯一的停止入口）只存在于阅读页，
     退到首页后浮层消失、语音却照念不误，用户找不到任何办法停 —— 只能刷新页面。 */
  if (spActive() && view.name !== "read") stopSpeech();
  /* 整页重排会把 .tapped 那个 span 换掉：不清引用就留着一个脱离文档的节点，
     下次 markTappedWord 还会去 remove 它（无害但会掩盖真实状态）。 */
  clearTappedWord();
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
    cancelReadSave();          // 已经落过盘了，别让挂着的延时再打一次
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
  else if (view.name === "notebook") body = renderNotebook();
  else if (view.name === "customvocab") body = renderCustomVocab();
  else if (view.name === "read") body = renderRead();
  screen.innerHTML = body + (view.name === "read" ? "" : tabbar());

  /* 阅读主题只染阅读页：通过 .screen 上的 rt-* 类控制 */
  const themeCls = view.name === "read"
    ? `rt-${S.readTheme || "default"}`
    : "";
  screen.className = "screen " + themeCls;

  if (view.name === "read") {
    if (!TAP && !tapLoadStarted) {
      ensureTapdict().then(ok => {
        if (ok && view.name === "read") { clearArticleCaches(); render(); }
      });
    }
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
  }

  if (view.name === "customvocab") {
    /* 与 discover/history 同一套「input → 状态 → 重渲染 → 还焦点」模式。
       两个输入框只有一处差别：textarea 的统计更新**不重渲染**（直接改 #cv-stats），
       重渲染会重建 textarea，光标与输入法组合态都会丢 —— 中文用户逐字输入时必炸。 */
    const ta = $("#cv-ta");
    if (ta) ta.addEventListener("input", () => {
      cvDraft = ta.value;
      const st = $("#cv-stats");
      if (st) {
        const words = S.customVocab || [];
        const pv = buildVocabPreview(cvDraft, words, true);
        st.innerHTML = `<span>检测到 <b>${pv.total}</b></span><span>有效 <b>${pv.valid.length}</b></span>` +
          `<span>重复 <b>${pv.dup}</b></span><span>无效 <b>${pv.invalid}</b></span>` +
          `<span class="muted-2">已在词库 ${words.filter(w => new Set(parseVocabText(cvDraft)).has(w)).length} 个（追加时跳过）</span>`;
        /* 追加按钮的可用态与计数标签跟着草稿走 —— 按钮的 disabled 是渲染时按
           当时 cvDraft 算的，只刷统计不刷按钮，用户粘完词按钮还是灰的
           （2026-09-23 真页面探针抓到：统计活了、点追加没反应）。 */
        const ab = $('[data-act="cv-append"]');
        if (ab) {
          ab.disabled = !pv.valid.length;
          ab.textContent = pv.valid.length ? `追加导入（+${pv.valid.length}）` : "追加导入";
        }
      }
    });
    const q = $("#cv-q");
    if (q) {
      q.addEventListener("input", e => {
        cvQuery = e.target.value; render();
        const n = $("#cv-q"); if (n) { n.focus(); n.setSelectionRange(n.value.length, n.value.length); }
      });
    }
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

/* ---- 手势守卫：只管否决，不新增入口 ----
 * 阅读页的动作全部由 click 执行一次（点词=查义、点句=看译文、点喇叭=朗读）。
 * 问题在于 click 分不清「点一下」和「按完又动了 / 按太久」。实测
 * （2026-09-21 Edge 390×844，hasTouch，CDP 真实触摸序列，见 .bak/probe-jitter2.cjs）：
 *   · 按下后手指竖向抖动 ≤12px → Chromium **照样发 click**（12px 发、16px 不发）。
 *     于是「想滚动」变成「弹出词卡/译文」—— 浏览器自己的 touch-slop 只管 12—16px
 *     那一段，下面这段它放行。
 *   · **长按 700ms 松手 → 浏览器照发 click**（实测 click=1），完全不拦。
 *     于是「长按选词准备复制」变成「弹出词卡」。这条是纯亏：浏览器不管，只有应用层能拦。
 * 所以这里只做否决（计划 §3 第 4 条：不同时用 pointerup 和 click 各执行一遍动作，
 * 事件链只有一个最终激活入口）。动作仍然只从 click 走一次，这个守卫只在 click
 * 到来时决定要不要丢掉它。
 * 键盘与读屏不受影响：那条路径不产生指针序列、也不带指针的 detail，
 * 守卫按「无序列 → 放行」处理（计划 §3 第 3 条要求不破坏键盘与读屏触发）。 */
const TAP_MOVE_PX = 10;     // 实测浏览器 slop 落在 12—16px，取其下一档，覆盖 10—15px 的模糊带
const TAP_HOLD_MS = 500;    // 长按 = 选词意图；与系统触发文本选择的时间量级一致
let tapGuard = null;        // { x, y, t, isTouch, veto }

document.addEventListener("pointerdown", e => {
  /* 多指手势（缩放）的第一指之外，一律标记否决 —— 实测双指本就不发 click，
   * 这条是保险，防的是某些输入法/辅助设备只发部分指针序列。 */
  if (!e.isPrimary) { if (tapGuard) tapGuard.veto = true; return; }
  if (e.pointerType === "mouse" && e.button !== 0) { tapGuard = null; return; }
  tapGuard = { x: e.clientX, y: e.clientY, t: Date.now(), isTouch: e.pointerType !== "mouse", veto: false };
}, true);

document.addEventListener("pointermove", e => {
  if (!tapGuard || tapGuard.veto) return;
  const dx = e.clientX - tapGuard.x, dy = e.clientY - tapGuard.y;
  if (dx * dx + dy * dy > TAP_MOVE_PX * TAP_MOVE_PX) tapGuard.veto = true;
}, { capture: true, passive: true });

document.addEventListener("pointercancel", () => { if (tapGuard) tapGuard.veto = true; }, true);

/* 这次 click 该不该丢。无论结果都清掉序列 —— 残留的守卫会误伤下一次键盘点击。 */
function tapVetoed(ev) {
  const g = tapGuard;
  tapGuard = null;
  /* 键盘 / 读屏 / 程序触发（ev.detail === 0，或根本没有指针序列）一律放行。
   * 鼠标只判移动：按住鼠标瞄准再点、拖选文本后松开都是正常操作，不该被「长按」误杀。 */
  if (!g || !(ev.detail > 0)) return false;
  return g.veto || (g.isTouch && Date.now() - g.t > TAP_HOLD_MS);
}

document.addEventListener("click", e => {
  if (tapVetoed(e)) return;
  const t = e.target.closest("[data-act],[data-tab],[data-article],[data-cat]");
  if (!t) return;

  if (t.dataset.tab && !t.dataset.act) {
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
    resumeAnchor = (savedPos && Number.isFinite(savedPos.pi)) ? { pi: savedPos.pi, si: savedPos.si || 0, rs: savedPos.rs || 0, off: savedPos.off || 0 } : null;
    const savedPct = savedPos && Number.isFinite(Number(savedPos.pct)) ? Number(savedPos.pct) : 0;
    S.lastRead = { id: activeArticle.id, y: resumeY, pct: savedPct, at: Date.now() };
    save();
    view = { name: "read" };
    syncReadUrl(activeArticle.id);
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
      /* ctx / form 必须一起回传。旧写法 renderSheet(w) 两个参数全丢：
         展开「更多」之后原句块消失、标题退回词元（点 adopted 显示 adopt）。
         实证见 tools/audit.js 的「更多展开后仍是同一个词、同一句话」一条。 */
      $(".phone").insertAdjacentHTML("beforeend", renderSheet(w, sheetCtx, sheetForm));
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
      view = { name: "read" }; syncReadUrl(nx.id); render();
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
      e.stopPropagation(); speak(t.dataset.word, "word"); break;
    case "toggle-cn": {
      /* 「译」是阅读中的即时开关：逐句对照 ↔ 收起（收起回到「点句显示」）。
         它**不循环三档** —— 循环切换在词汇高亮上已经吃过亏（想回上一档得连点，
         也不知道后面还有几档）。「关闭翻译」档下点它直接给 all：用户主动点「译」，
         意图就是「我要看中文」。关闭 / 点句显示之间的取舍属于长期偏好，在设置面板里选。 */
      const next = S.cnMode === "all" ? "tap" : "all";
      changeReadSetting(() => { S.cnMode = next; });
      syncReadSettingsSheet("cn", next);
      toast(next === "all" ? "逐句对照已展开" : "已收起 · 点句看译文");
      break;
    }
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
      const v = t.dataset.cn;
      if (!CN_MODES.includes(v) || S.cnMode === v) break;
      changeReadSetting(() => { S.cnMode = v; });
      syncReadSettingsSheet("cn", v);
      break;
    }
    case "set-theme": {
      const v = t.dataset.theme;
      const next = (v === "paper" || v === "night") ? v : "";
      if (S.readTheme !== next) changeReadSetting(() => { S.readTheme = next; });
      syncReadSettingsSheet("theme", v);
      break;
    }
    case "set-hls": {
      const src = t.dataset.src;
      if (!HL_SOURCES.includes(src)) break;
      /* 走 changeReadSetting 而不是直接改 class：它会先抓句子锚点、改完再还原，
         切开关不会把读者甩回文章开头（与字号 / 对照同一套机制）。
         ★ 这里只写 S.hlSets，**不动 S.known** —— 见 renderFabSheet 上的说明。
         想「顺手清掉已认识」只能用户自己再点一次「取消已认识」，系统不替他决定。
         rebuildHlUnion() 必须调：HL_UNION 是缓存，漏调 = 面板说开了、正文没颜色。 */
      changeReadSetting(() => {
        S.hlSets[src] = !S.hlSets[src];
        rebuildHlUnion();
        /* 词源切换不重渲染整页，但需要同步正文现有 span 的颜色类。
           同一词形只刷一次；其余状态（已认识 / 生词）由 paintWord 保持原优先级。 */
        const words = new Set($$("#read-scroll .word").map(n => n.dataset && n.dataset.word).filter(Boolean));
        words.forEach(paintWord);
      });
      save();
      syncHlToggles();
      break;
    }
    case "set-accent": {
      /* 口音只影响 speak()，不动排版，所以不必走 changeReadSetting（省一次锚点还原） */
      const v = t.dataset.accent === "en-GB" ? "en-GB" : "en-US";
      if (S.accent !== v) { S.accent = v; save(); }
      syncReadSettingsSheet("accent", v);
      break;
    }
    /* 语速同理：只喂给 utterance.rate，不碰排版 */
    case "set-rate": {
      const v = ["slow", "std", "fast"].includes(t.dataset.rate) ? t.dataset.rate : "std";
      if (S.rate !== v) { S.rate = v; save(); }
      syncReadSettingsSheet("rate", v);
      break;
    }
    case "para-peek": {
      /* 点一句 = 选中它：喇叭只在选中的句子上出现，长文里不再满屏小图标。
       * 一次只留一个选中句。译文是否跟着弹出，取决于中文对照档位：
       *   tap 档 → 弹出（这就是「点句显示」的定义）
       *   off 档 → 只选中、不弹中文。这是 off 与 tap 的**唯一**差别，也是这一档
       *            存在的全部理由：纯英文阅读时不该被中文打断。
       *   all 档 → 中文本来就在，不必 peek。 */
      const on = !t.classList.contains("sel");
      /* ★ 保持所点句不动。切句 = 收起上一句译文 + 展开本句译文，而浏览器的滚动锚定
       *   锚的是视口内**第一个**元素（往往不是用户刚点的那句），于是所点句被上方
       *   收起的那块译文带着往上跳。实测（2026-09-21 Edge 390×844，hasTouch，
       *   people-anne-hathaway-mother-mary）：第 20 句在 119px、第 24 句在 575px，
       *   点第 24 句后它自己上移 **96px** —— 正好等于第 20 句那块译文的高度。
       *   另两个场景实测位移都是 0，所以这个补偿只在「所点句真的动了」时生效：
       *     · 单句展开：译文是该句的兄弟节点、挂在它之后，不影响该句自身 → 0px
       *     · 展开屏外上方的句子：scrollTop 已被浏览器锚定补了 96px → 跟随句 0px
       *   于是不会与浏览器的锚定打架、也不会双重位移（计划 §3 特意提醒过这点）。
       *   锚点来源必须是**用户点的这一句**，不能用 readAnchor() —— 后者取的是视口上部
       *   1/4 处「正在读的句」，那是给字号/对照切换用的，切句时它多半不是所点句。
       *   .peek 的展开只动 opacity/transform（peekIn 关键帧），布局在加 class 那一刻
       *   就已定，所以可以同步量、同步补，不需要等一帧。 */
      const cont = $("#read-scroll");
      const anc = (cont && cont.getBoundingClientRect && t.getBoundingClientRect)
        ? (() => {
            const r = t.getBoundingClientRect(), c = cont.getBoundingClientRect();
            const rel = r.top - c.top;
            /* 只对「用户看得见的那句」补偿。屏外句也能被程序化展开（探针在测），
             * 那种情况下浏览器自己的滚动锚定已经处理好了（实测 scrollTop +96px），
             * 应用层再插一手反而把它的补偿挤掉 —— 实测过：改前跟随句 0px，
             * 加补偿后变成 96px。真实用户点不到看不见的句子，这条分支只为让
             * 探针的 B 场景保持原行为，同时说明「为什么不能无脑补」。 */
            if (rel < -8 || rel > (cont.clientHeight || 0) + 8) return null;
            return { pi: +t.dataset.pi || 0, si: +t.dataset.si || 0, off: rel };
          })()
        : null;
      $$(".sentence.sel").forEach(n => { n.classList.remove("sel"); n.classList.remove("peek"); });
      if (on) {
        t.classList.add("sel");
        if (S.cnMode === "tap") t.classList.add("peek");
      }
      if (anc) applyAnchor(cont, anc);
      break;
    }
    /* 段级「本段对照」（case "para-cn"）2026-09-19 随按钮一起删除：
       一句一行之后，整段展开既没有入口也没有必要 —— 点句出译文是唯一交互。 */
    case "para-speak": {
      e.stopPropagation();
      const a2 = activeArticle; const pi = +t.dataset.pi; const si = +t.dataset.si || 0;
      const rs = +t.dataset.rs || 0;
      /* 朗读要念**屏幕上那一句**：退化段切分后 data-si 恒为 0，只有 displaySentenceAt
         才取得到被点的第 rs 句。用 sentenceAt 会把整段 5 句一起念出来。 */
      const sent = displaySentenceAt(a2, pi, si, rs);
      if (sent && sent.en) {
        /* speak() 返回 false = 没有提交播放（无英语语音被拦 / 系统不支持）：
         * 此时 makeUtterance 或 speak 已经给出原因，绝不能再弹「朗读第 n 句」
         * 冒充成功 ——「提示与事实一致」（2026-09-25 阶段 1）。 */
        if (speak(sent.en, "sent")) {
          t.closest(".para")?.classList.add("playing");
          setTimeout(() => t.closest(".para")?.classList.remove("playing"), 1200);
          let n = 0;
          for (let i = 0; i <= pi; i++) n += i === pi ? si + 1 : sentencesOf(a2.paras[i]).length;
          toast(`朗读第 ${n}/${sentCount(a2)} 句`);
        }
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
    /* 全文朗读交给队列逐句推进（见 speakAll）。原先是 join(" ") 塞进一条 utterance ——
     * 长文会被引擎中途掐断，而且没有停止入口（唯一的「停」是反复点这里，实际是 cancel + 从头重播）。 */
    case "read-all":
      speakAll(activeArticle); break;
    case "speak-pause":
      togglePauseSpeech(); break;
    case "speak-stop":
      stopSpeech(); break;
    case "punch-in": {
      const id = activeArticle && activeArticle.id;
      if (id) {
        /* 打卡只负责标记「读完」。时长早就按秒持续落盘了（flushReadTime），
         * 这里只把还没结算的零头补上 —— 不再 Math.max(1,…) 硬凑一分钟，
         * 也不再把「读了十分钟没打卡」的时长丢掉。 */
        const sec = flushReadTime();
        if (!S.read.includes(id)) S.read.push(id);
        S.readCount[id] = (S.readCount[id] || 0) + 1;
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
         （与下方 lookup case 同理）；known 变化同时失效生词/难度统计缓存。
         「已认识」只在 S.known 里记录，生词本条目保留不动 —— 用户能看到自己
         收过的词后来被标成熟词，这本身就是进步的证据，不该悄悄删掉。 */
      clearArticleCaches();
      paintWord(w);
      toast(known ? `「${w}」已标记为认识，文中不再高亮` : `已取消「${w}」的已认识标记`);
      save(); $$(".sheet, .sheet-mask").forEach(n => n.remove());
      if (view.name === "notebook") render();
      break;
    }
    case "lookup": {
      const word = t.dataset.word;
      const form = t.dataset.form || word;   // 原文词形（adopted），卡片标题显示它
      sheetMore = false;   // 每次新查词都从轻卡开始
      /* 取「这个词所在的这句话」交给卡片做「本句含义」，并顺手截成短语境存起来 ——
         用户点「加入生词本」时卡片里已经拿不到句子（收藏按钮不在 .sentence 内），
         语境必须在这一刻留下。图注里的词、浮层 / 列表里的词没有 .sentence 祖先，
         ctx 为空，卡片少渲染一块即可。 */
      let ctx = null;
      const sentEl = t.closest ? t.closest(".sentence") : null;
      if (sentEl && activeArticle && sentEl.dataset.pi != null) {
        /* 用显示口径：退化段里同一 data-si 下有多个切句，只有带上 data-rs 才取得到
           「你点的这一句」；否则卡片会把整段英文当成「本句含义」显示出来。 */
        const s = displaySentenceAt(activeArticle, +sentEl.dataset.pi, +sentEl.dataset.si || 0, +sentEl.dataset.rs || 0);
        if (s && s.en) ctx = { en: clipContext(s.en, word), cn: clean(s.cn || "") };
      }
      sheetCtx = ctx;
      sheetForm = form;
      markTappedWord(t);   // 在正文里留下「查的是这个词」的定位标识
      if (activeArticle && view.name === "read") {
        LOOKED[activeArticle.id] = (LOOKED[activeArticle.id] || 0) + 1;
        /* 同步更新顶部的「已查次数」chip，不触发整页重渲染（避免滚动丢失） */
        const sc = $(".read-finish .stat-chips .st-chip:nth-child(3) b");
        if (sc) sc.textContent = LOOKED[activeArticle.id];
      }
      $(".phone").insertAdjacentHTML("beforeend", renderSheet(word, ctx, form));
      break;
    }
    case "close-sheet":
      sheetMore = false;
      clearTappedWord();   // 卡片收掉，正文里的定位底色也一起摘掉
      $$(".sheet, .sheet-mask").forEach(n => n.remove()); break;
    case "add-note": {
      const w = t.dataset.word;
      if (!inNotebook(w)) {
        /* 收藏的那一刻就把「你是在哪句话里遇到它的」一起存下来 —— 生词本的全部
           价值就在这里：复习时回忆的是语境，而不是孤零零一个中文释义。
           语境取自点击查词时截好的片段（sheetCtx，长句已裁到目标词前后各 7 词），
           不在阅读页收藏（词库外补收藏）时语境为空，条目照常可用，不阻断收藏。 */
        const inRead = !!(activeArticle && view.name === "read");
        S.notebook.push({
          word: w,
          addedAt: Date.now(),
          articleId: inRead ? activeArticle.id : "",
          articleTitle: inRead ? clean(activeArticle.title || "") : "",
          context: sheetCtx ? { en: sheetCtx.en, cn: sheetCtx.cn || "" } : null,
        });
        /* 加入生词本 = 这个词现在是我的生词。若此前标过「已认识」必须撤掉 ——
           known 的优先级高于生词色，不撤的话正文里它仍然是灰的，用户会以为没生效。 */
        const ki = S.known.indexOf(w);
        if (ki >= 0) S.known.splice(ki, 1);
        toast(`「${w}」已加入生词本`);
      }
      else toast("已经在生词本里了");
      /* 不 render：整页重渲染会把阅读位置打回开头，词已入本，浮层关掉即可；
         但正文里那处高亮必须就地变成生词色，否则用户点完看不到任何反馈。 */
      save(); paintWord(w);
      $$(".sheet, .sheet-mask").forEach(n => n.remove()); break;
    }
    case "remove-note": {
      const w = t.dataset.word;
      S.notebook = S.notebook.filter(item => item.word !== w);
      save(); paintWord(w);
      toast(`「${w}」已移出生词本`);
      $$(".sheet, .sheet-mask").forEach(n => n.remove());
      /* 词汇页里删条目要把列表重画，阅读页里只改标色（重渲染会丢滚动位置） */
      if (view.name === "notebook") render();
      break;
    }
    case "open-notebook":
      pushNav(); vocabTab = "new"; view = { name: "notebook" }; render(); break;
    case "open-customvocab":
      /* 两段式确认的状态必须进页就复位 —— 上一次进来点到「待确认」就离开，
         回来还停在待确认态会让人误触破坏性操作。 */
      pushNav(); cvArmedClear = false; cvArmedOver = false; cvQuery = "";
      view = { name: "customvocab" }; render(); break;
    case "cv-toggle-import":
      cvImportOpen = !cvImportOpen; cvArmedOver = false; render(); break;
    case "cv-append": {
      const pv = buildVocabPreview(cvDraft, S.customVocab, true);
      if (!pv.valid.length) { toast("没有可导入的新词"); break; }
      S.customVocab = mergeVocab(S.customVocab, pv.valid, false);
      rebuildCustomSet(); save();
      toast(`已追加 ${pv.valid.length} 个词，词库共 ${S.customVocab.length} 词`);
      cvDraft = ""; cvImportOpen = false; cvArmedOver = false;
      render(); break;
    }
    case "cv-overwrite": {
      /* 两段式：第一击只进入待确认态（按钮上写清后果），第二击才执行。
         覆盖是破坏性操作且不可撤销（没有回收站），必须显式二次确认（需求 §4）。 */
      if (!cvArmedOver) { cvArmedOver = true; render(); break; }
      const pv = buildVocabPreview(cvDraft, S.customVocab, false);
      if (!pv.valid.length) { toast("没有可导入的词，词库未改动"); cvArmedOver = false; render(); break; }
      S.customVocab = mergeVocab([], pv.valid, true);
      rebuildCustomSet(); save();
      toast(`已覆盖：词库现为 ${S.customVocab.length} 词`);
      cvDraft = ""; cvImportOpen = false; cvArmedOver = false;
      render(); break;
    }
    case "cv-del-word": {
      const wd = t.dataset.word;
      S.customVocab = (S.customVocab || []).filter(x => x !== wd);
      rebuildCustomSet(); save();
      toast(`「${wd}」已移出词库`);
      /* 两个现场都要收拾：管理页里删 → 重画列表；阅读页词卡里删 → 摘掉正文高亮。
         漏掉后者会出现「词已删、颜色还在」——直到下一次整页渲染才消失。 */
      $$(".sheet, .sheet-mask").forEach(n => n.remove());
      if (view.name === "customvocab") render(); else paintWord(wd);
      break;
    }
    case "cv-clear": {
      if (!cvArmedClear) { cvArmedClear = true; render(); break; }
      S.customVocab = [];
      rebuildCustomSet(); save();
      toast("词库已清空");
      cvArmedClear = false; cvArmedOver = false;
      render(); break;
    }
    case "cv-export": {
      const text = JSON.stringify({ app: "wordlens-custom-vocab", version: 1, exportedAt: new Date().toISOString(), words: S.customVocab }, null, 2);
      const name = `ciyue-我的词库-${todayKey()}.json`;
      const saveF = window.WLSaveFile;
      if (window.WORDLENS_NATIVE === true && saveF && typeof saveF.save === "function") {
        try { saveF.save(name, text); toast("已开始导出词库"); break; }
        catch { /* 原生保存失败时继续走浏览器下载 */ }
      }
      const url = URL.createObjectURL(new Blob([text], { type: "application/json" }));
      const link = document.createElement("a");
      link.href = url; link.download = name;
      document.body.appendChild(link); link.click(); link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      toast("已导出词库");
      break;
    }
    case "vocab-tab": {
      const tb = t.dataset.tab === "known" ? "known" : "new";
      if (tb === vocabTab) break;
      vocabTab = tb;
      render();
      break;
    }
    case "nb-open-art": {
      const id = t.dataset.id;
      const art = ARTICLES.find(a => a.id === id);
      if (!art) { toast("文章已下线"); break; }
      pushNav({ src: id });
      activeArticle = art;
      touchReadHistory(art.id);
      readSecs = 0; flushedSecs = 0;
      LOOKED[art.id] = 0;
      resumeY = (S.lastRead && S.lastRead.id === art.id) ? (S.lastRead.y || 0) : 0;
      const savedPos = (S.readPos || {})[art.id];
      resumeAnchor = (savedPos && Number.isFinite(savedPos.pi)) ? { pi: savedPos.pi, si: savedPos.si || 0, rs: savedPos.rs || 0, off: savedPos.off || 0 } : null;
      const savedPct = savedPos && Number.isFinite(Number(savedPos.pct)) ? Number(savedPos.pct) : 0;
      S.lastRead = { id: art.id, y: resumeY, pct: savedPct, at: Date.now() };
      save();
      view = { name: "read" };
      syncReadUrl(art.id);
      render();
      break;
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

function readTextFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(reader.error || new Error("无法读取所选文件"));
    reader.readAsText(file);
  });
}

/* 自定义词库文件先读入草稿，由用户核对统计后再确认导入。 */
{
  const input = $("#cv-file-in");
  if (input) input.addEventListener("change", () => {
    const file = input.files && input.files[0];
    input.value = "";
    if (!file) return;
    readTextFile(file).then(text => {
      cvDraft = normalizeVocabDraft(text);
      cvImportOpen = true;
      cvArmedOver = false;
      if (view.name !== "customvocab") {
        pushNav();
        view = { name: "customvocab" };
      }
      render();
      toast(`已读入「${file.name}」，请核对统计后确认导入`);
    }).catch(() => toast("文件读不出来，请确认是文本文件"));
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
      const rawId = p.get("id");
      const idx = +(p.get("a") || 0);
      const candidate = rawId ? ARTICLES.find(a => a.id === rawId) : (ARTICLES[idx] || ARTICLES[0]);
      if (!candidate) {
        activeArticle = null;
        view = { name: "discover" };
      } else {
        activeArticle = candidate;
        view = { name: "read" };
        touchReadHistory(activeArticle.id);
        const savedPos = (S.readPos || {})[activeArticle.id];
        resumeY = (savedPos && Number.isFinite(Number(savedPos.y))) ? Number(savedPos.y) : 0;
        resumeAnchor = (savedPos && Number.isFinite(savedPos.pi))
          ? { pi: savedPos.pi, si: savedPos.si || 0, rs: savedPos.rs || 0, off: savedPos.off || 0 } : null;
        const savedPct = savedPos && Number.isFinite(Number(savedPos.pct)) ? Number(savedPos.pct) : 0;
        S.lastRead = { id: activeArticle.id, y: resumeY, pct: savedPct, at: Date.now() };
        save();
        syncReadUrl(activeArticle.id);
      }
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
   离线打开会白屏。file:// 与沙箱环境自动跳过，不影响本地直接打开。
 * ★ 原生壳（Android APK）例外（2026-09-22，APK 审查报告第⑤条）：壳里「页面版本」
 * 由安装包控制、以后「文章版本」由原生内容更新器控制，再叠一层 SW 缓存就变成
 * 三套版本来源，更新与回退都说不清谁赢。构建脚本 tools/build-mobile.mjs 会把
 * `window.WORDLENS_NATIVE = true` 注入到 mobile/www 的 index.html 里。 */
const NATIVE_SHELL = typeof window !== "undefined" && window.WORDLENS_NATIVE === true;
/* 抽成纯判定函数才能被测：四种环境各断言一次（网页 / 原生壳 / file:// / 无 SW 支持），
 * 只测「网页时为真」的话，壳里照样注册 SW 这件事不会有任何守卫拦得住。 */
function shouldRegisterSW(env) {
  const e = env || {};
  return !e.native && !!(e.nav && e.nav.serviceWorker)
    && /^https?:$/.test(e.proto || "") && !!e.hasWin;
}
if (shouldRegisterSW({
  native: NATIVE_SHELL,
  nav: typeof navigator !== "undefined" ? navigator : null,
  proto: typeof location !== "undefined" ? location.protocol : "",
  hasWin: typeof window !== "undefined" && !!window.addEventListener,
})) {
  const warmAppCache = async reg => {
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
    const list = [...urls];
    /* 首访竞态（2026-09-23）：register() resolve 时新 SW 往往还在 installing/activating，
     * navigator.serviceWorker.controller 仍是 null —— 原 controller?.postMessage 变成
     * 静默 no-op，预热恰好在最需要它的「首访」永远落空（离线刷新首屏才第一次进缓存）。
     * 修法：active 在手就直接发；没有就等 worker statechange 到 activated（或被顶替后
     * 取新的 active）/ controllerchange 再发，sent 标记去重，statechange 与
     * controllerchange 双通道同时命中也只发一次。 */
    let sent = false;
    const send = w => {
      if (sent || !w) return;
      sent = true;
      try { w.postMessage({ type: "cache-urls", urls: list }); } catch { /* 私密模式等限制不影响在线阅读 */ }
    };
    send(reg.active);
    if (!sent) {
      const w0 = reg.waiting || reg.installing;
      if (w0) w0.addEventListener("statechange", () => {
        if (w0.state === "activated") send(w0);
        else if (w0.state === "redundant") send(reg.active || reg.waiting);
      });
      navigator.serviceWorker.addEventListener("controllerchange",
        () => send(navigator.serviceWorker.controller), { once: true });
    }
  };
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").then(warmAppCache).catch(() => { });
  });
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

/* ---------------- 生命周期：与 SW 无关，任何环境都必须挂 ----------------
 * ★ 这三条原来被套在 `if (shouldRegisterSW(...))` 里（2026-09-22 修）。
 *   壳里不注册 SW 是对的（见上），但「切后台结算阅读时长」「离开页面落盘续读位置」
 *   跟 Service Worker 没有任何关系 —— 一起被关掉等于：
 *   **原生壳里读了十分钟直接切走，时长与续读位置一个字节都不写**（移动端最高频的漏记场景）。
 *   SW 不可用的网页环境（http:// 非安全上下文、隐私模式）本来也有同一个洞。
 * 判定口径：这一节只碰 S / flushReadTime / flushReadPos / lastActiveAt，
 *   一个 serviceWorker API 都不引用 —— 所以它没有任何理由跟着 SW 走。 */
if (typeof window !== "undefined" && typeof window.addEventListener === "function") {
  /* 「上次读到」兜底：页面被切走/关闭时，把滚动位置与句子锚点立即落盘
     （正常路径在离开阅读页时落，这里只兜住被杀/被切走那一下） */
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
}

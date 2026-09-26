/* 词阅 WordLens —— 文案清洗库
 *
 * 抓取流水线（tools/ingest.mjs）与数据修复（tools/fix-text.mjs）共用同一套规则，
 * 保证「新抓的」和「已存在的」文章走同样的清洗标准。
 *
 * 处理四类问题：
 *   1. 机器翻译残留：有道的 <s:N> / <e:N> 占位符、中文里的空格错位
 *   2. 网页垃圾：源站把广告脚本、相关阅读导航塞进 <p>，被当作正文抓了进来
 *   3. 不可见字符：LRM/RLM、零宽空格、软连字符等
 *   4. 正文段落判定与断句（2.5 / 2.6 节）：`goodPara` + `splitSentences`。
 *      这两样原在 ingest.mjs，2026-09-14 搬来共享 —— **因为「有多少正文」这件事
 *      被两处各算了一遍并且算出了两个数**：明星栏目历史通道的候选清单报 1035 词、
 *      真入库实测 178 词，一篇够格的图集被清单放行、被入库拒收。
 *      凡是要数正文词数的地方（清单 `measure`、入库 `classics()`、RSS 主流程）
 *      都必须从这里拿尺子，别再各写一份。
 */

import fs from "node:fs";
import { restoreReviewedTranslations } from "./lib-sentence-translations.mjs";

/* ---------------- 1. 不可见字符 ---------------- */

const INVISIBLE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u00AD\u200B-\u200F\u202A-\u202E\u2060\u2066-\u2069\uFEFF\uFFFD]/g;

export const cleanInvisible = s => String(s == null ? "" : s).replace(INVISIBLE, "");

/* ---------------- 2. 网页垃圾 ---------------- */

/* 广告/埋点脚本特征：命中即认定这段不是正文 */
const AD_CODE = /blogherads|\bpmcCnx\b|defineSlot|setTargeting|setSubAdUnitPath|setClsOptimization|switchToHarmonyPlayer|isEventAdScheduledTime|googletag|\badq\s*\.|\bwindow\.\s*\w|\bdocument\.\s*(getElementById|querySelector|write)|\.push\s*\(\s*function|\bfunction\s*\(\s*\)\s*\{/i;

/* 导航/相关阅读前缀：整段都不是正文 */
const NAV_PREFIX = /^\s*(Related Stories|Related Articles|Popular on|Trending|Recommended|More from|More in|Also on|Also read|Read next|You may also like|Sponsored|Advertisement|Sign up for|Subscribe to|Skip to)\b/i;

/* 整段只有链接（推文尾巴、图床页脚） */
const BARE_LINK = /^\s*(https?:\/\/|pic\.twitter\.com|www\.)\S*(\s+(https?:\/\/|pic\.twitter\.com|www\.)\S*)*\s*$/i;

export const hasAdCode = t => AD_CODE.test(String(t || ""));

/** 整段是否为归零垃圾（整段丢弃） */
export function isJunkPara(t) {
  const s = String(t || "").trim();
  if (!s) return true;
  if (NAV_PREFIX.test(s)) return true;
  if (BARE_LINK.test(s)) return true;
  return false;
}

/** 段内夹带的脚本：从脚本特征处截断，保留前面的真句子 */
export function stripInlineJunk(t) {
  const s = String(t || "");
  const m = s.search(AD_CODE);
  if (m < 0) return s;
  return s.slice(0, m).replace(/[\s:：,，;；、\-–—(（]+$/, "").trim();
}

/* ---------------- 2.5 段落质量判定（正文 / 噪声） ----------------
 *
 * 这一段原先长在 `ingest.mjs` 里。搬过来的原因是一次**实测口径漂移**：
 * 明星栏目「历史通道」的候选清单（`lib-classics.mjs` 的 `measure`）与真正入库
 * （`ingest.mjs` 的 `classics()`）各数各的正文词数，结果碧昂丝那篇在清单上报
 * **1035 词**、入库实测只有 **178 词**，被「正文 ≥300 词」当场跳过 —— 清单说
 * 「这篇能入」，真跑却被拒，看起来像随机丢数据。
 * 根因就是这里：清单只做了「排除图注副本」的粗筛，入库还要过下面这套段落质量
 * 判定 + 断句过滤。同一把尺子必须只有一份，所以连 `splitSentences` 一起搬来。
 *
 * 判定顺序（任何一条命中即整段丢弃）：长度 → 字母数 → 站点推广话术 → 广告脚本
 * → 导航前缀 → 导航条形状 → 竖线/短标题。 */

const BOILER = [
  /* 社交分享按钮。2026-09-16 补：`Pin It on Pinterest`（More To That 页脚，位于原文 83%）
     恰好 19 字符，越过列表档 12 字符的长度闸；而「纯标签闸」由 5 词放宽到 2 词之后，
     它 4 词的形态也不再被拦 —— 两条旧防线同时失效，靠这条补上。
     裸单词形态（Facebook / Twitter / Gmail）仍由长度闸挡，这里只补短语。 */
  /\bpin it on pinterest\b/i, /\bshare on (facebook|x|twitter|linkedin)\b/i, /\btweet (this|it)\b/i,
  /\bpost (this|it) (on|to)\b/i, /\bemail (this|it)\b/i, /\bprint (this|it)\b/i,
  /^page not found$/i,
  /\bchrome browser\b/i, /\baccessibilit/i, /\bsubscri(b|pt)/i, /\bsign up\b/i, /\bnewsletter\b/i,
  /\bfollow us\b/i, /\bshare (this|on)\b/i, /\bclick here\b/i, /\bread more\b/i, /\badvertisement\b/i,
  /\ball rights reserved\b/i, /\bcopyright\b/i, /\bphoto(graph)? (by|credit)/i, /\bgetty images\b/i,
  /\bwatch:|\bVIDEO\b/, /^\(?Image|^Credit:/i, /\bterms of (use|service)\b/i, /\bprivacy policy\b/i,
  /\bthis article (was|has been)\b/i, /\bplease use\b/i, /\bfor more (news|information)\b/i,
  /\brelated:|^More from|^Read next/i, /\bsupport our journalism\b/i, /\bdownload the\b/i,
  /* TechCrunch 每篇文章头部都挂着大会推广段 */
  /^Disrupt \d{4}:/i, /\btake over \d+ industry stages\b/i,
  /* 各站点的浏览器/兼容性提示与推广位（CBS 等会把它们塞进 <p>） */
  /\bbrowser is not fully supported\b/i, /\bupgrade to a modern browser\b/i, /\bmicrosoft\.com\/edge\b/i,
  /* `optimal experience` 2026-09-16 收窄 —— 原文太通用，心流理论里
     **`optimal experience`（最优体验）是 Csikszentmihalyi 的核心术语**，
     它把 kb-human30 的一条真正文整段杀掉了：
     「Scientific Foundation: Four decades of flow research validate this integrated approach.
      Csikszentmihalyi's studies … show that **optimal experience** requires balance …」
     实测扫全部 14 份原文样本，含该短语的段落**只有这 1 条** —— 也就是说这条规则
     在样本里从未拦过任何噪声，命中即误伤。现在要求与浏览器/下载语境同现
     （同句内前后 80 字符），原意保留、误伤消失。 */
  /\boptimal experience\b[^.!?]{0,80}\b(browser|chrome|edge|safari|firefox|download|install|upgrade)\b/i,
  /\b(browser|chrome|edge|safari|firefox|download|install|upgrade)\b[^.!?]{0,80}\boptimal experience\b/i,
  /\bavailable to download\b/i, /\bmore than \d+ languages\b/i,
  /\bskip to (main )?content\b/i, /\benable javascript\b/i, /\byour (browser|device) (does not|doesn't)\b/i,
  /\bcookie(s)? (policy|settings|preferences)\b/i, /\bmanage your (privacy|preferences)\b/i,
  /\bthis (site|website) is protected by\b/i, /\bwe use cookies\b/i, /\bconsent\b/i,
  /* 时尚/美妆媒体：导购免责声明与栏目推广 */
  /\bevery item on this page\b/i, /\bwe may earn (a )?commission\b/i, /\bwe independently (select|chose|test)/i,
  /\bindependently (selected|evaluated|tested) by our\b/i, /\bif you buy from a link\b/i,
  /\ball products are independently/i, /\bcontinue reading below\b/i, /\bwe only recommend (products|things)\b/i,
  /\bshopping (editor|director|team) (picks|approved)\b/i, /\bprice (and|or) availability\b/i,
  /\bwhy trust us\b/i, /\byou may also like\b/i, /\bsubscribe to (our|the) newsletter\b/i,
  /\bwhen you purchase through links on (our|the) site\b/i, /\bwe may earn an affiliate commission\b/i,
  /\bget full access to premium articles\b/i, /\bexclusive features and a growing list of member rewards\b/i,
  /* 付费墙/截断提示：正文到这里就结束时，不能把按钮文案当学习内容。 */
  /\bsign in to continue\b/i, /\bsubscribe to continue\b/i, /\bread the full (story|article)\b/i,
  /\bunlock the full (story|article)\b/i, /\bcontinue reading (below|to read)\b/i,
  /* 征订/许可类话术（HistoryExtra、Immediate Media 等会把它们写进正文 <p>） */
  /\bwould you like to receive\b/i, /\bcarefully selected partners\b/i, /\bfrom our publisher\b/i,
  /\boffers from (our|the) (publisher|partners)\b/i, /\bkeep up with (the )?latest\b/i,
  /* Condé Nast 系（Vogue / Vanity Fair / GQ）正文尾部的推广段。实测戴安娜那篇有 3 段
     全部通过了上面的过滤混进正文 —— 「Vogue Runway App 升级」「加入 Vogue Business 会员」
     「把我们加进你的偏好来源」，都是纯推广，不是文章内容。历史通道（--classics）
     抓的是这一系，不挡就会每篇都带 3 段广告尾巴。 */
  /\bvogue (runway )?app has expanded\b/i, /\bvogue business (member|membership)\b/i,
  /\bnever miss a story\b/i, /\bto your preferred sources\b/i,
  /\b(become|join) a [a-z]+ (business )?member\b/i, /\bthe ultimate resource for\b/i,
  /* 播客/资讯站的节目落地页：把「免责声明 + 会员推广 + 联盟计划」整段写在 <p> 里。
     2026-09-15 语义验收实测 fs.blog 的三篇节目页 —— 一篇 359 词里 11 句（52%）是这类
     模板，读起来像文章、qc 的 F4/F5 一条都抓不到（不是链接、不是广告脚本、没占位符），
     于是「本播客不构成投资建议」就成了学习内容。 */
  /\bnot investment advice\b/i, /\bfor informational purposes only\b/i,
  /\bfor informational and entertainment purposes\b/i, /\byour own due diligence\b/i,
  /\b(not|aren't) medical professionals?\b/i, /\bconsult (a|with a) qualified (financial advisor|healthcare professional)\b/i,
  /\bmember(s)? only (area|content)\b/i, /\bget transcripts\b/i, /\bearly access, ad-free\b/i,
  /\blearn more or sign up now\b/i, /\baffiliate (advertising|program)\b/i,
  /\bassociates program\b/i, /\bearn advertising commissions\b/i,
  /\bthis (podcast|episode) discusses\b/i, /\bmay hold positions in (assets|securities)\b/i,
  /\bget the longer, extended version\b/i, /\ba podcast about mastering the best of what\b/i,
  /\bwalk away from every episode with actionable insights\b/i,
  /\bthe knowledge project focuses on insights and lessons\b/i,
  /* 站点外壳写进 <li>/<h2> 的残渣（2026-09-15 补提取器时实测）：
     More To That 的订阅弹窗（「Thanks! Check your inbox…」）、Ness Labs 的
     newsletter 条幅与页脚标语、跨篇导流（「Related Reading on the 9 Stages…」）。
     这些比正文段的同类话术更短，长度闸挡不住，只有文本特征能认。 */
  /\bcheck your inbox\b/i, /\bmindful makers\b/i, /^don[’']t work more\b/i,
  /\bmade a \d+-page ebook\b/i, /^related reading on the\b/i, /\bthinking in stories\b/i,
  /\bpaid substack articles\b/i, /\bjoin \d[\d,]*\+? (mindful|creative|curious|smart)\b/i,
  /* 放开 30–70 字符短段后浮出来的赞助/订阅尾巴（2026-09-15 实测）：
     fs.blog 页脚的 Syrus Partners 赞助行、AnOther 的周更导流。 */
  /^\+\s*check out\b/i, /\bgranola notes\b/i, /\bwe buy amazing businesses\b/i,
  /\bbest of [\w.-]+\.(com|org|net|co\.uk)\b/i, /\bpublished every (friday|thursday|monday|week)\b/i
];

/* 「别的集的预告」：节目页常在正文尾挂几条相关集的摘要，原文自己就被截断了（句尾 "…"）。
   这类段落短、且以省略号收尾 —— 逐条判定就是「半截话」，译出来读者也接不上。
   语义验收实测 fs.blog 一篇里混进了 3 条（含其他节目的开头句）。
   **省略号前必须有空格**：信息流截断是在词边界上切的（"away from …" / "the story of …"），
   而作者本人打的省略号是紧贴在词上的（"have some fun..."）。实测放宽到「任意省略号结尾」
   会误杀 Dan Koe 那篇的 2 段正常正文（138 词、77 词，都是完整句），所以按这个区别卡。 */
function looksTruncatedTeaser(t) {
  return t.length < 240 && /\s(?:…|\.\.\.)\s*$/.test(t);
}

/* 广告脚本 / 页面埋点碎片：Hearst、Variety 等会把它们写进 <p> 里 */
/* 2026-09-16 修：`function\s*\(` 缺 `\b`，而它是**子串匹配** ——
 * `dysfunction (which is the first thing that pops up…` 里的 `function (` 命中了它，
 * 于是 illness 那篇（讲**耳咽管功能障碍**，正文里 dysfunction 反复出现）的
 * **332 字符完整正文段被当成 JS 代码整段丢掉**。
 * `AD_CODE` 里同一族规则本来就写作 `\bfunction\s*\(\s*\)\s*\{`，这条是漏了边界的旧版。
 * 同时把 `document\.` 收严：原文里 `…a legal document. The next…` 这种**英文句末的
 * document.** 同样会被整段误伤，限定到 DOM API 才安全。 */
const CODE_JUNK = /\.push\s*\(|defineSlot|blogherads|pmcCnx|window\.pmc|googletag|\bdocument\.\s*(getElementById|querySelector|write)|\bfunction\s*\(|=>\s*\{|@media|!important|\{[\s\S]*\}/;

const NAV_HINT = /\b(as it happened|latest news and rumours|match report|not got sky|champions league scores|full match|watch highlights|teams \| stats|sign in|log in|get sky sports|subscribe to|sign up for our)\b/i;

/* 栏目/导航条：没有句末标点、且大写词占比过高的一串词 */
function looksLikeNav(t) {
  if (/[.!?…”"']$/.test(t)) return false;
  /* 有结构分隔符（冒号 / 箭头 / 编号 / 长破折号）= 「条目 → 说明」的行文格式 = 内容。
   * 导航条不写冒号。2026-09-16 实测 kb-human30 有 25 条正文条目死在这条规则下：
   * `Biological: Seed → Plant → Ecosystem → Stable Forest`、
   * `Ego Development: E4 (Conformist) to E5 (Self-Aware)`、
   * `Historical Stages and Human 3.0 Correlations:` —— 大写词占比确实过 50%，
   * 但它们是四象限 / 发展模型对照表的一行，不是栏目菜单。 */
  if (hasListItemSep(t)) return false;
  const ws = t.split(/\s+/).filter(Boolean);
  if (ws.length < 6) return false;
  const cap = ws.filter(w => /^[A-Z0-9]/.test(w)).length;
  return cap / ws.length > 0.5;
}

/* 列表项（<li>）与小标题（<h2>/<h3>）走一套更松的长度门槛。
 *
 * 为什么必须另开一档：`<HUMAN 3.0> 完整知识库` 是一份**清单式参考文档** —— 原文 740 个
 * `<li>` 的中位数只有 **29.5 字符**（`Emotional regulation and intelligence`、
 * `Complexity → Chaos (entropy increase)`），按正文的 70 字符闸算，**661 条会被整条丢掉**，
 * 实测 1,912 词。读者看到的是「有三个层级」讲了、层级本身一条没列。
 * 而列表项又天然比正文段短，把 70 字符闸放宽到全局会放进栏目菜单 —— 所以门槛绑在
 * 「这是个列表项」这个事实上，而不是把正文的标准调松。
 *
 * 长度之外还要挡掉「像标签而不像内容」的条目（`Read The Koe Letters` / `Dan Koe` /
 * `August 31, 2025`）：无标点、无冒号且词数极少的一律不要。 */
/* 2026-09-16 放宽 22/16 → 12/10。
 * 实证：Dan Koe《How to fix your entire life in 1 day》的清单条目
 * `Reject the known path`(21) / `Dive into the unknown`(21) / `To have a goal.`(15)
 * 被 22 字符闸整条删掉 —— 原文写着「要变得更智慧，你必须：」，然后一条没列。
 * 旧尺子只算长度，不看它是不是内容。放宽后「纯标签」排除规则仍然生效
 * （`Read The Koe Letters` / `August 31, 2025` 照样被挡，差分实测 13 篇零垃圾）。 */
const LIST_MIN_LEN = 12;
const LIST_MIN_LETTERS = 8;
/* 列表项的「分隔符」判定 —— `goodListItem` 与 `explainReject` **共用这一份**（别再抄）。
 * 2026-09-16 补编号前缀：HUMAN 3.0 那两份文档的小标题与清单项几乎全带编号
 * （`1) Quadrants` / `2. Substrate Consumption` / `3) Postmodern`），
 * 旧写法只认冒号 / 箭头 / 长破折号，把它们判成「纯标签」整条删掉 ——
 * 原文写着「1) Quadrants 2) Levels …」而库里一个都没有。编号是原文的结构标记。 */
const hasListItemSep = s => /[:：→]|\s[–—]\s|^\s*(?:\d+[).]|[IVX]{1,5}[).]|[-•*·–—])\s/.test(s);
const LIST_DATE = /^[A-Z][a-z]+\.?\s+\d{1,2},\s*\d{4}$/;
/* 纯标签闸的词数下限。2026-09-16 由 5 降到 2。
 * 实证：Dan Koe《HUMAN 3.0 完整知识库》后半是清单式框架文档，
 * `Sleep and recovery`(3 词) / `Emotional regulation and intelligence`(4 词) /
 * `Nutrition and metabolic health`(4 词) 这类**名词短语条目**被 5 词闸整片删掉 ——
 * 468 条 / 1,227 词，读者看到「Mind 象限包含以下能力」然后一条没列。
 * 降到 2 之后仍能挡 `Dan Koe`（2 词，但同时被 LIST_MIN_LEN 的长度闸挡）。
 * 真正的站点导航不靠这条 —— 那些在 extractBlocks 的 inNav 阶段就被排掉了
 * （实测 `Read The Koe Letters` 从未进入候选节点）。 */
const LIST_MIN_WORDS = 2;

/* 段闸与句闸的阈值 —— **单点出口，不许再抄第二份**。
 * 教训（2026-09-16）：`.tmp/diag-fulltext.mjs` 的 `why()` 归因函数自己写死了一份
 * （`s.length < 22` / `< 30` / 字母 `< 20`），改完阈值后它把「纯标签闸」误报成
 * 「长度闸 (<22)」，整张归因表系统性错位 —— 而诊断表的唯一价值就是归因。
 * 需要这些数字的工具一律 `import { GATES }`。 */
const PARA_MIN = 15;            /* 段整体长度下限（原 30，2026-09-16 放宽） */
const PARA_SHORT = 70;          /* 「短段」分界 */
const PARA_SHORT_LETTERS = 12;  /* 短段要求的最少字母 */
const PARA_LONG_LETTERS = 50;   /* 长段要求的最少字母 */
/* splitSentences 的句长下限。原 30 → 12（2026-09-16 上午）→ **2**（同日下午）。
   降到 2 的判据是全量实测：全库存量 2,936 句里，12 挡掉的只有 28 条，
   其中 9 条是 `I.e.` 残片 —— 而那不是长度问题，是 ABBR 漏了 `i` 标志（已单独修掉）；
   其余 19 条**全是真内容**：
     · 人物访谈的短对话：`No.` / `No way.` / `But music?` / `CT: Exactly.` /
       `DSF: Right.` / `[Laughs.]`（Anne Hathaway、Charlize Theron 两篇共 9 条）
     · Dan Koe 的排比：`Get the job.` / `Play victim.`
     · More To That 的 `All right.`、知识库的 `Crazy.` / `1) Quadrants` / `And so on.`
   一次访谈里「No.」「Exactly.」被抹掉，读者看到的是答非所问 —— 这类损失比多收几个
   短串严重得多。留 2 而不是 0：单字符残片（`A.` / `b.`）仍要挡，译出来是噪音。 */
const SENT_MIN = 2;
/* splitSentences 的整段兜底门槛（2026-09-16 新增）。见 splitSentences 内的注释：
   整段切完全丢时，若原段 ≥ 这个长度就把原句留下来；40 以下仍按老规矩丢残片。 */
const SENT_FLOOR = 40;
export const GATES = {
  listMinLen: LIST_MIN_LEN, listMinLetters: LIST_MIN_LETTERS, listMinWords: LIST_MIN_WORDS,
  paraMin: PARA_MIN, paraShort: PARA_SHORT,
  paraShortLetters: PARA_SHORT_LETTERS, paraLongLetters: PARA_LONG_LETTERS,
  sentMin: SENT_MIN, sentFloor: SENT_FLOOR,
};

/** 列表项/小标题专用的「是不是内容」判定（比正文宽松，但仍有下限与标签排除）
 *  @param {string} t
 *  @param {{head?: boolean}} [opts] head=true 表示这是 <h2>/<h3>/<h4>，也就是**作者写的小标题**。
 *
 *  head 档为什么必须单独开（2026-09-16 实测 kb-human30）：
 *    `A Complete Framework for Modern Multidimensional Human Development`(h2)、
 *    `MIND QUADRANT (Upper Left – Interior Individual)`(h3)、
 *    `Historical Context: Consciousness Evolution Through Time`(h3)
 *    这类标题**没有句末标点、且大写词占比过半**，被 `looksLikeNav` 判成栏目导航整条删掉。
 *    差分实测：kb-human30 有 29 条正文小标题死在这条规则下，原文的 PART I/II 骨架整个消失。
 *    标题是作者亲手写的结构标记，形态本来就不像句子（短、无标点、多 Title Case），
 *    拿「像不像导航」的形态判据去量它，量出来的只能是误报。
 *    所以 head 档只保留**内容性**排除（BOILER / CODE_JUNK / AD / 垃圾 / NAV_HINT），
 *    跳过全部形态闸（纯标签闸、标题型标签、looksLikeNav）。
 *    站点导航仍由 extractBlocks 的 inNav 在提取阶段排掉 —— 那才是它的正确位置。 */
export function goodListItem(t, opts = {}) {
  const head = !!(opts && opts.head);
  const s = String(t || "").trim();
  if (!s || s.length < LIST_MIN_LEN || s.length > 900) return false;
  if ((s.match(/[A-Za-z]/g) || []).length < LIST_MIN_LETTERS) return false;
  if (LIST_DATE.test(s)) return false;
  const words = s.split(/\s+/).filter(Boolean);
  const hasSep = hasListItemSep(s);
  /* 纯标签：没有句末标点、没有冒号/破折号/箭头充当「条目 → 说明」的分隔，且词数极少。
   * 只对 <li> 生效 —— head 档跳过它。 */
  if (!head && !hasSep && words.length < LIST_MIN_WORDS && !/[.!?]$/.test(s)) return false;
  /* 标题型标签：≤4 词、全大写开头、无分隔符。同样只对 <li> 生效。
   * 2026-09-16 反复：这条一开始对 head 也生效，结果 kb-human30 的两词小标题
   * （`Core Framework` / `Key Dynamics` / `Core Principles` / `Core Thesis`）
   * 全被判成栏目名删掉 —— 而它原本要挡的页脚分享按钮 `Pin It on Pinterest`
   * 恰恰**不受这条约束**（`on` 是小写，`every()` 不成立），早就由 BOILER 的
   * `pin it on pinterest` 接管了。一条既拦不住目标、又误杀正文的规则不该留着。 */
  if (words.length <= 4 && !hasSep && words.every(w => /^[A-Z0-9]/.test(w))) return false;
  if (BOILER.some(re => re.test(s))) return false;
  if (CODE_JUNK.test(s)) return false;
  if (hasAdCode(s)) return false;
  if (isJunkPara(s)) return false;
  if (NAV_HINT.test(s)) return false;
  if (!head && looksLikeNav(s)) return false;
  if ((s.match(/\|/g) || []).length >= 2) return false;
  return true;
}

/** 这一段是不是值得给读者看的正文（逐段判定，与文章体裁无关）
 *  @param {string} t
 *  @param {{list?: boolean, head?: boolean}} [opts] list=true 时按列表项标准判（见 goodListItem 的说明） */
export function goodPara(t, opts = {}) {
  if (opts && opts.list) return goodListItem(t, opts);
  const s = String(t || "").trim();
  /* 2026-09-16 放宽 30 → 15。30 字符约等于英语 5–6 词，把作者刻意断开的强调短句
   * 整段删掉了（`One ingredient is agency.` 24 / `This will be comprehensive.` 27）。
   * 差分实测 13 篇原文：放宽后节点 +15 / −0，逐条审过全是正文。 */
  if (!s || s.length < PARA_MIN) return false;
  const letters = (s.match(/[A-Za-z]/g) || []).length;
  if (s.length < PARA_SHORT) {
    /* 30–70 字符的**短段**：网文的重点句就是这个长度 ——
       `I didn’t want to be an NPC.`（27）、`This is why smart people are incredibly dumb.`（44）、
       `You need to identify a problem.`（31），以及访谈里的提问
       `How did you come up with the idea for Linkflare?`（45）。
       原先 <70 整段丢，等于把作者刻意断开的短句全部删掉，还会让后文出现
       「这道理太有道理了」这种没有指代对象的译文。
       但仍要求它**看起来确实是句子**：以句末标点收尾 + 字母够多；
       `One email a week, no spam, ever. See our Privacy policy.` 这类仍会被下面的 BOILER 挡掉。 */
    if (letters < PARA_SHORT_LETTERS) return false;
    /* 2026-09-16：原先只认句末标点，把**带结构分隔符的小节标题**整条删掉。
     * kb-human30 实测死在闸下 146 条：`1. Rivalrous Dynamics` / `Mind 1.0:` /
     * `The Phase System - How transitions happen within each level:` /
     * `Core Principles` —— 都是作者用 <p> 写的编号小节标题与引导行。
     * 它们确实没有句末标点（标题本来就没有），但**有分隔符**（编号 / 冒号 / 长破折号），
     * 这与「一坨没标点的导航词」形态不同。所以放行 hasListItemSep 的那一类，
     * 分隔符判定与列表档共用同一份（别抄第二个）。 */
    if (!/[.!?…]["'”’)]?$/.test(s) && !hasListItemSep(s)) return false;
  } else if (letters < PARA_LONG_LETTERS) {
    return false;
  }
  if (BOILER.some(re => re.test(s))) return false;
  if (CODE_JUNK.test(s)) return false;
  if (hasAdCode(s)) return false;
  if (isJunkPara(s)) return false;
  if (NAV_HINT.test(s)) return false;
  if (looksLikeNav(s)) return false;
  if (looksTruncatedTeaser(s)) return false;
  if ((s.match(/\|/g) || []).length >= 2) return false;
  /* 大写开头的短串：`Get Sky Sports` 这类导航。2026-09-16 补 `!hasSep` ——
   * kb-human30 实测有 94 条正文引导行死在这条下（`Life exhibits a fundamental pattern:` /
   * `This pattern appears at every scale:` / `Examples of Anti-Rivalrous Systems:`），
   * 它们以大写开头、短、没有句末标点（引号后接列表，标点在下一行），形态恰好撞上。
   * 加上「无分隔符」这个必要条件后，带冒号的引导行放行，纯导航短串仍被挡。 */
  if (!hasListItemSep(s) && /^[A-Z][^.!?]{0,40}$/.test(s)) return false;
  return true;
}

/** 归因：null = 通过；否则返回人可读的拒绝原因。
 *
 *  **存在理由**：诊断脚本一度自己抄了一份判定条件与阈值。2026-09-16 改阈值后，
 *  那张归因表整片错位 —— 把「纯标签闸」报成「长度闸 (<22)」，而诊断表的全部价值
 *  就在归因上。所以判定与归因必须同源：改规则时改这一处 + `goodPara`，别写第三份。
 *
 *  与 `goodPara`/`goodListItem` 的判定顺序严格一致，`BOILER` / `CODE_JUNK` 各自
 *  回带命中的那条正则 —— 「特征闸」不再是一句废话。 */
export function explainReject(t, opts = {}) {
  const s = String(t || "").trim();
  const list = !!(opts && opts.list);
  const head = !!(opts && opts.head);
  const letters = (s.match(/[A-Za-z]/g) || []).length;
  const words = s.split(/\s+/).filter(Boolean);
  const hasSep = hasListItemSep(s);
  if (!s) return "空";
  if (list) {
    if (s.length < LIST_MIN_LEN) return `li 长度闸 (<${LIST_MIN_LEN}，实际 ${s.length})`;
    if (s.length > 900) return "li 超长闸 (>900)";
    if (letters < LIST_MIN_LETTERS) return `li 字母闸 (<${LIST_MIN_LETTERS}，实际 ${letters})`;
    if (LIST_DATE.test(s)) return "li 日期型标签";
    if (!head && !hasSep && words.length < LIST_MIN_WORDS && !/[.!?]$/.test(s)) return `li 纯标签闸 (无分隔符 且 <${LIST_MIN_WORDS} 词 且无句末标点)`;
    if (words.length <= 4 && !hasSep && words.every(w => /^[A-Z0-9]/.test(w))) return "li 标题型标签 (≤4 词、全大写开头)";
  } else {
    if (s.length < PARA_MIN) return `段长度闸 (<${PARA_MIN}，实际 ${s.length})`;
    if (s.length < PARA_SHORT) {
      if (letters < PARA_SHORT_LETTERS) return `短段字母闸 (<${PARA_SHORT_LETTERS}，实际 ${letters})`;
      if (!/[.!?…]["'”’)]?$/.test(s) && !hasSep) return "短段标点闸 (短段且无句末标点且无分隔符)";
    } else if (letters < PARA_LONG_LETTERS) {
      return `段字母闸 (≥${PARA_SHORT} 且字母<${PARA_LONG_LETTERS}，实际 ${letters})`;
    }
  }
  const b = BOILER.find(re => re.test(s)); if (b) return `BOILER /${b.source}/`;
  const c = s.match(CODE_JUNK); if (c) return `CODE_JUNK /${c[0].trim()}/  ← 注意 function\\( 这类子串误伤`;
  if (hasAdCode(s)) return "AD_CODE";
  if (isJunkPara(s)) return "isJunkPara (导航前缀 / 纯链接)";
  if (NAV_HINT.test(s)) return "NAV_HINT";
  if (!head && looksLikeNav(s)) return "looksLikeNav (无句末标点 且 ≥6 词 且大写词>50%)";
  if ((s.match(/\|/g) || []).length >= 2) return "竖线分隔 (≥2)";
  if (!list && looksTruncatedTeaser(s)) return "截断预告 (省略号结尾)";
  if (!list && !hasSep && /^[A-Z][^.!?]{0,40}$/.test(s)) return "大写开头短串 (无分隔符)";
  return null;
}

/* ---------------- 2.6 断句 ----------------
 * 与段落判定配套：只有过了 goodPara 的段落才轮到断句，断句再筛掉过短碎片，
 * 于是「入库的句子数」与「清单的词数」出自同一条流水线。 */

/* 句末缩写：句号不是句尾。原先只覆盖了 Mr/Dr/U.S 等少数几个，
   新闻里高频的 Capt. / Sen. / Sgt. / Dec. 会把一句话从中间劈成两段，
   译文也就跟着变成半截话——看起来就像"翻译坏了"。
   **导出**给 lib-people 的原文分句器共用：人物栏目自己写过一份不带缩写表的
   分句器，结果原刊里的 "8 a.m. to 6 p.m." 被劈成 "8 a." / "m." / "to 6 p." /
   "m." 四个碎片（碎片译出来还是英文，被 qc 的 F4 抓了个正着）。同一把尺子只有一份。
   2026-09-16 补 `i` 标志：原正则只写 `/g`，于是**只有小写形态被保护** ——
   `i.e.` 不切分而 `I.e.` 被切成 4 字符残片，连带后面的整段说明也被拆散
   （dankoe 一篇里 `I.e. <说明>` 出现 9 次，每次都被切成残片 + 半句）。
   `e.g.` / `E.g.` 同理。大小写不该改变「这是不是缩写」的判断。
   **同时移除 `No|Nos`**：加了 `i` 之后 `no.` 也开始被保护，而它是极常见的句末词 ——
   实测代价（Anne Hathaway 篇）：`“I remember that first day, being like, Oh no.` 与
   `Because she's like a doll, you know?` 被粘成一句；`Her mother said no. “And I said, Why?`
   同理。全样本差分（24 份原文）显示 `/gi` 相对 `/g` 的净效果：**修好 9 条、粘坏 2 条，
   全部来自 `I.e.` 这一项，其余项零差异** —— 所以只摘掉 `No|Nos`（`No. 5` 这种编号
   被切开只是多一个 3 字符片段，代价远小于粘句）。将来若发现别的项也误伤，
   同样按「全样本差分 + 逐条定性」移除，不要凭印象猜。 */
export const ABBR = /\b(Mr|Mrs|Ms|Messrs|Dr|Drs|Prof|Sr|Jr|St|vs|etc|Co|Inc|Ltd|Corp|Bros|Assoc|Univ|Dept|Govt|Est|Vol|Fig|approx|Ave|Blvd|Rd|Capt|Cpl|Sgt|Lt|Col|Gen|Adm|Maj|Cmdr|Pvt|Sen|Rep|Gov|Rev|Hon|Gen|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sept|Oct|Nov|Dec|Mon|Tue|Wed|Thu|Fri|Sat|Sun|U\.S|U\.K|a\.m|p\.m|e\.g|i\.e)\./gi;

export function splitSentences(paras) {
  const out = [];
  for (const p of paras) {
    const guarded = p.replace(ABBR, m => m.replace(/\./g, "·"));
    const raw = guarded.split(/(?<=[.!?…])\s+/).map(s => s.trim()).filter(Boolean);
    let parts = raw
      /* 广告脚本/导航碎片不送翻译：省额度，也避免它们被译成中文混进正文 */
      /* 2026-09-16 放宽 30 → 12。**这是最狠也最没道理的一刀**：段落已经过 goodPara
       * 判过「这是不是正文」，这里又按字符数把段内的句子切一遍 —— 同一件事判两次，
       * 第二次没有上下文。Dan Koe 那篇被切掉 53 句，包括一整串自我提问
       * （`Where do you wake up?` / `What have you missed?` / `Who gave up on you?`）——
       * 一篇讲「一天改变人生」的实操文，练习的提问一句不剩。
       * 12 是下限而非 0：`I.e.` 这类残片仍要挡掉，译出来是噪音。 */
      .filter(s => s.length > SENT_MIN && /[A-Za-z]/.test(s) && !hasAdCode(s) && !isJunkPara(s))
      /* 引文出处（`– Alfred Adler` / `– Naval Ravikant`）不是句子。放宽到 12 之后
       * 它们正好够长会混进来，单独挡掉；40 字符以上放行，免得误杀以破折号起头的正文。 */
      .filter(s => !/^[–—-]\s*\S/.test(s) || s.length > 40);
    /* 兜底（2026-09-16）：**整段切完不能一句不剩**。
     * 上面那道闸的职责是「筛句内残片」，但它没有段落上下文 —— 一旦一段由纯短句组成
     * （排比、清单式），它就把整段连同段落一起删了，等于把自己从「筛句子」升级成
     * 「筛段落」。实测代价：Dan Koe 那篇的
     * `<em>Go to school. Get the job. Get offended. Play victim. Retire at 65.</em>`
     * （67 字符 / 5 个短句）整段蒸发 —— 那是正文里最有力的一句排比，读者看到的是它凭空消失。
     * 兜底时仍过 `/[A-Za-z]/` 与 isJunkPara/hasAdCode（只放弃长度闸），
     * 且原段要 ≥ SENT_FLOOR(40) 字符：`I.e.` 之类残片段不足 40，照旧丢掉。 */
    if (!parts.length && p.trim().length >= SENT_FLOOR) {
      parts = raw.filter(s => /[A-Za-z]/.test(s) && !hasAdCode(s) && !isJunkPara(s));
    }
    parts = parts.map(s => s.replace(/·/g, "."));
    for (const s of parts) {
      if (s.length <= 420) { out.push(s); continue; }
      const chunks = s.split(/(?<=[,;:])\s+/);
      let buf = "";
      for (const c of chunks) {
        if ((buf + " " + c).trim().length > 400) { out.push(buf.trim()); buf = c; }
        else buf = (buf + " " + c).trim();
      }
      if (buf.trim().length > 30) out.push(buf.trim());
    }
  }
  return out;
}

export const wordCount = s => (s.match(/[A-Za-z'’-]+/g) || []).length;

/* ---------------- 3. 机器翻译残留 ---------------- */

/* 有道的批量接口会把原文里的变音字符（é č ć …）保护成 <s:N>…<e:N>，
   个别情况下保护标记没被还原就落进了译文。这里用英文原句把字符找回来。 */
const PLACEHOLDER_TEST = /<\/?[se]:\d+>/;
const PLACEHOLDER_FIND = /<\/?[se]:\d+>/;   // 非全局：每次从头找，index 才可靠

/* 带变音符的字母：拉丁扩展 A/B、组合附加符号（é 可能是 e+U+0301 的分解写法）、拉丁扩展附加 */
const ACCENT = "\\u00C0-\\u024F\\u0300-\\u036F\\u1E00-\\u1EFF";
const ACCENTED_WORD = new RegExp(`[A-Za-z${ACCENT}'’-]*[${ACCENT}][A-Za-z${ACCENT}'’-]*`, "g");

/**
 * 还原译文里残留的翻译占位符。
 * 策略：占位符前面通常正好是被保护词的拉丁词干（cl<s:1> / guilloch<s:1> / kova<e:1>），
 * 拿词干去英文原句里找同前缀的带变音符词，整词替换回去；找不到就静默删除——
 * 宁可少一个字符，也绝不把 <e:1> 这种令牌留在页面上。
 * @param {string} cn 译文
 * @param {string} en 对应英文原句
 */
export function repairPlaceholders(cn, en = "") {
  const src = String(cn || "");
  if (!PLACEHOLDER_TEST.test(src)) return src;

  const candidates = [...String(en || "").matchAll(ACCENTED_WORD)].map(m => m[0]);
  let out = "";
  let rest = src;

  for (let guard = 0; guard < 64; guard++) {
    const m = PLACEHOLDER_FIND.exec(rest);
    if (!m) { out += rest; break; }
    const head = rest.slice(0, m.index);
    const frag = (head.match(/[A-Za-z\u00C0-\u024F'’\-]+$/) || [""])[0];
    const word = frag
      ? candidates.find(w => w.length > frag.length && w.toLowerCase().startsWith(frag.toLowerCase()))
      : null;

    out += word ? head.slice(0, head.length - frag.length) + word : head;
    rest = rest.slice(m.index + m[0].length);
  }
  return out;
}

/* 人工校对表：机器翻译的高频硬伤。
   与 ingest.mjs 的 CN_POST 同一性质——只修已知的错译，不做语义改写。 */
const CN_FIXES = [
  /* 塞尔维亚导演 Filip Kovačević：有道把外文名拆错，直译成「科瓦伊·埃维奇」 */
  [/（\s*Filip\s+Kovačević\s+eviki\s*）/g, "（Filip Kovačević）"],
  [/科瓦伊·埃维奇/g, "科瓦切维奇"],
  /* 品牌名逐字直译 */
  [/\bclé de Peau beauté\b/gi, "Clé de Peau Beauté"],
  [/\bClé de Peau beauté\b/g, "Clé de Peau Beauté"],
];

export const applyFixes = s => CN_FIXES.reduce((t, [re, to]) => t.replace(re, to), String(s || ""));

/* ---------------- 3.5 标题译文 ---------------- */

/* 标题里专名（Fetterman / Arsenal / Netflix）密度很高，机器翻译常把英文
   直接贴在汉字上（"Arteta解释了Odegaard的新角色"），读起来是糊的。这里在
   拉丁字母与汉字之间补一个空格——中文排版里「汉字与西文之间留 1/4 空格」的
   通行做法，不改动任何字词。只处理字母，不碰数字（"第29届""打进6个球"
   在中文里本来就不空）。 */
const CJK_RANGE = "\\u4e00-\\u9fff\\u3400-\\u4dbf";

export const spaceCJK = s => String(s || "")
  .replace(new RegExp(`([${CJK_RANGE}])([A-Za-z])`, "g"), "$1 $2")
  .replace(new RegExp(`([A-Za-z])([${CJK_RANGE}])`, "g"), "$1 $2");

const TITLE_PLACEHOLDER = /<\/?[se]:\d+>/g;

/**
 * 清洗一条标题译文。返回空串表示这条不能用（没译出来 / 原样退回英文）。
 * @param {string} cn 机器译文
 * @param {string} en 英文原标题，用来兜底比对
 */
export function cleanTitleZh(cn, en = "") {
  let t = cleanInvisible(String(cn == null ? "" : cn)).replace(TITLE_PLACEHOLDER, "");
  t = tidySpace(t.replace(/\s*\n+\s*/g, " "));
  t = t.replace(/^[\s"'“”‘’]+|[\s"'“”‘’]+$/g, "");
  t = t.replace(/[。．]+$/, "");                 // 标题不用句末句号，与英文标题风格一致
  t = t.replace(/\s*[，、]\s*/g, "，");           // 全角标点不留空格
  t = spaceCJK(t);
  if (!/[\u4e00-\u9fff]/.test(t)) return "";      // 没有汉字 = 没翻出来
  if (t === String(en || "").trim()) return "";
  return t;
}

/**
 * 把 titleZh 插到 title 之后，返回新对象——保证三份数据文件里字段顺序一致。
 * 注意：已译过的文章本来就有 titleZh 键，必须跳过它，否则会拿旧值覆盖新译文。
 */
export function putTitleZh(art, zh) {
  const out = {};
  for (const k of Object.keys(art)) {
    if (k === "titleZh") continue;
    out[k] = art[k];
    if (k === "title") out.titleZh = zh;
  }
  if (!("titleZh" in out)) out.titleZh = zh;      // 极端情况：没有 title 字段
  return out;
}

/* ---------------- 4. 译文留白 ---------------- */

/* 机器翻译会在全角标点旁边留下半角空格（"他说： “……”、“…… ，然后”），
   中文里读起来很别扭。这里只收拾标点两侧的空格，不动中英之间的间隔，
   也不碰引号相邻的情况（"…" "…" 之间的空格留着更好读）。 */
const SPACE_FIXES = [
  [/([，。、；：？！）】》〉…”])[ \t]+/g, "$1"],
  [/[ \t]+([）”）])/g, "$1"],
  [/\s{2,}/g, " "],
];

export const tidySpace = s => SPACE_FIXES.reduce((t, [re, to]) => t.replace(re, to), String(s || "")).trim();

/* ---------------- 组合接口 ---------------- */

/** 清洗一个 { en, cn } 段落；返回 null 表示这一段应当整段丢弃 */
export function cleanPara(p) {
  if (!p || typeof p !== "object") return null;
  if (p.img) return p;                                   // 内嵌配图段原样保留

  /* 新抓取文章按真实段落分组：一个文字块里可以有多句。递归复用同一套
     清洗规则，保留块结构；旧数据的 { en, cn } 仍走下面的兼容路径。 */
  if (Array.isArray(p.sentences)) {
    const sentences = p.sentences.map(cleanPara).filter(Boolean);
    return sentences.length ? { sentences } : null;
  }

  const enRaw = cleanInvisible(p.en || "");
  const cnRaw = cleanInvisible(p.cn || "");

  /* 英文正文是真实报道原文，只允许删掉混进来的脚本和不可见字符，不做任何改写 */
  const en = stripInlineJunk(enRaw).trim();

  let cn = repairPlaceholders(cnRaw, enRaw);
  cn = applyFixes(tidySpace(stripInlineJunk(cn))).normalize("NFC");

  if (!en || !cn) return null;                            // 没译出来就不给空对照
  /* 供应商偶尔会把原文原样返回（或只回一串英文专名）。这种结果有内容，
     但对中文阅读没有帮助；混合中英术语仍允许，只拦明显的整句回显。 */
  const cjk = (cn.match(/[\u3400-\u9fff]/g) || []).length;
  const latin = (cn.match(/[A-Za-z]/g) || []).length;
  if (!cjk || (latin > 40 && latin > cjk * 2)) return null;
  if (isJunkPara(en) || isJunkPara(cn)) return null;
  /* 广告脚本被截断后只剩残句的，整段丢掉；正常短句（"So, what changed?"）保留 */
  if (hasAdCode(enRaw) && en.length < 25) return null;
  if (hasAdCode(cnRaw) && cn.length < 12) return null;
  return { en, cn };
}

/** 清洗一篇文章的 paras */
export function cleanParas(paras) {
  const out = [];
  for (const p of paras || []) {
    const c = cleanPara(p);
    if (c) out.push(c);
  }
  return mergeSplitSentences(out);
}

/* ---------------- 4.5 粘回被缩写句号劈开的句子 ---------------- */

/* 断句时把 "said Republican Rep." 的句号当成句尾，一句话被劈成两段：
   前一段是半截话，译文也跟着只剩半截——读者看到的就是"翻译坏了"。
   这里把这类被劈开的段落重新粘回去（两段都是原文，只做拼接，不改写）。 */
const SPLIT_TAIL = /\b(Mr|Mrs|Ms|Dr|Prof|Sr|Jr|St|No|vs|etc|Co|Inc|Ltd|Corp|Bros|Assoc|Univ|Dept|Est|Vol|Fig|approx|Ave|Blvd|Rd|Capt|Cpl|Sgt|Lt|Col|Gen|Adm|Maj|Cmdr|Pvt|Sen|Rep|Gov|Rev|Hon|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sept|Oct|Nov|Dec|U\.S|U\.K)\.$/;

export function mergeSplitSentences(paras) {
  const out = [];
  let lastSentence = null;
  for (const p of paras || []) {
    if (!p || typeof p !== "object") continue;
    if (p.img) {
      out.push(p);
      lastSentence = null;
      continue;
    }

    const nested = Array.isArray(p.sentences);
    const sentences = (nested ? p.sentences : [p]).filter(Boolean);
    if (!sentences.length) continue;
    const kept = [];
    for (const sentence of sentences) {
      if (lastSentence && SPLIT_TAIL.test(lastSentence.en || "")) {
        lastSentence.en = lastSentence.en + " " + sentence.en;
        /* 半截句的译文中如果还带着句号，换成逗号再往下接 */
        lastSentence.cn = lastSentence.cn.replace(/[。．.]+$/, "，") + sentence.cn;
      } else {
        kept.push(sentence);
        lastSentence = sentence;
      }
    }
    if (kept.length) out.push(nested ? { sentences: kept } : kept[0]);
  }
  return out;
}

/* ---------------- 5. 数据文件读写 ---------------- */

/** 把文件拆成「头部 + 数组字面量 + 尾部」，数组字面量按括号配平切出（跳字符串内部）。
 *  这样 data.js 里 ARTICLES 后面还有别的声明也不会被误伤。 */
export function splitDecl(src, name) {
  const m = src.match(new RegExp(`const\\s+${name}\\s*=\\s*`));
  if (!m) return null;
  const head = src.slice(0, m.index + m[0].length);
  const rest = src.slice(m.index + m[0].length);
  const start = rest.indexOf("[");
  if (start < 0) return null;

  let depth = 0, inStr = false, esc = false, end = -1;
  for (let i = start; i < rest.length; i++) {
    const ch = rest[i];
    if (inStr) {
      if (esc) esc = false;
      else if (ch === "\\") esc = true;
      else if (ch === '"') inStr = false;
      continue;
    }
    if (ch === '"') inStr = true;
    else if (ch === "[") depth++;
    else if (ch === "]") { depth--; if (!depth) { end = i; break; } }
  }
  if (end < 0) return null;
  return { head, body: rest.slice(start, end + 1), tail: rest.slice(end + 1) };
}

/** 读取某个数据文件里的数组声明 */
export function readDecl(file, name) {
  const src = fs.readFileSync(file, "utf8");
  const parts = splitDecl(src, name);
  if (!parts) return null;
  return { src, parts, value: JSON.parse(parts.body) };
}

/** 写回数组（保持文件其余部分逐字节不变），无变化时返回 false */
export function writeDecl(file, name, value) {
  if (name === "ARTICLES_EXTRA" || name === "ARTICLES_ARCHIVE") restoreReviewedTranslations(value);
  const src = fs.readFileSync(file, "utf8");
  const parts = splitDecl(src, name);
  if (!parts) return false;
  const next = parts.head + JSON.stringify(value, null, 2) + parts.tail;
  if (next === src) return false;
  fs.writeFileSync(file, next);
  return true;
}

/** 把「注入篇目」并进现有数组：同 id **原位替换**（位置不动），新篇追加尾部，
 *  其余元素按原顺序原内容保留。football.mjs 与 james-clear.mjs 的 --inject 共用这一份，
 *  语义回归见 tools/football-test.mjs（2026-09-25 修复单篇注入挤掉旧稿的缺口时定稿）。 */
export function mergeInject(arr, injected) {
  const byId = new Map(injected.map(a => [String(a.id), a]));
  const next = arr.map(a => (byId.has(String(a.id)) ? byId.get(String(a.id)) : a));
  const existing = new Set(arr.map(a => String(a.id)));
  for (const a of injected) if (!existing.has(String(a.id))) next.push(a);
  return next;
}

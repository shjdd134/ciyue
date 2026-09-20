#!/usr/bin/env node
/* 词阅 WordLens —— 真文章抓取流水线 v2
 *
 * 流程：公开 RSS 抓取 → 提取正文段落与内嵌图 → 时效+难度筛选 → 逐句机器翻译 → 下载并压缩配图
 *      → 生成 assets/data-articles-extra.js
 *
 * 原则：
 *   - 英文正文 100% 来自真实报道原文，不做任何改写或虚构（与项目"拒绝 AI 写文"一致）
 *   - 中文为逐句机翻：Qwen-MT 优先，DeepL 补齐失败项（2026-09-17 对调，见 lib-mt.mjs 头注）；不完整文章留待重试
 *   - 只收近 N 天的文章，每篇保留 url 外链与来源，可追溯
 *   - 配图来自原报道自己的图床（RSS enclosure / og:image / 正文 figure），本地留档
 *
 * 用法：
 *   node tools/ingest.mjs                    抓取并翻译，默认 12 篇，每源最多 4 篇
 *   node tools/ingest.mjs --limit 20 --per 6 抓更多
 *   node tools/ingest.mjs --replace --limit 16    清空旧文章后重建（先 dry 预览）
 *   node tools/ingest.mjs --append            追加一批（保留此前抓到的文章，不清空）
 *   node tools/ingest.mjs --days 14          只要近 14 天的文章
 *   node tools/ingest.mjs --dry              只抓取+提取+筛选，不翻译，打印摘要
 *   node tools/ingest.mjs --candidate 12    每个源最多富化多少个候选（默认 12）
 *   node tools/ingest.mjs --backfill         为已有文章补抓封面图（写 assets/data-covers.js）
 *   node tools/ingest.mjs --repair-images    只修复已抓文章的封面与正文图，不重跑翻译
 *   node tools/ingest.mjs --repair-images --repair-cats 成长  只修复指定栏目
 *   node tools/ingest.mjs --no-filter        放宽难度筛选
 *
 * 历史通道（明星栏目经典图集，非 RSS）：
 *   node tools/ingest.mjs --classics                   扫近 8 个月 Vogue 图集并入库
 *   node tools/ingest.mjs --classics --dry             只看计划，不写任何文件
 *   node tools/ingest.mjs --classics --classic-limit 5 本次最多入库 5 篇
 *   node tools/ingest.mjs --classics --imgs 20         每篇最多保留 20 张图（默认 16）
 *   node tools/ingest.mjs --classics --months 14       扫更久（每片约 1 个月）
 *   node tools/ingest.mjs --classics --refresh         忽略实测缓存，重抓页面
 *   入库的文章带 pin:true（豁免 30 天过期与栏目配额）与 cap 图注；先跑 --dry 看计划。
 *
 * 翻译结果缓存在 tools/.mt-cache.json，重复运行不会重复请求。
 */

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import vm from "node:vm";
import {
  cleanInvisible, cleanPara, cleanTitleZh, explainReject, goodPara, putTitleZh, readDecl, splitSentences, tidySpace, wordCount,
} from "./lib-text.mjs";
import { translateTexts } from "./lib-mt.mjs";
import { applyGlossary } from "./lib-glossary.mjs";
/* 对账字段重算（sourceTextWords / sourceParagraphs）—— 与 _dedup-sentences.mjs 等
 * 维护脚本共用同一份口径。原先这段逻辑只写在本文件里，但动正文的不止 ingest，
 * 各写一份必然漂成两把尺子（2026-09-17 抽出）。 */
import { syncPeopleSourceFields } from "./lib-article-fields.mjs";
/* 历史通道（明星栏目经典专题）的发现与提取口径 —— 与 fetch-classics.mjs 同一份实现。
 * 「数 <figure> 而非 <img>」「老模板图 URL 无扩展名」「不能只取第一个 srcset」
 * 「跨站去重不能靠图注文本或图片 id」四个坑的说明都在那个文件里。 */
import {
  buildPool, classicPara, classicRead, fetchText as classicsFetch, imgKey, scanClassics,
} from "./lib-classics.mjs";
import {
  QUALITY_CANDIDATE_THRESHOLD, SCORE_VERSION, STAR_MIN_IMAGES, classifySourceHealth, difficultyBaseScore,
  emptySourceHealth, meetsImageGate, qualityScore, serverScore, updateSourceHealth, unreadableReason,
} from "./recommend.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_FILE = path.join(ROOT, "assets", "data-articles-extra.js");
const COVER_MAP_FILE = path.join(ROOT, "assets", "data-covers.js");
const SOURCE_HEALTH_FILE = path.join(ROOT, "assets", "data-source-health.js");
const COVERS_DIR = path.join(ROOT, "assets", "covers");
const DATA_FILE = path.join(ROOT, "assets", "data.js");

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

const argv = process.argv.slice(2);
const has = n => argv.includes(`--${n}`);
const val = (n, d) => { const i = argv.indexOf(`--${n}`); return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[i + 1] : d; };

const DRY = has("dry");
const BACKFILL = has("backfill");
const REPAIR = has("repair-images");
const CLASSICS = has("classics");
if (CLASSICS) {
  console.error("明星栏目已于 2026-09-15 移除，经典图集采集入口已停用。");
  process.exit(2);
}
const REPAIR_CATS = new Set(String(val("repair-cats", "")).split(",").map(s => s.trim()).filter(Boolean));
/* 诊断入口：把本地 HTML 按**当前**提取器抽成 blocks 打印出来。
   重建已发布文章（补回漏掉的正文）必须用真正的 extractBlocks，而不是在别处抄一份 ——
   抄的那份一漂，「线上为什么少了这句」就再也查不清。
   用法：node tools/ingest.mjs --dump-blocks .tmp/orig/kb-human30.html [--loose] */
const DUMP_BLOCKS = val("dump-blocks", "");
/* 候选节点诊断：输出**过闸前**的每个节点 + 被拒原因（同源 explainReject）。
   与 --dump-blocks 的差别是「能看到闸拦掉了什么」，这是 661 行缺口归因的关键。
   用法：node tools/ingest.mjs --dump-nodes .tmp/orig/kb-human30.html [--loose] */
const DUMP_NODES = val("dump-nodes", "");
/* 补回被提取器漏掉的正文（只增不改，见 refillMissing 的说明） */
const REFILL = has("refill");
/* 下架：按 id 剔除已入库的文章（编辑层决定，不靠时效/配额自然淘汰）。
   用途见 DROP_LIST 的注释。用法：node tools/ingest.mjs --prune [--dry] */
const PRUNE = has("prune");
const NO_FILTER = has("no-filter");
const VERBOSE = has("verbose");
const APPEND = has("append");
const REPLACE = has("replace");
const LIMIT = +val("limit", 99);
const PER_FEED = +val("per", 4);
const MAX_AGE_DAYS = +val("days", 21);
const MAX_SENTS = +val("sents", 24);
const MAX_WORDS = +val("words", 540);
const CANDIDATE_LIMIT = Math.max(1, +val("candidate", 12));
const SOURCE_DIVERSITY_CAP = 2;              // 同一来源每批最多入选 2 篇
const MAX_INLINE_IMG = 4;   /* 图文并茂：各栏目默认正文内嵌图上限（明星历史通道曾放宽到 6，该通道已停用） */

/* 历史通道（--classics）专属参数 */
const CL_MONTHS = Math.max(1, +val("months", 8));
const CL_SITE = String(val("site", "all")).toLowerCase();
const CL_IMGS = Math.max(1, +val("imgs", 16));       /* 明星图集上限：用户定的「理想 8—16 张」 */
const CL_MIN_EARLY = Math.max(0, +val("min-early", 10));
/* 文字门槛两条线，必须与 buildPool 的默认值一致（见 lib-classics.mjs 的 buildPool 注释）：
   正文 ≥min-words 词 且 正文+图注 ≥min-read 词。单看正文会把图集类内容全挡在门外。 */
const CL_MIN_WORDS = Math.max(0, +val("min-words", 80));
const CL_MIN_READ = Math.max(0, +val("min-read", 300));
const CL_LIMIT = Math.max(0, +val("classic-limit", 0));   // 本次最多入库几篇（0 = 不限）
const CL_REFRESH = has("refresh");
const CL_CACHE = path.join(ROOT, "tools", "_spot", "classics-measure.json");
/* Vogue 美版 / 英版各是一个「来源」，与 FEEDS 里的源同名同形，好让来源健康度与
   source 字段复用同一套。tier 3 = 一线大刊。 */
const CLASSIC_FEEDS = {
  us: { cat: "明星", name: "Vogue US" },
  uk: { cat: "明星", name: "British Vogue" },
};

/* 按类别配额，例如 --quota 足球=6,历史=4,时政=4,杂志=3 */
const QUOTA = (() => {
  const raw = val("quota", "");
  const o = {};
  String(raw).split(",").forEach(p => {
    const [k, v] = p.split("=");
    if (k && v && !isNaN(+v)) o[k.trim()] = +v;
  });
  return o;
})();

/* 公开 RSS 源：按项目分类映射（均为实测可直连、且自带配图的源；max = 单源最多取几篇）
 * 可选字段：days = 该源独立时效窗（常青内容不受全局 --days 限制）
 *           sents / words = 该源长度上限（默认 MAX_SENTS / MAX_WORDS），full = 整篇不截断
 *           inline = 正文内嵌图上限（默认 MAX_INLINE_IMG）
 *           looseImg = 裸 <img> 也算配图（Squarespace 类站点图片不包 <figure>，默认只认 figure） */
const FEEDS = [
  /* 2026-09-17：足球 RSS 停采（用户决定撤下足球栏目新闻抓取）→ 本数组清空。
   *
   * 为什么停：同一个来源好坏混杂，只能靠事后质检剔，成本高于收益。当日 2 篇足球文实测 ——
   *   · `ft-manchester-united-…`（FourFourTwo）正文 21 段里**前 10 段全是会员/订阅推广模板**
   *     （"Fancy some of this?" / "Your membership journey starts here." /
   *      "Quick quizzes for football fans." / "Explore your membership benefits." …），
   *     只有第 11~21 段是报道。长度/形态闸全部放行，因为那 10 段本身是完整句子。
   *   · `ft-arsenal-…` 是正常转会报道（Rodrygo ACL 伤愈 / January window）。
   * 也就是说「按来源整批判」不成立，得逐篇看正文首段 —— 这类噪声不该由每日流程承担。
   *
   * 停采后的文章入口：只剩 tools/people.mjs（人物 · Icons 原刊全文）一条。
   * 历史：成长 RSS 暂停（存量保留，由 publish.mjs 常青规则保护）；
   *       AI、旧明星及其经典历史通道已停用；足球 RSS 于本日停用。
   * 注意 FEEDS 为空不是错误 —— main() 会在「没有候选」处正常退出，
   * content-scope-test.mjs 有一条断言专门守「这里必须是空的」，防止误加回来。 */
];

/* 裸图提取分类：这些分类的文章页图片不包 <figure>，extractBlocks 需要放开扫 <img> */
const LOOSE_CATS = new Set(FEEDS.filter(f => f.looseImg).map(f => f.cat));
/* 每个分类的抓取配置（repair 等按文章 cat 回查） */
const FEED_BY_CAT = {};
FEEDS.forEach(f => { if (!FEED_BY_CAT[f.cat]) FEED_BY_CAT[f.cat] = f; });

/* 下架名单（编辑层剔除）——只对**已经入库**的文章生效，防止它们被重新采回。
 *
 * 为什么需要一份名单、而不是靠 staticSkipReason：
 *   staticSkipReason 拦的是「还没入库的候选」，对已经躺在 data-articles-extra.js 里的
 *   文章无能为力。而成长/寓言是常青栏目（不受 30 天时效淘汰、配额 60），一旦入库就
 *   永久在线。于是「源页面本身没有正文」的那类页面（播客页、活动页）会一直挂着。
 *
 * 本批存量问题包括 fs.blog 的 Knowledge Project 播客页 —— 正文 17—21 句，
 * 开头是导语、末句是「Farnam Street participates in the Amazon Services LLC
 * Associates Program…」联盟广告声明。既不是文章，也不含可学习内容。
 * 根因（staticSkipReason 的播客正则漏判）已同批修掉，这里是存量清理。
 * 以及足球直播观看指南。名单留空不是错误；新候选还会由
 * recommend.mjs 的 unreadableReason 内容门禁再次拦截。
 *
 * 2026-09-16 移除 gr-how-to-fix-your-entire-life-in-1-day：它只被误诊了一次 ——
 * 当初列入的判据是「无法恢复连续段落」，但原文（letters.thedankoe.com）从来没有不可达，
 * 缺的只是「按原文重分组」这一步。用 _regroup-paras.mjs 接回段落后单句段占比
 * 86.9% → 60.1%（命中率 98%），已恢复正常，留着它反而会挡住一篇好文。
 *
 * 2026-09-16 新增两篇 Ness Labs 的 Tools for Thought 落地页（`*-featured-tool`）：
 * 它们是赞助厂商访谈，正文含真实问答、长度也够，所以躲过了所有长度/形态闸，以「成长」
 * 身份在线。根治规则已加到 staticSkipReason（拦未入库候选），这里是存量清理。
 */
const DROP_LIST = [
  { id: "gr-greg-brockman-inside-the-72-hours-that-almost-", why: "fs.blog 播客页：仅导语 + Amazon 联盟声明" },
  { id: "gr-roblox-ceo-how-to-make-better-decisions-by-fix", why: "fs.blog 播客页：仅导语 + Amazon 联盟声明" },
  { id: "gr-the-mindset-behind-building-a-great-little-bus", why: "fs.blog 播客页：仅导语 + Amazon 联盟声明" },
  { id: "gr-the-mindset-that-unlocks-your-full-potential-d", why: "fs.blog 播客页：仅导语 + Amazon 联盟声明" },
  { id: "gr-proven-better-new-mark-pincus-on-the-rules-of-", why: "fs.blog 播客页：仅导语 + Amazon 联盟声明" },
  { id: "ft-how-to-watch-coventry-city-vs-brighton-for-fre", why: "足球直播/观看指南，不是连续阅读文章" },
  { id: "ft-how-to-watch-arsenal-vs-crystal-palace-for-fre", why: "足球直播/观看指南，不是连续阅读文章" },
  { id: "gr-never-forget-what-matters-with-dr-david-urbans", why: "Ness Labs 厂商访谈落地页：首句 Tools for Thought 模板 + 末 4 段订阅推广" },
  { id: "gr-stop-explaining-yourself-to-your-ai-with-alex-", why: "Ness Labs 厂商访谈落地页：首句 Tools for Thought 模板 + 末 4 段订阅推广" },
];

/* ---------------- 来源健康度 ----------------
 * 健康度是运行状态，不参与文章内容展示。RSS/正文连续失败 3 次时熔断来源，
 * 后续运行仍会探测；连续成功 3 次恢复。图片失败只标记图片降级，不熔断文字来源。
 */
function loadSourceHealth() {
  try {
    const ctx = { console };
    vm.createContext(ctx);
    vm.runInContext(fs.readFileSync(SOURCE_HEALTH_FILE, "utf8"), ctx);
    const data = vm.runInContext("typeof DATA_SOURCE_HEALTH !== 'undefined' ? DATA_SOURCE_HEALTH : {}", ctx);
    return data && typeof data === "object" ? data : {};
  } catch { return {}; }
}

let sourceHealth = loadSourceHealth();
for (const feed of FEEDS) {
  if (!sourceHealth[feed.name]) sourceHealth[feed.name] = emptySourceHealth(feed.rss);
  else sourceHealth[feed.name].url = feed.rss;
}
/* 停采的来源要从健康度里退场（2026-09-17）：loadSourceHealth 会把文件里的历史条目全部读进来，
 * 上面那段只做「FEEDS 有的就补上」的**加法** —— 于是停采的源会永远留在 data-source-health.js 里，
 * 下一个人读文件会以为它们还在采（实测停采后仍有 18 条历史来源）。这里反向剪一次，
 * 维持「健康度条目 == 当前配置的来源」这个不变式。
 * 安全性：应用侧（index.html / app.js / sw.js）**完全不读**这个文件 —— 它只是抓取通道的运行状态，
 * 不参与任何内容展示（见文件头注释与 lib-release 的 SNAPSHOT_FILES 说明）。 */
const liveSources = new Set(FEEDS.map(f => f.name));
for (const name of Object.keys(sourceHealth)) {
  if (!liveSources.has(name)) delete sourceHealth[name];
}

function sourceEntry(feed) {
  if (!feed) return null;
  if (!sourceHealth[feed.name]) sourceHealth[feed.name] = emptySourceHealth(feed.rss);
  return sourceHealth[feed.name];
}

function recordSourceEvent(feed, kind, event) {
  const current = sourceEntry(feed);
  if (!current) return;
  sourceHealth[feed.name] = updateSourceHealth(current, kind, event);
}

function sourceUsable(feed, kind = "all") {
  const health = sourceEntry(feed);
  if (kind === "rss") return !health.rss?.disabled;
  if (kind === "article") return !health.article?.disabled;
  return classifySourceHealth(health);
}

function saveSourceHealth() {
  const body = `/* 词阅 WordLens —— 来源健康度（自动生成，请勿手改）
 * RSS/正文连续失败 3 次熔断，连续成功 3 次恢复；图片失败只做降级记录。
 * 评分版本：${SCORE_VERSION}
 */

const DATA_SOURCE_HEALTH = ${JSON.stringify(sourceHealth, null, 2)};
`;
  fs.writeFileSync(SOURCE_HEALTH_FILE, body);
}

/* 封面渐变池：配图抓不到时的兜底背景，与既有文章视觉一致 */
const GRADIENTS = [
  "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
  "linear-gradient(135deg,#cdd8ff 0%,#4a5fbf 100%)",
  "linear-gradient(135deg,#ffe0b8 0%,#c97e05 100%)",
  "linear-gradient(135deg,#f9d3c6 0%,#c6677e 100%)",
  "linear-gradient(135deg,#d9d2ff 0%,#6c5ce7 100%)",
  "linear-gradient(135deg,#cdeafd 0%,#2b7bb9 100%)",
  "linear-gradient(135deg,#f6c9d8 0%,#a8326a 100%)",
  "linear-gradient(135deg,#e2e6c9 0%,#6f7f2a 100%)"
];

const CAT_ABBR = { 足球: "ft", 时政: "pol", 娱乐: "et", 时尚: "fs", 杂志: "bz", AI: "ai", 寓言: "fab", 明星: "st", 成长: "gr" };

/* ---------------- 工具 ---------------- */

const sleep = ms => new Promise(r => setTimeout(r, ms));

/* 常见命名实体。原先 decode() 只认 &amp; &quot; 这几个，正文里一旦出现
   fianc&eacute;e / Bj&ouml;rk 这类写法就直接把实体当字面量抓了进来。 */
const NAMED_ENTITIES = {
  eacute: "é", egrave: "è", ecirc: "ê", euml: "ë", aacute: "á", agrave: "à", acirc: "â", auml: "ä", aring: "å", atilde: "ã", aelig: "æ",
  ccedil: "ç", iacute: "í", igrave: "ì", icirc: "î", iuml: "ï", ntilde: "ñ",
  oacute: "ó", ograve: "ò", ocirc: "ô", ouml: "ö", otilde: "õ", oslash: "ø",
  uacute: "ú", ugrave: "ù", ucirc: "û", uuml: "ü", yacute: "ý", yuml: "ÿ", szlig: "ß", thorn: "þ", eth: "ð", fnof: "ƒ",
  Eacute: "É", Egrave: "È", Ecirc: "Ê", Euml: "Ë", Aacute: "Á", Agrave: "À", Acirc: "Â", Auml: "Ä", Aring: "Å", Atilde: "Ã", AElig: "Æ",
  Ccedil: "Ç", Iacute: "Í", Igrave: "Ì", Icirc: "Î", Iuml: "Ï", Ntilde: "Ñ",
  Oacute: "Ó", Ograve: "Ò", Ocirc: "Ô", Ouml: "Ö", Otilde: "Õ", Oslash: "Ø",
  Uacute: "Ú", Ugrave: "Ù", Ucirc: "Û", Uuml: "Ü", Yacute: "Ý",
  OElig: "Œ", oelig: "œ", Scaron: "Š", scaron: "š", Yuml: "Ÿ",
  ldquo: "“", rdquo: "”", lsquo: "‘", rsquo: "’", sbquo: "‚", bdquo: "„", hellip: "…", mdash: "—", ndash: "–",
  bull: "•", middot: "·", laquo: "«", raquo: "»", deg: "°", times: "×", divide: "÷",
  copy: "©", reg: "®", trade: "™", pound: "£", euro: "€", yen: "¥", cent: "¢",
  sect: "§", para: "¶", dagger: "†", Dagger: "‡", prime: "′", Prime: "″", minus: "−", frasl: "⁄",
};

function decode(s) {
  return cleanInvisible(String(s)
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/\\\//g, "/")
    .replace(/\\"/g, '"')
    .replace(/\\u([0-9a-f]{4})/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;|&rsquo;|&lsquo;/g, "'")
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&hellip;/g, "…")
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(+d))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&([a-zA-Z][a-zA-Z0-9]{1,7});/g, (m, n) => (n in NAMED_ENTITIES ? NAMED_ENTITIES[n] : m)))
    .normalize("NFC");
}

const stripTags = s => decode(s.replace(/<[^>]+>/g, " "))
  .replace(/\s+/g, " ")
  .replace(/\s+([,.;:!?%])/g, "$1")
  .trim();

async function getDetailed(url, tries = 3, timeout = 25000) {
  /* 部分站点（如 Squarespace 的 moretothat.com）的盾会拦完整 Chrome UA 串回 403，
     403 时降级为短 UA 重试 */
  const UA_SHORT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/126";
  let last = { text: "", ok: false, status: 0, latencyMs: 0 };
  for (let i = 0; i < tries; i++) {
    const started = Date.now();
    try {
      const ctl = AbortSignal.timeout(timeout);
      const h = i === 0 ? { "User-Agent": UA } : { "User-Agent": UA_SHORT };
      const res = await fetch(url, { headers: h, signal: ctl });
      if (res.ok) return { text: await res.text(), ok: true, status: res.status, latencyMs: Date.now() - started };
      last = { text: "", ok: false, status: res.status, latencyMs: Date.now() - started };
      if (res.status === 404) return last;
      if (res.status === 403 && i === 0) continue;
      return last;
    } catch (e) {
      last = { text: "", ok: false, status: 0, latencyMs: Date.now() - started };
    }
    await sleep(600 * (i + 1));
  }
  return last;
}

async function get(url, tries = 3, timeout = 25000) {
  return (await getDetailed(url, tries, timeout)).text;
}

async function getTracked(feed, kind, url, tries = 3, timeout = 25000) {
  const result = await getDetailed(url, tries, timeout);
  recordSourceEvent(feed, kind, {
    ok: result.ok && Boolean(result.text),
    status: result.status,
    latencyMs: result.latencyMs,
  });
  return result.text;
}

/* ---------------- RSS ---------------- */

function rssImage(block) {
  const enc = block.match(/<enclosure[^>]*\burl=["']([^"']+)["'][^>]*>/i);
  if (enc && /\.(jpe?g|png|webp)(\?|$)/i.test(enc[1])) return upgradeImg(decode(enc[1]));
  const mc = block.match(/<media:content[^>]*\burl=["']([^"']+)["'][^>]*>/i);
  if (mc) return upgradeImg(decode(mc[1]));
  const mt = block.match(/<media:thumbnail[^>]*\burl=["']([^"']+)["'][^>]*>/i);
  if (mt) return upgradeImg(decode(mt[1]));
  return "";
}

function parseItems(xml) {
  return [...xml.matchAll(/<item[\s>][\s\S]*?<\/item>/gi)].map(m => m[0]).map(block => {
    const tag = n => {
      const m = block.match(new RegExp(`<${n}[^>]*>([\\s\\S]*?)<\\/${n}>`, "i"));
      return m ? decode(m[1]).trim() : "";
    };
    return {
      title: tag("title"),
      link: (tag("link") || (block.match(/<guid[^>]*>(https?:[^<]+)<\/guid>/i) || [])[1] || "").trim(),
      date: parseRssDate(tag("pubDate") || tag("dc:date") || ""),
      image: rssImage(block),
      /* RSS 里正文带几张图：选文排序的「图文并茂」信号（正文的实际图片数要等拉了页面才知道） */
      nimgs: (block.match(/<img[\s>]/gi) || []).length + (block.match(/<enclosure[\s>]/gi) || []).length,
      desc: stripTags(tag("description") || "")
    };
  }).filter(it => /^https?:\/\//.test(it.link) && it.title);
}

/* RSS 日期：JS 不认 BST/GMT/EDT 这类缩写，先剥掉再解析 */
function parseRssDate(raw) {
  const s = String(raw).trim().replace(/\s+(BST|GMT|UTC|EDT|EST|PDT|PST|CET|CEST)\s*$/i, "");
  const d = new Date(s);
  return isNaN(d) ? "" : d.toISOString().slice(0, 10);
}

function freshEnough(date, maxAge) {
  if (!date) return false;
  const t = Date.parse(`${date}T12:00:00Z`);
  return (Date.now() - t) / 86400000 <= (maxAge || MAX_AGE_DAYS);
}

/* ---------------- 图片 ---------------- */

const IMG_BAD = /\b(logo|sprite|avatar|placeholder|default|icon|badge|1x1|pixel|blank|spacer)\b/i;

/* 从 <img ...> / srcset 里挑分辨率最高的一张 */
function pickImgSrc(tagStr) {
  const srcset = (tagStr.match(/srcset=["']([^"']+)["']/i) || [])[1] || "";
  if (srcset) {
    /* 按「逗号 + 下一个 URL」切分：Condé Nast 的图床把逗号写在 URL 里（w_1600,c_limit），
     * 直接 split(",") 会把一张图劈成两半。 */
    const cands = srcset.split(/,\s*(?=https?:\/\/|\/\/)/).map(s => s.trim().split(/\s+/))
      .map(([u, d]) => ({ u, w: parseInt(String(d || "").replace(/\D/g, ""), 10) || 0 }))
      .filter(x => x.u && !/^data:/.test(x.u));
    if (cands.length) return decode(cands.sort((a, b) => b.w - a.w)[0].u);
  }
  const src = (tagStr.match(/\bsrc=["']([^"']+)["']/i) || [])[1] || "";
  return /^https?:/.test(src) ? decode(src) : "";
}

function ogImage(html) {
  const m = html.match(/<meta[^>]+property=["']og:image["'][^>]*>/i);
  if (!m) return "";
  const u = m[0].match(/content=["']([^"']+)["']/i);
  const url = u ? decode(u[1]) : "";
  if (!url || /facebook-default|npr\.org\/include\/images/i.test(url)) return "";
  return upgradeImg(url);
}

/* 部分图床在 URL 里写死小尺寸缩略图，换成原图再下载。
 * 注意：Smithsonian 的 thumbnailer 带签名，改尺寸会 400——只能还原成尾部那个 S3 原图地址。 */
function upgradeImg(u) {
  if (!u) return u;
  if (/th-thumbnailer\.cdn-si-edu\.com/.test(u)) {
    const m = u.match(/\/filters:[^/]+\/(https?:\/\/.+)$/);
    if (m) return m[1];
    return u;
  }
  /* Hearst 系（ELLE / Harper's Bazaar / Cosmopolitan / Women's Health 等）：?width= 缩略参数 */
  if (/hearstapps\.com|elle\.com|harpersbazaar\.com|cosmopolitan\.com|womenshealthmag\.com|townandcountrymag\.com|instyle\.com|byrdie\.com/i.test(u)) {
    return u.replace(/([?&])width=\d+/i, "$1width=1600").replace(/([?&])quality=\d+/i, "$1quality=85");
  }
  /* Condé Nast 系（Vogue / Allure / Vanity Fair / Glamour）：URL 内嵌 w_数字 尺寸段 */
  if (/assets\.[a-z]+\.com|vogue\.com|allure\.com|vanityfair\.com|glamour\.com/i.test(u)) {
    return u.replace(/\bw_\d+/i, "w_1600");
  }
  return u;
}

/* 图片 URL 的编码口径。**已经编码过的不能再编一次**：
 * Vogue / Condé Nast 的图床 URL 里带 `w_2048%2Cc_limit`，而 encodeURI 会把 `%`
 * 变成 `%25`（`%2C` → `%252C`），图床收到直接回 400。
 * 实测 Diana 那篇 16 张图全部下载失败、只剩封面，就是这一条：
 * 同一串 URL 用 curl 是 200，经 encodeURI 后是 400。
 * 有需要编码的字符（空格等）且没有现成转义时才编。 */
const safeUrl = u => (/%[0-9a-fA-F]{2}/.test(String(u)) ? u : encodeURI(u));

async function downloadImg(url, dest, feed = null) {
  if (!url || IMG_BAD.test(url)) return 0;
  /* 图床与页面同源时共享同一套盾：403 就降级短 UA 再试（如 moretothat.com） */
  const UAS = [UA, "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/126"];
  let lastStatus = 0;
  const started = Date.now();
  for (const ua of UAS) {
    try {
      const res = await fetch(safeUrl(url), { headers: { "User-Agent": ua }, signal: AbortSignal.timeout(30000) });
      lastStatus = res.status;
      if (!res.ok) { if (res.status === 403) continue; break; }
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 4000) break;                    // 太小：占位图或纯色
      fs.writeFileSync(dest, buf);
      recordSourceEvent(feed, "image", { ok: true, status: res.status, latencyMs: Date.now() - started });
      return buf.length;
    } catch { /* 换 UA 重试 */ }
  }
  recordSourceEvent(feed, "image", { ok: false, status: lastStatus, latencyMs: Date.now() - started });
  return 0;
}

const WINDOWS_PY = "C:/Users/sekiro/.workbuddy/binaries/python/envs/default/Scripts/python.exe";
/* 本地可继续使用打包的 Windows Pillow；CI/Linux 使用 PATH 中的 python3。
   之前把 Windows 绝对路径写死在这里，导致 Ubuntu 每次静默跳过压缩。 */
const PY = process.env.WORDLENS_PY
  || (process.platform === "win32" && fs.existsSync(WINDOWS_PY) ? WINDOWS_PY : (process.platform === "win32" ? "python" : "python3"));
function optimizeImages() {
  try {
    execFileSync(PY, [path.join(ROOT, "tools", "img-post.py"), COVERS_DIR], { stdio: "inherit" });
  } catch (e) {
    if (e.code === "ENOENT") console.log(`  （未找到 ${PY}，跳过压缩，保留原图）`);
    else console.log("  （图片压缩失败，保留原图）", e.message);
  }
}

/* ---------------- 正文提取（段落 + 内嵌图，保持原始顺序） ----------------
 * 段落质量判定（`goodPara`）与断句（`splitSentences` / `wordCount`）已搬到
 * `lib-text.mjs` 的 2.5 / 2.6 节 —— 明星栏目的历史通道要在「出清单」阶段就用
 * 同一把尺子预测正文词数，各自的实现会漂（详见那个文件头的说明）。 */

/* 非正文区域的字符区间：导航菜单、订阅弹窗、页脚条幅里的 <li>/<h2> 也是 li/h，
 * 但那是站点外壳，不是文章。只对新增的 li / h2 / h3 生效 —— <p> 那条路径一个字不改。
 *
 * **按标签深度配对**，不用非贪婪截断：`[\s\S]*?</div>` 会在第一个嵌套 </div> 处收尾，
 * 结果只排掉一个空壳，弹窗里的 <h2> 照样进正文（More To That 的 et_bloom 订阅框
 * 「"How do you find your ideas?"」就是这么漏进来的，实测）。
 *
 * 判定两类：语义标签（nav/header/footer/aside）整块排除；其余标签看 class/id 里有没有
 * 结构性记号 —— WordPress 菜单固定的 `menu-item`、Elegant Themes 的 `et_bloom`、
 * GeneratePress 的 `site-footer`、以及 sidebar / widget / related-posts 这一族。 */
const REGION_TAGS = ["nav", "header", "footer", "aside", "div", "section", "ul", "ol", "form", "li"];
const REGION_TOKEN = /(?:^|[\s"'_-])(?:menu-item[a-z-]*|sub-menu|site-navigation|main-navigation|primary-menu|nav-links|post-navigation|et_bloom[a-z_]*|newsletter[a-z_-]*|convertkit[a-z_-]*|ck_form[a-z_]*|mc4wp[a-z_-]*|mailpoet[a-z_-]*|sidebar|widget-area|related-posts|jp-relatedposts|sharedaddy|breadcrumb[a-z_-]*|pagination|table-of-contents|site-footer)(?:[\s"'_-]|$)/i;
const REGION_ATTR = /(?:class|id)\s*=\s*(?:"([^"]*)"|'([^']*)')/gi;

/* 评论区专用（窄集合，不含语义标签、不含 sidebar/widget 一族）。
 *
 * 为什么不能直接拿 REGION_TOKEN 去排 `<p>`：2026-09-16 实测，More To That 与 fs.blog
 * 的整页 HTML 里正文容器带着 sidebar / widget 一类的 class，一排下去
 * `illness` 与 `listening` 从 35 块直接变 **0 块**（整篇正文蒸发）。作者的注释
 * 「<p> 那条路径一个字不改」是对的。
 * 而评论区有稳定的 class 记号（Substack：`div.comment-list` → `div.comment-body`），
 * 单独一份窄集合，只排它 —— 这才是那 6 句读者评论混进库的真正入口。 */
const COMMENT_TOKEN = /(?:^|[\s"'_-])(?:post-comments|comments-area|comment-list|comment-body|comment-form|comment-reply|comment-content|comment-meta)(?:[\s"'_-]|$)/i;

/* 划出命中某个 token 的标签区间。semantic=true 时语义标签（nav/header/footer/aside）
 * 整块算非正文 —— 只有 li/h2/h3/h4 那条路径这么用；`<p>` 走 semantic=false 的窄集合。 */
function regionsByToken(html, tokenRe, semantic = true) {
  const out = [];
  const open = new RegExp(`<(${REGION_TAGS.join("|")})\\b([^>]*)>`, "gi");
  const tagRe = new Map();
  let m;
  while ((m = open.exec(html))) {
    const tag = m[1].toLowerCase();
    const attrs = m[2] || "";
    const semanticHit = semantic && (tag === "nav" || tag === "header" || tag === "footer" || tag === "aside");
    const structural = semanticHit || tokenRe.test(
      [...attrs.matchAll(REGION_ATTR)].map(x => x[1] || x[2] || "").join(" ")
    );
    if (!structural) continue;
    if (!tagRe.has(tag)) tagRe.set(tag, new RegExp(`<${tag}\\b[^>]*>|</${tag}\\s*>`, "gi"));
    const tok = tagRe.get(tag);
    tok.lastIndex = m.index;
    let depth = 0, end = -1, t;
    while ((t = tok.exec(html))) {
      if (t[0][1] === "/") { if (--depth === 0) { end = t.index + t[0].length; break; } }
      else depth++;
    }
    if (end > 0) out.push([m.index, end]);
  }
  return out;
}

function junkRegions(html) { return regionsByToken(html, REGION_TOKEN); }
function commentRegions(html) { return regionsByToken(html, COMMENT_TOKEN, false); }

/* 标题归一化：只比「字母数字序列」，忽略大小写、标点、弯引号、破折号差异。
 * 用途是把「页面主标题的 <h1>」与文章 title 字段对上 —— 实测这两者在各站点
 * 是**逐字相同**的（`A Complete Knowledge Base Of HUMAN 3.0` /
 * `HUMAN 3.0 – A Map To Reach The Top 1%` / `Never forget what matters … Linkflare`），
 * 差别只在 HTML 实体与空白，所以归一化后直接相等判定即可，不需要模糊匹配。 */
const normHeading = s => String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

/* 候选节点收集（**只收集，不过闸**）。
 *
 * 2026-09-16 抽出来：`--dump-blocks` 输出的是**已过闸**的块，用它无法回答
 * 「这一行到底是被闸拦了、还是压根没被提取」—— 实测 kb-human30 有 661 行
 * 缺口，dump-blocks 里一条都找不到，于是诊断表把「闸拦的」整片报成
 * 「提取器没提的」，把结论指向错误的修法（改容器 vs 改尺子）。
 * 诊断必须能同时看到「候选」与「过闸」，所以收集与过滤拆开。
 * 需要候选节点一律调这个函数，别再在外面抄一份正则。 */
function collectNodes(html, looseImg = false, pageTitle = "") {
  const pageHead = pageTitle ? normHeading(pageTitle) : "";
  /* 先划出 figure 的字符区间，避免同一段被 <p> 和 <figure> 重复计入 */
  const figs = [...html.matchAll(/<figure\b[^>]*>([\s\S]*?)<\/figure>/gi)]
    .map(m => ({ at: m.index, end: m.index + m[0].length, inner: m[1] }));

  const nodes = figs.map(f => ({ at: f.at, kind: "fig", inner: f.inner }));
  const inFig = i => figs.some(f => i >= f.at && i < f.end);

  /* 评论区要排，但**只能用窄集合**排。
   * 起因：`<p>` 分支原本只查 figure —— Substack 的读者评论（`div.comment-list` →
   * `div.comment-body`）被当正文抓进库，Dan Koe 那篇末尾的 6 句就是别人引用
   * Kapil Gupta 的留言；手工删掉之后下一次 `--refill` 又补回来（refill 只认自己
   * 尺子量出的缺失），成了死循环。
   * 但换成整个 REGION_TOKEN 会把正文排空（`illness` / `listening` 从 35 块变 0 块，
   * 见 COMMENT_TOKEN 的说明），所以用 commentRegions 这个只认评论区 class 的窄集合。 */
  const navs = junkRegions(html);
  const cmts = commentRegions(html);
  const inNav = i => navs.some(([a, b]) => i >= a && i < b);
  const inCmt = i => cmts.some(([a, b]) => i >= a && i < b);

  for (const m of html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)) {
    if (inFig(m.index) || inCmt(m.index)) continue;
    nodes.push({ at: m.index, kind: "p", inner: m[1] });
  }

  /* 列表项与小标题。2026-09-15 语义验收实测：只认 <p> 会让清单式文档整篇丢主体 ——
   * 《HUMAN 3.0》完整知识库原文有 740 个 <li>（中位 29.5 字符）与 78 个 <h2>/<h3>，
   * 1,912 词进不了库，「三层级 / 三阶段」讲了却一条没列。
   * li 会被当成一个独立的文字块（渲染上等于原文档的一行），并走 goodPara 的列表档。
   * h4 一并补进来（与 h2/h3 同档）。2026-09-16 实测：这一条对现有 14 篇**零影响** ——
   * More To That 全文里只有 2 个 h4，内容是 `Resources` 与 `Follow More To That:`，
   * 那是页脚导航，本来就被 goodListItem 的标签型规则挡掉。保留是为了覆盖
   * 未来把正文小标题写成 h4 的站点，代价只是正则多一个分支。 */
  for (const m of html.matchAll(/<(li|h1|h2|h3|h4)\b[^>]*>([\s\S]*?)<\/\1>/gi)) {
    if (inFig(m.index) || inNav(m.index) || inCmt(m.index)) continue;
    const tag = m[1].toLowerCase();
    /* head 标记 <h1>/<h2>/<h3>/<h4>：作者写的结构标题走「标题档」，不看形态闸。
     * 2026-09-16 实测 kb-human30 的 PART I/II 骨架（29 条标题）被判成栏目导航删掉，
     * 详见 goodListItem 的注释。
     * h1 是 2026-09-16 二次实测补的：那份知识库用 <h1> 写部级标题
     * （`PART I: PHILOSOPHICAL & HISTORICAL FOUNDATION` … PART VI 共 6 条 / 28 词）。
     * 但 <h1> 在绝大多数站点是**页面主标题**（`How To Think Like A Genius …`），
     * 收了就会和 title 字段重复、在阅读页正文开头再念一遍标题 —— 所以与
     * pageTitle 相同的那一条直接跳过（正文内的部级 h1 保留）。
     * 归一化只比字母数字序列（见 normHeading），实测四份原文的 h1 与 title 逐字相同。 */
    if (tag === "h1" && pageHead && normHeading(stripTags(m[2])) === pageHead) continue;
    nodes.push({ at: m.index, kind: "item", head: tag !== "li", inner: m[2] });
  }

  /* 引用块。**先纠正一个误判**：Dan Koe 那篇的 6 段 blockquote 内容其实早就进库了 ——
   * `<p>` 正则是全页扫描，引用块内层的 `<p>` 本来就会被抓到（2026-09-16 实测，
   * Naval Ravikant / Alfred Adler / Maxwell Maltz 与「控制论来自 kybernetikos」全部已在块中）。
   * 所以这一条对现有 14 篇是**零影响**的保险，不是缺口修复。
   * 保留的理由：把文本直接放在 `<blockquote>` 里、不套 `<p>` 的站点不少，那种情况下
   * 提取器会整块丢引用。新增分支走**普通档**（引用是完整句子，不是列表条目，
   * 走列表档会被「条目 vs 标签」的规则误判）。
   * 内层有 <p> 就逐个展平：一个 <blockquote> 只产出一个块，会让断句、分栏、译文对齐全错位。 */
  for (const m of html.matchAll(/<blockquote\b[^>]*>([\s\S]*?)<\/blockquote>/gi)) {
    if (inFig(m.index) || inNav(m.index) || inCmt(m.index)) continue;
    const inner = m[1];
    const ps = [...inner.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)];
    if (ps.length) for (const p of ps) nodes.push({ at: m.index + p.index, kind: "p", inner: p[1] });
    else nodes.push({ at: m.index, kind: "p", inner });
  }

  /* Hearst（ELLE/Bazaar 等）不写 <figure>，图裸放在 <div> 里：looseImg 时补扫 figure 外的独立 <img>。
   * 同一节点的处理复用 fig 分支；无 figcaption 时 cap 为空。 */
  if (looseImg) {
    for (const m of html.matchAll(/<img\b[^>]*>/gi)) {
      if (inFig(m.index)) continue;
      const tag = m[0];
      if (/\bsrc=["']data:/i.test(tag)) continue;
      nodes.push({ at: m.index, kind: "fig", inner: tag });
    }
  }

  nodes.sort((a, b) => a.at - b.at);
  return nodes;
}

function extractBlocks(html, looseImg = false, pageTitle = "") {
  const nodes = collectNodes(html, looseImg, pageTitle);

  const seenText = new Set();
  const seenImg = new Set();
  const out = [];
  for (const n of nodes) {
    if (n.kind === "p" || n.kind === "item") {
      const t = stripTags(n.inner);
      const list = n.kind === "item";
      const opts = list ? { list, head: !!n.head } : {};
      if (!goodPara(t, opts)) continue;
      const key = t.slice(0, 60);
      if (seenText.has(key)) continue;
      seenText.add(key);
      out.push({ t: "p", v: t, ...(list ? { item: true } : {}) });
    } else {
      const imgs = [...n.inner.matchAll(/<img\b[^>]*>/gi)].map(x => x[0]);
      if (!imgs.length) continue;
      const cands = imgs.map(pickImgSrc).filter(Boolean).filter(u => !IMG_BAD.test(u)).filter(u => !/\.(svg|gif)(\?|$)/i.test(u)).map(upgradeImg);
      if (!cands.length) continue;
      const src = cands.sort((a, b) => b.length - a.length)[0];
      const base = src.split("?")[0];
      if (seenImg.has(base)) continue;
      seenImg.add(base);
      const cap = stripTags((n.inner.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/i) || [])[1] || "").slice(0, 110);
      out.push({ t: "img", src, cap });
    }
  }
  return out;
}

/* 按句子预算裁剪，同时保序保留内嵌图；明星栏目图多，放宽上限 */
function packBlocks(blocks, maxSents, maxWords, maxImgs = MAX_INLINE_IMG) {
  const keep = [];
  const sents = [];                        // 扁平句子列表，供翻译使用
  let words = 0, imgs = 0;
  for (const b of blocks) {
    if (sents.length >= maxSents || words >= maxWords) break;
    if (b.t === "img") {
      if (imgs < maxImgs) { keep.push(b); imgs++; }
      continue;
    }
    const kept = [];
    for (const s of splitSentences([b.v])) {
      if (sents.length >= maxSents || words >= maxWords) break;
      kept.push(s); sents.push(s); words += wordCount(s);
    }
    if (kept.length) keep.push({ t: "p", sents: kept });
  }
  return { keep, sents, words };
}

/* ---------------- 断句 ----------------
 * `splitSentences` / `wordCount` 见 lib-text.mjs 2.6 节（共享给历史通道的清单阶段）。 */

function difficultyOk(sents) {
  if (NO_FILTER) return true;
  if (sents.length < 6) return false;
  const totalWords = sents.reduce((n, s) => n + wordCount(s), 0);
  if (totalWords < 180) return false;
  const avg = totalWords / sents.length;
  if (avg > 30) return false;
  const longRatio = sents.filter(s => wordCount(s) > 45).length / sents.length;
  return longRatio < 0.15;
}

/* ---------------- 译文后处理 ----------------
 * 旧供应商可能在中文里插入 "（ English ）" 形式的原文并留下多余空格。
 * 这里只做格式清理；涉及老板/主帅、胜者/冠军、人名等事实的修订必须同时
 * 检查英文原句，交给 applyGlossary 的英文条件规则，不能用中文全局替换。 */
const CN_POST = [
  [/（\s*([^（）]{1,70}?)\s*）/g, "（$1）"],
  [/\s{2,}/g, " "],
  [/^\s+|\s+$/g, ""]
];
const postEdit = s => CN_POST.reduce((x, [re, to]) => x.replace(re, to), String(s));

/* ---------------- 翻译（Qwen-MT 优先，DeepL 备选，带版本化缓存） ----------------
 * 引擎与缓存都在 tools/lib-mt.mjs：正文、标题共用同一份 tools/.mt-cache.json，
 * 同一句话不会重复请求。两个引擎都失败的句子保持空串，完整性门槛阻止文章入库。
 */
/* ---------------- 已有数据 ---------------- */

const loadExisting = () => {
  const ctx = {}; vm.createContext(ctx); ctx.window = ctx; ctx.globalThis = ctx;
  try { vm.runInContext(fs.readFileSync(DATA_FILE, "utf8"), ctx); } catch (e) { console.error("读 data.js 失败", e.message); }
  try { vm.runInContext(fs.readFileSync(OUT_FILE, "utf8"), ctx); } catch { /* 首次运行没有 extra 文件 */ }
  try { return vm.runInContext("ARTICLES", ctx); } catch { return []; }
};

const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 46);/* 忽略协议与 query 的图片身份，用于「正文图是否就是封面那张」的判断 */
const urlKey = s => String(s || "").split("?")[0].replace(/^https?:\/\//, "").toLowerCase();
/* 标题末尾常见的站点署名，剥掉后标题更干净 */
const SOURCE_TAIL_RE = new RegExp(
  "\\s*[-–|·]\\s*(Sky Sports|Variety|NPR|Politico|CBS News|ABC News|ELLE|Smithsonian( Magazine)?|Vogue|Harper's Bazaar|Cosmopolitan|Who What Wear|Allure|Vanity Fair|Town & Country|Women's Health|Fashionista|HistoryExtra|Atlas Obscura|The Hollywood Reporter|Hollywood Reporter)\\s*$",
  "i"
);
const stripSourceSuffix = t => t.replace(/\s*[-–|]\s*(Sky Sports|Variety|NPR|Politico|CBS News|ELLE|Smithsonian( Magazine)?)\s*$/i, "").trim();
/* 有些源（如 ELLE）的标题里带 <i>/<em> 等标签，统一清掉 */
const cleanTitle = t => stripTags(stripSourceSuffix(t));

/* 读回上一次生成的 extra 文章（--append 时用于累积，避免新一批覆盖掉旧成果） */
const readPrevExtra = () => {
  try {
    const decl = readDecl(OUT_FILE, "ARTICLES_EXTRA");
    return decl ? decl.value : [];
  } catch { return []; }
};

/* 基础难度需要一份四级词表作初始覆盖率参考。它只影响新文章的 serverScore，
 * 不会改变用户词库，也不参与运行时的已知词判断。 */
function loadVocabulary() {
  const ctx = { console };
  vm.createContext(ctx);
  for (const f of ["data.js", "data-words-bulk-a.js", "data-words-full.js"]) {
    const file = path.join(ROOT, "assets", f);
    if (fs.existsSync(file)) {
      try { vm.runInContext(fs.readFileSync(file, "utf8"), ctx, { filename: f }); } catch { /* 可选词库文件 */ }
    }
  }
  try {
    const words = vm.runInContext("typeof WORDS !== 'undefined' ? WORDS : []", ctx);
    return new Set(words.map(w => String(w.word || "").toLowerCase()).filter(Boolean));
  } catch { return new Set(); }
}

const VOCABULARY = loadVocabulary();

/* ---------------- 候选池评分 ----------------
 * 先把所有源放进同一候选池，再统一富化、评分和取数。这样不会因为 FEEDS
 * 的排列顺序或某个类别先达到配额，就让后面的来源永远没有机会。评分只用
 * 可解释的规则，不引入模型，也不改变英文正文。 */
const SOURCE_TIERS = {
  "Sky Sports": 3, "TechCrunch AI": 3, "Dan Koe": 3, "Farnam Street": 3,
  "Opta Analyst": 3, "Aeon": 3, "Psyche": 3,
  "More To That": 3, "The Guardian": 3, "Vanity Fair": 3, "Rolling Stone": 3,
  /* 历史通道的两个来源（Vogue 美版 / 英版）—— 一线大刊的档案图集 */
  "Vogue US": 3, "British Vogue": 3,
  "FourFourTwo": 2, "AI News": 2, "Ness Labs": 2, "ELLE": 2, "Harper's Bazaar": 2,
};
const TITLE_KEY = s => String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
/* 明星栏目偏好名单：命中标题或摘要时提高排序优先级；不改变图片门槛和正文内容。 */
const STAR_WATCHLIST = [
  /monica\s+bellucci/i,
  /sophie\s+marceau/i,
  /anne\s+hathaway/i,
];

function starWatchBoost(feed, item) {
  if (feed.cat !== "明星") return 0;
  const text = `${item.title || ""} ${item.desc || ""}`;
  return STAR_WATCHLIST.some(re => re.test(text)) ? 8 : 0;
}

/* 翻译时把文章标题、来源和相邻句子一起送给引擎。
 * 单句脱离上下文时最容易把代词、时态和人名关系译错；上下文只作提示，
 * 不会写入正文，因此英文原句仍保持可追溯。 */
function articleContext(feed, item, texts, batch) {
  const around = new Set();
  for (const b of batch || []) {
    const i = Number(b.i);
    /* 句前后各两句通常能覆盖完整主语/指代和比分说明；即使部分句子命中缓存，
       b.i 仍是原文下标，所以不会因非连续批次而错配上下文。 */
    for (const j of [i - 2, i - 1, i, i + 1, i + 2]) {
      if (j >= 0 && j < texts.length && texts[j]) around.add(texts[j]);
    }
  }
  return [
    item?.title ? `Article title: ${item.title}` : "",
    item?.desc ? `Article summary: ${item.desc}` : "",
    feed?.name ? `Source: ${feed.name}` : "",
    [...around].join(" "),
  ].filter(Boolean).join("\n");
}

/* 标题不能与不同文章混批，否则一篇标题的专名会影响另一篇标题。
 * 每次最多送一个标题，并把导语/来源作为消歧上下文；cacheKeyFor 仍按文章隔离。 */
async function translateArticleTitles(articles) {
  const jobs = articles.filter(a => !a.titleZh && a.title);
  if (!jobs.length) return { ok: 0, total: 0 };
  const result = await translateTexts(jobs.map(a => a.title), {
    maxLines: 1,
    maxChars: 900,
    cacheNamespace: "title-context-v2",
    cacheKey: (title, i) => jobs[i]?.url || jobs[i]?.id || title,
    context: batch => {
      const a = jobs[batch[0]?.i];
      return [
        a?.title ? `Article title: ${a.title}` : "",
        a?.desc ? `Article summary: ${a.desc}` : "",
        a?.source ? `Source: ${a.source}` : "",
      ].filter(Boolean).join("\n");
    },
  });
  let ok = 0;
  jobs.forEach((a, i) => {
    const zh = cleanTitleZh(applyGlossary(postEdit(result[i] || ""), a.title, a.id), a.title);
    if (!zh) return;
    const idx = articles.indexOf(a);
    if (idx >= 0) articles[idx] = putTitleZh(a, zh);
    ok++;
  });
  return { ok, total: jobs.length };
}

/* 翻译结果必须逐项存在。之前只按 85% 比例放行，cleanPara 又会静默删掉
 * 空译文，最终读者看到的是缺句的中英对照，且很难追查是哪次接口截断。 */
const translationsComplete = xs => Array.isArray(xs) && xs.length > 0
  && xs.every(x => typeof x === "string" && x.trim().length > 0);

function translationAudit(source, translated) {
  const issues = [];
  if (!Array.isArray(translated) || translated.length !== source.length) {
    issues.push(`句数不一致（原文 ${source.length} / 译文 ${translated?.length || 0}）`);
  }
  source.forEach((en, i) => {
    const cn = String(translated?.[i] || "").trim();
    if (!cn) issues.push(`第 ${i + 1} 句为空`);
    else if (cn.toLowerCase() === String(en || "").trim().toLowerCase()) issues.push(`第 ${i + 1} 句疑似原文回显`);
    const nums = String(en || "").match(/\b\d+(?:[.,]\d+)?%?\b/g) || [];
    const missing = nums.filter(n => !cn.includes(n));
    if (missing.length) issues.push(`第 ${i + 1} 句数字待核对：${missing.join(", ")}`);
  });
  return { status: issues.some(x => /为空|句数不一致|原文回显/.test(x)) ? "blocked" : "machine-checked", issues };
}

function scoreItem({ feed, item, words, capWords, cover, imgs, sents, paragraphs }) {
  const quality = qualityScore({
    sourceTier: SOURCE_TIERS[feed.name] || 1,
    title: item.title,
    desc: item.desc,
    date: item.date,
    words,
    capWords,
    paragraphs,
    sentences: sents.length,
    cover: Boolean(cover),
    images: Number(item.nimgs || 0) + Number(imgs || 0),
  });
  const difficulty = difficultyBaseScore({ sentences: sents, vocabulary: VOCABULARY });
  const server = serverScore(quality.value, difficulty);
  const watchBoost = starWatchBoost(feed, item);
  return {
    qualityScore: quality.value,
    qualityBand: quality.band,
    difficultyBaseScore: difficulty,
    serverScore: server,
    score: server + watchBoost,
    watchBoost,
  };
}

function staticSkipReason(feed, item) {
  if (/\/sponsored\/|\/partner[-_]?content\/|\/advertorial\//i.test(item.link)) return "软文";
  /* 「厂商访谈落地页」2026-09-16 新增。Ness Labs 的 Tools for Thought 系列，每篇的路径都是
     `nesslabs.com/<tool>-featured-tool?utm_source=rss…`：首句固定是「Welcome to this edition
     of our Tools for Thought series…」，末 4 段固定是 Ness Letters 订阅推广 + 课程/社群广告。
     正文里的问答是真内容，但整页的存在目的就是给赞助工具做介绍 —— 不是文章。
     拦在**候选层**而不是段落层：段落级的 BOILER 只能删掉首句与末段，中间问答照样入库，
     整篇仍会以「成长」常青栏目（配额 60、不受 30 天时效淘汰）的身份永久在线。
     本批两篇就是这么漏进来的 —— 长度够、结尾不带省略号，`looksTruncatedTeaser` 也放行。 */
  if (/[-_]featured[-_]tool(?:\/|$|\?)/i.test(item.link)) return "厂商访谈落地页";
  if (feed.cat === "足球" && /how to watch|live streams?|tv channels?|watch online|use a vpn|free stream/i.test(item.title)) return "足球观看指南";
  if (feed.cat === "明星" && /horoscope|shop|deal|sale|giveaway|watch:|watch online|how to watch|livestream|streaming|quiz|releases|\bbag\b|\bbags\b|sneaker|\bboots?\b|jeans|sweater|runway|collection\b|boxing fight|football game/i.test(item.title)) return "非美图向";
  if (feed.cat === "成长" && /passive income|get rich|dropship|side hustle|\bcrypto\b|\bnft\b|\$\d[\d,.]*\s*(\/|a|per)?\s*(month|day|hr|hour)/i.test(item.title)) return "搞钱标题";
  /* 「播客页」这条 2026-09-15 修过一次：原正则 `/\/podcast\//` 要求 podcast 前面是
     斜杠，而 fs.blog 的路径是 `knowledge-project-podcast/greg-brockman/` —— 前面是
     连字符，于是整条规则从来没命中过。结果 3 个 Knowledge Project 播客页（只有导语，
     末句还是 Amazon Associates 联盟声明）以「成长」常青栏目的身份长期挂在线上。
     现在按「路径段」匹配：段名以 podcast 结尾（可带连字符前缀）/ 前后是斜杠。 */
  if (feed.cat === "成长" && /(^|\/)[-a-z]*podcasts?\//i.test(item.link)) return "播客页";
  if (/techcrunch (disrupt|sessions|events?)\b/i.test(item.title)) return "活动推广";
  try {
    const seg = new URL(item.link).pathname.split("/").filter(Boolean);
    if (seg.length < 2 && !feed.flatUrl) return "非文章页";
  } catch { return "链接异常"; }
  return "";
}

function selectCandidates(candidates) {
  const eligible = candidates.filter(c => {
    if (c.qualityScore < QUALITY_CANDIDATE_THRESHOLD) return false;
    const reason = unreadableReason({
      cat: c.feed?.cat,
      title: c.item?.title,
      url: c.item?.link,
      paras: (c.keep || []).filter(b => b.t === "p").map(b => ({ en: b.v })),
    });
    if (reason) {
      if (VERBOSE) console.log(`    · 内容门禁挡下[${reason}] ${cleanTitle(c.item.title).slice(0, 46)}`);
      return false;
    }
    return true;
  });
  /* 明星栏目的图片硬门槛（用户 2026-09-14 定）：正文内嵌图 ≥6 张才算候选。
     门槛用「从正文抽到的有效图」而不是 RSS 里声明的图数 —— 后者常是推荐位缩略图。
     被它挡下的是「2—3 张图的明星短讯」，正是「只有一张配图的短消息」那类。 */
  const gated = eligible.filter(c => meetsImageGate(c.feed.cat, c.imgs));
  if (VERBOSE && gated.length < eligible.length) {
    for (const c of eligible.filter(x => !gated.includes(x))) {
      console.log(`    · 图片门槛挡下[${c.imgs} 图] ${cleanTitle(c.item.title).slice(0, 46)}`);
    }
  }
  const ordered = [...gated].sort((a, b) => b.score - a.score || (b.item.date || "").localeCompare(a.item.date || ""));
  const seenUrls = new Set(), seenTitles = new Set(), unique = [];
  for (const c of ordered) {
    const url = c.item.link;
    const title = TITLE_KEY(c.item.title);
    if (seenUrls.has(url) || (title && seenTitles.has(title))) continue;
    seenUrls.add(url);
    if (title) seenTitles.add(title);
    unique.push(c);
  }

  const selected = [], catCount = {}, sourceCount = {};
  for (const c of unique) {
    if (selected.length >= LIMIT) break;
    const catCap = c.feed.cat in QUOTA ? QUOTA[c.feed.cat] : PER_FEED;
    const sourceCap = Math.min(c.feed.max || SOURCE_DIVERSITY_CAP, SOURCE_DIVERSITY_CAP);
    const catN = catCount[c.feed.cat] || 0;
    const sourceN = sourceCount[c.feed.name] || 0;
    if (catN >= catCap || sourceN >= sourceCap) continue;
    selected.push(c);
    catCount[c.feed.cat] = catN + 1;
    sourceCount[c.feed.name] = sourceN + 1;
  }
  return selected;
}

/* ---------------- 模式一：为已有文章补封面图 ---------------- */

async function backfill() {
  const existing = loadExisting();
  fs.mkdirSync(COVERS_DIR, { recursive: true });
  console.log(`回填封面图：共 ${existing.length} 篇，检查缺图情况…\n`);

  let oldMap = {};
  try {
    const m = fs.readFileSync(COVER_MAP_FILE, "utf8").match(/COVER_MAP = (\{[\s\S]*?\n\});/);
    if (m) oldMap = JSON.parse(m[1]);
  } catch { /* 首次 */ }

  const map = { ...oldMap };
  let ok = 0, skip = 0, fail = 0;
  for (const a of existing) {
    const dest = path.join(COVERS_DIR, `${a.id}.jpg`);
    /* 抓取文章自带 coverImg 的不用管；已回填过的也跳过 */
    if (a.coverImg && fs.existsSync(path.join(ROOT, a.coverImg))) { skip++; continue; }
    if (map[a.id] && fs.existsSync(path.join(ROOT, map[a.id]))) { skip++; continue; }
    if (!a.url) { fail++; continue; }

    process.stdout.write(`· ${String(a.title).slice(0, 46)} … `);
    const html = await get(a.url, 2, 60000);   // 名刊页面重，放宽单次超时
    let src = html ? ogImage(html) : "";
    /* og:image 缺失时，退而取正文里第一张够大的图 */
    if (!src && html) {
      const blocks = extractBlocks(html);
      const first = blocks.find(b => b.t === "img");
      if (first) src = first.src;
    }
    /* 页面根本抓不到图（JS 渲染/反爬）时，按标题回源站接口找同一篇报道的配图 */
    if (!src) src = await imageFallback(a, html);
    const bytes = src ? await downloadImg(src, dest) : 0;
    if (bytes) {
      map[a.id] = `assets/covers/${a.id}.jpg`;
      ok++;
      console.log(`✓ ${Math.round(bytes / 1024)}KB`);
    } else {
      fail++;
      console.log("× 无可用图");
    }
    await sleep(350);
  }

  fs.writeFileSync(COVER_MAP_FILE, `/* 词阅 WordLens —— 封面图映射（自动生成，请勿手改；运行 node tools/ingest.mjs --backfill 重新生成）
 *
 * 键为文章 id，值为本地图片路径（相对站点根目录）。
 * 抓不到配图的文章不在此表内，页面会自动回退到渐变封面。
 * 共 ${Object.keys(map).length} 篇有图。
 */

const COVER_MAP = ${JSON.stringify(map, null, 2)};
`);
  optimizeImages();
  console.log(`\n封面图：新增 ${ok} 张，已有 ${skip} 张，无图 ${fail} 篇`);
  console.log(`写出 ${path.relative(ROOT, COVER_MAP_FILE)}（共 ${Object.keys(map).length} 篇有图）`);
}

/* ---------------- 按标题找回原报道配图（用于 JS 渲染、抓不到 <img> 的来源） ---------------- */

const normTitle = s => String(s).toLowerCase().replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();
let espnCache = null;

/* ESPN 文章页整个由 JS 渲染，正文和图都抓不到；改用它自家公开的 news API 按标题匹配同一篇报道 */
async function espnImageFor(title) {
  if (espnCache === null) {
    const body = await get("https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/news?limit=50", 2);
    try { espnCache = (JSON.parse(body || "{}").articles || []); } catch { espnCache = []; }
  }
  const key = normTitle(title);
  if (key.length < 16) return "";
  const hit = espnCache.find(a => {
    const h = normTitle(a.headline);
    return h.startsWith(key.slice(0, 32)) || key.startsWith(h.slice(0, 32));
  });
  const url = hit && hit.images && hit.images[0] && hit.images[0].url;
  return url ? upgradeImg(url) : "";
}

async function imageFallback(a, html) {
  if (/espn/i.test(a.source || "") || /espn\.com/i.test(a.url || "")) return espnImageFor(a.title);
  return "";
}

/* ---------------- 模式三：修复已有抓取文章的配图 ----------------
 * 用途：图床规则变化、或抽取逻辑修好之后，不必重跑整条流水线（翻译很慢），
 *      只把 assets/data-articles-extra.js 里缺失/失败的封面与正文图补回来。 */

/* 按原始 block 顺序算出每张图应插在第几句之后（与首次生成时的打包规则一致） */
function plannedImgPositions(blocks, maxSents, maxWords) {
  const marks = [];
  let sents = 0, words = 0, imgs = 0;
  for (const b of blocks) {
    if (sents >= maxSents || words >= maxWords) break;
    if (b.t === "img") {
      if (imgs < MAX_INLINE_IMG) { marks.push({ after: sents, src: b.src, cap: b.cap || "" }); imgs++; }
      continue;
    }
    for (const s of splitSentences([b.v])) {
      if (sents >= maxSents || words >= maxWords) break;
      sents++; words += wordCount(s);
    }
  }
  return marks;
}

async function repairImages() {
  if (!fs.existsSync(OUT_FILE)) { console.log("还没有 data-articles-extra.js，先用 node tools/ingest.mjs 抓一批。"); return; }
  const decl = readDecl(OUT_FILE, "ARTICLES_EXTRA");
  if (!decl) { console.log("extra 文件里没找到 ARTICLES_EXTRA，跳过。"); return; }

  const list = decl.value;
  fs.mkdirSync(COVERS_DIR, { recursive: true });
  const targets = REPAIR_CATS.size ? list.filter(a => REPAIR_CATS.has(a.cat)) : list;
  console.log(`修复配图：${targets.length} / ${list.length} 篇${REPAIR_CATS.size ? `（${[...REPAIR_CATS].join("、")}）` : ""}\n`);

  let coverOk = 0, coverFail = 0, inOk = 0, inFail = 0;
  for (const a of targets) {
    const html = await get(a.url, 2, 60000);   // 名刊页面重，放宽单次超时
    if (!html) { console.log(`· ${a.id.padEnd(40)} 页面取不到，保持原样`); coverFail++; continue; }

    const blocks = extractBlocks(html, LOOSE_CATS.has(a.cat), a.title);
    const inlineSrcs = blocks.filter(b => b.t === "img").map(b => b.src);

    /* 封面的取图优先级：og:image → 正文第一张图（与首次生成时一致） */
    const coverSrc = ogImage(html) || inlineSrcs[0] || "";

    /* 长度上限按分类取（成长是全文模式，图要铺满整篇；其余默认 24 句窗） */
    const fd = FEED_BY_CAT[a.cat] || {};
    const capSents = fd.full ? Infinity : (fd.sents || MAX_SENTS);
    const capWords = fd.full ? Infinity : (fd.words || MAX_WORDS);

    /* 封面：已有可用文件就不重下 */
    const coverDest = path.join(COVERS_DIR, `${a.id}.jpg`);
    let hasCover = fs.existsSync(coverDest) && fs.statSync(coverDest).size > 4000;
    if (!hasCover) {
      for (const c of [ogImage(html), ...inlineSrcs].filter(Boolean)) {
        if (await downloadImg(c, coverDest)) { hasCover = true; break; }
        await sleep(150);
      }
    }
    a.coverImg = hasCover ? `assets/covers/${a.id}.jpg` : "";
    hasCover ? coverOk++ : coverFail++;

    /* 正文内嵌图：按原报道的 block 顺序重新对齐，历史上因图床问题整段丢掉的也能补回来。
     * 与封面同一张的剔掉——同一张图在正文里再出现一次是噪音。 */
    const sameAsCover = u => {
      if (!coverSrc || !u) return false;
      return urlKey(u) === urlKey(coverSrc);
    };
    const marks = plannedImgPositions(blocks, capSents, capWords).filter(mk => !sameAsCover(mk.src));
    const at = new Map();                       // 句子序号 -> 该位置要插入的图
    marks.forEach((mk, k) => {
      if (!at.has(mk.after)) at.set(mk.after, []);
      at.get(mk.after).push({ ...mk, n: k + 1 });
    });

    const textParas = a.paras.filter(p => p && !p.img);
    const rebuilt = [];
    const addedAt = new Set();
    let placed = 0;
    const addMarks = async si => {
      if (addedAt.has(si)) return;
      addedAt.add(si);
      for (const g of (at.get(si) || [])) {
        const rel = `assets/covers/${a.id}-${g.n}.jpg`;
        const dest = path.join(ROOT, rel);
        let good = fs.existsSync(dest) && fs.statSync(dest).size > 4000;
        if (!good) good = !!(await downloadImg(g.src, dest));
        if (good) { rebuilt.push({ img: rel, cap: g.cap }); inOk++; placed++; }
        else inFail++;
      }
    };
    let sentenceIndex = 0;
    for (const block of textParas) {
      const nested = Array.isArray(block.sentences);
      const sentences = (nested ? block.sentences : [block]).filter(Boolean);
      const kept = [];
      const flush = () => {
        if (!kept.length) return;
        rebuilt.push(nested ? { sentences: kept.splice(0) } : kept.shift());
      };
      for (const sentence of sentences) {
        if (at.has(sentenceIndex)) {
          flush();
          await addMarks(sentenceIndex);
        }
        kept.push(sentence);
        sentenceIndex++;
      }
      if (at.has(sentenceIndex)) {
        flush();
        await addMarks(sentenceIndex);
      }
      flush();
    }
    await addMarks(sentenceIndex);
    a.paras = rebuilt;

    /* 不在修复过程中删除旧图。完整数据写盘并通过质检后，交给 publish.mjs
     * 按全库引用关系归档孤儿图，避免中断时把仍需恢复的图片永久删掉。 */

    console.log(`· ${a.id.padEnd(40)} 封面 ${hasCover ? "✓" : "×"}  正文图 ${placed} 张`);
    await sleep(300);
  }

  const head = src.slice(0, m.index);
  const tail = src.slice(m.index + m[0].length);
  fs.writeFileSync(OUT_FILE, head + m[1] + JSON.stringify(list, null, 2) + m[3] + tail);
  optimizeImages();
  console.log(`\n封面：成功 ${coverOk} / 失败 ${coverFail}　正文图：保留 ${inOk} / 丢弃 ${inFail}`);
  console.log(`写出 ${path.relative(ROOT, OUT_FILE)}`);
}

/* ---------------- 诊断：打印一份 HTML 的提取结果 ---------------- */
async function dumpBlocks() {
  const html = fs.readFileSync(path.resolve(ROOT, DUMP_BLOCKS), "utf8");
  const blocks = extractBlocks(html, has("loose"), val("title", ""));
  const texts = blocks.filter(b => b.t === "p");
  const words = texts.reduce((n, b) => n + wordCount(b.v), 0);
  console.error(`提取：文字块 ${texts.length}（列表/标题 ${texts.filter(b => b.item).length}）· 图 ${blocks.length - texts.length} · 词 ${words}`);
  process.stdout.write(JSON.stringify(blocks, null, 1));
}

/* ---------------- 诊断：候选节点 + 拒绝原因（--dump-nodes） ----------------
 *
 * 与 --dump-blocks 的分工：
 *   --dump-blocks → 过闸之后的块（回答「入库了什么」）
 *   --dump-nodes  → 过闸之前的候选 + 每条为什么被拒（回答「丢的是什么、被谁的刀」）
 *
 * 归因走 lib-text 的 `explainReject`，**不在这里写第二份判定**。
 * 重复剔除单列（`dup`）：它是「提取到了、但前一条已经收过」，不是闸拦的，
 * 混进拒绝原因会让「特征闸」看起来命中率虚高。
 */
async function dumpNodes() {
  const html = fs.readFileSync(path.resolve(ROOT, DUMP_NODES), "utf8");
  const nodes = collectNodes(html, has("loose"), val("title", ""));
  const seen = new Set();
  const rows = [];
  for (const n of nodes) {
    if (n.kind !== "p" && n.kind !== "item") continue;
    const t = stripTags(n.inner);
    const list = n.kind === "item";
    const why = explainReject(t, list ? { list, head: !!n.head } : {});
    let dup = false;
    if (!why) { const k = t.slice(0, 60); if (seen.has(k)) dup = true; else seen.add(k); }
    rows.push({ kind: n.kind, head: !!n.head, list, pos: n.at, len: t.length, words: wordCount(t), why: why || (dup ? "重复剔除" : null), t });
  }
  const tally = {};
  for (const r of rows) if (r.why) tally[r.why] = (tally[r.why] || 0) + 1;
  const kept = rows.filter(r => !r.why);
  console.error(`候选节点 ${rows.length} → 过闸 ${kept.length} | 被拒 ${rows.length - kept.length}`);
  Object.entries(tally).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.error(`   ${String(v).padStart(4)}  ${k}`));
  process.stdout.write(JSON.stringify(rows, null, 1));
}

/* ---------------- 补回被提取器漏掉的正文（--refill） ----------------
 *
 * 起因：`extractBlocks` 原先只认 `<p>`，`<li>` / `<h2>` / `<h3>` 从来没被提取过。
 * 《HUMAN 3.0》完整知识库是一份清单式文档，因此整篇丢了 309 个列表条目
 * （实测 2,328 词）——「三层级 / 三阶段」被讲了，层级本身一条没列；正文层的
 * `goodPara`（长度 <70 丢、字母 <55 丢）与 `splitSentences`（<30 字符丢）又各补一刀。
 * 语义验收实测全库合计 349 块 / 3,069 词有原文、没进库。
 *
 * 策略是**只增不改**：
 *   1. 重新抓原文（用当前 a.url）；
 *   2. 用**当前**提取器重抽，得到带块序号的原文句子序列；
 *   3. 与库内句子做 LCS 对齐 —— 只挑「原文有、库里没有」的；
 *   4. 补译这些句子，按锚点插回原位（同段就插进同一组，跨段就作为新组插在后面）。
 * 库内既有句子一个字节都不动，所以这个操作**不可能造成内容回退**，
 * 最坏情况是没补上。跑完必须跑 audit + qc 复检。
 *
 * 用法：
 *   node tools/ingest.mjs --refill --dry              只列「打算补什么」，不写盘、不翻译
 *   node tools/ingest.mjs --refill                     补译并写盘
 *   node tools/ingest.mjs --refill --refill-ids kb     只补 id 含 kb 的篇
 */

/* 句子比对用的归一化：弯撇号/弯引号/空白差异不算差异（正文撇号是弯的 ’） */
const normSent = s => String(s || "")
  .replace(/[‘’]/g, "'").replace(/[“”]/g, '"')
  .replace(/\s+/g, " ").trim().toLowerCase();

/** 最长公共子序列对齐（a=原文句序，b=库内句序），返回 [origIdx, pubIdx] 配对 */
function alignLcs(a, b) {
  const n = a.length, m = b.length, W = m + 1;
  if (!n || !m) return [];
  const dp = new Uint32Array((n + 1) * W);
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i * W + j] = a[i] === b[j]
        ? dp[(i + 1) * W + j + 1] + 1
        : Math.max(dp[(i + 1) * W + j], dp[i * W + j + 1]);
    }
  }
  const pairs = [];
  let i = 0, j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) { pairs.push([i, j]); i++; j++; }
    else if (dp[(i + 1) * W + j] >= dp[i * W + j + 1]) i++;
    else j++;
  }
  return pairs;
}

/* 人物篇的 `sourceTextWords` / `sourceParagraphs` 是 qc F4 用来对账「字段 vs 正文」的。
 * 实现已抽到 tools/lib-article-fields.mjs —— **动正文的不止 ingest**（删重复句、重分组、
 * 人工修订都会让字段漂），只有共用一份口径才不会两边打架。这里保留调用点不变。 */

async function refillMissing() {
  const decl = readDecl(OUT_FILE, "ARTICLES_EXTRA");
  if (!decl) { console.log("extra 文件里没找到 ARTICLES_EXTRA，跳过。"); return; }
  const list = decl.value;
  const keys = String(val("refill-ids", "")).split(",").map(s => s.trim()).filter(Boolean);
  const targets = keys.length ? list.filter(a => keys.some(k => a.id.includes(k))) : list;
  console.log(`补正文：${targets.length} / ${list.length} 篇${DRY ? "（--dry，不写盘不翻译）" : ""}\n`);

  const summary = [];
  let fieldFixed = 0;
  for (const a of targets) {
    const html = await get(a.url, 2, 60000);
    if (!html) { console.log(`· ${a.id.padEnd(42)} 原文取不到，跳过`); summary.push({ id: a.id, status: "fetch-fail" }); continue; }

    const blocks = extractBlocks(html, LOOSE_CATS.has(a.cat), a.title);
    const orig = [];
    blocks.forEach((b, bi) => {
      if (b.t !== "p") return;
      for (const s of splitSentences([b.v])) orig.push({ en: s, block: bi, item: !!b.item });
    });

    const pub = [];
    a.paras.forEach((p, pi) => {
      if (p.img) return;
      if (Array.isArray(p.sentences)) p.sentences.forEach((s, si) => pub.push({ en: s.en, pi, si }));
      else pub.push({ en: p.en, pi, si: -1 });
    });

    const pairs = alignLcs(orig.map(x => normSent(x.en)), pub.map(x => normSent(x.en)));
    const pubOfOrig = new Map(pairs);
    const missing = [];
    orig.forEach((x, i) => { if (!pubOfOrig.has(i)) missing.push(i); });

    /* 锚点：每个缺失句插在「它之前最后一句已对齐句」之后；没有则插到最前（-1） */
    const anchorOf = new Map();
    let lastPub = -1, oi = 0;
    for (let k = 0; k < orig.length; k++) {
      if (pubOfOrig.has(k)) { lastPub = pubOfOrig.get(k); continue; }
      anchorOf.set(k, lastPub);
    }

    if (!missing.length) {
      const fixed = syncPeopleSourceFields(a);
      fieldFixed += fixed;
      console.log(`· ${a.id.padEnd(42)} 无缺失（库内 ${pub.length} 句 / 原文 ${orig.length} 句）${fixed ? ` · 已同步 source 字段 ${fixed} 处` : ""}`);
      summary.push({ id: a.id, status: "clean", fieldFixed: fixed });
      continue;
    }

    console.log(`· ${a.id.padEnd(42)} 缺失 ${String(missing.length).padStart(3)} 句 / ${missing.reduce((n, i) => n + wordCount(orig[i].en), 0)} 词`);
    if (DRY) {
      missing.slice(0, 40).forEach(i => console.log(`    [${orig[i].block}] ${orig[i].en.slice(0, 118)}`));
      if (missing.length > 40) console.log(`    …另有 ${missing.length - 40} 句`);
      summary.push({ id: a.id, status: "missing", n: missing.length, words: missing.reduce((n, i) => n + wordCount(orig[i].en), 0) });
      continue;
    }

    /* 补译（走同一份 .mt-cache.json；已译过的句子不会重复请求） */
    const texts = missing.map(i => orig[i].en);
    const zhs = await translateTexts(texts, {
      maxLines: 4, maxChars: 1200,
      cacheNamespace: "refill-v1",
      cacheKey: a.url,
      context: batch => [a.title, a.source, ...batch.flatMap(b => {
        const o = missing[b.i];
        return orig.slice(Math.max(0, o - 2), o).map(x => x.en);
      })].join(" "),
    });

    /* 组装：anchor(库内句下标) → 要插入的新句 */
    const afterK = new Map();
    let dropped = 0;
    missing.forEach((oi2, n) => {
      const en = orig[oi2].en;
      const cn = applyGlossary(postEdit(zhs[n] || "", a.cat), en, a.id);
      const para = cleanPara({ en, cn });
      if (!para) { dropped++; return; }
      const k = anchorOf.get(oi2);
      if (!afterK.has(k)) afterK.set(k, []);
      afterK.get(k).push(para);
    });
    if (dropped) console.log(`    跳过 ${dropped} 句（译文缺失，下轮重试）`);

    /* 原位插回：同组插进组内，跨组作为新组插在后面。库内原句对象原样引用，不改不删。 */
    const kByKey = new Map();
    pub.forEach((p, k) => kByKey.set(`${p.pi}:${p.si}`, k));
    const out = [];
    if (afterK.has(-1)) out.push({ sentences: afterK.get(-1) });
    a.paras.forEach((p, pi) => {
      if (p.img) { out.push(p); return; }
      if (Array.isArray(p.sentences)) {
        const sents = [];
        p.sentences.forEach((s, si) => {
          sents.push(s);
          const k = kByKey.get(`${pi}:${si}`);
          if (k != null && afterK.has(k)) sents.push(...afterK.get(k));
        });
        out.push({ sentences: sents });
      } else {
        out.push(p);
        const k = kByKey.get(`${pi}:-1`);
        if (k != null && afterK.has(k)) out.push({ sentences: afterK.get(k) });
      }
    });

    /* 安全断言：库内原句必须一字不少地还在（只增不改的兜底检查） */
    const before = pub.map(p => normSent(p.en)).sort();
    const after = [];
    out.forEach(p => {
      if (p.img) return;
      (Array.isArray(p.sentences) ? p.sentences : [p]).forEach(s => after.push(normSent(s.en)));
    });
    const have = new Map();
    after.forEach(s => have.set(s, (have.get(s) || 0) + 1));
    let lost = 0;
    for (const s of before) { const c = have.get(s) || 0; if (!c) lost++; else have.set(s, c - 1); }
    if (lost) { console.log(`    ✗ 断言失败：有 ${lost} 句原句会丢失，本篇跳过不写`); summary.push({ id: a.id, status: "assert-fail" }); continue; }

    a.paras = out;
    fieldFixed += syncPeopleSourceFields(a);
    summary.push({ id: a.id, status: "refilled", added: after.length - before.length, dropped });
  }

  const added = summary.reduce((n, s) => n + (s.added || 0), 0);
  console.log(`\n合计补回 ${added} 句${fieldFixed ? `，同步人物篇 source 字段 ${fieldFixed} 处` : ""}`);
  if (DRY) { console.log("--dry：未写盘、未翻译。"); return; }
  if (!added && !fieldFixed) { console.log("无变化，未写盘。"); return; }
  fs.writeFileSync(OUT_FILE, src.slice(0, m.index) + m[1] + JSON.stringify(list, null, 2) + m[3] + src.slice(m.index + m[0].length));
  console.log(`写出 ${path.relative(ROOT, OUT_FILE)}`);
}

/* ---------------- 模式六：下架（按 DROP_LIST 剔除） ----------------
 * 只删不留：命中 id 的整条移除，其余原样。写盘走 writeExtra —— 它是唯一的产物出口，
 * 头注释的「共 N 篇」与来源清单都由它重算；手写一份头必然与生成器漂开。
 * 图片不在这一步删：publish.mjs 会把「不再被引用」的封面判为孤儿并归档（先复制后删），
 * 于是删除也有批次快照兜底、可回滚，并自动进「删除清单」交给远端一并清掉。
 */
async function prune() {
  const decl = readDecl(OUT_FILE, "ARTICLES_EXTRA");
  if (!decl) { console.log("extra 文件里没找到 ARTICLES_EXTRA，跳过。"); return; }
  const list = decl.value;
  const drop = new Map(DROP_LIST.map(d => [d.id, d.why]));
  const removed = list.filter(a => drop.has(a.id));
  const kept = list.filter(a => !drop.has(a.id));
  const miss = [...drop.keys()].filter(id => !list.some(a => a.id === id));

  console.log(`下架：名单 ${drop.size} 篇 · 命中 ${removed.length} 篇 · 库内 ${list.length} → ${kept.length} 篇\n`);
  removed.forEach(a => console.log(`  - ${a.id}\n      理由：${drop.get(a.id)}`));
  if (miss.length) console.log(`\n  （名单里 ${miss.length} 篇不在库内，可能已清过：${miss.join(", ")}）`);
  if (!removed.length) {
    /* 没得可下架，但**仍要过一遍 writeExtra** —— 它是唯一产物出口，头注释的「共 N 篇」与
     * 来源清单都由它重算。为什么要在这里补：FEEDS 停采后 main() 会在「候选为空」处早退
     * （见本文件末尾），产物再没有别的机会自更新头注释 —— 实测 2026-09-17 清空 FEEDS 之后，
     * 生成物头上一直写着「足球 RSS」，与其自身的 9 篇内容自相矛盾。这里不新增文件内容，
     * kept === list 时正文逐字节不变，只有头注释被重算。--dry 依旧不写盘。 */
    if (DRY) { console.log("\n没有可下架的文章；--dry 未写盘。"); return; }
    writeExtra(kept);
    console.log("\n没有可下架的文章；已用生成器重算产物头注释。");
    return;
  }
  if (DRY) { console.log("\n--dry：未写盘。"); return; }
  writeExtra(kept);
  console.log(`\n写出 ${path.relative(ROOT, OUT_FILE)}：${kept.length} 篇`);
  console.log("下一步：node tools/publish.mjs --dry   看发布计划（孤儿封面会被归档并列入删除清单）");
}

/* ---------------- 写盘 ---------------- */

/* RSS 通道与历史通道共用同一份产物格式。两个通道写两个头会漂，所以只有这一个出口。 */
function writeExtra(all) {
  const body = `/* 词阅 WordLens —— 抓取文章（自动生成，请勿手改；运行 node tools/ingest.mjs 重新生成）
 *
 * 共 ${all.length} 篇；RSS 文章保留来源英文，中文为机器翻译学习注释。
 * 人物类由 tools/people.mjs 写入公开原刊正文与图片；广告/导航块过滤，来源与署名保留。
 * 每篇保留 url 外链可溯源。来源：${[...new Set(all.map(a => a.source.split(" · ")[0]))].join(" / ")}
 *
 * 通道：人物 reviewed queue（tools/people.mjs）。足球 / 成长 RSS 与 AI / 旧明星历史通道均已停用 ——
 *       2026-09-17 起 FEEDS 为空，本脚本不再抓取任何 RSS；仍保留 --prune / --refill /
 *       --dump-* 这些**不依赖 FEEDS** 的存量维护入口。
 * pin: true 的专题不按 30 天过期，且不占栏目配额。
 */

const ARTICLES_EXTRA = ${JSON.stringify(all, null, 2)};

/* 合并进 ARTICLES（按 url / id 去重，避免和 data.js 里的文章重复） */
if (typeof ARTICLES !== "undefined" && typeof ARTICLES.push === "function") {
  const _haveUrl = new Set(ARTICLES.map(a => a.url));
  const _haveId = new Set(ARTICLES.map(a => a.id));
  ARTICLES_EXTRA.forEach(a => {
    if (!_haveUrl.has(a.url) && !_haveId.has(a.id)) ARTICLES.push(a);
  });
}
`;
  fs.writeFileSync(OUT_FILE, body);
}

/* ---------------- 模式三：明星栏目「历史通道」（非 RSS） ----------------
 * 现有来源全是 RSS，时效窗最长 60 天，而「经典人物影像回顾」是长尾存量内容 ——
 * 九十年代旧照今天照样发，靠 RSS 永远抓不到。这条通道换一条路：
 *   月度 sitemap → 主题/人物筛选 → 实测（图数 / 图注年代 / 正文词数）→ 入池
 *   → 抓正文与全部图 → 逐句翻译 → 落库
 *
 * 与 RSS 通道的三处不同：
 *   ① **图注必须进库**。RSS 通道的 ELLE / Bazaar 是裸 <img>，没有 <figcaption>，
 *      所以全库内嵌图的 cap 一直是空的；这里的图注形如
 *      `Getty Images November 1980 A 19-year-old Diana Spencer wore a red blazer…`
 *      —— 出处、拍摄年代、内容齐全，是这篇内容的一半价值。
 *   ② **图上限放宽到 --imgs（默认 16）**。RSS 通道默认 4、明星源 6。
 *   ③ **每篇带 `pin: true`**。经典专题不能按 30 天过期：publish.mjs 的 isPinned()
 *      同时豁免日期过期与栏目配额，并校验「置顶文章被误删」。
 *      为什么不用「把明星加进 EVERGREEN_CATS」：那会连每日明星新闻一起永久保留，
 *      而过期的日常更新本就该走。
 */
async function classics() {
  fs.mkdirSync(path.dirname(CL_CACHE), { recursive: true });

  const prev = readPrevExtra();
  const haveUrl = new Set(prev.map(a => urlKey(a.url)));
  const haveId = new Set(prev.map(a => a.id));

  console.log(`历史通道：扫近 ${CL_MONTHS} 个月的 Vogue 图集（sitemap 按月分片）`);
  console.log(`入选门槛：名单确认女性 · 图注带 ≤2005 年份的图 ≥${CL_MIN_EARLY} 张 · 图 ≥6`
    + ` · 正文 ≥${CL_MIN_WORDS} 词且正文+图注 ≥${CL_MIN_READ} 词 · 每人一篇\n`);

  /* 与 fetch-classics.mjs 共用同一份实测缓存 —— 那边刚扫过，这边就不必重抓 130 个页面 */
  const cache = CL_REFRESH || !fs.existsSync(CL_CACHE)
    ? {}
    : JSON.parse(fs.readFileSync(CL_CACHE, "utf8"));
  const { all, kept, probed, stats } = await scanClassics({
    months: CL_MONTHS, site: CL_SITE, cache,
    onSource: (s, n) => console.log(`   ${s.name.padEnd(14)} ${s.section.padEnd(12)} 全量 ${n} 条`),
    onProgress: (done, total) => { if (done % 20 === 0) console.log(`   实测 … ${done}/${total}`); },
  });
  fs.writeFileSync(CL_CACHE, JSON.stringify(cache, null, 1));

  const { pool } = buildPool(probed, { minEarly: CL_MIN_EARLY, minWords: CL_MIN_WORDS, minRead: CL_MIN_READ });
  console.log(`\n   sitemap 全量 ${all.length} 条 → 命中经典回顾型 ${kept.length} 条`);
  console.log(`   实测 ${probed.length} 条（缓存命中 ${stats.cached} · 失败 ${stats.failed}）→ 入池 ${pool.length} 条`);

  const targets = [];
  let skipped = 0;
  for (const t of pool) {
    const id = `${CAT_ABBR["明星"]}-${slug(t.slug)}`;
    if (haveUrl.has(urlKey(t.url)) || haveId.has(id)) { skipped++; continue; }
    targets.push({ t, id });
  }
  if (skipped) console.log(`   ${skipped} 条已在库里，跳过`);

  const batch = CL_LIMIT ? targets.slice(0, CL_LIMIT) : targets;
  if (!batch.length) { console.log("\n没有新专题要入库。"); return; }
  console.log(`\n本次处理 ${batch.length} 篇：`);
  batch.forEach(({ t }, i) => console.log(
    `   ${String(i + 1).padStart(2)}. ${t.person.padEnd(20)} ${String(t.m.figs).padStart(2)} 图 · `
    + `${String(t.m.early).padStart(2)} 张早期 · ${String(t.m.words).padStart(4)} 词 · ${t.m.published || "?"}`));

  if (DRY) { console.log("\n--dry：只列计划，未写任何文件"); return; }

  fs.mkdirSync(COVERS_DIR, { recursive: true });
  let imgOk = 0, imgFail = 0;
  const articles = [];

  for (const [idx, { t, id }] of batch.entries()) {
    console.log(`\n· [${idx + 1}/${batch.length}] ${t.person} — ${t.m.title.slice(0, 56)}`);
    let html;
    try {
      html = await classicsFetch(t.url);
    } catch (e) {
      console.log(`   页面取不到（${e.message}），跳过`);
      continue;
    }
    const feed = CLASSIC_FEEDS[t.site] || CLASSIC_FEEDS.us;
    /* 图床在 URL 里写死尺寸（`w_2580%2Cc_limit`）。最终一律压到 720px，
       所以把源收到 w_1600 就够了 —— 否则每张 300—900KB，17 篇要下几百 MB。
       upgradeImg 只改尺寸段，不动 %2C 编码（改了就会被图床回 400）。 */
    const shot = u => upgradeImg(u);
    const cover = shot(ogImage(html) || (t.m.imgSample && t.m.imgSample[0] && t.m.imgSample[0].url) || "");

    /* 正文段与图按原顺序拼回；图取前 CL_IMGS 张（保序，不改原图顺序）。
       复检用共享的 `classicRead` —— 与清单（buildPool）同一把尺子，否则会出现
       「清单说能入、这里说文字太薄」的漂移（2026-09-14 实测过一次，碧昂丝那篇）。 */
    const rd = classicRead(html);
    const merged = [];
    const sents = [];
    let n = 0, seenImg = false;
    for (const b of rd.blocks) {
      if (b.kind === "img") {
        /* 首图无图注 = Vogue 的 story hero（实测 Diana 与 Halle Berry 都是
           「恰好 1 张、位于第 0 位」）。它已经作为封面出现，再收一次就是
           开头连着两张同源图。 */
        const hero = !seenImg && !b.cap;
        seenImg = true;
        if (hero) continue;
        /* 封面去重必须按 photo id（`/photos/<id>/`），不能只去 query：
           og:image 与正文图常是同 id 不同宽度段（w_1280 vs w_2580），
           按完整 URL 比是比不出来的。 */
        if (cover && imgKey(b.url) === imgKey(cover)) continue;
        if (n >= CL_IMGS) continue;
        n++;
        merged.push({ t: "img", src: shot(b.url), cap: b.cap || "" });
      } else if (classicPara(b.text)) {
        const ss = splitSentences([b.text]);
        if (!ss.length) continue;
        merged.push({ t: "p", sents: ss });
        sents.push(...ss);
      }
    }
    const imgs = merged.filter(b => b.t === "img").length;
    const words = sents.reduce((x, s) => x + wordCount(s), 0);

    /* 页面可能已改版。实测值对不上就跳过，宁可少一篇也不要入库一个空壳 ——
     * 「标题写 25 张、抽到 0 张」这种提取失败，表现和「这篇内容不行」一模一样。
     * 门槛与 buildPool 完全一致：图 ≥6 · 正文 ≥CL_MIN_WORDS · 正文+图注 ≥CL_MIN_READ。 */
    if (rd.imgs < 6 || rd.words < CL_MIN_WORDS || rd.readWords < CL_MIN_READ) {
      console.log(`   ⚠ 重新实测不达标（${rd.imgs} 图 / 正文 ${rd.words} 词`
        + ` + 图注 ${rd.capWords} 词），跳过`);
      continue;
    }

    const capTexts = [...new Set(merged.filter(b => b.t === "img" && b.cap).map(b => b.cap))];
    const allTexts = [...sents, ...capTexts];
    const translated = await translateTexts(allTexts, {
      maxLines: 4,
      maxChars: 1200,
      cacheNamespace: "article-context-v3",
      cacheKey: t.url,
      context: batch => articleContext(feed, { title: t.m.title }, allTexts, batch),
    });
    if (!translationsComplete(translated)) {
      const ok = translated.filter(x => typeof x === "string" && x.trim()).length;
      console.log(`   翻译不完整（${ok}/${translated.length}），跳过并留待下次重试`);
      continue;
    }
    const cn = translated.slice(0, sents.length);
    const capCnBy = new Map(capTexts.map((cap, i) => [cap, postEdit(translated[sents.length + i] || "", "明星")]));

    let coverImg = "";
    if (cover) {
      const bytes = await downloadImg(cover, path.join(COVERS_DIR, `${id}.jpg`), feed);
      if (bytes) { coverImg = `assets/covers/${id}.jpg`; imgOk++; } else imgFail++;
      await sleep(200);
    }

    const paras = [];
    let si = 0, ni = 0, cleanedSentences = 0;
    for (const b of merged) {
      if (b.t === "img") {
        ni++;
        const rel = `assets/covers/${id}-${ni}.jpg`;
        const bytes = await downloadImg(b.src, path.join(COVERS_DIR, `${id}-${ni}.jpg`), feed);
        if (bytes) { paras.push({ img: rel, cap: b.cap, capCn: b.cap ? capCnBy.get(b.cap) || "" : "" }); imgOk++; } else imgFail++;
        await sleep(120);
        continue;
      }
      const sentences = [];
      for (const s of b.sents) {
        const para = cleanPara({ en: s, cn: postEdit(cn[si++] || "", "明星") });
        if (para) { sentences.push(para); cleanedSentences++; }
      }
      if (sentences.length) paras.push({ sentences });
    }
    if (cleanedSentences !== sents.length) {
      console.log(`   清洗后句子数不一致（${cleanedSentences}/${sents.length}），跳过并留待下次重试`);
      continue;
    }
    if (!paras.some(p => Array.isArray(p.sentences) && p.sentences.length)) {
      console.log("   清洗后没有可用句对，跳过");
      continue;
    }
    const finalImgs = paras.filter(p => p && p.img).length;
    if (!meetsImageGate("明星", finalImgs)) {
      console.log(`   ⚠ 配图下载后不达标（${finalImgs}/${STAR_MIN_IMAGES}），跳过`);
      continue;
    }

    const grad = GRADIENTS[idx % GRADIENTS.length];
    /* 图注词数进质量分：经典图集的正文薄是常态，图注才是文字主体（见 recommend.mjs）。
       从 merged（去 hero、去封面重复、16 张上限后的实际入库块）里数 ——
       分数要描述「这篇入库后有多少东西可读」，不是池子清单里的全量图注。 */
    const capWords = paras.filter(b => b && b.img && b.cap)
      .reduce((n, b) => n + wordCount(b.cap), 0);
    const scored = scoreItem({
      feed, words, cover, imgs: finalImgs, sents,
      capWords,
      item: { title: t.m.title, desc: "", date: t.m.published, nimgs: 0 },
      paragraphs: merged.filter(b => b.t === "p").length,
    });

    articles.push({
      id,
      cat: "明星",
      title: cleanTitle(t.m.title || t.slug.replace(/-/g, " ")),
      source: `${feed.name} · ${t.m.published || "档案"}`,
      date: t.m.published || new Date().toISOString().slice(0, 10),
      minutes: Math.max(2, Math.round(words / 130)),
      url: t.url,
      cover: grad,
      gradient: grad,
      coverImg,
      /* 历史通道标记（方案 §3.3）：pin 豁免过期与配额；src/license 记收录方式；
         yearFrom 是图注里最早的拍摄年代 —— 「判断照片年代而不是发布日期」靠它落地。 */
      pin: true,
      src: t.site === "uk" ? "vogue-uk" : "vogue-us",
      license: "getty",
      yearFrom: (t.m.years && t.m.years[0]) || 0,
      person: t.person,
      photoCount: finalImgs,
      scoreVersion: SCORE_VERSION,
      qualityScore: scored.qualityScore,
      qualityBand: scored.qualityBand,
      difficultyBaseScore: scored.difficultyBaseScore,
      serverScore: scored.serverScore,
      paras,
    });
    console.log(`   ✓ ${finalImgs} 图 · ${sents.length} 句 · ${words} 词 · 封面${coverImg ? "有" : "无"}`);
  }

  if (!articles.length) { console.log("\n没有成功入库的专题。"); return; }
  optimizeImages();

  const titleResult = await translateArticleTitles(articles);
  if (titleResult.total) {
    console.log(`\n  标题中文：${titleResult.ok}/${titleResult.total}${titleResult.ok < titleResult.total ? "（有未译出的，跑 node tools/translate-titles.mjs 可补）" : ""}`);
  }

  const newIds = new Set(articles.map(a => a.id));
  const list = [...articles, ...prev.filter(a => !newIds.has(a.id))];
  writeExtra(list);

  console.log(`\n配图：成功 ${imgOk} 张，失败 ${imgFail} 张`);
  console.log(`写出 ${path.relative(ROOT, OUT_FILE)}：本次新增 ${articles.length} 篇 · 累计 ${list.length} 篇`);
  articles.forEach(a => console.log(`  · [${a.cat}] ${a.coverImg ? "🖼 " : "  "}${a.title.slice(0, 52)}  (${a.photoCount} 图 · ${a.paras.length} 段)`));
  console.log(`\n下一步：node tools/publish.mjs --dry   看发布计划（经典专题带 pin:true，豁免 30 天过期与栏目配额）`);
}

/* ---------------- 模式二：抓取新文章 ---------------- */

async function main() {
  console.log(`抓取模式：${DRY ? "DRY（不翻译）" : "抓取 + 翻译"}${REPLACE ? " · REPLACE（不保留旧文章）" : ""}  目标 ≤ ${LIMIT} 篇  候选/源 = ${CANDIDATE_LIMIT}  时效 = 近 ${MAX_AGE_DAYS} 天\n`);

  const existing = REPLACE ? [] : loadExisting();
  const haveUrl = new Set(existing.map(a => a.url));
  const rawCandidates = [];
  const skip = (it, why) => { if (VERBOSE) console.log(`    · 跳过[${why}] ${cleanTitle(it.title).slice(0, 46)}`); };

  /* 阶段一：所有源先收集 RSS 候选，不在这里消耗类别配额。 */
  for (const feed of FEEDS) {
    process.stdout.write(`· ${feed.name} (${feed.cat}) ... `);
    const xml = await getTracked(feed, "rss", feed.rss);
    if (!xml) { console.log("RSS 取不到，跳过"); continue; }
    if (!sourceUsable(feed, "rss")) {
      console.log(`RSS ${parseItems(xml).length} 条 · 来源熔断（RSS/正文连续失败，等待恢复探测）`);
      continue;
    }
    const all = parseItems(xml).filter(it => freshEnough(it.date, feed.days));
    const items = all.filter(it => {
      if (haveUrl.has(it.link)) { skip(it, "已抓过"); return false; }
      const why = staticSkipReason(feed, it);
      if (why) { skip(it, why); return false; }
      return true;
    }).sort((a, b) => starWatchBoost(feed, b) - starWatchBoost(feed, a)
      || (b.nimgs || 0) - (a.nimgs || 0)
      || (b.date || "").localeCompare(a.date || ""));
    const chosen = items.slice(0, CANDIDATE_LIMIT);
    rawCandidates.push(...chosen.map(item => ({ feed, item })));
    console.log(`RSS ${all.length} 条 · 入池 ${chosen.length} 条`);
  }

  if (!rawCandidates.length) { console.log("\n没有进入候选池的文章，退出。"); return; }
  console.log(`\n候选池：${rawCandidates.length} 条，开始富化正文与图片…`);

  /* 阶段二：统一富化。此处才拉文章页、抽正文、判难度和计算最终评分。 */
  const enriched = [];
  for (const { feed, item } of rawCandidates) {
    const html = await getTracked(feed, "article", item.link);
    if (!html) { skip(item, "页面取不到"); continue; }
    if (!sourceUsable(feed)) { skip(item, "来源正文熔断"); continue; }
      const blocks = extractBlocks(html, LOOSE_CATS.has(feed.cat), item.title);
      const allSents = blocks.filter(b => b.t === "p").flatMap(b => splitSentences([b.v]));
    if (!difficultyOk(allSents)) { skip(item, `难度不符(${allSents.length}句/${allSents.reduce((n, s) => n + wordCount(s), 0)}词)`); continue; }

      /* 长度与配图上限按源可覆盖：full = 全文不截断，明星图多 */
      const capSents = feed.full ? Infinity : (feed.sents || MAX_SENTS);
      const capWords = feed.full ? Infinity : (feed.words || MAX_WORDS);
      const capInline = feed.inline || MAX_INLINE_IMG;
      const { keep, sents, words } = packBlocks(blocks, capSents, capWords, capInline);
    if (!sents.length) { skip(item, "正文为空"); continue; }

      const cover = item.image || ogImage(html);
      /* 与封面同一张的正文图不重复收录 */
      const keep2 = keep.filter(b => b.t !== "img" || urlKey(b.src) !== urlKey(cover));
    const imgs = keep2.filter(b => b.t === "img").length;
    const scored = scoreItem({
      feed, item, words, cover, imgs, sents,
      paragraphs: keep2.filter(b => b.t === "p").length,
    });
    enriched.push({
        feed, item, keep: keep2, sents, words, cover, imgs,
        sourceSentenceCount: allSents.length,
        sourceTruncated: allSents.length > sents.length,
        slug: slug(cleanTitle(item.title)), ...scored,
    });
    console.log(`· ${cleanTitle(item.title).slice(0, 46)}  质量 ${scored.qualityScore}（${scored.qualityBand}）· 难度 ${scored.difficultyBaseScore} · 服务端 ${scored.serverScore}  [${sents.length} 句 / ${words} 词${imgs ? " / 有内嵌图" : ""}]`);
  }

  const picked = selectCandidates(enriched);
  if (picked.length) {
    const counts = picked.reduce((o, p) => { o[p.feed.cat] = (o[p.feed.cat] || 0) + 1; return o; }, {});
    console.log(`\n统一评分后入选 ${picked.length} 篇：${JSON.stringify(counts)}（单源上限 ${SOURCE_DIVERSITY_CAP}）`);
  }

  if (!picked.length) { console.log("\n没抓到合格文章，退出。"); return; }

  console.log(`\n共 ${picked.length} 篇进入处理。`);

  if (DRY) {
    console.log("\n--dry 模式，预览：");
    picked.forEach(p => {
      console.log(`\n【${p.feed.cat}】${cleanTitle(p.item.title)}   ${p.item.date}`);
      console.log(`   ${p.item.link}`);
      console.log(`   质量: ${p.qualityScore}（${p.qualityBand}） · 基础难度: ${p.difficultyBaseScore} · 服务端: ${p.serverScore}`);
      console.log(`   来源层级: ${SOURCE_TIERS[p.feed.name] || 1}`);
      console.log(`   封面图: ${p.cover ? p.cover.slice(0, 100) : "（无，将回退渐变）"}`);
      p.keep.filter(b => b.t === "img").forEach(b => console.log(`   内嵌图: ${b.src.slice(0, 100)}${b.cap ? `  cap="${b.cap.slice(0, 50)}"` : ""}`));
      p.keep.filter(b => b.t === "p").slice(0, 2).forEach(b => b.sents.forEach((s, i) => console.log(`   ${i + 1}. ${s.slice(0, 140)}`)));
    });
    console.log(`\n其中 ${picked.filter(p => p.cover).length} 篇有封面图，${picked.reduce((n, p) => n + p.imgs, 0)} 张正文内嵌图待下载。`);
    return;
  }

  /* 批量翻译：每篇一次调用，译完立即落盘，中断也不丢进度 */
  const total = picked.reduce((n, p) => n + p.sents.length, 0);
  let done = 0;
  for (const p of picked) {
    const translationProviders = {};
    p.cn = await translateTexts(p.sents, {
      maxLines: 4,
      maxChars: 1200,
      cacheNamespace: "article-context-v3",
      cacheKey: p.item.link,
      sourceLang: "EN",
      context: batch => articleContext(p.feed, p.item, p.sents, batch),
      onProvider: (name, count) => { translationProviders[name] = (translationProviders[name] || 0) + count; },
    });
    p.translation = { ...translationAudit(p.sents, p.cn), providers: translationProviders, cacheNamespace: "article-context-v3" };
    done += p.sents.length;
    process.stdout.write(`\r  翻译进度 ${done}/${total}`);
  }
  console.log();

  const good = picked.filter(p => translationsComplete(p.cn) && p.translation?.status !== "blocked");
  const dropped = picked.length - good.length;
  if (dropped) console.log(`  跳过 ${dropped} 篇（译文不完整，下一轮重试）`);

  /* 组装 + 下载配图 */
  fs.mkdirSync(COVERS_DIR, { recursive: true });
  let imgOk = 0, imgFail = 0;
  const articles = [];
  for (let idx = 0; idx < good.length; idx++) {
    const p = good[idx];
    const id = `${CAT_ABBR[p.feed.cat] || "art"}-${p.slug}`;
    const grad = GRADIENTS[idx % GRADIENTS.length];

    let coverImg = "";
    if (p.cover) {
      const dest = path.join(COVERS_DIR, `${id}.jpg`);
      const bytes = await downloadImg(p.cover, dest, p.feed);
      if (bytes) { coverImg = `assets/covers/${id}.jpg`; imgOk++; } else imgFail++;
      await sleep(200);
    }

    const paras = [];
    let si = 0, n = 0, cleanedSentences = 0;
    for (const b of p.keep) {
      if (b.t === "img") {
        n++;
        const dest = path.join(COVERS_DIR, `${id}-${n}.jpg`);
        const bytes = await downloadImg(b.src, dest, p.feed);
        if (bytes) { paras.push({ img: `assets/covers/${id}-${n}.jpg`, cap: b.cap || "" }); imgOk++; }
        else imgFail++;
        await sleep(200);
        continue;
      }
      const sentences = [];
      for (const s of b.sents) {
        /* 术语校正接在机翻后处理之后：规则以英文原句为条件，把 DeepL 在术语层面的
           漂移（Level→阶段、save→省钱、flow→流动）当场按回去。不接这一步，
           存量修正过的错会在下一批抓取里原样重生。 */
        const cn = applyGlossary(postEdit(p.cn[si++] || "", p.feed.cat), s, id);
        /* 统一清洗：删掉混进来的脚本、还原翻译占位符、规范中文标点留白。
           没译出来、或清洗后只剩残句的，整段丢掉——宁可少一句，也不要空对照或乱码 */
        const para = cleanPara({ en: s, cn });
        if (para) { sentences.push(para); cleanedSentences++; }
      }
      if (sentences.length) paras.push({ sentences });
    }

    if (cleanedSentences !== p.sents.length) {
      console.log(`  ⚠ 清洗后句子数不一致（${cleanedSentences}/${p.sents.length}），跳过并留待下次重试`);
      continue;
    }

    /* 图片下载可能失败，候选阶段的图片数量不能代表最终入库数量。
       明星栏目必须在下载后再次过硬门槛，避免落成少图的娱乐快讯。 */
    const finalImgs = paras.filter(x => x && x.img).length;
    if (!meetsImageGate(p.feed.cat, finalImgs)) {
      console.log(`  ⚠ 配图下载后不达标（${finalImgs}/${STAR_MIN_IMAGES}），跳过`);
      continue;
    }

    articles.push({
      id,
      cat: p.feed.cat,
      title: cleanTitle(p.item.title),
      source: `${p.feed.name} · ${p.item.date}`,
      date: p.item.date,
      minutes: Math.max(2, Math.round(p.words / 130)),
      url: p.item.link,
      cover: grad,
      gradient: grad,
      coverImg,
      scoreVersion: SCORE_VERSION,
      qualityScore: p.qualityScore,
      qualityBand: p.qualityBand,
      difficultyBaseScore: p.difficultyBaseScore,
      serverScore: p.serverScore,
      sourceSentenceCount: p.sourceSentenceCount || p.sents.length,
      sourceTruncated: Boolean(p.sourceTruncated),
      translation: p.translation,
      paras
    });
  }

  optimizeImages();

  /* 标题中文：列表卡片、发现页精选、阅读页都在英文标题下渲染这行小字，
     抓取时一并补上（同一套引擎与缓存，标题短，命中缓存的居多） */
  const titleResult = await translateArticleTitles(articles);
  if (titleResult.total) {
    console.log(`  标题中文：${titleResult.ok}/${titleResult.total}${titleResult.ok < titleResult.total ? "（有未译出的，跑 node tools/translate-titles.mjs 可补）" : ""}`);
  }

  /* --append：把这一批叠加到上次成果之上（按 id 去重）；不加则整份覆盖 */
  const prev = APPEND ? readPrevExtra() : [];
  const haveIds = new Set(prev.map(a => a.id));
  const all = [...prev, ...articles.filter(a => !haveIds.has(a.id))];

  writeExtra(all);

  const dist = {};
  all.forEach(a => dist[a.cat] = (dist[a.cat] || 0) + 1);
  console.log(`\n配图：成功 ${imgOk} 张，失败 ${imgFail} 张`);
  console.log(`写出 ${path.relative(ROOT, OUT_FILE)}：本次新增 ${articles.length} 篇，累计 ${all.length} 篇  分布 ${JSON.stringify(dist)}`);
  articles.forEach(a => console.log(`  · [${a.cat}] ${a.coverImg ? "🖼 " : "  "}${a.title.slice(0, 56)}  (${a.paras.length} 段)`));
  console.log(`\n下一步：node tools/ingest.mjs --backfill   给 data.js 里的文章补封面图`);
}

const job = DUMP_NODES ? dumpNodes() : DUMP_BLOCKS ? dumpBlocks() : PRUNE ? prune() : REFILL ? refillMissing() : CLASSICS ? classics() : BACKFILL ? backfill() : REPAIR ? repairImages() : main();
job.then(() => {
  if (!BACKFILL && !REPAIR && !REFILL && !DUMP_BLOCKS && !DUMP_NODES && !PRUNE) saveSourceHealth();
}).catch(e => {
  if (!BACKFILL && !REPAIR && !PRUNE) saveSourceHealth();
  console.error("失败：", e);
  process.exit(1);
});

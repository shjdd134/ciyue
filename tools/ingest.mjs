#!/usr/bin/env node
/* 词阅 WordLens —— 真文章抓取流水线 v2
 *
 * 流程：公开 RSS 抓取 → 提取正文段落与内嵌图 → 时效+难度筛选 → 逐句机器翻译 → 下载并压缩配图
 *      → 生成 assets/data-articles-extra.js
 *
 * 原则：
 *   - 英文正文 100% 来自真实报道原文，不做任何改写或虚构（与项目"拒绝 AI 写文"一致）
 *   - 中文为逐句机器翻译（DeepL 优先，有道 / MyMemory 兜底），仅作学习注释
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
 *   node tools/ingest.mjs --repair-images --repair-cats 足球,AI,明星  只修复指定栏目
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
  cleanInvisible, cleanPara, cleanTitleZh, goodPara, putTitleZh, splitSentences, tidySpace, wordCount,
} from "./lib-text.mjs";
import { translateTexts } from "./lib-mt.mjs";
/* 历史通道（明星栏目经典专题）的发现与提取口径 —— 与 fetch-classics.mjs 同一份实现。
 * 「数 <figure> 而非 <img>」「老模板图 URL 无扩展名」「不能只取第一个 srcset」
 * 「跨站去重不能靠图注文本或图片 id」四个坑的说明都在那个文件里。 */
import {
  buildPool, classicPara, classicRead, fetchText as classicsFetch, imgKey, scanClassics,
} from "./lib-classics.mjs";
import {
  QUALITY_CANDIDATE_THRESHOLD, SCORE_VERSION, STAR_MIN_IMAGES, classifySourceHealth, difficultyBaseScore,
  emptySourceHealth, meetsImageGate, qualityScore, serverScore, updateSourceHealth,
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
const REPAIR_CATS = new Set(String(val("repair-cats", "")).split(",").map(s => s.trim()).filter(Boolean));
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
const MAX_INLINE_IMG = 4;   /* 图文并茂：各栏目默认正文内嵌图上限（明星在 FEEDS 里放宽到 6） */

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
  /* —— 足球 —— */
  { cat: "足球", name: "Sky Sports", rss: "https://www.skysports.com/rss/11095", max: 6 },
  { cat: "足球", name: "FourFourTwo", rss: "https://www.fourfourtwo.com/feeds.xml", max: 3 },
  { cat: "足球", name: "Opta Analyst", rss: "https://theanalyst.com/feed", max: 3, days: 30, full: true, looseImg: true },

  /* —— AI —— */
  { cat: "AI", name: "TechCrunch AI", rss: "https://techcrunch.com/category/artificial-intelligence/feed/", max: 4 },
  { cat: "AI", name: "AI News", rss: "https://www.artificialintelligence-news.com/feed/", max: 3 },

  /* —— 成长（独立博主英文长文：对人生发展有实质干货，反厚黑学/反空话——
     Dan Koe 是用户点名的类型代表，More To That 本身就是手绘插图的图文长文）——
     常青内容不受全局时效限制（days 放宽）；full = 不截断，整篇进应用。
     Dan Koe 的 WordPress 站 2025-08 后停更，活跃更新在 Substack 镜像 future/proof */
  { cat: "成长", name: "Dan Koe", rss: "https://letters.thedankoe.com/feed", max: 3, days: 800, full: true },
  { cat: "成长", name: "Farnam Street", rss: "https://fs.blog/feed/", max: 3, days: 400, full: true },
  { cat: "成长", name: "More To That", rss: "https://moretothat.com/feed/", max: 2, days: 800, full: true, flatUrl: true, looseImg: true },
  { cat: "成长", name: "Ness Labs", rss: "https://nesslabs.com/feed/", max: 2, days: 400, full: true, flatUrl: true },
  /* Aeon / Psyche 均为 Aeon Media 旗下的长文刊物；条款允许个人非商业使用 RSS。 */
  { cat: "成长", name: "Aeon", rss: "https://aeon.co/feed.rss", max: 3, days: 800, full: true, looseImg: true },
  { cat: "成长", name: "Psyche", rss: "https://psyche.co/feed", max: 3, days: 800, full: true, looseImg: true },

  /* —— 明星（美图向 + 经典美人深度人物特写：Guardian film feed 常出大明星访谈/人物
     特写（Emma Stone / Sophia Loren 这类），统一评分会把访谈/特写排前；Vanity Fair / Rolling Stone 出名人
     长文与写真报道；Hearst 全站 feed 出每日美图向内容；正文图放宽到 6 张。注：Guardian 的
     明星 tag feed（/film/<人名>/rss）已不存在，实测 Actions 上取不到，勿再加） —— */
  { cat: "明星", name: "The Guardian", rss: "https://www.theguardian.com/film/rss", max: 3, days: 30, full: true, looseImg: true },
  { cat: "明星", name: "Vanity Fair", rss: "https://www.vanityfair.com/feed/rss", max: 3, days: 60, full: true, looseImg: true },
  { cat: "明星", name: "Rolling Stone", rss: "https://www.rollingstone.com/feed/", max: 2, days: 30, full: true, looseImg: true },
  { cat: "明星", name: "ELLE", rss: "https://www.elle.com/rss/all.xml/", max: 4, inline: 6, looseImg: true },
  { cat: "明星", name: "Harper's Bazaar", rss: "https://www.harpersbazaar.com/rss/all.xml/", max: 4, inline: 6, looseImg: true }
];

/* 裸图提取分类：这些分类的文章页图片不包 <figure>，extractBlocks 需要放开扫 <img> */
const LOOSE_CATS = new Set(FEEDS.filter(f => f.looseImg).map(f => f.cat));
/* 每个分类的抓取配置（repair 等按文章 cat 回查） */
const FEED_BY_CAT = {};
FEEDS.forEach(f => { if (!FEED_BY_CAT[f.cat]) FEED_BY_CAT[f.cat] = f; });

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

function extractBlocks(html, looseImg = false) {
  /* 先划出 figure 的字符区间，避免同一段被 <p> 和 <figure> 重复计入 */
  const figs = [...html.matchAll(/<figure\b[^>]*>([\s\S]*?)<\/figure>/gi)]
    .map(m => ({ at: m.index, end: m.index + m[0].length, inner: m[1] }));

  const nodes = figs.map(f => ({ at: f.at, kind: "fig", inner: f.inner }));
  const inFig = i => figs.some(f => i >= f.at && i < f.end);

  for (const m of html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)) {
    if (inFig(m.index)) continue;
    nodes.push({ at: m.index, kind: "p", inner: m[1] });
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

  const seenText = new Set();
  const seenImg = new Set();
  const out = [];
  for (const n of nodes) {
    if (n.kind === "p") {
      const t = stripTags(n.inner);
      if (!goodPara(t)) continue;
      const key = t.slice(0, 60);
      if (seenText.has(key)) continue;
      seenText.add(key);
      out.push({ t: "p", v: t });
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
 * MyMemory 会在中文里插入 "（ English ）" 形式的原文并留下多余空格，
 * 另外对少数高频体育用语译错。这里做轻量规范化，不改动语义。 */
const CN_POST = [
  [/（\s*([^（）]{1,70}?)\s*）/g, "（$1）"],
  [/([\u4e00-\u9fa5]{2,8})的老板/g, "$1主帅"],
  [/比赛冠军/g, "取胜功臣"],
  [/奥德加尔|奥德加德/g, "厄德高"],
  [/阿尔特塔（ ?Mikel Arteta ?）/g, "阿尔特塔"],
  [/\s{2,}/g, " "],
  [/^\s+|\s+$/g, ""]
];
const CN_POST_BY_CAT = {
  足球: [
    [/阿森纳老板|球队老板/g, "主帅"],
    [/([\u4e00-\u9fa5]{2,8})老板/g, "$1主帅"]
  ]
};
const postEdit = (s, cat) => {
  let t = CN_POST.reduce((x, [re, to]) => x.replace(re, to), String(s));
  (CN_POST_BY_CAT[cat] || []).forEach(([re, to]) => { t = t.replace(re, to); });
  return t;
};

/* ---------------- 翻译（有道为主、MyMemory 兜底，带磁盘缓存） ----------------
 * 引擎与缓存都在 tools/lib-mt.mjs：正文、标题（translate-titles.mjs）共用同一份
 * tools/.mt-cache.json，同一句话不会重复请求。MyMemory 免费额度按 IP 每天重置，
 * 抓到十几篇就会打满；有道公开接口质量更好，且支持一次多句（换行分隔）。
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
    const src = fs.readFileSync(OUT_FILE, "utf8");
    const m = src.match(/(const ARTICLES_EXTRA = )(\[[\s\S]*?\n\])(;)/);
    return m ? JSON.parse(m[2]) : [];
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
    for (const j of [i - 1, i, i + 1]) {
      if (j >= 0 && j < texts.length && texts[j]) around.add(texts[j]);
    }
  }
  return [
    item?.title ? `Article title: ${item.title}` : "",
    feed?.name ? `Source: ${feed.name}` : "",
    [...around].join(" "),
  ].filter(Boolean).join("\n");
}

/* 翻译结果必须逐项存在。之前只按 85% 比例放行，cleanPara 又会静默删掉
 * 空译文，最终读者看到的是缺句的中英对照，且很难追查是哪次接口截断。 */
const translationsComplete = xs => Array.isArray(xs) && xs.length > 0
  && xs.every(x => typeof x === "string" && x.trim().length > 0);

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
  if (feed.cat === "明星" && /horoscope|shop|deal|sale|giveaway|watch:|watch online|how to watch|livestream|streaming|quiz|releases|\bbag\b|\bbags\b|sneaker|\bboots?\b|jeans|sweater|runway|collection\b|boxing fight|football game/i.test(item.title)) return "非美图向";
  if (feed.cat === "成长" && /passive income|get rich|dropship|side hustle|\bcrypto\b|\bnft\b|\$\d[\d,.]*\s*(\/|a|per)?\s*(month|day|hr|hour)/i.test(item.title)) return "搞钱标题";
  if (feed.cat === "成长" && /\/podcast\//i.test(item.link)) return "播客页";
  if (/techcrunch (disrupt|sessions|events?)\b/i.test(item.title)) return "活动推广";
  try {
    const seg = new URL(item.link).pathname.split("/").filter(Boolean);
    if (seg.length < 2 && !feed.flatUrl) return "非文章页";
  } catch { return "链接异常"; }
  return "";
}

function selectCandidates(candidates) {
  const eligible = candidates.filter(c => c.qualityScore >= QUALITY_CANDIDATE_THRESHOLD);
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
  const src = fs.readFileSync(OUT_FILE, "utf8");
  const m = src.match(/(const ARTICLES_EXTRA = )(\[[\s\S]*?\n\])(;)/);
  if (!m) { console.log("extra 文件里没找到 ARTICLES_EXTRA，跳过。"); return; }

  const list = JSON.parse(m[2]);
  fs.mkdirSync(COVERS_DIR, { recursive: true });
  const targets = REPAIR_CATS.size ? list.filter(a => REPAIR_CATS.has(a.cat)) : list;
  console.log(`修复配图：${targets.length} / ${list.length} 篇${REPAIR_CATS.size ? `（${[...REPAIR_CATS].join("、")}）` : ""}\n`);

  let coverOk = 0, coverFail = 0, inOk = 0, inFail = 0;
  for (const a of targets) {
    const html = await get(a.url, 2, 60000);   // 名刊页面重，放宽单次超时
    if (!html) { console.log(`· ${a.id.padEnd(40)} 页面取不到，保持原样`); coverFail++; continue; }

    const blocks = extractBlocks(html, LOOSE_CATS.has(a.cat));
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

/* ---------------- 写盘 ---------------- */

/* RSS 通道与历史通道共用同一份产物格式。两个通道写两个头会漂，所以只有这一个出口。 */
function writeExtra(all) {
  const body = `/* 词阅 WordLens —— 抓取文章（自动生成，请勿手改；运行 node tools/ingest.mjs 重新生成）
 *
 * 共 ${all.length} 篇，英文正文来自公开来源的真实原文，未做改写；
 * 中文为逐句机器翻译（DeepL 优先，有道 / MyMemory 兜底），仅作学习注释；封面图与正文图取自原图床，本地留档。
 * 每篇保留 url 外链可溯源。来源：${[...new Set(all.map(a => a.source.split(" · ")[0]))].join(" / ")}
 *
 * 通道：RSS（FEEDS）+ 历史通道（--classics，Vogue 月度 sitemap 的经典图集）。
 * 历史通道的文章带 pin: true —— 经典专题不按 30 天过期，且不占栏目配额。
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
      cacheNamespace: "article-context-v2",
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

  const needZh = articles.filter(a => !a.titleZh && a.title);
  if (needZh.length) {
    await sleep(3000);   // 正文刚翻完，接口还在限流窗口里
    const zhs = await translateTexts(needZh.map(a => a.title));
    let zhOk = 0;
    needZh.forEach((a, i) => {
      const zh = cleanTitleZh(zhs[i], a.title);
      if (!zh) return;
      articles[articles.indexOf(a)] = putTitleZh(a, zh);
      zhOk++;
    });
    console.log(`\n  标题中文：${zhOk}/${needZh.length}${zhOk < needZh.length ? "（有未译出的，跑 node tools/translate-titles.mjs 可补）" : ""}`);
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
      const blocks = extractBlocks(html, LOOSE_CATS.has(feed.cat));
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
    p.cn = await translateTexts(p.sents, {
      maxLines: 4,
      maxChars: 1200,
      cacheNamespace: "article-context-v2",
      cacheKey: p.item.link,
      context: batch => articleContext(p.feed, p.item, p.sents, batch),
    });
    done += p.sents.length;
    process.stdout.write(`\r  翻译进度 ${done}/${total}`);
  }
  console.log();

  const good = picked.filter(p => translationsComplete(p.cn));
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
        const cn = postEdit(p.cn[si++] || "", p.feed.cat);
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
      paras
    });
  }

  optimizeImages();

  /* 标题中文：列表卡片、发现页精选、阅读页都在英文标题下渲染这行小字，
     抓取时一并补上（同一套引擎与缓存，标题短，命中缓存的居多） */
  const needZh = articles.filter(a => !a.titleZh && a.title);
  if (needZh.length) {
    /* 正文刚翻完，接口还在限流窗口里，先歇一下再送标题，免得整批被拒 */
    await sleep(3000);
    const zhs = await translateTexts(needZh.map(a => a.title));
    let zhOk = 0;
    needZh.forEach((a, i) => {
      const zh = cleanTitleZh(zhs[i], a.title);
      if (!zh) return;
      articles[articles.indexOf(a)] = putTitleZh(a, zh);
      zhOk++;
    });
    console.log(`  标题中文：${zhOk}/${needZh.length}${zhOk < needZh.length ? "（有未译出的，跑 node tools/translate-titles.mjs 可补）" : ""}`);
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

const job = CLASSICS ? classics() : BACKFILL ? backfill() : REPAIR ? repairImages() : main();
job.then(() => {
  if (!BACKFILL && !REPAIR) saveSourceHealth();
}).catch(e => {
  if (!BACKFILL && !REPAIR) saveSourceHealth();
  console.error("失败：", e);
  process.exit(1);
});

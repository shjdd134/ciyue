#!/usr/bin/env node
/* 词阅 WordLens —— 真文章抓取流水线 v2
 *
 * 流程：公开 RSS 抓取 → 提取正文段落与内嵌图 → 时效+难度筛选 → 逐句机器翻译 → 下载并压缩配图
 *      → 生成 assets/data-articles-extra.js
 *
 * 原则：
 *   - 英文正文 100% 来自真实报道原文，不做任何改写或虚构（与项目"拒绝 AI 写文"一致）
 *   - 中文为逐句机器翻译（有道为主、MyMemory 兜底），仅作学习注释
 *   - 只收近 N 天的文章，每篇保留 url 外链与来源，可追溯
 *   - 配图来自原报道自己的图床（RSS enclosure / og:image / 正文 figure），本地留档
 *
 * 用法：
 *   node tools/ingest.mjs                    抓取并翻译，默认 12 篇，每源最多 4 篇
 *   node tools/ingest.mjs --limit 20 --per 6 抓更多
 *   node tools/ingest.mjs --append            追加一批（保留此前抓到的文章，不清空）
 *   node tools/ingest.mjs --days 14          只要近 14 天的文章
 *   node tools/ingest.mjs --dry              只抓取+提取+筛选，不翻译，打印摘要
 *   node tools/ingest.mjs --candidate 12    每个源最多富化多少个候选（默认 12）
 *   node tools/ingest.mjs --backfill         为已有文章补抓封面图（写 assets/data-covers.js）
 *   node tools/ingest.mjs --repair-images    只修复已抓文章的封面与正文图，不重跑翻译
 *   node tools/ingest.mjs --no-filter        放宽难度筛选
 *
 * 翻译结果缓存在 tools/.mt-cache.json，重复运行不会重复请求。
 */

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import vm from "node:vm";
import {
  cleanInvisible, cleanPara, cleanTitleZh, hasAdCode, isJunkPara, putTitleZh, tidySpace,
} from "./lib-text.mjs";
import { translateTexts } from "./lib-mt.mjs";
import {
  QUALITY_CANDIDATE_THRESHOLD, SCORE_VERSION, classifySourceHealth, difficultyBaseScore,
  emptySourceHealth, qualityScore, serverScore, updateSourceHealth,
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
const NO_FILTER = has("no-filter");
const VERBOSE = has("verbose");
const APPEND = has("append");
const LIMIT = +val("limit", 99);
const PER_FEED = +val("per", 4);
const MAX_AGE_DAYS = +val("days", 21);
const MAX_SENTS = +val("sents", 24);
const MAX_WORDS = +val("words", 540);
const CANDIDATE_LIMIT = Math.max(1, +val("candidate", 12));
const SOURCE_DIVERSITY_CAP = 2;              // 同一来源每批最多入选 2 篇
const MAX_INLINE_IMG = 4;   /* 图文并茂：各栏目默认正文内嵌图上限（明星在 FEEDS 里放宽到 6） */

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

async function downloadImg(url, dest, feed = null) {
  if (!url || IMG_BAD.test(url)) return 0;
  /* 图床与页面同源时共享同一套盾：403 就降级短 UA 再试（如 moretothat.com） */
  const UAS = [UA, "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/126"];
  let lastStatus = 0;
  const started = Date.now();
  for (const ua of UAS) {
    try {
      const res = await fetch(encodeURI(url), { headers: { "User-Agent": ua }, signal: AbortSignal.timeout(30000) });
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

const PY = process.env.WORDLENS_PY || "C:/Users/sekiro/.workbuddy/binaries/python/envs/default/Scripts/python.exe";
function optimizeImages() {
  if (!fs.existsSync(PY)) { console.log("  （未找到 Pillow 环境，跳过压缩，保留原图）"); return; }
  try {
    execFileSync(PY, [path.join(ROOT, "tools", "img-post.py"), COVERS_DIR], { stdio: "inherit" });
  } catch (e) { console.log("  （图片压缩失败，保留原图）", e.message); }
}

/* ---------------- 正文提取（段落 + 内嵌图，保持原始顺序） ---------------- */

const BOILER = [
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
  /\boptimal experience\b/i, /\bavailable to download\b/i, /\bmore than \d+ languages\b/i,
  /\bskip to (main )?content\b/i, /\benable javascript\b/i, /\byour (browser|device) (does not|doesn't)\b/i,
  /\bcookie(s)? (policy|settings|preferences)\b/i, /\bmanage your (privacy|preferences)\b/i,
  /\bthis (site|website) is protected by\b/i, /\bwe use cookies\b/i, /\bconsent\b/i,
  /* 时尚/美妆媒体：导购免责声明与栏目推广 */
  /\bevery item on this page\b/i, /\bwe may earn (a )?commission\b/i, /\bwe independently (select|chose|test)/i,
  /\bindependently (selected|evaluated|tested) by our\b/i, /\bif you buy from a link\b/i,
  /\ball products are independently/i, /\bcontinue reading below\b/i, /\bwe only recommend (products|things)\b/i,
  /\bshopping (editor|director|team) (picks|approved)\b/i, /\bprice (and|or) availability\b/i,
  /\bwhy trust us\b/i, /\byou may also like\b/i, /\bsubscribe to (our|the) newsletter\b/i,
  /* 征订/许可类话术（HistoryExtra、Immediate Media 等会把它们写进正文 <p>） */
  /\bwould you like to receive\b/i, /\bcarefully selected partners\b/i, /\bfrom our publisher\b/i,
  /\boffers from (our|the) (publisher|partners)\b/i, /\bkeep up with (the )?latest\b/i
];

/* 广告脚本 / 页面埋点碎片：Hearst、Variety 等会把它们写进 <p> 里 */
const CODE_JUNK = /\.push\s*\(|defineSlot|blogherads|pmcCnx|window\.pmc|googletag|document\.|function\s*\(|=>\s*\{|@media|!important|\{[\s\S]*\}/;

const NAV_HINT = /\b(as it happened|latest news and rumours|match report|not got sky|champions league scores|full match|watch highlights|teams \| stats|sign in|log in|get sky sports|subscribe to|sign up for our)\b/i;

/* 栏目/导航条：没有句末标点、且大写词占比过高的一串词 */
function looksLikeNav(t) {
  if (/[.!?…”"']$/.test(t)) return false;
  const ws = t.split(/\s+/).filter(Boolean);
  if (ws.length < 6) return false;
  const cap = ws.filter(w => /^[A-Z0-9]/.test(w)).length;
  return cap / ws.length > 0.5;
}

function goodPara(t) {
  if (!t || t.length < 70) return false;
  if ((t.match(/[A-Za-z]/g) || []).length < 55) return false;
  if (BOILER.some(re => re.test(t))) return false;
  if (CODE_JUNK.test(t)) return false;
  if (hasAdCode(t)) return false;
  if (isJunkPara(t)) return false;
  if (NAV_HINT.test(t)) return false;
  if (looksLikeNav(t)) return false;
  if ((t.match(/\|/g) || []).length >= 2) return false;
  if (/^[A-Z][^.!?]{0,40}$/.test(t)) return false;
  return true;
}

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

/* ---------------- 断句 ---------------- */

/* 句末缩写：句号不是句尾。原先只覆盖了 Mr/Dr/U.S 等少数几个，
   新闻里高频的 Capt. / Sen. / Sgt. / Dec. 会把一句话从中间劈成两段，
   译文也就跟着变成半截话——看起来就像"翻译坏了"。 */
const ABBR = /\b(Mr|Mrs|Ms|Messrs|Dr|Drs|Prof|Sr|Jr|St|No|Nos|vs|etc|Co|Inc|Ltd|Corp|Bros|Assoc|Univ|Dept|Govt|Est|Vol|Fig|approx|Ave|Blvd|Rd|Capt|Cpl|Sgt|Lt|Col|Gen|Adm|Maj|Cmdr|Pvt|Sen|Rep|Gov|Rev|Hon|Gen|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sept|Oct|Nov|Dec|Mon|Tue|Wed|Thu|Fri|Sat|Sun|U\.S|U\.K|a\.m|p\.m|e\.g|i\.e)\./g;

function splitSentences(paras) {
  const out = [];
  for (const p of paras) {
    const guarded = p.replace(ABBR, m => m.replace(/\./g, "·"));
    const parts = guarded
      .split(/(?<=[.!?…])\s+/)
      .map(s => s.trim())
      /* 广告脚本/导航碎片不送翻译：省额度，也避免它们被译成中文混进正文 */
      .filter(s => s.length > 30 && /[A-Za-z]/.test(s) && !hasAdCode(s) && !isJunkPara(s))
      .map(s => s.replace(/·/g, "."));
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

const wordCount = s => (s.match(/[A-Za-z'’-]+/g) || []).length;

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
  "FourFourTwo": 2, "AI News": 2, "Ness Labs": 2, "ELLE": 2, "Harper's Bazaar": 2,
};
const TITLE_KEY = s => String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

function scoreItem({ feed, item, words, cover, imgs, sents, paragraphs }) {
  const quality = qualityScore({
    sourceTier: SOURCE_TIERS[feed.name] || 1,
    title: item.title,
    desc: item.desc,
    date: item.date,
    words,
    paragraphs,
    sentences: sents.length,
    cover: Boolean(cover),
    images: Number(item.nimgs || 0) + Number(imgs || 0),
  });
  const difficulty = difficultyBaseScore({ sentences: sents, vocabulary: VOCABULARY });
  const server = serverScore(quality.value, difficulty);
  return {
    qualityScore: quality.value,
    qualityBand: quality.band,
    difficultyBaseScore: difficulty,
    serverScore: server,
    score: server,
  };
}

function staticSkipReason(feed, item) {
  if (/\/sponsored\/|\/partner[-_]?content\/|\/advertorial\//i.test(item.link)) return "软文";
  if (feed.cat === "明星" && /horoscope|shop|deal|sale|giveaway|watch:|quiz|releases|\bbag\b|\bbags\b|sneaker|\bboots?\b|jeans|sweater|runway|collection\b/i.test(item.title)) return "非美图向";
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
  const ordered = [...eligible].sort((a, b) => b.score - a.score || (b.item.date || "").localeCompare(a.item.date || ""));
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
  console.log(`修复配图：共 ${list.length} 篇\n`);

  let coverOk = 0, coverFail = 0, inOk = 0, inFail = 0;
  for (const a of list) {
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

    /* 清掉这轮不再引用的旧图文件 */
    for (let k = placed + 1; k <= MAX_INLINE_IMG + 2; k++) {
      const stale = path.join(COVERS_DIR, `${a.id}-${k}.jpg`);
      if (fs.existsSync(stale)) fs.unlinkSync(stale);
    }

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

/* ---------------- 模式二：抓取新文章 ---------------- */

async function main() {
  console.log(`抓取模式：${DRY ? "DRY（不翻译）" : "抓取 + 翻译"}  目标 ≤ ${LIMIT} 篇  候选/源 = ${CANDIDATE_LIMIT}  时效 = 近 ${MAX_AGE_DAYS} 天\n`);

  const existing = loadExisting();
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
    }).sort((a, b) => (b.nimgs || 0) - (a.nimgs || 0) || (b.date || "").localeCompare(a.date || ""));
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
    p.cn = await translateTexts(p.sents, { maxLines: 4, maxChars: 1200 });
    done += p.sents.length;
    process.stdout.write(`\r  翻译进度 ${done}/${total}`);
  }
  console.log();

  const good = picked.filter(p => p.cn.filter(Boolean).length / p.cn.length >= 0.85);
  const dropped = picked.length - good.length;
  if (dropped) console.log(`  丢弃 ${dropped} 篇（翻译成功度过低）`);

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
    let si = 0, n = 0;
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
        if (para) sentences.push(para);
      }
      if (sentences.length) paras.push({ sentences });
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

  const body = `/* 词阅 WordLens —— 抓取文章（自动生成，请勿手改；运行 node tools/ingest.mjs 重新生成）
 *
 * 共 ${all.length} 篇，英文正文来自公开 RSS 的真实报道原文，未做改写；
 * 中文为逐句机器翻译（有道为主、MyMemory 兜底），仅作学习注释；封面图与正文图取自原报道图床，本地留档。
 * 每篇保留 url 外链可溯源。来源：${[...new Set(all.map(a => a.source.split(" · ")[0]))].join(" / ")}
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

  const dist = {};
  all.forEach(a => dist[a.cat] = (dist[a.cat] || 0) + 1);
  console.log(`\n配图：成功 ${imgOk} 张，失败 ${imgFail} 张`);
  console.log(`写出 ${path.relative(ROOT, OUT_FILE)}：本次新增 ${articles.length} 篇，累计 ${all.length} 篇  分布 ${JSON.stringify(dist)}`);
  articles.forEach(a => console.log(`  · [${a.cat}] ${a.coverImg ? "🖼 " : "  "}${a.title.slice(0, 56)}  (${a.paras.length} 段)`));
  console.log(`\n下一步：node tools/ingest.mjs --backfill   给 data.js 里的文章补封面图`);
}

const job = BACKFILL ? backfill() : REPAIR ? repairImages() : main();
job.then(() => {
  if (!BACKFILL && !REPAIR) saveSourceHealth();
}).catch(e => {
  if (!BACKFILL && !REPAIR) saveSourceHealth();
  console.error("失败：", e);
  process.exit(1);
});

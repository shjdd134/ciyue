/* 独立口径的「正文完整性」对账 —— 唯一的正文缺失验收工具。
 *
 * 为什么必须独立（2026-09-16 立此工具的直接起因）：
 *   `--refill` / `qc` / `spot-check` / `lib-text.mjs` 全都在用同一把尺子
 *   （goodPara / splitSentences / 各档长度闸）。**尺子量掉的内容，尺子自己报不出来**：
 *   09-16 实测 `--refill --dry` 报「缺失 6 句」，而那 6 句全是读者评论 ——
 *   同一时刻正文真缺口有 2335 词（kb-human30 整块结构化正文被形态闸拦掉），它一句没提。
 *
 * 所以本脚本**不 import 任何项目代码**，只用 6-gram 做集合运算：
 *   正向  原文 HTML 的每个块级文本行 → 去「库里该篇已入库的英文」里找，找不到 = 缺口
 *   反向  库里每句 → 去原文里找，找不到 = 超译 / 评论污染 / 重复
 * 两边用完全同一套归一化（弯引号、破折号、实体、大小写），否则差异会被算成缺口。
 *
 * ── 缺口不是判决，是材料 ──────────────────────────────────────────
 * 抓下来的原文包含导航、页脚、评论区、推荐位 —— 它们**本来就该在缺口里**。
 * 本脚本把缺口分成四类，只有 `句` 这一类值得追：
 *   nav  导航/页脚特征（© / subscribe / cookie / 全大写短串…）—— 应缺，忽略
 *   短    词数 < 6，无法用 6-gram 判定 —— 多为标签，忽略
 *   碎片  ≥6 词但无句末标点（标题、条目、半句）—— 视体裁而定，通常应缺
 *   句    ≥6 词且有句末标点 —— **这才是正文缺口**，`--strict` 时非零退出
 * 阈值只对「句」生效。「碎片」在清单式文档（如 kb-human30）里是正文主体，
 * 但对绝大多数站点是栏目菜单 —— 没有普适判据，交给人看，见 --verbose。
 *
 * ── 原文从哪来 ────────────────────────────────────────────────────
 * 默认按库里的 url 现抓，落盘缓存 `tools/.coverage-cache/<id>.html`（该目录 gitignore）。
 * 缓存命中就不再联网 —— 判定的是「库里 vs 当时的原文」，反复跑结果必须一致。
 * `--html` 可直接给本地文件（离线环境 / 手工另存的原文）。
 *
 * 用法：
 *   node tools/audit-coverage.mjs --all                 # 全库对账，出汇总表
 *   node tools/audit-coverage.mjs --id <文章 id>        # 单篇明细
 *   node tools/audit-coverage.mjs --id <id> --html x.html
 *   node tools/audit-coverage.mjs --all --no-fetch      # 只跑已有缓存（离线/CI）
 *   node tools/audit-coverage.mjs --all --strict        # 「句」类缺口 > 0 时 exit 1
 *   --verbose 打印缺口全文；--json 出机器可读结果
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const DATA = path.join(ROOT, "assets", "data-articles-extra.js");
const CACHE_DIR = path.join(import.meta.dirname, ".coverage-cache");
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
  + "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

const N = 6;             // n-gram 阶数
const COVER_OK = 0.6;    // 命中率下限。部分命中（实体/连字符/省略号差异）不算缺口。

/* ---------------- 参数 ---------------- */
const argv = process.argv.slice(2);
const has = k => argv.includes("--" + k);
const val = (k, d = "") => { const i = argv.indexOf("--" + k); return i >= 0 && argv[i + 1] ? argv[i + 1] : d; };
const ALL = has("all");
const ID = val("id");
const HTML = val("html");
const NO_FETCH = has("no-fetch");
const STRICT = has("strict");
const VERBOSE = has("verbose");
const JSON_OUT = has("json");

if (!ALL && !ID) {
  console.log(`用法：
  node tools/audit-coverage.mjs --all | --id <文章 id> [--html <本地原文>] [--no-fetch] [--strict] [--verbose] [--json]`);
  process.exit(2);
}

/* ---------------- 归一化：两边必须完全同一套 ---------------- */
const norm = s => String(s || "")
  .replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&").replace(/&quot;/gi, '"')
  .replace(/&#8217;|&rsquo;|&#8216;|&lsquo;|&#39;|&apos;|&#x27;/gi, "'")
  .replace(/&#8211;|&ndash;|&#8212;|&mdash;/gi, "-")
  .replace(/&#8230;|&hellip;/gi, " ")
  .replace(/&#\d+;/g, " ").replace(/&[a-z]+;/gi, " ")
  .replace(/[\u2018\u2019\u02BC\u00B4`]/g, "'")
  .replace(/[\u201C\u201D]/g, '"')
  .replace(/[\u2013\u2014\u2015]/g, "-")
  .replace(/[\u2026]/g, " ")
  .toLowerCase()
  .replace(/[^a-z0-9' ]+/g, " ")
  .replace(/\s+/g, " ").trim();

const words = s => norm(s).split(" ").filter(Boolean);

function grams(list, n = N) {
  const g = new Set();
  for (let i = 0; i + n <= list.length; i++) g.add(list.slice(i, i + n).join(" "));
  return g;
}

function covered(line, gramSet, corpusText) {
  const w = words(line);
  if (!w.length) return 1;
  if (w.length < N) return corpusText.includes(" " + w.join(" ") + " ") ? 1 : 0;
  const gs = grams(w);
  let hit = 0;
  for (const g of gs) if (gramSet.has(g)) hit++;
  return gs.size ? hit / gs.size : 1;
}

/* ---------------- 原文侧：块级文本行 ---------------- */
const BLOCK = /<(p|li|h1|h2|h3|h4|h5|h6|blockquote|figcaption|td|dd|dt|pre)\b[^>]*>([\s\S]*?)<\/\1>/gi;
const decode = s => String(s)
  .replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&").replace(/&quot;/gi, '"')
  .replace(/&#8217;|&rsquo;|&#8216;|&lsquo;|&#39;|&apos;|&#x27;/gi, "'")
  .replace(/&#8211;|&ndash;|&#8212;|&mdash;/gi, "-")
  .replace(/&#8230;|&hellip;/gi, "\u2026")
  .replace(/&#\d+;/g, " ").replace(/&[a-z]+;/gi, " ");
const stripTags = s => decode(String(s).replace(/<[^>]+>/g, " "))
  .replace(/\s+/g, " ").replace(/\s+([,.;:!?%])/g, "$1").trim();
const dropEmbedded = h => h
  .replace(/<script[\s\S]*?<\/script>/gi, " ")
  .replace(/<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<svg[\s\S]*?<\/svg>/gi, " ");

function lines(html) {
  const out = [];
  for (const m of dropEmbedded(html).matchAll(BLOCK)) {
    const t = stripTags(m[2]);
    if (!t || t.length < 2) continue;
    out.push({ at: m.index, tag: m[1].toLowerCase(), t });
  }
  const seen = new Set();
  return out.filter(x => { const k = x.at + "|" + x.t; if (seen.has(k)) return false; seen.add(k); return true; });
}

/* ---------------- 库内侧：该篇全部英文字段 ---------------- */
function articleText(a) {
  const parts = [];
  const push = v => { if (typeof v === "string" && v.trim()) parts.push(v); };
  for (const k of Object.keys(a)) {
    if (/title|summary|excerpt|dek|desc|kicker|intro|caption/i.test(k)) push(a[k]);
  }
  for (const p of a.paras || []) {
    if (p.img) { push(p.cap); continue; }
    if (Array.isArray(p.sentences)) for (const s of p.sentences) { push(s.en); push(s.cap); }
    else { push(p.en); push(p.cap); }
  }
  return parts.join(" \n ");
}

/* ---------------- 缺口分类 ---------------- */
const NAV_HINT = /©|all rights reserved|subscribe|newsletter|cookie|privacy|terms\b|skip to|^menu\b|\bmenu$|sign in|log in|share this|read more|related|recommend|^advertisement|sponsored|affiliate|amazon services/i;
const SENT_END = /[.!?\u2026]["'\u201D\u2019)]?$/;

function classify(t) {
  const w = words(t);
  if (NAV_HINT.test(t)) return "nav";
  if (w.length < N) return "短";
  if (!SENT_END.test(t.trim())) return "碎片";
  const cap = t.split(/\s+/).filter(x => /^[A-Z0-9]/.test(x)).length;
  if (cap / t.split(/\s+/).filter(Boolean).length > 0.6 && w.length < 12) return "碎片";
  return "句";
}
const ORDER = ["句", "碎片", "短", "nav"];

/* ---------------- 原文获取（缓存优先） ---------------- */
function cachePath(id) { return path.join(CACHE_DIR, id + ".html"); }

async function originalHtml(a) {
  if (HTML) return { html: fs.readFileSync(HTML, "utf8"), from: HTML };
  const cp = cachePath(a.id);
  if (fs.existsSync(cp) && fs.statSync(cp).size > 200) return { html: fs.readFileSync(cp, "utf8"), from: "缓存" };
  if (NO_FETCH) return { html: null, from: "--no-fetch 且无缓存" };
  try {
    const r = await fetch(a.url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(25000), redirect: "follow" });
    if (!r.ok) return { html: null, from: `HTTP ${r.status}` };
    const html = await r.text();
    fs.mkdirSync(CACHE_DIR, { recursive: true });
    fs.writeFileSync(cp, html);
    return { html, from: "现抓" };
  } catch (e) {
    return { html: null, from: "抓取失败: " + String(e.message || e).slice(0, 60) };
  }
}

/* ---------------- 主流程 ---------------- */
const src = fs.readFileSync(DATA, "utf8");
/* 抄 ingest.mjs 的同一个模式：`]` 必须在行首，比 `[\s\S]*?` 配 `$` 稳。 */
const m = src.match(/(const ARTICLES_EXTRA = )(\[[\s\S]*?\n\])(;)/);
if (!m) { console.error("✗ 解析不出 ARTICLES_EXTRA，数据文件结构变了？"); process.exit(2); }
const ALL_ARTICLES = JSON.parse(m[2]);
const targets = ALL ? ALL_ARTICLES : ALL_ARTICLES.filter(a => a.id === ID);
if (!targets.length) { console.error(`✗ 库里找不到 id：${ID}`); process.exit(2); }

const results = [];
let grand = { 句: 0, 碎片: 0, 短: 0, nav: 0 };
let grandWords = { 句: 0, 碎片: 0, 短: 0, nav: 0 };
let grandExtra = 0, skipped = [];

for (const a of targets) {
  const { html, from } = await originalHtml(a);
  if (!html) { skipped.push({ id: a.id, why: from }); continue; }

  const L = lines(html);
  const corpus = articleText(a);
  const cw = words(corpus);
  const gset = grams(cw);
  const corpusPad = " " + cw.join(" ") + " ";

  const miss = [];
  for (const x of L) {
    const c = covered(x.t, gset, corpusPad);
    if (c >= COVER_OK) continue;
    miss.push({ ...x, cov: c, kind: classify(x.t), w: words(x.t).length, pos: (x.at / html.length * 100) });
  }

  /* 反查。原文侧必须先 stripTags 再切词 —— 直接 words(html) 会让内联标签名混进词流
     （<em>kybernetikos</em> → "em kybernetikos em"），含 <em>/<strong>/<a> 的句子 6-gram
     全断，实测会让整篇正文在反查方向被误报成「原文没有」。 */
  const ow = words(stripTags(dropEmbedded(html)));
  const oset = grams(ow);
  const opad = " " + ow.join(" ") + " ";
  const extra = [];
  for (const p of a.paras || []) {
    const ss = p.img ? [] : (Array.isArray(p.sentences) ? p.sentences : [p]);
    for (const s of ss) {
      const en = String(s.en || "");
      if (words(en).length < N) continue;
      if (covered(en, oset, opad) >= COVER_OK) continue;
      extra.push(en);
    }
  }

  const byKind = {};
  for (const k of ORDER) {
    const xs = miss.filter(x => x.kind === k);
    byKind[k] = { n: xs.length, w: xs.reduce((s, x) => s + x.w, 0), rows: xs };
    grand[k] += xs.length; grandWords[k] += xs.reduce((s, x) => s + x.w, 0);
  }
  grandExtra += extra.length;

  results.push({
    id: a.id, cat: a.cat, title: a.title, from,
    bodyWords: cw.length, lines: L.length,
    byKind, extra, htmlLen: html.length,
  });
}

/* ---------------- 输出 ---------------- */
if (JSON_OUT) {
  const slim = results.map(r => ({
    id: r.id, cat: r.cat, bodyWords: r.bodyWords, lines: r.lines, from: r.from,
    gaps: Object.fromEntries(ORDER.map(k => [k, { n: r.byKind[k].n, w: r.byKind[k].w }])),
    extraSentences: r.extra.length,
    sampleSentences: r.byKind["句"].rows.slice(0, 20).map(x => x.t),
  }));
  console.log(JSON.stringify({ articles: slim, totals: { count: grand, words: grandWords, extra: grandExtra }, skipped }, null, 2));
} else {
  console.log("独立口径正文覆盖率对账（6-gram，不 import 项目代码）\n");
  console.log("文章".padEnd(50) + "库内词".padStart(7) + "原文行".padStart(7) + "│ 缺口：句 碎片  短 nav".padStart(24) + "  反查");
  console.log("-".repeat(105));
  for (const r of results) {
    const k = r.byKind;
    const flag = k["句"].n ? " ●" : "  ";
    console.log(
      (r.id.length > 48 ? r.id.slice(0, 47) + "…" : r.id).padEnd(50)
      + String(r.bodyWords).padStart(7) + String(r.lines).padStart(7) + " │"
      + String(k["句"].n).padStart(5) + String(k["碎片"].n).padStart(5) + String(k["短"].n).padStart(5) + String(k["nav"].n).padStart(5)
      + String(r.extra.length).padStart(7) + flag
    );
  }
  console.log("-".repeat(105));
  console.log("合计".padEnd(50) + "".padStart(7) + "".padStart(7) + " │"
    + String(grand["句"]).padStart(5) + String(grand["碎片"]).padStart(5) + String(grand["短"]).padStart(5) + String(grand["nav"]).padStart(5)
    + String(grandExtra).padStart(7));
  console.log("\n词数：句 " + grandWords["句"] + " · 碎片 " + grandWords["碎片"] + " · 短 " + grandWords["短"] + " · nav " + grandWords["nav"]);
  console.log("● = 有「句」类缺口，需要人工定性。`碎片` 在清单式文档里是正文主体，在普通站点是栏目菜单——没有普适判据。");

  if (skipped.length) {
    console.log("\n未能取到原文（跳过）：");
    skipped.forEach(s => console.log("  · " + s.id + "  —— " + s.why));
  }

  if (VERBOSE) {
    console.log("\n" + "=".repeat(105));
    console.log("缺口明细（按 句 > 碎片 > 短 > nav 排列）\n");
    for (const r of results) {
      const rows = ORDER.flatMap(k => r.byKind[k].rows.map(x => ({ ...x, kind: k })));
      if (!rows.length) continue;
      console.log("── " + r.id + "  [" + r.from + "]  " + rows.length + " 行 / "
        + rows.reduce((s, x) => s + x.w, 0) + " 词");
      for (const x of rows) {
        console.log("   " + x.kind.padEnd(3) + " [" + String(x.pos.toFixed(0)).padStart(3) + "%] " + x.t.slice(0, 100));
      }
      if (r.extra.length) {
        console.log("   反查（库里有、原文没有）" + r.extra.length + " 句：");
        r.extra.slice(0, 8).forEach(s => console.log("      " + s.slice(0, 100)));
      }
      console.log();
    }
  }
}

/* 退出码只由「句」类缺口决定 —— 其余三类混着导航与体裁判定，不能当失败信号。 */
if (STRICT && grand["句"] > 0) {
  if (!JSON_OUT) console.log(`\n✗ --strict：${grand["句"]} 条「句」类正文缺口（${grandWords["句"]} 词），需人工定性。`);
  process.exit(1);
}
process.exit(0);

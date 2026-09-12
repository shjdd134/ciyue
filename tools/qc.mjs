#!/usr/bin/env node
/* 词阅 WordLens —— 每日抓取的质量门禁（qc = quality control）
 *
 * 用法：
 *   node tools/qc.mjs --ids-file .tmp/new-ids.txt        只查这批新文章
 *   node tools/qc.mjs --ids-file <f> --prune             查完直接从 extra 剔除不合格者
 *   node tools/qc.mjs --all                              全库体检（不剔除，仅报告）
 *
 * 判拒标准（一条不满足即拒收该文章）：
 *   F1 字段完备：id/url/cat/title/titleZh/date/paras 齐全，cat 在栏目表内
 *   F2 新鲜度：date 可解析且在近 40 天内
 *   F3 封面：coverImg 非空、文件存在、优化后 < 250KB（无图不收，用户明确要求）
 *   F4 正文：paras ≥ 3 段；每个文字段 en 非空、cn 非空且不与 en 相同、含中文
 *   F5 文面：无翻译占位符 <e:N>/<s:N>、无 U+FFFD、无不可见字符、无广告脚本/导航/纯链接段
 * 警告（不拒收，只打印）：W1 译文中英文残留偏多、W2 段落过短
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { cleanInvisible } from "./lib-text.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const IDS_FILE = (() => {
  const i = process.argv.indexOf("--ids-file");
  return i > 0 ? path.resolve(ROOT, process.argv[i + 1]) : null;
})();
const PRUNE = process.argv.includes("--prune");
const ALL = process.argv.includes("--all");

/* ---------- 载入库 ---------- */
const ctx = vm.createContext({ console, window: { addEventListener() {} } });
vm.runInContext("var window=globalThis;", ctx);
for (const f of ["data.js", "data-words-bulk-a.js", "data-words-full.js", "data-articles-extra.js", "data-articles-archive.js", "data-covers.js"]) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, "assets", f), "utf8"), ctx, { filename: f });
}
const ARTICLES = vm.runInContext("ARTICLES", ctx);
const CATEGORIES = vm.runInContext("CATEGORIES", ctx) || [];
const COVER_MAP = vm.runInContext("typeof COVER_MAP !== 'undefined' ? COVER_MAP : {}", ctx) || {};
const CATS = new Set(CATEGORIES.filter(c => c !== "全部"));

/* ---------- 读取待检 id ---------- */
let targets;
if (ALL) {
  targets = new Set(ARTICLES.map(a => a.id));
} else {
  if (!IDS_FILE || !fs.existsSync(IDS_FILE)) { console.error("需要 --ids-file <文件>（每行一个 id）或 --all"); process.exit(2); }
  targets = new Set(fs.readFileSync(IDS_FILE, "utf8").split("\n").map(s => s.trim()).filter(Boolean));
}

/* ---------- 规则 ---------- */
const AD_CODE = /blogherads|\bpmcCnx\b|defineSlot|setTargeting|googletag|\bwindow\.\s*\w|\bdocument\.\s*(getElementById|querySelector|write)/i;
const NAV_PREFIX = /^\s*(Related Stories|Related Articles|Popular on|Trending|Recommended|More from|Also on|Also read|Read next|You may also like|Sponsored|Advertisement|Sign up for|Subscribe to)\b/i;
const BARE_LINK = /^\s*(https?:\/\/|pic\.twitter\.com|www\.)\S*(\s+(https?:\/\/|pic\.twitter\.com|www\.)\S*)*\s*$/i;
const PLACEHOLDER = /<\/?[es]:\d+>/;
const CN_RE = /[\u4e00-\u9fff]/;

const now = Date.now();
const DAY = 86400000;
const bad = [], warned = [], ok = [];

for (const a of ARTICLES) {
  if (!targets.has(a.id)) continue;
  const F = [];

  /* F1 字段 */
  for (const k of ["id", "url", "cat", "title", "titleZh", "date"]) if (!String(a[k] || "").trim()) F.push(`F1 缺字段 ${k}`);
  if (!CATS.has(a.cat)) F.push(`F1 未知栏目「${a.cat}」`);

  /* F2 新鲜度（寓言为 1912 公版经典、成长为常青博主长文，均不参与时效判定） */
  if (a.cat !== "寓言" && a.cat !== "成长") {
    const t = a.date ? new Date(a.date).getTime() : NaN;
    if (!Number.isFinite(t)) F.push("F2 date 无法解析");
    else if (now - t > 40 * DAY) F.push(`F2 文章偏旧（${Math.round((now - t) / DAY)} 天前）`);
  }

  /* F3 封面（寓言/成长允许无图，回退渐变封面） */
  if (a.cat !== "寓言" && a.cat !== "成长") {
    const cover = a.coverImg || COVER_MAP[a.id] || "";
    if (!cover) F.push("F3 无封面图");
    else {
      const cf = path.join(ROOT, cover);
      if (!fs.existsSync(cf)) F.push("F3 封面文件不存在：" + cover);
      else {
        const kb = fs.statSync(cf).size / 1024;
        if (kb > 250) F.push(`F3 封面过大 ${kb.toFixed(0)}KB`);
      }
    }
  }

  /* F4/F5 正文（寓言最短只有 2 段） */
  const paras = (a.paras || []).filter(Boolean);
  const textParas = paras.filter(p => p.en);
  if (paras.length < (a.cat === "寓言" ? 2 : 3)) F.push(`F4 只有 ${paras.length} 段`);
  for (let i = 0; i < textParas.length; i++) {
    const p = textParas[i];
    const en = String(p.en || ""), cn = String(p.cn || "");
    if (!en.trim()) { F.push(`F4 段 ${i} en 为空`); continue; }
    if (!cn.trim()) { F.push(`F4 段 ${i} 漏译（cn 为空）`); continue; }
    if (cn === en) F.push(`F4 段 ${i} 译文与原文相同`);
    if (!CN_RE.test(cn)) F.push(`F4 段 ${i} 译文无中文`);
    for (const [name, txt] of [["en", en], ["cn", cn]]) {
      if (PLACEHOLDER.test(txt)) F.push(`F5 段 ${i} ${name} 残留翻译占位符`);
      if (txt.includes("\uFFFD")) F.push(`F5 段 ${i} ${name} 含替换字符 U+FFFD`);
      if (cleanInvisible(txt) !== txt) F.push(`F5 段 ${i} ${name} 残留不可见字符`);
      if (AD_CODE.test(txt)) F.push(`F5 段 ${i} ${name} 混入广告脚本`);
      if (NAV_PREFIX.test(txt)) F.push(`F5 段 ${i} ${name} 混入导航句`);
      if (BARE_LINK.test(txt)) F.push(`F5 段 ${i} ${name} 整段纯链接`);
    }
    /* W1 译文英文残留：≥4 字母的英文词超过 8 个且译文较短 */
    const latin = (cn.match(/[A-Za-z]{4,}/g) || []).length;
    if (latin > 8 && cn.length < 400) warned.push(`W1 ${a.id} 段 ${i} 译文中英文残留偏多（${latin} 个英文词）`);
    if (en.length + cn.length < 60) warned.push(`W2 ${a.id} 段 ${i} 过短`);
  }

  if (F.length) bad.push({ id: a.id, fails: F });
  else ok.push(a.id);
}

/* ---------- 报告 ---------- */
console.log(`质检：合格 ${ok.length} · 拒收 ${bad.length} · 警告 ${warned.length}`);
for (const b of bad) console.log(`  ✗ ${b.id}\n      ${b.fails.join("\n      ")}`);
for (const w of warned.slice(0, 10)) console.log("  ⚠ " + w);

/* ---------- 剔除不合格者 ---------- */
if (PRUNE && bad.length) {
  const drop = new Set(bad.map(b => b.id));
  const FILE = path.join(ROOT, "assets", "data-articles-extra.js");
  const src = fs.readFileSync(FILE, "utf8");
  const m = src.match(/const ARTICLES_EXTRA = (\[[\s\S]*?\n\])(;)/);
  if (!m) { console.error("extra 文件结构异常，无法剔除"); process.exit(2); }
  const list = JSON.parse(m[1]);
  const kept = list.filter(a => !drop.has(a.id));
  const head = src.slice(0, m.index).replace(/共 \d+ 篇/g, `共 ${kept.length} 篇`);
  fs.writeFileSync(FILE, head + "const ARTICLES_EXTRA = " + JSON.stringify(kept, null, 2) + m[2] + src.slice(m.index + m[0].length));
  console.log(`已从 extra 剔除 ${drop.size} 篇不合格文章，保留 ${kept.length} 篇`);
}

process.exit(bad.length ? 1 : 0);

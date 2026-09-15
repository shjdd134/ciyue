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
 *   F3 封面与配图：新闻封面存在且 < 250KB；人物原刊专题的全部图片引用文件存在
 *   F4 正文：paras ≥ 3 段；每个文字段 en 非空、cn 非空且不与 en 相同、含中文
 *   F5 文面：无翻译占位符 <e:N>/<s:N>、无 U+FFFD、无不可见字符、无广告脚本/导航/纯链接段
 * 警告（不拒收，只打印）：W1 译文中英文残留偏多（只数小写起头的拉丁词，专有名词不算）、W2 段落过短
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { cleanInvisible } from "./lib-text.mjs";
import { QUALITY_CANDIDATE_THRESHOLD, meetsImageGate, STAR_MIN_IMAGES } from "./recommend.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const IDS_FILE = (() => {
  const i = process.argv.indexOf("--ids-file");
  return i > 0 ? path.resolve(ROOT, process.argv[i + 1]) : null;
})();
const PRUNE = process.argv.includes("--prune");
const ALL = process.argv.includes("--all");
const STRICT_IDS = process.argv.includes("--strict-ids");

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
/* 「什么都不检查」绝不能被当成「检查通过」。
 * 这是真实踩过的坑：新文章全部不合格、被 --prune 剔除之后，拿同一份 ID 清单复查，
 * targets 里的 id 全都不在 ARTICLES 里了，主循环一个都没进、bad 为空、退出码 0 ——
 * 于是「全军覆没」被判成了「全部通过」。所以这里把「清单点名但文章不存在」单列出来。 */
const missingIds = [...targets].filter(id => !ARTICLES.some(a => a.id === id));
if (missingIds.length) {
  console.log(`清单里 ${missingIds.length} 个 id 在文章表中不存在：${missingIds.slice(0, 8).join(", ")}${missingIds.length > 8 ? " …" : ""}`);
}
if (!targets.size) {
  console.error("质检清单为空 —— 没有任何文章被检查，不能算通过。");
  process.exit(2);
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
const scored = ARTICLES.filter(a => a.scoreVersion && Number.isFinite(Number(a.qualityScore)) && Number.isFinite(Number(a.serverScore)));

for (const a of ARTICLES) {
  if (!targets.has(a.id)) continue;
  const F = [];

  /* F1 字段 */
  for (const k of ["id", "url", "cat", "title", "titleZh", "date"]) if (!String(a[k] || "").trim()) F.push(`F1 缺字段 ${k}`);
  if (!CATS.has(a.cat)) F.push(`F1 未知栏目「${a.cat}」`);

  /* F2 新鲜度（寓言为 1912 公版经典、成长为常青博主长文、明星含经年不过时的人物
     特写/档案访谈，均不参与时效判定） */
  if (a.cat !== "寓言" && a.cat !== "成长" && a.cat !== "明星" && a.cat !== "人物") {
    const t = a.date ? new Date(a.date).getTime() : NaN;
    if (!Number.isFinite(t)) F.push("F2 date 无法解析");
    else if (now - t > 40 * DAY) F.push(`F2 文章偏旧（${Math.round((now - t) / DAY)} 天前）`);
  }

  /* F3 封面（寓言/成长允许无封面，明星必须达到正文配图门槛） */
  if (a.cat !== "寓言" && a.cat !== "成长" && a.cat !== "明星") {
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
  const inlineImages = paras.filter(p => p && p.img).length;
  if (a.cat === "人物") {
    const unique = new Set([a.coverImg, ...paras.filter(p=>p?.img).map(p=>p.img)].filter(Boolean));
    if(unique.size < 4 || a.photoCount !== unique.size) F.push('F3 人物配图不足或计数不一致');
    if(a.readingMode === 'full') {
      if(a.contentStatus !== 'complete' || a.review?.scope !== 'full-original-text-and-photos') F.push('F4 人物原刊正文未完成复核');
      if(!a.sourceTextHash || !Number.isFinite(Number(a.sourceTextWords)) || Number(a.sourceTextWords)<450) F.push('F4 人物原文词数/指纹缺失');
      const actualWords=paras.filter(p=>!p.img).flatMap(p=>(p.sentences||[]).map(s=>String(s.en||''))).join(' ').match(/[A-Za-z]+(?:['’][A-Za-z]+)?/g)||[];
      if(Math.abs(actualWords.length-Number(a.sourceTextWords||0))>Math.max(20,Number(a.sourceTextWords||0)*0.05)) F.push(`F4 人物原文词数不一致（字段 ${a.sourceTextWords}，正文 ${actualWords.length}）`);
    } else if(a.readingMode !== 'guide' || a.review?.status !== 'approved' || !a.review?.visualChecked || !a.review?.guideChecked || !a.review?.articleChecked) F.push('F4 人物原文未审核');
    if(!Number.isFinite(Date.parse(a.date))) F.push('F2 人物原刊日期无效');
  }
  if (!meetsImageGate(a.cat, inlineImages)) F.push(`F3 明星正文配图不足（${inlineImages}/${STAR_MIN_IMAGES}）`);
  if (a.cat === "明星" && a.photoCount != null && Number(a.photoCount) !== inlineImages) {
    F.push(`F3 photoCount 不一致（字段 ${a.photoCount}，正文 ${inlineImages}）`);
  }
  for (const p of paras) {
    if (!p || !p.img) continue;
    const img = path.join(ROOT, p.img);
    if (!fs.existsSync(img)) F.push(`F3 正文图片文件不存在：${p.img}`);
  }
  const textParas = [];
  paras.forEach((p, pi) => {
    if (p.img) return;
    if (Array.isArray(p.sentences)) {
      if (!p.sentences.length) F.push(`F4 段 ${pi} 为空`);
      p.sentences.forEach((s, si) => textParas.push({ p: s, label: `段 ${pi}·句 ${si}` }));
    } else {
      textParas.push({ p, label: `段 ${pi}` });
    }
  });
  if (paras.length < (a.cat === "寓言" ? 2 : 3)) F.push(`F4 只有 ${paras.length} 段`);
  for (let i = 0; i < textParas.length; i++) {
    const { p, label } = textParas[i];
    const en = String(p.en || ""), cn = String(p.cn || "");
    if (!en.trim()) { F.push(`F4 ${label} en 为空`); continue; }
    if (!cn.trim()) { F.push(`F4 ${label} 漏译（cn 为空）`); continue; }
    if (cn === en) F.push(`F4 ${label} 译文与原文相同`);
    if (!CN_RE.test(cn)) F.push(`F4 ${label} 译文无中文`);
    for (const [name, txt] of [["en", en], ["cn", cn]]) {
      if (PLACEHOLDER.test(txt)) F.push(`F5 ${label} ${name} 残留翻译占位符`);
      if (txt.includes("\uFFFD")) F.push(`F5 ${label} ${name} 含替换字符 U+FFFD`);
      if (cleanInvisible(txt) !== txt) F.push(`F5 ${label} ${name} 残留不可见字符`);
      if (AD_CODE.test(txt)) F.push(`F5 ${label} ${name} 混入广告脚本`);
      if (NAV_PREFIX.test(txt)) F.push(`F5 ${label} ${name} 混入导航句`);
      if (BARE_LINK.test(txt)) F.push(`F5 ${label} ${name} 整段纯链接`);
    }
    /* W1 译文英文残留：只数**小写起头**的拉丁词 —— 专有名词与公司名（AWS、
     * Hugging Face、Unitree Robotics）在译文里保留英文是正确做法，原先一律计数
     * 会把「公司名清单」判成「没翻译干净」（实测 2 条 W1 全是这类误报）。
     * `\b[a-z]` 保证只从全小写词起算，首字母大写的一律放过。 */
    const latin = (cn.match(/\b[a-z][A-Za-z]{3,}/g) || []).length;
    if (latin > 8 && cn.length < 400) warned.push(`W1 ${a.id} ${label} 译文中英文残留偏多（${latin} 个英文词）`);
    if (en.length + cn.length < 60) warned.push(`W2 ${a.id} ${label} 过短`);
  }

  /* 新抓文章的评分是发布链的一部分；历史文章没有这些字段时保持兼容。 */
  if (a.scoreVersion) {
    const q = Number(a.qualityScore), d = Number(a.difficultyBaseScore), s = Number(a.serverScore);
    if (![q, d, s].every(Number.isFinite)) F.push("F6 推荐评分字段不完整");
    else if (q < QUALITY_CANDIDATE_THRESHOLD) F.push(`F6 质量分低于候选线（${q}）`);
    else if (q > 100 || d < 0 || d > 100 || s < 0 || s > 100) F.push("F6 推荐评分超出 0–100 范围");
  }

  if (F.length) bad.push({ id: a.id, fails: F });
  else ok.push(a.id);
}

/* ---------- 报告 ---------- */
console.log(`质检：合格 ${ok.length} · 拒收 ${bad.length} · 警告 ${warned.length} · 已带推荐评分 ${scored.length}/${ARTICLES.length}`);
for (const b of bad) console.log(`  ✗ ${b.id}\n      ${b.fails.join("\n      ")}`);
for (const w of warned.slice(0, 10)) console.log("  ⚠ " + w);

/* --strict-ids：清单点名的 id 必须都还在。--prune 之后再复查时不能用它（被剔除的
 * id 必然「不存在」），但「检查一批已知 id」时用它，能挡住清单一空就默认通过。 */
if (STRICT_IDS && missingIds.length) {
  console.error(`✗ --strict-ids：有 ${missingIds.length} 个清单 id 不在文章表中`);
  process.exit(1);
}

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

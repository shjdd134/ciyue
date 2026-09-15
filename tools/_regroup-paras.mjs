#!/usr/bin/env node
/* 词阅 WordLens —— 一次性修复：把被旧管线打散的段落边界接回来
 *
 * 为什么需要它：
 *   assets/data-articles-extra.js 里 19 篇中有 11 篇（gr- 成长类）是旧版 ingest 写的，
 *   形态是「一个句子 = 一个段落」（flat：{ en, cn }）。实测 1519 个 flat 段里
 *   1519 个只有一句 —— 原文的一段话被拆成了竖排句子清单，阅读页再怎么改排版也连不起来。
 *   对照原文 HTML 核实：thedankoe 那篇 105 个 <p> 里 49 个是多句段，确实被拆过。
 *
 * 做法（不改一个字的内容，只改分组）：
 *   1. 抓原文 HTML，取出 <p> 文本，归一化成一条「原文流」并记录每段在流里的区间；
 *   2. 现有句子按原文顺序，在流里从上次命中的位置继续找它的前 40 字符前缀；
 *      命中在哪个 <p> 区间里，这句就属于那个原段落；
 *   3. 同一原段落里的连续句子合并成 { sentences: [...] }（新格式，阅读页按段连续排版）；
 *   4. 未命中的句子保持原样自成一段（保守：不靠猜来造段落边界）；
 *   5. 图片段位置不动，分组不跨图片。
 *
 * 安全网（任一条不满足就整篇跳过，不写盘）：
 *   · 展开后的 (en, cn) 序列必须与原文逐字节一致、顺序一致 —— 分组是唯一变化；
 *   · 命中率 < 85% 视为源文不匹配（抓错页/改版），跳过该篇；
 *   · 默认 --dry 只报告，--apply 才写盘；写盘前建发布批次（rollback.mjs <批次号> 可还原）。
 *
 * 用法：
 *   node tools/_regroup-paras.mjs            # 只报告
 *   node tools/_regroup-paras.mjs --apply    # 写盘（自动建批次）
 *   node tools/_regroup-paras.mjs --only gr-listening --apply
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createBatch } from "./lib-release.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const FILE = path.join(ROOT, "assets", "data-articles-extra.js");
const args = process.argv.slice(2);
const APPLY = args.includes("--apply");
const ONLY = (() => { const i = args.indexOf("--only"); return i >= 0 ? args[i + 1] : ""; })();
/* --show：把合并后的前几段原文+译文打出来人工过一眼（段落合并只靠机器判定，语义要人看） */
const SHOW = args.includes("--show");
const MIN_HIT = 0.85;

/* ---------------- 文本归一化：只留字母数字与撇号，忽略标点/实体/大小写差异 ----------------
 * 两侧（原文 HTML 与已发布数据）走同一个归一化，才能拿前缀去流里定位。 */
const norm = s => String(s || "")
  .replace(/&nbsp;/gi, " ").replace(/&#8217;|&rsquo;/gi, "'").replace(/&#8216;|&lsquo;/gi, "'")
  .replace(/&ldquo;|&#8220;/gi, '"').replace(/&rdquo;|&#8221;/gi, '"')
  .replace(/&amp;/gi, "&").replace(/&#8212;|&mdash;/gi, "-").replace(/&hellip;|&#8230;/gi, " ")
  .replace(/&#39;|&apos;/gi, "'").replace(/&quot;/gi, '"')
  .replace(/[\u2018\u2019\u02BC]/g, "'").replace(/[\u201C\u201D]/g, '"')
  .replace(/[\u2013\u2014]/g, "-")
  .replace(/\s+/g, " ").trim().toLowerCase()
  .replace(/[^a-z0-9' ]+/g, "")
  .replace(/\s+/g, " ").trim();

const flatOf = a => (a.paras || []).filter(p => p && !p.img && !Array.isArray(p.sentences));
const pairsOf = a => (a.paras || []).flatMap(p => {
  if (!p || p.img) return [];
  return Array.isArray(p.sentences) ? p.sentences.map(s => [s.en, s.cn]) : [[p.en, p.cn]];
});

function parasFromHtml(html) {
  const h = html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "");
  return [...h.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)]
    .map(m => norm(m[1].replace(/<[^>]+>/g, " ")))
    .filter(t => t.length > 20);
}

/* 原文流 + 每段区间：[start, end, 段号] */
function buildStream(paras) {
  let stream = "";
  const bounds = [];
  paras.forEach((t, i) => { bounds.push([stream.length, stream.length + t.length, i]); stream += t + " "; });
  return { stream, bounds };
}
const segAt = (bounds, pos) => {
  for (const [a, b, i] of bounds) if (pos >= a && pos < b) return i;
  return -1;
};

/* 把一篇 flat 文章的 paras 重新分组（返回 null = 不改这篇） */
function regroup(a, paras) {
  const { stream, bounds } = buildStream(paras);
  /* 先算出每个「已发布句子」落在哪个原段落（-1 = 未命中） */
  const segs = [];
  let cursor = 0, hit = 0;
  for (const p of a.paras || []) {
    if (p.img || Array.isArray(p.sentences)) { segs.push(null); continue; }
    const n = norm(p.en);
    if (n.length < 12) { segs.push(-1); continue; }
    const probe = n.slice(0, 40);
    const pos = stream.indexOf(probe, cursor);
    if (pos < 0) { segs.push(-1); continue; }
    cursor = pos + probe.length;
    segs.push(segAt(bounds, pos));
    hit++;
  }
  const total = flatOf(a).length;
  const rate = total ? hit / total : 0;
  if (rate < MIN_HIT) return { skip: `命中率 ${(rate * 100).toFixed(0)}% < ${MIN_HIT * 100}%`, hit, total };

  /* 再按「同一原段落 + 连续」合并；遇到图片段必断开，未命中(-1)的句子自成一段 */
  const out = [];
  let group = null, groupSeg = null;
  const flush = () => { if (group) { out.push(group.length === 1 ? group[0] : { sentences: group.slice() }); group = null; groupSeg = null; } };
  a.paras.forEach((p, i) => {
    if (p.img || Array.isArray(p.sentences)) { flush(); out.push(p); return; }
    const seg = segs[i];
    if (seg < 0) { flush(); out.push(p); return; }
    if (!group || seg !== groupSeg) { flush(); group = []; groupSeg = seg; }
    group.push(p);
  });
  flush();
  return { paras: out, hit, total, rate };
}

/* ---------------- 读数据文件（head / 数组 / tail 分开，写回时只换数组） ----------------
 * 正则与重建方式必须与 ingest.mjs 完全一致（第 1 组含 `const ARTICLES_EXTRA = `）：
 * 少接一段就会把声明头丢掉、整份数据报 ReferenceError（第一次就踩了）。 */
const src = fs.readFileSync(FILE, "utf8");
const m = src.match(/(const ARTICLES_EXTRA = )(\[[\s\S]*?\n\])(;)/);
if (!m) { console.error("找不到 ARTICLES_EXTRA 数组，放弃"); process.exit(1); }
const head = src.slice(0, m.index);
const tail = src.slice(m.index + m[0].length);
const list = JSON.parse(m[2]);

console.log(`读取 ${list.length} 篇${APPLY ? "（--apply 会写盘）" : "（--dry 只报告）"}\n`);
const changed = [];
for (const a of list) {
  if (ONLY && !a.id.includes(ONLY)) continue;
  const flats = flatOf(a);
  if (!flats.length) continue;                      // 已是嵌套格式，不动
  if (!/^https?:/.test(a.url || "")) {
    console.log(`· ${a.id}\n  跳过：没有可抓的原文 URL（${(a.url || "无").slice(0, 70)}）· ${flats.length} 段仍为单句`);
    continue;
  }
  let html;
  try {
    const r = await fetch(a.url, { headers: { "user-agent": "Mozilla/5.0 (compatible; WordLensBot/1.0)" }, redirect: "follow" });
    if (!r.ok) throw new Error("HTTP " + r.status);
    html = await r.text();
  } catch (e) {
    console.log(`· ${a.id}\n  跳过：抓取失败（${e.message}）· ${flats.length} 段仍为单句`);
    continue;
  }
  const r = regroup(a, parasFromHtml(html));
  if (r.skip) { console.log(`· ${a.id}\n  跳过：${r.skip}（守住「不靠猜造段落」）`); continue; }

  /* 安全网：分组前后 (en, cn) 序列必须逐字节一致 */
  const beforePairs = JSON.stringify(pairsOf(a));
  const trial = { ...a, paras: r.paras };
  if (JSON.stringify(pairsOf(trial)) !== beforePairs) {
    console.log(`· ${a.id}\n  ✗ 句子序列发生变化，整篇跳过（这是硬错误，请检查脚本）`);
    continue;
  }
  const merged = r.paras.filter(p => Array.isArray(p.sentences)).length;
  const singles = r.paras.filter(p => p && !p.img && !Array.isArray(p.sentences)).length;
  console.log(`· ${a.id}\n  ${flats.length} 段（${r.hit} 句定位到原文，${(r.rate * 100).toFixed(0)}%）→ ${merged} 个多句段 + ${singles} 个单句段 · 段落总数 ${a.paras.length} → ${r.paras.length}`);
  if (SHOW) {
    const samples = r.paras.filter(p => Array.isArray(p.sentences)).slice(0, 3);
    samples.forEach((p, k) => {
      console.log(`  ── 合并段 ${k + 1}（${p.sentences.length} 句）`);
      console.log(`   EN: ${p.sentences.map(s => s.en).join(" ").slice(0, 300)}`);
      console.log(`   CN: ${p.sentences.map(s => s.cn).join("").slice(0, 200)}`);
    });
  }
  changed.push({ a, paras: r.paras, merged, singles, flats: flats.length });
}

if (!changed.length) { console.log("\n没有可改的文章。"); process.exit(0); }
if (!APPLY) {
  console.log(`\n[dry] 将改动 ${changed.length} 篇（共接回 ${changed.reduce((n, c) => n + c.flats, 0)} 个单句段的边界）。加 --apply 写盘。`);
  process.exit(0);
}

const byId = new Map(changed.map(c => [c.a.id, c]));
const next = list.map(a => (byId.has(a.id) ? { ...a, paras: byId.get(a.id).paras } : a));

/* 写盘前自检：重建出来的文件必须能求值出同一个数组。
 * 「漏接声明头」这类错误在写入时不会报错，只会在页面加载时炸掉整站（已踩过一次），
 * 必须在写盘前拦住。 */
{
  const probe = head + m[1] + JSON.stringify(next, null, 2) + m[3] + tail;
  const ctx2 = vm.createContext({ console });
  try {
    vm.runInContext(probe, ctx2, { filename: "probe" });
    const back = vm.runInContext("ARTICLES_EXTRA", ctx2);
    if (!Array.isArray(back) || JSON.stringify(back) !== JSON.stringify(next)) {
      throw new Error(`重建出的数组与预期不一致（${back && back.length} vs ${next.length} 篇）`);
    }
  } catch (e) {
    console.error(`\n✗ 写盘前自检失败：${e.message}\n  未写盘，原文件保持不动。`);
    process.exit(1);
  }
}

/* 写盘前建批次：出问题可以 node tools/rollback.mjs <批次号> 完整还原 */
const batch = createBatch(ROOT, { label: "regroup-paras" });
console.log(`\n批次 ${batch.id} 已建立（回滚：node tools/rollback.mjs ${batch.id}）`);
fs.writeFileSync(FILE, head + m[1] + JSON.stringify(next, null, 2) + m[3] + tail);
console.log(`已写回 ${path.relative(ROOT, FILE)}：${changed.length} 篇重新分组`);

#!/usr/bin/env node
/* 词阅 WordLens —— 修复库内正文配图的排布与错配
 *
 * 什么时候用：
 *   ① qc.mjs 报 `F3 正文配图堆叠`（相邻两图之间文字太少 / 一连串图中间没有文字）
 *   ② qc.mjs 报 `F3 正文图与封面重复`（同一张照片在阅读页出现两遍）
 *   ③ 人工发现某篇配错图（结构判据抓不到这一类，见 lib-figures.mjs 顶注）
 *
 * 为什么是一个脚本、而不是手改 data-articles-extra.js：
 *   那个文件头写着「自动生成，请勿手改」，但项目里已经有先例 ——
 *   `_dedup-sentences.mjs` / `_regroup-paras.mjs` / `_sync-people-fields.mjs`
 *   都是「动了库内正文之后」的一次性维护工具。本脚本沿用同一形状：
 *   **默认只报告，--apply 才写盘**，写盘前用 vm 重建整份数组做自检，并先建批次
 *   （回滚：node tools/rollback.mjs <批次号>）。
 *
 * 它同时是「配图闸门的实测表」：报告里逐篇打出现有指标与是否合格，
 * 改阈值之前先看这张表全库的命中情况，别拿单篇下结论。
 *
 * 用法：
 *   node tools/_repair-figures.mjs            # 只报告（含全库闸门状态）
 *   node tools/_repair-figures.mjs --apply    # 写盘
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createBatch } from "./lib-release.mjs";
import {
  TIGHT_GAP_MIN, MAX_TIGHT_GAPS, MAX_RUN,
  figureRunStats, stackingIssues, coverDuplicateIndex, spreadStackedFigures,
} from "./lib-figures.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const FILE = path.join(ROOT, "assets", "data-articles-extra.js");
const APPLY = process.argv.includes("--apply");

/* ── 显式修复表 ───────────────────────────────────────────────────────────────
 * 只放**判据抓不到、必须人工定性**的那一类。键是文章 id，值是理由（要能复查）。
 *
 * 2026-09-20 gr-how-to-fix-your-entire-life-in-1-day：
 *   4 张内嵌图里有 2 张是莫妮卡·贝鲁奇的 Bulgari 活动照（`-3.jpg` / `-4.jpg`），
 *   与 Dan Koe 那篇讲行为改变与目的论的长文毫无关系。
 *   复核方式（可重跑）：
 *     ① 抓实时页面：curl -L https://letters.thedankoe.com/p/how-to-fix-your-entire-life-in-1 → .tmp/orig/dk-fix-life.html
 *     ② 只读抽取：node tools/ingest.mjs --dump-blocks .tmp/orig/dk-fix-life.html
 *        实测输出「文字块 213（列表/标题 80）· 图 2 · 词 5446」—— 文字块数与库内 213 段
 *        逐数吻合，说明就是同一篇；而**图只有 2 张**。
 *     ③ 把那 2 张抓下来人眼比对：一张是 AQAL 整合图谱（= 库内 `-1.jpg`）、
 *        一张是「转向灯塔」示意图（= 库内 `-2.jpg`）—— 正是正文在讲的内容。
 *        贝鲁奇那两张在源页上**没有任何对应**。
 *   结论：`-3`/`-4` 是 2026-09-16 那次抓取的瞬时产物（当时页面/推荐位与现在不同），
 *   判为污染数据删除。成长通道已停用（ingest.mjs 的 FEEDS 为空），不会再有同类污染。
 *
 * ⚠️ 图片文件本身（assets/covers/...-3.jpg / -4.jpg）**本脚本不删**。
 *   删图要走 publish 的 delete[] 路线，而那条路线会同时改写权威基线 articles[]，
 *   在本仓库有并行 agent 改数据时把中途状态判成「都不要了」（历史实测删过 43 项）。
 *   摘掉引用之后这两张已无人访问，纯属 130KB 死重，留作后续单开一轮清理。 */
const EXPLICIT_DROPS = {
  "gr-how-to-fix-your-entire-life-in-1-day": {
    imgs: [
      "assets/covers/gr-how-to-fix-your-entire-life-in-1-day-3.jpg",
      "assets/covers/gr-how-to-fix-your-entire-life-in-1-day-4.jpg",
    ],
    why: "源页只抽出 2 张图（AQAL 图谱 + 转向灯塔示意），这两张是莫妮卡·贝鲁奇时尚照，查无对应",
  },
};

/* ── 1. 载入 ────────────────────────────────────────────────────────────────── */
const src = fs.readFileSync(FILE, "utf8");
const m = src.match(/(const ARTICLES_EXTRA = )(\[[\s\S]*?\n\])(;)/);
if (!m) { console.error("找不到 ARTICLES_EXTRA 数组，放弃"); process.exit(1); }
const head = src.slice(0, m.index);
const tail = src.slice(m.index + m[0].length);
const list = JSON.parse(m[2]);

/* ── 2. 规划修复（纯函数，不碰 list） ──────────────────────────────────────── */
/* 收的是 **paras 数组**，不是文章对象。
 * （初版把两种都写成 `stat(x)` → `figureRunStats(x.paras)`，传数组时 `x.paras` 恒为
 *  undefined、`figureRunStats` 对空数组不报错而是老实返回全 0，报告里于是印出
 *  「改后 图 0」—— 而下面那张全库表印的是 18/4/6/2。同一屏两个数打架才发现的。
 *  凡是「工具能悄悄返回一个合法但错的数」的地方，都会这样骗过一轮。） */
const stat = paras => {
  const s = figureRunStats(paras);
  return `图 ${String(s.imgN).padStart(2)} · 最长连放 ${s.maxRun} · 紧缝 ${s.tightGaps}/${s.gaps.length}`;
};
/* 把 paras 复制一份再改 —— 报告模式绝不能就地改到 list（下面还要拿它做对照） */
const clone = a => ({ ...a, paras: a.paras.slice() });

const plans = [];
for (const a of list) {
  let next = clone(a);
  const before = stat(a.paras);
  const beforeIssues = stackingIssues(a.paras);
  const notes = [];

  /* ① 封面重复：阅读页页首已经渲染 coverImg，正文里再来一张同一个文件就是同一张照片出现两遍 */
  const dupAt = coverDuplicateIndex(next.paras, a.coverImg);
  if (dupAt >= 0) {
    next.paras.splice(dupAt, 1);
    notes.push(`摘掉正文第 ${dupAt} 段的封面重复（${a.coverImg.split("/").pop()}）`);
  }

  /* ② 人工定性过的错配 */
  const drop = EXPLICIT_DROPS[a.id];
  if (drop) {
    const hit = next.paras.filter(p => p && drop.imgs.includes(p.img));
    if (hit.length) {
      next.paras = next.paras.filter(p => !(p && drop.imgs.includes(p.img)));
      notes.push(`删掉 ${hit.length} 张错配图 —— ${drop.why}`);
    }
  }

  /* ③ 仍然堆图就摊开（内部自带「本来合格就不动」的短路） */
  const afterDupAndDrop = next.paras;
  const spread = spreadStackedFigures(afterDupAndDrop);
  if (spread !== afterDupAndDrop) {
    next.paras = spread;
    notes.push("按全篇均分摊开（图序与文字顺序不变）");
  }

  const changed = notes.length > 0;
  const afterIssues = stackingIssues(next.paras);
  if (!changed) continue;

  /* photoCount / 封面唯一集一致性：qc.mjs F3 拿 Set(封面 + 正文图) 与 photoCount 对账。
   * 摘封面重复**不会**改变这个集合的大小（那张图仍作为封面在用），所以正常情况下
   * 不该有任何变化 —— 变了说明这次改动动到了图片总数，必须显式写回。 */
  const uniq = arr => new Set([a.coverImg, ...arr.filter(p => p && p.img).map(p => p.img)].filter(Boolean)).size;
  const pcBefore = uniq(a.paras), pcAfter = uniq(next.paras);
  if (a.photoCount != null && Number(a.photoCount) !== pcAfter) {
    next.photoCount = pcAfter;
    notes.push(`photoCount ${a.photoCount} → ${pcAfter}（图片唯一集大小变了）`);
  }

  plans.push({ a, next, before, after: stat(next.paras), beforeIssues, afterIssues, notes, pcBefore, pcAfter });
}

/* ── 3. 报告 ────────────────────────────────────────────────────────────────── */
console.log(`配图闸门口径：紧缝(<${TIGHT_GAP_MIN} 个文字段) >= ${MAX_TIGHT_GAPS} 处 · 最长连放 >= ${MAX_RUN}\n`);
console.log("【改前 / 改后】");
if (!plans.length) console.log("  （没有需要改的文章）");
for (const p of plans) {
  console.log(`\n· ${p.a.id}  [${p.a.cat}]`);
  console.log(`    ${p.before}   →   ${p.after}`);
  for (const n of p.notes) console.log(`    - ${n}`);
  if (p.beforeIssues.length) console.log(`    改前判红：${p.beforeIssues.join("；")}`);
  if (p.afterIssues.length) console.log(`    ⚠️ 改后仍判红：${p.afterIssues.join("；")}（摊不开，需要减图，人工处理）`);
  else console.log("    改后合格 ✓");
}

/* 全库闸门状态 —— 这才是「阈值合不合适」的实测表，别只看被改的那几篇 */
console.log("\n【全库闸门状态（改后）】");
const stillBad = [];
for (const p of plans) {
  if (p.afterIssues.length) stillBad.push(p.a.id);
}
const rows = list.map(a => {
  const patched = plans.find(p => p.a.id === a.id);
  const paras = patched ? patched.next.paras : a.paras;
  const issues = stackingIssues(paras);
  const dup = coverDuplicateIndex(paras, a.coverImg);
  return { id: a.id, cat: a.cat, s: figureRunStats(paras), issues, dup };
});
rows.sort((x, y) => y.s.imgN - x.s.imgN);
const pad = (s, n) => String(s).padEnd(n);
console.log("  " + pad("id", 42) + pad("栏", 5) + pad("文字段", 7) + pad("图", 4) + pad("最长连放", 9) + pad("紧缝", 8) + "判定");
let bad = 0;
for (const r of rows) {
  const fail = r.issues.length || r.dup >= 0;
  if (fail) bad++;
  console.log("  " + pad(r.id, 42) + pad(r.cat, 5) + pad(r.s.textN, 7) + pad(r.s.imgN, 4)
    + pad(r.s.maxRun, 9) + pad(`${r.s.tightGaps}/${r.s.gaps.length}`, 8)
    + (fail ? "✗ " + [...r.issues, r.dup >= 0 ? "正文图与封面重复" : ""].filter(Boolean).join("；") : "✓"));
}
console.log(`\n合格 ${rows.length - bad} / ${rows.length} 篇` + (bad ? `，判红 ${bad} 篇` : ""));

/* ── 4. 写盘 ────────────────────────────────────────────────────────────────── */
if (!plans.length) { console.log("\n无需写盘。"); process.exit(stillBad.length ? 1 : 0); }
if (!APPLY) { console.log("\n[dry] 加 --apply 写盘。"); process.exit(stillBad.length ? 1 : 0); }
if (stillBad.length) {
  console.error(`\n✗ 还有 ${stillBad.length} 篇改后仍判红（${stillBad.join("、")}）—— 拒绝写盘。`);
  console.error("  堆图摊不开说明图比文字还密，属于「该减图」而不是「该换位置」，需要人工定夺。");
  process.exit(1);
}

for (const p of plans) Object.assign(p.a, p.next);

const probe = head + m[1] + JSON.stringify(list, null, 2) + m[3] + tail;
{
  const ctx = vm.createContext({ console });
  try {
    vm.runInContext(probe, ctx, { filename: "probe" });
    const back = vm.runInContext("ARTICLES_EXTRA", ctx);
    if (!Array.isArray(back) || JSON.stringify(back) !== JSON.stringify(list)) {
      throw new Error(`重建数组不一致（${back && back.length} 篇）`);
    }
  } catch (e) {
    console.error(`\n✗ 写盘前自检失败：${e.message}\n  未写盘。`);
    process.exit(1);
  }
}
const batch = createBatch(ROOT, { label: "repair-figures" });
console.log(`\n批次 ${batch.id} 已建立（回滚：node tools/rollback.mjs ${batch.id}）`);
fs.writeFileSync(FILE, probe);
console.log(`已写回 ${path.relative(ROOT, FILE)}（改 ${plans.length} 篇）`);
console.log("下一步：node tools/_sync-people-fields.mjs   # 确认对账字段没被带偏");

#!/usr/bin/env node
/* 词阅 WordLens —— 删重复句（提取管线产生的副本）
 *
 * 背景（2026-09-17）：
 *   全库查出 20 组「归一化后 en 相同」的句子。其中 10 组是 Dan Koe 三篇共享的页脚/订阅块
 *   （跨篇，每篇各有一份，属页面结构，不是缺陷）；kb 的 2 组回原文核对后是**作者本意重复**
 *   （原文各出现 2 次）—— 都不动。真正要处理的是同篇内的 8 组：原文各只出现 1 次。
 *
 * 怎么认「哪一份是副本」（判据来自实测，不是猜的）：
 *   副本一律带**重新分词留下的空白痕迹** —— 标点前多一个空格，或句末多一个 `”`：
 *     · `Cannes."`   vs `Cannes ."`      ← 副本
 *     · `heroines,`  vs `heroines ,`
 *     · `Bacall,`    vs `Bacall ,`
 *     · `Memoirs,`   vs `Memoirs ,`
 *     · `Mamma,`     vs `Mamma ,` / `Memory,` vs `Memory ,`
 *     · `person.`    vs `person. ”`      ← 副本
 *   英文原串是权威，**保留无痕迹的那一份，删有痕迹的**。
 *   两对没有痕迹的（`Next up for the star?` / `So pretty, so graceful.`）——它们与各自的
 *   伙伴同属一个被注入的块，按同伴的判定一并删。
 *
 * 安全网：
 *   · 删除清单是**显式写死**的（artId + paraIndex + sentenceIndex），不接受自动推断；
 *   · 写盘前断言「展平后的 (en, cn) 序列 = 原序列按索引删除后的结果」——逐字节比对；
 *   · 断言没有段落被删空（删空会让阅读页出现空段，是别的问题，不该由本脚本顺手处理）；
 *   · 默认 --dry 只报告，--apply 才写盘（写盘前建批次，rollback.mjs <批次号> 可还原）。
 *
 * 用法：
 *   node tools/_dedup-sentences.mjs            # 只报告
 *   node tools/_dedup-sentences.mjs --apply
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createBatch } from "./lib-release.mjs";
import { syncPeopleSourceFields } from "./lib-article-fields.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const FILE = path.join(ROOT, "assets", "data-articles-extra.js");
const APPLY = process.argv.includes("--apply");

/* 删除清单：1 基段落下标 + 1 基段内句序。顺序无关，按篇分组只为好读。 */
const MONICA = "people-monica-bellucci-style-and-change";
const ANNE = "people-anne-hathaway-mother-mary";
const TARGETS = [
  { id: MONICA, pi: 2, si: 1, why: "副本：en 末 `Cannes .`（多空格）。原文一份在 p1-s3。" },
  { id: MONICA, pi: 7, si: 1, why: "副本：`heroines ,`。原文一份在 p5-s5。" },
  { id: MONICA, pi: 8, si: 4, why: "副本：`Bacall ,`。原文一份在 p8-s3。" },
  { id: MONICA, pi: 12, si: 6, why: "副本：`Memoirs ,`。原文一份在 p12-s5。" },
  { id: MONICA, pi: 14, si: 1, why: "副本：与 p13-s6 完全相同，同属 p14 开头的注入块。" },
  { id: MONICA, pi: 14, si: 2, why: "副本：`Mamma ,` + `Memory ,`。原文一份在 p13-s7。" },
  { id: ANNE, pi: 8, si: 9, why: "副本：与 p8-s7 完全相同，同属被注入的 (X,Y) 块。" },
  { id: ANNE, pi: 8, si: 10, why: "副本：`person. ”`（末尾多空格+引号）。原文一份在 p8-s8。" },
];

const src = fs.readFileSync(FILE, "utf8");
const m = src.match(/(const ARTICLES_EXTRA = )(\[[\s\S]*?\n\])(;)/);
if (!m) { console.error("找不到 ARTICLES_EXTRA 数组，放弃"); process.exit(1); }
const head = src.slice(0, m.index);
const tail = src.slice(m.index + m[0].length);
const list = JSON.parse(m[2]);

const byId = new Map(list.map(a => [a.id, a]));
const at = (a, pi, si) => {
  const p = (a.paras || [])[pi - 1];
  if (!p) return null;
  const arr = Array.isArray(p.sentences) ? p.sentences : (p.en || p.cn ? [p] : []);
  return arr[si - 1] || null;
};

/* 展平（两种段落形状都要吃）+ 序列指纹 */
const flat = a => (a.paras || []).flatMap(p => {
  if (Array.isArray(p.sentences)) return p.sentences.map(s => [s.en, s.cn]);
  if (p.en || p.cn) return [[p.en, p.cn]];
  return [];
});

const bad = [];
for (const t of TARGETS) {
  const a = byId.get(t.id);
  if (!a) { bad.push(`找不到文章 ${t.id}`); continue; }
  const s = at(a, t.pi, t.si);
  if (!s) { bad.push(`${t.id} p${t.pi}-s${t.si} 不存在`); continue; }
  const p = a.paras[t.pi - 1];
  const n = Array.isArray(p.sentences) ? p.sentences.length : 1;
  if (n <= 1) bad.push(`${t.id} p${t.pi} 只有 ${n} 句，删掉会变空段`);
  t.en = s.en; t.cn = s.cn;
}
if (bad.length) { console.error("清单自检失败：\n  " + bad.join("\n  ")); process.exit(1); }

console.log(`删除清单 ${TARGETS.length} 条（${APPLY ? "--apply 会写盘" : "--dry 只报告"}）\n`);
for (const t of TARGETS) {
  const tag = t.id === MONICA ? "monica" : "anne";
  console.log(`· ${tag} p${t.pi}-s${t.si}`);
  console.log(`    ${t.why}`);
  console.log(`    EN: ${JSON.stringify(t.en).slice(0, 110)}`);
}

/* 构造新数组 */
const next = list.map(a => {
  const mine = TARGETS.filter(t => t.id === a.id);
  if (!mine.length) return a;
  const paras = a.paras.map((p, i) => {
    const drops = mine.filter(t => t.pi === i + 1).map(t => t.si);
    if (!drops.length) return p;
    if (!Array.isArray(p.sentences)) return p;   // 单句段不可能有重复（上面已拦）
    return { ...p, sentences: p.sentences.filter((_, si) => !drops.includes(si + 1)) };
  });
  /* 删句会让正文变短 → 人物篇的 sourceTextWords/sourceParagraphs 必须同步重算，
   * 否则 qc F4 直接拒收该篇（实测踩过：字段 1063 vs 正文 915）。 */
  const na = { ...a, paras };
  const fixed = syncPeopleSourceFields(na);
  if (fixed) console.log(`· ${a.id} 对账字段同步 ${fixed} 项（sourceTextWords/sourceParagraphs）`);
  return na;
});

/* 安全网：展平序列必须「恰好等于」原序列按索引删掉那些项 —— 逐字节比对 */
{
  const removed = new Set(TARGETS.map(t => `${t.id}#${t.pi}#${t.si}`));
  const expect = [];
  for (const a of list) (a.paras || []).forEach((p, pi) => {
    if (Array.isArray(p.sentences)) p.sentences.forEach((s, si) => expect.push([a.id, pi + 1, si + 1, s.en, s.cn]));
    else if (p.en || p.cn) expect.push([a.id, pi + 1, 1, p.en, p.cn]);
  });
  const kept = expect.filter(([id, pi, si]) => !removed.has(`${id}#${pi}#${si}`)).map(x => x.slice(3));

  const actual = [];
  for (const a of next) flat(a).forEach(x => actual.push(x));
  if (JSON.stringify(actual) !== JSON.stringify(kept)) {
    console.error(`\n✗ 展平序列不一致（预期 ${kept.length} 句，实际 ${actual.length} 句）—— 未写盘。`);
    const n = Math.min(actual.length, kept.length);
    for (let i = 0; i < n; i++) if (JSON.stringify(actual[i]) !== JSON.stringify(kept[i])) {
      console.error(`  首个差异 @${i}\n    预期 ${JSON.stringify(kept[i])}\n    实际 ${JSON.stringify(actual[i])}`); break;
    }
    process.exit(1);
  }
  /* 段落不能变空 */
  for (const a of next) (a.paras || []).forEach((p, i) => {
    if (Array.isArray(p.sentences) && !p.sentences.length) { console.error(`✗ ${a.id} p${i + 1} 被删空，未写盘。`); process.exit(1); }
  });
  const before = list.reduce((n, a) => n + flat(a).length, 0);
  console.log(`\n句数 ${before} → ${actual.length}（-${before - actual.length}）`);
}

if (!APPLY) { console.log("\n[dry] 加 --apply 写盘。"); process.exit(0); }

const probe = head + m[1] + JSON.stringify(next, null, 2) + m[3] + tail;
{
  const ctx = vm.createContext({ console });
  try {
    vm.runInContext(probe, ctx, { filename: "probe" });
    const back = vm.runInContext("ARTICLES_EXTRA", ctx);
    if (!Array.isArray(back) || JSON.stringify(back) !== JSON.stringify(next)) throw new Error(`重建数组不一致（${back && back.length} 篇）`);
  } catch (e) {
    console.error(`\n✗ 写盘前自检失败：${e.message}\n  未写盘。`);
    process.exit(1);
  }
}

const batch = createBatch(ROOT, { label: "dedup-sentences" });
console.log(`\n批次 ${batch.id} 已建立（回滚：node tools/rollback.mjs ${batch.id}）`);
fs.writeFileSync(FILE, probe);
console.log(`已写回 ${path.relative(ROOT, FILE)}`);

/* 只读勘察：解析 5 篇，打印对齐报告 + 孤儿块清单。
 * 用法：node tools/_offbook-inspect.mjs [--orphans] [--section=a02:7]
 */
import fs from "node:fs";
import path from "node:path";
import { parseEssay, splitSentencesLossless } from "./lib-offbook.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const DIR = path.join(ROOT, ".tmp", "offbook");

const SLUGS = [
  ["a01", "on-cognitive-decoupling"],
  ["a02", "rebuilding-learning"],
  ["a03", "breakdown-of-firms"],
  ["a04", "mirage-of-form"],
  ["a05", "teaching-and-training-disqualified"],
];

const onlyOrphans = process.argv.includes("--orphans");
const secArg = (process.argv.find(a => a.startsWith("--section=")) || "").split("=")[1];
const dumpArg = (process.argv.find(a => a.startsWith("--dump=")) || "").split("=")[1];

/* 并排 dump 某一节（--dump=a03:5），供人工判断对齐是否可信 */
if (dumpArg) {
  const [k, si] = dumpArg.split(":");
  const [, slug] = SLUGS.find(x => x[0] === k) || [];
  const doc = parseEssay(fs.readFileSync(path.join(DIR, `${k}.html`), "utf8"), { slug });
  const s = doc.sections[+si];
  console.log(`\n=== ${k} 节[${si}] zh「${s.headZh}」 ↔ en「${s.headEn}」 (level ${s.level}) ===`);
  const lim = process.argv.includes("--full") ? 4000 : 96;
  s.blocks.forEach((b, i) => {
    const flag = b.zhOnly ? " ⚠仅zh" : b.enOnly ? " ⚠仅en" : "";
    console.log(`\n#${String(i).padStart(2)} <${b.tag}>${flag}`);
    console.log(`  zh ${b.zh.slice(0, lim)}`);
    console.log(`  en ${b.en.slice(0, lim)}`);
  });
  process.exit(0);
}

let grand = { p: 0, sents: 0, orphans: 0, mismatch: 0 };
for (const [key, slug] of SLUGS) {
  const file = path.join(DIR, `${key}.html`);
  if (!fs.existsSync(file)) { console.log(`${key} 缺文件`); continue; }
  const html = fs.readFileSync(file, "utf8");
  let doc;
  try {
    doc = parseEssay(html, { slug, url: `https://offbook.press/essays/${slug}/` });
  } catch (e) {
    console.log(`\n${key} ✗ ${e.message}`);
    continue;
  }
  if (onlyOrphans) continue;

  const blocks = doc.sections.flatMap(s => s.blocks);
  const ps = blocks.filter(b => b.tag === "p");
  const sents = ps.flatMap(b => splitSentencesLossless(b.en));
  grand.p += ps.length; grand.sents += sents.length;
  grand.orphans += doc.report.orphanZh + doc.report.orphanEn;
  grand.mismatch += doc.report.mismatched.length;

  console.log(`\n${key}  ISSUE ${doc.issue}  ${doc.title}`);
  console.log(`   节 ${doc.sections.length} · 块 ${blocks.length} · <p> ${ps.length} · 英文句 ${sents.length}`);
  console.log(`   合并组 ${doc.report.merged} · 不等的节 ${doc.report.mismatched.length} · 孤儿 zh ${doc.report.orphanZh} / en ${doc.report.orphanEn}`);
  for (const m of doc.report.mismatched) {
    console.log(`     ✗ 节[${m.section}] zh「${m.headZh.slice(0, 20)}」${m.zh}块 ≠ en「${m.headEn.slice(0, 28)}」${m.en}块 → 合并 ${m.merged} · 仅zh ${m.orphanZh} · 仅en ${m.orphanEn}`);
  }
  /* 单块正文块占比：合并过头会把整节糊成一块，这里给一个可观察的数 */
  const secBlocks = doc.sections.flatMap(s => s.blocks);
  const mergeHist = new Map();
  for (const b of secBlocks) {
    const k = `${b.mergedZ || 1}:${b.mergedE || 1}`;
    mergeHist.set(k, (mergeHist.get(k) || 0) + 1);
  }
  console.log(`   分组形状：` + [...mergeHist.entries()].sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k}×${v}`).join(" "));
}

/* ---- 孤儿块明细 ---- */
if (onlyOrphans || secArg) {
  console.log("\n================ 孤儿块明细 ================");
  for (const [key, slug] of SLUGS) {
    const file = path.join(DIR, `${key}.html`);
    if (!fs.existsSync(file)) continue;
    let doc; try { doc = parseEssay(fs.readFileSync(file, "utf8"), { slug }); } catch { continue; }
    if (secArg && !secArg.startsWith(key)) continue;
    doc.sections.forEach((s, si) => {
      if (secArg && secArg !== `${key}:${si}`) return;
      for (const b of s.blocks) {
        if (b.zhOnly) console.log(`${key} 节[${si}]「${s.headZh.slice(0, 18)}」仅中文 <${b.tag}> ${b.zh.slice(0, 90)}`);
        if (b.enOnly) console.log(`${key} 节[${si}]「${s.headZh.slice(0, 18)}」仅英文 <${b.tag}> ${b.en.slice(0, 90)}`);
      }
    });
  }
}

console.log(`\n===== 合计 =====`);
console.log(`<p> ${grand.p} 段 · 英文句 ${grand.sents} · 不等的节 ${grand.mismatch} · 孤儿块 ${grand.orphans}`);

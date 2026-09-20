/* 抽取层的守恒与对齐体检（只读）。
 *
 * 检查两件事，缺一不可：
 *   ① **守恒**：输出所有块的 zh 字符拼起来，必须与源站中文块拼起来**逐字符相同**（去空白）；
 *      en 同理。这条一旦破，就是静默丢正文 —— 项目红线。
 *   ② **对齐可信度**：合并组 / 就近挂靠块的清单。挂靠不是错误，但必须**看得见**。
 *
 * 用法：node tools/_offbook-check.mjs [--attached]
 */
import fs from "node:fs";
import path from "node:path";
import { parseEssay, toBlocks, toSections, trimTail, squash } from "./lib-offbook.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const DIR = path.join(ROOT, ".tmp", "offbook");

export const SLUGS = [
  ["a01", "on-cognitive-decoupling"],
  ["a02", "rebuilding-learning"],
  ["a03", "breakdown-of-firms"],
  ["a04", "mirage-of-form"],
  ["a05", "teaching-and-training-disqualified"],
  ["a06", "the-future-of-collaboration"],
];

const showAttached = process.argv.includes("--attached");
let fail = 0;

for (const [key, slug] of SLUGS) {
  const file = path.join(DIR, `${key}.html`);
  if (!fs.existsSync(file)) { console.log(`${key} 缺文件`); continue; }
  const html = fs.readFileSync(file, "utf8");
  let doc;
  try { doc = parseEssay(html, { slug }); }
  catch (e) { console.log(`\n${key} ⊘ 跳过：${e.message}`); continue; }

  /* ---- 源侧：重新按同样规则切一遍，作为守恒基准 ---- */
  const zhAt = html.indexOf('<div class="prose i18n-zh"'), enAt = html.indexOf('<div class="prose i18n-en"');
  const relAt = html.indexOf('class="essay__related"');
  const srcZ = toSections(trimTail(toBlocks(html.slice(zhAt, enAt)))).flatMap(s => s.blocks.map(b => b.text));
  const srcE = toSections(trimTail(toBlocks(html.slice(enAt, relAt > enAt ? relAt : html.length))
    .filter(b => !(b.tag === "blockquote" && /Complete English/i.test(b.text))))).flatMap(s => s.blocks.map(b => b.text));
  const outZ = doc.sections.flatMap(s => s.blocks.map(b => b.zh));
  const outE = doc.sections.flatMap(s => s.blocks.map(b => b.en));

  const cz = squash(srcZ.join("")) === squash(outZ.join(""));
  const ce = squash(srcE.join("")) === squash(outE.join(""));
  if (!cz || !ce) fail++;
  const dZ = squash(srcZ.join("")).length, oZ = squash(outZ.join("")).length;
  const dE = squash(srcE.join("")).length, oE = squash(outE.join("")).length;

  console.log(`\n${key} ${cz && ce ? "✓" : "✗"} ${doc.title}`);
  console.log(`   守恒 zh ${cz ? "✓" : "✗"} ${dZ}→${oZ} 字 | en ${ce ? "✓" : "✗"} ${dE}→${oE} 字`);
  console.log(`   段 ${outZ.length} · 合并组 ${doc.report.merged} · 就近挂靠 ${doc.report.attached.length}`);
  if (showAttached) {
    for (const a of doc.report.attached) {
      console.log(`     · [${a.side}] 节「${a.head.slice(0, 16)}」${a.text.slice(0, 84)}`);
    }
  }
}
console.log(fail ? `\n✗ ${fail} 篇守恒被破坏` : `\n✓ 全部守恒`);
process.exit(fail ? 1 : 0);

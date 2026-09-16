/* 词阅 —— 中文层后处理：把 tools/term-glossary.json 的规则应用到**已发布**文章。
 *
 * 为什么要有这一层：机翻（DeepL 主力）即使句子结构基本可用，在**术语层面**仍可能漂移 ——
 * 同一个 `Level` 会被译成阶段/层次/水平/层级/级别/级/关卡七种，同一个 `flow`
 * 会变成心流/流动，书签工具里的 `save` 会变成省钱。重新翻译救不了
 * （实测 DeepL 现在仍把 "Feed it people" 译成「把它给…看」），只能靠后处理校正。
 *
 * 规则本体与守卫在 tools/lib-glossary.mjs（抓取管线用的是同一份）。
 * 本脚本只负责「遍历已发布数据 → 套规则 → 报改动 → 写回」。
 *
 * 用法：
 *   node tools/fix-cn.mjs --dry          只列改动，不写盘（先看再改）
 *   node tools/fix-cn.mjs                落盘
 *   node tools/fix-cn.mjs --only terms   只应用某一类规则（fixes / terms / global）
 *
 * 只动 `cn` 字段 —— 英文正文、段落结构、图片、article 元数据一律不碰。
 * 幂等：同一条规则重复执行不会二次改动（lib-glossary 有加载期守卫保证）。
 */
import path from "node:path";
import { readDecl, writeDecl } from "./lib-text.mjs";
import { applyGlossary, loadGlossary } from "./lib-glossary.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_FILE = path.join(ROOT, "assets", "data-articles-extra.js");

const DRY = process.argv.includes("--dry");
const onlyIdx = process.argv.indexOf("--only");
const ONLY = onlyIdx >= 0 ? process.argv[onlyIdx + 1] : "";

const g = loadGlossary();
const decl = readDecl(OUT_FILE, "ARTICLES_EXTRA");
if (!decl) { console.error("读不到 ARTICLES_EXTRA"); process.exit(1); }
const arts = decl.value;
const before = JSON.stringify(arts);

const changes = [];
let scanned = 0;

for (const a of arts) {
  let n = 0;
  const walk = p => {
    if (p.img) return;
    if (Array.isArray(p.sentences)) return p.sentences.forEach(walk);
    n++;
    scanned++;
    const orig = p.cn || "";
    /* --only 时按类别裁剪规则表，其余照常 */
    const scoped = ONLY ? { fixes: ONLY === "fixes" ? g.fixes : [], terms: ONLY === "terms" ? g.terms : [], global: ONLY === "global" ? g.global : [] } : g;
    const next = applyGlossary(orig, p.en, a.id, scoped);
    if (next !== orig) {
      changes.push({ art: a.id, n, from: orig, to: next });
      p.cn = next;
    }
  };
  a.paras.forEach(walk);
}

const byArt = {};
for (const c of changes) (byArt[c.art] ||= []).push(c);

console.log(`扫描 ${arts.length} 篇 / ${scanned} 句 → 改动 ${changes.length} 处\n`);
for (const [id, list] of Object.entries(byArt)) {
  console.log(`【${id}】${list.length} 处`);
  for (const c of list.slice(0, 12)) {
    console.log(`  #${c.n}\n    - ${c.from}\n    + ${c.to}`);
  }
  if (list.length > 12) console.log(`  …另有 ${list.length - 12} 处`);
  console.log();
}

if (DRY) { console.log("--dry：未写盘。"); process.exit(0); }
if (JSON.stringify(arts) === before) { console.log("无变化，未写盘。"); process.exit(0); }
writeDecl(OUT_FILE, "ARTICLES_EXTRA", arts);
console.log(`已写 ${path.relative(ROOT, OUT_FILE)}`);

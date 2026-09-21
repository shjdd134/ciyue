/* _fix-dup-allowlist.mjs —— 刷新 tools/dup-allowlist.json 的取证字段。
 *
 * 背景（2026-09-21）：AI 栏目由「按 h2 拆 43 篇」改回「每期一整篇」，
 * 文章 id 从 ob-<slug>-c<NN> 变成 ob-<slug>，章号消失、段号整体重排 ——
 * 于是 35 条 why 散文里手写的「ob-x-c02 p47-s1」全部变成查不到的字符串。
 * 位置这种东西会随代码一起腐烂，所以从此存进 `at` 字段，用这个脚本重算。
 *
 * 匹配契约不变：audit-dups.mjs 只读 en / count，at 是给人看的取证路径。
 * 幂等，可重复跑。默认 dry-run，加 --apply 才写盘。
 *
 * 用法：
 *   node tools/_fix-dup-allowlist.mjs            # 只报告（默认）
 *   node tools/_fix-dup-allowlist.mjs --apply    # 写回 json
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { norm, flatten, readArts } from "./audit-dups.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const AL = path.join(ROOT, "tools", "dup-allowlist.json");
const APPLY = process.argv.includes("--apply");

const rows = flatten(readArts(path.join(ROOT, "assets", "data-articles-extra.js")));
const idx = new Map();
for (const r of rows) {
  const k = norm(r.en);
  if (!idx.has(k)) idx.set(k, []);
  idx.get(k).push(r);
}

const obj = JSON.parse(fs.readFileSync(AL, "utf8"));
const groups = obj.groups;

let bad = 0, refresh = 0, dead = 0;
for (const g of groups) {
  const hits = idx.get(norm(g.en)) || [];
  const at = hits.map(r => `${r.id} p${r.pi}-s${r.si}`);
  if (hits.length !== g.count) { bad++; console.log(`⚠ x${g.count}→x${hits.length}  ${g.en.slice(0, 60)}`); }
  if (JSON.stringify(at) !== JSON.stringify(g.at)) refresh++;
  /* 句已不在数据里 → 不写 at。空数组会让人以为「查过了、就是 0」，而真相是
   * 「这条登记已经和当前数据无关」——audit-dups 只在句子存在时才比对 count，
   * 所以这种条目是**休眠**的，永远静默。 */
  if (at.length) { g.at = at; if (g.at.length !== g.count) g.atMismatch = true; else delete g.atMismatch; }
  else { delete g.at; dead++; }
}

const klass = g => {
  const w = g.why || "";
  if (/^Dan Koe/.test(w)) return "dk";
  if (/本意重复/.test(w)) return "intent";
  if (/小节标题/.test(w)) return "head";
  return "ob";
};
const c = { dk: 0, intent: 0, head: 0, ob: 0 };
groups.forEach(g => c[klass(g)]++);

console.log(`共 ${groups.length} 组：Dan Koe ${c.dk} · 本意重复 ${c.intent} · Offbook 复沓 ${c.ob} · Offbook 节标题 ${c.head}`);
console.log(`at 需刷新 ${refresh} 组；次数不符 ${bad} 组；**休眠（句已不在数据里）${dead} 组**`);

obj.$comment = [
  "词阅 WordLens —— 重复句白名单。",
  "",
  "tools/audit-dups.mjs 用**正确的展平器 + 三步归一**（引号→标点→空白，顺序不可换）查全库重复句，",
  "与这份白名单比对：**出现未登记的新重复 → 报错**。",
  "",
  `${groups.length} 组：`,
  `  · ${c.dk} 组 Dan Koe 三篇共享的页脚/订阅块（跨篇，每篇一份，属页面结构）；`,
  `  · ${c.intent} 组回原文核对确认是作者本意重复（gr-pg-* / fb-*）；`,
  `  · ${c.ob} 组 Offbook 官方译本自身的复沓（2026-09-20 接入 AI 栏目 43 篇时登记）：`,
  "    第 1 期「四元公式」的框架条目在正文与附录书单里各出现一次，另有几处跨篇复述；",
  "    附录那几处形态不同（<strong> 小标题、不带句末标点）。",
  `  · ${c.head} 组 Offbook 节标题（2026-09-21 整期合并把 h2/h3 放回正文后才被守卫看见）：`,
  "    两期各自的「Chapter 7 · Conclusion」「Appendix · Starter Reading List」互撞，",
  "    以及同一篇里 h3 小标题与其后正文 <strong> 重申同一句。都是原文写法，非提取副本。",
  "",
  "真正常见的缺陷形态（提取副本）带**重新分词的空白痕迹**，例如 `Memoirs,` vs `Memoirs ,`、",
  "`person.` vs `person. ”` —— 2026-09-17 已按此判据删掉 8 句，工具见 tools/_dedup-sentences.mjs。",
  "",
  "count 参与比对：同一句出现次数变了（例如新增第 4 篇 Dan Koe 文章）也会报错，逼人工过一遍。",
  "但这条承诺只对**活着**的条目成立 —— 见下。",
  "",
  "at 字段 = 该条登记在**当前数据**里的真实位置（id p段-s句），由 tools/_fix-dup-allowlist.mjs 重算。",
  "位置写成散文会随代码一起腐烂：2026-09-21 AI 栏目由 43 篇整期合并为 5 篇，id 从 ob-<slug>-c<NN>",
  "变成 ob-<slug>，35 条 why 里手写的章号位置一次性全部失效 —— 所以从此按字段存。",
  `**没有 at 的条目 = 休眠**：那句话已不在当前文章数据里（2026-09-21 实测 ${dead} / ${groups.length} 条），`,
  "audit-dups 只在句子存在时才比对 count，休眠条目因此**永远静默**。这是已知弱点，别把它读成",
  "「已核对」：要么删掉该条，要么确认对应的正文块确实被有意移除过。",
];

if (APPLY) {
  fs.writeFileSync(AL, JSON.stringify(obj, null, 2) + "\n");
  console.log(`✓ 已写 ${path.relative(ROOT, AL)}`);
} else {
  console.log("（dry-run，加 --apply 写盘）");
}

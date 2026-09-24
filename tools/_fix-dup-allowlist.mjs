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
 *   node tools/_fix-dup-allowlist.mjs --prune-dormant            # 报告要删哪些休眠条目
 *   node tools/_fix-dup-allowlist.mjs --prune-dormant --apply    # 真删
 *
 * 为什么需要 --prune-dormant（2026-09-24 加）：文件头的 $comment 早就写着「休眠条目
 * **永远静默**，要么删掉、要么确认正文块被有意移除过」—— 但一直只有一把「报告」的尺子，
 * 没有「动手」的口子，于是休眠条目只增不减。AI 栏目 5 篇 + 人物 1 篇下架时，
 * 39 组里 35 组一次性进入休眠，才把这个缺口顶出来。
 * 判据只有一条：**这条登记的句子在当前文章数据里一个都找不到** → 删。
 * 它保护不了任何东西（audit-dups 只在句子存在时才比对 count），留着只会让人以为「查过了」。
 * 将来若某篇文章被恢复、它的重复句也跟着回来，audit-dups 会**报「未登记」** —— 那正是
 * 想要的行为：守卫该响的时候响，而不是被一条陈旧白名单悄悄捂住。
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
const PRUNE = process.argv.includes("--prune-dormant");
let groups = obj.groups;

const liveHits = g => idx.get(norm(g.en)) || [];

let bad = 0, refresh = 0, dead = 0;
const dormant = [];
for (const g of groups) {
  const hits = liveHits(g);
  const at = hits.map(r => `${r.id} p${r.pi}-s${r.si}`);
  if (hits.length !== g.count) { bad++; console.log(`⚠ x${g.count}→x${hits.length}  ${g.en.slice(0, 60)}`); }
  if (JSON.stringify(at) !== JSON.stringify(g.at)) refresh++;
  /* 句已不在数据里 → 不写 at。空数组会让人以为「查过了、就是 0」，而真相是
   * 「这条登记已经和当前数据无关」——audit-dups 只在句子存在时才比对 count，
   * 所以这种条目是**休眠**的，永远静默。 */
  if (at.length) { g.at = at; if (g.at.length !== g.count) g.atMismatch = true; else delete g.atMismatch; }
  else { delete g.at; dead++; dormant.push(g); }
}

if (PRUNE && dormant.length) {
  console.log(`\n--prune-dormant：${dormant.length} 组休眠登记，它们的句子在当前文章数据里一个都找不到`);
  dormant.forEach(g => console.log(`  - 原 x${g.count}  ${String(g.en).slice(0, 76)}`));
  groups = groups.filter(g => liveHits(g).length > 0);
  dead = 0;
}
obj.groups = groups;

/* 分类只用于生成 $comment 里的分档说明，**不参与任何判据**。
 * 2026-09-24 修过一次：原版按 `/^Dan Koe/` 和 `/本意重复/` 匹配，而剩下那 4 条
 * fb-* / gr-pg-* 的 why 写的是「语气复沓」「刻意结构」「作者原话」—— 全落到 default 的
 * `ob` 桶里，于是 4 组非 Offbook 内容被打成「3 组 Offbook 复沓」。分类写错不会让守卫变弱，
 * 但会让下一个人读 $comment 时得到反的结论。 */
const klass = g => {
  const w = g.why || "";
  if (/小节标题/.test(w)) return "head";
  if (/Offbook|ob-/.test(w)) return "ob";
  if (/Dan Koe/.test(w)) return "dk";
  return "intent";
};
const c = { dk: 0, intent: 0, head: 0, ob: 0 };
groups.forEach(g => c[klass(g)]++);

console.log(`共 ${groups.length} 组：Dan Koe ${c.dk} · 本意重复 ${c.intent} · Offbook 复沓 ${c.ob} · Offbook 节标题 ${c.head}`);
console.log(`at 需刷新 ${refresh} 组；次数不符 ${bad} 组；**休眠（句已不在数据里）${dead} 组**`);

/* 分类行按**当前实际存在的类别**生成：全删光之后还留着「0 组 Offbook 复沓…」这种行，
 * 下一个人会以为那份内容还在库里。 */
const catLines = [];
if (c.dk) catLines.push(`  · ${c.dk} 组 Dan Koe 几篇共享的页脚/订阅块（跨篇，每篇一份，属页面结构）；`);
if (c.intent) catLines.push(`  · ${c.intent} 组回原文核对确认是作者本意重复（gr-pg-* / fb-*）；`);
if (c.ob) catLines.push(`  · ${c.ob} 组 Offbook 官方译本自身的复沓（2026-09-20 接入 AI 栏目 43 篇时登记）；`);
if (c.head) catLines.push(`  · ${c.head} 组 Offbook 节标题（2026-09-21 整期合并把 h2/h3 放回正文后才被守卫看见）；`);

obj.$comment = [
  "词阅 WordLens —— 重复句白名单。",
  "",
  "tools/audit-dups.mjs 用**正确的展平器 + 三步归一**（引号→标点→空白，顺序不可换）查全库重复句，",
  "与这份白名单比对：**出现未登记的新重复 → 报错**。",
  "",
  `${groups.length} 组：`,
  ...catLines,
  "",
  "真正常见的缺陷形态（提取副本）带**重新分词的空白痕迹**，例如 `Memoirs,` vs `Memoirs ,`、",
  "`person.` vs `person. ”` —— 2026-09-17 已按此判据删掉 8 句，工具见 tools/_dedup-sentences.mjs。",
  "",
  "count 参与比对：同一句出现次数变了（例如新增第 4 篇 Dan Koe 文章）也会报错，逼人工过一遍。",
  "",
  "at 字段 = 该条登记在**当前数据**里的真实位置（id p段-s句），由 tools/_fix-dup-allowlist.mjs 重算。",
  "位置写成散文会随代码一起腐烂：2026-09-21 AI 栏目由 43 篇整期合并为 5 篇，id 从 ob-<slug>-c<NN>",
  "变成 ob-<slug>，35 条 why 里手写的章号位置一次性全部失效 —— 所以从此按字段存。",
  "",
  `**没有 at 的条目 = 休眠**（当前 ${dead} / ${groups.length} 条，每次跑本脚本重算）：那句话已不在`,
  "当前文章数据里，audit-dups 只在句子存在时才比对 count，休眠条目因此**永远静默**。",
  "这是已知弱点：**要么删掉该条，要么确认对应的正文块确实被有意移除过。**",
  "",
  "2026-09-24：AI 栏目 5 篇 + 人物「梅根·福克斯」1 篇下架（全库 19 → 13 篇），一次性把 39 组里的",
  "35 组打成休眠 —— 于是补上 `--prune-dormant` 并执行：白名单 39 组 → 4 组（全是 fb-* / gr-pg-*",
  "的作者本意重复）。**以后每批下架都跟一次本脚本**，别让休眠条目重新堆积成一片静默区。",
];

if (APPLY) {
  fs.writeFileSync(AL, JSON.stringify(obj, null, 2) + "\n");
  console.log(`✓ 已写 ${path.relative(ROOT, AL)}`);
} else {
  console.log(PRUNE ? "（dry-run：上面是**删掉之后**的组数，加 --apply 才写盘）" : "（dry-run，加 --apply 写盘）");
}

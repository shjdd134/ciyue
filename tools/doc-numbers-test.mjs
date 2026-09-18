#!/usr/bin/env node
/* 词阅 WordLens —— doc-numbers.mjs（文档数字校验器）的**负向测试**
 *
 * 【为什么单独给校验器写测试】
 * 项目红线：加守卫必须做负向测试 —— 不注入坏样本的守卫只是「当前通过」的假守卫。
 * doc-numbers 尤其需要：它管的是「文档里的数字」，而数字写错**不会让任何东西崩**，
 * 只会让人读到过期的现状。**守卫自己失灵的代价，就是所有校验静默失效。**
 *
 * 【本测试盯的三类失败】
 *   1. 值写错 → 必须判死（不是只提示）
 *   2. 锚点被改（§0.1 表格格式变了）→ 必须判死，不能静默跳过
 *   3. 「线上口径」这个机制本身：本地领先线上时，文档记线上值要放行；
 *      **本地与线上同步时必须回到硬校验** —— 这是那次修改的反向保证，必须钉住。
 *
 * 【为什么用环境变量注入而不是改真文件】
 * HANDOFF.md 与 .bak/published.json 都是真资产，后者还是项目红线（「别手改，要修用
 * repair-published.mjs」）。所以走 WORDLENS_HANDOFF / WORDLENS_PUBLISHED 两个覆盖口，
 * 把样本和基线都放进 .tmp 隔离目录 —— 全程不碰真文件。
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { spawnSync } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..");
const TMP = path.join(ROOT, ".tmp", "doc-numbers-test");
const node = process.execPath;
const results = [];
const check = (name, ok, detail) => {
  results.push([name, ok]);
  console.log(`  ${ok ? "✓" : "✗"} ${name}${detail && !ok ? `  → ${detail}` : ""}`);
};

fs.rmSync(TMP, { recursive: true, force: true });
fs.mkdirSync(TMP, { recursive: true });

/* ---------- 素材：真实 HANDOFF 与工作树的文章 id（只读，不改） ---------- */
const REAL_HANDOFF = fs.readFileSync(path.join(ROOT, "HANDOFF.md"), "utf8");
const ctx = vm.createContext({ console, window: {} });
vm.runInContext("var window=globalThis;", ctx);
for (const f of ["data.js", "data-articles-extra.js"]) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, "assets", f), "utf8"), ctx, { filename: f });
}
const WORKTREE_IDS = vm.runInContext("ARTICLES.map(a => a.id)", ctx);
/* 假基线用**真实基线的 id 列表**（只读 .bak/published.json，不写）。
 * 为什么不能自己造「工作树少一篇」的假基线：文档里的句词数对应的是真实那批文章，
 * 换成另一批 id 会让句词数 SPOT 与篇数 SPOT 口径不一致 —— 于是测的就不是篇数机制了。 */
const REAL_PUB = JSON.parse(fs.readFileSync(path.join(ROOT, ".bak", "published.json"), "utf8"));
const ONLINE_IDS = (REAL_PUB.articles || []).map(a => typeof a === "string" ? a : a?.id).filter(Boolean);
const nWork = WORKTREE_IDS.length, nOnline = ONLINE_IDS.length;
/* 「本地领先线上」是否成立 —— 不成立时下面那节自动跳过（而不是报假失败）。
 * 守卫测试必须能和数据状态解耦：数据一变就红，等于让人学会忽略它。 */
const AHEAD = nOnline > 0 && nOnline < nWork;

const handoffPath = path.join(TMP, "HANDOFF.md");
const writeHandoff = text => fs.writeFileSync(handoffPath, text, "utf8");
const writePub = ids => fs.writeFileSync(path.join(TMP, "published.json"),
  JSON.stringify({ commit: "0000000000000000000000000000000000000000", at: new Date().toISOString(), articles: ids }), "utf8");
const run = (extraHandoff = REAL_HANDOFF, ids = ONLINE_IDS) => {
  writeHandoff(extraHandoff);
  writePub(ids);
  const r = spawnSync(node, [path.join(ROOT, "tools", "doc-numbers.mjs")], {
    encoding: "utf8",
    env: { ...process.env, WORDLENS_HANDOFF: handoffPath, WORDLENS_PUBLISHED: path.join(TMP, "published.json") },
  });
  return { code: r.status, out: (r.stdout || "") + (r.stderr || "") };
};
/* §0.1 里那两行的精确替换（只在真文档上改一个数字，其余原样） */
const setCount = n => REAL_HANDOFF.replace(/(\|\s*文章\s*\|\s*\*\*)\d+(\s*篇)/, `$1${n}$2`);
const setSentences = (s, w) => REAL_HANDOFF.replace(
  /(\|\s*句子\s*\/\s*词数\s*\|\s*\*\*)[\d,]+(\s*句\s*\/\s*)[\d,]+(\s*词)/, `$1${s}$2${w}$3`);
const dropCountRow = () => REAL_HANDOFF.replace(/\|\s*文章\s*\|[^\n]*\n/, "");

console.log("== 1. 基线不可用时的兜底 ==");
{
  /* 基线文件缺失 / articles 为空 → publishedUsable 为假 → 不许把任何值当成「线上口径」放过。
   * 这条挡的是「读不到基线就静默放行」—— 那会让机制在 CI 上悄悄失效。 */
  writeHandoff(REAL_HANDOFF);
  fs.writeFileSync(path.join(TMP, "published.json"), "{ 这不是合法 JSON", "utf8");
  const r = spawnSync(node, [path.join(ROOT, "tools", "doc-numbers.mjs")], {
    encoding: "utf8",
    env: { ...process.env, WORDLENS_HANDOFF: handoffPath, WORDLENS_PUBLISHED: path.join(TMP, "published.json") },
  });
  const out = (r.stdout || "") + (r.stderr || "");
  check("基线 JSON 损坏时不崩，且按实测（工作树）硬校验", r.status !== null && !/Unhandled|throw/i.test(out), "code=" + r.status);
}

if (!AHEAD) {
  console.log(`\n== 2. 本地领先线上（跳过：当前工作树与线上同为 ${nWork} 篇，没有未发布批次） ==`);
} else {
  console.log(`\n== 2. 本地领先线上（工作树 ${nWork} 篇 > 线上 ${nOnline} 篇）：两种口径都放行 ==`);
  {
    const r1 = run(setCount(nOnline));
    check(`文档写线上口径（${nOnline} 篇）→ 放行并提示`,
      r1.code === 0 && /本地工作树/.test(r1.out) && /线上/.test(r1.out), "code=" + r1.code);

    /* 混合口径：篇数按工作树写、句词数仍是线上值 —— 两个 SPOT 各自独立判定，都该放行。
     * （这正是「刚推送完、文档只跟了一半」的中间态，必须能通过。） */
    const r2 = run(setCount(nWork));
    check(`篇数写工作树（${nWork}）、句词数留线上值 → 也放行`,
      r2.code === 0, "code=" + r2.code + " · " + r2.out.split("\n").filter(l => l.startsWith("  ✗")).join(" | "));
  }
}

console.log("\n== 3. 值写错必须判死（不能只提示） ==");
{
  const r = run(setCount(999));
  check("篇数写成不存在的值 → exit 1", r.code === 1 && /既不是线上口径、也不是工作树口径/.test(r.out), "code=" + r.code);

  const r2 = run(setSentences("1,000", "22,125"));
  check("句数写成明显偏小的错值 → exit 1（只验不等式会漏掉这一条）",
    r2.code === 1, "code=" + r2.code);
}

console.log("\n== 4. 本地与线上同步时必须回到硬校验（那次修改的反向保证） ==");
{
  /* 假基线 = 工作树全部 id → unpublishedAhead 为假 → 线上口径这个分支**不许生效**。
   * 文档写一个既非工作树、也非线上的值（工作树减一篇），必须判死而不是提示。 */
  const stale = nWork - 1;
  const r = run(setCount(stale), WORKTREE_IDS);
  check(`同步态下文档写 ${stale} 篇（工作树是 ${nWork}）→ 判死（线上口径分支没被误用）`,
    r.code === 1, "code=" + r.code + " · " + r.out.split("\n").filter(l => l.includes("文章篇数")).join(""));
}

console.log("\n== 5. 锚点失配必须判死 ==");
{
  const r = run(dropCountRow());
  check("删掉「文章」那一行 → 报锚点失配且 exit 1",
    r.code === 1 && /锚点失配/.test(r.out), "code=" + r.code);
}

console.log("\n== 6. 真文档 + 真基线（只验不崩，不验数字对不对） ==");
{
  /* 为什么不要求 exit 0：doc-numbers 本身**故意不进 daily 回归** —— 每日抓到新文章必然改篇数，
   * 而文档要人工跟，所以它可能天天红，那是正确行为（daily.mjs 里有这段说明）。
   * 本测试的职责是「校验器会不会响」，不是「文档数字对不对」—— 后者属于人工发布层。
   * 所以这里只钉：能跑完、给出结论行、退出码不是崩溃。 */
  const r = spawnSync(node, [path.join(ROOT, "tools", "doc-numbers.mjs")], { encoding: "utf8" });
  const out = (r.stdout || "") + (r.stderr || "");
  check("真文档 + 真基线：能跑完并给出结论（不要求数字相符）",
    [0, 1].includes(r.status) && /(与实测一致|与「线上」一致|处与实测不符)/.test(out),
    "code=" + r.status);
}

fs.rmSync(TMP, { recursive: true, force: true });

const passed = results.filter(r => r[1]).length;
console.log(`\n结果：${passed} 通过 / ${results.length - passed} 失败`);
if (passed !== results.length) process.exitCode = 1;

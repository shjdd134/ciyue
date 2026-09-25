#!/usr/bin/env node
/* 词阅 WordLens —— football.mjs 注入/底稿回归
 *
 * 钉住 2026-09-25 修复的两个缺口（方案文档《两篇入库与栏目执行方案》点名的实施前置）：
 *   ① --inject --id 单篇注入：旧实现是「先把 fb- 全删，再拼回 picked()」，带 --id 会把
 *      其余足球稿全部挤掉。现语义 = 同 id 原位替换、新篇追加尾部、其余文章原顺序原内容
 *      保留 —— mergeInject 纯函数层 + CLI 文件层（WORDLENS_FOOTBALL_EXTRA 隔离）双层验证。
 *   ② --draft 底稿：句子展开必须与 build/articleFrom 同一套（无句末标点的节拍行按整行兜底），
 *      否则按底稿行号填的译文数组在构建时错位。交叉验证：底稿句数 == 已入库成品的句数。
 */
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { mergeInject } from "./football.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const TMP = path.join(ROOT, ".tmp");
const node = process.execPath;
const results = [];
const check = (name, ok, detail) => {
  results.push([name, ok]);
  console.log(`  ${ok ? "✓" : "✗"} ${name}${detail && !ok ? `  → ${detail}` : ""}`);
};

/* 真库形状的夹具：13 篇、4 篇足球稿插在第 2–5 位（与 2026-09-25 的 data-articles-extra.js 一致）。
 * mergeInject 对元素只做引用替换，不关心字段 —— 用最小对象即可，重点是 id 与顺序。 */
const NON_FB = ["gr-a", "gr-b", "gr-c", "gr-d", "gr-e", "gr-f", "gr-g", "gr-h", "gr-i"].map(id => ({ id }));
const FB = ["fb-1", "fb-2", "fb-3", "fb-4"].map(id => ({ id, cat: "足球" }));
const fixture = [...NON_FB.slice(0, 2), ...FB, ...NON_FB.slice(2)];
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

console.log("== 1. mergeInject：单篇新注入（4 篇足球稿一篇都不能少）==");
{
  const next = mergeInject(fixture, [{ id: "fb-5-new", cat: "足球", fresh: true }]);
  check("计数 13 → 14", next.length === 14, "len=" + next.length);
  check("旧 13 篇按原顺序原内容保留", next.slice(0, 13).every((a, i) => same(a, fixture[i])));
  check("新篇追加在尾部", next[13] && next[13].id === "fb-5-new" && next[13].fresh === true);
  check("原 4 篇足球稿都在", FB.every(f => next.some(a => a.id === f.id)));
}

console.log("\n== 2. mergeInject：同 id 原位替换 ==");
{
  const next = mergeInject(fixture, [{ id: "fb-3", cat: "足球", updated: true }]);
  check("计数不变（13）", next.length === 13, "len=" + next.length);
  check("被替换者留在原位置（下标 4）", next[4] && next[4].id === "fb-3" && next[4].updated === true);
  check("其余 12 篇逐位不变", next.every((a, i) => a.id === "fb-3" ? true : same(a, fixture[i])));
}

console.log("\n== 3. mergeInject：全量重注入（无 --id 的历史用法）==");
{
  const all4 = FB.map(f => ({ ...f, rebuilt: true }));
  const next = mergeInject(fixture, all4);
  check("计数不变（13）", next.length === 13, "len=" + next.length);
  check("4 篇各回原位（2..5）", FB.every((f, k) => next[2 + k].id === f.id && next[2 + k].rebuilt));
  check("9 篇非足球稿逐位不变", next.every((a, i) => (i >= 2 && i <= 5) ? true : same(a, fixture[i])));
}

console.log("\n== 4. CLI --inject --id：文件层端到端（隔离副本，不动真库）==");
{
  fs.mkdirSync(TMP, { recursive: true });
  const realFile = path.join(ROOT, "assets", "data-articles-extra.js");
  const realBefore = fs.readFileSync(realFile, "utf8");
  const fx = path.join(TMP, "football-test-extra.js");
  fs.writeFileSync(fx, realBefore);
  /* 不变量断言（不写死库容）：同 id 原位替换 → 计数不变、目标 id 留在原下标、其余条目逐位不变 */
  const parse = src => JSON.parse(src.match(/ARTICLES_EXTRA\s*=\s*(\[[\s\S]*?\n\]);/)[1]);
  const before = parse(realBefore);
  const targetId = "fb-gerard-pique-a-long-story";
  const targetIdx = before.findIndex(a => a.id === targetId);
  const r = spawnSync(node, [path.join(ROOT, "tools", "football.mjs"), "--inject", "--id", targetId],
    { encoding: "utf8", env: { ...process.env, WORDLENS_FOOTBALL_EXTRA: fx } });
  const out = (r.stdout || "") + (r.stderr || "");
  check("退出码 0", r.status === 0, "code=" + r.status + " out=" + out.slice(0, 200));
  const after = parse(fs.readFileSync(fx, "utf8"));
  check(`计数不变（${before.length}）`, after.length === before.length, "len=" + after.length);
  check(`被替换篇仍在原位（下标 ${targetIdx}）`, after[targetIdx] && after[targetIdx].id === targetId, "idx=" + after.findIndex(a => a.id === targetId));
  check("其余条目 id 与顺序逐位不变", after.every((a, i) => a.id === targetId ? true : a.id === before[i].id));
  check("真库文件未被测试触碰", fs.readFileSync(realFile, "utf8") === realBefore);
}

console.log("\n== 5. --draft：底稿句数与构建口径一致 ==");
{
  const raw = path.join(ROOT, "tools", "_football", "raw", "fb-gerard-pique-a-long-story.en.json");
  const built = path.join(ROOT, "tools", "_football", "fb-gerard-pique-a-long-story.json");
  if (!fs.existsSync(raw) || !fs.existsSync(built)) {
    console.log("  （跳过：raw/ 或 build 产物不在 —— raw/ 不入库，属预期）");
  } else {
    const r = spawnSync(node, [path.join(ROOT, "tools", "football.mjs"), "--draft", "--id", "fb-gerard-pique-a-long-story"],
      { encoding: "utf8" });
    const out = (r.stdout || "") + (r.stderr || "");
    check("退出码 0", r.status === 0, "code=" + r.status + " out=" + out.slice(0, 200));
    const draft = fs.readFileSync(path.join(ROOT, "tools", "_football", "zh", "fb-gerard-pique-a-long-story.draft.md"), "utf8");
    const nDraft = (draft.match(/^\[\d+\] EN /gm) || []).length;
    const nBuilt = JSON.parse(fs.readFileSync(built, "utf8")).stats.sentences;
    check(`底稿句数 == 成品句数（${nDraft} vs ${nBuilt}）`, nDraft === nBuilt);
    fs.rmSync(path.join(ROOT, "tools", "_football", "zh", "fb-gerard-pique-a-long-story.draft.md"), { force: true });
  }
}

const bad = results.filter(r => !r[1]).length;
console.log(`\n${bad ? `✗ ${bad} 项失败` : "✓ 全部通过"}（${results.length} 项）`);
process.exit(bad ? 1 : 0);

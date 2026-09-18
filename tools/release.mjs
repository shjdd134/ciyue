#!/usr/bin/env node
/* 词阅 WordLens —— 人工发布编排（第一阶段 / 收窄版）
 *
 * 【它和 daily.mjs 的分工 —— 两个入口，两套责任】
 *   daily.mjs    无人值守数据层：抓取 → 质检 → 生成 → publish → 20 项回归，失败自动回滚
 *   release.mjs  人工发布层（本脚本）：**只管「生成物与文档的一致性」**，不抓取、不自动 publish
 *   共用同一批 tools/*.mjs，但入口与责任不同。别把两套编排混成一个。
 *
 * 【为什么第一阶段刻意不做「一键发布」】
 *   2026-09-17 实测过的坑：并行 agent 改数据改到一半时跑 publish.mjs，它的 delete[] 语义是
 *   「基线里有、盘上没有 → 远端该删」，于是算出「删除 43 项」含 42 张封面（差点真推）。
 *   本仓库的常态是多个 agent 同时改同一个工作树 → 自动 publish 的收益远小于风险。
 *   所以本脚本跑到「可以推了」就停手，把命令打出来，由人确认。
 *
 * 【它解决什么】
 *   实测的「生成物不同步」：data-article-metrics.js 停在 2 篇而文章表已 6 篇；
 *   app.js 的版本号回退值停在 51；README 写着 19 篇；HANDOFF §0.1 写着 9 篇。
 *   根因不是缺脚本，是**没有任何东西负责按顺序调用它们、并检查调用后的结果**。
 *
 * 【幂等 —— 本脚本的核心断言】
 *   全部生成物的 sha256 记在 .bak/gen-state.json。两次运行之间必须逐字节不变。
 *   `--idempotent` 会把生成器连跑两遍，断言第二遍零变化 —— 这是「发布过程可重复」的唯一硬证据，
 *   也是「生成文件不能手动维护」的判据：只要有人手改生成物，两遍之间的哈希就会露出来。
 *
 * 用法：
 *   node tools/release.mjs               生成 + 闸门 + 文档校验 + 变化报告
 *   node tools/release.mjs --idempotent  连跑两遍生成，断言第二遍零变化（验收用）
 *   node tools/release.mjs --full        额外跑 daily.mjs 那套全量回归
 *   node tools/release.mjs --dry         只报告会做什么，不写任何文件
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { check as checkVersion, readVersion } from "./version.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const STATE_FILE = path.join(ROOT, ".bak", "gen-state.json");
const EXAMPLES_CACHE = path.join(ROOT, "tools", ".examples-cache", "cet4.jsonl");
const node = process.execPath;

const ARGS = process.argv.slice(2);
const has = f => ARGS.includes(f);
const DRY = has("--dry");

let failures = 0;
const step = t => console.log(`\n== ${t} ==`);
const ok = t => console.log(`  ✓ ${t}`);
const bad = t => { failures++; console.log(`  ✗ ${t}`); };
const run = (script, args = []) => spawnSync(node, [path.join(ROOT, "tools", script), ...args], { stdio: "inherit" }).status === 0;
const runQuiet = (script, args = []) => spawnSync(node, [path.join(ROOT, "tools", script), ...args], { encoding: "utf8" });

/* 全部「自动生成、请勿手改」的产物 —— 来源是各文件头部注释的自述。
 * runner != null → 本脚本会重跑它。
 * runner == null → 不重跑（抓取类 / 词库换代类），但**仍纳入哈希监控**：
 *                  一旦被手改，「生成物变化」一步就会把它暴露出来。 */
const GENERATED = [
  { file: "assets/data-article-metrics.js", runner: "build-article-metrics.mjs", note: "首屏词数/难度，正文一改就必须重算" },
  { file: "assets/data-examples.js", runner: "build-examples.mjs", guard: "examples-cache", note: "需要本机例句缓存，缺则保留现有文件" },
  { file: "assets/data-articles-extra.js", runner: null, note: "抓取产物（ingest.mjs / 栏目的 --inject）" },
  { file: "assets/data-covers.js", runner: null, note: "封面回填表（COVER_MAP 只是兜底，主来源是 article.coverImg）" },
  { file: "assets/data-source-health.js", runner: null, note: "抓取通道健康度" },
  { file: "assets/data-tapdict.js", runner: null, note: "点词大表 3.07MB，只在词库换代时重跑" },
  { file: "assets/data-wordfreq.js", runner: null, note: "常见词表，词库换代时重跑" },
  { file: "assets/data-ecdict.js", runner: null, note: "ECDICT 词元数据，低频重建" },
  { file: "assets/data-words-bulk-a.js", runner: null, note: "四级核心词库" },
  { file: "assets/data-words-full.js", runner: null, note: "四级核心词库" },
  { file: "assets/data-words-mid.js", runner: null, note: "中学基础层词库" },
];

const sha = p => crypto.createHash("sha256").update(fs.readFileSync(p)).digest("hex");
const snapshot = () => {
  const out = {};
  for (const g of GENERATED) {
    const p = path.join(ROOT, g.file);
    out[g.file] = fs.existsSync(p) ? sha(p) : null;
  }
  return out;
};
const activeRunners = () => GENERATED.filter(g => g.runner
  && !(g.guard === "examples-cache" && !fs.existsSync(EXAMPLES_CACHE)));

console.log("词阅 release —— 人工发布编排（收窄版：不抓取、不自动 publish）");
if (DRY) console.log("（--dry：只报告，不写任何文件）");

/* ---------- 1/6 资源版本号 ---------- */
step("1/6 资源版本号（五处一致）");
{
  const v = checkVersion(ROOT);
  if (v.ok) ok(`五处一致（v${v.truth}）`);
  else {
    bad(`${v.bad.length} 处与真源不一致：` + v.bad.map(b => `${b.label}=${b.value || "(空)"}`).join("、"));
    console.log(`     修法：node tools/version.mjs --sync`);
  }
}

/* ---------- 2/6 生成 ---------- */
step("2/6 生成（只跑纯计算 / 有缓存的生成器，抓取类不动）");
const before = snapshot();
const ran = [];
for (const g of GENERATED) {
  if (!g.runner) continue;
  if (g.guard === "examples-cache" && !fs.existsSync(EXAMPLES_CACHE)) {
    console.log(`  · 跳过 ${g.runner} —— 本机无例句缓存（tools/.examples-cache/cet4.jsonl），保留现有 ${g.file}`);
    continue;
  }
  if (DRY) { console.log(`  · 会跑 ${g.runner}`); continue; }
  console.log(`  · ${g.runner}`);
  if (run(g.runner)) ran.push(g.runner);
  else bad(`${g.runner} 失败`);
}
if (!ran.length && !DRY) console.log("  （没有可跑的生成器）");

/* ---------- 3/6 幂等断言 + 生成物变化 ---------- */
step("3/6 幂等与生成物变化");
const after = snapshot();

if (has("--idempotent")) {
  if (DRY) {
    console.log("  （--dry 下跳过实际重跑）");
  } else {
    const first = snapshot();
    for (const g of activeRunners()) runQuiet(g.runner);
    const second = snapshot();
    const drift = Object.keys(first).filter(k => first[k] !== second[k]);
    if (drift.length) {
      bad(`第二遍改动了 ${drift.length} 个生成物 —— 生成器不幂等，或有人手改过生成物：`);
      for (const d of drift) console.log(`     ${d}`);
    } else {
      ok(`幂等通过：${Object.keys(first).length} 个生成物连跑两遍逐字节一致`);
    }
  }
}

if (!fs.existsSync(STATE_FILE)) {
  console.log("  · 首次运行，没有历史状态可比（本次会写下 .bak/gen-state.json）");
} else {
  let prev = null;
  try { prev = JSON.parse(fs.readFileSync(STATE_FILE, "utf8")); } catch { /* 状态文件坏掉不该阻塞发布 */ }
  const old = prev?.files || {};
  const changed = Object.keys(after).filter(k => old[k] !== undefined && old[k] !== after[k]);
  const added = Object.keys(after).filter(k => old[k] === undefined);
  if (!changed.length && !added.length) ok("与上次运行相比，全部生成物无变化");
  else {
    if (changed.length) console.log(`  · 相比上次运行，改动了 ${changed.length} 个生成物：`);
    for (const c of changed) console.log(`     ${c}`);
    for (const a of added) console.log(`     ${a}（上次没记录）`);
  }
}

if (!DRY) {
  fs.mkdirSync(path.dirname(STATE_FILE), { recursive: true });
  fs.writeFileSync(STATE_FILE, JSON.stringify({
    at: new Date().toISOString(),
    version: readVersion(ROOT),
    runners: ran,
    files: after,
  }, null, 1), "utf8");
}

/* ---------- 4/6 闸门 ---------- */
step("4/6 闸门");
const GATES = [
  ["version.mjs", ["--check"], "资源版本号五处一致（复核）"],
  ["version-test.mjs", [], "version.mjs 负向测试（守卫会响才算数）"],
  ["cache-version-test.mjs", [], "缓存/资源版本（独立尺子）"],
  ["doc-numbers.mjs", [], "HANDOFF §0.1 与实测一致"],
];
for (const [script, args, label] of GATES) {
  const r = runQuiet(script, args);
  if (r.status === 0) ok(`${label}  ——  ${script}`);
  else {
    bad(`${label}  ——  ${script}`);
    const tail = ((r.stdout || "") + (r.stderr || "")).trim().split("\n").slice(-8);
    for (const t of tail) console.log(`     ${t}`);
  }
}

/* ---------- 5/6 全量回归（可选） ---------- */
if (has("--full")) {
  /* 这份清单与 daily.mjs 第 5 步保持同步（daily 现为 21 项，含 2026-09-18 加的 version-test.mjs）。
   * 此处刻意少列 version-test.mjs —— 它已在第 4 步闸门跑过，重复跑没有额外信息。 */
  step("5/6 全量回归（与 daily.mjs 第 5 步同步，20 项）");
  const ALL = ["content-scope-test.mjs", "people-test.mjs", "recommend-test.mjs", "mt-test.mjs",
    "text-test.mjs", "classics-test.mjs", "audit.js", "nav-test.js", "deeplink-test.mjs", "smoke.js",
    "text-scan.js", "sw-test.js", "qc-test.mjs", "title-test.mjs", "cache-version-test.mjs",
    "push-test.mjs", "remote-sweep-test.mjs", "examples-test.mjs", "verify-live-test.mjs", "guards-test.mjs"];
  for (const t of ALL) {
    const r = runQuiet(t);
    if (r.status === 0) ok(t);
    else {
      bad(t);
      const tail = ((r.stdout || "") + (r.stderr || "")).trim().split("\n").slice(-6);
      for (const l of tail) console.log(`     ${l}`);
    }
  }
} else {
  step("5/6 全量回归");
  console.log("  （跳过；加 --full 跑 daily.mjs 那套 20 项）");
}

/* ---------- 6/6 下一步 ---------- */
step("6/6 下一步 —— 本脚本到此为止，不自动发布");
console.log("  1) node tools/tree-diff.mjs              # 先看远端漂移与未推送改动（并行 agent 可能正在改）");
console.log("  2) node tools/publish.mjs --dry          # 看会改什么、会删什么");
console.log("  3) GITHUB_TOKEN=$(python tools/_cred-get.py git) node tools/_api-push.mjs \"<msg>\" --manifest auto --files \"<代码清单>\"");
console.log("  4) node tools/verify-live.mjs --wait 600 # 推完再跑，确认线上真的追平");
console.log("");
console.log("  ⚠ publish.mjs 的 delete[] = 「基线里有、盘上没有 → 远端该删」。");
console.log("    有并行 agent 在工作树里改到一半时跑它，会把对方的中途状态判成「这些都不要了」");
console.log("    （2026-09-17 实测算出「删除 43 项」含 42 张封面）。推之前必须先 tree-diff。");

console.log(failures ? `\n✗ release 有 ${failures} 项失败` : "\n✓ release 通过");
process.exit(failures ? 1 : 0);

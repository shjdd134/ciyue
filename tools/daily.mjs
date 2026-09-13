#!/usr/bin/env node
/* 词阅 WordLens —— 每日更新编排器
 *
 * 用法： node tools/daily.mjs
 *
 * 流程：快照 → 抓取(--append) → 质检新文章(不合格剔除) → 例句重生成
 *       → 发布(瘦身/备份/SW版本/孤儿图清理) → 全量回归
 * 任一步失败 → 回滚到快照，退出码 1，正式数据保持昨日状态。
 * git 提交与部署由 GitHub Actions workflow 负责，本脚本只管数据。
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { spawnSync } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..");
const ASSETS = path.join(ROOT, "assets");
const STAGE = path.join(ROOT, ".tmp", "daily-snapshot");
const node = process.execPath;
const run = (script, args = []) => {
  const r = spawnSync(node, [path.join(ROOT, "tools", script), ...args], { stdio: "inherit" });
  return r.status === 0;
};

const tracked = ["data-articles-extra.js", "data-covers.js", "data-examples.js", "data-source-health.js", "sw.js"];

/* ---------- 快照 ---------- */
fs.rmSync(STAGE, { recursive: true, force: true });
fs.mkdirSync(STAGE, { recursive: true });
for (const f of tracked) if (fs.existsSync(path.join(ASSETS, f))) fs.copyFileSync(path.join(ASSETS, f), path.join(STAGE, f));
const extraIdsBefore = new Set(extraIds());
console.log(`快照完成（当前 ${extraIdsBefore.size} 篇抓取文章）\n`);

function extraIds() {
  try {
    const src = fs.readFileSync(path.join(ASSETS, "data-articles-extra.js"), "utf8");
    const m = src.match(/const ARTICLES_EXTRA = (\[[\s\S]*?\n\])(;)/);
    return m ? JSON.parse(m[1]).map(a => a.id) : [];
  } catch { return []; }
}

function rollback(why) {
  console.error(`\n✗ ${why} —— 回滚到更新前状态`);
  for (const f of tracked) {
    const snap = path.join(STAGE, f);
    const live = path.join(ASSETS, f);
    if (fs.existsSync(snap)) fs.copyFileSync(snap, live);
    else if (fs.existsSync(live)) fs.rmSync(live, { force: true });
  }
  process.exit(1);
}

/* ---------- 1. 抓取 ---------- */
console.log("== 步骤 1/5：抓取近 7 天文章 ==");
const okIngest = run("ingest.mjs", [
  "--append", "--days", "7", "--per", "2", "--limit", "24",
  "--candidate", "16",
  "--quota", "足球=3,AI=3,明星=2,成长=2",
]);
if (!okIngest) rollback("抓取步骤失败");

/* ---------- 2. 质检新文章 ---------- */
console.log("\n== 步骤 2/5：质检新文章 ==");
const after = extraIds();
const newIds = after.filter(id => !extraIdsBefore.has(id));
console.log(`本次新增 ${newIds.length} 篇`);
if (newIds.length) {
  fs.writeFileSync(path.join(ROOT, ".tmp", "new-ids.txt"), newIds.join("\n"));
  /* 不合格者剔除后重试一次判定；若全军覆没则回滚 */
  run("qc.mjs", ["--ids-file", ".tmp/new-ids.txt", "--prune"]) ||
    run("qc.mjs", ["--ids-file", ".tmp/new-ids.txt"]) ||
    rollback("新文章全部未通过质检");
}

/* ---------- 3. 例句重生成（仅本机有全量缓存时；Actions runner 缓存缺失则跳过，
      保留已发布的例句库——新文章不影响 4082 词的例句覆盖，降级重生成反而会把
      覆盖率打到 2%，audit 会正确拦下） ---------- */
console.log("== 步骤 3/5：例句 ==");
if (fs.existsSync(path.join(ROOT, "tools", ".examples-cache", "cet4.jsonl"))) {
  if (!run("build-examples.mjs")) rollback("例句生成失败");
} else {
  console.log("  runner 无例句缓存，跳过重生成，保留现有 data-examples.js");
}

/* ---------- 4. 发布（瘦身/备份/SW/孤儿图） ---------- */
console.log("\n== 步骤 4/5：发布 ==");
if (!run("publish.mjs")) rollback("发布步骤失败");

/* ---------- 5. 全量回归 ---------- */
console.log("\n== 步骤 5/5：回归 ==");
for (const t of ["recommend-test.mjs", "audit.js", "nav-test.js", "smoke.js", "text-scan.js"]) {
  if (!run(t)) rollback(`回归未过：${t}`);
}

console.log("\n✓ 每日更新完成");

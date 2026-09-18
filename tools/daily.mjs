#!/usr/bin/env node
/* 词阅 WordLens —— 每日更新编排器
 *
 * 用法： node tools/daily.mjs
 *
 * 流程：建批次(全量快照) → 抓取(--append) → 质检新文章(不合格剔除) → 例句重生成
 *       → 发布(计划/暂存/校验/提交) → 全量回归
 * 任一步失败 → 用批次快照完整回滚（数据文件 + covers/ 图片一起还原），退出码 1。
 * git 提交与部署由 GitHub Actions workflow 负责，本脚本只管数据。
 */
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { createBatch, restoreBatch, pruneBatches } from "./lib-release.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const ASSETS = path.join(ROOT, "assets");
const node = process.execPath;
const run = (script, args = []) => {
  const r = spawnSync(node, [path.join(ROOT, "tools", script), ...args], { stdio: "inherit" });
  return r.status === 0;
};

/* ---------- 建批次：快照变更前状态（含全部封面图），回滚以它为准 ---------- */
const batch = createBatch(ROOT, { label: "daily" });
console.log(`批次 ${batch.id} 已建立：数据文件 ${batch.meta.files.length} 个 · 图片快照 ${batch.meta.covers} 张\n`);

function extraIds() {
  try {
    const src = fs.readFileSync(path.join(ASSETS, "data-articles-extra.js"), "utf8");
    const m = src.match(/const ARTICLES_EXTRA = (\[[\s\S]*?\n\])(;)/);
    return m ? JSON.parse(m[1]).map(a => a.id) : [];
  } catch { return []; }
}
const idsBefore = new Set(extraIds());

function rollback(why) {
  console.error(`\n✗ ${why} —— 回滚到更新前状态`);
  try {
    const r = restoreBatch(ROOT, batch.id);
    console.error(`  已还原 ${r.restored.length} 个文件（图片 ${r.covers} 张）` +
      (r.removed.length ? `，删除新建文件 ${r.removed.length} 个` : ""));
    console.error(`  批次保留在 .bak/releases/${batch.id}/，手工回滚：node tools/rollback.mjs ${batch.id}`);
  } catch (e) {
    console.error(`  ⚠ 自动回滚失败：${e.message}`);
    console.error(`  请手工执行：node tools/rollback.mjs ${batch.id}`);
  }
  process.exit(1);
}

/* ---------- 1. 抓取 ---------- */
console.log("== 步骤 1/5：存量阅读质量清理 + 处理人物栏目（足球 RSS 已于 2026-09-17 停采）==");
/* 先清理存量的不可读页面（直播指南、播客落地页、已失效正文），再抓当天候选。
 * 2026-09-17 起 ingest.mjs 的 FEEDS 为空 → --append 不会采到任何文章。
 * 仍然保留这次调用，有两个理由：① 它是唯一会写 data-source-health.js 的入口
 * （saveSourceHealth 在 main() 返回后总会执行），停采后需要它把足球来源从健康度里剪掉；
 * ② 将来若重新开放某个 RSS 源，这里不用再改。 */
if (!run("ingest.mjs", ["--prune"])) rollback("存量不可读文章清理失败");
const okIngest = run("ingest.mjs", [
  "--append", "--days", "7", "--per", "2", "--limit", "24",
  "--candidate", "16",
]);
if (!okIngest) rollback("抓取步骤失败");
/* 成长 / 足球 RSS、旧明星 / AI 均已停采。人物栏目走独立的候选发现与审核发布队列。 */
console.log('人物栏目：发现候选并发布已核对原刊正文与图片（每日新稿最多 1 篇）');
if (!run('people.mjs', ['--discover'])) console.warn('人物候选发现未完成，保留现有内容');
if (!run('people.mjs', ['--publish-reviewed', '--batch', batch.id])) rollback('人物发布步骤失败');

/* ---------- 2. 质检新文章 ---------- */
console.log("\n== 步骤 2/5：质检新文章 ==");
const newIds = extraIds().filter(id => !idsBefore.has(id));
console.log(`本次新增 ${newIds.length} 篇`);
if (newIds.length) {
  fs.mkdirSync(path.join(ROOT, ".tmp"), { recursive: true });
  const idsFile = path.join(ROOT, ".tmp", "new-ids.txt");
  fs.writeFileSync(idsFile, newIds.join("\n"));
  /* 第一遍带 --prune：不合格的直接从文章表里剔除，退出码 1 表示确实剔过东西。
   * 第二遍复查**必须换成本批最终留下的清单**，不能再用原来的 idsFile ——
   * 被剔除的 id 已不在文章表里，qc 主循环压根不会访问它们，会按 0 篇「通过」，
   * 于是「新文章全军覆没」被误判成「全部合格」，回滚永远不会触发。 */
  const firstPassOk = run("qc.mjs", ["--ids-file", ".tmp/new-ids.txt", "--prune", "--strict-ids"]);
  const survived = extraIds().filter(id => newIds.includes(id));
  console.log(`质检后保留 ${survived.length}/${newIds.length} 篇新文`);
  if (!survived.length) rollback("新文章全部未通过质检");
  if (!firstPassOk) {
    fs.writeFileSync(idsFile, survived.join("\n"));
    if (!run("qc.mjs", ["--ids-file", ".tmp/new-ids.txt", "--strict-ids"])) {
      rollback("剔除后复查仍有不合格文章");
    }
  }
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
if (!run("build-article-metrics.mjs")) rollback("文章统计生成失败");

/* ---------- 4. 发布（计划 / 暂存 / 校验 / 提交 / 归档孤儿图） ---------- */
console.log("\n== 步骤 4/5：发布 ==");
if (!run("publish.mjs", ["--batch", batch.id])) rollback("发布步骤失败");

/* ---------- 5. 全量回归 ---------- */
console.log("\n== 步骤 5/5：回归 ==");
/* 末位三项是内容/工具完整性守卫：
 *   guards-test.mjs —— 重复句守卫 + 书名号专名守卫的**负向测试**（守卫会被证明「会响」才可信）
 *      它内部已经用真实数据跑了 audit-dups / audit-cn-titles 的正样本，不必再单独列这两个脚本。
 *   version-test.mjs —— 资源版本号守卫（tools/version.mjs）的**负向测试**，19 项。
 *      2026-09-18 加：它当场抓出两处既有校验的盲区 —— sw.js 头注释还写 v51、
 *      app.js:11 的 ASSET_VERSION 回退默认值还写 "51"，而 cache-version-test.mjs 两处都不看。
 *      注意它**故意**会改四个文件再还原（try/finally 保证），在 runner 上同样安全。
 *   doc-numbers.mjs 故意**不**进这份清单：它硬校验 HANDOFF §0.1 的篇数/句词数，
 *      而每日抓到新文章必然改篇数 —— 放进来会让 daily 每天判自己失败并回滚。
 *      它属于「人工发布层」（tools/release.mjs 第 4 步已调用），不属于无人值守流程。 */
for (const t of ["content-scope-test.mjs", "people-test.mjs", "recommend-test.mjs", "mt-test.mjs", "text-test.mjs", "classics-test.mjs", "audit.js", "nav-test.js", "deeplink-test.mjs", "smoke.js", "text-scan.js", "sw-test.js", "qc-test.mjs", "title-test.mjs", "cache-version-test.mjs", "push-test.mjs", "remote-sweep-test.mjs", "examples-test.mjs", "verify-live-test.mjs", "guards-test.mjs", "version-test.mjs"]) {
  if (!run(t)) rollback(`回归未过：${t}`);
}

const pruned = pruneBatches(ROOT, 10);
if (pruned.length) console.log(`已清理旧批次：${pruned.join(", ")}`);
console.log(`\n✓ 每日更新完成（批次 ${batch.id}）`);
console.log(`  推送：GITHUB_TOKEN=$(python tools/_cred-get.py git) node tools/_api-push.mjs "chore: 每日更新 ${batch.id}" --manifest auto`);
console.log(`  核验：node tools/verify-live.mjs --wait 600    # 推送**之后**跑，确认线上真的追平；别再用 curl 手打`);
console.log(`        本沙箱访问 Pages 单次请求实测约 24s，一轮 20~90s 属正常；--covers 0 可只查数据文件`);

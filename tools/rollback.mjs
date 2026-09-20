#!/usr/bin/env node
/* 词阅 WordLens —— 回滚到指定批次
 *
 * 用法： node tools/rollback.mjs [批次号|latest] [--list] [--dry]
 *
 *   node tools/rollback.mjs --list       列出可用批次（最近的排最后）
 *   node tools/rollback.mjs latest       回滚到最近一次批次之前的状态
 *   node tools/rollback.mjs 20260913-220145
 *
 * 回滚是完整的：数据文件、sw.js，以及 covers/ 里的全部图片一起还原。
 * 批次创建之后才出现的文件会被删除；被归档进 orphans/ 的图片随 before/ 一并回来。
 * 回滚结束后会重新跑一遍引用自检（正文可解析 + 被引用的图片都在），不通过会明确报错。
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { readDecl } from "./lib-text.mjs";
import { listBatches, latestBatch, readBatch, restoreBatch } from "./lib-release.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const ASSETS = path.join(ROOT, "assets");

if (process.argv.includes("--list")) {
  const ids = listBatches(ROOT).reverse();
  if (!ids.length) { console.log("没有任何发布批次"); process.exit(0); }
  for (const id of ids) {
    const meta = readBatch(ROOT, id);
    const man = path.join(ROOT, ".bak", "releases", id, "manifest.json");
    let extra = "";
    if (fs.existsSync(man)) {
      const mf = JSON.parse(fs.readFileSync(man, "utf8"));
      extra = ` · ${mf.summary.after} 篇 · 淘汰 ${mf.dropped.length} · 归档图 ${mf.coversArchived.length}`;
    }
    console.log(`${id}  ${meta.at}  ${meta.label || "-"}${extra}`);
  }
  process.exit(0);
}

const want = (process.argv[2] || "latest").replace(/^--/, "");
const id = want === "latest" ? latestBatch(ROOT) : want;
if (!id) {
  console.error("找不到可回滚的批次。用 node tools/rollback.mjs --list 查看现有批次。");
  process.exit(2);
}

const dir = path.join(ROOT, ".bak", "releases", id);
const before = path.join(dir, "before");
if (!fs.existsSync(before)) {
  console.error(`批次 ${id} 的 before/ 快照缺失，无法回滚（可用 --list 查看完整批次）`);
  process.exit(2);
}

const meta = readBatch(ROOT, id);
console.log(`回滚到批次 ${id} 创建前的状态（${meta.at}）`);
console.log(`  数据文件 ${meta.files.length} 个 · 图片快照 ${meta.covers} 张`);
if (process.argv.includes("--dry")) {
  console.log("\n--dry：不写入。将还原上述文件" + (meta.created?.length ? `，并删除新建的 ${meta.created.join(", ")}` : ""));
  process.exit(0);
}

const r = restoreBatch(ROOT, id);
console.log(`\n已还原 ${r.restored.length} 个文件（其中图片 ${r.covers} 张）`);
if (r.removed.length) console.log(`已删除本次运行新建的 ${r.removed.length} 个文件：${r.removed.join(", ")}`);

/* ---------- 回滚后自检 ---------- */
const errors = [];
const extraPath = path.join(ASSETS, "data-articles-extra.js");
try {
  const decl = readDecl(extraPath, "ARTICLES_EXTRA");
  if (!decl) errors.push("data-articles-extra.js 结构异常");
  else {
    const list = decl.value;
    console.log(`回滚后文章数：${list.length}`);
  }
} catch (e) { errors.push("data-articles-extra.js 无法解析：" + e.message); }

try {
  const ctx = vm.createContext({ console, window: { addEventListener() { } } });
  vm.runInContext("var window=globalThis;", ctx);
  for (const f of ["data.js", "data-words-bulk-a.js", "data-words-full.js", "data-articles-extra.js", "data-articles-archive.js", "data-covers.js"]) {
    const p = path.join(ASSETS, f);
    if (fs.existsSync(p)) vm.runInContext(fs.readFileSync(p, "utf8"), ctx, { filename: f });
  }
  const articles = vm.runInContext("ARTICLES", ctx);
  const COVER_MAP = vm.runInContext("typeof COVER_MAP === 'undefined' ? {} : COVER_MAP", ctx);
  const coversDir = path.join(ASSETS, "covers");
  const onDisk = new Set(fs.existsSync(coversDir) ? fs.readdirSync(coversDir) : []);
  const missing = new Set();
  for (const a of articles) {
    const c = a.coverImg || COVER_MAP[a.id];
    if (c && !onDisk.has(path.basename(c))) missing.add(path.basename(c));
    for (const p of a.paras || []) if (p.img && !onDisk.has(path.basename(p.img))) missing.add(path.basename(p.img));
  }
  if (missing.size) errors.push(`仍有 ${missing.size} 张被引用的图片缺失：${[...missing].slice(0, 10).join(", ")}`);
  else console.log(`图片自检通过：${articles.length} 篇文章引用的配图全部在位（磁盘 ${onDisk.size} 张）`);
} catch (e) { errors.push("图片自检失败：" + e.message); }

if (errors.length) {
  console.error(`\n✗ 回滚后自检未通过：`);
  for (const e of errors) console.error("   · " + e);
  process.exit(2);
}
console.log(`\n✓ 已完整回滚到批次 ${id} 之前的状态`);

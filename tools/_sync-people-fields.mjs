#!/usr/bin/env node
/* 词阅 WordLens —— 按库内正文重算人物篇的对账字段
 *
 * 什么时候用：qc.mjs 报
 *     F4 人物原文词数不一致（字段 1063，正文 915）
 * 就说明库内正文被改过而 `sourceTextWords` / `sourceParagraphs` 没跟着动。
 * 任何**动正文**的操作之后都要跑一遍：删重复句（_dedup-sentences.mjs）、重新分组
 * （_regroup-paras.mjs）、人工修订。两个脚本已自动同步，本工具用于事后补救与批量核对。
 *
 * 口径来自 tools/lib-article-fields.mjs（与 ingest.mjs / qc.mjs F4 同一份），
 * 且刻意不动 `sourceTextHash`（源页面没变，动它会让指纹比对误判成来源变更）。
 *
 * 用法：
 *   node tools/_sync-people-fields.mjs            # 只报告
 *   node tools/_sync-people-fields.mjs --apply
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createBatch } from "./lib-release.mjs";
import { sourceFieldCounts, syncPeopleSourceFields } from "./lib-article-fields.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const FILE = path.join(ROOT, "assets", "data-articles-extra.js");
const APPLY = process.argv.includes("--apply");

const src = fs.readFileSync(FILE, "utf8");
const m = src.match(/(const ARTICLES_EXTRA = )(\[[\s\S]*?\n\])(;)/);
if (!m) { console.error("找不到 ARTICLES_EXTRA 数组，放弃"); process.exit(1); }
const head = src.slice(0, m.index);
const tail = src.slice(m.index + m[0].length);
const list = JSON.parse(m[2]);

let touched = 0;
for (const a of list) {
  if (a.sourceTextWords == null) continue;                 // 非人物全文篇
  const before = { w: a.sourceTextWords, p: a.sourceParagraphs };
  const n = syncPeopleSourceFields(a);
  const now = sourceFieldCounts(a);
  if (!n) { console.log(`✓ ${a.id} 已一致（${now.words} 词 / ${now.paras} 段）`); continue; }
  touched++;
  console.log(`· ${a.id}  ${before.w} → ${now.words} 词 · ${before.p} → ${now.paras} 段`);
}
console.log(`\n需同步 ${touched} 篇`);
if (!touched) { console.log("无需写盘。"); process.exit(0); }
if (!APPLY) { console.log("[dry] 加 --apply 写盘。"); process.exit(0); }

const probe = head + m[1] + JSON.stringify(list, null, 2) + m[3] + tail;
{
  const ctx = vm.createContext({ console });
  try {
    vm.runInContext(probe, ctx, { filename: "probe" });
    const back = vm.runInContext("ARTICLES_EXTRA", ctx);
    if (!Array.isArray(back) || JSON.stringify(back) !== JSON.stringify(list)) throw new Error(`重建数组不一致（${back && back.length} 篇）`);
  } catch (e) {
    console.error(`\n✗ 写盘前自检失败：${e.message}\n  未写盘。`);
    process.exit(1);
  }
}
const batch = createBatch(ROOT, { label: "sync-people-fields" });
console.log(`\n批次 ${batch.id} 已建立（回滚：node tools/rollback.mjs ${batch.id}）`);
fs.writeFileSync(FILE, probe);
console.log(`已写回 ${path.relative(ROOT, FILE)}`);

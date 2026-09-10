#!/usr/bin/env node
/* 词阅 WordLens —— 已生成数据的文案修复
 *
 * 流水线以后抓的文章会自动走 tools/lib-text.mjs 的清洗；这个脚本负责把
 * 之前生成的 assets/*.js 里已经写进去的乱码按同一套规则回填修掉。
 *
 * 用法：
 *   node tools/fix-text.mjs --dry    只报告会改什么，不落盘
 *   node tools/fix-text.mjs          修复并写回
 */

import fs from "node:fs";
import path from "node:path";
import { cleanPara, mergeSplitSentences, readDecl } from "./lib-text.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const DRY = process.argv.includes("--dry");

const FILES = [
  ["assets/data.js", "ARTICLES"],
  ["assets/data-articles-extra.js", "ARTICLES_EXTRA"],
  ["assets/data-articles-archive.js", "ARTICLES_ARCHIVE"],
];

let totalDropped = 0, totalMerged = 0, totalEdited = 0, touched = 0;

for (const [rel, name] of FILES) {
  const file = path.join(ROOT, rel);
  const read = readDecl(file, name);
  if (!read) { console.log(`跳过 ${rel}：找不到 ${name}`); continue; }

  const arr = read.value;
  const droppedLines = [];
  let dropped = 0, merged = 0, edited = 0;

  for (const art of arr) {
    const before = art.paras || [];

    /* 1) 逐段清洗：丢掉整段垃圾，其余改写 */
    const kept = [];
    before.forEach((p, i) => {
      const c = cleanPara(p);
      if (!c) {
        dropped++;
        droppedLines.push(`   删除 ${art.id} p${i + 1}：${JSON.stringify((p.en || p.cn || "[图] " + (p.img || "")).slice(0, 76))}`);
        return;
      }
      if (c.cn !== p.cn) edited++;
      if (c.en !== p.en) edited++;
      kept.push(c);
    });

    /* 2) 粘回被缩写句号劈开的句子 */
    const after = mergeSplitSentences(kept);
    merged += kept.length - after.length;

    art.paras = after;
  }

  const next = read.parts.head + JSON.stringify(arr, null, 2) + read.parts.tail;
  const changed = next !== read.src;
  if (changed) { touched++; if (!DRY) fs.writeFileSync(file, next); }

  totalDropped += dropped; totalMerged += merged; totalEdited += edited;
  droppedLines.forEach(l => console.log(l));
  console.log(`${DRY ? "[试运行] " : ""}${rel}：删除垃圾段 ${dropped} · 粘回半截句 ${merged} 处 · 改写 ${edited} 段${changed ? "" : "（文件未变）"}\n`);
}

console.log(`合计：删除 ${totalDropped} 段 · 粘回 ${totalMerged} 处 · 改写 ${totalEdited} 段 · 涉及 ${touched} 个文件${DRY ? "（未落盘）" : ""}`);

#!/usr/bin/env node
/* 词阅 WordLens —— 书名号专名守卫（禁止「原文没有的专名」）
 *
 * 为什么要有它（2026-09-17）：
 *   map 篇出现 `like a glitch in the matrix` 被译成「就像**《黑客帝国》中的「故障」**一样」——
 *   原文没提任何电影，紧接着那句自己还把 matrix 定义成「第一层和第二层的边界」。
 *   这类「凭空注入专名」外部审校报告**看不见**（它把它当术语译法问题），只能靠机器查：
 *   **中文里的每个《X》，都要能在同句英文里找到出处。**
 *
 * 判据需要一张对照表（机翻把 Mafia Mamma 写成《黑手党妈妈》，字面上毫无共同点）：
 *   tools/title-map.json —— 中文名 ↔ 英文原名 + 核实来源。
 *   1. 没登记的《X》 → 报错（新专名必须人工确认译名与出处）；
 *   2. 登记的 en 在该句英文里逐字找不到 → 报错（疑似注入）；
 *   3. 登记了 loose:true 的跳过第 2 条（英文原名只在相邻句、或原名非拉丁字母）。
 *
 * 用法：
 *   node tools/audit-cn-titles.mjs
 *   node tools/audit-cn-titles.mjs --file .tmp/x.js      # 给负向测试用
 */
import fs from "node:fs";
import path from "node:path";
import { readArts, flatten } from "./audit-dups.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const argv = process.argv.slice(2);
const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d; };
const MAP = path.resolve(ROOT, opt("--map", path.join("tools", "title-map.json")));

/* 只做「同句英文里有没有这个专名」的判定，所以归一化要保留字母数字，
 * 但抹平撇号/破折号/引号/空白的大小写差异（英文原名在原文里常带弯引号与 en dash）。 */
const normEn = s => String(s || "")
  .replace(/[\u2018\u2019\u02bc\u2032]/g, "'").replace(/[\u201C\u201D]/g, '"')
  .replace(/[\u2013\u2014\u2012\u2015]/g, "-")
  .replace(/\s+/g, " ").trim().toLowerCase();

export function findTitleViolations(arts, mapFile = MAP) {
  const titles = JSON.parse(fs.readFileSync(mapFile, "utf8")).titles || [];
  const byZh = new Map(titles.map(t => [t.zh, t]));
  const issues = [];
  let seen = 0;
  for (const r of flatten(arts)) {
    const found = [...String(r.cn).matchAll(/《([^》]+)》/g)].map(x => x[1]);
    for (const zh of found) {
      seen++;
      const t = byZh.get(zh);
      if (!t) { issues.push({ kind: "未登记", zh, where: `${r.id} p${r.pi}-s${r.si}`, en: r.en }); continue; }
      if (t.loose) continue;
      if (!normEn(r.en).includes(normEn(t.en))) {
        issues.push({ kind: "疑似注入", zh, name: t.en, where: `${r.id} p${r.pi}-s${r.si}`, en: r.en });
      }
    }
  }
  return { issues, seen, titles: titles.length };
}

if (process.argv[1]?.endsWith("audit-cn-titles.mjs")) {
  const arts = readArts();
  const { issues, seen, titles } = findTitleViolations(arts);
  console.log(`书名号专名守卫：${seen} 处《》/ ${titles} 条对照表条目`);
  if (!issues.length) {
    console.log("✓ 每个《X》都能在同句英文里找到出处");
    process.exit(0);
  }
  console.error(`\n✗ ${issues.length} 处问题：`);
  for (const i of issues) {
    console.error(`\n· [${i.kind}] 《${i.zh}》 @ ${i.where}`);
    if (i.name) console.error(`    对照表英文名「${i.name}」在该句英文里找不到 —— 疑似添加了原文没有的内容`);
    else console.error(`    未登记：请核实该专名的通行译名与英文原名，补进 tools/title-map.json`);
    console.error(`    EN: ${String(i.en).slice(0, 140)}`);
  }
  process.exit(1);
}

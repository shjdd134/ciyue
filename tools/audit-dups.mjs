#!/usr/bin/env node
/* 词阅 WordLens —— 重复句守卫
 *
 * 为什么要有它（2026-09-17）：
 *   提取管线会产生「同内容不同形状」的副本 —— 最典型的是重新分词留下的空白痕迹：
 *     `Memoirs,` vs `Memoirs ,`   ·   `person.` vs `person. ”`
 *   实测 Monica 篇 51 句里 12 句是重复（6 组），读者会把同一句话读两遍、两种说法。
 *   当时据「痕迹」判据删掉 8 句（tools/_dedup-sentences.mjs），本工具负责**不再复发**。
 *
 * 两个必须踩对的坑（都踩过）：
 *   1. **段落有两种形状**：`{sentences:[…]}` 与单句 `{en, cn}`。只读 `p.sentences` 会漏掉
 *      291/2963 句（第一版核查脚本就漏了，重复组从 20 组被误算成 8 组）。
 *   2. **归一化顺序**：引号 → 标点 → 最后合并空白。反了会把 `Bacall ,` 变成 `Bacall  Joan`
 *      （双空格），与 `Bacall Joan` 判为不同 —— 单这一处就漏掉 4 组。
 *
 * 白名单：tools/dup-allowlist.json。跨篇页脚（Dan Koe 三篇各一份）与作者本意重复在此登记。
 * **未登记的新重复 = 报错**。
 *
 * 用法：
 *   node tools/audit-dups.mjs
 *   node tools/audit-dups.mjs --file .tmp/x.js      # 给负向测试用
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const argv = process.argv.slice(2);
const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d; };
const FILE = path.resolve(ROOT, opt("--file", path.join("assets", "data-articles-extra.js")));
const ALLOW = path.resolve(ROOT, opt("--allow", path.join("tools", "dup-allowlist.json")));

export const norm = s => String(s || "")
  .replace(/[\u2018\u2019\u02bc]/g, "'").replace(/[\u201C\u201D]/g, '"')
  .replace(/[.,;:!?\u3002\uff0c\uff1b\uff1a\uff01\uff1f\u201c\u201d'"\u2014\u2013-]/g, "")
  .replace(/[\s\u00a0]+/g, " ").trim().toLowerCase();

/** 展平两种段落形状 → [{id, pi, si, en, cn}] */
export const flatten = arts => {
  const rows = [];
  for (const a of arts) (a.paras || []).forEach((p, pi) => {
    if (Array.isArray(p.sentences)) p.sentences.forEach((s, si) => rows.push({ id: a.id, pi: pi + 1, si: si + 1, en: s.en || "", cn: s.cn || "" }));
    else if (p.en || p.cn) rows.push({ id: a.id, pi: pi + 1, si: 1, en: p.en || "", cn: p.cn || "" });
  });
  return rows;
};

export function readArts(file = FILE) {
  const src = fs.readFileSync(file, "utf8");
  const m = src.match(/(const ARTICLES_EXTRA = )(\[[\s\S]*?\n\])(;)/);
  if (!m) throw new Error(`${file} 里找不到 ARTICLES_EXTRA 数组`);
  return JSON.parse(m[2]);
}

/** 返回违规组数组（空 = 通过） */
export function findDupViolations(arts, allowFile = ALLOW) {
  const allow = JSON.parse(fs.readFileSync(allowFile, "utf8")).groups || [];
  const allowIdx = new Map(allow.map(g => [norm(g.en), g.count]));

  const map = new Map();
  for (const r of flatten(arts)) {
    const k = norm(r.en);
    if (k.length < 12) continue;                       // 过短的（"Next up" 之类）不看，噪音太大
    if (!map.has(k)) map.set(k, []);
    map.get(k).push(r);
  }
  const bad = [];
  for (const [k, list] of map) {
    if (list.length < 2) continue;
    if (allowIdx.get(k) === list.length) continue;     // 登记过且次数一致 → 放行
    bad.push({ key: k, list, expected: allowIdx.get(k) });
  }
  return { bad, total: map.size };
}

if (import.meta.filename === process.argv[1] || process.argv[1]?.endsWith("audit-dups.mjs")) {
  const arts = readArts();
  const { bad } = findDupViolations(arts);
  const sentences = flatten(arts).length;
  console.log(`重复句守卫：${arts.length} 篇 / ${sentences} 句`);
  if (!bad.length) {
    console.log("✓ 无未登记的重复句");
    process.exit(0);
  }
  console.error(`\n✗ 发现 ${bad.length} 组未登记的重复句：`);
  for (const g of bad) {
    console.error(`\n· x${g.list.length}${g.expected ? `（白名单登记的是 x${g.expected}，次数变了）` : "（白名单里没有）"}`);
    console.error(`  EN: ${g.list[0].en.slice(0, 120)}`);
    for (const r of g.list) console.error(`    ${r.id} p${r.pi}-s${r.si}  CN: ${r.cn.slice(0, 60)}`);
  }
  console.error("\n处理方式：确认是提取副本 → tools/_dedup-sentences.mjs 删掉；确认是本意重复 → 登记进 dup-allowlist.json。");
  process.exit(1);
}

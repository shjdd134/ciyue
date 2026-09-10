#!/usr/bin/env node
/* 词阅 WordLens —— 分类体系迁移（一次性工具）
 *
 * 旧分类「杂志」拆成两档，让「时尚 / 美女」类内容有独立入口：
 *   ELLE / People / 时尚杂志  → 时尚
 *   Variety / 好莱坞报道 / 影视  → 娱乐
 *
 * 同时更新 data.js 里的 CATEGORIES。
 * 用法：node tools/reclass.js
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const FILES = ["assets/data.js", "assets/data-articles-extra.js", "assets/data-articles-archive.js"];
const NEW_CATS = ["全部", "时尚", "足球", "时政", "历史", "娱乐"];

/* 判断一篇旧「杂志」文章该归到哪一档 */
const recat = (a) => {
  if (a.cat !== "杂志") return a.cat;
  const src = String(a.source || "").split(" · ")[0];
  if (/Variety|Hollywood|Deadline|Vulture|EW|Billboard/i.test(src)) return "娱乐";
  return "时尚";
};

for (const rel of FILES) {
  const file = path.join(ROOT, rel);
  if (!fs.existsSync(file)) { console.log(`跳过 ${rel}（不存在）`); continue; }
  let src = fs.readFileSync(file, "utf8");
  const m = src.match(/((?:const|var)\s+ARTICLES(?:_EXTRA|_ARCHIVE)?\s*=\s*)(\[[\s\S]*?\n\])/);
  if (!m) { console.log(`跳过 ${rel}（没找到文章数组）`); continue; }

  const list = JSON.parse(m[2]);
  let moved = 0, byCat = {};
  for (const a of list) {
    const next = recat(a);
    if (next !== a.cat) moved++;
    a.cat = next;
    byCat[a.cat] = (byCat[a.cat] || 0) + 1;
  }

  src = src.replace(m[0], m[1] + JSON.stringify(list, null, 2));
  if (rel === "assets/data.js") {
    src = src.replace(/const CATEGORIES = \[[^\]]*\];/, `const CATEGORIES = ${JSON.stringify(NEW_CATS)};`);
  }
  fs.writeFileSync(file, src);
  console.log(`${rel}：迁移 ${moved} 篇  →  ${JSON.stringify(byCat)}`);
}
console.log(`\n分类体系：${NEW_CATS.join(" / ")}`);

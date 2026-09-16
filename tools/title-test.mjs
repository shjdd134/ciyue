#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const ROOT = path.resolve(import.meta.dirname, "..");
const ctx = vm.createContext({ console, window: {} });
vm.runInContext(fs.readFileSync(path.join(ROOT, "assets", "data.js"), "utf8"), ctx);
for (const f of ["data-articles-extra.js", "data-articles-archive.js"]) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, "assets", f), "utf8"), ctx);
}
const articles = vm.runInContext("ARTICLES", ctx);
const pairs = [["“", "”"], ["「", "」"], ["『", "』"], ["（", "）"]];
const issue = title => pairs.some(([a, b]) => [...String(title || "")].filter(x => x === a).length !== [...String(title || "")].filter(x => x === b).length);
const bad = articles.filter(a => issue(a.titleZh));
console.log(`标题标点检查：${articles.length - bad.length}/${articles.length} 通过`);
if (bad.length) { bad.forEach(a => console.error(`  ${a.id}: ${a.titleZh}`)); process.exit(1); }
const malformed = "经实践验证，更优，创新”：规则";
if (!issue(malformed)) { console.error("测试样例未被识别"); process.exit(1); }
console.log("✓ 未配对中文引号测试通过");

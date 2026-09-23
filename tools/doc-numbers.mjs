#!/usr/bin/env node
/* Public docs check: keep README's Demo count aligned with the bundled content. */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { readVersion } from "./version.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const JSON_OUT = process.argv.includes("--json");
const context = vm.createContext({ console });
context.window = context;
for (const relative of ["assets/data.js", "assets/data/demo-articles.js"]) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, relative), "utf8"), context, { filename: relative });
}
const demos = vm.runInContext("CIYUE_DEMO_ARTICLES", context);
const ids = demos.map(article => article.id);
const bilingual = demos.filter(article => (article.paras || []).some(paragraph =>
  (paragraph.sentences || []).some(sentence => typeof sentence.en === "string" && typeof sentence.cn === "string" && sentence.cn))).length;
const measured = { demoArticles: demos.length, bilingualDemoArticles: bilingual, version: readVersion(ROOT) };

if (JSON_OUT) {
  console.log(JSON.stringify(measured, null, 2));
  process.exit(0);
}

const readme = fs.readFileSync(path.join(ROOT, "README.md"), "utf8");
const ok = demos.length === 3 && bilingual === demos.length && new Set(ids).size === demos.length
  && /三篇原创双语 Demo/.test(readme);
console.log(`Demo 文章：${demos.length} 篇（双语 ${bilingual} 篇），资源版本 v${measured.version}`);
console.log(ok ? "✓ README 与公开 Demo 数据一致" : "✗ Demo 数量、双语数据或 README 描述不一致");
if (!ok) process.exitCode = 1;

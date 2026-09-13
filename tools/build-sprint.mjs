/* 考前冲刺池接入（一次性构建）：cet4-sprint.json（真题高频 ∪ 试卷词频，2159 词）
 * → 与当前 WORDS 求交集 → assets/data-sprint.js（window.SPRINT_WORDS = 词表）。
 * 前端「考前验收」按这个词单出卡（复用现有学习流与完整卡片数据）。
 * 词库换代后重跑：node tools/build-sprint.mjs */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "tools", ".examples-cache", "cet4-sprint.json");

/* 1. 当前词表 */
const ctx = vm.createContext({ console, window: { addEventListener() {} } });
vm.runInContext("var window=globalThis;", ctx);
for (const f of ["data.js", "data-words-bulk-a.js", "data-words-full.js", "data-words-mid.js"])
  vm.runInContext(fs.readFileSync(path.join(ROOT, "assets", f), "utf8"), ctx, { filename: f });
const WORDS = vm.runInContext("WORDS", ctx);
const inWords = new Set(WORDS.map(w => w.word.toLowerCase()));
console.log("当前词库:", WORDS.length);

/* 2. 冲刺池按「真题表次数 + 试卷词频」降序，取与词库的交集 */
const j = JSON.parse(fs.readFileSync(SRC, "utf8"));
const ranked = Object.entries(j.words)
  .sort((a, b) => (b[1][0] + b[1][1]) - (a[1][0] + a[1][1]))
  .map(([w]) => w.toLowerCase())
  .filter(w => inWords.has(w));
console.log(`冲刺池 ${Object.keys(j.words).length} 词 → 与词库交集 ${ranked.length} 词`);

/* 3. 写出（词表很小，直接进加载链） */
const out = `/* 词阅 WordLens —— 考前冲刺词单（自动生成，请勿手改）
 * 来源：liut969/CET 真题高频 ∪ CETVocabulary 试卷词频，与当前词库取交集，
 * 按真题热度降序。考前 30 天首页主按钮切换为「今日验收」时按此词单出卡。
 * 重新生成：node tools/build-sprint.mjs */
window.SPRINT_WORDS = ${JSON.stringify(ranked)};
`;
fs.writeFileSync(path.join(ROOT, "assets", "data-sprint.js"), out);
console.log("写出 assets/data-sprint.js:", (out.length / 1024).toFixed(0), "KB");

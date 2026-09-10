/* 一次性数据治理：把日期陈旧/缺失的文章归档到 data-articles-archive.js
 * 规则：date >= 2026-08-01 的保留在 data.js，其余移入 archive（不加载，可随时恢复）
 */
import fs from "node:fs";
import vm from "node:vm";

const ROOT = process.cwd();
const DATA = `${ROOT}/assets/data.js`;
const EXTRA = `${ROOT}/assets/data-articles-extra.js`;
const ARCH = `${ROOT}/assets/data-articles-archive.js`;
const CUT = process.env.CUT_DATE || "2026-08-01";

const ctx = {}; vm.createContext(ctx); ctx.window = ctx; ctx.globalThis = ctx;
vm.runInContext(fs.readFileSync(DATA, "utf8"), ctx);
vm.runInContext(fs.readFileSync(EXTRA, "utf8"), ctx);
const ALL = vm.runInContext("ARTICLES", ctx);

const fresh = a => a.date && a.date >= CUT;
const keep = ALL.filter(fresh).sort((a, b) => String(b.date).localeCompare(String(a.date)));
const arch = ALL.filter(a => !fresh(a)).sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));

const src = fs.readFileSync(DATA, "utf8");
const re = /const ARTICLES = \[[\s\S]*?\n\];/;
if (!re.test(src)) throw new Error("data.js 里没匹配到 ARTICLES 段，中止");
fs.writeFileSync(DATA, src.replace(re, `const ARTICLES = ${JSON.stringify(keep, null, 2)};`));

fs.writeFileSync(ARCH, `/* 词阅 WordLens —— 归档文章（不在页面展示，仅作素材留存）
 *
 * 归档原因：发布日期早于 ${CUT}，或原始来源未提供日期。
 * 英文正文仍为真实报道原文，如需复用把条目移回 data.js 的 ARTICLES 即可。
 * 共 ${arch.length} 篇。
 */

const ARTICLES_ARCHIVE = ${JSON.stringify(arch, null, 2)};
`);

const dist = {};
keep.forEach(a => dist[a.cat] = (dist[a.cat] || 0) + 1);
console.log(`保留 ${keep.length} 篇  归档 ${arch.length} 篇`);
console.log("保留分布:", JSON.stringify(dist));
keep.forEach(a => console.log(`  ${a.date}  [${a.cat}]  ${a.title.slice(0, 46)}`));

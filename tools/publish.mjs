#!/usr/bin/env node
/* 词阅 WordLens —— 发布：滚动瘦身 + 快照备份 + SW 版本推进 + 孤儿图清理
 *
 * 用法： node tools/publish.mjs [--days 30] [--per-cat 25]
 *
 * 瘦身只作用于抓取库（data-articles-extra.js）：
 *   - 新闻类超过 --days 天的文章删除（成长/寓言为常青内容，不按日期淘汰）
 *   - 每个栏目最多保留 --per-cat 篇（按日期取最新）
 * data.js 内置文章与归档文件不受影响。
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const ROOT = path.resolve(import.meta.dirname, "..");
const arg = (name, dflt) => {
  const i = process.argv.indexOf("--" + name);
  return i > 0 ? +process.argv[i + 1] : dflt;
};
const KEEP_DAYS = arg("days", 30);
const PER_CAT = arg("per-cat", 25);
const EVERGREEN_CATS = new Set(["成长", "寓言"]);

const ASSETS = path.join(ROOT, "assets");
const EXTRA = path.join(ASSETS, "data-articles-extra.js");
const COVERS = path.join(ASSETS, "data-covers.js");
const EXAMPLES = path.join(ASSETS, "data-examples.js");
const SOURCE_HEALTH = path.join(ASSETS, "data-source-health.js");
const SW = path.join(ROOT, "sw.js");

/* ---------- 1. 快照备份（当日覆盖） ---------- */
const day = new Date().toISOString().slice(0, 10);
const bakDir = path.join(ROOT, ".bak", "daily", day);
fs.mkdirSync(bakDir, { recursive: true });
for (const f of [EXTRA, COVERS, EXAMPLES, SOURCE_HEALTH, SW]) {
  if (fs.existsSync(f)) fs.copyFileSync(f, path.join(bakDir, path.basename(f)));
}
console.log(`快照 → .bak/daily/${day}/`);

/* ---------- 2. 瘦身 ---------- */
const src = fs.readFileSync(EXTRA, "utf8");
const m = src.match(/const ARTICLES_EXTRA = (\[[\s\S]*?\n\])(;)/);
if (!m) { console.error("extra 文件结构异常"); process.exit(2); }
const list = JSON.parse(m[1]);
const DAY = 86400000;
const cutoff = Date.now() - KEEP_DAYS * DAY;

const dated = list.filter(a => {
  if (EVERGREEN_CATS.has(a.cat)) return true;
  const t = new Date(a.date || 0).getTime();
  return Number.isFinite(t) && t >= cutoff;
});
const expired = list.length - dated.length;

/* 每类取最新的 N 篇（date 降序），多余的淘汰 */
const byCat = new Map();
for (const a of dated) {
  if (!byCat.has(a.cat)) byCat.set(a.cat, []);
  byCat.get(a.cat).push(a);
}
const kept = [], overQuota = [];
for (const [cat, arr] of byCat) {
  arr.sort((x, y) => new Date(y.date) - new Date(x.date));
  kept.push(...arr.slice(0, PER_CAT));
  overQuota.push(...arr.slice(PER_CAT));
}
const dropped = expired + overQuota.length;
const dist = {};
kept.forEach(a => dist[a.cat] = (dist[a.cat] || 0) + 1);
console.log(`瘦身：${list.length} → ${kept.length} 篇（过期 ${expired} · 超配额 ${overQuota.length}）分布 ${JSON.stringify(dist)}`);

if (dropped) {
  const head = src.slice(0, m.index).replace(/共 \d+ 篇/g, `共 ${kept.length} 篇`);
  fs.writeFileSync(EXTRA, head + "const ARTICLES_EXTRA = " + JSON.stringify(kept, null, 2) + m[2] + src.slice(m.index + m[0].length));
}

/* ---------- 3. 清理不再被引用的封面图 ---------- */
const ctx = vm.createContext({ console, window: { addEventListener() {} } });
vm.runInContext("var window=globalThis;", ctx);
for (const f of ["data.js", "data-words-bulk-a.js", "data-words-full.js", "data-articles-extra.js", "data-articles-archive.js", "data-covers.js"]) {
  vm.runInContext(fs.readFileSync(path.join(ASSETS, f), "utf8"), ctx, { filename: f });
}
const ARTICLES = vm.runInContext("ARTICLES", ctx);
const COVER_MAP = vm.runInContext("typeof COVER_MAP === 'undefined' ? {} : COVER_MAP", ctx);
const used = new Set();
for (const a of ARTICLES) {
  const c = a.coverImg || COVER_MAP[a.id];
  if (c) used.add(path.basename(c));
  for (const p of a.paras || []) if (p.img) used.add(path.basename(p.img));
}
const coversDir = path.join(ASSETS, "covers");
const orphanBakDir = path.join(bakDir, "covers");
let orphan = 0;
if (fs.existsSync(coversDir)) {
  for (const f of fs.readdirSync(coversDir)) {
    if (used.has(f)) continue;
    fs.mkdirSync(orphanBakDir, { recursive: true });
    const src = path.join(coversDir, f);
    const dest = path.join(orphanBakDir, f);
    try {
      fs.renameSync(src, dest);
      orphan++;
    } catch (err) {
      /* Windows 上图片可能被浏览器、杀毒软件短暂占用。发布不应因此失败，
       * 也不能退回不可恢复的 unlink；保留原文件，留待下次发布再清理。 */
      console.warn(`孤儿封面暂未归档：${f}（${err.code || err.message}）`);
    }
  }
}
console.log(`孤儿封面清理：归档 ${orphan} 张到 .bak/daily/${day}/covers/`);

/* ---------- 4. SW 缓存名保持稳定（v42 起） ----------
 * 缓存策略已改为 SWR 后台刷新 + ETag 协商，内容更新不再需要清缓存——
 * 按日升级缓存名反而会每天清空用户缓存，制造冷加载空窗。这里不再改动 sw.js。 */
console.log("发布完成");

#!/usr/bin/env node
/* 词阅 WordLens —— 发布：计划 → 暂存校验 → 提交
 *
 * 用法： node tools/publish.mjs [--days 30] [--per-cat 25] [--evergreen-per-cat 60]
 *                              [--keep-batches 10] [--batch <批次号>] [--dry]
 *
 * 三个阶段（任一步失败都不动线上数据）：
 *   1. 计划   算出新增 / 淘汰 / 保留 / 置顶清单，以及引用不到的孤儿图
 *   2. 暂存   新数据写进 <批次>/after/，线上不动；变更前状态已在 <批次>/before/
 *   3. 校验   在暂存副本上验正文完整性与所有被引用图片真实存在，未过则退出、线上无损
 *   4. 提交   after/ 覆盖线上，孤儿图归档（先复制后删除），写 manifest.json + 推送清单
 *
 * 瘦身只作用于抓取库（data-articles-extra.js）：
 *   - 新闻类超过 --days 天的文章删除
 *   - 每栏最多 --per-cat 篇；成长/寓言为常青栏目，用 --evergreen-per-cat
 *   - 带 `pin: true` 的文章永久豁免淘汰（不受日期与配额影响）
 * data.js 内置文章与归档文件不参与瘦身。
 *
 * 批次由 lib-release.mjs 管理；daily.mjs 会先建批次再调本脚本（--batch 复用），
 * 手工单独跑则本脚本自建。回滚：node tools/rollback.mjs [批次号|latest]
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import {
  createBatch, releaseDir, setLatest, pruneBatches, readPublished,
  SNAPSHOT_FILES, SNAPSHOT_COVERS,
} from "./lib-release.mjs";
/* 远端对账 + 数据求值走共享库：tree-diff.mjs 用的是同一份，见 lib-tree.mjs 头部 */
import {
  getToken, fetchRemoteTree, fetchBlob, listLocalPaths, blobSha,
  evalArticleData, referencedCovers, classifyRemoteOnly, ARTICLE_DATA_FILES,
} from "./lib-tree.mjs";
import { readDecl } from "./lib-text.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const arg = (name, dflt) => {
  const i = process.argv.indexOf("--" + name);
  return i > 0 ? +process.argv[i + 1] : dflt;
};
const opt = name => {
  const i = process.argv.indexOf("--" + name);
  return i > 0 ? process.argv[i + 1] : null;
};
const KEEP_DAYS = arg("days", 30);
const PER_CAT = arg("per-cat", 25);
const EVERGREEN_PER_CAT = arg("evergreen-per-cat", 60);
const KEEP_BATCHES = arg("keep-batches", 10);
const DRY = process.argv.includes("--dry");
const EVERGREEN_CATS = new Set(["成长", "寓言"]);

const ASSETS = path.join(ROOT, "assets");
const EXTRA = path.join(ASSETS, "data-articles-extra.js");
const COVERS_DIR = path.join(ASSETS, "covers");

const sha1 = f => crypto.createHash("sha1").update(fs.readFileSync(f)).digest("hex");
/* 仓库相对路径取 sha1（清单里的路径都是相对的） */
const sha1rel = rel => sha1(path.join(ROOT, rel));
/* dropBatch：本次是自建批次、且失败发生在写盘之前 —— 线上零改动，快照没有回滚
 * 价值，留着只会在 .bak/releases/ 里越积越多（复用的批次不能删，那是调用方的）。 */
const fail = (msg, extra, batchDir, dropBatch = false) => {
  console.error(`\n✗ ${msg}`);
  if (extra) console.error(extra);
  console.error("  线上数据与图片未被修改。");
  if (batchDir && dropBatch) {
    fs.rmSync(batchDir, { recursive: true, force: true });
    console.error("  本次自建批次已清理（无回滚价值）。");
  } else if (batchDir) {
    console.error(`  批次暂存保留在 ${path.relative(ROOT, batchDir)}/ 供排查；` +
      `如需回滚：node tools/rollback.mjs ${path.basename(batchDir)}`);
  }
  process.exit(2);
};

if (!fs.existsSync(EXTRA)) {
  fail("旧版公开文章发布管线已停用；用户私人文章应通过词阅 JSON 导入保存在本机");
}

/* ---------- 1. 计划 ---------- */
const decl = readDecl(EXTRA, "ARTICLES_EXTRA");
if (!decl) fail("extra 文件结构异常，无法解析 ARTICLES_EXTRA");
let list;
try { list = decl.value; } catch (e) { fail("ARTICLES_EXTRA 不是合法 JSON：" + e.message); }
const titlePairs = [["“", "”"], ["「", "」"], ["『", "』"], ["（", "）"]];
for (const a of list) {
  const title = String(a.titleZh || "");
  if (!/[\u4e00-\u9fff]/.test(title)) fail(`文章中文标题缺少汉字：${a.id}`);
  for (const [open, close] of titlePairs) {
    if ([...title].filter(x => x === open).length !== [...title].filter(x => x === close).length) {
      fail(`文章中文标题标点未配对：${a.id}`);
    }
  }
}

/* 发布前挡住会破坏渲染/缓存一致性的静态残留。版权、转载和许可证文件不在这里检查。 */
const indexHtml = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
if (/\bdata-page-node-id\s*=/i.test(indexHtml)) fail("index.html 仍含 data-page-node-id 残留");
const assetVersions = [...indexHtml.matchAll(/(?:src|href)="[^"]+\?v=(\d+)"/g)].map(x => x[1]);
const versionSet = new Set(assetVersions);
const swText = fs.readFileSync(path.join(ROOT, "sw.js"), "utf8");
const swVersion = swText.match(/wordlens-cache-v(\d+)/)?.[1] || "";
const appText = fs.readFileSync(path.join(ROOT, "assets", "app.js"), "utf8");
/* app.js 不再按字面量开缓存（预热已交给 sw.js 的 caches.open），它承载版本号的地方是
   ASSET_VERSION 的回退默认值 `assetVersion || "N"` —— 缓存名与它脱钩会让离线预热读到旧壳。 */
const appVersion = appText.match(/assetVersion \|\| "(\d+)"/)?.[1] || "";
const lazyVersion = appText.match(/data-tapdict\.js\?v=([^`"']+)/)?.[1] || "";
const configText = fs.readFileSync(path.join(ROOT, "assets", "data-config.js"), "utf8");
const configVersion = configText.match(/assetVersion:\s*["'](\d+)["']/)?.[1] || "";
if (versionSet.size > 1 || (versionSet.size && (!swVersion || !appVersion || !versionSet.has(swVersion)
  || !versionSet.has(appVersion) || !configVersion || !versionSet.has(configVersion)
  || (lazyVersion && !lazyVersion.includes("ASSET_VERSION"))))) {
  fail(`资源版本不一致：index=${[...versionSet].join(",")} sw=${swVersion || "?"} app=${appVersion || "?"}`);
}

const isPinned = a => a.pin === true;
const isEvergreenCat = a => EVERGREEN_CATS.has(a.cat);
const DAY = 86400000;
const cutoff = Date.now() - KEEP_DAYS * DAY;

/* 第一轮：日期过期。pin 与常青栏目豁免 */
const fresh = a => {
  const t = new Date(a.date || 0).getTime();
  return Number.isFinite(t) && t >= cutoff;
};
const survivedDate = list.filter(a => isPinned(a) || isEvergreenCat(a) || fresh(a));
const expired = list.length - survivedDate.length;

/* 第二轮：栏目配额。pin 不占配额；常青栏目用更高配额 */
const byCat = new Map();
for (const a of survivedDate) {
  if (!byCat.has(a.cat)) byCat.set(a.cat, []);
  byCat.get(a.cat).push(a);
}
const kept = [], overQuota = [];
for (const [cat, arr] of byCat) {
  arr.sort((x, y) => new Date(y.date || 0) - new Date(x.date || 0));
  const cap = EVERGREEN_CATS.has(cat) ? EVERGREEN_PER_CAT : PER_CAT;
  const pinnedIn = arr.filter(isPinned);
  const rest = arr.filter(a => !isPinned(a));
  /* pin 不占栏目配额：经典明星专题全部保留，普通文章仍按 cap 截断。 */
  const room = cap;
  kept.push(...pinnedIn, ...rest.slice(0, room));
  const over = rest.slice(room);
  overQuota.push(...over);
  if (over.length) {
    console.warn(`⚠ 「${cat}」超出栏目配额 ${cap} 篇，本次淘汰最早的 ${over.length} 篇；` +
      `需要长期保留请给单篇加 "pin": true`);
  }
}
const droppedIds = list.filter(a => !kept.includes(a)).map(a => a.id);
const keptIds = kept.map(a => a.id);
const pinnedIds = kept.filter(isPinned).map(a => a.id);
const dist = {};
kept.forEach(a => { dist[a.cat] = (dist[a.cat] || 0) + 1; });

/* 被引用但磁盘上不存在的封面 —— 直接拦下，别把坏图发上线 */
const localSources = new Map();
for (const f of ARTICLE_DATA_FILES) {
  const p = path.join(ROOT, f);
  if (fs.existsSync(p)) localSources.set(f, fs.readFileSync(p, "utf8"));
}
const { articles: allArticles, coverMap: COVER_MAP } = evalArticleData(localSources);

/* 引用集合必须按「瘦身之后的 extra」算，否则被淘汰文章的图不算孤儿 */
const referenced = referencedCovers(allArticles, COVER_MAP, { skipIds: new Set(droppedIds) });
const onDisk = fs.existsSync(COVERS_DIR) ? new Set(fs.readdirSync(COVERS_DIR)) : new Set();
const coversMissing = [...referenced].filter(f => !onDisk.has(f));
const coversOrphan = [...onDisk].filter(f => !referenced.has(f));

console.log(`== 发布计划（保留 ${KEEP_DAYS} 天 · 每栏 ${PER_CAT} 篇 · 常青 ${EVERGREEN_PER_CAT} 篇）==`);
console.log(`文章：${list.length} → ${kept.length} 篇（过期 ${expired} · 超配额 ${overQuota.length} · 置顶保留 ${pinnedIds.length}）`);
console.log(`栏目分布：${JSON.stringify(dist)}`);
if (droppedIds.length) {
  console.log(`淘汰 ${droppedIds.length} 篇：${droppedIds.slice(0, 8).join(", ")}${droppedIds.length > 8 ? " …" : ""}`);
}
console.log(`封面：引用 ${referenced.size} 张 · 孤儿 ${coversOrphan.length} 张 · 缺失 ${coversMissing.length} 张`);

/* ---------- 1b. 远端残留对账（fail-soft） ----------
 * 补的是 publish 原有 delete[] 的结构性盲区：delete[] 算的是「在 .bak/published.json
 * 里、本地盘上没有」，而撤栏目 / 撤功能留下的残留**从来不在基线里**（它们没被发布过
 * 就被删掉了），于是对 delete[] 永久隐形。2026-09-15 连踩两次 —— 40 张孤儿封面、
 * assets/data-sprint.js + tools/build-sprint.mjs —— 两次都只能手写清单绕过去。
 *
 * 难在「远端有、本地没有」有**两种来源，路径上分不出**：
 *   · 该清的残留（上面那些）
 *   · GitHub Actions 的 daily-update 每天抓的新文章 + 新封面（本地滞后时正是这个形态）
 * 判决依据只能是「远端自己还引用吗」，细节见 lib-tree.classifyRemoteOnly 的注释。
 *
 * 拿不到 token / 网络不通 / 拉不到远端数据 → **整段跳过**：既不阻断发布，也不在信息
 * 不全时删封面（宁可漏删、下次再清）。这一点是硬要求 —— 拉不到远端数据却把 referenced
 * 当空集用，等于把 CI 抓的封面全删了。
 * GitHub Actions 的 ubuntu runner 上 tools/_cred-get.py 必然失败（它读的是 Windows
 * 凭据管理器），于是 CI 的每日发布自动走跳过分支 —— 那里工作区刚 checkout 就是远端，
 * 本来就没有残留可言。--no-remote 可显式关闭。 */
const NO_REMOTE = process.argv.includes("--no-remote");
const remotePlan = { only: 0, prunable: [], kept: [], note: null };
if (NO_REMOTE) {
  remotePlan.note = "已用 --no-remote 关闭";
} else {
  try {
    const token = getToken(ROOT);
    if (!token) throw new Error("取不到 git token");
    const remoteMap = await fetchRemoteTree(token);
    const localPaths = listLocalPaths(ROOT);
    const onlyRemote = [...remoteMap.keys()].filter(p => !localPaths.has(p));
    remotePlan.only = onlyRemote.length;
    let remoteRef = new Set();
    if (onlyRemote.some(p => p.startsWith(SNAPSHOT_COVERS + "/"))) {
      /* 只在真要判封面时才拉远端数据 —— extra 六百多 KB，白拉没意义。
       * 与本地逐字节相同的远端数据文件直接复用本地文本，省一次下载。 */
      const sources = new Map();
      for (const f of ARTICLE_DATA_FILES) {
        const sha = remoteMap.get(f);
        if (!sha) continue;                       // 远端没有这个文件
        const p = path.join(ROOT, f);
        sources.set(f, fs.existsSync(p) && blobSha(fs.readFileSync(p)) === sha
          ? fs.readFileSync(p, "utf8")
          : (await fetchBlob(token, sha)).toString("utf8"));
      }
      const rd = evalArticleData(sources);
      remoteRef = referencedCovers(rd.articles, rd.coverMap);
    }
    const { prunable, kept } = classifyRemoteOnly(onlyRemote, { referenced: remoteRef });
    remotePlan.prunable = prunable;
    remotePlan.kept = kept;
  } catch (e) {
    remotePlan.note = "已跳过（" + e.message + "）";
  }
}
if (remotePlan.note) {
  console.log(`远端残留：${remotePlan.note} —— 本次不删任何远端独有文件`);
} else if (!remotePlan.only) {
  console.log("远端残留：无（远端没有本地缺的文件）");
} else {
  console.log(`远端残留：远端独有 ${remotePlan.only} 项 → 可清 ${remotePlan.prunable.length} 项` +
    (remotePlan.kept.length ? ` · 保留 ${remotePlan.kept.length} 项（远端仍在引用，多半是 CI 刚抓来的封面）` : ""));
  for (const f of remotePlan.prunable.slice(0, 12)) console.log(`   - ${f}`);
  if (remotePlan.prunable.length > 12) console.log(`   … 另有 ${remotePlan.prunable.length - 12} 项`);
}
/* 保留项非空 ≈ 「远端有本地没有的图、而且远端文章正在用它」——几乎只可能是
 * CI 已经抓了新文章而本地工作区还停在几天前。这不影响本次删除（该保留的都保留了），
 * 但要提醒一句：本次发布会用**本地**数据覆盖远端，那些新文章会被冲掉。 */
if (remotePlan.kept.length) {
  console.warn(`\n⚠ 远端有 ${remotePlan.kept.length} 个文件仍被引用、但本地没有 —— 多半是 CI 已抓了新文章，而本地工作区滞后。`);
  console.warn("  本次发布将用本地数据覆盖远端，远端那些新内容会丢。要保留就先同步远端再发布。");
}

if (DRY) { console.log("\n--dry：只出计划，未写任何文件"); process.exit(0); }

/* ---------- 2. 建立/复用批次 + 暂存 ---------- */
const reused = opt("batch");
let id, dir;
if (reused) {
  const meta = JSON.parse(fs.readFileSync(path.join(releaseDir(ROOT, reused), "batch.json"), "utf8"));
  id = meta.id; dir = releaseDir(ROOT, id);
  console.log(`\n复用批次 ${id}（回滚基线取自该批次创建时刻）`);
} else {
  const b = createBatch(ROOT, { label: "publish" });
  id = b.id; dir = b.dir;
  console.log(`\n新建批次 ${id}`);
}
const BEFORE_DIR = path.join(dir, "before");
const AFTER_DIR = path.join(dir, "after");
const ORPHAN_DIR = path.join(dir, "orphans");

fs.rmSync(AFTER_DIR, { recursive: true, force: true });
fs.mkdirSync(AFTER_DIR, { recursive: true });
if (droppedIds.length) {
  /* 只含 kept 的 extra 写进 after/ 副本，保留文件头尾（decl.parts = {head, body, tail}）。
   * 顺手把头注释里的「共 N 篇」同步成瘦身后的实际篇数，免得注释与数据对不上。 */
  const head = decl.parts.head.replace(/共 \d+ 篇/g, `共 ${kept.length} 篇`);
  fs.writeFileSync(path.join(AFTER_DIR, "data-articles-extra.js"),
    head + JSON.stringify(kept, null, 2) + decl.parts.tail);
} else {
  fs.copyFileSync(EXTRA, path.join(AFTER_DIR, "data-articles-extra.js"));
}
console.log(`暂存 → .bak/releases/${id}/after/`);

/* ---------- 3. 校验（只看暂存副本） ---------- */
const stagedDecl = readDecl(path.join(AFTER_DIR, "data-articles-extra.js"), "ARTICLES_EXTRA");
if (!stagedDecl) fail("暂存副本解析失败", null, dir);
let staged;
try { staged = stagedDecl.value; } catch (e) { fail("暂存副本不是合法 JSON：" + e.message, null, dir, !reused); }

const errors = [];
const seenId = new Set();
for (const a of staged) {
  const tag = a.id || "(无 id)";
  if (!a.id) errors.push(`${tag}：缺 id`);
  else if (seenId.has(a.id)) errors.push(`${tag}：id 重复`);
  seenId.add(a.id);
  if (!a.title) errors.push(`${tag}：缺标题`);
  if (!a.cat) errors.push(`${tag}：缺栏目`);
  if (!Array.isArray(a.paras) || !a.paras.length) { errors.push(`${tag}：paras 为空`); continue; }
  const textSents = a.paras.flatMap(p => Array.isArray(p.sentences) ? p.sentences : (p && p.en ? [p] : []));
  if (!textSents.some(s => s && String(s.en || "").trim())) errors.push(`${tag}：正文没有任何英文句`);
  /* 封面三形态：coverImg 实图 / COVER_MAP 回填 / gradient·cover 渐变（app.js thumbHtml
   * 对无图文章回退 background:a.gradient，是设计内形态）。2026-09-18：PG 三篇
   * （paulgraham.com 无图可抓）被「没有封面」误拦 —— 全量实测 14 篇里只有这 3 篇
   * 走渐变，且没有任何文章把 cover 写成文件路径（那种坏路径会被 coversMissing 抓），
   * 故放宽为「三者有其一」。 */
  if (!(a.coverImg || COVER_MAP[a.id] || a.gradient || a.cover)) errors.push(`${tag}：没有封面`);
}
if (!staged.length) errors.push("瘦身后文章数为 0");
for (const a of list.filter(isPinned)) {
  if (!seenId.has(a.id)) errors.push(`置顶文章被误删：${a.id}`);
}
for (const f of coversMissing) errors.push(`引用的封面文件不存在：${f}`);
for (const f of coversOrphan) {
  if (referenced.has(f)) errors.push(`仍被引用的图片被列入归档：${f}`);
}
if (errors.length) {
  fail(`校验未通过（${errors.length} 项）`, errors.slice(0, 20).map(e => "   · " + e).join("\n"), dir, !reused);
}
console.log(`校验通过：${staged.length} 篇正文完整 · ${referenced.size} 张引用图全部存在`);

/* ---------- 4. 提交 ---------- */
const written = [];
for (const f of fs.readdirSync(AFTER_DIR)) {
  const target = path.join(ASSETS, f);
  if (fs.existsSync(target) && sha1(target) === sha1(path.join(AFTER_DIR, f))) continue;
  fs.copyFileSync(path.join(AFTER_DIR, f), target);
  written.push("assets/" + f);
}

/* 孤儿封面：before/ 已经有全量副本，这里再落一份归档，确认写成功后才删线上文件。
 * 删不掉就留着下次再清 —— 发布不因图片被占用而失败，也不做不可恢复的删除。 */
const archived = [], stuck = [];
if (coversOrphan.length) {
  fs.mkdirSync(ORPHAN_DIR, { recursive: true });
  for (const f of coversOrphan) {
    const from = path.join(COVERS_DIR, f);
    try {
      fs.copyFileSync(from, path.join(ORPHAN_DIR, f));
      fs.unlinkSync(from);
      archived.push(f);
    } catch (err) {
      stuck.push(f);
      console.warn(`孤儿封面暂未归档：${f}（${err.code || err.message}）`);
    }
  }
}

/* 推送清单：基线是「上次成功推上远端的状态」（.bak/published.json，由 _api-push 成功后写入），
 * 不是本次批次的 before/。用 before/ 当基线有个致命情形：先改好正文、补好配图，再跑 publish ——
 * before/ 拍到的已经是改好之后的样子，差异恒为空，于是「改好了却推不上去」。
 * 顺手把 delete 也交给同一份基线：上次发布有、现在盘上没有的，就是远端该删的。 */
const prev = readPublished(ROOT);
const push = [], del = [];
for (const f of SNAPSHOT_FILES) {
  if (!fs.existsSync(path.join(ROOT, f))) continue;
  if (prev.files[f] !== sha1rel(f)) push.push(f);
}
for (const f of (fs.existsSync(COVERS_DIR) ? fs.readdirSync(COVERS_DIR) : [])) {
  const rel = SNAPSHOT_COVERS + "/" + f;
  if (prev.files[rel] !== sha1rel(rel)) push.push(rel);
}
for (const f of Object.keys(prev.files)) {
  if (!fs.existsSync(path.join(ROOT, f))) del.push(f);
}
/* 远端独有残留：基线路线永远看不见它们（从没发布过），只能靠上面的远端对账补上。
 * 注意这里只是把路径写进清单，真正删除是 _api-push.mjs 的事 —— 它在删之前会把
 * 本地没有的远端文件先备份到 .bak/deleted-<日期>/。 */
for (const f of remotePlan.prunable) if (!del.includes(f)) del.push(f);

const manifest = {
  batch: id,
  at: new Date().toISOString(),
  options: { days: KEEP_DAYS, perCat: PER_CAT, evergreenPerCat: EVERGREEN_PER_CAT },
  summary: {
    before: list.length, after: staged.length,
    expired, overQuota: overQuota.length, pinned: pinnedIds.length,
    coversReferenced: referenced.size, coversArchived: archived.length, coversStuck: stuck.length,
    pushed: push.length, deleted: del.length,
    baselineAt: prev.at, baselineCommit: prev.commit,
  },
  dist,
  /* added / dropped 都要跟「上次发布」比才有意义：keptIds 是 list 的子集，
   * 拿 list 比恒为空。 */
  added: keptIds.filter(x => !prev.articles.includes(x)),
  dropped: prev.articles.filter(x => !keptIds.includes(x)),
  droppedNow: droppedIds,
  pinned: pinnedIds,
  kept: keptIds,
  coversArchived: archived,
  coversStuck: stuck,
  coversMissing,
  verified: true,
  /* 远端对账结果。远端独有但**仍在被远端引用**的文件不删（多半是 CI 刚抓来的封面），
   * 留在这里便于事后核对「发布删了什么、为什么没删那些」。 */
  remoteOnly: remotePlan.only,
  remotePruned: remotePlan.prunable,
  remoteKept: remotePlan.kept,
  remoteNote: remotePlan.note,
  push: push.sort(),
  delete: del.sort(),
};
fs.writeFileSync(path.join(dir, "manifest.json"), JSON.stringify(manifest, null, 2));
setLatest(ROOT, id);
const pruned = pruneBatches(ROOT, KEEP_BATCHES);

console.log(`\n新增 ${manifest.added.length} 篇 · 本次淘汰 ${droppedIds.length} 篇 · 保留 ${kept.length} 篇 · 归档图 ${archived.length} 张`);
console.log(`推送清单 ${push.length} 项${del.length ? ` · 删除 ${del.length} 项` : ""}` +
  (prev.at ? `（基线：${prev.at.slice(0, 16).replace("T", " ")}${prev.commit ? " @" + String(prev.commit).slice(0, 7) : ""}）` : "（首次发布，无基线 → 全量）"));
if (del.length) {
  console.log(`  删除构成：基线失效 ${del.length - remotePlan.prunable.length} 项` +
    ` · 远端残留 ${remotePlan.prunable.length} 项` +
    (remotePlan.kept.length ? `（另有 ${remotePlan.kept.length} 项远端独有被保留：仍在被远端引用）` : ""));
}
if (changed()) {
  console.log(`\n  GITHUB_TOKEN=$(python tools/_cred-get.py git) node tools/_api-push.mjs "chore: 每日更新 ${id}" --manifest auto`);
}
if (pruned.length) console.log(`已清理旧批次：${pruned.join(", ")}`);
console.log(`\n发布完成。批次 ${id} · 回滚：node tools/rollback.mjs ${id}`);

function changed() { return push.length > 0 || del.length > 0 || written.length > 0; }

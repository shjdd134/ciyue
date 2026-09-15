/* 词阅 WordLens —— 发布批次：快照与完整回滚
 *
 * 一次数据改动 = 一个批次目录 .bak/releases/<批次>/：
 *   batch.json   批次元信息（含「开始时不存在、由本次运行创建」的文件名，回滚要删掉它们）
 *   before/      变更前副本，布局与 assets/ 一致（含 covers/ 全量图片）
 *   after/       待发布的新数据（暂存校验用，由 publish.mjs 写）
 *   orphans/     本次归档的孤儿封面
 *   manifest.json 发布清单，由 publish.mjs 写
 *
 * 回滚 = 把 before/ 整棵拷回 assets/ + 删掉 batch.json 里记的新建文件。
 * 图片和 JSON 走同一套机制，不会再出现「数据回滚了、图没回来」。
 */
import fs from "node:fs";
import path from "node:path";

/* 参与快照的文件，路径相对仓库根 —— 注意 sw.js 在根目录而不是 assets/，
 * 老版 daily.mjs 用 path.join(ASSETS, "sw.js") 备份，文件不存在被静默跳过，
 * 等于 sw.js 从来没进过回滚范围。这里统一用仓库相对路径，杜绝再次踩坑。
 * 词库类大数据不在此列（不由每日管线改写）。 */
export const SNAPSHOT_FILES = [
  "assets/data-articles-extra.js",
  "assets/data-covers.js",
  "assets/data-examples.js",
  "assets/data-source-health.js",
  "sw.js",
];
/* 快照内的图片目录（仓库相对） */
export const SNAPSHOT_COVERS = "assets/covers";

const ID_RE = /^\d{8}-\d{6}(-[a-z0-9]+)?$/;

export const releasesDir = root => path.join(root, ".bak", "releases");
export const releaseDir = (root, id) => path.join(releasesDir(root), id);

export function batchId(d = new Date()) {
  const p = n => String(n).padStart(2, "0");
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`;
}

/* 生成批次并快照变更前状态。label 只用于人读日志。
 * 同一秒内连开两个批次会撞号：原实现直接 rmSync 掉同名目录，
 * 等于把上一批唯一的回滚依据删了。撞号就让路追加 -1/-2 后缀，绝不覆盖已有批次。 */
export function createBatch(root, { id = batchId(), label = "" } = {}) {
  let finalId = id;
  for (let n = 1; fs.existsSync(releaseDir(root, finalId)); n++) finalId = `${id}-${n}`;
  const dir = releaseDir(root, finalId);
  const before = path.join(dir, "before");
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(before, { recursive: true });

  const found = [], created = [];
  for (const f of SNAPSHOT_FILES) {
    const p = path.join(root, f);
    if (fs.existsSync(p)) {
      const dest = path.join(before, f);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.copyFileSync(p, dest);
      found.push(f);
    } else created.push(f);   // 开始时不存在 → 回滚时删除
  }

  const coversSrc = path.join(root, SNAPSHOT_COVERS);
  const covers = fs.existsSync(coversSrc) ? fs.readdirSync(coversSrc) : [];
  if (covers.length) {
    fs.mkdirSync(path.join(before, SNAPSHOT_COVERS), { recursive: true });
    for (const f of covers) fs.copyFileSync(path.join(coversSrc, f), path.join(before, SNAPSHOT_COVERS, f));
  }

  const meta = { id: finalId, label, at: new Date().toISOString(), files: found, created, covers: covers.length };
  fs.writeFileSync(path.join(dir, "batch.json"), JSON.stringify(meta, null, 2));
  return { id: finalId, dir, meta };
}

export function readBatch(root, id) {
  const p = path.join(releaseDir(root, id), "batch.json");
  if (!fs.existsSync(p)) throw new Error(`批次不存在：${id}`);
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

/* 完整回滚：数据文件 + sw.js + covers/ 全部图片 + 清理本次新建的文件 */
export function restoreBatch(root, id) {
  const dir = releaseDir(root, id);
  const meta = readBatch(root, id);
  const before = path.join(dir, "before");
  const restored = [];

  const walk = rel => {
    const abs = path.join(before, rel);
    for (const e of fs.readdirSync(abs, { withFileTypes: true })) {
      const r = rel ? path.join(rel, e.name) : e.name;
      if (e.isDirectory()) { walk(r); continue; }
      const target = path.join(root, r);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.copyFileSync(path.join(before, r), target);
      restored.push(r.replace(/\\/g, "/"));
    }
  };
  const removed = [];
  if (fs.existsSync(before)) walk("");
  for (const f of meta.created || []) {
    const p = path.join(root, f);
    if (fs.existsSync(p)) { fs.rmSync(p, { force: true }); removed.push(f); }
  }

  /* 本批次新建的封面图：before/ 里没有的，回滚时必须删掉。
   * 只按 meta.created 删是不够的 —— 它只覆盖 SNAPSHOT_FILES，新抓文章的配图不在其中，
   * 回滚后这些图会变成孤儿留在 assets/covers/，算不上完整还原。 */
  const beforeCovers = path.join(before, SNAPSHOT_COVERS);
  const hadCovers = fs.existsSync(beforeCovers) ? new Set(fs.readdirSync(beforeCovers)) : new Set();
  const coversAbs = path.join(root, SNAPSHOT_COVERS);
  if (fs.existsSync(coversAbs)) {
    for (const f of fs.readdirSync(coversAbs)) {
      if (hadCovers.has(f)) continue;
      fs.rmSync(path.join(coversAbs, f), { force: true });
      removed.push(SNAPSHOT_COVERS + "/" + f);
    }
  }

  const covers = restored.filter(r => r.startsWith(SNAPSHOT_COVERS + "/")).length;
  return { id, restored, removed, covers };
}

export function listBatches(root) {
  const dir = releasesDir(root);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => ID_RE.test(f)).sort();
}

export function pruneBatches(root, keep = 10) {
  const ids = listBatches(root);
  const drop = ids.slice(0, Math.max(0, ids.length - keep));
  for (const id of drop) fs.rmSync(releaseDir(root, id), { recursive: true, force: true });
  return drop;
}

/* 取最近一个「真实存在」的批次。
 * 不能只读 LATEST 文件：批次目录可能已被清理（回滚、保留窗口淘汰、测试收尾），
 * 而 LATEST 还指着那个不存在的 id，于是 rollback latest 直接落空。
 * 所以这里校验目录存在；失效就回落到磁盘上最新的真实批次。 */
export function latestBatch(root) {
  const p = path.join(releasesDir(root), "LATEST");
  if (fs.existsSync(p)) {
    const id = fs.readFileSync(p, "utf8").trim();
    if (id && fs.existsSync(path.join(releaseDir(root, id), "batch.json"))) return id;
  }
  const ids = listBatches(root);
  return ids.length ? ids[ids.length - 1] : null;
}
/* LATEST 是否悬空（指向不存在/已被清理的批次或批次目录已丢） */
export function latestDangling(root) {
  const p = path.join(releasesDir(root), "LATEST");
  if (!fs.existsSync(p)) return null;
  const id = fs.readFileSync(p, "utf8").trim();
  if (!id) return null;
  return fs.existsSync(path.join(releaseDir(root, id), "batch.json")) ? null : id;
}
export function setLatest(root, id) {
  const dir = releasesDir(root);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "LATEST"), id + "\n");
}

/* ---------- 「上次成功发布」状态 ----------
 * 只拿批次 before/ 当基线是不够的：手工改完正文、补好配图之后再跑 publish，
 * before/ 拍到的就已经是「改好之后」的状态，差异恒为空 —— 改了却推不上去。
 * 所以单独记一份「远端当前长什么样」：由 _api-push.mjs 在推送**成功之后**写入，
 * publish.mjs 拿它当基线算 push/delete。它和批次快照是两回事：
 *   before/    本次操作前的状态，回滚用（语义：撤销这一次发布）
 *   published  上次真正推上远端的状态，出清单用（语义：远端还缺什么）
 */
export const PUBLISHED_STATE = ".bak/published.json";

export function readPublished(root) {
  const p = path.join(root, PUBLISHED_STATE);
  try {
    const j = JSON.parse(fs.readFileSync(p, "utf8"));
    return {
      at: j.at || null,
      commit: j.commit || null,
      files: j.files && typeof j.files === "object" ? j.files : {},
      articles: Array.isArray(j.articles) ? j.articles : [],
    };
  } catch {
    /* 首次运行 / 文件损坏都当作「远端一无所有」：清单会偏大但绝不漏，安全方向正确 */
    return { at: null, commit: null, files: {}, articles: [] };
  }
}

export function writePublished(root, state) {
  const p = path.join(root, PUBLISHED_STATE);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(state, null, 2));
}

/* 推送成功后调用：把这次真正推上去的路径记进基线，删掉已删除的。
 * 只动被触及的路径，其余旧记录原样保留（--files 推代码时不会冲掉数据文件的记录）。 */
export function updatePublished(root, { set = {}, remove = [], articles = null, commit = null } = {}) {
  const st = readPublished(root);
  for (const [f, sha] of Object.entries(set)) st.files[f] = sha;
  for (const f of remove) delete st.files[f];
  if (Array.isArray(articles) && articles.length) st.articles = articles.slice();
  st.at = new Date().toISOString();
  if (commit) st.commit = commit;
  writePublished(root, st);
  return st;
}

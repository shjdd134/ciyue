/* 词阅 WordLens —— 工作树 ↔ 远端 tree 对账（tree-diff.mjs 与 publish.mjs 共用）
 *
 * 为什么必须抽成 lib：本项目已经因为「两套尺子」栽过三次 ——
 *   · lib-text.mjs 的 ABBR 缩写表，lib-people.mjs 自己抄了一份还漏了；
 *   · lib-people.mjs 的分句器，没复用 lib-text 的句子边界规则；
 *   · .gitignore 的忽略规则，曾经手抄进对账脚本。
 * 对账这种「差一个文件就是线上 404 或误删」的事，只能有一份实现。
 *
 * 两个调用方的分工：
 *   tools/tree-diff.mjs   人工核查「该推什么」（只读，不写任何东西）
 *   tools/publish.mjs     发布计划里清「远端有、本地没有」的残留（会写 delete[]）
 * 后者依赖前者同一套 local/remote 口径，否则会出现「对账说干净、发布却删东西」。
 *
 * 单文件比 sha1 就够了 —— GitHub 的 tree API 直接给出 blob 的 sha1，
 * 一次 recursive 请求就能把整个仓库对完，不用拉内容。
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";

export const DEFAULT_REPO = "shjdd134/ciyue";

/* 文章数据文件的加载顺序 —— data-articles-extra.js / data-articles-archive.js
 * 靠 `ARTICLES.push(...)` 合并进 data.js 建的空数组，顺序错了文章就进不来。
 * 本地解析与远端解析共用这一份清单，避免「本地算 81 张引用、远端算 0 张」。 */
export const ARTICLE_DATA_FILES = [
  "assets/data.js",
  "assets/data-words-bulk-a.js",
  "assets/data-words-full.js",
  "assets/data-articles-extra.js",
  "assets/data-articles-archive.js",
  "assets/data-covers.js",
];

/* ---------- git blob sha1（与 tree API 的 sha 同一算法） ---------- */
export const blobSha = buf => {
  const h = crypto.createHash("sha1");
  h.update(`blob ${buf.length}\0`);
  h.update(buf);
  return h.digest("hex");
};

/* ---------- .gitignore 解析（git 语义：最后一条命中的规则说了算） ---------- */
export function loadIgnore(root) {
  const p = path.join(root, ".gitignore");
  if (!fs.existsSync(p)) return () => false;
  const lines = fs.readFileSync(p, "utf8")
    .split(/\r?\n/).map(s => s.trim()).filter(s => s && !s.startsWith("#"));
  const rules = [];
  for (const raw of lines) {
    const neg = raw.startsWith("!");
    const pat = neg ? raw.slice(1) : raw;
    const dirOnly = pat.endsWith("/");
    const body = pat.replace(/\/+$/, "");
    /* 不含 `/` 的模式匹配任意层级的文件名（`*.log`）；含 `/` 的从仓库根锚定 */
    const anchored = body.includes("/");
    const rx = new RegExp(
      (anchored ? "^" : "(?:^|/)") +
      body.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, "[^/]*").replace(/\?/g, "[^/]") +
      (dirOnly ? "/.*$" : "(?:/.*)?$"));
    rules.push({ neg, rx });
  }
  return p => {
    let hit = false;
    for (const r of rules) if (r.rx.test(p)) hit = !r.neg;
    return hit;
  };
}

/* ---------- 本地工作树 ---------- */
function walkLocal(root, onFile) {
  const ignored = loadIgnore(root);
  const isIgnored = p => p === ".git" || p.startsWith(".git/") || ignored(p);
  (function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const abs = path.join(dir, e.name);
      const rel = path.relative(root, abs).replace(/\\/g, "/");
      if (isIgnored(rel)) continue;
      if (e.isDirectory()) walk(abs);
      else onFile(rel, abs);
    }
  })(root);
}

/* 所有未被忽略的文件 → Map<相对路径, blob sha1>（要读全量内容，约 1-2 秒） */
export function listLocalFiles(root) {
  const out = new Map();
  walkLocal(root, (rel, abs) => out.set(rel, blobSha(fs.readFileSync(abs))));
  return out;
}

/* 只要路径集合，不算 sha —— publish 判「远端独有」时用得上，避免白读几十 MB */
export function listLocalPaths(root) {
  const out = new Set();
  walkLocal(root, rel => out.add(rel));
  return out;
}

/* ---------- 凭据：取不到就返回 null，**绝不抛** ----------
 * publish.mjs 靠这个特性做降级：本地手工发布会取到 Windows 凭据库里的 PAT，
 * 而 GitHub Actions 的 ubuntu runner 上 tools/_cred-get.py 必然失败（它读的是
 * Windows 凭据管理器），于是 CI 里的每日发布自动跳过远端对账 —— 这正是想要的：
 * CI 的工作区刚 checkout，本地就是远端，没有「远端独有」可言。 */
export function getToken(root = process.cwd()) {
  if (process.env.GITHUB_TOKEN && process.env.GITHUB_TOKEN.trim()) {
    return process.env.GITHUB_TOKEN.trim();
  }
  try {
    const out = execFileSync("python", ["tools/_cred-get.py", "git"],
      { encoding: "utf8", cwd: root, timeout: 15000, stdio: ["ignore", "pipe", "ignore"] });
    return out.trim() || null;
  } catch {
    return null;
  }
}

/* ---------- 远端 tree → Map<路径, blob sha1> ----------
 * ★ 拿到的树必须先是**完整**的，否则「本地有、远端没有」会凭空变多，
 *   而那个数字是「要不要推 / 是不是有人删了东西」的唯一依据（2026-09-22 实测教训）。
 *   2026-09-22 深夜碰到过一次瞬时读数：「本地有、远端没有」从 19 跳到 **117**（差 98 项，
 *   恰好是本仓库 assets/ 那一层），紧接着连续 6 次都稳定在 19。**成因未证实**，
 *   但这类读数一旦被当成真的，下一步就是「把那 98 个文件推上去」——正好是反向的错误。
 *   所以两道守卫，宁可抛错也不输出半份对账：
 *   ① GitHub 明确说 `truncated` 就抛（recursive 请求被截断时它会给这个字段）；
 *   ② 哨兵：本仓库的 main 上必然有 `index.html` 与 `assets/app.js`，缺一个就说明这份树
 *      不完整（或 ref 拉错了）。只对本仓库 + main 生效 —— 换 repo 调用时不该假设这些文件在。
 */
export async function fetchRemoteTree(token, { repo = DEFAULT_REPO, ref = "main", timeout = 30000 } = {}) {
  const r = await fetch(`https://api.github.com/repos/${repo}/git/trees/${ref}?recursive=1`, {
    headers: { Authorization: `Bearer ${token}` },
    signal: AbortSignal.timeout(timeout),
  });
  const j = await r.json();
  if (!r.ok || !j.tree) {
    throw new Error(`拉远端树失败：${r.status} ${JSON.stringify(j).slice(0, 200)}`);
  }
  if (j.truncated === true) {
    throw new Error("远端树被 GitHub 截断了（truncated=true）：这份不完整，"
      + "拿它对账会算出「本地有一堆远端没有」。先重拉，别据此推送或删除任何东西。");
  }
  const map = new Map(j.tree.filter(x => x.type === "blob").map(x => [x.path, x.sha]));
  if (repo === DEFAULT_REPO && ref === "main") {
    const missing = ["index.html", "assets/app.js"].filter(p => !map.has(p));
    if (missing.length) {
      throw new Error(`远端树不完整：main 上找不到 ${missing.join("、")}（只拿到 ${map.size} 个 blob）。`
        + "这多半是一次残缺的响应 —— 重拉；别拿它当「远端少了东西」的证据。");
    }
  }
  return map;
}

/* ---------- 按 blob sha 拉远端文件内容 ----------
 * 用 blob API 而不是 contents+raw：调用方手上本来就有 tree 给的 sha（不用再多请求一次
 * 元数据），而且 contents API 对 >1MB 的文件会退化成空 content，blob API 能到 100MB。
 * 本仓库的 data-articles-extra.js 已经 600KB+，会继续长。 */
export async function fetchBlob(token, sha, { repo = DEFAULT_REPO, timeout = 60000 } = {}) {
  const r = await fetch(`https://api.github.com/repos/${repo}/git/blobs/${sha}`, {
    headers: { Authorization: `Bearer ${token}` },
    signal: AbortSignal.timeout(timeout),
  });
  const j = await r.json();
  if (!r.ok) throw new Error(`拉远端 blob 失败：${sha.slice(0, 8)} HTTP ${r.status}`);
  if (j.encoding !== "base64") throw new Error(`远端 blob 编码异常：${j.encoding}`);
  return Buffer.from(j.content, "base64");
}

/* ---------- 三方对账 ---------- */
export function diffTrees(local, remote) {
  const changed = [], onlyLocal = [], onlyRemote = [];
  for (const [p, sha] of local) {
    if (!remote.has(p)) onlyLocal.push(p);
    else if (remote.get(p) !== sha) changed.push(p);
  }
  for (const p of remote.keys()) if (!local.has(p)) onlyRemote.push(p);
  const sort = a => a.sort();
  sort(changed); sort(onlyLocal); sort(onlyRemote);
  return { changed, onlyLocal, onlyRemote };
}

/* ---------- 「远端有、本地没有」哪些能删（纯函数，可单测） ----------
 *
 * ⚠️ 这里守的是整条链路最危险的一条边界。远端独有文件有两类来源，路径上完全无法区分：
 *
 *   ① 该清的残留：撤栏目 / 撤功能时，文件从未发布过就被删掉，因此不在发布基线
 *      （.bak/published.json）里，publish.mjs 原有的 delete[] 永远看不见它们。
 *      2026-09-15 实测两次：40 张孤儿封面、assets/data-sprint.js + tools/build-sprint.mjs。
 *
 *   ② **绝不能删的**：GitHub Actions 的 daily-update 每天跑 tools/daily.mjs 抓新文章、
 *      下载新封面，然后 `git add -A` 提交回 main。本地工作区滞后时，这些新文章和
 *      新封面正是「远端有、本地没有」，而且**同样不在基线里**。
 *
 * 所以不能按路径或时间区分，只能问一句：**远端自己还引用这张图吗？**
 *   · 封面被远端文章引用着 → 是 ②（CI 刚抓的），保留
 *   · 封面没有任何远端引用 → 是 ①（孤儿），可删
 *   · 非封面文件（tools/*.mjs、assets/data-*.js…）：daily.mjs 只产出文章数据与封面，
 *     不会凭空造出新的源码文件，因此远端独有的非封面文件必是人工残留，可删。
 *     NEVER_PUSH 里的私密文件另有一道保险（见 _api-push.mjs addDelete）。
 *
 * referenced 传「远端当前的封面引用集合」（basename）。**拿不准就别删**：
 * 调用方拉不到远端数据时必须整段跳过，而不是把 referenced 当空集用 —— 那等于全删。
 */
export function classifyRemoteOnly(remoteOnly, { coverPrefix = "assets/covers/", referenced = new Set() } = {}) {
  const prunable = [], kept = [];
  for (const p of remoteOnly) {
    if (!p.startsWith(coverPrefix)) { prunable.push(p); continue; }
    const base = p.slice(coverPrefix.length);
    (referenced.has(base) ? kept : prunable).push(p);
  }
  return { prunable: prunable.sort(), kept: kept.sort() };
}

/* ---------- 文章数据求值（本地与远端两条路径共用同一段代码） ----------
 * sources: Map<仓库相对路径, 文件文本>。缺哪个就跳过哪个（远端可能还没这个文件）。
 * 放在这个 lib 里而不是各写一份：上面的 classifyRemoteOnly 要拿「远端引用集合」做
 * 删/不删的判决，而远端集合只能靠把远端那几份数据文件跑一遍得到 —— 如果那段求值
 * 逻辑和 publish.mjs 本地那份有半点出入，判决就会错，而且错的方向是**误删 CI 抓的封面**。 */
export function evalArticleData(sources) {
  const ctx = vm.createContext({ console, window: { addEventListener() { } } });
  vm.runInContext("var window=globalThis;", ctx);
  for (const f of ARTICLE_DATA_FILES) {
    const text = sources instanceof Map ? sources.get(f) : sources[f];
    if (text == null) continue;
    vm.runInContext(text, ctx, { filename: f });
  }
  return {
    articles: vm.runInContext("typeof ARTICLES === 'undefined' ? [] : ARTICLES", ctx),
    coverMap: vm.runInContext("typeof COVER_MAP === 'undefined' ? {} : COVER_MAP", ctx),
  };
}

/* ---------- 从文章集合算「被引用的封面文件名」集合 ----------
 * 口径：coverImg / COVER_MAP[id] / 正文图 p.img，取 basename。
 * skipIds 用于「瘦身后」的场景：被淘汰文章引用的图不该算作仍被引用，
 * 否则它们的封面永远进不了孤儿归档。 */
export function referencedCovers(articles, coverMap = {}, { skipIds = new Set() } = {}) {
  const refs = new Set();
  for (const a of articles) {
    if (skipIds.has(a.id)) continue;
    const c = a.coverImg || coverMap[a.id];
    if (c) refs.add(path.basename(c));
    for (const p of a.paras || []) if (p.img) refs.add(path.basename(p.img));
  }
  return refs;
}

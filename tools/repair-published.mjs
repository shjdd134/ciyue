/* 修复 published.json：从远端真实状态重建「上次成功发布」基线。
 *
 * 为什么存在：.bak/published.json 是 publish.mjs 算推送清单的唯一基线，而
 * release-test.mjs 的 C 段会真跑一次 publish，把自己的播种值写进去
 * （实测 2026-09-14：commit=release-test-seed、articles 只剩 3 篇、463 张封面
 * 被记成「已发布」）。按假基线推，440 张新封面会被整体跳过 —— 线上全是断图。
 * 本地没有任何污染前的存档（21:27 批次是个中断批次，只有 before/ 没有 manifest），
 * 唯一权威是远端，所以直接拉远端树重建。
 *
 * 重建口径（与 _api-push.mjs 的基线语义严格对齐）：
 *   files[f] = 远端有 f 且本地内容与之**逐字节一致**时，记本地内容的 raw sha1；
 *              本地没有或内容不同 → 不记，publish 的 diff 自然会把它列进推送。
 *   articles = 远端 data.js + data-articles-extra.js 里实际在线的文章 id。
 *   commit   = 远端 main 的 commit sha。
 *
 * 用法：GITHUB_TOKEN=$(python tools/_cred-get.py git) node tools/repair-published.mjs [--dry]
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execSync } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..");
const REPO = "SHJDD134/ciyue";
const API = `https://api.github.com/repos/${REPO}`;
const DRY = process.argv.includes("--dry");
const NEVER_PUSH = new Set(["tools/.ecdict-blob.json", "tools/.deepl-key", "tools/_aesop-raw.html"]);

const token = () => process.env.GITHUB_TOKEN
  || execSync("python tools/_cred-get.py git", { cwd: ROOT, timeout: 20000 }).toString().trim();
const T = token();
const H = { Authorization: `Bearer ${T}`, "Content-Type": "application/json" };
const api = async (p, opts = {}) => {
  const r = await fetch(API + p, { ...opts, headers: H });
  const d = JSON.parse(await r.text());
  if (!r.ok) throw new Error(`${r.status} ${JSON.stringify(d).slice(0, 300)}`);
  return d;
};
/* contents 接口带 Accept: raw 时响应体是文件原文，不是 JSON —— 单独一条通道 */
const apiRaw = async (p, ref) => {
  const r = await fetch(API + p, { headers: { ...H, Accept: "application/vnd.github.raw" } });
  if (!r.ok) throw new Error(`${r.status} ${p}`);
  return r.text();
};

const blobSha = buf => crypto.createHash("sha1").update(`blob ${buf.length}\0`).update(buf).digest("hex");
const rawSha1 = buf => crypto.createHash("sha1").update(buf).digest("hex");

/* 1. 远端树 + main 指针 */
const ref = await api("/git/ref/heads/main");
const baseSha = ref.object.sha;
const baseTree = (await api(`/git/commits/${baseSha}`)).tree.sha;
const tree = await api(`/git/trees/${baseTree}?recursive=1`);
const remote = new Map(tree.tree.filter(t => t.type === "blob").map(t => [t.path, t.sha]));
console.log(`远端 main ${baseSha.slice(0, 7)} · ${remote.size} 个文件`);

/* 2. 逐文件比对本地：内容一致才记入基线 */
const files = {};
let same = 0, differ = [], remoteOnly = [];
for (const [f, sha] of remote) {
  if (NEVER_PUSH.has(f)) continue;
  const abs = path.join(ROOT, f);
  if (!fs.existsSync(abs)) { remoteOnly.push(f); continue; }
  const buf = fs.readFileSync(abs);
  if (blobSha(buf) === sha) { files[f] = rawSha1(buf); same++; }
  else differ.push(f);
}
console.log(`本地与远端一致 ${same} · 内容不同 ${differ.length} · 仅远端有 ${remoteOnly.length}`);
if (differ.length) console.log("  内容不同（将进推送清单）：", differ.slice(0, 8).join(", "), differ.length > 8 ? "…" : "");
if (remoteOnly.length) console.log("  仅远端有（将进删除清单）：", remoteOnly.slice(0, 8).join(", "), remoteOnly.length > 8 ? "…" : "");

/* 3. 远端在线文章 id：data.js + data-articles-extra.js 的 id 字段 */
const idOf = src => [...String(src).matchAll(/"id":\s*"([^"]+)"/g)].map(m => m[1]);
const articles = new Set();
for (const f of ["assets/data.js", "assets/data-articles-extra.js"]) {
  if (!remote.has(f)) continue;
  const r = await apiRaw(`/contents/${f}?ref=main`);   // ref=sha 会 404，branch 名反而稳
  idOf(r).forEach(id => articles.add(id));
}
console.log(`远端在线文章 ${articles.size} 篇（含 data.js 基础词文）`);

const state = {
  at: new Date().toISOString(),
  commit: baseSha,
  files,
  articles: [...articles],
};
if (DRY) { console.log(`\n--dry：将写入 ${Object.keys(files).length} 个文件 / ${articles.size} 篇，未写盘`); process.exit(0); }

/* 4. 写盘走 updatePublished？不行 —— 它是「在旧基线上打补丁」的语义，
 * 这里要整体替换，直接按 writePublished 的格式落盘。 */
const { writePublished } = await import("./lib-release.mjs");
writePublished(ROOT, state);
console.log(`\n已重建 .bak/published.json：${Object.keys(files).length} 文件 · ${articles.size} 篇`);
console.log("下一步：node tools/publish.mjs   重新出真实推送清单");

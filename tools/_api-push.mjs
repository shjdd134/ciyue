/* 通过 GitHub Git Data API 推送工作区变更（沙箱 git 无法直连 github.com 时的替代通道）
 *   用法: node tools/_api-push.mjs "<commit message>" [--only "a.js,b.js"]
 * 凭据: 从 Windows 凭据管理器（git credential fill）取已缓存 PAT，不落盘不打印
 * 增量: 对比远端树 sha —— 内容一致的文件不上传；远端已不存在的删除项跳过。
 *   （本地 git HEAD 长期落后于远端，porcelain 状态含大量重复 diff，必须去重）
 * --only: 只推指定路径。本地索引落后时 porcelain 会混进上百个「工作区已删除」
 *   的旧图片条目，全量推会把远端还在用的图删掉——改数据/代码时务必带白名单。
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execSync } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..");
const REPO = "SHJDD134/ciyue";
const API = `https://api.github.com/repos/${REPO}`;
const MSG = process.argv[2] || "update";
const ONLY = (() => {
  const i = process.argv.indexOf("--only");
  return i > 0 && process.argv[i + 1] ? new Set(process.argv[i + 1].split(",").map(s => s.trim())) : null;
})();
const NEVER_PUSH = new Set(["tools/.ecdict-blob.json", "tools/.deepl-key", "tools/_aesop-raw.html"]);

function token() {
  /* ⚠️ 2026-09-11：git-credential-manager.exe 会在无桌面会话里挂死 —— 即便已设
   * GCM_INTERACTIVE=never / GIT_TERMINAL_PROMPT=0，实测 60s+ 无任何返回（判断是
   * 它想联网刷新 OAuth 或弹 GUI）。所以改为优先吃环境变量 GITHUB_TOKEN，
   * 原来的 git credential fill 降级为限时 15s 的兜底。
   * 取 token 的备用通道：tools/_cred-get.py（直接读 Windows 凭据库，不落盘不打印），
   *   用法 GITHUB_TOKEN=$(python tools/_cred-get.py git) node tools/_api-push.mjs ... */
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN.trim();
  const out = execSync("git credential fill", {
    input: "protocol=https\nhost=github.com\n\n",
    env: { ...process.env, GCM_INTERACTIVE: "never", GIT_TERMINAL_PROMPT: "0" },
    encoding: "utf8", timeout: 15000,
  });
  const m = out.match(/^password=(.*)$/m);
  if (!m) throw new Error("未取到 GitHub 凭据（可改用 GITHUB_TOKEN 环境变量或 tools/_cred-get.py）");
  return m[1].trim();
}
const T = token();
const H = { Authorization: `Bearer ${T}`, "Content-Type": "application/json" };
const j = (r, text) => { const d = JSON.parse(text || "{}"); if (!r.ok) throw new Error(`${r.status} ${JSON.stringify(d).slice(0, 500)}`); return d; };
const api = async (p, opts = {}) => { const r = await fetch(API + p, { ...opts, headers: H }); return j(r, await r.text()); };

/* 1. 基线 ref + 远端全树 */
const ref = await api("/git/ref/heads/main");
const baseSha = ref.object.sha;
const baseTree = (await api(`/git/commits/${baseSha}`)).tree.sha;
const remoteTree = await api(`/git/trees/${baseTree}?recursive=1`);
const remote = new Map(remoteTree.tree.filter(t => t.type === "blob").map(t => [t.path, t.sha]));
console.log(`基线 ${baseSha.slice(0, 7)} | 远端文件 ${remote.size} 个\n`);

/* 2. git status → 变更清单，与远端做内容比对去重 */
const blobSha = buf => crypto.createHash("sha1").update(`blob ${buf.length}\0`).update(buf).digest("hex");
/* 注意：本会话 shim 会吞掉 porcelain 首行的前导空格，路径解析必须用宽松正则剥状态位 */
const status = execSync("git status --porcelain", { cwd: ROOT }).toString().trim().split("\n")
  .map(l => { const f = l.replace(/^\s*[A-Z?!]{1,2}\s+/, "").trim(); return { x: l.trim().slice(0, 2), file: f }; })
  .filter(e => e.file && !NEVER_PUSH.has(e.file))
  .filter(e => !ONLY || ONLY.has(e.file));

const entries = [];
for (const e of status) {
  if (e.x.includes("D")) {
    if (remote.has(e.file)) { entries.push({ path: e.file, mode: "100644", sha: null }); console.log("删", e.file); }
    continue;
  }
  const buf = fs.readFileSync(path.join(ROOT, e.file));
  const sha = blobSha(buf);
  if (remote.get(e.file) === sha) continue;   // 内容与远端一致，跳过
  const blob = await api("/git/blobs", { method: "POST", body: JSON.stringify({ content: buf.toString("base64"), encoding: "base64" }) });
  entries.push({ path: e.file, mode: "100644", type: "blob", sha: blob.sha });
  console.log(remote.has(e.file) ? "改" : "新", e.file, `(${(buf.length / 1024).toFixed(0)}KB)`);
}
console.log(`\n实际变更 ${entries.length} 项`);
if (!entries.length) { console.log("远端已是最新，无需提交"); process.exit(0); }

/* 3. tree → commit → 更新 ref */
const tree = await api("/git/trees", { method: "POST", body: JSON.stringify({ base_tree: baseTree, tree: entries }) });
const commit = await api("/git/commits", {
  method: "POST",
  body: JSON.stringify({
    message: MSG, tree: tree.sha, parents: [baseSha],
    committer: { name: "wordlens-bot", email: "wordlens-bot@users.noreply.github.com" },
  }),
});
await api("/git/refs/heads/main", { method: "PATCH", body: JSON.stringify({ sha: commit.sha, force: false }) });
console.log("已推送:", commit.sha.slice(0, 7), "-", MSG);

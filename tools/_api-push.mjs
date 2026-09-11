/* 通过 GitHub Git Data API 推送工作区变更（沙箱 git 无法直连 github.com 时的替代通道）
 *   用法: node tools/_api-push.mjs "<commit message>"
 * 凭据: 从 Windows 凭据管理器（git credential fill）取已缓存 PAT，不落盘不打印
 */
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..");
const REPO = "SHJDD134/ciyue";
const MSG = process.argv[2] || "update content";
const API = `https://api.github.com/repos/${REPO}`;

function token() {
  const out = execSync("git credential fill", {
    cwd: ROOT,
    input: "protocol=https\nhost=github.com\n\n",
    env: { ...process.env, GCM_INTERACTIVE: "never", GIT_TERMINAL_PROMPT: "0" },
  }).toString();
  const t = out.split("\n").find(l => l.startsWith("password="))?.slice(9).trim();
  if (!t) throw new Error("未取到凭据");
  return t;
}

const T = token();
const H = { Authorization: `Bearer ${T}`, "Content-Type": "application/json" };
const j = (r, text) => { const d = JSON.parse(text || "{}"); if (!r.ok) throw new Error(`${r.status} ${JSON.stringify(d).slice(0, 200)}`); return d; };
const api = async (p, opts = {}) => { const r = await fetch(API + p, { ...opts, headers: H }); return j(r, await r.text()); };

/* 1. 基线 */
const ref = await api("/git/ref/heads/main");
const baseSha = ref.object.sha;
const baseCommit = await api(`/git/commits/${baseSha}`);
const baseTree = baseCommit.tree.sha;
console.log("基线:", baseSha.slice(0, 7), "tree:", baseTree.slice(0, 7));

/* 2. 变更清单（git status --porcelain） */
const status = execSync("git status --porcelain", { cwd: ROOT }).toString().trim().split("\n").map(l => {
  const m = l.match(/^ ?([MADR?UT]+) +(.+)$/);   // 兼容首行前导空格被吞的情况
  return m ? { x: m[1], file: m[2] } : null;
}).filter(e => e && e.file && !/^\.(tmp-|bak|workbuddy)/.test(e.file) && !e.file.startsWith(".tmp"));

const entries = [];
for (const e of status) {
  if (e.x.includes("D")) { entries.push({ path: e.file, mode: "100644", sha: null }); console.log("删", e.file); continue; }
  const buf = fs.readFileSync(path.join(ROOT, e.file));
  const blob = await api("/git/blobs", { method: "POST", body: JSON.stringify({ content: buf.toString("base64"), encoding: "base64" }) });
  entries.push({ path: e.file, mode: "100644", type: "blob", sha: blob.sha });
  console.log("传", e.file, `(${(buf.length / 1024).toFixed(0)}KB)`);
}
console.log(`共 ${entries.length} 项\n`);

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

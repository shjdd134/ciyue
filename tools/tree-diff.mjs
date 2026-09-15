#!/usr/bin/env node
/* 权威对账：远端 tree 的 blob sha vs 本地文件的 git blob sha1。
 *
 * 为什么必须有这个脚本：本仓库的**本地 git 索引严重落后**，`git status` 会显示
 * 大量假象（`D assets/covers/*.jpg`、`?? tools/publish.mjs` 之类，实测这些文件
 * 在远端且 sha 一致）。所以「该推什么」永远不要问 git index，要问远端 tree。
 *
 * 单文件比 sha1 就够了 —— GitHub 的 tree API 直接给出 blob 的 sha1，不用拉内容，
 * 一次请求（recursive）就能把整个仓库对完。
 *
 * 用法：node tools/tree-diff.mjs [--json]
 *   退出码 0 = 与远端一致（只剩 expected 的远端独有项）；1 = 有未推送改动。
 * 忽略规则读 .gitignore（支持 `!` 反选、`dir/` 前缀、`*` / `?` 通配），别去手改
 * 硬编码清单 —— 那正是本项目反复踩的「两套尺子」。 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';

const ROOT = path.resolve(import.meta.dirname, '..');
const REPO = 'shjdd134/ciyue';
const JSON_OUT = process.argv.includes('--json');

/* ---------- .gitignore 解析（git 语义：最后一条命中的规则说了算） ---------- */
function loadIgnore(root) {
  const lines = fs.readFileSync(path.join(root, '.gitignore'), 'utf8')
    .split(/\r?\n/).map(s => s.trim()).filter(s => s && !s.startsWith('#'));
  const rules = [];
  for (const raw of lines) {
    const neg = raw.startsWith('!');
    const pat = neg ? raw.slice(1) : raw;
    const dirOnly = pat.endsWith('/');
    const body = pat.replace(/\/+$/, '');
    /* 不含 `/` 的模式匹配任意层级的文件名（`*.log`）；含 `/` 的从仓库根锚定 */
    const anchored = body.includes('/');
    const rx = new RegExp(
      (anchored ? '^' : '(?:^|/)') +
      body.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '[^/]*').replace(/\?/g, '[^/]') +
      (dirOnly ? '/.*$' : '(?:/.*)?$'));
    rules.push({ neg, rx });
  }
  return p => {
    let hit = false;
    for (const r of rules) if (r.rx.test(p)) hit = !r.neg;
    return hit;
  };
}

const ignored = loadIgnore(ROOT);
const isIgnored = p => p === '.git' || p.startsWith('.git/') || ignored(p);

/* ---------- 远端 ---------- */
const token = execFileSync('python', ['tools/_cred-get.py', 'git'], { encoding: 'utf8', cwd: ROOT }).trim();
if (!token) { console.error('✗ 取不到 git token（tools/_cred-get.py git）'); process.exit(2); }
const res = await fetch(`https://api.github.com/repos/${REPO}/git/trees/main?recursive=1`,
  { headers: { Authorization: 'Bearer ' + token } });
const tree = await res.json();
if (!tree.tree) { console.error('✗ 拉不到远端树：', JSON.stringify(tree).slice(0, 300)); process.exit(2); }
const remote = new Map(tree.tree.filter(x => x.type === 'blob').map(x => [x.path, x.sha]));

/* ---------- 本地 ---------- */
const blobSha = buf => { const h = crypto.createHash('sha1'); h.update(`blob ${buf.length}\0`); h.update(buf); return h.digest('hex'); };
const local = new Map();
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, e.name);
    const rel = path.relative(ROOT, abs).replace(/\\/g, '/');
    if (isIgnored(rel)) continue;
    if (e.isDirectory()) walk(abs);
    else local.set(rel, blobSha(fs.readFileSync(abs)));
  }
})(ROOT);

/* ---------- 对账 ---------- */
const changed = [], onlyLocal = [], onlyRemote = [];
for (const [p, sha] of local) {
  if (!remote.has(p)) onlyLocal.push(p);
  else if (remote.get(p) !== sha) changed.push(p);
}
for (const p of remote.keys()) if (!local.has(p)) onlyRemote.push(p);
const sort = a => a.sort();
sort(changed); sort(onlyLocal); sort(onlyRemote);

if (JSON_OUT) {
  console.log(JSON.stringify({ remote: remote.size, local: local.size, changed, onlyLocal, onlyRemote }, null, 1));
} else {
  console.log(`远端 blob ${remote.size} · 本地(未忽略) ${local.size}`);
  console.log(`\n### 内容有差异（远端 → 本地） ${changed.length}`);
  for (const p of changed) console.log('  ' + p);
  console.log(`\n### 本地有、远端没有 ${onlyLocal.length}`);
  for (const p of onlyLocal) console.log('  ' + p);
  console.log(`\n### 远端有、本地没有 ${onlyRemote.length}`);
  for (const p of onlyRemote) console.log('  ' + p);
  if (changed.length + onlyLocal.length + onlyRemote.length === 0) console.log('\n✓ 工作树与远端逐文件一致');
}
process.exitCode = (changed.length + onlyLocal.length) ? 1 : 0;

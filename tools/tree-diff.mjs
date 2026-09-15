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
 *   退出码 0 = 与远端一致；1 = 有未推送改动（changed 或 onlyLocal）。
 *   「远端有、本地没有」不算未推送改动（那是 CI 抓的新内容或别人推的），但会列出来。
 *
 * 实现全在 tools/lib-tree.mjs —— publish.mjs 的「远端残留对账」用的是同一份代码。
 * 别在这里再写一份对账逻辑：两套尺子会让「对账说干净、发布却删东西」变成可能。 */
import path from 'node:path';
import { getToken, fetchRemoteTree, listLocalFiles, diffTrees, DEFAULT_REPO } from './lib-tree.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const JSON_OUT = process.argv.includes('--json');

const token = getToken(ROOT);
if (!token) { console.error('✗ 取不到 git token（环境变量 GITHUB_TOKEN 或 tools/_cred-get.py git）'); process.exit(2); }

let remote;
try {
  remote = await fetchRemoteTree(token, { repo: DEFAULT_REPO });
} catch (e) {
  console.error('✗ ' + e.message);
  console.error('  网络不通时这个脚本没有意义 —— 它对的就是远端。');
  process.exit(2);
}
const local = listLocalFiles(ROOT);
const { changed, onlyLocal, onlyRemote } = diffTrees(local, remote);

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

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
import fs from 'node:fs';
import { getToken, fetchRemoteTree, listLocalFiles, diffTrees, DEFAULT_REPO } from './lib-tree.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const JSON_OUT = process.argv.includes('--json');

const token = getToken(ROOT);
if (!token) { console.error('✗ 取不到 git token（环境变量 GITHUB_TOKEN 或 tools/_cred-get.py git）'); process.exit(2); }

const remote = await (async () => {
  try {
    return await fetchRemoteTree(token, { repo: DEFAULT_REPO });
  } catch (e) {
    console.error('✗ ' + e.message);
    /* ★ 这句原来是「网络不通时这个脚本没有意义」——它把**所有**失败都归到网络上，
       包括「远端树残缺」这类**必须换一句话说清**的失败（2026-09-22 实测：残缺响应会让
       「本地有、远端没有」从 19 跳到 117，而那句笼统的提示会让人以为是网络抖动、
       重试一下就好，接着就把多出来的 98 项当成真的）。原文保留给真正的网络故障，
       其余按原样抛出 —— 对账失败的原因本身就是结论的一部分。 */
    if (/fetch|timeout|ECONN|ENOTFOUND|abort/i.test(e.message)) {
      console.error('  网络不通时这个脚本没有意义 —— 它对的就是远端。');
    } else {
      console.error('  ★ 这不是网络问题：远端树本身不可用。重拉一次；连续两次同样报错就去查远端，'
        + '别输出「本地有、远端没有」这种结论。');
    }
    process.exit(2);
  }
})();
const local = listLocalFiles(ROOT);
const { changed, onlyLocal, onlyRemote } = diffTrees(local, remote);

/* ---------- 断链风险判读：`onlyLocal` 里的文件**被谁引用** ----------
 * 「本地有、远端没有」本身多数无害（.qoder 产物、本地专用脚本）；但**被引用的那个**不是 ——
 * 引用方一旦在远端，加载时就是 ESM 的 ERR_MODULE_NOT_FOUND，或 index.html 的 404。
 *
 * 起因（2026-09-21）：`daily.mjs` / `release.mjs` 静态 `import "./lib-memory.mjs"`，
 * 两个调用方随 v67（0a52d1f）推上去了、**被 import 的模块本体没推** →
 * 次日 07:00 的 CI `node tools/daily.mjs` 会当场崩。当时的推理错误是：
 * 「CI 里 `.workbuddy/` 不存在、护栏逻辑不触发，所以推不推没差别」——
 * **静态 import 在模块加载期解析，与被 import 的代码是否会执行完全无关。**
 *
 * 判据故意不区分「引用方是否已在远端」—— 只要本地有地方引用它，就是隐患：
 * 引用方已推 → 现在就坏；引用方将来推 → 推的时候一定忘。 */
const onlyLocalSet = new Set(onlyLocal);
function findBrokenRefs() {
  const hits = [];
  const note = (from, rawTarget, relOnly) => {
    const t = rawTarget.split('?')[0].split('#')[0];              // 去掉 ?v=69 / #hash
    if (!t || /^(?:https?:)?\/\//.test(t) || /^(?:data|mailto|tel):/.test(t)) return;
    if (t.startsWith('/')) return;                                 // 站点绝对路径，不是仓库内文件
    if (relOnly && !t.startsWith('.')) return;                     // ESM：裸包名不是仓库内文件
    const rel = path.relative(ROOT, path.resolve(ROOT, path.dirname(from), t)).replace(/\\/g, '/');
    if (onlyLocalSet.has(rel)) hits.push({ missing: rel, from });
  };
  // 1) tools/*.mjs 的静态 import（含 import "x"、import {a} from "x"、多行写法）
  //    注意 `local` 是 Map<路径, sha>，遍历要取 keys —— 直接 for…of 拿到的是 [路径, sha] 数组。
  const RE_IMPORT = /(?:^|\n)[ \t]*import[ \t]+(?:[\s\S]*?[ \t]+from[ \t]+)?["']([^"']+)["']/g;
  for (const p of local.keys()) {
    if (!/^tools\/[^/]+\.mjs$/.test(p)) continue;
    const src = fs.readFileSync(path.join(ROOT, p), 'utf8');
    for (const m of src.matchAll(RE_IMPORT)) note(p, m[1], true);
  }
  // 2) index.html 的本地 script/src、link/href（`assets/app.js?v=69` 这类要剥 query）
  if (local.has('index.html')) {
    const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
    for (const m of html.matchAll(/<(?:script|link)\b[^>]*?\b(?:src|href)=["']([^"']+)["']/g)) note('index.html', m[1], false);
  }
  return hits;
}
const brokenRefs = findBrokenRefs();

if (JSON_OUT) {
  console.log(JSON.stringify({ remote: remote.size, local: local.size, changed, onlyLocal, onlyRemote, brokenRefs }, null, 1));
} else {
  console.log(`远端 blob ${remote.size} · 本地(未忽略) ${local.size}`);
  console.log(`\n### 内容有差异（远端 → 本地） ${changed.length}`);
  for (const p of changed) console.log('  ' + p);
  console.log(`\n### 本地有、远端没有 ${onlyLocal.length}`);
  for (const p of onlyLocal) console.log('  ' + p);
  console.log(`\n### 远端有、本地没有 ${onlyRemote.length}`);
  for (const p of onlyRemote) console.log('  ' + p);
  if (brokenRefs.length) {
    console.log(`\n### ⚠ 断链风险 ${brokenRefs.length} 处 —— 这些文件在远端不存在，却已被引用`);
    for (const b of brokenRefs) console.log(`  ${b.missing}   ← 被 ${b.from} 引用`);
    console.log('  → 引用方在远端加载时会 ERR_MODULE_NOT_FOUND / 404。推引用方时必须带上被引用的文件。');
  }
  if (changed.length + onlyLocal.length + onlyRemote.length === 0) console.log('\n✓ 工作树与远端逐文件一致');
}
process.exitCode = (changed.length + onlyLocal.length) ? 1 : 0;

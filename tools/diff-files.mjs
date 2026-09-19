/* 推送前的逐文件「本地 vs 远端」行级比对。
 *
 * 为什么需要它：这个仓库经常有并行 agent 在改同一批文件。`tree-diff.mjs` 只说
 * 「这个文件两边不一样」，**不说「不一样的这些行归谁」**。实测过一次：app.js 出现在
 * 差异列表里，而远端独有行其实全是我要替换掉的旧代码（只有 2 行版本号是我改的）——
 * 如果因为「远端和我都不一样」就放弃推送，就永远推不上去；反过来，如果远端独有行里
 * 混着别人的未推改动，直接推就是覆盖别人的工作。
 *
 * 判据：
 *   · 远端独有行全是我这次要替换掉的旧实现  → 安全，推
 *   · 出现我没写过的逻辑 / 我没动过的段落    → 停下，那是并行 agent 的未推改动
 *
 * 用法：
 *   GITHUB_TOKEN=$(python tools/_cred-get.py git) node tools/diff-files.mjs <file1> <file2> ...
 *
 * ⚠️ 走 node fetch，不要用 curl：实测 curl 到 raw.githubusercontent.com 会挂死
 *    （4 分钟无响应），而 api.github.com 走 node fetch 是通的。
 */
import fs from 'node:fs';
import path from 'node:path';
import { getToken, fetchRemoteTree, fetchBlob } from './lib-tree.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const files = process.argv.slice(2);
if (!files.length) { console.error('用法：node tools/diff-files.mjs <file...>'); process.exit(2); }

const token = getToken(ROOT);
const byPath = await fetchRemoteTree(token);   // Map<path, sha>

for (const f of files) {
  const sha = byPath.get(f);
  const local = fs.existsSync(path.join(ROOT, f)) ? fs.readFileSync(path.join(ROOT, f), 'utf8') : null;
  console.log('\n===== ' + f);
  if (!sha) { console.log('  远端不存在（本次为新增文件）'); continue; }
  const remote = (await fetchBlob(token, sha)).toString('utf8');
  if (remote === local) { console.log('  与远端逐字节一致'); continue; }
  const rl = remote.split('\n'), ll = local === null ? [] : local.split('\n');
  const lset = new Set(ll), rset = new Set(rl);
  /* 用「行集合差」而不是 diff 算法：这里要回答的是「远端有哪些行我这边完全没有」，
     不关心位置。集合差对「重排 / 移动」不敏感，正合适 —— 我只怕覆盖别人的逻辑。 */
  const onlyRemote = rl.filter(l => !lset.has(l) && l.trim());
  const onlyLocal = ll.filter(l => !rset.has(l) && l.trim());
  console.log(`  remote ${rl.length} 行 / local ${ll.length} 行`);
  console.log(`  ── 远端独有（我可能覆盖掉别人的东西，共 ${onlyRemote.length} 行）`);
  onlyRemote.slice(0, 25).forEach(l => console.log('    R| ' + l.slice(0, 150)));
  if (onlyRemote.length > 25) console.log(`    … 另 ${onlyRemote.length - 25} 行`);
  console.log(`  ── 本地独有（我新写的，共 ${onlyLocal.length} 行）`);
  onlyLocal.slice(0, 6).forEach(l => console.log('    L| ' + l.slice(0, 150)));
  if (onlyLocal.length > 6) console.log(`    … 另 ${onlyLocal.length - 6} 行`);
}

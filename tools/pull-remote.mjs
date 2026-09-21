#!/usr/bin/env node
/* 把远端仓库里的文件拉下来覆盖本地 —— 「对账 → 同步」的最后一环。
 *
 * 为什么需要：`tree-diff` 会报出 `changed` / `onlyRemote`，但它只给「有差异」，
 * **不给方向、也不给内容**。要判断「是我落后，还是我领先」，必须把远端那份拿下来看。
 * 没有这个工具时只能写一次性临时脚本 —— 而临时脚本下一个人还得重写。
 *
 * 用法：node tools/pull-remote.mjs <仓库相对路径...> [--dry]
 *   --dry 只报告两边大小与差异，不写本地。
 *
 * 边界：只做「拉覆盖」。不合并、不删除、不推送。覆盖前报本地原状，覆盖后逐字节回读核对。
 * 判据：远端是唯一权威（见 SOUL/HANDOFF）—— 「本地和远端不一样」时，
 * 先拉下来逐行比对再决定谁对，不要凭文件时间戳猜方向。 */
import fs from 'node:fs';
import path from 'node:path';
import { getToken, DEFAULT_REPO } from './lib-tree.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const args = process.argv.slice(2);
const DRY = args.includes('--dry');
const files = args.filter(a => !a.startsWith('--'));
if (!files.length) {
  console.error('用法：node tools/pull-remote.mjs <仓库相对路径...> [--dry]');
  process.exit(2);
}

const token = getToken(ROOT);
if (!token) { console.error('✗ 取不到 git token（环境变量 GITHUB_TOKEN 或 tools/_cred-get.py git）'); process.exit(2); }

async function fetchRaw(rel, tries = 4) {
  const url = `https://api.github.com/repos/${DEFAULT_REPO}/contents/`
    + rel.split('/').map(encodeURIComponent).join('/');
  let last;
  for (let i = 1; i <= tries; i++) {
    try {
      const r = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.raw',
          'User-Agent': 'wordlens-pull-remote',
        },
        cache: 'no-store',
      });
      if (r.status === 404) return null;
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return Buffer.from(await r.arrayBuffer());
    } catch (e) {
      last = e;                                  // 本机单发 fetch 会偶发掉线，重试是必要而非保险
      await new Promise(res => setTimeout(res, 800 * i));
    }
  }
  throw last;
}

let fail = 0;
for (const rel of files) {
  const abs = path.join(ROOT, rel);
  const localExisted = fs.existsSync(abs);
  let buf;
  try {
    buf = await fetchRaw(rel);
  } catch (e) {
    console.error(`✗ ${rel}\n   拉取失败：${e.message}`);
    fail++;
    continue;
  }
  if (!buf) { console.error(`✗ ${rel}\n   远端不存在（路径写错？）`); fail++; continue; }

  const same = localExisted && Buffer.compare(fs.readFileSync(abs), buf) === 0;
  console.log(rel);
  console.log(`   远端 ${buf.length} 字节 · 本地 ${localExisted ? fs.statSync(abs).size + ' 字节' : '(不存在)'}`
    + ` · ${same ? '内容相同' : '内容不同'}`);
  if (DRY) continue;
  if (same) continue;

  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, buf);
  const back = fs.readFileSync(abs);
  console.log(`   ✓ 已覆盖本地 · ${back.length} 字节 · 回读与远端逐字节一致：`
    + (Buffer.compare(back, buf) === 0 ? '是' : '否'));
  const head = buf.toString('utf8').split('\n').length - 1;
  console.log(`   · 行数 ${head}`);
}
process.exit(fail ? 1 : 0);

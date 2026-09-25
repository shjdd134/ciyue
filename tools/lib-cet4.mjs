/* 词库难度统计：cet4_words（四级核心词命中）—— football.mjs 与 james-clear.mjs 共用。
 *
 * 从 football.mjs 抽出（2026-09-25）：james-clear 通道需要同一套口径，而直接 import
 * football.mjs 会执行它的顶层 CLI 分发（--inject 会误触 football 的同名分支 exit 1）。
 * 口径说明保持不变：难度看「低频词占比」，这里只列 CET4 核心层，供人工评估用，
 * 不进应用数据（见 football.mjs --inject 注释）。
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

let BANK = null;
function bank() {
  if (BANK) return BANK;
  const read = (file, name) => {
    const s = fs.readFileSync(path.join(ROOT, 'assets', file), 'utf8');
    // 声明形式是 `window.WORDS_FULL = [ ... \n];`（不是 const），别照抄 ingest 那条正则
    const m = s.match(new RegExp('(?:window\\.|const |var )?' + name + '\\s*=\\s*(\\[[\\s\\S]*?\\n\\]);'));
    if (!m) throw new Error('读不到 ' + name + ' in ' + file);
    return JSON.parse(m[1]);
  };
  const core = read('data-words-full.js', 'WORDS_FULL');
  const mid = read('data-words-mid.js', 'WORDS_MID');
  BANK = {
    core: new Map(core.map(w => [w.word.toLowerCase(), w])),
    mid: new Map(mid.map(w => [w.word.toLowerCase(), w])),
  };
  return BANK;
}

export const TOKEN = /[A-Za-z]+(?:['’][A-Za-z]+)?/g;

/* 不规则复数/时态归一到词库里的原形。只处理高频几类，不要写通用词形还原（会误判）。 */
export function lemmaCands(w) {
  const out = [w];
  if (w.endsWith('ies')) out.push(w.slice(0, -3) + 'y');
  if (w.endsWith('es')) out.push(w.slice(0, -2));
  if (w.endsWith('s')) out.push(w.slice(0, -1));
  if (w.endsWith('ing')) out.push(w.slice(0, -3), w.slice(0, -3) + 'e');
  if (w.endsWith('ed')) out.push(w.slice(0, -2), w.slice(0, -1));
  if (w.endsWith('er')) out.push(w.slice(0, -2), w.slice(0, -1));
  return out;
}

export function cet4Words(paras) {
  const seen = new Map();
  for (const p of paras) for (const s of p.sentences || [p]) {
    TOKEN.lastIndex = 0;
    let m;
    while ((m = TOKEN.exec(String(s.en || '')))) {
      const raw = m[0], low = raw.replace(/[’]/g, "'").toLowerCase();
      let hit = null, layer = null;
      for (const c of lemmaCands(low)) {
        if (bank().core.has(c)) { hit = bank().core.get(c); layer = 'core'; break; }
      }
      if (!hit) for (const c of lemmaCands(low)) {
        if (bank().mid.has(c)) { hit = bank().mid.get(c); layer = 'base'; break; }
      }
      if (!hit) continue;
      const key = hit.word.toLowerCase();
      if (seen.has(key)) { seen.get(key).n++; continue; }
      seen.set(key, { w: hit.word, layer, pos: hit.pos || '', def: hit.def || '', n: 1 });
    }
  }
  /* 只收「四级核心」层 —— 中学基础层读者基本都会，列进来是噪音。 */
  return [...seen.values()].filter(x => x.layer === 'core')
    .sort((a, b) => b.n - a.n || a.w.localeCompare(b.w));
}

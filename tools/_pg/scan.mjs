#!/usr/bin/env node
/* 扫 built/*.json 的句级对齐异常（hanzi/word 比超出 [0.4,3.0]），dump 上下文。
 * 用法：node tools/_pg/scan.mjs [articleId前缀] [--ctx N]
 * 跳过 pg.mjs CN_REVIEWED 白名单（人工核对通过的 ratio 误报，如 "Relief." → "压力的释放。"）。
 * 逐处改（2026-09-18）：目标 = 异常 0。
 */
import fs from 'node:fs';
import path from 'node:path';
import { CN_REVIEWED } from '../pg.mjs';
const dir = path.resolve(import.meta.dirname, 'built');
const prefix = process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : '';
const ctxN = (() => { const i = process.argv.indexOf('--ctx'); return i > 0 ? Number(process.argv[i + 1]) || 2 : 2; })();
const hanzi = s => (String(s || '').match(/[\u4e00-\u9fff]/g) || []).length;
const words = s => (String(s || '').match(/[A-Za-z']+/g) || []).length;
const norm = s => String(s || '').replace(/\s+/g, ' ').trim();

for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort()) {
  if (prefix && !f.startsWith(prefix)) continue;
  const id = f.replace(/\.json$/, '');
  const reviewed = (CN_REVIEWED[id] || []).map(norm);
  const paras = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
  const flat = paras.flatMap(p => p.sentences);
  const bad = [];
  flat.forEach((s, i) => {
    if (reviewed.some(p => norm(s.en).startsWith(p))) return;
    const w = words(s.en), h = hanzi(s.cn);
    const r = w ? h / w : 99;
    if (!s.cn || !s.cn.trim() || r < 0.4 || r > 3.0) bad.push({ i, r: +r.toFixed(2), en: s.en, cn: s.cn || '' });
  });
  console.log(`\n===== ${f}  句 ${flat.length}，异常 ${bad.length} =====`);
  for (const b of bad) {
    console.log(`\n--- [${b.i}] ratio=${b.r}`);
    for (let k = Math.max(0, b.i - ctxN); k < Math.min(flat.length, b.i + ctxN + 1); k++) {
      const mark = k === b.i ? '>>' : '  ';
      console.log(`${mark}[${k}] EN: ${flat[k].en.slice(0, 110)}`);
      console.log(`${mark}[${k}] CN: ${(flat[k].cn || '(空)').slice(0, 110)}`);
    }
  }
}

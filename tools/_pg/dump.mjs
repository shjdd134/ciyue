#!/usr/bin/env node
/* dump 指定区间的完整句文本（逐处改用）：node tools/_pg/dump.mjs <id前缀> <start> <end> */
import fs from 'node:fs';
import path from 'node:path';
const dir = path.resolve(import.meta.dirname, 'built');
const prefix = process.argv[2];
const a = Number(process.argv[3]), b = Number(process.argv[4]);
for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort()) {
  if (!f.startsWith(prefix)) continue;
  const flat = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')).flatMap(p => p.sentences);
  for (let i = Math.max(0, a); i < Math.min(flat.length, b + 1); i++) {
    console.log(`[${i}] EN| ${flat[i].en}`);
    console.log(`[${i}] CN| ${flat[i].cn || '(空)'}`);
  }
}

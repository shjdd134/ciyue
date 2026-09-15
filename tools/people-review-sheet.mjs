#!/usr/bin/env node
/* 把 .tmp/people/prepared.json 里的候选按**文档顺序**摊成一份人工复核清单。
 *
 * 为什么需要它：`prepared.json` 里正文是 blocks 数组（text 块带 sentences、image 块
 * 带 url/credit），直接看 JSON 看不出「这段是正文还是导航」「这张图出现在哪一段之间」。
 * 复核要判的是**边界**——正文从哪开始、到哪结束、中间有没有混进广告图，所以必须按
 * 原刊的文档顺序排出来看。
 *
 * 用法：node tools/people-review-sheet.mjs   → 写 .tmp/people/review-sheet.md
 * 复核要点见 SKILL「人工复核三条底线」：噪声词命中数、图注是否都在、图是不是本人。 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const prep = path.join(ROOT, '.tmp', 'people', 'prepared.json');
if (!fs.existsSync(prep)) { console.error('✗ 没有 .tmp/people/prepared.json，先跑 node tools/people.mjs --prepare --cached'); process.exit(1); }

const p = JSON.parse(fs.readFileSync(prep, 'utf8'));
const out = [];
out.push(`# 人物全文准备复核（${p.at}）\n`);
out.push(`通过 ${p.prepared.length} 篇 / 失败 ${p.failed.length} 篇\n`);
for (const f of p.failed) out.push(`- ❌ ${f.id}：${f.error.slice(0, 400)}\n`);

for (const it of p.prepared) {
  out.push(`\n${'='.repeat(90)}`);
  out.push(`## ${it.person?.zh || ''} ${it.person?.name || ''} — ${it.id}`);
  out.push(`- 原刊：${it.source}｜标题：${it.title}`);
  out.push(`- URL：${it.url}`);
  out.push(`- 日期：${it.date}｜署名：${it.photoCredit}`);
  out.push(`- 词数：${it.words}｜文本段：${it.sourceParagraphs}｜块：${it.blocks.length}｜图：${it.images.length}｜已下载：${it.photos.length}`);
  out.push(`- 截断标记：${it.truncated}｜订阅限制：${it.blocked}｜合格：${it.eligible}｜选题分：${it.score}`);
  out.push(`- 指纹：${it.fingerprint}\n`);
  out.push('### 文档顺序块\n');
  let ti = 0, ii = 0;
  for (const [n, b] of it.blocks.entries()) {
    if (b.type === 'text') {
      ti++;
      const t = b.sentences.join(' ');
      out.push(`[${String(n).padStart(3)}] 文${String(ti).padStart(2)} <${b.tag}> (${t.split(/\s+/).length}w, ${b.sentences.length}句) ${t.length > 300 ? t.slice(0, 300) + ' …' : t}`);
    } else {
      ii++;
      out.push(`[${String(n).padStart(3)}] 图${String(ii).padStart(2)} ${b.url}${b.credit ? '  ｜图注: ' + b.credit : '  ｜（无图注）'}`);
    }
  }
  out.push('\n### 图片清单（下载顺序，第 0 张即封面）\n');
  for (const [n, ph] of it.photos.entries()) out.push(`${String(n).padStart(2)}. ${path.basename(ph.file)}  ← ${ph.sourceUrl}`);
  out.push(`\n（文本块 ${ti} · 图片块 ${ii} · images ${it.images.length}）`);
}

const dest = path.join(ROOT, '.tmp', 'people', 'review-sheet.md');
fs.writeFileSync(dest, out.join('\n'));
console.log(`写出 ${path.relative(ROOT, dest)}（${out.join('\n').length} 字符）`);
console.log('接着扫噪声词，必须 0 命中：');
console.log('  grep -n -i "subscribe\\|sign in\\|newsletter\\|advertisement\\|related stories\\|continue reading\\|read more" .tmp/people/review-sheet.md');
console.log('再看图：PYTHON=<有 Pillow 的 python> python tools/_people-sheet.py');

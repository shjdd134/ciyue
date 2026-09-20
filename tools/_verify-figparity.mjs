#!/usr/bin/env node
/* 词阅 WordLens —— 校验「生成器」与「修复工具」用的是同一把配图尺子
 *
 * 为什么需要它：
 *   `people.mjs` 生成新文章时的配图逻辑（排除封面重复 + 堆图摊开，逻辑在 lib-figures.mjs）
 *   与 `_repair-figures.mjs` 修旧数据的逻辑，必须是**同一个函数**。两边各写一份时，
 *   最常见的事故是「修完仍然被闸门判红」或「闸门放行、生成器还在堆」——
 *   项目里已经有过一次同类教训（段距那件事，两份 CSS 各写一份 margin，全绿但观感是错的）。
 *
 * 怎么校验：
 *   拿 `.tmp/people/prepared.json` 里**真实的 blocks 序列**重放生成器的图片逻辑，
 *   再与 `assets/data-articles-extra.js` 里已修好的图序逐篇比对（集合 + 顺序）。
 *   注意不能拿 `p.paras` 比 —— prepare 模式下那个字段是空的，重放必须从 blocks 出发。
 *
 * 什么时候跑：
 *   · 改过 lib-figures.mjs / people.mjs 的配图逻辑之后
 *   · 跑过 `people.mjs --publish-reviewed` 之后
 *   · `_repair-figures.mjs --apply` 之后
 *   `.tmp/people/prepared.json` 是 prepare 阶段的临时产物，不在就跳过（打印提示，不算失败）。
 *
 * 用法：node tools/_verify-figparity.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { spreadStackedFigures, figureRunStats, stackingIssues } from './lib-figures.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const PREP = path.join(ROOT, '.tmp/people/prepared.json');
if (!fs.existsSync(PREP)) {
  console.log(`· 没有 ${path.relative(ROOT, PREP)}（prepare 阶段临时产物）—— 跳过。`);
  console.log('  要重建：node tools/people.mjs --prepare --cached');
  process.exit(0);
}
const prep = JSON.parse(fs.readFileSync(PREP, 'utf8'));
const src = fs.readFileSync(path.join(ROOT, 'assets/data-articles-extra.js'), 'utf8');
const arts = eval(src.match(/const ARTICLES_EXTRA\s*=\s*(\[[\s\S]*?\n\]);/)[1]);

let bad = 0, checked = 0;
for (const p of prep.prepared) {
  const live = arts.find(a => a.id === p.id);
  if (!live) { console.log(`· ${p.id} 不在库里，跳过`); continue; }
  checked++;
  const photos = p.photos.map(x => ({ ...x, rel: 'assets/covers/' + path.basename(x.file) }));
  const coverRel = photos[0]?.rel || '';
  const byUrl = new Map(photos.map(x => [x.sourceUrl, x]));

  /* 重放 toFullParas 的图片逻辑：block 顺序 → 排除封面 → 追加遗漏 → 摊开 */
  const paras = [];
  for (const b of p.blocks) {
    if (b.type === 'image') {
      const ph = byUrl.get(b.url);
      if (ph && ph.rel !== coverRel) paras.push({ img: ph.rel });
    } else {
      paras.push({ sentences: b.sentences.map(() => ({})) });
    }
  }
  const used = new Set([...paras.filter(x => x.img).map(x => x.img), coverRel].filter(Boolean));
  for (const ph of photos.slice(1)) if (!used.has(ph.rel)) paras.push({ img: ph.rel });
  const rolled = spreadStackedFigures(paras);

  const mine = paras.filter(x => x.img).map(x => x.img);
  const rolledImgs = rolled.filter(x => x.img).map(x => x.img);
  const theirs = live.paras.filter(x => x.img).map(x => x.img);

  /* 「集合一致」查有没有多/少图，**「顺序一致」查摊开位置是不是同一个算法**。
   * 只查集合会漏掉这次真正改的东西 —— 摊开算法的一致性。 */
  const sameSet = JSON.stringify([...mine].sort()) === JSON.stringify([...theirs].sort());
  const sameOrder = JSON.stringify(rolledImgs) === JSON.stringify(theirs);
  const ok = sameSet && sameOrder;
  if (!ok) bad++;
  console.log(`${ok ? '✓' : '✗'} ${p.id}`);
  console.log(`    重放 ${mine.length} 图 → 摊开后 ${rolledImgs.length} · 库内 ${theirs.length}  → 集合 ${sameSet ? '一致' : '不一致'} / 顺序 ${sameOrder ? '一致' : '不一致'}`);
  console.log(`    重放后闸门：${stackingIssues(rolled).length ? '✗ ' + stackingIssues(rolled).join('；') : '合格 ✓'}  ${JSON.stringify(figureRunStats(rolled))}`);
  if (!ok) {
    console.log('    重放 :', rolledImgs.join(', '));
    console.log('    库内 :', theirs.join(', '));
  }
}
console.log(bad
  ? `\n✗ ${bad}/${checked} 篇不一致 —— 生成器与修复工具用的不是同一把尺子`
  : `\n✓ ${checked} 篇全部一致（生成器与修复工具同一把尺子）`);
process.exit(bad ? 1 : 0);


import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { reviewedPairsFor, restoreReviewedTranslations } from './lib-sentence-translations.mjs';
import { distributeBlock, buildParagraphsFromBlocks, unitsFor } from './lib-align.mjs';
import { writeDecl } from './lib-text.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const noop = () => {};
const screen = { innerHTML: '', style: {}, className: '' };
const context = {
  console, window: { addEventListener: noop, removeEventListener: noop },
  document: { documentElement: { setAttribute: noop }, addEventListener: noop,
    removeEventListener: noop, querySelector: s => s === '#screen' ? screen : null,
    querySelectorAll: () => [], createElement: () => ({ style: {}, appendChild: noop, remove: noop }) },
  localStorage: { getItem: () => null, setItem: noop },
  setTimeout: noop, clearTimeout: noop, setInterval: noop, clearInterval: noop,
  requestAnimationFrame: f => f(),
};
vm.createContext(context);
for (const name of [...fs.readFileSync(path.join(root, 'index.html'), 'utf8').matchAll(/<script[^>]+src="([^?]+)\?/g)].map(m => m[1])) {
  vm.runInContext(fs.readFileSync(path.join(root, name), 'utf8'), context, { filename: name });
}
const run = s => vm.runInContext(s, context);
const plain = value => JSON.parse(JSON.stringify(value));
const articles = plain(run('ARTICLES_EXTRA'));
const flatten = a => a.paras.flatMap(p => p.sentences || (p.en ? [p] : []));
let checks = 0;
const check = (name, fn) => { fn(); checks++; console.log(`✓ ${name}`); };

check('真实错配样本：暑假愉快不再配到收拾行李', () => {
  const a = articles.find(a => a.id === 'fb-kevin-de-bruyne-let-me-talk');
  assert.equal(a.paras[18].sentences[1].cn, '祝你暑假愉快。”');
  assert.equal(a.paras[19].sentences[0].cn, '她说：“他们不想让你回去了。”');
});
check('中文重排、遗漏与整段串入的真实回归样本', () => {
  const love = articles.find(a => a.id === 'gr-pg-how-to-do-what-you-love');
  assert.equal(love.paras[4].sentences[2].cn, '那就像有人叫你使用干燥的水一样。');
  const great = articles.find(a => a.id === 'gr-pg-how-to-do-great-work');
  assert.equal(great.paras[4].sentences[2].cn, '但要选定一件事，然后开始行动。');
  const zoey = articles.find(a => a.id === 'people-zoey-deutch-rom-com');
  assert(!zoey.paras[38].sentences[0].cn.includes('杯子'));
  assert(!zoey.paras[40].sentences[4].cn.includes('百分之百'));
});
check('未核对的多句不能按标点或句数擅自配对', () => {
  context.sample = { sentences: [{ en: 'She went home. He stayed behind.', cn: '他留了下来，她回家了。' }] };
  assert.equal(run('renderSentencesOf(sample).length'), 1);
  assert.equal(run('renderSentencesOf(sample)[0].en'), context.sample.sentences[0].en);
});
check('拆分引用中的叙述语会造成假边界，保持原句', () => {
  context.sample = { en: '“How was that?” she asks Jack Antonoff, lowering her headphones.', cn: '她放下耳机，问杰克：“怎么样？”' };
  assert.equal(run('renderSentencesOf(sample).length'), 1);
});
check('坏的或过期的 alignedParts 安全回退，不丢任何一侧文字', () => {
  for (const alignedParts of [null, [], [null, {}], [{ en: 'Changed.', cn: '甲' }, { en: 'Second.', cn: '乙' }], [{ en: 'First.', cn: '错' }, { en: 'Second.', cn: '配' }]]) {
    context.sample = { en: 'First. Second.', cn: '甲乙', alignedParts };
    assert.equal(run('renderSentencesOf(sample).length'), 1);
  }
});
check('全库每个显示句取回自身，中英拼回守恒，数据锚点不变', () => {
  let split = 0, displayed = 0;
  for (const article of articles) article.paras.forEach((para, pi) => {
    context.article = article; context.para = para;
    const list = plain(run('renderSentencesOf(para)'));
    displayed += list.length;
    const base = para.sentences || (para.en ? [para] : []);
    base.forEach((source, si) => {
      const group = list.filter(s => s.si0 === si);
      const sq = s => s.replace(/\s+/g, '');
      assert.equal(sq(group.map(s => s.en).join(' ')), sq(source.en));
      assert.equal(sq(group.map(s => s.cn).join('')), sq(source.cn));
      if (group.length > 1) split++;
      for (const part of group) {
        const got = plain(run(`displaySentenceAt(article, ${pi}, ${si}, ${part.rs})`));
        assert.equal(got.en, part.en); assert.equal(got.cn, part.cn);
      }
    });
  });
  assert(split >= 40); assert(displayed > 3900);
  console.log(`  ${articles.length} 篇，${displayed} 个显示句，${split} 组已核对拆分`);
});
check('实际阅读页渲染：独立译文紧跟正确英文，不再用 cn-dup 隐藏', () => {
  run('activeArticle = ARTICLES_EXTRA.find(a=>a.id === "gr-pg-how-to-do-what-you-love"); S.cnMode = "all";');
  const html = run('renderRead()');
  assert(html.includes('data-si="2" data-rs="0"'));
  assert(html.includes('data-si="2" data-rs="1"'));
  assert(!html.includes('cn-dup'));
  assert(html.includes('但只是这样告诉人们还不够。'));
  run('S.cnMode = "tap"');
  assert(run('renderRead()').includes('cn-tap'));
});
check('长度算法拒绝猜配，包括句数恰好相同的情况', () => {
  assert.throws(() => distributeBlock(['Go home.', 'Stay here.'], '留在这里。回家。', s => s.split('。')), /逐句核对/);
  assert.throws(() => distributeBlock(['One.', 'Two.', 'Three.'], '一句。', () => ['一句。']), /逐句核对/);
  assert.throws(() => unitsFor(['一句，第二句。'], 2), /禁止/);
  assert.deepEqual(distributeBlock(['Whole paragraph.'], '整段译文。'), [{ en: 'Whole paragraph.', cn: '整段译文。' }]);
});
check('构建只接受原文匹配的句对；拒绝漏句和错误绑定', () => {
  const pairs = [{ en: 'One.', cn: '一。' }, { en: 'Two.', cn: '二。' }];
  assert.throws(() => distributeBlock(['Wrong.', 'Two.'], '译文', null, pairs), /不一致/);
  const en = [{ en: 'One. Two.', sentences: pairs.map(p => p.en) }];
  const blocks = [{ enFrom: 0, enTo: 0, cnFrom: 0, cnTo: 0 }];
  const built = buildParagraphsFromBlocks(en, [{ en: '重新排序也不会影响核对结果。' }], blocks, { reviewedPairs: pairs });
  assert.deepEqual(built[0].sentences, pairs);
});
check('已核对原文变化或顺序变化会拒绝覆盖', () => {
  const a = articles.find(a => a.id === 'gr-pg-how-to-do-what-you-love');
  const english = flatten(a).map(s => s.en);
  assert.equal(reviewedPairsFor(a.id, english).length, english.length);
  const swapped = [...english]; [swapped[0], swapped[1]] = [swapped[1], swapped[0]];
  assert.throws(() => reviewedPairsFor(a.id, swapped), /英文与已核对译文不一致/);
  assert.throws(() => reviewedPairsFor(a.id, english.slice(1)), /英文与已核对译文不一致/);
});
check('再导入保留修复和显示句对，未知文章不受影响，重复执行幂等', () => {
  const changed = plain(articles);
  changed.find(a => a.id === 'gr-pg-how-to-do-what-you-love').paras[0].sentences.forEach(s => { s.cn = '旧的错配'; delete s.alignedParts; });
  changed.find(a => a.id === 'people-zoey-deutch-rom-com').paras[38].sentences[0].cn = '错误整段';
  for (const article of changed) {
    if (article.translationReview) delete article.translationReview;
    if (article.translationCredit) article.translationCredit = '旧署名';
  }
  restoreReviewedTranslations(changed);
  assert.deepEqual(changed, articles);
  restoreReviewedTranslations(changed); assert.deepEqual(changed, articles);
  const other = [{ id: '__new', paras: [{ en: 'New.', cn: '新。' }] }];
  assert.deepEqual(restoreReviewedTranslations(plain(other)), other);
});
check('实际 writeDecl 入口保护：坏原文不写盘，好原文恢复译文', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ciyue-alignment-'));
  try {
    const file = path.join(dir, 'data.js');
    fs.writeFileSync(file, 'const ARTICLES_EXTRA = [];\n');
    const changed = plain(articles);
    changed.find(a => a.id === 'gr-pg-how-to-do-what-you-love').paras[0].sentences[0].en = 'Changed source.';
    assert.throws(() => writeDecl(file, 'ARTICLES_EXTRA', changed), /英文与已核对译文不一致/);
    assert.equal(fs.readFileSync(file, 'utf8'), 'const ARTICLES_EXTRA = [];\n');
    const good = plain(articles); good[0].paras[28].sentences[1].cn = '错误';
    writeDecl(file, 'ARTICLES_EXTRA', good);
    assert(fs.readFileSync(file, 'utf8').includes('alignedParts'));
    assert(!fs.readFileSync(file, 'utf8').includes('"cn": "错误"'));
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});
console.log(`\n${checks} 组句对回归全部通过。`);

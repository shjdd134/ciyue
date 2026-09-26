/* 已核对译文的唯一来源。原文逐字匹配，绝不以句数或字数推测语义。 */
import fs from 'node:fs';

const review = JSON.parse(fs.readFileSync(new URL('./sentence-translations-reviewed.json', import.meta.url), 'utf8'));
const sentencesOf = p => Array.isArray(p?.sentences) ? p.sentences : p?.en ? [p] : [];
const copy = value => JSON.parse(JSON.stringify(value));

export function reviewedPairsFor(articleId, english) {
  const pairs = review.articles[articleId];
  if (!pairs) return null;
  if (pairs.length !== english.length || pairs.some((p, i) => p.en !== english[i])) {
    throw new Error(`${articleId}: 英文与已核对译文不一致，请重新核对 sentence-translations-reviewed.json；禁止按下标或长度猜配`);
  }
  return copy(pairs);
}

/** 所有文章写盘入口共用。先验证整批再修改，失败时不留下部分修复。 */
export function restoreReviewedTranslations(articles) {
  const updates = [];
  for (const article of articles) {
    const sentences = (article.paras || []).flatMap(sentencesOf);
    const full = reviewedPairsFor(article.id, sentences.map(s => s.en));
    if (full) {
      full.forEach((pair, i) => updates.push([sentences[i], pair]));
    } else {
      const patches = review.patches[article.id] || [];
      for (const patch of patches) {
        const target = sentences.filter(s => s.en === patch.en)[patch.occurrence || 0];
        if (target) updates.push([target, patch]);
      }
    }
  }
  for (const [target, pair] of updates) {
    target.cn = pair.cn;
    delete target.cnShared;
    if (pair.alignedParts) target.alignedParts = copy(pair.alignedParts);
    else delete target.alignedParts;
  }
  for (const article of articles) {
    const metadata = review.metadata?.[article.id];
    if (metadata) Object.assign(article, copy(metadata));
  }
  return articles;
}

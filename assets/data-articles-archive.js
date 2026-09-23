/* 词阅 WordLens —— 归档文章（不在页面展示，仅作素材留存）
 *
 * 归档原因：发布日期早于 2026-08-01，或原始来源未提供日期。
 * 英文正文仍为真实报道原文，如需复用把条目移回 data.js 的 ARTICLES 即可。
 * 共 0 篇。
 */

const ARTICLES_ARCHIVE = [];

/* 归档文件此前没有合并进 ARTICLES，也没有 script 标签引用——15 篇已经清洗、已经译好标题
   的文章一直在磁盘上睡大觉。这里补上与 data-articles-extra.js 相同的合并块（按 url / id 去重）。 */
if (typeof ARTICLES !== "undefined" && typeof ARTICLES.push === "function") {
  const _haveUrl = new Set(ARTICLES.map(a => a.url));
  const _haveId = new Set(ARTICLES.map(a => a.id));
  ARTICLES_ARCHIVE.forEach(a => {
    if (!_haveUrl.has(a.url) && !_haveId.has(a.id)) ARTICLES.push(a);
  });
}

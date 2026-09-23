/* Joins bundled Demo articles with the current browser's private library. */
(function attachCiyueContentLoader(root) {
  "use strict";
  async function loadArticles() {
    const demo = Array.isArray(root.CIYUE_DEMO_ARTICLES) ? root.CIYUE_DEMO_ARTICLES : [];
    let local = [];
    let storageError = null;
    let dictionaries = {};
    try {
      [local, dictionaries] = await Promise.all([
        root.CiyueArticleStore.listArticles(),
        root.CiyueArticleStore.getDictionaries(),
      ]);
    }
    catch (error) { storageError = error; }
    const demoIds = new Set(demo.map(article => String(article.id)));
    const privateArticles = local.filter(article => !demoIds.has(String(article.id)));
    const articles = [...demo, ...privateArticles].map(root.CiyueArticleSchema.normalizeArticle);
    const categories = [...new Set(articles.map(article => article.cat).filter(Boolean))];
    return { articles, categories, demoCount: demo.length, privateCount: privateArticles.length, dictionaries, storageError };
  }
  root.CiyueContentLoader = { loadArticles };
})(typeof window !== "undefined" ? window : globalThis);

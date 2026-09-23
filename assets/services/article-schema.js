/* Shared Article schema helpers for the browser app and migration tools. */
(function attachCiyueArticleSchema(root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.CiyueArticleSchema = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function createCiyueArticleSchema() {
  "use strict";

  const SCHEMA_VERSION = 1;

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function textFromParagraphs(paras, key) {
    if (!Array.isArray(paras)) return "";
    return paras.map(paragraph => {
      if (typeof paragraph === "string") return key === "en" ? paragraph : "";
      if (!paragraph || typeof paragraph !== "object") return "";
      if (typeof paragraph[key] === "string") return paragraph[key];
      if (Array.isArray(paragraph.sentences)) {
        return paragraph.sentences.map(sentence => sentence && typeof sentence[key] === "string" ? sentence[key] : "").filter(Boolean).join(" ");
      }
      return "";
    }).filter(Boolean).join("\n\n").trim();
  }

  function paragraphsFromText(content, translation) {
    const en = String(content || "").split(/\r?\n\s*\r?\n/).map(s => s.trim()).filter(Boolean);
    const cn = String(translation || "").split(/\r?\n\s*\r?\n/).map(s => s.trim());
    return en.map((text, index) => ({ en: text, cn: cn[index] || "" }));
  }

  function safeSourceUrl(value, articleId) {
    const url = String(value || "").trim();
    if (!url) return "";
    try {
      const parsed = new URL(url);
      if (parsed.protocol === "http:" || parsed.protocol === "https:") return url;
    } catch { /* reject malformed or relative source URLs */ }
    throw new TypeError(`文章 ${articleId} 的来源链接必须使用 http 或 https`);
  }

  function safeImageUrl(value, articleId, field) {
    const url = String(value || "").trim();
    if (!url) return "";
    if (/^data:image\/(?:png|jpe?g|webp|gif);base64,[a-z0-9+/=]+$/i.test(url)) return url;
    if (/^assets\/covers\/demo\/[a-z0-9._/-]+$/i.test(url)
      && !url.split("/").includes("..")) return url;
    try {
      const parsed = new URL(url);
      if (parsed.protocol === "http:" || parsed.protocol === "https:") return url;
    } catch { /* reject malformed, relative, and executable URLs */ }
    throw new TypeError(`文章 ${articleId} 的 ${field} 必须是 http/https 图片、Demo 图片或内嵌图片`);
  }

  function normalizeArticle(input) {
    if (!input || typeof input !== "object" || Array.isArray(input)) throw new TypeError("文章必须是对象");
    const article = clone(input);
    const id = String(article.id || "").trim();
    const title = String(article.title || "").trim();
    if (!id) throw new TypeError("文章缺少 id");
    if (!/^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/.test(id)) throw new TypeError("文章 id 只能包含字母、数字、点、下划线、冒号和短横线");
    const paras = Array.isArray(article.paras) ? article.paras : paragraphsFromText(article.content, article.translation);
    const content = typeof article.content === "string" && article.content.trim()
      ? article.content.trim() : textFromParagraphs(paras, "en");
    const translation = typeof article.translation === "string" && article.translation.trim()
      ? article.translation.trim() : textFromParagraphs(paras, "cn");

    if (!title) throw new TypeError(`文章 ${id} 缺少 title`);
    if (!content) throw new TypeError(`文章 ${id} 缺少正文 content`);

    article.id = id;
    article.title = title;
    article.content = content;
    article.translation = translation;
    article.paras = paras;
    article.category = String(article.category || article.cat || "").trim();
    article.cat = String(article.cat || article.category || "未分类").trim();
    if (article.cat.length > 60 || /[<>"'`\r\n]/.test(article.cat)) throw new TypeError(`文章 ${id} 的分类字段无效`);
    article.language = String(article.language || "en").trim();
    article.sourceUrl = safeSourceUrl(article.sourceUrl || article.url, id);
    article.url = article.sourceUrl;
    article.publishedAt = String(article.publishedAt || article.date || "").trim();
    article.coverUrl = safeImageUrl(article.coverUrl || article.coverImg, id, "封面");
    article.coverImg = article.coverUrl;
    article.paras = article.paras.map(paragraph => {
      if (!paragraph || typeof paragraph !== "object" || Array.isArray(paragraph)) return paragraph;
      const normalized = { ...paragraph };
      if (normalized.img) normalized.img = safeImageUrl(normalized.img, id, "配图");
      return normalized;
    });
    article.tags = Array.isArray(article.tags) ? article.tags.map(String) : (article.category ? [article.category] : []);
    article.schemaVersion = SCHEMA_VERSION;
    return article;
  }

  function parseLibrary(value) {
    const library = typeof value === "string" ? JSON.parse(value) : value;
    if (!library || typeof library !== "object" || Array.isArray(library)) throw new TypeError("文章库格式错误：顶层必须是对象");
    if (library.schemaVersion !== SCHEMA_VERSION) throw new TypeError(`不支持的文章库版本：${library.schemaVersion == null ? "缺少版本号" : library.schemaVersion}`);
    if (!Array.isArray(library.articles)) throw new TypeError("文章库缺少 articles 数组");
    const articles = [];
    const seen = new Set();
    let duplicateInFile = 0;
    for (const source of library.articles) {
      const article = normalizeArticle(source);
      if (seen.has(article.id)) { duplicateInFile++; continue; }
      seen.add(article.id);
      articles.push(article);
    }
    return { library: { ...library, articles }, duplicateInFile };
  }

  return { SCHEMA_VERSION, normalizeArticle, parseLibrary, textFromParagraphs, paragraphsFromText };
});

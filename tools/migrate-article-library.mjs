#!/usr/bin/env node
/* One-time extraction of the legacy bundled article arrays into a private library. */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import schema from "../assets/services/article-schema.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputArg = process.argv.indexOf("--output");
const OUTPUT = path.resolve(ROOT, outputArg > 0 ? process.argv[outputArg + 1] : "ciyue-library.json");
const outputRelative = path.relative(ROOT, OUTPUT);
if (!outputRelative || outputRelative.startsWith("..") || path.isAbsolute(outputRelative)) {
  throw new Error("迁移输出路径必须位于项目目录内");
}
const PRIVATE_SOURCE_ROOT = path.join(ROOT, ".bak", "content-separation-2026-09-23", "private");
const SOURCE_ROOT = fs.existsSync(path.join(ROOT, "assets", "data-articles-extra.js"))
  ? ROOT : PRIVATE_SOURCE_ROOT;
const LEGACY_FILES = [
  ["assets/data-articles-extra.js", "ARTICLES_EXTRA"],
  ["assets/data-articles-archive.js", "ARTICLES_ARCHIVE"],
];

function runLegacyArray(relativePath, variable) {
  const source = fs.readFileSync(path.join(SOURCE_ROOT, relativePath), "utf8");
  const context = vm.createContext({ window: {} });
  vm.runInContext(source, context, { filename: relativePath, timeout: 5000 });
  return JSON.parse(vm.runInContext(`JSON.stringify(${variable})`, context));
}

function textFor(paragraphs, key) {
  return schema.textFromParagraphs(paragraphs, key);
}

function sourceJson(relativePath, variable) {
  const source = fs.readFileSync(path.join(SOURCE_ROOT, relativePath), "utf8");
  const context = vm.createContext({ window: {} });
  vm.runInContext(source, context, { filename: relativePath, timeout: 5000 });
  return JSON.parse(vm.runInContext(`JSON.stringify(window.${variable} || {})`, context));
}

function embedCoverAssets(value, articleId, seenPaths) {
  if (typeof value === "string") {
    if (!value.startsWith("assets/covers/")) return value;
    const absolute = path.resolve(SOURCE_ROOT, value);
    const coversRoot = path.resolve(SOURCE_ROOT, "assets/covers") + path.sep;
    if (!absolute.startsWith(coversRoot)) throw new Error(`文章 ${articleId} 引用了封面目录以外的资源：${value}`);
    if (!fs.existsSync(absolute)) throw new Error(`文章 ${articleId} 引用的图片不存在：${value}`);
    seenPaths.add(value);
    const ext = path.extname(absolute).toLowerCase();
    const mime = ext === ".png" ? "image/png" : ext === ".webp" ? "image/webp" : "image/jpeg";
    return `data:${mime};base64,${fs.readFileSync(absolute).toString("base64")}`;
  }
  if (Array.isArray(value)) return value.map(item => embedCoverAssets(item, articleId, seenPaths));
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, embedCoverAssets(item, articleId, seenPaths)]));
  }
  return value;
}

function buildArticle(input, metrics, seenPaths) {
  const article = embedCoverAssets(input, input.id || "(missing id)", seenPaths);
  article.content = textFor(article.paras, "en");
  article.translation = textFor(article.paras, "cn");
  article.sourceName = article.sourceName || String(article.source || "").split(" · ")[0].trim();
  article.sourceUrl = article.sourceUrl || article.url || "";
  article.category = article.category || article.cat || "";
  article.language = article.language || "en";
  article.publishedAt = article.publishedAt || article.date || "";
  article.coverUrl = article.coverImg || "";
  article.tags = Array.isArray(article.tags) ? article.tags : (article.category ? [article.category] : []);
  if (metrics[article.id]) article.metrics = metrics[article.id];
  return schema.normalizeArticle(article);
}

function main() {
  const articles = LEGACY_FILES.flatMap(([file, variable]) => runLegacyArray(file, variable));
  const seenIds = new Set();
  for (const article of articles) {
    if (!article || !article.id) throw new Error("旧文章存在缺失 id 的记录，停止迁移");
    if (seenIds.has(article.id)) throw new Error(`旧文章 id 重复：${article.id}`);
    seenIds.add(article.id);
  }
  const metrics = sourceJson("assets/data-article-metrics.js", "ARTICLE_METRICS");
  const articleWords = sourceJson("assets/data-articles-words.js", "ARTICLE_WORDS");
  const assetPaths = new Set();
  const migrated = articles.map(article => buildArticle(article, metrics, assetPaths));
  const migratedById = new Map(migrated.map(article => [article.id, article]));
  let matchedFullText = 0;
  for (const original of articles) {
    const moved = migratedById.get(original.id);
    if (!moved || moved.title !== original.title
      || moved.content !== textFor(original.paras, "en")
      || moved.translation !== textFor(original.paras, "cn")) {
      throw new Error(`迁移核对失败：${original.id}`);
    }
    matchedFullText++;
  }
  function countImageUrls(value) {
    if (typeof value === "string") {
      if (value.startsWith("assets/covers/")) throw new Error(`迁移结果仍引用仓库图片：${value}`);
      return value.startsWith("data:image/") ? 1 : 0;
    }
    if (Array.isArray(value)) return value.reduce((sum, item) => sum + countImageUrls(item), 0);
    if (value && typeof value === "object") return Object.values(value).reduce((sum, item) => sum + countImageUrls(item), 0);
    return 0;
  }
  const embeddedImageReferences = migrated.reduce((sum, article) => sum + countImageUrls(article), 0);
  const library = {
    product: "Ciyue",
    schemaVersion: schema.SCHEMA_VERSION,
    exportedAt: new Date().toISOString(),
    migration: { source: LEGACY_FILES.map(([file]) => file), articleCount: migrated.length },
    dictionaries: { articleWords },
    articles: migrated,
  };

  for (const article of migrated) {
    if (!article.id || !article.title || !article.content) throw new Error(`迁移结果字段不完整：${article.id || "(missing id)"}`);
  }
  fs.writeFileSync(OUTPUT, `${JSON.stringify(library, null, 2)}\n`, "utf8");
  const size = fs.statSync(OUTPUT).size;
  console.log(JSON.stringify({
    output: path.relative(ROOT, OUTPUT),
    source: path.relative(ROOT, SOURCE_ROOT),
    oldExtraCount: runLegacyArray(LEGACY_FILES[0][0], LEGACY_FILES[0][1]).length,
    oldArchiveCount: runLegacyArray(LEGACY_FILES[1][0], LEGACY_FILES[1][1]).length,
    migratedCount: migrated.length,
    titleCount: migrated.filter(article => article.title).length,
    contentCount: migrated.filter(article => article.content).length,
    translationCount: migrated.filter(article => article.translation).length,
    matchedFullText,
    embeddedImageCount: assetPaths.size,
    embeddedImageReferences,
    jsonBytes: size,
  }, null, 2));
}

main();

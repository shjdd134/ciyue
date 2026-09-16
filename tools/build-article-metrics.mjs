#!/usr/bin/env node
/* 生成首屏所需的文章统计小表。
 * 统计口径与 assets/app.js 的 computeArticleMetrics 保持一致；点词大表只在阅读页按需加载，
 * 首页用这份几十行的小文件即可显示词数、需学词数和低频词占比。 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const ROOT = path.resolve(import.meta.dirname, "..");
const ASSETS = path.join(ROOT, "assets");
const ctx = vm.createContext({ console, window: {} });
vm.runInContext("var window=globalThis;", ctx);
for (const f of [
  "data.js", "data-words-bulk-a.js", "data-words-full.js", "data-words-mid.js",
  "data-articles-extra.js", "data-ecdict.js", "data-wordfreq.js", "data-tapdict.js",
]) vm.runInContext(fs.readFileSync(path.join(ASSETS, f), "utf8"), ctx, { filename: f });
const snapshot = vm.runInContext("({ articles: ARTICLES, keywords: KEYWORDS, meta: WORD_META, common: COMMON_WORDS, tap: TAPDICT, tapr: TAP_REVERSE })", ctx);

const STOPWORD_HIGHLIGHT = new Set([
  "a", "an", "as", "at", "be", "by", "do", "go", "he", "if", "in", "is", "it", "me", "my", "no", "of", "on", "or", "so", "to", "up", "us", "we", "i", "am",
  "the", "and", "but", "for", "nor", "yet", "all", "any", "can", "her", "him", "his", "how", "its", "may", "new", "old", "our", "own", "say", "she", "too", "two", "use", "was", "who",
  "with", "that", "this", "they", "their", "them", "then", "than", "thus", "from", "into", "over", "such", "very", "much", "many", "most", "more", "less", "also", "just", "only", "even", "still", "back", "down", "when", "here", "your", "yours", "were", "been", "have", "will", "would", "could", "should", "shall", "might", "must", "what", "whom", "whose", "where", "while", "these", "those", "being", "does", "done", "make", "made", "like", "time", "year", "days", "said", "come", "came", "take", "took", "give", "gave", "find", "found", "know", "knew", "feel", "felt", "keep", "kept", "show", "seem", "seems", "help", "helps", "need", "needs", "want", "wants", "look", "looks", "call", "calls", "long", "part", "last", "next", "good", "well", "real", "sure", "full", "high", "open", "true", "same", "left", "hand", "head", "face", "side", "area", "kind", "type", "form", "line", "term", "word", "case", "fact", "idea", "life", "home", "work", "team", "week", "data", "sort", "step", "play", "live", "miss", "fall", "rise", "gone", "seen", "told", "held", "sold", "sent", "paid", "laid", "met", "led", "hit", "bit", "sat", "let", "got", "put", "set", "try", "die", "due", "ran", "fit", "lay", "lie", "eat", "act", "age", "ago", "air", "arm", "art", "bad", "bag", "bat", "bow", "box", "boy", "bus", "cap", "car", "cat", "cup", "cut", "day", "dog", "dry", "ear", "egg", "end", "era", "eye", "fan", "far", "fat", "few", "fig", "fix", "fly", "fog", "fox", "fun", "gap", "gas", "get", "god", "gun", "gut", "guy", "had", "hat", "hit", "hot", "ice", "ill", "ink", "inn", "ion", "jam", "jet", "job", "joy", "key", "kid", "kit", "lab", "lag", "lap", "law", "lay", "led", "leg", "lip", "log", "lot", "low", "mad", "man", "map", "mat", "mix", "mob", "mom", "mud", "net", "nut", "oak", "odd", "off", "oil", "one", "owe", "own", "pad", "pan", "pay", "pen", "pet", "pie", "pin", "pit", "pop", "pot", "pub", "ran", "raw", "red", "ref", "rid", "rip", "rob", "rod", "rot", "row", "rub", "sad", "saw", "say", "sea", "sex", "she", "shy", "sin", "sir", "sit", "six", "ski", "sky", "sly", "sob", "son", "sow", "spy", "sum", "sun", "tab", "tan", "tap", "toe", "ton", "top", "tow", "toy", "tub", "tug", "van", "vat", "vet", "via", "war", "wax", "web", "wet", "wig", "win", "wit", "woe", "won", "woo", "wow", "you", "yet", "zap", "zen", "zip", "zoo",
]);
const trie = {};
for (const word of snapshot.keywords || []) {
  const w = String(word || "").toLowerCase();
  if (w.length < 4 || STOPWORD_HIGHLIGHT.has(w)) continue;
  let n = trie;
  for (const c of w) n = n[c] || (n[c] = {});
  n.$ = w;
}
const kwOf = w => {
  let n = trie;
  for (const c of w) { n = n[c]; if (!n) return null; }
  return n.$ || null;
};
const lemmaCands = t => {
  const out = new Set();
  const add = x => { if (x && x.length > 1) out.add(x); };
  const dd = x => { const y = x.replace(/(.)\1$/, "$1"); add(y); return y; };
  if (t.endsWith("'s")) add(t.slice(0, -2));
  if (/ies$/.test(t) && t.length > 4) add(t.slice(0, -3) + "y");
  if (/(ch|sh|x|z|s)es$/.test(t) && t.length > 5) add(t.slice(0, -2));
  if (/ied$/.test(t) && t.length > 5) add(t.slice(0, -3) + "y");
  if (/ed$/.test(t) && t.length > 4) { add(t.slice(0, -1)); add(t.slice(0, -2)); dd(t.slice(0, -2)); dd(t.slice(0, -1)); }
  if (/ing$/.test(t) && t.length > 5) { add(t.slice(0, -3)); add(t.slice(0, -3) + "e"); dd(t.slice(0, -3)); }
  if (/s$/.test(t) && t.length > 3) add(t.slice(0, -1));
  out.delete(t);
  return [...out];
};
const resolve = low => {
  const k = kwOf(low);
  if (k) return { kw: k };
  if (snapshot.tapr && snapshot.tapr[low]) {
    const l = snapshot.tapr[low];
    return kwOf(l) ? { kw: l } : { w: l };
  }
  for (const c of lemmaCands(low)) if (kwOf(c)) return { kw: c };
  if (snapshot.tap && snapshot.tap[low]) return { w: low };
  for (const c of lemmaCands(low)) if (snapshot.tap && snapshot.tap[c]) return { w: c };
  return null;
};
const isCommon = w => {
  const e = snapshot.meta && snapshot.meta[w];
  return e && e.f ? e.f <= 2500 : Boolean(snapshot.common && snapshot.common[w]);
};
const TOKEN = /[A-Za-z]+(?:['’][A-Za-z]+)?/g;
const proper = (text, index, token) => {
  if (!/^[A-Z]/.test(token)) return false;
  const before = text.slice(0, index).replace(/\s+$/, "");
  return Boolean(before) && !/[.!?]["'’)\]]?$/.test(before);
};
const sentencesOf = p => Array.isArray(p?.sentences) ? p.sentences.filter(Boolean) : (p && (p.en || p.cn) ? [p] : []);
function metrics(article) {
  let words = 0, unknown = 0;
  const need = new Set();
  for (const p of article.paras || []) for (const s of sentencesOf(p)) {
    const text = String(s.en || ""); TOKEN.lastIndex = 0;
    let m;
    while ((m = TOKEN.exec(text))) {
      words++;
      if (proper(text, m.index, m[0])) continue;
      const low = m[0].replace(/[’]/g, "'").toLowerCase();
      const r = resolve(low);
      if (!r && /^[A-Z]/.test(m[0])) continue;
      if (r?.kw) { need.add(r.kw); if (!isCommon(r.kw)) unknown++; }
      else if (!isCommon(r?.w || low)) unknown++;
    }
  }
  return { words, needLearn: need.size, unknown, rate: words ? +(unknown / words).toFixed(6) : 0 };
}

const out = {};
for (const a of snapshot.articles || []) out[a.id] = metrics(a);
const file = `/* Generated by tools/build-article-metrics.mjs; do not edit by hand. */\nwindow.ARTICLE_METRICS = ${JSON.stringify(out)};\n`;
fs.writeFileSync(path.join(ASSETS, "data-article-metrics.js"), file, "utf8");
console.log(`写出 assets/data-article-metrics.js：${Object.keys(out).length} 篇`);

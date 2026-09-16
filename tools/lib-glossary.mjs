/* 词阅 —— 术语校正（共享库）
 *
 * 两个入口共用同一套规则与同一个守卫：
 *   tools/fix-cn.mjs  已发布数据的中文层后处理（存量修正）
 *   tools/ingest.mjs  新抓文章的译文后处理（防止增量重新引入）
 *
 * 规则文件：tools/term-glossary.json（字段说明见其 $comment）。
 *
 * 设计要点：规则**一律以英文原句为条件**。中文的「阶段」既可能是 Phase（本库唯一
 * 正确译法）也可能是 Level（被译错的），无条件全局替换必然误伤 —— 只有先匹配
 * 英文、再动中文，才能保证只改该改的那一句。实测 DeepL 现在仍把
 * "Feed it people" 译成「把它给…看」，重新翻译救不了，只能后处理。
 */
import fs from "node:fs";
import path from "node:path";

export const GLOSSARY_FILE = path.join(import.meta.dirname, "term-glossary.json");

let cached = null;

/** 读取并校验规则表。校验不通过直接抛错——坏规则比没有规则更危险。 */
export function loadGlossary(file = GLOSSARY_FILE) {
  if (cached && file === GLOSSARY_FILE) return cached;
  const g = JSON.parse(fs.readFileSync(file, "utf8"));

  /* 幂等守卫：目标串包含原串的规则永远不可能幂等 —— 第二次执行会把刚写进去的
     译文再改一遍（实测：「流科学验证」→「心流科学验证」→「心心流科学验证」）。
     这类规则必须在加载时就拦下，不能等它污染数据。 */
  const pairs = [];
  for (const kind of ["fixes", "terms"]) {
    for (const r of g[kind] || []) for (const [from, to] of r.cn || []) pairs.push([kind, r.en, from, to]);
  }
  for (const r of g.global || []) pairs.push(["global", r.from, r.from, r.to]);
  const bad = pairs.filter(([, , from, to]) => String(to).includes(String(from)));
  if (bad.length) {
    const lines = bad.map(([kind, en, from, to]) =>
      `  [${kind}] en=${JSON.stringify(en)}\n    目标「${to}」包含原串「${from}」`);
    throw new Error("term-glossary.json 有不可幂等的规则：\n" + lines.join("\n"));
  }

  if (file === GLOSSARY_FILE) cached = g;
  return g;
}

const litAll = (s, from, to) => String(s).split(from).join(to);
/* 规则里的 art 写前缀即可：文章 id 是「栏目缩写-slug」，手写全长容易漂 */
const inScope = (rule, id) => !rule.art || rule.art.some(p => String(id || "").startsWith(p));

/**
 * 把规则表应用到一对 {en, cn}。返回新的 cn（可能是同一字符串）。
 * @param {string} cn  机器译文
 * @param {string} en  英文原句（规则的唯一条件）
 * @param {string} [artId] 文章 id，用于带范围限定的规则
 * @param {object} [glossary] 规则表（不传则读默认文件）
 */
export function applyGlossary(cn, en, artId = "", glossary = null) {
  const g = glossary || loadGlossary();
  const E = String(en || "");
  let out = String(cn == null ? "" : cn);

  for (const r of g.fixes || []) {
    if (!inScope(r, artId)) continue;
    if (!new RegExp(r.en, "i").test(E)) continue;
    if (r.set != null) out = r.set;
    for (const [from, to] of r.cn || []) out = litAll(out, from, to);
  }
  for (const r of g.terms || []) {
    if (!inScope(r, artId)) continue;
    if (!new RegExp(r.en, "i").test(E)) continue;
    /* unless 也走大小写不敏感：+Level 在正文里既有大写（术语）也有小写（普通词），
       只匹配大写会让「reaches a new level → 新层次」整类漏掉（实测踩过）。 */
    if (r.unless && new RegExp(r.unless, "i").test(E)) continue;
    for (const [from, to] of r.cn || []) out = litAll(out, from, to);
  }
  for (const r of g.global || []) {
    if (!inScope(r, artId)) continue;
    out = litAll(out, r.from, r.to);
  }
  return out;
}

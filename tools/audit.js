#!/usr/bin/env node
/* Public product checks. The retired private-corpus audit is retained only in local .bak. */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const ROOT = path.resolve(__dirname, "..");
const read = relative => fs.readFileSync(path.join(ROOT, relative), "utf8");
let checks = 0;
const pending = [];
function check(label, fn) {
  try {
    const result = fn();
    const passed = () => { checks++; console.log(`✓ ${label}`); };
    const failed = error => { console.error(`✗ ${label}: ${error.message}`); process.exitCode = 1; };
    if (result && typeof result.then === "function") pending.push(result.then(passed, failed));
    else passed();
  } catch (error) { console.error(`✗ ${label}: ${error.message}`); process.exitCode = 1; }
}

const schema = require("../assets/services/article-schema.js");
const dataContext = vm.createContext({ console });
dataContext.window = dataContext;
vm.runInContext(read("assets/data.js"), dataContext, { filename: "assets/data.js" });
vm.runInContext(read("assets/data/demo-articles.js"), dataContext, { filename: "assets/data/demo-articles.js" });
const demos = vm.runInContext("CIYUE_DEMO_ARTICLES", dataContext);
const index = read("index.html");
const app = read("assets/app.js");

check("公开入口加载 Article 服务与原创 Demo，不引用旧私人文章脚本", () => {
  for (const source of ["assets/data/demo-articles.js", "assets/services/article-schema.js",
    "assets/services/article-store.js", "assets/services/content-loader.js"]) assert.ok(index.includes(source), source);
  for (const source of ["data-articles-extra.js", "data-articles-archive.js", "data-article-metrics.js",
    "data-articles-words.js", "data-covers.js"]) assert.ok(!index.includes(source), source);
  assert.match(index, /id="library-file-in"/);
});

check("Demo 为三篇原创双语文章，ID 唯一且满足 Article v1", () => {
  assert.equal(demos.length, 3);
  assert.equal(new Set(demos.map(article => article.id)).size, demos.length);
  for (const article of demos) {
    const normalized = schema.normalizeArticle(article);
    assert.ok(normalized.title && normalized.content);
    assert.ok(normalized.paras.some(paragraph => (paragraph.sentences || []).some(sentence => sentence.cn)));
  }
});

check("文章库解析拒绝错版本和缺字段，并跳过同文件内重复 ID", () => {
  const sample = { id: "audit-sample", title: "Sample", content: "A sentence." };
  assert.throws(() => schema.parseLibrary({ schemaVersion: 99, articles: [sample] }), /版本/);
  assert.throws(() => schema.parseLibrary({ schemaVersion: 1, articles: [{ title: "Missing ID", content: "Text" }] }), /缺少 id/);
  assert.equal(schema.parseLibrary({ schemaVersion: 1, articles: [sample, sample] }).duplicateInFile, 1);
});

check("导入文章的来源和图片协议经过校验", () => {
  const sample = { id: "audit-url", title: "Sample", content: "A sentence." };
  assert.throws(() => schema.normalizeArticle({ ...sample, sourceUrl: "javascript:alert(1)" }), /http 或 https/);
  assert.throws(() => schema.normalizeArticle({ ...sample, paras: [{ img: "javascript:alert(1)" }] }), /配图/);
  assert.equal(schema.normalizeArticle({ ...sample, sourceUrl: "https://example.org/story" }).url,
    "https://example.org/story");
});

check("ContentLoader 合并本机文章，保留 Demo，并拒绝本机重复 Demo ID", async () => {
  const localArticle = { id: "private-audit-sample", title: "Local", content: "Private text.", category: "自选" };
  const loaderContext = {
    CIYUE_DEMO_ARTICLES: demos,
    CiyueArticleSchema: schema,
    CiyueArticleStore: {
      listArticles: async () => [demos[0], localArticle],
      getDictionaries: async () => ({ articleWords: { example: true } }),
    },
  };
  loaderContext.window = loaderContext;
  vm.createContext(loaderContext);
  vm.runInContext(read("assets/services/content-loader.js"), loaderContext);
  const loaded = await loaderContext.CiyueContentLoader.loadArticles();
  assert.equal(loaded.articles.length, 4);
  assert.equal(loaded.demoCount, 3);
  assert.equal(loaded.privateCount, 1);
  assert.deepEqual(Array.from(loaded.categories), ["示例", "自选"]);
  assert.equal(loaded.dictionaries.articleWords.example, true);
});

check("文章库导入、导出与清空入口仍连接到设置页", () => {
  for (const fragment of ["导入文章库", "导出文章库", "清空私人文章", "async function importArticleLibrary",
    "async function exportArticleLibrary", "async function clearPrivateArticleLibrary"]) assert.ok(app.includes(fragment), fragment);
});

check("私有库、迁移备份和旧文章数据路径被 Git 忽略", () => {
  const ignore = read(".gitignore");
  for (const pattern of ["ciyue-library*.json", "/assets/data-articles-extra.js", "/assets/data-articles-archive.js",
    "/assets/data-article-metrics.js", "/assets/data-articles-words.js", "/assets/data-covers.js",
    "/assets/covers/*", "!/assets/covers/demo/**"]) assert.ok(ignore.includes(pattern), pattern);
  assert.ok(ignore.includes(".bak/"));
});

/* ---------------- 我的导入词库（customVocab）+ 高亮词源开关（hlSets） ----------------
 * 断言意图不锁实现；可执行判据直接摘取 app.js 里的真函数来调用（括号计数），
 * 绝不在这里复制第二份正则 —— 词形/分词/统计的判据只许有一把（app.js:isVocabWord 家族），
 * 守卫只锁「行为契约」，app.js 改判据时这里自动跟着新判据跑。 */

function extractAppFn(name) {
  const at = app.indexOf(`function ${name}(`);
  assert.ok(at >= 0, `app.js 找不到 function ${name} —— 词库判据被改名/移动时必须同步改本守卫的摘取清单`);
  let depth = 0, started = false, sig = "";
  /* 括号计数必须跳过字符串/注释/正则字面量（"{" 是数据、/^["']+/ 里的引号会骗扫描器）。
     除号 vs 正则用前导字符判别：前一个有效字符是标识符/数字/)] 时是除法，否则是正则。 */
  for (let j = app.indexOf("{", at); j < app.length; j++) {
    const c = app[j];
    if (c === '"' || c === "'" || c === "`") {
      for (j++; j < app.length && app[j] !== c; j++) if (app[j] === "\\") j++;
      sig = c; continue;
    }
    if (c === "/" && app[j + 1] === "/") { while (j < app.length && app[j] !== "\n") j++; continue; }
    if (c === "/" && app[j + 1] === "*") { j += 2; while (j < app.length && !(app[j] === "*" && app[j + 1] === "/")) j++; j++; continue; }
    if (c === "/" && !/[A-Za-z0-9_$)\]]/.test(sig)) {
      let inClass = false;
      for (j++; j < app.length; j++) {
        if (app[j] === "\\") { j++; continue; }
        if (app[j] === "[") inClass = true;
        else if (app[j] === "]") inClass = false;
        else if (app[j] === "/" && !inClass) break;
      }
      sig = "/"; continue;
    }
    if (!/\s/.test(c)) sig = c;
    if (c === "{") { depth++; started = true; }
    else if (c === "}") { depth--; if (started && !depth) return app.slice(at, j + 1); }
  }
  assert.fail(`app.js 的 function ${name} 括号不闭合`);
}
const vocabCtx = vm.createContext({});
vm.runInContext(["isVocabWord", "parseVocabText", "buildVocabPreview", "mergeVocab", "normalizeVocabDraft"]
  .map(extractAppFn).join("\n"), vocabCtx);
vm.runInContext("const __W = isVocabWord, __P = parseVocabText, __B = buildVocabPreview, __M = mergeVocab, __N = normalizeVocabDraft;", vocabCtx);
/* 结果一律 JSON 序列化后回主 realm：跨 vm.runInContext 拿到的数组原型不同，
   assert.deepEqual 会报「same structure but not reference-equal」的假红。 */
const run = expr => JSON.parse(vm.runInContext(`JSON.stringify(${expr})`, vocabCtx));
const W = w => run(`__W(${JSON.stringify(w)})`);
const P = raw => run(`__P(${JSON.stringify(raw)})`);
const B = (raw, existing, append) => run(`__B(${JSON.stringify(raw)}, ${JSON.stringify(existing)}, ${JSON.stringify(append)})`);
const M = (ex, ws, ow) => run(`__M(${JSON.stringify(ex)}, ${JSON.stringify(ws)}, ${JSON.stringify(ow)})`);
const N = raw => run(`__N(${JSON.stringify(raw)})`);
const appFlat = app.replace(/\s+/g, " ");

check("导入分词：换行/空格/中英逗号分号顿号同一结果，CSV 引号字段与 BOM 剥除", () => {
  const base = P("apple\nbanana\norange");
  assert.deepEqual(base, ["apple", "banana", "orange"]);
  assert.deepEqual(P("apple, banana, orange"), base);
  assert.deepEqual(P("apple banana orange"), base);
  assert.deepEqual(P("apple；banana，orange、grape"), ["apple", "banana", "orange", "grape"]);
  /* 分词只管切开（含引号剥除），非法 token（如 CSV 频率列的 1）由预览层 isVocabWord 判无效 —— 分层契约 */
  assert.deepEqual(P('"apple",1\n"banana"'), ["apple", "1", "banana"]);
  assert.deepEqual(B('"apple",1\n"banana"', [], true).valid, ["apple", "banana"]);
  assert.deepEqual(P("\uFEFFapple banana"), ["apple", "banana"]);
});

check("导入清洗：收 don't / mother-in-law 与弯引号折叠，拒单字母 / 数字 / 标点 / CJK / 超长", () => {
  assert.ok(W("apple") && W("don't") && W("mother-in-law") && W("don\u2019t"));
  for (const bad of ["a", "", "123", "hello!", "你好", "a".repeat(41)]) assert.ok(!W(bad), `应拒: ${JSON.stringify(bad)}`);
});

check("导入预览：Apple/apple 大小写归一去重，total = valid + dup + invalid 守恒（追加/覆盖两口径）", () => {
  const pv = B("Apple, apple, APPLE", [], true);
  assert.deepEqual(pv.valid, ["apple"]);
  assert.equal(pv.total, 3); assert.equal(pv.dup, 2); assert.equal(pv.invalid, 0);
  const ap = B("abandon, banana, 123, x", ["abandon"], true);   // 追加口径：与现有库重复计入 dup
  assert.deepEqual(ap.valid, ["banana"]); assert.equal(ap.dup, 1); assert.equal(ap.invalid, 2); assert.equal(ap.total, 4);
  const ow = B("abandon, banana", ["abandon"], false);          // 覆盖口径：现有库不参与判重
  assert.deepEqual(ow.valid, ["abandon", "banana"]); assert.equal(ow.dup, 0);
  for (const p of [pv, ap, ow]) assert.equal(p.total, p.valid.length + p.dup + p.invalid, "守恒式");
});

check("入库合并：追加保留原词并去重，覆盖整体替换，两口径均有序去重", () => {
  assert.deepEqual(M(["abandon"], ["banana", "abandon"], false), ["abandon", "banana"]);
  assert.deepEqual(M(["abandon"], ["banana", "zebra"], true), ["banana", "zebra"]);
  assert.deepEqual(M([], ["b", "a", "b"], false), ["a", "b"]);
});

check("导出的 JSON 能原样读回成词表（备份闭环），坏 JSON 按纯文本降级", () => {
  const envelope = JSON.stringify({ app: "wordlens-custom-vocab", version: 1, words: ["Apple", "banana"] });
  assert.deepEqual(N(envelope), "Apple\nbanana");
  assert.deepEqual(N('["abandon","cat"]'), "abandon\ncat");
  assert.deepEqual(N("{not json}"), "{not json}");
});

check("高亮门控源级：已认识/生词压制先于自定义命中，custom 由开关门控，四源全关走 no-kw", () => {
  assert.ok(appFlat.includes("!known && !wb && ((S.hlSets.custom && rawCustom) || (isHighlightable(k) && highlightSet().has(k)))"),
    "四态优先级：known > wb > (custom ∪ 系统词源)");
  assert.ok(/customHit = \(low, form\) =>/.test(app) && /CUSTOM_SET\.has\(String\(form\)/.test(app), "词元 + data-form 原形双向判");
  assert.ok(appFlat.includes("!S.hlSets.core && !S.hlSets.cet4 && !S.hlSets.mid && !S.hlSets.custom"), "hlAllOff 四源全关");
  assert.ok(app.includes('data-act="set-hls"') && app.includes("data-src="), "词源独立开关入口");
});

check("旧档迁移源级：highlightMode 四档无损映射 hlSets（all 含 mid），custom 恒 false，customVocab 共用清洗判据", () => {
  assert.ok(appFlat.includes("src.hlSets === undefined && src.highlightMode !== undefined"), "迁移触发条件");
  assert.ok(appFlat.includes('core: m === "core" || m === "cet4" || m === "all"'));
  assert.ok(appFlat.includes('cet4: m === "cet4" || m === "all"'));
  assert.ok(appFlat.includes('mid: m === "all"'));
  assert.ok(/custom: false[,}]/.test(app), "custom 默认关");
  assert.ok(appFlat.includes("isVocabWord(w.trim().toLowerCase())"), "normalizeState 清洗与导入面板同一判据");
  assert.ok(appFlat.includes('for (const k of ["core", "cet4", "mid", "custom"]) if (has(st.hlSets, k)) check(typeof st.hlSets[k] === "boolean")'),
    "备份校验接收 hlSets 新字段");
});

check("自定义词兜底卡与词库管理：非库内词不弹卡，自定义词在任何卡里都有管理入口，覆盖/清空两段式确认，导出带版本头，入口与文件框在位", () => {
  assert.ok(app.includes('if (!S.customVocab.includes(word)) return "";'), "兜底卡只对库内词");
  assert.ok(appFlat.includes("return S.customVocab.includes(word) ? renderCustomSheet(word, ctx, form) : renderTapSheet(word, ctx, form) || renderCustomSheet(word, ctx, form)"),
    "非词典词分派：自定义词优先自定义卡（tap 卡会截走管理入口）");
  assert.ok(appFlat.includes('S.customVocab.includes(word) ? `<button class="c" data-act="cv-del-word" data-word="${word}">移出词库</button>` : ""'),
    "全量词典卡对自定义词补「移出词库」");
  for (const frag of ["cvArmedOver", "cvArmedClear", "wordlens-custom-vocab", "rebuildCustomSet()",
    'data-act="open-customvocab"', 'data-act="cv-append"', 'data-act="cv-overwrite"']) assert.ok(app.includes(frag), frag);
  /* 统计块必须恒在 DOM（空态是占位文案）：输入处理器只做 innerHTML 替换、不重渲染，
     若占位分支不带 id="cv-stats"，首次粘贴后统计永远出不来（2026-09-23 真页面探针抓到） */
  assert.ok(appFlat.includes('class="cv-stats" id="cv-stats"') && appFlat.includes('<span class="muted-2">粘贴或选文件后，这里会显示导入统计。</span>'),
    "cv-stats 空态占位与统计共用同一挂点");
  assert.ok(index.includes('id="cv-file-in"'), "cv-file-in 在 index.html");
});

Promise.all(pending).then(() => {
  if (!process.exitCode) console.log(`\n结果：${checks} 项公开产品检查通过`);
});

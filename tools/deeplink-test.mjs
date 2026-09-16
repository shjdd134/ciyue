#!/usr/bin/env node
/* 深链回归：?v=read&id=<稳定 id> 可在新会话打开同一篇；非法 id 回到发现页。 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const ROOT = path.resolve(import.meta.dirname, "..");
const handlers = {};
const noop = () => {};
const makeCtx = href => {
  const screen = { innerHTML: "", className: "", style: {}, appendChild: noop };
  const phone = { appendChild: noop, insertAdjacentHTML: noop, style: {} };
  const node = (dataset = {}) => ({ dataset, classList: { add: noop, remove: noop, toggle: noop, contains: () => false },
    closest: () => null, scrollTop: 0, scrollHeight: 1000, clientHeight: 600,
    getBoundingClientRect: () => ({ top: 0 }), addEventListener: noop });
  const url = new URL(href);
  const history = { state: null, pushState(s) { this.state = s; }, replaceState(s) { this.state = s; }, back: noop, go: noop };
  const sandbox = {
    console, URL, URLSearchParams, location: url, history,
    window: { addEventListener: (t, f) => { handlers[t] = f; }, removeEventListener: noop },
    document: { documentElement: { setAttribute: noop }, addEventListener: (t, f) => { handlers[t] = f; }, removeEventListener: noop,
      querySelector: s => s === "#screen" ? screen : s === ".phone" ? phone : null,
      querySelectorAll: () => [], createElement: () => node({}), head: { appendChild: noop } },
    localStorage: { data: {}, getItem(k) { return this.data[k] || null; }, setItem(k, v) { this.data[k] = v; } },
    setTimeout, clearTimeout, setInterval: () => 0, clearInterval: noop,
    requestAnimationFrame: f => f(), SpeechSynthesisUtterance: function () {}, speechSynthesis: { cancel: noop, speak: noop },
  };
  sandbox.window.window = sandbox.window;
  vm.createContext(sandbox);
  for (const f of ["data.js", "data-config.js", "data-words-bulk-a.js", "data-words-full.js", "data-words-mid.js", "data-articles-extra.js", "data-articles-archive.js", "data-covers.js", "data-article-metrics.js", "data-ecdict.js", "data-tapdict.js", "data-wordfreq.js"]) {
    vm.runInContext(fs.readFileSync(path.join(ROOT, "assets", f), "utf8"), sandbox, { filename: f });
  }
  vm.runInContext("var WORD_META = window.WORD_META; var TAPDICT = window.TAPDICT, TAP_REVERSE = window.TAP_REVERSE; var COMMON_WORDS = window.COMMON_WORDS;", sandbox);
  vm.runInContext(fs.readFileSync(path.join(ROOT, "assets", "app.js"), "utf8"), sandbox, { filename: "assets/app.js" });
  return { sandbox, ctx: expr => vm.runInContext(expr, sandbox) };
};

const valid = "people-anne-hathaway-mother-mary";
const a = makeCtx(`https://example.test/ciyue/?v=read&id=${valid}`);
const validOk = a.ctx("view.name") === "read" && a.ctx("activeArticle.id") === valid;
const b = makeCtx("https://example.test/ciyue/?v=read&id=does-not-exist");
const invalidOk = b.ctx("view.name") === "discover" && b.ctx("activeArticle === null");
console.log(validOk ? "✓ 有效 id 深链打开同一篇" : "✗ 有效 id 深链失败");
console.log(invalidOk ? "✓ 非法 id 回到发现页" : "✗ 非法 id 未回到发现页");
process.exit(validOk && invalidOk ? 0 : 1);

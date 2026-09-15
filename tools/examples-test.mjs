/* 词阅 WordLens —— 例句按需加载的失败与边界路径回归
 *
 * 为什么单独一个测试文件：这几条路径（首次 / 重复 / 失败重试 / 加载中换词）在真机上
 * 要制造网络抖动、还要手速够快才复现得出来，平时根本测不到；而它们恰好是「按需加载」
 * 的全部风险所在。这里用可编程的 script 桩把每条路径钉死 —— 桩的 onload 会**真的执行**
 * assets/data-examples.js，所以测的是真文件，不是假数据。
 *
 * 沙箱里刻意不预加载 data-examples.js（模拟首屏），并保留 renderSheet / attachExample /
 * fillSheetExample 这些真实函数不动，只替换 DOM 与 script 宿主。
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const noop = () => { };

let pass = 0, fail = 0;
const ok = (name, cond) => { if (cond) { pass++; console.log("  ✓ " + name); } else { fail++; console.log("  ✗ " + name); } };
const eq = (name, a, b) => ok(`${name} → ${JSON.stringify(a)}`, a === b);
const tick = () => new Promise(r => setImmediate(r));

/* 例句库的键集合（判断某词「本来就没有例句」用） */
const EX_SRC = fs.readFileSync(path.join(ROOT, "assets/data-examples.js"), "utf8");
const EX_KEYS = new Set([...EX_SRC.matchAll(/^"([a-z][a-z'-]*)": \{/gm)].map(m => m[1]));

/* ---------- 每个用例一套干净沙箱 ---------- */
function boot() {
  const scripts = [];                       // 每次 head.appendChild 的 script 元素
  const screenEl = grow({});
  const phoneEl = grow({});
  let cardBox = null;                       // 屏幕上那张卡里的例句槽；null = 无槽

  const sandbox = {
    console,
    history: { stack: [{ wl: 0 }], pushState: noop, back: noop, go: noop, replaceState: noop },
    location: { protocol: "http:", search: "", reload: noop },
    window: { addEventListener: noop, removeEventListener: noop, matchMedia: () => ({ matches: false, addListener: noop, removeListener: noop }), scrollTo: noop },
    navigator: { serviceWorker: { addEventListener: noop, register: () => ({ catch: noop }) } },
    sessionStorage: { _d: {}, getItem(k) { return this._d[k] || null; }, setItem(k, v) { this._d[k] = v; } },
    localStorage: { _d: {}, getItem(k) { return this._d[k] || null; }, setItem(k, v) { this._d[k] = v; } },
    document: {
      hidden: false,
      currentScript: { src: "assets/app.js?v=45" },   // 版本号应该被例句库继承
      documentElement: { setAttribute: noop },
      addEventListener: noop, removeEventListener: noop,
      querySelector: s => {
        if (s === "#screen") return screenEl;
        if (s === ".phone") return phoneEl;
        const m = /\.example-box\[data-example-word="([^"]+)"\]/.exec(String(s));
        if (m) return cardBox && cardBox.word === m[1] ? cardBox : null;
        return null;
      },
      querySelectorAll: () => [],
      createElement: tag => tag === "script"
        ? {
          src: "", onload: null, onerror: null,
          remove() { const i = scripts.indexOf(this); if (i >= 0) scripts.splice(i, 1); this.removed = true; },
        }
        : grow({}),
      head: { appendChild: el => { scripts.push(el); } },
    },
    SpeechSynthesisUtterance: function () { },
    speechSynthesis: { cancel: noop, speak: noop },
    setTimeout, clearTimeout,
    setInterval: () => 0, clearInterval: noop,
    requestAnimationFrame: f => f(),
  };
  sandbox.window.window = sandbox.window;
  vm.createContext(sandbox);

  /* 刻意**不**加载 data-examples.js —— 首屏就是这个状态 */
  for (const f of [
    "assets/data.js", "assets/data-words-bulk-a.js", "assets/data-words-full.js", "assets/data-words-mid.js",
    "assets/data-articles-extra.js", "assets/data-articles-archive.js", "assets/data-covers.js",
    "assets/data-ecdict.js", "assets/data-tapdict.js", "assets/data-wordfreq.js",
  ]) {
    vm.runInContext(fs.readFileSync(path.join(ROOT, f), "utf8"), sandbox, { filename: f });
  }
  vm.runInContext("var WORD_META = window.WORD_META;", sandbox);
  vm.runInContext("var TAPDICT = window.TAPDICT, TAP_REVERSE = window.TAP_REVERSE;", sandbox);
  vm.runInContext("var COMMON_WORDS = window.COMMON_WORDS;", sandbox);
  vm.runInContext(fs.readFileSync(path.join(ROOT, "assets/app.js"), "utf8"), sandbox, { filename: "assets/app.js" });
  vm.runInContext("sheetMore = true;", sandbox);   // 「更多」展开态，renderSheet 才出例题槽

  const ctx = e => vm.runInContext(e, sandbox);

  /* 桩：script 被“下载完成” → 真的把 data-examples.js 跑一遍 */
  const fireLoad = () => {
    const s = scripts[scripts.length - 1];
    if (!s || !s.onload) return;
    try {
      vm.runInContext(EX_SRC, sandbox, { filename: "assets/data-examples.js" });
    } catch (e) { /* 重复声明等执行期错误：按“加载了但没数据”处理 */ }
    s.onload();
  };
  const fireError = () => { const s = scripts[scripts.length - 1]; if (s && s.onerror) s.onerror(); };

  /* 放一张词卡到“屏幕上”，返回它的例句槽（有槽才可能在回填时被替换） */
  const mountCard = word => {
    cardBox = {
      word, removed: false, replaced: false, html: null,
      set outerHTML(v) { this.html = v; this.replaced = true; },
      set innerHTML(v) { this.html = v; },
      remove() { this.removed = true; if (cardBox === this) cardBox = null; },
    };
    return cardBox;
  };
  const dropCard = () => { cardBox = null; };   // 用户关掉词卡

  return { ctx, scripts, mountCard, dropCard, fireLoad, fireError, box: () => cardBox };
}

const grow = (ds, extra) => Object.assign({
  dataset: ds || {},
  classList: { add: noop, remove: noop, toggle: noop, contains: () => false },
  closest: () => null, scrollTop: 0, scrollHeight: 0, clientHeight: 600,
  style: {}, innerHTML: "", textContent: "", children: [],
  setAttribute: noop, removeAttribute: noop, appendChild: noop,
  addEventListener: noop, removeEventListener: noop, insertAdjacentHTML: noop,
}, extra || {});

/* ---------- 选词：一个「例句库里有」一个「例句库里根本没有」 ---------- */
{
  const s = boot();
  const list = JSON.parse(s.ctx("JSON.stringify(WORDS.map(w => [w.word, !!(w.example || w.exampleCn)]))"));
  const bare0 = list.filter(([, has]) => !has).map(([w]) => w);
  globalThis.WORDS_WITH_EX = bare0.find(w => EX_KEYS.has(w));
  globalThis.WORDS_BARE = bare0.find(w => !EX_KEYS.has(w));
}
const W_EX = globalThis.WORDS_WITH_EX;
const W_BARE = globalThis.WORDS_BARE;

console.log("\n== 例句按需加载（失败与边界路径） ==\n");
ok(`挑到「例句库里有」的词：${W_EX}`, !!W_EX);
ok(`挑到「例句库里没有」的词：${W_BARE}`, !!W_BARE);

/* ---------- A. 首屏与轻卡都不碰例句库 ---------- */
{
  console.log("\n[A] 首屏与轻卡");
  const s = boot();
  eq("沙箱初始没有例句数据（模拟首屏）", s.ctx("typeof window.__ADDED_EXAMPLES__"), "undefined");

  s.ctx('sheetMore = false;');
  const slim = s.ctx(`renderSheet(${JSON.stringify(W_EX)})`);
  ok("轻卡不含例句槽（首层无需例句）", !slim.includes("example-box"));
  s.ctx('sheetMore = true;');
  const full = s.ctx(`renderSheet(${JSON.stringify(W_EX)})`);
  ok("完整卡先渲染占位、不阻塞", full.includes(`data-example-word="${W_EX}"`) && full.includes("例句按需加载中"));
  eq("仅渲染卡片不会请求例句库", s.scripts.length, 0);
}

/* ---------- B. 点「更多」才取，且只取一次（Promise 复用） ---------- */
{
  console.log("\n[B] 首次取 / 重复取");
  const s = boot();
  s.mountCard(W_EX);
  s.ctx(`attachExample(${JSON.stringify(W_EX)})`);
  eq("点「更多」后插入 script", s.scripts.length, 1);
  ok("script 指向例句库并继承主脚本版本号",
    s.scripts[0].src === "assets/data-examples.js?v=45");

  s.ctx(`attachExample(${JSON.stringify(W_EX)})`);
  s.ctx('attachExample("the")');
  s.ctx("ensureExamples(); ensureExamples();");
  eq("加载中连续调用只插一个 script（Promise 复用）", s.scripts.length, 1);

  s.fireLoad();
  await tick();
  eq("加载完成后状态为 ready", s.ctx("exState"), "ready");
  ok("回填用的是例句框（不是占位）", s.box() && /class="example-box"/.test(s.box().html) && !s.box().html.includes("loading"));
  ok("回填带目标词高亮", s.box() && s.box().html.includes('class="w-hl"'));
  eq("已就绪后再查词不再插 script", (s.ctx(`attachExample(${JSON.stringify(W_EX)})`), s.scripts.length), 1);
}

/* ---------- C. 网络失败可重试，且查词本身不受影响 ---------- */
{
  console.log("\n[C] 失败与重试");
  const s = boot();
  s.mountCard(W_EX);
  s.ctx(`attachExample(${JSON.stringify(W_EX)})`);
  s.fireError();
  await tick();
  eq("失败后状态回到 idle（允许重试）", s.ctx("exState"), "idle");
  eq("失败的 script 元素被移除", s.scripts.length, 0);
  ok("占位换成可重试（查词本身仍可用）", s.box() && s.box().html.includes("retry-examples") && s.box().html.includes("例句没能加载"));

  s.ctx(`attachExample(${JSON.stringify(W_EX)})`);
  eq("重试会重新插入 script", s.scripts.length, 1);
  ok("重试后卡片渲染照常（词/音标/释义不依赖例句库）",
    s.ctx(`renderSheet(${JSON.stringify(W_EX)})`).includes("sheet-btns"));
  s.fireLoad();
  await tick();
  eq("重试成功 → ready", s.ctx("exState"), "ready");
  ok("重试成功后完成回填", s.box() && /class="example-box"/.test(s.box().html) && !s.box().html.includes("loading"));
}

/* ---------- D. 竞态：加载期间换词 / 关卡 ---------- */
{
  console.log("\n[D] 加载期间换词");
  const s = boot();
  s.mountCard(W_EX);
  s.ctx(`attachExample(${JSON.stringify(W_EX)})`);      // 为 W_EX 发起加载

  /* 用户等不及，换到另一个词：屏幕上出现的是新词的卡 */
  const other = s.mountCard(W_BARE);
  s.fireLoad();
  await tick();
  eq("旧词的回填找不到自己的槽位（新词卡未被污染）", other.html, null);
  eq("新词卡也没有被误删", other.removed, false);

  /* 关卡：槽位随卡一起消失，回填必须静默跳过 */
  const s2 = boot();
  s2.mountCard(W_EX);
  s2.ctx(`attachExample(${JSON.stringify(W_EX)})`);
  s2.dropCard();
  s2.fireLoad();
  await tick();
  eq("卡已关掉时回填静默跳过（不抛错）", s2.ctx("exState"), "ready");
}

/* ---------- E. 本来就没例句的词：占位该消失，不该一直转 ---------- */
{
  console.log("\n[E] 例句库里没有的词");
  const s = boot();
  const box = s.mountCard(W_BARE);
  s.ctx(`attachExample(${JSON.stringify(W_BARE)})`);
  s.fireLoad();
  await tick();
  eq("该词不在例句库 → 占位被移除", box.removed, true);
  eq("不该把占位留在卡上", s.box(), null);
}

/* ---------- F. script 进来了但没数据（执行期出错）→ 不反复重插 ---------- */
{
  console.log("\n[F] 脚本到了但数据没进来");
  const s = boot();
  s.mountCard(W_EX);
  s.ctx(`attachExample(${JSON.stringify(W_EX)})`);
  /* 手动触发 onload，但**不**执行脚本 —— 等价于执行期出错、__ADDED_EXAMPLES__ 未写入 */
  s.scripts[s.scripts.length - 1].onload();
  await tick();
  eq("判为 failed", s.ctx("exState"), "failed");
  ok("占位变成可重试文案", s.box() && s.box().html.includes("例句没能加载"));
  const before = s.scripts.length;
  s.ctx(`attachExample(${JSON.stringify(W_EX)})`);
  eq("failed 态不再重复插 script（避免 const 重复声明）", s.scripts.length, before);
}

console.log(`\n结果：${pass} 通过 / ${fail} 失败\n`);
process.exit(fail ? 1 : 0);

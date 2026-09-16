#!/usr/bin/env node
/* 词阅 WordLens —— sw.js 离线/缓存路径回归
 *
 * 覆盖的是「当前测试没碰到的失败路径」：
 *   · 离线且无缓存时，respondWith 拿到的是不是一个真正的 Response（曾经是 undefined，
 *     浏览器把它当网络错误，页面白屏 —— 而外层 .catch 因为是 resolve 而非 reject 救不了）
 *   · 陈旧缓存优先返回 + 后台刷新（SWR 的核心行为，不能被「先 await 网络」的改法弄丢）
 *   · 304 协商复用时不能把空体交出去
 *
 * 做法：把 sw.js 丢进 vm，mock self / caches / fetch / Response，
 * 抓出 fetch 事件处理器手工触发，检查它交给 respondWith 的东西。
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const ROOT = path.resolve(import.meta.dirname, "..");
const ORIGIN = "https://example.test";

/* ---------- 迷你缓存实现 ---------- */
function makeCaches() {
  const store = new Map();               // url -> Response
  const old = new Map();
  return {
    _store: store,
    _old: old,
    async match(req, options = {}) {
      const url = typeof req === "string" ? new URL(req, ORIGIN + "/").href : (req.url || String(req));
      if (options.cacheName === "wordlens-cache-v50") return store.get(url);
      return store.get(url) || old.get(url);
    },
    async open() {
      return {
        async put(req, res) {
          const url = typeof req === "string" ? new URL(req, ORIGIN + "/").href : (req.url || String(req));
          store.set(url, res);
        },
      };
    },
    async keys() { return ["wordlens-cache-v50"]; },
    async delete() { return true; },
  };
}

/* ---------- 载入 sw.js ---------- */
function loadSw({ fetchImpl, caches }) {
  const handlers = {};
  const self = {
    addEventListener: (t, fn) => { handlers[t] = fn; },
    skipWaiting: () => { },
    clients: { matchAll: async () => [], claim: async () => { } },
    registration: {},
  };
  const sandbox = {
    self,
    caches,
    fetch: fetchImpl,
    Response,
    URL,
    console,
    Date,
    location: { origin: ORIGIN },
    Promise,
  };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(ROOT, "sw.js"), "utf8"), sandbox, { filename: "sw.js" });
  return handlers;
}

/* 触发一次 fetch，返回 respondWith 最终拿到的东西（undefined 也算结果，正是要抓的 bug） */
function fireFetch(handlers, url, { mode = "same-origin", method = "GET" } = {}) {
  let captured;
  const req = { url: ORIGIN + url, mode, method };
  handlers.fetch({ request: req, respondWith: p => { captured = p; } });
  return Promise.resolve(captured);   // swr 返回 Promise<Response>
}

const results = [];
const check = (name, ok, detail) => {
  results.push([name, ok]);
  console.log(`  ${ok ? "✓" : "✗"} ${name}${detail && !ok ? `  → ${detail}` : ""}`);
};
const req404 = () => { const e = new Error("Failed to fetch"); return Promise.reject(e); };

(async () => {
  /* ===== 1. 离线 + 无缓存 + 导航 ===== */
  console.log("== 1. 离线且无缓存（导航） ==");
  {
    const caches = makeCaches();
    const h = loadSw({ caches, fetchImpl: req404 });
    const res = await fireFetch(h, "/ciyue/", { mode: "navigate" });
    check("respondWith 拿到的是 Response 而不是 undefined", res instanceof Response,
      `实际=${res === undefined ? "undefined" : typeof res}`);
    check("离线导航回落 200 离线页", res && res.status === 200, res && "status=" + res.status);
    if (res instanceof Response) {
      const body = await res.text();
      check("离线页确有提示内容", /离线/.test(body));
    }
  }

  /* ===== 2. 离线 + 无缓存 + 静态资源 ===== */
  console.log("\n== 2. 离线且无缓存（静态资源） ==");
  {
    const caches = makeCaches();
    const h = loadSw({ caches, fetchImpl: req404 });
    const res = await fireFetch(h, "/ciyue/assets/app.js?v=44");
    check("静态资源拿到 504 而不是 undefined", res instanceof Response && res.status === 504,
      res === undefined ? "undefined" : "status=" + (res && res.status));
  }

  /* ===== 3. 离线 + 有陈旧缓存 → 用缓存 ===== */
  console.log("\n== 3. 离线且有陈旧缓存（SWR） ==");
  {
    const caches = makeCaches();
    const url = ORIGIN + "/ciyue/assets/app.js?v=44";
    /* Date 头设在 3 小时前 → 超过 1 小时新鲜窗口，走协商路径 */
    const stale = new Response("OLD", { headers: { date: new Date(Date.now() - 3 * 3600e3).toUTCString() } });
    caches._store.set(url, stale);
    const h = loadSw({ caches, fetchImpl: req404 });
    const res = await fireFetch(h, "/ciyue/assets/app.js?v=44");
    check("离线时回落陈旧缓存", res instanceof Response && (await res.text()) === "OLD");
  }

  /* ===== 4. 当前代缓存优先于旧代 ===== */
  console.log("\n== 4. 当前缓存优先 ==");
  {
    const caches = makeCaches();
    const url = ORIGIN + "/ciyue/assets/app.js?v=44";
    caches._old.set(url, new Response("OLD", { headers: { date: new Date(Date.now() - 3 * 3600e3).toUTCString() } }));
    caches._store.set(url, new Response("NEW", { headers: { date: new Date(Date.now() - 3 * 3600e3).toUTCString() } }));
    const h = loadSw({ caches, fetchImpl: req404 });
    const res = await fireFetch(h, "/ciyue/assets/app.js?v=44");
    check("同一 URL 优先返回当前代缓存", res instanceof Response && (await res.text()) === "NEW");
  }

  /* ===== 5. 在线 200 → 返回网络响应并写缓存 ===== */
  console.log("\n== 5. 在线 200 ==");
  {
    const caches = makeCaches();
    const url = ORIGIN + "/ciyue/assets/app.js?v=44";
    const h = loadSw({ caches, fetchImpl: async () => new Response("NEW", { headers: { etag: "v2" } }) });
    const res = await fireFetch(h, "/ciyue/assets/app.js?v=44");
    check("在线返回网络响应", res instanceof Response && (await res.text()) === "NEW");
    await new Promise(r => setTimeout(r, 10));      // caches.put 是 fire-and-forget
    check("网络响应写进了缓存", caches._store.has(url));
  }

  /* ===== 6. 304 协商 → 复用缓存副本，不能给空体 ===== */
  console.log("\n== 6. 304 协商复用 ==");
  {
    const caches = makeCaches();
    const url = ORIGIN + "/ciyue/assets/app.js?v=44";
    const stale = new Response("CACHED", { headers: { date: new Date(Date.now() - 3 * 3600e3).toUTCString() } });
    caches._store.set(url, stale);
    const h = loadSw({ caches, fetchImpl: async () => new Response(null, { status: 304 }) });
    const res = await fireFetch(h, "/ciyue/assets/app.js?v=44");
    check("304 时复用缓存副本", res instanceof Response && (await res.text()) === "CACHED",
      res === undefined ? "undefined" : "status=" + (res && res.status));
  }

  const passed = results.filter(r => r[1]).length;
  console.log(`\n结果：${passed} 通过 / ${results.length - passed} 失败`);
  if (passed !== results.length) process.exitCode = 1;
})();

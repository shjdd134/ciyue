/* 词阅 WordLens —— Service Worker
 *
 * manifest 里声明了 standalone（可安装到主屏幕），离线打开不白屏。
 *
 * 缓存策略（v68，点句保持位置：点句切换时（收起上一句译文 + 展开本句译文）记下用户所点那句
 *   的视口坐标、按残差把它放回原处 —— 实测所点句原本会上移 96px，正好是被收起那句译文的高度；
 *   屏外句不补偿，那一档交给浏览器自己的滚动锚定。上一条 v67 是 AI 栏目整期合并）：
 *   - 缓存名固定不变（内容更新靠 SWR 后台刷新 + ETag 协商，不再靠每日改名清缓存）；
 *   - 页面导航与静态资源统一走「缓存优先 + 新鲜度窗口 + 后台刷新」：
 *       1) 缓存里有、且缓存时间不足 1 小时（看响应 Date 头）→ 零网络请求，直接用；
 *       2) 过期或未命中 → 走网络协商（ETag / Last-Modified）：
 *            200 → 更新缓存并返回；304（内容没变）→ 继续用缓存副本；
 *          网络失败（离线）→ 回落缓存；缓存也没有 → 离线兜底页 / 504。
 *          任何时刻都不会把 undefined 交给 respondWith（那会变成网络错误页）。
 *   - activate 保留最近两代缓存作为回退（避免更新瞬间出现缓存空窗）。
 *   - 注意：不要在这里按发布升级缓存名——那会每天清空用户缓存，重回冷加载。
 */
const CACHE = "wordlens-cache-v68";
const FRESH_MS = 3600 * 1000;   // 缓存响应 1 小时内视为新鲜，零网络

const isFresh = res => {
  if (!res) return false;
  const d = Date.parse(res.headers.get("date") || "");
  return Number.isFinite(d) && Date.now() - d < FRESH_MS;
};

/* 离线且没有任何缓存的兜底。必须返回一个真正的 Response：
 * 原来 swr() 在这种情况下会解析成 undefined，而 respondWith(undefined) 会被浏览器
 * 当成网络错误 —— 外层 .catch(() => caches.match("index.html")) 也救不了，
 * 因为那不是 reject，是「成功拿到了一个 undefined」。 */
const OFFLINE_HTML = `<!doctype html><html lang="zh-CN"><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>词阅 · 离线</title>
<body style="margin:0;display:flex;min-height:100vh;align-items:center;justify-content:center;
background:#F7F8FC;color:#2D3436;font:16px/1.7 -apple-system,'PingFang SC',sans-serif;text-align:center">
<div><div style="font-size:44px">📵</div><p style="margin:12px 0 4px;font-weight:600">当前处于离线状态</p>
<p style="margin:0;color:#8A8F98;font-size:14px">这篇文章还没缓存到本地<br>联网后重新打开即可</p></div></body></html>`;

function offlineResponse(req) {
  if (req.mode === "navigate") {
    return caches.match("index.html").then(hit =>
      hit || new Response(OFFLINE_HTML, {
        status: 200, headers: { "Content-Type": "text/html; charset=utf-8" },
      }));
  }
  return Promise.resolve(new Response("offline", {
    status: 504, statusText: "Offline",
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  }));
}

async function swr(req, event) {
  /* 当前代优先：全局 caches.match 会先命中旧缓存，发布后可能长期把旧 app.js
     交给页面；当前缓存没有时才退回旧代，兼顾更新正确性与平滑回退。 */
  const current = await caches.match(req, { cacheName: CACHE });
  const hit = current || await caches.match(req);
  if (isFresh(hit)) return hit;
  const net = fetch(req).then(res => {
    if (res && res.status === 304) return hit || res;   // 协商未变：绝不能把 304 空体交给页面
    if (res && res.ok) {
      const changed = !!hit && hit.headers.get("etag") !== res.headers.get("etag");
      const copy = res.clone();
      const write = caches.open(CACHE).then(c => c.put(req, copy)).catch(() => { });
      if (event && event.waitUntil) event.waitUntil(write);
      /* 后台刷新发现内容变了：通知页面（非阅读视图会自动刷新一次） */
      if (changed) {
        const notice = notifyUpdated();
        if (event && event.waitUntil) event.waitUntil(notice);
      }
      return res;
    }
    return hit || res;
  }).catch(() => hit);
  /* 有过期副本先回（后台继续刷新）；没有就等网络；网络也拿不到（离线首访）
   * 才落到离线兜底。任一分支都必须给出 Response，永不返回 undefined。 */
  return hit || (await net) || (await offlineResponse(req));
}

/* 内容在后台更新完成：广播给打开中的页面 */
async function notifyUpdated() {
  try {
    const clis = await self.clients.matchAll({ type: "window" });
    clis.forEach(c => c.postMessage({ type: "content-updated" }));
  } catch { /* 通知失败不影响刷新本身 */ }
}

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => {
      /* 保留当前缓存 + 版本号最高的旧缓存作回退，其余清理 */
      const old = keys.filter(k => k !== CACHE).sort().pop();
      return Promise.all(keys.filter(k => k !== CACHE && k !== old).map(k => caches.delete(k)));
    }).then(() => self.clients.claim())
  );
});

self.addEventListener("message", e => {
  if (e.data?.type === "cache-urls" && Array.isArray(e.data.urls)) {
    e.waitUntil(
      caches.open(CACHE).then(c =>
        Promise.allSettled(e.data.urls.map(u => c.add(new URL(u, location.href).href)))
      )
    );
  }
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  let url;
  try { url = new URL(req.url); } catch (err) { return; }
  if (url.origin !== location.origin) return;   // 只接管本站资源

  /* 页面导航与静态资源同一策略。离线兜底已收进 swr() 内部（offlineResponse），
   * 这里不再挂 .catch —— 原来那条 catch 是个安慰剂：swr 离线无缓存时是 resolve
   * 成 undefined 而不是 reject，catch 根本不会触发，页面照样白屏。 */
  e.respondWith(swr(req, e));
});

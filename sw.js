/* 词阅 WordLens —— Service Worker
 *
 * manifest 里声明了 standalone（可安装到主屏幕），离线打开不白屏。
 *
 * 缓存策略（v42）：
 *   - 缓存名固定不变（内容更新靠 SWR 后台刷新 + ETag 协商，不再靠每日改名清缓存）；
 *   - 页面导航与静态资源统一走「缓存优先 + 新鲜度窗口 + 后台刷新」：
 *       1) 缓存里有、且缓存时间不足 1 小时（看响应 Date 头）→ 零网络请求，直接用；
 *       2) 过期或未命中 → 走网络协商（ETag / Last-Modified）：
 *            200 → 更新缓存并返回；304（内容没变）→ 继续用缓存副本；
 *          网络失败（离线）→ 回落缓存。任何时刻都不会把空响应交给页面。
 *   - activate 保留最近两代缓存作为回退（避免更新瞬间出现缓存空窗）。
 *   - 注意：不要在这里按发布升级缓存名——那会每天清空用户缓存，重回冷加载。
 */
const CACHE = "wordlens-cache";
const FRESH_MS = 3600 * 1000;   // 缓存响应 1 小时内视为新鲜，零网络

const isFresh = res => {
  if (!res) return false;
  const d = Date.parse(res.headers.get("date") || "");
  return Number.isFinite(d) && Date.now() - d < FRESH_MS;
};

async function swr(req) {
  /* caches.match 不指定缓存名：命中旧代缓存也算，平滑过渡 */
  const hit = await caches.match(req);
  if (isFresh(hit)) return hit;
  const net = fetch(req).then(res => {
    if (res && res.status === 304) return hit || res;   // 协商未变：绝不能把 304 空体交给页面
    if (res && res.ok) {
      const changed = !!hit && hit.headers.get("etag") !== res.headers.get("etag");
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(req, copy)).catch(() => { });
      /* 后台刷新发现内容变了：通知页面（非阅读视图会自动刷新一次） */
      if (changed) notifyUpdated();
      return res;
    }
    return hit || res;
  }).catch(() => hit);
  return hit || net;   // 有过期缓存也先回，后台刷新
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

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  let url;
  try { url = new URL(req.url); } catch (err) { return; }
  if (url.origin !== location.origin) return;   // 只接管本站资源

  /* 页面导航与资源同一策略；导航离线时兜底缓存首页 */
  if (req.mode === "navigate") {
    e.respondWith(swr(req).catch(() => caches.match("index.html")));
    return;
  }

  e.respondWith(swr(req));
});

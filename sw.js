/* 词阅 WordLens —— Service Worker
 *
 * manifest 里声明了 standalone（可安装到主屏幕），离线打开不白屏。
 *
 * 缓存策略（v38）：
 *   - 页面导航与静态资源统一走「缓存优先 + 新鲜度窗口 + 后台刷新」：
 *       1) 缓存里有、且缓存时间不足 1 小时（看响应 Date 头）→ 零网络请求，直接用；
 *       2) 过期或未命中 → 走网络（不带 reload，让 ETag/Last-Modified 协商出 304），
 *          成功则更新缓存；失败（离线）回落缓存。
 *     历史：v37 用「命中缓存 + 每次 force-reload 全量后台重下」，页面虽然秒开，
 *     但每次进站都白拉 2MB；v36 及以前是全量网络优先，每次进站都慢。
 *   - 发布时 bump 下面的 CACHE 名：新 SW 激活清空旧缓存，发布后首次进站全量走
 *     网络拿最新内容（一次性代价），之后恢复秒开。
 */
const CACHE = "wordlens-v41";
const FRESH_MS = 3600 * 1000;   // 缓存响应 1 小时内视为新鲜，零网络

const isFresh = res => {
  if (!res) return false;
  const d = Date.parse(res.headers.get("date") || "");
  return Number.isFinite(d) && Date.now() - d < FRESH_MS;
};

async function swr(req) {
  const hit = await caches.match(req);
  if (isFresh(hit)) return hit;
  const net = fetch(req).then(res => {
    if (res && res.ok) {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(req, copy)).catch(() => { });
    }
    return res;
  }).catch(() => hit);
  return hit || net;   // 过期缓存也先回，后台刷新
}

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  let url;
  try { url = new URL(req.url); } catch (err) { return; }
  if (url.origin !== location.origin) return;   // 只接管本站资源

  /* 页面导航与资源同一策略：缓存新鲜直接用；离线时导航回落缓存首页 */
  if (req.mode === "navigate") {
    e.respondWith(
      swr(req).catch(() => caches.match("index.html"))
    );
    return;
  }

  e.respondWith(swr(req));
});

/* 词阅 WordLens —— Service Worker
 *
 * manifest 里声明了 standalone（可安装到主屏幕），离线打开不白屏。
 *
 * 缓存策略（2026-09-12 起）：
 *   - 页面导航（index.html）：网络优先，保证入口壳最新，断网回落缓存；
 *   - 其余静态资源：缓存优先 + 后台刷新（stale-while-revalidate）。
 *     原先全量网络优先时，每次进站都要重新拉 2MB / 15+ 个文件，而 GitHub Pages
 *     的单请求边缘延迟 1~2s（1KB 的文件也一样慢），用户感知就是「进站有时候卡」；
 *     现在非首次进站直接用缓存秒开，最新文件在后台拉回来供下次使用。
 *   - 发布时 bump 下面的 CACHE 名：新 SW 激活清空旧缓存，发布后首次进站自然
 *     全量走网络拿最新内容，之后恢复秒开。
 */
const CACHE = "wordlens-v37";

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

  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req, { cache: "reload" })
        .catch(() => caches.match(req).then(hit => hit || caches.match("index.html")))
    );
    return;
  }

  e.respondWith(
    caches.match(req).then(hit => {
      const net = fetch(req, { cache: "reload" })
        .then(res => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then(c => c.put(req, copy)).catch(() => { });
          }
          return res;
        })
        .catch(() => hit);
      return hit || net;
    })
  );
});

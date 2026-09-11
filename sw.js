/* 词阅 WordLens —— Service Worker
 *
 * manifest 里声明了 standalone（可安装到主屏幕），但此前没有 Service Worker，
 * 离线打开会白屏、也拿不到安装提示。这里补一个最保守的实现：
 *
 *   网络优先（network-first）：联网时永远拿最新文件，避免开发期改完代码
 *   却看到旧缓存；断网时才回落到缓存，保证离线也能打开。
 */
const CACHE = "wordlens-v20";

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

  e.respondWith(
    fetch(req, { cache: "reload" })
      .then(res => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy)).catch(() => { });
        }
        return res;
      })
      .catch(() => caches.match(req).then(hit => hit || caches.match("index.html")))
  );
});

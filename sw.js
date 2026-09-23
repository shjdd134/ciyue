/* 词阅 WordLens —— Service Worker
 *
 * manifest 里声明了 standalone（可安装到主屏幕），离线打开不白屏。
 *
 * 缓存策略（v82，本批修 SW 首访预热竞态 + cycle 缺义，见 HANDOFF §0.2）：
 *   SW 本体逻辑一字未动 —— 改的是 app.js 的 warmAppCache：首访时 register() resolve
 *   后 controller 仍是 null，预热 postMessage 静默落空；现改为等 worker activated /
 *   controllerchange 再发（sent 去重）。缓存名随 assetVersion 走，只为让客户端拿到新资源：
 *   ① SW 首访预热 controller 竞态（app.js warmAppCache）；
 *   ② cycle 词条补「骑自行车（摩托车）」义项（SENSE_OVERRIDES，修表不修闸）。
 *
 *   上一条 v80 是「原生壳里会真坏」的三件事收口：
 *   ① 三条生命周期监听原来被套在 `if (shouldRegisterSW(...))` 里 —— 可「切后台结算阅读时长」
 *      「离开页面落盘续读位置」与 Service Worker 一点关系都没有。**壳里不注册 SW 是对的**
 *      （壳从 assets 直接拦截出文件，不需要 SW 的取数代理），但这一关把三条监听一起关掉了：
 *      壳里读十分钟直接切走，**阅读时长与续读位置一个字节都不写**（移动端最高频的漏记场景）。
 *      SW 不可用的网页环境（http:// 非安全上下文、隐私模式）本来也有同一个洞。
 *      现移到文件末尾独立的「生命周期」节，那一节不引用任何 serviceWorker API。
 *   ② 原生数据镜像：localStorage 是壳里唯一的存储，系统「清除数据」会把它整块清掉 ——
 *      现在 `save()` 的三档（原样 / 裁剪 / 失败）**都**把**完整**状态推给原生 `UserState`
 *      （壳侧原子写 user-state.json），启动时本地读不到就回落它；
 *      `importData` 之后也镜像（否则再被清一次，回落读回的是导入前的旧进度）。
 *      没打壳旗标时一个字节都不碰 —— 网页环境零影响（守卫带这条反向对照）。
 *   ③ 壳胶水 `mobile/shell-glue.js`（构建期注入 <head> 最前）：Android WebView 的
 *      `speechSynthesis` 只有壳、没有合成侧（朗读整块不可用）→ 转原生 TTS；
 *      WebView 里 env(safe-area-inset-*) 可能是恒 0 → 由原生 insets 写 CSS 变量；
 *      系统返回键默认直接退 App → 改成「先关浮层，没有浮层才退」。
 *      另接 `__wlNativePause()`：切后台时显式落盘，不赌 visibilitychange 会不会派发。
 *      守卫 386 → 431（新增「壳里生命周期」「原生数据镜像」「壳胶水」三组，
 *      外加 [U] 源文件行尾卫生 1 条：CRLF 污染不会让任何断言变红，
 *      却会让 diff-files / tree-diff 的逐文件比对全线失真）。
 *   同批产出 Android 壳工程（`mobile/android/` + `tools/build-apk.mjs`，不走 Gradle，
 *   产物 `mobile/www` 与 `outputs/apk/` 绝不入库 —— 见 .gitignore）。
 *   上一条 v78 是网页侧两项可靠性兜底（APK 审查报告第②③条）：
 *   ① 落盘收口：`save()` 原来直接 `localStorage.setItem` —— 配额满 / 无痕 / WebView
 *   回收时**直接抛**，异常冒到点击处理器（存储一满，点个词都能把交互打断）。
 *   现在三档：原样写 → 失败则只裁最老的续读位置（readPos/readHistory 留最近 40 篇，
 *   生词 / 已知词 / 记录 / 时长一个字不动）再写一次 → 再失败标记 failed + 提示一次，
 *   并在「我的 → 数据与备份」显示告警行（新 `.storage-warn` + `alert` 图标）。
 *   ② 续读位置一致性：锚点原来只在离开阅读页 / pagehide / visibilitychange 记，
 *   宿主杀进程时这些事件不保证执行 —— 恢复时更旧的锚点会盖掉较新的 scrollTop。
 *   现在滚动节流那一跳把锚点与 scrollTop **同一次落盘**，并补了「停住 5 秒也落一次」
 *   的延时（节流条件只在下次滚动才求值，滚一下就停原来一个字节都不写）。
 *   锚点同时开始存 `rs`（退化段精确到切句）。守卫 374 → 386（新增 [S] 节）。
 *   上一条 v77 是修 displaySentenceAt 的取句错位：旧写法 `list[rs] || list[si]`
 *   在普通多句段里 rs 恒 0 → list[0] 永远为真 → 回退分支永不执行，点第二句及
 *   以后一律取回**段首句**（全库实测 4,023 句取错 / 1,415 个多句段受影响）。
 *   症状：查词卡「本句含义」显示成段首句、生词本收藏语境存错句、单句朗读念错句。
 *   改为「两种段落形状互斥，索引取非零的那一个」；守卫 368 → 374。
 *   上一条 v76 是删掉发现页人物分类顶部的 people-intro 介绍横幅
 *   （「THE PEOPLE ISSUE / 人物，和他们的世界。」整块，用户要求）；渲染、
 *   两份样式表、nav-test 断言（翻转为负向）一并清掉，[H4]⑨ 补两条残骸守卫。
 *   上一条 v75 是全站 UI/UX 三轮改版：
 *   ①「我的」页重排（概况两组口径 / 记录与词汇提前 / 词库总量移进关于）+ 关于词阅
 *   三层重写（简介 / 功能 / 数据说明可折叠，外链带 noopener）+ 全站字号四级规范
 *   （说明 14 / 次要 12，散点 11px 内联清零）；② 首页顺序改为 问候 → 续读 → 精选
 *   → 推荐 → 分类，统计缩轻量一行；发现页删分类磁贴（与顶部标签合并）、排序改
 *   文字入口、精选改紧凑横卡、推荐卡标题前置、长文标「可分次读」；③ 阅读页
 *   byline 去掉重复栏目。守卫 335 → 366（[H3]/[H4]/[H5]），负向 23 组全红。
 *   上一条 v74 是首页封面轮换：首页那块「本期精选」大图原来写死第一篇人物文
 *   （按日期倒序永远是 Anne Hathaway），现改为每次进站从 `LEAD_PHOTO_POOL`
 *   随机挑一「篇 + 一张图」，照片 / 标题 / 英文题 / 署名 / 跳转一起换。
 *   池子只收**横构图**（宽/高 ≥ 1.4）—— 图位实测 1.46–1.52 : 1，配 object-fit: cover，
 *   竖图要裁掉 50%+ 只剩一条窄缝；56 张人物照里够宽的只有 14 张（覆盖 4 篇，
 *   佐伊·多伊奇与伊娃·格林两篇全竖图、一次不出现，是刻意的）。
 *   上一条 v73 是段落级退化段的渲染期切分：AI 栏目（Offbook 通道）源站只给段落级对齐，
 *   官方译文句数与英文常不等（实测 `The seventh year of Kaihuang. Officials need filling.`
 *   5 句英文 ↔ 4 句中文），入库时按设计不切、整段塞进一个句级元素 —— 形状合法但
 *   `.para-flow` 眼里它是 1 句，整段英文连排成一坨，与句级对齐成功的段混在同一篇里
 *   （全站 510 处）。现在在**渲染期**按句末标点再切，译文整段挂最后一句，数据与句数
 *   口径一个字不动。再上一条 v72 是朗读层重写（原来只设 u.lang 就 speak()，而 lang 只是
 *   **提示**、浏览器据此自行挑 voice；本机 Speech_OneCore 只有 3 个中文包、0 个英文，
 *   于是拿默认中文 voice 念英文且 onerror 不触发；现改为主动挑 voice + 分句串行队列）：
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
const CACHE = "wordlens-cache-v82";
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

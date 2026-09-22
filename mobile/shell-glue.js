/* 词阅 WordLens —— Android 原生壳专用胶水
 *
 * 构建时由 tools/lib-mobile.cjs 内联进 mobile/www/index.html 的 <head> 最前面。
 * ⚠️ **只在安装包里存在，网页版没有这一份。** 所以任何「网页也该有的行为」都不许
 *    写在这里 —— 一写进来就变成「壳里这样、网页那样」的隐性分叉，而且没有任何
 *    方法能从网页侧观察到它。壳专属的东西只有三类：系统栏高度、系统返回键、原生能力。
 *
 * 为什么单独成文件、不拼进 lib-mobile.cjs 的模板字符串：
 *   它是货真价实的 JS，得能被 `node --check` 与 audit 的沙箱直接跑起来。
 *   塞进字符串里就永远只能靠肉眼审，而且引号转义错一次就是整个壳白屏。
 *
 * 对外接口（壳侧 Java 调进来 / 是原生对象）：
 *   window.WORDLENS_NATIVE      [写出] app.js 据此跳过 SW 注册、启用 UserState 镜像
 *   window.__wlInsets(t, b)     [壳调] 壳量到真实系统栏高度后调
 *   window.__wlNativeBack()     [壳调] 按返回键时先问这里；true = 已处理，别再退页面
 *   window.__wlTtsEnd(id)       [壳调] 原生 TTS 这条播完了
 *   window.__wlTtsError(id, c)  [壳调] 原生 TTS 这条出错/被引擎丢弃
 *   window.__wlSaveDone(ok, d)  [壳调] 原生「另存为」有结果了（导出备份那条路）
 *   window.NativeTts            [原生] ready() / voicesJson() / speak(t,lang,id,rate) / cancel()
 *   window.UserState            [原生] saveState(json) / loadState()（只有 app.js 在用）
 *   window.WLSaveFile           [原生] save(name, text)（只有 app.js 的导出在用）
 *   window.__wlDiagReported     [写出] 本节报过故障后置 true —— Java 侧的渲染检测据此让路
 */
(function () {
  "use strict";
  window.WORDLENS_NATIVE = true;

  /* ---------- 1. 真实系统栏高度 → CSS 变量 ----------
   * 为什么要壳来写：--safe-t / --safe-b 的默认值是 env(safe-area-inset-*)，
   * 而 Android WebView 能不能把宿主 View 的 insets 传进 Blink 取决于宿主怎么摆，
   * 拿不到就是恒 0 —— 表现为状态栏直接压在第一行字上、底部手势条盖住 tabbar。
   * 壳侧量到真实值后调这里，把变量钉死。 */
  var insetEl = null;
  window.__wlInsets = function (top, bottom) {
    var t = Math.max(0, Number(top) || 0);
    var b = Math.max(0, Number(bottom) || 0);
    if (!insetEl) {
      insetEl = document.createElement("style");
      insetEl.id = "wl-insets";
      (document.head || document.documentElement).appendChild(insetEl);
    }
    /* !important 是必需的，两个理由：
     *   ① 变量定义在 `.phone` 规则里（editorial.css / styles.css 窄屏媒体查询），
     *      而 .phone 是 app.js 渲染后才出现的元素 —— 往它身上写内联变量得等它出现，
     *      注入作者样式是唯一「写一次、之后才出现的元素也吃到」的办法；
     *   ② 作者样式里的 !important 优先于元素内联的非 !important 声明，所以这条路稳。
     * 已知边界：若将来有人在 CSS 里给 --safe-t 也加 !important，那就回到「后写的赢」，
     * 而这份 style 在 <head> 最前面 → 会输。改 CSS 时记得回来看看这里。 */
    insetEl.textContent =
      ".phone{--safe-t:" + t + "px !important;--safe-b:" + b + "px !important}";
  };

  /* ---------- 2. 系统返回键：先把浮层关掉 ----------
   * 导航层不用管：app.js 的应用内栈已经与 history 对齐（pushNav / resetNav），
   * 壳侧直接 webView.goBack() 就等于按了浏览器后退键，popstate 会走 navBack(true)。
   * 唯一漏的是浮层 —— 它是纯 DOM 覆盖层、不在 history 里，系统返回会直接退页面
   * 而不是关掉它（网页版在浏览器里也是这个行为，但手机上很别扭）。
   * 这里只做一件事：有浮层就关掉。返回 true 表示已处理。 */
  window.__wlNativeBack = function () {
    var mask = document.querySelector(".sheet-mask") || document.querySelector('[data-act^="close-"]');
    if (mask) { mask.click(); return true; }
    return false;
  };

  /* ---------- 3. speechSynthesis 垫片（走原生 TextToSpeech） ----------
   * Android WebView 不实现 Web Speech 的**合成**侧：window.speechSynthesis 要么不存在、
   * 要么 getVoices() 永远返回空 —— 站内「朗读」（单词、单句、全文）整块功能在壳里
   * 直接不可用。这里用原生 TTS 顶上，接口严格按 app.js 实际用到的字段来。 */
  var TTS = window.NativeTts || null;
  var live = {};          // utteranceId → utterance（正在飞的那条）
  var seq = 0;

  window.__wlTtsEnd = function (id) {
    var u = live[id]; delete live[id];
    if (!u) return;                                  // 已被 cancel / 已被新的一条冲掉
    if (typeof u.onend === "function") { try { u.onend({ type: "end" }); } catch (e) { } }
  };
  window.__wlTtsError = function (id, code) {
    var u = live[id]; delete live[id];
    if (!u) return;
    if (typeof u.onerror === "function") {
      try { u.onerror({ type: "error", error: code || "synthesis-failed" }); } catch (e) { }
    }
  };

  var ShimUtterance = function (text) {
    this.text = String(text == null ? "" : text);
    this.lang = "en-US"; this.rate = 1; this.pitch = 1; this.volume = 1;
    this.voice = null;
    this.onstart = null; this.onend = null; this.onerror = null;
  };

  /* 每次读都问一遍原生，不在 JS 侧缓存 —— 原生那边只是一次返回字符串的调用，
   * 而 TTS 引擎是异步初始化的：缓存一次「空」就会把「当时还没好」定成永久结论，
   * 表现为永远提示「未找到英文语音包」。 */
  function voicesFromNative() {
    if (!TTS || typeof TTS.voicesJson !== "function") return [];
    var raw;
    try { raw = TTS.voicesJson(); } catch (e) { return []; }
    try { raw = JSON.parse(raw || "[]"); } catch (e) { return []; }
    if (!raw || typeof raw.length !== "number") return [];
    var out = [];
    for (var i = 0; i < raw.length; i++) {
      var v = raw[i] || {};
      out.push({
        name: String(v.name || "Android TTS"),
        lang: String(v.lang || "en-US"),
        localService: v.localService !== false,
        "default": !!v.default
      });
    }
    return out;
  }

  var shim = {
    pending: false, speaking: false, paused: false,
    getVoices: voicesFromNative,
    speak: function (u) {
      if (!u || typeof u.text !== "string" || !u.text) return;
      shim.cancel();                                 // 一次只留一条在飞，与 app.js 自管队列一致
      var id = "wl" + (++seq);
      live[id] = u;
      /* 口音优先取 app.js 挑中的 voice（pickVoice 会把它挂在 u.voice 上），
         拿不到再退回 u.lang —— 这样「用户选了英音」在壳里也真的会走 en-GB。 */
      var lang = String((u.voice && u.voice.lang) || u.lang || "en-US");
      var ok = false;
      try { ok = TTS.speak(u.text, lang, id, Number(u.rate) || 1) !== false; } catch (e) { ok = false; }
      if (!ok) {
        delete live[id];
        if (typeof u.onerror === "function") {
          try { u.onerror({ type: "error", error: "synthesis-failed" }); } catch (e) { }
        }
      }
    },
    cancel: function () {
      if (TTS) { try { TTS.cancel(); } catch (e) { } }
      /* ★ 刻意**不**给被取消的那条派发 onerror。
       * 理由：app.js 的单词朗读路径（speak(t, "word")）把 u.onerror 直接接到了
       * 「朗读失败 · 系统可能没有这个口音的语音包」提示上，它不区分「自己取消的」
       * 还是「真的失败」。一旦这里派发，用户每点一个新词都会看到一次假失败提示。
       * 全文朗读那两条路径（stopSpeech / togglePauseSpeech）都是靠 spList / spPaused
       * 自己判定的，不依赖这个回调 —— 所以静默取消是安全的。
       * 清空 live 同时让迟到的原生回调变成空操作（__wlTtsEnd/Error 查不到 id 就直接返回）。 */
      live = {};
    },
    /* pause / resume 只作占位：app.js 明确不用它们（注释里写了「iOS Safari 的
       pause/resume 历史行为不可靠，自管队列才是跨平台一致的做法」），
       暂停是「cancel + 记住序号」。这里映射成 cancel 而不是留空，
       是为了万一将来有人调了，行为至少是「停住」而不是「继续念」。 */
    pause: function () { shim.cancel(); },
    resume: function () { },
    addEventListener: function () { }, removeEventListener: function () { },
    dispatchEvent: function () { return true; }
  };

  /* TTS 引擎异步初始化：注入这份胶水时它多半还没好。
   * 所以用 getter 每次重新问一遍 ready()，好了就自然生效；直接赋值会把
   * 「当时还没好」定成永久结论。app.js 每一处都是「先读 window.speechSynthesis
   * 判空、再调」，所以中途切换不会有漏判。 */
  var ttsHandle = null;
  function ttsFacade() {
    if (ttsHandle) return ttsHandle;
    if (!TTS || typeof TTS.ready !== "function") return undefined;
    var ok = false;
    try { ok = TTS.ready() === true; } catch (e) { ok = false; }
    if (!ok) return undefined;                        // 还没好（或设备没有 TTS 引擎）→ 让 app.js 如实提示
    ttsHandle = shim;
    return ttsHandle;
  }

  function override(name, getter) {
    try {
      Object.defineProperty(window, name, { configurable: true, enumerable: true, get: getter });
      return true;
    } catch (e) { return false; }                     // 平台属性不可配置时退回平台原样
  }

  override("speechSynthesis", ttsFacade);
  /* 构造器**总是**提供：app.js 在「查不到语音」时仍会 new 一条 utterance 出来（只为拿 .text），
     返回 undefined 会让它当场抛。真正决定「能不能念」的是上面那个 getter。 */
  override("SpeechSynthesisUtterance", function () { return ShimUtterance; });

  /* ---------- 4. 壳侧「要退到后台了」的显式入口 ----------
   * 壳在 onPause / onStop 时直接调这里。
   * 为什么不靠 visibilitychange：WebView.onPause() 到底会不会派发它、document.hidden
   * 在那一刻是不是已经变成 true，都取决于 WebView 版本 —— 不能赌。而这一步很关键：
   * 用户在阅读页直接按 home 或锁屏（最高频的离开方式），就靠它结算阅读时长与续读位置。
   * flushReadTime / flushReadPos 是 app.js 顶层的函数声明（挂在 window 上），
   * 网页侧 pagehide / visibilitychange 走的是同两个函数 —— 两条路，同一份结算逻辑，
   * 不存在「壳里算一遍、网页算一遍」的分叉。
   * 重复调用是安全的：flushReadTime 只结算尚未落盘的秒数（第二次为 0），
   * flushReadPos 是幂等写。所以 onPause 与 onStop 各调一次不会重复计时。 */
  window.__wlNativePause = function () {
    try { if (typeof flushReadTime === "function") flushReadTime(); } catch (e) { }
    try { if (typeof flushReadPos === "function") flushReadPos(); } catch (e) { }
  };

  /* ---------- 5. 系统栏图标明暗跟着应用主题 ----------
   * 壳侧自己不知道用户在「我的」里选了深色 —— 主题只在 localStorage 里，而且是 app.js
   * 渲染时才写到 <html data-theme> 上的。所以这里盯那个属性，一变就通知壳。
   * 不做这件事的后果不是「不完美」而是「看不见」：浅色主题配浅色图标，状态栏时间/电量直接消失。 */
  var lastDark = null;
  function pushTheme() {
    var t = document.documentElement.getAttribute("data-theme") || "light";
    var dark = t === "dark";
    if (dark === lastDark) return;
    lastDark = dark;
    if (window.SystemBars && typeof window.SystemBars.setDark === "function") {
      try { window.SystemBars.setDark(dark); } catch (e) { }
    }
  }
  try {
    new MutationObserver(pushTheme).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  } catch (e) { /* 宿主没有 MutationObserver 时退化成只在下面推一次 —— 别为此整段不跑 */ }
  /* MutationObserver 只看「变化」，读不到初始值，所以首帧必须自己推一次。
     app.js 是 defer 的：它在 DOMContentLoaded 之前就把 data-theme 写好了，
     所以两条路（首帧 / 观察者）都能覆盖到。 */
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", pushTheme);
  else pushTheme();

  /* ---------- 6. 出故障时「自己说出来」 ----------
   * 壳里最糟的失败形态是**白屏**。原因在结构里：源 index.html 的 body 是空的，整个界面
   * 都是 app.js 建出来的（第一个元素是 <div class="phone">）。所以脚本一旦不执行 ——
   * 语法错、静态脚本没拿到、资源路径不对 —— 屏幕上就只剩主题背景色，没有任何线索。
   * WebView 又没有控制台可看（除非插电脑），用户能提供的信息只有「白屏」两个字。
   *
   * 这一节把失败**画在屏幕上**。不需要开关：正常永不可见，只有真出问题才出现。
   *
   * 与 Java 侧（MainActivity 的诊断层）的分工，两边不重复报：
   *   本节报「页面到了、脚本没跑起来」；
   *   Java 侧报「页面根本没到」（那时本节的代码也没有机会执行）。
   *   Java 侧显示前会先查 __wlDiagReported，两个红条不会打架。
   */
  var problems = [];

  function report() {
    if (window.__wlDiagReported) return;
    var box;
    try {
      box = document.getElementById("wl-diag");
      if (!box) {
        box = document.createElement("div");
        box.id = "wl-diag";
        /* 内联样式：壳里不能假定某张样式表一定生效（要报的可能正是样式没加载），
           也不该为了诊断去改站内 CSS。 */
        box.setAttribute("style", "position:fixed;left:0;right:0;top:0;z-index:2147483647;"
          + "background:#7f1d1d;color:#fff;font:12px/1.55 monospace;letter-spacing:0;"
          + "padding:12px 14px;white-space:pre-wrap;word-break:break-all;"
          + "-webkit-user-select:text;user-select:text");
        (document.body || document.documentElement).appendChild(box);
      }
      var ua = "";
      try { ua = navigator.userAgent; } catch (e) { }
      box.textContent = "⚠ 词阅 · 壳自检\n" + problems.slice(0, 6).join("\n")
        + "\n---\nURL " + location.href + "\nUA  " + ua;
    } catch (e) { /* 连诊断都建不出来（DOM 都没了）：无计可施，别让它再抛一次 */ }
    window.__wlDiagReported = true;
  }

  function note(s) {
    if (problems.indexOf(s) < 0) problems.push(s);
  }

  /* ① 脚本层面。error 事件有两种形态：e.target 是元素 → 资源加载失败；
     否则是脚本本身抛错（含语法错，那种连 window.onerror 都收得到）。 */
  window.addEventListener("error", function (e) {
    var t = e && e.target;
    if (t && t !== window && t.tagName) {
      /* ★ 只报 <script>。站内正文里有原刊图片地址，离线时它们会**全部**加载失败 ——
         把 <img> 也计进来，「正常离线浏览」就会每次都弹红条，那就成了狼来了。 */
      if (t.tagName === "SCRIPT") note("脚本加载失败 " + (t.src || "(内联)"));
    } else if (e && e.message) {
      note("脚本错误 " + e.message + " @" + (e.filename || "?") + ":" + (e.lineno || 0));
    }
    if (problems.length) report();
  }, true);

  window.addEventListener("unhandledrejection", function (e) {
    var r = e && e.reason;
    note("未处理的 Promise 拒绝 " + String((r && (r.message || r)) || ""));
    report();
  });

  /* ② 页面到了、界面却没建出来。
     用 .phone 当判据（app.js 渲染的第一个元素）。等多久是分寸活：等太短会在低端机上
     误报，等太长等于让用户对着白屏干等。所以不是「等固定时长」而是「等加载结束」——
     readyState 还没 complete 就说明还在跑，再给一轮；只有「加载已完成却仍无界面」
     才是真的没跑起来。 */
  var grace = 0;
  function checkRendered() {
    if (document.querySelector(".phone")) return;              // 正常
    if (window.__wlDiagReported) return;                       // 上面已经报过，别重复
    if (document.readyState !== "complete" && grace < 3) {
      grace++;
      window.setTimeout(checkRendered, 2000);
      return;
    }
    var n = document.querySelectorAll("script[src]").length;
    note("页面脚本没有执行（加载已结束，但界面没被建出来）");
    note("静态脚本 " + n + " 个 · 就绪状态 " + document.readyState);
    report();
  }
  window.setTimeout(checkRendered, 3500);

  /* ---------- 7. 原生「另存为」的回执（导出备份） ----------
   * 壳里的导出**不能**走网页那条 `<a download>` + blob: —— WebView 不处理 blob: 下载，
   * 而且没设 DownloadListener 时它连回调都不给：不下载、不报错、不写日志。偏偏 a.click()
   * 也不会抛，于是那句「已导出进度备份」会是一句**假成功**：用户以为存好了，
   * 去下载目录里什么都没有 —— 而且他不会来报修，直到某天需要恢复才发现备份是空的。
   *
   * 所以 app.js 在壳里改调 window.WLSaveFile.save(名字, 文本)，由壳拉起系统的「另存为」
   * 界面。保存是异步的（用户要先选位置），结果从 Java 侧回到这里 —— 成功和失败都出声，
   * 失败还要带上原生给的原因（磁盘满 / 无权限 / 被取消之后的中断），不许静默。
   */
  window.__wlSaveDone = function (ok, detail) {
    try {
      if (typeof toast !== "function") return;
      toast(ok ? "已导出进度备份" : ("导出失败：" + (detail || "未知原因")));
    } catch (e) { /* 连提示都发不出来：壳侧还有一条系统 Toast 兜着 */ }
  };
})();

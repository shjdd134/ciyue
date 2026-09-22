package cn.wordlens.reader;

import android.app.Activity;
import android.content.pm.ApplicationInfo;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowInsets;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.FrameLayout;
import android.widget.TextView;

import java.io.File;
import java.io.FileOutputStream;
import java.util.Date;

/**
 * 词阅 WordLens 的 Android 外壳。
 *
 * <p>结构是「一个 WebView + 四个 JS 接口」，刻意不带任何 androidx / 第三方依赖：
 * <ul>
 *   <li>{@code NativeTts} → {@link TtsBridge}（WebView 没有 speechSynthesis 合成侧）</li>
 *   <li>{@code UserState} → {@link UserStateStore}（localStorage 之外的第二份用户数据）</li>
 *   <li>{@code SystemBars} → 本类的内部类（系统栏图标明暗 / 颜色跟随站内主题）</li>
 *   <li>页面本体走 {@link AssetServer} 提供的 https 假源</li>
 * </ul>
 * 网页本体（index.html / app.js / styles.css / 数据与图片）在构建时按白名单拷进 assets，
 * 全部来自安装包，**断网可完整使用**。
 */
public class MainActivity extends Activity {

    private FrameLayout root;
    private WebView web;
    private TtsBridge tts;
    private UserStateStore store;
    private final Bars bars = new Bars();
    private boolean barsDark = false;
    private int lastTop = -1, lastBottom = -1;
    private boolean backRegistered = false;

    /* ---------- 诊断：白屏时唯一会说话的东西 ----------
     * 为什么必须画在**原生 View** 上，而不是注入一段 JS 去显示：
     * 要报的场景之一恰恰是「网页脚本根本没跑」—— 那时注入的代码也不会跑。
     * WebView 里白得一片，而 Java 侧还能往屏幕上放东西。 */
    private TextView diagView;
    private boolean diagShown = false;
    private boolean pageLoaded = false;
    private final Handler ui = new Handler(Looper.getMainLooper());

    private final AssetServer.Diag diag = new AssetServer.Diag() {
        @Override
        public void fail(String title, String detail) {
            showDiag(title, detail);
        }

        @Override
        public void pageDone(int intercepted) {
            pageLoaded = true;
            if (intercepted == 0) {
                /* 页面「加载完成」了，却没有一次从安装包里取字节。正常路径下 serve()
                   至少会被主文档调用一次，所以这条命中就说明加载走的不是我们以为的那条路。 */
                showDiag("页面没有从安装包读取",
                        "shouldInterceptRequest 一次都没命中 —— 页面的字节不是来自 assets。");
                return;
            }
            /* 页面字节到了，不代表界面建出来了：整个 <body> 是 app.js 建的。
               交给页面自己去报会更准（它知道栈），但页面脚本也可能根本没跑起来，
               所以这里再独立问一次。 */
            ui.postDelayed(MainActivity.this::checkRendered, 1500);
        }
    };

    private void showDiag(String title, String detail) {
        if (diagShown || diagView == null) return;
        diagShown = true;
        diagView.setText("⚠ 词阅 · 壳诊断\n" + title + "\n" + detail);
        diagView.setVisibility(View.VISIBLE);
        /* 同时落一份到应用私有目录：屏幕上可能显示不全（比如被系统栏挡住一行），
           而且用户截图发过来之前先把证据留下。用追加，保留多次启动的记录。 */
        try {
            FileOutputStream o = new FileOutputStream(new File(getFilesDir(), "shell-diag.txt"), true);
            o.write(("[" + new Date() + "] " + title + " | " + detail.replace('\n', ' ') + "\n")
                    .getBytes("UTF-8"));
            o.close();
        } catch (Throwable ignored) { }
    }

    /** 页面加载完成后问它一句：界面到底建出来没有。判据是 .phone —— app.js 渲染的第一个元素。 */
    private void checkRendered() {
        if (web == null || diagShown) return;
        try {
            web.evaluateJavascript(
                    "(document.querySelector('.phone') ? (window.__wlDiagReported ? 'DIAG' : 'OK')"
                            + " : (window.WORDLENS_NATIVE ? 'NOPHONE' : 'NOGLUE'))",
                    v -> {
                        String s = v == null ? "" : v.replace("\"", "").trim();
                        if ("OK".equals(s) || "DIAG".equals(s)) return;   // 正常 / 页面自己已经报过
                        showDiag("页面脚本没有执行",
                                ("NOGLUE".equals(s)
                                        ? "壳胶水都没跑起来（window.WORDLENS_NATIVE 没设上）——"
                                        + "index.html 可能不是安装包里的那一份。"
                                        : "脚本执行了，但界面没被建出来（没有 .phone 元素）。")
                                        + "\n页面上若有红色文字，那里是脚本自己给的原因。");
                    });
        } catch (Throwable ignored) { }
    }

    @Override
    protected void onCreate(Bundle saved) {
        super.onCreate(saved);

        /* API 30+ 才做 edge-to-edge：真实系统栏高度由上方的 onApplyWindowInsets 量出来、
           回填给 CSS 变量（--safe-t / --safe-b）。
           30 以下不做 —— 那一档没有 WindowInsets.Type，也分不清「底部这个 inset 是导航栏
           还是键盘」，硬做只会把底栏顶到奇怪的位置。让系统照常让位（配 manifest 的
           adjustResize）反而更稳。代价只是老机型没有「内容铺到系统栏底下」的观感。 */
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            getWindow().setDecorFitsSystemWindows(false);
        }

        root = new FrameLayout(this);
        web = new WebView(this);
        root.addView(web, new FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));

        /* ★ 诊断层在 WebView **之后**加入 root —— FrameLayout 按添加顺序叠放，后加的在上面。
           它必须能盖住 WebView，因为要报的恰恰是「WebView 里什么都没有」。
           平时 GONE，只有加载真失败才出现；点一下可收起，长按可复制。 */
        diagView = new TextView(this);
        diagView.setVisibility(View.GONE);
        diagView.setTextColor(0xFFFFFFFF);
        diagView.setTextSize(13);
        diagView.setBackgroundColor(0xF01A1A1A);
        int dp = Math.round(14 * getResources().getDisplayMetrics().density);
        diagView.setPadding(dp, dp, dp, dp);
        diagView.setTextIsSelectable(true);
        diagView.setClickable(true);
        diagView.setOnClickListener(v -> v.setVisibility(View.GONE));
        root.addView(diagView, new FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT,
                Gravity.TOP));

        setContentView(root);

        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        /* ★ localStorage 必须开。用户的续读位置 / 生词本 / 阅读时长全在这里，
           不开的话页面能正常打开、但每次重启都从零开始，而且**不报任何错**。 */
        s.setDomStorageEnabled(true);
        s.setDatabaseEnabled(true);
        /* 页面只从安装包里出，不需要任何文件/内容访问能力 —— 关掉是白送的攻击面收敛。 */
        s.setAllowFileAccess(false);
        s.setAllowContentAccess(false);
        s.setSupportZoom(false);
        s.setBuiltInZoomControls(false);
        /* 不跟随系统字体缩放：站内字号自己有三档（「我的 → 阅读字号」），
           再乘一层系统缩放会让那三档失去意义（用户选「小」却还是很大）。 */
        s.setTextZoom(100);
        s.setUseWideViewPort(true);
        s.setLoadWithOverviewMode(false);
        s.setMediaPlaybackRequiresUserGesture(true);
        s.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        s.setCacheMode(WebSettings.LOAD_DEFAULT);
        s.setJavaScriptCanOpenWindowsAutomatically(false);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            /* 页面永远不导航到远端地址（外链由 shouldOverrideUrlLoading 交给系统浏览器），
               Safe Browsing 在这套结构里无事可做，留着只会让 WebView 往外发请求。 */
            s.setSafeBrowsingEnabled(false);
        }

        web.setBackgroundColor(Color.parseColor("#F7F8FC"));   // 与 CSS 的 --bg 浅色档一致，避免启动白闪
        web.setOverScrollMode(View.OVER_SCROLL_NEVER);
        web.setWebViewClient(new AssetServer(this, diag));
        web.setWebChromeClient(new WebChromeClient());

        if ((getApplicationInfo().flags & ApplicationInfo.FLAG_DEBUGGABLE) != 0) {
            WebView.setWebContentsDebuggingEnabled(true);
        }

        store = new UserStateStore(this);
        tts = new TtsBridge(this, web);
        web.addJavascriptInterface(tts, "NativeTts");
        web.addJavascriptInterface(store, "UserState");
        web.addJavascriptInterface(bars, "SystemBars");

        root.setOnApplyWindowInsetsListener(this::onInsets);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            Api33.register(this, this::onShellBack);
            backRegistered = true;
        }

        /* 每次冷启动都重新加载 index.html，不 restoreState：
           跨进程死亡恢复出的 history 与 app.js 内存里的 navStack 是对不上的，
           那时按返回键会出现「退了一层却落在不相干的页面」。
           而用户真正在意的续读位置由 app.js 自己从 readPos/锚点恢复，与 history 无关。 */
        web.loadUrl(AssetServer.BASE + "index.html");

        /* 超时兜底。为什么不能只靠 onReceivedError：页面「成功」加载了一份空白文档时
           它不会被触发，而屏幕上同样是白的。正常几百毫秒就该 onPageFinished。 */
        ui.postDelayed(() -> {
            if (!pageLoaded && !diagShown) {
                showDiag("页面加载超时",
                        "10 秒仍未完成，也没有收到加载错误。\n" + AssetServer.BASE + "index.html");
            }
        }, 10000);
    }

    /** API 32 及以下的返回键入口。API 33+ 走 OnBackInvokedCallback（manifest 里
        enableOnBackInvokedCallback=true），那时这个回调**不会**被调用 ——
        两条路都得实现，只留一条会在某个版本区间上直接失效。 */
    @Override
    @SuppressWarnings("deprecation")
    public void onBackPressed() {
        onShellBack();
    }

    private void onShellBack() {
        if (web == null) { finish(); return; }
        /* 先问网页：它只负责一件事 —— 有浮层（.sheet-mask）就把浮层关掉。
           导航层不用问：app.js 的应用内栈与 history 是对齐的，webView.goBack() 就等于
           按了浏览器后退键，popstate 会走 navBack(true)。 */
        web.evaluateJavascript(
                "(window.__wlNativeBack && window.__wlNativeBack() === true) ? 'handled' : 'pass'",
                value -> {
                    if (value != null && value.contains("handled")) return;
                    if (web.canGoBack()) web.goBack();
                    else finish();
                });
    }

    @Override
    protected void onPause() {
        super.onPause();
        if (web == null) return;
        /* ★ 这一步是壳里最关键的一次落盘。用户在阅读页直接按 home / 锁屏，
           是移动端最高频的离开方式，而这一刻不结算的话，这段阅读时长与续读位置
           就永远没了。不赌 visibilitychange 会不会派发 —— 显式调网页侧的入口。 */
        try { web.evaluateJavascript("window.__wlNativePause&&window.__wlNativePause()", null); } catch (Throwable ignored) { }
        try { web.onPause(); } catch (Throwable ignored) { }
    }

    @Override
    protected void onResume() {
        super.onResume();
        try { web.onResume(); } catch (Throwable ignored) { }
        /* 回到前台把没写完的镜像补上（上一轮 saveState 是异步落盘的） */
        if (store != null) store.flush();
    }

    @Override
    protected void onStop() {
        super.onStop();
        /* 第二次机会：onPause 的异步写如果还没落盘，这里同步等它写完再走。 */
        if (store != null) store.flush();
    }

    @Override
    protected void onDestroy() {
        if (backRegistered && Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            getOnBackInvokedDispatcher().unregisterOnBackInvokedCallback(this::onShellBack);
        }
        if (tts != null) tts.shutdown();
        if (web != null) {
            try { web.destroy(); } catch (Throwable ignored) { }
            web = null;
        }
        super.onDestroy();
    }

    private WindowInsets onInsets(View v, WindowInsets ins) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            int[] m = Api30.measure(ins);
            /* 键盘弹出时把 WebView 整体抬高：edge-to-edge 下 adjustResize 已经不起作用，
               不让位的话搜索框会被键盘整个盖住。 */
            root.setPadding(0, 0, 0, m[2]);
            float d = getResources().getDisplayMetrics().density;
            pushInsets(Math.round(m[0] / d), Math.round(m[1] / d));
        }
        return ins;
    }

    /** 把真实系统栏高度写成 CSS 变量的**换算**在这里：inset 是物理像素，CSS 变量要的是
        CSS 像素，比值就是 displayMetrics.density（viewport 是 initial-scale=1）。 */
    private void pushInsets(int top, int bottom) {
        if (top == lastTop && bottom == lastBottom) return;
        lastTop = top;
        lastBottom = bottom;
        if (web == null) return;
        try {
            web.evaluateJavascript("window.__wlInsets&&window.__wlInsets(" + top + "," + bottom + ")", null);
        } catch (Throwable ignored) { }
    }

    /** 系统栏外观 —— {@code window.SystemBars}，由 mobile/shell-glue.js 在主题变化时调用。 */
    private final class Bars {
        @JavascriptInterface
        public void setDark(final boolean dark) {
            runOnUiThread(() -> applyBars(dark));
        }

        @JavascriptInterface
        public boolean isDark() {
            return barsDark;
        }
    }

    private void applyBars(boolean dark) {
        barsDark = dark;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            Api30.applyBars(this, dark);
        } else {
            int flags = getWindow().getDecorView().getSystemUiVisibility();
            if (dark) flags &= ~View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR;
            else flags |= View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                if (dark) flags &= ~View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR;
                else flags |= View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR;
            }
            getWindow().getDecorView().setSystemUiVisibility(flags);
            /* 30 以下不是 edge-to-edge，系统栏是实色的，颜色得自己跟着主题换
               （这两个值必须与 assets/styles.css 的 --bg 一致，见 res/values/colors.xml 的注释）。 */
            int bg = Color.parseColor(dark ? "#12121C" : "#F7F8FC");
            getWindow().setStatusBarColor(bg);
            getWindow().setNavigationBarColor(bg);
        }
    }

    /**
     * API 33+ 的预测式返回注册。
     *
     * <p>回调实例必须**存下来**：registerOnBackInvokedCallback / unregisterOnBackInvokedCallback
     * 是按对象身份配对的，两处各写一次 `this::onShellBack` 会得到两个不同的 lambda 实例，
     * 注销时匹配不上（在部分实现上直接抛 IllegalArgumentException）。
     *
     * <p>与 Api30 同样的道理：整类只在这个 SDK 区间才会被加载。
     */
    private static final class Api33 {
        private static android.window.OnBackInvokedCallback cb;

        static void register(Activity act, Runnable body) {
            cb = body::run;
            act.getOnBackInvokedDispatcher().registerOnBackInvokedCallback(
                    android.window.OnBackInvokedDispatcher.PRIORITY_DEFAULT, cb);
        }

        static void unregister(Activity act) {
            if (cb == null) return;
            act.getOnBackInvokedDispatcher().unregisterOnBackInvokedCallback(cb);
            cb = null;
        }
    }

    /**
     * API 30+ 专有的 WindowInsets / WindowInsetsController 调用。
     *
     * <p>单独放一个内部类是有意的：这样 minSdk（26）低于这些 API 时，老设备上
     * ART 只会在**首次用到这个类**时才去校验它引用的 android.graphics.Insets /
     * WindowInsets.Type —— 而上面每一处调用都被 SDK_INT 判断挡在外面，所以永远不会被用到。
     * 直接写在 MainActivity 里的话，整类的校验会连带把这些新类型一起拉进来。
     */
    private static final class Api30 {
        /** 返回 [状态栏高度, 导航栏高度, 键盘高度]，单位是物理像素。 */
        static int[] measure(WindowInsets ins) {
            android.graphics.Insets sys = ins.getInsets(WindowInsets.Type.systemBars());
            int ime = ins.getInsets(WindowInsets.Type.ime()).bottom;
            return new int[]{ sys.top, sys.bottom, ime };
        }

        static void applyBars(Activity act, boolean dark) {
            android.view.WindowInsetsController c = act.getWindow().getInsetsController();
            if (c == null) return;
            int light = android.view.WindowInsetsController.APPEARANCE_LIGHT_STATUS_BARS
                    | android.view.WindowInsetsController.APPEARANCE_LIGHT_NAVIGATION_BARS;
            c.setSystemBarsAppearance(dark ? 0 : light, light);
        }
    }
}

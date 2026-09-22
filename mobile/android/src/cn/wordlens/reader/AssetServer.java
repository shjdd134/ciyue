package cn.wordlens.reader;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

/**
 * 把安装包里的 www/ 当成一个 https 站点提供。
 *
 * <p>为什么不直接 loadUrl("file:///android_asset/www/index.html")：file:// 在 WebView 里
 * 是个二等公民 —— localStorage 归属畸零、同源策略行为与线上不一致、history.pushState
 * 直接不可用。而 app.js 的 {@code histOk} 第一件事就是检查
 * {@code location.protocol !== "file:"}，命中 file:// 会让整块「应用内导航栈 + 返回键」
 * 退化成不工作。走一个真 https 源，网页侧一行都不用改。
 *
 * <p>域名用 {@code appassets.wordlens.invalid} 而不是 WebViewAssetLoader 常用的
 * {@code appassets.androidplatform.net}：{@code .invalid} 是 RFC 2606 保留、永不解析的
 * 顶级域。万一本类的拦截因为某个版本差异没被调用，请求也只会原地失败，
 * 不可能真的发出去访问一个别人的域名。
 *
 * <p><b>本类同时是「加载层」的报错出口。</b>白屏有两种，本类负责前一种：
 * <ul>
 *   <li>页面根本没到（本类报）—— 由 {@link Diag} 转给 MainActivity 画在屏幕上；</li>
 *   <li>页面到了但脚本没跑起来（shell-glue.js 第 6 节报）—— 那时本类的代码也没机会说话。</li>
 * </ul>
 * 之所以两边都要有：白屏时 Java 侧还能显示原生 View，而页面脚本能提供栈与 UA。
 */
public class AssetServer extends WebViewClient {

    static final String HOST = "appassets.wordlens.invalid";
    static final String BASE = "https://" + HOST + "/";

    /** 加载层的报错出口。实现见 MainActivity —— 它把话说在屏幕上，也落一份到 filesDir。 */
    interface Diag {
        void fail(String title, String detail);

        /** 页面加载结束。intercepted 为 0 表示**一次都没拦到** —— 见下面 onPageFinished。 */
        void pageDone(int intercepted);
    }

    private final Context ctx;
    private final Diag diag;
    private int intercepted = 0;
    private boolean mainFailed = false;

    AssetServer(Context c, Diag d) {
        ctx = c;
        diag = d;
    }

    @Override
    public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest req) {
        return serve(req == null ? null : req.getUrl());
    }

    /* API 20 的旧签名。在 21+ 上「不被调用」是正常的 —— WebViewClient 的新签名默认实现
       就是转调它，我们覆写了新的，所以只会走上面那条。留着是零成本的兜底：
       历史上确有实现对**主框架导航**只走旧路径。 */
    @SuppressWarnings("deprecation")
    @Override
    public WebResourceResponse shouldInterceptRequest(WebView view, String url) {
        return serve(url == null ? null : Uri.parse(url));
    }

    private WebResourceResponse serve(Uri u) {
        if (u == null || !HOST.equals(u.getHost())) return null;   // 外域一律不插手
        /* getPath() 会丢掉 ?v=79 这类查询串 —— 而缓存键是带查询串的完整 URL，
           所以版本号一变就是新键，天然不会读到旧缓存。这正是想要的行为。 */
        String rel = u.getPath();
        if (rel == null || rel.isEmpty() || "/".equals(rel)) rel = "/index.html";
        if (rel.startsWith("/")) rel = rel.substring(1);
        if (rel.contains("..")) return notFound(rel);
        try {
            InputStream in = ctx.getAssets().open(rel);
            intercepted++;
            return new WebResourceResponse(mimeOf(rel), texty(rel) ? "utf-8" : null,
                    200, "OK", headersFor(rel), in);
        } catch (IOException e) {
            return notFound(rel);
        }
    }

    @Override
    public void onReceivedError(WebView view, WebResourceRequest req, WebResourceError err) {
        if (req == null || !req.isForMainFrame()) return;          // 子资源失败不影响可用性
        mainFailed = true;
        String d = "";
        try { d = err.getErrorCode() + " · " + err.getDescription(); } catch (Throwable ignored) { }
        diag.fail("页面没能加载", d + "\n" + req.getUrl());
    }

    @SuppressWarnings("deprecation")
    @Override
    public void onReceivedError(WebView view, int code, String desc, String url) {
        mainFailed = true;
        diag.fail("页面没能加载", code + " · " + desc + "\n" + url);
    }

    @Override
    public void onReceivedHttpError(WebView view, WebResourceRequest req, WebResourceResponse res) {
        if (req == null || !req.isForMainFrame()) return;
        mainFailed = true;
        String s = res == null ? "?" : res.getStatusCode() + " " + res.getReasonPhrase();
        diag.fail("资源返回了错误状态", s + "\n" + req.getUrl());
    }

    @Override
    public void onPageFinished(WebView view, String url) {
        /* ★ intercepted == 0 是一条极有价值的信号：页面「加载完成」了，但本类的 serve()
           一次都没被调用 —— 说明这个页面的字节不是从安装包来的。要么拦截没生效（请求
           真的发去了网络，而 .invalid 永不解析），要么加载的是别的什么东西。
           这一条比「加载失败」更能定位问题，因为它在失败与成功两种外观下都可能成立。 */
        if (!mainFailed) diag.pageDone(intercepted);
    }

    /** 页面里的外链（原刊地址、GitHub 等）交给系统浏览器，别在壳里开一个没有地址栏的窗口。 */
    @Override
    public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest req) {
        Uri u = req == null ? null : req.getUrl();
        if (u == null) return false;
        if (HOST.equals(u.getHost())) return false;               // 自己人，正常加载
        try {
            Intent i = new Intent(Intent.ACTION_VIEW, u);
            i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            ctx.startActivity(i);
        } catch (Throwable t) {
            /* 没有能处理这个 scheme 的应用（极少见）：吞掉，别让 WebView 弹一句英文报错 */
        }
        return true;
    }

    private static Map<String, String> headersFor(String rel) {
        Map<String, String> h = new HashMap<>();
        /* index.html 没有版本号，缓存住的话「装了新 APK 还跑旧壳」会在排查时极其费解。
           其余资源都带 ?v=，缓存反而让二次打开变快。 */
        h.put("Cache-Control", rel.toLowerCase(Locale.ROOT).endsWith(".html")
                ? "no-store" : "public, max-age=604800");
        return h;
    }

    private static WebResourceResponse notFound(String rel) {
        return new WebResourceResponse("text/plain", "utf-8", 404, "Not Found",
                headersFor(rel), new ByteArrayInputStream(new byte[0]));
    }

    private static String mimeOf(String p) {
        String s = p.toLowerCase(Locale.ROOT);
        if (s.endsWith(".html") || s.endsWith(".htm")) return "text/html";
        if (s.endsWith(".js") || s.endsWith(".mjs")) return "application/javascript";
        if (s.endsWith(".css")) return "text/css";
        if (s.endsWith(".json")) return "application/json";
        if (s.endsWith(".webmanifest")) return "application/manifest+json";
        if (s.endsWith(".svg")) return "image/svg+xml";
        if (s.endsWith(".png")) return "image/png";
        if (s.endsWith(".jpg") || s.endsWith(".jpeg")) return "image/jpeg";
        if (s.endsWith(".webp")) return "image/webp";
        if (s.endsWith(".gif")) return "image/gif";
        if (s.endsWith(".ico")) return "image/x-icon";
        if (s.endsWith(".woff2")) return "font/woff2";
        if (s.endsWith(".woff")) return "font/woff";
        if (s.endsWith(".ttf")) return "font/ttf";
        if (s.endsWith(".txt")) return "text/plain";
        return "application/octet-stream";
    }

    /** 只有文本类才允许带 charset —— 给 png/woff2 传个 "utf-8" 会让解码那一步出岔子。 */
    private static boolean texty(String p) {
        String m = mimeOf(p);
        return m.startsWith("text/") || m.endsWith("javascript") || m.endsWith("json")
                || m.endsWith("svg+xml") || m.endsWith("manifest+json");
    }
}

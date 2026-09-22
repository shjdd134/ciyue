package cn.wordlens.reader;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
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
 */
public class AssetServer extends WebViewClient {

    static final String HOST = "appassets.wordlens.invalid";
    static final String BASE = "https://" + HOST + "/";

    private final Context ctx;

    AssetServer(Context c) {
        ctx = c;
    }

    @Override
    public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest req) {
        Uri u = req == null ? null : req.getUrl();
        if (u == null || !HOST.equals(u.getHost())) return null;   // 外域一律不插手
        /* getPath() 会丢掉 ?v=79 这类查询串 —— 而缓存键是带查询串的完整 URL，
           所以版本号一变就是新键，天然不会读到旧缓存。这正是想要的行为。 */
        String rel = u.getPath();
        if (rel == null || rel.isEmpty() || "/".equals(rel)) rel = "/index.html";
        if (rel.startsWith("/")) rel = rel.substring(1);
        if (rel.contains("..")) return notFound(rel);
        try {
            InputStream in = ctx.getAssets().open(rel);
            return new WebResourceResponse(mimeOf(rel), texty(rel) ? "utf-8" : null,
                    200, "OK", headersFor(rel), in);
        } catch (IOException e) {
            return notFound(rel);
        }
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

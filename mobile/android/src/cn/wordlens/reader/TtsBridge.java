package cn.wordlens.reader;

import android.app.Activity;
import android.os.Handler;
import android.os.Looper;
import android.speech.tts.TextToSpeech;
import android.speech.tts.UtteranceProgressListener;
import android.speech.tts.Voice;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.Locale;
import java.util.Set;

/**
 * 原生 TTS —— {@code window.NativeTts}，给壳里的 speechSynthesis 垫片（mobile/shell-glue.js）用。
 *
 * <p>为什么非得写这个：Android WebView **不实现** Web Speech 的合成侧 ——
 * {@code window.speechSynthesis} 要么不存在、要么 {@code getVoices()} 永远返回空。
 * 站内「朗读」（点词、单句、全文跟读）在壳里会整块不可用，而这恰好是精读类产品
 * 最常用的一条功能。
 *
 * <p>接口只暴露垫片真正会调的四件事，别的一律不加：{@code ready()} /
 * {@code voicesJson()} / {@code speak(text,lang,id,rate)} / {@code cancel()}。
 * 播完与出错通过 {@code window.__wlTtsEnd(id)} / {@code __wlTtsError(id,code)} 回调回 JS ——
 * app.js 的全文朗读队列就是靠 onend 一句句往前推的，这条回调断了等于朗读卡在第一句。
 */
public class TtsBridge {

    private final WebView web;
    private final Handler main = new Handler(Looper.getMainLooper());
    private final TextToSpeech tts;
    private volatile boolean ready = false;
    private volatile String voicesJson = "[]";
    private int voiceRetry = 0;

    public TtsBridge(Activity act, WebView w) {
        web = w;
        TextToSpeech[] box = new TextToSpeech[1];
        box[0] = new TextToSpeech(act, status -> {
            if (status != TextToSpeech.SUCCESS) return;   // 设备没有 TTS 引擎：ready() 保持 false，JS 侧如实提示
            try {
                ready = true;
                box[0].setLanguage(Locale.US);
            } catch (Throwable ignored) { }
            refreshVoices();
        });
        tts = box[0];
        try {
            tts.setOnUtteranceProgressListener(new UtteranceProgressListener() {
                @Override public void onStart(String id) { }
                @Override public void onDone(String id) { fire("__wlTtsEnd", id, null); }
                @Override public void onError(String id) { fire("__wlTtsError", id, "synthesis-failed"); }
                @Override public void onError(String id, int code) {
                    fire("__wlTtsError", id, code == TextToSpeech.ERROR_NETWORK ? "network" : "synthesis-failed");
                }
            });
        } catch (Throwable ignored) { }
    }

    /** 垫片每次读之前都会问一遍（不缓存结论），所以引擎晚一点就绪也能自然生效。 */
    @JavascriptInterface
    public boolean ready() {
        return ready;
    }

    /** 英语语音表，形如 [{name,lang,localService,default}] —— app.js 的 pickVoice 就是读这几个字段。 */
    @JavascriptInterface
    public String voicesJson() {
        return voicesJson;
    }

    @JavascriptInterface
    public boolean speak(String text, String lang, String id, float rate) {
        if (!ready || text == null || text.isEmpty()) return false;
        try {
            if (!applyLanguage(parseLocale(lang))) {
                /* 一个英语语音都设不上：宁可如实失败，也不能拿中文声把英文念出来。
                   app.js 的 onerror 会把「朗读失败 · 系统可能没有这个口音的语音包」显示给用户。 */
                return false;
            }
            tts.setSpeechRate(clampRate(rate));
            return tts.speak(text, TextToSpeech.QUEUE_FLUSH, null, safeId(id)) == TextToSpeech.SUCCESS;
        } catch (Throwable t) {
            return false;
        }
    }

    @JavascriptInterface
    public void cancel() {
        try { tts.stop(); } catch (Throwable ignored) { }
    }

    void shutdown() {
        try { tts.stop(); } catch (Throwable ignored) { }
        try { tts.shutdown(); } catch (Throwable ignored) { }
    }

    private void refreshVoices() {
        if (!ready) return;
        JSONArray arr = new JSONArray();
        boolean english = false;
        try {
            Set<Voice> vs = tts.getVoices();
            if (vs != null) {
                for (Voice v : vs) {
                    if (v == null) continue;
                    Locale l = v.getLocale();
                    if (l == null || !"en".equalsIgnoreCase(l.getLanguage())) continue;   // 非英语一律不进表
                    english = true;
                    JSONObject o = new JSONObject();
                    o.put("name", String.valueOf(v.getName()));
                    o.put("lang", tag(l));
                    Boolean needsNet = v.isNetworkConnectionRequired();
                    o.put("localService", !(needsNet != null && needsNet));
                    o.put("default", false);
                    arr.put(o);
                }
            }
        } catch (Throwable ignored) { }
        voicesJson = arr.toString();
        /* onInit 那一刻语音表常常还是空的（引擎在后台加载）——空一次不算数，退避重试几次。
           不重试的后果很具体：用户点「朗读」看到「未找到英文语音包」，
           而实际上再等半秒就有。 */
        if (!english && voiceRetry < 6) {
            voiceRetry++;
            main.postDelayed(this::refreshVoices, 300L * voiceRetry);
        }
    }

    private boolean applyLanguage(Locale want) {
        int r = tts.setLanguage(want);
        if (r != TextToSpeech.LANG_MISSING_DATA && r != TextToSpeech.LANG_NOT_SUPPORTED) return true;
        if (Locale.US.equals(want)) return false;
        int r2 = tts.setLanguage(Locale.US);       // 用户选的英音系统没装 → 退回美音再试
        return r2 != TextToSpeech.LANG_MISSING_DATA && r2 != TextToSpeech.LANG_NOT_SUPPORTED;
    }

    private static Locale parseLocale(String s) {
        if (s == null || s.isEmpty()) return Locale.US;
        try {
            Locale l = Locale.forLanguageTag(s.replace('_', '-'));
            return (l == null || l.getLanguage() == null || l.getLanguage().isEmpty()) ? Locale.US : l;
        } catch (Throwable t) {
            return Locale.US;
        }
    }

    private static String tag(Locale l) {
        String t = null;
        try { t = l.toLanguageTag(); } catch (Throwable ignored) { }
        if (t == null || t.isEmpty() || "und".equals(t)) {
            String lang = l.getLanguage() == null ? "en" : l.getLanguage();
            String country = l.getCountry() == null ? "" : l.getCountry();
            t = country.isEmpty() ? lang : lang + "-" + country;
        }
        return t.replace('_', '-');
    }

    /* app.js 送过来的是 RATE_MAP 里的 0.5–1.05；Android 的 1.0 才是原速，量纲不同，
       所以这里只做「别越界」的夹取，不做换算 —— 换算会把这套已经调准的语速改坏。 */
    private static float clampRate(float r) {
        if (Float.isNaN(r)) return 1f;
        return Math.max(0.4f, Math.min(1.6f, r));
    }

    /** id 由垫片生成（wl1 / wl2 …），这里再洗一遍是为了杜绝把它拼进 JS 字符串时的注入面。 */
    private static String safeId(String id) {
        if (id == null) return "";
        StringBuilder b = new StringBuilder(id.length());
        for (int i = 0; i < id.length(); i++) {
            char c = id.charAt(i);
            if ((c >= '0' && c <= '9') || (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c == '_') b.append(c);
        }
        return b.toString();
    }

    private void fire(String fn, String id, String code) {
        final String js = code == null
                ? "window." + fn + "&&window." + fn + "('" + safeId(id) + "')"
                : "window." + fn + "&&window." + fn + "('" + safeId(id) + "','" + code + "')";
        main.post(() -> {
            try { web.evaluateJavascript(js, null); } catch (Throwable ignored) { }
        });
    }
}

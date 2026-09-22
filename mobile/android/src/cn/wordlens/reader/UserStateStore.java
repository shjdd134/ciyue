package cn.wordlens.reader;

import android.content.Context;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.ByteArrayOutputStream;

import android.webkit.JavascriptInterface;

/**
 * 用户数据的壳侧镜像 —— {@code window.UserState}。
 *
 * <p>为什么需要（这是整个壳里最要紧的一个类）：正文与词库都在安装包里，安装包不会坏；
 * 唯一会丢的是用户数据，而它只活在 WebView 的 localStorage 里 ——
 * 系统「清除数据」、WebView 存储被回收、厂商省电策略清缓存，那一整块都是无前兆消失的。
 * app.js 的 {@code save()} 每档成功后都会调 {@code saveState()}，把同一份 JSON 落到
 * 应用私有目录；下次启动若 localStorage 为空，就从这里读回来。
 *
 * <p>写盘做三件事：
 * <ol>
 *   <li><b>合并</b>：JS 侧可能一秒内调好几次，用「只保留最新一份」的队列压成一次写；</li>
 *   <li><b>原子</b>：先写 user-state.json.tmp、fsync、再改名 —— 直接覆写的话，
 *       恰好在写到一半被杀就会得到一个半截 JSON，比没有还糟（回落时会解析失败）；</li>
 *   <li><b>不阻塞 UI</b>：JS 调进来这条线程是 WebView 的 JavaBridge 线程，
 *       写盘丢给单线程 executor。</li>
 * </ol>
 */
public class UserStateStore {

    /** 与 backup_rules.xml / data_extraction_rules.xml 里那条 include 必须一致。 */
    static final String FILE_NAME = "user-state.json";
    /** 上限兜底：正常状态只有几十 KB。超过它只可能是调用方出了问题，与其写爆磁盘不如拒绝。 */
    private static final int MAX_BYTES = 4 * 1024 * 1024;

    private final File file;
    private final File tmp;
    private final Object lock = new Object();
    private String pending;
    private boolean draining;

    public UserStateStore(Context ctx) {
        file = new File(ctx.getFilesDir(), FILE_NAME);
        tmp = new File(ctx.getFilesDir(), FILE_NAME + ".tmp");
    }

    /** JS 侧每次落盘都会调这里。绝不抛：壳写失败不该影响网页的任何行为。 */
    @JavascriptInterface
    public void saveState(String json) {
        if (json == null || json.isEmpty()) return;
        if (json.length() > MAX_BYTES) return;
        synchronized (lock) {
            pending = json;
            if (draining) return;      // 已经有一轮在写，它会把最新的那份一起带走
            draining = true;
        }
        Thread t = new Thread(this::drain, "wl-user-state");
        t.setDaemon(true);
        t.start();
    }

    /** 启动回落用。文件不存在 / 读不出来一律返回空串 —— 由 JS 侧决定怎么处理。 */
    @JavascriptInterface
    public String loadState() {
        if (!file.exists()) return "";
        InputStream in = null;
        try {
            in = new FileInputStream(file);
            ByteArrayOutputStream out = new ByteArrayOutputStream((int) Math.min(file.length(), MAX_BYTES));
            byte[] buf = new byte[16384];
            int n;
            while ((n = in.read(buf)) > 0) out.write(buf, 0, n);
            return new String(out.toByteArray(), "UTF-8");
        } catch (Throwable t) {
            return "";
        } finally {
            closeQuietly(in);
        }
    }

    /** 写出还没落盘的最后一份（Activity.onStop 用）。同步执行，返回时保证已写完。 */
    void flush() {
        drain();
    }

    private void drain() {
        while (true) {
            String cur;
            synchronized (lock) {
                cur = pending;
                pending = null;
                if (cur == null) { draining = false; return; }
            }
            writeAtomic(cur);
        }
    }

    private void writeAtomic(String json) {
        OutputStream out = null;
        try {
            out = new FileOutputStream(tmp, false);
            out.write(json.getBytes("UTF-8"));
            out.flush();
            /* 必须 fsync：不等它，「写完了」只是写进了内核页缓存，
               紧接着断电/强杀就还是半截文件。 */
            try { ((FileOutputStream) out).getFD().sync(); } catch (Throwable ignored) { }
            closeQuietly(out);
            out = null;
            if (!tmp.renameTo(file)) {
                /* Windows/部分实现下 renameTo 不能覆盖已存在的目标，先删再试一次。
                   （Android 的 ext4/f2fs 上第一次就会成功，这行是给别的文件系统留的） */
                if (file.exists() && !file.delete()) return;
                if (!tmp.renameTo(file)) tmp.delete();
            }
        } catch (Throwable t) {
            closeQuietly(out);
            tmp.delete();
        } finally {
            closeQuietly(out);
        }
    }

    private static void closeQuietly(java.io.Closeable c) {
        if (c == null) return;
        try { c.close(); } catch (Throwable ignored) { }
    }
}

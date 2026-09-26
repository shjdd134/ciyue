/* Local English OCR for vocabulary documents. No file contents leave the browser.
 * The PDF importer owns rendering/page limits; this module owns one OCR worker.
 * Vendor versions and notices live in vendor/tesseract/README.md. */
const vendorUrl = name => new URL(`vendor/tesseract/${name}`, import.meta.url).href;
let libraryPromise;

function abortError() {
  const error = new Error("已取消文档识别");
  error.name = "AbortError";
  return error;
}

function loadLibrary() {
  if (globalThis.Tesseract && typeof globalThis.Tesseract.createWorker === "function") {
    return Promise.resolve(globalThis.Tesseract);
  }
  if (!libraryPromise) {
    libraryPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      const timer = setTimeout(() => finish(new Error("英语识别组件加载超时，请重试")), 45000);
      function finish(error) {
        clearTimeout(timer);
        script.onload = script.onerror = null;
        if (error) { script.remove(); reject(error); }
        else resolve(globalThis.Tesseract);
      }
      script.src = vendorUrl("tesseract.min.js");
      script.async = true;
      script.onload = () => finish(globalThis.Tesseract && typeof globalThis.Tesseract.createWorker === "function"
        ? null : new Error("英语识别组件未正确加载，请重试"));
      script.onerror = () => finish(new Error("英语识别组件加载失败，请联网打开一次后重试"));
      document.head.appendChild(script);
    }).catch(error => { libraryPromise = null; throw error; });
  }
  return libraryPromise;
}

/**
 * @param {{signal?: AbortSignal, onProgress?: Function}} options
 * @returns {Promise<{recognize: Function, terminate: Function}>}
 * A session processes pages sequentially. Cancelling either signal closes it.
 */
export async function createEnglishOcr({ signal, onProgress } = {}) {
  if (signal && signal.aborted) throw abortError();
  let worker = null, closed = false, busy = false, termination = null;
  let pageNumber, totalPages;
  let rejectStopped;
  const stopped = new Promise((_, reject) => { rejectStopped = reject; });
  // Explicit terminate() may be called while no operation is awaiting the gate.
  stopped.catch(() => {});

  function terminateWorker() {
    if (worker && !termination) {
      // Tesseract terminate() does not settle pending recognize promises. The
      // stopped gate above lets the caller finish immediately in that case.
      termination = Promise.resolve().then(() => worker.terminate()).catch(() => {});
    }
    return termination || Promise.resolve();
  }
  function stop(error = abortError()) {
    if (!closed) {
      closed = true;
      if (signal) signal.removeEventListener("abort", cancel);
      rejectStopped(error);
    }
    return terminateWorker();
  }
  function cancel() { void stop(); }
  function progress(message) {
    if (closed || typeof onProgress !== "function") return;
    const value = Number(message.progress);
    try {
      onProgress({
        stage: "ocr", status: String(message.status || ""),
        progress: Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : 0,
        pageNumber, totalPages
      });
    } catch (_) { /* A display callback must not strand an OCR worker. */ }
  }
  function libraryError(error) {
    void stop(error instanceof Error ? error : new Error(String(error || "英语识别失败")));
  }
  if (signal) signal.addEventListener("abort", cancel, { once: true });
  if (signal && signal.aborted) cancel();

  try {
    const api = await Promise.race([loadLibrary(), stopped]);
    if (closed) throw abortError();
    // Absolute same-origin URLs are supplied for every normally CDN-backed
    // resource. LSTM-only core selection still adapts to each device's SIMD.
    const initializing = Promise.resolve(api.createWorker("eng", 1, {
      workerPath: vendorUrl("worker.min.js"),
      corePath: vendorUrl(""),
      langPath: vendorUrl("").replace(/\/$/, ""),
      workerBlobURL: false,
      gzip: true,
      legacyCore: false,
      legacyLang: false,
      cachePath: "wordlens-eng-fast-7d4322bd",
      logger: progress,
      errorHandler: libraryError
    })).then(async created => {
      worker = created;
      // The upstream API returns its handle only after initialization. If the
      // user cancelled meanwhile, clean it up as soon as it becomes available.
      if (closed) await terminateWorker();
      return created;
    });
    await Promise.race([initializing, stopped]);
    if (closed) throw abortError();
  } catch (error) {
    await stop(error);
    throw error;
  }

  return {
    async recognize(canvas, { pageNumber: page, totalPages: total, signal: pageSignal } = {}) {
      if (closed || (signal && signal.aborted) || (pageSignal && pageSignal.aborted)) {
        await stop();
        throw abortError();
      }
      if (busy) throw new Error("请等待当前页识别完成");
      if (!canvas || !(canvas.width > 0) || !(canvas.height > 0)) throw new Error("页面图像为空，无法识别");
      busy = true;
      pageNumber = page;
      totalPages = total;
      if (pageSignal) pageSignal.addEventListener("abort", cancel, { once: true });
      if (pageSignal && pageSignal.aborted) cancel();
      try {
        if (closed) throw abortError();
        const result = await Promise.race([
          worker.recognize(canvas, {}, { text: true }), stopped
        ]);
        if (closed) throw abortError();
        return String(result && result.data && result.data.text || "");
      } catch (error) {
        await stop(error);
        throw error;
      } finally {
        busy = false;
        if (pageSignal) pageSignal.removeEventListener("abort", cancel);
        pageNumber = totalPages = undefined;
      }
    },
    terminate: () => stop()
  };
}

/* Local PDF text extraction. PDF content is never uploaded or run as script. */
const MAX_PAGES = 100;
const MAX_CHARS = 2_000_000;
const MAX_OCR_PAGES = 20;
const MAX_RENDER_PIXELS = 4_000_000;
// Allow ordinary 300-dpi scans (~9 MP); output OCR canvases remain <= 4 MP.
const MAX_IMAGE_PIXELS = 25_000_000;
const MAX_RENDER_SIDE = 3000;
let pdfjsPromise;

function importError(code, message) {
  const error = new Error(message);
  error.code = code;
  return error;
}

function abortError() {
  return new DOMException("已取消 PDF 识别", "AbortError");
}

function checkAbort(signal) {
  if (signal?.aborted) throw abortError();
}

function localResource(path) {
  const url = new URL(`./vendor/pdfjs/${path}`, import.meta.url);
  // PDF.js's Node test adapter reads filesystem paths; browsers use same-origin URLs.
  // file: pathname keeps a leading "/D:/..." on Windows, which fs cannot open —
  // strip the slash before the drive letter (POSIX paths keep theirs).
  return url.protocol === "file:" && typeof process !== "undefined" && process.versions?.node
    ? decodeURIComponent(url.pathname).replace(/^\/(?=[A-Za-z]:\/)/, "") : url.href;
}

async function pdfLibrary() {
  if (!pdfjsPromise) {
    pdfjsPromise = import("./vendor/pdfjs/pdf.min.mjs").then(pdfjs => {
      pdfjs.GlobalWorkerOptions.workerSrc = new URL("./vendor/pdfjs/pdf.worker.min.mjs", import.meta.url).href;
      return pdfjs;
    }).catch(error => {
      pdfjsPromise = null;
      throw importError("PDF_ENGINE_LOAD", "PDF 识别组件未能加载，请联网打开一次导入页面后重试。");
    });
  }
  return pdfjsPromise;
}

/** Preserve line boundaries and join adjacent PDF glyph fragments into real words. */
export function pdfTextFromItems(items, maxChars = MAX_CHARS) {
  const chunks = [];
  let length = 0, previous = null, last = "";
  const append = value => {
    if (!value) return;
    length += value.length;
    if (length > maxChars) throw importError("PDF_TEXT_LIMIT", "PDF 文字过多，请拆分成较小的文件后导入。");
    chunks.push(value);
    last = value.slice(-1);
  };
  for (const item of items || []) {
    if (typeof item.str !== "string") continue;
    const value = item.str.replace(/\u0000/g, "");
    const transform = item.transform;
    if (value && previous && last && !/\s/.test(last) && !/^\s/.test(value)) {
      const before = previous.transform;
      if (before?.length >= 6 && transform?.length >= 6) {
        const size = Math.max(1, Math.hypot(before[0], before[1]), Math.hypot(transform[0], transform[1]));
        const magnitude = Math.hypot(before[0], before[1]) || 1;
        const ux = before[0] / magnitude, uy = before[1] / magnitude;
        const dx = transform[4] - before[4], dy = transform[5] - before[5];
        const baselineGap = Math.abs(-dx * uy + dy * ux);
        const along = dx * ux + dy * uy;
        const gap = along - (Number(previous.width) || 0);
        if (baselineGap > size * .55 || along < -size) append("\n");
        else if (gap > size * 3) append("\t");
        else if (gap > size * .14) append(" ");
      } else append(" ");
    }
    append(value);
    if (item.hasEOL && last !== "\n") append("\n");
    if (value) previous = item;
  }
  return chunks.join("").replace(/[\t ]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}

function makeCanvas(width, height) {
  let canvas;
  if (typeof document !== "undefined") canvas = document.createElement("canvas");
  else if (typeof OffscreenCanvas !== "undefined") canvas = new OffscreenCanvas(width, height);
  else throw importError("PDF_CANVAS", "此浏览器暂不支持扫描页识别，请换用新版浏览器。");
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

/**
 * Returns scannedPages as a 1-based page-number array. OCR is opt-in and runs
 * sequentially only for pages without a usable text layer. onOcrPage returns
 * either text or { text }; its temporary canvas must not be retained.
 */
export async function extractPdf(arrayBuffer, { signal, onProgress, ocr = false, onOcrPage } = {}) {
  checkAbort(signal);
  if (!(arrayBuffer instanceof ArrayBuffer) && !ArrayBuffer.isView(arrayBuffer)) {
    throw importError("PDF_INPUT", "无法读取 PDF 文件，请重新选择文件。");
  }
  if (ocr && typeof onOcrPage !== "function") throw importError("PDF_OCR_UNAVAILABLE", "扫描页识别组件尚未就绪，请稍后重试。");
  const source = arrayBuffer instanceof ArrayBuffer
    ? new Uint8Array(arrayBuffer) : new Uint8Array(arrayBuffer.buffer, arrayBuffer.byteOffset, arrayBuffer.byteLength);
  if (!source.length) throw importError("PDF_EMPTY", "这个 PDF 文件是空的，请重新选择文件。");
  // A copy keeps the caller's upload buffer reusable for an OCR retry: PDF.js
  // transfers ownership to its worker and detaches the data it receives.
  const data = new Uint8Array(source);
  const pdfjs = await pdfLibrary();
  checkAbort(signal);
  let task, documentProxy, renderTask;
  let rejectAbort;
  const aborted = new Promise((_, reject) => { rejectAbort = reject; });
  aborted.catch(() => {});
  const onAbort = () => {
    renderTask?.cancel();
    rejectAbort(abortError());
  };
  signal?.addEventListener("abort", onAbort, { once: true });
  const wait = promise => Promise.race([promise, aborted]);
  try {
    checkAbort(signal);
    task = pdfjs.getDocument({
      data,
      cMapUrl: localResource("cmaps/"),
      cMapPacked: true,
      standardFontDataUrl: localResource("standard_fonts/"),
      wasmUrl: localResource("wasm/"),
      isEvalSupported: false,
      enableXfa: false,
      useSystemFonts: false,
      disableFontFace: true,
      disableRange: true,
      disableStream: true,
      disableAutoFetch: true,
      maxImageSize: MAX_IMAGE_PIXELS,
      canvasMaxAreaInBytes: MAX_RENDER_PIXELS * 4,
      stopAtErrors: true,
      verbosity: 0
    });
    // No password callback: PDF.js rejects encrypted files instead of waiting
    // indefinitely for credentials. We deliberately do not execute PDF actions.
    documentProxy = await wait(task.promise);
    const pages = documentProxy.numPages;
    if (!pages || pages > MAX_PAGES) throw importError("PDF_PAGE_LIMIT", `PDF 最多支持 ${MAX_PAGES} 页，请拆分后再导入。`);
    const texts = [], scannedPages = [], warnings = [];
    let totalChars = 0;
    for (let pageNumber = 1; pageNumber <= pages; pageNumber++) {
      checkAbort(signal);
      let page, canvas;
      try {
        onProgress?.({ stage: "pdf", status: "extracting", pageNumber, totalPages: pages, progress: (pageNumber - 1) / pages });
        page = await wait(documentProxy.getPage(pageNumber));
        const content = await wait(page.getTextContent());
        let text = pdfTextFromItems(content.items, MAX_CHARS - totalChars);
        const letters = (text.match(/\p{L}/gu) || []).length;
        let needsOcr = letters === 0;
        // A scan may contain only a selectable page number, title or footer.
        // Check sparse text pages for raster content so these do not silently
        // skip OCR; a genuine short text-only vocabulary page stays text-only.
        if (letters > 0 && letters < 80) {
          const operators = await wait(page.getOperatorList());
          const imageOps = [pdfjs.OPS.paintImageXObject, pdfjs.OPS.paintInlineImageXObject,
            pdfjs.OPS.paintImageMaskXObject, pdfjs.OPS.paintImageMaskXObjectGroup];
          needsOcr = operators.fnArray.some(op => imageOps.includes(op));
        }
        if (needsOcr) {
          scannedPages.push(pageNumber);
          if (ocr) {
            if (scannedPages.length > MAX_OCR_PAGES) throw importError("PDF_OCR_PAGE_LIMIT", `扫描页识别每次最多支持 ${MAX_OCR_PAGES} 页，请拆分 PDF 后再导入。`);
            onProgress?.({ stage: "pdf", status: "ocr", pageNumber, totalPages: pages, progress: (pageNumber - 1) / pages });
            const base = page.getViewport({ scale: 1 });
            if (!Number.isFinite(base.width * base.height) || base.width <= 0 || base.height <= 0) {
              throw importError("PDF_PAGE_SIZE", `PDF 第 ${pageNumber} 页尺寸异常，无法识别。`);
            }
            const scale = Math.min(2.5, Math.sqrt(MAX_RENDER_PIXELS / (base.width * base.height)), MAX_RENDER_SIDE / Math.max(base.width, base.height));
            const viewport = page.getViewport({ scale });
            canvas = makeCanvas(Math.max(1, Math.floor(viewport.width)), Math.max(1, Math.floor(viewport.height)));
            const context = canvas.getContext("2d", { willReadFrequently: true });
            if (!context) throw importError("PDF_CANVAS", "无法创建扫描页识别画面，请关闭其他页面后重试。");
            renderTask = page.render({ canvasContext: context, viewport, annotationMode: pdfjs.AnnotationMode.DISABLE, background: "rgb(255,255,255)" });
            await wait(renderTask.promise);
            renderTask = null;
            checkAbort(signal);
            let result;
            try {
              result = await wait(Promise.resolve(onOcrPage(canvas, { pageNumber, totalPages: pages, signal })));
            } catch (error) {
              if (error?.name === "AbortError" || typeof error?.code === "string") throw error;
              throw importError("PDF_OCR_FAILED", `第 ${pageNumber} 页文字识别失败，请重试；若仍失败，请拆分文件或关闭“识别扫描页”后提取可选文字。`);
            }
            const ocrText = (typeof result === "string" ? result : result?.text || "").trim();
            const normalize = value => value.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
            if (ocrText) text = text && !normalize(ocrText).includes(normalize(text)) ? `${text}\n${ocrText}` : ocrText;
            else warnings.push(`第 ${pageNumber} 页未识别出文字，可能为空白页、图像过大或图片不够清晰。`);
          }
        }
        totalChars += text.length + 2;
        if (totalChars > MAX_CHARS) throw importError("PDF_TEXT_LIMIT", "PDF 文字过多，请拆分成较小的文件后导入。");
        texts.push(text);
        onProgress?.({ stage: "pdf", status: "extracting", pageNumber, totalPages: pages, progress: pageNumber / pages });
        checkAbort(signal);
      } finally {
        if (canvas) canvas.width = canvas.height = 0;
        page?.cleanup();
      }
    }
    if (scannedPages.length && !ocr) warnings.push(`有 ${scannedPages.length} 页没有可提取的文字，可能是扫描页；可开启“识别扫描页”再试。`);
    if (scannedPages.length && ocr) warnings.push("扫描页已进行文字识别，请在导入前核对拼写和释义。");
    return { text: texts.join("\n\n").trim(), warnings, kind: "pdf", pages, scannedPages };
  } catch (error) {
    if (signal?.aborted || error?.name === "AbortError") throw abortError();
    if (typeof error?.code === "string") throw error;
    if (error?.name === "PasswordException") throw importError("PDF_PASSWORD", "这个 PDF 已加密，请先解除密码保护，再导入。词阅不会询问或保存文件密码。");
    throw importError("PDF_INVALID", "无法读取这个 PDF，文件可能已损坏或格式不受支持。请重新导出 PDF 后再试。");
  } finally {
    signal?.removeEventListener("abort", onAbort);
    renderTask?.cancel();
    // destroy also releases worker, fonts and pending document resources.
    await task?.destroy().catch(() => {});
  }
}

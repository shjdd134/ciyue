/* Local-only vocabulary file reader. Heavy parsers load only for their format. */
export const MAX_FILE_BYTES = 20 * 1024 * 1024;
export const MAX_TEXT_CHARS = 2_000_000;
export const MAX_WORDS = 100_000;
const suffix = new URL(import.meta.url).search;
const fail = (code, message) => Object.assign(new Error(message), { code });
function checkAbort(signal) {
  if (signal?.aborted) throw new DOMException('已取消识别', 'AbortError');
}
export function fileKind(file) {
  const name = String(file?.name || '').toLowerCase();
  if (/\.doc$/.test(name)) throw fail('LEGACY_DOC', '旧版 .doc 暂不支持，请用 Word 另存为 .docx 或 PDF 后导入。');
  const ext = name.match(/\.([^.]+)$/)?.[1];
  if (['txt', 'csv', 'json', 'docx', 'pdf'].includes(ext)) return ext;
  // A named but unsupported extension must not be disguised by a generic MIME.
  if (ext) throw fail('UNSUPPORTED', '请选择 TXT、CSV、词库 JSON、Word（.docx）或 PDF 文件。');
  const types = { 'text/plain': 'txt', 'text/csv': 'csv', 'application/json': 'json',
    'application/pdf': 'pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx' };
  if (types[file?.type]) return types[file.type];
  throw fail('UNSUPPORTED', '无法确认文件格式，请选择带 .docx、.pdf、.txt、.csv 或 .json 后缀的文件。');
}
async function readFile(file, binary, signal) {
  checkAbort(signal);
  if (typeof FileReader === 'undefined') {
    const data = await (binary ? file.arrayBuffer() : file.text());
    checkAbort(signal); return data;
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const abort = () => { reader.abort(); reject(new DOMException('已取消识别', 'AbortError')); };
    const clear = () => signal?.removeEventListener('abort', abort);
    reader.onload = () => { clear(); resolve(reader.result); };
    reader.onerror = () => { clear(); reject(fail('READ_FAILED', '文件读取失败，请重新选择文件。')); };
    reader.onabort = () => { clear(); reject(new DOMException('已取消识别', 'AbortError')); };
    signal?.addEventListener('abort', abort, { once: true });
    if (signal?.aborted) { abort(); return; }
    if (binary) reader.readAsArrayBuffer(file); else reader.readAsText(file);
  });
}
async function loadParser(name) {
  try { return await import(new URL(name + suffix, import.meta.url).href); }
  catch { throw fail('PARSER_LOAD', '文档识别组件加载失败，请联网后重试；若仍失败，请更新浏览器或 Android System WebView。'); }
}
/* Document layouts often mix English headwords, Chinese definitions and POS.
 * Keep candidates editable, preserve duplicates for the existing preview counts. */
export function documentWords(text) {
  if (String(text).length > MAX_TEXT_CHARS) throw fail('TOO_MUCH_TEXT', '文档文字较多，请拆分后分批导入。');
  const clean = String(text || '').normalize('NFKC')
    .replace(/\u00ad/g, '').replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u2010\u2011]/g, '-')
    .replace(/([A-Za-z])-\s*\r?\n\s*([a-z])/g, '$1$2')
    .replace(/\/(?=[^/\r\n]*[\u0250-\u02ffæɑðøŋœθ])[^/\r\n]{1,120}\//g, ' ')
    .replace(/\[(?=[^\]\r\n]*[\u0250-\u02ffæɑðøŋœθ])[^\]\r\n]{1,120}\]/g, ' ')
    .replace(/\b(?:vt|vi|adj|adv|prep|pron|conj|interj|aux|num|art|det|abbr|phr|pl|sing)\.(?=\s|[\u3400-\u9fff]|$)/gi, ' ');
  const words = [];
  for (const match of clean.matchAll(/[A-Za-z]+(?:['-][A-Za-z]+)*/g)) {
    const word = match[0].toLowerCase();
    if (word.length < 2 || word.length > 40) continue;
    words.push(word);
    if (words.length > MAX_WORDS) throw fail('TOO_MANY_WORDS', '识别出的英文词超过 10 万个，请拆分文档后分批导入。');
  }
  return words;
}
export async function readVocabFile(file, { signal, onProgress = () => {}, ocr = true } = {}) {
  checkAbort(signal);
  if (!file || !Number.isFinite(file.size) || file.size <= 0) throw fail('EMPTY_FILE', '这个文件是空的，请重新选择。');
  if (file.size > MAX_FILE_BYTES) throw fail('FILE_TOO_LARGE', '文件超过 20 MB，请压缩或拆分后导入。');
  const kind = fileKind(file);
  onProgress({ stage: 'reading' });
  if (!['pdf', 'docx'].includes(kind)) {
    const text = String(await readFile(file, false, signal));
    if (text.length > MAX_TEXT_CHARS) throw fail('TOO_MUCH_TEXT', '文件文字较多，请拆分后分批导入。');
    return { text, kind, warnings: [], isDocument: false };
  }
  const bytes = await readFile(file, true, signal);
  checkAbort(signal);
  let result, session;
  try {
    if (kind === 'docx') {
      const { extractDocx } = await loadParser('./vocab-docx.mjs');
      checkAbort(signal);
      result = await extractDocx(bytes, { signal, onProgress });
    } else {
      const { extractPdf } = await loadParser('./vocab-pdf.mjs');
      checkAbort(signal);
      result = await extractPdf(bytes, { signal, onProgress, ocr,
        onOcrPage: async (canvas, meta) => {
          checkAbort(signal);
          if (!session) {
            onProgress({ stage: 'ocr-init', ...meta });
            const { createEnglishOcr } = await loadParser('./vocab-ocr.mjs');
            checkAbort(signal);
            session = await createEnglishOcr({ signal, onProgress });
          }
          return session.recognize(canvas, { ...meta, signal });
        },
      });
    }
  } finally { if (session) await session.terminate(); }
  checkAbort(signal);
  const words = documentWords(result.text);
  if (!words.length) throw fail('NO_WORDS', kind === 'pdf' && !ocr
    ? '没有提取到英文单词。如果这是扫描版 PDF，请打开「识别扫描页」后重新选择文件。'
    : '没有识别到可导入的英文单词，请检查文档内容、扫描清晰度，或复制文字后粘贴导入。');
  return { ...result, kind, text: words.join('\n'), wordCount: words.length, isDocument: true,
    warnings: [...(result.warnings || []), '英文说明和例句中的词也会被提取，请先核对或删去不需要的词。'] };
}

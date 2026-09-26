// Local-only DOCX text reader. JSZip is vendored so importing never needs a CDN.
import * as zipModule from "./vendor/jszip/jszip.min.js";

const XML_LIMIT = 8 * 1024 * 1024;
const TEXT_LIMIT = 2_000_000;
const FILE_LIMIT = 20 * 1024 * 1024;
const WORD_NS = new Set([
  "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
  "http://purl.oclc.org/ooxml/wordprocessingml/main"
]);
const TYPE_NS = "http://schemas.openxmlformats.org/package/2006/content-types";
const REL_NS = "http://schemas.openxmlformats.org/package/2006/relationships";
const MAIN_TYPE = "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml";
const PARTS = ["[Content_Types].xml", "_rels/.rels", "word/document.xml", "word/footnotes.xml", "word/endnotes.xml"];
const CRC_TABLE = Uint32Array.from({ length: 256 }, (_, i) => {
  let crc = i;
  for (let bit = 0; bit < 8; bit++) crc = crc & 1 ? 0xedb88320 ^ crc >>> 1 : crc >>> 1;
  return crc >>> 0;
});

function fail(message) { throw new Error(message); }
function aborted(signal) {
  if (signal?.aborted) throw new DOMException("已取消导入", "AbortError");
}

// Inspect central-directory sizes before asking the inflater to process any XML.
// ZIP64/multipart containers are unnecessary for a <=20 MiB vocabulary document.
function inspectZip(bytes) {
  if (bytes.length > FILE_LIMIT) fail("Word 文件不能超过 20 MB，请拆分后导入。");
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  if (bytes.length < 22 || view.getUint32(0, true) !== 0x04034b50)
    fail("这不是有效的 .docx 文件；旧版 .doc 或加密文件请另存为未加密的 .docx。");
  let eocd = -1;
  for (let p = bytes.length - 22; p >= Math.max(0, bytes.length - 65557); p--) {
    if (view.getUint32(p, true) === 0x06054b50 && p + 22 + view.getUint16(p + 20, true) === bytes.length) {
      eocd = p; break;
    }
  }
  if (eocd < 0) fail("Word 文件不完整或已损坏，请重新导出后再试。");
  const count = view.getUint16(eocd + 10, true);
  const size = view.getUint32(eocd + 12, true);
  const start = view.getUint32(eocd + 16, true);
  if (view.getUint16(eocd + 4, true) || view.getUint16(eocd + 6, true) ||
      view.getUint16(eocd + 8, true) !== count || count === 0xffff || size === 0xffffffff || start === 0xffffffff)
    fail("暂不支持分卷或 ZIP64 Word 文件，请另存为普通 .docx。");
  if (count > 10000 || start + size !== eocd) fail("Word 文件结构异常或内容过多，请拆分后重试。");
  const names = new Set(), selected = new Map();
  const decoder = new TextDecoder();
  let p = start, xmlBytes = 0;
  for (let n = 0; n < count; n++) {
    if (p + 46 > eocd || view.getUint32(p, true) !== 0x02014b50) fail("Word 文件目录已损坏。");
    const flags = view.getUint16(p + 8, true), method = view.getUint16(p + 10, true);
    const compressed = view.getUint32(p + 20, true), expanded = view.getUint32(p + 24, true);
    const nameSize = view.getUint16(p + 28, true), extraSize = view.getUint16(p + 30, true);
    const commentSize = view.getUint16(p + 32, true), local = view.getUint32(p + 42, true);
    if (flags & 1 || flags & 0x40) fail("无法读取加密的 Word 文件，请先取消密码保护。");
    if (compressed === 0xffffffff || expanded === 0xffffffff || local === 0xffffffff || view.getUint16(p + 34, true))
      fail("暂不支持分卷或 ZIP64 Word 文件。");
    const next = p + 46 + nameSize + extraSize + commentSize;
    if (next > eocd) fail("Word 文件目录已损坏。");
    const name = decoder.decode(bytes.subarray(p + 46, p + 46 + nameSize));
    if (!name || name.includes("\0") || name.includes("\\") || name.startsWith("/") ||
        name.split("/").some(part => part === "." || part === "..") || names.has(name))
      fail("Word 文件包含异常或重复的内部路径。");
    names.add(name);
    // Prevent a Unicode-path extra field from silently renaming an entry in JSZip.
    for (let x = p + 46 + nameSize, end = x + extraSize; x < end;) {
      if (x + 4 > end) fail("Word 文件目录附加信息已损坏。");
      const id = view.getUint16(x, true), length = view.getUint16(x + 2, true);
      if (x + 4 + length > end) fail("Word 文件目录附加信息已损坏。");
      if (id === 0x7075 && length >= 5 && decoder.decode(bytes.subarray(x + 9, x + 4 + length)) !== name)
        fail("Word 文件的内部路径编码不一致。");
      x += 4 + length;
    }
    if (local + 30 > start || view.getUint32(local, true) !== 0x04034b50)
      fail("Word 文件内容已损坏。");
    const localNameSize = view.getUint16(local + 26, true), localExtraSize = view.getUint16(local + 28, true);
    const dataStart = local + 30 + localNameSize + localExtraSize;
    if (dataStart + compressed > start || view.getUint16(local + 6, true) !== flags ||
        view.getUint16(local + 8, true) !== method ||
        decoder.decode(bytes.subarray(local + 30, local + 30 + localNameSize)) !== name)
      fail("Word 文件内容与目录不一致。");
    if (PARTS.includes(name)) {
      xmlBytes += expanded;
      if (xmlBytes > XML_LIMIT) fail("Word 文本内容过大，请拆分为较小文件后导入。");
      if (method !== 0 && method !== 8) fail("Word 文件使用了不支持的压缩格式。");
      selected.set(name, { expanded, crc: view.getUint32(p + 16, true) });
    }
    p = next;
  }
  if (p !== eocd || !selected.has(PARTS[0]) || !selected.has(PARTS[1]) || !selected.has(PARTS[2]))
    fail("此文件不是完整的 .docx 文档，请用 Word 重新另存为 .docx。");
  return new Map(PARTS.filter(name => selected.has(name)).map(name => [name, selected.get(name)]));
}

function inflateBounded(file, remaining, expected, expectedCrc, signal) {
  return new Promise((resolve, reject) => {
    let stream, done = false, length = 0, crc = 0xffffffff;
    const chunks = [];
    const cleanup = () => signal?.removeEventListener("abort", cancel);
    const stop = error => {
      if (done) return;
      done = true; stream?.pause(); chunks.length = 0; cleanup(); reject(error);
    };
    const cancel = () => stop(new DOMException("已取消导入", "AbortError"));
    if (signal?.aborted) { cancel(); return; }
    signal?.addEventListener("abort", cancel, { once: true });
    try {
      stream = file.internalStream("uint8array");
      stream.on("data", chunk => {
        if (done) return;
        length += chunk.length;
        if (length > remaining || length > expected) {
          stop(new Error("Word 解压后的文本过大或文件已损坏，请拆分后重试。")); return;
        }
        for (let i = 0; i < chunk.length; i++) crc = CRC_TABLE[(crc ^ chunk[i]) & 255] ^ crc >>> 8;
        chunks.push(chunk);
      });
      stream.on("error", () => stop(new Error("Word 文件解压失败，文件可能已损坏。")));
      stream.on("end", () => {
        if (done) return;
        if (length !== expected) { stop(new Error("Word 文件内容与目录大小不一致。")); return; }
        if (((crc ^ 0xffffffff) >>> 0) !== expectedCrc) { stop(new Error("Word 文本校验失败，文件可能已损坏。")); return; }
        done = true; cleanup();
        const output = new Uint8Array(length);
        let offset = 0;
        for (const chunk of chunks) { output.set(chunk, offset); offset += chunk.length; }
        resolve(output);
      });
      stream.resume();
    } catch (error) { stop(error); }
  });
}

function parseXml(bytes) {
  let encoding = "utf-8";
  if (bytes[0] === 0xff && bytes[1] === 0xfe || bytes[0] === 0x3c && bytes[1] === 0) encoding = "utf-16le";
  if (bytes[0] === 0xfe && bytes[1] === 0xff || bytes[0] === 0 && bytes[1] === 0x3c) encoding = "utf-16be";
  let source;
  try { source = new TextDecoder(encoding, { fatal: true }).decode(bytes); }
  catch { fail("Word 内部文本编码损坏，请重新导出后再试。"); }
  // Do not process custom entities, external declarations, or embedded HTML.
  if (/<!DOCTYPE|<!ENTITY/i.test(source)) fail("Word 文档包含不支持的 XML 声明。");
  if (typeof DOMParser !== "function") fail("当前浏览器不支持 Word 识别，请使用较新的浏览器。");
  const doc = new DOMParser().parseFromString(source, "application/xml");
  if (!doc.documentElement || doc.getElementsByTagName("parsererror").length)
    fail("Word 内部文本已损坏，请重新导出后再试。");
  return doc;
}

function wordText(doc, kind, budget, signal) {
  const root = doc.documentElement;
  if (root.localName !== kind || !WORD_NS.has(root.namespaceURI)) fail("Word 正文格式无效。");
  const output = [];
  let length = 0, images = false, visits = 0;
  const append = value => {
    length += value.length;
    if (length > budget) fail("Word 提取结果超过 200 万字符，请拆分后导入。");
    output.push(value);
  };
  const trimEnd = pattern => {
    while (output.length) {
      const last = output.pop(), trimmed = last.replace(pattern, "");
      length -= last.length - trimmed.length;
      if (trimmed) { output.push(trimmed); break; }
    }
  };
  const stack = [{ node: root, exit: false, depth: 0 }];
  while (stack.length) {
    const { node, exit, depth } = stack.pop();
    if ((visits++ & 511) === 0) aborted(signal);
    if (depth > 256) fail("Word 文本结构过于复杂，请重新另存或拆分后导入。");
    if (node.nodeType !== 1) continue;
    const word = WORD_NS.has(node.namespaceURI), name = node.localName;
    if (exit) {
      if (word && name === "p") append("\n");
      if (word && name === "tc") { trimEnd(/[\n ]+$/); append("\t"); }
      if (word && name === "tr") { trimEnd(/[\n\t ]+$/); append("\n"); }
      continue;
    }
    if (word && ["del", "moveFrom", "instrText", "delText"].includes(name)) continue;
    if (word && (name === "footnote" || name === "endnote")) {
      const type = [...WORD_NS].map(ns => node.getAttributeNS(ns, "type")).find(Boolean);
      if (type && type !== "normal") continue;
    }
    if (word && (name === "drawing" || name === "pict")) images = true;
    if (word && name === "t") { append(node.textContent || ""); continue; }
    if (word && name === "tab") { append("\t"); continue; }
    if (word && ["br", "cr"].includes(name)) { append("\n"); continue; }
    if (word && name === "noBreakHyphen") { append("\u2011"); continue; }
    if (word && name === "softHyphen") continue;
    stack.push({ node, exit: true, depth });
    for (let i = node.childNodes.length - 1; i >= 0; i--) stack.push({ node: node.childNodes[i], exit: false, depth: depth + 1 });
  }
  return { text: output.join("").replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim(), images };
}

/** Read document text in memory; no file content or extracted text leaves this device. */
export async function extractDocx(arrayBuffer, { signal, onProgress } = {}) {
  aborted(signal);
  const bytes = arrayBuffer instanceof Uint8Array ? arrayBuffer : new Uint8Array(arrayBuffer);
  const parts = inspectZip(bytes);
  const JSZip = zipModule.default || globalThis.JSZip;
  if (typeof JSZip?.loadAsync !== "function") fail("Word 识别组件未能加载，请刷新页面后重试。");
  let archive;
  try { archive = await JSZip.loadAsync(bytes, { checkCRC32: false, createFolders: false }); }
  catch { fail("Word 文件无法打开，可能已损坏或被加密。"); }
  aborted(signal);
  let expanded = 0, totalChars = 0, images = false;
  const paragraphs = [];
  let completed = 0;
  for (const [name, info] of parts) {
    aborted(signal);
    const file = archive.file(name);
    if (!file) fail("Word 文件缺少必要的文本内容。");
    const xml = await inflateBounded(file, XML_LIMIT - expanded, info.expanded, info.crc, signal);
    expanded += xml.length;
    aborted(signal);
    const doc = parseXml(xml);
    if (name === "[Content_Types].xml") {
      const root = doc.documentElement;
      if (root.localName !== "Types" || root.namespaceURI !== TYPE_NS ||
          !Array.from(doc.getElementsByTagNameNS(TYPE_NS, "Override")).some(el =>
            el.getAttribute("PartName") === "/word/document.xml" && el.getAttribute("ContentType") === MAIN_TYPE))
        fail("此文件不是普通 .docx 文档，请用 Word 另存为 .docx。");
    } else if (name === "_rels/.rels") {
      const root = doc.documentElement;
      if (root.localName !== "Relationships" || root.namespaceURI !== REL_NS ||
          !Array.from(doc.getElementsByTagNameNS(REL_NS, "Relationship")).some(el =>
            /^(?:http:\/\/schemas\.openxmlformats\.org\/officeDocument\/2006\/relationships|http:\/\/purl\.oclc\.org\/ooxml\/officeDocument\/relationships)\/officeDocument$/.test(el.getAttribute("Type")) &&
            /^\/?word\/document\.xml$/.test(el.getAttribute("Target")) && el.getAttribute("TargetMode") !== "External"))
        fail("Word 文档的正文关联无效，请重新另存为 .docx。");
    } else {
      const kind = name.endsWith("footnotes.xml") ? "footnotes" : name.endsWith("endnotes.xml") ? "endnotes" : "document";
      const result = wordText(doc, kind, TEXT_LIMIT - totalChars, signal);
      images ||= result.images;
      if (result.text) {
        totalChars += result.text.length + (paragraphs.length ? 2 : 0);
        if (totalChars > TEXT_LIMIT) fail("Word 提取结果超过 200 万字符，请拆分后导入。");
        paragraphs.push(result.text);
      }
    }
    onProgress?.({ stage: "docx", current: ++completed, total: parts.size, message: "正在读取 Word 文本" });
  }
  aborted(signal);
  const warnings = images ? ["已识别文档中的可复制文字；图片中的文字暂不识别。"] : [];
  return { text: paragraphs.join("\n\n"), warnings, kind: "docx" };
}

#!/usr/bin/env node
// Real PDF.js extraction, failure and OCR rendering regressions.
// Optional Node canvas dependency: @napi-rs/canvas (bundled Codex runtime works).
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createRequire, Module } from "node:module";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
if (process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES) {
  process.env.NODE_PATH = [process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES, process.env.NODE_PATH].filter(Boolean).join(path.delimiter);
  Module._initPaths();
}
const require = createRequire(import.meta.url);
let canvasLib;
try { canvasLib = require("@napi-rs/canvas"); } catch {}
if (!canvasLib) {
  console.error("PDF import tests require @napi-rs/canvas for the actual PDF.js Node adapter.");
  process.exit(1);
}
for (const key of ["DOMMatrix", "ImageData", "Path2D"]) globalThis[key] ||= canvasLib[key];
globalThis.OffscreenCanvas ||= class {
  constructor(width, height) { return canvasLib.createCanvas(width, height); }
};
const { extractPdf, pdfTextFromItems } = await import("../assets/vocab-pdf.mjs");
let passed = 0;
async function test(name, fn) {
  await fn();
  passed++;
  console.log(`✓ ${name}`);
}
const fixture = name => new Uint8Array(fs.readFileSync(path.join(root, "tools/fixtures", name)));
function item(str, x, y, width, hasEOL = false) { return { str, transform: [10, 0, 0, 10, x, y], width, hasEOL }; }

// Construct small deterministic real PDFs in memory, with optional image and text.
function makePdf({ count = 1, text = "", image = false, width = 300, height = 300 } = {}) {
  const objects = ["", "", "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"];
  let imageId;
  if (image) {
    imageId = objects.push("<< /Type /XObject /Subtype /Image /Width 1 /Height 1 /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /ASCIIHexDecode /Length 7 >>\nstream\n336699>\nendstream");
  }
  const kids = [];
  for (let index = 0; index < count; index++) {
    const content = `${image ? "q 200 0 0 200 30 30 cm /Im1 Do Q\n" : ""}${text ? `BT /F1 12 Tf 20 270 Td (${text}) Tj ET\n` : ""}`;
    const contentId = objects.push(`<< /Length ${content.length} >>\nstream\n${content}endstream`);
    const pageId = objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${width} ${height}] /Resources << /Font << /F1 3 0 R >> ${image ? `/XObject << /Im1 ${imageId} 0 R >>` : ""} >> /Contents ${contentId} 0 R >>`);
    kids.push(`${pageId} 0 R`);
  }
  objects[0] = "<< /Type /Catalog /Pages 2 0 R >>";
  objects[1] = `<< /Type /Pages /Kids [${kids.join(" ")}] /Count ${count} >>`;
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => { offsets.push(pdf.length); pdf += `${index + 1} 0 obj\n${object}\nendobj\n`; });
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (const offset of offsets.slice(1)) pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return new TextEncoder().encode(pdf);
}

await test("Vendored display and worker use the same pinned PDF.js version", async () => {
  const library = await import("../assets/vendor/pdfjs/pdf.min.mjs");
  const worker = fs.readFileSync(path.join(root, "assets/vendor/pdfjs/pdf.worker.min.mjs"), "utf8");
  assert.equal(library.version, "5.6.205");
  assert.ok(worker.includes(`pdfjsVersion = ${library.version}`));
});
await test("PDF glyph fragments join without splitting an English word", () => {
  assert.equal(pdfTextFromItems([item("voc", 10, 20, 15), item("abulary", 25, 20, 35)]), "vocabulary");
});
await test("PDF coordinates retain real spaces, columns and line breaks", () => {
  assert.equal(pdfTextFromItems([item("one", 0, 30, 15), item("two", 18, 30, 15), item("three", 80, 30, 20, true), item("four", 0, 10, 20)]), "one two\tthree\nfour");
  assert.equal(pdfTextFromItems([item("apple", 0, 30, 20), item("book", 0, 10, 20)]), "apple\nbook");
});
await test("Explicit whitespace and hasEOL survive extraction", () => {
  assert.equal(pdfTextFromItems([item("apple", 0, 20, 20), item(" ", 20, 20, 3), item("fruit", 23, 20, 20, true), { str: "book", hasEOL: true }]), "apple fruit\nbook");
});
await test("Fragment output is bounded before joining a huge document", () => {
  assert.throws(() => pdfTextFromItems([item("abcdef", 0, 0, 10)], 5), error => error.code === "PDF_TEXT_LIMIT");
});
await test("Actual bilingual PDF extracts English and Chinese with local CMaps", async () => {
  const result = await extractPdf(fixture("vocab-import-text.pdf"));
  assert.match(result.text, /apple/); assert.match(result.text, /苹果/);
  assert.match(result.text, /book/); assert.match(result.text, /书；书籍/);
  assert.equal(result.pages, 1); assert.equal(result.kind, "pdf");
  assert.deepEqual(result.scannedPages, []);
});
await test("Caller data remains reusable after PDF.js worker consumes a copy", async () => {
  const data = fixture("vocab-import-text.pdf");
  const originalLength = data.byteLength;
  const first = await extractPdf(data);
  const second = await extractPdf(data);
  assert.equal(data.byteLength, originalLength);
  assert.equal(first.text, second.text);
});
await test("Password-protected PDFs reject promptly with a decrypt instruction", async () => {
  let timer;
  try {
    await assert.rejects(Promise.race([
      extractPdf(fixture("vocab-import-password.pdf")),
      new Promise((_, reject) => { timer = setTimeout(() => reject(new Error("Password request hung")), 3000); })
    ]), error => error.code === "PDF_PASSWORD" && /解除密码/.test(error.message));
  } finally { clearTimeout(timer); }
});
await test("Invalid and empty PDFs report readable errors", async () => {
  await assert.rejects(extractPdf(new TextEncoder().encode("broken pdf file")), error => error.code === "PDF_INVALID");
  await assert.rejects(extractPdf(new ArrayBuffer(0)), error => error.code === "PDF_EMPTY");
});
await test("Documents over 100 pages reject before page processing", async () => {
  const progress = [];
  await assert.rejects(extractPdf(makePdf({ count: 101 }), { onProgress: value => progress.push(value) }), error => error.code === "PDF_PAGE_LIMIT");
  assert.equal(progress.length, 0);
});
await test("Image-only pages are recorded without automatic OCR when disabled", async () => {
  const result = await extractPdf(makePdf({ image: true }));
  assert.equal(result.text, ""); assert.deepEqual(result.scannedPages, [1]);
  assert.match(result.warnings.join(" "), /扫描页/);
});
await test("Short genuine text-only vocabulary pages do not invoke OCR", async () => {
  const result = await extractPdf(makePdf({ text: "apple" }), { ocr: true, onOcrPage: () => { throw new Error("Unexpected OCR"); } });
  assert.equal(result.text, "apple"); assert.deepEqual(result.scannedPages, []);
});
await test("Image plus a sparse selectable footer still invokes OCR", async () => {
  let calls = 0;
  const result = await extractPdf(makePdf({ text: "Vocabulary", image: true }), { ocr: true, onOcrPage: (canvas, info) => {
    calls++; assert.equal(info.pageNumber, 1); assert.equal(info.totalPages, 1);
    assert.ok(canvas.width > 0);
    assert.deepEqual(Array.from(canvas.getContext("2d").getImageData(80, 580, 1, 1).data), [51, 102, 153, 255]);
    return "Vocabulary\napple fruit\nbook reading";
  } });
  assert.equal(calls, 1); assert.deepEqual(result.scannedPages, [1]);
  assert.equal(result.text.match(/Vocabulary/g).length, 1);
  assert.match(result.text, /apple fruit/);
});
await test("OCR rendering limits pixel size and releases its canvas", async () => {
  let reference;
  const result = await extractPdf(makePdf({ image: true, width: 5000, height: 5000 }), { ocr: true, onOcrPage: canvas => {
    reference = canvas;
    assert.ok(canvas.width * canvas.height <= 4_000_000);
    assert.ok(canvas.width <= 3000 && canvas.height <= 3000);
    return { text: "apple 苹果" };
  } });
  assert.equal(result.text, "apple 苹果");
  // Native Node canvas treats zero as a default size; browser zero clears it.
  assert.ok(reference.width === 0 || reference.width === 350);
});
await test("More than 20 scanned pages rejects explicitly instead of dropping pages", async () => {
  await assert.rejects(extractPdf(makePdf({ count: 21 }), { ocr: true, onOcrPage: () => "apple" }), error => error.code === "PDF_OCR_PAGE_LIMIT");
});
await test("Oversized OCR output is rejected before import", async () => {
  await assert.rejects(extractPdf(makePdf(), { ocr: true, onOcrPage: () => "a".repeat(2_000_001) }), error => error.code === "PDF_TEXT_LIMIT");
});
await test("Progress includes page counts and the OCR phase", async () => {
  const progress = [];
  await extractPdf(makePdf({ image: true }), { ocr: true, onOcrPage: () => "apple", onProgress: value => progress.push(value) });
  assert.ok(progress.some(value => value.stage === "pdf" && value.status === "ocr"));
  assert.equal(progress.at(-1).progress, 1); assert.equal(progress.at(-1).totalPages, 1);
});
await test("Cancellation before parsing and during page progress preserves AbortError", async () => {
  const first = new AbortController(); first.abort();
  await assert.rejects(extractPdf(makePdf(), { signal: first.signal }), error => error.name === "AbortError");
  const second = new AbortController();
  await assert.rejects(extractPdf(makePdf({ count: 3, text: "apple" }), { signal: second.signal, onProgress: () => second.abort() }), error => error.name === "AbortError");
});
await test("Cancellation during OCR terminates extraction without waiting for recognition", async () => {
  const controller = new AbortController();
  await assert.rejects(extractPdf(makePdf(), { ocr: true, signal: controller.signal, onOcrPage: () => {
    controller.abort();
    return new Promise(() => {});
  } }), error => error.name === "AbortError");
});
await test("OCR failure codes remain visible to the import UI", async () => {
  const error = new Error("识别组件加载失败"); error.code = "OCR_LOAD";
  await assert.rejects(extractPdf(makePdf(), { ocr: true, onOcrPage: () => { throw error; } }), received => received === error);
});
await test("Uncoded OCR worker failures are not reported as damaged PDFs", async () => {
  await assert.rejects(extractPdf(makePdf(), { ocr: true, onOcrPage: () => { throw new Error("Failed to fetch language model"); } }), error => error.code === "PDF_OCR_FAILED" && !/损坏/.test(error.message));
});
console.log(`PDF import: ${passed} tests passed.`);

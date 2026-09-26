#!/usr/bin/env node
// Import boundary and real PDF -> editable vocabulary integration tests.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire, Module } from 'node:module';
import { fileURLToPath } from 'node:url';
import { readVocabFile, documentWords, fileKind, MAX_FILE_BYTES, MAX_TEXT_CHARS, MAX_WORDS } from '../assets/vocab-import.mjs';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
if (process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES) {
  process.env.NODE_PATH = [process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES, process.env.NODE_PATH].filter(Boolean).join(path.delimiter);
  Module._initPaths();
}
const canvasLib = require('@napi-rs/canvas');
for (const key of ['DOMMatrix', 'ImageData', 'Path2D']) globalThis[key] ||= canvasLib[key];
let passed = 0;
async function test(name, run) { await run(); passed++; console.log(`✓ ${name}`); }
const file = (name, text, type = '') => new File([text], name, { type });
const rejects = (promise, code) => assert.rejects(promise, error => error.code === code);

await test('All supported extensions accept uppercase filenames', () => {
  for (const ext of ['txt', 'csv', 'json', 'docx', 'pdf']) assert.equal(fileKind({ name: `词库.${ext.toUpperCase()}` }), ext);
});
await test('Legacy Word gives conversion guidance and cannot masquerade as DOCX', () => {
  assert.throws(() => fileKind({ name: 'words.doc', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }), error => error.code === 'LEGACY_DOC' && /另存为/.test(error.message));
});
await test('Unknown extensions reject; extensionless files use a known MIME only', () => {
  assert.throws(() => fileKind({ name: 'word.exe', type: 'text/plain' }), error => error.code === 'UNSUPPORTED');
  assert.equal(fileKind({ name: '词库', type: 'application/pdf' }), 'pdf');
  assert.throws(() => fileKind({ name: '词库', type: '' }), error => error.code === 'UNSUPPORTED');
});
await test('Empty and oversized files reject before trying to read', async () => {
  await rejects(readVocabFile(file('empty.pdf', '')), 'EMPTY_FILE');
  await rejects(readVocabFile({ name: 'huge.pdf', size: MAX_FILE_BYTES + 1, arrayBuffer: () => { throw Error('must not read'); } }), 'FILE_TOO_LARGE');
});
await test('Pre-aborted imports do not read the file', async () => {
  const signal = AbortSignal.abort();
  await assert.rejects(readVocabFile({ size: 2, name: 'x.txt', text: () => { throw Error('must not read'); } }, { signal }), error => error.name === 'AbortError');
});
await test('TXT, CSV and JSON retain the original input for the existing parser', async () => {
  for (const [ext, input] of [['txt', 'apple 苹果\nbook 书'], ['csv', 'word,meaning\napple,苹果'], ['json', '{"customVocab":["apple","book"]}']]) {
    const result = await readVocabFile(file(`words.${ext}`, input));
    assert.equal(result.text, input); assert.equal(result.isDocument, false); assert.deepEqual(result.warnings, []);
  }
});
await test('Plain text imports also enforce the character limit', async () => {
  await rejects(readVocabFile(file('large.txt', 'a'.repeat(MAX_TEXT_CHARS + 1))), 'TOO_MUCH_TEXT');
});
await test('Candidate words remove phonetics and POS while preserving duplicates', () => {
  assert.deepEqual(documentWords('Apple /ˈæpəl/ n. 苹果\nBOOK [bʊk] vt. 预订\napple adj. 红色'), ['apple', 'book', 'apple']);
});
await test('Slashes and plain square brackets remain word-list separators', () => {
  assert.deepEqual(documentWords('[apple] book/reading/orange /æpl/'), ['apple', 'book', 'reading', 'orange']);
});
await test('Word typography, soft hyphens and wrapped words normalize', () => {
  assert.deepEqual(documentWords('ＤＯＮ’Ｔ mother‑in‑law co\u00adoperate voca-\nbulary'), ["don't", 'mother-in-law', 'cooperate', 'vocabulary']);
});
await test('Long junk tokens, digits and Chinese do not become English words', () => {
  assert.deepEqual(documentWords('一二三 123 a I ' + 'z'.repeat(41) + ' book'), ['book']);
});
await test('Candidate extraction bounds both characters and word count', () => {
  assert.throws(() => documentWords('a'.repeat(MAX_TEXT_CHARS + 1)), error => error.code === 'TOO_MUCH_TEXT');
  assert.throws(() => documentWords('book '.repeat(MAX_WORDS + 1)), error => error.code === 'TOO_MANY_WORDS');
});
await test('Real bilingual PDF yields editable English candidates and a review warning', async () => {
  const progress = [];
  const result = await readVocabFile(file('词库.pdf', fs.readFileSync(path.join(root, 'tools/fixtures/vocab-import-text.pdf'))), { onProgress: value => progress.push(value) });
  assert.equal(result.kind, 'pdf'); assert.equal(result.isDocument, true); assert.equal(result.pages, 1);
  assert.ok(result.text.split('\n').includes('apple')); assert.ok(result.text.split('\n').includes('book'));
  assert.ok(result.warnings.some(text => /核对/.test(text)));
  assert.equal(result.wordCount, result.text.split('\n').length);
  assert.equal(progress[0].stage, 'reading'); assert.ok(progress.some(value => value.stage === 'pdf'));
});
await test('Password and malformed PDF failures survive the import boundary', async () => {
  await rejects(readVocabFile(file('locked.pdf', fs.readFileSync(path.join(root, 'tools/fixtures/vocab-import-password.pdf')))), 'PDF_PASSWORD');
  await rejects(readVocabFile(file('broken.pdf', 'not a pdf')), 'PDF_INVALID');
});
await test('Android package includes document modules, parsers, workers and OCR assets', () => {
  const shipped = new Set(require('./lib-mobile.cjs').planFiles(root));
  const required = [
    'assets/vocab-import.mjs', 'assets/vocab-docx.mjs', 'assets/vocab-pdf.mjs', 'assets/vocab-ocr.mjs',
    'assets/vendor/jszip/jszip.min.js', 'assets/vendor/pdfjs/pdf.min.mjs', 'assets/vendor/pdfjs/pdf.worker.min.mjs',
    'assets/vendor/pdfjs/cmaps/UniGB-UCS2-H.bcmap', 'assets/vendor/pdfjs/standard_fonts/LiberationSans-Regular.ttf',
    'assets/vendor/pdfjs/wasm/openjpeg.wasm', 'assets/vendor/pdfjs/wasm/jbig2.wasm', 'assets/vendor/pdfjs/wasm/qcms_bg.wasm',
    'assets/vendor/pdfjs/wasm/openjpeg_nowasm_fallback.js',
    'assets/vendor/tesseract/tesseract.min.js', 'assets/vendor/tesseract/worker.min.js',
    'assets/vendor/tesseract/tesseract-core-lstm.wasm.js', 'assets/vendor/tesseract/tesseract-core-simd-lstm.wasm.js',
    'assets/vendor/tesseract/tesseract-core-relaxedsimd-lstm.wasm.js', 'assets/vendor/tesseract/eng.traineddata.gz'
  ];
  for (const name of required) { assert.ok(shipped.has(name), `not shipped: ${name}`); assert.ok(fs.statSync(path.join(root, name)).size > 0); }
});
await test('Document parsers are not loaded in the initial HTML', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  assert.doesNotMatch(html, /<script[^>]+(?:vocab-|vendor\/)/);
});
console.log(`Vocabulary import: ${passed} tests passed.`);

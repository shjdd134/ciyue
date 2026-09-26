// Run: node tools/docx-import-test.mjs
// Production uses DOMParser. Node's test adapter uses the SAX XML parser from
// the development runtime (or a local dev installation); it does not ship.
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import path from "node:path";
import { extractDocx } from "../assets/vocab-docx.mjs";

const require = createRequire(import.meta.url);
const devRequire = process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES
  ? createRequire(path.join(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES, "package.json")) : require;
const sax = devRequire("sax");
const JSZip = require("../assets/vendor/jszip/jszip.min.js");

class XmlElement {
  constructor(tag) {
    this.nodeType = 1; this.nodeName = tag.name; this.localName = tag.local;
    this.namespaceURI = tag.uri; this.attributes = Object.values(tag.attributes || {}); this.childNodes = [];
  }
  get textContent() { return this.childNodes.map(child => child.textContent).join(""); }
  getAttribute(name) { return this.attributes.find(attr => attr.name === name)?.value || ""; }
  getAttributeNS(ns, name) { return this.attributes.find(attr => attr.uri === ns && attr.local === name)?.value || ""; }
}
function elements(root, predicate) {
  const result = [], pending = [root];
  while (pending.length) {
    const node = pending.pop();
    if (node.nodeType !== 1) continue;
    if (predicate(node)) result.push(node);
    pending.push(...node.childNodes);
  }
  return result;
}
globalThis.DOMParser = class {
  parseFromString(source) {
    const parser = sax.parser(true, { xmlns: true }), stack = [];
    let root;
    parser.onopentag = tag => {
      const node = new XmlElement(tag);
      if (stack.length) stack.at(-1).childNodes.push(node); else root = node;
      stack.push(node);
    };
    parser.onclosetag = () => stack.pop();
    parser.ontext = parser.oncdata = text => stack.at(-1)?.childNodes.push({ nodeType: 3, textContent: text });
    try { parser.write(source).close(); }
    catch { root = new XmlElement({ name: "parsererror", local: "parsererror", uri: "" }); }
    return {
      documentElement: root,
      getElementsByTagName: name => elements(root, node => node.nodeName === name),
      getElementsByTagNameNS: (ns, name) => elements(root, node => node.namespaceURI === ns && node.localName === name)
    };
  }
};

const WORD = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
const TYPES = '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>';
const RELS = '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>';
const doc = body => `<?xml version="1.0" encoding="UTF-8"?><w:document xmlns:w="${WORD}"><w:body>${body}</w:body></w:document>`;
const para = text => `<w:p><w:r><w:t>${text}</w:t></w:r></w:p>`;
async function fixture(body = para("apple 苹果"), options = {}) {
  const zip = new JSZip();
  zip.file("[Content_Types].xml", options.types || TYPES);
  zip.file("_rels/.rels", options.rels || RELS);
  // Notes deliberately precede the main XML in the ZIP directory.
  for (const [name, value] of Object.entries(options.parts || {})) zip.file(name, value);
  zip.file("word/document.xml", options.xml || doc(body));
  if (options.remove) zip.remove(options.remove);
  return zip.generateAsync({ type: "uint8array", compression: options.compression || "DEFLATE" });
}
function centralEntry(bytes, target) {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  for (let p = 0; p + 46 <= bytes.length; p++) {
    if (view.getUint32(p, true) !== 0x02014b50) continue;
    const nameLength = view.getUint16(p + 28, true);
    if (new TextDecoder().decode(bytes.subarray(p + 46, p + 46 + nameLength)) === target) return { view, p };
  }
  throw new Error("Fixture entry not found");
}

let passed = 0;
async function test(name, callback) {
  await callback(); passed++; console.log(`  ✓ ${name}`);
}

await test("reads a real compressed DOCX with Chinese, split runs, XML entities and tables", async () => {
  const input = await fixture('<w:p><w:r><w:t>to</w:t></w:r><w:r><w:t>gether</w:t></w:r><w:r><w:tab/><w:t>一起 &amp; &lt;同行&gt;</w:t><w:br/><w:t>second line</w:t></w:r></w:p><w:tbl><w:tr><w:tc>' + para("apple") + '</w:tc><w:tc>' + para("苹果") + '</w:tc></w:tr><w:tr><w:tc>' + para("banana") + '</w:tc><w:tc>' + para("香蕉") + '</w:tc></w:tr></w:tbl>');
  const result = await extractDocx(input);
  assert.deepEqual(result, { text: "together\t一起 & <同行>\nsecond line\napple\t苹果\nbanana\t香蕉", warnings: [], kind: "docx" });
});

await test("keeps inserted text and field results, excludes deleted revisions and instructions", async () => {
  const result = await extractDocx(await fixture('<w:p><w:del><w:r><w:t>deleted</w:t></w:r></w:del><w:moveFrom><w:r><w:t>old place</w:t></w:r></w:moveFrom><w:r><w:instrText> HYPERLINK secret </w:instrText><w:delText>deleted text</w:delText></w:r><w:ins><w:r><w:t>visible</w:t></w:r></w:ins><w:fldSimple w:instr="secret field"><w:r><w:t> result</w:t></w:r></w:fldSimple></w:p>'));
  assert.equal(result.text, "visible result");
});

await test("appends footnotes and endnotes after the document; ignores separator notes", async () => {
  const result = await extractDocx(await fixture(para("main 主文"), { parts: {
    "word/footnotes.xml": `<w:footnotes xmlns:w="${WORD}"><w:footnote w:type="separator">${para("skip")}</w:footnote><w:footnote w:id="1">${para("foot 脚注")}</w:footnote></w:footnotes>`,
    "word/endnotes.xml": `<w:endnotes xmlns:w="${WORD}"><w:endnote w:id="1">${para("end 尾注")}</w:endnote></w:endnotes>`
  } }));
  assert.equal(result.text, "main 主文\n\nfoot 脚注\n\nend 尾注");
});

await test("accepts OOXML strict namespaces and reports progress", async () => {
  const progress = [];
  const result = await extractDocx(await fixture("", {
    xml: doc(para("strict 严格")).replace(WORD, "http://purl.oclc.org/ooxml/wordprocessingml/main"),
    rels: RELS.replace("http://schemas.openxmlformats.org/officeDocument/2006/relationships", "http://purl.oclc.org/ooxml/officeDocument/relationships")
  }), { onProgress: value => progress.push(value) });
  assert.equal(result.text, "strict 严格");
  assert.deepEqual(progress.map(item => item.current), [1, 2, 3]);
  assert(progress.every(item => item.total === 3));
});

await test("accepts ArrayBuffer and UTF-16 XML", async () => {
  const xml = Buffer.from('\ufeff' + doc(para("English 中文")).replace("UTF-8", "UTF-16"), "utf16le");
  const input = await fixture("", { xml });
  assert.equal((await extractDocx(input.buffer.slice(input.byteOffset, input.byteOffset + input.byteLength))).text, "English 中文");
});

await test("does not convert embedded markup into HTML and warns about image-only content", async () => {
  assert.equal((await extractDocx(await fixture(para("&lt;img src=x onerror=alert(1)&gt;")))).text, "<img src=x onerror=alert(1)>");
  const result = await extractDocx(await fixture('<w:p><w:r><w:drawing/></w:r></w:p>'));
  assert.equal(result.text, "");
  assert.equal(result.warnings.length, 1);
});

await test("rejects old .doc, bad ZIP and truncated DOCX", async () => {
  await assert.rejects(extractDocx(new Uint8Array([0xd0, 0xcf, 0x11, 0xe0])), /有效的 .docx/);
  const input = await fixture();
  await assert.rejects(extractDocx(input.subarray(0, input.length - 10)), /不完整|损坏/);
});

await test("rejects arbitrary ZIP and wrong Word content type", async () => {
  await assert.rejects(extractDocx(await fixture("", { remove: "_rels/.rels" })), /完整的 .docx/);
  await assert.rejects(extractDocx(await fixture("", { types: TYPES.replace("wordprocessingml.document", "spreadsheetml.sheet") })), /普通 .docx/);
  await assert.rejects(extractDocx(await fixture("", { rels: RELS.replace('Target="word/document.xml"', 'Target="https://example.test/doc.xml" TargetMode="External"') })), /正文关联无效/);
});

await test("rejects encrypted ZIP metadata before reading", async () => {
  const input = await fixture(), { view, p } = centralEntry(input, "word/document.xml");
  view.setUint16(p + 8, view.getUint16(p + 8, true) | 1, true);
  await assert.rejects(extractDocx(input), /加密/);
});

await test("rejects malformed XML and entity declarations", async () => {
  await assert.rejects(extractDocx(await fixture("", { xml: doc("<w:p><w:r></w:p>") })), /内部文本已损坏/);
  await assert.rejects(extractDocx(await fixture("", { xml: '<!DOCTYPE doc [<!ENTITY bomb "bomb">]>' + doc(para("&bomb;")) })), /XML 声明/);
});

await test("rejects corrupt stored XML even when it would still be well-formed", async () => {
  const input = await fixture(para("apple"), { compression: "STORE" });
  const text = new TextDecoder().decode(input), position = text.indexOf("apple");
  input[position] = "x".charCodeAt(0);
  await assert.rejects(extractDocx(input), /校验失败/);
});

await test("checks XML size in directory before inflation", async () => {
  const input = await fixture(), { view, p } = centralEntry(input, "word/document.xml");
  view.setUint32(p + 24, 9 * 1024 * 1024, true);
  await assert.rejects(extractDocx(input), /文本内容过大/);
});

await test("stops dishonest compressed streams that exceed their declared size", async () => {
  const input = await fixture(para("a".repeat(100000))), { view, p } = centralEntry(input, "word/document.xml");
  view.setUint32(p + 24, 100, true);
  await assert.rejects(extractDocx(input), /文本过大|已损坏|解压失败/);
});

await test("limits total output to two million characters", async () => {
  await assert.rejects(extractDocx(await fixture(para("a".repeat(2_000_001)))), /200 万字符/);
});

await test("enforces the overall file-size limit", async () => {
  await assert.rejects(extractDocx(new Uint8Array(20 * 1024 * 1024 + 1)), /20 MB/);
});

await test("honors cancellation before reading and between parts", async () => {
  const pre = new AbortController(); pre.abort();
  await assert.rejects(extractDocx(await fixture(), { signal: pre.signal }), { name: "AbortError" });
  const during = new AbortController();
  await assert.rejects(extractDocx(await fixture(), { signal: during.signal, onProgress: () => during.abort() }), { name: "AbortError" });
});

console.log(`DOCX import: ${passed} tests passed`);

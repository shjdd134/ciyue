#!/usr/bin/env node
/* OCR lifecycle regression + a real vendored WASM/model smoke test.
 * No browser emulation is claimed: worker wiring is checked with a controlled
 * API double; real image recognition runs directly through the shipped core.
 * Run with runtime @napi-rs/canvas installed (CODEX_PRIMARY_RUNTIME_NODE_MODULES
 * may point at its directory), or pass --unit-only for lifecycle checks only. */
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { gunzipSync } from "node:zlib";
import { createHash } from "node:crypto";
import { createEnglishOcr } from "../assets/vocab-ocr.mjs";

const require = createRequire(import.meta.url);
const root = fileURLToPath(new URL("../", import.meta.url));
const vendor = path.join(root, "assets/vendor/tesseract");
let count = 0;
async function test(name, fn) {
  await fn();
  count++;
  console.log(`ok ${count} - ${name}`);
}
function deferred() {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}
function mockWorker() {
  return {
    calls: 0, terminated: 0,
    async recognize() { this.calls++; return { data: { text: "apple\nbanana\n" } }; },
    async terminate() { this.terminated++; }
  };
}
function install(createWorker) { globalThis.Tesseract = { createWorker }; }
const canvas = { width: 900, height: 240 };
const aborts = promise => assert.rejects(promise, error => error.name === "AbortError");
const tick = () => new Promise(resolve => setImmediate(resolve));
const oldTesseract = globalThis.Tesseract;

try {
  await test("pre-cancelled import does not initialize OCR", async () => {
    let called = false;
    install(() => { called = true; });
    const controller = new AbortController(); controller.abort();
    await aborts(createEnglishOcr({ signal: controller.signal }));
    assert.equal(called, false);
  });

  await test("all three resource URLs are local and English LSTM is fixed", async () => {
    const worker = mockWorker();
    install(async (language, mode, options) => {
      assert.equal(language, "eng"); assert.equal(mode, 1);
      for (const key of ["workerPath", "corePath", "langPath"]) {
        const url = new URL(options[key]);
        assert.equal(url.protocol, "file:");
        assert.ok(fileURLToPath(url).startsWith(vendor));
        assert.ok(fs.existsSync(fileURLToPath(url)));
      }
      assert.equal(options.workerBlobURL, false);
      assert.equal(options.gzip, true);
      assert.equal(options.legacyCore, false);
      assert.equal(options.legacyLang, false);
      return worker;
    });
    const ocr = await createEnglishOcr(); await ocr.terminate();
    assert.equal(worker.terminated, 1);
  });

  await test("sequential pages return text and emit scoped progress", async () => {
    const events = []; let options;
    const worker = mockWorker();
    worker.recognize = async () => {
      options.logger({ status: "recognizing text", progress: 0.5 });
      return { data: { text: "apple banana" } };
    };
    install(async (language, mode, opts) => {
      options = opts; options.logger({ status: "loading language traineddata", progress: 0.25 });
      return worker;
    });
    const ocr = await createEnglishOcr({ onProgress: event => events.push(event) });
    assert.equal(await ocr.recognize(canvas, { pageNumber: 3, totalPages: 6 }), "apple banana");
    assert.equal(await ocr.recognize(canvas, { pageNumber: 5, totalPages: 6 }), "apple banana");
    assert.equal(events[0].pageNumber, undefined);
    assert.deepEqual(events[1], { stage: "ocr", status: "recognizing text", progress: 0.5, pageNumber: 3, totalPages: 6 });
    assert.equal(events[2].pageNumber, 5);
    await ocr.terminate();
  });

  await test("progress callback errors do not break recognition", async () => {
    const worker = mockWorker();
    install(async (_, __, options) => {
      options.logger({ status: "initializing api", progress: 2 });
      return worker;
    });
    const ocr = await createEnglishOcr({ onProgress: () => { throw new Error("UI callback failed"); } });
    assert.match(await ocr.recognize(canvas), /apple/);
    await ocr.terminate();
  });

  await test("cancel during initialization rejects now and cleans the late handle", async () => {
    const pending = deferred(), entered = deferred(), worker = mockWorker();
    install(() => { entered.resolve(); return pending.promise; });
    const controller = new AbortController();
    const creating = createEnglishOcr({ signal: controller.signal });
    const rejected = aborts(creating);
    await entered.promise; controller.abort(); await rejected;
    assert.equal(worker.terminated, 0);
    pending.resolve(worker); await tick();
    assert.equal(worker.terminated, 1);
  });

  await test("lifetime cancel settles a recognize promise that upstream leaves pending", async () => {
    const pending = deferred(), worker = mockWorker(), controller = new AbortController();
    worker.recognize = () => pending.promise;
    install(async () => worker);
    const ocr = await createEnglishOcr({ signal: controller.signal });
    const rejected = aborts(ocr.recognize(canvas));
    controller.abort(); await rejected;
    assert.equal(worker.terminated, 1);
    await aborts(ocr.recognize(canvas));
  });

  await test("page-specific cancel stops the session and releases worker", async () => {
    const pending = deferred(), worker = mockWorker(), controller = new AbortController();
    worker.recognize = () => pending.promise;
    install(async () => worker);
    const ocr = await createEnglishOcr();
    const rejected = aborts(ocr.recognize(canvas, { signal: controller.signal }));
    controller.abort(); await rejected;
    assert.equal(worker.terminated, 1);
  });

  await test("explicit terminate is idempotent and unblocks active recognition", async () => {
    const pending = deferred(), worker = mockWorker(); worker.recognize = () => pending.promise;
    install(async () => worker);
    const ocr = await createEnglishOcr();
    const rejected = aborts(ocr.recognize(canvas));
    await ocr.terminate(); await rejected; await ocr.terminate();
    assert.equal(worker.terminated, 1);
  });

  await test("overlapping pages are rejected without disrupting the active page", async () => {
    const pending = deferred(), worker = mockWorker(); worker.recognize = () => pending.promise;
    install(async () => worker);
    const ocr = await createEnglishOcr(), first = ocr.recognize(canvas);
    await assert.rejects(ocr.recognize(canvas), /当前页/);
    pending.resolve({ data: { text: "orange" } });
    assert.equal(await first, "orange"); assert.equal(worker.terminated, 0);
    await ocr.terminate();
  });

  await test("upstream initialization errors reject and clean any late handle", async () => {
    const pending = deferred(), worker = mockWorker();
    install((_, __, options) => { queueMicrotask(() => options.errorHandler("bad language model")); return pending.promise; });
    await assert.rejects(createEnglishOcr(), /bad language model/);
    pending.resolve(worker); await tick(); assert.equal(worker.terminated, 1);
  });

  await test("recognition failure releases the worker", async () => {
    const worker = mockWorker(); worker.recognize = async () => { throw new Error("bad page image"); };
    install(async () => worker);
    const ocr = await createEnglishOcr();
    await assert.rejects(ocr.recognize(canvas), /bad page image/);
    assert.equal(worker.terminated, 1);
  });

  await test("empty page image is rejected before dispatch", async () => {
    const worker = mockWorker(); install(async () => worker);
    const ocr = await createEnglishOcr();
    await assert.rejects(ocr.recognize({ width: 0, height: 0 }), /页面图像为空/);
    assert.equal(worker.calls, 0); await ocr.terminate();
  });

  const model = gunzipSync(fs.readFileSync(path.join(vendor, "eng.traineddata.gz")));
  await test("vendored English model matches the documented source hash", () => {
    assert.equal(createHash("sha256").update(model).digest("hex"), "7d4322bd2a7749724879683fc3912cb542f19906c83bcc1a52132556427170b2");
    for (const name of ["tesseract.min.js", "worker.min.js", "tesseract-core-lstm.wasm.js", "tesseract-core-simd-lstm.wasm.js", "tesseract-core-relaxedsimd-lstm.wasm.js", "LICENSE", "LICENSE.core", "LICENSE.tesseract.js.md", "LICENSE.eng-source"]) {
      assert.ok(fs.statSync(path.join(vendor, name)).size > 0, name);
    }
  });

  if (!process.argv.includes("--unit-only")) {
    await test("real vendored WASM + English model recognizes a generated vocabulary image", async () => {
      const canvasPackage = process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES
        ? path.join(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES, "@napi-rs/canvas") : "@napi-rs/canvas";
      const { createCanvas } = require(canvasPackage);
      const image = createCanvas(1000, 260), context = image.getContext("2d");
      context.fillStyle = "white"; context.fillRect(0, 0, 1000, 260);
      context.fillStyle = "black"; context.font = "48px sans-serif";
      context.fillText("apple banana orange", 40, 95);
      context.fillText("reading vocabulary", 40, 175);
      const core = await require(path.join(vendor, "tesseract-core-lstm.wasm.js"))();
      core.FS.writeFile("/eng.traineddata", model);
      const api = new core.TessBaseAPI();
      try {
        assert.equal(api.Init(null, "eng", 1), 0);
        core.FS.writeFile("/input", image.toBuffer("image/png"));
        assert.equal(api.SetImageFile(1, 0), 0);
        api.SetVariable("user_defined_dpi", "150"); api.Recognize(null);
        const text = api.GetUTF8Text().toLowerCase();
        for (const word of ["apple", "banana", "orange", "reading", "vocabulary"]) assert.ok(text.includes(word), `${word} missing from ${text}`);
      } finally { api.End(); core.destroy(api); }
    });
  }
} finally {
  if (oldTesseract === undefined) delete globalThis.Tesseract;
  else globalThis.Tesseract = oldTesseract;
}
console.log(`\n${count} OCR checks passed${process.argv.includes("--unit-only") ? " (real-image check skipped by request)" : ""}.`);

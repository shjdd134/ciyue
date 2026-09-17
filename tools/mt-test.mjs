#!/usr/bin/env node
/* Translation regression. All requests are mocked; no provider quota is used. */

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const cacheFile = path.join(os.tmpdir(), `wordlens-mt-${process.pid}.json`);
const requests = [];
const foreignUrls = [];
process.env.DEEPL_KEY = "fixture:fx";
process.env.DASHSCOPE_API_KEY = "fixture-qwen";
process.env.DASHSCOPE_BASE_URL = "https://dashscope.aliyuncs.com/compatible-mode/v1";
process.env.QWEN_MT_MODEL = "qwen-mt-plus";
let mode = "normal";
const qwenRequests = [];

globalThis.fetch = async (url, init = {}) => {
  const u = String(url);
  if (u === "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions") {
    assert.equal(init.headers.Authorization, "Bearer fixture-qwen");
    assert.equal(init.redirect, "error");
    const body = JSON.parse(init.body);
    qwenRequests.push(body);
    if (mode === "quota") return { ok: false, status: 403 };
    return {
      ok: true, status: 200,
      async json() { return { choices: [{
        finish_reason: mode === "truncated" ? "length" : "stop",
        message: { content: mode === "qwen-echo" ? body.messages[0].content : `千问译文：${body.messages[0].content}` },
      }] }; },
    };
  }
  if (!u.includes("api-free.deepl.com/v2/translate")) {
    foreignUrls.push(u);
    throw new Error(`unexpected non-DeepL request: ${u}`);
  }
  const body = JSON.parse(init.body);
  requests.push(body);
  if (mode === "deepl-down") return { ok: false, status: 456 };
  return {
    ok: true,
    status: 200,
    async json() {
      return { translations: body.text.map(text => ({
        /* A supplier echo is rejected and remains pending for a later retry. */
        text: text.startsWith("Echo") ? text : `译文：${text}`,
      })) };
    },
  };
};

try {
  const { translateTexts: translateRaw, createQwenMT, qwenMTBaseURL } = await import("./lib-mt.mjs");
  // Keep test credentials isolated from a configured local key.
  const translateAll = (texts, opts) => translateRaw(texts, { qwenKey: "fixture-qwen", ...opts });
  // Existing DeepL-only regressions remain isolated even if a local Qwen key exists.
  const translateTexts = (texts, opts) => translateAll(texts, { providers: ["deepl"], ...opts });
  const texts = ["She won the award.", "The actor thanked her."];
  const first = await translateTexts(texts, {
    cacheFile,
    maxLines: 2,
    maxChars: 1000,
    cacheNamespace: "article-context-v2",
    cacheKey: "https://example.test/article-a",
    context: batch => `Article title: A short profile\n${batch.map(x => x.t).join(" ")}`,
  });
  assert.deepEqual(first, texts.map(text => `译文：${text}`));
  assert.equal(requests.length, 1);
  assert.match(requests[0].context, /Article title: A short profile/);
  assert.equal(requests[0].source_lang, "EN");
  const saved = JSON.parse(fs.readFileSync(cacheFile, "utf8"));
  assert.ok(Object.values(saved).every(value => value?.provider === "deepl"));

  /* A changed article key must carry its own context and make a new request. */
  const second = await translateTexts(texts, {
    cacheFile,
    maxLines: 2,
    maxChars: 1000,
    cacheNamespace: "article-context-v2",
    cacheKey: "https://example.test/article-b",
    context: "Article title: Another profile",
  });
  assert.deepEqual(second, first);
  assert.equal(requests.length, 2);
  assert.match(requests[1].context, /Another profile/);

  /* Entries previously written by a disabled engine are never reused. */
  const staleFile = path.join(os.tmpdir(), `wordlens-mt-stale-${process.pid}.json`);
  const staleOpts = { cacheFile: staleFile, cacheNamespace: "stale", cacheKey: "article" };
  await translateTexts(["A stale sentence."], staleOpts);
  const staleKey = Object.keys(JSON.parse(fs.readFileSync(staleFile, "utf8")))[0];
  const staleCache = JSON.parse(fs.readFileSync(staleFile, "utf8"));
  staleCache[staleKey] = { text: "低质旧译文", provider: "youdao", profile: "stale", version: "mt-v2" };
  fs.writeFileSync(staleFile, JSON.stringify(staleCache));
  const refreshed = await translateTexts(["A stale sentence."], staleOpts);
  assert.deepEqual(refreshed, ["译文：A stale sentence."]);
  assert.equal(requests.at(-1).text[0], "A stale sentence.");
  try { fs.rmSync(staleFile, { force: true }); } catch { /* cleanup */ }

  /* Echoes are rejected without any fallback request or cache entry. */
  const echoFile = path.join(os.tmpdir(), `wordlens-mt-echo-${process.pid}.json`);
  const echo = await translateTexts(["Echo this sentence."], { cacheFile: echoFile, cacheKey: "echo" });
  assert.deepEqual(echo, [""]);
  assert.equal(Object.keys(JSON.parse(fs.readFileSync(echoFile, "utf8"))).length, 0);
  assert.equal(foreignUrls.length, 0);
  try { fs.rmSync(echoFile, { force: true }); } catch { /* cleanup */ }

  // In the default route DeepL stays first; only rejected items reach Qwen.
  mode = "normal";
  const providers = {};
  const mixed = await translateAll(["A good sentence.", "Echo a fallback sentence."], {
    cacheFile, cacheKey: "mixed", context: "Article title: A match report",
    onProvider: (provider, count) => { providers[provider] = (providers[provider] || 0) + count; },
  });
  assert.deepEqual(mixed, ["译文：A good sentence.", "千问译文：Echo a fallback sentence."]);
  assert.deepEqual(providers, { deepl: 1, "qwen-mt": 1 });
  assert.equal(qwenRequests.length, 1);
  assert.deepEqual(qwenRequests[0].messages, [{ role: "user", content: "Echo a fallback sentence." }]);
  assert.deepEqual(qwenRequests[0].translation_options.source_lang, "English");
  assert.equal(qwenRequests[0].translation_options.target_lang, "Chinese");
  assert.match(qwenRequests[0].translation_options.domains, /A match report/);
  assert.equal(qwenRequests[0].model, "qwen-mt-plus");
  const cachedQwen = Object.values(JSON.parse(fs.readFileSync(cacheFile, "utf8"))).find(entry => entry.provider === "qwen-mt");
  assert.equal(cachedQwen.model, "qwen-mt-plus");
  const before = requests.length + qwenRequests.length;
  await translateAll(["A good sentence.", "Echo a fallback sentence."], { cacheFile, cacheKey: "mixed" });
  assert.equal(requests.length + qwenRequests.length, before, "both providers' caches should be reused");

  // Changing the Qwen model invalidates its cache without invalidating DeepL entries.
  process.env.QWEN_MT_MODEL = "qwen-mt-flash";
  await translateAll(["A good sentence.", "Echo a fallback sentence."], { cacheFile, cacheKey: "mixed" });
  assert.equal(requests.at(-1).text.length, 1);
  assert.equal(qwenRequests.at(-1).model, "qwen-mt-flash");
  process.env.QWEN_MT_MODEL = "qwen-mt-plus";

  // A whole DeepL outage falls back to independent single-text requests in order.
  mode = "deepl-down";
  const outage = await translateAll(["First source.", "Second source."], { cacheFile, cacheKey: "outage" });
  assert.deepEqual(outage, ["千问译文：First source.", "千问译文：Second source."]);
  assert.equal(qwenRequests.at(-2).messages[0].content, "First source.");
  assert.equal(qwenRequests.at(-1).messages[0].content, "Second source.");

  mode = "truncated";
  const truncated = await translateAll(["Must stay complete."], { cacheFile, cacheKey: "truncated", providers: ["qwen-mt"] });
  assert.deepEqual(truncated, [""]);
  mode = "qwen-echo";
  assert.deepEqual(await translateAll(["Reject this echo."], { cacheFile, cacheKey: "qwen-echo", providers: ["qwen-mt"] }), [""]);
  const finalCache = Object.values(JSON.parse(fs.readFileSync(cacheFile, "utf8")));
  assert.ok(!finalCache.some(entry => /Must stay complete|Reject this echo/.test(entry.text)));

  // Quota/auth failures stop subsequent sentences and batches in the same run.
  mode = "quota";
  const qwenBefore = qwenRequests.length;
  const stopped = createQwenMT("fixture-qwen");
  assert.deepEqual(await stopped(["One.", "Two."]), ["", ""]);
  assert.deepEqual(await stopped(["Three."]), [""]);
  assert.equal(qwenRequests.length, qwenBefore + 1);
  assert.equal(foreignUrls.length, 0);
  assert.equal(qwenMTBaseURL("https://workspace.cn-beijing.maas.aliyuncs.com/compatible-mode/v1/"), "https://workspace.cn-beijing.maas.aliyuncs.com/compatible-mode/v1");
  for (const unsafe of ["http://dashscope.aliyuncs.com/compatible-mode/v1", "https://example.test/compatible-mode/v1", "https://user:password@dashscope.aliyuncs.com/compatible-mode/v1", "https://dashscope.aliyuncs.com/compatible-mode/v1?key=fixture", "https://dashscope.aliyuncs.com.attacker.test/compatible-mode/v1"]) {
    assert.throws(() => qwenMTBaseURL(unsafe));
  }
  console.log("mt-test: DeepL priority / Qwen fallback / cache / truncation / quota checks passed");
} finally {
  try { fs.rmSync(cacheFile, { force: true }); } catch { /* cleanup */ }
}

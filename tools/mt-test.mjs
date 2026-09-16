#!/usr/bin/env node
/* 翻译回归：文章上下文必须进入 DeepL 请求，文章/方案缓存必须隔离；
 * 原文回显不能缓存，且应记录降级引擎。
 * 不访问真实服务，避免测试受网络、配额和供应商波动影响。 */

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const cacheFile = path.join(os.tmpdir(), `wordlens-mt-${process.pid}.json`);
const requests = [];
const providers = [];
process.env.DEEPL_KEY = "fixture:fx";
globalThis.fetch = async (url, init = {}) => {
  if (String(url).includes("aidemo.youdao.com/trans")) {
    return { ok: true, status: 200, async text() { return JSON.stringify({ errorCode: "0", translation: ["有道译文"] }); } };
  }
  if (!String(url).includes("api-free.deepl.com/v2/translate")) {
    throw new Error(`unexpected network request: ${url}`);
  }
  const body = JSON.parse(init.body);
  requests.push(body);
  return {
    ok: true,
    status: 200,
    async json() {
      return { translations: body.text.map(text => ({ text: text.startsWith("Echo") ? text : `译文：${text}` })) };
    },
  };
};

try {
  const { translateTexts } = await import("./lib-mt.mjs");
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
  assert.ok(Object.values(saved).some(value => value?.provider === "deepl" && value?.version === "mt-v2"));

  /* 同一原句换文章后必须重新请求，避免把代词按上一文章的语境复用。 */
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

  /* DeepL 原样回显不能进缓存，也不能直接落到 MyMemory；应先降级有道。 */
  const rejectFile = path.join(os.tmpdir(), `wordlens-mt-reject-${process.pid}.json`);
  const rejected = await translateTexts(["Echo this sentence."], {
    cacheFile: rejectFile,
    maxLines: 1,
    cacheNamespace: "reject-test",
    cacheKey: "article-c",
    onProvider: name => providers.push(name),
  });
  assert.deepEqual(rejected, ["有道译文"]);
  assert.equal(providers.at(-1), "youdao");
  try { fs.rmSync(rejectFile, { force: true }); } catch { /* ignore */ }

  console.log("mt-test: 8/8 passed");
} finally {
  try { fs.rmSync(cacheFile, { force: true }); } catch { /* ignore */ }
}

#!/usr/bin/env node
/* 文本清洗回归：拒绝供应商原样回显英文，保留正常中英混排译文。 */

import assert from "node:assert/strict";
import { cleanPara } from "./lib-text.mjs";

assert.equal(cleanPara({
  en: "The model changed the way people read.",
  cn: "The model changed the way people read.",
}), null);

assert.deepEqual(cleanPara({
  en: "The model changed the way people read.",
  cn: "这款模型改变了人们的阅读方式。",
}), {
  en: "The model changed the way people read.",
  cn: "这款模型改变了人们的阅读方式。",
});

assert.ok(cleanPara({
  en: "Mikel Arteta said the team had changed.",
  cn: "Mikel Arteta 表示，球队已经改变。",
}));

console.log("text-test: 3/3 passed");

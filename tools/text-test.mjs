#!/usr/bin/env node
/* 文本清洗回归：拒绝供应商原样回显英文，保留正常中英混排译文。 */

import assert from "node:assert/strict";
import { cleanPara } from "./lib-text.mjs";
import { applyGlossary } from "./lib-glossary.mjs";

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

/* 足球术语必须看英文原句：manager 可校正为主教练，owner 不得被同一规则误改。 */
assert.equal(applyGlossary("阿森纳老板", "The Arsenal manager spoke.", "ft-test"), "阿森纳主教练");
assert.equal(applyGlossary("阿森纳主帅", "The club owner spoke.", "ft-test"), "阿森纳老板");
assert.equal(applyGlossary("奥德加德打进一球", "Martin Ødegaard scored.", "ft-test"), "厄德高打进一球");
assert.equal(applyGlossary("老板任命了老板", "The owner appointed the manager.", "ft-test"), "老板任命了老板");
assert.equal(applyGlossary("老板任命了经理", "The owner appointed the manager.", "ft-test"), "老板任命了主教练");

console.log("text-test: 8/8 passed");

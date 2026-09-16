#!/usr/bin/env node
/* 文本清洗回归：拒绝供应商原样回显英文，保留正常中英混排译文。 */

import assert from "node:assert/strict";
import { cleanPara, splitSentences } from "./lib-text.mjs";
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

/* ── 断句回归（2026-09-16 补） ─────────────────────────────────────────
 * 这三条对应一次实测缺陷：ABBR 缩写表原先只写 `/g`，于是**只有小写形态被保护** ——
 * dankoe 那篇的 `I.e. A toddler hits when angry because…` 被切成 4 字符残片 `I.e.`
 * 加一个丢掉引导词的半句，一共 9 处。补上 `i` 标志后 `I.e.` / `i.e.` 同级。
 * 反过来 `no.` 是极常见的句末词（Anne Hathaway 篇 `Oh no. Because she's like a doll`），
 * 它**不能**被当成编号缩写 `No.` 保护 —— 所以 `No|Nos` 已从缩写表移除。 */
assert.equal(splitSentences(["I.e. A toddler hits when angry because the feeling is the same thing."]).length, 1);
assert.equal(splitSentences(["i.e. A toddler hits when angry because the feeling is the same thing."]).length, 1);
assert.equal(splitSentences(["She said no. And I asked why she had refused so firmly."]).length, 2);

/* 兜底路径的负向测试：`splitSentences` 的最后一道防线是「过闸的段落不能在断句阶段
 * 整体消失」。构造一个「所有片段都不足 SENT_MIN、但整段 ≥ SENT_FLOOR」的合成样本，
 * 确认兜底真的会触发 —— 否则那段代码永远不会被执行，等于没有守卫。 */
const frag = "A. b. C. d. E. f. G. h. I. j. K. l. M. n. O. p. Q. r. S. t.";
assert.ok(frag.length >= 40, "样本必须够长才会落进兜底分支");
assert.equal(splitSentences([frag]).length, 20);

console.log("text-test: 12/12 passed");

#!/usr/bin/env node
import {
  QUALITY_CANDIDATE_THRESHOLD, QUALITY_FORMAL_THRESHOLD, classifySourceHealth,
  difficultyBaseScore, emptySourceHealth, qualityScore, serverScore, updateSourceHealth,
} from "./recommend.mjs";

let pass = 0;
let fail = 0;
function ok(label, condition) {
  if (condition) { pass++; console.log(`✓ ${label}`); }
  else { fail++; console.log(`✗ ${label}`); }
}

const formal = qualityScore({
  sourceTier: 3,
  title: "An in-depth analysis of how people build resilient habits",
  desc: "A reported essay with evidence and practical context.",
  date: new Date().toISOString().slice(0, 10),
  words: 800,
  paragraphs: 7,
  sentences: 16,
  cover: true,
  images: 3,
});
const reject = qualityScore({
  sourceTier: 1,
  title: "Watch live quiz and odds roundup",
  date: new Date().toISOString().slice(0, 10),
  words: 90,
  paragraphs: 1,
  sentences: 2,
});
ok(`高质量文章进入正式档（${formal.value}）`, formal.value >= QUALITY_FORMAL_THRESHOLD && formal.band === "formal");
ok(`低价值短内容低于候选线（${reject.value}）`, reject.value < QUALITY_CANDIDATE_THRESHOLD && reject.band === "reject");
ok("服务端分数保持在 0–100", serverScore(formal.value, 20) <= 100 && serverScore(reject.value, 80) >= 0);

const vocab = new Set(["the", "team", "build", "a", "good", "habit", "people", "can"]);
const easy = difficultyBaseScore({
  sentences: ["The team can build a good habit.", "People can repeat the habit."],
  vocabulary: vocab,
});
const hard = difficultyBaseScore({
  sentences: ["Institutionalization transforms interdisciplinary communities through unprecedented experimentation."],
  vocabulary: vocab,
});
ok(`基础难度能区分易难（${easy} < ${hard}）`, easy < hard);

let health = emptySourceHealth("https://example.com/feed");
for (let i = 0; i < 3; i++) health = updateSourceHealth(health, "rss", { ok: false, status: 503, latencyMs: 100 });
ok("RSS 连续 3 次失败后熔断", health.rss.disabled && !classifySourceHealth(health));
for (let i = 0; i < 3; i++) health = updateSourceHealth(health, "rss", { ok: true, status: 200, latencyMs: 50 });
ok("RSS 连续 3 次成功后恢复", !health.rss.disabled && classifySourceHealth(health));
for (let i = 0; i < 3; i++) health = updateSourceHealth(health, "image", { ok: false, status: 404, latencyMs: 30 });
ok("图片熔断不影响文字来源可用性", health.image.disabled && classifySourceHealth(health));

console.log(`\n结果：${pass} 通过 / ${fail} 失败`);
process.exit(fail ? 1 : 0);


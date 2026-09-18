#!/usr/bin/env node
import {
  QUALITY_CANDIDATE_THRESHOLD, QUALITY_FORMAL_THRESHOLD, STAR_MIN_IMAGES, classifySourceHealth,
  difficultyBaseScore, emptySourceHealth, meetsImageGate, qualityScore, serverScore, updateSourceHealth,
  unreadableReason,
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

/* ---------- 明星栏目图片硬门槛（用户 2026-09-14 定）----------
 * 加分量级（最多 8 分）压不住 0—3 图的明星短讯，所以「图片多」必须是入选条件。
 * 实测库里 3 篇明星文章是 2 / 3 / 3 张图，全都该被挡掉。 */
ok(`明星栏目 ${STAR_MIN_IMAGES} 图准入门槛已导出`, STAR_MIN_IMAGES === 6);
ok("明星栏目 5 张图进不来", meetsImageGate("明星", 5) === false);
ok(`明星栏目正好 ${STAR_MIN_IMAGES} 张图可以进`, meetsImageGate("明星", STAR_MIN_IMAGES) === true);
ok("明星栏目 16 张图可以进", meetsImageGate("明星", 16) === true);
ok("明星栏目 0 张图被挡（旧库里的明星短讯就是这种）", meetsImageGate("明星", 0) === false);
ok("明星栏目缺图数字段按 0 处理", meetsImageGate("明星", undefined) === false);
ok("其他栏目不受图片门槛影响（成长 0 图仍可进）", meetsImageGate("成长", 0) === true);
ok("其他栏目不受图片门槛影响（足球 2 图仍可进）", meetsImageGate("足球", 2) === true);
ok("门槛可显式放宽（--imgs 之类的调参口）", meetsImageGate("明星", 3, 3) === true);
ok("足球直播指南会被内容门禁挡下", Boolean(unreadableReason({ cat: "足球", title: "How to watch the match FREE: Live streams" })));
ok("普通足球报道不被内容门禁误伤", !unreadableReason({ cat: "足球", title: "Why the new midfield changed the season" }));
ok("播客落地页会被内容门禁挡下", Boolean(unreadableReason({ cat: "成长", url: "https://fs.blog/knowledge-project-podcast/example/" })));
/* 带正文的长文不能被直播判据误伤 —— 判据只准打 title + url。
 * 实测（2026-09-18）：判据打 body 时，`watch .*?(?:live|online)` 在 fb-gerard-pique-a-long-story
 * 里从「watch television in Madrid」一路跨 700+ 字符，命中「the media world that we live in today」
 * 的 live → 一篇自述长文被判成直播指南、被 qc 拒收。
 * 关键：上面三条真阳性用例全都只给 title，测不出这个洞 —— 反向样本必须带正文。 */
ok("自述长文正文含 watch…live 不被误判为直播指南", !unreadableReason({
  cat: "足球",
  title: "A Long Story",
  url: "https://www.theplayerstribune.com/articles/gerard-pique-a-long-story",
  paras: [{ sentences: [
    { en: "If you watch television in Madrid, they'll tell you a very different story about me." },
    { en: "There are things going on in our lives, in the media world that we live in today." },
  ] }],
}));
ok("URL 形态的直播指南仍被挡下（判据收窄后没有失守）", Boolean(unreadableReason({
  cat: "足球",
  url: "https://example.com/how-to-watch-el-clasico-live-stream",
})));

console.log(`\n结果：${pass} 通过 / ${fail} 失败`);
process.exit(fail ? 1 : 0);

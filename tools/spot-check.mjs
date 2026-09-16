/* 词阅 WordLens —— 人工抽查材料生成器
 *
 * 为什么需要它：qc.mjs 能验的全是**结构**（字段、句数配平、编码、封面存在性），
 * 而“译得对不对”它验不了 —— 把一句英文译成“这是一句中文”照样过审。语义层必须人看。
 * 这个脚本不替代人，只把人该看的东西摆整齐，并把**高信噪比的可疑点**先标出来：
 * 数字对不上、否定关系反转、标题没译、专名前后不一致。低信噪比的规则（比如
 * “段落过短”，在播客转写里天然成立）刻意不做 —— 噪音多了人就懒得看了。
 *
 * 用法：
 *   node tools/spot-check.mjs                 # 按当前配额自动选足球 2 篇 + 人物 1 篇
 *   node tools/spot-check.mjs --id <文章id>    # 指定文章（可多次）
 *   node tools/spot-check.mjs --all           # 全部文章
 * 产出：tools/_spot/<日期>/index.html（对照材料）+ report.md（记录模板）
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATA = [
  "assets/data.js", "assets/data-words-bulk-a.js", "assets/data-words-full.js", "assets/data-words-mid.js",
  "assets/data-articles-extra.js", "assets/data-articles-archive.js", "assets/data-covers.js",
];
const noop = () => { };

/* ---------- 载入文章 ---------- */
const sandbox = { console, window: { addEventListener: noop }, document: { addEventListener: noop } };
sandbox.window.window = sandbox.window;
vm.createContext(sandbox);
for (const f of DATA) vm.runInContext(fs.readFileSync(path.join(ROOT, f), "utf8"), sandbox, { filename: f });
const ARTICLES = vm.runInContext("ARTICLES", sandbox);

const args = process.argv.slice(2);
const val = k => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : null; };
const ids = args.reduce((acc, a, i) => (a === "--id" ? acc.concat(args[i + 1]) : acc), []);

/* ---------- 算规模（选篇用） ---------- */
const sentsOf = a => {
  const out = [];
  (a.paras || []).forEach(p => {
    if (!p || p.img) return;
    if (Array.isArray(p.sentences)) p.sentences.forEach(s => out.push(s));
    else if (p.en) out.push(p);
  });
  return out;
};
const wordsOf = a => sentsOf(a).reduce((n, s) => n + ((s.en || "").match(/[A-Za-z][A-Za-z'-]*/g) || []).length, 0);

/* ---------- 选篇：先定“全文/节选”候选，再分层抽样 ---------- */
let picked;
if (args.includes("--all")) {
  picked = ARTICLES.slice();
} else if (ids.length) {
  picked = ids.map(id => ARTICLES.find(a => a.id === id)).filter(Boolean);
} else {
  /* 当前每日范围：足球最多抽 2 篇、人物最多抽 1 篇；成长存量不参与新增翻译抽查。
     --all / --id 仍可显式检查历史栏目。 */
  const football = ARTICLES.filter(a => a.cat === "足球").sort((x, y) => wordsOf(y) - wordsOf(x)).slice(0, 2);
  const people = ARTICLES.filter(a => a.cat === "人物").sort((x, y) => wordsOf(y) - wordsOf(x)).slice(0, 1);
  picked = [...football, ...people];
}

/* ---------- 预检：只做高信噪比的四项 ---------- */
const NEG_EN = /\b(not|no|never|nothing|none|neither|nor|without|cannot)\b|\b\w+n't\b|\bno one\b|\bnobody\b/i;
/* 中文表达否定远不止“不没未无”：实测 6 处命中全是这类误报 —— “缺乏神的智慧”、
 * “切勿外包”、“防守欠佳”、“完全有理由”（= no reason not to）、“才会有答案”。
 * 放宽只会漏报不会误报（单向检查），所以宁可宽。 */
const NEG_CN = /[不没未无别非]|缺乏|缺少|欠缺|欠佳|切勿|勿|免于|以免|避免|拒绝|否认|毫无|未能|无法|不足/;
/* 中文写阿拉伯数字或逐位汉字都算译到：2026 → “二零二六” */
const DIGIT_CN = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
const perDigit = d => (/^\d{3,}$/.test(d) ? [...d].map(c => DIGIT_CN[+c]).join("") : null);
/* 数字 token 规范化：去千分位逗号、保留小数点、不吃句末句点。
 * 抽数字时两边必须走同一个函数 —— 曾经英文侧保留 "3.0"、中文侧变成 "30"，
 * 于是每一句 “Human 3.0” 都被报成「数字对不上」。 */
const numTokens = s => (String(s).match(/\d[\d,]*(?:\.\d+)?/g) || []).map(t => t.replace(/,/g, ""));
/* 只挑「大概率该以阿拉伯形式出现」的数字：≥100 的整数、带小数的。
 * 1~20 这种小数字中文常写“三”“十二”，逐个报会把整篇刷成噪音 —— 实测放宽到全部
 * 数字时，最长一篇 468 句报了 162 处，人根本不会看。 */
const bigDigits = s => new Set(numTokens(s).filter(d => /^\d{3,}$/.test(d) || d.includes(".")));
const digits = s => new Set(numTokens(s));
/* “12 万”“1.2 亿”这类数量级写法：中文里有万/亿就放行 —— 不生成汉字数字，
 * 只为避免把正常的数量级译法报成漏译。 */
const hasMagnitude = (cn, d) => Number(d) >= 10000 && /[万亿]/.test(cn);

function precheck(a) {
  const issues = [];
  const sents = sentsOf(a);
  /* 1. 标题 */
  if (!a.titleZh || !String(a.titleZh).trim()) issues.push({ level: "high", where: "标题", note: "没有中文标题" });
  /* 2. 逐句：数字 / 否定 */
  sents.forEach((s, i) => {
    const en = String(s.en || ""), cn = String(s.cn || "");
    if (!en || !cn) return;
    const dc = digits(cn);
    const missing = [...bigDigits(en)].filter(d =>
      !dc.has(d) && !(perDigit(d) && cn.includes(perDigit(d))) && !hasMagnitude(cn, d));
    if (missing.length) {
      issues.push({ level: "high", where: `第 ${i + 1} 句`, note: `英文有数字 ${missing.join("、")}，中文里没找到`, en, cn });
    }
    /* 只做单向：英文有否定 → 中文必须有否定标记。
     * 反方向（中文有“不/无”英文没有）误报太多 —— “不过”“不仅”“无与伦比”都不是否定，
     * 实测双向时最长一篇报了 162 处，单向后降到 10 处出头。 */
    if (NEG_EN.test(en) && !NEG_CN.test(cn)) {
      issues.push({ level: "high", where: `第 ${i + 1} 句`, note: "英文是否定句，中文里没看到否定标记", en, cn });
    }
  });
  /* 3. 专名清单：出现 ≥2 次的大写开头词（排除句首），供人工核对译文是否统一 */
  const names = {};
  sents.forEach(s => {
    const en = String(s.en || "");
    /* 跳过句首那个词（句首大写不代表专名） */
    const body = en.replace(/^\s*["'(\[]?\s*[A-Z][a-z'-]*/, "");
    for (const m of body.matchAll(/\b([A-Z][a-z]{2,})\b/g)) names[m[1]] = (names[m[1]] || 0) + 1;
  });
  /* 功能词会被大写开头（尤其句首、引号后、破折号后），混进来就是噪音：
   * 实测第一版清单里 The×22 / This×14 / You×4 排在真人名前面。 */
  const STOP = new Set(("The This That These Those You Your Yours We Our He She His Her Its Their They Them What When Where Why How Who Whom Whose " +
    "And But Now Then There Here If So Because Or Nor For Yet As At By In On Of To From With Without " +
    "It Not No Do Does Did Done Have Has Had Will Would Can Could Should May Might Must Shall " +
    "One Two Three Four Five First Second Next Last New Old Many Much More Most Some Any All Both Each Every").split(" "));
  const proper = Object.entries(names)
    .filter(([w, n]) => n >= 2 && !STOP.has(w))
    .sort((x, y) => y[1] - x[1]).map(([w, n]) => `${w}×${n}`);
  /* 4. 末句：整篇是否有尾部截断，先看这一对 */
  const last = sents[sents.length - 1] || {};
  return { issues, proper, last, n: sents.length };
}

/* ---------- 输出 ---------- */
const stamp = new Date().toISOString().slice(0, 10);
const outDir = val("--out") || path.join(ROOT, "tools", "_spot", stamp);
fs.mkdirSync(outDir, { recursive: true });

const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const CHECKS = [
  "标题中译与正文意思一致",
  "数字 / 日期 / 百分比没有译错",
  "否定关系没有反转（not / no / never 是否落在译文里）",
  "人名、机构名全篇译法统一",
  "术语全篇统一（层级 vs 阶段、心流、通道、天职 —— 见 tools/term-glossary.json）",
  "方向 / 主语没有反转：谁对谁做了什么（实测把 feed it 译成「把它给…看」、把任务表现译成「进入心流的比例」）",
  "没有整句漏译、没有半句断掉",
  "中段没有被截断（正文长度与原文规模相称）",
  "配图贴在相关段落旁，不是随手插的",
  "长句读得通，不是词对词的硬译",
  "多义词按语境取义（release 在人生语境里是「松手」不是「软件发版」、rally 不是「连胜」）",
];

let html = `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>词阅 · 人工抽查材料 ${stamp}</title>
<style>
 body{margin:0;padding:24px;background:#f6f7f9;color:#1a1a1a;font:14px/1.7 -apple-system,"Segoe UI","Microsoft YaHei",sans-serif}
 h1{font-size:20px;margin:0 0 4px} .sub{color:#666;font-size:13px;margin-bottom:20px}
 .card{background:#fff;border:1px solid #e3e6ea;border-radius:10px;padding:18px;margin-bottom:22px}
 .card h2{font-size:16px;margin:0 0 2px} .meta{color:#666;font-size:12px;margin-bottom:12px}
 .checks{background:#f0f4ff;border-radius:8px;padding:10px 14px;margin:12px 0;font-size:13px}
 .checks li{margin:2px 0}
 .flag{background:#fff4f4;border-left:3px solid #d64545;padding:8px 12px;margin:8px 0;border-radius:4px;font-size:13px}
 .flag .where{font-weight:600;color:#a52a2a}
 .proper{background:#f7f7f2;border-radius:6px;padding:8px 12px;font-size:12.5px;color:#555;margin:8px 0}
 .row{display:flex;gap:14px;padding:7px 0;border-bottom:1px solid #f0f1f3}
 .row:last-child{border-bottom:0}
 .no{flex:0 0 42px;color:#9aa0a6;font-size:12px;text-align:right;padding-top:2px}
 .en{flex:1;font-family:Georgia,"Times New Roman",serif}
 .cn{flex:1;color:#333}
 .tpl{background:#fbfbfc;border:1px dashed #d6d9de;border-radius:8px;padding:14px;font-size:13px}
 .tpl code{background:#eef0f3;padding:1px 5px;border-radius:3px}
</style></head><body>
<h1>人工抽查材料 · ${stamp}</h1>
<div class="sub">共 ${picked.length} 篇。机器只标了高信噪比的可疑点；「读得懂但译错」这类只能靠人。
每篇先判「全文 / 节选」，再按清单逐项过。记录写进 <code>report.md</code>。</div>`;

const reportLines = [`# 人工抽查记录 · ${stamp}`, "", `共 ${picked.length} 篇。结论三态：**通过** / **发现问题** / **未核实**。`, ""];

for (const a of picked) {
  const { issues, proper, last, n } = precheck(a);
  const words = wordsOf(a);
  const bodyType = "待判（全文 / 节选）";
  html += `<div class="card">
  <h2>${esc(a.titleZh || a.title)}</h2>
  <div class="meta">${esc(a.cat)} · ${esc(a.source || "")} · ${words} 词 / ${n} 句 · ${esc(a.id)}</div>
  ${a.translation ? `<div class="meta">翻译完整性：${esc(a.translation.status || "unknown")} · 引擎：${esc(Object.keys(a.translation.providers || {}).join("、") || "未记录")}${a.translation.issues?.length ? ` · 告警 ${a.translation.issues.length} 条` : ""}</div>` : ""}
  <div class="meta"><b>正文类型：${bodyType}</b> —— 全文查中间与结尾是否缺失；节选查起止边界是否完整、是否标注了节选。</div>
  <div class="checks"><b>检查单</b><ul>${CHECKS.map(c => `<li>${esc(c)}</li>`).join("")}</ul></div>`;

  if (issues.length) {
    html += `<div><b>机器预检：${issues.length} 处请先看</b>
    <span class="sub">（命中≠有错：中文常用「缺乏 / 欠佳 / 完全有理由」表达否定，数字也可能改了写法）</span></div>`;
    for (const it of issues.slice(0, 20)) {
      html += `<div class="flag"><span class="where">${esc(it.where)}</span> · ${esc(it.note)}
      <div class="en" style="color:#555;font-size:12.5px">EN: ${esc(it.en)}</div>
      <div class="cn" style="font-size:12.5px">CN: ${esc(it.cn)}</div></div>`;
    }
    if (issues.length > 20) html += `<div class="sub">… 另有 ${issues.length - 20} 处，见控制台输出</div>`;
  } else {
    html += `<div class="flag" style="border-left-color:#3a8a3a;background:#f2faf2">机器预检：无数字/否定/标题层面的可疑点（<b>不代表译文正确</b>，只是这四项没抓到）</div>`;
  }

  if (proper.length) {
    html += `<div class="proper"><b>专名清单</b>（出现 2 次以上、非句首）：${esc(proper.slice(0, 24).join(" · "))}
    <br>→ 人工核对：这些名字在人名/机构名上的译法是否**前后统一**。</div>`;
  }
  html += `<div class="proper"><b>末句对照</b>（判断尾部是否截断）
    <div class="en" style="margin-top:4px">EN: ${esc((last.en || "").slice(0, 260))}</div>
    <div class="cn">CN: ${esc((last.cn || "").slice(0, 260))}</div></div>`;

  html += `<div style="margin-top:10px"><b>逐句对照</b></div>`;
  sentsOf(a).forEach((s, i) => {
    html += `<div class="row"><div class="no">${i + 1}</div>
      <div class="en">${esc(s.en)}</div><div class="cn">${esc(s.cn)}</div></div>`;
  });
  html += `</div>`;

  reportLines.push(`## ${a.titleZh || a.title}`, "",
    `- 标识：\`${a.id}\`　栏目：${a.cat}　来源：${a.source}　规模：${words} 词 / ${n} 句`,
    ...(a.translation ? [`- 翻译完整性：${a.translation.status || "unknown"}；引擎：${Object.keys(a.translation.providers || {}).join("、") || "未记录"}；告警：${a.translation.issues?.length || 0} 条`] : []),
    `- 正文类型：☐ 全文　☐ 节选（若是节选：☐ 边界完整　☐ 已标注节选）`,
    `- 结论：☐ 通过　☐ 发现问题　☐ 未核实`, "",
    `| 检查项 | 结果 | 位置 | 依据 |`, `| --- | --- | --- | --- |`,
    ...CHECKS.map(c => `| ${c} |  |  |  |`), "");
  if (issues.length) {
    reportLines.push(`机器预检命中 ${issues.length} 处（数字/否定/标题），位置：${issues.slice(0, 10).map(i => i.where).join("、")}${issues.length > 10 ? " …" : ""}`, "");
  }
}

html += `</body></html>`;
fs.writeFileSync(path.join(outDir, "index.html"), html);
fs.writeFileSync(path.join(outDir, "report.md"), reportLines.join("\n"));

/* ---------- 控制台摘要 ---------- */
console.log(`\n抽查材料已生成：${path.relative(ROOT, outDir)}/`);
console.log(`  index.html  对照材料（浏览器打开，逐句带序号）`);
console.log(`  report.md   记录模板（三态 + 检查单）\n`);
for (const a of picked) {
  const { issues, n } = precheck(a);
  console.log(`· ${a.cat}｜${(a.titleZh || a.title).slice(0, 30)}  ${wordsOf(a)} 词 / ${n} 句 · 预检 ${issues.length} 处`);
  for (const it of issues.slice(0, 3)) console.log(`    ${it.where} · ${it.note}`);
}
const total = picked.reduce((s, a) => s + precheck(a).issues.length, 0);
console.log(`\n机器预检合计 ${total} 处。这些只是"值得先看"的位置，不是结论 ——`);
console.log(`语义层（读得懂但译错、人名不统一、中段截断）必须人工判断。\n`);

#!/usr/bin/env node
/* 词阅 WordLens —— 文案体检（乱码 / 漏译 / 结构缺陷）
 *
 * 用法： node tools/text-scan.js [--full]
 *   --full  打印每条问题所在文章的 id / 段落号 / 前后文
 *
 * 检查项：
 *   1. 译文残留有道批量翻译占位符 <e:N> / <s:N>
 *   2. 正文混进网页脚本（广告、埋点、相关阅读导航）
 *   3. HTML 实体未解码、残留标签、U+FFFD 替换字符、UTF-8 二次解码乱码
 *   4. 遗漏的不可见字符（LRM/RLM、零宽空格、软连字符）
 *   5. 译文缺失、译文无中文（漏译）、译文与原文完全相同
 *   6. 段落字段缺失、段落不是对象（纯配图段 {img,cap} 不算缺陷）
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
/* ASSETS 可被环境变量覆盖 —— 专给负向测试用：tools/guards-test.mjs 的 F 节会造一个
 * 隔离样本目录（只含 1 篇人造文章），注进假阳性 / 真阳性样本后跑本脚本，
 * 确认判据收紧后假阳性不报、真阳性仍报。2026-09-18 加。 */
const ASSETS = process.env.WORDLENS_TEXTSCAN_ASSETS || path.join(ROOT, "assets");
const FULL = process.argv.includes("--full");

function load(file, name) {
  const src = fs.readFileSync(path.join(ASSETS, file), "utf8");
  const m = src.match(new RegExp("const\\s+" + name + "\\s*=\\s*"));
  if (!m) return null;
  const rest = src.slice(m.index + m[0].length);
  const start = rest.indexOf("[");
  let depth = 0, inStr = false, esc = false, end = -1;
  for (let i = start; i < rest.length; i++) {
    const ch = rest[i];
    if (inStr) {
      if (esc) esc = false;
      else if (ch === "\\") esc = true;
      else if (ch === '"') inStr = false;
      continue;
    }
    if (ch === '"') inStr = true;
    else if (ch === "[") depth++;
    else if (ch === "]") { depth--; if (!depth) { end = i; break; } }
  }
  return JSON.parse(rest.slice(start, end + 1));
}

const GROUPS = [
  ["内置", load("data.js", "ARTICLES") || []],
  ["抓取", load("data-articles-extra.js", "ARTICLES_EXTRA") || []],
  ["归档", load("data-articles-archive.js", "ARTICLES_ARCHIVE") || []],
];

/* ---------- 规则 ---------- */

const AD_CODE = /blogherads|\bpmcCnx\b|defineSlot|setTargeting|setSubAdUnitPath|setClsOptimization|switchToHarmonyPlayer|isEventAdScheduledTime|googletag|\badq\s*\.|\bwindow\.\s*\w|\bdocument\.\s*(getElementById|querySelector|write)|\.push\s*\(\s*function/i;
const NAV_PREFIX = /^\s*(Related Stories|Related Articles|Popular on|Trending|Recommended|More from|Also on|Also read|Read next|You may also like|Sponsored|Advertisement|Sign up for|Subscribe to|Skip to)\b/i;
const BARE_LINK = /^\s*(https?:\/\/|pic\.twitter\.com|www\.)\S*(\s+(https?:\/\/|pic\.twitter\.com|www\.)\S*)*\s*$/i;

const RULES = [
  { id: "placeholder", label: "未清理的翻译占位符", re: /<\/?[es]:\d+>/g },
  { id: "script", label: "正文混进网页脚本", re: AD_CODE },
  { id: "nav", label: "正文混进导航/相关阅读", re: NAV_PREFIX },
  { id: "link", label: "整段只有链接", re: BARE_LINK },
  { id: "entity", label: "HTML 实体未解码", re: /&(?:amp|quot|apos|lt|gt|nbsp|#\d+|#x[0-9a-fA-F]+);/g },
  { id: "replacement", label: "替换字符 U+FFFD", re: /\uFFFD/g },
  { id: "invisible", label: "不可见控制字符", re: /[\u00AD\u200B-\u200F\u202A-\u202E\u2060\uFEFF]/g },
  {
    id: "mojibake",
    label: "UTF-8 二次解码乱码",
    /* â€™ / Ã© / ï¼ˆ 这类：一个拉丁扩展字母紧跟着另一个扩展/符号字符 */
    re: /[\u00C2-\u00DF\u00E0-\u00FF][\u0080-\u00BF\u20AC\u201A\u201E\u2026\u2018\u2019\u201C\u201D\u2122]/g,
  },
  {
    id: "markdown",
    label: "残留 Markdown 标记",
    /* 2026-09-18 修正：原来裸匹配 `**`，把脏话的自我审查星号全打成 markdown ——
     * 实测 5 处假阳性全是 The Players' Tribune 原文的打码写法：f***ed / F*****g / sh**。
     * 判据加「`**` 前不得紧邻字母或星号」：真 markdown 的 `**` 总落在词界（`**bold**`
     * 前面是行首 / 空格 / 标点），打码星号总嵌在词内（`f***ed` 的 `**` 前是 f）
     * 或连成 ≥3 颗（`F*****g`）。
     * 反例（必须仍报）：`**bold**` —— 前是行首/空格 → 命中。负向测试见 guards-test.mjs F 节。 */
    re: /(?<![A-Za-z*])\*\*(?!\*)|__|\[[^\]]*\]\([^)]*\)/g,
  },
];

const CJK = /[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF\u3040-\u30FF]/;

/* ---------- 执行 ---------- */

const report = [];
const byRule = new Map();
const add = (rule, label, group, id, detail) => {
  report.push({ rule, label, group, id, detail });
  byRule.set(rule, (byRule.get(rule) || 0) + 1);
};

let totalArticles = 0, totalParas = 0, imageParas = 0, blankCaps = 0;

for (const [group, list] of GROUPS) {
  totalArticles += list.length;
  for (const art of list) {
    const id = art && art.id ? art.id : "(无 id)";
    const paras = Array.isArray(art && art.paras) ? art.paras : null;
    if (!paras) { add("struct", "缺少 paras 字段", group, id, ""); continue; }
    if (!paras.length) add("struct", "paras 为空", group, id, "");
    if (!String(art.title || "").trim()) add("struct", "标题为空", group, id, "");
    if (!String(art.source || "").trim()) add("struct", "来源为空", group, id, "");

    /* 标题译文：卡片、发现页精选、阅读页都在英文标题下渲染这行中文小字，
       缺了就等于「只看得见英文」；正文那套乱码规则同样要过一遍。 */
    const tzh = String(art.titleZh || "").trim();
    if (!tzh) add("title", "缺中文标题", group, id, "");
    else {
      if (!CJK.test(tzh)) add("title", "中文标题无汉字", group, id, tzh.slice(0, 36));
      if (tzh === String(art.title || "").trim()) add("title", "中文标题与原文相同", group, id, "");
      if (/[\u4e00-\u9fff][A-Za-z]|[A-Za-z][\u4e00-\u9fff]/.test(tzh))
        add("title", "中文标题中英未留白", group, id, tzh.slice(0, 36));
      for (const r of RULES) {
        r.re.lastIndex = 0;
        const m = tzh.match(r.re);
        if (m) add(r.id, r.label, group, id, "titleZh → " + JSON.stringify([...new Set(m)].slice(0, 3)));
      }
    }

    paras.forEach((p, i) => {
      totalParas++;
      const at = "第 " + (i + 1) + " 段";
      if (!p || typeof p !== "object") { add("struct", "段落不是对象", group, id, at); return; }

      /* 纯配图段：只有 img/cap 是正常的，不参与译文检查 */
      if (p.img) {
        imageParas++;
        if (!String(p.cap || "").trim()) blankCaps++;
        for (const r of RULES) {
          const m = String(p.cap || "").match(r.re);
          if (m) add(r.id, r.label, group, id, at + " · cap → " + JSON.stringify(m.slice(0, 3)));
        }
        return;
      }

      const sentences = Array.isArray(p.sentences) ? p.sentences : [p];
      if (!sentences.length) { add("struct", "段落为空", group, id, at); return; }
      sentences.forEach((s, j) => {
        const sat = Array.isArray(p.sentences) ? `${at} · 第 ${j + 1} 句` : at;
        const en = typeof s?.en === "string" ? s.en : "";
        const cn = typeof s?.cn === "string" ? s.cn : typeof s?.zh === "string" ? s.zh : "";
        if (!en.trim()) add("struct", "原文为空", group, id, sat);
        if (!cn.trim()) add("translate", "译文缺失", group, id, sat);
        else {
          /* 2026-09-18 修正：原判据「cn 里没有 CJK 就算漏译」实测 6 处假阳性全是分句碎片 ——
           * `….` / `…………..` 的译文是 `……`（正确），皮克篇 p37「一字一顿」被逐词切开后
           * `That?!` 的译文落在 `？！`（也正确，中文的「那」在前一块）。
           * 真正的漏译形态是「译文里没有中文、却带着拉丁字母」= 把原文照抄进 cn 没翻。
           * 反例（必须仍报）：cn = "This is a test."（无中文、有字母）。
           * 2026-09-18 二次收紧：访谈里 "HM: ..." 这类「说话人缩写 + 省略号」碎片的译文
           * "HM：……"（Weisz 篇 p76，全库实测仅此 1 处）——说话人标签保留原文缩写是对的，
           * 不算漏译；带实际英文内容的（"HM: Yeah, ..." → 译文照抄正文）仍必须报。 */
          const SPEAKER_ELLIPSIS = /^(?:[A-Z]{1,3})\s*[：:]\s*[…。.]*$/;
          /* 2026-09-20 第三次收紧：书单/参考文献行。cn 形如 `《书名》作者名`，书名保留原文是
           * **刻意的**（官方译本如此），全库实测仅 ob-breakdown-of-firms-c08 p14 一处：
           * `《Holacracy: The New Management System for a Rapidly Changing World》Brian J. Robertson`
           * 与同句英文同形。判据要求 `《》` 落在句首且带内容 —— 真漏译（cn 照抄一整句英文）
           * 不会以书名号开头。反例见 guards-test.mjs F7/F8。 */
          const BOOK_CITE = /^\s*《[^》]{2,}》/;
          if (!CJK.test(cn) && en.trim() && /[A-Za-z]/.test(cn) && !SPEAKER_ELLIPSIS.test(cn.trim()) && !BOOK_CITE.test(cn)) add("translate", "译文无中文（疑似漏译）", group, id, sat);
          if (en.trim() && cn.trim() === en.trim()) add("translate", "译文与原文相同", group, id, sat);
        }

        for (const field of ["en", "cn"]) {
          const t = typeof s?.[field] === "string" ? s[field] : "";
          if (!t) continue;
          for (const r of RULES) {
            r.re.lastIndex = 0;
            const m = t.match(r.re);
            if (m) add(r.id, r.label, group, id, sat + " · " + field + " → " + JSON.stringify([...new Set(m)].slice(0, 3)));
          }
        }
      });
    });
  }
}

/* ---------- 输出 ---------- */

console.log("词阅 WordLens · 文案体检");
console.log("扫描 " + totalArticles + " 篇 / " + totalParas + " 段（其中配图段 " + imageParas + " 段，无图注 " + blankCaps + " 段）\n");

const ORDER = ["struct", "title", "placeholder", "script", "nav", "link", "entity", "replacement", "invisible", "mojibake", "translate", "markdown"];

if (!report.length) {
  console.log("通过：未发现乱码、漏译或结构缺陷。");
} else {
  const labelOf = {};
  for (const r of report) labelOf[r.rule] = r.label;
  const keys = [...ORDER, ...[...byRule.keys()].filter(k => !ORDER.includes(k))].filter(k => byRule.has(k));
  console.log("发现 " + report.length + " 处问题：");
  for (const k of keys) console.log("  · " + labelOf[k] + "（" + k + "）：" + byRule.get(k) + " 处");

  if (FULL) {
    console.log("");
    for (const k of keys) {
      const items = report.filter(r => r.rule === k);
      console.log("— " + labelOf[k] + " —");
      for (const it of items.slice(0, 60)) console.log("  [" + it.group + "] " + it.id + " " + it.detail);
      if (items.length > 60) console.log("  ... 其余 " + (items.length - 60) + " 处省略");
    }
  } else {
    console.log("\n（加 --full 查看每处位置）");
  }
}

process.exitCode = report.length ? 1 : 0;

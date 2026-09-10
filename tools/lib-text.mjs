/* 词阅 WordLens —— 文案清洗库
 *
 * 抓取流水线（tools/ingest.mjs）与数据修复（tools/fix-text.mjs）共用同一套规则，
 * 保证「新抓的」和「已存在的」文章走同样的清洗标准。
 *
 * 处理三类问题：
 *   1. 机器翻译残留：有道的 <s:N> / <e:N> 占位符、中文里的空格错位
 *   2. 网页垃圾：源站把广告脚本、相关阅读导航塞进 <p>，被当作正文抓了进来
 *   3. 不可见字符：LRM/RLM、零宽空格、软连字符等
 */

import fs from "node:fs";

/* ---------------- 1. 不可见字符 ---------------- */

const INVISIBLE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u00AD\u200B-\u200F\u202A-\u202E\u2060\u2066-\u2069\uFEFF\uFFFD]/g;

export const cleanInvisible = s => String(s == null ? "" : s).replace(INVISIBLE, "");

/* ---------------- 2. 网页垃圾 ---------------- */

/* 广告/埋点脚本特征：命中即认定这段不是正文 */
const AD_CODE = /blogherads|\bpmcCnx\b|defineSlot|setTargeting|setSubAdUnitPath|setClsOptimization|switchToHarmonyPlayer|isEventAdScheduledTime|googletag|\badq\s*\.|\bwindow\.\s*\w|\bdocument\.\s*(getElementById|querySelector|write)|\.push\s*\(\s*function|\bfunction\s*\(\s*\)\s*\{/i;

/* 导航/相关阅读前缀：整段都不是正文 */
const NAV_PREFIX = /^\s*(Related Stories|Related Articles|Popular on|Trending|Recommended|More from|More in|Also on|Also read|Read next|You may also like|Sponsored|Advertisement|Sign up for|Subscribe to|Skip to)\b/i;

/* 整段只有链接（推文尾巴、图床页脚） */
const BARE_LINK = /^\s*(https?:\/\/|pic\.twitter\.com|www\.)\S*(\s+(https?:\/\/|pic\.twitter\.com|www\.)\S*)*\s*$/i;

export const hasAdCode = t => AD_CODE.test(String(t || ""));

/** 整段是否为归零垃圾（整段丢弃） */
export function isJunkPara(t) {
  const s = String(t || "").trim();
  if (!s) return true;
  if (NAV_PREFIX.test(s)) return true;
  if (BARE_LINK.test(s)) return true;
  return false;
}

/** 段内夹带的脚本：从脚本特征处截断，保留前面的真句子 */
export function stripInlineJunk(t) {
  const s = String(t || "");
  const m = s.search(AD_CODE);
  if (m < 0) return s;
  return s.slice(0, m).replace(/[\s:：,，;；、\-–—(（]+$/, "").trim();
}

/* ---------------- 3. 机器翻译残留 ---------------- */

/* 有道的批量接口会把原文里的变音字符（é č ć …）保护成 <s:N>…<e:N>，
   个别情况下保护标记没被还原就落进了译文。这里用英文原句把字符找回来。 */
const PLACEHOLDER_TEST = /<\/?[se]:\d+>/;
const PLACEHOLDER_FIND = /<\/?[se]:\d+>/;   // 非全局：每次从头找，index 才可靠

/* 带变音符的字母：拉丁扩展 A/B、组合附加符号（é 可能是 e+U+0301 的分解写法）、拉丁扩展附加 */
const ACCENT = "\\u00C0-\\u024F\\u0300-\\u036F\\u1E00-\\u1EFF";
const ACCENTED_WORD = new RegExp(`[A-Za-z${ACCENT}'’-]*[${ACCENT}][A-Za-z${ACCENT}'’-]*`, "g");

/**
 * 还原译文里残留的翻译占位符。
 * 策略：占位符前面通常正好是被保护词的拉丁词干（cl<s:1> / guilloch<s:1> / kova<e:1>），
 * 拿词干去英文原句里找同前缀的带变音符词，整词替换回去；找不到就静默删除——
 * 宁可少一个字符，也绝不把 <e:1> 这种令牌留在页面上。
 * @param {string} cn 译文
 * @param {string} en 对应英文原句
 */
export function repairPlaceholders(cn, en = "") {
  const src = String(cn || "");
  if (!PLACEHOLDER_TEST.test(src)) return src;

  const candidates = [...String(en || "").matchAll(ACCENTED_WORD)].map(m => m[0]);
  let out = "";
  let rest = src;

  for (let guard = 0; guard < 64; guard++) {
    const m = PLACEHOLDER_FIND.exec(rest);
    if (!m) { out += rest; break; }
    const head = rest.slice(0, m.index);
    const frag = (head.match(/[A-Za-z\u00C0-\u024F'’\-]+$/) || [""])[0];
    const word = frag
      ? candidates.find(w => w.length > frag.length && w.toLowerCase().startsWith(frag.toLowerCase()))
      : null;

    out += word ? head.slice(0, head.length - frag.length) + word : head;
    rest = rest.slice(m.index + m[0].length);
  }
  return out;
}

/* 人工校对表：机器翻译的高频硬伤。
   与 ingest.mjs 的 CN_POST 同一性质——只修已知的错译，不做语义改写。 */
const CN_FIXES = [
  /* 塞尔维亚导演 Filip Kovačević：有道把外文名拆错，直译成「科瓦伊·埃维奇」 */
  [/（\s*Filip\s+Kovačević\s+eviki\s*）/g, "（Filip Kovačević）"],
  [/科瓦伊·埃维奇/g, "科瓦切维奇"],
  /* 品牌名逐字直译 */
  [/\bclé de Peau beauté\b/gi, "Clé de Peau Beauté"],
  [/\bClé de Peau beauté\b/g, "Clé de Peau Beauté"],
];

export const applyFixes = s => CN_FIXES.reduce((t, [re, to]) => t.replace(re, to), String(s || ""));

/* ---------------- 3.5 标题译文 ---------------- */

/* 标题里专名（Fetterman / Arsenal / Netflix）密度很高，机器翻译常把英文
   直接贴在汉字上（"Arteta解释了Odegaard的新角色"），读起来是糊的。这里在
   拉丁字母与汉字之间补一个空格——中文排版里「汉字与西文之间留 1/4 空格」的
   通行做法，不改动任何字词。只处理字母，不碰数字（"第29届""打进6个球"
   在中文里本来就不空）。 */
const CJK_RANGE = "\\u4e00-\\u9fff\\u3400-\\u4dbf";

export const spaceCJK = s => String(s || "")
  .replace(new RegExp(`([${CJK_RANGE}])([A-Za-z])`, "g"), "$1 $2")
  .replace(new RegExp(`([A-Za-z])([${CJK_RANGE}])`, "g"), "$1 $2");

const TITLE_PLACEHOLDER = /<\/?[se]:\d+>/g;

/**
 * 清洗一条标题译文。返回空串表示这条不能用（没译出来 / 原样退回英文）。
 * @param {string} cn 机器译文
 * @param {string} en 英文原标题，用来兜底比对
 */
export function cleanTitleZh(cn, en = "") {
  let t = cleanInvisible(String(cn == null ? "" : cn)).replace(TITLE_PLACEHOLDER, "");
  t = tidySpace(t.replace(/\s*\n+\s*/g, " "));
  t = t.replace(/^[\s"'“”‘’]+|[\s"'“”‘’]+$/g, "");
  t = t.replace(/[。．]+$/, "");                 // 标题不用句末句号，与英文标题风格一致
  t = t.replace(/\s*[，、]\s*/g, "，");           // 全角标点不留空格
  t = spaceCJK(t);
  if (!/[\u4e00-\u9fff]/.test(t)) return "";      // 没有汉字 = 没翻出来
  if (t === String(en || "").trim()) return "";
  return t;
}

/**
 * 把 titleZh 插到 title 之后，返回新对象——保证三份数据文件里字段顺序一致。
 * 注意：已译过的文章本来就有 titleZh 键，必须跳过它，否则会拿旧值覆盖新译文。
 */
export function putTitleZh(art, zh) {
  const out = {};
  for (const k of Object.keys(art)) {
    if (k === "titleZh") continue;
    out[k] = art[k];
    if (k === "title") out.titleZh = zh;
  }
  if (!("titleZh" in out)) out.titleZh = zh;      // 极端情况：没有 title 字段
  return out;
}

/* ---------------- 4. 译文留白 ---------------- */

/* 机器翻译会在全角标点旁边留下半角空格（"他说： “……”、“…… ，然后”），
   中文里读起来很别扭。这里只收拾标点两侧的空格，不动中英之间的间隔，
   也不碰引号相邻的情况（"…" "…" 之间的空格留着更好读）。 */
const SPACE_FIXES = [
  [/([，。、；：？！）】》〉…”])[ \t]+/g, "$1"],
  [/[ \t]+([）”）])/g, "$1"],
  [/\s{2,}/g, " "],
];

export const tidySpace = s => SPACE_FIXES.reduce((t, [re, to]) => t.replace(re, to), String(s || "")).trim();

/* ---------------- 组合接口 ---------------- */

/** 清洗一个 { en, cn } 段落；返回 null 表示这一段应当整段丢弃 */
export function cleanPara(p) {
  if (!p || typeof p !== "object") return null;
  if (p.img) return p;                                   // 内嵌配图段原样保留

  const enRaw = cleanInvisible(p.en || "");
  const cnRaw = cleanInvisible(p.cn || "");

  /* 英文正文是真实报道原文，只允许删掉混进来的脚本和不可见字符，不做任何改写 */
  const en = stripInlineJunk(enRaw).trim();

  let cn = repairPlaceholders(cnRaw, enRaw);
  cn = applyFixes(tidySpace(stripInlineJunk(cn))).normalize("NFC");

  if (!en || !cn) return null;                            // 没译出来就不给空对照
  if (isJunkPara(en) || isJunkPara(cn)) return null;
  /* 广告脚本被截断后只剩残句的，整段丢掉；正常短句（"So, what changed?"）保留 */
  if (hasAdCode(enRaw) && en.length < 25) return null;
  if (hasAdCode(cnRaw) && cn.length < 12) return null;
  return { en, cn };
}

/** 清洗一篇文章的 paras */
export function cleanParas(paras) {
  const out = [];
  for (const p of paras || []) {
    const c = cleanPara(p);
    if (c) out.push(c);
  }
  return mergeSplitSentences(out);
}

/* ---------------- 4.5 粘回被缩写句号劈开的句子 ---------------- */

/* 断句时把 "said Republican Rep." 的句号当成句尾，一句话被劈成两段：
   前一段是半截话，译文也跟着只剩半截——读者看到的就是"翻译坏了"。
   这里把这类被劈开的段落重新粘回去（两段都是原文，只做拼接，不改写）。 */
const SPLIT_TAIL = /\b(Mr|Mrs|Ms|Dr|Prof|Sr|Jr|St|No|vs|etc|Co|Inc|Ltd|Corp|Bros|Assoc|Univ|Dept|Est|Vol|Fig|approx|Ave|Blvd|Rd|Capt|Cpl|Sgt|Lt|Col|Gen|Adm|Maj|Cmdr|Pvt|Sen|Rep|Gov|Rev|Hon|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sept|Oct|Nov|Dec|U\.S|U\.K)\.$/;

export function mergeSplitSentences(paras) {
  const out = [];
  for (const p of paras || []) {
    const prev = out[out.length - 1];
    if (prev && !prev.img && !p.img && SPLIT_TAIL.test(prev.en)) {
      prev.en = prev.en + " " + p.en;
      /* 半截句的译文中如果还带着句号，换成逗号再往下接 */
      prev.cn = prev.cn.replace(/[。．.]+$/, "，") + p.cn;
      continue;
    }
    out.push(p);
  }
  return out;
}

/* ---------------- 5. 数据文件读写 ---------------- */

/** 把文件拆成「头部 + 数组字面量 + 尾部」，数组字面量按括号配平切出（跳字符串内部）。
 *  这样 data.js 里 ARTICLES 后面还有别的声明也不会被误伤。 */
export function splitDecl(src, name) {
  const m = src.match(new RegExp(`const\\s+${name}\\s*=\\s*`));
  if (!m) return null;
  const head = src.slice(0, m.index + m[0].length);
  const rest = src.slice(m.index + m[0].length);
  const start = rest.indexOf("[");
  if (start < 0) return null;

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
  if (end < 0) return null;
  return { head, body: rest.slice(start, end + 1), tail: rest.slice(end + 1) };
}

/** 读取某个数据文件里的数组声明 */
export function readDecl(file, name) {
  const src = fs.readFileSync(file, "utf8");
  const parts = splitDecl(src, name);
  if (!parts) return null;
  return { src, parts, value: JSON.parse(parts.body) };
}

/** 写回数组（保持文件其余部分逐字节不变），无变化时返回 false */
export function writeDecl(file, name, value) {
  const src = fs.readFileSync(file, "utf8");
  const parts = splitDecl(src, name);
  if (!parts) return false;
  const next = parts.head + JSON.stringify(value, null, 2) + parts.tail;
  if (next === src) return false;
  fs.writeFileSync(file, next);
  return true;
}

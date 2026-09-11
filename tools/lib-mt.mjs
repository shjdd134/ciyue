/* 词阅 WordLens —— 机器翻译库
 *
 * 抓取流水线（tools/ingest.mjs）翻正文、标题翻译（tools/translate-titles.mjs）翻标题，
 * 共用同一份磁盘缓存与同一套接口调用策略：DeepL 为主、有道兜底、MyMemory 末位。
 *
 * 有道公开接口支持「一次多行」，返回也按行对应，把请求数压到 1/N；
 * 行数对不上时（被限流截断）先退避整批重试，仍不行才逐行重发。
 */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

/** 默认缓存位置：与 ingest.mjs 共用同一份，抓正文与翻标题不会重复请求 */
export const CACHE_FILE = path.join(import.meta.dirname, ".mt-cache.json");

export const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

export const sleep = ms => new Promise(r => setTimeout(r, ms));

/* ---------------- 缓存 ---------------- */

const hash = s => crypto.createHash("md5").update(s).digest("hex").slice(0, 16);

export function loadCache(file) {
  try { return JSON.parse(fs.readFileSync(file, "utf8")) || {}; } catch { return {}; }
}

export function saveCache(file, cache) {
  try { fs.writeFileSync(file, JSON.stringify(cache, null, 0)); } catch { /* 缓存写不进去不影响主流程 */ }
}

/* ---------------- 实体解码 ---------------- */

const NAMED = {
  eacute: "é", egrave: "è", ecirc: "ê", euml: "ë", aacute: "á", agrave: "à", acirc: "â", auml: "ä", aring: "å", atilde: "ã", aelig: "æ",
  ccedil: "ç", iacute: "í", igrave: "ì", icirc: "î", iuml: "ï", ntilde: "ñ",
  oacute: "ó", ograve: "ò", ocirc: "ô", ouml: "ö", otilde: "õ", oslash: "ø",
  uacute: "ú", ugrave: "ù", ucirc: "û", uuml: "ü", yacute: "ý", yuml: "ÿ", szlig: "ß",
  Eacute: "É", Egrave: "È", Ecirc: "Ê", Euml: "Ë", Aacute: "Á", Agrave: "À", Acirc: "Â", Auml: "Ä", Aring: "Å", Atilde: "Ã", AElig: "Æ",
  Ccedil: "Ç", Iacute: "Í", Igrave: "Ì", Icirc: "Î", Iuml: "Ï", Ntilde: "Ñ",
  Oacute: "Ó", Ograve: "Ò", Ocirc: "Ô", Ouml: "Ö", Otilde: "Õ", Oslash: "Ø",
  Uacute: "Ú", Ugrave: "Ù", Ucirc: "Û", Uuml: "Ü", Yacute: "Ý", OElig: "Œ", oelig: "œ",
  ldquo: "“", rdquo: "”", lsquo: "‘", rsquo: "’", hellip: "…", mdash: "—", ndash: "–",
  middot: "·", laquo: "«", raquo: "»", deg: "°", times: "×", copy: "©", reg: "®", trade: "™",
  nbsp: " ", amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", "#39": "'",
};

export function decodeEntities(s) {
  return String(s == null ? "" : s)
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(+d))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&([a-zA-Z][a-zA-Z0-9]{1,7});/g, (m, n) => (n in NAMED ? NAMED[n] : m))
    .normalize("NFC");
}

/* ---------------- 网络 ---------------- */

async function get(url, tries = 3, timeout = 25000) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": UA, "Accept-Language": "en-US,en;q=0.9" },
        signal: AbortSignal.timeout(timeout),
      });
      if (res.ok) return await res.text();
      if (res.status === 403 || res.status === 404) return "";
    } catch { /* 重试 */ }
    await sleep(600 * (i + 1));
  }
  return "";
}

/* ---------------- 翻译引擎 ---------------- */

/** DeepL 密钥：环境变量优先（GitHub Actions secret），本地回落 tools/.deepl-key（不入库） */
export function deepLKey() {
  if (process.env.DEEPL_KEY) return process.env.DEEPL_KEY.trim();
  try {
    const f = path.join(import.meta.dirname, ".deepl-key");
    if (fs.existsSync(f)) return fs.readFileSync(f, "utf8").trim();
  } catch { /* 读不到就没有 */ }
  return "";
}

/**
 * DeepL（主力引擎，质量最好）：一次送一批文本（text 数组），返回按序译文。
 * key 以 :fx 结尾 = 免费档，走 api-free.deepl.com。返回 null 表示本次不可用，调用方降级有道。
 */
export function createDeepL(key) {
  key = key || deepLKey();
  if (!key) return null;
  const base = key.endsWith(":fx") ? "https://api-free.deepl.com" : "https://api.deepl.com";
  return async function deepl(lines) {
    for (let i = 0; i < 2; i++) {
      try {
        const res = await fetch(base + "/v2/translate", {
          method: "POST",
          headers: { "Authorization": "DeepL-Auth-Key " + key, "Content-Type": "application/json" },
          body: JSON.stringify({ text: lines, target_lang: "ZH", preserve_formatting: true }),
          signal: AbortSignal.timeout(30000),
        });
        if (res.status === 429) { await sleep(2000 * (i + 1)); continue; }   // 限流退避
        if (!res.ok) { console.warn("  ! DeepL HTTP", res.status); return null; }
        const j = await res.json();
        const out = (j.translations || []).map(t => decodeEntities((t.text || "").trim()));
        return out.length === lines.length ? out : null;
      } catch { await sleep(1500 * (i + 1)); }
    }
    return null;
  };
}

/** 有道（公开演示接口）：一次可送多行，返回值按行对应 */
export async function youdao(text, tries = 4) {
  for (let i = 0; i < tries; i++) {
    const body = await get(`https://aidemo.youdao.com/trans?from=en&to=zh-CHS&q=${encodeURIComponent(text)}`, 1);
    if (!body) { await sleep(1200 * (i + 1)); continue; }
    let j;
    try { j = JSON.parse(body); } catch { return ""; }
    const code = String(j.errorCode || "");
    if (code === "0") return decodeEntities((j.translation || []).join("").trim());
    if (code === "411") { await sleep(2500 * (i + 1)); continue; }   // 频率过快，退避
    return "";
  }
  return "";
}

/** MyMemory 兜底：免费额度按 IP 每日重置，打满后本次不再重试 */
export function createMyMemory() {
  let dead = false;
  return async function myMemory(text) {
    if (dead) return "";
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|zh-CN&de=wordlens.ingest%40example.com`;
    const body = await get(url, 2);
    if (!body) return "";
    let cn = "";
    try {
      const j = JSON.parse(body);
      if (j.responseStatus === 200) cn = decodeEntities(j.responseData.translatedText || "");
      if (j.quotaFinished || /MYMEMORY WARNING/i.test(cn)) {
        dead = true;
        console.warn("  ! MyMemory 当日配额已用尽，本次只用有道");
        return "";
      }
    } catch { return ""; }
    if (!cn || /MYMEMORY WARNING|QUERY LENGTH LIMIT|INVALID/i.test(cn)) return "";
    return cn;
  };
}

/* ---------------- 批量翻译 ---------------- */

/**
 * 批量翻译一组文本，返回与入参等长的译文数组（译不出来的位置是空串）。
 * 命中缓存的直接复用；未命中的按 maxChars/maxLines 攒批，一次请求译多行。
 *
 * @param {string[]} texts
 * @param {object} opts
 *   - cacheFile  磁盘缓存路径，默认 tools/.mt-cache.json
 *   - maxChars   单次请求的原文总长上限（有道对 q 有长度限制）
 *   - maxLines   单次请求的行数上限
 *   - onTick     (done, total) => void，进度回调
 */
export async function translateTexts(texts, opts = {}) {
  const {
    cacheFile = CACHE_FILE,
    maxChars = 400,
    maxLines = 6,
    onTick = null,
  } = opts;

  const cache = loadCache(cacheFile);
  const out = new Array(texts.length).fill("");
  const todo = [];
  texts.forEach((t, i) => {
    const key = hash(t);
    if (cache[key]) out[i] = cache[key];
    else todo.push({ i, t });
  });

  /* 攒批：累计到字符或行数上限就发一次，保证返回值行数与原文一一对应 */
  const batches = [];
  let cur = [], chars = 0;
  for (const item of todo) {
    if (cur.length && (cur.length >= maxLines || chars + item.t.length > maxChars)) {
      batches.push(cur); cur = []; chars = 0;
    }
    cur.push(item); chars += item.t.length + 1;
  }
  if (cur.length) batches.push(cur);

  const dl = createDeepL();
  const mm = createMyMemory();
  let done = 0;
  const total = todo.length;

  for (const batch of batches) {
    let lines = [];
    /* DeepL 主力：text 数组一次一批，返回天然按序，不存在「行数对不上」的问题 */
    if (dl) {
      const dlOut = await dl(batch.map(b => b.t.replace(/\s*\n\s*/g, " ")));
      if (dlOut) lines = dlOut;
    }
    if (lines.length !== batch.length) {
      lines = [];
      if (batch.length === 1) {
        lines = [await youdao(batch[0].t) || ""];
      } else {
        const joined = batch.map(b => b.t.replace(/\s*\n\s*/g, " ")).join("\n");
        let many = await youdao(joined);
        lines = many ? many.split(/\n+/).map(s => s.trim()).filter(Boolean) : [];
        if (lines.length !== batch.length) {          // 多半被限流截断，歇一下整批重试
          await sleep(2500);
          many = await youdao(joined);
          lines = many ? many.split(/\n+/).map(s => s.trim()).filter(Boolean) : [];
        }
        if (lines.length !== batch.length) {          // 仍不齐：退回逐条，保证一一对应
          lines = [];
          for (const b of batch) {
            lines.push(await youdao(b.t) || "");
            await sleep(700);
          }
        }
      }
    }

    batch.forEach((b, k) => {
      const cn = lines[k] || "";
      if (cn) { cache[hash(b.t)] = cn; out[b.i] = cn; }
    });

    done += batch.length;
    saveCache(cacheFile, cache);                    // 逐批落盘，中断也不丢已译部分
    if (onTick) onTick(done, total);
    await sleep(900);
  }

  /* 有道没译出来的，再给 MyMemory 一次机会 */
  for (const item of todo) {
    if (out[item.i]) continue;
    const cn = await mm(item.t);
    if (cn) { cache[hash(item.t)] = cn; out[item.i] = cn; }
  }
  saveCache(cacheFile, cache);

  return out;
}

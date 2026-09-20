/* 词阅 WordLens —— 机器翻译库
 *
 * 抓取流水线（tools/ingest.mjs）翻正文、标题翻译（tools/translate-titles.mjs）翻标题，
 * 共用同一份磁盘缓存与接口策略：Qwen-MT 优先，DeepL 补齐失败项。
 * （2026-09-17 对调：英译中 Qwen-MT 质量持平且成本约低一个数量级，还支持术语干预；
 *   DeepL 免费额度从主力降为替补后基本用不完，且作为独立引擎保留交叉验证价值。
 *   已入库译文不受影响——缓存按 (text, 文章键) 命中，与引擎顺序无关。）
 *
 * 只复用启用引擎的明确来源缓存；失败项保持空串，由入库完整性门槛拦截。
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
 * DeepL（替补引擎）：一次送一批文本（text 数组），返回按序译文。
 * key 以 :fx 结尾 = 免费档，走 api-free.deepl.com。返回 null 表示本次不可用。
 */
export function createDeepL(key, options = {}) {
  key = key || deepLKey();
  if (!key) return null;
  const sourceLang = options.sourceLang || "EN";
  const glossaryId = options.glossaryId || "";
  const base = key.endsWith(":fx") ? "https://api-free.deepl.com" : "https://api.deepl.com";
  return async function deepl(lines, context = "") {
    for (let i = 0; i < 2; i++) {
      try {
        const res = await fetch(base + "/v2/translate", {
          method: "POST",
          headers: { "Authorization": "DeepL-Auth-Key " + key, "Content-Type": "application/json" },
          body: JSON.stringify({
            text: lines,
            source_lang: sourceLang,
            target_lang: "ZH",
            preserve_formatting: true,
            ...(glossaryId ? { glossary_id: glossaryId } : {}),
            ...(context ? { context } : {}),
          }),
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

/** 百炼密钥只在 Node 抓取流程读取，不进入浏览器代码。 */
export function qwenMTKey() {
  // 本项目本地配置优先，避免继承其他项目的旧环境变量；Actions 没有该文件，使用 Secret。
  try {
    const local = fs.readFileSync(path.join(import.meta.dirname, ".dashscope-key"), "utf8").trim();
    if (local) return local;
  } catch { /* 使用环境变量 */ }
  return process.env.DASHSCOPE_API_KEY?.trim() || "";
}

/** 只向北京地域的百炼官方接口发送密钥，拒绝 URL 中的凭据及其他地址。 */
export function qwenMTBaseURL(value = process.env.DASHSCOPE_BASE_URL || "https://dashscope.aliyuncs.com/compatible-mode/v1") {
  try {
    const url = new URL(String(value).trim().replace(/\/+$/, ""));
    if (url.protocol !== "https:" || url.username || url.password || url.port || url.search || url.hash ||
        url.pathname !== "/compatible-mode/v1" ||
        !(url.hostname === "dashscope.aliyuncs.com" || /^[a-z0-9-]+\.cn-beijing\.maas\.aliyuncs\.com$/.test(url.hostname))) throw new Error();
    return url.href;
  } catch { throw new Error("DASHSCOPE_BASE_URL 必须是北京地域百炼官方 HTTPS 地址，路径为 /compatible-mode/v1"); }
}

/** 单句调用（Qwen-MT 主力引擎，2026-09-17 起）；避免翻译模型合并或丢失批次中的句子，返回数组仍与原文严格对齐。 */
export function createQwenMT(key, options = {}) {
  key = key || qwenMTKey();
  if (!key) return null;
  const model = options.model || process.env.QWEN_MT_MODEL?.trim() || "qwen-mt-plus";
  if (!["qwen-mt-plus", "qwen-mt-flash", "qwen-mt-lite"].includes(model)) throw new Error("QWEN_MT_MODEL 只支持 qwen-mt-plus / qwen-mt-flash / qwen-mt-lite");
  const base = qwenMTBaseURL(options.baseURL);
  const sourceLang = options.sourceLang || "EN";
  /* 额度 / 鉴权 / 参数类失败在一个 translator 实例内粘住：同一轮 translateTexts 复用它，
     首次 4xx 后不再逐句、逐批重复打失败接口（见 mt-test：同实例两次调用只应发 1 个请求）。 */
  let unavailable = false;
  const translator = async function qwenMT(lines, context = "") {
    const out = new Array(lines.length).fill("");
    for (let k = 0; k < lines.length && !unavailable; k++) {
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          const res = await fetch(base + "/chat/completions", {
            method: "POST",
            headers: { Authorization: "Bearer " + key, "Content-Type": "application/json" },
            body: JSON.stringify({
              model,
              /* 待译正文只放干净原句；背景按官方 Qwen-MT 契约走 translation_options.domains，
                 不能内联进 content —— 翻译模型会把内联的 [Context: …] 一起译进结果，污染译文。 */
              messages: [{ role: "user", content: lines[k] }],
              translation_options: {
                source_lang: sourceLang === "EN" ? "English" : sourceLang === "AUTO" ? "auto" : sourceLang,
                target_lang: "Chinese",
                ...(context ? { domains: context } : {}),
              },
            }),
            redirect: "error",
            signal: AbortSignal.timeout(30000),
          });
          if (res.status === 429 || res.status >= 500) {
            if (attempt === 0) { await sleep(2000); continue; }
          }
          if (!res.ok) {
            console.warn("  ! Qwen-MT HTTP", res.status);
            // 鉴权、权限、额度或参数错误：本轮停止请求，避免每句重复打失败接口。
            if ([400, 401, 402, 403, 404].includes(res.status)) unavailable = true;
            break;
          }
          const data = await res.json();
          const choice = data.choices?.[0];
          // 截断、内容过滤、结构缺失都不能当作完整译文入库。
          if (choice?.finish_reason === "stop" && typeof choice.message?.content === "string") {
            out[k] = decodeEntities(choice.message.content.trim());
          }
          break;
        } catch {
          if (attempt === 0) await sleep(1500);
        }
      }
    }
    return out;
  };
  translator.model = model;
  return translator;
}

/* ---------------- 批量翻译 ---------------- */

const LLM_SYS = "你是一位专业的文学翻译。把用户给出的编号英文句子逐句翻译成简体中文：每行保留原编号，一行一句；不合并、不拆分、不增删句子，不输出任何解释或额外内容。译文自然口语化、忠实原意，保留人名与数字。如果某句只有标点（如 … / — / ?!），输出行也只保留对应中文标点，编号照写。";

/* 解析「1. 译文」编号行；缺失、多余或空译文都视为对不齐，整批作废。
 * 这是精翻通道的对齐闸门：大模型不可信的不是译文，而是「悄悄少译/合并一句」。 */
function parseNumbered(content, n) {
  const map = new Map();
  const text = String(content || "").replace(/```[a-z]*/gi, "").replace(/```/g, "");
  for (const raw of text.split(/\r?\n/)) {
    const m = raw.match(/^\s*[\[（(]?(\d{1,3})\s*[\].、)）：:]\s*(.+)$/) || raw.match(/^\s*(\d{1,3})\s*[:：]\s*(.+)$/);
    if (!m) continue;
    const i = Number(m[1]) - 1;
    if (i >= 0 && i < n && !map.has(i)) map.set(i, m[2].trim());
  }
  if (map.size !== n || [...map.values()].some(t => !t)) return null;
  const out = new Array(n);
  for (const [i, t] of map) out[i] = t;
  return out;
}

/**
 * 精翻引擎（2026-09-17 新增）：通用 Qwen 大模型（默认 qwen-max），适合文学性强的整篇精翻。
 * 与 qwen-mt 共用同一把百炼密钥和官方接口；编号行协议保证逐句对齐，对不齐的批次整批作废（返回全空串），
 * 由 translateTexts 回落给下一个引擎。单次请求（整批一个 prompt），超时放宽到 120s。
 */
export function createQwenLLM(key, options = {}) {
  key = key || qwenMTKey();
  if (!key) return null;
  const model = options.model || process.env.QWEN_LLM_MODEL?.trim() || "qwen-max";
  if (!/^qwen[a-z0-9._-]*$/i.test(model)) throw new Error("QWEN_LLM_MODEL 只支持百炼 qwen 系模型名（如 qwen-max / qwen-plus）");
  const base = qwenMTBaseURL(options.baseURL);
  const translator = async function qwenLLM(lines, context = "") {
    let unavailable = false;
    const numbered = lines.map((t, i) => `${i + 1}. ${t}`).join("\n");
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const res = await fetch(base + "/chat/completions", {
          method: "POST",
          headers: { Authorization: "Bearer " + key, "Content-Type": "application/json" },
          body: JSON.stringify({
            model,
            temperature: 0.3,
            messages: [
              { role: "system", content: LLM_SYS },
              { role: "user", content: (context ? `背景（仅用于消歧，不要翻译本行）：${context}\n\n` : "") + numbered },
            ],
          }),
          redirect: "error",
          signal: AbortSignal.timeout(120000),
        });
        if (res.status === 429 || res.status >= 500) {
          if (attempt === 0) { await sleep(2000); continue; }
        }
        if (!res.ok) {
          console.warn("  ! Qwen-LLM HTTP", res.status);
          // 鉴权、权限、额度或参数错误：本轮停止请求，避免每批重复打失败接口。
          if ([400, 401, 402, 403, 404].includes(res.status)) unavailable = true;
          break;
        }
        const data = await res.json();
        const choice = data.choices?.[0];
        if (choice?.finish_reason !== "stop" || typeof choice.message?.content !== "string") break;
        const parsed = parseNumbered(choice.message.content, lines.length);
        if (parsed) return parsed;
        if (attempt === 0) { await sleep(1500); continue; }   // 对不齐重试一次，再不行整批作废
        break;
      } catch {
        if (attempt === 0) await sleep(1500);
      }
    }
    return lines.map(() => "");
  };
  translator.model = model;
  return translator;
}

/**
 * 批量翻译一组文本，返回与入参等长的译文数组（译不出来的位置是空串）。
 * 命中缓存的直接复用；未命中的按 maxChars/maxLines 攒批，一次请求译多行。
 *
 * @param {string[]} texts
 * @param {object} opts
 *   - cacheFile  磁盘缓存路径，默认 tools/.mt-cache.json
 *   - maxChars   单次请求的原文总长上限
 *   - maxLines   单次请求的行数上限
 *   - onTick     (done, total) => void，进度回调
 *   - onProvider (provider, count) => void，记录实际使用的引擎
 *   - providers  请求顺序，默认 ["qwen-mt", "deepl"]；只尝试配置了密钥的引擎
 *   - cacheNamespace  缓存方案名；切换上下文/术语表时递增，避免复用旧译文
 *   - cacheKey   当前文章或文档的稳定标识，也可按 (text, index) 返回文章键
 *   - context    DeepL 的上下文字符串，或接收当前批次 [{i,t}] 的函数
 *   - cacheVersion / sourceLang / glossaryId  使翻译方案变更可追溯且可失效
 */
export async function translateTexts(texts, opts = {}) {
  const {
    cacheFile = CACHE_FILE,
    maxChars = 400,
    maxLines = 6,
    onTick = null,
    cacheNamespace = "legacy",
    cacheKey = "",
    context = "",
    cacheVersion = "mt-v2",
    sourceLang = "EN",
    glossaryId = "",
    acceptTranslation = null,
    onProvider = null,
    providers = ["qwen-mt", "deepl"],
    qwenKey = "",
    llmKey = "",
  } = opts;
  if (!Array.isArray(providers) || !providers.length || providers.some(p => !["deepl", "qwen-mt", "qwen-llm"].includes(p))) {
    throw new Error("providers 必须是 deepl / qwen-mt / qwen-llm 的非空数组");
  }
  const qwenModel = process.env.QWEN_MT_MODEL?.trim() || "qwen-mt-plus";
  const llmModel = process.env.QWEN_LLM_MODEL?.trim() || "qwen-max";

  /* qwen 系引擎的缓存条目带 model：模型换了旧译文就作废，DeepL 条目无 model 恒有效。 */
  const currentModel = p => (p === "qwen-mt" ? qwenModel : p === "qwen-llm" ? llmModel : undefined);

  /* cacheKey 可以按句子下标变化。标题批次因此能逐篇隔离上下文，
     而正文仍可用整篇 URL/文章指纹作为稳定键。 */
  const keyForCache = typeof cacheKey === "function" ? cacheKey : () => cacheKey;
  const keyFor = (t, i) => hash(`${cacheVersion}\n${cacheNamespace}\n${sourceLang}\n${keyForCache(t, i)}\n${t}`);
  const defaultAccept = (cn, source) => {
    const out = String(cn || "").trim();
    const src = String(source || "").trim();
    if (!out) return false;
    /* 供应商在失败时偶尔原样回显英文；不把这种结果写入缓存，下一轮才有机会重试。 */
    if (src && out.toLowerCase() === src.toLowerCase() && /[A-Za-z]/.test(src)) return false;
    return true;
  };
  const isAccepted = acceptTranslation || defaultAccept;
  const contextFor = batch => {
    const raw = typeof context === "function" ? context(batch) : context;
    /* DeepL context 不应无限膨胀；标题和相邻句子足够消歧，过长反而增加请求失败率。 */
    return String(raw || "").replace(/\s+/g, " ").trim().slice(0, 3500);
  };

  const cache = loadCache(cacheFile);
  const out = new Array(texts.length).fill("");
  const todo = [];
  texts.forEach((t, i) => {
    const key = keyFor(t, i);
    /* 旧纯字符串、来源不明及停用引擎的缓存必须重译。 */
    const entry = cache[key];
    const allowed = providers.includes(entry?.provider) &&
      (entry.provider === "deepl" || entry.model === currentModel(entry.provider));
    const cached = allowed ? String(entry.text || "") : "";
    if (cached && isAccepted(cached, t)) {
      out[i] = cached;
      if (onProvider) onProvider(entry.provider, 1);
    }
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

  if (!todo.length) return out;
  const engines = providers.map(provider => ({
    provider,
    translate: provider === "deepl" ? createDeepL(null, { sourceLang, glossaryId })
      : provider === "qwen-llm" ? createQwenLLM(llmKey, { model: llmModel })
      : createQwenMT(qwenKey, { sourceLang }),
  })).filter(engine => engine.translate);
  let done = 0;
  const total = todo.length;

  if (!engines.length) {
    console.warn(`  ! 未配置翻译密钥：${todo.length} 项待译。请设置 DEEPL_KEY 或 DASHSCOPE_API_KEY（本地也可使用 tools/.deepl-key / tools/.dashscope-key）。`);
    if (onTick) onTick(total, total);
    return out;
  }

  for (const batch of batches) {
    let accepted = 0;
    for (const engine of engines) {
      const pending = batch.filter(b => !out[b.i]);
      if (!pending.length) break;
      const lines = await engine.translate(
        pending.map(b => b.t.replace(/\s*\n\s*/g, " ")),
        contextFor(pending),
      ) || [];
      let providerCount = 0;
      pending.forEach((b, k) => {
        const cn = lines[k] || "";
        if (isAccepted(cn, b.t)) {
          cache[keyFor(b.t, b.i)] = {
            text: cn, provider: engine.provider, profile: cacheNamespace, version: cacheVersion,
            ...(engine.provider !== "deepl" ? { model: engine.translate.model } : {}),
          };
          out[b.i] = cn;
          accepted++;
          providerCount++;
        }
      });
      if (providerCount && onProvider) onProvider(engine.provider, providerCount);
    }

    done += batch.length;
    saveCache(cacheFile, cache);                    // 逐批落盘，中断也不丢已译部分
    if (onTick) onTick(done, total);
    if (accepted < batch.length) console.warn(`  ! 本批 ${batch.length - accepted}/${batch.length} 项未译出或未通过检查，留待重试。`);
    await sleep(900);
  }
  saveCache(cacheFile, cache);

  return out;
}

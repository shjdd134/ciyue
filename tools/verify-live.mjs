#!/usr/bin/env node
/* 词阅 WordLens —— 线上产物核验（发布之后才跑的最后一闸）
 *
 * 为什么需要它：publish.mjs 只保证「文件进了 git」，remote-sweep-test.mjs 只对账
 * 「远端仓库 == 本地工作树」—— 两者都停在**仓库层**。用户真正打开的是 GitHub Pages
 * 那台 CDN，中间还隔着一次部署 + 一轮 CDN 缓存。这一层此前从没有过脚本化核验，
 * 全靠手打 curl。
 *
 * 2026-09-15 的教训（本文件存在的直接原因）：手打 curl 核验时命令跑了 14 分钟，
 * 报 `HTTP=200 bytes=555733` 看似成功，实际拿到的是**截断文件** —— 读到 42 万字符
 * 正文戛然而止、没有收尾的 `];`，正则不匹配。差一点把「下载被截断」误判成
 * 「线上还没更新」。curl 在本沙箱写文件还有已知怪癖（写 /tmp 或 /dev/null 报
 * `client returned ERROR on write`，退出码 23/127），所以核验一律走 Node fetch。
 *
 * 三层职责，谁也不替谁：
 *   _api-push.mjs          推送      （仓库层 · 写）
 *   remote-sweep-test.mjs  仓库对账  （仓库层 · 读 · 要 token）
 *   verify-live.mjs        CDN 核验  （公网层 · 读 · **不要 token**）← 本文件
 *
 * 用法：
 *   node tools/verify-live.mjs                核验一次，不一致 → 退出 1
 *   node tools/verify-live.mjs --wait 600     最多等 10 分钟（部署/CDN 追平窗口）
 *   node tools/verify-live.mjs --covers 20    抽查 20 张配图（默认 8，--no-covers 跳过）
 *   node tools/verify-live.mjs --json         机器可读输出
 *   LIVE_BASE=http://127.0.0.1:8731/ciyue/ node tools/verify-live.mjs
 *                                             核验任意站点（自测用，见 verify-live-test.mjs）
 *
 * 为什么带 `?cb=`：Pages 的 CDN 对静态资源缓存约 10 分钟，直接 GET 会读到旧副本，
 * 把「CDN 还没刷新」误判成「发布失败」。变化的查询串 = 换缓存键 = 回源。
 *
 * 为什么不放进 daily.mjs 第 5 步：daily 跑在 push **之前**，那一刻线上必然是旧版，
 * 一致性断言会稳定变红，纯噪音（remote-sweep 的联网段已有同样的毛病，只是它在 CI
 * 里因取不到 token 自动跳过）。它是**发布成功之后**才跑的一步。
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const BASE = (process.env.LIVE_BASE || "https://shjdd134.github.io/ciyue/").replace(/\/+$/, "/");

const argv = process.argv.slice(2);
const has = f => argv.includes(`--${f}`);
const val = (f, d) => {
  const i = argv.indexOf(`--${f}`);
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[i + 1] : d;
};

if (has("help") || has("h")) {
  console.log(`用法：node tools/verify-live.mjs [--wait 秒] [--covers N|--no-covers] [--retries N] [--json]
核验 GitHub Pages 上真实提供的产物是否与本地一致。LIVE_BASE 可覆盖站点根地址。`);
  process.exit(0);
}

const WAIT_MS = (Number(val("wait", "0")) || 0) * 1000;
const COVER_N = has("no-covers") ? 0 : (Number(val("covers", "8")) || 0);
const AS_JSON = has("json");
/* 本沙箱访问 Pages 实测**单次请求约 24s**（同一 URL 手测 24233ms 才拿回完整正文），
 * 所以超时必须给足：25s 的默认值会把「网络本来就慢」误判成「发布失败」（实测假红两次）。
 * 一轮只发 3 + N 个请求，慢是慢在延迟而不是吞吐，靠并行而不是靠更多次重试来省时间。 */
const TIMEOUT_MS = (Number(val("timeout", "60")) || 60) * 1000;
const RETRIES = Math.max(1, Number(val("retries", "3")) || 3);

/* 与 publish.mjs / daily.mjs / qc.mjs 同一把尺子 —— 本项目已经因「两套尺子」栽过多次 */
const EXTRA_RE = /(const ARTICLES_EXTRA = )(\[[\s\S]*?\n\])(;)/;

const results = [];
function check(name, ok, detail) {
  results.push({ name, ok, detail: ok ? "" : (detail || "") });
  if (!AS_JSON) console.log(`  ${ok ? "✓" : "✗"} ${name}${!ok && detail ? `  → ${detail}` : ""}`);
}
const note = m => { if (!AS_JSON) console.log(m); };
const skip = n => { if (!AS_JSON) console.log(`  – ${n}（跳过）`); };

const bust = url => url + (url.includes("?") ? "&" : "?") + "cb=" + Date.now();
const norm = s => s.replace(/\r\n/g, "\n");   // core.autocrlf=true 的保险：行尾不得造成假差异

/* 受限沙箱里新建 TCP 连接会间歇性 UND_ERR_CONNECT_TIMEOUT（实测：首轮 14 项里
 * sw.js 与一张封面报 "fetch failed"，其余全过）。undici 的 connect 超时是它自带的
 * 10s 默认值，AbortSignal.timeout 管不到，所以只能「退避重试 + 压低并发」。
 * 错误信息必须带上 cause.code —— 只报 "fetch failed" 会让人以为站点挂了，
 * 今天就是这么白白多查了一轮。 */
async function fetchRetry(url, opts = {}, tries = RETRIES) {
  let last;
  for (let i = 0; i < tries; i++) {
    try { return await fetch(url, opts); }
    catch (e) { last = e; await new Promise(r => setTimeout(r, 700 * (i + 1))); }
  }
  const code = last && last.cause && (last.cause.code || last.cause.message);
  throw new Error(`${last.message}${code ? ` (${code})` : ""}`);
}

async function getText(rel) {
  const r = await fetchRetry(bust(new URL(rel, BASE).href), {
    redirect: "follow",
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: { "Cache-Control": "no-cache", "Pragma": "no-cache" },
  });
  return { status: r.status, headers: r.headers, text: r.ok ? await r.text() : "" };
}

const readLocal = rel => fs.readFileSync(path.join(ROOT, rel), "utf8");
const versionSet = html => new Set([...html.matchAll(/\?v=(\d+)/g)].map(m => m[1]));
const refsOf = html => new Set([...html.matchAll(/(?:src|href)="([^"]+)"/g)]
  .map(m => m[1]).filter(u => !/^(?:https?:)?\/\//.test(u) && !u.startsWith("data:")));
const swCache = js => (js.match(/wordlens-cache-v\d+/) || [null])[0];
const collectImages = list => {
  const out = new Set();
  for (const a of list) {
    if (a.coverImg) out.add(a.coverImg);
    for (const p of a.paras || []) if (p.img) out.add(p.img);
  }
  return [...out];
};
/* 均匀取样，不是取前 N 张 —— 前 N 张常来自同一篇文章，漏推的封面正好在后面 */
function pick(arr, n) {
  if (n >= arr.length) return arr.slice();
  const step = arr.length / n;
  return Array.from({ length: n }, (_, i) => arr[Math.floor(i * step)]);
}
function firstDiff(a, b) {
  const n = Math.min(a.length, b.length);
  let i = 0;
  while (i < n && a[i] === b[i]) i++;
  if (i === n && a.length !== b.length) return `长度不同（线上 ${a.length} / 本地 ${b.length}）`;
  return `首处分歧 @${i}：线上 ${JSON.stringify(a.slice(i, i + 32))} / 本地 ${JSON.stringify(b.slice(i, i + 32))}`;
}

/* ---------- 本地基线（本地坏掉时先修本地，别去查线上） ---------- */
const localExtraRaw = readLocal("assets/data-articles-extra.js");
const lm = localExtraRaw.match(EXTRA_RE);
if (!lm) {
  console.error("✗ 本地 assets/data-articles-extra.js 结构异常（正则不匹配）—— 先修本地再核验线上");
  process.exit(2);
}
const localList = JSON.parse(lm[2]);
const localIndex = readLocal("index.html");
const localSw = readLocal("sw.js");

/* ---------- 一轮核验 ---------- */
async function verifyOnce() {
  results.length = 0;
  /* 三个入口文件并行取。本沙箱单次请求约 24s，串行会把一轮拖到一分半以上，
   * 而这里只受延迟限制、不受带宽限制，并行是唯一有效的提速手段。 */
  const [live, li, ls] = await Promise.all([
    getText("assets/data-articles-extra.js").catch(e => ({ error: e })),
    getText("index.html").catch(e => ({ error: e })),
    getText("sw.js").catch(e => ({ error: e })),
  ]);

  note("== 1. 站点与数据文件可达 ==");
  if (live.error) {
    check("拉取线上 data-articles-extra.js", false, live.error.message);
    return;
  }
  const h = live.headers;
  note(`   HTTP ${live.status} · Cache ${h.get("x-cache") || h.get("cf-cache-status") || "-"}` +
    ` · Age ${h.get("age") ?? "-"} · Content-Length ${h.get("content-length") ?? "-"}`);
  check("线上 data-articles-extra.js 返回 200", live.status === 200, `HTTP ${live.status}`);

  /* 截断检测：正则要求 JSON 数组以「换行 + ];」收尾，缺了就是没下完 */
  const mm = live.text.match(EXTRA_RE);
  check("线上数据文件结构完整（未截断）", !!mm, mm ? "" :
    `正则不匹配；实收 ${live.text.length} 字符，结尾 = ${JSON.stringify(live.text.slice(-60))}`);

  let liveList = [];
  let parsedOk = false;
  if (mm) {
    try { liveList = JSON.parse(mm[2]); parsedOk = true; } catch (e) { check("线上数据文件可解析", false, e.message); }
    if (parsedOk) check("线上数据文件可解析", true);
  } else {
    check("线上数据文件可解析", false, "结构不完整，无法解析");
  }

  note("\n== 2. 篇目与本地一致 ==");
  const lIds = localList.map(a => a.id).sort();
  const rIds = liveList.map(a => a.id).sort();
  const sameIds = lIds.length === rIds.length && lIds.every((x, i) => x === rIds[i]);
  check(`篇数与本地一致（本地 ${lIds.length} 篇）`, lIds.length === rIds.length && parsedOk,
    `线上 ${rIds.length} / 本地 ${lIds.length}`);
  check("篇目 id 集合完全相同", sameIds && parsedOk,
    `线上多出 [${rIds.filter(x => !lIds.includes(x))}] · 本地独有 [${lIds.filter(x => !rIds.includes(x))}]`);
  const byteSame = norm(live.text) === norm(localExtraRaw);
  check("线上数据文件与本地逐字节一致", byteSame, byteSame ? "" : firstDiff(norm(live.text), norm(localExtraRaw)));

  note("\n== 3. 已知缺陷模式（本仓库反复踩过的类） ==");
  const loc = (live.text.match(/localhost|127\.0\.0\.1/g) || []).length;
  check("线上无 localhost / 127.0.0.1 链接", loc === 0, `命中 ${loc} 处`);
  check("线上无「模型名当书名」残留（《HUMAN 3.0》）", !/《HUMAN 3\.0》/.test(live.text));
  const badTitles = liveList.filter(a => /《/.test(String(a.titleZh || "")));
  check("线上标题无书名号", badTitles.length === 0, badTitles.map(a => a.titleZh).slice(0, 3).join(" / "));

  note("\n== 4. 入口与缓存版本 ==");
  check("线上 index.html 返回 200", !li.error && li.status === 200, li.error ? li.error.message : `HTTP ${li.status}`);
  check("线上 sw.js 返回 200", !ls.error && ls.status === 200, ls.error ? ls.error.message : `HTTP ${ls.status}`);
  if (!li.error && li.status === 200) {
    const lv = [...versionSet(localIndex)].sort().join(",");
    const rv = [...versionSet(li.text)].sort().join(",");
    check(`index.html 资源版本号一致（本地 ?v=${lv}）`, !!lv && lv === rv, `线上 ?v=${rv || "(无)"}`);
    const lrefs = [...refsOf(localIndex)].map(s => s.replace(/\?v=\d+/, "")).sort();
    const rrefs = [...refsOf(li.text)].map(s => s.replace(/\?v=\d+/, "")).sort();
    const refSame = lrefs.length === rrefs.length && lrefs.every((x, i) => x === rrefs[i]);
    check("index.html 引用的资源清单一致", refSame,
      `线上独有 [${rrefs.filter(x => !lrefs.includes(x))}] · 本地独有 [${lrefs.filter(x => !rrefs.includes(x))}]`);
  }
  if (!ls.error && ls.status === 200) {
    const lsc = swCache(localSw), rsc = swCache(ls.text);
    check(`sw.js 缓存名一致（本地 ${lsc}，改名会清空用户缓存）`, !!lsc && lsc === rsc, `线上 ${rsc || "(无)"}`);
  }

  note("\n== 5. 配图可达（防「文章上线、封面漏推」线上断图） ==");
  const imgs = collectImages(liveList);
  if (!COVER_N) {
    skip(`抽查配图（共 ${imgs.length} 张）`);
  } else if (!imgs.length) {
    check("线上文章引用了配图", false, "一篇都没引用到图，可疑");
  } else {
    const sample = pick(imgs, COVER_N);
    const bad = [];
    /* 分批而不是一次全开：沙箱里并发开 8 条新连接会掉线（见 fetchRetry 注释） */
    const CONC = 4;
    for (let i = 0; i < sample.length; i += CONC) {
      await Promise.all(sample.slice(i, i + CONC).map(async p => {
        try {
          /* Range 只取首字节：既拿到真实状态码，又不用把整张图拉下来 */
          const r = await fetchRetry(bust(new URL(p, BASE).href), {
            headers: { Range: "bytes=0-0" },
            redirect: "follow",
          });
          if (r.status >= 400) bad.push(`${p} → HTTP ${r.status}`);
        } catch (e) { bad.push(`${p} → ${e.message}`); }
      }));
    }
    check(`抽查 ${sample.length}/${imgs.length} 张配图全部可达`, bad.length === 0, bad.slice(0, 4).join(" / "));
  }
}

/* ---------- 主流程 ---------- */
const started = Date.now();
let failed = [];
let round = 0;
note(`\n=== 线上产物核验：${BASE} ===`);
for (;;) {
  round++;
  if (round > 1) note(`\n--- 第 ${round} 轮（已等 ${Math.round((Date.now() - started) / 1000)}s）---`);
  await verifyOnce();
  failed = results.filter(r => !r.ok);
  if (!failed.length) break;
  if (!WAIT_MS || Date.now() - started + 15000 > WAIT_MS) break;
  note(`\n… ${failed.length} 项未通过，等 15s 复看（部署/CDN 追平窗口，预算 ${WAIT_MS / 1000}s）`);
  await new Promise(r => setTimeout(r, 15000));
}

const passed = results.filter(r => r.ok).length;
if (AS_JSON) {
  console.log(JSON.stringify({
    base: BASE, rounds: round, elapsedMs: Date.now() - started,
    pass: passed, fail: results.length - passed, results,
    liveArticles: localList.length,
  }, null, 2));
} else {
  console.log(`\n结果：${passed} 通过 / ${results.length - passed} 失败`);
  if (failed.length) {
    console.log("未通过：");
    for (const r of failed) console.log(`  ✗ ${r.name}${r.detail ? `  → ${r.detail}` : ""}`);
  } else {
    console.log(`线上共 ${localList.length} 篇，与本地一致：`);
    for (const a of localList) console.log(`  · ${a.titleZh || a.title}`);
  }
}
if (failed.length) process.exitCode = 1;

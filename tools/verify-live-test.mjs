#!/usr/bin/env node
/* 词阅 WordLens —— verify-live.mjs 的负向回归
 *
 * 一个从不失败的守卫等于没有守卫。本项目在这上面栽过：audit 的 G 检查曾经只验
 * 「当前通过」，改坏了也看不出来。所以这里给 verify-live 造三个**本地假站点**，
 * 证明它该红的时候真的会红：
 *
 *   clean      与本地完全一致            → 0 失败、退出 0
 *   truncated  数据文件被掐掉 55%（就是 2026-09-15 curl 截断事故的形态）
 *                                       → 必须报「结构完整 / 可解析」失败
 *   mutated    全须全尾但内容被改坏        → 必须逐项抓到：篇目差 · localhost ·
 *                                          标题书名号 · index ?v= 落后 · 配图 404
 *
 * 假站点跑在**独立进程**里（本文件用 `--serve` 自举）：spawnSync 会阻塞自己的
 * 事件循环，同进程内的 http server 在子进程跑完之前根本收不到请求 —— 死锁。
 *
 * 全程不碰外网，CI 里同样可跑。
 */
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { spawn, spawnSync } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..");
const TMP = path.join(ROOT, ".tmp");
const SELF = path.resolve(import.meta.dirname, "verify-live-test.mjs");
const VERIFIER = path.join(ROOT, "tools", "verify-live.mjs");
const node = process.execPath;
const RE = /(const ARTICLES_EXTRA = )(\[[\s\S]*?\n\])(;)/;

/* ================= 服务端模式（子进程自举） ================= */
if (process.argv[2] === "--serve") {
  const mode = process.argv[4];
  const dir = process.argv[5];
  const read = f => fs.readFileSync(path.join(dir, f));
  const send = (res, code, body, type) => {
    res.writeHead(code, { "Content-Type": type, "Cache-Control": "no-store" });
    res.end(body);
  };
  http.createServer((req, res) => {
    const p = decodeURIComponent(new URL(req.url, "http://x").pathname).replace(/^\/ciyue\//, "");
    if (p === "__ping") return send(res, 200, "ok", "text/plain");
    if (p === "assets/data-articles-extra.js") return send(res, 200, read("data-articles-extra.js"), "text/javascript");
    if (p === "index.html") return send(res, 200, read("index.html"), "text/html");
    if (p === "sw.js") return send(res, 200, read("sw.js"), "text/javascript");
    if (p.startsWith("assets/")) {
      /* mutated 要模拟「文章上线、封面漏推」：图片一律 404 */
      if (mode === "mutated") return send(res, 404, "nf", "text/plain");
      return send(res, 200, Buffer.from([0xff, 0xd8, 0xff, 0x00]), "image/jpeg");
    }
    return send(res, 404, "nf", "text/plain");
  }).listen(Number(process.argv[3]), "127.0.0.1");
} else {
  main().catch(e => { console.error(e); process.exitCode = 1; });
}

/* ================= 测试模式 ================= */
async function main() {
  const results = [];
  const check = (name, ok, detail) => {
    results.push([name, ok]);
    console.log(`  ${ok ? "✓" : "✗"} ${name}${!ok && detail ? `  → ${detail}` : ""}`);
  };

  const realExtra = fs.readFileSync(path.join(ROOT, "assets/data-articles-extra.js"), "utf8");
  const realIndex = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  const realSw = fs.readFileSync(path.join(ROOT, "sw.js"), "utf8");

  /* ---------- 造三份 fixture（都是「线上」那一侧） ---------- */
  const fixtureBase = path.join(TMP, "vl-fixtures");
  /* 2026-09-18：rmSync 曾被本机 node 的 safe-delete shim 拦截崩溃（断言全判完却死在清理上，
   * 「结果：N 通过」都打不出来 → release 里被误判为「测试崩溃」）。清理失败不影响判定。 */
  try { fs.rmSync(fixtureBase, { recursive: true, force: true }); } catch {}
  const put = (mode, files) => {
    const d = path.join(fixtureBase, mode);
    fs.mkdirSync(d, { recursive: true });
    for (const [f, body] of Object.entries(files)) fs.writeFileSync(path.join(d, f), body);
    return d;
  };
  const clean = put("clean", {
    "data-articles-extra.js": realExtra, "index.html": realIndex, "sw.js": realSw,
  });
  const truncated = put("truncated", {
    "data-articles-extra.js": realExtra.slice(0, Math.floor(realExtra.length * 0.55)),
    "index.html": realIndex, "sw.js": realSw,
  });

  const m = realExtra.match(RE);
  if (!m) throw new Error("本地 data-articles-extra.js 结构异常，无法造 fixture");
  const mutatedList = JSON.parse(m[2]);
  mutatedList.push({
    id: "gr-zzz-phantom", title: "Phantom", titleZh: "《幽灵篇》", cat: "成长",
    source: "probe", date: "2026-09-15", url: "http://localhost:8123/probe.html",
    coverImg: "assets/covers/zzz-phantom.jpg",
    paras: [{ sentences: [{ en: "Probe sentence.", zh: "" }] }],
  });
  const mutatedExtra = realExtra.slice(0, m.index) + m[1] + JSON.stringify(mutatedList, null, 2) + m[3] +
    realExtra.slice(m.index + m[0].length);
  const mutated = put("mutated", {
    "data-articles-extra.js": mutatedExtra,
    "index.html": realIndex.replace(/\?v=\d+/g, "?v=48"),   // 版本号刻意落后一格
    "sw.js": realSw,
  });

  /* ---------- 跑一个场景 ---------- */
  async function runScenario(mode, port, dir) {
    const server = spawn(node, [SELF, "--serve", String(port), mode, dir], { stdio: ["ignore", "pipe", "ignore"] });
    const base = `http://127.0.0.1:${port}/ciyue/`;
    let up = false;
    const t0 = Date.now();
    while (!up && Date.now() - t0 < 10000) {
      try { up = (await fetch(base + "__ping", { signal: AbortSignal.timeout(1500) })).ok; } catch { /* 还没起来 */ }
      if (!up) await new Promise(r => setTimeout(r, 200));
    }
    if (!up) { server.kill(); throw new Error(`假站点 ${mode} 未在 10s 内就绪（端口 ${port} 被占？）`); }

    const r = spawnSync(node, [VERIFIER, "--json", "--covers", "6"], {
      encoding: "utf8", timeout: 120000,
      env: { ...process.env, LIVE_BASE: base },
    });
    server.kill();
    const out = (r.stdout || "") + (r.stderr || "");
    let json = null;
    try { json = JSON.parse((r.stdout || "").trim()); } catch { /* 解析失败留给断言报 */ }
    const failedNames = json ? json.results.filter(x => !x.ok).map(x => x.name).join(" | ") : "";
    return { code: r.status, json, out, failedNames };
  }

  console.log("== 1. clean：与本地一致 → 必须全绿 ==");
  const c = await runScenario("clean", 8731, clean);
  check("退出码 0", c.code === 0, "code=" + c.code + " :: " + c.out.slice(-160));
  check("JSON 可解析", !!c.json, c.out.slice(-200));
  check("0 失败", !!c.json && c.json.fail === 0, c.failedNames);
  check("配图抽查确实执行且通过（该检查项不是恒真）",
    !!c.json && c.json.results.some(x => /配图/.test(x.name) && x.ok));
  check("逐字节一致这项确实执行且通过",
    !!c.json && c.json.results.some(x => /逐字节/.test(x.name) && x.ok));

  console.log("\n== 2. truncated：数据文件被掐断（curl 事故形态） ==");
  const t = await runScenario("truncated", 8732, truncated);
  check("退出码 1", t.code === 1, "code=" + t.code);
  check("识别出结构不完整（截断）", /结构完整/.test(t.failedNames), t.failedNames);
  check("识别出无法解析", /可解析/.test(t.failedNames), t.failedNames);
  check("不误报「返回 200」（文件是拿到了的）", !/返回 200/.test(t.failedNames), t.failedNames);

  console.log("\n== 3. mutated：内容被改坏 → 必须逐项抓到 ==");
  const mu = await runScenario("mutated", 8733, mutated);
  check("退出码 1", mu.code === 1, "code=" + mu.code);
  check("抓到篇目 id 差异", /篇目 id|篇数与本地/.test(mu.failedNames), mu.failedNames);
  check("抓到 localhost 链接", /localhost/.test(mu.failedNames), mu.failedNames);
  check("抓到标题书名号", /书名号/.test(mu.failedNames), mu.failedNames);
  check("抓到 index ?v= 不一致", /版本号一致/.test(mu.failedNames), mu.failedNames);
  check("抓到配图 404（封面漏推）", /配图/.test(mu.failedNames), mu.failedNames);

  console.log("\n== 4. 守卫有分辨力（既不是恒绿也不是恒红） ==");
  check("clean 与 truncated 退出码不同", c.code === 0 && t.code === 1, `clean=${c.code} truncated=${t.code}`);
  check("truncated 与 mutated 抓到的失败项不同（两种病不能混判）",
    t.failedNames !== mu.failedNames);
  check("clean 的通过项严格多于 truncated", !!c.json && !!t.json &&
    (c.json.pass > t.json.pass), `clean ${c.json && c.json.pass} vs truncated ${t.json && t.json.pass}`);

  /* 全部通过才清 fixture —— 失败时留着好排查 */
  const bad = results.filter(r => !r[1]).length;
  if (!bad) { try { fs.rmSync(fixtureBase, { recursive: true, force: true }); } catch {} }

  const passed = results.length - bad;
  console.log(`\n结果：${passed} 通过 / ${bad} 失败`);
  if (bad) process.exitCode = 1;
}

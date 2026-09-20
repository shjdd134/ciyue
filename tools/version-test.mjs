#!/usr/bin/env node
/* 词阅 WordLens —— version.mjs 的负向测试
 *
 * 项目红线：**加守卫必须做负向测试** —— 注入坏样本确认它会精确报错，再还原。
 * 否则那只是「当前通过」的假守卫（实测教训：spot-check 预检精度 0/2 却一直显示通过）。
 *
 * 本测试证明三件事：
 *   ① 正样本 —— 五处一致时必须 exit 0。没有这条，一个「永远报错」的守卫也会被当成合格。
 *   ② 负样本 —— 每一处被**单独**改歪，都必须 exit 1，且**点名是哪一处**。
 *      只断言 exit 1 不够：五处都报失败而分不清哪处的守卫，等于没写。
 *   ③ 修复路径 —— --sync 能把改歪的修回去，修完 --check 必须回到 0。
 *
 * 安全性：只碰 index.html / sw.js / assets/app.js / assets/data-config.js 四个文件，
 * 进函数前整份读进内存，try/finally 保证任何情况下（含抛异常）都逐字节还原。
 * 这四个文件都不在并行 agent 的改动范围内，不会踩到别人的工作。
 */
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { readVersion } from "./version.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const TARGETS = ["index.html", "sw.js", "assets/app.js", "assets/data-config.js"];

/* 注入点里的版本号**不能写死** —— 2026-09-18 踩的坑，而且踩得很讽刺：
 * 本文件初版把注入点写成 `wordlens-cache-v52`，同一个下午版本 bump 到 v53，
 * 第一条用例立刻报「注入点没找到」。
 * 这跟 guards-test.mjs 硬编码已下架文章 id 是**同一类错误**：测试样本写死具体值，值一变测试就坏。
 * （唯一的好运是它**报错**而不是静默跳过 —— 静默跳过的话这个测试会假装一直绿。）
 * 现在从 version.mjs 的真源读当前版本，注入点动态拼。 */
const V = readVersion(ROOT);
const BROKEN = "999";   // 构造坏样本用的值：比任何真实版本号都大，不会撞上

const abs = f => path.join(ROOT, f);

const snapshot = new Map(TARGETS.map(f => [f, fs.readFileSync(abs(f), "utf8")]));
const restoreAll = () => {
  for (const [f, text] of snapshot) fs.writeFileSync(abs(f), text, "utf8");
};

let pass = 0, fail = 0;
const ok = (name, cond, extra = "") => {
  if (cond) { pass++; console.log(`  ✓ ${name}`); }
  else { fail++; console.log(`  ✗ ${name}${extra ? "   —— " + extra : ""}`); }
};

const runCli = (...args) => {
  const r = spawnSync(process.execPath, [path.join(ROOT, "tools", "version.mjs"), ...args], { encoding: "utf8" });
  return { status: r.status, text: (r.stdout || "") + (r.stderr || "") };
};

/* 在某个文件里把 from 换成 to（只换第一处）。找不到注入点直接抛 —— 
 * 那种情况说明文件写法变了，测试本身该失败，而不是静默跳过。 */
const poke = (file, from, to) => {
  const text = fs.readFileSync(abs(file), "utf8");
  if (!text.includes(from)) throw new Error(`注入点没找到：${file} 里没有「${from}」`);
  fs.writeFileSync(abs(file), text.replace(from, to), "utf8");
};

console.log("version.mjs 负向测试\n");

try {
  /* ---------- ① 正样本 ---------- */
  console.log("正样本（守卫必须「会过」，否则它可能只是永远报错）：");
  {
    const r = runCli("--check");
    ok("四处一致时 exit 0", r.status === 0, `实际 exit ${r.status}`);
    ok("输出含一致性结论", /四处一致/.test(r.text));
  }

  /* ---------- ② 负样本：逐处注入 ---------- */
  console.log("\n负样本（每一处单独改歪，必须 exit 1 且点名位置）：");
  const CASES = [
    { name: "sw.js 的 CACHE 常量", file: "sw.js", from: `const CACHE = "wordlens-cache-v${V}"`, to: `const CACHE = "wordlens-cache-v${BROKEN}"`, expect: "sw.js  CACHE 常量" },
    { name: "sw.js 的头注释", file: "sw.js", from: `缓存策略（v${V}`, to: `缓存策略（v${BROKEN}`, expect: "sw.js  头注释" },
    { name: "app.js 的回退默认值", file: "assets/app.js", from: `assetVersion || "${V}"`, to: `assetVersion || "${BROKEN}"`, expect: "app.js 回退默认值" },
    { name: "index.html 的单处 ?v=", file: "index.html", from: `?v=${V}`, to: `?v=${BROKEN}`, expect: "index.html 静态资源" },
    { name: "真源 data-config.js（改歪真源 → 其余各处都该报不一致）", file: "assets/data-config.js", from: `assetVersion: "${V}"`, to: `assetVersion: "${BROKEN}"`, expect: "不一致" },
  ];
  for (const c of CASES) {
    poke(c.file, c.from, c.to);
    const r = runCli("--check");
    ok(`改歪「${c.name}」→ exit 1`, r.status === 1, `实际 exit ${r.status}`);
    ok(`  ↳ 点名到 ${c.expect}`, r.text.includes(c.expect), `输出未包含该位置`);
    restoreAll();
  }

  /* ---------- ③ 修复路径 ---------- */
  console.log("\n修复路径（--sync 必须真能修回来）：");
  {
    poke("sw.js", `const CACHE = "wordlens-cache-v${V}"`, `const CACHE = "wordlens-cache-v${BROKEN}"`);
    poke("assets/app.js", `assetVersion || "${V}"`, `assetVersion || "${BROKEN}"`);
    const broken = runCli("--check");
    ok("注入两处后确实是坏的", broken.status === 1);

    const sync = runCli("--sync");
    ok("--sync 自身 exit 0", sync.status === 0, `实际 exit ${sync.status}`);
    ok("--sync 报告改动了 sw.js CACHE", /sw\.js\s+CACHE 常量\s+改写 1 处/.test(sync.text));

    const after = runCli("--check");
    ok("--sync 之后 --check 回到 exit 0", after.status === 0, `实际 exit ${after.status}`);
  }

  /* ---------- ④ 还原保真 ---------- */
  console.log("\n还原保真（测试不能留下任何副作用）：");
  {
    let same = true, diff = "";
    for (const f of TARGETS) {
      const now = fs.readFileSync(abs(f), "utf8");
      if (now !== snapshot.get(f)) { same = false; diff += ` ${f}`; }
    }
    ok("四个文件与测试开始时逐字节一致", same, `不一致：${diff}`);
  }
} catch (e) {
  fail++;
  console.log(`  ✗ 测试抛异常：${e.message}`);
} finally {
  restoreAll();
}

console.log(`\n${pass}/${pass + fail} 通过`);
process.exit(fail ? 1 : 0);

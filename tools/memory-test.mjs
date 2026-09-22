#!/usr/bin/env node
/* 词阅 WordLens —— 记忆体积护栏的三档边界（`tools/lib-memory.mjs`）
 *
 * 为什么要单独测：这条尺子 2026-09-21 装上时**只做过一次手工验证，没有任何测试覆盖**。
 * 而它 2026-09-22 晚多了一档「预警」——「贴着上限」不再等于绿 ——
 * 目的正是消灭「蒸馏修过一次、下一轮又满」。**新增的分支没有负向测试，就等于没有分支。**
 *
 * 本文件验证：
 *   A. 水位顺序不变量：`MEM_TARGET < MEM_SOFT < MEM_LIMIT`（写反了 → 预警永远不响或永远响）
 *   B. 六档边界：不存在 / 目标 / 预警线 / 预警线+1 / 上限 / 上限+1
 *   C. 告警文案本身：超限要点明「静默截断」与迁移去向；预警要给出**目标水位**、
 *      并且必须说清「现在还没截断」—— 否则运维会把预警当成已经出事了
 *   D. 只打印、不抛错：文件不存在时必须静默返回 `{chars:null}`（CI 检出后没有 `.workbuddy/`）
 *   E. ★ **这些断言自己会不会红**：把尺子的源码在内存里按四种「真实会犯的错」改写，
 *      断言行为确实变了 —— 否则 B/C 段可能只是「期望值与实现互为镜像」的假绿。
 *
 * 全程只在 `.tmp/memory-test/` 里造假根，**不碰真实 `.workbuddy/`**。
 * E 段用**内存求值**而不是「写盘再还原」：写盘的代价是「进程被杀 = 尺子留在坏状态」，
 * 而这条尺子 `release` 每次都调 —— 不值得为一个测试引入这种风险。
 * 用法：node tools/memory-test.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { MEM_LIMIT, MEM_SOFT, MEM_TARGET, checkMemorySize, memoryChars } from "./lib-memory.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const TMP = path.join(ROOT, ".tmp", "memory-test");
fs.rmSync(TMP, { recursive: true, force: true });
fs.mkdirSync(TMP, { recursive: true });

let pass = 0;
let fail = 0;
const ok = (name, cond) => { if (cond) pass++; else { fail++; console.log(`✗ ${name}`); } };

/* 拦下 console.log：断言「该响的那一档真的打印了」。
   只看返回值会漏掉「判对了却没打印」—— 那正好是 09-21 把护栏只挂在 daily 上的同款错误。 */
const capture = fn => {
  const orig = console.log;
  const buf = [];
  console.log = s => buf.push(String(s));
  try { return { ret: fn(), out: buf.join("\n") }; } finally { console.log = orig; }
};

/* 造一个「只有 MEMORY.md 的仓库根」。`n === null` → 连目录都不建（模拟 CI 检出）。 */
const makeRoot = n => {
  const root = path.join(TMP, `c${n === null ? "none" : n}`);
  if (n !== null) {
    fs.mkdirSync(path.join(root, ".workbuddy", "memory"), { recursive: true });
    fs.writeFileSync(path.join(root, ".workbuddy", "memory", "MEMORY.md"), "x".repeat(n), "utf8");
  }
  return root;
};
const observe = (mod, n) => {
  const { ret, out } = capture(() => mod.checkMemorySize(makeRoot(n), { prefix: "" }));
  return { over: ret.over, near: ret.near, warn: out.includes("⚠"), out };
};

const real = { MEM_LIMIT, MEM_SOFT, MEM_TARGET, checkMemorySize };
const probe = n => observe(real, n);

/* ---------- A. 顺序不变量 ---------- */
ok(`水位顺序 MEM_TARGET(${MEM_TARGET}) < MEM_SOFT(${MEM_SOFT}) < MEM_LIMIT(${MEM_LIMIT})`,
  MEM_TARGET < MEM_SOFT && MEM_SOFT < MEM_LIMIT);
ok("目标水位必须留出「一轮中等工作日」的余量（≥500 字符）",
  MEM_LIMIT - MEM_TARGET >= 500);

/* ---------- B. 六档边界 ---------- */
/* `warn` 是「这一档该不该出现 ⚠」；边界取闭区间：恰好等于预警线/上限都**不算**越过。 */
const CASES = [
  [null, "文件不存在（CI）", { over: false, near: false, warn: false }],
  [MEM_TARGET, "恰好目标水位", { over: false, near: false, warn: false }],
  [MEM_SOFT, "恰好预警线", { over: false, near: false, warn: false }],
  [MEM_SOFT + 1, "越过预警线 1 字符", { over: false, near: true, warn: true }],
  [MEM_LIMIT, "恰好上限", { over: false, near: true, warn: true }],
  [MEM_LIMIT + 1, "越过上限 1 字符", { over: true, near: false, warn: true }],
];
for (const [n, label, want] of CASES) {
  const got = probe(n);
  ok(`${label}：over=${want.over}`, got.over === want.over);
  ok(`${label}：near=${want.near}`, got.near === want.near);
  ok(`${label}：告警行${want.warn ? "应出现" : "不该出现"}`, got.warn === want.warn);
}

/* 反向对照：`memoryChars` 必须真在量文件，不是返回常量 —— 否则上面全绿也没意义。 */
ok("memoryChars 真的读文件（不存在 → null）", memoryChars(makeRoot(null)) === null);
ok("memoryChars 真的读文件（3201 字符 → 3201）", memoryChars(makeRoot(MEM_SOFT + 1)) === MEM_SOFT + 1);

/* ---------- C. 告警文案 ---------- */
const overOut = probe(MEM_LIMIT + 1).out;
ok("超限文案点明「静默截断」这个后果", /静默截断/.test(overOut));
ok("超限文案给出迁移去向 REFERENCE-mechanics.md", /REFERENCE-mechanics\.md/.test(overOut));
const nearOut = probe(MEM_SOFT + 1).out;
ok("预警文案给出目标水位（否则不知道该压到多少）", nearOut.includes(String(MEM_TARGET)));
ok("预警文案说清「现在还没截断」（预警 ≠ 已经出事）", /还没截断/.test(nearOut));
ok("预警文案报出剩余余量", nearOut.includes(String(MEM_LIMIT - (MEM_SOFT + 1))));
ok("正常档不打 ⚠、也带上目标水位便于对照", (() => {
  const o = probe(MEM_TARGET).out;
  return !o.includes("⚠") && o.includes(String(MEM_TARGET));
})());

/* ---------- D. 只打印、不抛错 ---------- */
let threw = false;
try { probe(null); } catch { threw = true; }
ok("文件不存在时不抛错（否则 CI 上会瘫）", !threw);

/* ---------- E. ★ 这些断言自己会不会红（内存里注入坏样本，不写盘） ----------
 * 只断言「返回值对不对」还不够 —— 期望值与实现可能是互为镜像的一对。
 * 所以把源码读出来、去掉 import/export 后在内存里求值，按四种「真实会犯的错」改写，
 * 再断言**在某个具体边界上行为确实变了**（变了 = B/C 段的断言会红 = 它们不是摆设）。
 *
 * 为什么用内存求值而不是「改写文件再 try/finally 还原」（version-test.mjs 走的是写盘那条路）：
 * 尺子文件被留在坏状态时，受害的是**每次 `release` 都调它**这件事；而进程被杀时 finally 不保证执行。
 * 一个测试不该为自身引入这种风险。 */
const LIB_PATH = path.join(ROOT, "tools", "lib-memory.mjs");
const rawBefore = fs.readFileSync(LIB_PATH);
const libSrc = rawBefore.toString("utf8")
  .replace(/^import .*$/gm, "")            // import 由参数注入
  .replace(/^export /gm, "");              // 只匹配行首，别碰注释里出现的单词
const loadLib = src => new Function("fs", "path",
  `${src}\nreturn { MEM_LIMIT, MEM_SOFT, MEM_TARGET, checkMemorySize };`)(fs, path);

const loaded = loadLib(libSrc);
ok("内存求值出的模块与真实模块常量一致（口径没走样）",
  loaded.MEM_LIMIT === MEM_LIMIT && loaded.MEM_SOFT === MEM_SOFT && loaded.MEM_TARGET === MEM_TARGET);

const MUTATIONS = [
  ["预警分支永不触发（near 恒假）",
    "const near = !over && chars > MEM_SOFT;", "const near = false;", MEM_SOFT + 1, "near"],
  ["边界写成闭区间（恰好等于上限也判作超）",
    "const over = chars > MEM_LIMIT;", "const over = chars >= MEM_LIMIT;", MEM_LIMIT, "over"],
  ["预警档判对了却不打印（静默降级）",
    "  } else if (near) {\n    console.log", "  } else if (false) {\n    console.log", MEM_SOFT + 1, "warn"],
  ["预警线抬到闸门（等于没有预警带）",
    `const MEM_SOFT = ${MEM_SOFT};`, `const MEM_SOFT = ${MEM_LIMIT};`, MEM_SOFT + 1, "near"],
];
for (const [name, from, to, n, field] of MUTATIONS) {
  /* 锚点不匹配必须明确报错 —— 静默不替换就是假绿（neg.mjs 铁律 ①）。 */
  if (!libSrc.includes(from)) {
    fail++;
    console.log(`✗ 坏样本锚点失效（静默不替换 = 假绿）：${name}`);
    continue;
  }
  const mutated = observe(loadLib(libSrc.replace(from, to)), n);
  ok(`坏样本「${name}」会被 B/C 段抓住`, probe(n)[field] !== mutated[field]);
}

/* ---------- F. E 段全程只改内存，没碰盘上的尺子 ---------- */
ok("盘上尺子逐字节未变（坏样本只在内存里求值）",
  Buffer.compare(rawBefore, fs.readFileSync(LIB_PATH)) === 0);

/* 清理：best-effort —— 本机 safe-delete 垫片可能拦住递归删除，**别让清理失败翻转结论**。 */
try { fs.rmSync(TMP, { recursive: true, force: true }); } catch { /* 留几个假根不影响任何测试 */ }

console.log(`记忆体积护栏：${pass} 通过 / ${fail} 失败`);
process.exit(fail ? 1 : 0);

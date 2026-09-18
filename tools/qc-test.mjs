#!/usr/bin/env node
/* 词阅 WordLens —— qc.mjs 门禁语义回归
 *
 * 盯的是「什么都不检查」被当成「检查通过」这一类失败路径：
 *   · 空清单 → 必须退出码 2，不能算通过
 *   · 清单点名的 id 全部不存在 → 不加 --strict-ids 时主循环一个都不进、
 *     bad 为空、退出码 0。这正是 daily 里「新文章全军覆没被判通过」的根因。
 *     所以 daily 现在改成自己数「最终留下几篇」；本测试把这个语义钉住。
 */
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..");
const TMP = path.join(ROOT, ".tmp");
const node = process.execPath;
const results = [];
const check = (name, ok, detail) => {
  results.push([name, ok]);
  console.log(`  ${ok ? "✓" : "✗"} ${name}${detail && !ok ? `  → ${detail}` : ""}`);
};
const qc = args => {
  const r = spawnSync(node, [path.join(ROOT, "tools", "qc.mjs"), ...args], { encoding: "utf8" });
  return { code: r.status, out: (r.stdout || "") + (r.stderr || "") };
};

fs.mkdirSync(TMP, { recursive: true });
const emptyFile = path.join(TMP, "qc-test-empty.txt");
const ghostFile = path.join(TMP, "qc-test-ghost.txt");
fs.writeFileSync(emptyFile, "");
fs.writeFileSync(ghostFile, "no-such-article-1\nno-such-article-2");

console.log("== 1. 空清单 ==");
{
  const r = qc(["--ids-file", ".tmp/qc-test-empty.txt"]);
  check("空清单退出码 2（不能算通过）", r.code === 2, "code=" + r.code);
}

console.log("\n== 2. 清单 id 全部不存在 ==");
{
  const lenient = qc(["--ids-file", ".tmp/qc-test-ghost.txt"]);
  check("不加 --strict-ids 时确实会静默通过（这正是旧 bug 的成因）", lenient.code === 0, "code=" + lenient.code);
  check("但会打印「id 不存在」提示", /不存在/.test(lenient.out), lenient.out.split("\n")[0]);
  const strict = qc(["--ids-file", ".tmp/qc-test-ghost.txt", "--strict-ids"]);
  check("--strict-ids 下退出码 1", strict.code === 1, "code=" + strict.code);
}

console.log("\n== 3. 正常全量 ==");
{
  const r = qc(["--all"]);
  /* 总数不能硬编码（19 → 43 → …，库一扩就烂）：只锁「有分母、分子不超分母」这个形状。
   * 2026-09-18 修正：原先还要求 r.code === 0（= 全库合格）—— 但库里只要有文章被 qc 判拒收
   * （实测足球 4 篇：F2「文章偏旧」×4 + 皮克篇 F1「内容不可读」/ F4 漏译 ×5），
   * qc --all 返回 1 是**正确行为**，不该判测试失败。两者混在一起会让人分不清
   * 「qc 工具坏了」（要修工具）和「库里有不合格文章」（要修内容或下架）——
   * 这个库里两种状态会长期并存，断言必须只盯工具本身。
   * 现在锁的是工具健康：能跑完、带出分母、分子不超分母、退出码不是崩溃（2=空清单，>1=异常）。 */
  const mm = r.out.match(/已带推荐评分 (\d+)\/(\d+)/);
  check("--all 能跑完并带出文章总数（不要求全库合格）",
    r.code <= 1 && mm && +mm[1] <= +mm[2] && +mm[2] > 0,
    "code=" + r.code + " · " + (mm ? `${mm[1]}/${mm[2]}` : "无评分行"));
}

fs.rmSync(emptyFile, { force: true });
fs.rmSync(ghostFile, { force: true });

const passed = results.filter(r => r[1]).length;
console.log(`\n结果：${passed} 通过 / ${results.length - passed} 失败`);
if (passed !== results.length) process.exitCode = 1;

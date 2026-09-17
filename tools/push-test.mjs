#!/usr/bin/env node
/* 词阅 WordLens —— _api-push.mjs 清单闸门回归
 *
 * 盯的是「显式清单点名了某个文件、本地却没有」这条路：原先只打一句警告就继续提交，
 * 会出现正文传上去、它引用的配图没传，却报发布成功（线上 404）。
 * 现在必须在任何网络调用之前 exit 2。
 *
 * 测试用假 token（GITHUB_TOKEN=dummy）跑真实脚本：
 *   · 缺文件 → 必须在取 token 之前就退出 2，错误信息是「本地不存在」
 *   · 文件齐 → 不该被这道闸拦下（会继续走到网络层，因假 token 而 401）
 *   · --manifest 与 --files 并用 → 两条清单合并后再过同一道闸（2026-09-14 新增）：
 *     并用的意义是让发布基线的 articles[] 也能更新，见 _api-push.mjs 头部注释。
 *   · NEVER_PUSH / *.local.* / 含个人偏好的计划稿 → 硬拦截（2026-09-17 新增）：
 *     这条管的是「文件在本地、也被点名，但不许外传」，与「本地缺文件」是两条路。
 *     仓库是 public 且 Pages 服务整个仓库根目录，漏一个就等于贴在公网上。
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

fs.mkdirSync(TMP, { recursive: true });
const badMf = path.join(TMP, "push-test-missing.json");
const okMf = path.join(TMP, "push-test-ok.json");
fs.writeFileSync(badMf, JSON.stringify({ batch: "push-test", push: ["assets/definitely-missing-file.js"], delete: [], kept: [] }));
fs.writeFileSync(okMf, JSON.stringify({ batch: "push-test", push: ["assets/app.js"], delete: [], kept: [] }));

const run = (mf, extraArgs = []) => {
  const r = spawnSync(node, [path.join(ROOT, "tools", "_api-push.mjs"), "test: 闸门", "--manifest", mf, ...extraArgs], {
    cwd: ROOT, encoding: "utf8", timeout: 60000,
    env: { ...process.env, GITHUB_TOKEN: "dummy-token-for-test" },
  });
  return { code: r.status, out: (r.stdout || "") + (r.stderr || "") };
};

console.log("== 1. 清单点名但本地不存在 ==");
{
  const r = run(badMf);
  check("退出码 2", r.code === 2, "code=" + r.code);
  check("给出「本地不存在」的明确原因", /本地不存在/.test(r.out));
  check("在取 token / 联网之前就中止（没有 401 等网络痕迹）",
    !/401|Bad credentials|git credential/.test(r.out));
  check("声明远端未改动", /远端分支未做任何改动/.test(r.out));
}

console.log("\n== 2. 清单文件齐全（不该被这道闸拦下） ==");
{
  const r = run(okMf);
  check("不是被存在性闸拦下的", !/本地不存在/.test(r.out), "code=" + r.code);
}

console.log("\n== 3. --manifest 与 --files 并用（清单合并） ==");
{
  /* 并用时 --files 点名的文件也要过存在性闸：证明两份清单确实合并成了一份，
   * 而不是后一个参数把前一个覆盖掉。 */
  const bad = run(okMf, ["--files", "assets/definitely-missing-file.js"]);
  check("manifest 齐 + files 缺 → 仍退出 2", bad.code === 2, "code=" + bad.code);
  check("点出的正是 --files 那个（说明清单合并了）", /definitely-missing-file\.js/.test(bad.out));
  check("同样在取 token 之前中止", !/401|Bad credentials|git credential/.test(bad.out));

  const ok = run(okMf, ["--files", "assets/styles.css,index.html"]);
  check("manifest 齐 + files 齐 → 不被存在性闸拦下", !/本地不存在/.test(ok.out), "code=" + ok.code);
}

console.log("\n== 4. NEVER_PUSH 硬拦截（2026-09-17 新增） ==");
{
  /* 这一段盯的是「文件确实在本地、也确实被清单点名，但性质上不许外传」——
   * 与第 1/3 段的「本地缺文件」是两条完全不同的路，别混。
   * 顺序断言是重点：拦截必须发生在**存在性检查之前**。否则文件一旦被改名或移走，
   * 只剩「本地不存在」的报错，看起来像路径写错，泄露风险会被误判。
   * 背景：2026-09-17 那份人物计划稿（含 30 人偏好清单）就是这样经 --files 上了 public 仓库。 */
  const doc = run(okMf, ["--files", "PEOPLE-ICONS-CHANGE-PLAN-2026-09-17.md"]);
  check("含个人偏好的计划稿 → 退出 2", doc.code === 2, "code=" + doc.code);
  check("报的是「绝不推送」而不是「本地不存在」", /绝不推送/.test(doc.out), doc.out.slice(0, 300));
  check("同样在取 token 之前中止", !/401|Bad credentials|git credential/.test(doc.out));

  const local = run(okMf, ["--files", "whatever.local.md"]);
  check("*.local.* 后缀 → 退出 2 且报「绝不推送」", local.code === 2 && /绝不推送/.test(local.out), "code=" + local.code);

  const key = run(okMf, ["--files", "tools/.deepl-key"]);
  check("密钥类路径 → 退出 2 且报「绝不推送」", key.code === 2 && /绝不推送/.test(key.out), "code=" + key.code);

  const fine = run(okMf, ["--files", "HANDOFF.md"]);
  check("普通文档不受这条闸影响", !/绝不推送/.test(fine.out), "code=" + fine.code);
}

fs.rmSync(badMf, { force: true });
fs.rmSync(okMf, { force: true });

const passed = results.filter(r => r[1]).length;
console.log(`\n结果：${passed} 通过 / ${results.length - passed} 失败`);
if (passed !== results.length) process.exitCode = 1;

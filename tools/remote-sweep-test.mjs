#!/usr/bin/env node
/* 词阅 WordLens —— 远端残留对账回归（tools/lib-tree.mjs + publish.mjs 的 1b 段）
 *
 * 盯的是「远端有、本地没有」该不该删。这条边界两边都很贵：
 *   · 判太松 → 把 GitHub Actions 每天抓来的新封面当残留删掉，线上文章直接断图；
 *   · 判太严 → 撤栏目 / 撤功能留下的残留永远清不掉（2026-09-15 之前正是如此，
 *     两次都靠手写清单绕过 publish.mjs）。
 * 两种来源在路径上完全无法区分（都是「远端有、本地没有、又不在发布基线里」），
 * 唯一的判据是「远端自己还引用这张图吗」。
 *
 * 用例分两段：
 *   离线段 —— 判决函数、引用口径、.gitignore、blob sha 算法、publish.mjs 的接入与降级
 *   联网段 —— 需要 token，CI（ubuntu runner 读不到 Windows 凭据库）会自动跳过
 */
import fs from "node:fs";
import path from "node:path";
import { spawnSync, execFileSync } from "node:child_process";
import {
  classifyRemoteOnly, referencedCovers, evalArticleData, blobSha, loadIgnore, listLocalPaths,
  getToken, fetchRemoteTree, fetchBlob, ARTICLE_DATA_FILES,
} from "./lib-tree.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const node = process.execPath;
const results = [];
const check = (name, ok, detail) => {
  results.push([name, ok]);
  console.log(`  ${ok ? "✓" : "✗"} ${name}${detail && !ok ? `  → ${detail}` : ""}`);
};
const skip = name => console.log(`  – ${name}（跳过）`);

/* ---------- 本地文章数据（离线段的共同底座，等同 publish.mjs 的引用口径） ---------- */
const sources = new Map();
for (const f of ARTICLE_DATA_FILES) {
  const p = path.join(ROOT, f);
  if (fs.existsSync(p)) sources.set(f, fs.readFileSync(p, "utf8"));
}
const { articles, coverMap } = evalArticleData(sources);
const inUse = referencedCovers(articles, coverMap);

console.log("== 1. classifyRemoteOnly：判决边界 ==");
{
  const ref = new Set(["anne-0.jpg", "monica-1.jpg"]);
  const only = [
    "assets/covers/anne-0.jpg",         // 被远端引用 → 保留（多半是 CI 刚抓的）
    "assets/covers/monica-1.jpg",       // 被远端引用 → 保留
    "assets/covers/st-old-orphan.jpg",  // 无人引用 → 可清
    "assets/covers/ft-old-orphan.jpg",  // 无人引用 → 可清
    "assets/data-sprint.js",            // 非封面 → 可清
    "tools/build-sprint.mjs",           // 非封面 → 可清
  ];
  const { prunable, kept } = classifyRemoteOnly(only, { referenced: ref });

  check("被远端引用的封面保留（不删 CI 抓的内容）",
    kept.length === 2 && kept.includes("assets/covers/anne-0.jpg") && kept.includes("assets/covers/monica-1.jpg"),
    JSON.stringify(kept));
  check("无人引用的封面可清",
    prunable.includes("assets/covers/st-old-orphan.jpg") && prunable.includes("assets/covers/ft-old-orphan.jpg"));
  check("非封面文件可清（daily.mjs 不会凭空造源码文件）",
    prunable.includes("assets/data-sprint.js") && prunable.includes("tools/build-sprint.mjs"));
  check("分类不丢件（prunable + kept = 输入）", prunable.length + kept.length === only.length);
  check("引用集合为空 → 全部落进可清（调用方绝不能在这状态下删）",
    classifyRemoteOnly(only, { referenced: new Set() }).prunable.length === only.length);
  check("空输入不炸", (() => { const r = classifyRemoteOnly([]); return !r.prunable.length && !r.kept.length; })());
}

console.log("\n== 2. 真实数据回放：在用的封面一张都不能删 ==");
{
  check(`本地引用集合非空（实测 ${inUse.size} 张）`, inUse.size > 0);
  const asRemoteOnly = [...inUse].map(f => "assets/covers/" + f);
  const { prunable, kept } = classifyRemoteOnly(asRemoteOnly, { referenced: inUse });
  check(`线上在用的 ${kept.length} 张封面全部保留、0 张误删`, prunable.length === 0 && kept.length === inUse.size,
    "prunable=" + JSON.stringify(prunable.slice(0, 5)));

  /* 反向：造一批无人引用的孤儿，必须全部可清 —— 这就是撤栏目那一轮的形态 */
  const orphans = Array.from({ length: 40 }, (_, i) => `assets/covers/zz-orphan-${i}.jpg`);
  const r2 = classifyRemoteOnly(orphans, { referenced: inUse });
  check("40 张孤儿封面全部判为可清", r2.prunable.length === 40 && r2.kept.length === 0);
}

console.log("\n== 3. referencedCovers 口径 ==");
{
  const withCover = articles.filter(a => a.coverImg || coverMap[a.id]);
  check(`有封面的文章 ${withCover.length}/${articles.length} 篇都进了引用集合`,
    withCover.every(a => inUse.has(path.basename(a.coverImg || coverMap[a.id]))));
  const skipped = referencedCovers(articles, coverMap, { skipIds: new Set(articles.map(a => a.id)) });
  check("skipIds 覆盖全部文章 → 引用集合清空（瘦身场景）", skipped.size === 0);
  const bodyImgs = new Set();
  for (const a of articles) for (const p of a.paras || []) if (p.img) bodyImgs.add(path.basename(p.img));
  check(`正文图 ${bodyImgs.size} 张也在引用集合里`, [...bodyImgs].every(f => inUse.has(f)));
}

console.log("\n== 4. .gitignore 与本地枚举 ==");
{
  const paths = listLocalPaths(ROOT);
  const list = [...paths];
  check(".bak/ 被忽略（否则会把几百 MB 批次快照当工作树）", !list.some(p => p.startsWith(".bak/")));
  check(".tmp/ 被忽略", !list.some(p => p.startsWith(".tmp/")));
  check("assets/covers/ 在册", list.some(p => p.startsWith("assets/covers/")));
  check("tools/lib-tree.mjs 在册", paths.has("tools/lib-tree.mjs"));
  const ig = loadIgnore(ROOT);
  check("loadIgnore 对普通源码文件返回 false", ig("assets/app.js") === false);
}

console.log("\n== 5. blob sha 算法与 git 一致 ==");
{
  const sample = "index.html";
  const gitSha = execFileSync("git", ["hash-object", sample], { cwd: ROOT, encoding: "utf8" }).trim();
  const mine = blobSha(fs.readFileSync(path.join(ROOT, sample)));
  check("blobSha 与 git hash-object 同结果（对不上就整条对账失真）", mine === gitSha, `${mine} vs ${gitSha}`);
}

console.log("\n== 6. publish.mjs 的接入与降级 ==");
{
  const run = extra => spawnSync(node, [path.join(ROOT, "tools", "publish.mjs"), "--dry", ...extra],
    { cwd: ROOT, encoding: "utf8", timeout: 120000 });
  const out = r => (r.stdout || "") + (r.stderr || "");

  const off = run(["--no-remote"]);
  check("--dry --no-remote 正常退出（0）", off.status === 0, "code=" + off.status);
  check("远端对账段确实执行了", /远端残留：/.test(out(off)));
  check("--no-remote 明确声明不删远端独有文件", /--no-remote 关闭/.test(out(off)));
  check("关闭时不产生删除项", !/删除构成/.test(out(off)));

  /* 无凭据降级：把 python 从 PATH 里藏掉，等价于 CI（ubuntu runner 读不到 Windows 凭据库）。
   * 关键断言是**仍然正常退出** —— 对账是 fail-soft，绝不能因为拿不到 token 阻断发布。 */
  const nodeDir = path.dirname(node);
  const noCred = spawnSync(node, [path.join(ROOT, "tools", "publish.mjs"), "--dry"], {
    cwd: ROOT, encoding: "utf8", timeout: 120000,
    env: { ...process.env, GITHUB_TOKEN: "", PATH: nodeDir + path.delimiter + "/usr/bin" + path.delimiter + "/bin" },
  });
  const noCredOut = out(noCred);
  check("无 token 时发布照常成功（fail-soft）", noCred.status === 0, "code=" + noCred.status);
  check("无 token 时明说跳过了对账", /远端残留：已跳过/.test(noCredOut));
  check("无 token 时声明不删任何远端文件", /本次不删任何远端独有文件/.test(noCredOut));
}

console.log("\n== 7. 联网：远端引用口径必须与本地一致 ==");
{
  const token = getToken(ROOT);
  if (!token) {
    skip("拉远端树 + 比对引用集合");
  } else {
    let remoteMap = null;
    try { remoteMap = await fetchRemoteTree(token); } catch (e) { check("拉远端树", false, e.message); }

    if (remoteMap) {
      check(`远端树拉到了 ${remoteMap.size} 个 blob`, remoteMap.size > 0);

      /* 远端的数据文件跑出来的引用集合，必须与本地算的几乎一致 ——
       * 差太多就说明「同一段 evalArticleData」被绕过了，判决会失准。 */
      const rs = new Map();
      let downloaded = 0;
      for (const f of ARTICLE_DATA_FILES) {
        const sha = remoteMap.get(f);
        if (!sha) continue;
        const p = path.join(ROOT, f);
        if (fs.existsSync(p) && blobSha(fs.readFileSync(p)) === sha) rs.set(f, fs.readFileSync(p, "utf8"));
        else { rs.set(f, (await fetchBlob(token, sha)).toString("utf8")); downloaded++; }
      }
      const rd = evalArticleData(rs);
      const remoteRef = referencedCovers(rd.articles, rd.coverMap);
      check(`远端引用集合可用（${remoteRef.size} 张，其中 ${downloaded} 个数据文件是下载的）`, remoteRef.size > 0);
      check("远端与本地引用集合一致（同一把尺子）", remoteRef.size === inUse.size,
        `远端 ${remoteRef.size} vs 本地 ${inUse.size}`);

      /* 端到端：真实的「远端有、本地没有」名单，喂进判决函数，
       * 断言远端还在引用的封面不会被判可清。 */
      const localPaths = listLocalPaths(ROOT);
      const onlyRemote = [...remoteMap.keys()].filter(p => !localPaths.has(p));
      const { prunable, kept } = classifyRemoteOnly(onlyRemote, { referenced: remoteRef });
      const covers = onlyRemote.filter(p => p.startsWith("assets/covers/"));
      const keptInUse = kept.filter(p => remoteRef.has(path.basename(p)));
      check(`远端独有 ${onlyRemote.length} 项分类完毕（可清 ${prunable.length} · 保留 ${kept.length}）`,
        prunable.length + kept.length === onlyRemote.length);
      check("远端仍在引用的独有封面全部落在保留侧", keptInUse.length === kept.length,
        `保留 ${kept.length} 项里只有 ${keptInUse.length} 项是被引用的`);
      check("封面候选里没有一个还能被远端引用到",
        covers.filter(p => !remoteRef.has(path.basename(p))).every(p => prunable.includes(p)));
    }
  }
}

const passed = results.filter(r => r[1]).length;
console.log(`\n结果：${passed} 通过 / ${results.length - passed} 失败`);
if (passed !== results.length) process.exitCode = 1;

#!/usr/bin/env node
/* 词阅 WordLens —— 发布可靠性回归测试
 *
 * 用法： node tools/release-test.mjs
 *
 * 覆盖三件事，全部自带还原保护（任何一步崩了都会把工作区拷回原样）：
 *   A. 完整回滚：故意用极小配额把文章删到 9 篇、图归档 45 张，再回滚，
 *      断言 assets/ 逐字节回到测试前（数据文件与图片一起回来）
 *   B. 置顶豁免：给一篇文章加 pin:true，用 --per-cat 1 发布，断言它没被淘汰
 *   C. 校验门禁：注入一篇 paras 为空的坏文章，断言发布以退出码 2 拒绝，
 *      且线上数据一个字节都没变
 *
 * 本测试会临时改写 assets/data-articles-extra.js，跑完自动还原。
 * 不要在有未提交改动的状态下跑——它会连你的改动一起还原（还原源是它自己拍的快照）。
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { spawnSync } from "node:child_process";
import { createBatch, restoreBatch, listBatches, latestBatch, latestDangling, readPublished, writePublished, SNAPSHOT_FILES, SNAPSHOT_COVERS } from "./lib-release.mjs";
import { readDecl, writeDecl } from "./lib-text.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const ASSETS = path.join(ROOT, "assets");
const EXTRA = path.join(ASSETS, "data-articles-extra.js");
const COVERS = path.join(ASSETS, "covers");
const SAFE = path.join(ROOT, ".tmp", "release-test-safety");
const node = process.execPath;

const sha1 = f => crypto.createHash("sha1").update(fs.readFileSync(f)).digest("hex");
const fail = msg => { console.error(`\n✗ ${msg}`); process.exitCode = 1; };

/* 逐文件递归复制。不用 fs.cpSync —— 在受限沙箱里它会静默终止进程（退出码 127）。 */
function copyTree(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name), d = path.join(dest, e.name);
    if (e.isDirectory()) copyTree(s, d);
    else fs.copyFileSync(s, d);
  }
}
function listTree(dir, rel = "") {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const r = rel ? rel + "/" + e.name : e.name;
    if (e.isDirectory()) out.push(...listTree(path.join(dir, e.name), r));
    else out.push(r);
  }
  return out;
}

/* ---------- 快照全部需要保护的文件（assets 全量 + sw.js） ---------- */
function snapshot() {
  fs.rmSync(SAFE, { recursive: true, force: true });
  fs.mkdirSync(SAFE, { recursive: true });
  copyTree(ASSETS, path.join(SAFE, "assets"));
  fs.copyFileSync(path.join(ROOT, "sw.js"), path.join(SAFE, "sw.js"));
}
function fingerprint() {
  const out = listTree(ASSETS).sort().map(r => r + " " + sha1(path.join(ASSETS, r)));
  out.push("sw.js " + sha1(path.join(ROOT, "sw.js")));
  return out.join("\n");
}
/* 差量还原：多出来的删掉，缺的/变了的拷回来。不清空整个目录，风险更低。 */
function restoreSafe() {
  const src = path.join(SAFE, "assets");
  const want = new Set(listTree(src));
  for (const r of listTree(ASSETS)) {
    if (!want.has(r)) fs.rmSync(path.join(ASSETS, r), { force: true });
  }
  for (const r of want) {
    const s = path.join(src, r), d = path.join(ASSETS, r);
    fs.mkdirSync(path.dirname(d), { recursive: true });
    fs.copyFileSync(s, d);
  }
  fs.copyFileSync(path.join(SAFE, "sw.js"), path.join(ROOT, "sw.js"));
}
/* readDecl 返回描述符 { src, parts, value }，数组在 .value（与 publish.mjs 口径一致）。 */
const readExtra = () => readDecl(EXTRA, "ARTICLES_EXTRA").value;
/* 一律加 --no-remote：release-test 盯的是本地发布管线，而远端对账要联网拉真实远端树，
 * 既让测试依赖网络，又可能真的往 delete[] 里塞项 —— 那不是这个测试该管的事。
 * 远端对账本身由 tools/remote-sweep-test.mjs 负责。
 *
 * 再钉死 --keep-batches 999：pruneBatches 按 id 字典序丢「最旧的」，而本测试的两个种子
 * 用的是 19000101-*（最小 id）。盘上批次多于 10 个时，测试自己那几次发布就会越界，
 * 把种子——乃至真实批次——当成最旧的清掉。后果有两层：
 *   1. keeperKept 假失败（「别人的真实批次未被误删」出现假红）；
 *   2. 更糟的是真实发布历史会被测试吃掉。
 * 2026-09-15 实测：盘上 7 个真实批次 + 2 个种子 + 测试 4 次发布 = 13，余量一超就掉 3 个批次。
 * 窗口开到 999，prune 在本测试里永不触发；批次清理由下面的 label 认领逻辑负责，
 * 那才是这个测试真正要验的东西。 */
const runPublish = args => spawnSync(node, [path.join(ROOT, "tools", "publish.mjs"), "--no-remote", "--keep-batches", "999", ...args], { encoding: "utf8" });

/* ---------- 开跑 ---------- */
const before = fingerprint();
snapshot();
console.log(`已备份工作区（assets 全量 + sw.js）到 .tmp/release-test-safety/`);
const articles0 = readExtra().length;
const covers0 = fs.readdirSync(COVERS).length;
console.log(`基线：${articles0} 篇文章 · ${covers0} 张图片\n`);

let batch = null;
const results = [];
const releasesRoot = path.join(ROOT, ".bak", "releases");

/* 先摆两个「上次运行被打断留下的」批次目录，再抓测试前快照。
 *   STALE  打 release-test 标签 → 本次运行必须把它清掉（自愈）
 *   KEEPER 打 publish 标签      → 必须原样留下（那是真实发布的批次，碰不得）
 * 这正是实测踩到的形态：中断留下的目录被后续运行当成「别人的」永久保留。
 * 用 1900 年的批次号，万一哪次中断漏了也一眼能认出是测试造物。 */
const STALE_ID = "19000101-000000", KEEPER_ID = "19000101-000001";
let keeperKept = false;   // KEEPER 是否在收尾清理中活了下来（收尾前记录，之后才收走它）
fs.mkdirSync(releasesRoot, { recursive: true });
for (const [id, label] of [[STALE_ID, "release-test"], [KEEPER_ID, "publish"]]) {
  const d = path.join(releasesRoot, id);
  fs.mkdirSync(path.join(d, "before"), { recursive: true });
  fs.writeFileSync(path.join(d, "batch.json"),
    JSON.stringify({ id, label, at: "1900-01-01T00:00:00.000Z", files: [], created: [], covers: 0 }));
}
const preexisting = new Set(fs.readdirSync(releasesRoot));
/* 认领自己留下的批次：label 是本测试打的标记。
 * 光靠「测试开始时的快照」不够 —— 上一次跑被中途打断留下的目录，在下一次运行里
 * 会被当成「别人建的」永久保存下来（实测遇到过：盘上积了 3 个测试批次，而每次
 * 运行都报告「收尾干净」）。按 label 认领就能自愈：真实发布的 label 是 publish，
 * 所以这里绝不会误伤真实批次。 */
const isTestBatch = d => {
  try {
    return JSON.parse(fs.readFileSync(path.join(releasesRoot, d, "batch.json"), "utf8")).label === "release-test";
  } catch { return false; }
};
/* LATEST 指针也要还原：本测试跑发布时会把 LATEST 指到自己的批次，
 * 收尾又把批次目录删了 —— 不还原就会留下一个指向空批次的悬空指针，
 * 之后 rollback latest 直接失败。null 表示测试前本来就没有 LATEST 文件。 */
const latestFile = path.join(releasesRoot, "LATEST");
const latestRaw = fs.existsSync(latestFile) ? fs.readFileSync(latestFile, "utf8").trim() : null;
/* 归一化：测试前 LATEST 若已悬空（指向不存在的批次），视同没有，别把烂指针原样写回 */
const latestBefore = latestRaw && fs.existsSync(path.join(releasesRoot, latestRaw, "batch.json")) ? latestRaw : null;
/* 「上次成功发布」基线也要保护：本测试会写入它以验证清单口径，跑完必须还原 */
const publishedFile = path.join(ROOT, ".bak", "published.json");
const publishedBefore = fs.existsSync(publishedFile) ? fs.readFileSync(publishedFile, "utf8") : null;
/* 造一份基线：内容 = 当前工作区（相当于「上次发布完就是这个样子」）。
 * 不造基线的话 push/delete 都以「远端空」为起点，测不出真实差异逻辑。 */
function seedPublished({ articles = null } = {}) {
  const files = {};
  for (const f of SNAPSHOT_FILES) {
    const p = path.join(ROOT, f);
    if (fs.existsSync(p)) files[f] = sha1(p);
  }
  for (const f of fs.readdirSync(COVERS)) files[SNAPSHOT_COVERS + "/" + f] = sha1(path.join(COVERS, f));
  writePublished(ROOT, {
    at: new Date().toISOString(), commit: "release-test-seed",
    files, articles: articles || readExtra().map(a => a.id),
  });
  return files;
}

/* 被中途打断时不能把半坏的 assets/ 留在盘上。
 * 2026-09-15 实测踩到过一次：测试被中断后，工作树的文章数据停在「播种态」（只剩 6 篇）、
 * 16 张被文章引用的封面被归档走、published.json 被写成 release-test-seed ——
 * 这个状态下再跑一次 publish 就会把「6 篇文章」推上线。而 finally 挡不住这种中断
 * （SIGINT/SIGTERM 直接终止进程，不会回到 finally）。所以显式接管信号：
 * 先还原工作区与批次目录，再退出。 */
for (const sig of ["SIGINT", "SIGTERM"]) {
  process.on(sig, () => {
    console.log(`\n收到 ${sig} —— 先把工作区还原再退出`);
    try { cleanup(); } catch { /* 还原本身失败也不能拖着不退出 */ }
    process.exit(1);
  });
}

try {
  /* ===== D. LATEST 悬空回落（先跑，不依赖批次，只验指针逻辑） ===== */
  console.log("== D. LATEST 悬空回落 ==");
  {
    const ids = listBatches(ROOT);
    const expect = ids.length ? ids[ids.length - 1] : null;
    fs.mkdirSync(releasesRoot, { recursive: true });
    fs.writeFileSync(latestFile, "20990101-000000\n");           // 指向根本不存在的批次
    const danglingId = latestDangling(ROOT);
    const fb = latestBatch(ROOT);
    console.log(`  LATEST=20990101-000000 → 悬空=${danglingId ?? "无"} · latestBatch=${fb ?? "null"}`);
    results.push(["悬空 LATEST 能被识别", danglingId === "20990101-000000"]);
    results.push(["LATEST 悬空时回落到最新真实批次", fb === expect]);
    /* LATEST 文件整个缺失时也应回落 */
    fs.rmSync(latestFile, { force: true });
    results.push(["LATEST 缺失时返回最新真实批次", latestBatch(ROOT) === expect]);
  }

  /* ===== A. 完整回滚 ===== */
  console.log("\n== A. 完整回滚（数据 + 图片） ==");
  /* 先铺一份「上次成功发布 = 当前工作区」的基线：这样 push/delete 才有真实起点，
   * 否则基线为空、delete 恒为 0，测不出「归档的图要通知远端删掉」。 */
  seedPublished();
  batch = createBatch(ROOT, { label: "release-test" });
  const r = runPublish(["--batch", batch.id, "--per-cat", "2", "--evergreen-per-cat", "3"]);
  if (r.status !== 0) throw new Error("发布步骤应当成功但退出码为 " + r.status + "\n" + r.stdout + r.stderr);

  const arts1 = readExtra().length, covs1 = fs.readdirSync(COVERS).length;
  const man = JSON.parse(fs.readFileSync(path.join(batch.dir, "manifest.json"), "utf8"));
  const okA1 = arts1 < articles0 && covs1 < covers0 && man.summary.coversArchived > 0 && man.dropped.length === articles0 - arts1;
  console.log(`  发布后：${arts1} 篇 · ${covs1} 张图 · 归档 ${man.summary.coversArchived} 张 · 推送清单 ${man.push.length} 项 · 删除 ${man["delete"].length} 项`);
  results.push(["发布确实精简了数据并归档了图片", okA1]);
  results.push(["清单记录了被淘汰文章", man.dropped.length === articles0 - arts1]);
  results.push(["删除清单覆盖全部归档图片", man["delete"].length === man.coversArchived.length]);
  results.push(["新增清单列出的都是基线里没有的文章", man.added.every(id => !readPublished(ROOT).articles.includes(id))]);

  const rb = spawnSync(node, [path.join(ROOT, "tools", "rollback.mjs"), batch.id], { encoding: "utf8" });
  console.log(`  ${rb.stdout.trim().split("\n").slice(-1)[0]}`);
  if (rb.status !== 0) throw new Error("回滚失败：\n" + rb.stdout + rb.stderr);

  const arts2 = readExtra().length, covs2 = fs.readdirSync(COVERS).length;
  results.push(["回滚后文章数还原", arts2 === articles0]);
  results.push(["回滚后图片数还原", covs2 === covers0]);
  results.push(["回滚后 assets/ 与 sw.js 逐字节一致", fingerprint() === before]);

  /* ===== B. 置顶豁免 ===== */
  console.log("\n== B. 置顶豁免（pin: true） ==");
  const list = readExtra();
  /* 给每栏最新的一篇加 pin，然后用 --per-cat 1 发布 —— 常规规则下它会被淘汰 */
  const byCat = new Map();
  for (const a of list) {
    const cur = byCat.get(a.cat);
    if (!cur || new Date(a.date || 0) > new Date(cur.date || 0)) byCat.set(a.cat, a);
  }
  const pinned = [...byCat.values()];
  const tagged = list.map(a => pinned.includes(a) ? { ...a, pin: true } : a);
  writeDecl(EXTRA, "ARTICLES_EXTRA", tagged);

  const fpBeforeDry = fingerprint();
  const dry = runPublish(["--dry", "--per-cat", "1", "--evergreen-per-cat", "1"]);
  if (dry.status !== 0) throw new Error("--dry 计划失败：\n" + dry.stdout + dry.stderr);
  const planLine = dry.stdout.split("\n").find(l => l.includes("置顶保留")) || "";
  const keptPinned = Number((planLine.match(/置顶保留 (\d+)/) || [])[1] ?? -1);
  const droppedLine = dry.stdout.split("\n").find(l => l.startsWith("淘汰 ")) || "";
  const droppedIds = droppedLine ? droppedLine.replace(/^淘汰 \d+ 篇：/, "").replace(/\s*…$/, "").split(", ").map(s => s.trim()) : [];
  console.log(`  ${planLine.trim()}`);
  results.push(["--dry 不改动任何文件", fingerprint() === fpBeforeDry]);
  /* 历史通道上线后，库里本来就躺着一堆 pin:true 的经典专题（2026-09-14 起 24 篇）——
   * 「置顶保留」不再是本次测试打的标记数，而是**原有 pin ∪ 本次打的 pin**。 */
  const expectPinned = new Set([...list.filter(a => a.pin).map(a => a.id), ...pinned.map(a => a.id)]).size;
  results.push(["置顶文章数量与标记数一致", keptPinned === expectPinned]);
  results.push(["置顶文章未出现在淘汰名单", !pinned.some(a => droppedIds.includes(a.id))]);

  /* ===== C. 校验门禁 ===== */
  console.log("\n== C. 校验门禁（坏文章必须拦下） ==");
  const broken = readExtra();
  /* titleZh 必须带汉字：否则会被 publish 计划阶段的「中文标题缺汉字」闸先拦下（那闸早于正文完整性闸），
   * 报错信息就不含「校验未通过」——本段要测的是 paras 为空被完整性校验拦下。 */
  broken.push({ id: "test-broken-article", cat: "明星", title: "broken", titleZh: "测试坏文章", date: "2026-09-13", paras: [] });
  writeDecl(EXTRA, "ARTICLES_EXTRA", broken);
  const fpBeforeC = fingerprint();

  /* 显式建批次再复用，不给 publish 自建的机会：它自建的 label 是 publish，
   * 与真实发布的批次混在一起，收尾就分不出该不该删了。 */
  const b3 = createBatch(ROOT, { label: "release-test" });
  const bad = runPublish(["--batch", b3.id, "--per-cat", "25"]);
  const rejected = bad.status === 2 && /校验未通过/.test(bad.stdout + bad.stderr);
  console.log(`  退出码 ${bad.status} · ${rejected ? "已拒绝发布" : "未按预期拒绝"}`);
  if (!rejected) console.log((bad.stdout + bad.stderr).split("\n").slice(-6).join("\n"));
  results.push(["坏文章被校验拦下，退出码 2", rejected]);
  results.push(["拒绝后线上数据零改动", fingerprint() === fpBeforeC]);

  /* 不带 --batch 时 publish 会自建批次。校验失败发生在写盘之前、线上零改动，
   * 那份快照没有回滚价值 —— 应当自清，否则反复失败会在 .bak/releases/ 里越积越多。 */
  const nBeforeB = fs.readdirSync(releasesRoot).length;
  const bad2 = runPublish(["--per-cat", "25"]);
  const nAfterB = fs.readdirSync(releasesRoot).length;
  results.push([`自建批次校验失败会自清（快照数 ${nBeforeB} → ${nAfterB}）`,
    bad2.status === 2 && nAfterB === nBeforeB]);
  /* 复用的批次则必须保留 —— 它是调用方的，删了就是越权 */
  results.push(["复用批次失败时保留（不替调用方做主）",
    bad.status === 2 && fs.existsSync(path.join(b3.dir, "batch.json"))]);

  /* ===== E. 清单基线：运行前就已经改好的内容必须进清单 =====
   * 这是「改好了却推不上去」的回归。旧实现拿批次 before/ 当基线，而 before/ 是在
   * publish 启动那一刻拍的 —— 手工先改完再跑发布，before/ 已经包含改动，差异恒为空。 */
  console.log("\n== E. 发布清单基线（先改再发布） ==");
  {
    /* 先摘掉 C 段塞进去的坏文章，否则这次发布会因校验不过中止 */
    const clean = readExtra().filter(a => a.id !== "test-broken-article");
    writeDecl(EXTRA, "ARTICLES_EXTRA", clean);
    /* 基线：文件=当前、文章只留前 3 篇（这样 added 才有非空可言） */
    seedPublished({ articles: clean.slice(0, 3).map(a => a.id) });
    /* 发布之前就把文件改好，且不改文章数、不触发淘汰 */
    const TARGET = "assets/data-source-health.js";
    fs.appendFileSync(path.join(ROOT, TARGET), `\n// release-test 基线用例 ${Date.now()}\n`);
    const b2 = createBatch(ROOT, { label: "release-test" });
    const r2 = runPublish(["--batch", b2.id, "--per-cat", "99", "--evergreen-per-cat", "99", "--days", "3650"]);
    if (r2.status !== 0) throw new Error("E 段发布应当成功但退出码 " + r2.status + "\n" + r2.stdout + r2.stderr);
    const man2 = JSON.parse(fs.readFileSync(path.join(b2.dir, "manifest.json"), "utf8"));
    console.log(`  改好 ${TARGET} 再发布 → 清单 ${JSON.stringify(man2.push)} · 新增 ${man2.added.length} 篇`);
    results.push(["运行前改好的文件进了推送清单", man2.push.includes(TARGET)]);
    results.push(["没改动的文件不进清单（清单不虚胖）", man2.push.length === 1]);
    results.push(["added 不再恒为空", man2.added.length > 0]);
  }
} catch (e) {
  fail(e.message);
} finally {
  cleanup();
}

/* ---------- 还原与收尾 ----------
 * 抽成函数只为一个理由：信号处理器也要能调它。finally 只覆盖正常退出与抛错，
 * 而 SIGINT / SIGTERM 会直接终止进程，finally 根本不跑。 */
function cleanup() {
  if (cleanup.done) return;          // 清理途中又来一次信号，原地返回
  cleanup.done = true;
  /* 无论成败，把工作区拷回测试前状态。
   * 三段各自 try 包裹：任何一段抛错都不能连累后面的清理，
   * 否则一次指纹异常就会把测试批次目录和悬空的 LATEST 留在盘上。 */
  try {
    const damaged = fingerprint() !== before;
    if (damaged) {
      console.log("\n… 正在还原工作区");
      restoreSafe();
      if (fingerprint() !== before) fail("还原后指纹仍与基线不一致——请手工检查 assets/");
    }
  } catch (e) {
    fail("还原工作区时出错：" + e.message);
  }
  try {
    if (fs.existsSync(releasesRoot)) {
      for (const d of fs.readdirSync(releasesRoot)) {
        if (d === "LATEST") continue;
        if (preexisting.has(d) && !isTestBatch(d)) continue;   // 别人的真实批次：留着
        fs.rmSync(path.join(releasesRoot, d), { recursive: true, force: true });
      }
    }
    /* 还原 LATEST：本来没有就删掉，本来有就写回原值 */
    if (latestBefore === null) fs.rmSync(latestFile, { force: true });
    else fs.writeFileSync(latestFile, latestBefore);
    /* 还原「上次成功发布」基线 —— 测试写过它，留着会让真实发布少推一批文件 */
    if (publishedBefore === null) fs.rmSync(publishedFile, { force: true });
    else fs.writeFileSync(publishedFile, publishedBefore);
    /* KEEPER 是本次特意摆的「真实批次」标本（见文件头）：收尾逻辑有意不删它。
     * 先记录它是否活下来，再把它收走 —— 它终究是测试造物，不该留在盘上。 */
    keeperKept = fs.existsSync(path.join(releasesRoot, KEEPER_ID));
    fs.rmSync(path.join(releasesRoot, KEEPER_ID), { recursive: true, force: true });
  } catch (e) {
    fail("清理测试批次残留时出错：" + e.message);
  }
  fs.rmSync(SAFE, { recursive: true, force: true });
}

/* 收尾断言：跑完测试，LATEST 不能留下悬空指针，也不能动到别人的批次。
 * 这两条针对的正是「一次中断就让残留永久累积」——测试造物要被认领清走，
 * 别人的真实批次一个都不许碰。 */
const staleLeft = fs.existsSync(path.join(releasesRoot, STALE_ID));
results.push(["中断遗留的测试批次（label=release-test）被自愈清掉", !staleLeft]);
results.push(["别人的真实批次（label=publish）未被误删", keeperKept]);
const leftoverTestBatches = fs.existsSync(releasesRoot)
  ? fs.readdirSync(releasesRoot).filter(d => d !== "LATEST" && isTestBatch(d)) : [];
results.push([`收尾后无测试批次残留（剩 ${leftoverTestBatches.length}）`, leftoverTestBatches.length === 0]);
results.push(["收尾后 LATEST 不悬空", latestDangling(ROOT) === null]);
/* 直接比对**指针文件内容**，不要用 latestBatch()：后者在指针缺失时会回落到最新真实
 * 批次（这正是它的职责，见 latestBatch 注释）。于是当测试前本就没有 LATEST 文件
 * （latestBefore === null）时，"latestBatch(...) === latestBefore" 恒不成立 ——
 * 而实际行为（收尾后指针文件不存在）是正确的。2026-09-14 实测在这条上假失败。 */
const latestAfter = fs.existsSync(latestFile) ? fs.readFileSync(latestFile, "utf8").trim() : null;
results.push([`收尾后 LATEST 还原到测试前的值（测试前：${latestBefore ?? "无指针"}）`,
  latestAfter === latestBefore]);
results.push(["收尾后发布基线已还原",
  (fs.existsSync(publishedFile) ? fs.readFileSync(publishedFile, "utf8") : null) === publishedBefore]);

console.log("\n== 结果 ==");
for (const [name, ok] of results) console.log(`  ${ok ? "✓" : "✗"} ${name}`);
const passed = results.filter(r => r[1]).length;
console.log(`\n${passed}/${results.length} 通过`);
if (passed !== results.length) process.exitCode = 1;

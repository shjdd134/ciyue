/* 通过 GitHub Git Data API 推送工作区变更（沙箱 git 无法直连 github.com 时的替代通道）
 *
 *   用法: node tools/_api-push.mjs "<commit message>" [--manifest auto|<path>]
 *         node tools/_api-push.mjs "<commit message>" --only "a.js,b.js"
 *         node tools/_api-push.mjs "<commit message>" --files "assets/app.js,sw.js"
 *
 *   凭据: 优先读环境变量 GITHUB_TOKEN；否则从 Windows 凭据管理器取已缓存 PAT，
 *        不落盘不打印。备用通道 tools/_cred-get.py。
 *
 * 变更清单来源：
 *   1. --manifest auto        读 .bak/releases/LATEST/manifest.json，用其中的
 *                             push[] + delete[]（publish.mjs 产出的完整清单）
 *   2. --manifest <path>      指定 manifest.json 路径，同上
 *   3. --files / --only       显式路径白名单
 *   4. 都不给                  回落到 git status --porcelain
 *
 * --manifest 与 --files **可以并用**（合并两份清单），这是「批次含数据改动、同时
 * 手工改了代码」时的正确姿势：
 *     --manifest auto --files "assets/app.js,assets/styles.css,index.html"
 * 为什么不写成两条命令：批次清单的 push[] 只覆盖数据层（SNAPSHOT_FILES），
 * 而发布基线里的 articles[]（= 线上应该有哪些文章）只有 --manifest 路线会更新。
 * 2026-09-14 实测踩过：先只跑 --files 推代码，articles 停留在上一次写入的值
 * （当时被 release-test 播成了 3 篇），下次 publish 于是误报「新增 16 篇」。
 * 并用的另一个好处是同一棵树、同一个 commit，数据与代码不会各推一次中间态。
 *
 * 强烈建议用 --manifest：git status 路线有两个已知坑 ——
 *   · porcelain 默认折叠未跟踪目录（tools/.examples-cache/ 会显示成 `?? dir/`），
 *     与完整文件路径匹配不上，文件被静默跳过；需要临时
 *     `git config status.showUntrackedFiles all` 才能推上去。
 *   · 本地索引落后时，porcelain 会混进上百条「工作区已删除」的旧图片条目，
 *     全量推会把远端还在用的图删掉。
 * manifest 路线由 publish.mjs 与批次快照对比得出，包含 ingest 新增的配图与
 * 归档删除的孤儿图，既不漏也不误删。
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execSync } from "node:child_process";
import { updatePublished } from "./lib-release.mjs";
import { fetchBlob } from "./lib-tree.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const REPO = "SHJDD134/ciyue";
const API = `https://api.github.com/repos/${REPO}`;
const MSG = process.argv[2] || "update";
/* 绝不允许进远端的文件。**这是硬拦截，不是「存在性豁免」** ——
 * 2026-09-17 修正：原实现只在「清单点名的文件本地不存在」时把它排除在外，
 * 也就是说如果谁用 --files 手滑点名了 tools/.deepl-key（本地确实存在），它照样会被传上远端。
 * 现在改成两件事都做：① 缺失时不报错 ② 出现在推送/删除清单里就直接中止。
 * 仓库是 public（实测 private:false），Pages 还直接以 200 提供整个仓库根目录 ——
 * 在这里漏一个文件，等于把它贴在公网上。 */
const NEVER_PUSH = new Set(["tools/.ecdict-blob.json", "tools/.deepl-key", "tools/.dashscope-key", "tools/_aesop-raw.html"]);

const argOf = name => {
  const i = process.argv.indexOf("--" + name);
  return i > 0 && process.argv[i + 1] ? process.argv[i + 1] : null;
};
const normalize = s => s.replace(/\\/g, "/").replace(/^\.\//, "");

/* 路径模式兜底 —— 有些东西不适合写死成具体文件名（会不断新增），但性质上永不许外传：
 *   · *.local.*          本地专用产物（个人偏好、私人清单），约定俗成的后缀
 *   · people-preferences* / people-icons-change-plan-*.md
 *                        含「核心参考 + 明确喜欢 + 次级候选 + 排除名单」这类个人偏好的文档。
 *                        2026-09-17 事故：这份计划稿经 --files 推上 public 仓库，
 *                        Pages 立刻以 200 提供、正文含 30 人偏好清单，任何人都能读。
 *                        这类文件的正确形态是改名为 *.local.md 留在本地（见 .gitignore）。 */
const NEVER_PUSH_PATTERNS = [
  /\.local\.[a-z0-9]+$/i,
  /^people-icons-change-plan-.*\.md$/i,
  /^people-preferences/i,
  /* Android 壳的构建产物（2026-09-22）—— 与 .gitignore 同两条，这里硬拦。
     gitignore 拦不住 `--files` 显式点名，而这两个目录恰恰是「一整包第三方正文」：
       mobile/www/       assets/ + 抓取数据拼出的第二份全文
       outputs/apk/      11MB 的 APK，正文与封面全在里面
     public 仓库 + Pages 以 200 提供整棵工作树 = 推上去就是一次重新分发。 */
  /^mobile\/www\//i,
  /^outputs\/apk\//i,
];
const isNeverPush = f => {
  const n = normalize(f).toLowerCase();
  return NEVER_PUSH.has(n) || NEVER_PUSH_PATTERNS.some(re => re.test(n));
};

/* ---------- 变更清单 ---------- */
let plan = null;            // { push:Set, delete:Set, source: string }
const manifestArg = argOf("manifest");
const filesArg = argOf("files") || argOf("only");

/* 先各自解析，再合并 —— 见头部注释：并用时 articles 必须走 manifest，
 * 否则发布基线里的「线上有哪些文章」会一直停在旧值，publish 误报 added/dropped。 */
let mfPlan = null;
if (manifestArg) {
  const p = manifestArg === "auto"
    ? path.join(ROOT, ".bak", "releases", "LATEST")
    : manifestArg;
  let file = p;
  if (manifestArg === "auto") {
    if (!fs.existsSync(p)) {
      throw new Error("找不到 .bak/releases/LATEST —— 先跑 node tools/publish.mjs 生成批次清单");
    }
    const id = fs.readFileSync(p, "utf8").trim();
    file = path.join(ROOT, ".bak", "releases", id, "manifest.json");
  }
  if (!fs.existsSync(file)) throw new Error(`找不到 manifest：${file}`);
  const mf = JSON.parse(fs.readFileSync(file, "utf8"));
  mfPlan = {
    push: (mf.push || []).map(normalize),
    delete: (mf.delete || []).map(normalize),
    articles: Array.isArray(mf.kept) ? mf.kept : null,
    source: `manifest 批次 ${mf.batch}（保留 ${mf.summary?.after ?? "?"} 篇 · 归档图 ${mf.coversArchived?.length ?? 0} 张）`,
  };
}
const extraFiles = filesArg ? filesArg.split(",").map(s => normalize(s.trim())).filter(Boolean) : null;

if (mfPlan && extraFiles) {
  plan = {
    push: new Set([...mfPlan.push, ...extraFiles]),
    delete: new Set(mfPlan.delete),
    articles: mfPlan.articles,
    source: `${mfPlan.source} + --files ${extraFiles.length} 个`,
  };
} else if (mfPlan) {
  plan = {
    push: new Set(mfPlan.push),
    delete: new Set(mfPlan.delete),
    articles: mfPlan.articles,
    source: mfPlan.source,
  };
} else if (extraFiles) {
  plan = {
    push: new Set(extraFiles),
    delete: new Set(),
    source: "--files 显式清单",
  };
}

/* ---------- 回落清单（无 plan 时）----------
 * 2026-09-23 修复：回落模式此前完全不走 NEVER_PUSH_PATTERNS —— 上面的硬拦截 ① 整个
 * 包在 if (plan) 里，而 addUpload/addDelete 只挡 NEVER_PUSH 精确名单不挡模式，
 * *.local.* / people-preferences* / mobile\/www\/ 这类文件经 git status 回落照样能
 * 传上 public 仓库（2026-09-17 泄漏事故的补丁只堵了清单模式）。
 * 现在把回落清单也提到取 token 之前解析，同样过硬拦截 —— 中止而非静默跳过，
 * 让用户改用 --files / --manifest 显式点名安全文件。 */
let fallbackStatus = null;
if (!plan) {
  const sh = c => { try { return execSync(c, { cwd: ROOT }).toString().trim(); } catch { return ""; } };
  if (["false", "no", "0"].includes(sh("git config --get status.showUntrackedFiles").toLowerCase())) {
    console.warn("⚠ 本地 .git/config 设了 status.showUntrackedFiles=false（git status 默认隐藏全部新文件）。" +
      "本次已用 -uall 覆盖；建议执行 git config --unset status.showUntrackedFiles 消除隐患。");
  }
  const raw = sh("git status --porcelain -uall");
  fallbackStatus = (raw ? raw.split("\n") : [])
    .map(l => { const f = l.replace(/^\s*[A-Z?!]{1,2}\s+/, "").trim(); return { x: l.trim().slice(0, 2), file: normalize(f) }; })
    .filter(e => e.file);
  const leakedFb = fallbackStatus.map(e => e.file).filter(isNeverPush);
  if (leakedFb.length) {
    console.error(`\n✗ git status 回落清单里 ${leakedFb.length} 个文件属于「绝不推送」，已拒绝：`);
    for (const f of leakedFb.slice(0, 20)) console.error("   · " + f);
    console.error("  回落模式不好挑文件 —— 请改用 --files / --manifest 显式点名安全文件。");
    console.error("  **远端分支未做任何改动，token 都还没取。**");
    process.exit(2);
  }
}

/* ---------- 清单自检（在任何网络调用之前） ----------
 * 清单点名、本地却没有的文件 → 直接中止。原先只打一句警告然后照常提交，
 * 会出现「正文传上去了、它引用的配图没传」却报发布成功 —— 线上 404。
 * 放在这里而不是上传循环里：省掉一半 blob 调用，也让「清单坏了」早暴露。 */
if (plan) {
  /* ① 硬拦截：NEVER_PUSH / NEVER_PUSH_PATTERNS 命中的路径不许出现在任何清单里。
   *    放在存在性检查之前 —— 这条优先级更高，且同样必须早于取 token。 */
  const leaked = [...plan.push].map(normalize).filter(isNeverPush);
  if (leaked.length) {
    console.error(`\n✗ 清单里 ${leaked.length} 个文件属于「绝不推送」，已拒绝：`);
    for (const f of leaked.slice(0, 20)) console.error("   · " + f);
    console.error("  这些东西的形态应该是 *.local.*（本地专用）或改走安全通道。");
    console.error("  **远端分支未做任何改动，token 都还没取。**");
    process.exit(2);
  }
  const absent = [...plan.push].map(normalize)
    .filter(f => !isNeverPush(f) && !fs.existsSync(path.join(ROOT, f)));
  if (absent.length) {
    console.error(`\n✗ 清单里 ${absent.length} 个文件本地不存在，拒绝推送：`);
    for (const f of absent.slice(0, 20)) console.error("   · " + f);
    if (absent.length > 20) console.error(`   … 另有 ${absent.length - 20} 个`);
    console.error("  清单是「上次成功发布」与当前状态的差异；文件不在，说明本地被删或被挪走了。");
    console.error("  补齐文件后重试，或重跑 node tools/publish.mjs 重新出清单。");
    console.error("  **远端分支未做任何改动，token 都还没取。**");
    process.exit(2);
  }
}

/* ---------- 凭据 ---------- */
function token() {
  /* ⚠️ 2026-09-11：git-credential-manager.exe 会在无桌面会话里挂死 —— 即便已设
   * GCM_INTERACTIVE=never / GIT_TERMINAL_PROMPT=0，实测 60s+ 无任何返回（判断是
   * 它想联网刷新 OAuth 或弹 GUI）。所以改为优先吃环境变量 GITHUB_TOKEN，
   * 原来的 git credential fill 降级为限时 15s 的兜底。
   * 取 token 的备用通道：tools/_cred-get.py（直接读 Windows 凭据库，不落盘不打印），
   *   用法 GITHUB_TOKEN=$(python tools/_cred-get.py git) node tools/_api-push.mjs ... */
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN.trim();
  const out = execSync("git credential fill", {
    input: "protocol=https\nhost=github.com\n\n",
    env: { ...process.env, GCM_INTERACTIVE: "never", GIT_TERMINAL_PROMPT: "0" },
    encoding: "utf8", timeout: 15000,
  });
  const m = out.match(/^password=(.*)$/m);
  if (!m) throw new Error("未取到 GitHub 凭据（可改用 GITHUB_TOKEN 环境变量或 tools/_cred-get.py）");
  return m[1].trim();
}
const T = token();
const H = { Authorization: `Bearer ${T}`, "Content-Type": "application/json" };
const j = (r, text) => { const d = JSON.parse(text || "{}"); if (!r.ok) throw new Error(`${r.status} ${JSON.stringify(d).slice(0, 500)}`); return d; };
const api = async (p, opts = {}) => { const r = await fetch(API + p, { ...opts, headers: H }); return j(r, await r.text()); };

/* 1. 基线 ref + 远端全树 */
const ref = await api("/git/ref/heads/main");
const baseSha = ref.object.sha;
const baseTree = (await api(`/git/commits/${baseSha}`)).tree.sha;
const remoteTree = await api(`/git/trees/${baseTree}?recursive=1`);
const remote = new Map(remoteTree.tree.filter(t => t.type === "blob").map(t => [t.path, t.sha]));
console.log(`基线 ${baseSha.slice(0, 7)} | 远端文件 ${remote.size} 个`);
console.log(`清单来源：${plan ? plan.source : "git status（回落模式）"}\n`);

/* 2. 组装上传/删除项 */
const blobSha = buf => crypto.createHash("sha1").update(`blob ${buf.length}\0`).update(buf).digest("hex");
const entries = [];
/* 清单点名、本地却不存在的文件。**必须中止**：原先只打警告然后照常提交，
 * 会出现「正文传上去了、它引用的配图没传」却报发布成功 —— 线上白屏级不一致。 */
const missing = [];

/* 删除前备份 —— 只备份「远端有、本地没有」的。
 * 这类文件删掉就只剩 git 历史可捞：批次的 before/ 里没有它们，rollback.mjs 还原不回来
 * （2026-09-15 清 40 张孤儿封面时实测确认）。本地还有副本的（本次发布归档掉的孤儿
 * 封面、本地已删过的旧文件）不备份 —— 重推一次就回来了。 */
const DEL_BACKUP_DIR = path.join(ROOT, ".bak", "deleted-" + new Date().toISOString().slice(0, 10));
const backedUp = [], backupFailed = [];
const addDelete = async f => {
  if (isNeverPush(f)) { console.warn("⊘ 跳过删除（绝不推送名单）:", f); return; }
  if (!remote.has(f)) return;
  const abs = path.join(ROOT, f);
  if (!fs.existsSync(abs)) {
    try {
      const buf = await fetchBlob(T, remote.get(f), { repo: REPO });
      const dest = path.join(DEL_BACKUP_DIR, f);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.writeFileSync(dest, buf);
      backedUp.push(f);
    } catch (e) {
      backupFailed.push(`${f}（${e.message}）`);
    }
  }
  entries.push({ path: f, mode: "100644", sha: null });
  console.log("删", f);
};
const addUpload = async f => {
  if (isNeverPush(f)) { console.warn("⊘ 跳过上传（绝不推送名单）:", f); return; }
  const abs = path.join(ROOT, f);
  if (!fs.existsSync(abs)) { missing.push(f); return; }
  const buf = fs.readFileSync(abs);
  const sha = blobSha(buf);
  if (remote.get(f) === sha) return;                       // 内容与远端一致，跳过
  const blob = await api("/git/blobs", { method: "POST", body: JSON.stringify({ content: buf.toString("base64"), encoding: "base64" }) });
  entries.push({ path: f, mode: "100644", type: "blob", sha: blob.sha });
  console.log(remote.has(f) ? "改" : "新", f, `(${(buf.length / 1024).toFixed(0)}KB)`);
};

if (plan) {
  for (const f of [...plan.delete].sort()) await addDelete(f);
  for (const f of [...plan.push].sort()) await addUpload(f);
} else {
  /* 回落：git status 路线（有前述两个坑，能用 manifest 就别用这条）。
   * 清单已在上面（取 token 之前）解析并过硬拦截，这里只消费。 */
  const folded = fallbackStatus.filter(e => e.file.endsWith("/"));
  if (folded.length) {
    console.warn(`⚠ git status 折叠了 ${folded.length} 个未跟踪目录（${folded.map(e => e.file).join(", ")}），` +
      `其中的文件不会上传；推这类文件请改用 --files 或 --manifest。`);
  }
  for (const e of fallbackStatus) {
    if (e.file.endsWith("/")) continue;
    if (e.x.includes("D")) { await addDelete(e.file); continue; }
    await addUpload(e.file);
  }
}

/* 备份失败一律中止。「备份不了就不删」是硬约束：这些文件远端有、本地没有，删掉就只能
 * 翻 git 历史 —— 少清几个残留，永远好过不可恢复地删掉线上文件。 */
if (backupFailed.length) {
  console.error(`\n✗ ${backupFailed.length} 个待删文件备份失败，拒绝推送：`);
  for (const x of backupFailed.slice(0, 10)) console.error("   · " + x);
  console.error("  这些文件远端有、本地没有，删掉只能靠 git 历史找回。");
  console.error("  **远端分支未做任何改动。**");
  process.exit(2);
}
if (backedUp.length) {
  console.log(`\n删除前已备份 ${backedUp.length} 个远端独有文件 → ${path.relative(ROOT, DEL_BACKUP_DIR).replace(/\\/g, "/")}/`);
}

/* 兜底：显式清单已在上面拦过，这里管的是 git-status 回落模式下的竞态（文件边读边被删）。
 * 少传一个被引用的配图 = 线上 404，宁可中止。 */
if (missing.length) {
  console.error(`\n✗ 有 ${missing.length} 个待上传文件在提交前消失，拒绝推送：${missing.slice(0, 10).join(", ")}`);
  console.error("  **远端分支未做任何改动。**");
  process.exit(2);
}
/* 终检（2026-09-23）：entries 组装完、提交前再扫一遍。前面的硬拦截管清单与回落
 * 的「解析态」，这里管「执行态」—— 任何一层将来被改坏，entries 里混进绝不推送
 * 的路径都在这里被挡下（是最后一道，也是唯一覆盖 entries 实际内容的一道）。 */
const leakedFinal = entries.filter(e => isNeverPush(e.path));
if (leakedFinal.length) {
  console.error(`\n✗ 终检发现 ${leakedFinal.length} 个「绝不推送」文件混进了上传/删除项，中止：`);
  for (const e of leakedFinal.slice(0, 20)) console.error("   · " + e.path);
  console.error("  **远端分支未做任何改动。**");
  process.exit(2);
}
console.log(`\n实际变更 ${entries.length} 项`);
if (!entries.length) { console.log("远端已是最新，无需提交"); process.exit(0); }

/* 3. tree → commit → 更新 ref */
const tree = await api("/git/trees", { method: "POST", body: JSON.stringify({ base_tree: baseTree, tree: entries }) });
const commit = await api("/git/commits", {
  method: "POST",
  body: JSON.stringify({
    message: MSG, tree: tree.sha, parents: [baseSha],
    committer: { name: "wordlens-bot", email: "wordlens-bot@users.noreply.github.com" },
  }),
});
await api("/git/refs/heads/main", { method: "PATCH", body: JSON.stringify({ sha: commit.sha, force: false }) });
console.log("已推送:", commit.sha.slice(0, 7), "-", MSG);

/* 4. 更新「上次成功发布」基线 —— publish.mjs 下次拿它算差异，决定远端还缺什么。
 * 只有真正推成功才写：中止 / 报错时保持原基线不动，这些文件会被下次清单继续列出。
 * 注意这里存的是**文件内容 sha1**，与 publish.mjs 的 sha1rel 同一口径（不是 git blob sha）。 */
const rawSha1 = buf => crypto.createHash("sha1").update(buf).digest("hex");
const set = {}, remove = [];
for (const e of entries) {
  if (e.sha === null) { remove.push(e.path); continue; }
  const abs = path.join(ROOT, e.path);
  if (fs.existsSync(abs)) set[e.path] = rawSha1(fs.readFileSync(abs));
}
updatePublished(ROOT, {
  set, remove,
  articles: plan && plan.articles ? plan.articles : null,
  commit: commit.sha,
});
console.log(`基线已更新：记入 ${Object.keys(set).length} 个文件` +
  `${remove.length ? ` · 移除 ${remove.length} 个已删文件` : ""} → .bak/published.json`);

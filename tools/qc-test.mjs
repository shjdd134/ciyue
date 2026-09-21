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

/* ---------- 4. 判据双向负向测试（隔离数据目录）----------
 * 「守卫会不会响」必须在**注入的坏样本**上验证，光看当前通过不算数。
 * 反过来也必须验证**修掉的假阳性不再响** —— 2026-09-18 修的 F1 / F4 两处正是假阳性。
 * 两边都测才叫双向：只测坏样本会漏掉「判据被放宽到不响」，只测好样本会漏掉「判据还在误伤」。
 *
 * 样本刻意复刻当时的真实形态（带正文的长文），而不是只给标题 ——
 * F1 那处假阳性只在「正文里 watch 与 live 隔了几百字符」时出现，只测标题的用例根本测不出来。
 * （recommend-test.mjs 里的真阳性用例恰好都是只给 title 的，所以这个洞一直没被发现。） */
console.log("\n== 4. 判据双向负向测试（隔离数据目录）==");
{
  const ISO = path.join(TMP, "qc-test-assets");
  fs.rmSync(ISO, { recursive: true, force: true });
  fs.mkdirSync(ISO, { recursive: true });
  /* data.js 照搬真实那份：它提供 CATEGORIES 与空的 ARTICLES（文章全部来自 extra），
   * 这样栏目表与真实完全一致。词库两个文件 qc 从不使用，写空壳即可。 */
  fs.copyFileSync(path.join(ROOT, "assets", "data.js"), path.join(ISO, "data.js"));
  for (const f of ["data-words-bulk-a.js", "data-words-full.js"]) {
    fs.writeFileSync(path.join(ISO, f), "/* 负向测试空壳：qc.mjs 不使用词库全局 */\n");
  }
  fs.writeFileSync(path.join(ISO, "data-articles-archive.js"), "const ARTICLES_ARCHIVE = [];\n");
  fs.writeFileSync(path.join(ISO, "data-covers.js"), "const COVER_MAP = {};\n");

  const COVER = "assets/covers/fb-cristiano-ronaldo-madrid-my-story.jpg";   // 74KB，过 F3 的 250KB 上限
  /* 配图排布样本用的四张**真实存在**的图。必须真实存在，理由见 SAMPLES 里那条注释。 */
  const IMG_A4 = "assets/covers/people-anne-hathaway-mother-mary-1.jpg";
  const IMG_B4 = "assets/covers/people-anne-hathaway-mother-mary-2.jpg";
  const IMG_C4 = "assets/covers/people-anne-hathaway-mother-mary-3.jpg";
  const IMG_D4 = "assets/covers/people-anne-hathaway-mother-mary-4.jpg";
  const TODAY = new Date().toISOString().slice(0, 10);
  const tail = [
    { sentences: [{ en: "They won the match at last.", cn: "他们终于赢了比赛。" }] },
    { sentences: [{ en: "The fans cheered loudly.", cn: "球迷大声欢呼。" }] },
  ];
  const LONGFORM_BODY = "If you watch television in Madrid, they'll tell you a very different story about me. "
    + "There are things going on in our lives that the public has no idea about, in the media world that we live in today.";
  const DEFAULT = {
    cat: "足球", title: "A Long Story", titleZh: "一个长故事", date: TODAY, coverImg: COVER,
    paras: [{ sentences: [{ en: "The team played well in the first half.", cn: "球队上半场踢得很好。" }] }, ...tail],
  };
  const SAMPLES = [
    { want: "F2", wantMsg: "文章偏旧", note: "无 pin 的旧文 —— 时效判据必须仍然会响",
      art: { id: "qc-t-nopin-old", date: "2019-04-15" } },
    { want: null, note: "带 pin 的旧文 —— 应豁免时效（对齐 publish.mjs:16 的 pin 语义）",
      art: { id: "qc-t-pin-old", date: "2019-04-15", pin: true } },
    { want: "F1", wantMsg: "内容不可读", note: "直播指南标题 —— 内容门禁必须仍然会响",
      art: { id: "qc-t-live-guide", title: "How to watch the match FREE: Live streams" } },
    { want: null, note: "自述长文正文含 watch…live —— 不得再被判成直播指南（本轮修掉的假阳性）",
      art: { id: "qc-t-longform-watch",
        paras: [{ sentences: [{ en: LONGFORM_BODY, cn: "如果你在马德里看电视，他们会跟你讲一个完全不同的关于我的故事。" }] }, ...tail] } },
    { want: "F4", wantMsg: "译文无中文", note: "译文照抄英文 —— 漏译判据必须仍然会响",
      art: { id: "qc-t-copy-en",
        paras: [{ sentences: [{ en: "The team played well in the first half.", cn: "The team played very well in the first half." }] }, ...tail] } },
    { want: null, note: "纯标点译文（原文也只有省略号）—— 不得再被判成漏译（本轮修掉的假阳性）",
      art: { id: "qc-t-punct-only",
        paras: [{ sentences: [{ en: "….", cn: "……" }] }, ...tail] } },
    /* 「译文无中文」这条判据 2026-09-21 起与 tools/text-scan.js 共用
     * tools/lib-translate-rules.cjs 的 isUntranslated()。下面三组是 guards-test.mjs F 节的
     * **镜像样本** —— 同一个函数必须被两套测试同时验证：只在一侧加 case 的话，另一侧
     * 一旦又长出本地副本（正是 BOOK_CITE 那次事故）就没人会发现。
     * 三组分别是：该放行的书单行、必须照报的句中书名号、该放行的说话人缩写碎片。 */
    { want: null, note: "书单行（cn = 《书名》+作者，无汉字）—— 官方译本刻意保留原书名，不得判漏译",
      art: { id: "qc-t-book-cite",
        paras: [{ sentences: [{ en: "Holacracy: The New Management System for a Rapidly Changing World , Brian J. Robertson.",
          cn: "《Holacracy: The New Management System for a Rapidly Changing World》Brian J. Robertson" }] }, ...tail] } },
    { want: "F4", wantMsg: "译文无中文", note: "句中夹一对《》的真漏译仍然报错（豁免没宽成「带书名号就放行」）",
      art: { id: "qc-t-cite-mid",
        paras: [{ sentences: [{ en: "That book was never translated properly.",
          cn: "That book was never《translated》properly." }] }, ...tail] } },
    { want: null, note: "说话人缩写 + 省略号碎片（cn = 「HM：……」）—— 保留英文缩写是对的，不得判漏译",
      art: { id: "qc-t-speaker",
        paras: [{ sentences: [{ en: "HM: ...", cn: "HM：……" }] }, ...tail] } },
    /* 配图排布（2026-09-20 新增的两条 F3）。样本故意用**真实存在的图片文件** ——
     * F3 自己那条「文件不存在」的判据会先把不存在的路径拦下来，用假路径的话
     * 「堆叠」与「封面重复」两条就永远测不到，测试会变成一个只看得到 F3 前缀的假绿。 */
    { want: "F3", wantMsg: "正文配图堆叠", note: "一连 4 张图中间没有文字 —— 堆图判据必须仍然会响",
      art: { id: "qc-t-fig-stack",
        paras: [{ img: IMG_A4 }, { img: IMG_B4 }, { img: IMG_C4 }, { img: IMG_D4 }, ...tail] } },
    { want: "F3", wantMsg: "与封面重复", note: "正文图与封面同一张 —— 封面重复判据必须仍然会响",
      art: { id: "qc-t-fig-coverdup",
        paras: [{ img: COVER }, ...tail] } },
    { want: null, note: "图与图之间隔 2 个文字段 —— 排布正常，不得被判成堆叠（本轮新增判据的假阳性防线）",
      art: { id: "qc-t-fig-ok",
        paras: [{ sentences: [{ en: "The team played well in the first half.", cn: "球队上半场踢得很好。" }] },
          { img: IMG_A4 },
          { sentences: [{ en: "The fans cheered loudly.", cn: "球迷大声欢呼。" }] },
          { sentences: [{ en: "They won the match at last.", cn: "他们终于赢了比赛。" }] },
          { img: IMG_B4 },
          { sentences: [{ en: "The manager praised them.", cn: "主教练表扬了他们。" }] },
          { sentences: [{ en: "The season is long.", cn: "赛季还很漫长。" }] },
          { img: IMG_C4 },
          { sentences: [{ en: "They rest before the next game.", cn: "他们在下一场之前休息。" }] }] } },
    /* 封面豁免（2026-09-20：AI 栏目接 Offbook 双语长文时加）。
     * 必须**成对**测：只测「AI 无封面不报」的话，把整条 F3 封面判据删掉也会全绿；
     * 只测「足球无封面必须报」的话，就测不出 AI 这一档到底有没有生效。 */
    { want: null, note: "AI 栏目无封面（Offbook 源站无位图，走渐变）—— 不得判 F3 无封面图",
      art: { id: "qc-t-aI-nocover", cat: "AI", coverImg: "" } },
    { want: "F3", wantMsg: "无封面图", note: "足球栏目无封面 —— 豁免名单外的栏目必须照样判红",
      art: { id: "qc-t-fb-nocover", cat: "足球", coverImg: "" } },
  ];
  const arts = SAMPLES.map(s => ({ ...DEFAULT, ...s.art, url: "https://example.com/" + s.art.id }));
  fs.writeFileSync(path.join(ISO, "data-articles-extra.js"),
    "/* 负向测试样本，勿入库 */\nconst ARTICLES_EXTRA = " + JSON.stringify(arts, null, 1) + ";\n"
    + "if (typeof ARTICLES !== \"undefined\" && typeof ARTICLES.push === \"function\") ARTICLES_EXTRA.forEach(a => ARTICLES.push(a));\n");

  const r = spawnSync(node, [path.join(ROOT, "tools", "qc.mjs"), "--all"],
    { encoding: "utf8", env: { ...process.env, WORDLENS_QC_ASSETS: ISO } });
  /* 拒收区逐条列出 id + 判据；合格者只进计数、不列 id。所以「期望合格」的样本靠「不在拒收列表里」判定。 */
  const failsOf = new Map();
  let cur = null;
  for (const line of (r.stdout || "").split("\n")) {
    const m = line.match(/^ {2}✗ (\S+)\s*$/);
    if (m) { cur = m[1]; failsOf.set(cur, []); continue; }
    if (line.startsWith("  ⚠ ")) { cur = null; continue; }
    if (cur && line.startsWith("      ")) failsOf.get(cur).push(line.trim());
  }
  /* 计数行同时验证两件事：隔离目录真的生效（data.js 里 ARTICLES 为空，只有 SAMPLES 这些样本），
   * 以及没有任何样本被静默跳过 —— 「一个都没进主循环」正是本文件开头那类失败路径。
   * 用 SAMPLES.length 而不是写死数字：写死时每加一个样本都要手改，忘改就会把
   * 「样本没进检查」报成通过（这里原本写死 6，2026-09-20 加三个配图样本时差点漏掉）。 */
  const cm = (r.stdout || "").match(/合格 (\d+) · 拒收 (\d+)/);
  check(`隔离目录生效且 ${SAMPLES.length} 篇样本全部进了检查（无真实文章混入、无静默跳过）`,
    Boolean(cm) && +cm[1] + +cm[2] === SAMPLES.length,
    cm ? `合格 ${cm[1]} + 拒收 ${cm[2]} = ${+cm[1] + +cm[2]}（应为 ${SAMPLES.length}）` : "没取到计数行");
  for (const s of SAMPLES) {
    const fails = failsOf.get(s.art.id);
    if (s.want) {
      /* `wantMsg` 不是锦上添花，是防假绿：只比对判据编号（"F3"）的话，
       * 「F3 正文图片文件不存在」这条本来就在的判据也会让新样本变绿 ——
       * 于是「堆叠判据」可能一次都没被真正触发，测试照样全绿。
       * 2026-09-20 加配图排布样本时正是靠这一条才发现必须收紧的。 */
      const hit = Boolean(fails && fails.some(f =>
        f.startsWith(s.want) && (!s.wantMsg || f.includes(s.wantMsg))));
      check(s.note, hit, fails ? `实际只报：${fails.join(" / ")}` : "该拒的没拒（未出现在拒收列表）");
    } else {
      check(s.note, fails === undefined, fails ? "被误判拒收：" + fails.join(" / ") : "");
    }
  }
  fs.rmSync(ISO, { recursive: true, force: true });
}

fs.rmSync(emptyFile, { force: true });
fs.rmSync(ghostFile, { force: true });

const passed = results.filter(r => r[1]).length;
console.log(`\n结果：${passed} 通过 / ${results.length - passed} 失败`);
if (passed !== results.length) process.exitCode = 1;

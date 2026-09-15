#!/usr/bin/env node
/* 词阅 WordLens —— 明星栏目「历史通道」候选发现器（阶段一）
 *
 * 这一步只做一件事：**把自动抓出来的候选列成表，给人过目**。
 * 不写 assets/、不动 data-*.js、不建发布批次、不发线上。确认货对了再接入 ingest.mjs。
 *
 * 为什么需要它：现有管线全部依赖 RSS，RSS 的时间窗最长 60 天，而「经典人物影像回顾」
 * 本质是长尾存量内容（九十年代旧照今天照样发）。Vogue 美版 /slideshow/ 与英版 /gallery/
 * 是专门的图集栏目，且 **sitemap 按月分片**，扫一遍即得全量 URL —— 不需要人工维护清单。
 *
 * 用法：
 *   node tools/fetch-classics.mjs                 扫近 8 个月，全量实测，出清单
 *   node tools/fetch-classics.mjs --months 14     扫更久（每片约 1 个月）
 *   node tools/fetch-classics.mjs --max 10        只实测前 10 条（调参时用，快）
 *   node tools/fetch-classics.mjs --site us       只扫美国版
 *   node tools/fetch-classics.mjs --refresh       忽略实测缓存，重抓页面
 *   node tools/fetch-classics.mjs --md STARS-CANDIDATES.md   过目表写到指定位置（默认 tools/_spot/）
 *
 * 产物：
 *   classics-candidates.json   机器可读完整结果（tools/_spot/，已 gitignore）
 *   classics-candidates.md     人工过目表（按「名单确认女性」优先排序）
 *   classics-measure.json      实测缓存（重跑省时间，--refresh 清）
 *
 * 两个反复踩过的坑，写在代码里防复发：
 *   ① **图数以正文容器内的 <figure> 为准，不能数 <img> 标签**。Vogue slideshow 页面
 *      <img> 只有 7 个而 <figure> 有 16 个（它用 <picture> + <source srcset>）。
 *      数 <img> 会低估一半以上。同理不能全文数——相关文章推荐位会混进来，
 *      实测出现「单篇 589 张图」的假值。
 *   ② **「早期影像」按张数算，不是按去重后的年份个数**。同一年的 10 张图是 10 张，
 *      按去重年份算会得到「1」，把产量低估一个数量级。
 */

import fs from "node:fs";
import path from "node:path";

/* 发现 / 提取 / 筛选的口径全部来自 lib-classics.mjs —— 与 `ingest.mjs --classics` 同一份实现。
   四个反复踩过的坑（数 <figure> 而非 <img>、老模板图 URL 无扩展名、不能只取第一个 srcset、
   跨站去重不能靠图注文本或图片 id）都写在那个文件的注释里，本脚本不再重复一遍。 */
import {
  EARLY_MAX, SOURCES, buildPool, scanClassics,
} from "./lib-classics.mjs";

/* ---------------- 参数与产物路径 ---------------- */

const ROOT = path.resolve(import.meta.dirname, "..");
const SPOT = path.join(import.meta.dirname, "_spot");
const CACHE_FILE = path.join(SPOT, "classics-measure.json");
const OUT_JSON = path.join(SPOT, "classics-candidates.json");

const argv = process.argv.slice(2);
const has = n => argv.includes(`--${n}`);
const val = (n, d) => {
  const i = argv.indexOf(`--${n}`);
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[i + 1] : d;
};

const MONTHS = Math.max(1, Number(val("months", 8)) || 8);
const MAX_PROBE = Number(val("max", 0)) || 0;
const SITE = String(val("site", "all")).toLowerCase();
const REFRESH = has("refresh");
/* 人工过目表默认落在 tools/_spot/（已 gitignore）。要交付时用 --md 指到仓库根目录。 */
const MD_OUT = path.resolve(ROOT, val("md", path.join("tools", "_spot", "classics-candidates.md")));
/* 入选池的「经典回顾」硬门槛：图注里带 ≤2005 年份的图至少这么多张。
   这条线是用户 2026-09-14 过目清单后定的。为什么不能用「图够多」当唯一判据：
   A 组后段 11 条（爱莉安娜 37 图 / 赞达亚 31 图 / 泰勒 26 图…）图都比前面多，
   但全是「历代妆容盘点」，图注年份集中在近几年 —— 早期影像 0—8 张，一条都不是旧照回顾。 */
const MIN_EARLY = Math.max(0, Number(val("min-early", 10)) || 0);
/* 文字门槛两条线（用户 2026-09-14 定）：正文 ≥80 词 且 正文+图注 ≥300 词。
   原来的单线「正文 ≥300 词」是照新闻文章标的，套到 Vogue 图集上只剩 3 条候选 ——
   图集正文中位数 185 词、图注中位数 362 词，图注才是主体文字。 */
const MIN_WORDS = Math.max(0, Number(val("min-words", 80)) || 0);
const MIN_READ = Math.max(0, Number(val("min-read", 300)) || 0);

/* ---------------- 主流程 ---------------- */

const fmt = n => String(n).padStart(3);

async function main() {
  fs.mkdirSync(SPOT, { recursive: true });

  /* 发现 → 筛选 → 实测 → 去重整条链在 lib-classics.mjs，与 ingest.mjs --classics 共用一份实现。
     把 cache 传进去，重跑时命中缓存省时间（--refresh 清空重抓）。 */
  const cache = REFRESH || !fs.existsSync(CACHE_FILE)
    ? {}
    : JSON.parse(fs.readFileSync(CACHE_FILE, "utf8"));

  console.log(`\n① 扫 sitemap → 筛选 → 实测（近 ${MONTHS} 个月）`);
  const { all, kept, probed, dupes, srcs, stats } = await scanClassics({
    months: MONTHS, site: SITE, cache, limit: MAX_PROBE,
    onSource: (s, n) => console.log(`   ${s.name.padEnd(14)} ${s.section.padEnd(12)} 全量 ${n} 条`),
    onProgress: (done, total) => { if (done % 10 === 0) console.log(`   实测 … ${done}/${total}`); },
  });
  const probeList = probed;
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 1));

  const byGroup = g => kept.filter(t => t.group === g);
  console.log(`\n② 关键词筛选：命中经典回顾型 ${kept.length} / ${all.length} 条`);
  console.log(`   ${"名单确认女性".padEnd(14)} ${byGroup("female").length} 条`);
  console.log(`   ${"待人工确认".padEnd(14)} ${byGroup("unverified").length} 条`);
  console.log(`   ${"已排除（男性）".padEnd(13)} ${byGroup("male").length} 条`);

  console.log(`\n③ 实测 ${probeList.length} 条（正文容器内 <figure>，非 <img> 标签）`
    + ` · 缓存命中 ${stats.cached} · 失败 ${stats.failed}`);

  /* 跨站去重在 lib 的 markDupes 里做完了（上面那次调用返回的 dupes）。 */
  if (dupes.length) {
    console.log(`\n③b 跨站去重：${dupes.length} 条与另一站的版本重复，已归并`);
    for (const d of dupes.slice(0, 8)) console.log(`   ${d.slug}  ←  ${d.dupeOf}`);
  }

  /* ---------------- 汇总 ---------------- */
  /* 排除三种「不能直接入库」的：请求失败、跨站重复、提取失败。
     提取失败的放在 ok 之外单独报——它的 figs 是假的，混进门槛统计会把结论带偏。 */
  const ok = probeList.filter(t => t.m && !t.m.error && !t.dupeOf && !t.m.extractFailed);
  const pass = ok.filter(t => t.m.figs >= 6);                    // 方案门槛：≥6 张有效图
  const rich = ok.filter(t => t.m.figs >= 8);                    // 理想区间 8—16 张
  const withEarly = ok.filter(t => t.m.early >= 6);              // 早期影像够多
  const thinText = ok.filter(t => t.m.words < MIN_WORDS);       // 正文太薄，点词查义没东西可查
  const thinRead = ok.filter(t => (t.m.readWords != null ? t.m.readWords : t.m.words) < MIN_READ);
  /* 图注里有女性名字、且男性占比低。要求 capFemaleFigs≥1，否则「无人名的街拍图集」
     （如 notting-hill-carnival-archive-pictures）也会被算成女性候选。 */
  const mshare = t => (t.m.capMaleFigs || 0) / Math.max(1, t.m.caps);
  const pureF = ok.filter(t => t.m.capFemaleFigs >= 1 && mshare(t) <= 0.2 && t.m.figs >= 6);
  const mixedF = ok.filter(t => t.m.capFemaleFigs >= 1 && mshare(t) > 0.2);
  const pureKnown = pureF.filter(t => t.group === "female");

  const { pool, loseSame, nearMiss } = poolOf(ok);

  console.log(`\n④ 结果（已排除重复与提取失败）`);
  console.log(`   有效 ${ok.length} 条 · ≥6 图 ${pass.length} 条 · ≥8 图 ${rich.length} 条 · ≥6 张早期影像 ${withEarly.length} 条`);
  if (ok.length) {
    const med = a => a.slice().sort((x, y) => x - y)[Math.floor(a.length / 2)];
    console.log(`   中位数：图 ${med(ok.map(t => t.m.figs))} 张 · 图注 ${med(ok.map(t => t.m.caps))} 条`
      + ` · 正文 ${med(ok.map(t => t.m.words))} 词 · 图注文字 ${med(ok.map(t => t.m.capWords || 0))} 词`);
  }
  if (thinText.length) {
    console.log(`   ⚠ 正文 <${MIN_WORDS} 词 ${thinText.length} 条（中文导语太短）`
      + `：${thinText.map(t => t.slug).slice(0, 5).join(" · ")}`);
  }
  if (thinRead.length) {
    console.log(`   ⚠ 正文+图注 <${MIN_READ} 词 ${thinRead.length} 条（整篇没什么可读文本）`);
  }
  console.log(`\n   ── 入选池（名单确认女性 + 早期影像 ≥${MIN_EARLY} 张 + 每人一篇`
    + ` + ≥6 图 + 正文 ≥${MIN_WORDS} 词 + 正文+图注 ≥${MIN_READ} 词） ──`);
  console.log(`   入池 ${pool.length} 条 · 同人物重复去重 ${loseSame.length} 条 · 文字太薄 ${nearMiss.length} 条`);
  console.log(`   被早期影像门槛挡下（女性名单、≥6 图、但 <${MIN_EARLY} 张早期）`
    + ` ${ok.filter(t => t.group === "female" && t.m.figs >= 6 && t.m.early < MIN_EARLY).length} 条`);
  console.log(`   主题型群像（不属「按人物精选」，用户已排除）${ok.filter(t => t.group === "unverified").length} 条`);
  if (pool.length) {
    console.log(`\n   入选池清单：`);
    for (const t of pool) {
      console.log(`     ${String(t.m.early).padStart(3)} 张早期 · ${String(t.m.figs).padStart(3)} 图`
        + ` · 正文 ${String(t.m.words).padStart(4)} 词 + 图注 ${String(t.m.capWords || 0).padStart(4)} 词`
        + `  ${t.person.padEnd(22)} ${t.slug}`);
    }
  }
  if (loseSame.length) {
    console.log(`\n   同人物去重（保留早期影像更多的那篇）：`);
    for (const t of loseSame) console.log(`     ${t.slug}  ←  ${t.person} 已有入池篇`);
  }
  if (nearMiss.length) {
    console.log(`\n   ⚠ 文字太薄，先不入池（正文 <${MIN_WORDS} 词 或 正文+图注 <${MIN_READ} 词）：`);
    for (const t of nearMiss) console.log(`     正文 ${t.m.words} 词 + 图注 ${t.m.capWords || 0} 词`
      + ` · ${t.m.figs} 图 · ${t.m.early} 张早期  ${t.slug}`);
  }

  fs.writeFileSync(OUT_JSON, JSON.stringify({
    scannedAt: new Date().toISOString(),
    months: MONTHS,
    earlyMax: EARLY_MAX,
    minEarly: MIN_EARLY,
    sources: srcs.map(s => ({ key: s.key, name: s.name, section: s.section })),
    totals: { discovered: all.length, classic: kept.length, probed: ok.length },
    counts: {
      female: byGroup("female").length,
      unverified: byGroup("unverified").length,
      maleExcluded: byGroup("male").length,
      figs6: pass.length, figs8: rich.length, early6: withEarly.length,
      pureFemale: pureF.length, mixed: mixedF.length,
      pool: pool.length, loseSame: loseSame.length, nearMiss: nearMiss.length,
    },
    /* 入选池 = 定稿名单，接管线时按这个数组走。cap = 实际入库的图片张数 */
    pool: pool.map(t => ({
      slug: t.slug, url: t.url, person: t.person,
      imgs: t.m.figs, caps: t.m.caps, early: t.m.early, words: t.m.words,
      years: t.m.years, published: t.m.published, title: t.m.title,
    })),
    candidates: kept,
  }, null, 1));

  fs.mkdirSync(path.dirname(MD_OUT), { recursive: true });
  fs.writeFileSync(MD_OUT, renderMd({ all, kept, probeList, ok, byGroup, months: MONTHS, srcs }));
  console.log(`\n清单 → ${path.relative(ROOT, MD_OUT)}`);
  console.log(`明细 → ${path.relative(ROOT, OUT_JSON)}\n`);
}

/* 入选池规则（硬门槛）在 lib-classics.mjs 的 buildPool 里 —— 与 ingest.mjs --classics
   共用一份，否则「清单里是 25 条、入库却变成别的」这种漂移没法察觉。
   这里只包一层，把命令行开关传进去。 */
const poolOf = ok => buildPool(ok, { minEarly: MIN_EARLY, minWords: MIN_WORDS, minRead: MIN_READ });

/* slug 主角 → 图注实况。光看 slug 会把「男女同框的影展回顾」当成女性图集。
   按**张数**算：53 张图里若干张提到查尔斯王子，不该把整篇戴安娜专题判成「混合」。
   注意 `capFemale`（名字个数）与 `capFemaleFigs`（张数）不是一回事，
   显示用张数——45 张图里 1 张提到男性，那不是「混合」，是女性专题里带了张合影。 */
function capKind(t) {
  const m = t.m;
  if (!m || m.error) return "—";
  const f = m.capFemaleFigs || 0, k = m.capMaleFigs || 0;
  if (!f && !k) return "未识别";
  if (!f) return `仅男 ${k}`;
  if (!k) return `女 ${f}`;
  /* 阈值与 A 组分组判据（男性图注 / 总图注 ≤ 0.2）保持一致，
     否则会出现「显示混合、却归在主力组」这种自相矛盾的行 */
  return (k / Math.max(1, m.caps) <= 0.2) ? `女 ${f}（+${k}男）` : `混合 ${f}女/${k}男`;
}

function row(t) {
  const m = t.m || {};
  const slug = `[\`${t.slug}\`](${t.url})`;
  if (m.error) return `| ${slug} | — | — | — | — | — | — | ⚠ ${m.error} |`;
  return `| ${slug} | **${m.figs}** | ${m.caps} | ${m.capped} | **${m.early}** | ${m.words} | ${m.capWords || 0} | ${capKind(t)} |`;
}

const HEAD = "| slug | 图 | 图注 | 带年代 | ≤2005 | 正文词 | 图注词 | 图注人物 |\n|---|---|---|---|---|---|---|---|";

/* 图注样本 —— 判断内容质量最直接的东西：年代、出处、场合齐不齐。
   放在入选池后面，是让人一眼确认「抓回来的图注长这样」。 */
function capSamples(list) {
  const lines = ["<details><summary>图注样本（判断内容质量用）</summary>", ""];
  const pick = list.filter(t => t.m && t.m.capSample && t.m.capSample.length).slice(0, 6);
  for (const t of pick) {
    lines.push(`**\`${t.slug}\`**`);
    for (const c of t.m.capSample.slice(0, 3)) lines.push(`- ${c.slice(0, 190)}`);
    lines.push("");
  }
  lines.push("</details>", "");
  return lines.join("\n");
}

function renderMd({ all, kept, probeList, ok, byGroup, months, srcs }) {
  const L = [];
  L.push("# 明星栏目 · 历史通道候选清单（2026-09-14 定稿）", "");
  L.push(`> 由 \`node tools/fetch-classics.mjs --months ${months}\` 生成于 ${new Date().toLocaleString("zh-CN")}。`);
  L.push("> **这一步不写库、不发线上**——先看货对不对，再决定是否接入管线。", "");
  L.push("## 0. 本次扫描", "");
  L.push(`- 货源：${srcs.map(s => `${s.name} \`${s.section}\``).join(" · ")}，sitemap 按最近 **${months}** 个月分片`);
  L.push(`- 全量 URL **${all.length}** 条 → 命中经典回顾型 **${kept.length}** 条`
    + `（slug 命中女性名单 **${byGroup("female").length}** · 待人工确认 **${byGroup("unverified").length}**`
    + ` · 已排除男性 **${byGroup("male").length}**）`);
  L.push(`- 实测 **${probeList.length}** 条：跨站重复归并 **${probeList.filter(t => t.dupeOf).length}** 条 · `
    + `提取失败 **${probeList.filter(t => t.m && t.m.extractFailed).length}** 条 · `
    + `请求失败 **${probeList.filter(t => !t.m || t.m.error).length}** 条`, "");
  L.push("**口径**（两个坑写在这里防复发）：", "");
  L.push("- 图数 = 正文容器内 `<figure>` 的个数，**不是 `<img>` 标签数**。"
    + "Vogue slideshow 的 `<img>` 只有 7 个而 `<figure>` 有 16 个（用 `<picture>` + `<source srcset>`），数 `<img>` 会低估一半；"
    + "也不能全文数——相关文章推荐位会混进来，实测出现过「单篇 589 张图」的假值。");
  L.push("- 「≤2005」= 图注含 2005 年及以前的**张数**，不是去重后的年份个数。"
    + "按年份数算会把产量低估一个数量级。");
  L.push("", `**入选门槛**（全过，见第 1 节）：名单确认女性 · 图注带 ≤${EARLY_MAX} 年份的图 ≥${MIN_EARLY} 张 · `
    + `同一人物只留一篇 · 图 ≥6 张 · 正文 ≥${MIN_WORDS} 词 且 正文+图注 ≥${MIN_READ} 词`, "");
  L.push("**「图注人物」列**：从图注里实际识别到的人物性别分布。"
    + "slug 命中女性名单 **不等于**这一篇里只有女性——影展回顾那类常常男女同框。", "");
  L.push("---", "");

  const allM = probeList.filter(t => t.m && !t.m.error);
  const measured = g => allM.filter(t => t.group === g && !t.dupeOf && !t.m.extractFailed);
  const dupeList = allM.filter(t => t.dupeOf);
  const failList = allM.filter(t => t.m.extractFailed && !t.dupeOf);
  const unmeasured = g => byGroup(g).filter(t => !probeList.includes(t));
  const byEarly = (a, b) => (b.m.early - a.m.early) || (b.m.figs - a.m.figs);

  const { pool, loseSame, nearMiss } = poolOf(ok);

  /* 入选池放最前面——这是定稿结论，后面各节都是「为什么别的没进来」。 */
  L.push(`## 1. 入选池 · ${pool.length} 条（2026-09-14 定稿）`, "");
  L.push("**这就是要接进明星栏目的名单。** 四条硬规则：", "");
  L.push("1. **名单确认女性** —— 主题型群像不收。栏目定位是「按人物精选」，"
    + "威尼斯影展／Met Gala／模特封面那类不属于，用户已明确排除。");
  L.push(`2. **图注带 ≤${EARLY_MAX} 年份的图 ≥${MIN_EARLY} 张** —— 这才是「旧照回顾」。`
    + "判断的是照片拍摄年代，不是文章发布日期：今天发的九十年代影像照样入选。");
  L.push("3. **同一人物只留一篇**（取早期影像多的那版）—— 同栏目连出同一人两篇会掉体验。");
  L.push("4. **文字够读**：图 ≥6 张 + **正文 ≥80 词 且 正文+图注 ≥300 词**。", "");
  L.push("> 第 4 条 2026-09-14 从「正文 ≥300 词」改过来。原因是**门槛标错了对象**："
    + "旧线是照新闻文章定的，而 Vogue 经典回顾的本体是图集——正文中位数只有 185 词，"
    + "图注中位数 362 词，把「这张旧照是谁、哪年、穿的什么」讲清楚的正是图注。"
    + "只按正文卡，29 条满足全部内容规则的候选里只剩 3 条（碧昂丝 45 图 / 41 张早期影像，"
    + "正文 178 词 + 图注 641 词，被判「文字太薄」）。改后 24 人 / 26 条。", "");
  L.push("> ⚠️ 但要知道代价：**图注在阅读页渲染成 `<figcaption>`，不进句子流 —— 不可点读、没有中文译文**。"
    + "所以一篇的「中英对照」只有那 80—250 词的导语，其余是英文图注。"
    + "要让图注也变成可点读的正文字，属展示层改造（第三阶段），已记录待办。", "");
  L.push(HEAD);
  for (const t of pool) L.push(row(t));
  L.push("");
  L.push(capSamples(pool));

  if (loseSame.length) {
    L.push(`### 1a. 同人物去重合并（${loseSame.length} 条）`, "");
    L.push("同一个人各发了两篇（复古照一篇 + 近期妆容盘点一篇），只留早期影像多的：", "");
    L.push("| 被合并 | 人物 | 保留 |", "|---|---|---|");
    for (const t of loseSame) {
      const win = pool.find(p => p.person === t.person);
      L.push(`| \`${t.slug}\` | ${t.person || "—"} | \`${win ? win.slug : "—"}\` |`);
    }
    L.push("");
  }

  L.push(`### 1b. 文字太薄，先不入池（${nearMiss.length} 条）`, "");
  if (nearMiss.length) {
    L.push(`图和早期影像都达标，但正文 <${MIN_WORDS} 词或正文+图注 <${MIN_READ} 词。`
      + "**这是英语学习站的实际约束** —— 文字太少，点词查义、逐句对照都没多少可查的：", "");
    L.push(HEAD);
    for (const t of nearMiss) L.push(row(t));
  } else L.push("无。");
  L.push("");

  const blocked = measured("female").filter(t => t.m.figs >= 6 && t.m.early < MIN_EARLY).sort(byEarly);
  L.push(`### 1c. 被早期影像门槛挡下（${blocked.length} 条，已确认删除）`, "");
  L.push(`图反而更多（22—37 张），但图注带 ≤${EARLY_MAX} 年份的图 <${MIN_EARLY} 张。`
    + "**按拍摄年代判断它们不是旧照回顾** —— 是「历代妆容／造型盘点」，年份集中在近几年。"
    + "这正是「不能按图片数量入选」的证据：图数最多的几条恰恰不是想要的。", "");
  if (blocked.length) { L.push(HEAD); for (const t of blocked) L.push(row(t)); L.push(""); }

  const weak = measured("female").filter(t => t.m.figs < 6).sort(byEarly);
  L.push(`### 1d. 图不足 6 张（${weak.length} 条）`, "");
  if (weak.length) { L.push(HEAD); for (const t of weak) L.push(row(t)); L.push(""); }
  else L.push("无。", "");

  const uv = measured("unverified").sort(byEarly);
  L.push(`### 1e. 主题型群像（${uv.length} 条，已排除）`, "");
  L.push("slug 里没有具体人物，是群像／活动／时装类回顾。"
    + "**若这组里出现具体人物名，说明 `FEMALE` 名单漏了人 —— 补进名单即可自动归位。**", "");
  if (uv.length) { L.push(HEAD); for (const t of uv) L.push(row(t)); L.push(""); }

  const skipA = unmeasured("female").length, skipB = unmeasured("unverified").length;
  if (skipA || skipB) {
    L.push(`> 注：另有 ${skipA + skipB} 条因 \`--max\` 限制未实测（女性 ${skipA} · 待确认 ${skipB}）。`, "");
  }

  L.push(`### 1f. ⚠ 提取失败（${failList.length} 条）`, "");
  L.push("**不是这些专题图少，是解析没吃下它们的页面模板**（老版 Vogue 的图 URL 不带扩展名，"
    + "被白名单滤成 0 张 —— `25-vintage-photos-of-jackie-kennedy…` 就这么当过「0 张图」）。"
    + "已修；若再次出现，说明又出了新模板。", "");
  if (failList.length) { L.push(HEAD); for (const t of failList) L.push(row(t)); L.push(""); }
  else L.push("无。", "");

  if (dupeList.length) {
    L.push(`### 1g. 跨站重复，已归并（${dupeList.length} 条）`, "");
    L.push("同一条内容在美版与英版各发一次。**两个「看起来该管用」的指纹都实测失效**："
      + "图注文本两站各写各的、图片 id 交集为 0（各传一份副本）。"
      + "只能用「同一人物 + 图数接近 + 年代集合重合」判，保留更全的那版。"
      + "入库时**必须去重**，否则栏目里会出现两篇一样的。", "");
    L.push("| 重复条目 | 归并到 |", "|---|---|");
    for (const d of dupeList) L.push(`| \`${d.slug}\` | \`${d.dupeOf}\` |`);
    L.push("");
  }

  L.push("---", "");
  L.push("## 2. 关键词层已排除（不进检测）", "");
  const males = byGroup("male");
  if (males.length) {
    L.push(`- **男性人物 ${males.length} 条**：${males.map(t => t.slug).slice(0, 12).join(" · ")}${males.length > 12 ? " …" : ""}`);
  }
  L.push("- **商业活动／生活方式**：关键词排除（party / opening / launch / dinner / collection / runway / shopping…）。"
    + "实测这类占 Vogue slideshow 的 **54%** —— 不主动排除的话，抓回来的大半是品牌派对与开业酒会。");
  L.push("- **近期红毯／周更栏目**：`of-the-week`、`best-dressed`、以及 slug 里带近三年年份的。"
    + "实测 `all-the-best-looks-from-the-2026-venice-film-festival` 有 100 张图但 0 张早期影像 —— 是今年红毯，不是回顾。", "");
  L.push("## 3. 下一步", "");
  L.push("名单已定稿。接下来接入已上线的采集与发布管线：");
  L.push("1. `tools/ingest.mjs` —— 历史通道源（sitemap）+ `cap` 进库 + 明星图上限 4→16 + ≥6 张有效图门槛。");
  L.push("2. `tools/recommend.mjs` —— 图片从软加分改成硬门槛。");
  L.push("3. `tools/publish.mjs` —— 经典专题长期保留（`pin` 或把「明星」加进常青栏目）。", "");
  return L.join("\n");
}

main().catch(e => { console.error("\n失败：" + e.message); process.exit(1); });

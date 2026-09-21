/* 词阅 WordLens —— Offbook Press 双语长文接入
 *
 * 源站：https://offbook.press/essays/<slug>/ —— 作者 Dawei Geng，每期一篇长文，
 * **官网自带官方中英双语**（`<div class="prose i18n-zh">` + `i18n-en`，段落级一一对应）。
 * 所以这条通道**不翻译**，只抽取 —— 与 RSS / people 两条通道（英文原文 + 机翻）本质不同。
 *
 * 粒度：**整期一篇** —— 5 期 → 5 篇（官网 ISSUE 06 尚未发英译，故不入库）。
 *   2026-09-21 由「按 h2 大章拆篇」改回来。当初拆篇的理由是「整篇 8k—18k 词 / 60—100 分钟，
 *   而阅读页没有目录功能」；用户看过分篇版之后要求**回到源站原文单位 —— 不切割、就按原文**。
 *   代价：一篇 270—490 段 / estMinutes 40—70。文章 id 由 `ob-<slug>-c<NN>` 变成 `ob-<slug>`，
 *     所以 AI 栏目的本地阅读进度与打卡（按 id + 句锚点索引）会失效 —— 已与用户确认接受。
 *   收益不只是「少切几刀」：**节标题回到正文**。分篇时 h2 标题被拿去当文章标题，h3 标题则
 *     直接消失（on-cognitive-decoupling 丢 22 个 / mirage-of-form 丢 47 个），而守恒闸看不见 ——
 *     它的源基准只取 `section.blocks`，标题在 `section.head` 里。整期模式把 level ≥ 2 的标题
 *     作为段落插回正文，源基准同步计入，等式两侧依旧逐字符相等。
 *
 * 出口与 people.mjs 完全一致：readDecl → 过滤旧条目 → writeDecl → 就地把「共 N 篇」改掉。
 * **不自己拼文件头**，避免出现第二个写盘路径。
 *
 * 用法：
 *   node tools/offbook.mjs --plan            只勘察：整期清单 + 守恒校验（默认）
 *   node tools/offbook.mjs --apply           写入 assets/data-articles-extra.js
 *   node tools/offbook.mjs --fetch           先重新抓取（.tmp/offbook/<slug>.html）
 *   node tools/offbook.mjs --section=<slug>  只处理某一期（排错用）
 *
 * ★ 守恒是硬闸：任何一篇的 zh / en 字符数与源站对不上就拒绝写盘。
 *   「对齐」是可以讨论的（合并 / 就近挂靠都能看见），「丢字」没有讨论余地。
 */

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { parseEssay, splitSentencesLossless, splitChineseUnits, squash, toBlocks, toSections, trimTail } from "./lib-offbook.mjs";
import { readDecl, writeDecl } from "./lib-text.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const CACHE = path.join(ROOT, ".tmp", "offbook");
const FILE = path.join(ROOT, "assets", "data-articles-extra.js");

/* 顺序 = 期号。ISSUE 06 的英文块在官网上是空的（`<div class="prose i18n-en">  </div>`，
 * 2026-09-20 实测），只收 01—05；官网补发英译后把 06 加回这里重跑即可。
 *
 * ★ `grad` 只是**兜底**色：正常情况渐变取自源站那本立体书的 `data-cover-front/spine/back`
 *   （见 lib-offbook.mjs 的 palette）。下面这几个手挑色是第一版的产物，现在只有官方
 *   哪天不写配色属性时才会用到 —— 别再把它们当作用户看到的颜色。
 *
 * ★ `cover` = `assets/covers/` 下的**实图**（2026-09-21 由 sekiro 提供的 5 张主题插画）。
 *   有实图时它压过渐变（app.js `coverOf` 的口径：coverImg → COVER_MAP → 渐变）。
 *   图必须真实存在 —— 缺图直接 fatal，**不让渐变悄悄顶上**：那种「页面还有封面、只是
 *   换了个样子」的失败没有任何报警，等发现时已经上线了。 */
const ESSAYS = [
  { issue: 1, slug: "on-cognitive-decoupling", cover: "ob-on-cognitive-decoupling.jpg", grad: "linear-gradient(135deg,#d8e8dc 0%,#1e2a1e 100%)" },
  { issue: 2, slug: "rebuilding-learning", cover: "ob-rebuilding-learning.jpg", grad: "linear-gradient(135deg,#dce6f0 0%,#243447 100%)" },
  { issue: 3, slug: "breakdown-of-firms", cover: "ob-breakdown-of-firms.jpg", grad: "linear-gradient(135deg,#efe2d4 0%,#4a3527 100%)" },
  { issue: 4, slug: "mirage-of-form", cover: "ob-mirage-of-form.jpg", grad: "linear-gradient(135deg,#e6e2f2 0%,#372f4e 100%)" },
  { issue: 5, slug: "teaching-and-training-disqualified", cover: "ob-teaching-and-training-disqualified.jpg", grad: "linear-gradient(135deg,#f0e6dc 0%,#523a2c 100%)" },
  { issue: 6, slug: "the-future-of-collaboration", grad: "linear-gradient(135deg,#dbe9ea 0%,#1f3b3d 100%)" },
];
const AUTHOR = "Dawei Geng";
const AUTHOR_ZH = "耿大伟";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

const arg = k => { const a = process.argv.find(x => x.startsWith(`--${k}=`)); return a ? a.split("=").slice(1).join("=") : ""; };
const has = k => process.argv.includes(`--${k}`);

/* back matter：不当作「一篇文章」入库的章。
 * ★ 只排除**文献表**，不排除附录（附录·入门书单是真中英对照内容，实测有中文导读，值得读）。
 *   实测 5 篇各有一章「引用与出处」：正文是拉丁引文 + 裸 URL（`Foucault, Michel. "Qu'est-ce
 *   qu'un auteur?"` / `simple-bench.com`），中文侧同样只有拉丁字，读完学不到英语。
 *   性质与 RSS 通道过滤「广告/导航块」相同 —— 是**编辑取舍**，不是正文丢失；
 *   所以排除量必须进守恒等式（srcZ = 入库 zh + 排除 zh），并在报告里逐章列出来。 */
const SKIP_HEAD = /^(引用与出处|参考文献|References|Sources)\s*$/;

/* ---------------- 抓取（缺缓存时 / --fetch） ---------------- */
function fetchEssay(slug) {
  const url = `https://offbook.press/essays/${slug}/`;
  fs.mkdirSync(CACHE, { recursive: true });
  const r = spawnSync("curl", ["-s", "-L", "--max-time", "60", "-A", UA,
    "-H", "Accept-Language: en-US,en;q=0.9", "-o", path.join(CACHE, `${slug}.html`), url]);
  if (r.status !== 0) throw new Error(`curl 失败（exit ${r.status}）`);
}
function loadHtml(slug) {
  const f = path.join(CACHE, `${slug}.html`);
  if (has("fetch") || !fs.existsSync(f) || fs.statSync(f).size < 20000) fetchEssay(slug);
  return fs.readFileSync(f, "utf8");
}

/* ---------------- 粒度：整期一篇 ---------------- */

/* 2026-09-21 之前这里有一个 `chaptersOf()`（h2 开新章、h3 归入当前章）。整期一篇之后不再需要：
 * `doc.sections` 原样就是这一期的全部内容，标题与正文都在手里。
 * 但它的注释里有一条与粒度无关、仍然要记住的性质（下面循环依赖它）：
 *   **`toSections` 是「每遇到一个标题就开一节」，不是「按 h2 分块」** —— 一个 h2 下的内容会
 *   分散在「h2 那一节」+ 后面若干 h3 节里。分篇时代忘收「h2 那一节」导致每章开头整段消失
 *   （a01 丢 84/265 块，zh 24525→18290），不报错、不空段，只有守恒闸看得见。 */

/* ---------------- 块 → app 段落 ---------------- */

/** 有没有汉字（不含中日韩标点）。用来验「切出来的每份中文都还是中文」。 */
const hasHan = s => /[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/.test(String(s || ""));

/**
 * 一个源块 → app 段落。
 * 源块给的是**段落级**对齐（官方译文没有句级），所以句级对照能不能做，判据只有一条：
 * **英文切出的句数 == 中文自己切出的句数**。相等就按中文的 。！？… 一一对上；
 * 不等就整段退化成一句 `{en, cn}`。中文短到切不动时同样退化，**绝不产出空译文**（qc 按漏译判红）。
 *
 * ★ 三种「不切」的情况：
 *   ① **合并组不切**（`b.mergedZ || b.mergedE`）。合并组的意思是「官方两种语言的排版不一样，
 *      块数本来就不等」——此时**句级对应根本不存在**。
 *      实测 a05 第五章那句并列清单：中文一块 `A. 能给出可被反驳的初步判断 B. 能从被反驳中修正模型 …`，
 *      英文拆成 9 块，硬切产出 `E.` / `能` / `把学` / `习接` / `回真` / `实任务` 这种**逐字碎片**。
 *   ② 某一份**一个汉字都没有**（但整段中文有汉字）。最典型的是
 *      `公元 1913 年，密歇根州，Highland Park。` 对 `Highland Park, Michigan. 1913.` ——
 *      中英**语序相反**，切出来那份只剩 `Highland Park。`，qc F4 直接判「译文无中文，疑似漏译」。
 *      这不是漏译，是「这段没法句级对齐」——退成段落级。
 *   ③ **两侧句数不等不切**（下面单列）。
 *
 * ★ ③ 是 2026-09-21 全量审校（43 篇 / 4,297 句）之后重写的，它同时取代了 ① 的占比切分：
 *   旧实现「按英文各句长度占比切中文、切点吸附最近的标点（逗号顿号也算）」，于是
 *   `这是工业时代合理的目标，当你有 500 人…组织才能作为一个整体运转。`（中文 1 句）
 *   被切成 5 片去配英文 5 句，从词中间截断产出 `组织才` + `能作为一个整体运转。`。
 *   每份都含汉字、拼接也守恒，①② 两道老闸全放行 —— 只有人看得出来是垃圾。
 *   旧注释写的「97—99% 的切点落在标点上」，那 1—3% 不是误差而是断词残片；
 *   而落在逗号上的那 70—92% 同样是在编造中文里并不存在的句界，只是看起来像话。
 *   现在只在句数相等时切，切点就是中文自己的句界，结构上不可能切进词里。
 *   代价：AI 栏目 1,827 段中约 1/3 保留句级、其余退成段落级 —— 段落级只是不如句级精细，
 *   编造的句级配对是**错的**（逐句模式下会把错的搭配当例句教给用户）。
 */
function blockToPara(b, stat) {
  const en = String(b.en || "").trim();
  const zh = String(b.zh || "").trim();
  if (!en && !zh) return null;
  if (!en) { stat.onlyZh++; return { sentences: [{ en: "", cn: zh }] }; }   // 理论不可达，留给守恒闸抓
  if (!zh) { stat.onlyEn++; return { sentences: [{ en, cn: "" }] }; }
  const one = () => ({ sentences: [{ en, cn: zh }] });
  if (b.mergedZ || b.mergedE) { stat.mergedAsIs++; return one(); }          // ① 合并组不切
  const sents = splitSentencesLossless(en);
  if (!sents.length) { stat.onlyZh++; return one(); }
  /* ③ 中英两侧句数**本来就相等**，句级对应才存在。相等时直接按中文自己的 。！？… 切，
   *    切点即中文句界，不可能落进词里。旧实现按英文长度占比切、切点吸附「最近的标点」
   *   （逗号顿号也算），于是 `…组织才能作为一个整体运转。`（中文 1 句）被切成 5 片去配
   *    英文 5 句，产出 `组织才` + `能作为一个整体运转。` 这种从词中间截断的残片 ——
   *    每份含汉字、拼接守恒，①②两道老闸全都拦不住。
   *    句数不等就退成段落级：这是诚实的损失，不是丢内容（守恒闸仍逐字符校验）。 */
  const units = splitChineseUnits(zh);
  if (units.length !== sents.length) { stat.countDiff++; return one(); }
  if (hasHan(zh) && units.some(u => !hasHan(u))) { stat.noHan++; return one(); }   // ② 切出无汉字的一份
  /* 中文切分守恒：拼回去必须与源块逐字符相同 */
  if (squash(units.join("")) !== squash(zh)) { stat.cutMismatch++; return one(); }
  return { sentences: sents.map((s, i) => ({ en: s, cn: units[i] })) };
}

/* ---------------- 主流程 ---------------- */

const only = arg("section");
const slugs = only ? [only.split(":")[0]] : ESSAYS.map(e => e.slug);

const day = new Date(Date.now() + 8 * 3600e3).toISOString().slice(0, 10);   // Asia/Shanghai
const built = [];
const fatal = [];

console.log(`\nOffbook 接入勘察 · ${new Date().toISOString().slice(0, 19).replace("T", " ")}`);
console.log(`目标 ${slugs.length} 期 · 粒度 = 整期一篇\n`);

for (const meta of ESSAYS) {
  if (!slugs.includes(meta.slug)) continue;
  const url = `https://offbook.press/essays/${meta.slug}/`;
  const html = loadHtml(meta.slug);
  let doc;
  try { doc = parseEssay(html, { slug: meta.slug, url }); }
  catch (e) { console.log(`⊘ ${meta.slug} —— ${e.message}`); if (!/英文块为空/.test(e.message)) fatal.push(meta.slug); continue; }

  /* 源侧基准（守恒比对用）—— ★ 必须**含节标题**，因为下面入库时标题是当正文段落收进去的。
   *   分篇时代这里只取 `s.blocks`（h2 标题另作文章标题、不进正文），两侧口径一致；
   *   整期时代标题回到正文，基准若不跟着变，守恒闸会红 —— 而那个红是**对的**，
   *   它恰好把「标题有没有进正文」照了出来（分篇时照不出来，h3 丢了都没人知道）。 */
  const zhAt = html.indexOf('<div class="prose i18n-zh"'), enAt = html.indexOf('<div class="prose i18n-en"');
  const relAt = html.indexOf('class="essay__related"');
  const srcZ = toSections(trimTail(toBlocks(html.slice(zhAt, enAt)))).flatMap(s => [s.head, ...s.blocks.map(b => b.text)]);
  const srcE = toSections(trimTail(toBlocks(html.slice(enAt, relAt > enAt ? relAt : html.length))
    .filter(b => !(b.tag === "blockquote" && /Complete English/i.test(b.text))))).flatMap(s => [s.head, ...s.blocks.map(b => b.text)]);

  const essayTitleZh = (doc.title.match(/ISSUE\s+\d+\s*([^｜|]+)/) || [, ""])[1].trim() || doc.title;
  const essayTitleEn = doc.titleEn || "";

  /* 渐变封面 = 源站那本立体书的**本色**（正封→书脊→封底三色，见 lib-offbook.mjs 里 palette 的说明）。
   * `meta.grad` 只作兜底：官方哪天不写 data-cover-* 了才用得上。 */
  const P = doc.palette || {};
  const grad = P.front
    ? `linear-gradient(135deg,${P.front} 0%,${P.spine || P.front} 50%,${P.back || P.front} 100%)`
    : meta.grad;

  const stat = { cutMismatch: 0, onlyZh: 0, onlyEn: 0, mergedAsIs: 0, noHan: 0, countDiff: 0, paras: 0, sentenceParas: 0, heads: 0 };
  const outParas = [];
  let allZ = "", allE = "", skipZ = "", skipE = "";
  const skipped = [];

  /* ★ 逐**节**遍历（不是逐章）。整期模式下 `SKIP_HEAD` 命中的是节标题本身 ——
   *   分篇时代它总是恰好命中一个 h2 章，所以按章判等价；现在必须按节判。 */
  doc.sections.forEach(sec => {
    const hz = String(sec.headZh || "").trim();
    const he = String(sec.headEn || "").trim();
    const skip = SKIP_HEAD.test(hz);
    /* ① 节标题当段落 —— 这是整期模式**修回来的内容**：分篇时 h2 标题被拿去当文章标题、
     *    h3 标题整批消失。排除节的标题同样走排除侧，等式才闭合。
     *    `head: sec.level`（2/3/4）是给阅读页的：正文段落与节标题在数据里同一形状，
     *    前端只能靠这个字段决定渲染成 `<p class="para">` 还是 `<h2 class="para para-head">`。
     *    缺了它，标题会以正文的样子出现 —— 而标题的句子常常与紧邻的正文重申同一句
     *    （实测 `Do → observe → ask → learn → do` 上下相邻两段），读起来像重复的正文。 */
    if (hz || he) {
      if (skip) { skipZ += hz; skipE += he; }
      else { outParas.push({ head: sec.level, sentences: [{ en: he, cn: hz }] }); allZ += hz; allE += he; stat.heads++; }
    }
    /* ② 正文块 */
    let n = 0;
    for (const b of sec.blocks) {
      if (b.tag === "hr") continue;                      // 分隔线不是内容
      if (skip) { skipZ += b.zh || ""; skipE += b.en || ""; n++; continue; }
      const p = blockToPara(b, stat);
      if (!p) continue;
      outParas.push(p);
      stat.paras++;
      if (p.sentences.length > 1) stat.sentenceParas++;
      allZ += b.zh || ""; allE += b.en || "";
    }
    if (skip) skipped.push(`${hz}(${n} 段)`);
  });

  if (!outParas.length) { console.log(`⊘ ${meta.slug} —— 解析后无内容`); fatal.push(meta.slug); continue; }

  let words = 0, sents = 0;
  for (const p of outParas) for (const x of p.sentences) {
    if (x.en) { sents++; words += (x.en.match(/[A-Za-z'’-]+/g) || []).length; }
  }

  /* 封面实图：`assets/covers/<meta.cover>`。缺图 → fatal 并跳过，**不用渐变兜底掩盖** ——
   * 「页面仍然有封面、只是变了样子」这种失败没有任何报警，等发现时已经上线了。 */
  const coverImg = meta.cover ? `assets/covers/${meta.cover}` : "";
  if (coverImg && !fs.existsSync(path.join(ROOT, coverImg))) {
    console.log(`⊘ ${meta.slug} —— 封面图不存在：${coverImg}`);
    fatal.push(meta.slug);
    continue;
  }

  const additions = [{
    id: `ob-${meta.slug}`, cat: "AI", title: essayTitleEn, titleZh: essayTitleZh,
    source: `Offbook Press · ${AUTHOR}`,
    date: (doc.date || "").slice(0, 10),
    url,
    addedAt: day, pin: true,
    contentStatus: "complete", extractorVersion: "offbook-v3",
    author: AUTHOR, authorZh: AUTHOR_ZH,
    translation_type: "official", translationCredit: "Offbook Press 官方中英双语",
    official_source_url: url,
    issue: meta.issue,
    sourceTextWords: words, sourceParagraphs: outParas.length, sourceSentences: sents,
    cover: grad, gradient: grad,
    coverFrom: P.front || "", coverTo: P.back || "",
    ...(coverImg ? { coverImg } : {}),
    paras: outParas,
  }];

  /* ---- 守恒硬闸：入库 + 显式排除 必须等于源侧全文 ---- */
  const okZ = squash(srcZ.join("")) === squash(allZ + skipZ);
  const okE = squash(srcE.join("")) === squash(allE + skipE);
  const tag = okZ && okE ? "✓" : "✗";
  console.log(`${tag} ISSUE ${meta.issue} ${essayTitleZh}`);
  console.log(`   守恒(入库+排除=源) zh ${okZ ? "✓" : "✗"} ${squash(srcZ.join("")).length}→${squash(allZ).length}+${squash(skipZ).length} | en ${okE ? "✓" : "✗"} ${squash(srcE.join("")).length}→${squash(allE).length}+${squash(skipE).length}`);
  if (skipped.length) console.log(`   排除 back matter：${skipped.join(" · ")}`);
  console.log(`   节标题段 ${stat.heads} · 段落 ${outParas.length} · 句 ${sents} · ${words.toLocaleString()} 词 · 合并组 ${doc.report.merged} · 就近挂靠 ${doc.report.attached.length} · 句级 ${stat.sentenceParas}/${stat.paras} · 合并组不切 ${stat.mergedAsIs} · 句数不等退段级 ${stat.countDiff} · 无汉字份 ${stat.noHan} · 切分不守恒 ${stat.cutMismatch}`);
  if (!okZ || !okE) fatal.push(meta.slug);
  additions.forEach(a => console.log(`     · ${a.id}  ${String(a.paras.length).padStart(3)} 段  ${String(a.sourceTextWords).padStart(5)} 词  ${a.titleZh}`));
  built.push(...additions);
}

console.log(`\n合计 ${built.length} 篇 · ${built.reduce((n, a) => n + a.sourceTextWords, 0).toLocaleString()} 个英文词`);

if (fatal.length) {
  console.error(`\n✗ 守恒被破坏或被跳过：${fatal.join(", ")} —— 拒绝写盘。`);
  process.exit(1);
}

if (!has("apply")) {
  console.log(`\n（勘察模式，未写盘。加 --apply 写入 ${path.relative(ROOT, FILE)}）`);
  process.exit(0);
}

/* ---- 写盘：与 people.mjs 同一条路 ---- */
const cur = readDecl(FILE, "ARTICLES_EXTRA").value;
const prevOb = cur.filter(a => !String(a.extractorVersion || "").startsWith("offbook"));
const removed = cur.length - prevOb.length;
const next = [...prevOb, ...built];
writeDecl(FILE, "ARTICLES_EXTRA", next);
/* 文件头的「共 N 篇」就地改掉（照 people.mjs 的做法，不整文件重写） */
fs.writeFileSync(FILE, fs.readFileSync(FILE, "utf8").replace(/共 \d+ 篇/, `共 ${next.length} 篇`));
console.log(`\n✓ 写入 ${path.relative(ROOT, FILE)}：移除旧 offbook ${removed} 篇，写入 ${built.length} 篇，总计 ${next.length} 篇。`);

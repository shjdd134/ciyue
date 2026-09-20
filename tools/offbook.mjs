/* 词阅 WordLens —— Offbook Press 双语长文接入
 *
 * 源站：https://offbook.press/essays/<slug>/ —— 作者 Dawei Geng，每期一篇长文，
 * **官网自带官方中英双语**（`<div class="prose i18n-zh">` + `i18n-en`，段落级一一对应）。
 * 所以这条通道**不翻译**，只抽取 —— 与 RSS / people 两条通道（英文原文 + 机翻）本质不同。
 *
 * 粒度：按 h2 大章拆篇。理由与实测数字见 HANDOFF §0.2 的 offbook 条目：
 *   整篇 8k—18k 词 / 60—100 分钟，而阅读页**没有目录功能**；h2 拆完每篇 1.5k—4.5k 词。
 *
 * 出口与 people.mjs 完全一致：readDecl → 过滤旧条目 → writeDecl → 就地把「共 N 篇」改掉。
 * **不自己拼文件头**，避免出现第二个写盘路径。
 *
 * 用法：
 *   node tools/offbook.mjs --plan            只勘察：章级清单 + 守恒校验（默认）
 *   node tools/offbook.mjs --apply           写入 assets/data-articles-extra.js
 *   node tools/offbook.mjs --fetch           先重新抓取（.tmp/offbook/<slug>.html）
 *   node tools/offbook.mjs --section=a01:5   并排看某一节的中英块（排错用）
 *
 * ★ 守恒是硬闸：任何一篇的 zh / en 字符数与源站对不上就拒绝写盘。
 *   「对齐」是可以讨论的（合并 / 就近挂靠都能看见），「丢字」没有讨论余地。
 */

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { parseEssay, splitSentencesLossless, cutChinese, squash, toBlocks, toSections, trimTail } from "./lib-offbook.mjs";
import { readDecl, writeDecl } from "./lib-text.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const CACHE = path.join(ROOT, ".tmp", "offbook");
const FILE = path.join(ROOT, "assets", "data-articles-extra.js");

/* 顺序 = 期号。ISSUE 06 的英文块在官网上是空的（`<div class="prose i18n-en">  </div>`，
 * 2026-09-20 实测），只收 01—05；官网补发英译后把 06 加回这里重跑即可。
 *
 * ★ `grad` 只是**兜底**色：正常情况渐变取自源站那本立体书的 `data-cover-front/spine/back`
 *   （见 lib-offbook.mjs 的 palette）。下面这几个手挑色是第一版的产物，现在只有官方
 *   哪天不写配色属性时才会用到 —— 别再把它们当作用户看到的颜色。 */
const ESSAYS = [
  { issue: 1, slug: "on-cognitive-decoupling", grad: "linear-gradient(135deg,#d8e8dc 0%,#1e2a1e 100%)" },
  { issue: 2, slug: "rebuilding-learning", grad: "linear-gradient(135deg,#dce6f0 0%,#243447 100%)" },
  { issue: 3, slug: "breakdown-of-firms", grad: "linear-gradient(135deg,#efe2d4 0%,#4a3527 100%)" },
  { issue: 4, slug: "mirage-of-form", grad: "linear-gradient(135deg,#e6e2f2 0%,#372f4e 100%)" },
  { issue: 5, slug: "teaching-and-training-disqualified", grad: "linear-gradient(135deg,#f0e6dc 0%,#523a2c 100%)" },
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

/* ---------------- 章级切分 ---------------- */

/** 把小标题序列切成「章」：h2 开新章，h3/h4 归入当前章；首个 h2 之前的引言并进第一章。
 *  ★ 为什么要这么切：整篇进阅读页是一条 240 段 / 1,200 句的无目录长滚，estMinutes 会到 100 分钟；
 *    按 h2 拆完每篇 25—80 段，落在「列表 + 搜索能当目录用」的粒度上。
 *  ★ 踩过的坑：`toSections` 是**每遇到一个标题就开一节**，所以一个 h2 章的内容分散在
 *    「h2 那一节」+ 后面若干个 h3 节里。第一版只把后续 h3 节收进章、忘了把 h2 那一节本身收进去，
 *    结果每章开头的段落整段消失 —— a01 丢 84/265 块（zh 24525→18290 字）。
 *    这个丢法**不会报错、不会空段**，只能靠守恒闸抓。 */
function chaptersOf(doc) {
  const out = [];
  let cur = null;
  for (const s of doc.sections) {
    if (s.level === 2) {
      cur = { headZh: s.headZh, headEn: s.headEn, headId: s.headId, sections: [s] };
      out.push(cur);
    } else {
      if (!cur) { cur = { headZh: "", headEn: "", headId: "", sections: [] }; out.push(cur); }
      cur.sections.push(s);
    }
  }
  /* h2 之前的引言（level 0）并进第一章，避免多出一篇「无题」文章 */
  if (out.length > 1 && !out[0].headZh) {
    const intro = out.shift();
    out[0].sections = [...intro.sections, ...out[0].sections];
  }
  return out.filter(c => c.sections.some(s => s.blocks.length));
}

/* ---------------- 块 → app 段落 ---------------- */

/** 有没有汉字（不含中日韩标点）。用来验「切出来的每份中文都还是中文」。 */
const hasHan = s => /[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/.test(String(s || ""));

/**
 * 一个源块 → app 段落。
 * 源块给的是**段落级**对齐（官方译文没有句级），所以英文切句后，中文按各句长度占比切、
 * 切点吸附最近的标点。实测（5 篇 4,155 句）97—99% 的切点落在标点上。
 * 中文短到切不出来时退化成「单句段」，**绝不产出空译文**（qc 会按漏译判红）。
 *
 * ★ 两种「不切」的情况，都是 2026-09-20 被 qc 的 F4 逼出来的：
 *   ① **合并组不切**（`b.mergedZ || b.mergedE`）。合并组的意思是「官方两种语言的排版不一样，
 *      块数本来就不等」——此时**句级对应根本不存在**，按占比硬切只是编造。
 *      实测 a05 第五章那句并列清单：中文一块 `A. 能给出可被反驳的初步判断 B. 能从被反驳中修正模型 …`，
 *      英文拆成 9 块，硬切产出 `E.` / `能` / `把学` / `习接` / `回真` / `实任务` 这种**逐字碎片**，
 *      每份都还有汉字、守恒也过（拼回去一模一样），**只有人看得出来是垃圾**。
 *      退成一句 `{en, cn}` 是诚实的损失：读者拿到的是段落级对照，不是伪造的句级对照。
 *   ② 切出来某一份**一个汉字都没有**（但整段中文有汉字）。最典型的是
 *      `公元 1913 年，密歇根州，Highland Park。` 对 `Highland Park, Michigan. 1913.` ——
 *      中英**语序相反**（中文把年份放前、地名放后），按占比切必然把 `Highland Park。` 单独切出来，
 *      那份没有汉字，qc F4 直接判「译文无中文（照抄英文，疑似漏译）」。
 *      这不是漏译，是「这段没法句级对齐」——退成段落级。
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
  const frags = cutChinese(zh, sents.map(s => s.length));
  if (!frags || frags.length !== sents.length || frags.some(f => !f.trim())) { stat.degraded++; return one(); }
  if (hasHan(zh) && frags.some(f => !hasHan(f))) { stat.noHan++; return one(); }   // ② 切出无汉字的一份
  /* 中文切分守恒：拼回去必须与源块逐字符相同 */
  if (squash(frags.join("")) !== squash(zh)) { stat.cutMismatch++; return one(); }
  return { sentences: sents.map((s, i) => ({ en: s, cn: frags[i].trim() })) };
}

/* ---------------- 主流程 ---------------- */

const only = arg("section");
const slugs = only ? [only.split(":")[0]] : ESSAYS.map(e => e.slug);

const day = new Date(Date.now() + 8 * 3600e3).toISOString().slice(0, 10);   // Asia/Shanghai
const built = [];
const fatal = [];

console.log(`\nOffbook 接入勘察 · ${new Date().toISOString().slice(0, 19).replace("T", " ")}`);
console.log(`目标 ${slugs.length} 篇 · 粒度 = h2 大章\n`);

for (const meta of ESSAYS) {
  if (!slugs.includes(meta.slug)) continue;
  const url = `https://offbook.press/essays/${meta.slug}/`;
  const html = loadHtml(meta.slug);
  let doc;
  try { doc = parseEssay(html, { slug: meta.slug, url }); }
  catch (e) { console.log(`⊘ ${meta.slug} —— ${e.message}`); if (!/英文块为空/.test(e.message)) fatal.push(meta.slug); continue; }

  /* 源侧基准（守恒比对用） */
  const zhAt = html.indexOf('<div class="prose i18n-zh"'), enAt = html.indexOf('<div class="prose i18n-en"');
  const relAt = html.indexOf('class="essay__related"');
  const srcZ = toSections(trimTail(toBlocks(html.slice(zhAt, enAt)))).flatMap(s => s.blocks.map(b => b.text));
  const srcE = toSections(trimTail(toBlocks(html.slice(enAt, relAt > enAt ? relAt : html.length))
    .filter(b => !(b.tag === "blockquote" && /Complete English/i.test(b.text))))).flatMap(s => s.blocks.map(b => b.text));

  const chapters = chaptersOf(doc);
  const essayTitleZh = (doc.title.match(/ISSUE\s+\d+\s*([^｜|]+)/) || [, ""])[1].trim() || doc.title;
  const essayTitleEn = doc.titleEn || "";

  /* 渐变封面 = 源站那本立体书的**本色**（正封→书脊→封底三色，见 lib-offbook.mjs 里 palette 的说明）。
   * `meta.grad` 只作兜底：官方哪天不写 data-cover-* 了才用得上。 */
  const P = doc.palette || {};
  const grad = P.front
    ? `linear-gradient(135deg,${P.front} 0%,${P.spine || P.front} 50%,${P.back || P.front} 100%)`
    : meta.grad;

  let allZ = "", allE = "";
  const stat = { degraded: 0, cutMismatch: 0, onlyZh: 0, onlyEn: 0, mergedAsIs: 0, noHan: 0 };
  const additions = [];
  let skipZ = "", skipE = "";
  const skipped = [];

  chapters.forEach((ch, ci) => {
    const skip = SKIP_HEAD.test(ch.headZh.trim());
    if (skip) {
      let n = 0;
      for (const s of ch.sections) for (const b of s.blocks) { if (b.tag === "hr") continue; skipZ += b.zh || ""; skipE += b.en || ""; n++; }
      skipped.push(`${ch.headZh}(${n} 段)`);
    }
    const id = `ob-${meta.slug}-c${String(ci + 1).padStart(2, "0")}`;
    const outParas = [];
    let cz = "", ce = "", words = 0, sents = 0;
    for (const s of ch.sections) {
      for (const b of s.blocks) {
        if (b.tag === "hr") continue;                      // 分隔线不是内容
        if (skip) continue;
        const p = blockToPara(b, stat);
        if (!p) continue;
        outParas.push(p);
        cz += b.zh || ""; ce += b.en || "";
        for (const x of p.sentences) {
          if (x.en) { sents++; words += (x.en.match(/[A-Za-z'’-]+/g) || []).length; }
        }
      }
    }
    if (!outParas.length) return;
    allZ += cz; allE += ce;

    const titleZh = ch.headZh ? `${essayTitleZh} · ${ch.headZh}` : essayTitleZh;
    const titleEn = ch.headEn ? `${essayTitleEn} · ${ch.headEn}` : essayTitleEn;
    additions.push({
      id, cat: "AI", title: titleEn, titleZh,
      source: `Offbook Press · ${AUTHOR}`,
      date: (doc.date || "").slice(0, 10),
      url: ch.headId ? `${url}#${ch.headId}` : url,
      addedAt: day, pin: true,
      contentStatus: "complete", extractorVersion: "offbook-v1",
      author: AUTHOR, authorZh: AUTHOR_ZH,
      translation_type: "official", translationCredit: "Offbook Press 官方中英双语",
      official_source_url: url,
      issue: meta.issue, chapter: ci + 1,
      sourceTextWords: words, sourceParagraphs: outParas.length, sourceSentences: sents,
      cover: grad, gradient: grad,
      coverFrom: P.front || "", coverTo: P.back || "",
      paras: outParas,
    });
  });

  /* ---- 守恒硬闸：入库 + 显式排除 必须等于源侧全文 ---- */
  const okZ = squash(srcZ.join("")) === squash(allZ + skipZ);
  const okE = squash(srcE.join("")) === squash(allE + skipE);
  const tag = okZ && okE ? "✓" : "✗";
  console.log(`${tag} ISSUE ${meta.issue} ${essayTitleZh}  →  ${additions.length} 篇`);
  console.log(`   守恒(入库+排除=源) zh ${okZ ? "✓" : "✗"} ${squash(srcZ.join("")).length}→${squash(allZ).length}+${squash(skipZ).length} | en ${okE ? "✓" : "✗"} ${squash(srcE.join("")).length}→${squash(allE).length}+${squash(skipE).length}`);
  if (skipped.length) console.log(`   排除 back matter：${skipped.join(" · ")}`);
  console.log(`   段落 ${additions.reduce((n, a) => n + a.sourceParagraphs, 0)} · 句 ${additions.reduce((n, a) => n + a.sourceSentences, 0)} · ${additions.reduce((n, a) => n + a.sourceTextWords, 0).toLocaleString()} 词 · 合并组 ${doc.report.merged} · 就近挂靠 ${doc.report.attached.length} · 合并组不切 ${stat.mergedAsIs} · 无汉字份 ${stat.noHan} · 切不动 ${stat.degraded} · 切分不守恒 ${stat.cutMismatch}`);
  if (!okZ || !okE) fatal.push(meta.slug);
  additions.forEach(a => console.log(`     · ${a.id}  ${String(a.paras.length).padStart(3)} 段  ${String(a.sourceTextWords).padStart(5)} 词  ${a.titleZh.slice(0, 44)}`));
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

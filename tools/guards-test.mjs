#!/usr/bin/env node
/* 词阅 WordLens —— 两个新守卫的负向测试（守卫必须能被证明「会响」）
 *
 * 背景：记忆里有一条硬规矩 —— **新守卫必须做负向测试**。反面教材就是
 * `staticSkipReason` 的 `/\/podcast\//`（要求斜杠前缀，而 fs.blog 路径是
 * `knowledge-project-podcast/…`）—— 那条规则**从来没命中过**，因为它没被测过。
 *
 * 本文件验证 4 件事：
 *   A. 真实数据：重复句守卫通过、专名守卫通过（正样本不许误报）
 *   B. 人为复制一句 → 重复句守卫必须报错
 *   C. 复制时把标点前加个空格（`Memoirs,` → `Memoirs ,`）→ 仍然必须报错
 *      —— 这一条专门守「归一化顺序」那个 bug：先去空白再去标点会把两者判成不同
 *   D. 凭空注入《黑客帝国》→ 专名守卫必须报错
 *   E. 注入一个**未登记**的新专名 → 专名守卫也必须报错（挡住「新专名不登记就进库」）
 *
 * 用法：node tools/guards-test.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { readArts, flatten, findDupViolations } from "./audit-dups.mjs";
import { findTitleViolations } from "./audit-cn-titles.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const TMP = path.join(ROOT, ".tmp", "guards-test");
fs.mkdirSync(TMP, { recursive: true });

const arts = readArts();
const clone = () => JSON.parse(JSON.stringify(arts));

/* 测试样本选取 —— **不要硬编码文章 id**。
 * 2026-09-18 踩的坑：本文件原先写死 people-monica-bellucci-style-and-change 与
 * gr-listening-is-the-silencing-of-the-mind，而这两篇在 09-17「删正文与图片」批次里被下架
 * → find() 返回 undefined → 第 51 行直接 TypeError，**整套负向测试从此跑不了**。
 * 更糟的是没人发现 —— 那批内容变更之后没有跑全量回归，这个红就一直挂在库里。
 * 现在按**结构特征**挑样本，文章表怎么变都不会坏；真挑不到就明确报错，不静默变成 undefined。
 * 要求：p1 是 ≥3 句的多句段（要能取到 .sentences[2]），p2 也是多句段（要能 push）。 */
const pickArticle = data => {
  for (const a of data) {
    const [p1, p2] = a.paras || [];
    if (Array.isArray(p1?.sentences) && p1.sentences.length >= 3
      && Array.isArray(p2?.sentences) && p2.sentences.length) return a;
  }
  throw new Error("测试样本选取失败：库里没有「前两段都是多句段、且首段 ≥3 句」的文章");
};

/** 把一个（已改动的）数组写成可被 readArts 解析的文件 */
const writeVariant = (name, data) => {
  const f = path.join(TMP, name);
  fs.writeFileSync(f, "const ARTICLES_EXTRA = " + JSON.stringify(data, null, 2) + ";\n");
  return f;
};

const results = [];
const check = (label, ok, detail = "") => { results.push({ label, ok, detail }); };

/* ---------- A. 正样本 ---------- */
{
  const d = findDupViolations(clone());
  check("A1 真实数据：无未登记重复句", d.bad.length === 0, d.bad.length ? `报了 ${d.bad.length} 组` : "");
  const t = findTitleViolations(clone());
  check("A2 真实数据：专名全部有出处", t.issues.length === 0, t.issues.length ? `报了 ${t.issues.length} 处` : "");
}

/* ---------- B. 原样复制一句 ---------- */
{
  const data = clone();
  const a = pickArticle(data);                                    // 按结构挑，不写死 id
  const src = a.paras[0].sentences[2];                            // p1-s3
  a.paras[1].sentences.push({ en: src.en, cn: src.cn });          // 原样复制进 p2
  const d = findDupViolations(data);
  check("B 原样复制一句 → 守卫报错", d.bad.length > 0, d.bad.length ? "" : "守卫没响（漏报）");
}

/* ---------- C. 复制时标点前加空格（专治归一化顺序） ---------- */
{
  const data = clone();
  const a = pickArticle(data);
  const src = a.paras[0].sentences[2];
  /* 原先写死 `"Cannes." → "Cannes ."` —— 换样本文章后句子里根本没有 Cannes，
   * replace 静默不生效，这条测试就退化成 B 的重复，**看着通过其实没测到东西**。
   * 现在从句子自己身上取句点加空格，样本是哪篇都成立。 */
  const dot = src.en.lastIndexOf(".");
  const en = dot > 0 ? src.en.slice(0, dot) + " " + src.en.slice(dot) : src.en + " .";
  a.paras[1].sentences.push({ en, cn: src.cn });
  const d = findDupViolations(data);
  check("C 标点前多一个空格 → 守卫报错（归一化顺序正确）", d.bad.length > 0, d.bad.length ? "" : "守卫没响：归一化顺序又写反了？");
}

/* ---------- D. 注入「已登记」的专名（对照表里有，但这句英文没有） ----------
 * 注意：像《黑客帝国》那种**从没登记过**的注入，命中的是「未登记」分支（见 E）。
 * 这里要单独覆盖「疑似注入」分支：用一个已登记的名字（《奥本海默》← Oppenheimer），
 * 塞进一句英文里根本没有 Oppenheimer 的句子。 */
{
  const data = clone();
  const a = pickArticle(data);
  const s = a.paras[0].sentences ? a.paras[0].sentences[0] : a.paras[0];
  s.cn = "他说《奥本海默》改变了一切。" + (s.cn || "");
  const t = findTitleViolations(data);
  check("D 注入已登记专名但该句英文无出处 → 专名守卫报错（疑似注入）",
    t.issues.some(i => i.kind === "疑似注入"), t.issues.length ? "" : "守卫没响（漏报）");
}

/* ---------- E. 注入未登记专名 ---------- */
{
  const data = clone();
  const a = pickArticle(data);
  const s = a.paras[0].sentences ? a.paras[0].sentences[0] : a.paras[0];
  s.cn = "他提到《一部并不存在的电影》，" + (s.cn || "");
  const t = findTitleViolations(data);
  check("E 注入未登记专名 → 专名守卫报错（未登记）",
    t.issues.some(i => i.kind === "未登记"), t.issues.length ? "" : "守卫没响（漏报）");
}

/* ---------- F. text-scan 判据的负向测试（2026-09-18 加） ----------
 * 为什么需要：2026-09-18 发现 text-scan 的两条判据有假阳性并把它收紧了 ——
 *   ① 裸匹配 `**` 把脏话自我审查星号（f***ed / F*****g / sh**）当成 markdown → 5 处噪音
 *   ② 「cn 里没有 CJK 就算漏译」把分句碎片（`….` 的译文 `……`、`That?!` 的译文 `？！`）
 *      当成漏译 → 6 处噪音。这两类合计 11 处一直挂在全量回归里，把真问题淹掉。
 * 收紧判据必须**同时**证明两件事：假阳性不再报 + 真样本仍然报（否则就是拿放宽换清静）。
 * 做法：造一个隔离样本目录（只含 1 篇人造文章），用 WORDLENS_TEXTSCAN_ASSETS 指过去
 * 跑真脚本 —— 全程不碰 assets/ 里的真数据。 */
{
  const sampleDir = path.join(TMP, "tscan-assets");
  /* 2026-09-18：rmSync 曾被本机 node 的 safe-delete shim 拦截崩溃（12 项全过却死在清理上，
   * 连汇总都没打印 → release 里被误判为「测试崩溃」）。清理失败不影响判定，吞掉留目录即可。 */
  const rmBestEffort = p => { try { fs.rmSync(p, { recursive: true, force: true }); } catch {} };
  const runScan = sentences => {
    rmBestEffort(sampleDir);
    fs.mkdirSync(sampleDir, { recursive: true });
    const art = [{
      id: "tscan-sample", title: "样本", source: "样本", date: "2026-09-18", category: "成长",
      paras: [{ sentences }, { sentences: [{ en: "A normal sentence here.", cn: "一句正常的话。" }] }],
    }];
    fs.writeFileSync(path.join(sampleDir, "data.js"), "const ARTICLES = " + JSON.stringify(art) + ";\n");
    fs.writeFileSync(path.join(sampleDir, "data-articles-extra.js"), "const ARTICLES_EXTRA = [];\n");
    fs.writeFileSync(path.join(sampleDir, "data-articles-archive.js"), "const ARTICLES_ARCHIVE = [];\n");
    const r = spawnSync(process.execPath, [path.join(ROOT, "tools", "text-scan.js")], {
      encoding: "utf8", env: { ...process.env, WORDLENS_TEXTSCAN_ASSETS: sampleDir },
    });
    return (r.stdout || "") + (r.stderr || "");
  };
  const countOf = (out, rule) => {
    const m = out.match(new RegExp("（" + rule + "）：(\\d+) 处"));
    return m ? +m[1] : 0;
  };

  const outFalsePositive = runScan([
    { en: "I was almost f***ed.", cn: "我差点完蛋了。" },
    { en: "You either give a f*** or you don’t.", cn: "你要么在乎，要么不在乎。" },
    { en: "He is sh**.", cn: "他不行。" },
    { en: "….", cn: "……" },
    { en: "That?!", cn: "？！" },
    { en: "HM: ...", cn: "HM：……" },
    { en: "Holacracy: The New Management System for a Rapidly Changing World , Brian J. Robertson.", cn: "《Holacracy: The New Management System for a Rapidly Changing World》Brian J. Robertson" },
  ]);
  check("F1 脏话打码星号（f***ed / sh**）不再被当成 markdown",
    countOf(outFalsePositive, "markdown") === 0, "markdown " + countOf(outFalsePositive, "markdown") + " 处");
  check("F2 分句碎片（`….` 的译文 `……`）不再被当成漏译",
    countOf(outFalsePositive, "translate") === 0, "translate " + countOf(outFalsePositive, "translate") + " 处");
  check("F5 说话人缩写+省略号碎片（`HM: ...` 的译文 `HM：……`）不再被当成漏译",
    countOf(outFalsePositive, "translate") === 0, "translate " + countOf(outFalsePositive, "translate") + " 处");
  check("F7 书单行（cn = 《书名》+作者，无汉字）不再被当成漏译",
    countOf(outFalsePositive, "translate") === 0, "translate " + countOf(outFalsePositive, "translate") + " 处");

  /* F8 专治「豁免放宽过头」：书名号只在句首才算引文。句中夹一对《》的真漏译必须照报。 */
  const outCiteScope = runScan([
    { en: "That book was never translated properly.", cn: "That book was never《translated》properly." },
  ]);
  check("F8 句中夹《》的真漏译仍然报错（没好宽成「带书名号就放行」）",
    countOf(outCiteScope, "translate") >= 1, "translate " + countOf(outCiteScope, "translate") + " 处");

  const outTruePositive = runScan([
    { en: "This is **bold** text.", cn: "这是**粗体**文字。" },
    { en: "This sentence was never translated.", cn: "This sentence was never translated." },
    { en: "Yeah, but not the wording, the design you used.", cn: "HM: Yeah, but not the wording, the design you used." },
  ]);
  check("F3 真 markdown（`**bold**`）仍然报错（收紧没把它一起放过）",
    countOf(outTruePositive, "markdown") >= 1, "markdown " + countOf(outTruePositive, "markdown") + " 处");
  check("F4 真漏译（cn 照抄英文没翻）仍然报错",
    countOf(outTruePositive, "translate") >= 1, "translate " + countOf(outTruePositive, "translate") + " 处");
  check("F6 带实际英文内容的说话人碎片（`HM: Yeah…` 照抄）仍然报错",
    countOf(outTruePositive, "translate") >= 2, "translate " + countOf(outTruePositive, "translate") + " 处");
}

/* ---------- 汇总 ---------- */
let pass = 0;
for (const r of results) {
  console.log(`${r.ok ? "✓" : "✗"} ${r.label}${r.detail ? "  —— " + r.detail : ""}`);
  if (r.ok) pass++;
}
console.log(`\n${pass}/${results.length} 通过`);
try { fs.rmSync(TMP, { recursive: true, force: true }); } catch {}
process.exit(pass === results.length ? 0 : 1);

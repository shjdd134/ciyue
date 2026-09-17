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
import { readArts, flatten, findDupViolations } from "./audit-dups.mjs";
import { findTitleViolations } from "./audit-cn-titles.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const TMP = path.join(ROOT, ".tmp", "guards-test");
fs.mkdirSync(TMP, { recursive: true });

const arts = readArts();
const clone = () => JSON.parse(JSON.stringify(arts));

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
  const a = data.find(x => x.id === "people-monica-bellucci-style-and-change");
  const src = a.paras[0].sentences[2];                            // p1-s3
  a.paras[1].sentences.push({ en: src.en, cn: src.cn });          // 原样复制进 p2
  const d = findDupViolations(data);
  check("B 原样复制一句 → 守卫报错", d.bad.length > 0, d.bad.length ? "" : "守卫没响（漏报）");
}

/* ---------- C. 复制时标点前加空格（专治归一化顺序） ---------- */
{
  const data = clone();
  const a = data.find(x => x.id === "people-monica-bellucci-style-and-change");
  const src = a.paras[0].sentences[2];
  const en = src.en.replace("Cannes.", "Cannes .");               // 制造「标点前多空格」
  a.paras[1].sentences.push({ en, cn: src.cn });
  const d = findDupViolations(data);
  check("C `Cannes.` vs `Cannes .` → 守卫报错（归一化顺序正确）", d.bad.length > 0, d.bad.length ? "" : "守卫没响：归一化顺序又写反了？");
}

/* ---------- D. 注入「已登记」的专名（对照表里有，但这句英文没有） ----------
 * 注意：像《黑客帝国》那种**从没登记过**的注入，命中的是「未登记」分支（见 E）。
 * 这里要单独覆盖「疑似注入」分支：用一个已登记的名字（《奥本海默》← Oppenheimer），
 * 塞进一句英文里根本没有 Oppenheimer 的句子。 */
{
  const data = clone();
  const a = data.find(x => x.id === "gr-listening-is-the-silencing-of-the-mind");
  const s = a.paras[0].sentences ? a.paras[0].sentences[0] : a.paras[0];
  s.cn = "他说《奥本海默》改变了一切。" + (s.cn || "");
  const t = findTitleViolations(data);
  check("D 注入已登记专名但该句英文无出处 → 专名守卫报错（疑似注入）",
    t.issues.some(i => i.kind === "疑似注入"), t.issues.length ? "" : "守卫没响（漏报）");
}

/* ---------- E. 注入未登记专名 ---------- */
{
  const data = clone();
  const a = data.find(x => x.id === "gr-listening-is-the-silencing-of-the-mind");
  const s = a.paras[0].sentences ? a.paras[0].sentences[0] : a.paras[0];
  s.cn = "他提到《一部并不存在的电影》，" + (s.cn || "");
  const t = findTitleViolations(data);
  check("E 注入未登记专名 → 专名守卫报错（未登记）",
    t.issues.some(i => i.kind === "未登记"), t.issues.length ? "" : "守卫没响（漏报）");
}

/* ---------- 汇总 ---------- */
let pass = 0;
for (const r of results) {
  console.log(`${r.ok ? "✓" : "✗"} ${r.label}${r.detail ? "  —— " + r.detail : ""}`);
  if (r.ok) pass++;
}
console.log(`\n${pass}/${results.length} 通过`);
fs.rmSync(TMP, { recursive: true, force: true });
process.exit(pass === results.length ? 0 : 1);

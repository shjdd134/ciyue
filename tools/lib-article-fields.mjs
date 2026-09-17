/* 词阅 WordLens —— 文章正文派生的「对账字段」重算（共享库）
 *
 * 为什么抽出来：人物篇的 `sourceTextWords` / `sourceParagraphs` 是 qc.mjs F4 用来
 * 对账「字段 vs 正文」的。**只要库内正文变了，字段就会漂**，漂了 qc 就拒收该篇：
 *   实测 2026-09-17 删掉 Monica 篇 6 句重复副本后 → `F4 人物原文词数不一致（字段 1063，正文 915）`
 * 原先这段逻辑只写在 tools/ingest.mjs 里（收尾重算），但**动正文的不止 ingest**：
 *   tools/_dedup-sentences.mjs（删重复句）、_regroup-paras.mjs（重分组）、人工修订都会。
 * 两处各写一份必然漂成两把尺子，所以抽到这里，ingest.mjs 与维护脚本共用同一份。
 *
 * 三条口径约束：
 *   1. 词数正则必须与 qc.mjs F4 完全一致（`[A-Za-z]+(?:['’][A-Za-z]+)?`）；
 *   2. **段落两种形状都要吃**（`{sentences:[…]}` 与单句 `{en, cn}`）——
 *      只读 `p.sentences` 的单句段会被整段漏算（本库 291/2955 句是单句段）；
 *   3. `sourceTextHash` 刻意不动 —— 源页面本身没变，动了会让人物管线的指纹比对
 *      误判成「来源变更、需要重审」，进而把整篇重抓一遍。
 */

/** 正文英文词数 + 文字段数（口径与 qc.mjs F4 一致） */
export function sourceFieldCounts(a) {
  let words = 0, paras = 0;
  for (const p of a.paras || []) {
    if (p.img) continue;
    const list = Array.isArray(p.sentences) ? p.sentences : (p.en || p.cn ? [p] : []);
    if (!list.length) continue;
    paras++;
    const joined = list.map(s => String(s.en || "")).join(" ");
    words += (joined.match(/[A-Za-z]+(?:['’][A-Za-z]+)?/g) || []).length;
  }
  return { words, paras };
}

/** 按库内正文重算 sourceTextWords / sourceParagraphs。返回改了几处（0 = 本来就一致）。 */
export function syncPeopleSourceFields(a) {
  if (a.sourceTextWords == null) return 0;
  let n = 0;
  const { words, paras } = sourceFieldCounts(a);
  if (a.sourceTextWords !== words) { a.sourceTextWords = words; n++; }
  if (a.sourceParagraphs !== paras) { a.sourceParagraphs = paras; n++; }
  return n;
}

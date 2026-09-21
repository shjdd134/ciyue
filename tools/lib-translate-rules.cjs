/* 词阅 WordLens —— 「译文是不是没翻」这条判据的**唯一实现**。
 *
 * 为什么要有这个文件（2026-09-21）：
 *   同一个判据原先在 tools/text-scan.js 与 tools/qc.mjs 各写了一遍，两次收紧都只改了一边：
 *     · 2026-09-18 SPEAKER_ELLIPSIS（访谈「HM: ...」的译文「HM：……」）—— 两边手工同步了；
 *     · 2026-09-20 BOOK_CITE（书单行 cn = `《书名》作者名`）—— **只改了 text-scan**，
 *       qc 没跟上。后果实测：AI 栏目整期合并后 qc --all 拒收 ob-breakdown-of-firms，
 *       理由「段 386 译文无中文」，而那一行的 cn 是
 *       `《Holacracy: The New Management System for a Rapidly Changing World》Brian J. Robertson`
 *       —— 书名保留原文是 Offbook 官方译本的刻意做法，属于该放行的形态。
 *   项目红线「同一个概念只能有一把尺子」在这里是**已经付过代价**的：靠注释同步等于没有同步。
 *
 * 为什么是 .cjs：tools/text-scan.js 是 CommonJS（无 package.json，.js 默认 CJS），
 *   tools/qc.mjs 是 ESM。`.cjs` 是两边都能拿到的那一种扩展名（ESM 可默认导入 CJS）。
 *
 * 判据本身（en 侧为空、cn 侧为空的处理留在各自调用点，语义不同不要混进来）：
 *   只有**同时**满足下面四条才算漏译：
 *     ① cn 里没有任何汉字（含扩展 A / 兼容区 / 假名 —— 见 HAN 的注释）
 *     ② cn 里带拉丁字母（否则 `……` / `？！` 这类纯标点译文会被误判）
 *     ③ 不是「说话人缩写 + 省略号」的碎片
 *     ④ 不是以书名号开头的书单/参考文献行
 *   ②③④ 都是**收紧**：每一条背后都有一组实测假阳性，见 tools/guards-test.mjs 的 F 节
 *   与 tools/qc-test.mjs 的 SAMPLES（两个工具各测各的，同一个函数被两边同时验证）。
 */
"use strict";

/* 汉字口径统一为「宽」这一档：原 qc.mjs 只有 \u4e00-\u9fff，text-scan.js 多含扩展 A、
 * 兼容表意文字与日文假名。统一时取宽的一侧 —— 窄口径会把「译文里只有假名/异体字」的
 * 正确译文判成漏译，而宽口径唯一可能的漏网（译文只有假名却真没翻）在中文稿里不存在。 */
const HAN = /[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF\u3040-\u30FF]/;
const LATIN = /[A-Za-z]/;

/* 访谈碎片的译文：`HM: ...` → `HM：……`（说话人缩写 + 省略号）。
 * 全库实测仅 Weisz 篇 1 处。带实际英文内容的（`HM: Yeah, ...` 照抄）仍必须报。 */
const SPEAKER_ELLIPSIS = /^(?:[A-Z]{1,3})\s*[：:]\s*[…。.]*$/;

/* 书单 / 参考文献行：cn 形如 `《书名》作者名`，书名保留原文是官方译本的刻意做法。
 * 判据要求 `《》` 落在**句首**且带内容 —— 真漏译（cn 照抄一整句英文）不会以书名号开头，
 * 而句中夹一对《》的真漏译必须照报（反例见 guards-test.mjs F8）。 */
const BOOK_CITE = /^\s*《[^》]{2,}》/;

/** cn 是否是「照抄了英文、没翻」。en 为空 / cn 为空 / 两者相同，都不是本函数的判据范围。 */
function isUntranslated(cn, en) {
  const c = String(cn == null ? "" : cn);
  const e = String(en == null ? "" : en);
  if (!e.trim()) return false;        // 「原文为空」由调用点单独报
  if (!c.trim()) return false;        // 「译文缺失」由调用点单独报
  if (!HAN.test(c) && LATIN.test(c) && !SPEAKER_ELLIPSIS.test(c.trim()) && !BOOK_CITE.test(c)) return true;
  return false;
}

module.exports = { HAN, LATIN, SPEAKER_ELLIPSIS, BOOK_CITE, isUntranslated };

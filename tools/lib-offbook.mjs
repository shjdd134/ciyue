/* 词阅 WordLens —— Offbook Press 长文抽取库
 *
 * 源站：https://offbook.press/essays/<slug>/
 * 结构（2026-09-20 实测 6 篇，同一 Astro 模板）：
 *   <div class="essay__body">
 *     <div class="prose i18n-zh"> …中文全文… </div>
 *     <div class="prose i18n-en"> …英文全文… </div>   ← 顺序固定 zh 在前
 *   </div>
 *   <aside class="essay__related"> 延伸阅读/关于作者（两种语言都有一份，必须丢）
 *
 * ★ 为什么不能用「标签级序列对齐」——这是本库最重要的一条注释：
 *   两侧正文块 99% 都是 <p>，LCS 只要 tag 相同就配对，于是**只要任一侧多出一个 <p>，
 *   往后所有段落会整体错配一格，而且完全无声**。2026-09-20 实测 a02：zh「二、因果推理」
 *   （6 字小标题）被配到 en 的三句正文上；顺着这个错配去切句，中文切点质量从 98.7%
 *   掉到 80.2%（无标点切点 1.3% → 19.8%）。**错配的代价是静默污染，不是报错。**
 *
 *   可靠的做法是三层：
 *     ① 以小标题（h2/h3/h4）为界切成「节」——6 篇实测两侧节数全部相等，标题可顺序配对；
 *     ② 节内块数相等 → 位置配对可信（a01/a05 全篇 0 处不等）；
 *     ③ 节内块数不等 → 内容锚点 DP 对齐（shared Latin token / 数字 / 长度比），
 *        多出来的块标成 orphan，交人工复核表处理。
 *   ★ 只做①②不做③也能跑，但会静默吞掉差异；③的价值是**把差异变成一个带定位的错误**。
 */

/* ---------------- 1. HTML → 块序列 ---------------- */

const ENT = [
  [/&nbsp;/g, " "], [/&amp;/g, "&"], [/&quot;/g, '"'], [/&#39;|&rsquo;|&lsquo;/g, "'"],
  [/&ldquo;|&rdquo;/g, '"'], [/&mdash;/g, "—"], [/&ndash;/g, "–"], [/&hellip;/g, "…"],
  [/&lt;/g, "<"], [/&gt;/g, ">"], [/&#(\d+);/g, (_, d) => String.fromCodePoint(+d)],
];
export const decodeEntities = s => {
  let t = String(s);
  for (const [re, to] of ENT) t = t.replace(re, to);
  return t.replace(/&[a-z#0-9]+;/gi, " ");
};

/* ★ 行内标签必须**不带空格**地删掉（2026-09-20 修）。
 * 原来是 `/ <[^>]+>/g → " "`，每个标签边界都留一个空格；而源站大量用 <strong> 包住半句
 * （实测 on-cognitive-decoupling 一篇 383 个），于是译文长成「…暴露出来 。」
 * —— 汉字与标点之间夹空格。实测 43 篇 ob- 里 915 处（全库 920 处，几乎全是这一批）；英文侧 562 处。
 * 只有 <br> 才该真的换成一个空格。块级标签不该出现在这里（toBlocks 已按块切分、并跳过嵌套块），
 * 真出现（<ul> 无 <li> 的兜底那一路）也仍退化成空格 —— 所以保留最后那条兜底 replace。 */
const INLINE_TAG = /<\/?(?:a|abbr|b|bdi|bdo|cite|code|del|em|i|ins|kbd|mark|q|ruby|rt|s|samp|small|span|strong|sub|sup|time|u|var|wbr)\b[^>]*>/gi;

/** 去掉行内标签、还原实体、剥掉 markdown 粗体标记、合并空白。保留文字本身，不做任何裁剪。 */
export const plainText = s => decodeEntities(String(s)
  .replace(/<br\s*\/?>/gi, " ")
  .replace(INLINE_TAG, "")
  .replace(/<[^>]+>/g, " ")
  /* 官方中文正文里混着 markdown 粗体标记（``**…**``），其中还有作者漏写闭合的半对
   * （on-cognitive-decoupling：「而是因为**旧的“有能力感”的来源正在消失。」—— 源站如此）。
   * app 的原文/译文都走 esc() 纯文本渲染，标记会**原样显示成两颗星号**；
   * 而真正的强调本来是 <strong>（同样被剥成纯文本，不留痕迹）。
   * 所以这里统一剥掉标记、保留文字 —— 与 <strong> 的处理保持一致。 */
  .replace(/\*\*/g, ""))
  .replace(/\s+/g, " ").trim();

const BLOCK_RE = /<(h2|h3|h4|p|blockquote|ul|ol|hr)\b[^>]*>([\s\S]*?)<\/\1>/g;
const LI_RE = /<li\b[^>]*>([\s\S]*?)<\/li>/g;

/** 把一段 HTML 转成块序列。行内 <strong>/<em>/<a>/<code> 只保留文字。
 * ★ 列表要**拆成逐项 <li>**：源站两种语言对同一份清单排版不同 —— 中文常把 4 个例子塞进
 *   一个 <ul>，英文拆成 4 个 <p>。不拆的话「1 个 ul ↔ 4 个 p」在 1:1 DP 里必然全判成孤儿
 *   （2026-09-20 实测 a02 节[23] 就是这么冒出 5 个假孤儿的）。 */
export function toBlocks(seg) {
  const out = [];
  for (const m of seg.matchAll(BLOCK_RE)) {
    /* 只认裸 id（h2 的锚点）：`data-id=` 不能算，所以看前一个字符是不是连字符 */
    const idAttr = (() => { const at = m[0].indexOf('id="'); if (at <= 0 || m[0][at - 1] === "-") return ""; const mm = m[0].slice(at).match(/id="([^"]+)"/); return mm ? mm[1] : ""; })();
    if (m[1] === "ul" || m[1] === "ol") {
      const items = [...m[2].matchAll(LI_RE)].map(x => plainText(x[1])).filter(Boolean);
      for (const t of items) out.push({ tag: "li", text: t });
      if (!items.length) { const t = plainText(m[2]); if (t) out.push({ tag: "li", text: t }); }
      continue;
    }
    if (/<(p|ul|ol|blockquote)\b/.test(m[2])) continue;   // 跳过嵌套块
    out.push({ tag: m[1], text: plainText(m[2]), ...(idAttr ? { id: idAttr } : {}) });
  }
  return out;
}

/** 页尾「延伸阅读 / 关于作者」之后的全部内容都要丢 —— 它是以 <aside> 为界，
 *  但两个语言块都各带一份，且外层没有闭合标记可依赖，所以按首个标签文本切。 */
export function trimTail(blocks) {
  const cut = blocks.findIndex(b => /^(延伸阅读|Further reading|关于作者|About the author)$/.test(b.text));
  return cut >= 0 ? blocks.slice(0, cut) : blocks;
}

export const isHead = b => b.tag === "h2" || b.tag === "h3" || b.tag === "h4";

/* ---------------- 2. 切节 ---------------- */

/** 以小标题为界切节。每节 = { head, level, blocks }。 */
export function toSections(blocks) {
  const secs = [];
  let cur = { head: "", headId: "", level: 0, blocks: [] };
  for (const b of blocks) {
    if (isHead(b)) { secs.push(cur); cur = { head: b.text, headId: b.id || "", level: +b.tag[1], blocks: [] }; }
    else cur.blocks.push(b);
  }
  secs.push(cur);
  return secs;
}

/* ---------------- 3. 内容锚点对齐（节内块数不等时才用） ---------------- */

const LATIN = /[A-Za-z][A-Za-z0-9.+#/-]{0,}/g;
const NUM = /\d+(?:[.,]\d+)?/g;

/** 中文块里夹的拉丁词（AI / GitHub / Karpathy）与英文块里的英文词求交 —— 专名是最强的锚。
 *  长度 1 的词（I / a）噪声太大，丢掉。 */
function anchors(zhText, enText) {
  const zhSet = new Set((String(zhText).match(LATIN) || []).map(s => s.toLowerCase()).filter(s => s.length > 1));
  const enSet = new Set((String(enText).match(LATIN) || []).map(s => s.toLowerCase()).filter(s => s.length > 1));
  let shared = 0;
  for (const t of zhSet) if (enSet.has(t)) shared++;
  const zhNum = new Set(String(zhText).match(NUM) || []);
  const enNum = new Set(String(enText).match(NUM) || []);
  let nShared = 0;
  for (const t of zhNum) if (enNum.has(t)) nShared++;
  return { shared, nShared };
}

/** 结构类别。列表项与段落在源站两种语言之间会互换，归为同一大类前先细分。 */
export function kind(b) {
  const t = b.tag;
  if (t === "h2" || t === "h3" || t === "h4") return "head";
  if (t === "hr") return "rule";
  if (t === "li") return "item";
  if (t === "blockquote") return "quote";
  return "para";
}

/** 一组块对一组块的匹配分（组内文本按顺序拼接后评分）。
 *  导出是给 `_offbook-inspect.mjs` / 排错探针用：对齐错了要能看见**分数**怎么算出来的，
 *  不然只能靠猜（2026-09-20 那次级联错配就是猜了两轮才发现问题不在对齐器而在打分口径）。 */
/* ★★ 打分口径（2026-09-20 重写）—— 「最小改动是主目标，内容证据只能用来为改动买单」
 *
 * 旧口径：长度比落在 0.18—0.55 → **+1.2**，合并一块 −0.45，留空 −1.1。
 * 问题在于「长度比」是个**与内容无关**的信号：只要字数碰巧像就发分。
 * 实测 a05 序章节，中文块 `一个孩子被生产成什么的过程…开始。` 对 **23 个**不同的英文块
 * （e2/e4/e5/e8/e11/e12/e18/e20/e23/e26/e27/e31/…）全都拿到 +1.2 —— 它根本分辨不了谁是谁。
 * 无内容信号的两种后果：
 *   ① DP 可以「免费」滑动对齐，只要总长度比还算像 —— 于是级联错配（见下）。
 *   ② 合并只罚 0.45，比随便配一对了事的收益还小 → DP 偏爱合并，把整节糊成几大块。
 *
 * 新口径：只留**内容证据**（拉丁专名 / 数字，`anchors`）做加分，长度比降级为**否决项**。
 *   groupScore = 锚点分 − 1.0×(多并的块数)
 *   留空(gap)   = −1.0
 * 于是「块数相等」的节里，1:1 顺序配对的代价是 0（唯一零代价路径），DP 必然收敛到位置配对；
 * 要合并、要留空都必须拿锚点分去买（2 个共享专名 = +3.2 > 一次合并的 1.0，付得起）。
 *
 * 为什么必须是这个方向：两种语言是**同一份文档的同一顺序**，位置本身就是强先验。
 * 正确对齐几乎总是「沿对角线」，所以主目标应该是**离对角线尽量近**（合并/留空最少），
 * 而不是「单对相似度之和最大」—— 后者对无信号的中文纯叙述段毫无约束力。
 *
 * 实测（a05 序章节 zh 50 / en 50，全篇无换序）：
 *   旧口径选出的错路  合并 4 次 → 0.75+3.95+3.4 = 8.10
 *   正路              合并 0 次 → 7.80   ← 旧口径判它更差
 *   新口径：错路 4 次合并 = −4.0 + 锚点；正路 0 次合并 = 0 + 锚点 → 正路胜出。
 */
const MERGE_COST = 1.0;    // 每多并一块的代价（1:k 的 k-1，k:1 的 k-1，合计）
export const GAP_COST = -1.0;   // 留空一块的代价（与 alignBlocks 的 gap 保持同一常量）

export function groupScore(zs, es) {
  const zHead = zs.some(b => kind(b) === "head");
  const eHead = es.some(b => kind(b) === "head");
  if (zHead !== eHead) return -6;                 // 标题只能对标题
  const zt = zs.map(b => b.text).join(" ");
  const et = es.map(b => b.text).join(" ");
  if (!zt || !et) return -6;
  let s = zHead ? 2.0 : 0;
  const { shared, nShared } = anchors(zt, et);
  s += Math.min(shared, 5) * 1.6;                 // 拉丁专名：最强的锚
  s += Math.min(nShared, 3) * 1.6;                // 数字（1913 / 380% / 12.5）：次强
  /* 长度比**只罚不奖**：两个语言的字数比跟体裁有关，跨 5 篇实测中位约 0.35，
   * 但专名密集的短句可以到 0.9 以上（`公元 1913 年，密歇根州，Highland Park。` 26 字
   * ↔ `Highland Park, Michigan. 1913.` 29 字 = 0.897）。窗口开太窄会罚正确的配对，
   * 所以只拦真正荒谬的（差一个数量级）：<0.08 或 >1.5 才否决。 */
  const r = zt.length / Math.max(1, et.length);
  if (r < 0.08 || r > 1.5) s -= 1.0;
  s -= MERGE_COST * (zs.length - 1 + es.length - 1);   // 合并代价：能不合并就不合并
  return s;
}

/**
 * 节内块序列对齐 —— **允许 k:1 / 1:k 合并**，这是本库的关键。
 *
 * ★ 为什么必须支持合并：源站两种语言对同一份内容的**排版不一样**。实测 a03 节[5]：
 *   中文是「引导句 + 3 个 <li>」四块，英文把同样四层意思**写成一个整段**，内部顺序一致。
 *   1:1 的 DP（只允许「配不上就留空」）在这里必然产出 4 个假孤儿，而且会把
 *   `AI 的通用能力让你…` 这一类正确块错配到相邻段落上 —— 这是**错误对齐**，不是缺内容。
 *   允许合并之后，`#3+#4+#5+#6 ↔ en#5` 这种分组是 DP 自己选出来的最优解（锚点 + 长度比都指向它）。
 *
 * 代价：合并组内**没有**「中文哪一段对应英文哪一句」的信息，只能靠后面的占比切分。
 *   这是诚实的损失，不是隐瞒 —— 官方译文本身就没给到句级。
 *
 * @returns {{groups:Array<{z:number[],e:number[]}>, score:number, orphanZh:number[], orphanEn:number[]}}
 */
export function alignBlocks(zb, eb, { gap = GAP_COST, maxZ = 6, maxE = 3 } = {}) {
  const n = zb.length, m = eb.length;
  const NEG = -1e9;
  const dp = Array.from({ length: n + 1 }, () => new Float64Array(m + 1).fill(NEG));
  /* from: 记录回溯动作 {dz,de} */
  const from = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(null));
  dp[0][0] = 0;
  for (let i = 0; i <= n; i++) {
    for (let j = 0; j <= m; j++) {
      if (dp[i][j] === NEG) continue;
      const cur = dp[i][j];
      /* 1:1 */
      if (i < n && j < m) {
        const v = cur + groupScore([zb[i]], [eb[j]]);
        if (v > dp[i + 1][j + 1]) { dp[i + 1][j + 1] = v; from[i + 1][j + 1] = { dz: 1, de: 1 }; }
      }
      /* k:1 —— 多个 zh 块合成一段英文 */
      for (let k = 2; k <= maxZ && i + k <= n; k++) {
        if (j >= m) break;
        const v = cur + groupScore(zb.slice(i, i + k), [eb[j]]);
        if (v > dp[i + k][j + 1]) { dp[i + k][j + 1] = v; from[i + k][j + 1] = { dz: k, de: 1 }; }
      }
      /* 1:k —— 一段中文对应多个英文块 */
      for (let k = 2; k <= maxE && j + k <= m; k++) {
        if (i >= n) break;
        const v = cur + groupScore([zb[i]], eb.slice(j, j + k));
        if (v > dp[i + 1][j + k]) { dp[i + 1][j + k] = v; from[i + 1][j + k] = { dz: 1, de: k }; }
      }
      /* 留空（真实缺失，交给上层报错/复核） */
      if (i < n && cur + gap > dp[i + 1][j]) { dp[i + 1][j] = cur + gap; from[i + 1][j] = { dz: 1, de: 0 }; }
      if (j < m && cur + gap > dp[i][j + 1]) { dp[i][j + 1] = cur + gap; from[i][j + 1] = { dz: 0, de: 1 }; }
    }
  }
  const groups = [];
  const orphanZh = [], orphanEn = [];
  let i = n, j = m;
  while (i > 0 || j > 0) {
    const f = from[i][j];
    if (!f) { if (i > 0) { orphanZh.push(--i); } else { orphanEn.push(--j); } continue; }
    const zs = Array.from({ length: f.dz }, (_, k) => i - f.dz + k);
    const es = Array.from({ length: f.de }, (_, k) => j - f.de + k);
    if (f.dz === 0) orphanEn.push(...es.reverse());
    else if (f.de === 0) orphanZh.push(...zs.reverse());
    else groups.push({ z: zs, e: es });
    i -= f.dz; j -= f.de;
  }
  groups.reverse(); orphanZh.reverse(); orphanEn.reverse();
  return { groups, score: dp[n][m], orphanZh, orphanEn };
}

/* ---------------- 4. 整篇解析 ---------------- */

const pick = (h, re) => { const m = h.match(re); return m ? decodeEntities(m[1]).trim() : ""; };

/**
 * 解析一篇 essay。
 * @returns {{slug,titleZh,titleEn,date,url,about,author,bio,sections:Array}}
 *   sections[i] = { headZh, headEn, level, blocks:[{tag, zh, en, zhOnly?, enOnly?}] }
 */
export function parseEssay(html, { slug = "", url = "" } = {}) {
  const zhAt = html.indexOf('<div class="prose i18n-zh"');
  const enAt = html.indexOf('<div class="prose i18n-en"');
  if (zhAt < 0 || enAt < 0) throw new Error("找不到 prose 块");
  if (enAt < zhAt) throw new Error("prose 块顺序异常（en 在 zh 之前）");
  const relAt = html.indexOf('class="essay__related"');
  const zhSeg = html.slice(zhAt, enAt);
  const enSeg = html.slice(enAt, relAt > enAt ? relAt : html.length);

  const Z = toSections(trimTail(toBlocks(zhSeg)));
  /* en 块开头有一句 <blockquote>Complete English translation.</blockquote>，是模板说明不是正文 */
  const E = toSections(trimTail(toBlocks(enSeg)
    .filter(b => !(b.tag === "blockquote" && /Complete English/i.test(b.text)))));

  /* ★ 顺序要紧：「英文块为空」必须在「节数不等」之前判。
   *   官网对尚未发布英译的那一期会输出一个**空的 `<div class="prose i18n-en">`**，
   *   此时 en 侧只剩 1 个空节，若先判节数就会报成「节数不等 zh 52 / en 1」——
   *   看起来像解析 bug，实际是「这一期还没英文」。判据要说人话。 */
  if (!E.some(s => s.blocks.length)) throw new Error("英文块为空（该期官网尚未发布英译）");
  if (Z.length !== E.length) throw new Error(`节数不等：zh ${Z.length} / en ${E.length}`);

  const sections = [];
  const report = { mismatched: [], merged: 0, orphanZh: 0, orphanEn: 0, attached: [] };
  for (let i = 0; i < Z.length; i++) {
    const zs = Z[i], es = E[i];
    const zb = zs.blocks, eb = es.blocks;
    const blocks = [];

    /* ★ 两条路都跑 DP，不做「数量相等就位置配对」的捷径。
     * 理由：「相等」只是必要不充分 —— 两侧各多一块正好抵消时，位置配对会整体错配一格，
     * 而这正是本库开头注释警告的那种静默污染。DP 对干净文本会自己收敛到 1:1 位置配对
     * （实测 a01/a04/a05 三篇 1,000+ 段全篇 0 合并 0 孤儿），所以没有理由走捷径。 */
    const { groups, orphanZh, orphanEn } = alignBlocks(zb, eb);

    /* 孤儿块挂到最近的、有归属的那个块上 —— 源站的孤儿几乎都是「被对面合并掉的同伴」，
     * 例如中文「引导句 + 3 个 <li>」对上英文一个整段时，DP 把 4 块并成一组就不留孤儿了；
     * 真正只剩孤儿的情况是「一侧多写了一句过渡语」（`这一章的任务到这里结束。`）。
     * 挂靠而不是丢弃 —— 丢一句就是正文完整性红线。 */
    const owner = new Array(zb.length).fill(-1);
    groups.forEach((g, gi) => g.z.forEach(zi => { owner[zi] = gi; }));
    const attach = idx => {
      for (let k = idx + 1; k < owner.length; k++) if (owner[k] >= 0) return owner[k];
      for (let k = idx - 1; k >= 0; k--) if (owner[k] >= 0) return owner[k];
      return -1;
    };
    const sec = { section: i, headZh: zs.head, headEn: es.head, zh: zb.length, en: eb.length, merged: 0, orphanZh: 0, orphanEn: 0 };
    const extraZh = new Map();   // gi -> [zhIdx...]
    const extraEn = new Map();
    for (const zi of orphanZh) {
      const gi = attach(zi);
      if (gi < 0) continue;
      if (!extraZh.has(gi)) extraZh.set(gi, []);
      extraZh.get(gi).push(zi);
      sec.orphanZh++;
      report.attached.push({ side: "zh", section: i, head: zs.head, text: zb[zi].text });
    }
    const eOwner = new Array(eb.length).fill(-1);
    groups.forEach((g, gi) => g.e.forEach(ei => { eOwner[ei] = gi; }));
    const attachE = idx => {
      for (let k = idx + 1; k < eOwner.length; k++) if (eOwner[k] >= 0) return eOwner[k];
      for (let k = idx - 1; k >= 0; k--) if (eOwner[k] >= 0) return eOwner[k];
      return -1;
    };
    for (const ei of orphanEn) {
      const gi = attachE(ei);
      if (gi < 0) continue;
      if (!extraEn.has(gi)) extraEn.set(gi, []);
      extraEn.get(gi).push(ei);
      sec.orphanEn++;
      report.attached.push({ side: "en", section: i, head: zs.head, text: eb[ei].text });
    }

    for (let gi = 0; gi < groups.length; gi++) {
      const g = groups[gi];
      const zIdx = [...g.z, ...(extraZh.get(gi) || [])].sort((a, b) => a - b);
      const eIdx = [...g.e, ...(extraEn.get(gi) || [])].sort((a, b) => a - b);
      const tag = zb[zIdx[0]]?.tag || eb[eIdx[0]]?.tag || "p";
      const zh = zIdx.map(k => zb[k].text).join(" ");
      const en = eIdx.map(k => eb[k].text).join(" ");
      const merged = zIdx.length !== 1 || eIdx.length !== 1;
      if (merged) sec.merged++;
      blocks.push({ tag, zh, en, ...(merged ? { mergedZ: zIdx.length, mergedE: eIdx.length } : {}) });
    }

    report.merged += sec.merged;
    report.orphanZh += sec.orphanZh;
    report.orphanEn += sec.orphanEn;
    if (zb.length !== eb.length || sec.orphanZh || sec.orphanEn) report.mismatched.push(sec);
    sections.push({ headZh: zs.head, headEn: es.head, headId: es.headId || zs.headId, level: zs.level, blocks });
  }

  /* 标题：hero 里两个 <h1 class="hero-split__title i18n-zh / i18n-en"> 各一个语言。
   * ★ 别用 og:title —— 它只给中文（`ISSUE 01 AI 时代的真正分化｜…`），英文标题只在这个 h1 里。
   * 也别用 `hero-split__title-en` 那个 <p>：它的 i18n 类名和内容**是反的**（i18n-zh 里放英文），
   * 按类名取会取到中文。 */
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map(m => ({ cls: m[0], text: plainText(m[1]) }));
  const h1 = key => (h1s.find(x => x.cls.includes(`i18n-${key}`)) || {}).text || "";
  const rawTitle = pick(html, /<title>([^<]*)<\/title>/);
  const titleZh = h1("zh") || (rawTitle.match(/ISSUE\s+\d+\s*([^｜|]+)/) || [, ""])[1].trim();

  /* 封面配色：源站没有位图封面（`og:image` 是通用的 /og/default.png，正文一个 <img> 都没有），
   * 它的「封面」是 hero 区那块 WebGL 立体书 `<canvas class="book-hero__canvas" data-cover-front="#C8372D" …>`。
   * 官方把这本书的**正封 / 书脊 / 封底 / 墨色**四色直接写在属性里 —— 那就是这一期的本色。
   * 取回来做渐变，比手挑一个「大概好看」的颜色忠实（手挑版曾按体裁猜色调，跟原书无关）。 */
  const pal = k => (html.match(new RegExp(`data-${k}="(#[0-9A-Fa-f]{3,8})"`)) || [, ""])[1].toUpperCase();
  const palette = { front: pal("cover-front"), spine: pal("cover-spine"), back: pal("cover-back"), ink: pal("ink") };

  return {
    slug, url,
    issue: (rawTitle.match(/ISSUE\s+0*(\d+)/i) || [, ""])[1],
    titleZh,
    titleEn: h1("en"),
    palette,
    title: rawTitle.replace(/\s*—\s*Offbook\s*$/, ""),
    descZh: pick(html, /<meta name="description" content="([^"]*)"/),
    date: pick(html, /<meta property="article:published_time" content="([^"]*)"/) || "",
    report,
    sections,
  };
}

/* ---------------- 5. 无损英文切句 ---------------- */

/* ★ 这里**不能**复用 lib-text.mjs 的 splitSentences —— 那把尺子的职责是「挑出值得送翻译的句子」，
 * 带 SENT_MIN=12 / SENT_FLOOR=40 两道丢弃闸，会把 `先看四个现象。` 这类短句整条吞掉。
 * 对机翻输入合理，对「源站权威正文」就是静默丢内容。所以这里是无损版：只切，不丢。 */
/* ★ 三条都不能漏，漏了就是**假句**（把一句拆成两句 → 中文按占比切也跟着错）：
 *   ① 罗马数字：`III. Rabbit holes` 不保护会被切成 `III.` + `Rabbit holes`，实测制造 12 处假句。
 *   ② 常见缩写：Mr./Dr./etc./U.S. 这批。
 *   ③ 首字母缩写：`Brian J. Robertson` 不保护会被切成 `Brian J.` + `Robertson.`。
 *      实测 a03 附录书单 `Holacracy: … , Brian J. Robertson. Materials on Haier's RenDanHeYi
 *      model.` 一句被拆成三句，中文按 3 份的占比切 → 切出 `The New Management System for a
 *      Rapidly Changin` / `g World》Brian J. Robertson` 这种**断词**译文（qc F4 报「译文无中文」）。
 *
 * ★★ ③ 必须**大小写敏感**，所以拆成两条正则 —— 这是 2026-09-20 踩的第二个坑：
 *   混在一条里带 `i` 时 `[A-Z]` / `[a-z]` 都退化成「任意字母」，`(?<=[A-Z][a-z]{1,15}\s)`
 *   实际含义从「前面是个大写开头的名字」变成「前面是个词」，于是：
 *     `…Karpathy has been repeating on X.`（X = 推特）、`…directions A, B, and C.`、
 *     `if I need B, I buy B.` 全被当成缩写，**把两个句子的句末句点连起来** → 假合并。
 *   JS 的字符类不能内联关掉 `i`（修饰符组 `(?-i:…)` 还没进稳定版），只能拆。
 *   收紧后判据：`Brian J.` / `Keith E.` / `Alfred D.` / `James W.` / `Michael R.` → 保护 ✓
 *                `on X.` / `and C.` / `buy B.` / `doing Y.` → 不保护 ✓（小写词在前，本来就该断开）
 *   顺带不用再写 `(?<![.!?…]\s)`：句末的 `Brian. This…` 里 `.` 不是 `\s`，第二个词位匹配不上。 */
const ABBR_CI = /\b(?:X{0,3}(?:IX|IV|V?I{1,3}))\.(?=\s|$)|(?:Mr|Mrs|Ms|Dr|Drs|Prof|Sr|Jr|St|vs|etc|Co|Inc|Ltd|Fig|Vol|No|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sept|Oct|Nov|Dec|Mon|Tue|Wed|Thu|Fri|Sat|Sun|U\.S|U\.K|a\.m|p\.m|e\.g|i\.e|Ch|Sec|Pt|Dept|Univ)\./gi;
const ABBR_CS = /(?<=[A-Z][a-z]{1,15}\s)[A-Z]\.(?=\s+[A-Z][a-z])/g;

/** 无损切句。**罗马数字必须进缩写表** —— 否则 `III. Rabbit holes` 会被切成 `III.` + `Rabbit holes`
 *  两句，实测制造 12 处假句（a01 792 vs 780）。 */
export function splitSentencesLossless(text) {
  const guarded = String(text || "")
    .replace(ABBR_CI, m => m.replace(/\./g, "·"))
    .replace(ABBR_CS, m => m.replace(/\./g, "·"));
  return guarded.split(/(?<=[.!?…])\s+/).map(s => s.trim()).filter(Boolean).map(s => s.replace(/·/g, "."));
}

/* ---------------- 6. 中文按占比切 + 切点吸附标点 ---------------- */

/* 标点优先级：句末 > 分号 > 冒号 > 逗号 > 顿号 > 括号。
 * 实测（2026-09-20，5 篇）：97—99% 的切点落在这六类上，其中 70—92% 落在硬合格（前三类）。 */
const TIERS = [["。", "！", "？", "…"], ["；", ";"], ["：", ":"], ["，", ","], ["、"], ["”", "）", ")"]];
const CJK_PUNCT = /[。！？…；：，、､]/;

function bestCut(zh, target, lo, hi) {
  for (const tier of TIERS) {
    for (let d = 0; d <= Math.max(target - lo, hi - target); d++) {
      for (const p of d === 0 ? [target] : [target - d, target + d]) {
        if (p <= lo || p >= hi) continue;
        if (tier.includes(zh[p - 1])) return p;
      }
    }
  }
  return -1;
}

/**
 * 标点都找不到时的兜底：找一个**不切进词里**的位置。
 * 为什么需要：bestCut 找不到标点时，旧代码回退到 raw target —— 那个位置可能正落在拉丁词中间，
 * 于是产出 `Highland Par` / `k。` 这种断词译文（2026-09-20 实测 a05 序章，见 groupScore 顶注）。
 * 顺序：先找空白邻接（最干净），再退到「切点两侧不都是词字符」。都没有就返回 −1 让调用方整段退化。
 * @returns {number} 切点下标，−1 表示切不动
 */
const WORD_CHAR = /[A-Za-z0-9'’\-]/;
function wordSafeCut(zh, target, lo, hi) {
  const span = Math.max(target - lo, hi - target);
  for (let pass = 0; pass < 2; pass++) {
    for (let d = 0; d <= span; d++) {
      for (const p of d === 0 ? [target] : [target - d, target + d]) {
        if (p <= lo || p >= hi) continue;
        const a = zh[p - 1], b = zh[p];
        if (pass === 0) { if (a !== " " && b !== " ") continue; }
        else if (WORD_CHAR.test(a) && WORD_CHAR.test(b)) continue;
        return p;
      }
    }
  }
  return -1;
}

/**
 * 把一段中文按 weights 的占比切成等长份数，切点吸附到最近的标点。
 * ★ 不变量：返回值 join("") 与输入**逐字符相同**（只 trim 首尾）。调用方必须断言这一点。
 * ★ 返回值可能是 **null**：切不动（标点和词边界都找不到）时拒绝裁剪，
 *   让调用方整段退化成一句 `{en, cn}`。宁可用段落级配对，也不产出断词译文。
 * @param {string} zh 中文原文（一段）
 * @param {number[]} weights 英文各句的长度，用来定切点比例
 * @returns {string[]|null}
 */
export function cutChinese(zh, weights) {
  const src = String(zh || "");
  const n = weights.length;
  if (n <= 1) return [src];
  if (src.length < n) return [src];                 // 太短没法切，整段给第一份
  const total = weights.reduce((a, b) => a + b, 0) || 1;
  const cuts = [0];
  let acc = 0;
  for (let i = 0; i < n - 1; i++) {
    acc += weights[i];
    const target = Math.round((acc / total) * src.length);
    const remain = n - 1 - i;
    const lo = cuts[cuts.length - 1] + 1;
    const hi = Math.min(src.length, src.length - remain);
    if (lo >= hi) { cuts.push(lo); continue; }
    const r = Math.max(3, Math.round((src.length / n) * 0.7));
    let c = bestCut(src, target, Math.max(lo, target - r), Math.min(hi, target + r + 1));
    if (c < 0) c = bestCut(src, target, lo, hi);
    if (c < 0) c = wordSafeCut(src, target, lo, hi);
    if (c < 0) return null;                          // 切不动 —— 交回调用方整段退化
    cuts.push(c);
  }
  cuts.push(src.length);
  const raw = [];
  for (let i = 0; i < cuts.length - 1; i++) raw.push(src.slice(cuts[i], cuts[i + 1]));
  /* 合并空片（理论不可达，防御性） */
  const out = [];
  for (const f of raw) { if (!f.trim() && out.length) out[out.length - 1] += f; else out.push(f); }
  return out;
}

/** 拼回校验用：去空白后比较 */
export const squash = s => String(s || "").replace(/\s+/g, "");

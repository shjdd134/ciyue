/* 词阅 WordLens —— 正文配图排布的统一口径
 *
 * 为什么要有这个文件（2026-09-20）：
 *   同一天里出现了两个「配图」问题，一个数据错、一个排布差：
 *     · gr-how-to-fix-your-entire-life-in-1-day：4 张内嵌图里有 2 张是莫妮卡·贝鲁奇的
 *       时尚照，与 Dan Koe 那篇自我提升长文毫无关系；
 *     · people-eva-green-tim-burton / people-rachel-weisz-archive：图本身都是本人，
 *       但一张接一张堆在一起（Eva 导语后连放 6 张、Rachel 全篇 9 组成对）。
 *   第二个问题当时**全套回归一声不响** —— qc.mjs 的 F3 只查「封面存在 / 文件存在 /
 *   人物 photoCount 一致」，没有任何关于「图挨着图」的判据。
 *
 * 这个文件解决的是一把尺子的问题：
 *   判红的口径（qc.mjs）和修复的口径（people.mjs 生成器 / _repair-figures.mjs 维护工具）
 *   必须是**同一个函数**。否则阈值调了闸门、没调修复器，就会出现「修完仍然判红」
 *   或者「闸门放行、生成器还在堆」。项目里已经有过一次同类教训：段距那件事
 *   `editorial.css` 与 `styles.css` 各写一份 margin，注释写 18、浏览器算 30，
 *   而守卫只读其中一份 —— 全绿但观感早就错了。
 *
 * 阈值怎么定的 —— 在**全部 14 篇**上量过，不是拍的（量法见 _repair-figures.mjs 报告模式）：
 *
 *   口径                              命中
 *   ────────────────────────────────  ──────────────────────────────────────────
 *   紧缝（两图间文字段 < 2）≥ 3        Rachel(11/18 处) + Eva(5/6 处)   ← 精确
 *   最长连放 ≥ 3                       Eva(6)                            ← 精确
 *   图/文 比 > 0.2                     Rachel .226 + **Anne .211** + Eva ← 误伤 Anne
 *   最长连放 ≥ 2                       Rachel + **Megan(1 处)** + Eva    ← 误伤 Megan
 *
 * 「图/文比」这种口径**不能用**：Anne Hathaway 那篇 8 张图铺在 38 个文字段里
 * （比 0.211）是正常的，用户也判它正常；而 Rachel 0.226 只是比它高一点点，
 * 拿比例当闸门等于用一个区分不开两篇的数当闸门。「紧缝 ≥ 3」是唯一同时抓住
 * Eva + Rachel、又完全碰不到 Megan（1 处）和 Anne（0 处）的口径。
 *
 * ⚠️ 这个尺子**抓不到「图配错了」**。贝鲁奇那两张在结构上与正确的那两张完全同形
 * （都是 `{img}`、都没有图注），任何结构判据都区分不出来。那一类只能靠人眼或
 * 视觉模型。这里能保证的只有「图不会堆在一起」。
 */

/* 两个阈值一起构成「堆图」判据。改动任何一个都要同步 qc.mjs 的断言文字与
 * _repair-figures.mjs 的实测表，否则就变成「闸门和修复器各说各话」。 */
export const TIGHT_GAP_MIN = 2;   /* 相邻两张图之间至少要有几个文字段 */
export const MAX_TIGHT_GAPS = 3;  /* 全篇紧缝处数达到这个值即判为堆图 */
export const MAX_RUN = 3;         /* 连续两张以上图之间一个字都没有，达到这个数即判为堆图 */

/** 段落是否为图片块。全项目判定图片段落的唯一写法（不要在外面另写 `p.img` 判空）。 */
export const isFigurePara = p => !!(p && p.img);

/**
 * 配图排布统计。返回的字段就是闸门与修复器共用的那几个数。
 * @param {Array} paras 文章的 paras 数组（图片块与文字块混排）
 */
export function figureRunStats(paras) {
  const list = Array.isArray(paras) ? paras : [];
  const at = [];
  for (let i = 0; i < list.length; i++) if (isFigurePara(list[i])) at.push(i);

  /* 相邻两图之间的文字段数。`at` 是严格递增的，所以这个差恒 >= 0。 */
  const gaps = [];
  for (let k = 1; k < at.length; k++) gaps.push(at[k] - at[k - 1] - 1);

  let maxRun = 0, cur = 0;
  for (const p of list) {
    if (isFigurePara(p)) { cur++; if (cur > maxRun) maxRun = cur; }
    else cur = 0;
  }

  return {
    imgN: at.length,
    textN: list.length - at.length,
    at,
    gaps,
    maxRun,
    tightGaps: gaps.filter(g => g < TIGHT_GAP_MIN).length,
  };
}

/**
 * 堆图判据。返回空数组 = 合格。
 * 判的是**意图**（「图和图挤在一起、中间没有阅读缓冲」），不是某个具体数字 ——
 * 2026-09-19 那次教训就是断言钉死了 `opacity: 0` 这个实现细节，把 bug 一起锁死了。
 */
export function stackingIssues(paras) {
  const s = figureRunStats(paras);
  const issues = [];
  if (s.maxRun >= MAX_RUN) {
    issues.push(`连续 ${s.maxRun} 张图之间没有任何文字`);
  }
  if (s.tightGaps >= MAX_TIGHT_GAPS) {
    issues.push(`有 ${s.tightGaps}/${s.gaps.length} 处相邻两图之间不足 ${TIGHT_GAP_MIN} 个文字段`);
  }
  return issues;
}

/**
 * 正文里与封面同源的那张图的下标（没有则 -1）。
 *
 * 为什么单列一条：`app.js` 阅读页已经把 `coverImg` 渲染成页首大图（`.read-cover`），
 * 正文里再来一张同一个文件就是**同一张照片一页出现两遍**。
 * `ingest.mjs --repair-images` 早就有这个过滤（`sameAsCover`，注释写着「同一张图在
 * 正文里再出现一次是噪音」），而 `people.mjs` 走的是 `lib-people.mjs` 的
 * `images.find(x => imageKey(x.url) === key)` —— `images[0]` 就是 og:image，
 * 正文里再出现同一个 URL 时照样匹配得上，于是封面被当成正文图又插了一次。
 * 2026-09-20 实测三篇中招：eva-green / rachel-weisz / lea-seydoux。
 *
 * 只比 `img` 字段（库里按文件名比对），不比 sourceUrl —— 正文图重建之后
 * sourceUrl 可能指向另一个 CDN 尺寸，文件名才是稳定的那把尺子。
 */
export function coverDuplicateIndex(paras, coverImg) {
  if (!coverImg) return -1;
  const list = Array.isArray(paras) ? paras : [];
  return list.findIndex(p => isFigurePara(p) && p.img === coverImg);
}

/**
 * 把堆在一起的插图摊开。
 *
 * 规则：**只在整篇判为「堆图」时动手**（最小干预 —— Anne / Zoey / Megan 那几篇
 * 本来排得就散，一律不动），然后按「全篇均分」重新排：N 个段落里 I 张图，
 * 第 k 张图落在第 `floor((k+0.5)·N/I)` 个位置。这样
 *   · 图与图的先后顺序不变（正文的叙事顺序不会被改）
 *   · 文字段顺序不变（一个字的正文都不动，只换位置）
 *   · 元素总数不变（下面有守恒断言兜底）
 *   · 幂等：摊开之后 maxRun=1、紧缝清零，再跑一次判据已合格 → 原样返回
 *
 * @returns 新的 paras 数组；不合格、摊不开或任何守恒校验没过时**原样返回入参**
 */
export function spreadStackedFigures(paras) {
  const list = Array.isArray(paras) ? paras : [];
  const s = figureRunStats(list);

  if (!stackingIssues(list).length) return list;   // 本来就没堆，不碰
  if (!s.imgN) return list;

  /* 摊开的前提是「文字够多、能把图隔开」。10 个文字段最多能隔开 11 张图；
   * 图比这还多就无解 —— 那不是排布问题，是该减图，交给人工，别在这里假装修好。 */
  if (s.imgN > s.textN + 1) return list;

  const N = list.length;
  const slots = [];
  for (let k = 0; k < s.imgN; k++) slots.push(Math.floor((k + 0.5) * N / s.imgN));
  /* 槽位必须严格递增且互不相同：一旦 I 接近 N（图密到隔不开），floor 会算出重复槽位，
   * 用 Set 去重就会**静默丢图**。宁可不动，也不能丢。 */
  if (new Set(slots).size !== s.imgN) return list;
  for (let k = 1; k < slots.length; k++) if (slots[k] <= slots[k - 1]) return list;

  const imgs = list.filter(isFigurePara);
  const texts = list.filter(p => !isFigurePara(p));
  const out = [];
  let ti = 0, ii = 0;
  for (let i = 0; i < N; i++) {
    if (ii < slots.length && slots[ii] === i) out.push(imgs[ii++]);
    else out.push(texts[ti++]);
  }
  /* 守恒兜底：数量对不上就说明上面的槽位推算有问题，原样返回比交一份少图的数据强。 */
  if (ii !== imgs.length || ti !== texts.length || out.length !== N) return list;
  return out;
}

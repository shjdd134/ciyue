/* 英中对齐：把「英文行/句」单调地配到「中文行/句」上。
 *
 * 为什么需要它（2026-09-17 实测 De Bruyne 篇，官方中文 vs 英文原刊）：
 *   · 英文是**段落粒度**：124 行 / 357 句（平均 2.9 句一行）
 *   · 官方中文是**句子粒度**：118 行 / 289 句（平均 1.0 句一行）
 *   → **按下标直接配对一定会漂**。我先按 <p> 比过 19 vs 118，按 <br> 比过 127 vs 120，
 *     又试过句级 325 vs 325 —— 数字看着巧合相等，逐索引抽查语义全错位（第 40 位已经差了 5 句）。
 *     **同理，行数相等也不能当作对齐依据。**
 *
 * 行级 DP 仅用于候选分组，不能证明语义对应。句级必须传入 reviewedPairs，缺失则拒绝构建。
 * 行级用 DP，代价 = 长度比例偏差 + 句数比例偏差 - 专名/数字锚点命中。
 * 「比例」这条信号之所以有效：同一篇译文里「每英文词对应多少汉字」是稳定的（De Bruyne 篇 Rc=1.471、
 * 每英文句对应 0.81 个中文句），DP 只要让每个英文行的期望值与实际值都贴合，就能把长段落切开。
 */

/** 从文本里抽「跨语言还能保留」的锚点：拉丁词（人名/队名）与数字。
 *  中文译文会保留 Raheem / Genk / Pep / Willian 这些拉丁写法，也会保留阿拉伯数字，
 *  所以它们是中英之间唯一的字面桥梁。停用词必须滤掉，否则 "the/you/want" 会乱配。 */
const STOP = new Set(('the and that was for with you had but his her they from this not are were have what when '
  + 'then just like been would could about there because really things going know think said say one two all way out '
  + 'get got how why who man men day time now new old see tell told want make made take took very off still them him '
  + 'she too its own our dont didnt cant thats im ive also more much some any each other into over than them well')
  .split(' '));
const LAT = /[A-Za-z][A-Za-z'’.\-]{1,}/g;
const CN_NUM = { 一: 1, 二: 2, 两: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9, 十: 10 };

function anchors(text) {
  const toks = new Set(), nums = new Set();
  for (const m of String(text).match(LAT) || []) {
    const w = m.toLowerCase().replace(/[.'’\-]+$/, '');
    if (w.length > 2 && !STOP.has(w)) toks.add(w);
  }
  for (const m of String(text).match(/\b\d{1,4}\b/g) || []) nums.add(m);
  for (const m of String(text).match(/[一二两三四五六七八九十]+/g) || []) {
    if (m.length === 1 && CN_NUM[m]) nums.add(String(CN_NUM[m]));
  }
  return { toks, nums };
}
const overlapCount = (a, b) => { let n = 0; for (const x of a) if (b.has(x)) n++; return n; };

/**
 * 双语同时切块的单调对齐（经典 bitext 对齐的 DP 形式）。
 *
 * 为什么不用「逐行 + 允许空组」（第一版做法，2026-09-17 实测失败）：
 * 那种写法里「一个中文行覆盖两行英文」有两种等价解 —— 判给前一行或后一行，代价函数看不出差别。
 * 实测它稳定地判给**后**一行，于是前一行成了空组，而「空组并进哪一组」没有任何可靠依据：
 *   De Bruyne 篇 E18 该并进**上一**组（它属于 C17 的末句「就我自己而言，也是一样的。」），
 *   E19 该并进**下一**组（它才是 C18 的首句）——
 *   两个空组紧挨着却要往相反方向并。任何「一律往前并」或「一律往后并」的规则都必然错一半。
 * 正解是让两边的边界**同时**由代价决定：每个块 EN 段与 CN 段都非空。
 *
 * 复杂度靠限制块大小（默认两边各最多 6 行）压到 O(N·M·36)，124×118 实测 <0.2s。
 *
 * @returns {Array<{enFrom:number,enTo:number,cnFrom:number,cnTo:number}>} 顺序覆盖两边全部行
 */
export function alignBlocks(src, dst, opts = {}) {
  const MAX = opts.maxBlock ?? 6;
  const wLen = opts.wLen ?? 1.0, wUnits = opts.wUnits ?? 0.9;
  const wTok = opts.wTok ?? 0.45, wNum = opts.wNum ?? 0.8;
  const perExtra = opts.perExtra ?? 0.22;
  const wGloss = opts.wGloss ?? 0.5;    // 词级锚点罚分的上限（每块最多扣这么多）

  const sumW = src.reduce((a, x) => a + x.weight, 0) || 1;
  const sumL = dst.reduce((a, x) => a + x.len, 0) || 1;
  const sumSu = src.reduce((a, x) => a + x.units, 0) || 1;
  const sumDu = dst.reduce((a, x) => a + x.units, 0) || 1;
  const rLen = sumL / sumW, rUnits = sumDu / sumSu;

  const aS = src.map(x => anchors(x.text)), aD = dst.map(x => anchors(x.text));
  const N = src.length, M = dst.length;

  /* 跨语言词级锚点（有 gloss 时才启用）。
   * 为什么需要它：拉丁专名只覆盖人名/队名，段落一长就只剩「长度比例」一条信号，DP 会漂。
   * ECDICT 的词条自带中文释义，于是可以问一个真正跨语言的问题：
   *   这一行英文里的实词，它的中文释义有没有出现在这段中文里？
   * 实测（De Bruyne 篇）：只用长度比例时错位集中在叙述段；加上词级锚点后
   * 有锚点的块基本钉死，剩下的误差都落在「本来就同义反复」或「官方译文换了语序」的地方。
   * 只取每词前 3 个义项、且跳过停用词 —— 否则 "a" 的「加法器」这类专业义会乱命中。 */
  const gloss = opts.gloss || null;
  /* 注意：lemma 必须在下面那个 if 之前定义。第一版把它写在 if 块内部，
   * 但 if 块里就用到了它 —— 声明前使用会直接抛 TDZ 错误（Cannot access 'lemma' before initialization），
   * 而且只在 gloss 打开时才会走到，是个「一开锚点就崩」的隐藏 bug。 */
  const lemma = w => {
    const o = [];
    if (w.endsWith('ies')) o.push(w.slice(0, -3) + 'y');
    if (w.endsWith('es')) o.push(w.slice(0, -2));
    if (w.endsWith('s')) o.push(w.slice(0, -1));
    if (w.endsWith('ed')) o.push(w.slice(0, -2), w.slice(0, -1));
    if (w.endsWith('ing')) o.push(w.slice(0, -3), w.slice(0, -3) + 'e');
    return o;
  };
  const HIT = [];        // HIT[j] = CN 第 j 行命中的英文词集合
  const ENW = [];        // ENW[i] = EN 第 i 行里带释义的实词集合
  if (gloss) {
    for (let j = 0; j < M; j++) {
      const t = dst[j].text, s = new Set();
      for (const w of Object.keys(gloss)) {
        for (const g of gloss[w]) if (t.includes(g)) { s.add(w); break; }
      }
      HIT.push(s);
    }
    for (let i = 0; i < N; i++) {
      const s = new Set();
      for (const m of src[i].text.match(/[A-Za-z][A-Za-z'’-]{2,}/g) || []) {
        const w = m.toLowerCase().replace(/[’]/g, "'").replace(/[^a-z'-]/g, '');
        if (!w) continue;
        if (gloss[w]) { s.add(w); continue; }
        for (const c of lemma(w)) if (gloss[c]) { s.add(c); break; }
      }
      ENW.push(s);
    }
  }
  const inter = (A, B) => { let n = 0; const [x, y] = A.size < B.size ? [A, B] : [B, A]; for (const v of x) if (y.has(v)) n++; return n; };
  /* 预先把「EN 侧长度为 a 的块」和「CN 侧长度为 b 的块」的词集并好，避免在 DP 里反复建集合 */
  const enU = [], cnU = [];
  for (let a = 1; a <= MAX; a++) {
    enU[a] = [];
    for (let i = a; i <= N; i++) { const s = new Set(enU[a][i - 1] || null); if (gloss) for (const v of ENW[i - 1]) s.add(v); enU[a][i] = s; }
    cnU[a] = [];
    for (let j = a; j <= M; j++) { const s = new Set(cnU[a][j - 1] || null); if (gloss) for (const v of HIT[j - 1]) s.add(v); cnU[a][j] = s; }
  }

  const wPre = [0], lPre = [0], uPre = [0], dPre = [0];
  for (let i = 0; i < N; i++) { wPre.push(wPre[i] + src[i].weight); uPre.push(uPre[i] + src[i].units); }
  for (let j = 0; j < M; j++) { lPre.push(lPre[j] + dst[j].len); dPre.push(dPre[j] + dst[j].units); }

  const INF = Number.POSITIVE_INFINITY;
  const dp = Array.from({ length: N + 1 }, () => new Float64Array(M + 1).fill(INF));
  const bk = Array.from({ length: N + 1 }, () => new Int32Array(M + 1).fill(-1));
  dp[0][0] = 0;
  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= M; j++) {
      let best = INF, bestCode = -1;
      for (let a = 1; a <= Math.min(MAX, i); a++) {
        const pi = i - a;
        const ew = wPre[i] - wPre[pi], eu = uPre[i] - uPre[pi];
        const gt = new Set(), gn = new Set();
        for (let t = pi; t < i; t++) { for (const x of aS[t].toks) gt.add(x); for (const x of aS[t].nums) gn.add(x); }
        const enSet = gloss ? enU[a][i] : null;
        for (let b = 1; b <= Math.min(MAX, j); b++) {
          const pj = j - b;
          if (dp[pi][pj] >= INF) continue;
          if (pi === 0 && pj !== 0) continue;
          const cl = lPre[j] - lPre[pj], cu = dPre[j] - dPre[pj];
          const dt = new Set(), dn = new Set();
          for (let t = pj; t < j; t++) { for (const x of aD[t].toks) dt.add(x); for (const x of aD[t].nums) dn.add(x); }
          const expL = rLen * ew, expU = rUnits * eu;
          let bonus = overlapCount(gt, dt) * wTok + overlapCount(gn, dn) * wNum;
          /* 词级锚点必须是**罚分**，不能是加分 —— 这是 2026-09-17 实测踩到的结构性问题：
           * 加分项是「每块累加」的，于是 DP 会疯狂切块来多领几次加分（De Bruyne 篇实测：
           * 打开加分后块数 70 → 118（=退化成逐行 1:1），且 unitsFor 因「英文句多于中文句」
           * 开始把同一句中文重复填给多个英文句，译文出现整段复读）。
           * 改成罚分后 n 越多罚得越多，切块不再有收益；同时「英文实词的中文释义有没有落在
           * 这段中文里」仍然能区分对的块和错的块。 */
          if (gloss && enSet.size) {
            const cs = cnU[b][j];
            /* 两侧都归一化（余弦），否则度量对「中文块长度」单调：
             *   · 只除 enSet.size → 块越大命中的释义越多 → DP 倾向过度吞并（实测 70 → 31 块）；
             *   · 完全不除（加分）→ 块越小累加次数越多 → DP 倾向疯狂切块（实测 70 → 118 块）。
             * 余弦同时压住两个方向，且因为它是**罚分**，n 越大总罚越多，切块不再有收益。 */
            const denom = Math.sqrt(enSet.size * Math.max(1, cs.size));
            bonus -= (1 - inter(enSet, cs) / denom) * wGloss;
          }
          const cost = Math.abs(cl - expL) / Math.max(expL, 1) * wLen
            + Math.abs(cu - expU) / Math.max(expU, 1) * wUnits
            + (a + b - 2) * perExtra - bonus;
          const v = dp[pi][pj] + cost;
          if (v < best) { best = v; bestCode = a * 100 + b; }
        }
      }
      dp[i][j] = best; bk[i][j] = bestCode;
    }
  }
  /* 回溯：bk 里存 a*100+b。若最后一格不可达（正常不该发生，两边都非空），退化为顺序 1:1 兜底。 */
  const out = [];
  let i = N, j = M;
  while (i > 0 && j > 0) {
    const code = bk[i][j];
    if (code < 0) break;
    const a = Math.floor(code / 100), b = code % 100;
    out.push({ enFrom: i - a, enTo: i - 1, cnFrom: j - b, cnTo: j - 1 });
    i -= a; j -= b;
  }
  if (i > 0 || j > 0) return null;   // 有剩余 = 对齐失败，交给调用方退化处理，不要假装成功
  return out.reverse();
}

/** 把一个中文整句按从句拆开（只用于「中文句比英文句少」时把一句摊给多句英文）。
 *  切点只取 ，、；： —— 不取 。！？，否则会把一句话切成两个完整句，语义就断了。 */
export function splitClauses(zh) {
  const out = [];
  for (const part of String(zh).split(/(?<=[，、；：])/)) {
    const s = part.trim();
    if (s) out.push(s);
  }
  return out.length ? out : [String(zh)];
}

/** 不能按长度、逗号或相邻句复用来制造句级译文。单个英文单元可以保留整块中文。 */
export function unitsFor(zhSentences, n) {
  if (n === 0 && zhSentences.length === 0) return [];
  if (n !== 1) throw new Error('多句译文需要已核对的句对，禁止按数量或长度分配');
  return [zhSentences.join('')];
}

export function distributeBlock(enSents, zhText, splitZh, reviewedPairs = null) {
  if (reviewedPairs) {
    if (reviewedPairs.length !== enSents.length || reviewedPairs.some((p, i) =>
      p.en !== enSents[i] || typeof p.cn !== 'string' || !p.cn.trim())) {
      throw new Error('已核对句对与英文不一致，拒绝生成错位译文');
    }
    return reviewedPairs.map(p => ({ ...p }));
  }
  if (enSents.length === 1) return [{ en: enSents[0], cn: zhText }];
  if (!enSents.length && !zhText) return [];
  throw new Error('多句对齐需要逐句核对；不能把中文按字数切开或借用相邻句译文');
}

/** 行内句级分配（对外主入口） */
export function distribute(enSentences, zhSentences) {
  const cn = unitsFor(zhSentences, enSentences.length);
  return enSentences.map((en, i) => ({ en, cn: cn[i] }));
}

/** 块只决定英文段落分组；句级中文必须来自已核对的原文绑定。 */
export function buildParagraphsFromBlocks(enLines, zhLines, blocks, opts = {}) {
  const splitZh = opts.splitZh;
  const out = [];
  let reviewedOffset = 0;
  for (const g of blocks) {
    const enS = [];
    for (let i = g.enFrom; i <= g.enTo; i++) {
      const l = enLines[i];
      for (const s of (l.sentences && l.sentences.length ? l.sentences : [l.en])) enS.push(s);
    }
    const zhText = zhLines.slice(g.cnFrom, g.cnTo + 1).map(l => l.en).join('');
    const reviewed = opts.reviewedPairs ? opts.reviewedPairs.slice(reviewedOffset, reviewedOffset + enS.length) : null;
    const pairs = distributeBlock(enS, zhText, splitZh, reviewed);
    reviewedOffset += enS.length;
    out.push({ sentences: pairs, block: g });
  }
  if (opts.reviewedPairs && reviewedOffset !== opts.reviewedPairs.length) throw new Error("已核对译文有未消费的句子");
  return out;
}

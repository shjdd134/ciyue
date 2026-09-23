/* 词阅 WordLens —— 中文释义/译文的块级与词级匹配判据（唯一实现，别处只准 import）
 *
 * 为什么存在：义项对齐（2026-09-23 阶段 1a/2）需要回答「这句话/这条译文是否在说
 * 词条 def 里的某个义项」。两套口径：
 *
 *   hasCommonChunk / blockRelates —— 块级。def 按 [；;，,、。/\s] 切块后：
 *     · 精确口径 hasCommonChunk：块相等（或剥（…）括注后相等）即命中。
 *       用于「def 里是否已有某义」的判断，宁严勿松——误判「已有」会漏补真缺义。
 *     · 宽松口径 blockRelates：块互为子串（≥2 字）即相关。「与…相配」和「相配」
 *       差个前缀，精确口径咬合不上会把 match 改掉（它的行被 neg-p0p1 case f 钉死）。
 *
 *   senseRelates —— 词级逐义项块包含。用于例句选句的义项相关性判定：def 的任一
 *     义项块（剥词性前缀/「的」尾/「与…」头后 ≥2 字）出现在句子里即相关。
 *
 * 用户契约（2026-09-23）：自用项目，例句只用别人做好的，不生成不改写。
 */

const defChunks = s => String(s).split(/[；;，,、。/\s]+/).filter(Boolean);
const stripParen = c => c.replace(/[（(][^）)]*[)）]/g, "").trim();

/* 精确口径：a（现有 def）与 b（候选块）是否有公共块（剥括注双形态） */
const hasCommonChunk = (a, b) => {
  const A = new Set(defChunks(a));
  const Av = new Set();
  for (const c of A) { Av.add(c); const s = stripParen(c); if (s) Av.add(s); }
  return defChunks(b).some(c => A.has(c) || (stripParen(c) && Av.has(stripParen(c))));
};

/* 宽松口径：b 的任一词块与 a 的任一词块互为子串（≥2 字） */
const blockRelates = (b, a) => {
  for (const c of defChunks(b)) {
    const cs = stripParen(c);
    if (!cs || cs.length < 2) continue;
    for (const d of defChunks(a)) {
      const ds = stripParen(d);
      if (ds && (ds.includes(cs) || cs.includes(ds))) return true;
    }
  }
  return false;
};

/* 词级义项相关：def 的**任一义项块**（剥词性前缀、去「的/地/了/着」尾、去「与…/使…」头）
 * 以 ≥2 字连续形式出现在 text 里即相关。
 * 为什么不是「def 全部二元组命中率 ≥ 阈值」（2026-09-23 踩过）：1a 之后 def 普遍多义，
 * 二元组被稀释——abandon 例译「她怎么能抛弃自己的孩子」与 def 命中 1/15=0.07，按阈值判
 * 无关，实则是教科书级的相关。逐块判定天然抗稀释：一个块命中就够。
 * 「帐目/账户」这类异体字仍是漏报（可接受：漏报只损失加分，不产生错配）。 */
const senseRelates = (text, def) => {
  const t = String(text || "");
  if (!t || !def) return false;
  for (let c of defChunks(def)) {
    c = stripParen(c)
      .replace(/^[a-z]{1,5}\.?(?=[\u4e00-\u9fff])/, "")   // 「n.滥用」→ 滥用
      .replace(/^[与使被将把对为和跟向从按]…?/, "")         // 「与…相配」→ 相配
      .replace(/[的地了着]$/, "")                          // 「韧性的」→ 韧性
      .replace(/\s+/g, "");
    if (c.length >= 2 && t.includes(c)) return true;
  }
  return false;
};

module.exports = { defChunks, stripParen, hasCommonChunk, blockRelates, senseRelates };

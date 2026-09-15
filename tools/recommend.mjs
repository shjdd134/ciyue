/* 词阅 WordLens —— 推荐系统的纯规则层
 *
 * 这里不做网络请求，也不读写项目文件，方便 ingest、质检和单元测试共享同一套口径。
 * qualityScore 越高越适合发布；difficultyBaseScore 越高表示基础难度越高。
 */

export const SCORE_VERSION = "v2";
export const QUALITY_CANDIDATE_THRESHOLD = 65;
export const QUALITY_FORMAL_THRESHOLD = 75;
export const SOURCE_FAILURE_LIMIT = 3;
export const SOURCE_RECOVERY_LIMIT = 3;

/* 「图片多」对明星栏目是**入选条件**，不是加分项（用户 2026-09-14 定）。
 *
 * 为什么必须是硬门槛：加分的量级只有 `Math.min(8, images)`，压不住一篇 0—3 图的名人短讯 ——
 * 它在词数、段落数、时效上的得分足以过 65 分线。实测库里 3 篇明星文章分别是 2 / 3 / 3 张内嵌图，
 * 标题是「Sean Penn 喊话」「《The Family Stone》要拍续集」这类只看名字的娱乐新闻，
 * 正是用户明确要排除的。硬门槛把它们如实挡掉，图片专题才有位置。
 *
 * 为什么只对明星生效：其他栏目（足球 / AI / 成长）的价值在文字，
 * 套同一个门槛会把没有配图的好文章挡在外面。 */
export const STAR_MIN_IMAGES = 6;
export function meetsImageGate(cat, images, min = STAR_MIN_IMAGES) {
  if (cat !== "明星") return true;
  return (Number(images) || 0) >= min;
}

const clamp = (n, min = 0, max = 100) => Math.max(min, Math.min(max, n));

const DEPTH_TITLE = /\b(interview|profile|portrait|analysis|explained|deep dive|investigation|conversation|essay|guide|how to|why)\b/i;
const LOW_VALUE_TITLE = /\b(quiz|odds|betting|watch live|live stream|transfer rumou?rs?|gossip|horoscope|shop|deal|sale|giveaway|sponsored|roundup)\b/i;

const scoreBand = score => score >= QUALITY_FORMAL_THRESHOLD
  ? "formal"
  : score >= QUALITY_CANDIDATE_THRESHOLD ? "candidate" : "reject";

/**
 * 计算可解释的内容质量分。参数全部来自 RSS 与正文抽取结果。
 * 来源层级只占小部分，避免把来源名当成内容质量的替代品。
 */
export function qualityScore({ sourceTier = 1, title = "", desc = "", date = "", words = 0,
  capWords = 0, paragraphs = 0, sentences = 0, cover = false, images = 0 }) {
  const text = `${title} ${desc}`;
  /* 图注词数：经典图集（--classics 入库）的正文往往只有一段百词导语，
   * 真正把「旧照」讲清楚的是图注 —— 它们在阅读页渲染成 <figcaption>，是真实可读内容。
   * 只按正文词数打分，芭芭拉·史翠珊那篇（92 词正文 + 1000+ 词图注、16 张老照片）
   * 会因「words < 120 → -12」「段落 < 3 → -8」被判 54 分拒收 —— 用新闻文章的尺子量图集。
   * 调用方不传 capWords 时（RSS 新闻路径）行为完全不变。 */
  const readWords = words + (Number(capWords) || 0);
  let score = 50;
  score += clamp(Number(sourceTier) || 1, 1, 3) * 4;
  if (DEPTH_TITLE.test(text)) score += 9;
  if (LOW_VALUE_TITLE.test(text)) score -= 20;

  if (readWords >= 220 && readWords <= 1400) score += 11;
  else if (readWords >= 180 && readWords <= 2000) score += 6;
  else if (readWords < 120) score -= 12;
  else if (readWords > 2400) score -= 5;

  if (paragraphs >= 5) score += 5;
  else if (paragraphs >= 3) score += 2;
  else score -= 8;
  if (sentences >= 8) score += 3;
  if (cover) score += 4;
  score += Math.min(8, Number(images) || 0);

  if (date) {
    const age = Math.max(0, (Date.now() - Date.parse(`${date}T12:00:00Z`)) / 86400000);
    if (Number.isFinite(age)) score += Math.max(0, 8 - age / 4);
  }

  const value = +clamp(score).toFixed(2);
  return { value, band: scoreBand(value) };
}

const TOKEN = /[A-Za-z][A-Za-z'’-]*/g;
const normalWord = word => String(word || "").toLowerCase().replace(/[’']/g, "");

/**
 * 基础难度：词库外词占比、句长和长句比例的可解释组合。
 * 词库外词不是绝对生词，专有名词会造成一定高估，因此只作为初始值，
 * 用户阅读反馈和已知词状态仍由前端 ClientScore 继续校正。
 */
export function difficultyBaseScore({ sentences = [], vocabulary = new Set() } = {}) {
  const list = sentences.map(String).filter(Boolean);
  const tokens = list.flatMap(s => s.match(TOKEN) || []).map(normalWord);
  const words = tokens.length;
  const unknown = vocabulary && vocabulary.size
    ? tokens.filter(w => !vocabulary.has(w)).length
    : 0;
  const unknownRate = words && vocabulary && vocabulary.size ? unknown / words : 0.22;
  const lengths = list.map(s => (s.match(TOKEN) || []).length);
  const avg = lengths.length ? lengths.reduce((a, b) => a + b, 0) / lengths.length : 0;
  const longRate = lengths.length ? lengths.filter(n => n > 35).length / lengths.length : 0;
  const longWords = words ? tokens.filter(w => w.length >= 11).length / words : 0;
  const score = unknownRate * 60 + clamp((avg - 14) * 1.2, 0, 20)
    + longRate * 15 + longWords * 5;
  return +clamp(score).toFixed(2);
}

/** 服务端初始分：质量占 70%，较低基础难度更适合当前阅读产品，占 30%。 */
export function serverScore(quality, difficulty) {
  return +clamp(Number(quality) * 0.7 + (100 - Number(difficulty)) * 0.3).toFixed(2);
}

export function classifySourceHealth(entry = {}) {
  return !(entry.rss?.disabled || entry.article?.disabled);
}

export function emptySourceHealth(url = "") {
  const stage = () => ({
    ok: null,
    lastStatus: null,
    lastLatencyMs: null,
    lastAt: "",
    consecutiveFailures: 0,
    consecutiveSuccesses: 0,
    disabled: false,
  });
  return { url, rss: stage(), article: stage(), image: stage(), updatedAt: "" };
}

/** 更新单个来源的一个阶段。图片阶段降级但不会导致 RSS/正文来源熔断。 */
export function updateSourceHealth(entry = emptySourceHealth(), kind, event = {}) {
  const next = JSON.parse(JSON.stringify(entry));
  if (!next[kind]) next[kind] = emptySourceHealth()[kind];
  const stage = next[kind];
  const ok = Boolean(event.ok);
  stage.ok = ok;
  stage.lastStatus = event.status == null ? null : event.status;
  stage.lastLatencyMs = Number.isFinite(event.latencyMs) ? Math.round(event.latencyMs) : null;
  stage.lastAt = event.at || new Date().toISOString();
  if (ok) {
    stage.consecutiveFailures = 0;
    stage.consecutiveSuccesses += 1;
    if (stage.consecutiveSuccesses >= SOURCE_RECOVERY_LIMIT) stage.disabled = false;
  } else {
    stage.consecutiveSuccesses = 0;
    stage.consecutiveFailures += 1;
    if (stage.consecutiveFailures >= SOURCE_FAILURE_LIMIT) stage.disabled = true;
  }
  next.updatedAt = stage.lastAt;
  return next;
}


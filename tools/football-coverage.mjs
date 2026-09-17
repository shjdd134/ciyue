/* 足球栏目「正文完整性」对账 —— **独立口径**，不 import 任何项目代码。
 *
 * 为什么必须另起一把尺子（项目铁律，2026-09-16 的教训）：
 *   `lib-tribune.mjs` 的 `extractLines` 里有 byline 过滤、blockquote 去重、形态闸……
 *   拿它去验它自己抓的正文，等于「尺子量掉的内容让尺子自己报」—— 它一定报「全对」。
 *   所以本脚本**完全不认识 TPT 的类名和结构**，只做一件事：
 *     把原文 HTML 拆成块级文本行 → 每行取 6-gram → 去「已提取的英文」里找，找不到就是缺口。
 *   同一件事反过来再做一遍（提取物 → 原文），找超译 / 污染 / 凭空出现的句子。
 *
 * 缺口分四类，**只有 `句` 值得追**（与 audit-coverage.mjs 同一套分类，便于横向比较）：
 *   nav  导航 / 订阅 / 版权 / 评论区特征 —— 本来就该缺
 *   短    词数 < 6，6-gram 判不了 —— 多为标签
 *   碎片  ≥6 词但无句末标点 —— 标题 / 条目 / 半句，视体裁而定
 *   句    ≥6 词且有句末标点 —— **这才是正文缺口**，`--strict` 时非零退出
 *
 * 归一化必须两边完全一致，否则差异会被算成缺口：弯引号、破折号、HTML 实体、大小写、
 * 连字符两侧空格。这里**故意不抄 lib-text.mjs 的实现** —— 抄过来就又不独立了。
 *
 * 用法：
 *   node tools/football-coverage.mjs --all
 *   node tools/football-coverage.mjs --id <id> [--verbose] [--json] [--strict]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const RAW = path.join(ROOT, 'tools', '_football', 'raw');

const argv = process.argv.slice(2);
const has = k => argv.includes('--' + k);
const val = (k, d = '') => { const i = argv.indexOf('--' + k); return i >= 0 && argv[i + 1] ? argv[i + 1] : d; };

const N = 6;
const COVER_OK = 0.6;   // 6-gram 命中率下限；低于它算缺口（实体/连字符差异不至于掉到这么低）

/* ---------------- 归一化（两边共用同一份，这是「同一把尺子」的全部含义） ---------------- */
const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', ldquo: '“', rdquo: '”', lsquo: '‘', rsquo: '’', mdash: '—', ndash: '–', hellip: '…', eacute: 'é', egrave: 'è', uuml: 'ü', ouml: 'ö', auml: 'ä', ccedil: 'ç', oslash: 'ø', aring: 'å', aacute: 'á', iacute: 'í', oacute: 'ó', uacute: 'ú', ntilde: 'ñ', szlig: 'ß' };
const unent = s => String(s).replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, e) => {
  if (e[0] === '#') return String.fromCodePoint(parseInt(e[1] === 'x' || e[1] === 'X' ? e.slice(2) : e.slice(1), e[1] === 'x' || e[1] === 'X' ? 16 : 10));
  return ENT[e.toLowerCase()] !== undefined ? ENT[e.toLowerCase()] : m;
});

function norm(s) {
  return unent(String(s))
    .replace(/[\u2018\u2019\u02bc]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[\u2010-\u2015]/g, '-')
    .replace(/\u2026/g, '...')
    .replace(/\s*-\s*/g, '-')          // "self - aware" 与 "self-aware" 必须同形
    .replace(/[^A-Za-z0-9'\- ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}
const words = s => norm(s).split(' ').filter(Boolean);

/* ---------------- 原文侧：独立地把 HTML 拆成块级文本行 ----------------
 * 刻意用与 lib-tribune 完全不同的做法：不挑 <article>，不认任何类名，
 * 只把 <br> 和块级闭合标签当换行，然后把标签全剥掉。这样导航/页脚/评论
 * **一定会**出现在候选行里 —— 它们本来就该出现在缺口里，由分类器去认。 */
function blockLines(html) {
  let s = String(html)
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(script|style|noscript|svg|iframe)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ');
  s = s.replace(/<br\b[^>]*\/?>/gi, '\n');
  s = s.replace(/<\/(p|div|li|h[1-6]|blockquote|figcaption|td|section|article|header|footer|aside)\s*>/gi, '\n');
  s = s.replace(/<[^>]+>/g, ' ');
  return s.split('\n').map(x => unent(x).replace(/\s+/g, ' ').trim()).filter(Boolean);
}

/* ---------------- 6-gram 索引 ---------------- */
function grams(text, n = N) {
  const w = words(text);
  const g = new Set();
  for (let i = 0; i + n <= w.length; i++) g.add(w.slice(i, i + n).join(' '));
  return g;
}
function coverage(gramsOf, corpusGrams) {
  if (!gramsOf.size) return 1;
  let hit = 0;
  for (const g of gramsOf) if (corpusGrams.has(g)) hit++;
  return hit / gramsOf.size;
}

/* ---------------- 缺口分类 ---------------- */
const NAV_RE = /(©|all rights reserved|subscribe|newsletter|sign up|cookie|privacy|terms of use|follow us|share this|advertisement|sponsored|read more|watch now|the players'? tribune|minute media|comments?\b|log ?in|sign ?in|download the app|more from|related|recommended)/i;
const SENT_END = /[.!?]["')\]]?$/;

function classify(text) {
  const w = words(text);
  if (w.length < N) return '短';
  if (NAV_RE.test(text)) return 'nav';
  if (!SENT_END.test(text.trim())) return '碎片';
  return '句';
}

/* ---------------- 主流程 ---------------- */
function check(id) {
  const htmlFile = path.join(RAW, id + '.en.html');
  const jsonFile = path.join(RAW, id + '.en.json');
  if (!fs.existsSync(htmlFile) || !fs.existsSync(jsonFile)) return { id, error: '缺 raw 文件，先跑 --extract' };
  const html = fs.readFileSync(htmlFile, 'utf8');
  const extracted = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));

  /* 「库内」语料 = 已提取的行 + 句。反向检查只用行，正向检查用全句，避免粒度差异噪声。 */
  const lineCorpus = new Set();
  for (const l of extracted.lines) for (const g of grams(l.en)) lineCorpus.add(g);
  const sentCorpus = new Set(lineCorpus);
  for (const s of extracted.sentences) for (const g of grams(s)) sentCorpus.add(g);

  const cands = blockLines(html);
  const gaps = [];
  for (const t of cands) {
    const k = classify(t);
    if (k === 'nav' || k === '短') continue;
    const cov = coverage(grams(t), sentCorpus);
    if (cov < COVER_OK) gaps.push({ cls: k, cov, text: t });
  }
  const byCls = { 句: [], 碎片: [] };
  for (const g of gaps) (byCls[g.cls] || (byCls[g.cls] = [])).push(g);

  /* 反向：提取物里有没有原文根本没有的东西（超译 / 抓串了 / 凭空生成） */
  const rawCorpus = new Set();
  for (const t of cands) for (const g of grams(t)) rawCorpus.add(g);
  const invented = [];
  for (const l of extracted.lines) {
    const gs = grams(l.en);
    if (gs.size < 1) continue;
    if (coverage(gs, rawCorpus) < COVER_OK) invented.push(l.en);
  }
  return { id, rows: extracted.lines.length, sentences: extracted.sentences.length, words: extracted.words, gaps: byCls, invented };
}

const ids = has('all')
  ? fs.readdirSync(RAW).filter(f => f.endsWith('.en.json')).map(f => f.replace(/\.en\.json$/, '')).sort()
  : [val('id')].filter(Boolean);
if (!ids.length) { console.log('用法：--all 或 --id <id>'); process.exit(1); }

const results = ids.map(check);
let sentGaps = 0;
for (const r of results) {
  if (r.error) { console.log(`✗ ${r.id}  ${r.error}`); continue; }
  const n句 = (r.gaps.句 || []).length, n碎 = (r.gaps.碎片 || []).length;
  sentGaps += n句;
  console.log(`${n句 ? '✗' : '✓'} ${r.id}`);
  console.log(`    提取 行 ${r.rows} / 句 ${r.sentences} / 词 ${r.words}`);
  console.log(`    正向缺口  句 ${n句} · 碎片 ${n碎}（nav / 短 已按定义忽略）  反向异常 ${r.invented.length}`);
  if (has('verbose')) {
    for (const g of (r.gaps.句 || [])) console.log(`      [句] 命中 ${(g.cov * 100).toFixed(0)}%  ${g.text.slice(0, 150)}`);
    for (const g of (r.gaps.碎片 || []).slice(0, 20)) console.log(`      [碎片] 命中 ${(g.cov * 100).toFixed(0)}%  ${g.text.slice(0, 120)}`);
    for (const t of r.invented) console.log(`      [反向] ${String(t).slice(0, 150)}`);
  }
}
console.log(`\n合计「句」类缺口 ${sentGaps} 条${sentGaps ? '  ← 必须逐条确认是导航/订阅框/评论区，还是真丢正文' : ''}`);
if (has('json')) fs.writeFileSync(path.join(ROOT, '.tmp', 'football-coverage.json'), JSON.stringify(results, null, 1));
if (has('strict') && sentGaps) process.exitCode = 1;

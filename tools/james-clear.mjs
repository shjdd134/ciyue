/* James Clear 站点通道（jamesclear.com）—— 按 URL 点名的人工管线
 *
 * 2026-09-25 为《The Diderot Effect》（方案文档点名的两篇之一）新增。设计约束：
 *   · **不做自动 RSS**：日常 RSS 通道已于 2026-09-17 全停，这里只收人工点名的篇目（CATALOG）。
 *   · 输出与 ARTICLES_EXTRA 兼容的段落/句子/元数据；注入语义与 football.mjs 完全一致
 *     （同 id 原位替换、新篇追加，共用 lib-text 的 mergeInject）。
 *   · 译文走「词阅精翻」：tools/_james-clear/zh/<id>.json 纯中文串数组，人工逐句填写
 *     （2026-09-25 起 qwen-max 精翻通道停用）。qwen-mt/DeepL 产线不用于本栏目。
 *
 * jamesclear.com 页面事实（2026-09-25 实测，Diderot 篇）：
 *   · 无 <article> 容器；正文 = <h1> 之后到 <div class="footnotes"> 之前的 h2/p/ul/li 流。
 *   · 正文小节用 <h2>（The Diderot Effect / Why We Want… / Mastering… / How to Overcome…）。
 *   · 正文段落里藏着 rel="footnote" 的行内角标 <a>（上标数字），剥离；脚注**内容**整体保留。
 *   · <div class="footnotes"> 里是 footnotetitle（"Footnotes"）+ <ol><li> 六条脚注 ——
 *     其中有实质内容（凯瑟琳大帝续闻、史料考订、书单、致谢），**必须保留**，不当页脚截断。
 *   · 脚注区之后是订阅话术（"Thanks for reading… email newsletter"）、作者简介、
 *     "Click here to learn more →" —— 三类都是站务块，排除。
 *   · 消费实例藏在正文一个 <ul> 里（4 个 <li>），每条自成一行，不能并进前一段。
 *
 * 用法（与 football.mjs 同构）：
 *   node tools/james-clear.mjs --list
 *   node tools/james-clear.mjs --extract [--id <id>]   抓原文快照 → tools/_james-clear/raw/
 *   node tools/james-clear.mjs --draft   --id <id>     en/cn 两列底稿（人工逐句填）
 *   node tools/james-clear.mjs --build   [--id <id>]   拼英中 → tools/_james-clear/<id>.json
 *   node tools/james-clear.mjs --review  --id <id>     打印英中对照
 *   node tools/james-clear.mjs --check                 校验产出（空译/重复）
 *   node tools/james-clear.mjs --covers  [--id <id>]   下载 og:image 到 assets/covers/
 *   node tools/james-clear.mjs --inject  [--id <id>]   写入 assets/data-articles-extra.js
 *   node tools/james-clear-coverage.mjs --id <id>      独立口径正文覆盖对账
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { readDecl, writeDecl, mergeInject } from './lib-text.mjs';
import { plain, attrs, canonical, splitOriginalSentences } from './lib-people.mjs';
import { cet4Words } from './lib-cet4.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'tools', '_james-clear');
const RAW = path.join(OUT, 'raw');

/* 栏目清单：**只收人工点名的篇目**。id 一经发布永不改（方案约束：换栏目不改 id）。 */
export const CATALOG = [
  {
    id: 'gr-james-clear-diderot-effect',
    title: 'The Diderot Effect: Why We Want Things We Don’t Need — And What to Do About It',
    titleZh: '狄德罗效应：我们为什么想要自己不需要的东西——以及怎么办',
    cat: '成长',
    url: 'https://jamesclear.com/diderot-effect',
    /* 原刊发布日期来自页面 meta article:published_time（2015-10-06T03:33:29Z），非抓取日。 */
    date: '2015-10-06',
  },
];

const args = process.argv.slice(2);
const has = f => args.includes(f);
const val = f => { const i = args.indexOf(f); return i > -1 ? args[i + 1] : null; };
const picked = () => { const id = val('--id'); return id ? CATALOG.filter(a => a.id === id) : CATALOG; };
const ensureDir = d => fs.mkdirSync(d, { recursive: true });

/* ---------- 抓取与解析 ---------- */

/* 行内脚注角标：<a href="#footnote-…" …>6</a>。**只**剥 rel="footnote" 的 ——
 * 正文里其他 <a> 是正常链接文本（plain() 会保留其文字），不能误删。 */
const FOOTNOTE_REF = /<a\b[^>]*\brel="footnote"[^>]*>[\s\S]*?<\/a\s*>/gi;

/** 正文块切分：从 <h1> 起到 footnotes div 止，按文档序枚举 h2/p/ul/figure。
 *  h1 本身不入行 —— 标题由 app 的 title 字段展示，重复成首段是噪音。
 *  figure 只取 <figcaption> 图注文字（插图 alt 是元数据，不是正文）；图注是编辑内容，
 *  2026-09-25 实测 Diderot 篇的画像图注含「1767 年 van Loo 所绘」这一事实，必须保留。
 *  返回 [{tag, en}]，tag ∈ heading|paragraph|item|caption。 */
function bodyLines(html) {
  const h1 = html.search(/<h1\b/i);
  const h1End = html.indexOf('</h1>', h1);
  const foot = html.indexOf('<div class="footnotes"');
  if (h1 < 0) throw new Error('找不到 <h1>（页面改版？）');
  const scope = html.slice(h1End > 0 ? h1End : h1, foot > 0 ? foot : undefined);
  const out = [];
  const re = /<(h1|h2|p|ul|figure)\b[^>]*>([\s\S]*?)<\/\1\s*>/gi;
  let m;
  while ((m = re.exec(scope))) {
    const kind = m[1].toLowerCase(), inner = m[2];
    if (kind === 'figure') {
      const cap = inner.match(/<figcaption\b[^>]*>([\s\S]*?)<\/figcaption\s*>/i);
      const t = cap ? plain(cap[1]).trim() : '';
      if (t) out.push({ tag: 'caption', en: t });
      continue;
    }
    if (kind === 'ul') {
      for (const li of inner.match(/<li\b[^>]*>([\s\S]*?)<\/li\s*>/gi) || []) {
        const t = plain(li.replace(/^<li\b[^>]*>/i, '').replace(/<\/li\s*>$/i, '')).trim();
        if (t) out.push({ tag: 'item', en: t });
      }
      continue;
    }
    if (kind === 'h1') continue;
    const t = plain(inner).trim();
    if (!t) continue;                                   // 空标题/装饰块
    out.push({ tag: kind === 'p' ? 'paragraph' : 'heading', en: t });
  }
  return out;
}

/** 脚注块：footnotetitle 标题 + <ol><li> 逐条。返回 [{tag, en}]。 */
function footnoteLines(html) {
  const foot = html.indexOf('<div class="footnotes"');
  if (foot < 0) return [];
  const end = html.indexOf('</ol>', foot);
  const scope = html.slice(foot, end > 0 ? end + 5 : undefined);
  const out = [];
  const title = scope.match(/<div class="footnotetitle">([\s\S]*?)<\/div>/i);
  if (title && plain(title[1]).trim()) out.push({ tag: 'heading', en: plain(title[1]).trim() });
  for (const li of scope.match(/<li\b[^>]*>([\s\S]*?)<\/li\s*>/gi) || []) {
    const inner = li.replace(/^<li\b[^>]*>/i, '').replace(/<\/li\s*>$/i, '');
    const t = plain(inner).trim();
    if (t) out.push({ tag: 'note', en: t });
  }
  return out;
}

/** 每行切句：与 build/draft 共用的唯一展开逻辑（无句末标点的行按整行兜底）。 */
const sentencesOf = line => {
  const ss = splitOriginalSentences(line.en);
  return ss.length ? ss : [line.en];
};

function parsePage(html) {
  /* 行内脚注角标先剥，再取正文 —— 角标数字不进正文文本。 */
  const clean = html.replace(FOOTNOTE_REF, '');
  const lines = [...bodyLines(clean), ...footnoteLines(clean)];
  const meta = {};
  for (const m of html.matchAll(/<meta\b[^>]*>/gi)) {
    const a = attrs(m[0]);
    meta[a.property || a.name] = a.content;
  }
  return { meta, lines };
}

async function cmdExtract() {
  ensureDir(RAW);
  for (const a of picked()) {
    const r = await fetch(a.url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36' },
      redirect: 'follow',
    });
    if (!r.ok) throw new Error(`${a.url} → HTTP ${r.status}`);
    const html = await r.text();
    /* 原始 HTML 必须落盘：独立口径覆盖对账（james-clear-coverage.mjs）拿它当「原文」，
     * 缓存下来才能离线复跑出同样的判定。进 .gitignore，不随仓库走。 */
    fs.writeFileSync(path.join(RAW, a.id + '.en.html'), html);
    const { meta, lines } = parsePage(html);
    const sentences = lines.flatMap(sentencesOf);
    const words = (sentences.join(' ').match(/[A-Za-z]+(?:['’][A-Za-z]+)?/g) || []).length;
    const pack = {
      id: a.id, kind: 'en', url: canonical(a.url), fetched: new Date().toISOString(),
      meta: { title: meta['og:title'] || '', published: meta['article:published_time'] || '', cover: meta['og:image'] || '' },
      lines, sentences, words, paragraphs: lines.length,
    };
    fs.writeFileSync(path.join(RAW, a.id + '.en.json'), JSON.stringify(pack, null, 1));
    console.log(`${a.id} EN  行 ${lines.length} / 句 ${sentences.length} / 词 ${words}  发布 ${pack.meta.published || '?'}`);
  }
}

const readRaw = (id, kind) => JSON.parse(fs.readFileSync(path.join(RAW, `${id}.${kind}.json`), 'utf8'));

/* ---------- 翻译底稿（--draft）----------
 * 与 football.mjs --draft 同一约定：句子展开逻辑必须与 build 完全一致
 * （无句末标点的行按整行兜底），否则按底稿行号填的译文数组在构建时错位。 */
function cmdDraft() {
  const a = picked()[0];
  if (!a) { console.error('未指定 --id'); process.exit(1); }
  const en = readRaw(a.id, 'en');
  const want = [];
  const byLine = [];
  for (const l of en.lines) {
    const ss = sentencesOf(l);
    byLine.push(ss.map(s => { want.push(s); return want.length; }));
  }
  ensureDir(path.join(OUT, 'zh'));
  const f = path.join(OUT, 'zh', a.id + '.draft.md');
  const body = byLine.map(nums => nums.map(n =>
    `[${String(n).padStart(3, '0')}] EN ${want[n - 1]}\n     CN `).join('\n')).join('\n----\n');
  fs.writeFileSync(f, [
    `# 翻译底稿：${a.title}（${a.id}）`,
    `# 共 ${want.length} 句；虚线是原文分行。译文按行号句序填进`,
    `# tools/_james-clear/zh/${a.id}.json（纯中文串数组，不带英文、不带行号）。`,
    '',
    body,
    '',
  ].join('\n'));
  console.log(`已写出 ${f}（${want.length} 句 / ${byLine.length} 行）`);
}

/* ---------- 封面：og:image → assets/covers/<id>.jpg（走 curl，与 football 同口径） ---------- */
const coverPath = id => path.join(ROOT, 'assets', 'covers', id + '.jpg');

function cmdCovers() {
  ensureDir(path.join(ROOT, 'assets', 'covers'));
  for (const a of picked()) {
    const j = JSON.parse(fs.readFileSync(path.join(RAW, a.id + '.en.json'), 'utf8'));
    const url = j.meta && j.meta.cover;
    if (!url) { console.log(`${a.id}  原始数据里没有 og:image，跳过`); continue; }
    if (fs.existsSync(coverPath(a.id))) { console.log(`${a.id}  已存在，跳过`); continue; }
    const tmp = coverPath(a.id) + '.part';
    let r;
    try {
      r = execFileSync('curl', ['-s', '--max-time', '60', '-A', 'Mozilla/5.0', '-w', '%{http_code} %{content_type}', '-o', tmp, url], { encoding: 'utf8' });
    } catch (e) { console.log(`${a.id}  curl 失败：${String(e.message).slice(0, 80)}`); continue; }
    const [code, type] = r.trim().split(/\s+/);
    if (code !== '200') { console.log(`${a.id}  HTTP ${code}，未下载`); try { fs.unlinkSync(tmp); } catch {} continue; }
    const buf = fs.readFileSync(tmp);
    if (!/^image\//.test(type || '')) { console.log(`${a.id}  content-type=${type}，不是图片，跳过`); try { fs.unlinkSync(tmp); } catch {} continue; }
    if (buf.length < 5000) { console.log(`${a.id}  只有 ${buf.length} 字节，疑似占位图，跳过`); try { fs.unlinkSync(tmp); } catch {} continue; }
    fs.renameSync(tmp, coverPath(a.id));
    console.log(`${a.id}  ✓ ${buf.length} 字节  ${type}`);
  }
}

/* ---------- build：英中拼装 ----------
 * 译文 = tools/_james-clear/zh/<id>.json 纯中文串数组，句序 = 提取展开序（见 --draft）。
 * 产出形状与 tools/_football/<id>.json 对齐，供 --inject 转成 appEntry。 */
function buildOne(a) {
  const en = readRaw(a.id, 'en');
  const zf = path.join(OUT, 'zh', a.id + '.json');
  const cnList = fs.existsSync(zf) ? JSON.parse(fs.readFileSync(zf, 'utf8')) : null;
  const flat = [];
  for (const l of en.lines) for (const s of sentencesOf(l)) flat.push(s);
  const paras = en.lines.map(l => ({ sentences: sentencesOf(l).map(s => ({ en: s, cn: '' })) }));
  if (cnList) {
    if (!Array.isArray(cnList) || cnList.length !== flat.length) {
      throw new Error(`${a.id}: 译文 ${Array.isArray(cnList) ? cnList.length : '?'} 句 ≠ 提取 ${flat.length} 句，先对齐句数再构建`);
    }
    let k = 0;
    for (const p of paras) for (const s of p.sentences) { s.cn = cnList[k++]; s.cnEdited = true; }
  }
  return { en, paras };
}

export function articleFrom(a) {
  const b = buildOne(a);
  const flat = b.paras.flatMap(p => p.sentences);
  return {
    id: a.id, cat: a.cat,
    title: a.title, titleZh: a.titleZh,
    source_url: a.url,
    date: a.date,
    coverImg: fs.existsSync(coverPath(a.id)) ? 'assets/covers/' + a.id + '.jpg' : null,
    translation_type: 'ciyue_edited',
    stats: {
      paragraphs: b.paras.length,
      sentences: flat.length,
      words: b.en.words,
      chinese: flat.reduce((n, s) => n + (String(s.cn || '').match(/[\u4e00-\u9fa5]/g) || []).length, 0),
      emptyCn: flat.filter(s => !s.cn).length,
    },
    english_paragraphs: b.paras.map(p => p.sentences.map(s => s.en).join(' ')),
    chinese_paragraphs: b.paras.map(p => p.sentences.map(s => s.cn).join('')),
    sentence_pairs: flat.map(s => ({ en: s.en, cn: s.cn })),
    paras: b.paras,
    cet4_words: cet4Words(b.paras),
  };
}

/* ---------- 校验 ---------- */
function cmdCheck() {
  const files = fs.existsSync(OUT) ? fs.readdirSync(OUT).filter(f => f.startsWith('gr-') && f.endsWith('.json')) : [];
  if (!files.length) { console.log('还没有产出物'); return 0; }
  let bad = 0;
  for (const f of files) {
    const a = JSON.parse(fs.readFileSync(path.join(OUT, f), 'utf8'));
    const errs = [];
    if (a.stats.emptyCn) errs.push(`空译文 ${a.stats.emptyCn} 句`);
    const cnSeen = new Map();
    a.sentence_pairs.forEach((s, i) => {
      if (!s.cn) return;
      if (!cnSeen.has(s.cn)) cnSeen.set(s.cn, []);
      cnSeen.get(s.cn).push(i);
    });
    for (const [cn, idx] of cnSeen) if (idx.length > 1) errs.push(`重复译文 ${idx.join(',')}  ${cn.slice(0, 50)}`);
    console.log(`${errs.length ? '✗' : '✓'} ${a.id}  段 ${a.stats.paragraphs} / 句 ${a.stats.sentences} / 英 ${a.stats.words} 词 / 中 ${a.stats.chinese} 字`);
    for (const e of errs) { bad++; console.log('    ' + e); }
  }
  return bad;
}

/* ---------- review ---------- */
function cmdReview() {
  const a = picked()[0];
  if (!a) { console.error('未指定 --id'); process.exit(1); }
  const f = path.join(OUT, a.id + '.json');
  if (!fs.existsSync(f)) { console.log(`还没有 ${a.id} 的 build 产物；底稿看 --draft。`); return; }
  const art = JSON.parse(fs.readFileSync(f, 'utf8'));
  const from = Number(val('--from') || 0), to = Number(val('--to') || 1e9);
  let k = 0;
  art.paras.forEach((p, pi) => {
    const nums = p.sentences.map(() => ++k);
    if (nums[0] - 1 > to || nums[nums.length - 1] < from) return;
    console.log(`\n=== 行 ${pi + 1} ===`);
    for (const s of p.sentences) {
      console.log('  EN ' + s.en);
      console.log('  CN ' + (s.cn || '<<空>>'));
    }
  });
}

/* ---------- 注入 app 数据 ----------
 * appEntry 形状对齐 football.mjs：id/cat/title/titleZh/source/date/minutes/url/coverImg/
 * translation_type/paras。成长是常青栏目（publish.mjs EVERGREEN_CATS），**不需要 pin**。
 * 目标文件可用 WORDLENS_JAMESCLEAR_EXTRA 覆盖（测试隔离，同 qc.mjs 做法）。 */
function appEntry(art) {
  return {
    id: art.id,
    cat: art.cat,
    title: art.title,
    titleZh: art.titleZh,
    source: `James Clear · ${art.date}`,
    date: art.date,
    minutes: Math.max(2, Math.round(art.stats.words / 130)),
    url: art.source_url,
    coverImg: art.coverImg,
    translation_type: art.translation_type,
    paras: art.paras,
  };
}

function cmdInject() {
  const file = process.env.WORDLENS_JAMESCLEAR_EXTRA || path.join(ROOT, 'assets', 'data-articles-extra.js');
  const decl = readDecl(file, 'ARTICLES_EXTRA');
  if (!decl) throw new Error('data-articles-extra.js 里找不到 ARTICLES_EXTRA 声明（文件结构变了？）');
  const targets = picked();
  if (!targets.length) { console.error('--id 没有匹配到任何清单里的文章'); process.exit(1); }
  const injected = targets.map(a => appEntry(JSON.parse(fs.readFileSync(path.join(OUT, a.id + '.json'), 'utf8'))));
  const next = mergeInject(decl.value, injected);
  writeDecl(file, 'ARTICLES_EXTRA', next);
  const added = next.length - decl.value.length;
  console.log(`已写入 ${file}：原 ${decl.value.length} 篇 → ${next.length} 篇（新增 ${added}、原位替换 ${targets.length - added}）`);
  for (const a of injected) console.log(`  ${a.id}  ${a.paras.length} 段 / ${a.paras.reduce((n, p) => n + p.sentences.length, 0)} 句`);
}

if (has('--list')) {
  for (const a of CATALOG) {
    const f = path.join(OUT, a.id + '.json');
    const st = fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')).stats : null;
    console.log(`${a.id}  ${a.cat.padEnd(4)} ${st ? `${st.paragraphs} 段 / ${st.sentences} 句 / 空译 ${st.emptyCn}` : '(未产出)'}`);
  }
} else if (has('--extract')) await cmdExtract();
else if (has('--draft')) cmdDraft();
else if (has('--build')) {
  ensureDir(OUT);
  for (const a of picked()) {
    const art = articleFrom(a);
    fs.writeFileSync(path.join(OUT, a.id + '.json'), JSON.stringify(art, null, 1));
    console.log(`${a.id} → 段 ${art.stats.paragraphs} / 句 ${art.stats.sentences} / 空译 ${art.stats.emptyCn} / CET4 ${art.cet4_words.length}`);
  }
} else if (has('--covers')) cmdCovers();
else if (has('--review')) cmdReview();
else if (has('--inject')) cmdInject();
else if (has('--check')) process.exitCode = cmdCheck() ? 1 : 0;
else console.log('用法见 tools/james-clear.mjs 顶部注释');

/* 足球栏目 · The Players' Tribune 原刊全文
 *
 * 这一阶段只做四件事：**原文抓取 → 正文清洗 → 高质量翻译 → 英中对齐**。
 * 单词解释、AI 分析、自动推荐都不在这里 —— 用户明确要求先把「读英文」这件事做顺。
 *
 * 用法：
 *   node tools/football.mjs --list                      看栏目清单与四篇的进度
 *   node tools/football.mjs --extract [--id <id>]       抓原文（+官方中文）并缓存到 tools/_football/raw/
 *   node tools/football.mjs --build   [--id <id>]       对齐 → 产出 tools/_football/<id>.json
 *   node tools/football.mjs --review  --id <id> [--from N] [--to M]   打印对齐结果供人工审
 *   node tools/football.mjs --verify  --id <id>         对齐稳定性：三配置边界一致率 + 不一致块清单
 *   node tools/football.mjs --check                     校验已产出的文章（句数/空译/重复/覆盖）
 *   node tools/football.mjs --covers [--id <id>]        下载封面到 assets/covers/（走 curl，Node fetch 对图床超时）
 *   node tools/football.mjs --inject [--id <id>]        幂等写入 assets/data-articles-extra.js（同 id 替换）
 *   node tools/football-coverage.mjs --all              独立口径正文完整性对账（不 import 项目代码）
 *
 * 缓存目录 tools/_football/ 进 .gitignore：原刊 HTML 不随仓库走，但**产出物要**。
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { fetchTribune, splitZhSentences } from './lib-tribune.mjs';
import { alignBlocks, unitsFor, buildParagraphsFromBlocks, distributeBlock } from './lib-align.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'tools', '_football');
const RAW = path.join(OUT, 'raw');

/* 栏目清单。**只收人工选定的人**：足球栏目不做自动选题（RSS 已于 2026-09-17 全停）。
 * officialZh 有值 = 用 The Players' Tribune 官方中文版（translation_type: official）；
 * 没有 = 走「词阅精翻」（translation_type: ciyue_edited）。 */
export const ARTICLES = [
  {
    id: 'fb-kevin-de-bruyne-let-me-talk',
    player: 'Kevin De Bruyne', playerZh: '凯文·德布劳内',
    title: 'Let Me Talk', titleZh: '听我说',
    url: 'https://www.theplayerstribune.com/articles/kevin-de-bruyne-man-city-let-me-talk',
    officialZh: 'https://www.theplayerstribune.com/articles/kevin-de-bruyne-man-city-chinese-let-me-talk',
    translationType: 'official', date: '2019-04-15',
  },
  {
    id: 'fb-cristiano-ronaldo-madrid-my-story',
    player: 'Cristiano Ronaldo', playerZh: '克里斯蒂亚诺·罗纳尔多',
    title: 'Madrid: My Story', titleZh: '马德里：我的故事',
    url: 'https://www.theplayerstribune.com/articles/cristiano-ronaldo-madrid-english',
    translationType: 'ciyue_edited', date: '2017-10-02',
  },
  {
    id: 'fb-gerard-pique-a-long-story',
    player: 'Gerard Piqué', playerZh: '杰拉德·皮克',
    title: 'A Long Story', titleZh: '说来话长',
    url: 'https://www.theplayerstribune.com/articles/gerard-pique-a-long-story',
    translationType: 'ciyue_edited', date: '2018-03-22',
  },
  {
    id: 'fb-martin-odegaard-north-london-forever',
    player: 'Martin Ødegaard', playerZh: '马丁·厄德高',
    title: 'North London Forever', titleZh: '北伦敦，永远',
    url: 'https://www.theplayerstribune.com/posts/martin-odegaard-arsenal-soccer-norway-premier-league',
    translationType: 'ciyue_edited', date: '2023-02-09',
  },
];

const args = process.argv.slice(2);
const has = f => args.includes(f);
const val = f => { const i = args.indexOf(f); return i > -1 ? args[i + 1] : null; };
const picked = () => { const id = val('--id'); return id ? ARTICLES.filter(a => a.id === id) : ARTICLES; };
const ensureDir = d => fs.mkdirSync(d, { recursive: true });

/* ---------- 词库：算 cet4_words ---------- */
let BANK = null;
function bank() {
  if (BANK) return BANK;
  const read = (file, name) => {
    const s = fs.readFileSync(path.join(ROOT, 'assets', file), 'utf8');
    // 声明形式是 `window.WORDS_FULL = [ ... \n];`（不是 const），别照抄 ingest 那条正则
    const m = s.match(new RegExp('(?:window\\.|const |var )?' + name + '\\s*=\\s*(\\[[\\s\\S]*?\\n\\]);'));
    if (!m) throw new Error('读不到 ' + name + ' in ' + file);
    return JSON.parse(m[1]);
  };
  const core = read('data-words-full.js', 'WORDS_FULL');
  const mid = read('data-words-mid.js', 'WORDS_MID');
  BANK = {
    core: new Map(core.map(w => [w.word.toLowerCase(), w])),
    mid: new Map(mid.map(w => [w.word.toLowerCase(), w])),
  };
  return BANK;
}
const TOKEN = /[A-Za-z]+(?:['’][A-Za-z]+)?/g;
/* 不规则复数/时态归一到词库里的原形。只处理高频几类，不要写通用词形还原（会误判）。 */
function lemmaCands(w) {
  const out = [w];
  if (w.endsWith('ies')) out.push(w.slice(0, -3) + 'y');
  if (w.endsWith('es')) out.push(w.slice(0, -2));
  if (w.endsWith('s')) out.push(w.slice(0, -1));
  if (w.endsWith('ing')) out.push(w.slice(0, -3), w.slice(0, -3) + 'e');
  if (w.endsWith('ed')) out.push(w.slice(0, -2), w.slice(0, -1));
  if (w.endsWith('er')) out.push(w.slice(0, -2), w.slice(0, -1));
  return out;
}
export function cet4Words(paras) {
  const seen = new Map();
  for (const p of paras) for (const s of p.sentences || [p]) {
    TOKEN.lastIndex = 0;
    let m;
    while ((m = TOKEN.exec(String(s.en || '')))) {
      const raw = m[0], low = raw.replace(/[’]/g, "'").toLowerCase();
      let hit = null, layer = null;
      for (const c of lemmaCands(low)) {
        if (bank().core.has(c)) { hit = bank().core.get(c); layer = 'core'; break; }
      }
      if (!hit) for (const c of lemmaCands(low)) {
        if (bank().mid.has(c)) { hit = bank().mid.get(c); layer = 'base'; break; }
      }
      if (!hit) continue;
      const key = hit.word.toLowerCase();
      if (seen.has(key)) { seen.get(key).n++; continue; }
      seen.set(key, { w: hit.word, layer, pos: hit.pos || '', def: hit.def || '', n: 1 });
    }
  }
  /* 只收「四级核心」层 —— 中学基础层读者基本都会，列进来是噪音。
   * 这正是本项目的既有口径：难度看的是「低频词占比」，不是「词表覆盖」。 */
  return [...seen.values()].filter(x => x.layer === 'core')
    .sort((a, b) => b.n - a.n || a.w.localeCompare(b.w));
}

/* ---------- 抓取 ---------- */
async function cmdExtract() {
  ensureDir(RAW);
  for (const a of picked()) {
    const en = await fetchTribune(a.url, { lang: 'en' });
    /* 原始 HTML 必须落盘：独立口径的完整性对账（football-coverage.mjs）要拿它当「原文」，
     * 而且缓存下来才能离线复跑出同样的判定。它进 .gitignore，不随仓库走。 */
    fs.writeFileSync(path.join(RAW, a.id + '.en.html'), en.html);
    const pack = { id: a.id, kind: 'en', url: a.url, fetched: new Date().toISOString(), ...en };
    delete pack.html;
    fs.writeFileSync(path.join(RAW, a.id + '.en.json'), JSON.stringify(pack, null, 1));
    console.log(`${a.id} EN  行 ${en.paragraphs} / 句 ${en.sentences.length} / 词 ${en.words}`);
    if (a.officialZh) {
      const zh = await fetchTribune(a.officialZh, { lang: 'zh' });
      fs.writeFileSync(path.join(RAW, a.id + '.zh.html'), zh.html);
      const zp = { id: a.id, kind: 'zh', url: a.officialZh, fetched: new Date().toISOString(), ...zh };
      delete zp.html;
      fs.writeFileSync(path.join(RAW, a.id + '.zh.json'), JSON.stringify(zp, null, 1));
      console.log(`${a.id} ZH  行 ${zh.paragraphs} / 句 ${zh.sentences.length} / 汉字 ${zh.chars}`);
    }
  }
}

const readRaw = (id, kind) => JSON.parse(fs.readFileSync(path.join(RAW, `${id}.${kind}.json`), 'utf8'));

/* ---------- 封面 ----------
 * 站点既有口径是「本地 assets/covers/<id>.jpg + coverImg 相对路径」（见 app.js coverOf：
 * coverImg → COVER_MAP → 渐变兜底）。远链 minutemediacdn 虽然是公开 CDN，但热链在
 * referer / CDN 策略变化时说断就断，而且线下开发时也不可控 —— 所以落盘到本地。
 * Pique 那张的文件名是 dataimagewebpbase64UklGR…（TPT 把 webp 塞进了 path），
 * 内容仍是合法图片，按 Content-Type 决定扩展名。
 *
 * 为什么走 curl 而不是 Node fetch：实测（2026-09-17）images2.minutemediacdn.com
 * Node fetch 直接 ConnectTimeout，curl 却 200 + 74KB —— 大概率是 IPv6/沙箱网络策略差异。
 * 工具只做一次性下载，不为它调网络栈，用 execFileSync 传参数组、不经 shell，避免引号坑。 */
const coverPath = id => path.join(ROOT, 'assets', 'covers', id + '.jpg');

async function cmdCovers() {
  ensureDir(path.join(ROOT, 'assets', 'covers'));
  for (const a of picked()) {
    const j = JSON.parse(fs.readFileSync(path.join(RAW, a.id + '.en.json'), 'utf8'));
    const url = j.meta && j.meta.cover;
    if (!url) { console.log(`${a.id}  原始数据里没有 cover，跳过`); continue; }
    if (fs.existsSync(coverPath(a.id))) { console.log(`${a.id}  已存在，跳过`); continue; }
    const tmp = coverPath(a.id) + '.part';
    let r;
    try {
      r = execFileSync('curl', ['-s', '--max-time', '60', '-A', 'Mozilla/5.0', '-w', '%{http_code} %{content_type}', '-o', tmp, url], { encoding: 'utf8' });
    } catch (e) { console.log(`${a.id}  curl 失败：${e.message.slice(0, 80)}`); continue; }
    const [code, type] = r.trim().split(/\s+/);
    if (code !== '200') { console.log(`${a.id}  HTTP ${code}，未下载`); try { fs.unlinkSync(tmp); } catch {} continue; }
    const buf = fs.readFileSync(tmp);
    if (!/^image\//.test(type || '')) { console.log(`${a.id}  content-type=${type}，不是图片，跳过`); try { fs.unlinkSync(tmp); } catch {} continue; }
    if (buf.length < 5000) { console.log(`${a.id}  只有 ${buf.length} 字节，疑似占位图，跳过`); try { fs.unlinkSync(tmp); } catch {} continue; }
    fs.renameSync(tmp, coverPath(a.id));
    console.log(`${a.id}  ✓ ${buf.length} 字节  ${type}`);
  }
}

/* ---------- 跨语言锚点词典（alignBlocks 的 gloss） ----------
 * 为什么需要它：官方中文把 Raheem 译成「斯特林」时，拉丁专名锚点就断了（实测 118 行里只有
 * 22 行保留拉丁字母）。ECDICT 让「英文实词 → 它的中文释义是否出现在这段中文里」成为可能，
 * 这是长度比例之外唯一真正跨语言的信号。
 * 词典来自 tools/_football/anchor-dict.json（由本栏目四篇的词表生成，非全量 ECDICT）。 */
let GLOSS = null, GLOSS_READ = false;
function glossDict() {
  if (GLOSS_READ) return GLOSS;
  GLOSS_READ = true;
  const f = path.join(OUT, 'anchor-dict.json');
  if (fs.existsSync(f)) GLOSS = JSON.parse(fs.readFileSync(f, 'utf8'));
  return GLOSS;
}

/* ---------- 人工覆盖（overrides）----------
 * 对齐器是单调的，但**官方译文不是**：TPT 会把金句（pull-quote）挪位、整句省略、
 * 把一句中文拆到两个英文段。这些地方机器永远对不齐，硬对齐只会产出错位配对 ——
 * 比如进球段（One goal. / They don't want you anymore. / Two goals. …）错一格之后
 * 「第五个进球。」被填给两句不同的英文。所以留一个人工出口，两种写法：
 *   ① 边界覆盖  { enFrom, enTo, cnFrom, cnTo }         —— 块内句级分配仍走原子 DP；
 *   ② 全手配    { enFrom, enTo, cnFrom, cnTo, pairs }  —— pairs 的 en 必须与提取结果逐字一致，
 *     否则构建直接报错（防止提取器改了分句而覆盖文件没跟上，静默错配）。
 * enFrom/enTo 都是**行号**（raw *.en.json 里 lines 的下标），不是块号 —— 块号会随对齐器漂。
 * 复用同一句中文的地方打 cnShared 标记（官方译文省略时宁可重复、不造翻译、不留空）。 */
function applyOverrides(a, paras, en) {
  const f = path.join(OUT, 'overrides', a.id + '.json');
  if (!fs.existsSync(f)) return paras;
  const ovs = JSON.parse(fs.readFileSync(f, 'utf8'));
  for (const ov of ovs) {
    /* 覆盖范围不必与块边界重合（实测：块 26 是 EN[44..49]，而金句错位只到 48）——
     * 直接取所有**与之相交**的块，整段换成一块。en 行必须连续无缝，否则说明范围写错了。 */
    const start = paras.findIndex(p => p.block.enTo >= ov.enFrom);
    let end = -1;
    for (let k = 0; k < paras.length; k++) if (paras[k].block.enFrom <= ov.enTo) end = k;
    if (start < 0 || end < start) throw new Error(`${a.id}: 覆盖 ${ov.enFrom}..${ov.enTo} 与任何块都不相交`);
    for (let k = start; k <= end; k++) {
      const b = paras[k].block;
      if (b.enFrom > ov.enTo || b.enTo < ov.enFrom) throw new Error(`${a.id}: 覆盖 ${ov.enFrom}..${ov.enTo} 中间夹了不相干的块（EN${b.enFrom}..${b.enTo}）`);
    }
    const block = { enFrom: ov.enFrom, enTo: ov.enTo, cnFrom: ov.cnFrom, cnTo: ov.cnTo, overridden: true };
    let sentences;
    if (ov.pairs) {
      const want = [];
      for (let k = ov.enFrom; k <= ov.enTo; k++) for (const s of en.lines[k].sentences) want.push(s);
      const got = ov.pairs.map(p => Array.isArray(p) ? p[0] : p.en);
      if (JSON.stringify(want) !== JSON.stringify(got)) {
        const first = want.findIndex((s, k) => s !== got[k]);
        throw new Error(`${a.id}: 覆盖 ${ov.enFrom}..${ov.enTo} 的英文与提取结果不一致（第 ${first} 句）\n  提取: ${JSON.stringify(String(want[first]).slice(0, 90))}\n  覆盖: ${JSON.stringify(String(got[first]).slice(0, 90))}`);
      }
      sentences = ov.pairs.map(p => {
        const arr = Array.isArray(p);
        const enT = arr ? p[0] : p.en, cnT = arr ? p[1] : p.cn;
        const shared = arr ? p[2] === 'shared' : !!p.shared;
        return { en: enT, cn: cnT, ...(shared ? { cnShared: true } : {}) };
      });
    } else {
      const enS = [];
      for (let k = ov.enFrom; k <= ov.enTo; k++) for (const s of en.lines[k].sentences) enS.push(s);
      const zhText = readRaw(a.id, 'zh').lines.slice(ov.cnFrom, ov.cnTo + 1).map(l => l.en).join('');
      sentences = distributeBlock(enS, zhText, splitZhSentences);
    }
    paras.splice(start, end - start + 1, { sentences, block });
  }
  return paras;
}

/* ---------- 对齐 + 产出 ---------- */
function buildOne(a, alignOpts = null) {
  const en = readRaw(a.id, 'en');
  if (a.translationType !== 'official') {
    /* 「词阅精翻」交稿格式：tools/_football/zh/<id>.json = **纯中文字符串数组**，按句子顺序排列。
     * 为什么不带英文：英文以提取结果为唯一权威，译文文件里再抄一遍英文，
     * 弯引号差一个字符就会对不上，还得写容错 —— 只交中文、按下标配对，抄写错误这个类目就不存在。
     * 译文从「翻译工作底稿」来：node tools/football.mjs --draft --id <id> 会生成 en/cn 两列底稿。 */
    const zf = path.join(OUT, 'zh', a.id + '.json');
    const cnList = fs.existsSync(zf) ? JSON.parse(fs.readFileSync(zf, 'utf8')) : null;
    if (cnList) {
      const want = [];
      for (const l of en.lines) for (const s of (l.sentences && l.sentences.length ? l.sentences : [l.en])) want.push(s);
      if (!Array.isArray(cnList) || cnList.length !== want.length) {
        throw new Error(`${a.id}: 译文 ${Array.isArray(cnList) ? cnList.length : '?'} 句 ≠ 提取 ${want.length} 句，先对齐句数再构建`);
      }
      let k = 0;
      const paras = en.lines.map(l => {
        const ss = (l.sentences && l.sentences.length ? l.sentences : [l.en]).map(s => ({ en: s, cn: cnList[k++], cnEdited: true }));
        return { sentences: ss };
      });
      return { en, cnLines: null, pairs: null, paras };
    }
    return { en, cnLines: null, pairs: null, paras: null };
  }
  const zh = readRaw(a.id, 'zh');
  const src = en.lines.map(l => ({ text: l.en, weight: (l.en.match(/[A-Za-z']+/g) || []).length, units: l.sentences.length }));
  const dst = zh.lines.map(l => ({ text: l.en, len: (l.en.match(/[\u4e00-\u9fa5]/g) || []).length, units: l.sentences.length }));
  /* 默认**不带**词级锚点。这是 2026-09-17 的实测结论，不是忘了接：
   * 把 ECDICT 释义当 DP 代价项（无论加分还是罚分）都会**系统性改变分块**，而不是纠正错误分块 ——
   * 实测 wGloss ∈ {0.1…2.0} 八档，块数 70→60→56→46→38→30→26→24→22 单调下降，
   * **没有任何一档能复现无锚点的分块**；加分版更糟（块数 70→118，直接退化成逐行 1:1 + 译句复读）。
   * 原因：anchors 是集合交，对中文块长度单调 → 无论怎么归一化都在「偏好吞并」和「偏好切碎」之间滑。
   * 结论：它**不能进代价函数**，只能当**事后分诊指标**（见 cmdVerify）。
   * 要复现实验：`node tools/football.mjs --verify --id <id>`，或 .tmp/sweep-gloss.mjs。 */
  const opts = alignOpts === null ? {} : alignOpts;
  const blocks = alignBlocks(src, dst, opts);
  if (!blocks) return { en, zh, pairs: null, paras: null, alignFailed: true };
  const paras = buildParagraphsFromBlocks(en.lines, zh.lines, blocks, { splitZh: splitZhSentences });
  applyOverrides(a, paras, en);
  return { en, zh, pairs: null, paras, src, dst };
}

export function articleFrom(a, alignOpts = null) {
  const b = buildOne(a, alignOpts);
  /* 「词阅精翻」还没交稿时（zh/<id>.json 不存在），产出**英文骨架**：句子照排、cn 全空。
   * 这是给译者看的工作底稿，不是成品 —— --check 会用「空译文」把它标红，属于预期。 */
  const paras = b.pairs
    ? b.pairs.map(p => ({ sentences: [Array.isArray(p) ? { en: p[0], cn: p[1] } : { en: p.en, cn: p.cn }] }))
    : b.paras
      ? b.paras.map(p => ({ sentences: p.sentences }))
      : b.en.lines.map(l => ({ sentences: (l.sentences && l.sentences.length ? l.sentences : [l.en]).map(s => ({ en: s, cn: '' })) }));
  const flat = paras.flatMap(p => p.sentences);
  return {
    id: a.id, cat: '足球',
    title: a.title, titleZh: a.titleZh,
    player: a.player, playerZh: a.playerZh,
    source_url: a.url,
    official_source_url: a.officialZh || null,
    date: a.date,
    /* 与全站一致的封面口径（app.js coverOf）：本地 assets/covers/<id>.jpg。
     * 图没下载时留 null，页面自动回退渐变封面 —— 不要写远链。 */
    coverImg: fs.existsSync(coverPath(a.id)) ? 'assets/covers/' + a.id + '.jpg' : null,
    translation_type: a.translationType,
    stats: {
      paragraphs: paras.length,
      sentences: flat.length,
      words: b.en.words,
      chinese: b.zh ? b.zh.chars : flat.reduce((n, s) => n + (s.cn.match(/[\u4e00-\u9fa5]/g) || []).length, 0),
      emptyCn: flat.filter(s => !s.cn).length,
    },
    english_paragraphs: paras.map(p => p.sentences.map(s => s.en).join(' ')),
    chinese_paragraphs: paras.map(p => p.sentences.map(s => s.cn).join('')),
    sentence_pairs: flat.map(s => ({ en: s.en, cn: s.cn })),
    paras,
    key_phrases: keyPhrases(a.id, flat),
    cet4_words: cet4Words(paras),
  };
}

/* ---------- key_phrases：先自动出候选，再人工筛 ---------- */
function keyPhrases(id, flat) {
  const f = path.join(OUT, 'phrases', id + '.json');
  if (fs.existsSync(f)) return JSON.parse(fs.readFileSync(f, 'utf8'));
  return [];
}
function phraseCandidates(flat) {
  const text = flat.map(s => s.en).join(' ');
  const toks = (text.match(TOKEN) || []).map(t => t.toLowerCase().replace(/[’]/g, "'"));
  const counts = new Map();
  for (let n = 2; n <= 4; n++) {
    for (let i = 0; i + n <= toks.length; i++) {
      const g = toks.slice(i, i + n);
      if (g.some(t => t.length < 2)) continue;
      const k = g.join(' ');
      counts.set(k, (counts.get(k) || 0) + 1);
    }
  }
  return [...counts.entries()].filter(([k, v]) => v >= 2 && !/^(?:i|you|he|she|we|they|it|the|a|an|and|to|of|in|was|is|are|my|me|that|this)\b/.test(k))
    .sort((a, b) => b[1] - a[1] || b[0].length - a[0].length).slice(0, 60);
}

/* ---------- 校验 ---------- */
function cmdCheck() {
  const files = fs.existsSync(OUT) ? fs.readdirSync(OUT).filter(f => f.startsWith('fb-') && f.endsWith('.json')) : [];
  if (!files.length) { console.log('还没有产出物'); return 0; }
  let bad = 0;
  for (const f of files) {
    const a = JSON.parse(fs.readFileSync(path.join(OUT, f), 'utf8'));
    const errs = [], notes = [];
    if (a.stats.emptyCn) errs.push(`空译文 ${a.stats.emptyCn} 句`);
    /* 重复译文分三类（2026-09-17 定型）：
     *   ① 英文本来就复沓（作者故意重复，如进球计数段），中文如实跟着重复 —— 正常；
     *   ② 打了 cnShared 的复用（官方译文整句省略，宁可重复不造翻译）—— 正常，报个数量备查；
     *   ③ 其余 —— 真问题，必须逐条看。 */
    const cnSeen = new Map(), enSeen = new Map();
    a.sentence_pairs.forEach((s, i) => {
      if (!s.cn) return;                       // 空译文已由 emptyCn 单独统计，别在重复组里刷屏
      if (!cnSeen.has(s.cn)) cnSeen.set(s.cn, []);
      cnSeen.get(s.cn).push(i);
      if (!enSeen.has(s.en)) enSeen.set(s.en, new Set());
      enSeen.get(s.en).add(i);
    });
    const flat = a.paras.flatMap(p => p.sentences);
    let dupCn = 0, shared = 0;
    const unexplained = [];
    for (const [cn, idx] of cnSeen) {
      if (idx.length < 2) continue;
      const allShared = idx.some(i => flat[i] && flat[i].cnShared);   // 复用句打了标记，主句不必打
      const enSame = idx.every(i => idx.every(j => enSeen.get(a.sentence_pairs[i].en).has(j)));
      if (allShared || enSame) { dupCn += idx.length - 1; if (allShared) shared += idx.length - 1; }
      else unexplained.push({ cn, idx });
    }
    if (unexplained.length) errs.push(`未解释的重复译文 ${unexplained.length} 组（不是作者复沓、也没打 cnShared）`);
    if (shared) notes.push(`复用译文 ${shared} 处（官方译文省略处，cnShared 已标记）`);
    console.log(`${errs.length ? '✗' : '✓'} ${a.id}  段 ${a.stats.paragraphs} / 句 ${a.stats.sentences} / 英 ${a.stats.words} 词 / 中 ${a.stats.chinese} 字 / ${a.translation_type}`);
    for (const e of errs) { bad++; console.log('    ' + e); }
    for (const n of notes) console.log('    · ' + n);
    for (const u of unexplained.slice(0, 6)) console.log(`      ? ${u.idx.join(',')}  ${u.cn.slice(0, 60)}`);
  }
  return bad;
}

/* ---------- review ---------- */
function cmdReview() {
  const a = picked()[0];
  if (!a) { console.error('未指定 --id'); process.exit(1); }
  const b = buildOne(a);
  const from = Number(val('--from') || 0), to = Number(val('--to') || 1e9);
  if (!b.paras) { console.log('该篇不是 official 通道，无自动对齐可审。'); return; }
  b.paras.forEach((p, i) => {
    if (i < from || i > to) return;
    const b0 = p.block || {};
    console.log(`\n=== 块 ${i}  EN[${b0.enFrom}..${b0.enTo}] ↔ CN[${b0.cnFrom}..${b0.cnTo}] ===`);
    for (const s of p.sentences) {
      console.log('  EN ' + s.en);
      console.log('  CN ' + (s.cn || '<<空>>'));
    }
  });
}

/* ---------- verify：对齐校验（参数扰动 + 释义分诊） ----------
 * 两个**互不相同**的问题，别混：
 *   ① 「块边界该切在哪」—— 用参数扰动法：换一组不改变问题本质的参数重算，边界不动 = 该判断
 *      不依赖调参，可以信；一动就说明该块本身歧义，必须人工定。
 *   ② 「每块对照得准不准」—— 用 ECDICT 释义做**分诊**：这一块英文实词的中文释义，有多少能在这块
 *      中文里找到。**它是发散的（recall 向），不是判据** —— 官方译文常换词，正确块也可能只有 0.3。
 *      它的唯一用途是把 70 块按可疑度排个序，让人只读最差的那十几块，而不是全读。
 * 说清楚：① 稳定 ≠ 语义正确。跑绿了也必须抽读原文。 */
function boundaryKey(paras) { return paras.map(p => `${p.block.enFrom}:${p.block.cnFrom}`); }

function cmdVerify() {
  const a = picked()[0];
  if (!a) { console.error('未指定 --id'); process.exit(1); }
  if (a.translationType !== 'official') { console.log('该篇走「词阅精翻」，句级天然 1:1，无需对齐校验。'); return; }
  const cfgs = [
    ['基线', {}],
    ['块上限 10', { maxBlock: 10 }],
    ['块上限 3', { maxBlock: 3 }],
    ['阈值 ×1.5', { perExtra: 0.33, wLen: 1.5, wUnits: 1.35 }],
  ];
  const runs = cfgs.map(([name, o]) => ({ name, ...buildOne(a, o) }));
  if (runs.some(r => !r.paras)) { console.log('对齐失败（有行未覆盖），先修提取器。'); return; }
  const base = runs[0].paras;
  console.log(`基线块数 ${base.length}（EN 行 ${runs[0].src.length} / CN 行 ${runs[0].dst.length}）`);
  for (let k = 1; k < runs.length; k++) {
    const other = boundaryKey(runs[k].paras);
    const n = Math.min(base.length, other.length);
    const same = boundaryKey(base).slice(0, n).filter((x, i) => other[i] === x).length;
    /* 块数不同时「前 n 块逐位相同」不是合理指标，改用「块起点集合的重合度」 */
    const setA = new Set(boundaryKey(base)), setB = new Set(other);
    const inter0 = [...setA].filter(x => setB.has(x)).length;
    console.log(`${'基线'.padEnd(8)} vs ${runs[k].name.padEnd(8)} 块数 ${String(other.length).padEnd(4)} 起点重合 ${inter0}/${setA.size}（${(inter0 / setA.size * 100).toFixed(1)}%）  前 ${n} 块逐位一致 ${same}`);
  }

  /* 人工审阅队列：按「读者会撞上的毛病」排序，而不是按任何相似度分数。
   * 唯一真实的毛病是**块内英文句多于中文句**时 unitsFor 的兜底把同一句中文填给了多个英文句 ——
   * 读者点两句不同的英文，看到的是同一句中文。这是对齐器解决的**最后一个**问题，也是必读清单。
   *
   * 曾经试过、已废弃的分诊方式（2026-09-17）：
   *   用 ECDICT 释义命中率排序，结果**完全没有判别力** —— 排在最低 0% 的 #60
   *   （EN "she had just arrived home from the hospital when I called her on FaceTime" ↔
   *    CN「在我打电话告诉她我受伤的时候，她才刚刚从医院回到家」）是**完全正确**的对照，
   *   而全篇中位数只有 20%。官方译文习惯换词，命中率低不等于错。**别再引入相似度分诊。** */
  const dupOf = p => {
    const cn = p.sentences.map(s => s.cn);
    const seen = new Map();
    for (const c of cn) if (c) seen.set(c, (seen.get(c) || 0) + 1);
    return [...seen.values()].filter(n => n > 1).reduce((a, b) => a + b - 1, 0);
  };
  const items = base.map((p, idx) => ({ idx, p, dup: dupOf(p), en: p.sentences.length }));
  const dupTotal = items.reduce((a, x) => a + x.dup, 0);
  console.log(`\n译文重复句 ${dupTotal} 处（块内英文句多于中文句时的兜底填充；读者点不同英文会看到同一句中文）`);
  const dupBlocks = items.filter(x => x.dup > 0).sort((a, b) => b.dup - a.dup);
  if (dupBlocks.length) {
    console.log(`\n--- 有重复译文的块（共 ${dupBlocks.length} 块）---`);
    for (const x of dupBlocks.slice(0, 15)) {
      const groups = new Map();
      for (const s of x.p.sentences) if (s.cn) groups.set(s.cn, (groups.get(s.cn) || 0) + 1);
      const rep = [...groups.entries()].filter(([, n]) => n > 1);
      console.log(`\n#${x.idx}  EN[${x.p.block.enFrom}..${x.p.block.enTo}] ↔ CN[${x.p.block.cnFrom}..${x.p.block.cnTo}]  ${x.en} 英句 / 重复 ${x.dup}`);
      for (const [c, n] of rep) console.log(`   ×${n}  ${c.slice(0, 70)}`);
    }
    if (dupBlocks.length > 15) console.log(`\n（还有 ${dupBlocks.length - 15} 块，用 --review --from N --to M 逐块看）`);
  } else console.log('（无）');
}

/* ---------- 接入应用数据（--inject）----------
 * 把 tools/_football/<id>.json 转成 app 阅读管线吃的形态，**幂等地**写进
 * assets/data-articles-extra.js 的 ARTICLES_EXTRA 数组（同 id 替换、其余保留）。
 * 为什么不进 ingest：ingest 的归档闸会把 2026-08 前发布的文章全部扫进 archive，
 * 足球栏目是人工选定的常驻栏目，不走那条闸。改正则必须抄 ingest 的 ARTICLES_EXTRA 捕获组。
 * 注意：cet4_words / key_phrases 只留在 tools/_football/，**不**进应用 —— 用户明确说过
 * 外围功能（单词解释等）后做，现在塞进去只会白白增大首屏数据。 */
function appEntry(art) {
  return {
    id: art.id,
    cat: '足球',
    /* pin：足球栏目是人工选定的常驻专题。TPT 原刊发布于 2017-2023，不带 pin 会被
     * publish.mjs 的 30 天过期闸全部淘汰（--dry 实测「淘汰 4 篇」）。pin 同时豁免栏目配额。 */
    pin: true,
    title: art.title,
    titleZh: art.titleZh,
    source: `The Players' Tribune · ${art.date}`,
    date: art.date,
    minutes: Math.max(2, Math.round(art.stats.words / 130)),   // 与 ingest.mjs 同一口径（words/130）
    url: art.source_url,
    coverImg: art.coverImg,
    player: art.player,
    playerZh: art.playerZh,
    translation_type: art.translation_type,
    official_source_url: art.official_source_url || undefined,
    paras: art.paras,
  };
}

function cmdInject() {
  const file = path.join(ROOT, 'assets', 'data-articles-extra.js');
  const s = fs.readFileSync(file, 'utf8');
  /* 正则抄 ingest.mjs 的 ARTICLES_EXTRA 捕获组（§三 红线：改数据文件的正则必须同口径） */
  const m = s.match(/(const ARTICLES_EXTRA = )(\[[\s\S]*?\n\])(;)/);
  if (!m) throw new Error('data-articles-extra.js 里找不到 ARTICLES_EXTRA 声明（文件结构变了？）');
  const arr = JSON.parse(m[2]);
  const keep = arr.filter(a => !String(a.id).startsWith('fb-'));
  const injected = picked().map(a => appEntry(JSON.parse(fs.readFileSync(path.join(OUT, a.id + '.json'), 'utf8'))));
  const next = [...keep, ...injected];
  const out = s.slice(0, m.index) + m[1] + JSON.stringify(next, null, 2) + m[3] + s.slice(m.index + m[0].length);
  fs.writeFileSync(file, out);
  console.log(`已写入 ${file}：保留 ${keep.length} 篇 + 足球 ${injected.length} 篇 = ${next.length} 篇`);
  for (const a of injected) console.log(`  ${a.id}  ${a.paras.length} 段 / ${a.paras.reduce((n, p) => n + p.sentences.length, 0)} 句`);
}

if (has('--list')) {
  for (const a of ARTICLES) {
    const f = path.join(OUT, a.id + '.json');
    const st = fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')).stats : null;
    console.log(`${a.id}  ${a.translationType.padEnd(12)} ${a.player.padEnd(20)} ${st ? `${st.paragraphs} 段 / ${st.sentences} 句 / 空译 ${st.emptyCn}` : '(未产出)'}`);
  }
} else if (has('--extract')) await cmdExtract();
else if (has('--build')) {
  ensureDir(OUT);
  for (const a of picked()) {
    const art = articleFrom(a);
    fs.writeFileSync(path.join(OUT, a.id + '.json'), JSON.stringify(art, null, 1));
    console.log(`${a.id} → 段 ${art.stats.paragraphs} / 句 ${art.stats.sentences} / 空译 ${art.stats.emptyCn} / CET4 ${art.cet4_words.length}`);
  }
} else if (has('--review')) cmdReview();
else if (has('--covers')) await cmdCovers();
else if (has('--inject')) cmdInject();
else if (has('--verify')) cmdVerify();
else if (has('--check')) process.exitCode = cmdCheck() ? 1 : 0;
else if (has('--phrases')) {
  const a = picked()[0];
  const f = path.join(OUT, a.id + '.json');
  const art = fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : articleFrom(a);
  for (const [k, v] of phraseCandidates(art.sentence_pairs)) console.log(String(v).padStart(3) + '  ' + k);
} else console.log('用法见 tools/football.mjs 顶部注释');

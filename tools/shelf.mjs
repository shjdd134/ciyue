/* 书架通道（tools/shelf.mjs）—— 用户私人书架点名的 8 篇，一期一批入库。
 *
 * 2026-09-26 新增。模式与 james-clear.mjs 完全同构（CATALOG 人工点名 → extract → dump →
 * 人工填 zh/<id>.json → build → covers → inject），差别只在每站一个解析器：
 *   aeon / psyche（同一套， Psyche 与 Aeon 同属 Aeon Media，结构相近）
 *   sivers / bbc / npr / greatergood
 *
 * 站点事实（2026-09-26 抓取实测，原始 HTML 在 tools/_shelf/raw/）：
 *   · Aeon   正文在 <div id="article-content">，段落是裸 <p>，pullquote 是设计元素（跳过），
 *            文中 2 张 <figure>（Flickr 图 + 图注）是真实配图；datePublished 2026-02-24。
 *   · Psyche 正文从 </h1> 后开始：h2 是编者导语（deck），裸 <p> 是正文，
 *            "by <作者>" 段与 "Also by Aeon Media:" 尾块是站务（跳过/截断）。
 *   · Sivers 整页服务端渲染：正文 = 站头之后的 <p> 流，到 "Comments" 标题截断，
 *            尾部 "Copy & share" 是站务；发布日期在站头（2026-08-18）。全文无图。
 *   · BBC    正文 = <div data-component="text-block">；尾部是 newsletter/follow 站务块；
 *            唯一的 image-block 是头图（data-testid="hero-image"，srcSet 里最大 1024xn），
 *            与 og:image 同 ID —— 按 v65 的 sameAsCover 规则只做封面、不重复内嵌。
 *            ★ BBC 域在本网络被 DNS 级拦截（curl/Node fetch 均 000），走本机代理抓取
 *            （系统代理 127.0.0.1:7892，reg query Internet Settings 实测）。
 *   · NPR    正文 = <div id="storytext">，段落是 <p class="left|right">（storytext 里带 class
 *            的 p 只有这两种，图注/推荐框里的 p 无 class）—— 正是过滤 recirculation 推荐框
 *            的现成判据；文内其余 <img> 全是相关文章 inset box 的缩略图，不是本文配图。
 *            头图 og:image 的 brightspotcdn 403（CDN 拦数据中心），但 url= 参数里的
 *            npr-brightspot S3 源文件可直取（10MB 原图，--covers 本地压到 720w）。
 *   · GreaterGood 正文 = <div class="article-body">，h2 是小节标题（head:2），
 *            widget-content 是侧栏推广框（剥掉），"About the Author" 起全是站务（截断）。
 *
 * 栏目：成长 5 篇是常青栏目（publish.mjs EVERGREEN_CATS，免 pin）；
 *       社会 / 科技 / 历史 是本轮新建栏目，文章带 pin:true 豁免 30 天过期闸（同足球先例），
 *       qc F2 的日期闸同样认 pin。
 *
 * 用法：
 *   node tools/shelf.mjs --list
 *   node tools/shelf.mjs --extract [--id <id>]   抓原文 → tools/_shelf/raw/（BBC 走代理）
 *   node tools/shelf.mjs --dump    --id <id>     打印编号句清单（供人工翻译填 zh/<id>.json）
 *   node tools/shelf.mjs --build   [--id <id>]   拼英中 → tools/_shelf/<id>.json
 *   node tools/shelf.mjs --review  --id <id>     打印英中对照
 *   node tools/shelf.mjs --check                 校验产出（空译/重复）
 *   node tools/shelf.mjs --covers  [--id <id>]   下载封面与正文配图 → assets/covers/
 *   node tools/shelf.mjs --inject  [--id <id>]   幂等写入 assets/data-articles-extra.js
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { readDecl, writeDecl, mergeInject } from './lib-text.mjs';
import { plain, splitOriginalSentences } from './lib-people.mjs';
import { cet4Words } from './lib-cet4.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'tools', '_shelf');
const RAW = path.join(OUT, 'raw');
const TMP = path.join(ROOT, '.tmp', 'shelf');
/* 本机代理：BBC 系（bbc.com / ichef.bbci.co.uk / ychef.files.bbci.co.uk）在本网络 DNS 级被拦，
 * curl 不读 Windows 系统代理，必须显式 -x。其余站点直连。 */
const PROXY = 'http://127.0.0.1:7892';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

/* 栏目清单：**只收人工点名的篇目**（RSS 全停后的第一个多站点手工通道）。
 * id 一经发布永不改。coverSrc = 封面直链（og:image，站方 CDN）；date 用原刊发布日期。 */
export const CATALOG = [
  {
    id: 'gr-aeon-instrumentalisation', cat: '成长', parser: 'aeon',
    title: 'Instrumentalisation is making everything a means to an end',
    titleZh: '工具化，正在让一切沦为达成目的的手段',
    url: 'https://aeon.co/essays/instrumentalisation-is-making-everything-a-means-to-an-end',
    date: '2026-02-24', source: 'Aeon',
  },
  {
    id: 'gr-psyche-pretesting', cat: '成长', parser: 'psyche',
    title: 'The ‘secret strategy’ that could boost your ability to learn',
    titleZh: '提升学习能力的「秘密策略」',
    url: 'https://psyche.co/ideas/the-secret-strategy-that-could-boost-your-ability-to-learn',
    date: '2024-11-12', source: 'Psyche',
  },
  {
    id: 'gr-sivers-building-without-predicting', cat: '成长', parser: 'sivers',
    title: 'Building without predicting',
    titleZh: '不靠预测来建造',
    url: 'https://sive.rs/fit',
    date: '2026-08-18', source: 'Derek Sivers',
  },
  {
    id: 'so-bbc-kindness-trolls', cat: '社会', parser: 'bbc', proxy: true,
    title: '‘It feels like a calling’: The internet vigilantes who weaponise kindness',
    titleZh: '「这像一种使命」：把善意变成武器的网络义警',
    url: 'https://www.bbc.com/future/article/20260922-kindness-trolls-the-internet-vigilantes-who-weaponise-kindness',
    date: '2026-09-22', source: 'BBC Future',
  },
  {
    id: 'tech-npr-navier-stokes', cat: '科技', parser: 'npr',
    title: "AI solved one of math's hardest problems. Humanity learned nothing (so far)",
    titleZh: 'AI 解出了数学最难的难题之一，人类（暂时）却一无所获',
    url: 'https://www.npr.org/2026/09/22/nx-s1-5968588/openai-navier-stokes-problem-mathematicians-learn-little',
    date: '2026-09-22', source: 'NPR',
  },
  {
    id: 'hist-bbc-markov-umbrella', cat: '历史', parser: 'bbc', proxy: true,
    title: '‘Eliminate him without trace’: The poison-tipped umbrella that pointed to a KGB murder – on British soil',
    titleZh: '「不留痕迹地除掉他」：那把毒伞，指向发生在英国国土上的一桩 KGB 谋杀',
    url: 'https://www.bbc.com/culture/article/20260904-the-poison-tipped-umbrella-that-pointed-to-a-kgb-murder',
    date: '2026-09-04', source: 'BBC Culture',
  },
  {
    id: 'gr-greatergood-rustout', cat: '成长', parser: 'greatergood',
    title: 'You Might Be Experiencing Rustout, Not Burnout, at Work',
    titleZh: '你在工作中经历的也许不是倦怠，而是「生锈」',
    url: 'https://greatergood.berkeley.edu/article/item/you_might_be_experiencing_rustout_not_burnout_at_work',
    date: '2026-09-09', source: 'Greater Good',
  },
  {
    id: 'gr-psyche-relationship-ambivalence', cat: '成长', parser: 'psyche',
    title: 'What does it mean to have relationship ambivalence?',
    titleZh: '对一段关系既爱又厌，意味着什么？',
    url: 'https://psyche.co/ideas/what-does-it-mean-to-have-relationship-ambivalence',
    date: '2026-09-22', source: 'Psyche',
  },
];

const args = process.argv.slice(2);
const has = f => args.includes(f);
const val = f => { const i = args.indexOf(f); return i > -1 ? args[i + 1] : null; };
const picked = () => { const id = val('--id'); return id ? CATALOG.filter(a => a.id === id) : CATALOG; };
const ensureDir = d => fs.mkdirSync(d, { recursive: true });

/* ---------- 通用小件 ---------- */
const hanzi = s => (String(s || '').match(/[\u4e00-\u9fff]/g) || []).length;
const clean = s => plain(
  String(s || '')
    /* Aeon 首字下沉：首字母包在独立 <span> 里，先拼回去再剥标签，否则 "What" 被剥成 "W hat" */
    .replace(/<span[^>]*>\s*([A-Za-z])\s*<\/span\s*>/gi, '$1')
).replace(/\s+/g, ' ').trim();

/** 从 pos（已越过 <div 开标签的 >）向后找配对 </div>，返回其结束位置 */
function balancedClose(html, pos) {
  let d = 1;
  for (let k = pos; k < html.length; k++) {
    if (html.startsWith('<div', k)) { d++; k += 3; }
    else if (html.startsWith('</div>', k)) { d--; if (d === 0) return k + 6; k += 5; }
  }
  throw new Error('balancedClose: 没找到配对的 </div>');
}

/** 移除所有带 bucketwrap class 的平衡 div（NPR 的头图桶 / 相关文章 inset box / 系列导航都在里面） */
function removeBuckets(seg) {
  let out = seg, i;
  while ((i = out.search(/<div[^>]*class="[^"]*bucketwrap[^"]*"/)) >= 0) {
    const openEnd = out.indexOf('>', i);
    out = out.slice(0, i) + ' ' + out.slice(balancedClose(out, openEnd + 1));
  }
  return out;
}

/** 段落安全正则：<p 必须后跟空白或 > —— 裸写 <p(...)> 会匹配 <path>，把 SVG 吞进正文
 * （2026-09-26 实测 NPR 因此只剩 7 行系列导航）。 */
const P_RE = /<p(\s[^>]*)?>([\s\S]*?)<\/p\s*>/gi;

/** 行切句 + 人名缩写修复：splitOriginalSentences 会把 "David S. Smith" 的缩写句点当句界，
 * 切成 "…with David S." / "Smith examines…"（GG rustout 篇实测）。句尾是单个大写字母+. 且
 * 下一句以大写开头时并回（负向断言排除 U.S. 这类多段缩写）。 */
const splitLine = en => {
  const ss = splitOriginalSentences(en);
  const out = ss.length ? [...ss] : [en];
  for (let i = 0; i + 1 < out.length; i++) {
    const cur = out[i].trim(), nxt = (out[i + 1] || '').trim();
    if (/(?<!\.)[A-Z]\.$/.test(cur) && /^[A-Z]/.test(nxt)) out.splice(i, 2, cur + ' ' + nxt);
  }
  return out;
};

/* ---------- 解析器：每站一个，返回 { lines:[{tag,en}], images:[{url,cap}], meta } ----------
 * tag ∈ paragraph|heading|item|caption；heading 的层级记在 lvl（→ paras[i].head）。 */

function parseAeon(html) {
  const i0 = html.indexOf('id="article-content"');
  if (i0 < 0) throw new Error('aeon: 找不到 #article-content');
  const cover = (html.match(/property="og:image"[^>]*content="([^"]+)"/) || [])[1]?.replace(/&amp;/g, '&') || '';
  const date = (html.match(/"datePublished"\s*:\s*"([^"]+)"/) || [])[1]?.slice(0, 10) || '';
  let seg = html.slice(i0)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<aside\b[\s\S]*?<\/aside\s*>/gi, ' ')
    .replace(/<audio\b[\s\S]*?<\/audio\s*>/gi, ' ');
  /* figure 换成哨兵留在原位，段落扫描时顺带记录「图在第几段之后」——注入时按此插 img 段 */
  const images = [];
  seg = seg.replace(/<figure[^>]*>([\s\S]*?)<\/figure\s*>/gi, (m, inner) => {
    const src = (inner.match(/src="([^"]+)"/) || [])[1]?.replace(/&amp;/g, '&');
    const cap = clean((inner.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption\s*>/i) || [''])[1]);
    if (src) { images.push({ url: src, cap }); return `\n<!--SHELF_FIG${images.length - 1}-->\n`; }
    return ' ';
  });
  const lines = [];
  for (const m of seg.matchAll(/<p(\s[^>]*)?>([\s\S]*?)<\/p\s*>|<!--SHELF_FIG(\d+)-->/gi)) {
    if (m[3] != null) { images[Number(m[3])].afterPara = lines.length; continue; }
    if (/pullquote|font-meta|text-grey/.test(m[1] || '')) continue;      /* pullquote 是设计元素 */
    const t = clean(m[2]);
    if (!t) continue;
    lines.push({ tag: 'paragraph', en: t });
  }
  /* 头部「N minute listen」是收听时长小字；尾部：相关 essays 卡片网格从「essay <栏目>」标签行起
   * （卡片 = 标题/标签/导语/作者 四行一组，砍掉标签行及其后全部，多砍前面的标题行） */
  const gridAt = lines.findIndex(l => /^essay [A-Z]/.test(l.en));
  const bodyEnd = gridAt > 0 ? gridAt - 1 : lines.length;
  const out = [];
  for (const l of lines.slice(0, bodyEnd)) {
    if (/^\d+ minute listen$/i.test(l.en)) continue;
    if (/^Updates on everything new at Aeon|^Sign up to our newsletter|^Aeon is published by|^Follow Aeon/.test(l.en)) break;
    if (/^(?:Listen|Share|Print)\b/.test(l.en)) continue;
    out.push(l);
  }
  return { lines: out, images, meta: { date, cover } };
}

function parsePsyche(html) {
  const cover = (html.match(/property="og:image"[^>]*content="([^"]+)"/) || [])[1]?.replace(/&amp;/g, '&') || '';
  const date = (html.match(/"datePublished"\s*:\s*"([^"]+)"/) || [])[1]?.slice(0, 10) || '';
  const h1e = html.indexOf('</h1>');
  if (h1e < 0) throw new Error('psyche: 找不到 </h1>');
  let seg = html.slice(h1e)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<aside\b[\s\S]*?<\/aside\s*>/gi, ' ')
    .replace(/<figure[^>]*>[\s\S]*?<\/figure\s*>/gi, ' ');      /* newsletter 订阅框 */
  /* deck（h2）是编者导语，属编辑内容，作为首行保留 */
  const deck = clean((seg.match(/<h2[^>]*>([\s\S]*?)<\/h2\s*>/i) || [''])[1]);
  const lines = [];
  if (deck) lines.push({ tag: 'paragraph', en: deck });
  let hitFooter = false;
  /* 正文除了 <p> 还有 <ol>/<ul> 列表（"two helpful conditions are present:" 后的清单，
   * 2026-09-26 覆盖对账抓到的真缺口），按文档序合并扫描 */
  for (const m of seg.matchAll(/<ol[^>]*>([\s\S]*?)<\/ol\s*>|<ul[^>]*>([\s\S]*?)<\/ul\s*>|<p(\s[^>]*)?>([\s\S]*?)<\/p\s*>/gi)) {
    if (m[1] != null || m[2] != null) {
      const inner = m[1] != null ? m[1] : m[2];
      for (const li of inner.matchAll(/<li[^>]*>([\s\S]*?)<\/li\s*>/gi)) {
        const t = clean(li[1]);
        if (!t) continue;
        if (/^is\s+/.test(t)) continue;
        lines.push({ tag: 'item', en: t });
      }
      continue;
    }
    const pattr = m[3] || '';
    if (/pullquote|font-meta/.test(pattr)) continue;
    const t = clean(m[4]);
    if (!t) continue;
    /* 站务小行（头图 credit / 收听模块 / 相关文章卡署名）—— 前两类跳过，卡署名 = 到尾了 */
    if (/^(?:Photo by\s|Courtesy\s|Author Bio\b|Listen to this article$|\d+ minute listen$)/i.test(t)) continue;
    if (/font-medium/.test(pattr) && /^by\s/.test(t)) { hitFooter = true; break; }
    if (/^(?:Also by Aeon Media|A magazine to help you understand|© Aeon Media|Bluesky Facebook SECTIONS|Explore more$)/i.test(t)) { hitFooter = true; break; }
    if (/^by\s+\S/.test(t) && lines.length <= 1) continue;             /* 文章署名段（紧跟 deck） */
    /* 作者简介盒（"Francesca Righetti is associate professor…"）：整盒行带 Author Bio 前缀，
     * 碎片行的名字在独立元素里所以行首是小写 "is ..." —— 正文段不可能以小写 "is" 开头 */
    if (/^Author Bio\b/.test(t) || /^is\s+/.test(t)) continue;
    if (hanzi(t) > 0) continue;                                        /* 防御：中文站务块 */
    lines.push({ tag: 'paragraph', en: t });
  }
  if (!hitFooter) console.error('  ⚠ psyche: 没找到「Also by Aeon Media」尾块，请人工核对尾部');
  return { lines, images: [], meta: { date, cover } };
}

function parseSivers(html) {
  const cover = (html.match(/property="og:image"[^>]*content="([^"]+)"/) || [])[1]?.replace(/&amp;/g, '&') || '';
  /* 正文 = 站头之后到 Comments 标题之间的 <p> 流（2026-09-26 实测 36 条，尾部有站务） */
  const ci = html.search(/<h2[^>]*>[^<]*Comments/i);
  if (ci < 0) throw new Error('sivers: 找不到 Comments 边界');
  const seg = html.slice(0, ci);
  const lines = [];
  /* 正文除了 <p>/<ol>/<ul> 还有 <blockquote>（格言 "All buildings are predictions…" 与
   * Stewart Brand 书引，2026-09-26 覆盖对账抓到的真缺口），按文档序合并扫描 */
  for (const m of seg.matchAll(/<blockquote[^>]*>([\s\S]*?)<\/blockquote\s*>|<ol[^>]*>([\s\S]*?)<\/ol\s*>|<ul[^>]*>([\s\S]*?)<\/ul\s*>|<p(\s[^>]*)?>([\s\S]*?)<\/p\s*>/gi)) {
    if (m[1] != null) {
      const t = clean(m[1]);
      if (t) lines.push({ tag: 'paragraph', en: t });
      continue;
    }
    if (m[2] != null || m[3] != null) {
      const inner = m[2] != null ? m[2] : m[3];
      for (const li of inner.matchAll(/<li[^>]*>([\s\S]*?)<\/li\s*>/gi)) {
        const t = clean(li[1]);
        if (t) lines.push({ tag: 'item', en: t });
      }
      continue;
    }
    const t = clean(m[5] || '');
    if (!t) continue;
    lines.push({ tag: 'paragraph', en: t });
  }
  /* 头部是面包屑（"articles → saying no : Building without predicting"）+ 站务行；
   * 正文从「On a podcast」这类真段落起：剥掉面包屑/日期/导航碎片 —— 判据：正文段必有句末标点
   * 或长度 > 40。尾部剥 "Copy & share" 站务。 */
  const out = lines
    .filter(l => !/^saying no\b/i.test(l.en) && !/^articles\b/i.test(l.en))
    .filter(l => !/Building without predicting \d{4}-\d{2}-\d{2}/.test(l.en))
    .filter(l => !/^Copy & share/i.test(l.en))
    .filter(l => !/^©\s/.test(l.en))
    .filter(l => !/^(?:Subscribe|Get my|Join \d|More posts|Prev|Next)\b/i.test(l.en));
  /* 头两条若仍是碎片（< 40 字符且无句末标点）剥掉 */
  while (out.length && out[0].en.length < 40 && !/[.!?]$/.test(out[0].en)) out.shift();
  return { lines: out, images: [], meta: { date: '', cover } };
}

const BBC_TAIL = /^For more (science|stories|TV|film|Culture|insights|TV shows)|^Sign up to|^If you liked this story|^Follow us on|^Never miss|^Liked this|^--\s*$|^Related|^More like this|^•|^More like/i;
function parseBbc(html) {
  const cover = (html.match(/property="og:image"[^>]*content="([^"]+)"/) || [])[1]?.replace(/&amp;/g, '&') || '';
  const lines = [];
  const images = [];
  const m0 = html.indexOf('<main');
  let scope = m0 > -1 ? html.slice(m0) : html;
  /* image-block 内部套多层 div，</div> 截不住：先按 </figure> 整块摘出来。
   * 图 URL 取 srcSet 里最大的 ichef jpg；BBC 的 image-block 就是头图（hero-image），
   * 与 og:image 同 ID —— 按 v65 的 sameAsCover 规则只做封面，不重复内嵌。 */
  scope = scope.replace(/<div data-component="image-block"[^>]*>([\s\S]*?)<\/figure\s*>/gi, (m, inner) => {
    const srcset = inner.match(/srcSet="([^"]+)"/)?.[1] || inner.match(/srcset="([^"]+)"/)?.[1] || '';
    const best = srcset.split(',').map(s => s.trim().split(/\s+/)[0]).filter(u => /ichef\.bbci\.co\.uk/.test(u) && !/\.webp$/.test(u)).at(-1)
      || srcset.split(',').map(s => s.trim().split(/\s+/)[0]).at(-1) || '';
    const cap = clean((inner.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption\s*>/i) || [''])[1]);
    if (best) {
      const id = u => (u.match(/\/([a-z0-9]{8,})\.(?:jpe?g|webp|png)/i) || [])[1] || '';
      images.push({ url: best, cap, sameAsCover: !!cover && id(best) === id(cover) });
    }
    return ' ';
  });
  for (const m of scope.matchAll(/<div data-component="text-block"[^>]*>([\s\S]*?)<\/div\s*>/g)) {
    const t = clean(m[1]);
    if (!t || BBC_TAIL.test(t)) continue;
    lines.push({ tag: 'paragraph', en: t });
  }
  if (!lines.length) throw new Error('bbc: 一个 text-block 都没提到（页面改版？）');
  return { lines, images, meta: { date: '', cover } };
}

function parseNpr(html) {
  const og = (html.match(/property="og:image"[^>]*content="([^"]+)"/) || [''])[1]?.replace(/&amp;/g, '&') || '';
  /* og:image 走 brightspotcdn（本机 403），url= 参数里的 S3 源文件可直取 */
  let cover = og;
  const s3 = og.match(/url=([^&]+)/);
  if (s3) cover = decodeURIComponent(s3[1]);
  const s0 = html.indexOf('id="storytext"');
  if (s0 < 0) throw new Error('npr: 找不到 #storytext');
  const openStart = html.lastIndexOf('<div', s0);
  const seg = removeBuckets(html.slice(openStart, balancedClose(html, openStart + 4)));
  const lines = [];
  const re = /<p(\s[^>]*)?>([\s\S]*?)<\/p\s*>|<h([23])(\s[^>]*)?>([\s\S]*?)<\/h\3\s*>/gi;
  for (const m of seg.matchAll(re)) {
    if (m[3]) {
      const t = clean(m[5]);
      if (t) lines.push({ tag: 'heading', lvl: Number(m[3]), en: t });
      continue;
    }
    const t = clean(m[2]);
    if (!t) continue;
    if (/^(?:Become an NPR sponsor|Support comes from|hide caption|Sign up for|Copyright)/i.test(t)) continue;
    if (hanzi(t) > 0) continue;
    lines.push({ tag: 'paragraph', en: t });
  }
  if (!lines.length) throw new Error('npr: storytext 空（页面改版？）');
  return { lines, images: [], meta: { date: '', cover } };
}

function parseGreaterGood(html) {
  const cover = (html.match(/property="og:image"[^>]*content="([^"]+)"/) || [])[1]?.replace(/&amp;/g, '&') || '';
  const a0 = html.indexOf('article-body');
  if (a0 < 0) throw new Error('greatergood: 找不到 article-body');
  let seg = html.slice(a0);
  const cut = seg.search(/<h2[^>]*>\s*About the Author/i);
  if (cut < 0) throw new Error('greatergood: 找不到 About the Author 边界');
  seg = seg.slice(0, cut);
  /* 侧栏推广框：结构是 <ul class="widgets"><li class="widget-…">…</li></ul>，整块剥离
   * （此前按 <!-- /.widget-xxx --> 注释逐块剥，只剥掉了 widget-image，正文里漏进推广行） */
  seg = seg.replace(/<ul class="widgets"[^>]*>[\s\S]*?<\/ul\s*>/gi, ' ');
  const lines = [];
  const re = /<p(\s[^>]*)?>([\s\S]*?)<\/p\s*>|<h([23])(\s[^>]*)?>([\s\S]*?)<\/h\3\s*>/gi;
  for (const m of seg.matchAll(re)) {
    if (m[3]) {
      const t = clean(m[5]);
      if (t) lines.push({ tag: 'heading', lvl: Number(m[3]), en: t });
      continue;
    }
    const t = clean(m[2]);
    if (!t || /^Advertisement$/i.test(t) || hanzi(t) > 0) continue;
    lines.push({ tag: 'paragraph', en: t });
  }
  return { lines, images: [], meta: { date: '', cover } };
}

const PARSERS = { aeon: parseAeon, psyche: parsePsyche, sivers: parseSivers, bbc: parseBbc, npr: parseNpr, greatergood: parseGreaterGood };

/* ---------- 抓取（curl；BBC 走本机代理） ---------- */
function curl(url, { proxy = false, dest, accept } = {}) {
  const argv = ['-sL', '--max-time', '90', '-A', UA, '-w', '%{http_code}'];
  if (proxy) argv.push('-x', PROXY);
  if (accept) argv.push('-H', 'Accept: ' + accept);
  argv.push('-o', dest, url);
  const out = execFileSync('curl', argv, { encoding: 'utf8' });
  const code = Number(out.trim().split(/\s+/).at(-1));
  if (code !== 200) throw new Error(`HTTP ${code}  ${url}`);
}

async function cmdExtract() {
  ensureDir(RAW);
  for (const a of picked()) {
    const dest = path.join(RAW, a.id + '.en.html');
    curl(a.url, { proxy: !!a.proxy, dest });
    const html = fs.readFileSync(dest, 'utf8');
    const { lines, images, meta } = PARSERS[a.parser](html);
    const sentences = lines.flatMap(l => splitLine(l.en));
    const words = (lines.map(l => (l.en.match(/[A-Za-z]+(?:['’][A-Za-z]+)?/g) || []).length).reduce((x, y) => x + y, 0));
    const date = a.date || meta.date;
    const pack = { id: a.id, url: a.url, fetched: new Date().toISOString(), date, cover: meta.cover, lines, images, sentences, words };
    fs.writeFileSync(path.join(RAW, a.id + '.en.json'), JSON.stringify(pack, null, 1));
    console.log(`${a.id}  行 ${lines.length} / 句 ${sentences.length} / 词 ${words} / 图 ${images.length} · date ${date}`);
    console.log(`   首行: ${lines[0].en.slice(0, 70)}`);
    console.log(`   末行: ${lines.at(-1).en.slice(0, 70)}`);
  }
}

const readRaw = id => JSON.parse(fs.readFileSync(path.join(RAW, id + '.en.json'), 'utf8'));

/* ---------- --dump：编号句清单（翻译按编号填 zh/<id>.json 纯中文串数组） ---------- */
function cmdDump() {
  const a = picked()[0];
  const en = readRaw(a.id);
  let n = 0;
  en.lines.forEach((l, i) => {
    const ss = splitLine(l.en);
    console.log(`---- 行 ${i + 1} [${l.tag}${l.lvl || ''}] ----`);
    for (const s of ss) console.log(`  [${String(++n).padStart(3, '0')}] ${s}`);
  });
  if (en.images.length) en.images.forEach((im, i) => console.log(`IMG ${i + 1}（第 ${im.afterPara ?? '?'} 段后）: ${im.url}\n  CAP: ${im.cap}`));
}

/* ---------- build ---------- */
function buildOne(a) {
  const en = readRaw(a.id);
  const zf = path.join(OUT, 'zh', a.id + '.json');
  const cnList = fs.existsSync(zf) ? JSON.parse(fs.readFileSync(zf, 'utf8')) : null;
  const flat = [];
  for (const l of en.lines) for (const s of splitLine(l.en)) flat.push(s);
  const paras = en.lines.map(l => {
    const ss = splitLine(l.en).map(s => ({ en: s, cn: '' }));
    return l.tag === 'heading' ? { head: l.lvl, sentences: ss } : { sentences: ss };
  });
  if (cnList) {
    if (!Array.isArray(cnList) || cnList.length !== flat.length) {
      throw new Error(`${a.id}: 译文 ${Array.isArray(cnList) ? cnList.length : '?'} 句 ≠ 提取 ${flat.length} 句，先对齐句数再构建`);
    }
    let k = 0;
    for (const p of paras) for (const s of p.sentences) { s.cn = cnList[k++]; s.cnEdited = true; }
  }
  /* 图注译文：zh/<id>.captions.json（可选，按图序的字符串数组或 {索引: 译文}） */
  const cf = path.join(OUT, 'zh', a.id + '.captions.json');
  const capRaw = fs.existsSync(cf) ? JSON.parse(fs.readFileSync(cf, 'utf8')) : {};
  const images = en.images.map((im, i) => ({ ...im, capCn: Array.isArray(capRaw) ? (capRaw[i] || '') : (capRaw[i] || '') }));
  return { en, paras, images };
}

export function articleFrom(a) {
  const b = buildOne(a);
  const flat = b.paras.flatMap(p => p.sentences);
  const extOf = u => (u.match(/\.(jpe?g|webp|png)(?:$|\?)/i) || [, 'jpg'])[1].replace('jpeg', 'jpg');
  return {
    id: a.id, cat: a.cat,
    title: a.title, titleZh: a.titleZh,
    source_url: a.url,
    date: a.date || b.en.date,
    coverImg: fs.existsSync(coverPath(a.id)) ? 'assets/covers/' + a.id + '.jpg' : null,
    inlineImages: b.images.map((im, i) => ({
      img: 'assets/covers/' + a.id + '-' + (i + 1) + '.' + extOf(im.url),
      cap: im.cap || '', capCn: im.capCn || '',
      afterPara: im.afterPara ?? b.paras.length,
      sameAsCover: !!im.sameAsCover,
    })),
    translation_type: 'ciyue_edited',
    stats: {
      paragraphs: b.paras.length,
      sentences: flat.length,
      words: b.en.words,
      chinese: flat.reduce((n, s) => n + hanzi(s.cn), 0),
      emptyCn: flat.filter(s => !s.cn).length,
    },
    sentence_pairs: flat.map(s => ({ en: s.en, cn: s.cn })),
    paras: b.paras,
    cet4_words: cet4Words(b.paras),
  };
}

/* ---------- 校验 / review ---------- */
function cmdCheck() {
  const files = fs.existsSync(OUT) ? fs.readdirSync(OUT).filter(f => /^(gr|so|tech|hist)-/.test(f) && f.endsWith('.json')) : [];
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
    console.log(`${errs.length ? '✗' : '✓'} ${a.id}  ${a.cat}  段 ${a.stats.paragraphs} / 句 ${a.stats.sentences} / 英 ${a.stats.words} 词 / 中 ${a.stats.chinese} 字 / CET4 ${a.cet4_words.length}`);
    for (const e of errs) { bad++; console.log('    ' + e); }
  }
  return bad;
}

function cmdReview() {
  const a = picked()[0];
  const f = path.join(OUT, a.id + '.json');
  if (!fs.existsSync(f)) { console.log(`还没有 ${a.id} 的 build 产物；编号句清单看 --dump。`); return; }
  const art = JSON.parse(fs.readFileSync(f, 'utf8'));
  const from = Number(val('--from') || 0), to = Number(val('--to') || 1e9);
  let k = 0;
  art.paras.forEach((p, pi) => {
    const nums = p.sentences.map(() => ++k);
    if (nums[0] - 1 > to || nums[nums.length - 1] < from) return;
    console.log(`\n=== 行 ${pi + 1}${p.head ? ` [head${p.head}]` : ''} ===`);
    for (const s of p.sentences) {
      console.log('  EN ' + s.en);
      console.log('  CN ' + (s.cn || '<<空>>'));
    }
  });
}

/* ---------- 封面与正文配图 ---------- */
const coverPath = id => path.join(ROOT, 'assets', 'covers', id + '.jpg');

/** 下载一张图到 assets/covers/<name>；>300KB 时报出来（qc 封面闸 250KB，交给 img-post 压） */
function grab(url, name, { proxy = false } = {}) {
  const dest = path.join(ROOT, 'assets', 'covers', name);
  if (fs.existsSync(dest)) { console.log(`  ${name} 已存在，跳过`); return dest; }
  const tmp = dest + '.part';
  curl(url, { proxy, dest: tmp });
  const buf = fs.readFileSync(tmp);
  if (buf.length < 5000) { fs.unlinkSync(tmp); throw new Error(`只有 ${buf.length} 字节，疑似占位图：${url}`); }
  fs.renameSync(tmp, dest);
  console.log(`  ✓ ${name}  ${(buf.length / 1024).toFixed(0)}KB`);
  return dest;
}

function cmdCovers() {
  ensureDir(path.join(ROOT, 'assets', 'covers'));
  for (const a of picked()) {
    const raw = readRaw(a.id);
    console.log(`${a.id}:`);
    if (raw.cover) {
      try { grab(raw.cover, a.id + '.jpg', { proxy: !!a.proxy }); }
      catch (e) { console.log(`  封面下载失败：${String(e.message).slice(0, 100)}`); }
    } else console.log('  raw 里没有 cover URL');
    /* 正文配图（BBC 的与封面同 ID，sameAsCover 规则：跳过） */
    const coverId = (raw.cover.match(/\/([a-z0-9]+)\.(jpg|webp)/i) || [])[1] || '';
    raw.images.forEach((im, i) => {
      const m = im.url.match(/\/([a-z0-9]+)\.(jpg|jpeg|webp|png)/i);
      if (coverId && m && m[1].toLowerCase() === coverId.toLowerCase()) { console.log(`  配图 ${i + 1} 与封面同 ID，跳过（sameAsCover）`); return; }
      const ext = (im.url.match(/\.(jpe?g|webp|png)(?:$|\?)/i) || [, 'jpg'])[1].replace('jpeg', 'jpg');
      try { grab(im.url, `${a.id}-${i + 1}.${ext}`, { proxy: !!a.proxy }); }
      catch (e) { console.log(`  配图 ${i + 1} 下载失败：${String(e.message).slice(0, 100)}`); }
    });
  }
}

/* ---------- 注入 app 数据 ----------
 * 社会/科技/历史不是常青栏目，必须 pin:true 豁免 30 天过期闸与配额（同足球先例，qc F2 认）。
 * 成长是常青栏目，不需要 pin。正文配图（inlineImages）按 afterPara 插 img 段。 */
const PINNED_CATS = new Set(['社会', '科技', '历史']);

function appEntry(a, art) {
  const entry = {
    id: art.id,
    cat: art.cat,
    title: art.title,
    titleZh: art.titleZh,
    source: `${a.source} · ${art.date}`,
    date: art.date,
    minutes: Math.max(2, Math.round(art.stats.words / 130)),
    url: art.source_url,
    coverImg: art.coverImg,
    translation_type: art.translation_type,
    paras: art.paras.map(p => ({ ...(p.head ? { head: p.head } : {}), sentences: p.sentences.map(s => ({ en: s.en, cn: s.cn })) })),
  };
  if (PINNED_CATS.has(art.cat)) entry.pin = true;
  for (const im of art.inlineImages || []) {
    if (im.sameAsCover) continue;
    const at = entry.paras.findIndex((p, i) => i >= (im.afterPara || 0) && p.sentences);
    const pos = at < 0 ? entry.paras.length : at;
    entry.paras.splice(pos, 0, { img: im.img, cap: im.cap || '', capCn: im.capCn || '' });
  }
  return entry;
}

function cmdInject() {
  const file = process.env.WORDLENS_SHELF_EXTRA || path.join(ROOT, 'assets', 'data-articles-extra.js');
  const decl = readDecl(file, 'ARTICLES_EXTRA');
  if (!decl) throw new Error('data-articles-extra.js 里找不到 ARTICLES_EXTRA 声明（文件结构变了？）');
  const targets = picked();
  if (!targets.length) { console.error('--id 没有匹配到任何清单里的文章'); process.exit(1); }
  const injected = targets.map(a => appEntry(a, JSON.parse(fs.readFileSync(path.join(OUT, a.id + '.json'), 'utf8'))));
  const next = mergeInject(decl.value, injected);
  writeDecl(file, 'ARTICLES_EXTRA', next);
  const added = next.length - decl.value.length;
  console.log(`已写入 ${file}：原 ${decl.value.length} 篇 → ${next.length} 篇（新增 ${added}、原位替换 ${targets.length - added}）`);
  for (const a of injected) console.log(`  ${a.id}  ${a.cat}  ${a.paras.length} 段 / ${a.paras.reduce((n, p) => n + (p.sentences ? p.sentences.length : 0), 0)} 句${a.pin ? ' / pin' : ''}`);
}

if (has('--list')) {
  for (const a of CATALOG) {
    const f = path.join(OUT, a.id + '.json');
    const st = fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')).stats : null;
    const rawf = path.join(RAW, a.id + '.en.json');
    const raw = fs.existsSync(rawf) ? JSON.parse(fs.readFileSync(rawf, 'utf8')) : null;
    console.log(`${a.id}  ${a.cat.padEnd(3)} ${st ? `产出 段 ${st.paragraphs} / 句 ${st.sentences} / 空译 ${st.emptyCn}` : raw ? `raw 行 ${raw.lines.length} / 句 ${raw.sentences.length} / 词 ${raw.words}` : '(未提取)'}`);
  }
} else if (has('--extract')) await cmdExtract();
else if (has('--dump')) cmdDump();
else if (has('--build')) {
  ensureDir(OUT);
  for (const a of picked()) {
    const art = articleFrom(a);
    fs.writeFileSync(path.join(OUT, a.id + '.json'), JSON.stringify(art, null, 1));
    console.log(`${a.id} → ${art.cat} 段 ${art.stats.paragraphs} / 句 ${art.stats.sentences} / 空译 ${art.stats.emptyCn} / CET4 ${art.cet4_words.length}`);
  }
} else if (has('--covers')) cmdCovers();
else if (has('--review')) cmdReview();
else if (has('--inject')) cmdInject();
else if (has('--check')) process.exitCode = cmdCheck() ? 1 : 0;
else console.log('用法见 tools/shelf.mjs 顶部注释');

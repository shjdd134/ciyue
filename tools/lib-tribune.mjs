/* 足球栏目 · The Players' Tribune 通道（原刊全文）
 *
 * 为什么单开一个 lib 而不是复用 lib-people：
 *   lib-people 的 extractProfile 把「取正文」和「按偏好名单打分」焊在一起
 *   （sourceFor 白名单 + personFor + scoreProfile），足球篇既不在人物来源白名单里，
 *   也不需要人物亲和度打分，硬套会把整条链路带歪。
 *
 * 但**只复用了不该重写的那部分**——这是本仓库吃过两次亏的地方（见 lib-tree.mjs：
 *   「lib-text 的 ABBR 缩写表，lib-people 自己抄了一份还漏了」）：
 *     · 文本归一化 plain() / 实体解码   → 直接 import lib-people
 *     · 原文分句 splitOriginalSentences → 直接 import lib-people（它内部就用 lib-text 的 ABBR）
 *   本站独有的只有「怎么找正文容器」「怎么认广告/导航」——那是逐站配置，不是第二把尺子。
 *
 * TPT 的页面事实（2026-09-17 实测，4 篇一致）：
 *   · 正文字段在最大那个 <article> 里；页面上另有 4 个 <article>，都是「相关故事」卡片，
 *     每个只有 1 段，取最大即可（不是取第一个）。
 *   · **真正的行结构是 <br>，不是 <p>**：De Bruyne 篇 21 个 <p> 里塞了 212 个 <br>。
 *     按 <p> 读会得到 19 个「巨型段落」（平均 200 词），阅读体验和原刊差得远；
 *     按 <br> 拆开是 127 行，正好对上官方中文版的 120 行。**行才是段落单位。**
 *   · 署名两行（作者 / 球队）的 class 是 authorText_* / byline_*，且被包在 <a> 里 ——
 *     正文段落在 <div> 里。所以「祖先里有 <a>」是一条比 class 哈希更抗改版的判据。
 */

import { plain, attrs, canonical, splitOriginalSentences } from './lib-people.mjs';

export const TRIBUNE_HOST = 'www.theplayerstribune.com';

/* 图片主机。TPT 归 Minute Media，图走 images2.minutemediacdn.com；
 * og:image 有时落在 images.minutemediacdn.com（无 2）。 */
export const TRIBUNE_IMAGE_HOSTS = [
  'images2.minutemediacdn.com',
  'images.minutemediacdn.com',
  'images1.minutemediacdn.com',
];

/* 广告 / 导航 / 订阅块。**只认明确无歧义的词**：正文是球员自述，会出现
 * "subscribe"（订阅我的频道）之类的正常用法，所以不套用通用短段过滤。 */
const AD_OR_NAV = /^(?:advertisement|sponsored(?: content)?|subscribe(?: now| today)?|sign up(?: for| now)?|newsletter|related stories|related articles|more from|read more|read next|you may also like|watch now|share this|premier partner|presented by|follow us|download the app|terms of use|privacy policy|cookie)\b/i;

/** 署名卡：class 里带这些片段的 <p> 一律不是正文（哈希会随改版变，但语义词通常保留） */
const BYLINE_CLASS = /(?:authorText|byline|date_|tagStyle_1anwm6i)/i;

/* 语言切换提示：TPT 会在正文最前面插一行「Para ler em português, clique aqui.」，
 * 它指向同一篇的葡语/西语版，**不是作者写的开场白**。De Bruyne 篇没有这行、Ronaldo 篇有，
 * 所以不能靠「第一行总是正文」来偷懒。 */
const LANG_NOTICE = /^(?:(?:para\s+ler|para\s+leer|leia|leer)\s+em\s+\w+|to\s+read\s+(?:this\s+)?in\s+\w+|read\s+(?:this\s+)?in\s+\w+)\b/i;

/* 纯省略号行：Piqué 篇用它做段子节拍 —— 单独一段「….」，下一段紧接着
 * 「…. No, come on, of course I'm joking!」，删掉节拍笑话就断了。
 * 所以这类行**必须保留**，但它没有英文字母，会被「必须有英文字符」那条筛掉，这里单开口子。 */
const BEAT_ONLY = /^[.…·\s]+$/;

/* 去标签残留的空格：`<a>clique aqui</a>.` 剥标签后会得到 "clique aqui ."。
 * 只收拾「标点前多出来的空格」，不动正文里的正常空格。 */
/* 尾部「?” ?」这类原文排版残留：去空格后会变成 ”?。只修「问/叹号 + 引号 + 同号」这一种
 * 实测出现过的形状（→ ?”），裸的 ?? / !! 不动 —— 那可能是作者本来的写法，别过度清洗。
 * …. 的省略号是有意的节奏，更不动 —— 皮克篇的 "…." 单独成行是喜剧节奏。 */
const tidyEn = s => s
  .replace(/\s+([,.;:!?…])/g, '$1')
  .replace(/\s+([’”])/g, '$1')
  .replace(/([!?])”\1/g, '$1”')
  .trim();

/* 中文侧的空格脏数据：官方中文版里夹着半角空格（"当然了， 当你读到…" / "Raheem和我"）。
 * 只做两件安全的事：① 去掉 CJK 标点前后的空格 ② 合并连续空白。
 * **不在汉字与拉丁词之间补空格** —— 那是发布层 `spaceCJK()` 的活，这里补了会变成两次加工。 */
const tidyZh = s => s
  .replace(/\s+/g, ' ')
  .replace(/\s+([，。！？；：、”’）】》])/g, '$1')
  .replace(/([“‘（【《])\s+/g, '$1')
  .trim();

/** 中文分句：以 。！？…； 收尾。与被粘回来的孤立右引号/右括号合并。
 *  **不要**对中文用 splitOriginalSentences —— 那个只认 .!?，中文行会整行不切。 */
export function splitZhSentences(text) {
  const t = tidyZh(text);
  if (!t) return [];
  const out = [];
  for (const p of t.split(/(?<=[。！？…；])/)) {
    const s = p.trim();
    if (!s) continue;
    if (!/[\u4e00-\u9fa5A-Za-z0-9]/.test(s) && out.length) out[out.length - 1] += s;
    else out.push(s);
  }
  return out.length ? out : [t];
}

/* 中文广告/导航。与英文名单分开列：中文站点的栏目词和英文不是一一对应，
 * 混在一起会让「更多」「相关」这类常用词在正文里被误杀。 */
const ZH_AD_OR_NAV = /^(?:广告|赞助|推广|相关故事|相关文章|更多来自|阅读更多|继续阅读|订阅|立即订阅|注册|登录|分享|关注我们|下载应用|服务条款|隐私政策)\b/;

/** 某个 <p> 是否被包在 <a> 里（贡献者卡片整块都在链接内） */
function insideAnchor(art, index) {
  const open = (art.slice(0, index).match(/<a\b[^>]*>/gi) || []).length;
  const close = (art.slice(0, index).match(/<\/a\s*>/gi) || []).length;
  return open > close;
}

/** 取正文所在的 <article>：按「可见英文词数」选最大的那个，而不是选第一个。
 *  页面里另有 4 个相关故事卡片 <article>，每个 1 段；第一个 <article> 不一定最肥。 */
export function selectBodyArticle(html) {
  const candidates = [...html.matchAll(/<article\b[^>]*>[\s\S]*?<\/article>/gi)].map(m => m[0]);
  const scored = candidates.map(raw => {
    const clean = raw.replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
      .replace(/<noscript\b[\s\S]*?<\/noscript>/gi, ' ');
    const words = (plain(clean).match(/[A-Za-z]+(?:['’][A-Za-z]+)?/g) || []).length;
    return { raw: clean, words };
  }).sort((a, b) => b.words - a.words);
  return scored[0]?.raw || html.match(/<main\b[^>]*>[\s\S]*?<\/main>/i)?.[0] || '';
}

/** 正文行：按 <br> 拆（不是按 <p>）。返回 [{en, tag}]，tag ∈ paragraph|quote|heading。
 *  `lang` 决定「什么算正文行」：英文要拉丁字母，中文要汉字 —— 官方中文版整段没有英文字母，
 *  沿用英文判据会把中文正文**整篇删空**（实测：22 行 / 33 词，只剩含英文人名的那些行）。 */
export function extractLines(html, { lang = 'en' } = {}) {
  const art = selectBodyArticle(html);
  const zh = lang === 'zh';
  const out = [];
  const re = /<(p|h2|h3|blockquote)\b([^>]*)>([\s\S]*?)<\/\1\s*>/gi;
  for (const m of art.matchAll(re)) {
    const kind = m[1].toLowerCase(), attrStr = m[2] || '', inner = m[3];
    const cls = (attrStr.match(/class="([^"]*)"/) || [])[1] || '';
    if (kind === 'p') {
      if (BYLINE_CLASS.test(cls)) continue;
      if (insideAnchor(art, m.index)) continue;
    }
    const tag = kind === 'blockquote' ? 'quote' : (kind === 'p' ? 'paragraph' : 'heading');
    for (const piece of inner.split(/<br\s*\/?>/i)) {
      const t = zh ? tidyZh(plain(piece)) : tidyEn(plain(piece));
      if (!t) continue;
      if (zh ? ZH_AD_OR_NAV.test(t) : AD_OR_NAV.test(t)) continue;
      if (!zh && LANG_NOTICE.test(t)) continue;
      if (BEAT_ONLY.test(t)) { out.push({ en: t, tag }); continue; }
      if (t.length < 2) continue;
      if (zh ? !/[\u4e00-\u9fa5]/.test(t) : !/[A-Za-z]{2,}/.test(t)) continue;
      out.push({ en: t, tag });
    }
  }
  /* 拉引（<blockquote>）是**装饰性重复**，必须去重 —— 但不能无条件去重：
   *   De Bruyne 篇里 "They don't want you anymore." 在正文出现过两次（第 52、58 行），
   *   那是作者**故意的复沓**（一球一句地数），删掉就把排比写废了。
   * 实测两处拉引在正文 <p> 里都**已经有一份**，但**不是逐字相同**：
   *   正文是完整段（338 字），拉引只是它的前两句（101 字）——**拉引是正文的截短版**。
   *   所以用「精确相等」判会漏（第一版就漏了），判据必须是「正文行是否包含拉引的前缀」。
   * 反向不成立（正文不会是拉引的前缀），所以只查一个方向。
   * 若拉引内容在正文里找不到（真·独家引语），保留。 */
  /* 署名行（厄德高篇实测）：pull-quote 块里跟着的「- Martin Ødegaard」。它没有句末标点、
   * 破折号开头 + 人名形状 —— 正文里没人这么写句子，见到就丢。**对 quote 行也要查**，
   * 因为署名就藏在金句 <blockquote> 内部（tag 也是 quote）。 */
  const ATTRIBUTION = /^[-–—]\s*[A-ZÀ-ÖØ-Þ][\p{L}\s.'’-]{1,40}$/u;
  const noAttr = out.filter(l => !ATTRIBUTION.test(l.en));
  /* 拉引（<blockquote>）是**装饰性重复**，必须去重 —— 但不能无条件去重：
   *   De Bruyne 篇里 "They don't want you anymore." 在正文出现过两次（第 52、58 行），
   *   那是作者**故意的复沓**（一球一句地数），删掉就把排比写废了。
   * 实测两处拉引在正文 <p> 里都**已经有一份**，但**不是逐字相同**：
   *   正文是完整段（338 字），拉引只是它的前两句（101 字）——**拉引是正文的截短版**。
   *   所以用「精确相等」判会漏（第一版就漏了），判据必须是「正文行是否包含拉引的前缀」。
   * 反向不成立（正文不会是拉引的前缀），所以只查一个方向。
   * 若拉引内容在正文里找不到（真·独家引语），保留。
   * 比较必须**忽略大小写** —— 厄德高篇的金句把开头的 "These days," 剪掉了，
   * 于是前缀的首字母从小写变成了大写，大小写敏感的 includes 直接漏网（实测漏了整段金句+署名行）。
   * **不要**再加「近距逐字重复窗口」之类的补丁：皮克篇 "Silence." 相隔 2 行出现两次是作者节奏，
   * 近距窗口必误杀。远距的逐字重复同理（德布劳内进球段相隔 6 行）。 */
  const bodyLines = noAttr.filter(l => l.tag !== 'quote').map(l => l.en.toLowerCase());
  const isRepeat = q => {
    const probe = q.slice(0, Math.min(60, q.length)).toLowerCase();
    return bodyLines.some(b => b.includes(probe));
  };
  return noAttr.filter(l => l.tag !== 'quote' || !isRepeat(l.en));
}

/** 每行切句（**用 lib-people 的分句器，保证与人物栏目的句子边界口径完全一致**） */
export function linesToSentences(lines) {
  return lines.map(l => ({ ...l, sentences: splitOriginalSentences(l.en) }));
}

/** 头部元信息：标题 / 副标题 / 日期 / 作者 / 球队 / 封面图 */
export function tribuneMeta(html, base) {
  const meta = {};
  for (const m of html.matchAll(/<meta\b[^>]*>/gi)) {
    const a = attrs(m[0]);
    meta[a.property || a.name] = a.content;
  }
  const title = plain(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || meta['og:title'] || '');
  const zhTitle = plain(html.match(/<h2\b[^>]*>([\s\S]*?)<\/h2>/i)?.[1]
    || html.match(/"titleZh"\s*:\s*"([^"]+)"/)?.[1] || '');
  const author = plain(html.match(/<p\b[^>]*class="[^"]*authorText[^"]*"[^>]*>([\s\S]*?)<\/p>/i)?.[1] || '');
  const team = plain(html.match(/<p\b[^>]*class="[^"]*byline[^"]*"[^>]*>([\s\S]*?)<\/p>/i)?.[1] || '');
  const date = (meta['article:published_time']
    || html.match(/"datePublished"\s*:\s*"([^"]+)"/)?.[1] || '').slice(0, 10);
  let cover = meta['og:image'] || '';
  try { cover = canonical(new URL(cover, base).href); } catch { cover = ''; }
  return { title, zhTitle, author, team, date, cover, lang: attrs(html.match(/<html\b[^>]*>/i)?.[0] || '').lang || '' };
}

/** 抓页面并抽出结构化正文 */
export async function fetchTribune(url, { lang = 'en' } = {}) {
  const r = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36' },
    redirect: 'follow',
  });
  if (!r.ok) throw new Error(`${url} → HTTP ${r.status}`);
  const html = await r.text();
  const meta = tribuneMeta(html, url);
  const zh = lang === 'zh';
  const split = zh ? splitZhSentences : splitOriginalSentences;
  const lines = extractLines(html, { lang }).map(l => ({ ...l, sentences: split(l.en) }));
  const joined = lines.flatMap(l => l.sentences).join(zh ? '' : ' ');
  const counts = zh
    ? { chars: (joined.match(/[\u4e00-\u9fa5]/g) || []).length }
    : { words: (joined.match(/[A-Za-z]+(?:['’][A-Za-z]+)?/g) || []).length };
  return { url: canonical(url), html, meta, lines, lang,
    sentences: lines.flatMap(l => l.sentences),
    paragraphs: lines.length, ...counts };
}

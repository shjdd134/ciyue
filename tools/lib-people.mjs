/* 人物栏目：只对公开原刊进行选题测量，并保存正文/图片的可追溯快照。
 * 提取器只处理公开 HTML；不绕过登录、订阅或访问限制。广告、导航和推广块会被丢弃。 */
import fs from 'node:fs';
import crypto from 'node:crypto';
import {decodeEntities} from './lib-mt.mjs';
import {ABBR} from './lib-text.mjs';
/* 人物配置分两层装载 —— 2026-09-17 拆分，原因是仓库 public 且 Pages 直接服务整个根目录，
 * 「推上去」＝「贴在公网」，而 people[] / excludedPeople 是用户的**个人偏好**，不该在公开仓库里。
 *
 *   公开层 tools/people-config.json      运行参数（配额 / 图片门槛 / 来源白名单）—— 随仓库走
 *   私有层 people[] + excludedPeople     按下列顺序取，命中即止：
 *     ① process.env.PEOPLE_PRIVATE_JSON   CI：GitHub Actions Secret 注入
 *     ② tools/people-config.local.json    本地：已在 .gitignore（*.local.json）
 *     ③ 都没有 → 空名单 + 告警（**不抛错**：只改了配置、secret 还没建的那段时间不能让 CI 变红）
 *
 * 顺序是固定的，排查「线上为什么没匹配到人」先看这里。公开层若又出现 people / excludedPeople，
 * 直接抛错 —— 那是「刚挪走又被加回来」的信号，必须在跑起来之前就炸。 */
const _cfgPath = new URL('./people-config.json', import.meta.url);
const _baseConfig = JSON.parse(fs.readFileSync(_cfgPath, 'utf8'));
if (_baseConfig.people || _baseConfig.excludedPeople) {
  throw new Error('people-config.json 不允许含 people / excludedPeople：名单属私有层，'
    + '本地放 tools/people-config.local.json，CI 走 Secret PEOPLE_PRIVATE_JSON —— 见 lib-people.mjs 顶部注释');
}
function loadPrivatePeople() {
  const env = process.env.PEOPLE_PRIVATE_JSON;
  if (env && env.trim()) {
    try { return { src: 'env:PEOPLE_PRIVATE_JSON', data: JSON.parse(env) }; }
    catch (e) { console.warn('people: PEOPLE_PRIVATE_JSON 不是合法 JSON，已忽略 — ' + e.message); }
  }
  try {
    return { src: 'file:people-config.local.json',
      data: JSON.parse(fs.readFileSync(new URL('./people-config.local.json', import.meta.url), 'utf8')) };
  } catch { /* 没有本地文件是正常情况（CI 靠 secret） */ }
  return { src: '(未配置)', data: {} };
}
const _private = loadPrivatePeople();
const _peopleList = Array.isArray(_private.data.people) ? _private.data.people : [];
const _excludedList = Array.isArray(_private.data.excludedPeople) ? _private.data.excludedPeople : [];
if (!_peopleList.length) {
  console.warn(`people: 偏好名单为空（来源 ${_private.src}）—— 本次不会匹配到任何人物。`
    + '本地请创建 tools/people-config.local.json；CI 请配置 Secret PEOPLE_PRIVATE_JSON。');
}
export const PEOPLE_CONFIG = {..._baseConfig, people: _peopleList, excludedPeople: _excludedList};
/* 供测试与排查用：名单从哪来的 */
export const PEOPLE_PRIVATE_SOURCE = _private.src;
export const plain = s => decodeEntities(String(s || '').replace(/<script\b[\s\S]*?<\/script>/gi,' ').replace(/<style\b[\s\S]*?<\/style>/gi,' ').replace(/<[^>]*>/g,' ')).replace(/\s+/g,' ').trim();
const fold = s => plain(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
export function attrs(tag) {
  const out = {};
  for (const m of tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) out[m[1].toLowerCase()] = decodeEntities(m[2] ?? m[3]);
  return out;
}
export function canonical(url) {
  const u = new URL(url);
  if (u.protocol !== 'https:' || u.username || u.password) throw new Error('只接受 HTTPS 原刊地址');
  u.hash = ''; u.search = ''; u.pathname = u.pathname.replace(/\/$/,'') || '/';
  return u.href;
}
export function sourceFor(url) {
  try { const u=new URL(canonical(url)); return PEOPLE_CONFIG.sources.find(s=>s.host===u.hostname) || null; } catch { return null; }
}
export function personFor(title) {
  const t = ' '+fold(title).replace(/[^a-z0-9]+/g,' ')+' ';
  return PEOPLE_CONFIG.people.find(p=>t.includes(' '+fold(p.name)+' ')) || null;
}
export const excludedPerson = title => PEOPLE_CONFIG.excludedPeople.some(name => (' '+fold(title).replace(/[^a-z0-9]+/g,' ')+' ').includes(' '+fold(name)+' '));
export const noiseTitle = title => /\b(nail|nails|manicure|pedicure|shop|shopping|buy|sale|discount|dupe|dupes|skincare|skin care|lipstick|perfume|haircut|hair color|best dressed|red carpet look|wore a|wears a)\b/i.test(fold(title));
export function imageKey(url) {
  const u=new URL(url);
  const photo=u.pathname.match(/\/photos\/([^/]+)/)?.[1];
  return photo ? u.hostname+'/'+photo : u.hostname+u.pathname.replace(/^\/\d+(?:\/[^/]+)?\/azure\//,'/azure/');
}

/* 原刊页面会把正文、推荐卡片、订阅提示和脚本混在同一个 article 容器里。
 * 这些词只用于识别明显的广告/导航块，不能拿通用的「短段落过滤」代替正文，
 * 否则人物访谈中的短回答会被误删。 */
const AD_OR_NAV = /^(?:advertisement|sponsored|subscribe(?: now| to)?|sign up(?: for)?|newsletter|save this story|shop(?: now| the story)?|buy now|related stories|related articles|more from|read more|read next|you may also like|all access|unlock|skip to|terms of use|privacy policy)\b/i;
const AD_FRAGMENT = /(?:advertisement|sponsored content|newsletter|subscribe to|sign up for|save this story|shop the story|all access|unlock this article|related stories|more from vogue|more from another)/i;
const TAG_BLOCK = /<(figure|p|h2|h3|blockquote|li)\b[^>]*>[\s\S]*?<\/\1>/gi;
/* WordPress 经典排版的图注 <p id="caption-attachment-…">：它不是正文，混进正文流
 * 会重复计词（图注已经算图片的 credit），两个来源（Interview 2026-09-17 实测）都会踩。 */
const CAPTION_BLOCK = /\bid=["']caption-[-\w]+["']/i;
function isTextBlock(text, title='') {
  const t=plain(text);
  if(!t || t===title || t.length<2) return false;
  if(AD_OR_NAV.test(t) || AD_FRAGMENT.test(t)) return false;
  if(/^by\s+[a-z]/i.test(t) || /^(?:photography|styling|words)\s+by\b/i.test(t)) return false;
  /* 只收带英文字符的正文；图片署名、分享控件和版权行通常没有完整英文句子。 */
  return /[A-Za-z]{2,}/.test(t);
}
/* 原文分句。
 *
 * 这里**必须**和 lib-text.mjs 共用同一张缩写表：先前那份本地实现没有缩写保护，
 * 原刊里的 "8 a.m. to 6 p.m." 被劈成 "8 a." / "m." / "to 6 p." / "m." 四个碎片；
 * 碎片里没有可译内容，DeepL 原样退回英文，qc 的 F4「译文与原文相同」当场报警。
 * 同类「两套尺子」的亏这个仓库已经吃过两次（lib-text.mjs 头部记着清单 1035 词 /
 * 入库 178 词那次），所以缩写的判定不再另写一份。
 *
 * 不套 lib-text 的 splitSentences 长度门槛：访谈里的短回答（"DSF: Wow?"）就是正文。 */
function splitOriginalSentences(text) {
  const t=plain(text); if(!t) return [];
  const guarded=t.replace(ABBR,m=>m.replace(/\./g,'·'));      // 缩写里的句号先藏起来
  const parts=guarded.split(/(?<=[.!?…])\s+/).map(s=>s.replace(/·/g,'.').trim()).filter(Boolean);
  const out=[];
  for(const s of parts){
    /* "[Laughs.]" 会切出一个只剩标点的 "]"；它不是句子，粘回上一句，原文一字不动
       （粘右括号时不补空格，免得把原文的 "[Laughs.]" 写成 "[Laughs. ]"）。 */
    if(!/[A-Za-z]/.test(s) && out.length) out[out.length-1]+= (/^[)\]}»›]/.test(s)?'':' ')+s;
    else out.push(s);
  }
  return out.length?out:[t];
}
export { splitOriginalSentences };

function selectArticle(html, title) {
  const candidates=[...html.matchAll(/<article\b[^>]*>[\s\S]*?<\/article>/gi)].map(m=>m[0]);
  /* 某些站点先放一个只有摘要的 article，再放正文 article；固定取第一个会造成
   * 「文章搜集不完整」。按可读英文词数和段落数选正文容器，避免把导航/脚本算进去。 */
  const scored=candidates.map(raw=>{
    const clean=raw.replace(/<script\b[\s\S]*?<\/script>/gi,'').replace(/<style\b[\s\S]*?<\/style>/gi,'').replace(/<noscript\b[\s\S]*?<\/noscript>/gi,'');
    const ps=[...clean.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)].map(m=>plain(m[1])).filter(t=>isTextBlock(t,title));
    const words=ps.join(' ').match(/[A-Za-z]+(?:['’][A-Za-z]+)?/g)?.length||0;
    return {raw,words,paragraphs:ps.length,score:words+ps.length*12};
  }).filter(x=>x.words>0).sort((a,b)=>b.score-a.score);
  if(scored[0])return scored[0].raw;
  return html.match(/<main\b[^>]*>[\s\S]*?<\/main>/i)?.[0] || '';
}

/* 图注：优先 <figcaption>；没有时退回 <figure> 里的 <p>。
 *
 * 为什么必须退这一步（2026-09-15 实测）：British Vogue 把图注写在 <p> 里，
 * 只认 figcaption 会让这些图注**两处同时出事**——既进不了 blocks（图注蒸发，
 * 阅读页少了 3 条说明），又被 <p> 扫描算进了正文词数（Monica 那篇报 964、
 * 真正发布的正文只有 915，差的 49 就是这 3 条图注）。 */
function figureCaption(raw) {
  return plain(raw.match(/<figcaption\b[^>]*>([\s\S]*?)<\/figcaption>/i)?.[1]
    || raw.match(/<p\b[^>]*>([\s\S]*?)<\/p>/i)?.[1]
    || '');
}

/* 从 <img> 属性判定「是否正文内容图」：srcset 有 ≥960w 档、或 width 属性 ≥500、
 * 或 imgix 式 ?w= 查询（×dpr）≥500 才算。头像/图标/像素陷阱按 URL 特征排除。
 * ignoreQueryW：stripImgQuery 来源（W Magazine/Bustle）的 ?w=375 只是版面缩略参数，
 * 去参后是原图，不能拿它判尺寸——否则整版照片会被误杀（2026-09-17 Eva Green 实测）。 */
function qualifyImg(a, ignoreQueryW=false) {
  const set=[...(a.srcset||a['data-srcset']||'').matchAll(/(https:\/\/\S+?)\s+(\d+)w/g)].map(x=>({url:x[1],w:+x[2]})).sort((x,y)=>x.w-y.w);
  const pick=set.find(x=>x.w>=960)||set.at(-1);
  const url=pick?.url||a['data-src']||a.src||'';
  if(!url) return null;
  let w=pick?.w||+(a.width||0)||0;
  if(!w && !ignoreQueryW){ const mw=String(url).match(/[?&]w=(\d+)/); const dpr=String(url).match(/[?&]dpr=(\d+)/); w=mw?(+mw[1])*(dpr?+dpr[1]:1):0; }
  if(w && w<500) return null;
  if(/favicon|logo|icon|avatar|pixel|spacer|sprite|facebook\.com\/tr/i.test(url)) return null;
  if(/pin it|logo|icon|advert(?:isement)?|sponsored|promo|newsletter|subscribe/i.test(a.alt||'')) return null;
  return {url};
}

function extractBlocks(article, title, source, base, addImage, plainImgHits=[]) {
  const blocks=[];
  let hit=0;
  /* 片尾制作名单段（W Magazine 实测："Hair by Shay Ashual at Art Partner; makeup by …
   * Set design by … / Produced by Red Hook Labs. Executive producer …"）以摄制职名开头，
   * 不是正文。只按「段首职名 + by」判定，避免误杀正文里引用的 Produced by 片语。 */
  const CREDIT_START=/^(?:hair|makeup|manicure|styling|set design|grooming|wardrobe|casting|produced|executive producer|line producer|digital technician|special thanks)\b[^\n]{0,40}?\bby\b/i;
  /* plainImgs 来源（Interview/W Magazine 等）的图不在 <figure> 里，是裸 <img>：
   * 按文档偏移与文本块交织，保证阅读页图文顺序与原刊一致。 */
  const flush=limit=>{ while(hit<plainImgHits.length && plainImgHits[hit].index<limit){ const h=plainImgHits[hit++]; const before=addImage(h.url,h.caption); if(before) blocks.push({type:'image',...before}); } };
  for (const m of article.matchAll(TAG_BLOCK)) {
    flush(m.index);
    const kind=m[1].toLowerCase(), raw=m[0], end=m.index+m[0].length;
    if(kind==='figure') {
      const tag=raw.slice(0,raw.indexOf('>')+1), fa=attrs(tag);
      const caption=figureCaption(raw);
      let urls=[];
      if(fa['data-src']) urls=[fa['data-src']];
      else for(const img of raw.match(/<img\b[^>]*>/gi)||[]) {
        const ia=attrs(img), set=[...(ia.srcset||ia['data-srcset']||'').matchAll(/(https:\/\/\S+?)\s+(\d+)w/g)].map(x=>({url:x[1],w:+x[2]})).sort((a,b)=>a.w-b.w);
        urls.push(set.find(x=>x.w>=960)?.url||set.at(-1)?.url||ia['data-src']||ia.src||'');
      }
      for(const rawUrl of urls){
        const before=addImage(rawUrl,caption);
        if(before) blocks.push({type:'image',...before});
      }
      flush(end);
      continue;
    }
    if(CAPTION_BLOCK.test(raw)) continue;
    const text=plain(raw);
    if(!isTextBlock(text,title)){ flush(end); continue; }
    if(CREDIT_START.test(text)){ flush(end); continue; }
    const heading=kind==='h2'||kind==='h3';
    blocks.push({type:'text',tag:heading?'heading':'paragraph',text,sentences:splitOriginalSentences(text)});
    flush(end);
  }
  flush(Infinity);
  return blocks;
}
export function extractProfile(html, url) {
  const source = sourceFor(url);
  if (!source) throw new Error('来源不在人物栏目白名单');
  const meta={};
  for(const m of html.matchAll(/<meta\b[^>]*>/gi)){const a=attrs(m[0]);meta[a.property||a.name]=a.content;}
  const title=plain(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || meta['og:title']);
  const article=selectArticle(html,title);
  /* plainImgs 来源（Bustle 系 W Magazine）把正文 <img> 放在 <noscript> 里做无 JS 回退，
   * 一律剥离会整版丢图；对这类来源改为**展开** noscript 保留内容（2026-09-17 Eva Green 实测）。 */
  let body=article.replace(/<script\b[\s\S]*?<\/script>/gi,'').replace(/<style\b[\s\S]*?<\/style>/gi,'')
    .replace(/<noscript\b[^>]*>([\s\S]*?)<\/noscript>/gi, source.plainImgs ? '$1' : '');
  /* 图注查询要在剥离 <figcaption> 之前建好索引（Bustle 的 aria-describedby 目标就在里面） */
  const bodyForCaption=body;
  /* <aside>（Interview 的 popular-posts 挂件）、<section class="related">（相关文章区，
   * 与 popular-posts 是两份不同容器，实测 Megan Fox 页各有一份）与 <figcaption>
   * （W Magazine 的制作人员名单 "Hair by … at Art Partner; Produced by Red Hook Labs…"
   * 全在图注容器里）都不是正文——不剥的话 2026-09-18 实测混进正文 9 组重复句守卫全红。
   * 图注单独由 plainImgHits 的 aria-describedby 查询供给（用未剥离的 bodyForCaption），
   * 不经过文本块路径。 */
  const bodyText=body
    .replace(/<aside\b[\s\S]*?<\/aside>/gi,' ')
    .replace(/<section\b[^>]*class="[^"]*\brelated\b[^"]*"[^>]*>[\s\S]*?<\/section>/gi,' ')
    .replace(/<figcaption\b[\s\S]*?<\/figcaption>/gi,' ');
  const text=[...bodyText.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)].filter(m=>!CAPTION_BLOCK.test(m[0])).map(m=>plain(m[1])).filter(t=>isTextBlock(t,title)).join('\n');
  const lang=attrs(html.match(/<html\b[^>]*>/i)?.[0]||'').lang || '';
  const english=/^en(?:-|$)/i.test(lang);
  const images=[],seen=new Set();
  function add(raw,credit='') {
    if(!raw)return;
    try{
      const u=new URL(raw,url);
      if(u.protocol!=='https:' || !source.images.includes(u.hostname))return;
      /* imgix 式 CDN 的 ?w=&h=&fit= 是版面裁剪参数：去掉拿原图（清晰度对封面很重要），
       * 且两处（收集 + blocks 回调）必须同规则去参，否则 imageKey 对不上。 */
      if(source.stripImgQuery) u.search='';
      if(/shoppingunit|magstack|subscribe|newsletter|promo|banner|advert/i.test(decodeURIComponent(u.pathname)))return;
      const key=imageKey(u.href);if(seen.has(key))return null;
      seen.add(key); const item={url:u.href,credit}; images.push(item); return item;
    }catch{}
  }
  add(meta['og:image']);
  for(const m of article.matchAll(/<figure\b[\s\S]*?<\/figure>/gi)){
    const f=m[0];
    if(/\b(?:advert(?:isement)?|sponsored|promo|newsletter|subscribe|shoppingunit|magstack)\b/i.test(f.slice(0,f.indexOf('>')+1)))continue;
    if(source.name==='AnOther Magazine' && !/^<figure[^>]*class="[^"]*(?:main-img|inline-img)/i.test(f))continue;
    const caption=figureCaption(f);
    const figureUrl=attrs(f.slice(0,f.indexOf('>')+1))['data-src'];
    if(figureUrl){add(figureUrl,caption);continue;}
    for(const tag of f.match(/<img\b[^>]*>/gi)||[]){
      const a=attrs(tag);
      if(/pin it|logo|icon|advert(?:isement)?|sponsored|promo|newsletter|subscribe/i.test(a.alt||''))continue;
      const set=[...(a.srcset||a['data-srcset']||'').matchAll(/(https:\/\/\S+?)\s+(\d+)w/g)].map(x=>({url:x[1],w:+x[2]})).sort((a,b)=>a.w-b.w);
      const pick=set.find(x=>x.w>=960)||set.at(-1);
      add(pick?.url||a['data-src']||a.src,caption);
    }
  }
  /* plainImgs 来源：正文图是裸 <img>（不在 <figure> 里），按文档顺序单独收集。
   * 既要进 images[]（计数/下载），也要带 body 偏移记录下来供 extractBlocks 交织排布。 */
  const plainImgHits=[];
  if(source.plainImgs){
    for(const m of bodyText.matchAll(/<img\b[^>]*>/gi)){
      const a=attrs(m[0]);
      const q=qualifyImg(a, !!source.stripImgQuery);
      if(!q)continue;
      const desc=a['aria-describedby'];
      const caption=desc?plain(bodyForCaption.match(new RegExp('id="'+desc.replace(/[.$]/g,'\\$&')+'"[^>]*>([\\s\\S]*?)<','i'))?.[1]||''):'';
      add(q.url,caption);
      plainImgHits.push({index:m.index,url:q.url,caption});
    }
  }
  const person=personFor(title);
  const depth=(text.match(/\b(career|childhood|acting|actor|actress|film|cinema|mother|life|role|character|grew up|story|interview)\b/gi)||[]).length;
  const blocked=/"isAccessibleForFree"\s*:\s*(?:false|"false")/i.test(html) || /subscribe to (?:read|continue)|unlock (?:this|the full) (?:article|story)/i.test(text);
  const truncated=/(?:continue reading|read the full (?:story|article)|keep reading|sign in to continue|read more below|load more)/i.test(body);
  const date=meta['article:published_time'] || html.match(/"datePublished"\s*:\s*"([^"]+)"/)?.[1] || '';
  /* 第二次扫描保留正文与图片的文档顺序。图片已在上面的 whitelist/dedupe 中计数，
   * 所以这里用 imageKey 对齐到同一个对象，避免把推广图片重新塞回来。 */
  const blockSeen=new Set();
  const blocks=extractBlocks(bodyText,title,source,url,(raw,credit='')=>{
    try{
      const u=new URL(raw,url); if(u.protocol!=='https:'||!source.images.includes(u.hostname))return null;
      if(source.stripImgQuery) u.search='';
      if(/shoppingunit|magstack|subscribe|newsletter|promo|banner|advert/i.test(decodeURIComponent(u.pathname)))return null;
      const key=imageKey(u.href); if(blockSeen.has(key))return null;
      const match=images.find(x=>imageKey(x.url)===key);
      if(!match)return null;
      blockSeen.add(key);
      if(credit && !match.credit)match.credit=credit;
      return match;
    }catch{return null;}
  }, plainImgHits);
  /* 正文词数必须量「真正会被发布的文本」——qc 就是拿发布后的 paragraphs 复算这个数
   * （qc.mjs F4）。原先在 <p> 上量、却把 <figure> 里的 <p> 当图注排除掉，两把尺子
   * 必然对不上：Monica 那篇量出 964、发布正文只有 915，差 49。改成量 blocks 的文本块，
   * 顺带把 h2/h3 标题也算进去（它们同样进正文流）。 */
  const textBlocks=blocks.filter(b=>b.type==='text');
  const words=(textBlocks.flatMap(b=>b.sentences).join(' ').match(/[A-Za-z]+(?:['’][A-Za-z]+)?/g)||[]).length;
  const result={url:canonical(url),source:source.name,title,person,lang,english,words,depth,images,blocks,
    sourceParagraphs:textBlocks.length,sourceImages:images.length,date:date.slice(0,10),hasArticle:!!article,blocked,
    truncated,sourceTextHash:crypto.createHash('sha256').update(text).digest('hex')};
  return {...result,...scoreProfile(result)};
}
export function scoreProfile(p) {
  const c=PEOPLE_CONFIG, reasons=[];
  if(excludedPerson(p.title))reasons.push('用户明确排除的人物');
  if(p.person && new RegExp('\\b(?:tells|interviewed by|interview by)\\s+'+fold(p.person.name)+'\\b','i').test(fold(p.title)))reasons.push('偏好人物是采访者，未确认是摄影主体');
  if(!p.person)reasons.push('标题没有偏好名单中的人物');
  if(noiseTitle(p.title))reasons.push('购物、美妆或单套造型选题');
  if(!p.english)reasons.push('未确认英文原文');
  if(!p.hasArticle)reasons.push('未定位正文容器');
  if(p.blocked)reasons.push('原文有订阅或访问限制');
  if(p.truncated)reasons.push('页面提示继续阅读，正文可能截断');
  if(p.words<c.minSourceWords)reasons.push('正文测量不足，可能仅有摘要');
  if(p.images.length<c.minPhotos)reasons.push('专题独立配图不足');
  if(p.depth<5)reasons.push('人物经历与作品线索不足');
  const parts={person:(p.person?.affinity||0)/100,photography:Math.min(1,p.images.length/8),story:Math.min(1,p.depth/20),english:p.english ? Math.min(1,p.words/800):0,interest:p.person?1:0};
  const score=+Object.entries(parts).reduce((n,[k,v])=>n+v*c.weights[k],0).toFixed(1);
  if(score<c.threshold)reasons.push('选题分未达门槛');
  return {score,scoreParts:parts,eligible:reasons.length===0,reasons};
}
export function discoverLinks(html, base) {
  const seen=new Set(), out=[];
  for(const m of html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)){
    const a=attrs(m[1]); if(!a.href)continue;
    try{
      const url=canonical(new URL(a.href,base).href),title=plain(m[2])||a.title||'';
      if(new URL(url).hostname!==new URL(base).hostname || !sourceFor(url) || seen.has(url) || excludedPerson(title) || !personFor(title) || noiseTitle(title))continue;
      seen.add(url);out.push({url,title});
    }catch{}
  }
  return out;
}
export function selectDaily(reviewed, existing, day, limit=PEOPLE_CONFIG.dailyLimit) {
  const urls=new Set(existing.map(a=>{try{return canonical(a.url);}catch{return a.url;}}));
  const ids=new Set(existing.map(a=>a.id));
  const used=existing.filter(a=>a.cat==='人物' && a.addedAt===day).length;
  const room=Math.max(0,Math.min(PEOPLE_CONFIG.dailyLimit,limit)-used);
  const selected=[], people=new Set();
  for(const x of reviewed){
    if(selected.length>=room)break;
    if(!x.eligible || x.review?.status!=='approved' || !x.review?.visualChecked || !x.review?.guideChecked || !x.review?.articleChecked || ids.has(x.id) || urls.has(canonical(x.url)) || people.has(x.person.name))continue;
    selected.push(x);urls.add(canonical(x.url));ids.add(x.id);people.add(x.person.name);
  }
  return selected;
}

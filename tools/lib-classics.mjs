/* 词阅 WordLens —— 明星栏目「历史通道」的共享底座
 *
 * 为什么要有这个文件：**发现与提取的口径必须只有一份**。
 * `fetch-classics.mjs`（出候选清单）与 `ingest.mjs --classics`（真正入库）如果各写一套，
 * 下面四个坑就会在第二个实现里复发一遍，而它们的表现全都长得像「这篇内容不行」：
 *
 *   ① **张数要数正文容器内的 `<figure>`，不是 `<img>` 标签**。
 *      Vogue 页面 `<img>` 只有 7 个而 `<figure>` 有 16 个（它用 `<picture>` + `<source srcset>`），
 *      按 `<img>` 数会低估一半以上。
 *   ② **不能强制要求图片 URL 带扩展名**。Vogue 有两套模板：新版 `…/x.jpg`，
 *      老版（`GallerySlide*`）是 `…/master/w_320,c_limit/542247402` —— 没有扩展名。
 *      实测 `vintage-pictures-of-charlotte-rampling` 页面有 22 个 `<figure>`，
 *      被扩展名白名单滤成「0 张图」，报告上写的是「这篇图少」，实际是解析器不认识它。
 *   ③ **不能只取第一个 `srcset`**。同一 `<picture>` 里 `(max-width:767px)` 的 source 排在前面，
 *      宽度只有 320w；取第一个就把清晰度锁死在手机尺寸。
 *   ④ **跨站去重不能靠图注文本，也不能靠图片 id**。美版英版各写各的图注、
 *      各传一份图片副本（photo id 交集为 0）。只能用「同一人物 + 图数接近 + 年代集合重合」。
 *
 * 模块只做纯函数与 HTTP：不读项目数据、不写盘，方便被脚本和测试共用。
 */

import zlib from "node:zlib";
/* 段落质量判定与断句从 lib-text.mjs 拿 —— 这两样原来在 ingest.mjs，
 * 2026-09-14 搬进共享库，就是为了让「清单数出来的词数」= 「入库会得到的词数」。
 * 详见 lib-classics.mjs 里「正文判定与词数」一节的说明。 */
import { goodPara, splitSentences, wordCount } from "./lib-text.mjs";

export const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    + "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
};

/* 「早期影像」的定义：用户要的年代偏好区间（1980—2005）右端 */
export const EARLY_MAX = 2005;

/* 明星栏目用户偏好：经典图集候选在满足硬门槛后优先这些人物，
 * 仍保留其它女性专题作为补位，避免只靠发布时间把目标人物挤出首批。 */
const STAR_PRIORITY = [
  /monica\s+bellucci/i,
  /sophie\s+marceau/i,
  /anne\s+hathaway/i,
];
const classicWatchBoost = t => STAR_PRIORITY.some(re => re.test(
  `${t.person || ""} ${t.slug || ""} ${t.m?.title || ""}`,
)) ? 8 : 0;

/* ---------------- 货源 ---------------- */

/* 只放实测可达、且形态对味的。BBC「A life in pictures」是补位货源，但本机 node fetch
   对 bbc.co.uk 不可达（fetch failed），要纳入得另想办法，先不写进来。 */
export const SOURCES = [
  { key: "us", name: "Vogue US", site: "https://www.vogue.com", sitemap: "https://www.vogue.com/sitemap.xml", section: "/slideshow/" },
  { key: "uk", name: "British Vogue", site: "https://www.vogue.co.uk", sitemap: "https://www.vogue.co.uk/sitemap.xml", section: "/gallery/" },
];

/* ---------------- 文本解码 ----------------
 * 必须在这里解，不能留给调用方：Vogue 的正文段落是
 *   `Princess Diana <i>’s</i> fashion evolution`、`her tragic death</a>,`
 * —— 直接 `replace(/<[^>]+>/g, " ")` 会得到 `Diana ’s`、`death ,`。
 * 这类残留在阅读页上是「标点前莫名多一个空格」，看起来像排版 bug，
 * 实际是提取阶段没收拾干净。数字实体（`&#8217;`）也必须解，
 * 否则正文里会出现字面量。 */
const ENT = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  rsquo: "\u2019", lsquo: "\u2018", rdquo: "\u201d", ldquo: "\u201c",
  mdash: "\u2014", ndash: "\u2013", hellip: "\u2026", middot: "\u00b7",
  eacute: "\u00e9", egrave: "\u00e8", agrave: "\u00e0", aacute: "\u00e1",
  ccedil: "\u00e7", ouml: "\u00f6", uuml: "\u00fc", auml: "\u00e4", ntilde: "\u00f1",
  Eacute: "\u00c9", Egrave: "\u00c8", Ccedil: "\u00c7", Ouml: "\u00d6", Uuml: "\u00dc",
};

export function decodeEntities(s) {
  return String(s)
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(+d))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&([a-zA-Z][a-zA-Z0-9]{1,7});/g, (m, n) => (n in ENT ? ENT[n] : m));
}

/** 标签剥离 + 实体解码 + 标点前留白收拾。`<p>` 文本与图注共用这一条。 */
export function plainText(html) {
  return decodeEntities(String(html).replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .replace(/\s+([,.;:!?%’'\u2019])/g, "$1")
    .trim();
}

/* ---------------- 筛选：什么算「经典人物影像」 ---------------- */

/* 保留：回顾 / 年代对比 / 档案 / 生平影像。宽松是故意的——宁可多抓几条让人过目，
   也不要漏掉；真正的排除靠 JUNK。 */
export const CLASSIC = new RegExp([
  "style-evolution", "through-the-years", "best-moments", "most-iconic", "vintage-pictures",
  "vintage-photos", "vintage-style", "throwback", "best-looks-of-all-time", "best-looks-from-",
  "iconic-photographs", "retrospective", "then-and-now", "life-in-pictures", "in-photos",
  "-of-all-time", "golden-age", "archive", "best-style-moments", "career-in", "on-screen-style",
  "young-", "early-years", "rise-of", "beauty-look", "hair-evolution",
  String.raw`(?:19|20)\d0s`, "aughts",
].join("|"), "i");

/* 排除：商业活动、生活方式、非人物。857 条 slideshow 里 54% 是品牌派对／开业／时装周后台，
   图注只有人名没有文本，不是要的内容。
 *
 * 两类是跑过一轮样本后补的（初版漏了，实测混进 A/B 两组）：
 *   · `of-the-week` / `best-dressed` —— 栏目型定期更新（每周美妆合集、每期着装榜），
 *     不是历史专题；图注还常来自 Instagram，既无年代也无出处。
 *   · **近三年的年份** —— `all-the-best-looks-from-the-2026-venice-film-festival`
 *     这种是「今年红毯」，不是「经典回顾」（实测 100 张图里 0 张早期影像）。
 *     经典回顾不会把发布年份写进 slug。按当前年份动态生成，跨年不用改代码。 */
export const RECENT_YEARS = [0, 1, 2].map(d => new Date().getFullYear() - d);
export const JUNK = new RegExp([
  "party", "opening", "launch", "dinner", "celebration", "anniversary", "birthday", "suite",
  "backstage", "front-row", "-diary", "street-style", "pop-up", "flagship",
  "collection", "runway", "fashion-show", "spring-\\d{4}", "fall-\\d{4}",
  "wedding", "home", "interior", "real-estate", "travel", "hotel", "restaurant",
  "shopping", "gift-guide", "where-to-buy", "deals?", "sale",
  "of-the-week", "best-dressed", "red-carpet-arrivals",
  `(?:${RECENT_YEARS.join("|")})`,
].join("|"), "i");

/* ---------------- 人物识别：只收女性 ----------------
 * 判断方式是「token 组必须整组出现在 slug 里」。比写抽取正则稳：
 * 要求姓 + 名同时在，`vintage-pictures-of-audrey-hepburn-summertime-style`
 * 这种长 slug 也不会误判成别人。 */

export const FEMALE = [
  // 经典好莱坞
  ["audrey", "hepburn"], ["marilyn", "monroe"], ["grace", "kelly"], ["elizabeth", "taylor"],
  ["katharine", "hepburn"], ["ingrid", "bergman"], ["ava", "gardner"], ["rita", "hayworth"],
  ["lauren", "bacall"], ["vivien", "leigh"], ["marlene", "dietrich"], ["greta", "garbo"],
  ["bette", "davis"], ["joan", "crawford"], ["sophia", "loren"], ["gina", "lollobrigida"],
  ["claudia", "cardinale"], ["anita", "ekberg"], ["brigitte", "bardot"], ["catherine", "deneuve"],
  ["jane", "birkin"], ["francoise", "hardy"], ["romy", "schneider"], ["doris", "day"],
  ["julie", "andrews"], ["judy", "garland"], ["gene", "tierney"], ["lana", "turner"],
  ["natalie", "wood"], ["viola", "davis"], ["meryl", "streep"],
  // 80s—00s 影星
  ["monica", "bellucci"], ["sophie", "marceau"], ["julia", "roberts"], ["nicole", "kidman"],
  ["cate", "blanchett"], ["charlize", "theron"], ["angelina", "jolie"], ["winona", "ryder"],
  ["uma", "thurman"], ["gwyneth", "paltrow"], ["kate", "winslet"], ["penelope", "cruz"],
  ["salma", "hayek"], ["jennifer", "lopez"], ["cameron", "diaz"], ["drew", "barrymore"],
  ["sandra", "bullock"], ["halle", "berry"], ["jodie", "foster"], ["demi", "moore"],
  ["sharon", "stone"], ["michelle", "pfeiffer"], ["meg", "ryan"], ["renee", "zellweger"],
  ["liv", "tyler"], ["kirsten", "dunst"], ["natalie", "portman"], ["keira", "knightley"],
  ["scarlett", "johansson"], ["anne", "hathaway"], ["emma", "watson"], ["zoe", "saldana"],
  ["jennifer", "aniston"], ["courteney", "cox"], ["uma"], ["gwyneth"],
  // 音乐 / 文化
  ["beyonce"], ["taylor", "swift"], ["madonna"], ["rihanna"], ["diana", "ross"], ["cher"],
  ["tina", "turner"], ["aretha", "franklin"], ["whitney", "houston"], ["mariah", "carey"],
  ["amy", "winehouse"], ["ariana", "grande"], ["selena", "gomez"], ["dua", "lipa"],
  ["billie", "eilish"], ["lana", "del", "rey"], ["adele"], ["britney", "spears"],
  ["christina", "aguilera"], ["shakira"], ["zendaya"], ["barbra", "streisand"],
  ["liza", "minnelli"], ["dolly", "parton"], ["stevie", "nicks"], ["joni", "mitchell"],
  // 王室 / 名流 / 第一夫人
  ["princess", "diana"], ["diana", "spencer"], ["jackie", "kennedy"], ["jacqueline", "kennedy"],
  ["carolyn", "bessette"], ["meghan", "markle"], ["kate", "middleton"], ["grace", "monaco"],
  ["wallis", "simpson"], ["audrey", "hepburn"],
  // 模特
  ["kate", "moss"], ["naomi", "campbell"], ["cindy", "crawford"], ["claudia", "schiffer"],
  ["christy", "turlington"], ["linda", "evangelista"], ["elle", "macpherson"],
  ["gisele", "bundchen"], ["kendall", "jenner"], ["gigi", "hadid"], ["bella", "hadid"],
  ["emily", "ratajkowski"], ["kaia", "gerber"], ["alexa", "chung"], ["cara", "delevingne"],
  ["twiggy"], ["jean", "shrimpton"], ["iman"], ["tyra", "banks"], ["heidi", "klum"],
  ["adriana", "lima"], ["alessandra", "ambrosio"], ["karlie", "kloss"], ["joan", "smalls"],
  ["jourdan", "dunn"], ["penelope", "tree"], ["veruschka"], ["lauren", "hutton"],
  // 亚洲 / 其他
  ["michelle", "yeoh"], ["gong", "li"], ["zhang", "ziyi"], ["lucy", "liu"],
  ["sandra", "oh"], ["gemma", "chan"],
  // 时尚设计 / 文化工作者
  ["coco", "chanel"], ["vivienne", "westwood"], ["anna", "wintour"], ["diana", "vreeland"],
  ["iris", "apfel"], ["carolina", "herrera"], ["diane", "von", "furstenberg"],
  // 首轮清单跑出来后补的：这些原在「待人工确认」组里，其实是明确的女性人物
  ["victoria", "beckham"], ["princess", "anne"], ["sarah", "jessica", "parker"],
  ["martha", "stewart"], ["joan", "rivers"], ["rose", "byrne"], ["reese", "witherspoon"],
  ["jerry", "hall"], ["jennifer", "coolidge"], ["zoe", "kravitz"],
  ["daisy", "edgar", "jones"], ["charlotte", "rampling"], ["sarah", "jessica"],
  ["greta", "garbo"], ["kate", "bosworth"], ["chloe", "sevingy"], ["chloe", "sevigny"],
  ["kirsten", "dunst"], ["sofia", "coppola"], ["kelly", "ripa"], ["ellie", "goulding"],
  ["lily", "collins"], ["emma", "stone"], ["margot", "robbie"], ["florence", "pugh"],
  ["anya", "taylor", "joy"], ["sydney", "sweeney"], ["elle", "fanning"], ["dakota", "johnson"],
  ["brie", "larson"], ["lupita", "nyongo"], ["viola", "davis"], ["regina", "king"],
  ["kerry", "washington"], ["tracee", "ellis", "ross"], ["gabrielle", "union"],
  ["tessa", "thompson"], ["issa", "rae"], ["lizzo"], ["megan", "thee", "stallion"],
  ["cardi", "b"], ["nicki", "minaj"], ["doja", "cat"], ["olivia", "rodrigo"],
  ["sabrina", "carpenter"], ["chappell", "roan"], ["charli", "xcx"], ["rosalia"],
  ["karol", "g"], ["camila", "cabello"], ["normani"], ["sza"],
];

/* 男性排除表。只用来**从主表剔掉**，不做反向推断——命中即排除，未命中一律保留待人工看。
   实测 Vogue 的 vintage-pictures 系列里混着 Hugh Grant、Harrison Ford。 */
export const MALE = [
  ["hugh", "grant"], ["harrison", "ford"], ["george", "clooney"], ["brad", "pitt"],
  ["leonardo", "dicaprio"], ["johnny", "depp"], ["david", "beckham"], ["tom", "cruise"],
  ["robert", "redford"], ["paul", "newman"], ["marlon", "brando"], ["james", "dean"],
  ["cary", "grant"], ["clark", "gable"], ["frank", "sinatra"], ["elvis", "presley"],
  ["mick", "jagger"], ["david", "bowie"], ["freddie", "mercury"], ["prince"],
  ["john", "lennon"], ["paul", "mccartney"], ["bob", "dylan"], ["michael", "jackson"],
  ["kanye", "west"], ["harry", "styles"], ["timothee", "chalamet"], ["jared", "leto"],
  ["bradley", "cooper"], ["ryan", "gosling"], ["jake", "gyllenhaal"], ["christian", "bale"],
  ["prince", "charles"], ["king", "charles"], ["prince", "william"], ["prince", "harry"],
];

/* 主题型 slug 里的功能词。抽不出人名时，用来判断「这条是纯主题图集」 */
export const STOP = new Set([
  "vintage", "photos", "photo", "pictures", "picture", "of", "the", "a", "an", "and", "in", "on",
  "best", "most", "iconic", "style", "styles", "moments", "moment", "looks", "look", "through",
  "years", "year", "evolution", "life", "throwback", "archive", "archives", "gallery", "slideshow",
  "young", "early", "rare", "never", "before", "seen", "then", "now", "rise", "career", "screen",
  "red", "carpet", "at", "from", "with", "her", "his", "all", "time", "times", "beauty", "hair",
  "makeup", "fashion", "era", "decade", "celebrates", "celebrating", "birthday", "turns",
]);

/* 图注层的人物识别：slug 只说明「专题主角是谁」，看不出「一篇里都是谁」。
   影展回顾这类图集常常男女同框（实测威尼斯影展那篇图注里 Catherine Zeta-Jones
   与 George Clooney 并列），只收女性就必须能分辨出来。
   匹配前先做变音符归一化，否则 Gisele Bündchen 这类拼写对不上。 */
export const deaccent = s => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "");

function compileNames(list) {
  return new RegExp(
    "\\b(" + list.map(toks => toks.join("[\\s'\\u2019.-]+")).join("|") + ")\\b",
    "gi",
  );
}
export const RE_FEMALE = compileNames(FEMALE);
export const RE_MALE = compileNames(MALE);
/* 逐条图注测试要用不带 g 的副本，否则 test() 的 lastIndex 会在调用间残留 */
export const RE_FEMALE_T = new RegExp(RE_FEMALE.source, "i");
export const RE_MALE_T = new RegExp(RE_MALE.source, "i");

export function namesIn(text, re) {
  const t = deaccent(text);
  const raw = new Set();
  re.lastIndex = 0;
  for (const m of t.matchAll(re)) raw.add(m[1].toLowerCase().replace(/[\s'\u2019.-]+/g, " ").trim());
  const arr = [...raw];
  /* `uma` 与 `uma thurman` 都会命中，去掉被更长名字包含的短名 */
  return arr.filter(n => !arr.some(o => o !== n && o.includes(n)));
}

export function tokensOf(slug) {
  const raw = slug.toLowerCase().split("-").filter(t => t && !/^\d+$/.test(t));
  const out = new Set(raw);
  /* slug 里的所有格/复数必须归一化：`18-vintage-photos-of-audrey-hepburns-idyllic-…`
     的 token 是 `hepurns`，而名单里写的是 `hepburn` —— 不处理就永远匹配不上，
     实测这一篇（18 张夏日旧照）因此被丢进「待人工确认」。 */
  for (const t of raw) if (t.endsWith("s") && t.length > 3) out.add(t.slice(0, -1));
  return [...out];
}

export function classifyPerson(slug) {
  const toks = tokensOf(slug);
  const set = new Set(toks);
  const hit = list => list.find(grp => grp.every(t => set.has(t)));
  const f = hit(FEMALE);
  if (f) return { group: "female", name: f.join(" ") };
  const m = hit(MALE);
  if (m) return { group: "male", name: m.join(" ") };
  const residue = toks.filter(t => !STOP.has(t));
  return { group: "unverified", name: residue.join(" ") };
}

/* ---------------- HTTP ---------------- */

export async function fetchText(url, timeout = 35000) {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), timeout);
  try {
    const r = await fetch(url, { headers: HEADERS, signal: ctl.signal, redirect: "follow" });
    if (!r.ok) throw new Error("HTTP " + r.status);
    const buf = Buffer.from(await r.arrayBuffer());
    /* 有些 CDN 即使没请求 gzip 也会回 gzip 体 */
    if (buf[0] === 0x1f && buf[1] === 0x8b) return zlib.gunzipSync(buf).toString("utf8");
    return buf.toString("utf8");
  } finally {
    clearTimeout(timer);
  }
}

export async function mapLimit(items, limit, fn) {
  const out = new Array(items.length);
  let i = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (true) {
      const k = i++;
      if (k >= items.length) return;
      out[k] = await fn(items[k], k);
    }
  });
  await Promise.all(workers);
  return out;
}

/* 交叠率 = 交集 / 较小集合。两版图集常有一版多几张图，用标准 Jaccard
   会被长度差稀释到阈值以下，反而漏判重复。 */
export function overlap(a, b) {
  if (!a.size || !b.size) return 0;
  let n = 0;
  for (const x of a) if (b.has(x)) n++;
  return n / Math.min(a.size, b.size);
}

/* ---------------- 发现层：sitemap 按月分片 ---------------- */

export async function discover(src, months = 8) {
  const idx = await fetchText(src.sitemap);
  const subs = [...idx.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map(m => m[1])
    .filter(u => /sitemap-\d{4}-\d{2}\.xml/.test(u))
    .slice(0, months);   // sitemap 索引按时间倒序，前 N 片 = 近 N 月
  const out = [];
  const pages = await mapLimit(subs, 6, async u => {
    try {
      const x = await fetchText(u);
      const month = (u.match(/sitemap-(\d{4}-\d{2})\.xml/) || [])[1] || "?";
      return [...x.matchAll(/<loc>([^<]+)<\/loc>/g)]
        .map(m => m[1])
        .filter(l => l.includes(src.section))
        .map(l => ({ site: src.key, siteName: src.name, month, url: l, slug: l.replace(/\/$/, "").split("/").pop() }));
    } catch (e) {
      console.log(`  ! ${src.name} 分片取失败 ${u}：${e.message}`);
      return [];
    }
  });
  for (const p of pages) out.push(...p);
  return out;
}

/** 关键词分层：给每条打上 isClassic / isJunk / group / person */
export function classifyTopics(items) {
  for (const t of items) {
    t.isClassic = CLASSIC.test(t.slug);
    t.isJunk = JUNK.test(t.slug);
    const p = classifyPerson(t.slug);
    t.group = p.group;
    t.person = p.name;
  }
  return items.filter(t => t.isClassic && !t.isJunk);
}

/* ---------------- 抓取层：正文容器内的 <figure> ---------------- */

export function articleOf(html) {
  const a = html.match(/<article[\s>][\s\S]*?<\/article>/i);
  if (a) return a[0];
  const m = html.match(/<main[\s>][\s\S]*?<\/main>/i);
  return m ? m[0] : html;
}

export const IMG_OK = /\.(?:jpe?g|png|webp)/i;
export const IMG_BAD = /logo|icon|avatar|sprite|placeholder|advert|adsystem|pixel|1x1|blank\.|badge|share-|social-|newsletter|spacer|\/ads\/|\/thumb/i;

/* Vogue 的图不同宽度是同 id 不同路径段（…/master/w_1600,c_limit/x.jpg）。
   去重键取 /photos/<id>/，抽不到再回落完整 URL。 */
export function imgKey(u) {
  const m = u.match(/\/photos\/([^/]+)\//);
  return m ? m[1] : u.split("?")[0];
}

export function parseSrcset(v) {
  return v.split(",").map(p => p.trim().split(/\s+/))
    .filter(p => p[0] && !/^data:/i.test(p[0]))
    .map(p => ({ url: p[0], w: p[1] && /^(\d+)w$/.test(p[1]) ? parseInt(p[1], 10) : 0 }));
}

/* 取块内所有 srcset 的最大宽度候选。坑 ②③ 见文件头。 */
export function bestPick(srcsetTexts) {
  const all = srcsetTexts.flatMap(parseSrcset).filter(c => !IMG_BAD.test(c.url.split("?")[0]));
  if (!all.length) return null;
  const withExt = all.filter(c => IMG_OK.test(c.url.split("?")[0]));
  return (withExt.length ? withExt : all).sort((a, b) => b.w - a.w)[0];
}

/* 图注清洗：Vogue 的原始 figcaption 形如
   `Getty Images 1/53 Photo: Getty Images November 1980 A 19-year-old Diana Spencer wore…`
   —— 去掉序号、`Native Share` 这类按钮文案，留下「出处 + 年代 + 内容」。 */
export function parseCap(raw) {
  let t = plainText(raw);
  const idx = (t.match(/^(\d+\s*\/\s*\d+)\b/) || [])[1] || "";
  if (idx) t = t.slice(idx.length).trim();
  t = t.replace(/\b(Native Share|Expand|Read More|Show More|Advertisement|Photo Gallery)\b/gi, " ")
    .replace(/\b\d+\s*\/\s*\d+\b/g, " ")
    .replace(/\s+/g, " ").trim();
  return { cap: t, index: idx };
}

export function figureImgs(articleHtml) {
  const seen = new Set();
  const out = [];
  for (const m of articleHtml.matchAll(/<figure[\s>]([\s\S]*?)<\/figure>/gi)) {
    const blk = m[1];
    const srcsets = [...blk.matchAll(/srcset=["']([^"']+)["']/gi)].map(x => x[1]);
    let pick = bestPick(srcsets);
    if (!pick) {
      for (const attr of ["data-src", "data-original", "src"]) {
        const s = blk.match(new RegExp(attr + '=["\']([^"\']+)["\']', "i"));
        if (!s || /^data:/i.test(s[1]) || IMG_BAD.test(s[1].split("?")[0])) continue;
        pick = { url: s[1], w: 0 };
        break;
      }
    }
    if (!pick) continue;
    const key = imgKey(pick.url);
    if (seen.has(key)) continue;
    seen.add(key);
    const capRaw = (blk.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/i) || [])[1] || "";
    const { cap, index } = parseCap(capRaw);
    out.push({ url: pick.url, w: pick.w, cap, index });
  }
  return out;
}

/* ---------------- 正文判定与词数：清单与入库必须同一把尺子 ----------------
 *
 * 这一节存在的唯一理由是**修一次真实的口径漂移**。原先清单（本文件的 `measure`）
 * 用「所有 <p> 去掉图注副本」数词，而入库（`ingest.mjs` 的 `classics()`）还要再过一遍
 * `goodPara` + `splitSentences`。结果碧昂丝那篇在清单上写 **1035 词**、真入库实测
 * **178 词**，被「正文 ≥300 词」当场拒收 —— 清单说「能入」，真跑却丢，像随机丢数据。
 * 现在两条路径都走下面的 `classicPara` + `splitSentences`，数字必然一致：
 * 清单的词数就是入库会得到的词数，不再有第二把尺子。
 *
 * 两个坑：
 *  ① **图注的重复副本**。Vogue 每个 slide 有**两份**图注：`<figure>` 里一份
 *     `<figcaption>`，外面还有一份重复的 `<p>`，形如 `Expand Photo: Getty Images 5/53 1981 …`。
 *     它不是正文，但会被「所有 <p> 的词数」统计进去 —— 实测戴安娜那篇因此报出
 *     **2215 词**（真正文只有 **542 词**，差 4 倍）。判据：开头是 `Expand`，
 *     或前 90 字里出现 `N/M` 这种序号（正文不会这么开头）。
 *  ② **`<figure>` 内部嵌的 `<p>`**。`blocksOf` 已按字符区间跳过（否则图注里的
 *     `<p>` 会被当正文），`measure` 也必须走 `blocksOf` 而不是自己扫 `<p>`，
 *     否则两边段落集合差一圈。 */
const CAPTION_DUP = /^\s*Expand\b/;
const DUP_INDEX = /\b\d{1,3}\s*\/\s*\d{1,3}\b/;

/** 一段是不是该给读者看的正文：通用噪声判定（`goodPara`）+ 图注副本排除。
 *  入库与清单都调它，**不要再各写一份**。 */
export function classicPara(t) {
  return goodPara(t) && !CAPTION_DUP.test(t) && !DUP_INDEX.test(t.slice(0, 90));
}

/** 文章的正文块（段 + 图，原顺序）。清单与入库共用这一个入口。 */
export function classicBlocks(articleHtml) {
  return blocksOf(articleOf(articleHtml));
}

/** 从块序列里取出会真正入库的句子数组（与入库同一条流水线） */
export function classicSents(blocks) {
  const sents = [];
  for (const b of blocks) {
    if (b.kind === "p" && classicPara(b.text)) sents.push(...splitSentences([b.text]));
  }
  return sents;
}

export const classicWords = blocks => classicSents(blocks).reduce((n, s) => n + wordCount(s), 0);

/** 一篇文章的「可读文本量」：正文句子（会入库、可点读有译文）+ 图注文本（会渲染成
 *  `<figcaption>`，**不可点读也没有译文**）。
 *
 *  为什么门槛要用它而不是只看正文：Vogue 的经典回顾本体是图集，正文往往只有一段
 *  150—250 词的导语，真正把「这张旧照是谁、哪年、穿的什么」讲清楚的是图注
 *  （图注词数中位数 362 词，比正文还多）。2026-09-14 只按「正文 ≥300 词」卡，
 *  29 条满足全部内容规则的候选里只剩 3 条，碧昂丝那篇（45 图 / 41 张早期影像 /
 *  正文 178 词 + 图注 641 词）被判「文字太薄」。
 *  用户当日拍板：正文 ≥80 词 且 正文+图注 ≥300 词（24 人 / 26 条）。
 *
 *  返回的 `words` 是**全文口径**（所有 figure 的图注都算），不随入库时的
 *  「每篇最多留 16 张图」截断 —— 门槛判的是「这篇文章值不值得收」，
 *  不该被存储上限左右。 */
export function classicRead(articleHtml) {
  const blocks = classicBlocks(articleHtml);
  const sents = classicSents(blocks);
  const words = sents.reduce((n, s) => n + wordCount(s), 0);
  const imgs = blocks.filter(b => b.kind === "img");
  const capWords = imgs.filter(b => b.cap && b.cap.length > 8)
    .reduce((n, b) => n + wordCount(b.cap), 0);
  return { blocks, sents, words, capWords, readWords: words + capWords, imgs: imgs.length };
}

/* 供入库用：按页面顺序把「段落」与「图」拼成交替块。
 * figure 的字符区间先划出来，落在其中的 <p> 要跳过——Vogue 的 <figcaption> 里
 * 偶尔嵌 <p>，不跳过就会把图注当成正文段落，读起来像「一句图注被当成正文」。
 * 返回：{kind:"p", text} | {kind:"img", url, cap, year, w}，顺序即原图顺序。 */
export function blocksOf(articleHtml) {
  const figs = [...articleHtml.matchAll(/<figure[\s>]([\s\S]*?)<\/figure>/gi)]
    .map(m => ({ at: m.index, end: m.index + m[0].length, inner: m[1] }));
  const inFig = i => figs.some(f => i >= f.at && i < f.end);

  const nodes = [];
  for (const f of figs) {
    const picked = figureImgs(`<figure>${f.inner}</figure>`);
    if (!picked.length) continue;
    const img = picked[0];
    const ym = img.cap.match(YEAR_ONE);
    nodes.push({ at: f.at, kind: "img", img: { ...img, year: ym ? Number(ym[1]) : 0 } });
  }
  for (const m of articleHtml.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)) {
    if (inFig(m.index)) continue;
    const text = plainText(m[1]);
    if (text) nodes.push({ at: m.index, kind: "p", text });
  }
  nodes.sort((a, b) => a.at - b.at);
  return nodes.map(n => n.kind === "p"
    ? { kind: "p", text: n.text }
    : { kind: "img", ...n.img });
}

export const YEAR_RE = /\b(1[89]\d\d|20[0-2]\d)\b/g;
export const YEAR_ONE = /\b(1[89]\d\d|20[0-2]\d)\b/;

/* 实测结果的口径版本。`measure` 的输出会被缓存在 tools/_spot/classics-measure.json，
 * 缓存里只有数字、没有 HTML，所以**改了测量口径而缓存还在，就会拿旧数当新数用**
 * —— 2026-09-14 对齐词数口径时正是这个坑：不升版本，重跑也还是旧词数。
 * 任何会改变 measure 输出含义的改动都必须把它 +1（缓存自动作废，只重抓不误判）。 */
export const MEASURE_VERSION = 4;

/* 图注里抽第一个年份挂到图上 —— 「判断照片拍摄年代，不是文章发布日期」靠这个字段落地 */
export function measure(url, html) {
  const art = articleOf(html);
  const read = classicRead(art);
  const figs = figureImgs(art);
  for (const f of figs) {
    const m = f.cap.match(YEAR_ONE);
    f.year = m ? Number(m[1]) : 0;
  }
  const caps = figs.map(f => f.cap).filter(c => c.length > 8);
  const yearsOf = c => [...c.matchAll(YEAR_RE)].map(x => Number(x[1]));
  const capped = caps.filter(c => yearsOf(c).length);
  /* 张数口径：图注里含 ≤EARLY_MAX 年份的**图**有几张 */
  const early = capped.filter(c => yearsOf(c).some(y => y <= EARLY_MAX)).length;
  const years = [...new Set(caps.flatMap(yearsOf))].sort((a, b) => a - b);
  const words = read.words;
  /* 图注词数。**不只是个统计项**：Vogue 的经典回顾是图集，正文往往只有一段 150—250 词的导语，
   * 真正把「旧照」讲清楚的是图注（`A 19-year-old Diana Spencer wore…`），而图注在
   * 阅读页上渲染成 `<figcaption>`、**不进句子流也没有译文**。
   * 所以「这篇有多少东西可读」不能只看正文词数 —— 2026-09-14 只按正文 ≥300 词卡，
   * 55 条有效候选里只剩 3 条，而碧昂丝那篇 45 图 41 张早期影像、178 词正文 + 45 条图注
   * 被判为「文字太薄」。门槛据此改为「正文 ≥80 词 且 正文+图注 ≥300 词」。 */
  const capWords = read.capWords;
  const readWords = read.readWords;
  const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || "";
  const pub = (html.match(/"datePublished"\s*:\s*"([^"]+)"/) || [])[1] || "";
  const big = figs.filter(f => f.w >= 1200).length;

  /* 图注里出现的人物。**按张数统计**而不是按名字个数——戴安娜那篇 53 张图里
     有 2 张图注提到查尔斯王子，按名字个数会整篇被标成「男女混合」，
     但它实质是完整的女性人物图集。 */
  const capNorm = caps.map(deaccent);
  const fFigs = capNorm.filter(c => RE_FEMALE_T.test(c)).length;
  const mFigs = capNorm.filter(c => RE_MALE_T.test(c)).length;
  const capText = caps.join(" \n ");
  const fNames = namesIn(capText, RE_FEMALE);
  const mNames = namesIn(capText, RE_MALE);
  const credited = caps.filter(c => /getty|corbis|instagram|shutterstock|alamy|rex features|magnum|pixel|bfi|pa wire|camera press|hulton/i.test(c)).length;

  /* 提取失败 vs 真的图少：标题宣称 25 张却抽出 0 张，那是解析没吃下这个模板。
     必须能区分出来，否则报告会写「这篇图不够」，而实际上是解析器不认识它。 */
  const claimed = Number((title.match(/(\d{1,3})\s+(?:vintage|throwback|rare|striking|stunning|iconic|archive|glamorous)?\s*(?:photos|pictures|photographs|portraits|images)/i) || [])[1] || 0);
  const extractFailed = claimed >= 6 && figs.length < claimed * 0.5;

  return {
    v: MEASURE_VERSION,
    figs: figs.length, caps: caps.length, capped: capped.length, early,
    years, words, capWords, readWords, big, credited, claimed, extractFailed,
    capFemale: fNames.length, capMale: mNames.length,
    capFemaleFigs: fFigs, capMaleFigs: mFigs,
    capFemaleNames: fNames.slice(0, 10), capMaleNames: mNames.slice(0, 10),
    title: title.replace(/&amp;/g, "&").replace(/\s*\|\s*Vogue\s*$/i, "").replace(/\s+/g, " ").trim(),
    published: pub.slice(0, 10),
    imgSample: figs.slice(0, 3).map(f => ({ w: f.w, url: f.url })),
    capSample: caps.slice(0, 4),
    figsWithCap: figs.length,
  };
}

/* ---------------- 跨站去重 ----------------
 * Vogue 美版与英版对同一个人物各发一版（实测 `45-throwback-photos-of-a-young-beyonce`
 * 与 `young-beyonce-knowles-pictures`）。**两个「看起来该管用」的指纹都实测失败**：
 *   · 图注文本不同 —— 两版各写各的；
 *   · 图片 id 也不同 —— 交集 0，两站各自上传了一份副本。
 * 所以改用可得的稳定特征：同一人物 + 图数接近（≥0.75）+ 图注年代集合交叠 ≥0.5。
 * 只对「slug 已确认女性人物」的条目生效——主题型专题（群像/红毯）不判重。 */
export function isDupePair(a, b) {
  if (a.group !== "female" || b.group !== "female") return false;
  if (!a.person || a.person !== b.person) return false;
  const fa = a.m.figs, fb = b.m.figs;
  if (Math.min(fa, fb) / Math.max(fa, fb) < 0.75) return false;
  return overlap(new Set(a.m.years), new Set(b.m.years)) >= 0.5;
}

/** 就地打上 dupeOf，返回被归并掉的条目 */
export function markDupes(probed) {
  const groups = [];
  const byRichness = probed.filter(t => t.m && !t.m.error).sort((a, b) => b.m.figs - a.m.figs);
  for (const t of byRichness) {
    const hit = groups.find(g => isDupePair(g.rep, t));
    if (hit) { hit.dupes.push(t); t.dupeOf = hit.rep.slug; }
    else groups.push({ rep: t, dupes: [] });
  }
  return groups.flatMap(g => g.dupes);
}

/* ---------------- 入选池 ----------------
 * 四条硬规则（用户 2026-09-14 过目清单后定稿）：
 *   ① 名单确认女性（group === "female"）—— 主题型群像不收。
 *   ② 图注带 ≤2005 年份的图 ≥ minEarly。
 *      为什么不能用「图够多」当唯一判据：初筛里图数最多的几条恰恰不是想要的
 *      （爱莉安娜 37 图 / 赞达亚 31 图 / 泰勒 26 图），全是「历代妆容盘点」，
 *      图注年份集中在近几年，早期影像 0—8 张 —— 按拍摄年代判断根本不算旧照回顾。
 *   ③ 同一人物只留一篇（先比早期影像张数，再比总图数）。
 *      实测维多利亚·贝克汉姆、碧昂丝、麦当娜、戴安娜各有两篇
 *      （复古照一篇 + 近期妆容盘点一篇），同一栏目连出会掉观感。
 *   ④ 文字够读：**正文 ≥ minWords 词 且 正文+图注 ≥ minRead 词**。
 *      这里必须两条线一起看。原先只有「正文 ≥300 词」，那是照新闻文章标的，
 *      套到图集上直接把池子压到 3 条（正文中位数 185 词，而图注中位数 362 词 ——
 *      图注才是这类内容的主体文字）。用户 2026-09-14 拍板改为 80 / 300：
 *      保证每篇仍有一段像样的中文导语（可点读、有译文），同时承认图注算可读文本。
 *      代价要记住：**图注不可点读、没有译文**，一篇的「中英对照」只有那 80—250 词的导语。 */
export function buildPool(entries, { minEarly = 10, minFigs = 6, minWords = 80, minRead = 300 } = {}) {
  const usable = entries.filter(t => t.m && !t.m.error && !t.dupeOf && !t.m.extractFailed);
  const textOk = t => t.m.words >= minWords && (t.m.readWords != null ? t.m.readWords : t.m.words) >= minRead;
  const eligible = usable.filter(t => t.group === "female" && t.m.figs >= minFigs
    && t.m.early >= minEarly && textOk(t));
  const byPerson = new Map();
  for (const t of eligible) {
    const prev = byPerson.get(t.person);
    if (!prev || t.m.early > prev.m.early
      || (t.m.early === prev.m.early && t.m.figs > prev.m.figs)) byPerson.set(t.person, t);
  }
  const reps = new Set(byPerson.values());
  const loseSame = eligible.filter(t => !reps.has(t));
  const pool = [...reps].sort((a, b) => classicWatchBoost(b) - classicWatchBoost(a)
    || (b.m.early - a.m.early)
    || (b.m.figs - a.m.figs));
  /* 差一口气的：其它规则都过，只卡在文字量上。单独报出来，别让「清单少了几条」变成谜。 */
  const nearMiss = usable.filter(t => t.group === "female" && t.m.figs >= minFigs
    && t.m.early >= minEarly && !textOk(t) && !loseSame.includes(t));
  return { pool, loseSame, nearMiss, usable };
}

/** 发现 → 筛选 → 实测 → 去重。`fetch-classics.mjs` 与 `ingest.mjs --classics` 共用这一条链，
 *  所以口径不可能漂。`cache` 传一个 url → measure 结果的普通对象即可跨次复用（可选）；
 *  版本对不上的缓存条目会被当作未命中重抓（见 MEASURE_VERSION）。 */
export async function scanClassics({ months = 8, site = "all", cache = null, limit = 0, onSource, onProgress } = {}) {
  const srcs = site === "all" ? SOURCES : SOURCES.filter(s => s.key === site);
  if (!srcs.length) throw new Error(`--site 只认 us / uk / all，收到：${site}`);

  const all = [];
  for (const s of srcs) {
    const r = await discover(s, months);
    if (onSource) onSource(s, r.length);
    all.push(...r);
  }
  const kept = classifyTopics(all);
  const found = kept.filter(t => t.group !== "male");
  const targets = limit ? found.slice(0, limit) : found;
  let done = 0, failed = 0, cached = 0;
  const probed = await mapLimit(targets, 5, async t => {
    if (cache && cache[t.url] && cache[t.url].figs != null && cache[t.url].v === MEASURE_VERSION) {
      t.m = cache[t.url]; cached++;
    } else {
      try {
        t.m = measure(t.url, await fetchText(t.url));
        if (cache) cache[t.url] = t.m;
      } catch (e) { t.m = { error: e.message }; failed++; }
    }
    done++;
    if (onProgress) onProgress(done, targets.length);
    return t;
  });
  const dupes = markDupes(probed);
  return { all, kept, probed, dupes, srcs, stats: { cached, failed } };
}

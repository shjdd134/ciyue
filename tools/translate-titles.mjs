/* 词阅 WordLens —— 文章标题补中文翻译
 *
 * 全站文章标题都是英文原文，读者在列表里只能靠猜。这个脚本给每篇补一个
 * titleZh（机器翻译，与正文同一套引擎/缓存），由页面渲染成英文标题下的中文小字。
 *
 * 用法：
 *   node tools/translate-titles.mjs            补全所有缺失的中文标题并写回
 *   node tools/translate-titles.mjs --dry      只报告，不写文件
 *   node tools/translate-titles.mjs --redo     连已有 titleZh 一起重译
 *   node tools/translate-titles.mjs --only extra   只处理某一组
 */

import fs from "node:fs";
import path from "node:path";
import { readDecl, writeDecl, cleanTitleZh, putTitleZh } from "./lib-text.mjs";
import { translateTexts } from "./lib-mt.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const DRY = process.argv.includes("--dry");
const REDO = process.argv.includes("--redo");
const onlyArg = process.argv.indexOf("--only");
const ONLY = onlyArg > -1 ? process.argv[onlyArg + 1] : "";

const SECTIONS = [
  { key: "builtin", file: "data.js", name: "ARTICLES", label: "内置" },
  { key: "extra", file: "data-articles-extra.js", name: "ARTICLES_EXTRA", label: "抓取" },
  { key: "archive", file: "data-articles-archive.js", name: "ARTICLES_ARCHIVE", label: "归档" },
];

/* ---------------- 人工校对表 ----------------
 * 机器翻译在标题上的硬伤：术语直译（staples→订书钉、Fall→掉落）、语序翻反
 * （Mbappe woe 翻成「姆巴佩痛击」）、专名音译错（Penélope Cruz→潘文杰）、
 * 引号被吞一半（“到处都是）。
 *
 * 按文章 id 索引（英文标题里的弯引号/破折号太多，拿标题当键很容易对不上）。
 * 只在机器译文确实读错时才加，不做风格改写；表里没有的仍走机器翻译。
 */
const TITLE_FIXES = new Map([
  /* --- 体育：球员译名与语序 --- */
  ["ft-odegaard-gives-dominant-arsenal-win-over-napol", "厄德高建功，阿森纳完胜那不勒斯"],
  ["ft-arteta-explains-new-role-for-transformed-odega", "阿尔特塔谈厄德高的新角色"],
  ["ft-poch-i-hope-to-return-to-premier-league-in-fut", "波帅：希望将来能重返英超"],
  ["ft-can-carrick-afford-to-rotate-before-manchester", "曼市德比前，卡里克还敢轮换吗？"],
  ["ft-mac-allister-wins-it-for-liverpool-against-atl", "麦卡利斯特绝杀马竞，巴尔科拉首发一波三折"],
  ["mutd-arsenal-draw", "赖斯扳平，阿森纳客平曼联"],
  ["clasico-mbappe-woe", "巴萨痛击屡失良机的皇马，姆巴佩黯然"],
  ["bayern-leipzig-rout", "凯恩上演帽子戏法，拜仁六球大胜莱比锡"],
  ["lille-psg-comeback", "马尔基尼奥斯与维蒂尼亚终场前进球，巴黎圣日耳曼获救"],

  /* --- 影视/娱乐：片名与机构名 --- */
  ["et-woody-norman-malachi-kirby-tuppence-middleton-", "伍迪·诺曼、玛拉基·柯比、塔彭丝·米德尔顿、康拉德·汗、科拉·博基尼将主演都市恐怖惊悚片《Skag & Bone》；Featuristic 制作，UTA 代理（独家）"],
  ["et-telekom-srbija-s-content-head-on-blueprint-for", "Telekom Srbija 内容主管谈把塞尔维亚制片实力推向全球的蓝图"],
  ["et-former-telepool-chief-yoko-higuchi-zitzmann-fi", "前 Telepool 掌门人 Yoko Higuchi-Zitzmann 与制片人 Mark Wachholz 创立 AI 制作公司 Dreamkite Studios（独家）"],
  ["et-okada-junichi-hosted-the-floor-quiz-format-ret", "冈田准一主持的《The Floor》第二季回归日本电视台（独家）"],
  ["bz-zendaya-tom-holland-wedding-2026", "赞达亚与汤姆·霍兰德办了私人婚礼派对，“开心得不得了”"],
  ["bz-dolly-parton-last-interview-2026", "多莉·帕顿最后一次深度专访是我做的，我学到了什么"],
  ["bz-regina-king", "雷吉娜·金谈失去、传承，以及如何挑选有共鸣的角色"],

  /* --- 时尚/美妆：Beauty 栏目里的术语不能直译 --- */
  ["fs-all-of-the-beauty-looks-from-practical-magic-2", "《魔法俏佳人 2》的全部妆造：今昔对比"],
  ["fs-victoria-beckham-on-polarizing-perfumes-peptid", "维多利亚·贝克汉姆谈争议香水、多肽，以及“保持热爱”"],
  ["fs-pen-lope-cruz-and-javier-bardem-are-the-pictur", "佩内洛普·克鲁兹与哈维尔·巴登是威尼斯的优雅写照"],
  ["fs-confirmed-alisha-boe-is-a-blast-at-parties", "确认：艾丽莎·波伊在派对上超会玩"],
  ["fs-pamela-anderson-just-wore-the-prettiest-cloudy", "帕梅拉·安德森刚做了最好看的云雾感法式美甲"],
  ["fs-let-s-add-some-chic-staples-to-your-closet-sty", "给衣橱添几件时髦基本款——J.Crew、Aritzia 和 Gap 的秋季精选"],
  ["fs-i-could-write-a-book-on-fall-nail-trends-these", "秋季美甲趋势我能写一本书——这几款 2026 造型最让我期待"],
  ["fs-the-20-best-square-nail-designs-to-try-this-fa", "今年秋天值得一试的 20 款最佳方形美甲"],
  ["fs-jennifer-aniston-s-japanese-manicure-is-the-ch", "詹妮弗·安妮斯顿的日式美甲是 2026 最火的免打理趋势——教你复刻"],
  ["fs-the-biggest-hair-color-trends-of-fall-2026-are", "专业人士说，2026 秋季最大的染发趋势是免打理"],
  ["fs-not-simple-not-minimalist-in-fall-2026-it-s-ab", "不简单，也不极简——2026 秋季的奢华风趋势"],
  ["fs-here-s-what-elegance-will-look-like-in-2027-ac", "拉夫·劳伦眼中 2027 年的优雅长这样"],
  ["fs-rom-com-ponytails-and-afterglow-blush-are-here", "浪漫喜剧式马尾与余晖腮红，今秋正当红"],
  ["fs-dua-lipa-and-callum-turner-bring-their-newlywe", "杜阿·利帕与卡勒姆·特纳带着新婚甜蜜现身纽约时装周"],
  ["fs-safe-word-the-best-jewelry-launches-of-septemb", "暗号：2026 年 9 月最佳珠宝新品"],
  ["fs-giovanna-flores-spring-2027-ready-to-wear", "Giovanna Flores 2027 春季成衣"],
  ["fs-monique-lhuillier-spring-2027-ready-to-wear", "Monique Lhuillier 2027 春季成衣"],
  ["fs-3-1-phillip-lim-spring-2027-ready-to-wear", "3.1 Phillip Lim 2027 春季成衣"],
  ["bz-these-conditioners-transform-fine-strands-into", "这些护发素能把细软发变成浓密健康发"],
  ["bz-ralph-lauren-s-american-classics-take-a-walk-o", "拉尔夫·劳伦的美式经典走上浪漫路线"],

  /* --- 政治/历史：机构名、术语与破损引号 --- */
  ["his-peptides-are-all-the-rage-promising-miracle-cu", "多肽风靡一时，号称打一针就能治病美容。我们是怎么走到这一步的？"],
  ["epl-neville-chelsea-defence-2026", "阿森纳一战后，加里·内维尔痛批切尔西后防：“到处都是漏洞”"],
  ["his-the-real-story-behind-the-uprising-and-the-138", "《起义》背后的真实故事：1381 年农民起义，数千人进军伦敦要求更公平的社会"],
  ["his-world-s-largest-collection-of-serial-killer-mu", "全球最大的连环杀手“谋杀纪念品”收藏展在芝加哥开幕，从约翰·韦恩·盖西到 H.H. 福尔摩斯"],
  ["his-stealing-candy-from-children-splash-proof-urin", "从孩子手里抢糖、防溅小便池和埋起来的内裤，天哪！2026 年搞笑诺贝尔奖得主揭晓"],
  ["pol-trump-jokes-about-trying-to-redo-huge-luka-don", "特朗普在达拉斯演讲中开玩笑，说想“重做”东契奇那笔大交易"],
  ["pol-trump-pitches-5-000-checks-but-only-if-gop-win", "特朗普承诺发 5000 美元支票，前提是共和党拿下参众两院"],
  ["pol-republicans-kick-off-unconventional-midterm-co", "共和党在达拉斯召开非常规中期选举大会，特朗普发表演讲"],
  ["pol-u-s-destroys-another-alleged-drug-boat-as-rubi", "美国再摧毁一艘疑似运毒船，卢比奥为致命打击辩护"],
  ["his-these-adorable-critically-endangered-pygmy-rac", "科苏梅尔这群可爱又极度濒危的侏儒浣熊，正互相教对方把垃圾变成玩具球"],
  ["his-ale-terror-and-a-martyr-s-death-what-not-to-mi", "啤酒、恐怖与殉道者之死：贝叶挂毯上不容错过的东西"],
  ["his-the-bayeux-tapestry-has-returned-to-the-uk-and", "贝叶挂毯重返英国——你可以这样看到它"],
]);

/* ---------------- 主流程 ---------------- */

const jobs = [];        // 需要送翻译的：{ sec, idx, title }
const preFixed = [];    // 校对表直接命中的：{ sec, idx, zh }
const loaded = [];

for (const sec of SECTIONS) {
  if (ONLY && sec.key !== ONLY) continue;
  const file = path.join(ROOT, "assets", sec.file);
  if (!fs.existsSync(file)) { console.log(`· ${sec.label}：文件不存在，跳过`); continue; }
  const read = readDecl(file, sec.name);
  if (!read) { console.log(`· ${sec.label}：找不到 ${sec.name}<Array>，跳过`); continue; }
  loaded.push({ sec, file, arr: read.value });

  read.value.forEach((a, idx) => {
    const title = String(a.title || "").trim();
    if (!title) return;
    /* 校对表优先且始终生效：它是人写的结果，能盖掉机器译文 */
    if (TITLE_FIXES.has(a.id)) {
      const fix = TITLE_FIXES.get(a.id);
      if (String(a.titleZh || "").trim() !== fix) preFixed.push({ sec, idx, zh: fix });
      return;
    }
    const has = String(a.titleZh || "").trim();
    if (has && !REDO) return;
    jobs.push({ sec, idx, title });
  });
}

console.log(`待译标题：${jobs.length} 条 · 校对表命中：${preFixed.length} 条${DRY ? "（试运行）" : ""}${REDO ? " · 含已译重译" : ""}\n`);

const translated = [];
if (jobs.length) {
  const result = await translateTexts(jobs.map(j => j.title), {
    onTick: (d, t) => process.stdout.write(`\r  翻译中 ${d}/${t}   `),
  });
  console.log("\r" + " ".repeat(30) + "\r");
  jobs.forEach((j, i) => {
    const zh = cleanTitleZh(result[i], j.title);
    if (zh) translated.push({ sec: j.sec, idx: j.idx, zh });
  });
  const failed = jobs.filter((j, i) => !cleanTitleZh(result[i], j.title));
  if (failed.length) {
    console.log(`! ${failed.length} 条没译出来（下次运行会重试）：`);
    failed.slice(0, 10).forEach(f => console.log(`    ${f.sec.label} ${f.title.slice(0, 76)}`));
    if (failed.length > 10) console.log(`    …… 其余 ${failed.length - 10} 条`);
    console.log("");
  }
}

const bySection = new Map();
for (const row of [...preFixed, ...translated]) {
  if (!bySection.has(row.sec.key)) bySection.set(row.sec.key, []);
  bySection.get(row.sec.key).push(row);
}

for (const { sec, file, arr } of loaded) {
  const rows = bySection.get(sec.key) || [];
  if (!rows.length) { console.log(`· ${sec.label}：无新增译文`); continue; }
  for (const r of rows) arr[r.idx] = putTitleZh(arr[r.idx], r.zh);
  if (DRY) { console.log(`· ${sec.label}：将写入 ${rows.length} 条`); continue; }
  const changed = writeDecl(file, sec.name, arr);
  console.log(`· ${sec.label}：写入 ${rows.length} 条${changed ? "" : "（文件未变）"}`);
}

/* ---------------- 抽样 ---------------- */
console.log("\n--- 抽样 ---");
for (const { arr, sec } of loaded) {
  const rows = arr.filter(a => a.titleZh).slice(0, 3);
  if (!rows.length) continue;
  console.log(`[${sec.label}]`);
  for (const a of rows) console.log(`   ${a.title}\n   → ${a.titleZh}`);
}

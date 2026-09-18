#!/usr/bin/env node
/* PG 三篇（成长类）：paulgraham.com 原文 + 社区成熟中译本 → 块对齐 → 入库。
 *
 * 与足球管线同一套对齐机制（lib-align 的 alignBlocks 块 DP + distributeBlock 原子分配），
 * 差别只在两侧的解析器：PG 原刊是 turbify 老站（<br /><br /> 分段），中译来自三个不同社区源。
 *
 * --extract             解析英中两侧 → tools/_pg/{en,zh}/<id>.json（{lines:[{en,sentences}]}）
 * --build               块对齐 → tools/_pg/built/<id>.json + 质量报告（块数/空句/样张）
 * --inject              把 built 产物写进 assets/data-articles-extra.js（幂等，正则同 ingest）
 *
 * 译本署名：条目带 translationCredit 字段（数据层留痕，页面「关于」展示）。
 * 原刊快照：.tmp/pg/pg-*.html（抓取于 2026-09-17）；译本快照：.tmp/pg/{hs-github.md,sina-love.html,untymen-greatwork.html}。
 */
import fs from 'node:fs';
import path from 'node:path';
import { decodeEntities } from './lib-mt.mjs';
import { splitZhSentences } from './lib-tribune.mjs';
import { splitOriginalSentences } from './lib-people.mjs';
import { alignBlocks, buildParagraphsFromBlocks } from './lib-align.mjs';

const root = path.resolve(import.meta.dirname, '..');
const TMP = path.join(root, '.tmp', 'pg');
const OUT = path.join(root, 'tools', '_pg');
/* 直接运行才进 CLI；被 scan.mjs import（取 CN_REVIEWED）时不执行 */
const invokedDirectly = process.argv[1] && process.argv[1].replace(/\\/g, '/').endsWith('pg.mjs');
const mode = invokedDirectly
  ? (process.argv.includes('--extract') ? 'extract' : process.argv.includes('--build') ? 'build' : process.argv.includes('--inject') ? 'inject' : null)
  : null;
if (invokedDirectly && !mode) throw new Error('使用 --extract / --build / --inject');

const ARTICLES = [
  {
    id: 'gr-pg-what-youll-wish-youd-known',
    title: "What You'll Wish You'd Known",
    titleZh: '你希望高中时就知道的事',
    date: '2005-01-01',
    minutes: 22,
    url: 'https://www.paulgraham.com/hs.html',
    gradient: 'linear-gradient(135deg,#fde68a 0%,#d97706 100%)',
    translationCredit: '中文译文：lzwjava / paul-graham-essays-cn（GitHub 社区译本，CC BY-SA 4.0）',
    en: { type: 'pg', file: 'pg-hs.html' },
    zh: { type: 'md', file: 'hs-github.md' },
  },
  {
    id: 'gr-pg-how-to-do-what-you-love',
    title: 'How to Do What You Love',
    titleZh: '如何做你热爱的事',
    date: '2006-01-01',
    minutes: 19,
    url: 'https://www.paulgraham.com/love.html',
    gradient: 'linear-gradient(135deg,#fecaca 0%,#dc2626 100%)',
    translationCredit: '中文译文：王亮（2006，社区公认译本）',
    en: { type: 'pg', file: 'pg-love.html' },
    zh: { type: 'sina', file: 'sina-love.html' },
  },
  {
    id: 'gr-pg-how-to-do-great-work',
    title: 'How to Do Great Work',
    titleZh: '如何成就卓越',
    date: '2023-07-01',
    minutes: 48,
    url: 'https://www.paulgraham.com/greatwork.html',
    gradient: 'linear-gradient(135deg,#bfdbfe 0%,#2563eb 100%)',
    translationCredit: '中文译文：untymen.com（社区译本）',
    en: { type: 'pg', file: 'pg-greatwork.html', noNotes: true },
    zh: { type: 'untymen', file: 'untymen-greatwork.html' },
  },
];

const stripTags = s => decodeEntities(String(s || '').replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
const hanzi = s => (String(s || '').match(/[\u4e00-\u9fff]/g) || []).length;

/* ---------- 英文侧：paulgraham.com（turbify，<br /><br /> 分段） ---------- */
function parsePg(html, title, noNotes=false) {
  let t = html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<br\s*\/?\s*>\s*(<br\s*\/?\s*>)+/gi, '\n\n')
    .replace(/<br\s*\/?\s*>/gi, '\n')
    .replace(/<[^>]*>/g, ' ');
  t = decodeEntities(t);
  let paras = t.split(/\n{2,}/).map(s => s.replace(/\s+/g, ' ').trim()).filter(Boolean)
    .filter(s => !/[<>]|-->/.test(s))                       /* 注释/标签残渣（正文里不会出现尖括号） */
    .filter(s => s !== title)
    .filter(s => !/^(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}\s*$/.test(s))
    .filter(s => !/^(?:Watch this|Listen to|Buy .*(?:Amazon|ebook)|Comment on this|More essays|Related|View PDF)/i.test(s))
    .filter(s => !/^Comments?(?:\s*\(|$)/i.test(s))
    .filter(s => !/Want to start a startup\? Get funded by Y Combinator/i.test(s))
    .filter(s => (s.match(/Translation/g) || []).length < 2);   /* 页尾「X Translation」链接堆 */
  if (noNotes) {
    /* 注释区整体截断：注释列表从第一个以 [N] 开头的段开始，此后全是注释——注内续行不以 [N]
     * 开头（greatwork 注4 的 "There's no way you could search..."、注20 尾行 Yeats 引文
     * "Are full of passionate intensity."、以及致谢段），逐段过滤漏掉它们，实测在 built
     * 尾部造成 5 句错位（flat 678-687 区，ratio 异常 4 处）。正文段的行内引注在句尾
     * （"...took for granted. [ 2 ]"），不会以 [N] 开头，不受影响。 */
    const i0 = paras.findIndex(s => /^\[\s*\d+\s*\]/.test(s));
    if (i0 >= 0) paras = paras.slice(0, i0);
  }
  return paras.filter(s => (s.match(/[A-Za-z']+/g) || []).length >= 3);
}

/* 中文侧解析器（每源一个） */
/* 社区译本常带 Markdown 加粗（untymen 的 **极客（Nerds）**、GitHub md 的 **粗体**），
 * 正文是纯文本流，实测 text-scan 会报「残留 Markdown 标记」（2026-09-18 greatwork 9 处）
 * → 解析层统一剥掉 **（单 * 斜体译本里未见，不误伤） */
const stripMd = s => s.replace(/\*\*/g, '');
function zhFromMd(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const paras = raw.split(/\n{2,}/).map(s => s.replace(/\s+/g, ' ').trim()).filter(Boolean)
    .filter(s => !/^#/.test(s) && !/^-{3,}$/.test(s) && !/^>/.test(s))
    .filter(s => !/作者：Paul Graham/.test(s))
    .filter(s => !/^2005\s*年\s*1\s*月$/.test(s))                     /* 译本的日期行单独成段 */
    .filter(s => !/你希望你能更早知道什么/.test(s) || hanzi(s) > 15)   /* 译本把标题单独成段，剥掉 */
    .filter(s => !/^(?:译(?:者)?(?:注|按)|说明|参考|原文)[:：]/.test(s))
    .filter(s => !/github\.com|creativecommons|署名-相同方式/i.test(s));
  return paras.map(stripMd);
}
function zhFromSina(file) {
  const html = fs.readFileSync(file, 'utf8');
  const start = html.indexOf('sina_keyword_ad_area2');
  if (start < 0) throw new Error('sina: 找不到 articalContent 容器');
  let seg = html.slice(start);
  const cut = ['sina_keyword_ad_area3', '关于博主', '发表于', 'var slotArr', '新浪简介', 'Copyright ©', '赠金笔', '意见反馈', '前一篇'].map(m => seg.indexOf(m)).filter(i => i > 0);
  if (cut.length) seg = seg.slice(0, Math.min(...cut));
  let t = seg.replace(/<br\s*\/?\s*>\s*(<br\s*\/?\s*>)+/gi, '\n\n').replace(/<br\s*\/?\s*>/gi, '\n').replace(/<\/p>/gi, '\n\n').replace(/<[^>]*>/g, ' ');
  t = decodeEntities(t);
  const paras = t.split(/\n{2,}/).map(s => s.replace(/\s+/g, ' ').trim()).filter(Boolean)
    .filter(p => !/var\s+\w+\s*=|function\s*\(|document\.|window\.|\.src\s*=|SINA_\w+/.test(p))
    /* 尾部泄漏的页面脚本片段（__load_js(); 之类）：无汉字却带代码标点 */
    .filter(p => hanzi(p) > 0 || !/[();=]/.test(p));
  /* 头部是「标题/翻译人/修订历史/摘要/目录」，正文从第一个长段开始 */
  const bodyStart = paras.findIndex(p => hanzi(p) >= 30 && !/摘要|译自|修订/.test(p));
  const out = paras.slice(bodyStart < 0 ? 0 : bodyStart)
    .filter(p => !/^(?:目录|工作|界限|诱惑|慎重|两条路|致谢)$/.test(p))
    .filter(p => !/修订|摘要|欢迎到|讨论本译文|转载/.test(p));
  return out;
}
/* 连续重复段去重 v2：untymen 把「风格与真诚」一节放了两份，且**旧版与修订版措辞不同**
 * （旧版「非正式/形式主义」、修订版「不拘形式」），v1 的逐段相等比对抓不住 → 旧版 5 段
 * 混进正文，把 flat 186-222 整段块对齐顶乱（实测 ratio 异常 3 处 + 大量隐性错配）。
 * v2 规则：归一化（仅汉字+字母数字）后共享 ≥40 字连续公共子串视为同段（长句子的措辞
 * 改动改不掉 40 字连续原句）；从 i/j 起连续 ≥1 段两两配对且总长 ≥3 → 丢前面那份
 * （保留修订版）；再向前用 ≥12 字宽限延伸收尾段（旧版首段与修订版仅共享 13 字
 * 「真诚的另一个更微妙的成分是」，实测恰好接住）。
 * 命中率实测（2026-09-18，三篇全量）：仅 greatwork 丢 5 段（旧版重复节），hs/love 0 段。 */
const normKey = s => String(s).replace(/[^\u4e00-\u9fffA-Za-z0-9]/g, '');
function hasCommonRun(a, b, k) {
  if (a.length < k || b.length < k) return false;
  const win = new Set();
  for (let i = 0; i + k <= b.length; i++) win.add(b.slice(i, i + k));
  for (let i = 0; i + k <= a.length; i++) if (win.has(a.slice(i, i + k))) return true;
  return false;
}
function dedupeRuns(paras) {
  const norm = paras.map(normKey);
  const drop = new Set();
  for (let j = 1; j < paras.length; j++) {
    if (drop.has(j)) continue;
    let i = -1;
    for (let x = 0; x < j; x++) if (!drop.has(x) && hasCommonRun(norm[x], norm[j], 40)) { i = x; break; }
    if (i < 0) continue;
    let len = 1;
    while (i + len < paras.length && j + len < paras.length
      && hasCommonRun(norm[i + len], norm[j + len], 40)) len++;
    if (len < 3) continue;
    let ext = 0;
    while (i - 1 - ext >= 0 && !drop.has(i - 1 - ext) && j - 1 - ext > i + len - 1
      && hasCommonRun(norm[i - 1 - ext], norm[j - 1 - ext], 12)) ext++;
    for (let x = 0; x < len + ext; x++) drop.add(i - ext + x);
    j += len - 1;
  }
  if (drop.size) console.log(`  dedupeRuns v2: 丢弃 ${drop.size} 段重复 → ${[...drop].map(x => `ZH[${x}]「${paras[x].slice(0, 18)}…」`).join(' ')}`);
  return paras.filter((p, x) => !drop.has(x));
}

function zhFromUntymen(file) {
  const html = fs.readFileSync(file, 'utf8');
  const a = html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/i);
  if (!a) throw new Error('untymen: 找不到 <article>');
  let t = a[1]
    .replace(/<h[1-4]\b[^>]*>[\s\S]*?<\/h[1-4]>/gi, '\n\n')   /* 译者加的小标题，不属于原文 */
    .replace(/<br\s*\/?\s*>\s*(<br\s*\/?\s*>)+/gi, '\n\n').replace(/<br\s*\/?\s*>/gi, '\n').replace(/<\/p>/gi, '\n\n')
    .replace(/<[^>]*>/g, ' ');
  t = decodeEntities(t);
  const out2 = t.split(/\n{2,}/).map(s => s.replace(/\s+/g, ' ').trim()).filter(Boolean)
    .filter(p => !/原文[:：]|https?:\/\/|上一篇|下一篇|相关文章|版权|©/.test(p))
    .filter(p => !/分钟阅读|中文翻译/.test(p))                  /* 页头 meta：作者/日期/阅读时长 */
    .filter(p => hanzi(p) >= 6)
    /* 译者自加的目录段：多个「第X步/策略」标题连排，不是正文 */
    .filter(p => ((p.match(/第[\d一二三四五六七八九十]+步|策略[：:]/g) || []).length) < 3);
  return dedupeRuns(out2.map(stripMd));
}

const ZH_PARSERS = { md: zhFromMd, sina: zhFromSina, untymen: zhFromUntymen };

/* ---------- 逐处改（2026-09-17/18 人工校对）：句级对齐覆盖 ----------
 * 三类来源：
 *  A. ratio 扫描（tools/_pg/scan.mjs）出的 19 处异常（hs 6 / love 3 / greatwork 10）；
 *  B. 异常周边连带错位：love 的王亮译本在 flat 33-106 区间语序重排（译文段序与原文
 *     不一致，如先答后问），块 DP 的单调假设表达不了 → 整段句级重配；greatwork 的
 *     4 处局部漂移（原子分配在「译者合并句」处错位一格）。
 *  C. ratio 误报但人工核对内容正确 → CN_REVIEWED（scan 跳过，不动译文）。
 * cn 文本一律取自现有译本原文的重新切分（不改变译文字词），仅 4 处标注【衔接】的
 * 短句是补译——译者合并/略去了对应 EN 句，不补则该句显示错配译文。
 * 匹配规则：EN 归一化空白后前缀匹配，找到即消费；找不到 → build 直接报错（守卫：
 * 上游提取一变，这里立刻炸出来，不许静默错位）。 */
const CN_FIX = {
  'gr-pg-how-to-do-great-work': [
    /* flat 39-44：译者把 EN 39+40 合并成一句、41 拆成两小句 → 原子分配整体漂移一格 */
    ['Great work often has a tincture of strangeness', '伟大的工作往往都带有一丝奇异色彩。'],
    ['You see this from painting to math', '无论是绘画还是数学，都是如此。'],
    ['It would be affected to try to manufacture it', '不必刻意猎奇，但若它自然出现，请欣然拥抱。'],
    ['Boldly chase outlier ideas', '大胆追逐那些“离群”的想法，即使——或者说尤其是——其他人都不感兴趣时。'],
    ['If you\'re excited about some possibility that everyone else ignores', '如果你对某种可能性感到兴奋，而旁人视而不见，且你有足够的专业知识指出他们的疏漏，那么这很可能就是你一直在寻找的最佳良机。[3]'],
    ['Four steps: choose a field', '选定领域；学至前沿；发现缺口；探索有希望的缺口。'],
    /* flat 473-478：同上，「优势清单」段落译者重排 */
    ['With effort you can acquire some of the latter', '努力在年轻时获取一些后者，在年老时保留一些前者。'],
    ['The old also have the advantage of knowing', '年长者还有一个优势：他们清楚自己拥有哪些优势。'],
    ['The young often have them without realizing it', '虽然他们往往不自知。'],
    ['The biggest is probably time', '年轻人最大的优势恐怕是时间，'],
    ['The young have no idea how rich they are in time', '只是他们往往意识不到自己拥有多少时间。'], /*【衔接】译者未单译此句 */
    ['The best way to turn this time to advantage', '利用时间的最好方式是稍微“挥霍”一下：出于好奇去学点没用的东西，或者纯粹为了耍帅造个东西，或者在某件小事上练到极致。'],
    /* flat 564-571：部门/同事段落，三个短句与三个长句交错 */
    ['Some departments have people doing great work', '有些部门有人在做伟大的工作；有些部门过去有过；而有些部门从未有过。'],
    ['Seek out the best colleagues', '关于同事：寻找最好的同事。'],
    ['There are a lot of projects that can\'t be done alone', '很多项目无法独自完成。'],
    ['Colleagues don\'t just affect your work', '同事不仅影响工作，更影响你。'],
    ['So work with people you want to become like', '所以，和你想成为的人一起工作，因为你会变成他们。'],
    ['Quality is more important than quantity in colleagues', '在同事的选择上，质量重于数量。'],
    ['It\'s better to have one or two great ones', '拥有一两个顶尖同事，胜过一楼不错的同事。'],
    ['In fact it\'s not merely better, but necessary', '事实上，看历史就知道，伟大工作往往成簇出现，这意味着同事往往是成败的关键。'],
    /* flat 678-682：结尾段，Yes 短句链 */
    ['Yes, you\'ll have to work hard', '是的，你得努力工作。'],
    ['But again, lots of people have to work hard', '但还是那句话，很多人都在努力工作。'],
    ['And if you\'re working on something you find very interesting', '如果你在做自己觉得非常有趣的事——若你在正确的道路上，这几乎是必然的——那这种工作大概率比你同龄人的工作要轻松得多。'],
    ['The discoveries are out there, waiting to be made', '那些伟大的发现就在那里，等待着被看见。'],
    ['Why not by you?', '为什么不是你呢？'],
  ],
  'gr-pg-how-to-do-what-you-love': [
    /* flat 29-36：upper-middle class 一节，王亮把 EN 35+36 合并、33 拆长 */
    ['Adults would sometimes come to speak to us about their work', '大人会在孩子读高中的时候向他们讲些工作上的事，也允许孩子跑去看他们工作的样子。'],
    ['It was always understood that they enjoyed what they did', '那时我总觉得大人都很喜欢各自的工作，'],
    ['In retrospect I think one may have: the private jet pilot', '现在回头想想，也许只有私人飞行员才真正喜欢，'],
    ['But I don\'t think the bank manager really did', '但银行经理肯定不喜欢他的那份工作。'],
    ['The main reason they all acted as if they enjoyed their work', '有一种说法，中高层人士都喜欢自己的工作。于是，人们都装模作样喜欢自己的工作，仿佛自己是中高层人士中的一员，'],
    ['It would not merely be bad for your career', '否则不仅会影响其职业生涯，而且显得没有教养。'],
    ['Why is it conventional to pretend to like what you do?', '为什么人们都要装作喜欢自己的工作？'],
    ['The first sentence of this essay explains that', '本文第一句话可以解释这一点。'],
    ['If you have to like something to do it well', '如果一个人只能做好他喜欢的事情，那么，有些人能成功，就是因为喜欢自己的工作。'],
    ['That\'s where the upper-middle class tradition comes from', '这就是中上层阶级传统的由来。'], /*【衔接】译者未单译此句 */
    ['Just as houses all over America are full of chairs', '如同在美国，家家户户都有250年前法国国王用椅的不同程度的仿制品一样（尽管主人可能并不太清楚），人们对工作的态度也是在不同程度上、有意无意地模仿成功人士。'],
    ['School has trained them to regard work as an unpleasant duty', '一方面，学校教导他们工作是一种责任，但毫无乐趣可言，'],
    ['Having a job is said to be even more onerous than schoolwork', '工作甚至比上学还辛苦。'],
    /* flat 48-53：[2][3] 引注段，王亮的两个长句与 EN 48-50 交错 */
    ['If you take a boring job to give your family a high standard of living', '如果某人选择无聊的工作是为了让全家人生活得好一点――很多人也真的是这么做的――那么他的孩子很可能受其影响，也认为工作挺无聊的。'],
    ['[ 2 ] Maybe it would be better for kids', '[2]而如果父母能为自己多考虑考虑（选择自己喜欢的工作，尽管以牺牲全家人的生活质量为代价――译者注），教出来的孩子反而会好一些。'],
    ['A parent who set an example of loving their work', '热爱工作的父母对子女的影响是昂贵的房子无法带来的。[3]'],
    ['It was not till I was in college', '读大学时，我才明白养家糊口不是工作的唯一目的。'],
    ['Then the important question became not how to make money', '选择什么工作要比赚多少钱重要。'],
    ['Ideally these coincided, but some spectacular boundary cases', '虽然人们一般认为工作就是为了生存，但也有特别值得一提的故事（比如说爱因斯坦在专利局上班）说明，事实并非总是如此。'],
    ['The definition of work was now to make some original contribution', '如今，工作的目的是为世界做出贡献，同时也要能够生存。'],
    ['But after the habit of so many years my idea of work still included', '可是这么多年来，我一直无法改变自己的错误想法，认为工作中令人痛苦的事情很多。'],
    ['Work still seemed to require discipline', '工作中仍然需要不断钻研，所谓“天将降大任于斯人也，必先苦其心智，劳其筋骨……”。'],
    ['Surely one had to force oneself to work on them', '所以，人们不得不强迫自己做这些工作。'],
    ['If you think something\'s supposed to hurt', '如果认为工作注定是件痛苦的事，当工作中出现错误就觉察不出来。'],
    ['That about sums up my experience of graduate school', '这就是我在研究生院学习期间的思考所得。'],
    ['How much are you supposed to like what you do?', '一个人能够喜欢工作到什么程度呢？'],
    ['Unless you know that, you don\'t know when to stop searching', '如果他不知道这个问题的答案，就不知道该在什么时候停止寻找。'],
    ['And if, like most people, you underestimate it', '另外，如果他像其他人那样，低估了对工作的热爱之情，又会过早地停止寻找。'],
    ['You\'ll end up doing something chosen for you by your parents', '他或者会听从父母的安排，或者去追名逐利，又或者什么也不做。'],
    ['Here\'s an upper bound', '一方面，“做你喜欢做的事”不意味着做此时此刻最想做的事，'],
    ['Even Einstein probably had moments when he wanted to have a cup of coffee', '即便是爱因斯坦也会有想喝咖啡的时候，但他会告诫自己先完成手头的工作。'],
    ['It used to perplex me when I read about people', '我总是无法理解有些人非常喜欢自己的工作以至于其它的事都不想做，'],
    ['There didn\'t seem to be any sort of work I liked that much', '因为我从来没有如此喜欢过一份工作。'],
    ['If I had a choice of (a) spending the next hour', '如果我可以选择(a)花一小时做点什么，或者(b)瞬间转移(teleport)到罗马，然后在那里闲逛一小时。我会更喜欢哪一个呢？'],
    ['Honestly, no.', '说实话，都不喜欢。'],
    ['But the fact is, almost anyone would rather, at any given moment', '然而，在某些特定的时刻，几乎每个人都会倾向去Carribbean飘流、做爱、或者享用美食，而不是去解决难题。'],
    ['The rule about doing what you love assumes a certain length of time', '做自己喜欢的事是有时间范围的。'],
    ['It doesn\'t mean, do what will make you happiest this second', '不能是只在某一刻特别想做的事，必须要持续一段较长的时间，比如一个星期或者一个月。'],
    ['Unproductive pleasures pall eventually', '没有成果的快乐是无法持续的，'],
    ['After a while you get tired of lying on the beach', '如果厌倦了躺在沙滩上，'],
    ['If you want to stay happy, you have to do something', '而又想保持快乐，就得做点事情出来。'],
    ['As a lower bound, you have to like your work more', '另一方面，必须得喜欢工作多一点，喜欢享受少一点，'],
    ['You have to like what you do enough that the concept of', '要有不做点事就闲得难受的劲头。'],
    ['Which is not to say you have to spend all your time working', '当然也不能没日没夜地工作，'],
    ['You can only work so much before you get tired', '可以坚持工作直到疲劳为止，'],
    ['Then you want to do something else', '然后可能想做点别的，甚至只是发呆。'],
    ['But you don\'t regard this time as the prize', '但不要把这种时刻当成一种奖励，或者辛苦工作的补偿。'],
    ['I put the lower bound there for practical reasons', '我这么说是有原因的，'],
    ['If your work is not your favorite thing to do', '如果一个人在做着自己并不喜欢的工作，那么不会有什么成就，'],
    ['You\'ll have to force yourself to work', '因为强迫自己工作不可能比别人做得好。'],
    ['To be happy I think you have to be doing something', '要想工作得快乐，不仅要做自己喜欢的事，而且是令人佩服的事，'],
    ['You have to be able to say, at the end, wow', '是那种做完可以说“哇，太酷了”的工作。'],
    ['This doesn\'t mean you have to make something', '不一定非得制造点什么出来，'],
    ['If you learn how to hang glide', '学会开滑翔机，说一口流利的外语，都足以让人感觉很酷，至少是那一刻。'],
    ['What there has to be is a test', '可以用这种方法来测试自己。'],
    ['So one thing that falls just short of the standard', '我认为读书就不符合这一标准。'],
    ['Except for some books in math and the hard sciences', '除了某些数学书或者实用科学书籍，很难准确说读完一本书后的感受，这也是为什么读书和工作不太一样。'],
    ['You have to do something with what you\'ve read', '只有在实践中运用了读到的知识，才会感觉有收获。'],
    ['I think the best test is one Gino Lee taught me', 'Gino Lee告诉过我一个好方法――做一件能让你的朋友说“哇”的事情。'],
    ['But it probably wouldn\'t start to work properly till about age 22', '但这可能不适用于22岁以下的人，因为他们认识的人太少，碰不到真正的朋友。'],
    ['What you should not do, I think, is worry about the opinion', '我认为，一个人不应该在乎别人的看法，除非是他的朋友。'],
    ['You shouldn\'t worry about prestige', '不要想着出名，不必太在意众人的意见。'],
    ['Prestige is the opinion of the rest of the world', '能够得到尊敬的人的意见就够了，'],
    ['When you can ask the opinions of people whose judgement you respect', '何必在乎那些根本就不认识的人呢？[4]'],
    ['This is easy advice to give', '说起来容易做起来难，'],
    ['It\'s hard to follow, especially when you\'re young', '对孩子来说更是如此。[5]'],
    ['[ 5 ] Prestige is like a powerful magnet', '出名极具诱惑力，甚至可以让人放弃其所爱，'],
    ['It causes you to work not on what you like', '转而去做一些他渴望喜欢的事情。'],
    ['That\'s what leads people to try to write novels', '比如，有些人之所以写小说，'],
    ['They like reading novels', '是因为他们喜欢读小说，'],
    ['They notice that people who write them win Nobel prizes', '而且发现写小说可以得诺贝尔奖，'],
    ['What could be more wonderful, they think, than to be a novelist?', '于是乎他们会想，难道还会有什么工作比成为一名作家更好吗？'],
    /* flat 240-245：结尾段短句链漂移 */
    ['Whichever route you take, expect a struggle', '选择哪条路，是要经历一番思想斗争的。'],
    ['Finding work you love is very difficult', '找到喜欢做的工作很难，'],
    ['Most people fail.', '大多数人都没能做到这一点。'],
    ['Even if you succeed, it\'s rare to be free to work on what you want', '即使能做到，也要等到三、四十岁。'],
    ['But if you have the destination in sight', '但是，只要有这个愿望，就很可能会实现。'],
    ['If you know you can love work, you\'re in the home stretch', '如果知道自己会喜欢工作，就胜利在望了，如果知道自己具体爱做什么工作，就已经实现了这个目标。'],
  ],
  'gr-pg-what-youll-wish-youd-known': [
    /* flat 292-295：23 岁领悟一节，短句链漂移一格 */
    ['The only real difference between adults and high school kids', '成年人和高中生孩子的唯一真正的区别是，成年人意识到了他们必须把事情搞定，但高中生没意识到。'],
    ['That realization hits most people around 23', '这种领悟一般是在 23 岁的时候降临到大多数人身上。'],
    ['But I\'m letting you in on the secret early', '但我现在提前告诉你这个秘密。'],
    ['So get to work.', '所以，开始干吧。'], /*【衔接】译者未单译此句 */
    /* flat 253-254：译者把 EN 254 的译文与 253 黏连 */
    ['So let the path grow out the project', '所以，让道路从项目中生长出来。'], /*【衔接】译者未单译此句 */
    ['The most important thing is to be excited about it', '最重要的是一路上，你在不断学习。'],
    /* flat 296：sina 页残留目录字「附录」 */
    ['Maybe you can be the first generation whose greatest regret', '或许你们可以成为高中毕业后不会遗憾浪费了如此多的时间的第一代人。'],
  ],
};
/* ratio 误报白名单：EN 句极短（Relief. / Indifference, mainly.）、或译者特意展开/收拢
 * （CN_FIX 里改配后仍超带的短句，内容已人工核对无误）→ scan 跳过。 */
const CN_REVIEWED = {
  'gr-pg-what-youll-wish-youd-known': ['Relief.', 'Indifference, mainly.', 'That realization hits most people around 23'],
  'gr-pg-how-to-do-what-you-love': [
    'What a recipe for alienation',
    '[ 2 ] Maybe it would be better for kids',
    'Honestly, no.',
    'Unproductive pleasures pall eventually',
    'You shouldn\'t worry about prestige',
    'Most people fail.',
  ],
  'gr-pg-how-to-do-great-work': ['There are a lot of projects that can\'t be done alone'],
};
function applyCnFix(articleId, paras) {
  const flat = paras.flatMap(p => p.sentences);
  const norm = s => String(s).replace(/\s+/g, ' ').trim();
  const used = new Set();
  const find = (prefix, any) => {
    const p = norm(prefix);
    const i = flat.findIndex((s, k) => (any || !used.has(k)) && norm(s.en).startsWith(p));
    if (i < 0) throw new Error(`${articleId}: CN_FIX/REVIEWED 找不到 EN「${p.slice(0, 50)}」（上游提取变了？）`);
    used.add(i);
    return i;
  };
  for (const [prefix, cn] of CN_FIX[articleId] || []) flat[find(prefix)].cn = cn;
  /* REVIEWED 允许命中已被 CN_FIX 消费的句（同一句既改配又进白名单） */
  for (const prefix of CN_REVIEWED[articleId] || []) find(prefix, true);
  /* 清理：只留 en/cn 进产物 */
  for (const p of paras) for (const s of p.sentences) delete s._rev;
}

function linesOf(paras, side) {
  return paras.map(text => ({
    en: text,
    sentences: side === 'en' ? splitOriginalSentences(text) : splitZhSentences(text),
  })).filter(l => l.sentences.length);
}

/* EN 句切分把人名缩写「G. H. Hardy」的句点当成句界，切成 3 句（实测三篇仅 hs 一处，
 * flat 214/215 ratio 异常 4.75/19）。提取后按精确文本并回；写成数据驱动，以后再遇到
 * 缩写切句就往这里加一条。 */
const EN_MERGE = [
  { article: 'gr-pg-what-youll-wish-youd-known', parts: ['The great mathematician G.', 'H.'] },
];
function mergeAbbrevSentences(articleId, lines) {
  for (const { parts } of EN_MERGE.filter(m => m.article === articleId)) {
    for (const l of lines) {
      const ss = l.sentences;
      for (let i = 0; i + parts.length < ss.length; i++) {
        let ok = true;
        for (let k = 0; k < parts.length; k++) if (ss[i + k] !== parts[k]) { ok = false; break; }
        if (!ok) continue;
        /* ss[i..i+parts.length] 并回一句（最后一段是 "Hardy said..." 实句） */
        l.sentences = ss.slice(0, i).concat([ss.slice(i, i + parts.length + 1).join(' ')], ss.slice(i + parts.length + 1));
        break;
      }
    }
  }
  return lines;
}

/* 供 tools/_pg/scan.mjs import：ratio 误报白名单（人工核对通过的对子） */
export { CN_REVIEWED, CN_FIX };

/* ---------- 三种模式 ---------- */
if (mode === 'extract') {
  fs.mkdirSync(path.join(OUT, 'en'), { recursive: true });
  fs.mkdirSync(path.join(OUT, 'zh'), { recursive: true });
  for (const a of ARTICLES) {
    const enLines = mergeAbbrevSentences(a.id, linesOf(parsePg(fs.readFileSync(path.join(TMP, a.en.file), 'utf8'), a.title, !!a.en.noNotes), 'en'));
    const zhParas = ZH_PARSERS[a.zh.type](path.join(TMP, a.zh.file));
    const zhLines = linesOf(zhParas, 'zh');
    fs.writeFileSync(path.join(OUT, 'en', a.id + '.json'), JSON.stringify(enLines, null, 1));
    fs.writeFileSync(path.join(OUT, 'zh', a.id + '.json'), JSON.stringify(zhLines, null, 1));
    const enWords = enLines.map(l => (l.en.match(/[A-Za-z']+/g) || []).length).reduce((x, y) => x + y, 0);
    const zhHz = zhLines.map(l => hanzi(l.en)).reduce((x, y) => x + y, 0);
    console.log(`${a.id}\n  EN ${enLines.length} 段 / ${enWords} 词 / ${enLines.flatMap(l => l.sentences).length} 句\n  ZH ${zhLines.length} 段 / ${zhHz} 字 / ${zhLines.flatMap(l => l.sentences).length} 句\n  首段 EN: ${enLines[0].en.slice(0, 60)}\n  首段 ZH: ${zhLines[0].en.slice(0, 40)}`);
  }
} else if (mode === 'build') {
  fs.mkdirSync(path.join(OUT, 'built'), { recursive: true });
  for (const a of ARTICLES) {
    const enLines = JSON.parse(fs.readFileSync(path.join(OUT, 'en', a.id + '.json'), 'utf8'));
    const zhLines = JSON.parse(fs.readFileSync(path.join(OUT, 'zh', a.id + '.json'), 'utf8'));
    const src = enLines.map(l => ({ text: l.en, weight: (l.en.match(/[A-Za-z']+/g) || []).length, units: l.sentences.length }));
    const dst = zhLines.map(l => ({ text: l.en, len: hanzi(l.en), units: l.sentences.length }));
    const blocks = alignBlocks(src, dst, {});
    if (!blocks) { console.error(`${a.id}: 对齐失败`); continue; }
    const paras = buildParagraphsFromBlocks(enLines, zhLines, blocks, { splitZh: splitZhSentences })
      .map(p => ({ sentences: p.sentences }));
    /* 逐处改：人工校对的句级覆盖（含 ratio 误报白名单），找不到目标直接报错 */
    applyCnFix(a.id, paras);
    const flat = paras.flatMap(p => p.sentences);
    const empty = flat.filter(s => !s.cn || !s.cn.trim()).length;
    fs.writeFileSync(path.join(OUT, 'built', a.id + '.json'), JSON.stringify(paras, null, 1));
    console.log(`${a.id}: 块 ${blocks.length} → 段 ${paras.length}，句 ${flat.length}，空 cn ${empty}`);
    console.log('  样张[0]:', JSON.stringify(flat[0]).slice(0, 160));
    console.log('  样张[中]:', JSON.stringify(flat[Math.floor(flat.length / 2)]).slice(0, 160));
    console.log('  样张[末]:', JSON.stringify(flat.at(-1)).slice(0, 160));
  }
} else if (mode === 'inject') {
  const file = path.join(root, 'assets', 'data-articles-extra.js');
  const src = fs.readFileSync(file, 'utf8');
  const m = src.match(/(const ARTICLES_EXTRA = )(\[[\s\S]*?\n\])(;)/);
  if (!m) throw new Error('data-articles-extra.js 里找不到 ARTICLES_EXTRA 声明');
  const list = JSON.parse(m[2]);
  let added = 0, replaced = 0;
  for (const a of ARTICLES) {
    const built = JSON.parse(fs.readFileSync(path.join(OUT, 'built', a.id + '.json'), 'utf8'));
    const sents = built.flatMap(p => p.sentences);
    const empty = sents.filter(s => !s.cn || !s.cn.trim()).length;
    if (empty) throw new Error(`${a.id}: 有 ${empty} 个空译文，拒绝入库`);
    const entry = {
      id: a.id, cat: '成长', title: a.title, titleZh: a.titleZh,
      source: `Paul Graham · ${a.date.slice(0, 10)}`,
      date: a.date, minutes: a.minutes, url: a.url,
      cover: a.gradient, gradient: a.gradient, coverImg: null,
      translationCredit: a.translationCredit,
      paras: built,
    };
    const i = list.findIndex(x => x.id === a.id);
    if (i >= 0) { list[i] = entry; replaced++; } else { list.push(entry); added++; }
  }
  const out = src.slice(0, m.index) + m[1] + JSON.stringify(list, null, 1) + m[3] + src.slice(m.index + m[0].length);
  fs.writeFileSync(file, out);
  console.log(`inject 完成：新增 ${added}，替换 ${replaced}，总计 ${list.length} 篇`);
}

/* 一次性重评：给历史通道已入库的经典专题重算质量分。
 *
 * 为什么需要它：qualityScore 最初不认识图注（capWords），把这批图集当「薄新闻」打分，
 * 3 篇被 qc 的 F6 判拒收（54 分 < 65 候选线）。recommend.mjs 加了 capWords 之后，
 * 存量数据里的分数还是旧口径 —— qc 只读存量分不重算，得把分数刷一遍。
 *
 * 口径与 ingest.mjs classics() 完全一致：所有输入都从**这篇文章自己的 paras** 里数
 * （渲染层真实可读的东西），不依赖外部缓存：
 *   words     = 句对的英文词数
 *   capWords  = 图块图注的英文词数
 *   paragraphs/ sentences = 句块数 / 句对数
 *   images    = 图块数；cover = coverImg 是否存在
 * difficultyBaseScore / serverScore 不动 —— 重算难度需要词表快照，且 qc 的 F6 只卡 qualityScore。
 *
 * 用法：node tools/rescore-classics.mjs [--dry]
 */
import fs from "node:fs";
import path from "node:path";
import { qualityScore } from "./recommend.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_FILE = path.join(ROOT, "assets", "data-articles-extra.js");
const DRY = process.argv.includes("--dry");

const wordCount = s => (String(s).match(/[A-Za-z][A-Za-z'’-]+/g) || []).length;

const src = fs.readFileSync(OUT_FILE, "utf8");
const m = src.match(/(const ARTICLES_EXTRA = )(\[[\s\S]*?\n\])(;)/);
if (!m) { console.error("找不到 ARTICLES_EXTRA 声明"); process.exit(1); }
const articles = JSON.parse(m[2]);

let n = 0;
const rows = [];
for (const a of articles) {
  if (!a.pin) continue;                       // 历史通道专题才有图集口径问题
  const sents = a.paras.filter(p => p.sentences).flatMap(p => p.sentences);
  const imgs = a.paras.filter(p => p.img);
  const words = sents.reduce((n, s) => n + wordCount(s.en), 0);
  const capWords = imgs.reduce((n, p) => n + wordCount(p.cap || ""), 0);
  const { value, band } = qualityScore({
    sourceTier: 3,                            // Vogue US / British Vogue
    title: a.title, desc: "", date: a.date,
    words, capWords,
    paragraphs: a.paras.filter(p => p.sentences).length,
    sentences: sents.length,
    cover: Boolean(a.coverImg),
    images: imgs.length,
  });
  const before = a.qualityScore;
  a.qualityScore = value;
  a.qualityBand = band;
  rows.push(`${before === value ? "  =" : before + " → " + value}  ${String(band).padEnd(9)} `
    + `正文${String(words).padStart(4)} + 图注${String(capWords).padStart(4)} · ${imgs.length} 图 · ${(a.person || a.id)}`);
  if (before !== value) n++;
}
console.log(`重评 ${rows.length} 篇（pin 专题），分数变化 ${n} 篇：\n` + rows.join("\n"));

if (DRY) { console.log("\n--dry：未写盘"); process.exit(0); }
fs.writeFileSync(OUT_FILE, src.replace(m[0], m[1] + JSON.stringify(articles, null, 2) + m[3]));
console.log(`\n已写回 ${path.relative(ROOT, OUT_FILE)}`);

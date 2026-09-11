#!/usr/bin/env node
/* 词阅 WordLens —— 伊索寓言一次性导入
 *
 * 语料：Project Gutenberg #11339《AESOP'S FABLES》(V. S. Vernon Jones 译, 1912, Arthur Rackham 插画)
 *       公有领域，正文 100% 原文；插画同为公版，下载留档。
 * 产出：精选 ~32 篇经典，逐句 DeepL 翻译，追加进 assets/data-articles-extra.js，分类「寓言」。
 * 篇目不随时间轮换（经典不动），跑一次即可；加 --force 可重建。
 *
 * 前置：curl 已把 11339-h.htm 存到 tools/_aesop-raw.html
 */
import fs from "node:fs";
import path from "node:path";
import { cleanPara, cleanTitleZh, putTitleZh, tidySpace } from "./lib-text.mjs";
import { translateTexts } from "./lib-mt.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const RAW = path.join(ROOT, "tools", "_aesop-raw.html");
const OUT_FILE = path.join(ROOT, "assets", "data-articles-extra.js");
const COVERS_DIR = path.join(ROOT, "assets", "covers");
const IMG_BASE = "https://www.gutenberg.org/files/11339/11339-h/";
const SOURCE = "Aesop's Fables (1912)";
const URL = "https://www.gutenberg.org/files/11339/11339-h/11339-h.htm";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126 Safari/537.36";
const FORCE = process.argv.includes("--force");

/* 精选篇目：最有名、最有启发性的经典（覆盖龟兔赛跑/狼来了/乌鸦喝水/北风与太阳等） */
const PICKED = [
  "THE FOX AND THE GRAPES", "THE GOOSE THAT LAID THE GOLDEN EGGS", "THE FOX AND THE CROW",
  "THE WOLF AND THE LAMB", "MERCURY AND THE WOODMAN", "THE LION AND THE MOUSE",
  "THE CROW AND THE PITCHER", "THE NORTH WIND AND THE SUN", "THE HARE AND THE TORTOISE",
  "THE FOX AND THE STORK", "THE WOLF IN SHEEP'S CLOTHING", "THE MILKMAID AND HER PAIL",
  "THE SHEPHERD'S BOY AND THE WOLF", "THE FOX AND THE GOAT", "THE BEAR AND THE TRAVELLERS",
  "THE DOG AND THE SHADOW", "THE TOWN MOUSE AND THE COUNTRY MOUSE", "THE GRASSHOPPER AND THE ANTS",
  "THE ASS IN THE LION'S SKIN", "THE STAG AT THE POOL", "THE BOY AND THE FILBERTS",
  "THE FARMER AND THE VIPER", "THE OLD MAN AND DEATH", "THE MISER",
  "THE DOG IN THE MANGER", "THE WOLF AND THE CRANE", "HERCULES AND THE WAGGONER",
  "THE TWO POTS", "THE FARMER AND THE STORK", "THE MONKEY AND THE DOLPHIN",
  "THE MOUSE, THE FROG, AND THE HAWK", "THE EAGLE AND THE ARROW"
];

const GRADIENTS = [
  "linear-gradient(135deg,#c7f0e4 0%,#0e9f6e 100%)",
  "linear-gradient(135deg,#ffe0b8 0%,#c97e05 100%)",
  "linear-gradient(135deg,#d9d2ff 0%,#6c5ce7 100%)",
  "linear-gradient(135deg,#f9d3c6 0%,#c6677e 100%)",
  "linear-gradient(135deg,#cdeafd 0%,#2b7bb9 100%)",
  "linear-gradient(135deg,#e2e6c9 0%,#6f7f2a 100%)"
];

const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 46);

/* 断句（与 ingest.mjs 同规则） */
const ABBR = /\b(Mr|Mrs|Ms|Dr|St|No|vs|etc|Co|Inc|Ltd|Jr|Sr|U\.S|U\.K|e\.g|i\.e)\./g;
function splitSentences(text) {
  const guarded = text.replace(ABBR, m => m.replace(/\./g, "·"));
  return guarded.split(/(?<=[.!?…])\s+/).map(s => s.trim().replace(/·/g, ".")).filter(s => s.length > 20);
}

function parse() {
  const html = fs.readFileSync(RAW, "utf8");
  const body = html.slice(html.indexOf("<h2>AESOP'S FABLES</h2>"));
  const out = new Map();
  for (const chunk of body.split(/<hr>/)) {
    const m = chunk.match(/<h2>([^<]+)<\/h2>/);
    if (!m) continue;
    const title = m[1].trim();
    if (!PICKED.includes(title)) continue;
    const paras = [...chunk.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)]
      .map(x => x[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
    const adage = (chunk.match(/class=["']adage["'][^>]*>([\s\S]*?)<\/p>/) || [])[1]
      ?.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() || "";
    /* 插画：优先 href 里的全尺寸图；src 命中缩略图（NNNt.jpg）时还原成全尺寸 */
    let img = "";
    const href = chunk.match(/href="(images\/[^"]+?\.jpg)"/);
    const src = chunk.match(/src="(images\/[^"]+?\.jpg)"/);
    img = (href && href[1]) || (src && src[1].replace(/(\d)t\.jpg$/, "$1.jpg")) || "";
    const text = paras.filter(p => !/class=["']adage/.test(p)).join(" ");
    out.set(title, { title, text, adage, img });
  }
  return out;
}

async function downloadImg(url, dest) {
  try {
    const res = await fetch(encodeURI(url), { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(30000) });
    if (!res.ok) return 0;
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 4000) return 0;
    fs.writeFileSync(dest, buf);
    return buf.length;
  } catch { return 0; }
}

const readPrevExtra = () => {
  try {
    const src = fs.readFileSync(OUT_FILE, "utf8");
    const m = src.match(/(const ARTICLES_EXTRA = )(\[[\s\S]*?\n\])(;)/);
    return m ? JSON.parse(m[2]) : [];
  } catch { return []; }
};

async function main() {
  const prev = readPrevExtra().filter(a => a.cat !== "寓言" || !FORCE);
  const haveIds = new Set(prev.map(a => a.id));
  const fables = parse();
  console.log(`匹配到 ${fables.size}/${PICKED.length} 篇。缺：${PICKED.filter(t => !fables.has(t)).join(", ") || "无"}`);
  const todo = PICKED.map(t => fables.get(t)).filter(f => f && f.text);
  fs.mkdirSync(COVERS_DIR, { recursive: true });

  const articles = [];
  for (let idx = 0; idx < todo.length; idx++) {
    const f = todo[idx];
    const id = `fab-${slug(f.title)}`;
    if (haveIds.has(id)) { console.log(`· 已存在，跳过 ${id}`); continue; }
    const sents = splitSentences(f.text);
    const moral = f.adage ? "Moral: " + f.adage : "";
    const allSents = [...sents, ...(moral ? [moral] : []), f.title];

    process.stdout.write(`· ${f.title} (${sents.length} 句) 翻译中…`);
    const cn = await translateTexts(allSents, { maxLines: 4, maxChars: 1200 });
    const okRatio = cn.filter(Boolean).length / cn.length;
    if (okRatio < 0.8) { console.log(` 成功率 ${(okRatio * 100).toFixed(0)}% 过低，丢弃`); continue; }

    const paras = [];
    sents.forEach((en, i) => {
      const p = cleanPara({ en, cn: cn[i] || "" });
      if (p) paras.push(p);
    });
    if (moral) {
      const p = cleanPara({ en: moral, cn: cn[sents.length] || "" });
      if (p) paras.push(p);
    }
    let titleZh = cleanTitleZh(cn[sents.length + (moral ? 1 : 0)] || "", f.title);

    /* 插画 → 封面 */
    let coverImg = "";
    if (f.img) {
      const bytes = await downloadImg(IMG_BASE + f.img, path.join(COVERS_DIR, `${id}.jpg`));
      if (bytes) coverImg = `assets/covers/${id}.jpg`;
    }

    const words = (f.text.match(/[A-Za-z']+/g) || []).length;
    const grad = GRADIENTS[idx % GRADIENTS.length];
    const art = {
      id, cat: "寓言", title: tidySpace(f.title.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())),
      source: `${SOURCE} · 1912`, date: "1912", minutes: Math.max(2, Math.round(words / 130)),
      url: URL, cover: grad, gradient: grad, coverImg, paras
    };
    if (titleZh) putTitleZh(art, titleZh);
    articles.push(art);
    console.log(` ✓ ${paras.length} 段 ${coverImg ? "🖼" : ""}`);
  }

  const all = [...prev, ...articles];
  const head = `/* 词阅 WordLens —— 抓取文章（自动生成，请勿手改；运行 node tools/ingest.mjs 重新生成）
 *
 * 共 ${all.length} 篇，英文正文来自公开 RSS / 公版书的真实原文，未做改写；
 * 中文为逐句机器翻译（DeepL 为主、有道兜底），仅作学习注释；封面图与正文图取自原报道图床，本地留档。
 * 每篇保留 url 外链可溯源。来源：${[...new Set(all.map(a => (a.source || "").split(" · ")[0]).filter(Boolean))].join(" / ")}
 */

const ARTICLES_EXTRA = ${JSON.stringify(all, null, 2)};

/* 合并进 ARTICLES（按 url / id 去重，避免和 data.js 里的文章重复） */
if (typeof ARTICLES !== "undefined" && typeof ARTICLES.push === "function") {
  const _haveUrl = new Set(ARTICLES.map(a => a.url));
  const _haveId = new Set(ARTICLES.map(a => a.id));
  ARTICLES_EXTRA.forEach(a => {
    if (!_haveUrl.has(a.url) && !_haveId.has(a.id)) ARTICLES.push(a);
  });
}
`;
  fs.writeFileSync(OUT_FILE, head);

  const dist = {};
  all.forEach(a => dist[a.cat] = (dist[a.cat] || 0) + 1);
  console.log(`\n写出 ${path.relative(ROOT, OUT_FILE)}：本次新增 ${articles.length} 篇寓言，累计 ${all.length} 篇  分布 ${JSON.stringify(dist)}`);

  /* 图片压缩 */
  const PY = process.env.WORDLENS_PY || "C:/Users/sekiro/.workbuddy/binaries/python/envs/default/Scripts/python.exe";
  if (fs.existsSync(PY)) {
    const { execFileSync } = await import("node:child_process");
    try { execFileSync(PY, [path.join(ROOT, "tools", "img-post.py"), COVERS_DIR], { stdio: "inherit" }); } catch {}
  }
}

main().catch(e => { console.error("失败：", e); process.exit(1); });

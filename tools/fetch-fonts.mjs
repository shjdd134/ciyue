/* 词阅 WordLens —— 自托管字体抓取（一次性工具，可重跑）
 *
 * 为什么不让页面直接连 Google Fonts：
 *   1. 这是一个纯静态、可离线运行的应用（有 Service Worker），CDN 断了字体就回到系统黑体；
 *   2. 国内访问 fonts.googleapis.com 不稳定，首屏会先经历一次 FOUT 甚至永久降级；
 *   3. 中文正文不可能走 Web Font —— Noto Sans SC 全量 10MB 起步，为了一个字的字形下载
 *      几 MB 是负优化。中文交给系统字体（苹方 / 微软雅黑 / HarmonyOS Sans），
 *      只有拉丁字母与数字走自托管字体，并用 unicode-range 精确划界。
 *
 * 产出：assets/fonts/*.woff2 + assets/fonts.css（@font-face，URL 指向本地）
 * 运行：node tools/fetch-fonts.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const DIR = path.join(ROOT, "assets", "fonts");
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

/* 只保留拉丁子集：中文/西里尔/希腊/越南语字形全部交给系统字体 */
const WANTED = ["latin-ext", "latin"];

const FAMILIES = [
  {
    css: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap",
    slug: "dm-sans",
  },
  {
    css: "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;600;700&display=swap",
    slug: "inter-tight",
  },
];

/** 把 CSS 切成 { subset, family, weight, style, url, unicodeRange } */
function parse(css) {
  const out = [];
  const re = /\/\*\s*([a-z-]+)\s*\*\/\s*@font-face\s*\{([^}]+)\}/g;
  let m;
  while ((m = re.exec(css))) {
    const subset = m[1];
    const body = m[2];
    const get = (k) => (body.match(new RegExp(`${k}:\\s*([^;]+);`)) || [])[1]?.trim();
    const url = (body.match(/url\(([^)]+)\)/) || [])[1]?.trim();
    if (!url) continue;
    out.push({
      subset,
      family: (get("font-family") || "").replace(/['"]/g, ""),
      weight: get("font-weight") || "400",
      style: get("font-style") || "normal",
      url,
      unicodeRange: get("unicode-range") || "",
    });
  }
  return out;
}

async function get(url, asText = true) {
  const r = await fetch(url, { headers: { "User-Agent": UA } });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return asText ? r.text() : Buffer.from(await r.arrayBuffer());
}

fs.mkdirSync(DIR, { recursive: true });
// 清掉上一次的产物，避免改子集后留孤儿文件
for (const f of fs.readdirSync(DIR)) fs.rmSync(path.join(DIR, f));

const blocks = [];
let bytes = 0;

for (const fam of FAMILIES) {
  const faces = parse(await get(fam.css)).filter((f) => WANTED.includes(f.subset));
  // 同一文件被多个 weight 复用（variable font）→ 按 url 去重，只下一次
  const byUrl = new Map();
  for (const f of faces) {
    const key = f.url;
    if (!byUrl.has(key)) byUrl.set(key, { ...f, weights: new Set() });
    byUrl.get(key).weights.add(f.weight);
  }
  let i = 0;
  for (const [, f] of byUrl) {
    const name = `${fam.slug}-${f.subset}.woff2`;
    const buf = await get(f.url, false);
    fs.writeFileSync(path.join(DIR, name), buf);
    bytes += buf.length;
    // 可变字体：一个文件覆盖整段字重，@font-face 里声明范围即可
    const weights = [...f.weights].sort((a, b) => a - b);
    const range = weights.length > 1 ? `${weights[0]} ${weights[weights.length - 1]}` : weights[0];
    blocks.push(
      `@font-face {\n` +
        `  font-family: '${f.family}';\n` +
        `  font-style: ${f.style};\n` +
        `  font-weight: ${range};\n` +
        `  font-display: swap;\n` +
        `  src: url('fonts/${name}') format('woff2');\n` +
        (f.unicodeRange ? `  unicode-range: ${f.unicodeRange};\n` : "") +
        `}`
    );
    console.log(`✓ ${name}  ${(buf.length / 1024).toFixed(1)} KB  (weight ${range})`);
    i++;
  }
  console.log(`  ${fam.slug}: ${byUrl.size} 个文件 / ${faces.length} 条 font-face`);
}

const header = `/* 词阅 WordLens —— 自托管 Web Font（由 tools/fetch-fonts.mjs 生成，请勿手改）
 *
 * 只含拉丁字形，unicode-range 之外的字符（中文、俄文…）自动回落到 styles.css 里的
 * 系统字体栈 —— 中文永远不下载字体文件。
 * 字体：DM Sans（正文英文）/ Inter Tight（数字与标题），均为可变字体，一个文件覆盖多字重。
 * 许可：SIL Open Font License 1.1。
 */
`;

fs.writeFileSync(path.join(ROOT, "assets", "fonts.css"), header + "\n" + blocks.join("\n\n") + "\n");
console.log(`\n合计 ${(bytes / 1024).toFixed(1)} KB → assets/fonts.css`);

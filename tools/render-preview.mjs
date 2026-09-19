/* 正文渲染预览器：真 app.js 沙箱渲染 → ①打段落形状统计 ②导出可截图的 HTML。
 *
 * 为什么需要它：本仓库没有 playwright / chromium，`jsdom` 只能验结构、验不了排版。
 * 「正文看起来对不对」（句子边界、隐形占位、缩进错位、中英对齐）这类问题，
 * 只有**真的把页面渲染出来截图**才能确认。2026-09-19 的「朗读喇叭 opacity:0 仍占
 * 27px，句末隐形空白把段落撑碎」就是这么找到的 —— 数据层和结构层查了两轮都干净。
 *
 * 用法：
 *   node tools/render-preview.mjs                       # 段落形状统计（全部文章）
 *   node tools/render-preview.mjs --article=<id>        # 指定文章
 *   node tools/render-preview.mjs --shot                # 只生成 .bak/preview.html
 *   node tools/render-preview.mjs --shot --clamp=6      # 每档多留几段（默认 3）
 *   node tools/render-preview.mjs --shot --modes=off,tap
 *
 * 截图（Windows 自带 Edge，无需装浏览器；中文路径必须 URL 编码）：
 *   "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" \
 *     --headless=new --disable-gpu --hide-scrollbars \
 *     --screenshot="D:\四级词阅\.bak\shot.png" --window-size=450,1200 \
 *     "file:///D:/%E5%9B%9B%E7%BA%A7%E8%AF%8D%E9%98%85/.bak/preview.html"
 *   然后 Read 那张 PNG 人眼确认。
 *
 * 想验证一个**假设**（比如「把 X 关掉缝隙就没了」）：在生成的 HTML 里加一条覆盖规则
 * （参考本文件里 `.col.probe` 的写法），对比过再动源文件 —— 先验证再修。
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const base = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const arg = (k, d) => {
  const hit = argv.find(a => a.startsWith(`--${k}=`));
  return hit ? hit.slice(k.length + 3) : d;
};
const has = k => argv.includes(`--${k}`);
const SHOT_ONLY = has('shot');
const CLAMP = Number(arg('clamp', 3));
const MODES = arg('modes', 'off,tap,all').split(',').map(s => s.trim()).filter(Boolean);

/* ---------- 沙箱：加载真数据 + 真 app.js（与 tools/audit.js 同一套桩） ---------- */
const noop = () => { };
const screenEl = { innerHTML: '', style: {}, className: '', appendChild: noop };
const sandbox = {
  console,
  history: { stack: [], pushState: noop, back: noop, go: noop },
  location: { protocol: 'http:', search: '', reload: noop },
  window: { addEventListener: noop, removeEventListener: noop },
  navigator: { serviceWorker: { addEventListener: noop, register: () => ({ catch: noop }) } },
  sessionStorage: { _d: {}, getItem(k) { return this._d[k] || null; }, setItem(k, v) { this._d[k] = v; } },
  document: {
    hidden: false,
    documentElement: { setAttribute: noop },
    addEventListener: noop, removeEventListener: noop,
    querySelector: s => (s === '#screen' ? screenEl
      : s === '.phone' ? { appendChild: noop, style: {}, insertAdjacentHTML: noop } : null),
    querySelectorAll: () => [],
    createElement: () => ({
      dataset: {}, classList: { add: noop, remove: noop, toggle: noop, contains: () => false },
      closest: () => null, addEventListener: noop,
    }),
    head: { appendChild: noop },
  },
  localStorage: { _d: {}, getItem(k) { return this._d[k] || null; }, setItem(k, v) { this._d[k] = v; } },
  SpeechSynthesisUtterance: function () { },
  speechSynthesis: { cancel: noop, speak: noop },
  setTimeout, clearTimeout, setInterval: () => 0, clearInterval: noop,
  requestAnimationFrame: f => f(),
};
sandbox.window.window = sandbox.window;
vm.createContext(sandbox);

for (const f of [
  'assets/data.js', 'assets/data-words-bulk-a.js', 'assets/data-words-full.js', 'assets/data-words-mid.js',
  'assets/data-words-cet4.js', 'assets/data-articles-words.js',
  'assets/data-articles-extra.js', 'assets/data-articles-archive.js', 'assets/data-covers.js',
  'assets/data-examples.js', 'assets/data-ecdict.js', 'assets/data-tapdict.js', 'assets/data-wordfreq.js',
]) {
  const p = path.join(base, f);
  if (fs.existsSync(p)) vm.runInContext(fs.readFileSync(p, 'utf8'), sandbox, { filename: f });
}
/* 挂在 window 上的表要显式提升到沙箱全局（沙箱的 window 只是替身对象） */
vm.runInContext('var WORD_META = window.WORD_META;', sandbox);
vm.runInContext('var TAPDICT = window.TAPDICT, TAP_REVERSE = window.TAP_REVERSE;', sandbox);
vm.runInContext('var COMMON_WORDS = window.COMMON_WORDS;', sandbox);
vm.runInContext('var WORDS_CET4 = window.WORDS_CET4, ARTICLE_WORDS = window.ARTICLE_WORDS;', sandbox);
vm.runInContext(fs.readFileSync(path.join(base, 'assets/app.js'), 'utf8'), sandbox, { filename: 'assets/app.js' });

const ctx = e => vm.runInContext(e, sandbox);
const clean = s => vm.runInContext(`clean(${JSON.stringify(String(s || ''))})`, sandbox);

/* ---------- ① 段落形状统计 ---------- */
/* 句末标点计数。`Mr.` / `U.S.` 这类缩写会造成少量高估，但只用来找**显著异常**
   （一段里平均每个 sentence 含 ≥1.6 个句末标点），噪声不影响判断。 */
const ends = s => (String(s || '').match(/[.!?]["')\]]*(?=\s|$)/g) || []).length;

if (!SHOT_ONLY) {
  const arts = ctx('ARTICLES');
  let totalParas = 0, multi = 0, susp = 0, sentArr = 0, legacy = 0;
  const bad = [];
  const perArt = [];
  for (const a of arts) {
    let p2 = 0, m2 = 0, w2 = 0, arr2 = 0;
    (a.paras || []).forEach((p, i) => {
      if (p && p.img) return;
      totalParas++; p2++;
      const isArr = Array.isArray(p.sentences);
      if (isArr) { sentArr++; arr2++; } else { legacy++; }
      const n = isArr ? p.sentences.filter(Boolean).length : ((p.en || p.cn) ? 1 : 0);
      if (n >= 2) { multi++; m2++; }
      const en = isArr ? p.sentences.filter(Boolean).map(s => s.en).join(' ') : (p.en || '');
      if (n >= 1 && ends(en) / n >= 1.6) {
        susp++; w2++;
        bad.push({ id: a.id, pi: i, shape: isArr ? 'sentences[]' : 'legacy{en,cn}', n, ends: ends(en), len: String(en).length, head: String(en).slice(0, 90) });
      }
    });
    perArt.push({ id: a.id, paras: p2, multi: m2, suspicious: w2, sentArr: arr2 });
  }
  console.log('=== 段落形状总览 ===');
  console.log(`文章 ${arts.length} 篇 · 文本段落 ${totalParas} 个`);
  console.log(`  新格式 {sentences:[]} : ${sentArr} 段`);
  console.log(`  旧格式 {en,cn}       : ${legacy} 段`);
  console.log(`  含 ≥2 句的段落       : ${multi} 段`);
  console.log(`  ★ 疑似「多句并成 1 句」: ${susp} 段`);
  console.log('\n=== 逐篇 ===');
  for (const r of perArt) {
    console.log(`  ${r.id.padEnd(42)} 段${String(r.paras).padStart(4)} · 多句${String(r.multi).padStart(3)} · 疑似${String(r.suspicious).padStart(3)} · 新格式${String(r.sentArr).padStart(4)}`);
  }
  if (bad.length) {
    console.log('\n=== 疑似段落明细（前 30）===');
    for (const b of bad.slice(0, 30)) console.log(`  ${b.id} #${b.pi} [${b.shape}] n=${b.n} ends=${b.ends} len=${b.len}\n      ${b.head}`);
  }
  console.log('');
}

/* ---------- ② 导出可截图 HTML ---------- */
const artId = arg('article', ctx('ARTICLES[0].id'));
const clipParas = (html, n) => {
  const start = html.indexOf('<div class="read-body"');
  if (start < 0) return html;
  let cur = start, i = 0;
  while (i < n) { const k = html.indexOf('</p>', cur); if (k < 0) break; cur = k + 4; i++; }
  return html.slice(start, cur);
};
/* 容器 class 从**真渲染输出**里抽，不手搓。
 * 手搓等于把 app.js 拼接容器 class 的那行复制一份 —— 那边一改这边就静默走散。
 * 2026-09-19 加 .para-flow 时实测踩到：预览里 off/tap 两档仍然连排，
 * 因为工具自己拼的 class 里根本没有这一个，看着像功能没生效。
 * 预览工具的职责是「如实呈现」，不是「复述一遍实现」。 */
const capture = n => {
  const h = screenEl.innerHTML;
  const m = h.match(/class="(view read-scroll[^"]*)"/);
  return { cls: m ? m[1] : 'view read-scroll', html: clipParas(h, n) };
};

const shots = [];
for (const mode of MODES) {
  ctx(`activeArticle = ARTICLES.find(x => x.id === ${JSON.stringify(artId)}); view = { name: "read" }; S.cnMode = ${JSON.stringify(mode)}; S.highlightMode = "core"; render();`);
  const cap = capture(CLAMP);
  shots.push({ mode, cls: cap.cls, html: cap.html });
}
/* 额外一档：选中第一句（看选中反馈 —— 左边线 / 底纹 / 喇叭） */
ctx(`activeArticle = ARTICLES.find(x => x.id === ${JSON.stringify(artId)}); view = { name: "read" }; S.cnMode = "tap"; S.highlightMode = "core"; render();`);
{
  const cap = capture(CLAMP);
  shots.push({ mode: 'tap · 选中第 1 句', cls: cap.cls, html: cap.html.replace('<span class="sentence"', '<span class="sentence sel peek"') });
}
const out = path.join(base, '.bak', 'preview.html');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, `<!doctype html><html><head><meta charset="utf-8"><title>正文渲染预览</title>
<link rel="stylesheet" href="../assets/styles.css">
<style>
  body{background:#dfe0e8;margin:0;padding:20px;font-family:system-ui,sans-serif}
  .col{width:400px;margin:0 auto 16px}
  .col h2{font:600 13px/1.4 system-ui;color:#333;margin:0 0 8px;padding:4px 8px;background:#fff;border-radius:6px;display:inline-block}
  .frame{background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 6px 24px rgba(0,0,0,.13);padding-bottom:10px}
  /* 覆盖页面级定位，让整篇正文在流里全部展开（真实站点里它是独立滚动容器） */
  .view{position:static!important;height:auto!important;overflow:visible!important}
  .read-body{padding-top:4px}
</style></head><body>
${shots.map(s => `<div class="col"><h2>${s.mode}</h2><div class="frame"><div class="${s.cls}">${s.html}</div></div></div>`).join('\n')}
</body></html>`);
console.log(`文章 ${artId} → ${out}`);
console.log('截图：msedge.exe --headless=new --disable-gpu --hide-scrollbars '
  + `--screenshot="${path.join(base, '.bak', 'shot.png')}" --window-size=450,1200 `
  + `"file:///${out.replace(/\\/g, '/').split('/').map((seg, i) => (i === 0 ? seg : encodeURIComponent(seg))).join('/')}"`);

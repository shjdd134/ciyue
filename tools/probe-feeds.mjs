#!/usr/bin/env node
/* 候选 RSS 源可用性探测：能不能取到、有几条近文、带不带图。
 * 用法：node tools/probe-feeds.mjs [--days 30]
 * 仅用于选源，不写入任何站点数据。 */

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";
const argv = process.argv.slice(2);
const i = argv.indexOf("--days");
const DAYS = i >= 0 ? +argv[i + 1] : 30;

const CANDIDATES = [
  /* —— 时尚 / 美妆 / 明星（Hearst 系） —— */
  { cat: "时尚", name: "ELLE", rss: "https://www.elle.com/rss/all.xml/" },
  { cat: "时尚", name: "Harper's Bazaar", rss: "https://www.harpersbazaar.com/rss/all.xml/" },
  { cat: "时尚", name: "Cosmopolitan", rss: "https://www.cosmopolitan.com/rss/all.xml/" },
  { cat: "时尚", name: "Marie Claire", rss: "https://www.marieclaire.com/rss/all.xml/" },
  { cat: "时尚", name: "Women's Health", rss: "https://www.womenshealthmag.com/rss/all.xml/" },
  { cat: "时尚", name: "Town & Country", rss: "https://www.townandcountrymag.com/rss/all.xml/" },
  /* —— Condé Nast 系 —— */
  { cat: "时尚", name: "Vogue", rss: "https://www.vogue.com/feed/rss" },
  { cat: "时尚", name: "Glamour", rss: "https://www.glamour.com/feed/rss" },
  { cat: "时尚", name: "Allure", rss: "https://www.allure.com/feed/rss" },
  { cat: "时尚", name: "Vanity Fair", rss: "https://www.vanityfair.com/feed/rss" },
  /* —— 其他时尚媒体 —— */
  { cat: "时尚", name: "Who What Wear", rss: "https://www.whowhatwear.com/rss" },
  { cat: "时尚", name: "InStyle", rss: "https://www.instyle.com/feed/" },
  { cat: "时尚", name: "Byrdie", rss: "https://www.byrdie.com/feed/" },
  { cat: "时尚", name: "Refinery29", rss: "https://www.refinery29.com/en-us/rss" },
  { cat: "时尚", name: "The Cut", rss: "https://www.thecut.com/rss.xml" },
  { cat: "时尚", name: "Fashionista", rss: "https://fashionista.com/.rss/full/" },
  { cat: "时尚", name: "POPSUGAR", rss: "https://www.popsugar.com/feed" },
  { cat: "时尚", name: "People", rss: "https://people.com/feed/" },

  /* —— 影视娱乐 —— */
  { cat: "杂志", name: "Variety", rss: "https://variety.com/feed/" },
  { cat: "杂志", name: "Hollywood Reporter", rss: "https://www.hollywoodreporter.com/feed/" },
  { cat: "杂志", name: "Deadline", rss: "https://deadline.com/feed/" },
  { cat: "杂志", name: "Vulture", rss: "https://www.vulture.com/rss.xml" },

  /* —— 历史 —— */
  { cat: "历史", name: "Smithsonian", rss: "https://www.smithsonianmag.com/rss/latest_articles/" },
  { cat: "历史", name: "History Today", rss: "https://www.historytoday.com/feed" },
  { cat: "历史", name: "HistoryExtra", rss: "https://www.historyextra.com/feed/" },
  { cat: "历史", name: "Atlas Obscura", rss: "https://www.atlasobscura.com/feeds/latest" },

  /* —— 时政 —— */
  { cat: "时政", name: "CBS News", rss: "https://www.cbsnews.com/latest/rss/politics" },
  { cat: "时政", name: "BBC World", rss: "https://feeds.bbci.co.uk/news/world/rss.xml" },
  { cat: "时政", name: "The Guardian World", rss: "https://www.theguardian.com/world/rss" },
  { cat: "时政", name: "NBC News", rss: "https://feeds.nbcnews.com/nbcnews/public/news" },
  { cat: "时政", name: "ABC News Intl", rss: "https://abcnews.go.com/abcnews/internationalheadlines" },

  /* —— 足球 —— */
  { cat: "足球", name: "Sky Sports", rss: "https://www.skysports.com/rss/11095" },
  { cat: "足球", name: "BBC Sport Football", rss: "https://feeds.bbci.co.uk/sport/football/rss.xml" },
  { cat: "足球", name: "Guardian Football", rss: "https://www.theguardian.com/football/rss" }
];

async function get(url, tries = 2) {
  for (let k = 0; k < tries; k++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": UA, "Accept-Language": "en-US,en;q=0.9" }, signal: AbortSignal.timeout(20000) });
      if (res.ok) return await res.text();
      return `HTTP_${res.status}`;
    } catch (e) { /* retry */ }
    await new Promise(r => setTimeout(r, 500));
  }
  return "TIMEOUT";
}

const items = xml => [...xml.matchAll(/<item[\s>][\s\S]*?<\/item>/gi)].map(m => m[0]);
const tag = (b, n) => { const m = b.match(new RegExp(`<${n}[^>]*>([\\s\\S]*?)<\\/${n}>`, "i")); return m ? m[1].replace(/<!\[CDATA\[|\]\]>/g, "").trim() : ""; };
const dt = raw => {
  const s = String(raw).replace(/\s+(BST|GMT|UTC|EDT|EST|PDT|PST|CET|CEST)\s*$/i, "").trim();
  const d = new Date(s); return isNaN(d) ? "" : d.toISOString().slice(0, 10);
};
const imgOf = b => {
  const e = b.match(/<enclosure[^>]*\burl=["']([^"']+)["']/i);
  if (e && /\.(jpe?g|png|webp)/i.test(e[1])) return e[1];
  const c = b.match(/<media:content[^>]*\burl=["']([^"']+)["']/i) || b.match(/<media:thumbnail[^>]*\burl=["']([^"']+)["']/i);
  return c ? c[1] : "";
};

const cutoff = Date.now() - DAYS * 86400000;
const rows = [];
for (const c of CANDIDATES) {
  const xml = await get(c.rss);
  if (/^HTTP_|^TIMEOUT/.test(xml)) { rows.push({ ...c, ok: false, note: xml, n: 0, fresh: 0, img: 0, newest: "" }); continue; }
  const its = items(xml);
  const dates = its.map(b => dt(tag(b, "pubDate") || tag(b, "dc:date"))).filter(Boolean);
  const fresh = dates.filter(d => Date.parse(`${d}T12:00:00Z`) >= cutoff).length;
  const withImg = its.filter(b => imgOf(b)).length;
  const newest = dates.sort().slice(-1)[0] || "";
  rows.push({ ...c, ok: true, note: `item=${its.length}`, n: its.length, fresh, img: withImg, newest });
  await new Promise(r => setTimeout(r, 200));
}

const pad = (s, n) => { s = String(s); let w = 0; for (const ch of s) w += /[\u4e00-\u9fa5]/.test(ch) ? 2 : 1; return s + " ".repeat(Math.max(0, n - w)); };
for (const cat of ["时尚", "杂志", "历史", "时政", "足球"]) {
  console.log(`\n【${cat}】`);
  for (const r of rows.filter(x => x.cat === cat)) {
    if (!r.ok) console.log(`  ${pad(r.name, 24)} ${pad(r.rss, 52)}  ✗ ${r.note}`);
    else console.log(`  ${pad(r.name, 24)} ${pad(r.rss, 52)}  ✓ item=${String(r.n).padEnd(3)} 近${DAYS}天=${String(r.fresh).padEnd(3)} 带图=${String(r.img).padEnd(3)} 最新=${r.newest}`);
  }
}
console.log(`\n合计可用 ${rows.filter(r => r.ok).length} / ${rows.length} 源`);

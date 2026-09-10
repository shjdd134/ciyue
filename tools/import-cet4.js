// 词阅 WordLens · CET4 完整词库导入工具
// 用法（在 wordlens/ 目录下）：
//   1) 先把原始 JSON 放好：
//        curl -L -o tools/_dl/cet4-raw.json https://cdn.jsdelivr.net/gh/Lanyifan/CET4words@master/cet4.json
//   2) 跑：
//        node tools/import-cet4.js
//   3) 生成 assets/data-words-full.js（window.WORDS_FULL），挂到 index.html 加载链末尾即可
//
// 输入：tools/_dl/cet4-raw.json
//   每条 { id, word, translate, createdTime, modifyTime }
//   translate 形如 "n.布丁" / "vt.& vi.放弃" / "a.缺席的"
//
// 输出：assets/data-words-full.js
//   每条与 data.js 里核心词同 schema，补齐所有字段（phonetic/词根词缀 留空），
//   加载时与 WORDS_CORE / WORDS_BULK_A 自动去重，core 的富字段优先保留。

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC  = path.join(__dirname, '_dl', 'cet4-raw.json');
const DST  = path.join(ROOT, 'assets', 'data-words-full.js');

const POS_MAP = {
  'n.': 'n.', 'v.': 'v.', 'vt.': 'v.', 'vi.': 'v.',
  'a.': 'adj.', 'ad.': 'adj.',
  'art.': 'art.', 'prep.': 'prep.', 'conj.': 'conj.',
  'pron.': 'pron.', 'int.': 'int.', 'aux.': 'aux.',
  'num.': 'num.', 'ini.': 'n.'
};

function parseTranslate(raw) {
  const t = String(raw || '').trim();
  // 提取首个 pos. 段
  const m = t.match(/^([a-z]+\.)/);
  let pos = '';
  let def = t;
  if (m) {
    const key = m[1];
    pos = POS_MAP[key] || key;
    def = t.slice(key.length).trim();
  }
  // 多 pos（"vt.& vi.放弃"）保留拼接为复合 pos
  const multi = t.match(/^((?:[a-z]+\.\s*(?:&|和)?\s*)+)(.*)$/);
  if (multi) {
    const head = multi[1].trim();
    const parts = head.split(/[&和]/).map(s => s.trim()).filter(Boolean);
    const mapped = parts.map(p => POS_MAP[p] || p).join('/');
    pos = mapped || pos;
    def = multi[2].trim();
  }
  return { pos, def };
}

function main() {
  if (!fs.existsSync(SRC)) {
    console.error('✗ 找不到源文件:', SRC);
    console.error('  请先执行: curl -L -o tools/_dl/cet4-raw.json https://cdn.jsdelivr.net/gh/Lanyifan/CET4words@master/cet4.json');
    process.exit(1);
  }
  const raw = JSON.parse(fs.readFileSync(SRC, 'utf8'));
  console.log('原始词条:', raw.length);

  const seen = new Set();
  const out = [];
  let duplicates = 0, blankWord = 0;

  raw.forEach(entry => {
    let word = String(entry.word || '').trim().toLowerCase();
    if (!word) { blankWord++; return; }
    if (seen.has(word)) { duplicates++; return; }
    seen.add(word);

    const { pos, def } = parseTranslate(entry.translate);

    out.push({
      word,
      list: 'CET4 考纲',
      phonetic: '',
      pos: pos || 'n.',
      def: def || entry.translate,
      prefix: null,
      suffix: null,
      root: { m: '', t: '' },
      literal: '',
      cognates: '',
      collocation: '',
      mnemonic: '',
      example: '',
      exampleCn: '',
      source: 'CET4 完整考纲'
    });
  });

  console.log('有效词条:', out.length, '(去重', duplicates, '/ 空白', blankWord, ')');

  // 写出 window.WORDS_FULL 数组；末尾追加自动合并逻辑，与 bulk-a 行为一致
  const head = `/* 词阅 WordLens · CET4 完整词库（${out.length} 词）
 * 由 tools/import-cet4.js 从 Lanyifan/CET4words 仓库 cet4.json 自动生成
 * 字段：word/list/phonetic/pos/def + 词根词缀三件套（留空）+ 真题例句（留空）
 * 加载时与 WORDS_CORE / WORDS_BULK_A 自动去重：富字段优先保留。 */
window.WORDS_FULL = ${JSON.stringify(out, null, 0)};

if (typeof WORDS !== "undefined" && window.WORDS_FULL) {
  const existing = new Set(WORDS.map(w => w.word.toLowerCase()));
  const added = window.WORDS_FULL.filter(w => !existing.has(w.word.toLowerCase()));
  WORDS = WORDS.concat(added);
  KEYWORDS = WORDS.map(w => w.word.toLowerCase());
  if (typeof window !== "undefined") window.__ADDED_WORDS_FULL__ = added.length;
}
`;

  fs.writeFileSync(DST, head);
  console.log('✓ 已生成:', DST);
  console.log('  新增（与现有词去重后）:', '见运行时 window.__ADDED_WORDS_FULL__');
}

main();
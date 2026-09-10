import vm from "node:vm";
import fs from "node:fs";
import path from "node:path";
const base = path.resolve(import.meta.dirname, "..");
const store = {};
const sandbox = {
  console, window: null,
  localStorage: { getItem: k => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); }, removeItem: k => { delete store[k]; } },
  document: { addEventListener() {}, querySelector: () => null, querySelectorAll: () => [], documentElement: { setAttribute() {} }, body: { appendChild() {} } },
  location: { protocol: "http:" }, history: { pushState() {}, back() {}, go() {} },
};
sandbox.window = sandbox;
vm.createContext(sandbox);
for (const f of ["data.js", "data-words-bulk-a.js", "data-words-full.js", "data-articles-extra.js",
                 "data-articles-archive.js", "data-covers.js", "data-examples.js", "app.js"]) {
  vm.runInContext(fs.readFileSync(path.join(base, "assets", f), "utf8"), sandbox, { filename: f });
}
const ctx = e => vm.runInContext(e, sandbox);
const words = ctx("WORDS");
for (const w of ["should", "late", "open", "easy", "large", "low", "carry", "cool"]) {
  const o = words.find(x => x.word === w);
  if (!o) { console.log(w, "不在词库"); continue; }
  console.log(`\n${w}  app wordForms = ${JSON.stringify(ctx(`wordForms(${JSON.stringify(w)})`))}`);
  console.log(`  example = ${JSON.stringify((o.example || "").slice(0, 130))}`);
  console.log(`  hlWord  = ${JSON.stringify(ctx(`hlWord(${JSON.stringify(o.example)}, ${JSON.stringify(w)})`).slice(0, 160))}`);
}

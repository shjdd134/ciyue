/* 验证阅读页滚动容器结构 + 词卡翻转类名 */
const vm = require("vm");
const fs = require("fs");
const path = require("path");
const noop = () => {};
const screenEl = { innerHTML: "", style: {}, appendChild: noop };

const sandbox = {
  console,
  window: { addEventListener: noop, removeEventListener: noop },
  document: {
    documentElement: { setAttribute: noop },
    addEventListener: noop, removeEventListener: noop,
    querySelector: (s) => (s === "#screen" ? screenEl : null),
    querySelectorAll: () => [],
    createElement: () => ({ className: "", textContent: "", style: {}, appendChild: noop, remove: noop }),
  },
  localStorage: { _d: {}, getItem(k) { return this._d[k] || null; }, setItem(k, v) { this._d[k] = v; } },
  SpeechSynthesisUtterance: function () {},
  speechSynthesis: { cancel: noop, speak: noop },
  setTimeout, clearTimeout, requestAnimationFrame: (f) => f(),
};
sandbox.window.window = sandbox.window;
vm.createContext(sandbox);

const base = path.resolve(__dirname, "..");
vm.runInContext(fs.readFileSync(path.join(base, "assets/data.js"), "utf8"), sandbox);
vm.runInContext(fs.readFileSync(path.join(base, "assets/data-words-bulk-a.js"), "utf8"), sandbox);
vm.runInContext(fs.readFileSync(path.join(base, "assets/data-words-full.js"), "utf8"), sandbox);
vm.runInContext("this.ARTICLES = ARTICLES;", sandbox);
vm.runInContext(fs.readFileSync(path.join(base, "assets/app.js"), "utf8"), sandbox);

const out = vm.runInContext(`
  (() => {
    activeArticle = ARTICLES[0];
    const html = renderRead();
    const iScroll = html.indexOf('id="read-scroll"');
    const iHero = html.indexOf('read-hero');
    const iBody = html.indexOf('id="read-body"');
    const iFinish = html.indexOf('read-finish');
    const iFab = html.indexOf('fab-bar');
    return {
      read: {
        scrollContainer: iScroll > -1,
        hero_inside: iScroll > -1 && iHero > iScroll,
        body_inside: iBody > iScroll && iBody < iFab,
        finish_inside: iFinish > iScroll && iFinish < iFab,
        topBar_fixed_before_scroll: html.indexOf('read-top') < iScroll,
        progress_before_scroll: html.indexOf('read-progress') < iScroll,
        fab_present: iFab > -1,
      },
      flip: {
        unflipped: (flipped = false, qPos = 0, renderStudy().indexOf('class="flip "') > -1),
        flipped_cls: (flipped = true, renderStudy().indexOf('class="flip flipped"') > -1),
        front_before_back: renderStudy().indexOf('class="face"') < renderStudy().indexOf('face back'),
      },
    };
  })()
`, sandbox);
console.log(JSON.stringify(out, null, 2));

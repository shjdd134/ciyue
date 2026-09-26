# PDF.js 5.6.205

Vendored from the `pdfjs-dist` npm package (Mozilla PDF.js). The legacy minified display and worker files are the same version. Only extraction/rendering assets are included; no viewer or scripting sandbox is shipped.

Upstream: https://github.com/mozilla/pdf.js
API: https://mozilla.github.io/pdf.js/api/

Loaded on demand by `assets/vocab-pdf.mjs`, never from a CDN. `cmaps/`, `standard_fonts/`, and `wasm/` support multilingual PDFs and scanned-page rendering. Keep the root LICENSE and the third-party licenses in those folders when updating.

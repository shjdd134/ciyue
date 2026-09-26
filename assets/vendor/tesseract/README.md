# Local English OCR dependencies

These files are vendored without code changes for vocabulary-file import. They
load only when the user enables OCR. No document, page image, or OCR text is sent
to a server. All worker, core, and trained-data paths are explicitly local.

## Components and origin

- Tesseract.js **7.0.0**: `dist/tesseract.min.js`, `dist/worker.min.js` from the
  installed npm package `tesseract.js@7.0.0`.
  Official source: https://github.com/naptha/tesseract.js
  Browser API: https://github.com/naptha/tesseract.js/blob/master/docs/api.md
  License: Apache-2.0, preserved in `LICENSE.tesseract.js.md`.
- Tesseract.js-core **7.0.0**: the three `*-lstm.wasm.js` builds from the installed
  npm package `tesseract.js-core@7.0.0`. Each file embeds its WebAssembly binary;
  no separate `.wasm` file is needed. The worker chooses plain, SIMD, or relaxed
  SIMD automatically. Only LSTM mode (`OEM 1`) is enabled; the legacy engine and
  orientation/script detection are intentionally outside this import workflow.
  Official source: https://github.com/naptha/tesseract.js-core
  License: Apache-2.0, preserved in `LICENSE.core`.
- English model: Debian `tesseract-ocr-eng` package, original local source
  `/usr/share/tesseract-ocr/5/tessdata/eng.traineddata`. It is from the official
  **tessdata_fast** English LSTM model collection:
  https://github.com/tesseract-ocr/tessdata_fast
  The original 4,113,088-byte traineddata SHA-256 is
  `7d4322bd2a7749724879683fc3912cb542f19906c83bcc1a52132556427170b2`.
  The file was gzip-compressed at level 9 with `mtime=0`; model bytes are unchanged.
  License: Apache-2.0. `LICENSE.eng-source` preserves Debian's upstream provenance
  and copyright notice; `LICENSE` contains the full Apache-2.0 text.

The exact installed packages above were the available, verified source for this
copy; the upstream links document authorship and APIs, not an unpinned runtime
fetch. Future upgrades must update the API and worker together, refresh hashes,
and run `tools/ocr-import-test.mjs`.

## Integration

`assets/vocab-ocr.mjs` sets `workerPath`, `corePath`, and `langPath` relative to
its own `import.meta.url`. It sets `workerBlobURL: false` and uses
`createWorker("eng", 1, ...)`; there is no application CDN fallback. The complete
folder must be included in the Android asset bundle. Static hosting must serve
JavaScript and gzip-traineddata assets unchanged. The `.gz` file is a binary
asset decoded by Tesseract (do not set `Content-Encoding: gzip` on that file).

Recognition is English only. Imported output remains an editable draft; image
quality, unusual typefaces, handwriting, mixed languages, and page layout can
reduce accuracy. The caller limits pages/pixels and processes pages sequentially.
Cancellation immediately rejects the active call and terminates an available
worker. Upstream `createWorker` exposes its handle only after initialization;
if cancelled during initialization, the returned handle is terminated immediately
when initialization finishes.

## Vendored file checksums

| File | Bytes | SHA-256 |
|---|---:|---|
| `LICENSE` | 11,358 | `cfc7749b96f63bd31c3c42b5c471bf756814053e847c10f3eb003417bc523d30` |
| `LICENSE.core` | 11,358 | `c6596eb7be8581c18be736c846fb9173b69eccf6ef94c5135893ec56bd92ba08` |
| `LICENSE.eng-source` | 1,245 | `33fb8161898e34fcf5c6b8585d6be97642d7e8f34a922e783c6c5c970d0b09ad` |
| `LICENSE.tesseract.js.md` | 11,357 | `b40930bbcf80744c86c46a12bc9da056641d722716c378f5659b9e555ef833e1` |
| `eng.traineddata.gz` | 1,967,599 | `f1c22599ed6fd3eb821d87fdb43e09f98b61179a4abe38c43cfca2cdcb9f5ec2` |
| `tesseract-core-lstm.wasm.js` | 3,896,484 | `eef5f8b2f8e20e150680b20adaec4a60babafee3adbe8a94583c81fee46e8680` |
| `tesseract-core-relaxedsimd-lstm.wasm.js` | 3,905,767 | `861a536cf9ef8e63cb644d57bab39c388f37f7d6b6f60024b741c5f6b39a59b3` |
| `tesseract-core-simd-lstm.wasm.js` | 3,899,472 | `c58b46a4c796c0b8afccf77591d5b875b6896b45d402bbce8caa6f5362447b38` |
| `tesseract.min.js` | 62,961 | `000c27d9cd0def655f77b36c72a389c0ab13793aa31cb4d7aab56d09c0afbc7e` |
| `worker.min.js` | 111,307 | `576b7df7e3393e137e51849357c9adb53fe7ac1bb69bfa06cf3d61520f182c6d` |

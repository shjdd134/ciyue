/* CLI：生成 Android 壳用的 mobile/www（逻辑在 tools/lib-mobile.cjs，便于 audit 直接 require）。
 *   node tools/build-mobile.mjs            # 生成
 *   node tools/build-mobile.mjs --check    # 只打印白名单，不写盘
 */
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { planFiles, runBuild } = require("./lib-mobile.cjs");

if (process.argv.includes("--check")) {
  const files = planFiles();
  console.log(`白名单 ${files.length} 个文件（不写盘）`);
  for (const f of files) console.log("  " + f);
} else {
  const { files, bytes } = runBuild();
  console.log(`✓ mobile/www 生成完毕：${files.length} 个文件 / ${(bytes / 1048576).toFixed(1)} MB`);
  console.log(`  其中 index.html 已注入 window.WORDLENS_NATIVE = true（壳内不注册 Service Worker）`);
}

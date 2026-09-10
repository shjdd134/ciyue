/* 词阅 WordLens —— PWA 图标栅格化（一次性工具，可重跑）
 *
 * 背景：manifest 里只有一张 SVG（`purpose:"any maskable"` 同时声明两种用途本身就有
 * 风险——maskable 要求图案落在直径 80% 的安全圆内，否则会被启动器裁掉）。而且
 * iOS 加主屏时根本不认 SVG，只认 apple-touch-icon 的 PNG，缺了就是一张白图。
 *
 * 这里的做法是给每个尺寸生成「满铺紫底 + 居中图案」的方图：
 *   · 满铺底色 → 启动器自己裁圆角不会露出透明角（iOS 的 squircle 也就不会发黑）
 *   · 图案控制在 80% 安全圆内 → 同一张图既能当 any 又能当 maskable
 * 用 Edge 无头模式栅格化，不引入任何图像库。
 *
 * 运行：node tools/make-icons.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "assets", "icons");
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const TMP = path.join(ROOT, "tools", ".icon-render.html");

const BRAND = "#6C5CE7";

/** 满铺底色版图标：外层不再是带圆角的小方块，而是整张画布 */
function iconMarkup(size) {
  const s = size / 512; // 原始 512 视图缩放
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
  html,body{margin:0;padding:0;width:${size}px;height:${size}px;overflow:hidden;background:${BRAND}}
  svg{display:block;width:${size}px;height:${size}px}
</style></head><body>
<svg width="${size}" height="${size}" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="${BRAND}"/>
  <g transform="translate(${(512 - 512 * 0.72) / 2} ${(512 - 512 * 0.72) / 2}) scale(0.72)">
    <rect x="112" y="112" width="208" height="272" rx="28" fill="#FFFFFF" opacity="0.95"/>
    <rect x="192" y="128" width="208" height="272" rx="28" fill="#A99BFF"/>
    <path d="M228 196h136M228 244h136M228 292h92" stroke="#FFFFFF" stroke-width="18" stroke-linecap="round"/>
    <circle cx="352" cy="352" r="72" fill="#10B981"/>
    <path d="M322 352l22 22 42-46" stroke="#FFFFFF" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg></body></html>`;
}

const SIZES = [
  { name: "icon-192.png", size: 192 },
  { name: "icon-512.png", size: 512 },
  { name: "apple-touch-icon.png", size: 180 },   // iOS 加主屏
];

fs.mkdirSync(OUT, { recursive: true });
/* 独立的临时 profile：不碰用户正在用的 Edge，也避免启动期抢锁卡住 */
const PROFILE = path.join(ROOT, "tools", ".icon-profile");
fs.rmSync(PROFILE, { recursive: true, force: true });

for (const { name, size } of SIZES) {
  fs.writeFileSync(TMP, iconMarkup(size));
  const png = path.join(OUT, name);
  fs.rmSync(png, { force: true });
  execFileSync(EDGE, [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    `--user-data-dir=${PROFILE}`,
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    `--window-size=${size},${size}`,
    `--screenshot=${png}`,
    fs.realpathSync(TMP).replace(/\\/g, "/"),
  ], { stdio: "pipe", timeout: 40000 });
  const kb = (fs.statSync(png).size / 1024).toFixed(1);
  console.log(`✓ ${name}  ${size}×${size}  ${kb} KB`);
}

fs.rmSync(PROFILE, { recursive: true, force: true });
fs.rmSync(TMP, { force: true });
console.log(`\n产物目录：assets/icons/`);

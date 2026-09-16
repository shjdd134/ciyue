#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
if (/\bdata-page-node-id\s*=/.test(html)) { console.error("index.html 仍有 data-page-node-id"); process.exit(1); }
const versions = [...html.matchAll(/(?:src|href)="[^"]+\?v=(\d+)"/g)].map(x => x[1]);
const set = new Set(versions);
const sw = fs.readFileSync(path.join(ROOT, "sw.js"), "utf8").match(/wordlens-cache-v(\d+)/)?.[1];
const app = fs.readFileSync(path.join(ROOT, "assets", "app.js"), "utf8").match(/caches\.open\("wordlens-cache-v(\d+)"\)/)?.[1];
const cfg = fs.readFileSync(path.join(ROOT, "assets", "data-config.js"), "utf8").match(/assetVersion:\s*["'](\d+)["']/)?.[1];
const lazy = fs.readFileSync(path.join(ROOT, "assets", "app.js"), "utf8").match(/data-tapdict\.js\?v=([^`"']+)/)?.[1];
const ok = set.size === 1 && set.has(sw) && set.has(app) && set.has(cfg) && String(lazy || "").includes("ASSET_VERSION") && !html.includes('data-tapdict.js?v=');
console.log(`资源版本：index=${[...set].join(",")} sw=${sw || "?"} app=${app || "?"}`);
console.log(ok ? "✓ 缓存/资源版本一致，点词大表未阻塞首屏" : "✗ 缓存/资源版本或懒加载检查失败");
process.exit(ok ? 0 : 1);

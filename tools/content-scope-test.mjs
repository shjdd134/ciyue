import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {spawnSync} from 'node:child_process';
import {readDecl} from './lib-text.mjs';
import {PEOPLE_CONFIG,excludedPerson} from './lib-people.mjs';
const root=path.resolve(import.meta.dirname,'..');
const excluded=new Set(['明星','AI']);
const articles=[['data.js','ARTICLES'],['data-articles-extra.js','ARTICLES_EXTRA'],['data-articles-archive.js','ARTICLES_ARCHIVE']]
 .flatMap(([f,n])=>readDecl(path.join(root,'assets',f),n).value);
assert.ok(articles.length>0,'必须保留可读文章');
/* 2026-09-24：AI 栏目（Offbook Press 官方中英双语）整栏下架 —— 用户决定，5 期全撤。
 * 这条断言的方向**反转了**：原先是正向的「AI 应已由 ob-* 通道上线」（防止整栏被误删还静默通过），
 * 现在改为「库里一篇文章都不许有」。
 * ⚠️ 反转守卫时别忘了上层：`tools/offbook.mjs` 的 ESSAYS 已摘空、`tools/ingest.mjs` 的
 *   DROP_LIST 里有这 5 个 id —— 三处缺一个，AI 栏目就会以某种路径悄悄回来。 */
assert.ok(articles.every(a=>!excluded.has(a.cat)),'下架的类别不得重新进入在线文章表');
assert.ok(!articles.some(a=>a.cat==='AI'||/^ob-/.test(a.id)),'AI 栏目（ob-* Offbook 通道）已下架：库里不得再出现');
assert.ok(articles.filter(a=>a.cat==='人物').every(a=>!excludedPerson((a.person||'')+' '+a.title)),'人物栏目不得出现用户排除的人物');
assert.ok(articles.filter(a=>a.cat==='人物').every(a=>a.readingMode==='full' && a.contentStatus==='complete'),'人物栏目必须发布原刊全文');
const categories=readDecl(path.join(root,'assets/data.js'),'CATEGORIES').value;
assert.ok(!categories.includes('明星'),'明星栏目已撤下');
assert.ok(!categories.includes('AI'),'AI 栏目已撤下：CATEGORIES 里不得再留入口');
const ingest=fs.readFileSync(path.join(root,'tools/ingest.mjs'),'utf8');
const feedLiteral=ingest.match(/const FEEDS = (\[[\s\S]*?\n\]);/)[1];
const feeds=vm.runInNewContext(feedLiteral);
assert.ok(feeds.every(f=>!excluded.has(f.cat)),'停采类别不能继续出现在 RSS 配置');
/* 2026-09-17：足球 RSS 也停了 → FEEDS 必须是空数组。
 * 这条断言是**防误加回来**的（原来写的是「每日 RSS 只能配足球」，方向已反转）。 */
assert.equal(feeds.length,0,'足球 RSS 已停采：FEEDS 必须为空，文章入口只剩 tools/people.mjs');
const daily=fs.readFileSync(path.join(root,'tools','daily.mjs'),'utf8');
assert.ok(!/"--quota"/.test(daily),'足球配额已撤下：daily.mjs 不应再传 --quota');
assert.equal(PEOPLE_CONFIG.dailyLimit,1,'每日人物配额必须为 1');
const legacy=spawnSync(process.execPath,[path.join(root,'tools/ingest.mjs'),'--classics','--dry'],{encoding:'utf8',timeout:5000});
assert.equal(legacy.status,2,'旧经典命令必须在联网和写盘前中止');
assert.match(legacy.stderr,/已停用/);
console.log('content-scope-test: 13 checks passed');

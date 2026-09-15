#!/usr/bin/env node
/* 将已完成的本地复核结果同步回队列。
 * 这个脚本只更新 approved 条目的源指纹和图片哈希，不会把 pending 候选自动批准。 */
import fs from 'node:fs';
import assert from 'node:assert/strict';

const queueFile=new URL('./people-reviewed.json',import.meta.url);
const preparedFile=new URL('../.tmp/people/prepared.json',import.meta.url);
const queue=JSON.parse(fs.readFileSync(queueFile,'utf8'));
const report=JSON.parse(fs.readFileSync(preparedFile,'utf8'));
assert.equal(report.failed.length,0,`仍有 ${report.failed.length} 个候选未准备完成`);
for(const item of queue){
  if(item.review?.status!=='approved')continue;
  const p=report.prepared.find(x=>x.id===item.id);
  assert(p && p.eligible && p.photos.length>=4,`缺少已批准条目 ${item.id} 的准备结果`);
  item.review={...item.review,at:new Date().toISOString(),scope:'full-original-text-and-photos',fingerprint:p.fingerprint,photoHashes:p.photos.map(x=>x.sha256)};
}
fs.writeFileSync(queueFile,JSON.stringify(queue,null,2)+'\n');
console.log(`people-review: 已同步 ${queue.filter(x=>x.review?.status==='approved').length} 个 approved 条目的全文/图片指纹`);

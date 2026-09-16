#!/usr/bin/env node
/* 人物栏目抓取与发布
 * --discover             发现候选，不发布
 * --prepare [--cached]   下载原刊 HTML/图片并测量正文，写入 .tmp/people
 * --publish-reviewed     发布已审核的原刊正文与图片（每日新稿最多 1 篇）
 *
 * 公开页面中能读到的正文按原刊段落保存；明显广告、导航和推广块由提取器过滤。
 * 页面有订阅/登录限制时暂缓，不绕过访问控制。 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {PEOPLE_CONFIG as config, canonical, extractProfile, discoverLinks, selectDaily, sourceFor, imageKey} from './lib-people.mjs';
import {readDecl, writeDecl} from './lib-text.mjs';
import {translateTexts} from './lib-mt.mjs';
import {applyGlossary} from './lib-glossary.mjs';
import {createBatch} from './lib-release.mjs';

const root=path.resolve(import.meta.dirname,'..'), temp=path.join(root,'.tmp','people');
fs.mkdirSync(temp,{recursive:true});
const file=path.join(root,'assets/data-articles-extra.js');
const queue=JSON.parse(fs.readFileSync(new URL('./people-reviewed.json',import.meta.url),'utf8'));
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
const arg=name=>{const i=process.argv.indexOf('--'+name);return i<0?null:process.argv[i+1];};
const cached=process.argv.includes('--cached');
const mode=process.argv.includes('--discover')?'discover':process.argv.includes('--prepare')?'prepare':process.argv.includes('--publish-reviewed')?'publish':null;
if(!mode)throw new Error('使用 --discover / --prepare / --publish-reviewed');

/* 下载通道：统一走 Node fetch + redirect:'follow'，不再分平台。
 * 为什么不再走 people-download.ps1（2026-09-15 实测）：win32 分支原本无条件调它，
 * 而它用 Invoke-WebRequest，在本机写不出非空文件（throw「downloader produced no
 * non-empty file」）；非 win32 的 fetch 回落又写成 redirect:'error'，而 Vogue /
 * AnOther 的静态图会先 302 到 CDN，那条路一样必挂 —— 两条路都断，图片才会「全都
 * 下不来」，看起来像外网被墙。实测 fetch(redirect:'follow') 对两家 CDN 均 200，
 * 故只保留这一条通道，删掉 PS 依赖（死代码留着会让下一个人重踩一遍）。 */
async function download(url, dest, image=false) {
  const u=new URL(url);
  const allowed=image?config.sources.some(s=>s.images.includes(u.hostname)):!!sourceFor(url);
  if(u.protocol!=='https:' || u.username || u.password || !allowed)throw new Error('非白名单地址');
  const r=await fetch(url,{signal:AbortSignal.timeout(30000),redirect:'follow',headers:{'User-Agent':'WordLens personal reading catalogue'}});
  if(!r.ok)throw new Error('HTTP '+r.status);
  const chunks=[];let bytes=0;
  for await(const b of r.body){bytes+=b.length;if(bytes>8*1024*1024)throw new Error('响应超过 8MB');chunks.push(b);}
  if(!bytes)throw new Error('响应为空');
  fs.writeFileSync(dest,Buffer.concat(chunks));
  if(!fs.existsSync(dest))throw new Error('下载器未写出文件（可能是网络/重定向失败）');
  if(fs.statSync(dest).size>8*1024*1024)throw new Error('响应超过 8MB');
}
async function profile(url, useCache=cached) {
  const dest=path.join(temp,hash(canonical(url))+'.html');
  if(!useCache || !fs.existsSync(dest))await download(url,dest);
  return extractProfile(fs.readFileSync(dest,'utf8'),url);
}
function fingerprint(p){return hash(JSON.stringify({title:p.title,date:p.date,sourceTextHash:p.sourceTextHash,images:p.images.map(x=>imageKey(x.url))}));}
function translationAudit(source, translated){
  const issues=[];
  if(!Array.isArray(translated) || translated.length!==source.length)issues.push(`句数不一致（原文 ${source.length} / 译文 ${translated?.length||0}）`);
  source.forEach((en,i)=>{
    const cn=String(translated?.[i]||'').trim();
    if(!cn)issues.push(`第 ${i+1} 句为空`);
    else if(cn.toLowerCase()===String(en||'').trim().toLowerCase())issues.push(`第 ${i+1} 句疑似原文回显`);
    /* 数字只做告警，不因中文改写日期/小数格式而误阻发布。 */
    const nums=String(en||'').match(/\b\d+(?:[.,]\d+)?%?\b/g)||[];
    const missing=nums.filter(n=>!cn.includes(n));
    if(missing.length)issues.push(`第 ${i+1} 句数字待核对：${missing.join(', ')}`);
  });
  return {status:issues.some(x=>/为空|句数不一致|原文回显/.test(x))?'blocked':'machine-checked',issues,sentenceCount:source.length};
}
function validateItem(item, requireApproved=false) {
  if(!/^people-[a-z0-9-]+$/.test(item.id))throw new Error('无效人物 ID');
  if(!item.titleZh || !item.photoCredit)throw new Error('标题中文或摄影署名缺失');
  if(requireApproved && (item.review?.status!=='approved' || !item.review.visualChecked || !item.review.guideChecked || !item.review.articleChecked))throw new Error('原刊与图片尚未完成复核');
}
function sourcePhotoMap(p, photos) {
  const map=new Map();
  photos.forEach(x=>map.set(imageKey(x.sourceUrl),x));
  return map;
}
async function toFullParas(item,p,photos) {
  const textBlocks=p.blocks.filter(b=>b.type==='text');
  const sourceSentences=textBlocks.flatMap(b=>b.sentences);
  const translationProviders={};
  const translated=await translateTexts(sourceSentences,{cacheNamespace:'people-full-v2',cacheKey:item.id+'\n'+p.sourceTextHash,sourceLang:'EN',
    context:batch=>{
      const around=new Set();
      for(const x of batch){const i=Number(x.i);for(const j of [i-2,i-1,i,i+1,i+2])if(sourceSentences[j])around.add(sourceSentences[j]);}
      return [`Article title: ${p.title}`,`Person: ${p.person?.name||''}`,item.source?`Source: ${item.source}`:'',[...around].join(' ')].filter(Boolean).join('\n');
    },
    onProvider:(name,count)=>{translationProviders[name]=(translationProviders[name]||0)+count;},
    onTick:(done,total)=>{if(total)console.log(`  翻译 ${item.id}: ${done}/${total}`);}});
  const translation=translationAudit(sourceSentences,translated);
  if(translation.status==='blocked')throw new Error(`译文完整性检查未通过：${translation.issues.slice(0,6).join('；')}`);
  let cursor=0;
  const paras=[];
  const imageMap=sourcePhotoMap(p,photos);
  for(const block of p.blocks){
    if(block.type==='text'){
      /* 术语/专名校正：人物篇的片名、人名是最容易整类译错的地方（Monster→《魔鬼》），
         规则以英文原句为条件，在此统一按回标准译名。 */
      const sentences=block.sentences.map(en=>({en,cn:applyGlossary(translated[cursor++]||'',en,item.id)}));
      paras.push({sentences,sourceTag:block.tag});
    }else if(block.type==='image'){
      const photo=imageMap.get(imageKey(block.url));
      if(photo)paras.push({img:photo.rel,alt:`${p.person?.name||p.title} · 图片`,cap:block.credit||'',credit:item.photoCredit,sourceUrl:photo.sourceUrl});
    }
  }
  /* og:image 常常只作为封面，不在 article figure 内；其余遗漏图追加，避免抓取器静默丢图。 */
  const used=new Set(paras.filter(x=>x.img).map(x=>x.sourceUrl));
  for(const photo of photos.slice(1))if(!used.has(photo.sourceUrl))paras.push({img:photo.rel,alt:`${p.person?.name||p.title} · 图片`,cap:'',credit:item.photoCredit,sourceUrl:photo.sourceUrl});
  return {paras,translation:{...translation,providers:translationProviders,cacheNamespace:'people-full-v2'}};
}

if(mode==='discover'){
  const report={at:new Date().toISOString(),sources:[],candidates:[]}, lists=[];
  for(const source of config.sources){
    try{const f=path.join(temp,hash(source.listing)+'.html');await download(source.listing,f);const links=discoverLinks(fs.readFileSync(f,'utf8'),source.listing).slice(0,3);lists.push(links);report.sources.push({source:source.name,status:'ok',links:links.length});}
    catch(e){report.sources.push({source:source.name,status:'unavailable',reason:e.message.slice(0,180)});}
  }
  const seen=new Set();
  for(let i=0;i<3&&report.candidates.length<12;i++)for(const links of lists){const link=links[i];if(!link||seen.has(link.url)||report.candidates.length>=12)continue;seen.add(link.url);try{report.candidates.push(await profile(link.url));}catch(e){report.candidates.push({...link,eligible:false,reasons:[e.message.slice(0,180)]});}}
  report.candidates.sort((a,b)=>(b.score||0)-(a.score||0));
  fs.writeFileSync(path.join(temp,'candidates.json'),JSON.stringify(report,null,2));
  console.log(`人物候选 ${report.candidates.length} 篇，待复核 ${report.candidates.filter(x=>x.eligible).length} 篇；报告 .tmp/people/candidates.json`);
  for(const p of report.candidates)console.log(`${p.eligible?'待复核':'暂缓'} · ${p.score||0} · ${p.title} · ${p.url}${p.reasons?.length?' · '+p.reasons.join('；'):''}`);
}else{
  const prepared=[],failed=[];
  const existing=readDecl(file,'ARTICLES_EXTRA').value;
  const day=new Date().toISOString().slice(0,10);
  const existingById=new Map(existing.map(a=>[a.id,a]));
  for(const item of queue){
    const old=existingById.get(item.id);
    /* 已经是完整原文且源指纹仍然相同的条目无需反复重写；旧 guide 会进入一次迁移。 */
    if(mode==='publish' && old?.readingMode==='full' && old.sourceTextHash && item.review?.fingerprint===old.fingerprint)continue;
    if(mode==='publish' && item.review?.status!=='approved')continue;
    try{
      validateItem(item,mode==='publish');
      const p=await profile(item.url,cached);
      if(!p.eligible)throw new Error(p.reasons.join('；'));
      const fp=fingerprint(p);
      if(mode==='publish' && item.review.fingerprint!==fp)throw new Error('原刊结构发生变化，须重新核对');
      const photos=[], imageErrors=[];
      for(const [i,img] of p.images.entries()){
        const raw=path.join(temp,item.id+'-'+i+'.raw'),dest=path.join(temp,item.id+'-'+i+'.jpg');
        const signature=hash(img.url),stamp=dest+'.source';
        if(!fs.existsSync(raw)||!fs.existsSync(dest)||!fs.existsSync(stamp)||fs.readFileSync(stamp,'utf8')!==signature){
          try { await download(img.url,raw,true); }
          catch(e) { imageErrors.push(`图片 ${i+1}/${p.images.length}：${img.url}（${e.message}）`); continue; }
          execFileSync(process.env.PYTHON||'python',[path.join(root,'tools/people-image.py'),raw,dest],{timeout:20000,stdio:'pipe'});
          fs.writeFileSync(stamp,signature);
        }
        photos.push({file:dest,sourceUrl:img.url,sha256:hash(fs.readFileSync(raw))});
      }
      if(imageErrors.length) throw new Error(`图片下载失败 ${imageErrors.length} 张：${imageErrors.slice(0,4).join('；')}`);
      if(mode==='publish' && JSON.stringify(item.review.photoHashes)!==JSON.stringify(photos.map(x=>x.sha256)))throw new Error('图片与已核对版本不一致');
      const entry={...p,...item,sourceTitle:p.title,person:p.person,score:p.score,eligible:p.eligible,fingerprint:fp,photos};
      const translatedContent=mode==='publish'
        ? await toFullParas(item,p,photos.map(x=>({...x,rel:'assets/covers/'+path.basename(x.file)})))
        : {paras:[],translation:null};
      entry.paras=translatedContent.paras;
      entry.translation=translatedContent.translation;
      prepared.push(entry);
      console.log(`${entry.person.name}: ${entry.photos.length} 图 · ${entry.sourceParagraphs} 段原文 · 选题分 ${entry.score}`);
    }catch(e){failed.push({id:item.id,error:e.message.slice(0,1600)});console.warn(`暂缓 ${item.id}: ${e.message.slice(0,500)}`);}
  }
  fs.writeFileSync(path.join(temp,'prepared.json'),JSON.stringify({at:new Date().toISOString(),prepared,failed},null,2));
  if(mode==='publish'){
    prepared.sort((a,b)=>b.score-a.score);
    const current=readDecl(file,'ARTICLES_EXTRA').value;
    const replacementIds=new Set(prepared.filter(p=>existingById.get(p.id)?.readingMode!=='full').map(p=>p.id));
    const replacementUrls=new Set(prepared.filter(p=>replacementIds.has(p.id)).map(p=>canonical(p.url)));
    const baseCurrent=current.filter(a=>{if(replacementIds.has(a.id))return false;try{return !replacementUrls.has(canonical(a.url));}catch{return true;}});
    const replacements=prepared.filter(p=>replacementIds.has(p.id));
    const fresh=prepared.filter(p=>!replacementIds.has(p.id));
    const usedToday=baseCurrent.filter(a=>a.cat==='人物'&&a.addedAt===day).length;
    const selected=[...replacements,...selectDaily(fresh,baseCurrent,day,Math.max(0,config.dailyLimit-usedToday))];
    if(selected.length){
      const batch=arg('batch')||createBatch(root,{label:'people-full'}).id;
      console.log('人物发布批次 '+batch);fs.writeFileSync(path.join(temp,'batch.txt'),batch);
      const additions=selected.map(p=>{
        const photos=p.photos.map(x=>{const rel='assets/covers/'+path.basename(x.file);fs.copyFileSync(x.file,path.join(root,rel));return {...x,rel};});
        const photoByUrl=new Map(photos.map(x=>[x.sourceUrl,x.rel]));
        const paras=p.paras.map(x=>x.img?{...x,img:photoByUrl.get(x.sourceUrl)||x.img}:x);
        return {id:p.id,cat:'人物',title:p.title,titleZh:p.titleZh,url:p.url,source:p.source,date:p.date,addedAt:day,pin:true,
          readingMode:'full',contentStatus:'complete',extractorVersion:'people-full-v1',person:p.person.name,personZh:p.person.zh,
          photoCount:photos.length,photoCredit:p.photoCredit,peopleScore:p.score,peopleScoreParts:p.scoreParts,peopleVersion:config.version,
          review:{...p.review,scope:'full-original-text-and-photos'},translation:p.translation,fingerprint:p.fingerprint,sourceTextHash:p.sourceTextHash,sourceTextWords:p.words,sourceParagraphs:p.sourceParagraphs,sourceImages:p.images.length,
          coverImg:photos[0]?.rel||'',cover:'linear-gradient(135deg,#eadbcc,#855349)',gradient:'linear-gradient(135deg,#eadbcc,#855349)',photoSources:photos.map(x=>x.sourceUrl),paras};
      });
      writeDecl(file,'ARTICLES_EXTRA',[...baseCurrent,...additions]);
      const nextCount=baseCurrent.length+additions.length;
      fs.writeFileSync(file,fs.readFileSync(file,'utf8').replace(/共 \d+ 篇/,`共 ${nextCount} 篇`));
      console.log(`新增/替换人物原文 ${additions.length} 篇；保留 ${additions.reduce((n,a)=>n+a.sourceTextWords,0)} 个英文词。`);
    }else console.log('本次无已审核的可发布人物原文，或今日新增名额已用完。');
  }
  if(mode==='prepare'&&failed.length)process.exitCode=1;
}

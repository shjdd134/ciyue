import assert from 'node:assert/strict';
import {PEOPLE_CONFIG as config,personFor,excludedPerson,scoreProfile,extractProfile,discoverLinks,canonical,sourceFor,selectDaily,splitOriginalSentences,PEOPLE_PRIVATE_SOURCE} from './lib-people.mjs';
import fs from 'node:fs';

/* ① 名单必须先到位。空名单会让下面十几条断言失去意义（personFor 全返回 null，报错还很难懂），
 *    所以先给一句能照着做的提示，再往下跑。 */
if (!config.people.length) {
  console.error(`people-test: 偏好名单为空（来源 ${PEOPLE_PRIVATE_SOURCE}），测试无法进行。`);
  console.error('  本地：创建 tools/people-config.local.json（含 people[] 与 excludedPeople[]）');
  console.error('  CI  ：配置仓库 Secret PEOPLE_PRIVATE_JSON（内容与该文件相同）');
  process.exit(1);
}
/* ② 反向守卫：公开仓库里那份 people-config.json 决不允许再出现名单。
 *    2026-09-17 拆分后才需要这条 —— 它防的是「名单被无意中加回公开文件」。
 *    注意别把断言写成「文件里不含 Monica Bellucci」这种：那只是人名黑名单，漏一个新名字就失效；
 *    这里卡的是**结构**（字段名），加回名单必然带字段，跑不过。 */
{
  const pubRaw = fs.readFileSync(new URL('./people-config.json', import.meta.url), 'utf8');
  assert(!/"people"\s*:/.test(pubRaw), 'people-config.json（公开）不允许含 people 字段');
  assert(!/"excludedPeople"\s*:/.test(pubRaw), 'people-config.json（公开）不允许含 excludedPeople 字段');
}
const good={title:'Anne Hathaway on her career',person:personFor('Anne Hathaway'),english:true,hasArticle:true,blocked:false,words:1200,depth:25,images:Array.from({length:8},(_,i)=>({url:'https://assets.vogue.com/photos/'+i+'/a.jpg'}))};
assert.equal(scoreProfile(good).score,100);
assert(scoreProfile(good).eligible);
assert(!scoreProfile({...good,images:good.images.slice(0,2)}).eligible);
assert(!scoreProfile({...good,words:150}).eligible);
assert(!scoreProfile({...good,english:false}).eligible);
assert(!scoreProfile({...good,blocked:true}).eligible);
assert(!scoreProfile({...good,truncated:true}).eligible);
assert(!scoreProfile({...good,title:'Anne Hathaway wears a new dress'}).eligible);
assert(!scoreProfile({...good,title:'Zendaya and Anne Hathaway interview'}).eligible);
assert(!scoreProfile({...good,title:'Joseph Zada Tells Elle Fanning His Story',person:personFor('Elle Fanning')}).eligible);
assert(excludedPerson('Zendaya: The Interview'));
assert(!config.people.some(p=>p.name==='Zendaya'));
assert.equal(personFor('Lea Seydoux talks about film').name,'Léa Seydoux');
assert.equal(personFor('Anne Hathawayesque style'),null);
assert.equal(sourceFor('https://www.vogue.com.evil.example/article'),null);
assert.throws(()=>canonical('javascript:alert(1)'));
const base='https://www.vogue.com/article/anne-hathaway-career';
assert.deepEqual(discoverLinks('<a href="/article/zendaya">Zendaya and Anne Hathaway</a><a href="/article/anne-hathaway-career?utm_x=2">Anne Hathaway</a><a href="/article/anne-hathaway-career">Anne Hathaway interview</a>',base).map(x=>x.url),[base]);
const img=id=>`<figure><img src="https://assets.vogue.com/photos/${id}/master/w_960/${id}.jpg"></figure>`;
const html=`<html lang="en"><h1>Anne Hathaway talks about her career</h1><article><p>${'Acting shaped her career and life. '.repeat(120)}</p>${img('real')}<figure class="advertisement"><img src="https://assets.vogue.com/photos/ad/master/w_960/ad.jpg"></figure>${img('promo-shoppingunit')}${img('real')}</article></html>`;
const extracted=extractProfile(html,base);
assert.equal(extracted.images.length,1,'广告图和同照片变体不计入摄影数量');
assert.equal(extracted.blocks.filter(x=>x.type==='image').length,1,'图片块应与图片清单对齐');
assert(extracted.blocks.some(x=>x.type==='text' && x.text.includes('Acting shaped her career')),'正文段落没有被提取');
assert(!extracted.blocks.some(x=>x.type==='text' && /subscribe|advertisement/i.test(x.text)),'广告/订阅段不应进入正文');
assert.equal(extracted.truncated,false,'正常原刊正文不应被标为截断');
assert.equal(extractProfile('<html lang="en"><h1>Anne Hathaway</h1><article><p>Good interview text. Continue reading to unlock the full article.</p></article></html>',base).truncated,true,'继续阅读提示应标为可能截断');
assert.deepEqual(splitOriginalSentences('Short answer. Yes!'),['Short answer.','Yes!'],'原文短句不得因长度被过滤');
const splitHtml=`<html lang="en"><h1>Anne Hathaway interview</h1><article><p>Short summary only.</p></article><article><p>${'Anne Hathaway discusses her career and film work. '.repeat(120)}</p></article>`;
assert(extractProfile(splitHtml,base).words>500,'多个 article 容器应选择正文而不是摘要');
const approved={...good,eligible:true,id:'people-anne',url:base,review:{status:'approved',visualChecked:true,guideChecked:true,articleChecked:true}};
const second={...approved,id:'people-charlize',url:'https://www.anothermag.com/interview/123/charlize',person:personFor('Charlize Theron')};
const third={...approved,id:'people-monica',url:'https://www.vogue.co.uk/article/monica',person:personFor('Monica Bellucci')};
assert.equal(selectDaily([approved,second,third],[],'2026-09-15',99).length,1);
assert.equal(selectDaily([approved,second],[{...approved,cat:'人物',addedAt:'2026-09-15'}],'2026-09-15').length,0);
assert.equal(selectDaily([approved,second],[{...approved,cat:'人物',addedAt:'2026-09-15'},{...second,cat:'人物',addedAt:'2026-09-15'}],'2026-09-15').length,0);
assert.equal(selectDaily([{...approved,review:{...approved.review,visualChecked:false}}],[],'2026-09-15').length,0);
assert.equal(selectDaily([approved],[{...approved,url:base+'?utm_source=x'}],'2026-09-15').length,0);
assert.equal(selectDaily([approved,{...approved,id:'people-anne-duplicate'}],[],'2026-09-15').length,1);
console.log('people-test: all checks passed');

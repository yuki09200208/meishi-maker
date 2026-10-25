const {chromium,devices}=require('playwright');(async()=>{
const b=await chromium.launch();const ctx=await b.newContext({...devices['iPhone 13']});const pg=await ctx.newPage();
const errs=[];pg.on('pageerror',e=>errs.push(e.message));
const D='/tmp/claude-0/-home-claude/b1ff82af-d609-5ebc-83b3-1ba075ec48e1/scratchpad/';
await pg.goto('file://'+D+'meishi-maker.html');await pg.evaluate(()=>{const m=document.createElement('meta');m.name='viewport';m.content='width=device-width,initial-scale=1';document.head.prepend(m)});await pg.waitForTimeout(400);
await pg.tap('#startBtn');await pg.setInputFiles('#file',D+'ptest4.jpg');await pg.waitForTimeout(1500);
await pg.tap('#cutAI');await pg.waitForFunction(()=>!$('cutAI').disabled);
console.log('faces',JSON.stringify(await pg.evaluate(()=>S.faces)));
// parser tests
console.log(JSON.stringify(await pg.evaluate(()=>[parseHosu('幹部補佐\n天城 煌\nKouki Amagi'),parseHosu('主任\nKOUKI\n天城煌'),parseHosu('天 城 煌\n住所 東京都新宿区歌舞伎町2-10-5 テストビル3F')].map(o=>[o.nameJa,o.nameEn,o.addr]))));
await pg.evaluate(()=>{S.orient='h';rebuild()});
await pg.evaluate(()=>go(3));await pg.waitForTimeout(1200);
console.log('scrollW',await pg.evaluate(()=>document.documentElement.scrollWidth),'innerW',await pg.evaluate(()=>innerWidth));
await pg.screenshot({path:D+'q_h3.png'});
for(const o of ['h','v']){await pg.evaluate((o)=>{S.orient=o;S.designs=candSet(24);document.body.innerHTML='';const wrap=document.createElement('div');wrap.style.cssText='display:flex;flex-wrap:wrap;gap:4px;background:#777';document.body.append(wrap);
 S.designs.slice(0,12).forEach(d=>{const cv=document.createElement('canvas');cv.style.width=o==='v'?'120px':'190px';renderCard(cv,d,'paper',.4,'front');wrap.append(cv)});
 [6,6,6].forEach((li,i)=>{const set=candSet(3,6);set.forEach(d=>{const cv=document.createElement('canvas');cv.style.width=o==='v'?'120px':'190px';renderCard(cv,d,'paper',.4,'front');wrap.append(cv)})})},o);
 await pg.waitForTimeout(200);await pg.screenshot({path:D+'q_cards_'+o+'.png',fullPage:true});}
console.log('errors',JSON.stringify(errs));await b.close();})();

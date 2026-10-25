const {chromium}=require('playwright');(async()=>{
const b=await chromium.launch();const pg=await b.newPage({viewport:{width:1400,height:1000}});
const errs=[];pg.on('pageerror',e=>errs.push(e.message));
const D='/tmp/claude-0/-home-claude/b1ff82af-d609-5ebc-83b3-1ba075ec48e1/scratchpad/';
await pg.goto('file://'+D+'meishi-maker.html');await pg.waitForTimeout(500);
await pg.setInputFiles('#logoFile',D+'logo.png');await pg.waitForTimeout(300);
for(const o of ['v','h']){
await pg.evaluate((o)=>{S.orient=o;document.body.innerHTML='';document.body.style.background='#888';const wrap=document.createElement('div');wrap.style.cssText='display:flex;flex-wrap:wrap;gap:8px;padding:8px';document.body.append(wrap);
 LAYS.forEach((l,li)=>{[0,7].forEach(pi=>{const cv=document.createElement('canvas');cv.style.width=o==='v'?'160px':'260px';const d=gen(1234+li*7+pi,li,pi);renderCard(cv,d,'paper',.5,'front');wrap.append(cv)})})},o);
await pg.waitForTimeout(300);await pg.screenshot({path:D+'L'+o+'.png',fullPage:true});}
console.log('errors',JSON.stringify(errs));await b.close();})();

const {chromium}=require('playwright');(async()=>{
const b=await chromium.launch();const pg=await b.newPage({viewport:{width:1400,height:1000}});
const errs=[];pg.on('pageerror',e=>errs.push(e.message));
const D='/tmp/claude-0/-home-claude/b1ff82af-d609-5ebc-83b3-1ba075ec48e1/scratchpad/';
await pg.goto('file://'+D+'meishi-maker.html');await pg.waitForTimeout(500);
const r=await pg.evaluate(()=>{const res={};LAYS.forEach((l,li)=>{let ok=0;for(let i=0;i<20;i++){if(designOK(gen(500+i*13,li,i%12)))ok++}res[l]=ok});return {res,faces:S.faces,n:S.designs.length}});
console.log(JSON.stringify(r));
await pg.evaluate(()=>{document.body.innerHTML='';const wrap=document.createElement('div');wrap.style.cssText='display:flex;flex-wrap:wrap;gap:8px;padding:8px;background:#888';document.body.append(wrap);
 S.designs.slice(0,16).forEach(d=>{const cv=document.createElement('canvas');cv.style.width='160px';renderCard(cv,d,'paper',.5,'front');wrap.append(cv)})});
await pg.waitForTimeout(200);await pg.screenshot({path:D+'F1.png',fullPage:true});
console.log('errors',JSON.stringify(errs));await b.close();})();

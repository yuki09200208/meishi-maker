const {chromium}=require('playwright');(async()=>{
const b=await chromium.launch();const pg=await b.newPage({viewport:{width:1300,height:900}});
const errs=[];pg.on('pageerror',e=>errs.push(e.message));
const D='/tmp/claude-0/-home-claude/b1ff82af-d609-5ebc-83b3-1ba075ec48e1/scratchpad/';
await pg.goto('file://'+D+'meishi-maker.html');await pg.waitForTimeout(400);
for(const img of ['ptest3.jpg','ptest4.jpg']){
 await pg.evaluate(()=>go(1));await pg.setInputFiles('#file',D+img);await pg.waitForTimeout(1500);
 await pg.click('#cutAI');await pg.waitForFunction(()=>!$('cutAI').disabled);
 const info=await pg.evaluate(()=>{const out={faces:S.faces,cnt:{}};for(const o of ['v','h']){S.orient=o;const set=candSet(24);out.cnt[o]={n:set.length,txt:set.filter(d=>d.layout==='textonly').length,lays:[...new Set(set.map(d=>d.layout))].join(',')};
   const wrap=document.createElement('div');wrap.id='w'+o;wrap.style.cssText='display:flex;flex-wrap:wrap;gap:3px;background:#777;position:relative;z-index:99';document.body.prepend(wrap);
   set.slice(0,16).forEach(d=>{const cv=document.createElement('canvas');cv.style.width=o==='v'?'100px':'160px';renderCard(cv,d,'paper',.35,'front');wrap.append(cv)})}return out});
 console.log(img,JSON.stringify(info));
 await pg.locator('#wh').screenshot({path:D+'r_'+img+'_h.png'});await pg.locator('#wv').screenshot({path:D+'r_'+img+'_v.png'});
 await pg.evaluate(()=>{$('wh').remove();$('wv').remove();S.orient='v'});
}
console.log('errors',JSON.stringify(errs));await b.close();})();

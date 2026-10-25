const {chromium}=require('playwright');(async()=>{
const b=await chromium.launch();const pg=await b.newPage({viewport:{width:430,height:930},deviceScaleFactor:2});
const errs=[];pg.on('pageerror',e=>errs.push(e.message));
const D='/tmp/claude-0/-home-claude/b1ff82af-d609-5ebc-83b3-1ba075ec48e1/scratchpad/';
await pg.goto('file://'+D+'meishi-maker.html');await pg.waitForTimeout(800);
await pg.screenshot({path:D+'k0.png'});
await pg.click('.mcard:nth-child(2)');await pg.setInputFiles('#logoFile',D+'logo.png');await pg.waitForTimeout(400);
await pg.click('#decide').catch(()=>{});
await pg.click('.next .btn[data-go="3"]');await pg.waitForTimeout(600);
for(let i=0;i<4;i++){await pg.click('#nextD')}
await pg.mouse.move(200,400);
await pg.screenshot({path:D+'k1.png'});
await pg.click('#decide');await pg.waitForTimeout(500);await pg.click('#nextD');await pg.screenshot({path:D+'k2.png'});
await pg.click('#decide');await pg.click('#decide');await pg.waitForTimeout(300);
console.log('step',await pg.evaluate(()=>S.step),'errors',JSON.stringify(errs));await b.close();})();

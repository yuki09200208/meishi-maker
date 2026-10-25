const {chromium}=require('playwright');(async()=>{
const b=await chromium.launch();const pg=await b.newPage({viewport:{width:430,height:930},deviceScaleFactor:2});
const errs=[];pg.on('pageerror',e=>errs.push(e.message));
const D='/tmp/claude-0/-home-claude/b1ff82af-d609-5ebc-83b3-1ba075ec48e1/scratchpad/';
await pg.goto('file://'+D+'meishi-maker.html');await pg.waitForTimeout(800);
await pg.screenshot({path:D+'m0.png'});
await pg.click('#startBtn');await pg.waitForTimeout(300);await pg.screenshot({path:D+'m1.png'});
await pg.click('#p1 [data-go="2"]');await pg.click('#p2 [data-go="3"]');await pg.waitForTimeout(500);
await pg.click('#backBtn');const st=await pg.evaluate(()=>S.step);await pg.click('#backBtn');await pg.click('#backBtn');
await pg.click('#startBtn');const st2=await pg.evaluate(()=>S.step);
console.log(st,st2,'errors',JSON.stringify(errs));await b.close();})();

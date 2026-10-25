const {chromium}=require('playwright');(async()=>{
const b=await chromium.launch();const pg=await b.newPage({viewport:{width:430,height:930},deviceScaleFactor:2});
const errs=[];pg.on('pageerror',e=>errs.push(e.message));
const D='/tmp/claude-0/-home-claude/b1ff82af-d609-5ebc-83b3-1ba075ec48e1/scratchpad/';
await pg.goto('file://'+D+'meishi-maker.html');await pg.waitForTimeout(1200);
await pg.screenshot({path:D+'h1.png',fullPage:true});
await pg.click('.mcard:nth-child(3)');await pg.waitForTimeout(900);
await pg.click('#nextD');await pg.click('#main');await pg.waitForTimeout(300);
await pg.screenshot({path:D+'h2.png'});
await pg.click('#backBtn');await pg.click('.mcard:nth-child(1)');await pg.click('#cutAuto');await pg.click('#backBtn');
await pg.click('#moreBtn');await pg.click('#orient button[data-o=h]');await pg.click('#sheetClose');
await pg.click('.mcard:nth-child(6)');await pg.click('#export');
console.log('errors',JSON.stringify(errs));await b.close();})();

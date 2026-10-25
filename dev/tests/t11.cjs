const {chromium}=require('playwright');(async()=>{
const b=await chromium.launch();const pg=await b.newPage({viewport:{width:430,height:930}});
const errs=[];pg.on('pageerror',e=>errs.push(e.message));
const D='/tmp/claude-0/-home-claude/b1ff82af-d609-5ebc-83b3-1ba075ec48e1/scratchpad/';
await pg.goto('file://'+D+'meishi-maker.html');await pg.waitForTimeout(400);
await pg.click('#startBtn');await pg.setInputFiles('#file',D+''+(process.argv[2]||'ptest.jpg'));await pg.waitForTimeout(800);
const t0=Date.now();await pg.click('#cutAI');await pg.waitForFunction(()=>!$('cutAI').disabled);console.log('ms',Date.now()-t0,await pg.textContent('#cutMsg'));
await pg.locator('.editor').screenshot({path:D+'cut_'+(process.argv[2]||'ptest.jpg')+'.png'});
console.log('errors',JSON.stringify(errs));await b.close();})();

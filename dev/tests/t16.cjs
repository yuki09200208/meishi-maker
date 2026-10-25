const {chromium,devices}=require('playwright');(async()=>{
const b=await chromium.launch();const ctx=await b.newContext({...devices['iPhone 13']});const pg=await ctx.newPage();
const errs=[];pg.on('pageerror',e=>errs.push(e.message));
const D='/tmp/claude-0/-home-claude/b1ff82af-d609-5ebc-83b3-1ba075ec48e1/scratchpad/';
await pg.goto('file://'+D+'meishi-maker.html');await pg.evaluate(()=>{localStorage.clear();const m=document.createElement('meta');m.name='viewport';m.content='width=device-width,initial-scale=1';document.head.prepend(m)});await pg.reload();await pg.evaluate(()=>{const m=document.createElement('meta');m.name='viewport';m.content='width=device-width,initial-scale=1';document.head.prepend(m)});await pg.waitForTimeout(800);
await pg.screenshot({path:D+'v0.png'});
await pg.tap('#startBtn');await pg.tap('#bbNext');await pg.waitForTimeout(400);await pg.screenshot({path:D+'v2.png'});
await pg.tap('#bbNext');await pg.waitForTimeout(900);await pg.screenshot({path:D+'v3.png'});
await pg.tap('#bbNext');await pg.waitForTimeout(900);await pg.screenshot({path:D+'v4.png'});
await pg.tap('#bbNext');await pg.waitForTimeout(900);await pg.screenshot({path:D+'v5.png',fullPage:true});
console.log('errors',JSON.stringify(errs));await b.close();})();

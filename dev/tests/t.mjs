import {chromium} from 'playwright';
const b=await chromium.launch();const pg=await b.newPage({viewport:{width:1280,height:1100}});
const errs=[];pg.on('pageerror',e=>errs.push(e.message));pg.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
const f='/tmp/claude-0/-home-claude/b1ff82af-d609-5ebc-83b3-1ba075ec48e1/scratchpad/meishi-maker.html';
await pg.goto('file://'+f);await pg.waitForTimeout(1500);
await pg.screenshot({path:'/tmp/claude-0/-home-claude/b1ff82af-d609-5ebc-83b3-1ba075ec48e1/scratchpad/s1.png'});
for(const s of [2,3,4]){await pg.click(`#steps button[data-s="${s}"]`);await pg.waitForTimeout(800)}
await pg.click('#cutAuto');await pg.waitForTimeout(300);
await pg.click('#steps button[data-s="1"]');await pg.click('#chips button:last-child');await pg.waitForTimeout(1200);
await pg.screenshot({path:'/tmp/claude-0/-home-claude/b1ff82af-d609-5ebc-83b3-1ba075ec48e1/scratchpad/s2.png'});
await pg.click('#steps button[data-s="2"]');await pg.waitForTimeout(1200);
await pg.screenshot({path:'/tmp/claude-0/-home-claude/b1ff82af-d609-5ebc-83b3-1ba075ec48e1/scratchpad/s3.png'});
await pg.click('#steps button[data-s="6"]');await pg.click('#export');await pg.waitForTimeout(300);
console.log('errors',JSON.stringify(errs));await b.close();

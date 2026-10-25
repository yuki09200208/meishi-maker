const {chromium,devices}=require('playwright');(async()=>{
const b=await chromium.launch();const ctx=await b.newContext({...devices['iPhone 13']});const pg=await ctx.newPage();
const errs=[];pg.on('pageerror',e=>errs.push(e.message));
const D='/tmp/claude-0/-home-claude/b1ff82af-d609-5ebc-83b3-1ba075ec48e1/scratchpad/';
await pg.goto('file://'+D+'meishi-maker.html');await pg.waitForTimeout(400);
await pg.tap('#startBtn');await pg.setInputFiles('#file',D+'ptest3.jpg');await pg.waitForTimeout(600);
await pg.locator('#posCv').scrollIntoViewIfNeeded();const bx=await pg.locator('#posCv').boundingBox();
const cdp=await ctx.newCDPSession(pg);const cx=bx.x+bx.width/2,cy=bx.y+bx.height/2;
await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:cx,y:cy}]});
for(let i=1;i<=6;i++)await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:cx+i*8,y:cy+i*4}]});
await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await pg.waitForTimeout(200);
console.log('touch drag px,py',await pg.evaluate(()=>[S.px,S.py]));
await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:cx-20,y:cy,id:1},{x:cx+20,y:cy,id:2}]});
for(let i=1;i<=5;i++)await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:cx-20-i*8,y:cy,id:1},{x:cx+20+i*8,y:cy,id:2}]});
await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await pg.waitForTimeout(200);
console.log('pinch zoom',await pg.evaluate(()=>S.zoom));
console.log('errors',JSON.stringify(errs));await b.close();})();

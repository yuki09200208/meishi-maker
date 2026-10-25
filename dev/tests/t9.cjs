const {chromium}=require('playwright');(async()=>{
const b=await chromium.launch();const pg=await b.newPage({viewport:{width:430,height:930},deviceScaleFactor:2});
const errs=[];pg.on('pageerror',e=>errs.push(e.message));
const D='/tmp/claude-0/-home-claude/b1ff82af-d609-5ebc-83b3-1ba075ec48e1/scratchpad/';
await pg.goto('file://'+D+'meishi-maker.html');await pg.waitForTimeout(500);
await pg.click('#startBtn');await pg.locator('#posCv').scrollIntoViewIfNeeded();
const bx=await pg.locator('#posCv').boundingBox();
await pg.mouse.move(bx.x+bx.width/2,bx.y+bx.height/2);await pg.mouse.down();await pg.mouse.move(bx.x+bx.width/2+40,bx.y+bx.height/2+20,{steps:5});await pg.mouse.up();
console.log('after drag',await pg.evaluate(()=>[S.px.toFixed(3),S.py.toFixed(3),S.zoom]));
await pg.mouse.wheel(0,-300);await pg.waitForTimeout(100);console.log('after wheel',await pg.evaluate(()=>S.zoom.toFixed(2)));
// pinch via synthetic pointer events
const r=await pg.evaluate(()=>{const cv=$('posCv'),R=cv.getBoundingClientRect(),cx=R.left+R.width/2,cy=R.top+R.height/2;S.zoom=1;
 const ev=(t,id,x,y)=>cv.dispatchEvent(new PointerEvent(t,{pointerId:id,clientX:x,clientY:y,bubbles:true,isPrimary:id===1}));
 cv.setPointerCapture=()=>{};ev('pointerdown',1,cx-20,cy);ev('pointerdown',2,cx+20,cy);ev('pointermove',1,cx-50,cy);ev('pointermove',2,cx+50,cy);ev('pointerup',1,cx-50,cy);ev('pointerup',2,cx+50,cy);return [S.zoom.toFixed(2),S.px.toFixed(3)]});
console.log('after pinch',r);
await pg.dblclick('#posCv');console.log('after dbl',await pg.evaluate(()=>[S.zoom,S.px,S.py]));
await pg.screenshot({path:D+'p1.png'});
console.log('errors',JSON.stringify(errs));await b.close();})();

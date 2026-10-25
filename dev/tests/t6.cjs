const {chromium}=require('playwright');(async()=>{
const b=await chromium.launch();const pg=await b.newPage({viewport:{width:430,height:930},deviceScaleFactor:2});
const errs=[];pg.on('pageerror',e=>errs.push(e.message));
const D='/tmp/claude-0/-home-claude/b1ff82af-d609-5ebc-83b3-1ba075ec48e1/scratchpad/';
await pg.goto('file://'+D+'meishi-maker.html');await pg.waitForTimeout(500);
await pg.click('#startBtn');
const box=await pg.locator('#ed').boundingBox();
await pg.mouse.move(box.x+20,box.y+20);await pg.mouse.down();await pg.mouse.move(box.x+box.width-20,box.y+40,{steps:8});await pg.mouse.up();
await pg.click('#cutAI');await pg.waitForTimeout(1500);console.log('cut:',await pg.textContent('#cutMsg'));
await pg.screenshot({path:D+'c1.png'});
await pg.click('#p1 [data-go="2"]');
await pg.click('.hs summary');await pg.fill('#hsText','ホスホス\nCLUB LUMIERE\n源氏名\n天城 煌\nKou Amagi\n店舗情報\n住所：東京都新宿区歌舞伎町2-10-5 テストビル3F\nTEL 03-1234-5678\n営業時間 20:00〜LAST\nLINE ID: kou_amagi\nInstagram @kou.amagi\nTikTok @kouamagi');
await pg.click('#hsParse');
for(const k of ['nameJa','nameEn','store','addr','tel','line','hours','insta','sns','role'])console.log(k,await pg.inputValue('#'+k));
await pg.click('#p2 [data-go="3"]');await pg.click('#decide');await pg.waitForTimeout(800);
await pg.screenshot({path:D+'c2.png',fullPage:true});
console.log('errors',JSON.stringify(errs));await b.close();})();

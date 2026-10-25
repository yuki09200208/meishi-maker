const {chromium}=require('playwright');(async()=>{
const b=await chromium.launch();const pg=await b.newPage({viewport:{width:430,height:930}});
const errs=[];pg.on('pageerror',e=>errs.push(e.message));
const D='/tmp/claude-0/-home-claude/b1ff82af-d609-5ebc-83b3-1ba075ec48e1/scratchpad/';
await pg.goto('file://'+D+'meishi-maker.html');await pg.waitForTimeout(400);
await pg.click('#startBtn');await pg.click('#cutAI');await pg.waitForTimeout(3000);console.log('cut:',await pg.textContent('#cutMsg'));
await pg.click('#p1 [data-go="2"]');
await pg.setInputFiles('#hsShots',D+'logo.png');await pg.waitForTimeout(2500);console.log('ocr:',await pg.textContent('#hsMsg'));
await pg.click('.hs summary');
await pg.fill('#hsText','天 城 煌\nKou Amagi\n店 舗 名 CLUB LUMIERE\n住 所 東 京 都 新 宿 区 歌 舞 伎 町 2-10-5 テ ス ト ビ ル 3F\nTEL 03-1234-5678\n営 業 時 間 20:00〜LAST');
await pg.click('#hsParse');for(const k of ['nameJa','store','addr','hours'])console.log(k,await pg.inputValue('#'+k));
console.log('errors',JSON.stringify(errs));await b.close();})();

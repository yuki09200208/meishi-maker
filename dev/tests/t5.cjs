const {chromium}=require('playwright');(async()=>{
const b=await chromium.launch();const pg=await b.newPage({viewport:{width:430,height:930}});
const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file:///tmp/claude-0/-home-claude/b1ff82af-d609-5ebc-83b3-1ba075ec48e1/scratchpad/meishi-maker.html');await pg.waitForTimeout(500);
await pg.click('#startBtn');await pg.click('#p1 [data-go="2"]');
await pg.fill('#hsText','CLUB TEST 店舗情報 住所 東京都新宿区歌舞伎町2-1-1 テストビル3F 電話 03-1111-2222 営業時間 20:00〜LAST LINE ID: @testline Instagram: @test_insta');
await pg.click('#hsParse');await pg.waitForTimeout(300);
console.log(await pg.textContent('#hsMsg'),await pg.inputValue('#addr'),await pg.inputValue('#tel'),await pg.inputValue('#hours'));
await pg.fill('#hsUrl','https://example.com');await pg.click('#hsGo');await pg.waitForTimeout(300);console.log(await pg.textContent('#hsMsg'));
console.log('errors',JSON.stringify(errs));await b.close();})();

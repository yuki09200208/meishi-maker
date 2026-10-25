
const $=id=>document.getElementById(id);
const FIELDS=['role','nameJa','nameEn','store','addr','tel','line','qr','hours','insta','sns','msg'];
const S={keep:[],px:0,py:0,faces:null,logo:null,logoTint:'ink',userPhoto:false,orient:'v',face:'front',img:null,img2:null,cut:false,zoom:1,ox:0,oy:0,mat:'paper',clearA:.3,filter:'all',step:1,design:null,designs:[],backStyle:'panel',backInv:false};
const SIZE={v:[650,1075],h:[1075,650]};
const F={min:'"Shippori Mincho B1",serif',goth:'"Zen Kaku Gothic New",sans-serif',script:'"Great Vibes",cursive',caps:'"Cormorant Garamond",serif'};
const AF={anton:'"Anton","Impact",sans-serif',serif:'"Playfair Display","Times New Roman",serif',brush:'"Yuji Syuku","Shippori Mincho B1",serif'};
const NF={min:{f:F.min,w:800},goth:{f:F.goth,w:900},thin:{f:F.min,w:600},brush:{f:AF.brush,w:400}};
const CUR={bgA:1};

/* ---------- データ ---------- */
const PALS=[
 {n:'ノワール',bg:'#0e0d10',fg:'#ffffff',sub:'#d8d4dc',acc:'#c9a45c',dark:1},
 {n:'クリムゾン',bg:'#6e0d10',fg:'#ffffff',sub:'#f3d9d6',acc:'#ff5a48',dark:1},
 {n:'ロイヤル',bg:'#13205a',fg:'#ffffff',sub:'#d8def5',acc:'#7d96ff',dark:1},
 {n:'バイオレット',bg:'#2a1240',fg:'#ffffff',sub:'#e6d8f3',acc:'#ff5fd2',dark:1},
 {n:'エメラルド',bg:'#0c3a2d',fg:'#ffffff',sub:'#d3eee4',acc:'#3fe0a6',dark:1},
 {n:'アイボリー',bg:'#f6f2ea',fg:'#1a1714',sub:'#4d463f',acc:'#a8823a',dark:0},
 {n:'ブラッシュ',bg:'#f7dfe3',fg:'#3a1820',sub:'#6b3a46',acc:'#d8426e',dark:0},
 {n:'スカイ',bg:'#d9ecf6',fg:'#102a3d',sub:'#2f4c63',acc:'#2a86c8',dark:0},
 {n:'レモン',bg:'#f6e86a',fg:'#161410',sub:'#3b362a',acc:'#d8401f',dark:0},
 {n:'コーラル',bg:'#e8603f',fg:'#ffffff',sub:'#fff0ea',acc:'#21155e',dark:1},
 {n:'モノクロ',bg:'#e3e3e3',fg:'#111111',sub:'#333333',acc:'#111111',dark:0},
 {n:'サイバー',bg:'#0a0f1f',fg:'#e8fdff',sub:'#a9e9f5',acc:'#3df5ff',dark:1}
];
const LAYS=['script','vkanji','boldcaps','edgecaps','serifname','textonly','pop','magazine'];
const OFF=[];const ON_IDX=[...LAYS.keys()];
const LNAME={script:'サイン',vkanji:'縦書き',boldcaps:'ゴシック',edgecaps:'英字タテ',serifname:'セリフ',textonly:'文字のみ',pop:'切り抜き',magazine:'マガジン'};
const BACKS=['panel','storeLogo','name','simple','info','message'];
const BNAME={panel:'パネル写真',storeLogo:'お店のロゴ',name:'名前',simple:'シンプル',info:'店舗情報',message:'メッセージ',none:'なし（片面）'};
const MATS=[
 ['paper','通常紙（光沢）','目安 ¥3,300〜'],
 ['matte','マット紙','目安 ¥3,300〜'],
 ['pearl','パール紙','目安 要見積もり'],
 ['glitter','ラメ','目安 ¥11,100〜'],
 ['holo','ホログラム','目安 ¥11,100〜'],
 ['goldfoil','金箔押し','目安 ¥14,400〜'],
 ['silverfoil','銀箔押し','目安 ¥14,400〜'],
 ['metal','メタル（シルバー）','目安 ¥43,000〜'],
 ['goldcard','ゴールドカード','目安 ¥24,000〜'],
 ['clear','クリア（透明）','目安 ¥17,600〜'],
 ['leather','レザー調','目安 ¥30,000〜'],
 ['wood','木目','目安 ¥22,000〜'],
 ['marble','大理石','目安 ¥27,600〜']
];
const MAT=Object.fromEntries(MATS.map(m=>[m[0],{n:m[1],p:m[2]}]));
const GOLD=[['#7d5e24',0],['#f4dc96',.3],['#a6802f',.55],['#fbe9ad',.78],['#8a6a2b',1]];
const SILVER=[['#6d6f73',0],['#f2f3f5',.3],['#9a9da3',.55],['#ffffff',.78],['#7c7f85',1]];

/* ---------- ユーティリティ ---------- */
function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function rgba(hex,a){const n=parseInt(hex.slice(1),16);return `rgba(${n>>16&255},${n>>8&255},${n&255},${a})`}
function font(w,s,f){return `${w} ${s}px ${f}`}
function fit(c,t,w,s,f,maxW){c.font=font(w,s,f);while(c.measureText(t).width>maxW&&s>8){s-=1;c.font=font(w,s,f)}return s}
function spaced(c,str,x,y,sp,align){const ch=[...str];const tw=ch.reduce((a,k)=>a+c.measureText(k).width,0)+sp*(ch.length-1);let cx=align==='center'?x-tw/2:align==='right'?x-tw:x;const o=c.textAlign;c.textAlign='left';for(const k of ch){c.fillText(k,cx,y);cx+=c.measureText(k).width+sp}c.textAlign=o}
function vtext(c,str,x,y,s){let cy=y;c.textAlign='center';c.textBaseline='top';for(const k of [...str]){if(!k.trim()){cy+=s*.5;continue}c.fillText(k,x,cy);cy+=s*1.04}c.textBaseline='alphabetic'}
function vSize(str,maxH,cap){const a=[...str];const n=a.filter(k=>k.trim()).length+a.filter(k=>!k.trim()).length*.5;return Math.min(cap,maxH/Math.max(1,n*1.04))}
function grad(c,x0,y0,x1,y1,stops){const g=c.createLinearGradient(x0,y0,x1,y1);stops.forEach(([k,p])=>g.addColorStop(p,k));return g}
function wrap(c,t,maxW){const out=[];for(const para of t.split('\n')){let line='';for(const ch of [...para]){if(c.measureText(line+ch).width>maxW&&line){out.push(line);line=ch}else line+=ch}out.push(line)}return out}
function palOf(d){const p=PALS[d.pal];return d.inv?{n:p.n,bg:p.fg,fg:p.bg,sub:p.bg,acc:p.acc,dark:!p.dark}:p}
function code(d){return `${LAYS.indexOf(d.layout).toString(36)}${d.pal.toString(36)}-${d.seed.toString(36).padStart(4,'0')}`.toUpperCase()}
function parseCode(s){const m=s.trim().toUpperCase().match(/^([0-9A-Z])([0-9A-B])-([0-9A-Z]{1,6})$/);if(!m)return null;const li=parseInt(m[1],36),pi=parseInt(m[2],36),sd=parseInt(m[3],36);if(li>=LAYS.length||pi>=PALS.length||OFF.includes(LAYS[li]))return null;return gen(sd,li,pi)}
function fillBg(c,w,h,pal){if(CUR.bgA<=0)return;c.save();c.globalAlpha=CUR.bgA;c.fillStyle=pal.bg;c.fillRect(0,0,w,h);c.restore()}

/* ---------- テクスチャ ---------- */
const TEX={};
function tex(name){
  if(TEX[name])return TEX[name];
  const c=document.createElement('canvas'),x=c.getContext('2d'),r=rng(name.length*31+7);
  if(name==='leather'){c.width=c.height=320;x.fillStyle='#808080';x.fillRect(0,0,320,320);
    for(let i=0;i<900;i++){x.strokeStyle=`rgba(0,0,0,${.15+r()*.35})`;x.lineWidth=.6+r()*1.4;x.beginPath();let px=r()*320,py=r()*320;x.moveTo(px,py);for(let k=0;k<3;k++){px+=(r()-.5)*22;py+=(r()-.5)*22;x.lineTo(px,py)}x.stroke()}
    for(let i=0;i<500;i++){x.fillStyle=`rgba(255,255,255,${r()*.25})`;x.fillRect(r()*320,r()*320,2,2)}}
  if(name==='noise'){c.width=c.height=200;const d=x.createImageData(200,200);for(let i=0;i<d.data.length;i+=4){const v=110+r()*40;d.data[i]=d.data[i+1]=d.data[i+2]=v;d.data[i+3]=255}x.putImageData(d,0,0)}
  if(name==='brushed'){c.width=c.height=400;x.fillStyle='#888';x.fillRect(0,0,400,400);for(let y=0;y<400;y++){const v=105+r()*70|0;x.fillStyle=`rgba(${v},${v},${v},.8)`;x.fillRect(0,y,400,1)}}
  if(name==='wood'){c.width=c.height=600;x.fillStyle='#808080';x.fillRect(0,0,600,600);
    for(let i=0;i<260;i++){const px=r()*600,v=r()<.5?40:200;x.strokeStyle=`rgba(${v},${v*.8|0},${v*.6|0},${.1+r()*.3})`;x.lineWidth=1+r()*4;x.beginPath();x.moveTo(px,0);for(let y=0;y<=600;y+=30)x.lineTo(px+Math.sin(y/70+i)*7,y);x.stroke()}}
  if(name==='marble'){c.width=c.height=650;x.fillStyle='#7a7a7a';x.fillRect(0,0,650,650);
    for(let i=0;i<34;i++){x.strokeStyle=r()<.7?'#ffffff':'#202020';x.globalAlpha=.2+r()*.55;x.lineWidth=.6+r()*3;x.beginPath();let px=r()*650,py=r()*650;x.moveTo(px,py);
      for(let k=0;k<5;k++){const nx=px+(r()-.3)*260,ny=py+(r()-.5)*260;x.quadraticCurveTo(px+(r()-.5)*160,py+(r()-.5)*160,nx,ny);px=nx;py=ny}x.stroke()}x.globalAlpha=1}
  return TEX[name]=c;
}
function texFill(c,w,h,name,op,a){c.save();c.globalCompositeOperation=op;c.globalAlpha=a;c.fillStyle=c.createPattern(tex(name),'repeat');c.fillRect(0,0,w,h);c.restore()}

/* ---------- 写真 ---------- */
function placeholder(){
  const c=document.createElement('canvas');c.width=600;c.height=900;const x=c.getContext('2d');
  const g=x.createRadialGradient(300,300,40,300,380,620);g.addColorStop(0,'#e9ecf3');g.addColorStop(1,'#9aa3b8');x.fillStyle=g;x.fillRect(0,0,600,900);
  const sk=x.createLinearGradient(0,180,0,520);sk.addColorStop(0,'#5d6478');sk.addColorStop(1,'#3b4152');
  x.fillStyle=sk;x.beginPath();x.moveTo(60,900);x.bezierCurveTo(70,640,170,560,300,555);x.bezierCurveTo(430,560,530,640,540,900);x.closePath();x.fill();
  x.beginPath();x.moveTo(255,470);x.lineTo(345,470);x.lineTo(338,575);x.lineTo(262,575);x.closePath();x.fill();
  x.beginPath();x.ellipse(300,345,92,118,0,0,Math.PI*2);x.fill();
  const hr=x.createLinearGradient(0,200,0,380);hr.addColorStop(0,'#2f3443');hr.addColorStop(1,'#454c60');x.fillStyle=hr;
  x.beginPath();x.moveTo(204,350);x.bezierCurveTo(190,240,250,205,305,208);x.bezierCurveTo(370,210,415,250,398,360);x.bezierCurveTo(385,300,350,280,300,286);x.bezierCurveTo(255,290,220,300,204,350);x.fill();
  x.globalAlpha=.18;x.fillStyle='#fff';x.beginPath();x.ellipse(250,300,30,70,-.3,0,Math.PI*2);x.fill();x.globalAlpha=1;
  return c;
}
/* 写真の置き方：顔が見えやすい位置に自動で合わせ、そのうえで指で動かした分を足す */
function mapPhoto(x,y,w,h,d,src,front){
  src=src||S.img;if(front==null)front=src===S.img;
  const z=front?S.zoom:1,sc=Math.max(w/src.width,h/src.height)*z,dw=src.width*sc,dh=src.height*sc,k=dw/src.width;
  let dx=x+(w-dw)/2,dy=y+(h-dh)/2;
  if(front&&S.faces&&S.faces[0]){const f=S.faces[0],v=S.orient==='v',tx=x+w*(v||w<SIZE[S.orient][0]*.8?.5:(d&&d.side==='L'?.74:.26)),ty=y+h*(v?.3:.38);
    const ax=tx-(dx+(f.x+f.w/2)*k),ay=ty-(dy+(f.y+f.h/2)*k);
    dx+=Math.max(x+w-dw-dx,Math.min(x-dx,ax));dy+=Math.max(y+h-dh-dy,Math.min(y-dy,ay))}
  if(front){dx+=S.px*w;dy+=S.py*h}
  return{dx,dy,dw,dh,k};
}
function photo(c,x,y,w,h,d,clip,src,noBack){
  const pal=palOf(d),front=!src||src===S.img;src=src||S.img;
  const {dx,dy,dw,dh}=mapPhoto(x,y,w,h,d,src,front);
  c.save();c.beginPath();if(clip)clip(c);else c.rect(x,y,w,h);c.clip();
  if(front&&S.cut&&!noBack&&CUR.bgA>0){c.globalAlpha=CUR.bgA;c.fillStyle=pal.bg;c.fillRect(x,y,w,h);const g=c.createRadialGradient(x+w/2,y+h*.4,0,x+w/2,y+h*.4,Math.max(w,h)*.6);g.addColorStop(0,rgba(pal.acc,.5));g.addColorStop(1,rgba(pal.acc,0));c.fillStyle=g;c.fillRect(x,y,w,h);c.globalAlpha=1}
  c.drawImage(src,dx,dy,dw,dh);
  if(front&&S.faces&&CUR.faceRects){const k=dw/src.width;for(const f of S.faces){const fx0=f.x-f.w*.12,fy0=f.y-f.h*.28,fw=f.w*1.24,fh=f.h*1.42;
    const cx=dx+(fx0+fw/2)*k,cy=dy+(fy0+fh/2)*k;if(cx<x||cx>x+w||cy<y||cy>y+h)continue;
    CUR.faceRects.push({cx,cy,rx:fw*k/2,ry:fh*k/2,dx,dy,dw,dh,redraw:S.cut,src})}}
  const fx=(op,col,a)=>{c.globalCompositeOperation=op;c.globalAlpha=a;c.fillStyle=col;c.fillRect(x,y,w,h);c.globalAlpha=1};
  if(!(S.cut&&front)){ /* 切り抜き写真は透明部分を塗らないよう、色加工は不透明な写真だけ */
    if(d.fx==='mono'||d.fx==='duotone')fx('saturation','#808080',1);
    if(d.fx==='duotone')fx('color',pal.acc,.6);
    if(d.fx==='tint')fx('soft-light',pal.bg,.65);
    if(d.fx==='warm')fx('overlay','#ff8a3d',.22);
    if(d.fx==='cool')fx('overlay','#3d7bff',.22);
  }
  c.restore();
}
function shadeTo(c,w,h,d,dir){
  if(CUR.bgA<=0)return;const pal=palOf(d),v=h>w;dir=dir||(v?'B':d.side);let g;
  if(dir==='B')g=c.createLinearGradient(0,h*.44,0,h);else if(dir==='L')g=c.createLinearGradient(w*.68,0,0,0);else g=c.createLinearGradient(w*.32,0,w,0);
  const a=d.shade*Math.max(CUR.bgA,.35);g.addColorStop(0,rgba(pal.bg,0));g.addColorStop(.55,rgba(pal.bg,a*.78));g.addColorStop(1,rgba(pal.bg,a));c.fillStyle=g;c.fillRect(0,0,w,h);
}

/* ---------- 装飾 ---------- */
function deco(c,w,h,u,d){
  const pal=palOf(d),r=rng(d.seed+99),A=pal.acc,G=pal.fg,L=d.side==='L';
  c.save();
  switch(d.deco){
  case 'lines':c.strokeStyle=A;c.lineWidth=2.2*u;c.globalAlpha=.85;for(let i=0;i<3;i++){c.beginPath();c.moveTo(-10*u,h*.2+i*16*u);c.lineTo(w*.5+i*16*u,-10*u);c.stroke()}break;
  case 'frame':c.strokeStyle=A;c.lineWidth=2.5*u;c.strokeRect(14*u,14*u,w-28*u,h-28*u);c.globalAlpha=.45;c.strokeStyle=G;c.lineWidth=1*u;c.strokeRect(22*u,22*u,w-44*u,h-44*u);break;
  case 'brush':{const cols=[A,G,pal.sub];for(let k=0;k<3;k++){const y0=(.04+r()*.3)*h,amp=(40+r()*80)*u;for(let i=0;i<22;i++){c.strokeStyle=cols[k];c.globalAlpha=.12+r()*.35;c.lineWidth=(2+r()*5)*u;c.beginPath();const o=i*3.2*u;c.moveTo(-20*u,y0+o);c.bezierCurveTo(w*.3,y0-amp+o,w*.6,y0+amp+o,w+20*u,y0-amp*.4+o);c.stroke()}}break}
  case 'confetti':for(let i=0;i<80;i++){c.save();c.fillStyle=[A,G,'#ffd54a'][i%3];c.globalAlpha=.5+r()*.45;c.translate(r()*w,Math.pow(r(),1.6)*h*.6);c.rotate(r()*6.28);const s=(5+r()*9)*u;c.fillRect(-s/2,-s/4,s,s/2);c.restore()}break;
  case 'neon':c.lineWidth=3*u;c.shadowBlur=16*u;[A,G,A].forEach((k,i)=>{c.strokeStyle=k;c.shadowColor=k;c.beginPath();c.moveTo(-40*u,h*(.32+i*.06));c.lineTo(w+40*u,h*(.12+i*.06));c.stroke()});break;
  case 'stripes':c.beginPath();if(L){c.moveTo(w,0);c.lineTo(w*.62,0);c.lineTo(w,h*.24)}else{c.moveTo(0,0);c.lineTo(w*.38,0);c.lineTo(0,h*.24)}c.closePath();c.clip();c.strokeStyle=A;c.globalAlpha=.8;c.lineWidth=5*u;for(let i=-h;i<w+h;i+=14*u){c.beginPath();c.moveTo(i,0);c.lineTo(i+h,h);c.stroke()}break;
  case 'dots':{c.fillStyle=A;c.globalAlpha=.7;const ox=L?w:0,sp=18*u,md=Math.min(w,h)*.55;for(let y=sp/2;y<md;y+=sp)for(let x=sp/2;x<md;x+=sp){const rr=Math.max(0,1-Math.hypot(x,y)/md)*7*u;if(rr>.3){c.beginPath();c.arc(L?ox-x:ox+x,y,rr,0,7);c.fill()}}break}
  case 'blocks':for(let i=0;i<12;i++){const s=(20+r()*70)*u,x=L?w-r()*w*.38-s:r()*w*.38,y=r()*h*.3;c.globalAlpha=.25+r()*.5;if(i%4===3){c.strokeStyle=G;c.lineWidth=2*u;c.strokeRect(x,y,s,s)}else{c.fillStyle=[A,G,pal.sub][i%3];c.fillRect(x,y,s,s)}}break;
  case 'glow':c.globalCompositeOperation='screen';for(let i=0;i<26;i++){const x=r()*w,y=r()*h*.7,rr=(10+r()*60)*u,g=c.createRadialGradient(x,y,0,x,y,rr);const k=i%2?A:G;g.addColorStop(0,rgba(k,.4));g.addColorStop(1,rgba(k,0));c.fillStyle=g;c.fillRect(x-rr,y-rr,rr*2,rr*2)}break;
  case 'rays':{const ox=L?w:0,n=28;c.fillStyle=A;c.globalAlpha=.13;for(let i=0;i<n;i+=2){const a0=i/n*Math.PI,a1=(i+1)/n*Math.PI,sg=L?-1:1;c.beginPath();c.moveTo(ox,0);c.lineTo(ox+Math.cos(a0)*h*2*sg,Math.sin(a0)*h*2);c.lineTo(ox+Math.cos(a1)*h*2*sg,Math.sin(a1)*h*2);c.closePath();c.fill()}break}
  }
  c.restore();
}

/* ---------- ロゴ ---------- */
const tintCache={};
function drawLogo(c,cx,cy,maxW,maxH,col){
  if(!S.logo)return false;const L=S.logo,s=Math.min(maxW/L.width,maxH/L.height),dw=L.width*s,dh=L.height*s;let src=L;
  if(S.logoTint==='ink'){if(typeof col!=='string')col=S.mat==='silverfoil'?'#e2e5ea':'#dcbc6a';
    if(!tintCache[col]){const t=document.createElement('canvas');t.width=L.width;t.height=L.height;const x=t.getContext('2d');x.drawImage(L,0,0);x.globalCompositeOperation='source-in';x.fillStyle=col;x.fillRect(0,0,t.width,t.height);tintCache[col]=t}src=tintCache[col]}
  c.drawImage(src,cx-dw/2,cy-dh/2,dw,dh);return true;
}
/* ---------- 文字 ---------- */
const qrCache={};
function qrMatrix(t){if(t in qrCache)return qrCache[t];let m=null;try{if(typeof qrcode==='function'){const q=qrcode(0,'M');q.addData(t);q.make();m={n:q.getModuleCount(),q}}}catch(e){}return qrCache[t]=m}
function drawQR(c,x,y,s){if(!S.qr)return;const m=qrMatrix(S.qr);if(!m)return;const pad=s*.07,cs=(s-2*pad)/m.n;c.fillStyle='#fff';c.fillRect(x,y,s,s);c.fillStyle='#000';for(let r=0;r<m.n;r++)for(let k=0;k<m.n;k++)if(m.q.isDark(r,k))c.fillRect(x+pad+k*cs,y+pad+r*cs,cs+.5,cs+.5)}
function contact(c,w,h,u,col,zl,zr){
  const v=h>w,qs=S.qr?(v?132:116)*u:0,bottom=h-30*u,fs=(v?22:20)*u,lh=fs*1.42,maxW=zr-zl-(qs?qs+16*u:0);
  if(qs)drawQR(c,zr-qs,bottom-qs+5*u,qs);
  c.save();c.fillStyle=col;c.textAlign='left';
  let lines=[];
  if(S.addr){c.font=font(700,fs,F.goth);if(c.measureText(S.addr).width>maxW){const a=S.addr,sp=[...a.matchAll(/[ 　]/g)].map(m=>m.index);let cut=sp.length?sp.reduce((b,x)=>Math.abs(x-a.length/2)<Math.abs(b-a.length/2)?x:b):Math.ceil(a.length/2);lines.push(a.slice(0,cut).trim(),a.slice(cut).trim())}else lines.push(S.addr)}
  if(S.tel)lines.push(S.tel);if(S.line)lines.push('LINE ID '+S.line);
  let y=bottom-(lines.length-1)*lh;for(const l of lines){fit(c,l,700,fs,F.goth,maxW);c.fillText(l,zl,y);y+=lh}c.restore();
}
function enText(c,t,cx,y,maxW,s,d,col){c.fillStyle=col;if(d.en==='script'){fit(c,t,400,s,F.script,maxW);c.fillText(t,cx,y)}else{t=t.toUpperCase();fit(c,t,700,s*.6,F.caps,maxW);c.fillText(t,cx,y)}}
function block(c,w,h,u,d,p,o){
  const zl=o.zl,zr=o.zr,cx=(zl+zr)/2,maxW=zr-zl,ns=(o.ns||66)*u,nf=NF[d.nameFont];let y=o.y;
  c.save();c.textAlign='center';if(p.shadow){c.shadowColor=p.shadow;c.shadowBlur=12*u}
  if(S.role&&!o.noRole){c.font=font(700,21*u,F.goth);c.fillStyle=p.sub;spaced(c,S.role,cx,y-((S.nameJa&&!o.noJa)?ns*.95:0)-8*u,4*u,'center')}
  if(S.nameJa&&!o.noJa){fit(c,S.nameJa,nf.w,ns,nf.f,maxW);c.fillStyle=p.main;c.fillText(S.nameJa,cx,y);y+=ns*.12}
  if(S.nameEn&&!o.noEn){y+=48*u;enText(c,S.nameEn,cx,y,maxW,(o.es||50)*u,d,p.en)}
  if((S.logo||S.store)&&!o.noStore){y+=56*u;c.shadowBlur=0;if(!drawLogo(c,cx,y-9*u,maxW*.62,58*u,p.main)){c.font=font(700,27*u,F.caps);c.fillStyle=p.main;spaced(c,S.store.toUpperCase(),cx,y,5*u,'center')}}
  c.restore();contact(c,w,h,u,p.sub,zl,zr);
}
function zone(w,h,u,d,inner){const v=h>w;if(v)return{zl:28*u,zr:w-28*u};const a=inner||.46;return d.side==='L'?{zl:28*u,zr:w*a}:{zl:w*(1-a),zr:w-28*u}}
function vName(c,x,top,maxH,cap,d,p,u){if(!S.nameJa)return;const nf=NF[d.nameFont],s=vSize(S.nameJa,maxH,cap);c.save();c.font=font(nf.w,s,nf.f);if(p.shadow){c.shadowColor=p.shadow;c.shadowBlur=12*u}c.fillStyle=p.main;vtext(c,S.nameJa,x,top,s);c.restore()}
function badge(c,w,h,u,col,pos){
  if(!S.no)return;c.save();c.font=font(700,24*u,F.caps);const tw=c.measureText(S.no).width,rx=tw/2+14*u,ry=17*u,cx=pos==='L'?28*u+rx:w-28*u-rx,cy=30*u+ry;
  c.strokeStyle=col;c.fillStyle=col;c.lineWidth=1.6*u;c.beginPath();c.ellipse(cx,cy,rx,ry,0,0,Math.PI*2);c.stroke();c.textAlign='center';c.textBaseline='middle';c.fillText(S.no,cx,cy+u);c.restore();
}

/* ---------- 表のレイアウト ---------- */
function sh(c,p,u,b){if(p.shadow){c.shadowColor=p.shadow;c.shadowBlur=(b||12)*u}else c.shadowBlur=0}
function topLogo(c,w,h,u,p,pos,y0){
  y0=y0||34*u;const mw=210*u,mh=66*u,m=32*u;
  if(S.logo){const L=S.logo,s=Math.min(mw/L.width,mh/L.height),dw=L.width*s,dh=L.height*s,x=pos==='L'?m+dw/2:pos==='R'?w-m-dw/2:w/2;c.save();sh(c,p,u,6);drawLogo(c,x,y0+dh/2,mw,mh,p.main);c.restore();return}
  if(S.store){c.save();sh(c,p,u,6);const t=S.store.toUpperCase();fit(c,t,700,26*u,F.caps,w*.5);c.fillStyle=p.main;c.textBaseline='top';spaced(c,t,pos==='L'?m:pos==='R'?w-m:w/2,y0,4*u,pos==='L'?'left':pos==='R'?'right':'center');c.restore()}
}
function nameLine(c,x,y,maxW,u,d,p,size,align,noName){
  const nm=noName?'':(S.nameJa||'');if(!nm&&!S.role)return;
  const nf=NF[d.nameFont]||NF.min,rs=Math.round(size*.5),gap=nm?size*.45:0;
  c.save();sh(c,p,u,10);c.font=font(700,rs,F.goth);const rw=S.role?c.measureText(S.role).width+gap:0;
  let ns=size;c.font=font(nf.w,ns,nf.f);while(rw+c.measureText(nm).width>maxW&&ns>10){ns--;c.font=font(nf.w,ns,nf.f)}
  const tw=rw+c.measureText(nm).width,x0=align==='center'?x-tw/2:align==='right'?x-tw:x;c.textAlign='left';
  if(S.role){c.font=font(700,rs,F.goth);c.fillStyle=p.sub;c.fillText(S.role,x0,y)}
  if(nm){c.font=font(nf.w,ns,nf.f);c.fillStyle=p.main;c.fillText(nm,x0+rw,y)}c.restore();
}
function fullBg(c,w,h,u,d){
  if(h>w){photo(c,0,0,w,h,d);shadeTo(c,w,h,d);deco(c,w,h,u,d);return}
  /* 横向き：写真は文字と反対側の約6割に置き、境目を地色になじませる */
  const pal=palOf(d),L=d.side==='L',bx=L?w*.4:0,bw=w*.6;fillBg(c,w,h,pal);photo(c,bx,0,bw,h,d);
  if(CUR.bgA>0){const g=L?c.createLinearGradient(bx,0,bx+bw*.35,0):c.createLinearGradient(bw,0,bw-bw*.35,0);g.addColorStop(0,rgba(pal.bg,CUR.bgA));g.addColorStop(1,rgba(pal.bg,0));c.fillStyle=g;c.fillRect(L?bx:bw-bw*.35,0,bw*.35,h)}
  const g2=c.createLinearGradient(0,h*.6,0,h);g2.addColorStop(0,rgba(pal.bg,0));g2.addColorStop(1,rgba(pal.bg,.55*Math.max(CUR.bgA,.3)));c.fillStyle=g2;c.fillRect(bx,0,bw,h);
  deco(c,w,h,u,d)}
function zoneM(w,h,u,d){const v=h>w;if(v)return{zl:32*u,zr:w-32*u};return d.side==='L'?{zl:32*u,zr:w*.5}:{zl:w*.5,zr:w-32*u}}
const LAY={
script:{bg:fullBg,text(c,w,h,u,d,p){const v=h>w,z=zoneM(w,h,u,d),cx=(z.zl+z.zr)/2;
  topLogo(c,w,h,u,p,v?d.side:d.side);
  const t=S.nameEn||S.nameJa;
  if(t){c.save();c.translate(cx,v?h*.67:h*.47);c.rotate(d.rot*.7);c.textAlign='center';sh(c,p,u,14);c.fillStyle=p.en;
    if(S.nameEn)fit(c,t,400,190*u,F.script,v?w*.84:(z.zr-z.zl)*.96);else{const nf=NF[d.nameFont];fit(c,t,nf.w,120*u,nf.f,w*.84)}
    c.fillText(t,0,0);c.restore()}
  nameLine(c,cx,v?h*.785:h*.67,(z.zr-z.zl)*.9,u,d,p,36*u,'center',!S.nameEn);
  contact(c,w,h,u,p.sub,z.zl,z.zr)}},
vkanji:{bg:fullBg,text(c,w,h,u,d,p){const v=h>w,L=d.side==='L',nf=NF[d.nameFont];
  const nx=v?(L?w*.16:w*.84):(L?w*.08:w*.92),top=v?h*.05:h*.07,maxH=v?h*.62:h*.86;
  if(S.nameJa){const s=vSize(S.nameJa,maxH,v?130*u:104*u);c.save();c.font=font(nf.w,s,nf.f);sh(c,p,u,12);c.fillStyle=p.main;vtext(c,S.nameJa,nx,top,s);
    if(S.role){c.font=font(700,21*u,F.goth);c.fillStyle=p.sub;vtext(c,S.role,nx+(L?1:-1)*(s*.55+20*u),top+8*u,22*u)}c.restore()}
  topLogo(c,w,h,u,p,L?'R':'L');
  const z=v?{zl:32*u,zr:w-32*u}:(L?{zl:w*.18,zr:w*.54}:{zl:w*.46,zr:w*.82});
  if(S.nameEn){c.save();c.translate(v?w*(L?.58:.42):(z.zl+z.zr)/2,v?h*.79:h*.55);c.rotate(d.rot*.5);c.textAlign='center';sh(c,p,u,10);enText(c,S.nameEn,0,0,v?w*.62:(z.zr-z.zl),78*u,d,p.en);c.restore()}
  contact(c,w,h,u,p.sub,z.zl,z.zr)}},
boldcaps:{bg:fullBg,text(c,w,h,u,d,p){const v=h>w,z=zoneM(w,h,u,d),cx=(z.zl+z.zr)/2,t=(S.nameEn||'').toUpperCase(),top=d.alt,mw=z.zr-z.zl;
  topLogo(c,w,h,u,p,top?(d.side==='L'?'R':'L'):d.side);
  if(t){const words=t.split(/\s+/).filter(Boolean);c.save();sh(c,p,u,10);c.fillStyle=p.en;
    const s=Math.min(...words.map(wd=>fit(c,wd,400,v?190*u:150*u,AF.anton,mw)));c.font=font(400,s,AF.anton);const lh=s*1.0;
    const al=top?(d.side==='L'?'left':'right'):'center',x=top?(d.side==='L'?z.zl:z.zr):cx;c.textAlign=al;
    let y=top?(v?118*u:104*u)+s*.78:(v?h*.745:h*.6)-(words.length-1)*lh;for(const wd of words){c.fillText(wd,x,y);y+=lh}c.restore()}
  nameLine(c,cx,v?h*.81:h*.72,mw*.9,u,d,p,34*u,'center',!t);if(!t)nameLine(c,cx,v?h*.75:h*.62,mw,u,d,p,90*u,'center');
  contact(c,w,h,u,p.sub,z.zl,z.zr)}},
edgecaps:{bg:fullBg,text(c,w,h,u,d,p){const v=h>w,L=d.side==='L',t=(S.nameEn||'').toUpperCase();let band=0;
  if(t){c.save();const s=fit(c,t,400,v?150*u:118*u,AF.anton,h*.94);band=s*.92+26*u;const x0=L?22*u+s*.8:w-22*u-s*.8;
    c.translate(x0,h/2);c.rotate(L?-Math.PI/2:Math.PI/2);c.textAlign='center';sh(c,p,u,10);c.fillStyle=p.en;c.fillText(t,0,0);c.restore()}
  topLogo(c,w,h,u,p,L?'R':'L');
  const z=v?(L?{zl:band+10*u,zr:w-32*u}:{zl:32*u,zr:w-band-10*u}):(L?{zl:band+10*u,zr:w*.54}:{zl:w*.46,zr:w-band-10*u});
  nameLine(c,(z.zl+z.zr)/2,v?h*.8:h*.62,(z.zr-z.zl)*.92,u,d,p,42*u,'center');
  contact(c,w,h,u,p.sub,z.zl,z.zr)}},
serifname:{bg:fullBg,text(c,w,h,u,d,p){const v=h>w,z=zoneM(w,h,u,d),x=z.zl+4*u,mw=z.zr-z.zl,nf=NF[d.nameFont];
  topLogo(c,w,h,u,p,d.side);
  c.save();sh(c,p,u,12);c.textAlign='left';let y=v?h*.655:h*.38;
  if(S.role){c.font='italic 600 '+Math.round(26*u)+'px '+AF.serif;c.fillStyle=p.sub;c.fillText(S.role,x,y);y+=42*u}
  if(S.nameJa&&S.nameEn){fit(c,S.nameJa,nf.w,30*u,nf.f,mw);c.fillStyle=p.main;c.fillText(S.nameJa,x,y);y+=v?106*u:92*u}else y+=v?70*u:60*u;
  const big=S.nameEn||S.nameJa||'';if(big){if(S.nameEn)fit(c,big,700,v?132*u:112*u,AF.serif,mw);else fit(c,big,nf.w,v?110*u:96*u,nf.f,mw);c.fillStyle=p.en;c.fillText(big,x,y)}
  c.restore();contact(c,w,h,u,p.sub,z.zl,z.zr)}},
textonly:{bg(c,w,h,u,d){const pal=palOf(d);fillBg(c,w,h,pal);if(CUR.bgA>0)texFill(c,w,h,'noise',pal.dark?'screen':'multiply',.06*CUR.bgA);deco(c,w,h,u,d)},
  text(c,w,h,u,d,p){const v=h>w,cx=w/2,nf=NF[d.nameFont];topLogo(c,w,h,u,p,'C',v?64*u:44*u);
  c.save();c.textAlign='center';sh(c,p,u,6);
  const en=()=>{const t=S.nameEn.toUpperCase();fit(c,t,600,30*u,F.caps,w*.66);c.fillStyle=p.sub;spaced(c,t,cx,v?(d.vName?h*.8:h*.585):h*.7,8*u,'center')};
  if(v&&d.vName&&S.nameJa){if(S.role){c.font=font(700,24*u,F.goth);c.fillStyle=p.sub;spaced(c,S.role,cx,h*.2,6*u,'center')}
    const s=vSize(S.nameJa,h*.48,170*u);c.font=font(nf.w,s,nf.f);c.fillStyle=p.main;vtext(c,S.nameJa,cx,h*.235,s);c.textAlign='center';if(S.nameEn)en()}
  else{if(S.role){c.font=font(700,24*u,F.goth);c.fillStyle=p.sub;spaced(c,S.role,cx,v?h*.34:h*.3,6*u,'center')}
    if(S.nameJa){fit(c,S.nameJa,nf.w,v?150*u:130*u,nf.f,w*.84);c.fillStyle=p.main;c.fillText(S.nameJa,cx,v?h*.5:h*.56)}if(S.nameEn)en()}
  c.restore();contact(c,w,h,u,p.sub,40*u,w-40*u)}},
pop:{bg(c,w,h,u,d){const pal=palOf(d),v=h>w;
    if(!S.cut){photo(c,0,0,w,h,d);shadeTo(c,w,h,d,'B');deco(c,w,h,u,d);return;const t='';
      if(t){c.save();c.fillStyle=pal.acc;c.globalAlpha=.9;c.textAlign='center';c.textBaseline='top';let y=h*.03;for(const wd of (v?t.split(/\s+/):[t])){const s=fit(c,wd,400,v?230*u:200*u,AF.anton,w*.94);c.fillText(wd,w/2,y);y+=s*.98}c.restore()}
      deco(c,w,h,u,d);return}
    fillBg(c,w,h,pal);
    if(CUR.bgA>0){const g=c.createRadialGradient(w/2,h*.45,0,w/2,h*.45,Math.max(w,h)*.6);g.addColorStop(0,rgba(pal.acc,.4*CUR.bgA));g.addColorStop(1,rgba(pal.acc,0));c.fillStyle=g;c.fillRect(0,0,w,h)}
    deco(c,w,h,u,d);const t=(S.nameEn||S.store||'').toUpperCase();
    const box=[0,v?h*.12:h*.05,w,v?h*.88:h*.95],mp=mapPhoto(...box,d);let avail=v?h*.42:h*.5;
    if(S.faces&&S.faces[0]){const f=S.faces[0];avail=Math.min(avail,mp.dy+(f.y-f.h*.85)*mp.k-h*.03)}
    if(t){const words=v?t.split(/\s+/):[t];c.save();c.fillStyle=pal.acc;c.globalAlpha=.95;c.textAlign='center';c.textBaseline='top';
      let s0=Math.min(...words.map(wd=>fit(c,wd,400,v?270*u:240*u,AF.anton,w*.94)),avail/(words.length*1.0));
      if(s0<64*u)CUR.reject=true;c.font=font(400,s0,AF.anton);let y=h*.03;for(const wd of words){c.fillText(wd,w/2,y);y+=s0*.98}c.restore()}
    photo(c,...box,d,null,null,true);shadeTo(c,w,h,d,'B')},
  text(c,w,h,u,d,p){const v=h>w,z=zoneM(w,h,u,d),cx=(z.zl+z.zr)/2;
  if(!S.cut){const t=(S.nameEn||S.store||'').toUpperCase();if(t){c.save();c.fillStyle=palOf(d).acc;c.globalAlpha=.92;c.textAlign='center';c.textBaseline='top';let y=h*.03;for(const wd of (v?t.split(/\s+/):[t])){const s=fit(c,wd,400,v?230*u:200*u,AF.anton,w*.94);c.fillText(wd,w/2,y);y+=s*.98}c.restore()}}
  c.save();sh(c,p,u,6);if(!drawLogo(c,cx,v?h*.745:h*.6,w*.4,(v?50:44)*u,p.main)&&S.store&&S.cut){c.textAlign='center';fit(c,S.store.toUpperCase(),700,24*u,F.caps,w*.5);c.fillStyle=p.main;c.fillText(S.store.toUpperCase(),cx,v?h*.755:h*.62)}c.restore();
  nameLine(c,cx,v?h*.81:h*.72,(z.zr-z.zl)*.9,u,d,p,40*u,'center');contact(c,w,h,u,p.sub,z.zl,z.zr)}},
magazine:{bg:fullBg,text(c,w,h,u,d,p){const v=h>w,L=d.side==='L',nf=NF[d.nameFont];
  const mh=(v?120:96)*u;
  if(CUR.cardFaces&&CUR.cardFaces.some(f=>f.cy-f.ry<mh+30*u))CUR.reject=true;
  c.save();sh(c,p,u,8);if(S.logo)drawLogo(c,w/2,18*u+mh/2,w*.8,mh,p.main);else if(S.store){const t=S.store.toUpperCase();c.textAlign='center';c.textBaseline='top';fit(c,t,700,mh*1.15,AF.serif,w*.92);c.fillStyle=p.main;c.fillText(t,w/2,16*u)}else CUR.reject=true;c.restore();
  const nx=L?w*.86:w*.14,top=v?h*.25:h*.33;
  if(S.nameJa){const s=vSize(S.nameJa,v?h*.42:h*.5,v?112*u:92*u);c.save();c.font=font(nf.w,s,nf.f);sh(c,p,u,12);c.fillStyle=p.main;vtext(c,S.nameJa,nx,top,s);
    const sub=[S.role,(S.nameEn||'').toUpperCase()].filter(Boolean).join(' ／ ');if(sub){c.font=font(700,20*u,F.caps);c.fillStyle=p.sub;c.translate(nx+(L?-1:1)*(s*.55+10*u)+(L?-20*u:0),top);c.rotate(Math.PI/2);c.textAlign='left';c.fillText(sub,0,0)}c.restore()}
  const z=zoneM(w,h,u,d);contact(c,w,h,u,p.sub,z.zl,z.zr)}}
};

/* ---------- 裏のレイアウト ---------- */
function plainBg(c,w,h,u,d){const pal=palOf(d);fillBg(c,w,h,pal);if(CUR.bgA>0)texFill(c,w,h,'noise',pal.dark?'screen':'multiply',.05*CUR.bgA);deco(c,w,h,u,d)}
const BACK={
simple:{bg:plainBg,text(c,w,h,u,d,p){const v=h>w,cx=w/2;c.save();c.textAlign='center';
  if(!drawLogo(c,cx,(v?h*.28:h*.24)-30*u,w*.7,(v?150:110)*u,p.main)&&S.store){const t=S.store.toUpperCase();fit(c,t,700,80*u,F.caps,w*.84);c.fillStyle=p.main;c.fillText(t,cx,v?h*.28:h*.24)}
  const nm=[S.role,S.nameJa].filter(Boolean).join('　');if(nm){fit(c,nm,700,26*u,F.goth,w*.8);c.fillStyle=p.sub;c.fillText(nm,cx,v?h*.35:h*.35)}
  const qs=150*u;let y=v?h*.44:h*.42;if(S.qr){drawQR(c,cx-qs/2,y,qs);y+=qs+36*u}else y+=30*u;
  c.textAlign='center';c.fillStyle=p.sub;[S.line?'LINE ID '+S.line:'',S.addr,S.tel].filter(Boolean).forEach(l=>{fit(c,l,700,19*u,F.goth,w*.84);c.fillText(l,cx,y);y+=27*u});c.restore()}},
info:{bg:plainBg,text(c,w,h,u,d,p){const v=h>w,pal=palOf(d);c.save();c.textAlign='center';
  if(!drawLogo(c,w/2,(v?h*.12:h*.17)-18*u,w*.6,(v?78:62)*u,p.main)&&S.store){const t=S.store.toUpperCase();fit(c,t,700,54*u,F.caps,w*.84);c.fillStyle=p.main;c.fillText(t,w/2,v?h*.12:h*.17)}
  c.strokeStyle=pal.acc;c.lineWidth=1.5*u;c.beginPath();c.moveTo(40*u,v?h*.155:h*.23);c.lineTo(w-40*u,v?h*.155:h*.23);c.stroke();
  const rows=[['住所',S.addr],['TEL',S.tel],['営業時間',S.hours],['LINE',S.line],['Instagram',S.insta],['SNS',S.sns]].filter(r=>r[1]);
  c.textAlign='left';let y=v?h*.24:h*.33;const step=v?72*u:50*u,maxW=v?w-80*u:w*.62;
  for(const [k,val] of rows){c.font=font(700,15*u,F.goth);c.fillStyle=p.sub;spaced(c,k,40*u,y,2*u,'left');fit(c,val,700,v?23*u:22*u,F.goth,maxW);c.fillStyle=p.main;c.fillText(val,40*u,y+(v?29:23)*u);y+=step}
  c.restore();const qs=(v?130:116)*u;if(S.qr)drawQR(c,w-40*u-qs,h-36*u-qs,qs)}},
message:{bg:plainBg,text(c,w,h,u,d,p){const v=h>w,cx=w/2;c.save();c.textAlign='center';const s=v?36*u:30*u;c.font=font(600,s,F.min);c.fillStyle=p.main;
  const lines=wrap(c,S.msg||'',w*.78);let y=(v?h*.4:h*.4)-(lines.length-1)*s*1.7/2;for(const l of lines){c.fillText(l,cx,y);y+=s*1.7}
  if(S.nameEn)enText(c,S.nameEn,cx,y+40*u,w*.7,58*u,d,p.en);
  c.restore();contact(c,w,h,u,p.sub,28*u,w-28*u)}},
panel:{bg(c,w,h,u,d){const pal=palOf(d);photo(c,0,0,w,h,d,null,S.img2||S.img);const v=h>w;
    const g=c.createLinearGradient(0,v?h*.62:h*.5,0,h);g.addColorStop(0,rgba(pal.bg,0));g.addColorStop(1,rgba(pal.bg,.92*Math.max(CUR.bgA,.4)));c.fillStyle=g;c.fillRect(0,0,w,h);
    c.strokeStyle=pal.acc;c.lineWidth=3*u;c.strokeRect(16*u,16*u,w-32*u,h-32*u);c.globalAlpha=.6;c.strokeStyle=pal.fg;c.lineWidth=1*u;c.strokeRect(24*u,24*u,w-48*u,h-48*u);c.globalAlpha=1},
  text(c,w,h,u,d,p){const v=h>w,nf=NF[d.nameFont];c.save();c.textAlign='center';if(p.shadow){c.shadowColor=p.shadow;c.shadowBlur=12*u}
    let y=v?h*.82:h*.74;
    if(S.nameJa){fit(c,S.nameJa,nf.w,v?72*u:64*u,nf.f,w*.8);c.fillStyle=p.main;c.fillText(S.nameJa,w/2,y)}
    if(S.nameEn){enText(c,S.nameEn,w/2,y+(v?52:46)*u,w*.7,44*u,d,p.en)}
    c.shadowBlur=0;drawLogo(c,w/2,h-(v?60:48)*u,w*.36,(v?44:36)*u,p.main);c.restore()}},
storeLogo:{bg:plainBg,text(c,w,h,u,d,p){const v=h>w;
    if(!drawLogo(c,w/2,v?h*.42:h*.42,w*.74,v?h*.4:h*.5,p.main)){const t=(S.store||'STORE').toUpperCase();c.save();c.textAlign='center';fit(c,t,700,v?110*u:120*u,F.caps,w*.84);c.fillStyle=p.main;c.fillText(t,w/2,v?h*.45:h*.46);
      c.strokeStyle=palOf(d).acc;c.lineWidth=2*u;c.beginPath();c.moveTo(w*.3,v?h*.5:h*.55);c.lineTo(w*.7,v?h*.5:h*.55);c.stroke();c.restore()}
    contact(c,w,h,u,p.sub,28*u,w-28*u)}},
name:{bg:plainBg,text(c,w,h,u,d,p){const v=h>w,nf=NF[d.nameFont],cx=w/2;c.save();c.textAlign='center';if(p.shadow){c.shadowColor=p.shadow;c.shadowBlur=10*u}
    if(v&&S.nameJa){if(S.role){c.font=font(700,24*u,F.goth);c.fillStyle=p.sub;spaced(c,S.role,cx,h*.1,6*u,'center')}
      const s=vSize(S.nameJa,h*.56,170*u);c.font=font(nf.w,s,nf.f);c.fillStyle=p.main;vtext(c,S.nameJa,cx,h*.14,s);c.textAlign='center';
      if(S.nameEn)enText(c,S.nameEn,cx,h*.8,w*.8,60*u,d,p.en)}
    else{if(S.role){c.font=font(700,24*u,F.goth);c.fillStyle=p.sub;spaced(c,S.role,cx,h*.26,6*u,'center')}
      if(S.nameJa){fit(c,S.nameJa,nf.w,150*u,nf.f,w*.84);c.fillStyle=p.main;c.fillText(S.nameJa,cx,h*.5)}
      if(S.nameEn)enText(c,S.nameEn,cx,h*.66,w*.7,62*u,d,p.en)}
    c.shadowBlur=0;if(!drawLogo(c,cx,h-(v?64:50)*u,w*.36,(v?50:40)*u,p.main)&&S.store){c.font=font(700,24*u,F.caps);c.fillStyle=p.main;spaced(c,S.store.toUpperCase(),cx,h-(v?52:40)*u,6*u,'center')}
    c.restore()}}
};

/* ---------- 素材 ---------- */
/* 効果は描かれている部分だけにかける（最後に元の形で切り抜くので、透明部分は透明のまま） */
const masks={};
function surface(c,w,h,u,m,d){
  if(m==='paper'||m==='goldfoil'||m==='silverfoil'||m==='clear')return;
  const cv=c.canvas,W=cv.width,H=cv.height,k=W+'x'+H;
  if(!masks[k]){masks[k]=document.createElement('canvas');masks[k].width=W;masks[k].height=H}
  const mk=masks[k],mx=mk.getContext('2d');mx.clearRect(0,0,W,H);mx.drawImage(cv,0,0);
  const r=rng(d.seed+5),pal=palOf(d);
  const layer=(op,a,style)=>{c.save();c.globalCompositeOperation=op;c.globalAlpha=a;c.fillStyle=style;c.fillRect(0,0,w,h);c.restore()};
  const sheen=a=>{const g=c.createLinearGradient(0,0,w,h);g.addColorStop(.25,'rgba(255,255,255,0)');g.addColorStop(.45,`rgba(255,255,255,${a})`);g.addColorStop(.6,'rgba(255,255,255,0)');layer('screen',1,g)};
  const pat=n=>c.createPattern(tex(n),'repeat');
  if(m==='matte'){layer('multiply',.08,pat('noise'));layer('screen',.05,'#ffffff')}
  if(m==='pearl'){layer('soft-light',.75,grad(c,0,0,w,h,[['#ffd6e8',0],['#d6ecff',.35],['#e6ffe9',.7],['#fff1d6',1]]));sheen(.22)}
  if(m==='glitter'){c.save();c.globalCompositeOperation='screen';for(let i=0;i<700;i++){const x=r()*w,y=r()*h,s=(1+r()*3.5)*u;c.globalAlpha=.3+r()*.7;c.fillStyle=['#ffffff','#ffe9a8',pal.acc][i%3];c.beginPath();c.moveTo(x,y-s*2);c.lineTo(x+s*.4,y);c.lineTo(x,y+s*2);c.lineTo(x-s*.4,y);c.closePath();c.fill();c.beginPath();c.moveTo(x-s*2,y);c.lineTo(x,y+s*.4);c.lineTo(x+s*2,y);c.lineTo(x,y-s*.4);c.closePath();c.fill()}c.restore()}
  if(m==='holo'){layer('overlay',.55,grad(c,0,0,w,h,['#ff7ad9','#7afcff','#fff27a','#9b7aff','#7affb2','#ff9a7a'].map((k,i,a)=>[k,i/(a.length-1)])));
    c.save();c.globalCompositeOperation='screen';c.globalAlpha=.5;for(let i=0;i<650;i++){const s=(3+r()*8)*u,x=r()*w,y=r()*h;c.fillStyle=`hsl(${r()*360},90%,${55+r()*30}%)`;c.beginPath();for(let q=0;q<6;q++){const a=q/6*Math.PI*2;c.lineTo(x+Math.cos(a)*s,y+Math.sin(a)*s)}c.fill()}c.restore()}
  if(m==='metal'){layer('saturation',.6,'#808080');layer('overlay',.85,pat('brushed'));sheen(.3)}
  if(m==='goldcard'){layer('overlay',.7,pat('brushed'));layer('color',.6,'#c9a24a');sheen(.28)}
  if(m==='leather')layer('overlay',.75,pat('leather'));
  if(m==='wood'){layer('overlay',.85,pat('wood'));layer('multiply',.25,'#d9b98a')}
  if(m==='marble')layer('overlay',.7,pat('marble'));
  c.save();c.setTransform(1,0,0,1,0,0);c.globalCompositeOperation='destination-in';c.drawImage(mk,0,0);c.restore();
}
function paint(c,w,h,d,m){
  const pal=palOf(d),p={main:pal.fg,en:d.accentText?pal.acc:pal.fg,sub:pal.sub,shadow:pal.dark?'rgba(0,0,0,.55)':'rgba(255,255,255,.85)'};
  if(m==='goldfoil'||m==='silverfoil'){const g=grad(c,0,0,w,h,m==='goldfoil'?GOLD:SILVER);p.main=g;p.en=g;p.shadow='rgba(0,0,0,.45)'}
  if(m==='clear'&&S.clearA<.4){p.shadow='rgba(0,0,0,.35)'}
  return p;
}

/* ---------- 生成と描画 ---------- */
function gen(seed,li,pi){
  const r=rng(seed*7919+13),pick=a=>a[Math.floor(r()*a.length)];
  return{seed,layout:LAYS[li],pal:pi,
    fx:pick(['none','none','none','mono','duotone','tint','warm','cool']),
    deco:pick(['none','none','none','lines','frame','brush','confetti','neon','dots','glow','rays']),
    nameFont:pick(['min','min','brush','goth','thin']),en:pick(['script','script','caps']),
    side:r()<.5?'L':'R',rot:-(.08+r()*.2),shade:.8+r()*.17,accentText:r()<.3,vName:r()<.5,alt:r()<.45};
}
function randomSet(n,lockLayout,lockPal){
  const out=[],lays=[];while(lays.length<n)lays.push(...[...ON_IDX].sort(()=>Math.random()-.5));
  for(let i=0;i<n;i++){const li=lockLayout!=null?lockLayout:lays[i],pi=lockPal!=null?lockPal:Math.floor(Math.random()*PALS.length);out.push(gen(Math.floor(Math.random()*1679616),li,pi))}
  return out;
}
const layers={};
function renderCard(canvas,d,m,scale,face,bStyle,bInv){
  const keepRole=S.role;if(!S.nameJa&&!S.nameEn)S.role='';try{return renderCard0(canvas,d,m,scale,face,bStyle,bInv)}finally{S.role=keepRole}
}
function renderCard0(canvas,d,m,scale,face,bStyle,bInv){
  face=face||'front';
  const [w,h]=SIZE[S.orient],W=Math.round(w*scale),H=Math.round(h*scale),u=Math.min(w,h)/650;
  canvas.width=W;canvas.height=H;
  const k=W+'x'+H;if(!layers[k]){layers[k]=document.createElement('canvas');layers[k].width=W;layers[k].height=H}
  const lc=layers[k],lx=lc.getContext('2d');lx.setTransform(1,0,0,1,0,0);lx.globalAlpha=1;lx.globalCompositeOperation='source-over';lx.shadowBlur=0;lx.clearRect(0,0,W,H);lx.setTransform(scale,0,0,scale,0,0);
  CUR.bgA=m==='clear'?S.clearA:1;
  let dd=d,L=LAY[d.layout];
  if(face==='back'){const bs=bStyle||S.backStyle;dd={...d,side:d.side==='L'?'R':'L',inv:bInv!=null?bInv:S.backInv};L=BACK[bs]||BACK.simple}
  CUR.faceRects=[];CUR.reject=false;
  L.bg(lx,w,h,u,dd);surface(lx,w,h,u,m,dd);
  const faces=CUR.faceRects;CUR.faceRects=null;
  const c=canvas.getContext('2d');c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,W,H);c.drawImage(lc,0,0);
  if(m==='clear'){c.save();c.setTransform(scale,0,0,scale,0,0);c.strokeStyle='rgba(150,150,160,.6)';c.lineWidth=2*u;c.strokeRect(u,u,w-2*u,h-2*u);c.restore()}
  const tk='t'+k;if(!layers[tk]){layers[tk]=document.createElement('canvas');layers[tk].width=W;layers[tk].height=H}
  const tc=layers[tk],tx=tc.getContext('2d');tx.setTransform(1,0,0,1,0,0);tx.globalAlpha=1;tx.globalCompositeOperation='source-over';tx.shadowBlur=0;tx.clearRect(0,0,W,H);tx.setTransform(scale,0,0,scale,0,0);
  CUR.cardFaces=faces;const p=paint(tx,w,h,dd,m);L.text(tx,w,h,u,dd,p);tx.setTransform(1,0,0,1,0,0);
  /* 顔にかかる文字：切り抜き写真なら顔の下へ、そうでなければ顔の部分だけ透かす */
  let frac=0;
  if(faces.length){
    const id=tx.getImageData(0,0,W,H).data,E=faces.map(f=>({cx:f.cx*scale,cy:f.cy*scale,rx:f.rx*scale,ry:f.ry*scale}));let tot=0,ins=0;const st=W>300?2:1;
    for(let y=0;y<H;y+=st)for(let x=0;x<W;x+=st){if(id[(y*W+x)*4+3]>60){tot++;for(const e of E){const a=(x-e.cx)/e.rx,b=(y-e.cy)/e.ry;if(a*a+b*b<1){ins++;break}}}}
    frac=tot?ins/tot:0;
    if(ins&&!faces.every(f=>f.redraw)){tx.save();tx.globalCompositeOperation='destination-out';
      for(const e of E){tx.save();tx.translate(e.cx,e.cy);tx.scale(1,e.ry/e.rx);const g=tx.createRadialGradient(0,0,0,0,0,e.rx);g.addColorStop(0,'rgba(0,0,0,1)');g.addColorStop(.75,'rgba(0,0,0,1)');g.addColorStop(1,'rgba(0,0,0,0)');tx.fillStyle=g;tx.beginPath();tx.arc(0,0,e.rx,0,Math.PI*2);tx.fill();tx.restore()}tx.restore()}
    c.drawImage(tc,0,0);
    if(ins&&faces.every(f=>f.redraw)){for(const f of faces){c.save();c.setTransform(scale,0,0,scale,0,0);c.beginPath();c.ellipse(f.cx,f.cy,f.rx*1.06,f.ry*1.06,0,0,Math.PI*2);c.clip();c.drawImage(f.src,f.dx,f.dy,f.dw,f.dh);c.restore()}}
  }else c.drawImage(tc,0,0);
  return CUR.reject?1:frac;
}
/* 顔に文字が大きくかかる案は候補から外す */
const okCv=document.createElement('canvas');
function designOK(d){if(!S.faces||!S.faces.length)return true;if(d.layout!=='textonly'&&['lines','neon','brush'].includes(d.deco))return false;return renderCard(okCv,d,'paper',.16,'front')<.012}
function candSet(n,li,pi){if(!S.faces||!S.faces.length)return randomSet(n,li,pi);const out=[],maxT=li==null?Math.max(1,Math.round(n*.15)):n;let nt=0;for(let t=0;t<10&&out.length<n;t++){for(const d of randomSet(n,li,pi)){if(out.length>=n)break;if(d.layout==='textonly'&&nt>=maxT)continue;if(designOK(d)){out.push(d);if(d.layout==='textonly')nt++}}}return out}

/* ---------- 画面 ---------- */
const main=$('main');
let job=0;
function queue(items){const my=++job;let i=0;(function tick(){if(my!==job)return;const e=Math.min(i+4,items.length);for(;i<e;i++){const t=items[i];renderCard(t.cv,t.d,t.m,.25,t.face,t.bs,t.bi)}if(i<items.length)requestAnimationFrame(tick)})()}
function tile(label,sub,cls){const b=document.createElement('button');b.type='button';b.className='thumb';const cv=document.createElement('canvas');cv.className='chk';b.append(cv);
  const a=document.createElement('span');a.className=cls||'code';a.textContent=label;b.append(a);if(sub){const s=document.createElement('span');s.className='pr';s.textContent=sub;b.append(s)}return{b,cv}}
function gridClass(g){g.className='grid'+(S.orient==='h'?' h':'')}
function buildDesigns(){
  const g=$('dgrid');g.innerHTML='';gridClass(g);const items=[];
  const kept=S.keep.filter(k=>!S.designs.some(x=>code(x)===code(k)));
  [...S.designs.filter(d=>isKept(d)),...kept,...S.designs.filter(d=>!isKept(d))].forEach(d=>{const t=tile(LNAME[d.layout],PALS[d.pal].n);t.b.dataset.code=code(d);if(isKept(d))t.b.querySelector('.code').textContent='♥ '+LNAME[d.layout];t.b.onclick=()=>{S.design=d;if(!S.designs.includes(d))S.designs.unshift(d);mark();refreshMain()};g.append(t.b);items.push({cv:t.cv,d,m:S.mat,face:'front'})});
  mark();queue(items);
}
function buildBacks(){
  const g=$('bgrid');g.innerHTML='';gridClass(g);const items=[];
  {const t=tile('裏面なし','片面印刷','nm');t.b.dataset.back='none';const x=t.cv.getContext('2d');const [w,h]=SIZE[S.orient];t.cv.width=w*.25;t.cv.height=h*.25;x.fillStyle='#f3f5fb';x.fillRect(0,0,t.cv.width,t.cv.height);x.strokeStyle='#b7caf5';x.setLineDash([6,5]);x.lineWidth=2;x.strokeRect(4,4,t.cv.width-8,t.cv.height-8);x.fillStyle='#6c78a2';x.font='700 16px sans-serif';x.textAlign='center';x.fillText('裏面なし',t.cv.width/2,t.cv.height/2);t.b.onclick=()=>{S.backStyle='none';S.backInv=false;mark();refreshMain()};g.append(t.b)}
  BACKS.forEach(bs=>[false,true].forEach(bi=>{const t=tile(BNAME[bs]+(bi?'（反転）':''),'','nm');t.b.dataset.back=bs+(bi?'-i':'');t.b.onclick=()=>{S.backStyle=bs;S.backInv=bi;mark();refreshMain()};g.append(t.b);items.push({cv:t.cv,d:S.design,m:S.mat,face:'back',bs,bi})}));
  mark();queue(items);
}
function buildMats(){
  const g=$('mgrid');g.innerHTML='';gridClass(g);const items=[];
  MATS.forEach(([k,n,p])=>{const t=tile(n,p,'nm');t.b.dataset.mat=k;t.b.onclick=()=>{S.mat=k;$('clearBox').hidden=k!=='clear';mark();refreshMain()};g.append(t.b);items.push({cv:t.cv,d:S.design,m:k,face:S.face==='back'&&S.backStyle!=='none'?'back':'front'})});
  $('clearBox').hidden=S.mat!=='clear';mark();queue(items);
}
function isKept(d){return S.keep.some(k=>code(k)===code(d))}
$('keepBtn').onclick=()=>{const d=S.design;if(isKept(d)){S.keep=S.keep.filter(k=>code(k)!==code(d));toast('キープを外しました')}else{S.keep.push(d);toast('キープしました（一覧の先頭に表示）')}mark();save();buildDesigns()};
function mark(){
  {const k=S.design&&isKept(S.design);$('keepBtn').textContent=k?'♥ キープ中':'♡ キープ';$('keepBtn').classList.toggle('on',!!k)}
  document.querySelectorAll('#dgrid .thumb').forEach(b=>b.classList.toggle('on',b.dataset.code===code(S.design)));
  document.querySelectorAll('#mgrid .thumb').forEach(b=>b.classList.toggle('on',b.dataset.mat===S.mat));
  document.querySelectorAll('#bgrid .thumb').forEach(b=>b.classList.toggle('on',S.backStyle==='none'?b.dataset.back==='none':b.dataset.back===S.backStyle+(S.backInv?'-i':'')));
  $('noBack').classList.toggle('on',S.backStyle==='none');$('noBack').textContent=S.backStyle==='none'?'裏面なし（選択中）':'裏面なし（片面印刷）';
}
function backLabel(){return S.backStyle==='none'?BNAME.none:BNAME[S.backStyle]+(S.backInv?'（反転）':'')}
function refreshMain(){
  const back=S.face==='back'&&S.backStyle!=='none';
  renderCard(main,S.design,S.mat,1,back?'back':'front');main.className=S.orient+' chk';
  $('mCode').textContent=code(S.design);
  $('mDesc').textContent=(back?'裏：'+backLabel():(S.face==='back'?'裏面なしのため表を表示':'表：'+LNAME[S.design.layout]+'・'+PALS[S.design.pal].n))+'／'+MAT[S.mat].n;
  if(S.step===1){const pc=$('posCv'),pd=S.design.layout==='textonly'?{...S.design,layout:'script'}:S.design;renderCard(pc,pd,S.mat,.6,'front');pc.className='chk '+S.orient}
  if(S.step===6)summary();
  if(S.step===0)renderHome();
  updCount();save();
}
function setFace(f){S.face=f;[...$('face').children].forEach(b=>b.classList.toggle('on',b.dataset.f===f))}
function summary(){
  {const warn=[];if(!S.nameJa&&!S.nameEn)warn.push('名前が空です');if(S.qr&&typeof qrcode!=='function')warn.push('QRコードを作れませんでした（通信を確認してください）');$('sWarn').textContent='⚠ '+warn.join('／');$('sWarn').hidden=!warn.length}
  const d=S.design;$('sCode').textContent=code(d);$('sLay').textContent=LNAME[d.layout]+'／'+PALS[d.pal].n;$('sBack').textContent=backLabel();$('sMat').textContent=MAT[S.mat].n+(S.mat==='clear'?'（地色 '+Math.round(S.clearA*100)+'%）':'');$('sPrice').textContent=MAT[S.mat].p;
  const L=[['デザインコード',code(d)],['表',LNAME[d.layout]+'（'+PALS[d.pal].n+'）'],['裏',backLabel()],['素材',MAT[S.mat].n],['向き',S.orient==='v'?'縦':'横'],['写真',S.cut?'切り抜きあり':''],['役職',S.role],['名前',S.nameJa],['ローマ字',S.nameEn],['ロゴ',S.logo?'あり（画像を別送）':''],['店名',S.logo?'':S.store],['住所',S.addr],['電話',S.tel],['LINE ID',S.line],['QR',S.qr],['営業時間',S.hours],['Instagram',S.insta],['SNS',S.sns],['メッセージ',S.msg.replace(/\n/g,' ')]];
  $('memo').value=L.filter(x=>x[1]).map(x=>x[0]+'：'+x[1]).join('\n');
}
const STEPS=['写真','名前・情報','表のデザイン','裏のデザイン','素材','書き出し'];const BARL=['写真','情報','表','裏','素材','完成'];let reached=1;
const BOPTS=[['none',false],...BACKS.flatMap(b=>[[b,false],[b,true]])];
function status(i){
  if(i===0)return S.userPhoto?(S.cut?'切り抜き済み':'設定済み'):'見本';
  if(i===1){const n=['role','nameJa','nameEn','store','addr','tel','line','qr','hours','insta','sns','msg'].filter(k=>S[k]).length+(S.logo?1:0);return n+'項目'}
  if(i===2)return MAT[S.mat].n;return '表・裏';
}
const bar=$('bar');
STEPS.forEach((t,i)=>{const b=document.createElement('button');b.type='button';b.textContent=BARL[i];b.onclick=()=>{if(i+1<=reached)go(i+1)};bar.append(b)});
$('startBtn').onclick=()=>go(1);
function renderHome(){
  $('hero').classList.toggle('h',S.orient==='h');
  renderCard($('heroF'),S.design,S.mat,.42,'front');
  const hb=$('heroB');hb.hidden=S.backStyle==='none';if(!hb.hidden)renderCard(hb,S.design,S.mat,.42,'back');
  $('heroCode').textContent=reached>1?'作成中の名刺':'見本';
  $('startBtn').classList.toggle('mini',reached>1);$('startBtn').querySelector('.t').textContent=reached>1?'STEP1から見直す':'名刺をつくる';
  {const rb=$('resumeBox');rb.hidden=reached<=1;if(reached>1){rb.innerHTML='';const a=document.createElement('button');a.className='btn';a.type='button';a.textContent='続きから（STEP '+reached+'「'+STEPS[reached-1]+'」）';a.onclick=()=>go(reached);rb.append(a)}}
  $('startSt').textContent=reached>1?'入力した内容はそのまま残ります':'写真を選ぶところから始めます';
}
function toast(t){const el=document.createElement('div');el.className='toast';el.textContent=t;document.body.append(el);setTimeout(()=>el.remove(),2200)}
function busy(on,t){$('busy').hidden=!on;if(t)$('busyMsg').textContent=t}
const NEXTL={1:'次へ：名前・情報',2:'次へ：表のデザイン',3:'この表に決定 → 裏へ',4:'この裏に決定 → 素材へ',5:'この素材に決定 → 書き出しへ',6:'表と裏の画像を書き出す'};
function go(n){
  S.step=n;[1,2,3,4,5,6].forEach(i=>{$('p'+i).hidden=i!==n});
  $('home').hidden=n!==0;$('page').hidden=n===0;$('brandHome').hidden=n!==0;$('brandPage').hidden=n===0;$('backBtn').classList.toggle('ghost',n===0);
  window.scrollTo(0,0);$('bbar').hidden=n===0;$('app').classList.toggle('inpage',n!==0);
  if(n===0){renderHome();save();return}
  $('bbNext').textContent=NEXTL[n];$('keepBtn').hidden=n!==3;$('flowHint').textContent={3:'左右にスワイプ・タップで次の案へ。気に入った案は「♡ キープ」。',4:'左右にスワイプ・タップで裏面の案を切り替えます。',5:'左右にスワイプ・タップで素材を切り替えます。'}[n]||'';
  const flow=n>=3&&n<=5;reached=Math.max(reached,n);
  $('pNo').textContent=n+'/6';$('pName').textContent=STEPS[n-1];$('pSub').textContent='';
  [...bar.children].forEach((b,i)=>{b.classList.toggle('on',i+1===n);b.classList.toggle('done',i+1<n||i+1<=reached&&i+1!==n)});
  $('pv').hidden=n===1||n===2;$('pv').classList.toggle('big',flow);$('prevD').hidden=$('nextD').hidden=$('dCount').hidden=$('flowHint').hidden=$('decideRow').hidden=!flow;$('flow').hidden=true;
  $('face').hidden=n===3||n===4;
  $('decide').textContent={3:'この表に決定 → 裏へ',4:'この裏に決定 → 素材へ',5:'この素材に決定 → 書き出しへ'}[n]||'';
  [...$('flow').querySelectorAll('span')].forEach(x=>{const k=+x.dataset.s;x.classList.toggle('on',k===n);x.classList.toggle('done',k<n)});
  if(n===3){setFace('front');buildDesigns()}
  if(n===4){setFace('back');buildBacks()}
  if(n===5){setFace('front');buildMats()}
  if(n===1||n===2)setFace('front');
  if(n===1){drawEd();$('file').closest('label').classList.toggle('compact',!!S.userPhoto)}
  if(n===6)summary();
  if(n===5)setFace('front');
  refreshMain();save();
}
$('bbBack').onclick=()=>go(S.step-1);
$('bbNext').onclick=()=>{if(S.step===6){$('export').click();return}if(S.step===2&&!S.nameJa&&!S.nameEn){toast('名前を入れると仕上がりを確認しやすくなります')}go(S.step+1)};
function updCount(){let i=0,t=0;
  if(S.step===3){i=S.designs.findIndex(x=>code(x)===code(S.design));t=S.designs.length}
  if(S.step===4){i=BOPTS.findIndex(o=>o[0]===S.backStyle&&o[1]===S.backInv);t=BOPTS.length}
  if(S.step===5){i=MATS.findIndex(m=>m[0]===S.mat);t=MATS.length}
  $('dCount').textContent=t?(i+1)+' / '+t:''}
function stepOpt(dir){
  if(S.step===3)return stepDesign(dir);
  if(S.step===4){let i=BOPTS.findIndex(o=>o[0]===S.backStyle&&o[1]===S.backInv);i=(i+dir+BOPTS.length)%BOPTS.length;[S.backStyle,S.backInv]=BOPTS[i];mark();refreshMain()}
  if(S.step===5){let i=MATS.findIndex(m=>m[0]===S.mat);i=(i+dir+MATS.length)%MATS.length;S.mat=MATS[i][0];$('clearBox').hidden=S.mat!=='clear';mark();refreshMain()}
}
$('decide').onclick=()=>go(S.step+1);$('flowBack').onclick=()=>go(S.step===3?2:S.step-1);
$('flow').addEventListener('click',e=>{const k=+e.target.dataset.s;if(k)go(k)});
function rebuild(){refreshMain();if(S.step===3)buildDesigns();if(S.step===4)buildBacks();if(S.step===5)buildMats()}

/* chips */
const chips=$('chips');
[['all','すべて'],...LAYS.filter(k=>!OFF.includes(k)).map(k=>[k,LNAME[k]])].forEach(([k,n])=>{const b=document.createElement('button');b.type='button';b.textContent=n;b.className=k==='all'?'on':'';
  b.onclick=()=>{const set=candSet(24,k==='all'?null:LAYS.indexOf(k));if(!set.length){$('codeMsg').textContent='この写真では「'+n+'」は名前が顔にかかるため出せません。人物を切り抜く・写真の位置や向きを変えると出る場合があります。';return}$('codeMsg').textContent='';S.filter=k;chips.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));S.designs=set;S.design=S.designs[0];buildDesigns();refreshMain()};chips.append(b)});
$('gen').onclick=()=>{const set=candSet(24,S.filter==='all'?null:LAYS.indexOf(S.filter));if(!set.length)return;S.designs=set;S.design=S.designs[0];buildDesigns();refreshMain()};
$('similar').onclick=()=>{const d=S.design,li=LAYS.indexOf(d.layout);S.designs=[d,...candSet(11,li,d.pal),...candSet(12,li)];buildDesigns()};
$('load').onclick=()=>{const d=parseCode($('code').value);if(!d){$('codeMsg').textContent='コードの形が違います。「3B-0K9F」のように、英数字2文字、ハイフン、英数字の順で入力してください。';return}
  $('codeMsg').textContent='';S.design=d;if(!S.designs.some(x=>code(x)===code(d)))S.designs=[d,...S.designs.slice(0,23)];buildDesigns();refreshMain()};
$('noBack').onclick=()=>{S.backStyle='none';S.backInv=false;mark();refreshMain()};
$('backBtn').onclick=()=>go(S.step-1);
$('moreBtn').onclick=()=>{$('sheet').hidden=false};$('sheetClose').onclick=()=>{$('sheet').hidden=true};
$('sheet').addEventListener('click',e=>{if(e.target.id==='sheet')$('sheet').hidden=true});
$('today').textContent='写真からかんたん名刺づくり';
document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>go(+b.dataset.go));
$('face').addEventListener('click',e=>{const f=e.target.dataset.f;if(!f)return;setFace(f);refreshMain();if(S.step===5)buildMats()});
$('orient').addEventListener('click',e=>{const o=e.target.dataset.o;if(!o)return;S.orient=o;[...$('orient').children].forEach(b=>b.classList.toggle('on',b.dataset.o===o));rebuild()});
$('clearA').addEventListener('input',e=>{S.clearA=+e.target.value/100;clearTimeout(tmr);tmr=setTimeout(()=>{refreshMain()},60)});
$('clearA').addEventListener('change',()=>buildMats());

/* inputs */
let tmr;
FIELDS.forEach(id=>{const el=$(id);if(id==='qr')el.addEventListener('input',()=>{S.qrAuto=false});S[id]=id==='msg'?el.value:el.value.trim();el.addEventListener('input',()=>{S[id]=id==='msg'?el.value:el.value.trim();clearTimeout(tmr);tmr=setTimeout(refreshMain,120)})});
/* 写真の移動・拡大：ドラッグで移動、2本指で拡大、ホイールで拡大 */
const clampP=v=>Math.max(-.9,Math.min(.9,v));
let posRaf=0;
function posChanged(){$('zoom').value=S.zoom;if(posRaf)return;posRaf=requestAnimationFrame(()=>{posRaf=0;refreshMain()})}
let rcT=0;function recheck(){clearTimeout(rcT);rcT=setTimeout(()=>{if(!S.faces||!S.designs.length)return;if(S.step===3)mark()},400)}
function resetPos(){S.zoom=1;S.px=0;S.py=0;posChanged()}
function gestures(cv,o){
  const pts=new Map();let g=null;
  const start=()=>{const r=cv.getBoundingClientRect(),a=[...pts.values()];g={r,px:S.px,py:S.py,zoom:S.zoom,n:a.length,moved:g?g.moved:false,a:{...a[0]}};
    if(a.length>1){g.d=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y)||1;g.m={x:(a[0].x+a[1].x)/2,y:(a[0].y+a[1].y)/2}}};
  cv.addEventListener('pointerdown',e=>{cv.setPointerCapture(e.pointerId);pts.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pts.size===1)g=null;start()});
  cv.addEventListener('pointermove',e=>{if(!pts.has(e.pointerId)||!g)return;pts.set(e.pointerId,{x:e.clientX,y:e.clientY});const a=[...pts.values()];if(a.length!==g.n){start();return}
    const [w,h]=SIZE[S.orient],k=w/g.r.width;
    if(a.length===1){const dx=a[0].x-g.a.x,dy=a[0].y-g.a.y;if(!g.moved&&Math.hypot(dx,dy)<7)return;g.moved=true;if(o.swipe&&o.swipe()){g.sw=dx;g.swy=dy;return}if(!o.enabled())return;S.px=clampP(g.px+dx*k/w);S.py=clampP(g.py+dy*k/h)}
    else{g.moved=true;if(!o.enabled())return;const d=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y),m={x:(a[0].x+a[1].x)/2,y:(a[0].y+a[1].y)/2},z=Math.min(4,Math.max(1,g.zoom*d/g.d)),f=z/g.zoom;
      const mx=(g.m.x-g.r.left)*k-w/2,my=(g.m.y-g.r.top)*k-h/2,mx2=(m.x-g.r.left)*k-w/2,my2=(m.y-g.r.top)*k-h/2;
      S.zoom=z;S.px=clampP((mx2-(mx-g.px*w)*f)/w);S.py=clampP((my2-(my-g.py*h)*f)/h)}
    posChanged()});
  const end=e=>{const tap=g&&!g.moved&&pts.size===1;pts.delete(e.pointerId);if(tap&&o.onTap)o.onTap();if(g&&g.sw!=null&&!pts.size&&Math.abs(g.sw)>40&&Math.abs(g.sw)>Math.abs(g.swy)&&o.onSwipe)o.onSwipe(g.sw<0?1:-1);if(pts.size)start();else g=null};
  cv.addEventListener('pointerup',e=>{end(e);if(!pts.size)recheck()});cv.addEventListener('pointercancel',e=>{pts.delete(e.pointerId);g=null});
  cv.addEventListener('wheel',e=>{if(!o.enabled())return;e.preventDefault();S.zoom=Math.min(4,Math.max(1,S.zoom*Math.exp(-e.deltaY*.0015)));posChanged()},{passive:false});
  if(o.dbl)cv.addEventListener('dblclick',()=>{if(o.enabled())resetPos()});
}
gestures(main,{enabled:()=>S.face==='front'||S.backStyle==='none',swipe:()=>S.step>=3&&S.step<=5,onSwipe:dir=>stepOpt(dir),onTap:()=>{if(S.step>=3&&S.step<=5)stepOpt(1)}});
gestures($('posCv'),{enabled:()=>true,dbl:true});
$('zoom').addEventListener('input',e=>{S.zoom=+e.target.value;posChanged()});
$('zIn').onclick=()=>{S.zoom=Math.min(4,S.zoom*1.15);posChanged()};$('zOut').onclick=()=>{S.zoom=Math.max(1,S.zoom/1.15);posChanged()};$('zReset').onclick=resetPos;
function stepDesign(dir){let i=S.designs.findIndex(x=>code(x)===code(S.design))+dir;if(i<0)i=0;
  if(i>=S.designs.length){const more=candSet(12,S.filter==='all'?null:LAYS.indexOf(S.filter));if(!more.length)more.push(...candSet(12,null));S.designs.push(...more);if(i>=S.designs.length)i=0;buildDesigns()}
  S.design=S.designs[i];mark();refreshMain();const b=document.querySelector('#dgrid .thumb.on');if(b&&window.innerWidth>=860)b.scrollIntoView({block:'nearest'})}
$('prevD').onclick=()=>stepOpt(-1);$('nextD').onclick=()=>stepOpt(1);
document.addEventListener('keydown',e=>{if(S.step<3||S.step>5||/INPUT|TEXTAREA/.test(document.activeElement.tagName))return;if(e.key==='ArrowRight')stepOpt(1);if(e.key==='ArrowLeft')stepOpt(-1)});

/* ---------- 写真の読み込みと切り抜き ---------- */
let orig=null,undo=[];
function toCanvas(img,max){const s=Math.min(1,max/Math.max(img.width,img.height)),c=document.createElement('canvas');c.width=Math.round(img.width*s);c.height=Math.round(img.height*s);c.getContext('2d').drawImage(img,0,0,c.width,c.height);return c}
function hasAlpha(c){const d=c.getContext('2d').getImageData(0,0,c.width,c.height).data;for(let i=3;i<d.length;i+=4*7)if(d[i]<245)return true;return false}
/* ---------- 顔の位置を調べる（端末の中だけ） ---------- */
let trkP=null;
function loadTracking(){if(trkP)return trkP;const add=src=>new Promise((res,rej)=>{const s=document.createElement('script');s.src=src;s.onload=res;s.onerror=rej;document.head.append(s)});
  trkP=add('https://cdn.jsdelivr.net/npm/tracking@1.1.3/build/tracking-min.js').then(()=>add('https://cdn.jsdelivr.net/npm/tracking@1.1.3/build/data/face-min.js'));trkP.catch(()=>{trkP=null});return trkP}
function headFromAlpha(img){const W=img.width,H=img.height,d=img.getContext('2d').getImageData(0,0,W,H).data,row=y=>{let a=-1,b=-1,n=0;for(let x=0;x<W;x+=2)if(d[(y*W+x)*4+3]>128){if(a<0)a=x;b=x;n++}return{a,b,n}};
  let y0=-1;for(let y=0;y<H;y+=2){if(row(y).n>W*.02/2){y0=y;break}}if(y0<0)return null;
  let y1=H-1;for(let y=H-1;y>y0;y-=4){if(row(y).n>0){y1=y;break}}const fh=y1-y0,st=Math.max(2,Math.round(fh/200)),rows=[];
  for(let y=y0;y<=y0+fh*.55;y+=st){const r=row(y);rows.push({y,w:r.n?r.b-r.a:0,c:(r.a+r.b)/2})}
  const early=rows.filter(r=>r.y<y0+fh*.14&&r.w>0).map(r=>r.w);if(!early.length)return null;const hw=Math.max(...early);
  let hb=y0+Math.min(fh*.4,W*.6);for(const r of rows){if(r.y>y0+fh*.08&&r.w>hw*1.55){hb=r.y;break}}
  const head=rows.filter(r=>r.y>=y0&&r.y<=hb&&r.w>0),ws=head.map(r=>r.w).sort((a,b)=>a-b),cs=head.map(r=>r.c).sort((a,b)=>a-b);if(!ws.length)return null;
  const fw=ws[ws.length>>1]*.8,cx=cs[cs.length>>1],top=y0+(hb-y0)*.28;return[{x:cx-fw/2,y:top,w:fw,h:(hb-top)*.95}]}
function guessFace(img){const W=img.width,H=img.height,fw=Math.min(W,H)*.34;return[{x:W/2-fw/2,y:H*.14,w:fw,h:fw*1.2}]}
async function detectFaces(){
  const img=orig;let faces=null;
  if(!S.userPhoto){S.faces=[{x:195,y:175,w:210,h:250}];afterFaces();return}
  try{await loadTracking();const t=new tracking.ObjectTracker('face');t.setInitialScale(2);t.setStepSize(1.6);t.setEdgesDensity(.1);
    const W=img.width,H=img.height,sc=Math.min(1,480/Math.max(W,H)),cv=document.createElement('canvas');cv.width=Math.round(W*sc);cv.height=Math.round(H*sc);const x=cv.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,cv.width,cv.height);x.drawImage(img,0,0,cv.width,cv.height);
    const id=x.getImageData(0,0,cv.width,cv.height);let found=[];t.on('track',e=>{found=e.data||[]});t.track(id.data,cv.width,cv.height);
    found.sort((a,b)=>b.width*b.height-a.width*a.height);faces=found.slice(0,3).filter(f=>f.width>cv.width*.06).map(f=>({x:f.x/sc,y:f.y/sc,w:f.width/sc,h:f.height/sc}))}catch(e){}
  if(!faces||!faces.length)faces=hasAlpha(img)?headFromAlpha(img):null;
  if(!faces||!faces.length){try{const r=autoMask(img);const mc=document.createElement('canvas');mc.width=r.w;mc.height=r.h;const mx=mc.getContext('2d'),id=mx.createImageData(r.w,r.h);for(let i=0;i<r.m.length;i++)id.data[i*4+3]=r.m[i];mx.putImageData(id,0,0);const hf=headFromAlpha(mc);if(hf&&hf[0]){const sx=img.width/r.w,sy=img.height/r.h;faces=hf.map(f=>({x:f.x*sx,y:f.y*sy,w:f.w*sx,h:f.h*sy}))}}catch(e){}}
  if(!faces||!faces.length)faces=guessFace(img);
  S.faces=faces;afterFaces();
}
function afterFaces(){if(!S.design)return;let li=S.filter==='all'?null:LAYS.indexOf(S.filter);if(li!=null&&!candSet(1,li).length){li=null;S.filter='all';chips.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x.textContent==='すべて'))}S.designs=S.designs.filter(designOK);if(S.designs.length<24)S.designs.push(...candSet(24-S.designs.length,li));if(!S.designs.some(x=>code(x)===code(S.design)))S.design=S.designs[0];rebuild()}
function setFront(c){orig=toCanvas(c,1400);S.img=toCanvas(orig,1400);S.cut=hasAlpha(S.img);undo=[];S.zoom=1;S.px=0;S.py=0;$('zoom').value=1;drawEd();rebuild();detectFaces()}
function readFile(f,cb){const rd=new FileReader();rd.onload=()=>{const im=new Image();im.onload=()=>cb(im);im.onerror=()=>{$('cutMsg').textContent='この画像は読み込めませんでした。JPGかPNGを選んでください。'};im.src=rd.result};rd.readAsDataURL(f)}
$('file').addEventListener('change',e=>{const f=e.target.files[0];if(f)readFile(f,im=>{S.userPhoto=true;setFront(im);$('file').closest('label').classList.add('compact');setTimeout(()=>$('posCv').scrollIntoView({behavior:'smooth',block:'center'}),150);$('cutMsg').textContent=S.cut?'背景が透明な画像を読み込みました。このまま使えます。':'「人物を自動で切り抜く」を押すと背景を消します。'})});
$('file2').addEventListener('change',e=>{const f=e.target.files[0];if(f)readFile(f,im=>{S.img2=toCanvas(im,1400);rebuild()})});
function prepLogo(im){const c=toCanvas(im,900),x=c.getContext('2d'),id=x.getImageData(0,0,c.width,c.height),p=id.data;
  if(!hasAlpha(c))for(let i=0;i<p.length;i+=4){const m=Math.min(p[i],p[i+1],p[i+2]);if(m>238)p[i+3]=0;else if(m>205)p[i+3]=Math.round(255*(238-m)/33)}
  let x0=c.width,y0=c.height,x1=-1,y1=-1;for(let y=0;y<c.height;y++)for(let k=0;k<c.width;k++)if(p[(y*c.width+k)*4+3]>20){if(k<x0)x0=k;if(k>x1)x1=k;if(y<y0)y0=y;if(y>y1)y1=y}
  x.putImageData(id,0,0);if(x1<0)return null;const o=document.createElement('canvas');o.width=x1-x0+1;o.height=y1-y0+1;o.getContext('2d').drawImage(c,-x0,-y0);return o}
function showLogo(){$('logoRow').hidden=!S.logo;if(!S.logo)return;const pv=$('logoPv');pv.width=S.logo.width;pv.height=S.logo.height;const x=pv.getContext('2d');x.clearRect(0,0,pv.width,pv.height);x.drawImage(S.logo,0,0)}
$('logoFile').addEventListener('change',e=>{const f=e.target.files[0];if(f)readFile(f,im=>{const l=prepLogo(im);for(const k in tintCache)delete tintCache[k];S.logo=l;showLogo();refreshMain()})});
$('logoTint').addEventListener('click',e=>{const t=e.target.dataset.t;if(!t)return;S.logoTint=t;[...$('logoTint').children].forEach(b=>b.classList.toggle('on',b.dataset.t===t));refreshMain()});
$('logoDel').onclick=()=>{S.logo=null;$('logoFile').value='';showLogo();refreshMain()};
/* ---------- ホスホスから読み取り（端末の中だけで処理） ---------- */
const HS_KEYS=['nameJa','nameEn','store','addr','tel','line','hours','insta','sns'];
function parseHosu(t){
  t=t.replace(/(?:[\u3000-\u30ff\u4e00-\u9fff\uff00-\uffef] ){2,}[\u3000-\u30ff\u4e00-\u9fff\uff00-\uffef]/g,m=>m.replace(/ /g,'')).replace(/[０-９]/g,c=>String.fromCharCode(c.charCodeAt(0)-65248)).replace(/[ー－‐]/g,m=>m);
  t=t.replace(/\r/g,'').replace(/[：]/g,':').replace(/[　]/g,' ');
  const lines=t.split('\n').map(x=>x.trim()).filter(Boolean),o={};
  const lab=(re)=>{for(let i=0;i<lines.length;i++){const m=lines[i].match(re);if(m){const rest=lines[i].slice(m.index+m[0].length).replace(/^[\s:|｜\-]+/,'').trim();return rest||(lines[i+1]||'')}}return ''};
  const find=(re,g=0)=>{const m=t.match(re);return m?(m[g]||'').trim():''};
  o.tel=find(/0\d{1,4}[-‐－ ]\d{1,4}[-‐－ ]\d{3,4}/);
  o.addr=find(/(?:東京都|北海道|京都府|大阪府|[^\s\d]{2,3}県)[^\n]{4,60}/).replace(/\s*(?:TEL|電話|☎).*$/i,'');
  o.hours=lab(/営業時間/)||find(/\d{1,2}:\d{2}\s*[〜~～\-]\s*(?:\d{1,2}:\d{2}|LAST|ラスト)/i);
  o.line=find(/LINE\s*(?:ID)?\s*:?\s*(@?[A-Za-z0-9._\-]{3,})/i,1);
  const ig=find(/instagram\.com\/([A-Za-z0-9._]+)/i,1)||find(/(?:Instagram|インスタ(?:グラム)?)\s*:?\s*(@?[A-Za-z0-9._]{2,})/i,1);o.insta=ig?(ig[0]==='@'?ig:'@'+ig):'';
  const tk=find(/tiktok\.com\/@?([A-Za-z0-9._]+)/i,1)||find(/TikTok\s*:?\s*(@?[A-Za-z0-9._]{2,})/i,1),xx=find(/(?:x|twitter)\.com\/([A-Za-z0-9_]+)/i,1)||find(/(?:^|\s)(?:X|Twitter|ツイッター)\s*:?\s*(@?[A-Za-z0-9_]{2,})/,1);
  o.sns=[tk?'TikTok '+(tk[0]==='@'?tk:'@'+tk):'',xx?'X '+(xx[0]==='@'?xx:'@'+xx):''].filter(Boolean).join(' / ');
  o.store=lab(/店舗名|店名|所属店舗|所属/)||(lines.find(x=>/^(?:CLUB|Club|club|クラブ)\s*\S+/.test(x)&&x.length<30)||'');
  const ROLE=/代表|取締役|幹部|補佐|主任|支配人|店長|リーダー|プロデューサー|マネージャー|部長|社長|会長|ディレクター|エグゼクティブ|プレイヤー|Producer|Director|Manager|Executive|Player|Owner|オーナー|GM|総支配人|副|統括|専務|常務/i;
  o.nameJa=lab(/源氏名|キャスト名|名前|ホスト名/)||(lines.find(x=>!ROLE.test(x)&&x.length<=12&&/[぀-ヿ一-鿿]/.test(x)&&!/[店区町市県都府:0-9@]|営業|時間|住所|電話|ランキング|プロフィール|ホスホス|求人|ログイン|メニュー|検索|ブログ|写真|動画|一覧|身長|血液|誕生|星座|趣味|役職|出身/.test(x))||'');
  const en=lines.find(x=>/^[A-Za-z][A-Za-z .'\-]{1,30}$/.test(x)&&x!==o.store&&!ROLE.test(x)&&!/^(?:CLUB|LINE|TEL|Instagram|TikTok|X|Twitter|HOME|MENU|LOGIN|NEW)\b/i.test(x));
  o.nameEn=en||'';
  return o;
}
/* スクショの文字読み取り（端末の中で動く文字認識） */
const TJS='https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/';
let tessP=null,tessLog=null;
function loadTess(){
  if(tessP)return tessP;
  tessP=new Promise((res,rej)=>{if(window.Tesseract)return res();const sc=document.createElement('script');sc.src=TJS+'tesseract.min.js';sc.onload=res;sc.onerror=rej;document.head.append(sc)})
    .then(()=>Promise.all(['jpn'].map(code=>fetch(new URL('tess/'+code+'.traineddata.wasm',location.href)).then(r=>{if(!r.ok)throw new Error('lang');return r.arrayBuffer()}).then(b=>({code,data:new Uint8Array(b)})))))
    .then(langs=>Tesseract.createWorker(langs,1,{workerPath:TJS+'worker.min.js',corePath:'https://cdn.jsdelivr.net/npm/tesseract.js-core@5.1.1',workerBlobURL:true,cacheMethod:'none',logger:m=>{if(tessLog)tessLog(m)}}));
  tessP.catch(()=>{tessP=null});return tessP;
}
function shotCanvas(im){const sc=Math.min(1,1300/im.width),c=document.createElement('canvas');c.width=Math.round(im.width*sc);c.height=Math.round(im.height*sc);const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);x.drawImage(im,0,0,c.width,c.height);return c}
function canWasm(){try{return typeof WebAssembly==='object'&&!!new WebAssembly.Module(Uint8Array.of(0,97,115,109,1,0,0,0))}catch(e){return false}}
/* 文字認識が使えない画面では、すぐにかんたん貼り付けに切り替える */
function pasteMode(files,why){
  busy(false);const v=$('hsView');v.innerHTML='';
  files.forEach(f=>{const im=document.createElement('img');im.alt='選んだスクショ';im.src=URL.createObjectURL(f);v.append(im)});v.hidden=!files.length;
  $('hsDetails').open=true;$('hsMsg').textContent=(why?why+' ':'')+'下のスクショの文字を長押し →「すべてを選択」→「コピー」して、その下の欄に貼り付けてください。貼り付けると自動で読み取ります。';
  setTimeout(()=>v.scrollIntoView({behavior:'smooth',block:'start'}),100);
}
$('hsShots').addEventListener('change',async e=>{
  const files=[...e.target.files],msg=$('hsMsg');e.target.value='';if(!files.length)return;
  if(!canWasm()){pasteMode(files,'この画面では自動の文字読み取りが使えません。');return}
  msg.textContent='文字の読み取りを準備中…';busy(true,'文字の読み取りを準備中…（初回のみ少し時間がかかります）');
  let worker;
  try{worker=await Promise.race([loadTess(),new Promise((_,rej)=>setTimeout(()=>rej(new Error('timeout')),25000))])}
  catch(err){pasteMode(files,err&&err.message==='timeout'?'読み取りの準備に時間がかかりすぎました。':'自動の文字読み取りを準備できませんでした。');return}
  let text='';
  for(let i=0;i<files.length;i++){
    tessLog=m=>{if(m.status==='recognizing text'){msg.textContent=`読み取り中… ${i+1}/${files.length}枚目 ${Math.round((m.progress||0)*100)}%`;busy(true,msg.textContent)}};
    try{const im=await new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>{const x=new Image();x.onload=()=>res(x);x.onerror=rej;x.src=r.result};r.readAsDataURL(files[i])});
      const {data}=await Promise.race([worker.recognize(shotCanvas(im)),new Promise((_,rej)=>setTimeout(()=>rej(new Error('slow')),45000))]);text+='\n'+(data&&data.text||'')}catch(err){}
  }
  tessLog=null;busy(false);
  if(!text.trim()){pasteMode(files,'文字を読み取れませんでした。');return}
  $('hsText').value=text.trim();applyHosu(text,msg);toast(msg.textContent.split('。')[0]);
});
$('hsText').addEventListener('paste',()=>setTimeout(()=>{const t=$('hsText').value;if(t.trim()){applyHosu(t,$('hsMsg'));toast($('hsMsg').textContent.split('。')[0])}},50));
function applyHosu(t,msg){
  const data=parseHosu(t);let n=0;
  HS_KEYS.forEach(k=>{const v=(data[k]||'').trim(),el=$(k);el.classList.remove('filled');if(v){el.value=v;S[k]=v;el.classList.add('filled');n++}else if(el.value===el.defaultValue){el.value='';S[k]=''}});
  if(n){if($('role').value===$('role').defaultValue){$('role').value='';S.role=''}
    const q=$('qr');if(!q.value||q.value===q.defaultValue||S.qrAuto){S.qrAuto=true;const l=S.line;q.value=l?(l[0]==='@'?'https://line.me/R/ti/p/'+l:'https://line.me/ti/p/~'+l):'';S.qr=q.value;if(l)q.classList.add('filled')}}
  refreshMain();msg.textContent=n?n+'項目を読み取りました（青い欄）。違う所は直してください。役職は自分で入力してください。':'読み取れる項目が見つかりませんでした。下の欄に手で入力してください。';
}
$('hsParse').onclick=()=>{const t=$('hsText').value,msg=$('hsMsg');if(!t.trim()){msg.textContent='先にスクショの文字を貼り付けてください。';return}applyHosu(t,msg)};
const ed=$('ed');
function drawEd(){if(!S.img)return;ed.width=S.img.width;ed.height=S.img.height;const x=ed.getContext('2d');x.clearRect(0,0,ed.width,ed.height);x.drawImage(S.img,0,0)}
function flood(seeds){
  const W=S.img.width,H=S.img.height,x=S.img.getContext('2d'),id=x.getImageData(0,0,W,H),p=id.data;
  pushUndo();
  const tol=+$('tol').value,t2=tol*tol*3,vis=new Uint8Array(W*H),st=new Int32Array(W*H);let removed=0;
  for(const s0 of seeds){if(vis[s0])continue;const i0=s0*4;const r0=p[i0],g0=p[i0+1],b0=p[i0+2];let sp=0;st[sp++]=s0;vis[s0]=1;
    while(sp){const k=st[--sp],i=k*4;if(p[i+3]!==0){const dr=p[i]-r0,dg=p[i+1]-g0,db=p[i+2]-b0;if(dr*dr+dg*dg+db*db>t2)continue;p[i+3]=0;removed++}
      const px=k%W,py=(k/W)|0;
      if(px>0&&!vis[k-1]){vis[k-1]=1;st[sp++]=k-1}if(px<W-1&&!vis[k+1]){vis[k+1]=1;st[sp++]=k+1}
      if(py>0&&!vis[k-W]){vis[k-W]=1;st[sp++]=k-W}if(py<H-1&&!vis[k+W]){vis[k+W]=1;st[sp++]=k+W}}}
  /* 境目をなめらかに */
  for(let y=1;y<H-1;y++)for(let x2=1;x2<W-1;x2++){const k=y*W+x2,i=k*4;if(p[i+3]===255&&(p[i-1]===0||p[i+7]===0||p[i-4*W+3]===0||p[i+4*W+3]===0))p[i+3]=150}
  x.putImageData(id,0,0);S.cut=true;drawEd();refreshMain();
  $('cutMsg').textContent=removed?'消しました。消しすぎたら「1つ戻す」か「戻すブラシ」で直せます。':'消える部分がありませんでした。「色で消す範囲」を大きくしてもう一度試してください。';
}
let edMode=null,cvP=null,strokeOn=null;
$('edMode').addEventListener('click',e=>{const m=e.target.dataset.m;if(!m)return;edMode=m;[...$('edMode').children].forEach(b=>b.classList.toggle('on',b.dataset.m===m));$('tolRow').hidden=m!=='tap';$('brushRow').hidden=m==='tap'});
function edPos(e){const r=ed.getBoundingClientRect();return[(e.clientX-r.left)/r.width*S.img.width,(e.clientY-r.top)/r.height*S.img.height]}
function pushUndo(){const x=S.img.getContext('2d');undo.push(x.getImageData(0,0,S.img.width,S.img.height));if(undo.length>8)undo.shift()}
function dab(x0,y0,x1,y1){
  const x=S.img.getContext('2d'),rad=(+$('brush').value)/100*Math.max(S.img.width,S.img.height)*.12+2;
  const n=Math.max(1,Math.ceil(Math.hypot(x1-x0,y1-y0)/(rad*.3)));
  for(let i=0;i<=n;i++){const px=x0+(x1-x0)*i/n,py=y0+(y1-y0)*i/n;
    x.save();x.beginPath();x.arc(px,py,rad,0,Math.PI*2);x.clip();
    if(edMode==='erase'){x.globalCompositeOperation='destination-out';const g=x.createRadialGradient(px,py,rad*.55,px,py,rad);g.addColorStop(0,'rgba(0,0,0,1)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(px-rad,py-rad,rad*2,rad*2)}
    else{x.clearRect(px-rad,py-rad,rad*2,rad*2);x.drawImage(orig,0,0,S.img.width,S.img.height)}
    x.restore()}
}
ed.addEventListener('pointerdown',e=>{if(!S.img)return;if(!edMode){$('cutMsg').textContent='直すときは、下の「消しゴム」か「戻すブラシ」を選んでから、写真をなぞってください。写真の位置は上の名刺の見本で動かします。';return}const [x,y]=edPos(e);
  if(edMode==='tap'){const ix=Math.floor(x),iy=Math.floor(y);if(ix>=0&&iy>=0&&ix<S.img.width&&iy<S.img.height)flood([iy*S.img.width+ix]);return}
  pushUndo();strokeOn=[x,y];ed.setPointerCapture(e.pointerId);dab(x,y,x,y);drawEd()});
ed.addEventListener('pointermove',e=>{if(!strokeOn)return;const [x,y]=edPos(e);dab(strokeOn[0],strokeOn[1],x,y);strokeOn=[x,y];drawEd()});
const endStroke=()=>{if(!strokeOn)return;strokeOn=null;S.cut=true;refreshMain()};
ed.addEventListener('pointerup',endStroke);ed.addEventListener('pointercancel',endStroke);
/* 自動切り抜き：外部のプログラムを使わず、この端末の中だけで計算する */
function autoMask(img){
  const W=img.width,H=img.height,sc=Math.min(1,260/Math.max(W,H)),w=Math.max(8,Math.round(W*sc)),h=Math.max(8,Math.round(H*sc)),N=w*h;
  const cv=document.createElement('canvas');cv.width=w;cv.height=h;const x=cv.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,w,h);x.drawImage(img,0,0,w,h);
  const d=x.getImageData(0,0,w,h).data,R=new Float32Array(N),G=new Float32Array(N),B=new Float32Array(N);for(let i=0;i<N;i++){R[i]=d[i*4];G[i]=d[i*4+1];B[i]=d[i*4+2]}
  let A=null;if(hasAlpha(img)){const ac=document.createElement('canvas');ac.width=w;ac.height=h;const ax=ac.getContext('2d');ax.drawImage(img,0,0,w,h);const ad=ax.getImageData(0,0,w,h).data;A=new Uint8Array(N);for(let i=0;i<N;i++)A[i]=ad[i*4+3]}
  const hard=new Uint8Array(N);let lab=new Uint8Array(N);
  for(let y=0;y<h;y++)for(let xx=0;xx<w;xx++){const i=y*w+xx,cx=Math.abs(xx/w-.5);
    if(xx<w*.03||xx>w*.97||y<h*.03||(A&&A[i]<20))hard[i]=1;
    lab[i]=!hard[i]&&((y>h*.14&&cx<.26)||(y>h*.55&&cx<.36))?1:0}
  const kmeans=(idx,K)=>{const n=idx.length;if(!n)return[];const C=[];for(let k=0;k<K;k++){const j=idx[Math.floor((k+.5)/K*n)];C.push([R[j],G[j],B[j]])}
    for(let it=0;it<6;it++){const S=C.map(()=>[0,0,0,0]);for(const j of idx){let bk=0,bd=1e12;for(let k=0;k<K;k++){const a=R[j]-C[k][0],b=G[j]-C[k][1],c=B[j]-C[k][2],dd=a*a+b*b+c*c;if(dd<bd){bd=dd;bk=k}}const s=S[bk];s[0]+=R[j];s[1]+=G[j];s[2]+=B[j];s[3]++}
      S.forEach((s,k)=>{if(s[3])C[k]=[s[0]/s[3],s[1]/s[3],s[2]/s[3]]})}return C};
  const near=(C,i)=>{let bd=1e12;for(const c of C){const a=R[i]-c[0],b=G[i]-c[1],e=B[i]-c[2],dd=a*a+b*b+e*e;if(dd<bd)bd=dd}return bd};
  /* 人物がいそうな位置（顔が見つかっていればそれを基準に） */
  let fx=.5*w,fy=.25*h,fr=.17*w;if(S.faces&&S.faces[0]){const f=S.faces[0];fx=(f.x+f.w/2)*w/W;fy=(f.y+f.h/2)*h/H;fr=Math.max(.08*w,f.w*w/W*.62)}
  const PR=new Float32Array(N);for(let y=0;y<h;y++)for(let xx=0;xx<w;xx++){const i=y*w+xx;const hx=(xx-fx)/(fr*1.15),hy=(y-fy)/(fr*1.5);let pr=hx*hx+hy*hy<1?.9:.15;
    const top=fy+fr*1.1;if(y>top){const half=fr*1.6+(y-top)*.55;if(Math.abs(xx-fx)<half)pr=.85}PR[i]=pr}
  {const T=new Float32Array(N);for(let r=0;r<3;r++){for(let y=0;y<h;y++)for(let xx=0;xx<w;xx++){let s2=0,n=0;for(let dy=-2;dy<=2;dy++)for(let dx=-2;dx<=2;dx++){const yy=y+dy,x2=xx+dx;if(yy<0||x2<0||yy>=h||x2>=w)continue;s2+=PR[yy*w+x2];n++}T[y*w+xx]=s2/n}PR.set(T)}}
  for(let i=0;i<N;i++)lab[i]=!hard[i]&&PR[i]>.6?1:0;
  const lg=v=>Math.log(Math.max(1e-4,v)/Math.max(1e-4,1-v));
  let P=new Float32Array(N);const sig2=2*22*22;
  for(let pass=0;pass<4;pass++){
    const fi=[],bi=[],st=Math.max(1,Math.floor(N/9000));for(let i=0;i<N;i+=st){(lab[i]&&!hard[i]?fi:bi).push(i)}
    const CF=kmeans(fi,6),CB=kmeans(bi,7);if(!CF.length||!CB.length)break;
    for(let i=0;i<N;i++){if(hard[i]){P[i]=0;continue}const f=near(CF,i),b=near(CB,i),pc=Math.min(.98,Math.max(.02,b/(b+f+1e-6)));P[i]=1/(1+Math.exp(-(lg(pc)+1.15*lg(PR[i]))))}
    for(let s=0;s<3;s++){const Q=new Float32Array(N);for(let y=0;y<h;y++)for(let xx=0;xx<w;xx++){const i=y*w+xx;let sw=1,sp=P[i];
      for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){if(!dx&&!dy)continue;const yy=y+dy,x2=xx+dx;if(yy<0||x2<0||yy>=h||x2>=w)continue;const j=yy*w+x2,a=R[i]-R[j],b=G[i]-G[j],c=B[i]-B[j],wt=Math.exp(-(a*a+b*b+c*c)/sig2);sw+=wt;sp+=wt*P[j]}
      Q[i]=hard[i]?0:sp/sw}P=Q}
    for(let i=0;i<N;i++)lab[i]=P[i]>.5?1:0;
  }
  /* 人物（下の真ん中につながるかたまり）だけ残し、中の穴を埋める */
  const comp=new Int32Array(N).fill(-1),stack=new Int32Array(N);let best=-1,bestScore=-1,cid=0;
  for(let i=0;i<N;i++){if(!lab[i]||comp[i]>=0)continue;let sp=0,area=0,bottom=0;stack[sp++]=i;comp[i]=cid;
    while(sp){const k=stack[--sp];area++;const y=(k/w)|0,xx=k%w;if(y>h*.85&&Math.abs(xx/w-.5)<.3)bottom++;
      const nb=[xx>0?k-1:-1,xx<w-1?k+1:-1,y>0?k-w:-1,y<h-1?k+w:-1];for(const j of nb)if(j>=0&&lab[j]&&comp[j]<0){comp[j]=cid;stack[sp++]=j}}
    const score=area+bottom*20;if(score>bestScore){bestScore=score;best=cid}cid++}
  const keep=new Uint8Array(N);for(let i=0;i<N;i++)keep[i]=comp[i]===best?1:0;
  const outside=new Uint8Array(N);let sp=0;for(let i=0;i<N;i++){const y=(i/w)|0,xx=i%w;if((y===0||xx===0||xx===w-1)&&!keep[i]){outside[i]=1;stack[sp++]=i}}
  while(sp){const k=stack[--sp],y=(k/w)|0,xx=k%w;const nb=[xx>0?k-1:-1,xx<w-1?k+1:-1,y>0?k-w:-1,y<h-1?k+w:-1];for(const j of nb)if(j>=0&&!keep[j]&&!outside[j]){outside[j]=1;stack[sp++]=j}}
  const m=new Uint8Array(N);let fg=0;for(let i=0;i<N;i++){const on=keep[i]||!outside[i];if(on){fg++;m[i]=255}}
  return{m,w,h,fg};
}
$('cutAI').onclick=async()=>{
  const msg=$('cutMsg'),btn=$('cutAI');btn.disabled=true;msg.textContent='人物を探しています…';busy(true,'人物を切り抜いています…');
  await new Promise(r=>setTimeout(r,40));
  try{
    const W=orig.width,H=orig.height,{m,w,h,fg}=autoMask(orig);if(fg<w*h*.04)throw new Error('small');
    const mc=document.createElement('canvas');mc.width=w;mc.height=h;const mx=mc.getContext('2d'),id=mx.createImageData(w,h);for(let i=0;i<m.length;i++)id.data[i*4+3]=m[i];mx.putImageData(id,0,0);
    pushUndo();const x=S.img.getContext('2d');x.save();x.clearRect(0,0,W,H);x.drawImage(orig,0,0);x.globalCompositeOperation='destination-in';x.imageSmoothingQuality='high';
    try{x.filter='blur('+Math.max(1.2,W/w*.7).toFixed(1)+'px)'}catch(e){}x.drawImage(mc,0,0,W,H);x.restore();
    S.cut=true;drawEd();afterFaces();
    msg.textContent='切り抜きました。直したい所があれば「消しゴム」か「戻すブラシ」を選んでなぞってください。';
  }catch(e){msg.textContent='人物をうまく見つけられませんでした。消しゴムで背景をなぞって消してください。'}
  finally{btn.disabled=false;busy(false)}
};
function setModeErase(){edMode='erase';[...$('edMode').children].forEach(b=>b.classList.toggle('on',b.dataset.m==='erase'));$('tolRow').hidden=true;$('brushRow').hidden=false}
$('cutUndo').onclick=()=>{const d=undo.pop();if(!d){$('cutMsg').textContent='戻せる操作はありません。';return}S.img.getContext('2d').putImageData(d,0,0);S.cut=hasAlpha(S.img);drawEd();refreshMain()};
$('cutReset').onclick=()=>{const x=S.img.getContext('2d');x.clearRect(0,0,S.img.width,S.img.height);x.drawImage(orig,0,0);undo=[];S.cut=hasAlpha(S.img);drawEd();refreshMain();$('cutMsg').textContent='元の写真に戻しました。'};
$('cutShow').onclick=()=>{showOut('切り抜き画像',[['背景が透明なPNG',S.img.toDataURL('image/png')]])};

/* ---------- 書き出し ---------- */
function showOut(title,list){$('mTitle').textContent=title;const o=$('outs');o.innerHTML='';
  list.forEach(([cap,url])=>{const f=document.createElement('figure'),im=document.createElement('img'),fc=document.createElement('figcaption');im.src=url;im.alt=cap;im.className='chk';fc.textContent=cap;f.append(im,fc);
    const b=document.createElement('button');b.type='button';b.className='btn';b.textContent=cap+'を保存';b.hidden=true;
    b.onclick=async()=>{try{const dl=await claude.use('downloads');if(!dl)throw 0;const blob=await (await fetch(url)).blob();const r=await dl.save({filename:'meishi-'+(cap==='表'?'front':cap==='裏'?'back':'image')+'.png',data:blob});if(r&&r.status==='saved')toast('保存しました')}catch(e){toast('この画面では保存できません。画像を長押しして保存してください')}};
    f.append(b);o.append(f);
    (async()=>{try{if(window.claude&&await claude.use('downloads'))b.hidden=false}catch(e){}})()});
  $('modal').hidden=false}
$('export').onclick=()=>{const list=[];const a=document.createElement('canvas');renderCard(a,S.design,S.mat,1,'front');list.push(['表',a.toDataURL('image/png')]);
  if(S.backStyle!=='none'){const b=document.createElement('canvas');renderCard(b,S.design,S.mat,1,'back');list.push(['裏',b.toDataURL('image/png')])}showOut('書き出し完了',list)};
$('close').onclick=()=>$('modal').hidden=true;
$('copy').onclick=()=>{const t=$('memo').value,sel=()=>{$('memo').select();$('copyMsg').textContent='選択しました。コピーしてください'};
  try{navigator.clipboard.writeText(t).then(()=>{$('copyMsg').textContent='コピーしました';toast('注文メモをコピーしました')},sel)}catch(e){sel()}};

/* ---------- 開始 ---------- */
/* ---------- 途中保存（この端末だけ） ---------- */
const SKEY='meishi-maker-v1';let saveT=0,restoring=false;
function save(){if(restoring)return;clearTimeout(saveT);saveT=setTimeout(()=>{if(!restoring)saveCore()},700)}
function saveCore(){try{
  const o={f:Object.fromEntries(FIELDS.map(k=>[k,S[k]])),design:code(S.design),keep:S.keep.map(code),mat:S.mat,clearA:S.clearA,back:S.backStyle,inv:S.backInv,orient:S.orient,zoom:S.zoom,px:S.px,py:S.py,reached,logoTint:S.logoTint,userPhoto:S.userPhoto};
  localStorage.setItem(SKEY,JSON.stringify(o));
  try{if(S.userPhoto){localStorage.setItem(SKEY+'-photo',orig.toDataURL('image/jpeg',.85));if(S.cut)localStorage.setItem(SKEY+'-cut',S.img.toDataURL('image/png'));else localStorage.removeItem(SKEY+'-cut')}}catch(e){}
  try{if(S.logo)localStorage.setItem(SKEY+'-logo',S.logo.toDataURL('image/png'));else localStorage.removeItem(SKEY+'-logo')}catch(e){}
}catch(e){}}
addEventListener('pagehide',()=>{clearTimeout(saveT);if(!restoring){restoring=false;saveNow()}});document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')saveNow()});
function saveNow(){if(restoring)return;clearTimeout(saveT);saveCore()}
function loadImg(src){return new Promise((res,rej)=>{const im=new Image();im.onload=()=>res(im);im.onerror=rej;im.src=src})}
async function restore(){
  let o=null;try{o=JSON.parse(localStorage.getItem(SKEY)||'null')}catch(e){}
  if(!o)return false;restoring=true;
  try{
    FIELDS.forEach(k=>{if(o.f&&k in o.f){$(k).value=o.f[k]||'';S[k]=o.f[k]||''}});
    S.mat=o.mat||'paper';S.clearA=o.clearA??.3;$('clearA').value=Math.round(S.clearA*100);S.backStyle=o.back||'panel';S.backInv=!!o.inv;S.logoTint=o.logoTint||'ink';
    if(o.orient){S.orient=o.orient;[...$('orient').children].forEach(b=>b.classList.toggle('on',b.dataset.o===S.orient))}
    [...$('logoTint').children].forEach(b=>b.classList.toggle('on',b.dataset.t===S.logoTint));
    reached=o.reached||1;
    const lg=localStorage.getItem(SKEY+'-logo');if(lg){const c=document.createElement('canvas'),im=await loadImg(lg);c.width=im.width;c.height=im.height;c.getContext('2d').drawImage(im,0,0);S.logo=c;showLogo()}
    const ph=o.userPhoto&&localStorage.getItem(SKEY+'-photo');
    if(ph){const im=await loadImg(ph);S.userPhoto=true;setFront(im);const ct=localStorage.getItem(SKEY+'-cut');if(ct){const c=await loadImg(ct);const x=S.img.getContext('2d');x.clearRect(0,0,S.img.width,S.img.height);x.drawImage(c,0,0,S.img.width,S.img.height);S.cut=true;drawEd()}}
    S.zoom=o.zoom||1;S.px=o.px||0;S.py=o.py||0;$('zoom').value=S.zoom;
    S.keep=(o.keep||[]).map(parseCode).filter(Boolean);
    const d=o.design&&parseCode(o.design);if(d){S.design=d;S.designs=[d,...S.designs.filter(x=>code(x)!==code(d))].slice(0,24)}
  }catch(e){}
  restoring=false;return true;
}
$('resetAll').onclick=()=>{try{[SKEY,SKEY+'-photo',SKEY+'-cut',SKEY+'-logo'].forEach(k=>localStorage.removeItem(k))}catch(e){}location.reload()};
S.designs=randomSet(24);S.design=S.designs[0];
setFront(placeholder());
go(0);
restore().then(ok=>{if(ok){rebuild();renderHome()}});
Promise.all(['800 20px "Shippori Mincho B1"','600 20px "Shippori Mincho B1"','400 20px "Great Vibes"','700 20px "Cormorant Garamond"','700 20px "Zen Kaku Gothic New"','900 20px "Zen Kaku Gothic New"','400 20px "Anton"','700 20px "Playfair Display"','italic 600 20px "Playfair Display"','400 20px "Yuji Syuku"'].map(f=>document.fonts.load(f,'名刺Aa'))).then(rebuild).catch(()=>{});

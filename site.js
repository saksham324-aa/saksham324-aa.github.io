/* Shared by every page: editor chrome, nav, lightbox, playing videos, and the scroll-driven 3D pieces. */
const C = window.CONTACT || {};
const STYLES=[
 {n:"01",k:"s1",t:"Margin Notes",glow:"#2D4CF5",tags:["reels"],for:"For · everyday talking-head reels",
  d:"Your face carries the reel. Clean explainer cards build on your words: a flow chart, a meter that fills, a number that counts up. Keywords get a highlighter swipe.",
  l:["Cards sit below the chin, never on the face","Number stamps count up on the spoken number","Paper-flip transitions hide location changes"]},
 {n:"02",k:"s2",t:"Yap",glow:"#E8141C",tags:["reels","motion"],for:"For · reels with big lines worth shouting",
  d:"Talking head that cuts to full-screen type on the key lines: stacked italic words land one by one, numbers fill meters, every scene carries into the next.",
  l:["Paper & Night grounds switch with the mood","One accent colour does all the work","Circle reveals and carry transitions"]},
 {n:"03",k:"s3",t:"Trailer",glow:"#9BC31A",wide:true,tags:["trailers"],for:"For · episode launches & podcast trailers",
  d:"Widescreen trailers cut to the music's beat: a cold-open question, bass hits on the big words, B-roll and a cliffhanger cut to black.",
  l:["Multicam podcasts synced to the frame","Every cut lands on a beat","Bass-heavy launch sound"]},
 {n:"04",k:"s4",t:"Still Life",glow:"#C99A3B",tags:["nocam","motion"],for:"For · voice-only reels, no camera needed",
  d:"Send just a voice note. Every picture is built: one photo-real object per sentence as a visual metaphor, editorial type, a new world every two seconds.",
  l:["Packed first 3 seconds so nobody scrolls","Dark and light worlds alternate","Objects made for your script"]},
 {n:"05",k:"s5",t:"Live Edit",glow:"#3D5BFF",tags:["reels","motion"],for:"For · explainers that need to be watched",
  d:"Looks like it's being designed live: gradient keywords, selection boxes, a cursor, counter cards and charts. About 70% motion graphics, 30% your face.",
  l:["App-style cards act out each idea","Scenes chain into each other","Recolours to any brand palette"]},
 {n:"06",k:"s6",t:"Orbit",glow:"#8A5CFF",tags:["podcast","motion"],for:"For · podcast & stage clips, one seated shot",
  d:"The guest is cut out onto a studio. Big keywords sit behind the head, 3D cards fly in beside them, and a hologram ring orbits the body.",
  l:["Depth: graphics in front and behind","Camera push, punch and pull-back","Turns one locked shot into a scene"]},
];
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const PAGE=document.body.dataset.page||'home';
const vid=k=>`<video src="media/${k}-loop.mp4" poster="media/${k}-poster.jpg" muted loop playsinline preload="none"></video>`;
const bookHref=()=>C.form||'contact.html#book';

/* ---------- chrome, nav, timeline, lightbox, footer ---------- */
const NAV=[["styles","Styles"],["work","Work"],["about","About"],["contact","Contact"]];
document.body.insertAdjacentHTML('afterbegin',`
<div class="chrome mono">
  <a class="rec home" href="index.html">REC · ${C.name||''}</a>
  <span id="tc">00:00:00:00</span>
  <button class="burger mono" id="burger">Menu</button>
  <nav class="navlinks" id="nav">${NAV.map(([p,l])=>`<a href="${p}.html"${PAGE===p?' class="on"':''}>${l}</a>`).join('')}<a class="navcta" data-book>Book a call</a></nav>
</div>
<div class="tl"><div class="ruler"></div><div class="bar"><div class="fill" id="tlfill"></div></div><div class="head" id="tlhead"></div></div>`);
document.body.insertAdjacentHTML('beforeend',`
<footer class="mono">© 2026 ${C.name||''} · ${C.role||''}<br><span style="text-transform:none;letter-spacing:.04em;opacity:.7">Orbit sample footage: <a href="https://www.youtube.com/watch?v=D_UU8Mty6u8" target="_blank" rel="noopener" style="text-decoration:underline">"Fireside Chat", Resilience Conference</a> (CC BY)</span></footer>
<div class="lb" id="lb"><span class="cap mono" id="lbcap"></span><span class="x mono" id="lbx">✕ Close</span><video id="lbv" controls playsinline></video></div>`);
$('#burger').onclick=()=>$('#nav').classList.toggle('open');

/* every "Book" button goes to the Google Form (new tab), or the contact page until a form link is set */
$$('[data-book]').forEach(a=>{a.href=bookHref();if(C.form){a.target='_blank';a.rel='noopener'}});
$$('[data-name]').forEach(e=>e.textContent=C.name||'');
$$('[data-initials]').forEach(e=>e.textContent=C.initials||'');
$$('[data-email]').forEach(e=>{e.textContent=C.email||''});

/* lightbox: full clip with sound */
function openLB(i){const s=STYLES[i];$('#lbcap').textContent=`Style ${s.n} · ${s.t}`;const v=$('#lbv');v.src=`media/${s.k}-full.mp4`;$('#lb').classList.add('open');v.play().catch(()=>{});}
function closeLB(){const v=$('#lbv');v.pause();v.removeAttribute('src');v.load();$('#lb').classList.remove('open');}
$('#lbx').onclick=closeLB;$('#lb').onclick=e=>{if(e.target.id==='lb')closeLB()};addEventListener('keydown',e=>{if(e.key==='Escape')closeLB()});

/* ---------- builders for page sections (each runs only if its container exists) ---------- */
// work grid (+ filters on the work page)
const grid=$('#grid');
if(grid){
  const n=+(grid.dataset.limit||STYLES.length);
  grid.innerHTML=STYLES.slice(0,n).map((s,i)=>`<div class="card reveal" data-i="${i}" data-tags="${s.tags.join(' ')}">${vid(s.k)}<div class="play"></div><div class="meta"><div class="mono">Style ${s.n}</div><h4>${s.t}</h4><span>${s.for.replace('For · ','')}</span></div></div>`).join('');
  $$('.card').forEach(c=>{c.onclick=()=>openLB(+c.dataset.i);
    c.onpointermove=e=>{const r=c.getBoundingClientRect();c.style.setProperty('--ry',((e.clientX-r.left)/r.width-.5)*10+'deg');c.style.setProperty('--rx',-((e.clientY-r.top)/r.height-.5)*10+'deg')};
    c.onpointerleave=()=>{c.style.setProperty('--ry','0deg');c.style.setProperty('--rx','0deg')}});
  $$('.filters button').forEach(b=>b.onclick=()=>{$$('.filters button').forEach(x=>x.classList.toggle('on',x===b));const f=b.dataset.f;
    $$('.card').forEach(c=>c.classList.toggle('hide',f!=='all'&&!c.dataset.tags.includes(f)))});
}
// style detail rows (styles page)
const rows=$('#rows');
if(rows){
  rows.innerHTML=STYLES.map((s,i)=>`<div class="srow" id="style-${s.n}">
    <div class="smedia reveal"><div class="phone${s.wide?' land':''}" data-i="${i}">${vid(s.k)}</div></div>
    <div class="reveal"><span class="num disp">${s.n}</span><h3 class="disp">${s.t}</h3><div class="for mono">${s.for}</div><p>${s.d}</p>
      <ul>${s.l.map(x=>`<li>${x}</li>`).join('')}</ul><button class="watch mono" data-i="${i}">▶ Watch with sound</button></div></div>`).join('');
  $$('#rows [data-i]').forEach(e=>e.onclick=()=>openLB(+e.dataset.i));
  $$('.smedia').forEach(m=>{const p=m.querySelector('.phone');
    m.onpointermove=e=>{const r=m.getBoundingClientRect();p.style.setProperty('--ry',((e.clientX-r.left)/r.width-.5)*24+'deg');p.style.setProperty('--rx',-((e.clientY-r.top)/r.height-.5)*16+'deg')};
    m.onpointerleave=()=>{p.style.removeProperty('--ry');p.style.removeProperty('--rx')}});
}
// contact cards (contact page)
const ICON={
 email:'<path d="M3 6h18v12H3z M3 6l9 7 9-7" fill="none" stroke="#FF3B2F" stroke-width="2" stroke-linejoin="round"/>',
 whatsapp:'<path d="M4 20l1.3-4A8 8 0 1 1 8.3 19z" fill="none" stroke="#25D366" stroke-width="2" stroke-linejoin="round"/><path d="M9 9c0 3 3 6 6 6l1-1.5-2-1-1 1c-1-.5-2-1.5-2.5-2.5l1-1-1-2z" fill="#25D366"/>',
 phone:'<path d="M5 3h4l2 5-3 2a11 11 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z" fill="none" stroke="#FFE14D" stroke-width="2" stroke-linejoin="round"/>',
 instagram:'<rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="#E1306C" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="#E1306C" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.2" fill="#E1306C"/>',
 linkedin:'<rect x="3" y="3" width="18" height="18" rx="3" fill="none" stroke="#3D8BFF" stroke-width="2"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" stroke="#3D8BFF" stroke-width="2" stroke-linecap="round"/>',
 location:'<path d="M12 21s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12z" fill="none" stroke="#8D8B97" stroke-width="2"/><circle cx="12" cy="9" r="2.5" fill="#8D8B97"/>',
};
const cg=$('#cgrid');
if(cg){
  const handle=u=>u.replace(/^https?:\/\/(www\.)?/,'').replace(/\/$/,'');
  const items=[
    C.email&&['email','Email',C.email,`mailto:${C.email}?subject=Video%20edit%20enquiry`],
    C.whatsapp&&['whatsapp','WhatsApp','Chat on WhatsApp',`https://wa.me/${C.whatsapp.replace(/\D/g,'')}?text=${encodeURIComponent('Hi '+(C.name||'')+', I saw your portfolio and want to talk about an edit.')}`],
    C.phone&&['phone','Phone',C.phone,`tel:${C.phone.replace(/[^\d+]/g,'')}`],
    C.instagram&&['instagram','Instagram',handle(C.instagram).replace('instagram.com/','@'),C.instagram],
    C.linkedin&&['linkedin','LinkedIn',handle(C.linkedin).replace('linkedin.com/in/',''),C.linkedin],
    C.location&&['location','Based in',C.location,null],
  ].filter(Boolean);
  cg.innerHTML=items.map(([ic,k,v,h])=>`<${h?`a href="${h}"${h.startsWith('http')?' target="_blank" rel="noopener"':''}`:'div'} class="ccard reveal">
    <span class="ic"><svg viewBox="0 0 24 24">${ICON[ic]}</svg></span><span><span class="k mono">${k}</span><span class="v" style="display:block">${v}</span></span>${h?'<span class="go">↗</span>':''}</${h?'a':'div'}>`).join('');
}

/* ---------- hero: ring of film frames orbiting the phone ---------- */
const ring=$('#ring'), orbitEl=$('#orbit');
let frs=[];
const R=()=>Math.min(320,Math.max(orbitEl.clientWidth*.56,180));
if(ring){
  ["s1a","s2c","s3a","s4c","s5b","s6c","s1c","s4f","s5d","s6d","s4e","s3c"].forEach(t=>{const d=document.createElement('div');d.className='fr';d.innerHTML=`<img src="media/t-${t}.jpg" alt="">`;ring.appendChild(d)});
  frs=[...ring.children];
  const place=()=>frs.forEach((f,i)=>{f.style.transform=`rotateY(${i*360/frs.length}deg) translateZ(${R()}px)`});
  place();addEventListener('resize',place);
}
let mx=0,my=0;addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});

/* ---------- 3D carousel: six slots on a cylinder ---------- */
const cyl=$('#cyl'),N=STYLES.length,STEP=360/N;
let slots=[],dots=[],active=-1;
const CR=()=>innerWidth<900?Math.min(300,innerWidth*.62):Math.min(470,innerWidth*.27);
const PW=()=>innerWidth<900?Math.min(170,innerWidth*.36):Math.min(250,innerWidth*.15);
function setActive(i){if(i===active)return;const first=active<0;active=i;const s=STYLES[i];const sw=$('#cswap');sw.classList.add('out');
  setTimeout(()=>{$('#ctitle').textContent=s.t;$('#cfor').textContent=s.for;$('#cdesc').textContent=s.d;$('#clist').innerHTML=s.l.map(x=>`<li>${x}</li>`).join('');sw.classList.remove('out')},first?0:200);
  $('#cnum').textContent=s.n;$('#cglow').style.background=s.glow;dots.forEach((d,j)=>d.classList.toggle('on',j===i));$('#cwatch').onclick=()=>openLB(i);}
if(cyl){
  STYLES.forEach((s,i)=>{const d=document.createElement('div');d.className='slot'+(s.wide?' wide':'');
    d.innerHTML=`<div class="phone${s.wide?' land':''}">${vid(s.k)}</div><div class="lbl mono">${s.n} · ${s.t}</div>`;d.onclick=()=>openLB(i);cyl.appendChild(d);
    $('#dots').appendChild(document.createElement('i'))});
  slots=[...cyl.children];dots=[...$('#dots').children];
  const place=()=>slots.forEach((s,i)=>{s.style.setProperty('--pw',PW()+'px');s.style.transform=`rotateY(${i*STEP}deg) translateZ(${CR()}px)`});
  place();addEventListener('resize',place);setActive(0);
}

/* ---------- process waveform ---------- */
const wave=$('#wave');let bars=[];const clips=$$('.clip');
if(wave){let seed=7;const rnd=()=>(seed=(seed*9301+49297)%233280)/233280;
  for(let i=0;i<120;i++){const env=.3+.7*Math.abs(Math.sin(i/9))*(.6+.4*Math.sin(i/3.3));const b=document.createElement('i');b.style.height=Math.max(6,70*env*(.4+.6*rnd()))+'px';wave.appendChild(b)}
  bars=[...wave.children];}

/* ---------- play videos only while on screen; reveal + count-up ---------- */
const vio=new IntersectionObserver(es=>es.forEach(e=>{const v=e.target;if(e.isIntersecting){v.preload='auto';v.play().catch(()=>{})}else v.pause()}),{threshold:.15});
$$('video[loop]').forEach(v=>{v.muted=true;vio.observe(v)});
const rio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');rio.unobserve(e.target)}}),{threshold:.12});
$$('.reveal').forEach(el=>rio.observe(el));
$$('[data-count]').forEach(b=>{const n=+b.dataset.count,suf=b.dataset.suffix||'';let f=0;const t=setInterval(()=>{f++;b.textContent=Math.round(n*Math.min(1,f/24))+(f>=24?suf:'');if(f>=24)clearInterval(t)},40)});

/* ---------- one loop drives everything that moves with scroll ---------- */
const tc=$('#tc'),fill=$('#tlfill'),head=$('#tlhead'),os=$('#oscene'),car=$('#carousel'),proc=$('#process');
let sy=scrollY,spin=0,last=performance.now();
const prog=el=>{const r=el.getBoundingClientRect();return Math.min(1,Math.max(0,-r.top/(r.height-innerHeight)))};
function frame(now){
  const dt=Math.min(50,now-last);last=now;
  sy+=(scrollY-sy)*.12;
  const max=document.documentElement.scrollHeight-innerHeight, p=max>0?scrollY/max:0;
  fill.style.width=p*100+'%';head.style.left=`calc(${p*100}% - 1px)`;
  const fr=Math.round(p*45*30);
  tc.textContent=`00:00:${String(Math.floor(fr/30)).padStart(2,'0')}:${String(fr%30).padStart(2,'0')}`;
  if(ring){
    spin+=dt*.012;const hs=Math.min(1,sy/innerHeight),rot=spin+sy*.25;
    ring.style.transform=`translateY(${R()*.18}px) rotateX(${-20+hs*30}deg) rotateZ(-8deg) rotateY(${rot}deg)`;
    frs.forEach((f,i)=>{const z=Math.cos((i*360/frs.length+rot)*Math.PI/180);f.style.opacity=z>.35?Math.max(.12,1-(z-.35)*2.2):1});
    os.style.transform=`rotateY(${mx*16}deg) rotateX(${-my*10}deg) translateY(${hs*-80}px) scale(${1-hs*.15})`;
  }
  if(cyl){
    const rot=prog(car)*(N-1)*STEP;
    cyl.style.transform=`translateZ(${-CR()}px) rotateX(-6deg) rotateY(${-rot}deg)`;
    slots.forEach((s,i)=>{const a=((i*STEP-rot)%360+540)%360-180,c=Math.cos(a*Math.PI/180);s.style.opacity=.15+.85*Math.max(0,c)**1.5;s.style.filter=`blur(${(1-c)*2.5}px)`});
    setActive(Math.min(N-1,Math.round(rot/STEP)));
  }
  if(proc){
    const pp=prog(proc),x=Math.min(1,pp*1.15);
    $('#phead').style.left=x*100+'%';
    clips.forEach((c,i)=>c.classList.toggle('on',innerWidth<900?pp>0.02+i*.12:x>=i/6+.02));
    bars.forEach((b,i)=>b.classList.toggle('on',i/bars.length<=x));
  }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

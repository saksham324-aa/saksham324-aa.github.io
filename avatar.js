/* Saksham as a cartoon, riding a sports bike through the page.
   Two drawings of one character: standing (with joints) and riding (side view). */
(() => {
  const SKIN = '#e2aa80', SKIN2 = '#c98a5e', HAIR = '#26262c', HAIR2 = '#43434d', LIP = '#b4664f';
  const HOOD = '#141418', HOOD2 = '#2e2e37', PANTS = '#1b1c22', PANTS2 = '#30313a', RED = '#c8161f', BIKE_RED = '#c8161f', GOLD = '#e8b33f';

  /* the head, drawn around (160,110); shared by both drawings */
  const HEAD = `
    <path d="M142 150 h36 v46 q-18 14 -36 0Z" fill="${SKIN2}"/>
    <ellipse cx="100" cy="120" rx="13" ry="20" fill="${SKIN}"/><ellipse cx="220" cy="120" rx="13" ry="20" fill="${SKIN}"/>
    <path d="M103 112 q-7 2 -6 12 M217 112 q7 2 6 12" stroke="${SKIN2}" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M103 92 Q103 36 160 36 Q217 36 217 92 Q217 130 203 148 Q184 176 160 176 Q136 176 117 148 Q103 130 103 92Z" fill="${SKIN}"/>
    <path d="M98 122 C80 72 92 32 128 20 C150 2 194 2 216 22 C244 36 240 88 224 122 L216 98 C208 78 198 66 178 62 C158 82 128 88 110 86 C104 96 104 110 104 124Z" fill="${HAIR}"/>
    <path d="M114 30 q-16 -4 -20 -20 q12 12 34 12Z M226 48 q20 -2 28 -16 q0 22 -20 32Z M100 84 q-18 10 -28 4 q14 -4 22 -20Z M176 10 q10 -12 26 -12 q-10 8 -8 18Z" fill="${HAIR}"/>
    <path d="M128 36 C156 18 192 22 212 48 C190 34 158 36 132 50Z" fill="${HAIR2}"/>
    <path d="M178 62 C166 80 150 90 134 94 C150 96 172 88 186 68Z" fill="${HAIR}"/>
    <path d="M116 104 Q134 92 152 102" stroke="${HAIR}" stroke-width="8.5" stroke-linecap="round" fill="none"/>
    <path d="M168 102 Q186 92 204 104" stroke="${HAIR}" stroke-width="8.5" stroke-linecap="round" fill="none"/>
    <g data-eyes>
      <path d="M118 121 Q134 106 150 121 Q134 132 118 121Z" fill="#fff"/><path d="M170 121 Q186 106 202 121 Q186 132 170 121Z" fill="#fff"/>
      <circle cx="134" cy="119" r="9" fill="#6e3417"/><circle cx="186" cy="119" r="9" fill="#6e3417"/>
      <circle cx="134" cy="119" r="4.6" fill="#1c0e08"/><circle cx="186" cy="119" r="4.6" fill="#1c0e08"/>
      <circle cx="137.5" cy="115.5" r="2.4" fill="#fff"/><circle cx="189.5" cy="115.5" r="2.4" fill="#fff"/>
      <path d="M116 121 Q134 104 152 121" stroke="${HAIR}" stroke-width="3.4" fill="none" stroke-linecap="round"/>
      <path d="M168 121 Q186 104 204 121" stroke="${HAIR}" stroke-width="3.4" fill="none" stroke-linecap="round"/>
    </g>
    <path d="M160 124 Q154 140 159 144 Q165 147 171 142" stroke="${SKIN2}" stroke-width="3.4" fill="none" stroke-linecap="round"/>
    <path d="M139 152 Q149 146 160 149 Q171 146 181 152 Q170 151 160 153 Q150 151 139 152Z" fill="${HAIR}" opacity=".85"/>
    <path d="M142 157 Q160 170 178 157" stroke="${LIP}" stroke-width="4" fill="none" stroke-linecap="round"/>`;

  const arm = (id, x, side) => `<g data-j="${id}U">
      <path d="M${x - 22} 208 Q${x} 186 ${x + 22} 208 L${x + 20} 286 Q${x} 298 ${x - 20} 286Z" fill="${HOOD}"/>
      <path d="M${x + side * 13} 214 L${x + side * 12} 278" stroke="${HOOD2}" stroke-width="3.5" stroke-linecap="round" fill="none"/>
      <g data-j="${id}F"><path d="M${x - 20} 278 L${x + 20} 278 L${x + 17} 346 L${x - 17} 346Z" fill="${HOOD}"/>
      <rect x="${x - 18}" y="340" width="36" height="13" rx="5" fill="${HOOD2}"/>
      <circle cx="${x}" cy="365" r="16" fill="${SKIN}"/>
      <path d="M${x - side * 15} 358 q${-side * 9} 6 ${-side * 4} 16" stroke="${SKIN}" stroke-width="9" stroke-linecap="round" fill="none"/></g></g>`;

  const leg = (id, x) => `<g data-j="${id}">
    <path d="M${x - 25} 350 L${x + 25} 350 L${x + 24} 528 L${x - 24} 528Z" fill="${PANTS}"/>
    <path d="M${x + 8} 366 L${x + 8} 520" stroke="${PANTS2}" stroke-width="3" fill="none"/>
    <path d="M${x - 22} 526 L${x + 20} 526 L${x + 22} 556 L${x + 44} 566 Q${x + 50} 574 ${x + 44} 580 L${x - 22} 580Z" fill="#0d0d11"/>
    <rect x="${x - 25}" y="576" width="75" height="13" rx="6" fill="#fff"/>
    <path d="M${x + 22} 562 Q${x + 44} 562 ${x + 46} 577 L${x + 22} 577Z" fill="#fff"/>
    <path d="M${x - 1} 540 l14 7 M${x - 1} 550 l18 8" stroke="#fff" stroke-width="3.4" stroke-linecap="round"/>
  </g>`;

  const torso = `<g>
    <path d="M108 204 Q130 186 160 186 Q190 186 212 204 L218 358 Q160 368 102 358Z" fill="${HOOD}"/>
    <path d="M122 200 Q160 170 198 200 Q186 232 160 234 Q134 232 122 200Z" fill="${HOOD2}"/>
    <path d="M136 200 Q160 180 184 200 Q174 218 160 220 Q146 218 136 200Z" fill="${HOOD}"/>
    <path d="M150 220 L147 262 M170 220 L173 262" stroke="#d8d8de" stroke-width="3.4" stroke-linecap="round" fill="none"/>
    <path d="M122 306 L198 306 L212 350 L108 350Z" fill="#1d1d24"/>
    <circle cx="160" cy="262" r="15" fill="#0d1a22" stroke="${GOLD}" stroke-width="3"/><circle cx="160" cy="262" r="8" fill="#7fe9ff"/>
    <rect x="102" y="348" width="116" height="13" rx="5" fill="${HOOD2}"/>
  </g>`;

  const bowl = `<g data-bowl opacity="0">
    <g fill="none" stroke="#c9c6c6" stroke-width="6.5" stroke-linecap="round">
      <path class="stm s1" d="M136 280 q-12 -14 0 -28 q12 -14 0 -28"/>
      <path class="stm s2" d="M160 278 q12 -16 0 -32 q-12 -16 0 -32"/>
      <path class="stm s3" d="M184 280 q-12 -14 0 -28 q12 -14 0 -28"/>
    </g>
    <path d="M102 286 Q160 302 218 286 Q214 344 160 348 Q106 344 102 286Z" fill="${RED}"/>
    <ellipse cx="160" cy="286" rx="58" ry="13" fill="#4f070c"/>
    <path d="M110 286 Q130 274 150 284 T210 284" stroke="#f3efe6" stroke-width="7" fill="none" stroke-linecap="round"/>
  </g>`;

  const STAND = `<svg viewBox="-30 -20 390 630" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="160" cy="592" rx="98" ry="11" fill="#7fe9ff" opacity=".16"/>
    <g data-j="root">${leg('legL', 132)}${leg('legR', 188)}${torso}
      <g data-j="head"><g transform="translate(160 186) scale(1.16) translate(-160 -186)">${HEAD}</g></g>
      ${arm('armL', 104, -1)}${arm('armR', 216, 1)}${bowl}</g></svg>`;

  /* a sports bike in the spirit of a small faired supersport, no badges */
  const wheel = (cx, id) => `<g><circle cx="${cx}" cy="340" r="58" fill="none" stroke="#0c0c0f" stroke-width="17"/>
    <circle cx="${cx}" cy="340" r="47" fill="none" stroke="${GOLD}" stroke-width="3"/>
    <g data-w="${id}" stroke="#55555f" stroke-width="6" stroke-linecap="round">${[0, 72, 144, 216, 288].map(a => `<line x1="${cx}" y1="340" x2="${cx + Math.cos(a * Math.PI / 180) * 44}" y2="${340 + Math.sin(a * Math.PI / 180) * 44}"/>`).join('')}</g>
    <circle cx="${cx}" cy="340" r="28" fill="none" stroke="#8c8c96" stroke-width="3" stroke-dasharray="6 5"/>
    <circle cx="${cx}" cy="340" r="9" fill="#26262c"/></g>`;

  const RIDE = `<svg viewBox="0 -60 610 470" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="305" cy="402" rx="240" ry="10" fill="#7fe9ff" opacity=".16"/>
    <g data-ride>
      <path d="M150 340 L268 296" stroke="#26262c" stroke-width="15" stroke-linecap="round"/>
      ${wheel(140, 'r')}${wheel(470, 'f')}
      <path d="M468 340 L418 196" stroke="#b9b9c4" stroke-width="12" stroke-linecap="round"/>
      <path d="M418 318 Q448 268 512 292" stroke="#101014" stroke-width="10" fill="none" stroke-linecap="round"/>
      <rect x="236" y="258" width="128" height="70" rx="14" fill="#2b2b33"/>
      <path d="M254 272 v42 M272 272 v42 M290 272 v42 M308 272 v42" stroke="#4b4b57" stroke-width="5" stroke-linecap="round"/>
      <path d="M270 328 L214 342 L170 344" stroke="#3a3a44" stroke-width="16" stroke-linecap="round" fill="none"/>
      <rect x="120" y="326" width="84" height="26" rx="10" fill="#7d7d8a" transform="rotate(-5 160 340)"/>
      <rect x="116" y="330" width="12" height="20" rx="4" fill="#26262c" transform="rotate(-5 160 340)"/>
      <path d="M252 196 L402 162 Q444 172 456 214 Q444 280 362 306 L276 304 Q240 270 252 196Z" fill="#101014"/>
      <path d="M296 226 L438 202 Q426 252 352 276 L300 276Z" fill="${BIKE_RED}"/>
      <path d="M304 262 L432 216 L428 228 L322 270Z" fill="${GOLD}"/>
      <path d="M440 170 L492 202 Q470 226 454 222Z" fill="#101014"/>
      <path d="M470 196 L490 203 L474 214Z" fill="#ffe9a8"/>
      <path d="M408 166 L444 124 Q462 158 456 184Z" fill="#9fb6c6" opacity=".78"/>
      <path d="M248 204 Q300 150 398 166 L396 206 L256 218Z" fill="#1d1d24"/>
      <path d="M284 182 Q330 160 386 174" stroke="#4b4b57" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M120 186 L222 204 L176 232 Q140 214 120 186Z" fill="${BIKE_RED}"/>
      <path d="M162 200 Q206 192 256 208 L250 226 Q196 226 158 216Z" fill="#2c2c33"/>
      <path d="M412 178 L392 158" stroke="#101014" stroke-width="10" stroke-linecap="round"/>
      <circle cx="306" cy="306" r="7" fill="#8c8c96"/>
      <g data-rider>
        <path d="M250 192 L324 256 L288 322" stroke="${PANTS}" stroke-width="44" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        <path d="M268 310 L314 316 L332 330 Q336 338 328 340 L268 340Z" fill="#0d0d11"/><rect x="264" y="336" width="72" height="11" rx="5" fill="#fff"/>
        <path d="M244 188 Q262 118 332 96 L360 138 Q330 166 296 200 Q266 212 244 188Z" fill="${HOOD}"/>
        <path d="M304 92 Q338 76 362 112 Q340 130 316 122Z" fill="${HOOD2}"/>
        <path d="M334 118 L382 170 L402 164" stroke="${HOOD}" stroke-width="36" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        <rect x="394" y="148" width="14" height="30" rx="5" fill="${HOOD2}"/>
        <circle cx="414" cy="166" r="15" fill="${SKIN}"/>
        <g transform="translate(252 -30) scale(.7) rotate(7 160 110)">${HEAD}</g>
      </g>
    </g></svg>`;

  const PIV = { armLU: [104, 206], armLF: [104, 282], armRU: [216, 206], armRF: [216, 282], legL: [132, 352], legR: [188, 352], head: [160, 186] };
  const POSE = {
    idle: { armLU: 7, armLF: -6, armRU: -7, armRF: 6, legL: 3, legR: -3, head: 0, bowl: 0 },
    wave: { armLU: 7, armLF: -6, armRU: -148, armRF: -14, legL: 3, legR: -3, head: 5, bowl: 0 },
    bowl: { armLU: 13, armLF: -30, armRU: -13, armRF: 30, legL: 3, legR: -3, head: -3, bowl: 1 },
  };

  window.makeAvatar = (foot, ride) => {
    foot.innerHTML = STAND; ride.innerHTML = RIDE;
    const j = {};
    foot.querySelectorAll('[data-j]').forEach(g => { j[g.dataset.j] = g; });
    const bowlEl = foot.querySelector('[data-bowl]'), eyes = foot.querySelector('[data-eyes]');
    const wr = ride.querySelector('[data-w=r]'), wf = ride.querySelector('[data-w=f]'), body = ride.querySelector('[data-ride]');
    const cur = { ...POSE.idle }, A = { pose: 'idle', spin: 0 };
    const set = (k, deg) => { const [x, y] = PIV[k]; j[k].setAttribute('transform', `rotate(${deg.toFixed(2)} ${x} ${y})`); };
    let nextBlink = 2;
    return {
      to(p) { A.pose = p; },
      roll(px) { A.spin += px * 1.35; wr.setAttribute('transform', `rotate(${A.spin.toFixed(1)} 140 340)`); wf.setAttribute('transform', `rotate(${A.spin.toFixed(1)} 470 340)`); },
      tick(dt, t, riding) {
        const P = POSE[A.pose], k = Math.min(1, dt * 7);
        for (const n in cur) cur[n] += (P[n] - cur[n]) * k;
        set('legL', cur.legL); set('legR', cur.legR);
        set('armLU', cur.armLU); set('armLF', cur.armLF);
        set('armRU', cur.armRU); set('armRF', cur.armRF + (A.pose === 'wave' ? Math.sin(t * 7) * 15 : 0));
        set('head', cur.head + Math.sin(t * 1.1) * 1.6);
        j.root.setAttribute('transform', `translate(0 ${(Math.sin(t * 1.8) * 1.4).toFixed(2)})`);
        bowlEl.setAttribute('opacity', cur.bowl.toFixed(2));
        body.setAttribute('transform', `translate(0 ${riding ? (Math.sin(t * 34) * 1.3).toFixed(2) : 0})`);
        if (t > nextBlink) { eyes.style.transform = 'scaleY(.08)'; setTimeout(() => { eyes.style.transform = ''; }, 120); nextBlink = t + 2.4 + Math.random() * 3; }
      },
    };
  };
})();

/* the ride: each part of the page gives him a spot; foot = he has got off the bike */
(() => {
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const HI = "Hi, I'm Saksham", COOK = 'This is what I cook';
  const SPOTS = [
    ['#hook', .78, 'ride', HI],
    ['#info', .98, 'ride', ''],
    ['.videos-head', .72, 'bowl', COOK],
    ['#same', .02, 'ride', ''],
    ['#grid', .98, 'ride', ''],
    ['#end', .96, 'wave', ['Action!', 'Bye!']],
  ];
  const spots = SPOTS.map(([sel, x, pose, say, on]) => ({ el: document.querySelector(sel), x, pose, say, on: on && document.querySelector(on) })).filter(s => s.el);
  if (!spots.length) return;

  const box = document.createElement('div');
  box.className = 'ava'; box.setAttribute('aria-hidden', 'true');
  box.innerHTML = '<div class="ava-flip"><div class="ava-ride"></div><div class="ava-smoke"></div><div class="ava-foot"></div></div><p class="ava-say"></p>';
  document.body.appendChild(box);
  const q = s => box.querySelector(s);
  const flip = q('.ava-flip'), say = q('.ava-say'), smoke = q('.ava-smoke'), foot = q('.ava-foot');
  const a = makeAvatar(foot, q('.ava-ride'));

  let x = spots[0].x, y = 0, cur = null, last = performance.now(), facing = 1, off = false, puffAt = 0, line = 0, lineAt = 0;
  const pick = () => {
    const mid = innerHeight * .55; let best = spots[0];
    spots.forEach(s => { if (s.el.getBoundingClientRect().top < mid) best = s; });
    return best;
  };
  const puff = big => {
    const p = document.createElement('i');
    p.className = 'puff';
    p.style.setProperty('--dx', `${-(40 + Math.random() * 60)}px`);
    p.style.setProperty('--dy', `${-(10 + Math.random() * 34)}px`);
    p.style.setProperty('--s', (big ? 2 : 1.4) + Math.random());
    smoke.appendChild(p);
    setTimeout(() => p.remove(), 1500);
  };
  const loop = now => {
    const dt = Math.min(.05, (now - last) / 1000); last = now;
    const s = pick();
    if (s !== cur) { cur = s; say.classList.remove('on'); line = 0; lineAt = now + 1800; }
    const w = innerWidth, aw = box.offsetWidth, small = w <= 900, tx = small ? 1 : s.x;
    const d = tx - x, moving = Math.abs(d) > .004 && !calm;
    const lift = !small && s.on ? Math.max(0, innerHeight - s.on.getBoundingClientRect().top + 4) : 0;
    y += (lift - y) * Math.min(1, dt * 10);
    if (calm) x = tx;
    else if (moving) {
      const before = x;
      x += Math.sign(d) * Math.min(Math.abs(d), dt * .42);
      a.roll((x - before) * (w - aw) * 1.1 * Math.sign(d));
      facing = Math.sign(d);
      if (now > puffAt) { puff(false); puffAt = now + 70; }
    }
    const wantOff = !moving && s.pose !== 'ride';
    if (wantOff !== off) { off = wantOff; box.classList.toggle('off', off); if (off) { puff(true); puff(true); puff(true); } }
    a.to(off ? s.pose : 'idle');
    if (!moving) {
      if (!off) facing = tx > .5 ? -1 : 1;
      const lines = Array.isArray(s.say) ? s.say : [s.say];
      if (lines.length > 1 && now > lineAt) { line = (line + 1) % lines.length; lineAt = now + 1800; }
      if (say.textContent !== lines[line]) say.textContent = lines[line];
      say.classList.toggle('on', !!lines[line]);
    } else say.classList.remove('on');
    flip.style.transform = `scaleX(${facing})`;
    box.style.transform = `translate(${(x * (w - aw)).toFixed(1)}px,${(-y).toFixed(1)}px)`;
    box.classList.toggle('say-left', tx > .5);
    box.classList.toggle('on-red', s.el.matches('#end'));
    a.tick(dt, now / 1000, moving);
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
})();

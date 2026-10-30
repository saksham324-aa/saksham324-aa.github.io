/* Saksham as a cartoon: one SVG character with movable joints, so every pose is the same person.
   makeAvatar(el) -> { to(poseName), tick(dt, t), walk(amount) } */
(() => {
  const SKIN = '#d9a173', SKIN2 = '#c0855a', HAIR = '#15151a', JACKET = '#17171c', JACKET2 = '#34343e', PANTS = '#2b2e38', PANTS2 = '#3d414d', RED = '#7d0c14';

  const arm = (id, sx, side) => {
    // side: -1 viewer-left, 1 viewer-right. Both limbs are drawn hanging down from the joint.
    const w = 21, x = sx;
    return `<g data-j="${id}U"><path d="M${x - w} 206 Q${x} 188 ${x + w} 206 L${x + w - 2} 284 Q${x} 298 ${x - w + 2} 284Z" fill="${JACKET}"/>
      <path d="M${x + side * 12} 212 L${x + side * 11} 278" stroke="${JACKET2}" stroke-width="4" stroke-linecap="round" fill="none"/>
      <g data-j="${id}F"><path d="M${x - 19} 278 L${x + 19} 278 L${x + 16} 346 L${x - 16} 346Z" fill="${JACKET}"/>
      <path d="M${x + side * 10} 284 L${x + side * 9} 338" stroke="${JACKET2}" stroke-width="4" stroke-linecap="round" fill="none"/>
      <rect x="${x - 17}" y="340" width="34" height="13" rx="4" fill="${JACKET2}"/>
      <circle cx="${x}" cy="365" r="16" fill="${SKIN}"/>
      <path d="M${x - side * 15} 358 q${-side * 9} 6 ${-side * 4} 16" stroke="${SKIN}" stroke-width="9" stroke-linecap="round" fill="none"/></g></g>`;
  };

  const leg = (id, x) => `<g data-j="${id}">
    <path d="M${x - 25} 350 L${x + 25} 350 L${x + 19} 524 L${x - 19} 524Z" fill="${PANTS}"/>
    <path d="M${x + 9} 366 L${x + 7} 516" stroke="${PANTS2}" stroke-width="3" fill="none"/>
    <rect x="${x - 21}" y="514" width="42" height="11" rx="3" fill="${PANTS2}"/>
    <path d="M${x - 18} 525 L${x + 18} 525 L${x + 20} 556 L${x + 44} 566 Q${x + 50} 574 ${x + 44} 580 L${x - 22} 580Z" fill="#101014"/>
    <rect x="${x - 25}" y="576" width="75" height="13" rx="6" fill="#fff"/>
    <rect x="${x - 25}" y="582" width="75" height="2.5" fill="${RED}"/>
    <path d="M${x + 22} 562 Q${x + 44} 562 ${x + 46} 577 L${x + 22} 577Z" fill="#fff"/>
    <path d="M${x - 1} 540 l14 7 M${x - 1} 550 l18 8 M${x + 1} 560 l18 6" stroke="#fff" stroke-width="3.4" stroke-linecap="round"/>
    <circle cx="${x - 7}" cy="550" r="8" fill="#fff"/><circle cx="${x - 7}" cy="550" r="3.6" fill="${RED}"/>
  </g>`;

  const head = `<g data-j="head"><g transform="translate(160 186) scale(1.14) translate(-160 -186)">
    <rect x="141" y="150" width="38" height="50" rx="12" fill="${SKIN2}"/>
    <ellipse cx="101" cy="118" rx="12" ry="18" fill="${SKIN}"/><ellipse cx="219" cy="118" rx="12" ry="18" fill="${SKIN}"/>
    <path d="M104 112 q-6 -2 -7 6 M216 112 q6 -2 7 6" stroke="${SKIN2}" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M103 96 Q103 34 160 34 Q217 34 217 96 Q217 146 182 168 Q160 180 138 168 Q103 146 103 96Z" fill="${SKIN}"/>
    <path d="M99 112 Q82 62 112 32 Q152 -14 208 12 Q244 32 226 106 Q222 90 214 80 Q196 88 170 76 Q136 86 116 68 Q106 84 106 114Z" fill="${HAIR}"/>
    <path d="M118 54 Q172 36 216 80 Q222 94 219 110 Q208 80 170 74 Q140 74 118 54Z" fill="${HAIR}"/>
    <path d="M124 34 Q164 8 206 30 M132 50 Q168 32 204 54" stroke="#3f3f4b" stroke-width="4.5" stroke-linecap="round" fill="none"/>
    <path d="M118 100 Q134 89 150 98" stroke="${HAIR}" stroke-width="7.5" stroke-linecap="round" fill="none"/>
    <path d="M170 98 Q186 89 202 100" stroke="${HAIR}" stroke-width="7.5" stroke-linecap="round" fill="none"/>
    <g data-eyes>
      <ellipse cx="134" cy="115" rx="15" ry="11.5" fill="#fff"/><ellipse cx="186" cy="115" rx="15" ry="11.5" fill="#fff"/>
      <circle cx="136" cy="115" r="9" fill="#2a1710"/><circle cx="188" cy="115" r="9" fill="#2a1710"/>
      <circle cx="139" cy="112" r="2.5" fill="#fff"/><circle cx="191" cy="112" r="2.5" fill="#fff"/>
      <path d="M120 111 Q134 101 148 111" stroke="${HAIR}" stroke-width="3.2" fill="none" stroke-linecap="round"/>
      <path d="M172 111 Q186 101 200 111" stroke="${HAIR}" stroke-width="3.2" fill="none" stroke-linecap="round"/>
    </g>
    <path d="M160 118 Q153 135 159 139 Q165 142 169 137" stroke="${SKIN2}" stroke-width="3.4" fill="none" stroke-linecap="round"/>
    <path d="M136 150 Q148 141 160 146 Q172 141 184 150 Q172 147 160 151 Q148 147 136 150Z" fill="${HAIR}"/>
    <path d="M137 154 Q160 180 183 154 Q160 161 137 154Z" fill="#fff" stroke="#8c3f35" stroke-width="2.4" stroke-linejoin="round"/>
      </g></g>`;

  const torso = `<g>
    <path d="M112 196 L208 196 L203 356 L117 356Z" fill="#fff"/>
    <path d="M136 192 Q160 216 184 192 L178 186 L142 186Z" fill="${SKIN2}"/>
    <path d="M106 200 Q120 188 136 186 L142 362 L102 358 Q98 280 106 200Z" fill="${JACKET}"/>
    <path d="M214 200 Q200 188 184 186 L178 362 L218 358 Q222 280 214 200Z" fill="${JACKET}"/>
    <path d="M136 186 L128 208 L146 240 L150 204Z" fill="${JACKET2}"/><path d="M184 186 L192 208 L174 240 L170 204Z" fill="${JACKET2}"/>
    <path d="M139 240 L142 356 M181 240 L178 356" stroke="#8f8f99" stroke-width="2.6" fill="none"/>
    <rect x="102" y="346" width="40" height="14" rx="4" fill="${JACKET2}"/><rect x="178" y="346" width="40" height="14" rx="4" fill="${JACKET2}"/>
    <path d="M108 300 l20 6 M212 300 l-20 6" stroke="${JACKET2}" stroke-width="4" stroke-linecap="round"/>
  </g>`;

  const bowl = `<g data-bowl opacity="0">
    <g data-steam fill="none" stroke="#c9c6c6" stroke-width="6.5" stroke-linecap="round">
      <path class="stm s1" d="M136 280 q-12 -14 0 -28 q12 -14 0 -28"/>
      <path class="stm s2" d="M160 278 q12 -16 0 -32 q-12 -16 0 -32"/>
      <path class="stm s3" d="M184 280 q-12 -14 0 -28 q12 -14 0 -28"/>
    </g>
    <path d="M102 286 Q160 302 218 286 Q214 344 160 348 Q106 344 102 286Z" fill="${RED}"/>
    <ellipse cx="160" cy="286" rx="58" ry="13" fill="#4f070c"/>
    <path d="M110 286 Q130 274 150 284 T210 284" stroke="#f3efe6" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path d="M124 314 Q160 330 196 314" stroke="#a51f28" stroke-width="4" fill="none" stroke-linecap="round"/>

  </g>`;

  const SVG = `<svg viewBox="-30 -20 390 630" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cartoon of Saksham">
    <ellipse cx="160" cy="592" rx="98" ry="11" fill="#000" opacity=".12"/>
    <g data-j="root">${leg('legL', 132)}${leg('legR', 188)}${torso}${head}${arm('armL', 106, -1)}${arm('armR', 214, 1)}${bowl}</g>
  </svg>`;

  /* joint: [pivot x, y]. Angles in degrees. */
  const PIV = { armLU: [106, 206], armLF: [106, 282], armRU: [214, 206], armRF: [214, 282], legL: [132, 352], legR: [188, 352], head: [160, 186], root: [160, 590] };
  const POSE = {
    idle: { armLU: 7, armLF: -6, armRU: -7, armRF: 6, legL: 3, legR: -3, head: 0, bowl: 0 },
    wave: { armLU: 7, armLF: -6, armRU: -148, armRF: -14, legL: 3, legR: -3, head: 5, bowl: 0 },
    bowl: { armLU: 13, armLF: -30, armRU: -13, armRF: 30, legL: 3, legR: -3, head: -3, bowl: 1 },
    point: { armLU: 7, armLF: -6, armRU: -84, armRF: -10, legL: 3, legR: -3, head: 7, bowl: 0 },
    walk: { armLU: 0, armLF: -18, armRU: 0, armRF: 18, legL: 0, legR: 0, head: 0, bowl: 0 },
  };

  window.makeAvatar = el => {
    el.innerHTML = SVG;
    const j = {};
    el.querySelectorAll('[data-j]').forEach(g => { j[g.dataset.j] = g; });
    const bowlEl = el.querySelector('[data-bowl]'), eyes = el.querySelector('[data-eyes]');
    const cur = { ...POSE.idle }, A = { pose: 'idle', stride: 0, phase: 0 };
    const set = (k, deg) => { const [x, y] = PIV[k]; j[k].setAttribute('transform', `rotate(${deg.toFixed(2)} ${x} ${y})`); };
    let nextBlink = 2;
    const api = {
      to(p) { A.pose = p; },
      walk(amount) { A.stride = amount; },          // 0..1, how hard it is walking right now
      step(d) { A.phase += d; },                    // advance the stride (scroll drives this)
      tick(dt, t) {
        const P = POSE[A.pose], k = Math.min(1, dt * 7);
        for (const n in cur) cur[n] += (P[n] - cur[n]) * k;
        const s = Math.sin(A.phase) * A.stride;
        set('legL', cur.legL + s * 24); set('legR', cur.legR - s * 24);
        const armS = A.pose === 'idle' || A.pose === 'walk' ? s * 20 : 0;
        const wave = A.pose === 'wave' ? Math.sin(t * 7) * 15 : 0;
        set('armLU', cur.armLU - armS); set('armLF', cur.armLF);
        set('armRU', cur.armRU + armS); set('armRF', cur.armRF + wave);
        set('head', cur.head + Math.sin(t * 1.1) * 1.6);
        const bob = Math.abs(Math.cos(A.phase)) * -7 * A.stride + Math.sin(t * 1.8) * 1.4;
        j.root.setAttribute('transform', `translate(0 ${bob.toFixed(2)})`);
        bowlEl.setAttribute('opacity', cur.bowl.toFixed(2));
        if (t > nextBlink) { eyes.style.transform = 'scaleY(.08)'; setTimeout(() => { eyes.style.transform = ''; }, 120); nextBlink = t + 2.4 + Math.random() * 3; }
      },
    };
    return api;
  };
})();

/* the walk: he stays on screen for the whole visit, and each part of the page gives him a spot, a pose and a line */
(() => {
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const page = document.body.dataset.page;
  const SPOTS = {
    home: [['.mag', .84, 'wave', "Hi, I'm Saksham", '.mag-title'], ['.same', .06, 'point', ''], ['.tk', .985, 'idle', ''], ['.finale', .17, 'bowl', 'This is what I cook'], ['.cta', .46, 'wave', 'Your turn']],
    styles: [['.page-head', .46, 'wave', "Hi, I'm Saksham"], ['#s1', .93, 'point', ''], ['#s3', .07, 'idle', ''], ['#s5', .93, 'bowl', 'This is what I cook'], ['.cta', .46, 'wave', 'Your turn']],
    work: [['.work', .93, 'wave', "Hi, I'm Saksham"], ['.cta', .46, 'bowl', 'This is what I cook']],
    about: [['.about-head', .93, 'wave', "Hi, I'm Saksham"], ['.verb', .07, 'point', ''], ['.verb:nth-of-type(4)', .93, 'bowl', 'This is what I cook'], ['.cta', .46, 'wave', 'Your turn']],
    contact: [['.contact', .9, 'wave', "Let's talk"]],
  }[page] || [];
  const spots = SPOTS.map(([sel, x, pose, say, on]) => ({ el: document.querySelector(sel), x, pose, say, on: on && document.querySelector(on) })).filter(s => s.el);
  if (!spots.length) return;

  const box = document.createElement('div');
  box.className = 'ava'; box.setAttribute('aria-hidden', 'true');
  box.innerHTML = '<div class="ava-flip"><div class="ava-art"></div></div><p class="ava-say"></p>';
  document.body.appendChild(box);
  const art = box.querySelector('.ava-art'), flip = box.querySelector('.ava-flip'), say = box.querySelector('.ava-say');
  const a = makeAvatar(art);

  let x = spots[0].x, y = 0, cur = null, last = performance.now(), facing = 1;
  const pick = () => {
    const mid = innerHeight * .55; let best = spots[0];
    spots.forEach(s => { if (s.el.getBoundingClientRect().top < mid) best = s; });
    return best;
  };
  const loop = now => {
    const dt = Math.min(.05, (now - last) / 1000); last = now;
    const s = pick();
    if (s !== cur) { cur = s; say.classList.remove('on'); }
    const w = innerWidth, aw = box.offsetWidth, small = w <= 900, tx = small ? 1 : s.x;
    // on the hero he stands on the headline; when it scrolls away he drops back to the floor
    const lift = !small && s.on ? Math.max(0, innerHeight - s.on.getBoundingClientRect().top + 4) : 0;
    y += (lift - y) * Math.min(1, dt * 10);
    const d = tx - x, moving = Math.abs(d) > .004 && !calm;
    if (calm) x = tx; else x += Math.sign(d) * Math.min(Math.abs(d), dt * .3);
    if (moving) { facing = Math.sign(d); a.step(dt * 9); }
    a.walk(moving ? 1 : 0);
    a.to(moving ? 'walk' : s.pose);
    if (!moving) { facing = tx > .5 ? -1 : 1; if (s.say && say.textContent !== s.say) say.textContent = s.say; say.classList.toggle('on', !!s.say); }
    flip.style.transform = `scaleX(${facing})`;
    box.style.transform = `translate(${(x * (w - aw)).toFixed(1)}px,${(-y).toFixed(1)}px)`;
    box.classList.toggle('say-left', tx > .5);
    box.classList.toggle('on-red', s.el.matches('.cta'));
    a.tick(dt, now / 1000);
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
})();

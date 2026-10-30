/* Three 3D pieces, each built from the editor's own work. The flat page underneath stays as the fallback. */
(() => {
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (calm || !window.THREE) return;
  const T = THREE;
  const probe = document.createElement('canvas');
  if (!(probe.getContext('webgl2') || probe.getContext('webgl'))) return;
  document.documentElement.classList.add('has-3d');

  const BG = 0xffffff, INK = 0x7d0c14, DARK = 0x1a0709;
  let scrollV = 0, lastY = scrollY, mx = 0, my = 0;
  addEventListener('pointermove', e => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; }, { passive: true });

  /* one renderer per piece: it sleeps while off screen */
  function stage(box, fov, build) {
    const r = new T.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    r.outputEncoding = T.sRGBEncoding;
    r.setPixelRatio(Math.min(devicePixelRatio, 2));
    box.appendChild(r.domElement);
    const scene = new T.Scene(), cam = new T.PerspectiveCamera(fov, 1, .1, 50);
    const step = build(scene, cam, r);
    const fit = () => { const w = box.clientWidth, h = box.clientHeight; r.setSize(w, h); cam.aspect = w / h; cam.updateProjectionMatrix(); };
    fit(); new ResizeObserver(fit).observe(box);
    let on = false, last = performance.now();
    const loop = now => {
      if (!on) return;
      const dt = Math.min(.05, (now - last) / 1000); last = now;
      step(dt, now / 1000); r.render(scene, cam);
      requestAnimationFrame(loop);
    };
    new IntersectionObserver(([e]) => { const was = on; on = e.isIntersecting; if (on && !was) { last = performance.now(); requestAnimationFrame(loop); } }, { rootMargin: '80px' }).observe(box);
    return { scene, cam, r };
  }

  /* 1. hero: the showreel on a real slab that tilts with the pointer and turns with the scroll */
  const heroVid = document.querySelector('.hero-frame');
  const objs = [...document.querySelectorAll('[data-d]')];
  if (heroVid) {
    const box = document.createElement('div');
    box.className = 'hero-3d';
    heroVid.after(box);
    heroVid.classList.add('tex-source');
    stage(box, 30, (scene, cam) => {
      cam.position.z = 2.09;
      const tex = new T.VideoTexture(heroVid);
      tex.encoding = T.sRGBEncoding;
      const face = new T.MeshBasicMaterial({ map: tex, toneMapped: false });
      const edge = new T.MeshBasicMaterial({ color: INK });
      const slab = new T.Mesh(new T.BoxGeometry(.5625, 1, .045), [edge, edge, edge, edge, face, new T.MeshBasicMaterial({ color: DARK })]);
      scene.add(slab);
      let rx = 0, ry = 0;
      return (dt, t) => {
        const s = Math.min(1, scrollY / innerHeight);
        const ty = Math.sin(t * .55) * .1 + mx * .5 + s * 1.05;
        const tx = my * -.3 + s * .12;
        ry += (ty - ry) * Math.min(1, dt * 6); rx += (tx - rx) * Math.min(1, dt * 6);
        slab.rotation.set(rx, ry, 0);
        slab.position.y = Math.sin(t * .8) * .006;
        objs.forEach(o => { const d = +o.dataset.d; o.style.transform = `translate(${mx * d}px,${my * d - s * d * 2.4}px)`; });
      };
    });
  }

  /* 2. styles: six reels on a ring, scrolling turns it, a click opens that style */
  const ringBox = document.querySelector('.ring-3d');
  if (ringBox) {
    const links = [...ringBox.querySelectorAll('.strip a')];
    const N = links.length, R = 1.16, W = .86, H = W * 16 / 9, STEP = Math.PI * 2 / N;
    let group, target = 0, turn = 0, cam0;
    const ray = new T.Raycaster(), p = new T.Vector2();
    const made = stage(ringBox, 28, (scene, cam) => {
      cam0 = cam;
      cam.position.set(0, .4, 5.9); cam.lookAt(0, 0, 0);
      scene.fog = new T.Fog(BG, 5.6, 10.5);
      group = new T.Group(); scene.add(group);
      const load = new T.TextureLoader();
      links.forEach((a, i) => {
        const tex = load.load(a.querySelector('img').src);
        tex.encoding = T.sRGBEncoding;
        const m = new T.Mesh(new T.PlaneGeometry(W, H), new T.MeshBasicMaterial({ map: tex, side: T.DoubleSide, toneMapped: false }));
        const ang = i * STEP;
        m.position.set(Math.sin(ang) * R, 0, Math.cos(ang) * R);
        m.rotation.y = ang;
        m.userData.href = a.getAttribute('href');
        group.add(m);
      });
      return (dt, t) => {
        target = scrollY * .0035 + t * .07 + mx * .5;
        turn += (target - turn) * Math.min(1, dt * 5);
        group.rotation.y = -turn;
        group.rotation.x = my * .08;
      };
    });
    const hit = e => {
      const b = made.r.domElement.getBoundingClientRect();
      p.set((e.clientX - b.left) / b.width * 2 - 1, -(e.clientY - b.top) / b.height * 2 + 1);
      ray.setFromCamera(p, cam0);
      return ray.intersectObjects(group.children)[0];
    };
    made.r.domElement.addEventListener('click', e => { const h = hit(e); if (h) location.hash = h.object.userData.href; });
    made.r.domElement.addEventListener('pointermove', e => { made.r.domElement.style.cursor = hit(e) ? 'pointer' : ''; }, { passive: true });
    links.forEach((a, i) => a.addEventListener('focus', () => { turn = i * STEP; }));
  }

  /* 3. the close: a film reel that spins with the scroll, its strip made of real frames */
  const reelBox = document.querySelector('.reel-3d');
  if (reelBox) {
    const names = ['same-margin', 's2-poster', 'same-live', 's3-poster', 'same-still', 's6-poster'];
    const FW = 180, FH = 320, cv = document.createElement('canvas');
    cv.width = FW * names.length; cv.height = FH + 80;
    const ctx = cv.getContext('2d');
    ctx.fillStyle = '#1a0709'; ctx.fillRect(0, 0, cv.width, cv.height);
    ctx.fillStyle = '#e2e2e2';
    for (let x = 8; x < cv.width; x += 30) { ctx.fillRect(x, 12, 15, 18); ctx.fillRect(x, cv.height - 30, 15, 18); }
    const strip = new T.CanvasTexture(cv);
    strip.encoding = T.sRGBEncoding; strip.wrapS = T.RepeatWrapping; strip.repeat.x = 1.4;
    names.forEach((n, i) => {
      const im = new Image();
      im.onload = () => {
        const s = Math.max((FW - 8) / im.width, FH / im.height), w = im.width * s, h = im.height * s;
        ctx.save(); ctx.beginPath(); ctx.rect(i * FW + 4, 40, FW - 8, FH); ctx.clip();
        ctx.drawImage(im, i * FW + FW / 2 - w / 2, 40 + FH / 2 - h / 2, w, h); ctx.restore();
        strip.needsUpdate = true;
      };
      im.src = `media/${n}.jpg`;
    });

    stage(reelBox, 26, (scene, cam) => {
      cam.position.set(.45, .25, 7.4); cam.lookAt(.45, 0, 0);
      scene.add(new T.AmbientLight(0xffffff, .28));
      const key = new T.DirectionalLight(0xffffff, 1.25); key.position.set(-3, 3.5, 4); scene.add(key);
      const rim = new T.DirectionalLight(0xffc9c0, .55); rim.position.set(4, -2, 2); scene.add(rim);

      const reel = new T.Group(); scene.add(reel);
      const disc = new T.Shape(); disc.absarc(0, 0, 1.25, 0, Math.PI * 2);
      for (let i = 0; i < 5; i++) {
        const a = i / 5 * Math.PI * 2, h = new T.Path();
        h.absarc(Math.cos(a) * .72, Math.sin(a) * .72, .3, 0, Math.PI * 2, true);
        disc.holes.push(h);
      }
      const hole = new T.Path(); hole.absarc(0, 0, .09, 0, Math.PI * 2, true); disc.holes.push(hole);
      const flange = new T.ExtrudeGeometry(disc, { depth: .05, bevelEnabled: true, bevelSize: .012, bevelThickness: .012, bevelSegments: 2, curveSegments: 48 });
      const steel = new T.MeshStandardMaterial({ color: 0xc8c8c8, metalness: .62, roughness: .38 });
      [-.2, .15].forEach(z => { const f = new T.Mesh(flange, steel); f.position.z = z; reel.add(f); });
      const film = new T.Mesh(new T.CylinderGeometry(1.02, 1.02, .34, 72), new T.MeshStandardMaterial({ color: DARK, roughness: .38, metalness: .2 }));
      film.rotation.x = Math.PI / 2; reel.add(film);
      const hub = new T.Mesh(new T.CylinderGeometry(.27, .27, .36, 40), new T.MeshStandardMaterial({ color: 0xcfcfcf, metalness: .5, roughness: .35 }));
      hub.rotation.x = Math.PI / 2; reel.add(hub);

      /* the strip leaves the roll and waves off to the right */
      const geo = new T.PlaneGeometry(1, .62, 90, 1), pos = geo.attributes.position;
      const base = []; for (let i = 0; i < pos.count; i++) base.push(pos.getX(i) + .5, pos.getY(i));
      const ribbon = new T.Mesh(geo, new T.MeshBasicMaterial({ map: strip, side: T.DoubleSide, toneMapped: false }));
      scene.add(ribbon);
      const bend = t => {
        for (let i = 0; i < pos.count; i++) {
          const u = base[i * 2], v = base[i * 2 + 1];
          const x = .75 + u * 3.9, wave = Math.sin(u * 5 - t * 1.1) * .2 * u;
          pos.setXYZ(i, x, -1.02 + u * .9 + wave + v, .02 + Math.cos(u * 4 - t * .9) * .34 * u);
        }
        pos.needsUpdate = true; geo.computeVertexNormals();
      };
      let spin = 0;
      return (dt, t) => {
        spin += (.5 + Math.abs(scrollV) * .022) * dt;
        reel.rotation.z = -spin;
        reel.rotation.y = -.42 + mx * .22;
        reel.rotation.x = .1 + my * .12;
        strip.offset.x = spin * .16;
        bend(t);
      };
    });
  }

  addEventListener('scroll', () => { scrollV = scrollY - lastY; lastY = scrollY; }, { passive: true });
  setInterval(() => { scrollV *= .8; }, 100);
})();

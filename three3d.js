/* The hook: a 3D reactor that powers up, tilts with the pointer and opens as you scroll.
   The CSS reactor underneath stays as the fallback. */
(() => {
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (calm || !window.THREE) return;
  const T = THREE;
  const box = document.querySelector('.reactor-3d');
  const probe = document.createElement('canvas');
  if (!box || !(probe.getContext('webgl2') || probe.getContext('webgl'))) return;
  document.documentElement.classList.add('has-3d');

  const ARC = 0x7fe9ff, GOLD = 0xe8b33f, STEEL = 0x8c96a4, COPPER = 0xc27a32;
  const r = new T.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  r.outputEncoding = T.sRGBEncoding;
  r.setPixelRatio(Math.min(devicePixelRatio, 2));
  box.appendChild(r.domElement);
  const scene = new T.Scene(), cam = new T.PerspectiveCamera(30, 1, .1, 50);
  cam.position.z = 8.8;
  scene.add(new T.AmbientLight(0xffffff, .3));
  const key = new T.DirectionalLight(0xffffff, .8); key.position.set(-3, 4, 5); scene.add(key);
  const core = new T.PointLight(ARC, .9, 5); core.position.z = 1.2; scene.add(core);

  const R = new T.Group(); scene.add(R);
  const steel = new T.MeshStandardMaterial({ color: STEEL, metalness: .85, roughness: .32 });
  const dark = new T.MeshStandardMaterial({ color: 0x1b212b, metalness: .7, roughness: .5 });
  const gold = new T.MeshStandardMaterial({ color: GOLD, metalness: .9, roughness: .3 });
  const copper = new T.MeshStandardMaterial({ color: COPPER, metalness: .85, roughness: .38 });
  const arc = new T.MeshBasicMaterial({ color: ARC, toneMapped: false });

  R.add(new T.Mesh(new T.TorusGeometry(1.86, .1, 24, 128), gold));
  const plate = new T.Mesh(new T.RingGeometry(.86, 1.8, 96), dark); plate.position.z = -.08; R.add(plate);

  /* the coils turn one way, the inner ring the other */
  const coils = new T.Group(); R.add(coils);
  const N = 10;
  for (let i = 0; i < N; i++) {
    const a = i / N * Math.PI * 2;
    const c = new T.Mesh(new T.BoxGeometry(.3, .5, .16), copper);
    c.position.set(Math.cos(a) * 1.34, Math.sin(a) * 1.34, .04);
    c.rotation.z = a + Math.PI / 2;
    coils.add(c);
    const s = new T.Mesh(new T.BoxGeometry(.05, .62, .2), steel);
    s.position.set(Math.cos(a + Math.PI / N) * 1.34, Math.sin(a + Math.PI / N) * 1.34, .05);
    s.rotation.z = a + Math.PI / N + Math.PI / 2;
    coils.add(s);
  }
  const inner = new T.Group(); R.add(inner);
  inner.add(new T.Mesh(new T.TorusGeometry(.84, .05, 16, 96), steel));
  for (let i = 0; i < 24; i++) {
    const a = i / 24 * Math.PI * 2;
    const t = new T.Mesh(new T.BoxGeometry(.024, .09, .03), arc);
    t.position.set(Math.cos(a) * .72, Math.sin(a) * .72, .06);
    t.rotation.z = a + Math.PI / 2;
    inner.add(t);
  }
  const lens = new T.Mesh(new T.CircleGeometry(.56, 64), arc); lens.position.z = .05; R.add(lens);

  /* soft glow around the core */
  const cv = document.createElement('canvas'); cv.width = cv.height = 256;
  const g = cv.getContext('2d'), gr = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  gr.addColorStop(0, 'rgba(190,246,255,.9)'); gr.addColorStop(.28, 'rgba(127,233,255,.34)'); gr.addColorStop(1, 'rgba(127,233,255,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 256, 256);
  const glow = new T.Sprite(new T.SpriteMaterial({ map: new T.CanvasTexture(cv), blending: T.AdditiveBlending, depthWrite: false, transparent: true }));
  glow.position.z = .3; R.add(glow);

  const fit = () => { const w = box.clientWidth, h = box.clientHeight; r.setSize(w, h); cam.aspect = w / h; cam.updateProjectionMatrix(); };
  fit(); new ResizeObserver(fit).observe(box);
  let mx = 0, my = 0, on = true, last = performance.now(), power = 0, rx = 0, ry = 0;
  addEventListener('pointermove', e => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; }, { passive: true });
  new IntersectionObserver(([e]) => { const was = on; on = e.isIntersecting; if (on && !was) { last = performance.now(); requestAnimationFrame(loop); } }).observe(box);

  function loop(now) {
    if (!on) return;
    const dt = Math.min(.05, (now - last) / 1000), t = now / 1000; last = now;
    power = Math.min(1, power + dt * .7);                         // powers up over about 1.4 s
    const s = Math.min(1, scrollY / innerHeight);
    const pulse = power * (.9 + Math.sin(t * 2.2) * .1);
    glow.scale.setScalar(2.1 + pulse * .55);
    glow.material.opacity = pulse * .8;
    lens.material.color.setHex(ARC).multiplyScalar(.25 + pulse * .55);
    core.intensity = pulse * .9;
    coils.rotation.z = -t * .12 - s * 1.6 - (1 - power) * 3;
    inner.rotation.z = t * .3 + s * 2.4;
    ry += (mx * .55 - ry) * Math.min(1, dt * 5); rx += (my * .4 - rx) * Math.min(1, dt * 5);
    R.rotation.set(rx + s * .3, ry - .22 - s * .5, 0);
    R.scale.setScalar(1 + s * .2);
    r.render(scene, cam);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();

/* The one page: contact links, video playback, the player, the pinned "one line, three edits". */
const C = window.CONTACT || {};
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* every Book button: the Google Form when set, otherwise the end of the page */
const mail = `mailto:${C.email}?subject=Video%20edit%20enquiry`;
if (C.form) $$('[data-book]').forEach(a => { a.href = C.form; a.target = '_blank'; a.rel = 'noopener'; });

/* only what is filled in config.js shows */
const ways = $('#ways');
if (ways) {
  const phone = (C.phone || '').replace(/[^\d+]/g, '');
  const wa = (C.whatsapp || '').replace(/\D/g, '');
  const text = encodeURIComponent(`Hi ${C.name}, I saw your portfolio and want to talk about an edit.`);
  const items = [
    ['Book a call', C.form || mail, 'btn'],
    wa && ['WhatsApp', `https://wa.me/${wa}?text=${text}`],
    phone && [C.phone, `tel:${phone}`],
    C.instagram && ['Instagram', C.instagram],
    C.linkedin && ['LinkedIn', C.linkedin],
  ].filter(Boolean);
  ways.innerHTML = items.map(([l, h, c]) => `<a href="${h}"${c ? ` class="${c}"` : ''}${h.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>${l}</a>`).join('');
}

/* loops play only while on screen */
const seen = new IntersectionObserver(es => es.forEach(e => {
  const v = e.target;
  if (e.isIntersecting && !calm) { v.preload = 'auto'; v.play().catch(() => {}); } else v.pause();
}), { threshold: .1 });
$$('video[loop]').forEach(v => seen.observe(v));

/* entrances: once */
const up = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); up.unobserve(e.target); }
}), { threshold: .15 });
$$('.rise').forEach(el => up.observe(el));

/* player: the clip with sound */
const dlg = $('#player'), pv = $('video', dlg);
$$('[data-play]').forEach(b => b.addEventListener('click', () => {
  pv.src = `media/${b.dataset.play}-full.mp4`;
  dlg.setAttribute('aria-label', `${b.dataset.title} with sound`);
  dlg.showModal();
  pv.play().catch(() => {});
}));
dlg.addEventListener('close', () => { pv.pause(); pv.removeAttribute('src'); pv.load(); });
dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });

/* the same line, three edits: scrolling or tapping changes the edit at the same second */
const same = $('#same');
if (same) {
  const NOTES = {
    margin: 'Your face carries it, and a clean card explains the money.',
    live: 'Motion graphics act out the line while you explain it.',
    still: 'No camera at all. Just the voice and a world built around it.',
  };
  const vids = $$('.same-frame video'), btns = $$('.pick button'), note = $('#sameNote'), sound = $('#sound');
  const keys = ['margin', 'live', 'still'];
  let k = 'margin', muted = true, visible = false;
  const cur = () => vids.find(v => v.dataset.k === k);
  vids[0].classList.add('on');
  function go(next) {
    if (next === k) return;
    const from = cur(), t = from.currentTime; k = next;
    const to = cur();
    try { to.currentTime = t; } catch {}
    to.muted = muted;
    if (visible && !calm) to.play().catch(() => {});
    to.classList.add('on');
    setTimeout(() => { from.classList.remove('on'); from.pause(); from.muted = true; }, 220);
    btns.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.k === k)));
    note.textContent = NOTES[k];
  }
  btns.forEach(b => b.addEventListener('click', () => go(b.dataset.k)));
  sound.addEventListener('click', () => {
    muted = !muted; cur().muted = muted;
    sound.textContent = muted ? 'Turn sound on' : 'Turn sound off';
    sound.setAttribute('aria-pressed', String(!muted));
    if (visible) cur().play().catch(() => {});
  });
  vids.forEach(v => v.addEventListener('ended', () => {
    if (v.dataset.k !== k) return; v.currentTime = 0; if (visible) v.play().catch(() => {});
  }));
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !calm) { vids.forEach(v => v.preload = 'auto'); cur().play().catch(() => {}); } else cur().pause();
  }, { threshold: .2 }).observe(same);
  if (!calm) addEventListener('scroll', () => {
    const r = same.getBoundingClientRect(), run = r.height - innerHeight;
    if (r.top > 0 || r.bottom < innerHeight) return;
    go(keys[Math.min(2, Math.floor(-r.top / run * 3))]);
  }, { passive: true });
}

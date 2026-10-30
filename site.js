/* The page plays like a reel: the feed stops, words land, the work moves past. */
const C = window.CONTACT || {};
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
const mail = `mailto:${C.email}?subject=Video%20edit%20enquiry`;

/* every Book button: the Google Form when set, otherwise the end of the page */
if (C.form) $$('[data-book]').forEach(a => { a.href = C.form; a.target = '_blank'; a.rel = 'noopener'; });

/* the hook: a feed rushes past, brakes on one yellow post, and that post becomes the screen */
(() => {
  const root = document.documentElement, feed = $('#feed');
  const start = () => root.classList.add('go');
  if (calm || !feed.animate) { feed.remove(); start(); return; }
  const post = hit => `<div class="post${hit ? ' post-hit' : ''}"><i></i><i></i></div>`;
  const ROWS = 15, HIT = 11;
  feed.innerHTML = [0, 1, 2].map(c => `<div class="feed-col">${Array.from({ length: ROWS }, (_, i) => post(c === 1 && i === HIT)).join('')}</div>`).join('');
  const cols = $$('.feed-col', feed), hit = $('.post-hit', feed), mid = cols[1];
  const y = hit.offsetTop - (innerHeight - hit.offsetHeight) / 2;
  const ease = 'cubic-bezier(.12,.74,.16,1)';
  cols.forEach((c, i) => c.animate(
    [{ transform: `translateY(${-y * .1 + i * 60}px)` }, { transform: `translateY(${-y + (i === 1 ? 0 : i * 70 - 70)}px)` }],
    { duration: 780, easing: ease, fill: 'forwards' }));
  const r = () => Math.max(innerWidth / hit.offsetWidth, innerHeight / hit.offsetHeight) * 1.08;
  setTimeout(() => {
    cols.forEach((c, i) => { if (c !== mid) c.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 90, fill: 'forwards' }); });
    const z = hit.animate([{ transform: 'scale(1)' }, { transform: `scale(${r()})` }], { duration: 210, easing: 'cubic-bezier(.7,0,.3,1)', fill: 'forwards' });
    $$('.post', mid).forEach(p => { if (p !== hit) p.style.visibility = 'hidden'; });
    z.onfinish = () => { start(); feed.remove(); };
  }, 800);
})();

/* contact: only what is filled in config.js shows */
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

/* the words land one by one as you scroll */
const lit = $('#lit'), info = $('#info');
const words = lit.textContent.trim().split(/\s+/);
lit.innerHTML = words.map(w => `<span>${w}</span>`).join(' ');
const spans = $$('span', lit);

/* the reels move past like a timeline */
const strip = $('#strip'), track = $('#track');

const prog = el => { const r = el.getBoundingClientRect(); return Math.min(1, Math.max(0, -r.top / (r.height - innerHeight))); };
function onScroll() {
  if (calm) { spans.forEach(s => s.classList.add('on')); return; }
  const n = Math.round(prog(info) * 1.15 * spans.length);
  spans.forEach((s, i) => s.classList.toggle('on', i < n));
  if (innerWidth > 900) track.style.transform = `translateX(${-prog(strip) * Math.max(0, track.scrollWidth - innerWidth)}px)`;
  else track.style.transform = '';
}
addEventListener('scroll', onScroll, { passive: true });
addEventListener('resize', onScroll);
onScroll();

/* loops play only while on screen */
const seen = new IntersectionObserver(es => es.forEach(e => {
  const v = e.target;
  if (e.isIntersecting && !calm) { v.preload = 'auto'; v.play().catch(() => {}); } else v.pause();
}), { threshold: .1 });
$$('video[loop]').forEach(v => seen.observe(v));

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

/* the same line, three edits: a hard cut between edits at the same second */
(() => {
  const same = $('#same');
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
    to.classList.add('on'); from.classList.remove('on'); from.pause(); from.muted = true;
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
})();

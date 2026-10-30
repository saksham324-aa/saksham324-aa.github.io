"""Writes the site's HTML pages from shared pieces. Run after editing: python build_pages.py"""
import pathlib

HERE = pathlib.Path(__file__).parent
V = "17"  # bump to bust the browser cache after changing css/js

STYLES = [
    ("s1", "Margin Notes", "Everyday talking-head reels", "Your face carries the reel while clean cards build on your words: a flow chart, a meter that fills, a number that counts up as you say it.", False),
    ("s2", "Yap", "Reels with lines worth shouting", "The talking head cuts to full-screen type on the key lines. Words land one by one, numbers fill meters, and every scene carries into the next.", False),
    ("s3", "Trailer", "Episode launches and podcasts", "Widescreen trailers cut to the beat of the music: a cold-open question, bass hits on the big words, and a cliffhanger cut to black.", True),
    ("s4", "Still Life", "Voice notes, no camera needed", "Send a voice note and every frame gets built: one photo-real object per sentence as a visual metaphor, with a new world every two seconds.", False),
    ("s5", "Live Edit", "Explainers that must be watched", "It looks designed live: gradient keywords, a cursor, counter cards and charts. About 70% motion graphics, 30% your face on the lines that matter.", False),
    ("s6", "Orbit", "Podcast and stage clips", "One seated shot becomes a scene. The guest is cut out, big keywords sit behind the head, and cards and a hologram ring orbit the body.", False),
]

WORK = [
    ("s1", "Brand deal payments", "Margin Notes · talking-head reel · 84 s", "reels"),
    ("s2", "GST at ₹20 lakh", "Yap · kinetic-type reel · 35 s", "reels"),
    ("s3", "Episode launch", "Trailer · 16:9 · 31 s", "trailers"),
    ("s4", "Where the money waits", "Still Life · voice-only reel · 86 s", "motion"),
    ("s5", "Ninety days", "Live Edit · motion-graphics reel · 84 s", "motion"),
    ("s6", "Fast, not luxury", "Orbit · stage clip sample · 14 s", "motion"),
]

VERBS = [
    ("Cut", "Pauses and retakes come out on word boundaries, never mid-word, so the pace feels spoken rather than chopped.", "same-margin.jpg", ""),
    ("Caption", "Every word appears on the frame it is said, in English or Roman-script Hinglish.", "s2-poster.jpg", "red"),
    ("Animate", "Cards, type and charts act out the idea, and nothing sits on your face.", "same-live.jpg", ""),
    ("Mix", "Real music and sound effects sit on the beats, with your voice clean and loud enough for a phone speaker.", "same-still.jpg", "red"),
    ("Deliver", "You get 9:16 or 16:9 files, ready to post on Instagram or YouTube.", "s6-poster.jpg", ""),
]


def page(name, title, body):
    nav = "".join(
        f'<a href="{p}.html"{" aria-current=page" if p == name else ""}>{l}</a>'
        for p, l in [("styles", "Styles"), ("work", "Work"), ("about", "About"), ("contact", "Contact")]
    )
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title}</title>
<meta name="description" content="Saksham Pandey edits reels, trailers and YouTube videos for creators and brands. 3+ years, six editing styles.">
<link rel="preload" href="fonts/BebasNeue-Bold.otf" as="font" type="font/otf" crossorigin>
<link rel="stylesheet" href="site.css?v={V}">
<script>document.documentElement.classList.add('js')</script>
</head>
<body data-page="{name}">
<a class="skip" href="#main">Skip to content</a>
<header class="bar">
  <a class="mark" href="index.html">Saksham Pandey</a>
  <nav aria-label="Main">{nav}<a class="btn" data-book href="contact.html">Book an edit</a></nav>
</header>
<main id="main">
{body}
</main>
<footer class="foot">
  <video class="foot-pic" src="media/same-still.mp4" poster="media/same-still.jpg" muted loop playsinline preload="none" aria-label="A brass globe from a Still Life reel"></video>
  <div class="foot-menu rise">
    <nav aria-label="Footer">
      <a href="index.html">Home</a><a href="styles.html">Styles</a><a href="work.html">Work</a><a href="about.html">About</a><a href="contact.html">Contact</a>
    </nav>
    <p class="small">© 2026 Saksham Pandey. Orbit sample footage: <a href="https://www.youtube.com/watch?v=D_UU8Mty6u8" rel="noopener">Fireside Chat, Resilience Conference</a> (CC BY).</p>
  </div>
</footer>
<dialog id="player" aria-label="Video with sound">
  <form method="dialog"><button class="btn" value="close">Close</button></form>
  <video controls playsinline></video>
</dialog>
<script src="config.js?v={V}"></script>
<script src="site.js?v={V}"></script>
<script src="vendor/three.min.js"></script>
<script src="three3d.js?v={V}"></script>
</body>
</html>
"""


def frame(k, cls="", label=""):
    return (f'<video class="clip {cls}" src="media/{k}-loop.mp4" poster="media/{k}-poster.jpg" '
            f'muted loop playsinline preload="none" aria-label="{label}"></video>')


CTA = """
<section class="cta">
  <h2>Got a video to edit?</h2>
  <div class="cta-text">
    <p class="lead">Send the raw footage or just a voice note, and we'll pick the style together.</p>
    <a class="btn btn-light" data-book href="contact.html">Book an edit</a>
  </div>
  <div class="reel-3d" aria-hidden="true"></div>
</section>"""

HOME = """
<section class="mag">
  <div class="mag-black" aria-hidden="true"></div>
  <div class="mag-left">
    <p class="lead">I edit reels, trailers and YouTube videos for creators and brands.</p>
    <a class="btn btn-light" data-book href="contact.html">Book an edit</a>
    <a class="link" href="work.html">See the work</a>
  </div>
  <div class="mag-badges">
    <a class="dot dot-w" href="work.html"><b>0:13</b><small>Reel</small></a>
    <a class="dot dot-r" href="styles.html"><b>6</b><small>Styles</small></a>
    <a class="dot dot-k" href="about.html"><b>3+</b><small>Years</small></a>
  </div>
  <p class="mag-quote">Every word lands on the frame it is spoken.</p>
  <div class="pile">
    <img class="o o-clap" data-d="26" src="media/cut/clap.webp" alt="" width="707" height="749">
    <img class="o o-mic" data-d="-18" src="media/cut/mic.webp" alt="" width="515" height="860">
    <img class="o o-mega" data-d="34" src="media/cut/mega.webp" alt="" width="673" height="686">
    <video class="clip hero-frame" src="media/reel.mp4" poster="media/reel.jpg" muted loop playsinline autoplay aria-label="A fast showreel of six editing styles"></video>
  </div>
  <h1 class="mag-title"><span>Edited</span> <small>by</small> <span>Saksham Pandey</span></h1>
</section>

<section class="same" id="same">
  <div class="same-stage">
    <div class="same-text">
      <h2>One line, three edits</h2>
      <p class="quote">“Toh aakhir ye 90 din tak hamara paisa ghoom kahan raha?”</p>
      <p class="same-note" id="sameNote">Your face carries it, and a clean card explains the money.</p>
    </div>
    <div class="same-frame">
      <video data-k="margin" src="media/same-margin.mp4" poster="media/same-margin.jpg" muted playsinline preload="none" aria-label="The line edited as Margin Notes"></video>
      <video data-k="live" src="media/same-live.mp4" poster="media/same-live.jpg" muted playsinline preload="none" aria-label="The line edited as Live Edit"></video>
      <video data-k="still" src="media/same-still.mp4" poster="media/same-still.jpg" muted playsinline preload="none" aria-label="The line edited as Still Life"></video>
    </div>
    <div class="same-controls">
      <div class="pick" role="group" aria-label="Choose an edit">
        <button type="button" data-k="margin" aria-pressed="true">Margin Notes</button>
        <button type="button" data-k="live" aria-pressed="false">Live Edit</button>
        <button type="button" data-k="still" aria-pressed="false">Still Life</button>
      </div>
      <button type="button" class="link" id="sound" aria-pressed="false">Turn sound on</button>
    </div>
  </div>
</section>

<section class="tk">
  <h2>Reels, trailers and YouTube, cut to the frame</h2>
  <div class="tk-side rise">
    <div class="faces">
""" + "".join(f'      <a href="styles.html#{k}" aria-label="{n}"><img src="media/{k}-poster.jpg" alt="" width="96" height="96" loading="lazy"></a>\n' for k, n, _, _, _ in STYLES[:4]) + """    </div>
    <p>Six editing styles, from talking-head reels to voice-only worlds, each recoloured for your brand.</p>
    <div class="tiles"><img src="media/s4-poster.jpg" alt="A Still Life frame" loading="lazy"><img src="media/s2-poster.jpg" alt="A Yap frame" loading="lazy"></div>
  </div>
  <div class="ticket rise">
    <p class="ticket-name">Your next video</p>
    <dl>
      <div><dt>Format</dt><dd>9:16, 16:9</dd></div>
      <div><dt>Styles</dt><dd>Six</dd></div>
      <div><dt>Editing since</dt><dd>2023</dd></div>
      <div><dt>Based in</dt><dd>India</dd></div>
    </dl>
    <a class="btn btn-red" data-book href="contact.html">Book an edit</a>
  </div>
  <div class="tk-side tk-right rise">
    <p>Captions in English and Roman-script Hinglish, motion graphics, and sound design on every edit.</p>
    <a class="link" href="styles.html">See all six styles</a>
    <div class="tiles"><img src="media/s5-poster.jpg" alt="A Live Edit frame" loading="lazy"><img src="media/s6-poster.jpg" alt="An Orbit frame" loading="lazy"></div>
  </div>
</section>

<section class="finale">
  <h2>Saksham Pandey</h2>
  <p>3+ years</p>
  <p>India, remote</p>
  <img class="o-camera" data-d="16" src="media/cut/camera.webp" alt="A vintage film camera on a tripod" width="418" height="930" loading="lazy">
</section>
""" + CTA


def style_rows():
    out = []
    for i, (k, n, f, d, wide) in enumerate(STYLES):
        out.append(f"""
<section class="style{' style-red' if i % 2 else ''}{' style-wide' if wide else ''}" id="{k}">
  <button type="button" class="play" data-play="{k}" data-title="{n}" aria-label="Watch {n} with sound">
    {frame(k, 'style-clip', n + ' edit')}
  </button>
  <div class="style-text rise">
    <h2>{n}</h2>
    <p class="lead">{f}</p>
    <p>{d}</p>
    <button type="button" class="link" data-play="{k}" data-title="{n}">Watch with sound</button>
  </div>
</section>""")
    return "".join(out)


STYLES_PAGE = """
<section class="page-head">
  <div>
    <h1>Six styles, one editor</h1>
    <p class="lead">Each style has its own rules for type, colour, motion and sound, and each one can be recoloured for your brand.</p>
    <a class="btn" data-book href="contact.html">Book an edit</a>
  </div>
  <div class="ring-3d">
  <div class="strip">
""" + "".join(f'    <a style="--i:{i}" href="#{k}" aria-label="{n}"><img src="media/{k}-poster.jpg" alt="A frame from {n}" width="270" height="480"></a>\n' for i, (k, n, _, _, w) in enumerate(STYLES)) + """  </div>
  </div>
</section>
""" + style_rows() + CTA

WORK_PAGE = """
<section class="work">
  <div class="work-held">
""" + "".join(
    f'    <video data-k="{k}" src="media/{k}-loop.mp4" poster="media/{k}-poster.jpg" muted loop playsinline preload="none" aria-label="{n}"></video>\n'
    for k, n, _, _ in WORK) + """  </div>
  <div class="work-list">
    <h1>The work</h1>
    <p class="lead">Tap any title to watch it with sound.</p>
    <a class="btn work-book" data-book href="contact.html">Book an edit</a>
""" + "".join(
    f'    <button type="button" class="work-row rise" data-k="{k}" data-play="{k}" data-title="{n}"><img class="work-thumb" src="media/{k}-poster.jpg" alt="" loading="lazy"><span class="work-name">{n}</span><span class="work-fact">{m}</span></button>\n'
    for k, n, m, _ in WORK) + """  </div>
</section>
""" + CTA

ABOUT_PAGE = """
<section class="about-head">
  <h1>3+ years cutting for the scroll</h1>
  <div>
    <p class="lead">I'm Saksham, a freelance video editor and motion designer in India, working remotely since January 2023.</p>
    <p>I edit Instagram reels, YouTube videos, ads and trailers. I studied electronics and communication engineering at Galgotias University.</p>
    <a class="btn" data-book href="contact.html">Book an edit</a>
  </div>
  <dl class="facts rise">
    <div><dt>Editing</dt><dd>Premiere Pro, Final Cut Pro, DaVinci Resolve</dd></div>
    <div><dt>Motion</dt><dd>Motion graphics, kinetic type, animated captions</dd></div>
    <div><dt>Sound</dt><dd>Sound design, music edits, voice clean-up</dd></div>
    <div><dt>Captions</dt><dd>English and Roman-script Hinglish</dd></div>
    <div><dt>Projects</dt><dd>VOX Ai promo, Renovate Ai ad, viral Instagram reels</dd></div>
  </dl>
</section>
""" + "".join(f"""
<section class="verb{' verb-red' if c else ''}">
  <h2 class="verb-word rise">{v}</h2>
  <div class="verb-side rise">
    <img src="media/{img}" alt="A frame from a {v.lower()} stage of an edit" width="540" height="960" loading="lazy">
    <p class="lead">{t}</p>
  </div>
</section>""" for v, t, img, c in VERBS) + CTA

CONTACT_PAGE = """
<section class="contact">
  <div class="contact-top">
    <div>
      <h1>Tell me about your video</h1>
      <p class="lead">Send raw footage, a voice note or just an idea.</p>
      <div class="ways" id="ways"></div>
    </div>
    <div class="trio rise">
      <img src="media/same-margin.jpg" alt="The same line edited as Margin Notes" width="270" height="480">
      <img src="media/same-live.jpg" alt="The same line edited as Live Edit" width="270" height="480">
      <img src="media/same-still.jpg" alt="The same line edited as Still Life" width="270" height="480">
    </div>
  </div>
  <a class="mail rise" id="mail" href="mailto:sakshammpandey.9@gmail.com?subject=Video%20edit%20enquiry">sakshammpandey.9@gmail.com</a>
</section>"""

PAGES = {
    "index": ("home", "Saksham Pandey, video editor", HOME),
    "styles": ("styles", "Editing styles · Saksham Pandey", STYLES_PAGE),
    "work": ("work", "Work · Saksham Pandey", WORK_PAGE),
    "about": ("about", "About · Saksham Pandey", ABOUT_PAGE),
    "contact": ("contact", "Contact · Saksham Pandey", CONTACT_PAGE),
}
for fn, (name, title, body) in PAGES.items():
    (HERE / f"{fn}.html").write_text(page(name, title, body), encoding="utf-8")
    print("wrote", fn + ".html")

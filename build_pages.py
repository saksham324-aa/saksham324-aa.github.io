"""Writes the one-page site: hook, info, videos, end. Run after editing: python build_pages.py"""
import pathlib

HERE = pathlib.Path(__file__).parent
V = "24"  # bump to bust the browser cache after changing css/js

STYLES = [
    ("s1", "Margin Notes", "Talking-head reels with clean explainer cards"),
    ("s2", "Yap", "Big lines turned into full-screen kinetic type"),
    ("s3", "Trailer", "16:9 launches cut to the beat of the music"),
    ("s4", "Still Life", "Voice-only reels, every frame built"),
    ("s5", "Live Edit", "70% motion graphics, 30% face"),
    ("s6", "Orbit", "One seated shot turned into a scene"),
]
SKILLS = [
    ("Cut", "Pauses and retakes come out on word boundaries, never mid-word."),
    ("Caption", "Every word lands on its spoken frame, in English or Hinglish."),
    ("Animate", "Cards, type and charts act out the idea, and never cover your face."),
    ("Mix", "Real music and sound effects sit on the beats, with your voice clear."),
    ("Deliver", "9:16 or 16:9 files, ready to post."),
]

cards = "".join(f"""
    <button type="button" class="card rise" style="--i:{i}" data-play="{k}" data-title="{n}" aria-label="Watch {n} with sound">
      <video src="media/{k}-loop.mp4" poster="media/{k}-poster.jpg" muted loop playsinline preload="none"></video>
      <span class="card-text"><strong>{n}</strong><span>{d}</span></span>
    </button>""" for i, (k, n, d) in enumerate(STYLES))

skills = "".join(f"\n      <div class=\"skill rise\" style=\"--i:{i}\"><dt>{n}</dt><dd>{d}</dd></div>" for i, (n, d) in enumerate(SKILLS))

BODY = f"""
<section class="hook" id="hook">
  <div class="reactor" aria-hidden="true"><i></i><i></i><i></i><b></b></div>
  <div class="reactor-3d" aria-hidden="true"></div>
  <div class="hook-text">
    <h1>You have <span>2 seconds</span></h1>
    <p class="lead">I'm Saksham Pandey, a video editor. I make them count.</p>
    <div class="acts"><a class="btn" data-book href="#end">Book an edit</a><a class="link" href="#videos">See my videos</a></div>
  </div>
</section>

<section class="info" id="info">
  <div class="info-head rise">
    <h2>The editor behind the reels</h2>
    <p class="lead">I'm a freelance video editor and motion designer in India, working remotely since January 2023 on reels, YouTube videos, ads and trailers.</p>
    <p>Premiere Pro, Final Cut Pro, DaVinci Resolve.</p>
  </div>
  <div class="gauges rise" role="list">
    <div class="gauge" role="listitem"><svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="52"/><circle class="arc" cx="60" cy="60" r="52" pathLength="100" style="--v:75"/></svg><b>3+</b><span>Years editing</span></div>
    <div class="gauge" role="listitem"><svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="52"/><circle class="arc" cx="60" cy="60" r="52" pathLength="100" style="--v:100"/></svg><b>6</b><span>Editing styles</span></div>
    <div class="gauge" role="listitem"><svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="52"/><circle class="arc" cx="60" cy="60" r="52" pathLength="100" style="--v:50"/></svg><b>2</b><span>Formats, 9:16 and 16:9</span></div>
  </div>
  <dl class="skills">{skills}
  </dl>
</section>

<section class="videos" id="videos">
  <div class="videos-head">
    <h2>My videos</h2>
    <p class="lead">Tap any video to watch it with sound.</p>
  </div>
  <div class="same" id="same">
    <div class="same-stage">
      <div class="same-text">
        <h3>One line, three edits</h3>
        <p class="quote">“Toh aakhir ye 90 din tak hamara paisa ghoom kahan raha?”</p>
        <p id="sameNote">Your face carries it, and a clean card explains the money.</p>
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
  </div>
  <div class="grid" id="grid">{cards}
  </div>
</section>

<section class="end" id="end">
  <h2>Your video is next</h2>
  <p class="lead">Send raw footage, a voice note or just an idea.</p>
  <a class="mail" href="mailto:sakshammpandey.9@gmail.com?subject=Video%20edit%20enquiry">sakshammpandey.9@gmail.com</a>
  <div class="ways" id="ways"></div>
  <p class="small">© 2026 Saksham Pandey. Orbit sample footage: <a href="https://www.youtube.com/watch?v=D_UU8Mty6u8" rel="noopener">Fireside Chat, Resilience Conference</a> (CC BY).</p>
</section>"""

PAGE = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Saksham Pandey, video editor</title>
<meta name="description" content="Saksham Pandey edits reels, trailers and YouTube videos for creators and brands. 3+ years, six editing styles.">
<link rel="preload" href="fonts/BebasNeue-Bold.otf" as="font" type="font/otf" crossorigin>
<link rel="stylesheet" href="site.css?v={V}">
<script>document.documentElement.classList.add('js')</script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="bar">
  <a class="mark" href="#hook">Saksham Pandey</a>
  <nav aria-label="Main"><a href="#info">About</a><a href="#videos">Videos</a><a href="#end">Contact</a><a class="btn" data-book href="#end">Book an edit</a></nav>
</header>
<main id="main">
{BODY}
</main>
<dialog id="player" aria-label="Video with sound">
  <form method="dialog"><button class="btn" value="close">Close</button></form>
  <video controls playsinline></video>
</dialog>
<script src="config.js?v={V}"></script>
<script src="site.js?v={V}"></script>
<script src="vendor/three.min.js"></script>
<script src="three3d.js?v={V}"></script>
<script src="avatar.js?v={V}"></script>
</body>
</html>
"""

(HERE / "index.html").write_text(PAGE, encoding="utf-8")
# the old pages send visitors to the matching part of the story
for old, part in [("styles", "videos"), ("work", "videos"), ("about", "info"), ("contact", "end")]:
    (HERE / f"{old}.html").write_text(
        f'<!doctype html><meta charset="utf-8"><title>Saksham Pandey</title>'
        f'<meta http-equiv="refresh" content="0;url=index.html#{part}"><a href="index.html#{part}">Continue</a>\n', encoding="utf-8")
print("wrote index.html")

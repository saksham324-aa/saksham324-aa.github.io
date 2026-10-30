"""Writes the one-page site: hook, info, videos, end. Run after editing: python build_pages.py"""
import pathlib

HERE = pathlib.Path(__file__).parent
V = "32"  # bump to bust the browser cache after changing css/js

REELS = [
    ("s1", "Margin Notes", "Talking-head reel", False),
    ("s2", "Yap", "Kinetic-type reel", False),
    ("s3", "Trailer", "16:9 launch trailer", True),
    ("s4", "Still Life", "Voice only, every frame built", False),
    ("s5", "Live Edit", "70% motion graphics", False),
    ("s6", "Orbit", "One seated shot", False),
]

reels = "".join(f"""
      <button type="button" class="reel{' wide' if w else ''}" data-play="{k}" data-title="{n}" aria-label="Watch {n} with sound">
        <video src="media/{k}-loop.mp4" poster="media/{k}-poster.jpg" muted loop playsinline preload="none"></video>
        <span><strong>{n}</strong> {d}</span>
      </button>""" for k, n, d, w in REELS)

BODY = f"""
<section class="hook" id="hook">
  <h1>You stopped scrolling.</h1>
  <p class="job">That's the job.</p>
  <div class="hook-foot">
    <p>Saksham Pandey, video editor for creators and brands.</p>
    <a class="btn" data-book href="#end">Book an edit</a>
  </div>
</section>

<section class="info" id="info">
  <div class="info-stage">
    <h2>I'm Saksham</h2>
    <p class="lit" id="lit">For 3+ years I've edited reels, trailers and YouTube videos so that every word lands on the frame it's spoken, every cut lands on a beat, and nobody gets a reason to leave.</p>
  </div>
</section>

<section class="work" id="videos">
  <div class="same" id="same">
    <div class="same-stage">
      <div class="same-text">
        <h2>Same line. Three edits.</h2>
        <p class="quote">“Toh aakhir ye 90 din tak hamara paisa ghoom kahan raha?”</p>
        <p class="note" id="sameNote">Your face carries it, and a clean card explains the money.</p>
        <button type="button" class="link" id="sound" aria-pressed="false">Turn sound on</button>
      </div>
      <div class="same-frame">
        <video data-k="margin" src="media/same-margin.mp4" poster="media/same-margin.jpg" muted playsinline preload="none" aria-label="The line edited as Margin Notes"></video>
        <video data-k="live" src="media/same-live.mp4" poster="media/same-live.jpg" muted playsinline preload="none" aria-label="The line edited as Live Edit"></video>
        <video data-k="still" src="media/same-still.mp4" poster="media/same-still.jpg" muted playsinline preload="none" aria-label="The line edited as Still Life"></video>
      </div>
      <div class="pick" role="group" aria-label="Choose an edit">
        <button type="button" data-k="margin" aria-pressed="true">Margin Notes</button>
        <button type="button" data-k="live" aria-pressed="false">Live Edit</button>
        <button type="button" data-k="still" aria-pressed="false">Still Life</button>
      </div>
    </div>
  </div>
  <div class="strip" id="strip">
    <div class="strip-stage">
      <h2>Six styles, one editor</h2>
      <div class="track" id="track">{reels}
      </div>
    </div>
  </div>
</section>

<section class="end" id="end">
  <h2>Your turn.</h2>
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
<link rel="preload" href="fonts/BricolageGrotesque.ttf" as="font" type="font/ttf" crossorigin>
<link rel="stylesheet" href="site.css?v={V}">
<script>document.documentElement.classList.add('js')</script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="bar">
  <a class="mark" href="#hook">Saksham Pandey</a>
  <nav aria-label="Main"><a href="#info">About</a><a href="#videos">Videos</a><a href="#end">Contact</a></nav>
</header>
<main id="main">
{BODY}
</main>
<div class="feed" id="feed" aria-hidden="true"></div>
<dialog id="player" aria-label="Video with sound">
  <form method="dialog"><button class="btn" value="close">Close</button></form>
  <video controls playsinline></video>
</dialog>
<script src="config.js?v={V}"></script>
<script src="site.js?v={V}"></script>
</body>
</html>
"""

(HERE / "index.html").write_text(PAGE, encoding="utf-8")
print("wrote index.html")

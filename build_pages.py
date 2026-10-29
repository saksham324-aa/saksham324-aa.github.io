"""Writes the site's HTML pages from shared pieces. Run after editing: python build_pages.py"""
import pathlib

HERE = pathlib.Path(__file__).parent

def page(name, title, desc, body):
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="site.css">
</head>
<body data-page="{name}">
{body}
<script src="config.js"></script>
<script src="site.js"></script>
</body>
</html>
"""

CAROUSEL = """
<section id="carousel">
  <div class="stick">
    <div class="glow" id="cglow" style="width:800px;height:800px;right:5%;top:10%;opacity:.25;background:#2D4CF5;transition:background .6s"></div>
    <div class="cinfo">
      <div class="count mono"><b id="cnum">01</b> / 06 · Style library · scroll to turn</div>
      <div class="swap" id="cswap">
        <h3 class="disp" id="ctitle"></h3>
        <div class="for mono" id="cfor"></div>
        <p id="cdesc"></p>
        <ul id="clist"></ul>
      </div>
      <button class="watch mono" id="cwatch">▶ Watch with sound</button>
    </div>
    <div class="stage"><div class="floor"></div><div class="cyl" id="cyl"></div></div>
    <div class="dots" id="dots"></div>
  </div>
</section>"""

END_CARD = """
<section class="end" id="cta">
  <div class="glow" style="width:900px;height:900px;left:50%;top:50%;transform:translate(-50%,-50%);background:var(--rec);opacity:.2"></div>
  <div class="mono reveal" style="font-size:14px;color:var(--hi);margin-bottom:20px">Up next · your video</div>
  <h2 class="disp reveal">Let's make it<br><span class="red">move</span>.</h2>
  <div class="pill reveal">
    <span class="badge" data-initials></span>
    <div class="t"><b data-name></b><span data-email></span></div>
    <a class="btn" data-book>Book an edit
      <svg class="cursor" viewBox="0 0 24 24"><path d="M4 2l16 9-7 2-3 7z" fill="#fff" stroke="#111" stroke-width="1.5" stroke-linejoin="round"/></svg></a>
  </div>
  <a class="mono reveal" href="contact.html" style="margin-top:34px;font-size:12px;color:var(--dim)">All contact details →</a>
</section>"""

PROCESS = """
<section id="process">
  <div class="stick wrap">
    <div class="sh" style="padding:0">
      <div class="mono">Process</div>
      <h2 class="disp">From raw file to <span class="red">ready to post</span>.</h2>
    </div>
    <div class="tracks">
      <div class="ruler2 mono"><span>00:00</span><span>Day 1</span><span>Day 1</span><span>Day 2</span><span>Day 2</span><span>Day 3</span></div>
      <div class="clips">
        <div class="clip" style="--c:var(--dim)"><span class="mono">V1 · Brief</span><b>Send raw</b><span>Footage, a voice note or podcast files. We pick a style.</span></div>
        <div class="clip" style="--c:var(--rec)"><span class="mono">V2 · Cut</span><b>Tight cut</b><span>Pauses and retakes out, cut on word edges.</span></div>
        <div class="clip" style="--c:var(--hi)"><span class="mono">V3 · Words</span><b>Captions</b><span>Transcribed, every word timed to its frame.</span></div>
        <div class="clip" style="--c:var(--blue)"><span class="mono">V4 · Motion</span><b>Graphics</b><span>Hook, cards, type scenes and transitions.</span></div>
        <div class="clip" style="--c:var(--violet)"><span class="mono">A1 · Sound</span><b>Sound mix</b><span>Music bed, SFX on every beat, mastered loud.</span></div>
        <div class="clip last"><span class="mono">Export</span><b>Delivered</b><span>9:16 or 16:9, ready to post. One round of changes included.</span></div>
      </div>
      <div class="wave" id="wave"></div>
      <div class="phead" id="phead"></div>
    </div>
  </div>
</section>"""

HOME = """
<header class="wrap hero">
  <div class="glow" style="width:700px;height:700px;right:-100px;top:-120px;background:var(--rec);opacity:.18"></div>
  <div class="glow" style="width:600px;height:600px;right:200px;bottom:-200px;background:var(--blue);opacity:.22"></div>
  <div style="position:relative;z-index:2">
    <div class="kicker mono">Video editor · Motion designer</div>
    <h1 class="disp"><span><i>Saksham</i></span><span><i>Pandey</i></span></h1>
    <p class="lead">Short-form edits that <span class="hl">move on every word</span>. Reels, trailers and motion graphics for creators and brands.</p>
    <div class="stats">
      <div><b data-count="3" data-suffix="+">0</b><small class="mono">Years editing</small></div>
      <div><b data-count="6">0</b><small class="mono">Signature styles</small></div>
      <div><b>9:16<span style="color:var(--dim);font-size:.55em"> + </span>16:9</b><small class="mono">Reels &amp; trailers</small></div>
    </div>
    <div class="ctas"><a class="cta" href="styles.html">▶ Watch the styles</a><a class="cta ghost" data-book>Book an edit</a></div>
  </div>
  <div class="orbit" id="orbit">
    <div class="scene" id="oscene">
      <div class="ring" id="ring"></div>
      <div class="core">
        <div class="phone"><video src="media/s2-loop.mp4" poster="media/s2-poster.jpg" muted loop playsinline autoplay></video></div>
        <div class="playing mono">● Now playing · Style 02 Yap</div>
      </div>
    </div>
  </div>
</header>
""" + CAROUSEL + """
<section class="wrap">
  <div class="sh reveal">
    <div class="mono">Selected work</div>
    <h2 class="disp">Six ways to tell<br>the same <span class="red">story</span>.</h2>
  </div>
  <div class="grid" id="grid" data-limit="3"></div>
  <div class="more"><a class="cta ghost" href="work.html">See all work →</a></div>
</section>
""" + END_CARD

STYLES = """
<section class="wrap pagehead">
  <div class="sh reveal" style="padding-top:0">
    <div class="mono">Style library</div>
    <h1 class="disp">Six ways to tell<br>the same <span class="red">story</span>.</h1>
    <p>Same raw footage, a different feel. Scroll to turn the library, or read each style below. Every style can be recoloured to your brand.</p>
  </div>
</section>
""" + CAROUSEL + """
<section class="wrap" id="rows"></section>
""" + END_CARD

WORK = """
<section class="wrap pagehead">
  <div class="sh reveal" style="padding-top:0">
    <div class="mono">Selected work</div>
    <h1 class="disp">The <span class="red">work</span>.</h1>
    <p>Each clip plays on its own. Tap any card to watch it with sound.</p>
  </div>
  <div class="filters mono">
    <button class="on" data-f="all">All</button><button data-f="reels">Talking-head reels</button><button data-f="motion">Motion graphics</button>
    <button data-f="trailers">Trailers</button><button data-f="podcast">Podcast clips</button><button data-f="nocam">No camera</button>
  </div>
  <div class="grid" id="grid"></div>
</section>
""" + END_CARD

ABOUT = """
<section class="wrap pagehead">
  <div class="sh reveal" style="padding-top:0">
    <div class="mono">Who's behind the timeline</div>
    <h1 class="disp">3+ years of cutting<br>for the <span class="red">scroll</span>.</h1>
  </div>
  <div class="about">
    <div class="reveal">
      <p>I'm <span data-name></span>, a short-form video editor and motion designer. For 3+ years I've edited for creators and brands: talking-head reels, kinetic-type explainers, launch trailers, interview cuts and fully animated voice-only reels.</p>
      <p style="margin-top:20px">I don't have one look. I have a library of six styles, and I pick (or build) the one that fits your content, your audience and your brand colours.</p>
      <div class="tags"><span>Hinglish &amp; English captions</span><span>Motion graphics</span><span>Kinetic typography</span><span>Sound design</span><span>Multicam sync</span><span>Trailers</span><span>AI-assisted visuals</span></div>
    </div>
    <div class="promise reveal">
      <div><span class="mono">01</span><p><b>Frame-exact captions</b><span>Every word appears on the frame it's spoken. Never early.</span></p></div>
      <div><span class="mono">02</span><p><b>A hook in the first 2 seconds</b><span>A cold-open teaser built from your strongest line.</span></p></div>
      <div><span class="mono">03</span><p><b>Clean, tight cuts</b><span>Pauses removed on word boundaries, never mid-word.</span></p></div>
      <div><span class="mono">04</span><p><b>Real sound design</b><span>Licensed SFX and music, mixed loud and clean for Instagram and YouTube.</span></p></div>
      <div><span class="mono">05</span><p><b>Your face stays clear</b><span>Graphics live around you, never on you.</span></p></div>
    </div>
  </div>
  <div class="bignums reveal">
    <div><b data-count="3" data-suffix="+">0</b><span class="mono">Years editing</span></div>
    <div><b data-count="6">0</b><span class="mono">Signature styles</span></div>
    <div><b>9:16</b><span class="mono">Reels, shorts, stories</span></div>
    <div><b>16:9</b><span class="mono">YouTube &amp; trailers</span></div>
  </div>
</section>
""" + PROCESS + END_CARD

CONTACT = """
<section class="wrap pagehead">
  <div class="sh reveal" style="padding-top:0">
    <div class="mono">Contact</div>
    <h1 class="disp">Let's <span class="red">talk</span>.</h1>
    <p>Send your raw footage, a voice note or just an idea. I usually reply within a day.</p>
  </div>
  <div class="cwrap">
    <div>
      <div class="me reveal"><span class="badge" data-initials></span><div><b data-name></b><span class="mono" style="font-size:12px">Video editor · Motion designer · 3+ years</span></div></div>
      <div class="cgrid" id="cgrid"></div>
    </div>
    <div class="book reveal" id="book">
      <div class="mono" style="font-size:13px;color:var(--hi)">Book an edit</div>
      <h2 class="disp">Schedule a <span class="red">call</span>.</h2>
      <p>Fill a short form and pick a time. We'll talk about your video, the style and the timeline.</p>
      <ol><li>Tell me about your video</li><li>Pick a time for a quick call</li><li>Get your first cut in 2–3 days</li></ol>
      <a class="cta" data-book>Book a call ↗</a>
    </div>
  </div>
</section>"""

PAGES = {
    "index":   ("home",    "Saksham Pandey · Video Editor", HOME),
    "styles":  ("styles",  "Styles · Saksham Pandey", STYLES),
    "work":    ("work",    "Work · Saksham Pandey", WORK),
    "about":   ("about",   "About · Saksham Pandey", ABOUT),
    "contact": ("contact", "Contact · Saksham Pandey", CONTACT),
}
DESC = "Short-form video editor and motion designer. 3+ years, six signature editing styles: reels, trailers and motion graphics."
for fn, (name, title, body) in PAGES.items():
    (HERE / f"{fn}.html").write_text(page(name, title, DESC, body), encoding="utf-8")
    print("wrote", fn + ".html")

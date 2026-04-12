"""Restore all CSS to exact Figma 1920x1080 proportions, just vw/vh units."""
import pathlib

layout = pathlib.Path(r'e:\project\aeterna\assets\css\layout')
sections = pathlib.Path(r'e:\project\aeterna\assets\css\sections')

# ================================================================
# sidebar.css — exact Figma: width 115, padding 59/34, gap 70, icon-wrap 44, icon 28
# ================================================================
(layout / 'sidebar.css').write_text("""\
/* ================================================
   Sidebar -- responsive (exact Figma ratio)
   ================================================ */

#sidebar {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
  pointer-events: all;
}
.sidebar__pill {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: clamp(58px, 5.99vw, 115px);
  padding: clamp(30px, 5.46vh, 59px) clamp(17px, 1.77vw, 34px);
  border-radius: 0 var(--radius-sidebar-r) var(--radius-sidebar-r) 0;
  overflow: hidden;
}
.sidebar__pill::before {
  content: ''; position: absolute; inset: 0; border-radius: inherit;
  background: var(--color-sidebar-bg);
  backdrop-filter: var(--blur-sidebar);
  -webkit-backdrop-filter: var(--blur-sidebar);
  pointer-events: none;
}
.sidebar__pill::after {
  content: ''; position: absolute; inset: 0; border-radius: inherit;
  box-shadow: var(--inset-glow-sidebar);
  pointer-events: none;
}
.sidebar__icons {
  position: relative;
  display: flex; flex-direction: column; align-items: center;
  gap: clamp(35px, 6.48vh, 70px);
  z-index: 1;
}
.sidebar__icon-wrap {
  position: relative;
  width: clamp(22px, 2.29vw, 44px);
  height: clamp(22px, 2.29vw, 44px);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  transition: background 0.2s ease, transform 0.2s ease;
}
.sidebar__icon-wrap:hover  { background: rgba(255,255,255,0.15); transform: scale(1.1); }
.sidebar__icon-wrap.active { background: rgba(255,255,255,0.2); }
.sidebar__icon-wrap img {
  width: clamp(14px, 1.46vw, 28px);
  height: clamp(14px, 1.46vw, 28px);
  object-fit: contain; pointer-events: none;
}
""", encoding='utf-8')

# ================================================================
# navbar.css — exact Figma ratios (unchanged, already correct)
# ================================================================
(layout / 'navbar.css').write_text("""\
/* ================================================
   Navbar -- responsive (exact Figma ratio)
   ================================================ */

#navbar {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 14.8vh;
  pointer-events: none;
  z-index: 20;
}

.navbar__logo {
  position: absolute;
  left: 4.1vw;
  top: 2.78vh;
  width: clamp(140px, 16.2vw, 311px);
  height: clamp(51px, 10.46vh, 113px);
  pointer-events: all;
}
.navbar__logo-part          { position: absolute; pointer-events: none; }
.navbar__logo-part--star    { inset: 0% 30.83% 64.05% 30.85%; }
.navbar__logo-part--text    { inset: 19.14% 0% 21.92% 0%; }
.navbar__logo-part--impact  { inset: 84.44% 19.88% 0% 19.86%; }
.navbar__logo-part img      { width: 100%; height: 100%; object-fit: contain; display: block; }

.navbar__right {
  position: absolute;
  left: clamp(200px, 34vw, 670px);
  right: 2.6vw;
  top: 3.06vh;
  height: 5.28vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  pointer-events: all;
}
.navbar__links { display: flex; align-items: center; gap: clamp(24px, 5.83vw, 112px); }
.navbar__link {
  font-family: var(--font-display);
  font-size: clamp(12px, 1.15vw, 22px);
  font-weight: 400;
  letter-spacing: 0.14em;
  color: var(--color-text-primary);
  white-space: nowrap;
  transition: opacity 0.2s ease;
  cursor: pointer;
}
.navbar__link:hover { opacity: 0.75; }
.navbar__auth { display: flex; align-items: center; gap: clamp(8px, 1.56vw, 30px); flex-shrink: 0; }
.btn-login, .btn-signin {
  display: flex; align-items: center; justify-content: center;
  padding: clamp(5px, 0.6vh, 10px) clamp(10px, 1.51vw, 29px);
  border-radius: var(--radius-pill);
  font-family: var(--font-display);
  font-size: clamp(11px, 1.04vw, 20px);
  letter-spacing: 0.15em;
  white-space: nowrap;
  cursor: pointer;
  transition: opacity 0.2s ease, background 0.2s ease;
}
.btn-login  { border: 1px solid var(--color-border-cream); background: transparent; color: var(--color-text-primary); }
.btn-login:hover  { background: rgba(245, 236, 219, 0.1); }
.btn-signin { background: var(--color-btn-signin-bg); color: var(--color-text-dark); border: none; }
.btn-signin:hover { opacity: 0.85; }
""", encoding='utf-8')

# ================================================================
# hero.css — exact Figma proportions
# char-name: top 247/1080=22.87vh, left calc(11.11%+1.18vw), width 637/1920=33.18vw, font 154/1920=8.02vw
# info: top 354/1080=32.78vh
# about-card: height 238/1080=22.04vh
# about-text: font 17/1920=0.885vw
# badge padding: 14/1080=1.3vh + 20/1920=1.04vw, icon 28/1920=1.46vw, text 18/1920=0.94vw
# char-frame: left 55.56%, top 111/1080=10.28vh, w 814/1920=42.4vw, h 555/1080=51.39vh
# nav-btn: w 126/1920=6.56vw, h 120/1080=11.11vh
# ================================================================
(sections / 'hero.css').write_text("""\
/* ================================================
   Hero Section -- responsive (exact Figma ratio)
   ================================================ */

/* Background blur layer */
#bg-layer {
  position: absolute;
  inset: -10%;
  width: 120%;
  height: 120%;
  filter: var(--blur-bg);
  z-index: 0;
}
#bg-layer img {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover; pointer-events: none;
}

/* Hero container */
#hero {
  position: absolute;
  inset: 0;
  z-index: 10;
  pointer-events: none;
}

/* Character name — Figma: top 247, left calc(11.11%+22.67), width 637, font-size 154 */
.hero__char-name {
  position: absolute;
  top: 22.87vh;
  left: calc(11.11% + 1.18vw);
  width: clamp(200px, 33.18vw, 637px);
  font-family: var(--font-display);
  font-size: clamp(40px, 8.02vw, 154px);
  font-weight: 400;
  letter-spacing: 0.18em;
  color: var(--color-text-primary);
  text-align: right;
  line-height: 1;
  white-space: nowrap;
  text-shadow: 0 0 60px rgba(255,255,255,0.15);
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.hero__char-name.transitioning { opacity: 0; transform: translateY(-10px); }

/* Left info panel — Figma: top 354, same left, width 637 */
.hero__info {
  position: absolute;
  top: 32.78vh;
  left: calc(11.11% + 1.18vw);
  width: clamp(200px, 33.18vw, 637px);
  display: flex; flex-direction: column;
  gap: clamp(14px, 2.96vh, 32px);
  pointer-events: all;
}

/* About card — Figma: height 238 */
.hero__about-card {
  position: relative;
  width: 100%;
  height: clamp(120px, 22.04vh, 238px);
  border-radius: var(--radius-panel);
  overflow: hidden;
}
.hero__about-card::before {
  content: ''; position: absolute; inset: 0; border-radius: inherit;
  background: var(--color-glass-bg);
  backdrop-filter: var(--blur-glass); -webkit-backdrop-filter: var(--blur-glass);
}
.hero__about-card::after {
  content: ''; position: absolute; inset: 0; border-radius: inherit;
  box-shadow: var(--inset-glow-panel); pointer-events: none;
}
.hero__about-text {
  position: relative; z-index: 1;
  height: 100%;
  padding: clamp(10px, 1.85vh, 20px);
  font-family: var(--font-ui);
  font-size: clamp(11px, 0.885vw, 17px);
  font-weight: 500;
  color: var(--color-text-primary);
  line-height: 1.65;
  overflow: hidden;
  transition: opacity 0.3s ease;
}
.hero__about-text.transitioning { opacity: 0; }

/* Tags row */
.hero__tags {
  display: flex; align-items: center;
  gap: clamp(6px, 0.625vw, 12px);
  flex-wrap: wrap;
}

/* Element badge — Figma: padding 14/20, icon 28, text 18 */
.badge-element {
  position: relative;
  display: flex; align-items: center;
  gap: clamp(4px, 0.42vw, 8px);
  padding: clamp(7px, 1.3vh, 14px) clamp(10px, 1.04vw, 20px);
  border-radius: var(--radius-badge);
  overflow: hidden; cursor: default;
}
.badge-element::before {
  content: ''; position: absolute; inset: 0; border-radius: inherit;
  background: var(--color-glass-bg);
  backdrop-filter: var(--blur-glass); -webkit-backdrop-filter: var(--blur-glass);
}
.badge-element::after {
  content: ''; position: absolute; inset: 0; border-radius: inherit;
  box-shadow: var(--inset-glow-panel); pointer-events: none;
}
.badge-element__icon {
  position: relative; z-index: 1;
  width: clamp(14px, 1.46vw, 28px); height: clamp(14px, 1.46vw, 28px);
  object-fit: contain; flex-shrink: 0; transition: opacity 0.3s ease;
}
.badge-element__name {
  position: relative; z-index: 1;
  font-family: var(--font-ui);
  font-size: clamp(11px, 0.94vw, 18px); font-weight: 500;
  color: var(--color-text-primary); white-space: nowrap; transition: opacity 0.3s ease;
}

/* Stars badge */
.badge-stars {
  position: relative;
  display: flex; align-items: center;
  gap: clamp(3px, 0.31vw, 6px);
  padding: clamp(7px, 1.3vh, 14px) clamp(10px, 1.04vw, 20px);
  border-radius: var(--radius-badge); overflow: hidden; cursor: default;
}
.badge-stars::before {
  content: ''; position: absolute; inset: 0; border-radius: inherit;
  background: var(--color-glass-bg);
  backdrop-filter: var(--blur-glass); -webkit-backdrop-filter: var(--blur-glass);
}
.badge-stars::after {
  content: ''; position: absolute; inset: 0; border-radius: inherit;
  box-shadow: var(--inset-glow-panel); pointer-events: none;
}
.badge-stars__label {
  position: relative; z-index: 1;
  font-family: var(--font-ui); font-size: clamp(11px, 0.94vw, 18px);
  font-weight: 500; color: var(--color-text-primary); white-space: nowrap;
}
.badge-stars__icons { position: relative; z-index: 1; display: flex; align-items: center; gap: 2px; }
.badge-stars__icon  { width: clamp(7px, 0.73vw, 14px); height: clamp(7px, 0.73vw, 14px); object-fit: contain; }

/* More button */
.btn-more {
  position: relative;
  display: flex; align-items: center; gap: clamp(3px, 0.31vw, 6px);
  padding: clamp(7px, 1.2vh, 13px) clamp(10px, 1.04vw, 20px);
  border-radius: var(--radius-badge);
  mix-blend-mode: lighten; overflow: hidden; cursor: pointer;
  transition: opacity 0.2s ease;
}
.btn-more:hover { opacity: 0.8; }
.btn-more::before {
  content: ''; position: absolute; inset: 0; border-radius: inherit;
  background: var(--color-glass-bg);
  backdrop-filter: var(--blur-glass); -webkit-backdrop-filter: var(--blur-glass);
}
.btn-more::after {
  content: ''; position: absolute; inset: 0; border-radius: inherit;
  box-shadow: var(--inset-glow-panel); pointer-events: none;
}
.btn-more__label {
  position: relative; z-index: 1;
  font-family: var(--font-ui); font-size: clamp(11px, 1.04vw, 20px);
  font-weight: 500; color: var(--color-text-primary);
  text-decoration: underline; text-decoration-skip-ink: none; white-space: nowrap;
}
.btn-more__arrow {
  position: relative; z-index: 1;
  width: clamp(14px, 1.46vw, 28px); height: clamp(14px, 1.46vw, 28px);
  object-fit: contain; transform: rotate(-90deg);
}

/* ================================================
   Character Frame — Figma: left 55.56%, top 111, w 814, h 555
   ================================================ */
.char-frame {
  position: absolute;
  left: 55.56%;
  top: 10.28vh;
  width: clamp(300px, 42.4vw, 814px);
  height: clamp(200px, 51.39vh, 555px);
  display: flex; align-items: flex-end;
  z-index: 10; pointer-events: none;
}
.char-frame__art {
  position: absolute; inset: 0; pointer-events: none;
}
.char-frame__art img {
  width: 100%; height: 100%;
  object-fit: cover;
  border-radius: var(--radius-card);
  transition: opacity 0.3s ease;
}
.char-frame__art img.transitioning { opacity: 0; }

/* Nav button — Figma: w 126, h 120 */
.char-frame__nav-btn {
  position: absolute;
  left: -1px;
  bottom: clamp(3px, 0.56vh, 6px);
  width: clamp(63px, 6.56vw, 126px);
  height: clamp(60px, 11.11vh, 120px);
  border-radius: 65px;
  background: var(--color-glass-bg-light);
  backdrop-filter: var(--blur-nav-btn);
  -webkit-backdrop-filter: var(--blur-nav-btn);
  box-shadow: 0.926px 3.706px 7.875px 0px #e9edee;
  mix-blend-mode: overlay;
  opacity: 0.88;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; pointer-events: all;
  transition: opacity 0.2s ease, transform 0.2s ease;
  z-index: 15;
}
.char-frame__nav-btn:hover { opacity: 1; transform: scale(1.05); mix-blend-mode: normal; }
.char-frame__nav-btn svg {
  width: clamp(21px, 2.19vw, 42px);
  height: clamp(21px, 2.19vw, 42px);
  color: #555;
}
""", encoding='utf-8')

# ================================================================
# character-slider.css — exact Figma: bottom 28, height 311, left 11.11%, card width 340
# 28/1080=2.59vh, 311/1080=28.8vh, 340/1920=17.71vw
# ================================================================
(sections / 'character-slider.css').write_text("""\
/* ================================================
   Character Slider -- responsive (exact Figma ratio)
   ================================================ */

#character-slider {
  position: absolute;
  left: calc(11.11% + 1.18vw);
  bottom: 2.59vh;
  height: clamp(140px, 28.8vh, 311px);
  width: calc(100% - (11.11% + 1.18vw));
  overflow: hidden;
  z-index: 15; pointer-events: all;
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 4%, black 85%, transparent 100%);
  mask-image:         linear-gradient(to right, transparent 0%, black 4%, black 85%, transparent 100%);
}
.slider__track {
  display: flex;
  gap: clamp(12px, 1.46vw, 28px);
  height: 100%;
  transition: transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: transform;
  cursor: grab; user-select: none;
}
.slider__track.is-dragging { cursor: grabbing; transition: none; }

/* Character card — Figma: width 340 */
.char-card {
  position: relative; flex-shrink: 0;
  width: clamp(140px, 17.71vw, 340px);
  height: 100%;
  border-radius: var(--radius-card);
  overflow: hidden; cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s ease;
}
.char-card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0,0,0,0.35);
}
.char-card.active {
  box-shadow: 0 0 0 3px rgba(245,236,219,0.8), 0 16px 40px rgba(0,0,0,0.4);
  transform: translateY(-4px);
}
.char-card__img {
  width: 100%; height: 100%; object-fit: cover;
  border-radius: inherit; pointer-events: none;
  transition: transform 0.4s ease;
}
.char-card:hover .char-card__img { transform: scale(1.04); }
.char-card::after {
  content: ''; position: absolute; inset: 0; border-radius: inherit;
  box-shadow: var(--inset-glow-card); pointer-events: none;
}
.char-card__name {
  position: absolute; bottom: 0; left: 0; right: 0;
  padding: 40px 20px 18px;
  background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%);
  font-family: var(--font-display);
  font-size: clamp(10px, 0.83vw, 16px);
  font-weight: 600; letter-spacing: 2px;
  color: var(--color-text-primary);
  opacity: 0; transform: translateY(4px);
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.char-card:hover .char-card__name { opacity: 1; transform: translateY(0); }
""", encoding='utf-8')

print("All CSS restored to exact Figma proportions.")

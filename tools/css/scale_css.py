"""Scale down all components uniformly ~0.78x — same design, just smaller."""
import pathlib

layout = pathlib.Path(r'e:\project\aeterna\assets\css\layout')
sections = pathlib.Path(r'e:\project\aeterna\assets\css\sections')

# Scale factor: 0.78 applied to vw/vh preferred values
# Positions stay mostly same, sizes shrink

(layout / 'navbar.css').write_text("""\
/* ================================================
   Navbar -- responsive (scaled 0.78x)
   ================================================ */

#navbar {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 11.5vh;
  pointer-events: none;
  z-index: 20;
}

.navbar__logo {
  position: absolute;
  left: 4.1vw;
  top: 2.4vh;
  width: clamp(110px, 12.6vw, 243px);
  height: clamp(40px, 8.2vh, 88px);
  pointer-events: all;
}
.navbar__logo-part          { position: absolute; pointer-events: none; }
.navbar__logo-part--star    { inset: 0% 30.83% 64.05% 30.85%; }
.navbar__logo-part--text    { inset: 19.14% 0% 21.92% 0%; }
.navbar__logo-part--impact  { inset: 84.44% 19.88% 0% 19.86%; }
.navbar__logo-part img      { width: 100%; height: 100%; object-fit: contain; display: block; }

.navbar__right {
  position: absolute;
  left: clamp(160px, 26.5vw, 520px);
  right: 2.6vw;
  top: 2.6vh;
  height: 4.1vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  pointer-events: all;
}
.navbar__links { display: flex; align-items: center; gap: clamp(20px, 4.5vw, 87px); }
.navbar__link {
  font-family: var(--font-display);
  font-size: clamp(10px, 0.9vw, 17px);
  font-weight: 400;
  letter-spacing: 0.14em;
  color: var(--color-text-primary);
  white-space: nowrap;
  transition: opacity 0.2s ease;
  cursor: pointer;
}
.navbar__link:hover { opacity: 0.75; }
.navbar__auth { display: flex; align-items: center; gap: clamp(6px, 1.2vw, 23px); flex-shrink: 0; }
.btn-login, .btn-signin {
  display: flex; align-items: center; justify-content: center;
  padding: clamp(4px, 0.46vh, 8px) clamp(8px, 1.17vw, 23px);
  border-radius: var(--radius-pill);
  font-family: var(--font-display);
  font-size: clamp(9px, 0.81vw, 16px);
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

(layout / 'sidebar.css').write_text("""\
/* ================================================
   Sidebar -- responsive (scaled 0.78x)
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
  width: clamp(45px, 4.67vw, 90px);
  padding: clamp(23px, 4.26vh, 46px) clamp(13px, 1.38vw, 27px);
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
  gap: clamp(27px, 5.05vh, 55px);
  z-index: 1;
}
.sidebar__icon-wrap {
  position: relative;
  width: clamp(17px, 1.79vw, 34px);
  height: clamp(17px, 1.79vw, 34px);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  transition: background 0.2s ease, transform 0.2s ease;
}
.sidebar__icon-wrap:hover  { background: rgba(255,255,255,0.15); transform: scale(1.1); }
.sidebar__icon-wrap.active { background: rgba(255,255,255,0.2); }
.sidebar__icon-wrap img {
  width: clamp(11px, 1.14vw, 22px);
  height: clamp(11px, 1.14vw, 22px);
  object-fit: contain; pointer-events: none;
}
""", encoding='utf-8')

(sections / 'hero.css').write_text("""\
/* ================================================
   Hero Section -- responsive (scaled 0.78x)
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

/* Character name — scaled from 8.02vw → 6.25vw */
.hero__char-name {
  position: absolute;
  top: 22.87vh;
  left: calc(11.11% + 1.18vw);
  width: clamp(160px, 25.88vw, 497px);
  font-family: var(--font-display);
  font-size: clamp(32px, 6.25vw, 120px);
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

/* Left info panel — scaled width from 33.18vw → 25.88vw */
.hero__info {
  position: absolute;
  top: 32.78vh;
  left: calc(11.11% + 1.18vw);
  width: clamp(160px, 25.88vw, 497px);
  display: flex; flex-direction: column;
  gap: clamp(11px, 2.31vh, 25px);
  pointer-events: all;
}

/* About card — scaled height from 22.04vh → 17.19vh */
.hero__about-card {
  position: relative;
  width: 100%;
  height: clamp(94px, 17.19vh, 186px);
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
  padding: clamp(8px, 1.44vh, 16px);
  font-family: var(--font-ui);
  font-size: clamp(9px, 0.69vw, 13px);
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
  gap: clamp(5px, 0.49vw, 9px);
  flex-wrap: wrap;
}

/* Element badge — scaled padding & sizes */
.badge-element {
  position: relative;
  display: flex; align-items: center;
  gap: clamp(3px, 0.33vw, 6px);
  padding: clamp(5px, 1.01vh, 11px) clamp(8px, 0.81vw, 16px);
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
  width: clamp(11px, 1.14vw, 22px); height: clamp(11px, 1.14vw, 22px);
  object-fit: contain; flex-shrink: 0; transition: opacity 0.3s ease;
}
.badge-element__name {
  position: relative; z-index: 1;
  font-family: var(--font-ui);
  font-size: clamp(9px, 0.73vw, 14px); font-weight: 500;
  color: var(--color-text-primary); white-space: nowrap; transition: opacity 0.3s ease;
}

/* Stars badge */
.badge-stars {
  position: relative;
  display: flex; align-items: center;
  gap: clamp(2px, 0.24vw, 5px);
  padding: clamp(5px, 1.01vh, 11px) clamp(8px, 0.81vw, 16px);
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
  font-family: var(--font-ui); font-size: clamp(9px, 0.73vw, 14px);
  font-weight: 500; color: var(--color-text-primary); white-space: nowrap;
}
.badge-stars__icons { position: relative; z-index: 1; display: flex; align-items: center; gap: 2px; }
.badge-stars__icon  { width: clamp(6px, 0.57vw, 11px); height: clamp(6px, 0.57vw, 11px); object-fit: contain; }

/* More button */
.btn-more {
  position: relative;
  display: flex; align-items: center; gap: clamp(2px, 0.24vw, 5px);
  padding: clamp(5px, 0.94vh, 10px) clamp(8px, 0.81vw, 16px);
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
  font-family: var(--font-ui); font-size: clamp(9px, 0.81vw, 16px);
  font-weight: 500; color: var(--color-text-primary);
  text-decoration: underline; text-decoration-skip-ink: none; white-space: nowrap;
}
.btn-more__arrow {
  position: relative; z-index: 1;
  width: clamp(11px, 1.14vw, 22px); height: clamp(11px, 1.14vw, 22px);
  object-fit: contain; transform: rotate(-90deg);
}

/* ================================================
   Character Frame — scaled from 42.4vw → 33.07vw, 51.39vh → 40.08vh
   ================================================ */
.char-frame {
  position: absolute;
  left: 55.56%;
  top: 10.28vh;
  width: clamp(234px, 33.07vw, 635px);
  height: clamp(156px, 40.08vh, 433px);
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

/* Nav button — scaled from 6.56vw → 5.12vw, 11.11vh → 8.67vh */
.char-frame__nav-btn {
  position: absolute;
  left: -1px;
  bottom: clamp(2px, 0.44vh, 5px);
  width: clamp(49px, 5.12vw, 98px);
  height: clamp(47px, 8.67vh, 94px);
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
  width: clamp(16px, 1.71vw, 33px);
  height: clamp(16px, 1.71vw, 33px);
  color: #555;
}
""", encoding='utf-8')

(sections / 'character-slider.css').write_text("""\
/* ================================================
   Character Slider -- responsive (scaled 0.78x)
   ================================================ */

#character-slider {
  position: absolute;
  left: calc(11.11% + 1.18vw);
  bottom: 2.59vh;
  height: clamp(109px, 22.46vh, 243px);
  width: calc(100% - (11.11% + 1.18vw));
  overflow: hidden;
  z-index: 15; pointer-events: all;
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 4%, black 85%, transparent 100%);
  mask-image:         linear-gradient(to right, transparent 0%, black 4%, black 85%, transparent 100%);
}
.slider__track {
  display: flex;
  gap: clamp(9px, 1.14vw, 22px);
  height: 100%;
  transition: transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: transform;
  cursor: grab; user-select: none;
}
.slider__track.is-dragging { cursor: grabbing; transition: none; }

/* Character card — scaled from 17.71vw → 13.81vw */
.char-card {
  position: relative; flex-shrink: 0;
  width: clamp(109px, 13.81vw, 265px);
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
  padding: 30px 16px 14px;
  background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%);
  font-family: var(--font-display);
  font-size: clamp(8px, 0.65vw, 12px);
  font-weight: 600; letter-spacing: 2px;
  color: var(--color-text-primary);
  opacity: 0; transform: translateY(4px);
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.char-card:hover .char-card__name { opacity: 1; transform: translateY(0); }
""", encoding='utf-8')

print("All 4 CSS files scaled down 0.78x — done.")

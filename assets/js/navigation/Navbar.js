/**
 * Navbar.js
 * Functional desktop/mobile navigation shell.
 */

const DESKTOP_LINKS = [
  { label: 'Platform', target: 'slider-section', activeFor: ['hero-section', 'slider-section', 'video-section'] },
  { label: 'Atlas', target: 'world-section', activeFor: ['world-section'] },
  { label: 'Impact', target: 'video-section-2', activeFor: ['video-section-2'] },
];

const MOBILE_LINKS = [
  { index: '01', label: 'Intro', target: 'hero-section' },
  { index: '02', label: 'Pillars', target: 'slider-section' },
  { index: '03', label: 'Living', target: 'video-section' },
  { index: '04', label: 'Atlas', target: 'world-section' },
  { index: '05', label: 'Impact', target: 'video-section-2' },
];

export function Navbar(container) {
  const desktopLinksHTML = DESKTOP_LINKS.map(
    (link) => `
      <button
        class="navbar__link ${link.label === 'Platform' ? 'active' : ''}"
        type="button"
        data-target="${link.target}"
        data-active-for="${link.activeFor.join(',')}"
      >
        ${link.label}
      </button>
    `
  ).join('');

  const mobileLinksHTML = MOBILE_LINKS.map(
    (link) => `
      <button
        class="navbar__mobile-link ${link.target === 'hero-section' ? 'active' : ''}"
        type="button"
        data-target="${link.target}"
      >
        <span class="navbar__mobile-index">${link.index}</span>
        <span class="navbar__mobile-text">${link.label}</span>
      </button>
    `
  ).join('');

  container.innerHTML = `
    <button class="navbar__mobile-backdrop" type="button" aria-label="Close navigation"></button>

    <div class="navbar__shell">
      <button class="navbar__logo" type="button" data-target="hero-section" aria-label="Go to introduction">
        <img class="navbar__logo-img" src="assets/media/images/backgrounds/logo.svg" alt="" aria-hidden="true" />
        <span class="navbar__logo-text">
          <span class="navbar__logo-word">AETERNA</span>
          <span class="navbar__logo-sub">ASEAN Heritage RPG</span>
        </span>
      </button>

      <div class="navbar__right">
        <nav class="navbar__links" role="navigation" aria-label="Main navigation">
          ${desktopLinksHTML}
        </nav>

        <div class="navbar__auth">
          <button class="btn-login" type="button" data-target="hero-section" aria-label="Read manifesto">Manifesto</button>
          <button class="btn-signin" type="button" data-target="video-section-2" aria-label="Partner with AETERNA">Partner</button>
        </div>

        <button class="navbar__menu-btn" type="button" aria-expanded="false" aria-controls="navbar-mobile-panel" aria-label="Open navigation">
          <span class="navbar__menu-line"></span>
          <span class="navbar__menu-line"></span>
          <span class="navbar__menu-line"></span>
        </button>
      </div>
    </div>

    <div class="navbar__mobile-panel" id="navbar-mobile-panel" aria-hidden="true">
      <div class="navbar__mobile-panel-inner">
        <p class="navbar__mobile-eyebrow">Journey Map</p>

        <nav class="navbar__mobile-nav" role="navigation" aria-label="Mobile navigation">
          ${mobileLinksHTML}
        </nav>

        <div class="navbar__mobile-actions">
          <button class="navbar__mobile-action navbar__mobile-action--ghost" type="button" data-target="hero-section">Manifesto</button>
          <button class="navbar__mobile-action navbar__mobile-action--solid" type="button" data-target="video-section-2">Partner</button>
        </div>
      </div>
    </div>
  `;
}

/**
 * Navbar.js
 * Functional desktop/mobile navigation shell.
 * - Fixed nav order to match page section sequence.
 * - Added language toggle EN / VI with full i18n map.
 */

/* ── i18n translation map ── */
const I18N = {
  en: {
    logoSub:       'ASEAN Heritage RPG',
    nav: {
      vision:   'Vision',
      pillars:  'Pillars',
      living:   'Living',
      atlas:    'Atlas',
      impact:   'Impact',
    },
    manifesto:     'Manifesto',
    partner:       'Partner',
    mobileEyebrow: 'Journey Map',
    mobileSections: [
      { index: '01', label: 'Intro',   target: 'hero-section' },
      { index: '02', label: 'Vision',  target: 'solution-section' },
      { index: '03', label: 'Pillars', target: 'slider-section' },
      { index: '04', label: 'Living',  target: 'video-section' },
      { index: '05', label: 'Atlas',   target: 'world-section' },
      { index: '06', label: 'Impact',  target: 'video-section-2' },
    ],
  },
  vi: {
    logoSub:       'Game RPG Di Sản ASEAN',
    nav: {
      vision:   'Tầm Nhìn',
      pillars:  'Trụ Cột',
      living:   'Di Sản',
      atlas:    'Bản Đồ',
      impact:   'Tác Động',
    },
    manifesto:     'Tuyên Ngôn',
    partner:       'Đối Tác',
    mobileEyebrow: 'Hành Trình',
    mobileSections: [
      { index: '01', label: 'Giới Thiệu', target: 'hero-section' },
      { index: '02', label: 'Tầm Nhìn',  target: 'solution-section' },
      { index: '03', label: 'Trụ Cột',   target: 'slider-section' },
      { index: '04', label: 'Di Sản',    target: 'video-section' },
      { index: '05', label: 'Bản Đồ',   target: 'world-section' },
      { index: '06', label: 'Tác Động',  target: 'video-section-2' },
    ],
  },
};

/* Desktop nav links — in page order */
const DESKTOP_LINKS = [
  { key: 'vision',  target: 'solution-section', activeFor: ['solution-section'] },
  { key: 'pillars', target: 'slider-section',   activeFor: ['slider-section'] },
  { key: 'living',  target: 'video-section',    activeFor: ['video-section'] },
  { key: 'atlas',   target: 'world-section',    activeFor: ['world-section'] },
  { key: 'impact',  target: 'video-section-2',  activeFor: ['video-section-2'] },
];

let currentLang = localStorage.getItem('aet-lang') || 'en';

function applyLang(container, lang) {
  const t = I18N[lang];

  /* Logo subtitle */
  const logoSub = container.querySelector('.navbar__logo-sub');
  if (logoSub) logoSub.textContent = t.logoSub;

  /* Desktop nav links */
  DESKTOP_LINKS.forEach(({ key, target }) => {
    const btn = container.querySelector(`.navbar__link[data-target="${target}"]`);
    if (btn) btn.textContent = t.nav[key];
  });

  /* Auth buttons */
  const manifestoBtn = container.querySelector('.btn-login');
  const partnerBtn   = container.querySelector('.btn-signin');
  if (manifestoBtn) manifestoBtn.textContent = t.manifesto;
  if (partnerBtn)   partnerBtn.textContent   = t.partner;

  /* Mobile eyebrow */
  const eyebrow = container.querySelector('.navbar__mobile-eyebrow');
  if (eyebrow) eyebrow.textContent = t.mobileEyebrow;

  /* Mobile nav links */
  t.mobileSections.forEach(({ index, label, target }) => {
    const btn = container.querySelector(`.navbar__mobile-link[data-target="${target}"]`);
    if (btn) {
      const txt = btn.querySelector('.navbar__mobile-text');
      if (txt) txt.textContent = label;
    }
  });

  /* Mobile action buttons */
  const mobileManifesto = container.querySelector('.navbar__mobile-action--ghost');
  const mobilePartner   = container.querySelector('.navbar__mobile-action--solid');
  if (mobileManifesto) mobileManifesto.textContent = t.manifesto;
  if (mobilePartner)   mobilePartner.textContent   = t.partner;

  /* Toggle button label */
  const langToggle = container.querySelector('.navbar__lang-toggle');
  if (langToggle) {
    langToggle.setAttribute('aria-label', lang === 'en' ? 'Switch to Vietnamese' : 'Chuyển sang tiếng Anh');
    langToggle.querySelector('.navbar__lang-active').textContent  = lang.toUpperCase();
    langToggle.querySelector('.navbar__lang-other').textContent   = lang === 'en' ? 'VI' : 'EN';
  }

  /* Update html lang attribute */
  document.documentElement.lang = lang;
}

export function Navbar(container) {
  const t = I18N[currentLang];

  const desktopLinksHTML = DESKTOP_LINKS.map(({ key, target }) => `
    <button
      class="navbar__link"
      type="button"
      data-target="${target}"
    >
      ${t.nav[key]}
    </button>
  `).join('');

  const mobileLinksHTML = t.mobileSections.map(({ index, label, target }) => `
    <button
      class="navbar__mobile-link ${target === 'hero-section' ? 'active' : ''}"
      type="button"
      data-target="${target}"
    >
      <span class="navbar__mobile-index">${index}</span>
      <span class="navbar__mobile-text">${label}</span>
    </button>
  `).join('');

  container.innerHTML = `
    <button class="navbar__mobile-backdrop" type="button" aria-label="Close navigation"></button>

    <div class="navbar__shell">
      <button class="navbar__logo" type="button" data-target="hero-section" aria-label="Go to introduction">
        <img class="navbar__logo-img" src="assets/media/images/backgrounds/logo.svg" alt="" aria-hidden="true" />
        <span class="navbar__logo-text">
          <span class="navbar__logo-word">AETERNA</span>
          <span class="navbar__logo-sub">${t.logoSub}</span>
        </span>
      </button>

      <div class="navbar__right">
        <nav class="navbar__links" role="navigation" aria-label="Main navigation">
          ${desktopLinksHTML}
        </nav>

        <div class="navbar__auth">
          <button class="btn-login" type="button" data-target="hero-section" aria-label="Read manifesto">${t.manifesto}</button>
          <button class="btn-signin" type="button" data-target="video-section-2" aria-label="Partner with AETERNA">${t.partner}</button>
        </div>

        <!-- Language toggle -->
        <button
          class="navbar__lang-toggle"
          type="button"
          id="lang-toggle-btn"
          aria-label="${currentLang === 'en' ? 'Switch to Vietnamese' : 'Chuyển sang tiếng Anh'}"
        >
          <span class="navbar__lang-active">${currentLang.toUpperCase()}</span>
          <span class="navbar__lang-sep" aria-hidden="true">/</span>
          <span class="navbar__lang-other">${currentLang === 'en' ? 'VI' : 'EN'}</span>
        </button>

        <button class="navbar__menu-btn" type="button" aria-expanded="false" aria-controls="navbar-mobile-panel" aria-label="Open navigation">
          <span class="navbar__menu-line"></span>
          <span class="navbar__menu-line"></span>
          <span class="navbar__menu-line"></span>
        </button>
      </div>
    </div>

    <div class="navbar__mobile-panel" id="navbar-mobile-panel" aria-hidden="true">
      <div class="navbar__mobile-panel-inner">
        <p class="navbar__mobile-eyebrow">${t.mobileEyebrow}</p>

        <nav class="navbar__mobile-nav" role="navigation" aria-label="Mobile navigation">
          ${mobileLinksHTML}
        </nav>

        <div class="navbar__mobile-actions">
          <button class="navbar__mobile-action navbar__mobile-action--ghost" type="button" data-target="hero-section">${t.manifesto}</button>
          <button class="navbar__mobile-action navbar__mobile-action--solid" type="button" data-target="video-section-2">${t.partner}</button>
        </div>
      </div>
    </div>
  `;

  /* ── Language toggle handler ── */
  const langBtn = container.querySelector('#lang-toggle-btn');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'vi' : 'en';
      localStorage.setItem('aet-lang', currentLang);
      applyLang(container, currentLang);
    });
  }
}

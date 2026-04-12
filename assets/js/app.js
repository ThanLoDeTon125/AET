/**
 * main.js
 * Application entry point.
 *
 * Responsibilities:
 *  1. Scale the fixed 1920×1080 canvas to fit any viewport (letterbox).
 *  2. Mount all components.
 *  3. Manage the shared "current character" state and wire up inter-component events.
 */

import { characters, heroLanding } from './content/characters.js';
import { Navbar }           from './navigation/Navbar.js';
import { Sidebar }          from './navigation/Sidebar.js';
import { Hero, updateHero } from './sections/Hero.js';
import { CharacterSlider }  from './sections/CharacterSlider.js';
import { HeroDetail } from './sections/HeroDetail.js';

/* ============================================================
   1. App shell — fills the viewport natively via CSS.
      No JS scaling needed.
   ============================================================ */
const appEl = document.getElementById('app');

/* Keep landing page from restoring midway between full-screen sections. */
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

/* ============================================================
  2. State
  ============================================================ */
let currentIndex = 0; /* index into pillar cards[] */

function getActive() {
  return characters[currentIndex];
}

function smoothScrollToSection(id) {
  const target = document.getElementById(id);
  if (!target) return;

  const headerOffset = window.innerWidth <= 960 ? 92 : 108;
  const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
  window.scrollTo({ top, behavior: 'smooth' });
}

function nextCharacter() {
  currentIndex = (currentIndex + 1) % characters.length;
  handleCharacterChange();
}

function selectCharacter(id) {
  const idx = characters.findIndex((c) => c.id === id);
  if (idx === -1 || idx === currentIndex) return;
  currentIndex = idx;
  handleCharacterChange();
}

function handleCharacterChange() {
  const char = getActive();

  /* Update slider section background when character changes */
  updateSectionBackground(sliderBgEl, char.bgImage);

  /* Update lower preview section content to match selected card */
  updateHero(heroEl, char);

  /* Update slider active indicator */
  sliderEl.setActive?.(char.id);
}

/* ============================================================
   3. Per-section background layers
   ============================================================ */
const heroBgEl   = document.getElementById('hero-bg');
const sliderBgEl = document.getElementById('slider-bg');

function initSectionBackground(container, src) {
  const img = document.createElement('img');
  img.src = src;
  img.alt = '';
  img.setAttribute('aria-hidden', 'true');
  container.appendChild(img);
}

function updateSectionBackground(container, src) {
  const prevImg = container.querySelector('img');

  const newImg = document.createElement('img');
  newImg.src = src;
  newImg.alt = '';
  newImg.setAttribute('aria-hidden', 'true');
  newImg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity 0.6s ease;';

  container.appendChild(newImg);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      newImg.style.opacity = '1';
      if (prevImg) {
        prevImg.style.transition = 'opacity 0.6s ease';
        prevImg.style.opacity = '0';
        prevImg.addEventListener('transitionend', () => prevImg.remove(), { once: true });
      }
    });
  });
}

/* Init: top hero stays on landing key visual, lower section follows active pillar */
initSectionBackground(heroBgEl, heroLanding.bgImage);
initSectionBackground(sliderBgEl, getActive().bgImage);

/* ============================================================
   4. Mount components
   ============================================================ */

/* — Navbar — */
Navbar(document.getElementById('navbar'));

/* — Sidebar — */
Sidebar(document.getElementById('sidebar'));

/* — Hero — */
const heroEl = document.getElementById('hero');
Hero(heroEl, getActive(), nextCharacter);

/* — Top Hero Showcase — */
const heroDetailEl = document.getElementById('hero-detail');
const heroSectionEl   = document.getElementById('hero-section');
const sliderSectionEl = document.getElementById('slider-section');
const worldSectionEl  = document.getElementById('world-section');
const impactSectionEl = document.getElementById('video-section-2');
HeroDetail(heroDetailEl, heroLanding, scrollToSliderSection);

/* — Scroll-scrub video sections — */
const scrollVideoSections = Array.from(document.querySelectorAll('.landing-section--video'));
const journeyNavLinks = Array.from(document.querySelectorAll('.journey-nav__link'));

/* — Character Slider — */
const sliderEl = document.getElementById('character-slider');
CharacterSlider(sliderEl, characters, getActive().id, selectCharacter);

/* ============================================================
   4b. Firefly particles — hero section
   ============================================================ */
(function spawnFireflies() {
  const container = document.createElement('div');
  container.className = 'fireflies';
  heroSectionEl.appendChild(container); /* hero-section = Nahida showcase */

  const COUNT = 28;
  for (let i = 0; i < COUNT; i++) {
    const dot = document.createElement('div');
    dot.className = 'firefly';

    const size = 3 + Math.random() * 5;
    dot.style.width  = size + 'px';
    dot.style.height = size + 'px';
    dot.style.left   = Math.random() * 100 + '%';
    dot.style.top    = Math.random() * 100 + '%';

    const r = () => (Math.random() > 0.5 ? '' : '-') + (20 + Math.random() * 80) + 'px';
    dot.style.setProperty('--dx1', r());
    dot.style.setProperty('--dy1', r());
    dot.style.setProperty('--dx2', r());
    dot.style.setProperty('--dy2', r());
    dot.style.setProperty('--dx3', r());
    dot.style.setProperty('--dy3', r());

    dot.style.setProperty('--fly-duration',  (10 + Math.random() * 18) + 's');
    dot.style.setProperty('--fly-delay',     (Math.random() * -20) + 's');
    dot.style.setProperty('--glow-duration', (3 + Math.random() * 5) + 's');
    dot.style.setProperty('--glow-delay',    (Math.random() * -6) + 's');
    dot.style.setProperty('--max-opacity',   (0.4 + Math.random() * 0.5).toFixed(2));

    container.appendChild(dot);
  }
})();

/* ============================================================
   4c. Auto-play video sections — forward on enter, reverse on leave
   ============================================================ */
(function initAutoPlayVideoSections() {
  if (!scrollVideoSections.length) return;

  scrollVideoSections.forEach((sectionEl) => {
    const videoEl = sectionEl.querySelector('.video-scroll__video');
    if (!videoEl) return;

    const startOffset = Number(sectionEl.dataset.videoStart || 0);
    let reverseRaf = 0;
    let hasEnded = false;

    videoEl.pause();
    videoEl.muted = true;
    videoEl.playsInline = true;

    function setupVideo() {
      if (videoEl.duration > startOffset) {
        videoEl.currentTime = startOffset;
      }
    }

    const STOP_BEFORE = 0.3;
    videoEl.addEventListener('timeupdate', () => {
      if (!hasEnded && videoEl.duration && videoEl.currentTime >= videoEl.duration - STOP_BEFORE) {
        videoEl.pause();
        hasEnded = true;
      }
    });
    videoEl.addEventListener('loadedmetadata', setupVideo);
    if (videoEl.readyState >= 1) setupVideo();

    function stopReverse() {
      if (reverseRaf) { cancelAnimationFrame(reverseRaf); reverseRaf = 0; }
    }

    function reversePlay() {
      const step = 1 / 60; /* ~1 frame at 60fps */
      videoEl.currentTime = Math.max(videoEl.currentTime - step, startOffset);
      if (videoEl.currentTime > startOffset) {
        reverseRaf = requestAnimationFrame(reversePlay);
      } else {
        reverseRaf = 0;
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            /* Scrolled into view → reset and play forward */
            stopReverse();
            hasEnded = false;
            if (videoEl.duration > startOffset) {
              videoEl.currentTime = startOffset;
            }
            videoEl.play().catch(() => {});
          } else {
            /* Scrolled out → reverse only if video hasn't reached its end */
            videoEl.pause();
            stopReverse();
            if (!hasEnded && videoEl.currentTime > startOffset) {
              reverseRaf = requestAnimationFrame(reversePlay);
            }
          }
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(sectionEl);
  });
})();

/* ============================================================
   4d. Journey rail — active section state + click scroll
   ============================================================ */
(function initJourneyRail() {
  if (!journeyNavLinks.length) return;

  const journeyTargets = journeyNavLinks
    .map((link) => {
      const target = document.getElementById(link.dataset.target);
      return target ? { link, target } : null;
    })
    .filter(Boolean);

  function setActive(id) {
    journeyNavLinks.forEach((link) => {
      link.classList.toggle('active', link.dataset.target === id);
    });
  }

  journeyTargets.forEach(({ link, target }) => {
    link.addEventListener('click', () => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visibleEntries[0]) {
        setActive(visibleEntries[0].target.id);
      }
    },
    {
      threshold: [0.35, 0.55, 0.75],
    }
  );

  journeyTargets.forEach(({ target }) => observer.observe(target));
})();

/* ============================================================
   4e. Header navigation — live links + mobile drawer
   ============================================================ */
(function initHeaderNavigation() {
  const navbarEl = document.getElementById('navbar');
  const headerOverlayEl = document.getElementById('header-overlay');
  if (!navbarEl) return;

  const mobileMenuButton = navbarEl.querySelector('.navbar__menu-btn');
  const mobileBackdrop = navbarEl.querySelector('.navbar__mobile-backdrop');
  const clickableTargets = Array.from(navbarEl.querySelectorAll('[data-target]'));
  const desktopLinks = Array.from(navbarEl.querySelectorAll('.navbar__link'));
  const mobileLinks = Array.from(navbarEl.querySelectorAll('.navbar__mobile-link'));
  const navSections = [heroSectionEl, sliderSectionEl, document.getElementById('video-section'), worldSectionEl, impactSectionEl].filter(Boolean);

  function closeMenu() {
    navbarEl.classList.remove('is-menu-open');
    document.body.classList.remove('nav-open');
    if (mobileMenuButton) {
      mobileMenuButton.setAttribute('aria-expanded', 'false');
      mobileMenuButton.setAttribute('aria-label', 'Open navigation');
    }
    const mobilePanel = navbarEl.querySelector('.navbar__mobile-panel');
    mobilePanel?.setAttribute('aria-hidden', 'true');
  }

  function openMenu() {
    navbarEl.classList.add('is-menu-open');
    document.body.classList.add('nav-open');
    if (mobileMenuButton) {
      mobileMenuButton.setAttribute('aria-expanded', 'true');
      mobileMenuButton.setAttribute('aria-label', 'Close navigation');
    }
    const mobilePanel = navbarEl.querySelector('.navbar__mobile-panel');
    mobilePanel?.setAttribute('aria-hidden', 'false');
  }

  function toggleMenu() {
    if (navbarEl.classList.contains('is-menu-open')) closeMenu();
    else openMenu();
  }

  function scrollToSectionById(id) {
    smoothScrollToSection(id);
  }

  function setHeaderActive(id) {
    desktopLinks.forEach((link) => {
      const ids = (link.dataset.activeFor || link.dataset.target || '').split(',');
      link.classList.toggle('active', ids.includes(id));
    });

    mobileLinks.forEach((link) => {
      link.classList.toggle('active', link.dataset.target === id);
    });

    const isLightSection = id === 'world-section';
    navbarEl.classList.toggle('is-light', isLightSection);
    headerOverlayEl?.classList.toggle('is-light', isLightSection);
  }

  function syncScrolledState() {
    navbarEl.classList.toggle('is-scrolled', window.scrollY > 24);
  }

  clickableTargets.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const { target } = trigger.dataset;
      if (!target) return;
      closeMenu();
      scrollToSectionById(target);
    });
  });

  mobileMenuButton?.addEventListener('click', toggleMenu);
  mobileBackdrop?.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 960) closeMenu();
  });

  window.addEventListener('scroll', syncScrolledState, { passive: true });
  syncScrolledState();

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visibleEntries[0]) {
        setHeaderActive(visibleEntries[0].target.id);
      }
    },
    {
      threshold: [0.3, 0.55, 0.75],
    }
  );

  navSections.forEach((section) => observer.observe(section));
})();

/* ============================================================
   4g. Footer actions — CTA buttons and quick links
   ============================================================ */
(function initFooterActions() {
  const footerTriggers = Array.from(document.querySelectorAll('#site-footer [data-scroll-target]'));
  if (!footerTriggers.length) return;

  footerTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const { scrollTarget } = trigger.dataset;
      if (!scrollTarget) return;
      smoothScrollToSection(scrollTarget);
    });
  });
})();

/* ============================================================
   4h. Narrative motion — section reveal states
   ============================================================ */
(function initNarrativeMotion() {
  const revealTargets = [
    sliderSectionEl,
    document.getElementById('video-section'),
    document.getElementById('world-section'),
    document.getElementById('video-section-2'),
    document.getElementById('site-footer'),
    ...Array.from(document.querySelectorAll('.journey-bridge')),
  ].filter(Boolean);

  if (!revealTargets.length) return;

  heroSectionEl?.classList.add('is-visible');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('is-visible', entry.isIntersecting);
      });
    },
    {
      threshold: 0.22,
    }
  );

  revealTargets.forEach((target) => observer.observe(target));
})();

/* ============================================================
   5. Section navigation
   ============================================================ */
function scrollToHeroSection() {
  smoothScrollToSection('hero-section');
}

function scrollToSliderSection() {
  smoothScrollToSection('slider-section');
}

/* Wire "More" button in slider section → scroll up to hero showcase */
heroEl.addEventListener('click', (e) => {
  if (e.target.closest('#hero-more-btn')) {
    scrollToHeroSection();
  }
});

/* ============================================================
   6. Keyboard navigation
   ============================================================ */
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') nextCharacter();
  if (e.key === 'ArrowLeft') {
    currentIndex = (currentIndex - 1 + characters.length) % characters.length;
    handleCharacterChange();
  }
});

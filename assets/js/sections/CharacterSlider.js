/**
 * CharacterSlider.js
 * Horizontal drag-to-scroll pillar card strip at the bottom.
 * Cards are clickable — selecting one triggers the onSelect callback.
 */

/**
 * @param {HTMLElement}  container
 * @param {Array}        characters     — full list
 * @param {string}       activeId       — currently selected pillar id
 * @param {function}     onSelect       — callback(pillarId)
 */
export function CharacterSlider(container, characters, activeId, onSelect) {
  /* ---- DOM ---- */
  const cardsHTML = characters
    .map(
      (char) => `
        <div
          class="char-card ${char.id === activeId ? 'active' : ''}"
          data-id="${char.id}"
          role="button"
          tabindex="0"
          aria-label="Open ${char.name} pillar"
          aria-pressed="${char.id === activeId}"
        >
          <img
            class="char-card__img"
            src="${char.cardImage}"
            alt="${char.name}"
            loading="lazy"
            draggable="false"
          />
          <span class="char-card__index">${char.serial || ''}</span>
          <span class="char-card__tag">${char.primaryTag || ''}</span>
          <span class="char-card__name">${char.name}</span>
        </div>
      `
    )
    .join('');

  container.innerHTML = `
    <div class="slider__track" id="slider-track" role="listbox" aria-label="AETERNA pillars">
      ${cardsHTML}
    </div>
  `;

  const track = container.querySelector('#slider-track');

  /* ---- Click / keyboard select ---- */
  track.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const card = e.target.closest('.char-card');
      if (card && typeof onSelect === 'function') onSelect(card.dataset.id);
    }
  });

  /* ---- Drag-to-scroll (Pointer Events) ---- */
  const DRAG_THRESHOLD = 6;   // px — below this = click, above = drag
  let isDragging  = false;
  let didDrag     = false;
  let startX      = 0;
  let scrollStart = 0;

  track.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    isDragging  = true;
    didDrag     = false;
    startX      = e.clientX;
    scrollStart = track._offset ?? 0;
    track.setPointerCapture(e.pointerId);
  });

  track.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const delta = e.clientX - startX;
    if (!didDrag && Math.abs(delta) > DRAG_THRESHOLD) {
      didDrag = true;
      track.classList.add('is-dragging');
    }
    if (didDrag) applyOffset(scrollStart + delta);
  });

  track.addEventListener('pointerup', (e) => {
    if (!isDragging) return;
    stopDrag();
    // Only fire select if it was a genuine click (not a drag)
    if (!didDrag) {
      const card = e.target.closest('.char-card');
      if (card && typeof onSelect === 'function') onSelect(card.dataset.id);
    }
  });
  track.addEventListener('pointercancel', () => stopDrag());

  function stopDrag() {
    if (!isDragging) return;
    isDragging = false;
    didDrag    = false;
    track.classList.remove('is-dragging');
    clampOffset();
  }

  /* ---- Wheel scroll ---- */
  container.addEventListener('wheel', (e) => {
    e.preventDefault();
    applyOffset((track._offset ?? 0) - e.deltaY * 0.8);
  }, { passive: false });

  /* ---- Offset helpers ---- */
  function maxOffset() {
    const trackWidth   = track.scrollWidth;
    const visibleWidth = container.clientWidth;
    return Math.max(0, trackWidth - visibleWidth + 40);
  }

  function applyOffset(val) {
    const o = Math.max(-maxOffset(), Math.min(0, val));
    track.style.transform = `translateX(${o}px)`;
    track._offset = o;
  }

  function clampOffset() {
    applyOffset(track._offset ?? 0);
  }

  /* ---- Public: highlight active card ---- */
  container.setActive = function setActive(id) {
    track.querySelectorAll('.char-card').forEach((card) => {
      const isActive = card.dataset.id === id;
      card.classList.toggle('active', isActive);
      card.setAttribute('aria-pressed', String(isActive));
    });
  };
}

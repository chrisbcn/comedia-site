/* ============================================================
   wordcycle.js — Rolls through words in .hero-cycle-inner
   Current word exits upward; next word enters from below.
   The wrapper is locked to the width of the longest word so
   line 1 never shifts, and the <br> keeps line 2 stable.
   ============================================================ */

(function () {
  var words = ['experiences', 'products', 'designs', 'innovations', 'breakthroughs'];
  var el      = document.querySelector('.hero-cycle-inner');
  var wrapper = document.querySelector('.hero-word-cycle');
  if (!el || !wrapper) return;

  var current = 0;
  var running = false;

  /* ── Lock wrapper width to longest word ─────────────────── */
  function lockWidth() {
    var original = el.textContent;
    var max = 0;
    words.forEach(function (word) {
      el.textContent = word;
      max = Math.max(max, el.offsetWidth);
    });
    el.textContent = original;
    wrapper.style.minWidth = max + 'px';
  }
  lockWidth();

  /* ── Cycle animation ────────────────────────────────────── */
  function next() {
    if (running) return;
    running = true;

    // 1. Exit: slide current word up
    el.classList.add('is-exit');

    setTimeout(function () {
      // 2. Snap below without transition, update text
      el.classList.remove('is-exit');
      el.classList.add('is-enter');
      current = (current + 1) % words.length;
      el.textContent = words[current];

      // 3. Force reflow so browser registers the new position
      void el.offsetWidth;

      // 4. Remove is-enter — triggers the slide-in transition
      el.classList.remove('is-enter');

      setTimeout(function () { running = false; }, 600);
    }, 450);
  }

  setInterval(next, 2800);
})();

/* ============================================================
   wordcycle.js — Rolls through words in .hero-cycle-inner
   Current word exits upward; next word enters from below.
   ============================================================ */

(function () {
  var words = ['experiences', 'products', 'designs', 'innovations', 'breakthroughs'];
  var el = document.querySelector('.hero-cycle-inner');
  if (!el) return;

  var current = 0;
  var running = false;

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

      // 3. Force reflow so the browser registers the new position
      void el.offsetWidth;

      // 4. Remove is-enter — triggers the transition in
      el.classList.remove('is-enter');

      // Allow next cycle after animation completes
      setTimeout(function () { running = false; }, 600);
    }, 450); // matches exit transition
  }

  setInterval(next, 2800);
})();

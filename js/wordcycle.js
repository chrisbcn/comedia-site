/* ============================================================
   wordcycle.js — Rolls through words then transitions to the
   first case study after one full rotation.
   ============================================================ */

(function () {
  var words   = ['experiences,', 'products,', 'designs,', 'innovations,', 'breakthroughs,'];
  var el      = document.querySelector('.hero-cycle-inner');
  var wrapper = document.querySelector('.hero-word-cycle');
  if (!el || !wrapper) return;

  var current = 0;
  var running = false;
  var timer;

  /* ── Lock wrapper to width of longest word ───────────────── */
  (function lockWidth() {
    var saved = el.textContent;
    var max = 0;
    words.forEach(function (w) { el.textContent = w; max = Math.max(max, el.offsetWidth); });
    el.textContent = saved;
    wrapper.style.minWidth = max + 'px';
  })();

  /* ── Activate first case study ───────────────────────────── */
  function activateCaseStudy() {
    document.body.classList.add('cs-active');
    document.body.setAttribute('data-cs', 'nec');
    setActiveIndicator('nec');
  }

  /* ── Active logo indicator ───────────────────────────────── */
  function setActiveIndicator(csKey) {
    document.querySelectorAll('.client-logo').forEach(function (logo) {
      logo.classList.toggle('is-active', logo.dataset.cs === csKey);
    });
  }

  /* ── Cycle one word ──────────────────────────────────────── */
  function cycleWord() {
    if (running) return;
    running = true;

    var nextIndex = (current + 1) % words.length;

    // Exit current word upward
    el.classList.add('is-exit');

    setTimeout(function () {
      el.classList.remove('is-exit');
      el.classList.add('is-enter');
      current = nextIndex;
      el.textContent = words[current];
      void el.offsetWidth;
      el.classList.remove('is-enter');

      setTimeout(function () {
        running = false;

        if (current === words.length - 1) {
          // Last word shown — wait, then fade to case study
          timer = setTimeout(activateCaseStudy, 2800);
        } else {
          timer = setTimeout(cycleWord, 2800);
        }
      }, 600);
    }, 450);
  }

  // Kick off after the first word has been read
  timer = setTimeout(cycleWord, 2800);
})();

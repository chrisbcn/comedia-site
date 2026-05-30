/* ============================================================
   humans.js — "Humans, not hype" card animation sequence
   ============================================================
   Triggered once when the section enters the viewport.

   Sequence:
     0 ms  → scan line sweeps (CSS animation, already running)
   800 ms  → Prada badge fades + scales in
  1300 ms  → title typewriters in
  ~2100ms  → description typewriters in
  ~4000ms  → Best Match box fades in + 94% counts up
   ============================================================ */

(function () {
  var section  = document.getElementById('humans');
  if (!section) return;

  var badge      = section.querySelector('.humans-badge');
  var cardTitle  = section.querySelector('.humans-card-title');
  var cardDesc   = section.querySelector('.humans-card-desc');
  var matchBox   = section.querySelector('.humans-match');
  var matchNum   = section.querySelector('.humans-match-num');

  var TITLE = 'Sling back heel';
  var DESC  = 'Sling back heel with square toe shape made with calf-skin leather.';

  var hasRun = false;

  /* ── typewriter helper ─────────────────────────────────── */
  function typewriter(el, text, msPerChar, done) {
    var i = 0;
    el.textContent = '';
    (function tick() {
      if (i <= text.length) {
        el.textContent = text.slice(0, i++);
        setTimeout(tick, msPerChar);
      } else if (done) {
        done();
      }
    })();
  }

  /* ── count-up helper ───────────────────────────────────── */
  function countUp(el, target, duration) {
    var startTs = null;
    function step(ts) {
      if (!startTs) startTs = ts;
      var p = Math.min((ts - startTs) / duration, 1);
      el.textContent = Math.round(p * target);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ── main sequence ─────────────────────────────────────── */
  function runSequence() {
    if (hasRun) return;
    hasRun = true;

    // Phase 1 — Prada badge
    setTimeout(function () {
      badge.classList.add('is-visible');
    }, 800);

    // Phase 2 — typewriter: title
    setTimeout(function () {
      typewriter(cardTitle, TITLE, 50, function () {

        // Phase 3 — typewriter: description (slight pause after title)
        setTimeout(function () {
          typewriter(cardDesc, DESC, 22, function () {

            // Phase 4 — Best Match fades in + count-up
            setTimeout(function () {
              matchBox.classList.add('is-visible');
              countUp(matchNum, 94, 900);
            }, 300);
          });
        }, 150);
      });
    }, 1300);
  }

  /* ── IntersectionObserver ──────────────────────────────── */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        runSequence();
        io.disconnect();
      }
    });
  }, { threshold: 0.3 });

  io.observe(section);
})();

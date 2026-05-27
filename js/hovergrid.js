/* ============================================================
   hovergrid.js — Cursor-reveal grid for the hero section
   Grid lines are masked by a radial gradient that follows
   the mouse; the whole overlay fades in/out on enter/leave.
   ============================================================ */

(function () {
  var hero = document.querySelector('.hero-section');
  var grid = document.querySelector('.hero-grid');
  if (!hero || !grid) return;

  function setMask(x, y) {
    var val = 'radial-gradient(250px at ' + x + 'px ' + y + 'px, white 0%, transparent 100%)';
    grid.style.webkitMaskImage = val;
    grid.style.maskImage = val;
  }

  hero.addEventListener('mousemove', function (e) {
    var rect = hero.getBoundingClientRect();
    setMask(e.clientX - rect.left, e.clientY - rect.top);
    grid.style.opacity = '1';
  }, { passive: true });

  hero.addEventListener('mouseleave', function () {
    grid.style.opacity = '0';
  });
})();

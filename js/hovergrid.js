/* ============================================================
   hovergrid.js — Cursor-reveal grid + hover-zone videos
   for the hero section.
   ============================================================ */

(function () {
  var hero     = document.querySelector('.hero-section');
  var grid     = document.querySelector('.hero-grid');
  var videoLeft  = document.querySelector('.hero-zone-video[data-zone="left"]');
  var videoRight = document.querySelector('.hero-zone-video[data-zone="right"]');
  if (!hero || !grid) return;

  /* ── Grid mask ──────────────────────────────────────────── */
  function setMask(x, y) {
    var val = 'radial-gradient(250px at ' + x + 'px ' + y + 'px, white 0%, transparent 100%)';
    grid.style.webkitMaskImage = val;
    grid.style.maskImage = val;
  }

  /* ── Zone videos ────────────────────────────────────────── */
  var activeZone = null;

  function showZone(zone) {
    if (zone === activeZone) return;
    activeZone = zone;

    if (videoLeft)  videoLeft.classList.toggle('is-visible',  zone === 'left');
    if (videoRight) videoRight.classList.toggle('is-visible', zone === 'right');
  }

  function hideZones() {
    activeZone = null;
    if (videoLeft)  videoLeft.classList.remove('is-visible');
    if (videoRight) videoRight.classList.remove('is-visible');
  }

  /* ── Mouse events ───────────────────────────────────────── */
  hero.addEventListener('mousemove', function (e) {
    var rect = hero.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    // Grid
    setMask(x, y);
    grid.style.opacity = '1';

    // Zone: left / right half
    showZone(x < rect.width / 2 ? 'left' : 'right');
  }, { passive: true });

  hero.addEventListener('mouseleave', function () {
    grid.style.opacity = '0';
    hideZones();
  });
})();

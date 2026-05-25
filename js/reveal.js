/* ============================================================
   reveal.js — Scroll-triggered fade-up for sections
   Add data-reveal to any element to opt in.
   Add data-delay="1–8" for staggered timing within a group.
   ============================================================ */

(function () {
  var items = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
  if (!items.length) return;

  function check() {
    var vh = window.innerHeight;
    var remaining = [];
    items.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < vh && rect.bottom > 0) {
        el.classList.add('is-visible');
      } else {
        remaining.push(el);
      }
    });
    items = remaining;
  }

  window.addEventListener('scroll', check, { passive: true });

  // Initial pass
  check();
})();

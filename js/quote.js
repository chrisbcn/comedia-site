/* ============================================================
   quote.js — Word-by-word fade-up for the quote section
   ============================================================ */

(function () {
  var el = document.querySelector('[data-reveal-words]');
  if (!el) return;

  // Split text into individual word spans with staggered delays
  var words = el.textContent.trim().split(/\s+/);
  el.innerHTML = words.map(function (word, i) {
    return '<span class="quote-word" style="transition-delay:' + (i * 35) + 'ms">' + word + '</span>';
  }).join(' ');

  function check() {
    var rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('words-visible');
      window.removeEventListener('scroll', check);
    }
  }

  window.addEventListener('scroll', check, { passive: true });
  check();
})();

/* ============================================================
   scrolljack.js — Cover-style horizontal scrolljack
   Card 0 stays pinned; each subsequent card slides in from the
   right and covers the one beneath it as you scroll.
   Add more .stack-card elements — it scales automatically.
   ============================================================ */

(function () {
  var stack = document.querySelector('.scroll-stack');
  var pin   = document.querySelector('.scroll-stack-pin');
  if (!stack || !pin) return;

  var cards = Array.prototype.slice.call(pin.querySelectorAll('.stack-card'));
  if (!cards.length) return;

  var transitions = cards.length - 1; // number of slide-in events

  // Stretch the scroll driver: 100svh of scroll travel per transition
  stack.style.height = (transitions + 1) * 100 + 'svh';

  // Stack cards so later cards paint on top
  cards.forEach(function (card, i) {
    card.style.zIndex = i + 1;
  });

  function update() {
    var rect        = stack.getBoundingClientRect();
    var totalScroll = stack.offsetHeight - window.innerHeight;
    if (totalScroll <= 0) return;

    // progress: 0 → transitions (one unit per card transition)
    var progress = Math.max(0, Math.min(transitions, (-rect.top / totalScroll) * transitions));

    cards.forEach(function (card, i) {
      if (i === 0) {
        // First card never moves
        card.style.transform = 'translateX(0%)';
      } else {
        // Card i slides in during segment [i-1 … i] of progress
        var x = Math.max(0, (i - progress) * 100);
        card.style.transform = 'translateX(' + x + '%)';
      }
    });
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();

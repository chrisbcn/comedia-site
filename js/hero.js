/* ============================================================
   hero.js — Client logo hover → case study preview
   ============================================================ */

(function () {
  var hero = document.getElementById('hero');
  var clientLogos = hero.querySelectorAll('.client-logo[data-cs]');

  function setActiveIndicator(csKey) {
    clientLogos.forEach(function (logo) {
      logo.classList.toggle('is-active', logo.dataset.cs === csKey);
    });
  }

  clientLogos.forEach(function (logo) {
    logo.addEventListener('mouseenter', function () {
      document.body.classList.add('cs-active');
      document.body.setAttribute('data-cs', logo.dataset.cs);
      setActiveIndicator(logo.dataset.cs);
    });
  });

  hero.addEventListener('mouseleave', function () {
    document.body.classList.remove('cs-active');
    document.body.removeAttribute('data-cs');
    setActiveIndicator(null);
  });
})();

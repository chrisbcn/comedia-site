/* ============================================================
   nav.js — Mobile hamburger menu
   ============================================================ */

(function () {
  var hamburger = document.getElementById('hamburger');
  var menu = document.getElementById('mobile-menu');
  var closeBtn = document.getElementById('mobile-menu-close');

  function openMenu() {
    menu.classList.add('is-open');
    hamburger.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('is-open');
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function () {
    menu.classList.contains('is-open') ? closeMenu() : openMenu();
  });

  closeBtn.addEventListener('click', closeMenu);

  menu.querySelectorAll('.mobile-nav-link, .mobile-nav-cta').forEach(function (el) {
    el.addEventListener('click', closeMenu);
  });
})();

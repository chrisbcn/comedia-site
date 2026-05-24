/* ============================================================
   case-study.js — Case study rotator
   Add entries to caseStudies[] to introduce new slides.
   ============================================================ */

(function () {
  var INTERVAL = 6000; // ms between auto-advances

  var caseStudies = [
    {
      client: 'NEC',
      logo: 'imgs/nec_corporation_logo.svg.svg',
      title: 'From post-it note to commercial smart home product',
      bg: 'imgs/nec-bg-pool.png',
      video: 'imgs/nec 1 2 video.mp4',
      link: '#'
    }
    // Add more case studies here:
    // {
    //   client: 'Google',
    //   logo: 'imgs/google.svg',
    //   title: "Google's Gemini E-Commerce Showcase",
    //   bg: 'imgs/ecomm-bg1.png',
    //   video: 'imgs/ecommm-vid-1.mp4',
    //   link: '#'
    // }
    //    {
    //   client: 'Macy;s',
    //   logo: 'imgs/macys.svg',
    //   title: "Designing Tomorrow’s Retail Experiences",
    //   bg: 'imgs/macys-bg.png',
    //   video: 'Macys Style.mp4',
    //   link: '#'
    // }
  ];

  var section = document.getElementById('case-study');
  var bgImg = document.getElementById('cs-bg');
  var logo = document.getElementById('cs-logo');
  var titleEl = document.getElementById('cs-title');
  var videoEl = document.getElementById('cs-video');
  var videoSrc = document.getElementById('cs-video-src');
  var link = document.getElementById('cs-link');
  var dotsNav = document.getElementById('cs-dots');
  var current = 0;
  var timer = null;

  // Build dot buttons
  caseStudies.forEach(function (cs, i) {
    var btn = document.createElement('button');
    btn.setAttribute('aria-label', 'Case study ' + (i + 1));
    btn.addEventListener('click', function () {
      clearInterval(timer);
      showStudy(i);
      startTimer();
    });
    dotsNav.appendChild(btn);
  });

  // Hide dots when there is only one case study
  if (caseStudies.length < 2) dotsNav.style.display = 'none';

  function showStudy(index, instant) {
    var cs = caseStudies[index];
    current = index;

    if (instant) {
      apply(cs);
      return;
    }

    section.classList.add('cs-transitioning');
    setTimeout(function () {
      apply(cs);
      section.classList.remove('cs-transitioning');
    }, 300);
  }

  function apply(cs) {
    bgImg.src = cs.bg;
    logo.src = cs.logo;
    logo.alt = cs.client;
    titleEl.textContent = cs.title;
    link.href = cs.link;
    videoSrc.src = cs.video;
    videoEl.load();
    videoEl.play().catch(function () { });

    dotsNav.querySelectorAll('button').forEach(function (btn, i) {
      btn.classList.toggle('is-active', i === current);
    });
  }

  function startTimer() {
    if (caseStudies.length < 2) return;
    timer = setInterval(function () {
      showStudy((current + 1) % caseStudies.length);
    }, INTERVAL);
  }

  // Kick off
  showStudy(0, true);
  startTimer();
})();

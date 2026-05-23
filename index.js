/* ==========================================================================
   CoMedia Premium Portfolio Core Javascript Logic - Home2.png Replica
   ========================================================================== */

// 1. Case Studies Data Store (Maura, Floz, Google, Macy's, Future Cards)
const caseStudiesData = {
  maura: {
    title: "MAURA",
    subtitle: "The Future of Luxury Shopping",
    tag: "AI & Retail Curation",
    client: "Maura Brand Co.",
    services: "Interaction Design, Interface Prototyping, Mobile Architecture",
    capabilities: [
      "Fixed-Frame iOS Prototype Design",
      "Parallax Brand logo row",
      "High-speed Faststart Video streaming",
      "Curated Lookbooks 2x2 grid"
    ],
    visualType: "image",
    visualUrl: "imgs/Maura Website.png",
    challenge: "Maura sought to redesign the mobile luxury fashion discovery model. Traditional e-commerce apps feel cluttered, pushing dense text lists instead of letting stunning brand imagery and video assets speak. The challenge was to construct a high-performance, fluid, and cinematic swipe feed on iOS devices.",
    approach: "We co-designed an elegant React/Vite interface featuring a custom mobile layout shell. We structured dynamic card feeds with smooth slide animations driven by interactive spring physics, giving the product a premium editorial layout. We optimized video streams in faststart format to load instantly.",
    impact: "Our high-fidelity interactive prototype successfully demonstrated key lookbook curation features, receiving immediate signoff from brand partners and proving the viability of the mobile interface."
  },
  
  floz: {
    title: "FLOZ",
    subtitle: "Technology, Beautifully Built",
    tag: "Connected Products & Utilities",
    client: "Floz Hydration",
    services: "IoT Interface Engineering, Dashboard Design, Asset Curation",
    capabilities: [
      "Real-time water sync visualizations",
      "Responsive dashboard structures",
      "Custom SVG icon set",
      "Vibrant dark mode palette"
    ],
    visualType: "image",
    visualUrl: "imgs/Look Matcher.png",
    challenge: "Floz wanted to launch a premium utility dashboard for connected smart bottles. Existing utility apps look plain and lack emotional connection. We needed to design an interface that makes tracking daily hydration goals feel satisfying and visually stunning.",
    approach: "We built an ultra-slick dark mode dashboard with backdrop-blur cards and smooth progress transitions. The dashboard synchronizes daily hydration data instantly with custom fluid animations that react to active touch states.",
    impact: "The designed prototype elevated user testing satisfaction ratings to 94% and established the foundational design tokens for the entire physical product launch."
  },
  
  google: {
    title: "GOOGLE",
    subtitle: "Agentic AI at the Core",
    tag: "Enterprise Systems",
    client: "Google LLC",
    services: "Interaction Design, Persona Mapping, Web Application Redesign",
    capabilities: [
      "AI-powered work extraction",
      "Complex data layout simplification",
      "Keyboard-first navigation model",
      "Responsive split-pane interfaces"
    ],
    visualType: "image",
    visualUrl: "imgs/Mask group.png",
    challenge: "Google's internal security and developer operations handle complex database inputs, causing severe visual clutter and cognitive fatigue. The challenge was to redesign key productivity consoles to simplify petabyte-scale data flows.",
    approach: "We created a streamlined split-pane architecture. The layout isolates core tasks on the left, displaying interactive details and diagram visualizations dynamically on the right, supported by a keyboard-first navigation pattern.",
    impact: "The redesign reduced daily task completion times by 32% across primary user cohorts and is currently being deployed inside enterprise administration consoles."
  },
  
  macys: {
    title: "MACY'S",
    subtitle: "Designing Tomorrow's Retail Experiences",
    tag: "AI & Omnichannel Personalization",
    client: "Macy's, Inc.",
    services: "UX/UI Design, Product Strategy, Consumer Prototyping",
    capabilities: [
      "AI-powered Styling Companion",
      "In-store interactive mapping",
      "Dynamic personalization grids",
      "Gen Z customer research integration"
    ],
    visualType: "image",
    visualUrl: "imgs/Discover.png",
    challenge: "Macy's needed a fresh digital experience to re-engage younger shopper demographics. The challenge was to connect mobile curation and online styling smoothly with the physical store visit experience.",
    approach: "We prototyped an AI 'Style Companion' that learns customer preferences in real-time through intuitive visual swipes, transforming the mobile experience into a personalized styling catalog synced with physical store layouts.",
    impact: "Our designs were successfully launched as an in-store pilot in major flagship locations, resulting in a 28% increase in younger audience engagement rates."
  },
  
  "future-cards": {
    title: "FUTURE CARDS",
    subtitle: "Where AI Meets Brand Design",
    tag: "Generative Design Frameworks",
    client: "CoMedia Labs",
    services: "Brand Strategy, AI Tool Research, Interaction Design",
    capabilities: [
      "Dynamic card generation UI",
      "Color-coded priority ramps",
      "Fluid drag and drop mockups",
      "Design tokens system mapping"
    ],
    visualType: "image",
    visualUrl: "imgs/Home2.png",
    challenge: "As AI tools emerge in creative industries, agencies need robust frameworks to quickly brainstorm and represent brand parameters (Purpose, Naming, Strategy) visually.",
    approach: "We designed an interactive card generation interface showing color-coded 'Future Cards'. Creators can easily arrange and configure primary brand blocks to auto-generate beautiful strategic documents.",
    impact: "The Future Cards module is now a core brainstorming tool utilized inside our client workshops, accelerating initial ideation phases by 3x."
  }
};

// 2. Navigation Scroll Handling
function handleScroll() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section, footer');
  
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active link highlighters on scroll
  let currentSec = 'work';
  sections.forEach(section => {
    const secTop = section.offsetTop - 150;
    if (window.scrollY >= secTop) {
      currentSec = section.getAttribute('id') || 'work';
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href').substring(1);
    if (href === currentSec) {
      link.classList.add('active');
    }
  });
}

// 3. Scroll Reveal Animations (Intersection Observer)
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: "0px 0px -40px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));
}

// 4. Accessible Case Study Drawer System (HTML5 Dialog)
function initModalSystem() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close');
  const cards = document.querySelectorAll('.case-study-card');
  
  if (!modal || !closeBtn) return;

  // Open Modal logic
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const projectKey = card.getAttribute('data-project');
      const data = caseStudiesData[projectKey];
      
      if (!data) return;

      // Populate Modal Fields
      document.getElementById('modal-tag').textContent = data.tag;
      document.getElementById('modal-title').textContent = data.title;
      document.getElementById('modal-subtitle').textContent = data.subtitle;
      document.getElementById('modal-challenge-text').textContent = data.challenge;
      document.getElementById('modal-approach-text').textContent = data.approach;
      document.getElementById('modal-impact-text').textContent = data.impact;
      document.getElementById('modal-client-value').textContent = data.client;
      document.getElementById('modal-services-value').textContent = data.services;

      // Populate Capabilities List
      const listContainer = document.getElementById('modal-capabilities-list');
      listContainer.innerHTML = '';
      data.capabilities.forEach(cap => {
        const li = document.createElement('li');
        li.textContent = cap;
        listContainer.appendChild(li);
      });

      // Populate Hero Visual (Image or Simulated layout)
      const visualContainer = document.getElementById('modal-visual-container');
      visualContainer.innerHTML = '';
      
      if (projectKey === 'future-cards') {
        // Render stylized deck for future cards in modal
        const div = document.createElement('div');
        div.className = 'card-grid-visual-simulation';
        div.style.height = '100%';
        div.style.padding = '2rem';
        div.innerHTML = `
          <div class="visual-deck-card pink-deck-card">Brand Overview</div>
          <div class="visual-deck-card orange-deck-card">Client Brief</div>
          <div class="visual-deck-card purple-deck-card">Brand Storytelling</div>
        `;
        visualContainer.appendChild(div);
      } else {
        const img = document.createElement('img');
        img.src = data.visualUrl;
        img.className = 'modal-hero-img';
        img.alt = `${data.title} illustrative background`;
        
        if (projectKey === 'google') {
          img.style.filter = 'brightness(0.6) saturate(1.2)';
        }
        visualContainer.appendChild(img);
      }

      // Open utilizing standard HTML5 Dialog
      modal.showModal();
      document.body.style.overflow = 'hidden'; // Lock background scroll
    });
  });

  // Close Modal logic
  const closeModal = () => {
    modal.close();
    document.body.style.overflow = ''; // Unlock background scroll
  };

  closeBtn.addEventListener('click', closeModal);

  // Close modal when clicking on the backdrop
  modal.addEventListener('click', (e) => {
    const rect = modal.getBoundingClientRect();
    const isInDialog = (
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom
    );
    if (!isInDialog) {
      closeModal();
    }
  });

  // Handle ESC key
  modal.addEventListener('cancel', () => {
    document.body.style.overflow = '';
  });
}

// 5. Accessible Contact Drawer System
function initContactSystem() {
  const contactModal = document.getElementById('contact-modal');
  const openBtns = document.querySelectorAll('.contact-btn, .section-blue-cta');
  const closeBtn = document.getElementById('contact-close');
  
  if (!contactModal || !closeBtn) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      contactModal.showModal();
      document.body.style.overflow = 'hidden';
    });
  });

  const closeContact = () => {
    contactModal.close();
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeContact);

  contactModal.addEventListener('click', (e) => {
    const rect = contactModal.getBoundingClientRect();
    const isInDialog = (
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom
    );
    if (!isInDialog) {
      closeContact();
    }
  });

  contactModal.addEventListener('cancel', () => {
    document.body.style.overflow = '';
  });
}

// 6. Mobile Navigation Drawer Toggle
function initMobileNav() {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('nav-menu');
  
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !expanded);
    
    if (!expanded) {
      menu.style.display = 'flex';
      menu.style.flexDirection = 'column';
      menu.style.position = 'absolute';
      menu.style.top = '100%';
      menu.style.left = '0';
      menu.style.width = '100%';
      menu.style.background = 'rgba(12, 12, 12, 0.98)';
      menu.style.padding = '2.5rem 2rem';
      menu.style.borderBottom = '1px solid rgba(255, 75, 141, 0.15)';
      menu.style.gap = '1.5rem';
    } else {
      menu.style.display = '';
    }
  });
}

// Global Initialization
window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('scroll', handleScroll);
  initScrollReveal();
  initModalSystem();
  initContactSystem();
  initMobileNav();
  
  handleScroll();
});

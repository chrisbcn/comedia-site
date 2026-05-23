/* ==========================================================================
   CoMedia Design Portfolio Core Javascript Logic
   ========================================================================== */

// 1. Rich Case Studies Data Store
const caseStudiesData = {
  macys: {
    title: "Macy's AI Style Platform",
    subtitle: "Bridging mobile personalization and physical store shopping.",
    tag: "AI & Personalization",
    client: "Macy's, Inc.",
    services: "Product Strategy, UX/UI Design, AI Interface Prototyping",
    capabilities: [
      "AI Styling Engine Integration",
      "Omnichannel Experience Design",
      "Interactive Store Maps",
      "Gen Z Customer Research"
    ],
    visualType: "image",
    visualUrl: "imgs/Mask group.png",
    challenge: "Macy's wanted to re-engage Millennial and Gen Z shoppers who find traditional retail layouts overwhelming. The challenge was to create an interface that leverages predictive AI styling without making the experience feel cold, robotic, or overly transactional.",
    approach: "We designed a mobile-first AI 'Style Companion' that asks intuitive, visual-preference questions rather than textual surveys. The platform learns the shopper's style in real-time, curation-first. When in a physical store, the app dynamically reorganizes to show highly personalized, location-aware styling guides that direct the user to specific racks, successfully bridging digital intelligence with physical discovery.",
    impact: "Our interactive prototype and final UI specifications led to a pilot launch in 15 flagship locations, yielding a 28% increase in scan-to-try engagement among shoppers aged 18-26, and significantly boosting digital cart conversion when synced with physical store sessions."
  },
  
  nec: {
    title: "Sharp/NEC Connected Rentals",
    subtitle: "A smart IoT ecosystem for modern property managers.",
    tag: "IoT & Hardware Integration",
    client: "Sharp / NEC Display Solutions",
    services: "IoT Dashboard Engineering, Interface Design, Hardware Co-Design",
    capabilities: [
      "IoT Real-time Synchronization",
      "Hardware-Connected Interfaces",
      "Property Manager Dashboards",
      "Interactive Screen Displays"
    ],
    visualType: "video",
    visualUrl: "imgs/nec 1 2 video.mp4",
    challenge: "Sharp/NEC needed to design an all-in-one hardware and software management console for commercial properties and high-end holiday rentals. The system required absolute real-time sync across connected digital displays, locks, and smart room sensors, packaged in an interface simple enough for on-site staff to run effortlessly.",
    approach: "We spent weeks at a physical test suite, co-designing the hardware layout and its matching screen interface side-by-side. We built a customized web application using reactive state synchronization, ensuring changes on smart devices (like security settings, environmental sensors, or digital signage) reflect instantaneously in a glassmorphic dashboard layout. We integrated video previews and status logs for all connected screens directly in the control panel.",
    impact: "The solution successfully streamlined operations for property managers, reducing device downtime by 40% and shortening room turnaround times. The platform is now featured as part of Sharp/NEC's premium commercial display suite worldwide."
  },
  
  atlassian: {
    title: "Atlassian Progress Alignment",
    subtitle: "Helping globally distributed teams track project status seamlessly.",
    tag: "Enterprise Systems",
    client: "Atlassian Corporation",
    services: "UX Research, Interaction Design, System Architecture",
    capabilities: [
      "Progress Dashboard Architecture",
      "Interactive Collaboration Flows",
      "Complex Data Visualization",
      "Enterprise Accessibility"
    ],
    visualType: "image",
    visualUrl: "imgs/Mask group.png",
    challenge: "As teams scale globally, keeping everyone informed of project status without endless update meetings becomes extremely challenging. Atlassian wanted to design a highly visual, centralized progress alignment hub that could integrate across their extensive product suite (Jira, Confluence) while staying lightweight and intuitive.",
    approach: "We focused on a 'micro-alignment' philosophy, designing low-friction widgets that let developers and managers update milestones in two taps. We created a dashboard using responsive grid configurations and subtle color-coded pathways that reveal bottlenecks instantly. We conducted extensive usability testing with hundreds of global workers to ensure maximum accessibility and visual clarity.",
    impact: "Our designs were adopted into Jira's core roadmapping features, saving enterprise teams an average of 4.5 hours per week in status-sync meetings and leading to a significant increase in user satisfaction scores for cross-team coordination."
  },
  
  ericsson: {
    title: "Ericsson Industrial IoT",
    subtitle: "Solving Factory 4.0 challenges through robust 5G systems.",
    tag: "5G & Systems Strategy",
    client: "Ericsson",
    services: "Industrial UX Design, 5G Interface Engineering, Field Prototyping",
    capabilities: [
      "Factory 4.0 Dashboards",
      "Ultra-low Latency Interfaces",
      "5G Asset Tracking Design",
      "Rugged Device UI/UX"
    ],
    visualType: "image",
    visualUrl: "imgs/Mask group.png",
    challenge: "In Factory 4.0 industrial environments, managers oversee thousands of automated nodes over 5G networks. Existing dashboards were slow, technical, and prone to lag. Ericsson required an ultra-low latency, rugged mobile interface that could help operators track asset status, diagnose network drops, and deploy updates on active factory floors.",
    approach: "We spent time on-site in active manufacturing plants to understand operator conditions. We engineered a high-performance interface with optimized asset rendering and custom WebSockets-based synchronization. The UI uses high-contrast typography and large tap targets for use on rugged, glove-compatible tablets. Color tones reflect critical alarm thresholds instantly without clutter.",
    impact: "Our field-tested prototype demonstrated near-zero latency in asset diagnostic rendering, helping technicians locate physical node failures in seconds rather than minutes, and was showcased at Mobile World Congress as the gold standard for industrial 5G dashboards."
  },
  
  google: {
    title: "Google Flow Simplification",
    subtitle: "Translating massive database operations into clean consumer experiences.",
    tag: "Product & Search Design",
    client: "Google LLC",
    services: "Interaction Design, Interface Prototyping, Usability Audits",
    capabilities: [
      "Consumer Flow Optimization",
      "Search & Productivity Layouts",
      "High-Fidelity Prototyping",
      "Large-scale A/B Testing Strategy"
    ],
    visualType: "image",
    visualUrl: "imgs/Mask group.png",
    challenge: "Google's internal search and productivity systems manage petabytes of user data daily. The challenge was to redesign key productivity modules, reducing the cognitive load on power users while making advanced database operations feel simple and intuitive for new users.",
    approach: "We executed an end-to-end audit of user interaction flows, discovering hidden complexities in menu hierarchies and visual feedback states. We created a simplified interaction model, introducing keyboard shortcuts, fuzzy search filters, and progressive disclosure cards that keep complex secondary configurations hidden until explicitly requested. We built high-fidelity interactive prototypes to test micro-animations and transition states.",
    impact: "The optimized interaction flows reduced average task completion times by 32% for core user tasks, dramatically lowered user error rates, and were subsequently adopted into several key productivity frameworks across Google's enterprise suite."
  }
};

// 2. Navigation Scroll Handling
function handleScroll() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active link highlighters on scroll
  let currentSec = 'hero';
  sections.forEach(section => {
    const secTop = section.offsetTop - 120;
    if (window.scrollY >= secTop) {
      currentSec = section.getAttribute('id') || 'hero';
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
        // Unobserve to keep animated state permanent
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));
}

// 4. Portfolio Category Filtering Logic
function initPortfolioFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.case-study-card');
  const grid = document.getElementById('case-studies-grid');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle button active state
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterVal = btn.getAttribute('data-filter');

      // Animate grid wrapper to hide momentarily
      grid.style.opacity = '0.3';
      grid.style.transform = 'translateY(10px)';
      grid.style.transition = 'all 0.3s ease';

      setTimeout(() => {
        cards.forEach(card => {
          const categories = card.getAttribute('data-categories').split(' ');
          
          if (filterVal === 'all' || categories.includes(filterVal)) {
            card.style.display = 'flex';
            // Slight timeout to let DOM display kick in before opacity transition
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 50);
          } else {
            card.style.display = 'none';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
          }
        });

        // Restore grid wrapper opacity
        grid.style.opacity = '1';
        grid.style.transform = 'translateY(0)';
      }, 300);
    });
  });
}

// 5. Special Hover Video Controls for NEC Card
function initVideoHoverControls() {
  const necCard = document.getElementById('card-nec');
  if (!necCard) return;

  const video = necCard.querySelector('.card-video-bg');
  
  necCard.addEventListener('mouseenter', () => {
    if (video) {
      video.play().catch(e => console.log("Video autoplay blocked or pending interaction:", e));
      video.style.opacity = '0.6';
    }
  });

  necCard.addEventListener('mouseleave', () => {
    if (video) {
      video.pause();
      video.style.opacity = '0.15';
    }
  });
}

// 6. Accessible Case Study Modal System (HTML5 Dialog)
function initModalSystem() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close');
  const openButtons = document.querySelectorAll('.open-modal-btn');
  
  if (!modal || !closeBtn) return;

  // Open Modal logic
  openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectKey = btn.getAttribute('data-project');
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

      // Populate Hero Visual (Image or Video)
      const visualContainer = document.getElementById('modal-visual-container');
      visualContainer.innerHTML = '';
      
      if (data.visualType === 'video') {
        const video = document.createElement('video');
        video.src = data.visualUrl;
        video.className = 'modal-hero-video';
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.controls = true;
        visualContainer.appendChild(video);
      } else {
        const img = document.createElement('img');
        img.src = data.visualUrl;
        img.className = 'modal-hero-img';
        img.alt = `${data.title} illustrative background`;
        
        // Add specific hue-rotate style matching standard card styles
        if (projectKey === 'macys') {
          img.style.filter = 'hue-rotate(180deg) brightness(0.7)';
        } else if (projectKey === 'atlassian') {
          img.style.filter = 'hue-rotate(240deg) saturate(1.5) brightness(0.6)';
        } else if (projectKey === 'ericsson') {
          img.style.filter = 'hue-rotate(90deg) contrast(1.1) brightness(0.6)';
        } else {
          img.style.filter = 'saturate(0.8) brightness(0.6)';
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
    
    // Stop video if inside modal-visual-container to prevent background audio/processing
    const visualContainer = document.getElementById('modal-visual-container');
    const activeVideo = visualContainer.querySelector('video');
    if (activeVideo) {
      activeVideo.pause();
    }
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

  // Handle ESC key (HTML5 dialog closes by default, but we need to unlock body scroll)
  modal.addEventListener('cancel', () => {
    document.body.style.overflow = '';
  });
}

// 7. Mobile Navigation Drawer Toggle
function initMobileNav() {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.querySelector('.nav-menu');
  
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
      menu.style.background = 'rgba(7, 5, 20, 0.95)';
      menu.style.padding = '2rem';
      menu.style.borderBottom = '1px solid var(--glass-border-hover)';
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
  initPortfolioFiltering();
  initVideoHoverControls();
  initModalSystem();
  initMobileNav();
  
  // Trigger initial scroll check to set navbar style
  handleScroll();
});

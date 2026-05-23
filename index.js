/* ==========================================================================
   CoMedia Premium Presentation Engine (Figma frame-115 Replica)
   ========================================================================== */

let currentSlideIndex = 0;
const slides = window.SLIDE_DATA || [];

// Category to CSS Theme class mapping
const categoryThemes = {
  "ENGAGEMENT": "theme-yellow",
  "PROTOTYPES": "theme-burgundy",
  "METHODOLOGY": "theme-teal",
  "PHASES": "theme-green",
  "TEAM": "theme-blue"
};

// SVG Icon Templates for Slide Elements
const SVG_ICONS = {
  sun: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>`,
  heart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>`,
  nodes: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>`
};

// Core Slide Content Injector/Renderer
function renderSlide(index) {
  const canvas = document.getElementById("slide-canvas");
  if (!canvas || !slides[index]) return;

  const data = slides[index];
  
  // Set Category Theme Class
  document.body.className = categoryThemes[data.category] || "theme-yellow";
  
  // Render based on layout type
  let contentHtml = "";

  if (data.layout === "title-slide") {
    contentHtml = `
      <div class="slide-content-wrapper layout-title-slide">
        <div class="title-info-col">
          <span class="title-tag-line">${data.tag}</span>
          <h1 class="hero-main-title">${data.title}</h1>
          <p class="hero-sub-title">${data.subtitle}</p>
        </div>
        <div class="title-visual-col">
          <img src="${data.visualUrl}" class="title-visual-img" alt="Agentic OS Submitted to Samsung visual image">
        </div>
      </div>
    `;
  } 
  
  else if (data.layout === "two-column-quote") {
    const blocksHtml = data.blocks.map(b => `
      <div class="info-block-cell">
        <h3 class="cell-heading">${b.heading}</h3>
        <p class="cell-paragraph">${b.text}</p>
      </div>
    `).join("");

    contentHtml = `
      <div class="slide-content-wrapper layout-two-column-quote">
        <div class="content-blocks-col">
          <h2 class="main-title-text">${data.title}</h2>
          ${blocksHtml}
        </div>
        <div class="quote-blocks-col">
          <blockquote class="giant-side-quote">"${data.quote}"</blockquote>
        </div>
      </div>
    `;
  } 
  
  else if (data.layout === "three-column") {
    const colsHtml = data.columns.map(c => `
      <div class="three-col-cell">
        ${c.icon ? `<div class="cell-icon-wrap">${SVG_ICONS[c.icon]}</div>` : ""}
        <h3 class="cell-heading">${c.heading}</h3>
        <p class="cell-paragraph">${c.text}</p>
      </div>
    `).join("");

    contentHtml = `
      <div class="slide-content-wrapper layout-three-column">
        <div class="three-col-header">
          <h2 class="three-col-main-title">${data.title}</h2>
          ${data.subtitle ? `<p class="three-col-sub-title">${data.subtitle}</p>` : ""}
        </div>
        <div class="three-col-grid">
          ${colsHtml}
        </div>
      </div>
    `;
  } 
  
  else if (data.layout === "roadmap-table") {
    const rowsHtml = data.rows.map(r => `
      <div class="table-row-item">
        <div class="cell-bold">${r.scope}</div>
        <div class="cell-regular">${r.phases}</div>
        <div class="cell-regular">${r.focus}</div>
        <div class="cell-bold">${r.timeline}</div>
      </div>
    `).join("");

    contentHtml = `
      <div class="slide-content-wrapper layout-table">
        <div class="table-header">
          <h2 class="table-main-title">${data.title}</h2>
          <p class="table-sub-title">${data.subtitle}</p>
        </div>
        <div class="table-body">
          ${rowsHtml}
        </div>
      </div>
    `;
  } 
  
  else if (data.layout === "deliverables-table") {
    const rowsHtml = data.rows.map(r => `
      <div class="deliverable-row-item">
        <div class="cell-deliverable-name">${r.deliverable}</div>
        <div class="cell-regular">${r.description}</div>
      </div>
    `).join("");

    contentHtml = `
      <div class="slide-content-wrapper layout-deliverables-table">
        <div class="table-header">
          <h2 class="table-main-title">${data.title}</h2>
          ${data.subtitle ? `<p class="table-sub-title">${data.subtitle}</p>` : ""}
        </div>
        <div class="table-body">
          ${rowsHtml}
        </div>
      </div>
    `;
  } 
  
  else if (data.layout === "mockup-slide") {
    const c = data.phoneContent;
    const bubblesHtml = c.items.map(item => `
      <div class="notification-bubble">
        <div class="bubble-title">${item.title}</div>
        <div class="bubble-desc">${item.desc}</div>
      </div>
    `).join("");

    contentHtml = `
      <div class="slide-content-wrapper layout-mockup-slide" style="background-image: linear-gradient(to right, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.4) 100%), url('${data.bgImage}');">
        <div class="mockup-left-panel">
          <div class="qr-container-box">
            <img src="${data.qrCode}" class="qr-code-img" alt="Prototype access QR Code">
          </div>
          <p class="mockup-desc-text">Scan QR to experience active failure and intelligent recovery prototypes on your mobile device.</p>
        </div>
        <div class="mockup-right-panel">
          <div class="phone-glass-container">
            <div class="phone-header-notch"></div>
            <span class="phone-pill-heading">Already handled • ${c.handledCount} Items</span>
            <div class="phone-notifications-list">
              ${bubblesHtml}
            </div>
            <div class="phone-bottom-nudge">
              ${c.nudge}
            </div>
          </div>
        </div>
      </div>
    `;
  } 
  
  else if (data.layout === "synthetic-testing") {
    contentHtml = `
      <div class="slide-content-wrapper layout-synthetic-testing">
        <div class="synthetic-left">
          <h2 class="synthetic-heading">${data.title}</h2>
          <p class="synthetic-sub">Designed to complement live research, not replace it.</p>
          <p class="synthetic-desc">${data.text}</p>
        </div>
        <div class="synthetic-right">
          <img src="${data.visualUrl}" class="synthetic-dashboard-img" alt="CoMedia GUXS Synthetic dashboard app mockup">
        </div>
      </div>
    `;
  } 
  
  else if (data.layout === "trusted-logos") {
    const boxesHtml = data.logos.map(logo => `
      <div class="logo-box-cell">
        ${logo.file ? `<img src="${logo.file}" class="logo-vector-img" alt="${logo.name} brand logo">` : `<span class="logo-placeholder-text">${logo.name}</span>`}
      </div>
    `).join("");

    contentHtml = `
      <div class="slide-content-wrapper layout-trusted-logos">
        <div class="logos-top">
          <h2 class="logos-main-title">${data.title}</h2>
          <p class="logos-sub-title">${data.subtitle}</p>
        </div>
        <div class="logos-cells-grid">
          ${boxesHtml}
        </div>
      </div>
    `;
  } 
  
  else if (data.layout === "team-grid") {
    const cellsHtml = data.team.map(m => `
      <div class="team-member-cell">
        <h3 class="member-cell-name">${m.name}</h3>
        <span class="member-cell-role">${m.role}</span>
        <p class="member-cell-bio">${m.bio}</p>
      </div>
    `).join("");

    contentHtml = `
      <div class="slide-content-wrapper layout-team-grid">
        <div class="team-top">
          <h2 class="team-main-title">${data.title}</h2>
        </div>
        <div class="team-cells-grid">
          ${cellsHtml}
        </div>
      </div>
    `;
  }

  canvas.innerHTML = contentHtml;

  // Update Bottom Counters
  const counter = document.getElementById("slide-counter");
  if (counter) {
    const displayNum = String(index + 1).padStart(2, '0');
    const displayTotal = String(slides.length).padStart(2, '0');
    counter.textContent = `${displayNum} / ${displayTotal}`;
  }

  // Update Header Tabs Highlight and indicator bar
  updateNavigationTabs(data.category);
}

// Navigation Category Underline Mapper
function updateNavigationTabs(activeCategory) {
  const tabs = document.querySelectorAll(".nav-tab");
  const bar = document.getElementById("indicator-bar");
  if (!bar) return;

  let activeTab = null;

  tabs.forEach(tab => {
    tab.classList.remove("active");
    if (tab.getAttribute("data-category") === activeCategory) {
      tab.classList.add("active");
      activeTab = tab;
    }
  });

  // Calculate coordinates to move the bar smoothly
  if (activeTab) {
    const parentLeft = activeTab.offsetParent.getBoundingClientRect().left;
    const tabRect = activeTab.getBoundingClientRect();
    
    // Offset relative to navigation container
    const relativeLeft = tabRect.left - parentLeft;
    
    bar.style.left = `${relativeLeft}px`;
    bar.style.width = `${tabRect.width}px`;
  }
}

// Presentation Navigation Handlers
function navigatePrev() {
  if (currentSlideIndex > 0) {
    currentSlideIndex--;
    renderSlide(currentSlideIndex);
  }
}

function navigateNext() {
  if (currentSlideIndex < slides.length - 1) {
    currentSlideIndex++;
    renderSlide(currentSlideIndex);
  }
}

// Setup Presentation Event Listeners
function initPresentation() {
  // Arrow Button Clicks
  const prevBtn = document.getElementById("arrow-prev");
  const nextBtn = document.getElementById("arrow-next");

  if (prevBtn) prevBtn.addEventListener("click", navigatePrev);
  if (nextBtn) nextBtn.addEventListener("click", navigateNext);

  // Keyboard controls
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "Space") {
      e.preventDefault();
      navigateNext();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      navigatePrev();
    }
  });

  // Navigation Tabs Clicks
  const tabs = document.querySelectorAll(".nav-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const targetSlide = parseInt(tab.getAttribute("data-target-slide")) - 1;
      if (!isNaN(targetSlide) && targetSlide >= 0 && targetSlide < slides.length) {
        currentSlideIndex = targetSlide;
        renderSlide(currentSlideIndex);
      }
    });
  });

  // Accessible Modal handlers
  const trigger = document.getElementById("contact-trigger");
  const dialog = document.getElementById("contact-dialog");
  const closeBtn = document.getElementById("modal-close");

  if (trigger && dialog && closeBtn) {
    trigger.addEventListener("click", () => dialog.showModal());
    closeBtn.addEventListener("click", () => dialog.close());
    
    // Close on clicking backdrop
    dialog.addEventListener("click", (e) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog = (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      );
      if (!isInDialog) {
        dialog.close();
      }
    });
  }

  // Initial render
  renderSlide(currentSlideIndex);
  
  // Trigger layout sizing on window resize to ensure indicator bar matches
  window.addEventListener("resize", () => {
    const activeData = slides[currentSlideIndex];
    if (activeData) updateNavigationTabs(activeData.category);
  });
}

// DOM Initialization trigger
window.addEventListener("DOMContentLoaded", initPresentation);

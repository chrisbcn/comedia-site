/* ==========================================================================
   CoMedia Premium Webpage Interaction Script (Figma Screenshot Replica)
   ========================================================================= */

document.addEventListener("DOMContentLoaded", () => {
  // Dialogue/Modal Handlers
  const trigger = document.getElementById("contact-trigger");
  const dialog = document.getElementById("contact-dialog");
  const closeBtn = document.getElementById("modal-close");

  if (trigger && dialog && closeBtn) {
    // Open Dialog
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      dialog.showModal();
    });

    // Close Dialog
    closeBtn.addEventListener("click", () => {
      dialog.close();
    });

    // Close Dialog on clicking backdrop
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

  // Double Check Header Styling on scroll (subtle glass border fade-in)
  const header = document.querySelector(".site-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.style.backgroundColor = "rgba(12, 12, 12, 0.95)";
      header.style.height = "80px";
      header.style.borderBottomColor = "rgba(255, 75, 141, 0.1)";
    } else {
      header.style.backgroundColor = "rgba(12, 12, 12, 0.85)";
      header.style.height = "90px";
      header.style.borderBottomColor = "rgba(255, 255, 255, 0.04)";
    }
  });
});

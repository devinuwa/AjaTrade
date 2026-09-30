/* ===== AjaTrade waitlist page JS ===== */
(function () {
  "use strict";

  /* ---------- Waitlist form ---------- */
  const form = document.getElementById("waitlist-form");
  const success = document.getElementById("waitlist-success");
  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("email-error");

  function isValidEmail(value) {
    // Simple, pragmatic client-side validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = emailInput.value.trim();
    const role = document.getElementById("role").value;

    if (!isValidEmail(email)) {
      emailError.hidden = false;
      emailInput.setAttribute("aria-invalid", "true");
      emailInput.focus();
      return;
    }
    emailError.hidden = true;
    emailInput.removeAttribute("aria-invalid");

    const submission = { name: name || null, email, role: role || null, createdAt: new Date().toISOString() };

    // TODO: connect to email service (Mailchimp / ConvertKit / API endpoint / Google Form).
    // Example:
    //   await fetch("https://your-api.example.com/waitlist", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(submission),
    //   });
    try {
      const existing = JSON.parse(localStorage.getItem("ajatrade_waitlist") || "[]");
      existing.push(submission);
      localStorage.setItem("ajatrade_waitlist", JSON.stringify(existing));
    } catch (_) {
      /* storage unavailable — still show success for demo purposes */
    }

    form.hidden = true;
    success.hidden = false;
  });

  // Clear error state while typing
  emailInput.addEventListener("input", function () {
    if (!emailError.hidden && isValidEmail(emailInput.value)) {
      emailError.hidden = true;
      emailInput.removeAttribute("aria-invalid");
    }
  });

  /* ---------- Floating WhatsApp button + Coming Soon modal ---------- */
  const fab = document.getElementById("wa-fab");
  const overlay = document.getElementById("wa-modal-overlay");
  const modal = document.getElementById("wa-modal");
  const closeBtn = document.getElementById("wa-modal-close");
  const cta = document.getElementById("wa-modal-cta");
  let lastFocused = null;

  function openModal() {
    lastFocused = document.activeElement;
    overlay.hidden = false;
    fab.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function closeModal() {
    overlay.hidden = true;
    fab.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  fab.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);

  // Dismiss by clicking outside the modal
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closeModal();
  });

  // Dismiss with Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !overlay.hidden) closeModal();
  });

  // Simple focus trap while the modal is open
  modal.addEventListener("keydown", function (e) {
    if (e.key !== "Tab") return;
    const focusables = modal.querySelectorAll("button, a[href]");
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  // Modal CTA → close modal, then smooth-scroll to the waitlist form
  cta.addEventListener("click", function () {
    closeModal();
    document.getElementById("waitlist").scrollIntoView({ behavior: "smooth" });
  });
})();

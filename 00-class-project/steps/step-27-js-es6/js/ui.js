import { openStatusText, isOpenAt } from "./hours.js";

const navToggle = document.querySelector(".nav-toggle");
const mainNav   = document.getElementById("main-nav");
const statusEl  = document.getElementById("open-status");
const themeBtn  = document.getElementById("theme-toggle");

export function initUI() {
  // ?. – אם האלמנט לא קיים בדף הזה, פשוט לא קורה כלום
  navToggle?.addEventListener("click", () => {
    const open = mainNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "סגירת תפריט" : "פתיחת תפריט");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mainNav?.classList.contains("is-open")) {
      mainNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.focus();
    }
  });

  if (statusEl) {
    statusEl.textContent = openStatusText();
    statusEl.classList.toggle("is-open", isOpenAt());
    statusEl.classList.toggle("is-closed", !isOpenAt());
  }

  document.querySelectorAll(".site-footer small").forEach((el) => {
    el.textContent = el.textContent.replace("2026", String(new Date().getFullYear()));
  });
}

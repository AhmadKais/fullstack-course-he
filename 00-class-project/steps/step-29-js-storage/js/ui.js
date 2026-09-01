import { openStatusText, isOpenAt } from "./hours.js";
import { loadTheme, saveTheme } from "./storage.js";
const navToggle = document.querySelector(".nav-toggle");
const mainNav   = document.getElementById("main-nav");
const statusEl  = document.getElementById("open-status");
const themeBtn  = document.getElementById("theme-toggle");

function initTheme() {
  const saved = loadTheme();
  if (saved) document.documentElement.dataset.theme = saved;
  paintToggle();

  themeBtn?.addEventListener("click", () => {
    const current = document.documentElement.dataset.theme
      || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    saveTheme(next);
    paintToggle();
  });
}

function paintToggle() {
  if (!themeBtn) return;
  const dark = document.documentElement.dataset.theme === "dark";
  themeBtn.textContent = dark ? "☀️" : "🌙";
  themeBtn.setAttribute("aria-label", dark ? "מעבר למצב בהיר" : "מעבר למצב כהה");
}

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

  initTheme();
}

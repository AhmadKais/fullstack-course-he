import { formatPrice, matchesSearch } from "./format.js";

const list = document.getElementById("menu-list");
const filterBar = document.querySelector(".filters");
const searchInput = document.getElementById("menu-search");

let items = [];
let activeCat = "all";
let searchTerm = "";

const itemHTML = ({ id, name, price, cat, note }) => `
  <li class="menu-item" data-cat="${cat}" data-id="${id}">
    <div><b>${name}</b><small class="item-note">${note}</small></div>
    <span class="price">${formatPrice(price)}</span>
    <button type="button" class="add-btn" data-id="${id}">הוספה</button>
  </li>`;

export function renderMenu(list_items) {
  if (!list) return;
  list.innerHTML = list_items.length
    ? list_items.map(itemHTML).join("")
    : '<li class="empty">לא נמצאו פריטים מתאימים.</li>';
}

const visible = () =>
  items.filter((item) =>
    (activeCat === "all" || item.cat === activeCat) && matchesSearch(item, searchTerm));

const refresh = () => renderMenu(visible());

export function showLoading() {
  if (!list) return;
  list.innerHTML = Array.from({ length: 6 })
    .map(() => '<li class="skeleton"></li>')
    .join("");
}

export function showError(message, onRetry) {
  if (!list) return;
  list.innerHTML = `<li class="error-box">
      <b>לא הצלחנו לטעון את התפריט.</b>
      <br><small>${message}</small>
      <br><button type="button" id="menu-retry">ניסיון נוסף</button>
    </li>`;
  document.getElementById("menu-retry")?.addEventListener("click", onRetry);
}

export function initMenu(menuItems) {
  items = menuItems;
  refresh();

  filterBar?.addEventListener("click", (event) => {
    const btn = event.target.closest(".filter");
    if (!btn) return;
    activeCat = btn.dataset.cat;
    filterBar.querySelectorAll(".filter")
      .forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
    refresh();
  });

  searchInput?.addEventListener("input", (event) => {
    searchTerm = event.target.value;
    refresh();
  });
}

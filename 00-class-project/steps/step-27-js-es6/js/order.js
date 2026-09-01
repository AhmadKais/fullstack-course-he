import { formatPrice } from "./format.js";

const listEl  = document.getElementById("order-items");
const totalEl = document.getElementById("order-total");
const clearEl = document.getElementById("order-clear");
const menuEl  = document.getElementById("menu-list");

let order = [];
let catalog = [];

function render() {
  if (!listEl) return;

  listEl.innerHTML = order
    .map(({ name, price, qty }) =>
      `<li><span>${name} × ${qty}</span>
           <span class="price">${formatPrice(price * qty)}</span></li>`)
    .join("");

  const total = order.reduce((sum, { price, qty }) => sum + price * qty, 0);
  totalEl.textContent = formatPrice(total);
}

export function addToOrder(id) {
  const item = catalog.find((m) => m.id === id);
  if (!item) return;

  const line = order.find((l) => l.id === id);
  if (line) {
    line.qty += 1;
  } else {
    // spread: מעתיקים את הפריט ומוסיפים שדה, בלי לשנות את המקור
    order = [...order, { ...item, qty: 1 }];
  }
  render();
}

export function initOrder(menuItems) {
  catalog = menuItems;
  render();

  menuEl?.addEventListener("click", (event) => {
    const btn = event.target.closest(".add-btn");
    if (btn) addToOrder(btn.dataset.id);
  });

  clearEl?.addEventListener("click", () => {
    order = [];
    render();
  });
}

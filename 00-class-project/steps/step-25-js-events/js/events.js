// ============================================================
// שלב 25 · אירועים – האתר מגיב
// ============================================================

const filterBar   = document.querySelector(".filters");
const searchInput = document.getElementById("menu-search");
const navToggle   = document.querySelector(".nav-toggle");
const mainNav     = document.getElementById("main-nav");
const orderItems  = document.getElementById("order-items");
const orderTotalEl = document.getElementById("order-total");
const orderClear  = document.getElementById("order-clear");

let activeCat = "all";
let searchTerm = "";

/** מחזיר את הפריטים שעוברים גם את הקטגוריה וגם את החיפוש */
function visibleItems() {
  return MENU.filter(function (item) {
    const catOk = activeCat === "all" || item.cat === activeCat;
    return catOk && matchesSearch(item, searchTerm);
  });
}

function refresh() {
  renderMenu(visibleItems());
}

// ---------- סינון לפי קטגוריה ----------
// מאזין אחד על ההורה במקום חמישה על הכפתורים. זה נקרא Event Delegation.
if (filterBar) {
  filterBar.addEventListener("click", function (event) {
    const btn = event.target.closest(".filter");
    if (!btn) return;                      // נלחץ הרווח בין הכפתורים

    activeCat = btn.dataset.cat;

    filterBar.querySelectorAll(".filter").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b === btn));
    });

    refresh();
  });
}

// ---------- חיפוש ----------
if (searchInput) {
  searchInput.addEventListener("input", function (event) {
    searchTerm = event.target.value;
    refresh();
  });
}

// ---------- תפריט מובייל ----------
if (navToggle && mainNav) {
  navToggle.addEventListener("click", function () {
    const isOpen = mainNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "סגירת תפריט" : "פתיחת תפריט");
  });
}

// ---------- הוספה להזמנה ----------
// גם כאן delegation: הכפתורים נוצרים מחדש בכל סינון,
// אז מאזין שהוצמד אליהם ישירות היה נעלם.
if (menuList) {
  menuList.addEventListener("click", function (event) {
    const btn = event.target.closest(".add-btn");
    if (!btn) return;

    const item = MENU.find(function (m) { return m.id === btn.dataset.id; });
    if (!item) return;

    const existing = order.find(function (line) { return line.id === item.id; });
    if (existing) {
      existing.qty++;
    } else {
      order.push({ id: item.id, name: item.name, price: item.price, qty: 1 });
    }
    renderOrder();
  });
}

function renderOrder() {
  if (!orderItems) return;

  let html = "";
  for (const line of order) {
    html += '<li><span>' + line.name + ' × ' + line.qty + '</span>'
          + '<span class="price">' + formatPrice(line.price * line.qty) + '</span></li>';
  }
  orderItems.innerHTML = html;

  orderTotal = order.reduce(function (sum, line) {
    return sum + line.price * line.qty;
  }, 0);

  orderTotalEl.textContent = formatPrice(orderTotal);
}

if (orderClear) {
  orderClear.addEventListener("click", function () {
    order = [];
    renderOrder();
  });
}

// ---------- מקלדת ----------
// Esc סוגר את תפריט המובייל. משתמשים מצפים לזה.
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && mainNav && mainNav.classList.contains("is-open")) {
    mainNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.focus();
  }
});

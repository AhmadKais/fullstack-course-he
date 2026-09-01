// ============================================================
// שלב 24 · DOM – מכאן התפריט נבנה מהקוד, לא נכתב ביד
// ============================================================

// --- בוחרים אלמנטים פעם אחת, בראש הקובץ ---
const menuList   = document.getElementById("menu-list");
const openStatus = document.getElementById("open-status");
const yearSlot   = document.querySelectorAll(".site-footer small");

// אותו קובץ JS נטען בארבעת הדפים, אבל #menu-list קיים רק ב-menu.html.
// בלי הבדיקה הזו נקבל "Cannot set properties of null" בכל דף אחר.

/** מחזיר את ה-HTML של פריט אחד */
function menuItemHTML(item) {
  return '<li class="menu-item" data-cat="' + item.cat + '" data-id="' + item.id + '">'
    + '<div><b>' + item.name + '</b>'
    + '<small class="item-note">' + item.note + '</small></div>'
    + '<span class="price">' + formatPrice(item.price) + '</span>'
    + '</li>';
}

/** מצייר רשימת פריטים לתוך הדף */
function renderMenu(items) {
  if (!menuList) return;

  if (items.length === 0) {
    menuList.innerHTML = '<li class="empty">לא נמצאו פריטים מתאימים.</li>';
    return;
  }

  // בונים מחרוזת אחת ומכניסים פעם אחת.
  // 18 קריאות ל-innerHTML = 18 חישובי פריסה מחדש. אחת = אחד.
  let html = "";
  for (const item of items) {
    html += menuItemHTML(item);
  }
  menuList.innerHTML = html;
}

/** מציג אם אנחנו פתוחים, ובאיזה צבע */
function renderOpenStatus() {
  if (!openStatus) return;
  const open = isOpenAt();
  openStatus.textContent = openStatusText();
  openStatus.classList.toggle("is-open", open);
  openStatus.classList.toggle("is-closed", !open);
}

/** שנה נוכחית בפוטר – כדי שאף אחד לא ישכח לעדכן ב-1 בינואר */
function renderYear() {
  yearSlot.forEach(function (el) {
    el.textContent = el.textContent.replace("2026", new Date().getFullYear());
  });
}

renderMenu(MENU);
renderOpenStatus();
renderYear();

// --- יצירת אלמנט "בדרך הארוכה" – בטוחה יותר לתוכן ממשתמש ---
// innerHTML מפרש תגיות. textContent לא. עם קלט של משתמש – תמיד textContent.
function makeNote(text) {
  const p = document.createElement("p");
  p.className = "muted";
  p.textContent = text;        // גם אם text מכיל <script>, הוא יוצג כטקסט
  return p;
}
console.log(makeNote("<b>לא יודגש</b>").outerHTML);

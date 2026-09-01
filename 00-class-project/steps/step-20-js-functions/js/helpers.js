// ============================================================
// שלב 20 · פונקציות עזר – כל חישוב שחוזר יותר מפעם אחת
// ============================================================

/** 13 → "13₪" */
function formatPrice(amount) {
  return amount + "\u20AA";
}

/** מחיר כולל מע"מ, מעוגל לשקל */
function withVat(amount) {
  return Math.round(amount * (1 + VAT_RATE));
}

/** הנחת סטודנט – פרמטר עם ערך ברירת מחדל */
function applyDiscount(amount, percent) {
  if (percent === undefined) percent = 10;
  return Math.round(amount * (100 - percent) / 100);
}

/** פונקציית חץ – קצרה יותר, מחזירה בלי return */
const doubleShot = (amount) => amount + 4;

console.log(formatPrice(13));                 // 13₪
console.log(withVat(100));                    // 118
console.log(applyDiscount(50));               // 45  (ברירת מחדל 10%)
console.log(applyDiscount(50, 25));           // 38
console.log(formatPrice(doubleShot(PRICE_ESPRESSO || 9)));

// --- Scope: משתנה שנולד בתוך פונקציה מת בסופה ---
function makeCoffee() {
  const beans = "אתיופיה";     // קיים רק כאן
  return "קפה מפולי " + beans;
}
console.log(makeCoffee());
// console.log(beans);  ← ReferenceError. נסו בקונסולה.

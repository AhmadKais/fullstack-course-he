// ============================================================
// פונקציות עזר – עם עיצוב מספרים ומחרוזות נכון (שלב 23)
// ============================================================

/** 13 → "‏13.00 ₪" בפורמט ישראלי אמיתי */
function formatPrice(amount) {
  return amount.toLocaleString("he-IL", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 0,
  });
}

/** מחיר כולל מע"מ, מעוגל לשקל */
function withVat(amount) {
  return Math.round(amount * (1 + VAT_RATE));
}

function applyDiscount(amount, percent) {
  if (percent === undefined) percent = 10;
  return Math.round(amount * (100 - percent) / 100);
}

/**
 * ניקוי טקסט חיפוש: רווחים מיותרים + אותיות קטנות.
 * בלי זה " Hafuch " לא ימצא את "hafuch".
 */
function normalize(text) {
  return String(text).trim().toLowerCase();
}

/** האם הפריט מתאים למילת החיפוש? */
function matchesSearch(item, term) {
  const q = normalize(term);
  if (q === "") return true;
  return normalize(item.name).includes(q) || normalize(item.note).includes(q);
}

console.log(formatPrice(13));
console.log(formatPrice(1250));
console.log(withVat(100), applyDiscount(50), applyDiscount(50, 25));
console.log(normalize("   HaFuCh  "));

// --- מספרים: המלכודת הקלאסית ---
console.log(0.1 + 0.2);              // 0.30000000000000004
console.log((0.1 + 0.2).toFixed(2)); // "0.30"  ← מחרוזת!
console.log(Math.round((0.1 + 0.2) * 100) / 100); // 0.3 ← מספר

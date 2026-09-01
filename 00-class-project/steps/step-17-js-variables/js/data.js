// ============================================================
// קפה עתיד – נתוני העסק
// ============================================================

// const = ערך שלא משתנה לאורך חיי הדף
const CAFE_NAME    = "קפה עתיד";
const CAFE_ADDRESS = "הרצל 42, תל אביב";
const CAFE_PHONE   = "03-1234567";
const YEAR_OPENED  = 2015;
const SEATS        = 34;
const HAS_WIFI     = true;
const VAT_RATE     = 0.18;

// let = ערך שכן ישתנה תוך כדי ריצה
let orderTotal = 0;

// ---------- שלב 17: מה יש לנו ביד ----------
console.log(CAFE_NAME + " · " + CAFE_ADDRESS);
console.log("שנות פעילות:", 2026 - YEAR_OPENED);
console.log("טיפוסים:", typeof CAFE_NAME, typeof SEATS, typeof HAS_WIFI);

// המלכודת הראשונה של JavaScript:
// כל ערך שמגיע משדה טופס הוא מחרוזת, גם אם הוא נראה כמו מספר.
const priceFromInput = "9";
console.log(priceFromInput + 1);          // "91"  ← שרשור מחרוזות
console.log(Number(priceFromInput) + 1);  // 10    ← מה שהתכוונו

// undefined = הוכרז ולא קיבל ערך.  null = ריק בכוונה.
let tableNumber;
const noDiscount = null;
console.log(tableNumber, noDiscount);

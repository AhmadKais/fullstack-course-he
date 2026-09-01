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

// ---------- התפריט: מערך של אובייקטים ----------
// כל פריט הוא ישות אחת שנושאת את כל המידע שלו.
const MENU = [
  // קפה חם
  { id: "espresso", name: "אספרסו", price: 9, cat: "hot", note: "שוט אחד של פולים קלויים אצלנו" },
  { id: "espresso-double", name: "אספרסו כפול", price: 12, cat: "hot", note: "לימים ארוכים" },
  { id: "americano", name: "אמריקנו", price: 11, cat: "hot", note: "אספרסו עם מים חמים" },
  { id: "hafuch", name: "הפוך", price: 13, cat: "hot", note: "הכי נמכר אצלנו" },
  { id: "cappuccino", name: "קפוצ׳ינו", price: 14, cat: "hot", note: "קצף חלב עבה" },
  { id: "macchiato", name: "מקיאטו", price: 10, cat: "hot", note: "אספרסו עם כף קצף" },
  // קפה קר
  { id: "iced-coffee", name: "קפה קר", price: 15, cat: "cold", note: "נטחן בכלי עם קרח" },
  { id: "ice-coffee", name: "אייס קפה", price: 16, cat: "cold", note: "גלידה וקפה" },
  { id: "cold-hafuch", name: "קר הפוך", price: 15, cat: "cold", note: "חלב קר ואספרסו" },
  { id: "lemonade", name: "לימונדה נענע", price: 14, cat: "cold", note: "נסחטת במקום" },
  // מאפים
  { id: "croissant", name: "קרואסון חמאה", price: 12, cat: "bakery", note: "יוצא מהתנור ב-07:00" },
  { id: "borekas", name: "בורקס גבינה", price: 14, cat: "bakery", note: "עם ביצה קשה ומלפפון חמוץ" },
  { id: "choc-cake", name: "עוגת שוקולד", price: 18, cat: "bakery", note: "ללא קמח" },
  { id: "cookie", name: "עוגיית שוקולד צ׳יפס", price: 8, cat: "bakery", note: "נאפית כל בוקר" },
  // ארוחות
  { id: "shakshuka", name: "שקשוקה", price: 42, cat: "meals", note: "עם לחם מחמצת" },
  { id: "toast", name: "טוסט גבינות", price: 32, cat: "meals", note: "שלוש גבינות ועגבנייה" },
  { id: "salad", name: "סלט הבית", price: 38, cat: "meals", note: "ירקות העונה וגבינת עיזים" },
  { id: "avocado", name: "כריך אבוקדו", price: 36, cat: "meals", note: "על לחם כפרי" },
];

const CATEGORIES = {
  hot:    "קפה חם",
  cold:   "קפה קר",
  bakery: "מאפים",
  meals:  "ארוחות",
};

const cupsPerDay = [312, 287, 341, 298, 355, 190, 0];

// ההזמנה הנוכחית – מתמלאת בשלב 25
let order = [];

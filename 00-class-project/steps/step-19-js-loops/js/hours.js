// ============================================================
// שלב 18 · האם אנחנו פתוחים עכשיו?
// אופרטורים, השוואות ותנאים
// ============================================================

const now = new Date();
const day = now.getDay();     // 0 = ראשון, 5 = שישי, 6 = שבת
const hour = now.getHours();  // 0-23

let dayName = "";
let openHour = null;
let closeHour = null;

// switch כשיש רשימת מקרים סגורה
switch (day) {
  case 0: dayName = "ראשון";  openHour = 7; closeHour = 20; break;
  case 1: dayName = "שני";    openHour = 7; closeHour = 20; break;
  case 2: dayName = "שלישי";  openHour = 7; closeHour = 20; break;
  case 3: dayName = "רביעי";  openHour = 7; closeHour = 20; break;
  case 4: dayName = "חמישי";  openHour = 7; closeHour = 20; break;
  case 5: dayName = "שישי";   openHour = 7; closeHour = 15; break;
  case 6: dayName = "שבת";    openHour = null; closeHour = null; break;
}

// && = וגם.  שלושה תנאים שכולם חייבים להתקיים.
const isOpen = openHour !== null && hour >= openHour && hour < closeHour;

// אופרטור טרנארי: תנאי ? אם נכון : אם לא
const statusText = isOpen
  ? "פתוח עכשיו · נסגר ב-" + closeHour + ":00"
  : "סגור כרגע";

console.log("היום " + dayName + ", השעה " + hour);
console.log(statusText);

// ⚠️ שווה בדיוק (===) מול שווה (==):
console.log(0 == "0");    // true   ← ממיר טיפוסים לפני ההשוואה
console.log(0 === "0");   // false  ← משווה גם את הטיפוס. תמיד זה.
console.log(hour === "7");  // false גם בשבע בבוקר! getHours מחזיר מספר.

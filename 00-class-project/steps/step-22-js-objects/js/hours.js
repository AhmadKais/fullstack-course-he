// ============================================================
// שלב 20 · אותה לוגיקה, עכשיו כפונקציה שאפשר לקרוא לה מכל מקום
// ============================================================

const WEEK = [
  { name: "ראשון", open: 7, close: 20 },
  { name: "שני",   open: 7, close: 20 },
  { name: "שלישי", open: 7, close: 20 },
  { name: "רביעי", open: 7, close: 20 },
  { name: "חמישי", open: 7, close: 20 },
  { name: "שישי",  open: 7, close: 15 },
  { name: "שבת",   open: null, close: null },
];

/**
 * האם בית הקפה פתוח בזמן נתון?
 * @param {Date} when – ברירת מחדל: עכשיו
 * @returns {boolean}
 */
function isOpenAt(when) {
  if (!when) when = new Date();
  const today = WEEK[when.getDay()];
  if (today.open === null) return false;          // יציאה מוקדמת
  const hour = when.getHours();
  return hour >= today.open && hour < today.close;
}

/** טקסט המצב להצגה למשתמש */
function openStatusText(when) {
  if (!when) when = new Date();
  const today = WEEK[when.getDay()];
  if (isOpenAt(when)) return "פתוח עכשיו · נסגר ב-" + today.close + ":00";
  if (today.open === null) return "סגור · נתראה ביום ראשון ב-07:00";
  return "סגור כרגע · נפתח ב-0" + today.open + ":00";
}

console.log(openStatusText());

// בדיקה בלי לחכות ליום שישי: מזריקים תאריך משלנו
console.log("שבת בצהריים:", openStatusText(new Date("2026-09-05T12:00:00")));
console.log("שני ב-08:00:", openStatusText(new Date("2026-09-07T08:00:00")));

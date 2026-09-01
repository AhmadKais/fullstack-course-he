// ============================================================
// שעות הפעילות – עם עיצוב זמן נכון (שלב 23)
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

/** 7 → "07:00" ; padStart ממלא אפסים משמאל */
function formatHour(h) {
  return String(h).padStart(2, "0") + ":00";
}

function isOpenAt(when) {
  if (!when) when = new Date();
  const today = WEEK[when.getDay()];
  if (today.open === null) return false;
  const hour = when.getHours();
  return hour >= today.open && hour < today.close;
}

function openStatusText(when) {
  if (!when) when = new Date();
  const today = WEEK[when.getDay()];
  if (isOpenAt(when)) return "פתוח עכשיו · נסגר ב-" + formatHour(today.close);
  if (today.open === null) return "סגור · נתראה ביום ראשון ב-" + formatHour(7);
  return "סגור כרגע · נפתח ב-" + formatHour(today.open);
}

console.log(openStatusText());

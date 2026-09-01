// ============================================================
// שלב 21 · אותם חישובים, במתודות מערך במקום לולאות
// ============================================================

// reduce: מקפל מערך לערך אחד
const totalCups = cupsPerDay.reduce(function (sum, cups) {
  return sum + cups;
}, 0);
console.log("סה\"כ כוסות השבוע:", totalCups);

// Math.max עם spread – פורש את המערך לארגומנטים נפרדים
console.log("היום העמוס:", Math.max(...cupsPerDay), "כוסות");

// filter: מחזיר מערך חדש עם מה שעבר את התנאי
const workDays = cupsPerDay.filter(function (cups) {
  return cups > 0;
});
console.log("ימי פעילות:", workDays.length);

console.log("ממוצע ליום פעיל:", Math.round(totalCups / workDays.length));

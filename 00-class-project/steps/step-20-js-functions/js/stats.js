// ============================================================
// שלב 19 · לולאות – סיכומים על נתוני השבוע
// ============================================================

// --- for: כשיודעים כמה פעמים ---
let totalCups = 0;
for (let i = 0; i < cupsPerDay.length; i++) {
  totalCups = totalCups + cupsPerDay[i];
}
console.log("סה\"כ כוסות השבוע:", totalCups);

// --- מחפשים את היום העמוס ---
let bestDay = 0;
for (let i = 1; i < cupsPerDay.length; i++) {
  if (cupsPerDay[i] > cupsPerDay[bestDay]) {
    bestDay = i;
  }
}
console.log("היום העמוס: אינדקס", bestDay, "עם", cupsPerDay[bestDay], "כוסות");

// --- while: כשלא יודעים כמה פעמים ---
// כרטיסיית ניקוב: כמה ימים עד שהלקוח מגיע ל-10 חותמות?
let stamps = 0;
let daysNeeded = 0;
while (stamps < 10) {
  stamps = stamps + 2;   // הלקוח קונה שתי כוסות ביום
  daysNeeded++;
}
console.log("כרטיסייה מלאה אחרי", daysNeeded, "ימים");

// --- לולאה מקוננת: לוח משמרות ---
const days = ["ראשון", "שני", "שלישי"];
const shifts = ["בוקר", "ערב"];
for (let d = 0; d < days.length; d++) {
  for (let s = 0; s < shifts.length; s++) {
    console.log(days[d] + " – משמרת " + shifts[s]);
  }
}

// --- continue ו-break ---
for (let i = 0; i < cupsPerDay.length; i++) {
  if (cupsPerDay[i] === 0) continue;   // מדלגים על שבת
  if (cupsPerDay[i] > 350) {
    console.log("שיא! אינדקס", i);
    break;                              // מפסיקים לגמרי
  }
}

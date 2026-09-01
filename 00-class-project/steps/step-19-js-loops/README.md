<div dir="rtl" align="right">

# 🏗️ שלב 19 – הדפסת התפריט בלולאה

> **הפרויקט המתמשך של הכיתה: קפה עתיד**
> נלמד ב־[JS · מודול 3 – לולאות](../../../03-javascript/03-loops/) · [⏮️ שלב 18](../step-18-js-conditions/) · [🗺️ מפת הפרויקט](../../)

---

## 🎯 מה מוסיפים היום

- מוסיפים ל-`data.js` את נתוני השבוע: כמה כוסות מכרנו בכל יום.
- כותבים **`js/stats.js`** שמסכם אותם ב-`for`.
- מוצאים את היום העמוס, סופרים חותמות בכרטיסייה ב-`while`,
  ובונים לוח משמרות בלולאה מקוננת.
- מכירים את `break` ו-`continue`.

</div>

<div dir="rtl" align="right">

## 🌍 למה זה ככה בעולם האמיתי

**כל רשימה שראיתם באינטרנט נבנתה בלולאה.** תוצאות חיפוש, פוסטים בפייסבוק,
מוצרים בחנות – אף אחד לא כתב 300 כרטיסים ביד. יש תבנית אחת ולולאה
שמריצה אותה על הנתונים.

בשלב 24 נבנה את התפריט שלנו בדיוק ככה. היום מתאמנים על מספרים.

### שלוש לולאות, שלוש שאלות

| הלולאה | השאלה שהיא עונה |
|---------|-------------------|
| `for` | **"כמה פעמים?"** – יודעים מראש |
| `while` | **"עד מתי?"** – לא יודעים |
| `for...of` | **"על מה?"** – עוברים על אוסף |

</div>

```js
for (let i = 0; i < 7; i++) { }        // בדיוק 7 פעמים
while (stamps < 10) { }                 // עד שיהיו 10
for (const cups of cupsPerDay) { }      // כל איבר, בלי אינדקס
```

<div dir="rtl" align="right">

### אנטומיה של `for` – שלושה חלקים

</div>

```js
for (let i = 0; i < cupsPerDay.length; i++) {
//   ↑ פעם אחת   ↑ לפני כל סיבוב   ↑ אחרי כל סיבוב
}
```

<div dir="rtl" align="right">

**למה `i` מתחיל ב-0:** האיבר הראשון במערך הוא באינדקס **0**, והאחרון
באינדקס `length - 1`. מערך של 7 ימים: אינדקסים 0 עד 6.

**זו שגיאת ה-off-by-one:** `i <= length` יגיע לאינדקס 7 שלא קיים,
ויחזיר `undefined`. ואז `sum + undefined` הוא `NaN` – **וכל התוצאה נהרסת בשקט.**

### לולאה אינסופית – ואיך לצאת ממנה

</div>

```js
let stamps = 0;
while (stamps < 10) {
  console.log("עוד חותמת");
  // שכחנו stamps++  ← הדפדפן נתקע
}
```

<div dir="rtl" align="right">

**מה עושים:** סוגרים את הלשונית (`Ctrl+W`). הדף לא יגיב לכלום אחר –
JavaScript רץ ב**חוט אחד**, ולולאה תופסת אותו לגמרי.

**הכלל:** בכל `while`, לפני שכותבים את הגוף, שואלים *"מה בפנים משנה את התנאי?"*

### `break` ו-`continue`

</div>

```js
if (cupsPerDay[i] === 0) continue;   // דלג על היום הזה, המשך ללולאה
if (cupsPerDay[i] > 350) break;      // צא מהלולאה כולה
```

<div dir="rtl" align="right">

---

## 🔨 שלב אחר שלב

### 1. הנתונים

</div>

```js
// ראשון ← שבת
const cupsPerDay = [312, 287, 341, 298, 355, 190, 0];
```

<div dir="rtl" align="right">

זו ההיכרות הראשונה שלנו עם **מערך** – רשימה מסודרת שנגישה לפי מספר.
בשלב 21 נלמד מה עוד הוא יודע לעשות.

### 2. סכום

</div>

```js
let totalCups = 0;
for (let i = 0; i < cupsPerDay.length; i++) {
  totalCups = totalCups + cupsPerDay[i];
}
```

<div dir="rtl" align="right">

**המצבר מוגדר מחוץ ללולאה.** אם `let totalCups = 0` יהיה בפנים,
הוא יתאפס בכל סיבוב והתוצאה תהיה הערך האחרון.

### 3. מקסימום – שומרים אינדקס, לא ערך

</div>

```js
let bestDay = 0;
for (let i = 1; i < cupsPerDay.length; i++) {
  if (cupsPerDay[i] > cupsPerDay[bestDay]) bestDay = i;
}
```

<div dir="rtl" align="right">

מתחילים מ-`i = 1` כי יום 0 כבר "המוביל". שומרים את **האינדקס** ולא את הערך,
כי אז אפשר לשאול גם *"איזה יום זה היה"*.

### 4. `while` – כרטיסיית הניקוב

</div>

```js
let stamps = 0;
let daysNeeded = 0;
while (stamps < 10) {
  stamps = stamps + 2;
  daysNeeded++;
}
```

<div dir="rtl" align="right">

### 5. לולאה מקוננת

</div>

```js
for (let d = 0; d < days.length; d++) {
  for (let s = 0; s < shifts.length; s++) {
    console.log(days[d] + " – משמרת " + shifts[s]);
  }
}
```

<div dir="rtl" align="right">

**החיצונית פעם אחת, הפנימית מתחילה מחדש בכל סיבוב.** 3 ימים × 2 משמרות =
6 הדפסות.

**שימו לב למחיר:** מקננים שתי לולאות של 1,000 – זה מיליון פעולות. זה
מה שהופך דף לאיטי, ובדיוק הסיבה שקוראים לזה "סיבוכיות".

---

## 💻 הקוד המלא של השלב

`js/stats.js`:

</div>

```js
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
```

<div dir="rtl" align="right">

## 👀 מה רואים בקונסולה

</div>

```text
סה"כ כוסות השבוע: 1783
היום העמוס: אינדקס 4 עם 355 כוסות
כרטיסייה מלאה אחרי 5 ימים
ראשון – משמרת בוקר
ראשון – משמרת ערב
שני – משמרת בוקר
...
שיא! אינדקס 4
```

<div dir="rtl" align="right">

---

## ✋ אתגר לכיתה

1. הדפיסו את ממוצע הכוסות **לימי פעילות בלבד** (בלי שבת).
2. הדפיסו טבלת מחירים: 1 עד 5 כוסות הפוך, כולל הנחה של 10% מ-3 כוסות.
3. **באג:** מישהו כתב `for (let i = 0; i <= cupsPerDay.length; i++)`.
   מה יהיה `totalCups`, ולמה?

</div>
</div>

<details dir="rtl">
<summary><b>💡 הצגת הפתרון</b></summary>

<div dir="rtl" align="right">

**1.** סופרים גם את הימים, לא רק את הכוסות:

`let sum = 0, active = 0;`
`for (let i = 0; i < cupsPerDay.length; i++) { if (cupsPerDay[i] === 0) continue; sum += cupsPerDay[i]; active++; }`
`console.log(Math.round(sum / active));`  → 297

**2.**

`for (let cups = 1; cups <= 5; cups++) {`
`  let price = cups * 13;`
`  if (cups >= 3) price = price * 0.9;`
`  console.log(cups + " כוסות: " + Math.round(price) + "\u20AA");`
`}`

**3. `NaN`.**

`i` מגיע ל-7, אבל האינדקס האחרון הוא 6. `cupsPerDay[7]` הוא `undefined`,
ו-`1783 + undefined` הוא `NaN` (Not a Number).

**והמסוכן:** `NaN` **מדביק** – כל חישוב שנוגע בו הופך ל-`NaN`, בלי שגיאה
ובלי אזהרה. אתם רק רואים `NaN` על המסך במקום מספר, מאוחר יותר.

`i < length` – תמיד.

</div>
</details>

<div dir="rtl" align="right">
<div dir="rtl" align="right">

---

## 🔍 טעויות שראינו בכיתה

| הטעות | מה קורה |
|--------|----------|
| `i <= arr.length` | `undefined` באיבר האחרון → `NaN` |
| הגדרת המצבר בתוך הלולאה | מתאפס בכל סיבוב |
| `while` בלי לשנות את התנאי | לולאה אינסופית, הדפדפן נתקע |
| `let` מוחלף ב-`var` בלולאה | כל הסיבובים חולקים משתנה אחד |
| לולאה בתוך לולאה בתוך לולאה | תחשבו כמה פעולות זה באמת |

</div>

<div dir="rtl" align="right">

---

## ⏭️ בשלב הבא

**[שלב 20 – פונקציות עזר לחישוב מחיר](../step-20-js-functions/)**

[🗺️ חזרה למפת הפרויקט](../../)

</div>

<div dir="rtl" align="right">

# 🏗️ שלב 21 – סינון, מיון וסכום

> **הפרויקט המתמשך של הכיתה: קפה עתיד**
> נלמד ב־[JS · מודול 5 – מערכים](../../../03-javascript/05-arrays/) · [⏮️ שלב 20](../step-20-js-functions/) · [🗺️ מפת הפרויקט](../../)

---

## 🎯 מה מוסיפים היום

- מכניסים את התפריט לקוד – בינתיים כ**שלושה מערכים מקבילים**.
- מחליפים את הלולאות מהשלב הקודם ב-`map`, `filter`, `reduce` ו-`find`.
- לומדים אילו מתודות **משנות** את המערך המקורי ואילו מחזירות חדש.
- **ומגלים למה שלושה מערכים מקבילים הם רעיון רע** – מה שיוביל לשלב 22.

</div>

<div dir="rtl" align="right">

## 🌍 למה זה ככה בעולם האמיתי

### הקוד של היום נראה כך

</div>

```js
const menuNames  = ["אספרסו", "הפוך", "קפוצ׳ינו", "קפה קר", ...];
const menuPrices = [9, 13, 14, 15, ...];
const menuCats   = ["hot", "hot", "hot", "cold", ...];
```

<div dir="rtl" align="right">

כדי לדעת את המחיר של "הפוך", מוצאים את האינדקס שלו ב-`menuNames`
ולוקחים את אותו אינדקס מ-`menuPrices`.

**זה עובד. וזה שביר בצורה מסוכנת:**
- מוחקים פריט אחד מ-`menuNames` ושוכחים את `menuPrices` → **כל המחירים זזים באחד.**
- הקוד לא יתלונן. פשוט יגיש שקשוקה ב-9₪.

**נחיה עם זה שיעור אחד**, כדי שהפתרון של שלב 22 יהיה מובן ולא "עוד תחביר".

### ארבע המתודות שתשתמשו בהן כל החיים

| המתודה | מה מקבלים | דוגמה מהאתר |
|---------|-------------|---------------|
| `map` | מערך חדש, **באותו אורך** | שמות → כרטיסי HTML |
| `filter` | מערך חדש, **קצר יותר או שווה** | רק קטגוריית "קפה חם" |
| `reduce` | **ערך אחד** | סכום ההזמנה |
| `find` | **איבר אחד** (או `undefined`) | הפריט שנלחץ |

</div>

```js
const total = cupsPerDay.reduce((sum, cups) => sum + cups, 0);
const busy  = cupsPerDay.filter((cups) => cups > 300);
const names = menuPrices.map((p) => p + "\u20AA");
const item  = menuNames.find((n) => n === "הפוך");
```

<div dir="rtl" align="right">

**למה זה עדיף על `for`:** השם אומר את הכוונה. `filter` אומר "מסננים",
`reduce` אומר "מקפלים לערך אחד". `for` יכול להיות כל אחד מהם, וצריך
לקרוא את הגוף כדי לדעת.

### `reduce` – המתודה שמפחידה, בשלוש שורות

</div>

```js
const total = cupsPerDay.reduce(function (sum, cups) {
  return sum + cups;   // ← מה שמוחזר הופך ל-sum בסיבוב הבא
}, 0);                 // ← הערך ההתחלתי של sum
```

<div dir="rtl" align="right">

| סיבוב | `sum` נכנס | `cups` | מוחזר |
|--------|-------------|--------|--------|
| 1 | 0 | 312 | 312 |
| 2 | 312 | 287 | 599 |
| 3 | 599 | 341 | 940 |

**תמיד לתת ערך התחלתי.** בלעדיו, `reduce` על מערך ריק **זורק שגיאה**,
ובמערך של מספרים הוא לוקח את האיבר הראשון כהתחלה – מה ששובר חישובים
שמתחילים מ-0.

### מה משנה את המקור ומה לא – **הטבלה הכי חשובה בשיעור**

| ✅ מחזיר חדש | ⚠️ משנה את המקור |
|---------------|---------------------|
| `map` `filter` `slice` `concat` | `push` `pop` `splice` |
| `find` `includes` `join` | **`sort`** `reverse` |

</div>

```js
const prices = [15, 9, 42];
const sorted = prices.sort();
console.log(prices);   // [15, 42, 9]  ← המקור השתנה!
```

<div dir="rtl" align="right">

**ושתי הפתעות ב-`sort`:**

1. הוא **משנה את המערך המקורי** – לא רק מחזיר חדש.
2. **הוא ממיין כמחרוזות כברירת מחדל.** `[15, 9, 42]` הופך ל-`[15, 42, 9]`,
   כי `"15" < "42" < "9"` אלפביתית.

**התיקון:** תמיד עם פונקציית השוואה, ועל עותק:

</div>

```js
const sorted = [...prices].sort((a, b) => a - b);   // [9, 15, 42]
```

<div dir="rtl" align="right">

`a - b` = עולה. `b - a` = יורד.

</div>
<div dir="rtl" align="right">

---

## 🔨 שלב אחר שלב

### 1. בסיסי מערכים

</div>

```js
menuNames.length          // כמה איברים
menuNames[0]              // האיבר הראשון
menuNames[menuNames.length - 1]   // האחרון
menuNames.indexOf("הפוך") // באיזה אינדקס (או -1 אם אין)
menuNames.includes("הפוך")// true / false
```

<div dir="rtl" align="right">

**`indexOf` מחזיר `-1` כשלא נמצא, לא `null` ולא `undefined`.**
ו-`-1` הוא **truthy**, אז `if (arr.indexOf(x))` הוא באג.
בודקים `!== -1`, או פשוט `includes`.

### 2. סכום במקום לולאה

**לפני (שלב 19):**

</div>

```js
let totalCups = 0;
for (let i = 0; i < cupsPerDay.length; i++) {
  totalCups = totalCups + cupsPerDay[i];
}
```

<div dir="rtl" align="right">

**אחרי:**

</div>

```js
const totalCups = cupsPerDay.reduce(function (sum, cups) {
  return sum + cups;
}, 0);
```

<div dir="rtl" align="right">

שימו לב שזה גם `const` עכשיו – התוצאה נוצרת בבת אחת, ולא נבנית בהדרגה.

### 3. `spread` – הכוכביות שפורשות מערך

</div>

```js
Math.max(cupsPerDay);       // NaN  ← Math.max לא יודע לקבל מערך
Math.max(...cupsPerDay);    // 355  ← ...  פורש ל-Math.max(312, 287, 341, ...)
```

<div dir="rtl" align="right">

`...` שימושי גם להעתקה: `const copy = [...prices];` ולאיחוד:
`const all = [...hot, ...cold];`

### 4. הפעולות שנצטרך לתפריט

</div>

```js
// כל הפריטים בקטגוריה
const hotOnly = menuNames.filter((name, i) => menuCats[i] === "hot");

// המחיר הכי גבוה
const maxPrice = Math.max(...menuPrices);
```

<div dir="rtl" align="right">

**הסתכלו על השורה הראשונה.** כדי לסנן לפי קטגוריה, אנחנו צריכים את
**האינדקס** של מערך אחד כדי לגשת למערך אחר. זה עובד, אבל זה בדיוק הריח
של קוד שאומר "המבנה שלי לא נכון".

---

## 💻 הקוד המלא של השלב

`js/data.js` (החלק החדש):

</div>

```js
const menuNames = ["אספרסו", "הפוך", "קפוצ׳ינו", "קפה קר", "קרואסון חמאה",
                   "בורקס גבינה", "שקשוקה", "טוסט גבינות"];

const menuPrices = [9, 13, 14, 15, 12, 14, 42, 32];

const menuCats = ["hot", "hot", "hot", "cold", "bakery",
                  "bakery", "meals", "meals"];

// ⚠️ שלושה מערכים שחייבים להישאר מסונכרנים לפי אינדקס.
```

<div dir="rtl" align="right">

`js/stats.js` (נכתב מחדש):

</div>

```js
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
```

<div dir="rtl" align="right">

## 👀 מה רואים בקונסולה

</div>

```text
סה"כ כוסות השבוע: 1783
היום העמוס: 355 כוסות
ימי פעילות: 6
ממוצע ליום פעיל: 297
```

<div dir="rtl" align="right">

**אותן תוצאות בדיוק כמו בשלב 19, בשליש מהקוד.**

---

## ✋ אתגר לכיתה

1. הדפיסו את שמות כל הפריטים שמחירם מתחת ל-15₪.
2. חשבו את המחיר הממוצע בתפריט, מעוגל לשקל.
3. מיינו את המחירים מהיקר לזול **בלי לשנות את `menuPrices`**.
4. **הבעיה:** מחקו את `"קפוצ׳ינו"` מ-`menuNames` (בלבד) והדפיסו את המחיר
   של `"קפה קר"`. מה קרה?

</div>
</div>

<details dir="rtl">
<summary><b>💡 הצגת הפתרון</b></summary>

<div dir="rtl" align="right">

**1.** צריך את האינדקס כדי להגיע למערך השני – וזה כבר מרגיש לא נכון:

`const cheap = menuNames.filter((name, i) => menuPrices[i] < 15);`

**2.**

`const avg = Math.round(menuPrices.reduce((s, p) => s + p, 0) / menuPrices.length);` → 19

**3.** עותק ואז מיון, אחרת המקור נהרס:

`const sorted = [...menuPrices].sort((a, b) => b - a);`

בלי ה-`[...]` – `menuPrices` עצמו ימוין, וכל השורות שאחרי יעבדו על
סדר אחר ממה שהן מצפות לו. **באג שקשה מאוד לאתר.**

**4. "קפה קר" מקבל את המחיר 14 במקום 15.**

מחיקת פריט אחד הזיזה את כל האינדקסים שאחריו באחד, ושני המערכים האחרים
נשארו כמו שהיו. **אין שגיאה. אין אזהרה. רק מחירים לא נכונים באתר.**

זו הסיבה שכל מה שקשור לפריט אחד צריך לחיות **בתוך אובייקט אחד**.
זה בדיוק [שלב 22](../step-22-js-objects/).

</div>
</details>

<div dir="rtl" align="right">
<div dir="rtl" align="right">

---

## 🔍 טעויות שראינו בכיתה

| הטעות | מה קורה |
|--------|----------|
| `sort()` בלי פונקציית השוואה | ממיין כמחרוזות: 15, 42, 9 |
| `sort()` על המערך המקורי | הורס אותו לכל שאר הקוד |
| `reduce` בלי ערך התחלתי | שגיאה על מערך ריק |
| `if (arr.indexOf(x))` | `-1` הוא truthy. בדקו `!== -1` |
| `map` כשלא צריך תוצאה | לולאה עם תופעות לוואי – השתמשו ב-`forEach` |
| מערכים מקבילים | הבאג של האתגר הרביעי |

</div>

<div dir="rtl" align="right">

---

## ⏭️ בשלב הבא

**[שלב 22 – התפריט כאובייקטים](../step-22-js-objects/)**

[🗺️ חזרה למפת הפרויקט](../../)

</div>

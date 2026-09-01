<div dir="rtl" align="right">

# 🏗️ שלב 20 – פונקציות עזר לחישוב מחיר

> **הפרויקט המתמשך של הכיתה: קפה עתיד**
> נלמד ב־[JS · מודול 4 – פונקציות](../../../03-javascript/04-functions/) · [⏮️ שלב 19](../step-19-js-loops/) · [🗺️ מפת הפרויקט](../../)

---

## 🎯 מה מוסיפים היום

- כותבים **`js/helpers.js`**: `formatPrice`, `withVat`, `applyDiscount`.
- מארגנים מחדש את `hours.js` – מקוד שרץ פעם אחת, ל**פונקציות שאפשר לקרוא להן**.
- מבינים למה `isOpenAt(date)` עדיף על קוד שמסתכל על `new Date()` בעצמו.
- מכירים scope, ערכי ברירת מחדל ופונקציות חץ.

</div>

<div dir="rtl" align="right">

## 🌍 למה זה ככה בעולם האמיתי

### הבעיה שפונקציה פותרת

בשלב 18 כתבנו את חישוב שעות הפתיחה **ישירות בקובץ**. הוא רץ פעם אחת,
בטעינת הדף, ואי אפשר לקרוא לו שוב.

עכשיו נרצה לדעת אם אנחנו פתוחים גם כשהמשתמש בוחר תאריך בטופס.
בלי פונקציה – מעתיקים את הקוד. **וברגע שהעתקתם קוד, יצרתם באג:**
מחר משנים את שעת הסגירה בשישי, מתקנים במקום אחד, ושוכחים את השני.

### הפונקציה הכי שימושית שנכתוב היום

</div>

```js
function isOpenAt(when) {
  if (!when) when = new Date();
  ...
}
```

<div dir="rtl" align="right">

**קוד שמסתכל על `new Date()` מבפנים אי אפשר לבדוק.** רוצים לבדוק שבת?
צריך לחכות לשבת, או לשנות את שעון המחשב.

**קוד שמקבל את הזמן כפרמטר** אפשר לבדוק בשנייה:

</div>

```js
console.log(openStatusText(new Date("2026-09-05T12:00:00")));  // שבת
console.log(openStatusText(new Date("2026-09-07T08:00:00")));  // שני בבוקר
```

<div dir="rtl" align="right">

זה נקרא **הזרקת תלות**, וזה אחד ההרגלים שמפרידים בין קוד שאפשר לתחזק
לקוד שלא. שווה להפנים אותו כבר עכשיו.

### `return` עוצר את הפונקציה

</div>

```js
function isOpenAt(when) {
  const today = WEEK[when.getDay()];
  if (today.open === null) return false;   // שבת – סיימנו כאן
  const hour = when.getHours();
  return hour >= today.open && hour < today.close;
}
```

<div dir="rtl" align="right">

**יציאה מוקדמת** (early return) חוסכת קינון של `if`-ים. במקום פירמידה
של תנאים מקוננים, מטפלים במקרי הקצה בהתחלה ויוצאים.

**ופונקציה בלי `return` מחזירה `undefined`.** זו הסיבה ש-`const x = doSomething()`
נותן `undefined` – שכחתם להחזיר.

### Scope – משתנה מת בסוף הפונקציה

</div>

```js
function makeCoffee() {
  const beans = "אתיופיה";
  return "קפה מפולי " + beans;
}
console.log(beans);   // ReferenceError
```

<div dir="rtl" align="right">

**זו תכונה, לא מגבלה.** אילו כל משתנה היה גלובלי, שני חלקים בקוד היו
דורסים זה את זה כל הזמן. פונקציה היא קופסה שסוגרת על עצמה.

### פונקציית חץ

</div>

```js
function doubleShot(amount) { return amount + 4; }   // רגילה
const doubleShot = (amount) => amount + 4;            // חץ, החזרה משתמעת
```

<div dir="rtl" align="right">

בשורה אחת בלי `{}` – ה-`return` **משתמע**. בשלב 27 נשתמש בהן בכל מקום;
היום רק מכירים.

</div>
<div dir="rtl" align="right">

---

## 🔨 שלב אחר שלב

### 1. הפונקציות שיחזרו לאורך כל הקורס

</div>

```js
function formatPrice(amount) {
  return amount + "\u20AA";
}

function withVat(amount) {
  return Math.round(amount * (1 + VAT_RATE));
}
```

<div dir="rtl" align="right">

### 2. ערך ברירת מחדל

</div>

```js
function applyDiscount(amount, percent) {
  if (percent === undefined) percent = 10;
  return Math.round(amount * (100 - percent) / 100);
}

applyDiscount(50);       // 45  – 10% כברירת מחדל
applyDiscount(50, 25);   // 38
```

<div dir="rtl" align="right">

**`=== undefined` ולא `!percent`.** אם מישהו יעביר `0` (בלי הנחה),
`!0` הוא `true` והיינו נותנים לו 10% הנחה שלא ביקש. **מלכודת truthy מהשלב הקודם.**

בשלב 27 נכתוב את זה נקי: `function applyDiscount(amount, percent = 10)`.

### 3. מארגנים מחדש את `hours.js`

**לפני** – קוד רץ, משתנים גלובליים:

</div>

```js
const now = new Date();
const day = now.getDay();
let openHour = null;
switch (day) { ... }
const isOpen = openHour !== null && ...;
```

<div dir="rtl" align="right">

**אחרי** – טבלת נתונים + שתי פונקציות:

</div>

```js
const WEEK = [
  { name: "ראשון", open: 7, close: 20 },
  ...
  { name: "שבת", open: null, close: null },
];

function isOpenAt(when) { ... }
function openStatusText(when) { ... }
```

<div dir="rtl" align="right">

**שימו לב מה קרה ל-`switch`:** הוא נעלם. שבע שורות `case` הפכו ל**טבלת נתונים**,
והקוד ניגש אליה ב-`WEEK[day]`.

> **הכלל:** כשה-`switch` רק ממפה ערך לערך – החליפו אותו בטבלה.
> קוד קצר יותר, וכדי לשנות שעה בשישי משנים **מספר**, לא לוגיקה.

### 4. שם הפונקציה הוא תיעוד

| ❌ | ✅ |
|---|---|
| `check()` | `isOpenAt()` |
| `calc()` | `applyDiscount()` |
| `doStuff()` | `formatPrice()` |

**פונקציה שמחזירה כן/לא מתחילה ב-`is`, `has` או `can`.** זה סטנדרט,
וקורא הקוד יודע מה לצפות בלי לפתוח אותה.

---

## 💻 הקוד המלא של השלב

`js/helpers.js`:

</div>

```js
// ============================================================
// שלב 20 · פונקציות עזר – כל חישוב שחוזר יותר מפעם אחת
// ============================================================

/** 13 → "13₪" */
function formatPrice(amount) {
  return amount + "\u20AA";
}

/** מחיר כולל מע"מ, מעוגל לשקל */
function withVat(amount) {
  return Math.round(amount * (1 + VAT_RATE));
}

/** הנחת סטודנט – פרמטר עם ערך ברירת מחדל */
function applyDiscount(amount, percent) {
  if (percent === undefined) percent = 10;
  return Math.round(amount * (100 - percent) / 100);
}

/** פונקציית חץ – קצרה יותר, מחזירה בלי return */
const doubleShot = (amount) => amount + 4;

console.log(formatPrice(13));                 // 13₪
console.log(withVat(100));                    // 118
console.log(applyDiscount(50));               // 45  (ברירת מחדל 10%)
console.log(applyDiscount(50, 25));           // 38
console.log(formatPrice(doubleShot(PRICE_ESPRESSO || 9)));

// --- Scope: משתנה שנולד בתוך פונקציה מת בסופה ---
function makeCoffee() {
  const beans = "אתיופיה";     // קיים רק כאן
  return "קפה מפולי " + beans;
}
console.log(makeCoffee());
// console.log(beans);  ← ReferenceError. נסו בקונסולה.
```

<div dir="rtl" align="right">

`js/hours.js` – אותה לוגיקה, עכשיו קריאה:

</div>

```js
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
```

<div dir="rtl" align="right">

## 👀 מה רואים בקונסולה

</div>

```text
13₪
118
45
38
13₪
קפה מפולי אתיופיה
פתוח עכשיו · נסגר ב-20:00
שבת בצהריים: סגור · נתראה ביום ראשון ב-07:00
שני ב-08:00: פתוח עכשיו · נסגר ב-20:00
```

<div dir="rtl" align="right">

**שתי השורות האחרונות הן העיקר.** בדקנו שבת ובוקר של שני, ביום שלישי
אחר הצהריים, בלי לגעת בשעון.

---

## ✋ אתגר לכיתה

1. כתבו `pricePerPerson(total, people)` שמחלקת ומעגלת כלפי מעלה.
2. כתבו `isBreakfastTime(when)` שמחזירה `true` בין 07:00 ל-10:00.
3. **שאלה:** למה `applyDiscount(50)` מחזיר 45 ולא `NaN`?
4. **באג:** מה מחזירה הפונקציה הבאה, ולמה?

</div>

```js
function getPrice() {
  return
    13;
}
```

</div>

<details dir="rtl">
<summary><b>💡 הצגת הפתרון</b></summary>

<div dir="rtl" align="right">

**1.** `Math.ceil` מעגל תמיד למעלה – בחלוקת חשבון זה ההוגן:

`function pricePerPerson(total, people) { return Math.ceil(total / people); }`

(`Math.round(101/3)` = 34 ואז 3×34 = 102 ≠ 101. עם `ceil` תמיד מכסים.)

**2.**

`function isBreakfastTime(when) { if (!when) when = new Date(); const h = when.getHours(); return h >= 7 && h < 10; }`

**3.** כי בדקנו `percent === undefined`. קריאה עם ארגומנט אחד מציבה
`undefined` בפרמטר החסר, אנחנו מזהים את זה ומחליפים ב-10.

בלי הבדיקה: `(100 - undefined)` הוא `NaN`, וכל התוצאה `NaN`.

**4. `undefined`.**

זה **ASI** – הכנסת נקודה-פסיק אוטומטית. JavaScript מוסיף `;` אחרי `return`
כי הוא בסוף שורה, ו-`13;` הופך לשורה מתה שאף אחד לא מגיע אליה.

**הכלל: הערך המוחזר חייב להתחיל באותה שורה של ה-`return`.**

</div>
</details>

<div dir="rtl" align="right">
<div dir="rtl" align="right">

---

## 🔍 טעויות שראינו בכיתה

| הטעות | מה קורה |
|--------|----------|
| פונקציה בלי `return` | מחזירה `undefined` |
| `return` בשורה נפרדת מהערך | ASI מחזיר `undefined` |
| `!percent` לבדיקת "לא הועבר" | `0` נחשב "לא הועבר" |
| קריאה בלי סוגריים: `formatPrice` | מקבלים את הפונקציה עצמה, לא את התוצאה |
| שימוש במשתנה מתוך פונקציה בחוץ | `ReferenceError` |
| `new Date()` בתוך הלוגיקה | אי אפשר לבדוק |

</div>

<div dir="rtl" align="right">

---

## ⏭️ בשלב הבא

**[שלב 21 – סינון, מיון וסכום](../step-21-js-arrays/)**

[🗺️ חזרה למפת הפרויקט](../../)

</div>

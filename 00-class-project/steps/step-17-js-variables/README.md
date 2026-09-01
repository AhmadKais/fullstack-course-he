<div dir="rtl" align="right">

# 🏗️ שלב 17 – נתוני העסק במשתנים

> **הפרויקט המתמשך של הכיתה: קפה עתיד**
> נלמד ב־[JS · מודול 1 – מבוא ומשתנים](../../../03-javascript/01-intro-variables/) · [⏮️ שלב 16](../step-16-css-modern/) · [🗺️ מפת הפרויקט](../../)

---

## 🎯 מה מוסיפים היום

- יוצרים את **`js/data.js`** ומחברים אותו לארבעת הדפים.
- שומרים את נתוני העסק ב-`const`, ואת מה שישתנה ב-`let`.
- מכירים את ששת הטיפוסים שנשתמש בהם לאורך כל הקורס.
- נופלים במלכודת `"9" + 1` – ולומדים למה כל קלט מטופס הוא מחרוזת.

</div>

<div dir="rtl" align="right">

> 🖥️ **שבעת השיעורים הבאים רצים בקונסולה, לא על המסך.**
> אנחנו בונים את **המנוע** של האתר – החישובים, הנתונים והכללים.
> ב[שלב 24](../step-24-js-dom/) נחבר אותו למסך, וכל מה שנבנה כאן יופיע בדף.
>
> לפתיחת הקונסולה: `F12` ← לשונית **Console**. שם רואים את הפלט של `console.log`.

</div>
<div dir="rtl" align="right">

---

## 🌍 למה זה ככה בעולם האמיתי

### מה JavaScript מוסיף לנו

| | מה זה עושה |
|---|-------------|
| **HTML** | מה יש בדף |
| **CSS** | איך זה נראה |
| **JavaScript** | **מה קורה כשמשהו משתנה** |

עד עכשיו האתר שלנו הוא עלון מודפס יפה. מהיום הוא יכול לדעת מה השעה,
לחשב מחיר, לזכור מה הזמנתם ולהגיב ללחיצה.

### `const` כברירת מחדל, `let` כשחייבים, `var` אף פעם

</div>

```js
const CAFE_NAME = "קפה עתיד";   // לא ישתנה לעולם
let orderTotal  = 0;             // ישתנה בכל הוספה לסל
```

<div dir="rtl" align="right">

**למה `const` קודם:** כשקוראים שורה שכתוב בה `const`, יודעים מיד שהערך הזה
לא יזוז בהמשך הקובץ. זה מוריד עומס מהראש בקריאת קוד זר.

**ולמה לא `var`:** ל-`var` יש התנהגות מוזרה – הוא "דולף" מחוץ לבלוקים:

</div>

```js
if (true) { var a = 1; let b = 2; }
console.log(a);   // 1   ← דלף החוצה!
console.log(b);   // ReferenceError ← מתנהג כמו שמצפים
```

<div dir="rtl" align="right">

`var` נשאר בשפה רק כדי לא לשבור אתרים ישנים. **בקוד חדש אין לו מקום.**

> ⚠️ **`const` על אובייקט או מערך לא "מקפיא" אותו.** הוא רק אוסר להצביע על
> משהו אחר. `const arr = [1]; arr.push(2);` – **חוקי לגמרי**. נחזור לזה בשלב 22.

### המלכודת שתפיל את כולם

</div>

```js
const priceFromInput = "9";        // כל ערך משדה טופס הוא מחרוזת
console.log(priceFromInput + 1);   // "91"  ← + על מחרוזת = שרשור
console.log(priceFromInput - 1);   // 8     ← - עובד רק על מספרים, אז יש המרה
console.log(Number(priceFromInput) + 1);  // 10 ← מה שהתכוונו
```

<div dir="rtl" align="right">

**`+` הוא האופרטור היחיד שעושה גם חיבור וגם שרשור.** אם צד אחד מחרוזת –
התוצאה מחרוזת.

זה נשמע תיאורטי עד ששדה "מספר סועדים" מחזיר `"2"`, אתם מחברים 1,
ומקבלים שולחן ל-**21 איש**. זה קורה בפרויקטים אמיתיים.

### שמות משתנים – זו לא קוסמטיקה

| ❌ | ✅ | למה |
|---|---|------|
| `x`, `data`, `temp` | `orderTotal`, `cupsPerDay` | קוד נקרא פי עשרה ממה שהוא נכתב |
| `MENU_ITEMS` למשתנה שמשתנה | `menuItems` | UPPER_CASE מסמן קבוע |
| `שם_לקוח` | `customerName` | עברית בשמות משתנים עובדת ומבלבלת. קוד באנגלית |

</div>
<div dir="rtl" align="right">

---

## 🔨 שלב אחר שלב

### 1. יוצרים את הקובץ

</div>

```text
cafe-atid/
├── css/style.css
└── js/
    └── data.js       ← חדש
```

<div dir="rtl" align="right">

### 2. מחברים – בכל ארבעת הדפים

</div>

```html
<head>
  ...
  <link rel="stylesheet" href="css/style.css">
  <script defer src="js/data.js"></script>
</head>
```

<div dir="rtl" align="right">

**`defer` היא המילה החשובה כאן.**

| איפה | מה קורה |
|-------|----------|
| `<script>` ב-`<head>` בלי `defer` | **עוצר את בניית הדף** עד שהקובץ ירד וירוץ |
| `<script defer>` ב-`<head>` | יורד במקביל, **רץ אחרי שהדף נבנה**. ✅ |
| `<script>` בסוף ה-`<body>` | עובד גם, אבל `defer` מסודר יותר |

בלי `defer`, קוד שמחפש אלמנט בדף לא ימצא אותו – **הוא רץ לפני שהאלמנט נוצר**.
זה הבאג מספר אחת של שלב 24, ואנחנו מונעים אותו כבר עכשיו.

### 3. כותבים את הנתונים

</div>

```js
const CAFE_NAME    = "קפה עתיד";
const CAFE_ADDRESS = "הרצל 42, תל אביב";
const YEAR_OPENED  = 2015;
const SEATS        = 34;
const HAS_WIFI     = true;
const VAT_RATE     = 0.18;

let orderTotal = 0;
```

<div dir="rtl" align="right">

### 4. הטיפוסים שנשתמש בהם

</div>

```js
typeof "קפה עתיד"   // "string"
typeof 34            // "number"   – בלי הבחנה בין שלם לעשרוני
typeof true          // "boolean"
typeof undefined     // "undefined" – הוכרז ולא קיבל ערך
typeof null          // "object"    ← באג היסטורי בשפה. null הוא לא אובייקט
typeof [1, 2]        // "object"    – מערך (שלב 21)
typeof { a: 1 }      // "object"    – אובייקט (שלב 22)
```

<div dir="rtl" align="right">

**`undefined` מול `null`:**
- `undefined` = *"לא שמו כאן כלום"* – השפה עשתה את זה.
- `null` = *"שמנו כאן ריק בכוונה"* – **אנחנו** עשינו את זה.

---

## 💻 הקוד המלא של השלב

`js/data.js`:

</div>

```js
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
```

<div dir="rtl" align="right">

## 👀 מה רואים במסך

**כלום. ובקונסולה:**

</div>

```text
קפה עתיד · הרצל 42, תל אביב
שנות פעילות: 11
טיפוסים: string number boolean
91
10
undefined null
```

<div dir="rtl" align="right">

**זה נראה צנוע, אבל זה הרגע שבו האתר הפך לתוכנה.**

---

## ✋ אתגר לכיתה

1. הוסיפו `const OWNER = "דנה כהן";` והדפיסו משפט שלם עם השם והכתובת.
2. חשבו והדפיסו כמה מקומות ישיבה יש בכל אחד משני הקומות (חלוקה שווה).
3. **מלכודת:** נסו `const SEATS = 40;` בסוף הקובץ. מה קורה?
4. בקונסולה, הריצו `orderTotal = 50` ואז `CAFE_NAME = "אחר"`. מה ההבדל?

</div>
</div>

<details dir="rtl">
<summary><b>💡 הצגת הפתרון</b></summary>

<div dir="rtl" align="right">

**1.** `console.log("הבעלים: " + OWNER + ", " + CAFE_ADDRESS);`

**2.** `console.log(SEATS / 2);` → 17. שימו לב ש-JavaScript לא מבחין בין
שלם לעשרוני – `34 / 4` יחזיר `8.5`, לא `8`.

**3. `SyntaxError: Identifier 'SEATS' has already been declared`** –
וחשוב מכך: **הקובץ כולו לא רץ**. שגיאת תחביר נתפסת לפני ההרצה, אז אפילו
השורות שכן תקינות לא יופיעו. זה מסביר את התופעה "פתאום שום דבר לא עובד".

**4.**
- `orderTotal = 50` – עובד. הוא `let`.
- `CAFE_NAME = "אחר"` – `TypeError: Assignment to constant variable.`

הקונסולה היא **סביבת ניסויים חיה** על הדף שלכם. תשתמשו בה כל הקורס.

</div>
</details>

<div dir="rtl" align="right">
<div dir="rtl" align="right">

---

## 🔍 טעויות שראינו בכיתה

| הטעות | מה קורה |
|--------|----------|
| שכחת `defer` | קוד רץ לפני שהדף קיים |
| `<script>` באחד מארבעת הדפים בלבד | עובד בדף אחד, "שבור" בשאר |
| השוואה בין `"5"` ל-`5` | ראו שלב 18 |
| `const` למשתנה שמשתנה | `TypeError` בהרצה |
| שם קובץ `Data.js` וקישור ל-`data.js` | 404 בשרת Linux |

</div>

<div dir="rtl" align="right">

---

## ⏭️ בשלב הבא

**[שלב 18 – פתוח או סגור עכשיו](../step-18-js-conditions/)**

[🗺️ חזרה למפת הפרויקט](../../)

</div>

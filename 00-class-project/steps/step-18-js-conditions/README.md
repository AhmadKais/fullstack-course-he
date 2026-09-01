<div dir="rtl" align="right">

# 🏗️ שלב 18 – פתוח או סגור עכשיו

> **הפרויקט המתמשך של הכיתה: קפה עתיד**
> נלמד ב־[JS · מודול 2 – אופרטורים ותנאים](../../../03-javascript/02-operators-conditions/) · [⏮️ שלב 17](../step-17-js-variables/) · [🗺️ מפת הפרויקט](../../)

---

## 🎯 מה מוסיפים היום

- כותבים את **`js/hours.js`**: האם קפה עתיד פתוח **ברגע זה**?
- משתמשים ב-`switch` לשבעת ימי השבוע, וב-`&&` לשילוב תנאים.
- כותבים את הודעת המצב באופרטור **טרנארי**.
- מבינים סוף־סוף את ההבדל בין `==` ל-`===`, ומהו ערך "נכון-בערך" (truthy).

</div>

<div dir="rtl" align="right">

## 🌍 למה זה ככה בעולם האמיתי

זה ה"פתוח עכשיו / סגור" הירוק-אדום שראיתם בגוגל, בוולט וב-Google Maps.
הוא לא נכתב ביד – מישהו כתב בדיוק את הקוד שאנחנו כותבים עכשיו.

### `===` – ולמה `==` הוא באג שמחכה לקרות

</div>

```js
0 == "0"        // true   ← ממיר טיפוסים ואז משווה
0 == ""         // true
0 == false      // true
null == undefined  // true
"1" == true     // true

0 === "0"       // false  ← משווה גם את הטיפוס
```

<div dir="rtl" align="right">

> **הכלל בקורס הזה: תמיד `===` ותמיד `!==`.**
> אין מקרה שבו `==` נחוץ ואי אפשר לכתוב אותו ברור יותר.

**איפה זה תופס אתכם:** `getHours()` מחזיר **מספר**, קלט מטופס הוא **מחרוזת**.
`hour === "7"` יהיה `false` גם בדיוק בשבע בבוקר, והקוד ייראה תקין לחלוטין.

### שישה ערכים שקריים. כל השאר אמת.

</div>

```js
false, 0, "", null, undefined, NaN     // ← אלה בלבד
```

<div dir="rtl" align="right">

**כל השאר truthy**, כולל שניים שמפתיעים:

</div>

```js
if ("0")  { }   // ✅ רץ! מחרוזת לא ריקה
if ([])   { }   // ✅ רץ! מערך ריק הוא אובייקט
```

<div dir="rtl" align="right">

זו הסיבה ש-`if (items.length)` נכון ו-`if (items)` כמעט תמיד לא עושה מה שחשבתם.

### `&&` ו-`||` – קיצור דרך שכדאי להכיר

הם **לא בודקים את הצד הימני** אם השמאלי כבר הכריע:

</div>

```js
const isOpen = openHour !== null && hour >= openHour && hour < closeHour;
```

<div dir="rtl" align="right">

אם `openHour` הוא `null` (שבת), **שני התנאים הבאים לא נבדקים בכלל.**
זה לא רק ביצועים – זה מגן עלינו מהשוואה מול `null`.

**הדפוס הזה חוזר בכל קוד:**

</div>

```js
if (user && user.name) { }        // בדוק שקיים לפני שניגשים
const label = name || "אנונימי";  // ברירת מחדל
```

<div dir="rtl" align="right">

---

## 🔨 שלב אחר שלב

### 1. איזה יום ואיזו שעה עכשיו

</div>

```js
const now = new Date();
const day = now.getDay();     // 0 = ראשון ... 6 = שבת
const hour = now.getHours();  // 0-23
```

<div dir="rtl" align="right">

> ⚠️ **`getDay()` מתחיל מ-0 ביום ראשון** (נוח לנו – זה תחילת השבוע בישראל).
> אבל `getMonth()` מחזיר 0–11, ואילו `getDate()` מחזיר 1–31. **חוסר עקביות
> מפורסם בשפה.** ינואר הוא `0`.

### 2. `switch` – כשיש רשימת מקרים סגורה

</div>

```js
switch (day) {
  case 0: dayName = "ראשון";  openHour = 7; closeHour = 20; break;
  case 5: dayName = "שישי";   openHour = 7; closeHour = 15; break;
  case 6: dayName = "שבת";    openHour = null; break;
}
```

<div dir="rtl" align="right">

**`break` בכל מקרה.** בלעדיו JavaScript "נופל" למקרה הבא וממשיך להריץ אותו –
תכונה שנקראת fall-through. היא שימושית לעתים נדירות, ובאג בכל שאר הפעמים.

**מתי `switch` ומתי `if`:** `switch` משווה ערך אחד לרשימת אפשרויות (`===` בדיוק).
`if` בודק תנאים מורכבים. יום בשבוע = `switch`.

### 3. השילוב

</div>

```js
const isOpen = openHour !== null && hour >= openHour && hour < closeHour;
```

<div dir="rtl" align="right">

**`hour < closeHour` ולא `<=`.** בשעה 20:00 בדיוק אנחנו **סגורים** –
20:00 היא שעת הסגירה, לא שעת פעילות אחרונה. זו טעות של אחד שמופיעה
בכל מערכת שעות בעולם.

### 4. טרנארי – `if` שמחזיר ערך

</div>

```js
const statusText = isOpen
  ? "פתוח עכשיו · נסגר ב-" + closeHour + ":00"
  : "סגור כרגע";
```

<div dir="rtl" align="right">

**מתי כן:** בחירה בין שני ערכים. **מתי לא:** שרשור של שלושה טרנארים
מקוננים – זה כבר `if`, וקריא פי כמה.

---

## 💻 הקוד המלא של השלב

`js/hours.js`:

</div>

```js
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
```

<div dir="rtl" align="right">

## 👀 מה רואים בקונסולה

</div>

```text
היום שלישי, השעה 14
פתוח עכשיו · נסגר ב-20:00
true
false
false
```

<div dir="rtl" align="right">

**רוצים לבדוק את שבת בלי לחכות?** שנו זמנית את `const day = now.getDay()`
ל-`const day = 6`. ככה בודקים לוגיקה שתלויה בזמן. בשלב 20 נעשה את זה
בצורה נכונה – בפונקציה שמקבלת תאריך.

---

## ✋ אתגר לכיתה

1. הוסיפו הודעה מיוחדת: אם השעה בין 7 ל-10, הדפיסו "ארוחת בוקר מוגשת עד 10:00".
2. הוסיפו משתנה `isHoliday` והפכו את הקפה לסגור כשהוא `true`, בלי לגעת ב-`switch`.
3. **חידה:** למה `if ("0")` רץ, ואילו `if (0)` לא?
4. **באג:** למה `if (hour = 7)` תמיד רץ?

</div>
</div>

<details dir="rtl">
<summary><b>💡 הצגת הפתרון</b></summary>

<div dir="rtl" align="right">

**1.** `if (hour >= 7 && hour < 10) console.log("ארוחת בוקר מוגשת עד 10:00");`

**2.** מוסיפים תנאי לשרשרת הקיימת:

`const isOpen = !isHoliday && openHour !== null && hour >= openHour && hour < closeHour;`

`!isHoliday` ראשון – אם זה חג, שאר הבדיקות אפילו לא רצות.

**3.** `"0"` הוא **מחרוזת באורך 1**, ורק מחרוזת **ריקה** היא falsy.
המספר `0` הוא אחד מששת ה-falsy. התוכן לא רלוונטי – רק הטיפוס והאורך.

זו הסיבה ש-`Number(input.value)` הוא כל כך חשוב: `"0"` שמגיע משדה טופס
יתנהג כ**אמת** בתנאי.

**4.** כי `=` הוא **השמה**, לא השוואה. השורה מציבה 7 בתוך `hour`,
והערך של ההשמה הוא 7 – שהוא truthy.

זו הסיבה שהעורך מסמן לכם `if (x = 5)` באזהרה. בדיקה: `===`.

</div>
</details>

<div dir="rtl" align="right">
<div dir="rtl" align="right">

---

## 🔍 טעויות שראינו בכיתה

| הטעות | מה קורה |
|--------|----------|
| `==` במקום `===` | `0 == ""` הוא `true`. באג שקשה לאתר |
| `=` במקום `===` בתנאי | התנאי תמיד מתקיים |
| `switch` בלי `break` | נופל למקרה הבא |
| `hour <= closeHour` | פתוחים דקה אחרי הסגירה |
| `getMonth()` כמספר חודש | ינואר הוא 0 |
| `if (list)` על מערך ריק | מערך ריק הוא truthy. בדקו `.length` |

</div>

<div dir="rtl" align="right">

---

## ⏭️ בשלב הבא

**[שלב 19 – הדפסת התפריט בלולאה](../step-19-js-loops/)**

[🗺️ חזרה למפת הפרויקט](../../)

</div>

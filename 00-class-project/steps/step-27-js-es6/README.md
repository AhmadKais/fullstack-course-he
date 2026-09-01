<div dir="rtl" align="right">

# 🏗️ שלב 27 – פיצול הקוד למודולים

> **הפרויקט המתמשך של הכיתה: קפה עתיד**
> נלמד ב־[JS · מודול 11 – ES6 ומודרני](../../../03-javascript/11-es6-modern/) · [⏮️ שלב 26](../step-26-js-form-validation/) · [🗺️ מפת הפרויקט](../../)

---

## 🎯 מה מוסיפים היום

**יום שכתוב שני.** אותה התנהגות בדיוק, קוד אחר לגמרי.

- מפרקים את חמשת הקבצים ל-**תשעה מודולים**, כל אחד עם אחריות אחת.
- ה-HTML טוען **קובץ אחד**: `<script type="module" src="js/main.js">`.
- מחליפים את שרשור המחרוזות ב**תבניות מחרוזת** – ומרוויחים קריאוּת.
- מיישמים **פירוק (destructuring)**, **spread**, **ערכי ברירת מחדל** ו-**`?.`**.

</div>

<div dir="rtl" align="right">

> ## 🚨 מכאן והלאה חייבים שרת מקומי
>
> **פתיחה בלחיצה כפולה על הקובץ תפסיק לעבוד.** מודולים (וגם `fetch` בשלב 28)
> חסומים בפרוטוקול `file://` מטעמי אבטחה. תקבלו בקונסולה:
>
> `Access to script at 'file:///…' has been blocked by CORS policy`
>
> **הפתרון – שורה אחת בטרמינל, בתוך תיקיית הפרויקט:**
>
> | | הפקודה |
> |---|--------|
> | Python (מותקן כמעט תמיד) | `python3 -m http.server 8000` |
> | Node | `npx serve` |
> | VS Code | תוסף **Live Server** ← קליק ימני ← Open with Live Server |
>
> ואז נכנסים ל-`http://localhost:8000`.
>
> **זו לא עקיפה של מגבלה – זו הדרך הנכונה.** האתר שלכם ירוץ על שרת גם בייצור,
> וכדאי להתרגל לזה עכשיו.

</div>
<div dir="rtl" align="right">

---

## 🌍 למה זה ככה בעולם האמיתי

### הבעיה עם מה שיש לנו

עד עכשיו: חמישה קבצים, שכולם מדברים דרך **משתנים גלובליים**.

</div>

```html
<script defer src="js/data.js"></script>
<script defer src="js/helpers.js"></script>
<script defer src="js/hours.js"></script>
<script defer src="js/render.js"></script>
<script defer src="js/events.js"></script>
<script defer src="js/form.js"></script>
```

<div dir="rtl" align="right">

| הבעיה | דוגמה |
|--------|--------|
| **הסדר קריטי ושביר** | להעביר את `render.js` למעלה = הכול נשבר |
| **הכול גלובלי** | כל קובץ יכול לדרוס משתנה של אחר, בשקט |
| **לא רואים תלויות** | מי צריך את `formatPrice`? צריך לחפש |
| **התנגשות שמות** | ספרייה חיצונית עם `order` משלה תדרוס אותנו |

### מודולים – מה משתנה

</div>

```js
// format.js
export const formatPrice = (amount) => ...;

// menu.js
import { formatPrice } from "./format.js";
```

<div dir="rtl" align="right">

**שלושה דברים קורים ברגע שכתבתם `type="module"`:**

1. **כל משתנה הוא פרטי לקובץ** עד ש-`export` נכתב במפורש.
2. **הדפדפן מסדר את התלויות בעצמו** – הסדר בקובץ לא משנה.
3. **`defer` אוטומטי**, וגם `"use strict"` אוטומטי.

**ה-`.js` בסוף ה-`import` הוא חובה בדפדפן.** ב-Node ובכלי בנייה אפשר
להשמיט; בדפדפן זו כתובת אמיתית, ובלי הסיומת תקבלו 404.

### תבניות מחרוזת – ההבדל שמרגישים

**לפני:**

</div>

```js
return '<li class="menu-item" data-cat="' + item.cat + '" data-id="' + item.id + '">'
  + '<div><b>' + item.name + '</b>'
  + '<small class="item-note">' + item.note + '</small></div>'
  + '<span class="price">' + formatPrice(item.price) + '</span>'
  + '</li>';
```

<div dir="rtl" align="right">

**אחרי:**

</div>

```js
const itemHTML = ({ id, name, price, cat, note }) => `
  <li class="menu-item" data-cat="${cat}" data-id="${id}">
    <div><b>${name}</b><small class="item-note">${note}</small></div>
    <span class="price">${formatPrice(price)}</span>
    <button type="button" class="add-btn" data-id="${id}">הוספה</button>
  </li>`;
```

<div dir="rtl" align="right">

| | לפני | אחרי |
|---|------|------|
| גרשיים ופלוסים | 14 | 0 |
| שורות מרובות | דורש `\n` ידני | טבעי |
| קריאוּת ה-HTML | ✅ אפשר לראות מבנה | |

**הגרש הוא backtick** (`` ` ``) – בדרך כלל מתחת ל-`Esc`, לא גרש רגיל.

### פירוק – בפרמטרים של הפונקציה

</div>

```js
// לפני
function itemHTML(item) { return `<b>${item.name}</b> ${item.price}`; }

// אחרי
const itemHTML = ({ name, price }) => `<b>${name}</b> ${price}`;
```

<div dir="rtl" align="right">

**חתימת הפונקציה הפכה לתיעוד:** רואים מיד אילו שדות היא צריכה.

עובד גם על מערכים ובהשמה רגילה:

</div>

```js
const { open, close } = WEEK[when.getDay()];
const [first, second] = MENU;
```

<div dir="rtl" align="right">

### `?.` ו-`??` – שני קיצורים ששווים הרבה

</div>

```js
navToggle?.addEventListener("click", ...);   // אם null – לא קורה כלום
String(text ?? "")                            // ?? – רק null/undefined
```

<div dir="rtl" align="right">

**`?.` מחליף את כל בדיקות ה-`if (!el) return`** שפיזרנו בשלב 24.

**ו-`??` שונה מ-`||`:**

</div>

```js
0 || 10      // 10   ← 0 הוא falsy, אז נבחר הימני. לרוב לא מה שרצינו
0 ?? 10      // 0    ← ?? נכנס רק ב-null / undefined
```

<div dir="rtl" align="right">

בשדה "כמות" עם ערך 0, `||` היה מחליף אותו ב-10.

</div>
<div dir="rtl" align="right">

---

## 🔨 שלב אחר שלב

### 1. המבנה החדש

</div>

```text
js/
├── main.js        ← נקודת כניסה. הקובץ היחיד שה-HTML מכיר
├── config.js      ← קבועים: פרטי העסק, מפתחות, כתובות
├── menu-data.js   ← התפריט (בשלב 28 יעבור לשרת)
├── format.js      ← עיצוב מחרוזות ומספרים
├── hours.js       ← שעות פתיחה
├── menu.js        ← ציור התפריט, סינון וחיפוש
├── order.js       ← ההזמנה
├── form.js        ← ולידציה
└── ui.js          ← ניווט, מצב פתוח/סגור, שנה בפוטר
```

<div dir="rtl" align="right">

**כלל אחד:** לכל קובץ **אחריות אחת**, וצריך להיות אפשר להסביר אותה במשפט.
אם המשפט מכיל "וגם" – כנראה צריך לפצל.

### 2. ב-HTML: שורה אחת במקום שש

</div>

```html
<script type="module" src="js/main.js"></script>
```

<div dir="rtl" align="right">

### 3. `main.js` – הרכבה בלבד

</div>

```js
import { CAFE } from "./config.js";
import { MENU } from "./menu-data.js";
import { initMenu } from "./menu.js";
import { initOrder } from "./order.js";
import { initForm } from "./form.js";
import { initUI } from "./ui.js";

console.log(`${CAFE.name} · ${CAFE.address} · מאז ${CAFE.yearOpened}`);

initUI();
initMenu(MENU);
initOrder(MENU);
initForm();
```

<div dir="rtl" align="right">

**`main.js` לא מכיל לוגיקה.** הוא מייבא ומחבר. מי שרוצה להבין מה
האתר עושה קורא את הקובץ הזה ורואה את התמונה בשישה שורות.

### 4. `export` ו-`import` – שתי צורות

</div>

```js
// named – כמה בקובץ, השם חייב להתאים
export const formatPrice = ...;
export function matchesSearch() { }
import { formatPrice, matchesSearch } from "./format.js";

// default – אחד לקובץ, אפשר לקרוא לו איך שרוצים
export default function init() { }
import whatever from "./thing.js";
```

<div dir="rtl" align="right">

**אנחנו משתמשים ב-named בלבד.** השם זהה בשני הקבצים, ולכן חיפוש
`formatPrice` בפרויקט מוצא את כל השימושים.

### 5. פונקציות אתחול

</div>

```js
export function initMenu(menuItems) {
  items = menuItems;
  refresh();

  filterBar?.addEventListener("click", (event) => { ... });
  searchInput?.addEventListener("input", (event) => { ... });
}
```

<div dir="rtl" align="right">

**למה `init` ולא קוד שרץ ברמת הקובץ:** `main.js` מחליט **מתי** דברים
קורים ובאיזה סדר. מודול שמפעיל את עצמו בייבוא מסתיר תופעות לוואי.

**וגם:** `initMenu(items)` מקבל את הנתונים מבחוץ. לכן בשלב 28, כשהם
יגיעו מהרשת, **הקובץ הזה לא ישתנה בכלל.**

---

## 💻 הקוד המלא של השלב

**[`js/main.js`](js/main.js)** · **[`js/menu.js`](js/menu.js)** ·
**[`js/order.js`](js/order.js)** · **[`js/format.js`](js/format.js)** ·
**[`js/hours.js`](js/hours.js)** · **[`js/ui.js`](js/ui.js)** ·
**[`js/form.js`](js/form.js)** · **[`js/config.js`](js/config.js)**

לדוגמה, `js/format.js` כולו:

</div>

```js
// עיצוב מחרוזות ומספרים. פונקציות טהורות: קלט → פלט, בלי תופעות לוואי.
export const formatPrice = (amount) =>
  amount.toLocaleString("he-IL", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 0,
  });

export const formatHour = (h) => `${String(h).padStart(2, "0")}:00`;

export const normalize = (text) => String(text ?? "").trim().toLowerCase();

export function matchesSearch(item, term) {
  const q = normalize(term);
  if (q === "") return true;
  // ?. – אם note לא קיים, מחזיר undefined במקום לזרוק שגיאה
  return normalize(item.name).includes(q) || normalize(item?.note).includes(q);
}
```

<div dir="rtl" align="right">

## 👀 מה רואים במסך

**שום דבר לא השתנה.** הסינון, החיפוש, ההזמנה והטופס – בדיוק כמו אתמול.

**מה שכן השתנה:**
- ב-DevTools ← Sources ← Network רואים תשעה קבצים נטענים, מסודרים לפי תלות.
- **הקלידו `MENU` בקונסולה** → `Uncaught ReferenceError: MENU is not defined`.

**זה לא באג – זו המטרה.** המשתנה חי בתוך המודול שלו ולא מזהם את הדף.
(לניפוי, `import()` דינמי בקונסולה או `debugger` בתוך הקובץ.)

---

## ✋ אתגר לכיתה

1. פצלו את `hours.js`: העבירו את מערך `WEEK` ל-`config.js`.
2. הוסיפו `formatPhone()` ל-`format.js` והשתמשו בו ב-`ui.js`.
3. **בדיקה:** הסירו `type="module"` מה-`<script>`. מה השגיאה?
4. **חשיבה:** למה `initMenu` מקבלת את התפריט כפרמטר במקום לייבא אותו?

</div>
</div>

<details dir="rtl">
<summary><b>💡 הצגת הפתרון</b></summary>

<div dir="rtl" align="right">

**1.** `export const WEEK = [...]` ב-`config.js`, ואז
`import { WEEK } from "./config.js";` ב-`hours.js`.

**שאלה שכדאי לשאול בכיתה:** האם `WEEK` הוא "הגדרה" או "לוגיקה"?
שעות הפתיחה הן נתון שמשתנה לפי העסק – אז `config.js` הוא מקום סביר.
אין תשובה אחת נכונה, ודיון עליה שווה יותר מהתשובה.

**2.** `export const formatPhone = (p) => p.replace(/(\d{2,3})(\d{7})/, "$1-$2");`

**3.** `Uncaught SyntaxError: Cannot use import statement outside a module`

`import` הוא תחביר של מודול. בלי ההצהרה, הדפדפן מריץ את הקובץ
כסקריפט רגיל ולא מזהה אותו.

**4. כדי ש-`menu.js` לא יידע מאיפה הנתונים מגיעים.**

היום הם מ-`menu-data.js`. מחר – מהשרת. מחרתיים – מ-localStorage.
**`menu.js` לא ישתנה באף אחד מהמקרים**, כי הוא רק יודע לצייר מה שנותנים לו.

זה נקרא **הפרדת אחריות**, וזה בדיוק מה שיאפשר לשלב 28 להיות קצר.

</div>
</details>

<div dir="rtl" align="right">
<div dir="rtl" align="right">

---

## 🔍 טעויות שראינו בכיתה

| הטעות | מה קורה |
|--------|----------|
| פתיחה ב-`file://` | CORS חוסם. צריך שרת מקומי |
| `import { x } from "./file"` בלי `.js` | 404 |
| `export` נשכח | `does not provide an export named 'x'` |
| שכחת `type="module"` | `Cannot use import statement outside a module` |
| ייבוא מעגלי (A→B→A) | אחד המשתנים יהיה `undefined` |
| גרש רגיל במקום backtick | המחרוזת לא מפורשת, רואים `${name}` |

</div>

<div dir="rtl" align="right">

---

## ⏭️ בשלב הבא

**[שלב 28 – התפריט מגיע מהשרת](../step-28-js-fetch/)**

[🗺️ חזרה למפת הפרויקט](../../)

</div>

<div dir="rtl" align="right">

# 🏗️ שלב 28 – התפריט מגיע מהשרת

> **הפרויקט המתמשך של הכיתה: קפה עתיד**
> נלמד ב־[JS · מודול 12 – אסינכרוני ו-Fetch](../../../03-javascript/12-async-fetch/) · [⏮️ שלב 27](../step-27-js-es6/) · [🗺️ מפת הפרויקט](../../)

---

## 🎯 מה מוסיפים היום

- מוציאים את התפריט מהקוד ל-**`menu.json`** – קובץ נתונים שאפשר לערוך בלי לגעת ב-JS.
- כותבים **`js/menu-api.js`** שמביא אותו ב-`fetch` עם `async/await`.
- מציגים **שלד טעינה** בזמן ההמתנה, ו**הודעת שגיאה עם כפתור "ניסיון נוסף"** אם נכשל.
- מבינים למה `fetch` **לא** זורק שגיאה על 404.

</div>

<div dir="rtl" align="right">

## 🌍 למה זה ככה בעולם האמיתי

### מה קנינו בשינוי הזה

עד היום, שינוי מחיר דרש לערוך קוד. **מהיום עורכים קובץ JSON.**

בעולם האמיתי הקובץ הזה מגיע ממערכת ניהול תוכן או ממסד נתונים,
ובעל הקפה משנה מחיר מהטלפון. **המבנה שאנחנו כותבים היום זהה בדיוק
למה שכל API מחזיר.**

### JSON – התבנית של הרשת

</div>

```json
{
  "updated": "2026-09-01",
  "currency": "ILS",
  "items": [
    { "id": "espresso", "name": "אספרסו", "price": 9, "cat": "hot", "note": "שוט אחד" }
  ]
}
```

<div dir="rtl" align="right">

**זה נראה כמו אובייקט JavaScript, אבל הכללים נוקשים יותר:**

| ב-JSON | חייב |
|---------|-------|
| מפתחות | **במרכאות כפולות** |
| מחרוזות | **מרכאות כפולות בלבד**, לא גרש |
| פסיק אחרון | **אסור** |
| הערות | **אסורות** |
| `undefined`, פונקציות | לא קיימים |

פסיק מיותר אחרי האיבר האחרון הוא **הסיבה מספר אחת** לשגיאת
`Unexpected token } in JSON`.

### `async` / `await` – למה בכלל

הרשת לוקחת זמן. אילו JavaScript היה עוצר וממתין, **כל הדף היה קופא** –
הוא רץ בחוט אחד.

</div>

```js
export async function loadMenu() {
  const response = await fetch(MENU_URL);
  const data = await response.json();
  return data.items;
}
```

<div dir="rtl" align="right">

| המילה | המשמעות |
|--------|-----------|
| `async` | "הפונקציה הזו מחזירה Promise ואפשר לחכות בתוכה" |
| `await` | "עצור **את הפונקציה הזו** עד שיגיע הערך" – הדף ממשיך לעבוד |

**`await` חוקי רק בתוך `async`.** ו-`async` תמיד מחזירה Promise, גם אם
כתבתם `return 5` – ולכן מי שקורא לה חייב `await` או `.then`.

### 🚨 המלכודת הגדולה: `fetch` לא זורק על 404

</div>

```js
const response = await fetch("/menu.json");
// השרת החזיר 404. אין שגיאה. הקוד ממשיך.
const data = await response.json();   // ← כאן זה נשבר, עם הודעה מבלבלת
```

<div dir="rtl" align="right">

`fetch` נכשל **רק** אם לא הצליח להגיע לשרת בכלל (אין רשת, DNS, CORS).
תשובת 404 או 500 היא **תשובה תקינה** מבחינתו.

**לכן חובה, בכל `fetch` שתכתבו:**

</div>

```js
if (!response.ok) {
  throw new Error(`השרת החזיר ${response.status} ${response.statusText}`);
}
```

<div dir="rtl" align="right">

`response.ok` הוא `true` לסטטוס 200–299.

**בלי שלוש השורות האלה, שגיאת שרת נראית לתלמיד כמו באג בפירוק ה-JSON**,
והוא יבזבז חצי שעה במקום הלא נכון.

### שלושת המצבים של כל קריאת רשת

| המצב | מה המשתמש רואה |
|-------|------------------|
| **טוען** | שלד אפור מרצד – "משהו קורה" |
| **הצליח** | התוכן |
| **נכשל** | הסבר **וכפתור לנסות שוב** |

**רוב האתרים מטפלים רק במצב האמצעי**, ואז חיבור אטי נראה כמו דף שבור.
"טוען…" קופא לנצח כשמשהו נכשל.

**ולמה שלד ולא ספינר:** שלד מראה **את הצורה** של מה שיגיע, והדף לא
"קופץ" כשהתוכן נוחת. זה מה שפייסבוק ויוטיוב עושים.

</div>
<div dir="rtl" align="right">

---

## 🔨 שלב אחר שלב

### 1. `menu.json` בשורש הפרויקט

</div>

```json
{
  "updated": "2026-09-01",
  "currency": "ILS",
  "items": [
    { "id": "espresso", "name": "אספרסו", "price": 9, "cat": "hot", "note": "שוט אחד של פולים קלויים אצלנו" },
    { "id": "hafuch", "name": "הפוך", "price": 13, "cat": "hot", "note": "הכי נמכר אצלנו" }
  ]
}
```

<div dir="rtl" align="right">

`menu-data.js` נמחק.

### 2. `js/menu-api.js`

</div>

```js
import { MENU_URL } from "./config.js";

/**
 * מביא את התפריט מהשרת.
 * זורק שגיאה אם משהו השתבש – מי שקורא מחליט מה להציג.
 */
export async function loadMenu() {
  const response = await fetch(MENU_URL);

  // ⚠️ fetch לא זורק שגיאה על 404 או 500. חייבים לבדוק ידנית.
  if (!response.ok) {
    throw new Error(`השרת החזיר ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  if (!Array.isArray(data.items)) {
    throw new Error("מבנה התפריט שהתקבל אינו תקין");
  }

  return data.items;
}
```

<div dir="rtl" align="right">

**שימו לב לבדיקה השנייה:**

</div>

```js
if (!Array.isArray(data.items)) {
  throw new Error("מבנה התפריט שהתקבל אינו תקין");
}
```

<div dir="rtl" align="right">

**אף פעם לא סומכים על מה שחזר מהרשת.** אם מישהו שינה את המבנה,
עדיף הודעה ברורה מאשר `TypeError: items.map is not a function`
שלוש פונקציות משם.

**והפונקציה זורקת ולא מציגה שגיאה.** היא לא יודעת מה נכון להראות למשתמש –
זה תפקידו של מי שקרא לה. **הפרדת אחריות.**

### 3. מצבי הטעינה ב-`menu.js`

</div>

```js
export function showLoading() {
  if (!list) return;
  list.innerHTML = Array.from({ length: 6 })
    .map(() => '<li class="skeleton"></li>')
    .join("");
}

export function showError(message, onRetry) {
  if (!list) return;
  list.innerHTML = `<li class="error-box">
      <b>לא הצלחנו לטעון את התפריט.</b>
      <br><small>${message}</small>
      <br><button type="button" id="menu-retry">ניסיון נוסף</button>
    </li>`;
  document.getElementById("menu-retry")?.addEventListener("click", onRetry);
}
```

<div dir="rtl" align="right">

### 4. `main.js` מרכיב הכול

</div>

```js
async function start() {
  showLoading();
  try {
    const menu = await loadMenu();
    initMenu(menu);
    initOrder(menu);
  } catch (error) {
    console.error("טעינת התפריט נכשלה:", error);
    showError(error.message, start);      // הכפתור קורא ל-start מחדש
  }
}

start();
```

<div dir="rtl" align="right">

**`showError(error.message, start)`** – מעבירים את `start` עצמה ככפתור
"ניסיון נוסף". פונקציה שמקבלת פונקציה; זה כל מה ש"callback" אומר.

**ושימו לב ש-`initMenu` לא השתנתה מאתמול.** היא מקבלת מערך ומציירת.
לא אכפת לה שהוא הגיע מהרשת. **זה הרווח מהריפקטורינג של שלב 27.**

### 5. `try / catch`

</div>

```js
try {
  // קוד שעלול להיכשל
} catch (error) {
  // רץ רק אם נזרקה שגיאה
}
```

<div dir="rtl" align="right">

בלי `try/catch` סביב `await`, שגיאת רשת הופכת ל-`Unhandled Promise Rejection` –
הודעה בקונסולה **שהמשתמש לא רואה**, ודף שנשאר תקוע על "טוען".

---

## 💻 הקוד המלא של השלב

**[`menu.json`](menu.json)** · **[`js/menu-api.js`](js/menu-api.js)** ·
**[`js/menu.js`](js/menu.js)** · **[`js/main.js`](js/main.js)**

## 👀 מה רואים במסך

**הפעילו שרת מקומי** (`python3 -m http.server 8000`) ופתחו את `menu.html`:

1. **לרגע** – שישה מלבנים אפורים מרצדים.
2. **ואז** – התפריט המלא.

**כדי לראות את זה באמת:** `F12` ← Network ← Throttling ← **Slow 3G** ← רענון.

**ולראות את מצב השגיאה:**

| הניסוי | התוצאה |
|---------|---------|
| שנו ב-`config.js` ל-`"menu-typo.json"` | "השרת החזיר 404 Not Found" + כפתור |
| מחקו סוגר מסולסל ב-`menu.json` | "Unexpected token…" |
| Network ← Offline ← לחצו "ניסיון נוסף" | שגיאת רשת |

**בכל המקרים המשתמש מקבל הסבר וכפתור, לא דף תקוע.**

---

## ✋ אתגר לכיתה

1. הוסיפו ל-`menu.json` שדה `"available": true/false` והציגו רק זמינים.
2. הציגו בפוטר את תאריך `updated` מהקובץ.
3. **ניסוי:** מחקו את `if (!response.ok)`. שנו את הכתובת לשגויה. איזו
   שגיאה מקבלים עכשיו, ולמה היא מבלבלת?
4. **חשיבה:** למה `loadMenu` **זורקת** במקום להציג הודעה בעצמה?

</div>
</div>

<details dir="rtl">
<summary><b>💡 הצגת הפתרון</b></summary>

<div dir="rtl" align="right">

**1.** ב-`main.js`: `initMenu(menu.filter((item) => item.available !== false));`

`!== false` ולא `=== true` – כך פריטים ישנים בלי השדה עדיין מוצגים.
**תאימות לאחור** בקטן.

**2.** `loadMenu` תחזיר את האובייקט כולו במקום רק `items`, ואז
`document.getElementById("menu-updated").textContent = data.updated;`

**3.** תקבלו `SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON`.

**למה זה מבלבל:** השרת החזיר דף שגיאה **ב-HTML**, `response.json()` ניסה
לפרש אותו כ-JSON, ונשבר על התו `<`. ההודעה מפנה אתכם לפירוק ה-JSON,
בזמן שהבעיה האמיתית היא **כתובת שגויה**.

זה בדיוק מה ש-`if (!response.ok)` מונע.

**4.** כי היא לא יודעת מי קורא לה. אולי דף אחר רוצה להציג את השגיאה
אחרת, אולי מישהו רוצה לנסות כתובת גיבוי.

**הכלל:** פונקציה שמביאה נתונים **מדווחת** על כישלון. **מי שקורא לה
מחליט מה לעשות איתו.**

</div>
</details>

<div dir="rtl" align="right">
<div dir="rtl" align="right">

---

## 🔍 טעויות שראינו בכיתה

| הטעות | מה קורה |
|--------|----------|
| בלי `if (!response.ok)` | שגיאת שרת נראית כשגיאת JSON |
| `await` בלי `async` | `SyntaxError` |
| בלי `try/catch` | Unhandled rejection, דף תקוע על "טוען" |
| פסיק אחרי האיבר האחרון ב-JSON | `Unexpected token }` |
| גרש בודד ב-JSON | לא חוקי. רק מרכאות כפולות |
| שכחת שרת מקומי | CORS חוסם `fetch` על `file://` |
| בלי מצב טעינה | דף ריק שנראה שבור |

</div>

<div dir="rtl" align="right">

---

## ⏭️ בשלב הבא

**[שלב 29 – ההזמנה נשמרת בדפדפן](../step-29-js-storage/)**

[🗺️ חזרה למפת הפרויקט](../../)

</div>

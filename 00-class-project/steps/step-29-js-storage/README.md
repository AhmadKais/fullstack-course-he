<div dir="rtl" align="right">

# 🏗️ שלב 29 – ההזמנה נשמרת בדפדפן

> **הפרויקט המתמשך של הכיתה: קפה עתיד**
> נלמד ב־[JS · מודול 13 – אחסון בדפדפן](../../../03-javascript/13-storage/) · [⏮️ שלב 28](../step-28-js-fetch/) · [🗺️ מפת הפרויקט](../../)

---

## 🎯 מה מוסיפים היום

- כותבים **`js/storage.js`** – ההזמנה שורדת רענון דף.
- מוסיפים **כפתור מצב כהה** בכותרת, וההעדפה נשמרת.
- מחברים אותו למשתני ה-CSS שהכנו ב[שלב 16](../step-16-css-modern/) – בלי לגעת בעיצוב.
- לומדים למה **כל גישה ל-`localStorage` עטופה ב-`try/catch`**.

</div>

<div dir="rtl" align="right">

## 🌍 למה זה ככה בעולם האמיתי

### שלוש דרכים לזכור בדפדפן

| | חי עד | מתאים ל |
|---|--------|----------|
| `localStorage` | **לתמיד**, עד שמוחקים | העדפות, טיוטה, עגלה |
| `sessionStorage` | סגירת הלשונית | מצב זמני של תהליך |
| Cookies | תאריך תפוגה, **נשלח לשרת בכל בקשה** | זיהוי, הרשאות |

**האחסון הוא לפי מקור (origin).** מה שנשמר ב-`localhost:8000` לא קיים
ב-`localhost:3000`, ולא עובר בין דפדפנים או מכשירים.

> 🔒 **מה לא שמים ב-`localStorage`:** סיסמאות, טוקנים, מספרי כרטיס.
> **כל JavaScript בדף קורא אותם**, כולל סקריפט של צד שלישי שנפרץ.
> עגלה ומצב תצוגה – מצוין. זהות – לא.

### הכלל: מחרוזות בלבד

</div>

```js
localStorage.setItem("order", [{ id: "hafuch" }]);
localStorage.getItem("order");     // "[object Object]"   ← המידע אבד
```

<div dir="rtl" align="right">

**התיקון:**

</div>

```js
localStorage.setItem("order", JSON.stringify(order));
const order = JSON.parse(localStorage.getItem("order"));
```

<div dir="rtl" align="right">

| | מה עושה |
|---|----------|
| `JSON.stringify(obj)` | אובייקט → מחרוזת |
| `JSON.parse(str)` | מחרוזת → אובייקט |

**ומה `stringify` מאבד בדרך:** פונקציות, `undefined`, ו-`Date` שהופך
למחרוזת ולא חוזר להיות תאריך. שומרים **נתונים**, לא התנהגות.

### למה `try/catch` סביב **כל** גישה

`localStorage` נראה כמו משתנה, אבל הוא **זורק שגיאות אמיתיות**:

| המצב | מה קורה |
|-------|----------|
| גלישה פרטית בחלק מהדפדפנים | `setItem` זורק |
| חריגה ממכסה (~5MB) | `QuotaExceededError` |
| המשתמש חסם אחסון של אתרים | הגישה עצמה זורקת |
| מישהו ערך ידנית את הערך | `JSON.parse` זורק |

</div>

```js
export function loadOrder() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn("לא הצלחנו לקרוא הזמנה שמורה:", error.message);
    return [];
  }
}
```

<div dir="rtl" align="right">

**שימו לב לשתי הגנות מעבר ל-`try`:**
- `if (!raw) return []` – מפתח שלא קיים מחזיר `null`, ו-`JSON.parse(null)`
  מחזיר `null` שיפיל את `.map` בהמשך.
- `Array.isArray(parsed)` – ומה אם מישהו שמר שם מספר?

> **הכלל:** אחסון הוא **שיפור**, לא תלות. אתר שנשבר כי לא הצליח לקרוא
> העדפה שמורה הוא אתר שבור.

### מפתחות עם קידומת

</div>

```js
export const STORAGE_KEY = "cafe-atid:order";
export const THEME_KEY   = "cafe-atid:theme";
```

<div dir="rtl" align="right">

כל האתרים על `localhost` חולקים אחסון בזמן פיתוח. מפתח בשם `"order"`
יתנגש עם פרויקט אחר שלכם. **קידומת פותרת את זה.**

</div>
<div dir="rtl" align="right">

---

## 🔨 שלב אחר שלב

### 1. ההזמנה נשמרת

ב-`order.js`, שתי שורות:

</div>

```js
import { loadOrder, saveOrder } from "./storage.js";

function render() {
  ...
  saveOrder(order);         // ← בסוף כל ציור
}

export function initOrder(menuItems) {
  catalog = menuItems;
  order = loadOrder();      // ← בהתחלה
  render();
  ...
}
```

<div dir="rtl" align="right">

**שומרים ב-`render`** ולא בכל פונקציה שמשנה את ההזמנה. `render` רצה
אחרי כל שינוי ממילא – **נקודה אחת, בלי לשכוח.**

### 2. כפתור מצב כהה

</div>

```html
<button id="theme-toggle" class="theme-toggle"
        aria-label="מעבר בין מצב בהיר לכהה">🌙</button>
```


```js
themeBtn?.addEventListener("click", () => {
  const current = document.documentElement.dataset.theme
    || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  saveTheme(next);
  paintToggle();
});
```

<div dir="rtl" align="right">

**כל מה שהכפתור עושה זה לכתוב `data-theme="dark"` על `<html>`.**

ה-CSS מ[שלב 16](../step-16-css-modern/) כבר יודע:

</div>

```css
:root[data-theme="dark"] {
  --bg: #17110c;
  --ink: #efe6da;
  ...
}
```

<div dir="rtl" align="right">

**לא נגענו בשורת CSS אחת היום.** זה הרווח מריפקטורינג טוב:
פיצ׳ר שנראה גדול הוא שש שורות, כי הבסיס הוכן נכון.

**ו-`dataset.theme` הוא הדרך לגשת ל-`data-theme`** – אותה תכונה
שראינו ב-`btn.dataset.id`.

### 3. שלושה מצבים, לא שניים

</div>

```js
function initTheme() {
  const saved = loadTheme();
  if (saved) document.documentElement.dataset.theme = saved;
  paintToggle();
  ...
}
```

<div dir="rtl" align="right">

| המצב | מה קורה |
|-------|----------|
| **לא בחר** (`null`) | הולכים לפי `prefers-color-scheme` של המערכת |
| **בחר "כהה"** | כהה, גם אם המערכת בהירה |
| **בחר "בהיר"** | בהיר, גם אם המערכת כהה |

**זו הסיבה ל-`:root:not([data-theme="light"])`** שכתבנו בשלב 16 –
בחירה מפורשת גוברת על המערכת, בשני הכיוונים.

> ⚡ **הבזק הלבן:** האתר נטען בהיר לרגע לפני שה-JS מספיק להחיל את
> ההעדפה. הפתרון המקצועי הוא סקריפט חוסם זעיר ב-`<head>` שקורא את
> `localStorage` לפני הציור הראשון. שווה להזכיר בכיתה.

### 4. `paintToggle` – הכפתור מספר את האמת

</div>

```js
function paintToggle() {
  const dark = document.documentElement.dataset.theme === "dark";
  themeBtn.textContent = dark ? "☀️" : "🌙";
  themeBtn.setAttribute("aria-label", dark ? "מעבר למצב בהיר" : "מעבר למצב כהה");
}
```

<div dir="rtl" align="right">

**ה-`aria-label` מתעדכן יחד עם האייקון.** אמוג'י לבד הוא חסר משמעות
לקורא מסך – "שמש" לא אומר מה הכפתור **עושה**.

---

## 💻 הקוד המלא של השלב

`js/storage.js`:

</div>

```js
import { STORAGE_KEY, THEME_KEY } from "./config.js";

/**
 * localStorage שומר מחרוזות בלבד, ויכול לזרוק שגיאה
 * (גלישה פרטית, אחסון מלא, הרשאות חסומות).
 * לכן כל גישה עטופה ב-try/catch – אתר לא נשבר בגלל העדפה שנשמרה.
 */
export function loadOrder() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn("לא הצלחנו לקרוא הזמנה שמורה:", error.message);
    return [];
  }
}

export function saveOrder(order) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
  } catch (error) {
    console.warn("לא הצלחנו לשמור את ההזמנה:", error.message);
  }
}

export function loadTheme() {
  try {
    return localStorage.getItem(THEME_KEY);   // "dark" | "light" | null
  } catch {
    return null;
  }
}

export function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch { /* לא נורא – ההעדפה פשוט לא תישמר */ }
}
```

<div dir="rtl" align="right">

## 👀 מה רואים במסך

1. **הוסיפו שלושה פריטים להזמנה. רעננו (`F5`). ההזמנה שם.**
2. **סגרו את הדפדפן לגמרי, פתחו שוב** – עדיין שם.
3. **לחצו 🌙** – האתר הופך לכהה. רעננו – נשאר כהה.
4. **פתחו חלון גלישה פרטית** – ההזמנה ריקה. אחסון נפרד.

**ב-DevTools ← Application ← Local Storage** רואים את שני המפתחות
ואת התוכן שלהם. אפשר לערוך ידנית ולרענן.

**נסו לשבור:** ערכו את `cafe-atid:order` לטקסט שאינו JSON ורעננו.
הדף **לא נשבר** – אזהרה בקונסולה, ומתחילים מהזמנה ריקה. זה ה-`try/catch`.

---

## ✋ אתגר לכיתה

1. הוסיפו כפתור "ניקוי ההזמנה" שמוחק גם מהאחסון (`removeItem`).
2. שמרו את הקטגוריה האחרונה שנבחרה, והחילו אותה בטעינה.
3. הוסיפו חותמת זמן, ואם ההזמנה בת יותר מ-24 שעות – התחילו מחדש.
4. **חשיבה:** למה `saveOrder` נקראת מתוך `render` ולא מתוך `addToOrder`?

</div>
</div>

<details dir="rtl">
<summary><b>💡 הצגת הפתרון</b></summary>

<div dir="rtl" align="right">

**1.** `export function clearOrder() { try { localStorage.removeItem(STORAGE_KEY); } catch {} }`

(בפועל `saveOrder([])` עושה את אותו דבר. `removeItem` נקי יותר – לא
משאיר מפתח מיותר.)

**2.** מפתח שלישי `cafe-atid:cat`, שמירה בכל שינוי סינון, וקריאה
ב-`initMenu` לפני ה-`refresh()` הראשון.

**3.** שומרים אובייקט במקום מערך:

`saveOrder({ items: order, at: Date.now() });`

ובטעינה:

`if (Date.now() - parsed.at > 24 * 60 * 60 * 1000) return [];`

**שימו לב שזה שובר תאימות** עם מה ששמור אצל משתמשים קיימים –
ולכן `Array.isArray(parsed) ? parsed : (parsed.items ?? [])` הוא
מה שמערכת אמיתית הייתה עושה. **מיגרציית נתונים** בקטן.

**4. כי `render` היא הנקודה היחידה שרצה אחרי כל שינוי.**

`addToOrder`, כפתור ההסרה, כפתור הניקוי – כולם מסתיימים ב-`render()`.
שמירה שם = **בלתי אפשרי לשכוח**.

לו היינו שמים ב-`addToOrder`, כל פונקציה חדשה שתשנה את ההזמנה הייתה
צריכה לזכור לשמור – וזו תקלה שמחכה לקרות.

</div>
</details>

<div dir="rtl" align="right">
<div dir="rtl" align="right">

---

## 🔍 טעויות שראינו בכיתה

| הטעות | מה קורה |
|--------|----------|
| שמירת אובייקט בלי `JSON.stringify` | `"[object Object]"` |
| `JSON.parse` בלי `try/catch` | ערך פגום מפיל את הדף לתמיד |
| בלי `if (!raw)` | `JSON.parse(null)` מחזיר `null` |
| טוקנים ב-`localStorage` | כל סקריפט בדף קורא אותם |
| מפתח בשם `"data"` | התנגשות עם פרויקטים אחרים על localhost |
| הנחה ש-`localStorage` תמיד עובד | קורס בגלישה פרטית |

</div>

<div dir="rtl" align="right">

---

## ⏭️ בשלב הבא

**[שלב 30 – טיפול בשגיאות וליטוש אחרון](../step-30-js-errors/)**

[🗺️ חזרה למפת הפרויקט](../../)

</div>

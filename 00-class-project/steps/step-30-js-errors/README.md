<div dir="rtl" align="right">

# 🏗️ שלב 30 – טיפול בשגיאות וליטוש אחרון

> **הפרויקט המתמשך של הכיתה: קפה עתיד**
> נלמד ב־[JS · מודול 14 – שגיאות ודיבאג](../../../03-javascript/14-errors-debugging/) · [⏮️ שלב 29](../step-29-js-storage/) · [🗺️ מפת הפרויקט](../../)

---

## 🎯 מה מוסיפים היום

**השיעור האחרון.** מוסיפים את רשת הביטחון ומגישים.

- מוסיפים **מטפלי שגיאות גלובליים** – שום כשל לא נעלם בשקט.
- מבדילים בין **מה שהמשתמש רואה** לבין **מה שאנחנו צריכים לדעת**.
- מוסיפים הודעת **toast** ו**סגנון הדפסה** לתפריט.
- עוברים על ארגז הכלים של DevTools, ועל טבלת הבאגים של כל הקורס.

</div>

<div dir="rtl" align="right">

## 🌍 למה זה ככה בעולם האמיתי

### שלוש רמות של טיפול בשגיאות

| הרמה | איפה | מה היא תופסת |
|-------|-------|---------------|
| **מקומית** | `try/catch` סביב קוד שעלול להיכשל | מה שציפינו לו |
| **גלובלית** | `window.addEventListener("error")` | מה שלא ציפינו לו |
| **ניטור** | שירות חיצוני (Sentry וכדומה) | **מה שקרה למשתמש ולא לנו** |

הרמה השלישית היא ההבדל בין "אף אחד לא התלונן" לבין "אין באגים".
משתמש שנתקל בדף שבור **לא כותב לכם – הוא עוזב**.

### מטפלים גלובליים

</div>

```js
window.addEventListener("error", (event) => {
  console.error("שגיאה לא מטופלת:", event.error);
});

window.addEventListener("unhandledrejection", (event) => {
  console.error("Promise שנדחה ולא טופל:", event.reason);
});
```

<div dir="rtl" align="right">

**שניים, כי הם תופסים דברים שונים:**
- `error` – שגיאה בקוד סינכרוני.
- `unhandledrejection` – `Promise` שנדחה בלי `catch`. **כל `await`
  בלי `try/catch` נופל לכאן.**

בפרויקט אמיתי, כאן שולחים דיווח לשרת.

### מה המשתמש רואה מול מה שנרשם

</div>

```js
} catch (error) {
  console.error("טעינת התפריט נכשלה:", error);      // לנו: הכול
  showError(
    error instanceof TypeError
      ? "נראה שאין חיבור לרשת."                      // למשתמש: מה לעשות
      : error.message,
    start,
  );
}
```

<div dir="rtl" align="right">

**`fetch` זורק `TypeError` כשאין רשת.** "Failed to fetch" לא אומר כלום
למשתמש; "נראה שאין חיבור לרשת" אומר לו **מה לבדוק**.

> **הכלל:** הודעה למשתמש עונה על *"מה אני יכול לעשות עכשיו"*.
> הודעה בקונסולה עונה על *"מה בדיוק קרה"*. **אף פעם לא להציג
> `error.stack` על המסך** – זה גם חסר תועלת וגם חושף מידע.

### `finally` – רץ תמיד

</div>

```js
try {
  const menu = await loadMenu();
  ...
} catch (error) {
  ...
} finally {
  console.timeEnd("menu-load");     // רץ תמיד
}
```

<div dir="rtl" align="right">

בהצלחה, בכישלון, ואפילו אחרי `return` בתוך ה-`try`. **המקום לניקוי:**
לכבות ספינר, לשחרר כפתור, לסגור חיבור.

### חמישה סוגי שגיאות שתפגשו

| הסוג | מתי | דוגמה |
|-------|------|--------|
| `SyntaxError` | **לפני ההרצה** – הקובץ כולו לא רץ | סוגר חסר |
| `ReferenceError` | משתנה לא קיים | שגיאת כתיב בשם |
| `TypeError` | פעולה על הטיפוס הלא נכון | `null.price` |
| `RangeError` | ערך מחוץ לתחום | רקורסיה אינסופית |
| שגיאה משלנו | `throw new Error("...")` | 404 מהשרת |

**ה-`SyntaxError` הוא המבלבל:** הוא נתפס בקריאת הקובץ, אז **שום דבר
בקובץ לא רץ** – גם לא השורות התקינות. זה מסביר את "פתאום הכול מת".

### לזרוק שגיאה זו החלטה טובה

</div>

```js
if (!response.ok) {
  throw new Error(`השרת החזיר ${response.status}`);
}
```

<div dir="rtl" align="right">

**עדיף להיכשל ברעש מוקדם** מאשר להמשיך עם נתונים שגויים ולהיכשל
חמש פונקציות אחר כך, במקום שלא קשור לבעיה.

</div>
<div dir="rtl" align="right">

---

## 🔨 שלב אחר שלב

### 1. הודעת toast

</div>

```js
export function toast(message, ms = 2500) {
  const el = document.createElement("div");
  el.className = "toast";
  el.setAttribute("role", "status");
  el.textContent = message;
  document.body.append(el);
  setTimeout(() => el.remove(), ms);
}
```

<div dir="rtl" align="right">

**`role="status"`** – קורא מסך מכריז את ההודעה **בלי לקטוע** את מה
שהמשתמש עושה. (`role="alert"` קוטע – שמור לשגיאות.)

**ו-`textContent`** – ההודעה עלולה להכיל טקסט משגיאה, שיכול להכיל
תווים מסוכנים.

### 2. `main.js` המוגמר

</div>

```js
import { CAFE } from "./config.js";
import { loadMenu } from "./menu-api.js";
import { initMenu, showLoading, showError } from "./menu.js";
import { initOrder } from "./order.js";
import { initForm } from "./form.js";
import { initUI, toast } from "./ui.js";

console.log(`${CAFE.name} · ${CAFE.address}`);

// רשת ביטחון אחרונה: כל שגיאה שאף אחד לא תפס מגיעה לכאן.
// בפרויקט אמיתי כאן שולחים דיווח לשירות ניטור.
window.addEventListener("error", (event) => {
  console.error("שגיאה לא מטופלת:", event.error);
});

window.addEventListener("unhandledrejection", (event) => {
  console.error("Promise שנדחה ולא טופל:", event.reason);
});

async function start() {
  console.time("menu-load");
  showLoading();
  try {
    const menu = await loadMenu();
    initMenu(menu);
    initOrder(menu);
    toast("התפריט מעודכן להיום");
  } catch (error) {
    // מפרידים בין מה שהמשתמש רואה לבין מה שאנחנו צריכים לדעת
    console.error("טעינת התפריט נכשלה:", error);
    showError(
      error instanceof TypeError
        ? "נראה שאין חיבור לרשת."
        : error.message,
      start,
    );
  } finally {
    // רץ תמיד – גם בהצלחה וגם בכישלון
    console.timeEnd("menu-load");
  }
}

try {
  initUI();
  initForm();
} catch (error) {
  console.error("אתחול הממשק נכשל:", error);
}

start();
```

<div dir="rtl" align="right">

**שימו לב ש-`initUI()` ו-`initForm()` עטופים ב-`try` נפרד.** אם
אתחול הממשק נכשל, אנחנו עדיין רוצים שהתפריט ייטען. **כשל אחד לא מפיל הכול.**

### 3. סגנון הדפסה

</div>

```css
@media print {
  .site-header, .site-footer, .filters, .search,
  .order-panel, .add-btn, .skip-link { display: none !important; }

  body { background: #fff; color: #000; }
  main { max-width: none; }
}
```

<div dir="rtl" align="right">

**בית קפה מדפיס את התפריט.** בלי הבלוק הזה, הדפסה מבזבזת דיו על
כותרת חומה וכפתורי "הוספה" חסרי משמעות על נייר.

**`Ctrl+P` ← תצוגה מקדימה** – ותראו תפריט נקי.

---

## 🧰 ארגז הכלים – DevTools

### `console` – יותר מ-`log`

</div>

```js
console.log(item);                 // הרגיל
console.table(MENU);               // טבלה עם עמודות שאפשר למיין
console.error("נכשל:", error);      // אדום + stack trace
console.warn("שים לב");
console.count("renderMenu");       // כמה פעמים זה רץ?
console.time("render");            // כמה זמן לקח?
console.timeEnd("render");
console.log({ activeCat, searchTerm });   // ← הטריק: שמות המשתנים נשמרים
```

<div dir="rtl" align="right">

**השורה האחרונה שווה זהב.** `console.log(a, b, c)` נותן שלושה ערכים
בלי לדעת מי מי. `console.log({ a, b, c })` נותן אובייקט עם שמות.

### `debugger` – עדיף על `console.log`

</div>

```js
function addToOrder(id) {
  debugger;        // הביצוע עוצר כאן כשה-DevTools פתוח
  ...
}
```

<div dir="rtl" align="right">

עצירה נותנת **את כל המשתנים בבת אחת**, ואת שרשרת הקריאות
(Call Stack) שהובילה לכאן. `console.log` נותן ערך אחד בנקודה אחת.

### חמש הלשוניות שבאמת בשימוש

| הלשונית | מתי |
|-----------|------|
| **Console** | שגיאות ופלט |
| **Elements** | ה-DOM **החי** + ה-CSS שחל בפועל |
| **Network** | מה נטען, כמה זמן, איזה סטטוס. ואת ה-Throttling |
| **Sources** | נקודות עצירה וניפוי צעד־צעד |
| **Application** | `localStorage` |

### מתודולוגיה: איך מאתרים באג

1. **לשחזר.** אם זה לא עקבי, אין מה לתקן.
2. **לקרוא את השגיאה עד הסוף** – היא כוללת קובץ ומספר שורה.
3. **לצמצם.** להעיף חצי מהקוד; הבאג נשאר או נעלם? חוזרים.
4. **לוודא הנחות.** `console.log` על **מה שנכנס** לפונקציה. ברוב
   המקרים הבאג הוא שהקלט לא מה שחשבתם.
5. **שינוי אחד בכל פעם.**

---

## 💻 הקוד המלא של השלב

**[`js/main.js`](js/main.js)** · **[`js/ui.js`](js/ui.js)** ·
**[`css/style.css`](css/style.css)**

## 👀 מה רואים במסך

- טעינת דף התפריט מסתיימת ב-toast: **"התפריט מעודכן להיום"**.
- **Network ← Offline ← רענון** → "נראה שאין חיבור לרשת" + כפתור.
  מחזירים חיבור, לוחצים – הכול חוזר.
- **`Ctrl+P`** → תפריט להדפסה, בלי ניווט וכפתורים.

---

## 🎓 סיימנו. מה בנינו ב-30 שיעורים

**[`00-class-project/final/`](../../final/) – האתר המוגמר, בעותק נקי אחד.**

| | |
|---|---|
| **HTML** | 4 דפים סמנטיים · טופס מלא · וידאו עם כתוביות · מפה · Open Graph |
| **CSS** | 600 שורות · משתנים · Flexbox + Grid · רספונסיבי · מצב כהה · אנימציות |
| **JavaScript** | 10 מודולי ES · תפריט מ-JSON · סינון וחיפוש · הזמנה נשמרת · ולידציה |
| **נגישות** | קישור דילוג · ARIA · ניווט מקלדת · `prefers-reduced-motion` |

**מספרים:** ~1,900 שורות קוד, 30 שיעורים, אתר אחד.

### להריץ

</div>

```bash
cd 00-class-project/final
python3 -m http.server 8000
# ואז: http://localhost:8000
```

<div dir="rtl" align="right">

### להמשיך מכאן

| הרעיון | מה מתרגלים |
|---------|--------------|
| עמוד "דרושים" עם טופס | חזרה על HTML + ולידציה |
| כמות בהזמנה: `+` / `−` / הסרה | ניהול מצב |
| דף מנהל שעורך את `menu.json` | טפסים + נתונים |
| תרגום האתר לאנגלית | **המאפיינים הלוגיים משלב 16 יוכיחו את עצמם** |
| העלאה ל-GitHub Pages | פריסה אמיתית, וכתובות מלאות ל-`og:image` |

---

## ✋ אתגר אחרון

1. הוסיפו toast גם בהוספה להזמנה: "אספרסו נוסף להזמנה".
2. הוסיפו `try/catch` סביב `initOrder` בנפרד.
3. שברו את האתר בכוונה בשלוש דרכים שונות, ותקנו בעזרת DevTools בלבד.
4. **חשיבה:** למה `initUI()` ו-`initForm()` ב-`try` נפרד מ-`start()`?

</div>
</div>

<details dir="rtl">
<summary><b>💡 הצגת הפתרון</b></summary>

<div dir="rtl" align="right">

**1.** ב-`order.js`: `import { toast } from "./ui.js";` ובסוף `addToOrder`:
`toast(`${item.name} נוסף להזמנה`);`

⚠️ **שימו לב:** `order.js` מייבא מ-`ui.js`. אם `ui.js` יייבא מ-`order.js` –
נוצר **ייבוא מעגלי**, ואחד המשתנים יהיה `undefined` בזמן ריצה. שווה
לבדוק את גרף הייבוא כשמוסיפים חיבור חדש.

**2.**

`try { initOrder(menu); } catch (error) { console.error("אתחול ההזמנה נכשל:", error); }`

עכשיו גם אם ההזמנה השמורה פגומה, **התפריט עדיין מוצג**.

**3.** למשל: שם שגוי ב-`import` (`SyntaxError`), `menuList.innerHTMLL`
(שקט לגמרי!), `menu.json` עם פסיק מיותר.

**השלישי הוא החינוכי:** השמה לשדה שלא קיים **לא זורקת שגיאה** –
היא פשוט יוצרת שדה חדש. שום דבר לא קורה, ואין הודעה. את זה מאתרים
רק ב-`debugger`, או בעין.

**4.** כי הם **בלתי תלויים**.

`start()` תלוי ברשת. `initUI()` לא. אם הרשת נפלה, אנחנו עדיין רוצים
שהניווט, מצב כהה והטופס יעבדו – ושהמשתמש יראה הודעה מסודרת
במקום דף מת.

**זה נקרא "כשל חינני" (graceful degradation):** כשמשהו נשבר, שוברים
כמה שפחות.

</div>
</details>

<div dir="rtl" align="right">
<div dir="rtl" align="right">

---

## 🔍 טבלת הבאגים של כל הקורס

| הסימפטום | הסיבה הנפוצה | השלב |
|------------|----------------|-------|
| העברית ג׳יבריש | חסר `<meta charset="UTF-8">` | 01 |
| התמונה ריבוע שבור | נתיב יחסי שגוי | 04 |
| שדה נשלח ריק | חסר `name` | 05 |
| הדף בלי עיצוב | נתיב `<link>` שגוי, או 404 | 08 |
| הפריסה גולשת | חסר `box-sizing: border-box` | 10 |
| התווית קפצה לפינת המסך | חסר `position: relative` בהורה | 11 |
| הכותרת לא נדבקת | חסר `top`, או `overflow` בהורה | 11 |
| האתר נשבר במובייל | חסר `<meta viewport>` | 14 |
| `Cannot read properties of null` | אלמנט לא קיים בדף הזה | 24 |
| הכפתורים מפסיקים לעבוד אחרי סינון | מאזין על אלמנט שנמחק | 25 |
| הדף נטען מחדש בשליחת טופס | חסר `preventDefault()` | 26 |
| `Cannot use import statement…` | חסר `type="module"` | 27 |
| CORS blocked | פתיחה ב-`file://` | 27 |
| `Unexpected token '<' … is not valid JSON` | 404 שהוחזר כ-HTML | 28 |
| `"[object Object]"` באחסון | חסר `JSON.stringify` | 29 |
| `NaN` בכל מקום | `undefined` נכנס לחישוב | 19 |

</div>

<div dir="rtl" align="right">

---

## 🎓 זהו – האתר גמור

האתר שבנינו יחד לאורך 30 שיעורים נמצא גם ב־[`final/`](../../final/) כעותק אחד נקי להגשה ולתיק העבודות.

[🗺️ חזרה למפת הפרויקט](../../)

</div>

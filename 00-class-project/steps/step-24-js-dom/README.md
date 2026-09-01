<div dir="rtl" align="right">

# 🏗️ שלב 24 – התפריט נבנה מהקוד

> **הפרויקט המתמשך של הכיתה: קפה עתיד**
> נלמד ב־[JS · מודול 8 – DOM](../../../03-javascript/08-dom/) · [⏮️ שלב 23](../step-23-js-strings-numbers/) · [🗺️ מפת הפרויקט](../../)

---

## 🎯 מה מוסיפים היום

**היום הכול מתחבר.**

- **מוחקים** את 18 פריטי התפריט שכתובים ביד ב-`menu.html`, ומשאירים `<ul>` ריק.
- כותבים **`js/render.js`** שבונה אותם מהמערך `MENU`.
- ממלאים את שורת "פתוח עכשיו" מ-`openStatusText()` – עם צבע לפי המצב.
- מעדכנים את שנת הזכויות בפוטר אוטומטית.
- מבינים את ההבדל הקריטי בין `innerHTML` ל-`textContent`.

</div>

<div dir="rtl" align="right">

## 🌍 למה זה ככה בעולם האמיתי

### מה בעצם עשינו

עד היום, כדי להוסיף מנה לתפריט היה צריך לערוך HTML. **מהיום מוסיפים
שורה למערך.**

זה כל ההבדל בין אתר סטטי לאפליקציה: **מקור אמת אחד** (הנתונים),
ותצוגה שנגזרת ממנו. בשלב 28 מקור האמת הזה יעבור לשרת, ואפשר יהיה
לשנות מחיר בלי לגעת בקוד בכלל.

### ה-DOM הוא לא ה-HTML שלכם

הקובץ שכתבתם הוא **טקסט**. הדפדפן קורא אותו פעם אחת ובונה ממנו **עץ
אובייקטים חי** – ה-DOM. משם והלאה, ה-JavaScript עובד על העץ, לא על הקובץ.

**נסו:** שנו משהו בדף דרך הקונסולה, ואז `Ctrl+U` (הצג מקור).
המקור לא השתנה. מה שהשתנה זה מה שרואים ב-Elements ב-DevTools.

### ארבע דרכים לבחור אלמנט

</div>

```js
document.getElementById("menu-list")        // מהיר. אלמנט אחד או null
document.querySelector(".filters")          // הראשון שמתאים לסלקטור CSS
document.querySelectorAll(".menu-item")     // כולם. NodeList
document.getElementsByClassName("filter")   // ישן, "חי" – עדיף להימנע
```

<div dir="rtl" align="right">

**`querySelector` מקבל כל סלקטור CSS שלמדנו** – `.filters`,
`#main-nav a`, `[aria-current="page"]`. ידע שכבר יש לכם.

### הבדיקה שחוסכת את הבאג מספר אחת

</div>

```js
const menuList = document.getElementById("menu-list");
if (!menuList) return;
```

<div dir="rtl" align="right">

**אותו קובץ JS נטען בארבעת הדפים.** `#menu-list` קיים רק ב-`menu.html`.
בלי הבדיקה נקבל בשלושת הדפים האחרים:

</div>

```text
Uncaught TypeError: Cannot set properties of null (setting 'innerHTML')
```

<div dir="rtl" align="right">

**וברגע שנזרקה שגיאה, כל שאר הקובץ מפסיק לרוץ** – כולל שורת "פתוח עכשיו"
שכן הייתה אמורה לעבוד. באג בדף אחד הורג פיצ׳ר בדף אחר.

### `innerHTML` מול `textContent` – ההבדל שהוא חור אבטחה

| | `innerHTML` | `textContent` |
|---|-------------|----------------|
| מפרש תגיות | ✅ | ❌ |
| מהירות | איטי יותר | מהיר |
| בטוח לקלט משתמש | **❌ לא** | ✅ **כן** |

</div>

```js
const evil = '<img src=x onerror="alert(document.cookie)">';

el.innerHTML = evil;      // ❌ הקוד ירוץ. זו מתקפת XSS
el.textContent = evil;    // ✅ יוצג כטקסט
```

<div dir="rtl" align="right">

> **הכלל:** תוכן שאתם שולטים בו (התפריט שלנו) – `innerHTML` בסדר.
> **כל דבר שמגיע ממשתמש, מטופס, מכתובת ה-URL או מ-API** – `textContent`.
>
> זו אותה מתקפה שדיברנו עליה במודול 2 עם `&lt;`. שם הגנו בצד ה-HTML,
> כאן בצד ה-JS.

### למה בונים מחרוזת אחת ולא 18

</div>

```js
// ❌ 18 חישובי פריסה מחדש
for (const item of MENU) menuList.innerHTML += itemHTML(item);

// ✅ אחד
let html = "";
for (const item of MENU) html += itemHTML(item);
menuList.innerHTML = html;
```

<div dir="rtl" align="right">

כל נגיעה ב-DOM גורמת לדפדפן לחשב מחדש פריסה וציור. ב-18 פריטים לא
תרגישו; ב-500 שורות בטבלה זה ההבדל בין מיידי לתקוע.

**ויש בעיה נוספת ב-`+=`:** הוא **מוחק ובונה מחדש** את כל התוכן בכל סיבוב –
כל מאזין אירועים שהיה שם נמחק.

</div>
<div dir="rtl" align="right">

---

## 🔨 שלב אחר שלב

### 1. מוחקים את התפריט מה-HTML

**לפני:**

</div>

```html
<section class="menu-cat" id="hot">
  <h3>קפה חם</h3>
  <ul>
    <li><b>אספרסו</b> – 9&#8362; <small>(שוט אחד)</small></li>
    ... עוד 17 שורות ...
  </ul>
</section>
```

<div dir="rtl" align="right">

**אחרי – כל התפריט:**

</div>

```html
<ul id="menu-list" class="menu-grid">
  <li class="loading">טוען את התפריט…</li>
</ul>
```

<div dir="rtl" align="right">

**ה-`<li class="loading">` הוא לא קישוט.** אם ה-JS ייכשל, המשתמש יראה
"טוען…" ולא חלל ריק – והוא יבין שמשהו לא בסדר במקום לחשוב שהתפריט ריק.

### 2. בוחרים אלמנטים – פעם אחת, בראש הקובץ

</div>

```js
const menuList   = document.getElementById("menu-list");
const openStatus = document.getElementById("open-status");
```

<div dir="rtl" align="right">

**לא בתוך פונקציה שרצה שוב ושוב.** חיפוש ב-DOM עולה; שומרים את התוצאה.

### 3. תבנית לפריט אחד

</div>

```js
function menuItemHTML(item) {
  return '<li class="menu-item" data-cat="' + item.cat + '" data-id="' + item.id + '">'
    + '<div><b>' + item.name + '</b>'
    + '<small class="item-note">' + item.note + '</small></div>'
    + '<span class="price">' + formatPrice(item.price) + '</span>'
    + '</li>';
}
```

<div dir="rtl" align="right">

**כן, זה מכוער.** כל הגרשיים והפלוסים האלה הם בדיוק הסיבה שקיימות
**תבניות מחרוזת** (`` ` ``). נחליף את זה בשלב 27, ותרגישו את ההבדל.

**`data-cat` ו-`data-id`** הן תכונות `data-*` – מקום חוקי לשמור מידע
על אלמנט. בשלב 25 הכפתור יקרא `btn.dataset.id` וידע איזה פריט להוסיף.

### 4. הפונקציה שמציירת

</div>

```js
function renderMenu(items) {
  if (!menuList) return;

  if (items.length === 0) {
    menuList.innerHTML = '<li class="empty">לא נמצאו פריטים מתאימים.</li>';
    return;
  }

  let html = "";
  for (const item of items) html += menuItemHTML(item);
  menuList.innerHTML = html;
}
```

<div dir="rtl" align="right">

**`renderMenu` מקבלת את הפריטים כפרמטר** ולא ניגשת ל-`MENU` ישירות.
בזכות זה, בשלב 25 נוכל לקרוא לה עם רשימה מסוננת – **בלי לשנות בה שורה**.

**וטיפול במקרה הריק** – בלעדיו, חיפוש שלא מצא כלום נותן דף לבן שנראה שבור.

### 5. שורת "פתוח עכשיו"

</div>

```js
function renderOpenStatus() {
  if (!openStatus) return;
  const open = isOpenAt();
  openStatus.textContent = openStatusText();
  openStatus.classList.toggle("is-open", open);
  openStatus.classList.toggle("is-closed", !open);
}
```

<div dir="rtl" align="right">

**`classList.toggle(name, force)` עם פרמטר שני** מוסיף אם `true` ומסיר
אם `false`. שורה אחת במקום `if/else`.

**המחלקה מעצבת, ה-JS רק מחליט.** הצבעים בקובץ ה-CSS. אף פעם לא
`element.style.color = "green"` – זה מפזר את העיצוב לשני מקומות.

### 6. השנה בפוטר

</div>

```js
document.querySelectorAll(".site-footer small").forEach(function (el) {
  el.textContent = el.textContent.replace("2026", new Date().getFullYear());
});
```

<div dir="rtl" align="right">

פרט קטן שאף אחד לא שם לב אליו – עד ה-1 בינואר, כשכל האתר נראה נטוש.

---

## 💻 הקוד המלא של השלב

`js/render.js`:

</div>

```js
// ============================================================
// שלב 24 · DOM – מכאן התפריט נבנה מהקוד, לא נכתב ביד
// ============================================================

// --- בוחרים אלמנטים פעם אחת, בראש הקובץ ---
const menuList   = document.getElementById("menu-list");
const openStatus = document.getElementById("open-status");
const yearSlot   = document.querySelectorAll(".site-footer small");

// אותו קובץ JS נטען בארבעת הדפים, אבל #menu-list קיים רק ב-menu.html.
// בלי הבדיקה הזו נקבל "Cannot set properties of null" בכל דף אחר.

/** מחזיר את ה-HTML של פריט אחד */
function menuItemHTML(item) {
  return '<li class="menu-item" data-cat="' + item.cat + '" data-id="' + item.id + '">'
    + '<div><b>' + item.name + '</b>'
    + '<small class="item-note">' + item.note + '</small></div>'
    + '<span class="price">' + formatPrice(item.price) + '</span>'
    + '</li>';
}

/** מצייר רשימת פריטים לתוך הדף */
function renderMenu(items) {
  if (!menuList) return;

  if (items.length === 0) {
    menuList.innerHTML = '<li class="empty">לא נמצאו פריטים מתאימים.</li>';
    return;
  }

  // בונים מחרוזת אחת ומכניסים פעם אחת.
  // 18 קריאות ל-innerHTML = 18 חישובי פריסה מחדש. אחת = אחד.
  let html = "";
  for (const item of items) {
    html += menuItemHTML(item);
  }
  menuList.innerHTML = html;
}

/** מציג אם אנחנו פתוחים, ובאיזה צבע */
function renderOpenStatus() {
  if (!openStatus) return;
  const open = isOpenAt();
  openStatus.textContent = openStatusText();
  openStatus.classList.toggle("is-open", open);
  openStatus.classList.toggle("is-closed", !open);
}

/** שנה נוכחית בפוטר – כדי שאף אחד לא ישכח לעדכן ב-1 בינואר */
function renderYear() {
  yearSlot.forEach(function (el) {
    el.textContent = el.textContent.replace("2026", new Date().getFullYear());
  });
}

renderMenu(MENU);
renderOpenStatus();
renderYear();

// --- יצירת אלמנט "בדרך הארוכה" – בטוחה יותר לתוכן ממשתמש ---
// innerHTML מפרש תגיות. textContent לא. עם קלט של משתמש – תמיד textContent.
function makeNote(text) {
  const p = document.createElement("p");
  p.className = "muted";
  p.textContent = text;        // גם אם text מכיל <script>, הוא יוצג כטקסט
  return p;
}
console.log(makeNote("<b>לא יודגש</b>").outerHTML);
```

<div dir="rtl" align="right">

## 👀 מה רואים במסך

**דף התפריט נראה בדיוק כמו קודם.**

וזה כל העניין – **אבל ה-HTML ריק**. פתחו `menu.html` בעורך: אין שם
אף פריט. פתחו את DevTools ← Elements: כולם שם.

**נסו עכשיו בקונסולה:**

</div>

```js
renderMenu(MENU.filter(i => i.cat === "hot"));    // רק קפה חם
renderMenu([]);                                    // "לא נמצאו פריטים"
renderMenu(MENU);                                  // הכול חזרה
```

<div dir="rtl" align="right">

**זה הרגע שבו התלמידים מבינים למה עברנו דרך המערכים והאובייקטים.**

בדף הבית: שורת "פתוח עכשיו" בירוק או "סגור כרגע" באדום, לפי השעה האמיתית.

---

## ✋ אתגר לכיתה

1. הוסיפו לכל כרטיס את שם הקטגוריה בעברית (רמז: `CATEGORIES`).
2. הציגו את הפריטים ממוין מהזול ליקר, בלי לשנות את `MENU`.
3. הוסיפו ב-`index.html` "המנה של היום" – פריט אקראי.
4. **בדיקה:** הריצו בקונסולה והסבירו:

</div>

```js
document.getElementById("open-status").innerHTML = "<b>פתוח</b>";
document.getElementById("open-status").textContent = "<b>פתוח</b>";
```

</div>

<details dir="rtl">
<summary><b>💡 הצגת הפתרון</b></summary>

<div dir="rtl" align="right">

**1.** בתוך `menuItemHTML`, מוסיפים:

`+ '<span class="cat-label">' + CATEGORIES[item.cat] + '</span>'`

**2.** ממיינים **עותק**, אחרת `MENU` עצמו יימחק סדר:

`renderMenu([...MENU].sort((a, b) => a.price - b.price));`

**3.**

`const daily = MENU[Math.floor(Math.random() * MENU.length)];`
`const slot = document.getElementById("daily-special");`
`if (slot) slot.textContent = daily.name + " – " + formatPrice(daily.price);`

(צריך להוסיף `<p id="daily-special"></p>` ל-`index.html`.)

**4.**
- **`innerHTML`** – מציג **פתוח** במודגש. התגית פורשה.
- **`textContent`** – מציג את התווים `<b>פתוח</b>` כטקסט.

**עכשיו דמיינו שבמקום `<b>` היה `<script>` שנשלח משדה טופס.** זו
בדיוק ההחלטה שמפרידה בין אתר בטוח לפרוץ.

</div>
</details>

<div dir="rtl" align="right">
<div dir="rtl" align="right">

---

## 🔍 טעויות שראינו בכיתה

| הטעות | מה קורה |
|--------|----------|
| שכחת `if (!el) return` | `TypeError` בכל דף שאין בו את האלמנט |
| `<script>` בלי `defer` | האלמנט עוד לא קיים כשהקוד רץ |
| `innerHTML +=` בלולאה | איטי, ומוחק מאזינים |
| `innerHTML` לקלט משתמש | XSS |
| `element.style.color` במקום `classList` | העיצוב מתפזר בין CSS ל-JS |
| `getElementById("#menu-list")` | בלי `#`. הסולמית היא רק ב-`querySelector` |
| חיפוש אלמנט בתוך פונקציה שרצה תמיד | עבודה מיותרת |

</div>

<div dir="rtl" align="right">

---

## ⏭️ בשלב הבא

**[שלב 25 – סינון, חיפוש והזמנה](../step-25-js-events/)**

[🗺️ חזרה למפת הפרויקט](../../)

</div>

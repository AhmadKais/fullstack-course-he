<div dir="rtl" align="right">

# 🏗️ שלב 25 – סינון, חיפוש והזמנה

> **הפרויקט המתמשך של הכיתה: קפה עתיד**
> נלמד ב־[JS · מודול 9 – אירועים](../../../03-javascript/09-events/) · [⏮️ שלב 24](../step-24-js-dom/) · [🗺️ מפת הפרויקט](../../)

---

## 🎯 מה מוסיפים היום

- מוסיפים ל-`menu.html` **כפתורי סינון**, **שדה חיפוש** ו**לוח הזמנה**.
- מוסיפים לכותרת **כפתור המבורגר** שפותח את התפריט בטלפון.
- כותבים **`js/events.js`**: סינון, חיפוש, הוספה להזמנה וניקוי.
- לומדים **Event Delegation** – מאזין אחד על ההורה במקום עשרים על הילדים.

</div>

<div dir="rtl" align="right">

## 🌍 למה זה ככה בעולם האמיתי

### מאזין אירועים – הדפוס שלא משתנה

</div>

```js
element.addEventListener("click", function (event) { ... });
//                          ↑ מה קרה        ↑ מה לעשות
```

<div dir="rtl" align="right">

**האירועים שתשתמשו בהם בפועל:**

| האירוע | מתי |
|---------|------|
| `click` | לחיצה. **גם `Enter` על כפתור ממוקד** |
| `input` | בכל הקלדה בשדה |
| `change` | ביציאה מהשדה / בבחירה ב-select |
| `submit` | על ה-`<form>`, לא על הכפתור |
| `keydown` | לחיצת מקש |

**למה `click` ולא `mousedown`:** `click` מופעל גם כשמשתמש מקלדת לוחץ
`Enter` על כפתור ממוקד. `mousedown` – רק בעכבר. **בחירה ב-`click`
היא בחירה בנגישות.**

### Event Delegation – הרעיון הכי חשוב בשיעור

יש לנו 18 כפתורי "הוספה". הגישה הנאיבית:

</div>

```js
document.querySelectorAll(".add-btn").forEach((btn) => {
  btn.addEventListener("click", ...);
});
```

<div dir="rtl" align="right">

**זה יעבוד בדיוק עד הלחיצה הראשונה על כפתור סינון.**

למה? כי `renderMenu` כותב `innerHTML` מחדש, **האלמנטים הישנים נמחקים
והמאזינים מתים איתם**. הכפתורים החדשים נראים זהים – ולא עושים כלום.

**הפתרון:** מאזינים על ההורה, שלא נמחק לעולם:

</div>

```js
menuList.addEventListener("click", function (event) {
  const btn = event.target.closest(".add-btn");
  if (!btn) return;          // הלחיצה לא הייתה על כפתור
  addToOrder(btn.dataset.id);
});
```

<div dir="rtl" align="right">

**איך זה עובד – בועות (bubbling):** לחיצה על כפתור "מבעבעת" כלפי מעלה
דרך כל ההורים עד `document`. אנחנו תופסים אותה בדרך.

| | מאזין לכל כפתור | Delegation |
|---|------------------|-------------|
| מספר מאזינים | 18 | **1** |
| שורד רינדור מחדש | ❌ | **✅** |
| עובד על פריטים חדשים | ❌ | **✅** |

### `event.target` מול `event.currentTarget`

| | מה זה |
|---|-------|
| `target` | האלמנט ש**נלחץ בפועל** – אולי ה-`<b>` בתוך הכפתור |
| `currentTarget` | האלמנט שעליו **תלוי המאזין** |

**`closest(".add-btn")` פותר את הבעיה:** הוא עולה מה-`target` כלפי מעלה
עד שמוצא אלמנט שמתאים לסלקטור. אם נלחץ טקסט בתוך הכפתור – עדיין נמצא
את הכפתור.

### מצב ARIA חייב להתעדכן איתנו

</div>

```js
btn.setAttribute("aria-pressed", "true");
navToggle.setAttribute("aria-expanded", String(isOpen));
```

<div dir="rtl" align="right">

כפתור שנראה "לחוץ" רק בגלל צבע רקע – **שקוף לקורא מסך**. `aria-pressed`
הוא מה שגורם לו להכריז *"קפה חם, כפתור, נבחר"*.

ובונוס: ה-CSS שלנו כבר מעצב לפי `[aria-pressed="true"]`. **מקור אמת אחד,
משרת גם עיצוב וגם נגישות.**

</div>
<div dir="rtl" align="right">

---

## 🔨 שלב אחר שלב

### 1. ה-HTML החדש ב-`menu.html`

</div>

```html
<div class="filters" role="group" aria-label="סינון לפי קטגוריה">
  <button class="filter" data-cat="all" aria-pressed="true">הכול</button>
  <button class="filter" data-cat="hot" aria-pressed="false">קפה חם</button>
  ...
</div>

<label class="search">חיפוש בתפריט:
  <input type="search" id="menu-search" placeholder="למשל: הפוך">
</label>

<ul id="menu-list" class="menu-grid"></ul>

<aside class="order-panel" aria-label="ההזמנה שלי">
  <h2>ההזמנה שלי</h2>
  <ul id="order-items"></ul>
  <p class="order-total">סה&quot;כ: <b id="order-total">0&#8362;</b></p>
  <button id="order-clear" type="button">ניקוי ההזמנה</button>
</aside>
```

<div dir="rtl" align="right">

ובכותרת של כל דף:

</div>

```html
<button class="nav-toggle" aria-expanded="false"
        aria-controls="main-nav" aria-label="פתיחת תפריט">☰</button>
```

<div dir="rtl" align="right">

### 2. שני משתני מצב

</div>

```js
let activeCat = "all";
let searchTerm = "";

function visibleItems() {
  return MENU.filter(function (item) {
    const catOk = activeCat === "all" || item.cat === activeCat;
    return catOk && matchesSearch(item, searchTerm);
  });
}

function refresh() {
  renderMenu(visibleItems());
}
```

<div dir="rtl" align="right">

**זה הדפוס המרכזי של כל ממשק מודרני:**

> **מצב → פונקציה שמחשבת מה להציג → ציור.**

כפתור סינון לא "מסתיר `<li>`-ים". הוא **משנה משתנה** וקורא ל-`refresh()`.
לכן סינון וחיפוש **עובדים יחד אוטומטית** – שניהם רק משנים מצב.

אילו כל כפתור היה מסתיר אלמנטים בעצמו, שילוב של סינון + חיפוש היה
דורש קוד מיוחד לכל צירוף.

### 3. הסינון

</div>

```js
filterBar.addEventListener("click", function (event) {
  const btn = event.target.closest(".filter");
  if (!btn) return;

  activeCat = btn.dataset.cat;

  filterBar.querySelectorAll(".filter").forEach(function (b) {
    b.setAttribute("aria-pressed", String(b === btn));
  });

  refresh();
});
```

<div dir="rtl" align="right">

**`String(b === btn)`** – השוואה שמחזירה `true` רק לכפתור שנלחץ,
ומאפסת את כל השאר. שורה אחת במקום לולאה שמנקה ואז לולאה שמסמנת.

### 4. חיפוש חי

</div>

```js
searchInput.addEventListener("input", function (event) {
  searchTerm = event.target.value;
  refresh();
});
```

<div dir="rtl" align="right">

**`input` ולא `change`:** `input` מופעל בכל תו. `change` רק ביציאה מהשדה.
לחיפוש חי רוצים `input`.

> 💡 **בפרויקט אמיתי** שמחפש בשרת, היו מוסיפים כאן **debounce** –
> המתנה של 300ms אחרי ההקלדה האחרונה. אצלנו החיפוש מקומי ומיידי,
> אז לא צריך.

### 5. הוספה להזמנה

</div>

```js
const existing = order.find(function (line) { return line.id === item.id; });
if (existing) {
  existing.qty++;
} else {
  order.push({ id: item.id, name: item.name, price: item.price, qty: 1 });
}
```

<div dir="rtl" align="right">

**שימו לב שיצרנו אובייקט חדש** ולא דחפנו את `item` עצמו. אילו היינו
כותבים `order.push(item)` ואז `item.qty++`, היינו **משנים את התפריט עצמו** –
בדיוק הבאג מ[שלב 22](../step-22-js-objects/).

### 6. `Esc` סוגר את התפריט

</div>

```js
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && mainNav.classList.contains("is-open")) {
    mainNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.focus();
  }
});
```

<div dir="rtl" align="right">

**`navToggle.focus()` בסוף** – מחזירים את הפוקוס לכפתור שפתח.
בלי זה, משתמש מקלדת נשאר "תלוי באוויר" אחרי הסגירה.

---

## 💻 הקוד המלא של השלב

`js/events.js`:

</div>

```js
// ============================================================
// שלב 25 · אירועים – האתר מגיב
// ============================================================

const filterBar   = document.querySelector(".filters");
const searchInput = document.getElementById("menu-search");
const navToggle   = document.querySelector(".nav-toggle");
const mainNav     = document.getElementById("main-nav");
const orderItems  = document.getElementById("order-items");
const orderTotalEl = document.getElementById("order-total");
const orderClear  = document.getElementById("order-clear");

let activeCat = "all";
let searchTerm = "";

/** מחזיר את הפריטים שעוברים גם את הקטגוריה וגם את החיפוש */
function visibleItems() {
  return MENU.filter(function (item) {
    const catOk = activeCat === "all" || item.cat === activeCat;
    return catOk && matchesSearch(item, searchTerm);
  });
}

function refresh() {
  renderMenu(visibleItems());
}

// ---------- סינון לפי קטגוריה ----------
// מאזין אחד על ההורה במקום חמישה על הכפתורים. זה נקרא Event Delegation.
if (filterBar) {
  filterBar.addEventListener("click", function (event) {
    const btn = event.target.closest(".filter");
    if (!btn) return;                      // נלחץ הרווח בין הכפתורים

    activeCat = btn.dataset.cat;

    filterBar.querySelectorAll(".filter").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b === btn));
    });

    refresh();
  });
}

// ---------- חיפוש ----------
if (searchInput) {
  searchInput.addEventListener("input", function (event) {
    searchTerm = event.target.value;
    refresh();
  });
}

// ---------- תפריט מובייל ----------
if (navToggle && mainNav) {
  navToggle.addEventListener("click", function () {
    const isOpen = mainNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "סגירת תפריט" : "פתיחת תפריט");
  });
}

// ---------- הוספה להזמנה ----------
// גם כאן delegation: הכפתורים נוצרים מחדש בכל סינון,
// אז מאזין שהוצמד אליהם ישירות היה נעלם.
if (menuList) {
  menuList.addEventListener("click", function (event) {
    const btn = event.target.closest(".add-btn");
    if (!btn) return;

    const item = MENU.find(function (m) { return m.id === btn.dataset.id; });
    if (!item) return;

    const existing = order.find(function (line) { return line.id === item.id; });
    if (existing) {
      existing.qty++;
    } else {
      order.push({ id: item.id, name: item.name, price: item.price, qty: 1 });
    }
    renderOrder();
  });
}

function renderOrder() {
  if (!orderItems) return;

  let html = "";
  for (const line of order) {
    html += '<li><span>' + line.name + ' × ' + line.qty + '</span>'
          + '<span class="price">' + formatPrice(line.price * line.qty) + '</span></li>';
  }
  orderItems.innerHTML = html;

  orderTotal = order.reduce(function (sum, line) {
    return sum + line.price * line.qty;
  }, 0);

  orderTotalEl.textContent = formatPrice(orderTotal);
}

if (orderClear) {
  orderClear.addEventListener("click", function () {
    order = [];
    renderOrder();
  });
}

// ---------- מקלדת ----------
// Esc סוגר את תפריט המובייל. משתמשים מצפים לזה.
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && mainNav && mainNav.classList.contains("is-open")) {
    mainNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.focus();
  }
});
```

<div dir="rtl" align="right">

## 👀 מה רואים במסך

**עכשיו האתר מגיב:**

- **לחיצה על "מאפים"** – התפריט מצטמצם לארבעה פריטים, הכפתור נצבע.
- **הקלדה של "חלב"** בחיפוש – נשארים רק פריטים שמזכירים חלב.
- **סינון + חיפוש יחד** עובדים כמו שמצפים.
- **"הוספה"** – הפריט נכנס ללוח ההזמנה, לחיצה נוספת מעלה את הכמות,
  והסכום מתעדכן.
- **במסך צר:** כפתור ☰ פותח וסוגר את הניווט. `Esc` סוגר.

**רעננו את הדף – ההזמנה נעלמת.** זה בסדר. [שלב 29](../step-29-js-storage/) יזכור אותה.

---

## ✋ אתגר לכיתה

1. הוסיפו לכל שורה בהזמנה כפתור "הסרה".
2. הציגו על כפתור הסינון כמה פריטים יש בקטגוריה: "מאפים (4)".
3. הוסיפו מיון: "מהזול ליקר" / "מהיקר לזול".
4. **הבאג הקלאסי:** מישהו כתב את זה במקום delegation. למה זה מפסיק
   לעבוד אחרי לחיצה על כפתור סינון?

</div>

```js
document.querySelectorAll(".add-btn").forEach((btn) => {
  btn.addEventListener("click", () => addToOrder(btn.dataset.id));
});
```

</div>

<details dir="rtl">
<summary><b>💡 הצגת הפתרון</b></summary>

<div dir="rtl" align="right">

**1.** ב-`renderOrder`, מוסיפים לכל שורה
`<button class="remove-btn" data-id="' + line.id + '">✕</button>`, ואז
delegation על `orderItems`:

`orderItems.addEventListener("click", (e) => {`
`  const btn = e.target.closest(".remove-btn"); if (!btn) return;`
`  order = order.filter(l => l.id !== btn.dataset.id);`
`  renderOrder();`
`});`

**2.**

`filterBar.querySelectorAll(".filter").forEach(btn => {`
`  const cat = btn.dataset.cat;`
`  const n = cat === "all" ? MENU.length : MENU.filter(i => i.cat === cat).length;`
`  btn.textContent = btn.textContent + " (" + n + ")";`
`});`

(להריץ פעם אחת בטעינה, לא בכל `refresh` – אחרת המספר יצטבר.)

**3.** משתנה מצב שלישי, ומיון בתוך `visibleItems`:

`let sortBy = "none";`
`// בסוף visibleItems:`
`if (sortBy === "asc") return [...result].sort((a, b) => a.price - b.price);`

**שימו לב כמה זה קל** בזכות דפוס ה"מצב → חישוב → ציור". הוספנו מצב שלישי
בלי לגעת בסינון או בחיפוש.

**4.** `renderMenu` מציב `menuList.innerHTML = html`, וזה **מוחק את כל
האלמנטים הקיימים ובונה חדשים**. המאזינים היו קשורים לאלמנטים הישנים,
שכבר לא קיימים.

הכפתורים החדשים נראים זהים לחלוטין – **וזו הסיבה שהבאג הזה כל כך מבלבל.**

delegation פותר את זה כי המאזין יושב על `menuList`, שלא נמחק אף פעם.

</div>
</details>

<div dir="rtl" align="right">
<div dir="rtl" align="right">

---

## 🔍 טעויות שראינו בכיתה

| הטעות | מה קורה |
|--------|----------|
| `addEventListener("click", handler())` | הסוגריים **מריצים** את הפונקציה מיד |
| מאזינים על אלמנטים שנוצרים מחדש | מתים ברינדור הבא |
| `event.target` בלי `closest` | תופס את הטקסט בתוך הכפתור |
| `change` במקום `input` לחיפוש חי | מגיב רק ביציאה מהשדה |
| שכחת `aria-pressed` / `aria-expanded` | הכפתור שקוף לקורא מסך |
| `order.push(item)` בלי עותק | הוספה לעגלה משנה את התפריט |

</div>

<div dir="rtl" align="right">

---

## ⏭️ בשלב הבא

**[שלב 26 – ולידציה אמיתית לטופס](../step-26-js-form-validation/)**

[🗺️ חזרה למפת הפרויקט](../../)

</div>

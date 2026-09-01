<div dir="rtl" align="right">

# 🏗️ שלב 26 – ולידציה אמיתית לטופס

> **הפרויקט המתמשך של הכיתה: קפה עתיד**
> נלמד ב־[JS · מודול 10 – טפסים וולידציה](../../../03-javascript/10-forms-validation/) · [⏮️ שלב 25](../step-25-js-events/) · [🗺️ מפת הפרויקט](../../)

---

## 🎯 מה מוסיפים היום

- כותבים **`js/form.js`** – ולידציה משלנו לטופס ההזמנה, עם הודעות בעברית.
- עוצרים את השליחה ב-`event.preventDefault()`.
- בודקים **ביציאה מהשדה** (`blur`), לא בכל הקלדה.
- מסמנים שדות שגויים ב-`aria-invalid` ומחזירים פוקוס לשדה הראשון שנכשל.

</div>

<div dir="rtl" align="right">

## 🌍 למה זה ככה בעולם האמיתי

### מה חסר בוולידציה של הדפדפן

במודול 5 קיבלנו `required` ו-`pattern` בחינם. הבעיות:

| הבעיה | ההשלכה |
|--------|----------|
| ההודעה בשפת **הדפדפן**, לא של הדף | משתמש ישראלי עם Chrome באנגלית רואה אנגלית |
| אי אפשר לעצב את הבועה | היא לא חלק מהדף |
| היא נעלמת אחרי כמה שניות | מי שמסתכל על המקלדת מפספס |
| כלל אחד לכל שדה | "תאריך לא בעבר" לא ניתן לביטוי ב-`pattern` |

**לכן `novalidate` על ה-`<form>`** – מכבים את של הדפדפן ומקבלים שליטה מלאה.
ה-`required` נשאר ב-HTML: הוא עדיין מספר לקורא מסך שהשדה חובה.

### `preventDefault` – למה בלעדיו כלום לא עובד

</div>

```js
form.addEventListener("submit", function (event) {
  event.preventDefault();
  ...
});
```

<div dir="rtl" align="right">

ברירת המחדל של `submit` היא **לשלוח את הטופס ולטעון דף חדש**. בלי
לעצור אותה, הקוד שלנו ירוץ ואז הדף ייעלם לפני שמישהו יראה משהו.

**ומאזינים על ה-`<form>`, לא על הכפתור.** `submit` נורה גם בלחיצת `Enter`
בתוך שדה טקסט – התנהגות שמשתמשים מסתמכים עליה.

### מתי בודקים – שאלה של יחס למשתמש

| מתי | התחושה |
|------|----------|
| כל הקלדה (`input`) | ❌ אדום אחרי האות הראשונה בשם. עוין |
| **יציאה מהשדה (`blur`)** | ✅ "סיימת למלא? בוא נבדוק" |
| רק בשליחה | ⚠️ מגלים חמש שגיאות בבת אחת |

**האסטרטגיה שאנחנו מיישמים:**
1. בדיקה ב-`blur`.
2. **אחרי** שהשדה נכשל – בדיקה גם ב-`input`, כדי שהמשתמש **יראה
   שהוא מתקן** ולא יישאר עם אדום עד השליחה.

זה הדפוס שכל טופס טוב באינטרנט משתמש בו.

### להחזיר את הפוקוס – לא פינוק

</div>

```js
document.getElementById(firstBad).focus();
```

<div dir="rtl" align="right">

בטופס ארוך, השדה השגוי יכול להיות **מחוץ למסך**. המשתמש רואה
"יש שדות לתקן" ולא מבין איפה.

`.focus()` גם גולל אליו, גם ממקם את הסמן, וגם – זה החלק החשוב –
**מכריז אותו לקורא מסך**.

### `aria-invalid` – מה שהצבע האדום לא אומר

</div>

```js
input.setAttribute("aria-invalid", String(!ok));
```

<div dir="rtl" align="right">

מסגרת אדומה אומרת "שגיאה" **רק למי שרואה צבעים**. `aria-invalid="true"`
גורם לקורא מסך להכריז *"שגוי"* על השדה.

וה-CSS שלנו מעצב לפי `input[aria-invalid="true"]` – **שוב, מקור אחד
שמשרת גם עיצוב וגם נגישות.**

### `role="alert"` – למה ההודעה נשמעת

</div>

```html
<p class="error" id="err-phone" role="alert"></p>
```

<div dir="rtl" align="right">

`role="alert"` הופך את האזור ל**חי**: ברגע שנכנס אליו טקסט, קורא המסך
מכריז אותו **מיד**, גם אם המשתמש נמצא במקום אחר בדף.

**ושימו לב ל-CSS:** נתנו ל-`.error` גובה מינימלי `1.2em`. בלי זה,
הופעת הודעה **דוחפת את כל הטופס למטה** והמשתמש מאבד את המקום.

### והתזכורת שחוזרת בכל שיעור

> כל הקובץ הזה הוא **נוחות למשתמש**. מי שפותח DevTools יכול למחוק אותו
> ולשלוח מה שירצה. **הבדיקה האמיתית היא בשרת. תמיד.**

</div>
<div dir="rtl" align="right">

---

## 🔨 שלב אחר שלב

### 1. טבלת כללים במקום ערמת `if`

</div>

```js
const RULES = {
  fullname: {
    test: function (v) { return v.trim().length >= 2; },
    message: "צריך שם מלא – לפחות שתי אותיות.",
  },
  phone: {
    test: function (v) { return /^0\d{1,2}-?\d{7}$/.test(v.trim()); },
    message: "מספר טלפון ישראלי, למשל 052-1234567.",
  },
  ...
};
```

<div dir="rtl" align="right">

**כל כלל הוא אובייקט עם בדיקה והודעה.** להוסיף שדה = להוסיף שורה
לאובייקט, בלי לגעת בשום לוגיקה. **אותו רעיון של טבלת הנתונים
מ[שלב 20](../step-20-js-functions/).**

**וה-`email` מעניין:**

</div>

```js
test: function (v) { return v.trim() === "" || v.includes("@"); }
```

<div dir="rtl" align="right">

ריק = תקין, כי השדה **לא חובה**. כלל שמכשיל שדה ריק אופציונלי הוא באג נפוץ.

### 2. פונקציה אחת שבודקת שדה

</div>

```js
function validateField(name) {
  const input = document.getElementById(name);
  const slot  = document.getElementById("err-" + name);
  const rule  = RULES[name];
  if (!input || !rule) return true;

  const ok = rule.test(input.value);

  if (slot) slot.textContent = ok ? "" : rule.message;
  input.setAttribute("aria-invalid", String(!ok));

  return ok;
}
```

<div dir="rtl" align="right">

**היא עושה שני דברים ומחזירה תשובה:** מציגה/מנקה הודעה, ומדווחת אם תקין.
כך אפשר להשתמש בה גם ב-`blur` וגם בשליחה.

**`slot.textContent` ולא `innerHTML`** – ההודעות שלנו, אבל זה הרגל נכון.

### 3. חיווט המאזינים

</div>

```js
Object.keys(RULES).forEach(function (name) {
  const input = document.getElementById(name);
  if (!input) return;

  input.addEventListener("blur", function () { validateField(name); });

  input.addEventListener("input", function () {
    if (input.getAttribute("aria-invalid") === "true") validateField(name);
  });
});
```

<div dir="rtl" align="right">

### 4. השליחה

</div>

```js
form.addEventListener("submit", function (event) {
  event.preventDefault();

  let firstBad = null;
  Object.keys(RULES).forEach(function (name) {
    if (!validateField(name) && !firstBad) firstBad = name;
  });
  ...
  if (firstBad) {
    status.textContent = "יש שדות שצריך לתקן.";
    status.className = "fail";
    document.getElementById(firstBad).focus();
    return;
  }

  status.textContent = "ההזמנה נשלחה. נשלח אישור ב-SMS תוך כמה דקות.";
  status.className = "ok";
  form.reset();
});
```

<div dir="rtl" align="right">

**בודקים את כל השדות ולא עוצרים בראשון** – המשתמש רואה את כל השגיאות
בבת אחת ומתקן פעם אחת. אבל **הפוקוס** קופץ לראשון.

**`form.reset()` בהצלחה**, ואז מנקים גם את הודעות השגיאה – `reset` מנקה
שדות, לא טקסטים שאנחנו כתבנו.

### 5. הביטוי הרגולרי

</div>

```text
/^0\d{1,2}-?\d{7}$/
 │ │  │     │  │    └ סוף המחרוזת
 │ │  │     │  └ בדיוק 7 ספרות
 │ │  │     └ מקף אופציונלי
 │ │  └ ספרה, פעם או פעמיים (קידומת)
 │ └ מתחיל ב-0
 └ תחילת המחרוזת
```

<div dir="rtl" align="right">

**`^` ו-`$` הם קריטיים.** בלעדיהם, `"אבג0521234567xyz"` יעבור –
הביטוי רק צריך למצוא **התאמה כלשהי** בתוך המחרוזת.

---

## 💻 הקוד המלא של השלב

`js/form.js`:

</div>

```js
// ============================================================
// שלב 26 · ולידציה משלנו – הודעות בעברית, בזמן אמת
// ============================================================

const form = document.getElementById("reserve-form");

// כלל אחד לכל שדה: איך בודקים, ומה אומרים כשזה נכשל
const RULES = {
  fullname: {
    test: function (v) { return v.trim().length >= 2; },
    message: "צריך שם מלא – לפחות שתי אותיות.",
  },
  phone: {
    test: function (v) { return /^0\d{1,2}-?\d{7}$/.test(v.trim()); },
    message: "מספר טלפון ישראלי, למשל 052-1234567.",
  },
  email: {
    test: function (v) { return v.trim() === "" || v.includes("@"); },
    message: "כתובת דוא\"ל לא נראית תקינה.",
  },
  date: {
    test: function (v) { return v !== "" && new Date(v) >= new Date(new Date().toDateString()); },
    message: "אי אפשר להזמין שולחן לתאריך שעבר.",
  },
};

/** בודק שדה אחד, מציג/מנקה הודעה, ומחזיר אם הוא תקין */
function validateField(name) {
  const input = document.getElementById(name);
  const slot  = document.getElementById("err-" + name);
  const rule  = RULES[name];
  if (!input || !rule) return true;

  const ok = rule.test(input.value);

  if (slot) slot.textContent = ok ? "" : rule.message;
  input.setAttribute("aria-invalid", String(!ok));

  return ok;
}

if (form) {
  // בודקים ביציאה מהשדה, לא בכל הקלדה.
  // שגיאה אדומה אחרי האות הראשונה בשם היא עוינת למשתמש.
  Object.keys(RULES).forEach(function (name) {
    const input = document.getElementById(name);
    if (!input) return;

    input.addEventListener("blur", function () { validateField(name); });

    // אחרי שכבר נכשל – מתקנים בזמן אמת, כדי שיראה שהוא מצליח
    input.addEventListener("input", function () {
      if (input.getAttribute("aria-invalid") === "true") validateField(name);
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();          // עוצרים את שליחת ברירת המחדל

    let firstBad = null;
    Object.keys(RULES).forEach(function (name) {
      if (!validateField(name) && !firstBad) firstBad = name;
    });

    const terms = document.querySelector('[name="terms"]');
    const termsSlot = document.getElementById("err-terms");
    const termsOk = terms.checked;
    if (termsSlot) termsSlot.textContent = termsOk ? "" : "צריך לאשר את תנאי ההזמנה.";
    if (!termsOk && !firstBad) firstBad = "terms";

    const status = document.getElementById("form-status");

    if (firstBad) {
      status.textContent = "יש שדות שצריך לתקן.";
      status.className = "fail";
      // מחזירים את המשתמש לשדה הראשון שנכשל – אחרת הוא לא ימצא אותו
      document.getElementById(firstBad).focus();
      return;
    }

    status.textContent = "ההזמנה נשלחה. נשלח אישור ב-SMS תוך כמה דקות.";
    status.className = "ok";
    form.reset();
    document.querySelectorAll(".error").forEach(function (el) { el.textContent = ""; });
  });
}

// ⚠️ להזכיר בכיתה: כל הקובץ הזה הוא נוחות למשתמש בלבד.
// מי שפותח DevTools יכול למחוק אותו ולשלוח מה שירצה.
// בדיקה אמיתית חייבת לקרות בשרת. תמיד.
```

<div dir="rtl" align="right">

## 👀 מה רואים במסך

- **לחצו לתוך "שם מלא" וצאו בלי למלא** – מופיעה הודעה אדומה בעברית,
  והשדה מקבל מסגרת אדומה.
- **התחילו להקליד** – ההודעה נעלמת ברגע שהשם תקין.
- **הקלידו `abc` בטלפון וצאו** – "מספר טלפון ישראלי, למשל 052-1234567".
- **בחרו תאריך אתמול** – "אי אפשר להזמין שולחן לתאריך שעבר".
- **שלחו טופס ריק** – כל השגיאות מופיעות יחד, והסמן קופץ לשדה הראשון.
- **מלאו הכול נכון ושלחו** – הודעה ירוקה, והטופס מתנקה.

**ההודעות בעברית, בתוך הדף, ונשארות עד שמתקנים.**

---

## ✋ אתגר לכיתה

1. הוסיפו כלל לשדה "מספר סועדים": בין 1 ל-12.
2. הוסיפו כלל לשעה: רק בין 07:00 ל-20:00, עם הודעה שמסבירה למה.
3. הציגו מונה תווים מתחת ל"הערות": "42/200".
4. **חשיבה:** משתמש פותח DevTools, מוחק את `form.js` ושולח טופס ריק.
   מה יקרה, ומה זה אומר?

</div>
</div>

<details dir="rtl">
<summary><b>💡 הצגת הפתרון</b></summary>

<div dir="rtl" align="right">

**1.** מוסיפים ל-`RULES`. `Number()` כי `input.value` הוא **מחרוזת**:

`guests: { test: (v) => Number(v) >= 1 && Number(v) <= 12, message: "בין 1 ל-12 סועדים. לקבוצות גדולות – התקשרו." }`

**2.**

`time: { test: (v) => v >= "07:00" && v <= "20:00", message: "אנחנו מקבלים הזמנות בין 07:00 ל-20:00." }`

(`input[type=time]` מחזיר `"HH:MM"`, ובפורמט הזה השוואת מחרוזות דווקא עובדת נכון.)

**3.**

`const notes = document.getElementById("notes");`
`notes.addEventListener("input", () => { counter.textContent = notes.value.length + "/200"; });`

**4. הטופס יישלח לשרת ריק לגמרי.**

וזו בדיוק הנקודה: **ולידציה בצד לקוח אינה אבטחה.** היא חוסכת למשתמש
נסיעה לשרת ומשפרת את החוויה – אבל כל מה שהיא בודקת חייב להיבדק
**שוב בשרת**, שם המשתמש לא יכול לגעת.

זה נכון לכל בדיקה: אורך, פורמט, הרשאות, מחירים. **אף פעם לא לסמוך
על מה שהגיע מהדפדפן.**

</div>
</details>

<div dir="rtl" align="right">
<div dir="rtl" align="right">

---

## 🔍 טעויות שראינו בכיתה

| הטעות | מה קורה |
|--------|----------|
| שכחת `preventDefault()` | הדף נטען מחדש, הקוד "לא עובד" |
| מאזין על הכפתור ולא על ה-`<form>` | `Enter` בשדה לא נתפס |
| ולידציה ב-`input` מהתו הראשון | אדום לפני שהמשתמש סיים |
| בלי `focus()` על השדה השגוי | המשתמש לא מוצא אותה |
| בלי `^` ו-`$` בביטוי רגולרי | "אבג052..." עובר |
| `Number()` נשכח על ערך שדה | `"5" > 12` הוא `false`, אבל `"9" > 12` הוא `false` גם – השוואת מחרוזות |
| הסתמכות על ולידציית לקוח כאבטחה | חור אבטחה |

</div>

<div dir="rtl" align="right">

---

## ⏭️ בשלב הבא

**[שלב 27 – פיצול הקוד למודולים](../step-27-js-es6/)**

[🗺️ חזרה למפת הפרויקט](../../)

</div>

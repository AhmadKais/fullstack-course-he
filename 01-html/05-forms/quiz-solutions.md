<div dir="rtl" align="right">

# ✅ פתרונות – שאלות חזרה מודול 5

---

## חלק א׳ – אמריקאיות

| # | תשובה | הסבר |
|---|--------|-------|
| 1 | **ב** | `name` הוא שם השדה בשליחה. `id` משמש לקישור עם `<label>` ולעבודה עם CSS/JS. |
| 2 | **ב** | השדה יוצג ויתפקד, אבל **לא ייכלל בנתונים שנשלחים**. זו טעות מספר 1 בטפסים. |
| 3 | **ב** | `for` של ה-`<label>` חייב להיות זהה ל-`id` של ה-`<input>` – לא ל-`name`. |
| 4 | **ג** | `name` זהה אומר לדפדפן "אלה תשובות לאותה שאלה". ה-`value` חייב להיות **שונה** בכל אחד. |
| 5 | **ג** | ברירת המחדל היא `submit`. שכחה לכתוב `type="button"` גורמת לרענון בלתי צפוי של הדף. |
| 6 | **ב** | ל-`<textarea>` אין `value`. הערך נכתב בין התגיות – ולכן כל רווח שם הופך לתוכן. |
| 7 | **ב** | ב-`get` הנתונים מופיעים בשורת הכתובת ובהיסטוריית הדפדפן. |
| 8 | **ב** | `[0-9]` = ספרה, `{9}` = בדיוק תשע פעמים. |
| 9 | **ב** | אפשר לעקוף ולידציה בצד לקוח בשתי שניות דרך כלי המפתחים. |
| 10 | **ב** | זהו ההבדל המעשי החשוב: `readonly` נשלח, `disabled` לא. |

---

## חלק ב׳ – התאמה

| שאלה | תשובה |
|-------|--------|
| 11 – מספר טלפון | **ב** – `tel` |
| 12 – תאריך לידה | **א** – `date` |
| 13 – בחירת צבע | **ד** – `color` |
| 14 – העלאת קובץ | **ג** – `file` |
| 15 – סרגל עוצמה | **ה** – `range` |

> 💡 למה `tel` ולא `number` לטלפון? כי מספרי טלפון יכולים להתחיל ב-0, יכולים להכיל `+` ו-`-`, ו-`number` היה מוסיף חיצי הגדלה/הקטנה חסרי היגיון.

---

## חלק ג׳ – פתוחות

### 16. למה `<label>` הכרחי

| נימוק | פירוט |
|--------|--------|
| **שטח לחיצה** | לחיצה על התווית ממקדת את השדה. בנייד, זה ההבדל בין שדה שקל למלא לשדה מתסכל – במיוחד בתיבות סימון קטנות. |
| **קוראי מסך** | כשהמשתמש מגיע לשדה, קורא המסך מקריא את התווית המקושרת. בלעדיה הוא מכריז "שדה טקסט, ריק" – והמשתמש לא יודע מה למלא. |
| **חובה חוקית** | תקן הנגישות הישראלי (ת"י 5568) מחייב תוויות מקושרות בטפסים. |
| **בהירות** | התווית נשארת גלויה תמיד. |

**למה `placeholder` אינו תחליף:**

1. **הוא נעלם ברגע שמתחילים להקליד.** משתמש שהוסח לרגע לא זוכר מה השדה מבקש.
2. **ניגודיות נמוכה.** הטקסט האפור לרוב אינו עומד בתקן הניגודיות, ומשתמשים עם לקות ראייה מתקשים לקרוא אותו.
3. **קוראי מסך מסוימים מתעלמים ממנו** או מקריאים אותו בצורה לא עקבית.
4. **הוא נראה כמו ערך שכבר מולא**, ומשתמשים לפעמים מדלגים על השדה.

**המסקנה:** `placeholder` הוא **דוגמה או רמז נוסף**, לא תווית.

</div>

```html
<!-- ✅ הדרך הנכונה: גם label וגם placeholder -->
<label for="email">כתובת אימייל</label>
<input type="email" id="email" name="email" placeholder="you@example.com">
```

<div dir="rtl" align="right">

---

### 17. `checkbox` מול `radio`

| | Checkbox | Radio |
|---|----------|--------|
| בחירות | אפס, אחת או כמה | בדיוק אחת מהקבוצה |
| `name` | יכול לחזור (נשלח כמערך) | **חייב** לחזור בכל הקבוצה |
| ביטול בחירה | ✅ אפשר | ❌ אפשר רק לבחור אחר |
| שאלה טיפוסית | "מה מעניין אותך?" (רבים) | "מה המצב המשפחתי שלך?" (יחיד) |

**דוגמה ל-checkbox** – תוספות לפיצה. אפשר בלי כלום, אפשר שלוש:

</div>

```html
<input type="checkbox" id="olives" name="toppings" value="olives">
<label for="olives">זיתים</label>

<input type="checkbox" id="mushroom" name="toppings" value="mushroom">
<label for="mushroom">פטריות</label>
```

<div dir="rtl" align="right">

**דוגמה ל-radio** – גודל הפיצה. אי אפשר להזמין פיצה שהיא גם אישית וגם ענקית:

</div>

```html
<input type="radio" id="small" name="size" value="small">
<label for="small">אישית</label>

<input type="radio" id="large" name="size" value="large">
<label for="large">ענקית</label>
```

<div dir="rtl" align="right">

**כלל אצבע:** אם התשובות **סותרות זו את זו** – רדיו. אם הן **יכולות להתקיים יחד** – צ׳קבוקס.

---

### 18. תיקון הקוד

**השגיאות:**

1. **`for="mail"` לא תואם ל-`id="email"`** – התווית אינה מקושרת לשדה.
2. **חסר `name` בשדה האימייל** – השדה לא יישלח.
3. **`type="text"` במקום `type="email"`** – אין ולידציה ואין מקלדת מותאמת.
4. **לכפתורי הרדיו יש `name` שונה** (`answer-yes` / `answer-no`) – אפשר לסמן את שניהם.

**בונוס:** ל-`<button>` אין `type`, אבל כאן זה בסדר כי אנחנו אכן רוצים `submit`.

**הגרסה המתוקנת:**

</div>

```html
<form action="" method="post">
  <label for="email">אימייל</label>
  <input type="email" id="email" name="email" required>

  <fieldset>
    <legend>האם ברצונך לקבל עדכונים?</legend>

    <input type="radio" id="yes" name="answer" value="yes">
    <label for="yes">כן</label>

    <input type="radio" id="no" name="answer" value="no">
    <label for="no">לא</label>
  </fieldset>

  <button type="submit">שלח</button>
</form>
```

<div dir="rtl" align="right">

---

### 19. שדה תעודת זהות

</div>

```html
<label for="idnum">תעודת זהות</label>
<input type="text"
       id="idnum"
       name="idNumber"
       pattern="[0-9]{9}"
       title="יש להזין בדיוק 9 ספרות, ללא רווחים או מקפים"
       inputmode="numeric"
       maxlength="9"
       dir="ltr"
       required
       placeholder="123456789">
```

<div dir="rtl" align="right">

**הסבר לכל תכונה:**

| תכונה | למה |
|--------|------|
| `type="text"` | ולא `number`! ת״ז יכולה להתחיל ב-0, ו-`number` היה מוחק אותו ומוסיף חיצי הגדלה מיותרים. |
| `id="idnum"` | לקישור עם ה-`<label>`. |
| `name="idNumber"` | השם שנשלח לשרת. בלעדיו השדה לא נשלח. |
| `pattern="[0-9]{9}"` | בדיוק 9 ספרות. `[0-9]` = ספרה, `{9}` = תשע פעמים. |
| `title="..."` | **התכונה שהכי שוכחים.** זו הודעת השגיאה שהדפדפן מציג כשה-`pattern` נכשל. בלעדיה ההודעה סתומה ("Please match the requested format"). |
| `inputmode="numeric"` | פותח מקלדת מספרים בנייד, בלי לשנות את סוג השדה. |
| `maxlength="9"` | מונע הקלדה של יותר מ-9 תווים מלכתחילה. |
| `dir="ltr"` | מספרים מוצגים משמאל לימין גם בדף RTL. |
| `required` | שדה חובה. |
| `placeholder` | דוגמה לפורמט הצפוי. |

> 💡 שימו לב: `pattern` בודק רק את **הפורמט**, לא את **תקינות ספרת הביקורת** של תעודת הזהות. חישוב זה דורש JavaScript – ונלמד אותו במודול JS 10.

---

### 20. טופס הזמנת שולחן

</div>

```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>הזמנת שולחן</title>
</head>
<body>

  <h1>הזמנת שולחן</h1>

  <form action="" method="post">

    <fieldset>
      <legend>פרטי המזמין</legend>

      <label for="name">שם מלא</label>
      <input type="text" id="name" name="name"
             autocomplete="name" required>

      <label for="phone">טלפון</label>
      <input type="tel" id="phone" name="phone"
             pattern="0[0-9]{8,9}"
             title="מספר טלפון ישראלי: 9 או 10 ספרות שמתחילות ב-0"
             dir="ltr" required>
    </fieldset>

    <fieldset>
      <legend>פרטי ההזמנה</legend>

      <label for="date">תאריך</label>
      <input type="date" id="date" name="date"
             min="2026-01-01" required>

      <label for="time">שעה</label>
      <input type="time" id="time" name="time"
             min="12:00" max="23:00" required>

      <label for="guests">מספר סועדים</label>
      <input type="number" id="guests" name="guests"
             min="1" max="12" step="1" value="2" required>
    </fieldset>

    <fieldset>
      <legend>אזור ישיבה</legend>

      <input type="radio" id="inside" name="seating" value="inside" required checked>
      <label for="inside">בפנים</label>

      <input type="radio" id="outside" name="seating" value="outside">
      <label for="outside">בחוץ</label>
    </fieldset>

    <label for="notes">הערות (אלרגיות, אירוע מיוחד וכו׳)</label>
    <textarea id="notes" name="notes" rows="3" maxlength="300"></textarea>

    <button type="submit">אישור ההזמנה</button>
    <button type="reset">איפוס</button>

  </form>

</body>
</html>
```

<div dir="rtl" align="right">

**מחוון ניקוד:**

| רכיב | נקודות |
|-------|--------|
| `<form>` עם `method="post"` | 1 |
| כל שדה עם `name`, `id` ו-`<label for>` תואם | 3 |
| `type` נכון לכל שדה (`tel`, `date`, `time`, `number`) | 3 |
| `min`/`max` על מספר הסועדים ועל השעה | 2 |
| קבוצת רדיו עם `name` זהה ו-`value` שונה | 2 |
| שימוש ב-`<fieldset>` + `<legend>` | 2 |
| `required` בשדות החובה | 1 |
| כפתור `submit` תקין | 1 |

</div>

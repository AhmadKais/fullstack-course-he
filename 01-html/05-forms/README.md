<div dir="rtl" align="right">

# מודול 5 – טפסים

[⬅ הקודם](../04-links-images/) | [תוכן העניינים](../../README.md) | [הבא: HTML סמנטי ➡](../06-semantic/)

---

## 🎯 מטרות המודול

1. לבנות טופס תקין עם `<form>`.
2. להכיר את כל סוגי שדות הקלט.
3. לקשר תווית (`<label>`) לשדה – ולהבין למה זה קריטי.
4. להשתמש בוולידציה מובנית של הדפדפן.
5. לארגן טופס גדול בעזרת `<fieldset>`.

---

## 1. תגית `<form>`

</div>

```html
<form action="/submit" method="post">
  <!-- כל השדות כאן -->
  <button type="submit">שלח</button>
</form>
```

<div dir="rtl" align="right">

| תכונה | תפקיד |
|--------|--------|
| `action` | לאן נשלחים הנתונים (כתובת בשרת) |
| `method` | `get` – הנתונים בכתובת. `post` – הנתונים בגוף הבקשה |
| `novalidate` | מבטל את הוולידציה המובנית |
| `autocomplete` | `on` / `off` – השלמה אוטומטית |

### `GET` מול `POST`

| | `GET` | `POST` |
|---|-------|---------|
| הנתונים | בכתובת ה-URL, גלויים | בגוף הבקשה, לא נראים |
| שימוש | חיפוש, סינון | הרשמה, סיסמאות, קבצים |
| ניתן לסמן כמועדף | ✅ | ❌ |
| הגבלת אורך | יש | אין בפועל |

> ⚠️ **לעולם אל תשלחו סיסמה ב-`GET`.** היא תופיע בשורת הכתובת ובהיסטוריית הדפדפן.

> 💡 **בקורס הזה אין לנו שרת**, ולכן ה-`action` בדוגמאות ריק או מצביע על דף אחר. במודול JS 10 נלמד לטפל בשליחה עם JavaScript.

---

## 2. שדה קלט – `<input>`

זוהי התגית הכי רב-גונית ב-HTML. התכונה `type` משנה אותה לגמרי.

</div>

```html
<input type="text" name="username" id="username">
```

<div dir="rtl" align="right">

| תכונה | תפקיד | חובה? |
|--------|--------|--------|
| `type` | סוג השדה | ✅ |
| `name` | **שם השדה בשליחה לשרת** | ✅ קריטי! |
| `id` | לקישור עם `<label>` | ✅ מומלץ |
| `value` | ערך התחלתי | |
| `placeholder` | טקסט רמז אפור | |
| `required` | שדה חובה | |
| `disabled` | מנוטרל, לא נשלח | |
| `readonly` | לקריאה בלבד, כן נשלח | |

> ⚠️ **בלי `name` השדה לא נשלח בכלל.** זו טעות מספר 1 בטפסים.

---

## 3. כל סוגי ה-`type`

| `type` | מה מקבלים | הערות |
|--------|------------|--------|
| `text` | טקסט חופשי | ברירת המחדל |
| `password` | טקסט מוסתר | ⚠️ מסתיר ויזואלית בלבד |
| `email` | כתובת מייל | ולידציה + מקלדת מותאמת בנייד |
| `tel` | טלפון | מקלדת מספרים בנייד |
| `url` | כתובת אתר | ולידציה |
| `number` | מספר | `min` `max` `step` |
| `range` | סרגל הזזה | `min` `max` `step` |
| `date` | תאריך | לוח שנה |
| `time` | שעה | |
| `datetime-local` | תאריך + שעה | |
| `month` / `week` | חודש / שבוע | |
| `color` | בורר צבע | |
| `file` | העלאת קובץ | `accept` `multiple` |
| `checkbox` | תיבת סימון | בחירה מרובה |
| `radio` | כפתור בחירה | בחירה יחידה מקבוצה |
| `search` | שדה חיפוש | |
| `hidden` | שדה נסתר | להעברת מזהים |
| `submit` | כפתור שליחה | |
| `reset` | כפתור איפוס | |

---

## 4. `<label>` – התגית הכי חשובה לנגישות

</div>

```html
<!-- ✅ דרך 1: קישור מפורש (מומלץ) -->
<label for="email">כתובת אימייל:</label>
<input type="email" id="email" name="email">

<!-- ✅ דרך 2: עטיפה -->
<label>
  כתובת אימייל:
  <input type="email" name="email">
</label>

<!-- ❌ בלי label -->
<input type="email" placeholder="אימייל">
```

<div dir="rtl" align="right">

**למה `<label>` חשוב?**

1. **לחיצה על התווית ממקדת את השדה** – שטח לחיצה גדול יותר, קריטי בנייד.
2. **קורא מסך מכריז את התווית** כשהמשתמש מגיע לשדה. בלעדיה – "שדה טקסט, ריק".
3. **`placeholder` אינו תחליף!** הוא נעלם ברגע שמתחילים להקליד, והניגודיות שלו נמוכה.

> ⚠️ **הכלל:** `for` של ה-`label` חייב להיות זהה ל-`id` של ה-`input`. לא ל-`name`.

---

## 5. Checkbox ו-Radio

</div>

```html
<!-- Checkbox: אפשר לסמן כמה -->
<fieldset>
  <legend>תחומי עניין</legend>
  <input type="checkbox" id="html" name="interests" value="html">
  <label for="html">HTML</label>

  <input type="checkbox" id="css" name="interests" value="css" checked>
  <label for="css">CSS</label>
</fieldset>

<!-- Radio: רק אחד מהקבוצה -->
<fieldset>
  <legend>רמת ניסיון</legend>
  <input type="radio" id="beginner" name="level" value="beginner" checked>
  <label for="beginner">מתחיל</label>

  <input type="radio" id="advanced" name="level" value="advanced">
  <label for="advanced">מתקדם</label>
</fieldset>
```

<div dir="rtl" align="right">

**הכלל הקריטי ל-Radio:** כל הכפתורים בקבוצה חייבים **אותו `name`** ו**`value` שונה**.
`name` זהה = "אלה אותה שאלה". בלעדיו – אפשר יהיה לסמן את כולם.

| | Checkbox | Radio |
|---|----------|--------|
| בחירות | כמה | אחת בלבד |
| `name` | יכול לחזור (למערך) | **חייב** לחזור |
| ביטול סימון | ✅ | ❌ (רק בחירה אחרת) |

---

## 6. `<select>` – רשימה נפתחת

</div>

```html
<label for="city">עיר:</label>
<select id="city" name="city">
  <option value="">-- בחרו עיר --</option>
  <option value="tlv">תל אביב</option>
  <option value="jlm" selected>ירושלים</option>
  <option value="hfa">חיפה</option>
</select>

<!-- עם קבוצות -->
<select name="course">
  <optgroup label="חזית">
    <option value="html">HTML</option>
    <option value="css">CSS</option>
  </optgroup>
  <optgroup label="עורף">
    <option value="sql">SQL</option>
  </optgroup>
</select>

<!-- בחירה מרובה -->
<select name="skills" multiple size="4">
  <option value="js">JavaScript</option>
  <option value="py">Python</option>
</select>
```

<div dir="rtl" align="right">

---

## 7. `<textarea>` – טקסט מרובה שורות

</div>

```html
<label for="msg">ההודעה שלכם:</label>
<textarea id="msg" name="message" rows="5" cols="40"
          placeholder="כתבו כאן..." maxlength="500"></textarea>
```

<div dir="rtl" align="right">

> ⚠️ ל-`<textarea>` **אין** תכונת `value`. הערך ההתחלתי נכתב **בין** התגיות.
> ⚠️ כל רווח בין `<textarea>` ל-`</textarea>` הופך לתוכן. כתבו אותן צמודות.

---

## 8. כפתורים

</div>

```html
<button type="submit">שלח טופס</button>
<button type="reset">אפס</button>
<button type="button">כפתור רגיל (ל-JavaScript)</button>
```

<div dir="rtl" align="right">

> ⚠️ **ברירת המחדל של `<button>` בתוך `<form>` היא `submit`.**
> אם שכחתם `type="button"`, לחיצה תשלח את הטופס ותרענן את הדף. זו טעות נפוצה מאוד ב-JavaScript.

---

## 9. ולידציה מובנית

הדפדפן בודק בעצמו, בלי שורת JavaScript אחת:

| תכונה | מה בודקת | דוגמה |
|--------|-----------|--------|
| `required` | שהשדה לא ריק | `<input required>` |
| `minlength` / `maxlength` | אורך טקסט | `minlength="8"` |
| `min` / `max` | טווח מספרי או תאריכים | `min="18" max="120"` |
| `step` | קפיצות | `step="0.5"` |
| `pattern` | ביטוי רגולרי | `pattern="[0-9]{9}"` |
| `type="email"` | פורמט מייל | |
| `type="url"` | פורמט כתובת | |

</div>

```html
<label for="id-num">תעודת זהות (9 ספרות):</label>
<input type="text" id="id-num" name="idNumber"
       pattern="[0-9]{9}"
       title="יש להזין בדיוק 9 ספרות"
       required>
```

<div dir="rtl" align="right">

> 💡 התכונה `title` היא ההודעה שהדפדפן מציג כשה-`pattern` נכשל. בלעדיה ההודעה סתומה.

> 🔒 **חשוב מאוד:** ולידציה בצד הלקוח היא **נוחות למשתמש בלבד**, לא אבטחה.
> כל אחד יכול לעקוף אותה. הבדיקה האמיתית חייבת להיעשות בשרת.

---

## 10. `<fieldset>` ו-`<legend>` – ארגון טופס

</div>

```html
<form>
  <fieldset>
    <legend>פרטים אישיים</legend>
    <label for="fname">שם פרטי:</label>
    <input type="text" id="fname" name="firstName">
  </fieldset>

  <fieldset>
    <legend>פרטי משלוח</legend>
    <label for="addr">כתובת:</label>
    <input type="text" id="addr" name="address">
  </fieldset>
</form>
```

<div dir="rtl" align="right">

`<fieldset>` מקבץ שדות קשורים, ו-`<legend>` נותן לקבוצה כותרת. קורא מסך מכריז את ה-`<legend>` לפני כל שדה בקבוצה – חיוני במיוחד לקבוצות `radio`.

---

## 11. תכונות שימושיות נוספות

</div>

```html
<input type="text" name="q" autofocus>            <!-- מיקוד אוטומטי בטעינה -->
<input type="email" name="email" autocomplete="email">  <!-- השלמה חכמה -->
<input type="file" name="cv" accept=".pdf,.doc" multiple>
<input type="number" name="qty" min="1" max="10" step="1" value="1">
<input type="hidden" name="formId" value="contact-2026">
<datalist id="cities">
  <option value="תל אביב">
  <option value="חיפה">
</datalist>
<input type="text" name="city" list="cities">     <!-- הצעות + טקסט חופשי -->
```

<div dir="rtl" align="right">

---

## 📋 סיכום

| תגית | תפקיד |
|-------|--------|
| `<form>` | מיכל הטופס |
| `<input>` | שדה קלט (לפי `type`) |
| `<label for>` | תווית מקושרת – **חובה לנגישות** |
| `<textarea>` | טקסט מרובה שורות |
| `<select>` `<option>` `<optgroup>` | רשימה נפתחת |
| `<button>` | כפתור |
| `<fieldset>` `<legend>` | קיבוץ שדות |
| `<datalist>` | הצעות השלמה |

### ✅ צ׳ק-ליסט לטופס תקין

- [ ] לכל שדה יש `name`
- [ ] לכל שדה יש `id` ו-`<label for>` מתאים
- [ ] `type` מתאים לתוכן (`email`, `tel`, `number`...)
- [ ] `required` בשדות חובה
- [ ] קבוצות `radio` חולקות `name` זהה
- [ ] `<fieldset>` + `<legend>` לקבוצות
- [ ] כפתור שליחה עם `type="submit"`

---

[⬅ הקודם](../04-links-images/) | [תוכן העניינים](../../README.md) | [הבא ➡](../06-semantic/)

</div>

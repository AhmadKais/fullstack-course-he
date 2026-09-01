<div dir="rtl" align="right">

# 🏗️ שלב 05 – טופס הזמנת שולחן

> **הפרויקט המתמשך של הכיתה: קפה עתיד**
> נלמד ב־[HTML · מודול 5 – טפסים](../../../01-html/05-forms/) · [⏮️ שלב 04](../step-04-html-links-images/) · [🗺️ מפת הפרויקט](../../)

---

## 🎯 מה מוסיפים היום

- בונים ב-`contact.html` **טופס הזמנת שולחן** מלא: שם, טלפון, מייל, תאריך, שעה, סועדים, אזור ישיבה, הערות ואישור תנאים.
- מבינים את ההבדל בין **`name`** (מה שנשלח לשרת) ל-**`id`** (מה שמחבר תווית לשדה).
- מקבצים שדות ב-`<fieldset>` + `<legend>`.
- מפעילים **ולידציה מובנית** של הדפדפן – ומבינים למה היא לא אבטחה.

</div>

<div dir="rtl" align="right">

## 🌍 למה זה ככה בעולם האמיתי

כל הזמנת מסעדה שביצעתם באונליין היא הטופס הזה. אותם שדות בדיוק.

### `name` מול `id` – ההבדל שמפיל טפסים

</div>

```html
<label for="phone">טלפון</label>
<input type="tel" id="phone" name="phone">
```

<div dir="rtl" align="right">

| התכונה | מי משתמש בה |
|---------|---------------|
| `id` | ה-`<label>`, ו-CSS/JS. **חי רק בדפדפן** |
| `name` | **השרת.** בלי `name`, השדה פשוט לא נשלח |

שדה בלי `name` נראה תקין לחלוטין על המסך, המשתמש ממלא אותו, לוחץ שליחה –
והמידע נעלם. אין שגיאה, אין אזהרה. פשוט אין נתון.

### למה `<label for>` הוא לא נוי

לחצו על **המילה** "טלפון" בטופס. הסמן קפץ לשדה. זה `for="phone"` שמצביע על `id="phone"`.

זה חשוב לשלושה:
- **מובייל** – שטח הלחיצה גדל פי כמה. אצבע גדולה משמעותית ממלבן של 12 פיקסלים.
- **קורא מסך** – בלי `label`, המשתמש שומע *"שדה טקסט"* ולא יודע מה למלא.
- **מוטוריקה** – מי שמתקשה לכוון עכבר מרוויח מטרה גדולה יותר.

### GET מול POST – למה `method="post"`

| | `GET` | `POST` |
|---|-------|--------|
| הנתונים | בשורת הכתובת | בגוף הבקשה |
| נשמר בהיסטוריה | ✅ | ❌ |
| מתאים ל | **חיפוש** | **שליחת פרטים** |

טופס הזמנה ב-`GET` היה יוצר כתובת כזו:

</div>

```text
/reserve?fullname=נועה+ברק&phone=0521234567&guests=2
```

<div dir="rtl" align="right">

המספר של הלקוחה נכנס להיסטוריית הדפדפן, ללוגים של השרת, ולקישור שהיא עלולה לשתף.
לכן: **מידע אישי נשלח ב-POST.**

### הוולידציה המובנית היא UX, לא אבטחה

`required`, `type="email"`, `pattern` – כל אלה נבדקים **בדפדפן**. מי שפותח DevTools
ומוחק את `required` ישלח טופס ריק תוך שתי שניות.

> **הכלל:** ולידציה בצד לקוח היא **נימוס** – היא חוסכת למשתמש נסיעה לשרת.
> ולידציה בצד שרת היא **אבטחה** – היא היחידה שמגינה עליכם.
> תמיד עושים את שתיהן.

</div>
<div dir="rtl" align="right">

---

## 🔨 שלב אחר שלב

### 1. עוטפים ב-`<form>`

</div>

```html
<form action="/reserve" method="post">
  ...כל השדות...
</form>
```

<div dir="rtl" align="right">

### 2. מקבצים ב-`<fieldset>`

</div>

```html
<fieldset>
  <legend>הפרטים שלכם</legend>
  ...
</fieldset>
```

<div dir="rtl" align="right">

ה-`<legend>` מוקרא לפני כל שדה בקבוצה: *"הפרטים שלכם, שם מלא, שדה טקסט"*.
זה מה שהופך טופס ארוך למובן.

### 3. בוחרים `type` – והמקלדת משתנה

</div>

```html
<input type="tel"    id="phone" name="phone">
<input type="email"  id="email" name="email">
<input type="date"   id="date"  name="date">
<input type="number" id="guests" name="guests" value="2" min="1" max="12">
```

<div dir="rtl" align="right">

**נסו בטלפון:** בשדה `type="tel"` נפתחת מקלדת ספרות. בשדה `type="email"` יש `@`
ליד רווח. בשדה `type="date"` נפתח לוח שנה שלא צריך לכתוב לו קוד.

`type` שגוי = משתמש שמקליד מספר טלפון על מקלדת אותיות. זו הסיבה שאנשים
נוטשים טפסים במובייל.

### 4. רדיו מול צ׳קבוקס – ה-`name` הוא ההבדל

</div>

```html
<input type="radio" name="smoking" value="no" checked> אזור ללא עישון
<input type="radio" name="smoking" value="yes"> אזור מעשנים
```

<div dir="rtl" align="right">

**מה שהופך שני כפתורי רדיו לקבוצה זה ה-`name` הזהה.** אם ה-`name` שונה,
אפשר לבחור את שניהם והמשתמש תקוע – לא ניתן לבטל בחירת רדיו.

בצ׳קבוקס, לעומת זאת, כל תיבה עצמאית.

### 5. ולידציה מובנית

</div>

```html
<input type="text" id="fullname" name="fullname" required minlength="2">
<input type="tel"  id="phone" name="phone" required pattern="0[0-9]{1,2}-?[0-9]{7}">
<input type="checkbox" name="terms" value="yes" required>
```

<div dir="rtl" align="right">

### 6. שני כפתורים – ושים לב ל-`type`

</div>

```html
<button type="submit">שליחת ההזמנה</button>
<button type="reset">ניקוי הטופס</button>
```

<div dir="rtl" align="right">

`<button>` בתוך טופס **בלי `type` הוא submit כברירת מחדל**. כפתור "הצג סיסמה"
בלי `type="button"` ישלח את הטופס. זה באג קלאסי.

---

## 💻 הקוד המלא של השלב

הטופס כולו נמצא ב-**[`contact.html`](contact.html)**. הנה השלד:

</div>

```html
<h2>הזמנת שולחן</h2>
<form action="/reserve" method="post" id="reserve-form">
  <fieldset>
    <legend>הפרטים שלכם</legend>
    <p>
      <label for="fullname">שם מלא</label><br>
      <input type="text" id="fullname" name="fullname" required
             minlength="2" autocomplete="name" placeholder="ישראל ישראלי">
    </p>
    ...
  </fieldset>

  <fieldset>
    <legend>ההזמנה</legend>
    ...תאריך, שעה, סועדים, אזור, עישון, הערות, אישור תנאים...
  </fieldset>

  <p>
    <button type="submit">שליחת ההזמנה</button>
    <button type="reset">ניקוי הטופס</button>
  </p>
</form>
```

<div dir="rtl" align="right">

**`autocomplete="name"` / `"tel"` / `"email"`** – מאפשר לדפדפן למלא אוטומטית.
זה מקצר מילוי טופס במובייל בעשרות שניות, ועולה מילה אחת.

## 👀 מה רואים במסך

- שתי קבוצות שדות בתוך מסגרות, עם כותרת יושבת על קו המסגרת.
- **לחצו "שליחת ההזמנה" בלי למלא כלום** – הדפדפן עוצר, קופץ לשדה הראשון
  ומציג בועה: *"נא למלא שדה זה"*. לא כתבנו לזה שורת JS אחת.
- הקלידו `abc` בשדה הטלפון ושלחו – ה-`pattern` חוסם.
- בטלפון: לחיצה על שדה התאריך פותחת לוח שנה מקורי.

**הודעת השגיאה מופיעה בשפת הדפדפן, לא בשפת הדף.** בשלב 26 נחליף אותה
בהודעות משלנו בעברית.

---

## ✋ אתגר לכיתה

1. הוסיפו שדה **"קוד קופון"** – טקסט, לא חובה, באורך 6 תווים בדיוק.
2. הוסיפו קבוצת **צ׳קבוקסים** "מה מעניין אתכם?" עם שלוש אפשרויות
   (סדנת קפה / ערב הרצאות / אירוע פרטי) שכולן נשלחות תחת אותו שם.
3. **שברו את הטופס בכוונה:** מחקו את `name="phone"`, שלחו, ובדקו בשורת הכתובת
   (החליפו זמנית ל-`method="get"`) – מה חסר?

</div>
</div>

<details dir="rtl">
<summary><b>💡 הצגת הפתרון</b></summary>

<div dir="rtl" align="right">

**1.** `minlength` + `maxlength` שניהם 6, בלי `required`:

**`<label for="coupon">קוד קופון</label>` → `<input type="text" id="coupon" name="coupon" minlength="6" maxlength="6">`**

**2.** צ׳קבוקסים מרובי-בחירה משתמשים ב-`name` זהה עם **סוגריים מרובעים** בהרבה
שרתים (`name="interests[]"`), או פשוט `name="interests"` שנשלח כמה פעמים:

**`<input type="checkbox" name="interests" value="workshop"> סדנת קפה`**
**`<input type="checkbox" name="interests" value="lectures"> ערב הרצאות`**
**`<input type="checkbox" name="interests" value="private"> אירוע פרטי`**

כל תיבה עצמאית – בניגוד לרדיו, כאן `name` זהה **לא** הופך אותן לבחירה יחידה.

**3.** בשורת הכתובת יופיעו `fullname=…&date=…` אבל **`phone` לא יופיע בכלל**.
המשתמש מילא, השדה נראה תקין, והנתון פשוט לא נשלח.

זה בדיוק התרחיש שבו מסעדה מקבלת הזמנה בלי מספר טלפון ולא יכולה לאשר אותה.

</div>
</details>

<div dir="rtl" align="right">
<div dir="rtl" align="right">

---

## 🔍 טעויות שראינו בכיתה

| הטעות | התוצאה |
|--------|---------|
| `<label>` בלי `for` | לחיצה על התווית לא עושה כלום; קורא מסך לא מקשר |
| `for="fullname"` אבל `id="fullName"` | לא מתחבר. רישיות חשובות |
| שני שדות עם אותו `id` | ה-`label` מתחבר לראשון בלבד |
| `placeholder` במקום `label` | הטקסט נעלם ברגע שמתחילים להקליד |
| כפתור בלי `type` בתוך טופס | שולח את הטופס בטעות |

</div>

<div dir="rtl" align="right">

---

## ⏭️ בשלב הבא

**[שלב 06 – מבנה סמנטי ונגישות](../step-06-html-semantic/)**

[🗺️ חזרה למפת הפרויקט](../../)

</div>

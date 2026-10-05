<div dir="rtl" align="right">

# מודול 5 – טפסים

[⬅ הקודם](../04-links-images/) | [חזרה לחלק ה-HTML](../) | [תוכן העניינים](../../README.md) | [הבא: HTML סמנטי ➡](../06-semantic/)

---

## 🎯 מטרות המודול

1. לבנות טופס תקין עם `<form>`.
2. להכיר את כל סוגי שדות הקלט.
3. לקשר תווית (`<label>`) לשדה – ולהבין למה זה קריטי.
4. להשתמש בוולידציה מובנית של הדפדפן.
5. לארגן טופס גדול בעזרת `<fieldset>`.

> 🧭 **מבנה כל נושא:** 📖 הסבר · 🌍 מהעולם האמיתי · 🔨 שלב אחר שלב · 💻 קוד מלא · ✋ תרגול מיידי.
> [לתרגילי הכיתה המלאים](#-תרגילי-הכיתה) · [לשאלות החזרה](quiz.md)
> 🏗️ **הפרויקט המתמשך:** אחרי המודול הזה בונים בכיתה את [שלב 05 – טופס הזמנת שולחן](../../00-class-project/steps/step-05-html-forms/) של אתר קפה עתיד.

> 💡 **למה המודול הזה חשוב במיוחד:** טופס הוא **הנקודה שבה אתר מרוויח כסף**.
> הרשמה, הזמנה, תשלום, יצירת קשר – כולם טפסים. וזה גם המקום שבו נגישות
> לקויה עולה ללקוחות בפועל: משתמש שלא מצליח למלא טופס פשוט עוזב.

---
---

## 1. תגית `<form>`

### 📖 ההסבר

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

### 🌍 מהעולם האמיתי

**אתם רואים את ההבדל בין GET ל-POST כל יום, בשורת הכתובת.**

חפשו משהו בגוגל. תסתכלו בשורת הכתובת:

</div>

```
https://www.google.com/search?q=html+forms&hl=he
```

<div dir="rtl" align="right">

ה-`?q=html+forms` הוא **הטופס שלכם**. שדה בשם `q` עם הערך שהקלדתם.
זה `GET` – והוא הבחירה **הנכונה** כאן, כי:

- אפשר לשמור את הכתובת במועדפים ולחזור לאותה חיפוש
- אפשר לשלוח את הקישור לחבר
- כפתור "אחורה" עובד כמו שצריך

**ועכשיו נסו להתחבר לאתר כלשהו** ותסתכלו בשורת הכתובת. לא תראו שם
את הסיסמה. זה `POST`.

**למה זה כל כך קריטי?** אילו הסיסמה הייתה ב-URL היא הייתה נשמרת ב:

| איפה | הסיכון |
|-------|---------|
| היסטוריית הדפדפן | כל מי שיושב אחריכם למחשב רואה אותה |
| לוגים של השרת | כל מי שיש לו גישה ללוגים |
| כותרת `Referer` | האתר הבא שתבקרו בו מקבל את הכתובת המלאה |
| היסטוריית הראוטר / הפרוקסי | ברשת ארגונית |

> ⚠️ **לעולם אל תשלחו סיסמה, מספר כרטיס אשראי או תעודת זהות ב-`GET`.**

**כלל אצבע פשוט:** אם הפעולה **קוראת** מידע (חיפוש, סינון, מיון) – `GET`.
אם היא **משנה** משהו (הרשמה, קנייה, מחיקה) – `POST`.

> 💡 **בקורס הזה אין לנו שרת**, ולכן ה-`action` בדוגמאות ריק או מצביע
> על דף אחר. במודול JS 10 נלמד לטפל בשליחה עם JavaScript.

### ✋ תרגול מיידי

`GET` או `POST` לכל טופס?

1. חיפוש מוצרים בחנות
2. הרשמה לאתר
3. סינון תוצאות לפי מחיר
4. שליחת טופס יצירת קשר

</div>

<details dir="rtl">
<summary><b>💡 הצגת הפתרון</b></summary>

<div dir="rtl" align="right">

| # | השיטה | למה |
|---|--------|------|
| 1 | `GET` | המשתמש ירצה לשתף/לשמור את החיפוש |
| 2 | `POST` | סיסמה + יוצר משהו חדש בשרת |
| 3 | `GET` | סינון הוא קריאה. "מחיר 100–200" בכתובת = אפשר לשתף |
| 4 | `POST` | שולח נתונים ויוצר פנייה חדשה. גם אם אין סיסמה – זו פעולה שמשנה מצב |

**המקרה שמלמד הכי הרבה הוא 3.** בכל אתר קניות, כשאתם מסמנים מסננים,
הכתובת משתנה: `?category=shoes&price_max=300&sort=cheap`.
אתם יכולים לשלוח את הקישור הזה לחבר, והוא יראה בדיוק את אותן תוצאות.
זה לא במקרה – זו בחירה מודעת ב-`GET`.

</div>
</details>

<div dir="rtl" align="right">

---
---

## 2. שדה קלט – `<input>`

### 📖 ההסבר

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

### 🌍 מהעולם האמיתי

**`name` הוא ה"שם על המעטפה" – בלעדיו השדה פשוט לא קיים לשרת.**

תחשבו על השרת כעל פקיד שמקבל טופס. הוא לא רואה את הדף שלכם, לא רואה
את התוויות, ולא יודע איפה כל שדה יושב על המסך. כל מה שהוא מקבל הוא
רשימה של זוגות:

</div>

```
username = dana
email = dana@example.com
age = 28
```

<div dir="rtl" align="right">

השמות ברשימה הזו הם **ה-`name`-ים**. שדה בלי `name` פשוט לא מופיע ברשימה.
המשתמש ימלא אותו, ילחץ "שלח", לא תהיה שום הודעת שגיאה – והמידע יאבד.

**זו טעות מספר 1 בטפסים, והיא שקטה לחלוטין.**

**ההבחנה בין `name` ל-`id` – שתי מטרות שונות לגמרי:**

| | `name` | `id` |
|---|--------|------|
| **למי הוא** | לשרת | לדפדפן ולדף |
| **למה** | שם השדה בשליחה | לקישור `<label for>` ול-CSS/JS |
| **ייחודי?** | לא בהכרח (radio חולקים אותו) | ✅ חייב להיות ייחודי בדף |

בפועל נותנים לשניהם ערך דומה, וזה מבלבל. אבל הם עושים דברים שונים.

**`disabled` מול `readonly` – הבדל שתופס אנשים:**

</div>

```html
<input name="a" value="123" disabled>   <!-- אפור, לא ניתן למיקוד, ולא נשלח -->
<input name="b" value="123" readonly>   <!-- נראה רגיל, אפשר לסמן ולהעתיק, ונשלח -->
```

<div dir="rtl" align="right">

| המקרה | התכונה |
|--------|---------|
| מספר הזמנה שהמערכת יצרה ואסור לשנות – אבל צריך לשלוח לשרת | `readonly` |
| אפשרות משלוח שלא זמינה כרגע לאזור שנבחר | `disabled` |

**המלכודת:** אנשים משתמשים ב-`disabled` על שדה שהם כן צריכים,
ואז מגלים שהערך לא הגיע לשרת.

### ✋ תרגול מיידי

מה השגיאה בשדה הזה, ומה יקרה בפועל?

</div>

```html
<input type="text" id="email" placeholder="הכניסו אימייל">
```

<details dir="rtl">
<summary><b>💡 הצגת הפתרון</b></summary>

<div dir="rtl" align="right">

**שלוש בעיות:**

| # | הבעיה | התוצאה |
|---|--------|---------|
| 1 | **אין `name`** | המשתמש ימלא, ילחץ שלח, והשדה **לא יישלח**. בשקט. |
| 2 | `type="text"` במקום `email` | אין ולידציה, ובנייד תיפתח מקלדת רגילה במקום מקלדת עם `@` |
| 3 | `placeholder` במקום `<label>` | הטקסט נעלם ברגע שמתחילים להקליד. המשתמש שוכח מה ביקשו. קורא מסך במקרים רבים לא מקריא אותו. |

**המתוקן:**

</div>

```html
<label for="email">כתובת אימייל:</label>
<input type="email" id="email" name="email"
       placeholder="name@example.com" required>
```

<div dir="rtl" align="right">

**שימו לב לשימוש הנכון ב-`placeholder`:** הוא נותן **דוגמה לפורמט**,
לא חוזר על התווית. `<label>` אומר *מה* למלא; `placeholder` מראה *איך*.

</div>
</details>

<div dir="rtl" align="right">

---
---

## 3. כל סוגי ה-`type`

### 📖 ההסבר

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

### 🌍 מהעולם האמיתי

**בחירת `type` נכון היא **החלטת חוויית משתמש**, לא פורמליות.**

הוציאו את הטלפון ונסו למלא טופס באתר כלשהו. שימו לב מה קורה למקלדת
בכל שדה. זה לא קסם – זה ה-`type`:

| ה-`type` | המקלדת שנפתחת בנייד |
|-----------|---------------------|
| `text` | מקלדת רגילה, אותיות |
| `email` | מקלדת עם `@` ו-`.` בשורה הראשית |
| `tel` | **מקלדת חייגן** – ספרות גדולות בלבד |
| `number` | מקלדת ספרות |
| `url` | מקלדת עם `/` ו-`.com` |

**הרווח מוחשי:** משתמש שממלא מספר טלפון על מקלדת אלפבית צריך ללחוץ
"123" כדי לעבור למספרים, ואז לחפש. עם `type="tel"` הוא רואה חייגן.
בטופס עם 8 שדות, ההבדל הזה הוא בין השלמה לנטישה.

**שלושה `type`-ים שכדאי להכיר לעומק:**

**1. `type="date"`** – הדפדפן נותן לוח שנה מובנה. שימו לב:

</div>

```html
<!-- לא מאפשר לבחור תאריך בעבר -->
<input type="date" name="delivery" min="2026-09-01">

<!-- גיל מינימלי 18: תאריך הלידה המאוחר ביותר האפשרי -->
<input type="date" name="birthdate" max="2008-09-01">
```

<div dir="rtl" align="right">

**2. `type="file"`** – עם `accept` מסננים כבר בחלון הבחירה:

</div>

```html
<input type="file" name="cv" accept=".pdf,.doc,.docx">
<input type="file" name="photos" accept="image/*" multiple>
```

<div dir="rtl" align="right">

**3. `type="hidden"`** – שדה שהמשתמש לא רואה, אבל נשלח לשרת:

</div>

```html
<input type="hidden" name="formSource" value="landing-page-facebook">
```

<div dir="rtl" align="right">

כך אתרים יודעים מאיזה קמפיין הגעתם. לא סודי – פשוט לא מעניין את המשתמש.

> ⚠️ **`type="password"` מסתיר ויזואלית בלבד.** הוא **אינו** מצפין כלום.
> הסיסמה נשלחת כטקסט מלא, ורק HTTPS מגן עליה בדרך. מי שפותח F12 ומשנה
> את ה-`type` ל-`text` יראה את התוכן.

### ✋ תרגול מיידי

איזה `type` לכל שדה?

1. גיל המשתמש
2. אתר אישי
3. תאריך לידה
4. דירוג מ-1 עד 10 עם סרגל הזזה
5. העלאת תמונת פרופיל

</div>

<details dir="rtl">
<summary><b>💡 הצגת הפתרון</b></summary>

```html
<input type="number" name="age" min="0" max="120">
<input type="url"    name="website" placeholder="https://example.com">
<input type="date"   name="birthdate" max="2008-09-01">
<input type="range"  name="rating" min="1" max="10" step="1" value="5">
<input type="file"   name="avatar" accept="image/*">
```

<div dir="rtl" align="right">

**הדיון המעניין הוא 1.** `type="number"` מקבל גם מספרים שליליים,
עשרוניים, וסימון מדעי – ולכן `min` ו-`max` **חיוניים** ולא קישוט.

**ומתי `number` הוא בחירה שגויה?** למספר טלפון, ת״ז או מספר כרטיס אשראי.
למה? כי אלה **אינם מספרים** – הם רצפי ספרות. `type="number"` יאפשר
חצים למעלה/למטה (מגוחך לטלפון), עלול להוריד אפסים מובילים, ובחלק
מהדפדפנים מאפשר להזין `1e5`. השתמשו ב-`type="tel"` עם `pattern`.

</div>
</details>

<div dir="rtl" align="right">

---
---

## 4. `<label>` – התגית הכי חשובה לנגישות

### 📖 ההסבר

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
3. **`placeholder` אינו תחליף!**

> ⚠️ **הכלל:** `for` של ה-`label` חייב להיות זהה ל-`id` של ה-`input`.
> **לא** ל-`name`. זו טעות נפוצה מאוד.

### 🌍 מהעולם האמיתי

**נסו את זה עכשיו – זה לוקח 5 שניות ומשכנע מיד.**

לכו לטופס כלשהו באתר, ולחצו על **מילות התווית** ("שם משתמש", "אימייל") –
לא על התיבה. אם הסמן קופץ לתוך השדה, ה-`label` מקושר נכון. אם לא קורה
כלום – מישהו שכח את ה-`for`.

**למה זה משנה כל כך בנייד:** תיבת סימון "אני מאשר את התקנון" היא ריבוע
של 16×16 פיקסלים. עם `<label>` מקושר, גם **הטקסט** לוחץ עליה –
שטח לחיצה של אולי 300 פיקסלים במקום 16. למשתמש עם רעד בידיים,
או פשוט לכל מי שמנסה ללחוץ באוטובוס, זו ההבדל בין להצליח לוותר.

**ולמה `placeholder` לא מספיק – שלוש סיבות מוחשיות:**

| הבעיה | ההסבר |
|--------|--------|
| **הוא נעלם** | מתחילים להקליד – הטקסט נעלם. חוזרים לבדוק את הטופס לפני שליחה, ולא זוכרים מה השדה השלישי ביקש |
| **ניגודיות נמוכה** | אפור בהיר על לבן. מתחת לסף התקן (WCAG). קשה לקריאה בשמש או לבעלי ליקוי ראייה |
| **מבלבל עם ערך אמיתי** | משתמשים חושבים שהשדה כבר מלא ומדלגים עליו |

**מחקר מוכר בתחום ה-UX** (Nielsen Norman Group) הראה שטפסים עם
placeholder-בלבד מייצרים יותר שגיאות ולוקחים יותר זמן למלא.
"עיצוב נקי" עולה כאן בשיעור ההשלמה.

### ✋ תרגול מיידי

מצאו את השגיאה:

</div>

```html
<label for="user-email">אימייל:</label>
<input type="email" id="email" name="user-email">
```

<details dir="rtl">
<summary><b>💡 הצגת הפתרון</b></summary>

<div dir="rtl" align="right">

**`for="user-email"` מחפש אלמנט עם `id="user-email"` – אבל ה-`id` בפועל
הוא `"email"`.** ה-`label` מצביע לשום מקום.

הבלבול נוצר כי `name="user-email"` **כן** קיים – אבל `for` לא מסתכל
על `name` לעולם.

**שני תיקונים תקינים:**

</div>

```html
<!-- א. משנים את ה-id שיתאים ל-for -->
<label for="user-email">אימייל:</label>
<input type="email" id="user-email" name="user-email">

<!-- ב. משנים את ה-for שיתאים ל-id -->
<label for="email">אימייל:</label>
<input type="email" id="email" name="user-email">
```

<div dir="rtl" align="right">

**איך לתפוס את זה בעצמכם בשנייה:** לחצו על מילת התווית בדפדפן.
לא קרה כלום? הקישור שבור.

**כלל שיחסוך לכם באגים:** תנו לשניהם את **אותו ערך**.
`id="email" name="email"` – פשוט, עקבי, וקשה לטעות.

</div>
</details>

<div dir="rtl" align="right">

---
---

## 5. Checkbox ו-Radio

### 📖 ההסבר

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

**הכלל הקריטי ל-Radio:** כל הכפתורים בקבוצה חייבים **אותו `name`**
ו-**`value` שונה**.

| | Checkbox | Radio |
|---|----------|--------|
| בחירות | כמה | אחת בלבד |
| `name` | יכול לחזור (למערך) | **חייב** לחזור |
| ביטול סימון | ✅ | ❌ (רק בחירה אחרת) |

### 🔨 שלב אחר שלב – למה `name` זהה?

**שלב 1 – הבעיה.** מתחיל כותב כל רדיו עם `name` משלו:

</div>

```html
<!-- ❌ שבור -->
<input type="radio" name="beginner" value="1"> מתחיל
<input type="radio" name="advanced" value="1"> מתקדם
```

<div dir="rtl" align="right">

**שלב 2 – מה קורה?** אפשר לסמן את **שניהם**. הרדיו איבד את כל התכלית שלו.

**שלב 3 – למה?** `name` הוא מה שאומר לדפדפן *"אלה תשובות לאותה שאלה"*.
שני שמות שונים = שתי שאלות נפרדות, וכל אחת עונה לעצמה.

**שלב 4 – התיקון:**

</div>

```html
<!-- ✅ name זהה = קבוצה אחת. value שונה = תשובות שונות. -->
<input type="radio" name="level" value="beginner" id="lv1">
<label for="lv1">מתחיל</label>

<input type="radio" name="level" value="advanced" id="lv2">
<label for="lv2">מתקדם</label>
```

<div dir="rtl" align="right">

השרת יקבל `level=beginner` **או** `level=advanced` – אף פעם לא שניהם.

### 🌍 מהעולם האמיתי

**המבחן שקובע איזה מהם לבחור:** *"האם המשתמש יכול לרצות יותר מאחד?"*

| הדוגמה | האלמנט | למה |
|---------|---------|------|
| שיטת משלוח (רגיל / מהיר / איסוף עצמי) | **Radio** | אי אפשר לקבל חבילה בשלוש דרכים |
| תוספות לפיצה | **Checkbox** | למה לא הכול |
| מין (זכר / נקבה / אחר) | **Radio** | תשובה אחת |
| "אשמח לקבל עדכונים" | **Checkbox יחיד** | כן/לא – אין קבוצה |
| כמות פריטים | **לא זה ולא זה** | `type="number"` |

**נקודה שתופסת אנשים ב-Radio:** ברגע שסימנתם רדיו – **אי אפשר לבטל**.
אין דרך לחזור למצב "כלום לא מסומן". לכן:

- אם יש ברירת מחדל הגיונית – שימו `checked` על אחד מהם.
- אם המשתמש חייב לבחור במודע – **אל** תשימו `checked`, ושימו `required`
  על אחד מהם (זה חל על כל הקבוצה).
- אם צריך אפשרות לבטל – הוסיפו אופציה "לא רלוונטי" מפורשת.

**ולמה `<fieldset>` + `<legend>` הם חובה כאן ולא המלצה:**

בלעדיהם, קורא מסך מקריא רק "מתחיל, כפתור בחירה". המשתמש שומע אפשרות
בלי לדעת **מה השאלה**. עם `<legend>` הוא שומע:
*"רמת ניסיון: מתחיל, כפתור בחירה, 1 מתוך 2"*.

### ✋ תרגול מיידי

בנו קבוצת רדיו נגישה לבחירת אמצעי תשלום (מזומן / אשראי / ביט),
עם ברירת מחדל.

</div>

<details dir="rtl">
<summary><b>💡 הצגת הפתרון</b></summary>

```html
<fieldset>
  <legend>אמצעי תשלום</legend>

  <input type="radio" id="pay-cash" name="payment" value="cash" checked>
  <label for="pay-cash">מזומן</label>

  <input type="radio" id="pay-card" name="payment" value="card">
  <label for="pay-card">כרטיס אשראי</label>

  <input type="radio" id="pay-bit" name="payment" value="bit">
  <label for="pay-bit">ביט</label>
</fieldset>
```

<div dir="rtl" align="right">

**חמש נקודות ביקורת:**

| ✅ | מה |
|---|-----|
| 1 | `name="payment"` **זהה** בשלושתם – קבוצה אחת |
| 2 | `value` **שונה** בכל אחד – זה מה שנשלח לשרת |
| 3 | `id` **ייחודי** בכל אחד – בשביל ה-`label` |
| 4 | `<fieldset>` + `<legend>` – השאלה נשמעת לקורא מסך |
| 5 | `checked` על אחד – המשתמש לא יכול להיתקע בלי בחירה |

**בדיקה מהירה:** לחצו על המילה "ביט". אם העיגול לא מסומן –
ה-`for`/`id` לא תואמים.

</div>
</details>

<div dir="rtl" align="right">

---
---

## 6. `<select>` – רשימה נפתחת

### 📖 ההסבר

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

### 🌍 מהעולם האמיתי

**מתי `<select>` ומתי רדיו? כלל מספרי פשוט מהעולם המקצועי:**

| מספר האפשרויות | האלמנט | למה |
|-----------------|---------|------|
| 2–5 | **Radio** | כולן גלויות מיד. אפס לחיצות. המשתמש משווה בבת אחת |
| 6–15 | **Select** | רדיו יתפוס יותר מדי מקום |
| 15+ | **Select** או שדה חיפוש עם `<datalist>` | גלילה ברשימה של 200 מדינות היא סיוט |

**האפשרות הריקה בראש – למה היא שם:**

</div>

```html
<option value="">-- בחרו עיר --</option>
```

<div dir="rtl" align="right">

בלעדיה, האפשרות הראשונה מוצגת כברירת מחדל, והמשתמש עלול לשלוח אותה
בלי לשים לב. עם `value=""` ריק בתוספת `required`, הדפדפן יעצור את
השליחה ויאמר "בחר פריט מהרשימה".

**`<optgroup>` – איפה תראו את זה:** בחירת מדינה (מקובצת לפי יבשת),
בחירת מוצר (לפי קטגוריה), בחירת שעה (בוקר / צהריים / ערב).
בכל רשימה ארוכה, קיבוץ מקצר את זמן החיפוש דרמטית.

> ⚠️ **`multiple` – השתמשו בזהירות.** בחירה מרובה ב-`select` דורשת
> להחזיק `Ctrl` תוך כדי לחיצה. רוב המשתמשים לא יודעים את זה,
> ובנייד זה מגושם. **קבוצת checkbox כמעט תמיד עדיפה.**

### ✋ תרגול מיידי

בנו `<select>` לבחירת רמת קורס, עם 3 קבוצות ואפשרות ריקה בראש.

</div>

<details dir="rtl">
<summary><b>💡 הצגת הפתרון</b></summary>

```html
<label for="course">בחרו קורס:</label>
<select id="course" name="course" required>
  <option value="">-- בחרו קורס --</option>

  <optgroup label="מתחילים">
    <option value="html-basics">יסודות HTML</option>
    <option value="css-basics">יסודות CSS</option>
  </optgroup>

  <optgroup label="מתקדמים">
    <option value="js-advanced">JavaScript מתקדם</option>
    <option value="react">React</option>
  </optgroup>

  <optgroup label="עורף">
    <option value="sql">SQL ובסיסי נתונים</option>
  </optgroup>
</select>
```

<div dir="rtl" align="right">

**ההבחנה החשובה:** `<optgroup label="...">` הוא **כותרת בלבד** –
אי אפשר לבחור בו. הוא מופיע מודגש ולא ניתן ללחיצה.

**שימו לב ל-`value` מול הטקסט:** ה-`value` הוא מה שנשלח לשרת
(`"html-basics"` – קצר, באנגלית, יציב). הטקסט הוא מה שהמשתמש רואה
(בעברית). אפשר לשנות את הטקסט או לתרגם את האתר בלי לשבור את השרת.

</div>
</details>

<div dir="rtl" align="right">

---
---

## 7. `<textarea>` – טקסט מרובה שורות

### 📖 ההסבר

</div>

```html
<label for="msg">ההודעה שלכם:</label>
<textarea id="msg" name="message" rows="5" cols="40"
          placeholder="כתבו כאן..." maxlength="500"></textarea>
```

<div dir="rtl" align="right">

> ⚠️ ל-`<textarea>` **אין** תכונת `value`. הערך ההתחלתי נכתב **בין** התגיות.
> ⚠️ כל רווח בין `<textarea>` ל-`</textarea>` הופך לתוכן. כתבו אותן צמודות.

### 🌍 מהעולם האמיתי

**המלכודת הזו תופסת כל מפתח פעם אחת:**

</div>

```html
<!-- ❌ השדה ייראה "מלא" ברווחים וירידות שורה -->
<textarea name="msg">
</textarea>

<!-- ❌ גם זה -->
<textarea name="msg">   </textarea>

<!-- ✅ ריק באמת -->
<textarea name="msg"></textarea>
```

<div dir="rtl" align="right">

למה? כי `<textarea>` היא כמו `<pre>` – היא **שומרת** כל תו שביניהן.
מה שנראה כמו הזחה יפה בקוד הופך לרווחים אמיתיים בשדה. `required`
אפילו לא יתפוס את זה, כי מבחינתו השדה מלא.

**זו הסיבה שתראו בקוד מקצועי את התגיות צמודות בצורה "מכוערת"** –
זו לא רשלנות, זו הכרח.

**`rows` ו-`cols` – מיושנים חלקית:** הם נותנים גודל התחלתי, אבל ב-CSS
שולטים בגודל טוב יותר (`width`, `height`, `resize`). עדיין שימושי
לתת `rows` כברירת מחדל סבירה.

**`maxlength` – עשו את זה נכון:** אם הגבלתם ל-500 תווים, הוסיפו מונה
שמראה למשתמש כמה נשארו. שדה שפשוט מפסיק לקבל תווים בלי הסבר הוא
חוויה מתסכלת. (המונה עצמו דורש JavaScript – מודול 10.)

### ✋ תרגול מיידי

בנו שדה "ספרו לנו על עצמכם" עם ערך התחלתי, מוגבל ל-300 תווים.

</div>

<details dir="rtl">
<summary><b>💡 הצגת הפתרון</b></summary>

```html
<label for="bio">ספרו לנו על עצמכם:</label>
<textarea id="bio" name="bio" rows="6" maxlength="300"
          placeholder="למשל: מה למדתם, מה מעניין אתכם...">אני סטודנט לפיתוח אתרים.</textarea>
```

<div dir="rtl" align="right">

**שימו לב:** הערך ההתחלתי `"אני סטודנט לפיתוח אתרים."` נכתב **בין**
התגיות, **צמוד** לשתיהן. שום רווח, שום ירידת שורה.

**ההבדל מ-`<input>`:**

</div>

```html
<input type="text" value="ערך התחלתי">          <!-- בתכונה -->
<textarea>ערך התחלתי</textarea>                  <!-- בין התגיות -->
```

<div dir="rtl" align="right">

**למה ההבדל?** כי `<input>` הוא אלמנט ריק (void) – אין לו "בפנים".
`<textarea>` הוא אלמנט רגיל עם תוכן. וטקסט רב-שורתי לא יכול להיכנס
לתוך תכונה בנוחות.

</div>
</details>

<div dir="rtl" align="right">

---
---

## 8. כפתורים

### 📖 ההסבר

</div>

```html
<button type="submit">שלח טופס</button>
<button type="reset">אפס</button>
<button type="button">כפתור רגיל (ל-JavaScript)</button>
```

<div dir="rtl" align="right">

> ⚠️ **ברירת המחדל של `<button>` בתוך `<form>` היא `submit`.**

### 🌍 מהעולם האמיתי

**זהו הבאג מספר 1 של מתחילים ב-JavaScript, וכדאי להכיר אותו כבר עכשיו.**

התרחיש: אתם בונים טופס, ומוסיפים כפתור "הוסף שורה" שאמור להוסיף שדה נוסף.

</div>

```html
<form>
  <input name="item1">
  <button>הוסף שורה</button>   <!-- ❌ בלי type -->
</form>
```

<div dir="rtl" align="right">

לוחצים – **והדף מתרענן**. כל מה שהמשתמש מילא נעלם. אין הודעת שגיאה,
אין רמז. מפתחים מבלים שעות על זה.

**מה קרה?** `<button>` בלי `type` הוא `type="submit"` כברירת מחדל.
הלחיצה שלחה את הטופס.

**התיקון – תו אחד:**

</div>

```html
<button type="button">הוסף שורה</button>   <!-- ✅ -->
```

<div dir="rtl" align="right">

**הכלל שיחסוך לכם את זה:** **תמיד** כתבו `type` במפורש על כל `<button>`.
אף פעם אל תסתמכו על ברירת המחדל.

**ו-`type="reset"`? כמעט אף פעם לא.** מחקרי שימושיות מראים שמשתמשים
לוחצים עליו **בטעות** במקום על "שלח" – ומאבדים את כל מה שמילאו.
רוב האתרים המודרניים פשוט לא כוללים כפתור איפוס. אם צריך – שימו אותו
רחוק מכפתור השליחה, ולא באותו גודל.

**`<button>` מול `<input type="submit">`:** שניהם עובדים.
`<button>` עדיף כי הוא יכול להכיל HTML – אייקון, טקסט מודגש, כמה שורות:

</div>

```html
<button type="submit">
  <img src="send.svg" alt=""> שלח הודעה
</button>
```

<div dir="rtl" align="right">

### ✋ תרגול מיידי

איזה `type` לכל כפתור?

1. "שלח הזמנה" בסוף טופס
2. "הצג סיסמה" (מחליף בין password ל-text)
3. "נקה טופס"
4. "הוסף מוצר לסל"

</div>

<details dir="rtl">
<summary><b>💡 הצגת הפתרון</b></summary>

<div dir="rtl" align="right">

| # | ה-`type` | למה |
|---|-----------|------|
| 1 | `submit` | זו מטרת הטופס |
| 2 | `button` | פעולת JS בלבד. בלי זה – הטופס יישלח בכל לחיצה על העין 👁 |
| 3 | `reset` | אם בכלל כוללים אותו |
| 4 | `button` | לרוב פעולת JS. אם זה כן שולח לשרת – `submit` |

**המקרה 2 הוא בדיוק הבאג הקלאסי.** כפתור "הצג סיסמה" הוא אולי הכפתור
הכי נפוץ שנשבר ככה: המשתמש רוצה לוודא שהקליד נכון, לוחץ על העין,
והטופס נשלח עם סיסמה חלקית.

</div>
</details>

<div dir="rtl" align="right">

---
---

## 9. ולידציה מובנית

### 📖 ההסבר

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

> 💡 התכונה `title` היא ההודעה שהדפדפן מציג כשה-`pattern` נכשל.
> בלעדיה ההודעה סתומה: "אנא התאם את הפורמט המבוקש".

### 🌍 מהעולם האמיתי

**זה חוסך מאות שורות JavaScript – והתלמידים לרוב לא מאמינים עד שרואים.**

לפני HTML5, כל בדיקה כזו דרשה קוד. היום:

</div>

```html
<form>
  <input type="email" required>                      <!-- פורמט מייל -->
  <input type="password" minlength="8" required>     <!-- אורך מינימלי -->
  <input type="number" min="18" max="120" required>  <!-- טווח -->
  <input type="date" min="2026-01-01">               <!-- לא בעבר -->
  <button type="submit">שלח</button>
</form>
```

<div dir="rtl" align="right">

הדפדפן יעצור את השליחה, יקפיץ בועית שגיאה **בשפת המערכת של המשתמש**,
ויקפיץ את המיקוד לשדה הבעייתי. הכול בחינם.

**בונוס שמעטים מכירים:** התכונות האלה יוצרות מצבי CSS שאפשר לעצב:

</div>

```css
input:invalid { border-color: red; }
input:valid   { border-color: green; }
input:required { background: #fffbe6; }
```

<div dir="rtl" align="right">

בלי שורת JavaScript – משוב ויזואלי חי תוך כדי הקלדה. נלמד את זה בחלק ה-CSS.

### 🔒 האזהרה הכי חשובה במודול

> **ולידציה בצד הלקוח היא נוחות למשתמש בלבד – היא אינה אבטחה.**

**למה? הנה בדיוק איך עוקפים אותה בשלוש שניות:**

1. F12 → לשונית Elements
2. מוצאים את השדה, לוחצים לחיצה כפולה על `required`
3. מוחקים. שולחים.

או פשוט מוסיפים `novalidate` ל-`<form>`. או שולחים בקשה ישירות לשרת
עם `curl`, בלי דפדפן בכלל.

**המסקנה:** ולידציה בצד הלקוח נועדה לחסוך למשתמש **הגון** נסיעה מיותרת
לשרת ולתת לו משוב מיידי. **הבדיקה האמיתית חייבת להיעשות בשרת, תמיד.**
זה כלל ברזל בפיתוח ווב, ואין לו יוצא מן הכלל.

### ✋ תרגול מיידי

הוסיפו ולידציה לשדה סיסמה: חובה, 8–20 תווים, חייב להכיל
לפחות אות אחת ומספר אחד.

</div>

<details dir="rtl">
<summary><b>💡 הצגת הפתרון</b></summary>

```html
<label for="pwd">סיסמה:</label>
<input type="password" id="pwd" name="password"
       minlength="8" maxlength="20"
       pattern="(?=.*[A-Za-z])(?=.*[0-9]).{8,20}"
       title="8–20 תווים, חייב לכלול לפחות אות אחת ומספר אחד"
       required
       autocomplete="new-password">
```

<div dir="rtl" align="right">

**פירוק ה-`pattern`:**

| החלק | מה הוא עושה |
|-------|--------------|
| `(?=.*[A-Za-z])` | "מבט קדימה": חייבת להופיע אות כלשהי איפשהו |
| `(?=.*[0-9])` | חייבת להופיע ספרה כלשהי איפשהו |
| `.{8,20}` | האורך הכולל: 8 עד 20 תווים |

**שלוש נקודות מעשיות:**

1. **`title` הוא לא קישוט** – הוא ההודעה שהמשתמש יראה כשהבדיקה נכשלת.
   בלעדיו הוא רואה הודעה גנרית ולא יודע מה לתקן.
2. **`autocomplete="new-password"`** אומר למנהל הסיסמאות של הדפדפן
   להציע סיסמה חזקה במקום למלא סיסמה ישנה.
3. **ביטויים רגולריים** – נלמד לעומק בהמשך. כרגע מספיק להבין
   שאפשר לתאר בהם דפוס, ולהעתיק דפוסים מוכרים.

**ושוב, כי זה חשוב:** כל זה עוקף בשלוש שניות ב-F12.
הבדיקה האמיתית היא בשרת.

</div>
</details>

<div dir="rtl" align="right">

---
---

## 10. `<fieldset>` ו-`<legend>` – ארגון טופס

### 📖 ההסבר

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

`<fieldset>` מקבץ שדות קשורים, ו-`<legend>` נותן לקבוצה כותרת.

### 🌍 מהעולם האמיתי

**טופס ארוך בלי חלוקה הוא הסיבה מספר 1 לנטישה.**

תחשבו על טופס פתיחת חשבון בנק: 30 שדות ברצף אחד. המשתמש רואה קיר של
תיבות ומוותר עוד לפני שהתחיל. אותם 30 שדות מחולקים לארבע קבוצות של
7–8 – "פרטים אישיים", "כתובת", "פרטי תעסוקה", "אישורים" – מרגישים
כמו ארבע משימות קטנות.

**זה נקרא "chunking" בפסיכולוגיה קוגניטיבית**, וזו אותה סיבה שמספרי
טלפון נכתבים `050-123-4567` ולא `0501234567`.

**ולנגישות – זה קריטי במיוחד בקבוצות רדיו וצ׳קבוקס:**

| | מה קורא המסך מכריז |
|---|---------------------|
| **בלי `<fieldset>`** | "מתחיל, כפתור בחירה" – המשתמש שומע אפשרות בלי לדעת מה השאלה |
| **עם `<fieldset>` + `<legend>`** | "רמת ניסיון: מתחיל, כפתור בחירה, 1 מתוך 3" |

**זו הסיבה שקבוצת רדיו בלי `<fieldset>` נחשבת לכשל נגישות** בבדיקות
תקן, ולא ל"חסר נחמד".

**נסו:** פתחו טופס הרשמה של אתר גדול, F12, וחפשו `<fieldset>`.
באתרים מקצועיים תמצאו. באתרים חובבניים – לא.

### ✋ תרגול מיידי

ארגנו את השדות האלה ל-`<fieldset>`-ים הגיוניים:
שם, אימייל, טלפון, רחוב, עיר, מיקוד, אמצעי תשלום, אישור תקנון.

</div>

<details dir="rtl">
<summary><b>💡 הצגת הפתרון</b></summary>

```html
<form>
  <fieldset>
    <legend>פרטים אישיים</legend>
    <label for="name">שם מלא:</label>
    <input type="text" id="name" name="fullName" required>

    <label for="email">אימייל:</label>
    <input type="email" id="email" name="email" required>

    <label for="phone">טלפון:</label>
    <input type="tel" id="phone" name="phone" required>
  </fieldset>

  <fieldset>
    <legend>כתובת למשלוח</legend>
    <label for="street">רחוב ומספר:</label>
    <input type="text" id="street" name="street" required>

    <label for="city">עיר:</label>
    <input type="text" id="city" name="city" required>

    <label for="zip">מיקוד:</label>
    <input type="text" id="zip" name="zip" pattern="[0-9]{7}"
           title="7 ספרות">
  </fieldset>

  <fieldset>
    <legend>תשלום</legend>
    <input type="radio" id="pay-cash" name="payment" value="cash" checked>
    <label for="pay-cash">מזומן</label>

    <input type="radio" id="pay-card" name="payment" value="card">
    <label for="pay-card">אשראי</label>
  </fieldset>

  <fieldset>
    <legend>אישורים</legend>
    <input type="checkbox" id="terms" name="terms" required>
    <label for="terms">קראתי ואני מאשר את התקנון</label>
  </fieldset>

  <button type="submit">שלח הזמנה</button>
</form>
```

<div dir="rtl" align="right">

**עקרון החלוקה:** קבצו לפי **מה המשתמש חושב עליו יחד**, לא לפי סוג השדה.
"טלפון" הוא פרט אישי, לא פרט משלוח – למרות ששניהם שדות טקסט.

**שימו לב שכפתור השליחה נמצא מחוץ לכל `<fieldset>`** – הוא שייך לטופס
כולו, לא לקבוצה מסוימת.

</div>
</details>

<div dir="rtl" align="right">

---
---

## 11. תכונות שימושיות נוספות

### 📖 ההסבר

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

### 🌍 מהעולם האמיתי

**`autocomplete` – התכונה שהכי משתלמת ביחס למאמץ.**

כשאתם ממלאים טופס והדפדפן מציע את הכתובת שלכם בלחיצה אחת – זה
`autocomplete` שעובד. הערכים הם **מילון תקני**, לא שמות שאתם ממציאים:

</div>

```html
<input name="fname"  autocomplete="given-name">
<input name="lname"  autocomplete="family-name">
<input name="email"  autocomplete="email">
<input name="phone"  autocomplete="tel">
<input name="street" autocomplete="street-address">
<input name="city"   autocomplete="address-level2">
<input name="zip"    autocomplete="postal-code">
<input name="cc-num" autocomplete="cc-number">
```

<div dir="rtl" align="right">

**מה זה שווה בפועל:** נתוני התעשייה מראים שמילוי אוטומטי מקצר זמן
מילוי טופס בכ-30% ומעלה משמעותית את שיעור ההשלמה. עבור אתר מסחרי,
זה כסף ישיר.

**וזו גם נגישות:** משתמש עם מגבלה מוטורית שכל הקלדה קשה לו
מקבל טופס מלא בלחיצה אחת.

> ⚠️ **אל תכבו `autocomplete="off"` בטפסים רגילים.** אתרים עושים את זה
> "לביטחון" ורק מקשים על המשתמשים – שאז מקלידים סיסמאות פשוטות יותר
> כי אין מנהל סיסמאות. השאירו למקרים באמת רגישים.

**`<datalist>` – הרעיון שאנשים לא מכירים:** רשימת הצעות **בתוספת**
אפשרות להקליד חופשי. שילוב של `<select>` ו-`<input>`:

</div>

```html
<label for="city">עיר מגורים:</label>
<input type="text" id="city" name="city" list="city-options">
<datalist id="city-options">
  <option value="תל אביב-יפו">
  <option value="ירושלים">
  <option value="חיפה">
  <option value="באר שבע">
</datalist>
```

<div dir="rtl" align="right">

המשתמש מקבל הצעות תוך כדי הקלדה, אבל יכול גם להקליד "כפר סבא"
שלא ברשימה. `<select>` לא היה מאפשר את זה.

**`autofocus` – בזהירות.** הוא מקפיץ את המיקוד לשדה בטעינת הדף.
מצוין בדף שכולו טופס (חיפוש, התחברות). **מזיק** בדף תוכן –
הוא גולל את המשתמש לאמצע הדף בלי שביקש, ומבלבל משתמשי קורא מסך.
כלל: `autofocus` אחד לכל היותר בדף, ורק כשהטופס הוא **מטרת** הדף.

### ✋ תרגול מיידי

הוסיפו `autocomplete` נכון לשדות: שם פרטי, אימייל, טלפון, מיקוד.

</div>

<details dir="rtl">
<summary><b>💡 הצגת הפתרון</b></summary>

```html
<label for="fn">שם פרטי:</label>
<input type="text" id="fn" name="firstName" autocomplete="given-name">

<label for="em">אימייל:</label>
<input type="email" id="em" name="email" autocomplete="email">

<label for="ph">טלפון:</label>
<input type="tel" id="ph" name="phone" autocomplete="tel">

<label for="zp">מיקוד:</label>
<input type="text" id="zp" name="zip" autocomplete="postal-code">
```

<div dir="rtl" align="right">

**הנקודה המרכזית:** הערכים הם **מילון תקני** שהדפדפן מכיר.
`autocomplete="myPhone"` לא יעשה כלום. הרשימה המלאה נמצאת
[בתקן ה-HTML](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).

**הערכים הנפוצים שכדאי לזכור:**
`name` · `given-name` · `family-name` · `email` · `tel` ·
`street-address` · `address-level2` (עיר) · `postal-code` ·
`country` · `cc-number` · `cc-exp` · `username` ·
`current-password` · `new-password`

</div>
</details>

<div dir="rtl" align="right">

---
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
- [ ] לכל `<button>` יש `type` מפורש
- [ ] `autocomplete` בשדות סטנדרטיים
- [ ] בדקתם מעבר עם Tab בלבד – הסדר הגיוני

---
---

## 🏋️ תרגילי הכיתה

> קובצי השלד: [`exercises/`](exercises/) · פתרונות מלאים: [`solutions/`](solutions/)

### תרגיל 1 – טופס התחברות 🟢

**קובץ:** [`exercises/ex1-login.html`](exercises/ex1-login.html) ·
[פתרון](solutions/ex1-login.html)

בנו טופס התחברות פשוט:

1. שדה שם משתמש (`text`) – חובה, לפחות 3 תווים.
2. שדה סיסמה (`password`) – חובה, לפחות 8 תווים.
3. תיבת סימון "זכור אותי".
4. כפתור "התחברות".
5. קישור "שכחתי סיסמה".

**דרישות:** לכל שדה `name`, `id` ו-`<label for>` מתאים.

**🔗 מתבסס על:** סעיפים [2](#2-שדה-קלט--input), [4](#4-label--התגית-הכי-חשובה-לנגישות), [9](#9-ולידציה-מובנית)

---

### תרגיל 2 – טופס משוב 🟢

**קובץ:** [`exercises/ex2-feedback.html`](exercises/ex2-feedback.html) ·
[פתרון](solutions/ex2-feedback.html)

בנו טופס משוב על הקורס:

1. שם (אופציונלי – מאפשרים משוב אנונימי).
2. אימייל (`type="email"`, אופציונלי).
3. **רדיו:** דירוג כללי – מצוין / טוב / בינוני / חלש.
4. **צ׳קבוקס:** אילו נושאים היו הכי מועילים (לפחות 4 אפשרויות).
5. **Select:** באיזה מסלול למדתם (בוקר / ערב).
6. **Textarea:** הערות חופשיות, עד 500 תווים.
7. כפתור שליחה וכפתור איפוס.

**דרישה:** כל קבוצת רדיו/צ׳קבוקס עטופה ב-`<fieldset>` עם `<legend>`.

**🔗 מתבסס על:** סעיפים [5](#5-checkbox-ו-radio), [6](#6-select--רשימה-נפתחת), [7](#7-textarea--טקסט-מרובה-שורות), [10](#10-fieldset-ו-legend--ארגון-טופס)

---

### תרגיל 3 – תיקון טופס שבור 🟡

**קובץ:** [`exercises/ex3-fix-form.html`](exercises/ex3-fix-form.html) ·
[פתרון](solutions/ex3-fix-form.html)

בטופס שבקובץ יש **8 שגיאות**. מצאו ותקנו:

| הרמז | הסעיף שיעזור |
|-------|---------------|
| שדות בלי `name` | 2 |
| `<label for>` שלא תואם ל-`id` | 4 |
| קבוצת רדיו עם `name` שונה בכל כפתור | 5 |
| `type` לא מתאים לתוכן | 3 |
| `<textarea>` עם `value` | 7 |
| כפתור שמרענן את הדף בטעות | 8 |
| `<option>` בלי `value` | 6 |
| שדה חובה בלי `required` | 9 |

**🌍 למה זה תרגיל אמיתי:** רוב עבודת המפתח היא תיקון קוד קיים,
לא כתיבה מאפס. וכל השגיאות ברשימה הזו הן שגיאות **שקטות** –
הטופס נראה תקין ומתפקד חלקית, וזה בדיוק מה שהופך אותן למסוכנות.

---

### תרגיל 4 – טופס הזמנת פיצה 🟡

**קובץ:** [`exercises/ex4-pizza-order.html`](exercises/ex4-pizza-order.html) ·
[פתרון](solutions/ex4-pizza-order.html)

בנו טופס הזמנה עם `<fieldset>` לכל אזור:

**אזור 1 – פרטי הלקוח:**
- שם מלא (חובה)
- טלפון (`tel`, `pattern` של 10 ספרות, חובה)
- כתובת למשלוח (חובה)

**אזור 2 – ההזמנה:**
- גודל פיצה (רדיו: אישית / משפחתית / ענקית) – חובה
- תוספות (צ׳קבוקס: לפחות 6 אפשרויות)
- כמות (`number`, בין 1 ל-10, ברירת מחדל 1)
- סוג בצק (`select` עם `optgroup`)

**אזור 3 – משלוח:**
- זמן מבוקש (`time`)
- תאריך (`date`, לא בעבר – השתמשו ב-`min`)
- הערות למשלוח (`textarea`)

**אזור 4 – תשלום:**
- אמצעי תשלום (רדיו: מזומן / אשראי)
- תיבת סימון "אישרתי את תנאי ההזמנה" – חובה

**🌍 למה זה תרגיל אמיתי:** זהו בדיוק המבנה של כל טופס הזמנה
באתרי משלוחים. פתחו אתר משלוחים לצד התרגיל וראו כמה מהמבנה
שאתם בונים מופיע שם אחד לאחד.

**🔗 מתבסס על:** כל המודול

---

### תרגיל 5 – אתגר: טופס בקשת הלוואה ⭐

**קובץ:** [`exercises/ex5-loan-application.html`](exercises/ex5-loan-application.html) ·
[פתרון](solutions/ex5-loan-application.html)

בנו טופס מורכב הכולל **את כל** הרכיבים הבאים:

- [ ] לפחות 4 `<fieldset>` עם `<legend>` ברור
- [ ] לפחות 10 סוגי `input` שונים
- [ ] קבוצת רדיו אחת וקבוצת צ׳קבוקס אחת
- [ ] `<select>` עם `<optgroup>`
- [ ] `<datalist>` להשלמה אוטומטית
- [ ] `<textarea>` עם `maxlength`
- [ ] שדה `hidden`
- [ ] `pattern` בלפחות 3 שדות שונים, כל אחד עם `title` מסביר
- [ ] `min`/`max` על מספר ועל תאריך
- [ ] `step` על שדה סכום
- [ ] `accept` על העלאת קובץ
- [ ] `autocomplete` נכון בשדות רלוונטיים
- [ ] סימון ויזואלי של שדות חובה
- [ ] כפתור submit וכפתור reset

**🌍 למה זה תרגיל אמיתי:** טופס פיננסי הוא המקום שבו כל מה שלמדתם
נבחן: הרבה שדות (חלוקה ל-fieldset), נתונים רגישים (POST), ולידציה
הדוקה (pattern), נגישות מלאה (רגולציה מחייבת בבנקים), והעלאת מסמכים.

**דרישות איכות:**
- 100% מהשדות עם `label` מקושר.
- 0 שגיאות ב-[validator.w3.org](https://validator.w3.org).
- **בדקו את הטופס עם מקלדת בלבד** (Tab בלבד, בלי עכבר) –
  הסדר חייב להיות הגיוני, וכל שדה חייב להיות נגיש.

---

## ✅ מה הלאה?

| שלב | איפה |
|------|------|
| 1️⃣ הריצו את הדוגמאות | [`examples/`](examples/) |
| 2️⃣ פתרו את התרגילים | [`exercises/`](exercises/) |
| 3️⃣ השוו לפתרונות | [`solutions/`](solutions/) |
| 4️⃣ ענו על שאלות החזרה | [quiz.md](quiz.md) |

[⬅ הקודם](../04-links-images/) | [חזרה לחלק ה-HTML](../) | [תוכן העניינים](../../README.md) | [הבא ➡](../06-semantic/)

</div>

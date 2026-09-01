<div dir="rtl" align="right">

# 🏗️ שלב 10 – מרווחים, מסגרות וכרטיסים

> **הפרויקט המתמשך של הכיתה: קפה עתיד**
> נלמד ב־[CSS · מודול 3 – מודל הקופסה](../../../02-css/03-box-model/) · [⏮️ שלב 09](../step-09-css-colors-type/) · [🗺️ מפת הפרויקט](../../)

---

## 🎯 מה מוסיפים היום

- כותבים את השורה החשובה ביותר בקובץ: **`box-sizing: border-box`**.
- נותנים לתוכן **רוחב מקסימלי** ומרכזים אותו – סוף לשורות שנמתחות על כל המסך.
- הופכים פריטי תפריט לכרטיסים עם מסגרת, פינות מעוגלות ומרווח פנימי.
- מעצבים את הטבלה, את שדות הטופס ואת הכפתורים.

</div>

<div dir="rtl" align="right">

## 🌍 למה זה ככה בעולם האמיתי

### ארבע שכבות, מבפנים החוצה

</div>

```text
┌──────────── margin ────────────┐   מרווח חיצוני (שקוף)
│  ┌───────── border ─────────┐  │   המסגרת
│  │  ┌────── padding ─────┐  │  │   ריפוד פנימי (צבוע ברקע)
│  │  │      content       │  │  │   התוכן עצמו
│  │  └────────────────────┘  │  │
│  └──────────────────────────┘  │
└────────────────────────────────┘
```

<div dir="rtl" align="right">

**המבחן שמסדר את זה בראש:** צבעו רקע אדום. `padding` יהיה אדום. `margin` – לא.
זה ההבדל: `padding` שייך לקופסה, `margin` הוא המרחק ממנה.

### `box-sizing` – למה כותבים אותה בכל פרויקט בעולם

</div>

```css
.card {
  width: 300px;
  padding: 20px;
  border: 1px solid;
}
```

<div dir="rtl" align="right">

| המצב | הרוחב בפועל |
|-------|---------------|
| ברירת המחדל (`content-box`) | 300 + 20 + 20 + 1 + 1 = **342px** |
| `border-box` | **300px.** בדיוק מה שכתבתם |

בפריסה של שתי עמודות `50%` + `50%` עם ריפוד, ברירת המחדל שולחת את העמודה
השנייה שורה למטה. שלוש שורות בראש הקובץ פותרות את זה לתמיד:

</div>

```css
*, *::before, *::after { box-sizing: border-box; }
```

<div dir="rtl" align="right">

### קריסת שוליים – התופעה שנראית כמו באג

שתי פסקאות, לראשונה `margin-bottom: 30px`, לשנייה `margin-top: 20px`.
כמה רווח ביניהן?

**30px.** לא 50. שוליים אנכיים סמוכים **קורסים לגדול מביניהם**.

זה נשמע שרירותי אבל זה מה שגורם למסמך עם 20 פסקאות להיראות סביר.
אופקית זה לא קורה, וב-Flex/Grid זה לא קורה בכלל – ולכן `gap` פשוט יותר.

### 65 תווים בשורה

הגבלנו את `main` ל-1000px. למה בכלל?

שורה ארוכה מדי גורמת לעין לאבד את המקום בחזרה לתחילת השורה הבאה.
**המידה המקובלת: 60–80 תווים.** אתרי חדשות, ויקיפדיה, ספרים – כולם בטווח הזה.
מסך של 27 אינץ׳ בלי הגבלה נותן שורות של 200 תווים, ואף אחד לא באמת קורא אותן.

</div>
<div dir="rtl" align="right">

---

## 🔨 שלב אחר שלב

### 1. האיפוס

</div>

```css
*, *::before, *::after {
  box-sizing: border-box;
}
```

<div dir="rtl" align="right">

### 2. מכל מרכזי

</div>

```css
main {
  max-width: 1000px;
  margin: 0 auto;          /* 0 למעלה־למטה, auto לצדדים = מרכוז */
  padding: 24px 20px 56px; /* למעלה | לצדדים | למטה */
}
```

<div dir="rtl" align="right">

**`margin: 0 auto` עובד רק אם יש רוחב מוגדר.** בלי `max-width` האלמנט תופס
את כל הרוחב, ואין מה למרכז.

**קיצורי דרך:** `padding: 24px 20px 56px` הוא שלושה ערכים = למעלה, לצדדים, למטה.
שני ערכים = אנכי, אופקי. ארבעה = למעלה, ימין, למטה, שמאל (בכיוון השעון).

### 3. כרטיסי התפריט

</div>

```css
.menu-cat li {
  background-color: #fff;
  border: 1px solid #e0d5c5;
  border-radius: 10px;
  padding: 12px 16px;
  margin-bottom: 10px;
}
```

<div dir="rtl" align="right">

כאן קורה הקסם: אותה רשימה בדיוק, בלי שינוי אחד ב-HTML, נראית עכשיו
כמו תפריט של מסעדה.

### 4. הטבלה – `border-collapse` היא לא אופציונלית

</div>

```css
table {
  border-collapse: collapse;
}
```

<div dir="rtl" align="right">

בלעדיה, לכל תא יש מסגרת משלו ונוצר **קו כפול** בין כל שני תאים. עם `collapse`
התאים חולקים קו אחד. אין כמעט מצב שבו לא רוצים את זה.

### 5. שדות הטופס – `font: inherit`

</div>

```css
input, select, textarea {
  font: inherit;
  padding: 10px 12px;
  border: 1px solid #c9bda9;
  border-radius: 8px;
  width: 100%;
  max-width: 380px;
}
```

<div dir="rtl" align="right">

**`font: inherit` היא השורה שאף אחד לא מנחש.** שדות טופס **לא יורשים** את הפונט
של הדף – הם מקבלים את פונט מערכת ההפעלה. בלי השורה הזו, הטופס תמיד ייראה
"מודבק" מאתר אחר.

**ו-`max-width: 380px`:** שדה טלפון ברוחב 1000px נראה מגוחך ומזמין להקליד רומן.
רוחב שדה הוא רמז למשתמש כמה טקסט מצופה ממנו.

---

## 💻 מה נוסף ל-`style.css` היום

</div>

```css
/* ============================================================
   שלב 10 · CSS מודול 3 – מודל הקופסה
   ============================================================ */

/* השורה החשובה ביותר בקובץ: רוחב = מה שכתבתי, כולל padding ו-border */
*,
*::before,
*::after {
  box-sizing: border-box;
}

main {
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px 20px 56px;
}

section {
  margin-bottom: 40px;
}

p {
  margin: 0 0 1em;
}

/* פריטי התפריט – כרטיס ולא שורה */
.menu-cat ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-cat li {
  background-color: #fff;
  border: 1px solid #e0d5c5;
  border-radius: 10px;
  padding: 12px 16px;
  margin-bottom: 10px;
}

table {
  border-collapse: collapse;   /* בלי זה יש רווח כפול בין תאים */
  width: 100%;
  background-color: #fff;
}

caption {
  text-align: right;
  padding-bottom: 8px;
  font-weight: bold;
  color: #6b6257;
}

th, td {
  border: 1px solid #e0d5c5;
  padding: 10px 14px;
  text-align: right;
}

thead th {
  background-color: #e8d5b7;
}

blockquote {
  margin: 0;
  padding: 16px 20px;
  background-color: #fff;
  border-radius: 10px;
}

/* שדות טופס */
input, select, textarea {
  font: inherit;               /* בלי זה שדות יורשים פונט של המערכת */
  padding: 10px 12px;
  border: 1px solid #c9bda9;
  border-radius: 8px;
  background-color: #fff;
  width: 100%;
  max-width: 380px;
}

input[type="checkbox"],
input[type="radio"] {
  width: auto;
}

fieldset {
  border: 1px solid #d8cab4;
  border-radius: 10px;
  padding: 16px 20px;
  margin: 0 0 20px;
}

legend {
  padding: 0 8px;
  font-weight: bold;
  color: #4a2c17;
}

button {
  font: inherit;
  padding: 10px 22px;
  border: 0;
  border-radius: 8px;
  background-color: #4a2c17;
  color: #f5efe6;
  cursor: pointer;
}

img, video, iframe {
  max-width: 100%;
  border-radius: 12px;
}
```

<div dir="rtl" align="right">

## 👀 מה רואים במסך

- **התוכן כבר לא נצמד לקצוות** – יש עמודה מרכזית עם אוויר משני הצדדים.
- פריטי התפריט הפכו לכרטיסים לבנים עם מסגרת עדינה.
- הטבלה מסודרת, עם קו יחיד בין תאים ורקע בז׳ לכותרות.
- שדות הטופס באותו פונט כמו הדף, עם ריפוד נוח ללחיצה.
- הכפתורים חומים עם פינות מעוגלות.

**כאן האתר מתחיל להיראות מקצועי.** הוא עדיין מסודר אנכית – Flexbox בשלב 12.

---

## ✋ אתגר לכיתה

1. הוסיפו רווח של 24px בין הכרטיסים בגלריה (הם עדיין צמודים).
2. **תרגיל חישוב:** כרטיס עם `width: 250px`, `padding: 16px`, `border: 2px`.
   מה הרוחב על המסך – עם `border-box` ובלעדיו?
3. הכפתור "ניקוי הטופס" נראה בדיוק כמו "שליחת ההזמנה", וזה מבלבל.
   עצבו אותו כ**כפתור משני**: רקע שקוף, מסגרת חומה, טקסט חום.

</div>
</div>

<details dir="rtl">
<summary><b>💡 הצגת הפתרון</b></summary>

<div dir="rtl" align="right">

**1.** `.gallery figure { margin-bottom: 24px; }` – פתרון תקין להיום.
בשלב 13 נחליף אותו ב-`gap: 20px` על Grid, שהוא נכון יותר: `gap` נותן רווח
**בין** פריטים בלי להוסיף מרווח מיותר לאחרון.

**2.**
- **עם `border-box`: 250px.** הריפוד והמסגרת נחתכים מבפנים.
- **בלי: 250 + 16 + 16 + 2 + 2 = 286px.**

**3.** בוררים לפי התכונה, בלי להוסיף class:

`button[type="reset"] { background-color: transparent; color: #4a2c17; border: 2px solid #4a2c17; }`

שימו לב שצריך גם `border`, כי הכלל הכללי שלנו מגדיר `border: 0`.

</div>
</details>

<div dir="rtl" align="right">
<div dir="rtl" align="right">

---

## 🔍 טעויות שראינו בכיתה

| הטעות | מה קורה |
|--------|----------|
| בלי `box-sizing: border-box` | פריסות של `50%` + ריפוד נשברות |
| `margin: 0 auto` בלי `max-width` | לא קורה כלום |
| `border-collapse` חסר | קו כפול בין כל תא |
| `font: inherit` חסר בשדות | הטופס נראה שייך לאתר אחר |
| `padding` על `<img>` כדי להזיז אותה | מרווח **חיצוני** הוא `margin` |

</div>

<div dir="rtl" align="right">

---

## ⏭️ בשלב הבא

**[שלב 11 – כותרת דביקה ותווית מבצע](../step-11-css-display-pos/)**

[🗺️ חזרה למפת הפרויקט](../../)

</div>

<div dir="rtl" align="right">

# מודול 1 – מבוא ל-CSS וסלקטורים

[⬅ חלק א׳: HTML](../../01-html/07-media-iframe/) | [תוכן העניינים](../../README.md) | [הבא: צבעים וטיפוגרפיה ➡](../02-colors-typography/)

---

## 🎯 מטרות המודול

1. להבין מה CSS עושה ואיך משלבים אותו בדף.
2. לכתוב כלל CSS תקין ולהכיר את המונחים.
3. לשלוט בכל סוגי הסלקטורים.
4. להבין **ספציפיות** – למה "הכלל שלי לא עובד".
5. להבין ירושה ואת מנגנון המפל (Cascade).

---

## 1. מה זה CSS?

**CSS** = Cascading Style Sheets – גיליונות סגנון מדורגים.

אם HTML הוא השלד, CSS הוא העור והבגדים. תפקידו היחיד: לקבוע **איך** התוכן ייראה.

</div>

```html
<!-- HTML לבד -->
<h1>שלום</h1>
```

```css
/* CSS מוסיף את המראה */
h1 {
  color: navy;
  font-size: 40px;
  text-align: center;
}
```

<div dir="rtl" align="right">

---

## 2. שלוש דרכים לשלב CSS

### א. קובץ חיצוני (External) – ✅ הדרך הנכונה

</div>

```html
<head>
  <link rel="stylesheet" href="css/style.css">
</head>
```

<div dir="rtl" align="right">

**היתרונות:** קובץ אחד משרת את כל הדפים באתר; הדפדפן שומר אותו במטמון; הפרדה נקייה בין תוכן לעיצוב.

### ב. בתוך הדף (Internal)

</div>

```html
<head>
  <style>
    h1 { color: navy; }
  </style>
</head>
```

<div dir="rtl" align="right">

מתאים לדף בודד או לניסויים מהירים. בקורס הזה נשתמש בזה בדוגמאות כדי שכל קובץ יהיה עצמאי.

### ג. Inline – ❌ להימנע

</div>

```html
<h1 style="color: navy;">שלום</h1>
```

<div dir="rtl" align="right">

**למה להימנע?** אי אפשר לעשות שימוש חוזר, קשה מאוד לתחזק, וזה גובר כמעט על כל כלל אחר (ספציפיות 1000) – מה שהופך באגים לסיוט.

| דרך | שימוש חוזר | תחזוקה | מתי |
|-----|-------------|---------|------|
| חיצוני | ✅ מצוין | ✅ קלה | תמיד באתר אמיתי |
| פנימי | ❌ דף אחד | 🟡 בינונית | דף בודד, לימוד |
| Inline | ❌ אלמנט אחד | ❌ קשה | כמעט אף פעם |

---

## 3. תחביר – אנטומיה של כלל

</div>

```
סלקטור      מאפיין   ערך
   │           │       │
   ▼           ▼       ▼
   h1  {  color:  navy;  }
       │  └──────┬────┘ │
       │      הצהרה     │
       └── בלוק ההצהרות ┘
```

```css
h1 {
  color: navy;        /* הצהרה 1 */
  font-size: 40px;    /* הצהרה 2 */
  text-align: center; /* הצהרה 3 */
}
```

<div dir="rtl" align="right">

| מונח | פירוש |
|-------|--------|
| **סלקטור** (Selector) | מי מקבל את העיצוב |
| **מאפיין** (Property) | מה משנים |
| **ערך** (Value) | לאיזה ערך |
| **הצהרה** (Declaration) | `מאפיין: ערך;` |
| **כלל** (Rule) | סלקטור + בלוק הצהרות |

> ⚠️ **הנקודה-פסיק בסוף כל הצהרה היא חובה.** שכחה שלה שוברת את ההצהרה **הבאה** – ולכן הבאג נראה כאילו הוא במקום אחר.

**הערות ב-CSS:**

</div>

```css
/* זו הערה */

/*
  אפשר גם
  על כמה שורות
*/
```

<div dir="rtl" align="right">

> 💡 ב-CSS יש **רק** את הצורה `/* */`. אין `//` כמו ב-JavaScript.

---

## 4. סלקטורים בסיסיים

</div>

```css
/* לפי תגית – כל הפסקאות בדף */
p { color: gray; }

/* לפי מחלקה – כל אלמנט עם class="highlight" */
.highlight { background: yellow; }

/* לפי מזהה – האלמנט היחיד עם id="header" */
#header { height: 80px; }

/* אוניברסלי – כל אלמנט בדף */
* { margin: 0; }
```

<div dir="rtl" align="right">

| סלקטור | סימון | דוגמה |
|---------|--------|--------|
| תגית | ללא | `p`, `h1`, `div` |
| מחלקה | נקודה | `.card` |
| מזהה | סולמית | `#nav` |
| אוניברסלי | כוכבית | `*` |

### מחלקה מול מזהה – מתי מה?

| | `class` | `id` |
|---|---------|------|
| כמה בדף | ללא הגבלה | **אחד בלבד** |
| כמה לאלמנט | כמה שרוצים | אחד |
| ספציפיות | 10 | 100 |
| שימוש מומלץ | **כמעט תמיד** | עוגנים, JavaScript |

</div>

```html
<!-- לאלמנט אחד יכולות להיות כמה מחלקות -->
<div class="card featured large">...</div>
```

```css
.card { border: 1px solid gray; }
.featured { border-color: gold; }
.large { padding: 30px; }
```

<div dir="rtl" align="right">

> 💡 **כלל מעשי:** לעיצוב – השתמשו ב-`class`. שמרו את `id` לקישורי עוגן ול-JavaScript.

---

## 5. שילוב סלקטורים

</div>

```css
/* קיבוץ – אותו עיצוב לכמה סלקטורים */
h1, h2, h3 { font-family: Arial; }

/* צירוף – אלמנט p שיש לו גם class="intro" */
p.intro { font-size: 20px; }

/* שתי מחלקות יחד – חייב את שתיהן */
.card.featured { border-color: gold; }
```

<div dir="rtl" align="right">

> ⚠️ **שימו לב להבדל הקריטי:**
> `.a .b` (עם רווח) = אלמנט `b` **בתוך** `a`
> `.a.b` (בלי רווח) = אלמנט אחד שיש לו **את שתי המחלקות**

---

## 6. סלקטורים של יחסים

</div>

```css
/* צאצא (Descendant) – כל a בתוך nav, בכל עומק */
nav a { color: white; }

/* ילד ישיר (Child) – רק li שהם ילדים ישירים של ul */
ul > li { list-style: square; }

/* אח סמוך (Adjacent sibling) – ה-p שבא מיד אחרי h2 */
h2 + p { font-weight: bold; }

/* כל האחים שאחרי (General sibling) – כל p שאחרי h2 */
h2 ~ p { color: gray; }
```

<div dir="rtl" align="right">

</div>

```
<div>                    nav a       →  ✅ כל הקישורים, בכל עומק
  <ul>                   ul > li     →  ✅ רק ילדים ישירים
    <li>                 h2 + p      →  ✅ רק הראשון אחרי
      <a>                h2 ~ p      →  ✅ כולם אחרי, באותה רמה
```

<div dir="rtl" align="right">

---

## 7. סלקטורים של תכונות

</div>

```css
a[target]              { }  /* יש תכונת target */
a[target="_blank"]     { }  /* target שווה בדיוק */
a[href^="https"]       { }  /* מתחיל ב-  (^) */
a[href$=".pdf"]        { }  /* מסתיים ב- ($) */
a[href*="example"]     { }  /* מכיל     (*) */
input[type="email"]    { }  /* שימושי מאוד בטפסים */
```

<div dir="rtl" align="right">

**דוגמה שימושית – סימון אוטומטי של קישורים חיצוניים וקובצי PDF:**

</div>

```css
a[target="_blank"]::after { content: " ↗"; }
a[href$=".pdf"]::after    { content: " (PDF)"; }
```

<div dir="rtl" align="right">

---

## 8. פסאודו-מחלקות (Pseudo-classes)

מתארות **מצב** של אלמנט. נכתבות בנקודתיים אחת `:`.

</div>

```css
/* מצבי עכבר ומקלדת */
a:hover        { color: red; }      /* ריחוף עכבר */
a:active       { color: orange; }   /* בזמן הלחיצה */
a:focus        { outline: 2px solid blue; }  /* מיקוד */
a:focus-visible{ outline: 2px solid blue; }  /* מיקוד ממקלדת בלבד */
a:visited      { color: purple; }   /* קישור שביקרו בו */

/* מיקום ברשימה */
li:first-child  { font-weight: bold; }
li:last-child   { border: none; }
li:nth-child(2) { color: red; }      /* השני */
li:nth-child(odd)  { background: #eee; }  /* אי-זוגיים */
li:nth-child(even) { background: #fff; }  /* זוגיים */
li:nth-child(3n)   { color: blue; }  /* כל שלישי */

/* טפסים */
input:checked   { }
input:disabled  { }
input:required  { }
input:valid     { border-color: green; }
input:invalid   { border-color: red; }
input:placeholder-shown { }

/* שלילה */
li:not(.active) { opacity: 0.5; }

/* אחר */
p:empty { display: none; }
```

<div dir="rtl" align="right">

> ⚠️ **סדר קריטי לקישורים:** `:link` → `:visited` → `:hover` → `:active`.
> ראשי תיבות לזכירה: **LoVe HAte**. סדר אחר יגרום לחלק מהכללים לא לעבוד.

### `:hover` בנייד

אין עכבר בנייד. `:hover` שם מתנהג באופן בלתי צפוי. **לעולם אל תסתירו מידע חיוני מאחורי `:hover` בלבד.**

---

## 9. פסאודו-אלמנטים (Pseudo-elements)

יוצרים תוכן **וירטואלי**. נכתבים בשתי נקודתיים `::`.

</div>

```css
/* תוכן לפני ואחרי */
.required::after   { content: " *"; color: red; }
.quote::before     { content: "« "; }

/* חלקים באלמנט */
p::first-line      { font-weight: bold; }
p::first-letter    { font-size: 3em; float: right; }
::selection        { background: yellow; }  /* טקסט מסומן */
input::placeholder { color: #999; }
```

<div dir="rtl" align="right">

> ⚠️ ל-`::before` ו-`::after` **חובה** מאפיין `content`, אפילו ריק (`content: "";`). בלעדיו הם לא יופיעו כלל.

> ♿ **נגישות:** תוכן שנוצר ב-`content` אינו טקסט אמיתי. **אל תשימו שם מידע חיוני** – קוראי מסך מסוימים מתעלמים ממנו.

| | פסאודו-מחלקה `:` | פסאודו-אלמנט `::` |
|---|-------------------|--------------------|
| מתארת | **מצב** של אלמנט קיים | **חלק וירטואלי** חדש |
| דוגמאות | `:hover` `:first-child` | `::before` `::first-letter` |

---

## 10. ספציפיות (Specificity) – החלק הכי חשוב

**השאלה:** כשכמה כללים פונים לאותו אלמנט – מי מנצח?

**התשובה:** מי שיותר **ספציפי**.

### שיטת החישוב

לכל סלקטור מחשבים ניקוד בן 4 ספרות: `(inline, id, class, element)`

| רכיב | ניקוד |
|-------|--------|
| `style=""` inline | 1,0,0,0 |
| `#id` | 0,1,0,0 |
| `.class`, `[attr]`, `:hover` | 0,0,1,0 |
| תגית, `::before` | 0,0,0,1 |
| `*` | 0,0,0,0 |

### דוגמאות

| סלקטור | חישוב | ניקוד |
|---------|--------|--------|
| `p` | תגית אחת | 0,0,0,1 |
| `.intro` | מחלקה אחת | 0,0,1,0 |
| `p.intro` | תגית + מחלקה | 0,0,1,1 |
| `#main` | מזהה אחד | 0,1,0,0 |
| `#main p` | מזהה + תגית | 0,1,0,1 |
| `nav ul li a` | 4 תגיות | 0,0,0,4 |
| `.nav .item a` | 2 מחלקות + תגית | 0,0,2,1 |
| `style="..."` | inline | 1,0,0,0 |

**ההשוואה נעשית משמאל לימין**, ספרה-ספרה. `0,1,0,0` מנצח את `0,0,9,9` – **מזהה אחד חזק מתשע מחלקות.**

</div>

```css
p { color: blue; }              /* 0,0,0,1 */
.text { color: green; }         /* 0,0,1,0  ← מנצח את p */
#intro { color: red; }          /* 0,1,0,0  ← מנצח את שניהם */
```

```html
<p class="text" id="intro">איזה צבע יהיה לי?</p>
<!-- התשובה: אדום -->
```

<div dir="rtl" align="right">

### שובר שוויון

אם הניקוד **זהה** – **הכלל האחרון בקוד מנצח**.

</div>

```css
.box { color: blue; }
.box { color: red; }   /* ← זה מנצח, כי הוא אחרון */
```

<div dir="rtl" align="right">

### `!important` – ⚠️ נשק יום הדין

</div>

```css
p { color: blue !important; }  /* גובר כמעט על הכול */
```

<div dir="rtl" align="right">

**כמעט תמיד סימן לבעיה בארכיטקטורת ה-CSS.** ברגע שמשתמשים בו, הדרך היחידה לגבור עליו היא `!important` נוסף – וכך נכנסים למרוץ חימוש.

**מה לעשות במקום:** להגביר ספציפיות באופן טבעי, או לסדר מחדש את הקוד.

---

## 11. ירושה (Inheritance)

חלק מהמאפיינים עוברים אוטומטית מהורה לילדים.

</div>

```css
body {
  font-family: Arial;
  color: #333;
}
/* כל האלמנטים בדף יירשו את הפונט והצבע */
```

<div dir="rtl" align="right">

| ✅ עוברים בירושה | ❌ לא עוברים בירושה |
|-------------------|---------------------|
| `color` | `margin` `padding` |
| `font-family` `font-size` `font-weight` | `border` |
| `line-height` | `background` |
| `text-align` | `width` `height` |
| `direction` | `display` `position` |
| `visibility` `cursor` | |

**שליטה ידנית בירושה:**

</div>

```css
.child {
  color: inherit;  /* קח מההורה בכוח */
  border: initial; /* חזור לברירת המחדל */
  margin: unset;   /* inherit אם יורש, אחרת initial */
}
```

<div dir="rtl" align="right">

---

## 12. המפל (The Cascade) – סדר ההכרעה

כשיש התנגשות, הדפדפן מכריע לפי הסדר הבא:

| # | קריטריון |
|---|-----------|
| 1 | `!important` |
| 2 | **ספציפיות** (מזהה > מחלקה > תגית) |
| 3 | **סדר הופעה** – האחרון מנצח |
| 4 | ירושה מההורה |
| 5 | ברירת המחדל של הדפדפן |

> 💡 **איך מדבגים?** לחצו F12, בחרו את האלמנט, והסתכלו בלשונית **Styles**.
> הדפדפן מציג את כל הכללים לפי סדר, וכללים שהובסו מופיעים ~~עם קו חוצה~~.
> זה הכלי מספר 1 לפתרון "למה הכלל שלי לא עובד".

---

## 📋 סיכום – טבלת הסלקטורים

| סלקטור | בוחר |
|---------|-------|
| `p` | כל תגיות p |
| `.cls` | כל אלמנט עם המחלקה |
| `#id` | האלמנט עם המזהה |
| `*` | הכול |
| `a, b` | גם a וגם b |
| `a b` | b בתוך a (כל עומק) |
| `a > b` | b שהוא ילד ישיר של a |
| `a + b` | b שבא מיד אחרי a |
| `a ~ b` | כל b שאחרי a |
| `[attr]` | לפי תכונה |
| `:hover` | מצב |
| `::before` | חלק וירטואלי |
| `:not(x)` | כל מה שאינו x |

---

[⬅ HTML](../../01-html/07-media-iframe/) | [תוכן העניינים](../../README.md) | [הבא ➡](../02-colors-typography/)

</div>

<div dir="rtl" align="right">

# 🏗️ שלב 12 – סרגל ניווט ופוטר ב-Flex

> **הפרויקט המתמשך של הכיתה: קפה עתיד**
> נלמד ב־[CSS · מודול 5 – Flexbox](../../../02-css/05-flexbox/) · [⏮️ שלב 11](../step-11-css-display-pos/) · [🗺️ מפת הפרויקט](../../)

---

## 🎯 מה מוסיפים היום

- הופכים את הכותרת ל-**Flexbox**: לוגו בקצה אחד, ניווט בשני, ממורכזים אנכית.
- מסדרים את פריטי הניווט ב-`gap` במקום `margin` ידני.
- שורת פריט בתפריט: **שם מימין, מחיר משמאל**, על אותו קו בסיס.
- מיישרים את הפוטר – ומוחקים את `inline-block` מהשלב הקודם.

</div>

<div dir="rtl" align="right">

## 🌍 למה זה ככה בעולם האמיתי

### שני צירים, וזו כל התורה

</div>

```css
.site-header { display: flex; }
```

<div dir="rtl" align="right">

ברגע שכתבתם את זה, נולדו שני צירים:

| הציר | הכיוון (ב-`row`) | מי מיישר עליו |
|-------|---------------------|-----------------|
| **ראשי** | אופקי | `justify-content` |
| **משני** | אנכי | `align-items` |

**איך זוכרים בלי לבלבל:**
> `justify` = לאורך הזרימה. `align` = לרוחב הזרימה.

**ובאתר בעברית יש בונוס:** `flex-direction: row` הולך לפי כיוון המסמך.
כי כתבנו `dir="rtl"`, "ההתחלה" היא **ימין**. הפריט הראשון ב-HTML יופיע ראשון
מימין – בלי שכתבנו שורת CSS על כיוון.

זו הסיבה ש-Flexbox היה מהפכה לאתרים בעברית: לפניו, מעבר בין RTL ל-LTR
דרש לשכתב `float: right` ל-`float: left` בכל הקובץ.

### `justify-content: space-between` – התבנית של כל סרגל ניווט בעולם

</div>

```css
.site-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

<div dir="rtl" align="right">

**כל השטח הפנוי הולך לרווחים שבין הפריטים**, והראשון והאחרון נצמדים לקצוות.

זה בדיוק "לוגו בצד אחד, תפריט בצד השני". פתחו כל אתר ותמצאו את שלוש
השורות האלה.

### `gap` – למה הוא טוב יותר מ-`margin`

בשלב 11 כתבנו `margin-left: 18px` לכל `<li>`. הבעיה: **גם לאחרון**, וזה
יוצר רווח מיותר בקצה.

</div>

```css
#main-nav ul { display: flex; gap: 20px; }
```

<div dir="rtl" align="right">

`gap` נותן רווח **רק בין** פריטים. אין מקרה קצה, אין `:last-child`.

### `align-items: baseline` – הפרט שמפריד בין "בסדר" ל"מדויק"

בשורת פריט תפריט יש שם בגודל אחד ומחיר בגודל אחר.

- `center` → שני הטקסטים ממורכזים במלבן, והאותיות לא יושבות על אותו קו.
- **`baseline`** → **קו הבסיס של האותיות** מיושר. בדיוק כמו בתפריט מודפס.

</div>
<div dir="rtl" align="right">

---

## 🔨 שלב אחר שלב

### 1. הכותרת

</div>

```css
.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}
```

<div dir="rtl" align="right">

**`flex-wrap: wrap` היא רשת ביטחון.** בלעדיה, במסך צר, Flexbox ידחוס את הפריטים
עד שהטקסט יתחיל להישבר באמצע מילה. עם `wrap`, הניווט פשוט יורד שורה.

זה נותן לנו התנהגות סבירה בטלפון עוד לפני שכתבנו Media Query אחת.

### 2. הניווט

</div>

```css
#main-nav ul {
  display: flex;
  gap: 20px;
  margin: 0;
}

#main-nav li {
  display: block;   /* מבטלים את inline-block מהשלב הקודם */
  margin: 0;
}
```

<div dir="rtl" align="right">

**שימו לב שמחקנו קוד.** ילדים של Flex container הופכים לפריטי Flex ממילא –
ה-`display` שלהם כמעט לא רלוונטי. זה חלק מהעניין: Flexbox מחליף פתרונות ישנים.

### 3. שורת פריט בתפריט

</div>

```css
.menu-cat li {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}
```

<div dir="rtl" align="right">

ה-`<li>` עצמו הופך למכל Flex. `<b>` השם ו-`<small>` ההערה נדחפים לצד אחד,
המחיר לצד השני.

### 4. הפוטר

</div>

```css
.site-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
```

<div dir="rtl" align="right">

### 5. הקיצור `flex` – מה שכדאי לדעת גם אם לא השתמשנו בו היום

</div>

```css
flex: 1;         /* = flex: 1 1 0  – "קח חלק שווה מהמקום" */
flex: 0 0 auto;  /* "אל תגדל, אל תתכווץ" */
```

<div dir="rtl" align="right">

| החלק | המשמעות |
|-------|-----------|
| `flex-grow` | כמה לגדול כשיש מקום פנוי |
| `flex-shrink` | כמה להתכווץ כשחסר מקום |
| `flex-basis` | הגודל ההתחלתי |

**`flex: 1` על שני פריטים** = שתי עמודות שוות. זה הקיצור שתשתמשו בו הכי הרבה.

---

## 💻 מה נוסף ל-`style.css` היום

</div>

```css
/* ============================================================
   שלב 12 · CSS מודול 5 – Flexbox
   ============================================================ */

.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.logo {
  line-height: 0;          /* מבטל את רווח השורה מתחת לתמונה */
}

.logo img {
  width: 150px;
  height: auto;
}

#main-nav ul {
  display: flex;
  gap: 20px;
  margin: 0;
}

#main-nav li {
  display: block;          /* ב-flex כבר לא צריך inline-block */
  margin: 0;
}

.site-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.site-footer p,
.site-footer address {
  margin: 0;
}

/* שורת פריט בתפריט: שם מימין, מחיר משמאל */
.menu-cat li {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}
```

<div dir="rtl" align="right">

## 👀 מה רואים במסך

- **הכותרת סוף סוף נראית כמו סרגל אתר:** לוגו בצד ימין, ניווט בשמאל, מיושרים אנכית.
- הלוגו קטן יותר (150px) ומתאים לסרגל.
- **בתפריט:** שם המנה בימין השורה, המחיר בשמאלה, קו נקי ביניהם.
- בפוטר: הקרדיט בצד אחד, פרטי הקשר בשני.
- **צמצמו את החלון** – הניווט יורד שורה במקום להידחס. זה ה-`flex-wrap`.

---

## ✋ אתגר לכיתה

1. הוסיפו לכותרת פריט שלישי: `<span class="tagline">מ-2015</span>` בין הלוגו לניווט.
   מה עשה `space-between` עם שלושה פריטים?
2. גרמו לניווט להיצמד למרכז הכותרת, והלוגו והסלוגן לקצוות.
3. **קלאסיקה:** מרכזו את המילה "טוען…" במלבן בגובה 200px – גם אופקית וגם אנכית.

</div>
</div>

<details dir="rtl">
<summary><b>💡 הצגת הפתרון</b></summary>

<div dir="rtl" align="right">

**1.** `space-between` מפזר את **כל** המקום הפנוי בין הפריטים באופן שווה:
ראשון בקצה, שלישי בקצה, השני **בדיוק באמצע**. ככל שמוסיפים פריטים,
הרווחים מתחלקים מחדש.

**2.** נותנים לניווט לגדול ולתפוס את המקום הפנוי:

`#main-nav { flex: 1; display: flex; justify-content: center; }`

הניווט לוקח את כל השטח האמצעי וממרכז את התוכן שלו בתוכו.

**3.** שלוש שורות, וזה עובד לכל תוכן בכל גודל:

`.loading { display: flex; align-items: center; justify-content: center; height: 200px; }`

**זו התשובה ל"איך ממרכזים אנכית ב-CSS"** – שאלה שהייתה בדיחה במקצוע במשך 15 שנה.

</div>
</details>

<div dir="rtl" align="right">
<div dir="rtl" align="right">

---

## 🔍 טעויות שראינו בכיתה

| הטעות | מה קורה |
|--------|----------|
| `display: flex` על הילד במקום על ההורה | הילד עצמו הופך למכל. שום דבר לא זז |
| `justify-content` ו-`align-items` מוחלפים | מיישרים על הציר הלא נכון |
| `flex-direction: column` ואז `align-items` למרכוז אופקי | בעמודה הצירים **מתחלפים** |
| שכחת `flex-wrap: wrap` | בטלפון הכול נדחס עד שנשבר |
| `margin` לרווחים בין פריטים | `gap` – בלי מקרה קצה בפריט האחרון |

</div>

<div dir="rtl" align="right">

---

## ⏭️ בשלב הבא

**[שלב 13 – רשת התפריט והגלריה](../step-13-css-grid/)**

[🗺️ חזרה למפת הפרויקט](../../)

</div>

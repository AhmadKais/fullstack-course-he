<div dir="rtl" align="right">

# מודול 4 – קישורים ותמונות

[⬅ הקודם](../03-lists-tables/) | [תוכן העניינים](../../README.md) | [הבא: טפסים ➡](../05-forms/)

---

## 🎯 מטרות המודול

1. ליצור קישורים פנימיים, חיצוניים, לעוגן, למייל ולטלפון.
2. להבין נתיבים יחסיים ומוחלטים ולנווט בעץ תיקיות.
3. להטמיע תמונות נכון, כולל `alt` תקין.
4. להכיר תמונות רספונסיביות (`srcset`, `<picture>`).
5. לבנות דף עם ניווט תקין בין מספר קבצים.

---

## 1. קישורים – `<a>`

התגית שהפכה את הרשת לרשת: **Anchor**.

</div>

```html
<a href="https://www.google.com">לחצו כאן</a>
```

<div dir="rtl" align="right">

| תכונה | תפקיד | ערכים |
|--------|--------|--------|
| `href` | היעד (חובה) | כתובת, נתיב, `#id`, `mailto:`, `tel:` |
| `target` | איפה להיפתח | `_self` (ברירת מחדל) / `_blank` (לשונית חדשה) |
| `rel` | היחס ליעד | `noopener` `noreferrer` `nofollow` |
| `download` | הורדה במקום פתיחה | שם הקובץ (אופציונלי) |
| `title` | רמז בריחוף | טקסט |

---

## 2. חמשת סוגי הקישורים

</div>

```html
<!-- 1. קישור חיצוני (לאתר אחר) -->
<a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer">
  MDN – תיעוד רשמי
</a>

<!-- 2. קישור פנימי (לדף אחר באתר שלי) -->
<a href="about.html">אודות</a>
<a href="pages/contact.html">צור קשר</a>

<!-- 3. קישור לעוגן (לנקודה בתוך אותו דף) -->
<a href="#section-3">קפצו לסעיף 3</a>
...
<h2 id="section-3">סעיף 3</h2>

<!-- 4. קישור למייל -->
<a href="mailto:info@example.com">שלחו לנו מייל</a>
<a href="mailto:info@example.com?subject=פנייה מהאתר">עם נושא מוכן</a>

<!-- 5. קישור לטלפון (שימושי מאוד בנייד) -->
<a href="tel:+972501234567">050-1234567</a>
```

<div dir="rtl" align="right">

> ⚠️ **חובת אבטחה:** בכל `target="_blank"` הוסיפו `rel="noopener noreferrer"`.
> בלעדיו, הדף שנפתח יכול לגשת לדף שלכם דרך `window.opener` – פרצת אבטחה ידועה.

---

## 3. נתיבים – החלק שהכי מבלבל

נניח את מבנה התיקיות הבא:

</div>

```
my-site/
├── index.html
├── about.html
├── images/
│   ├── logo.png
│   └── team.jpg
└── pages/
    ├── contact.html
    └── services.html
```

<div dir="rtl" align="right">

### נתיב יחסי (Relative) – מומלץ

| מ-איפה | ל-איפה | הנתיב |
|---------|---------|--------|
| `index.html` | `about.html` | `about.html` |
| `index.html` | `pages/contact.html` | `pages/contact.html` |
| `index.html` | `images/logo.png` | `images/logo.png` |
| `pages/contact.html` | `index.html` | `../index.html` |
| `pages/contact.html` | `images/logo.png` | `../images/logo.png` |
| `pages/contact.html` | `pages/services.html` | `services.html` |

**הכללים:**

| סימון | משמעות |
|--------|---------|
| `file.html` | קובץ **באותה תיקייה** |
| `folder/file.html` | **תיקייה למטה** |
| `../file.html` | **תיקייה אחת למעלה** |
| `../../file.html` | שתי תיקיות למעלה |
| `/file.html` | משורש האתר (Root-relative) |

### נתיב מוחלט (Absolute)

</div>

```html
<a href="https://www.example.com/pages/contact.html">קישור מלא</a>
```

<div dir="rtl" align="right">

**מתי משתמשים במה?**

| סוג | מתי |
|-----|-----|
| יחסי | תמיד, בתוך האתר שלכם. האתר יעבוד גם אם תעבירו אותו לשרת אחר. |
| מוחלט | לקישור לאתר חיצוני. |

> 💡 **טיפ לתלמידים:** כשאתם נתקעים עם נתיב, ציירו את עץ התיקיות על נייר וצעדו בו באצבע.

---

## 4. תמונות – `<img>`

</div>

```html
<img src="images/cat.jpg" alt="חתול כתום ישן על ספה" width="400" height="300">
```

<div dir="rtl" align="right">

| תכונה | חובה? | תפקיד |
|--------|--------|--------|
| `src` | ✅ | נתיב לקובץ התמונה |
| `alt` | ✅ | תיאור טקסטואלי |
| `width` / `height` | מומלץ מאוד | מונע "קפיצת" הדף בזמן הטעינה |
| `loading="lazy"` | מומלץ | טוען את התמונה רק כשמגיעים אליה |
| `title` | לא | רמז בריחוף |

---

## 5. `alt` – התכונה הכי חשובה ב-`<img>`

**למי זה משמש?**

1. **עיוורים** – קורא המסך מקריא את ה-`alt`.
2. **כשהתמונה לא נטענת** – הטקסט מוצג במקומה.
3. **מנועי חיפוש** – ככה גוגל "רואה" תמונות.
4. **חיסכון בנתונים** – מי שגולש עם תמונות מכובות.

### איך כותבים `alt` טוב?

| ❌ רע | ✅ טוב | למה |
|--------|---------|------|
| `alt="תמונה"` | `alt="שלושה מפתחים עובדים סביב שולחן"` | תארו מה **רואים** |
| `alt="IMG_2043.jpg"` | `alt="עוגת שוקולד מקושטת בתותים"` | שם קובץ אינו תיאור |
| `alt="תמונה של כלב"` | `alt="כלב לברדור שחור רץ על חוף הים"` | אל תכתבו "תמונה של" – ידוע שזו תמונה |

### תמונה דקורטיבית

אם התמונה היא **קישוט בלבד** (קו מפריד, רקע), משאירים `alt` **ריק**:

</div>

```html
<img src="divider.png" alt="">
```

<div dir="rtl" align="right">

> ⚠️ `alt=""` (ריק) אומר לקורא המסך "דלג עליי". **השמטת `alt` לגמרי** גורמת לקורא המסך להקריא את שם הקובץ – חוויה נוראית.

---

## 6. פורמטים של תמונות

| פורמט | מתי משתמשים | שקיפות | אנימציה |
|--------|--------------|---------|----------|
| **JPG** | תצלומים | ❌ | ❌ |
| **PNG** | לוגו, גרפיקה, שקיפות | ✅ | ❌ |
| **SVG** | לוגו, אייקונים, גרפים | ✅ | ✅ |
| **WebP** | תחליף מודרני ל-JPG/PNG, קל יותר | ✅ | ✅ |
| **GIF** | אנימציות קצרות | חלקית | ✅ |

**SVG** הוא וקטורי – הוא נראה חד בכל גודל ומשקלו זעיר. מושלם ללוגו ולאייקונים.

---

## 7. `<figure>` ו-`<figcaption>`

כשלתמונה יש כיתוב:

</div>

```html
<figure>
  <img src="chart.png" alt="גרף עמודות של מכירות לפי חודש">
  <figcaption>איור 1: מכירות רבעון ראשון 2026</figcaption>
</figure>
```

<div dir="rtl" align="right">

היתרון: הקשר בין התמונה לכיתוב מוצהר **סמנטית**, לא רק ויזואלית.

---

## 8. תמונות רספונסיביות

### `srcset` – אותה תמונה, גדלים שונים

</div>

```html
<img
  src="photo-800.jpg"
  srcset="photo-400.jpg 400w,
          photo-800.jpg 800w,
          photo-1600.jpg 1600w"
  sizes="(max-width: 600px) 100vw, 50vw"
  alt="נוף הרים">
```

<div dir="rtl" align="right">

הדפדפן בוחר בעצמו את הקובץ המתאים לגודל המסך – חוסך נתונים בנייד.

### `<picture>` – תמונות שונות לגמרי

</div>

```html
<picture>
  <!-- בנייד: תמונה מרובעת -->
  <source media="(max-width: 600px)" srcset="hero-square.jpg">
  <!-- בדסקטופ: תמונה רחבה -->
  <source media="(min-width: 601px)" srcset="hero-wide.jpg">
  <!-- גיבוי לדפדפנים ישנים – חובה! -->
  <img src="hero-wide.jpg" alt="צוות החברה">
</picture>
```

<div dir="rtl" align="right">

**גם לפורמטים מודרניים:**

</div>

```html
<picture>
  <source srcset="photo.webp" type="image/webp">
  <img src="photo.jpg" alt="תיאור התמונה">
</picture>
```

<div dir="rtl" align="right">

---

## 9. תמונה כקישור

</div>

```html
<a href="index.html">
  <img src="logo.svg" alt="לוגו החברה – חזרה לדף הבית">
</a>
```

<div dir="rtl" align="right">

> 💡 כשתמונה היא קישור, ה-`alt` צריך לתאר את **יעד הקישור**, לא רק את התמונה.

---

## 📋 סיכום

| תגית / תכונה | תפקיד |
|---------------|--------|
| `<a href>` | קישור |
| `target="_blank"` + `rel="noopener noreferrer"` | פתיחה בלשונית חדשה, בבטחה |
| `mailto:` / `tel:` | קישור למייל / לטלפון |
| `#id` | קישור לעוגן בדף |
| `../` | תיקייה אחת למעלה |
| `<img src alt>` | תמונה |
| `loading="lazy"` | טעינה עצלה |
| `<figure>` `<figcaption>` | תמונה עם כיתוב |
| `srcset` / `<picture>` | תמונות רספונסיביות |

---

[⬅ הקודם](../03-lists-tables/) | [תוכן העניינים](../../README.md) | [הבא ➡](../05-forms/)

</div>

<div dir="rtl" align="right">

# מודול 6 – HTML סמנטי, נגישות ו-SEO

[⬅ הקודם](../05-forms/) | [תוכן העניינים](../../README.md) | [הבא: מדיה ו-iframe ➡](../07-media-iframe/)

---

## 🎯 מטרות המודול

1. להבין מהי סמנטיקה ולמה `<div>` לכל דבר זו בעיה.
2. להכיר את כל התגיות הסמנטיות ולדעת מתי להשתמש בכל אחת.
3. לבנות שלד דף תקני.
4. להכיר עקרונות נגישות בסיסיים ותפקידי ARIA.
5. להוסיף מטא-תגיות ל-SEO ולרשתות חברתיות.

---

## 1. מה זו סמנטיקה?

**סמנטי = בעל משמעות.**

</div>

```html
<!-- ❌ "Div Soup" – למחשב זה חסר משמעות -->
<div class="header">
  <div class="nav">...</div>
</div>
<div class="main">
  <div class="article">...</div>
</div>
<div class="footer">...</div>

<!-- ✅ סמנטי – המחשב מבין את המבנה -->
<header>
  <nav>...</nav>
</header>
<main>
  <article>...</article>
</main>
<footer>...</footer>
```

<div dir="rtl" align="right">

**התוצאה הוויזואלית זהה לגמרי.** ההבדל הוא במי שקורא את הקוד:

| מי | מה מרוויח מסמנטיקה |
|-----|---------------------|
| **קורא מסך** | יכול לנווט: "קפוץ לתוכן הראשי", "רשימת הכותרות", "אזורי הדף" |
| **מנוע חיפוש** | מבין מה התוכן המרכזי ומה תפריט. משפיע ישירות על הדירוג |
| **הדפדפן** | מציע "מצב קריאה" שמסתיר את כל מה שאינו `<article>` |
| **מפתח אחר** | מבין את המבנה במבט אחד, בלי לקרוא את ה-CSS |

---

## 2. שלד הדף – התגיות המבניות

</div>

```
┌─────────────────────────────────────────────┐
│  <header>                                   │
│    <nav> ... </nav>                         │
│  </header>                                  │
├──────────────────────────┬──────────────────┤
│  <main>                  │  <aside>         │
│    <article>             │                  │
│      <section> ... </>   │   תוכן צדדי      │
│      <section> ... </>   │                  │
│    </article>            │                  │
│  </main>                 │                  │
├──────────────────────────┴──────────────────┤
│  <footer>                                   │
└─────────────────────────────────────────────┘
```

| תגית | תפקיד | כמה בדף? |
|-------|--------|-----------|
| `<header>` | ראש הדף או ראש של אזור | כמה (אחד ראשי) |
| `<nav>` | תפריט ניווט | כמה |
| `<main>` | התוכן הראשי והייחודי | **אחד בלבד** |
| `<article>` | תוכן שעומד בפני עצמו | כמה |
| `<section>` | קטע נושאי בעל כותרת | כמה |
| `<aside>` | תוכן צדדי / משני | כמה |
| `<footer>` | תחתית הדף או של אזור | כמה |
| `<figure>` `<figcaption>` | מדיה עם כיתוב | כמה |
| `<address>` | פרטי קשר | כמה |
| `<time>` | תאריך/שעה במבנה מכונה | כמה |
| `<details>` `<summary>` | תוכן מתקפל | כמה |
| `<mark>` | סימון | כמה |

---

## 3. `<article>` מול `<section>` מול `<div>`

זו השאלה הכי נפוצה במודול. הנה מבחן פשוט:

| שאלה | התשובה |
|-------|---------|
| האם התוכן **הגיוני בפני עצמו** אם אעתיק אותו לאתר אחר? | → `<article>` |
| האם זהו **קטע נושאי** בתוך משהו גדול יותר, עם כותרת משלו? | → `<section>` |
| האם אני צריך את זה **רק כדי לעצב** ב-CSS? | → `<div>` |

**דוגמאות ל-`<article>`:** פוסט בבלוג, מוצר בחנות, תגובה, כרטיס חדשות, טוויט.

**דוגמאות ל-`<section>`:** "אודותינו", "השירותים שלנו", "פרק 3", "שאלות נפוצות".

</div>

```html
<main>
  <h1>הבלוג שלי</h1>

  <!-- כל פוסט הוא article - הוא עומד בפני עצמו -->
  <article>
    <header>
      <h2>איך למדתי לתכנת</h2>
      <p>מאת דנה כהן · <time datetime="2026-03-01">1 במרץ 2026</time></p>
    </header>

    <!-- בתוך המאמר, section מחלק לקטעים נושאיים -->
    <section>
      <h3>ההתחלה</h3>
      <p>...</p>
    </section>

    <section>
      <h3>הקושי הראשון</h3>
      <p>...</p>
    </section>

    <footer>
      <p>תגיות: לימודים, תכנות</p>
    </footer>
  </article>
</main>
```

<div dir="rtl" align="right">

> ⚠️ **כלל חשוב:** ל-`<section>` צריכה להיות **כותרת**. אם אין כותרת טבעית – כנראה שזה `<div>`.

---

## 4. `<main>` – התגית שהכי חשוב לזכור

</div>

```html
<body>
  <header>...</header>
  <nav>...</nav>

  <main>
    <!-- כאן, ורק כאן, התוכן הייחודי של הדף הזה -->
  </main>

  <footer>...</footer>
</body>
```

<div dir="rtl" align="right">

**כללים:**
- **אחד בלבד** בדף.
- לא בתוך `<article>`, `<aside>`, `<header>`, `<footer>` או `<nav>`.
- מכיל רק תוכן **ייחודי לדף הזה** – לא תפריט שחוזר בכל הדפים.

**למה זה קריטי?** קורא מסך מציע קיצור "קפוץ לתוכן הראשי". בלי `<main>` המשתמש נאלץ להאזין לכל התפריט בכל דף מחדש.

---

## 5. `<details>` ו-`<summary>` – אקורדיון בלי JavaScript

</div>

```html
<details>
  <summary>מה כלול במחיר?</summary>
  <p>המחיר כולל את כל 28 המפגשים, חומרי הלימוד וליווי אישי.</p>
</details>

<details open>
  <summary>האם נדרש ידע קודם?</summary>
  <p>לא. הקורס מתחיל מאפס.</p>
</details>
```

<div dir="rtl" align="right">

התגית `open` פותחת את הפריט כברירת מחדל. זהו רכיב מובנה, נגיש ועובד עם מקלדת – בלי שורת JS אחת.

---

## 6. נגישות (Accessibility / a11y)

**נגישות = שהאתר יהיה שמיש לכולם**, כולל אנשים עם מוגבלות ראייה, שמיעה, מוטוריקה או קוגניציה.

### עקרונות מעשיים

| עיקרון | מה עושים |
|---------|-----------|
| **טקסט חלופי** | `alt` לכל תמונה משמעותית |
| **היררכיית כותרות** | `h1` אחד, בלי דילוגים |
| **תוויות בטפסים** | `<label for>` לכל שדה |
| **ניווט במקלדת** | כל פעולה זמינה בעזרת `Tab` ו-`Enter` |
| **ניגודיות צבעים** | יחס 4.5:1 לפחות בין טקסט לרקע |
| **שפת הדף** | `<html lang="he">` |
| **טקסט קישור ברור** | "קראו על מדיניות הפרטיות", לא "לחצו כאן" |
| **לא רק צבע** | אל תסמנו שגיאה בצבע אדום בלבד – הוסיפו אייקון או טקסט |

### קישור דילוג

</div>

```html
<body>
  <a href="#main-content" class="skip-link">דלגו לתוכן הראשי</a>

  <header>
    <nav><!-- 30 קישורים --></nav>
  </header>

  <main id="main-content">
    ...
  </main>
</body>
```

<div dir="rtl" align="right">

זהו הקישור הראשון בדף. הוא מוסתר ויזואלית ומופיע רק בלחיצה על `Tab` – ומאפשר למשתמש מקלדת לדלג על כל התפריט.

### ARIA – מתי (ובעיקר: מתי לא)

</div>

```html
<!-- ✅ תגית סמנטית - עדיף תמיד -->
<button>שלח</button>

<!-- ❌ div + ARIA - הרבה עבודה, פחות טוב -->
<div role="button" tabindex="0" aria-pressed="false">שלח</div>
```

<div dir="rtl" align="right">

> **כלל ARIA הראשון:** *אל תשתמשו ב-ARIA אם יש תגית HTML שעושה את זה.*

תכונות ARIA שכן שימושיות:

| תכונה | מתי |
|--------|------|
| `aria-label` | כשאין טקסט גלוי, למשל כפתור עם אייקון בלבד |
| `aria-labelledby` | קישור לאלמנט שמשמש כתווית |
| `aria-describedby` | קישור להסבר נוסף |
| `aria-hidden="true"` | להסתיר אלמנט דקורטיבי מקוראי מסך |
| `aria-live="polite"` | להכריז על תוכן שמשתנה דינמית |
| `role="alert"` | הודעת שגיאה דחופה |

</div>

```html
<!-- כפתור עם אייקון בלבד -->
<button aria-label="סגירת החלון">✕</button>

<!-- אייקון דקורטיבי ליד טקסט -->
<p><span aria-hidden="true">📧</span> צרו קשר</p>
```

<div dir="rtl" align="right">

---

## 7. SEO – מטא-תגיות

</div>

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- כותרת: 50-60 תווים. מופיעה בגוגל ובלשונית -->
  <title>קורס Full Stack בעברית | מכללת עתיד</title>

  <!-- תיאור: 150-160 תווים. מופיע מתחת לכותרת בגוגל -->
  <meta name="description"
        content="קורס Full Stack מלא בעברית: HTML, CSS ו-JavaScript. 28 מפגשים, ליווי אישי ופרויקט גמר.">

  <!-- כתובת קנונית - מונעת תוכן כפול -->
  <link rel="canonical" href="https://example.com/course">

  <!-- ===== Open Graph: כך הקישור נראה בפייסבוק / וואטסאפ ===== -->
  <meta property="og:title" content="קורס Full Stack בעברית">
  <meta property="og:description" content="למדו לבנות אתרים מאפס.">
  <meta property="og:image" content="https://example.com/preview.jpg">
  <meta property="og:url" content="https://example.com/course">
  <meta property="og:type" content="website">

  <!-- ===== Twitter Card ===== -->
  <meta name="twitter:card" content="summary_large_image">
</head>
```

<div dir="rtl" align="right">

> ⚠️ שימו לב: `og:` משתמש ב-`property=`, בעוד ש-`description` משתמש ב-`name=`. זו טעות נפוצה.

### מה משפיע על SEO ב-HTML?

| גורם | חשיבות |
|-------|---------|
| `<title>` ייחודי לכל דף | ⭐⭐⭐ |
| `<meta name="description">` | ⭐⭐⭐ |
| `<h1>` אחד וברור | ⭐⭐⭐ |
| היררכיית כותרות תקינה | ⭐⭐ |
| `alt` בתמונות | ⭐⭐ |
| תגיות סמנטיות | ⭐⭐ |
| מהירות טעינה | ⭐⭐⭐ |
| התאמה לנייד | ⭐⭐⭐ |

---

## 📋 סיכום – שלד דף תקני

</div>

```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="תיאור הדף">
  <title>כותרת הדף</title>
</head>
<body>

  <a href="#main" class="skip-link">דלגו לתוכן</a>

  <header>
    <h1>שם האתר</h1>
    <nav aria-label="ניווט ראשי">
      <ul>
        <li><a href="/">בית</a></li>
        <li><a href="/about">אודות</a></li>
      </ul>
    </nav>
  </header>

  <main id="main">
    <article>
      <h2>כותרת המאמר</h2>
      <p>התוכן...</p>
    </article>
  </main>

  <aside>
    <h2>מאמרים נוספים</h2>
  </aside>

  <footer>
    <address>צרו קשר: <a href="mailto:info@site.com">info@site.com</a></address>
    <p><small>&copy; 2026</small></p>
  </footer>

</body>
</html>
```

<div dir="rtl" align="right">

---

[⬅ הקודם](../05-forms/) | [תוכן העניינים](../../README.md) | [הבא ➡](../07-media-iframe/)

</div>

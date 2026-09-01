<div dir="rtl" align="right">

# ✅ פתרונות – שאלות חזרה מודול 6

---

## חלק א׳ – אמריקאיות

| # | תשובה | הסבר |
|---|--------|-------|
| 1 | **א** | `<main>` אחד בלבד. הוא מסמן את התוכן הייחודי לדף, ומאפשר את קיצור "קפוץ לתוכן הראשי". |
| 2 | **ב** | מבחן ההעתקה: אם התוכן מובן גם בפיד RSS או בניוזלטר – זה `<article>`. |
| 3 | **ב** | ל-`<section>` צריכה להיות כותרת. בלי כותרת – כנראה שזה `<div>`. |
| 4 | **ב** | חוסך למשתמש מקלדת מעבר על עשרות קישורי תפריט בכל דף מחדש. |
| 5 | **ב** | "אל תשתמשו ב-ARIA אם יש תגית HTML שעושה את זה". `<button>` תמיד עדיף על `<div role="button">`. |
| 6 | **ב** | `<meta property="og:title" content="...">`. שימוש ב-`name` הוא הסיבה מספר 1 לתצוגה מקדימה שבורה בוואטסאפ. |
| 7 | **ב** | מוחק את המסגרת שמראה למשתמש מקלדת איפה הוא נמצא. אם רוצים לעצב – מחליפים בסימון אחר, לא מוחקים. |
| 8 | **ג** | `<address>` מיועדת בדיוק לפרטי קשר. (לא לכתובת דואר סתם בתוך טקסט.) |
| 9 | **ב** | האלמנט נשאר גלוי על המסך אך נעלם מעץ הנגישות. מתאים לאייקונים דקורטיביים. |
| 10 | **ג** | 150–160 תווים. יותר מזה – גוגל חותך עם שלוש נקודות. |

---

## חלק ב׳ – סיווג תגיות

| # | התיאור | התגית |
|---|---------|--------|
| 11 | תפריט ניווט ראשי | `<nav>` |
| 12 | מודעה בסרגל צד | `<aside>` |
| 13 | תמונה עם כיתוב | `<figure>` + `<figcaption>` |
| 14 | תאריך פרסום | `<time datetime="2026-03-15">` |
| 15 | אקורדיון שאלה-תשובה | `<details>` + `<summary>` |

---

## חלק ג׳ – פתוחות

### 16. למה `<header>` עדיף על `<div class="header">`

התוצאה על המסך אכן זהה. ההבדל הוא שהמחלקה `class="header"` היא **המצאה פרטית שלכם** – שום מכונה בעולם לא יודעת מה היא אומרת. `<header>` היא **חלק מהתקן**, וכל תוכנה בעולם מבינה אותה.

| הקהל שנפגע | איך |
|-------------|------|
| **משתמשי קוראי מסך** | קורא מסך בונה רשימת "אזורי דף" (landmarks) ומאפשר לקפוץ ביניהם בלחיצת מקש. `<div>` לא מופיע ברשימה הזו. משתמש עיוור נאלץ להאזין לדף מההתחלה בכל פעם. |
| **מנועי חיפוש** | גוגל צריך להבין מה התוכן העיקרי ומה ניווט חוזר. עם `<main>` ו-`<nav>` זה מפורש. בלעדיהם – ניחוש. |
| **מפתחים אחרים (וכם בעוד חצי שנה)** | קוד סמנטי קריא במבט אחד. ב-Div Soup צריך לפתוח את ה-CSS כדי להבין מה כל חלק עושה. |
| **בונוס – משתמשי "מצב קריאה"** | הדפדפן מזהה `<article>` ומציג רק אותו. בלעדיו הפיצ׳ר לא עובד. |

**נקודה מעשית:** המעבר לסמנטי לא עולה כלום. אותו מספר תווים, אותה תוצאה ויזואלית, אפס עבודה נוספת.

---

### 17. תגיות לדף בלוג

| החלק | התגית | הנימוק |
|-------|--------|---------|
| **א. לוגו ותפריט** | `<header>` המכיל `<nav>` | `<header>` = ראש האתר; `<nav>` = קבוצת קישורי ניווט |
| **ב. פוסט בודד** | `<article>` | עומד בפני עצמו – ניתן להעביר לפיד RSS או לניוזלטר והוא עדיין מובן |
| **ג. "קרא גם" בסרגל** | `<aside>` | תוכן משני, קשור אך לא מרכזי לדף |
| **ד. מחבר ותאריך** | `<p>` עם `<time datetime="...">` בתוך `<header>` של ה-`<article>` | `<time>` נותן תאריך בפורמט שמכונה מבינה; `<header>` פנימי מקבץ את המטא-מידע |
| **ה. עטיפה למרכוז** | `<div>` | אין לה שום משמעות תוכנית – זה בדיוק תפקידו של `<div>` |

</div>

```html
<article>
  <header>
    <h2>איך למדתי לתכנת</h2>
    <p>מאת דנה כהן · <time datetime="2026-03-01">1 במרץ 2026</time></p>
  </header>
  <p>התוכן...</p>
</article>
```

<div dir="rtl" align="right">

---

### 18. חמש בעיות הנגישות

| # | הבעיה | התיקון |
|---|--------|---------|
| 1 | **חסרים `lang` ו-`dir`** בתגית `<html>` – קורא מסך ינסה להקריא עברית במבטא אנגלי | `<html lang="he" dir="rtl">` |
| 2 | **`<div class="title">` במקום כותרת** – אין `<h1>`, אין תוכן עניינים לניווט | `<h1>החנות שלנו</h1>` |
| 3 | **תמונה ללא `alt`** – קורא המסך יקריא `shop.jpg` | `<img src="shop.jpg" alt="חזית החנות ברחוב הראשי">` |
| 4 | **טקסט קישור "לחצו כאן"** – חסר משמעות ברשימת קישורים | `<a href="/terms">קראו את תנאי השימוש</a>` |
| 5 | **שדה ללא `<label>`** – `placeholder` נעלם בהקלדה ואינו תווית | `<label for="q">חיפוש מוצר</label><input type="search" id="q" name="q">` |
| 6 | **`<div onclick>` במקום `<button>`** – לא נגיש במקלדת, לא מגיב ל-Enter, לא מוכרז ככפתור | `<button type="submit">חפש</button>` |

**הגרסה המתוקנת:**

</div>

```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>החנות שלנו</title>
</head>
<body>
  <header>
    <h1>החנות שלנו</h1>
  </header>

  <main>
    <img src="shop.jpg" alt="חזית החנות ברחוב הראשי, חלון ראווה מואר">

    <p><a href="/terms">קראו את תנאי השימוש</a></p>

    <form action="/search" method="get" role="search">
      <label for="q">חיפוש מוצר</label>
      <input type="search" id="q" name="q">
      <button type="submit">חפש</button>
    </form>
  </main>
</body>
</html>
```

<div dir="rtl" align="right">

---

### 19. בלוק `<head>` לדף מוצר

</div>

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- SEO -->
  <title>אוזניות SoundPro X2 – ביטול רעשים אקטיבי | חנות הסאונד</title>
  <meta name="description"
        content="אוזניות SoundPro X2 עם ביטול רעשים אקטיבי ו-30 שעות סוללה. משלוח חינם, אחריות שנתיים. 599 ש״ח במקום 799.">
  <link rel="canonical" href="https://example.com/products/soundpro-x2">

  <!-- Open Graph -->
  <meta property="og:type" content="product">
  <meta property="og:title" content="אוזניות SoundPro X2">
  <meta property="og:description" content="ביטול רעשים אקטיבי, 30 שעות סוללה. 599 ש״ח.">
  <meta property="og:image" content="https://example.com/images/soundpro-x2.jpg">
  <meta property="og:url" content="https://example.com/products/soundpro-x2">
</head>
```

<div dir="rtl" align="right">

**נקודות חשובות:**

- ה-`<title>` בן 58 תווים – בטווח המומלץ.
- ה-`description` בן 154 תווים ומכיל קריאה לפעולה (מחיר, משלוח).
- `og:image` היא **כתובת מלאה** עם `https://` – כתובת יחסית לא תעבוד.
- `og:` משתמש ב-`property`, לא ב-`name`.

---

### 20. שלד סמנטי לדף "אודות"

</div>

```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="תיאור החברה">
  <title>אודות | שם החברה</title>
</head>
<body>

  <a href="#main" class="skip-link">דלגו לתוכן הראשי</a>

  <header>
    <h1>שם החברה</h1>

    <nav aria-label="ניווט ראשי">
      <ul>
        <li><a href="/">בית</a></li>
        <li><a href="/about">אודות</a></li>
        <li><a href="/services">שירותים</a></li>
        <li><a href="/contact">צור קשר</a></li>
      </ul>
    </nav>
  </header>

  <main id="main">

    <section>
      <h2>הסיפור שלנו</h2>
      <p>...</p>
    </section>

    <section>
      <h2>הערכים שלנו</h2>
      <p>...</p>
    </section>

    <section>
      <h2>הצוות</h2>

      <article>
        <h3>שם העובד</h3>
        <figure>
          <img src="team1.jpg" alt="תמונת פרופיל של ...">
          <figcaption>תפקיד בחברה</figcaption>
        </figure>
        <p>...</p>
      </article>

    </section>

  </main>

  <aside>
    <h2>קישורים מהירים</h2>
    <ul>
      <li><a href="/careers">דרושים</a></li>
      <li><a href="/press">עיתונות</a></li>
    </ul>
  </aside>

  <footer>
    <address>
      רחוב ומספר, עיר<br>
      טלפון: <a href="tel:+97231234567" dir="ltr">03-123-4567</a><br>
      אימייל: <a href="mailto:info@example.com">info@example.com</a>
    </address>
    <p><small>&copy; 2026 שם החברה. כל הזכויות שמורות.</small></p>
  </footer>

</body>
</html>
```

<div dir="rtl" align="right">

**מחוון ניקוד:**

| רכיב | נקודות |
|-------|--------|
| קישור דילוג כאלמנט הראשון ב-`<body>` | 1 |
| `<header>` המכיל `<h1>` ו-`<nav>` | 2 |
| `<nav>` עם רשימה (`<ul>`/`<li>`) ו-`aria-label` | 2 |
| `<main>` יחיד עם `id` שתואם לקישור הדילוג | 2 |
| 3 אלמנטי `<section>`, לכל אחד `<h2>` | 2 |
| `<aside>` | 1 |
| `<footer>` עם `<address>` | 2 |
| היררכיית כותרות ללא דילוגים | 1 |

</div>

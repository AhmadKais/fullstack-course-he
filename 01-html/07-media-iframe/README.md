<div dir="rtl" align="right">

# מודול 7 – מדיה ו-iframe

[⬅ הקודם](../06-semantic/) | [תוכן העניינים](../../README.md) | [חלק ב׳: CSS ➡](../../02-css/01-intro-selectors/)

---

## 🎯 מטרות המודול

1. להטמיע וידאו ואודיו בדף.
2. להוסיף כתוביות לווידאו (`<track>`).
3. להטמיע תוכן חיצוני: יוטיוב, מפות, טפסים.
4. להבין את סיכוני האבטחה של `<iframe>` ואת התכונה `sandbox`.
5. להכיר `<canvas>` ו-`<svg>` ברמת מודעות.

---

## 1. וידאו – `<video>`

</div>

```html
<video src="movie.mp4" controls width="640"></video>
```

<div dir="rtl" align="right">

**גרסה מלאה ומומלצת:**

</div>

```html
<video controls width="640" poster="thumbnail.jpg" preload="metadata">
  <source src="movie.webm" type="video/webm">
  <source src="movie.mp4"  type="video/mp4">
  <track src="subs-he.vtt" kind="subtitles" srclang="he" label="עברית" default>
  <p>הדפדפן שלך אינו תומך בווידאו. <a href="movie.mp4">הורדת הסרטון</a>.</p>
</video>
```

<div dir="rtl" align="right">

| תכונה | תפקיד |
|--------|--------|
| `controls` | מציג את כפתורי הנגן. **כמעט תמיד רצוי** |
| `poster` | תמונה שמוצגת לפני הניגון |
| `preload` | `none` / `metadata` / `auto` – כמה לטעון מראש |
| `autoplay` | ניגון אוטומטי – ⚠️ ראו אזהרה למטה |
| `muted` | מושתק |
| `loop` | ניגון בלולאה |
| `playsinline` | בנייד – ניגון בתוך הדף ולא במסך מלא |
| `width` / `height` | ממדים |

> ⚠️ **`autoplay` לא יעבוד** ברוב הדפדפנים אלא אם הווידאו גם `muted`.
> זו החלטה מכוונת: משתמשים שנאו סרטונים שמתחילים להשמיע קול בעצמם.
> השילוב המקובל לסרטון רקע: `autoplay muted loop playsinline`.

### פורמטים

| פורמט | תמיכה | הערה |
|--------|--------|-------|
| **MP4** (H.264) | ✅ בכל הדפדפנים | הבטוח ביותר |
| **WebM** | ✅ מודרניים | קובץ קטן יותר |
| **OGG** | חלקית | מיושן |

**למה כמה `<source>`?** הדפדפן בוחר את הראשון שהוא יודע לנגן. אם אף אחד לא נתמך – מוצג התוכן שאחריהם (הגיבוי).

---

## 2. אודיו – `<audio>`

</div>

```html
<audio controls preload="metadata">
  <source src="podcast.ogg" type="audio/ogg">
  <source src="podcast.mp3" type="audio/mpeg">
  <p>הדפדפן אינו תומך באודיו. <a href="podcast.mp3">הורדת הקובץ</a>.</p>
</audio>
```

<div dir="rtl" align="right">

התכונות זהות ל-`<video>` (למעט `poster`, `width`, `height`).

---

## 3. כתוביות – `<track>`

זהו הרכיב שהכי שוכחים, והוא **חובה לנגישות**.

</div>

```html
<video controls>
  <source src="lesson.mp4" type="video/mp4">

  <track src="captions-he.vtt" kind="captions"  srclang="he" label="עברית" default>
  <track src="captions-en.vtt" kind="captions"  srclang="en" label="English">
  <track src="desc.vtt"        kind="descriptions" srclang="he" label="תיאור קולי">
</video>
```

<div dir="rtl" align="right">

| `kind` | תפקיד |
|--------|--------|
| `subtitles` | תרגום לשפה אחרת |
| `captions` | תמלול, כולל תיאור צלילים – למשתמשים חירשים |
| `descriptions` | תיאור מה שקורה על המסך – למשתמשים עיוורים |
| `chapters` | פרקים לניווט |

**מבנה קובץ WebVTT (`.vtt`):**

</div>

```
WEBVTT

00:00:00.000 --> 00:00:03.500
שלום וברוכים הבאים לשיעור הראשון

00:00:03.500 --> 00:00:07.200
היום נלמד על תגיות HTML
```

<div dir="rtl" align="right">

> 💡 השורה `WEBVTT` בתחילת הקובץ היא **חובה**.

---

## 4. `<iframe>` – הטמעת דף בתוך דף

</div>

```html
<iframe src="https://example.com"
        width="600" height="400"
        title="תיאור התוכן המוטמע"
        loading="lazy">
</iframe>
```

<div dir="rtl" align="right">

| תכונה | תפקיד |
|--------|--------|
| `src` | כתובת התוכן |
| `title` | **חובה לנגישות** – קורא מסך מכריז אותו |
| `width` / `height` | ממדים |
| `loading="lazy"` | טעינה רק בגלילה אליו |
| `allowfullscreen` | מאפשר מסך מלא |
| `sandbox` | הגבלת הרשאות – ראו למטה |
| `referrerpolicy` | כמה מידע לשלוח לאתר החיצוני |

### שימושים נפוצים

</div>

```html
<!-- וידאו מיוטיוב -->
<iframe width="560" height="315"
        src="https://www.youtube.com/embed/VIDEO_ID"
        title="שם הסרטון"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
        allowfullscreen
        loading="lazy">
</iframe>

<!-- מפת גוגל -->
<iframe src="https://www.google.com/maps/embed?pb=..."
        width="600" height="450"
        title="מפה: מיקום המשרד ברחוב הברזל 12, תל אביב"
        style="border:0"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade">
</iframe>
```

<div dir="rtl" align="right">

---

## 5. ⚠️ אבטחה ב-iframe

`<iframe>` טוען **קוד של מישהו אחר** לתוך הדף שלכם. זה מסוכן.

### התכונה `sandbox`

</div>

```html
<!-- מקסימום הגבלה: sandbox ריק מבטל הכול -->
<iframe src="untrusted.html" sandbox title="תוכן חיצוני"></iframe>

<!-- מרשים רק מה שנדרש -->
<iframe src="widget.html"
        sandbox="allow-scripts allow-same-origin"
        title="ווידג׳ט מזג אוויר">
</iframe>
```

<div dir="rtl" align="right">

| ערך | מה מרשה |
|-----|----------|
| `allow-scripts` | הרצת JavaScript |
| `allow-same-origin` | גישה למקור המקורי |
| `allow-forms` | שליחת טפסים |
| `allow-popups` | פתיחת חלונות |
| `allow-top-navigation` | שינוי כתובת הדף החיצוני |

> ⚠️ **אל תשלבו `allow-scripts` יחד עם `allow-same-origin`** לתוכן שאינכם סומכים עליו – השילוב מאפשר ל-iframe להסיר את ה-sandbox של עצמו.

### הגנה נגד Clickjacking

אם אתם רוצים למנוע מאחרים להטמיע **את האתר שלכם** ב-iframe, מגדירים כותרת HTTP בשרת:

</div>

```
X-Frame-Options: SAMEORIGIN
Content-Security-Policy: frame-ancestors 'self'
```

<div dir="rtl" align="right">

זה מוגדר בשרת, לא ב-HTML. שווה להכיר את המושג.

---

## 6. `<canvas>` ו-`<svg>` – היכרות

| | `<canvas>` | `<svg>` |
|---|-----------|----------|
| סוג | תמונת פיקסלים | וקטורי |
| שליטה | JavaScript בלבד | HTML/CSS/JS |
| הגדלה | מיטשטש | תמיד חד |
| נגישות | קשה מאוד | טובה |
| מתאים ל | משחקים, עיבוד תמונה | אייקונים, גרפים, לוגו |

</div>

```html
<!-- SVG: אפשר לכתוב ישירות ב-HTML -->
<svg width="120" height="120" viewBox="0 0 120 120" role="img" aria-label="עיגול כחול">
  <circle cx="60" cy="60" r="50" fill="#2b6cb0"/>
</svg>

<!-- Canvas: ריק בלי JavaScript -->
<canvas id="myCanvas" width="200" height="120">
  הדפדפן שלך אינו תומך ב-canvas.
</canvas>
```

<div dir="rtl" align="right">

> 💡 בקורס הזה נשתמש ב-SVG (לאייקונים ולוגו). `<canvas>` דורש JavaScript ונלמד עליו רק ברמת מודעות.

---

## 7. נגישות במדיה – צ׳ק-ליסט

- [ ] `controls` בכל וידאו ואודיו – שהמשתמש ישלוט
- [ ] `<track kind="captions">` לכל וידאו מדובר
- [ ] אין `autoplay` עם קול
- [ ] `title` בכל `<iframe>`
- [ ] תוכן גיבוי בתוך `<video>` / `<audio>`
- [ ] תמליל טקסטואלי מתחת לפודקאסט
- [ ] `role="img"` + `aria-label` ל-SVG משמעותי

---

## 📋 סיכום

| תגית | תפקיד |
|-------|--------|
| `<video>` | וידאו |
| `<audio>` | אודיו |
| `<source>` | פורמט חלופי |
| `<track>` | כתוביות ותיאורים |
| `<iframe>` | הטמעת דף חיצוני |
| `sandbox` | הגבלת הרשאות ב-iframe |
| `<svg>` | גרפיקה וקטורית |
| `<canvas>` | ציור בפיקסלים (JS) |

---

## 🎉 סיימתם את חלק ה-HTML!

אתם יודעים עכשיו לבנות דף שלם, תקין, סמנטי ונגיש.
בחלק הבא נלמד איך לגרום לו להיראות טוב.

[⬅ הקודם](../06-semantic/) | [תוכן העניינים](../../README.md) | [התחלת CSS ➡](../../02-css/01-intro-selectors/)

</div>

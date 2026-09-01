<div dir="rtl" align="right">

# 🏗️ שלב 15 – מעברים ואנימציות

> **הפרויקט המתמשך של הכיתה: קפה עתיד**
> נלמד ב־[CSS · מודול 8 – מעברים ואנימציות](../../../02-css/08-transitions-animations/) · [⏮️ שלב 14](../step-14-css-responsive/) · [🗺️ מפת הפרויקט](../../)

---

## 🎯 מה מוסיפים היום

- מוסיפים **`transition`** לכפתורים, לקישורים ולכרטיסי התפריט.
- מרימים כרטיס במעבר עכבר עם `transform: translateY`.
- כותבים **`@keyframes`** ראשון: אזור הראשי נכנס בהחלקה עדינה.
- מוסיפים טבעת פוקוס ב-`:focus-visible` – ומכבדים `prefers-reduced-motion`.

</div>

<div dir="rtl" align="right">

## 🌍 למה זה ככה בעולם האמיתי

### מה `transition` באמת עושה

בלי `transition`, שינוי צבע ב-`:hover` הוא **קפיצה מיידית**. עם `transition`,
הדפדפן מצייר את כל השלבים בדרך.

</div>

```css
transition: background-color 0.2s ease;
/*          מה יעבור         כמה זמן  קצב */
```

<div dir="rtl" align="right">

**`0.2s` הוא לא מספר שרירותי.** מתחת ל-0.1 שניות העין לא קולטת מעבר; מעל
0.4 המשק מרגיש אטי ותקוע. **הטווח 0.15–0.3 שניות הוא איפה שממשקים חיים.**

### שתי תכונות שמונפשות בזול, וכל השאר

זו לא עצה לאסתטיקה – זה איך הדפדפן עובד:

| מונפש | למה |
|--------|------|
| ✅ `transform` | כרטיס המסך מזיז את השכבה. **לא מחשב פריסה מחדש** |
| ✅ `opacity` | אותו דבר |
| ❌ `width`, `height`, `top`, `margin` | **מחייב חישוב פריסה מחדש בכל פריים** |

אנימציה של `width` על רשימה של 30 פריטים תקרטע בטלפון. אותו אפקט
עם `transform: scaleX()` ירוץ חלק.

**לכן כתבנו `transform: translateY(-3px)` ולא `margin-top: -3px`.**

### `:hover` לא קיים במגע

בטלפון אין מצב "העכבר מעל". הדפדפן מזייף `:hover` אחרי לחיצה, ולפעמים
האפקט **נתקע** עד שנוגעים במקום אחר.

**המסקנה: `:hover` הוא תמיד תוספת, לעולם לא הדרך היחידה למידע.**
"כפתור שנצבע בהובר" בסדר. "מחיר שמופיע רק בהובר" – חצי מהמשתמשים לא יראו אותו.

### `:focus-visible` – למה לא `:focus`

</div>

```css
a:focus-visible { outline: 3px solid #c9a227; }
```

<div dir="rtl" align="right">

| | מתי מופעל |
|---|-----------|
| `:focus` | **גם בלחיצת עכבר.** מעצבים שנאו את זה ומחקו: `outline: none` |
| `:focus-visible` | רק כשהדפדפן מעריך שהמשתמש **מנווט במקלדת** |

**`outline: none` בלי חלופה הוא באג נגישות חמור.** משתמש מקלדת מאבד לגמרי
את הידיעה איפה הוא נמצא בדף. `:focus-visible` נותן לשני הצדדים את מבוקשם.

**נסו:** לחצו `Tab` בדף – טבעת זהב. לחצו בעכבר – אין. זה בדיוק הרצוי.

### `prefers-reduced-motion` – לא "נחמד שיהיה"

יש אנשים שתנועה על המסך גורמת להם **בחילה וסחרחורת** (Vestibular disorders).
מערכות ההפעלה נותנות להם מתג "צמצום תנועה", והדפדפן מעביר אותו לנו:

</div>

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

<div dir="rtl" align="right">

**זה בלוק שמעתיקים לכל פרויקט.** שמונה שורות, וזה ההבדל בין אתר שאפשר
להשתמש בו לבין אתר שגורם למישהו להרגיש רע.

</div>
<div dir="rtl" align="right">

---

## 🔨 שלב אחר שלב

### 1. מעברים

</div>

```css
a, button, .menu-cat li {
  transition: background-color 0.2s ease,
              color 0.2s ease,
              transform 0.2s ease,
              box-shadow 0.2s ease;
}
```

<div dir="rtl" align="right">

**מפרטים תכונות במקום `transition: all`.** `all` אומר לדפדפן לעקוב אחרי
כל מאפיין שיכול להשתנות – כולל כאלה שלא התכוונתם אליהם, וזה גם עולה בביצועים.

**המעבר נכתב על המצב הרגיל, לא על `:hover`.** ככה הוא חל בשני הכיוונים –
גם בכניסה וגם ביציאה. אם תכתבו אותו בתוך `:hover`, המעבר יהיה חלק פנימה
וקופצני החוצה.

### 2. הרמת כרטיס

</div>

```css
.menu-cat li:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 18px rgba(74, 44, 23, 0.15);
}
```

<div dir="rtl" align="right">

**שלושה פיקסלים.** זה מספיק. הרמות של 10px נראות כמו שהדף קופץ.

הצל הוא **חום שקוף**, לא שחור. צל שחור על רקע קרם נראה מלוכלך; צל בגוון
הרקע נראה כמו אור אמיתי.

### 3. האנימציה הראשונה

</div>

```css
@keyframes fade-up {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}

.hero {
  animation: fade-up 0.5s ease-out both;
}
```

<div dir="rtl" align="right">

| החלק | מה הוא עושה |
|-------|---------------|
| `@keyframes fade-up` | מגדיר **מה** קורה. לא מריץ כלום |
| `animation: fade-up 0.5s` | שם, משך |
| `ease-out` | מתחיל מהר ומאט. **הקצב הנכון לכניסות** |
| `both` | שומר על מצב ה-`from` לפני ההתחלה ועל ה-`to` אחרי הסוף |

**בלי `both` יש הבזק:** האלמנט מוצג רגיל לרגע, ואז קופץ למצב ההתחלתי
ומתחיל להיכנס.

**`ease-out` לכניסות, `ease-in` ליציאות.** דברים שנכנסים לעולם מאטים;
דברים שיוצאים מאיצים החוצה.

---

## 💻 מה נוסף ל-`style.css` היום

</div>

```css
/* ============================================================
   שלב 15 · CSS מודול 8 – מעברים ואנימציות
   ============================================================ */

a,
button,
.menu-cat li {
  transition: background-color 0.2s ease,
              color 0.2s ease,
              transform 0.2s ease,
              box-shadow 0.2s ease;
}

button:hover {
  background-color: #7b4b2a;
}

.menu-cat li:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 18px rgba(74, 44, 23, 0.15);
}

/* טבעת פוקוס שמופיעה למקלדת ולא לעכבר */
a:focus-visible,
button:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible {
  outline: 3px solid #c9a227;
  outline-offset: 2px;
}

/* כניסה רכה של אזור הראשי */
@keyframes fade-up {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}

.hero {
  animation: fade-up 0.5s ease-out both;
}

/* חובה: יש אנשים שתנועה על המסך גורמת להם לסחרחורת */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

<div dir="rtl" align="right">

## 👀 מה רואים במסך

- **רעננו את הדף** – אזור הראשי מחליק פנימה מלמטה בחצי שנייה.
- **עברו עם העכבר על כרטיס בתפריט** – הוא עולה 3 פיקסלים ומקבל צל רך,
  וחוזר באותה חלקות.
- כפתורים מחליפים גוון בהדרגה במקום לקפוץ.
- **לחצו `Tab`** – טבעת זהב עוברת בין הקישורים. **לחצו בעכבר** – אין טבעת.
- הפעילו "צמצום תנועה" במערכת ההפעלה ורעננו – **הכול מיידי**.

---

## ✋ אתגר לכיתה

1. הוסיפו לתמונות הגלריה הגדלה עדינה במעבר עכבר (`scale(1.03)`).
2. הוסיפו לאנימציית הכניסה **השהיה** של 0.15 שניות.
3. **דיבאג:** מישהו כתב `transition` בתוך `:hover` והמעבר עובד רק בכניסה.
   למה, ואיך מתקנים?

</div>
</div>

<details dir="rtl">
<summary><b>💡 הצגת הפתרון</b></summary>

<div dir="rtl" align="right">

**1.** צריך גם `overflow: hidden` על ההורה, אחרת התמונה תגלוש מהמסגרת המעוגלת:

`.gallery figure { overflow: hidden; border-radius: 14px; }`
`.gallery img { transition: transform 0.3s ease; }`
`.gallery figure:hover img { transform: scale(1.03); }`

**2.** ערך זמן **שני** ב-`animation` הוא ההשהיה:

`animation: fade-up 0.5s 0.15s ease-out both;`

(הראשון הוא משך, השני עיכוב. הסדר קובע.)

**3.** כי המעבר **מוגדר רק כשהעכבר מעל**. ברגע שהעכבר יוצא, הכלל `:hover`
מפסיק לחול – **וגם ה-`transition` שבתוכו** – אז החזרה מיידית.

**התיקון:** להעביר את ה-`transition` לכלל הבסיסי:

`.menu-cat li { transition: transform 0.2s ease; }`
`.menu-cat li:hover { transform: translateY(-3px); }`

</div>
</details>

<div dir="rtl" align="right">
<div dir="rtl" align="right">

---

## 🔍 טעויות שראינו בכיתה

| הטעות | מה קורה |
|--------|----------|
| `transition` בתוך `:hover` | חלק בכניסה, קופץ ביציאה |
| אנימציה של `width` / `top` | קרטוע, במיוחד בטלפון |
| `transition: all` | מנפיש דברים שלא התכוונתם, ועולה בביצועים |
| `outline: none` בלי חלופה | משתמש מקלדת אבוד בדף |
| בלי `prefers-reduced-motion` | פוגע במשתמשים אמיתיים |
| `animation` בלי `both` | הבזק בתחילת האנימציה |

</div>

<div dir="rtl" align="right">

---

## ⏭️ בשלב הבא

**[שלב 16 – משתנים ומצב כהה](../step-16-css-modern/)**

[🗺️ חזרה למפת הפרויקט](../../)

</div>

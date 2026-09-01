<div dir="rtl" align="right">

# 🎨 חלק ב׳ – CSS

> **מצב:** 🚧 בבנייה – מודול 1 מוכן, מודולים 2–9 בהכנה.
> **היקף מומלץ:** 7 מפגשים · 28 שעות.

CSS הוא ה**מראה**: צבע, מיקום, גודל, תנועה. את השלד כבר בנינו ב-HTML;
כאן אנחנו מלבישים אותו.

---

## 🗺️ המודולים

| # | מודול | מה לומדים | מצב |
|---|-------|-----------|------|
| 1 | [מבוא וסלקטורים](01-intro-selectors/) | 3 דרכי שילוב, סלקטורים, משלבים, ספציפיות, ירושה | ✅ מוכן |
| 2 | [צבעים וטיפוגרפיה](02-colors-typography/) | HEX/RGB/HSL, פונטים, `@font-face`, יחידות טקסט, ניגודיות | 🚧 |
| 3 | [מודל הקופסה](03-box-model/) | `margin` `border` `padding`, `box-sizing`, קריסת שוליים | 🚧 |
| 4 | [Display ומיקום](04-display-position/) | block/inline, `position`, `z-index`, `float` | 🚧 |
| 5 | [Flexbox](05-flexbox/) | ציר ראשי ומשני, יישור, `flex-grow`, פריסות נפוצות | 🚧 |
| 6 | [CSS Grid](06-grid/) | עמודות ושורות, `grid-template-areas`, `minmax`, `auto-fit` | 🚧 |
| 7 | [עיצוב רספונסיבי](07-responsive/) | Media Queries, Mobile First, יחידות יחסיות, תמונות | 🚧 |
| 8 | [מעברים ואנימציות](08-transitions-animations/) | `transition`, `transform`, `@keyframes`, ביצועים | 🚧 |
| 9 | [CSS מודרני](09-modern-css/) | משתנים, `clamp`, מצב כהה, ארגון קוד, מוסכמות שמות | 🚧 |

---

---

## 🏗️ הפרויקט המתמשך – ☕ קפה עתיד

**אחרי כל מודול CSS בונים בכיתה שלב באתר אחד ומתמשך.**
כל תיקיית שלב היא עותק רץ של האתר באותו יום, עם README שמסביר
מה נוסף, למה, ואיך זה נראה על המסך.

</div>

<div dir="rtl" align="right">

| # | השלב | מה מוסיפים לאתר |
|---|------|------------------|
| 08 | [קובץ העיצוב הראשון](../00-class-project/steps/step-08-css-intro/) | מבוא וסלקטורים |
| 09 | [צבעי המותג והטיפוגרפיה](../00-class-project/steps/step-09-css-colors-type/) | צבעים וטיפוגרפיה |
| 10 | [מרווחים, מסגרות וכרטיסים](../00-class-project/steps/step-10-css-box-model/) | מודל הקופסה |
| 11 | [כותרת דביקה ותווית מבצע](../00-class-project/steps/step-11-css-display-pos/) | Display ומיקום |
| 12 | [סרגל ניווט ופוטר ב-Flex](../00-class-project/steps/step-12-css-flexbox/) | Flexbox |
| 13 | [רשת התפריט והגלריה](../00-class-project/steps/step-13-css-grid/) | Grid |
| 14 | [האתר בטלפון](../00-class-project/steps/step-14-css-responsive/) | רספונסיביות |
| 15 | [מעברים ואנימציות](../00-class-project/steps/step-15-css-animations/) | מעברים ואנימציות |
| 16 | [משתנים ומצב כהה](../00-class-project/steps/step-16-css-modern/) | CSS מודרני |

**[🗺️ מפת הפרויקט המלאה](../00-class-project/)** · **[☕ האתר המוגמר](../00-class-project/final/)**

## 🎯 מה התלמיד יודע לעשות בסוף

- לבחור סלקטור מדויק לכל אלמנט, ולהסביר איזה כלל ניצח ולמה.
- לבנות פריסה דו/תלת-עמודתית ב-Flexbox וב-Grid.
- להתאים אתר למסך טלפון בגישת Mobile First.
- לנפות בעיות עיצוב בעזרת כלי הפיתוח, בלי לנחש.

## ⚠️ נקודות קושי חוזרות

| הקושי | המודול | הטיפול |
|-------|---------|---------|
| `.a .b` מול `.a.b` | 1 | הרווח הוא **אופרטור**. להריץ את שני המקרים זה לצד זה. |
| ספציפיות – "יש לי יותר מחלקות אז אני מנצח" | 1 | הניקוד אינו סכום. ארבע עמודות, נבדקות משמאל לימין. |
| `box-sizing` – למה 300px זה לא 300px | 3 | להראות בכלי הפיתוח את דיאגרמת הקופסה. |
| ציר ראשי מול ציר משני ב-Flex | 5 | לשנות `flex-direction` בשידור חי ולראות מה `justify-content` עושה. |
| מתי Flex ומתי Grid | 6 | ממד אחד מול שני ממדים. |

---

## 🎮 משחקי תרגול מומלצים

- [Flexbox Froggy](https://flexboxfroggy.com/#he) – בעברית.
- [Grid Garden](https://cssgridgarden.com/#he) – בעברית.
- [CSS Diner](https://flukeout.github.io/) – תרגול סלקטורים.

---

⬅️ [חזרה ל-HTML](../01-html/) &nbsp;·&nbsp; ➡️ [המשך ל-JavaScript](../03-javascript/)

</div>

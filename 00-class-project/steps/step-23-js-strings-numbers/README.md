<div dir="rtl" align="right">

# 🏗️ שלב 23 – מחירים ותאריכים בפורמט נכון

> **הפרויקט המתמשך של הכיתה: קפה עתיד**
> נלמד ב־[JS · מודול 7 – מחרוזות ומספרים](../../../03-javascript/07-strings-numbers/) · [⏮️ שלב 22](../step-22-js-objects/) · [🗺️ מפת הפרויקט](../../)

---

## 🎯 מה מוסיפים היום

- מחליפים את `formatPrice` הפרימיטיבי ב-**`toLocaleString("he-IL")`** – פורמט מטבע ישראלי אמיתי.
- כותבים `normalize()` ו-`matchesSearch()` – הבסיס לחיפוש בתפריט בשלב 25.
- מוסיפים `formatHour()` עם `padStart` – 7 הופך ל-"07:00".
- מבינים למה `0.1 + 0.2` אינו `0.3`, ומה לעשות עם זה.

</div>

<div dir="rtl" align="right">

## 🌍 למה זה ככה בעולם האמיתי

### `toLocaleString` – הפונקציה ששווה יותר מכל השיעור

</div>

```js
const price = 1250;

price + "\u20AA"                                     // "1250₪"     ← מה שכתבנו עד היום
price.toLocaleString("he-IL", { style: "currency",
                                currency: "ILS" })    // "‏1,250.00 ₪"
```

<div dir="rtl" align="right">

**מה קיבלנו בחינם:**
- פסיק מפריד אלפים, לפי הכללים של העברית
- הסימן ₪ במקום הנכון, עם התו הבלתי־נראה שמסדר את הכיוון ב-RTL
- שתי ספרות אחרי הנקודה, או `maximumFractionDigits: 0` לעיגול

**ואותה שורה בדיוק** תיתן `$1,250.00` עם `"en-US"` ו-`"USD"`, ו-`1.250,00 €`
בגרמנית – **כולל הפסיק העשרוני**. זה מה שקורה כשמשתמשים בתקן במקום
לבנות מחרוזת ביד.

זה חלק מ-`Intl`, שיודע גם תאריכים, רשימות, יחסי זמן ומיון נכון בעברית.

### `padStart` – השעה שנראית כמו שעה

</div>

```js
String(7).padStart(2, "0")     // "07"
String(15).padStart(2, "0")    // "15"
```

<div dir="rtl" align="right">

בלי זה נקבל "7:00" ליד "15:00" והטבלה תיראה שבורה.

**שימו לב ל-`String(7)` –** `padStart` היא מתודה של מחרוזת. על מספר
תקבלו `TypeError`.

### חיפוש – שתי שורות שמונעות תלונות

</div>

```js
export const normalize = (text) => String(text).trim().toLowerCase();
```

<div dir="rtl" align="right">

| הבעיה | מה קורה בלי `normalize` |
|--------|---------------------------|
| `"  הפוך "` | רווח שהודבק מהטלפון – לא נמצא |
| `"HAFUCH"` | לא מוצא את `"hafuch"` |
| ערך `null` | `TypeError` על `.trim()` |

**`String(text)` בהתחלה** הוא הגנה: אם יגיע `null` או מספר, הפונקציה
תעבוד במקום להפיל את הדף.

### `includes` – ומה הוא לא עושה

</div>

```js
"קפה הפוך".includes("הפוך")     // true
"שלום".includes("שָׁלוֹם")        // false ← ניקוד הוא תווים אחרים!
```

<div dir="rtl" align="right">

חיפוש בעברית מסובך יותר משנראה: ניקוד, גרשיים (׳ מול ') ואותיות סופיות
הם תווים שונים לגמרי מבחינת המחשב. באתר שלנו זה לא קריטי –
בפרויקט אמיתי זה שיקול תכנוני.

### `0.1 + 0.2` – ולמה זה לא באג של JavaScript

</div>

```js
0.1 + 0.2                          // 0.30000000000000004
0.1 + 0.2 === 0.3                  // false
```

<div dir="rtl" align="right">

מספרים עשרוניים נשמרים בבסיס 2, ו-0.1 הוא שבר מחזורי בבינארי –
בדיוק כמו ש-1/3 הוא 0.333... בעשרוני. **זה קורה בכל שפה** שמשתמשת
בתקן IEEE 754: Java, Python, C.

**מה עושים:**

</div>

```js
(0.1 + 0.2).toFixed(2)                 // "0.30"  ← מחרוזת! לא מספר
Math.round((0.1 + 0.2) * 100) / 100    // 0.3     ← מספר
```

<div dir="rtl" align="right">

> 💰 **הכלל בכסף:** מערכות תשלום רציניות שומרות **אגורות כמספר שלם**
> (1250 במקום 12.50) ומחלקות רק בתצוגה. אנחנו נשארים בשקלים שלמים,
> ומעגלים בכל חישוב מע"מ.

**ו-`toFixed` מחזיר מחרוזת** – `toFixed(2) + 1` ייתן `"0.301"`.

</div>
<div dir="rtl" align="right">

---

## 🔨 שלב אחר שלב

### 1. `formatPrice` מקצועי

</div>

```js
function formatPrice(amount) {
  return amount.toLocaleString("he-IL", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 0,
  });
}
```

<div dir="rtl" align="right">

`maximumFractionDigits: 0` – התפריט שלנו בשקלים שלמים, ו-"‏13.00 ₪"
מיותר. בחשבון סופי היינו משאירים שתי ספרות.

### 2. חיפוש

</div>

```js
function normalize(text) {
  return String(text).trim().toLowerCase();
}

function matchesSearch(item, term) {
  const q = normalize(term);
  if (q === "") return true;        // חיפוש ריק = הכול מתאים
  return normalize(item.name).includes(q) || normalize(item.note).includes(q);
}
```

<div dir="rtl" align="right">

**`if (q === "") return true` היא לא פינה טכנית** – היא ההתנהגות הנכונה:
כשהמשתמש מוחק את מה שהקליד, הוא מצפה לראות את כל התפריט חזרה.

**ומחפשים גם ב-`note`:** "מחמצת" ימצא את השקשוקה, למרות שהמילה לא בשם.

### 3. מתודות מחרוזת שנצטרך

</div>

```js
"קפה עתיד".length            // 9
"קפה עתיד".toUpperCase()
"  שלום  ".trim()            // "שלום"
"קפה עתיד".split(" ")        // ["קפה", "עתיד"]
["א", "ב"].join(" · ")       // "א · ב"
"קפה עתיד".replace("עתיד", "הווה")
"קפה עתיד".slice(0, 3)       // "קפה"
"קפה".startsWith("ק")        // true
```

<div dir="rtl" align="right">

**כולן מחזירות מחרוזת חדשה. אף אחת לא משנה את המקורית** – מחרוזות
ב-JavaScript אינן ניתנות לשינוי.

### 4. `Math` – מה שבאמת בשימוש

</div>

```js
Math.round(4.5)     // 5    לקרוב
Math.floor(4.9)     // 4    למטה
Math.ceil(4.1)      // 5    למעלה
Math.max(1, 9, 3)   // 9
Math.random()       // 0 עד (לא כולל) 1
```

<div dir="rtl" align="right">

**פריט אקראי מהתפריט – "המנה של היום":**

</div>

```js
const daily = MENU[Math.floor(Math.random() * MENU.length)];
```

<div dir="rtl" align="right">

`floor` ולא `round`: עם `round`, האיברים הראשון והאחרון היו מקבלים
חצי סיכוי משאר האיברים.

### 5. תאריכים

</div>

```js
const now = new Date();
now.getFullYear()   // 2026
now.getMonth()      // 0-11  ← ינואר הוא 0
now.getDate()       // 1-31
now.getDay()        // 0-6   ← 0 = ראשון

now.toLocaleDateString("he-IL")   // "1.9.2026"
now.toLocaleDateString("he-IL", { weekday: "long", day: "numeric", month: "long" })
// "יום שלישי, 1 בספטמבר"
```

<div dir="rtl" align="right">

---

## 💻 הקוד המלא של השלב

`js/helpers.js`:

</div>

```js
// ============================================================
// פונקציות עזר – עם עיצוב מספרים ומחרוזות נכון (שלב 23)
// ============================================================

/** 13 → "‏13.00 ₪" בפורמט ישראלי אמיתי */
function formatPrice(amount) {
  return amount.toLocaleString("he-IL", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 0,
  });
}

/** מחיר כולל מע"מ, מעוגל לשקל */
function withVat(amount) {
  return Math.round(amount * (1 + VAT_RATE));
}

function applyDiscount(amount, percent) {
  if (percent === undefined) percent = 10;
  return Math.round(amount * (100 - percent) / 100);
}

/**
 * ניקוי טקסט חיפוש: רווחים מיותרים + אותיות קטנות.
 * בלי זה " Hafuch " לא ימצא את "hafuch".
 */
function normalize(text) {
  return String(text).trim().toLowerCase();
}

/** האם הפריט מתאים למילת החיפוש? */
function matchesSearch(item, term) {
  const q = normalize(term);
  if (q === "") return true;
  return normalize(item.name).includes(q) || normalize(item.note).includes(q);
}

console.log(formatPrice(13));
console.log(formatPrice(1250));
console.log(withVat(100), applyDiscount(50), applyDiscount(50, 25));
console.log(normalize("   HaFuCh  "));

// --- מספרים: המלכודת הקלאסית ---
console.log(0.1 + 0.2);              // 0.30000000000000004
console.log((0.1 + 0.2).toFixed(2)); // "0.30"  ← מחרוזת!
console.log(Math.round((0.1 + 0.2) * 100) / 100); // 0.3 ← מספר
```

<div dir="rtl" align="right">

## 👀 מה רואים בקונסולה

</div>

```text
‏13 ₪
‏1,250 ₪
118 45 38
hafuch
0.30000000000000004
0.30
0.3
פתוח עכשיו · נסגר ב-20:00
```

<div dir="rtl" align="right">

**שימו לב ל-"1,250 ₪" עם הפסיק.** לא כתבנו לזה שורת קוד.

---

## 🎬 סוף הכנת המנוע

בשבעת השלבים האחרונים בנינו: **נתונים** (17, 21, 22), **כללי עסק** (18, 20),
**חישובים** (19) ו**עיצוב פלט** (23) – והכול נבדק בקונסולה.

**[שלב 24](../step-24-js-dom/) מחבר את הכול למסך.** התפריט שכתבנו ביד
ב-HTML יימחק, והדפדפן יבנה אותו מהמערך.

---

## ✋ אתגר לכיתה

1. הוסיפו `formatDate(date)` שמחזיר "יום שלישי, 1 בספטמבר".
2. כתבו `dailySpecial()` שמחזירה פריט אקראי מהתפריט.
3. **חידה:** למה `"5" * 2` הוא 10, אבל `"5" + 2` הוא "52"?
4. **באג:** למה השורה הבאה מחזירה `"0.301"`?

</div>

```js
(0.1 + 0.2).toFixed(2) + 1
```

</div>

<details dir="rtl">
<summary><b>💡 הצגת הפתרון</b></summary>

<div dir="rtl" align="right">

**1.**

`function formatDate(date) { return date.toLocaleDateString("he-IL", { weekday: "long", day: "numeric", month: "long" }); }`

**2.**

`function dailySpecial() { return MENU[Math.floor(Math.random() * MENU.length)]; }`

**3.** כי `*` **קיים רק למספרים** – JavaScript ממיר את `"5"` ל-5 ומכפיל.
`+` קיים גם למחרוזות (שרשור), ואם צד אחד מחרוזת – מנצח השרשור.

`+` הוא האופרטור היחיד עם הכפילות הזו. `-`, `*`, `/`, `%` תמיד ממירים למספר.

**4. `toFixed` מחזיר מחרוזת, לא מספר.**

`"0.30" + 1` הוא שרשור → `"0.301"`.

**הכלל:** `toFixed` הוא **לתצוגה בלבד**, בשורה האחרונה לפני שהערך נכנס לדף.
לחישובים – `Math.round(x * 100) / 100`.

</div>
</details>

<div dir="rtl" align="right">
<div dir="rtl" align="right">

---

## 🔍 טעויות שראינו בכיתה

| הטעות | מה קורה |
|--------|----------|
| בניית פורמט מטבע ביד | אין פסיקי אלפים, וכיוון ה-₪ נשבר ב-RTL |
| חישוב על תוצאת `toFixed` | שרשור מחרוזות |
| השוואת עשרוניים ב-`===` | `0.1 + 0.2 !== 0.3` |
| `padStart` על מספר | `TypeError`. צריך `String(n)` |
| חיפוש בלי `toLowerCase` | "Hafuch" לא מוצא "hafuch" |
| `getMonth() + 1` נשכח | ספטמבר מוצג כאוגוסט |
| `Math.round` להגרלה | קצוות מקבלים חצי סיכוי |

</div>

<div dir="rtl" align="right">

---

## ⏭️ בשלב הבא

**[שלב 24 – התפריט נבנה מהקוד](../step-24-js-dom/)**

[🗺️ חזרה למפת הפרויקט](../../)

</div>

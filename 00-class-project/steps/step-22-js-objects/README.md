<div dir="rtl" align="right">

# 🏗️ שלב 22 – התפריט כאובייקטים

> **הפרויקט המתמשך של הכיתה: קפה עתיד**
> נלמד ב־[JS · מודול 6 – אובייקטים](../../../03-javascript/06-objects/) · [⏮️ שלב 21](../step-21-js-arrays/) · [🗺️ מפת הפרויקט](../../)

---

## 🎯 מה מוסיפים היום

- **מאחדים את שלושת המערכים לאחד**: מערך של אובייקטים.
- כל פריט נושא את כל המידע שלו: `id`, `name`, `price`, `cat`, `note`.
- מוסיפים `CATEGORIES` – אובייקט מיפוי מקוד קטגוריה לשם בעברית.
- מכירים גישה בנקודה מול סוגריים, ואת ההבדל בין העתקה לבין הפניה.

</div>

<div dir="rtl" align="right">

## 🌍 למה זה ככה בעולם האמיתי

### מה בדיוק תיקנו

**לפני – שלוש רשימות שצריך לשמור מסונכרנות:**

</div>

```js
menuNames  = ["אספרסו", "הפוך", ...];
menuPrices = [9, 13, ...];
menuCats   = ["hot", "hot", ...];
```

<div dir="rtl" align="right">

**אחרי – רשימה אחת של ישויות:**

</div>

```js
const MENU = [
  { id: "espresso", name: "אספרסו", price: 9,  cat: "hot", note: "שוט אחד" },
  { id: "hafuch",   name: "הפוך",   price: 13, cat: "hot", note: "הכי נמכר" },
];
```

<div dir="rtl" align="right">

עכשיו מחיקת פריט מוחקת את **כל** המידע שלו יחד. אי אפשר לצאת מסנכרון,
כי אין מה לסנכרן.

**זה בדיוק המבנה שמגיע מכל API בעולם.** בשלב 28 נביא את הנתונים האלה
מקובץ JSON, והם ייראו בדיוק ככה. אנחנו לומדים את השפה של הרשת.

### נקודה מול סוגריים

</div>

```js
item.price          // כשיודעים את שם השדה בזמן הכתיבה
item["price"]       // אותו דבר בדיוק
item[fieldName]     // כששם השדה נמצא במשתנה ← רק כך אפשר
CATEGORIES[item.cat]  // "hot" → "קפה חם"
```

<div dir="rtl" align="right">

**`item[fieldName]` הוא לא סגנון – הוא היכולת.** בנקודה, `item.fieldName`
יחפש שדה בשם המילולי "fieldName".

**שימוש קלאסי:** מיפוי. `CATEGORIES` הוא אובייקט שכל מפתח בו הוא קוד,
וכל ערך הוא התווית בעברית. זה מחליף `switch` של ארבעה מקרים בשורה אחת.

### `?.` – הצלה משגיאה נפוצה

</div>

```js
const item = MENU.find((m) => m.id === "cappuccino-xl");   // לא קיים
console.log(item.price);    // ❌ TypeError: Cannot read properties of undefined
console.log(item?.price);   // ✅ undefined
```

<div dir="rtl" align="right">

`find` שלא מצא מחזיר `undefined`, וגישה לשדה של `undefined` **מפילה
את כל הסקריפט**. `?.` עוצר בשקט ומחזיר `undefined`.

### העתקה מול הפניה – **המלכודת הגדולה של השיעור**

</div>

```js
// פרימיטיבים – מועתקים
let a = 5;
let b = a;
b = 9;
console.log(a);    // 5  ✅

// אובייקטים – מוצבעים
const item1 = { name: "הפוך", price: 13 };
const item2 = item1;
item2.price = 99;
console.log(item1.price);   // 99  ❌ !!
```

<div dir="rtl" align="right">

**`item2` הוא לא עותק – הוא שם שני לאותו אובייקט.**

זה מסביר את הבאג הקלאסי: "שיניתי משהו בעגלה והמחיר בתפריט השתנה".

**התיקון – עותק שטוח:**

</div>

```js
const item2 = { ...item1 };        // עותק
const item3 = { ...item1, qty: 1 };  // עותק + שדה נוסף
```

<div dir="rtl" align="right">

זה בדיוק מה שנעשה בשלב 25 כשנוסיף פריט להזמנה.

**"שטוח" = רמה אחת.** אובייקט בתוך אובייקט עדיין משותף. לעומק
משתמשים ב-`structuredClone(obj)`.

### וזה מסביר סוף־סוף את `const`

</div>

```js
const item = { price: 13 };
item.price = 15;         // ✅ חוקי! שינינו את התוכן
item = { price: 15 };    // ❌ TypeError – ניסינו להצביע על אובייקט אחר
```

<div dir="rtl" align="right">

`const` נועל את **ההצבעה**, לא את התוכן.

</div>
<div dir="rtl" align="right">

---

## 🔨 שלב אחר שלב

### 1. מבנה הפריט

</div>

```js
{ id: "hafuch", name: "הפוך", price: 13, cat: "hot", note: "הכי נמכר אצלנו" }
```

<div dir="rtl" align="right">

**למה `id` ולא סתם `name`:** ה-`id` הוא מזהה **יציב באנגלית**. השם בעברית
עלול להשתנות ("הפוך" → "הפוך קלאסי"), והוא לא מתאים לתכונת `data-id`
ב-HTML או למפתח ב-localStorage. **מזהה נפרד מהתצוגה** – זה כלל.

### 2. אובייקט המיפוי

</div>

```js
const CATEGORIES = {
  hot: "קפה חם",
  cold: "קפה קר",
  bakery: "מאפים",
  meals: "ארוחות",
};

CATEGORIES["hot"]      // "קפה חם"
CATEGORIES[item.cat]   // "קפה חם"
```

<div dir="rtl" align="right">

### 3. עכשיו כל השאילתות פשוטות

</div>

```js
const hot = MENU.filter((item) => item.cat === "hot");
const item = MENU.find((item) => item.id === "hafuch");
const total = MENU.reduce((sum, item) => sum + item.price, 0);
const names = MENU.map((item) => item.name);
```

<div dir="rtl" align="right">

**השוו לשלב 21:** אין `[i]`, אין תלות באינדקסים, ואפשר לקרוא את השורה
בקול רם כמו משפט באנגלית.

### 4. מעבר על אובייקט

</div>

```js
Object.keys(CATEGORIES)     // ["hot", "cold", "bakery", "meals"]
Object.values(CATEGORIES)   // ["קפה חם", "קפה קר", ...]
Object.entries(CATEGORIES)  // [["hot", "קפה חם"], ...]

for (const [code, label] of Object.entries(CATEGORIES)) {
  console.log(code + " = " + label);
}
```

<div dir="rtl" align="right">

### 5. אובייקט המדינה של ההזמנה

</div>

```js
let order = [];   // מערך של אובייקטים: { id, name, price, qty }
```

<div dir="rtl" align="right">

---

## 💻 הקוד המלא של השלב

`js/data.js` – התפריט המלא (18 פריטים):

</div>

```js
const MENU = [
  // קפה חם
  { id: "espresso", name: "אספרסו", price: 9, cat: "hot", note: "שוט אחד של פולים קלויים אצלנו" },
  { id: "hafuch", name: "הפוך", price: 13, cat: "hot", note: "הכי נמכר אצלנו" },
  ...
  // ארוחות
  { id: "shakshuka", name: "שקשוקה", price: 42, cat: "meals", note: "עם לחם מחמצת" },
];

const CATEGORIES = {
  hot: "קפה חם", cold: "קפה קר", bakery: "מאפים", meals: "ארוחות",
};

let order = [];
```

<div dir="rtl" align="right">

הקובץ המלא: **[`js/data.js`](js/data.js)**

## 👀 מה רואים בקונסולה

הריצו בקונסולה:

</div>

```js
MENU.length                                    // 18
MENU.filter(i => i.cat === "hot").length       // 6
MENU.find(i => i.id === "shakshuka")           // האובייקט המלא
Math.max(...MENU.map(i => i.price))            // 42
```

<div dir="rtl" align="right">

**נסו גם `console.table(MENU)`** – טבלה אמיתית בקונסולה, עם עמודות
שאפשר למיין. אחד הכלים הכי שימושיים ב-DevTools ואף אחד לא מכיר אותו.

---

## ✋ אתגר לכיתה

1. הדפיסו את שמות כל הפריטים שמחירם מעל 30₪.
2. חשבו את המחיר הממוצע **בכל קטגוריה** בנפרד.
3. הוסיפו לכל פריט שדה `vegan: false`, ולשלושה פריטים `true`.
4. **הבאג:** מה יקרה כאן, ולמה?

</div>

```js
const item = MENU.find((m) => m.id === "hafuch");
const forOrder = item;
forOrder.qty = 3;
console.log(MENU.find((m) => m.id === "hafuch"));
```

</div>

<details dir="rtl">
<summary><b>💡 הצגת הפתרון</b></summary>

<div dir="rtl" align="right">

**1.** `MENU.filter(i => i.price > 30).map(i => i.name)`

שרשור המתודות עובד כי `filter` מחזיר מערך, ו-`map` היא מתודה של מערך.

**2.**

`for (const cat of Object.keys(CATEGORIES)) {`
`  const items = MENU.filter(i => i.cat === cat);`
`  const avg = Math.round(items.reduce((s, i) => s + i.price, 0) / items.length);`
`  console.log(CATEGORIES[cat] + ": " + avg + "\u20AA");`
`}`

**3.** `MENU.forEach(i => { i.vegan = false; });` ואז
`MENU.find(i => i.id === "lemonade").vegan = true;`

שימו לב שזה עבד למרות ש-`MENU` הוא `const` – שינינו תוכן, לא הצבעה.

**4. `MENU` עצמו השתנה** – הפריט "הפוך" בתפריט מקבל עכשיו `qty: 3`.

`forOrder = item` לא העתיק כלום; שני השמות מצביעים על אותו אובייקט בזיכרון.

**התיקון:** `const forOrder = { ...item, qty: 3 };`

זה בדיוק מה שנכתוב בשלב 25. בלי זה, הוספה לעגלה הייתה **משנה את התפריט**.

</div>
</details>

<div dir="rtl" align="right">
<div dir="rtl" align="right">

---

## 🔍 טעויות שראינו בכיתה

| הטעות | מה קורה |
|--------|----------|
| `item.price` על תוצאת `find` שנכשלה | `TypeError`. השתמשו ב-`?.` |
| `obj.key` כשהמפתח במשתנה | מחפש שדה בשם "key" |
| הצבת אובייקט כ"עותק" | שני שמות לאותו אובייקט |
| `const` על אובייקט = "לא ישתנה" | רק ההצבעה נעולה |
| פסיק חסר בין שדות | `SyntaxError`, והקובץ כולו לא רץ |
| מזהה = השם בעברית | שם משתנה; מזהה לא אמור |

</div>

<div dir="rtl" align="right">

---

## ⏭️ בשלב הבא

**[שלב 23 – מחירים ותאריכים בפורמט נכון](../step-23-js-strings-numbers/)**

[🗺️ חזרה למפת הפרויקט](../../)

</div>

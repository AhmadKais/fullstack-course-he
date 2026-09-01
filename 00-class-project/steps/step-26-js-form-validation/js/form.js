// ============================================================
// שלב 26 · ולידציה משלנו – הודעות בעברית, בזמן אמת
// ============================================================

const form = document.getElementById("reserve-form");

// כלל אחד לכל שדה: איך בודקים, ומה אומרים כשזה נכשל
const RULES = {
  fullname: {
    test: function (v) { return v.trim().length >= 2; },
    message: "צריך שם מלא – לפחות שתי אותיות.",
  },
  phone: {
    test: function (v) { return /^0\d{1,2}-?\d{7}$/.test(v.trim()); },
    message: "מספר טלפון ישראלי, למשל 052-1234567.",
  },
  email: {
    test: function (v) { return v.trim() === "" || v.includes("@"); },
    message: "כתובת דוא\"ל לא נראית תקינה.",
  },
  date: {
    test: function (v) { return v !== "" && new Date(v) >= new Date(new Date().toDateString()); },
    message: "אי אפשר להזמין שולחן לתאריך שעבר.",
  },
};

/** בודק שדה אחד, מציג/מנקה הודעה, ומחזיר אם הוא תקין */
function validateField(name) {
  const input = document.getElementById(name);
  const slot  = document.getElementById("err-" + name);
  const rule  = RULES[name];
  if (!input || !rule) return true;

  const ok = rule.test(input.value);

  if (slot) slot.textContent = ok ? "" : rule.message;
  input.setAttribute("aria-invalid", String(!ok));

  return ok;
}

if (form) {
  // בודקים ביציאה מהשדה, לא בכל הקלדה.
  // שגיאה אדומה אחרי האות הראשונה בשם היא עוינת למשתמש.
  Object.keys(RULES).forEach(function (name) {
    const input = document.getElementById(name);
    if (!input) return;

    input.addEventListener("blur", function () { validateField(name); });

    // אחרי שכבר נכשל – מתקנים בזמן אמת, כדי שיראה שהוא מצליח
    input.addEventListener("input", function () {
      if (input.getAttribute("aria-invalid") === "true") validateField(name);
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();          // עוצרים את שליחת ברירת המחדל

    let firstBad = null;
    Object.keys(RULES).forEach(function (name) {
      if (!validateField(name) && !firstBad) firstBad = name;
    });

    const terms = document.querySelector('[name="terms"]');
    const termsSlot = document.getElementById("err-terms");
    const termsOk = terms.checked;
    if (termsSlot) termsSlot.textContent = termsOk ? "" : "צריך לאשר את תנאי ההזמנה.";
    if (!termsOk && !firstBad) firstBad = "terms";

    const status = document.getElementById("form-status");

    if (firstBad) {
      status.textContent = "יש שדות שצריך לתקן.";
      status.className = "fail";
      // מחזירים את המשתמש לשדה הראשון שנכשל – אחרת הוא לא ימצא אותו
      document.getElementById(firstBad).focus();
      return;
    }

    status.textContent = "ההזמנה נשלחה. נשלח אישור ב-SMS תוך כמה דקות.";
    status.className = "ok";
    form.reset();
    document.querySelectorAll(".error").forEach(function (el) { el.textContent = ""; });
  });
}

// ⚠️ להזכיר בכיתה: כל הקובץ הזה הוא נוחות למשתמש בלבד.
// מי שפותח DevTools יכול למחוק אותו ולשלוח מה שירצה.
// בדיקה אמיתית חייבת לקרות בשרת. תמיד.

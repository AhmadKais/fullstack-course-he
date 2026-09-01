const form = document.getElementById("reserve-form");

const RULES = {
  fullname: {
    test: (v) => v.trim().length >= 2,
    message: "צריך שם מלא – לפחות שתי אותיות.",
  },
  phone: {
    test: (v) => /^0\d{1,2}-?\d{7}$/.test(v.trim()),
    message: "מספר טלפון ישראלי, למשל 052-1234567.",
  },
  email: {
    test: (v) => v.trim() === "" || v.includes("@"),
    message: 'כתובת דוא"ל לא נראית תקינה.',
  },
  date: {
    test: (v) => v !== "" && new Date(v) >= new Date(new Date().toDateString()),
    message: "אי אפשר להזמין שולחן לתאריך שעבר.",
  },
};

function validateField(name) {
  const input = document.getElementById(name);
  const slot = document.getElementById(`err-${name}`);
  const rule = RULES[name];
  if (!input || !rule) return true;

  const ok = rule.test(input.value);
  if (slot) slot.textContent = ok ? "" : rule.message;
  input.setAttribute("aria-invalid", String(!ok));
  return ok;
}

export function initForm() {
  if (!form) return;

  for (const name of Object.keys(RULES)) {
    const input = document.getElementById(name);
    if (!input) continue;
    input.addEventListener("blur", () => validateField(name));
    input.addEventListener("input", () => {
      if (input.getAttribute("aria-invalid") === "true") validateField(name);
    });
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const failed = Object.keys(RULES).filter((name) => !validateField(name));

    const terms = document.querySelector('[name="terms"]');
    const termsSlot = document.getElementById("err-terms");
    if (termsSlot) termsSlot.textContent = terms.checked ? "" : "צריך לאשר את תנאי ההזמנה.";
    if (!terms.checked) failed.push("terms");

    const status = document.getElementById("form-status");

    if (failed.length > 0) {
      status.textContent = `יש ${failed.length} שדות שצריך לתקן.`;
      status.className = "fail";
      document.getElementById(failed[0]).focus();
      return;
    }

    status.textContent = "ההזמנה נשלחה. נשלח אישור ב-SMS תוך כמה דקות.";
    status.className = "ok";
    form.reset();
    document.querySelectorAll(".error").forEach((el) => { el.textContent = ""; });
  });
}

// כל הבדיקות כאן הן נוחות למשתמש. האבטחה היא בשרת. תמיד.

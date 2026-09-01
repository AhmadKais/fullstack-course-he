import { CAFE } from "./config.js";
import { loadMenu } from "./menu-api.js";
import { initMenu, showLoading, showError } from "./menu.js";
import { initOrder } from "./order.js";
import { initForm } from "./form.js";
import { initUI, toast } from "./ui.js";

console.log(`${CAFE.name} · ${CAFE.address}`);

// רשת ביטחון אחרונה: כל שגיאה שאף אחד לא תפס מגיעה לכאן.
// בפרויקט אמיתי כאן שולחים דיווח לשירות ניטור.
window.addEventListener("error", (event) => {
  console.error("שגיאה לא מטופלת:", event.error);
});

window.addEventListener("unhandledrejection", (event) => {
  console.error("Promise שנדחה ולא טופל:", event.reason);
});

async function start() {
  console.time("menu-load");
  showLoading();
  try {
    const menu = await loadMenu();
    initMenu(menu);
    initOrder(menu);
    toast("התפריט מעודכן להיום");
  } catch (error) {
    // מפרידים בין מה שהמשתמש רואה לבין מה שאנחנו צריכים לדעת
    console.error("טעינת התפריט נכשלה:", error);
    showError(
      error instanceof TypeError
        ? "נראה שאין חיבור לרשת."
        : error.message,
      start,
    );
  } finally {
    // רץ תמיד – גם בהצלחה וגם בכישלון
    console.timeEnd("menu-load");
  }
}

try {
  initUI();
  initForm();
} catch (error) {
  console.error("אתחול הממשק נכשל:", error);
}

start();

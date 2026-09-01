import { CAFE } from "./config.js";
import { loadMenu } from "./menu-api.js";
import { initMenu, showLoading, showError } from "./menu.js";
import { initOrder } from "./order.js";
import { initForm } from "./form.js";
import { initUI } from "./ui.js";

console.log(`${CAFE.name} · ${CAFE.address}`);

initUI();
initForm();

async function start() {
  showLoading();
  try {
    const menu = await loadMenu();
    initMenu(menu);
    initOrder(menu);       // ההזמנה השמורה נטענת מ-localStorage כאן
  } catch (error) {
    console.error("טעינת התפריט נכשלה:", error);
    showError(error.message, start);
  }
}

start();

// נקודת הכניסה היחידה. ה-HTML טוען רק את הקובץ הזה.
import { CAFE } from "./config.js";
import { MENU } from "./menu-data.js";
import { initMenu } from "./menu.js";
import { initOrder } from "./order.js";
import { initForm } from "./form.js";
import { initUI } from "./ui.js";

console.log(`${CAFE.name} · ${CAFE.address} · מאז ${CAFE.yearOpened}`);

initUI();
initMenu(MENU);
initOrder(MENU);
initForm();

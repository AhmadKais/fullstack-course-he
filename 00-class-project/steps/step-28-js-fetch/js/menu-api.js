import { MENU_URL } from "./config.js";

/**
 * מביא את התפריט מהשרת.
 * זורק שגיאה אם משהו השתבש – מי שקורא מחליט מה להציג.
 */
export async function loadMenu() {
  const response = await fetch(MENU_URL);

  // ⚠️ fetch לא זורק שגיאה על 404 או 500. חייבים לבדוק ידנית.
  if (!response.ok) {
    throw new Error(`השרת החזיר ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  if (!Array.isArray(data.items)) {
    throw new Error("מבנה התפריט שהתקבל אינו תקין");
  }

  return data.items;
}

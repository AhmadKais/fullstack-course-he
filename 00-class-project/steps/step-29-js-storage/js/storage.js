import { STORAGE_KEY, THEME_KEY } from "./config.js";

/**
 * localStorage שומר מחרוזות בלבד, ויכול לזרוק שגיאה
 * (גלישה פרטית, אחסון מלא, הרשאות חסומות).
 * לכן כל גישה עטופה ב-try/catch – אתר לא נשבר בגלל העדפה שנשמרה.
 */
export function loadOrder() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn("לא הצלחנו לקרוא הזמנה שמורה:", error.message);
    return [];
  }
}

export function saveOrder(order) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
  } catch (error) {
    console.warn("לא הצלחנו לשמור את ההזמנה:", error.message);
  }
}

export function loadTheme() {
  try {
    return localStorage.getItem(THEME_KEY);   // "dark" | "light" | null
  } catch {
    return null;
  }
}

export function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch { /* לא נורא – ההעדפה פשוט לא תישמר */ }
}

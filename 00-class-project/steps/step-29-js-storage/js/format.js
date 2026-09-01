// עיצוב מחרוזות ומספרים. פונקציות טהורות: קלט → פלט, בלי תופעות לוואי.
export const formatPrice = (amount) =>
  amount.toLocaleString("he-IL", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 0,
  });

export const formatHour = (h) => `${String(h).padStart(2, "0")}:00`;

export const normalize = (text) => String(text ?? "").trim().toLowerCase();

export function matchesSearch(item, term) {
  const q = normalize(term);
  if (q === "") return true;
  // ?. – אם note לא קיים, מחזיר undefined במקום לזרוק שגיאה
  return normalize(item.name).includes(q) || normalize(item?.note).includes(q);
}

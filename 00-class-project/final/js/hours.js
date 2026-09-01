import { formatHour } from "./format.js";

const WEEK = [
  { name: "ראשון", open: 7, close: 20 },
  { name: "שני",   open: 7, close: 20 },
  { name: "שלישי", open: 7, close: 20 },
  { name: "רביעי", open: 7, close: 20 },
  { name: "חמישי", open: 7, close: 20 },
  { name: "שישי",  open: 7, close: 15 },
  { name: "שבת",   open: null, close: null },
];

export function isOpenAt(when = new Date()) {
  const { open, close } = WEEK[when.getDay()];     // destructuring
  if (open === null) return false;
  const hour = when.getHours();
  return hour >= open && hour < close;
}

export function openStatusText(when = new Date()) {
  const { open, close } = WEEK[when.getDay()];
  if (isOpenAt(when)) return `פתוח עכשיו · נסגר ב-${formatHour(close)}`;
  if (open === null) return `סגור · נתראה ביום ראשון ב-${formatHour(7)}`;
  return `סגור כרגע · נפתח ב-${formatHour(open)}`;
}

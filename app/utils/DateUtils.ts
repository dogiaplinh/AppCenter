import { DateRange } from "../models/Models";

export function dateBefore(date: Date | string, num: number) {
  const d = new Date(date);
  d.setDate(d.getDate() - num);
  return d;
}

export function currentDay(): Date {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

export function thisMonthRange(now: Date): DateRange {
  const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  return { start: startDate, end: now };
}

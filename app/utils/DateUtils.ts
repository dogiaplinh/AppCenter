import { DateRange, PrebuiltDateRange } from "../models/Models";

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

export function makeDateRange(range: PrebuiltDateRange, now: Date): DateRange {
  switch (range) {
    case "last7":
      return {
        start: dateBefore(now, 7),
        end: now,
      };
    case "last14":
      return {
        start: dateBefore(now, 14),
        end: now,
      };
    case "last30":
      return {
        start: dateBefore(now, 30),
        end: now,
      };
    case "last60":
      return {
        start: dateBefore(now, 60),
        end: now,
      };
    case "last90":
      return {
        start: dateBefore(now, 90),
        end: now,
      };
  }
  return { start: now, end: now };
}

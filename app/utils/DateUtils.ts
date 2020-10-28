export function dateBefore(date: Date | string, num: number) {
  const d = new Date(date);
  d.setDate(d.getDate() - num);
  return d;
}

export function currentDay(): Date {
  const date = new Date();
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

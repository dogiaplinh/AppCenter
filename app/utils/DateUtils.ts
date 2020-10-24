export function dateBefore(date: Date | string, num: number) {
  const d = new Date(date);
  d.setDate(d.getDate() - num);
  return d;
}

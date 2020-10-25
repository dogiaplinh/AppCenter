export function roundMaxValue(max: number) {
  const a = Math.floor(Math.log10(max));
  const b = max / Math.pow(10, a); // b = (1,10)
  const c = Math.ceil(b * 12) * Math.pow(10, a - 1);
  return c;
}

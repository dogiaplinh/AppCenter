const androidVersionMap: Record<string, string> = {
  16: "4.1",
  17: "4.2",
  18: "4.3",
  19: "4.4",
  21: "5.0",
  22: "5.1",
  23: "6.0",
  24: "7.0",
  25: "7.1",
  26: "8.0",
  27: "8.1",
  28: "9",
  29: "10",
  30: "11",
};

export function parseAndroidVersion(num: string) {
  if (androidVersionMap[num]) return "Android " + androidVersionMap[num];
  return num;
}

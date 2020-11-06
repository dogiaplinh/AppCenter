export type DateRange = { start: Date; end: Date };
export type PrebuiltDateRange =
  | "last7"
  | "last14"
  | "last30"
  | "last60"
  | "last90"
  | "this_month"
  | "last_month";

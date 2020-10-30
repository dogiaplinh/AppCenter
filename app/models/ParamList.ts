import { AppItem, CountsResult, StatsType } from "./ApiModels";
import { DateRange } from "./Models";

export type StackParamList = {
  Login: undefined;
  AppList: undefined;
  App: { app: AppItem };
  GridStats: {
    app: AppItem;
    title: string;
    type: StatsType;
    dateRange: DateRange;
  };
  EventDetails: {
    app: AppItem;
    name: string;
    dateRange: DateRange;
  };
  Diagnostics: {
    app: AppItem;
    dateRange: DateRange;
  };
};

import { AppItem, CountsResult, StatsType } from "./ApiModels";

export type StackParamList = {
  Login: undefined;
  AppList: undefined;
  App: { app: AppItem };
  GridStats: {
    app: AppItem;
    title: string;
    type: StatsType;
  };
  EventDetails: {
    app: AppItem;
    name: string;
  };
};

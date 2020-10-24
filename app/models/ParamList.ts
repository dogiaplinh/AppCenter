import { AppItem } from "./ApiModels";

export type StackParamList = {
  Login: undefined;
  AppList: undefined;
  App: { app: AppItem };
  GridStats: {
    title: string;
    data: {
      total: number;
      values: ({ count: number } & Record<string, string | number>)[];
    };
    labelField: string;
  };
};

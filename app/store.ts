import AsyncStorage from "@react-native-community/async-storage";
import { createStore } from "redux";
import { PersistConfig, persistReducer, persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { rootReducer } from "./reducers";
import { SettingState } from "./reducers/settingReducer";
import { UserState } from "./reducers/userReducer";

export type AllState = {
  user: UserState;
  setting: SettingState;
};

const persistConfig: PersistConfig<AllState> = {
  key: "root",
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer);
export const persistor = persistStore(store, { manualPersist: false });
export default store;

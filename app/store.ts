import AsyncStorage from "@react-native-community/async-storage";
import { createStore } from "redux";
import { PersistConfig, persistReducer, persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { rootReducer } from "./reducers";

export type AllState = {};

const persistConfig: PersistConfig<AllState> = {
  key: "root",
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer);
export const persistor = persistStore(store, { manualPersist: true });
export default store;

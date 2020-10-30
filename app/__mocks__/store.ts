import { createStore } from "redux";
import { rootReducer } from "../reducers";
import { SettingState } from "../reducers/settingReducer";
import { UserState } from "../reducers/userReducer";

export type AllState = {
  user: UserState;
  setting: SettingState;
};
const store = createStore(rootReducer);
export default store;

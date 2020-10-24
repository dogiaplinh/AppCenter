import { combineReducers } from "redux";
import { settingState } from "./settingReducer";
import { userState } from "./userReducer";

export const rootReducer = combineReducers({
  user: userState,
  setting: settingState,
});

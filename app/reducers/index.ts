import { combineReducers } from "redux";
import { userState } from "./userReducer";

export const rootReducer = combineReducers({
  user: userState,
});

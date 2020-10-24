import { SettingAction } from "../actions";

export type SettingState = {};

const initState: SettingState = {};

export const settingState = (
  state: SettingState = initState,
  action: SettingAction,
): SettingState => {
  return state;
};

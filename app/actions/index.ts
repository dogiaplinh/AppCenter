import { SettingAction } from "./settingActions";
import { UserAction } from "./userActions";

export * from "./userActions";
export * from "./settingActions";

export type AllAction = UserAction | SettingAction;

export const SET_API_TOKEN = "SET_API_TOKEN";

export type SetApiTokenAction = {
  type: typeof SET_API_TOKEN;
  token?: string;
};
export type UserAction = SetApiTokenAction;
export const setApiToken = (token?: string): UserAction => ({
  type: SET_API_TOKEN,
  token,
});

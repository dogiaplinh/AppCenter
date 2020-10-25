import { SET_API_TOKEN, UserAction } from "../actions";

export type UserState = {
  apiToken?: string;
  logged?: boolean;
};

const initState: UserState = {};

export const userState = (state: UserState = initState, action: UserAction): UserState => {
  switch (action.type) {
    case SET_API_TOKEN:
      return { ...state, apiToken: action.token, logged: !!action.token };

    default:
      return state;
  }
};

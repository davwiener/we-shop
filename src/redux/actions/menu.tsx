import { createAction } from "redux-actions";
import * as ACTION_TYPES from "../action-types";
import axios from "axios";

export const setMenuComponent = createAction(
  ACTION_TYPES.SET_MENU_SELECTED_COMPONENT
);

export const signInSuccess = createAction(ACTION_TYPES.SIGN_IN_SUCCESS);
export const logout = createAction(ACTION_TYPES.LOG_OUT);
export const setUserLogin = createAction(ACTION_TYPES.SET_USER_LOGIN);

export const signIn = async (email: any, password: any) => {
  return await axios.post("api/auth/signin", {
    email,
    password,
  });
};

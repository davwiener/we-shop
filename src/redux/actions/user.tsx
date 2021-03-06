import * as actionTypes from "../action-types";
import { userService } from "../../services/user-service";
import { Dispatch } from "react";
export const openPopUpAction = (popUp: string) => ({
  type: actionTypes.openPopUp,
  payload: popUp,
});
export const closePopUpAction = () => ({
  type: actionTypes.closePopUp,
});
export const userNameAction = () => ({
  type: actionTypes.userName,
});

export const login = (
  username: string,
  password: string,
  rememberMe: boolean
) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(request({ username }));
    userService
      .login(username, password)
      .then((user) => {
        if (rememberMe) {
          localStorage.username = username;
          localStorage.password = password;
        }
        dispatch(loginSuccess(username));
      })
      .catch((Error) => {
        dispatch(loginFailure(Error));
      });
  };
  function request(user: any) {
    return { type: actionTypes.request, user };
  }
};
export function loginSuccess(user: any) {
  return { type: actionTypes.connectSuccess, user };
}
export function loginFailure(error: Error) {
  return { type: actionTypes.connectFails, error };
}
export const register = (user: any) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(request(user.email));

    userService
      .register(user)
      .then((retUser) => {
        if (retUser.status === 201 && retUser.statusText === "Created") {
          dispatch(success(user.username));
        } else {
          dispatch(failure("error"));
        }
        // history.push("/login");
      })
      .catch((Error) => {
        dispatch(failure(Error));
      });
  };

  function request(user: any) {
    return { type: actionTypes.request, user };
  }
  function success(user: any) {
    return { type: actionTypes.registerSuccess, user };
  }
  function failure(error: any) {
    return { type: actionTypes.registerFails, error };
  }
};
export const disconnect = () => {
  return { type: actionTypes.disconnect };
};
export const newUser = () => {
  return { type: actionTypes.newUser };
};

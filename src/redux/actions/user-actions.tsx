import * as actionTypes from "../action-types";
import { string } from "yup";
import { userService } from "../../services/user-service";
import { useDispatch } from "react-redux";
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

export const login = (username: string, password: string) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(request({ username }));

    userService.login(username, password).then(
      (user) => {
        dispatch(success(user));
      },
      (error) => {
        dispatch(failure(error));
        //dispatch(alertActions.error(error));
      }
    );
  };

  function request(user: any) {
    return { type: actionTypes.request, user };
  }
  function success(user: any) {
    return { type: actionTypes.connectSuccess, user };
  }
  function failure(error: any) {
    return { type: actionTypes.connectFails, error };
  }
};

export const register = (user: any) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(request(user.email));

    userService.register(user).then(
      (retUser) => {
        dispatch(success(retUser));
        // history.push("/login");
      },
      (error) => {
        dispatch(failure(error));
      }
    );
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

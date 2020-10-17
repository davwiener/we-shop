import { AnyAction } from "redux";
import * as actionTypes from "../action-types";
import { UserState } from "../types/user-types";
export function userReducer(
  state: UserState = {
    userName: "",
    popUp: "none",
    connected: false,
    loaded: false,
    isLoading: true,
  },
  action: AnyAction
) {
  switch (action.type) {
    case actionTypes.userName: {
      return {
        ...state,
        userName: action.payload,
      };
    }
    case actionTypes.openPopUp: {
      return {
        ...state,
        popUp: action.payload,
      };
    }
    case actionTypes.closePopUp: {
      return {
        ...state,
        popUp: "none",
      };
    }
    case actionTypes.SIGN_IN_SUCCESS: {
      console.log("payload", action.payload);
      return {
        ...state,
        userName: action.payload.username,
      };
    }
    case actionTypes.LOG_OUT: {
      return {
        ...state,
        username: null,
      };
    }
    case actionTypes.connectSuccess: {
      return {
        ...state,
        userName: action.user,
        popUp: "none",
        connected: true,
        loaded: true,
      };
    }
    case actionTypes.connectFails: {
      return {
        ...state,
        popUp: "none",
        loaded: true,
      };
    }
    case actionTypes.registerFails: {
      return {
        ...state,
        popUp: "none",
        loaded: true,
      };
    }
    case actionTypes.registerSuccess: {
      return {
        ...state,
        userName: action.user,
        popUp: "none",
        connected: true,
        loaded: true,
      };
    }
    case actionTypes.disconnect: {
      return {
        ...state,
        userName: "",
        connected: false,
        loaded: true,
      };
    }
    case actionTypes.newUser: {
      return {
        ...state,
        loaded: true,
      };
    }
    default: {
      return state;
    }
    case actionTypes.FETCH_ACCOUNT_SUCCESS: {
      return {
        ...state,
        userName: action.payload.userName,
        isLoading: false,
      };
    }
  }
}

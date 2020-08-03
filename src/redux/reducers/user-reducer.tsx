import PopUpService from "../../services/popUp-service";
import { AnyAction } from "redux";
import * as actionTypes from "../action-types";
import { userState } from "../types/user-types";
export function userReducer(
  state: userState = { userName: "", popUp: "none", connected: false },
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
    case actionTypes.connectSuccess: {
      return {
        ...state,
        userName: action.user,
        popUp: "none",
        connected: true,
      };
    }
    case actionTypes.connectFails: {
      return {
        ...state,
        popUp: "none",
      };
    }
    case actionTypes.registerFails: {
      return {
        ...state,
        popUp: "none",
      };
    }
    case actionTypes.registerSuccess: {
      return {
        ...state,
        userName: action.user,
        popUp: "none",
        connected: true,
      };
    }
    default: {
      return state;
    }
  }
}

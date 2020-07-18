import PopUpService from "../../services/popUp-service";
import { AnyAction } from "redux";
import * as actionTypes from "../action-types";
export function userReducer(
  state: { userName: string } = { userName: "" },
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
        popUp: PopUpService.openPopup(action.payload),
      };
    }
    case actionTypes.closePopUp: {
      return {
        ...state,
        popUp: undefined,
      };
    }
    default: {
      return state;
    }
  }
}

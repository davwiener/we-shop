import PopUpService from "../../services/popUp-service";
import { AnyAction } from "redux";

export function userReducer(
  state: { userName: string } = { userName: "" },
  action: AnyAction
) {
  switch (action.type) {
    case "USER_NAME": {
      return {
        ...state,
        userName: action.payload,
      };
    }
    case "OPEN_POPUP": {
      return {
        ...state,
        popUp: PopUpService.openPopup(action.payload),
      };
    }
    case "CLOSE_POPUP": {
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

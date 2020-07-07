import { combineReducers, Action, AnyAction } from "redux";
import PopUpService from "../services/popUp-service";
import { Component } from "react";
export default combineReducers({});

export interface WeShoopState {
  userReducer: { userName: string };
  popUpReducer: PopUpState;
}
export interface PopUpState {
  popUp: Component | null;
}
export const INITIALE_STATE: WeShoopState = {
  userReducer: { userName: "" },
  popUpReducer: { popUp: null },
};

function userReducer(
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
    default: {
      return state;
    }
  }
}
function popUpReducer(
  state: PopUpState = INITIALE_STATE.popUpReducer,
  action: AnyAction
) {
  switch (action.type) {
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

// const closePopup = () => {
//   setShowPopup(false);
//   setPopup({});
// };

export const rootReducer = combineReducers({
  userReducer,
  popUpReducer,
});

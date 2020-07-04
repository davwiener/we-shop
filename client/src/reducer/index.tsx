import { combineReducers, Action, AnyAction } from "redux";
import React from "react";
import SignIn from "../we-shop/sign-in/sign-in";
import PopUpService from "../services/popUp-service";
export default combineReducers({});

export interface WeShoopState {
  userName: string;
  popUp: any;
}
export const INITIALE_STATE: WeShoopState = {
  userName: "",
  popUp: undefined,
};

function userReducer(state: WeShoopState, action: AnyAction) {
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
function popUpReducer(state: WeShoopState, action: AnyAction) {
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

export const rootReducer = popUpReducer;
// combineReducers({
//   userReducer,
//   popUpReducer,
// });

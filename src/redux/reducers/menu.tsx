import { AnyAction } from "redux";
import * as ACTION_TYPES from "../action-types";
import { MenuState } from "../types/menu";

export function menuReducer(
  state: MenuState = {
    activeComponent: "",
  },
  action: AnyAction
) {
  switch (action.type) {
    case ACTION_TYPES.SET_MENU_SELECTED_COMPONENT: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

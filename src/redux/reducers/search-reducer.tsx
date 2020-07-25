import { AnyAction } from "redux";
import * as actions from "../actions/search-actions";
import * as actionTypes from "../action-types";
import { filtersState } from "../types/search-types";

export const INITIAL_FILTER_STATE: filtersState = {
  price: {
    value: { min: 5, max: 17 },
    type: "range",
    action: actions.productPriceAction,
    text: "",
  },
  date: {
    value: {
      endDate: new Date(),
      startDate: new Date(),
    },
    type: "datePicker",
    action: actions.productDateAction,
    text: "",
  },
  productName: {
    value: "",
    type: "freeText",
    action: actions.productKindAction,
    text: "",
  },
  productKind: {
    value: "",
    type: "freeText",
    action: actions.productPriceAction,
    text: "",
  },
};

export function filtersReducer(
  state: filtersState = INITIAL_FILTER_STATE,
  action: AnyAction
) {
  switch (action.type) {
    case actionTypes.updateDate: {
      return {
        ...state,
        date: action.payload,
      };
    }
    case actionTypes.updatePrice: {
      return {
        ...state,
        price: { ...state.price, value: action.payload },
      };
    }
    case actionTypes.updateProductName: {
      return {
        ...state,
        productName: action.payload,
      };
    }
    case actionTypes.updateProductKind: {
      return {
        ...state,
        productKind: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

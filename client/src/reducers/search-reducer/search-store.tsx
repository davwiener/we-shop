import { AnyAction } from "redux";
import { INITIALE_FILTER_STATE, filtersState } from "./search-reducer.config";

export function filtersReducer(
  state: filtersState = INITIALE_FILTER_STATE,
  action: AnyAction
) {
  switch (action.type) {
    case "DATE": {
      return {
        ...state,
        date: action.payload,
      };
    }
    case "PRICE": {
      return {
        ...state,
        price: { ...state.price, value: action.payload },
      };
    }
    case "PRODUCT_NAME": {
      return {
        ...state,
        productName: action.paylaod,
      };
    }
    case "PRODUCT_KIND": {
      return {
        ...state,
        productKind: action.paylaod,
      };
    }
    default: {
      return state;
    }
  }
}

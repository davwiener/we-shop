import { AnyAction } from "redux";
import * as actions from "../actions/products-actions";
import * as actionTypes from "../action-types";
import { ProductsState } from "../types/search-types";

export const INITIAL_PRODUCTS_STATE: ProductsState = {
  filters: {},
  products: [],
  loaded: false,
};

export function filtersReducer(
  state: ProductsState = INITIAL_PRODUCTS_STATE,
  action: AnyAction
) {
  switch (action.type) {
    case actionTypes.addFilter: {
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };
    }
    case actionTypes.removeFilter: {
      const removeProperty = (dyProps: string, rest: any) => ({
        [dyProps]: _,
        ...rest
      }) => rest;
      const newStateFilter = removeProperty(
        action.payload.filterName,
        state.filters
      );
      return {
        ...state,
        filters: { ...newStateFilter },
      };
    }
    case actionTypes.searchStart: {
      return {
        ...state,
        loaded: false,
      };
    }
    case actionTypes.searchFails: {
      return {
        ...state,
        loaded: true,
      };
    }
    case actionTypes.searchSuccess: {
      return {
        ...state,
        loaded: true,
        products: action.payload.products,
      };
    }
    default: {
      return state;
    }
  }
}

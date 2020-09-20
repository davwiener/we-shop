import { AnyAction } from "redux";
import * as actionTypes from "../action-types";
import { ProductsState } from "../types/search-types";

export const INITIAL_PRODUCTS_STATE: ProductsState = {
  filters: { page: 1 },
  products: [],
  loaded: false,
  hasMore: true,
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
        products: state.products.concat(Array.from({ length: 20 })),
        // products: [...state.products, action.payload.products],
        hasMore: action.payload.hasMore,
      };
    }
    default: {
      return state;
    }
  }
}

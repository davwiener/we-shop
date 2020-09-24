import { AnyAction } from "redux";
import * as actionTypes from "../action-types";
import { AuctionsState } from "../types/search-types";

export const INITIAL_PRODUCTS_STATE: AuctionsState = {
  filters: { page: 1 },
  auctions: [],
  loaded: false,
  hasMore: true,
};

export function filtersReducer(
  state: AuctionsState = INITIAL_PRODUCTS_STATE,
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
        //products: state.auctions.concat(Array.from({ length: 20 })),
        auctions: [...state.auctions, action.payload.auctions],
        hasMore: action.payload.hasMore,
      };
    }
    default: {
      return state;
    }
  }
}

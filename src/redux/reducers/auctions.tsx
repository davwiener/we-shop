import { AnyAction } from "redux";
import * as actionTypes from "../action-types";
import { AuctionsState } from "../types/search-types";
const rbp = 25;
export const INITIAL_AUCTION_STATE: AuctionsState = {
  filters: { page: 1, rbp, sortBy: 'name' },
  auctions: [],
  query: { page: 1, rbp, sortBy: 'name' },
  loaded: false,
  hasMore: true,
};

export function auctionsReducer(
  state: AuctionsState = INITIAL_AUCTION_STATE,
  action: AnyAction
) {
  switch (action.type) {
    case actionTypes.addFilter: {
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
        query: action.payload,
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
    case actionTypes.updateQuery: {
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
        query: action.payload,
      };
    }
    case actionTypes.searchStart: {
      return {
        ...state,
        loaded: false,
        filters: { ...state.filters, ...action.payload },
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
        auctions: action.payload.newSearch
          ? action.payload.auctions
          : [...state.auctions, ...action.payload.auctions],
        hasMore: action.payload.hasMore,
        query: action.payload.query,
      };
    }
    default: {
      return state;
    }
  }
}

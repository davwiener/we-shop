import { AnyAction } from "redux";
import * as ACTION_TYPES from "../action-types";
import { AccountState } from "../types/account";

export function accountReducer(
  state: AccountState = {
    isLoggedIn: false,
    id: -1,
    name: "",
    isDataLoaded: false,
    isAccountAuctionsLoaded: false,
  },
  action: AnyAction
) {
  switch (action.type) {
    case ACTION_TYPES.FETCH_ACCOUNT_STARTED: {
      return {
        ...state,
      };
    }
    case ACTION_TYPES.FETCH_ACCOUNT_SUCCESS: {
      return {
        ...state,
        accountName: action.payload.accountName,
      };
    }
    case ACTION_TYPES.SIGN_IN_SUCCESS: {
      return {
        ...state,
        isLoggedIn: true,
      };
    }
    case ACTION_TYPES.SET_USER_LOGIN: {
      return {
        ...state,
        isLoggedIn: true,
      };
    }
    case ACTION_TYPES.LOG_OUT: {
      return {
        ...state,
        isLoggedIn: false,
      };
    }
    case ACTION_TYPES.ACCOUNT_AUCTIONS_LOADED: {
      return {
        ...state,
        isAccountAuctionsLoaded: true,
      };
    }
    default: {
      return state;
    }
  }
}

export const getAccountId = (state: AccountState) => state.id;
export const getAccountName = (state: AccountState) => state.name;
export const isAccountDataLoaded = (state: AccountState) => state.isDataLoaded;

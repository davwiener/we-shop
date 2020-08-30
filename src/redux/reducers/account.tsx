import { AnyAction } from "redux";
import * as ACTION_TYPES from "../action-types";
import { AccountState } from "../types/account";

export function accountReducer(
  state: AccountState = {
    id: -1,
    name: "",
    dataLoaded: false,
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
        ...action.payload,
        dataLoaded: true,
      };
    }
    default: {
      return state;
    }
  }
}

export const getAccountId = (state: AccountState) => state.id;
export const getAccountName = (state: AccountState) => state.name;
export const isAccountDataLoaded = (state: AccountState) => state.dataLoaded;

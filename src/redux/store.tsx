import { combineReducers } from "redux";
import { filtersReducer } from "./reducers/auctions-reducer";
import { accountReducer } from "./reducers/account";
import { userReducer } from "./reducers/user-reducer";
import { UserState } from "./types/user-types";
import { AuctionsState } from "./types/search-types";
import { AccountState } from "./types/account";

export const rootReducer = combineReducers({
  account: accountReducer,
  user: userReducer,
  search: filtersReducer,
});

export interface WeShopState {
  user: UserState;
  search: AuctionsState;
  account: AccountState;
}

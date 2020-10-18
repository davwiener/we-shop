import { combineReducers } from "redux";
import { AuctionsReducer } from "./reducers/auctions";
import { accountReducer } from "./reducers/account";
import { menuReducer } from "./reducers/menu";
import { userReducer } from "./reducers/user";
import { UserState } from "./types/user-types";
import { AuctionsState } from "./types/search-types";
import { AccountState } from "./types/account";
import { MenuState } from "./types/menu";

export const rootReducer = combineReducers({
  account: accountReducer,
  user: userReducer,
  auctions: AuctionsReducer,
  menu: menuReducer,
});

export interface WeShopState {
  user: UserState;
  auctions: AuctionsState;
  account: AccountState;
  menu: MenuState;
}

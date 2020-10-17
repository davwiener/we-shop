import { combineReducers } from "redux";
import { filtersReducer } from "./reducers/auctions-reducer";
import { accountReducer } from "./reducers/account";
import { menuReducer } from "./reducers/menu";
import { userReducer } from "./reducers/user-reducer";
import { UserState } from "./types/user-types";
import { AuctionsState } from "./types/search-types";
import { AccountState } from "./types/account";
import { MenuState } from "./types/menu";

export const rootReducer = combineReducers({
  account: accountReducer,
  user: userReducer,
  search: filtersReducer,
  menu: menuReducer,
});

export interface WeShopState {
  user: UserState;
  search: AuctionsState;
  account: AccountState;
  menu: MenuState;
}

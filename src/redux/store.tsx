import { combineReducers } from "redux";
import { auctionsReducer } from "./reducers/auctions";
import { accountReducer } from "./reducers/account";
import { menuReducer } from "./reducers/menu";
import { userReducer } from "./reducers/user";
import { cartReducer } from "./reducers/cart"
import { UserState } from "./types/user-types";
import { AuctionsState } from "./types/search-types";
import { AccountState } from "./types/account";
import { MenuState } from "./types/menu";
import { CartState } from "./types/cart";

export const rootReducer = combineReducers({
  account: accountReducer,
  user: userReducer,
  auctions: auctionsReducer,
  menu: menuReducer,
  cart: cartReducer
});

export interface WeShopState {
  user: UserState;
  auctions: AuctionsState;
  account: AccountState;
  menu: MenuState;
  cart: CartState;
}

import { combineReducers } from "redux";
import { filtersReducer } from "./reducers/products-reducer";
import { accountReducer } from "./reducers/account";
import { userReducer } from "./reducers/user-reducer";
import { UserState } from "./types/user-types";
import { ProductsState } from "./types/search-types";
import { AccountState } from "./types/account";

export const rootReducer = combineReducers({
  account: accountReducer,
  user: userReducer,
  search: filtersReducer,
});

export interface WeShopState {
  user: UserState;
  search: ProductsState;
  account: AccountState;
}

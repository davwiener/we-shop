import { combineReducers } from "redux";
import { filtersReducer } from "./reducers/products-reducer";
import { userReducer } from "./reducers/user-reducer";
import { UserState } from "./types/user-types";
import { ProductsState } from "./types/search-types";

export const rootReducer = combineReducers({
  user: userReducer,
  search: filtersReducer,
});

export interface WeShopState {
  user: UserState;
  search: ProductsState;
}

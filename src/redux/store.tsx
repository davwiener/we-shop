import { combineReducers } from "redux";
import { filtersReducer } from "./reducers/search-reducer";
import { userReducer } from "./reducers/user-reducer";
import { userState } from "./types/user-types";
import { filtersState } from "./types/search-types";

export const rootReducer = combineReducers({
  user: userReducer,
  search: filtersReducer,
});

export interface weShopState {
  user: userState;
  search: filtersState;
}

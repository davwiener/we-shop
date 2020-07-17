import { combineReducers, Action, AnyAction } from "redux";
import PopUpService from "../services/popUp-service";
import { Component } from "react";
import { number } from "yup";

import { filtersReducer } from "./search-reducer/search-store";
import { userReducer } from "./user-reducer/user-store";
import { userState } from "./user-reducer/user-recucer.config";
import { filtersState } from "./search-reducer/search-reducer.config";

export const rootReducer = combineReducers({
  userReducer,
  filtersReducer,
});

export interface weShopState {
  userReducer: userState;
  filtersReducer: filtersState;
}

import { createAction } from "redux-actions";
import * as ACTION_TYPES from "../action-types";
import { addInterceptors } from "../../util/auth";
import axios from "axios";

addInterceptors(axios);

export const fetchAccountStarted = createAction(
  ACTION_TYPES.FETCH_ACCOUNT_STARTED
);

export const fetchAccountSuccess = createAction(
  ACTION_TYPES.FETCH_ACCOUNT_SUCCESS
);

export const fetchAccountData = () => {
  return axios.get("/api/accounts/my_account");
};

export const saveAccountSettings = (query: any) => {
  return axios.put("/api/accounts/update", query);
};

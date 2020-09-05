import { createAction } from "redux-actions";
import * as ACTION_TYPES from "../action-types";
import { addInterceptors } from "../../util/auth";
import axios from "axios";

export const fetchUserAuctions = () => {
  return axios.get("/auctions/my_auctions");
};

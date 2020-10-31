import { createAction } from "redux-actions";
import * as ACTION_TYPES from "../action-types";

export const fetchCategoriesStarted = createAction(
  ACTION_TYPES.FETCH_CATEGORIES_STARTED
);

export const fetchCategoriesSuccess = createAction(
  ACTION_TYPES.FETCH_CATEGORIES_SUCCESS
);

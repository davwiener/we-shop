import * as actionTypes from "../action-types";
import { Dispatch } from "react";
import { searchService } from "../../services/search-service";
import axios from "axios";
import { WeShopState } from "../store";
import { QueryType } from "../types/search-types";
import { FilterValue } from "../../filters/filter.config";
export const addFilterAndSearchAction = (filter: {
  [filterName: string]: FilterValue;
}) => {
  return async (dispatch: Dispatch<any>, getState: any) => {
    let query = getState().search.query;
    query = { ...query, ...filter };
    // a new filter apply need to re-init page number
    if (query.page === getState().search.filters.page) {
      query.page = 1;
    }
    const newSearch =
      query.page === 1 || query.page === getState().search.filters.page;
    dispatch(addFilterAction(query));
    searchService
      .search(query)
      .then((res: any) => {
        dispatch(
          searchSuccess({
            auctions: res.data.auctions,
            hasMore: res.data.hasMore,
            newSearch,
          })
        );
      })
      .catch((Error) => {
        console.log(Error);
        dispatch(searchFails());
      });
  };
};
export const fetchUserAuctions = () => {
  return axios.get("/auctions/my_auctions");
};
export const updateQueryAction = (query: QueryType) => ({
  type: actionTypes.updateQuery,
  payload: { query },
});

export const addFilterAction = (filter: {
  [filterName: string]: FilterValue;
}) => ({
  type: actionTypes.addFilter,
  payload: filter,
});
export const removeFilterAction = (filterName: string) => ({
  type: actionTypes.removeFilter,
  payload: filterName,
});
const searchStart = () => ({
  type: actionTypes.searchStart,
});
const searchSuccess = (payload: {
  auctions: any;
  hasMore: boolean;
  newSearch: boolean;
}) => ({
  type: actionTypes.searchSuccess,
  payload,
});
const searchFails = () => ({
  type: actionTypes.searchFails,
});

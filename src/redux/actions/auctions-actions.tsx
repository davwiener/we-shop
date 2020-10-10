import * as actionTypes from "../action-types";
import { Dispatch } from "react";
import { searchService } from "../../services/search-service";
import axios from "axios";
import { WeShopState } from "../store";
import { QueryType } from "../types/search-types";
import { FilterValue } from "../../filters/filter.config";
import { useHistory } from "react-router-dom";
import * as _ from "lodash";

export const searchAuction = (
  query: {
    [filterName: string]: FilterValue;
  },
  newSearch: boolean
) => {
  return async (dispatch: Dispatch<any>) => {
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

export const updateSearchQuery = (filter: {
  [filterName: string]: FilterValue;
}) => {
  return async (dispatch: Dispatch<any>, getState: any) => {
    let query = getState().search.query;
    const currentQuery = query;
    query = { ...query, ...filter };
    if (_.isEqual(currentQuery, query)) {
      return;
    }
    // a new filter apply need to re-init page number
    if (query.page === getState().search.filters.page) {
      query.page = 1;
    }
    dispatch(updateQueryAction(query));
  };
};
export const fetchUserAuctions = () => {
  return axios.get("/auctions/my_auctions");
};
export const updateQueryAction = (query: QueryType) => ({
  type: actionTypes.updateQuery,
  payload: query,
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

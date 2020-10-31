import * as actionTypes from "../action-types";
import { Dispatch } from "react";
import { searchService } from "../../services/search-service";
import axios from "axios";
import { WeShopState } from "../store";
import { QueryType } from "../types/search-types";
import { FilterValue } from "../../filters/filter.config";
import * as _ from "lodash";
import { Action } from "redux";

export const searchAuction = (query: QueryType) => {
  return async (dispatch: Dispatch<any>, getState: () => WeShopState) => {
    // if (!_.isEqual(getState().auctions.query, query)) {
    //   dispatch(updateSearchQuery(query));
    // }

    dispatch(searchStart(query));
    const page = Number(query.page);
    const newSearch = page === 1 || page === getState().auctions.filters.page;
    searchService
      .search(query)
      .then((res: any) => {
        dispatch(
          searchSuccess({
            auctions: res.data.auctions,
            hasMore: res.data.hasMore,
            newSearch,
            query,
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
  return async (dispatch: Dispatch<Action>, getState: () => WeShopState) => {
    let query = getState().auctions.query;
    const currentQuery = query;
    query = { ...query, ...filter };
    if (_.isEqual(currentQuery, query)) {
      return;
    }
    // a new filter apply need to re-init page number
    if (query.page === getState().auctions.filters.page) {
      query.page = 1;
    }
    dispatch(updateQueryAction(query));
  };
};

export const fetchUserAuctions = () => {
  return axios.get("/api/auctions/");
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
const searchStart = (payload: QueryType) => ({
  type: actionTypes.searchStart,
  payload,
});
const searchSuccess = (payload: {
  auctions: any;
  hasMore: boolean;
  newSearch: boolean;
  query: QueryType;
}) => ({
  type: actionTypes.searchSuccess,
  payload,
});
const searchFails = () => ({
  type: actionTypes.searchFails,
});

import * as actionTypes from "../action-types";
import { Dispatch } from "react";
import { searchService } from "../../services/search-service";
import axios from "axios";
export const search = (
  query: { [key: string]: string },
  newSearch: boolean
) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(updateQueryAction(query));
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
export const updateQueryAction = (query: { [key: string]: string }) => ({
  type: actionTypes.updateQuery,
  payload: { query },
});

export const addFilterAction = (filterName: string, value: any) => ({
  type: actionTypes.addFilter,
  payload: { [filterName]: value },
});
export const removeFilterAction = (filterName: string) => ({
  type: actionTypes.removeFilter,
  payload: filterName,
});
const searchStart = () => ({
  type: actionTypes.searchStart,
});
const searchSuccess = (products: any) => ({
  type: actionTypes.searchSuccess,
  payload: products,
});
const searchFails = () => ({
  type: actionTypes.searchFails,
});

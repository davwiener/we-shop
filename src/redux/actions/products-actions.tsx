import * as actionTypes from "../action-types";
import { Dispatch } from "react";
import { searchService } from "../../services/search-service";

export const search = (filters: { [key: string]: string }) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(searchStart);
    searchService
      .search(filters)
      .then((products: any) => {
        dispatch(searchSuccess(products));
      })
      .catch((Error) => {
        dispatch(searchFails());
      });
  };
};

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

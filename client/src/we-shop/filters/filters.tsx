import React, { useState } from "react";
import Filter from "./filter/filter";
import { useSelector } from "react-redux";
import { weShopState } from "../../reducers/store";
import { filtersState } from "../../reducers/search-reducer/search-reducer.config";

//: { text: string; type: string; value: any; action: any }[]
function Filters() {
  const filters: filtersState = useSelector((state: weShopState) => {
    return state.filtersReducer;
  });
  return (
    <div>
      {Object.keys(filters).map((f: string) => (
        <div>
          <Filter filter={filters[f]}></Filter>
        </div>
      ))}
    </div>
  );
}
export default Filters;

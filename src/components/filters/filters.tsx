import React from "react";
import Filter from "./filter/filter";
import { useSelector } from "react-redux";
import { weShopState } from "../../redux/store";
import { filtersState } from "../../redux/types/search-types";

function Filters() {
  const filters: filtersState = useSelector((state: weShopState) => {
    return state.search;
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

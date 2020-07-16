import React, { useState } from "react";
import Filter from "./filter/filter";
import {
  prodcutKindAction,
  productPriceAction,
  productDateAction,
} from "../../reducer/actions";
import { useDispatch, useSelector } from "react-redux";
import { WeShoopState } from "../../reducer/store.config";

//: { text: string; type: string; value: any; action: any }[]
function Filters() {
  const filters = useSelector((state: WeShoopState) => {
    return state.filtersReducer;
  });
  return (
    <div>
      {Object.keys(filters).map((f) => (
        <div>
          <Filter filter={filters[f]}></Filter>
        </div>
      ))}
    </div>
  );
}
export default Filters;

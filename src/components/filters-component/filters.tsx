import React from "react";
import Filter from "./filter/filter";
import { FilterClass } from "../../filters/filter";

function Filters(props: { filters: FilterClass[] }) {
  return (
    <div>
      {props.filters.map((filter: FilterClass) => (
        <div>
          <Filter filter={filter}></Filter>
        </div>
      ))}
    </div>
  );
}
export default Filters;

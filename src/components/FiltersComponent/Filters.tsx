import React from "react";
import Filter from "./Filter/Filter";
import { FilterClass } from "../../filters/filter";

function Filters(props: { filters: FilterClass[] }) {
  return (
    <div>
      {props.filters.map((filter: FilterClass) => (
        <div key={`auction-page-filters-${filter.filterName}`}>
          <Filter filter={filter}></Filter>
        </div>
      ))}
    </div>
  );
}
export default Filters;

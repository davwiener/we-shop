import React from "react";
import Filter from "./Filter/Filter";
import { FilterClass } from "../../filters/filter";
import { FilterValue } from "../../filters/filter.config";

function Filters(props: {
  filters: FilterClass[];
  filtersStateValues: { [key: string]: FilterValue };
}) {
  const addStateValue = (filter: FilterClass) => {
    const stateFilterValue = props.filtersStateValues[filter.filterName];
    if (stateFilterValue && filter.getValue() !== stateFilterValue) {
      filter.setValue(stateFilterValue);
    }
    return filter;
  };

  return (
    <div>
      {props.filters.map((filter: FilterClass) => (
        <div key={`auction-page-filters-${filter.filterName}`}>
          <Filter filter={addStateValue(filter)}></Filter>
        </div>
      ))}
    </div>
  );
}
export default Filters;

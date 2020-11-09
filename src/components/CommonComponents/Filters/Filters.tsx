import React from "react";
import { filterClass } from "../../../filters/filter";
import { FilterType } from "../../../filters/filter.config";
import DropdownFilter from "./DropdownFilter/DropdownFilter";
import DateFilter from "./DateFilter/DateFilter";
import FreeTextFilter from "./FreeTextFilter/FreeText";
import RangeFilter from "./RangeFilter/RangeFilter";
import { rangeFilter } from "../../../filters/rangeFilter";
import "./Filters.scss";
function Filters(props: {
  filters: filterClass[];
  updateFilter: (value: { [key: string]: string }) => void;
}) {
  return (
    <div className="filters">
      {props.filters.map((filter: filterClass) => (
        <div className="filter" key={`filters-${filter.filterName}`}>
          {filter.filterType === FilterType.Dropdown && (
            <DropdownFilter
              filter={filter}
              updateFilter={props.updateFilter}
            ></DropdownFilter>
          )}
          {filter.filterType === FilterType.FreeText && (
            <FreeTextFilter
              filter={filter}
              updateFilter={props.updateFilter}
            ></FreeTextFilter>
          )}
          {filter.filterType === FilterType.Date && (
            <DateFilter
              filter={filter}
              updateFilter={props.updateFilter}
            ></DateFilter>
          )}
          {filter.filterType === FilterType.Range && (
            <RangeFilter
              filter={filter as rangeFilter}
              updateFilter={props.updateFilter}
            ></RangeFilter>
          )}
        </div>
      ))}
    </div>
  );
}
export default Filters;

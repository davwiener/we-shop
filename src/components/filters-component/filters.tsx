import React, { useState } from "react";
import Filter from "./filter/filter";
import { RangeFilter } from "../../filters/range-filter";
import { DateFilter } from "../../filters/date-filter";
import { FreeTextFilter } from "../../filters/free-text-filter";
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

import React, { useEffect, useLayoutEffect, useState } from "react";
import { DateFilter } from "../../../filters/dateFilter";
import { FreeTextFilter } from "../../../filters/freeRextFilter";
import { RangeFilter } from "../../../filters/RangeFilter";
import Filters from "../../FiltersComponent/Filters";

export function AuctionFilters (props: ) {
    const dateFilter = new DateFilter("date", {
        startDate: new Date(),
        endDate: new Date(),
      });
      const rangeFilter = new RangeFilter("price", { min: 0, max: 1000 });
      const kindFilter = new FreeTextFilter("model", "");
      const nameFilter = new FreeTextFilter("name", "");
      const filters = {
        [dateFilter.filterName]: dateFilter,
        [rangeFilter.filterName]: rangeFilter,
        [kindFilter.filterName]: kindFilter,
        [nameFilter.filterName]: nameFilter,
      };
    return  <div className="filters">
    <Filters
      filters={Object.values(filters)}
      filtersStateValues={props.filtersStateValues}
    ></Filters>
  </div>
}
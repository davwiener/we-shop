
import React from "react";
import { useDispatch } from "react-redux";
import { filterClass } from "../../../filters/filter";
import { FilterValue } from "../../../filters/filter.config";
import { updateSearchQuery } from "../../../redux/actions/auctions";
import { QueryType } from "../../../redux/types/search-types";
import Filters from "../../CommonComponents/Filters/Filters";
import {auctionFilters} from "./AuctionFilterConfig"


export function AuctionFilters (props: {filtersStateValues: QueryType} ) {
    const filters = auctionFilters;
    const dispatch = useDispatch();
    const updateFilter = (value: Record<string, FilterValue>) => {
        dispatch(updateSearchQuery(value));
    }
    const addStateValue = (filter: filterClass) => {
        const stateFilterValue = filter.getFilterFromQuery(props.filtersStateValues, filter);
        if (stateFilterValue && filter.getValue() !== stateFilterValue) {
            filter.setValue(stateFilterValue);
        }
        return filter;
    };
    return  (
        <Filters
            filters={Object.values(filters).map(filter => addStateValue(filter))}
            updateFilter={updateFilter}
        ></Filters>)
}

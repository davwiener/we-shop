import React, { useState } from "react";
import InputText from "../../common-components/input-text/input-text";
import "./filter.scss";
import InputRange, { Range } from "react-input-range";
import "react-input-range/lib/css/index.css";

import "react-datepicker/dist/react-datepicker.css";
import "rc-slider/assets/index.css";
import { useDispatch } from "react-redux";
import { FilterClass } from "../../../filters/filter";
import { FilterType, FilterValue } from "../../../filters/filter.config";
import { addFilterAndSearchAction } from "../../../redux/actions/auctions-actions";
import { TextField } from "@material-ui/core";
function Filter(props: { filter: FilterClass }) {
  const dispatch = useDispatch();
  const [filterValue, setFilterValue] = useState(props.filter.getValue());
  const updateFilter = (val: FilterValue) => {
    props.filter.setValue(val);
    setFilterValue(() => props.filter.getValue());
    dispatch(addFilterAndSearchAction(props.filter.parseToQuery()));
  };
  return (
    <div>
      <div className="filter-container">
        <div className="filter">{props.filter.filterName}</div>
        {props.filter.filterType === FilterType.FreeText && (
          <InputText
            value={filterValue}
            onChange={(val: string) => {
              setFilterValue(val);
            }}
            onKeyDown={(e: any) => {
              if (e.key === "Enter") {
                updateFilter(filterValue);
              }
            }}
            onKeyUp={(e: any) => {
              if (e.key === "Enter") {
                updateFilter(filterValue);
              }
            }}
          ></InputText>
        )}
        {props.filter.filterType === FilterType.Date && (
          <TextField
            onChange={(e: any) => {
              updateFilter({
                startDate: e.target.value,
                endDate: e.target.value,
              });
            }}
            id="add-auction-end-date"
            label="Auction End Date and Time"
            type="datetime-local"
            name="end_date"
            defaultValue={filterValue}
            inputProps={{ min: new Date() }}
            InputLabelProps={{
              shrink: true,
            }}
            value={filterValue}
          />
        )}
        {props.filter.filterType === FilterType.Range && (
          <InputRange
            maxValue={10000}
            minValue={0}
            value={filterValue}
            onChange={(value: Range | number) => {
              setFilterValue(value);
            }}
            onChangeComplete={(value: Range | number) => {
              updateFilter(value);
            }}
          />
        )}
      </div>
    </div>
  );
}
export default Filter;

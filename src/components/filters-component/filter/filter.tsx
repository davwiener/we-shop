import React, { useState } from "react";
import InputText from "../../common-components/input-text/input-text";
import "./filter.scss";
import InputRange, { Range } from "react-input-range";
import "react-input-range/lib/css/index.css";

import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "rc-slider/assets/index.css";
import { useDispatch } from "react-redux";
import { FilterClass } from "../../../filters/filter";
import { FilterType, FilterValue } from "../../../filters/filter.config";
import { addFilterAction } from "../../../redux/actions/products-actions";
function Filter(props: { filter: FilterClass }) {
  const dispatch = useDispatch();
  const [filterValue, setFilterValue] = useState(props.filter.getValue());
  const updateFilter = (val: FilterValue) => {
    props.filter.setValue(val);
    setFilterValue(() => props.filter.getValue());
    dispatch(addFilterAction(props.filter.filterName, filterValue));
  };
  return (
    <div>
      <div className="filter-container">
        <div className="filter">{props.filter.filterName}</div>
        {props.filter.filterType === FilterType.FreeText && (
          <InputText
            value={filterValue}
            onChange={(val: string) => {
              updateFilter(val);
            }}
          ></InputText>
        )}
        {props.filter.filterType === FilterType.Date && (
          <Datepicker
            selected={filterValue}
            onChange={(date: any) => {
              updateFilter({ startDate: date, endDate: date });
            }}
          />
        )}
        {props.filter.filterType === FilterType.Range && (
          <InputRange
            maxValue={20}
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

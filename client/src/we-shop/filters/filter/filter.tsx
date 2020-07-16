import React from "react";
import InputText from "../../components/input-text/input-text";
import "./filter.scss";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import { useDispatch } from "react-redux";
import { Action } from "redux";
let x = { min: 2, max: 10 };
function Filter(props: {
  filter: { text: string; type: string; value: any; action: CallableFunction };
}) {
  const dispatch = useDispatch();
  return (
    <div>
      <div className="filter-container">
        <div className="filter">{props.filter.text}</div>
        {props.filter.type === "freeText" && <InputText></InputText>}
        {props.filter.type === "datePicker" && (
          <Datepicker
            selected={new Date()}
            onChange={(date: any) => {
              dispatch(props.filter.action(date));
            }}
          />
        )}
        {props.filter.type === "range" && (
          <InputRange
            maxValue={20}
            minValue={0}
            value={props.filter.value}
            onChange={(value: any) => {
              dispatch(props.filter.action(value));
            }}
          />
        )}
      </div>
    </div>
  );
}
export default Filter;

import React from "react";
import InputText from "../../components/input-text/input-text";
import "./filter.scss";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
let x = { min: 2, max: 10 };
function Filter(props: any) {
  return (
    <div>
      <div className="filter-container">
        <div className="filter">{props.filter.text}</div>
        {props.filter.type === "freeText" && <InputText></InputText>}
        {props.filter.type === "datePicker" && (
          <Datepicker
            selected={new Date()}
            onChange={(date: any) => console.log(date)}
          />
        )}
        {props.filter.type === "range" && (
          <InputRange
            maxValue={20}
            minValue={0}
            value={x}
            onChange={(value: any) => {
              x = value;
            }}
          />
        )}
      </div>
    </div>
  );
}
export default Filter;

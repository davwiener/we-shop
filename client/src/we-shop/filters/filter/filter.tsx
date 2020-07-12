import React from "react";
import InputText from "../../components/input-text/input-text";
import "./filter.scss";
function Filter(props: any) {
  return (
    <div className="filter-container">
      <div className="filter">{props.filter.text}</div>
      {props.filter.type === "freeText" && <InputText></InputText>}
    </div>
  );
}
export default Filter;

import React from "react";
import "./input-text.scss";
function InputText(props: any) {
  return (
    <input
      name={props.name}
      className={props.valid ? "valid input" : "input"}
      required
      placeholder={props.placeholder}
      type={props.type ? props.type : ""}
      id={props.id ? props.id : ""}
      value={props.value}
      onChange={(event) => props.onChange(event.target.value)}
      onBlur={props.handleBlur}
    />
  );
}

export default InputText;

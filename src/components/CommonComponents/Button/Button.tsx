import React from "react";
import "./Button.scss";
function Button(props: any) {
  return (
    <div className="button-container">
      <button
        className={props.secondaryButton ? "button secondary-button" : "button"}
        disabled={props.disabled}
        type={props.type ? props.type : ""}
        onClick={props.onClick}
      >
        {props.text}
      </button>
    </div>
  );
}
export default Button;

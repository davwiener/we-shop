import React from "react";
import "./we-shop-button.scss";
function WeShopButton(props) {
  return (
    <div className={"button-container "}>
      <button
        disabled={props.disabled}
        type={props.type ? props.type : ""}
        className={props.seconderyButton ? "secondery-button" : ""}
        onClick={props.onClick}
      >
        {props.text}
      </button>
    </div>
  );
}
export default WeShopButton;

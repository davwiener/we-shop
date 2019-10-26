import React from "react";

function WeShopButton(props) {
  return (
    <div className="cofirm-button">
      <button onClick={props.onClick}>{props.text}</button>
    </div>
  );
}
export default WeShopButton;

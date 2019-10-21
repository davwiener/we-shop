import React from "react";

function ConfirmButton(props) {
  return (
    <button className="cofirm-button" onClick={props.onClick}>
      Confirm
    </button>
  );
}
export default ConfirmButton;

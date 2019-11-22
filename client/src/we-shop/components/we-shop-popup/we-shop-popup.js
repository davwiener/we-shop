import React, { useState } from "react";
import "./we-shop-popup.scss";

function WeShopPopUp(props) {
  console.log("popup");
  return (
    <div className="popup">
      <div className="popup_inner">{props.content}</div>
    </div>
  );
}
export default WeShopPopUp;

import "./we-shop-popup.scss";
import React from "react";
function WeShopPopUp(props: any) {
  console.log("popup");
  return (
    <div className="popup">
      <div className="popup_inner">{props.content}</div>
    </div>
  );
}
export default WeShopPopUp;

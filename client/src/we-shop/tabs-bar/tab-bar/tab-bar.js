import React from "react";
import "./tab-bar.scss";
function TabBar(props) {
  return (
    <div className="tab" onClick={() => props.onClick(props.tab)}>
      {props.tab}
    </div>
  );
}
export default TabBar;

import React from "react";
import "./tab-bar.scss";
function TabBar(props: any) {
  return (
    <div className="tab" onClick={() => props.onClick(props.tab)}>
      {props.tab}
    </div>
  );
}
export default TabBar;

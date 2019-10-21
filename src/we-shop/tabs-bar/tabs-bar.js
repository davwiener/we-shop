import React from "react";
import "./tabs-bar.scss";
import TabBar from "./tab-bar/tab-bar";

function TabsBar(props) {
  return (
    <div className="tabs">
      {props.tabs.map((tab, index) => (
        <TabBar
          key={index}
          tab={tab.name}
          index={index}
          onClick={props.onClick(tab.name)}
        ></TabBar>
      ))}
    </div>
  );
}
export default TabsBar;

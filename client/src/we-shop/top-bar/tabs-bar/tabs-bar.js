import React from "react";
import "./tabs-bar.scss";
import TabBar from "./tab-bar/tab-bar";

function TabsBar(props) {
  return (
    <div className="tabs">
      {props.tabs.map((tab, index) => (
        <div>
          <TabBar
            key={index}
            tab={tab.name}
            index={index}
            onClick={tab => props.onClick(tab)}
          ></TabBar>
        </div>
      ))}
    </div>
  );
}
export default TabsBar;

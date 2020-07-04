import "./tabs-bar.scss";
import TabBar from "./tab-bar/tab-bar";
import React from "react";

function TabsBar(props: any) {
  return (
    <div className="tabs">
      {props.tabs.map((tab: any, index: number) => (
        <div>
          <TabBar
            key={index}
            tab={tab.name}
            index={index}
            onClick={(tab: string) => props.onClick(tab)}
          ></TabBar>
        </div>
      ))}
    </div>
  );
}
export default TabsBar;

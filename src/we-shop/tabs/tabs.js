import React, { Component } from "react";
import "./tabs.scss";
import Tab from "./tab/tab";

function Tabs(props) {
  return (
    <div className="tabs">
      {props.tabs.map((tab, index) => (
        <Tab key={index} tab={tab} index={index}></Tab>
      ))}
    </div>
  );
}
export default Tabs;

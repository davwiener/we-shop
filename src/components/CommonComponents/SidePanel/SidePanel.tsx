import React from "react";
import "./SidePanel.scss";

const SidePanel = (props: any) => {
  return <div className="sidePanel">{props.children}</div>;
};

export default SidePanel;

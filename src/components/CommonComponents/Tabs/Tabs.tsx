import React from "react";
import Tab from "./Tab";
import "./Tabs.scss";
import Divider from "@material-ui/core/Divider";

const Tabs = (props: any) => {
  return (
    <div className="tabs">
      {props.children.map((child: any, index: number) => (
        <div key={index}>
          <Tab
            index={child.props.index}
            label={child.props.label}
            onClick={props.onChange}
          />
          {index < props.children.length - 1 && (
            <Divider variant="fullWidth" classes={{ root: "tabs" }} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Tabs;

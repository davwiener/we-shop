import React from "react";
import "./Tab.scss";

const Tab = (props: any) => {
  const handleClick = () => {
    props.onClick(props.index);
  };
  return (
    <div onClick={handleClick} className="tab">
      <div>{props.label}</div>
    </div>
  );
};

export default Tab;

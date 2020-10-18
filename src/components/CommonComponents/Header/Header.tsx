import React from "react";
import "./Header.scss";

const Header = ({ title }: any) => {
  return (
    <div className="header">
      <div className="title">{title}</div>
    </div>
  );
};

export default Header;

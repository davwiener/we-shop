import React from "react";
import AccountMenu from "../Menus/AccountMenu";
import MainMenu from "../Menus/MainMenu";
import "./TopBar.scss";

function TopBar() {
  return (
    <div className="topBar">
      <MainMenu />
      <div>We Shop</div>
      <AccountMenu />
    </div>
  );
}

export default TopBar;

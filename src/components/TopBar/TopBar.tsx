import React from "react";
import AccountMenu from "../Menus/AccountMenu";
import MainMenu from "../Menus/MainMenu";
import CartMenu from "../Menus/CartMenu/CartMenu";
import "./TopBar.scss";

function TopBar() {
  return (
    <div className="topBar">
      <MainMenu />
      <div>We Shop</div>
      <div className="right-menus">
        <AccountMenu />
        <CartMenu />
      </div>
    </div>
  );
}

export default TopBar;

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
      <AccountMenu />
      <CartMenu />
    </div>
  );
}

export default TopBar;

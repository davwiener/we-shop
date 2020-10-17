import "./TopBar.scss";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { WeShopState } from "../../redux/store";
import { MENU_ITEMS } from "../../constants/menu";
import AccountMenu from "../Menus/AccountMenu";
import MainMenu from "../Menus/MainMenu";

function TopBar() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <MainMenu />
          <AccountMenu />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default TopBar;

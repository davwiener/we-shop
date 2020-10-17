import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
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

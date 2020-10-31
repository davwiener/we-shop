import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import SideMenu from "./SideMenu";

const MainMenu = () => (
  <SideMenu icon={<MenuIcon />} side="left">
    <Link to="/auctions">Auctions</Link>
    <Link to="/auctions">Test</Link>
  </SideMenu>
);

export default MainMenu;

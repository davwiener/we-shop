import React, { useState } from "react";
import "./we-shop.scss";
import SignIn from "./sign-in/sign-in";
import TabsBar from "./top-bar/tabs-bar/tabs-bar";
import DefaultTab from "./tabs/defualt-tab";
import TopBar from "./top-bar/top-bar";

function WeShop() {
  const [tabs, setTabs] = useState([
    { name: "My Acount" },
    { name: "Products" },
    { name: "Today's Deals" },
    { name: "Help" }
  ]);
  const [isConnected, setIsConnected] = useState(false);
  const [currentTab, setCurrentTab] = useState(DefaultTab);
  function openPopUp(tabName) {
    console.log(tabName);
    switch (tabName) {
      case "My Acount": {
        break;
      }
      case "Products": {
        break;
      }
      case "Today's Deals": {
        break;
      }
      case "Help": {
        break;
      }
      case "Register": {
      }
      default: {
        break;
      }
    }
  }
  return (
    <div>
      <TopBar
        tabs={tabs}
        openPopUp={popUpName => openPopUp(popUpName)}
      ></TopBar>
    </div>
    // )
    // );
  );
}

export default WeShop;

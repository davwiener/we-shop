import React, { useState } from "react";
import "./we-shop.scss";
import SignIn from "./sign-in/sign-in";
import TabsBar from "./tabs-bar/tabs-bar";
import DefaultTab from "./tabs/defualt-tab";

function WeShop() {
  const [tabs, setTabs] = useState([
    { name: "My Acount" },
    { name: "Products" },
    { name: "Today's Deals" },
    { name: "Help" }
  ]);
  const [isConnected, setIsConnected] = useState(false);
  const [currentTab, setCurrentTab] = useState(DefaultTab);
  let ret;
  function changeTab(tabName) {
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
      default: {
        break;
      }
    }
  }
  return (
    <div>
      {!isConnected && (
        <SignIn newUser={true} isConnected={isConnected}></SignIn>
      )}
      <TabsBar
        key="tabs"
        tabs={tabs}
        className="container"
        onClick={changeTab}
      ></TabsBar>
      {currentTab}
    </div>
    // )
    // );
  );
}

export default WeShop;

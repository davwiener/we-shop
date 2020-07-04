import "./we-shop.scss";
import SignIn from "./sign-in/sign-in";
import TabsBar from "./top-bar/tabs-bar/tabs-bar";
//import DefaultTab from "./tabs/defualt-tab";

import TopBar from "./top-bar/top-bar";
import WeShopPopup from "./components/we-shop-popup/we-shop-popup";
import DefaultTab from "./tabs/defualt-tab";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { WeShoopState } from "./../reducer/index";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function WeShop() {
  const [tabs, setTabs] = useState([
    { name: "My Acount" },
    { name: "Products" },
    { name: "Today's Deals" },
    { name: "Help" },
  ]);
  const [isConnected, setIsConnected] = useState(false);
  const [currentTab, setCurrentTab] = useState(DefaultTab);

  const [showPopup, setShowPopup] = useState(false);

  const popUp = useSelector((state: WeShoopState) => {
    return state.popUp;
  });

  return (
    <div className="we-shop">
      {popUp ? <WeShopPopup content={popUp}></WeShopPopup> : null}
      <TopBar tabs={tabs}></TopBar>
      <Router></Router>
    </div>
  );
}

export default WeShop;

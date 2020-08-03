import "./we-shop.scss";
import TopBar from "../components/top-bar/top-bar";
import WeShopPopup from "../components/common-components/popup/popup";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MyAccount from "../components/my-account/my-account";
import Products from "../components/products/products";
import TodayDeals from "../components/today-deals/today-deals";
import About from "../components/about/about";
import { weShopState } from "../redux/store";
import Noty from "noty";
import PopUpService from "../services/popUp-service";

setTimeout(() => {
  new Noty({
    text: "This is a notification!",
    layout: "bottom",
    theme: "bootstrap-v4",
    type: "error",
  }).show();
}, 500);

function WeShop() {
  const [tabs] = useState([
    { name: "My Account", path: "/my-account" },
    { name: "Products", path: "/products" },
    { name: "Today's Deals", path: "/today-deals" },
    { name: "Help", path: "/about" },
  ]);

  const popUp = useSelector((state: weShopState) => {
    return state.user.popUp;
  });

  return (
    <div className="we-shop">
      {popUp !== "none" && (
        <WeShopPopup content={PopUpService.openPopup(popUp)}></WeShopPopup>
      )}
      <Router>
        <TopBar tabs={tabs}></TopBar>
        <Switch>
          <Route path="/about">
            <About></About>
          </Route>
          <Route path="/products">
            <Products></Products>
          </Route>
          <Route path="/my-account">
            <MyAccount></MyAccount>
          </Route>
          <Route path="/today-deals">
            <TodayDeals></TodayDeals>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default WeShop;

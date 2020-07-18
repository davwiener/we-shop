import "./we-shop.scss";
import TopBar from "../components/top-bar/top-bar";
import WeShopPopup from "../components/common-components/we-shop-popup/we-shop-popup";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MyAcount from "../components/my-acount/my-acount";
import Products from "../components/products/products";
import TodayDeals from "../components/today-deals/today-deals";
import About from "../components/about/about";
import { weShopState } from "../redux/store";

function WeShop() {
  const [tabs] = useState([
    { name: "My Acount", path: "/my-acount" },
    { name: "Products", path: "/products" },
    { name: "Today's Deals", path: "/today-deals" },
    { name: "Help", path: "/about" },
  ]);

  const popUp = useSelector((state: weShopState) => {
    return state.user.popUp;
  });

  return (
    <div className="we-shop">
      {popUp ? <WeShopPopup content={popUp}></WeShopPopup> : null}
      <Router>
        <TopBar tabs={tabs}></TopBar>
        <Switch>
          <Route path="/about">
            <About></About>
          </Route>
          <Route path="/products">
            <Products></Products>
          </Route>
          <Route path="/my-acount">
            <MyAcount></MyAcount>
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

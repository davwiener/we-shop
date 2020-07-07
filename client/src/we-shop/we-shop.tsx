import "./we-shop.scss";
import TopBar from "./top-bar/top-bar";
import WeShopPopup from "./components/we-shop-popup/we-shop-popup";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MyAcount from "./my-acount/my-acount";
import Products from "./products/products";
import TodayDeals from "./today-deals/today-deals";
import About from "./about/about";
import { WeShoopState } from "../reducer/store";
function WeShop() {
  const [tabs] = useState([
    { name: "My Acount", path: "/my-acount" },
    { name: "Products", path: "/products" },
    { name: "Today's Deals", path: "/today-deals" },
    { name: "Help", path: "/about" },
  ]);

  const popUp = useSelector((state: WeShoopState) => {
    return state.popUpReducer.popUp;
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

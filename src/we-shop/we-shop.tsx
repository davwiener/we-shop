import "./we-shop.scss";
import TopBar from "../components/top-bar/top-bar";
import WeShopPopup from "../components/common-components/popup/popup";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Account from "../components/Account/Account";
import Auctions from "../components/auctions/auctions";
import TodayDeals from "../components/today-deals/today-deals";
import About from "../components/about/about";
import { WeShopState } from "../redux/store";
import Noty from "noty";
import PopUpService from "../services/popUp-service";
import * as userActions from "../redux/actions/user-actions";
import AddProduct from "../components/add-auction/add-auction";
import Button from "../components/common-components/button/button";
setTimeout(() => {
  new Noty({
    text: "This is a notification!",
    layout: "bottom",
    theme: "bootstrap-v4",
    type: "error",
  }).show();
}, 500);

function WeShop() {
  const dispatch = useDispatch();
  const [tabs] = useState([
    { name: "My Account", path: "/account" },
    { name: "Auctions", path: "/Auctions" },
    { name: "Today's Deals", path: "/today-deals" },
    { name: "Help", path: "/about" },
  ]);
  useEffect(() => {
    if (localStorage.username && localStorage.password) {
      dispatch(
        userActions.login(localStorage.username, localStorage.password, false)
      );
    } else {
      dispatch(userActions.newUser());
    }
  }, []);

  const popUp = useSelector((state: WeShopState) => {
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
          <Route path="/auctions">
            <Auctions></Auctions>
          </Route>
          <Route path="/account">
            <Account />
          </Route>
          <Route path="/today-deals">
            <TodayDeals></TodayDeals>
          </Route>
          <Route path="/add-product">
            <AddProduct></AddProduct>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default WeShop;

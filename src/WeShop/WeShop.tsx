import TopBar from "../components/TopBar/TopBar";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Account from "../components/Account/Account";
import { setUserLogin } from "../redux/actions/menu";
import Login from "../components/Login/Login";
import AuthRequiredRoute from "../components/AuthRequiredRoute/AuthRequiredRoute";
import { isLoggedIn } from "../util/auth";
import Register from "../components/Register/Register";
import Auctionss from "../components/Auctions/Auctionss";
import "./WeShop.scss";

function WeShop() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLoggedIn()) {
      dispatch(setUserLogin());
    }
  });
  return (
    <div>
      <Router>
        <TopBar />
        <div className="main">
          <Switch>
            <Route exact path="/auctions" component={Auctionss}></Route>
            {/* <Route path="/auctions/:id" component={Auction}></Route> */}
            <AuthRequiredRoute
              exact
              path="/account"
              component={Account}
            ></AuthRequiredRoute>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default WeShop;

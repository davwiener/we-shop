import TopBar from "../components/TopBar/TopBar";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Account from "../components/Account/Account";
import { ACCOUNT_TABS } from "../constants/Account";
import Auctions from "../components/auctions/auctions";
import { setUserLogin } from "../redux/actions/menu";
import About from "../components/about/about";
import Login from "../components/Login/Login";
import AuthRequiredRoute from "../components/AuthRequiredRoute/AuthRequiredRoute";
import { isLoggedIn } from "../util/auth";
import Register from "../components/Register/Register";

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
        <Switch>
          <Route path="/about" component={About}></Route>
          <Route path="/auctions" component={Auctions}></Route>
          <AuthRequiredRoute
            exact
            path="/account"
            component={() => <Redirect to="/account/settings" />}
          ></AuthRequiredRoute>
          <AuthRequiredRoute
            path="/account/settings"
            component={() => <Account activeTab={ACCOUNT_TABS.SETTINGS_TAB} />}
          ></AuthRequiredRoute>
          <AuthRequiredRoute
            path="/account/auctions"
            component={() => <Account activeTab={ACCOUNT_TABS.AUCTIONS_TAB} />}
          ></AuthRequiredRoute>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default WeShop;

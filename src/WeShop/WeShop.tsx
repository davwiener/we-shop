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
import Auctions from "../components/Auctions/Auctions";
import "./WeShop.scss";
import Cart from "../pages/Cart/Cart"
import { BuyingAuction } from "../redux/types/cart";
import { PriceLevel } from "../redux/types/search-types";
import * as cartActions from "../redux/actions/cart"
const priceLevels1: PriceLevel[] = [{
  price: 100,
  subscribers: 20,
  wantedQuantity: 120
}, {
  price: 90,
  subscribers: 60,
  wantedQuantity: 220
}, {
  price: 80,
  subscribers: 90,
  wantedQuantity: 520
}]
const priceLevels2: PriceLevel[] = [{
  price: 100,
  subscribers: 20,
  wantedQuantity: 120
}, {
  price: 90,
  subscribers: 60,
  wantedQuantity: 220
}, {
  price: 80,
  subscribers: 90,
  wantedQuantity: 520
}]
const auctions: BuyingAuction[] = [{
  name: 'new auction1',
  image: '',
  priceLevels: priceLevels1,
  quantity: 1,
  selectedPrice: priceLevels1[0].price,
  auctionId: 'id1',
},
{
  name: 'new auction2',
  image: '',
  priceLevels: priceLevels2,
  quantity: 1,
  selectedPrice: priceLevels2[0].price,
  auctionId: 'id2'
}]
function WeShop() {
  const dispatch = useDispatch();
  dispatch(cartActions.addAuctionToCart(auctions[0]));
  dispatch(cartActions.addAuctionToCart(auctions[1]));
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
            <Route exact path="/auctions" component={Auctions}></Route>
            {/* <Route path="/auctions/:id" component={Auction}></Route> */}
            <AuthRequiredRoute
              exact
              path="/account"
              component={Account}
            ></AuthRequiredRoute>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/cart" component={Cart}></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default WeShop;

import React, { useState } from "react";
import "./we-shop.scss";
import Tabs from "./tabs/tabs";

function WeShop() {
  const [tabs, setTabs] = useState([
    "My Acount",
    "Products",
    "Today's Deals",
    "Help"
  ]);
  return <Tabs key="tabs" tabs={tabs} className="container"></Tabs>;
}

export default WeShop;

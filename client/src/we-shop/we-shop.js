import React, { useState } from "react";
import "./we-shop.scss";
import SignIn from "./sign-in/sign-in";
import TabsBar from "./top-bar/tabs-bar/tabs-bar";
import DefaultTab from "./tabs/defualt-tab";
import TopBar from "./top-bar/top-bar";
import WeShopPopup from "./components/we-shop-popup/we-shop-popup";

function WeShop() {
  const [tabs, setTabs] = useState([
    { name: "My Acount" },
    { name: "Products" },
    { name: "Today's Deals" },
    { name: "Help" }
  ]);
  const [isConnected, setIsConnected] = useState(false);
  const [currentTab, setCurrentTab] = useState(DefaultTab);
  const [popUp, setPopup] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  function openPopup(tabName) {
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
      case "Register": {
        setShowPopup(false);
        setPopup(null);
        break;
      }
      case "Connect": {
        setPopup(
          <SignIn
            newUser={true}
            onClose={closePopup}
            onRegister={tab => openPopup(tab)}
          ></SignIn>
        );
        setShowPopup(true);
        break;
      }
      default: {
        console.log("Register");
        break;
      }
    }
  }
  const closePopup = () => {
    setShowPopup(false);
    setPopup(null);
  };

  return (
    <div className="we-shop">
      {showPopup ? <WeShopPopup content={popUp}></WeShopPopup> : null}
      <TopBar
        tabs={tabs}
        openPopUp={popupName => openPopup(popupName)}
      ></TopBar>
    </div>
    // )
    // );
  );
}

export default WeShop;

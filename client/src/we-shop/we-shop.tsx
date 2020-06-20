import "./we-shop.scss";
import SignIn from "./sign-in/sign-in";
import TabsBar from "./top-bar/tabs-bar/tabs-bar";
//import DefaultTab from "./tabs/defualt-tab";

import TopBar from "./top-bar/top-bar";
import WeShopPopup from "./components/we-shop-popup/we-shop-popup";
import { usableInputs } from "./we-shop-inputs.config";
import DefaultTab from "./tabs/defualt-tab";
import React, { useState } from "react";

function WeShop() {
  const [tabs, setTabs] = useState([
    { name: "My Acount" },
    { name: "Products" },
    { name: "Today's Deals" },
    { name: "Help" },
  ]);
  const [isConnected, setIsConnected] = useState(false);
  const [currentTab, setCurrentTab] = useState(DefaultTab);
  const [popUp, setPopup] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  function openPopup(tabName: string) {
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
        setPopup(
          <SignIn
            newUser={true}
            onClose={closePopup}
            onRegister={(tab: string) => openPopup(tab)}
            inputs={["email", "password", "confirmPassword"].map(
              (input: string) => usableInputs[input]
            )}
            secunedFuncVar="Connect"
            secunedFunc={(tab: string) => openPopup(tab)}
            text={"Connect"}
          ></SignIn>
        );
        break;
      }
      case "Connect": {
        setPopup(
          <SignIn
            newUser={true}
            onClose={closePopup}
            onRegister={(tab: string) => openPopup(tab)}
            inputs={["email", "password"].map((input) => usableInputs[input])}
            secunedFunc={(tab: string) => openPopup(tab)}
            secunedFuncVar="Register"
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
    setPopup({});
  };

  return (
    <div className="we-shop">
      {showPopup ? <WeShopPopup content={popUp}></WeShopPopup> : null}
      <TopBar
        tabs={tabs}
        openPopUp={(popupName: string) => openPopup(popupName)}
      ></TopBar>
    </div>
  );
}

export default WeShop;

import React, { useState } from "react";
import "./we-shop.scss";
import SignIn from "./sign-in/sign-in";
import TabsBar from "./top-bar/tabs-bar/tabs-bar";
import DefaultTab from "./tabs/defualt-tab";
import TopBar from "./top-bar/top-bar";
import WeShopPopup from "./components/we-shop-popup/we-shop-popup";
import { usableInputs } from "./we-shop-inputs.config";
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
  // const i = ["email", "password"].map(input => usableInputs[input]);
  // console.log(i);
  // console.log(usableInputs["email"]);
  // console.log(usableInputs.email);
  // console.log(usableInputs);
  // const inputs = [
  //   {
  //     name: "email",
  //     type: "email",
  //     placeholder: "Email",
  //     validateFunc: Yup.string()
  //       .email()
  //       .required("Required")
  //   },
  //   {
  //     name: "password",
  //     type: "password",
  //     placeholder: "Password",
  //     validateFunc: Yup.string()
  //       .required("No password provided.")
  //       .min(8, "Password is too short - should be 8 chars minimum.")
  //       .matches(/(?=.*[0-9])/, "Password must contain a number.")
  //   }
  // ];
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
        setPopup(
          <SignIn
            newUser={true}
            onClose={closePopup}
            onRegister={tab => openPopup(tab)}
            inputs={["email", "password", "confirmPassword"].map(
              input => usableInputs[input]
            )}
          ></SignIn>
        );
        break;
      }
      case "Connect": {
        setPopup(
          <SignIn
            newUser={true}
            onClose={closePopup}
            onRegister={tab => openPopup(tab)}
            inputs={["email", "password"].map(input => usableInputs[input])}
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

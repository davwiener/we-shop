import React from "react";
import "./welcome-message.scss";
import WeShopButton from "./../../components/we-shop-button/we-shop-button";
function WelcomeMessage(props) {
  console.log(props.isConnected);
  return (
    <div className="welcome-message">
      <span>{"Welcome " + (props.isConnected ? props.name : "Visitor,")}</span>
      {!props.isConnected && (
        <div className="we-shop-button">
          <WeShopButton
            text="Register"
            onClick={x => props.onClick("Connect")}
          ></WeShopButton>
        </div>
      )}
    </div>
  );
}

export default WelcomeMessage;

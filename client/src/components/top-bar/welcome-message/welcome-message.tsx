import "./welcome-message.scss";
import React from "react";
import WeShopButton from "../../../../../src/components/common-components/button/button";
function WelcomeMessage(props: any) {
  console.log(props.isConnected);
  return (
    <div className="welcome-message">
      <span>{"Welcome " + (props.isConnected ? props.name : "Visitor,")}</span>
      {!props.isConnected && (
        <div className="we-shop-button">
          <WeShopButton
            text="Register"
            onClick={() => props.onClick("Connect")}
          ></WeShopButton>
        </div>
      )}
    </div>
  );
}

export default WelcomeMessage;

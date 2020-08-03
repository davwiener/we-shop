import "./welcome-message.scss";
import WeShopButton from "../common-components/button/button";
import React from "react";
import { useSelector } from "react-redux";
import { weShopState } from "../../redux/store";
function WelcomeMessage(props: any) {
  //console.log(props.isConnected);
  const userName = useSelector((state: weShopState) => {
    return state.user.userName;
  });
  return (
    <div className="welcome-message">
      <span>{"Welcome " + (userName ? userName : "Visitor,")}</span>
      {!userName && (
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

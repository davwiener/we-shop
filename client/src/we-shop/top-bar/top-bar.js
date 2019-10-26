import React from "react";
import TabsBar from "./tabs-bar/tabs-bar";
import WelcomeMessage from "./welcome-message/welcome-message";
import "./top-bar.scss";
function TopBar(props) {
  return (
    <div>
      <div className="top-bar">
        <TabsBar
          key="tabs"
          tabs={props.tabs}
          className="container"
          onClick={popUp => props.openPopUp(popUp)}
        ></TabsBar>

        <WelcomeMessage
          isConnected={false}
          onClick={popUp => props.openPopUp(popUp)}
        ></WelcomeMessage>
      </div>
    </div>
  );
}

export default TopBar;

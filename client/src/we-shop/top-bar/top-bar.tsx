import TabsBar from "./tabs-bar/tabs-bar";
import WelcomeMessage from "./welcome-message/welcome-message";
import "./top-bar.scss";
import React from "react";

function TopBar(props: { tabs: any; openPopUp: (arg0: any) => any }) {
  return (
    <div>
      <div className="top-bar">
        <TabsBar
          key="tabs"
          tabs={props.tabs}
          className="container"
          onClick={(popUp: string) => props.openPopUp(popUp)}
        ></TabsBar>

        <WelcomeMessage
          isConnected={false}
          onClick={(popUp: string) => props.openPopUp(popUp)}
        ></WelcomeMessage>
      </div>
    </div>
  );
}

export default TopBar;

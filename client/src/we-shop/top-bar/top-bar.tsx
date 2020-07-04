import TabsBar from "./tabs-bar/tabs-bar";
import WelcomeMessage from "./welcome-message/welcome-message";
import "./top-bar.scss";
import React from "react";
import { useDispatch } from "react-redux";
import { openPopUpAction } from "../../reducer/actions";
function TopBar(props: { tabs: any }) {
  const dispatch = useDispatch();
  return (
    <div>
      <div className="top-bar">
        <TabsBar
          key="tabs"
          tabs={props.tabs}
          className="container"
          onClick={(popUp: string) => {
            dispatch(openPopUpAction(popUp));
          }}
        ></TabsBar>

        <WelcomeMessage
          isConnected={false}
          onClick={(popUp: string) => {
            dispatch(openPopUpAction(popUp));
          }}
        ></WelcomeMessage>
      </div>
    </div>
  );
}

export default TopBar;

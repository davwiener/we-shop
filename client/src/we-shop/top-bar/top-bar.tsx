import TabsBar from "./tabs-bar/tabs-bar";
import WelcomeMessage from "./welcome-message/welcome-message";
import "./top-bar.scss";
import React from "react";
import { useDispatch } from "react-redux";
import { openPopUpAction } from "../../reducer/actions";
import { useHistory } from "react-router-dom";
function TopBar(props: { tabs: any }) {
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <div>
      <div className="top-bar">
        <TabsBar
          key="tabs"
          tabs={props.tabs}
          className="container"
          onClickk={(popUp: string) => {
            history.push(popUp);
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

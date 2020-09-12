import TabsBar from "../tabs-bar/tabs-bar";
import WelcomeMessage from "../welcome-message/welcome-message";
import "./top-bar.scss";
import React from "react";
import { useDispatch } from "react-redux";
import { openPopUpAction } from "../../redux/actions/user-actions";
import { useHistory } from "react-router-dom";
import Button from "../common-components/button/button";
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
          onClick={(popUp: string) => {
            history.push(popUp);
          }}
        ></TabsBar>

        <WelcomeMessage
          onClick={(popUp: string) => {
            dispatch(openPopUpAction(popUp));
          }}
        ></WelcomeMessage>
        <Button
          onClick={(popUp: string) => {
            history.push("add-product");
          }}
        >
          add auction
        </Button>
      </div>
    </div>
  );
}

export default TopBar;

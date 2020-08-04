import "./welcome-message.scss";
import WeShopButton from "../common-components/button/button";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { weShopState } from "../../redux/store";
import * as userActions from "../../redux/actions/user-actions";
function WelcomeMessage(props: any) {
  const dispatch = useDispatch();
  //console.log(props.isConnected);
  useEffect(() => {
    if (localStorage.username && localStorage.password) {
      dispatch(
        userActions.login(localStorage.username, localStorage.password, false)
      );
    }
  });
  const userName = useSelector((state: weShopState) => {
    return state.user.userName;
  });
  const isConnected = useSelector((state: weShopState) => {
    return state.user.connected;
  });
  return (
    <div className="welcome-message">
      <span>{"Welcome " + (userName ? userName : "Visitor,")}</span>
      {!isConnected ? (
        <div className="we-shop-button">
          <WeShopButton
            text="Register"
            onClick={() => props.onClick("Connect")}
          ></WeShopButton>
        </div>
      ) : (
        <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={() => {
            delete localStorage.username;
            delete localStorage.password;
            dispatch(userActions.disconnect());
          }}
        >
          <span aria-hidden="true">disconnect</span>
        </button>
      )}
    </div>
  );
}

export default WelcomeMessage;

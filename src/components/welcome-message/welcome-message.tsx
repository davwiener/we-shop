import "./welcome-message.scss";
import WeShopButton from "../common-components/button/button";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { WeShopState } from "../../redux/store";
import * as userActions from "../../redux/actions/user-actions";
function WelcomeMessage(props: any) {
  const dispatch = useDispatch();
  //console.log(props.isConnected);

  const userState = useSelector((state: WeShopState) => {
    return state.user;
  });
  return (
    <div>
      {userState.loaded && (
        <div className="welcome-message">
          <span>
            {"Welcome " +
              (userState.userName ? userState.userName : "Visitor,")}
          </span>
          {!userState.connected ? (
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
      )}
    </div>
  );
}

export default WelcomeMessage;

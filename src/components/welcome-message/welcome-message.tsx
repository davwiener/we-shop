import React from "react";
import { useSelector, useDispatch } from "react-redux";
import WeShopButton from "../common-components/button/button";
import { WeShopState } from "../../redux/store";
import * as userActions from "../../redux/actions/user-actions";
import "./welcome-message.scss";
function WelcomeMessage(props: any) {
  const dispatch = useDispatch();

  const onLogout = () => {
    delete localStorage.username;
    delete localStorage.password;
    localStorage.removeItem("token");
    dispatch(userActions.disconnect());
    window.location.href = "/login";
  };

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
              onClick={onLogout}
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

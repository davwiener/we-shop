import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { logout } from "../../redux/actions/menu";
import { Divider } from "@material-ui/core";
import { WeShopState } from "../../redux/store";
import SideMenu from "./SideMenu";

const AccountMenu = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: WeShopState) => state.account);
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
  };

  return (
    <SideMenu icon={<AccountCircle />} side="right">
      <Link to="/account">My Account</Link>
      {!isLoggedIn && (
        <div className="loginRegister">
          <Link to="/login">Login</Link>
          <Divider orientation="vertical" />
          <Link to="/register">Register</Link>
        </div>
      )}
      {isLoggedIn && (
        <Link to="/" onClick={handleLogout}>
          Logout
        </Link>
      )}
    </SideMenu>
  );
};

export default AccountMenu;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { logout } from "../../redux/actions/menu";
import { Menu, MenuItem, IconButton, Divider } from "@material-ui/core";
import { WeShopState } from "../../redux/store";
import "./AccountMenu.scss";

const AccountMenu = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const { isLoggedIn } = useSelector((state: WeShopState) => state.account);
  const menuClick = (e: any) => setAnchorEl(e.currentTarget);
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
  };

  const closeMenu = () => setAnchorEl(null);
  return (
    <div>
      <IconButton onClick={menuClick}>
        <AccountCircle />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
        <MenuItem className="menuItem" onClick={closeMenu}>
          <Link to="/account/settings">My Account</Link>
        </MenuItem>
        <MenuItem className="menuItem" onClick={closeMenu}>
          {!isLoggedIn && (
            <div className="loginRegister">
              <Link to="/login">Login</Link>
              <Divider orientation="vertical" variant="middle" flexItem />
              <Link to="/register">Register</Link>
            </div>
          )}
          {isLoggedIn && (
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          )}
        </MenuItem>
      </Menu>
    </div>
  );
};

export default AccountMenu;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, MenuItem, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const MainMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const closeMenu = () => setAnchorEl(null);
  const menuClick = (e: any) => setAnchorEl(e.currentTarget);

  return (
    <div style={{ flexGrow: 1 }}>
      <IconButton onClick={menuClick}>
        <MenuIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
        <MenuItem onClick={closeMenu}>
          <Link to="/auctions">Auctions</Link>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MainMenu;

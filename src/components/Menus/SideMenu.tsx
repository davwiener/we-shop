import React, { useState, cloneElement, Children } from "react";
import Drawer from "@material-ui/core/Drawer";
import { IconButton } from "@material-ui/core";
import "./SideMenu.scss";

const SideMenu = ({ side, icon, children }: any) => {
  const [anchor, setAnchor] = useState(false);
  const closeMenu = () => setAnchor(false);
  const toggleDrawer = () => setAnchor(true);

  const wrapClickFunctionality = (childComponent: any) => () => {
    closeMenu();
    if (childComponent.props.onClick) {
      childComponent.props.onClick();
    }
  };

  const renderChildren = () => {
    return Children.toArray(children).map((child: any, key: number) =>
      cloneElement(child, {
        onClick: wrapClickFunctionality(child),
        className: "item",
        key,
      })
    );
  };

  return (
    <div>
      <IconButton onClick={toggleDrawer}>{icon}</IconButton>
      <Drawer
        classes={{ paper: "drawerWrapper" }}
        anchor={side}
        open={anchor}
        onClose={closeMenu}
      >
        <div className="drawer">{anchor && renderChildren()}</div>
      </Drawer>
    </div>
  );
};

export default SideMenu;

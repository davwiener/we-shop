import React from "react";
import { Drawer, List, Divider } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import AuctionsTab from "./AuctionsTab";
import SettingsTab from "./SettingsTab";
import "./Account.scss";
import { ACCOUNT_TABS } from "../../constants/Account";
import { Link } from "react-router-dom";

const Account = ({ activeTab }: any) => {
  const renderSelectedTab = () => {
    switch (activeTab) {
      case ACCOUNT_TABS.SETTINGS_TAB:
        return <SettingsTab />;
      case ACCOUNT_TABS.AUCTIONS_TAB:
        return <AuctionsTab />;
      default:
        return;
    }
  };

  const tabs = [
    { value: "settings", name: "Settings", path: "/account/settings" },
    { value: "auctions", name: "Auctions", path: "/account/auctions" },
  ];

  return (
    <div>
      <Drawer variant="permanent" classes={{ paper: "drawer" }}>
        <List className="list">
          {tabs.map((entry, index) => (
            <div key={entry.value}>
              <ListItem className="listItem">
                <Link to={entry.path}>{entry.name}</Link>
              </ListItem>
              <Divider variant="middle" />
            </div>
          ))}
        </List>
      </Drawer>
      <div className="content">{renderSelectedTab()}</div>
    </div>
  );
};

export default Account;

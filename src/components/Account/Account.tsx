import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import { Tabs, Tab, AppBar } from "@material-ui/core";
import AuctionsTab from "./AuctionsTab";
import SettingsTab from "./SettingsTab";
import "./Account.scss";

const Account = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const onChangeTab = (e: any, value: any) => {
    setSelectedTab(value);
  };

  const renderActiveTabContent = () => {
    switch (selectedTab) {
      case 0:
        return <SettingsTab />;
      case 1:
        return <AuctionsTab />;
      default:
        return;
    }
  };

  return (
    <Container className="container">
      <AppBar position="static" className="appBar">
        <Tabs onChange={onChangeTab} value={selectedTab}>
          <Tab label="settings" />
          <Tab label="auctions" />
        </Tabs>
      </AppBar>
      {renderActiveTabContent()}
    </Container>
  );
};

export default Account;

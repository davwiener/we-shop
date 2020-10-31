import React, { useState } from "react";
import AuctionsTab from "./AuctionsTab";
import SettingsTab from "./SettingsTab";
import "./Account.scss";
import { ACCOUNT_TABS } from "../../constants/Account";
import SidePanel from "../CommonComponents/SidePanel/SidePanel";
import Tabs from "../CommonComponents/Tabs/Tabs";
import Tab from "../CommonComponents/Tabs/Tab";

const Account = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const renderSelectedTab = () => {
    switch (selectedTab) {
      case ACCOUNT_TABS.SETTINGS_TAB:
        return <SettingsTab />;
      case ACCOUNT_TABS.AUCTIONS_TAB:
        return <AuctionsTab />;
      default:
        return;
    }
  };

  const changeSelectedTab = (index: number) => {
    setSelectedTab(index);
  };

  return (
    <div className="pageWrapper">
      <SidePanel>
        <Tabs selectedTab={selectedTab} onChange={changeSelectedTab}>
          <Tab index={0} label="Account Settings" />
          <Tab index={1} label="My Auctions" />
        </Tabs>
      </SidePanel>
      <div className="content">{renderSelectedTab()}</div>
    </div>
  );
};

export default Account;

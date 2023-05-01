import React, { useState } from "react";
import "./Tab.scss";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import DeliveryTab from "./DeliveryTab";
import SummaryTab from "./SummaryTab";
import PaymentTab from "./PaymentTab";

export default function CheckOutTab() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabClick = (key: number) => {
    setTabIndex(key);
  };

  return (
    <>
      <Tabs
        className="tabs no-border"
        selectedIndex={tabIndex}
        onSelect={(index) => setTabIndex(index)}
      >
        <TabList className="tabs-header">
          <Tab className="tabs-title">DELIVERY</Tab>
          <Tab className="tabs-title">SUMMARY</Tab>
          <Tab className="tabs-title">PAYMENT</Tab>
        </TabList>

        <TabPanel>
          <div className="tabs-content">
            <DeliveryTab handleTabClick={handleTabClick} />
          </div>
        </TabPanel>
        <TabPanel>
          <div className="tabs-content">
            <SummaryTab handleTabClick={handleTabClick} />
          </div>
        </TabPanel>
        <TabPanel>
          <div className="tabs-content">
            <PaymentTab />
          </div>
        </TabPanel>
      </Tabs>
    </>
  );
}

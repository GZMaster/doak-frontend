import React, { useState } from "react";
import "./Tab.scss";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import DeliveryTab from "./DeliveryTab";
import SummaryTab from "./SummaryTab";
import PaymentTab from "./PaymentTab";
import { IDelivery } from "../../types/checkout";
import { IOrder } from "../../types/order";

const CheckOutTab = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [createdOrder, setCreatedOrder] = useState<IOrder>();
  const [delevery, setDelevery] = useState<IDelivery>();

  const handleTabClick = (key: number) => {
    setTabIndex(key);
  };

  const setDelivery = (delivery: IDelivery) => {
    setDelevery(delivery);
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
            <DeliveryTab
              handleTabClick={handleTabClick}
              setSelectedDelivery={setDelivery}
            />
          </div>
        </TabPanel>
        <TabPanel>
          <div className="tabs-content">
            <SummaryTab
              handleTabClick={handleTabClick}
              setCreatedOrder={setCreatedOrder}
              selectedDelivery={delevery}
            />
          </div>
        </TabPanel>
        <TabPanel>
          <div className="tabs-content">
            <PaymentTab createdOrder={createdOrder} />
          </div>
        </TabPanel>
      </Tabs>
    </>
  );
};

export default CheckOutTab;

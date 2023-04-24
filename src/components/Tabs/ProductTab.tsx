import React from "react";
import "./Tab.scss";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

interface IProps {
  description?: string;
  productDetails?: string;
}

export default function ProductTab({ description, productDetails }: IProps) {
  return (
    <section>
      <Tabs className="tabs">
        <TabList className="tabs-header">
          <Tab className="tabs-title">Description</Tab>
          <Tab className="tabs-title">Product Details</Tab>
        </TabList>

        <TabPanel>
          <div className="tabs-content">
            <p>{description}</p>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="tabs-content">
            <p>{productDetails}</p>
          </div>
        </TabPanel>
      </Tabs>
    </section>
  );
}

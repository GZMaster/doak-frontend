import React from "react";
import "./Tab.scss";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
export default function CheckOutTab() {
  return (
    <>
      <Tabs className="tabs">
        <TabList className="tabs-header">
          <Tab className="tabs-title">DELIVERY</Tab>
          <Tab className="tabs-title">SUMMARY</Tab>
          <Tab className="tabs-title">PAYMENT</Tab>
        </TabList>

        <TabPanel>
          <div className="tabs-content">
            <p>
              Consectetur venenatis cursus consequat turpis ornare odio
              ultricies nisl ipsum. Arcu adipiscing erat tortor justo ac. Sed
              nunc dui eu volutpat facilisis. Ultrices egestas libero vitae in
              lacus volutpat arcu fusce elit. Sed augue tristique nisl ipsum. A
              cras in tempus cursus diam ut pulvinar dolor eget. In enim
              habitasse
            </p>
            <p>
              Consectetur venenatis cursus consequat turpis ornare odio
              ultricies nisl ipsum. Arcu adipiscing erat tortor justo ac. Sed
              nunc dui eu volutpat facilisis. Ultrices egestas libero vitae in
              lacus volutpat arcu fusce elit. Sed augue tristique nisl ipsum. A
              cras in tempus cursus diam ut pulvinar dolor eget. In enim
              habitasse
            </p>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="tabs-content">
            <p>
              Consectetur venenatis cursus consequat turpis ornare odio
              ultricies nisl ipsum. Arcu adipiscing erat tortor justo ac. Sed
              nunc dui eu volutpat facilisis. Ultrices egestas libero vitae in
              lacus volutpat arcu fusce elit. Sed augue tristique nisl ipsum. A
              cras in tempus cursus diam ut pulvinar dolor eget. In enim
              habitasse
            </p>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="tabs-content">
            <p>
              Consectetur venenatis cursus consequat turpis ornare odio
              ultricies nisl ipsum. Arcu adipiscing erat tortor justo ac. Sed
              nunc dui eu volutpat facilisis. Ultrices egestas libero vitae in
              lacus volutpat arcu fusce elit. Sed augue tristique nisl ipsum. A
              cras in tempus cursus diam ut pulvinar dolor eget. In enim
              habitasse
            </p>
          </div>
        </TabPanel>
      </Tabs>
    </>
  );
}

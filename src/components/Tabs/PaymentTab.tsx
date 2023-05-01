import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import card from "../../assets/Images/icons/cards.svg";
// import transfer from "../../assets/Images/icons/money-send.svg";
// import Paypal from "../../assets/Images/icons/paypal 1.svg";
import { InputFields } from "../../lib/Main";
import "./Tab.scss";

const PaymentTab = () => {
  const paymentIntent = async () => {
    const token = localStorage.getItem("jwt");

    const response = await fetch(
      `https://doakbackend.cyclic.app/api/v1/payment/payintent`,
      // `http://localhost:3000/api/v1/payment/payintent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          card_number: "4242424242424242",
          cvv: "202",
          expiry_month: "04",
          expiry_year: "25",
          amount: "200000",
          fullname: "Ohiosumua Daniel",
          email: "danigamester@gmail.com",
          phone_number: "08052026709",
        }),
      }
    );

    const { data } = await response.json();

    const redirectUrl = data.response.meta.authorization.redirect;

    window.location.replace(redirectUrl);
  };

  return (
    <Tabs className="Payment_tab">
      <TabList className="payment_tabs">
        <Tab className="item">
          <img src={card} alt="" />
          Pay with Card
        </Tab>
        {/* <Tab className="item">
          <img src={transfer} alt="" />
          Transfer/USSD
        </Tab>
        <Tab className="item">
          <img src={Paypal} alt="" />
          Paypal
        </Tab> */}
      </TabList>
      <TabPanel>
        <p className="summary_tab_title">Card Payment</p>
        <div className="payment_box">
          <InputFields
            type="text"
            label="Card Number"
            placeholder="xxxx - xxxx- xxxx- xxxx"
          />
          <div className="cvc">
            <InputFields type="text" label="CVV" placeholder="***" />
            <InputFields type="text" label="Expiry Date" placeholder="xx/xx" />
          </div>
        </div>
        <div
          style={{ textAlign: "center" }}
          className="auth_continue_btn"
          onClick={() => {
            paymentIntent();
          }}
        >
          Pay N3,003,000
        </div>
      </TabPanel>
      {/* <TabPanel>
        <div className="transfer">
          <p className="summary_tab_title">Transfer N3,000,300 to:</p>
          <div className="account_box">
            <p>
              Account Number: <span>2124430318 </span>
            </p>
            <p>
              Bank: <span>UBA BANK</span>
            </p>
            <p>
              Account Name: <span>DOAK & LTD</span>
            </p>
          </div>
          <InputFields
            type="text"
            label="Name of Sender"
            placeholder="xxxx - xxxx- xxxx- xxxx"
          />
          <InputFields type="text" label="Amount Sent" value="N3,000,300.56" />
          <div
            style={{ textAlign: "center", width: "350px" }}
            className="auth_continue_btn"
          >
            Complete Order
          </div>
        </div>
      </TabPanel>
      <TabPanel>Lorem ipsum dolor sit amet consectetur.</TabPanel> */}
    </Tabs>
  );
};

export default PaymentTab;

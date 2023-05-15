import React, { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useLoading } from "../../services/LoadingContext";
import { FormatNaira } from "../../utils/FormatCurrency";
// import card from "../../assets/Images/icons/cards.svg";
// import transfer from "../../assets/Images/icons/money-send.svg";
import Paypal from "../../assets/Images/icons/paypal 1.svg";
import { InputFields } from "../../lib/Main";
import "./Tab.scss";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createdOrder: any;
}

const PaymentTab: React.FC<Props> = ({ createdOrder }) => {
  const { isLoading, setIsLoading, LoadingComponent } = useLoading();
  const [email, setEmail] = useState("");

  const paymentIntent = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("jwt");

    const response = await fetch(
      // `https://doakbackend.cyclic.app/api/v1/payment/initialize-payment`,
      `http://localhost:3000/api/v1/payment/initialize-payment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: createdOrder?.userId,
          orderId: createdOrder?._id,
          email,
          amount: createdOrder?.subtotal,
        }),
      }
    );

    const res = await response.json();

    if (res.status === "error") {
      setIsLoading(false);
      return alert(
        res.message ? res.message : "An error occured, please try again later"
      );
    }

    if (res.status === "fail") {
      setIsLoading(false);
      return alert(
        res.message ? res.message : "An error occured, please try again later"
      );
    }

    if (res.status) {
      setIsLoading(false);
      console.log(res.data.authorization_url);
      const redirectUrl = res.data.authorization_url;
      window.location.replace(redirectUrl);
    }

    setIsLoading(false);
  };

  return (
    <Tabs className="Payment_tab">
      {isLoading && <LoadingComponent />}
      <TabList className="payment_tabs">
        {/* <Tab className="item">
          <img src={card} alt="" />
          Pay with Card
        </Tab>
        <Tab className="item">
          <img src={transfer} alt="" />
          Transfer/USSD
        </Tab> */}
        <Tab className="item">
          <img src={Paypal} alt="" />
          Paystack
        </Tab>
      </TabList>
      {/* <TabPanel>
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
      </TabPanel> */}
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
      </TabPanel> */}
      <TabPanel>
        <div className="transfer">
          <p className="summary_tab_title">Paystack Payment</p>
          <div className="payment_box">
            <InputFields
              type="email"
              label="Email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div
            style={{ textAlign: "center" }}
            className="auth_continue_btn"
            onClick={() => {
              paymentIntent();
            }}
          >
            {`Pay ${FormatNaira(createdOrder?.subtotal)}`}
          </div>
        </div>
      </TabPanel>
    </Tabs>
  );
};

export default PaymentTab;

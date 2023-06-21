import React, { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useLoading } from "../../services/LoadingContext";
import { HandleToast } from "../../lib/Main";
import backendURL from "../../api";
import { FormatNaira } from "../../utils/FormatCurrency";
import card from "../../assets/Images/icons/cards.svg";
// import transfer from "../../assets/Images/icons/money-send.svg";
// import Paypal from "../../assets/Images/icons/paypal 1.svg";
import { InputFields } from "../../lib/Main";
import "./Tab.scss";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createdOrder: any;
}

const PaymentTab: React.FC<Props> = ({ createdOrder }) => {
  const { isLoading, setIsLoading, LoadingComponent } = useLoading();
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // const [address, setAddress] = useState("");
  // const [city, setCity] = useState("");
  // const [state, setState] = useState("");
  // const [country, setCountry] = useState("");
  // const [zipCode, setZipCode] = useState("");
  const [pin, setPin] = useState("");
  const [toastState, setToastState] = useState("");

  const paymentIntent = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("jwt");

    const response = await fetch(`${backendURL}/api/v1/payment/pay`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        orderId: createdOrder?._id,
        card_number: cardNumber,
        cvv: cvv,
        expiry_month: expiryDate.split("/")[0],
        expiry_year: expiryDate.split("/")[1],
        amount: createdOrder?.total,
        fullname: fullName,
        email: email,
        phone_number: phoneNumber,
        pin: pin,
        // city: city,
        // address: address,
        // state: state,
        // country: country,
        // zip_code: zipCode,
      }),
    });

    const res = await response.json();

    if (res.status === "error") {
      setIsLoading(false);
      setToastState("error");
      // return alert(
      //   res.message ? res.message : "An error occured, please try again later"
      // );
    }

    if (res.status === "fail") {
      setIsLoading(false);
      setToastState("error");

      // return alert(
      //   res.message ? res.message : "An error occured, please try again later"
      // );
    }

    if (res.status === "redirect") {
      setIsLoading(false);
      const redirectUrl = res.authUrl;
      window.location.replace(redirectUrl);
    }

    if (res.status === "success") {
      setIsLoading(false);
      setToastState("success");

      // alert("Payment Successful");
      window.location.replace("/");
    }

    if (res.status === "pending") {
      setIsLoading(false);
      setToastState("success");

      alert("Payment Pending");
      window.location.replace("/");
    }

    if (res.status === "otp") {
      setIsLoading(false);
      // alert("Payment OTP");

      const { tx_ref, flw_ref } = res.data;

      const otp = prompt("Enter OTP sent to your phone number");

      if (otp) {
        const response = await fetch(`${backendURL}/api/v1/payment/validate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            tx_ref,
            flw_ref,
            otp,
          }),
        });

        const res = await response.json();

        if (res.status === "error") {
          setIsLoading(false);
          setToastState("error");

          // return alert(
          //   res.message
          //     ? res.message
          //     : "An error occured, please try again later"
          // );
        }

        if (res.status === "success") {
          setIsLoading(false);
          setToastState("success");

          // alert("Payment Successful");
          window.location.replace("/");
        }

        if (res.status === "pending") {
          setIsLoading(false);
          setToastState("success");

          alert("Payment Pending");
          window.location.replace("/");
        }
      }
    }

    setIsLoading(false);
  };

  return (
    <Tabs className="Payment_tab">
      {isLoading && <LoadingComponent />}
      {toastState && (
        <HandleToast
          status={toastState}
          message={
            toastState === "success"
              ? "Order Created Successfully"
              : "Error Creating Order"
          }
        />
      )}
      <TabList className="payment_tabs">
        <Tab className="item">
          <img src={card} alt="" />
          Pay with Card
        </Tab>
        {/* <Tab className="item">
          <img src={transfer} alt="" />
          Transfer/USSD
        </Tab> */}
        {/* <Tab className="item">
          <img src={Paypal} alt="" />
          Paystack
        </Tab> */}
      </TabList>
      <TabPanel>
        <p className="summary_tab_title">Card Payment</p>
        <div className="payment_box">
          <InputFields
            type="text"
            label="Card Number"
            placeholder="xxxx - xxxx- xxxx- xxxx"
            required={true}
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            autocomplete="off"
          />
          <div className="cvc">
            <InputFields
              type="text"
              label="CVV"
              placeholder="***"
              required={true}
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              autocomplete="off"
            />
            <InputFields
              type="text"
              label="Expiry Date"
              placeholder="xx/xx"
              required={true}
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              autocomplete="off"
            />
          </div>
          <InputFields
            type="password"
            label="Card Pin"
            placeholder="Enter card pin"
            required={true}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            autocomplete="new-password"
          />
          <InputFields
            type="text"
            label="Full Name"
            placeholder="Name on Card"
            required={true}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <InputFields
            type="text"
            label="Phone Number"
            placeholder=""
            required={true}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <InputFields
            type="text"
            label="Email"
            placeholder="example@domain.com"
            required={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* <InputFields
            type="text"
            label="Address"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <InputFields
            type="text"
            label="City"
            placeholder="Enter your city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <InputFields
            type="text"
            label="State"
            placeholder="Enter state"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <InputFields
            type="text"
            label="Country"
            placeholder="Enter country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <InputFields
            type="text"
            label="Zip Code"
            placeholder="Enter zip code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          /> */}
        </div>
        <div
          style={{ textAlign: "center" }}
          className="auth_continue_btn"
          onClick={() => {
            paymentIntent();
          }}
        >
          Pay {FormatNaira(createdOrder?.subtotal)}
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
      </TabPanel> */}
      {/* <TabPanel>
        <div className="payment_box">
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
      </TabPanel> */}
    </Tabs>
  );
};

export default PaymentTab;

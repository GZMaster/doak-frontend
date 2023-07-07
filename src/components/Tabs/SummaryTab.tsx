import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../services/LoadingContext";
import { useCart } from "../../services/CartContext";
import { HandleToast } from "../../lib/Main";
import backendURL from "../../api";
import { FormatNaira } from "../../utils/FormatCurrency";
import product from "../../assets/Images/others/itemDrink.png";
import UseMediaQuery from "../mediaquery/UseMediaQuerry";
import "./Tab.scss";

interface Props {
  handleTabClick: (key: number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setCreatedOrder: (order: any) => void;
}

interface Address {
  userId?: string;
  name: string;
  address: string;
  city: string;
  phoneNumber: string;
  state: string;
  country: string;
  zipCode?: string;
  _id: string;
}

const SummaryTab: React.FC<Props> = ({ handleTabClick, setCreatedOrder }) => {
  const { cartItems, getTotalCartPrice } = useCart();
  const { isLoading, setIsLoading, LoadingComponent } = useLoading();
  const isPageWide = UseMediaQuery("(min-width: 769px)");
  const navigate = useNavigate();
  const [address, setAddress] = useState<Address>();
  const [toastState, setToastState] = useState("");

  useEffect(() => {
    setIsLoading(true);
    getDefaultAddress();
  }, []);

  const createOrder = async () => {
    setIsLoading(true);
    // Get jwt Bear token from local storage
    const token = localStorage.getItem("jwt");
    const total = getTotalCartPrice();

    const userString = localStorage.getItem("user");
    const user = userString && JSON.parse(userString);

    const items =
      cartItems &&
      Object.values(cartItems).map((item) => {
        return {
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
          name: item.name,
        };
      });

    if (!address) {
      setToastState("error");
      return;
    }

    const orderAddress = {
      name: address.name,
      email: user.email,
      address: address.address,
      city: address.city,
      phoneNumber: address.phoneNumber,
      state: address.state,
      country: address.country,
    };

    if (!items) {
      setToastState("error");
      return;
    }

    const res = await fetch(`${backendURL}/api/v1/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        items: items,
        address: orderAddress,
        subtotal: total,
      }),
    });

    const response = await res.json();

    if (response.status === "success") {
      setCreatedOrder(response.data.order);
      setToastState("success");

      setTimeout(() => {
        handleTabClick(2);
      }, 2000);
    } else {
      setToastState("error");
    }

    setIsLoading(false);
  };

  const getDefaultAddress = async () => {
    setIsLoading(true);
    // Get jwt Bear token from local storage
    const token = localStorage.getItem("jwt");

    const res = await fetch(`${backendURL}/api/v1/addresses/default`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await res.json();

    if (response.status === "error") {
      setToastState("error");
      return;
    }

    setAddress(response.data.addressData);
    setIsLoading(false);
  };

  return (
    <section className="summary_tab">
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
      <p className="summary_tab_title">Order Summary</p>
      <div className="summary_tab_wrapper">
        <div className="wrapper">
          <div className="summary_tab_header">
            <p>Cart Items</p>
            <p className="summary_tab_edit" onClick={() => navigate("/cart")}>
              Edit
            </p>
          </div>
          <div className="summary_tab_body">
            {cartItems &&
              Object.values(cartItems).map((item) => {
                return (
                  <div className="item" key={item.id}>
                    <div className="product__cart">
                      <img
                        className="product__image"
                        src={item.image ? item.image : product}
                        alt=""
                      />
                      <div className="product__details">
                        <p className="product__name">{item.name}</p>
                        {!isPageWide && (
                          <p className="quantity">QTY:x{item.quantity}</p>
                        )}
                      </div>
                    </div>
                    {isPageWide && <p className="quantity">x{item.quantity}</p>}

                    <div className="price">{FormatNaira(item.price)}</div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="wrapper">
          <div className="summary_tab_header">
            <p>Address</p>
            <p className="edit">Edit</p>
          </div>
          {address && (
            <div className="summary_tab_body" key={address.userId}>
              <h2>{address.name}</h2>
              <p>
                {address.address}, {address.city} City, {address.state} State
              </p>
              <p>{address.phoneNumber}</p>
            </div>
          )}
        </div>
        <div className="wrapper">
          <div className="summary_tab_header">
            <p>Delivery</p>
            <p className="edit">Edit</p>
          </div>
          <div className="summary_tab_body">
            <h2>Door Delivery</h2>
            <p>To be delivered between 3 working days</p>
            <p style={{ color: "#ff3426", fontWeight: "600" }}></p>
          </div>
        </div>
        <div
          style={{ textAlign: "center" }}
          className="auth_continue_btn"
          onClick={() => createOrder()}
        >
          Proceed to Payment
        </div>
      </div>
    </section>
  );
};

export default SummaryTab;

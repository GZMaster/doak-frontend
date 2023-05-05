import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormatNaira } from "../../utils/FormatCurrency";
import { useLoading } from "../../services/LoadingContext";
import product from "../../assets/Images/others/itemDrink.png";
import UseMediaQuery from "../mediaquery/UseMediaQuerry";
import "./Tab.scss";

interface Props {
  handleTabClick: (key: number) => void;
  cartItems: [
    {
      name: string;
      price: number;
      product: string;
      quantity: number;
    }
  ];
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

const SummaryTab: React.FC<Props> = ({ handleTabClick, cartItems }) => {
  const { isLoading, setIsLoading, LoadingComponent } = useLoading();
  const isPageWide = UseMediaQuery("(min-width: 769px)");
  const navigate = useNavigate();
  const [address, setAddress] = useState<Address>();

  useEffect(() => {
    setIsLoading(true);
    getDefaultAddress();
  }, []);

  const getTotal = () => {
    let total = 0;
    if (cartItems) {
      Object.values(cartItems).forEach((item) => {
        total += item.price * item.quantity;
      });
    }

    return total;
  };

  const createOrder = async () => {
    setIsLoading(true);
    // Get jwt Bear token from local storage
    const token = localStorage.getItem("jwt");
    const total = getTotal();

    if (!address) {
      return;
    }

    const res = await fetch(
      `https://doakbackend.cyclic.app/api/v1/orders`,
      // `http://localhost:3000/api/v1/orders`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          address: address._id,
          item: cartItems,
          subtotal: total,
        }),
      }
    );

    const response = await res.json();

    if (response.status === "success") {
      handleTabClick(2);
    }

    setIsLoading(false);
  };

  const getDefaultAddress = async () => {
    setIsLoading(true);
    // Get jwt Bear token from local storage
    const token = localStorage.getItem("jwt");

    const res = await fetch(
      `https://doakbackend.cyclic.app/api/v1/addresses/default`,
      // `http://localhost:3000/api/v1/addresses/default`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const response = await res.json();

    setAddress(response.data.addressData);
    setIsLoading(false);
  };

  return (
    <section className="summary_tab">
      {isLoading && <LoadingComponent />}
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
              cartItems.map((item) => (
                <div className="item" key={item.product}>
                  <div className="product__cart">
                    <img className="product__image" src={product} alt="" />
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
              ))}
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
            <p>To be delivered between Wenesday 22 Mar and Friday 26 Mar</p>
            <p style={{ color: "#ff3426", fontWeight: "600" }}>N2,500</p>
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

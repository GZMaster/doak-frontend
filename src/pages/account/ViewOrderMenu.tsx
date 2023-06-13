import React, { useState, useEffect } from "react";
import backendURL from "../../api";
import { FormatNaira } from "../../utils/FormatCurrency";
import "./AccountPage.scss";
import backbtn from "../../assets/Images/icons/backbtn.svg";
import cancel from "../../assets/Images/icons/redcancel.svg";

interface ViewOrderMenuProps {
  handleViewDetail: () => void;
  order?: {
    userId: string;
    orderId: string;
    orderStatus: string;
    address: string;
    items: [
      {
        productId: string;
        name: string;
        quantity: number;
        price: number;
      }
    ];
    date: Date;
    subtotal: number;
    deliveryFee: number;
    total: number;
  };
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

const ViewOrderMenu: React.FC<ViewOrderMenuProps> = ({
  handleViewDetail,
  order,
}) => {
  const [address, setAddress] = useState<Address>();

  useEffect(() => {
    getAddress();
  }, [address]);

  const getDate = (date: Date) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.getMonth();
    const year = newDate.getFullYear();
    const dateString = `${day}/${month}/${year}`;
    return dateString;
  };

  const getAddress = async () => {
    const res = await fetch(
      `${backendURL}/api/v1/addresses/${order?.address}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const data = await res.json();

    if (data.status === "success") {
      setAddress(data.data);
    }
  };

  const handleCancelOrder = async () => {
    const res = await fetch(
      `${backendURL}/api/v1/orders/cancelOrder/{order?.orderId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const data = await res.json();

    if (data.status === "success") {
      handleViewDetail();
    }
  };

  return (
    <>
      <div className="viewordermenu">
        <div className="viewordermenu__header">
          <button onClick={handleViewDetail}>
            <img src={backbtn} alt="go back" />
          </button>
          <h1>Back To All Orders</h1>
        </div>

        <div className="viewordermenu__body">
          <div className="viewordermenu__body__header">
            <h1>Order No. {order?.orderId}</h1>
            {/* THIS SHOULD CONTAIN THE ORDER PROGRESS BAR */}
          </div>

          <div className="viewordermenu__body__body">
            <div className="viewordermenu__body__body__header">
              <h3 className={`${order?.orderStatus}`}>{order?.orderStatus}</h3>
              <h2>
                Order{order?.orderId} was placed on{" "}
                {order && getDate(order?.date)}
              </h2>
              <p>Total: {order && FormatNaira(order.total)}</p>
            </div>

            <div className="viewordermenu__body__body__details">
              <div className="viewordermenu__body__body__details__header">
                <h1>Order Details</h1>
              </div>

              <div className="viewordermenu__body__body__details__items">
                <div className="viewordermenu__body__body__details__items__header">
                  <h1>Cart Items</h1>
                </div>
                <div className="viewordermenu__body__body__details__items__body">
                  {order?.items.map((item) => (
                    <>
                      <div
                        className="viewordermenu__body__body__details__items__body__left"
                        key={item.productId}
                      >
                        <div className="viewordermenu__body__body__details__items__body__left__name">
                          <h1>{item.name}</h1>
                        </div>
                      </div>
                      <div className="viewordermenu__body__body__details__items__body__middle">
                        <p>{item.quantity}</p>
                      </div>
                      <div className="viewordermenu__body__body__details__items__body__right">
                        <p>{item.price}</p>
                      </div>
                    </>
                  ))}
                </div>
              </div>

              <div className="viewordermenu__body__body__details__subtotal">
                <h4>Subtotal:</h4>
                <p>{order && FormatNaira(order.subtotal)}</p>
              </div>

              <div className="viewordermenu__body__body__details__shipping">
                <p>Shipping:</p>
                <div className="viewordermenu__body__body__details__shipping__right">
                  <p>{order?.deliveryFee}</p>
                  <h4>
                    Door Delivery, to be delivered between the dates 16th of may
                    to 20th of may(usually 3 days after order is confirmed)
                  </h4>
                </div>
              </div>

              <div className="viewordermenu__body__body__details__total">
                <p>Total:</p>
                <p>{order?.total}</p>
              </div>
            </div>

            <div className="viewordermenu__body__body__address">
              <div className="viewordermenu__body__body__address__header">
                <h1>Delivery Address</h1>
              </div>

              <div className="viewordermenu__body__body__address__details">
                <h4>{address?.name}</h4>
                <p>
                  {address?.address}, {address?.city}, {address?.state}{" "}
                  {address?.country}
                </p>
                <p>{address?.phoneNumber}</p>
              </div>
            </div>

            <div className="viewordermenu__body__body__cancel">
              <button onClick={handleCancelOrder}>
                <span>
                  <img src={cancel} alt="cancel" />
                </span>{" "}
                Cancel Order
              </button>
              <p>
                Please note: orders cannot be cancelled after order
                confirmation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewOrderMenu;

import React from "react";
import backendURL from "../../api";
import { FormatNaira } from "../../utils/FormatCurrency";
import { IOrder } from "../../types/order";
import "./MobileAccountPage.scss";
import backbtn from "../../assets/Images/icons/backbtn.svg";
import cancel from "../../assets/Images/icons/redcancel.svg";

interface MobileViewOrderMenuProps {
  handleViewDetail: () => void;
  order: IOrder | undefined;
}

const MobileViewOrderMenu: React.FC<MobileViewOrderMenuProps> = ({
  handleViewDetail,
  order,
}) => {
  const getDate = (date: Date) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.getMonth();
    const year = newDate.getFullYear();
    const dateString = `${day}/${month}/${year}`;
    return dateString;
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
      <div className="MobileViewOrderMenu">
        <div className="MobileViewOrderMenu__header">
          <button onClick={handleViewDetail}>
            <img src={backbtn} alt="go back" />
          </button>
          <h1>Order Details</h1>
        </div>

        <div className="MobileViewOrderMenu__body">
          <div className="MobileViewOrderMenu__body__header">
            <h1>Order No. {order?.orderId}</h1>
            {/* THIS SHOULD CONTAIN THE ORDER PROGRESS BAR */}
          </div>

          <div className="MobileViewOrderMenu__body__body">
            <div className="MobileViewOrderMenu__body__body__header">
              <h3 className={`${order?.orderStatus}`}>{order?.orderStatus}</h3>
              <h2>
                Order{order?.orderId} was placed on{" "}
                {order && getDate(order?.date)}
              </h2>
              <p>Total: {order && FormatNaira(order.total)}</p>
            </div>

            <div className="MobileViewOrderMenu__body__body__details">
              {/* <div className="MobileViewOrderMenu__body__body__details__header">
                <h1>Order Details</h1>
              </div> */}

              <div className="MobileViewOrderMenu__body__body__details__items">
                <div className="MobileViewOrderMenu__body__body__details__items__header">
                  <h1>Cart Items</h1>
                </div>
                <div className="MobileViewOrderMenu__body__body__details__items__body">
                  {order?.items.map((item) => (
                    <>
                      <div
                        className="MobileViewOrderMenu__body__body__details__items__body__left"
                        key={item.productId}
                      >
                        <div className="MobileViewOrderMenu__body__body__details__items__body__left__name">
                          <h1>{item.name}</h1>
                        </div>
                        <div className="MobileViewOrderMenu__body__body__details__items__body__left__qty">
                          <p>{item.quantity}</p>
                        </div>
                      </div>
                      <div className="MobileViewOrderMenu__body__body__details__items__body__right">
                        <p>{item.price}</p>
                      </div>
                    </>
                  ))}
                </div>
              </div>

              <div className="MobileViewOrderMenu__body__body__details__subtotal">
                <h4>Subtotal:</h4>
                <p>{order && FormatNaira(order.subtotal)}</p>
              </div>

              <div className="MobileViewOrderMenu__body__body__details__shipping">
                <p>Shipping:</p>
                <div className="MobileViewOrderMenu__body__body__details__shipping__right">
                  <p>{order?.deliveryFee}</p>
                  <h4>
                    {order?.deliveryMethod === "pickup" ? "Pickup" : "Delivery"}
                  </h4>
                </div>
              </div>

              <div className="MobileViewOrderMenu__body__body__details__total">
                <h4>Total:</h4>
                <p>{order?.total}</p>
              </div>
            </div>

            <div className="MobileViewOrderMenu__body__body__address">
              <div className="MobileViewOrderMenu__body__body__address__header">
                <h1>Delivery Address</h1>
              </div>

              <div className="MobileViewOrderMenu__body__body__address__details">
                <h4>{order?.contact.address.name}</h4>
                <p>
                  {order?.contact.address.address},{" "}
                  {order?.contact.address.city}, {order?.contact.address.state}{" "}
                  {order?.contact.address.country}
                </p>
                <p>{order?.contact.address.phoneNumber}</p>
              </div>
            </div>

            <div className="MobileViewOrderMenu__body__body__cancel">
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

export default MobileViewOrderMenu;

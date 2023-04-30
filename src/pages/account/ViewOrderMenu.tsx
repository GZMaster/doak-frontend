import React from "react";
import "./AccountPage.scss";
import backbtn from "../../assets/Images/icons/backbtn.svg";
import Productimg from "../../assets/Images/others/itemDrink.png";
import cancel from "../../assets/Images/icons/redcancel.svg";

interface ViewOrderMenuProps {
  handleViewDetail: () => void;
}
const items = [
  {
    id: 1,
    Image: Productimg,
    Name: "Hennessy VS Cognac ORIGINAL",
    Size: "70cl",
    Quantity: "QTY:X10",
    Price: "N300,000.00",
  },
];
const orders = [
  {
    status: "Cancelled_by_self",
  },
];
const ViewOrderMenu: React.FC<ViewOrderMenuProps> = ({ handleViewDetail }) => {
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
            <h1>Order No. 1</h1>
            {/* THIS SHOULD CONTAIN THE ORDER PROGRESS BAR */}
          </div>

          <div className="viewordermenu__body__body">
            <div className="viewordermenu__body__body__header">
              <h3 className={`${orders[0].status}`}>
                {orders[0].status.split("_").join(" ")}
              </h3>
              <h2>Order*11267880 was placed on 12th April, 2023</h2>
              <p>5 items. Total: N3,003,000.00</p>
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
                  {items.map((item) => (
                    <>
                      <div
                        className="viewordermenu__body__body__details__items__body__left"
                        key={item.id}
                      >
                        <img src={item.Image} alt="item" />
                        <div className="viewordermenu__body__body__details__items__body__left__name">
                          <h1>{item.Name}</h1>
                          <p>{item.Size}</p>
                        </div>
                      </div>
                      <div className="viewordermenu__body__body__details__items__body__middle">
                        <p>{item.Quantity}</p>
                      </div>
                      <div className="viewordermenu__body__body__details__items__body__right">
                        <p>{item.Price}</p>
                      </div>
                    </>
                  ))}
                </div>
              </div>

              <div className="viewordermenu__body__body__details__subtotal">
                <h4>Subtotal:</h4>
                <p>N690,000.00</p>
              </div>

              <div className="viewordermenu__body__body__details__shipping">
                <p>Shipping:</p>
                <div className="viewordermenu__body__body__details__shipping__right">
                  <p>N2,500.00</p>
                  <h4>
                    Door Delivery, to be delivered between the dates 16th of may
                    to 20th of may(usually 3 days after order is confirmed)
                  </h4>
                </div>
              </div>

              <div className="viewordermenu__body__body__details__discount">
                <p>Voucher/Discount Code:</p>
                <h4>0G5ss1baX or use “-” for no voucher</h4>
              </div>

              <div className="viewordermenu__body__body__details__total">
                <p>Total:</p>
                <p>N3,003,000.00</p>
              </div>
            </div>

            <div className="viewordermenu__body__body__address">
              <div className="viewordermenu__body__body__address__header">
                <h1>Delivery Address</h1>
              </div>

              <div className="viewordermenu__body__body__address__details">
                <h4>John Doe</h4>
                <p>123, Main Street, Lagos, Nigeria</p>
                <p>08012345678</p>
              </div>
            </div>

            <div className="viewordermenu__body__body__cancel">
              <button>
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

import React from "react";
import "./AccountPage.scss";
import backbtn from "../../assets/Images/icons/backbtn.svg";

interface ViewOrderMenuProps {
  handleViewDetail: () => void;
}
const item = {
  Image:
    "https://images.unsplash.com/photo-1610398000004-8b8b1b2b1b1a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  Name: "item 1",
  Size: "70cl",
  Quantity: "QTY:X10",
  Price: "N300,000.00",
};
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

              <div className="viewordermenu__body__body_details_items">
              </div>

              <div className="viewordermenu__body__body__details__subtotal">
                <p>Subtotal:</p>
                <p>N690,000.00</p>
              </div>

              <div className="viewordermenu__body__body__details__shipping">
                <p>Shipping:</p>
                <div>
                  <p>N2,500.00</p>
                  <p>
                    Door Delivery, to be delivered between the dates 16th of may
                    to 20th of may(usually 3 days after order is confirmed)
                  </p>
                </div>
              </div>

              <div className="viewordermenu__body__body__details__discount">
                <p>Voucher/Discount Code:</p>
                <p>0G5ss1baX or use “-” for no voucher</p>
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
                <p>John Doe</p>
                <p>123, Main Street, Lagos, Nigeria</p>
                <p>08012345678</p>
              </div>
            </div>

            <div className="viewordermenu__body__body__cancel">
              <button>
                {" "}
                <span>X</span> Cancel Order
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

import React from "react";
import "./AccountPage.scss";

interface ViewOrderMenuProps {
  handleViewDetail: () => void;
}

const ViewOrderMenu: React.FC<ViewOrderMenuProps> = ({ handleViewDetail }) => {
  return (
    <>
      <div className="viewordermenu__header">
        <button onClick={handleViewDetail}>
          <img src="backlogo" alt="" />
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
            <h1>Order status</h1>
            <h2>Order*11267880 was placed on 12th April, 2023</h2>
            <p>5 items. Total: N3,003,000.00</p>
          </div>

          <div className="viewordermenu__body__body__details">
            <div className="viewordermenu__body__body__details__header">
              <h1>Order Details</h1>
            </div>

            <div className="viewordermenu__body__body_details_items">
              {/* PUT THE TABLE FOR THE CART ITEMS HERE */}
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
              Please note: orders cannot be cancelled after order confirmation.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewOrderMenu;

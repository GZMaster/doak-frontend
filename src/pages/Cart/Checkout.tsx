import React from "react";
import UseMediaQuery from "../../components/mediaquery/UseMediaQuerry";
import CheckOutTab from "../../components/Tabs/CheckoutTab";
import "./Cart.scss";

export default function Checkout() {
  const isPageWide = UseMediaQuery("(min-width: 769px)");
  return (
    <section className="Cart">
      <div className="wrapper">
        <h2 className="title">Checkout</h2>
        <div className="cart-wrapper">
          <div>
            <CheckOutTab />
          </div>
          {isPageWide && (
            <div className="cart-summary">
              <div className="title">Cart Summary </div>
              <p className="items-total">
                3 Items
                <span>N3,000,000</span>
              </p>
              <label htmlFor="promo" className="promo-code">
                PROMO CODE
              </label>
              <input id="promo" type="text" placeholder="Enter Voucher" />
              <div className="text">Delivery fees are not included</div>
              <div className="line" />
              <div className="subtotal">
                Subtotal <span>N3,000,000</span>
              </div>
              <button className="btn">CHECK OUT</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

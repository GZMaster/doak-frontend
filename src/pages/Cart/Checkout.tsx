import React, { useEffect, useState } from "react";
import { useCart } from "../../services/CartContext";
import { FormatNaira } from "../../utils/FormatCurrency";
import { useLoading } from "../../services/LoadingContext";
import UseMediaQuery from "../../components/mediaquery/UseMediaQuerry";
import CheckOutTab from "../../components/Tabs/CheckoutTab";
import "./Cart.scss";

export default function Checkout() {
  const { isLoading, setIsLoading, LoadingComponent } = useLoading();
  const { cartItems, getTotalCartPrice } = useCart();
  const isPageWide = UseMediaQuery("(min-width: 769px)");
  const [quantityNumber, setQuantityNumber] = useState(0);
  const [total, setTotal] = useState(0);

  const items = cartItems;

  useEffect(() => {
    setIsLoading(true);
    if (items) {
      const total = getTotalCartPrice();
      setTotal(total);
      setQuantityNumber(items.length);
    }
  }, [items]);

  return (
    <section className="Cart">
      {isLoading && <LoadingComponent />}
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
                {quantityNumber} Items
                <span>{FormatNaira(total)}</span>
              </p>
              <label htmlFor="promo" className="promo-code">
                PROMO CODE
              </label>
              <input id="promo" type="text" placeholder="Enter Voucher" />
              <div className="text">Delivery fees are not included</div>
              <div className="line" />
              <div className="subtotal">
                Subtotal <span>{FormatNaira(total)}</span>
              </div>
              <button className="btn">CHECK OUT</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

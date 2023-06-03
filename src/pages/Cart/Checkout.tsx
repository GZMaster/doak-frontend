import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FormatNaira } from "../../utils/FormatCurrency";
import { useLoading } from "../../services/LoadingContext";
import UseMediaQuery from "../../components/mediaquery/UseMediaQuerry";
import CheckOutTab from "../../components/Tabs/CheckoutTab";
import "./Cart.scss";

interface Props {
  items: [
    {
      name: string;
      price: number;
      product: string;
      quantity: number;
    }
  ];
}

export default function Checkout() {
  const { isLoading, setIsLoading, LoadingComponent } = useLoading();
  const isPageWide = UseMediaQuery("(min-width: 769px)");
  const location = useLocation();
  const [quantityNumber, setQuantityNumber] = useState(0);
  const [total, setTotal] = useState(0);
  const items = location.state.items;

  useEffect(() => {
    setIsLoading(true);
    calculateTotal(items);
  }, [items]);

  const calculateTotal = (items: Props) => {
    let quantity = 0;
    let total = 0;
    if (items) {
      Object.values(items).forEach((item) => {
        quantity += item.quantity;
        total += item.price * item.quantity;
      });
    }

    setQuantityNumber(quantity);
    setTotal(total);
    setIsLoading(false);
  };

  return (
    <section className="Cart">
      {isLoading && <LoadingComponent />}
      <div className="wrapper">
        <h2 className="title">Checkout</h2>
        <div className="cart-wrapper">
          <div>
            <CheckOutTab items={items} />
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

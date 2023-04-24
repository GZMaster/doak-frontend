import React, { useState } from "react";
import "./Cart.scss";
import Trash from "../../assets/Images/icons/trash.svg";
import product from "../../assets/Images/others/itemDrink.png";
import { Link } from "react-router-dom";
import UseMediaQuery from "../../components/mediaquery/UseMediaQuerry";

export default function Cart() {
  const [quantity, setQuantity] = useState("1");
  const handleQuantityDecrease = () => {
    setQuantity((prevQuantity) => {
      if (!prevQuantity || prevQuantity === "1") {
        return "1";
      }
      return String(parseInt(prevQuantity, 10) - 1);
    });
  };

  const handleQuantityIncrease = () => {
    setQuantity((prevQuantity) => {
      if (!prevQuantity) {
        return "1";
      }
      return String(parseInt(prevQuantity, 10) + 1);
    });
  };
  function handleQuantityChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newQuantity = event.target.value.replace(/\D/g, ""); // remove non-digit characters
    if (Number(newQuantity) > 100) {
      setQuantity("100");
    } else {
      setQuantity(newQuantity);
    }
  }
  const isPageWide = UseMediaQuery("(min-width: 769px)");
  return (
    <section className="Cart">
      <div className="wrapper">
        <h2 className="title">Shopping Cart</h2>
        {isPageWide ? (
          <div className="cart-wrapper">
            <div className="cart-table">
              <table>
                <thead>
                  <tr>
                    <th>PRODUCT DETAILS</th>
                    <th>PRICE</th>
                    <th>QUANTITY</th>
                    <th>TOTAL</th>
                    <th style={{ visibility: "hidden" }}>DELETE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="product__cart">
                      <img className="product__image" src={product} alt="" />
                      <div className="product__details">
                        <p className="product__name">
                          Hennessy VS Cognac ORIGINAL 70cl X6
                        </p>
                        <p>70cl</p>
                      </div>
                    </td>
                    <td className="price">N23,000</td>
                    <td>
                      <div className="product-quantity">
                        <div className="quantity-controls">
                          <button
                            className="decrease-quantity"
                            onClick={handleQuantityDecrease}
                          >
                            -
                          </button>
                          <input
                            type="text"
                            name="quantity"
                            value={quantity}
                            maxLength={3}
                            onChange={handleQuantityChange}
                          />
                          <button
                            className="increase-quantity"
                            onClick={handleQuantityIncrease}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="total">N230,000</td>
                    <td>
                      <img src={Trash} alt="delete" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="cart-summary">
              <div className="title">Cart Summary</div>
              <p className="items-total">
                3 Items
                <span>N3,000,000</span>
              </p>
              {/* future feature */}
              {/* <label htmlFor="promo" className="promo-code">
              PROMO CODE
            </label>
            <input id="promo" type="text" placeholder="Enter Voucher" /> */}
              <div className="text">Delivery fees are not included</div>
              <div className="line" />
              <div className="subtotal">
                Subtotal <span>N3,000,000</span>
              </div>
              <Link to="/checkout" className="btn">
                CHECK OUT
              </Link>
            </div>
          </div>
        ) : (
          <div className="cart-wrapper">
            <div className="cart-table">
              <div className="product__cart">
                <div style={{ display: "flex", gap: "1rem" }}>
                  <img className="product__image" src={product} alt="" />
                  <div className="product__details">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                      }}
                    >
                      <p className="product__name">
                        Hennessy VS Cognac ORIGINAL 70cl X6
                      </p>
                      <div className="total">N230,000</div>
                    </div>
                    <div className="product-quantity">
                      <div className="quantity-controls">
                        <button
                          className="decrease-quantity"
                          onClick={handleQuantityDecrease}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          name="quantity"
                          value={quantity}
                          maxLength={3}
                          onChange={handleQuantityChange}
                        />
                        <button
                          className="increase-quantity"
                          onClick={handleQuantityIncrease}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="cart__delete">
                  <img src={Trash} alt="delete" />
                  Delete
                </div>
              </div>
            </div>
            <div className="cart-summary">
              <div className="subtotal">
                Subtotal <span>N3,000,000</span>
              </div>
              <Link to="/checkout" className="btn">
                CHECK OUT
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

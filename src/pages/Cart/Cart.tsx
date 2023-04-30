import React, { useState, useEffect } from "react";
import "./Cart.scss";
import Trash from "../../assets/Images/icons/trash.svg";
import productImg from "../../assets/Images/others/itemDrink.png";
import { Link } from "react-router-dom";
import UseMediaQuery from "../../components/mediaquery/UseMediaQuerry";

export default function Cart() {
  const [cart, setCart] = useState();
  const [quantity, setQuantity] = useState(1);
  const isPageWide = UseMediaQuery("(min-width: 769px)");

  useEffect(() => {
    getCart();
  }, []);

  const getCart = async () => {
    // Get jwt Bear token from local storage
    const token = localStorage.getItem("jwt");

    const response = await fetch(
      // `https://doakbackend.cyclic.app/api/v1/wine/cart/`,
      `http://localhost:3000/api/v1/wine/cart/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    setCart(data.data.cart);
  };

  const handleQuantityDecrease = () => {
    setQuantity((prevQuantity) => {
      if (!prevQuantity || prevQuantity === 1) {
        return 1;
      }
      return prevQuantity - 1;
    });
  };

  const handleQuantityIncrease = () => {
    setQuantity((prevQuantity) => {
      if (!prevQuantity) {
        return 1;
      }
      return prevQuantity + 1;
    });
  };

  function handleQuantityChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newQuantity = parseInt(event.target.value.replace(/\D/, ""));
    if (newQuantity > 100) {
      setQuantity(100);
    } else {
      setQuantity(newQuantity);
    }
  }

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
                      <img className="product__image" src={productImg} alt="" />
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
                            type="number"
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
                  <img className="product__image" src={productImg} alt="" />
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

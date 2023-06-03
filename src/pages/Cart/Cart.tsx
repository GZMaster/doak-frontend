import React, { useState, useEffect, useLayoutEffect } from "react";
import { useLoading } from "../../services/LoadingContext";
import { useCart } from "../../services/CartContext";
import "./Cart.scss";
import Trash from "../../assets/Images/icons/trash.svg";
import productImg from "../../assets/Images/others/itemDrink.png";
import { useNavigate } from "react-router-dom";
import UseMediaQuery from "../../components/mediaquery/UseMediaQuerry";
import { FormatNaira } from "../../utils/FormatCurrency";

interface MyObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export default function Cart() {
  const navigate = useNavigate();
  const {
    cartItems,
    getCart,
    removeFromCart,
    getTotalCartPrice,
    quantityChange,
  } = useCart();
  const { isLoading, setIsLoading, LoadingComponent } = useLoading();
  const isPageWide = UseMediaQuery("(min-width: 769px)");
  const [cartLength, setCartLength] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useLayoutEffect(() => {
    setIsLoading(true);

    getCart();

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (cartItems) {
      const length = getTotalCartPrice();
      setTotalPrice(length);
      setCartLength(Object.keys(cartItems).length);
    }
  }, [cartItems]);

  console.log(cartItems);

  return (
    <section className="Cart">
      {isLoading && <LoadingComponent />}
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
                  {cartItems &&
                    Object.values(cartItems).map((items) => {
                      const { id, name, price, quantity } = items;
                      const totalPrice = price * quantity;

                      const onQuantityChange = (event: MyObject) => {
                        const { value } = event.target;
                        quantityChange(id, value);
                      };

                      return (
                        <tr key={id}>
                          <td className="product__cart">
                            <img
                              className="product__image"
                              src={productImg}
                              alt=""
                            />
                            <div className="product__details">
                              <p className="product__name">{name}</p>
                            </div>
                          </td>

                          <td className="price">{FormatNaira(price)}</td>

                          <td className="product_quantity">
                            <div className="product-quantity">
                              <div className="quantity-controls">
                                <input
                                  type="number"
                                  name="quantity"
                                  value={quantity}
                                  maxLength={3}
                                  onChange={(event) => onQuantityChange(event)}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="total">{totalPrice}</td>
                          <td
                            className="product_delete"
                            onClick={() => removeFromCart(id)}
                          >
                            <img src={Trash} alt="delete" />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <div className="cart-summary">
              <div className="title">Cart Summary</div>
              <p className="items-total">
                {cartLength} Items
                <span>{FormatNaira(totalPrice)}</span>
              </p>
              {/* future feature */}
              {/* <label htmlFor="promo" className="promo-code">
              PROMO CODE
            </label>
            <input id="promo" type="text" placeholder="Enter Voucher" /> */}
              <div className="text">Delivery fees are not included</div>
              <div className="line" />
              <div className="subtotal">
                Subtotal <span>{FormatNaira(totalPrice)}</span>
              </div>
              <button
                className="btn"
                onClick={() => {
                  navigate("/checkout", { state: { items: cartItems } });
                }}
              >
                CHECK OUT
              </button>
            </div>
          </div>
        ) : (
          <div className="cart-wrapper">
            <div className="cart-table">
              <div className="product__cart">
                {cartItems &&
                  Object.values(cartItems).map((items) => {
                    const { id, name, price, quantity } = items;

                    const onQuantityChange = (event: MyObject) => {
                      const { value } = event.target;
                      quantityChange(id, value);
                    };

                    return (
                      <div key={id}>
                        <div style={{ display: "flex", gap: "1rem" }}>
                          <img
                            className="product__image"
                            src={productImg}
                            alt=""
                          />
                          <div className="product__details">
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "5px",
                              }}
                            >
                              <p className="product__name">{name}</p>
                              <div className="total">{FormatNaira(price)}</div>
                            </div>
                            <div className="product-quantity">
                              <div className="quantity-controls">
                                <input
                                  type="text"
                                  name="quantity"
                                  value={quantity}
                                  maxLength={3}
                                  onChange={(event) => onQuantityChange(event)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="cart__delete"
                          onClick={() => removeFromCart(id)}
                        >
                          <img src={Trash} alt="delete" />
                          Delete
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="cart-summary">
              <div className="subtotal">
                Subtotal <span>{FormatNaira(totalPrice)}</span>
              </div>
              <button
                className="btn"
                onClick={() => {
                  navigate("/checkout", { state: { items: cartItems } });
                }}
              >
                CHECK OUT
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

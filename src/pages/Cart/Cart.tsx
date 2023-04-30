import React, { useState, useEffect } from "react";
import "./Cart.scss";
import Trash from "../../assets/Images/icons/trash.svg";
import productImg from "../../assets/Images/others/itemDrink.png";
import { Link } from "react-router-dom";
import UseMediaQuery from "../../components/mediaquery/UseMediaQuerry";

interface MyObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export default function Cart() {
  const [cart, setCart] = useState();
  const isPageWide = UseMediaQuery("(min-width: 769px)");
  const [productData, setProductData] = useState<MyObject>();

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    if (cart) {
      getProductDataForCart(cart);
    }
  }, [cart]);

  const getCart = async () => {
    // Get jwt Bear token from local storage
    const token = localStorage.getItem("jwt");

    const response = await fetch(
      `https://doakbackend.cyclic.app/api/v1/wine/cart/`,
      // `http://localhost:3000/api/v1/wine/cart/`,
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

  async function getProductDataForCart(cart: never) {
    // Get the list of product IDs from the cart object
    const productIds = Object.keys(cart);

    // Create an array of promises for fetching product data for each product ID
    const productDataPromises = productIds.map(async (id) => {
      const response = await fetch(
        // `https://doakbackend.cyclic.app/api/v1/wine/${id}`
        `http://localhost:3000/api/v1/wine/${id}`
      );

      const res = await response.json();

      return res.data.wineProduct;
    });

    // Wait for all product data promises to resolve and get an array of product data
    const productData = await Promise.all(productDataPromises);

    // Create a new object that includes the product data and quantities for each product ID
    const productDataWithQuantities: MyObject = {};
    productData.forEach((data, i) => {
      const id = productIds[i];
      productDataWithQuantities[id] = {
        ...data,
        quantity: cart[id],
      };
    });

    // Return the new object with product data and quantities
    setProductData(productDataWithQuantities);
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
                  {productData &&
                    Object.values(productData).map((product, index) => {
                      const { id, name, price, quantity } = product;

                      const quantityNumber = quantity.quantity;

                      const total = price * quantity.quantity;

                      const onQuantityChange = (e: {
                        target: { value: string };
                      }) => {
                        const newQuantity = e.target.value;

                        console.log(newQuantity);

                        // Update the cart object in state
                        // setCart((prevCart) => {
                        //   return {
                        //     ...prevCart,
                        //     [id]: newQuantity,
                        //   };
                        // });
                      };

                      return (
                        <tr key={index}>
                          <td className="product__cart" key={id}>
                            <img
                              className="product__image"
                              src={productImg}
                              alt=""
                            />
                            <div className="product__details">
                              <p className="product__name">{name}</p>
                            </div>
                          </td>

                          <td className="price" key={id}>
                            {price}
                          </td>

                          <td className="product_quantity" key={id}>
                            <div className="product-quantity">
                              <div className="quantity-controls">
                                <input
                                  type="number"
                                  name="quantity"
                                  value={quantityNumber}
                                  maxLength={3}
                                  onChange={onQuantityChange}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="total" key={id}>
                            {total}
                          </td>
                          <td className="product_delete" key={id}>
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
                      {/* <div className="quantity-controls">
                        <button
                          className="decrease-quantity"
                          onClick={handleQuantityDecrease}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          name="quantity"
                          value={quantityNumber}
                          maxLength={3}
                          onChange={handleQuantityChange}
                        />
                        <button
                          className="increase-quantity"
                          onClick={handleQuantityIncrease}
                        >
                          +
                        </button>
                      </div> */}
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

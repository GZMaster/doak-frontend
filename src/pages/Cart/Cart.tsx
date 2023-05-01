import React, { useState, useEffect } from "react";
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
  const [cart, setCart] = useState();
  const isPageWide = UseMediaQuery("(min-width: 769px)");
  const [productData, setProductData] = useState<MyObject>();
  const [cartLength, setCartLength] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkoutItems, setCheckoutItems] = useState<MyObject>();

  useEffect(() => {
    getCart().then((cart) => {
      setCart(cart);
    });
  }, [window.location.pathname]);

  useEffect(() => {
    if (cart) {
      getProductDataForCart(cart);
      setCartLength(Object.keys(cart).length);
      getTotalCartPrice();
    }
  }, [cart]);

  const createCheckOut = () => {
    if (productData) {
      const items = Object.values(productData).map((product) => {
        const { quantity, id, name, price } = product;
        const quantityNumber = quantity.quantity;
        const item = {
          product: id,
          quantity: quantityNumber,
          price: price,
          name: name,
        };
        return item;
      });

      setCheckoutItems(items);
    }
  };

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

    const cartData = data.data.cart;

    return cartData;
  };

  const getTotalCartPrice = () => {
    if (productData) {
      const totalCartPrice = Object.values(productData).reduce(
        (acc, product) => {
          const { price, quantity } = product;
          const quantityNumber = quantity.quantity;
          const total = price * quantityNumber;
          return acc + total;
        },
        0
      );

      setTotalPrice(totalCartPrice);
    }
  };

  // const updateCart = async (quantityId: string, quantityValue: number) => {
  //   // Get jwt Bear token from local storage
  //   const token = localStorage.getItem("jwt");

  //   const response = await fetch(
  //     // `https://doakbackend.cyclic.app/api/v1/wine/cart/${quantityId}`,
  //     `http://localhost:3000/api/v1/wine/cart/${quantityId}`,
  //     {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         quantity: quantityValue,
  //       }),
  //     }
  //   );

  //   const data = await response.json();

  //   const cartData = data.data.cart;

  //   return cartData;
  // };

  const deleteItem = async (id: string) => {
    // Get jwt Bear token from local storage
    const token = localStorage.getItem("jwt");

    const response = await fetch(
      `https://doakbackend.cyclic.app/api/v1/wine/cart/${id}`,
      // `http://localhost:3000/api/v1/wine/cart/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    const cartData = data.data.cart;

    setCart(cartData);
  };

  async function getProductDataForCart(cart: never) {
    // Get the list of product IDs from the cart object
    const productIds = Object.keys(cart);

    // Create an array of promises for fetching product data for each product ID
    const productDataPromises = productIds.map(async (id) => {
      const response = await fetch(
        `https://doakbackend.cyclic.app/api/v1/wine/${id}`
        // `http://localhost:3000/api/v1/wine/${id}`
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
                    Object.values(productData).map((product) => {
                      const { id, name, price, quantity } = product;
                      const quantityNumber = quantity.quantity;
                      const total = price * quantity.quantity;

                      const onQuantityChange = () => {
                        // const quantityValue = e.target.value;
                        // const quantityId = quantity.id;
                        // updateCart(quantityId, parseInt(quantityValue)).then(
                        //   (cart) => {
                        //     setCart(cart);
                        //   }
                        // );
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
                                  value={quantityNumber}
                                  maxLength={3}
                                  onChange={onQuantityChange}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="total">{total}</td>
                          <td
                            className="product_delete"
                            onClick={() => deleteItem(id)}
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
                  navigate("/checkout", { state: { items: checkoutItems } });
                  createCheckOut;
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
                {productData &&
                  Object.values(productData).map((product) => {
                    const { id, name, price, quantity } = product;
                    const quantityNumber = quantity.quantity;

                    const onQuantityChange = () => {
                      // const quantityValue = e.target.value;
                      // const quantityId = quantity.id;
                      // updateCart(quantityId, parseInt(quantityValue)).then(
                      //   (cart) => {
                      //     setCart(cart);
                      //   }
                      // );
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
                                  value={quantityNumber}
                                  maxLength={3}
                                  onChange={onQuantityChange}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="cart__delete"
                          onClick={() => deleteItem(id)}
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
                  navigate("/checkout", { state: { items: checkoutItems } });
                  createCheckOut;
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

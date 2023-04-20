import React from "react";
import product from "../../assets/Images/others/Rectangle 62.png";
import "./Tab.scss";

const SummaryTab = () => {
  return (
    <section className="summary_tab">
      <p className="summary_tab_title">Order Summary</p>
      <div className="summary_tab_wrapper">
        <div className="wrapper">
          <div className="header">
            <p>Cart Items</p>
            <p className="edit">Edit</p>
          </div>
          <div className="body">
            <div className="item">
              <div className="product__cart">
                <img className="product__image" src={product} alt="" />
                <div className="product__details">
                  <p className="product__name">
                    Hennessy VS Cognac ORIGINAL 70cl X6
                  </p>
                  <p>70cl</p>
                </div>
              </div>
              <p className="quantity">x10</p>
              <div className="price">N23,000</div>
            </div>
            <div className="item">
              <div className="product__cart">
                <img className="product__image" src={product} alt="" />
                <div className="product__details">
                  <p className="product__name">
                    Hennessy VS Cognac ORIGINAL 70cl X6
                  </p>
                  <p>70cl</p>
                </div>
              </div>
              <p className="quantity">x10</p>
              <div className="price">N23,000</div>
            </div>
            <div className="item">
              <div className="product__cart">
                <img className="product__image" src={product} alt="" />
                <div className="product__details">
                  <p className="product__name">
                    Hennessy VS Cognac ORIGINAL 70cl X6
                  </p>
                  <p>70cl</p>
                </div>
              </div>
              <p className="quantity">x10</p>
              <div className="price">N23,000</div>
            </div>
          </div>
        </div>
        <div className="wrapper">
          <div className="header">
            <p>Address</p>
            <p className="edit">Edit</p>
          </div>
          <div className="body address">
            <h2>Omonaluse Ohkuehne</h2>
            <p>No 14, 19th street BDPA, Ugbowo, Benin City, Oyo State</p>
            <p>+2348180281937</p>
          </div>
        </div>
        <div className="wrapper">
          <div className="header">
            <p>Delivery</p>
            <p className="edit">Edit</p>
          </div>
          <div className="body address">
            <h2>Door Delivery</h2>
            <p>To be delivered between Wenesday 22 Mar and Friday 26 Mar</p>
            <p style={{ color: "#ff3426", fontWeight: "600" }}>N2,500</p>
          </div>
        </div>
        <div style={{ textAlign: "center" }} className="auth_continue_btn">
          Proceed to Payment
        </div>
      </div>
    </section>
  );
};

export default SummaryTab;
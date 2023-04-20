import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import Loader from "react-loader-advanced";
import Loading from "../../components/Loader/Loading";
import "./hero.scss";
import BG from "../../assets/Images/others/hero-bg.svg";
import shoppingcart from "../../assets/Images/icons/shopping-cart-white.svg";

export default function Hero() {
  const [loading, isLoading] = useState<boolean>(false);

  const handleLoading = () => {
    isLoading(true);
    setTimeout(() => {
      isLoading(false);
    }, 2000);
  };

  useEffect(() => {
    handleLoading();
  }, [BG, window.onload]);

  const spinner = <Loading />;
  return (
    <Loader
      show={loading}
      message={spinner}
      backgroundStyle={{ backgroundColor: "grey", opacity: 0.9 }}
    >
      <section className="hero">
        <img src={BG} alt="" />
        <div className="text-container">
          <h1>We give you only the best. Top notch quality services.</h1>
          <p>
            Integer quam adipiscing vestibulum nunc. Id nunc amet at sed orci
            diam. Cras venenatis sit faucibus.
          </p>
          <Link className="hero__button" smooth={true} spy={true} to="product">
            <h3>Start Shopping</h3>
            <span>
              <img src={shoppingcart} alt="" />
            </span>
          </Link>
        </div>
      </section>
    </Loader>
  );
}

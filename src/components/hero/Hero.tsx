import React from "react";
import { Link } from "react-scroll";
import "./hero.scss";
import BG from "../../assets/Images/others/hero-bg.svg";
import shoppingcart from "../../assets/Images/icons/shopping-cart-white.svg";

export default function Hero() {
  return (
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
  );
}

import React, { useEffect } from "react";
import { Link } from "react-scroll";
import { useLoading } from "../../services/LoadingContext";
import UseMediaQuery from "../mediaquery/UseMediaQuerry";
import "./hero.scss";
import shoppingcart from "../../assets/Images/icons/shopping-cart-white.svg";
import heroBg from "../../assets/Images/others/hero-mobile.png";

export default function Hero() {
  const { isLoading, setIsLoading, LoadingComponent } = useLoading();
  const isPageWide = UseMediaQuery("(min-width: 769px)");

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [setIsLoading]);

  return (
    <section className="hero">
      {isLoading && <LoadingComponent />}
      {isPageWide ? (
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
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="text-container">
            <h1>We give you only the best. Top notch quality services.</h1>
            <p>
              Integer quam adipiscing vestibulum nunc. Id nunc amet at sed orci
              diam. Cras venenatis sit faucibus.
            </p>
            <Link
              className="hero__button"
              smooth={true}
              spy={true}
              to="product"
            >
              <h3>Start Shopping</h3>
              <span>
                <img src={shoppingcart} alt="" />
              </span>
            </Link>
          </div>
          <img src={heroBg} alt="" />
          <p className="available">
            Showing results for{" "}
            <span style={{ fontWeight: "700" }}>“Available Products”</span> in
            stock
          </p>
        </div>
      )}
    </section>
  );
}

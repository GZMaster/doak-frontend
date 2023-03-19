import React from "react";
import { useState } from "react";
import BurgerMenu from "../hamburger/BurgerMenu";
import UseMediaQuery from "../mediaquery/UseMediaQuerry";
import logo from "../../assets/Images/logo/logo.png";
import search from "../../assets/Images/icons/search-normal.svg";
import notification from "../../assets/Images/icons/notification.svg";
import cart from "../../assets/Images/icons/shopping-cart.svg";
import user from "../../assets/Images/icons/user-square.svg";
import "./NavBar.scss";

const NavBar = () => {
  const isPageWide = UseMediaQuery("(min-width: 769px)");
  const [colorChange, setColorChange] = useState(false);
  const changeNavbarColor = () => {
    if (window.scrollY >= 50 || !isPageWide) {
      setColorChange(true);
    } else {
      setColorChange(false);
    }
  };
  window.addEventListener("scroll", changeNavbarColor);

  return (
    <nav
      className={colorChange ? "nav_component colorChange" : "nav_component"}
    >
      <div className="nav_header">
        <img className="logo" src={logo} alt="Brand Name" />
      </div>

      {isPageWide ? (
        <div className="content">
          <div className="search">
            <img src={search} alt="search" />
            <input type="text" placeholder="Search drinks in any category" />
            <button>Search</button>
          </div>
          <div className="right">
            <img src={notification} alt="notification" />
            <button>
              <img src={user} alt="" />
              Account
            </button>
            <div className="cart">
              <img src={cart} alt="" />
              Cart
            </div>
          </div>
        </div>
      ) : (
        <BurgerMenu />
      )}
    </nav>
  );
};

export default NavBar;

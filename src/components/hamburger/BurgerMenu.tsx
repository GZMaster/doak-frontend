import React from "react";
import { useState } from "react";
// import { Turn as Hamburger } from "hamburger-react";
import "./BurgerMenu.scss";

import search from "../../assets/Images/icons/search-normal.svg";
import notification from "../../assets/Images/icons/notification.svg";
import cart from "../../assets/Images/icons/shopping-cart.svg";
import user from "../../assets/Images/icons/user-square.svg";

const BurgerMenu = () => {
  // const [isOpen, setOpen] = useState(false);

  const [, setIsAuthOpen] = useState(false);

  return (
    <>
      {/* <Hamburger
        toggled={isOpen}
        toggle={setOpen}
        direction="right"
        duration={0.8}
        color="#FF8900"
      />

      <div className={`panel ${isOpen ? "open" : "close"}`}>
        <ul>
          <li>hello</li>
          <li>h</li>
          <li>k</li>
          <li>h</li>
          <li></li>
        </ul>
      </div> */}

      <div className="content">
        <div className="search">
          <img src={search} alt="search" />
          <input type="text" placeholder="Search drinks in any category" />
          <button>Search</button>
        </div>
        <div className="right">
          <img src={notification} alt="notification" />
          <button onClick={() => setIsAuthOpen(true)}>
            <img src={user} alt="" />
            Account
          </button>
          <button className="cart">
            <img src={cart} alt="" />
            Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default BurgerMenu;

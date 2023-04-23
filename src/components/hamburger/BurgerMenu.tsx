import React from "react";
import { useState } from "react";
import { Turn as Hamburger } from "hamburger-react";
import "./BurgerMenu.scss";
import "../navbar/NavBar.scss";
import notification from "../../assets/Images/icons/navbar/notification.svg";
import cart from "../../assets/Images/icons/navbar/shopping-cart(1).svg";
import user from "../../assets/Images/icons/navbar/user-square(1).svg";
import userLogged from "../../assets/Images/icons/navbar/user-square-logged.svg";
import cartLogged from "../../assets/Images/icons/navbar/shopping-cart-logged.svg";
import notificationLogged from "../../assets/Images/icons/navbar/Notifications-logged.svg";

const BurgerMenu = () => {
  const [isOpen, setOpen] = useState(false);
  const isUserLogged = true;
  const [, setIsAuthOpen] = useState(false);

  return (
    <>
      <Hamburger
        toggled={isOpen}
        toggle={setOpen}
        direction="right"
        duration={0.8}
        color="black"
      />
      <div className="content">
        <div className="right">
          {isUserLogged ? (
            <img src={notificationLogged} alt="notification" />
          ) : (
            <img src={notification} alt="notification" />
          )}

          <button onClick={() => setIsAuthOpen(true)}>
            {isUserLogged ? (
              <img src={userLogged} alt="user" />
            ) : (
              <img src={user} alt="user" />
            )}
          </button>
          <button className="cart">
            {isUserLogged ? (
              <img src={cartLogged} alt="cart" />
            ) : (
              <img src={cart} alt="cart" />
            )}
          </button>
        </div>
      </div>
      {/* <div className="search">
        <img src={search} alt="search" />
        <input type="text" placeholder="Search drinks in any category" />
        <button>Search</button>
      </div> */}
      <div className={`panel ${isOpen ? "open" : "close"}`}></div>
    </>
  );
};

export default BurgerMenu;

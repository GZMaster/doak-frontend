import React from "react";
import { useState } from "react";
// import { Turn as Hamburger } from "hamburger-react";
import AuthModal from "../auth/AuthModal";
import NotificationsModal from "../notification/NotificationModal";
import "./BurgerMenu.scss";
import "../navbar/NavBar.scss";
import notification from "../../assets/Images/icons/navbar/notification.svg";
import cart from "../../assets/Images/icons/navbar/shopping-cart(1).svg";
import userIcon from "../../assets/Images/icons/navbar/user-square(1).svg";
import userLoggedIcon from "../../assets/Images/icons/navbar/user-square-logged.svg";
import cartLogged from "../../assets/Images/icons/navbar/shopping-cart-logged.svg";
import notificationLogged from "../../assets/Images/icons/navbar/Notifications-logged.svg";
import { Link } from "react-router-dom";

const BurgerMenu = () => {
  const user = false;
  const [isOpen] = useState(false);
  const isUserLogged = true;
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isNotifiOpen, setIsNotifiOpen] = useState(false);

  const handleAuthClose = () => {
    setIsAuthOpen(false);
  };

  const handleNotifiClose = () => {
    setIsNotifiOpen(false);
  };

  return (
    <>
      {/* <Hamburger
        toggled={isOpen}
        toggle={setOpen}
        direction="right"
        duration={0.8}
        color="black"
      /> */}
      <div className="content">
        <div className="right">
          {isUserLogged ? (
            <img
              src={notificationLogged}
              alt="notification"
              onClick={() => setIsNotifiOpen(true)}
            />
          ) : (
            <img
              src={notification}
              alt="notification"
              onClick={() => setIsNotifiOpen(true)}
            />
          )}

          <button onClick={() => setIsAuthOpen(true)}>
            {isUserLogged ? (
              <img src={userLoggedIcon} alt="user" />
            ) : (
              <img src={userIcon} alt="user" />
            )}
          </button>
          <Link to="/cart" className="cart">
            {isUserLogged ? (
              <img src={cartLogged} alt="cart" />
            ) : (
              <img src={cart} alt="cart" />
            )}
          </Link>
        </div>
      </div>
      <div className={`panel ${isOpen ? "open" : "close"}`}></div>
      {isAuthOpen && (
        <AuthModal
          isOpen={isAuthOpen}
          onClose={handleAuthClose}
          isUserLoggedIn={!!user}
        />
      )}
      {isNotifiOpen && (
        <NotificationsModal isOpen={isNotifiOpen} onClose={handleNotifiClose} />
      )}
    </>
  );
};

export default BurgerMenu;

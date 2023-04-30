import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import { Turn as Hamburger } from "hamburger-react";
import { AuthContext } from "../../services/AuthContext";
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

const BurgerMenu = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const [isOpen] = useState(false);
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
          {isLoggedIn ? (
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

          <button
            onClick={() => {
              if (isLoggedIn) navigate("/account");
              else setIsAuthOpen(true);
            }}
          >
            {isLoggedIn ? (
              <img src={userLoggedIcon} alt="user" />
            ) : (
              <img src={userIcon} alt="user" />
            )}
          </button>
          <button
            className="cart"
            onClick={() => {
              if (isLoggedIn) navigate("/cart");
              else setIsAuthOpen(true);
            }}
          >
            {isLoggedIn ? (
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
      {isAuthOpen && (
        <AuthModal isOpen={isAuthOpen} onClose={handleAuthClose} />
      )}
      {isNotifiOpen && (
        <NotificationsModal isOpen={isNotifiOpen} onClose={handleNotifiClose} />
      )}
    </>
  );
};

export default BurgerMenu;

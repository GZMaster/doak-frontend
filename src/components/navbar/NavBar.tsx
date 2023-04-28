import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../services/AuthContext";
import BurgerMenu from "../hamburger/BurgerMenu";
import UseMediaQuery from "../mediaquery/UseMediaQuerry";
import logo from "../../assets/Images/logo/logo.svg";
import search from "../../assets/Images/icons/search-normal.svg";
import notification from "../../assets/Images/icons/notification.svg";
import cart from "../../assets/Images/icons/shopping-cart.svg";
import usericon from "../../assets/Images/icons/user-square.svg";
import AuthModal from "../auth/AuthModal";
import NotificationsModal from "../notification/NotificationModal";
import "./NavBar.scss";

const NavBar = () => {
  const navigate = useNavigate();
  const isPageWide = UseMediaQuery("(min-width: 769px)");
  const { isLoggedIn } = useContext(AuthContext);

  const [isAuthOpen, setIsAuthOpen] = useState(!isLoggedIn);
  const [isNotifiOpen, setIsNotifiOpen] = useState(false);

  const handleAuthClose = () => {
    setIsAuthOpen(false);
  };

  const handleNotifiClose = () => {
    setIsNotifiOpen(false);
  };

  const handleReload = () => {
    navigate("/");
  };

  return (
    <>
      <nav className="nav_component">
        <div className="nav_header" onClick={handleReload}>
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
              <img
                src={notification}
                alt="notification"
                onClick={() => setIsNotifiOpen(true)}
              />

              <button
                onClick={() => {
                  if (isLoggedIn) navigate("/account");
                  else setIsAuthOpen(true);
                }}
              >
                <img src={usericon} alt="" />
                Account
              </button>
              <Link to="/cart" className="cart">
                <img src={cart} alt="" />
                Cart
              </Link>
            </div>
          </div>
        ) : (
          <BurgerMenu />
        )}
      </nav>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={handleAuthClose}
        isUserLoggedIn={isLoggedIn}
      />
      <NotificationsModal isOpen={isNotifiOpen} onClose={handleNotifiClose} />
    </>
  );
};

export default NavBar;

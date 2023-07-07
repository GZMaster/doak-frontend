import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../services/AuthContext";
import { useProducts } from "../../services/ProductsContext";
import BurgerMenu from "../hamburger/BurgerMenu";
import UseMediaQuery from "../mediaquery/UseMediaQuerry";
import AuthModal from "../auth/AuthModal";
import NotificationsModal from "../notification/NotificationModal";
import Search from "../mobileSearch";
import "./NavBar.scss";
import logo from "../../assets/Images/logo/logo.svg";
import search from "../../assets/Images/icons/search-normal.svg";
import notification from "../../assets/Images/icons/notification.svg";
import usericon from "../../assets/Images/icons/user-square.svg";
import cart from "../../assets/Images/icons/shopping-cart.svg";
import cartLogged from "../../assets/Images/icons/navbar/notifactionsloggedin.svg";
import notificationLogged from "../../assets/Images/icons/navbar/cart-notificationloggedin.svg";
import userLoggedIcon from "../../assets/Images/icons/navbar/user-square-logged.svg";

const NavBar = () => {
  const navigate = useNavigate();
  const isPageWide = UseMediaQuery("(min-width: 769px)");
  const { isLoggedIn, checkTokenValidity } = useContext(AuthContext);
  const { searchTerm, setSearchTerm, searchProducts } = useProducts();

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isNotifiOpen, setIsNotifiOpen] = useState(false);

  useEffect(() => {
    const checkToken = checkTokenValidity();

    if (isLoggedIn && !checkToken) {
      setIsAuthOpen(true);
    }
  }, [isLoggedIn, checkTokenValidity]);

  const handleAuthClose = () => {
    setIsAuthOpen(false);
  };

  const handleNotifiClose = () => {
    setIsNotifiOpen(false);
  };

  const handleReload = () => {
    navigate("/");
  };

  const handleSearchTermChange = (event: { target: { value: string } }) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchButtonClick = () => {
    searchProducts();
  };

  return (
    <>
      <nav className="nav_component">
        <div className="nav_wrapper">
          <div className="nav_header" onClick={handleReload}>
            <img className="logo" src={logo} alt="Brand Name" />
          </div>

          {isPageWide ? (
            <div className="content">
              <div className="search">
                <img src={search} alt="search" />
                <input
                  type="text"
                  placeholder="Search drinks in any category"
                  value={searchTerm}
                  onChange={handleSearchTermChange}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleSearchButtonClick();
                    }
                  }}
                />
                <button onClick={handleSearchButtonClick}>Search</button>
              </div>
              <div className="right">
                <img
                  src={isLoggedIn ? notificationLogged : notification}
                  alt="notification"
                  onClick={() => setIsNotifiOpen(true)}
                />

                <button
                  onClick={() => {
                    if (isLoggedIn) navigate("/account");
                    else setIsAuthOpen(true);
                  }}
                >
                  <img src={isLoggedIn ? userLoggedIcon : usericon} alt="" />
                  Account
                </button>
                <button
                  className="cart"
                  onClick={() => {
                    if (isLoggedIn) navigate("/cart");
                    else setIsAuthOpen(true);
                  }}
                >
                  <img src={isLoggedIn ? cartLogged : cart} alt="" />
                  Cart
                </button>
              </div>
            </div>
          ) : (
            <BurgerMenu />
          )}
        </div>
        {!isPageWide && <Search />}
      </nav>

      <AuthModal isOpen={isAuthOpen} onClose={handleAuthClose} />
      <NotificationsModal isOpen={isNotifiOpen} onClose={handleNotifiClose} />
    </>
  );
};

export default NavBar;

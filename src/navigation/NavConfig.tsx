import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "../App";
import Main from "../pages/Main";
import AccountPage from "../pages/account/AccountPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Cart/Checkout";
import AboutPage from "../pages/about/AboutPage";
import ContactPage from "../pages/Contact/ContactPage";
import FaqPage from "../pages/faq/FaqPage";
import Page404 from "../pages/404/404Page";

const NavConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Main />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contactus" element={<ContactPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
};

export default NavConfig;

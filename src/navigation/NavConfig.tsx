import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "../App";
import Main from "../pages/Main";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Cart/Checkout";
import ProductPage from "../pages/ProductPage/ProductPage";
import AboutPage from "../pages/about/AboutPage";
import ContactPage from "../pages/Contact/ContactPage";
import FaqPage from "../pages/faq/FaqPage";

const NavConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Main />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contactus" element={<ContactPage />} />
        <Route path="/faq" element={<FaqPage />} />
      </Route>
    </Routes>
  );
};

export default NavConfig;

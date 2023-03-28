import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "../App";
import Cart from "../pages/Cart/Cart";
import Main from "../pages/Main";
import ProductPage from "../pages/ProductPage/ProductPage";

const NavConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Main />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
    </Routes>
  );
};

export default NavConfig;

import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "../App";
import Main from "../pages/Main";
import ProductPage from "../pages/ProductPage/ProductPage";

const NavConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Main />} />
        <Route path="/product" element={<ProductPage />} />
      </Route>
    </Routes>
  );
};

export default NavConfig;

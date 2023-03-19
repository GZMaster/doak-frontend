import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "../pages/Main";
import Product from "../pages/ProductPage/ProductPage";

const NavConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route path="/product" element={<Product />} />
      </Route>
    </Routes>
  );
};

export default NavConfig;

import React from "react";
import Hero from "../components/hero/Hero";
import Newsletter from "../components/news/Newsletter";
import Products from "../components/products/Products";
import Sidebar from "../components/sidebar/Sidebar";

export default function Main() {
  return (
    <>
      <Hero />
      <section className="main-content">
        <Sidebar />
        <Products />
      </section>
      <div
        style={{
          height: "30vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        COMING SOON
      </div>
      <Newsletter />
    </>
  );
}

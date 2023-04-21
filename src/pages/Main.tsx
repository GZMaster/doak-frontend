import React from "react";
import Hero from "../components/hero/Hero";
import UseMediaQuery from "../components/mediaquery/UseMediaQuerry";
import Newsletter from "../components/news/Newsletter";
import Products from "../components/products/Products";
import Sidebar from "../components/sidebar/Sidebar";

export default function Main() {
  const isPageWidth = UseMediaQuery("(min-width: 769px)");
  return (
    <>
      {isPageWidth ? <Hero /> : <></>}
      <section className="main-content">
        {isPageWidth ? <Sidebar /> : <></>}
        <Products />
      </section>
      {/* <div
        style={{
          height: "30vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        COMING SOON
      </div> */}
      <Newsletter />
    </>
  );
}

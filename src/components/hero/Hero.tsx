import React from "react";
import "./hero.scss";
import BG from "../../assets/Images/others/Hero.png";
export default function Hero() {
  return (
    <section className="hero">
      <img src={BG} alt="" />
      {/* <div className="text-container">
        <h1 className="top">WE GIVE YOU</h1>
        <h1 className="bot">ONLY THE BEST</h1>
      </div> */}
    </section>
  );
}

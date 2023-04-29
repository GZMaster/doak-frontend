import React from "react";
import search from "../../assets/Images/icons/search-normal.svg";
import "./search.scss";

export default function Search() {
  return (
    <div className="search">
      <img src={search} alt="search" />
      <input type="text" />
    </div>
  );
}

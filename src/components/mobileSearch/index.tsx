import React, { useState } from "react";
import { useProducts } from "../../services/ProductsContext";
import search from "../../assets/Images/icons/search-normal.svg";
import "./search.scss";
import filter from "../../assets/Images/icons/sort.svg";
import Sidebar from "../sidebar/Sidebar";
export default function Search() {
  const [show, setShow] = useState(false);
  const { searchTerm, setSearchTerm, searchProducts } = useProducts();

  const handleSearchTermChange = (event: { target: { value: string } }) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchButtonClick = () => {
    searchProducts();
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        width: "100%",
        position: "relative",
      }}
    >
      <div className="search">
        <img src={search} alt="search" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchTermChange}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSearchButtonClick();
            }
          }}
        />
      </div>
      <img src={filter} alt="" onClick={() => setShow(!show)} />
      {show && (
        <div className="mobile_filter">
          <Sidebar />
        </div>
      )}
    </div>
  );
}

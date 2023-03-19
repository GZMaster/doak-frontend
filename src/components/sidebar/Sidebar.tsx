import React from "react";
import "./sidebar.scss";
import filter from "../../assets/Images/icons/sort.svg";
import arrowUp from "../../assets/Images/icons/arrow-up.svg";
import arrowDown from "../../assets/Images/icons/arrow-down.svg";
import { useState } from "react";

interface FilterOption {
  name: string;
  label: string;
}
interface FilterSectionProps {
  options: FilterOption[];
}
const wineOptions: FilterOption[] = [
  { name: "all", label: "All" },
  { name: "wine", label: "Wine" },
  { name: "champagne", label: "Champagne" },
  { name: "beer", label: "Beer" },
  { name: "whiskey", label: "Whiskey" },
  { name: "brandy", label: "Brandy" },
  { name: "liqueur", label: "Liqueur" },
  { name: "spirit", label: "Spirit" },
];
const drinkOptions: FilterOption[] = [
  { name: "all", label: "All" },
  { name: "100ml", label: "100ml" },
  { name: "100ml", label: "100ml" },
  { name: "100ml", label: "100ml" },
];
const brandOptions: FilterOption[] = [
  { name: "all", label: "All" },
  { name: "star", label: "Star" },
  { name: "gulder", label: "Gulder" },
  { name: "trophy", label: "Trophy" },
  { name: "33 export", label: "33 Export" },
];

function FilterSection({ options }: FilterSectionProps) {
  const [filters, setFilters] = useState<{ [key: string]: boolean }>(
    options.reduce((acc, { name }) => ({ ...acc, [name]: name === "all" }), {})
  );
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFilters({ ...filters, [name]: checked });
  };

  return (
    <div className="filter-tab">
      {options.map(({ name, label }) => (
        <label key={name}>
          <input
            type="checkbox"
            name={name}
            checked={filters[name]}
            onChange={handleCheckboxChange}
          />
          {label}
        </label>
      ))}
    </div>
  );
}
export default function Sidebar() {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-filter">
          <img src={filter} alt="filter icon" /> Filter
        </div>
        <button className="sidebar-reset-btn">Reset</button>
      </div>
      <SortOption
        title="Category"
        options={wineOptions}
        show={show}
        toggleShow={toggleShow}
      />
      <SortOption
        title="Drink sizes"
        options={drinkOptions}
        show={show}
        toggleShow={toggleShow}
      />
      <SortOption
        title="Brand"
        options={brandOptions}
        show={show}
        toggleShow={toggleShow}
      />
    </aside>
  );
}
interface SortOptionProps {
  title: string;
  show: boolean;
  toggleShow: () => void;
  options: FilterOption[];
}
const SortOption = ({ title, options, show, toggleShow }: SortOptionProps) => {
  return (
    <div className="filter-option">
      <div className="filter-option-header">
        <h4 className="filter-option-title">{title}</h4>
        <button className="filter-option-btn" onClick={toggleShow}>
          {show ? "Hide" : "Show"}
          <img src={show ? arrowUp : arrowDown} alt="" />
        </button>
      </div>
      {show && <FilterSection options={options} />}
    </div>
  );
};

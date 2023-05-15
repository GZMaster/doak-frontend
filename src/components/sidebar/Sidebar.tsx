import React, { useEffect, useState } from "react";
import { useProducts } from "../../services/ProductsContext";
import "./sidebar.scss";
import filter from "../../assets/Images/icons/sort.svg";
import arrowUp from "../../assets/Images/icons/arrow-up.svg";
import arrowDown from "../../assets/Images/icons/arrow-down.svg";

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

function FilterSection({ options }: FilterSectionProps) {
  const { fetchProducts } = useProducts();
  const [filters, setFilters] = useState<{ [key: string]: boolean }>(
    options.reduce((acc, { name }) => ({ ...acc, [name]: name === "all" }), {})
  );

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      const filter = Object.entries(filters)
        .filter(([, value]) => value)
        .map(([key]) => key)
        .join(",");

      fetchProducts(10, 1, undefined, {
        field: "categories",
        operator: "",
        value: filter,
      });
    };

    // Call the fetchFilteredProducts function inside the effect
    fetchFilteredProducts();
  }, [filters]); // Add the dependencies fetchProducts and filters

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
  const [wineShow, setWineShow] = useState(false);
  const toggleWineShow = () => setWineShow(!wineShow);

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
        show={wineShow}
        toggleShow={toggleWineShow}
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

import React, { useState } from "react";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { Turn as Hamburger } from "hamburger-react";
import "./BurgerMenu.scss";

const BurgerMenu = () => {
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    setOpen(false);
    navigate("/");
  };
  return (
    <>
      <Hamburger
        className="hamburger_button"
        toggled={isOpen}
        toggle={setOpen}
        direction="right"
        duration={0.8}
        color="#FF8900"
      />

      <div className={`panel ${isOpen ? "open" : "close"}`}>
        <ul>
          <li>
            <Link
              activeclass="active"
              smooth={true}
              spy={true}
              to="home"
              offset={-60}
              onClick={handleClick}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              activeclass="active"
              smooth={true}
              spy={true}
              to="about"
              offset={-60}
              onClick={handleClick}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              activeclass="active"
              smooth={true}
              spy={true}
              to="services"
              offset={-60}
              onClick={handleClick}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              activeclass="active"
              smooth={true}
              spy={true}
              to="projects"
              offset={-60}
              onClick={handleClick}
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              activeclass="active"
              smooth={true}
              spy={true}
              offset={-60}
              to="contact"
              onClick={handleClick}
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default BurgerMenu;

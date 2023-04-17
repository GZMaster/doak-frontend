import React from "react";
import "./Footer.scss";
import Brand from "../../assets/Images/logo/logo_white.svg";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="Footer">
      <div className="foot-top">
        <div className="brand">
          <img src={Brand} alt="Brand name" />
          <p className="text">We give you everything you need</p>
        </div>
        <div className="wrapper">
          <div className="links">
            <div className="title">Features</div>
            <Link to="/Coming-soon" className="link">
              Privacy
            </Link>
            <Link to="/contact-us" className="link">
              Terms of Use
            </Link>
            <Link to="/contact-us" className="link">
              System Status
            </Link>
          </div>
          <div className="links">
            <div className="title">Help</div>
            <Link to="/terms" className="link">
              Getting started
            </Link>
            <Link to="/legal" className="link">
              Support
            </Link>
            <Link to="/privacy-policy" className="link">
              Knowledgeable
            </Link>
            <Link to="/privacy-policy" className="link">
              FAQ
            </Link>
          </div>
          <div className="links">
            <div className="title">Company</div>
            <Link to="/terms" className="link">
              About Us
            </Link>
            <Link to="/legal" className="link">
              Our Customers
            </Link>
            <Link to="/privacy-policy" className="link">
              Ratings
            </Link>
          </div>
          <div className="links">
            <div className="title">Contact Us</div>
            <Link to="/terms" className="link">
              Info@doak.com
            </Link>
            <Link to="/legal" className="link">
              1-800-200-300
            </Link>
            <Link to="/privacy-policy" className="link">
              Facebook
            </Link>
            <Link to="/privacy-policy" className="link">
              Twitter
            </Link>
          </div>
        </div>
      </div>
      <div className="foot-bottom">
        <div className="F_text">
          <p>
            Copyright © {new Date().getFullYear()} dorkdrinks. All rights
            reserved
          </p>
          <div className="circle" />
          <p>
            Designed by <span className="F_Team">Retro Developers</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

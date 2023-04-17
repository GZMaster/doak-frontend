import React from "react";
import "./ContactPage.scss";
import contactpagebg from "../../assets/Images/others/contactpagebg.png";
import fbicon from "../../assets/Images/logo/facebook-icon.png";
import wicon from "../../assets/Images/logo/whatsapp-icon.png";
import igicon from "../../assets/Images/logo/instagram-icon.png";

const ContactPage = () => {
  return (
    <div>
      <div className="contactimg">
        <img src={contactpagebg} alt="get in touch" />
      </div>
      <div></div>
      <div className="contact">
        <div className="call">
          <h2>CALL US:</h2>
          <p>+234 903 038 3868</p>
          <p>+234 816 171 8537</p>
        </div>
        <div className="email">
          <h2>EMAIL US:</h2>
          <p>hr@doakservices.com</p>
        </div>
        <div className="address">
          <h2>ADDRESS:</h2>
          <p>No 10, Temilanan street, Bodija, Oyo State</p>
        </div>
        <div>
          <img src={fbicon} alt="fb" className="fbicon" />
          <img src={igicon} alt="ig" className="igicon" />
          <img src={wicon} alt="wi" className="wicon" />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

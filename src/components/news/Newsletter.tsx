import React from "react";
import "./Newsletter.scss";
import notification from "../../assets/Images/icons/notification-white.svg";
export default function Newsletter() {
  return (
    <section className="Newsletter">
      <div className="wrapper">
        <h1 className="title">
          Subscribe to our <span style={{ color: "red" }}>newsletter</span>
        </h1>
        <p className="text">
          Join 3,000+ people and get notifications on drinks new in stock and
          discounts messages during events or something. Expect 1-2 emails per
          month.
        </p>
        <div className="subscribe">
          <input type="text" placeholder="eg. daniellaokere445@gmail.com" />
          <button>
            Subscribe <img src={notification} alt="" />
          </button>
        </div>
      </div>
    </section>
  );
}

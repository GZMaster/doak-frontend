import React from "react";
import { InputFields } from "../../lib/Main";
import "./AccountPage.scss";

const RateUsMenu = () => {
  const [sentRating, setSentRating] = React.useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSentRating(true);
  };

  return (
    <div className="rateusmenu">
      <div className="rateusmenu_header">
        <h2>Review Our Services</h2>
      </div>

      <div className="rateusmenu_body">
        {sentRating ? (
          <>
            <div className="rateusmenu_body_rate__success">
              <img src="ratelog" alt="" />
              <h1>Your review has been submitted</h1>
              <h3>Thank you for rating our services</h3>

              <button>
                <span>shoplogo</span>
                Continue Shopping
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="rateusmenu_body_rate">
              <h1>RATING</h1>
              <div className="rateusmenu_body_rate_stars">
                <span>star</span>
                <span>star</span>
                <span>star</span>
                <span>star</span>
                <span>star</span>
              </div>
            </div>

            <form className="rateusmenu_body_review" onSubmit={onSubmit}>
              <InputFields label="Display Name" type="text" />
              <InputFields label="Review" type="text" />

              <button className="rateusmenu_body_review_submitbtn">
                Submit Review
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default RateUsMenu;

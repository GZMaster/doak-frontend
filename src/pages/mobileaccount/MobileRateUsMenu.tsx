import React from "react";
import { useNavigate } from "react-router-dom";
import { InputFields, TextFields } from "../../lib/Main";
import "./MobileAccountPage";
import staricon from "../../assets/Images/icons/staricon.svg";
import reviewicon from "../../assets/Images/icons/review-icon.svg";
import shoppingicon from "../../assets/Images/icons/shopping-cart-white.svg";

interface MobileRateUsMenuProps {
  handleBack: () => void;
}

const MobileRateUsMenu: React.FC<MobileRateUsMenuProps> = ({ handleBack }) => {
  const navigate = useNavigate();
  const [sentRating, setSentRating] = React.useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSentRating(true);
  };

  return (
    <div className="mobilerateusmenu">
      <div className="mobilerateusmenu_header">
        <button onClick={handleBack}>BACK</button>
        <h2>Review Our Services</h2>
      </div>

      <div className="mobilerateusmenu_body">
        {sentRating ? (
          <>
            <div className="mobilerateusmenu_body_rate__success">
              <img src={reviewicon} alt="" />
              <h1>Your review has been submitted</h1>
              <h3>Thank you for rating our services</h3>

              <button
                onClick={() => {
                  navigate("/");
                }}
              >
                <span>
                  <img src={shoppingicon} alt="" />
                </span>
                Continue Shopping
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mobilerateusmenu_body_rate">
              <h3>RATING</h3>
              <div className="mobilerateusmenu_body_rate_stars">
                <span>
                  <img src={staricon} alt="" />
                </span>
                <span>
                  <img src={staricon} alt="" />
                </span>
                <span>
                  <img src={staricon} alt="" />
                </span>
                <span>
                  <img src={staricon} alt="" />
                </span>
                <span>
                  <img src={staricon} alt="" />
                </span>
              </div>
            </div>

            <form className="mobilerateusmenu_body_review" onSubmit={onSubmit}>
              <InputFields label="Display Name" type="text" />
              <TextFields label="Review" type="text" rows={5} />

              <button className="mobilerateusmenu_body_review_submitbtn">
                Submit Review
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileRateUsMenu;

import React from "react";
import { useNavigate } from "react-router-dom";
import arrowleft from "../../assets/Images/icons/arrow-left.svg";
import UseMediaQuery from "../../components/mediaquery/UseMediaQuerry";
import "./404Page.scss";

const Page404 = () => {
  const navigate = useNavigate();
  const isPageMob = UseMediaQuery("(max-width: 600px)");
  return (
    <div className="page404">
      <img src="page404DoakCan1.svg" className="page404__img1" />
      <img src="page404DoakCan2.svg" className="page404__img2" />
      <div className="page404__header">
        <div className="page404__header__errText">
          <h1>404</h1>
          <h2> Oops! Nothing to see here, this page does not exist!</h2>
        </div>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          <span>
            <img src={arrowleft} alt="icons" />
          </span>
          Go back Home
        </button>
      </div>
      {isPageMob && <div className="page404__mobile"></div>}
    </div>
  );
};

export default Page404;

import React from "react";
import { useNavigate } from "react-router-dom";
import "./404Page.scss";

const Page404 = () => {
  const navigate = useNavigate();
  return (
    <div className="page404">
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
            <img src="arrow-left.svg" alt="icons" />
          </span>
          Go back Home
        </button>
      </div>
    </div>
  );
};

export default Page404;

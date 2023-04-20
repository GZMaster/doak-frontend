import React from "react";
import { useNavigate } from "react-router-dom";
import "./404Page.scss";

const Page404 = () => {
  const navigate = useNavigate();
  return (
    <div className="page404">
      <div className="header">
        
        <div className="errText">
            <h1>404</h1>
            <h2> Oops! Nothing to see here, this page does not exist!</h2>
        </div>
        
      </div>
      <div className="page404__body">
        <button className='backbutton' onClick={() => {navigate("/")}}>
          <img src="arrow-left.svg" alt="icons" />
          
              <p>Go back Home</p>
        
        </button>
      </div>
    </div>
  );
};

export default Page404;

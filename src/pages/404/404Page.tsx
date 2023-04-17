import React from "react";
import "./404Page.scss";

const Page404 = () => {
  return (
    <div className="page404">
      <div className="page404__header">
        <h1>404 Opps! Nothing to see here, this page does not exist!</h1>
      </div>
      <div className="page404__body">
        <button>
          <img src="backicon" alt="icon" />
          <p>Go back Home</p>
        </button>
      </div>
    </div>
  );
};

export default Page404;

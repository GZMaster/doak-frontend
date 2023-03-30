import React, { useState } from "react";
import "./SigninPage.scss";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";

const SigninPage = () => {
  const [register, setRegister] = useState(false);

  return (
    <>
      <div className="signin_title">
        <h1>DOAK</h1>
        <button>x</button>
      </div>
      <div className="signin_options">
        <button className="signin_registerbtn">Register</button>
        <button className="signin_loginbtn">Log in</button>
      </div>
      <div>{register ? <RegisterPage /> : <LoginPage />}</div>
    </>
  );
};

export default SigninPage;

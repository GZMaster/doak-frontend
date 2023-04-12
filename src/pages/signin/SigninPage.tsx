import React, { useState } from "react";
import "./SigninPage.scss";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";

const SigninPage = () => {
  const [register, setRegister] = useState(false);

  return (
    <div className="signinpage">
      <header className="signin_title">
        <h1>DOAK</h1>
        <button>x</button>
      </header>
      <div className="signin_options">
        <button className="signin_registerbtn">Register</button>
        <button className="signin_loginbtn">Log in</button>
      </div>
      <div>{register ? <RegisterPage /> : <LoginPage />}</div>
    </div>
  );
};

export default SigninPage;

import React, { useState } from "react";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import "./AuthPage.scss";

const AuthPage = () => {
  const [authPage, setAuthPage] = useState("login");

  const onChangeAuthPage = (authPage: string) => {
    setAuthPage(authPage);
  };

  return (
    <div className="signinpage">
      <header className="signin_title">
        <h1>DOAK</h1>
        <button>x</button>
      </header>
      <div className="signin_options">
        <button
          className="signin_registerbtn"
          onClick={() => onChangeAuthPage("register")}
        >
          Register
        </button>
        <button
          className="signin_loginbtn"
          onClick={() => onChangeAuthPage("login")}
        >
          Log in
        </button>
      </div>
      <div>{authPage === "register" ? <RegisterPage /> : <LoginPage />}</div>
    </div>
  );
};

export default AuthPage;

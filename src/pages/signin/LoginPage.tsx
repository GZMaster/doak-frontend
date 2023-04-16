import React from "react";
import { InputFields } from "../../components/Main";
import "./AuthPage";

const LoginPage = () => {
  const forgotPassword = () => {
    console.log("forgot password");
  };

  return (
    <div className="loginpage">
      <form action="">
        <InputFields type="email" label="Email" placeholder="Email" />
        <InputFields type="string" label="Password" placeholder="Password" />
        <button onClick={forgotPassword}>Forgot password</button>

        <button>Log in</button>
      </form>
    </div>
  );
};

export default LoginPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputFields } from "../../lib/Main";
import ForgotPassModal from "../forgotpass/ForgotPassModal";
import "./AuthModal.scss";

interface props {
  isUserLoggedIn: boolean;
}

const LoginPage: React.FC<props> = ({ isUserLoggedIn }) => {
  const navigate = useNavigate();
  const [forgotPass, setForgotPass] = useState(false);

  const handleModal = () => {
    setForgotPass(false);
  };

  const handleLogin = () => {
    isUserLoggedIn = true;
    navigate("/account");
  };

  return (
    <>
      {!forgotPass ? (
        <div className="loginpage">
          <form action="">
            <InputFields type="email" label="Email" placeholder="Email" />
            <InputFields
              type="string"
              label="Password"
              placeholder="Password"
            />
            <button
              className="auth__forgot__pass"
              onClick={() => setForgotPass(true)}
            >
              Forgot password?
            </button>

            <button className="auth_continue_btn" onClick={handleLogin}>
              Log in
            </button>
          </form>
        </div>
      ) : (
        <ForgotPassModal isOpen={forgotPass} onClose={handleModal} />
      )}
    </>
  );
};

export default LoginPage;

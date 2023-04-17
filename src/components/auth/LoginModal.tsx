import React, { useState } from "react";
import { InputFields } from "../../lib/Main";
import ForgotPassModal from "../forgotpass/ForgotPassModal";
import "./AuthModal.scss";

const LoginPage = () => {
  const [forgotPass, setForgotPass] = useState(false);

  const handleModal = () => {
    setForgotPass(false);
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
            <button onClick={() => setForgotPass(true)}>Forgot password</button>

            <button>Log in</button>
          </form>
        </div>
      ) : (
        <ForgotPassModal isOpen={forgotPass} onClose={handleModal} />
      )}
    </>
  );
};

export default LoginPage;

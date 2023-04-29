import React, { useState, useContext } from "react";
import { AuthContext } from "../../services/AuthContext";
import { InputFields } from "../../lib/Main";
import ForgotPassModal from "../forgotpass/ForgotPassModal";
import "./AuthModal.scss";

const LoginPage = () => {
  const authContext = useContext(AuthContext);
  const [forgotPass, setForgotPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleModal = () => {
    setForgotPass(false);
  };

  const handleLogin = (email: string, password: string) => {
    authContext.login(email, password).then((res) => {
      console.log(res);
      // THIS WILL REDIRECT TO DASHBOARD IF ADMIN IS LOGGED IN
      // if (res) {
      //   navigate("/dashboard");
      // }
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleLogin(email, password);
  };

  return (
    <>
      {!forgotPass ? (
        <div className="loginpage">
          <form onSubmit={handleSubmit}>
            <InputFields
              type="email"
              label="Email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputFields
              type="password"
              label="Password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="auth__forgot__pass"
              onClick={() => setForgotPass(true)}
            >
              Forgot password?
            </button>

            <button className="auth_continue_btn" type="submit">
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

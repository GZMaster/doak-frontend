import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../services/AuthContext";
import { InputFields } from "../../lib/Main";
import ForgotPassModal from "../forgotpass/ForgotPassModal";
import "./AuthModal.scss";

interface LoginPageProps {
  onClose: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onClose }) => {
  const authContext = useContext(AuthContext);
  const [forgotPass, setForgotPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (authContext.isLoggedIn) {
      onClose();
    }
  }, [authContext.isLoggedIn, onClose]);

  const handleModal = () => {
    setForgotPass(false);
  };

  const handleLogin = (email: string, password: string) => {
    authContext.login(email, password).then((res) => {
      authContext.setIsLoggedIn(res);

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

import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../services/AuthContext";
import { InputFields } from "../../lib/Main";
import ToastBar from "../notification/ToastBar";
import ForgotPassModal from "../forgotpass/ForgotPassModal";
import "./AuthModal.scss";
import successicon from "../../assets/Images/icons/success-icon.svg";
import erroricon from "../../assets/Images/icons/error-icon.svg";

interface LoginPageProps {
  onClose: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onClose }) => {
  const authContext = useContext(AuthContext);
  const [forgotPass, setForgotPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToastBar, setToastBar] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  useEffect(() => {
    if (authContext.isLoggedIn) {
      onClose();
    }
  }, [authContext.isLoggedIn, onClose]);

  useEffect(() => {
    if (showToastBar) {
      setTimeout(() => {
        setToastBar(false);
      }, 3000);
    }
  }, [showToastBar]);

  const handleModal = () => {
    setForgotPass(false);
  };

  const handleLogin = (email: string, password: string) => {
    authContext
      .login(email, password)
      .then((res) => {
        authContext.setIsLoggedIn(res);
        setToastMessage("Login successful");
        setToastType("success");
        setToastBar(true);
      })
      .catch((err) => {
        setToastMessage(err.message);
        setToastType("error");
        setToastBar(true);
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
          {showToastBar && (
            <ToastBar
              message={toastMessage}
              type={toastType}
              icon={toastType === "success" ? successicon : erroricon}
            />
          )}
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

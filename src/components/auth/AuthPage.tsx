import React, { useState } from "react";
import Modal from "react-modal";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import "./AuthPage.scss";

interface AuthPageProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ isOpen, onClose }) => {
  const [authPage, setAuthPage] = useState("login");

  const onChangeAuthPage = (authPage: string) => {
    setAuthPage(authPage);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="authpage__modal">
      <div className="authpage">
        <header className="authpage_title">
          <h1>DOAK</h1>
          <button onClick={onClose}>x</button>
        </header>
        <div className="authpage_options">
          <button
            className="authpage_registerbtn"
            onClick={() => onChangeAuthPage("register")}
          >
            Register
          </button>
          <button
            className="authpage_loginbtn"
            onClick={() => onChangeAuthPage("login")}
          >
            Log in
          </button>
        </div>
        <div>{authPage === "register" ? <RegisterPage /> : <LoginPage />}</div>
        <div>
          <p>or</p>
        </div>
        <div className="authpage__footer">
          <button>Continue with Google</button>
        </div>
      </div>
    </Modal>
  );
};

export default AuthPage;

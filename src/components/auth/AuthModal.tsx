import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import RegisterModal from "./RegisterModal";
import LoginPage from "./LoginModal";
import "./AuthModal.scss";
import logo from "../../assets/Images/logo/logo.svg";
import cancel from "../../assets/Images/icons/Cancel.svg";
import google_icon from "../../assets/Images/icons/google.svg";
import activebar from "../../assets/Images/icons/active-bar.svg";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  isUserLoggedIn: boolean;
}

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  isUserLoggedIn,
}) => {
  const navigate = useNavigate();
  const [authModal, setAuthModal] = useState("login");

  const onChangeAuthModal = (authPage: string) => {
    setAuthModal(authPage);
  };

  useEffect(() => {
    if (isUserLoggedIn) {
      onClose();
      navigate("/account");
    }
  }, [isUserLoggedIn, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1000,
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          background: "transparent",
          border: "none",
          zIndex: 5,
          padding: 0,
        },
      }}
    >
      <div className="authmodal">
        <header className="authmodal_title">
          <img className="logo" src={logo} alt="Brand Name" />
          <button onClick={onClose}>
            <img src={cancel} alt="" />
          </button>
        </header>
        <div className="authmodal_options">
          <button
            className="authmodal_registerbtn"
            onClick={() => onChangeAuthModal("register")}
          >
            Register
            {authModal === "register" && <img src={activebar} alt="" />}
          </button>
          <button
            className="authmodal_loginbtn"
            onClick={() => onChangeAuthModal("login")}
          >
            Log in
            {authModal === "login" && <img src={activebar} alt="" />}
          </button>
        </div>
        {authModal === "register" ? (
          <RegisterModal isUserLoggedIn={isUserLoggedIn} />
        ) : (
          <LoginPage isUserLoggedIn={isUserLoggedIn} />
        )}
        <div>
          <p className="auth__or">or</p>
        </div>
        <button className="authmodal__footer">
          <img src={google_icon} alt="icon" /> Continue with Google
        </button>
      </div>
    </Modal>
  );
};

export default AuthModal;

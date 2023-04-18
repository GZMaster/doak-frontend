import React, { useState } from "react";
import Modal from "react-modal";
import RegisterModal from "./RegisterModal";
import LoginPage from "./LoginModal";
import "./AuthModal.scss";
import logo from "../../assets/Images/logo/logo.svg";
import cancel from "../../assets/Images/icons/Cancel.svg";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [authModal, setAuthModal] = useState("login");

  const onChangeAuthModal = (authPage: string) => {
    setAuthModal(authPage);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
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
          marginTop: "2%",
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
          </button>
          <button
            className="authmodal_loginbtn"
            onClick={() => onChangeAuthModal("login")}
          >
            Log in
          </button>
        </div>
        {authModal === "register" ? <RegisterModal /> : <LoginPage />}
        <div>
          <p>or</p>
        </div>
        <div className="authmodal__footer">
          <button>Continue with Google</button>
        </div>
      </div>
    </Modal>
  );
};

export default AuthModal;

import React, { useState } from "react";
import Modal from "react-modal";
import RegisterModal from "./RegisterModal";
import LoginPage from "./LoginModal";
import "./AuthModal.scss";

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
      className="modal"
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <div className="authmodal">
        <header className="authmodal_title">
          <h1>DOAK</h1>
          <button onClick={onClose}>x</button>
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

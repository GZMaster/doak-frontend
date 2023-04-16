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
    <Modal isOpen={isOpen} onRequestClose={onClose} className="modal">
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
        <div>
          {authModal === "register" ? <RegisterModal /> : <LoginPage />}
        </div>
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

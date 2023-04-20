import React, { useState } from "react";
import Modal from "react-modal";
import { InputFields } from "../../lib/Main";
import "./ForgotPassModal.scss";
import arrow from "../../assets/Images/icons/arrow-left.svg";
import logo from "../../assets/Images/logo/logo.svg";
interface ForgotPassModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ForgotPassModal: React.FC<ForgotPassModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState("step1");
  const [buttonText, setButtonText] = useState("Send Reset Code ");

  const onChangeStep = (stepvalue: string, buttontext: string) => {
    setStep(stepvalue);
    setButtonText(buttontext);
  };

  const step1 = () => {
    return (
      <form action="">
        <InputFields
          type="email"
          label="Email"
          placeholder="Email"
          required={true}
        />

        <button
          className="auth_continue_btn"
          onClick={() => onChangeStep("step2", "Reset Password")}
        >
          {buttonText}
        </button>
      </form>
    );
  };

  const step2 = () => {
    return (
      <form action="">
        <InputFields
          type="string"
          label={`Enter the Verification Code sent to EMAILTEXT`}
          placeholder="Verification Code"
          required={true}
        />

        <button
          className="auth_continue_btn"
          onClick={() => onChangeStep("step3", "Save New Password")}
        >
          {buttonText}
        </button>
      </form>
    );
  };

  const step3 = () => {
    return (
      <form action="">
        <InputFields
          type="string"
          label="New Password"
          placeholder="Enter Password"
        />
        <InputFields
          type="string"
          label="New Password Again"
          placeholder="Enter Password Again"
        />

        <button className="auth_continue_btn" onClick={onClose}>
          {buttonText}
        </button>
      </form>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          zIndex: 2000,
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
        },
      }}
    >
      <div className="forgotpassmodal">
        <header className="forgotpassmodal_title">
          <button className="forgot_back" onClick={onClose}>
            <img src={arrow} alt="" />
          </button>
          <img className="logo" src={logo} alt="Brand Name" />
        </header>
        <div className="forgotpassmodal__body">
          <h2>Reset your password</h2>
          <p>Enter your email address for password reset</p>
        </div>

        <>
          {step === "step1" && step1()}
          {step === "step2" && step2()}
          {step === "step3" && step3()}
        </>
      </div>
    </Modal>
  );
};

export default ForgotPassModal;

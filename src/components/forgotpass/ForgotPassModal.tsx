import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { AuthContext } from "../../services/AuthContext";
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
  const useAuthContext = React.useContext(AuthContext);
  const [step, setStep] = useState("step1");
  const [buttonText, setButtonText] = useState("Send Reset Code ");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  useEffect(() => {
    // get the token from local storage
    const token = localStorage.getItem("resetToken");

    // if token is present then change the step to step2
    if (token) {
      setOtp(token);
    }
  }, [localStorage]);

  const forgetPassword = (email: string) => {
    useAuthContext.forgotPassword(email).then((res) => {
      if (res) {
        onChangeStep("step2", "Reset Password");
      }
    });
  };

  const resetPassword = (
    password: string,
    passwordConfirm: string,
    restToken: string
  ) => {
    useAuthContext
      .resetPassword(password, passwordConfirm, restToken)
      .then((res) => {
        if (res) {
          return res;
        }
      });
  };

  const onChangeStep = (stepvalue: string, buttontext: string) => {
    setStep(stepvalue);
    setButtonText(buttontext);
  };

  const step1 = () => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      forgetPassword(email);
    };
    return (
      <form onSubmit={handleSubmit}>
        <InputFields
          type="email"
          label="Email"
          placeholder="Email"
          required={true}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="auth_continue_btn" type="submit">
          {buttonText}
        </button>
      </form>
    );
  };

  const step2 = () => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      onChangeStep("step3", "Save New Password");
    };

    return (
      <form onSubmit={handleSubmit}>
        <InputFields
          type="string"
          label={`Enter the Verification Code sent to EMAILTEXT`}
          placeholder="Verification Code"
          required={true}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button className="auth_continue_btn" type="submit">
          {buttonText}
        </button>
      </form>
    );
  };

  const step3 = () => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      resetPassword(password, passwordConfirm, otp);

      // clear the token from local storage
      localStorage.removeItem("resetToken");

      onClose();
    };

    return (
      <form onSubmit={handleSubmit}>
        <InputFields
          type="password"
          label="New Password"
          placeholder="Enter Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputFields
          type="password"
          label="New Password Again"
          placeholder="Enter Password Again"
          required
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />

        <button className="auth_continue_btn" type="submit">
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

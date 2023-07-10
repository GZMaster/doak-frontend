import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../services/AuthContext";
import { InputFields } from "../../lib/Main";
import ToastBar from "../notification/ToastBar";
import "./AuthModal.scss";
import successicon from "../../assets/Images/icons/success-icon.svg";
import erroricon from "../../assets/Images/icons/error-icon.svg";

interface RegisterModalProps {
  onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ onClose }) => {
  const authContext = useContext(AuthContext);
  const [step, setStep] = useState("step1");
  const [buttonText, setButtonText] = useState("Continue");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [otp, setOtp] = useState("");
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

  useEffect(() => {
    // Get otp from local storage
    const otpString = localStorage.getItem("otp");
    const otp = otpString && JSON.parse(otpString);

    setOtp(otp);
  }, [step]);

  const handleToast = (message: string, type: string) => {
    setToastMessage(message);
    setToastType(type);
    setToastBar(true);
  };

  const onChangeStep = (stepvalue: string) => {
    setStep(stepvalue);
  };

  const handleRegister = (
    name: string,
    email: string,
    password: string,
    passwordConfirm: string
  ) => {
    authContext.signup(name, email, password, passwordConfirm).then((res) => {
      if (res) {
        handleToast("Account Created Successfully", "success");
        setButtonText("Create Account");
        onChangeStep("step3");
      } else {
        handleToast("Something went wrong", "error");
      }
    });
  };

  const handleVerify = (otp: string) => {
    authContext.verify(otp).then((res) => {
      if (res) {
        handleToast("Account Verified Successfully", "success");

        // set is logged in to true after 2 seconds
        setTimeout(() => {
          authContext.setIsLoggedIn(true);
        }, 2000);
      } else {
        handleToast("Something went wrong", "error");
      }
    });
  };

  const step1 = () => {
    const handleContinue = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      localStorage.clear();

      setButtonText("Send Verificatin Code");
      onChangeStep("step2");
    };

    return (
      <form onSubmit={handleContinue}>
        <InputFields
          type="text"
          label="First Name"
          placeholder="First Name"
          required={true}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <InputFields
          type="text"
          label="Last Name"
          placeholder="Last Name"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <InputFields
          type="email"
          label="Email"
          placeholder="Email"
          required
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
    const handleContinue = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      handleRegister(
        `${firstName} ${lastName}`,
        email,
        password,
        passwordConfirm
      );
    };
    return (
      <form onSubmit={handleContinue}>
        <InputFields placeholder={email} disabled={true} />
        <InputFields
          type="password"
          placeholder="password"
          label="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputFields
          type="password"
          placeholder="password"
          label="Password again"
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

  const step3 = () => {
    const handleContinue = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      handleVerify(otp);
    };
    return (
      <form onSubmit={handleContinue}>
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

  return (
    <div className="registermodal">
      {showToastBar && (
        <ToastBar
          message={toastMessage}
          type={toastType}
          icon={toastType === "success" ? successicon : erroricon}
        />
      )}
      {step === "step1" && step1()}
      {step === "step2" && step2()}
      {step === "step3" && step3()}

      <div className="registermodal__footer">{/* PAGINATION GOES HERE */}</div>
    </div>
  );
};

export default RegisterModal;

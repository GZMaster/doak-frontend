import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputFields } from "../../lib/Main";
import "./AuthModal.scss";

interface props {
  isUserLoggedIn: boolean;
}

const RegisterModal: React.FC<props> = ({ isUserLoggedIn }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState("step1");
  const [buttonText] = useState("Continue");

  const onChangeStep = (stepvalue: string) => {
    setStep(stepvalue);
  };

  const handleRegister = () => {
    isUserLoggedIn;
    navigate("/account");
  };

  const step1 = () => {
    return (
      <form action="">
        <InputFields
          type="text"
          label="First Name"
          placeholder="First Name"
          required={true}
        />
        <InputFields
          type="text"
          label="Last Name"
          placeholder="Last Name"
          required
        />
        <InputFields type="email" label="Email" placeholder="Email" required />

        <button
          className="auth_continue_btn"
          onClick={() => onChangeStep("step2")}
        >
          {buttonText}
        </button>
      </form>
    );
  };

  const step2 = () => {
    return (
      <form action="">
        <InputFields placeholder={`EMAILTEXT`} disabled={true} />
        <InputFields type="string" placeholder="password" label="Password" />
        <InputFields
          type="string"
          placeholder="password"
          label="Password again"
        />

        <button
          className="auth_continue_btn"
          onClick={() => onChangeStep("step3")}
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
          label={`Enter the Verification Code sent to EMAILTEXT`}
          placeholder="Verification Code"
          required={true}
        />

        <button className="auth_continue_btn" onClick={handleRegister}>
          {buttonText}
        </button>
      </form>
    );
  };

  return (
    <div className="registermodal">
      {step === "step1" && step1()}
      {step === "step2" && step2()}
      {step === "step3" && step3()}

      <div className="registermodal__footer">{/* PAGINATION GOES HERE */}</div>
    </div>
  );
};

export default RegisterModal;

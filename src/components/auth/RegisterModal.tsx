import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../services/AuthContext";
import { InputFields } from "../../lib/Main";
import "./AuthModal.scss";

const RegisterModal = () => {
  const authContext = useContext(AuthContext);
  const [step, setStep] = useState("step1");
  const [buttonText, setButtonText] = useState("Continue");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [otp, setOtp] = useState("");

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
      console.log(res);
    });
  };

  const step1 = () => {
    const handleContinue = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
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
    const handleContinue = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setButtonText("Create Account");

      handleRegister(
        `${firstName} ${lastName}`,
        email,
        password,
        passwordConfirm
      );

      onChangeStep("step3");
    };
    return (
      <form onSubmit={handleContinue}>
        <InputFields placeholder={email} disabled={true} />
        <InputFields
          type="string"
          placeholder="password"
          label="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputFields
          type="string"
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
    };
    return (
      <form action="">
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
      {step === "step1" && step1()}
      {step === "step2" && step2()}
      {step === "step3" && step3()}

      <div className="registermodal__footer">{/* PAGINATION GOES HERE */}</div>
    </div>
  );
};

export default RegisterModal;

import React, { useState } from "react";
import { InputFields } from "../../components/Main";
import "./AuthPage.scss";

const RegisterPage = () => {
  const [step, setStep] = useState("step1");
  const [buttonText] = useState("Continue");

  const onChangeStep = (stepvalue: string) => {
    setStep(stepvalue);
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
        <InputFields type="text" label="Last Name" placeholder="Last Name" />
        <InputFields type="email" label="Email" placeholder="Email" />

        <button onClick={() => onChangeStep("step2")}>{buttonText}</button>
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

        <button onClick={() => onChangeStep("step3")}>{buttonText}</button>
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

        <button>{buttonText}</button>
      </form>
    );
  };

  return (
    <div className="registerpage">
      {step === "step1" && step1()}
      {step === "step2" && step2()}
      {step === "step3" && step3()}
    </div>
  );
};

export default RegisterPage;

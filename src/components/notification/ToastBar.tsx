import React from "react";
import { IToastBarProps } from "../../types/toastbar";
import "./ToastBar.scss";

const ToastBar = ({ message, type, icon, onclick }: IToastBarProps) => {
  return (
    <div className="toastbar">
      <div
        className={`toastbar__message toastbar__message--${type}`}
        onClick={onclick}
      >
        <img src={icon} alt="icon" />
        {message}
      </div>
    </div>
  );
};

export default ToastBar;

import React from "react";
import "./ToastBar.scss";

interface ToastBarProps {
  message: string;
  type: string;
  icon: string;
}

const ToastBar: React.FC<ToastBarProps> = ({ message, type, icon }) => {
  return (
    <div className="toastbar">
      <div className={`toastbar__message toastbar__message--${type}`}>
        <img src={icon} alt="icon" />
        {message}
      </div>
    </div>
  );
};

export default ToastBar;

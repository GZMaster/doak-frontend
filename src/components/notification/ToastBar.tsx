import React from "react";
import "./ToastBar.scss";

interface ToastBarProps {
  message: string;
  type: string;
}

const ToastBar: React.FC<ToastBarProps> = ({ message, type }) => {
  return (
    <div className="toastbar">
      <div className={`toastbar__message toastbar__message--${type}`}>
        <img src={`/assets/Images/icons/${type}-icon.svg`} alt="icon" />
        {message}
      </div> 
    </div>
  );
};

export default ToastBar;

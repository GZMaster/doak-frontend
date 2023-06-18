import React from "react";
import ToastBar from "../../components/notification/ToastBar";
import successicon from "../../assets/Images/icons/success-icon.svg";
import erroricon from "../../assets/Images/icons/error-icon.svg";

interface IHandleToast {
  status: string;
  message: string;
}

const HandleToast: React.FC<IHandleToast> = ({ status, message }) => {
  const [show, setShow] = React.useState(true);

  const handleClose = () => setShow(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {show && (
        <ToastBar
          type={status === "success" ? "success" : "error"}
          icon={status === "success" ? successicon : erroricon}
          message={message}
          onclick={handleClose}
        />
      )}
    </>
  );
};

export default HandleToast;

import React from "react";
import Modal from "react-modal";
import NotificationsMenu from "../../pages/account/NotificationsMenu";
import "./NotificationsMenu.scss";

interface props {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationsModal: React.FC<props> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1000,
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
          zIndex: 5,
          padding: 0,
        },
      }}
    >
      <NotificationsMenu />
    </Modal>
  );
};

export default NotificationsModal;

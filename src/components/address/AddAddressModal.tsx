import React from "react";
import Modal from "react-modal";
import { InputFields, TextFields } from "../../lib/Main";
import "./AddAddressModal.scss";
import Cancel from "../../assets/Images/icons/Cancel.svg";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleAddressSave: () => void;
}

const AddAddressModal: React.FC<AddressModalProps> = ({
  isOpen,
  onClose,
  handleAddressSave,
}) => {
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
          top: "55%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          border: "none",
          zIndex: 5,
          padding: 0,
        },
      }}
    >
      <div className="AddaddressModal">
        <div className="AddaddressModal__header">
          <h1>Add New Address</h1>
          <button onClick={onClose}>
            <img src={Cancel} alt="cancel button" />
          </button>
        </div>

        <div className="AddaddressModal__body">
          <form className="AddaddressModal__body__form">
            <InputFields label="Name" type="text" />
            <InputFields label="Phone Number" type="text" />
            <TextFields label="Address" type="text" />
            <InputFields label="City" type="text" />
            <InputFields label="State" type="text" />
          </form>
          <div className="AddaddressModal__body__btn">
            <button onClick={handleAddressSave}>Save Address</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddAddressModal;

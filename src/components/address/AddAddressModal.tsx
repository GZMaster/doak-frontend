import React from "react";
import Modal from "react-modal";
import { InputFields } from "../../lib/Main";
import "./AddressModal.scss";

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
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <div className="addressmodal">
        <div className="addressmodal__header">
          <h1>Add New Address</h1>
          <button onClick={onClose}>x</button>
        </div>

        <div className="addressmodal__body">
          <form className="addressmodal__body__form">
            <InputFields label="Name" type="text" />
            <InputFields label="Phone Number" type="text" />
            <InputFields label="Address" type="text" />
            <InputFields label="City" type="text" />
            <InputFields label="State" type="text" />

            <button onClick={handleAddressSave}>Save Address</button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default AddAddressModal;

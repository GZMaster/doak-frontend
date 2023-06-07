import React from "react";
import Modal from "react-modal";
import { InputFields, TextFields } from "../../lib/Main";
import "./AddAddressModal.scss";
import Cancel from "../../assets/Images/icons/Cancel.svg";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleAddressSave?: () => void;
}

const AddAddressModal: React.FC<AddressModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = React.useState<string>("");
  const [address, setAddress] = React.useState<string>("");
  const [city, setCity] = React.useState<string>("");
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");
  const [state, setState] = React.useState<string>("");
  // const [country, setCountry] = React.useState<string>("");
  // const [zipCode, setZipCode] = React.useState<string>("");

  const addAddress = async () => {
    // Get jwt Bear token from local storage
    const token = localStorage.getItem("jwt");

    const res = await fetch(
      `https://doakbackend.cyclic.app/api/v1/addresses`,
      // `http://localhost:3000/api/v1/addresses`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          address,
          city,
          phoneNumber,
          state,
          // country,
          // zipCode,
        }),
      }
    );

    const response = await res.json();

    if (response.status === "success") {
      onClose();
    }
  };

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
            <InputFields
              label="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <InputFields
              label="Phone Number"
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <TextFields
              label="Address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <InputFields
              label="City"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <InputFields
              label="State"
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </form>
          <div className="AddaddressModal__body__btn">
            <button onClick={() => addAddress()}>Save Address</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddAddressModal;

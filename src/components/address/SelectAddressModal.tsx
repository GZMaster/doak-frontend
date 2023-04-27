import React from "react";
import Modal from "react-modal";
import "./SelectAddressModal.scss";
import Cancel from "../../assets/Images/icons/Cancel.svg";

interface SelectAddressProps {
  handleAddressChange: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const address = [
  {
    name: "Omonaluse Ohkuehne",
    address: "1, Omonaluse Street, Omonaluse, Omonaluse",
    PhoneNo: "+2348012345678",
    id: 1,
  },
  {
    name: "Omonaluse Ohkuehne",
    address: "1, Omonaluse Street, Omonaluse, Omonaluse",
    PhoneNo: "+2348012345678",
    id: 2,
  },
];

const SelectAddress: React.FC<SelectAddressProps> = ({
  handleAddressChange,
  isOpen,
  onClose,
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
          top: "40%",
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
      <div className="selectaddressModal">
        <div className="selectaddressModal__header">
          <h1>Select Default Address</h1>
          <button onClick={onClose}>
            <img src={Cancel} alt="cancel button" />
          </button>
        </div>

        <div className="selectaddressModal__body">
          {address.map((item) => (
            <form className="selectaddressModal__body__field" key={item.id}>
              <input
                className="selectaddressModal__body__field__button"
                type="radio"
                id={item.address}
                name="address"
              />
              <label
                className="selectaddressModal__body__field__box"
                htmlFor={item.address}
              >
                <h2>{item.name}</h2>
                <p>{item.address}</p>
                <p>{item.PhoneNo}</p>
              </label>
            </form>
          ))}

          <div className="selectaddressModal__body__btn">
            <button onClick={handleAddressChange}>Save</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SelectAddress;

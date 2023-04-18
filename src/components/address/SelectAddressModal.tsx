import React from "react";
import Modal from "react-modal";
import "./AddressModal.scss";

interface SelectAddressProps {
  handleAddressChange: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const address = [
  {
    name: "Omonaluse Ohkuehne",
    address: "1, Omonaluse Street, Omonaluse, Omonaluse",
    id: 1,
  },
  {
    name: "Omonaluse Ohkuehne",
    address: "1, Omonaluse Street, Omonaluse, Omonaluse",
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
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <div className="selectaddress">
        <div className="selectaddress__header">
          <h1>Select Default Address</h1>
          <button>x</button>
        </div>

        <div className="selectaddress__body">
          {address.map((item) => (
            <form className="selectaddress__body__field" key={item.id}>
              <input type="radio" id={item.address} name="address" />
              <label
                className="selectaddress__body__field__box"
                htmlFor={item.address}
              >
                <h2>{item.name}</h2>
                <p>{item.address}</p>
              </label>
            </form>
          ))}

          <div className="selectaddress__body__btn">
            <button onClick={handleAddressChange}>Save</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SelectAddress;

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import backendURL from "../../api";
import "./SelectAddressModal.scss";
import Cancel from "../../assets/Images/icons/Cancel.svg";

interface SelectAddressProps {
  handleAddressChange: () => void;
  isOpen: boolean;
  onClose: () => void;
}

interface Address {
  userId?: string;
  name: string;
  address: string;
  city: string;
  phoneNumber: string;
  state: string;
  country: string;
  zipCode?: string;
  _id: string;
}

const SelectAddress: React.FC<SelectAddressProps> = ({
  handleAddressChange,
  isOpen,
  onClose,
}) => {
  const [selectAddress, setSelectedAddress] = useState<Address>();
  const [address, setAddress] = useState<Array<Address>>();

  const getDefaultAddress = async () => {
    // Get jwt Bear token from local storage
    const token = localStorage.getItem("jwt");

    const res = await fetch(`${backendURL}/api/v1/addresses/default`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await res.json();
    setSelectedAddress(response.data.address);
  };

  const getAddress = async () => {
    // Get jwt Bear token from local storage
    const token = localStorage.getItem("jwt");

    const res = await fetch(`${backendURL}/api/v1/addresses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await res.json();
    setAddress(response.data.addresses);
  };

  const setDefaultAddress = async (id: string) => {
    // Get jwt Bear token from local storage
    const token = localStorage.getItem("jwt");

    const res = await fetch(`${backendURL}/api/v1/addresses/default/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await res.json();

    if (response.status === "success") {
      handleAddressChange();
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const selectedAddress = document.querySelector(
      'input[name="address"]:checked'
    ) as HTMLInputElement;
    setDefaultAddress(selectedAddress.id);

    // console.log(selectedAddress.id);
  };

  useEffect(() => {
    getDefaultAddress();
    getAddress();
  }, []);

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

        <form className="selectaddressModal__body" onSubmit={handleSubmit}>
          {address &&
            address.map((item) => (
              <div className="selectaddressModal__body__field" key={item._id}>
                <input
                  className="selectaddressModal__body__field__button"
                  type="radio"
                  id={item._id}
                  name="address"
                  checked={item._id === selectAddress?._id}
                  onChange={() => setSelectedAddress(item)}
                />
                <label
                  className="selectaddressModal__body__field__box"
                  htmlFor={item._id}
                >
                  <h2>{item.name}</h2>
                  <p>
                    {item.address}, {item.city} City, {item.state} State
                  </p>
                  <p>{item.phoneNumber}</p>
                </label>
              </div>
            ))}

          <div className="selectaddressModal__body__btn">
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default SelectAddress;

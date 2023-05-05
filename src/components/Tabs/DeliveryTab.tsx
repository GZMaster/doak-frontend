import React, { useEffect, useState } from "react";
import AddAddressModal from "../address/AddAddressModal";
import "../address/AddressModal.scss";

const delivery = [
  {
    name: "Door Delivery",
    address: "To be delivered between Wenesday 22 Mar and Friday 26 Mar",
    id: 1,
    phone: "N2,500",
  },
  {
    name: "Pick Up",
    address:
      "Available for pick up between Wensday 22 Mar and Friday 26 Mar from 10:00am to 4pm.",
    id: 2,
    phone: "Free within opening hours",
  },
];

interface Props {
  handleTabClick: (key: number) => void;
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

const DeliveryTab: React.FC<Props> = ({ handleTabClick }) => {
  const [address, setAddress] = useState<Array<Address>>();
  const [addressModal, setAddressModal] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState("");

  useEffect(() => {
    getAddress();
  }, []);

  const closeModal = () => {
    setAddressModal(false);
  };

  const getAddress = async () => {
    // Get jwt Bear token from local storage
    const token = localStorage.getItem("jwt");

    const res = await fetch(
      `https://doakbackend.cyclic.app/api/v1/addresses`,
      // `http://localhost:3000/api/v1/addresses`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const response = await res.json();
    setAddress(response.data.addresses);
  };

  const setDefaultAddress = async (id: string) => {
    // Get jwt Bear token from local storage
    const token = localStorage.getItem("jwt");

    const res = await fetch(
      `https://doakbackend.cyclic.app/api/v1/addresses/default/${id}`,
      // `http://localhost:3000/api/v1/addresses/default/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const response = await res.json();

    if (response.status === "success") {
      handleTabClick(1);
    }
  };

  return (
    <>
      <AddAddressModal isOpen={addressModal} onClose={closeModal} />
      <div className="selectaddress">
        <div className="selectaddress__header">
          <h1>Select Address</h1>
        </div>

        <div className="selectaddress__body">
          {address &&
            address.map((item) => (
              <div className="selectaddress__body__field" key={item._id}>
                <input
                  type="radio"
                  id={item.address}
                  name="address"
                  onClick={() => setSelectedAddress(item._id)}
                />
                <form>
                  <label
                    className="selectaddress__body__field__box"
                    htmlFor={item.address}
                  >
                    <h2>{item.name}</h2>
                    <p>{item.address}</p>
                    <p>{item.phoneNumber}</p>
                  </label>
                  <button>Edit</button>
                </form>
              </div>
            ))}

          <div
            className="selectaddress__body__btn"
            onClick={() => setAddressModal(true)}
          >
            + Add New Address
          </div>
        </div>
      </div>
      <div className="selectaddress">
        <div className="selectaddress__header">
          <h1>Select Delivery Method</h1>
        </div>

        <div className="selectaddress__body">
          {delivery.map((item) => (
            <div className="selectaddress__body__field" key={item.id}>
              <input type="radio" id={item.address} name="address" />
              <form>
                <label
                  className="selectaddress__body__field__box"
                  htmlFor={item.address}
                >
                  <h2>{item.name}</h2>
                  <p>{item.address}</p>
                  <p style={{ color: "#ff3426", fontWeight: "600" }}>
                    {item.phone}
                  </p>
                </label>
              </form>
            </div>
          ))}

          <div
            style={{ textAlign: "center" }}
            className="auth_continue_btn"
            onClick={() => setDefaultAddress(selectedAddress)}
          >
            Proceed to Summary
          </div>
        </div>
      </div>
    </>
  );
};

export default DeliveryTab;

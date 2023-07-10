import React, { useEffect, useState } from "react";
import { useLoading } from "../../services/LoadingContext";
import { HandleToast } from "../../lib/Main";
import backendURL from "../../api";
import AddAddressModal from "../address/AddAddressModal";
import { IDeliveryTab, IAddress, IDelivery } from "../../types/checkout";
import "../address/AddressModal.scss";

const Delivery = [
  {
    type: "delivery",
    text: "To be delivered between 5 working days",
    id: 1,
    price: 1500,
  },
  {
    type: "pickup",
    text: "Available for pick up between Monday to Sunday",
    id: 2,
    price: 0,
  },
];

const DeliveryTab: React.FC<IDeliveryTab> = ({
  handleTabClick,
  setSelectedDelivery,
}) => {
  const { isLoading, setIsLoading, LoadingComponent } = useLoading();
  const [address, setAddress] = useState<Array<IAddress>>();
  const [addressModal, setAddressModal] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [toastState, setToastState] = useState("");
  const [delivery, setDelivery] = useState<Array<IDelivery>>(Delivery);

  useEffect(() => {
    setIsLoading(true);
    getAddress();
    getDelivery();
  }, []);

  const closeModal = () => {
    setAddressModal(false);
    getAddress();
  };

  const getDelivery = async () => {
    // Get jwt Bear token from local storage
    const token = localStorage.getItem("jwt");

    const res = await fetch(`${backendURL}/api/v1/deliveries`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await res.json();

    if (response.status === "success") {
      setDelivery(response.data.deliveries);
    }

    setIsLoading(false);
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
    setIsLoading(false);
  };

  const setDefaultAddress = async (id: string) => {
    setIsLoading(true);
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
      setToastState("success");

      setTimeout(() => {
        handleTabClick(1);
      }, 2000);
    } else {
      setToastState("error");
    }

    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <LoadingComponent />}
      {toastState && (
        <HandleToast
          status={toastState}
          message={
            toastState === "success"
              ? "default addressed saved"
              : "Error setting address"
          }
        />
      )}
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
              <input
                type="radio"
                id={item.type}
                name="delivery"
                onClick={() => setSelectedDelivery(item)}
              />
              <form>
                <label
                  className="selectaddress__body__field__box"
                  htmlFor={item.type}
                >
                  <h2>{item.type}</h2>
                  <p>{item.text}</p>
                  <p style={{ color: "#ff3426", fontWeight: "600" }}>
                    {item.price}
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

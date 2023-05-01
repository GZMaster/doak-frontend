import React from "react";
import "../address/AddressModal.scss";

const address = [
  {
    name: "Omonaluse Ohkuehne",
    address: "1, Omonaluse Street, Omonaluse, Omonaluse",
    id: 1,
    phone: "+2348180281937",
  },
  {
    name: "Chukwufumnanya Ochei",
    address:
      "No 5, Emerald street Suncity Estate, Ikate, Lekki-Ajah, Oyo State",
    id: 2,
    phone: "+2349030383868",
  },
];
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

const DeliveryTab: React.FC<Props> = ({ handleTabClick }) => {
  return (
    <>
      <div className="selectaddress">
        <div className="selectaddress__header">
          <h1>Select Address</h1>
        </div>

        <div className="selectaddress__body">
          {address.map((item) => (
            <div className="selectaddress__body__field" key={item.id}>
              <input type="radio" id={item.address} name="address" />
              <form>
                <label
                  className="selectaddress__body__field__box"
                  htmlFor={item.address}
                >
                  <h2>{item.name}</h2>
                  <p>{item.address}</p>
                  <p>{item.phone}</p>
                </label>
                <button>Edit</button>
              </form>
            </div>
          ))}

          <div className="selectaddress__body__btn">+ Add New Address</div>
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
            onClick={() => handleTabClick(1)}
          >
            Proceed to Summary
          </div>
        </div>
      </div>
    </>
  );
};

export default DeliveryTab;

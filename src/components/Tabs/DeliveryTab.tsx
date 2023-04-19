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
    name: "Omonaluse Ohkuehne",
    address: "1, Omonaluse Street, Omonaluse, Omonaluse",
    id: 2,
    phone: "+2348180281937",
  },
];

const DeliveryTab = () => {
  return (
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
  );
};

export default DeliveryTab;

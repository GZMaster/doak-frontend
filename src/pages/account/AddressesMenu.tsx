import React, { useEffect, useState } from "react";
import AddAddressModal from "../../components/address/AddAddressModal";
import "./AccountPage.scss";
import trash from "../../assets/Images/icons/trash.svg";

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

const AddressesMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [addresses, setAddresses] = useState<Array<Address>>();

  useEffect(() => {
    getAddresses();
  }, []);

  const getAddresses = async () => {
    const response = await fetch(
      "https://doakbackend.cyclic.app/api/v1/addresses",
      // "http://localhost:3000/api/v1/addresses",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );

    const data = await response.json();

    const addresses = data.data.addresses;

    if (data.status === "success") {
      setAddresses(addresses);
    }
  };

  const deleteAddress = async (id: string) => {
    const response = await fetch(
      `https://doakbackend.cyclic.app/api/v1/addresses/${id}`,
      // `http://localhost:3000/api/v1/addresses/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );

    const data = await response.json();

    if (data.status === "success") {
      getAddresses();
    }
  };

  const handleAddressSave = () => {
    setIsOpen(false);
  };

  return (
    <div className="addressesmenu">
      {isOpen && (
        <AddAddressModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          handleAddressSave={handleAddressSave}
        />
      )}

      <div className="addressesmenu_header">
        <h3>Saved Addresses</h3>
      </div>

      <div className="addressesmenu_body">
        {addresses &&
          addresses.map((address) => (
            <div className="addressesmenu_address" key={address._id}>
              <div className="addressesmenu_address_container">
                <div className="addressesmenu_detials">
                  <h4>{address.name}</h4>
                  <p>{address.address}</p>
                  <p>{address.phoneNumber}</p>
                </div>

                <div className="addressesmenu_address_actions">
                  {/* <button className="edit">Edit</button> */}
                  <button
                    className="delete"
                    onClick={() => deleteAddress(address._id)}
                  >
                    <img src={trash} alt="trashbutton" />
                  </button>
                </div>
              </div>
            </div>
          ))}

        <div className="addressesmenu_addaddress">
          <button onClick={() => setIsOpen(true)}>+ Add New Address</button>
        </div>
      </div>
    </div>
  );
};

export default AddressesMenu;

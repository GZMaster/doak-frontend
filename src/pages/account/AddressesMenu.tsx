import React, { useEffect, useState } from "react";
import backendURL from "../../api";
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

interface MenuProps {
  setIsLoading: (value: boolean) => void;
}

const AddressesMenu: React.FC<MenuProps> = ({ setIsLoading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [addresses, setAddresses] = useState<Array<Address>>();

  useEffect(() => {
    setIsLoading(true);
    getAddresses();
  }, []);

  const getAddresses = async () => {
    const response = await fetch(`${backendURL}/api/v1/addresses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });

    const data = await response.json();

    const addresses = data.data.addresses;

    if (data.status === "success") {
      setAddresses(addresses);
    }

    setIsLoading(false);
  };

  const deleteAddress = async (id: string) => {
    setIsLoading(true);
    const response = await fetch(`${backendURL}/api/v1/addresses/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });

    const data = await response.json();

    if (data.status === "success") {
      getAddresses();
    }

    setIsLoading(false);
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

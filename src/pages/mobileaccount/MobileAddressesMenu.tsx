import React, { useEffect, useState } from "react";
import AddAddressModal from "../../components/address/AddAddressModal";
import "./MobileAccountPage.scss";
import backbtn from "../../assets/Images/icons/backbtn.svg";

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

interface MobileAddressesMenuProps {
  handleBack: () => void;
}

const MobileAddressesMenu: React.FC<MobileAddressesMenuProps> = ({
  handleBack,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);

  useEffect(() => {
    getAddresses();
  }, []);

  const getAddresses = async () => {
    const response = await fetch(
      // "https://doakbackend.cyclic.app/api/v1/addresses",
      "http://localhost:3000/api/v1/addresses",
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

  const handleAddressSave = () => {
    setIsOpen(false);
  };

  return (
    <div className="mobileaddressesmenu">
      {isOpen && (
        <AddAddressModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          handleAddressSave={handleAddressSave}
        />
      )}

      <div className="mobileaddressesmenu_header">
        <button onClick={handleBack}>
          <img src={backbtn} alt="back" />
        </button>
        <h1>Saved Addresses</h1>
      </div>

      <div className="mobileaddressesmenu_body">
        {addresses &&
          addresses.map((address) => (
            <div className="mobileaddressesmenu_address" key={address._id}>
              <div className="mobileaddressesmenu_address_container">
                <div className="mobileaddressesmenu_detials">
                  <h4>{address.name}</h4>
                  <p>{address.address}</p>
                  <p>{address.phoneNumber}</p>
                </div>

                <div className="mobileaddressesmenu_address_actions">
                  {/* <button className="edit">Edit</button> */}
                  <button className="delete">Delete</button>
                </div>
              </div>
            </div>
          ))}

        <div className="mobileaddressesmenu_addaddress">
          <button onClick={() => setIsOpen(true)}>+ Add New Address</button>
        </div>
      </div>
    </div>
  );
};

export default MobileAddressesMenu;

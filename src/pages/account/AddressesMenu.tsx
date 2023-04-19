import React from "react";
import AddAddressModal from "../../components/address/AddAddressModal";
import "./AccountPage.scss";

const addresses = [
  {
    id: 1,
    title: "Home",
    address: "1234 Main St, New York, NY 10001",
    phonenumber: "123-456-7890",
  },
  {
    id: 2,
    title: "Work",
    address: "1234 Main St, New York, NY 10001",
    phonenumber: "123-456-7890",
  },
];

const AddressesMenu = () => {
  const [isOpen, setIsOpen] = React.useState(false);

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
        <h3>Addresses</h3>
      </div>

      <div className="addressesmenu_body">
        {addresses.map((address) => (
          <div className="addressesmenu_address" key={address.id}>
            <div className="addressesmenu_detials">
              <h4>{address.title}</h4>
              <p>{address.address}</p>
              <p>{address.phonenumber}</p>
            </div>

            <div className="addressesmenu_address_actions">
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </div>
        ))}

        <div className="addressesmenu_addaddress">
          <button>Add Address</button>
        </div>
      </div>
    </div>
  );
};

export default AddressesMenu;

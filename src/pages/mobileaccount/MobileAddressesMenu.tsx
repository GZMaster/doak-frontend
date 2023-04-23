import React from "react";
import AddAddressModal from "../../components/address/AddAddressModal";
import "./MobileAccountPage.scss";
import backbtn from "../../assets/Images/icons/backbtn.svg";

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

interface MobileAddressesMenuProps {
  handleBack: () => void;
}

const MobileAddressesMenu: React.FC<MobileAddressesMenuProps> = ({
  handleBack,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

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
        {addresses.map((address) => (
          <div className="mobileaddressesmenu_address" key={address.id}>
            <div className="mobileaddressesmenu_address_container">
              <div className="mobileaddressesmenu_detials">
                <h4>{address.title}</h4>
                <p>{address.address}</p>
                <p>{address.phonenumber}</p>
              </div>

              <div className="mobileaddressesmenu_address_actions">
                <button className="edit">Edit</button>
                <button className="delete">Delete</button>
              </div>
            </div>
          </div>
        ))}

        <div className="mobileaddressesmenu_addaddress">
          <button
          // onClick={() => setIsOpen(true)}
          >
            + Add New Address
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileAddressesMenu;

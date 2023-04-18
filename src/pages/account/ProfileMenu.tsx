import React, { useState } from "react";
import { InputFields } from "../../lib/Main";
import SelectAddress from "../../components/address/SelectAddressModal";
import "./AccountPage.scss";

const ProfileMenu = () => {
  const [changeAddress, setChangeAddress] = useState(false);

  const handleAddressChange = () => {
    setChangeAddress(!changeAddress);
  };

  return (
    <div className="profilemenu">
      {changeAddress && (
        <SelectAddress
          handleAddressChange={handleAddressChange}
          isOpen={changeAddress}
          onClose={handleAddressChange}
        />
      )}

      <div className="profilemenu__header">
        <h1>Profile Settings</h1>
      </div>

      <div className="profilemenu__body">
        <div className="profilemenu__body__field">
          <InputFields
            label="First Name"
            placeholder="Enter First Name"
            type="string"
            value="Users First Name"
          />
          <InputFields
            label="Last Name"
            placeholder="Enter Last Name"
            type="string"
            value="Users Last name"
          />
        </div>
        <div className="profilemenu__body__field">
          <InputFields
            label="Email"
            placeholder="Enter Email"
            type="email"
            value="Users Email"
          />
          <InputFields
            label="Phone Number"
            placeholder="Enter Phone Number"
            type="string"
            value="Users Phone Number"
          />
        </div>

        <div className="profilemenu__address__field">
          <h2>Default Address</h2>
          <div className="profilemenu__address__field__box">
            <div>
              <h2>Omonaluse Ohkuehne</h2>
              <p>1, Omonaluse Street, Omonaluse, Omonaluse</p>
            </div>
            <div>
              <button onClick={handleAddressChange}>Change</button>
            </div>
          </div>
        </div>

        <div className="profilemenu__body__btn">
          <button>Update</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;

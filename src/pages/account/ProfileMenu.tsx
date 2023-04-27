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
          />
          <InputFields
            label="Last Name"
            placeholder="Enter Last Name"
            type="string"
          />
        </div>
        <div className="profilemenu__body__field">
          <InputFields label="Email" placeholder="Enter Email" type="email" />
          <InputFields
            label="Phone Number"
            placeholder="Enter Phone Number"
            type="string"
          />
        </div>

        <div className="profilemenu__address__field">
          <h2>Default Address</h2>
          <div className="profilemenu__address__field__box">
            <div className="profilemenu__address__field__box_address">
              <h2>Omonaluse Ohkuehne</h2>
              <p>1, Omonaluse Street, Omonaluse, Omonaluse</p>
            </div>
            <div className="profilemenu__address__field__box_btn">
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

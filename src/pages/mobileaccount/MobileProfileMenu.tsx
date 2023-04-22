import React, { useState } from "react";
import { InputFields } from "../../lib/Main";
import SelectAddress from "../../components/address/SelectAddressModal";
import "./MobileAccountPage.scss";

interface MobileProfilemenuProps {
  handleBack: () => void;
}

const MobileProfilemenu: React.FC<MobileProfilemenuProps> = ({
  handleBack,
}) => {
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

      <div className="mobileprofilemenu__header">
        <button onClick={handleBack}>BACK</button>
        <h1>Profile Settings</h1>
      </div>

      <div className="mobileprofilemenu__body">
        <div className="mobileprofilemenu__body__field">
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
        <div className="mobileprofilemenu__body__field">
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

        <div className="mobileprofilemenu__address__field">
          <h2>Default Address</h2>
          <div className="mobileprofilemenu__address__field__box">
            <div className="mobileprofilemenu__address__field__box_address">
              <h2>Omonaluse Ohkuehne</h2>
              <p>1, Omonaluse Street, Omonaluse, Omonaluse</p>
            </div>
            <div className="mobileprofilemenu__address__field__box_btn">
              <button
              // onClick={handleAddressChange}
              >
                Change
              </button>
            </div>
          </div>
        </div>

        <div className="mobileprofilemenu__body__btn">
          <button>Update</button>
        </div>
      </div>
    </div>
  );
};

export default MobileProfilemenu;

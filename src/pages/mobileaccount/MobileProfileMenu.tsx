import React, { useState } from "react";
import { InputFields } from "../../lib/Main";
import SelectAddress from "../../components/address/SelectAddressModal";
import "./MobileAccountPage.scss";
import backbtn from "../../assets/Images/icons/backbtn.svg";

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
    <div className="mobileprofilemenu">
      {changeAddress && (
        <SelectAddress
          handleAddressChange={handleAddressChange}
          isOpen={changeAddress}
          onClose={handleAddressChange}
        />
      )}

      <div className="mobileprofilemenu__header">
        <button onClick={handleBack}>
          <img src={backbtn} alt="back" />
        </button>
        <h1>Profile Settings</h1>
      </div>

      <div className="mobileprofilemenu__body">
        <div className="mobileprofilemenu__body__field">
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
        <div className="mobileprofilemenu__body__field">
          <InputFields label="Email" placeholder="Enter Email" type="email" />
          <InputFields
            label="Phone Number"
            placeholder="Enter Phone Number"
            type="string"
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
              <button onClick={handleAddressChange}>Change</button>
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

import React, { useEffect, useState } from "react";
import { InputFields } from "../../lib/Main";
import SelectAddress from "../../components/address/SelectAddressModal";
import "./AccountPage.scss";

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

const ProfileMenu = () => {
  const jwt = localStorage.getItem("jwt");
  const [changeAddress, setChangeAddress] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState<Address>();

  useEffect(() => {
    getUser();
    getDefaultAddress();
  }, []);

  const getUser = () => {
    // Get user from local storage
    const userString = localStorage.getItem("user");
    const user = userString && JSON.parse(userString);

    const { name, phoneNumber, email } = user;

    setFirstName(name.split(" ")[0]);
    setLastName(name.split(" ")[1]);
    setPhoneNumber(phoneNumber);
    setEmail(email);
  };

  const getDefaultAddress = async () => {
    const res = await fetch(
      `https://doakbackend.cyclic.app/api/v1/addresses/default`,
      // `http://localhost:3000/api/v1/addresses/default`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    const response = await res.json();

    setAddress(response.data.addressData);
  };

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
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <InputFields
            label="Last Name"
            placeholder="Enter Last Name"
            type="string"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="profilemenu__body__field">
          <InputFields
            label="Email"
            placeholder="Enter Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputFields
            label="Phone Number"
            placeholder="Enter Phone Number"
            type="string"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className="profilemenu__address__field">
          <h2>Default Address</h2>
          {address && (
            <div className="profilemenu__address__field__box">
              <div className="profilemenu__address__field__box_address">
                <h2>{address.name}</h2>
                <p>
                  {address.address}, {address.city} City, {address.state} State
                </p>
                <p>{address.phoneNumber}</p>
              </div>
              <div className="profilemenu__address__field__box_btn">
                <button onClick={handleAddressChange}>Change</button>
              </div>
            </div>
          )}
        </div>

        <div className="profilemenu__body__btn">
          <button>Update</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;

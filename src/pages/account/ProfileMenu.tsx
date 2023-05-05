import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../services/AuthContext";
import { InputFields } from "../../lib/Main";
import Loading from "../../components/Loader/Loading";
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
  const userString = localStorage.getItem("user");
  const user = userString && JSON.parse(userString);

  const { setIsLoggedIn } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [changeAddress, setChangeAddress] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState<Address>();

  useEffect(() => {
    setIsLoading(true);
    getUser();
    getDefaultAddress();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const updateUser = async () => {
    setIsLoading(true);

    const res = await fetch(
      `https://doakbackend.cyclic.app/api/v1/users/updateMe`,
      // `http://localhost:3000/api/v1/users/updateMe`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`,
          phoneNumber,
          email,
        }),
      }
    );

    const response = await res.json();

    if (response.status === "success") {
      setIsLoggedIn(false);
      setIsLoading(false);
      alert("User updated successfully");
    } else {
      setIsLoading(false);
      alert("User update failed");
    }
  };

  const getUser = () => {
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

  const handleUpdate = () => {
    updateUser();
  };

  return (
    <div className="profilemenu">
      {isLoading && <Loading />}
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
          <button onClick={handleUpdate}>Update</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;

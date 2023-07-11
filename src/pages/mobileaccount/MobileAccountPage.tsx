import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../services/LoadingContext";
import MobileProfilemenu from "./MobileProfileMenu";
import MobileOrdersMenu from "./MobileOrdersMenu";
import MobileNotificationsMenu from "./MobileNotificationsMenu";
import MobileAddressesMenu from "./MobileAddressesMenu";
import MobileVouchersMenu from "./MobileVouchersMenu";
import MobileRateUsMenu from "./MobileRateUsMenu";
import MobileHelpMenu from "./MobileHelpMenu";
import "./MobileAccountPage.scss";
import profileicon from "../../assets/Images/icons/profileicon.svg";
import ordersicon from "../../assets/Images/icons/ordersicon.svg";
import notificationicon from "../../assets/Images/icons/notificationicon.svg";
import addressicon from "../../assets/Images/icons/addressicon.svg";
import vouchericon from "../../assets/Images/icons/vouchericon.svg";
import rateicon from "../../assets/Images/icons/rateicon.svg";
import helpicon from "../../assets/Images/icons/helpicon.svg";
import { AuthContext } from "../../services/AuthContext";

const sidbaritems = [
  {
    icon: profileicon,
    text: "Profile",
  },
  {
    icon: ordersicon,
    text: "Orders",
  },
  {
    icon: notificationicon,
    text: "Notifications",
  },
  {
    icon: addressicon,
    text: "Addresses",
  },
  {
    icon: vouchericon,
    text: "Vouchers",
  },
];

const sidbaritems2 = [
  {
    icon: rateicon,
    text: "Rate Doak Services",
  },
  {
    icon: helpicon,
    text: "Help Center",
  },
];

const MobileAccountPage = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const { isLoading, setIsLoading, LoadingComponent } = useLoading();
  const [activeMenu, setActiveMenu] = useState("menu");
  const [userNames, setUserNames] = useState("");

  useEffect(() => {
    setIsLoading(true);
    getUserNames();
  }, []);

  const getUserNames = () => {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    if (user) {
      const { name } = user;
      setUserNames(name);
    }

    setIsLoading(false);

    return;
  };

  const onMenuChange = (e: string) => {
    setActiveMenu(e);
  };

  const handleLogout = async () => {
    const logUserOut = await logout();

    if (logUserOut) {
      navigate("/");
    } else {
      navigate("/account");
    }
  };

  const handleBack = () => {
    setActiveMenu("menu");
  };

  return (
    <>
      {isLoading && <LoadingComponent />}
      <div className="mobileaccountpage__content">
        {activeMenu === "menu" && (
          <div className="mobileaccountpage__sidebar">
            <div className="mobileaccountpage__sidebar__title">
              <h3>{userNames}</h3>
            </div>
            <div className="mobileaccountpage__sidebar__section">
              {sidbaritems.map((item, index) => (
                <button
                  className="mobileaccountpage__sidebar_item"
                  key={index}
                  onClick={() => onMenuChange(item.text)}
                >
                  <span className="mobileaccountpage__sidebar_item__icon">
                    <img src={item.icon} alt="" />
                  </span>
                  <span className="mobileaccountpage__sidebar__notification">
                    <img src="profilelogo" alt="" />
                  </span>
                  <span className="mobileaccountpage__sidebar_item__text">
                    {item.text}
                  </span>
                </button>
              ))}
            </div>

            <div className="mobileaccountpage__sidebar__section">
              {sidbaritems2.map((item, index) => (
                <button
                  className="mobileaccountpage__sidebar_item"
                  key={index}
                  onClick={() => onMenuChange(item.text)}
                >
                  <span className="mobileaccountpage__sidebar_item__icon">
                    <img src={item.icon} alt="" />
                  </span>
                  <span className="mobileaccountpage__sidebar_item__text">
                    {item.text}
                  </span>
                </button>
              ))}
            </div>

            <div className="mobileaccountpage__sidebar__section">
              <button
                className="mobileaccountpage__sidebar_logout"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </div>
          </div>
        )}
        {activeMenu === "Profile" && (
          <MobileProfilemenu
            handleBack={handleBack}
            setIsLoading={setIsLoading}
          />
        )}
        {activeMenu === "Orders" && (
          <MobileOrdersMenu
            handleBack={handleBack}
            setIsLoading={setIsLoading}
          />
        )}
        {activeMenu === "Notifications" && (
          <MobileNotificationsMenu
            handleBack={handleBack}
            setIsLoading={setIsLoading}
          />
        )}
        {activeMenu === "Addresses" && (
          <MobileAddressesMenu
            handleBack={handleBack}
            setIsLoading={setIsLoading}
          />
        )}
        {activeMenu === "Vouchers" && (
          <MobileVouchersMenu
            handleBack={handleBack}
            setIsLoading={setIsLoading}
          />
        )}
        {activeMenu === "Rate Doak Services" && (
          <MobileRateUsMenu
            handleBack={handleBack}
            setIsLoading={setIsLoading}
          />
        )}
        {activeMenu === "Help Center" && (
          <MobileHelpMenu handleBack={handleBack} setIsLoading={setIsLoading} />
        )}
      </div>
    </>
  );
};

export default MobileAccountPage;

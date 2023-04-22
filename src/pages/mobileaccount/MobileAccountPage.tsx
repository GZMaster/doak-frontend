import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [activeMenu, setActiveMenu] = useState("menu");

  const onMenuChange = (e: string) => {
    setActiveMenu(e);
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleBack = () => {
    setActiveMenu("menu");
  };

  return (
    <>
      <div className="mobileaccountpage__content">
        {activeMenu === "menu" && (
          <div className="mobileaccountpage__sidebar">
            <div className="mobileaccountpage__sidebar__title">
              My Doak Account
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
          <MobileProfilemenu handleBack={handleBack} />
        )}
        {activeMenu === "Orders" && (
          <MobileOrdersMenu handleBack={handleBack} />
        )}
        {activeMenu === "Notifications" && (
          <MobileNotificationsMenu handleBack={handleBack} />
        )}
        {activeMenu === "Addresses" && (
          <MobileAddressesMenu handleBack={handleBack} />
        )}
        {activeMenu === "Vouchers" && (
          <MobileVouchersMenu handleBack={handleBack} />
        )}
        {activeMenu === "Rate Doak Services" && (
          <MobileRateUsMenu handleBack={handleBack} />
        )}
        {activeMenu === "Help Center" && (
          <MobileHelpMenu handleBack={handleBack} />
        )}
      </div>
    </>
  );
};

export default MobileAccountPage;

import React from "react";
import { useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import OrdersMenu from "./OrdersMenu";
import NotificationsMenu from "./NotificationsMenu";
import AddressesMenu from "./AddressesMenu";
import VouchersMenu from "./VouchersMenu";
import RateUsMenu from "./RateUsMenu";
import HelpMenu from "./HelpMenu";
import "./AccountPage.scss";
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

const AccountPage = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = React.useState("Profile");

  const onMenuChange = (e: string) => {
    setActiveMenu(e);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="accountpage">
      <div className="accountpage__sidebar">
        <div className="accountpage__sidebar__title">My Doak Account</div>
        <div className="accountpage__sidebar__section">
          {sidbaritems.map((item, index) => (
            <button
              className="accountpage__sidebar_item"
              key={index}
              onClick={() => onMenuChange(item.text)}
            >
              <span className="accountpage__sidebar_item__icon">
                <img src={item.icon} alt="" />
              </span>
              <span className="accountpage__sidebar__notification">
                <img src="profilelogo" alt="" />
              </span>
              <span className="accountpage__sidebar_item__text">
                {item.text}
              </span>
            </button>
          ))}
        </div>

        <div className="accountpage__sidebar__section">
          {sidbaritems2.map((item, index) => (
            <button
              className="accountpage__sidebar_item"
              key={index}
              onClick={() => onMenuChange(item.text)}
            >
              <span className="accountpage__sidebar_item__icon">
                <img src={item.icon} alt="" />
              </span>
              <span className="accountpage__sidebar_item__text">
                {item.text}
              </span>
            </button>
          ))}
        </div>

        <div className="accountpage__sidebar__section">
          <button className="accountpage__sidebar_logout">Log Out</button>
        </div>
      </div>

      <div className="accountpage__content">
        {activeMenu === "Profile" && <ProfileMenu />}
        {activeMenu === "Orders" && <OrdersMenu />}
        {activeMenu === "Notifications" && <NotificationsMenu />}
        {activeMenu === "Addresses" && <AddressesMenu />}
        {activeMenu === "Vouchers" && <VouchersMenu />}
        {activeMenu === "Rate Doak Services" && <RateUsMenu />}
        {activeMenu === "Help Center" && <HelpMenu />}
      </div>
    </div>
  );
};

export default AccountPage;

import React from "react";
import ProfileMenu from "./ProfileMenu";
import OrdersMenu from "./OrdersMenu";
import NotificationsMenu from "./NotificationsMenu";
import AddressesMenu from "./AddressesMenu";
import VouchersMenu from "./VouchersMenu";
import RateUsMenu from "./RateUsMenu";
import HelpMenu from "./HelpMenu";
import "./AccountPage.scss";

const sidbaritems = [
  {
    icon: "profilelogo",
    text: "Profile",
  },
  {
    icon: "orderlogo",
    text: "Orders",
  },
  {
    icon: "notificationlogo",
    text: "Notifications",
  },
  {
    icon: "Addresslogo",
    text: "Addresses",
  },
  {
    icon: "voucherlogo",
    text: "Vouchers",
  },
];

const sidbaritems2 = [
  {
    icon: "rateuslogo",
    text: "Rate Doak Services",
  },
  {
    icon: "helplogo",
    text: "Help Center",
  },
];

const AccountPage = () => {
  const [activeMenu, setActiveMenu] = React.useState("Profile");

  const onMenuChange = (e: string) => {
    setActiveMenu(e);
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
            <button className="accountpage__sidebar_item" key={index}>
              <span className="accountpage__sidebar_item__icon">
                <img src="" alt="" />
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
        {activeMenu === "Rate Us" && <RateUsMenu />}
        {activeMenu === "Help" && <HelpMenu />}
      </div>
    </div>
  );
};

export default AccountPage;

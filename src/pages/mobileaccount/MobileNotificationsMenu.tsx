import React from "react";
import "./MobileAccountPage.scss";
import backbtn from "../../assets/Images/icons/backbtn.svg";
import options from "../../assets/Images/icons/options.svg";

const notifications = [
  {
    id: 1,
    title: "Order No. 11267880 Arriving Today!",
    description:
      "Samuel Enikhan (09030383868) is delivering your order today from 12pm to 3pm.",
  },
  {
    id: 2,
    title: "Updates from DOAK",
    description:
      "Hey Gbemisola, Doak is having a black Friday week, join us on June 14th and be one of our lucky customers this week.",
  },
];

interface MobileNotificationsMenuProps {
  handleBack: () => void;
}

const MobileNotificationsMenu: React.FC<MobileNotificationsMenuProps> = ({
  handleBack,
}) => {
  return (
    <div className="mobilenotificationsmenu">
      <div className="mobilenotificationsmenu_header">
        <button onClick={handleBack}>
          <img src={backbtn} alt="back" />
        </button>
        <h3>All Notifications</h3>
        <button>
          <img src={options} alt="options" />
        </button>
      </div>

      <div className="mobilenotificationsmenu_body">
        {notifications.map((notification) => (
          <div
            className="mobilenotificationsmenu_body_notification"
            key={notification.id}
          >
            <div className="mobilenotificationsmenu_body_notification__text">
              <h2>{notification.title}</h2>
              <p>{notification.description}</p>
            </div>
            <div className="mobilenotificationsmenu_body_notification__logo">
              <img src="" alt="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileNotificationsMenu;

import React, { useState, useEffect } from "react";
import "./MobileAccountPage.scss";
import backbtn from "../../assets/Images/icons/backbtn.svg";
import options from "../../assets/Images/icons/options.svg";

interface Notifications {
  _id: string;
  userId: string;
  head: string;
  body: string;
  date: Date;
  read: boolean;
}

interface MobileNotificationsMenuProps {
  handleBack: () => void;
}

const MobileNotificationsMenu: React.FC<MobileNotificationsMenuProps> = ({
  handleBack,
}) => {
  const [notifications, setNotifications] = useState<Array<Notifications>>();

  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = async () => {
    const response = await fetch(
      `https://doakbackend.cyclic.app/api/v1/notifications`,
      // `http://localhost:3000/api/v1/notifications`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );

    const data = await response.json();
    setNotifications(data.data);
  };

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
        {notifications &&
          Object.values(notifications).map((notification) => (
            <div
              className="mobilenotificationsmenu_body_notification"
              key={notification._id}
            >
              <div className="mobilenotificationsmenu_body_notification__text">
                <h2>{notification.head}</h2>
                <p>{notification.body}</p>
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

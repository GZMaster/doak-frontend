import React from "react";
import "./NotificationsMenu.scss";

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

const NotificationsMenu = () => {
  return (
    <div className="notificationsmenu">
      <div className="notificationsmenu_header">
        <h3>All Notifications</h3>
        <button>Clear All</button>
      </div>

      <div className="notificationsmenu_body">
        {notifications.map((notification) => (
          <div
            className="notificationsmenu_body_notification"
            key={notification.id}
          >
            <div className="notificationsmenu_body_notification__text">
              <h2>{notification.title}</h2>
              <p>{notification.description}</p>
            </div>
            <div className="notificationsmenu_body_notification__logo">
              <img src="" alt="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsMenu;

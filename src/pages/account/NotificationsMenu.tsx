import React, { useEffect, useState } from "react";
import "./NotificationsMenu.scss";

interface Notifications {
  _id: string;
  userId: string;
  head: string;
  body: string;
  date: Date;
  read: boolean;
}

const NotificationsMenu = () => {
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
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const data = await response.json();
    setNotifications(data.data);
  };

  return (
    <div className="notificationsmenu">
      <div className="notificationsmenu_header">
        <h3>All Notifications</h3>
        <button>Clear All</button>
      </div>

      <div className="notificationsmenu_body">
        {notifications &&
          notifications.map((notification) => (
            <div
              className="notificationsmenu_body_notification"
              key={notification._id}
            >
              <div className="notificationsmenu_body_notification__text">
                <h2>{notification.head}</h2>
                <p>{notification.body}</p>
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

import React from "react";
import "./AccountPage.scss";

const notifications = [
  {
    id: 1,
    title: "New Message",
    description: "You have a new message from John Doe",
  },
  {
    id: 2,
    title: "New Message",
    description: "You have a new message from John Doe",
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
            <div className="notificationsmenu_body_notification_title">
              {notification.title}
            </div>
            <div className="notificationsmenu_body_notification_description">
              {notification.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsMenu;

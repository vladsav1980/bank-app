import React, { useState } from "react";

import BackendSimulation from "../../utils/BackEnd";
import Page from "../../components/page";
import BackButton from "../../components/backbutton";

import "./index.css";

import Notification from "../../components/notification";

import Box from "../../components/box";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);

  const backend = BackendSimulation();

  React.useEffect(() => {
    const fetchNotifications = async () => {
      const userNotifications = await backend.getusernotifications();
      setNotifications(userNotifications.slice(0, 7));
    };

    fetchNotifications();
  }, []);

  return (
    <Page style={{ backgroundColor: "#F5F5F7" }}>
      <BackButton />
      <div className="settings__title">
        <h2>Notifications</h2>
      </div>

      <div className="settings__form">
        <ul className="transactions notifications__list">
          {notifications &&
            notifications.map((notification) => (
              <li key={notification.id}>
                <Box>
                  <Notification
                    time={notification.time}
                    type={notification.type}
                  />
                </Box>
              </li>
            ))}
        </ul>
      </div>
    </Page>
  );
};

export default NotificationsPage;

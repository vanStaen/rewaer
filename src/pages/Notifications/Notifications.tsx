import React, { useEffect } from "react";
import { observer } from "mobx-react";

import { pageStore } from "@stores/pageStore/pageStore";
import { postNotificationsSeen } from "./postNotificationsSeen";
import { Notification } from "./Notification";

import "./Notifications.less";

export const Notifications: React.FC = observer(() => {
  useEffect(() => {
    postNotificationsSeen();
    pageStore.setUnseenNotificationsCount(0);
  }, []);

  const notificationsFormated = pageStore.notifications.map((data) => {
    return <Notification data={data} key={data.id} />;
  });

  return (
    <div className="notifications__container">
      {pageStore.notifications.length === 0 ? (
        <div className="notification__nothing">No notification for now</div>
      ) : (
        notificationsFormated
      )}
    </div>
  );
});

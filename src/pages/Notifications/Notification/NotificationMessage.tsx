import React from "react";
import { Link } from "react-router-dom";

interface NotificationMessageProps {
  type: number;
  title: string;
  notificationAge: string;
}

export const NotificationMessage: React.FC<NotificationMessageProps> = ({
  type,
  title,
  notificationAge,
}) => {
  const linkToUserPage = (
    <Link to={`/${title}`} onClick={(e) => e.stopPropagation()}>
      {title}
    </Link>
  );

  return (
    <div className="notification__title">
      {type === 1 && <>{linkToUserPage} sent you a friend request!</>}
      {type === 2 && <>{linkToUserPage} started following you!</>}
      {type === 3 && <>You got mail from {linkToUserPage}!</>}
      {type === 4 && <>{linkToUserPage} added a new item to the garderobe</>}
      {type === 5 && <>{linkToUserPage} added a new look to the garderobe</>}
      {type === 6 && <>{linkToUserPage} shared an item with you</>}
      {type === 12 && <>{linkToUserPage} liked this Item</>}
      {type === 13 && <>{linkToUserPage} liked this Look</>}
      {type === 14 && <>{linkToUserPage} added a new profile picture</>}
      {type === 15 && <>{linkToUserPage} disliked this Item</>}
      {type === 16 && <>{linkToUserPage} disliked this Look</>}
      {type === 17 && <>{linkToUserPage} accepted your friend request!</>}
      &nbsp;
      <span className="notifications__dateMobile">{notificationAge}</span>
    </div>
  );
};

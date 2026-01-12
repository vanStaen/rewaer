import React, { MouseEvent } from "react";
import { Button } from "antd";

interface NotificationActionsProps {
  id: string;
  type: number;
  isLoading: boolean;
  isNotFriend: boolean;
  isNotFollowed: boolean;
  onAcceptRequest: (event: MouseEvent<HTMLElement>) => Promise<void>;
  onFollowBack: (event: MouseEvent<HTMLElement>) => Promise<void>;
  isMobile?: boolean;
}

export const NotificationActions: React.FC<NotificationActionsProps> = ({
  id,
  type,
  isLoading,
  isNotFriend,
  isNotFollowed,
  onAcceptRequest,
  onFollowBack,
  isMobile = false,
}) => {
  if (isLoading) return null;

  // Friend request - accepted
  if (type === 1 && !isNotFriend) {
    return (
      <div className="notification__actionsButtons">
        <Button disabled type="primary">
          Accepted
        </Button>
      </div>
    );
  }

  // Friend request - pending
  if (type === 1 && isNotFriend) {
    return (
      <div
        className="notification__actionsButtons"
        id={isMobile ? `acceptRequestMobile${id}` : undefined}
      >
        <Button
          className={isMobile ? "actionsButton" : undefined}
          type="primary"
          block={isMobile}
          onClick={onAcceptRequest}
        >
          Accept
        </Button>
      </div>
    );
  }

  // Following back - already following
  if (type === 2 && !isNotFollowed) {
    return (
      <div className="notification__actionsButtons">
        <Button type="primary" disabled>
          Following back
        </Button>
      </div>
    );
  }

  // Following back - not following
  if (type === 2 && isNotFollowed) {
    return (
      <div
        className="notification__actionsButtons"
        id={isMobile ? `followbackMobile${id}` : undefined}
      >
        <Button
          className={isMobile ? "actionsButton" : undefined}
          type="primary"
          block={isMobile}
          onClick={onFollowBack}
        >
          Follow Back
        </Button>
      </div>
    );
  }

  return null;
};

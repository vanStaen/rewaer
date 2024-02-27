import React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import { Tooltip } from "antd";
import { useTranslation } from "react-i18next";

import { profileStore } from "../../../stores/profileStore/profileStore";

import "./ProfileFriends.css";

export const ProfileFriends = observer(() => {
  const { t } = useTranslation();

  const friendsFormatted = profileStore.friends.map((friend) => {
    return (
      <Tooltip title={friend.userName}>
        <Link
          to={`/${friend.userName}`}
          onClick={() => {
            profileStore.fetchProfileData(friend.userName);
          }}
        >
          <div
            className="profilFriends__followersAvatar"
            style={{
              background: `url(${friend.avatar})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </Link>
      </Tooltip>
    );
  });

  const friendsFollowers = profileStore.followers.map((follower) => {
    return (
      <Tooltip title={follower.userName}>
        <Link
          to={`/${follower.userName}`}
          onClick={() => {
            profileStore.fetchProfileData(follower.userName);
          }}
        >
          <div
            className="profilFriends__followersAvatar"
            style={{
              background: `url(${follower.avatar})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </Link>
      </Tooltip>
    );
  });

  const friendsFollowed = profileStore.followed.map((followed) => {
    return (
      <Tooltip title={followed.userName}>
        <Link
          to={`/${followed.userName}`}
          onClick={() => {
            profileStore.fetchProfileData(followed.userName);
          }}
        >
          <div
            className="profilFriends__followersAvatar"
            style={{
              background: `url(${followed.avatar})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </Link>
      </Tooltip>
    );
  });

  return (
    <div className="profilFriends__mainContainer">
      {!!profileStore.friends.length && (
        <div className="profilFriends__followersContainer">
          <div className="profilFriends__followersTitle">
            {t("profile.friends")} ({profileStore.friends.length})
          </div>
          {friendsFormatted}
          {/* <div className="profilFriends__followersAvatar profilFriends__followersCounterContainer">
          <div className="profilFriends__followersCounter"> +8</div>
        </div> */}
        </div>
      )}
      {!!profileStore.followers.length && (
        <div className="profilFriends__followersContainer">
          <div className="profilFriends__followersTitle">
            {t("profile.followers")} ({profileStore.followers.length})
          </div>
          {friendsFollowers}
        </div>
      )}
      {!!profileStore.followed.length && (
        <div className="profilFriends__followersContainer">
          <div className="profilFriends__followersTitle">
            {t("profile.following")} ({profileStore.followed.length})
          </div>
          {friendsFollowed}
        </div>
      )}
    </div>
  );
});

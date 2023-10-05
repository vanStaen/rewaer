import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { profileStore } from "../../../stores/profileStore/profileStore";

import "./ProfileDetails.css";

export const ProfileDetails = observer(() => {
  const { t } = useTranslation();
  const [showLastSeenOnline, setShowLastSeenOnline] = useState(false);
  const [showLastName, setShowLastName] = useState(false);

  useEffect(() => {
    if (!profileStore.isLoading && profileStore.profilSettings) {
      setShowLastSeenOnline(profileStore.profilSettings.showLastSeenOnline);
      setShowLastName(profileStore.profilSettings.showLastName);
    }
  }, [profileStore.isLoading, profileStore.profilSettings]);

  const dateLastActive = new Date(parseInt(profileStore.lastActive));

  return (
    <div className="profil__detailsContainer">
      <div className="profil__hello">
        <div>
          {profileStore.firstName}
          {showLastName && ` ${profileStore.lastName}`}
        </div>
        <div className="profil__username">@{profileStore.userName}</div>
        {showLastSeenOnline && (
          <div className="profil__lastSeenOnline">
            {t("profile.lastSeenOnline")} <br />{" "}
            {dateLastActive.toLocaleDateString()} {t("profile.at")}{" "}
            {dateLastActive.toLocaleTimeString()}
          </div>
        )}
      </div>
    </div>
  );
});
